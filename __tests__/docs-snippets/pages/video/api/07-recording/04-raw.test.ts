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
import type { CallResponse } from '../../../../../../index';

const DOCS = 'video/api/07-recording/04-raw.md';

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

  /**
   * A call john is a member of and has joined over REST: recording needs a call
   * session (see AGENTS.md). Stops the raw recording in cleanup in case the
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
      call.stopRecording({ recording_type: 'raw' }).catch(() => undefined),
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

  it('starts and stops a raw recording and lists the recordings', async () => {
    const call = await createJoinedCall();
    // Read the egress state right after the start, before the stop.
    const original = client.video.startRecording.bind(client.video);
    let egressAfterStart: CallResponse['egress'] | undefined;
    vi.spyOn(client.video, 'startRecording').mockImplementation(
      async (request) => {
        const response = await original(request);
        egressAfterStart = (await call.get()).call.egress;
        return response;
      },
    );
    const stopRecording = vi.spyOn(client.video, 'stopRecording');

    // #region snippet docs="video/api/07-recording/04-raw.md" heading="Quickstart" tab="Node.js" index=1
    // Start raw recording
    // Triggers webhook event: call.recording_started
    await call.startRecording({ recording_type: 'raw' });

    // Stop raw recording
    // Triggers webhook event: call.recording_stopped
    // When processing completes: call.recording_ready (contains archive URL)
    await call.stopRecording({ recording_type: 'raw' });

    // List all recordings for this call
    const response = await call.listRecordings();

    // Download using the URL from response.recordings or the call.recording_ready webhook payload
    // response.recordings[0].url
    // #endregion snippet

    expect(['starting', 'running']).toContain(
      egressAfterStart?.raw_recording?.status,
    );
    expect(stopRecording).toHaveBeenCalledWith({
      type: call.type,
      id: call.id,
      recording_type: 'raw',
    });
    // Stopped right after the start: nothing has been uploaded yet.
    expect(response.recordings).toEqual([]);
  });

  it('sets raw recording on a call and a call type', async () => {
    const call = await createCall();
    // The docs update a call type: run it on a test call type.
    const recordingCallType = await createCallType(client, cleanup);
    const updateCall = vi.spyOn(client.video, 'updateCall');
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/04-raw.md" heading="Raw recording settings" tab="Node.js" index=1
    // COPY: recordingCallType="<call type name>"
    // Per-call override
    await call.update({
      settings_override: {
        raw_recording: {
          mode: 'available',
        },
      },
    });

    // Default for a call type
    await client.video.updateCallType({
      name: recordingCallType,
      settings: {
        raw_recording: {
          mode: 'auto-on',
        },
      },
    });
    // #endregion snippet

    const callResponse = await (updateCall.mock.results[0].value as ReturnType<
      typeof client.video.updateCall
    >);
    expect(callResponse.call.cid).toBe(call.cid);
    expect(callResponse.call.settings.raw_recording.mode).toBe('available');
    const typeResponse = await (updateCallType.mock.results[0]
      .value as ReturnType<typeof client.video.updateCallType>);
    expect(typeResponse.name).toBe(recordingCallType);
    expect(typeResponse.settings.raw_recording.mode).toBe('auto-on');
  });
});
