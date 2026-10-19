import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerChannel, sendServerMessage } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'chat/_default/05-features/03-unread.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const sender = uniqueId('sender');
  // unread counts (single and batch)
  const userID = uniqueId('reader');
  const userID2 = uniqueId('reader-two');
  // mark read / mark unread
  const fooId = uniqueId('foo');
  // mark all read
  const markAllId = uniqueId('myid');
  // unread messages per channel
  const perChannelId = uniqueId('myid');

  const countsChannelId = uniqueId('counts');
  const generalId = uniqueId('general');
  const allReadIds = [uniqueId('all-read'), uniqueId('all-read')];
  const testChannelId = uniqueId('test');
  const perChannelIds = [uniqueId('per-channel'), uniqueId('per-channel')];

  const createChannel = async (id: string, members: string[]) => {
    cleanup.channels.push(`messaging:${id}`);
    await client.chat.channel('messaging', id).getOrCreate({
      data: {
        created_by_id: sender,
        members: [sender, ...members].map((user_id) => ({ user_id })),
      },
    });
  };

  const send = (id: string, text: string) =>
    sendServerMessage(client, `messaging:${id}`, { text, user_id: sender });

  const unreadFor = async (id: string, userId: string) => {
    const channel = await getServerChannel(client, `messaging:${id}`, {
      user_id: userId,
    });
    return channel.read?.find((r) => r.user.id === userId)?.unread_messages;
  };

  const totalUnread = async (userId: string) =>
    (await client.chat.unreadCounts({ user_id: userId })).total_unread_count;

  /** Waits until `userId`'s total unread count is `expected`. */
  const waitForTotalUnread = (userId: string, expected: number) =>
    retry(async () => {
      expect(await totalUnread(userId)).toBe(expected);
    });

  beforeAll(async () => {
    const users = [sender, userID, userID2, fooId, markAllId, perChannelId];
    cleanup.users.push(...users);
    await client.upsertUsers(users.map((id) => ({ id })));

    await createChannel(countsChannelId, [userID, userID2]);
    await createChannel(generalId, [fooId]);
    for (const id of allReadIds) await createChannel(id, [markAllId]);
    await createChannel(testChannelId, [userID, userID2]);
    for (const id of perChannelIds) await createChannel(id, [perChannelId]);
  });

  afterEach(() => vi.restoreAllMocks());

  afterAll(() => cleanup.run());

  it('fetches unread counts server-side', async () => {
    await send(countsChannelId, 'one');
    await send(countsChannelId, 'two');
    await waitForTotalUnread(userID, 2);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/05-features/03-unread.md" heading="Unread Counts - Server side" tab="Node.js" index=1
    const response = await client.chat.unreadCounts({ user_id: userID });
    console.log(response.total_unread_count); // total unread count for user
    console.log(response.channels); // distribution of unread counts across channels
    console.log(response.channel_type); // distribution of unread counts across channel types
    console.log(response.total_unread_threads_count); // total unread threads
    console.log(response.threads); // list of unread counts per thread
    // #endregion snippet

    expect(log).toHaveBeenCalledTimes(5);
    expect(response.total_unread_count).toBe(2);
    expect(response.channels).toEqual([
      expect.objectContaining({
        channel_id: `messaging:${countsChannelId}`,
        unread_count: 2,
      }),
    ]);
    expect(response.channel_type).toEqual([
      expect.objectContaining({
        channel_type: 'messaging',
        channel_count: 1,
        unread_count: 2,
      }),
    ]);
    expect(response.total_unread_threads_count).toBe(0);
    expect(response.threads).toEqual([]);
  });

  it('fetches unread counts for several users at once', async () => {
    await waitForTotalUnread(userID2, 2);
    const userID1 = userID;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/05-features/03-unread.md" heading="Batch Fetch Unread" tab="Node.js" index=1
    const response = await client.chat.unreadCountsBatch({
      user_ids: [userID1, userID2],
    });
    console.log(response.counts_by_user[userID1].total_unread_count); // total unread count for userID1
    console.log(response.counts_by_user[userID1].channels); // distribution of unread counts across channels for userID1
    console.log(response.counts_by_user[userID1].channel_type); // distribution of unread counts across channel types for userID1
    console.log(response.counts_by_user[userID1].total_unread_threads_count); // total unread threads count for userID1
    console.log(response.counts_by_user[userID1].threads); // list of unread counts per thread for userID1
    // #endregion snippet

    expect(log).toHaveBeenCalledTimes(5);
    expect(Object.keys(response.counts_by_user).sort()).toEqual(
      [userID1, userID2].sort(),
    );
    for (const id of [userID1, userID2]) {
      const counts = response.counts_by_user[id];
      expect(counts.total_unread_count).toBe(2);
      expect(counts.channels.map((c) => c.channel_id)).toEqual([
        `messaging:${countsChannelId}`,
      ]);
    }
  });

  it('marks a channel as read and a message as unread for a user', async () => {
    const first = await send(generalId, 'first');
    await send(generalId, 'second');
    await retry(async () => {
      expect(await unreadFor(generalId, fooId)).toBe(2);
    });

    {
      // #region snippet docs="chat/_default/05-features/03-unread.md" heading="Mark Read" tab="Node.js" index=1
      // COPY: generalId="general", fooId="foo"
      const channel = client.chat.channel('messaging', generalId);

      // mark all messages on a channel as read (server side)
      await channel.markRead({ user_id: fooId });
      // #endregion snippet
    }

    await retry(async () => {
      expect(await unreadFor(generalId, fooId)).toBe(0);
    });

    const messageId = first.id;
    const userId = fooId;

    // #region snippet docs="chat/_default/05-features/03-unread.md" heading="Mark Read" tab="Node.js" index=2
    // COPY: generalId="general", messageId="<message_id>", userId="<user_id>"
    const channel = client.chat.channel('messaging', generalId);

    await channel.markUnread({
      message_id: messageId,
      user_id: userId,
    });
    // #endregion snippet

    expect(channel.cid).toBe(`messaging:${generalId}`);
    // `first` and every message after it are unread again
    await retry(async () => {
      expect(await unreadFor(generalId, fooId)).toBe(2);
    });
  });

  it('marks all channels as read for a user', async () => {
    for (const id of allReadIds) await send(id, 'unread');
    await waitForTotalUnread(markAllId, 2);

    // #region snippet docs="chat/_default/05-features/03-unread.md" heading="Mark All As Read" tab="Node.js" index=1
    // COPY: markAllId="myid"
    // mark all channels as read for one user
    await client.chat.markChannelsRead({ user_id: markAllId });
    // #endregion snippet

    await waitForTotalUnread(markAllId, 0);
    for (const id of allReadIds) {
      expect(await unreadFor(id, markAllId)).toBe(0);
    }
  });

  it('reads how far each member has read', async () => {
    await send(testChannelId, 'hello');
    await client.chat
      .channel('messaging', testChannelId)
      .markRead({ user_id: userID2 });
    await retry(async () => {
      expect(await unreadFor(testChannelId, userID)).toBe(1);
      expect(await unreadFor(testChannelId, userID2)).toBe(0);
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/05-features/03-unread.md" heading="Read State - Showing how far other users have read" tab="Node.js" index=1
    // COPY: testChannelId="test"
    const channel = client.chat.channel('messaging', testChannelId);
    const { read } = await channel.get({ state: true });

    // one entry per member, with how far that member has read
    for (const state of read ?? []) {
      console.log(state.user.id, state.last_read, state.unread_messages);
    }
    // #endregion snippet

    const unreadByUser = Object.fromEntries(
      (read ?? []).map((r) => [r.user.id, r.unread_messages]),
    );
    expect(unreadByUser).toEqual({ [sender]: 0, [userID]: 1, [userID2]: 0 });
    expect(log).toHaveBeenCalledTimes(3);
    expect(log).toHaveBeenCalledWith(userID, expect.any(Date), 1);
  });

  it('reads the unread messages per channel', async () => {
    await send(perChannelIds[0], 'one');
    await send(perChannelIds[1], 'two');
    await send(perChannelIds[1], 'three');
    await waitForTotalUnread(perChannelId, 3);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/05-features/03-unread.md" heading="Unread Messages Per Channel" tab="Node.js" index=1
    // COPY: perChannelId="myid"
    // Read the per-channel distribution from the user's unread counts.
    const { channels } = await client.chat.unreadCounts({
      user_id: perChannelId,
    });

    for (const entry of channels) {
      console.log(entry.channel_id, entry.unread_count);
    }
    // #endregion snippet

    expect(channels).toHaveLength(2);
    expect(log.mock.calls).toEqual(
      expect.arrayContaining([
        [`messaging:${perChannelIds[0]}`, 1],
        [`messaging:${perChannelIds[1]}`, 2],
      ]),
    );
  });
});
