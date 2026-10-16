import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { GetTaskResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerChannel, getServerMember } from '../../../../helpers/server';
import {
  waitForBatchTask,
  waitForChannelTypePropagation,
} from '../../../../helpers/wait';

const DOCS =
  'chat/_default/03-channels/07-channel_management/17-batch-updates.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const userId = uniqueId('user');
  const creatorId = uniqueId('creator');

  // The docs target every `messaging` / `team` channel of the app: the tests use their
  // own channel types instead, so only the test's channels are touched.
  const messagingType = uniqueId('batch-messaging');
  const teamType = uniqueId('batch-team');
  const messagingCids = [
    `${messagingType}:${uniqueId('a')}`,
    `${messagingType}:${uniqueId('b')}`,
  ];
  const teamCid = `${teamType}:${uniqueId('c')}`;
  // Channels for the CID filter (any type works, they are matched by CID).
  const [cid1, cid2, cid3, cid4] = ['d', 'e', 'f', 'g'].map(
    (name) => `messaging:${uniqueId(name)}`,
  );

  const createChannel = (cid: string) => {
    const [type, id] = cid.split(':');
    cleanup.channels.push(cid);
    return client.chat.channel(type, id).getOrCreate({
      data: {
        created_by_id: creatorId,
        members: [{ user_id: creatorId }],
        custom: { keep: 'me' },
      },
    });
  };

  beforeAll(async () => {
    cleanup.users.push(userId, creatorId);
    await client.upsertUsers([{ id: userId }, { id: creatorId }]);

    for (const name of [messagingType, teamType]) {
      await client.chat.createChannelType({
        name,
        automod: 'disabled',
        automod_behavior: 'flag',
        max_message_length: 5000,
      });
      cleanup.channelTypes.push(name);
    }
    await waitForChannelTypePropagation();

    for (const cid of [...messagingCids, teamCid, cid1, cid2, cid3, cid4]) {
      await createChannel(cid);
    }
  });

  afterAll(() => cleanup.run());

  it('targets channels by type and by CID', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/17-batch-updates.md" heading="Filter examples" tab="Node.js" index=1
    // COPY: messagingType="messaging", cid1="messaging:3b11838a-7734-4ece-8547-4b8524257671", cid2="messaging:a266bee6-dc3c-4188-a37d-e554d4bfac34", cid3="messaging:40fef12a-0b7c-4bcf-bd97-3ddf604efed5", cid4="messaging:2a58963e-d769-4ce3-9309-bff93c14db57"
    // 1) Filter by type
    const filters = {
      types: { $in: [messagingType] },
    };

    // 2) Filter by specific CIDs
    const filtersByCIDS = {
      cids: {
        $in: [cid1, cid2, cid3, cid4],
      },
    };
    // #endregion snippet

    const byType = await client.chat.channelBatchUpdate({
      operation: 'updateData',
      filter: filters,
      custom_set: { by_type: true },
    });
    expect(byType.task_id).toBeDefined();
    if (byType.task_id) {
      const task = await waitForBatchTask(client, byType.task_id);
      expect(task.result?.success_channels_count).toBe(messagingCids.length);
    }

    const byCids = await client.chat.channelBatchUpdate({
      operation: 'updateData',
      synchronous: true,
      filter: filtersByCIDS,
      custom_set: { by_cid: true },
    });
    if (byCids.task_id) {
      await waitForBatchTask(client, byCids.task_id);
    } else {
      expect(byCids.success_channels_count).toBe(4);
    }

    for (const cid of messagingCids) {
      const { channel } = await getServerChannel(client, cid);
      expect(channel?.custom).toMatchObject({ keep: 'me', by_type: true });
    }
    const { channel: other } = await getServerChannel(client, teamCid);
    expect(other?.custom.by_type).toBeUndefined();
    for (const cid of [cid1, cid2, cid3, cid4]) {
      const { channel } = await getServerChannel(client, cid);
      expect(channel?.custom).toMatchObject({ keep: 'me', by_cid: true });
    }
  }, 240000);

  it('adds members and updates channel data', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/17-batch-updates.md" heading="Config overrides" tab="Node.js" index=1
    // COPY: messagingType="messaging", teamType="team", userId="user-123"
    // Name the operation explicitly.

    // Add members
    const addResp = await client.chat.channelBatchUpdate({
      operation: 'addMembers',
      filter: { types: { $in: [messagingType] } },
      members: [{ user_id: userId }],
    });

    // Update channel data
    const dataResp = await client.chat.channelBatchUpdate({
      operation: 'updateData',
      filter: { types: { $in: [messagingType, teamType] } },
      data: {
        frozen: true,
        custom: { color: 'blue' },
      },
    });
    // #endregion snippet

    expect(addResp.task_id).toBeDefined();
    expect(dataResp.task_id).toBeDefined();
    if (addResp.task_id) {
      const task = await waitForBatchTask(client, addResp.task_id);
      expect(task.result?.success_channels_count).toBe(messagingCids.length);
    }
    if (dataResp.task_id) {
      const task = await waitForBatchTask(client, dataResp.task_id);
      expect(task.result?.success_channels_count).toBe(
        messagingCids.length + 1,
      );
    }

    for (const cid of messagingCids) {
      const member = await getServerMember(client, cid, userId);
      expect(member.user_id).toBe(userId);
    }
    await expect(getServerMember(client, teamCid, userId)).rejects.toThrow(
      'got 0',
    );
    for (const cid of [...messagingCids, teamCid]) {
      const { channel } = await getServerChannel(client, cid);
      expect(channel?.frozen).toBe(true);
      // `custom` replaces the whole custom object.
      expect(channel?.custom).toEqual({ color: 'blue' });
    }
  }, 240000);

  it('checks the status of a batch update', async () => {
    const response = await client.chat.channelBatchUpdate({
      operation: 'updateData',
      filter: { cids: { $in: [cid1] } },
      custom_set: { status_check: true },
    });
    expect(response.task_id).toBeDefined();
    const getTaskSpy = vi.spyOn(client, 'getTask');
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // #region snippet docs="chat/_default/03-channels/07-channel_management/17-batch-updates.md" heading="Status" tab="Node.js" index=1
    // task_id is optional on the batch update response, so check it before polling
    if (response.task_id) {
      const taskResponse = await client.getTask({ id: response.task_id });
      console.log(taskResponse.result?.status);
    }
    // #endregion snippet

    const [taskResponse] = await Promise.all(
      getTaskSpy.mock.results.map((r) => r.value as Promise<GetTaskResponse>),
    );
    expect(getTaskSpy).toHaveBeenCalledTimes(1);
    expect(getTaskSpy.mock.calls[0][0]).toEqual({ id: response.task_id });
    expect(logSpy).toHaveBeenCalledTimes(1);
    getTaskSpy.mockRestore();
    logSpy.mockRestore();
    expect(taskResponse.task_id).toBe(response.task_id);

    if (response.task_id) {
      const task = await waitForBatchTask(client, response.task_id);
      expect(task.result?.success_channels_count).toBe(1);
      expect(task.result?.operation).toBe('updateData');
    }
    const { channel } = await getServerChannel(client, cid1);
    expect(channel?.custom.status_check).toBe(true);
  }, 240000);
});
