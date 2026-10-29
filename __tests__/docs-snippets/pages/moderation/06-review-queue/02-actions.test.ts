import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { nsToMs } from '../../../../../index';
import type { UpsertActionConfigResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage, waitForReviewItem } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/06-review-queue/02-actions.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  const channelId = uniqueId('actions-channel');
  const cid = `messaging:${channelId}`;
  const upsertConfig = client.moderation.upsertConfig.bind(client.moderation);

  /**
   * Flags a fresh message of a new member (so bans of one test don't affect the
   * others) and returns its review queue item, the creator and the message id.
   */
  const flagMessage = async () => {
    const creatorId = uniqueId('creator');
    cleanup.users.push(creatorId);
    await client.upsertUsers([{ id: creatorId }]);
    await client.chat
      .channel('messaging', channelId)
      .update({ add_members: [{ user_id: creatorId }] });
    const message = await sendServerMessage(client, cid, {
      text: 'buy cheap followers now',
      user_id: creatorId,
    });
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: message.id,
      entity_creator_id: creatorId,
      reason: 'spam',
      user_id: moderatorId,
    });
    const item = await waitForReviewItem(client, message.id);
    return { itemId: item.id, creatorId, messageId: message.id };
  };

  const getItem = async (id: string) =>
    (await client.moderation.getReviewQueueItem({ id })).item;

  const getBans = async (userId: string) =>
    (
      await client.queryBannedUsers({
        payload: { filter_conditions: { user_id: userId } },
      })
    ).bans;

  /** Creates a new channel as the channel creator (the moderator), with `userId` as member. */
  const createChannelWith = async (userId: string) => {
    const channel = client.chat.channel('messaging', uniqueId('new-channel'));
    await channel.getOrCreate({
      data: { created_by_id: moderatorId, members: [{ user_id: userId }] },
    });
    cleanup.channels.push(channel.cid);
    const { members } = await channel.getOrCreate({ state: true });
    return members.find((member) => member.user_id === userId);
  };

  beforeAll(async () => {
    cleanup.users.push(moderatorId);
    await client.upsertUsers([{ id: moderatorId, role: 'admin' }]);
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: moderatorId } });
    cleanup.channels.push(cid);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('marks an item as reviewed', async () => {
    const { itemId } = await flagMessage();
    expect((await getItem(itemId))?.reviewed_at).toBeFalsy();

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Submit Action" tab="Node.js" index=1
    // COPY: itemId="review_queue_item_id"
    await client.moderation.submitAction({
      action_type: 'mark_reviewed',
      item_id: itemId,
      user_id: moderatorId,
    });
    // #endregion snippet

    const item = await getItem(itemId);
    expect(item?.latest_moderator_action).toBe('mark_reviewed');
    expect(item?.reviewed_at).toBeTruthy();
    expect(item?.reviewed_by).toBe(moderatorId);
  });

  it('deletes a flagged message', async () => {
    const { itemId, messageId } = await flagMessage();

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Delete Message" tab="Node.js" index=1
    // COPY: itemId="review_queue_item_id"
    await client.moderation.submitAction({
      action_type: 'delete_message',
      item_id: itemId,
      user_id: moderatorId,
    });
    // #endregion snippet

    const { message } = await client.chat.getMessage({ id: messageId });
    expect(message.deleted_at).toBeTruthy();
    expect((await getItem(itemId))?.latest_moderator_action).toBe(
      'delete_message',
    );
  });

  it('bans the content creator from the channel', async () => {
    const { itemId, creatorId } = await flagMessage();

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Ban User" tab="Node.js" index=1
    // COPY: itemId="review_queue_item_id", cid="messaging:general"
    await client.moderation.submitAction({
      action_type: 'ban',
      item_id: itemId,
      ban: {
        reason: 'Repeated harassment',
        timeout: 1440,
        channel_cid: cid,
        channel_ban_only: true,
      },
      user_id: moderatorId,
    });
    // #endregion snippet

    // A channel ban in the flagged message's channel, not an app-wide one.
    const bans = await getBans(creatorId);
    expect(bans).toHaveLength(1);
    expect(bans[0].channel?.cid).toBe(cid);
    expect(bans[0].reason).toBe('Repeated harassment');
    expect(bans[0].expires).toBeDefined();
    expect(nsToMs(bans[0].expires ?? 0) - nsToMs(bans[0].created_at)).toBe(
      1440 * 60 * 1000,
    );
    const { users } = await client.queryUsers({
      payload: { filter_conditions: { id: creatorId } },
    });
    expect(users[0].banned).toBe(false);
  });

  it('bans from future channels and removes that ban', async () => {
    const { itemId, creatorId } = await flagMessage();

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Ban from Future Channels" tab="Node.js" index=1
    // COPY: itemId="review_queue_item_id"
    await client.moderation.submitAction({
      action_type: 'ban',
      item_id: itemId,
      ban: {
        reason: 'Repeated harassment',
        ban_from_future_channels: true,
      },
      user_id: moderatorId,
    });
    // #endregion snippet

    // A new channel of the same channel creator bans the user on join.
    expect((await createChannelWith(creatorId))?.banned).toBe(true);
    expect((await getBans(creatorId)).some((ban) => !ban.channel)).toBe(true);

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Ban from Future Channels" tab="Node.js" index=2
    // COPY: itemId="review_queue_item_id"
    await client.moderation.submitAction({
      action_type: 'unban',
      item_id: itemId,
      unban: {
        remove_future_channels_ban: true,
      },
      user_id: moderatorId,
    });
    // #endregion snippet

    expect((await getItem(itemId))?.latest_moderator_action).toBe('unban');
    expect((await createChannelWith(creatorId))?.banned).toBe(false);
    expect((await getBans(creatorId)).some((ban) => !ban.channel)).toBe(false);
  });

  it('restores deleted content', async () => {
    const { itemId, messageId } = await flagMessage();
    await client.moderation.submitAction({
      action_type: 'delete_message',
      item_id: itemId,
      user_id: moderatorId,
    });
    expect(
      (await client.chat.getMessage({ id: messageId })).message.deleted_at,
    ).toBeTruthy();

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Restore Content" tab="Node.js" index=1
    // COPY: itemId="review_queue_item_id"
    await client.moderation.submitAction({
      action_type: 'restore',
      item_id: itemId,
      restore: { decision_reason: 'Content was incorrectly flagged' },
      user_id: moderatorId,
    });
    // #endregion snippet

    const { message } = await client.chat.getMessage({ id: messageId });
    expect(message.deleted_at).toBeUndefined();
    expect((await getItem(itemId))?.latest_moderator_action).toBe('restore');
  });

  it('triggers a custom action', async () => {
    const { itemId } = await flagMessage();

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Custom Action" tab="Node.js" index=1
    // COPY: itemId="review_queue_item_id"
    await client.moderation.submitAction({
      action_type: 'custom',
      item_id: itemId,
      custom: {
        id: 'notify_user',
        options: { notification: 'Your content has been reviewed' },
      },
      user_id: moderatorId,
    });
    // #endregion snippet

    const item = await getItem(itemId);
    expect(item?.latest_moderator_action).toBe('custom:notify_user');
    expect(item?.actions.map((action) => action.type)).toContain(
      'custom:notify_user',
    );
  });

  it('customizes a review queue button', async () => {
    const entityType = 'stream:chat:v1:message';
    /** The app's own (non-default) buttons for chat messages. */
    const listButtons = async () =>
      (
        await client.moderation.getActionConfig({
          entity_type: entityType,
          exclude_defaults: true,
        })
      ).action_config[entityType] ?? [];
    const original = await listButtons();
    const upsertActionConfig = vi.spyOn(
      client.moderation,
      'upsertActionConfig',
    );

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Customize review queue buttons" tab="Node.js" index=1
    await client.moderation.upsertActionConfig({
      entity_type: 'stream:chat:v1:message',
      order: 1,
      action: 'delete_message',
      description: 'Delete message',
    });
    // #endregion snippet

    const [{ action_config: created }] = await Promise.all(
      upsertActionConfig.mock.results.map(
        (r) => r.value as Promise<UpsertActionConfigResponse>,
      ),
    );
    const createdId = created?.id;
    if (!createdId) throw new Error('upsertActionConfig returned no id');
    // Without an `id` the request creates a new button (the app's own buttons stay).
    expect(original.map(({ id }) => id)).not.toContain(createdId);
    cleanup.add(async () => {
      await client.moderation.deleteActionConfig({ id: createdId });
      expect((await listButtons()).map(({ id }) => id)).toEqual(
        original.map(({ id }) => id),
      );
    });
    expect(created).toMatchObject({
      entity_type: 'stream:chat:v1:message',
      order: 1,
      action: 'delete_message',
      description: 'Delete message',
    });
    expect(
      (await listButtons()).find(({ id }) => id === createdId),
    ).toMatchObject({
      action: 'delete_message',
      description: 'Delete message',
    });
  });

  it('masks blocklist matches with mask_flag', async () => {
    // The docs' app-wide "chat" policy, test-owned: a channel-level policy of a new
    // channel, so only that channel is moderated by it.
    const maskChannelId = uniqueId('mask-channel');
    const maskCid = `messaging:${maskChannelId}`;
    const chatConfigKey = `chat:${maskCid}`;
    const blocklistName = uniqueId('phone-numbers');
    await client.chat
      .channel('messaging', maskChannelId)
      .getOrCreate({ data: { created_by_id: moderatorId } });
    cleanup.channels.push(maskCid);
    await client.createBlockList({
      name: blocklistName,
      words: ['frobnicate'],
    });
    cleanup.add(() => client.deleteBlockList({ name: blocklistName }));
    cleanup.add(() => client.moderation.deleteConfig({ key: chatConfigKey }));
    // A new blocklist isn't known to the moderation API right away.
    vi.spyOn(client.moderation, 'upsertConfig').mockImplementation((request) =>
      retry(() => upsertConfig(request), {
        retryIf: (error) => String(error).includes('Blocklist not found'),
      }),
    );

    // #region snippet docs="moderation/_default/06-review-queue/02-actions.md" heading="Mask" tab="Node.js" index=1
    // COPY: chatConfigKey="chat"
    await client.moderation.upsertConfig({
      key: chatConfigKey,
      block_list_config: {
        enabled: true,
        rules: [{ name: blocklistName, action: 'mask_flag', team: '' }],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({
      key: chatConfigKey,
    });
    expect(config?.block_list_config?.rules).toMatchObject([
      { name: blocklistName, action: 'mask_flag' },
    ]);
    // A matching message is published with the word masked, and flagged.
    const senderId = uniqueId('sender');
    cleanup.users.push(senderId);
    await client.upsertUsers([{ id: senderId }]);
    const message = await retry(async () => {
      const sent = await sendServerMessage(
        client,
        maskCid,
        { text: 'please frobnicate now', user_id: senderId },
        { force_moderation: true },
      );
      // The matched word is replaced (on the test app with four U+26B9 characters,
      // whatever the word's length, 2026-10-29).
      expect(sent.text).not.toContain('frobnicate');
      expect(sent.text).toMatch(/^please \S+ now$/);
      return sent;
    });
    expect(message.type).toBe('regular');
    const item = await waitForReviewItem(client, message.id);
    expect(item.entity_id).toBe(message.id);
  });
});
