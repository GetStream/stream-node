import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  UpdateFeedMembersResponse,
  UpdateFeedVisibilityResponse,
  UpdateFollowResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerUser, waitForAppSetting } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'platform/02-identity-and-access/03-permissions.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const roleNames = async () =>
    (await client.listRoles()).roles.map((role) => role.name);

  /** A new user, registered for cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A new feed owned by `ownerId`, hard-deleted in cleanup (the leak check doesn't track feeds). */
  const createFeed = async (group: string, ownerId: string) => {
    const id = uniqueId(`${group}-feed`);
    const feed = client.feeds.feed(group, id);
    await feed.getOrCreate({ user_id: ownerId });
    cleanup.add(() => feed.delete({ hard_delete: true }));
    return id;
  };

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Role Management', async () => {
    const specialAgent = uniqueId('special-agent');
    await client.createRole({ name: specialAgent });
    const jamesBond = await createUser('james-bond');
    // The role can only be deleted once no user has it: reset the user's role first.
    cleanup.add(async () => {
      await client.updateUsersPartial({
        users: [{ id: jamesBond, set: { role: 'user' } }],
      });
      await retry(() => client.deleteRole({ name: specialAgent }), {
        timeout: 30000,
        interval: 2000,
      });
    });
    // A new role takes a moment to reach every API node ("role ... provided but not
    // defined"): retry the snippet's call until it is known.
    const updateUsersPartial = client.updateUsersPartial.bind(client);
    vi.spyOn(client, 'updateUsersPartial').mockImplementation((request) =>
      retry(() => updateUsersPartial(request), {
        timeout: 30000,
        interval: 1000,
        retryIf: (error) =>
          error instanceof Error &&
          error.message.includes('provided but not defined'),
      }),
    );

    // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Role Management" tab="Node.js" index=1
    // COPY: jamesBond="james_bond", specialAgent="special_agent"
    await client.updateUsersPartial({
      users: [
        {
          id: jamesBond,
          set: { role: specialAgent },
        },
      ],
    });
    // #endregion snippet

    expect((await getServerUser(client, jamesBond)).role).toBe(specialAgent);
  });

  describe('Feeds member and follower roles', () => {
    it('adds a feed member with a role', async () => {
      const ownerId = await createUser('owner');
      const jamesBond = await createUser('james-bond');
      const communityId = await createFeed('user', ownerId);
      const updateFeedMembers = vi.spyOn(client.feeds, 'updateFeedMembers');

      // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Feeds member and follower roles" tab="Node.js" index=1
      // COPY: communityId="community_id", jamesBond="james_bond"
      await client.feeds.feed('user', communityId).updateFeedMembers({
        operation: 'upsert',
        members: [{ user_id: jamesBond, role: 'feed_moderator' }],
      });
      // #endregion snippet

      const response = await (updateFeedMembers.mock.results[0]
        .value as Promise<UpdateFeedMembersResponse>);
      expect(response.added).toHaveLength(1);
      expect(response.added[0]).toMatchObject({
        role: 'feed_moderator',
        user: { id: jamesBond },
      });
      const { members } = await client.feeds
        .feed('user', communityId)
        .queryFeedMembers({});
      expect(
        members.map((member) => [member.user.id, member.role]),
      ).toContainEqual([jamesBond, 'feed_moderator']);
    });

    it('updates the role of a follower', async () => {
      const followerId = await createUser('follower');
      const targetOwnerId = await createUser('target-owner');
      const sourceFeedId = await createFeed('timeline', followerId);
      const targetFeedId = await createFeed('user', targetOwnerId);
      const follow = await client.feeds.follow({
        source: `timeline:${sourceFeedId}`,
        target: `user:${targetFeedId}`,
      });
      expect(follow.follow.follower_role).toBe('feed_follower');
      const updateFollow = vi.spyOn(client.feeds, 'updateFollow');

      // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Feeds member and follower roles" tab="Node.js" index=2
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

      const response = await (updateFollow.mock.results[0]
        .value as Promise<UpdateFollowResponse>);
      expect(response.follow).toMatchObject({
        follower_role: 'feed_member_viewer',
        push_preference: 'none',
        custom: { note: 'Updated follow' },
      });
    });
  });

  describe('Custom Roles', () => {
    it('creates a role', async () => {
      const specialAgent = uniqueId('special-agent');
      cleanup.add(() =>
        retry(() => client.deleteRole({ name: specialAgent }), {
          timeout: 30000,
          interval: 2000,
        }),
      );

      // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Custom Roles" tab="Node.js" index=1
      // COPY: specialAgent="special_agent"
      await client.createRole({
        name: specialAgent,
      });
      // #endregion snippet

      expect(await roleNames()).toContain(specialAgent);
    });

    it('deletes a role', async () => {
      const agent006 = uniqueId('agent-006');
      await client.createRole({ name: agent006 });
      expect(await roleNames()).toContain(agent006);

      // The new role takes a moment to reach every API node (`role "..." does not
      // exist`): retry the snippet's call until it is known.
      const deleteRole = client.deleteRole.bind(client);
      vi.spyOn(client, 'deleteRole').mockImplementation((request) =>
        retry(() => deleteRole(request), {
          timeout: 30000,
          interval: 1000,
          retryIf: (error) =>
            error instanceof Error && error.message.includes('does not exist'),
        }),
      );

      // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Custom Roles" tab="Node.js" index=2
      // COPY: agent006="agent_006"
      await client.deleteRole({
        name: agent006,
      });
      // #endregion snippet

      expect(await roleNames()).not.toContain(agent006);
    });
  });

  describe('Granting permissions', () => {
    it('lists permissions', async () => {
      // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Granting permissions" tab="Node.js" index=1
      const { permissions } = await client.listPermissions(); // List of Permission objects
      // #endregion snippet

      expect(permissions.length).toBeGreaterThan(0);
      const permission = permissions.find(
        (p) => p.id === 'create-message-owner',
      );
      expect(permission).toMatchObject({
        action: 'CreateMessage',
        owner: true,
      });
      expect(typeof permission?.name).toBe('string');
      expect(typeof permission?.description).toBe('string');
      expect(typeof permission?.same_team).toBe('boolean');
    });

    it('updates grants of the .app scope', async () => {
      const roles = ['anonymous', 'guest', 'user', 'admin'];
      const { app } = await client.getApp();
      const original = app.grants;
      cleanup.add(async () => {
        await client.updateApp({
          grants: Object.fromEntries(
            roles.map((role) => [role, original[role] ?? []]),
          ),
        });
        await waitForAppSetting(client, 'grants', original);
      });
      // Make sure the snippet changes something.
      expect(original.user).toContain('flag-user');
      expect(original.guest.length).toBeGreaterThan(0);

      // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Granting permissions" tab="Node.js" index=2
      await client.updateApp({
        grants: {
          anonymous: [],
          guest: [],
          user: ['search-user', 'mute-user'],
          admin: ['search-user', 'mute-user', 'ban-user'],
        },
      });
      // #endregion snippet

      const { app: updated } = await client.getApp();
      expect(updated.grants.anonymous ?? []).toEqual([]);
      expect(updated.grants.guest ?? []).toEqual([]);
      expect([...updated.grants.user].sort()).toEqual([
        'mute-user',
        'search-user',
      ]);
      expect([...updated.grants.admin].sort()).toEqual([
        'ban-user',
        'mute-user',
        'search-user',
      ]);
      // Only the roles in the request changed.
      expect(updated.grants.moderator).toEqual(original.moderator);
    });
  });

  it('Feeds visibility grants', async () => {
    // Feed visibilities are app-wide and not covered by the DRIFT check: restore the
    // original feed_member grants of "visible" and check they are back.
    const original = (await client.feeds.getFeedVisibility({ name: 'visible' }))
      .feed_visibility.grants;
    cleanup.add(async () => {
      await client.feeds.updateFeedVisibility({
        name: 'visible',
        grants: { feed_member: original.feed_member },
      });
      await retry(async () => {
        const { feed_visibility } = await client.feeds.getFeedVisibility({
          name: 'visible',
        });
        expect(feed_visibility.grants).toEqual(original);
      });
    });
    const memberGrants = [
      'read-feed',
      'add-activities',
      'update-activities-owner',
      'delete-activities-owner',
    ];
    expect([...original.feed_member].sort()).not.toEqual(
      [...memberGrants].sort(),
    );
    const updateFeedVisibility = vi.spyOn(client.feeds, 'updateFeedVisibility');

    // #region snippet docs="platform/02-identity-and-access/03-permissions.md" heading="Feeds visibility grants" tab="Node.js" index=1
    // Get current grants for a feed visibility
    const response = await client.feeds.getFeedVisibility({ name: 'visible' });

    // Update "feed_member" role grants for this feed visibility
    await client.feeds.updateFeedVisibility({
      name: 'visible',
      grants: {
        feed_member: [
          'read-feed',
          'add-activities',
          'update-activities-owner',
          'delete-activities-owner',
        ],
      },
    });
    // #endregion snippet

    expect(response.feed_visibility.grants).toEqual(original);
    const updated = await (updateFeedVisibility.mock.results[0]
      .value as Promise<UpdateFeedVisibilityResponse>);
    expect([...updated.feed_visibility.grants.feed_member].sort()).toEqual(
      [...memberGrants].sort(),
    );
    // Only the role in the request changed.
    expect(updated.feed_visibility.grants.feed_follower).toEqual(
      original.feed_follower,
    );
  });
});
