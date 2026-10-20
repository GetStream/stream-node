import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS =
  'chat/_default/06-app_and_channel_settings/06-channel-level_settings.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const userId = uniqueId('user');
  const blocklistName = uniqueId('medical-blocklist');
  const channelId = uniqueId('general');
  const channel = client.chat.channel('messaging', channelId);

  /** The channel's merged config (channel type settings plus overrides). */
  const channelConfig = async () => {
    const { channel: response } = await channel.getOrCreate({});
    if (!response?.config) throw new Error('channel has no config');
    return response.config;
  };

  const sendText = (text: string, parentId?: string) =>
    channel.sendMessage({
      message: { text, user_id: userId, parent_id: parentId },
    });

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    await client.createBlockList({ name: blocklistName, words: ['aspirin'] });
    cleanup.add(() => client.deleteBlockList({ name: blocklistName }));
    await channel.getOrCreate({
      data: { created_by_id: userId, members: [{ user_id: userId }] },
    });
    cleanup.channels.push(channel.cid);
  });

  afterAll(() => cleanup.run());

  it('Use a different blocklist', async () => {
    const before = await channelConfig();
    expect(before.blocklist).toBeUndefined();
    expect(before.blocklist_behavior).toBe('flag');

    // #region snippet docs="chat/_default/06-app_and_channel_settings/06-channel-level_settings.md" heading="Use a different blocklist" tab="Node.js" index=1
    // COPY: blocklistName="medical_blocklist"
    await channel.updateChannelPartial({
      set: {
        config_overrides: {
          blocklist: blocklistName,
          blocklist_behavior: 'block',
        },
      },
    });
    // #endregion snippet

    // Only the override is checked: this app (moderation enabled) doesn't block
    // messages with the channel-level blocklist's words.
    const after = await channelConfig();
    expect(after.blocklist).toBe(blocklistName);
    expect(after.blocklist_behavior).toBe('block');
  });

  it('Disables replies', async () => {
    expect((await channelConfig()).replies).toBe(true);
    const { message: parent } = await sendText('parent');
    await sendText('reply before', parent.id);

    // #region snippet docs="chat/_default/06-app_and_channel_settings/06-channel-level_settings.md" heading="Disables replies" tab="Node.js" index=1
    await channel.updateChannelPartial({
      set: { config_overrides: { replies: false } },
    });
    // #endregion snippet

    const after = await channelConfig();
    expect(after.replies).toBe(false);
    // `set` replaces the whole `config_overrides` object: the blocklist override is gone.
    expect(after.blocklist).toBeUndefined();
    await expect(sendText('reply after', parent.id)).rejects.toMatchObject({
      code: 19,
      metadata: { responseCode: 400 },
    });
  });

  it('Remove overrides and go back to default settings', async () => {
    const before = await channelConfig();
    expect(before.replies).toBe(false);

    // #region snippet docs="chat/_default/06-app_and_channel_settings/06-channel-level_settings.md" heading="Remove overrides and go back to default settings" tab="Node.js" index=1
    await channel.updateChannelPartial({ set: { config_overrides: {} } });
    // #endregion snippet

    const after = await channelConfig();
    expect(after.replies).toBe(true);
    expect(after.blocklist).toBeUndefined();
    expect(after.blocklist_behavior).toBe('flag');
  });
});
