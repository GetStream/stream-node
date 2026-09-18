import { beforeAll, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { UserRequest } from '../src/gen/models';

// The generator is run with response_dates_as_number=true, so every date the
// server sends arrives as the unix-nanosecond number the API puts on the wire.
// Convert to milliseconds to compare against a JS Date.
const toMillis = (nanos: number) => Math.floor(nanos / 1_000_000);

describe('dates on responses', () => {
  let client: StreamClient;
  const user = {
    id: 'stream-node-test-user',
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

  it('call + members', async () => {
    const id = randomUUID();
    const call = client.video.call('default', id);
    const startsAt = new Date();
    const response = await call.create({
      data: {
        created_by: user,
        starts_at: startsAt,
        members: [{ user_id: 'jack' }],
      },
    });
    const now = Date.now();
    const oneMin = 60 * 1000;

    const createdAt = response.call.created_at;

    expect(typeof createdAt).toBe('number');
    expect(now - toMillis(createdAt)).toBeLessThan(oneMin);

    expect(typeof response.call.starts_at).toBe('number');
    expect(startsAt.getTime()).toEqual(toMillis(response.call.starts_at!));

    expect(response.call.ended_at).toBeNull();

    expect(response.members.length).toBeGreaterThan(0);

    response.members.forEach((m) => {
      expect(typeof m.created_at).toBe('number');
    });

    const queryResult = await client.video.queryCalls({
      filter_conditions: {
        starts_at: { $lte: startsAt.toISOString() },
      },
    });

    expect(queryResult.calls.find((c) => c.call.id === id)).toBeDefined();

    await call.delete();
  });

  it('channel + members', async () => {
    const id = randomUUID();
    const channel = client.chat.channel('messaging', id);
    const response = await channel.getOrCreate({
      data: {
        created_by_id: user.id,
        members: [{ user_id: 'jack' }],
      },
    });
    const now = Date.now();
    const oneMin = 60 * 1000;

    const createdAt = response.channel!.created_at;

    expect(typeof createdAt).toBe('number');
    expect(now - toMillis(createdAt)).toBeLessThan(oneMin);

    expect(response.channel!.deleted_at).toBeUndefined();

    expect(response.members.length).toBeGreaterThan(0);

    response.members.forEach((m) => {
      expect(typeof m.created_at).toBe('number');
    });

    const queryResult = await client.chat.queryChannels({
      filter_conditions: {
        created_at: { $lte: new Date(toMillis(createdAt)).toISOString() },
      },
      limit: 10,
    });

    queryResult.channels.forEach((c) => {
      expect(c.channel!.created_at).toBeLessThanOrEqual(createdAt);
    });

    await channel.delete();
  });

  it('users', async () => {
    const newUser: UserRequest = {
      id: randomUUID(),
      name: 'streamnodetest' + randomUUID(),
      custom: {
        created_at: new Date(),
      },
    };

    const response = await client.upsertUsers([newUser]);

    expect(typeof response.users[newUser.id].created_at).toBe('number');

    expect(
      typeof response.users[newUser.id].custom.created_at === 'string',
    ).toBe(true);
  });
});
