import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import {
  getServerChannel,
  getServerMember,
  sendServerMessage,
} from '../../helpers/server';

const DOCS = '_default/03-channels/06-channel_members.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const thierryId = uniqueId('thierry');
  const joshId = uniqueId('josh');
  const jamesBondId = uniqueId('james-bond');
  const alecId = uniqueId('alec-trevelyan');
  const tommasoId = uniqueId('tommaso');
  const myUserId = uniqueId('myuserid');
  const userId1 = uniqueId('userid1');
  const userId2 = uniqueId('userid2');
  const userId3 = uniqueId('userid3');
  const janeId = uniqueId('jane');
  const allUsers = [
    thierryId,
    joshId,
    jamesBondId,
    alecId,
    tommasoId,
    myUserId,
    userId1,
    userId2,
    userId3,
    janeId,
  ];

  /** A new `messaging` channel created by `myUserId`, registered for cleanup. */
  const newChannel = async (members: string[] = []) => {
    const id = uniqueId('general');
    cleanup.channels.push(`messaging:${id}`);
    await client.chat.channel('messaging', id).getOrCreate({
      data: {
        created_by_id: myUserId,
        members: members.map((user_id) => ({ user_id })),
      },
    });
    return id;
  };

  const memberIds = async (cid: string) => {
    const { members } = await getServerChannel(client, cid);
    return members.map((m) => m.user_id);
  };

  beforeAll(async () => {
    cleanup.users.push(...allUsers);
    await client.upsertUsers(allUsers.map((id) => ({ id })));
  });

  afterAll(() => cleanup.run());

  it('adds members, with a channel role and with custom data', async () => {
    const channelId = await newChannel();
    const cid = `messaging:${channelId}`;

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Adding Members" tab="Node.js" index=1
    // COPY: channelId="general", thierryId="thierry", joshId="josh", jamesBondId="james_bond", alecId="alec_trevelyan"
    const channel = client.chat.channel('messaging', channelId);

    await channel.update({
      add_members: [{ user_id: thierryId }, { user_id: joshId }],
    });

    // Add user to the channel with role set
    await channel.update({
      add_members: [
        { user_id: jamesBondId, channel_role: 'channel_moderator' },
      ],
    });

    // Add new channel member with custom data
    await channel.update({
      add_members: [{ user_id: alecId, custom: { code_name: '006' } }],
    });
    // #endregion snippet

    expect(await memberIds(cid)).toEqual(
      expect.arrayContaining([thierryId, joshId, jamesBondId, alecId]),
    );
    const bond = await getServerMember(client, cid, jamesBondId);
    expect(bond.channel_role).toBe('channel_moderator');
    const alec = await getServerMember(client, cid, alecId);
    expect(alec.custom.code_name).toBe('006');
  });

  it('adds members when creating a channel', async () => {
    const channelId = uniqueId('general');
    const cid = `messaging:${channelId}`;
    cleanup.channels.push(cid);

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Adding Members" tab="Node.js" index=2
    // COPY: channelId="general", myUserId="myuserid", jamesBondId="james_bond", alecId="alec_trevelyan"
    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({
      data: {
        created_by_id: myUserId,
        members: [
          { user_id: jamesBondId, custom: { code_name: '007' } },
          { user_id: alecId, custom: { code_name: '006' } },
        ],
      },
    });
    // #endregion snippet

    const bond = await getServerMember(client, cid, jamesBondId);
    expect(bond.custom.code_name).toBe('007');
    const alec = await getServerMember(client, cid, alecId);
    expect(alec.custom.code_name).toBe('006');
  });

  it('removes members', async () => {
    const channelId = await newChannel([tommasoId, thierryId]);
    const cid = `messaging:${channelId}`;

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Removing Members" tab="Node.js" index=1
    // COPY: channelId="general", tommasoId="tommaso"
    const channel = client.chat.channel('messaging', channelId);
    await channel.update({ remove_members: [tommasoId] });
    // #endregion snippet

    const ids = await memberIds(cid);
    expect(ids).not.toContain(tommasoId);
    expect(ids).toContain(thierryId);
  });

  it('adds a member with hide_history', async () => {
    const channelId = await newChannel();
    const cid = `messaging:${channelId}`;
    await sendServerMessage(client, cid, {
      text: 'before thierry joined',
      user_id: myUserId,
    });

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Hide History" tab="Node.js" index=1
    // COPY: channelId="general", thierryId="thierry"
    const channel = client.chat.channel('messaging', channelId);
    await channel.update({
      add_members: [{ user_id: thierryId }],
      hide_history: true,
    });
    // #endregion snippet

    await sendServerMessage(client, cid, {
      text: 'after thierry joined',
      user_id: myUserId,
    });
    const { messages, members } = await getServerChannel(client, cid, {
      user_id: thierryId,
      message_limit: 10,
    });
    expect(members.map((m) => m.user_id)).toContain(thierryId);
    expect(messages.map((m) => m.text)).toEqual(['after thierry joined']);
  });

  it('adds a member with hide_history_before', async () => {
    const channelId = await newChannel();
    const cid = `messaging:${channelId}`;
    // Sent after the cutoff (7 days ago), so the new member still sees it.
    await sendServerMessage(client, cid, {
      text: 'sent today',
      user_id: myUserId,
    });

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Hide History Before a Specific Date" tab="Node.js" index=1
    // COPY: channelId="general", thierryId="thierry"
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7); // Last 7 days

    const channel = client.chat.channel('messaging', channelId);
    await channel.update({
      add_members: [{ user_id: thierryId }],
      hide_history_before: cutoff,
    });
    // #endregion snippet

    const { messages, members } = await getServerChannel(client, cid, {
      user_id: thierryId,
      message_limit: 10,
    });
    expect(members.map((m) => m.user_id)).toContain(thierryId);
    expect(messages.map((m) => m.text)).toEqual(['sent today']);
  });

  it('adds and removes members with a system message', async () => {
    const channelId = await newChannel([myUserId]);
    const cid = `messaging:${channelId}`;

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="System Message Parameter" tab="Node.js" index=1
    // COPY: channelId="general", tommasoId="tommaso"
    const channel = client.chat.channel('messaging', channelId);

    // Server-side calls must specify the sender user_id on the message
    await channel.update({
      add_members: [{ user_id: tommasoId }],
      message: {
        text: 'Tommaso joined the channel.',
        user_id: tommasoId,
      },
    });

    // The same message parameter works when removing members
    await channel.update({
      remove_members: [tommasoId],
      message: {
        text: 'Tommaso left the channel.',
        user_id: tommasoId,
      },
    });
    // #endregion snippet

    const { messages, members } = await getServerChannel(client, cid, {
      message_limit: 10,
    });
    expect(members.map((m) => m.user_id)).not.toContain(tommasoId);
    expect(messages.map((m) => m.text)).toEqual([
      'Tommaso joined the channel.',
      'Tommaso left the channel.',
    ]);
  });

  it('adds moderators', async () => {
    const channelId = await newChannel([thierryId, joshId]);
    const cid = `messaging:${channelId}`;

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Add Moderators" tab="Node.js" index=1
    // COPY: channelId="general", thierryId="thierry", joshId="josh"
    const channel = client.chat.channel('messaging', channelId);
    await channel.update({ add_moderators: [thierryId, joshId] });
    // #endregion snippet

    for (const userId of [thierryId, joshId]) {
      const member = await getServerMember(client, cid, userId);
      expect(member.channel_role).toBe('channel_moderator');
    }
  });

  it('demotes moderators', async () => {
    const channelId = await newChannel([tommasoId]);
    const cid = `messaging:${channelId}`;
    await client.chat
      .channel('messaging', channelId)
      .update({ add_moderators: [tommasoId] });
    expect((await getServerMember(client, cid, tommasoId)).channel_role).toBe(
      'channel_moderator',
    );

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Remove Moderators" tab="Node.js" index=1
    // COPY: channelId="general", tommasoId="tommaso"
    const channel = client.chat.channel('messaging', channelId);
    await channel.update({ demote_moderators: [tommasoId] });
    // #endregion snippet

    const member = await getServerMember(client, cid, tommasoId);
    expect(member.channel_role).toBe('channel_member');
  });

  it('adds member custom data', async () => {
    const channelId = uniqueId('general');
    const cid = `messaging:${channelId}`;
    cleanup.channels.push(cid);

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Adding Custom Data" tab="Node.js" index=1
    // COPY: channelId="general", myUserId="myuserid", userId1="userid1", userId2="userid2", userId3="userid3"
    // Add custom data while creating the channel
    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({
      data: {
        created_by_id: myUserId,
        members: [
          { user_id: userId1, custom: { key1: 'value1' } },
          { user_id: userId2, custom: { key1: 'value1' } },
          { user_id: userId3, custom: { key2: 'value2' } },
        ],
      },
    });

    // Add custom data when adding members
    await channel.update({
      add_members: [{ user_id: userId1, custom: { key1: 'value1' } }],
    });
    // #endregion snippet

    expect((await getServerMember(client, cid, userId1)).custom).toEqual({
      key1: 'value1',
    });
    expect((await getServerMember(client, cid, userId2)).custom).toEqual({
      key1: 'value1',
    });
    expect((await getServerMember(client, cid, userId3)).custom).toEqual({
      key2: 'value2',
    });
  });

  it('partially updates member data', async () => {
    const channelId = await newChannel([janeId]);
    const cid = `messaging:${channelId}`;

    // #region snippet docs="_default/03-channels/06-channel_members.md" heading="Updating Member Data" tab="Node.js" index=1
    // COPY: channelId="general", janeId="jane"
    const channel = client.chat.channel('messaging', channelId);

    // Set some fields
    await channel.updateMemberPartial({
      user_id: janeId,
      set: {
        key1: 'new value 1',
        key2: 'new value 2',
        channel_role: 'channel_moderator',
      },
    });

    // Unset some fields
    await channel.updateMemberPartial({
      user_id: janeId,
      unset: ['key1', 'key2'],
    });

    // Set and unset in the same call
    await channel.updateMemberPartial({
      user_id: janeId,
      set: {
        key1: 'new value 1',
        key2: 'new value 2',
      },
      unset: ['key3'],
    });
    // #endregion snippet

    const member = await getServerMember(client, cid, janeId);
    expect(member.channel_role).toBe('channel_moderator');
    expect(member.custom).toEqual({ key1: 'new value 1', key2: 'new value 2' });
  });
});
