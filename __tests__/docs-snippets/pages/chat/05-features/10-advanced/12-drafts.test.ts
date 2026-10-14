import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUserToken, getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

describe('chat/_default/05-features/10-advanced/12-drafts.md', () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const ownerId = uniqueId('owner');

  /**
   * Draft creation has no server-side endpoint (the docs say so), so setup creates drafts
   * as the user through the client-side REST endpoint, signed with a user token.
   */
  const createDraft = async (
    userId: string,
    channelId: string,
    message: { text: string; parent_id?: string },
  ) => {
    const url = `https://chat.stream-io-api.com/channels/messaging/${channelId}/draft?api_key=${process.env.STREAM_API_KEY as string}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: createUserToken(userId),
        'stream-auth-type': 'jwt',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) {
      throw new Error(`createDraft failed: ${res.status} ${await res.text()}`);
    }
  };

  /** A `messaging` channel with `memberIds` as members. */
  const createChannel = async (memberIds: string[]) => {
    const channelId = uniqueId('general');
    cleanup.channels.push(`messaging:${channelId}`);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: ownerId,
        members: memberIds.map((user_id) => ({ user_id })),
      },
    });
    return channelId;
  };

  /** A user with its own channel, a parent message, and a channel and a thread draft. */
  const setupUserWithDrafts = async () => {
    const userId = uniqueId('user');
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    const channelId = await createChannel([userId]);
    const { message } = await client.chat
      .channel('messaging', channelId)
      .sendMessage({ message: { text: 'parent', user_id: userId } });
    const parentMessageId = message.id;
    await createDraft(userId, channelId, { text: 'channel draft' });
    await createDraft(userId, channelId, {
      text: 'thread draft',
      parent_id: parentMessageId,
    });
    return { userId, channelId, parentMessageId };
  };

  beforeAll(async () => {
    cleanup.users.push(ownerId);
    await client.upsertUsers([{ id: ownerId }]);
  });

  afterAll(() => cleanup.run());

  it('deletes a channel and a thread draft', async () => {
    const { userId, channelId, parentMessageId } = await setupUserWithDrafts();
    const before = await client.chat.queryDrafts({ user_id: userId });
    expect(before.drafts).toHaveLength(2);

    // #region snippet docs="chat/_default/05-features/10-advanced/12-drafts.md" heading="Deleting a draft message" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Channel draft
    await channel.deleteDraft({ user_id: userId });

    // Thread draft
    await channel.deleteDraft({ user_id: userId, parent_id: parentMessageId });
    // #endregion snippet

    const { drafts } = await client.chat.queryDrafts({ user_id: userId });
    expect(drafts).toEqual([]);
  });

  it('loads a channel and a thread draft', async () => {
    const { userId, channelId, parentMessageId } = await setupUserWithDrafts();

    // #region snippet docs="chat/_default/05-features/10-advanced/12-drafts.md" heading="Loading a draft message" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Channel draft
    const draft = await channel.getDraft({ user_id: userId });

    // Thread draft
    const threadDraft = await channel.getDraft({
      user_id: userId,
      parent_id: parentMessageId,
    });
    // #endregion snippet

    expect(draft.draft.message.text).toBe('channel draft');
    expect(draft.draft.channel_cid).toBe(`messaging:${channelId}`);
    expect(draft.draft.parent_id).toBeUndefined();
    expect(threadDraft.draft.message.text).toBe('thread draft');
    expect(threadDraft.draft.parent_id).toBe(parentMessageId);
  });

  it('queries drafts', async () => {
    const userId = uniqueId('user');
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    const channel1 = await createChannel([userId]);
    const channel2 = await createChannel([userId]);
    const channel3 = await createChannel([userId]);
    await createDraft(userId, channel1, { text: 'draft 1' });
    await createDraft(userId, channel2, { text: 'draft 2' });
    await createDraft(userId, channel3, { text: 'draft 3' });
    const cid1 = `messaging:${channel1}`;
    const cid2 = `messaging:${channel2}`;

    // #region snippet docs="chat/_default/05-features/10-advanced/12-drafts.md" heading="Querying draft messages" tab="Node.js" index=1
    // COPY: cid1="messaging:channel-1", cid2="messaging:channel-2"
    // Query all user drafts
    const response = await client.chat.queryDrafts({
      user_id: userId,
    });

    // Query drafts for certain channels and sort
    const filteredResponse = await client.chat.queryDrafts({
      user_id: userId,
      filter: {
        channel_cid: { $in: [cid1, cid2] },
      },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    expect(response.drafts.map((d) => d.channel_cid).sort()).toEqual(
      [cid1, cid2, `messaging:${channel3}`].sort(),
    );
    // Newest first: draft 2 was created after draft 1.
    expect(filteredResponse.drafts.map((d) => d.channel_cid)).toEqual([
      cid2,
      cid1,
    ]);
  });

  it('paginates drafts', async () => {
    const userId = uniqueId('user');
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    const channel1 = await createChannel([userId]);
    const channel2 = await createChannel([userId]);
    await createDraft(userId, channel1, { text: 'draft 1' });
    await createDraft(userId, channel2, { text: 'draft 2' });
    // Two drafts, one per page.
    const pageSize = 1;

    // #region snippet docs="chat/_default/05-features/10-advanced/12-drafts.md" heading="Pagination" tab="Node.js" index=1
    // COPY: pageSize=5
    // Query drafts with a limit
    const firstPage = await client.chat.queryDrafts({
      user_id: userId,
      limit: pageSize,
    });

    // Query the next page
    const secondPage = await client.chat.queryDrafts({
      user_id: userId,
      limit: pageSize,
      next: firstPage.next,
    });
    // #endregion snippet

    expect(firstPage.drafts).toHaveLength(1);
    expect(firstPage.next).toBeTruthy();
    expect(secondPage.drafts).toHaveLength(1);
    expect(
      [...firstPage.drafts, ...secondPage.drafts].map((d) => d.channel_cid),
    ).toEqual([`messaging:${channel2}`, `messaging:${channel1}`]);
  });
});
