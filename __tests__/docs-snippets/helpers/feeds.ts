import { expect, vi } from 'vitest';
import type { AddActivityRequest, StreamClient } from '../../../index';
import type { Cleanup } from './cleanup';
import { uniqueId } from './ids';
import { retry } from './wait';

type FeedsClient = StreamClient['feeds'];
type AsyncRequestMethod = (request: never) => Promise<unknown>;
/** Methods of `client.feeds` that take one request object and return a promise. */
type FeedsMethod = {
  [K in keyof FeedsClient]: FeedsClient[K] extends AsyncRequestMethod
    ? K
    : never;
}[keyof FeedsClient];

/** A new feed group isn't known to every API node right away (code 16 "... not found"). */
export const isFeedGroupMissing = (error: unknown) =>
  String(error instanceof Error ? error.message : error).includes('not found');

/**
 * For regions that call into a just-created feed group: spies on the given
 * `client.feeds` methods so each call is retried while API nodes answer
 * "Feed group with ID ... not found". `StreamFeed` methods go through `client.feeds`,
 * so spy on the generated method (e.g. `getOrCreateFeed`, `follow`). Restore with
 * `vi.restoreAllMocks()`. Avoid `addActivity` here (a retry can add it twice, see
 * `addActivityOnce`).
 */
export const retryOnFeedGroupMissing = (
  client: StreamClient,
  methods: FeedsMethod[],
) => {
  // A plain record view of `client.feeds`: spying through the method-name union
  // directly is too complex for TS (TS2590).
  const feeds = client.feeds as unknown as Record<string, AsyncRequestMethod>;
  for (const method of methods) {
    const original = feeds[method].bind(client.feeds);
    vi.spyOn(feeds, method).mockImplementation((request: never) =>
      retry(() => original(request), { retryIf: isFeedGroupMissing }),
    );
  }
};

/**
 * Waits until a new feed group can be read back several times in a row, for setup
 * before a region that calls `addActivity` into it (which can't be retried blindly).
 */
export const waitForFeedGroup = async (client: StreamClient, id: string) => {
  for (let i = 0; i < 5; i++) {
    await retry(() => client.feeds.getFeedGroup({ id }), {
      retryIf: isFeedGroupMissing,
    });
  }
};

/**
 * Adds an activity (setup only) into a feed whose group may be new. `addActivity` can
 * answer "Feed group ... not found" after it already stored the activity, so a blind
 * retry adds it twice: give it a `uniqueId` id and retry only while it isn't stored.
 */
export const addActivityOnce = async (
  client: StreamClient,
  request: AddActivityRequest,
) => {
  const id = request.id ?? uniqueId('activity');
  await retry(
    async () => {
      try {
        await client.feeds.addActivity({ ...request, id });
      } catch (error) {
        const stored = await client.feeds
          .getActivity({ id })
          .then(() => true)
          .catch(() => false);
        if (!stored) throw error;
      }
    },
    { retryIf: isFeedGroupMissing },
  );
  return id;
};

/**
 * Creates a `uniqueId` feed group with the settings of a built-in group (`notification`,
 * `user`, `timeline`, ...), for fences that change a built-in group (built-in groups are
 * app-wide). Registers it on `cleanup.feedGroups`; returns its id and the built-in group.
 */
export const copyFeedGroup = async (
  client: StreamClient,
  cleanup: Cleanup,
  builtInId: string,
) => {
  const { feed_group: builtIn } = await client.feeds.getFeedGroup({
    id: builtInId,
  });
  const id = uniqueId(builtInId);
  cleanup.feedGroups.push(id);
  await client.feeds.createFeedGroup({
    id,
    default_visibility: builtIn.default_visibility,
    activity_processors: builtIn.activity_processors,
    aggregation: builtIn.aggregation,
    notification: builtIn.notification,
    push_notification: builtIn.push_notification,
    ranking: builtIn.ranking,
  });
  return { id, builtIn };
};

/** The types of every notification activity in a user's built-in `notification` feed (sorted). */
export const notificationTypes = async (
  client: StreamClient,
  userId: string,
) => {
  const response = await client.feeds
    .feed('notification', userId)
    .getOrCreate({ user_id: userId });
  return response.aggregated_activities
    .flatMap((group) => group.activities.map((a) => a.type))
    .sort();
};

/** Retries until the user's notification types equal `expected` (sorted); returns them. */
export const waitForNotificationTypes = (
  client: StreamClient,
  userId: string,
  expected: string[],
) =>
  retry(async () => {
    const types = await notificationTypes(client, userId);
    expect(types).toEqual([...expected].sort());
    return types;
  });

/**
 * Deletes a membership level, retrying while feed members still use it (code 17
 * "Cannot delete membership level that is currently in use by feed members"; feed
 * deletes take a moment). "Not found" counts as deleted.
 */
export const deleteMembershipLevel = async (
  client: StreamClient,
  id: string,
) => {
  try {
    await retry(() => client.feeds.deleteMembershipLevel({ id }), {
      interval: 2000,
      retryIf: (error) => String(error).includes('in use'),
    });
  } catch (error) {
    if (!/not found|does not exist|can't be found/i.test(String(error))) {
      throw error;
    }
  }
};
