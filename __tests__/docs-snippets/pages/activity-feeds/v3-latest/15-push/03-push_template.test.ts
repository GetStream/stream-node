import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import {
  firebaseCredentials,
  hasFirebaseCredentials,
} from '../../../../helpers/push';

const DOCS = 'activity-feeds/v3-latest/_default/15-push/03-push_template.md';

/**
 * Both fences use the push provider `firebase`, which is the test app's own provider:
 * tests must not touch it. The provider name is COPY-mapped to a `uniqueId` Firebase
 * provider the test creates, which needs a real service account (the API rejects fake
 * credentials with code 4 "firebase credentials are invalid"), so everything is skipped
 * without `DOCS_PUSH_FIREBASE_CREDENTIALS`. Templates go away with the provider.
 */
describe.skipIf(!hasFirebaseCredentials)(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
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

  afterAll(() => cleanup.run());

  it('Example', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/15-push/03-push_template.md" heading="Example" tab="Node.js" index=1
    // COPY: providerName="firebase"
    // Enable push notifications for comment_added events with custom template
    const response = await client.upsertPushTemplate({
      enable_push: true,
      event_type: 'feeds.comment.added',
      push_provider_type: 'firebase',
      push_provider_name: providerName,
      template: JSON.stringify({
        data: {
          sender: 'stream.feeds',
          type: '{{ event_type }}',
          body: '{{ truncate comment.text 150 }}',
          title: '{{ sender.name }} commented on your activity',
          fid: '{{ feed.fid }}',
          activity_id: '{{ activity.id }}',
          comment_id: '{{ comment.id }}',
          receiver_id: '{{ receiver.id }}',
        },
        android: {
          priority: 'high',
        },
        apns: {
          payload: {
            aps: {
              alert: {
                title: '{{ sender.name }} commented on your activity',
                body: '{{ truncate comment.text 150 }}',
              },
              sound: 'default',
              'mutable-content': 1,
              'content-available': 0,
              category: 'stream.feeds',
            },
          },
        },
      }),
    });
    // #endregion snippet

    expect(response.template).toMatchObject({
      enable_push: true,
      event_type: 'feeds.comment.added',
    });
    const template = JSON.parse(response.template?.template ?? '{}') as {
      data?: { title?: string };
    };
    expect(template.data?.title).toBe(
      '{{ sender.name }} commented on your activity',
    );
  });

  it('Retrieving Push Templates', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/15-push/03-push_template.md" heading="Retrieving Push Templates" tab="Node.js" index=1
    // COPY: providerName="firebase"
    // Retrieve push templates for a specific provider
    const response = await client.getPushTemplates({
      push_provider_type: 'firebase',
      push_provider_name: providerName,
    });
    // #endregion snippet

    // The template the previous test stored.
    expect(
      response.templates.find((t) => t.event_type === 'feeds.comment.added'),
    ).toMatchObject({ enable_push: true });
  });
});
