import 'dotenv/config';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createTestClient } from './create-test-client';
import { StreamChannel } from '../src/StreamChannel';
import { StreamClient } from '../src/StreamClient';
import { v4 as uuidv4 } from 'uuid';

describe('messages API', () => {
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
  let messageId: string | undefined;

  beforeAll(async () => {
    client = createTestClient();

    await client.upsertUsers([user, user2]);

    channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({
      data: {
        // Type '{ id: string; }' is missing the following properties from type 'UserObject': banned, custom, online, role
        created_by: { id: user.id },
        members: [{ user }, { user: user2 }],
      },
    });
  });

  it('send message', async () => {
    const response = await channel.sendMessage({
      message: {
        text: 'Hello from Stream Node SDK',
        attachments: [],
        user_id: user.id,
      },
    });

    expect(response.message?.text).toBe('Hello from Stream Node SDK');

    messageId = response.message.id;

    const getResponse = await channel.getManyMessages({
      ids: [messageId, messageId],
    });

    expect(getResponse.messages.length).toBe(1);
  });

  it('thread replies', async () => {
    const now = new Date();
    const response = await channel.sendMessage({
      message: {
        text: 'Hello from Stream Node SDK',
        attachments: [],
        user_id: user.id,
      },
    });

    const threadResponse = await channel.sendMessage({
      message: {
        parent_id: response.message.id,
        text: 'Hello from a thread',
        attachments: [],
        user_id: user.id,
      },
    });

    const getResponse = await client.chat.getReplies({
      parent_id: response.message.id,
      created_at_after: now,
    });

    expect(
      getResponse.messages.find((m) => m.id === threadResponse.message.id),
    ).toBeDefined();
  });

  it('update message', async () => {
    const urlAttachment = await client.getOG({ url: 'https://getstream.io/' });

    const response = await client.chat.updateMessage({
      id: messageId!,
      message: {
        text: 'https://getstream.io/',
        attachments: [{ title_link: urlAttachment.title_link }],
        user_id: user.id,
      },
    });

    expect(response.message?.text).toBe('https://getstream.io/');
    expect(response.message?.attachments[0].title_link).toBe(
      'https://getstream.io/',
    );
  });

  it('update partial', async () => {
    const response = await client.chat.updateMessagePartial({
      id: messageId!,
      set: {
        text: 'check this out: https://getstream.io/',
      },
      unset: [],
      user_id: user.id,
    });

    expect(response.message?.text).toBe(
      'check this out: https://getstream.io/',
    );
    expect(response.message?.attachments[0].title_link).toBe(
      'https://getstream.io/',
    );
  });

  it('translate', async () => {
    const response = await client.chat.translateMessage({
      id: messageId!,
      language: 'hu',
    });

    expect(response.message?.i18n?.hu_text).toBeDefined();
  });

  it('read and unread', async () => {
    const readResponse = await channel.markRead({ user_id: user2.id });

    expect(readResponse.event?.channel_id).toBe(channel.id);

    const unreadResponse = await channel.markUnread({
      user_id: user2.id,
      message_id: messageId!,
    });

    expect(unreadResponse).toBeDefined();
  });

  it('send reaction', async () => {
    const response = await client.chat.sendReaction({
      id: messageId!,
      reaction: { type: 'like', user_id: user.id },
    });

    expect(response.message?.id).toBe(messageId);
    expect(response.reaction?.message_id).toBe(messageId);
    expect(response.reaction?.type).toBe('like');
  });

  it('get reactions', async () => {
    const response = await client.chat.getReactions({ id: messageId! });

    expect(response.reactions.length).toBe(1);
  });

  it('delete reaction', async () => {
    const response = await client.chat.deleteReaction({
      id: messageId!,
      type: 'like',
      user_id: user.id,
    });

    expect(response.message?.id).toBe(messageId);
    expect(response.reaction?.type).toBe('like');
  });

  it('search', async () => {
    const response = await client.chat.search({
      payload: {
        filter_conditions: { members: { $in: [user2.id] } },
        message_filter_conditions: { text: { $autocomplete: 'check' } },
      },
    });

    expect(response.results).toBeDefined();
  });

  it('flag', async () => {
    const response = await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId!,
      user_id: user.id,
      reason: 'hate',
    });

    expect(response.item_id).toBeDefined();
  });

  it('truncate', async () => {
    await channel.truncate({ user_id: user.id });

    const response = await channel.getOrCreate();

    expect(response.messages.length).toBe(0);
  });

  it('delete message', async () => {
    const response = await client.chat.deleteMessage({
      id: messageId!,
      hard: true,
    });

    expect(response.message?.id).toBe(messageId);

    await expect(() =>
      client.chat.getMessage({ id: messageId! }),
    ).rejects.toThrowError(
      `Stream error code 4: GetMessage failed with error: "Message with id ${messageId} doesn't exist"`,
    );
  });

  afterAll(async () => {
    await channel.delete({ hard_delete: true });
  });
});
