import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  deletePollsCreatedBy,
  getServerUser,
  waitForAppSetting,
} from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'chat/_default/05-features/09-translation.md';

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

    // #region snippet docs="chat/_default/05-features/09-translation.md" heading="Message Translation Endpoint" tab="Node.js" index=1
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

    // #region snippet docs="chat/_default/05-features/09-translation.md" heading="Enabling automatic translation" tab="Node.js" index=1
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

    // #region snippet docs="chat/_default/05-features/09-translation.md" heading="Set user language" tab="Node.js" index=1
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

  it('Poll translation', async () => {
    // John (en) sends a poll to a Spanish-speaking member in an auto-translated channel.
    const readerId = uniqueId('reader');
    cleanup.users.push(readerId);
    await client.upsertUsers([{ id: readerId, language: 'es' }]);
    const channelId = uniqueId('polls');
    const cid = `messaging:${channelId}`;
    cleanup.channels.push(cid);
    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({
      data: {
        created_by_id: johnId,
        members: [{ user_id: johnId }, { user_id: readerId }],
        auto_translation_enabled: true,
        auto_translation_language: 'es',
      },
    });
    cleanup.add(() => deletePollsCreatedBy(client, johnId));
    const { poll: created } = await client.createPoll({
      name: "What's for lunch?",
      options: [{ text: 'Pizza' }, { text: 'Fish' }],
      user_id: johnId,
    });
    const messageID = uniqueId('message');
    await channel.sendMessage({
      message: { id: messageID, poll_id: created.id, user_id: johnId },
    });
    // Translation is asynchronous: wait until the poll name has a Spanish text.
    await retry(async () => {
      const { message } = await client.chat.getMessage({ id: messageID });
      if (!message.poll?.name_i18n?.es_text) {
        throw new Error('poll not translated yet');
      }
    });
    const user = await getServerUser(client, readerId);

    // #region snippet docs="chat/_default/05-features/09-translation.md" heading="Poll translation" tab="Node.js" index=1
    const { message } = await client.chat.getMessage({ id: messageID });
    const poll = message.poll;
    const language = user.language;

    // Fall back to the original text when a field has no translation for the language
    const name = poll?.name_i18n?.[`${language}_text`] ?? poll?.name;
    const options = poll?.options.map(
      (option) => option.text_i18n?.[`${language}_text`] ?? option.text,
    );
    // #endregion snippet

    expect(language).toBe('es');
    expect(name).toBe(poll?.name_i18n?.es_text);
    expect(name).not.toBe("What's for lunch?");
    expect(options).toHaveLength(2);
    expect(options).toEqual(
      poll?.options.map((o) => o.text_i18n?.es_text ?? o.text),
    );
  });
});
