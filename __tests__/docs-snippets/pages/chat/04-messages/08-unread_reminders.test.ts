import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { waitForAppSetting } from '../../../helpers/server';
import { retry, waitForChannelTypePropagation } from '../../../helpers/wait';

const DOCS = 'chat/_default/04-messages/08-unread_reminders.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The snippet changes the channel type it names: use a uniqueId type instead of the
  // built-in `messaging` type.
  const channelType = uniqueId('messaging');

  beforeAll(async () => {
    await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
    });
    cleanup.channelTypes.push(channelType);
    await waitForChannelTypePropagation();

    const { app } = await client.getApp();
    const originalInterval = app.reminders_interval;
    cleanup.add(async () => {
      await client.updateApp({ reminders_interval: originalInterval });
      await waitForAppSetting(client, 'reminders_interval', originalInterval);
    });
  });

  afterAll(() => cleanup.run());

  it('enables reminders and sets the interval', async () => {
    const before = await client.chat.getChannelType({ name: channelType });
    expect(before.reminders).toBe(false);

    // #region snippet docs="chat/_default/04-messages/08-unread_reminders.md" heading="Enabling Unread Reminders" tab="Node.js" index=1
    // COPY: channelType="messaging"
    // Enable reminders for the messaging channel type
    await client.chat.updateChannelType({
      name: channelType,
      reminders: true,
    });

    // Change reminders interval to 1 hour (default is 5 minutes)
    await client.updateApp({ reminders_interval: 3600 });
    // #endregion snippet

    const updated = await retry(async () => {
      const response = await client.chat.getChannelType({ name: channelType });
      if (!response.reminders) throw new Error('reminders not enabled yet');
      return response;
    });
    expect(updated.reminders).toBe(true);
    expect(updated.automod).toBe(before.automod);
    expect(updated.max_message_length).toBe(before.max_message_length);

    await waitForAppSetting(client, 'reminders_interval', 3600);
    const { app } = await client.getApp();
    expect(app.reminders_interval).toBe(3600);
  });
});
