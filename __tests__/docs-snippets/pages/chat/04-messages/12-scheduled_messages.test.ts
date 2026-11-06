import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'chat/_default/04-messages/12-scheduled_messages.md';

// Scheduled messages are off on the test app: sendMessage with `scheduled_at` fails with
// code 114 "scheduled messages are not enabled for this app" (2026-11-04). The snippets are
// kept in `it.skip` so they are still typechecked.
const BLOCKED =
  'BLOCKED: code 114 "scheduled messages are not enabled for this app"';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const john = uniqueId('john');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;
  const channelCid = cid;

  /** Schedules a message by john in the test channel, an hour from now. */
  const scheduleMessage = async (text: string) => {
    const response = await client.chat
      .channel('messaging', channelId)
      .sendMessage({
        message: { text, user_id: john },
        scheduled_at: new Date(Date.now() + 60 * 60 * 1000),
      });
    return response.scheduled_message?.id ?? '';
  };

  beforeAll(async () => {
    cleanup.users.push(john);
    await client.upsertUsers([{ id: john }]);
    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: { created_by_id: john, members: [{ user_id: john }] },
    });
  });

  afterAll(() => cleanup.run());

  it.skip(`${BLOCKED}: schedules a message`, async () => {
    // #region snippet docs="chat/_default/04-messages/12-scheduled_messages.md" heading="Scheduling a message" tab="Node.js" index=1
    // COPY: channelId="general", john="john"
    const channel = client.chat.channel('messaging', channelId);

    const response = await channel.sendMessage({
      message: {
        text: 'Happy birthday!',
        user_id: john,
        custom: { priority: 'high' },
      },
      scheduled_at: new Date('2026-12-24T09:00:00Z'),
    });

    const scheduledMessage = response.scheduled_message;
    // #endregion snippet

    expect(scheduledMessage).toMatchObject({ cid, status: 'scheduled' });
    expect(scheduledMessage?.user.id).toBe(john);
    // Nothing is sent to the channel until the scheduled time.
    const { messages } = await channel.getOrCreate({ state: true });
    expect(messages.map((m) => m.text)).not.toContain('Happy birthday!');
  });

  it.skip(`${BLOCKED}: updates a scheduled message`, async () => {
    const scheduledMessageId = await scheduleMessage('Happy birthday!');

    // #region snippet docs="chat/_default/04-messages/12-scheduled_messages.md" heading="Updating a scheduled message" tab="Node.js" index=1
    const { scheduled_message } = await client.chat.updateScheduledMessage({
      id: scheduledMessageId,
      message: { text: 'Happy birthday, John!' },
      scheduled_at: new Date('2026-12-24T08:00:00Z'),
    });
    // #endregion snippet

    expect(scheduled_message.id).toBe(scheduledMessageId);
    expect(scheduled_message.message.text).toBe('Happy birthday, John!');
  });

  it.skip(`${BLOCKED}: sends a scheduled message now`, async () => {
    const scheduledMessageId = await scheduleMessage('Sent right away');

    // #region snippet docs="chat/_default/04-messages/12-scheduled_messages.md" heading="Sending a scheduled message now" tab="Node.js" index=1
    const { scheduled_message } = await client.chat.sendScheduledMessageNow({
      id: scheduledMessageId,
    });
    // #endregion snippet

    expect(scheduled_message.id).toBe(scheduledMessageId);
    expect(['sending', 'sent']).toContain(scheduled_message.status);
  });

  it.skip(`${BLOCKED}: deletes a scheduled message`, async () => {
    const scheduledMessageId = await scheduleMessage('Never sent');

    // #region snippet docs="chat/_default/04-messages/12-scheduled_messages.md" heading="Deleting a scheduled message" tab="Node.js" index=1
    const { scheduled_message } = await client.chat.deleteScheduledMessage({
      id: scheduledMessageId,
    });
    // #endregion snippet

    expect(scheduled_message.id).toBe(scheduledMessageId);
    expect(scheduled_message.status).toBe('canceled');
  });

  it.skip(`${BLOCKED}: queries scheduled messages`, async () => {
    const scheduledMessageId = await scheduleMessage('Queried');

    // #region snippet docs="chat/_default/04-messages/12-scheduled_messages.md" heading="Querying scheduled messages" tab="Node.js" index=1
    // COPY: john="john", channelCid="messaging:general"
    const { scheduled_messages, next } =
      await client.chat.queryScheduledMessages({
        user_id: john,
        filter: { cid: channelCid },
        limit: 20,
      });
    // #endregion snippet

    expect(scheduled_messages.map((m) => m.id)).toContain(scheduledMessageId);
    expect(next).toBeUndefined();
  });
});
