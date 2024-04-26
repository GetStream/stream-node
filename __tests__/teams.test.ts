import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { UserObjectRequest } from '../src/gen/chat';
import { StreamCall } from '../src/StreamCall';

describe('teams', () => {
  let client: StreamClient;
  const userId = 'streamnodetest' + uuidv4();
  const newUser: UserObjectRequest = {
    id: userId,
    role: 'user',
    custom: {
      color: 'red',
    },
    name: userId,
    image: ':)',
    teams: ['red', 'blue'],
  };
  const user = {
    id: 'stream-node-test-user',
    role: 'admin',
  };
  const callId = `call${uuidv4()}`;
  let call: StreamCall;

  beforeAll(async () => {
    client = createTestClient();
    await client.upsertUsers({
      users: {
        [user.id]: { ...user },
      },
    });
    call = client.video.call('default', callId);
  });

  it('create user with team', async () => {
    const response = await client.upsertUsers({
      users: {
        [newUser.id]: {
          ...newUser,
        },
      },
    });

    const createdUser = response.users[newUser.id];

    expect(createdUser.teams).toEqual(['red', 'blue']);

    const queryResponse = await client.queryUsers({
      sort: [],
      filter_conditions: {
        id: { $eq: newUser.id },
      },
    });

    expect(queryResponse.users.find((u) => u.id === newUser.id)?.teams).toEqual(
      ['red', 'blue'],
    );
  });

  it('search users with teams', async () => {
    let response = await client.queryUsers({
      filter_conditions: {
        name: userId,
        teams: { $in: ['blue', 'green'] },
      },
    });

    expect(response.users[0].id).toBe(userId);

    response = await client.queryUsers({
      filter_conditions: {
        name: userId,
        teams: null,
      },
    });

    expect(response.users.length).toBe(0);
  });

  it('create call with teams', async () => {
    const response = await call.create({
      data: { team: 'red', created_by_id: user.id },
    });

    expect(response.call.team).toBe('red');
  });

  it('query calls', async () => {
    let response = await client.video.queryCalls();

    expect(response.calls.length).toBeGreaterThan(0);

    // TODO: backend issue
    // response = await client.video.queryCalls({
    //   filter_conditions: {
    //     team: null,
    //   },
    // });

    response = await client.video.queryCalls({
      filter_conditions: {
        team: 'red',
      },
    });

    expect(response.calls.find((c) => c.call.id === callId)).toBeDefined();
  });
});
