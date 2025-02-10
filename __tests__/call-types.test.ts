import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { OwnCapability } from '../src/gen/models';

describe('call types CRUD API', () => {
  let client: StreamClient;
  const callTypeName = `streamnodetest${uuidv4()}`;

  beforeAll(() => {
    client = createTestClient();
  });

  it('create', async () => {
    const createResponse = await client.video.createCallType({
      name: callTypeName,
      settings: {
        audio: { mic_default_on: true, default_device: 'speaker' },
        screensharing: {
          access_request_enabled: false,
          enabled: true,
        },
        geofencing: {
          names: ['european_union'],
        },
        frame_recording: {
          mode: 'auto-on',
          capture_interval_in_seconds: 5,
          quality: '720p',
        },
      },
      notification_settings: {
        enabled: true,
        call_notification: {
          apns: {
            title: '{{ user.display_name }} invites you to a call',
          },
          enabled: true,
        },
        session_started: {
          enabled: false,
        },
      },
      grants: {
        admin: [
          OwnCapability.SEND_AUDIO,
          OwnCapability.SEND_VIDEO,
          OwnCapability.MUTE_USERS,
        ],
      },
    });

    expect(createResponse.name).toBe(callTypeName);
    expect(createResponse.settings.audio.mic_default_on).toBe(true);
    expect(createResponse.settings.audio.default_device).toBe('speaker');
    expect(createResponse.grants.admin).toBeDefined();
    expect(createResponse.grants.user).toBeDefined();
    expect(createResponse.settings.geofencing.names).toEqual([
      'european_union',
    ]);
    expect(createResponse.settings.screensharing.access_request_enabled).toBe(
      false,
    );
    expect(createResponse.settings.screensharing.enabled).toBe(true);
    expect(createResponse.notification_settings.enabled).toBe(true);
    expect(createResponse.notification_settings.session_started?.enabled).toBe(
      false,
    );
    expect(
      createResponse.notification_settings.call_notification?.enabled,
    ).toBe(true);
    expect(
      createResponse.notification_settings.call_notification?.apns?.title,
    ).toBe('{{ user.display_name }} invites you to a call');
    expect(
      createResponse.settings.frame_recording.capture_interval_in_seconds,
    ).toBe(5);
  });

  it('read', async () => {
    const readResponse = await client.video.listCallTypes();

    expect(readResponse.call_types[callTypeName].name).toBe(callTypeName);
  });

  it('restrict call access', async () => {
    let callType = (await client.video.listCallTypes()).call_types[
      callTypeName
    ];
    const userGrants = callType.grants.user.filter(
      (c) => c !== OwnCapability.JOIN_CALL,
    );
    const callMemberGrants = callType.grants.call_member;
    if (!callMemberGrants.includes(OwnCapability.JOIN_CALL)) {
      callMemberGrants.push(OwnCapability.JOIN_CALL);
    }

    await client.video.updateCallType({
      name: callTypeName,
      grants: { user: userGrants, call_member: callMemberGrants },
    });

    callType = (await client.video.listCallTypes()).call_types[callTypeName];

    expect(callType.grants.user.includes(OwnCapability.JOIN_CALL)).toBe(false);
    expect(callType.grants.call_member.includes(OwnCapability.JOIN_CALL)).toBe(
      true,
    );
  });

  it('update', async () => {
    const updateResponse = await client.video.updateCallType({
      name: callTypeName,
      settings: {
        audio: { mic_default_on: false, default_device: 'earpiece' },
        recording: {
          mode: 'disabled',
          // FIXME OL: these props shouldn't be required to be set when recording is disabled
          audio_only: false,
          quality: '1080p',
        },
      },
    });

    expect(updateResponse.settings.audio.mic_default_on).toBeFalsy();
    expect(updateResponse.settings.audio.default_device).toBe('earpiece');
    expect(updateResponse.settings.recording.mode).toBe('disabled');
  });

  it('update layout options', async () => {
    const layoutOptions = {
      'logo.image_url':
        'https://theme.zdassets.com/theme_assets/9442057/efc3820e436f9150bc8cf34267fff4df052a1f9c.png',
      'logo.horizontal_position': 'center',
      'title.text': 'Building Stream Video Q&A',
      'title.horizontal_position': 'center',
      'title.color': 'black',
      'participant_label.border_radius': '0px',
      'participant.border_radius': '0px',
      'layout.spotlight.participants_bar_position': 'top',
      'layout.background_color': '#f2f2f2',
      'participant.placeholder_background_color': '#1f1f1f',
      'layout.single-participant.padding_inline': '20%',
      'participant_label.background_color': 'transparent',
    };

    const response = await client.video.updateCallType({
      name: callTypeName,
      settings: {
        recording: {
          mode: 'available',
          audio_only: false,
          quality: '1080p',
          layout: {
            name: 'spotlight',
            options: layoutOptions,
          },
        },
      },
    });

    expect(response.settings.recording.layout.name).toBe('spotlight');
    Object.keys(layoutOptions).forEach((key) => {
      expect(response.settings.recording.layout.options![key]).toEqual(
        (layoutOptions as any)[key],
      );
    });
  });

  it('delete', async () => {
    try {
      await client.video.deleteCallType({ name: callTypeName });
    } catch (e) {
      // the first request fails on backend sometimes
      // retry it
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });

      await client.video.deleteCallType({ name: callTypeName });
    }

    await expect(() =>
      client.video.getCallType({ name: callTypeName }),
    ).rejects.toThrowError();
  });
});
