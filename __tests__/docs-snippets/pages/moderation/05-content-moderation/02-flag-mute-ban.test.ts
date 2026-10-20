import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { StreamClient, UserResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  getServerUser,
  sendServerMessage,
  waitForReviewItem,
} from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/05-content-moderation/02-flag-mute-ban.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  const channelId = uniqueId('mod-channel');
  const cid = `messaging:${channelId}`;

  /** A fresh `uniqueId` user, removed in cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A message by `userId` in the test channel. */
  const sendMessage = async (userId: string) => {
    const message = await sendServerMessage(client, cid, {
      text: 'buy cheap followers now',
      user_id: userId,
    });
    return message.id;
  };

  beforeAll(async () => {
    cleanup.users.push(moderatorId);
    await client.upsertUsers([{ id: moderatorId, role: 'admin' }]);
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: moderatorId } });
    cleanup.channels.push(cid);
  });

  afterAll(() => cleanup.run());

  it('flags a message', async () => {
    const creatorId = await createUser('creator');
    const messageId = await sendMessage(creatorId);

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Flag Content" tab="Node.js" index=1
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId,
      entity_creator_id: creatorId,
      reason: 'spam',
      custom: { user_comment: 'This user is spamming the channel' },
      user_id: moderatorId,
    });
    // #endregion snippet

    const item = await waitForReviewItem(client, messageId);
    expect(item).toMatchObject({
      entity_type: 'stream:chat:v1:message',
      entity_creator_id: creatorId,
    });
    expect(item.flags[0]).toMatchObject({
      reason: 'spam',
      user_id: moderatorId,
      custom: { user_comment: 'This user is spamming the channel' },
    });
  });

  it('flags a user', async () => {
    const targetUserId = await createUser('flagged-user');

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Flag a User" tab="Node.js" index=1
    await client.moderation.flag({
      entity_type: 'stream:user',
      entity_id: targetUserId,
      reason: 'harassment',
      user_id: moderatorId,
    });
    // #endregion snippet

    const item = await waitForReviewItem(client, targetUserId);
    expect(item.entity_type).toBe('stream:user');
    expect(item.flags[0]).toMatchObject({
      reason: 'harassment',
      user_id: moderatorId,
    });
  });

  it('queries moderation flags', async () => {
    // The filter matches every message flag of the app: flag a fresh message just
    // before, so it is the newest one.
    const creatorId = await createUser('flag-query-creator');
    const messageId = await sendMessage(creatorId);
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId,
      entity_creator_id: creatorId,
      reason: 'spam',
      user_id: moderatorId,
    });
    await waitForReviewItem(client, messageId);

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Query Moderation Flags" tab="Node.js" index=1
    const response = await client.moderation.queryModerationFlags({
      filter: { entity_type: 'stream:chat:v1:message' },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 20,
    });
    // #endregion snippet

    expect(response.flags.length).toBeGreaterThan(0);
    expect(response.flags.length).toBeLessThanOrEqual(20);
    expect(response.flags[0]).toMatchObject({
      entity_id: messageId,
      reason: 'spam',
      user_id: moderatorId,
    });
    expect(
      response.flags.every((f) => f.entity_type === 'stream:chat:v1:message'),
    ).toBe(true);
  });

  it('mutes a user', async () => {
    const mutingUserId = await createUser('muting-user');
    const mutedUser = await createUser('user-to-mute');

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Mute User" tab="Node.js" index=1
    // COPY: mutedUser="user_to_mute"
    await client.moderation.mute({
      target_ids: [mutedUser],
      user_id: mutingUserId,
      timeout: 60,
    });
    // #endregion snippet

    const { mutes } = await getServerUser(client, mutingUserId);
    expect(mutes.map((m) => m.target?.id)).toEqual([mutedUser]);
    // 60 minutes
    expect(
      (mutes[0].expires?.getTime() ?? 0) - mutes[0].created_at.getTime(),
    ).toBe(60 * 60 * 1000);
  });

  it('unmutes a user', async () => {
    const unmutingUserId = await createUser('unmuting-user');
    const unmutedUser = await createUser('user-to-unmute');
    await client.moderation.mute({
      target_ids: [unmutedUser],
      user_id: unmutingUserId,
    });
    const before = await getServerUser(client, unmutingUserId);
    expect(before.mutes.map((m) => m.target?.id)).toEqual([unmutedUser]);

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Unmute User" tab="Node.js" index=1
    // COPY: unmutedUser="user_to_unmute"
    await client.moderation.unmute({
      target_ids: [unmutedUser],
      user_id: unmutingUserId,
    });
    // #endregion snippet

    const after = await getServerUser(client, unmutingUserId);
    expect(after.mutes).toEqual([]);
  });

  it('bans a user from the app', async () => {
    const banTarget = await createUser('user-to-ban');

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Ban User" tab="Node.js" index=1
    // COPY: banTarget="user_to_ban"
    await client.moderation.ban({
      target_user_id: banTarget,
      banned_by_id: moderatorId,
      reason: 'Repeated spam',
      timeout: 1440,
    });
    // #endregion snippet

    const user = await getServerUser(client, banTarget);
    expect(user.banned).toBe(true);
    const { bans } = await client.queryBannedUsers({
      payload: { filter_conditions: { user_id: { $eq: banTarget } } },
    });
    expect(bans).toHaveLength(1);
    expect(bans[0]).toMatchObject({ reason: 'Repeated spam' });
    expect(bans[0].banned_by?.id).toBe(moderatorId);
    expect(bans[0].channel).toBeUndefined();
    // 1440 minutes
    expect(
      (bans[0].expires?.getTime() ?? 0) - bans[0].created_at.getTime(),
    ).toBe(1440 * 60 * 1000);
  });

  it('bans a user from one channel', async () => {
    const channelBanTarget = await createUser('channel-ban-target');
    await client.chat
      .channel('messaging', channelId)
      .update({ add_members: [{ user_id: channelBanTarget }] });

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Channel-Scoped Ban" tab="Node.js" index=1
    // COPY: channelBanTarget="user_to_ban", cid="messaging:general"
    await client.moderation.ban({
      target_user_id: channelBanTarget,
      banned_by_id: moderatorId,
      channel_cid: cid,
      reason: 'Trolling in this channel',
      timeout: 60,
    });
    // #endregion snippet

    // Not banned app-wide, only in the channel.
    const user = await getServerUser(client, channelBanTarget);
    expect(user.banned).toBe(false);
    const { bans } = await client.queryBannedUsers({
      payload: { filter_conditions: { user_id: { $eq: channelBanTarget } } },
    });
    expect(bans).toHaveLength(1);
    expect(bans[0]).toMatchObject({ reason: 'Trolling in this channel' });
    expect(bans[0].channel?.cid).toBe(cid);
  });

  it('shadow bans a user', async () => {
    const shadowBanTarget = await createUser('user-to-shadow-ban');

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Shadow Ban" tab="Node.js" index=1
    // COPY: shadowBanTarget="user_to_shadow_ban"
    await client.moderation.ban({
      target_user_id: shadowBanTarget,
      banned_by_id: moderatorId,
      reason: 'Disruptive behavior',
      shadow: true,
    });
    // #endregion snippet

    const user = await getServerUser(client, shadowBanTarget);
    expect(user.shadow_banned).toBe(true);
    expect(user.banned).toBe(false);
    const { bans } = await client.queryBannedUsers({
      payload: { filter_conditions: { user_id: { $eq: shadowBanTarget } } },
    });
    expect(bans).toHaveLength(1);
    expect(bans[0]).toMatchObject({
      reason: 'Disruptive behavior',
      shadow: true,
    });
  });

  it('unbans a user', async () => {
    const unbanTarget = await createUser('user-to-unban');
    await client.moderation.ban({
      target_user_id: unbanTarget,
      banned_by_id: moderatorId,
    });
    expect((await getServerUser(client, unbanTarget)).banned).toBe(true);

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Unban User" tab="Node.js" index=1
    // COPY: unbanTarget="user_to_unban"
    await client.moderation.unban({
      target_user_id: unbanTarget,
      created_by: moderatorId,
    });
    // #endregion snippet

    expect((await getServerUser(client, unbanTarget)).banned).toBe(false);
    const { bans } = await client.queryBannedUsers({
      payload: { filter_conditions: { user_id: { $eq: unbanTarget } } },
    });
    expect(bans).toEqual([]);
  });

  it('queries banned users', async () => {
    // Bans of `moderatorId`: an app-wide and a channel-scoped one, plus an expired one
    // (left out by `exclude_expired_bans`) by the same moderator.
    // Its own moderator (shadows the file's one), so the other tests' bans don't match.
    const moderatorId = await createUser('ban-query-moderator');
    const bannedUser = await createUser('banned-user');
    const channelBanned = await createUser('channel-banned-user');
    const expiredBanned = await createUser('expired-banned-user');
    const queryChannelId = uniqueId('ban-query-channel');
    const queryCid = `messaging:${queryChannelId}`;
    await client.chat.channel('messaging', queryChannelId).getOrCreate({
      data: {
        created_by_id: moderatorId,
        members: [{ user_id: channelBanned }],
      },
    });
    cleanup.channels.push(queryCid);
    await client.moderation.ban({
      target_user_id: bannedUser,
      banned_by_id: moderatorId,
      reason: 'app-wide',
    });
    await client.moderation.ban({
      target_user_id: channelBanned,
      banned_by_id: moderatorId,
      channel_cid: queryCid,
      reason: 'channel',
    });
    await client.moderation.ban({
      target_user_id: expiredBanned,
      banned_by_id: moderatorId,
      reason: 'expired',
      timeout: 1,
    });
    // Wait for the 1-minute ban to expire.
    await retry(
      async () => {
        const user = await getServerUser(client, expiredBanned);
        if ((user.ban_expires?.getTime() ?? Infinity) > Date.now()) {
          throw new Error('ban not expired yet');
        }
      },
      { timeout: 80000, interval: 5000 },
    );

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Query Banned Users" tab="Node.js" index=1
    // COPY: bannedUser="user_to_ban", queryCid="messaging:general"
    // All app-wide bans
    const response = await client.queryBannedUsers({
      payload: {
        filter_conditions: { banned_by_id: { $eq: moderatorId } },
        sort: [{ field: 'created_at', direction: -1 }],
        limit: 20,
        exclude_expired_bans: true,
      },
    });

    // Bans for a specific user
    const userBans = await client.queryBannedUsers({
      payload: {
        filter_conditions: { user_id: { $eq: bannedUser } },
      },
    });

    // Channel-scoped bans
    const channelBans = await client.queryBannedUsers({
      payload: {
        filter_conditions: { channel_cid: { $eq: queryCid } },
      },
    });
    // #endregion snippet

    // Newest first, expired ban left out.
    expect(response.bans.map((b) => b.user?.id)).toEqual([
      channelBanned,
      bannedUser,
    ]);
    expect(response.bans.map((b) => b.banned_by?.id)).toEqual([
      moderatorId,
      moderatorId,
    ]);
    expect(userBans.bans.map((b) => b.reason)).toEqual(['app-wide']);
    expect(channelBans.bans.map((b) => b.user?.id)).toEqual([channelBanned]);
    expect(channelBans.bans[0].channel?.cid).toBe(queryCid);
  }, 150000);

  it('blocks a user', async () => {
    const blockingUserId = await createUser('blocking-user');
    const blockedUser = await createUser('user-to-block');

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Block" tab="Node.js" index=1
    // COPY: blockedUser="user_to_block"
    await client.blockUsers({
      blocked_user_id: blockedUser,
      user_id: blockingUserId,
    });
    // #endregion snippet

    const { blocks } = await client.getBlockedUsers({
      user_id: blockingUserId,
    });
    expect(blocks.map((b) => b.blocked_user_id)).toEqual([blockedUser]);
  });

  it('enables moderation bypass for a user', async () => {
    const trustedUser = await createUser('trusted-user');
    expect(
      (await getServerUser(client, trustedUser)).bypass_moderation ?? false,
    ).toBe(false);

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="Bypass Moderation" tab="Node.js" index=1
    // COPY: trustedUser="trusted_user_id"
    await client.moderation.bypass({
      target_user_id: trustedUser,
      enabled: true,
    });
    // #endregion snippet

    expect((await getServerUser(client, trustedUser)).bypass_moderation).toBe(
      true,
    );
  });

  it.skip('BLOCKED: SDK issue: the node SDK has no getUserModerationReport (GET /api/v2/moderation/user_report is left out of the spec)', async () => {
    const reportUser = await createUser('report-user');
    // The node SDK has no getUserModerationReport: type the missing method (from the
    // API's response) so the skipped region typechecks and lints. It isn't there at runtime.
    const client = getServerClient() as StreamClient & {
      moderation: {
        getUserModerationReport: (request: {
          user_id: string;
        }) => Promise<{ user: UserResponse }>;
      };
    };

    // #region snippet docs="moderation/_default/05-content-moderation/02-flag-mute-ban.md" heading="User Moderation Report" tab="Node.js" index=1
    // COPY: reportUser="user_123"
    const response = await client.moderation.getUserModerationReport({
      user_id: reportUser,
    });
    // #endregion snippet

    expect(response.user.id).toBe(reportUser);
  });
});
