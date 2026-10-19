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
import { retry } from '../../../../helpers/wait';
import type { CallResponse } from '../../../../../../index';

const DOCS = 'video/api/07-recording/06-frame_recording.md';

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

  it('starts and stops frame recording', async () => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({
      data: { created_by_id: johnId, members: [{ user_id: johnId }] },
    });
    // Frame recording needs a call session: join over REST (see AGENTS.md).
    await joinCallAsUser(call, johnId);
    cleanup.add(() => call.stopFrameRecording().catch(() => undefined));
    // Read the egress state right after the start, before the stop.
    const original = client.video.startFrameRecording.bind(client.video);
    let egressAfterStart: CallResponse['egress'] | undefined;
    vi.spyOn(client.video, 'startFrameRecording').mockImplementation(
      async (request) => {
        const response = await original(request);
        egressAfterStart = (await call.get()).call.egress;
        return response;
      },
    );

    // #region snippet docs="video/api/07-recording/06-frame_recording.md" heading="Quickstart" tab="Node.js" index=1
    // Start frame recording
    // Triggers webhook event: call.frame_recording_started
    await call.startFrameRecording();

    // Frames are delivered via: call.frame_recording_frame_ready (every 2 seconds per participant)

    // Stop frame recording
    // Triggers webhook event: call.frame_recording_stopped
    await call.stopFrameRecording();
    // #endregion snippet

    expect(['starting', 'running']).toContain(
      egressAfterStart?.frame_recording?.status,
    );
    const egress = await retry(async () => {
      const { call: data } = await call.get();
      if (data.egress.frame_recording) throw new Error('still recording');
      return data.egress;
    });
    expect(egress.frame_recording).toBeFalsy();
  });

  it('runs the frame recorder automatically for all calls of a call type', async () => {
    // The docs update the built-in `default` type: run it on a test call type.
    const frameCallType = await createCallType(client, cleanup);
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/06-frame_recording.md" heading="Running frame recorder automatically for all calls" tab="Node.js" index=1
    // COPY: frameCallType="default"
    await client.video.updateCallType({
      name: frameCallType,
      settings: {
        frame_recording: {
          mode: 'auto-on',
          capture_interval_in_seconds: 5,
          quality: '720p',
        },
      },
    });
    // #endregion snippet

    const response = await (updateCallType.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    expect(response.name).toBe(frameCallType);
    expect(response.settings.frame_recording).toMatchObject({
      mode: 'auto-on',
      capture_interval_in_seconds: 5,
      quality: '720p',
    });
  });
});
