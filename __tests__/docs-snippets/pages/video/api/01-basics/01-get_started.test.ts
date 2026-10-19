import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { UserRequest } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'video/api/01-basics/01-get_started.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  const jackId = uniqueId('jack');
  const saraId = uniqueId('sara');
  const emilyId = uniqueId('emily');
  const firstCallId = uniqueId('my-first-call');
  const secondCallId = uniqueId('my-second-call');
  const callType = 'default';

  beforeAll(async () => {
    cleanup.users.push(johnId, jackId, saraId, emilyId);
    cleanup.calls.push(
      `${callType}:${firstCallId}`,
      `${callType}:${secondCallId}`,
    );
    await client.upsertUsers([
      { id: johnId },
      { id: jackId },
      { id: saraId },
      { id: emilyId },
    ]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a user and a user token', async () => {
    const generateUserToken = vi.spyOn(client, 'generateUserToken');

    // #region snippet docs="video/api/01-basics/01-get_started.md" heading="Creating users and user tokens" tab="Node.js" index=1
    // COPY: johnId="john"
    const userId = johnId;
    const newUser: UserRequest = {
      id: userId,
      role: 'user',
      custom: {
        color: 'red',
      },
      name: 'John',
      image: 'link/to/profile/image',
    };
    await client.upsertUsers([newUser]);

    // validity is optional (by default the token is valid for an hour)
    const validity = 60 * 60;

    client.generateUserToken({
      user_id: userId,
      validity_in_seconds: validity,
    });
    // #endregion snippet

    const { users } = await client.queryUsers({
      payload: { filter_conditions: { id: johnId } },
    });
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({
      id: johnId,
      role: 'user',
      name: 'John',
      image: 'link/to/profile/image',
      custom: { color: 'red' },
    });

    const token = generateUserToken.mock.results[0].value as string;
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString(),
    ) as { user_id: string; iat: number; exp: number };
    expect(payload.user_id).toBe(johnId);
    expect(payload.exp - payload.iat).toBe(60 * 60);
  });

  it('creates a call', async () => {
    const getOrCreate = vi.spyOn(client.video, 'getOrCreateCall');

    // #region snippet docs="video/api/01-basics/01-get_started.md" heading="Creating a call" tab="Node.js" index=1
    // COPY: firstCallId="my-first-call", secondCallId="my-second-call", johnId="john", jackId="jack"
    const callType = 'default';
    const callId = firstCallId;
    const call = client.video.call(callType, callId);

    await call.create({ data: { created_by_id: johnId } });

    // optionally provide additional data
    const callWithMembers = client.video.call(callType, secondCallId);
    await callWithMembers.create({
      data: {
        created_by_id: johnId,
        // Call members need to be existing users
        members: [{ user_id: johnId, role: 'admin' }, { user_id: jackId }],
        custom: {
          color: 'blue',
        },
      },
    });

    // Upsert behavior
    await call.getOrCreate({ data: { created_by_id: johnId } });
    // #endregion snippet

    expect(getOrCreate).toHaveBeenCalledTimes(3);
    const responses = await Promise.all(
      getOrCreate.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.getOrCreateCall>,
      ),
    );
    const [created, createdWithMembers, upserted] = responses;
    expect(created.created).toBe(true);
    expect(created.call.cid).toBe(`default:${firstCallId}`);
    expect(created.call.created_by.id).toBe(johnId);

    expect(createdWithMembers.created).toBe(true);
    expect(createdWithMembers.call.cid).toBe(`default:${secondCallId}`);
    expect(createdWithMembers.call.custom).toEqual({ color: 'blue' });
    const roles = Object.fromEntries(
      createdWithMembers.members.map((m) => [m.user_id, m.role]),
    );
    expect(Object.keys(roles).sort()).toEqual([johnId, jackId].sort());
    expect(roles[johnId]).toBe('admin');

    // getOrCreate on the existing call returns it unchanged
    expect(upserted.created).toBe(false);
    expect(upserted.call.cid).toBe(`default:${firstCallId}`);
  });

  it('adds and updates call members', async () => {
    const call = client.video.call(callType, firstCallId);

    // #region snippet docs="video/api/01-basics/01-get_started.md" heading="Call members" tab="Node.js" index=1
    // COPY: saraId="sara", emilyId="emily"
    // Call members need to be existing users
    await call.updateCallMembers({
      // You can add new members
      // You can also update the role of existing members
      update_members: [
        { user_id: saraId },
        { user_id: emilyId, role: 'admin' },
      ],
    });
    // #endregion snippet

    const { members } = await call.queryMembers();
    const roles = Object.fromEntries(members.map((m) => [m.user_id, m.role]));
    expect(roles[saraId]).toBe('user');
    expect(roles[emilyId]).toBe('admin');
  });

  it('removes call members', async () => {
    const call = client.video.call(callType, firstCallId);

    // #region snippet docs="video/api/01-basics/01-get_started.md" heading="Call members" tab="Node.js" index=2
    // COPY: saraId="sara"
    await call.updateCallMembers({
      remove_members: [saraId],
    });
    // #endregion snippet

    const { members } = await call.queryMembers();
    const ids = members.map((m) => m.user_id);
    expect(ids).not.toContain(saraId);
    expect(ids).toContain(emilyId);
  });

  it('updates the call settings and custom data', async () => {
    const call = client.video.call(callType, firstCallId);
    const update = vi.spyOn(client.video, 'updateCall');

    // #region snippet docs="video/api/01-basics/01-get_started.md" heading="Updating a call" tab="Node.js" index=1
    await call.update({
      settings_override: {
        audio: { mic_default_on: true, default_device: 'speaker' },
      },
    });

    // or to update custom data
    await call.update({ custom: { color: 'red' } });
    // #endregion snippet

    const [settingsResponse, customResponse] = await Promise.all(
      update.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.updateCall>,
      ),
    );
    expect(settingsResponse.call.settings.audio).toMatchObject({
      mic_default_on: true,
      default_device: 'speaker',
    });
    expect(customResponse.call.custom).toEqual({ color: 'red' });

    const { call: stored } = await call.get();
    expect(stored.settings.audio.mic_default_on).toBe(true);
    expect(stored.custom).toEqual({ color: 'red' });
  });
});
