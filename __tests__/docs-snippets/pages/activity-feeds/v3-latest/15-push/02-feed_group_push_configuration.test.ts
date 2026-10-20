import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { UpdateFeedGroupResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  copyFeedGroup,
  retryOnFeedGroupMissing,
} from '../../../../helpers/feeds';

const DOCS =
  'activity-feeds/v3-latest/_default/15-push/02-feed_group_push_configuration.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Updating Feed Group Push Configuration', async () => {
    // The built-in groups are app-wide: the fence runs on uniqueId copies.
    const { id: notificationGroupId, builtIn: notification } =
      await copyFeedGroup(client, cleanup, 'notification');
    const { id: userGroupId, builtIn: user } = await copyFeedGroup(
      client,
      cleanup,
      'user',
    );
    expect(notification.push_notification?.enable_push).toBe(true);
    expect(notification.aggregation?.format).toBeTruthy();
    expect(user.push_notification?.enable_push).toBe(true);

    retryOnFeedGroupMissing(client, ['updateFeedGroup']);

    // #region snippet docs="activity-feeds/v3-latest/_default/15-push/02-feed_group_push_configuration.md" heading="Updating Feed Group Push Configuration" tab="Node.js" index=1
    // COPY: notificationGroupId="notification", userGroupId="user"
    // Update notification feed group to only send push for follows
    await client.feeds.updateFeedGroup({
      id: notificationGroupId,
      push_notification: {
        enable_push: true,
        push_types: ['follow'], // Only follows will trigger push notifications
      },
    });

    // Disable all push notifications for a feed group
    await client.feeds.updateFeedGroup({
      id: userGroupId,
      push_notification: {
        enable_push: false,
      },
    });
    // #endregion snippet

    // The spy retryOnFeedGroupMissing installed.
    const update = vi.spyOn(client.feeds, 'updateFeedGroup');
    const [notificationUpdate, userUpdate] = await Promise.all(
      update.mock.results.map(
        (r) => r.value as Promise<UpdateFeedGroupResponse>,
      ),
    );
    expect(notificationUpdate.feed_group).toMatchObject({
      id: notificationGroupId,
      push_notification: { enable_push: true, push_types: ['follow'] },
    });
    // An update replaces every field: the fence also drops the group's aggregation.
    expect(notificationUpdate.feed_group.aggregation).toBeUndefined();
    expect(userUpdate.feed_group.id).toBe(userGroupId);
    // `enable_push: false` is left out of the response.
    expect(userUpdate.feed_group.push_notification).toEqual({});
  });
});
