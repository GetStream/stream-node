import crypto from 'crypto';
import zlib from 'zlib';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { waitForAppSetting } from '../../../../helpers/server';

const DOCS =
  'chat/_default/08-webhooks/01-webhooks_overview/02-before_message_send_webhook.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Configuration', async () => {
    const { app } = await client.getApp();
    const original = app.before_message_send_hook_url;
    cleanup.add(async () => {
      await client.updateApp({ before_message_send_hook_url: original ?? '' });
      await waitForAppSetting(client, 'before_message_send_hook_url', original);
    });

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/02-before_message_send_webhook.md" heading="Configuration" tab="Node.js" index=1
    await client.updateApp({
      before_message_send_hook_url:
        'https://example.com/webhooks/stream/before-message-send',
    });
    // #endregion snippet

    await waitForAppSetting(
      client,
      'before_message_send_hook_url',
      'https://example.com/webhooks/stream/before-message-send',
    );
  });

  it('Per-attempt HTTP timeout', async () => {
    const { app } = await client.getApp();
    const original = app.before_message_send_hook_attempt_timeout_ms;
    expect(original).not.toBe(2000);
    cleanup.add(async () => {
      await client.updateApp({
        before_message_send_hook_attempt_timeout_ms: original ?? 0,
      });
      await waitForAppSetting(
        client,
        'before_message_send_hook_attempt_timeout_ms',
        original,
      );
    });

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/02-before_message_send_webhook.md" heading="Per-attempt HTTP timeout" tab="Node.js" index=1
    await client.updateApp({
      before_message_send_hook_attempt_timeout_ms: 2000,
    });
    // #endregion snippet

    await waitForAppSetting(
      client,
      'before_message_send_hook_attempt_timeout_ms',
      2000,
    );

    // "The API rejects negative values and values greater than 5000 with an error."
    await expect(
      client.updateApp({ before_message_send_hook_attempt_timeout_ms: 5001 }),
    ).rejects.toMatchObject({ code: 4 });
  });

  it('Payload Compression', () => {
    // A gzipped Before Message Send payload, signed with the API secret over the
    // uncompressed bytes, as Stream sends it with compression enabled.
    const payload = JSON.stringify({
      message: { id: '', text: 'hello', type: 'regular' },
      user: { id: 'john', role: 'user' },
      channel: { cid: 'messaging:general', id: 'general', type: 'messaging' },
    });
    const signature = crypto
      .createHmac('sha256', process.env.STREAM_SECRET as string)
      .update(payload)
      .digest('hex');
    const req = {
      rawBody: zlib.gzipSync(payload),
      headers: { 'x-signature': signature },
    };
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    // #region snippet docs="chat/_default/08-webhooks/01-webhooks_overview/02-before_message_send_webhook.md" heading="Payload Compression" tab="Node.js" index=1
    try {
      const event = client.verifyAndParseWebhook(
        req.rawBody,
        req.headers['x-signature'],
      );
      console.log(event);
    } catch (err) {
      // err is an InvalidWebhookError; see the webhooks overview for failure-mode messages
      console.error(err);
    }
    // #endregion snippet

    expect(error).not.toHaveBeenCalled();
    expect(log.mock.calls[0]?.[0]).toEqual(JSON.parse(payload));

    // A wrong signature throws an InvalidWebhookError.
    expect(() =>
      client.verifyAndParseWebhook(req.rawBody, 'wrong-signature'),
    ).toThrow('signature mismatch');
  });
});
