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
  GetOrCreateFeedRequest,
  GetOrCreateFeedResponse,
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
  'activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md';

const client = getServerClient();
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

const amsterdam = { lat: 52.373558, lng: 4.885261 };
const withinAmsterdam = {
  within_bounds: {
    $eq: {
      ne_lat: 52.43017,
      ne_lng: 4.924821,
      sw_lat: 52.334272,
      sw_lng: 4.822116,
    },
  },
};

/*
 * Shared data, all public (the author's `user` feed and a `drafts` feed):
 *
 * | activity | feed          | type    | popularity        | location  | filter_tags   | interest_tags | search_data        |
 * | -------- | ------------- | ------- | ----------------- | --------- | ------------- | ------------- | ------------------ |
 * | hot      | user:author   | post    | 70 (35 comments)  | Amsterdam | green, orange | hiking        | workout_type: hike |
 * | warm     | user:author   | post    | 10 (5 comments)   | Amsterdam | green         | cooking       | workout_type: run  |
 * | workout  | user:author   | workout | 0                 | -         | -             | hiking        | -                  |
 * | draft    | drafts:author | post    | 10 (5 comments)   | -         | -             | -             | -                  |
 *
 * The reader is interested in hiking.
 */
let authorId: string;
let readerId: string;
let draftsId: string;
const names = new Map<string, string>();

/** Our activities in the feed, by name, in feed order. */
const ours = (response: GetOrCreateFeedResponse) =>
  response.activities
    .filter((a) => names.has(a.id))
    .map((a) => names.get(a.id));

/** The reader's feed in `groupId` (created once, registered for cleanup). */
const readerFeed = (groupId: string) => {
  cleanup.feeds.push(`${groupId}:${readerId}`);
  return client.feeds.feed(groupId, readerId);
};

/** Reads the reader's feed until `check` passes on our activities. */
const readUntil = (
  groupId: string,
  check: (got: Array<string | undefined>) => boolean,
  request: Omit<GetOrCreateFeedRequest, 'user_id'> = {},
) =>
  retry(async () => {
    const response = await client.feeds
      .feed(groupId, readerId)
      .getOrCreate({ user_id: readerId, ...request });
    const got = ours(response);
    if (!check(got)) throw new Error(`got ${got.join()}`);
    return response;
  });

const has =
  (...expected: string[]) =>
  (got: Array<string | undefined>) =>
    expected.every((n) => got.includes(n));
const exactly =
  (...expected: string[]) =>
  (got: Array<string | undefined>) =>
    [...got].sort().join() === [...expected].sort().join();

const followAuthor = (groupId: string) =>
  retry(
    () =>
      client.feeds.follow({
        source: `${groupId}:${readerId}`,
        target: `user:${authorId}`,
      }),
    { retryIf: isFeedGroupMissing },
  );

const updatedGroup = (spy: { mock: { results: Array<{ value: unknown }> } }) =>
  spy.mock.results[0].value as Promise<UpdateFeedGroupResponse>;

