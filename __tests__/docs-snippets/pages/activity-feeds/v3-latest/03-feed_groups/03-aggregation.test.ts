import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  GetOrCreateFeedResponse,
  UpdateFeedGroupResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { isFeedGroupMissing } from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { waitForAppSetting } from '../../../../helpers/server';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/03-aggregation.md';

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

  it('creates an aggregated feed group', async () => {
    const myId = newFeedGroupId('myid');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/03-aggregation.md" heading="Creating aggregated feed groups" tab="Node.js" index=1
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

  it('updates a feed group', async () => {
    // The heading says "built-in", but built-in groups are app-wide: the
    // fence runs on a uniqueId group.
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

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/03-aggregation.md" heading="Updating built-in feed groups" tab="Node.js" index=1
    // COPY: feedGroupId="<id of feed group to update>"
    await client.feeds.updateFeedGroup({
      id: feedGroupId,
      // Fields to update
    });
    // #endregion snippet

    const { feed_group } = await (update.mock.results[0]
      .value as Promise<UpdateFeedGroupResponse>);
    expect(feed_group.id).toBe(feedGroupId);
    // Updates replace every field: the omitted custom data is cleared.
    expect(feed_group.custom ?? {}).toEqual({});
  });

  it('reads flat activities of an aggregated feed', async () => {
    // An aggregated feed: the built-in notification group, for a new user,
    // with one notification from another user.
    const userId = await createUser('reader');
    const otherId = await createUser('notifier');
    cleanup.feeds.push(`notification:${userId}`);
    const feed = client.feeds.feed('notification', userId);
    await feed.getOrCreate({ user_id: userId });
    const { activity } = await client.feeds.addActivity({
      type: 'like',
      feeds: [`notification:${userId}`],
      text: 'liked your post',
      user_id: otherId,
    });
    // Without flat activities only the groups come back.
    const groupsOnly = await retry(async () => {
      const response = await feed.getOrCreate({
        enrichment_options: { include_flat_activities: false },
        user_id: userId,
      });
      if (!response.aggregated_activities.length) {
        throw new Error('notification not aggregated yet');
      }
      return response;
    });
    expect(groupsOnly.activities).toEqual([]);
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/03-aggregation.md" heading="Flat activities in aggregated feeds" tab="Node.js" index=1
    await feed.getOrCreate({
      enrichment_options: {
        include_flat_activities: true, // or false
      },
      user_id: userId,
    });
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    expect(response.activities.map((a) => a.id)).toEqual([activity.id]);
    expect(
      response.aggregated_activities[0].activities.map((a) => a.id),
    ).toEqual([activity.id]);
  });

  it('reads and updates the aggregation group limit', async () => {
    const original = (await client.getApp()).app
      .max_aggregated_activities_length;
    cleanup.add(async () => {
      await client.updateApp({
        max_aggregated_activities_length: original,
      });
      await waitForAppSetting(
        client,
        'max_aggregated_activities_length',
        original,
      );
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const update = vi.spyOn(client, 'updateApp');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/03-aggregation.md" heading="Aggregation group limit" tab="Node.js" index=1
    const currentSettings = await client.getApp();

    console.log(currentSettings.app.max_aggregated_activities_length);

    await client.updateApp({
      max_aggregated_activities_length: 20,
    });
    // #endregion snippet

    expect(log.mock.calls[0]).toEqual([original]);
    const response = await (update.mock.results[0].value as ReturnType<
      typeof client.updateApp
    >);
    expect(response.metadata.responseCode).toBe(200);
    vi.restoreAllMocks();
    // The limit is validated ("the maximum is 100")...
    await expect(
      client.updateApp({ max_aggregated_activities_length: 101 }),
    ).rejects.toMatchObject({ code: 4 });
    // ...but (2026-10-16) the accepted value never reads back: getApp keeps
    // returning the original (0), and groups of an aggregated feed still hold
    // more than 20 activities.
    expect((await client.getApp()).app.max_aggregated_activities_length).toBe(
      original,
    );
  });
});
