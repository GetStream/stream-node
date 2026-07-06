import { beforeAll, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';

describe('user-video compatibility API', () => {
  let client: StreamClient;
  const user = {
    id: randomUUID(),
    role: 'admin',
    name: 'Test User for user API compatibily',
    custom: {
      note: 'compatibilty test',
    },
  };

  beforeAll(async () => {
    client = createTestClient();
    await client.upsertUsers([user]);
  });

  it('create call', async () => {
    const call = client.video.call('default', randomUUID());
    const response = await call.create({ data: { created_by: user } });

    // Backend returns: {custom: { custom: { note: 'compatibilty test' } }}
    expect(response.call.created_by.custom.note).toBe('compatibilty test');
    expect(response.call.created_by.name).toBe(
      'Test User for user API compatibily',
    );
  });
});
