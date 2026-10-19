import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type {
  CreateFeedsBatchRequest,
  GetOrCreateFeedResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  isFeedGroupMissing,
  retryOnFeedGroupMissing,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry, waitForTask } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md';

// The docs use both names for the server client.
const client = getServerClient();
const serverClient = client;
const cleanup = new Cleanup(client);

/** A `user` feed with a uniqueId id, registered for cleanup (not created). */
const newFeedId = (name: string) => {
  const id = uniqueId(name);
  cleanup.feeds.push(`user:${id}`);
  return id;
};

/** Creates a `user` feed owned by `ownerId`. */
const createFeed = async (name: string, ownerId: string) => {
  const id = newFeedId(name);
  const feed = client.feeds.feed('user', id);
  await feed.getOrCreate({ user_id: ownerId });
  return feed;
};

const texts = (response: GetOrCreateFeedResponse) =>
  response.activities.map((a) => a.text).sort();

describe(DOCS, () => {
  let userId: string;

  beforeAll(async () => {
    userId = uniqueId('owner');
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a feed', async () => {
    const jackId = newFeedId('jack');
    const janeId = newFeedId('jane');
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Creating a Feed" tab="Node.js" index=1
    // COPY: jackId="jack", janeId="jane", userId="<user id>"
    // Feed with no extra fields, of feed group "user"
    const feed = client.feeds.feed('user', jackId);
    await feed.getOrCreate({
      // The owner of the feed
      user_id: userId,
    });

    // More options
    const feedWithOptions = client.feeds.feed('user', janeId);
    await feedWithOptions.getOrCreate({
      data: {
        description: 'My personal feed',
        name: 'jane',
        visibility: 'public',
        filter_tags: ['tech', 'hiking', 'cooking'],
      },
      // The owner of the feed
      user_id: userId,
    });
    // #endregion snippet

    const [first, second] = await Promise.all(
      getOrCreate.mock.results.map(
        (r) => r.value as Promise<GetOrCreateFeedResponse>,
      ),
    );
    expect(first.created).toBe(true);
    expect(first.feed.feed).toBe(`user:${jackId}`);
    expect(first.feed.created_by.id).toBe(userId);
    expect(second.created).toBe(true);
    expect(second.feed).toMatchObject({
      feed: `user:${janeId}`,
      description: 'My personal feed',
      name: 'jane',
      visibility: 'public',
      filter_tags: ['tech', 'hiking', 'cooking'],
    });
  });

  it('reads a feed', async () => {
    const johnId = newFeedId('john');
    await client.feeds.getOrCreateFeed({
      feed_group_id: 'user',
      feed_id: johnId,
      user_id: userId,
    });
    await client.feeds.addActivity({
      feeds: [`user:${johnId}`],
      type: 'post',
      text: 'hello',
      user_id: userId,
    });

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Reading a Feed" tab="Node.js" index=1
    // COPY: johnId="john", userId="<user id>"
    const feed = client.feeds.feed('user', johnId);
    const response = await feed.getOrCreate({
      user_id: userId,
    });

    const feedData = response.feed;
    const activities = response.activities;
    const members = response.members;
    // #endregion snippet

    expect(response.created).toBe(false);
    expect(feedData.feed).toBe(`user:${johnId}`);
    expect(activities.map((a) => a.text)).toEqual(['hello']);
    expect(members).toEqual([]);
  });

  it('reads a feed with options and a view', async () => {
    const jackId = newFeedId('jack');
    const viewId = uniqueId('myview');
    cleanup.add(() =>
      client.feeds.deleteFeedView({ id: viewId }).catch((error: unknown) => {
        if (!String(error).includes('not found')) throw error;
      }),
    );
    await client.feeds.createFeedView({
      id: viewId,
      activity_selectors: [{ type: 'current_feed' }],
    });
    await retry(() => client.feeds.getFeedView({ id: viewId }), {
      retryIf: isFeedGroupMissing,
    });
    await client.feeds.getOrCreateFeed({
      feed_group_id: 'user',
      feed_id: jackId,
      user_id: userId,
    });
    await client.feeds.upsertActivities({
      activities: [
        { tags: ['green'], text: 'green' },
        { tags: ['red'], text: 'red' },
      ].map(({ tags, text }) => ({
        feeds: [`user:${jackId}`],
        type: 'post',
        text,
        filter_tags: tags,
        user_id: userId,
      })),
    });
    // Other API nodes may not know the view yet.
    retryOnFeedGroupMissing(client, ['getOrCreateFeed']);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Reading a Feed" tab="Node.js" index=2
    // COPY: jackId="jack", viewId="myview", userId="<user id>"
    const feed = client.feeds.feed('user', jackId);
    const response = await feed.getOrCreate({
      limit: 10,
      filter: {
        filter_tags: ['green'], // filter activities with filter tag green
      },
      external_ranking: {
        user_score: 0.8, // additional data used for ranking
      },
      followers_pagination: {
        limit: 10,
      },
      following_pagination: {
        limit: 10,
      },
      member_pagination: {
        limit: 10,
      },
      view: viewId, // overwrite the default ranking or aggregation logic for this feed. good for split testing
      user_id: userId,
    });
    // #endregion snippet

    expect(texts(response)).toEqual(['green']);
    expect(response.followers).toEqual([]);
    expect(response.following).toEqual([]);
  });

  it('reads a feed with enrichment options', async () => {
    const jackId = (await createFeed('jack', userId)).id;

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Example" tab="Node.js" index=1
    // COPY: jackId="jack", userId="<user id>"
    const feed = client.feeds.feed('user', jackId);
    const response = await feed.getOrCreate({
      enrichment_options: {
        // Configure enrichment options here
      },
      user_id: userId,
    });
    // #endregion snippet

    expect(response.created).toBe(false);
    expect(response.feed.feed).toBe(`user:${jackId}`);
  });

  it('paginates a feed', async () => {
    const jackId = (await createFeed('jack', userId)).id;
    // One more activity than the docs page size, so there is a next page.
    await client.feeds.upsertActivities({
      activities: Array.from({ length: 11 }, (_, i) => ({
        feeds: [`user:${jackId}`],
        type: 'post',
        text: `activity ${i}`,
        user_id: userId,
      })),
    });
    const ownerId = userId;

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Feed Pagination" tab="Node.js" index=1
    // COPY: jackId="jack", ownerId="user_id"
    const feed = client.feeds.feed('user', jackId);
    const firstPage = await feed.getOrCreate({
      limit: 10,
      user_id: ownerId,
    });

    const nextPage = await feed.getOrCreate({
      next: firstPage.next,
      limit: 10,
      user_id: ownerId,
    });
    // #endregion snippet

    expect(firstPage.activities).toHaveLength(10);
    expect(typeof firstPage.next).toBe('string');
    expect(nextPage.activities).toHaveLength(1);
    const ids = [...firstPage.activities, ...nextPage.activities].map(
      (a) => a.id,
    );
    expect(new Set(ids).size).toBe(11);
  });

  it('filters activities by filter tag', async () => {
    const feedId = (await createFeed('feed', userId)).id;

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Examples" tab="Node.js" index=1
    // COPY: feedId="123", userId="<user id>"
    const feed = client.feeds.feed('user', feedId);
    // Add a few activities
    await client.feeds.upsertActivities({
      activities: [
        {
          feeds: [feed.feed],
          type: 'post',
          text: 'first',
          filter_tags: ['green', 'blue'],
          user_id: userId,
        },
        {
          feeds: [feed.feed],
          type: 'post',
          text: 'second',
          filter_tags: ['yellow', 'blue'],
          user_id: userId,
        },
        {
          feeds: [feed.feed],
          type: 'post',
          text: 'third',
          filter_tags: ['orange'],
          user_id: userId,
        },
      ],
    });

    const response = await feed.getOrCreate({
      filter: {
        filter_tags: ['blue'],
      },
      user_id: userId,
    });
    // #endregion snippet

    expect(texts(response)).toEqual(['first', 'second']);
  });

  describe('filters with $and', () => {
    let feed: Awaited<ReturnType<typeof createFeed>>;

    beforeAll(async () => {
      feed = await createFeed('feed', userId);
      await client.feeds.upsertActivities({
        activities: [
          { text: 'green', tags: ['green'] },
          { text: 'orange', tags: ['orange'] },
          { text: 'both', tags: ['green', 'orange'] },
        ].map(({ text, tags }) => ({
          feeds: [feed.feed],
          type: 'post',
          text,
          filter_tags: tags,
          user_id: userId,
        })),
      });
    });

    it('reads the activities matching both tags', async () => {
      // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Examples" tab="Node.js" index=2
      // COPY: userId="<user id>"
      // Get all the activities where filter tags contain both "green" and "orange"
      const response = await feed.getOrCreate({
        filter: {
          $and: [{ filter_tags: ['green'] }, { filter_tags: ['orange'] }],
        },
        user_id: userId,
      });
      // #endregion snippet

      expect(texts(response)).toEqual(['both']);
    });

    it('builds the same filter', async () => {
      // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Supported filters" tab="Node.js" index=1
      // Get all the activities where filter tags contain both "green" and "orange"
      const filter = {
        $and: [{ filter_tags: ['green'] }, { filter_tags: ['orange'] }],
      };
      // #endregion snippet

      const response = await feed.getOrCreate({ filter, user_id: userId });
      expect(texts(response)).toEqual(['both']);
    });
  });

  it('updates a feed', async () => {
    const joshId = uniqueId('josh');
    cleanup.users.push(joshId);
    await client.upsertUsers([{ id: joshId }]);
    const feed = await createFeed('feed', userId);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Updating a Feed" tab="Node.js" index=1
    // COPY: joshId="josh"
    const response = await feed.update({
      created_by_id: joshId,
      name: 'Updated feed name',
      filter_tags: ['tech', 'hiking', 'cooking'],
      custom: {
        color: 'blue',
      },
    });
    // #endregion snippet

    expect(response.feed).toMatchObject({
      name: 'Updated feed name',
      filter_tags: ['tech', 'hiking', 'cooking'],
      custom: { color: 'blue' },
    });
    expect(response.feed.created_by.id).toBe(joshId);
  });

  it("clears a feed's location", async () => {
    const feed = await createFeed('feed', userId);
    const located = await feed.update({ location: { lat: 52.37, lng: 4.9 } });
    expect(located.feed.location).toEqual({ lat: 52.37, lng: 4.9 });

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Clearing a feed's location" tab="Node.js" index=1
    const response = await feed.update({
      clear_location: true,
    });
    // #endregion snippet

    expect(response.feed.location).toBeUndefined();
    const read = await feed.getOrCreate({ user_id: userId });
    expect(read.feed.location).toBeUndefined();
  });

  it('deletes a feed', async () => {
    const feed = await createFeed('feed', userId);
    await client.feeds.addActivity({
      feeds: [feed.feed],
      type: 'post',
      text: 'deleted with the feed',
      user_id: userId,
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Deleting a Feed" tab="Node.js" index=1
    // Soft delete a feed
    const softDeleteResponse = await feed.delete({ hard_delete: false });

    // Hard delete a feed
    const response = await feed.delete({ hard_delete: true });

    // Check task progress for server side requests (you need to poll getTask)
    const taskResponse = await client.getTask({ id: response.task_id });
    console.log(taskResponse.status === 'completed');
    // #endregion snippet

    expect(typeof softDeleteResponse.task_id).toBe('string');
    expect(taskResponse.task_id).toBe(response.task_id);
    expect(log.mock.calls[0]).toEqual([taskResponse.status === 'completed']);
    // Once the hard delete task is done, the feed and its activity are gone:
    // the same id creates a new, empty feed.
    await waitForTask(client, response.task_id);
    const recreated = await feed.getOrCreate({ user_id: userId });
    expect(recreated.created).toBe(true);
    expect(recreated.activities).toEqual([]);
  });

  it('creates and deletes feeds in a batch', async () => {
    // The docs' fixed ids (`feed_0` ... `feed_99`) would be shared across the
    // app: the spy prefixes each `feed_id` with a uniqueId, the rest of the
    // request goes through as written.
    const prefix = uniqueId('batch');
    const fids = Array.from(
      { length: 100 },
      (_, i) => `user:${prefix}-feed_${i}`,
    );
    cleanup.add(() =>
      client.feeds
        .deleteFeedsBatch({ feeds: fids, hard_delete: true })
        .catch((error: unknown) => {
          // The region deletes them first.
          if (!String(error).includes("can't be found")) throw error;
        }),
    );
    const createBatch = client.feeds.createFeedsBatch.bind(client.feeds);
    const create = vi
      .spyOn(client.feeds, 'createFeedsBatch')
      .mockImplementation((request: CreateFeedsBatchRequest) =>
        createBatch({
          ...request,
          feeds: request.feeds.map((f) => ({
            ...f,
            feed_id: `${prefix}-${f.feed_id}`,
          })),
        }),
      );
    const deleteBatch = vi.spyOn(client.feeds, 'deleteFeedsBatch');
    const ownerId = userId;

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/01-feeds.md" heading="Batch create and delete" tab="Node.js" index=1
    // COPY: ownerId="<user id>"
    const response = await serverClient.feeds.createFeedsBatch({
      feeds: new Array(100).fill(0).map((_, index) => ({
        feed_id: `feed_${index}`,
        feed_group_id: 'user',
        name: `Feed ${index}`,
        visibility: 'public',
        created_by_id: ownerId,
      })),
    });
    await serverClient.feeds.deleteFeedsBatch({
      feeds: response.feeds.map((feed) => feed.feed),
      hard_delete: true,
    });
    // #endregion snippet

    expect(create).toHaveBeenCalledTimes(1);
    expect(response.feeds.map((f) => f.feed).sort()).toEqual([...fids].sort());
    expect(response.feeds[0]).toMatchObject({
      visibility: 'public',
      created_by: { id: userId },
    });
    expect(response.feeds.find((f) => f.feed === fids[7])?.name).toBe('Feed 7');
    const { task_id } = await (deleteBatch.mock.results[0].value as ReturnType<
      typeof client.feeds.deleteFeedsBatch
    >);
    await waitForTask(client, task_id);
    const { feeds } = await retry(async () => {
      const result = await client.feeds.queryFeeds({
        filter: { id: { $in: fids.map((fid) => fid.slice('user:'.length)) } },
        limit: 100,
      });
      if (result.feeds.length) throw new Error('feeds still listed');
      return result;
    });
    expect(feeds).toEqual([]);
  });
});
