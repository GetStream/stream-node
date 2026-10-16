import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  DeactivateUserResponse,
  ReactivateUsersResponse,
  UpdateAppRequest,
  UserResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  getServerUser,
  sendServerMessage,
  waitForAppSetting,
} from '../../../helpers/server';
import { retry, waitForTask } from '../../../helpers/wait';

const DOCS = 'platform/02-identity-and-access/02-users.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  /** Looks a user up by id, deactivated or not (undefined when the API returns none). */
  const findUser = async (id: string): Promise<UserResponse | undefined> => {
    const { users } = await client.queryUsers({
      payload: {
        filter_conditions: { id },
        include_deactivated_users: true,
      },
    });
    return users[0];
  };

  /** Creates `ids` as plain users and registers them for cleanup. */
  const createUsers = async (...ids: string[]) => {
    await client.upsertUsers(ids.map((id) => ({ id })));
    cleanup.users.push(...ids);
  };

  /** Opens a WebSocket connection as `userId` (like a client SDK) until the API answers. */
  const connectAs = async (userId: string) => {
    const json = JSON.stringify({
      user_id: userId,
      user_details: { id: userId },
      server_determines_connection_id: true,
    });
    const params = new URLSearchParams({
      json,
      api_key: process.env.STREAM_API_KEY ?? '',
      authorization: client.generateUserToken({ user_id: userId }),
      'stream-auth-type': 'jwt',
    });
    const ws = new WebSocket(
      `wss://chat.stream-io-api.com/connect?${params.toString()}`,
    );
    try {
      const first = await new Promise<string>((resolve, reject) => {
        ws.onmessage = (event) => resolve(String(event.data));
        ws.onerror = () => reject(new Error('WebSocket error'));
      });
      expect(first).toContain('connection_id');
    } finally {
      ws.close();
    }
  };
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a user with upsertUsers', async () => {
    const userID = uniqueId('user');
    cleanup.users.push(userID);

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Creating users" tab="Node.js" index=1
    const updateResponse = await client.upsertUsers([
      {
        id: userID,
        role: 'admin',
        custom: { book: 'dune' },
      },
    ]);
    // #endregion snippet

    expect(updateResponse.users[userID]).toMatchObject({
      id: userID,
      role: 'admin',
      custom: { book: 'dune' },
    });
    expect(await getServerUser(client, userID)).toMatchObject({
      role: 'admin',
      custom: { book: 'dune' },
    });
  });

  it('creates users in bulk with upsertUsers', async () => {
    const userID1 = uniqueId('user1');
    const userID2 = uniqueId('user2');
    const userID3 = uniqueId('user3');
    cleanup.users.push(userID1, userID2, userID3);

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Creating users" tab="Node.js" index=2
    const updateResponse = await client.upsertUsers([
      { id: userID1, role: 'admin', custom: { book: 'dune' } },
      { id: userID2, role: 'user', custom: { book: '1984' } },
      { id: userID3, role: 'admin', custom: { book: 'Fahrenheit 451' } },
    ]);
    // each user object is updated accordingly
    // #endregion snippet

    expect(updateResponse.users[userID1]).toMatchObject({
      role: 'admin',
      custom: { book: 'dune' },
    });
    expect(updateResponse.users[userID2]).toMatchObject({
      role: 'user',
      custom: { book: '1984' },
    });
    expect(updateResponse.users[userID3]).toMatchObject({
      role: 'admin',
      custom: { book: 'Fahrenheit 451' },
    });
  });

  it('updates users partially with set and unset', async () => {
    const partialUser = uniqueId('partial1');
    const partialUser2 = uniqueId('partial2');
    await client.upsertUsers([
      {
        id: partialUser,
        custom: {
          field: { kept: 'old' },
          field2: { unset: 'gone', kept: 'yes' },
          other: 'kept',
        },
      },
      { id: partialUser2, custom: { field: { value: 'gone', kept: 'yes' } } },
    ]);
    cleanup.users.push(partialUser, partialUser2);
    const updateUsersPartial = vi.spyOn(client, 'updateUsersPartial');

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Partial updates" tab="Node.js" index=1
    // COPY: partialUser="userID", partialUser2="userID2"
    // partial update for a single user setting and unsetting multiple fields
    const update = {
      id: partialUser,
      set: {
        role: 'admin',
        field: {
          text: 'value',
        },
        'field2.subfield': 'test',
      },
      unset: ['field2.unset'],
    };

    const response = await client.updateUsersPartial({ users: [update] });

    // partial update for multiple users
    const updates = [
      {
        id: partialUser,
        set: {
          field: 'value',
        },
      },
      {
        id: partialUser2,
        unset: ['field.value'],
      },
    ];

    const response2 = await client.updateUsersPartial({ users: updates });
    // #endregion snippet

    expect(updateUsersPartial).toHaveBeenCalledTimes(2);
    // The first update sets role and custom fields.
    // The first update sets role and custom fields (a nested object replaces `field`, a
    // dotted path sets one subfield) and unsets a nested field.
    expect(response.users[partialUser].role).toBe('admin');
    expect(response.users[partialUser].custom).toEqual({
      field: { text: 'value' },
      field2: { subfield: 'test', kept: 'yes' },
      other: 'kept',
    });
    // The second one replaces `field` of the first user and unsets a nested field of
    // the second one.
    expect(response2.users[partialUser].custom).toEqual({
      field: 'value',
      field2: { subfield: 'test', kept: 'yes' },
      other: 'kept',
    });
    expect(response2.users[partialUser2].custom).toEqual({
      field: { kept: 'yes' },
    });
  });

  it('enforces unique usernames on app and team level', async () => {
    const { app } = await client.getApp();
    const original = app.enforce_unique_usernames;
    const restore = async () => {
      await client.updateApp({
        enforce_unique_usernames:
          original as UpdateAppRequest['enforce_unique_usernames'],
      });
      await waitForAppSetting(client, 'enforce_unique_usernames', original);
    };
    cleanup.add(restore);
    // Users with the same normalized name: the second one only fails while the
    // check is on.
    const name = uniqueId('unique-name');
    const first = uniqueId('unique1');
    const second = uniqueId('unique2');
    cleanup.users.push(first, second);
    await client.upsertUsers([{ id: first, name }]);
    const upsertDuplicate = () =>
      client.upsertUsers([{ id: second, name: name.toUpperCase() }]).then(
        () => undefined,
        (error: unknown) => error,
      );

    // After the app-level call, wait until a duplicate name is rejected.
    const original_updateApp = client.updateApp.bind(client);
    let appLevelError: unknown;
    const updateApp = vi
      .spyOn(client, 'updateApp')
      .mockImplementation(async (request?: UpdateAppRequest) => {
        const result = await original_updateApp(request);
        if (request?.enforce_unique_usernames === 'app') {
          await waitForAppSetting(client, 'enforce_unique_usernames', 'app', {
            agreeing: 5,
          });
          appLevelError = await retry(async () => {
            const error = await upsertDuplicate();
            if (error === undefined) throw new Error('duplicate accepted');
            return error;
          });
        }
        return result;
      });

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Unique usernames" tab="Node.js" index=1
    // Enable uniqueness constraints on App level
    await client.updateApp({
      enforce_unique_usernames: 'app',
    });

    // Enable uniqueness constraints on Team level
    await client.updateApp({
      enforce_unique_usernames: 'team',
    });
    // #endregion snippet

    expect(
      updateApp.mock.calls.map(
        ([request]) => request?.enforce_unique_usernames,
      ),
    ).toEqual(['app', 'team']);
    expect(appLevelError).toMatchObject({ code: 6 });
    expect(String(appLevelError)).toContain('already exist');
    await waitForAppSetting(client, 'enforce_unique_usernames', 'team', {
      agreeing: 5,
    });
    // On team level the check is per team: users without a team (this app has no
    // multi-tenancy) can share a name.
    await retry(async () => {
      expect(await upsertDuplicate()).toBeUndefined();
    });

    // Restore it now: with the check on, reactivateUser with restore_messages fails
    // (see the deactivation test below).
    await restore();
  });

  it('creates a guest user', async () => {
    const guestId = uniqueId('tommaso');

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Guest users" tab="Node.js" index=1
    // COPY: guestId="tommaso"
    const response = await client.createGuest({
      user: { id: guestId, name: 'Tommaso' },
    });
    // Return response.user and response.access_token to your client
    // #endregion snippet

    // The API prefixes the id: `guest-<uuid>-<id>`.
    cleanup.users.push(response.user.id);
    expect(response.user).toMatchObject({ name: 'Tommaso', role: 'guest' });
    expect(response.user.id).toMatch(new RegExp(`^guest-.+-${guestId}$`));
    const claims = JSON.parse(
      Buffer.from(response.access_token.split('.')[1], 'base64url').toString(),
    ) as { user_id?: string };
    expect(claims.user_id).toBe(response.user.id);
  });

  it('queries users by role, sorted by creation date', async () => {
    const adminId = uniqueId('admin');
    await client.upsertUsers([{ id: adminId, role: 'admin' }]);
    cleanup.users.push(adminId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Querying users" tab="Node.js" index=1
    const response = await client.queryUsers({
      payload: {
        filter_conditions: {
          role: 'admin',
        },
        sort: [{ field: 'created_at', direction: -1 }],
        limit: 10,
        offset: 0,
      },
    });

    console.log(response.users);
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(response.users);
    expect(response.users.length).toBeGreaterThan(0);
    expect(response.users.length).toBeLessThanOrEqual(10);
    expect(response.users.every((u) => u.role === 'admin')).toBe(true);
    const created = response.users.map((u) => u.created_at.getTime());
    expect(created).toEqual([...created].sort((a, b) => b - a));
    // The newest admin is the one created just now.
    expect(response.users.map((u) => u.id)).toContain(adminId);
  });

  it('queries users by custom fields and multiple conditions', async () => {
    const color = uniqueId('red');
    const plan = uniqueId('premium');
    const redUser = uniqueId('red-user');
    const otherColor = uniqueId('blue-user');
    const premiumAdmin = uniqueId('premium-admin');
    const premiumModerator = uniqueId('premium-moderator');
    const premiumUser = uniqueId('premium-user');
    await client.upsertUsers([
      { id: redUser, custom: { color } },
      { id: otherColor, custom: { color: `${color}-not` } },
      { id: premiumAdmin, role: 'admin', custom: { plan } },
      { id: premiumModerator, role: 'moderator', custom: { plan } },
      { id: premiumUser, role: 'user', custom: { plan } },
    ]);
    cleanup.users.push(
      redUser,
      otherColor,
      premiumAdmin,
      premiumModerator,
      premiumUser,
    );

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Filter examples" tab="Node.js" index=1
    // COPY: color="red", plan="premium"
    // Query users by custom field
    const response = await client.queryUsers({
      payload: {
        filter_conditions: {
          'custom.color': color,
        },
      },
    });

    // Query users with multiple conditions
    const response2 = await client.queryUsers({
      payload: {
        filter_conditions: {
          role: { $in: ['admin', 'moderator'] },
          'custom.plan': plan,
        },
      },
    });
    // #endregion snippet

    expect(response.users.map((u) => u.id)).toEqual([redUser]);
    expect(response2.users.map((u) => u.id).sort()).toEqual(
      [premiumAdmin, premiumModerator].sort(),
    );
  });

  it('queries users by name with autocomplete', async () => {
    const autocompleteUser = uniqueId('rory');
    const name = `Ro${autocompleteUser}`;
    await client.upsertUsers([{ id: autocompleteUser, name }]);
    cleanup.users.push(autocompleteUser);
    const prefix = name.slice(0, -2);

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Querying with Autocomplete" tab="Node.js" index=1
    // COPY: prefix="ro"
    const response = await client.queryUsers({
      payload: {
        filter_conditions: {
          name: { $autocomplete: prefix },
        },
      },
    });
    // #endregion snippet

    expect(response.users.map((u) => u.id)).toEqual([autocompleteUser]);
  });

  it('queries users that were never active', async () => {
    const activeUser = uniqueId('active');
    const neverActiveUser = uniqueId('never-active');
    await createUsers(activeUser, neverActiveUser);
    // A WebSocket connection as activeUser sets its last_active (REST calls don't).
    await connectAs(activeUser);
    await retry(async () => {
      expect(
        (await getServerUser(client, activeUser)).last_active,
      ).toBeDefined();
    });

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Querying Inactive Users" tab="Node.js" index=1
    const response = await client.queryUsers({
      payload: {
        filter_conditions: {
          id: { $in: [activeUser, neverActiveUser] },
          last_active: { $exists: false },
        },
      },
    });
    // #endregion snippet

    expect(response.users.map((u) => u.id)).toEqual([neverActiveUser]);
  });

  it('deactivates and reactivates users', async () => {
    const userId = uniqueId('deactivate');
    const bulkUser1 = uniqueId('bulk1');
    const bulkUser2 = uniqueId('bulk2');
    await createUsers(userId, bulkUser1, bulkUser2);
    const deactivateUser = vi.spyOn(client, 'deactivateUser');
    const reactivateUsers = vi.spyOn(client, 'reactivateUsers');

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Deactivating users" tab="Node.js" index=1
    // COPY: userId="<id>", bulkUser1="<id1>", bulkUser2="<id2>"
    await client.deactivateUser({
      user_id: userId,
    });

    // reactivate
    await client.reactivateUsers({
      user_ids: [userId],
    });

    // deactivating users in bulk is performed asynchronously
    const deactivateResponse = await client.deactivateUsers({
      user_ids: [bulkUser1, bulkUser2],
    });
    // #endregion snippet

    const [deactivated] = await Promise.all(
      deactivateUser.mock.results.map(
        (r) => r.value as Promise<DeactivateUserResponse>,
      ),
    );
    expect(deactivated.user?.deactivated_at).toBeInstanceOf(Date);
    // Bulk reactivation is asynchronous too.
    const [reactivated] = await Promise.all(
      reactivateUsers.mock.results.map(
        (r) => r.value as Promise<ReactivateUsersResponse>,
      ),
    );
    await waitForTask(client, reactivated.task_id);
    expect((await findUser(userId))?.deactivated_at).toBeUndefined();
    await waitForTask(client, deactivateResponse.task_id);
    for (const id of [bulkUser1, bulkUser2]) {
      expect((await findUser(id))?.deactivated_at).toBeInstanceOf(Date);
    }
  });

  it('deactivates a user with their messages and reactivates them', async () => {
    const joe = uniqueId('joe');
    const userID = uniqueId('deactivated');
    await createUsers(joe, userID);
    const channelId = uniqueId('channel');
    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({
      data: { created_by_id: userID, members: [{ user_id: userID }] },
    });
    cleanup.channels.push(channel.cid);
    const message = await sendServerMessage(client, channel.cid, {
      text: 'hello',
      user_id: userID,
    });

    // After the deactivation, wait until the message is deleted.
    const original_deactivateUser = client.deactivateUser.bind(client);
    vi.spyOn(client, 'deactivateUser').mockImplementation(async (request) => {
      const result = await original_deactivateUser(request);
      await retry(async () => {
        const { message: stored } = await client.chat.getMessage({
          id: message.id,
        });
        expect(stored.deleted_at).toBeInstanceOf(Date);
      });
      return result;
    });

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Deactivating users" tab="Node.js" index=2
    // COPY: joe="joe"
    const deactivate = await client.deactivateUser({
      user_id: userID,
      mark_messages_deleted: true,
      created_by_id: joe,
    });

    const reactivate = await client.reactivateUser({
      user_id: userID,
      restore_messages: true,
      name: 'I am back',
      created_by_id: joe,
    });
    // #endregion snippet

    expect(deactivate.user).toMatchObject({ id: userID });
    expect(deactivate.user?.deactivated_at).toBeInstanceOf(Date);
    expect(reactivate.user).toMatchObject({ id: userID, name: 'I am back' });
    expect(reactivate.user?.deactivated_at).toBeUndefined();
    await retry(async () => {
      const { message: stored } = await client.chat.getMessage({
        id: message.id,
      });
      expect(stored.deleted_at).toBeUndefined();
      expect(stored.type).toBe('regular');
    });
  });

  it('deletes and restores users', async () => {
    const userId = uniqueId('delete');
    await createUsers(userId);
    // Wait for the delete task and check the user is gone before the restore.
    const original_deleteUsers = client.deleteUsers.bind(client);
    vi.spyOn(client, 'deleteUsers').mockImplementation(async (request) => {
      const result = await original_deleteUsers(request);
      await waitForTask(client, result.task_id);
      expect(await findUser(userId)).toBeUndefined();
      return result;
    });

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Deleting users" tab="Node.js" index=1
    // COPY: userId="<id>"
    await client.deleteUsers({ user_ids: [userId] });

    //restore
    await client.restoreUsers({ user_ids: [userId] });
    // #endregion snippet

    expect(await findUser(userId)).toMatchObject({ id: userId });
    expect((await findUser(userId))?.deleted_at).toBeUndefined();
  });

  it('restores soft-deleted users', async () => {
    const userID1 = uniqueId('restore1');
    const userID2 = uniqueId('restore2');
    await createUsers(userID1, userID2);
    const { task_id } = await client.deleteUsers({
      user_ids: [userID1, userID2],
    });
    await waitForTask(client, task_id);
    expect(await findUser(userID1)).toBeUndefined();
    expect(await findUser(userID2)).toBeUndefined();

    // #region snippet docs="platform/02-identity-and-access/02-users.md" heading="Restoring deleted users" tab="Node.js" index=1
    // COPY: userID1="userID1", userID2="userID2"
    await client.restoreUsers({ user_ids: [userID1, userID2] });
    // #endregion snippet

    for (const id of [userID1, userID2]) {
      const restored = await findUser(id);
      expect(restored).toMatchObject({ id });
      expect(restored?.deleted_at).toBeUndefined();
    }
  });
});
