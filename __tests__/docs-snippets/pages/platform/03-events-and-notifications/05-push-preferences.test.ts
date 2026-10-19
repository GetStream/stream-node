import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { nsToMs } from '../../../../../index';
import type { UpsertPushPreferencesResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerChannel } from '../../../helpers/server';
import { retry, waitForChannelTypePropagation } from '../../../helpers/wait';

const DOCS = 'platform/03-events-and-notifications/05-push-preferences.md';

/**
 * Push preference snippets. Pushes aren't checked: the tests assert the responses and read
 * the preferences back (channel type, channel config, the member's `push_preferences`).
 */
describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The snippets change the channel type they name: use a uniqueId type instead of the
  // built-in `messaging` type.
  const channelType = uniqueId('messaging');
  const channelId = uniqueId('announcements');
  const userId1 = uniqueId('user-1');
  const userId2 = uniqueId('user-2');
  // A channel on the built-in `messaging` type for the channel-member preference.
  const generalId = uniqueId('general');
  const channelCid = `messaging:${generalId}`;

  /** The push preference responses of the region's calls. */
  const upsertResults = (spy: {
    mock: { results: Array<{ value: unknown }> };
  }) =>
    Promise.all(
      spy.mock.results.map(
        (r) => r.value as Promise<UpsertPushPreferencesResponse>,
      ),
    );

  beforeAll(async () => {
    cleanup.users.push(userId1, userId2);
    await client.upsertUsers([{ id: userId1 }, { id: userId2 }]);

    await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(channelType);
    await waitForChannelTypePropagation();

    await client.chat
      .channel(channelType, channelId)
      .getOrCreate({ data: { created_by_id: userId1 } });
    cleanup.channels.push(`${channelType}:${channelId}`);

    await client.chat.channel('messaging', generalId).getOrCreate({
      data: { created_by_id: userId1, members: [{ user_id: userId1 }] },
    });
    cleanup.channels.push(channelCid);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Channel Configuration Push Level: push_level', async () => {
    const before = await client.chat.getChannelType({ name: channelType });
    expect(before.push_level).not.toBe('all_mentions');

    // #region snippet docs="platform/03-events-and-notifications/05-push-preferences.md" heading="Channel Configuration Push Level" tab="Node.js" index=1
    // COPY: channelType="messaging", channelId="announcements"
    // Set push_level on a channel type
    // automod, automod_behavior and max_message_length are required on this endpoint,
    // so carry the current values through to avoid overwriting them.
    const current = await client.chat.getChannelType({ name: channelType });

    await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      push_level: 'all_mentions',
    });

    // Set push_level as a channel config override on a specific channel
    const channel = client.chat.channel(channelType, channelId);
    await channel.updateChannelPartial({
      set: { config_overrides: { push_level: 'all' } },
    });
    // #endregion snippet

    await waitForChannelTypePropagation();
    const updated = await retry(async () => {
      const response = await client.chat.getChannelType({ name: channelType });
      if (response.push_level !== 'all_mentions') {
        throw new Error('push_level not updated yet');
      }
      return response;
    });
    expect(updated.push_level).toBe('all_mentions');
    expect(updated.automod).toBe(current.automod);
    expect(updated.max_message_length).toBe(current.max_message_length);

    // The override wins over the type's `all_mentions` in the merged channel config.
    const { channel: response } = await channel.getOrCreate({});
    expect(response?.config?.push_level).toBe('all');
  });

  it('Channel Configuration Push Level: chat_preferences', async () => {
    // #region snippet docs="platform/03-events-and-notifications/05-push-preferences.md" heading="Channel Configuration Push Level" tab="Node.js" index=2
    // COPY: channelType="messaging", channelId="announcements"
    // Set granular chat_preferences as a channel config override
    const channel = client.chat.channel(channelType, channelId);
    await channel.updateChannelPartial({
      set: {
        config_overrides: {
          chat_preferences: {
            default_preference: 'none',
            channel_mentions: 'all',
            direct_mentions: 'all',
          },
        },
      },
    });
    // #endregion snippet

    const { channel: response } = await channel.getOrCreate({});
    expect(response?.config?.chat_preferences).toMatchObject({
      default_preference: 'none',
      channel_mentions: 'all',
      direct_mentions: 'all',
    });
    // "setting one clears the other": the merged config has no push_level any more, not
    // even the type's `all_mentions`.
    expect(response?.config?.push_level).toBeUndefined();
  });

  it('Server-Side Usage (chat)', async () => {
    const upsert = vi.spyOn(client, 'updatePushNotificationPreferences');

    // #region snippet docs="platform/03-events-and-notifications/05-push-preferences.md" heading="Server-Side Usage" tab="Node.js" index=1
    // COPY: userId1="user-1", userId2="user-2"
    // Server-side - can update preferences for any user
    await client.updatePushNotificationPreferences({
      preferences: [
        {
          user_id: userId1,
          chat_level: 'mentions',
        },
        {
          user_id: userId2,
          chat_level: 'all',
        },
      ],
    });
    // #endregion snippet

    const [response] = await upsertResults(upsert);
    expect(response.user_preferences[userId1]?.chat_level).toBe('mentions');
    expect(response.user_preferences[userId2]?.chat_level).toBe('all');
    // The other levels come back with their defaults.
    expect(response.user_preferences[userId1]).toMatchObject({
      call_level: 'all',
      feeds_level: 'all',
    });
  });

  it('Setting granular preferences', async () => {
    const upsert = vi.spyOn(client, 'updatePushNotificationPreferences');

    // #region snippet docs="platform/03-events-and-notifications/05-push-preferences.md" heading="Setting granular preferences" tab="Node.js" index=1
    // COPY: userId1="user-1", channelCid="messaging:general"
    // User-level: only receive pushes for direct mentions and thread replies
    await client.updatePushNotificationPreferences({
      preferences: [
        {
          user_id: userId1,
          chat_preferences: {
            default_preference: 'none',
            direct_mentions: 'all',
            thread_replies: 'all',
          },
        },
      ],
    });

    // Channel-member level: mute @channel and @here in a noisy channel
    await client.updatePushNotificationPreferences({
      preferences: [
        {
          user_id: userId1,
          channel_cid: channelCid,
          chat_preferences: {
            default_preference: 'all',
            channel_mentions: 'none',
            here_mentions: 'none',
          },
        },
      ],
    });
    // #endregion snippet

    const [userLevel, memberLevel] = await upsertResults(upsert);
    expect(userLevel.user_preferences[userId1]?.chat_preferences).toMatchObject(
      {
        default_preference: 'none',
        direct_mentions: 'all',
        thread_replies: 'all',
      },
    );
    expect(
      memberLevel.user_channel_preferences[userId1]?.[channelCid]
        ?.chat_preferences,
    ).toMatchObject({
      default_preference: 'all',
      channel_mentions: 'none',
      here_mentions: 'none',
    });

    // A user-level-only call returns no channel preferences, and a channel-only call
    // returns the user's entry as null (typed non-null, see the TODO).
    expect(userLevel.user_channel_preferences).toEqual({});
    expect(memberLevel.user_preferences[userId1]).toBeNull();
    // Server-side queryChannels doesn't return `push_preferences`, even with a user_id
    // (see the TODO), so the responses above are the read back. If this starts
    // failing, assert the preferences here instead.
    const member = await getServerChannel(client, channelCid, {
      user_id: userId1,
    });
    expect(member.members.map((m) => m.user_id)).toContain(userId1);
    expect(member.push_preferences).toBeUndefined();
  });

  it('Server-Side Usage (feeds)', async () => {
    const upsert = vi.spyOn(client, 'updatePushNotificationPreferences');

    // #region snippet docs="platform/03-events-and-notifications/05-push-preferences.md" heading="Server-Side Usage" tab="Node.js" index=2
    // COPY: userId1="user-1", userId2="user-2"
    // Server-side: can update preferences for any user
    await client.updatePushNotificationPreferences({
      preferences: [
        {
          user_id: userId1,
          feeds_level: 'none',
        },
        {
          user_id: userId2,
          feeds_preferences: {
            reaction: 'all',
            comment: 'none',
            follow: 'all',
          },
        },
      ],
    });
    // #endregion snippet

    const [response] = await upsertResults(upsert);
    expect(response.user_preferences[userId1]?.feeds_level).toBe('none');
    expect(response.user_preferences[userId2]?.feeds_preferences).toMatchObject(
      {
        reaction: 'all',
        comment: 'none',
        follow: 'all',
      },
    );
  });

  it('Setting Call Push Preferences', async () => {
    const upsert = vi.spyOn(client, 'updatePushNotificationPreferences');

    // #region snippet docs="platform/03-events-and-notifications/05-push-preferences.md" heading="Setting Call Push Preferences" tab="Node.js" index=1
    // COPY: userId1="user-1"
    // Set call-level preferences with temporary disabling
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);

    await client.updatePushNotificationPreferences({
      preferences: [
        {
          user_id: userId1,
          call_level: 'all',
          disabled_until: oneHourFromNow,
        },
      ],
    });
    // #endregion snippet

    const [response] = await upsertResults(upsert);
    const preferences = response.user_preferences[userId1];
    expect(preferences?.call_level).toBe('all');
    expect(
      Math.abs(
        nsToMs(preferences?.disabled_until ?? 0) - oneHourFromNow.getTime(),
      ),
    ).toBeLessThan(1000);
  });
});
