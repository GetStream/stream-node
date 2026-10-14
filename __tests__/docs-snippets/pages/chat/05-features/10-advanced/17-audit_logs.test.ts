import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retryOnRateLimit } from '../../../../helpers/wait';

const DOCS = 'chat/_default/05-features/10-advanced/17-audit_logs.md';

const ORIGINAL_TEXT = 'Hello bob! give me a call.';
const WITH_NUMBER =
  'Hello bob! give me a call. Here is my number: +31 6 12345678';
const REMOVED = 'Hello bob! give me a call. Here is my number: [removed]';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const aliceId = uniqueId('alice');
  const bobId = uniqueId('bob');
  const adminId = uniqueId('admin');
  const messageId = uniqueId('message-1');
  const channelId = uniqueId('history');
  const channel = client.chat.channel('messaging', channelId);

  beforeAll(async () => {
    cleanup.users.push(aliceId, bobId, adminId);
    await client.upsertUsers([
      { id: aliceId },
      { id: bobId },
      { id: adminId, role: 'admin' },
    ]);
    await channel.getOrCreate({
      data: {
        created_by_id: aliceId,
        members: [{ user_id: aliceId }, { user_id: bobId }],
      },
    });
    cleanup.channels.push(`messaging:${channelId}`);

    // queryMessageHistory is limited to 6 requests per minute: retry the
    // regions' calls on 429 instead of failing on back-to-back runs.
    const queryMessageHistory = client.chat.queryMessageHistory.bind(
      client.chat,
    );
    vi.spyOn(client.chat, 'queryMessageHistory').mockImplementation((request) =>
      retryOnRateLimit(() => queryMessageHistory(request)),
    );
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await cleanup.run();
  });

  it('Example', async () => {
    // #region snippet docs="chat/_default/05-features/10-advanced/17-audit_logs.md" heading="Example" tab="Node.js" index=1
    // COPY: messageId="message-1", aliceId="alice"
    const message = await channel.sendMessage({
      message: {
        id: messageId,
        text: 'Hello bob! give me a call.',
        user_id: aliceId,
      },
    });
    // #endregion snippet

    expect(message.message.id).toBe(messageId);
    const afterSend = await client.chat.queryMessageHistory({
      filter: { message_id: messageId },
    });
    expect(afterSend.message_history).toEqual([]);

    // #region snippet docs="chat/_default/05-features/10-advanced/17-audit_logs.md" heading="Example" tab="Node.js" index=2
    // COPY: messageId="message-1", aliceId="alice"
    await client.chat.updateMessage({
      id: messageId,
      message: {
        text: 'Hello bob! give me a call. Here is my number: +31 6 12345678',
        user_id: aliceId,
      },
    });
    // #endregion snippet

    // #region snippet docs="chat/_default/05-features/10-advanced/17-audit_logs.md" heading="Example" tab="Node.js" index=3
    // COPY: messageId="message-1", adminId="admin"
    await client.chat.updateMessage({
      id: messageId,
      message: {
        text: 'Hello bob! give me a call. Here is my number: [removed]',
        user_id: adminId,
      },
    });
    // #endregion snippet

    const current = await client.chat.getMessage({ id: messageId });
    expect(current.message.text).toBe(REMOVED);

    // #region snippet docs="chat/_default/05-features/10-advanced/17-audit_logs.md" heading="Example" tab="Node.js" index=4
    // COPY: messageId="message-1"
    const history = await client.chat.queryMessageHistory({
      filter: { message_id: messageId },
    });
    // #endregion snippet

    // Latest first; each entry holds the text before an update. Its
    // `message_updated_by_id` is the user who wrote that text (alice wrote both
    // versions), not the user of the update that replaced it, as the docs' JSON
    // response shows (admin for the "+31 ..." entry).
    expect(
      history.message_history.map((entry) => ({
        message_id: entry.message_id,
        text: entry.text,
        message_updated_by_id: entry.message_updated_by_id,
      })),
    ).toEqual([
      {
        message_id: messageId,
        text: WITH_NUMBER,
        message_updated_by_id: aliceId,
      },
      {
        message_id: messageId,
        text: ORIGINAL_TEXT,
        message_updated_by_id: aliceId,
      },
    ]);
  });

  it('Querying message history', async () => {
    // #region snippet docs="chat/_default/05-features/10-advanced/17-audit_logs.md" heading="Querying message history" tab="Node.js" index=1
    // COPY: messageId="message-1"
    // sorted by `message_updated_at` ascending:
    const history = await client.chat.queryMessageHistory({
      filter: { message_id: messageId },
      sort: [{ field: 'message_updated_at', direction: 1 }],
    });
    // #endregion snippet

    expect(
      history.message_history.map((entry) => [
        entry.text,
        entry.is_deleted,
        entry.message_updated_by_id,
      ]),
    ).toEqual([
      [ORIGINAL_TEXT, false, aliceId],
      [WITH_NUMBER, false, aliceId],
    ]);
  });
});
