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

const DOCS = 'video/api/03-streaming/09-rtmp_broadcast.md';

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

  it('sets the RTMP quality and layout on a call type', async () => {
    // The docs update the built-in `livestream` type: run it on a test call type.
    const callTypeName = await createCallType(client, cleanup);
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/03-streaming/09-rtmp_broadcast.md" heading="Configuring the layout for your rtmp broadcast" tab="Node.js" index=1
    // COPY: callTypeName="livestream"
    await client.video.updateCallType({
      name: callTypeName,
      settings: {
        broadcasting: {
          enabled: true,
          rtmp: {
            enabled: true,
            quality: '1080p',
            layout: {
              name: 'spotlight',
            },
          },
        },
      },
    });
    // #endregion snippet

    const response = await (updateCallType.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    expect(response.name).toBe(callTypeName);
    expect(response.settings.broadcasting.enabled).toBe(true);
    expect(response.settings.broadcasting.rtmp).toMatchObject({
      enabled: true,
      quality: '1080p',
      layout: { name: 'spotlight' },
    });
  });

  /**
   * A livestream with a call session (john, the creator, may join the backstage)
   * and a safety stop of every RTMP broadcast in cleanup.
   */
  const createJoinedLivestream = async () => {
    const call = await createLivestream();
    await joinCallAsUser(call, johnId);
    cleanup.add(() => call.stopAllRTMPBroadcasts().catch(() => undefined));
    return call;
  };

  /** The broadcast the docs start (the RTMP target is a placeholder). */
  const youtubeBroadcast = {
    name: 'youtube_channel',
    stream_url: 'rtmps://x.rtmps.youtube.com/live2',
    stream_key: 'your_stream_key',
  };

  // The start is accepted (201), but the placeholder target never connects:
  // `egress.rtmps` stays empty (2026-10-16).
  it('starts an RTMP broadcast', async () => {
    const call = await createJoinedLivestream();
    const startRTMP = vi.spyOn(client.video, 'startRTMPBroadcasts');

    // #region snippet docs="video/api/03-streaming/09-rtmp_broadcast.md" heading="Starting an RTMP broadcast" tab="Node.js" index=1
    await call.startRTMPBroadcasts({
      broadcasts: [
        {
          name: 'youtube_channel',
          stream_url: 'rtmps://x.rtmps.youtube.com/live2',
          stream_key: 'your_stream_key',
        },
      ],
    });
    // #endregion snippet

    expect(startRTMP).toHaveBeenCalledWith({
      type: call.type,
      id: call.id,
      broadcasts: [youtubeBroadcast],
    });
    const response = await (startRTMP.mock.results[0].value as ReturnType<
      typeof client.video.startRTMPBroadcasts
    >);
    expect(response.metadata.responseCode).toBe(201);
  });

  it('stops an RTMP broadcast by name', async () => {
    const call = await createJoinedLivestream();
    await call.startRTMPBroadcasts({ broadcasts: [youtubeBroadcast] });
    const stopRTMP = vi.spyOn(client.video, 'stopRTMPBroadcast');

    // #region snippet docs="video/api/03-streaming/09-rtmp_broadcast.md" heading="Stopping an RTMP broadcast by name" tab="Node.js" index=1
    await call.stopRTMPBroadcast({ name: 'youtube_channel' });
    // #endregion snippet

    expect(stopRTMP).toHaveBeenCalledWith({
      type: call.type,
      id: call.id,
      name: 'youtube_channel',
    });
    const { call: data } = await call.get();
    expect(data.egress.rtmps).toEqual([]);
  });

  it('stops all RTMP broadcasts of a call', async () => {
    const call = await createJoinedLivestream();
    await call.startRTMPBroadcasts({ broadcasts: [youtubeBroadcast] });
    const stopAll = vi.spyOn(client.video, 'stopAllRTMPBroadcasts');

    // #region snippet docs="video/api/03-streaming/09-rtmp_broadcast.md" heading="Stopping all RTMP broadcasts for a call" tab="Node.js" index=1
    await call.stopAllRTMPBroadcasts();
    // #endregion snippet

    expect(stopAll).toHaveBeenCalledWith({ type: call.type, id: call.id });
    const { call: data } = await call.get();
    expect(data.egress.rtmps).toEqual([]);
  });

  it('reads the RTMP broadcast state', async () => {
    const call = await createLivestream();

    // #region snippet docs="video/api/03-streaming/09-rtmp_broadcast.md" heading="RTMP broadcast state" tab="Node.js" index=1
    const resp = await call.get();

    // If HLS or any RTMP broadcast active
    const isBroadcasting = resp.call.egress.broadcasting;

    // Only check for RTMP broadcasts
    const rtmpBroadcasts = resp.call.egress.rtmps;
    const isRtmpBroadcasting = rtmpBroadcasts.length > 0;
    // #endregion snippet

    expect(resp.call.cid).toBe(call.cid);
    expect(isBroadcasting).toBe(false);
    expect(rtmpBroadcasts).toEqual([]);
    expect(isRtmpBroadcasting).toBe(false);
  });
});
