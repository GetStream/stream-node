import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { UserRequest } from '../src/gen/models';

describe('Date conversion', () => {
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
    const id = uuidv4();
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

    expect(createdAt instanceof Date).toBe(true);
    expect(now - createdAt.getTime()).toBeLessThan(oneMin);

    expect(response.call.starts_at instanceof Date).toBe(true);
    expect(startsAt.getTime()).toEqual(response.call.starts_at?.getTime());

    expect(response.call.ended_at).toBeNull();

    expect(response.members.length).toBeGreaterThan(0);

    response.members.forEach((m) => {
      expect(m.created_at instanceof Date).toBe(true);
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
    const id = uuidv4();
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

    expect(createdAt instanceof Date).toBe(true);
    expect(now - createdAt.getTime()).toBeLessThan(oneMin);

    expect(response.channel!.deleted_at).toBeUndefined();

    expect(response.members.length).toBeGreaterThan(0);

    response.members.forEach((m) => {
      expect(m.created_at instanceof Date).toBe(true);
    });

    const queryResult = await client.chat.queryChannels({
      filter_conditions: {
        created_at: { $lte: createdAt.toISOString() },
      },
      limit: 10,
    });

    queryResult.channels.forEach((c) => {
      expect(c.channel!.created_at.getTime()).toBeLessThanOrEqual(
        createdAt.getTime(),
      );
    });

    await channel.delete();
  });

  it('users', async () => {
    const newUser: UserRequest = {
      id: uuidv4(),
      custom: {
        created_at: new Date(),
      },
    };

    const response = await client.upsertUsers([newUser]);

    expect(response.users[newUser.id].created_at instanceof Date).toBe(true);

    expect(
      typeof response.users[newUser.id].custom.created_at === 'string',
    ).toBe(true);

    await client.deleteUsers({ user_ids: [newUser.id] });
  });
});
