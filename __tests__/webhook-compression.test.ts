import crypto from 'crypto';
import zlib from 'zlib';

import { beforeEach, describe, expect, it } from 'vitest';

import { StreamClient } from '../src/StreamClient';
import {
  decodeSnsPayload,
  decodeSqsPayload,
  gunzipPayload,
  InvalidWebhookError,
  InvalidWebhookErrorMessages,
  parseEvent,
  parseSns,
  parseSqs,
  verifyAndParseWebhook,
  verifySignature,
} from '../src/utils/webhook';

const JSON_BODY =
  '{"type":"user.updated","created_at":"2026-04-08T14:23:35.879421674Z","user":{"id":"u-1"}}';
const API_KEY = 'tkey';
const API_SECRET = 'tsec2';

const sign = (body: Buffer | string) =>
  crypto
    .createHmac('sha256', Buffer.from(API_SECRET, 'utf8'))
    .update(body)
    .digest('hex');

const gzip = (body: Buffer | string) =>
  zlib.gzipSync(Buffer.isBuffer(body) ? body : Buffer.from(body));

const base64 = (body: Buffer | string) =>
  (Buffer.isBuffer(body) ? body : Buffer.from(body)).toString('base64');

const snsEnvelope = (innerMessage: string) =>
  JSON.stringify({
    Type: 'Notification',
    MessageId: '22b80b92-fdea-4c2c-8f9d-bdfb0c7bf324',
    TopicArn: 'arn:aws:sns:us-east-1:123456789012:stream-webhooks',
    Message: innerMessage,
    Timestamp: '2026-05-11T10:00:00.000Z',
    SignatureVersion: '1',
    MessageAttributes: {
      'X-Signature': { Type: 'String', Value: '<signature placeholder>' },
    },
  });

