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
  UpdateFeedGroupResponse,
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
  'activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md';

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
 * | activity | popularity           | custom                                      | interest_tags |
 * | -------- | -------------------- | ------------------------------------------- | ------------- |
 * | a0       | 5 (5 reactions)      | stock: tesla, stocks: []                    | exercise      |
 * | a1       | 4 (4 reactions)      | isBoosted, stock: nokia, stocks: [microsoft] | food          |
 * | a2       | 3 (1 share, 3 points) | stock: apple, stocks: [apple, tesla]        | travel        |
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

describe(DOCS, () => {
  // Calls into a new group can reach API nodes that don't know it yet
  // (activities in new groups are added with `addActivityOnce`: a retried
  // addActivity can add them twice).
  beforeEach(() =>
    retryOnFeedGroupMissing(client, [
      'getOrCreateFeed',
      'follow',
      'markActivity',
      'activityFeedback',
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
    const post = async (
      name: string,
      custom: Record<string, unknown>,
      tag: string,
    ) => {
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${authorId}`],
        text: name,
        custom,
        interest_tags: [tag],
        user_id: authorId,
      });
      names.set(activity.id, name);
      return activity.id;
    };
    const a0 = await post('a0', { stock: 'tesla', stocks: [] }, 'exercise');
    const a1 = await post(
      'a1',
      { isBoosted: true, stock: 'nokia', stocks: ['microsoft'] },
      'food',
    );
    const a2 = await post(
      'a2',
      { stock: 'apple', stocks: ['apple', 'tesla'] },
      'travel',
    );
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

  it('creates a feed group with an expression ranking', async () => {
    const myTimelineId = newFeedGroupId('mytimeline');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="" tab="Node.js" index=1
    // COPY: myTimelineId="mytimeline"
    const response = await serverClient.feeds.createFeedGroup({
      id: myTimelineId,
      ranking: { type: 'expression', score: 'decay_linear(time) * popularity' },
      activity_selectors: [
        {
          type: 'following',
        },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.ranking).toEqual({
      type: 'expression',
      score: 'decay_linear(time) * popularity',
    });
    // Ranked by popularity (decay is ~1 for new activities), not recency.
    const feed = await rankedFeed(myTimelineId, ['a0', 'a1', 'a2']);
    const got = byName(feed);
    expect(got.a0.score).toBeCloseTo(5, 1);
    expect(got.a2.score).toBeCloseTo(3, 1);
  });

  it('updates a feed group', async () => {
    // The docs talk about built-in groups, but those are app-wide: the fence
    // runs on a uniqueId group.
    const feedGroupId = newFeedGroupId('to-update');
    await client.feeds.createFeedGroup({
      id: feedGroupId,
      ranking: { type: 'expression', score: 'popularity' },
    });
    const updateFeedGroup = client.feeds.updateFeedGroup.bind(client.feeds);
    const update = vi.spyOn(client.feeds, 'updateFeedGroup');
    update.mockImplementation((request) =>
      retry(() => updateFeedGroup(request), { retryIf: isFeedGroupMissing }),
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="" tab="Node.js" index=2
    // COPY: feedGroupId="<id of feed group to update>"
    await client.feeds.updateFeedGroup({
      id: feedGroupId,
      // Fields to update
    });
    // #endregion snippet

    const { feed_group } = await (update.mock.results[0]
      .value as Promise<UpdateFeedGroupResponse>);
    expect(feed_group.id).toBe(feedGroupId);
    // Updates replace every field: the omitted ranking is cleared.
    expect(feed_group.ranking).toBeUndefined();
  });

  it('ranks by popularity', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="" tab="Node.js" index=3
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'popularity',
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.score).toBe('popularity');
    const feed = await rankedFeed(myId, ['a0', 'a1', 'a2']);
    for (const activity of ours(feed)) {
      expect(activity.score).toBe(activity.popularity);
    }
  });

  it('ranks with custom data and defaults', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Activity data" tab="Node.js" index=1
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Parameters" tab="Node.js" index=1
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
    const feed = await followAuthor(myId);
    const response = await retry(async () => {
      const r = await feed.getOrCreate({ user_id: readerId });
      if (ours(r).length !== 3) throw new Error('activities missing');
      return r;
    });
    // (2026-10-16) Every activity scores 0: popularity_gauss has no
    // `origin`, which defaults to now (a UNIX timestamp), so popularity is
    // never near it.
    expect(ours(response).map((a) => a.score)).toEqual([0, 0, 0]);
    // simple_gauss alone gives activities younger than the offset a 1.
    const timeOnlyId = newFeedGroupId('time-only');
    await client.feeds.createFeedGroup({
      id: timeOnlyId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        functions: feed_group.ranking?.functions,
        score: 'simple_gauss(time)',
      },
    });
    const timeOnly = await followAuthor(timeOnlyId);
    const timeOnlyResponse = await retry(async () => {
      const r = await timeOnly.getOrCreate({ user_id: readerId });
      if (ours(r).length !== 3) throw new Error('activities missing');
      return r;
    });
    expect(ours(timeOnlyResponse).map((a) => a.score)).toEqual([1, 1, 1]);
  });

  it('ranks by interest weights', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Interest weights" tab="Node.js" index=1
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'interest',
        score: 'interest_score * popularity',
      },
    });
    // #endregion snippet

    const [{ feed_group }] = await createdGroups(create);
    expect(feed_group.ranking?.type).toBe('interest');

    const timeline = await followAuthor(myId);
    // The reader has no stored interests: every interest_score is 0.
    const plain = await retry(async () => {
      const r = await timeline.getOrCreate({ user_id: readerId });
      if (ours(r).length !== 3) throw new Error('activities missing');
      return r;
    });
    expect(ours(plain).map((a) => a.score)).toEqual([0, 0, 0]);
    // Settle the ranking with the docs' weights before the region.
    await waitForOrder(timeline, ['a2', 'a1', 'a0'], {
      interest_weights: { travel: 1, food: 0.5, exercise: -1 },
    });
    // The spy retryOnFeedGroupMissing installed.
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');
    getOrCreate.mockClear();

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="User interests" tab="Node.js" index=1
    // COPY: readerId="<user id>"
    await timeline.getOrCreate({
      interest_weights: {
        travel: 1,
        food: 0.5,
        exercise: -1,
      },
      user_id: readerId,
    });
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    // travel (a2) > food (a1) > exercise (a0, a negative score).
    expect(order(response)).toEqual(['a2', 'a1', 'a0']);
    const got = byName(response);
    expect(got.a1.score).toBeGreaterThan(0);
    expect(got.a0.score).toBeLessThan(0);
  });

  it('ranks by preference score', async () => {
    const myId = newFeedGroupId('myid');
    const myIdInterest = newFeedGroupId('myid-interest');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Preference score" tab="Node.js" index=1
    // COPY: myId="myid", myIdInterest="myid_interest"
    // Using preference_score with expression type
    await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'expression',
        score: 'preference_score * popularity',
      },
    });

    // Using preference_score with interest type
    await serverClient.feeds.createFeedGroup({
      id: myIdInterest,
      activity_selectors: [{ type: 'following' }],
      ranking: {
        type: 'interest',
        score: 'preference_score * interest_score * popularity',
      },
    });
    // #endregion snippet

    const groups = await createdGroups(create);
    expect(groups.map((g) => g.feed_group.ranking?.type)).toEqual([
      'expression',
      'interest',
    ]);
    // A user of their own: activity feedback changes their preferences.
    const userId = await createUser('preferences');
    const feed = await followAuthor(myId, userId);
    // Without activity feedback preference_score is 0 for every activity.
    const before = await retry(async () => {
      const r = await feed.getOrCreate({ user_id: userId });
      if (ours(r).length !== 3) throw new Error('activities missing');
      return r;
    });
    expect(ours(before).map((a) => a.score)).toEqual([0, 0, 0]);
    // "Show more" on a2 (travel) moves it to the top.
    await client.feeds.activityFeedback({
      activity_id: byName(before).a2.id,
      show_more: true,
      user_id: userId,
    });
    const after = await waitForOrder(feed, ['a2', 'a1', 'a0'], {}, userId);
    expect(byName(after).a2.score).toBeGreaterThan(0);
    expect(byName(after).a1.score).toBe(0);
  });

  it('ranks by selector source', async () => {
    const selectorTimelineId = newFeedGroupId('selector-timeline');
    const multiSelectorTimelineId = newFeedGroupId('multi-selector-timeline');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Ranking by Selector Source" tab="Node.js" index=1
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

  it('ranks read activities lower', async () => {
    const rankedTimelineId = newFeedGroupId('ranked-timeline');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Ranking by Read/Seen Status" tab="Node.js" index=1
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Ranking by Read/Seen Status" tab="Node.js" index=2
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

  it('ranks with external data', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Accessing external data in ranking expressions" tab="Node.js" index=1
    // COPY: myId="myid"
    await serverClient.feeds.createFeedGroup({
      id: myId,
      ranking: {
        type: 'expression',
        score:
          'popularity * external.popularity_multiplier + share_count * external.share_multiplier',
        defaults: {
          external: {
            // Provide default values if external data isn't provided when reading the feed
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Providing external data when reading the feed" tab="Node.js" index=1
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Arrays and Maps" tab="Node.js" index=1
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Arrays and Maps" tab="Node.js" index=2
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Arrays and Maps" tab="Node.js" index=3
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Arrays and Maps" tab="Node.js" index=4
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Arrays and Maps" tab="Node.js" index=5
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Arrays and Maps" tab="Node.js" index=6
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

  it('inspects ranking variables', async () => {
    // The docs' "sara": a timeline that follows the author.
    const saraId = await createUser('sara');
    await followAuthor('timeline', saraId);
    await retry(async () => {
      const r = await client.feeds
        .feed('timeline', saraId)
        .getOrCreate({ user_id: saraId });
      if (!r.activities.length) throw new Error('timeline still empty');
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/04-custom_ranking.md" heading="Inspecting ranking variables" tab="Node.js" index=1
    // COPY: saraId="sara"
    const feed = client.feeds.feed('timeline', saraId);
    const response = await feed.getOrCreate({ user_id: saraId });

    console.log(response.activities[0].score);
    console.log(response.activities[0].reaction_count);
    console.log(response.activities[0].popularity);
    // #endregion snippet

    const first = response.activities[0];
    expect(names.has(first.id)).toBe(true);
    expect(log.mock.calls).toEqual([
      [first.score],
      [first.reaction_count],
      [first.popularity],
    ]);
    expect(typeof first.score).toBe('number');
  });
});
