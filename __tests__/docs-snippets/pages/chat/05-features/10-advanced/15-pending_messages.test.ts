import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { StreamClient } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerChannel } from '../../../../helpers/server';
import { retry, waitForChannelTypePropagation } from '../../../../helpers/wait';

const DOCS = 'chat/_default/05-features/10-advanced/15-pending_messages.md';

const PENDING_HOOK_URL = 'https://example.com/pending-messages';

/** Sends a pending message as `userId` to `messaging:<channelId>` and returns its id. */
const sendPending = async (
  client: StreamClient,
  channelId: string,
  userId: string,
  text: string,
) => {
  const response = await client.chat
    .channel('messaging', channelId)
    .sendMessage({ message: { text, user_id: userId }, pending: true });
  return response.message.id;
};

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const senderId = uniqueId('sender');
  const otherId = uniqueId('other');
  // The docs' "user-id" is the sender.
  const userId = senderId;
  const members = [{ user_id: senderId }, { user_id: otherId }];

  // The first snippet changes the channel type it names: use a uniqueId type instead
  // of the built-in `messaging` type.
  const channelType = uniqueId('messaging');
  const typeChannelId = uniqueId('pending-by-type');
  const channelId = uniqueId('pending');

  beforeAll(async () => {
    cleanup.users.push(senderId, otherId);
    await client.upsertUsers([{ id: senderId }, { id: otherId }]);

    await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(channelType);
    await waitForChannelTypePropagation();

    await client.chat
      .channel(channelType, typeChannelId)
      .getOrCreate({ data: { created_by_id: senderId, members } });
    cleanup.channels.push(`${channelType}:${typeChannelId}`);

    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: senderId, members } });
    cleanup.channels.push(`messaging:${channelId}`);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Sending Pending Messages (channel config)', async () => {
    const before = await client.chat.getChannelType({ name: channelType });
    expect(before.mark_messages_pending).toBe(false);

    // #region snippet docs="chat/_default/05-features/10-advanced/15-pending_messages.md" heading="Sending Pending Messages" tab="Node.js" index=1
    // COPY: channelType="messaging"
    const response = await client.chat.updateChannelType({
      name: channelType,
      mark_messages_pending: true,
    });
    // #endregion snippet

    expect(response.mark_messages_pending).toBe(true);
    await waitForChannelTypePropagation();

    // A message sent without `pending` is now pending: only the sender sees it.
    const cid = `${channelType}:${typeChannelId}`;
    const { message } = await client.chat
      .channel(channelType, typeChannelId)
      .sendMessage({
        message: { text: 'pending by default', user_id: senderId },
      });

    const senderView = await getServerChannel(client, cid, {
      user_id: senderId,
      message_limit: 10,
    });
    expect(senderView.pending_messages?.map((p) => p.message?.id)).toEqual([
      message.id,
    ]);
    const otherView = await getServerChannel(client, cid, {
      user_id: otherId,
      message_limit: 10,
    });
    expect(otherView.messages.map((m) => m.id)).not.toContain(message.id);
  });

  it('Sending Pending Messages (per message)', async () => {
    // #region snippet docs="chat/_default/05-features/10-advanced/15-pending_messages.md" heading="Sending Pending Messages" tab="Node.js" index=2
    // COPY: channelId="channel-id", userId="user-id"
    const channel = client.chat.channel('messaging', channelId);

    const message = await channel.sendMessage({
      message: {
        text: 'this is my pending message',
        user_id: userId,
      },
      pending: true,
      pending_message_metadata: {
        my: 'metadata',
      },
    });
    // #endregion snippet

    expect(message.pending_message_metadata).toEqual({ my: 'metadata' });

    const cid = `messaging:${channelId}`;
    const senderView = await getServerChannel(client, cid, {
      user_id: userId,
      message_limit: 10,
    });
    expect(
      senderView.pending_messages?.find(
        (p) => p.message?.id === message.message.id,
      )?.metadata,
    ).toEqual({ my: 'metadata' });
    const otherView = await getServerChannel(client, cid, {
      user_id: otherId,
      message_limit: 10,
    });
    expect(otherView.messages.map((m) => m.id)).not.toContain(
      message.message.id,
    );
  });
  it('Querying pending messages', async () => {
    const pendingId = await sendPending(client, channelId, senderId, 'one');
    const pendingId1 = pendingId;
    const pendingId2 = await sendPending(client, channelId, senderId, 'two');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/05-features/10-advanced/15-pending_messages.md" heading="Querying pending messages" tab="Node.js" index=1
    // COPY: pendingId="pending_message_id", pendingId1="pending_message_id_1", pendingId2="pending_message_id_2", channelId="channel-id"
    // To retrieve single message
    const response = await client.chat.getMessage({ id: pendingId });
    console.log(response.message, response.pending_message_metadata);

    // To retrieve multiple messages
    const channel = client.chat.channel('messaging', channelId);
    const messagesResponse = await channel.getManyMessages({
      ids: [pendingId1, pendingId2],
    });
    console.log(messagesResponse.messages);
    // #endregion snippet

    expect(response.message.id).toBe(pendingId);
    expect(messagesResponse.messages.map((m) => m.id).sort()).toEqual(
      [pendingId1, pendingId2].sort(),
    );
    expect(log).toHaveBeenCalledTimes(2);
  });

  it('Query channels', async () => {
    const pendingId = await sendPending(client, channelId, senderId, 'qc');
    const filters = { cid: `messaging:${channelId}` };
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/05-features/10-advanced/15-pending_messages.md" heading="Query channels" tab="Node.js" index=1
    // COPY: channelId="channel_id", userId="user-id"
    // Quering multiple channels
    const response = await client.chat.queryChannels({
      filter_conditions: filters,
      user_id: userId,
    });
    console.log(response.channels[0].pending_messages);

    // Querying single channel
    const channel = client.chat.channel('messaging', channelId);
    const channelResponse = await channel.get({ state: true, user_id: userId });
    console.log(channelResponse.pending_messages);
    // #endregion snippet

    const ids = (calls: unknown) =>
      (calls as Array<{ message?: { id: string } }> | undefined)?.map(
        (p) => p.message?.id,
      );
    expect(ids(log.mock.calls[0][0])).toContain(pendingId);
    expect(ids(log.mock.calls[1][0])).toContain(pendingId);
    expect(
      channelResponse.pending_messages?.map((p) => p.message?.id),
    ).toContain(pendingId);
  });

  it('Committing pending messages', async () => {
    const messageId = await sendPending(client, channelId, senderId, 'commit');
    const cid = `messaging:${channelId}`;
    const otherBefore = await getServerChannel(client, cid, {
      user_id: otherId,
      message_limit: 25,
    });
    expect(otherBefore.messages.map((m) => m.id)).not.toContain(messageId);

    // #region snippet docs="chat/_default/05-features/10-advanced/15-pending_messages.md" heading="Committing pending messages" tab="Node.js" index=1
    // COPY: messageId="message-1"
    await client.chat.commitMessage({ id: messageId });
    // #endregion snippet

    const otherAfter = await getServerChannel(client, cid, {
      user_id: otherId,
      message_limit: 25,
    });
    expect(otherAfter.messages.map((m) => m.id)).toContain(messageId);
    // "Only the first commit to a pending message will succeed"
    await expect(client.chat.commitMessage({ id: messageId })).rejects.toThrow(
      /is no longer pending/,
    );
  });

  it('Using Server-Side SDKs (pending message hook)', async () => {
    const originalHooks = (await client.getApp()).app.event_hooks;
    cleanup.add(async () => {
      await client.updateApp({ event_hooks: originalHooks });
      await retry(async () => {
        const { app } = await client.getApp();
        if (app.event_hooks.some((h) => h.webhook_url === PENDING_HOOK_URL)) {
          throw new Error('pending message hook still there');
        }
      });
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/05-features/10-advanced/15-pending_messages.md" heading="Using Server-Side SDKs" tab="Node.js" index=1
    // Note: Any previously existing hooks not included in event_hooks array will be deleted.
    // Get current settings first to preserve your existing configuration.

    // STEP 1: Get current app settings to preserve existing hooks
    const { app } = await client.getApp();
    console.log('Current event hooks:', app.event_hooks);

    // STEP 2: Add pending message hook while preserving existing hooks
    const existingHooks = app.event_hooks || [];

    // STEP 3: Update with complete array including existing hooks
    await client.updateApp({
      event_hooks: [
        ...existingHooks,
        {
          enabled: true,
          hook_type: 'pending_message',
          webhook_url: 'https://example.com/pending-messages',
          timeout_ms: 10000, // how long messages should stay pending before being deleted
          callback: {
            mode: 'CALLBACK_MODE_REST',
          },
        },
      ],
    });
    // #endregion snippet

    expect(log).toHaveBeenCalledWith('Current event hooks:', app.event_hooks);
    const hooks = await retry(async () => {
      const { app: updated } = await client.getApp();
      if (
        !updated.event_hooks.some((h) => h.webhook_url === PENDING_HOOK_URL)
      ) {
        throw new Error('pending message hook not there yet');
      }
      return updated.event_hooks;
    });
    expect(hooks.map((h) => h.id)).toEqual(
      expect.arrayContaining(originalHooks.map((h) => h.id)),
    );
    expect(hooks.find((h) => h.webhook_url === PENDING_HOOK_URL)).toMatchObject(
      {
        enabled: true,
        hook_type: 'pending_message',
        timeout_ms: 10000,
        callback: { mode: 'CALLBACK_MODE_REST' },
      },
    );
  });
});
