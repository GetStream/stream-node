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
  GetOrCreateFeedResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { isFeedGroupMissing } from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/04-feeds-and-follows/03-visibility.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  let userId: string;

  beforeAll(async () => {
    userId = uniqueId('owner');
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a public feed and a feed group with a default visibility', async () => {
    const jackId = uniqueId('jack');
    cleanup.feeds.push(`user:${jackId}`);
    const myGroupId = uniqueId('myid');
    cleanup.feedGroups.push(myGroupId);
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/03-visibility.md" heading="Feed Visibility Levels" tab="Node.js" index=1
    // COPY: jackId="jack", userId="<user id>", myGroupId="myid"
    // More options
    const feed = client.feeds.feed('user', jackId);
    await feed.getOrCreate({
      data: {
        visibility: 'public',
      },
      // The owner of the feed
      user_id: userId,
    });

    const response = await client.feeds.createFeedGroup({
      id: myGroupId,
      default_visibility: 'public',
      // Other settings...
    });
    // #endregion snippet

    const created = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    expect(created.feed).toMatchObject({
      feed: `user:${jackId}`,
      visibility: 'public',
    });
    expect(response.feed_group).toMatchObject({
      id: myGroupId,
      default_visibility: 'public',
    });

    // New feeds of the group start with its default visibility.
    const groupFeedId = uniqueId('groupfeed');
    cleanup.feeds.push(`${myGroupId}:${groupFeedId}`);
    const groupFeed = await retry(
      () =>
        client.feeds
          .feed(myGroupId, groupFeedId)
          .getOrCreate({ user_id: userId }),
      { retryIf: isFeedGroupMissing },
    );
    expect(groupFeed.feed.visibility).toBe('public');
  });

  it('adds an activity with tag visibility', async () => {
    const feedId = uniqueId('feed');
    const user1Fid = `user:${feedId}`;
    cleanup.feeds.push(user1Fid);
    await client.feeds.feed('user', feedId).getOrCreate({ user_id: userId });
    const addActivity = vi.spyOn(client.feeds, 'addActivity');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/03-visibility.md" heading="Activity Visibility Levels" tab="Node.js" index=1
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
      text: 'Premium content',
      visibility: 'tag',
      visibility_tag: 'premium',
    });

    // Users without the tag get a preview, the owner the full activity.
    const viewerId = uniqueId('viewer');
    cleanup.users.push(viewerId);
    await client.upsertUsers([{ id: viewerId }]);
    const [asViewer, asOwner] = await Promise.all(
      [viewerId, userId].map((user_id) =>
        client.feeds.feed('user', feedId).getOrCreate({ user_id }),
      ),
    );
    expect(asViewer.activities.map((a) => a.preview)).toEqual([true]);
    expect(asOwner.activities.map((a) => a.preview)).toEqual([false]);
  });
});
