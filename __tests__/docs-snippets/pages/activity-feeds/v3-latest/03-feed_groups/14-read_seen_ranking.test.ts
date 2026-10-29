import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type {
  ActivityResponse,
  CreateFeedGroupResponse,
  GetOrCreateFeedRequest,
  GetOrCreateFeedResponse,
  StreamFeed,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  isFeedGroupMissing,
  retryOnFeedGroupMissing,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/14-read_seen_ranking.md';

// The docs use both names for the server client.
const client = getServerClient();
const serverClient = client;
const cleanup = new Cleanup(client);

// Feed groups are app-wide: every group a fence creates gets a uniqueId id.
const newFeedGroupId = (name: string) => {
  const id = uniqueId(name);
  cleanup.feedGroups.push(id);
  return id;
};

const createUser = async (name: string) => {
  const id = uniqueId(name);
  cleanup.users.push(id);
  await client.upsertUsers([{ id }]);
  return id;
};

/*
 * Shared data: a reader whose feeds (one per ranked group) follow an author's
 * user feed with three activities, posted oldest first (a0, a1, a2), so
 * recency alone would order them a2, a1, a0:
 *
 * | activity | popularity            |
 * | -------- | --------------------- |
 * | a0       | 5 (5 reactions)       |
 * | a1       | 4 (4 reactions)       |
 * | a2       | 3 (1 share, 3 points) |
 */
let authorId: string;
let readerId: string;
const names = new Map<string, string>();

/** Our activities in feed order, by name. */
const order = (response: GetOrCreateFeedResponse) =>
  ours(response).map((a) => names.get(a.id));
const ours = (response: GetOrCreateFeedResponse) =>
  response.activities.filter((a) => names.has(a.id));
const byName = (response: GetOrCreateFeedResponse) =>
  Object.fromEntries(ours(response).map((a) => [names.get(a.id), a])) as Record<
    string,
    ActivityResponse
  >;

/** The reader's feed in a new group, following the author. */
const followAuthor = async (groupId: string, userId = readerId) => {
  cleanup.feeds.push(`${groupId}:${userId}`);
  const feed = client.feeds.feed(groupId, userId);
  await retry(() => feed.getOrCreate({ user_id: userId }), {
    retryIf: isFeedGroupMissing,
  });
  await retry(
    () =>
      client.feeds.follow({ source: feed.feed, target: `user:${authorId}` }),
    { retryIf: isFeedGroupMissing },
  );
  return feed;
};

/** Reads the feed until all three activities are there in `expected` order. */
const waitForOrder = (
  feed: StreamFeed,
  expected: string[],
  request: Omit<GetOrCreateFeedRequest, 'user_id'> = {},
  userId = readerId,
) =>
  retry(async () => {
    const response = await feed.getOrCreate({ user_id: userId, ...request });
    const got = order(response);
    if (got.join() !== expected.join()) {
      throw new Error(`order is ${got.join()}, expected ${expected.join()}`);
    }
    return response;
  });

const createdGroups = (spy: { mock: { results: Array<{ value: unknown }> } }) =>
  Promise.all(
    spy.mock.results.map((r) => r.value as Promise<CreateFeedGroupResponse>),
  );

describe(DOCS, () => {
  // Calls into a new group can reach API nodes that don't know it yet
  // (activities in new groups are added with `addActivityOnce`: a retried
  // addActivity can add them twice).
  beforeEach(() =>
    retryOnFeedGroupMissing(client, [
      'getOrCreateFeed',
      'follow',
      'markActivity',
    ]),
  );
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  beforeAll(async () => {
    authorId = await createUser('author');
    readerId = await createUser('reader');
    const fanId = await createUser('fan');
    cleanup.feeds.push(`user:${authorId}`, `user:${fanId}`);
    await client.feeds
      .feed('user', authorId)
      .getOrCreate({ user_id: authorId });
    await client.feeds.feed('user', fanId).getOrCreate({ user_id: fanId });
    const post = async (name: string) => {
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${authorId}`],
        text: name,
        user_id: authorId,
      });
      names.set(activity.id, name);
      return activity.id;
    };
    const a0 = await post('a0');
    const a1 = await post('a1');
    const a2 = await post('a2');
    const types = ['like', 'love', 'wow', 'haha', 'sad'];
    for (const type of types) {
      await client.feeds.addActivityReaction({
        activity_id: a0,
        type,
        user_id: fanId,
      });
    }
    for (const type of types.slice(0, 4)) {
      await client.feeds.addActivityReaction({
        activity_id: a1,
        type,
        user_id: fanId,
      });
    }
    // A share: an activity with a2 as parent (in the fan's own feed).
    await client.feeds.addActivity({
      type: 'post',
      feeds: [`user:${fanId}`],
      parent_id: a2,
      text: 'shared',
      user_id: fanId,
    });
    await retry(async () => {
      const response = await client.feeds
        .feed('user', authorId)
        .getOrCreate({ user_id: authorId });
      const got = byName(response);
      const popularity = ['a0', 'a1', 'a2'].map((n) => got[n]?.popularity);
      if (popularity.join() !== '5,4,3' || got.a2.share_count !== 1) {
        throw new Error(`popularity is ${popularity.join()}`);
      }
    });
  });

  it('ranks read activities lower', async () => {
    const rankedTimelineId = newFeedGroupId('ranked-timeline');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/14-read_seen_ranking.md" heading="" tab="Node.js" index=1
    // COPY: rankedTimelineId="ranked_timeline"
    await serverClient.feeds.createFeedGroup({
      id: rankedTimelineId,
      activity_marks: {
        track_seen: true,
        track_read: true,
      },
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'popularity - (is_read ? 100 : 0)',
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.activity_marks).toMatchObject({ track_read: true });
    const feed = await followAuthor(rankedTimelineId);
    const unread = await waitForOrder(feed, ['a0', 'a1', 'a2']);
    const a0 = byName(unread).a0.id;
    await feed.markActivity({ mark_read: [a0], user_id: readerId });
    // The most popular activity drops to the bottom once read.
    const response = await waitForOrder(feed, ['a1', 'a2', 'a0']);
    expect(byName(response).a0).toMatchObject({ is_read: true, score: -95 });
  });

  it('ranks unseen activities first', async () => {
    const unseenTimelineId = newFeedGroupId('unseen-timeline');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/14-read_seen_ranking.md" heading="" tab="Node.js" index=2
    // COPY: unseenTimelineId="unseen_timeline"
    await serverClient.feeds.createFeedGroup({
      id: unseenTimelineId,
      activity_marks: {
        track_seen: true,
        track_read: true,
      },
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'is_seen ? 0 : 100',
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.score).toBe('is_seen ? 0 : 100');
    const feed = await followAuthor(unseenTimelineId);
    const before = await retry(async () => {
      const r = await feed.getOrCreate({ user_id: readerId });
      if (ours(r).length !== 3) throw new Error('activities missing');
      return r;
    });
    expect(ours(before).map((a) => a.score)).toEqual([100, 100, 100]);
    const a1 = byName(before).a1.id;
    await feed.markActivity({ mark_seen: [a1], user_id: readerId });
    const response = await retry(async () => {
      const r = await feed.getOrCreate({ user_id: readerId });
      if (order(r)[2] !== 'a1') throw new Error('a1 not last yet');
      return r;
    });
    expect(byName(response).a1).toMatchObject({ is_seen: true, score: 0 });
  });
});
