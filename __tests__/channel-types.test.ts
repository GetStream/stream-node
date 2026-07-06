import { beforeAll, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';

describe('channel types CRUD API', () => {
  let client: StreamClient;
  const channelType = 'streamnodetest' + randomUUID();

  beforeAll(() => {
    client = createTestClient();
  });

  it('create', async () => {
    const response = await client.chat.createChannelType({
      name: channelType,
      automod: 'disabled',
      automod_behavior: 'block',
      max_message_length: 30000,
    });

    expect(response.name).toBe(channelType);
  });

  it('read', async () => {
    const response = await client.chat.listChannelTypes();

    expect(response.channel_types[channelType]).toBeDefined();
  });

  it('update', async () => {
    const response = await client.chat.updateChannelType({
      name: channelType,
      automod: 'simple',
      automod_behavior: 'block',
      max_message_length: 20000,
    });

    expect(response.automod).toBe('simple');

    const getResponse = await client.chat.getChannelType({ name: channelType });

    expect(getResponse.automod).toBe('simple');
  });

  it('delete', async () => {
    const response = await client.chat.deleteChannelType({ name: channelType });
    expect(response).toBeDefined();
  });
});
