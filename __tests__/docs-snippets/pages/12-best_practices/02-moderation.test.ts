import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type {
  FlagItemResponse,
  UpdateAppRequest,
  UpdateChannelResponse,
} from '../../../../index';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import {
  getServerChannel,
  getServerMember,
  getServerUser,
  sendServerMessage,
  waitForAppSetting,
} from '../../helpers/server';
import { retry, waitForChannelTypePropagation } from '../../helpers/wait';

const DOCS = '_default/12-best_practices/02-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The docs change the built-in "messaging" type: use uniqueId types instead.
  const grantsType = uniqueId('messaging');
  const commandsType = uniqueId('messaging');

  const authorId = uniqueId('author');
  const channelCid = `messaging:${uniqueId('channel')}`;

  /** A new user, registered for cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A new `messaging` channel created by `creatorId`, registered for cleanup. */
  const createChannel = async (creatorId: string) => {
    const id = uniqueId('channel');
    cleanup.channels.push(`messaging:${id}`);
    await client.chat
      .channel('messaging', id)
      .getOrCreate({ data: { created_by_id: creatorId } });
    return id;
  };

  /** A message by the author in the shared channel. */
  const createMessage = async () =>
    (
      await sendServerMessage(client, channelCid, {
        text: 'buy cheap stuff now',
        user_id: authorId,
      })
    ).id;

  beforeAll(async () => {
    cleanup.users.push(authorId);
    await client.upsertUsers([{ id: authorId }]);
    const [type, id] = channelCid.split(':');
    cleanup.channels.push(channelCid);
    await client.chat
      .channel(type, id)
      .getOrCreate({ data: { created_by_id: authorId } });

    for (const name of [grantsType, commandsType]) {
      await client.chat.createChannelType({
        name,
        automod: 'disabled',
        automod_behavior: 'flag',
        max_message_length: 5000,
      });
      cleanup.channelTypes.push(name);
    }
    await waitForChannelTypePropagation();
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('removes link and attachment permissions from channel_member', async () => {
    const original = (await client.chat.getChannelType({ name: grantsType }))
      .grants.channel_member;
    // The snippet only proves something if the role had these permissions.
    expect(original).toEqual(
      expect.arrayContaining([
        'add-links',
        'create-attachment',
        'upload-attachment',
      ]),
    );
    const channelType = grantsType;

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Disabling the permission to post links or add attachments" tab="Node.js" index=1
    // COPY: channelType="messaging"
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({ name: channelType });

    // Remove link and attachment permissions for channel_member role
    await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      grants: {
        channel_member: [
          'read-channel',
          'create-message',
          'update-message-owner',
          'delete-message-owner',
          // "add-links" - removed to disable links
          // "create-attachment" - removed to disable attachments
          // "upload-attachment" - removed to disable uploads
        ],
      },
    });
    // #endregion snippet

    await waitForChannelTypePropagation();
    const { grants } = await client.chat.getChannelType({ name: grantsType });
    expect([...grants.channel_member].sort()).toEqual(
      [
        'read-channel',
        'create-message',
        'update-message-owner',
        'delete-message-owner',
      ].sort(),
    );
  });

  it('restricts image and file uploads', async () => {
    const { app } = await client.getApp();
    const originalImage = app.image_upload_config;
    const originalFile = app.file_upload_config;
    cleanup.add(async () => {
      await client.updateApp({
        image_upload_config: originalImage,
        file_upload_config: originalFile,
      });
      await waitForAppSetting(client, 'image_upload_config', originalImage);
      await waitForAppSetting(client, 'file_upload_config', originalFile);
    });

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Image & Video file types" tab="Node.js" index=1
    // Restrict images to common formats only
    await client.updateApp({
      image_upload_config: {
        allowed_file_extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
        allowed_mime_types: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
        size_limit: 5 * 1024 * 1024, // 5MB
      },
      // Restrict file uploads to documents only
      file_upload_config: {
        allowed_file_extensions: ['.pdf', '.doc', '.docx'],
        allowed_mime_types: ['application/pdf', 'application/msword'],
        size_limit: 10 * 1024 * 1024, // 10MB
      },
    });
    // #endregion snippet

    await retry(async () => {
      const { app: updated } = await client.getApp();
      expect(updated.image_upload_config).toMatchObject({
        allowed_file_extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
        allowed_mime_types: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
        size_limit: 5 * 1024 * 1024,
      });
      expect(updated.file_upload_config).toMatchObject({
        allowed_file_extensions: ['.pdf', '.doc', '.docx'],
        allowed_mime_types: ['application/pdf', 'application/msword'],
        size_limit: 10 * 1024 * 1024,
      });
    });
  });

  describe('Giving moderators more permissions', () => {
    it('adds a channel moderator and promotes a member', async () => {
      const jamesBond = await createUser('james-bond');
      const channelId = await createChannel(authorId);
      const updateChannel = vi.spyOn(client.chat, 'updateChannel');

      // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Giving moderators more permissions" tab="Node.js" index=1
      // COPY: channelId="channel-id", jamesBond="james_bond"
      const channel = client.chat.channel('messaging', channelId);

      // Add a member with moderator role
      await channel.update({
        add_members: [
          { user_id: jamesBond, channel_role: 'channel_moderator' },
        ],
      });

      // Or promote someone who is already a member
      await channel.update({
        assign_roles: [
          { user_id: jamesBond, channel_role: 'channel_moderator' },
        ],
      });
      // #endregion snippet

      const [added, assigned] = await Promise.all(
        updateChannel.mock.results.map(
          (r) => r.value as Promise<UpdateChannelResponse>,
        ),
      );
      for (const response of [added, assigned]) {
        expect(response.members).toEqual([
          expect.objectContaining({
            user_id: jamesBond,
            channel_role: 'channel_moderator',
          }),
        ]);
      }
      expect(
        (await getServerMember(client, channel.cid, jamesBond)).channel_role,
      ).toBe('channel_moderator');
    });

    it('makes a user an admin across all channels', async () => {
      const jamesBond = await createUser('james-bond');
      expect((await getServerUser(client, jamesBond)).role).toBe('user');

      // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Giving moderators more permissions" tab="Node.js" index=2
      // COPY: jamesBond="james_bond"
      await client.updateUsersPartial({
        users: [{ id: jamesBond, set: { role: 'admin' } }],
      });
      // #endregion snippet

      expect((await getServerUser(client, jamesBond)).role).toBe('admin');
    });
  });

  it('enables, changes and disables slow mode', async () => {
    const channelId = await createChannel(authorId);
    const updateChannel = vi.spyOn(client.chat, 'updateChannel');

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Slow mode" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // slow mode is the channel cooldown, in seconds
    // enable slow mode and set cooldown to 1s
    await channel.update({ cooldown: 1 });

    // increase cooldown to 30s
    await channel.update({ cooldown: 30 });

    // disable slow mode
    await channel.update({ cooldown: 0 });
    // #endregion snippet

    const responses = await Promise.all(
      updateChannel.mock.results.map(
        (r) => r.value as Promise<UpdateChannelResponse>,
      ),
    );
    expect(responses.map((r) => r.channel?.cooldown ?? 0)).toEqual([1, 30, 0]);
    const current = await getServerChannel(client, channel.cid);
    expect(current.channel?.cooldown ?? 0).toBe(0);
  });

  it('enforces unique usernames on app and team level', async () => {
    const { app } = await client.getApp();
    const original = app.enforce_unique_usernames;
    cleanup.add(async () => {
      await client.updateApp({
        enforce_unique_usernames:
          original as UpdateAppRequest['enforce_unique_usernames'],
      });
      await waitForAppSetting(client, 'enforce_unique_usernames', original);
    });
    const updateApp = vi.spyOn(client, 'updateApp');

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Enforce unique usernames" tab="Node.js" index=1
    // Enable uniqueness constraints on App level
    await client.updateApp({
      enforce_unique_usernames: 'app',
    });

    // Enable uniqueness constraints on Team level
    await client.updateApp({
      enforce_unique_usernames: 'team',
    });
    // #endregion snippet

    expect(
      updateApp.mock.calls.map(
        ([request]) => request?.enforce_unique_usernames,
      ),
    ).toEqual(['app', 'team']);
    await waitForAppSetting(client, 'enforce_unique_usernames', 'team', {
      agreeing: 5,
    });
  });

  it('enables the ban and unban commands', async () => {
    const channelType = commandsType;

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Slash commands for banning" tab="Node.js" index=1
    // COPY: channelType="messaging"
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({ name: channelType });

    // Enable ban/unban commands for a channel type
    await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      commands: ['giphy', 'ban', 'unban', 'mute', 'unmute', 'flag'],
    });
    // #endregion snippet

    await waitForChannelTypePropagation();
    const { commands } = await client.chat.getChannelType({
      name: commandsType,
    });
    expect(commands.map((command) => command.name)).toEqual(
      expect.arrayContaining(['giphy', 'ban', 'unban', 'mute', 'unmute']),
    );
  });

  /** The review queue item of `messageId`, once its flag is there. */
  const waitForFlag = (messageId: string) =>
    retry(async () => {
      const { items } = await client.moderation.queryReviewQueue({
        filter: { entity_id: messageId },
      });
      expect(items).toHaveLength(1);
      expect(items[0].flags).toHaveLength(1);
      return items[0].flags[0];
    });

  it('flags a message', async () => {
    const reportingUserId = await createUser('reporting-user');
    const messageId = await createMessage();
    const anotherMessageId = await createMessage();
    const flag = vi.spyOn(client.moderation, 'flag');

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Flag" tab="Node.js" index=1
    // COPY: reportingUserId="reporting-user-id"
    // Flag a message. Server-side the flag must name the reporting user.
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId,
      user_id: reportingUserId,
    });

    // Flag with a reason and custom data
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: anotherMessageId,
      user_id: reportingUserId,
      reason: 'spammy_user',
      custom: {
        user_comment: 'This user is spamming.',
      },
    });
    // #endregion snippet

    const responses = await Promise.all(
      flag.mock.results.map((r) => r.value as Promise<FlagItemResponse>),
    );
    expect(responses.every((r) => typeof r.item_id === 'string')).toBe(true);
    const plain = await waitForFlag(messageId);
    expect(plain.user?.id).toBe(reportingUserId);
    expect(plain.reason).toBeUndefined();
    expect(await waitForFlag(anotherMessageId)).toMatchObject({
      reason: 'spammy_user',
      custom: { user_comment: 'This user is spamming.' },
    });
  });

  it('flags a message with reasons and custom data', async () => {
    const reportingUserId = await createUser('reporting-user');
    const messageID = await createMessage();
    const anotherMessageID = await createMessage();
    const thirdMessageID = await createMessage();

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Reasons & custom data" tab="Node.js" index=1
    // COPY: reportingUserId="reporting-user-id"
    // flag with a reason
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageID,
      user_id: reportingUserId,
      reason: 'spammy_user',
    });

    // flag with a reason and additional custom data
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: anotherMessageID,
      user_id: reportingUserId,
      reason: 'spammy_user',
      custom: {
        user_comment: 'This user is spamming the homepage.',
        page: 'homepage',
      },
    });

    // flag with only custom data
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: thirdMessageID,
      user_id: reportingUserId,
      custom: {
        page: 'homepage',
      },
    });
    // #endregion snippet

    expect(await waitForFlag(messageID)).toMatchObject({
      reason: 'spammy_user',
    });
    expect(await waitForFlag(anotherMessageID)).toMatchObject({
      reason: 'spammy_user',
      custom: {
        user_comment: 'This user is spamming the homepage.',
        page: 'homepage',
      },
    });
    const customOnly = await waitForFlag(thirdMessageID);
    expect(customOnly.reason).toBeUndefined();
    expect(customOnly.custom).toEqual({ page: 'homepage' });
  });

  it('queries flagged messages', async () => {
    const reportingUserId = await createUser('reporting-user');
    const messageId = await createMessage();
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId,
      user_id: reportingUserId,
    });
    await waitForFlag(messageId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Query Flagged Messages" tab="Node.js" index=1
    const response = await client.moderation.queryReviewQueue({
      filter: { entity_type: 'stream:chat:v1:message' },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 25,
    });

    for (const item of response.items) {
      console.log(item.message?.id);
      console.log(item.message?.text);
      console.log(item.message?.type);
      console.log(item.message?.created_at);
    }

    console.log(response.next); // <-- next cursor for pagination
    // #endregion snippet

    expect(response.items.length).toBeGreaterThan(0);
    expect(response.items.length).toBeLessThanOrEqual(25);
    expect(
      response.items.every((i) => i.entity_type === 'stream:chat:v1:message'),
    ).toBe(true);
    // The message flagged above is the newest item.
    expect(response.items[0].entity_id).toBe(messageId);
    expect(log.mock.calls.slice(0, 2)).toEqual([
      [messageId],
      ['buy cheap stuff now'],
    ]);
    expect(log.mock.calls.at(-1)).toEqual([response.next]);
  });

  it('blocks, lists and unblocks a user', async () => {
    const user1Id = await createUser('user1');
    const user2Id = await createUser('user2');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Server Side" tab="Node.js" index=1
    // COPY: user1Id="user1", user2Id="user2"
    const blockingUser = user1Id;
    const blockedUser = user2Id;

    // Blocks a user on behalf of `blockingUser`.
    await client.blockUsers({
      blocked_user_id: blockedUser,
      user_id: blockingUser,
    });

    const { blocks } = await client.getBlockedUsers({ user_id: blockingUser });
    // #endregion snippet

    expect(blocks.map((b) => b.blocked_user_id)).toEqual([user2Id]);

    {
      // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Server Side" tab="Node.js" index=3
      const { blocks } = await client.getBlockedUsers({
        user_id: blockingUser,
      });

      for (const block of blocks) {
        console.log(block.blocked_user_id);
      }
      // #endregion snippet
    }

    expect(log.mock.calls).toEqual([[user2Id]]);

    // #region snippet docs="_default/12-best_practices/02-moderation.md" heading="Server Side" tab="Node.js" index=2
    await client.unblockUsers({
      blocked_user_id: blockedUser,
      user_id: blockingUser,
    });
    // #endregion snippet

    const after = await client.getBlockedUsers({ user_id: user1Id });
    expect(after.blocks).toEqual([]);
  });
});
