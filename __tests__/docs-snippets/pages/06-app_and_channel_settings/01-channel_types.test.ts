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
  GetChannelTypeResponse,
  UpdateChannelTypeResponse,
} from '../../../../index';
import { updateChannelType } from '../../helpers/channel-types';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { retry, waitForChannelTypePropagation } from '../../helpers/wait';

const DOCS = '_default/06-app_and_channel_settings/01-channel_types.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The docs change the built-in "agent" type and create "my-channel-type" and
  // "public": use uniqueId types instead, so nothing built-in needs restoring.
  const agentType = uniqueId('agent');
  const myChannelType = uniqueId('my-channel-type');
  const publicType = uniqueId('public');

  /** Reads a channel type until `check` passes (channel type reads are eventually consistent). */
  const waitForChannelType = (
    name: string,
    check: (response: GetChannelTypeResponse) => boolean,
  ) =>
    retry(
      async () => {
        const response = await client.chat.getChannelType({ name });
        if (!check(response)) {
          throw new Error(`channel type ${name} not updated yet`);
        }
        return response;
      },
      { timeout: 60000, interval: 2000 },
    );

  const commandNames = (response: GetChannelTypeResponse) =>
    response.commands.map((command) => command.name).sort();

  /** Makes `createChannelType` register the type for cleanup and wait for propagation. */
  const waitAfterCreate = () => {
    const createChannelType = client.chat.createChannelType.bind(client.chat);
    return vi
      .spyOn(client.chat, 'createChannelType')
      .mockImplementation(async (request) => {
        const response = await createChannelType(request);
        cleanup.channelTypes.push(request.name);
        await waitForChannelTypePropagation();
        return response;
      });
  };

  beforeAll(async () => {
    await client.chat.createChannelType({
      name: agentType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(agentType);
    await waitForChannelTypePropagation();
    // A new type has no guest grants: give it the built-in agent type's ones (read only).
    const agent = await client.chat.getChannelType({ name: 'agent' });
    await updateChannelType(client, agentType, {
      grants: { guest: agent.grants.guest ?? [] },
    });
    await waitForChannelTypePropagation();
    await waitForChannelType(
      agentType,
      (r) => (r.grants.guest ?? []).length > 0,
    );
  }, 180000);

  afterEach(() => vi.restoreAllMocks());

  afterAll(() => cleanup.run());

  it('removes all guest grants of a channel type', async () => {
    const original = await client.chat.getChannelType({ name: agentType });
    expect(original.grants.guest?.length ?? 0).toBeGreaterThan(0);

    const updateSpy = vi.spyOn(client.chat, 'updateChannelType');

    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Restricting guest access" tab="Node.js" index=1
    // COPY: agentType="agent"
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({ name: agentType });

    await client.chat.updateChannelType({
      name: agentType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      grants: {
        guest: [], // guests can no longer create agent channels or act as owners
      },
    });
    // #endregion snippet

    const updated = await (updateSpy.mock.results[0]
      .value as Promise<UpdateChannelTypeResponse>);
    expect(updated.grants.guest ?? []).toEqual([]);
    expect(updated.automod).toBe(original.automod);
    expect(updated.max_message_length).toBe(original.max_message_length);
    // Other roles keep their grants.
    expect(updated.grants.user).toEqual(original.grants.user);

    await waitForChannelTypePropagation();
    const type = await waitForChannelType(
      agentType,
      (r) => (r.grants.guest ?? []).length === 0,
    );
    expect(type.grants.guest ?? []).toEqual([]);
  });

  it('creates and updates a channel type', async () => {
    const createSpy = waitAfterCreate();
    const updateSpy = vi.spyOn(client.chat, 'updateChannelType');

    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Updating or creating a channel type" tab="Node.js" index=1
    // COPY: myChannelType="my-channel-type"
    // Create a new channel type
    await client.chat.createChannelType({
      name: myChannelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
      typing_events: true,
      read_events: true,
      reactions: true,
      replies: true,
    });

    // Update an existing channel type
    await client.chat.updateChannelType({
      name: myChannelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 1000,
      reactions: false,
    });
    // #endregion snippet

    expect(createSpy).toHaveBeenCalledTimes(1);
    const updated = await (updateSpy.mock.results[0]
      .value as Promise<UpdateChannelTypeResponse>);
    expect(updated.max_message_length).toBe(1000);
    expect(updated.reactions).toBe(false);
    // Fields the update doesn't send stay as created.
    expect(updated.typing_events).toBe(true);
    expect(updated.replies).toBe(true);

    await waitForChannelTypePropagation();
    const type = await waitForChannelType(
      myChannelType,
      (r) => r.max_message_length === 1000,
    );
    expect(type.reactions).toBe(false);
  }, 150000);

  it('creates the "public" channel type', async () => {
    const createSpy = waitAfterCreate();

    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Creating a Channel Type" tab="Node.js" index=1
    // COPY: publicType="public"
    await client.chat.createChannelType({
      name: publicType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
      mutes: false,
      reactions: false,
    });
    // #endregion snippet

    expect(createSpy).toHaveBeenCalledTimes(1);
    const type = await client.chat.getChannelType({ name: publicType });
    expect(type.mutes).toBe(false);
    expect(type.reactions).toBe(false);
    expect(type.max_message_length).toBe(5000);
  });

  it('lists the channel types', async () => {
    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="List Channel Types" tab="Node.js" index=1
    const { channel_types } = await client.chat.listChannelTypes();
    // #endregion snippet

    expect(Object.keys(channel_types)).toEqual(
      expect.arrayContaining(['messaging', publicType]),
    );
    expect(channel_types[publicType].reactions).toBe(false);
  });

  it('gets a channel type', async () => {
    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Get a Channel Type" tab="Node.js" index=1
    // COPY: publicType="public"
    const channelType = await client.chat.getChannelType({ name: publicType });
    // #endregion snippet

    expect(channelType.name).toBe(publicType);
    expect(channelType.mutes).toBe(false);
  });

  it('edits commands and replies', async () => {
    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Edit a Channel Type" tab="Node.js" index=1
    // COPY: publicType="public"
    const current = await client.chat.getChannelType({ name: publicType });

    const update = await client.chat.updateChannelType({
      name: publicType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      replies: false,
      commands: ['all'],
    });
    // #endregion snippet

    expect(update.replies).toBe(false);
    // "all" expands to every built-in command.
    expect(update.commands).toEqual(
      expect.arrayContaining(['ban', 'giphy', 'mute', 'unban', 'unmute']),
    );
    expect(update.max_message_length).toBe(current.max_message_length);

    await waitForChannelTypePropagation();
    const type = await waitForChannelType(publicType, (r) => !r.replies);
    expect(commandNames(type)).toEqual(
      expect.arrayContaining(['ban', 'giphy', 'mute', 'unban', 'unmute']),
    );
  });

  it('updates feature flags', async () => {
    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Edit a Channel Type" tab="Node.js" index=2
    // COPY: publicType="public"
    const current = await client.chat.getChannelType({ name: publicType });

    const update = await client.chat.updateChannelType({
      name: publicType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      typing_events: false,
      read_events: true,
      connect_events: true,
      search: false,
      reactions: true,
      replies: false,
      mutes: true,
    });
    // #endregion snippet

    expect(update).toMatchObject({
      typing_events: false,
      read_events: true,
      connect_events: true,
      search: false,
      reactions: true,
      replies: false,
      mutes: true,
    });

    await waitForChannelTypePropagation();
    const type = await waitForChannelType(
      publicType,
      (r) => !r.typing_events && r.mutes,
    );
    expect(type.search).toBe(false);
  });

  it('updates settings with new values', async () => {
    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Edit a Channel Type" tab="Node.js" index=3
    // COPY: publicType="public"
    const current = await client.chat.getChannelType({ name: publicType });

    const update = await client.chat.updateChannelType({
      name: publicType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: 140, // the value this example is changing
      commands: ['giphy', 'ban'],
    });
    // #endregion snippet

    expect(update.max_message_length).toBe(140);
    expect([...update.commands].sort()).toEqual(['ban', 'giphy']);

    await waitForChannelTypePropagation();
    const type = await waitForChannelType(
      publicType,
      (r) => r.max_message_length === 140,
    );
    expect(commandNames(type)).toEqual(['ban', 'giphy']);
  });

  it('removes a channel type', async () => {
    // #region snippet docs="_default/06-app_and_channel_settings/01-channel_types.md" heading="Remove a Channel Type" tab="Node.js" index=1
    // COPY: publicType="public"
    const destroy = await client.chat.deleteChannelType({ name: publicType });
    // #endregion snippet

    expect(destroy.duration).toBeDefined();
    // Already deleted: Cleanup would fail on "is not a defined channel type".
    cleanup.channelTypes.splice(cleanup.channelTypes.indexOf(publicType), 1);
    await waitForChannelTypePropagation();
    await expect(
      client.chat.getChannelType({ name: publicType }),
    ).rejects.toThrow(/does not exist|not found/i);
  });
});
