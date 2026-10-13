import type { StreamClient } from '../../../index';
import { DOCS_TEST_PREFIX } from './ids';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type RetryOptions = {
  /** Give up after this many ms and rethrow the last error. */
  timeout?: number;
  interval?: number;
  /** Only retry errors this returns true for; anything else is thrown immediately. */
  retryIf?: (error: unknown) => boolean;
};

/** Calls `fn` until it resolves (or a non-retryable error / the timeout is hit). */
export const retry = async <T>(
  fn: () => Promise<T>,
  { timeout = 60000, interval = 1000, retryIf = () => true }: RetryOptions = {},
): Promise<T> => {
  const deadline = Date.now() + timeout;
  for (;;) {
    try {
      return await fn();
    } catch (error) {
      if (!retryIf(error) || Date.now() + interval > deadline) throw error;
      await sleep(interval);
    }
  }
};

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

/**
 * 429 "Too many requests" (code 9): the app's rate limit for that endpoint was hit.
 * node-sdk errors carry the HTTP status in `metadata.responseCode`.
 */
export const isRateLimited = (error: unknown) =>
  typeof error === 'object' &&
  error !== null &&
  'metadata' in error &&
  typeof error.metadata === 'object' &&
  error.metadata !== null &&
  'responseCode' in error.metadata &&
  error.metadata.responseCode === 429;

/**
 * Retries `fn` while it is rate limited. Rate limits are per minute, so this keeps
 * trying for up to 90s (inside the 180s hook timeout).
 */
export const retryOnRateLimit = <T>(fn: () => Promise<T>) =>
  retry(fn, { timeout: 90000, interval: 5000, retryIf: isRateLimited });

/** "<type>: channel type does not exist" - returned until a new channel type has propagated. */
export const isChannelTypeMissing = (error: unknown) => {
  const message = errorMessage(error);
  // Messages differ per endpoint, e.g. deleteChannelType: "<name> is not a defined channel type".
  return (
    message.includes('channel type does not exist') ||
    message.includes('is not a defined channel type')
  );
};

/**
 * How long a change to a built-in or pre-existing channel type gets before it is read
 * back (e.g. by the DRIFT check, which compares those types). Reads of a channel type can
 * return the old value for a while after an update, longer than the API takes to apply it.
 */
export const CHANNEL_TYPE_PROPAGATION_MS = 30000;

/**
 * How long an update to a docs-test channel type gets before it is used. Measured on the
 * test app (2026-10-13): every API node enforced an update within ~3s.
 */
export const CHANNEL_TYPE_UPDATE_MS = 10000;

/**
 * A new channel type is waited for at least `CHANNEL_TYPE_UPDATE_MS` after creation and
 * until this many lookups in a row accept it. Lookups alone aren't enough: they reuse one
 * keep-alive connection, so they can all reach a node that already knows the type.
 */
const CHANNEL_TYPE_AGREEING_LOOKUPS = 10;

/** Channel type changes since the last `waitForChannelTypePropagation()`. */
const pendingChannelTypes = {
  created: new Map<string, { client: StreamClient; at: number }>(),
  lastUpdate: undefined as { at: number; existing: boolean } | undefined,
};

/**
 * Records `createChannelType` / `updateChannelType` calls of `client` (incl. calls from
 * the snippets) for `waitForChannelTypePropagation()`. Called by `getServerClient()`.
 */
export const trackChannelTypeChanges = (client: StreamClient) => {
  const chat = client.chat;
  const create = chat.createChannelType.bind(chat);
  chat.createChannelType = async (request) => {
    const response = await create(request);
    pendingChannelTypes.created.set(request.name, { client, at: Date.now() });
    return response;
  };
  const update = chat.updateChannelType.bind(chat);
  chat.updateChannelType = async (request) => {
    const response = await update(request);
    // A type created since the last wait counts as new; anything else (built-in types,
    // types that existed before) is compared by the DRIFT check.
    pendingChannelTypes.lastUpdate = {
      at: Date.now(),
      existing:
        !pendingChannelTypes.created.has(request.name) &&
        !request.name.startsWith(DOCS_TEST_PREFIX),
    };
    return response;
  };
  return client;
};

