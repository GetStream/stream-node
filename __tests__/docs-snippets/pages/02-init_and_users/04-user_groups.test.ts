import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { waitForAppSetting, waitForTeamIdSupport } from '../../helpers/server';

const DOCS = '_default/02-init_and_users/04-user_groups.md';

const isNotFound = (error: unknown) =>
  error instanceof Error && /not.?found|404/i.test(error.message);

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const alice = uniqueId('alice');
  const bob = uniqueId('bob');
  const charlie = uniqueId('charlie');
  const dave = uniqueId('dave');
  const eve = uniqueId('eve');
  const frank = uniqueId('frank');
  const grace = uniqueId('grace');
  const userIds = [alice, bob, charlie, dave, eve, frank, grace];

  /** The group the "design-team" snippets without team_id act on. */
  const groupId = uniqueId('design-team');
  const groupName = uniqueId('design');

  /** Registers the deletion of a user group, ignoring "not found" (a snippet may have deleted it). */
  const registerGroup = (id: string, team_id?: string) =>
    cleanup.add(async () => {
      try {
        await client.deleteUserGroup({ id, team_id });
      } catch (error) {
        if (!isNotFound(error)) throw error;
      }
    });

  const memberIdsOf = async (id: string) => {
    const { user_group } = await client.getUserGroup({ id });
    return (user_group?.members ?? []).map((m) => m.user_id).sort();
  };

  beforeAll(async () => {
    cleanup.users.push(...userIds);
    await client.upsertUsers(userIds.map((id) => ({ id })));
    registerGroup(groupId);
    await client.createUserGroup({ id: groupId, name: groupName });
  });

  afterAll(() => cleanup.run());

  it('creates a user group', async () => {
    const designTeamName = uniqueId('design-team-name');

    // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Creating a User Group" tab="Node.js" index=1
    // COPY: designTeamName="Design Team", alice="alice", bob="bob", charlie="charlie"
    const { user_group } = await client.createUserGroup({
      name: designTeamName,
      description: 'Product design team members',
      member_ids: [alice, bob, charlie],
    });
    // #endregion snippet

    expect(user_group).toBeDefined();
    if (!user_group) return;
    registerGroup(user_group.id);
    expect(user_group.name).toBe(designTeamName);
    expect(user_group.description).toBe('Product design team members');
    expect(await memberIdsOf(user_group.id)).toEqual(
      [alice, bob, charlie].sort(),
    );
  });

  it('updates a user group', async () => {
    const newName = uniqueId('design-product-team');

    // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Updating a User Group" tab="Node.js" index=1
    // COPY: groupId="design-team", newName="Design & Product Team"
    const { user_group } = await client.updateUserGroup({
      id: groupId,
      name: newName,
      description: 'Product and design team members',
    });
    // #endregion snippet

    expect(user_group?.name).toBe(newName);
    expect(user_group?.description).toBe('Product and design team members');
  });

  it('adds members to a user group', async () => {
    // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Adding Members" tab="Node.js" index=1
    // COPY: groupId="design-team", dave="dave", eve="eve", frank="frank", grace="grace"
    // Add members as regular members
    const { user_group } = await client.addUserGroupMembers({
      id: groupId,
      member_ids: [dave, eve, frank],
    });

    // Add members as group admins
    const { user_group: admins } = await client.addUserGroupMembers({
      id: groupId,
      member_ids: [grace],
      as_admin: true,
    });

    // Promote an existing member to admin
    await client.addUserGroupMembers({
      id: groupId,
      member_ids: [dave],
      as_admin: true,
    });

    // Demote an admin back to regular member
    await client.addUserGroupMembers({
      id: groupId,
      member_ids: [dave],
      as_admin: false,
    });
    // #endregion snippet

    expect(user_group?.id).toBe(groupId);
    expect(admins?.id).toBe(groupId);
    const { user_group: group } = await client.getUserGroup({ id: groupId });
    const isAdmin = Object.fromEntries(
      (group?.members ?? []).map((m) => [m.user_id, m.is_admin]),
    );
    expect(isAdmin).toEqual({
      [dave]: false,
      [eve]: false,
      [frank]: false,
      [grace]: true,
    });
  });

  it('removes members from a user group', async () => {
    await client.addUserGroupMembers({
      id: groupId,
      member_ids: [dave, eve, frank],
    });

    // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Removing Members" tab="Node.js" index=1
    // COPY: groupId="design-team", dave="dave", eve="eve"
    const { user_group } = await client.removeUserGroupMembers({
      id: groupId,
      member_ids: [dave, eve],
    });
    // #endregion snippet

    expect(user_group?.id).toBe(groupId);
    const members = await memberIdsOf(groupId);
    expect(members).toContain(frank);
    expect(members).not.toContain(dave);
    expect(members).not.toContain(eve);
  });

  // The snippets that pass team_id fail without multi-tenancy ("team_id is not supported
  // when multi-tenancy is not enabled"). Enable it for these tests only, on groups of a
  // `uniqueId` team. Cleanup steps run in reverse, so these groups are deleted before
  // multi-tenancy is restored.
  describe('with multi-tenancy', () => {
    const teamId = uniqueId('my-team');
    const teamGroupId = uniqueId('design-team');
    const teamGroupName = uniqueId('design');

    const createTeamGroup = async (id: string, name: string) => {
      registerGroup(id, teamId);
      const { user_group } = await client.createUserGroup({
        id,
        name,
        team_id: teamId,
      });
      expect(user_group?.team_id).toBe(teamId);
    };

    beforeAll(async () => {
      const { app } = await client.getApp();
      const original = app.multi_tenant_enabled;
      cleanup.add(async () => {
        await client.updateApp({ multi_tenant_enabled: original });
        await waitForAppSetting(client, 'multi_tenant_enabled', original);
        await waitForTeamIdSupport(client, teamId, original);
      });
      await client.updateApp({ multi_tenant_enabled: true });
      await waitForAppSetting(client, 'multi_tenant_enabled', true);
      await waitForTeamIdSupport(client, teamId, true);
      await createTeamGroup(teamGroupId, teamGroupName);
    });

    it('retrieves a user group', async () => {
      // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Retrieving a User Group" tab="Node.js" index=1
      // COPY: teamGroupId="design-team", teamId="my-team"
      const { user_group } = await client.getUserGroup({
        id: teamGroupId,
        team_id: teamId, // only with multi-tenancy
      });
      // #endregion snippet

      expect(user_group?.id).toBe(teamGroupId);
      expect(user_group?.name).toBe(teamGroupName);
    });

    it('lists user groups', async () => {
      const lastId = ''; // no cursor: start from the first group

      // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Listing User Groups" tab="Node.js" index=1
      // COPY: lastId="last-id", teamId="my-team"
      const { user_groups } = await client.listUserGroups({
        limit: 20,
        id_gt: lastId, // optional: cursor for pagination
        created_at_gt: '2024-01-01T00:00:00Z', // optional: filter by creation date
        team_id: teamId, // only with multi-tenancy
      });
      // #endregion snippet

      expect(user_groups.map((g) => g.id)).toContain(teamGroupId);
      expect(user_groups.length).toBeLessThanOrEqual(20);
    });

    it('searches user groups', async () => {
      const searchQuery = teamGroupName;
      const nameGt = ''; // no cursors: start from the first match
      const lastId = '';

      // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Searching User Groups" tab="Node.js" index=1
      // COPY: searchQuery="design", nameGt="abc", lastId="last-id", teamId="my-team"
      const { user_groups } = await client.searchUserGroups({
        query: searchQuery, // prefix search on group name
        limit: 10,
        name_gt: nameGt, // optional: cursor for pagination by name
        id_gt: lastId, // optional: cursor for pagination by ID
        team_id: teamId, // only with multi-tenancy
      });
      // #endregion snippet

      expect(user_groups.map((g) => g.id)).toContain(teamGroupId);
    });

    it('deletes a user group', async () => {
      const groupToDelete = uniqueId('design-team');
      await createTeamGroup(groupToDelete, uniqueId('design'));

      // #region snippet docs="_default/02-init_and_users/04-user_groups.md" heading="Deleting a User Group" tab="Node.js" index=1
      // COPY: groupToDelete="design-team", teamId="my-team"
      await client.deleteUserGroup({
        id: groupToDelete,
        team_id: teamId, // only with multi-tenancy
      });
      // #endregion snippet

      await expect(
        client.getUserGroup({ id: groupToDelete, team_id: teamId }),
      ).rejects.toThrow();
    });
  });
});
