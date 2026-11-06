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
  'activity-feeds/v3-latest/_default/03-feed_groups/12-ranking_expressions.md';

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
 * | activity | popularity            | custom    |
 * | -------- | --------------------- | --------- |
 * | a0       | 5 (5 reactions)       |           |
 * | a1       | 4 (4 reactions)       | isBoosted |
 * | a2       | 3 (1 share, 3 points) |           |
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

/** The reader's feed in `groupId`, once ranked in `expected` order. */
const rankedFeed = async (groupId: string, expected: string[]) => {
  const feed = await followAuthor(groupId);
  return waitForOrder(feed, expected);
};

const createdGroups = (spy: { mock: { results: Array<{ value: unknown }> } }) =>
  Promise.all(
    spy.mock.results.map((r) => r.value as Promise<CreateFeedGroupResponse>),
  );

/**
 * popularity_gauss from the "Parameters" fence (origin 100, direction right,
 * scale 100, offset 5, decay 0.5) for values below the origin.
 */
const gauss = (popularity: number) => {
  const distance = Math.max(0, 100 - popularity - 5);
  const sigma2 = -(100 ** 2) / (2 * Math.log(0.5));
  return Math.exp(-(distance ** 2) / (2 * sigma2));
};

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
    const post = async (name: string, custom: Record<string, unknown> = {}) => {
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
    const a0 = await post('a0');
    const a1 = await post('a1', { isBoosted: true });
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

  it('ranks with custom data and defaults', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/12-ranking_expressions.md" heading="Activity data" tab="Node.js" index=1
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'popularity * (custom.isBoosted ? 1.5 : 1)',
        defaults: {
          custom: {
            isBoosted: false,
          },
        },
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.defaults).toEqual({
      custom: { isBoosted: false },
    });
    // a1 (popularity 4) is boosted to 6, above a0 (5).
    const feed = await rankedFeed(myId, ['a1', 'a0', 'a2']);
    expect(byName(feed).a1.score).toBe(6);
    // Without the default, the expression is rejected.
    await expect(
      client.feeds.createFeedGroup({
        id: newFeedGroupId('no-default'),
        ranking: {
          type: 'expression',
          score: 'popularity * (custom.isBoosted ? 1.5 : 1)',
        },
      }),
    ).rejects.toThrow('expression references fields without defaults');
  });

  it('ranks with decay functions', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/12-ranking_expressions.md" heading="Parameters" tab="Node.js" index=1
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        functions: {
          simple_gauss: {
            base: 'decay_gauss',
            scale: '5d',
            offset: '1d',
            decay: '0.3',
          },
          popularity_gauss: {
            base: 'decay_gauss',
            origin: '100',
            direction: 'right',
            scale: '100',
            offset: '5',
            decay: '0.5',
          },
        },
        score: 'simple_gauss(time)*popularity_gauss(popularity)',
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(Object.keys(feed_group.ranking?.functions ?? {}).sort()).toEqual([
      'popularity_gauss',
      'simple_gauss',
    ]);
    // A second author with one activity at the origin (popularity 100:
    // 50 comments), which should score 1.
    const starId = await createUser('star');
    cleanup.feeds.push(`user:${starId}`);
    await client.feeds.feed('user', starId).getOrCreate({ user_id: starId });
    const { activity: star } = await client.feeds.addActivity({
      type: 'post',
      feeds: [`user:${starId}`],
      text: 'star',
      user_id: starId,
    });
    await client.feeds.addCommentsBatch({
      comments: Array.from({ length: 50 }, (_, i) => ({
        object_id: star.id,
        object_type: 'activity',
        comment: `comment ${i}`,
        user_id: starId,
      })),
    });
    const feed = await followAuthor(myId);
    await client.feeds.follow({ source: feed.feed, target: `user:${starId}` });
    // simple_gauss(time) is 1 for activities younger than a day, so the
    // score is popularity_gauss(popularity): 1 at the origin, lower below it.
    const response = await waitForOrder(feed, ['a0', 'a1', 'a2']);
    const got = byName(response);
    expect(got.a0.score).toBeCloseTo(gauss(5), 2);
    expect(got.a1.score).toBeCloseTo(gauss(4), 2);
    expect(got.a2.score).toBeCloseTo(gauss(3), 2);
    const starRead = await retry(async () => {
      const r = await feed.getOrCreate({ user_id: readerId });
      const found = r.activities.find((a) => a.id === star.id);
      if (found?.popularity !== 100) throw new Error('star not ranked yet');
      return found;
    });
    expect(starRead.score).toBeCloseTo(1, 5);
  });

  it('ranks by selector source', async () => {
    const selectorTimelineId = newFeedGroupId('selector-timeline');
    const multiSelectorTimelineId = newFeedGroupId('multi-selector-timeline');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/12-ranking_expressions.md" heading="Ranking by Selector Source" tab="Node.js" index=1
    // COPY: selectorTimelineId="selector_timeline", multiSelectorTimelineId="multi_selector_timeline"
    // Example 1: Simple boost - following activities get 2x multiplier
    await serverClient.feeds.createFeedGroup({
      id: selectorTimelineId,
      activity_selectors: [
        { type: 'following' },
        { type: 'popular', min_popularity: 1 },
      ],
      ranking: {
        type: 'expression',
        score: 'selector_source == "following" ? popularity * 2 : popularity',
        defaults: {
          selector_source: '', // Required when using selector_source in expressions
        },
      },
    });

    // Example 2: Multiple selectors with different bonuses
    await serverClient.feeds.createFeedGroup({
      id: multiSelectorTimelineId,
      activity_selectors: [
        { type: 'following' },
        { type: 'interest' },
        { type: 'popular', min_popularity: 1 },
      ],
      ranking: {
        type: 'expression',
        score: `
          (selector_source == "following" ? 10 : 0) + 
          (selector_source == "interest" ? 5 : 0) + 
          popularity
        `,
        defaults: {
          selector_source: '',
        },
      },
    });
    // #endregion snippet

    const groups = await createdGroups(create);
    expect(groups.map((g) => g.feed_group.activity_selectors?.length)).toEqual([
      2, 3,
    ]);
    // The author's activities come from the following selector (the first
    // one): their popularity is doubled / gets +10.
    const first = await rankedFeed(selectorTimelineId, ['a0', 'a1', 'a2']);
    for (const activity of ours(first)) {
      expect(activity.selector_source).toBe('following');
      expect(activity.score).toBe(activity.popularity * 2);
    }
    const second = await rankedFeed(multiSelectorTimelineId, [
      'a0',
      'a1',
      'a2',
    ]);
    for (const activity of ours(second)) {
      expect(activity.selector_source).toBe('following');
      expect(activity.score).toBe(activity.popularity + 10);
    }
  });
});
