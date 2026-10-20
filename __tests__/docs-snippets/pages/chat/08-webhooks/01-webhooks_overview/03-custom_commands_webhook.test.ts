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
  CreateCommandResponse,
  DeleteCommandResponse,
  GetCommandResponse,
  ListCommandsResponse,
  UpdateCommandResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { updateChannelType } from '../../../../helpers/channel-types';
import { waitForAppSetting } from '../../../../helpers/server';
import {
  retry,
  retryWhileChannelTypePropagates,
  waitForChannelTypePropagation,
} from '../../../../helpers/wait';

const DOCS =
  'chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md';

const handlerUrl =
  'https://example.com/webhooks/stream/custom-commands?type={type}';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const userId = uniqueId('user');
  const ticketCommand = uniqueId('ticket');
  const supportChannelType = uniqueId('support');
  const supportChannelId = uniqueId('channel');
  const ticketText = `/${ticketCommand} suspicious transaction with id 1234`;

  const deleteCommandIfExists = () =>
    client.chat.deleteCommand({ name: ticketCommand }).catch((error) => {
      if ((error as { code?: number }).code !== 16) throw error;
    });

  beforeAll(async () => {
    await client.upsertUsers([{ id: userId }]);
    cleanup.users.push(userId);
    // Runs if a test fails before "Remove a Command" deletes it.
    cleanup.add(deleteCommandIfExists);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Creating a Command', async () => {
    const createCommand = vi.spyOn(client.chat, 'createCommand');

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="Creating a Command" tab="Node.js" index=1
    // COPY: ticketCommand="ticket"
    await client.chat.createCommand({
      name: ticketCommand,
      description: 'Create a support ticket',
      args: '[description]',
      set: 'support_commands_set',
    });
    // #endregion snippet

    const response = await (createCommand.mock.results[0]
      .value as Promise<CreateCommandResponse>);
    expect(response.command).toMatchObject({
      name: ticketCommand,
      description: 'Create a support ticket',
      args: '[description]',
      set: 'support_commands_set',
    });
  });

  it('List Commands', async () => {
    const listCommands = vi.spyOn(client.chat, 'listCommands');

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="List Commands" tab="Node.js" index=1
    await client.chat.listCommands();
    // #endregion snippet

    const { commands } = await (listCommands.mock.results[0]
      .value as Promise<ListCommandsResponse>);
    expect(commands.map((command) => command.name)).toContain(ticketCommand);
  });

  it('Get a Command', async () => {
    const getCommand = vi.spyOn(client.chat, 'getCommand');

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="Get a Command" tab="Node.js" index=1
    // COPY: ticketCommand="ticket"
    await client.chat.getCommand({ name: ticketCommand });
    // #endregion snippet

    const command = await (getCommand.mock.results[0]
      .value as Promise<GetCommandResponse>);
    expect(command).toMatchObject({
      name: ticketCommand,
      description: 'Create a support ticket',
    });
  });

  it('Edit a Command', async () => {
    const updateCommand = vi.spyOn(client.chat, 'updateCommand');

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="Edit a Command" tab="Node.js" index=1
    // COPY: ticketCommand="ticket"
    await client.chat.updateCommand({
      name: ticketCommand,
      description: 'Create customer support tickets',
    });
    // #endregion snippet

    const response = await (updateCommand.mock.results[0]
      .value as Promise<UpdateCommandResponse>);
    expect(response.command?.description).toBe(
      'Create customer support tickets',
    );
    // The page says fields that aren't sent stay unchanged, but the API resets
    // `args` and `set` (the SDK leaves them out of the body).
    const command = await client.chat.getCommand({ name: ticketCommand });
    expect(command).toMatchObject({
      description: 'Create customer support tickets',
      args: '',
      set: '',
    });
  });

  it('Remove a Command', async () => {
    const deleteCommand = vi.spyOn(client.chat, 'deleteCommand');

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="Remove a Command" tab="Node.js" index=1
    // COPY: ticketCommand="ticket"
    await client.chat.deleteCommand({ name: ticketCommand });
    // #endregion snippet

    const response = await (deleteCommand.mock.results[0]
      .value as Promise<DeleteCommandResponse>);
    expect(response.name).toBe(ticketCommand);
    await expect(
      client.chat.getCommand({ name: ticketCommand }),
    ).rejects.toMatchObject({ code: 16, metadata: { responseCode: 404 } });
  });

  it('Configure a Channel Type', async () => {
    // The previous test removed the command: the channel type needs it again.
    await client.chat.createCommand({
      name: ticketCommand,
      description: 'Create a support ticket',
    });

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="Configure a Channel Type" tab="Node.js" index=1
    // COPY: supportChannelType="support-channel-type", ticketCommand="ticket"
    await client.chat.createChannelType({
      name: supportChannelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
      commands: [ticketCommand],
    });
    // #endregion snippet

    cleanup.channelTypes.push(supportChannelType);
    // "You cannot delete a custom command if there are any active channel
    // configurations referencing it explicitly": take it off the type first.
    cleanup.add(async () => {
      await updateChannelType(client, supportChannelType, { commands: [] });
      await retry(deleteCommandIfExists, {
        timeout: 60000,
        interval: 2000,
        retryIf: (error) =>
          error instanceof Error && error.message.includes('in use'),
      });
    });
    await expect(
      client.chat.deleteCommand({ name: ticketCommand }),
    ).rejects.toMatchObject({ code: 4 });
    await waitForChannelTypePropagation();

    const type = await client.chat.getChannelType({ name: supportChannelType });
    expect(type.commands.map((command) => command.name)).toEqual([
      ticketCommand,
    ]);
  }, 120000);

  it('Configure a Custom Action URL', async () => {
    const { app } = await client.getApp();
    const original = app.custom_action_handler_url;
    expect(original ?? '').toBe('');
    cleanup.add(async () => {
      await client.updateApp({ custom_action_handler_url: original ?? '' });
      await waitForAppSetting(client, 'custom_action_handler_url', original);
    });

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="Configure a Custom Action URL" tab="Node.js" index=1
    await client.updateApp({
      custom_action_handler_url:
        'https://example.com/webhooks/stream/custom-commands?type={type}',
    });
    // #endregion snippet

    await waitForAppSetting(client, 'custom_action_handler_url', handlerUrl);
  });

  // Runs last: the page's first fence needs the command, the channel type and the URL.
  it('Sending a custom command message', async () => {
    await retryWhileChannelTypePropagates(() =>
      client.chat
        .channel(supportChannelType, supportChannelId)
        .getOrCreate({ data: { created_by_id: userId } }),
    );
    cleanup.channels.push(`${supportChannelType}:${supportChannelId}`);
    // The handler URL is a placeholder (example.com), so Stream's POST to it fails and
    // the send is rejected with code 45: that proves the command message was routed to
    // the custom action handler. Record that error so the region runs as written.
    const original = client.chat.sendMessage.bind(client.chat);
    const errors: unknown[] = [];
    const sendMessage = vi
      .spyOn(client.chat, 'sendMessage')
      .mockImplementation(async (request) => {
        try {
          return await original(request);
        } catch (error) {
          errors.push(error);
          return undefined as never;
        }
      });

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/03-custom_commands_webhook.md" heading="" tab="Node.js" index=1
    // COPY: supportChannelType="messaging", supportChannelId="channel-id", ticketText="/ticket suspicious transaction with id 1234"
    const channel = client.chat.channel(supportChannelType, supportChannelId);
    await channel.sendMessage({
      message: {
        text: ticketText,
        user_id: userId,
      },
    });
    // #endregion snippet

    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage.mock.calls[0][0]).toMatchObject({
      type: supportChannelType,
      id: supportChannelId,
      message: { text: ticketText, user_id: userId },
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({ code: 45 });
    expect(String(errors[0])).toContain(
      'custom command endpoint returned an error',
    );
  });
});