describe('Webhook verification + parsing', () => {
  let client: StreamClient;

  beforeEach(() => {
    client = new StreamClient(API_KEY, API_SECRET);
  });

  describe('verifyWebhook (legacy boolean helper, unchanged)', () => {
    it('validates a plain JSON body with its HMAC signature', () => {
      expect(client.verifyWebhook(JSON_BODY, sign(JSON_BODY))).toBe(true);
    });

    it('rejects when signature is wrong', () => {
      expect(client.verifyWebhook(JSON_BODY, 'deadbeef')).toBe(false);
    });
  });

  describe('verifySignature', () => {
    it('returns true for matching HMAC', () => {
      expect(verifySignature(JSON_BODY, sign(JSON_BODY), API_SECRET)).toBe(
        true,
      );
    });

    it('returns false for mismatched signature', () => {
      expect(verifySignature(JSON_BODY, '0'.repeat(64), API_SECRET)).toBe(
        false,
      );
    });

    it('returns false for wrong secret', () => {
      const sig = crypto
        .createHmac('sha256', 'other')
        .update(JSON_BODY)
        .digest('hex');
      expect(verifySignature(JSON_BODY, sig, API_SECRET)).toBe(false);
    });

    it('rejects signatures computed over compressed bytes', () => {
      const compressed = gzip(JSON_BODY);
      expect(verifySignature(JSON_BODY, sign(compressed), API_SECRET)).toBe(
        false,
      );
    });
  });

  describe('gunzipPayload', () => {
    it('passes through plain bytes unchanged', () => {
      expect(gunzipPayload(JSON_BODY).toString('utf8')).toBe(JSON_BODY);
    });

    it('passes through Buffer input unchanged', () => {
      expect(gunzipPayload(Buffer.from(JSON_BODY)).toString('utf8')).toBe(
        JSON_BODY,
      );
    });

    it('inflates gzip-magic bytes', () => {
      expect(gunzipPayload(gzip(JSON_BODY)).toString('utf8')).toBe(JSON_BODY);
    });

    it('returns Buffer in all cases', () => {
      expect(Buffer.isBuffer(gunzipPayload(JSON_BODY))).toBe(true);
      expect(Buffer.isBuffer(gunzipPayload(gzip(JSON_BODY)))).toBe(true);
    });

    it('handles empty input', () => {
      expect(gunzipPayload(Buffer.alloc(0)).length).toBe(0);
    });

    it('throws InvalidWebhookError on truncated gzip with magic', () => {
      const bad = Buffer.concat([
        Buffer.from([0x1f, 0x8b]),
        Buffer.from([0, 0, 0]),
      ]);
      expect(() => gunzipPayload(bad)).toThrow(InvalidWebhookError);
      expect(() => gunzipPayload(bad)).toThrow(
        InvalidWebhookErrorMessages.gzipFailed,
      );
    });
  });

  describe('decodeSqsPayload', () => {
    it('decodes base64 only (no compression)', () => {
      expect(decodeSqsPayload(base64(JSON_BODY)).toString('utf8')).toBe(
        JSON_BODY,
      );
    });

    it('decodes base64 + gzip', () => {
      expect(decodeSqsPayload(base64(gzip(JSON_BODY))).toString('utf8')).toBe(
        JSON_BODY,
      );
    });

    it('throws InvalidWebhookError on malformed base64', () => {
      expect(() => decodeSqsPayload('!!!not-base64!!!')).toThrow(
        InvalidWebhookError,
      );
      expect(() => decodeSqsPayload('!!!not-base64!!!')).toThrow(
        InvalidWebhookErrorMessages.invalidBase64,
      );
    });
  });

  describe('decodeSnsPayload', () => {
    it('treats a pre-extracted Message identically to decodeSqsPayload', () => {
      const wrapped = base64(gzip(JSON_BODY));
      expect(decodeSnsPayload(wrapped).equals(decodeSqsPayload(wrapped))).toBe(
        true,
      );
    });

    it('round-trips base64 + gzip (pre-extracted Message)', () => {
      expect(decodeSnsPayload(base64(gzip(JSON_BODY))).toString('utf8')).toBe(
        JSON_BODY,
      );
    });

    it('unwraps a full SNS HTTP notification envelope', () => {
      const wrapped = base64(gzip(JSON_BODY));
      const envelope = snsEnvelope(wrapped);
      expect(decodeSnsPayload(envelope).toString('utf8')).toBe(JSON_BODY);
    });

    it('handles whitespace before the envelope JSON', () => {
      const wrapped = base64(gzip(JSON_BODY));
      const envelope = `\n  ${snsEnvelope(wrapped)}`;
      expect(decodeSnsPayload(envelope).toString('utf8')).toBe(JSON_BODY);
    });
  });

  describe('parseEvent', () => {
    it('parses Buffer payload into a typed event', () => {
      const ev = parseEvent(Buffer.from(JSON_BODY));
      expect(ev.type).toBe('user.updated');
    });

    it('parses string payload', () => {
      const ev = parseEvent(JSON_BODY);
      expect(ev.type).toBe('user.updated');
    });

    it('throws InvalidWebhookError on malformed JSON', () => {
      expect(() => parseEvent('not json')).toThrow(InvalidWebhookError);
      expect(() => parseEvent('not json')).toThrow(
        InvalidWebhookErrorMessages.invalidJson,
      );
    });
  });

  describe('verifyAndParseWebhook', () => {
    it('parses a plain HTTP webhook with a valid signature', () => {
      const ev = client.verifyAndParseWebhook(JSON_BODY, sign(JSON_BODY));
      expect(ev.type).toBe('user.updated');
    });

    it('parses a gzip-compressed HTTP webhook', () => {
      const ev = client.verifyAndParseWebhook(gzip(JSON_BODY), sign(JSON_BODY));
      expect(ev.type).toBe('user.updated');
    });

    it('throws InvalidWebhookError on signature mismatch', () => {
      expect(() => client.verifyAndParseWebhook(JSON_BODY, 'deadbeef')).toThrow(
        InvalidWebhookError,
      );
      expect(() => client.verifyAndParseWebhook(JSON_BODY, 'deadbeef')).toThrow(
        InvalidWebhookErrorMessages.signatureMismatch,
      );
    });

    it('rejects a gzip body when the signature was computed over compressed bytes', () => {
      const compressed = gzip(JSON_BODY);
      expect(() =>
        client.verifyAndParseWebhook(compressed, sign(compressed)),
      ).toThrow(InvalidWebhookError);
    });

    it('also works as a package-level function', () => {
      const ev = verifyAndParseWebhook(JSON_BODY, sign(JSON_BODY), API_SECRET);
      expect(ev.type).toBe('user.updated');
    });
  });

  describe('parseSqs', () => {
    it('parses a base64-only SQS body', () => {
      const ev = client.parseSqs(base64(JSON_BODY));
      expect(ev.type).toBe('user.updated');
    });

    it('parses a base64 + gzip SQS body', () => {
      const wrapped = base64(gzip(JSON_BODY));
      const ev = client.parseSqs(wrapped);
      expect(ev.type).toBe('user.updated');
    });

    it('also works as a package-level function', () => {
      const wrapped = base64(gzip(JSON_BODY));
      const ev = parseSqs(wrapped);
      expect(ev.type).toBe('user.updated');
    });

    it('surfaces malformed base64 as InvalidWebhookError', () => {
      expect(() => client.parseSqs('!!!not-base64!!!')).toThrow(
        InvalidWebhookError,
      );
    });
  });

  describe('parseSns', () => {
    it('parses a pre-extracted base64 + gzip SNS message', () => {
      const wrapped = base64(gzip(JSON_BODY));
      const ev = client.parseSns(wrapped);
      expect(ev.type).toBe('user.updated');
    });

    it('produces the same event as parseSqs (pre-extracted Message)', () => {
      const wrapped = base64(gzip(JSON_BODY));
      expect(client.parseSns(wrapped)).toEqual(client.parseSqs(wrapped));
    });

    it('parses a full SNS HTTP notification envelope', () => {
      const wrapped = base64(gzip(JSON_BODY));
      const envelope = snsEnvelope(wrapped);
      const ev = client.parseSns(envelope);
      expect(ev.type).toBe('user.updated');
    });

    it('also works as a package-level function', () => {
      const wrapped = base64(gzip(JSON_BODY));
      const ev = parseSns(wrapped);
      expect(ev.type).toBe('user.updated');
    });
  });
});
