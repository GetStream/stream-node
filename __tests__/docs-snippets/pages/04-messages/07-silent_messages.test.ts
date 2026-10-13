import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { getServerChannel, sendServerMessage } from '../../helpers/server';
import { retry } from '../../helpers/wait';

const DOCS = '_default/04-messages/07-silent_messages.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const systemUserID = uniqueId('system');
  const jane = uniqueId('jane');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  const unreadFor = async (userId: string) => {
    const channel = await getServerChannel(client, cid, { user_id: userId });
    return channel.read?.find((r) => r.user.id === userId)?.unread_messages;
  };

  beforeAll(async () => {
    cleanup.users.push(systemUserID, jane);
    await client.upsertUsers([{ id: systemUserID }, { id: jane }]);

    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: systemUserID,
        members: [{ user_id: systemUserID }, { user_id: jane }],
      },
    });
  });

  afterAll(() => cleanup.run());

  it('sends a silent message', async () => {
    const tripData = { trip_id: 'trip-1', distance_km: 12 };
    const before = await unreadFor(jane);
    expect(before).toBe(0);

    // #region snippet docs="_default/04-messages/07-silent_messages.md" heading="Silent Messages" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    await channel.sendMessage({
      message: {
        text: 'You completed your trip',
        user_id: systemUserID,
        silent: true,
        attachments: [{ type: 'trip', custom: tripData }],
      },
    });
    // #endregion snippet

    const { messages } = await getServerChannel(client, cid, {
      user_id: jane,
      state: true,
      message_limit: 10,
    });
    const sent = messages.find((m) => m.text === 'You completed your trip');
    expect(sent?.silent).toBe(true);
    expect(sent?.user?.id).toBe(systemUserID);
    expect(sent?.attachments[0]?.type).toBe('trip');
    expect(sent?.attachments[0]?.custom).toMatchObject(tripData);
    expect(await unreadFor(jane)).toBe(0);

    // Control: a regular message does increment jane's unread count.
    await sendServerMessage(client, cid, {
      text: 'not silent',
      user_id: systemUserID,
    });
    await retry(async () => {
      expect(await unreadFor(jane)).toBe(1);
    });
  });

  it('sends a system message', async () => {
    // #region snippet docs="_default/04-messages/07-silent_messages.md" heading="System Messages" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    await channel.sendMessage({
      message: {
        text: 'You completed your trip',
        user_id: systemUserID,
        type: 'system',
      },
    });
    // #endregion snippet

    const { messages } = await getServerChannel(client, cid, {
      user_id: jane,
      state: true,
      message_limit: 10,
    });
    const system = messages.filter((m) => m.type === 'system');
    expect(system).toHaveLength(1);
    expect(system[0].text).toBe('You completed your trip');
    expect(system[0].user?.id).toBe(systemUserID);
  });
});
