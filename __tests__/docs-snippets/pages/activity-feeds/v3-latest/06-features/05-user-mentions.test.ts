import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  notificationTypes,
  waitForNotificationTypes,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';

const DOCS =
  'activity-feeds/v3-latest/_default/06-features/05-user-mentions.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  let ericId: string;
  let bobId: string;
  let aliceId: string;
  let ericFeed: string;
  /** The activity with mentions added by the first snippet. */
  let mentionActivityId: string;

  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id, name }]);
    return id;
  };

  const createFeed = async (group: string, id: string) => {
    cleanup.feeds.push(`${group}:${id}`);
    await client.feeds.feed(group, id).getOrCreate({ user_id: id });
  };

  beforeAll(async () => {
    ericId = await createUser('eric');
    bobId = await createUser('bob');
    aliceId = await createUser('alice');
    ericFeed = `user:${ericId}`;
    await createFeed('user', ericId);
    // `notification` feeds aren't created automatically.
    await createFeed('notification', bobId);
    await createFeed('notification', aliceId);
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('adds an activity with mentions', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/05-user-mentions.md" heading="Adding an activity with mentions" tab="Node.js" index=1
    // COPY: ericFeed="user:eric", ericId="eric", bobId="bob", aliceId="alice"
    const response = await client.feeds.addActivity({
      feeds: [ericFeed],
      type: 'post',
      text: 'Hey @bob and @alice, check this out!',
      user_id: ericId,
      mentioned_user_ids: [bobId, aliceId],
      create_notification_activity: true,
    });
    // response.activity.mentioned_users contains enriched user objects
    // #endregion snippet

    mentionActivityId = response.activity.id;
    expect(
      response.activity.mentioned_users.map((u) => [u.id, u.name]),
    ).toEqual([
      [bobId, 'bob'],
      [aliceId, 'alice'],
    ]);
    // Each mentioned user gets a `mention` notification.
    await waitForNotificationTypes(client, bobId, ['mention']);
    await waitForNotificationTypes(client, aliceId, ['mention']);
  });

  it('adds a comment with mentions', async () => {
    const { activity } = await client.feeds.addActivity({
      feeds: [ericFeed],
      type: 'post',
      text: 'An activity to comment on',
      user_id: ericId,
    });
    const activityId = activity.id;
    const bobBefore = await notificationTypes(client, bobId);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/05-user-mentions.md" heading="Adding a comment with mentions" tab="Node.js" index=1
    // COPY: activityId="activity_123", aliceId="alice", bobId="bob"
    const response = await client.feeds.addComment({
      comment: 'Thanks @bob for the tip!',
      object_id: activityId,
      object_type: 'activity',
      user_id: aliceId,
      mentioned_user_ids: [bobId],
      create_notification_activity: true,
    });
    // response.comment.mentioned_users contains enriched user objects
    // #endregion snippet

    expect(response.comment.mentioned_users.map((u) => u.id)).toEqual([bobId]);
    // Bob gets a `comment_mention` notification on top of the earlier ones.
    await waitForNotificationTypes(client, bobId, [
      ...bobBefore,
      'comment_mention',
    ]);
  });

  it('reads mentioned users', async () => {
    // An activity with a commented mention (the first snippet's activity has the
    // activity-level mentions).
    const { comment } = await client.feeds.addComment({
      comment: 'Hi @alice',
      object_id: mentionActivityId,
      object_type: 'activity',
      user_id: bobId,
      mentioned_user_ids: [aliceId],
    });
    expect(comment.mentioned_users.map((u) => u.id)).toEqual([aliceId]);
    const activityId = mentionActivityId;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/05-user-mentions.md" heading="Reading mentioned users" tab="Node.js" index=1
    // COPY: ericId="eric"
    // From activities
    const response = await client.feeds.getOrCreateFeed({
      feed_group_id: 'user',
      feed_id: ericId,
      user_id: ericId,
    });
    response.activities.forEach((activity) => {
      if (activity.mentioned_users?.length) {
        console.log(
          'Mentioned:',
          activity.mentioned_users.map((u) => u.name).join(', '),
        );
      }
    });
    // From comments
    const activityResponse = await client.feeds.getActivity({
      id: activityId,
      comment_limit: 10,
    });
    activityResponse.activity.comments.forEach((comment) => {
      if (comment.mentioned_users?.length) {
        console.log(
          'Comment mentioned:',
          comment.mentioned_users.map((u) => u.name).join(', '),
        );
      }
    });
    // #endregion snippet

    expect(log.mock.calls).toEqual([
      ['Mentioned:', 'bob, alice'],
      ['Comment mentioned:', 'alice'],
    ]);
  });
});
