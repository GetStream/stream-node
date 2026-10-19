import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerUser } from '../../../helpers/server';
import { waitForChannelTypePropagation } from '../../../helpers/wait';

const DOCS = 'chat/_default/04-messages/10-message_receipts.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  // The fences create a channel type and then read and update it right away. A new
  // channel type takes ~30s to reach every API node, so wait after the create call
  // (outside the region) before the region reads it back.
  const waitAfterCreate = () => {
    const createChannelType = client.chat.createChannelType.bind(client.chat);
    return vi
      .spyOn(client.chat, 'createChannelType')
      .mockImplementation(async (request) => {
        const response = await createChannelType(request);
        await waitForChannelTypePropagation();
        return response;
      });
  };

  it('enables delivery events on a channel type', async () => {
    const targetChannelType = uniqueId('delivery-type');
    cleanup.channelTypes.push(targetChannelType);
    const create = waitAfterCreate();
    const updateSpy = vi.spyOn(client.chat, 'updateChannelType');

    // #region snippet docs="chat/_default/04-messages/10-message_receipts.md" heading="Channel Type Configuration" tab="Node.js" index=1
    // COPY: targetChannelType="targetChannelType"
    // When creating a channel type
    await client.chat.createChannelType({
      name: targetChannelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
      delivery_events: true,
    });

    // When updating an existing channel type.
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({
      name: targetChannelType,
    });
    await client.chat.updateChannelType({
      name: targetChannelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      delivery_events: true,
    });
    // #endregion snippet
    await waitForChannelTypePropagation();

    const [created] = await Promise.all(
      create.mock.results.map(
        (r) => r.value as ReturnType<typeof client.chat.createChannelType>,
      ),
    );
    expect(created.delivery_events).toBe(true);
    expect(current.delivery_events).toBe(true);
    expect(current.automod).toBe('disabled');
    const [updated] = await Promise.all(
      updateSpy.mock.results.map(
        (r) => r.value as ReturnType<typeof client.chat.updateChannelType>,
      ),
    );
    expect(updated.delivery_events).toBe(true);
    const after = await client.chat.getChannelType({ name: targetChannelType });
    expect(after.delivery_events).toBe(true);
    expect(after.max_message_length).toBe(5000);
  });

  it('turns off delivery receipts in the user privacy settings', async () => {
    const userId = uniqueId('user');
    cleanup.users.push(userId);

    // #region snippet docs="chat/_default/04-messages/10-message_receipts.md" heading="User Privacy Settings" tab="Node.js" index=1
    // COPY: userId="user-id"
    await client.upsertUsers([
      {
        id: userId,
        privacy_settings: {
          delivery_receipts: {
            enabled: false, // Do not report delivery status
          },
        },
      },
    ]);
    // #endregion snippet

    const user = await getServerUser(client, userId);
    expect(user.privacy_settings?.delivery_receipts?.enabled).toBe(false);
  });

  it('enables read events on a channel type', async () => {
    const targetChannelType = uniqueId('read-type');
    cleanup.channelTypes.push(targetChannelType);
    const create = waitAfterCreate();
    const updateSpy = vi.spyOn(client.chat, 'updateChannelType');

    // #region snippet docs="chat/_default/04-messages/10-message_receipts.md" heading="Channel Type Configuration" tab="Node.js" index=2
    // COPY: targetChannelType="targetChannelType"
    // When creating a channel type
    await client.chat.createChannelType({
      name: targetChannelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
      read_events: true,
    });

    // When updating an existing channel type.
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({
      name: targetChannelType,
    });
    await client.chat.updateChannelType({
      name: targetChannelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      read_events: true,
    });
    // #endregion snippet
    await waitForChannelTypePropagation();

    const [created] = await Promise.all(
      create.mock.results.map(
        (r) => r.value as ReturnType<typeof client.chat.createChannelType>,
      ),
    );
    expect(created.read_events).toBe(true);
    expect(current.read_events).toBe(true);
    const [updated] = await Promise.all(
      updateSpy.mock.results.map(
        (r) => r.value as ReturnType<typeof client.chat.updateChannelType>,
      ),
    );
    expect(updated.read_events).toBe(true);
    const after = await client.chat.getChannelType({ name: targetChannelType });
    expect(after.read_events).toBe(true);
    expect(after.max_message_length).toBe(5000);
  });

  it('turns off read receipts in the user privacy settings', async () => {
    const userId = uniqueId('user');
    cleanup.users.push(userId);

    // #region snippet docs="chat/_default/04-messages/10-message_receipts.md" heading="User Privacy Settings" tab="Node.js" index=2
    // COPY: userId="user-id"
    await client.upsertUsers([
      {
        id: userId,
        privacy_settings: {
          read_receipts: {
            enabled: false, // Do not report read status
          },
        },
      },
    ]);
    // #endregion snippet

    const user = await getServerUser(client, userId);
    expect(user.privacy_settings?.read_receipts?.enabled).toBe(false);
  });
});