describe(DOCS, () => {
  // Calls into a new group can reach API nodes that don't know it yet
  // (activities are added with `addActivityOnce`: a retried addActivity can
  // add them twice).
  beforeEach(() =>
    retryOnFeedGroupMissing(client, [
      'getOrCreateFeed',
      'follow',
      'updateFeedGroup',
    ]),
  );
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  beforeAll(async () => {
    authorId = await createUser('author');
    readerId = await createUser('reader');
    const fanId = await createUser('fan');
    draftsId = newFeedGroupId('drafts');
    await client.feeds.createFeedGroup({ id: draftsId });
    cleanup.feeds.push(`user:${authorId}`, `${draftsId}:${authorId}`);
    await client.feeds
      .feed('user', authorId)
      .getOrCreate({ user_id: authorId });
    await retry(
      () =>
        client.feeds
          .feed(draftsId, authorId)
          .getOrCreate({ user_id: authorId }),
      { retryIf: isFeedGroupMissing },
    );
    const post = async (
      name: string,
      comments: number,
      request: Partial<Parameters<typeof client.feeds.addActivity>[0]>,
    ) => {
      // The drafts group is new: retry until every API node knows it.
      const activityId = await addActivityOnce(client, {
        type: 'post',
        feeds: [`user:${authorId}`],
        text: name,
        user_id: authorId,
        ...request,
      });
      names.set(activityId, name);
      if (comments > 0) {
        await client.feeds.addCommentsBatch({
          comments: Array.from({ length: comments }, (_, i) => ({
            object_id: activityId,
            object_type: 'activity',
            comment: `comment ${i}`,
            user_id: fanId,
          })),
        });
      }
      return activityId;
    };
    const hot = await post('hot', 35, {
      location: amsterdam,
      filter_tags: ['green', 'orange'],
      interest_tags: ['hiking'],
      search_data: { workout_type: 'hike' },
    });
    const warm = await post('warm', 5, {
      location: amsterdam,
      filter_tags: ['green'],
      interest_tags: ['cooking'],
      search_data: { workout_type: 'run' },
    });
    await post('workout', 0, { type: 'workout', interest_tags: ['hiking'] });
    const draft = await post('draft', 5, {
      feeds: [`${draftsId}:${authorId}`],
    });
    await retry(async () => {
      const popularity = await Promise.all(
        [hot, warm, draft].map(
          async (id) =>
            (await client.feeds.getActivity({ id })).activity.popularity,
        ),
      );
      if (popularity.join() !== '70,10,10') {
        throw new Error(`popularity is ${popularity.join()}`);
      }
    });
    await client.feeds.upsertUserInterests({
      user_id: readerId,
      interests: [{ tag: 'hiking', weight: 1 }],
    });
  });

  it('creates a group with the current feed selector', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Example" tab="Node.js" index=1
    // COPY: myId="myid"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'current_feed',
          // Optionally provide cutoff window
          cutoff_window: '10d',
        },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors).toMatchObject([
      { type: 'current_feed', cutoff_window: '10d' },
    ]);
    // The feed shows its own activities only.
    const feed = readerFeed(myId);
    await feed.getOrCreate({ user_id: readerId });
    await followAuthor(myId);
    const ownId = await addActivityOnce(client, {
      type: 'post',
      feeds: [feed.feed],
      text: 'own',
      user_id: readerId,
    });
    names.set(ownId, 'own');
    await readUntil(myId, exactly('own'));
  });

  it('creates a group with the following selector', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Example" tab="Node.js" index=2
    // COPY: myId="myid"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'following',
          // Optionally provide cutoff window
          cutoff_window: '10d',
        },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors).toMatchObject([
      { type: 'following', cutoff_window: '10d' },
    ]);
    await readerFeed(myId).getOrCreate({ user_id: readerId });
    await followAuthor(myId);
    // The author's user feed activities, not the drafts feed.
    await readUntil(myId, exactly('hot', 'warm', 'workout'));
  });

  it('creates a group with the popular selector', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Scope" tab="Node.js" index=1
    // COPY: myId="myid"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'popular',
          // Optional parameters
          min_popularity: 70,
          cutoff_window: '10d',
        },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors).toMatchObject([
      { type: 'popular', min_popularity: 70, cutoff_window: '10d' },
    ]);
    // Only hot reaches a popularity of 70; nobody is followed.
    readerFeed(myId);
    const feed = await readUntil(myId, has('hot'));
    expect(ours(feed)).toEqual(['hot']);
  });

  it('creates a group with the proximity selector and reads it', async () => {
    const myId = newFeedGroupId('myid');
    const feed = readerFeed(myId);
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');
    getOrCreate.mockClear();

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Example" tab="Node.js" index=3
    // COPY: myId="myid", readerId="<user id>"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'proximity',
          // Optional parameters
          min_popularity: 40,
          cutoff_window: '1d',
        },
      ],
    });

    // Provide filter when reading the feed
    await feed.getOrCreate({
      filter: {
        within_bounds: {
          $eq: {
            ne_lat: 52.43017,
            ne_lng: 4.924821,
            sw_lat: 52.334272,
            sw_lng: 4.822116,
          },
        },
      },
      user_id: readerId,
    });

    // Use either within_bounds or near filter
    await feed.getOrCreate({
      filter: {
        near: { $eq: { lat: 52.373558, lng: 4.885261, distance: 10 } },
      },
      user_id: readerId,
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors).toMatchObject([
      { type: 'proximity', min_popularity: 40, cutoff_window: '1d' },
    ]);
    const reads = await Promise.all(
      getOrCreate.mock.results.map(
        (r) => r.value as Promise<GetOrCreateFeedResponse>,
      ),
    );
    expect(reads).toHaveLength(2);
    // hot and warm are both in Amsterdam, only hot reaches 40.
    for (const read of reads) expect(ours(read)).toEqual(['hot']);
    // Without a location filter the read is rejected.
    await expect(feed.getOrCreate({ user_id: readerId })).rejects.toThrow(
      'no near or within_bounds filter provided',
    );
  });

  it('creates a group with the interest selector', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Examples" tab="Node.js" index=1
    // COPY: myId="myid"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'interest',
          // Optional parameters
          sort: [{ field: 'popularity', direction: -1 }],
          filter: {
            activity_type: 'post',
          },
        },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors).toMatchObject([
      {
        type: 'interest',
        sort: [{ field: 'popularity', direction: -1 }],
        filter: { activity_type: 'post' },
      },
    ]);
    // The reader likes hiking: hot (a post), not workout (another type) or
    // warm (cooking).
    readerFeed(myId);
    const feed = await readUntil(myId, has('hot'));
    expect(ours(feed)).toEqual(['hot']);
  });

  it('creates a group with the query selector', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Example" tab="Node.js" index=4
    // COPY: myId="myid"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'query',
          filter: { search_data: { $contains: { workout_type: 'hike' } } },
          // Optional parameters
          sort: [{ field: 'created_at', direction: -1 }],
        },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors).toMatchObject([
      {
        type: 'query',
        filter: { search_data: { $contains: { workout_type: 'hike' } } },
      },
    ]);
    readerFeed(myId);
    const feed = await readUntil(myId, has('hot'));
    expect(ours(feed)).toEqual(['hot']);
  });

  it('creates a group with the follow suggestion selector', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Example" tab="Node.js" index=5
    // COPY: myId="myid"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'follow_suggestion',
          // Optional parameters
          min_popularity: 10,
          cutoff_window: '10d',
          params: {
            activities_per_feed: 3,
            max_suggested_feeds: 15,
            min_feed_score: 0.4,
          },
        },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors).toMatchObject([
      {
        type: 'follow_suggestion',
        min_popularity: 10,
        cutoff_window: '10d',
        params: {
          activities_per_feed: 3,
          max_suggested_feeds: 15,
          min_feed_score: 0.4,
        },
      },
    ]);
    // Suggestions depend on app-wide data: only check that the feed reads.
    const { activities } = await readerFeed(myId).getOrCreate({
      user_id: readerId,
    });
    expect(Array.isArray(activities)).toBe(true);
  });

  it('filters with $and', async () => {
    const followingId = newFeedGroupId('following');
    await client.feeds.createFeedGroup({
      id: followingId,
      activity_selectors: [{ type: 'following' }],
    });
    await readerFeed(followingId).getOrCreate({ user_id: readerId });
    await followAuthor(followingId);
    await readUntil(followingId, exactly('hot', 'warm', 'workout'));

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Filters" tab="Node.js" index=1
    // Get all the activities where filter tags contain both "green" and "orange"
    const filter = {
      $and: [{ filter_tags: ['green'] }, { filter_tags: ['orange'] }],
    };
    // #endregion snippet

    // Only hot has both tags (warm has just green).
    await readUntil(followingId, exactly('hot'), { filter });
  });

  it('scopes a selector to feed groups', async () => {
    const myId = newFeedGroupId('myid');
    await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'popular' }],
    });
    readerFeed(myId);
    // Without a scope the popular selector (min popularity 5) also picks the
    // draft.
    await readUntil(myId, exactly('hot', 'warm', 'draft'));
    const update = vi.spyOn(client.feeds, 'updateFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Feed group scope" tab="Node.js" index=1
    // COPY: myId="myid", draftsId="drafts"
    await client.feeds.updateFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'popular',
          feed_groups: { exclude: [draftsId] },
        },
      ],
    });
    // #endregion snippet

    const { feed_group } = await updatedGroup(update);
    expect(feed_group.activity_selectors).toMatchObject([
      { type: 'popular', feed_groups: { exclude: [draftsId] } },
    ]);
    await readUntil(myId, exactly('hot', 'warm'));
  });

  it('sets a ranking candidate limit', async () => {
    const myId = newFeedGroupId('myid');
    await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'popular' }],
    });
    const update = vi.spyOn(client.feeds, 'updateFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Ranking candidate limit" tab="Node.js" index=1
    // COPY: myId="myid"
    await client.feeds.updateFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'popular',
          ranking_candidate_limit: 200,
        },
      ],
    });
    // #endregion snippet

    const { feed_group } = await updatedGroup(update);
    expect(feed_group.activity_selectors).toMatchObject([
      { type: 'popular', ranking_candidate_limit: 200 },
    ]);
    readerFeed(myId);
    await readUntil(myId, has('hot', 'warm', 'draft'));
    // The selectors that don't support it reject it.
    await expect(
      client.feeds.updateFeedGroup({
        id: myId,
        activity_selectors: [
          { type: 'following', ranking_candidate_limit: 200 },
        ],
      }),
    ).rejects.toThrow('ranking_candidate_limit');
  });

  it('sets a time budget', async () => {
    const myId = newFeedGroupId('myid');
    await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [{ type: 'proximity' }],
    });
    const update = vi.spyOn(client.feeds, 'updateFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Time budget" tab="Node.js" index=1
    // COPY: myId="myid"
    await client.feeds.updateFeedGroup({
      id: myId,
      activity_selectors: [
        {
          type: 'proximity',
          time_budget_ms: 150,
        },
      ],
    });
    // #endregion snippet

    const { feed_group } = await updatedGroup(update);
    expect(feed_group.activity_selectors).toMatchObject([
      { type: 'proximity', time_budget_ms: 150 },
    ]);
    readerFeed(myId);
    await readUntil(myId, exactly('hot', 'warm'), { filter: withinAmsterdam });
  });

  it('combines selectors', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/05-activity_selectors.md" heading="Combining selectors" tab="Node.js" index=1
    // COPY: myId="myid"
    const response = await client.feeds.createFeedGroup({
      id: myId,
      activity_selectors: [
        { type: 'popular' },
        { type: 'following' },
        { type: 'interest' },
      ],

      ranking: { type: 'expression', score: 'decay_linear(time) * popularity' },
    });
    // #endregion snippet

    expect(response.feed_group.activity_selectors?.map((s) => s.type)).toEqual([
      'popular',
      'following',
      'interest',
    ]);
    await readerFeed(myId).getOrCreate({ user_id: readerId });
    await followAuthor(myId);
    // popular: hot, warm, draft; following: hot, warm, workout; interest:
    // hot, workout. Ranked by popularity: hot (70) first, workout (0) last.
    const feed = await readUntil(myId, (got) => {
      return got.length === 4 && got[0] === 'hot' && got[3] === 'workout';
    });
    expect([...ours(feed)].sort()).toEqual(['draft', 'hot', 'warm', 'workout']);
  });
});
