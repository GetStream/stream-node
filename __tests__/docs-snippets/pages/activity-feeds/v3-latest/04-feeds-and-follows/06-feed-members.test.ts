import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  AcceptFeedMemberInviteResponse,
  FeedMemberResponse,
  QueryFeedMembersResponse,
  RejectFeedMemberInviteResponse,
  UpdateFeedMembersResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS =
  'activity-feeds/v3-latest/_default/04-feeds-and-follows/06-feed-members.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

/** `uniqueId` users, registered for cleanup. */
const createUsers = async (...names: string[]) => {
  const ids = names.map((name) => uniqueId(name));
  cleanup.users.push(...ids);
  await client.upsertUsers(ids.map((id) => ({ id })));
  return ids;
};

/** A `user` feed owned by a new `uniqueId` user, registered for cleanup. */
const createFeed = async () => {
  const [ownerId] = await createUsers('owner');
  const feed = client.feeds.feed('user', ownerId);
  cleanup.feeds.push(feed.feed);
  await feed.getOrCreate({ user_id: ownerId });
  return feed;
};

const summary = (members: FeedMemberResponse[]) =>
  members
    .map((m) => ({ user: m.user.id, role: m.role, status: m.status }))
    .sort((a, b) => a.user.localeCompare(b.user));

describe(DOCS, () => {
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('manages members', async () => {
    const feed = await createFeed();
    const [johnId, janeId] = await createUsers('john', 'jane');
    const update = vi.spyOn(client.feeds, 'updateFeedMembers');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/06-feed-members.md" heading="Manage members" tab="Node.js" index=1
    // COPY: johnId="john", janeId="jane"
    // The following methods are available to add or edit the members of a feed
    await feed.updateFeedMembers({
      operation: 'upsert',
      members: [
        {
          user_id: johnId,
          role: 'feed_moderator',
          custom: {
            joined: '2024-01-01',
          },
        },
      ],
    });

    // Remove members
    await feed.updateFeedMembers({
      operation: 'remove',
      members: [
        {
          user_id: johnId,
        },
        {
          user_id: janeId,
        },
      ],
    });

    // Set members (overwrites the list)
    await feed.updateFeedMembers({
      operation: 'set',
      members: [
        {
          user_id: johnId,
          role: 'feed_moderator',
        },
      ],
    });
    // #endregion snippet

    const [upserted, removed, set] = await Promise.all(
      update.mock.results.map(
        (r) => r.value as Promise<UpdateFeedMembersResponse>,
      ),
    );
    expect(upserted.added).toMatchObject([
      {
        user: { id: johnId },
        role: 'feed_moderator',
        custom: { joined: '2024-01-01' },
        status: 'member',
      },
    ]);
    // Jane isn't a member: removing her is a no-op.
    expect(removed.removed_ids).toEqual([johnId]);
    expect(set.added.map((m) => m.user.id)).toEqual([johnId]);

    const { members } = await feed.queryFeedMembers({});
    expect(summary(members)).toEqual([
      { user: johnId, role: 'feed_moderator', status: 'member' },
    ]);
  });

  it('invites members', async () => {
    const feed = await createFeed();
    const [johnId, janeId] = await createUsers('john', 'jane');
    const accept = vi.spyOn(client.feeds, 'acceptFeedMemberInvite');
    const reject = vi.spyOn(client.feeds, 'rejectFeedMemberInvite');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/06-feed-members.md" heading="Member invites" tab="Node.js" index=1
    // COPY: johnId="john", janeId="jane"
    await feed.updateFeedMembers({
      operation: 'upsert',
      members: [
        {
          user_id: johnId,
          role: 'feed_moderator',
          invite: true,
          custom: {
            reason: 'community builder',
          },
        },
        {
          user_id: janeId,
          invite: true,
        },
      ],
    });

    await feed.acceptFeedMemberInvite({
      user_id: johnId,
    });

    await feed.rejectFeedMemberInvite({
      user_id: janeId,
    });
    // #endregion snippet

    const { member: accepted } = await (accept.mock.results[0]
      .value as Promise<AcceptFeedMemberInviteResponse>);
    expect(accepted).toMatchObject({
      user: { id: johnId },
      role: 'feed_moderator',
      status: 'member',
      custom: { reason: 'community builder' },
    });
    const { member: rejected } = await (reject.mock.results[0]
      .value as Promise<RejectFeedMemberInviteResponse>);
    expect(rejected).toMatchObject({
      user: { id: janeId },
      status: 'rejected',
    });

    // The rejected row stays; only accepted members are returned by default.
    const all = await feed.queryFeedMembers({
      filter: { status: { $in: ['member', 'pending', 'rejected'] } },
    });
    expect(summary(all.members).map((m) => [m.user, m.status])).toEqual(
      [
        [johnId, 'member'],
        [janeId, 'rejected'],
      ].sort((a, b) => a[0].localeCompare(b[0])),
    );
    const acceptedOnly = await feed.queryFeedMembers({});
    expect(acceptedOnly.members.map((m) => m.user.id)).toEqual([johnId]);
  });

  it('queries feed members', async () => {
    const feed = await createFeed();
    const [moderatorId, feedModeratorId] = await createUsers(
      'moderator',
      'feed-moderator',
    );
    await feed.updateFeedMembers({
      operation: 'upsert',
      members: [
        { user_id: moderatorId, role: 'moderator' },
        { user_id: feedModeratorId, role: 'feed_moderator' },
      ],
    });
    const query = vi.spyOn(client.feeds, 'queryFeedMembers');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/06-feed-members.md" heading="Query Feed Members" tab="Node.js" index=1
    await feed.queryFeedMembers({
      filter: {
        role: 'moderator',
      },
    });
    // #endregion snippet

    const { members } = await (query.mock.results[0]
      .value as Promise<QueryFeedMembersResponse>);
    expect(members.map((m) => m.user.id)).toEqual([moderatorId]);
  });
});
