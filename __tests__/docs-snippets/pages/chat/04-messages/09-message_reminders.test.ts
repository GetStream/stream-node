import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { nsToMs } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerChannel, sendServerMessage } from '../../../helpers/server';
import { waitForChannelTypePropagation } from '../../../helpers/wait';

const DOCS = 'chat/_default/04-messages/09-message_reminders.md';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The "Enabling Reminders" snippet changes the channel type it names: run it on a
  // uniqueId type instead of the built-in `messaging` type.
  const channelType = uniqueId('messaging');
  const channelId = uniqueId('reminders-type-channel');

  // The other snippets use `messaging` channels with reminders enabled through
  // `config_overrides`. Each snippet gets its own user so its results are exact.
  const owner = uniqueId('owner');
  const creator = uniqueId('creator');
  const updater = uniqueId('updater');
  const deleter = uniqueId('deleter');
  const querier = uniqueId('querier');
  const filterer = uniqueId('filterer');
  const pager = uniqueId('pager');
  const users = [owner, creator, updater, deleter, querier, filterer, pager];
  const reminderChannelId = uniqueId('reminders');
  const otherChannelId = uniqueId('reminders-other');
  const reminderCid = `messaging:${reminderChannelId}`;

  // remind_at must be at least one minute in the future, so the reminder that the
  // "overdue" filter should find is created first and becomes due during the run.
  let overdueAt: Date;
  let overdueMessageId: string;

  const sendMessage = async (cid: string, userId: string) =>
    (
      await sendServerMessage(client, cid, {
        text: 'remind me',
        user_id: userId,
      })
    ).id;

  beforeAll(async () => {
    await client.upsertUsers(users.map((id) => ({ id })));
    cleanup.users.push(...users);

    for (const id of [reminderChannelId, otherChannelId]) {
      const channel = client.chat.channel('messaging', id);
      await channel.getOrCreate({
        data: {
          created_by_id: owner,
          members: users.map((user_id) => ({ user_id })),
        },
      });
      cleanup.channels.push(channel.cid);
      await channel.updateChannelPartial({
        set: { config_overrides: { user_message_reminders: true } },
      });
    }

    overdueMessageId = await sendMessage(reminderCid, owner);
    overdueAt = new Date(Date.now() + 62000);
    await client.chat.createReminder({
      message_id: overdueMessageId,
      user_id: filterer,
      remind_at: overdueAt,
    });

    await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(channelType);
    await waitForChannelTypePropagation();

    const channel = client.chat.channel(channelType, channelId);
    await channel.getOrCreate({ data: { created_by_id: owner } });
    cleanup.channels.push(channel.cid);
  });

  afterAll(() => cleanup.run());

  it('enables reminders for a channel and for a channel type', async () => {
    const before = await client.chat.getChannelType({ name: channelType });
    expect(before.user_message_reminders).toBe(false);

    // #region snippet docs="chat/_default/04-messages/09-message_reminders.md" heading="Enabling Reminders" tab="Node.js" index=1
    // COPY: channelType="messaging"
    // Enabling it for a channel
    const channel = client.chat.channel(channelType, channelId);
    await channel.updateChannelPartial({
      set: {
        config_overrides: {
          user_message_reminders: true,
        },
      },
    });

    // Enabling it for a channel type.
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({ name: channelType });
    const update = await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      user_message_reminders: true,
    });
    // #endregion snippet
    await waitForChannelTypePropagation();

    expect(update.user_message_reminders).toBe(true);
    expect(update.automod).toBe(current.automod);
    expect(update.max_message_length).toBe(current.max_message_length);

    const updated = await client.chat.getChannelType({ name: channelType });
    expect(updated.user_message_reminders).toBe(true);
    const { channel: channelResponse } = await getServerChannel(
      client,
      channel.cid,
    );
    expect(channelResponse?.config?.user_message_reminders).toBe(true);

    // Reminders now work on that channel.
    const messageId = await sendMessage(channel.cid, owner);
    const { reminder } = await client.chat.createReminder({
      message_id: messageId,
      user_id: owner,
    });
    expect(reminder.channel_cid).toBe(channel.cid);
  });

  it('creates reminders', async () => {
    const messageId = await sendMessage(reminderCid, owner);
    const anotherMessageId = await sendMessage(reminderCid, owner);
    const userId = creator;
    const startedAt = Date.now();

    // #region snippet docs="chat/_default/04-messages/09-message_reminders.md" heading="Creating a Message Reminder" tab="Node.js" index=1
    // COPY: messageId="message-id", anotherMessageId="another-message-id", userId="user-id"
    // Create a reminder with a specific due date
    await client.chat.createReminder({
      message_id: messageId,
      user_id: userId,
      remind_at: new Date(Date.now() + 3600000),
    });

    // Create a "Save for later" reminder without a specific time
    await client.chat.createReminder({
      message_id: anotherMessageId,
      user_id: userId,
    });
    // #endregion snippet

    const { reminders } = await client.chat.queryReminders({
      user_id: userId,
    });
    const byMessage = new Map(reminders.map((r) => [r.message_id, r]));
    expect([...byMessage.keys()].sort()).toEqual(
      [messageId, anotherMessageId].sort(),
    );
    const timed = byMessage.get(messageId)?.remind_at;
    expect(timed).toEqual(expect.any(Number));
    expect(nsToMs(timed ?? 0)).toBeGreaterThanOrEqual(
      startedAt + 3600000 - 1000,
    );
    expect(byMessage.get(anotherMessageId)?.remind_at ?? null).toBeNull();
  });

  it('updates reminders', async () => {
    const messageId = await sendMessage(reminderCid, owner);
    const userId = updater;
    await client.chat.createReminder({
      message_id: messageId,
      user_id: userId,
      remind_at: new Date(Date.now() + 3600000),
    });
    const startedAt = Date.now();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    try {
      // #region snippet docs="chat/_default/04-messages/09-message_reminders.md" heading="Updating a Message Reminder" tab="Node.js" index=1
      // COPY: messageId="message-id", userId="user-id"
      // Update a reminder with a new due date
      const updated = await client.chat.updateReminder({
        message_id: messageId,
        user_id: userId,
        remind_at: new Date(Date.now() + 7200000),
      });
      console.log(updated.reminder.remind_at);

      // Omit `remind_at` to convert a timed reminder into "Save for later".
      await client.chat.updateReminder({
        message_id: messageId,
        user_id: userId,
      });
      // #endregion snippet

      const newDueDate = updated.reminder.remind_at;
      expect(newDueDate).toEqual(expect.any(Number));
      expect(nsToMs(newDueDate ?? 0)).toBeGreaterThanOrEqual(
        startedAt + 7200000 - 1000,
      );
      expect(log.mock.calls[0]).toEqual([newDueDate]);
    } finally {
      log.mockRestore();
    }

    const { reminders } = await client.chat.queryReminders({
      user_id: userId,
    });
    expect(reminders.map((r) => r.message_id)).toEqual([messageId]);
    expect(reminders[0].remind_at ?? null).toBeNull();
  });

  it('deletes a reminder', async () => {
    const messageId = await sendMessage(reminderCid, owner);
    const userId = deleter;
    await client.chat.createReminder({
      message_id: messageId,
      user_id: userId,
    });

    // #region snippet docs="chat/_default/04-messages/09-message_reminders.md" heading="Deleting a Message Reminder" tab="Node.js" index=1
    // COPY: messageId="message-id", userId="user-id"
    // Delete the reminder for the message
    await client.chat.deleteReminder({
      message_id: messageId,
      user_id: userId,
    });
    // #endregion snippet

    const { reminders } = await client.chat.queryReminders({
      user_id: userId,
    });
    expect(reminders).toEqual([]);
    await expect(
      client.chat.deleteReminder({ message_id: messageId, user_id: userId }),
    ).rejects.toMatchObject({ code: 16, metadata: { responseCode: 404 } });
  });

  it('queries reminders', async () => {
    const userId = querier;
    const channelCid = reminderCid;
    const inChannel = await sendMessage(reminderCid, owner);
    const inOtherChannel = await sendMessage(
      `messaging:${otherChannelId}`,
      owner,
    );
    for (const message_id of [inChannel, inOtherChannel]) {
      await client.chat.createReminder({ message_id, user_id: userId });
    }

    // #region snippet docs="chat/_default/04-messages/09-message_reminders.md" heading="Querying Message Reminders" tab="Node.js" index=1
    // COPY: userId="user-id", channelCid="messaging:general"
    // Query reminders for a user
    const reminders = await client.chat.queryReminders({ user_id: userId });

    // Query reminders with filters
    const filtered = await client.chat.queryReminders({
      user_id: userId,
      filter: { channel_cid: channelCid },
    });
    // #endregion snippet

    expect(reminders.reminders.map((r) => r.message_id).sort()).toEqual(
      [inChannel, inOtherChannel].sort(),
    );
    expect(filtered.reminders.map((r) => r.message_id)).toEqual([inChannel]);
    expect(filtered.reminders[0].channel_cid).toBe(channelCid);
  });

  it('filters overdue, upcoming and saved reminders', async () => {
    const userId = filterer;
    // Two upcoming reminders (to check the sort) and two saved for later ones.
    const upcomingIds: string[] = [];
    for (const offset of [7200000, 3600000]) {
      const message_id = await sendMessage(reminderCid, owner);
      await client.chat.createReminder({
        message_id,
        user_id: userId,
        remind_at: new Date(Date.now() + offset),
      });
      upcomingIds.push(message_id);
    }
    const savedIds: string[] = [];
    for (let i = 0; i < 2; i++) {
      const message_id = await sendMessage(reminderCid, owner);
      await client.chat.createReminder({ message_id, user_id: userId });
      savedIds.push(message_id);
      await sleep(10);
    }
    // Wait until the reminder created in beforeAll is overdue.
    const waitMs = overdueAt.getTime() + 2000 - Date.now();
    if (waitMs > 0) await sleep(waitMs);

    // #region snippet docs="chat/_default/04-messages/09-message_reminders.md" heading="Filtering Reminders" tab="Node.js" index=1
    // COPY: userId="user-id"
    // Filter overdue reminders, most recently expired first
    const overdue = await client.chat.queryReminders({
      user_id: userId,
      filter: { remind_at: { $lt: new Date() } },
      sort: [{ field: 'remind_at', direction: -1 }],
    });

    // Filter upcoming reminders, nearest to expire first
    const upcoming = await client.chat.queryReminders({
      user_id: userId,
      filter: { remind_at: { $gt: new Date() } },
      sort: [{ field: 'remind_at', direction: 1 }],
    });

    // Filter reminders with no due date (saved for later)
    const saved = await client.chat.queryReminders({
      user_id: userId,
      filter: { remind_at: null },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    expect(overdue.reminders.map((r) => r.message_id)).toEqual([
      overdueMessageId,
    ]);
    // Created furthest-first, so only the sort puts the nearest first.
    expect(upcoming.reminders.map((r) => r.message_id)).toEqual([
      upcomingIds[1],
      upcomingIds[0],
    ]);
    // Created oldest-first, so only the sort puts the newest first.
    expect(saved.reminders.map((r) => r.message_id)).toEqual([
      savedIds[1],
      savedIds[0],
    ]);
  }, 120000);

  it('paginates reminders', async () => {
    const userId = pager;
    const pageSize = 1;
    // Timed reminders: with the default sort (remind_at), the `next` cursor skips
    // reminders without a due date.
    const messageIds: string[] = [];
    for (const offset of [3600000, 7200000]) {
      const message_id = await sendMessage(reminderCid, owner);
      await client.chat.createReminder({
        message_id,
        user_id: userId,
        remind_at: new Date(Date.now() + offset),
      });
      messageIds.push(message_id);
    }
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const query = vi.spyOn(client.chat, 'queryReminders');

    try {
      // #region snippet docs="chat/_default/04-messages/09-message_reminders.md" heading="Pagination" tab="Node.js" index=1
      // COPY: userId="user-id", pageSize=10
      const page1 = await client.chat.queryReminders({
        user_id: userId,
        limit: pageSize,
      });

      // Load the next page
      if (page1.next) {
        const page2 = await client.chat.queryReminders({
          user_id: userId,
          limit: pageSize,
          next: page1.next,
        });
        console.log(page2.reminders);
      }

      // Load the previous page
      if (page1.prev) {
        const previous = await client.chat.queryReminders({
          user_id: userId,
          limit: pageSize,
          prev: page1.prev,
        });
        console.log(previous.reminders);
      }
      // #endregion snippet

      expect(page1.reminders.map((r) => r.message_id)).toEqual([messageIds[0]]);
      expect(page1.next).toBeTruthy();
      // The first page has no previous page.
      expect(page1.prev).toBeUndefined();
      expect(query).toHaveBeenCalledTimes(2);
      expect(log).toHaveBeenCalledTimes(1);
      const [page2Reminders] = log.mock.calls[0] as [
        Array<{ message_id: string }>,
      ];
      expect(page2Reminders.map((r) => r.message_id)).toEqual([messageIds[1]]);
    } finally {
      log.mockRestore();
      query.mockRestore();
    }
  });
});
