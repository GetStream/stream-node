import type { StreamClient } from '../../../index';
import { deleteMembershipLevel } from './feeds';
import { hardDeleteUsers } from './users';
import {
  CHANNEL_TYPE_PROPAGATION_MS,
  isChannelTypeMissing,
  retry,
  retryOnRateLimit,
  waitForTask,
} from './wait';

/**
 * Collects everything a test file creates and removes it in `afterAll`.
 *
 * ```ts
 * const cleanup = new Cleanup(getServerClient());
 * cleanup.users.push(userId);
 * cleanup.feeds.push(`user:${userId}`);
 * cleanup.add(() => serverClient.updateApp(originalSettings));
 * afterAll(() => cleanup.run());
 * ```
 *
 * Everything is attempted even if a step fails; failures are thrown together at the
 * end so leftovers (especially channel types, which count against an app limit) don't
 * pile up silently.
 */
export class Cleanup {
  users: string[] = [];
  /** Channel cids (`type:id`). */
  channels: string[] = [];
  channelTypes: string[] = [];
  /** Video call cids (`type:id`), hard deleted. */
  calls: string[] = [];
  /** Video call type names, deleted after `calls` (a type with calls can't be deleted). */
  callTypes: string[] = [];
  /** Feed ids (`group:id`), hard deleted. */
  feeds: string[] = [];
  /** Feed group ids, hard deleted after the feeds. */
  feedGroups: string[] = [];
  /** Feeds collection refs (`name:id`); collections outlive their user and feed. */
  collections: string[] = [];
  /** Feeds membership level ids, deleted after the feeds (a level in use can't be deleted). */
  membershipLevels: string[] = [];
  private custom: Array<() => Promise<unknown>> = [];

  constructor(private serverClient: StreamClient) {}

  /** Extra cleanup steps (restore app settings, delete blocklists, ...). Run first, in reverse order. */
  add(fn: () => Promise<unknown>) {
    this.custom.push(fn);
  }

  async run() {
    const errors: unknown[] = [];
    const attempt = async (fn: () => Promise<unknown>) => {
      try {
        await fn();
      } catch (error) {
        errors.push(error);
      }
    };

    for (const fn of [...this.custom].reverse()) await attempt(fn);
    for (const fid of this.feeds) await attempt(() => this.deleteFeed(fid));
    if (this.collections.length) {
      await attempt(() =>
        this.serverClient.feeds.deleteCollections({
          collection_refs: this.collections,
        }),
      );
    }
    for (const id of this.membershipLevels) {
      await attempt(() => deleteMembershipLevel(this.serverClient, id));
    }
    for (const id of this.feedGroups) {
      await attempt(() =>
        ignoreNotFound(
          this.serverClient.feeds.deleteFeedGroup({ id, hard_delete: true }),
        ),
      );
    }
    for (const cid of this.calls) await attempt(() => this.deleteCall(cid));
    for (const name of this.callTypes) {
      await attempt(() => this.deleteCallType(name));
    }
    if (this.channels.length) await attempt(() => this.deleteChannels());
    // A channel type can only be deleted once all of its channels are gone.
    for (const type of this.channelTypes) {
      await attempt(() => this.deleteChannelType(type));
    }
    if (this.users.length) {
      await attempt(() => hardDeleteUsers(this.serverClient, this.users));
    }

    if (errors.length) {
      throw new AggregateError(
        errors,
        '[docs-snippets] cleanup failed, see `errors`',
      );
    }
  }

  private async deleteCall(cid: string) {
    const [type, id] = splitId(cid);
    // Hard deletes run as a background task: wait for it, so the call type can be
    // deleted afterwards. Right after a call type is created, some API nodes still
    // answer "call type does not exist".
    const startedAt = Date.now();
    const response = await ignoreNotFound(
      retry(
        () => this.serverClient.video.deleteCall({ type, id, hard: true }),
        {
          interval: 2000,
          retryIf: (error) =>
            String(error).includes('call type does not exist') &&
            Date.now() - startedAt < 30000,
        },
      ),
    );
    if (response?.task_id)
      await waitForTask(this.serverClient, response.task_id);
  }

  private async deleteCallType(name: string) {
    // "calls of that type exist": a hard call delete hasn't finished yet.
    // "does not exist": a new type isn't known to every API node yet, or it is gone.
    const startedAt = Date.now();
    try {
      await retry(() => this.serverClient.video.deleteCallType({ name }), {
        timeout: 60000,
        interval: 2000,
        retryIf: (error) =>
          String(error).includes('calls of that type exist') ||
          (String(error).includes('does not exist') &&
            Date.now() - startedAt < 30000),
      });
    } catch (error) {
      if (!String(error).includes('does not exist')) throw error;
    }
  }

  private async deleteFeed(fid: string) {
    const [feed_group_id, feed_id] = splitId(fid);
    await ignoreNotFound(
      retryOnRateLimit(() =>
        this.serverClient.feeds.deleteFeed({
          feed_group_id,
          feed_id,
          hard_delete: true,
        }),
      ),
    );
  }

  private async deleteChannelType(type: string) {
    // "channels of that type exist": the channel delete task hasn't caught up yet.
    // "does not exist": either already deleted (e.g. by the snippet) or, right after
    // creation, this API node doesn't know the type yet - keep trying for a while and
    // treat it as gone after that.
    const startedAt = Date.now();
    try {
      await retry(
        () => this.serverClient.chat.deleteChannelType({ name: type }),
        {
          timeout: 60000,
          interval: 2000,
          retryIf: (error) =>
            error instanceof Error &&
            (/channels of that type exist/.test(error.message) ||
              (isChannelTypeMissing(error) &&
                Date.now() - startedAt < CHANNEL_TYPE_PROPAGATION_MS + 5000)),
        },
      );
    } catch (error) {
      if (!isChannelTypeMissing(error)) throw error;
    }
  }

  private async deleteChannels() {
    // Server-side hard delete runs as a background task: wait for it so the channel
    // types can be deleted afterwards.
    const response = await retryOnRateLimit(() =>
      this.serverClient.chat.deleteChannels({
        cids: this.channels,
        hard_delete: true,
      }),
    );
    if (response.task_id)
      await waitForTask(this.serverClient, response.task_id);
  }
}

/** `type:id` -> [type, id] (ids may contain `:`). */
const splitId = (cid: string): [string, string] => {
  const index = cid.indexOf(':');
  return [cid.slice(0, index), cid.slice(index + 1)];
};

/** Already gone (e.g. deleted by the snippet) counts as deleted. */
const ignoreNotFound = async <T>(promise: Promise<T>) => {
  try {
    return await promise;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      !/not found|can't be found|can't find|does not exist|doesn't exist/i.test(
        message,
      )
    ) {
      throw error;
    }
    return undefined;
  }
};
