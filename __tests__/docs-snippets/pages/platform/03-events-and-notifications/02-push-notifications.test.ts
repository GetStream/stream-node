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
  AddActivityResponse,
  AddCommentResponse,
  AddReactionResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { retry } from '../../../helpers/wait';

/** The feed (or feed group) is already gone, or was never created. */
const isNotFound = (error: unknown) =>
  /not found|can't be found/.test(String(error));

const DOCS = 'platform/03-events-and-notifications/02-push-notifications.md';

/**
 * Feeds push snippets. Pushes aren't checked (the test users have no devices): the tests
 * assert the API responses and the notification activities they create.
 */
describe(DOCS, () => {
  // The page calls the server client `serverClient`.
  const serverClient = getServerClient();
  const cleanup = new Cleanup(serverClient);

  let ownerId: string;
  let userId: string;

  /** Hard-deletes a feed in cleanup (the leak check doesn't track feeds); it may not exist. */
  const deleteFeedLater = (group: string, id: string) => {
    cleanup.add(async () => {
      await serverClient.feeds
        .feed(group, id)
        .delete({ hard_delete: true })
        .catch((error: unknown) => {
          if (!isNotFound(error)) throw error;
        });
    });
  };

  /** A user with a `uniqueId` id and its `notification` feed (where notification activities go). */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await serverClient.upsertUsers([{ id }]);
    await serverClient.feeds
      .feed('notification', id)
      .getOrCreate({ user_id: id });
    deleteFeedLater('notification', id);
    return id;
  };

  /** A new activity by the owner on a `user` feed of the owner. */
  const createActivity = async () => {
    const feedId = uniqueId('user-feed');
    await serverClient.feeds
      .feed('user', feedId)
      .getOrCreate({ user_id: ownerId });
    deleteFeedLater('user', feedId);
    const { activity } = await serverClient.feeds.addActivity({
      type: 'post',
      feeds: [`user:${feedId}`],
      text: 'A post',
      user_id: ownerId,
    });
    return activity;
  };

  beforeAll(async () => {
    ownerId = await createUser('owner');
    userId = await createUser('user-456');
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Direct Push Notifications', async () => {
    const activity = await createActivity();
    const addComment = vi.spyOn(serverClient.feeds, 'addComment');
    const addReaction = vi.spyOn(serverClient.feeds, 'addActivityReaction');

    // #region snippet docs="platform/03-events-and-notifications/02-push-notifications.md" heading="Direct Push Notifications" tab="Node.js" index=1
    // COPY: userId="user-456"
    // Comment with direct push notification (default behavior)
    await serverClient.feeds.addComment({
      object_id: activity.id,
      object_type: 'activity',
      comment: 'Great post!',
      user_id: userId,
      // skip_push: false (default) - sends push immediately
    });

    // Reaction with direct push notification
    await serverClient.feeds.addActivityReaction({
      activity_id: activity.id,
      type: 'like',
      user_id: userId,
      // skip_push: false (default) - sends push immediately
    });
    // #endregion snippet

    const comment = await (addComment.mock.results[0]
      .value as Promise<AddCommentResponse>);
    expect(comment.comment).toMatchObject({
      object_id: activity.id,
      text: 'Great post!',
      user: { id: userId },
    });
    expect(addComment.mock.calls[0][0]?.skip_push).toBeUndefined();
    const reaction = await (addReaction.mock.results[0]
      .value as Promise<AddReactionResponse>);
    expect(reaction.reaction).toMatchObject({
      activity_id: activity.id,
      type: 'like',
      user: { id: userId },
    });
  });

  it('Notification Feed Push Notifications', async () => {
    const activity = await createActivity();
    const addComment = vi.spyOn(serverClient.feeds, 'addComment');
    const addReaction = vi.spyOn(serverClient.feeds, 'addActivityReaction');

    // #region snippet docs="platform/03-events-and-notifications/02-push-notifications.md" heading="Notification Feed Push Notifications" tab="Node.js" index=1
    // COPY: userId="user-456"
    // Comment that creates notification activity and sends via notification feed
    await serverClient.feeds.addComment({
      object_id: activity.id,
      object_type: 'activity',
      comment: 'Great post!',
      user_id: userId,
      create_notification_activity: true,
      skip_push: true, // Send via notification feed instead of direct push
    });

    // Reaction that creates notification activity
    await serverClient.feeds.addActivityReaction({
      activity_id: activity.id,
      type: 'like',
      user_id: userId,
      create_notification_activity: true,
      skip_push: true, // Send via notification feed
    });
    // #endregion snippet

    const comment = await (addComment.mock.results[0]
      .value as Promise<AddCommentResponse>);
    expect(comment.comment).toMatchObject({
      object_id: activity.id,
      text: 'Great post!',
    });
    expect(comment.notification_created).toBe(true);
    const reaction = await (addReaction.mock.results[0]
      .value as Promise<AddReactionResponse>);
    expect(reaction.reaction).toMatchObject({
      activity_id: activity.id,
      type: 'like',
    });
    expect(reaction.notification_accepted).toBe(true);
  });

  it('Custom Notification Feeds', async () => {
    const recipientId = await createUser('user-123');
    const notificationFid = `notification:${recipientId}`;

    // A custom feed group (app-wide): give it a `uniqueId` name and delete it after.
    const alertsGroup = uniqueId('alerts').replace(/-/g, '_');
    await serverClient.feeds.createFeedGroup({ id: alertsGroup });
    cleanup.add(() =>
      serverClient.feeds.deleteFeedGroup({
        id: alertsGroup,
        hard_delete: true,
      }),
    );
    const alertsFid = `${alertsGroup}:${recipientId}`;
    // A new feed group isn't known to every API node right away ("Feed group ... not found").
    await retry(
      () =>
        serverClient.feeds
          .feed(alertsGroup, recipientId)
          .getOrCreate({ user_id: recipientId }),
      { retryIf: isNotFound },
    );
    deleteFeedLater(alertsGroup, recipientId);

    const activityUserId = await createUser('activity-user');
    // Some API nodes still answer "Feed group ... not found" for a while after the
    // getOrCreate above succeeded: retry the region's calls on that error.
    const originalAddActivity = serverClient.feeds.addActivity.bind(
      serverClient.feeds,
    );
    const addActivity = vi
      .spyOn(serverClient.feeds, 'addActivity')
      .mockImplementation((request) =>
        retry(() => originalAddActivity(request), { retryIf: isNotFound }),
      );

    // #region snippet docs="platform/03-events-and-notifications/02-push-notifications.md" heading="Custom Notification Feeds" tab="Node.js" index=1
    // COPY: notificationFid="notification:user-123", alertsFid="alerts:user-123", activityUserId="user_id"
    // Add a custom notification directly to a user's notification feed
    await serverClient.feeds.addActivity({
      feeds: [notificationFid], // Target user's notification feed
      type: 'milestone', // Custom activity type
      text: "You've reached 1000 followers!",
      user_id: activityUserId,
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
      user_id: activityUserId,
    });
    // #endregion snippet

    const [milestone, alert] = await Promise.all(
      addActivity.mock.results.map(
        (r) => r.value as Promise<AddActivityResponse>,
      ),
    );
    expect(milestone.activity).toMatchObject({
      type: 'milestone',
      feeds: [notificationFid],
      custom: { milestone_type: 'followers', count: 1000 },
    });
    expect(alert.activity).toMatchObject({
      type: 'system_alert',
      feeds: [alertsFid],
      text: 'Your subscription expires in 3 days',
    });
  });
});
