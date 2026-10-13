import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  getServerUser,
  sendServerMessage,
  waitForAppSetting,
} from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS =
  '_default/05-features/10-advanced/14-user_average_response_time.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const buyerId = uniqueId('buyer');
  const sellerId = uniqueId('seller');
  const channelId = uniqueId('marketplace');
  const cid = `messaging:${channelId}`;

  beforeAll(async () => {
    cleanup.users.push(buyerId, sellerId);
    await client.upsertUsers([{ id: buyerId }, { id: sellerId }]);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: {
        created_by_id: buyerId,
        members: [{ user_id: buyerId }, { user_id: sellerId }],
      },
    });
    cleanup.channels.push(cid);
  });

  afterAll(() => cleanup.run());

  it('Configuration', async () => {
    const { app } = await client.getApp();
    const original = app.user_response_time_enabled;
    cleanup.add(async () => {
      await client.updateApp({ user_response_time_enabled: original });
      await waitForAppSetting(client, 'user_response_time_enabled', original);
    });

    // #region snippet docs="_default/05-features/10-advanced/14-user_average_response_time.md" heading="Configuration" tab="Node.js" index=1
    // Enable user response time tracking
    await client.updateApp({
      user_response_time_enabled: true,
    });
    // #endregion snippet

    await waitForAppSetting(client, 'user_response_time_enabled', true);

    // "Once enabled, the avg_response_time field will be included in user responses"
    await sendServerMessage(client, cid, {
      text: 'Is this still available?',
      user_id: buyerId,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await sendServerMessage(client, cid, {
      text: 'Yes, it is.',
      user_id: sellerId,
    });
    const seller = await retry(
      async () => {
        const user = await getServerUser(client, sellerId);
        if (user.avg_response_time === undefined) {
          throw new Error('avg_response_time not set yet');
        }
        return user;
      },
      { timeout: 30000 },
    );
    expect(seller.avg_response_time).toBeGreaterThan(0);
  });
});
