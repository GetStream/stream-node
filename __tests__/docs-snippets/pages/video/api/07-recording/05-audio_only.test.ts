import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { joinCallAsUser } from '../../../../helpers/video';
import { retry } from '../../../../helpers/wait';

const DOCS = 'video/api/07-recording/05-audio_only.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  /**
   * A `default` call john is a member of and has joined over REST: recording
   * needs a call session (see AGENTS.md). Every recording type is stopped in
   * cleanup (some snippets only start one).
   */
  const createJoinedCall = async () => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({
      data: { created_by_id: johnId, members: [{ user_id: johnId }] },
    });
    await joinCallAsUser(call, johnId);
    for (const recording_type of ['composite', 'individual', 'raw'] as const) {
      cleanup.add(() =>
        call.stopRecording({ recording_type }).catch(() => undefined),
      );
    }
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

  it('starts and stops audio only recordings of every type', async () => {
    const call = await createJoinedCall();
    const startRecording = vi.spyOn(client.video, 'startRecording');
    const stopRecording = vi.spyOn(client.video, 'stopRecording');

    // #region snippet docs="video/api/07-recording/05-audio_only.md" heading="Quickstart" tab="Node.js" index=1
    // Option 1: Composite audio (single mixed MP3)
    await call.update({
      settings_override: {
        recording: { mode: 'available', audio_only: true },
      },
    });
    // Triggers: call.recording_started → call.recording_stopped → call.recording_ready
    await call.startRecording({ recording_type: 'composite' });
    await call.stopRecording({ recording_type: 'composite' });

    // Option 2: Individual audio (separate file per participant)
    await call.update({
      settings_override: {
        individual_recording: {
          mode: 'available',
          output_types: ['audio_only', 'screenshare_audio_only'],
        },
      },
    });
    // Triggers: call.recording_started → call.recording_stopped → call.recording_ready (one per file)
    await call.startRecording({ recording_type: 'individual' });
    await call.stopRecording({ recording_type: 'individual' });

    // Option 3: Raw audio (unprocessed, requires CLI post-processing)
    await call.update({
      settings_override: {
        raw_recording: { mode: 'available', audio_only: true },
      },
    });
    // Triggers: call.recording_started → call.recording_stopped → call.recording_ready
    await call.startRecording({ recording_type: 'raw' });
    await call.stopRecording({ recording_type: 'raw' });

    // List all recordings for this call
    const response = await call.listRecordings();

    // Download using the URL from response.recordings or the call.recording_ready webhook payload
    // response.recordings[0].url
    // #endregion snippet

    const types = ['composite', 'individual', 'raw'];
    expect(startRecording.mock.calls.map(([r]) => r.recording_type)).toEqual(
      types,
    );
    expect(stopRecording.mock.calls.map(([r]) => r.recording_type)).toEqual(
      types,
    );
    const { call: data } = await call.get();
    expect(data.settings.recording.audio_only).toBe(true);
    expect(data.settings.individual_recording.output_types).toEqual([
      'audio_only',
      'screenshare_audio_only',
    ]);
    expect(data.settings.raw_recording.audio_only).toBe(true);
    // Every recording was stopped right after its start: nothing uploaded yet.
    expect(response.recordings).toEqual([]);
  });

  it('starts an audio only composite recording', async () => {
    const call = await createJoinedCall();

    // #region snippet docs="video/api/07-recording/05-audio_only.md" heading="Composite audio" tab="Node.js" index=1
    // Enable audio-only composite recording
    await call.update({
      settings_override: {
        recording: {
          mode: 'available',
          audio_only: true,
        },
      },
    });

    // Start recording
    // Triggers webhook event: call.recording_started
    await call.startRecording({ recording_type: 'composite' });

    // When stopped: call.recording_stopped
    // When ready: call.recording_ready (contains recording URL)
    // #endregion snippet

    // `recording` turns true a few seconds after the start (2026-10-16).
    const data = await retry(
      async () => {
        const { call: current } = await call.get();
        if (!current.recording) throw new Error('not recording yet');
        return current;
      },
      { timeout: 30000 },
    );
    expect(data.recording).toBe(true);
    expect(data.settings.recording.audio_only).toBe(true);
  });

  it('starts an audio only individual recording', async () => {
    const call = await createJoinedCall();

    // #region snippet docs="video/api/07-recording/05-audio_only.md" heading="Individual audio tracks" tab="Node.js" index=1
    // Enable individual audio-only recording
    await call.update({
      settings_override: {
        individual_recording: {
          mode: 'available',
          output_types: ['audio_only', 'screenshare_audio_only'],
        },
      },
    });

    // Start recording
    // Triggers webhook event: call.recording_started
    await call.startRecording({ recording_type: 'individual' });

    // When stopped: call.recording_stopped
    // When ready: call.recording_ready (one event per file, contains recording URL)
    // #endregion snippet

    const { call: data } = await call.get();
    expect(data.settings.individual_recording.output_types).toEqual([
      'audio_only',
      'screenshare_audio_only',
    ]);
    expect(data.egress.individual_recording).toBeTruthy();
  });

  it('starts an audio only raw recording', async () => {
    const call = await createJoinedCall();

    // #region snippet docs="video/api/07-recording/05-audio_only.md" heading="Raw audio" tab="Node.js" index=1
    // Enable raw recording with audio only
    await call.update({
      settings_override: {
        raw_recording: {
          mode: 'available',
          audio_only: true,
        },
      },
    });

    // Start recording
    // Triggers webhook event: call.recording_started
    await call.startRecording({ recording_type: 'raw' });

    // When stopped: call.recording_stopped
    // When ready: call.recording_ready (contains archive URL)
    // #endregion snippet

    const { call: data } = await call.get();
    expect(data.settings.raw_recording.audio_only).toBe(true);
    expect(data.egress.raw_recording).toBeTruthy();
  });
});
