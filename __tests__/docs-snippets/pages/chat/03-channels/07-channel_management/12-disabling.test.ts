import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type {
  QueryChannelsResponse,
  UpdateChannelPartialResponse,
  UpdateChannelResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerChannel } from '../../../../helpers/server';

const DOCS = 'chat/_default/03-channels/07-channel_management/12-disabling.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const ownerId = uniqueId('owner');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  beforeAll(async () => {
    cleanup.users.push(ownerId);
    await client.upsertUsers([{ id: ownerId }]);
    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: { created_by_id: ownerId, members: [{ user_id: ownerId }] },
    });
  });

  afterAll(() => cleanup.run());

  it('disables and enables a channel with full and partial updates', async () => {
    const updateSpy = vi.spyOn(client.chat, 'updateChannel');
    const partialSpy = vi.spyOn(client.chat, 'updateChannelPartial');

    // #region snippet docs="chat/_default/03-channels/07-channel_management/12-disabling.md" heading="Disable a Channel" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // disable a channel with full update
    await channel.update({ data: { disabled: true } });

    // disable a channel with partial update
    await channel.updateChannelPartial({ set: { disabled: true } });

    // enable a channel with full update
    await channel.update({ data: { disabled: false } });

    // enable a channel with partial update
    await channel.updateChannelPartial({ set: { disabled: false } });
    // #endregion snippet

    const [disabledFull, enabledFull] = await Promise.all(
      updateSpy.mock.results.map(
        (r) => r.value as Promise<UpdateChannelResponse>,
      ),
    );
    const [disabledPartial, enabledPartial] = await Promise.all(
      partialSpy.mock.results.map(
        (r) => r.value as Promise<UpdateChannelPartialResponse>,
      ),
    );
    expect(updateSpy).toHaveBeenCalledTimes(2);
    expect(partialSpy).toHaveBeenCalledTimes(2);
    updateSpy.mockRestore();
    partialSpy.mockRestore();

    expect(disabledFull.channel?.disabled).toBe(true);
    expect(disabledPartial.channel?.disabled).toBe(true);
    expect(enabledFull.channel?.disabled).toBe(false);
    expect(enabledPartial.channel?.disabled).toBe(false);

    const { channel: current } = await getServerChannel(client, cid);
    expect(current?.disabled).toBe(false);
  });

  it('filters out disabled channels', async () => {
    // A disabled channel: server-side queries return it unless the filter excludes it.
    const disabledId = uniqueId('disabled');
    const disabledCid = `messaging:${disabledId}`;
    cleanup.channels.push(disabledCid);
    const disabled = client.chat.channel('messaging', disabledId);
    await disabled.getOrCreate({ data: { created_by_id: ownerId } });
    await disabled.updateChannelPartial({ set: { disabled: true } });
    const unfiltered = await client.chat.queryChannels({
      filter_conditions: { cid: disabledCid },
    });
    expect(unfiltered.channels[0]?.channel?.disabled).toBe(true);
    const filtered = await client.chat.queryChannels({
      filter_conditions: { cid: disabledCid, disabled: false },
    });
    expect(filtered.channels).toEqual([]);

    const spy = vi.spyOn(client.chat, 'queryChannels');

    // #region snippet docs="chat/_default/03-channels/07-channel_management/12-disabling.md" heading="" tab="Node.js" index=1
    await client.chat.queryChannels({ filter_conditions: { disabled: false } });
    // #endregion snippet

    const response = await (spy.mock.results[0]
      .value as Promise<QueryChannelsResponse>);
    spy.mockRestore();
    expect(response.channels.length).toBeGreaterThan(0);
    expect(response.channels.map((c) => c.channel?.disabled)).not.toContain(
      true,
    );
  });
});
