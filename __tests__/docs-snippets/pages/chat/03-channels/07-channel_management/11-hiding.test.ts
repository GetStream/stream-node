import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import {
  getServerChannel,
  sendServerMessage,
} from '../../../../helpers/server';

const DOCS = 'chat/_default/03-channels/07-channel_management/11-hiding.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  const otherId = uniqueId('other');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  const hiddenCids = async () => {
    const { channels } = await client.chat.queryChannels({
      filter_conditions: { cid, hidden: true },
      user_id: johnId,
    });
    return channels.map((c) => c.channel?.cid);
  };

  beforeAll(async () => {
    cleanup.users.push(johnId, otherId);
    await client.upsertUsers([{ id: johnId }, { id: otherId }]);
    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: otherId,
        members: [{ user_id: johnId }, { user_id: otherId }],
      },
    });
    await sendServerMessage(client, cid, { text: 'before', user_id: otherId });
  });

  afterAll(() => cleanup.run());

  it('hides, hides with clear history and shows a channel', async () => {
    const before = await getServerChannel(client, cid, {
      user_id: johnId,
      message_limit: 10,
    });
    expect(before.messages.map((m) => m.text)).toEqual(['before']);

    // After each hide, record whether the channel is hidden for john.
    const hiddenAfterHide: Array<Array<string | undefined>> = [];
    const original = client.chat.hideChannel.bind(client.chat);
    const hideSpy = vi
      .spyOn(client.chat, 'hideChannel')
      .mockImplementation(async (request) => {
        const response = await original(request);
        hiddenAfterHide.push(await hiddenCids());
        return response;
      });

    // #region snippet docs="chat/_default/03-channels/07-channel_management/11-hiding.md" heading="Hide a Channel" tab="Node.js" index=1
    // COPY: channelId="general", johnId="john"
    // Get a channel
    const channel = client.chat.channel('messaging', channelId);

    // hides the channel for john until a new message is added there
    await channel.hide({ user_id: johnId });

    // the same, also clearing the history for that user
    await channel.hide({ user_id: johnId, clear_history: true });

    // shows a previously hidden channel
    await channel.show({ user_id: johnId });
    // #endregion snippet

    const clearHistory = hideSpy.mock.calls.map(
      ([request]) => request.clear_history,
    );
    hideSpy.mockRestore();

    expect(clearHistory).toEqual([undefined, true]);
    expect(hiddenAfterHide).toEqual([[cid], [cid]]);
    expect(await hiddenCids()).toEqual([]);

    // shown again, and the history before the clearing hide is gone for john
    const after = await getServerChannel(client, cid, {
      user_id: johnId,
      message_limit: 10,
    });
    expect(after.messages).toEqual([]);

    const forOther = await getServerChannel(client, cid, {
      user_id: otherId,
      message_limit: 10,
    });
    expect(forOther.messages.map((m) => m.text)).toEqual(['before']);
  });
});
