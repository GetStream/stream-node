import 'dotenv/config';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createTestClient } from './create-test-client';
import { StreamChannel } from '../src/StreamChannel';
import { StreamClient } from '../src/StreamClient';
import { StreamError } from '../src/types';
import { randomUUID } from 'crypto';

// Error code the API returns when scheduled messages are off for the app.
const SCHEDULED_MESSAGES_DISABLED = 114;

const inOneHour = () => new Date(Date.now() + 60 * 60 * 1000);

describe('scheduled messages API', () => {
  let client: StreamClient;
  const channelId = 'streamnodetest' + randomUUID();
  let channel: StreamChannel;
  const user = {
    id: 'stream-node-test-user',
    name: 'Stream Node Test User',
    role: 'admin',
  };
  // Set when the app supports scheduled messages: the feature is opt-in per
  // app, and backends without it ignore scheduled_at and send right away.
  let scheduledMessageId: string | undefined;

  beforeAll(async () => {
    client = createTestClient();

    await client.upsertUsers([user]);

    channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({
      data: {
        created_by_id: user.id,
        members: [{ user_id: user.id }],
      },
    });

    try {
      const response = await channel.sendMessage({
        message: { text: 'Scheduled from Stream Node SDK', user_id: user.id },
        scheduled_at: inOneHour(),
      });
      scheduledMessageId = response.scheduled_message?.id;
    } catch (error) {
      if (
        !(error instanceof StreamError) ||
        error.code !== SCHEDULED_MESSAGES_DISABLED
      ) {
        throw error;
      }
    }
  });

  it('schedule a message', async (ctx) => {
    if (!scheduledMessageId) ctx.skip();

    const response = await client.chat.queryScheduledMessages({
      user_id: user.id,
      filter: { cid: channel.cid },
    });

    expect(response.scheduled_messages.length).toBe(1);
    const scheduled = response.scheduled_messages[0];
    expect(scheduled.id).toBe(scheduledMessageId);
    expect(scheduled.status).toBe('scheduled');
    expect(scheduled.cid).toBe(channel.cid);
    expect(scheduled.message.text).toBe('Scheduled from Stream Node SDK');
    expect(scheduled.scheduled_at).toBeInstanceOf(Date);
  });

  it('update a scheduled message', async (ctx) => {
    if (!scheduledMessageId) ctx.skip();

    const scheduledAt = inOneHour();
    const response = await client.chat.updateScheduledMessage({
      id: scheduledMessageId!,
      scheduled_at: scheduledAt,
      message: { text: 'Rescheduled from Stream Node SDK' },
    });

    expect(response.scheduled_message.message.text).toBe(
      'Rescheduled from Stream Node SDK',
    );
    expect(response.scheduled_message.scheduled_at.getTime()).toBe(
      scheduledAt.getTime(),
    );
  });

  it('send a scheduled message now', async (ctx) => {
    if (!scheduledMessageId) ctx.skip();

    const response = await client.chat.sendScheduledMessageNow({
      id: scheduledMessageId!,
    });

    expect(response.scheduled_message.id).toBe(scheduledMessageId);
  });

  it('delete a scheduled message', async (ctx) => {
    if (!scheduledMessageId) ctx.skip();

    const sendResponse = await channel.sendMessage({
      message: { text: 'Deleted before sending', user_id: user.id },
      scheduled_at: inOneHour(),
    });
    const id = sendResponse.scheduled_message!.id;

    const response = await client.chat.deleteScheduledMessage({ id });

    expect(response.scheduled_message.id).toBe(id);
    expect(response.scheduled_message.status).toBe('canceled');

    const queryResponse = await client.chat.queryScheduledMessages({
      user_id: user.id,
      filter: { cid: channel.cid },
    });
    expect(queryResponse.scheduled_messages.map((m) => m.id)).not.toContain(id);
  });

  afterAll(async () => {
    await channel.delete({ hard_delete: true });
  });
});
