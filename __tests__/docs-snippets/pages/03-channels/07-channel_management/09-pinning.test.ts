import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type {
  QueryChannelsResponse,
  UpdateMemberPartialResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerMember } from '../../../helpers/server';

const DOCS = '_default/03-channels/07-channel_management/09-pinning.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const amyId = uniqueId('amy');
  const benId = uniqueId('ben');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;
  const otherChannelId = uniqueId('other');
  const otherCid = `messaging:${otherChannelId}`;

  beforeAll(async () => {
    cleanup.users.push(amyId, benId);
    await client.upsertUsers([{ id: amyId }, { id: benId }]);
    // the unpinned channel is created last, so without the pinned_at sort it
    // would not come first
    for (const id of [channelId, otherChannelId]) {
      cleanup.channels.push(`messaging:${id}`);
      await client.chat.channel('messaging', id).getOrCreate({
        data: {
          created_by_id: amyId,
          members: [{ user_id: amyId }, { user_id: benId }],
        },
      });
    }
  });

  afterAll(() => cleanup.run());

  it('pins, queries pinned channels, sorts pinned first and unpins', async () => {
    const memberSpy = vi.spyOn(client.chat, 'updateMemberPartial');
    const querySpy = vi.spyOn(client.chat, 'queryChannels');

    // #region snippet docs="_default/03-channels/07-channel_management/09-pinning.md" heading="Pin a Channel" tab="Node.js" index=1
    // COPY: channelId="general", amyId="amy", benId="ben"
    // Get a channel
    const channel = client.chat.channel('messaging', channelId);

    // Pin the channel for user amy
    const userId = amyId;
    await channel.updateMemberPartial({
      user_id: userId,
      set: { pinned: true },
    });

    // Query for channels that are pinned
    await client.chat.queryChannels({
      filter_conditions: { pinned: true },
      user_id: userId,
    });

    // Query for channels for specific members and show pinned first
    await client.chat.queryChannels({
      filter_conditions: { members: { $in: [amyId, benId] } },
      sort: [{ field: 'pinned_at', direction: -1 }],
      user_id: userId,
    });

    // Unpin the channel
    await channel.updateMemberPartial({
      user_id: userId,
      unset: ['pinned'],
    });
    // #endregion snippet

    const [pinned, unpinned] = await Promise.all(
      memberSpy.mock.results.map(
        (r) => r.value as Promise<UpdateMemberPartialResponse>,
      ),
    );
    const [pinnedOnly, pinnedFirst] = await Promise.all(
      querySpy.mock.results.map(
        (r) => r.value as Promise<QueryChannelsResponse>,
      ),
    );
    memberSpy.mockRestore();
    querySpy.mockRestore();

    expect(pinned.channel_member?.user_id).toBe(amyId);
    expect(pinned.channel_member?.pinned_at).toBeDefined();
    expect(pinnedOnly.channels.map((c) => c.channel?.cid)).toEqual([cid]);
    expect(pinnedFirst.channels.map((c) => c.channel?.cid)).toEqual([
      cid,
      otherCid,
    ]);
    expect(unpinned.channel_member?.pinned_at).toBeUndefined();

    const amy = await getServerMember(client, cid, amyId);
    expect(amy.pinned_at).toBeUndefined();
  });
});
