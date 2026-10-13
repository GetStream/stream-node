import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { getServerUser, waitForAppSetting } from '../../helpers/server';

const DOCS = '_default/05-features/09-translation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const johnId = uniqueId('john');

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId, language: 'en' }]);
  });

  afterAll(() => cleanup.run());

  it('Message Translation Endpoint', async () => {
    const channelId = uniqueId('general');
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: johnId } });
    cleanup.channels.push(`messaging:${channelId}`);
    const messageID = uniqueId('message');

    // #region snippet docs="_default/05-features/09-translation.md" heading="Message Translation Endpoint" tab="Node.js" index=1
    // COPY: channelId="general", johnId="john"
    const channel = client.chat.channel('messaging', channelId);

    await channel.sendMessage({
      message: {
        id: messageID,
        text: 'Hello, I would like to have more information about your product.',
        user_id: johnId,
      },
    });

    // returns the message.text translated into French
    const response = await client.chat.translateMessage({
      id: messageID,
      language: 'fr',
    });

    // the translation will be added to the i18n object
    console.log(response.message.i18n?.fr_text);
    // "Bonjour, J'aimerais avoir plus d'informations sur votre produit.",
    // #endregion snippet

    expect(response.message.id).toBe(messageID);
    expect(response.message.i18n?.fr_text).toMatch(/\S/);
    expect(response.message.i18n?.language).toBe('en');
    const { message } = await client.chat.getMessage({ id: messageID });
    expect(message.i18n?.fr_text).toBe(response.message.i18n?.fr_text);
  });

  it('Enabling automatic translation', async () => {
    const channelId = uniqueId('melting-pot');
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: johnId } });
    cleanup.channels.push(`messaging:${channelId}`);
    const { app } = await client.getApp();
    const original = app.auto_translation_enabled;
    expect(original).toBe(false);
    cleanup.add(async () => {
      await client.updateApp({ auto_translation_enabled: original });
      await waitForAppSetting(client, 'auto_translation_enabled', original);
    });

    // #region snippet docs="_default/05-features/09-translation.md" heading="Enabling automatic translation" tab="Node.js" index=1
    // COPY: channelId="melting-pot"
    const channel = client.chat.channel('messaging', channelId);

    // enable auto-translation only for this channel
    await channel.update({ data: { auto_translation_enabled: true } });

    // ensure all messages are translated in english for this channel
    await channel.update({
      data: {
        auto_translation_enabled: true,
        auto_translation_language: 'en',
      },
    });

    // auto translate messages for all channels
    await client.updateApp({ auto_translation_enabled: true });
    // #endregion snippet

    const { channel: updated } = await channel.getOrCreate({});
    expect(updated?.auto_translation_enabled).toBe(true);
    expect(updated?.auto_translation_language).toBe('en');
    await waitForAppSetting(client, 'auto_translation_enabled', true);
  });

  it('Set user language', async () => {
    const userId = uniqueId('user');
    cleanup.users.push(userId);

    // #region snippet docs="_default/05-features/09-translation.md" heading="Set user language" tab="Node.js" index=1
    // COPY: userId="userId"
    // sets the user language
    await client.updateUsers({
      users: {
        userId: { id: userId, language: 'en' },
      },
    });
    // #endregion snippet

    const user = await getServerUser(client, userId);
    expect(user.language).toBe('en');
  });
});