/** Waits until `CHANNEL_TYPE_AGREEING_LOOKUPS` lookups in a row know channel type `name`. */
const waitForChannelTypeKnown = async (client: StreamClient, name: string) => {
  let streak = 0;
  await retry(
    async () => {
      while (streak < CHANNEL_TYPE_AGREEING_LOOKUPS) {
        try {
          await client.chat.queryChannels({
            filter_conditions: { type: name },
            limit: 1,
            state: false,
          });
          streak++;
        } catch (error) {
          streak = 0;
          throw error;
        }
      }
    },
    { timeout: 60000, interval: 500, retryIf: isChannelTypeMissing },
  );
};

/**
 * Channel type changes are eventually consistent: right after `createChannelType` or
 * `updateChannelType`, API nodes can disagree (a `channel.create()` can succeed and the
 * next `sendMessage` still fail with "channel type does not exist", or still see the old
 * settings). Call this right after creating/updating a channel type, before using it.
 * It waits for what changed since the last call: new types `CHANNEL_TYPE_UPDATE_MS`
 * after creation and until lookups agree on them, updates of docs-test types `CHANNEL_TYPE_UPDATE_MS` and updates of other types
 * `CHANNEL_TYPE_PROPAGATION_MS` after the last update.
 */
export const waitForChannelTypePropagation = async () => {
  for (const [name, { client, at }] of pendingChannelTypes.created) {
    await waitForChannelTypeKnown(client, name);
    await sleep(at + CHANNEL_TYPE_UPDATE_MS - Date.now());
  }
  pendingChannelTypes.created.clear();
  const { lastUpdate } = pendingChannelTypes;
  pendingChannelTypes.lastUpdate = undefined;
  if (lastUpdate) {
    const wait = lastUpdate.existing
      ? CHANNEL_TYPE_PROPAGATION_MS
      : CHANNEL_TYPE_UPDATE_MS;
    await sleep(lastUpdate.at + wait - Date.now());
  }
};

/**
 * Retries `fn` while it fails with "channel type does not exist". Only a fallback on
 * top of `waitForChannelTypePropagation` if a test is still flaky.
 */
export const retryWhileChannelTypePropagates = <T>(fn: () => Promise<T>) =>
  retry(fn, { timeout: 60000, interval: 2000, retryIf: isChannelTypeMissing });

/** Polls a background task (e.g. from server-side `deleteChannels`) until it finishes. */
export const waitForTask = async (
  client: StreamClient,
  taskId: string,
  timeout = 60000,
) => {
  const task = await retry(
    async () => {
      const response = await client.getTask({ id: taskId });
      if (response.status !== 'completed' && response.status !== 'failed') {
        throw new Error(`task ${taskId} is still ${response.status}`);
      }
      return response;
    },
    { timeout, interval: 1000 },
  );
  if (task.status === 'failed') {
    throw new Error(`task ${taskId} failed: ${JSON.stringify(task.error)}`);
  }
  return task;
};

/**
 * Polls a channel batch update task (`updateChannelsBatch`) until the inner
 * `result.status` is `completed` and `result.finished_at` is set: its top-level `status`
 * reaches `completed` before the channels are updated, so `waitForTask` isn't enough.
 * A batch started right after another one can take ~60s: raise the test's timeout.
 */
export const waitForBatchTask = (
  client: StreamClient,
  taskId: string,
  timeout = 150000,
) =>
  retry(
    async () => {
      const task = await client.getTask({ id: taskId });
      if (task.status === 'failed') {
        throw new Error(`task ${taskId} failed: ${JSON.stringify(task)}`);
      }
      if (task.result?.status !== 'completed' || !task.result?.finished_at) {
        throw new Error(
          `batch ${taskId} is not finished yet: ${JSON.stringify(task)}`,
        );
      }
      return task;
    },
    { timeout, interval: 1000 },
  );
