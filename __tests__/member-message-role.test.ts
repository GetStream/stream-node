import 'dotenv/config';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { v4 as uuidv4 } from 'uuid';

import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { StreamChannel } from '../src/StreamChannel';

describe('member message role propagation', () => {
  let client: StreamClient;
  let channel: StreamChannel;
  const channelId = 'streamnodetest-role-' + uuidv4();

  const user1 = {
    id: 'stream-node-role-user1-' + uuidv4(),
    name: 'Stream Node Role User 1',
    channel_role: 'custom_role',
  };

  const user2 = {
    id: 'stream-node-role-user2-' + uuidv4(),
    name: 'Stream Node Role User 2',
    channel_role: 'channel_member',
  };

  let messageId1: string | undefined;
  let messageId2: string | undefined;

  beforeAll(async () => {
    client = createTestClient();

    await client.upsertUsers([user1, user2]);

    channel = client.chat.channel('messaging', channelId);

    await channel.getOrCreate({
      data: {
        created_by: { id: user1.id },
        members: [
          {
            user_id: user1.id,
            channel_role: user1.channel_role,
            banned: false,
            created_at: new Date(),
            notifications_muted: false,
            shadow_banned: false,
            updated_at: new Date(),
            custom: [],
          },
          {
            user_id: user2.id,
            banned: false,
            channel_role: '',
            created_at: new Date(),
            notifications_muted: false,
            shadow_banned: false,
            updated_at: new Date(),
            custom: [],
          },
        ],
      },
    });
  });

  it('should include the creator role in message response', async () => {
    // user1 sends a message
    const resp1 = await channel.sendMessage({
      message: {
        text: 'Message from user1',
        user_id: user1.id,
      },
    });

    messageId1 = resp1.message.id;

    expect(resp1.message?.user?.id).toBe(user1.id);
    expect(resp1.message?.member?.channel_role).toBe(user1.channel_role);

    const resp2 = await channel.sendMessage({
      message: {
        text: 'Message from user2',
        user_id: user2.id,
      },
    });

    messageId2 = resp2.message.id;

    expect(resp2.message?.user?.id).toBe(user2.id);
    expect(resp2.message?.member?.channel_role).toBe(user2.channel_role);
  });

  it('channel state messages should include creator role', async () => {
    const queryResp = await client.chat.queryChannels({
      filter_conditions: { id: channelId },
      limit: 1,
      message_limit: 10,
      state: true,
    });

    const messages = queryResp.channels[0].messages;
    const msg1 = messages.find((m) => m.id === messageId1);
    const msg2 = messages.find((m) => m.id === messageId2);

    expect(msg1?.member?.channel_role).toBe(user1.channel_role);
    expect(msg2?.member?.channel_role).toBe(user2.channel_role);
  });

  afterAll(async () => {
    // Clean up the channel after test run
    // await channel.delete({ hard_delete: true });
  });
});
