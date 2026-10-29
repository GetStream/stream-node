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
  'activity-feeds/v3-latest/_default/03-feed_groups/13-interest_ranking.md';

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
 * | activity | popularity            | interest_tags |
 * | -------- | --------------------- | ------------- |
 * | a0       | 5 (5 reactions)       | exercise      |
 * | a1       | 4 (4 reactions)       | food          |
 * | a2       | 3 (1 share, 3 points) | travel        |
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
    const post = async (name: string, tag: string) => {
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${authorId}`],
        text: name,
        interest_tags: [tag],
        user_id: authorId,
      });
      names.set(activity.id, name);
      return activity.id;
    };
    const a0 = await post('a0', 'exercise');
    const a1 = await post('a1', 'food');
    const a2 = await post('a2', 'travel');
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

  it('ranks by interest weights', async () => {
    const myId = newFeedGroupId('myid');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/13-interest_ranking.md" heading="" tab="Node.js" index=1
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/13-interest_ranking.md" heading="User interests" tab="Node.js" index=1
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/13-interest_ranking.md" heading="Preference score" tab="Node.js" index=1
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
});
