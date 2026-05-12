import crypto from 'crypto';
import zlib from 'zlib';
import type { WHEvent } from '../gen/models';

/**
 * Canonical failure-mode messages for {@link InvalidWebhookError}.
 *
 * Callers that prefer exact-match filtering (security logging, retry
 * policy) over substring matches can compare `err.message` to these
 * constants instead of pattern-matching free-form text.
 */
export const InvalidWebhookErrorMessages = {
  signatureMismatch: 'signature mismatch',
  invalidBase64: 'invalid base64 encoding',
  gzipFailed: 'gzip decompression failed',
  invalidJson: 'invalid JSON payload',
} as const;

/**
 * Thrown by {@link verifyAndParseWebhook} when the supplied `x-signature`
 * does not match the HMAC of the uncompressed payload, and by all webhook
 * helpers (including {@link parseSqs} / {@link parseSns}) when a
 * gzip / base64 / JSON envelope is malformed.
 *
 * The message identifies which failure mode fired. See
 * {@link InvalidWebhookErrorMessages} for the canonical strings.
 */
export class InvalidWebhookError extends Error {
  public name = 'InvalidWebhookError';

  constructor(message: string = InvalidWebhookErrorMessages.signatureMismatch) {
    super(message);
  }
}

const GZIP_MAGIC = Buffer.from([0x1f, 0x8b]);

/**
 * Returns `body` as a `Buffer`, gzip-decompressed when its first two
 * bytes match the gzip magic (`1f 8b`, per RFC 1952). When the body is
 * plain JSON (no compression, or middleware already decompressed), the
 * bytes are returned unchanged.
 *
 * Magic-byte detection (rather than relying on a header) keeps the same
 * handler correct when middleware - Express, Next.js, AWS Lambda -
 * auto-decompresses the request before your code sees it.
 */
export function gunzipPayload(rawBody: string | Buffer): Buffer {
  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody);
  if (body.length >= 2 && body.subarray(0, 2).equals(GZIP_MAGIC)) {
    try {
      return zlib.gunzipSync(body);
    } catch {
      throw new InvalidWebhookError(InvalidWebhookErrorMessages.gzipFailed);
    }
  }
  return body;
}

/**
 * Reverses the SQS firehose envelope: the message `Body` is
 * base64-decoded, then the result is gzip-decompressed when it begins
 * with the gzip magic. Returns the raw JSON `Buffer` Stream signed.
 *
 * SQS bodies are always base64-encoded so they remain valid UTF-8 over
 * the queue. The same call works whether or not Stream is currently
 * compressing payloads for this app.
 */
export function decodeSqsPayload(body: string): Buffer {
  // Reject anything that isn't canonical base64 up front. Node's base64
  // decoder is permissive (silently strips characters outside the
  // alphabet, accepts both standard and URL-safe variants), so we have
  // to be strict here to avoid silently corrupting the body before the
  // signature check runs.
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(body) || body.length % 4 !== 0) {
    throw new InvalidWebhookError(InvalidWebhookErrorMessages.invalidBase64);
  }
  const decoded = Buffer.from(body, 'base64');
  if (decoded.toString('base64').length !== body.length) {
    throw new InvalidWebhookError(InvalidWebhookErrorMessages.invalidBase64);
  }
  return gunzipPayload(decoded);
}

/**
 * Reverses an SNS HTTP notification envelope. When `notificationBody`
 * is a JSON envelope (`{"Type":"Notification","Message":"..."}`), the
 * inner `Message` field is extracted and run through the SQS pipeline
 * (base64-decode, then gzip-if-magic). When the input is not a JSON
 * envelope it is treated as the already-extracted `Message` string,
 * so call sites that pre-unwrap continue to work.
 */
export function decodeSnsPayload(notificationBody: string): Buffer {
  const inner = extractSnsMessage(notificationBody);
  return decodeSqsPayload(inner ?? notificationBody);
}

function extractSnsMessage(notificationBody: string): string | null {
  const trimmed = notificationBody.replace(/^[\s\uFEFF]+/, '');
  if (!trimmed.startsWith('{')) {
    return null;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }
  if (
    parsed === null ||
    typeof parsed !== 'object' ||
    Array.isArray(parsed) ||
    typeof (parsed as { Message?: unknown }).Message !== 'string'
  ) {
    return null;
  }
  return (parsed as { Message: string }).Message;
}

/**
 * Constant-time HMAC-SHA256 verification of `signature` against the
 * digest of `body` using `secret` as the key. The signature is always
 * computed over the **uncompressed** JSON bytes, so callers that
 * decoded a gzipped or base64-wrapped payload must pass the inflated
 * bytes here.
 *
 * The legacy `client.verifyWebhook` helper wraps this function, so
 * callers that have already migrated to `verifyAndParseWebhook`,
 * `parseSqs`, or `parseSns` rarely need to invoke this directly.
 */
export function verifySignature(
  body: string | Buffer,
  signature: string,
  secret: string,
): boolean {
  const key = Buffer.from(secret, 'utf8');
  const hash = crypto.createHmac('sha256', key).update(body).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
  } catch {
    return false;
  }
}

/**
 * Parse a JSON-encoded webhook event into a typed {@link WHEvent}. New
 * event types Stream introduces still parse successfully — the runtime
 * shape is the JSON Stream sent and the `type` field stays preserved.
 */
export function parseEvent(payload: Buffer | string): WHEvent {
  const text = Buffer.isBuffer(payload) ? payload.toString('utf8') : payload;
  try {
    return JSON.parse(text) as WHEvent;
  } catch {
    throw new InvalidWebhookError(InvalidWebhookErrorMessages.invalidJson);
  }
}

function verifyAndParse(
  payload: Buffer,
  signature: string,
  secret: string,
): WHEvent {
  if (!verifySignature(payload, signature, secret)) {
    throw new InvalidWebhookError(
      InvalidWebhookErrorMessages.signatureMismatch,
    );
  }
  return parseEvent(payload);
}

/**
 * Decompress (when gzipped), verify the HMAC `signature`, and return
 * the parsed {@link WHEvent}.
 *
 * @param rawBody Raw HTTP request body bytes Stream signed
 * @param signature Value of the `X-Signature` header
 * @param secret Your app's API secret
 * @throws {InvalidWebhookError} When the signature does not match or
 *   the gzip / base64 / JSON envelope is malformed.
 */
export function verifyAndParseWebhook(
  rawBody: string | Buffer,
  signature: string,
  secret: string,
): WHEvent {
  return verifyAndParse(gunzipPayload(rawBody), signature, secret);
}

/**
 * Decode the SQS message `Body` (base64, then gzip-if-magic) and return
 * the parsed {@link WHEvent}. Stream does not attach an application-level
 * HMAC to SQS deliveries — use {@link verifyAndParseWebhook} for HTTP
 * webhooks.
 */
export function parseSqs(messageBody: string): WHEvent {
  return parseEvent(decodeSqsPayload(messageBody));
}

/**
 * Decode an SNS notification (unwrap the JSON envelope when needed; same
 * inner format as SQS). No application-level HMAC verification.
 */
export function parseSns(notificationBody: string): WHEvent {
  return parseEvent(decodeSnsPayload(notificationBody));
}
