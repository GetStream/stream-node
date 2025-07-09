import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { CreateDeviceRequest, PushProvider } from '../src/gen/models';

describe('devices and push', () => {
  let client: StreamClient;
  const user = {
    id: 'stream-node-test-user',
    role: 'admin',
  };
  const device: CreateDeviceRequest = {
    id: uuidv4(),
    push_provider: 'firebase',
    push_provider_name: 'firebase',
    user_id: user.id,
  };
  const pushProvider: PushProvider = {
    name: 'test-push-provider',
    type: 'xiaomi',
    xiaomi_app_secret: '',
    xiaomi_package_name: '',
  };

  beforeAll(async () => {
    client = createTestClient();
    await client.upsertUsers([user]);
  });

  it('create device', async () => {
    expect(async () => await client.createDevice(device)).not.toThrowError();
  });

  it('list devices', async () => {
    const response = await client.listDevices({ user_id: user.id });

    expect(response.devices.find((d) => d.id === device.id)).toBeDefined();
  });

  it('delete device', async () => {
    const response = await client.deleteDevice({
      id: device.id,
      user_id: user.id,
    });

    expect(response).toBeDefined();
  });

  it('create push provider', async () => {
    // Can't properly test upsert without valid credentials
    await expect(() =>
      client.upsertPushProvider({ push_provider: pushProvider }),
    ).rejects.toThrowError(
      'Stream error code 4: UpsertPushProvider failed with error: "xiaomi credentials are invalid"',
    );
  });

  it('list push provider', async () => {
    const response = await client.listPushProviders();

    expect(response.push_providers).toBeDefined();
  });

  // Stream error code 4: CheckPush failed with error: "User has no enabled devices associated"
  it.skip('test push provider', async () => {
    const response = await client.checkPush({ user_id: user.id });

    expect(response).toBeDefined();
  });

  // TODO: can't test delete because we can't upsert
  // it('delete push provider', async () => {
  //     const response = await client.deletePushProvider({name: pushProvider.push_provider!.name, type: DeletePushProviderTypeEnum.FIREBASE});
  // });
});
