import { beforeAll, describe, expect, it } from 'vitest';
import { StreamClient } from '../src/StreamClient';
import { createTestClient } from './create-test-client';

describe('webhooks', () => {
  let client: StreamClient;

  beforeAll(async () => {
    client = createTestClient();
  });

  it('verify webhook - user.updated', async () => {
    const body = `{"type":"user.updated","created_at":"2026-04-08T14:23:35.879421674Z","user":{"id":"stream-node-test-user","name":"Stream Node Test User","language":"","role":"admin","teams":[],"created_at":"2025-10-20T15:13:35.51354Z","updated_at":"2026-04-08T14:23:35.873797Z","banned":false,"online":false,"blocked_user_ids":[],"invisible":false},"members":[],"request_info":{"type":"server","ip":"89.134.10.115","user_agent":"node","sdk":"stream-node-undefined"}}`;
    const validSignature =
      '4292bbc126ee72b77f70cc7152906b9ecd96648bca92f15ea0e022c44fc6ad11';
    const invalidSignature =
      '5d7fd77f8c3f92fc017a09775527716d22357f73d9d362435a7ed2a72d8c1a66';

    let isValid = client.verifyWebhook(body, validSignature);

    expect(isValid).toBe(true);

    isValid = client.verifyWebhook(body, invalidSignature);

    expect(isValid).toBe(false);
  });
});
