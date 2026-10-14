import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerChannel } from '../../../../helpers/server';

const DOCS = 'chat/_default/05-features/10-advanced/13-private_messaging.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const adminId = uniqueId('admin');
  const janeId = uniqueId('jane');
  const johnId = uniqueId('john');
  const rideId = uniqueId('ride');
  const cid = `messaging:${rideId}`;

  beforeAll(async () => {
    cleanup.users.push(adminId, janeId, johnId);
    await client.upsertUsers([
      { id: adminId, role: 'admin' },
      { id: janeId },
      { id: johnId },
    ]);

    cleanup.channels.push(cid);
    await client.chat.channel('messaging', rideId).getOrCreate({
      data: {
        created_by_id: adminId,
        members: [{ user_id: janeId }, { user_id: johnId }],
      },
    });
  });

  afterAll(() => cleanup.run());

  it('sends a message with restricted visibility', async () => {
    // #region snippet docs="chat/_default/05-features/10-advanced/13-private_messaging.md" heading="Sending a message with restricted visibility" tab="Node.js" index=1
    // COPY: rideId="ride-08467339", adminId="admin", janeId="jane"
    // Get a channel
    const channel = client.chat.channel('messaging', rideId);

    // Send a message only visible to Jane
    const message = await channel.sendMessage({
      message: {
        text: 'Hi Jane, your driver John will be at your location in 1 minute',
        type: 'system',
        user_id: adminId,
        restricted_visibility: [janeId],
      },
    });
    // #endregion snippet

    expect(message.message.type).toBe('system');
    expect(message.message.restricted_visibility).toEqual([janeId]);
    const messageId = message.message.id;

    // Jane (in the list) sees it, John (a member, not in the list) doesn't.
    const asJane = await getServerChannel(client, cid, {
      user_id: janeId,
      message_limit: 10,
    });
    expect(asJane.messages.map((m) => m.id)).toContain(messageId);
    const asJohn = await getServerChannel(client, cid, {
      user_id: johnId,
      message_limit: 10,
    });
    expect(asJohn.messages.map((m) => m.id)).not.toContain(messageId);
  });
});
