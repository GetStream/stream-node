import crypto from 'crypto';
import zlib from 'zlib';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type {
  CheckSNSResponse,
  CheckSQSResponse,
  EventHook,
} from '../../../../../index';
import { InvalidWebhookError } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import {
  saveAndRestoreEventHooks,
  waitForEventHooks,
} from '../../../helpers/server';

const DOCS = 'platform/03-events-and-notifications/01-webhooks.md';

/** A sample webhook event and its serialized form, as Stream would send it. */
const sampleEvent = {
  type: 'message.new',
  cid: 'messaging:general',
  message: { id: 'message-id', text: 'hello', type: 'regular' },
  user: { id: 'john', role: 'user' },
  created_at: '2026-10-14T12:00:00.000Z',
};
const sampleJson = JSON.stringify(sampleEvent);
/** The SQS / SNS wire format with payload compression on: gzip, then base64. */
const compressedBase64 = zlib.gzipSync(sampleJson).toString('base64');

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  let originalHooks: EventHook[] = [];
  let restoreHooks: () => Promise<void>;
  const waitForHooks = (check: (hooks: EventHook[]) => boolean) =>
    waitForEventHooks(client, check);

  /** The hooks that are there before a "preserve existing hooks" snippet runs. */
  const expectOriginalHooksKept = (hooks: EventHook[]) => {
    expect(hooks.map((h) => h.id)).toEqual(
      expect.arrayContaining(originalHooks.map((h) => h.id)),
    );
    expect(hooks).toHaveLength(originalHooks.length + 1);
  };

  beforeAll(async () => {
    ({ original: originalHooks, restore: restoreHooks } =
      await saveAndRestoreEventHooks(client, cleanup));
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Subscribe to Specific Events', async () => {
    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Subscribe to Specific Events" tab="Node.js" index=1
    // Subscribe to message.new and message.updated events only
    await client.updateApp({
      event_hooks: [
        {
          enabled: true,
          hook_type: 'webhook',
          webhook_url: 'https://example.com/webhooks/stream/messages',
          event_types: ['message.new', 'message.updated'],
        },
      ],
    });
    // #endregion snippet

    // The array replaces every existing hook.
    const hooks = await waitForHooks(
      (h) =>
        h.length === 1 &&
        h[0].webhook_url === 'https://example.com/webhooks/stream/messages',
    );
    expect(hooks[0]).toMatchObject({
      enabled: true,
      hook_type: 'webhook',
      event_types: ['message.new', 'message.updated'],
    });
  });

  it('Subscribe to All Events', async () => {
    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Subscribe to All Events" tab="Node.js" index=1
    // Subscribe to all events (empty array = all events)
    await client.updateApp({
      event_hooks: [
        {
          enabled: true,
          hook_type: 'webhook',
          webhook_url: 'https://example.com/webhooks/stream/all',
          event_types: [], // empty array = all events
        },
      ],
    });
    // #endregion snippet

    const hooks = await waitForHooks(
      (h) =>
        h.length === 1 &&
        h[0].webhook_url === 'https://example.com/webhooks/stream/all',
    );
    expect(hooks[0]).toMatchObject({ enabled: true, hook_type: 'webhook' });
    // The empty list reads back as every event type, plus the "*" wildcard.
    expect(hooks[0].event_types).toEqual(
      expect.arrayContaining(['*', 'message.new', 'call.created']),
    );
  });

  it('Adding a Hook Without Deleting Existing Ones', async () => {
    await restoreHooks();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Adding a Hook Without Deleting Existing Ones" tab="Node.js" index=1
    // Note: Any previously existing hooks not included in event_hooks array will be deleted.
    // Get current settings first to preserve your existing configuration.

    // STEP 1: Get current app settings to preserve existing hooks
    const response = await client.getApp();
    console.log('Current event hooks:', response.app.event_hooks);

    // STEP 2: Add webhook hook while preserving existing hooks
    const existingHooks = response.app.event_hooks ?? [];
    const newWebhookHook = {
      enabled: true,
      hook_type: 'webhook',
      webhook_url: 'https://example.com/webhooks/stream/push',
      event_types: [], // empty array = all events
    };

    // STEP 3: Update with complete array including existing hooks
    await client.updateApp({
      event_hooks: [...existingHooks, newWebhookHook],
    });

    // Test webhook delivery using the Stream Dashboard
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(
      'Current event hooks:',
      response.app.event_hooks,
    );
    const hooks = await waitForHooks((h) =>
      h.some((hook) => hook.webhook_url === newWebhookHook.webhook_url),
    );
    expectOriginalHooksKept(hooks);
  });

  it('Verifying and Parsing Events', () => {
    // A gzipped webhook body (payload compression on), signed over the uncompressed bytes.
    const signature = crypto
      .createHmac('sha256', process.env.STREAM_SECRET as string)
      .update(sampleJson)
      .digest('hex');
    const req = {
      rawBody: zlib.gzipSync(sampleJson),
      headers: { 'x-signature': signature },
    };
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Verifying and Parsing Events" tab="Node.js" index=1
    // rawBody is the request body as Buffer or string (NOT a parsed JSON object).
    // signature is the value of the x-signature header.
    // Returns the parsed event object. Throws InvalidWebhookError on any failure.
    try {
      const event = client.verifyAndParseWebhook(
        req.rawBody,
        req.headers['x-signature'],
      );
      // event.type, event.user, ...
      console.log(event);
    } catch (err) {
      // err instanceof InvalidWebhookError; err.message identifies the mode
      console.error(err);
    }
    // #endregion snippet

    expect(error).not.toHaveBeenCalled();
    expect(log.mock.calls[0]?.[0]).toEqual(sampleEvent);

    // The same call accepts the uncompressed body.
    expect(client.verifyAndParseWebhook(sampleJson, signature)).toEqual(
      sampleEvent,
    );
    // Each failure mode throws an InvalidWebhookError whose message names it.
    expect(() =>
      client.verifyAndParseWebhook(req.rawBody, 'wrong-signature'),
    ).toThrow(InvalidWebhookError);
    expect(() =>
      client.verifyAndParseWebhook(req.rawBody, 'wrong-signature'),
    ).toThrow('signature mismatch');
    expect(() =>
      client.verifyAndParseWebhook(
        Buffer.from([0x1f, 0x8b, 0x00, 0x01]),
        signature,
      ),
    ).toThrow('gzip decompression failed');
    const notJson = 'not json';
    const notJsonSignature = crypto
      .createHmac('sha256', process.env.STREAM_SECRET as string)
      .update(notJson)
      .digest('hex');
    expect(() =>
      client.verifyAndParseWebhook(notJson, notJsonSignature),
    ).toThrow('invalid JSON payload');
  });

  it('Enabling compression', async () => {
    // getApp() doesn't return enable_hook_payload_compression, so the original value
    // can't be read: the test app predates the May 2026 default (off), restore that.
    cleanup.add(() =>
      client.updateApp({ enable_hook_payload_compression: false }),
    );
    const updateApp = vi.spyOn(client, 'updateApp');

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Enabling compression" tab="Node.js" index=1
    await client.updateApp({
      enable_hook_payload_compression: true,
    });
    // #endregion snippet

    const [result] = await Promise.all(
      updateApp.mock.results.map(
        (r) => r.value as ReturnType<typeof client.updateApp>,
      ),
    );
    expect(typeof result.duration).toBe('string');
  });

  it('Authentication (SQS)', async () => {
    await restoreHooks();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const checkSQS = vi.spyOn(client, 'checkSQS');

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Authentication" tab="Node.js" index=1
    // Note: Any previously existing hooks not included in event_hooks array will be deleted.
    // Get current settings first to preserve your existing configuration.

    // STEP 1: Get current app settings to preserve existing hooks
    const response = await client.getApp();
    console.log('Current event hooks:', response.app.event_hooks);

    // STEP 2: Add SQS hook while preserving existing hooks
    const existingHooks = response.app.event_hooks ?? [];
    const newSQSHook = {
      enabled: true,
      hook_type: 'sqs',
      sqs_queue_url: 'https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue',
      sqs_region: 'us-east-1',
      sqs_auth_type: 'keys', // or "resource" for role-based auth
      sqs_key: 'yourkey',
      sqs_secret: 'yoursecret',
      event_types: [], // empty array = all events
    };

    // STEP 3: Update with complete array including existing hooks
    await client.updateApp({
      event_hooks: [...existingHooks, newSQSHook],
    });

    // Test the SQS connection
    await client.checkSQS({
      sqs_url: 'https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue',
      sqs_key: 'yourkey',
      sqs_secret: 'yoursecret',
    });
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(
      'Current event hooks:',
      response.app.event_hooks,
    );
    const hooks = await waitForHooks((h) =>
      h.some((hook) => hook.sqs_queue_url === newSQSHook.sqs_queue_url),
    );
    expectOriginalHooksKept(hooks);
    expect(
      hooks.find((hook) => hook.sqs_queue_url === newSQSHook.sqs_queue_url),
    ).toMatchObject({
      hook_type: 'sqs',
      sqs_region: 'us-east-1',
      sqs_auth_type: 'keys',
      sqs_key: 'yourkey',
    });
    // The placeholder keys aren't real AWS credentials: the check reports the AWS error.
    const check = await (checkSQS.mock.results[0]
      .value as Promise<CheckSQSResponse>);
    expect(check.status).toBe('error');
    expect(check.error).toContain('InvalidClientTokenId');
  });

  it('Reading messages from SQS', () => {
    const message = { Body: compressedBase64 };

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Reading messages from SQS" tab="Node.js" index=1
    // message is the SQS Message object you received from ReceiveMessageCommand
    const event = client.parseSqs(message.Body);
    // event.type, event.user, ...
    // #endregion snippet

    expect(event).toEqual(sampleEvent);
    // Uncompressed payloads are base64 too in the SDK's view: plain JSON is rejected.
    expect(() => client.parseSqs(sampleJson)).toThrow(
      'invalid base64 encoding',
    );
    expect(client.parseSqs(Buffer.from(sampleJson).toString('base64'))).toEqual(
      sampleEvent,
    );
  });

  it('Authentication (SNS)', async () => {
    await restoreHooks();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const checkSNS = vi.spyOn(client, 'checkSNS');

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Authentication" tab="Node.js" index=2
    // Note: Any previously existing hooks not included in event_hooks array will be deleted.
    // Get current settings first to preserve your existing configuration.

    // STEP 1: Get current app settings to preserve existing hooks
    const response = await client.getApp();
    console.log('Current event hooks:', response.app.event_hooks);

    // STEP 2: Add SNS hook while preserving existing hooks
    const existingHooks = response.app.event_hooks ?? [];
    const newSNSHook = {
      enabled: true,
      hook_type: 'sns',
      sns_topic_arn: 'arn:aws:sns:us-east-1:123456789012:sns-topic',
      sns_region: 'us-east-1',
      sns_auth_type: 'keys', // or "resource" for role-based auth
      sns_key: 'yourkey',
      sns_secret: 'yoursecret',
      event_types: [], // empty array = all events
    };

    // STEP 3: Update with complete array including existing hooks
    await client.updateApp({
      event_hooks: [...existingHooks, newSNSHook],
    });

    // Test the SNS connection
    await client.checkSNS({
      sns_topic_arn: 'arn:aws:sns:us-east-1:123456789012:sns-topic',
      sns_key: 'yourkey',
      sns_secret: 'yoursecret',
    });
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(
      'Current event hooks:',
      response.app.event_hooks,
    );
    const hooks = await waitForHooks((h) =>
      h.some((hook) => hook.sns_topic_arn === newSNSHook.sns_topic_arn),
    );
    expectOriginalHooksKept(hooks);
    expect(
      hooks.find((hook) => hook.sns_topic_arn === newSNSHook.sns_topic_arn),
    ).toMatchObject({
      hook_type: 'sns',
      sns_region: 'us-east-1',
      sns_auth_type: 'keys',
      sns_key: 'yourkey',
    });
    const check = await (checkSNS.mock.results[0]
      .value as Promise<CheckSNSResponse>);
    expect(check.status).toBe('error');
    expect(check.error).toContain('InvalidClientTokenId');
  });

  it('Reading notifications from SNS', () => {
    const notification = { Message: compressedBase64 };

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Reading notifications from SNS" tab="Node.js" index=1
    const event = client.parseSns(notification.Message);
    // event.type, event.user, ...
    // #endregion snippet

    expect(event).toEqual(sampleEvent);
    // The raw envelope JSON works as well.
    expect(
      client.parseSns(
        JSON.stringify({ Type: 'Notification', Message: compressedBase64 }),
      ),
    ).toEqual(sampleEvent);
  });

  it.skip('BLOCKED: needs a real GCS service account (Configuration, GCS failover)', async () => {
    // updateApp rejects the placeholder credentials with code 4 "failover_config for hook
    // has invalid gcs_credentials: dialing: auth: email must be provided" (2026-10-14).

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Configuration" tab="Node.js" index=1
    await client.updateApp({
      event_hooks: [
        {
          enabled: true,
          hook_type: 'webhook',
          webhook_url: 'https://example.com/webhooks/stream',
          event_types: ['message.new'],
          failover_config: {
            type: 'gcs',
            gcs_bucket: 'my-failover-bucket',
            gcs_path: 'stream/failed-events',
            gcs_credentials: '{"type":"service_account","project_id":"..."}',
          },
        },
      ],
    });
    // #endregion snippet
  });

  it.skip('BLOCKED: S3 failover is not enabled for the app (Configuration, S3 failover)', async () => {
    // updateApp fails with code 4 "failover_config type 's3' is not enabled for hook"
    // (2026-10-14).

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Configuration" tab="Node.js" index=2
    await client.updateApp({
      event_hooks: [
        {
          enabled: true,
          hook_type: 'sqs',
          sqs_queue_url:
            'https://sqs.us-east-1.amazonaws.com/1111111111/my-queue',
          sqs_auth_type: 'role',
          sqs_role_arn: 'arn:aws:iam::1111111111:role/stream-events',
          event_types: ['message.new'],
          failover_config: {
            type: 's3',
            s3_bucket: 'my-failover-bucket',
            s3_path: 'stream/failed-events',
            s3_region: 'us-east-1',
            // Recommended: a role in your account that Stream assumes
            // (see S3 Permissions below for the trust policy). Alternatively
            // set s3_api_key + s3_secret to use a dedicated access key pair.
            s3_role_arn: 'arn:aws:iam::1111111111:role/stream-event-failover',
          },
        },
      ],
    });
    // #endregion snippet
  });

  it.skip('BLOCKED: needs a real GCS service account (Pending message hooks)', async () => {
    // updateApp rejects the placeholder credentials with code 4 "failover_config for hook
    // has invalid gcs_credentials: dialing: auth: email must be provided" (2026-10-15).

    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Pending message hooks" tab="Node.js" index=1
    await client.updateApp({
      event_hooks: [
        {
          enabled: true,
          hook_type: 'pending_message',
          webhook_url: 'https://example.com/pending-messages',
          timeout_ms: 10000,
          callback: {
            mode: 'CALLBACK_MODE_REST',
          },
          failover_config: {
            type: 'gcs',
            gcs_bucket: 'my-failover-bucket',
            gcs_path: 'stream/failed-pending-messages',
            gcs_credentials: '{"type":"service_account","project_id":"..."}',
          },
        },
      ],
    });
    // #endregion snippet
  });

  it('Disabling Failover', async () => {
    // #region snippet docs="platform/03-events-and-notifications/01-webhooks.md" heading="Disabling Failover" tab="Node.js" index=1
    await client.updateApp({
      event_hooks: [
        {
          enabled: true,
          hook_type: 'webhook',
          webhook_url: 'https://example.com/webhooks/stream',
          event_types: [],
          // no failover_config = failover disabled
        },
      ],
    });
    // #endregion snippet

    const hooks = await waitForHooks(
      (h) =>
        h.length === 1 &&
        h[0].webhook_url === 'https://example.com/webhooks/stream',
    );
    expect(hooks[0].failover_config).toBeUndefined();
  });
});
