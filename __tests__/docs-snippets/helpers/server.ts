import { isDeepStrictEqual } from 'node:util';
import type {
  EventHook,
  MessageRequest,
  QueryChannelsRequest,
  SendMessageRequest,
  StreamClient,
} from '../../../index';
import type { Cleanup } from './cleanup';
import { retry } from './wait';

/**
 * Server-side lookups and actions the tests repeat. Lookups throw unless exactly one
 * result matches, so a filter that matches nothing can't make a falsy-field check pass.
 */

const expectOne = <T>(items: T[], what: string): T => {
  if (items.length !== 1) {
    throw new Error(`expected exactly one ${what}, got ${items.length}`);
  }
  return items[0];
};

/** Sends a message as `message.user_id` and returns it. */
export const sendServerMessage = async (
  serverClient: StreamClient,
  cid: string,
  message: MessageRequest & { user_id: string },
  options: Omit<SendMessageRequest, 'message'> = {},
) => {
  const [type, id] = cid.split(':');
  const response = await serverClient.chat
    .channel(type, id)
    .sendMessage({ message, ...options });
  return response.message;
};

/** The user with id `userId`. */
export const getServerUser = async (
  serverClient: StreamClient,
  userId: string,
) => {
  const { users } = await serverClient.queryUsers({
    payload: { filter_conditions: { id: userId } },
  });
  return expectOne(users, `user ${userId}`);
};

/** `userId`'s member row in channel `cid`. */
export const getServerMember = async (
  serverClient: StreamClient,
  cid: string,
  userId: string,
) => {
  const [type, id] = cid.split(':');
  const { members } = await serverClient.chat
    .channel(type, id)
    .queryMembers({ payload: { filter_conditions: { user_id: userId } } });
  return expectOne(members, `member ${userId} of ${cid}`);
};

/**
 * Channel `cid` as returned by `queryChannels` (`{ channel, messages, members, ... }`).
 * Pass `user_id` (and `message_limit`) to get that user's view of it.
 */
export const getServerChannel = async (
  serverClient: StreamClient,
  cid: string,
  options: Omit<QueryChannelsRequest, 'filter_conditions'> = {},
) => {
  const { channels } = await serverClient.chat.queryChannels({
    filter_conditions: { cid },
    ...options,
  });
  return expectOne(channels, `channel ${cid}`);
};

/** Polls survive their creator's deletion: deletes every poll `userId` created. */
export const deletePollsCreatedBy = async (
  serverClient: StreamClient,
  userId: string,
) => {
  const { polls } = await serverClient.queryPolls({
    filter: { created_by_id: userId },
    limit: 100,
    user_id: userId,
  });
  for (const poll of polls) {
    await serverClient.deletePoll({ poll_id: poll.id, user_id: userId });
  }
};

type AppSettings = Awaited<ReturnType<StreamClient['getApp']>>['app'];

/**
 * App setting changes are eventually consistent across API nodes: polls `getApp()`
 * until `agreeing` consecutive reads return `expected` for `key`.
 */
export const waitForAppSetting = async <K extends keyof AppSettings>(
  serverClient: StreamClient,
  key: K,
  expected: AppSettings[K],
  { agreeing = 20, attempts = 120, interval = 500 } = {},
) => {
  let streak = 0;
  for (let attempt = 0; attempt < attempts && streak < agreeing; attempt++) {
    const { app } = await serverClient.getApp();
    // Deep compare: object and array settings (`file_upload_config`, `event_hooks`) too.
    streak = isDeepStrictEqual(app[key], expected) ? streak + 1 : 0;
    if (streak === 0)
      await new Promise((resolve) => setTimeout(resolve, interval));
  }
  if (streak < agreeing) {
    throw new Error(
      `app setting ${String(key)} never settled on ${JSON.stringify(expected)}`,
    );
  }
};

/** Hooks without their server-managed timestamps (they change on every update). */
export const withoutTimestamps = (hooks: EventHook[]) =>
  hooks.map((hook) => {
    const copy = { ...hook };
    delete copy.created_at;
    delete copy.updated_at;
    return copy;
  });

