import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { convertTimestampToDate, nsToMs } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage } from '../../../helpers/server';
import type { UpdateMessagePartialResponse } from '../../../../../index';

const DOCS = 'chat/_default/04-messages/05-pinned_messages.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const john = uniqueId('john');

  const newChannel = async () => {
    const id = uniqueId('general');
    cleanup.channels.push(`messaging:${id}`);
    await client.chat.channel('messaging', id).getOrCreate({
      data: { created_by_id: john, members: [{ user_id: john }] },
    });
    return id;
  };

  beforeAll(async () => {
    cleanup.users.push(john);
    await client.upsertUsers([{ id: john }]);
  });

  afterAll(() => cleanup.run());

  it('pins and unpins messages', async () => {
    const channelId = await newChannel();
    const userId = john;
    const updateMessagePartial = vi.spyOn(client.chat, 'updateMessagePartial');
    const before = Date.now();

    // #region snippet docs="chat/_default/04-messages/05-pinned_messages.md" heading="Pinning and Unpinning Messages" tab="Node.js" index=1
    // COPY: channelId="general", userId="john"
    const channel = client.chat.channel('messaging', channelId);

    // Create a pinned message
    const { message } = await channel.sendMessage({
      message: {
        text: 'Important announcement',
        user_id: userId,
        pinned: true,
        pin_expires: new Date('2077-01-01T00:00:00Z'),
      },
    });

    // Pin an existing message for 120 seconds
    await client.chat.updateMessagePartial({
      id: message.id,
      set: {
        pinned: true,
        pin_expires: new Date(Date.now() + 120 * 1000).toISOString(),
      },
      user_id: userId,
    });

    // Pin indefinitely
    await client.chat.updateMessagePartial({
      id: message.id,
      set: { pinned: true, pin_expires: null },
      user_id: userId,
    });

    // Unpin a message
    await client.chat.updateMessagePartial({
      id: message.id,
      set: { pinned: false },
      user_id: userId,
    });
    // #endregion snippet

    const [timed, indefinite, unpinned] = await Promise.all(
      updateMessagePartial.mock.results.map(
        (r) => r.value as Promise<UpdateMessagePartialResponse>,
      ),
    );
    updateMessagePartial.mockRestore();

    expect(message.pinned).toBe(true);
    expect(message.pinned_by?.id).toBe(john);
    expect(convertTimestampToDate(message.pin_expires)?.toISOString()).toBe(
      '2077-01-01T00:00:00.000Z',
    );

    expect(timed.message?.pinned).toBe(true);
    const timedExpiry = nsToMs(timed.message?.pin_expires ?? 0);
    expect(timedExpiry).toBeGreaterThanOrEqual(before + 110 * 1000);
    expect(timedExpiry).toBeLessThan(Date.now() + 130 * 1000);

    expect(indefinite.message?.pinned).toBe(true);
    expect(indefinite.message?.pin_expires ?? null).toBeNull();

    expect(unpinned.message?.pinned).toBe(false);
    const { message: stored } = await client.chat.getMessage({
      id: message.id,
    });
    expect(stored.pinned).toBe(false);
  });

  it('retrieves pinned messages', async () => {
    const channelId = await newChannel();
    await sendServerMessage(client, `messaging:${channelId}`, {
      text: 'Not pinned',
      user_id: john,
    });
    const pinned = await sendServerMessage(client, `messaging:${channelId}`, {
      text: 'Pinned',
      user_id: john,
      pinned: true,
    });

    // #region snippet docs="chat/_default/04-messages/05-pinned_messages.md" heading="Retrieving Pinned Messages" tab="Node.js" index=1
    const channel = client.chat.channel('messaging', channelId);
    const channelState = await channel.getOrCreate({ state: true });
    const pinnedMessages = channelState.pinned_messages;
    // #endregion snippet

    expect(pinnedMessages.map((m) => m.id)).toEqual([pinned.id]);
  });

  it('paginates pinned messages', async () => {
    const channelId = await newChannel();
    // Three pinned messages and a page size of 2, so every page call has
    // something to return.
    const pinnedIds: string[] = [];
    for (const text of ['first', 'second', 'third']) {
      const m = await sendServerMessage(client, `messaging:${channelId}`, {
        text,
        user_id: john,
        pinned: true,
      });
      pinnedIds.push(m.id);
    }
    const pageSize = 2;
    const aroundSize = 4;
    const [first, second, third] = pinnedIds;

    // #region snippet docs="chat/_default/04-messages/05-pinned_messages.md" heading="Paginating Pinned Messages" tab="Node.js" index=1
    // COPY: channelId="general", pageSize=10, aroundSize=4
    const channel = client.chat.channel('messaging', channelId);

    // First page, newest first
    const page1 = await channel.getPinnedMessages({
      limit: pageSize,
      sort: [{ field: 'pinned_at', direction: -1 }],
    });

    // Next page
    const lastMsg = page1.messages[page1.messages.length - 1];
    const page2 = await channel.getPinnedMessages({
      limit: pageSize,
      id_lt: lastMsg.id,
      sort: [{ field: 'pinned_at', direction: -1 }],
    });

    // Oldest first
    const ascPage = await channel.getPinnedMessages({ limit: pageSize });
    const ascLastMsg = ascPage.messages[ascPage.messages.length - 1];
    const ascPage2 = await channel.getPinnedMessages({
      limit: pageSize,
      id_gt: ascLastMsg.id,
    });

    // Center a page on a known message instead of paging from an edge
    const around = await channel.getPinnedMessages({
      limit: aroundSize,
      id_around: lastMsg.id,
    });
    // #endregion snippet

    const ids = (r: typeof page1) => r.messages.map((m) => m.id);
    expect(ids(page1)).toEqual([third, second]);
    expect(ids(page2)).toEqual([first]);
    expect(ids(ascPage)).toEqual([first, second]);
    expect(ids(ascPage2)).toEqual([third]);
    expect([...ids(around)].sort()).toEqual([...pinnedIds].sort());
  });
});
