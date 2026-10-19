import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type {
  UpdateChannelPartialResponse,
  UpdateChannelResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { updateChannelType } from '../../../../helpers/channel-types';
import { getServerChannel } from '../../../../helpers/server';
import { waitForChannelTypePropagation } from '../../../../helpers/wait';

const DOCS = 'chat/_default/03-channels/07-channel_management/14-freezing.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const userId = uniqueId('thierry');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: { created_by_id: userId, members: [{ user_id: userId }] },
    });
  });

  afterAll(() => cleanup.run());

  it('freezes a channel with a full and a partial update', async () => {
    const updateSpy = vi.spyOn(client.chat, 'updateChannel');
    const partialSpy = vi.spyOn(client.chat, 'updateChannelPartial');

    // #region snippet docs="chat/_default/03-channels/07-channel_management/14-freezing.md" heading="Freeze a Channel" tab="Node.js" index=1
    // COPY: channelId="general", userId="thierry"
    const channel = client.chat.channel('messaging', channelId);

    // Full update, with a system message announcing the freeze
    await channel.update({
      data: { frozen: true },
      message: { text: 'Thierry has frozen the channel', user_id: userId },
    });

    // Or a partial update
    await channel.updateChannelPartial({ set: { frozen: true } });
    // #endregion snippet

    const [full] = await Promise.all(
      updateSpy.mock.results.map(
        (r) => r.value as Promise<UpdateChannelResponse>,
      ),
    );
    const [partial] = await Promise.all(
      partialSpy.mock.results.map(
        (r) => r.value as Promise<UpdateChannelPartialResponse>,
      ),
    );
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(partialSpy).toHaveBeenCalledTimes(1);
    updateSpy.mockRestore();
    partialSpy.mockRestore();

    expect(full.channel?.frozen).toBe(true);
    expect(full.message?.text).toBe('Thierry has frozen the channel');
    expect(full.message?.user?.id).toBe(userId);
    expect(partial.channel?.frozen).toBe(true);

    const { channel: current } = await getServerChannel(client, cid);
    expect(current?.frozen).toBe(true);
  });

  it('unfreezes a channel', async () => {
    await client.chat
      .channel('messaging', channelId)
      .updateChannelPartial({ set: { frozen: true } });
    const updateSpy = vi.spyOn(client.chat, 'updateChannel');

    // #region snippet docs="chat/_default/03-channels/07-channel_management/14-freezing.md" heading="Unfreeze a Channel" tab="Node.js" index=1
    // COPY: channelId="general", userId="thierry"
    const channel = client.chat.channel('messaging', channelId);

    await channel.update({
      data: { frozen: false },
      message: { text: 'Thierry has unfrozen the channel', user_id: userId },
    });
    // #endregion snippet

    const [full] = await Promise.all(
      updateSpy.mock.results.map(
        (r) => r.value as Promise<UpdateChannelResponse>,
      ),
    );
    expect(updateSpy).toHaveBeenCalledTimes(1);
    updateSpy.mockRestore();

    expect(full.channel?.frozen).toBe(false);
    expect(full.message?.text).toBe('Thierry has unfrozen the channel');

    const { channel: current } = await getServerChannel(client, cid);
    expect(current?.frozen).toBe(false);
  });

  it('grants use-frozen-channel to admins of the messaging type', async () => {
    const original = await client.chat.getChannelType({ name: 'messaging' });
    const originalAdmin = original.grants.admin ?? [];
    expect(originalAdmin).not.toContain('use-frozen-channel');
    cleanup.add(async () => {
      await updateChannelType(client, 'messaging', {
        grants: { admin: originalAdmin },
      });
      // Let the restore reach every API node before the DRIFT check reads it.
      await waitForChannelTypePropagation();
    });

    // #region snippet docs="chat/_default/03-channels/07-channel_management/14-freezing.md" heading="Granting the Frozen Channel Permission" tab="Node.js" index=1
    const channelType = await client.chat.getChannelType({ name: 'messaging' });

    const adminGrants = [...channelType.grants.admin, 'use-frozen-channel'];

    // automod, automod_behavior and max_message_length are required on update and
    // are not preserved when omitted, so read them back from the current type.
    await client.chat.updateChannelType({
      name: 'messaging',
      automod: channelType.automod,
      automod_behavior: channelType.automod_behavior,
      max_message_length: channelType.max_message_length,
      grants: { admin: adminGrants },
    });
    // #endregion snippet

    await waitForChannelTypePropagation();

    const updated = await client.chat.getChannelType({ name: 'messaging' });
    expect(updated.grants.admin).toContain('use-frozen-channel');
    expect(updated.grants.channel_member).toEqual(
      original.grants.channel_member,
    );
    expect(updated.automod).toBe(original.automod);
    expect(updated.max_message_length).toBe(original.max_message_length);
  });
});
