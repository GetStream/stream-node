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
    role: 'custom_role',
  };

  const user2 = {
    id: 'stream-node-role-user2-' + uuidv4(),
    name: 'Stream Node Role User 2',
    role: 'user',
  };

  let messageId1: string | undefined;
  let messageId2: string | undefined;

  beforeAll(async () => {
    client = createTestClient();

    // upsert both users with their roles
    await client.upsertUsers([user1, user2]);

    // create channel with both members
    channel = client.chat.channel('messaging', channelId);

    await channel.getOrCreate({
      data: {
        created_by: { id: user1.id },
        members: [{ user: user1 }, { user: user2 }],
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
    expect(resp1.message?.user?.role).toBe(user1.role);

    // user2 sends a message
    const resp2 = await channel.sendMessage({
      message: {
        text: 'Message from user2',
        user_id: user2.id,
      },
    });

    messageId2 = resp2.message.id;

    expect(resp2.message?.user?.id).toBe(user2.id);
    expect(resp2.message?.user?.role).toBe(user2.role);
  });

  it('channel state messages should include creator role', async () => {
    const state = await channel.getOrCreate();

    // Ensure both messages are present with correct roles.
    const msg1 = state.messages.find((m) => m.id === messageId1);
    const msg2 = state.messages.find((m) => m.id === messageId2);

    expect(msg1?.user?.role).toBe(user1.role);
    expect(msg2?.user?.role).toBe(user2.role);
  });

  afterAll(async () => {
    // Clean up the channel after test run
    await channel.delete({ hard_delete: true });
  });
});
