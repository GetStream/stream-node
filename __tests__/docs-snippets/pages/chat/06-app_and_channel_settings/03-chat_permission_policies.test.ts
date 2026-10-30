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
  UpdateChannelResponse,
  UpdateChannelTypeResponse,
} from '../../../../../index';
import { updateChannelType } from '../../../helpers/channel-types';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  getServerMember,
  getServerUser,
  waitForAppSetting,
} from '../../../helpers/server';
import { retry, waitForChannelTypePropagation } from '../../../helpers/wait';

const DOCS =
  'chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The docs change the built-in "messaging" type: use a uniqueId type instead.
  const channelType = uniqueId('messaging');
  let defaultGrants: Record<string, string[]> = {};

  const roleNames = async () =>
    (await client.listRoles()).roles.map((role) => role.name);

  /** A new `messaging` channel with no members, registered for cleanup. */
  const createChannel = async (creatorId: string) => {
    const id = uniqueId('channel');
    cleanup.channels.push(`messaging:${id}`);
    const channel = client.chat.channel('messaging', id);
    await channel.getOrCreate({ data: { created_by_id: creatorId } });
    return channel;
  };

  /** A new user, registered for cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  beforeAll(async () => {
    await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(channelType);
    await waitForChannelTypePropagation();
    defaultGrants = (await client.chat.getChannelType({ name: channelType }))
      .grants;
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  describe('Role Management', () => {
    it('changes the role of a user', async () => {
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

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Role Management" tab="Node.js" index=1
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

    it('assigns channel_member to a new member', async () => {
      const jamesBond = await createUser('james-bond');
      const channel = await createChannel(jamesBond);
      const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Role Management" tab="Node.js" index=2
      // COPY: jamesBond="james_bond"
      const result = await channel.update({
        add_members: [{ user_id: jamesBond }],
      });
      console.log(result.members[0].channel_role); // "channel_member"
      // #endregion snippet

      expect(result.members.map((member) => member.user_id)).toEqual([
        jamesBond,
      ]);
      expect(log.mock.calls).toEqual([['channel_member']]);
    });

    it('adds a member with a role and assigns a new one', async () => {
      const jamesBond = await createUser('james-bond');
      const channel = await createChannel(jamesBond);
      const updateChannel = vi.spyOn(client.chat, 'updateChannel');

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Role Management" tab="Node.js" index=3
      // COPY: jamesBond="james_bond"
      // Add user to the channel with role set
      await channel.update({
        add_members: [
          { user_id: jamesBond, channel_role: 'channel_moderator' },
        ],
      });

      // Assign new channel member role
      await channel.update({
        assign_roles: [{ user_id: jamesBond, channel_role: 'channel_member' }],
      });
      // #endregion snippet

      const [added, assigned] = await Promise.all(
        updateChannel.mock.results.map(
          (r) => r.value as Promise<UpdateChannelResponse>,
        ),
      );
      expect(added.members[0]).toMatchObject({
        user_id: jamesBond,
        channel_role: 'channel_moderator',
      });
      expect(assigned.members[0]).toMatchObject({
        user_id: jamesBond,
        channel_role: 'channel_member',
      });
      expect(
        (await getServerMember(client, channel.cid, jamesBond)).channel_role,
      ).toBe('channel_member');
    });
  });

  describe('Custom Roles', () => {
    it('creates a role', async () => {
      const specialAgent = uniqueId('special-agent');
      cleanup.add(() => client.deleteRole({ name: specialAgent }));

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Custom Roles" tab="Node.js" index=1
      // COPY: specialAgent="special_agent"
      await client.createRole({ name: specialAgent });
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

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Custom Roles" tab="Node.js" index=2
      // COPY: agent006="agent_006"
      await client.deleteRole({ name: agent006 });
      // #endregion snippet

      expect(await roleNames()).not.toContain(agent006);
    });
  });

  describe('Granting permissions', () => {
    it('lists permissions', async () => {
      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Granting permissions" tab="Node.js" index=1
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

    it('updates channel_member grants of a channel type', async () => {
      const memberGrants = [
        'read-channel',
        'create-message',
        'update-message-owner',
        'delete-message-owner',
      ];
      expect([...(defaultGrants.channel_member ?? [])].sort()).not.toEqual(
        [...memberGrants].sort(),
      );

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Granting permissions" tab="Node.js" index=2
      // COPY: channelType="messaging"
      // observe current grants of the channel type
      const { grants } = await client.chat.getChannelType({
        name: channelType,
      });

      // update "channel_member" role grants in "messaging" scope
      await client.chat.updateChannelType({
        name: channelType,
        grants: {
          channel_member: [
            'read-channel', // allow access to the channel
            'create-message', // create messages in the channel
            'update-message-owner', // update own user messages
            'delete-message-owner', // delete own user messages
          ],
        },
      });
      // #endregion snippet
      await waitForChannelTypePropagation();

      expect(grants).toEqual(defaultGrants);
      const updated = await client.chat.getChannelType({ name: channelType });
      expect([...updated.grants.channel_member].sort()).toEqual(
        [...memberGrants].sort(),
      );
      // Only the role in the request changed.
      expect(updated.grants.channel_moderator).toEqual(
        defaultGrants.channel_moderator,
      );
    }, 90000);

    it('removes all grants of a role', async () => {
      // Give guest and anonymous something to remove (both are empty by default).
      await updateChannelType(client, channelType, {
        grants: { guest: ['read-channel'], anonymous: ['read-channel'] },
      });
      await waitForChannelTypePropagation();
      const before = await client.chat.getChannelType({ name: channelType });
      expect(before.grants.guest).toEqual(['read-channel']);
      expect(before.grants.anonymous).toEqual(['read-channel']);

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Granting permissions" tab="Node.js" index=3
      // COPY: channelType="messaging"
      await client.chat.updateChannelType({
        name: channelType,
        grants: {
          guest: [], // removes all grants of "guest" role
          anonymous: [], // removes all grants of "anonymous" role
        },
      });
      // #endregion snippet
      await waitForChannelTypePropagation();

      const after = await client.chat.getChannelType({ name: channelType });
      expect(after.grants.guest ?? []).toEqual([]);
      expect(after.grants.anonymous ?? []).toEqual([]);
      expect(after.grants.channel_moderator).toEqual(
        defaultGrants.channel_moderator,
      );
    }, 150000);

    it('resets the grants of a scope to the defaults', async () => {
      // The earlier tests changed the channel_member grants.
      const before = await client.chat.getChannelType({ name: channelType });
      expect(before.grants.channel_member).not.toEqual(
        defaultGrants.channel_member,
      );
      const updateChannelType = vi.spyOn(client.chat, 'updateChannelType');

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Granting permissions" tab="Node.js" index=4
      // COPY: channelType="messaging"
      await client.chat.updateChannelType({
        name: channelType,
        grants: null, // resets the whole scope to default settings
      });
      // #endregion snippet
      await waitForChannelTypePropagation();

      // The reset grants are the API's defaults (not the same as a new type's initial
      // grants): compare with the update response.
      const reset = await (updateChannelType.mock.results[0]
        .value as Promise<UpdateChannelTypeResponse>);
      const after = await client.chat.getChannelType({ name: channelType });
      expect(after.grants).toEqual(reset.grants);
      expect(after.grants.channel_member).toContain('read-channel');
      expect(after.grants.channel_member.length).toBeGreaterThan(4);
    }, 90000);

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
      expect(original.user).toContain('flag-user');

      // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Granting permissions" tab="Node.js" index=5
      // update grants of multiple roles in ".app" scope
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

  it('Channel-level permissions', async () => {
    const creatorId = await createUser('creator');
    const channel = await createChannel(creatorId);
    const before = await channel.getOrCreate({});
    expect(before.channel?.config?.grants).toBeUndefined();

    // #region snippet docs="chat/_default/06-app_and_channel_settings/03-chat_permission_policies.md" heading="Channel-level permissions" tab="Node.js" index=1
    await channel.updateChannelPartial({
      set: {
        config_overrides: {
          grants: {
            user: ['!add-links', 'create-reaction'],
          },
        },
      },
    });
    // #endregion snippet

    const after = await channel.getOrCreate({});
    expect(after.channel?.config?.grants).toEqual({
      user: ['!add-links', 'create-reaction'],
    });
  });
});
