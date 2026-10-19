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
  DeleteActivitiesResponse,
  DeleteActivityResponse,
  UpsertActivitiesResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { isFeedGroupMissing } from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS = 'activity-feeds/v3-latest/_default/05-activities/01-activities.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

/**
 * A fid in `group` with a uniqueId id, registered for cleanup. The API auto-creates
 * a missing feed on add activity only when a user with the feed's id exists (code 113
 * "Missing feed ... can't be created: user not found"), so the user is created too.
 */
const newFid = async (group: string, name: string) => {
  const id = uniqueId(name);
  cleanup.users.push(id);
  await client.upsertUsers([{ id }]);
  const fid = `${group}:${id}`;
  cleanup.feeds.push(fid);
  return fid;
};
const newUserFid = (name: string) => newFid('user', name);

describe(DOCS, () => {
  let userId: string;
  // The docs' "stock" feed group: a uniqueId group with default settings.
  let stockGroup: string;

  const newStockFid = (name: string) => newFid(stockGroup, name);

  /** Adds a setup activity to the owner's `user` feed and returns it. */
  const createActivity = async (text = 'setup') => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${userId}`],
      type: 'post',
      text,
      user_id: userId,
    });
    return activity;
  };

  beforeAll(async () => {
    userId = uniqueId('owner');
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    cleanup.feeds.push(`user:${userId}`);

    stockGroup = uniqueId('stock');
    cleanup.feedGroups.push(stockGroup);
    await client.feeds.createFeedGroup({ id: stockGroup });
    // The new group isn't known to every API node at once: wait until several
    // reads in a row find it, so the regions can add activities to it as written.
    const probeId = uniqueId('probe');
    cleanup.feeds.push(`${stockGroup}:${probeId}`);
    for (let read = 0; read < 5; read++) {
      await retry(
        () =>
          client.feeds.getOrCreateFeed({
            feed_group_id: stockGroup,
            feed_id: probeId,
            user_id: userId,
          }),
        { retryIf: isFeedGroupMissing },
      );
    }
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates an activity', async () => {
    const user1Fid = await newUserFid('user1');
    const appleFid = await newStockFid('apple');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Creating Activities" tab="Node.js" index=1
    // COPY: user1Fid="user:1", appleFid="stock:apple", userId="<user id>"
    // Add an activity to 1 feed or multiple feeds
    const response = await client.feeds.addActivity({
      feeds: [user1Fid, appleFid],
      type: 'post',
      text: 'apple stock will go up',
      // Provide user id, the owner of the activity
      user_id: userId,
    });

    console.log(response.activity);
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(response.activity);
    expect(response.activity).toMatchObject({
      type: 'post',
      text: 'apple stock will go up',
      user: { id: userId },
    });
    expect([...response.activity.feeds].sort()).toEqual(
      [user1Fid, appleFid].sort(),
    );
    // The feeds were created automatically.
    const stored = await client.feeds.getActivity({ id: response.activity.id });
    expect(stored.activity.id).toBe(response.activity.id);
  });

  it('creates an image activity', async () => {
    const user1Fid = await newUserFid('user1');
    const addActivity = vi.spyOn(client.feeds, 'addActivity');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Image & Video" tab="Node.js" index=1
    // COPY: user1Fid="user:1", userId="<user id>"
    await client.feeds.addActivity({
      feeds: [user1Fid],
      type: 'post',
      text: 'look at NYC',
      attachments: [
        {
          type: 'image',
          image_url: 'https://example.com/image.png',
          custom: {},
        },
      ],
      // Provide user id, the owner of the activity
      user_id: userId,
    });
    // #endregion snippet

    const { activity } = await (addActivity.mock.results[0]
      .value as Promise<AddActivityResponse>);
    expect(activity.text).toBe('look at NYC');
    expect(activity.attachments).toMatchObject([
      { type: 'image', image_url: 'https://example.com/image.png' },
    ]);
  });

  it('shares an activity', async () => {
    const user1Fid = await newUserFid('user1');
    const activityToShare = await createActivity('original');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Sharing activities" tab="Node.js" index=1
    // COPY: user1Fid="user:1", userId="<user id>"
    // Add an activity to 1 feed or multiple feeds
    const response = await client.feeds.addActivity({
      feeds: [user1Fid],
      type: 'post',
      text: `Couldn't agree more!`,
      parent_id: activityToShare.id,
      // Provide user id, the owner of the activity
      user_id: userId,
    });

    console.log(response.activity?.parent);
    // #endregion snippet

    expect(response.activity.parent?.id).toBe(activityToShare.id);
    expect(log).toHaveBeenCalledWith(response.activity.parent);
    const parent = await client.feeds.getActivity({ id: activityToShare.id });
    expect(parent.activity.share_count).toBe(1);
  });

  it('restricts comment replies', async () => {
    const user1Fid = await newUserFid('user1');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Restricting comment replies" tab="Node.js" index=1
    // COPY: user1Fid="user:1", userId="<user id>"
    const response = await client.feeds.addActivity({
      feeds: [user1Fid],
      type: 'post',
      text: 'apple stock will go up',
      user_id: userId,
      restrict_replies: 'people_i_follow', // Options: "everyone", "people_i_follow", "nobody"
    });
    // #endregion snippet

    expect(response.activity.restrict_replies).toBe('people_i_follow');
  });

  it('adds many activities', async () => {
    const user123Fid = await newUserFid('user123');
    const user456Fid = await newUserFid('user456');
    const activity1Id = uniqueId('activity1');
    const activity2Id = uniqueId('activity2');
    const upsert = vi.spyOn(client.feeds, 'upsertActivities');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Adding Many Activities" tab="Node.js" index=1
    // COPY: user123Fid="user:123", user456Fid="user:456", activity1Id="1", activity2Id="2", userId="<user id>"
    await client.feeds.upsertActivities({
      activities: [
        {
          feeds: [user123Fid],
          id: activity1Id,
          type: 'post',
          text: 'hi',
          user_id: userId,
        },
        {
          feeds: [user456Fid],
          id: activity2Id,
          type: 'post',
          text: 'hi',
          user_id: userId,
        },
      ],
    });
    // #endregion snippet

    const { activities } = await (upsert.mock.results[0]
      .value as Promise<UpsertActivitiesResponse>);
    expect(activities.map((a) => [a.id, a.feeds])).toEqual([
      [activity1Id, [user123Fid]],
      [activity2Id, [user456Fid]],
    ]);
  });

  it('adds an activity with tag visibility', async () => {
    const user1Fid = await newUserFid('user1');
    const addActivity = vi.spyOn(client.feeds, 'addActivity');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Visibility Levels" tab="Node.js" index=1
    // COPY: user1Fid="user:1", userId="<user id>"
    await client.feeds.addActivity({
      feeds: [user1Fid],
      type: 'post',
      text: 'Premium content',
      visibility: 'tag',
      visibility_tag: 'premium',
      user_id: userId,
    });
    // Premium users can see full activity, others a preview
    // #endregion snippet

    const { activity } = await (addActivity.mock.results[0]
      .value as Promise<AddActivityResponse>);
    expect(activity).toMatchObject({
      visibility: 'tag',
      visibility_tag: 'premium',
    });
  });

  it('partially updates an activity', async () => {
    const { activity: created } = await client.feeds.addActivity({
      feeds: [await newUserFid('partial')],
      type: 'post',
      text: 'old text',
      custom: { color: 'red', size: 'L' },
      user_id: userId,
    });
    const activity = created;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Partial activity updates" tab="Node.js" index=1
    // COPY: userId="<user id>"
    // Partially set some fields
    const response = await client.feeds.updateActivityPartial({
      id: activity.id,
      set: {
        text: 'Japan has over 6,800 islands.',
      },
      user_id: userId,
      run_activity_processors: true, // Run processors if text/attachments changed
    });
    console.log(response.activity.edited_at);

    // Partially unset some fields
    const unsetResponse = await client.feeds.updateActivityPartial({
      id: activity.id,
      unset: ['custom.color'],
      user_id: userId,
    });
    console.log(unsetResponse.activity.edited_at);
    // #endregion snippet

    expect(response.activity.text).toBe('Japan has over 6,800 islands.');
    expect(response.activity.custom).toEqual({ color: 'red', size: 'L' });
    expect(unsetResponse.activity.text).toBe('Japan has over 6,800 islands.');
    expect(unsetResponse.activity.custom).toEqual({ size: 'L' });
    expect(unsetResponse.activity.edited_at).toBeInstanceOf(Date);
    expect(log).toHaveBeenCalledTimes(2);
  });

  it('updates an activity', async () => {
    const { id: activityId } = await createActivity('old text');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Updating Activities" tab="Node.js" index=1
    // COPY: activityId="123", userId="<user id>"
    // NOTE: updateActivity does a full replace of the activity.
    // Use updateActivityPartial if you only want to update specific fields.
    const response = await client.feeds.updateActivity({
      id: activityId,
      text: 'Updated text',
      user_id: userId,
      run_activity_processors: true, // Run processors if text/attachments changed
    });
    console.log(response.activity.edited_at);
    // #endregion snippet

    expect(response.activity.text).toBe('Updated text');
    expect(response.activity.edited_at).toBeInstanceOf(Date);
    expect(log).toHaveBeenCalledWith(response.activity.edited_at);
  });

  it('deletes activities', async () => {
    const { id: activityId } = await createActivity();
    const { id: activity456Id } = await createActivity();
    const deleteActivity = vi.spyOn(client.feeds, 'deleteActivity');
    const deleteActivities = vi.spyOn(client.feeds, 'deleteActivities');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Deleting Activities" tab="Node.js" index=1
    // COPY: activityId="123", activity456Id="456", userId="<user id>"
    await client.feeds.deleteActivity({
      id: activityId,
      hard_delete: false, // Soft delete sets deleted_at but retains the data, hard delete fully removes it
    });

    // Batch delete activities
    await client.feeds.deleteActivities({
      ids: [activityId, activity456Id],
      user_id: userId,
      hard_delete: false,
    });
    // #endregion snippet

    await (deleteActivity.mock.results[0]
      .value as Promise<DeleteActivityResponse>);
    await (deleteActivities.mock.results[0]
      .value as Promise<DeleteActivitiesResponse>);
    for (const id of [activityId, activity456Id]) {
      await expect(client.feeds.getActivity({ id })).rejects.toMatchObject({
        metadata: { responseCode: 404 },
      });
      const { activity } = await client.feeds.getActivity({
        id,
        include_soft_deleted_activities: true,
      });
      expect(activity.deleted_at).toBeInstanceOf(Date);
    }
  });

  it('restores an activity', async () => {
    const { id: activityId } = await createActivity('restore me');
    await client.feeds.deleteActivity({ id: activityId, hard_delete: false });

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Restore Activity" tab="Node.js" index=1
    // COPY: activityId="123", userId="<user id>"
    // Restore a soft-deleted activity
    const restoredActivity = await client.feeds.restoreActivity({
      id: activityId,
      user_id: userId,
    });
    // #endregion snippet

    expect(restoredActivity.activity.id).toBe(activityId);
    expect(restoredActivity.activity.deleted_at).toBeUndefined();
    const { activity } = await client.feeds.getActivity({ id: activityId });
    expect(activity.text).toBe('restore me');
  });

  it('gets an activity', async () => {
    const { id: activityId } = await createActivity('get me');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Get activity" tab="Node.js" index=1
    // COPY: activityId="activity123"
    const activity = await client.feeds.getActivity({ id: activityId });
    // #endregion snippet

    expect(activity.activity).toMatchObject({ id: activityId, text: 'get me' });
  });

  it('gets a soft-deleted activity', async () => {
    const { id: activityId } = await createActivity('deleted');
    await client.feeds.deleteActivity({ id: activityId, hard_delete: false });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Get a moderated or soft-deleted activity" tab="Node.js" index=1
    // COPY: activityId="activity_123"
    const { activity } = await client.feeds.getActivity({
      id: activityId,
      include_moderated_activities: true,
      include_soft_deleted_activities: true,
    });
    console.log(activity.moderation_action, activity.deleted_at);
    // #endregion snippet

    expect(activity.id).toBe(activityId);
    expect(activity.deleted_at).toBeInstanceOf(Date);
    expect(log).toHaveBeenCalledWith(undefined, activity.deleted_at);
  });

  it('adds an activity to multiple feeds', async () => {
    const user1Fid = await newUserFid('user1');
    const appleFid = await newStockFid('apple');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/01-activities.md" heading="Adding activities to multiple feeds" tab="Node.js" index=1
    // COPY: user1Fid="user:1", appleFid="stock:apple", userId="<user id>"
    // Add an activity to 1 feed or multiple feeds
    const response = await client.feeds.addActivity({
      feeds: [user1Fid, appleFid],
      type: 'post',
      text: 'apple stock will go up',
      // Provide user id, the owner of the activity
      user_id: userId,
    });

    console.log(response.activity);
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(response.activity);
    expect([...response.activity.feeds].sort()).toEqual(
      [user1Fid, appleFid].sort(),
    );
    // Feeds created by the add activity call itself have the activity.
    const apple = await client.feeds.getOrCreateFeed({
      feed_group_id: stockGroup,
      feed_id: appleFid.split(':')[1],
      user_id: userId,
    });
    expect(apple.created).toBe(false);
    expect(apple.activities.map((a) => a.id)).toEqual([response.activity.id]);
  });
});