/** Reads `event_hooks` until `check` accepts them (getApp is eventually consistent). */
export const waitForEventHooks = (
  serverClient: StreamClient,
  check: (hooks: EventHook[]) => boolean,
) =>
  retry(async () => {
    const { app } = await serverClient.getApp();
    if (!check(app.event_hooks)) {
      const targets = app.event_hooks.map(
        (h) => h.webhook_url ?? h.sqs_queue_url ?? h.sns_topic_arn,
      );
      throw new Error(
        `event_hooks not updated yet: ${JSON.stringify(targets)}`,
      );
    }
    return app.event_hooks;
  });

/**
 * Saves the app's `event_hooks` and registers their restore on `cleanup`. `restore()`
 * puts the saved hooks back (same ids, so no DRIFT) and waits until 5 reads in a row
 * agree, ignoring `created_at` / `updated_at`; call it before a snippet that claims to
 * keep the existing hooks.
 */
export const saveAndRestoreEventHooks = async (
  serverClient: StreamClient,
  cleanup: Cleanup,
) => {
  const original = (await serverClient.getApp()).app.event_hooks;
  const restore = async () => {
    await serverClient.updateApp({ event_hooks: original });
    for (let agreeing = 0; agreeing < 5; agreeing++) {
      await waitForEventHooks(serverClient, (hooks) =>
        isDeepStrictEqual(
          withoutTimestamps(hooks),
          withoutTimestamps(original),
        ),
      );
    }
  };
  cleanup.add(restore);
  return { original, restore };
};

/**
 * `waitForAppSetting` only proves that `getApp` agrees: other endpoints of some API nodes
 * keep the old `multi_tenant_enabled` value for a while longer. Polls `listUserGroups`
 * with `team_id` until `agreeing` calls in a row accept it (`supported`) or reject it
 * with the multi-tenancy error. Call it after `waitForAppSetting`, both after enabling
 * multi-tenancy and after restoring it.
 */
export const waitForTeamIdSupport = async (
  serverClient: StreamClient,
  teamId: string,
  supported: boolean,
  { agreeing = 10, timeout = 90000, interval = 500 } = {},
) => {
  const startedAt = Date.now();
  let streak = 0;
  while (streak < agreeing) {
    if (Date.now() - startedAt > timeout) {
      throw new Error(`team_id support never settled on ${supported}`);
    }
    let accepted = true;
    try {
      await serverClient.listUserGroups({ limit: 1, team_id: teamId });
    } catch (error) {
      if (!(error instanceof Error && /multi-tenancy/.test(error.message)))
        throw error;
      accepted = false;
    }
    streak = accepted === supported ? streak + 1 : 0;
    if (streak === 0)
      await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

/**
 * The review queue item of `entityId` once it has `flags` flags (flags arrive within
 * about a second of `client.moderation.flag`). Throws unless exactly one item matches.
 */
export const waitForReviewItem = (
  client: StreamClient,
  entityId: string,
  { flags = 1 }: { flags?: number } = {},
) =>
  retry(async () => {
    const { items } = await client.moderation.queryReviewQueue({
      filter: { entity_id: entityId },
    });
    const item = expectOne(items, `review queue item for ${entityId}`);
    if (item.flags.length !== flags) {
      throw new Error(`expected ${flags} flag(s), got ${item.flags.length}`);
    }
    return item;
  });

/**
 * Deletes a Feeds v2 moderation template. The generated `v2DeleteTemplate()` takes no
 * arguments, but the API needs `{ name }` in the DELETE body.
 */
export const deleteFeedModerationTemplate = (
  client: StreamClient,
  name: string,
) =>
  client.moderation.apiClient.sendRequest(
    'DELETE',
    '/api/v2/moderation/feeds_moderation_template',
    undefined,
    undefined,
    { name },
  );

/**
 * Deletes an external storage if it exists. Right after a create, the delete can fail
 * with code 4 "external storage ... does not exist" while the storage is still listed,
 * so it is retried until the name is gone from `listExternalStorage`.
 */
export const deleteExternalStorageIfExists = (
  client: StreamClient,
  name: string,
) =>
  retry(
    async () => {
      const { external_storages } = await client.listExternalStorage();
      if (!(name in external_storages)) return;
      await client.deleteExternalStorage({ name });
    },
    { retryIf: (error) => String(error).includes('does not exist') },
  );
