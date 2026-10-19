import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { SendReactionResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage } from '../../../helpers/server';

const DOCS = 'chat/_default/04-messages/04-send_reaction.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const john = uniqueId('john');
  const alice = uniqueId('alice');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  const newMessage = async (text: string) =>
    sendServerMessage(client, cid, { text, user_id: alice });

  const reactionsOf = async (id: string) =>
    (await client.chat.getReactions({ id, limit: 100 })).reactions;

  beforeAll(async () => {
    cleanup.users.push(john, alice);
    await client.upsertUsers([{ id: john }, { id: alice }]);

    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: alice,
        members: [{ user_id: john }, { user_id: alice }],
      },
    });
  });

  afterAll(() => cleanup.run());

  it('sends reactions', async () => {
    const messageID = (await newMessage('React to me')).id;
    // A "like" reaction from john that enforce_unique should remove.
    await client.chat.sendReaction({
      id: messageID,
      reaction: { type: 'like', user_id: john },
    });
    const spy = vi.spyOn(client.chat, 'sendReaction');

    // #region snippet docs="chat/_default/04-messages/04-send_reaction.md" heading="Sending a Reaction" tab="Node.js" index=1
    // COPY: john="john"
    // Add a reaction. Server-side calls must name the reacting user.
    const { reaction } = await client.chat.sendReaction({
      id: messageID,
      reaction: { type: 'love', user_id: john },
    });

    // Add a reaction with custom data
    await client.chat.sendReaction({
      id: messageID,
      reaction: {
        type: 'love',
        user_id: john,
        custom: { customField: 'value' },
      },
    });

    // Replace all existing reactions from this user with the new one
    await client.chat.sendReaction({
      id: messageID,
      reaction: { type: 'love', user_id: john },
      enforce_unique: true,
    });
    // #endregion snippet

    const results = await Promise.all(
      spy.mock.results.map((r) => r.value as Promise<SendReactionResponse>),
    );
    spy.mockRestore();
    expect(results).toHaveLength(3);
    expect(results[1].reaction.custom).toMatchObject({ customField: 'value' });
    expect(reaction.type).toBe('love');
    expect(reaction.user_id).toBe(john);
    expect(reaction.message_id).toBe(messageID);
    const reactions = await reactionsOf(messageID);
    expect(reactions.map((r) => r.type)).toEqual(['love']);
    expect(reactions[0].user_id).toBe(john);
  });

  it('removes a reaction', async () => {
    const messageID = (await newMessage('Remove my reaction')).id;
    await client.chat.sendReaction({
      id: messageID,
      reaction: { type: 'love', user_id: john },
    });
    expect(await reactionsOf(messageID)).toHaveLength(1);

    // #region snippet docs="chat/_default/04-messages/04-send_reaction.md" heading="Removing a Reaction" tab="Node.js" index=1
    // COPY: john="john"
    await client.chat.deleteReaction({
      id: messageID,
      type: 'love',
      user_id: john,
    });
    // #endregion snippet

    expect(await reactionsOf(messageID)).toHaveLength(0);
  });

  it('paginates reactions', async () => {
    const messageID = (await newMessage('Many reactions')).id;
    // 13 reactions: one user can have one reaction of each type.
    for (let i = 0; i < 13; i++) {
      await client.chat.sendReaction({
        id: messageID,
        reaction: { type: `type${i}`, user_id: john },
      });
    }

    // #region snippet docs="chat/_default/04-messages/04-send_reaction.md" heading="Paginating Reactions" tab="Node.js" index=1
    // Get the first 10 reactions
    const response = await client.chat.getReactions({
      id: messageID,
      limit: 10,
    });

    // Get reactions 11-13
    const nextResponse = await client.chat.getReactions({
      id: messageID,
      limit: 3,
      offset: 10,
    });
    // #endregion snippet

    expect(response.reactions).toHaveLength(10);
    expect(nextResponse.reactions).toHaveLength(3);
    const all = [...response.reactions, ...nextResponse.reactions].map(
      (r) => r.type,
    );
    expect(new Set(all).size).toBe(13);
  });

  it('queries reactions', async () => {
    const message = await newMessage('Query my reactions');
    const userId = john;
    for (const [type, user_id] of [
      ['like', john],
      ['love', john],
      ['like', alice],
    ]) {
      await client.chat.sendReaction({
        id: message.id,
        reaction: { type, user_id },
      });
    }

    // #region snippet docs="chat/_default/04-messages/04-send_reaction.md" heading="Querying Reactions" tab="Node.js" index=1
    // Query reactions by type
    await client.chat.queryReactions({
      id: message.id,
      filter: { type: 'like' },
    });

    // Query reactions by user
    await client.chat.queryReactions({
      id: message.id,
      filter: { user_id: userId },
    });

    // Paginate results
    const firstPage = await client.chat.queryReactions({ id: message.id });
    const secondPage = await client.chat.queryReactions({
      id: message.id,
      limit: 5,
      next: firstPage.next,
    });
    // #endregion snippet

    const byType = await client.chat.queryReactions({
      id: message.id,
      filter: { type: 'like' },
    });
    expect(byType.reactions.map((r) => r.user_id).sort()).toEqual(
      [alice, john].sort(),
    );
    const byUser = await client.chat.queryReactions({
      id: message.id,
      filter: { user_id: userId },
    });
    expect(byUser.reactions.map((r) => r.type).sort()).toEqual([
      'like',
      'love',
    ]);
    expect(firstPage.reactions).toHaveLength(3);
    expect(Array.isArray(secondPage.reactions)).toBe(true);
  });

  it('sends cumulative reactions', async () => {
    const messageID = (await newMessage('Clap for me')).id;

    // #region snippet docs="chat/_default/04-messages/04-send_reaction.md" heading="Cumulative Reactions" tab="Node.js" index=1
    // COPY: john="john"
    // User claps 5 times
    await client.chat.sendReaction({
      id: messageID,
      reaction: { type: 'clap', score: 5, user_id: john },
    });

    // Same user claps 20 more times (total becomes 25)
    await client.chat.sendReaction({
      id: messageID,
      reaction: { type: 'clap', score: 25, user_id: john },
    });
    // #endregion snippet

    const reactions = await reactionsOf(messageID);
    expect(reactions).toHaveLength(1);
    expect(reactions[0].score).toBe(25);
    const { message } = await client.chat.getMessage({ id: messageID });
    expect(message.reaction_groups?.clap?.sum_scores).toBe(25);
  });
});
