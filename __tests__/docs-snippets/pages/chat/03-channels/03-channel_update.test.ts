import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'chat/_default/03-channels/03-channel_update.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const userId = uniqueId('myuserid');
  const partialChannelId = uniqueId('partial');
  const fullChannelId = uniqueId('full');

  const getCustom = async (channelId: string) => {
    const { channels } = await client.chat.queryChannels({
      filter_conditions: { cid: `messaging:${channelId}` },
    });
    expect(channels).toHaveLength(1);
    return channels[0].channel?.custom;
  };

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);

    // The partial update snippet creates its own channel.
    cleanup.channels.push(`messaging:${partialChannelId}`);

    // A channel with custom data that the full update must remove.
    cleanup.channels.push(`messaging:${fullChannelId}`);
    await client.chat.channel('messaging', fullChannelId).getOrCreate({
      data: {
        created_by_id: userId,
        custom: { topic: 'Plants and Animals', color: 'red' },
      },
    });
  });

  afterAll(() => cleanup.run());

  it('partially updates a channel', async () => {
    const type = 'messaging';
    const id = partialChannelId;

    // #region snippet docs="chat/_default/03-channels/03-channel_update.md" heading="Partial Update" tab="Node.js" index=1
    // COPY: userId="myuserid"
    // Here's a channel with some custom field data that might be useful
    const channel = client.chat.channel(type, id);
    await channel.getOrCreate({
      data: {
        created_by_id: userId,
        custom: {
          source: 'user',
          source_detail: { user_id: 123 },
          channel_detail: { topic: 'Plants and Animals', rating: 'pg' },
        },
      },
    });

    // let's change the source of this channel
    await channel.updateChannelPartial({ set: { source: 'system' } });

    // since it's system generated we no longer need source_detail
    await channel.updateChannelPartial({ unset: ['source_detail'] });

    // and finally update one of the nested fields in the channel_detail
    await channel.updateChannelPartial({
      set: { 'channel_detail.topic': 'Nature' },
    });

    // and maybe we decide we no longer need a rating
    await channel.updateChannelPartial({ unset: ['channel_detail.rating'] });
    // #endregion snippet

    const custom = await getCustom(partialChannelId);
    expect(custom?.source).toBe('system');
    expect(custom).not.toHaveProperty('source_detail');
    expect(custom?.channel_detail).toEqual({ topic: 'Nature' });
  });

  it('fully updates a channel', async () => {
    const channel = client.chat.channel('messaging', fullChannelId);

    // #region snippet docs="chat/_default/03-channels/03-channel_update.md" heading="Full Update" tab="Node.js" index=1
    // `name` and `color` are custom data, so they go under `data.custom`.
    const update = await channel.update({
      data: {
        custom: {
          name: 'myspecialchannel',
          color: 'green',
        },
      },
    });
    // #endregion snippet

    expect(update.channel?.custom.name).toBe('myspecialchannel');

    const custom = await getCustom(fullChannelId);
    expect(custom?.name).toBe('myspecialchannel');
    expect(custom?.color).toBe('green');
    // Data not included in a full update is deleted.
    expect(custom).not.toHaveProperty('topic');
  });
});
