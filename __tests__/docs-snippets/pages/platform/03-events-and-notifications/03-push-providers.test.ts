import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FirebaseConfigFields } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  firebaseCredentials,
  hasFirebaseCredentials,
} from '../../../helpers/push';

const DOCS = 'platform/03-events-and-notifications/03-push-providers.md';

/**
 * Push provider snippets. Provider names are `uniqueId`s (the API allows at most 36
 * characters), and the app's own `firebase:firebase` provider is never touched.
 */
describe(DOCS, () => {
  const client = getServerClient();

  it('List Push Providers', async () => {
    // #region snippet docs="platform/03-events-and-notifications/03-push-providers.md" heading="List Push Providers" tab="Node.js" index=1
    const { push_providers } = await client.listPushProviders();
    // #endregion snippet

    expect(Array.isArray(push_providers)).toBe(true);
    for (const provider of push_providers) {
      expect(typeof provider.name).toBe('string');
      expect(typeof provider.type).toBe('string');
    }
  });

  // Every other fence creates a Firebase provider or sets the app-level `firebase_config`:
  // the API rejects the page's sample service account JSON (`sampleFirebaseCredentials`)
  // with code 4 "firebase credentials are invalid" (both `upsertPushProvider` and
  // `updateApp`, probed 2026-10-14), so they need a real service account.
  describe.skipIf(!hasFirebaseCredentials)('with Firebase credentials', () => {
    const cleanup = new Cleanup(client);
    let originalFirebase: FirebaseConfigFields;

    const providerExists = async (name: string) => {
      const { push_providers } = await client.listPushProviders();
      return push_providers.some(
        (p) => p.type === 'firebase' && p.name === name,
      );
    };

    /** Deletes a test provider in cleanup, unless a snippet already deleted it. */
    const registerProvider = (name: string) =>
      cleanup.add(async () => {
        if (await providerExists(name))
          await client.deletePushProvider({ type: 'firebase', name });
      });

    const createProvider = async (name: string) => {
      registerProvider(name);
      await client.upsertPushProvider({
        push_provider: {
          name,
          type: 'firebase',
          firebase_credentials: firebaseCredentials,
        },
      });
    };

    beforeAll(async () => {
      originalFirebase = (await client.getApp()).app.push_notifications
        .firebase;
      // Restore the app-level (single-provider) Firebase config that "Single-Provider
      // Configuration" overwrites. Credentials are never returned, so only the
      // templates and the enabled flag can be put back.
      cleanup.add(() =>
        client.updateApp({
          firebase_config: {
            apn_template: originalFirebase.apn_template ?? '',
            notification_template: originalFirebase.notification_template ?? '',
            disabled: !originalFirebase.enabled,
          },
        }),
      );
    });

    afterAll(() => cleanup.run());

    it('Upsert a Push Provider', async () => {
      const providerName = uniqueId('fcm');
      registerProvider(providerName);

      // #region snippet docs="platform/03-events-and-notifications/03-push-providers.md" heading="Upsert a Push Provider" tab="Node.js" index=1
      // COPY: providerName="my-custom-name", firebaseCredentials="my-service-account-information"
      await client.upsertPushProvider({
        push_provider: {
          name: providerName,
          type: 'firebase',
          firebase_credentials: firebaseCredentials,
        },
      });
      // #endregion snippet

      expect(await providerExists(providerName)).toBe(true);
    });

    it('Delete a Push Provider', async () => {
      const providerType = 'firebase';
      const providerName = uniqueId('fcm');
      await createProvider(providerName);
      expect(await providerExists(providerName)).toBe(true);

      // #region snippet docs="platform/03-events-and-notifications/03-push-providers.md" heading="Delete a Push Provider" tab="Node.js" index=1
      // COPY: providerType="apn or firebase or huawei or xiaomi", providerName="your given custom name while creating"
      await client.deletePushProvider({
        type: providerType,
        name: providerName,
      });
      // #endregion snippet

      expect(await providerExists(providerName)).toBe(false);
    });

    it('Linking Devices to Providers', async () => {
      const providerName = uniqueId('fcm');
      await createProvider(providerName);
      const userId = uniqueId('user');
      await client.upsertUsers([{ id: userId }]);
      cleanup.users.push(userId);
      const deviceId = uniqueId('device');
      const pushProvider = 'firebase';
      // Remove the device before its provider (cleanup runs in reverse order).
      cleanup.add(() => client.deleteDevice({ id: deviceId, user_id: userId }));

      // #region snippet docs="platform/03-events-and-notifications/03-push-providers.md" heading="Linking Devices to Providers" tab="Node.js" index=1
      // COPY: deviceId="your client side generated device token to receive pushes", userId="your user id for server side calls", pushProvider="apn or firebase or huawei or xiaomi", providerName="the name of the provider you created while configuring your app"
      await client.createDevice({
        id: deviceId,
        user_id: userId,
        push_provider: pushProvider,
        push_provider_name: providerName,
      });
      // #endregion snippet

      const { devices } = await client.listDevices({ user_id: userId });
      expect(devices).toHaveLength(1);
      expect(devices[0]).toMatchObject({
        id: deviceId,
        push_provider: 'firebase',
        push_provider_name: providerName,
      });
    });

    it('Single-Provider Configuration', async () => {
      // #region snippet docs="platform/03-events-and-notifications/03-push-providers.md" heading="Single-Provider Configuration" tab="Node.js" index=1
      // COPY: firebaseCredentials="my-service-account-information"
      // this configuration is same with upsert push provider
      // except type is inherent and naming is missing so it's set to empty string
      await client.updateApp({
        firebase_config: {
          credentials_json: firebaseCredentials,
        },
      });
      // #endregion snippet

      const { app } = await client.getApp();
      expect(app.push_notifications.firebase.enabled).toBe(true);
    });
  });
});
