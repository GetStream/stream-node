import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { CheckPushRequest, CheckPushResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  firebaseCredentials,
  hasFirebaseCredentials,
} from '../../../helpers/push';
import { sendServerMessage } from '../../../helpers/server';

const DOCS = 'platform/03-events-and-notifications/06-push-troubleshooting.md';

/**
 * `checkPush` snippets. Both fences call `checkPush` without a provider, which would run
 * against the app's own `firebase:firebase` provider: tests must not use it. So each call
 * is redirected to a `uniqueId` Firebase provider the test creates (a spy adds
 * `push_provider_type` / `push_provider_name`, the region stays as written). Creating
 * that provider needs a real service account (the API rejects `sampleFirebaseCredentials`
 * with code 4 "firebase credentials are invalid", see 03-push-providers), so everything
 * is skipped without `DOCS_PUSH_FIREBASE_CREDENTIALS`. Pushes aren't checked
 * (`skip_devices: true`, and the user has no devices).
 */
describe.skipIf(!hasFirebaseCredentials)(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const providerName = uniqueId('fcm');
  let userId: string;
  let messageId: string;

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

    userId = uniqueId('user');
    await client.upsertUsers([{ id: userId, name: 'Push Tester' }]);
    cleanup.users.push(userId);

    const channel = client.chat.channel('messaging', uniqueId('channel'));
    await channel.getOrCreate({
      data: {
        created_by_id: userId,
        members: [{ user_id: userId }],
        custom: { name: 'Push test' },
      },
    });
    cleanup.channels.push(`messaging:${channel.id}`);

    const message = await sendServerMessage(client, `messaging:${channel.id}`, {
      text: 'hello push',
      user_id: userId,
    });
    messageId = message.id;
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  /** Sends every `checkPush` to the test's provider, never the app's own. */
  const spyOnCheckPush = () => {
    const original = client.checkPush.bind(client);
    return vi
      .spyOn(client, 'checkPush')
      .mockImplementation((request?: CheckPushRequest) =>
        original({
          ...request,
          push_provider_type: 'firebase',
          push_provider_name: providerName,
        }),
      );
  };

  const checkPushResult = async (spy: ReturnType<typeof spyOnCheckPush>) => {
    expect(spy).toHaveBeenCalledTimes(1);
    return spy.mock.results[0].value as Promise<CheckPushResponse>;
  };

  it('Testing Push', async () => {
    const spy = spyOnCheckPush();

    // #region snippet docs="platform/03-events-and-notifications/06-push-troubleshooting.md" heading="Testing Push" tab="Node.js" index=1
    await client.checkPush({
      user_id: userId,
      message_id: messageId,
      skip_devices: true,
    });
    // #endregion snippet

    expect(spy.mock.calls[0][0]).toEqual({
      user_id: userId,
      message_id: messageId,
      skip_devices: true,
    });
    const response = await checkPushResult(spy);
    expect(response.skip_devices).toBe(true);
    expect(typeof response.duration).toBe('string');
  });

  it('Testing Push (APN template)', async () => {
    const spy = spyOnCheckPush();

    // #region snippet docs="platform/03-events-and-notifications/06-push-troubleshooting.md" heading="Testing Push" tab="Node.js" index=2
    await client.checkPush({
      user_id: userId,
      message_id: messageId,
      skip_devices: true,
      apn_template:
        '{"aps":{"alert":{"title":"{{ sender.name }} @ {{ channel.name }}","body":"testing out new stuff:{{ message.text }}"},"category":"NEW_MESSAGE_2"}}',
    });
    // #endregion snippet

    expect(spy.mock.calls[0][0]).toMatchObject({
      user_id: userId,
      message_id: messageId,
      skip_devices: true,
    });
    const response = await checkPushResult(spy);
    expect(response.skip_devices).toBe(true);
    expect(typeof response.duration).toBe('string');
  });
});
