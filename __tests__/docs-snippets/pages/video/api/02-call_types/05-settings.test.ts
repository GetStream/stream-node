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
  retryOnCallTypeMissing,
  trackCallTypeCreates,
} from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'video/api/02-call_types/05-settings.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets screensharing settings on a call type and a call', async () => {
    const settingsCallType = uniqueId('call-type');
    const call = client.video.call(settingsCallType, uniqueId('call'));
    const create = trackCallTypeCreates(client, cleanup);
    // Other API nodes can still answer "call type does not exist" for the new type.
    const originalGetOrCreate = client.video.getOrCreateCall.bind(client.video);
    const getOrCreate = vi
      .spyOn(client.video, 'getOrCreateCall')
      .mockImplementation((request) =>
        retryOnCallTypeMissing(() => originalGetOrCreate(request)),
      );

    // #region snippet docs="video/api/02-call_types/05-settings.md" heading="Settings" tab="Node.js" index=1
    // COPY: settingsCallType="<call type name>", johnId="john"
    await client.video.createCallType({
      name: settingsCallType,
      settings: {
        screensharing: {
          access_request_enabled: false,
          enabled: true,
        },
      },
    });

    // override settings on call level
    await call.create({
      data: {
        created_by_id: johnId,
        settings_override: {
          screensharing: {
            enabled: false,
          },
        },
      },
    });
    // #endregion snippet
    cleanup.calls.push(call.cid);

    const callType = await (create.mock.results[0].value as ReturnType<
      typeof client.video.createCallType
    >);
    expect(callType.settings.screensharing).toMatchObject({
      access_request_enabled: false,
      enabled: true,
    });
    const created = await (getOrCreate.mock.results[0].value as ReturnType<
      typeof client.video.getOrCreateCall
    >);
    expect(created.created).toBe(true);
    expect(created.call.settings.screensharing).toMatchObject({
      access_request_enabled: false,
      enabled: false,
    });
  });

  it('sets notification settings on a call type', async () => {
    const notificationCallType = uniqueId('call-type');
    const create = trackCallTypeCreates(client, cleanup);

    // #region snippet docs="video/api/02-call_types/05-settings.md" heading="Notification settings" tab="Node.js" index=1
    // COPY: notificationCallType="<call type name>"
    await client.video.createCallType({
      name: notificationCallType,
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
      name: notificationCallType,
    });
    expect(notification_settings.enabled).toBe(true);
    expect(notification_settings.call_notification).toMatchObject({
      enabled: true,
      apns: { title: '{{ user.display_name }} calls you' },
    });
    expect(notification_settings.call_live_started).toMatchObject({
      enabled: true,
      apns: { title: '{{ call.display_name }} started' },
    });
  });
});
