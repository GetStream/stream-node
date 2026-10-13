import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { StreamError } from '../../../../index';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { sendServerMessage } from '../../helpers/server';

const DOCS = '_default/03-channels/08-get_channel.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const userId = uniqueId('owner');
  const channelId = uniqueId('general');
  const missingId = uniqueId('does-not-exist');

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);

    cleanup.channels.push(`messaging:${channelId}`);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: { created_by_id: userId, members: [{ user_id: userId }] },
    });
    await sendServerMessage(client, `messaging:${channelId}`, {
      text: 'hello',
      user_id: userId,
    });
  });

  afterAll(() => cleanup.run());

  it('gets a channel on the default path, with state, and a missing one', async () => {
    // The snippet's last call rejects with a 404. Record that error instead of throwing, so
    // the region runs without a try/catch and its results can be checked after it.
    const original = client.chat.getChannel.bind(client.chat);
    let error: unknown;
    const getChannel = vi
      .spyOn(client.chat, 'getChannel')
      .mockImplementation(async (request) => {
        try {
          return await original(request);
        } catch (e) {
          if (request.id !== missingId) throw e;
          error = e;
          return undefined as never;
        }
      });

    // #region snippet docs="_default/03-channels/08-get_channel.md" heading="Using an SDK" tab="Node.js" index=1
    // COPY: channelId="general", missingId="does-not-exist"
    // Get a channel handle
    const channel = client.chat.channel('messaging', channelId);

    // Cheap default path (channel, config, members)
    const response = await channel.get();

    // Full channel state (messages, read state, watchers)
    const withState = await channel.get({
      state: true,
      messages_limit: 25,
      watchers_limit: 10,
    });

    // A missing channel returns a 404
    await client.chat.getChannel({ type: 'messaging', id: missingId });
    // #endregion snippet

    expect(getChannel).toHaveBeenCalledTimes(3);
    getChannel.mockRestore();

    expect(response.channel?.cid).toBe(`messaging:${channelId}`);
    expect(response.members.map((m) => m.user_id)).toEqual([userId]);
    expect(response.messages ?? []).toHaveLength(0);

    expect(withState.channel?.cid).toBe(`messaging:${channelId}`);
    expect(withState.messages.map((m) => m.text)).toEqual(['hello']);

    expect(error).toBeInstanceOf(StreamError);
    expect((error as StreamError).metadata.responseCode).toBe(404);

    // Get Channel doesn't create the missing channel.
    const { channels } = await client.chat.queryChannels({
      filter_conditions: { cid: `messaging:${missingId}` },
    });
    expect(channels).toHaveLength(0);
  });
});
