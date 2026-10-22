import { nsToDate } from '../../../index';
import type { StreamClient, TimestampNS } from '../../../index';
import { DOCS_TEST_PREFIX } from './ids';
import { deleteMembershipLevel } from './feeds';
import {
  deleteExternalStorageIfExists,
  deleteFeedModerationTemplate,
} from './server';
import { hardDeleteUsers } from './users';
import { retry, retryOnRateLimit, waitForTask } from './wait';

/** A leftover's `createdAt` as a `Date`, or `undefined` when it has none. */
export const leftoverCreatedAt = ({ createdAt }: Leftover) => {
  if (createdAt === undefined) return undefined;
  return typeof createdAt === 'number'
    ? nsToDate(createdAt)
    : new Date(createdAt);
};

/** Something a docs test created and didn't remove. */
export type Leftover = {
  kind: string;
  id: string;
  /**
   * Used by the sweep to skip resources of runs that may still be in progress. A unix-ns
   * timestamp from a response, or an RFC3339 string; read it with `leftoverCreatedAt`.
   */
  createdAt?: number | string;
  remove: () => Promise<unknown>;
  /**
   * Removes many leftovers of this kind in one call (e.g. users in one `deleteUsers`).
   * `removeLeftovers` prefers it over `remove`, to stay under the rate limits.
   */
  removeMany?: (ids: string[]) => Promise<unknown>;
};

/**
 * Decides which resources are leftovers. `matches` gets ids / names (and a poll's
 * `created_by_id`). Channels, calls and feeds can't be searched by id prefix: they are
 * found by `ids`, and with `createdSince` also by listing every one created since then
 * and keeping the ones whose id `matches`.
 */
export type LeftoverFilter = {
  matches: (idOrName: string) => boolean;
  ids?: string[];
  createdSince?: Date;
};

/** Channel queries can't page past this offset. */
const MAX_CHANNEL_OFFSET = 1000;

/** Hard deletes channels and waits for the background delete task. */
const hardDeleteChannels = async (client: StreamClient, cids: string[]) => {
  const { task_id } = await client.chat.deleteChannels({
    cids,
    hard_delete: true,
  });
  if (task_id) await waitForTask(client, task_id);
};

/**
 * Polls can only be queried server-side "as" a user, and they survive their
 * creator's deletion, so a permanent helper user (outside the docs-test prefix) is
 * used for poll queries / deletes.
 */
const POLL_QUERY_USER_ID = 'docs-snippets-leak-checker';

/**
 * Moderation custom views are only listed for an admin `user_id`, and `listQueues`
 * re-creates a deleted user, so a permanent admin helper user (outside the docs-test
 * prefix) is used.
 */
const QUEUE_QUERY_USER_ID = 'docs-snippets-leak-checker-admin';

type Scanner = (
  client: StreamClient,
  filter: LeftoverFilter,
) => Promise<Leftover[]>;

const chunk = <T>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
    items.slice(i * size, i * size + size),
  );

const scanUsers = async (
  client: StreamClient,
  prefix: string,
  matches: LeftoverFilter['matches'],
) => {
  const found: Leftover[] = [];
  for (let offset = 0; ; offset += 100) {
    const { users } = await client.queryUsers({
      payload: {
        filter_conditions: { id: { $autocomplete: prefix } },
        sort: [{ field: 'id', direction: 1 }],
        limit: 100,
        offset,
      },
    });
    for (const user of users) {
      if (!matches(user.id)) continue;
      found.push({
        kind: 'user',
        id: user.id,
        createdAt: user.created_at,
        remove: () => hardDeleteUsers(client, [user.id]),
        removeMany: (ids) => hardDeleteUsers(client, ids),
      });
    }
    if (users.length < 100) return found;
  }
};

