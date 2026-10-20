import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { createCallType } from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { joinCallAsUser } from '../../../../helpers/video';

const DOCS = 'video/api/07-recording/02-composite.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  /** A `default` call with a `uniqueId` id, created by john and registered for cleanup. */
  const createCall = async () => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({ data: { created_by_id: johnId } });
    return call;
  };

  /** The awaited results of every call to a spied update method. */
  const updateResults = <T>(spy: { mock: { results: { value: unknown }[] } }) =>
    Promise.all(spy.mock.results.map((r) => r.value as Promise<T>));

  type UpdateCallResponse = Awaited<ReturnType<typeof client.video.updateCall>>;
  type UpdateCallTypeResponse = Awaited<
    ReturnType<typeof client.video.updateCallType>
  >;

  /**
   * A call john is a member of and has joined over REST: recording needs a call
   * session (see AGENTS.md). Stops the composite recording in cleanup in case the
   * test fails before its stop.
   */
  const createJoinedCall = async () => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({
      data: { created_by_id: johnId, members: [{ user_id: johnId }] },
    });
    await joinCallAsUser(call, johnId);
    cleanup.add(() =>
      call
        .stopRecording({ recording_type: 'composite' })
        .catch(() => undefined),
    );
    return call;
  };

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts and stops a composite recording and lists the recordings', async () => {
    const call = await createJoinedCall();
    const stopRecording = vi.spyOn(client.video, 'stopRecording');

    // #region snippet docs="video/api/07-recording/02-composite.md" heading="Quickstart" tab="Node.js" index=1
    // Start composite recording
    // Triggers webhook event: call.recording_started
    await call.startRecording({ recording_type: 'composite' });

    // Stop composite recording
    // Triggers webhook event: call.recording_stopped
    // When processing completes: call.recording_ready (contains recording URL)
    await call.stopRecording({ recording_type: 'composite' });

    // List all recordings for this call
    const response = await call.listRecordings();

    // Download using the URL from response.recordings or the call.recording_ready webhook payload
    // response.recordings[0].url
    // #endregion snippet

    // Right after the start the composite recorder is still starting: `recording`
    // turns true a few seconds later (2026-10-16).
    expect(stopRecording).toHaveBeenCalledWith({
      type: call.type,
      id: call.id,
      recording_type: 'composite',
    });
    // Stopped right after the start: nothing has been uploaded yet.
    expect(response.recordings).toEqual([]);
  });

  it('enables, disables and configures recording', async () => {
    const call = await createCall();
    // The docs update a call type: run it on a test call type.
    const recordingCallType = await createCallType(client, cleanup);
    const updateCall = vi.spyOn(client.video, 'updateCall');
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/02-composite.md" heading="Enabling / Disabling call recording" tab="Node.js" index=1
    // COPY: recordingCallType="<call type name>"
    // Disable on call level
    await call.update({
      settings_override: {
        recording: {
          mode: 'disabled',
        },
      },
    });

    // Disable on call type level
    await client.video.updateCallType({
      name: recordingCallType,
      settings: {
        recording: {
          mode: 'disabled',
        },
      },
    });

    // Automatically record calls
    await client.video.updateCallType({
      name: recordingCallType,
      settings: {
        recording: {
          mode: 'auto-on',
          quality: '720p',
        },
      },
    });

    // Enable
    await call.update({
      settings_override: {
        recording: {
          mode: 'available',
          quality: '720p',
        },
      },
    });

    // Other settings
    await call.update({
      settings_override: {
        recording: {
          mode: 'available',
          audio_only: false,
          quality: '1080p',
        },
      },
    });
    // #endregion snippet

    const calls = await updateResults<UpdateCallResponse>(updateCall);
    expect(calls.map((r) => r.call.settings.recording.mode)).toEqual([
      'disabled',
      'available',
      'available',
    ]);
    expect(calls[1].call.settings.recording.quality).toBe('720p');
    expect(calls[2].call.settings.recording).toMatchObject({
      audio_only: false,
      quality: '1080p',
    });
    const types = await updateResults<UpdateCallTypeResponse>(updateCallType);
    expect(types.map((r) => r.name)).toEqual([
      recordingCallType,
      recordingCallType,
    ]);
    expect(types[0].settings.recording.mode).toBe('disabled');
    expect(types[1].settings.recording).toMatchObject({
      mode: 'auto-on',
      quality: '720p',
    });
  });

  it('enables audio only recording on a call', async () => {
    const call = await createCall();
    const updateCall = vi.spyOn(client.video, 'updateCall');

    // #region snippet docs="video/api/07-recording/02-composite.md" heading="Audio only recording" tab="Node.js" index=1
    // Enable
    await call.update({
      settings_override: {
        recording: {
          mode: 'available',
          audio_only: true,
        },
      },
    });
    // #endregion snippet

    const [response] = await updateResults<UpdateCallResponse>(updateCall);
    expect(response.call.cid).toBe(call.cid);
    expect(response.call.settings.recording).toMatchObject({
      mode: 'available',
      audio_only: true,
    });
  });

  it('sets layout options on a call type', async () => {
    const callTypeName = await createCallType(client, cleanup);
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/02-composite.md" heading="Layout options" tab="Node.js" index=1
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

    await client.video.updateCallType({
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
    // #endregion snippet

    const [response] =
      await updateResults<UpdateCallTypeResponse>(updateCallType);
    expect(response.name).toBe(callTypeName);
    expect(response.settings.recording).toMatchObject({
      mode: 'available',
      audio_only: false,
      quality: '1080p',
      layout: { name: 'spotlight' },
    });
    expect(response.settings.recording.layout.options).toMatchObject(
      layoutOptions,
    );
  });

  it('sets a portrait recording resolution on a call type', async () => {
    const callTypeName = await createCallType(client, cleanup);
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/02-composite.md" heading="Recording resolution and portrait mode" tab="Node.js" index=1
    await client.video.updateCallType({
      name: callTypeName,
      settings: {
        recording: {
          mode: 'available',
          quality: 'portrait-1080x1920',
        },
      },
    });
    // #endregion snippet

    const [response] =
      await updateResults<UpdateCallTypeResponse>(updateCallType);
    expect(response.name).toBe(callTypeName);
    expect(response.settings.recording).toMatchObject({
      mode: 'available',
      quality: 'portrait-1080x1920',
    });
  });

  it('sets an external CSS file for the recording layout', async () => {
    const callTypeName = await createCallType(client, cleanup);
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/02-composite.md" heading="Custom recording styling using external CSS" tab="Node.js" index=1
    await client.video.updateCallType({
      name: callTypeName,
      settings: {
        recording: {
          mode: 'available',
          audio_only: false,
          quality: '1080p',
          layout: {
            name: 'spotlight',
            external_css_url: 'https://path/to/custom.css',
          },
        },
      },
    });
    // #endregion snippet

    const [response] =
      await updateResults<UpdateCallTypeResponse>(updateCallType);
    expect(response.name).toBe(callTypeName);
    expect(response.settings.recording).toMatchObject({
      mode: 'available',
      audio_only: false,
      quality: '1080p',
      layout: {
        name: 'spotlight',
        external_css_url: 'https://path/to/custom.css',
      },
    });
  });

  it('records calls with a custom web application', async () => {
    const callTypeName = await createCallType(client, cleanup);
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/02-composite.md" heading="Advanced - record calls using a custom web application" tab="Node.js" index=1
    await client.video.updateCallType({
      name: callTypeName,
      settings: {
        recording: {
          mode: 'available',
          audio_only: false,
          quality: '1080p',
          layout: {
            name: 'custom',
            external_app_url: 'https://path/to/layout/app',
          },
        },
      },
    });
    // #endregion snippet

    const [response] =
      await updateResults<UpdateCallTypeResponse>(updateCallType);
    expect(response.name).toBe(callTypeName);
    expect(response.settings.recording).toMatchObject({
      mode: 'available',
      audio_only: false,
      quality: '1080p',
      layout: {
        name: 'custom',
        external_app_url: 'https://path/to/layout/app',
      },
    });
  });
});
