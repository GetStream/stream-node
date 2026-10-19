import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { Attachment } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerUser, sendServerMessage } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS =
  'moderation/_default/02-quick-start/02-quick-start-chat-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const blockedWord = 'frobnicate';
  const blocklist = uniqueId('blocklist');
  const channelId = uniqueId('channel');
  const cid = `messaging:${channelId}`;
  // A channel-level policy, so only this test's channel is moderated by it.
  const configKey = `chat:${cid}`;
  const channel = client.chat.channel('messaging', channelId);

  /** Creates a plain user with a `uniqueId` id and registers it for cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** The review queue item of `entityId`, once its flag is there. */
  const waitForFlag = (entityId: string) =>
    retry(async () => {
      const { items } = await client.moderation.queryReviewQueue({
        filter: { entity_id: entityId },
      });
      expect(items).toHaveLength(1);
      expect(items[0].flags).toHaveLength(1);
      return items[0].flags[0];
    });

  beforeAll(async () => {
    cleanup.channels.push(cid);
    const creatorId = await createUser('creator');
    await channel.getOrCreate({
      data: { created_by_id: creatorId, members: [{ user_id: creatorId }] },
    });
    await client.createBlockList({ name: blocklist, words: [blockedWord] });
    cleanup.add(() => client.deleteBlockList({ name: blocklist }));
    // A new blocklist isn't known to the moderation API right away.
    await retry(
      () =>
        client.moderation.upsertConfig({
          key: configKey,
          block_list_config: { rules: [{ name: blocklist, action: 'remove' }] },
        }),
      { retryIf: (error) => String(error).includes('Blocklist not found') },
    );
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('moderates a server-side message with force_moderation', async () => {
    const sentBy = await createUser('sender');
    await channel.update({ add_members: [{ user_id: sentBy }] });
    const text = `you ${blockedWord}`;
    const attachments: Attachment[] = [];

    // Without force_moderation, server-side messages skip moderation.
    const skipped = await sendServerMessage(client, cid, {
      text,
      user_id: sentBy,
    });
    expect(skipped.type).toBe('regular');
    // The new channel policy and blocklist take a moment to reach every API node.
    await retry(async () => {
      const probe = await sendServerMessage(
        client,
        cid,
        { text, user_id: sentBy },
        { force_moderation: true },
      );
      expect(probe.type).toBe('error');
    });

    // #region snippet docs="moderation/_default/02-quick-start/02-quick-start-chat-moderation.md" heading="Server side integration" tab="Node.js" index=1
    const { message } = await channel.sendMessage({
      message: {
        text,
        attachments,
        user_id: sentBy,
      },
      force_moderation: true,
    });
    // #endregion snippet

    expect(message.type).toBe('error');
    expect(message.text).toBe('Message was blocked by moderation policies');
    expect(message.moderation).toMatchObject({
      action: 'remove',
      original_text: text,
      blocklists_matched: [blocklist],
    });
  });

  it('flags a user', async () => {
    const flaggedUserId = await createUser('flagged');
    const reporterId = await createUser('reporter');

    // #region snippet docs="moderation/_default/02-quick-start/02-quick-start-chat-moderation.md" heading="Flag User" tab="Node.js" index=1
    // COPY: flaggedUserId="user_id", reporterId="user_id"
    await client.moderation.flag({
      entity_type: 'stream:user',
      entity_id: flaggedUserId,
      reason: 'reason',
      user_id: reporterId, // User ID who is flagging the user, required only for server-side integration.
    });
    // #endregion snippet

    const flag = await waitForFlag(flaggedUserId);
    expect(flag.reason).toBe('reason');
    expect(flag.user?.id).toBe(reporterId);
  });

  it('flags a message', async () => {
    const authorId = await createUser('author');
    const reporterId = await createUser('reporter');
    await channel.update({
      add_members: [{ user_id: authorId }, { user_id: reporterId }],
    });
    const { id: messageId } = await sendServerMessage(client, cid, {
      text: 'hello',
      user_id: authorId,
    });

    // #region snippet docs="moderation/_default/02-quick-start/02-quick-start-chat-moderation.md" heading="Flag Message" tab="Node.js" index=1
    // COPY: messageId="message_id", reporterId="user_id"
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId,
      reason: 'reason',
      user_id: reporterId, // User ID who is flagging the message, required only for server-side integration.
    });
    // #endregion snippet

    const flag = await waitForFlag(messageId);
    expect(flag.reason).toBe('reason');
    expect(flag.user?.id).toBe(reporterId);
  });

  it('bans and unbans a user', async () => {
    const targetUserId = await createUser('target');
    const moderatorId = await createUser('moderator');
    expect((await getServerUser(client, targetUserId)).banned).toBe(false);

    // #region snippet docs="moderation/_default/02-quick-start/02-quick-start-chat-moderation.md" heading="Ban User" tab="Node.js" index=1
    // COPY: targetUserId="target_user_id", moderatorId="user_id"
    await client.moderation.ban({
      target_user_id: targetUserId,
      banned_by_id: moderatorId, // User ID who is banning the user.
    });
    // #endregion snippet

    expect((await getServerUser(client, targetUserId)).banned).toBe(true);

    // #region snippet docs="moderation/_default/02-quick-start/02-quick-start-chat-moderation.md" heading="Unban User" tab="Node.js" index=1
    // COPY: targetUserId="target_user_id"
    await client.moderation.unban({
      target_user_id: targetUserId,
    });
    // #endregion snippet

    expect((await getServerUser(client, targetUserId)).banned).toBe(false);
  });
});
