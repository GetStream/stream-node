import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { UpdateMessagePartialResponse } from '../../../../index';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';

const DOCS = '_default/04-messages/11-ai-message-streaming.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const botId = uniqueId('ai-bot');
  const userId = uniqueId('user');
  const channelId = uniqueId('ai-chat');
  const cid = `agent:${channelId}`;

  const sendPlaceholder = async () => {
    const { message } = await client.chat
      .channel('agent', channelId)
      .sendMessage({
        message: { text: '', user_id: botId, custom: { ai_generated: true } },
      });
    return message.id;
  };

  beforeAll(async () => {
    cleanup.users.push(botId, userId);
    await client.upsertUsers([{ id: botId }, { id: userId }]);

    cleanup.channels.push(cid);
    await client.chat.channel('agent', channelId).getOrCreate({
      data: {
        created_by_id: userId,
        members: [{ user_id: userId }, { user_id: botId }],
      },
    });
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('commits the final text with a persisted partial update', async () => {
    const msgId = await sendPlaceholder();
    const finalText = 'The full assistant reply.';

    // #region snippet docs="_default/04-messages/11-ai-message-streaming.md" heading="Persisted partial update" tab="Node.js" index=1
    await client.chat.updateMessagePartial({
      id: msgId,
      set: { text: finalText, generating: false },
      user_id: botId,
    });
    // #endregion snippet

    const { message } = await client.chat.getMessage({ id: msgId });
    expect(message.text).toBe(finalText);
    expect(message.custom).toMatchObject({
      ai_generated: true,
      generating: false,
    });
  });

  it('streams an interim chunk with an ephemeral partial update', async () => {
    const msgId = await sendPlaceholder();
    const buffer = 'The assistant is typ';
    const spy = vi.spyOn(client.chat, 'ephemeralMessageUpdate');

    // #region snippet docs="_default/04-messages/11-ai-message-streaming.md" heading="Ephemeral partial update" tab="Node.js" index=1
    await client.chat.ephemeralMessageUpdate({
      id: msgId,
      set: { text: buffer, generating: true },
      user_id: botId,
    });
    // #endregion snippet

    const [response] = await Promise.all(
      spy.mock.results.map(
        (r) => r.value as Promise<UpdateMessagePartialResponse>,
      ),
    );
    expect(response.message?.text).toBe(buffer);
    expect(response.message?.custom).toMatchObject({ generating: true });

    // Not written to the database: a re-read still has the empty placeholder.
    const { message } = await client.chat.getMessage({ id: msgId });
    expect(message.text).toBe('');
    expect(message.custom).not.toHaveProperty('generating');
  });
});
