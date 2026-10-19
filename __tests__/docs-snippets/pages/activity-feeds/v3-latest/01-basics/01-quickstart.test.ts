import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  AddActivityResponse,
  PollVoteResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { deletePollsCreatedBy } from '../../../../helpers/server';
import { retry } from '../../../../helpers/wait';

const DOCS = 'activity-feeds/v3-latest/_default/01-basics/01-quickstart.md';

// Values the module-level region below uses (it must come after them: TDZ).
// The docs' placeholders are COPY-mapped to the test app's credentials.
const streamApiKey = process.env.STREAM_API_KEY as string;
const streamSecret = process.env.STREAM_SECRET as string;
// The docs' "john" user, test-owned.
const johnId = uniqueId('john');
const johnUserFeed = `user:${johnId}`;
const serverClient = getServerClient();
const cleanup = new Cleanup(serverClient);
cleanup.users.push(johnId);
cleanup.feeds.push(johnUserFeed);
cleanup.add(() => deletePollsCreatedBy(serverClient, johnId));
await serverClient.upsertUsers([{ id: johnId }]);

// #region snippet docs="activity-feeds/v3-latest/_default/01-basics/01-quickstart.md" heading="Getting started" tab="Node.js" index=1
// COPY: streamApiKey="<API key>", streamSecret="<API secret>", johnId="john", johnUserFeed="user:john"
import { StreamClient } from '@stream-io/node-sdk';

// Initialize the client
const client = new StreamClient(streamApiKey, streamSecret);

// Create a feed (or get its data if exists)
const feed = client.feeds.feed('user', johnId);
await feed.getOrCreate({ user_id: johnId });

// Add activity
await client.feeds.addActivity({
  type: 'post',
  feeds: [johnUserFeed],
  text: 'Hello, Stream Feeds!',
  user_id: johnId,
});
// #endregion snippet

