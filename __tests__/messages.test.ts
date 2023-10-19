import "dotenv/config";
import { beforeAll, describe, expect, it } from "vitest";
import { v4 as uuidv4 } from "uuid";
import { StreamClient, StreamChannel, TranslateMessageRequestLanguageEnum } from "../";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("messages API", () => {
  let client: StreamClient;
  const channelId = 'stream-node-test-channel';
  let channel: StreamChannel;
  const user = {
    id: "stream-node-test-user",
    name: "Stream Node Test User",
    role: "admin",
  };
  const user2 = {
    id: "stream-node-test-user2",
    name: "Stream Node Test User 2",
    role: "admin",
  }
  let messageId: string | undefined;

  beforeAll(async () => {
    client = new StreamClient(apiKey, secret);

    await client.updateUsers({
        users: {
          [user.id]: { ...user },
          [user2.id]: {...user2 }
        },
    });

    channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({data: {created_by: {id: user.id}, members: [{user: user}, {user: user2}]}});
  });

  it('send message', async () => {
    const response = await channel.sendMessage({message: {text: 'Hello from Stream Node SDK', attachments: [], user_id: user.id}});

    expect(response.message?.text).toBe('Hello from Stream Node SDK');

    messageId = response.message?.id;

    expect((await channel.getManyMessages({ids: [messageId!]})).messages.length).toBe(1);
  });

  it('update message', async () => {
    const urlAttachment = await channel.getOpenGraphData({url: 'https://getstream.io/'});
    const response = await channel.updateMessage(messageId!, {message: {
        text: 'https://getstream.io/',
        attachments: [urlAttachment],
        user_id: user.id
    }});

    expect(response.message?.text).toBe('https://getstream.io/');
    expect(response.message?.attachments[0].title_link).toBe('https://getstream.io/');
  });

  it('update partial', async () => {
    const response = await channel.updateMessagePartial(messageId!, {set: {
        text: 'check this out: https://getstream.io/',
    }, unset: [], user_id: user.id});

    expect(response.message?.text).toBe('check this out: https://getstream.io/');
    expect(response.message?.attachments[0].title_link).toBe('https://getstream.io/');
  });

  it('translate', async () => {
    const response = await channel.translateMessage(messageId!, {language: TranslateMessageRequestLanguageEnum.HU});

    expect(response.message?.i18n?.hu_text).toBeDefined();
  })

  it("read and unread", async () => {
    const readResponse = await channel.markRead({user_id: user2.id});

    expect(readResponse.event?.channel_id).toBe(channel.id);

    const unreadResponse = await channel.markUnread({user_id: user2.id, message_id: messageId!});

    expect(unreadResponse).toBeDefined();
  });

  it('send reaction', async () => {
    const response = await channel.sendMessageReaction(messageId!, {reaction: {type: 'like', user_id: user.id}});

    expect(response.message?.id).toBe(messageId);
    expect(response.reaction?.message_id).toBe(messageId);
    expect(response.reaction?.type).toBe('like');
  });

  it('get reactions', async () => {
    const response = await channel.getMessageReactions(messageId!);

    expect(response.reactions.length).toBe(1);
  });

  it('delete reaction', async () => {
    const response = await channel.deleteMessageReaction(messageId!, {type: 'like', userId: user.id});
    
    expect(response.message?.id).toBe(messageId);
    expect(response.reaction?.type).toBe('like');
  })

  it('search', async () => {
    const response = await client.chat.searchMessages({filter_conditions: {members: {$in: [user2.id]}}, message_filter_conditions: {text: {$autocomplete: 'check'}}});

    expect(response.results).toBeDefined();
  })

  it("truncate", async () => {
    await channel.truncate({user_id: user.id});

    const response = await channel.getOrCreate();

    expect(response.messages.length).toBe(0);
  });

  it('delete message', async () => {
    const response = await channel.deleteMessage({id: messageId!, hard: true});

    expect(response.message?.id).toBe(messageId);

    await expect(() =>
        channel.getMessage({id: messageId!})
    ).rejects.toThrowError(`Stream error code 4: GetMessage failed with error: "Message with id ${messageId} doesn't exist"`);
  })

});
