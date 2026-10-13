import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { getServerChannel } from '../../helpers/server';

describe('_default/03-channels/01-creating_channels.md', () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const myUserId = uniqueId('myuserid');
  const thierryId = uniqueId('thierry');
  const tommasoId = uniqueId('tommaso');

  beforeAll(async () => {
    cleanup.users.push(myUserId, thierryId, tommasoId);
    await client.upsertUsers(
      [myUserId, thierryId, tommasoId].map((id) => ({ id })),
    );
  });

  afterAll(() => cleanup.run());

  it('creates a channel using a channel ID', async () => {
    const travelId = uniqueId('travel');
    cleanup.channels.push(`messaging:${travelId}`);

    // #region snippet docs="_default/03-channels/01-creating_channels.md" heading="Creating a Channel Using a Channel ID" tab="Node.js" index=1
    // COPY: travelId="travel", myUserId="myuserid"
    const channel = client.chat.channel('messaging', travelId);
    // Here, 'travel' will be the channel ID
    await channel.getOrCreate({
      data: {
        created_by_id: myUserId,
        custom: { name: 'Awesome channel about traveling' },
      },
    });
    // #endregion snippet

    const { channel: created } = await getServerChannel(
      client,
      `messaging:${travelId}`,
    );
    expect(created?.id).toBe(travelId);
    expect(created?.created_by?.id).toBe(myUserId);
    expect(created?.custom.name).toBe('Awesome channel about traveling');
  });

  it('creates a distinct channel', async () => {
    // #region snippet docs="_default/03-channels/01-creating_channels.md" heading="Distinct Channels" tab="Node.js" index=1
    // COPY: myUserId="myuserid", thierryId="thierry", tommasoId="tommaso"
    // Omitting the channel ID routes to a distinct channel, keyed on the member list.
    const channel = client.chat.channel('messaging');
    await channel.getOrCreate({
      data: {
        created_by_id: myUserId,
        members: [{ user_id: thierryId }, { user_id: tommasoId }],
      },
    });
    // #endregion snippet

    const channelId = channel.id;
    expect(channelId).toBeTruthy();
    cleanup.channels.push(channel.cid);

    const { members } = await getServerChannel(client, channel.cid);
    expect(members.map((m) => m.user_id).sort()).toEqual(
      [thierryId, tommasoId].sort(),
    );

    // Same members (any order): same channel.
    const again = client.chat.channel('messaging');
    await again.getOrCreate({
      data: {
        created_by_id: myUserId,
        members: [{ user_id: tommasoId }, { user_id: thierryId }],
      },
    });
    expect(again.id).toBe(channelId);
  });
});
