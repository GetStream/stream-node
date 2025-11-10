import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { UserRequest } from '../src/gen/models';

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
    await client.upsertUsers([user]);
  });

  it('query users', async () => {
    let response = await client.queryUsers({
      payload: {
        sort: [{ field: 'name', direction: 1 }],
        filter_conditions: {},
      },
    });

    expect(response.users).toBeDefined();

    response = await client.queryUsers({
      payload: {
        sort: [{ field: 'name', direction: 1 }],
        filter_conditions: {
          id: { $eq: user.id },
        },
      },
    });

    expect(response.users.length).toBe(1);
  });

  it('create', async () => {
    const response = await client.upsertUsers([newUser]);

    const createdUser = response.users[newUser.id];

    expect(createdUser.id).toBe(newUser.id);
    expect(createdUser.role).toBe(newUser.role);
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.image).toBe(newUser.image);
    expect(createdUser.custom.color).toBe('red');

    const queryResponse = await client.queryUsers({
      payload: {
        sort: [],
        filter_conditions: {
          id: { $eq: newUser.id },
        },
      },
    });

    expect(queryResponse.users.length).toBe(1);
    expect(queryResponse.users[0].custom.color).toBe('red');
    expect(queryResponse.users[0].id).toBe(newUser.id);
    expect(queryResponse.users[0].name).toBe(newUser.name);
    expect(queryResponse.users[0].image).toBe(newUser.image);
  });

  it('create guest', async () => {
    await client.updateApp({ multi_tenant_enabled: false });

    const guest: UserRequest = {
      id: uuidv4(),
      name: 'Guest 3',
      image: ': )',
      custom: {
        color: 'red',
      },
    };

    const response = await client.createGuest({ user: guest });

    expect(response.user?.role).toBe('guest');
    expect(response.user?.custom.color).toBe('red');
    expect(response.user?.name).toBe('Guest 3');
    expect(response.user?.image).toBe(': )');

    await client.updateApp({ multi_tenant_enabled: true });
  });

  it('ban and unban', async () => {
    await client.moderation.ban({
      target_user_id: newUser.id,
      banned_by_id: user.id,
    });

    let queryResponse = await client.queryBannedUsers({
      payload: { filter_conditions: {} },
    });

    expect(
      queryResponse.bans.find((b) => b.user?.id === newUser.id),
    ).toBeDefined();

    await client.moderation.unban({
      target_user_id: newUser.id,
      created_by: user.id,
    });

    queryResponse = await client.queryBannedUsers({
      payload: { filter_conditions: {} },
    });

    expect(
      queryResponse.bans.find((b) => b.user?.id === newUser.id),
    ).toBeUndefined();
  });

  it('mute and unmute', async () => {
    const muteResponse = await client.moderation.mute({
      target_ids: [newUser.id],
      user_id: user.id,
      timeout: 5,
    });

    expect(muteResponse.mutes?.[0]?.target?.id).toBe(newUser.id);

    const unmuteResponse = await client.moderation.unmute({
      target_ids: [newUser.id],
      user_id: user.id,
    });

    expect(unmuteResponse).toBeDefined();
  });

  it('block and unblock', async () => {
    const badUser: UserRequest = {
      id: 'bad-alice',
      name: 'Alice',
    };
    await client.upsertUsers([badUser]);

    const blockResponse = await client.blockUsers({
      blocked_user_id: badUser.id,
      user_id: user.id,
    });

    expect(blockResponse.blocked_user_id).toBe(badUser.id);

    const blockedUsers = await client.getBlockedUsers({ user_id: user.id });

    expect(
      blockedUsers.blocks.find((b) => b.blocked_user_id === badUser.id),
    ).toBeDefined();

    const unblockResponse = await client.unblockUsers({
      blocked_user_id: badUser.id,
      user_id: user.id,
    });

    expect(unblockResponse.duration).toBeDefined();
  });

  it('send custom event', async () => {
    const response = await client.chat.sendUserCustomEvent({
      user_id: newUser.id,
      event: { type: 'my-custom-event' },
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
    // TODO: backend issue
    // expect(userResponse.custom.color).toBe('blue');
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

    const response = await client.getTask({ id: reactivateResponse.task_id });

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
