import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';
import type { StreamClient } from '../../../../index';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { getServerChannel } from '../../helpers/server';
import { waitForChannelTypePropagation } from '../../helpers/wait';

const DOCS = '_default/05-features/08-location_sharing.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const johnId = uniqueId('john');
  // Shared locations enabled through config_overrides.
  const channelId = uniqueId('general');

  /** Sends a live location message as john and returns its id. */
  const sendLiveLocation = async (latitude: number, longitude: number) => {
    const { message } = await client.chat
      .channel('messaging', channelId)
      .sendMessage({
        message: {
          text: 'Live location',
          user_id: johnId,
          shared_location: {
            created_by_device_id: 'device-id',
            latitude,
            longitude,
            end_at: new Date(Date.now() + 60 * 60 * 1000),
          },
        },
      });
    return message.id;
  };

  /** Sends a static location message as john to channel `type:id`. */
  const sendLocation = async (type: string, id: string) => {
    const { message } = await client.chat.channel(type, id).sendMessage({
      message: {
        text: 'Static location',
        user_id: johnId,
        shared_location: {
          created_by_device_id: 'device-id',
          latitude: 10,
          longitude: 10,
        },
      },
    });
    return message;
  };

  /**
   * The shared location of message `messageId`, read from john's view of the
   * channel (`getMessage` and `queryChannels` without `user_id` don't return
   * `shared_location`).
   */
  const storedLocation = async (messageId: string) => {
    const { messages } = await getServerChannel(
      client,
      `messaging:${channelId}`,
      { user_id: johnId, message_limit: 100 },
    );
    const message = messages.find((m) => m.id === messageId);
    if (!message) throw new Error(`message ${messageId} not in channel state`);
    return message.shared_location;
  };

  /** Message ids of john's active live locations. */
  const activeLiveLocationIds = async () => {
    const { active_live_locations } = await client.getUserLiveLocations({
      user_id: johnId,
    });
    return active_live_locations.map((l) => l.message_id);
  };

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({ data: { created_by_id: johnId } });
    cleanup.channels.push(`messaging:${channelId}`);
    await channel.updateChannelPartial({
      set: { config_overrides: { shared_locations: true } },
    });
  });

  afterAll(() => cleanup.run());
  afterEach(() => vi.restoreAllMocks());

  it('Enabling location sharing', async () => {
    // The channel type part of the fence runs on its own channel type.
    const channelType = uniqueId('location-type');
    await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(channelType);
    await waitForChannelTypePropagation();
    const otherChannelId = uniqueId('general');
    await client.chat
      .channel(channelType, otherChannelId)
      .getOrCreate({ data: { created_by_id: johnId } });
    cleanup.channels.push(`${channelType}:${otherChannelId}`);
    // A second channel of the type, without an override: only the channel type
    // part of the fence enables it.
    const typeChannelId = uniqueId('general');
    await client.chat
      .channel(channelType, typeChannelId)
      .getOrCreate({ data: { created_by_id: johnId } });
    cleanup.channels.push(`${channelType}:${typeChannelId}`);
    const before = await client.chat.getChannelType({ name: channelType });
    expect(before.shared_locations).toBe(false);
    // Code 17 "location sharing is not enabled for this channel".
    const notEnabled = { code: 17, metadata: { responseCode: 403 } };
    await expect(
      sendLocation(channelType, otherChannelId),
    ).rejects.toMatchObject(notEnabled);
    await expect(
      sendLocation(channelType, typeChannelId),
    ).rejects.toMatchObject(notEnabled);

    // #region snippet docs="_default/05-features/08-location_sharing.md" heading="Enabling location sharing" tab="Node.js" index=1
    // COPY: channelType="messaging", otherChannelId="general"
    const channel = client.chat.channel(channelType, otherChannelId);

    // Enabling it for a channel
    await channel.updateChannelPartial({
      set: {
        config_overrides: {
          shared_locations: true,
        },
      },
    });

    // Enabling it for a channel type.
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({ name: channelType });

    await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      shared_locations: true,
    });
    // #endregion snippet
    await waitForChannelTypePropagation();

    const { channel: updated } = await channel.getOrCreate({});
    expect(updated?.config?.shared_locations).toBe(true);
    const after = await client.chat.getChannelType({ name: channelType });
    expect(after.shared_locations).toBe(true);
    // Both channels now accept location messages.
    const viaOverride = await sendLocation(channelType, otherChannelId);
    expect(viaOverride.shared_location?.message_id).toBe(viaOverride.id);
    const viaType = await sendLocation(channelType, typeChannelId);
    expect(viaType.shared_location?.message_id).toBe(viaType.id);
  });

  /** The message sent by the only `client.chat.sendMessage` call of `spy`. */
  const sentMessage = async (
    spy: MockInstance<StreamClient['chat']['sendMessage']>,
  ) => {
    expect(spy).toHaveBeenCalledTimes(1);
    const { message } = await (spy.mock.results[0].value as ReturnType<
      StreamClient['chat']['sendMessage']
    >);
    return message;
  };

  it('Sending static location', async () => {
    const spy = vi.spyOn(client.chat, 'sendMessage');
    // #region snippet docs="_default/05-features/08-location_sharing.md" heading="Sending static location" tab="Node.js" index=1
    // COPY: channelId="general", johnId="john"
    const channel = client.chat.channel('messaging', channelId);

    // Send a message with a static location.
    await channel.sendMessage({
      message: {
        text: 'Message with static location',
        user_id: johnId,
        shared_location: {
          created_by_device_id: 'device-id',
          latitude: 10,
          longitude: 10,
          // no `end_at` for a static location
        },
      },
    });
    // #endregion snippet

    const message = await sentMessage(spy);
    expect(message.shared_location).toMatchObject({
      latitude: 10,
      longitude: 10,
      created_by_device_id: 'device-id',
      message_id: message.id,
    });
    expect(message.shared_location?.end_at).toBeUndefined();
    // The location is stored on the message, and a static one is not live.
    expect(await storedLocation(message.id)).toMatchObject({
      latitude: 10,
      longitude: 10,
    });
    expect(await activeLiveLocationIds()).not.toContain(message.id);
  });

  it('Starting live location sharing', async () => {
    const spy = vi.spyOn(client.chat, 'sendMessage');
    // #region snippet docs="_default/05-features/08-location_sharing.md" heading="Starting live location sharing" tab="Node.js" index=1
    // COPY: channelId="general", johnId="john"
    const channel = client.chat.channel('messaging', channelId);

    // Send a message with a live location.
    // Live location differs from the static location by the termination timestamp end_at.
    await channel.sendMessage({
      message: {
        text: 'Message with live location',
        user_id: johnId,
        shared_location: {
          created_by_device_id: 'device-id',
          latitude: 10,
          longitude: 10,
          end_at: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        },
      },
    });
    // #endregion snippet

    const message = await sentMessage(spy);
    expect(message.shared_location).toMatchObject({
      latitude: 10,
      longitude: 10,
      message_id: message.id,
    });
    expect(message.shared_location?.end_at?.getTime()).toBeGreaterThan(
      Date.now(),
    );
    expect(await activeLiveLocationIds()).toContain(message.id);
  });

  it('Stopping live location sharing', async () => {
    const messageID = await sendLiveLocation(10, 10);
    expect(await activeLiveLocationIds()).toContain(messageID);
    const spy = vi.spyOn(client, 'updateLiveLocation');

    // #region snippet docs="_default/05-features/08-location_sharing.md" heading="Stopping live location sharing" tab="Node.js" index=1
    // COPY: messageID="message-id", johnId="john"
    // Stop live location sharing by setting end_at to now
    await client.updateLiveLocation({
      message_id: messageID,
      end_at: new Date(),
      latitude: 10,
      longitude: 10,
      user_id: johnId,
    });
    // #endregion snippet

    expect(spy).toHaveBeenCalledTimes(1);
    const stopped = await (spy.mock.results[0].value as ReturnType<
      StreamClient['updateLiveLocation']
    >);
    expect(stopped.message_id).toBe(messageID);
    expect(stopped.end_at?.getTime()).toBeLessThanOrEqual(Date.now());
    expect((await storedLocation(messageID))?.end_at?.getTime()).toBe(
      stopped.end_at?.getTime(),
    );
    expect(await activeLiveLocationIds()).not.toContain(messageID);
  });

  it('Updating live location', async () => {
    const messageID = await sendLiveLocation(10, 10);

    // #region snippet docs="_default/05-features/08-location_sharing.md" heading="Updating live location" tab="Node.js" index=1
    // COPY: messageID="message-id", johnId="john"
    // Get the user's active live locations
    const { active_live_locations } = await client.getUserLiveLocations({
      user_id: johnId,
    });

    // Update the user's live location (e.g., when the device location changes)
    await client.updateLiveLocation({
      message_id: messageID,
      latitude: 1,
      longitude: 2,
      user_id: johnId,
    });
    // #endregion snippet

    const before = active_live_locations.find(
      (l) => l.message_id === messageID,
    );
    expect(before).toMatchObject({ latitude: 10, longitude: 10 });
    // The message and the active live location now have the new position.
    expect(await storedLocation(messageID)).toMatchObject({
      latitude: 1,
      longitude: 2,
    });
    const { active_live_locations: after } = await client.getUserLiveLocations({
      user_id: johnId,
    });
    expect(after.find((l) => l.message_id === messageID)).toMatchObject({
      latitude: 1,
      longitude: 2,
    });
  });
});
