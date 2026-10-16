import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'chat/_default/04-messages/01-send_message.md';

const isNotFound = (error: unknown) =>
  error instanceof Error && /not.?found|404/i.test(error.message);

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const john = uniqueId('john');
  const josh = uniqueId('josh');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;
  const designTeamId = uniqueId('design-team');

  beforeAll(async () => {
    cleanup.users.push(john, josh);
    await client.upsertUsers([{ id: john }, { id: josh }]);

    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: john,
        members: [{ user_id: john }, { user_id: josh }],
      },
    });

    cleanup.add(async () => {
      try {
        await client.deleteUserGroup({ id: designTeamId });
      } catch (error) {
        if (!isNotFound(error)) throw error;
      }
    });
    await client.createUserGroup({
      id: designTeamId,
      name: uniqueId('design'),
      member_ids: [josh],
    });
  });

  afterAll(() => cleanup.run());

  it('sends a message', async () => {
    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Sending a Message" tab="Node.js" index=1
    // COPY: channelId="general", john="john"
    const channel = client.chat.channel('messaging', channelId);

    const { message } = await channel.sendMessage({
      message: {
        text: 'Hello, world!',
        user_id: john,
      },
    });
    // #endregion snippet

    expect(message.text).toBe('Hello, world!');
    expect(message.user?.id).toBe(john);
    expect(message.cid).toBe(cid);
  });

  it('sends messages with mentions', async () => {
    const sendMessage = vi.spyOn(client.chat, 'sendMessage');

    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Mentions" tab="Node.js" index=1
    // COPY: channelId="general", john="john", designTeamId="design-team-id", josh="josh"
    const channel = client.chat.channel('messaging', channelId);

    // Send a message mentioning all online users
    await channel.sendMessage({
      message: { text: 'Hey everyone!', user_id: john, mentioned_here: true },
    });

    // Send a message mentioning all channel members
    await channel.sendMessage({
      message: {
        text: 'Important announcement!',
        user_id: john,
        mentioned_channel: true,
      },
    });

    // Send a message mentioning specific roles
    await channel.sendMessage({
      message: {
        text: 'Attention moderators!',
        user_id: john,
        mentioned_roles: ['channel_moderator', 'admin'],
      },
    });

    // Send a message mentioning a user group
    await channel.sendMessage({
      message: {
        text: 'Design team, please review!',
        user_id: john,
        mentioned_group_ids: [designTeamId],
      },
    });

    // Send a message mentioning specific users
    await channel.sendMessage({
      message: {
        text: '@Josh can you take a look?',
        user_id: john,
        mentioned_users: [josh],
      },
    });
    // #endregion snippet

    const messages = await Promise.all(
      sendMessage.mock.results.map(
        async (r) =>
          (await (r.value as ReturnType<typeof client.chat.sendMessage>))
            .message,
      ),
    );
    sendMessage.mockRestore();

    expect(messages).toHaveLength(5);
    const [here, all, roles, group, users] = messages;
    expect(here.mentioned_here).toBe(true);
    expect(all.mentioned_channel).toBe(true);
    expect(roles.mentioned_roles).toEqual(['channel_moderator', 'admin']);
    expect(group.mentioned_group_ids).toEqual([designTeamId]);
    expect(users.mentioned_users.map((u) => u.id)).toEqual([josh]);
  });

  it('sends a message with attachments', async () => {
    const sendMessage = vi.spyOn(client.chat, 'sendMessage');

    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Sending Messages with Attachments" tab="Node.js" index=1
    // COPY: channelId="general", john="john", josh="josh"
    const channel = client.chat.channel('messaging', channelId);

    // Custom fields go under `custom`, on the message and on each attachment.
    // `custom` is a required field on an attachment, so pass `{}` when empty.
    await channel.sendMessage({
      message: {
        text: '@Josh Check out this image!',
        user_id: john,
        attachments: [
          {
            type: 'image',
            asset_url: 'https://bit.ly/2K74TaG',
            thumb_url: 'https://bit.ly/2Uumxti',
            custom: { myCustomField: 123 },
          },
        ],
        mentioned_users: [josh],
        custom: { priority: 'high' },
      },
      skip_push: true,
    });
    // #endregion snippet

    const { message } = await (sendMessage.mock.results[0].value as ReturnType<
      typeof client.chat.sendMessage
    >);
    sendMessage.mockRestore();

    expect(message.custom.priority).toBe('high');
    expect(message.mentioned_users.map((u) => u.id)).toEqual([josh]);
    expect(message.attachments).toHaveLength(1);
    expect(message.attachments[0].type).toBe('image');
    expect(message.attachments[0].asset_url).toBe('https://bit.ly/2K74TaG');
    expect(message.attachments[0].custom.myCustomField).toBe(123);
  });

  it('enriches URLs', async () => {
    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="URL Enrichment" tab="Node.js" index=1
    // COPY: channelId="general", john="john"
    const channel = client.chat.channel('messaging', channelId);

    const response = await channel.sendMessage({
      message: {
        text: 'Check this out https://imgur.com/r/bears/4zmGbMN',
        user_id: john,
      },
    });
    // #endregion snippet

    expect(response.message.text).toContain('https://imgur.com');
    // Server-side, the scrape runs after the response: the attachment shows up on the
    // stored message a moment later.
    const attachment = await retry(
      async () => {
        const { message } = await client.chat.getMessage({
          id: response.message.id,
        });
        const [first] = message.attachments;
        if (!first) throw new Error('no URL attachment yet');
        return first;
      },
      { timeout: 30000 },
    );
    expect(attachment.og_scrape_url).toBe('https://imgur.com/r/bears/4zmGbMN');
  });

  it('retrieves a message, and a soft-deleted one with its original content', async () => {
    const messageID = (
      await sendServerMessage(client, cid, {
        text: 'to be retrieved',
        user_id: john,
      })
    ).id;
    await client.chat.deleteMessage({ id: messageID });

    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Retrieving a Message" tab="Node.js" index=1
    const { message } = await client.chat.getMessage({ id: messageID });

    // For soft-deleted messages, retrieve the original content (server-side only)
    const deleted = await client.chat.getMessage({
      id: messageID,
      show_deleted_message: true,
    });
    // #endregion snippet

    expect(message.id).toBe(messageID);
    expect(message.type).toBe('deleted');
    expect(message.text).not.toBe('to be retrieved');
    expect(deleted.message.text).toBe('to be retrieved');
  });

  it('updates a message', async () => {
    const original = await sendServerMessage(client, cid, {
      text: 'original text',
      user_id: john,
      custom: { color: 'red' },
    });
    const messageId = original.id;

    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Updating a Message" tab="Node.js" index=1
    // COPY: john="john"
    // A full update replaces the message, so send every field you want to keep.
    // Use the partial update below to change one field in place.
    const updated = await client.chat.updateMessage({
      id: messageId,
      message: {
        text: 'Updated message text',
        user_id: john,
      },
    });
    // #endregion snippet

    expect(updated.message.id).toBe(messageId);
    expect(updated.message.text).toBe('Updated message text');
    const { message } = await client.chat.getMessage({ id: messageId });
    expect(message.text).toBe('Updated message text');
    expect(message.custom.color).toBeUndefined();
  });

  it('partially updates a message', async () => {
    const originalMessage = await sendServerMessage(client, cid, {
      text: 'original text',
      user_id: john,
      custom: { color: 'red', details: { status: 'pending', owner: john } },
    });

    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Partial Update" tab="Node.js" index=1
    // COPY: john="john"
    // Update text
    await client.chat.updateMessagePartial({
      id: originalMessage.id,
      set: { text: 'Updated text' },
      user_id: john,
    });

    // Remove a custom field
    await client.chat.updateMessagePartial({
      id: originalMessage.id,
      unset: ['color'],
      user_id: john,
    });

    // Update nested properties
    await client.chat.updateMessagePartial({
      id: originalMessage.id,
      set: { 'details.status': 'complete' },
      user_id: john,
    });
    // #endregion snippet

    const { message } = await client.chat.getMessage({
      id: originalMessage.id,
    });
    expect(message.text).toBe('Updated text');
    expect(message.custom.color).toBeUndefined();
    expect(message.custom.details).toEqual({ status: 'complete', owner: john });
  });

  it('deletes messages', async () => {
    const messageID = (
      await sendServerMessage(client, cid, { text: 'to delete', user_id: john })
    ).id;
    const anotherMessageID = (
      await sendServerMessage(client, cid, {
        text: 'to delete as john',
        user_id: josh,
      })
    ).id;

    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Deleting a Message" tab="Node.js" index=1
    // COPY: john="john"
    // Soft delete
    await client.chat.deleteMessage({ id: messageID });

    // Hard delete
    await client.chat.deleteMessage({ id: messageID, hard: true });

    // Attribute the deletion to a specific user
    await client.chat.deleteMessage({ id: anotherMessageID, deleted_by: john });
    // #endregion snippet

    await expect(client.chat.getMessage({ id: messageID })).rejects.toThrow(
      /doesn't exist|not found/i,
    );
    const { message } = await client.chat.getMessage({ id: anotherMessageID });
    expect(message.type).toBe('deleted');
    expect(message.deleted_at).toBeDefined();
  });

  it('undeletes a message', async () => {
    const userID = john;
    const messageID = (
      await sendServerMessage(client, cid, {
        text: 'to restore',
        user_id: john,
      })
    ).id;
    await client.chat.deleteMessage({ id: messageID });

    // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Undeleting a Message" tab="Node.js" index=1
    await client.chat.undeleteMessage({
      id: messageID,
      undeleted_by: userID,
    });
    // #endregion snippet

    const { message } = await client.chat.getMessage({ id: messageID });
    expect(message.type).toBe('regular');
    expect(message.text).toBe('to restore');
  });
});
