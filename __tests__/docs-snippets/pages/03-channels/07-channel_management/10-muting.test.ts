import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type {
  MuteChannelResponse,
  QueryChannelsResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = '_default/03-channels/07-channel_management/10-muting.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;
  const otherChannelId = uniqueId('other');
  const otherCid = `messaging:${otherChannelId}`;

  /** `cid`s of the channels `johnId` has muted (from a `queryChannels` as john). */
  const mutedCids = async () => {
    const response = await client.chat.queryChannels({
      filter_conditions: { members: { $in: [johnId] }, muted: true },
      user_id: johnId,
    });
    return response.channels.map((c) => c.channel?.cid);
  };

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
    for (const id of [channelId, otherChannelId]) {
      cleanup.channels.push(`messaging:${id}`);
      await client.chat.channel('messaging', id).getOrCreate({
        data: { created_by_id: johnId, members: [{ user_id: johnId }] },
      });
    }
  });

  afterAll(() => cleanup.run());

  it('mutes a channel, with and without expiration', async () => {
    const spy = vi.spyOn(client.chat, 'muteChannel');

    // #region snippet docs="_default/03-channels/07-channel_management/10-muting.md" heading="Mute a Channel" tab="Node.js" index=1
    // COPY: cid="messaging:general", johnId="john"
    // Channel mutes are per-user, so a server-side call always names the user.
    // `channel_cids` accepts several channels in one call.
    await client.chat.muteChannel({
      channel_cids: [cid],
      user_id: johnId,
    });

    // mute a channel for 2 weeks (expiration in milliseconds)
    await client.chat.muteChannel({
      channel_cids: [cid],
      user_id: johnId,
      expiration: 14 * 24 * 60 * 60 * 1000,
    });

    // mute a channel for 10 seconds
    await client.chat.muteChannel({
      channel_cids: [cid],
      user_id: johnId,
      expiration: 10000,
    });
    // #endregion snippet

    const [forever, twoWeeks, tenSeconds] = await Promise.all(
      spy.mock.results.map((r) => r.value as Promise<MuteChannelResponse>),
    );
    spy.mockRestore();

    // one channel in `channel_cids`: the mute is returned as `channel_mute`
    const muteOf = (response: MuteChannelResponse) => {
      expect(response.channel_mute?.channel?.cid).toBe(cid);
      return response.channel_mute;
    };
    expect(muteOf(forever)?.expires).toBeUndefined();
    const now = Date.now();
    const twoWeeksExpires = muteOf(twoWeeks)?.expires;
    expect(twoWeeksExpires).toBeDefined();
    expect(new Date(twoWeeksExpires ?? 0).getTime()).toBeGreaterThan(
      now + 13 * 24 * 60 * 60 * 1000,
    );
    const tenSecondsExpires = muteOf(tenSeconds)?.expires;
    expect(tenSecondsExpires).toBeDefined();
    expect(new Date(tenSecondsExpires ?? 0).getTime()).toBeLessThan(
      now + 60 * 1000,
    );
    expect(await mutedCids()).toEqual([cid]);
  });

  it('queries muted and not muted channels', async () => {
    // mute without expiration, so the previous test's 10s mute can't run out
    await client.chat.muteChannel({ channel_cids: [cid], user_id: johnId });
    const userId = johnId;
    const spy = vi.spyOn(client.chat, 'queryChannels');

    // #region snippet docs="_default/03-channels/07-channel_management/10-muting.md" heading="Query Muted Channels" tab="Node.js" index=1
    // Mutes are per-user, so pass `user_id` to evaluate the `muted` filter.
    // retrieve all channels excluding muted ones
    await client.chat.queryChannels({
      filter_conditions: { members: { $in: [userId] }, muted: false },
      user_id: userId,
    });

    // retrieve all muted channels
    await client.chat.queryChannels({
      filter_conditions: { muted: true },
      user_id: userId,
    });
    // #endregion snippet

    const [notMuted, muted] = await Promise.all(
      spy.mock.results.map((r) => r.value as Promise<QueryChannelsResponse>),
    );
    spy.mockRestore();

    expect(notMuted.channels.map((c) => c.channel?.cid)).toEqual([otherCid]);
    expect(muted.channels.map((c) => c.channel?.cid)).toEqual([cid]);
  });

  it('removes a channel mute', async () => {
    await client.chat.muteChannel({ channel_cids: [cid], user_id: johnId });
    expect(await mutedCids()).toEqual([cid]);

    // #region snippet docs="_default/03-channels/07-channel_management/10-muting.md" heading="Remove a Channel Mute" tab="Node.js" index=1
    // COPY: cid="messaging:general", johnId="john"
    await client.chat.unmuteChannel({
      channel_cids: [cid],
      user_id: johnId,
    });
    // #endregion snippet

    expect(await mutedCids()).toEqual([]);
  });
});
