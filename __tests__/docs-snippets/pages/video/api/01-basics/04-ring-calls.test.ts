import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  createCallType,
  trackCallTypeCreates,
} from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'video/api/01-basics/04-ring-calls.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const myselfId = uniqueId('myself');
  const friendId = uniqueId('friend');
  const otherFriendId = uniqueId('other-friend');

  beforeAll(async () => {
    const ids = [myselfId, friendId, otherFriendId];
    cleanup.users.push(...ids);
    await client.upsertUsers(ids.map((id) => ({ id })));
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a ring call', async () => {
    const getOrCreate = vi.spyOn(client.video, 'getOrCreateCall');

    // #region snippet docs="video/api/01-basics/04-ring-calls.md" heading="Creating ring calls" tab="Node.js" index=1
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

    expect(getOrCreate.mock.calls[0][0]).toMatchObject({
      ring: true,
      video: true,
    });
    const response = await (getOrCreate.mock.results[0].value as ReturnType<
      typeof client.video.getOrCreateCall
    >);
    expect(response.created).toBe(true);
    expect(response.call.created_by.id).toBe(myselfId);
    expect(response.members.map((m) => m.user_id).sort()).toEqual(
      [myselfId, friendId].sort(),
    );
  });

  it('rings individual members', async () => {
    const ring = vi.spyOn(client.video, 'ringCall');

    // #region snippet docs="video/api/01-basics/04-ring-calls.md" heading="Ringing individual members" tab="Node.js" index=1
    // COPY: myselfId="myself", friendId="my-friend", otherFriendId="my-other-friend"
    // Make sure to use a unique id when creating ring calls
    const call = client.video.call('default', crypto.randomUUID());
    await call.getOrCreate({
      ring: false, // set to false to avoid ringing the whole call
      data: {
        created_by_id: myselfId,
        members: [{ user_id: myselfId }, { user_id: friendId }],
      },
    });

    // note: my-friend needs to be a member of the call
    await call.ring({ members_ids: [friendId] });

    // to invite a new member and ring them
    await call.updateCallMembers({
      update_members: [{ user_id: otherFriendId }],
    });
    await call.ring({ members_ids: [otherFriendId] });

    // to ring everyone
    await call.ring();
    // #endregion snippet
    cleanup.calls.push(call.cid);

    const [first, second, everyone] = await Promise.all(
      ring.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.ringCall>,
      ),
    );
    expect(first.members_ids).toEqual([friendId]);
    expect(second.members_ids).toEqual([otherFriendId]);
    // Everyone except the caller, who is already "in" the call.
    expect([...everyone.members_ids].sort()).toEqual(
      [friendId, otherFriendId].sort(),
    );
  });

  it('sets ring timeouts', async () => {
    const callTypeName = await createCallType(client, cleanup);
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.create({ data: { created_by_id: myselfId } });

    // #region snippet docs="video/api/01-basics/04-ring-calls.md" heading="Timeouts" tab="Node.js" index=1
    // on call type level
    await client.video.updateCallType({
      name: callTypeName,
      settings: {
        ring: {
          incoming_call_timeout_ms: 10000,
          auto_cancel_timeout_ms: 15000,
          missed_call_timeout_ms: 15000,
        },
      },
    });

    // or on call level
    await call.update({
      settings_override: {
        ring: {
          incoming_call_timeout_ms: 10000,
          auto_cancel_timeout_ms: 15000,
          missed_call_timeout_ms: 15000,
        },
      },
    });
    // #endregion snippet

    const expected = {
      incoming_call_timeout_ms: 10000,
      auto_cancel_timeout_ms: 15000,
      missed_call_timeout_ms: 15000,
    };
    const callType = await client.video.getCallType({ name: callTypeName });
    expect(callType.settings.ring).toMatchObject(expected);
    const { call: stored } = await call.get();
    expect(stored.settings.ring).toMatchObject(expected);
  });

  it('configures push notifications on a call type', async () => {
    const pushCallType = uniqueId('call-type');
    const create = trackCallTypeCreates(client, cleanup);

    // #region snippet docs="video/api/01-basics/04-ring-calls.md" heading="Push notifications" tab="Node.js" index=1
    // COPY: pushCallType="<call type name>"
    await client.video.createCallType({
      name: pushCallType,
      notification_settings: {
        enabled: true,
        call_notification: {
          apns: {
            title: '{{ user.display_name }} calls you',
            body: '{{ user.display_name }} calls you',
          },
          enabled: true,
        },
        call_ring: {
          apns: {
            title: '{{ user.display_name }} calls you',
            body: '{{ user.display_name }} calls you',
          },
          enabled: true,
        },
        call_live_started: {
          enabled: true,
          apns: {
            title: '{{ call.display_name }} started',
            body: '{{ user.display_name }} started',
          },
        },
        call_missed: {
          enabled: true,
          apns: {
            title: 'missed call from {{ user.display_name }}',
            body: 'missed call from {{ user.display_name }}',
          },
        },
        session_started: {
          enabled: true,
          apns: {
            title: '{{ call.display_name }} started',
            body: '{{ call.display_name }} started',
          },
        },
      },
    });
    // #endregion snippet

    expect(create).toHaveBeenCalledTimes(1);
    const { notification_settings } = await client.video.getCallType({
      name: pushCallType,
    });
    expect(notification_settings.enabled).toBe(true);
    expect(notification_settings.call_ring).toMatchObject({
      enabled: true,
      apns: { title: '{{ user.display_name }} calls you' },
    });
    expect(notification_settings.call_missed).toMatchObject({
      enabled: true,
      apns: { body: 'missed call from {{ user.display_name }}' },
    });
    expect(notification_settings.session_started.enabled).toBe(true);
  });
});
