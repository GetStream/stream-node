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
import type { CallResponse } from '../../../../../../index';

const DOCS = 'video/api/03-streaming/08-hls.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  /** A `livestream` call with a `uniqueId` id, created by john and registered for cleanup. */
  const createLivestream = async () => {
    const call = client.video.call('livestream', uniqueId('livestream'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({ data: { created_by_id: johnId } });
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

  it('starts and stops an HLS broadcast', async () => {
    const call = await createLivestream();
    // HLS needs a call session: john (the creator, who may join the backstage)
    // joins over REST (see AGENTS.md).
    await joinCallAsUser(call, johnId);
    cleanup.add(() => call.stopHLSBroadcasting().catch(() => undefined));
    // Read the egress state right after the start, before the stop.
    const original = client.video.startHLSBroadcasting.bind(client.video);
    let egressAfterStart: CallResponse['egress'] | undefined;
    const startHLS = vi
      .spyOn(client.video, 'startHLSBroadcasting')
      .mockImplementation(async (request) => {
        const response = await original(request);
        egressAfterStart = (await call.get()).call.egress;
        return response;
      });
    const stopHLS = vi.spyOn(client.video, 'stopHLSBroadcasting');

    // #region snippet docs="video/api/03-streaming/08-hls.md" heading="Start and stop HLS broadcast" tab="Node.js" index=1
    await call.startHLSBroadcasting();

    // to end broadcasting
    await call.stopHLSBroadcasting();
    // #endregion snippet

    const started = await (startHLS.mock.results[0].value as ReturnType<
      typeof client.video.startHLSBroadcasting
    >);
    expect(started.playlist_url).toMatch(/playlist\.m3u8/);
    expect(egressAfterStart?.broadcasting).toBe(true);
    expect(egressAfterStart?.hls?.playlist_url).toBe(started.playlist_url);
    expect(stopHLS).toHaveBeenCalledTimes(1);
    const egress = await retry(async () => {
      const { call: data } = await call.get();
      if (data.egress.broadcasting) throw new Error('still broadcasting');
      return data.egress;
    });
    expect(egress.broadcasting).toBe(false);
  });

  it('goes live, optionally starting processes', async () => {
    const call = await createLivestream();
    const goLive = vi.spyOn(client.video, 'goLive');

    // #region snippet docs="video/api/03-streaming/08-hls.md" heading="Start and stop HLS broadcast" tab="Node.js" index=2
    await call.goLive();

    // Optionally start processes that are set to `available`
    await call.goLive({
      // Optionally start HLS broadcast
      start_hls: true,
      // Optionally start recording the call
      start_recording: true,
      // Optionally start displaying closed captions for call participants
      start_closed_caption: true,
      // Optionally start saving the call transcription to a file
      start_transcription: true,
      // Optionally select storage for the recording file (if none is specified, the default storage will be used)
      recording_storage_name: '<storage name>',
      // Optionally select storage for the transcription file (if none is specified, the default storage will be used)
      transcription_storage_name: '<storage name>',
    });
    // #endregion snippet

    // With no participants the processes don't start (see AGENTS.md): assert backstage only.
    const [first, second] = await Promise.all(
      goLive.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.goLive>,
      ),
    );
    expect(first.call.backstage).toBe(false);
    expect(second.call.backstage).toBe(false);
    expect(goLive.mock.calls[1][0]).toMatchObject({
      start_hls: true,
      start_recording: true,
      start_closed_caption: true,
      start_transcription: true,
    });
  });

  it('reads the broadcast state', async () => {
    const call = await createLivestream();

    // #region snippet docs="video/api/03-streaming/08-hls.md" heading="Broadcast state" tab="Node.js" index=1
    const resp = await call.get();
    const isBroadcasting = resp.call.egress.broadcasting;
    // #endregion snippet

    expect(resp.call.cid).toBe(call.cid);
    expect(isBroadcasting).toBe(false);
  });

  it('reads the HLS playlist URL', async () => {
    const call = await createLivestream();

    // #region snippet docs="video/api/03-streaming/08-hls.md" heading="Consuming HLS broadcast" tab="Node.js" index=1
    const resp = await call.get();
    const URL = resp.call.egress.hls?.playlist_url;
    // #endregion snippet

    expect(resp.call.cid).toBe(call.cid);
    // No broadcast is running, so there is no playlist yet.
    expect(URL).toBeUndefined();
  });

  it('creates a call with HLS quality tracks', async () => {
    const myCallId = uniqueId('my-call');
    cleanup.calls.push(`default:${myCallId}`);
    const getOrCreate = vi.spyOn(client.video, 'getOrCreateCall');

    // #region snippet docs="video/api/03-streaming/08-hls.md" heading="Multitracking" tab="Node.js" index=1
    // COPY: myCallId="my-call", johnId="john"
    const callType = 'default';
    const callId = myCallId;
    const call = client.video.call(callType, callId);

    // optionally provide additional data
    await call.getOrCreate({
      data: {
        created_by_id: johnId,
        settings_override: {
          broadcasting: {
            enabled: true,
            hls: {
              quality_tracks: ['720p', '480p', '360p'],
            },
          },
        },
      },
    });
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0].value as ReturnType<
      typeof client.video.getOrCreateCall
    >);
    expect(response.created).toBe(true);
    expect(response.call.cid).toBe(call.cid);
    expect(response.call.settings.broadcasting).toMatchObject({
      enabled: true,
      hls: { quality_tracks: ['720p', '480p', '360p'] },
    });
  });
});
