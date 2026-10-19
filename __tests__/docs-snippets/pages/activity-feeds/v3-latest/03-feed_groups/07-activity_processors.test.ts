import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { UpdateFeedGroupResponse } from '../../../../../../index';
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
  'activity-feeds/v3-latest/_default/03-feed_groups/07-activity_processors.md';

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

/** Activity processors run asynchronously: reads the activity until it has topics. */
const waitForInterestTags = (id: string, timeout = 75000) =>
  retry(
    async () => {
      const { activity } = await client.feeds.getActivity({ id });
      if (!activity.interest_tags?.length)
        throw new Error('no interest_tags yet');
      return activity.interest_tags;
    },
    { timeout },
  );

/**
 * A new feed group (and its processors) takes a few seconds to reach every API
 * node: an activity stored by a node that doesn't know the group yet answers
 * "not found" or never gets topics. Waits for several reads in a row.
 */
const waitForFeedGroup = (id: string) =>
  retry(async () => {
    for (let i = 0; i < 5; i++) await client.feeds.getFeedGroup({ id });
  });

/**
 * Setup only: posts an activity and waits for its topics, posting a fresh one
 * if a node with a stale group config stored it without running the processors.
 */
const postAndWaitForTags = (fid: string, userId: string, text: string) =>
  retry(
    async () => {
      const id = await addActivityOnce(client, {
        feeds: [fid],
        type: 'post',
        text,
        user_id: userId,
      });
      return waitForInterestTags(id, 25000);
    },
    { timeout: 80000 },
  );

/**
 * For a region that posts into a new group: `addActivity` gets an explicit id, so
 * a "not found" answer for an activity that was stored anyway isn't retried
 * into a duplicate (see `addActivityOnce`).
 */
const addActivityRetryingOnce = () => {
  const addActivity = client.feeds.addActivity.bind(client.feeds);
  return vi
    .spyOn(client.feeds, 'addActivity')
    .mockImplementation(async (request) => {
      const id = request.id ?? uniqueId('activity');
      return retry(
        async () => {
          try {
            return await addActivity({ ...request, id });
          } catch (error) {
            const stored = await client.feeds
              .getActivity({ id })
              .catch(() => undefined);
            if (!stored) throw error;
            const { duration, activity, metadata } = stored;
            return { duration, activity, metadata };
          }
        },
        { retryIf: isFeedGroupMissing },
      );
    });
};

describe(DOCS, () => {
  beforeEach(() => retryOnFeedGroupMissing(client, ['getOrCreateFeed']));
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('sets up activity processors', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/07-activity_processors.md" heading="Setting up activity processors" tab="Node.js" index=1
    // COPY: myId="myid"
    const response = await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_processors: [
        { type: 'text_interest_tags' },
        { type: 'image_interest_tags' },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.id).toBe(myId);
    expect(response.feed_group.activity_processors?.map((p) => p.type)).toEqual(
      ['text_interest_tags', 'image_interest_tags'],
    );
  });

  it('updates a feed group', async () => {
    // The docs talk about built-in groups, but those are app-wide: the fence
    // runs on a uniqueId group.
    const feedGroupId = newFeedGroupId('to-update');
    await client.feeds.createFeedGroup({
      id: feedGroupId,
      activity_processors: [{ type: 'text_interest_tags' }],
    });
    const updateFeedGroup = client.feeds.updateFeedGroup.bind(client.feeds);
    const update = vi.spyOn(client.feeds, 'updateFeedGroup');
    update.mockImplementation((request) =>
      retry(() => updateFeedGroup(request), { retryIf: isFeedGroupMissing }),
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/07-activity_processors.md" heading="Setting up activity processors" tab="Node.js" index=2
    // COPY: feedGroupId="<id of feed group to update>"
    await client.feeds.updateFeedGroup({
      id: feedGroupId,
      // Fields to update
    });
    // #endregion snippet

    const { feed_group } = await (update.mock.results[0]
      .value as Promise<UpdateFeedGroupResponse>);
    expect(feed_group.id).toBe(feedGroupId);
    // Updates replace every field: the omitted processors are cleared.
    expect(feed_group.activity_processors ?? []).toEqual([]);
  });

  it('sets extraction thresholds', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/07-activity_processors.md" heading="Extraction thresholds" tab="Node.js" index=1
    // COPY: myId="myid"
    const response = await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_processors: [
        { type: 'text_interest_tags', min_text_length: 40, min_word_count: 5 },
      ],
    });
    // #endregion snippet

    expect(response.feed_group.activity_processors).toMatchObject([
      { type: 'text_interest_tags', min_text_length: 40, min_word_count: 5 },
    ]);
  });

  it('restricts topics to an allowed vocabulary', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/07-activity_processors.md" heading="Matching without send_allowed_tags_to_ai" tab="Node.js" index=1
    // COPY: myId="myid"
    const response = await serverClient.feeds.createFeedGroup({
      id: myId,
      activity_processors: [{ type: 'text_interest_tags' }],
      activity_processing: {
        allowed_tags: ['cycling', 'markets', 'cooking'],
        send_allowed_tags_to_ai: true,
      },
    });
    // #endregion snippet

    // Tags are stored sorted.
    expect(response.feed_group.activity_processing).toMatchObject({
      allowed_tags: ['cooking', 'cycling', 'markets'],
      send_allowed_tags_to_ai: true,
    });
    // The processor only writes tags from the list.
    await waitForFeedGroup(myId);
    const userId = await createUser('cyclist');
    cleanup.feeds.push(`${myId}:${userId}`);
    await client.feeds.feed(myId, userId).getOrCreate({ user_id: userId });
    const tags = await postAndWaitForTags(
      `${myId}:${userId}`,
      userId,
      'My new road bike made the 80 km ride over the mountain pass easy',
    );
    expect(tags).toEqual(['cycling']);
  }, 120000);

  it('reads topics', async () => {
    const groupId = newFeedGroupId('topics');
    await client.feeds.createFeedGroup({
      id: groupId,
      activity_processors: [{ type: 'text_interest_tags' }],
    });
    const userId = await createUser('author');
    const fid = `${groupId}:${userId}`;
    cleanup.feeds.push(fid);
    await waitForFeedGroup(groupId);
    await client.feeds.feed(groupId, userId).getOrCreate({ user_id: userId });
    await postAndWaitForTags(
      fid,
      userId,
      'my favourite pasta recipe for busy weeknights',
    );
    addActivityRetryingOnce();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/07-activity_processors.md" heading="Reading topics" tab="Node.js" index=1
    // COPY: fid="user:1", userId="<user id>"
    const response = await client.feeds.addActivity({
      feeds: [fid],
      type: 'post',
      text: 'check out my 10 fitness tips for reducing lower back pain',
      user_id: userId,
    });

    // Wait for feeds.activity.updated event
    console.log(response.activity.interest_tags); // ["fitness", "health", "tips"]
    // #endregion snippet

    const added = response.activity;
    expect(log).toHaveBeenCalledWith(added.interest_tags);
    // The processor runs asynchronously: the topics show up later. Now and
    // then an activity never gets topics (seen 2026-10-16, about 1 run in 4):
    // then the same text posted again must get them.
    const tags = await waitForInterestTags(added.id, 30000).catch(() =>
      postAndWaitForTags(fid, userId, added.text ?? ''),
    );
    expect(tags.length).toBeGreaterThan(0);
  }, 200000);
});
