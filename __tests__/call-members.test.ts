import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamCall } from '../src/StreamCall';
import { StreamClient } from '../src/StreamClient';
import { VideoOwnCapability } from '../src/gen/video';

describe('call members API', () => {
  let client: StreamClient;
  const callId = `call${uuidv4()}`;
  let call: StreamCall;

  beforeAll(async () => {
    client = createTestClient();

    call = client.video.call('default', callId);

    await client.upsertUsers({
      users: {
        john: { name: 'John', id: 'john' },
        jack: { name: 'Jack', id: 'jack' },
        jane: { name: 'Jane', id: 'jane' },
        sara: { name: 'Sara', id: 'sara' },
      },
    });
  });

  it('create with members', async () => {
    const response = await call.getOrCreate({
      data: {
        created_by_id: 'john',
        members: [{ user_id: 'john', role: 'admin' }, { user_id: 'jack' }],
      },
    });

    expect(response.members[0].user_id).toBe('jack');
    expect(response.members[1].user_id).toBe('john');
    expect(response.members[1].role).toBe('admin');
  });

  it('add or update members', async () => {
    const response = await call.updateCallMembers({
      update_members: [
        { user_id: 'sara' },
        { user_id: 'jane', role: 'admin' },
        { user_id: 'john', role: 'user' },
      ],
    });

    expect(response.members[0].user_id).toBe('sara');
    expect(response.members[1].user_id).toBe('jane');
    expect(response.members[1].role).toBe('admin');
    expect(response.members[2].user_id).toBe('john');
    expect(response.members[2].role).toBe('user');
  });

  it('query calls - filter by call members', async () => {
    const response = await client.video.queryCalls({
      filter_conditions: {
        members: { $in: ['sara'] },
      },
    });

    expect(response.calls.length).toBeGreaterThanOrEqual(1);
  });

  it('block and unblock users', async () => {
    const response = await call.blockUser({ user_id: 'sara' });

    expect(response).toBeDefined();

    const unblockResponse = await call.unblockUser({ user_id: 'sara' });

    expect(unblockResponse).toBeDefined();
  });

  // backend issue
  // it("mute one or many users", async () => {
  //   const muteAllResponse = await call.muteUsers({
  //     mute_all_users: true,
  //     audio: true,
  //   });

  //   expect(muteAllResponse).toBeDefined();

  //   const muteUserResponse = await call.muteUsers({
  //     user_ids: ["sara"],
  //     audio: true,
  //     video: true,
  //     screenshare: true,
  //     screenshare_audio: true,
  //   });

  //   expect(muteUserResponse).toBeDefined();
  // });

  it('grant and revoke permissions', async () => {
    const revokeResponse = await call.updateUserPermissions({
      user_id: 'sara',
      revoke_permissions: [VideoOwnCapability.SEND_AUDIO],
    });

    expect(revokeResponse).toBeDefined();

    const grantResponse = await call.updateUserPermissions({
      user_id: 'sara',
      grant_permissions: [VideoOwnCapability.SEND_AUDIO],
    });

    expect(grantResponse).toBeDefined();
  });

  it('remove members', async () => {
    const response = await call.updateCallMembers({
      remove_members: ['sara'],
    });

    expect(response.duration).toBeDefined();
  });

  it('query members', async () => {
    let response = await call.queryMembers();

    let members = response.members;
    expect(members.length).toBe(3);

    const queryMembersReq = {
      sort: [{ field: 'user_id', direction: 1 }],
      limit: 2,
    };
    response = await call.queryMembers(queryMembersReq);

    members = response.members;
    expect(members.length).toBe(2);
    expect(members[0].user_id).toBe('jack');
    expect(members[1].user_id).toBe('jane');

    response = await call.queryMembers({
      ...queryMembersReq,
      next: response.next,
    });

    expect(response.members.length).toBe(1);

    response = await call.queryMembers({
      filter_conditions: { role: { $eq: 'admin' } },
    });
    members = response.members;

    expect(members.length).toBe(1);
    members.forEach((m) => expect(m.role).toBe('admin'));
  });
});
