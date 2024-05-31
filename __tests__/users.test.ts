import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { UserRequest } from '../src/gen/chat';

describe('user API', () => {
  let client: StreamClient;
  const userId = 'streamnodetest' + uuidv4();
  const newUser: UserRequest = {
    id: userId,
    role: 'user',
    custom: {
      color: 'red',
    },
    name: userId,
    image: ':)',
  };
  const user = {
    id: 'stream-node-test-user',
    role: 'admin',
  };

  beforeAll(async () => {
    client = createTestClient();
    await client.upsertUsers({
      users: {
        [user.id]: { ...user },
      },
    });
  });

  it('query users', async () => {
    let response = await client.queryUsers({
      sort: [{ field: 'name', direction: 1 }],
      filter_conditions: {},
    });

    expect(response.users).toBeDefined();

    response = await client.queryUsers({
      sort: [{ field: 'name', direction: 1 }],
      filter_conditions: {
        id: { $eq: 'zitaszuperagetstreamio' },
      },
    });

    expect(response.users.length).toBe(1);
  });

  it('create', async () => {
    const response = await client.upsertUsers({
      users: {
        [newUser.id]: {
          ...newUser,
        },
      },
    });

    const createdUser = response.users[newUser.id];

    expect(createdUser.id).toBe(newUser.id);
    expect(createdUser.role).toBe(newUser.role);
    expect(createdUser.custom.color).toBe('red');

    const queryResponse = await client.queryUsers({
      sort: [],
      filter_conditions: {
        id: { $eq: newUser.id },
      },
    });

    expect(queryResponse.users.length).toBe(1);
    expect(queryResponse.users[0].custom.color).toBe('red');
    expect(queryResponse.users[0].id).toBe(newUser.id);
    expect(queryResponse.users[0].name).toBe(newUser.name);
    expect(queryResponse.users[0].image).toBe(newUser.image);
  });

  it('create guest', async () => {
    await client.updateAppSettings({ multi_tenant_enabled: false });

    const guest: UserRequest = {
      id: uuidv4(),
      custom: {
        color: 'red',
      },
    };

    const response = await client.createGuest({ user: guest });

    expect(response.user?.role).toBe('guest');
    expect(response.user?.custom.color).toBe('red');

    await client.updateAppSettings({ multi_tenant_enabled: true });
  });

  it('ban and unban', async () => {
    await client.banUser({
      target_user_id: newUser.id,
      user_id: user.id,
    });

    let queryResponse = await client.queryBannedUsers({
      filter_conditions: {},
    });

    expect(
      queryResponse.bans.find((b) => b.user?.id === newUser.id),
    ).toBeDefined();

    await client.unbanUser({
      targetUserId: newUser.id,
      id: user.id,
    });

    queryResponse = await client.queryBannedUsers({
      filter_conditions: {},
    });

    expect(
      queryResponse.bans.find((b) => b.user?.id === newUser.id),
    ).toBeUndefined();
  });

  it('mute and unmute', async () => {
    const muteResponse = await client.muteUser({
      target_ids: [newUser.id],
      user_id: user.id,
    });

    expect(muteResponse.mute?.target?.id).toBe(newUser.id);

    const unmuteResponse = await client.unmuteUser({
      target_id: newUser.id,
      target_ids: [],
      user_id: user.id,
    });

    expect(unmuteResponse).toBeDefined();
  });

  it('send custom event', async () => {
    const response = await client.sendCustomEventToUser(newUser.id, {
      type: 'my-custom-event',
    });

    expect(response).toBeDefined();
  });

  it('update', async () => {
    const response = await client.updateUsersPartial({
      users: [
        {
          id: newUser.id,
          set: {
            role: 'admin',
            custom: {
              color: 'blue',
            },
          },
          unset: ['name'],
        },
      ],
    });

    const userResponse = response.users[newUser.id];

    expect(userResponse.name).toBeFalsy();
    expect(userResponse.role).toBe('admin');
    expect(userResponse.custom.color).toBe('blue');
  });

  it('deactivate and reactivate', async () => {
    const deactivateResponse = await client.deactivateUser({
      user_id: newUser.id,
    });

    expect(deactivateResponse.user?.id).toBe(newUser.id);

    const reactivateResponse = await client.reactivateUsers({
      user_ids: [newUser.id],
    });

    expect(reactivateResponse.task_id).toBeDefined();

    const response = await client.getTaskStatus({
      id: reactivateResponse.task_id,
    });

    expect(response.status).toBeDefined();
  });

  it('restore', async () => {
    await expect(() =>
      client.restoreUsers({ user_ids: [newUser.id] }),
    ).rejects.toThrowError(
      `Stream error code 4: RestoreUsers failed with error: "user "${newUser.id}" is not deleted, it can't be restored"`,
    );
  });

  it('delete', async () => {
    const response = await client.deleteUsers({ user_ids: [newUser.id] });

    expect(response).toBeDefined();
  });
});
