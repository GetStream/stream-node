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
import type { UpdateFeedGroupResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  addActivityOnce,
  copyFeedGroup,
  isFeedGroupMissing,
  retryOnFeedGroupMissing,
  waitForNotificationTypes,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md';

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

/** Creates (and registers) a feed. `notification` feeds aren't created automatically. */
const createFeed = async (group: string, id: string) => {
  cleanup.feeds.push(`${group}:${id}`);
  const feed = client.feeds.feed(group, id);
  await retry(() => feed.getOrCreate({ user_id: id }), {
    retryIf: isFeedGroupMissing,
  });
  return feed;
};

/**
 * A new group isn't known to every API node at once, and an `addActivity`
 * retried on "not found" can add the activity twice (2026-10-16): wait until
 * several reads in a row find the group before adding activities to it.
 */
const waitForFeedGroup = (group: string, id: string) =>
  retry(
    async () => {
      for (let i = 0; i < 5; i++) {
        await client.feeds.feed(group, id).getOrCreate({ user_id: id });
      }
    },
    { retryIf: isFeedGroupMissing },
  );

describe(DOCS, () => {
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  describe('notification feed groups', () => {
    it('creates a notification feed group', async () => {
      const myId = newFeedGroupId('myid');

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Creating notification feeds" tab="Node.js" index=1
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

    it('adds notification activities manually', async () => {
      const user123 = await createUser('user-123');
      const actorId = await createUser('actor');
      // The docs' custom "alerts" notification feed group.
      const alertsGroup = newFeedGroupId('alerts');
      await client.feeds.createFeedGroup({
        id: alertsGroup,
        notification: { track_read: true, track_seen: true },
      });
      await createFeed('notification', user123);
      await createFeed(alertsGroup, user123);
      const userNotificationFid = `notification:${user123}`;
      const alertsFid = `${alertsGroup}:${user123}`;
      await waitForFeedGroup(alertsGroup, user123);
      const addActivity = vi.spyOn(client.feeds, 'addActivity');

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Manual Activity Addition to Notification Feeds" tab="Node.js" index=1
      // COPY: userNotificationFid="notification:user-123", alertsFid="alerts:user-123", actorId="user_id"
      // Add a custom notification directly to a user's notification feed
      await serverClient.feeds.addActivity({
        feeds: [userNotificationFid], // Target user's notification feed
        type: 'milestone', // Custom activity type
        text: "You've reached 1000 followers!",
        user_id: actorId,
        custom: {
          milestone_type: 'followers',
          count: 1000,
        },
      });

      // Add activity to custom notification feed group
      await serverClient.feeds.addActivity({
        feeds: [alertsFid], // Custom notification feed group
        type: 'system_alert',
        text: 'Your subscription expires in 3 days',
        user_id: actorId,
      });
      // #endregion snippet

      const notification = await retry(async () => {
        const response = await client.feeds
          .feed('notification', user123)
          .getOrCreate({ user_id: user123 });
        expect(response.notification_status?.unread).toBe(1);
        return response;
      });
      const [milestone] = notification.aggregated_activities[0].activities;
      expect(milestone).toMatchObject({
        type: 'milestone',
        text: "You've reached 1000 followers!",
        custom: { milestone_type: 'followers', count: 1000 },
      });
      expect(milestone.user.id).toBe(actorId);

      const alerts = await retry(
        () =>
          client.feeds
            .feed(alertsGroup, user123)
            .getOrCreate({ user_id: user123 }),
        { retryIf: isFeedGroupMissing },
      );
      expect(alerts.activities.map((a) => [a.type, a.text])).toEqual([
        ['system_alert', 'Your subscription expires in 3 days'],
      ]);
      expect(alerts.notification_status?.unread).toBe(1);
      expect(addActivity).toHaveBeenCalledTimes(2);
    });
  });

  describe('built-in notification feed', () => {
    /**
     * The docs' scene: Eric's timeline, Jane's user feed with an activity, and
     * Sara's comment on it. Jane and Sara have notification feeds.
     */
    const createScene = async () => {
      const ericId = await createUser('eric');
      const janeId = await createUser('jane');
      const saraId = await createUser('sara');
      await createFeed('notification', janeId);
      await createFeed('notification', saraId);
      await createFeed('user', ericId);
      const ericTimeline = await createFeed('timeline', ericId);
      const janeFeed = await createFeed('user', janeId);
      const { activity: janeActivity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [janeFeed.feed],
        text: "Jane's post",
        user_id: janeId,
      });
      const { comment: saraComment } = await client.feeds.addComment({
        object_id: janeActivity.id,
        object_type: 'activity',
        comment: "Sara's comment",
        user_id: saraId,
      });
      return {
        ericId,
        janeId,
        saraId,
        ericTimeline,
        janeFeed,
        janeActivity,
        saraComment,
      };
    };

    it('creates notification activities', async () => {
      const {
        ericId,
        janeId,
        saraId,
        ericTimeline,
        janeFeed,
        janeActivity,
        saraComment,
      } = await createScene();

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Creating notification activities" tab="Node.js" index=1
      // COPY: ericId="eric"
      // Eric follows Jane
      await serverClient.feeds.follow({
        source: ericTimeline.feed,
        target: janeFeed.feed,
        // When true Jane's notification feed will be updated with follow activity
        create_notification_activity: true,
        copy_custom_to_notification: true, // Copy follow custom data to the notification activity
      });

      // Eric comments on Jane's activity
      await serverClient.feeds.addComment({
        comment: 'Agree!',
        object_id: janeActivity.id,
        object_type: 'activity',
        // When true Jane's notification feed will be updated with comment activity
        create_notification_activity: true,
        copy_custom_to_notification: true, // Copy comment custom data to the notification activity
        user_id: ericId,
      });

      // Eric reacts to Jane's activity
      await serverClient.feeds.addReaction({
        activity_id: janeActivity.id,
        // When true Jane's notification feed will be updated with reaction activity
        type: 'like',
        create_notification_activity: true,
        copy_custom_to_notification: true, // Copy reaction custom data to the notification activity
        user_id: ericId,
      });

      // Eric reacts to a comment posted to Jane's activity by Sara
      await serverClient.feeds.addCommentReaction({
        id: saraComment.id,
        type: 'like',
        // When true Sara's notification feed will be updated with comment reaction activity
        create_notification_activity: true,
        copy_custom_to_notification: true, // Copy comment reaction custom data to the notification activity
        user_id: ericId,
      });
      // #endregion snippet

      // Reaction notifications are created in the background: retry.
      await waitForNotificationTypes(client, janeId, [
        'follow',
        'comment',
        'reaction',
      ]);
      await waitForNotificationTypes(client, saraId, ['comment_reaction']);
      const { aggregated_activities } = await client.feeds
        .feed('notification', janeId)
        .getOrCreate({ user_id: janeId });
      for (const group of aggregated_activities) {
        expect(group.activities[0].user.id).toBe(ericId);
      }
    });

    it('updates mentions in activities and comments', async () => {
      const aliceId = await createUser('alice');
      const bobId = await createUser('bob');
      const charlieId = await createUser('charlie');
      await createFeed('notification', bobId);
      await createFeed('notification', charlieId);
      const aliceFeed = await createFeed('user', aliceId);
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [aliceFeed.feed],
        text: 'Check this out',
        user_id: aliceId,
      });
      const activityId = activity.id;
      const { comment } = await client.feeds.addComment({
        object_id: activityId,
        object_type: 'activity',
        comment: 'A comment',
        user_id: aliceId,
      });
      const commentId = comment.id;
      // Bob's notifications after the first update (before the mention is removed).
      let bobAfterMention: string[] = [];
      const updateComment = client.feeds.updateComment.bind(client.feeds);
      vi.spyOn(client.feeds, 'updateComment').mockImplementation(
        async (request) => {
          bobAfterMention = await waitForNotificationTypes(client, bobId, [
            'mention',
          ]);
          return updateComment(request);
        },
      );

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Updating mentions in activities and comments" tab="Node.js" index=1
      // COPY: bobId="bob", charlieId="charlie", aliceId="alice"
      // Alice updates her activity to mention Bob
      await serverClient.feeds.updateActivity({
        id: activityId,
        text: 'Hey @Bob check this out!',
        mentioned_user_ids: [bobId],
        handle_mention_notifications: true, // When true, Bob will receive a mention notification
        user_id: aliceId,
      });

      // Alice updates her comment to mention Charlie
      await serverClient.feeds.updateComment({
        id: commentId,
        comment: 'Hey @Charlie!',
        mentioned_user_ids: [charlieId],
        handle_mention_notifications: true, // When true, Charlie will receive a comment_mention notification
        user_id: aliceId,
      });

      // Alice removes mentions from her activity
      await serverClient.feeds.updateActivity({
        id: activityId,
        text: 'Updated text without mentions',
        mentioned_user_ids: [],
        handle_mention_notifications: true, // When true, mention notifications for removed users are deleted
        user_id: aliceId,
      });
      // #endregion snippet

      expect(bobAfterMention).toEqual(['mention']);
      await waitForNotificationTypes(client, charlieId, ['comment_mention']);
      await waitForNotificationTypes(client, bobId, []);
    });

    it('polls the reaction notification task', async () => {
      const { ericId, janeId, janeActivity } = await createScene();
      const reaction = await client.feeds.addActivityReaction({
        activity_id: janeActivity.id,
        type: 'like',
        create_notification_activity: true,
        user_id: ericId,
      });
      expect(reaction.notification_accepted).toBe(true);
      expect(reaction.notification_created).toBe(true);
      expect(typeof reaction.notification_task_id).toBe('string');
      // The docs' placeholder for an async API response, with the reaction's
      // notification_task_id as task_id (as the text above the fence says).
      const _ = { task_id: reaction.notification_task_id ?? '' };
      const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Deprecated: `notification_created`" tab="Node.js" index=1
      // Example of monitoring the status of an async task
      // The logic is same for all async tasks
      const response = _; // Result of a Stream async API request

      // You need to poll this endpoint
      const taskResponse = await client.getTask({ id: response.task_id });
      console.log(taskResponse.status === 'completed');
      // #endregion snippet

      expect(taskResponse.task_id).toBe(response.task_id);
      expect(log.mock.calls[0]).toEqual([taskResponse.status === 'completed']);
      await waitForNotificationTypes(client, janeId, ['reaction']);
    });

    it('deletes notification activities', async () => {
      const {
        ericId,
        janeId,
        saraId,
        ericTimeline,
        janeFeed,
        janeActivity,
        saraComment,
      } = await createScene();
      // Everything the fence deletes, created with notifications.
      await client.feeds.follow({
        source: ericTimeline.feed,
        target: janeFeed.feed,
        create_notification_activity: true,
      });
      const { comment } = await client.feeds.addComment({
        comment: 'Agree!',
        object_id: janeActivity.id,
        object_type: 'activity',
        create_notification_activity: true,
        user_id: ericId,
      });
      const commentId = comment.id;
      await client.feeds.addActivityReaction({
        activity_id: janeActivity.id,
        type: 'like',
        create_notification_activity: true,
        user_id: ericId,
      });
      await client.feeds.addCommentReaction({
        id: saraComment.id,
        type: 'like',
        create_notification_activity: true,
        user_id: ericId,
      });
      // Eric's activities mentioning Jane.
      const [activityId, activityId1, activityId2] = await Promise.all(
        ['one', 'two', 'three'].map(async (text) => {
          const { activity } = await client.feeds.addActivity({
            type: 'post',
            feeds: [`user:${ericId}`],
            text: `@Jane ${text}`,
            mentioned_user_ids: [janeId],
            create_notification_activity: true,
            user_id: ericId,
          });
          return activity.id;
        }),
      );
      await waitForNotificationTypes(client, janeId, [
        'follow',
        'comment',
        'reaction',
        'mention',
        'mention',
        'mention',
      ]);
      await waitForNotificationTypes(client, saraId, ['comment_reaction']);

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Deleting notification activities" tab="Node.js" index=1
      // COPY: ericId="eric"
      // Eric unfollows Jane
      await serverClient.feeds.unfollow({
        source: ericTimeline.feed,
        target: janeFeed.feed,
        // When true the corresponding notification activity will be removed from Jane's notification feed
        delete_notification_activity: true,
      });

      // Eric removes his comment
      await serverClient.feeds.deleteComment({
        id: commentId,
        // When true the corresponding notification activity will be removed from Jane's notification feed
        delete_notification_activity: true,
      });

      // Eric removes his activity reaction
      await serverClient.feeds.deleteActivityReaction({
        activity_id: janeActivity.id,
        type: 'like',
        // When true the corresponding notification activity will be removed from Jane's notification feed
        delete_notification_activity: true,
        user_id: ericId,
      });

      // Eric removes his comment reaction
      await serverClient.feeds.deleteCommentReaction({
        id: saraComment.id,
        type: 'like',
        // When true the corresponding notification activity will be removed from Jane's notification feed
        delete_notification_activity: true,
        user_id: ericId,
      });

      // Eric deletes his activity with mentions
      await serverClient.feeds.deleteActivity({
        id: activityId,
        // When true, mention notifications for all mentioned users will be removed
        delete_notification_activity: true,
      });

      // Eric deletes multiple activities with mentions (batch operation)
      await serverClient.feeds.deleteActivities({
        ids: [activityId1, activityId2],
        // When true, mention notifications for all mentioned users will be removed
        delete_notification_activity: true,
        user_id: ericId,
      });
      // #endregion snippet

      await waitForNotificationTypes(client, janeId, []);
      await waitForNotificationTypes(client, saraId, []);
    });
  });

  describe('reading and marking notifications', () => {
    let readerId: string;
    let notificationFeed: ReturnType<typeof client.feeds.feed>;

    beforeAll(async () => {
      readerId = await createUser('reader');
      const notifierId = await createUser('notifier');
      notificationFeed = await createFeed('notification', readerId);
      // Two notifications of different types: two aggregated groups.
      for (const type of ['like', 'comment']) {
        await client.feeds.addActivity({
          type,
          feeds: [notificationFeed.feed],
          text: `A ${type}`,
          user_id: notifierId,
        });
      }
      await retry(async () => {
        const response = await notificationFeed.getOrCreate({
          user_id: readerId,
        });
        expect(response.aggregated_activities).toHaveLength(2);
        expect(response.notification_status?.unread).toBe(2);
      });
    });

    const readGroups = async () =>
      (await notificationFeed.getOrCreate({ user_id: readerId }))
        .aggregated_activities;

    it('reads notification activities', async () => {
      const viewerId = readerId;
      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Reading notification activities" tab="Node.js" index=1
      // COPY: readerId="jane", viewerId="<user_id>"
      const notificationFeed = client.feeds.feed('notification', readerId);

      // Read notifications
      const notifications = (
        await notificationFeed.getOrCreate({
          limit: 20,
          user_id: viewerId,
        })
      ).aggregated_activities;
      // #endregion snippet

      expect(notifications.map((g) => g.activities[0].type).sort()).toEqual([
        'comment',
        'like',
      ]);
      for (const group of notifications) {
        expect(group.activity_count).toBe(1);
        expect(group.user_count).toBe(1);
      }
    });

    it('reads server-side is_seen / is_read', async () => {
      const [group] = await readGroups();

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Server-side `is_seen` / `is_read`" tab="Node.js" index=1
      const isRead = group.is_read;
      const isSeen = group.is_seen;
      // #endregion snippet

      expect(isRead).toBe(false);
      expect(isSeen).toBe(false);
    });

    it('reads unread / unseen counts', async () => {
      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Unread/unseen counts" tab="Node.js" index=1
      // COPY: readerId="john"
      const response = await notificationFeed.getOrCreate({
        user_id: readerId,
      });
      const status = response.notification_status;

      const unread = status?.unread ?? 0;
      const unseen = status?.unseen ?? 0;
      // #endregion snippet

      expect(unread).toBe(2);
      expect(unseen).toBe(2);
    });

    it('computes read / seen status client-side (legacy)', async () => {
      const response = await notificationFeed.getOrCreate({
        user_id: readerId,
      });
      const [group] = response.aggregated_activities;
      const lastReadAt = response.notification_status?.last_read_at;
      const lastSeenAt = response.notification_status?.last_seen_at;
      const readActivities =
        response.notification_status?.read_activities ?? [];
      const seenActivities =
        response.notification_status?.seen_activities ?? [];

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Legacy: Client-side computation" tab="Node.js" index=1
      // Deprecated — use group.is_read / group.is_seen instead
      const isRead =
        (lastReadAt && group.updated_at.getTime() < lastReadAt.getTime()) ||
        readActivities.includes(group.group);
      const isSeen =
        (lastSeenAt && group.updated_at.getTime() < lastSeenAt.getTime()) ||
        seenActivities.includes(group.group);
      // #endregion snippet

      // Nothing was read or seen yet: same as the server-side flags.
      expect(Boolean(isRead)).toBe(group.is_read);
      expect(Boolean(isSeen)).toBe(group.is_seen);
    });

    it('marks notifications as seen', async () => {
      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Marking notifications as seen" tab="Node.js" index=1
      // COPY: readerId="<user id>"
      await notificationFeed.markActivity({
        // Mark all notifications as seen...
        mark_all_seen: true,
        // ...or only selected ones
        mark_seen: [/* group names to mark as seen */],
        user_id: readerId,
      });
      // #endregion snippet

      await retry(async () => {
        const response = await notificationFeed.getOrCreate({
          user_id: readerId,
        });
        expect(response.notification_status).toMatchObject({
          unseen: 0,
          unread: 2,
        });
        expect(
          response.aggregated_activities.map((g) => [g.is_seen, g.is_read]),
        ).toEqual([
          [true, false],
          [true, false],
        ]);
      });
    });

    it('marks notifications as read', async () => {
      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Marking notifications as read" tab="Node.js" index=1
      // COPY: readerId="<user id>"
      await notificationFeed.markActivity({
        // Mark all notifications as read...
        mark_all_read: true,
        // ...or only selected ones
        mark_read: [/* group names to mark as read */],
        user_id: readerId,
      });
      // #endregion snippet

      await retry(async () => {
        const response = await notificationFeed.getOrCreate({
          user_id: readerId,
        });
        expect(response.notification_status).toMatchObject({
          unseen: 0,
          unread: 0,
        });
        expect(response.aggregated_activities.map((g) => g.is_read)).toEqual([
          true,
          true,
        ]);
      });
    });
  });

  it('paginates a feed', async () => {
    const jackId = await createUser('jack');
    const viewerId = jackId;
    await createFeed('user', jackId);
    // One more activity than a page: the docs' limit is COPY-mapped to 2.
    const pageSize = 2;
    for (const text of ['first', 'second', 'third']) {
      await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${jackId}`],
        text,
        user_id: jackId,
      });
    }

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Pagination" tab="Node.js" index=1
    // COPY: jackId="jack", viewerId="user_id", pageSize=10
    const feed = client.feeds.feed('user', jackId);
    const firstPage = await feed.getOrCreate({
      limit: pageSize,
      user_id: viewerId,
    });

    const nextPage = await feed.getOrCreate({
      next: firstPage.next,
      limit: pageSize,
      user_id: viewerId,
    });
    // #endregion snippet

    expect(firstPage.activities.map((a) => a.text)).toEqual([
      'third',
      'second',
    ]);
    expect(typeof firstPage.next).toBe('string');
    expect(nextPage.activities.map((a) => a.text)).toEqual(['first']);
  });

  describe('flat notification feeds', () => {
    // The built-in notification group is app-wide: the fences run on a
    // uniqueId group created with its settings.
    let flatGroupId: string;

    beforeAll(async () => {
      const copy = await copyFeedGroup(client, cleanup, 'notification');
      expect(copy.builtIn.aggregation?.format).toBeTruthy();
      flatGroupId = copy.id;
    });

    beforeEach(() =>
      retryOnFeedGroupMissing(client, [
        'updateFeedGroup',
        'getFeedGroup',
        'getOrCreateFeed',
        'markActivity',
      ]),
    );

    it('turns off aggregation', async () => {
      const before = await client.feeds.getFeedGroup({ id: flatGroupId });
      expect(before.feed_group.aggregation?.format).toBeTruthy();

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Turning off aggregation" tab="Node.js" index=1
      // COPY: flatGroupId="notification"
      await client.feeds.updateFeedGroup({
        id: flatGroupId,
        notification: {
          track_read: true,
          track_seen: true,
        },
        push_notification: {
          enable_push: true,
          push_types: [/* list notification types here */],
        },
      });
      // #endregion snippet

      const update = vi.spyOn(client.feeds, 'updateFeedGroup');
      const { feed_group } = await (update.mock.results[0]
        .value as Promise<UpdateFeedGroupResponse>);
      expect(feed_group.aggregation).toBeUndefined();
      expect(feed_group.notification).toMatchObject({
        track_read: true,
        track_seen: true,
      });
    });

    it('reads, paginates and marks flat notifications', async () => {
      const userId = await createUser('flat-reader');
      const notifierId = await createUser('flat-notifier');
      await createFeed(flatGroupId, userId);
      await waitForFeedGroup(flatGroupId, userId);
      for (const text of ['first', 'second', 'third']) {
        await addActivityOnce(client, {
          type: 'like',
          feeds: [`${flatGroupId}:${userId}`],
          text,
          user_id: notifierId,
        });
      }
      // The aggregation change reaches API nodes over a few seconds: wait
      // until several reads in a row see a flat, paginated feed.
      await retry(async () => {
        for (let i = 0; i < 5; i++) {
          const response = await client.feeds
            .feed(flatGroupId, userId)
            .getOrCreate({ limit: 2, user_id: userId });
          // Flat: three unread activities, no groups.
          expect(response.notification_status?.unread).toBe(3);
          expect(response.aggregated_activities).toEqual([]);
          expect(typeof response.next).toBe('string');
        }
      });
      // One more notification than a page: the docs' limit is COPY-mapped to 2.
      const pageSize = 2;

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Reading and paginating flat notifications" tab="Node.js" index=1
      // COPY: flatGroupId="notification", pageSize=20
      const notificationFeed = client.feeds.feed(flatGroupId, userId);

      const first = await notificationFeed.getOrCreate({
        limit: pageSize,
        user_id: userId,
      });
      const page1 = first.activities;

      const second = await notificationFeed.getOrCreate({
        limit: pageSize,
        next: first.next,
        user_id: userId,
      });
      // #endregion snippet

      expect(page1.map((a) => a.text)).toEqual(['third', 'second']);
      expect(second.activities.map((a) => a.text)).toEqual(['first']);

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Per-activity `is_seen` and `is_read`" tab="Node.js" index=1
      const activity = first.activities[0];
      const isRead = activity.is_read;
      const isSeen = activity.is_seen;
      // #endregion snippet

      expect(isRead).toBe(false);
      expect(isSeen).toBe(false);

      // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/06-notification_feeds.md" heading="Marking flat notifications as seen or read" tab="Node.js" index=1
      await notificationFeed.markActivity({
        mark_seen: [activity.id],
        user_id: userId,
      });
      // #endregion snippet

      await retry(async () => {
        const response = await client.feeds
          .feed(flatGroupId, userId)
          .getOrCreate({ user_id: userId });
        expect(response.notification_status).toMatchObject({
          unseen: 2,
          unread: 3,
        });
        expect(
          response.activities.map((a) => [a.text, a.is_seen, a.is_read]),
        ).toEqual([
          ['third', true, false],
          ['second', false, false],
          ['first', false, false],
        ]);
      });
    });
  });
});
