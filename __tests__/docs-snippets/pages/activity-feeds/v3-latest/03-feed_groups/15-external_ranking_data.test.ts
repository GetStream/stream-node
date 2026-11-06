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
  addActivityOnce,
  isFeedGroupMissing,
  retryOnFeedGroupMissing,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md';

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
 * | activity | popularity            | custom                               |
 * | -------- | --------------------- | ------------------------------------ |
 * | a0       | 5 (5 reactions)       | stock: tesla, stocks: []             |
 * | a1       | 4 (4 reactions)       | stock: nokia, stocks: [microsoft]    |
 * | a2       | 3 (1 share, 3 points) | stock: apple, stocks: [apple, tesla] |
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
    retryOnFeedGroupMissing(client, ['getOrCreateFeed', 'follow']),
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
    const post = async (name: string, custom: Record<string, unknown>) => {
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${authorId}`],
        text: name,
        custom,
        user_id: authorId,
      });
      names.set(activity.id, name);
      return activity.id;
    };
    const a0 = await post('a0', { stock: 'tesla', stocks: [] });
    const a1 = await post('a1', { stock: 'nokia', stocks: ['microsoft'] });
    const a2 = await post('a2', { stock: 'apple', stocks: ['apple', 'tesla'] });
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

  it('ranks with external data', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Accessing external data in ranking expressions" tab="Node.js" index=1
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      ranking: {
        type: 'expression',
        score:
          'popularity * external.popularity_multiplier + share_count * external.share_multiplier',
        defaults: {
          external: {
            // Required: used when a read doesn't provide these fields
            popularity_multiplier: 1,
            share_multiplier: 1,
          },
        },
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.defaults).toEqual({
      external: { popularity_multiplier: 1, share_multiplier: 1 },
    });
    // No selectors: the group ranks the feed's own activities
    // (current_feed). b0 has popularity 5, b1 one share (popularity 3).
    cleanup.feeds.push(`${myId}:${readerId}`);
    const timeline = client.feeds.feed(myId, readerId);
    await retry(() => timeline.getOrCreate({ user_id: readerId }), {
      retryIf: isFeedGroupMissing,
    });
    const post = async (name: string) => {
      const activityId = await addActivityOnce(client, {
        type: 'post',
        feeds: [timeline.feed],
        text: name,
        user_id: authorId,
      });
      names.set(activityId, name);
      return activityId;
    };
    const b0 = await post('b0');
    const b1 = await post('b1');
    for (const type of ['like', 'love', 'wow', 'haha', 'sad']) {
      await client.feeds.addActivityReaction({
        activity_id: b0,
        type,
        user_id: readerId,
      });
    }
    await addActivityOnce(client, {
      type: 'post',
      feeds: [timeline.feed],
      parent_id: b1,
      text: 'shared',
      user_id: authorId,
    });
    // With the defaults: b0 5, b1 3 + 1 share.
    const plain = await waitForOrder(timeline, ['b0', 'b1']);
    expect(byName(plain).b1.score).toBe(4);
    await waitForOrder(timeline, ['b1', 'b0'], {
      external_ranking: { popularity_multiplier: 1, share_multiplier: 100 },
    });
    // The spy retryOnFeedGroupMissing installed.
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');
    getOrCreate.mockClear();

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Providing external data when reading the feed" tab="Node.js" index=1
    // COPY: readerId="<user id>"
    await timeline.getOrCreate({
      external_ranking: {
        popularity_multiplier: 1, // normal weight for popularity
        share_multiplier: 100, // very high boost for share_count
      },
      user_id: readerId,
    });
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    // The shared activity jumps to the top: 3 + 1 * 100.
    expect(order(response)).toEqual(['b1', 'b0']);
    expect(byName(response).b1.score).toBe(103);
  });

  it('ranks with map_lookup', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Arrays and Maps" tab="Node.js" index=1
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'popularity + map_lookup(stock, external.stock_boosts)',
        defaults: {
          stock: '',
          external: {
            stock_boosts: {},
          },
        },
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.defaults).toEqual({
      stock: '',
      external: { stock_boosts: {} },
    });
    const timeline = await followAuthor(myId);
    await waitForOrder(timeline, ['a0', 'a1', 'a2']);
    // The spy retryOnFeedGroupMissing installed.
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');
    getOrCreate.mockClear();

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Arrays and Maps" tab="Node.js" index=2
    // COPY: readerId="<user id>"
    await timeline.getOrCreate({
      external_ranking: {
        stock_boosts: {
          apple: 0.9,
          tesla: 0.5,
          microsoft: 0.3,
        },
      },
      user_id: readerId,
    });
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    // a0 (tesla) 5 + 0.5, a1 (nokia, not in the map) 4 + 0, a2 (apple) 3 + 0.9.
    const got = byName(response);
    expect(got.a0.score).toBeCloseTo(5.5, 5);
    expect(got.a1.score).toBeCloseTo(4, 5);
    expect(got.a2.score).toBeCloseTo(3.9, 5);
  });

  it('ranks with sum_map_lookup', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Arrays and Maps" tab="Node.js" index=3
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'popularity + sum_map_lookup(stocks, external.stock_boosts)',
        defaults: {
          stocks: [],
          external: {
            stock_boosts: {},
          },
        },
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.defaults).toEqual({
      stocks: [],
      external: { stock_boosts: {} },
    });
    const timeline = await followAuthor(myId);
    // a0 (no stocks) 5, a1 (microsoft) 4 + 2, a2 (apple, tesla) 3 + 15.
    await waitForOrder(timeline, ['a2', 'a1', 'a0'], {
      external_ranking: {
        stock_boosts: { apple: 10.0, tesla: 5.0, microsoft: 2.0 },
      },
    });
    // The spy retryOnFeedGroupMissing installed.
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');
    getOrCreate.mockClear();

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Arrays and Maps" tab="Node.js" index=4
    // COPY: readerId="<user id>"
    await timeline.getOrCreate({
      external_ranking: {
        stock_boosts: {
          apple: 10.0,
          tesla: 5.0,
          microsoft: 2.0,
        },
      },
      user_id: readerId,
    });

    // score = popularity + 10.0 + 5.0 = popularity + 15.0 (for activity with stocks: ['apple', 'tesla'])
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    expect(order(response)).toEqual(['a2', 'a1', 'a0']);
    const got = byName(response);
    expect(got.a2.score).toBe(18);
    expect(got.a1.score).toBe(6);
    expect(got.a0.score).toBe(5);
  });

  it('ranks with in_array', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Arrays and Maps" tab="Node.js" index=5
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'popularity + in_array(stock, external.watchlist) * 10',
        defaults: {
          stock: '',
          external: {
            watchlist: [],
          },
        },
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.defaults).toEqual({
      stock: '',
      external: { watchlist: [] },
    });
    const timeline = await followAuthor(myId);
    // a0 (tesla) 5 + 10, a1 (nokia) 4, a2 (apple) 3 + 10.
    await waitForOrder(timeline, ['a0', 'a2', 'a1'], {
      external_ranking: { watchlist: ['apple', 'tesla', 'microsoft'] },
    });
    // The spy retryOnFeedGroupMissing installed.
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');
    getOrCreate.mockClear();

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/15-external_ranking_data.md" heading="Arrays and Maps" tab="Node.js" index=6
    // COPY: readerId="<user id>"
    await timeline.getOrCreate({
      external_ranking: {
        watchlist: ['apple', 'tesla', 'microsoft'],
      },
      user_id: readerId,
    });

    // activities with stocks in the watchlist get a +10 boost, others get no boost.
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    expect(order(response)).toEqual(['a0', 'a2', 'a1']);
    const got = byName(response);
    expect(got.a0.score).toBe(15);
    expect(got.a2.score).toBe(13);
    expect(got.a1.score).toBe(4);
  });
});
