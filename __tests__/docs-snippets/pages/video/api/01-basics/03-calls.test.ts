import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { OwnCapability } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS = 'video/api/01-basics/03-calls.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  const jackId = uniqueId('jack');
  const saraId = uniqueId('sara');
  const emilyId = uniqueId('emily');
  const myselfId = uniqueId('myself');
  const friendId = uniqueId('friend');
  const pinUserId = uniqueId('pin');
  const unpinUserId = uniqueId('unpin');

  /** A `default` call with a `uniqueId` id, created by john and registered for cleanup. */
  const createCall = async (
    data: Parameters<ReturnType<typeof client.video.call>['create']>[0] = {},
  ) => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.create({
      ...data,
      data: { created_by_id: johnId, ...data.data },
    });
    return call;
  };

  /**
   * A call type with a `uniqueId` name (same grants as `default`), deleted in cleanup.
   * Waits until it can be read, so the snippets can update it.
   */
  const createCallType = async () => {
    const name = uniqueId('call-type');
    await client.video.createCallType({ name });
    // A new call type isn't known to every API node right away ("does not exist").
    const isMissing = (error: unknown) =>
      String(error).includes('does not exist');
    cleanup.add(() =>
      retry(() => client.video.deleteCallType({ name }), {
        retryIf: isMissing,
      }),
    );
    for (let i = 0; i < 5; i++) {
      await retry(() => client.video.getCallType({ name }), {
        retryIf: isMissing,
      });
    }
    return name;
  };

  beforeAll(async () => {
    const ids = [
      johnId,
      jackId,
      saraId,
      emilyId,
      myselfId,
      friendId,
      pinUserId,
      unpinUserId,
    ];
    cleanup.users.push(...ids);
    await client.upsertUsers(ids.map((id) => ({ id })));
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates calls', async () => {
    const firstCallId = uniqueId('my-first-call');
    const secondCallId = uniqueId('my-second-call');
    cleanup.calls.push(`default:${firstCallId}`, `default:${secondCallId}`);
    const getOrCreate = vi.spyOn(client.video, 'getOrCreateCall');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Creating calls" tab="Node.js" index=1
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

    const [created, createdWithMembers, upserted] = await Promise.all(
      getOrCreate.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.getOrCreateCall>,
      ),
    );
    expect(created.created).toBe(true);
    expect(created.call.cid).toBe(`default:${firstCallId}`);
    expect(created.call.created_by.id).toBe(johnId);

    expect(createdWithMembers.created).toBe(true);
    expect(createdWithMembers.call.custom).toEqual({ color: 'blue' });
    const roles = Object.fromEntries(
      createdWithMembers.members.map((m) => [m.user_id, m.role]),
    );
    expect(Object.keys(roles).sort()).toEqual([johnId, jackId].sort());
    expect(roles[johnId]).toBe('admin');

    expect(upserted.created).toBe(false);
    expect(upserted.call.cid).toBe(`default:${firstCallId}`);
  });

  it('creates a ringing call', async () => {
    // #region snippet docs="video/api/01-basics/03-calls.md" heading="`ring` flag" tab="Node.js" index=1
    // COPY: myselfId="myself", friendId="my friend"
    // Make sure to use a unique id when creating ring calls
    const call = client.video.call('default', crypto.randomUUID());
    await call.getOrCreate({
      ring: true,
      video: true, // Set it to `false` for audio calls. This is used to decide what type of incoming call screen is displayed client-side
      data: {
        created_by_id: myselfId,
        members: [{ user_id: myselfId }, { user_id: friendId }],
      },
    });
    // #endregion snippet
    cleanup.calls.push(call.cid);

    const { call: stored, members } = await call.get();
    expect(stored.created_by.id).toBe(myselfId);
    expect(members.map((m) => m.user_id).sort()).toEqual(
      [myselfId, friendId].sort(),
    );
  });

  it('creates a call and notifies the members', async () => {
    const outgoingCallId = uniqueId('test-outgoing-call');
    cleanup.calls.push(`default:${outgoingCallId}`);
    const getOrCreate = vi.spyOn(client.video, 'getOrCreateCall');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="`notify` flag" tab="Node.js" index=1
    // COPY: outgoingCallId="test-outgoing-call", myselfId="myself", friendId="my friend"
    // or call.create
    // or call.get
    await client.video.call('default', outgoingCallId).getOrCreate({
      notify: true,
      data: {
        created_by_id: myselfId,
        members: [{ user_id: myselfId }, { user_id: friendId }],
      },
    });
    // #endregion snippet

    expect(getOrCreate.mock.calls[0][0]).toMatchObject({ notify: true });
    const response = await (getOrCreate.mock.results[0].value as ReturnType<
      typeof client.video.getOrCreateCall
    >);
    expect(response.created).toBe(true);
    expect(response.members.map((m) => m.user_id).sort()).toEqual(
      [myselfId, friendId].sort(),
    );
  });

  it('updates a call', async () => {
    const call = await createCall();
    const update = vi.spyOn(client.video, 'updateCall');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Updating calls" tab="Node.js" index=1
    await call.update({
      settings_override: {
        audio: { mic_default_on: true, default_device: 'speaker' },
      },
    });

    // or to update custom data
    await call.update({ custom: { color: 'red' } });
    // #endregion snippet

    expect(update).toHaveBeenCalledTimes(2);
    const { call: stored } = await call.get();
    expect(stored.settings.audio).toMatchObject({
      mic_default_on: true,
      default_device: 'speaker',
    });
    expect(stored.custom).toEqual({ color: 'red' });
  });

  it('adds and updates call members', async () => {
    const call = await createCall();

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Manage call members" tab="Node.js" index=1
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
    expect(roles).toEqual({ [saraId]: 'user', [emilyId]: 'admin' });

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Manage call members" tab="Node.js" index=2
    // COPY: saraId="sara"
    await call.updateCallMembers({
      remove_members: [saraId],
    });
    // #endregion snippet

    const { members: remaining } = await call.queryMembers();
    expect(remaining.map((m) => m.user_id)).toEqual([emilyId]);
  });

  it('restricts call access to members', async () => {
    const restrictedCallType = await createCallType();
    const before = (await client.video.listCallTypes()).call_types[
      restrictedCallType
    ];
    expect(before.grants['user']).toContain(OwnCapability.JOIN_CALL);

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Restrict call access" tab="Node.js" index=1
    // COPY: restrictedCallType="default"
    const callTypeName = restrictedCallType;

    const callType = (await client.video.listCallTypes()).call_types[
      callTypeName
    ];
    // Remove JOIN_CALL permission from user role
    const userGrants = callType.grants['user'].filter(
      (c) => c !== OwnCapability.JOIN_CALL,
    );
    // Make sure JOIN_CALL permission is set for call_member role
    const callMemberGrants = callType.grants['call_member'];
    if (!callMemberGrants.includes(OwnCapability.JOIN_CALL)) {
      callMemberGrants.push(OwnCapability.JOIN_CALL);
    }

    // Update the call type with the changes
    await client.video.updateCallType({
      name: callTypeName,
      grants: {
        user: userGrants,
        call_member: callMemberGrants,
      },
    });
    // #endregion snippet

    const { grants } = await client.video.getCallType({
      name: restrictedCallType,
    });
    expect(grants['user']).not.toContain(OwnCapability.JOIN_CALL);
    expect(grants['user'].length).toBeGreaterThan(0);
    expect(grants['call_member']).toContain(OwnCapability.JOIN_CALL);
  });

  it('configures a custom session timeout', async () => {
    const sessionCallType = await createCallType();
    const update = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Configuring custom session timeout" tab="Node.js" index=1
    // COPY: sessionCallType="default"
    await client.video.updateCallType({
      name: sessionCallType,
      settings: {
        session: {
          inactivity_timeout_seconds: 300,
        },
      },
    });
    // #endregion snippet

    const response = await (update.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    expect(response.settings.session.inactivity_timeout_seconds).toBe(300);
  });

  it('ends a call', async () => {
    const call = await createCall();

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Ending calls" tab="Node.js" index=1
    await call.end();
    // #endregion snippet

    const { call: stored } = await call.get();
    expect(stored.ended_at).toBeInstanceOf(Date);
  });

  it('queries calls with sorting and pagination', async () => {
    const queryCalls = vi.spyOn(client.video, 'queryCalls');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Sorting and pagination" tab="Node.js" index=1
    // default sorting
    await client.video.queryCalls();

    // sorting and pagination
    const queryCallsReq = {
      sort: [{ field: 'starts_at', direction: -1 }],
      limit: 2,
    };
    const response = await client.video.queryCalls(queryCallsReq);

    // loading next page
    await client.video.queryCalls({
      ...queryCallsReq,
      next: response.next,
    });
    // #endregion snippet

    expect(queryCalls).toHaveBeenCalledTimes(3);
    const [all, , nextPage] = await Promise.all(
      queryCalls.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.queryCalls>,
      ),
    );
    expect(all.calls.length).toBeGreaterThan(2);
    expect(response.calls).toHaveLength(2);
    expect(typeof response.next).toBe('string');
    // The second page can come back empty when the sort values are null (see the report).
    expect(Array.isArray(nextPage.calls)).toBe(true);
    expect(queryCalls.mock.calls[2][0]).toMatchObject({
      sort: [{ field: 'starts_at', direction: -1 }],
      limit: 2,
      next: response.next,
    });
  });

  it('queries live calls', async () => {
    // `backstage: false` only matches calls that went live: a call of a type without
    // backstage (`default`) isn't matched, so use a `livestream` call and go live.
    const liveCall = client.video.call('livestream', uniqueId('live-call'));
    cleanup.calls.push(liveCall.cid);
    await liveCall.create({ data: { created_by_id: johnId } });
    await liveCall.goLive();
    const defaultCall = await createCall();
    const queryCalls = vi.spyOn(client.video, 'queryCalls');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Query live calls" tab="Node.js" index=1
    await client.video.queryCalls({
      filter_conditions: { backstage: { $eq: false } },
    });
    // #endregion snippet

    const { calls } = await (queryCalls.mock.results[0].value as ReturnType<
      typeof client.video.queryCalls
    >);
    const cids = calls.map((c) => c.call.cid);
    expect(cids).toContain(liveCall.cid);
    expect(cids).not.toContain(defaultCall.cid);
    expect(calls.every((c) => c.call.backstage === false)).toBe(true);
  });

  it('queries upcoming calls', async () => {
    await createCall({
      data: { starts_at: new Date(Date.now() + 1000 * 60 * 60) },
    });
    const queryCalls = vi.spyOn(client.video, 'queryCalls');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Query upcoming calls" tab="Node.js" index=1
    const mins30 = 1000 * 60 * 30;
    const inNext30mins = new Date(Date.now() + mins30);
    await client.video.queryCalls({
      filter_conditions: {
        starts_at: { $gt: inNext30mins.toISOString() },
      },
    });
    // #endregion snippet

    const { calls } = await (queryCalls.mock.results[0].value as ReturnType<
      typeof client.video.queryCalls
    >);
    expect(calls.length).toBeGreaterThan(0);
    for (const { call } of calls) {
      expect(call.starts_at?.getTime()).toBeGreaterThan(inNext30mins.getTime());
    }
  });

  it('queries ongoing calls', async () => {
    const queryCalls = vi.spyOn(client.video, 'queryCalls');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Query ongoing calls" tab="Node.js" index=1
    await client.video.queryCalls({
      filter_conditions: { ongoing: { $eq: true } },
    });
    // #endregion snippet

    // No call has a live session on the test app (no WebRTC participants).
    const { calls } = await (queryCalls.mock.results[0].value as ReturnType<
      typeof client.video.queryCalls
    >);
    expect(Array.isArray(calls)).toBe(true);
  });

  it('queries call members', async () => {
    const call = await createCall({
      data: {
        members: [
          { user_id: saraId },
          { user_id: emilyId, role: 'admin' },
          { user_id: jackId },
        ],
      },
    });
    const queryMembers = vi.spyOn(client.video, 'queryCallMembers');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Query call members" tab="Node.js" index=1
    // default sorting
    await call.queryMembers();

    // sorting and pagination
    const queryMembersReq = {
      sort: [{ field: 'user_id', direction: 1 }],
      limit: 2,
    };
    const response = await call.queryMembers(queryMembersReq);

    // loading next page
    await call.queryMembers({
      ...queryMembersReq,
      next: response.next,
    });

    // filtering
    await call.queryMembers({
      filter_conditions: { role: { $eq: 'admin' } },
    });
    // #endregion snippet

    const [all, , nextPage, admins] = await Promise.all(
      queryMembers.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.queryCallMembers>,
      ),
    );
    const sorted = [saraId, emilyId, jackId].sort();
    expect(all.members.map((m) => m.user_id).sort()).toEqual(sorted);
    expect(response.members.map((m) => m.user_id)).toEqual(sorted.slice(0, 2));
    expect(nextPage.members.map((m) => m.user_id)).toEqual(sorted.slice(2));
    expect(admins.members.map((m) => m.user_id)).toEqual([emilyId]);
  });

  it('queries call participants', async () => {
    const queryParticipants = vi.spyOn(client.video, 'queryCallParticipants');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Query call Participants" tab="Node.js" index=1
    // COPY: saraId="sara"
    const call = client.video.call('default', crypto.randomUUID());
    await call.getOrCreate({
      data: {
        created_by_id: saraId,
      },
    });

    const response = await call.queryCallParticipants({
      filter_conditions: {
        user_id: { $eq: 'user-id' },
      },
    });

    console.log('Total participants:', response.total_participants);
    console.log('Role:', response.participants[0]?.user?.role);

    // Filter by published track
    await call.queryCallParticipants({
      filter_conditions: {
        published_tracks: { $eq: 'video' },
      },
    });

    // Filter multiple users
    await call.queryCallParticipants({
      filter_conditions: {
        user_id: { $in: ['user-id-1', 'user-id-2'] },
      },
      limit: 100,
    });
    // #endregion snippet
    cleanup.calls.push(call.cid);

    expect(log.mock.calls).toEqual([
      ['Total participants:', 0],
      ['Role:', undefined],
    ]);
    expect(queryParticipants).toHaveBeenCalledTimes(3);
    expect(queryParticipants.mock.calls[1][0]).toMatchObject({
      filter_conditions: { published_tracks: { $eq: 'video' } },
    });
    expect(queryParticipants.mock.calls[2][0]).toMatchObject({ limit: 100 });
    const [, byTrack, byUsers] = await Promise.all(
      queryParticipants.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.queryCallParticipants>,
      ),
    );
    // No one joins the call over WebRTC in the tests.
    expect(response.call.cid).toBe(call.cid);
    expect(byTrack.participants).toEqual([]);
    expect(byUsers.total_participants).toBe(0);
    expect(byUsers.participants).toEqual([]);
  });

  it('sends a custom event', async () => {
    const call = await createCall();
    const sendCallEvent = vi.spyOn(client.video, 'sendCallEvent');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Send custom event" tab="Node.js" index=1
    // COPY: johnId="john"
    // send a custom event to all users watching the call
    await call.sendCallEvent({
      custom: {
        'render-animation': 'balloons',
      },
      user_id: johnId,
    });
    // #endregion snippet

    const response = await (sendCallEvent.mock.results[0].value as ReturnType<
      typeof client.video.sendCallEvent
    >);
    expect(response.metadata.responseCode).toBe(201);
  });

  it('pins and unpins video', async () => {
    const call = await createCall();
    const pin = vi.spyOn(client.video, 'videoPin');
    const unpin = vi.spyOn(client.video, 'videoUnpin');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Pin and unpin video" tab="Node.js" index=1
    // COPY: pinUserId="user-id-to-pin", unpinUserId="user-id-to-unpin"
    await call.videoPin({
      session_id: 'session-id',
      user_id: pinUserId,
    });

    await call.videoUnpin({
      session_id: 'session-id',
      user_id: unpinUserId,
    });
    // #endregion snippet

    // The API accepts any session id: there is no participant to pin without WebRTC.
    const [pinned, unpinned] = await Promise.all([
      pin.mock.results[0].value as ReturnType<typeof client.video.videoPin>,
      unpin.mock.results[0].value as ReturnType<typeof client.video.videoUnpin>,
    ]);
    expect(pinned.metadata.responseCode).toBe(201);
    expect(unpinned.metadata.responseCode).toBe(201);
  });

  it('sets and disables the session timer on a call type', async () => {
    const timerCallType = await createCallType();
    const update = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Call type configuration" tab="Node.js" index=1
    // COPY: timerCallType="default"
    await client.video.updateCallType({
      name: timerCallType,
      settings: {
        limits: {
          max_duration_seconds: 3600,
        },
      },
    });

    // Disable the default session timer
    await client.video.updateCallType({
      name: timerCallType,
      settings: {
        limits: {
          max_duration_seconds: 0,
        },
      },
    });
    // #endregion snippet

    const [enabled, disabled] = await Promise.all(
      update.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.updateCallType>,
      ),
    );
    expect(enabled.settings.limits.max_duration_seconds).toBe(3600);
    expect(disabled.settings.limits.max_duration_seconds ?? 0).toBe(0);
  });

  it('creates a call with a session timer', async () => {
    const outgoingCallId = uniqueId('test-outgoing-call');
    cleanup.calls.push(`default:${outgoingCallId}`);

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Create call with session timer" tab="Node.js" index=1
    // COPY: outgoingCallId="test-outgoing-call", johnId="john"
    // or call.create
    await client.video.call('default', outgoingCallId).getOrCreate({
      data: {
        created_by_id: johnId,
        settings_override: {
          limits: {
            max_duration_seconds: 3600,
          },
        },
      },
    });
    // #endregion snippet

    const { call } = await client.video.call('default', outgoingCallId).get();
    expect(call.settings.limits.max_duration_seconds).toBe(3600);
  });

  it('extends and disables the session timer of a call', async () => {
    const call = await createCall({
      data: { settings_override: { limits: { max_duration_seconds: 3600 } } },
    });
    const update = vi.spyOn(client.video, 'updateCall');

    // #region snippet docs="video/api/01-basics/03-calls.md" heading="Updating call object to extend session time" tab="Node.js" index=1
    // Update the call with session timer
    const { call: callData } = await call.get();
    await call.update({
      settings_override: {
        limits: {
          max_duration_seconds:
            (callData.settings.limits.max_duration_seconds ?? 0) + 300,
        },
      },
    });

    // Disable the session timer
    await call.update({
      settings_override: {
        limits: {
          max_duration_seconds: 0,
        },
      },
    });
    // #endregion snippet

    const [extended, disabled] = await Promise.all(
      update.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.updateCall>,
      ),
    );
    expect(extended.call.settings.limits.max_duration_seconds).toBe(3900);
    expect(disabled.call.settings.limits.max_duration_seconds ?? 0).toBe(0);
  });
});
