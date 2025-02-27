import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { StreamChannel } from '../src/StreamChannel';

describe('channel API', () => {
  let client: StreamClient;
  const channelId = 'streamnodetest' + uuidv4();
  let channel: StreamChannel;
  const user = {
    id: 'stream-node-test-user',
    name: 'Stream Node Test User',
    role: 'admin',
  };
  const user2 = {
    id: 'stream-node-test-user2',
    name: 'Stream Node Test User 2',
    role: 'admin',
  };

  beforeAll(async () => {
    client = createTestClient();

    await client.upsertUsers([user, user2]);

    channel = client.chat.channel('messaging', channelId);
  });

  it('create', async () => {
    const response = await channel.getOrCreate({
      data: { created_by_id: user.id, custom: { name: channelId } },
    });

    expect(response.channel?.cid).toBe(`${channel.type}:${channel.id}`);
    // Type error: Property 'name' does not exist on type 'ChannelResponse'
    expect(response.channel?.custom?.name).toBe(channelId);
  });

  it('create - without id', async () => {
    const channelWithoutId = client.chat.channel('messaging');
    const response = await channelWithoutId.getOrCreate({
      data: {
        created_by_id: user.id,
        members: [{ user_id: user.id }, { user_id: user2.id }],
      },
    });

    expect(response.channel?.cid).toBe(channelWithoutId.cid);

    await channelWithoutId.delete();
  });

  it('update', async () => {
    const response = await channel.update({
      add_members: [{ user_id: user.id }, { user_id: user2.id }],
      add_moderators: [],
      demote_moderators: [],
      remove_members: [],
    });

    expect(response.members.length).toBe(2);
  });

  it('update partial', async () => {
    const response = await channel.updateChannelPartial({
      set: { cooldown: 100 },
      unset: [],
    });

    expect(response.channel?.cooldown).toBe(100);
  });

  it('queryChannels', async () => {
    const unfilteredResponse = await client.chat.queryChannels();

    expect(unfilteredResponse.channels.length).toBeGreaterThan(1);

    const filteredResponse = await client.chat.queryChannels({
      filter_conditions: { cid: channel.cid },
    });

    expect(filteredResponse.channels.length).toBe(1);

    const channelFromResponse = filteredResponse.channels[0];

    expect(channelFromResponse.channel?.custom?.name).toBe(channelId);
  });

  it('query members', async () => {
    const response = await channel.queryMembers({
      payload: {
        filter_conditions: {
          name: { $autocomplete: '2' },
        },
      },
    });

    expect(response.members.length).toBe(1);
  });

  it('show and hide', async () => {
    const hideResponse = await channel.hide({ user_id: user2.id });

    expect(hideResponse).toBeDefined();

    const queryResponse = await client.chat.queryChannels({
      filter_conditions: { hidden: true },
      sort: [],
      user_id: user2.id,
    });

    expect(
      queryResponse.channels.find((c) => c.channel?.id === channel.id),
    ).toBeDefined();

    const showResponse = await channel.show({ user_id: user2.id });

    expect(showResponse).toBeDefined();
  });

  it('mute and unmute', async () => {
    const muteResponse = await client.chat.muteChannel({
      user_id: user2.id,
      channel_cids: [channel.cid],
    });

    expect(muteResponse.channel_mute?.channel?.id).toBe(channel.id);

    await client.chat.unmuteChannel({
      user_id: user2.id,
      channel_cids: [channel.cid],
    });

    const queryResponse = await client.chat.queryChannels({
      filter_conditions: { muted: true },
      sort: [],
      user_id: user2.id,
    });

    expect(
      queryResponse.channels.find((c) => c.channel?.cid === channel.cid),
    ).toBe(undefined);
  });

  it('export', async () => {
    const response = await client.chat.exportChannels({
      channels: [{ cid: channel.cid }],
    });
    const statusResponse = await client.getTask({
      id: response.task_id,
    });

    expect(statusResponse).toBeDefined();
  });

  it('custom event', async () => {
    const response = await channel.sendEvent({
      event: {
        type: 'my-event',
        user_id: user.id,
      },
    });

    expect(response.event?.type).toBe('my-event');
  });

  it('delete', async () => {
    await channel.delete();
  });
});
