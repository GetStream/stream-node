import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { DeviceResponse, TimestampNS } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  firebaseCredentials,
  hasFirebaseCredentials,
} from '../../../helpers/push';

const DOCS = 'platform/03-events-and-notifications/04-push-devices.md';

/**
 * Device snippets. `createDevice` checks that the push provider exists (code 4 'push
 * provider "" with type "apn" not found', also without `push_provider_name`, probed
 * 2026-10-14), and the app only has its own `firebase:firebase` provider, which tests
 * must not use. So devices can only be registered on a `uniqueId` Firebase provider the
 * test creates, which needs a real service account. Devices go away with their user.
 */
describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const createUser = async () => {
    const id = uniqueId('user');
    await client.upsertUsers([{ id }]);
    cleanup.users.push(id);
    return id;
  };

  afterAll(() => cleanup.run());

  // The page's register snippets all use `push_provider: "apn"`: the app has no APN
  // provider, and creating one needs APN credentials.
  it.skip('BLOCKED: needs APN credentials (Register a Device)', async () => {
    const userId = await createUser();
    const pushToken = uniqueId('device');
    const providerName = uniqueId('apn');

    // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Register a Device" tab="Node.js" index=1
    // COPY: pushToken="<push token>", providerName="production-ios", userId="user_id"
    await client.createDevice({
      id: pushToken,
      push_provider: 'apn',
      push_provider_name: providerName,
      user_id: userId,
    });
    // #endregion snippet

    const { devices } = await client.listDevices({ user_id: userId });
    expect(devices.map((d) => d.id)).toEqual([pushToken]);
  });

  it.skip('BLOCKED: needs APN credentials (Registering from the chat client SDKs)', async () => {
    const userId = await createUser();
    const deviceToken = uniqueId('device');
    const providerName = uniqueId('apn');

    // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Registering from the chat client SDKs" tab="Node.js" index=1
    // COPY: deviceToken="2ffca4ad6599adc9b5202d15a5286d33c19547d472cd09de44219cda5ac30207", userId="Taquito", providerName="production-ios"
    await client.createDevice({
      id: deviceToken,
      push_provider: 'apn',
      user_id: userId,
      // if multi providers
      push_provider_name: providerName,
    });
    // #endregion snippet

    const { devices } = await client.listDevices({ user_id: userId });
    expect(devices.map((d) => d.id)).toEqual([deviceToken]);
  });

  it.skip('BLOCKED: needs APN credentials (Multi-Bundle Device Registration)', async () => {
    const userId = await createUser();
    const pushToken = uniqueId('device');
    const providerName = uniqueId('apn');

    // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Multi-Bundle Device Registration" tab="Node.js" index=1
    // COPY: pushToken="<push token>", providerName="production-ios", userId="user_id"
    await client.createDevice({
      id: pushToken,
      push_provider: 'apn',
      push_provider_name: providerName,
      user_id: userId,
    });
    // #endregion snippet

    const { devices } = await client.listDevices({ user_id: userId });
    expect(devices.map((d) => d.id)).toEqual([pushToken]);
  });

  // Without a test-created provider no device can be registered, so these list a new
  // user's (empty) device list.
  it('List Devices', async () => {
    const userId = await createUser();

    // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="List Devices" tab="Node.js" index=1
    // COPY: userId="<user_id>"
    const devices = await client.listDevices({ user_id: userId });
    // #endregion snippet

    expect(devices.devices).toEqual([]);
  });

  it('Listing from the chat client SDKs', async () => {
    const userId = await createUser();

    // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Listing from the chat client SDKs" tab="Node.js" index=1
    // COPY: userId="Taquito"
    const { devices } = await client.listDevices({ user_id: userId });
    // #endregion snippet

    expect(devices).toEqual([]);
  });

  it('Listing from the feeds client SDKs', async () => {
    const userId = await createUser();

    // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Listing from the feeds client SDKs" tab="Node.js" index=1
    // COPY: userId="<user_id>"
    const devices = await client.listDevices({ user_id: userId });
    // #endregion snippet

    expect(devices.devices).toEqual([]);
  });

  it('device object (Listing from the feeds client SDKs)', () => {
    // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Listing from the feeds client SDKs" tab="Node.js" index=2
    type Device = {
      created_at: TimestampNS; // unix nanoseconds, nsToDate() converts it
      id: string;
      push_provider: string;
      user_id: string;
      disabled?: boolean;
      disabled_reason?: string;
      push_provider_name?: string;
      voip?: boolean;
      hardware_id?: string;
    };
    // #endregion snippet

    // Compile-time check: the docs type and the SDK's `DeviceResponse` have exactly the
    // same fields, optionality and field types (mutual assignability alone would miss a
    // missing optional field).
    type Same<A, B> =
      (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
        ? true
        : false;
    const matchesSdk: Same<Device, DeviceResponse> = true;
    expect(matchesSdk).toBe(true);
  });

  // Removing needs a device, so a `uniqueId` Firebase provider: the API rejects the
  // sample service account JSON (code 4 "firebase credentials are invalid", see
  // 03-push-providers), so these need a real one.
  describe.skipIf(!hasFirebaseCredentials)('with Firebase credentials', () => {
    const providerName = uniqueId('fcm');

    beforeAll(async () => {
      cleanup.add(async () => {
        const { push_providers } = await client.listPushProviders();
        if (push_providers.some((p) => p.name === providerName))
          await client.deletePushProvider({
            type: 'firebase',
            name: providerName,
          });
      });
      await client.upsertPushProvider({
        push_provider: {
          name: providerName,
          type: 'firebase',
          firebase_credentials: firebaseCredentials,
        },
      });
    });

    /** Registers a device on the test provider (never the app's own) and checks it. */
    const createTestDevice = async () => {
      const userId = await createUser();
      const deviceId = uniqueId('device');
      // Remove the device before its provider (custom steps run in reverse order), unless
      // the snippet already did.
      cleanup.add(() =>
        client
          .deleteDevice({ id: deviceId, user_id: userId })
          .catch(() => undefined),
      );
      await client.createDevice({
        id: deviceId,
        push_provider: 'firebase',
        push_provider_name: providerName,
        user_id: userId,
      });
      const { devices } = await client.listDevices({ user_id: userId });
      expect(devices).toHaveLength(1);
      expect(devices[0]).toMatchObject({
        id: deviceId,
        push_provider_name: providerName,
      });
      return { userId, deviceId };
    };

    const expectNoDevices = async (userId: string) => {
      const { devices } = await client.listDevices({ user_id: userId });
      expect(devices).toEqual([]);
    };

    it('Remove a Device', async () => {
      const { userId, deviceId } = await createTestDevice();

      // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Remove a Device" tab="Node.js" index=1
      // COPY: deviceId="<device id>", userId="<user_id>"
      await client.deleteDevice({
        id: deviceId,
        user_id: userId,
      });
      // #endregion snippet

      await expectNoDevices(userId);
    });

    it('Removing from the chat client SDKs', async () => {
      const { userId, deviceId } = await createTestDevice();

      // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Removing from the chat client SDKs" tab="Node.js" index=1
      // COPY: deviceId="2ffca4ad6599adc9b5202d15a5286d33c19547d472cd09de44219cda5ac30207", userId="Taquito"
      await client.deleteDevice({
        id: deviceId,
        user_id: userId,
      });
      // #endregion snippet

      await expectNoDevices(userId);
    });

    it('Removing from the feeds client SDKs', async () => {
      const { userId, deviceId } = await createTestDevice();

      // #region snippet docs="platform/03-events-and-notifications/04-push-devices.md" heading="Removing from the feeds client SDKs" tab="Node.js" index=1
      // COPY: deviceId="<device id>", userId="<user_id>"
      await client.deleteDevice({
        id: deviceId,
        user_id: userId,
      });
      // #endregion snippet

      await expectNoDevices(userId);
    });
  });
});
