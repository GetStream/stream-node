import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerMember } from '../../../../helpers/server';

const DOCS =
  'chat/_default/03-channels/07-channel_management/16-channel_invites.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const ownerId = uniqueId('owner');
  const nickId = uniqueId('nick');
  const robId = uniqueId('rob');

  // one channel per snippet, plus one per invite status for rob
  const inviteChannelId = uniqueId('general');
  const acceptChannelId = uniqueId('awesome-chat');
  const rejectChannelId = uniqueId('general');
  const robAcceptedChannelId = uniqueId('rob-accepted');
  const robPendingChannelId = uniqueId('rob-pending');

  const createChannel = async (id: string, invites: string[]) => {
    cleanup.channels.push(`messaging:${id}`);
    await client.chat.channel('messaging', id).getOrCreate({
      data: {
        created_by_id: ownerId,
        members: [{ user_id: ownerId }],
        invites: invites.map((user_id) => ({ user_id })),
      },
    });
  };

  beforeAll(async () => {
    cleanup.users.push(ownerId, nickId, robId);
    await client.upsertUsers([{ id: ownerId }, { id: nickId }, { id: robId }]);
    await createChannel(inviteChannelId, []);
    await createChannel(acceptChannelId, [nickId]);
    await createChannel(rejectChannelId, [robId]);
    await createChannel(robAcceptedChannelId, [robId]);
    await createChannel(robPendingChannelId, [robId]);
    await client.chat
      .channel('messaging', robAcceptedChannelId)
      .update({ accept_invite: true, user_id: robId });
  });

  afterAll(() => cleanup.run());

  it('invites a user', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/16-channel_invites.md" heading="Invite Users" tab="Node.js" index=1
    // COPY: inviteChannelId="general", nickId="nick"
    // Get a channel
    const channel = client.chat.channel('messaging', inviteChannelId);

    await channel.update({ invites: [{ user_id: nickId }] });
    // #endregion snippet

    const member = await getServerMember(
      client,
      `messaging:${inviteChannelId}`,
      nickId,
    );
    expect(member.invited).toBe(true);
    expect(member.invite_accepted_at).toBeUndefined();
    expect(member.invite_rejected_at).toBeUndefined();
  });

  it('accepts an invite with a system message', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/16-channel_invites.md" heading="Accept an Invite" tab="Node.js" index=1
    // COPY: acceptChannelId="awesome-chat", nickId="nick"
    // initialize the channel
    const channel = client.chat.channel('messaging', acceptChannelId);

    // accept the invite on behalf of nick, posting a system message
    await channel.update({
      accept_invite: true,
      user_id: nickId,
      message: { text: 'Nick joined this channel!', user_id: nickId },
    });
    // #endregion snippet

    const member = await getServerMember(
      client,
      `messaging:${acceptChannelId}`,
      nickId,
    );
    expect(member.invite_accepted_at).toBeDefined();

    const { messages } = await channel.getOrCreate({
      state: true,
      messages: { limit: 10 },
    });
    expect(
      messages.some(
        (m) => m.text === 'Nick joined this channel!' && m.user.id === nickId,
      ),
    ).toBe(true);
  });

  it('rejects an invite', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/16-channel_invites.md" heading="Reject an Invite" tab="Node.js" index=1
    // COPY: rejectChannelId="general", robId="rob"
    const channel = client.chat.channel('messaging', rejectChannelId);

    await channel.update({ reject_invite: true, user_id: robId });
    // #endregion snippet

    const member = await getServerMember(
      client,
      `messaging:${rejectChannelId}`,
      robId,
    );
    expect(member.invite_rejected_at).toBeDefined();
  });

  it('queries accepted invites', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/16-channel_invites.md" heading="Query Accepted Invites" tab="Node.js" index=1
    // COPY: robId="rob"
    // Query accepted invites for user rob
    const invites = await client.chat.queryChannels({
      filter_conditions: { invite: 'accepted' },
      user_id: robId,
    });
    // #endregion snippet

    expect(invites.channels.map((c) => c.channel?.id)).toEqual([
      robAcceptedChannelId,
    ]);
  });

  it('queries rejected invites', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/16-channel_invites.md" heading="Query Rejected Invites" tab="Node.js" index=1
    // COPY: robId="rob"
    // Query rejected invites for user rob
    const invites = await client.chat.queryChannels({
      filter_conditions: { invite: 'rejected' },
      user_id: robId,
    });
    // #endregion snippet

    expect(invites.channels.map((c) => c.channel?.id)).toEqual([
      rejectChannelId,
    ]);
  });

  it('queries pending invites', async () => {
    // #region snippet docs="chat/_default/03-channels/07-channel_management/16-channel_invites.md" heading="Query Pending Invites" tab="Node.js" index=1
    // COPY: robId="rob"
    // Query pending invites for user rob
    const invites = await client.chat.queryChannels({
      filter_conditions: { invite: 'pending' },
      user_id: robId,
    });
    // #endregion snippet

    expect(invites.channels.map((c) => c.channel?.id)).toEqual([
      robPendingChannelId,
    ]);
  });
});
