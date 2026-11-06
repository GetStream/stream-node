import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type {
  DeleteChannelResponse,
  DeleteChannelsResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { sendServerMessage } from '../../../../helpers/server';
import { waitForTask } from '../../../../helpers/wait';

const DOCS = 'chat/_default/03-channels/07-channel_management/13-deleting.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const ownerId = uniqueId('owner');
  const memberIds = [
    uniqueId('member'),
    uniqueId('member'),
    uniqueId('member'),
  ];

  const countChannels = async (cids: string[]) => {
    const { channels } = await client.chat.queryChannels({
      filter_conditions: { cid: { $in: cids } },
    });
    return channels.length;
  };

  /** A distinct channel of `ownerId` and `memberId`, with one message in it. */
  const createDistinctChannel = async (memberId: string) => {
    const distinct = client.chat.channel('messaging');
    await distinct.getOrCreate({
      data: {
        created_by_id: ownerId,
        members: [{ user_id: ownerId }, { user_id: memberId }],
      },
    });
    cleanup.channels.push(distinct.cid);
    const message = await sendServerMessage(client, distinct.cid, {
      text: 'kept through the delete',
      user_id: ownerId,
    });
    return { cid: distinct.cid, messageId: message.id };
  };

  /** Recreates the distinct channel of `ownerId` and `memberId` and returns its messages. */
  const recreateDistinctChannel = async (memberId: string) => {
    const recreated = client.chat.channel('messaging');
    const response = await recreated.getOrCreate({
      state: true,
      data: {
        created_by_id: ownerId,
        members: [{ user_id: ownerId }, { user_id: memberId }],
      },
    });
    return response.messages.map((m) => m.id);
  };

  beforeAll(async () => {
    cleanup.users.push(ownerId, ...memberIds);
    await client.upsertUsers([ownerId, ...memberIds].map((id) => ({ id })));
  });

  afterAll(() => cleanup.run());

  it('soft deletes and hard deletes a channel', async () => {
    const channelId = uniqueId('general');
    const otherChannelId = uniqueId('random');
    const cid = `messaging:${channelId}`;
    const otherCid = `messaging:${otherChannelId}`;
    cleanup.channels.push(cid, otherCid);
    for (const id of [channelId, otherChannelId]) {
      await client.chat
        .channel('messaging', id)
        .getOrCreate({ data: { created_by_id: ownerId } });
    }

    const deleteSpy = vi.spyOn(client.chat, 'deleteChannel');

    // #region snippet docs="chat/_default/03-channels/07-channel_management/13-deleting.md" heading="Deleting a Channel" tab="Node.js" index=1
    // COPY: channelId="general", otherChannelId="random"
    // Get a channel
    const channel = client.chat.channel('messaging', channelId);

    await channel.delete();

    // Pass hard_delete to remove a channel and its data permanently
    const otherChannel = client.chat.channel('messaging', otherChannelId);
    await otherChannel.delete({ hard_delete: true });
    // #endregion snippet

    const [soft, hard] = await Promise.all(
      deleteSpy.mock.results.map(
        (r) => r.value as Promise<DeleteChannelResponse>,
      ),
    );
    expect(deleteSpy).toHaveBeenCalledTimes(2);
    expect(deleteSpy.mock.calls[1][0].hard_delete).toBe(true);
    deleteSpy.mockRestore();

    expect(soft.channel?.cid).toBe(cid);
    expect(soft.channel?.deleted_at).toEqual(expect.any(Number));
    expect(hard.channel?.cid).toBe(otherCid);
    expect(await countChannels([cid, otherCid])).toBe(0);
  });

  it('preserves message history through a soft delete', async () => {
    const memberId = memberIds[0];
    const { cid, messageId } = await createDistinctChannel(memberId);
    const channelId = cid.split(':')[1];

    // #region snippet docs="chat/_default/03-channels/07-channel_management/13-deleting.md" heading="Preserving Message History" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Preserve history through the soft delete
    await channel.delete({ skip_truncate: true });
    // #endregion snippet

    expect(await countChannels([cid])).toBe(0);
    expect(await recreateDistinctChannel(memberId)).toContain(messageId);
  });

  it('deletes many channels', async () => {
    const ids = [uniqueId('channel-1'), uniqueId('channel-2')];
    const [cid1, cid2] = ids.map((id) => `messaging:${id}`);
    cleanup.channels.push(cid1, cid2);
    for (const id of ids) {
      await client.chat
        .channel('messaging', id)
        .getOrCreate({ data: { created_by_id: ownerId } });
    }
    // The preserve history call only works on distinct channels.
    const distinct = [
      await createDistinctChannel(memberIds[1]),
      await createDistinctChannel(memberIds[2]),
    ];
    const [distinctCid1, distinctCid2] = distinct.map((d) => d.cid);

    // #region snippet docs="chat/_default/03-channels/07-channel_management/13-deleting.md" heading="Deleting Many Channels" tab="Node.js" index=1
    // soft delete
    const response = await client.chat.deleteChannels({ cids: [cid1, cid2] });

    // hard delete
    const hardResponse = await client.chat.deleteChannels({
      cids: [cid1, cid2],
      hard_delete: true,
    });

    // task_id is optional on the response, so check it before polling
    if (hardResponse.task_id) {
      const task = await client.getTask({ id: hardResponse.task_id });
      if (task.status === 'completed') {
        // success!
      }
    }

    // preserve history (distinct channels only)
    const preserveResponse = await client.chat.deleteChannels({
      cids: [distinctCid1, distinctCid2],
      skip_truncate: true,
    });
    // #endregion snippet

    const responses: DeleteChannelsResponse[] = [
      response,
      hardResponse,
      preserveResponse,
    ];
    for (const r of responses) {
      expect(r.task_id).toBeTruthy();
      if (r.task_id) await waitForTask(client, r.task_id);
    }
    expect(await countChannels([cid1, cid2])).toBe(0);
    expect(await countChannels(distinct.map((d) => d.cid))).toBe(0);

    for (const [i, memberId] of [memberIds[1], memberIds[2]].entries()) {
      expect(await recreateDistinctChannel(memberId)).toContain(
        distinct[i].messageId,
      );
    }
  });
});
