import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type {
  QueryChannelsResponse,
  UpdateMemberPartialResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerMember } from '../../../helpers/server';

const DOCS = '_default/03-channels/07-channel_management/08-archiving.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const amyId = uniqueId('amy');
  const otherId = uniqueId('other');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  beforeAll(async () => {
    cleanup.users.push(amyId, otherId);
    await client.upsertUsers([{ id: amyId }, { id: otherId }]);
    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: amyId,
        members: [{ user_id: amyId }, { user_id: otherId }],
      },
    });
  });

  afterAll(() => cleanup.run());

  it('archives, queries archived channels and unarchives', async () => {
    const memberSpy = vi.spyOn(client.chat, 'updateMemberPartial');
    const querySpy = vi.spyOn(client.chat, 'queryChannels');

    // #region snippet docs="_default/03-channels/07-channel_management/08-archiving.md" heading="Archive a Channel" tab="Node.js" index=1
    // COPY: channelId="general", amyId="amy"
    // Get a channel
    const channel = client.chat.channel('messaging', channelId);

    // Archive the channel for user amy
    const userId = amyId;
    await channel.updateMemberPartial({
      user_id: userId,
      set: { archived: true },
    });

    // Query for channels that are archived
    await client.chat.queryChannels({
      filter_conditions: { archived: true },
      user_id: userId,
    });

    // Unarchive the channel
    await channel.updateMemberPartial({
      user_id: userId,
      unset: ['archived'],
    });
    // #endregion snippet

    const [archived, unarchived] = await Promise.all(
      memberSpy.mock.results.map(
        (r) => r.value as Promise<UpdateMemberPartialResponse>,
      ),
    );
    const [queried] = await Promise.all(
      querySpy.mock.results.map(
        (r) => r.value as Promise<QueryChannelsResponse>,
      ),
    );
    memberSpy.mockRestore();
    querySpy.mockRestore();

    expect(archived.channel_member?.user_id).toBe(amyId);
    expect(archived.channel_member?.archived_at).toBeDefined();
    expect(queried.channels.map((c) => c.channel?.cid)).toEqual([cid]);
    expect(unarchived.channel_member?.archived_at).toBeUndefined();

    const amy = await getServerMember(client, cid, amyId);
    expect(amy.archived_at).toBeUndefined();
  });
});
