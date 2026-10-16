import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FirebaseConfigFields } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  firebaseCredentials,
  hasFirebaseCredentials,
} from '../../../helpers/push';

// Both fences create a push provider and set the app-level (non-multi-bundle)
// `firebase_config`: the API rejects both with code 4 "firebase credentials are
// invalid" unless the credentials are a real Firebase service account.
describe.skipIf(!hasFirebaseCredentials)(
  'chat/_default/07-push/07-legacy_push_system.md',
  () => {
    const client = getServerClient();
    const cleanup = new Cleanup(client);
    let originalFirebase: FirebaseConfigFields;

    beforeAll(async () => {
      originalFirebase = (await client.getApp()).app.push_notifications
        .firebase;
      // Restore the legacy app-level Firebase config the fences overwrite.
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

    const registerProvider = (name: string) =>
      cleanup.add(() => client.deletePushProvider({ type: 'firebase', name }));

    it('Updating Firebase APN template', async () => {
      const providerName = uniqueId('apn-provider');
      registerProvider(providerName);

      // #region snippet docs="chat/_default/07-push/07-legacy_push_system.md" heading="Updating Firebase APN template" tab="Node.js" index=1
      // COPY: providerName="my-name", firebaseCredentials="your service worker config"
      // for multi-bundle support
      await client.upsertPushProvider({
        push_provider: {
          name: providerName,
          type: 'firebase',
          firebase_credentials: firebaseCredentials,
          firebase_apn_template: 'your-template',
        },
      });

      // for non-multi-bundle support
      await client.updateApp({
        firebase_config: {
          credentials_json: firebaseCredentials,
          apn_template: 'your template',
        },
      });
      // #endregion snippet

      const { push_providers } = await client.listPushProviders();
      const provider = push_providers.find((p) => p.name === providerName);
      expect(provider).toMatchObject({
        type: 'firebase',
        firebase_apn_template: 'your-template',
      });
      const { app } = await client.getApp();
      expect(app.push_notifications.firebase.apn_template).toBe(
        'your template',
      );
    });

    it('Updating Firebase Notification template', async () => {
      const providerName = uniqueId('notification-provider');
      registerProvider(providerName);

      // #region snippet docs="chat/_default/07-push/07-legacy_push_system.md" heading="Updating Firebase Notification template" tab="Node.js" index=1
      // COPY: providerName="my-name", firebaseCredentials="your service worker config"
      // for multi-bundle support
      await client.upsertPushProvider({
        push_provider: {
          name: providerName,
          type: 'firebase',
          firebase_credentials: firebaseCredentials,
          firebase_notification_template: 'your-template',
        },
      });

      // for non-multi-bundle support
      await client.updateApp({
        firebase_config: {
          credentials_json: firebaseCredentials,
          notification_template: 'your template',
        },
      });
      // #endregion snippet

      const { push_providers } = await client.listPushProviders();
      const provider = push_providers.find((p) => p.name === providerName);
      expect(provider).toMatchObject({
        type: 'firebase',
        firebase_notification_template: 'your-template',
      });
      const { app } = await client.getApp();
      expect(app.push_notifications.firebase.notification_template).toBe(
        'your template',
      );
    });
  },
);
