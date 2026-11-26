import crypto from 'crypto';
import { describe, expect, it } from 'vitest';
import { StreamClient } from '../../src/StreamClient';
import {
  InvalidWebhookError,
  InvalidWebhookErrorMessages,
  verifyAndParseWebhook,
  verifySignature,
} from '../../src/utils/webhook';

describe('webhook signature empty secret & signature guards', () => {
  const payload = JSON.stringify({ type: 'message.new' });

  it('reports a missing secret, not a signature mismatch, in verifyAndParseWebhook', () => {
    const forged = crypto
      .createHmac('sha256', Buffer.from('', 'utf8'))
      .update(payload)
      .digest('hex');

    const verify = () => verifyAndParseWebhook(payload, forged, '');
    expect(verify).toThrow(InvalidWebhookError);
    expect(verify).toThrow(InvalidWebhookErrorMessages.missingSecret);
  });

  it('rejects an empty secret even with a matching HMAC', () => {
    const forged = crypto
      .createHmac('sha256', Buffer.from('', 'utf8'))
      .update(payload)
      .digest('hex');

    expect(verifySignature(payload, forged, '')).toBe(false);
  });

  it('rejects an empty signature', () => {
    expect(verifySignature(payload, '', 'real-secret')).toBe(false);
  });

  it('rejects an empty signature on StreamClient.verifyWebhook', () => {
    const client = new StreamClient('test-key', 'real-secret');

    expect(client.verifyWebhook(payload, '')).toBe(false);
  });

  it('accepts a valid signature on StreamClient.verifyWebhook', () => {
    const client = new StreamClient('test-key', 'real-secret');
    const valid = crypto
      .createHmac('sha256', Buffer.from('real-secret', 'utf8'))
      .update(payload)
      .digest('hex');

    expect(client.verifyWebhook(payload, valid)).toBe(true);
  });
});
