import crypto from 'crypto';
import zlib from 'zlib';
import { describe, expect, it } from 'vitest';

// Values the module-level region below uses (it must come after them: TDZ).
// A gzipped webhook body (payload compression on), signed over the uncompressed bytes.
const sampleEvent = {
  type: 'message.new',
  cid: 'messaging:general',
  message: { id: 'message-id', text: 'hello', type: 'regular' },
  user: { id: 'john', role: 'user' },
};
const sampleJson = JSON.stringify(sampleEvent);
const secret = process.env.STREAM_SECRET as string;
const signature = crypto
  .createHmac('sha256', secret)
  .update(sampleJson)
  .digest('hex');
const rawBody = zlib.gzipSync(sampleJson);

// #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Where each argument comes from" tab="Node.js" index=1
// Node.js (@stream-io/node-sdk)
import { verifyAndParseWebhook } from '@stream-io/node-sdk';
const event = verifyAndParseWebhook(rawBody, signature, secret);
// #endregion snippet

describe('platform/03-events-and-notifications/01-webhooks.md (stateless helper)', () => {
  it('Where each argument comes from', () => {
    expect(event).toEqual(sampleEvent);
    // Same result for the uncompressed body; a wrong secret fails the signature check.
    expect(verifyAndParseWebhook(sampleJson, signature, secret)).toEqual(
      sampleEvent,
    );
    expect(() =>
      verifyAndParseWebhook(rawBody, signature, 'wrong-secret'),
    ).toThrow('signature mismatch');
  });
});
