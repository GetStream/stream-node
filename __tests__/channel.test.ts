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

    await client.upsertUsers({
      users: {
        [user.id]: { ...user },
        [user2.id]: { ...user2 },
      },
    });

    channel = client.chat.channel('messaging', channelId);
  });

  it('create', async () => {
    const response = await channel.getOrCreate({
      data: { created_by_id: user.id, name: channelId },
    });

    expect(response.channel?.cid).toBe(`${channel.type}:${channel.id}`);
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
    const response = await channel.updatePartial({
      set: { cooldown: 100 },
      unset: [],
    });

    expect(response.channel?.cooldown).toBe(100);
  });

  it('query members', async () => {
    const response = await channel.queryMembers({
      filter_conditions: {
        name: { $autocomplete: '2' },
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
    const muteResponse = await channel.mute({ user_id: user2.id });

    expect(muteResponse.channel_mute?.channel?.id).toBe(channel.id);

    await channel.unmute({ user_id: user2.id });

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
    const statusResponse = await client.chat.getExportStatus({
      id: response.task_id,
    });

    expect(statusResponse).toBeDefined();
  });

  it('custom event', async () => {
    const response = await channel.sendCustomEvent({
      type: 'my-event',
      user_id: user.id,
    });

    expect(response.event?.type).toBe('my-event');
  });

  it('delete', async () => {
    await channel.delete();
  });
});
