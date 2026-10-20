import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  AcceptFollowResponse,
  FollowResponse,
  RejectFollowResponse,
  UnfollowBatchResponse,
  UpdateFollowResponse,
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
  'activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

/** `uniqueId` users, registered for cleanup. */
const createUsers = async (...names: string[]) => {
  const ids = names.map((name) => uniqueId(name));
  cleanup.users.push(...ids);
  await client.upsertUsers(ids.map((id) => ({ id })));
  return ids;
};

/** Creates `group:id` owned by `userId` and registers it for cleanup. */
const createFeed = async (group: string, id: string, userId: string) => {
  cleanup.feeds.push(`${group}:${id}`);
  const feed = client.feeds.feed(group, id);
  await retry(() => feed.getOrCreate({ user_id: userId }), {
    retryIf: isFeedGroupMissing,
  });
  return feed;
};

const followsFrom = async (source: string) =>
  (
    await client.feeds.queryFollows({
      filter: { source_feed: source },
      limit: 20,
    })
  ).follows;

const targets = (follows: FollowResponse[]) =>
  follows.map((f) => f.target_feed.feed).sort();

describe(DOCS, () => {
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('follows a user and a stock', async () => {
    const [johnId, tomId] = await createUsers('john', 'tom');
    const stockGroup = uniqueId('stock');
    cleanup.feedGroups.push(stockGroup);
    await client.feeds.createFeedGroup({ id: stockGroup });
    const tomFid = `user:${tomId}`;
    await createFeed('user', tomId, tomId);
    const stockFid = `${stockGroup}:${uniqueId('apple')}`;
    await createFeed(stockGroup, stockFid.split(':')[1], tomId);
    const otherStockFid = `${stockGroup}:${uniqueId('google')}`;
    await createFeed(stockGroup, otherStockFid.split(':')[1], tomId);
    cleanup.feeds.push(`timeline:${johnId}`);
    retryOnFeedGroupMissing(client, ['follow']);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Follow" tab="Node.js" index=1
    // COPY: johnId="john", tomFid="user:tom", stockFid="stock:apple", otherStockFid="stock:google"
    const timeline = client.feeds.feed('timeline', johnId);
    await timeline.getOrCreate({
      user_id: johnId,
    });

    // Follow a user
    await client.feeds.follow({
      source: timeline.feed,
      target: tomFid,
    });

    // Follow a stock
    await client.feeds.follow({
      source: timeline.feed,
      target: stockFid,
    });

    // Follow with more fields
    await client.feeds.follow({
      source: timeline.feed,
      target: otherStockFid,
      push_preference: 'all',
      custom: {
        reason: 'investment',
      },
    });
    // #endregion snippet

    const follows = await followsFrom(timeline.feed);
    expect(targets(follows)).toEqual([otherStockFid, stockFid, tomFid].sort());
    expect(
      follows.find((f) => f.target_feed.feed === otherStockFid),
    ).toMatchObject({
      push_preference: 'all',
      custom: { reason: 'investment' },
    });
  });

  it('auto-creates users on follow', async () => {
    const aliceId = uniqueId('alice');
    const bobId = uniqueId('bob');
    cleanup.users.push(aliceId, bobId);
    const aliceTimelineFid = `timeline:${aliceId}`;
    const bobFid = `user:${bobId}`;
    cleanup.feeds.push(aliceTimelineFid, bobFid);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Auto-creating users" tab="Node.js" index=1
    // COPY: aliceTimelineFid="timeline:alice", bobFid="user:bob"
    await client.feeds.follow({
      source: aliceTimelineFid,
      target: bobFid,
      create_users: true,
    });
    // #endregion snippet

    const { users } = await client.queryUsers({
      payload: { filter_conditions: { id: { $in: [aliceId, bobId] } } },
    });
    expect(users.map((u) => u.id).sort()).toEqual([aliceId, bobId].sort());
    expect(targets(await followsFrom(aliceTimelineFid))).toEqual([bobFid]);
  });

  it('auto-creates users on batch follows', async () => {
    const aliceId = uniqueId('alice');
    const bobId = uniqueId('bob');
    const charlieId = uniqueId('charlie');
    cleanup.users.push(aliceId, bobId, charlieId);
    const aliceTimelineFid = `timeline:${aliceId}`;
    const bobFid = `user:${bobId}`;
    const charlieFid = `user:${charlieId}`;
    cleanup.feeds.push(aliceTimelineFid, bobFid, charlieFid);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Auto-creating users" tab="Node.js" index=2
    // COPY: aliceTimelineFid="timeline:alice", bobFid="user:bob", charlieFid="user:charlie"
    await client.feeds.getOrCreateFollows({
      create_users: true,
      follows: [
        { source: aliceTimelineFid, target: bobFid },
        { source: aliceTimelineFid, target: charlieFid },
      ],
    });
    // #endregion snippet

    const { users } = await client.queryUsers({
      payload: {
        filter_conditions: { id: { $in: [aliceId, bobId, charlieId] } },
      },
    });
    expect(users.map((u) => u.id).sort()).toEqual(
      [aliceId, bobId, charlieId].sort(),
    );
    expect(targets(await followsFrom(aliceTimelineFid))).toEqual(
      [bobFid, charlieFid].sort(),
    );
  });

  it('unfollows a feed', async () => {
    const [johnId, tomId] = await createUsers('john', 'tom');
    const timeline = await createFeed('timeline', johnId, johnId);
    const tomFid = `user:${tomId}`;
    await createFeed('user', tomId, tomId);
    await client.feeds.follow({ source: timeline.feed, target: tomFid });
    expect(targets(await followsFrom(timeline.feed))).toEqual([tomFid]);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Unfollow" tab="Node.js" index=1
    // COPY: tomFid="user:tom"
    await client.feeds.unfollow({
      source: timeline.feed,
      target: tomFid,
    });
    // #endregion snippet

    expect(await followsFrom(timeline.feed)).toEqual([]);
  });

  it('updates a follow', async () => {
    const [sourceFeedId, targetFeedId] = await createUsers('source', 'target');
    await createFeed('timeline', sourceFeedId, sourceFeedId);
    await createFeed('user', targetFeedId, targetFeedId);
    await client.feeds.follow({
      source: `timeline:${sourceFeedId}`,
      target: `user:${targetFeedId}`,
      push_preference: 'all',
    });
    const updateFollow = vi.spyOn(client.feeds, 'updateFollow');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Update follow" tab="Node.js" index=1
    await client.feeds.updateFollow({
      source: `timeline:${sourceFeedId}`,
      target: `user:${targetFeedId}`,
      push_preference: 'none',
      follower_role: 'feed_member_viewer',
      custom: {
        note: 'Updated follow',
      },
    });
    // #endregion snippet

    const { follow } = await (updateFollow.mock.results[0]
      .value as Promise<UpdateFollowResponse>);
    expect(follow).toMatchObject({
      push_preference: 'none',
      follower_role: 'feed_member_viewer',
      custom: { note: 'Updated follow' },
    });
  });

  it('queries follows', async () => {
    const [johnId, saraId, adamId, followerId] = await createUsers(
      'john',
      'sara',
      'adam',
      'follower',
    );
    const saraFid = `user:${saraId}`;
    const adamFid = `user:${adamId}`;
    await createFeed('user', saraId, saraId);
    await createFeed('user', adamId, adamId);
    const follower = await createFeed('timeline', followerId, followerId);
    cleanup.feeds.push(`timeline:${johnId}`, `user:${johnId}`);
    await client.feeds.follow({
      source: `timeline:${johnId}`,
      target: saraFid,
    });
    await client.feeds.follow({
      source: follower.feed,
      target: `user:${johnId}`,
    });
    const queryFollows = vi.spyOn(client.feeds, 'queryFollows');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Querying Follows" tab="Node.js" index=1
    // COPY: johnId="john", saraFid="user:sara", adamFid="user:adam"
    const myTimeline = client.feeds.feed('timeline', johnId);
    await myTimeline.getOrCreate({
      user_id: johnId,
    });
    // Do I follow a list of feeds
    const response = await client.feeds.queryFollows({
      filter: {
        source_feed: myTimeline.feed,
        target_feed: { $in: [saraFid, adamFid] },
      },
    });

    console.log(response.follows);

    const userFeed = client.feeds.feed('user', johnId);
    await userFeed.getOrCreate({
      user_id: johnId,
    });

    // Paginating through followers for a feed
    const firstPage = await client.feeds.queryFollows({
      filter: { target_feed: userFeed.feed },
      limit: 20,
    });

    // Next page
    const secondPage = await client.feeds.queryFollows({
      filter: { target_feed: userFeed.feed },
      limit: 20,
      next: firstPage.next,
    });

    // Filter by source - feeds that I follow
    await client.feeds.queryFollows({
      filter: { source_feed: myTimeline.feed },
      limit: 20,
    });
    // #endregion snippet

    expect(targets(response.follows)).toEqual([saraFid]);
    expect(log.mock.calls[0]).toEqual([response.follows]);
    expect(firstPage.follows.map((f) => f.source_feed.feed)).toEqual([
      follower.feed,
    ]);
    expect(firstPage.next).toBeUndefined();
    expect(secondPage.follows.map((f) => f.source_feed.feed)).toEqual([
      follower.feed,
    ]);
    const bySource = await (queryFollows.mock.results[3].value as ReturnType<
      typeof client.feeds.queryFollows
    >);
    expect(targets(bySource.follows)).toEqual([saraFid]);
  });

  it('sends, accepts and rejects a follow request', async () => {
    const [saraId, adamId] = await createUsers('sara', 'adam');
    const uuidv4 = () => uniqueId('feed');
    const acceptFollow = vi.spyOn(client.feeds, 'acceptFollow');
    const rejectFollow = vi.spyOn(client.feeds, 'rejectFollow');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Follow Requests" tab="Node.js" index=1
    // COPY: saraId="sara", adamId="adam"
    const saraFeed = client.feeds.feed('user', uuidv4());
    await saraFeed.getOrCreate({
      // You need to set followers visibility to have follow requests
      data: { visibility: 'followers' },
      user_id: saraId,
    });

    const adamTimeline = client.feeds.feed('timeline', uuidv4());
    await adamTimeline.getOrCreate({
      user_id: adamId,
    });

    const followRequest = await client.feeds.follow({
      source: adamTimeline.feed,
      target: saraFeed.feed,
    });

    console.log(followRequest.follow.status); // pending

    await client.feeds.acceptFollow({
      source: adamTimeline.feed,
      target: saraFeed.feed,
      // Optionally provide role
      follower_role: 'feed_member_viewer',
    });

    await client.feeds.rejectFollow({
      source: adamTimeline.feed,
      target: saraFeed.feed,
    });
    // #endregion snippet

    cleanup.feeds.push(saraFeed.feed, adamTimeline.feed);
    expect(followRequest.follow.status).toBe('pending');
    expect(log.mock.calls[0]).toEqual(['pending']);
    const accepted = await (acceptFollow.mock.results[0]
      .value as Promise<AcceptFollowResponse>);
    expect(accepted.follow).toMatchObject({
      status: 'accepted',
      follower_role: 'feed_member_viewer',
    });
    const rejected = await (rejectFollow.mock.results[0]
      .value as Promise<RejectFollowResponse>);
    expect(rejected.follow.status).toBe('rejected');
  });

  it('gets follow suggestions', async () => {
    const [johnId] = await createUsers('john');
    cleanup.feeds.push(`user:${johnId}`);
    await createFeed('user', johnId, johnId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Follow Suggestions" tab="Node.js" index=1
    // COPY: johnId="john"
    // Get follow suggestions for a user
    const suggestions = await client.feeds.getFollowSuggestions({
      feed_group_id: 'user',
      limit: 10,
      user_id: johnId,
    });

    console.log('Algorithm used:', suggestions.algorithm_used);
    console.log('Duration:', suggestions.duration);

    suggestions.suggestions.forEach((suggestion) => {
      console.log('Suggested feed:', suggestion.feed);
      console.log('Name:', suggestion.name);
      console.log('Description:', suggestion.description);
      console.log('Follower count:', suggestion.follower_count);
      console.log('Recommendation score:', suggestion.recommendation_score);
      console.log('Reason:', suggestion.reason);
      console.log('Algorithm scores:', suggestion.algorithm_scores);
    });
    // #endregion snippet

    expect(suggestions.suggestions.length).toBeLessThanOrEqual(10);
    expect(
      suggestions.suggestions.every((s) => s.feed.startsWith('user:')),
    ).toBe(true);
    expect(log.mock.calls).toHaveLength(2 + 7 * suggestions.suggestions.length);
  });

  it('follows and unfollows idempotently', async () => {
    const [aliceId, bobId] = await createUsers('alice', 'bob');
    const aliceTimelineFid = `timeline:${aliceId}`;
    const bobFid = `user:${bobId}`;
    await createFeed('timeline', aliceId, aliceId);
    await createFeed('user', bobId, bobId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Idempotent follow & unfollow" tab="Node.js" index=1
    // COPY: aliceTimelineFid="timeline:alice", bobFid="user:bob"
    // Idempotent follow: returns the existing follow if one exists, otherwise creates it.
    const { follow, created } = await client.feeds.getOrCreateFollow({
      source: aliceTimelineFid,
      target: bobFid,
    });
    console.log(created ? 'newly created' : 'already existed', follow);

    // Idempotent unfollow: no error if the follow does not exist.
    const { follow: removed, deleted } = await client.feeds.getOrCreateUnfollow(
      {
        source: aliceTimelineFid,
        target: bobFid,
      },
    );
    console.log(deleted ? 'removed' : 'was not following', removed);
    // #endregion snippet

    expect(created).toBe(true);
    expect(follow.target_feed.feed).toBe(bobFid);
    expect(deleted).toBe(true);
    expect(removed?.target_feed.feed).toBe(bobFid);
    expect(log.mock.calls.map((c) => c[0] as string)).toEqual([
      'newly created',
      'removed',
    ]);
    expect(await followsFrom(aliceTimelineFid)).toEqual([]);

    // Calling both again doesn't fail and reports no change.
    const again = await client.feeds.getOrCreateUnfollow({
      source: aliceTimelineFid,
      target: bobFid,
    });
    expect(again.deleted).toBe(false);
  });

  it('batch follows and unfollows', async () => {
    const [timelineId, feedId, feed2Id] = await createUsers(
      'timeline',
      'feed',
      'feed2',
    );
    const timeline = await createFeed('timeline', timelineId, timelineId);
    const feed = await createFeed('user', feedId, feedId);
    const feed2 = await createFeed('user', feed2Id, feed2Id);
    const getOrCreateUnfollows = vi.spyOn(client.feeds, 'getOrCreateUnfollows');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/04-follows.md" heading="Batch follow & unfollow" tab="Node.js" index=1
    const response = await client.feeds.getOrCreateFollows({
      follows: [
        {
          source: timeline.feed,
          target: feed.feed,
          // Optional
          push_preference: 'all',
          custom: {
            reason: 'investment',
          },
        },
        {
          source: timeline.feed,
          target: feed2.feed,
        },
      ],
    });

    console.log('Created follows:', response.created);
    console.log('Follows:', response.follows);

    await client.feeds.getOrCreateUnfollows({
      follows: [
        {
          source: timeline.feed,
          target: feed.feed,
        },
      ],
    });

    console.log('Follows that were removed:', response.follows);
    // #endregion snippet

    expect(targets(response.created)).toEqual([feed.feed, feed2.feed].sort());
    const unfollowed = await (getOrCreateUnfollows.mock.results[0]
      .value as Promise<UnfollowBatchResponse>);
    expect(targets(unfollowed.follows)).toEqual([feed.feed]);
    expect(log.mock.calls).toHaveLength(3);
    expect(targets(await followsFrom(timeline.feed))).toEqual([feed2.feed]);
  });
});
