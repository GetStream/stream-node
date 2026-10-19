import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { ThreadStateResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage } from '../../../helpers/server';

const DOCS = 'chat/_default/04-messages/03-threads.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const john = uniqueId('john');
  const alice = uniqueId('alice');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  // Thread parent sent by alice; john replies to it in the first test.
  let parentMessageId = '';

  beforeAll(async () => {
    cleanup.users.push(john, alice);
    await client.upsertUsers([{ id: john }, { id: alice }]);

    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: alice,
        members: [{ user_id: john }, { user_id: alice }],
      },
    });

    const parent = await sendServerMessage(client, cid, {
      text: 'Thread parent',
      user_id: alice,
    });
    parentMessageId = parent.id;
  });

  afterAll(() => cleanup.run());

  it('starts a thread', async () => {
    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Starting a Thread" tab="Node.js" index=1
    // COPY: channelId="general", john="john"
    const channel = client.chat.channel('messaging', channelId);

    const { message: reply } = await channel.sendMessage({
      message: {
        text: 'This is a reply in a thread',
        parent_id: parentMessageId,
        show_in_channel: false,
        user_id: john,
      },
    });
    // #endregion snippet

    expect(reply.parent_id).toBe(parentMessageId);
    expect(reply.type).toBe('reply');
    expect(reply.show_in_channel).toBeFalsy();
  });

  it('paginates thread replies', async () => {
    const { messages: existing } = await client.chat.getReplies({
      parent_id: parentMessageId,
      limit: 20,
    });
    const extra = [];
    for (const text of ['second reply', 'third reply']) {
      extra.push(
        await sendServerMessage(client, cid, {
          text,
          parent_id: parentMessageId,
          user_id: alice,
        }),
      );
    }
    const allIds = [...existing.map((m) => m.id), ...extra.map((m) => m.id)];
    expect(allIds).toHaveLength(3);
    // Page back from the second reply: it and the first reply are returned.
    const olderThanId = allIds[1];

    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Paginating Thread Replies" tab="Node.js" index=1
    // COPY: olderThanId="42"
    // Get the first 20 replies
    const replies = await client.chat.getReplies({
      parent_id: parentMessageId,
      limit: 20,
    });

    // Get older replies (before message with ID "42")
    const olderReplies = await client.chat.getReplies({
      parent_id: parentMessageId,
      limit: 20,
      id_lte: olderThanId,
    });

    // Get oldest replies first
    const oldestFirst = await client.chat.getReplies({
      parent_id: parentMessageId,
      limit: 20,
      sort: [{ field: 'created_at', direction: 1 }],
    });
    // #endregion snippet

    expect(replies.messages.map((m) => m.id)).toEqual(allIds);
    expect(olderReplies.messages.map((m) => m.id)).toEqual(allIds.slice(0, 2));
    expect(oldestFirst.messages.map((m) => m.id)).toEqual(allIds);
  });

  it('sends an inline reply', async () => {
    const original = await sendServerMessage(client, cid, {
      text: 'The original message text',
      user_id: alice,
    });
    const originalMessageId = original.id;
    const sendMessage = vi.spyOn(client.chat, 'sendMessage');

    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Inline Replies" tab="Node.js" index=1
    // COPY: channelId="general", john="john"
    const channel = client.chat.channel('messaging', channelId);

    await channel.sendMessage({
      message: {
        text: 'I agree with this point',
        quoted_message_id: originalMessageId,
        user_id: john,
      },
    });
    // #endregion snippet

    const { message } = await (sendMessage.mock.results[0].value as ReturnType<
      typeof client.chat.sendMessage
    >);
    sendMessage.mockRestore();

    expect(message.quoted_message_id).toBe(originalMessageId);
    const { message: stored } = await client.chat.getMessage({
      id: message.id,
    });
    expect(stored.quoted_message?.id).toBe(originalMessageId);
    expect(stored.quoted_message?.text).toBe('The original message text');
  });

  it('queries threads', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Querying Threads" tab="Node.js" index=1
    // COPY: john="john"
    // Threads are per user, so a server-side query names the user it queries for.
    const { threads } = await client.chat.queryThreads({ user_id: john });

    for (const thread of threads) {
      console.log(thread.parent_message?.text);
      console.log(thread.latest_replies);
      console.log(thread.thread_participants);
      console.log(thread.read);
    }
    // #endregion snippet

    expect(logSpy).toHaveBeenCalledTimes(4);
    logSpy.mockRestore();

    expect(threads.map((t) => t.parent_message_id)).toEqual([parentMessageId]);
    const [thread] = threads;
    expect(thread.parent_message?.text).toBe('Thread parent');
    expect(thread.latest_replies.length).toBeGreaterThan(0);
    expect(thread.thread_participants?.map((p) => p.user_id)).toContain(john);
  });

  it('filters, sorts and paginates threads', async () => {
    // A second thread created by john, and a page size of 1, so the snippet's
    // `next` page is actually fetched.
    const second = await sendServerMessage(client, cid, {
      text: 'Second thread parent',
      user_id: alice,
    });
    await sendServerMessage(client, cid, {
      text: 'Reply to the second thread',
      parent_id: second.id,
      user_id: john,
    });
    const pageSize = 1;
    // A thread's `created_by_user_id` is the user of its first reply, not of the parent.
    const threadCreator = john;
    // `page2` only exists inside the snippet's `if`: read it from the snippet's log.
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Supported Sort Fields" tab="Node.js" index=1
    // COPY: threadCreator="user-1", john="john", pageSize=10
    const filter = {
      created_by_user_id: { $eq: threadCreator },
      updated_at: { $gte: '2024-01-01T00:00:00Z' },
    };
    const sort = [{ field: 'created_at', direction: -1 }];

    // Get threads created by a specific user, sorted by creation date
    const page1 = await client.chat.queryThreads({
      user_id: john,
      filter,
      sort,
      limit: pageSize,
    });

    // Get next page
    if (page1.next) {
      const page2 = await client.chat.queryThreads({
        user_id: john,
        filter,
        sort,
        limit: pageSize,
        next: page1.next,
      });
      console.log(page2.threads);
    }
    // #endregion snippet

    // Newest thread first.
    expect(page1.threads.map((t) => t.parent_message_id)).toEqual([second.id]);
    expect(page1.next).toBeTruthy();
    expect(log).toHaveBeenCalledTimes(1);
    const [page2Threads] = log.mock.calls[0] as [ThreadStateResponse[]];
    log.mockRestore();
    expect(page2Threads.map((t) => t.parent_message_id)).toEqual([
      parentMessageId,
    ]);
  });

  it('gets a thread by id', async () => {
    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Getting a Thread by ID" tab="Node.js" index=1
    const { thread } = await client.chat.getThread({
      message_id: parentMessageId,
      reply_limit: 10,
      participant_limit: 25,
    });
    // #endregion snippet

    expect(thread.parent_message_id).toBe(parentMessageId);
    expect(thread.channel_cid).toBe(cid);
    expect(thread.reply_count).toBe(3);
    expect(thread.latest_replies).toHaveLength(3);
  });

  it('updates thread title and custom data', async () => {
    const updateThreadPartial = vi.spyOn(client.chat, 'updateThreadPartial');

    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Updating Thread Title and Custom Data" tab="Node.js" index=1
    // Set properties. The thread is addressed by its parent message ID.
    const { thread } = await client.chat.updateThreadPartial({
      message_id: parentMessageId,
      set: {
        title: 'Project Discussion',
        priority: 'high',
      },
    });

    // Remove properties
    await client.chat.updateThreadPartial({
      message_id: parentMessageId,
      unset: ['priority'],
    });
    // #endregion snippet

    const [, unsetResult] = await Promise.all(
      updateThreadPartial.mock.results.map(
        (r) => r.value as ReturnType<typeof client.chat.updateThreadPartial>,
      ),
    );
    updateThreadPartial.mockRestore();

    expect(thread.title).toBe('Project Discussion');
    expect(thread.custom.priority).toBe('high');
    expect(unsetResult.thread?.custom.priority).toBeUndefined();

    const { thread: stored } = await client.chat.getThread({
      message_id: parentMessageId,
    });
    expect(stored.title).toBe('Project Discussion');
    expect(stored.custom.priority).toBeUndefined();
  });

  const johnsThreadUnread = async () => {
    const { threads } = await client.chat.unreadCounts({ user_id: john });
    return threads.find((t) => t.parent_message_id === parentMessageId)
      ?.unread_count;
  };

  it('marks a thread as read and unread', async () => {
    const probes: Array<number | undefined> = [];
    const originalMarkRead = client.chat.markRead.bind(client.chat);
    const readSpy = vi
      .spyOn(client.chat, 'markRead')
      .mockImplementation(async (request) => {
        const response = await originalMarkRead(request);
        probes.push(await johnsThreadUnread());
        return response;
      });

    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Marking Threads as Read or Unread" tab="Node.js" index=1
    // COPY: channelId="general", john="john"
    const channel = client.chat.channel('messaging', channelId);

    // Mark thread as read on behalf of a user
    await channel.markRead({ thread_id: parentMessageId, user_id: john });

    // Mark thread as unread on behalf of a user
    await channel.markUnread({ thread_id: parentMessageId, user_id: john });
    // #endregion snippet

    readSpy.mockRestore();

    // After markRead, john has nothing unread in the thread (it is absent or 0).
    expect(probes).toHaveLength(1);
    expect(probes[0] ?? 0).toBe(0);
    expect(await johnsThreadUnread()).toBeGreaterThan(0);
  });

  it('gets unread counts per thread', async () => {
    const channel = client.chat.channel('messaging', channelId);
    await channel.markUnread({ thread_id: parentMessageId, user_id: john });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // #region snippet docs="chat/_default/04-messages/03-threads.md" heading="Unread Count Per Thread" tab="Node.js" index=1
    // COPY: john="john"
    const response = await client.chat.unreadCounts({ user_id: john });

    console.log(response.total_unread_threads_count);

    for (const thread of response.threads) {
      console.log(thread.parent_message_id);
      console.log(thread.unread_count);
      console.log(thread.last_read);
    }
    // #endregion snippet

    logSpy.mockRestore();

    expect(response.total_unread_threads_count).toBeGreaterThan(0);
    const thread = response.threads.find(
      (t) => t.parent_message_id === parentMessageId,
    );
    expect(thread?.unread_count).toBeGreaterThan(0);
  });
});
