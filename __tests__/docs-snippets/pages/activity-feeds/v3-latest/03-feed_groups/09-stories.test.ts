import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { nsToMs } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS = 'activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md';

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

/** Creates (and registers) a feed of a built-in group, owned by `userId`. */
const createFeed = async (group: string, userId: string) => {
  cleanup.feeds.push(`${group}:${userId}`);
  await client.feeds.feed(group, userId).getOrCreate({ user_id: userId });
  return `${group}:${userId}`;
};

const inOneHour = () => new Date(Date.now() + 60 * 60 * 1000).toISOString();

/** Posts a story (expiring in an hour) to the user's built-in `story` feed. */
const postStory = async (userId: string, text: string) => {
  const response = await client.feeds.addActivity({
    type: 'post',
    feeds: [`story:${userId}`],
    text,
    expires_at: inOneHour(),
    user_id: userId,
  });
  return response.activity.id;
};

describe(DOCS, () => {
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates story feed groups', async () => {
    const myStory = newFeedGroupId('my-story');
    const myStories = newFeedGroupId('my-stories');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md" heading="Creating story groups" tab="Node.js" index=1
    // COPY: myStory=`my-story`, myStories=`my-stories`
    await serverClient.feeds.createFeedGroup({
      id: myStory,
      stories: {
        skip_watched: false,
        track_watched: true,
      },
    });

    await serverClient.feeds.createFeedGroup({
      id: myStories,
      stories: {
        skip_watched: false,
        track_watched: true,
      },
      aggregation: {
        // Typically stories are aggregated by user id
        format: '{{ user_id }}',
      },
      activity_selectors: [{ type: 'following' }],
    });
    // #endregion snippet

    const story = await retry(() => client.feeds.getFeedGroup({ id: myStory }));
    expect(story.feed_group.stories).toMatchObject({ track_watched: true });
    const stories = await retry(() =>
      client.feeds.getFeedGroup({ id: myStories }),
    );
    expect(stories.feed_group.stories).toMatchObject({ track_watched: true });
    expect(stories.feed_group.aggregation?.format).toBe('{{ user_id }}');
    expect(stories.feed_group.activity_selectors?.[0].type).toBe('following');
  });

  it('posts a story', async () => {
    const johnId = await createUser('john');
    cleanup.feeds.push(`story:${johnId}`);
    const johnStoryFid = `story:${johnId}`;

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md" heading="Posting stories" tab="Node.js" index=1
    // COPY: johnId="john", johnStoryFid="story:john"
    const johnStoryFeed = client.feeds.feed('story', johnId);
    await johnStoryFeed.getOrCreate({
      user_id: johnId,
    });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await client.feeds.addActivity({
      type: 'post',
      feeds: [johnStoryFid],
      attachments: [
        {
          image_url: 'https://example.com/image.jpg',
          custom: {},
        },
      ],
      expires_at: tomorrow.toISOString(),
      user_id: johnId,
    });
    // #endregion snippet

    const feed = await johnStoryFeed.getOrCreate({ user_id: johnId });
    expect(feed.activities).toHaveLength(1);
    const [story] = feed.activities;
    expect(story.attachments[0].image_url).toBe(
      'https://example.com/image.jpg',
    );
    // The stored time can be 1 ms off the ISO string that was sent.
    expect(
      Math.abs(nsToMs(story.expires_at ?? 0) - tomorrow.getTime()),
    ).toBeLessThanOrEqual(1);
  });

  it('follows a story feed', async () => {
    const johnId = await createUser('john');
    const saraId = await createUser('sara');
    const johnStoryFid = await createFeed('story', johnId);
    const saraStoriesFid = await createFeed('stories', saraId);

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md" heading="Following story feeds" tab="Node.js" index=1
    // COPY: saraStoriesFid="stories:sara", johnStoryFid="story:john"
    await client.feeds.follow({ source: saraStoriesFid, target: johnStoryFid });
    // #endregion snippet

    const follows = await client.feeds.queryFollows({
      filter: { source_feed: saraStoriesFid },
    });
    expect(follows.follows.map((f) => f.target_feed.feed)).toEqual([
      johnStoryFid,
    ]);
  });

  it('reads the story timeline and marks a story as watched', async () => {
    const johnId = await createUser('john');
    const saraId = await createUser('sara');
    const johnStoryFid = await createFeed('story', johnId);
    const saraStoriesFid = await createFeed('stories', saraId);
    await client.feeds.follow({ source: saraStoriesFid, target: johnStoryFid });
    const first = await postStory(johnId, 'first story');
    const second = await postStory(johnId, 'second story');
    // The timeline fills in the background after the posts.
    await retry(async () => {
      const timeline = await client.feeds
        .feed('stories', saraId)
        .getOrCreate({ user_id: saraId });
      expect(
        timeline.aggregated_activities[0]?.activities.map((a) => a.id).sort(),
      ).toEqual([first, second].sort());
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md" heading="Reading story timeline and marking activities as watched" tab="Node.js" index=1
    // COPY: saraId="sara"
    const saraStoryTimeline = client.feeds.feed('stories', saraId);
    const response = await saraStoryTimeline.getOrCreate({ user_id: saraId });

    // Since story timeline is aggregated by user id, we read aggregated activities
    const johnStories = response.aggregated_activities[0];
    // True if we watched all active stories of a user
    console.log(johnStories.is_watched);

    // Display all of John's active stories
    johnStories.activities.forEach((activity) => {
      // True if we watched a given story
      console.log(activity.is_watched);
    });

    // Mark a story as read
    await saraStoryTimeline.markActivity({
      mark_watched: [johnStories.activities[0].id],
      user_id: saraId,
    });
    // #endregion snippet

    log.mockRestore();
    expect(johnStories.is_watched).toBe(false);
    expect(johnStories.activities.map((a) => a.is_watched)).toEqual([
      false,
      false,
    ]);
    const watchedId = johnStories.activities[0].id;
    await retry(async () => {
      const after = await saraStoryTimeline.getOrCreate({ user_id: saraId });
      const [group] = after.aggregated_activities;
      const watched = Object.fromEntries(
        group.activities.map((a) => [a.id, a.is_watched]),
      );
      expect(watched).toEqual({
        [watchedId]: true,
        [watchedId === first ? second : first]: false,
      });
      expect(group.is_watched).toBe(false);
    });
  });

  it('paginates a feed', async () => {
    const jackId = await createUser('jack');
    const viewerId = await createUser('user_id');
    await createFeed('user', jackId);
    await client.feeds.upsertActivities({
      activities: Array.from({ length: 12 }, (_, i) => ({
        type: 'post',
        feeds: [`user:${jackId}`],
        text: `post ${i}`,
        user_id: jackId,
      })),
    });

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md" heading="Reading story timeline and marking activities as watched" tab="Node.js" index=2
    // COPY: jackId="jack", viewerId="user_id"
    const feed = client.feeds.feed('user', jackId);
    const firstPage = await feed.getOrCreate({
      limit: 10,
      user_id: viewerId,
    });

    const nextPage = await feed.getOrCreate({
      next: firstPage.next,
      limit: 10,
      user_id: viewerId,
    });
    // #endregion snippet

    expect(firstPage.activities).toHaveLength(10);
    expect(firstPage.next).toBeTruthy();
    expect(nextPage.activities).toHaveLength(2);
    const ids = [...firstPage.activities, ...nextPage.activities].map(
      (a) => a.id,
    );
    expect(new Set(ids).size).toBe(12);
  });

  it('reads a story feed and marks a story as watched', async () => {
    const johnId = await createUser('john');
    const saraId = await createUser('sara');
    await createFeed('story', johnId);
    const storyId = await postStory(johnId, 'a story');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md" heading="Reading story feed" tab="Node.js" index=1
    // COPY: johnId="john", saraId="sara"
    const johnStoryFeed = client.feeds.feed('story', johnId);

    const response = await johnStoryFeed.getOrCreate({
      limit: 100,
      user_id: johnId,
    });

    const johnStories = response.activities;

    johnStories.forEach((activity) => {
      // True if we watched a given story
      console.log(activity.is_watched);
    });

    // Mark a story as watched
    await johnStoryFeed.markActivity({
      mark_watched: [johnStories[0].id],
      user_id: saraId,
    });
    // #endregion snippet

    log.mockRestore();
    expect(johnStories.map((a) => a.id)).toEqual([storyId]);
    expect(johnStories[0].is_watched).toBe(false);
    await retry(async () => {
      const asSara = await johnStoryFeed.getOrCreate({ user_id: saraId });
      expect(asSara.activities[0].is_watched).toBe(true);
    });
  });

  it('queries expired stories', async () => {
    const johnId = await createUser('john');
    const john = { id: johnId };
    await createFeed('story', johnId);
    // The API accepts an `expires_at` in the past: that story is expired at once.
    const expired = await client.feeds.addActivity({
      type: 'post',
      feeds: [`story:${johnId}`],
      text: 'expired story',
      expires_at: new Date(Date.now() - 60 * 1000).toISOString(),
      user_id: johnId,
    });
    await postStory(johnId, 'active story');

    const result = await retry(async () => {
      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/09-stories.md" heading="Reading expired stories" tab="Node.js" index=1
      const now = new Date();
      const result = await client.feeds.queryActivities({
        filter: {
          expires_at: { $lte: now.toISOString() },
          user_id: john.id,
        },
        sort: [{ field: 'created_at', direction: -1 }],
      });
      // #endregion snippet

      expect(result.activities.map((a) => a.id)).toEqual([expired.activity.id]);
      return result;
    });
    expect(result.activities[0].text).toBe('expired story');
  });
});
