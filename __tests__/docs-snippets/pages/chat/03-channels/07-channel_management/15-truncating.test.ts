import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { TruncateChannelResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import {
  getServerChannel,
  sendServerMessage,
} from '../../../../helpers/server';

const DOCS = 'chat/_default/03-channels/07-channel_management/15-truncating.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const ownerId = uniqueId('owner');
  const janeId = uniqueId('jane');
  const johnId = uniqueId('john');

  const createChannel = async (name: string) => {
    const channelId = uniqueId(name);
    const cid = `messaging:${channelId}`;
    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: ownerId,
        members: [ownerId, janeId, johnId].map((user_id) => ({ user_id })),
      },
    });
    return { channelId, cid };
  };

  const visibleTexts = async (cid: string, userId: string) => {
    const { messages } = await getServerChannel(client, cid, {
      user_id: userId,
      message_limit: 20,
    });
    return messages.map((m) => m.text);
  };

  beforeAll(async () => {
    cleanup.users.push(ownerId, janeId, johnId);
    await client.upsertUsers([ownerId, janeId, johnId].map((id) => ({ id })));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => cleanup.run());

  it('truncates a channel', async () => {
    const { channelId, cid } = await createChannel('general');
    const { channelId: otherChannelId, cid: otherCid } =
      await createChannel('random');
    await sendServerMessage(client, otherCid, {
      text: 'recent',
      user_id: ownerId,
    });
    const user = { id: ownerId };

    // Before each truncate, send a message; after it, record what the owner sees.
    const visibleAfter: Array<Array<string | undefined>> = [];
    const original = client.chat.truncateChannel.bind(client.chat);
    const truncateSpy = vi
      .spyOn(client.chat, 'truncateChannel')
      .mockImplementation(async (request) => {
        const requestCid = `${request.type}:${request.id}`;
        await sendServerMessage(client, requestCid, {
          text: `before-${visibleAfter.length + 1}`,
          user_id: ownerId,
        });
        const response = await original(request);
        visibleAfter.push(await visibleTexts(requestCid, ownerId));
        return response;
      });

    // #region snippet docs="chat/_default/03-channels/07-channel_management/15-truncating.md" heading="Truncate a Channel" tab="Node.js" index=1
    // COPY: channelId="general", otherChannelId="random"
    // Get a channel
    const channel = client.chat.channel('messaging', channelId);

    await channel.truncate();

    // Or with parameters:
    await channel.truncate({
      hard_delete: true,
      skip_push: false,
      message: {
        text: 'Dear Everyone. The channel has been truncated.',
        user_id: user.id,
      },
    });

    // Setting user_id server side:
    await channel.truncate({ user_id: user.id });

    const otherChannel = client.chat.channel('messaging', otherChannelId);
    await otherChannel.truncate({
      truncated_at: new Date(Date.now() - 60 * 60 * 1000),
    });
    // #endregion snippet

    const responses = await Promise.all(
      truncateSpy.mock.results.map(
        (r) => r.value as Promise<TruncateChannelResponse>,
      ),
    );
    expect(truncateSpy).toHaveBeenCalledTimes(4);
    truncateSpy.mockRestore();

    expect(responses.map((r) => r.channel?.cid)).toEqual([
      cid,
      cid,
      cid,
      otherCid,
    ]);
    for (const r of responses) expect(r.channel?.truncated_at).toBeTruthy();
    // Each truncation of `general` hides everything sent before it.
    expect(visibleAfter[0]).toEqual([]);
    expect(responses[1].message?.text).toBe(
      'Dear Everyone. The channel has been truncated.',
    );
    expect(visibleAfter[1]).toEqual([
      'Dear Everyone. The channel has been truncated.',
    ]);
    expect(visibleAfter[2]).toEqual([]);
    // `truncated_at` an hour ago keeps the messages sent since then.
    const truncatedAt = responses[3].channel?.truncated_at;
    expect(truncatedAt).toBeInstanceOf(Date);
    if (truncatedAt) {
      expect(Date.now() - truncatedAt.getTime()).toBeGreaterThan(
        59 * 60 * 1000,
      );
    }
    expect(visibleAfter[3]).toEqual(['recent', 'before-4']);
  });

  it('truncates for specific members', async () => {
    const { channelId, cid } = await createChannel('general');
    await sendServerMessage(client, cid, { text: 'history', user_id: ownerId });

    const visibleAfter: Array<Record<string, Array<string | undefined>>> = [];
    const original = client.chat.truncateChannel.bind(client.chat);
    const truncateSpy = vi
      .spyOn(client.chat, 'truncateChannel')
      .mockImplementation(async (request) => {
        const response = await original(request);
        visibleAfter.push({
          owner: await visibleTexts(cid, ownerId),
          jane: await visibleTexts(cid, janeId),
          john: await visibleTexts(cid, johnId),
        });
        return response;
      });

    // #region snippet docs="chat/_default/03-channels/07-channel_management/15-truncating.md" heading="Truncate for Specific Members" tab="Node.js" index=1
    // COPY: channelId="general", janeId="jane", johnId="john"
    const channel = client.chat.channel('messaging', channelId);

    // Hide the history for two members; everyone else keeps their full view
    await channel.truncate({
      member_ids: [janeId, johnId],
    });

    // Hide only the messages created before a given time
    await channel.truncate({
      member_ids: [janeId],
      truncated_at: new Date('2026-01-01T00:00:00Z'),
    });
    // #endregion snippet

    expect(truncateSpy).toHaveBeenCalledTimes(2);
    truncateSpy.mockRestore();
    // The first call hides the history from jane and john, not from the owner.
    expect(visibleAfter[0]).toEqual({ owner: ['history'], jane: [], john: [] });
    // The second call replaces jane's cutoff with an earlier one: she sees it again.
    expect(visibleAfter[1]).toEqual({
      owner: ['history'],
      jane: ['history'],
      john: [],
    });
    // No messages were deleted.
    expect(await visibleTexts(cid, ownerId)).toEqual(['history']);
  });
});
