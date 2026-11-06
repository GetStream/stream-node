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
