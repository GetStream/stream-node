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
  CreateChannelTypeResponse,
  GetChannelTypeResponse,
  UpdateChannelTypeResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerChannel } from '../../../../helpers/server';
import { retry, waitForChannelTypePropagation } from '../../../../helpers/wait';

const DOCS = 'chat/_default/05-features/10-advanced/16-dynamic_partitioning.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The docs create a channel type named "example": use a uniqueId type instead.
  const channelType = uniqueId('example');
  const channelId = uniqueId('test');
  const adminId = uniqueId('admin');

  /** Reads the channel type until `check` passes (channel type reads are eventually consistent). */
  const waitForChannelType = (
    check: (response: GetChannelTypeResponse) => boolean,
  ) =>
    retry(
      async () => {
        const response = await client.chat.getChannelType({
          name: channelType,
        });
        if (!check(response)) {
          throw new Error(
            `channel type not updated yet: partition_size=${response.partition_size} partition_ttl=${response.partition_ttl}`,
          );
        }
        return response;
      },
      { timeout: 60000, interval: 2000 },
    );

  beforeAll(async () => {
    cleanup.users.push(adminId);
    await client.upsertUsers([{ id: adminId }]);
  });

  afterEach(() => vi.restoreAllMocks());

  afterAll(() => cleanup.run());

  it('creates a channel type with dynamic partitioning and a channel of it', async () => {
    const createChannelType = client.chat.createChannelType.bind(client.chat);
    const createSpy = vi
      .spyOn(client.chat, 'createChannelType')
      .mockImplementation(async (request) => {
        const response = await createChannelType(request);
        cleanup.channelTypes.push(request.name);
        await waitForChannelTypePropagation();
        return response;
      });

    // #region snippet docs="chat/_default/05-features/10-advanced/16-dynamic_partitioning.md" heading="Enabling Dynamic Partitioning" tab="Node.js" index=1
    // COPY: channelType="example", channelId="test", adminId="admin"
    await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'flag',
      max_message_length: 5000,
      partition_size: 100,
    });

    const channel = client.chat.channel(channelType, channelId);
    await channel.getOrCreate({
      data: {
        created_by_id: adminId,
      },
    });
    // #endregion snippet

    cleanup.channels.push(`${channelType}:${channelId}`);

    const created = await (createSpy.mock.results[0]
      .value as Promise<CreateChannelTypeResponse>);
    expect(created.partition_size).toBe(100);

    const type = await waitForChannelType((r) => r.partition_size === 100);
    expect(type.partition_size).toBe(100);

    const stored = await getServerChannel(
      client,
      `${channelType}:${channelId}`,
    );
    expect(stored.channel?.created_by?.id).toBe(adminId);
  });

  it('updates the partition size', async () => {
    const updateSpy = vi.spyOn(client.chat, 'updateChannelType');

    // #region snippet docs="chat/_default/05-features/10-advanced/16-dynamic_partitioning.md" heading="Updating dynamic partitioning" tab="Node.js" index=1
    // COPY: channelType="example"
    // automod, automod_behavior and max_message_length are required here, so read
    // the current values and carry them through.
    const current = await client.chat.getChannelType({ name: channelType });

    await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      partition_size: 200,
    });
    // #endregion snippet

    const updated = await (updateSpy.mock.results[0]
      .value as Promise<UpdateChannelTypeResponse>);
    expect(updated.partition_size).toBe(200);
    expect(updated.automod).toBe(current.automod);
    expect(updated.max_message_length).toBe(current.max_message_length);

    await waitForChannelTypePropagation();
    const type = await waitForChannelType((r) => r.partition_size === 200);
    expect(type.partition_size).toBe(200);
  });

  it('disables dynamic partitioning and clears partition_ttl', async () => {
    // Set a TTL first, so the test can check that disabling clears it.
    const before = await client.chat.getChannelType({ name: channelType });
    await client.chat.updateChannelType({
      name: channelType,
      automod: before.automod,
      automod_behavior: before.automod_behavior,
      max_message_length: before.max_message_length,
      partition_ttl: '6h',
    });
    await waitForChannelTypePropagation();
    await waitForChannelType((r) => r.partition_ttl === '6h');

    const updateSpy = vi.spyOn(client.chat, 'updateChannelType');

    // #region snippet docs="chat/_default/05-features/10-advanced/16-dynamic_partitioning.md" heading="Disabling dynamic partitioning" tab="Node.js" index=1
    // COPY: channelType="example"
    const current = await client.chat.getChannelType({ name: channelType });

    await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      partition_size: 0,
    });
    // #endregion snippet

    const updated = await (updateSpy.mock.results[0]
      .value as Promise<UpdateChannelTypeResponse>);
    expect(updated.partition_size ?? 0).toBe(0);
    expect(updated.partition_ttl ?? '').toBe('');

    await waitForChannelTypePropagation();
    const type = await waitForChannelType(
      (r) => (r.partition_size ?? 0) === 0 && (r.partition_ttl ?? '') === '',
    );
    expect(type.partition_size ?? 0).toBe(0);
  }, 150000);

  it('sets the partition TTL', async () => {
    // partition_ttl requires partition_size: re-enable partitioning after the previous test.
    const before = await client.chat.getChannelType({ name: channelType });
    await client.chat.updateChannelType({
      name: channelType,
      automod: before.automod,
      automod_behavior: before.automod_behavior,
      max_message_length: before.max_message_length,
      partition_size: 100,
    });
    await waitForChannelTypePropagation();
    await waitForChannelType((r) => r.partition_size === 100);

    const updateSpy = vi.spyOn(client.chat, 'updateChannelType');

    // #region snippet docs="chat/_default/05-features/10-advanced/16-dynamic_partitioning.md" heading="Partition TTL" tab="Node.js" index=1
    // COPY: channelType="example"
    const current = await client.chat.getChannelType({ name: channelType });

    await client.chat.updateChannelType({
      name: channelType,
      automod: current.automod,
      automod_behavior: current.automod_behavior,
      max_message_length: current.max_message_length,
      partition_ttl: '24h',
    });
    // #endregion snippet

    const updated = await (updateSpy.mock.results[0]
      .value as Promise<UpdateChannelTypeResponse>);
    expect(updated.partition_ttl).toBe('24h');
    expect(updated.partition_size).toBe(100);

    await waitForChannelTypePropagation();
    const type = await waitForChannelType((r) => r.partition_ttl === '24h');
    expect(type.partition_ttl).toBe('24h');
  }, 150000);
});
