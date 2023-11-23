import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { CreateChannelTypeRequestAutomodEnum } from '../src/gen/chat/models';
import { StreamClient } from '../src/StreamClient';

describe('channel types CRUD API', () => {
  let client: StreamClient;
  const channelType = 'streamnodetest' + uuidv4();

  beforeAll(() => {
    client = createTestClient();
  });

  it('create', async () => {
    const response = await client.chat.createChannelType({
      name: channelType,
      automod: CreateChannelTypeRequestAutomodEnum.DISABLED,
    });

    expect(response.name).toBe(channelType);
  });

  it('read', async () => {
    const response = await client.chat.listChannelTypes();

    expect(response.channel_types[channelType]).toBeDefined();
  });

  it('update', async () => {
    const response = await client.chat.updateChannelType(channelType, {
      automod: CreateChannelTypeRequestAutomodEnum.SIMPLE,
    });

    expect(response.automod).toBe(CreateChannelTypeRequestAutomodEnum.SIMPLE);

    const getResponse = await client.chat.getChannelType({ name: channelType });

    // @ts-expect-error typing problem
    expect(getResponse.automod).toBe(
      CreateChannelTypeRequestAutomodEnum.SIMPLE,
    );
  });

  it('delete', async () => {
    const response = await client.chat.deleteChannelType({ name: channelType });
    expect(response).toBeDefined();
  });
});
