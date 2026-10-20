import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type {
  GetAppealResponse,
  QueryAppealsResponse,
  QueryReviewQueueResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage, waitForReviewItem } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/06-review-queue/03-appeals.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  const channelId = uniqueId('appeals-channel');
  const cid = `messaging:${channelId}`;
  const blockedWord = 'frobnicate';
  const blocklist = uniqueId('blocklist');
  // A channel-level policy, so only this test's channel is moderated by it.
  const configKey = `chat:${cid}`;

  /** Creates a channel member with a `uniqueId` id. */
  const createMember = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    await client.chat
      .channel('messaging', channelId)
      .update({ add_members: [{ user_id: id }] });
    return id;
  };

  /**
   * Sends a message of a new member, flags it and deletes it as the moderator (an
   * unreviewed flag can't be appealed). Returns the creator, message and item ids.
   */
  const deletedMessage = async () => {
    const creatorId = await createMember('creator');
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
    await client.moderation.submitAction({
      action_type: 'delete_message',
      item_id: item.id,
      user_id: moderatorId,
    });
    return { creatorId, messageId: message.id, itemId: item.id };
  };

  /** Appeals a deleted message as its creator and returns the appeal id. */
  const appealDeletedMessage = async () => {
    const { creatorId, messageId, itemId } = await deletedMessage();
    const { appeal_id } = await client.moderation.appeal({
      appeal_reason: 'Not spam',
      entity_id: messageId,
      entity_type: 'stream:chat:v1:message',
      user_id: creatorId,
    });
    return { appealId: appeal_id, itemId };
  };

  /** Bans a new member app-wide and returns its id. */
  const bannedUser = async () => {
    const id = await createMember('banned');
    await client.moderation.ban({
      target_user_id: id,
      banned_by_id: moderatorId,
      reason: 'spam',
    });
    return id;
  };

  const getAppeal = async (id: string) =>
    (await client.moderation.getAppeal({ id })).item;

  const getBans = async (userId: string) =>
    (
      await client.queryBannedUsers({
        payload: { filter_conditions: { user_id: userId } },
      })
    ).bans;

  beforeAll(async () => {
    cleanup.users.push(moderatorId);
    await client.upsertUsers([{ id: moderatorId, role: 'admin' }]);
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: moderatorId } });
    cleanup.channels.push(cid);

    await client.createBlockList({ name: blocklist, words: [blockedWord] });
    cleanup.add(() => client.deleteBlockList({ name: blocklist }));
    // A new blocklist isn't known to the moderation API right away.
    await retry(
      () =>
        client.moderation.upsertConfig({
          key: configKey,
          block_list_config: { rules: [{ name: blocklist, action: 'remove' }] },
        }),
      { retryIf: (error) => String(error).includes('Blocklist not found') },
    );
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('appeals against deleted content', async () => {
    const { creatorId, messageId } = await deletedMessage();
    const contentEntityId = messageId;
    const userId = creatorId;
    const appeal = vi.spyOn(client.moderation, 'appeal');

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Submit Appeal" tab="Node.js" index=1
    await client.moderation.appeal({
      appeal_reason: 'I believe my message was wrongfully blocked',
      entity_id: contentEntityId,
      entity_type: 'stream:chat:v1:message',
      attachments: ['imageurl'],
      user_id: userId,
    });
    // #endregion snippet

    const { appeal_id } = await (appeal.mock.results[0].value as ReturnType<
      typeof client.moderation.appeal
    >);
    const item = await getAppeal(appeal_id);
    expect(item).toMatchObject({
      entity_id: messageId,
      entity_type: 'stream:chat:v1:message',
      appeal_reason: 'I believe my message was wrongfully blocked',
      attachments: ['imageurl'],
      status: 'submitted',
      channel_cid: cid,
    });
    expect(item?.user?.id).toBe(creatorId);
  });

  it('appeals against a user ban', async () => {
    const userId = await bannedUser();
    const appeal = vi.spyOn(client.moderation, 'appeal');

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Example: Appeal Against User Ban" tab="Node.js" index=1
    await client.moderation.appeal({
      appeal_reason: 'Appeal to unban me',
      entity_id: userId,
      entity_type: 'stream:user',
      attachments: ['imageurl'],
      user_id: userId,
    });
    // #endregion snippet

    const { appeal_id } = await (appeal.mock.results[0].value as ReturnType<
      typeof client.moderation.appeal
    >);
    const item = await getAppeal(appeal_id);
    expect(item).toMatchObject({
      entity_id: userId,
      entity_type: 'stream:user',
      status: 'submitted',
    });
    // The global ban: no channel.
    expect(item?.channel_cid ?? '').toBe('');
  });

  it('appeals against a channel-specific ban', async () => {
    const userId = await createMember('channel-banned');
    // Banned app-wide and in the channel, so the appeal must name the channel ban.
    await client.moderation.ban({
      target_user_id: userId,
      banned_by_id: moderatorId,
      reason: 'spam',
    });
    await client.moderation.ban({
      target_user_id: userId,
      banned_by_id: moderatorId,
      reason: 'spam',
      channel_cid: cid,
    });
    const channelCid = cid;
    const appeal = vi.spyOn(client.moderation, 'appeal');

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Example: Appeal Against a Channel-Specific Ban" tab="Node.js" index=1
    // COPY: channelCid="messaging:general"
    await client.moderation.appeal({
      appeal_reason: 'I was wrongly banned from this channel',
      entity_id: userId,
      entity_type: 'stream:user',
      channel_cid: channelCid,
      user_id: userId,
    });
    // #endregion snippet

    const { appeal_id } = await (appeal.mock.results[0].value as ReturnType<
      typeof client.moderation.appeal
    >);
    expect(await getAppeal(appeal_id)).toMatchObject({
      entity_id: userId,
      entity_type: 'stream:user',
      channel_cid: cid,
      status: 'submitted',
    });
  });

  it('queries appeals', async () => {
    const { appealId } = await appealDeletedMessage();
    const queryAppeals = vi.spyOn(client.moderation, 'queryAppeals');

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Query Appeals" tab="Node.js" index=1
    // COPY: appealId="appeal_id"
    await client.moderation.queryAppeals({
      filter: {
        id: { $eq: appealId },
      },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 20,
    });
    // #endregion snippet

    const { items } = await (queryAppeals.mock.results[0]
      .value as Promise<QueryAppealsResponse>);
    expect(items.map((item) => item.id)).toEqual([appealId]);
  });

  it('gets an appeal', async () => {
    const { appealId } = await appealDeletedMessage();
    const getAppealSpy = vi.spyOn(client.moderation, 'getAppeal');

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Get Appeal" tab="Node.js" index=1
    // COPY: appealId="appeal_id"
    await client.moderation.getAppeal({ id: appealId });
    // #endregion snippet

    const { item } = await (getAppealSpy.mock.results[0]
      .value as Promise<GetAppealResponse>);
    expect(item).toMatchObject({ id: appealId, status: 'submitted' });
  });

  it('accepts appeals while unbanning and restoring', async () => {
    // A ban appeal.
    const bannedId = await bannedUser();
    const { appeal_id: appealId } = await client.moderation.appeal({
      appeal_reason: 'Appeal to unban me',
      entity_id: bannedId,
      entity_type: 'stream:user',
      user_id: bannedId,
    });
    // A message blocked by the channel's policy, and its creator's appeal.
    const blockedCreator = await createMember('blocked');
    const blocked = await retry(async () => {
      const message = await sendServerMessage(
        client,
        cid,
        { text: `you ${blockedWord}`, user_id: blockedCreator },
        { force_moderation: true },
      );
      expect(message.type).toBe('error');
      return message;
    });
    const itemId = (await waitForReviewItem(client, blocked.id)).id;
    const { appeal_id: blockedAppealId } = await client.moderation.appeal({
      appeal_reason: 'Not offensive',
      entity_id: blocked.id,
      entity_type: 'stream:chat:v1:message',
      user_id: blockedCreator,
    });

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Accepting Appeals" tab="Node.js" index=1
    // COPY: appealId="appeal_id", itemId="item_id"
    // Approve appeal while unbanning user
    await client.moderation.submitAction({
      action_type: 'unban',
      appeal_id: appealId,
      unban: {
        decision_reason: 'I am unbanning a user',
        // channel_cid: "messaging:general", // optional: unban in this channel only
      },
      user_id: moderatorId,
    });

    // Approve appeal while restoring content
    await client.moderation.submitAction({
      action_type: 'restore',
      item_id: itemId,
      restore: { decision_reason: 'I am restoring content' },
      user_id: moderatorId,
    });
    // #endregion snippet

    expect(await getAppeal(appealId)).toMatchObject({
      status: 'accepted',
      decision_reason: 'I am unbanning a user',
    });
    expect(await getBans(bannedId)).toEqual([]);
    expect(await getAppeal(blockedAppealId)).toMatchObject({
      status: 'accepted',
      decision_reason: 'I am restoring content',
    });
    const { message } = await client.chat.getMessage({ id: blocked.id });
    expect(message.type).toBe('regular');
  });

  it('rejects an appeal', async () => {
    const bannedId = await bannedUser();
    const { appeal_id: appealId } = await client.moderation.appeal({
      appeal_reason: 'Appeal to unban me',
      entity_id: bannedId,
      entity_type: 'stream:user',
      user_id: bannedId,
    });

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Rejecting Appeals" tab="Node.js" index=1
    // COPY: appealId="appeal_id"
    await client.moderation.submitAction({
      action_type: 'reject_appeal',
      appeal_id: appealId,
      reject_appeal: {
        decision_reason: 'I am rejecting your appeal',
      },
      user_id: moderatorId,
    });
    // #endregion snippet

    expect(await getAppeal(appealId)).toMatchObject({
      status: 'rejected',
      decision_reason: 'I am rejecting your appeal',
    });
    // The ban stays.
    expect(await getBans(bannedId)).toHaveLength(1);
  });

  it('queries review queue items with appeals', async () => {
    const { appealId, itemId } = await appealDeletedMessage();
    // A newer item without an appeal, which the appeal filters must leave out.
    const { itemId: withoutAppeal } = await deletedMessage();
    const queryReviewQueue = vi.spyOn(client.moderation, 'queryReviewQueue');

    // #region snippet docs="moderation/_default/06-review-queue/03-appeals.md" heading="Example: Query Review Queue Items with Appeals" tab="Node.js" index=1
    // COPY: appealId="appeal_id"
    // Query items with submitted appeals
    await client.moderation.queryReviewQueue({
      filter: {
        appeal: true,
        appeal_status: 'submitted',
      },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 20,
    });

    // Query items with a specific appeal
    await client.moderation.queryReviewQueue({
      filter: {
        appeal_id: { $eq: appealId },
      },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 20,
    });
    // #endregion snippet

    const [submitted, byAppeal] = await Promise.all(
      queryReviewQueue.mock.results.map(
        (result) => result.value as Promise<QueryReviewQueueResponse>,
      ),
    );
    // The newest item with a submitted appeal comes first, not the newer one without.
    expect(submitted.items[0].id).toBe(itemId);
    expect(submitted.items.map((item) => item.id)).not.toContain(withoutAppeal);
    expect(byAppeal.items.map((item) => item.id)).toEqual([itemId]);
  });
});
