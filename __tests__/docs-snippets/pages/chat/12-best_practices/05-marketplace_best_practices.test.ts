import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  getServerChannel,
  getServerUser,
  sendServerMessage,
  waitForAppSetting,
} from '../../../helpers/server';
import { retry, waitForChannelTypePropagation } from '../../../helpers/wait';

const DOCS = 'chat/_default/12-best_practices/05-marketplace_best_practices.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The docs change the built-in "messaging" type: use uniqueId types instead.
  const featuresType = uniqueId('messaging');
  // Created with the recommended features off, so the "Recommended Settings" fence
  // has something to turn on.
  const settingsType = uniqueId('messaging');

  const buyerId = uniqueId('buyer');
  const sellerId = uniqueId('seller');

  beforeAll(async () => {
    cleanup.users.push(buyerId, sellerId);
    await client.upsertUsers([{ id: buyerId }, { id: sellerId }]);

    const { app } = await client.getApp();
    const originalInterval = app.reminders_interval;
    const originalResponseTime = app.user_response_time_enabled;
    cleanup.add(async () => {
      await client.updateApp({
        reminders_interval: originalInterval,
        user_response_time_enabled: originalResponseTime,
      });
      await waitForAppSetting(client, 'reminders_interval', originalInterval);
      await waitForAppSetting(
        client,
        'user_response_time_enabled',
        originalResponseTime,
      );
    });

    await client.chat.createChannelType({
      name: featuresType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(featuresType);
    await client.chat.createChannelType({
      name: settingsType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
      typing_events: false,
      read_events: false,
      reactions: false,
      replies: false,
      uploads: false,
    });
    cleanup.channelTypes.push(settingsType);
    await waitForChannelTypePropagation();
  });

  afterAll(() => cleanup.run());

  it('enables reminders and sets the interval', async () => {
    const before = await client.chat.getChannelType({ name: featuresType });
    expect(before.reminders).toBe(false);
    const { app } = await client.getApp();
    expect(app.reminders_interval).not.toBe(3600);
    const channelType = featuresType;

    // #region snippet docs="chat/_default/12-best_practices/05-marketplace_best_practices.md" heading="Unread Message Reminders" tab="Node.js" index=1
    // COPY: channelType="messaging"
    // Enable reminders for the messaging channel type
    await client.chat.updateChannelType({
      name: channelType,
      reminders: true,
    });

    // Set reminder interval (default is 5 minutes, max 24 hours)
    await client.updateApp({ reminders_interval: 3600 }); // 1 hour
    // #endregion snippet

    await waitForChannelTypePropagation();
    const updated = await client.chat.getChannelType({ name: featuresType });
    expect(updated.reminders).toBe(true);
    expect(updated.max_message_length).toBe(before.max_message_length);
    await waitForAppSetting(client, 'reminders_interval', 3600);
  });

  it('enables user average response time', async () => {
    const channelId = uniqueId('listing');
    const cid = `messaging:${channelId}`;
    cleanup.channels.push(cid);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: buyerId,
        members: [{ user_id: buyerId }, { user_id: sellerId }],
      },
    });

    // #region snippet docs="chat/_default/12-best_practices/05-marketplace_best_practices.md" heading="User Average Response Time" tab="Node.js" index=1
    await client.updateApp({
      user_response_time_enabled: true,
    });
    // #endregion snippet

    await waitForAppSetting(client, 'user_response_time_enabled', true);

    // "Once enabled, the avg_response_time field will be included in user responses"
    await sendServerMessage(client, cid, {
      text: 'Is the camera still available?',
      user_id: buyerId,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await sendServerMessage(client, cid, {
      text: 'Yes, it is.',
      user_id: sellerId,
    });
    const seller = await retry(
      async () => {
        const user = await getServerUser(client, sellerId);
        if (user.avg_response_time === undefined) {
          throw new Error('avg_response_time not set yet');
        }
        return user;
      },
      { timeout: 30000 },
    );
    expect(seller.avg_response_time).toBeGreaterThan(0);
  });

  it('enables pending messages', async () => {
    const before = await client.chat.getChannelType({ name: featuresType });
    expect(before.mark_messages_pending).toBe(false);
    const channelType = featuresType;

    // #region snippet docs="chat/_default/12-best_practices/05-marketplace_best_practices.md" heading="Pending Messages" tab="Node.js" index=1
    // COPY: channelType="messaging"
    await client.chat.updateChannelType({
      name: channelType,
      mark_messages_pending: true,
    });
    // #endregion snippet

    await waitForChannelTypePropagation();
    const updated = await client.chat.getChannelType({ name: featuresType });
    expect(updated.mark_messages_pending).toBe(true);
    // Settings set by the earlier fence are kept.
    expect(updated.reminders).toBe(true);
  });

  it('applies the recommended settings', async () => {
    const before = await client.chat.getChannelType({ name: settingsType });
    expect(before).toMatchObject({
      typing_events: false,
      read_events: false,
      reactions: false,
      replies: false,
      uploads: false,
      reminders: false,
    });
    const channelType = settingsType;

    // #region snippet docs="chat/_default/12-best_practices/05-marketplace_best_practices.md" heading="Recommended Settings" tab="Node.js" index=1
    // COPY: channelType="messaging"
    await client.chat.updateChannelType({
      name: channelType,
      typing_events: true, // Show when users are typing
      read_events: true, // Track read status for messages
      reactions: true, // Allow reactions for quick responses
      replies: true, // Enable threaded replies for complex discussions
      uploads: true, // Allow image uploads for product photos
      reminders: true, // Enable unread reminders
    });
    // #endregion snippet

    await waitForChannelTypePropagation();
    const updated = await client.chat.getChannelType({ name: settingsType });
    expect(updated).toMatchObject({
      typing_events: true,
      read_events: true,
      reactions: true,
      replies: true,
      uploads: true,
      reminders: true,
    });
  });

  it('stores listing information on a distinct channel', async () => {
    // #region snippet docs="chat/_default/12-best_practices/05-marketplace_best_practices.md" heading="Custom Data" tab="Node.js" index=1
    // Store listing information on the channel.
    // Omitting the channel ID creates a distinct channel, keyed on the member list.
    const channel = client.chat.channel('messaging');
    await channel.getOrCreate({
      data: {
        created_by_id: buyerId,
        members: [{ user_id: buyerId }, { user_id: sellerId }],
        custom: {
          listing_id: 'listing-123',
          listing_title: 'Vintage Camera',
          listing_price: 299.99,
          listing_image: 'https://example.com/camera.jpg',
        },
      },
    });
    // #endregion snippet

    cleanup.channels.push(channel.cid);
    expect(channel.id).toBeTruthy();
    const { channel: created, members } = await getServerChannel(
      client,
      channel.cid,
    );
    expect(created?.custom).toMatchObject({
      listing_id: 'listing-123',
      listing_title: 'Vintage Camera',
      listing_price: 299.99,
      listing_image: 'https://example.com/camera.jpg',
    });
    expect(members.map((m) => m.user_id).sort()).toEqual(
      [buyerId, sellerId].sort(),
    );
  });
});
