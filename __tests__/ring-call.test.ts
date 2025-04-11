import { beforeAll, describe, expect, it } from 'vitest';
import { createTestClient } from './create-test-client';
import { StreamCall } from '../src/StreamCall';
import { StreamClient } from '../src/StreamClient';

describe('ring call API', () => {
  let client: StreamClient;
  const callId = `call${crypto.randomUUID()}`;
  let call: StreamCall;

  beforeAll(async () => {
    client = createTestClient();

    call = client.video.call('default', callId);

    await client.upsertUsers([
      { id: 'myself' },
      { id: 'my-friend' },
      { id: 'my-other-friend' },
    ]);
  });

  it(`create call without ringing`, async () => {
    const response = await call.getOrCreate({
      ring: false, // set to false to avoid ringing the whole call
      data: {
        created_by_id: 'myself',
        members: [{ user_id: 'myself' }, { user_id: 'my-friend' }],
      },
    });

    // Dummy expect
    expect(response.call.id).toBe(callId);
  });

  it(`ring my-friend`, async () => {
    const response = await call.ring({ member_ids: ['my-friend'] });

    // Dummy expect
    expect(response.call.id).toBe(callId);
  });

  it(`ring my-other-friend`, async () => {
    await call.updateCallMembers({
      update_members: [{ user_id: 'my-other-friend' }],
    });
    const response = await call.ring({ member_ids: ['my-other-friend'] });

    // Dummy expect
    expect(response.call.id).toBe(callId);
  });

  it('delete call', async () => {
    try {
      await call.delete({ hard: true });
    } catch (e) {
      // the first request fails on backend sometimes
      // retry it
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });

      await call.delete({ hard: true });
    }
  });
});