const scanners: Record<string, Scanner> = {
  async users(client, { matches }) {
    const found: Leftover[] = [];
    // Guest users get their id rewritten to `guest-<uuid>-<requested id>`, so they need
    // a second query.
    for (const prefix of [DOCS_TEST_PREFIX, 'guest']) {
      found.push(...(await scanUsers(client, prefix, matches)));
    }
    return found;
  },

  async channels(client, { matches, ids: channelIds = [], createdSince }) {
    const found = new Map<string, Leftover>();
    const add = (channel: { cid: string; created_at: number }) =>
      found.set(channel.cid, {
        kind: 'channel',
        id: channel.cid,
        createdAt: channel.created_at,
        remove: () => hardDeleteChannels(client, [channel.cid]),
        // One delete task per 100 channels instead of one per channel.
        removeMany: async (cids) => {
          for (const batch of chunk(cids, 100)) {
            await retryOnRateLimit(() => hardDeleteChannels(client, batch));
          }
        },
      });
    for (const ids of chunk(channelIds, 100)) {
      const { channels } = await client.chat.queryChannels({
        filter_conditions: { id: { $in: ids } },
        limit: 100,
        state: false,
      });
      for (const { channel } of channels) if (channel) add(channel);
    }
    if (createdSince) {
      const limit = 30;
      for (let offset = 0; ; offset += limit) {
        if (offset > MAX_CHANNEL_OFFSET) {
          throw new Error(
            `more than ${MAX_CHANNEL_OFFSET} channels created since ${createdSince.toISOString()}, the rest were not scanned`,
          );
        }
        const { channels } = await retryOnRateLimit(() =>
          client.chat.queryChannels({
            filter_conditions: {
              created_at: { $gte: createdSince.toISOString() },
            },
            sort: [{ field: 'created_at', direction: 1 }],
            limit,
            offset,
            state: false,
          }),
        );
        for (const { channel } of channels) {
          if (channel && matches(channel.id)) add(channel);
        }
        if (channels.length < limit) break;
      }
    }
    return [...found.values()];
  },

  async channelTypes(client, { matches }) {
    const { channel_types } = await client.chat.listChannelTypes();
    return Object.entries(channel_types)
      .filter(([name]) => matches(name))
      .map(([name, type]) => ({
        kind: 'channel type',
        id: name,
        createdAt: type.created_at,
        remove: async () => {
          // Its channels must be gone first; they are only findable by type.
          const { channels } = await client.chat.queryChannels({
            filter_conditions: { type: name },
            limit: 100,
            state: false,
          });
          const cids = channels.flatMap(({ channel }) =>
            channel ? [channel.cid] : [],
          );
          if (cids.length) await hardDeleteChannels(client, cids);
          await retry(() => client.chat.deleteChannelType({ name }), {
            interval: 2000,
            retryIf: (error) =>
              error instanceof Error &&
              /channels of that type exist/.test(error.message),
          });
        },
      }));
  },

  async commands(client, { matches }) {
    const { commands } = await client.chat.listCommands();
    return commands
      .filter((command) => matches(command.name))
      .map((command) => ({
        kind: 'command',
        id: command.name,
        createdAt: command.created_at,
        remove: () => client.chat.deleteCommand({ name: command.name }),
      }));
  },

  async roles(client, { matches }) {
    const { roles } = await client.listRoles();
    return roles
      .filter((role) => role.custom && matches(role.name))
      .map((role) => ({
        kind: 'role',
        id: role.name,
        createdAt: role.created_at,
        remove: () => client.deleteRole({ name: role.name }),
      }));
  },

  async permissions(client, { matches }) {
    const { permissions } = await client.listPermissions();
    return permissions
      .filter((permission) => permission.custom && matches(permission.id))
      .map((permission) => ({
        kind: 'custom permission',
        id: permission.id,
        remove: () => client.deletePermission({ id: permission.id }),
      }));
  },

  async blocklists(client, { matches }) {
    const { blocklists } = await client.listBlockLists();
    return blocklists
      .filter((blocklist) => matches(blocklist.name))
      .map((blocklist) => ({
        kind: 'blocklist',
        id: blocklist.name,
        createdAt: blocklist.created_at,
        remove: () => client.deleteBlockList({ name: blocklist.name }),
      }));
  },

  async segments(client, { matches }) {
    const found: Leftover[] = [];
    let next: string | undefined;
    do {
      const response = await client.chat.querySegments({
        filter: {},
        limit: 100,
        next,
      });
      for (const segment of response.segments) {
        if (!matches(segment.id) && !matches(segment.name ?? '')) continue;
        found.push({
          kind: 'segment',
          id: segment.id,
          createdAt: segment.created_at,
          remove: () => client.chat.deleteSegment({ id: segment.id }),
        });
      }
      next = response.next;
    } while (next);
    return found;
  },

  async campaigns(client, { matches }) {
    const found: Leftover[] = [];
    let next: string | undefined;
    do {
      const response = await client.chat.queryCampaigns({ limit: 100, next });
      for (const campaign of response.campaigns) {
        if (!matches(campaign.id) && !matches(campaign.name)) continue;
        found.push({
          kind: 'campaign',
          id: `${campaign.id} (${campaign.name})`,
          createdAt: campaign.created_at,
          remove: () => client.chat.deleteCampaign({ id: campaign.id }),
        });
      }
      next = response.next;
    } while (next);
    return found;
  },

  async userGroups(client, { matches }) {
    const found: Leftover[] = [];
    let idGt: string | undefined;
    for (;;) {
      const { user_groups } = await client.listUserGroups({
        limit: 100,
        id_gt: idGt,
      });
      for (const group of user_groups) {
        if (!matches(group.id) && !matches(group.name)) continue;
        found.push({
          kind: 'user group',
          id: group.id,
          createdAt: group.created_at,
          remove: () => client.deleteUserGroup({ id: group.id }),
        });
      }
      if (user_groups.length < 100) return found;
      idGt = user_groups[user_groups.length - 1].id;
    }
  },

  async moderationConfigs(client, { matches }) {
    const { configs } = await client.moderation.queryModerationConfigs({
      limit: 100,
    });
    return configs
      .filter((config) => matches(config.key))
      .map((config) => ({
        kind: 'moderation config',
        id: config.key,
        createdAt: config.created_at,
        remove: () => client.moderation.deleteConfig({ key: config.key }),
      }));
  },

  async predefinedFilters(client, { matches }) {
    const { predefined_filters } = await client.chat.getPredefinedFilters();
    return predefined_filters
      .filter((filter) => matches(filter.name))
      .map((filter) => ({
        kind: 'predefined filter',
        id: filter.name,
        createdAt: filter.created_at,
        remove: () => client.chat.deletePredefinedFilter({ name: filter.name }),
      }));
  },

  async pushProviders(client, { matches }) {
    const { push_providers } = await client.listPushProviders();
    return push_providers
      .filter((provider) => matches(provider.name))
      .map((provider) => ({
        kind: 'push provider',
        id: `${provider.type}:${provider.name}`,
        createdAt: provider.created_at,
        remove: () =>
          client.deletePushProvider({
            type: provider.type,
            name: provider.name,
          }),
      }));
  },

  async polls(client, { matches }) {
    await client.upsertUsers([
      { id: POLL_QUERY_USER_ID, name: 'Docs snippets leak checker' },
    ]);
    const found: Leftover[] = [];
    let next: string | undefined;
    do {
      const response = await client.queryPolls({
        user_id: POLL_QUERY_USER_ID,
        limit: 100,
        next,
      });
      for (const poll of response.polls) {
        if (!matches(poll.created_by_id) && !matches(poll.name)) continue;
        found.push({
          kind: 'poll',
          id: `${poll.id} (by ${poll.created_by_id})`,
          createdAt: poll.created_at,
          remove: () =>
            client.deletePoll({
              poll_id: poll.id,
              user_id: POLL_QUERY_USER_ID,
            }),
        });
      }
      next = response.next;
    } while (next);
    return found;
  },

  async externalStorages(client, { matches }) {
    const { external_storages } = await client.listExternalStorage();
    return Object.keys(external_storages)
      .filter((name) => matches(name))
      .map((name) => ({
        kind: 'external storage',
        id: name,
        remove: () => deleteExternalStorageIfExists(client, name),
      }));
  },

  async callTypes(client, { matches }) {
    const { call_types } = await client.video.listCallTypes();
    return Object.values(call_types)
      .filter((type) => matches(type.name))
      .map((type) => ({
        kind: 'call type',
        id: type.name,
        createdAt: type.created_at,
        remove: () => client.video.deleteCallType({ name: type.name }),
      }));
  },

  async calls(client, { matches, ids = [], createdSince }) {
    const found = new Map<string, Leftover>();
    // Paged by `created_at`: a `next` request must repeat the original `sort`, and
    // without one it fails with code 4 "cannot specify sort and next/prev at the same
    // time" (2026-10-16).
    const scan = async (filter_conditions: Record<string, unknown>) => {
      let after: TimestampNS | undefined;
      for (;;) {
        const response = await retryOnRateLimit(() =>
          client.video.queryCalls({
            filter_conditions: after
              ? {
                  $and: [
                    filter_conditions,
                    { created_at: { $gt: nsToDate(after) } },
                  ],
                }
              : filter_conditions,
            sort: [{ field: 'created_at', direction: 1 }],
            limit: 100,
          }),
        );
        for (const { call } of response.calls) {
          if (!matches(call.id)) continue;
          found.set(call.cid, {
            kind: 'call',
            id: call.cid,
            createdAt: call.created_at,
            remove: () =>
              client.video.deleteCall({
                type: call.type,
                id: call.id,
                hard: true,
              }),
          });
        }
        if (response.calls.length < 100) return;
        after = response.calls[response.calls.length - 1].call.created_at;
      }
    };
    for (const batch of chunk(ids, 100)) await scan({ id: { $in: batch } });
    if (createdSince) {
      await scan({ created_at: { $gte: createdSince.toISOString() } });
    }
    return [...found.values()];
  },

  async feedGroups(client, { matches }) {
    const { groups } = await client.feeds.listFeedGroups({
      include_soft_deleted: true,
    });
    return Object.values(groups)
      .filter((group) => matches(group.id))
      .map((group) => ({
        kind: 'feed group',
        id: group.id,
        createdAt: group.created_at,
        remove: () =>
          client.feeds.deleteFeedGroup({ id: group.id, hard_delete: true }),
      }));
  },

  async feeds(client, { matches, ids = [], createdSince }) {
    const found = new Map<string, Leftover>();
    const scan = async (filter: Record<string, unknown>) => {
      let next: string | undefined;
      do {
        const response = await retryOnRateLimit(() =>
          client.feeds.queryFeeds({ filter, limit: 100, next }),
        );
        for (const feed of response.feeds) {
          if (!matches(feed.id)) continue;
          found.set(feed.feed, {
            kind: 'feed',
            id: feed.feed,
            createdAt: feed.created_at,
            remove: () =>
              client.feeds.deleteFeed({
                feed_group_id: feed.group_id,
                feed_id: feed.id,
                hard_delete: true,
              }),
          });
        }
        next = response.next;
      } while (next);
    };
    for (const batch of chunk(ids, 100)) await scan({ id: { $in: batch } });
    if (createdSince) {
      await scan({ created_at: { $gte: createdSince.toISOString() } });
    }
    return [...found.values()];
  },

  async membershipLevels(client, { matches }) {
    const found: Leftover[] = [];
    let next: string | undefined;
    do {
      const response = await client.feeds.queryMembershipLevels({
        limit: 100,
        next,
      });
      for (const level of response.membership_levels) {
        if (!matches(level.id) && !matches(level.name)) continue;
        found.push({
          kind: 'membership level',
          id: level.id,
          createdAt: level.created_at,
          remove: () => deleteMembershipLevel(client, level.id),
        });
      }
      next = response.next;
    } while (next);
    return found;
  },

  async collections(client, { matches }) {
    const found: Leftover[] = [];
    let next: string | undefined;
    do {
      const response = await client.feeds.queryCollections({
        limit: 100,
        next,
      });
      for (const collection of response.collections) {
        if (!matches(collection.name) && !matches(collection.id)) continue;
        const ref = `${collection.name}:${collection.id}`;
        found.push({
          kind: 'collection',
          id: ref,
          createdAt: collection.created_at,
          remove: () =>
            client.feeds.deleteCollections({ collection_refs: [ref] }),
          removeMany: async (refs) => {
            for (const batch of chunk(refs, 100)) {
              await client.feeds.deleteCollections({ collection_refs: batch });
            }
          },
        });
      }
      next = response.next;
    } while (next);
    return found;
  },

  async feedViews(client, { matches }) {
    const { views } = await client.feeds.listFeedViews();
    return Object.values(views)
      .filter((view) => matches(view.id))
      .map((view) => ({
        kind: 'feed view',
        id: view.id,
        remove: () => client.feeds.deleteFeedView({ id: view.id }),
      }));
  },

  async feedModerationTemplates(client, { matches }) {
    const { templates } = await client.moderation.v2QueryTemplates();
    return templates
      .filter((template) => matches(template.name))
      .map((template) => ({
        kind: 'feed moderation template',
        id: template.name,
        createdAt: template.created_at,
        remove: () => deleteFeedModerationTemplate(client, template.name),
      }));
  },

  async policyTestSets(client, { matches }) {
    const { sets } = await client.moderation.listPolicyTestSets();
    return sets
      .filter((set) => matches(set.name))
      .map((set) => ({
        kind: 'moderation evaluation set',
        id: `${set.id} (${set.name})`,
        createdAt: set.created_at,
        remove: () => client.moderation.deletePolicyTestSet({ id: set.id }),
      }));
  },

  async moderationQueues(client, { matches }) {
    await client.upsertUsers([
      {
        id: QUEUE_QUERY_USER_ID,
        name: 'Docs snippets leak checker (admin)',
        role: 'admin',
      },
    ]);
    const { queues } = await client.moderation.listQueues({
      user_id: QUEUE_QUERY_USER_ID,
    });
    return queues
      .filter((queue) => matches(queue.name))
      .map((queue) => ({
        kind: 'moderation view',
        id: `${queue.id} (${queue.name})`,
        createdAt: queue.created_at,
        remove: () =>
          client.moderation.deleteQueue({
            id: queue.id,
            user_id: QUEUE_QUERY_USER_ID,
          }),
      }));
  },

  async moderationRules(client, { matches }) {
    const found: Leftover[] = [];
    let next: string | undefined;
    do {
      const response = await client.moderation.queryModerationRules({
        limit: 100,
        next,
      });
      for (const rule of response.rules) {
        if (!matches(rule.id) && !matches(rule.name)) continue;
        found.push({
          kind: 'moderation rule',
          id: `${rule.id} (${rule.name})`,
          createdAt: rule.created_at,
          remove: () => client.moderation.deleteModerationRule({ id: rule.id }),
        });
      }
      next = response.next;
    } while (next);
    return found;
  },
};