describe(DOCS, () => {
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates the user feed and adds an activity', async () => {
    expect(feed.id).toBe(johnId);
    const response = await serverClient.feeds.feed('user', johnId).getOrCreate({
      user_id: johnId,
    });
    expect(response.activities.map((a) => [a.type, a.text])).toEqual([
      ['post', 'Hello, Stream Feeds!'],
    ]);
    expect(response.activities[0].user.id).toBe(johnId);
  });

  it('adds reactions and comments', async () => {
    cleanup.feeds.push(`timeline:${johnId}`);
    // The docs' "activity_123" and "comment_456" placeholders, created here.
    const { activity } = await serverClient.feeds.addActivity({
      type: 'post',
      feeds: [johnUserFeed],
      text: 'Reaction target',
      user_id: johnId,
    });
    const activityId = activity.id;
    const { comment: existingComment } = await serverClient.feeds.addComment({
      object_id: activityId,
      object_type: 'activity',
      comment: 'An existing comment',
      user_id: johnId,
    });
    const commentId = existingComment.id;

    // #region snippet docs="activity-feeds/v3-latest/_default/01-basics/01-quickstart.md" heading="Social media feed" tab="Node.js" index=1
    // COPY: johnId="john", activityId="activity_123", commentId="comment_456"
    // Create a timeline feed
    const timeline = client.feeds.feed('timeline', johnId);
    await timeline.getOrCreate({ user_id: johnId });

    // Add a reaction to activity
    await client.feeds.addActivityReaction({
      activity_id: activityId,
      type: 'like',
      user_id: johnId,
    });

    // Add a comment to activity
    await client.feeds.addComment({
      object_id: activityId,
      object_type: 'activity',
      comment: 'Great post!',
      user_id: johnId,
    });

    // Add a reaction to comment
    await client.feeds.addCommentReaction({
      id: commentId,
      type: 'love',
      user_id: johnId,
    });
    // #endregion snippet

    expect(timeline.id).toBe(johnId);
    const { feed: timelineFeed } = await serverClient.feeds
      .feed('timeline', johnId)
      .getOrCreate({ user_id: johnId });
    expect(timelineFeed.feed).toBe(`timeline:${johnId}`);

    const { activity: updated } = await serverClient.feeds.getActivity({
      id: activityId,
    });
    expect(updated.reaction_groups.like?.count).toBe(1);
    expect(updated.latest_reactions.map((r) => [r.type, r.user.id])).toEqual([
      ['like', johnId],
    ]);
    expect(updated.comment_count).toBe(2);

    const { comments } = await serverClient.feeds.getComments({
      object_id: activityId,
      object_type: 'activity',
    });
    expect(comments.map((c) => c.text).sort()).toEqual([
      'An existing comment',
      'Great post!',
    ]);

    const { comment } = await serverClient.feeds.getComment({ id: commentId });
    expect(comment.reaction_groups?.love?.count).toBe(1);
  });

  it('marks notifications as read', async () => {
    const notificationFeed = `notification:${johnId}`;
    cleanup.feeds.push(notificationFeed);
    // An unread notification for john: another user's activity in his notification feed.
    const otherId = uniqueId('notifier');
    cleanup.users.push(otherId);
    await serverClient.upsertUsers([{ id: otherId }]);
    await serverClient.feeds
      .feed('notification', johnId)
      .getOrCreate({ user_id: johnId });
    await serverClient.feeds.addActivity({
      type: 'like',
      feeds: [notificationFeed],
      text: 'liked your post',
      user_id: otherId,
    });
    const before = await retry(async () => {
      const response = await serverClient.feeds
        .feed('notification', johnId)
        .getOrCreate({ user_id: johnId });
      if (!response.notification_status?.unread) {
        throw new Error('no unread notification yet');
      }
      return response;
    });
    expect(before.notification_status?.unread).toBeGreaterThan(0);

    // #region snippet docs="activity-feeds/v3-latest/_default/01-basics/01-quickstart.md" heading="Notification feed" tab="Node.js" index=1
    // COPY: johnId="john"
    // Create a notification feed
    const notifications = client.feeds.feed('notification', johnId);
    await notifications.getOrCreate({ user_id: johnId });

    // Mark notifications as read
    await notifications.markActivity({
      mark_all_read: true,
      user_id: johnId,
    });
    // #endregion snippet

    const after = await retry(async () => {
      const response = await serverClient.feeds
        .feed('notification', johnId)
        .getOrCreate({ user_id: johnId });
      if (response.notification_status?.unread !== 0) {
        throw new Error('notifications still unread');
      }
      return response;
    });
    expect(after.notification_status?.unread).toBe(0);
    expect(after.notification_status?.last_read_at).toBeInstanceOf(Date);
  });

  it('creates a poll, attaches it to an activity and votes', async () => {
    // The docs' "existing poll" ("poll_456", option "option_789", activity "activity_123").
    const existing = await serverClient.createPoll({
      name: 'An existing poll',
      options: [{ text: 'Yes' }, { text: 'No' }],
      user_id: johnId,
    });
    const pollId = existing.poll.id;
    const optionId = existing.poll.options[0].id;
    const { activity: pollActivity } = await serverClient.feeds.addActivity({
      feeds: [johnUserFeed],
      text: 'An existing poll',
      type: 'poll',
      poll_id: pollId,
      user_id: johnId,
    });
    const activityId = pollActivity.id;
    const castPollVote = vi.spyOn(client.feeds, 'castPollVote');

    // #region snippet docs="activity-feeds/v3-latest/_default/01-basics/01-quickstart.md" heading="Polls" tab="Node.js" index=1
    // COPY: johnId="john", johnUserFeed="user:john", activityId="activity_123", pollId="poll_456", optionId="option_789"
    const poll = await client.createPoll({
      name: 'What is your favorite color?',
      options: [{ text: 'Red' }, { text: 'Blue' }, { text: 'Green' }],
      user_id: johnId,
    });

    // Attach it to an activity
    const activity = await client.feeds.addActivity({
      feeds: [johnUserFeed],
      text: 'What is your favorite color?',
      type: 'poll',
      poll_id: poll.poll.id,
      user_id: johnId,
    });

    // Cast a vote on an existing poll
    await client.feeds.castPollVote({
      activity_id: activityId,
      poll_id: pollId,
      user_id: johnId,
      vote: {
        option_id: optionId,
      },
    });
    // #endregion snippet

    expect(poll.poll.options.map((o) => o.text)).toEqual([
      'Red',
      'Blue',
      'Green',
    ]);
    expect(activity.activity.poll?.id).toBe(poll.poll.id);
    expect(activity.activity.type).toBe('poll');

    const { vote } = await (castPollVote.mock.results[0]
      .value as Promise<PollVoteResponse>);
    expect(vote?.option_id).toBe(optionId);
    expect(vote?.user_id).toBe(johnId);
    const { activity: voted } = await serverClient.feeds.getActivity({
      id: activityId,
    });
    expect(voted.poll?.vote_count).toBe(1);
    expect(voted.poll?.vote_counts_by_option[optionId]).toBe(1);
  });

  it('adds a custom activity with custom fields', async () => {
    const add = vi.spyOn(client.feeds, 'addActivity');

    // #region snippet docs="activity-feeds/v3-latest/_default/01-basics/01-quickstart.md" heading="Custom activity types" tab="Node.js" index=1
    // COPY: johnId="john", johnUserFeed="user:john"
    // Add custom activity with custom fields
    await client.feeds.addActivity({
      type: 'workout',
      feeds: [johnUserFeed],
      text: 'Just finished my run',
      user_id: johnId,
      custom: {
        distance: 5.2,
        duration: 1800,
        calories: 450,
      },
    });
    // #endregion snippet

    const { activity } = await (add.mock.results[0]
      .value as Promise<AddActivityResponse>);
    const { activity: stored } = await serverClient.feeds.getActivity({
      id: activity.id,
    });
    expect(stored.type).toBe('workout');
    expect(stored.feeds).toEqual([johnUserFeed]);
    expect(stored.custom).toEqual({
      distance: 5.2,
      duration: 1800,
      calories: 450,
    });
  });
});
