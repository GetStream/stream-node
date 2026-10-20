import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { StreamCall } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'video/api/03-streaming/01-overview.md';

/** Reads the JSON payload of a JWT. */
const jwtPayload = (token: string) =>
  JSON.parse(
    Buffer.from(token.split('.')[1], 'base64url').toString('utf8'),
  ) as Record<string, unknown>;

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  const janeId = uniqueId('jane');
  const callId = uniqueId('livestream');
  /** The call the quickstart creates; the later fences use it. */
  let liveCall: StreamCall;

  beforeAll(async () => {
    cleanup.users.push(johnId, janeId);
    cleanup.calls.push(`livestream:${callId}`);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a livestream call', async () => {
    // #region snippet docs="video/api/03-streaming/01-overview.md" heading="Create a new livestream call using the API" tab="Node.js" index=1
    // COPY: johnId="john"
    const call = client.video.call('livestream', callId);
    const response = await call.getOrCreate({
      data: {
        created_by_id: johnId,
        // You can add multiple hosts if you want to
        members: [{ user_id: johnId, role: 'host' }],
      },
    });
    // #endregion snippet

    liveCall = call;
    expect(response.created).toBe(true);
    expect(response.call.cid).toBe(`livestream:${callId}`);
    expect(response.call.created_by.id).toBe(johnId);
    // Livestreams are created in backstage mode
    expect(response.call.backstage).toBe(true);
    expect(response.members.map((m) => [m.user_id, m.role])).toEqual([
      [johnId, 'host'],
    ]);
  });

  it('sets the call live', async () => {
    const call = liveCall;
    const goLive = vi.spyOn(client.video, 'goLive');

    // #region snippet docs="video/api/03-streaming/01-overview.md" heading="Set the call live" tab="Node.js" index=1
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
    const { call: live } = await call.get();
    expect(live.backstage).toBe(false);
  });

  it('logs the RTMP URL and stream key', async () => {
    const call = liveCall;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="video/api/03-streaming/01-overview.md" heading="Log the URL & Stream Key" tab="Node.js" index=1
    // COPY: janeId="jane"
    const resp = await call.get();

    // userId of existing user
    const userId = janeId;
    await client.upsertUsers([{ id: userId }]);
    const token = client.generateUserToken({ user_id: userId });
    const rtmpURL = resp.call.ingress.rtmp.address;
    const streamKey = token;

    console.log(rtmpURL, streamKey);
    // #endregion snippet

    expect(rtmpURL).toMatch(/^rtmps:\/\//);
    expect(rtmpURL).toContain(`livestream.${callId}`);
    expect(jwtPayload(streamKey).user_id).toBe(janeId);
    expect(log.mock.calls[0]).toEqual([rtmpURL, streamKey]);
    const { users } = await client.queryUsers({
      payload: { filter_conditions: { id: janeId } },
    });
    expect(users.map((u) => u.id)).toEqual([janeId]);
  });
});
