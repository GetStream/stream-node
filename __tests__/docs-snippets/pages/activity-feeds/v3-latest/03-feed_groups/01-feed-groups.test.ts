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
  CreateFeedGroupResponse,
  ListFeedGroupsResponse,
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
  'activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md';

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

describe(DOCS, () => {
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a feed group', async () => {
    const myFeedGroupId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Create feed groups" tab="Node.js" index=1
    // COPY: myFeedGroupId="myid"
    const myFeedGroup = await serverClient.feeds.createFeedGroup({
      id: myFeedGroupId,
      activity_selectors: [
        {
          type: 'following',
        },
      ],
      activity_processors: [
        {
          type: 'text_interest_tags',
        },
      ],
      activity_filter: {
        exclude_owner_activities: true,
      },
      custom: {
        description: 'My custom feed group',
      },
    });
    // #endregion snippet

    const group = myFeedGroup.feed_group;
    expect(group.id).toBe(myFeedGroupId);
    expect(group.activity_selectors?.map((s) => s.type)).toEqual(['following']);
    // Without `ranking` the group ranks by recency (the API rejects
    // `type: "recency"`).
    expect(group.ranking).toBeUndefined();
    expect(group.activity_processors?.map((p) => p.type)).toEqual([
      'text_interest_tags',
    ]);
    expect(group.activity_filter?.exclude_owner_activities).toBe(true);
    expect(group.custom).toEqual({ description: 'My custom feed group' });
  });

  describe('activity marks on content feeds', () => {
    const rankedTimelineId = newFeedGroupId('ranked-timeline');
    let userId: string;

    beforeAll(async () => {
      userId = await createUser('reader');
    });

    it('creates a feed group with activity marks', async () => {
      const create = vi.spyOn(client.feeds, 'createFeedGroup');

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Activity marks on content feeds" tab="Node.js" index=1
      // COPY: rankedTimelineId="ranked_timeline"
      await serverClient.feeds.createFeedGroup({
        id: rankedTimelineId,
        activity_marks: {
          track_seen: true,
          track_read: true,
        },
        activity_selectors: [{ type: 'following' }],
      });
      // #endregion snippet

      const { feed_group } = await (create.mock.results[0]
        .value as Promise<CreateFeedGroupResponse>);
      expect(feed_group.id).toBe(rankedTimelineId);
      expect(feed_group.activity_marks).toMatchObject({
        track_seen: true,
        track_read: true,
      });
    });

    it('marks an activity as seen', async () => {
      retryOnFeedGroupMissing(client, ['getOrCreateFeed', 'markActivity']);
      // The docs' `timeline` (a feed of the group above) and `activity` in it:
      // the timeline follows an author's user feed, the author posts.
      const authorId = await createUser('author');
      cleanup.feeds.push(`user:${authorId}`, `${rankedTimelineId}:${userId}`);
      const timeline = client.feeds.feed(rankedTimelineId, userId);
      await timeline.getOrCreate({ user_id: userId });
      await client.feeds
        .feed('user', authorId)
        .getOrCreate({ user_id: authorId });
      await retry(
        () =>
          client.feeds.follow({
            source: timeline.feed,
            target: `user:${authorId}`,
          }),
        { retryIf: isFeedGroupMissing },
      );
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${authorId}`],
        text: 'Seen me?',
        user_id: authorId,
      });
      const before = await retry(async () => {
        const response = await timeline.getOrCreate({ user_id: userId });
        const found = response.activities.find((a) => a.id === activity.id);
        if (!found) throw new Error('activity not in the timeline yet');
        return found;
      });
      expect(before.is_seen).toBe(false);

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Activity marks on content feeds" tab="Node.js" index=2
      await timeline.markActivity({
        mark_seen: [activity.id],
        user_id: userId,
      });
      // #endregion snippet

      const after = await retry(async () => {
        const response = await timeline.getOrCreate({ user_id: userId });
        const found = response.activities.find((a) => a.id === activity.id);
        if (!found?.is_seen) throw new Error('activity not seen yet');
        return found;
      });
      expect(after.is_seen).toBe(true);
      expect(after.is_read).toBe(false);
    });
  });

  it('creates a feed group with a default follower role', async () => {
    const premiumId = newFeedGroupId('premium');
    const create = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Default follower role" tab="Node.js" index=1
    // COPY: premiumId="premium"
    await client.feeds.createFeedGroup({
      id: premiumId,
      default_follower_role: 'feed_member_viewer',
    });
    // #endregion snippet

    const { feed_group } = await (create.mock.results[0]
      .value as Promise<CreateFeedGroupResponse>);
    expect(feed_group.id).toBe(premiumId);
    expect(feed_group.default_follower_role).toBe('feed_member_viewer');
  });

  it('lists feed groups', async () => {
    const list = vi.spyOn(client.feeds, 'listFeedGroups');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="List feed groups" tab="Node.js" index=1
    await client.feeds.listFeedGroups();
    // #endregion snippet

    const { groups } = await (list.mock.results[0]
      .value as Promise<ListFeedGroupsResponse>);
    expect(Object.keys(groups)).toEqual(
      expect.arrayContaining(['user', 'timeline', 'notification']),
    );
    expect(groups.user.id).toBe('user');
  });

  it('creates a feed group with expression ranking', async () => {
    const myTimelineId = newFeedGroupId('mytimeline');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Activity Ranking" tab="Node.js" index=1
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

    expect(response.feed_group.id).toBe(myTimelineId);
    expect(response.feed_group.ranking).toMatchObject({
      type: 'expression',
      score: 'decay_linear(time) * popularity',
    });
  });

  it('creates a for you feed group and a feed in it', async () => {
    const myTimelineId = newFeedGroupId('foryou');
    const thierryId = await createUser('thierry');
    cleanup.feeds.push(`${myTimelineId}:${thierryId}`);
    retryOnFeedGroupMissing(client, ['getOrCreateFeed', 'markActivity']);

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="For you Feeds" tab="Node.js" index=1
    // COPY: myTimelineId="mytimeline", thierryId="thierry"
    const response = await serverClient.feeds.createFeedGroup({
      id: myTimelineId,
      // Run the activity processors to analyse topics for text & images
      activity_processors: [
        { type: 'text_interest_tags' },
        { type: 'image_interest_tags' },
      ],
      // Activity selectors change which activities are included in the feed
      // The default "following" selectors gets activities from the feeds you follow
      // The "popular" activity selectors includes the popular activities
      // And "interest" activities similar to activities you've engaged with in the past
      // You can use multiple selectors in 1 feed
      activity_selectors: [
        {
          type: 'popular',
        },
        {
          type: 'following',
        },
        {
          type: 'interest',
        },
      ],
      // Rank for a user based on interest score
      // This calculates a score 0-1.0 of how well the activity matches the user's prior interest
      ranking: {
        type: 'interest',
        score: 'decay_linear(time) * interest_score * decay_linear(popularity)',
      },
    });

    const forYouFeed = client.feeds.feed(myTimelineId, thierryId);
    const feedResponse = await forYouFeed.getOrCreate({ user_id: thierryId });
    // #endregion snippet

    expect(response.feed_group.activity_selectors?.map((s) => s.type)).toEqual([
      'popular',
      'following',
      'interest',
    ]);
    expect(response.feed_group.activity_processors?.map((p) => p.type)).toEqual(
      ['text_interest_tags', 'image_interest_tags'],
    );
    expect(response.feed_group.ranking?.type).toBe('interest');
    expect(feedResponse.feed.feed).toBe(`${myTimelineId}:${thierryId}`);
  });

  it('creates an aggregated notification feed group', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Aggregation Format" tab="Node.js" index=1
    // COPY: myId="myid"
    const myNotificationGrpup = await serverClient.feeds.createFeedGroup({
      id: myId,
      // Group by activity type and day
      aggregation: { format: '{{ type }}-{{ time.strftime("%Y-%m-%d") }}' },
      // Enable notification tracking
      notification: {
        track_read: true,
        track_seen: true,
      },
    });
    // #endregion snippet

    const group = myNotificationGrpup.feed_group;
    expect(group.id).toBe(myId);
    expect(group.aggregation?.format).toBe(
      '{{ type }}-{{ time.strftime("%Y-%m-%d") }}',
    );
    expect(group.notification).toMatchObject({
      track_read: true,
      track_seen: true,
    });
  });

  describe('notification feeds', () => {
    let janeId: string;

    beforeAll(async () => {
      // The docs' "jane": a notification feed with an unread notification
      // from another user.
      janeId = await createUser('jane');
      const otherId = await createUser('notifier');
      cleanup.feeds.push(`notification:${janeId}`);
      await client.feeds
        .feed('notification', janeId)
        .getOrCreate({ user_id: janeId });
      await client.feeds.addActivity({
        type: 'like',
        feeds: [`notification:${janeId}`],
        text: 'liked your post',
        user_id: otherId,
      });
      await retry(async () => {
        const response = await client.feeds
          .feed('notification', janeId)
          .getOrCreate({ user_id: janeId });
        if (!response.notification_status?.unread) {
          throw new Error('no unread notification yet');
        }
      });
    });

    it('reads a notification feed', async () => {
      const userId = janeId;

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Notification Feed Example" tab="Node.js" index=1
      // COPY: janeId="jane", userId="<user_id>"
      const notificationFeed = client.feeds.feed('notification', janeId);

      // Read notifications
      const notifications = (
        await notificationFeed.getOrCreate({
          limit: 20,
          user_id: userId,
        })
      ).aggregated_activities;
      // #endregion snippet

      expect(notifications).toHaveLength(1);
      expect(notifications[0].activities.map((a) => a.text)).toEqual([
        'liked your post',
      ]);
    });

    it('marks notifications as read', async () => {
      const userId = janeId;
      const notificationFeed = client.feeds.feed('notification', janeId);

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Marking Notifications as Read" tab="Node.js" index=1
      // COPY: userId="<user id>"
      await notificationFeed.markActivity({
        // Mark all notifications as read...
        mark_all_read: true,
        // ...or only selected ones
        mark_read: [/* group names to mark as read */],
        user_id: userId,
      });
      // #endregion snippet

      const after = await retry(async () => {
        const response = await notificationFeed.getOrCreate({
          user_id: janeId,
        });
        if (response.notification_status?.unread !== 0) {
          throw new Error('notifications still unread');
        }
        return response;
      });
      expect(after.notification_status?.unread).toBe(0);
    });
  });

  it('updates a feed group', async () => {
    const feedGroupId = newFeedGroupId('to-update');
    await client.feeds.createFeedGroup({
      id: feedGroupId,
      custom: { description: 'Before the update' },
    });
    const updateFeedGroup = client.feeds.updateFeedGroup.bind(client.feeds);
    const update = vi.spyOn(client.feeds, 'updateFeedGroup');
    update.mockImplementation((request) =>
      retry(() => updateFeedGroup(request), { retryIf: isFeedGroupMissing }),
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Updating feed groups" tab="Node.js" index=1
    // COPY: feedGroupId="<id of feed group to update>"
    await client.feeds.updateFeedGroup({
      id: feedGroupId,
      // Fields to update
    });
    // #endregion snippet

    const { feed_group } = await (update.mock.results[0]
      .value as Promise<UpdateFeedGroupResponse>);
    expect(feed_group.id).toBe(feedGroupId);
    // "Updates replace every field": the omitted custom data is cleared.
    expect(feed_group.custom ?? {}).toEqual({});
  });

  it('deletes a feed group', async () => {
    const feedGroupId = newFeedGroupId('to-delete');
    await client.feeds.createFeedGroup({ id: feedGroupId });
    const deleteFeedGroup = client.feeds.deleteFeedGroup.bind(client.feeds);
    const del = vi.spyOn(client.feeds, 'deleteFeedGroup');
    del.mockImplementation((request) =>
      retry(() => deleteFeedGroup(request), { retryIf: isFeedGroupMissing }),
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/01-feed-groups.md" heading="Deleting feed groups" tab="Node.js" index=1
    // COPY: feedGroupId="<feed group id to delete>"
    await serverClient.feeds.deleteFeedGroup({
      id: feedGroupId,
    });
    // #endregion snippet

    vi.restoreAllMocks();
    // A soft delete: the group is gone from the list, but still there with
    // include_soft_deleted.
    const deleted = await retry(async () => {
      const { groups } = await client.feeds.listFeedGroups();
      if (groups[feedGroupId]) throw new Error('group still listed');
      const all = await client.feeds.listFeedGroups({
        include_soft_deleted: true,
      });
      return all.groups[feedGroupId];
    });
    expect(deleted?.deleted_at).toEqual(expect.any(Number));
  });
});
