import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  PinActivityResponse,
  UnpinActivityResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/07-pins.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  /** A `uniqueId` user with their own `user` feed. */
  const createUserWithFeed = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    cleanup.feeds.push(`user:${id}`);
    const feed = client.feeds.feed('user', id);
    await feed.getOrCreate({ user_id: id });
    return { id, feed };
  };

  const addActivity = async (
    userId: string,
    text: string,
    expiresAt?: Date,
  ) => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${userId}`],
      type: 'post',
      text,
      user_id: userId,
      expires_at: expiresAt?.toISOString(),
    });
    return activity.id;
  };

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('pins and unpins an activity', async () => {
    const { id: userId, feed } = await createUserWithFeed('owner');
    const activityId = await addActivity(userId, 'pin me');
    const pinActivity = vi.spyOn(client.feeds, 'pinActivity');
    const unpinActivity = vi.spyOn(client.feeds, 'unpinActivity');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/07-pins.md" heading="Overview" tab="Node.js" index=1
    // COPY: activityId="activity_123", userId="<user id>"
    // Pin an activity
    await client.feeds.pinActivity({
      feed_group_id: feed.group,
      feed_id: feed.id,
      activity_id: activityId,
      user_id: userId,
    });

    // Unpin an activity
    await client.feeds.unpinActivity({
      feed_group_id: feed.group,
      feed_id: feed.id,
      activity_id: activityId,
      user_id: userId,
    });
    // #endregion snippet

    const pinned = await (pinActivity.mock.results[0]
      .value as Promise<PinActivityResponse>);
    expect(pinned.activity.id).toBe(activityId);
    const unpinned = await (unpinActivity.mock.results[0]
      .value as Promise<UnpinActivityResponse>);
    expect(unpinned.activity.id).toBe(activityId);
    // The pin is gone.
    const { pinned_activities } = await feed.getOrCreate({ user_id: userId });
    expect(pinned_activities).toEqual([]);
  });

  it('returns pinned activities when reading a feed', async () => {
    const { id: saraId, feed } = await createUserWithFeed('sara');
    const activityId = await addActivity(saraId, 'pinned');
    await addActivity(saraId, 'not pinned');
    await feed.pinActivity({ activity_id: activityId, user_id: saraId });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/07-pins.md" heading="Overview" tab="Node.js" index=2
    // COPY: saraId="sara"
    const response = await feed.getOrCreate({ user_id: saraId });
    console.log(response.pinned_activities);
    // #endregion snippet

    expect(response.pinned_activities.map((p) => p.activity.id)).toEqual([
      activityId,
    ]);
    expect(log.mock.calls).toEqual([[response.pinned_activities]]);
  });

  it('queries pinned activities', async () => {
    const { id: johnId, feed } = await createUserWithFeed('john');
    const activeId = await addActivity(johnId, 'active');
    const expiringId = await addActivity(
      johnId,
      'expiring',
      new Date(Date.now() + 3000),
    );
    await feed.pinActivity({ activity_id: activeId, user_id: johnId });
    await feed.pinActivity({ activity_id: expiringId, user_id: johnId });
    // Let the second activity expire.
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/07-pins.md" heading="Query pinned activities" tab="Node.js" index=1
    // COPY: johnId="john"
    const response = await client.feeds.queryPinnedActivities({
      feed_group_id: 'user',
      feed_id: johnId,
      include_moderated_activities: true,
      include_expired_activities: true,
      limit: 20,
    });
    console.log(response.pinned_activities, response.next);
    // #endregion snippet

    vi.restoreAllMocks();
    expect(response.pinned_activities.map((p) => p.activity.id).sort()).toEqual(
      [activeId, expiringId].sort(),
    );
    expect(log.mock.calls).toEqual([
      [response.pinned_activities, response.next],
    ]);
    // Control: without `include_expired_activities` the expired pin is left out.
    const withoutExpired = await client.feeds.queryPinnedActivities({
      feed_group_id: 'user',
      feed_id: johnId,
      limit: 20,
    });
    expect(withoutExpired.pinned_activities.map((p) => p.activity.id)).toEqual([
      activeId,
    ]);
  });
});