/**
 * Resource kinds that are checked. Anything else (reminders, devices, drafts, ...) is
 * per-user and goes away with the user; activities, comments and reactions go away with
 * their feed or user.
 */
export const SCANNED_KINDS = Object.keys(scanners);

/**
 * Finds docs-test resources matching `filter` across every scanned resource kind.
 * Scanner failures (e.g. a feature not enabled on the app) are returned as `errors`
 * instead of failing the whole scan.
 */
export const findLeftovers = async (
  client: StreamClient,
  filter: LeftoverFilter,
) => {
  const leftovers: Leftover[] = [];
  const errors: string[] = [];
  for (const [kind, scan] of Object.entries(scanners)) {
    try {
      leftovers.push(...(await scan(client, filter)));
    } catch (error) {
      errors.push(
        `${kind}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  return { leftovers, errors };
};

/**
 * Removes leftovers in dependency order (campaigns/polls before users, channels
 * before channel types) and returns the ones that couldn't be removed.
 */
export const removeLeftovers = async (leftovers: Leftover[]) => {
  const order = [
    'campaign',
    'poll',
    'segment',
    'channel',
    'channel type',
    'call',
    'call type',
    'external storage',
    'feed',
    'feed group',
    'membership level',
    'feed view',
    'user',
    'moderation rule',
    'moderation config',
  ];
  const rank = (kind: string) =>
    order.includes(kind) ? order.indexOf(kind) : order.length;
  const failed: Array<{ leftover: Leftover; error: string }> = [];
  const describe = (error: unknown) =>
    error instanceof Error ? error.message : String(error);
  // Leftovers that can be removed together are batched per kind (one call for all
  // users instead of one each), the rest one by one. Both retry on 429.
  const sorted = [...leftovers].sort((a, b) => rank(a.kind) - rank(b.kind));
  for (const kind of [...new Set(sorted.map((leftover) => leftover.kind))]) {
    const ofKind = sorted.filter((leftover) => leftover.kind === kind);
    const removeMany = ofKind.find(
      (leftover) => leftover.removeMany,
    )?.removeMany;
    if (removeMany) {
      try {
        await removeMany(ofKind.map((leftover) => leftover.id));
      } catch (error) {
        failed.push(
          ...ofKind.map((leftover) => ({ leftover, error: describe(error) })),
        );
      }
      continue;
    }
    for (const leftover of ofKind) {
      try {
        await retryOnRateLimit(() => leftover.remove());
      } catch (error) {
        failed.push({ leftover, error: describe(error) });
      }
    }
  }
  return failed;
};

export const describeLeftovers = (leftovers: Leftover[]) =>
  leftovers
    .map((leftover) => `  - ${leftover.kind}: ${leftover.id}`)
    .join('\n');
