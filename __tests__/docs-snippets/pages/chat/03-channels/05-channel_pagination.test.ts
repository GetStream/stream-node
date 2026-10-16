import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage } from '../../../helpers/server';

const DOCS = 'chat/_default/03-channels/05-channel_pagination.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;
  const ownerId = uniqueId('owner');
  // 22 members, so the `limit: 20` page is cut off and the `limit: 110` one isn't.
  const memberIds = [
    ownerId,
    ...Array.from({ length: 21 }, (_, i) => uniqueId(`member-${i}`)),
  ];
  // 25 messages, oldest first.
  const messageIds: string[] = [];

  beforeAll(async () => {
    cleanup.users.push(...memberIds);
    await client.upsertUsers(memberIds.map((id) => ({ id })));

    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: ownerId,
        members: memberIds.map((user_id) => ({ user_id })),
      },
    });

    for (let i = 0; i < 25; i++) {
      const message = await sendServerMessage(client, cid, {
        text: `message ${i}`,
        user_id: ownerId,
      });
      messageIds.push(message.id);
    }
  });

  afterAll(() => cleanup.run());

  it('paginates messages by id', async () => {
    const messageId = messageIds[10];

    // #region snippet docs="chat/_default/03-channels/05-channel_pagination.md" heading="Pagination Parameters" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Load the latest page of messages
    const page = await channel.getOrCreate({
      state: true,
      messages: { limit: 20 },
    });

    // Get the ID of the oldest message on the current page
    const lastMessageId = page.messages[0].id;

    // Fetch older messages
    const older = await channel.getOrCreate({
      state: true,
      messages: { limit: 20, id_lt: lastMessageId },
    });

    // Fetch messages around a specific message
    const around = await channel.getOrCreate({
      state: true,
      messages: { limit: 20, id_around: messageId },
    });
    // #endregion snippet

    // The latest 20 messages, oldest first.
    expect(page.messages.map((m) => m.id)).toEqual(messageIds.slice(5));
    expect(lastMessageId).toBe(messageIds[5]);
    // The 5 messages older than the first page.
    expect(older.messages.map((m) => m.id)).toEqual(messageIds.slice(0, 5));
    // A page that contains the message, with messages on both sides of it.
    const aroundIds = around.messages.map((m) => m.id);
    expect(aroundIds).toContain(messageId);
    expect(aroundIds.indexOf(messageId)).toBeGreaterThan(0);
    expect(aroundIds.indexOf(messageId)).toBeLessThan(aroundIds.length - 1);
  });

  it('paginates members and watchers with limit and offset', async () => {
    // #region snippet docs="chat/_default/03-channels/05-channel_pagination.md" heading="Member and Watcher Pagination" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Paginate members and watchers
    const result = await channel.getOrCreate({
      state: true,
      members: { limit: 20, offset: 0 },
      watchers: { limit: 20, offset: 0 },
    });

    const withState = await channel.getOrCreate({
      state: true,
      members: { limit: 110, offset: 0 },
    });
    // #endregion snippet

    expect(result.members).toHaveLength(20);
    expect(withState.members.map((m) => m.user_id).sort()).toEqual(
      [...memberIds].sort(),
    );
    // Nobody watches the channel (no connected users).
    expect(result.watchers ?? []).toHaveLength(0);
  });
});
