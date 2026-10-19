import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { OwnCapability } from '../../../../../../index';
import type {
  BlockUserResponse,
  ExportUsersResponse,
  GetBlockedUsersResponse,
  ModerationBanResponse,
  MuteUsersResponse,
  UpdateUserPermissionsResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { joinCallAsUser } from '../../../../helpers/video';
import { waitForTask } from '../../../../helpers/wait';

const DOCS = 'video/api/06-moderation/01-overview.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  /** A `default` call with a `uniqueId` id, created by john, with the given members. */
  const createCall = async (...memberIds: string[]) => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({
      data: {
        created_by_id: johnId,
        members: [johnId, ...memberIds].map((user_id) => ({ user_id })),
      },
    });
    return call;
  };

  /** Creates `uniqueId` users and registers them for cleanup. */
  const createUsers = async (...names: string[]) => {
    const ids = names.map((name) => uniqueId(name));
    cleanup.users.push(...ids);
    await client.upsertUsers(ids.map((id) => ({ id })));
    return ids;
  };

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('blocks, kicks and unblocks a member', async () => {
    const [saraId] = await createUsers('sara');
    const call = await createCall(saraId);
    await joinCallAsUser(call, saraId);
    // Read the blocked list right after the block, before the unblock.
    const original = client.video.blockUser.bind(client.video);
    const blockUser = vi.spyOn(client.video, 'blockUser');
    const kickUser = vi.spyOn(client.video, 'kickUser');
    const unblockUser = vi.spyOn(client.video, 'unblockUser');
    let blockedAfterBlock: string[] = [];
    blockUser.mockImplementation(async (request) => {
      const response = await original(request);
      blockedAfterBlock = (await call.get()).call.blocked_user_ids;
      return response;
    });

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Kicking & Blocking a member from a call" tab="Node.js" index=1
    // COPY: saraId="sara"
    // Block user
    await call.blockUser({ user_id: saraId });

    // kick
    await call.kickUser({ user_id: saraId });

    // Unblock user
    await call.unblockUser({ user_id: saraId });
    // #endregion snippet

    const [blocked] = await Promise.all(
      blockUser.mock.results.map((r) => r.value as Promise<BlockUserResponse>),
    );
    expect(blocked.duration).toBeDefined();
    expect(blockedAfterBlock).toEqual([saraId]);
    expect(kickUser).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: saraId }),
    );
    await Promise.all(
      kickUser.mock.results.map((r) => r.value as Promise<unknown>),
    );
    expect(unblockUser).toHaveBeenCalledTimes(1);
    expect((await call.get()).call.blocked_user_ids).toEqual([]);
  });

  it('enables screen sharing with access requests', async () => {
    const call = await createCall();

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Call permissions" tab="Node.js" index=1
    await call.update({
      settings_override: {
        screensharing: { enabled: true, access_request_enabled: true },
      },
    });
    // #endregion snippet

    const { call: updated } = await call.get();
    expect(updated.settings.screensharing).toMatchObject({
      enabled: true,
      access_request_enabled: true,
    });
  });

  it('mutes everyone', async () => {
    const [saraId] = await createUsers('sara');
    const call = await createCall(saraId);
    await joinCallAsUser(call, saraId);
    const muteUsers = vi.spyOn(client.video, 'muteUsers');

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Muting everyone" tab="Node.js" index=1
    // COPY: johnId="john"
    // You can specify which kind of stream(s) to mute
    await call.muteUsers({
      mute_all_users: true,
      audio: true,
      muted_by_id: johnId,
    });
    // #endregion snippet

    const [muted] = await Promise.all(
      muteUsers.mock.results.map((r) => r.value as Promise<MuteUsersResponse>),
    );
    expect(muted.duration).toBeDefined();
    expect(muteUsers).toHaveBeenCalledWith(
      expect.objectContaining({ mute_all_users: true, audio: true }),
    );
  });

  it("mutes one participant's tracks", async () => {
    const [saraId] = await createUsers('sara');
    const call = await createCall(saraId);
    await joinCallAsUser(call, saraId);
    const muteUsers = vi.spyOn(client.video, 'muteUsers');

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Muting one participant's video or audio (or both)" tab="Node.js" index=1
    // COPY: saraId="sara", johnId="john"
    await call.muteUsers({
      user_ids: [saraId],
      audio: true,
      video: true,
      screenshare: true,
      screenshare_audio: true,
      muted_by_id: johnId,
    });
    // #endregion snippet

    const [muted] = await Promise.all(
      muteUsers.mock.results.map((r) => r.value as Promise<MuteUsersResponse>),
    );
    expect(muted.duration).toBeDefined();
    expect(muteUsers).toHaveBeenCalledWith(
      expect.objectContaining({ user_ids: [saraId] }),
    );
  });

  it('grants and revokes a permission', async () => {
    const [saraId] = await createUsers('sara');
    const call = await createCall(saraId);
    const updatePermissions = vi.spyOn(client.video, 'updateUserPermissions');

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Granting and revoking permissions" tab="Node.js" index=1
    // COPY: saraId="sara"
    await call.updateUserPermissions({
      user_id: saraId,
      grant_permissions: [OwnCapability.SEND_AUDIO],
    });
    // #endregion snippet

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Granting and revoking permissions" tab="Node.js" index=2
    // COPY: saraId="sara"
    await call.updateUserPermissions({
      user_id: saraId,
      revoke_permissions: [OwnCapability.SEND_AUDIO],
    });
    // #endregion snippet

    const responses = await Promise.all(
      updatePermissions.mock.results.map(
        (r) => r.value as Promise<UpdateUserPermissionsResponse>,
      ),
    );
    expect(responses).toHaveLength(2);
    expect(updatePermissions.mock.calls.map(([request]) => request)).toEqual([
      expect.objectContaining({ grant_permissions: ['send-audio'] }),
      expect.objectContaining({ revoke_permissions: ['send-audio'] }),
    ]);
  });

  it('bans and unbans a user', async () => {
    const [badUserId, moderatorId] = await createUsers('bad-user', 'moderator');
    const bannedUserId = badUserId;
    const banReason = 'spamming the call';
    cleanup.add(() => client.moderation.unban({ target_user_id: badUserId }));
    // Record the user's ban after each ban call.
    const originalBan = client.moderation.ban.bind(client.moderation);
    const ban = vi.spyOn(client.moderation, 'ban');
    const unban = vi.spyOn(client.moderation, 'unban');
    const bansAfterEachCall: Array<{ reason?: string; expires?: Date }> = [];
    ban.mockImplementation(async (request) => {
      const response = await originalBan(request);
      const { bans } = await client.queryBannedUsers({
        payload: { filter_conditions: { user_id: badUserId } },
      });
      bansAfterEachCall.push({
        reason: bans[0]?.reason,
        expires: bans[0]?.expires,
      });
      return response;
    });

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Banning users" tab="Node.js" index=1
    // COPY: badUserId="<bad user id>", moderatorId="<moderator id>", banReason="<reason>", bannedUserId="<user id>"
    await client.moderation.ban({
      target_user_id: badUserId,
      banned_by_id: moderatorId,
      reason: banReason,
    });

    // remove the ban for a user
    await client.moderation.unban({
      target_user_id: bannedUserId,
    });

    // ban a user for 30 minutes
    await client.moderation.ban({
      target_user_id: badUserId,
      banned_by_id: moderatorId,
      timeout: 30,
    });

    // ban a user and all users sharing the same IP
    await client.moderation.ban({
      target_user_id: badUserId,
      banned_by_id: moderatorId,
      reason: banReason,
      ip_ban: true,
    });
    // #endregion snippet

    await Promise.all(
      ban.mock.results.map((r) => r.value as Promise<ModerationBanResponse>),
    );
    expect(ban).toHaveBeenCalledTimes(3);
    expect(unban).toHaveBeenCalledTimes(1);
    expect(bansAfterEachCall).toHaveLength(3);
    expect(bansAfterEachCall[0]).toMatchObject({ reason: banReason });
    expect(bansAfterEachCall[0].expires).toBeUndefined();
    expect(bansAfterEachCall[1].expires).toBeInstanceOf(Date);
    const { bans } = await client.queryBannedUsers({
      payload: { filter_conditions: { user_id: badUserId } },
    });
    expect(bans).toHaveLength(1);
    expect(bans[0].reason).toBe(banReason);
  });

  it('deactivates and reactivates users', async () => {
    const [userId, bulkUser1, bulkUser2] = await createUsers(
      'deactivate',
      'bulk1',
      'bulk2',
    );
    const reactivateUsers = vi.spyOn(client, 'reactivateUsers');

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Deactivating users" tab="Node.js" index=1
    // COPY: userId="<id>", bulkUser1="<id1>", bulkUser2="<id2>"
    await client.deactivateUser({
      user_id: userId,
    });

    // reactivate
    await client.reactivateUsers({
      user_ids: [userId],
    });

    // deactivating users in bulk is performed asynchronously
    const deactivateResponse = await client.deactivateUsers({
      user_ids: [bulkUser1, bulkUser2],
    });
    // #endregion snippet

    const findUser = async (id: string) =>
      (
        await client.queryUsers({
          payload: {
            filter_conditions: { id },
            include_deactivated_users: true,
          },
        })
      ).users[0];
    const [reactivated] = await Promise.all(
      reactivateUsers.mock.results.map(
        (r) => r.value as ReturnType<typeof client.reactivateUsers>,
      ),
    );
    await waitForTask(client, reactivated.task_id);
    expect((await findUser(userId))?.deactivated_at).toBeUndefined();
    await waitForTask(client, deactivateResponse.task_id);
    for (const id of [bulkUser1, bulkUser2]) {
      expect((await findUser(id))?.deactivated_at).toBeInstanceOf(Date);
    }
  });

  it('monitors an async task', async () => {
    const [exportUserId] = await createUsers('export');
    const exportUsers = vi.spyOn(client, 'exportUsers');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="Deactivating users" tab="Node.js" index=2
    // COPY: exportUserId="<user id1>"
    // Example of monitoring the status of an async task
    // The logic is same for all async tasks
    const response = await client.exportUsers({
      user_ids: [exportUserId, exportUserId],
    });

    // you need to poll this endpoint
    const taskResponse = await client.getTask({ id: response.task_id });

    console.log(taskResponse.status === 'completed');
    // #endregion snippet

    const [exported] = await Promise.all(
      exportUsers.mock.results.map(
        (r) => r.value as Promise<ExportUsersResponse>,
      ),
    );
    expect(exported.task_id).toBe(response.task_id);
    expect(taskResponse.task_id).toBe(response.task_id);
    expect(log.mock.calls[0]).toEqual([taskResponse.status === 'completed']);
    await waitForTask(client, response.task_id);
  });

  it('blocks and unblocks a user', async () => {
    const [bobId, aliceId] = await createUsers('bob', 'alice');
    const getBlockedUsers = vi.spyOn(client, 'getBlockedUsers');

    // #region snippet docs="video/api/06-moderation/01-overview.md" heading="User blocking" tab="Node.js" index=1
    // COPY: bobId="bob", aliceId="alice"
    await client.blockUsers({
      blocked_user_id: bobId,
      user_id: aliceId,
    });

    await client.getBlockedUsers({ user_id: aliceId });

    await client.unblockUsers({
      blocked_user_id: bobId,
      user_id: aliceId,
    });
    // #endregion snippet

    const [blocked] = await Promise.all(
      getBlockedUsers.mock.results.map(
        (r) => r.value as Promise<GetBlockedUsersResponse>,
      ),
    );
    expect(blocked.blocks.map((b) => b.blocked_user_id)).toEqual([bobId]);
    const after = await client.getBlockedUsers({ user_id: aliceId });
    expect(after.blocks).toEqual([]);
  });
});
