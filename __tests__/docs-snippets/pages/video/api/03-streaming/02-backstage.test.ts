import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { OwnCapability } from '../../../../../../index';
import { createCallType } from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'video/api/03-streaming/02-backstage.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  let callTypeName: string;

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
    callTypeName = await createCallType(client, cleanup);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a call in backstage mode with a join ahead time', async () => {
    const outgoingCallId = uniqueId('test-outgoing-call');
    cleanup.calls.push(`livestream:${outgoingCallId}`);
    const getOrCreate = vi.spyOn(client.video, 'getOrCreateCall');

    // #region snippet docs="video/api/03-streaming/02-backstage.md" heading="Configuration" tab="Node.js" index=1
    // COPY: outgoingCallId="test-outgoing-call", johnId="john"
    const startsAt = new Date(Date.now() + 30 * 60 * 1000);
    await client.video.call('livestream', outgoingCallId).getOrCreate({
      data: {
        starts_at: startsAt,
        created_by_id: johnId,
        settings_override: {
          backstage: {
            enabled: true,
            join_ahead_time_seconds: 300,
          },
        },
      },
    });
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0].value as ReturnType<
      typeof client.video.getOrCreateCall
    >);
    expect(response.created).toBe(true);
    expect(response.call.backstage).toBe(true);
    expect(response.call.starts_at?.getTime()).toBe(startsAt.getTime());
    expect(response.call.join_ahead_time_seconds).toBe(300);
    expect(response.call.settings.backstage).toMatchObject({
      enabled: true,
      join_ahead_time_seconds: 300,
    });
  });

  it('changes the backstage settings on the call and on the call type', async () => {
    const call = await createLivestream();
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/03-streaming/02-backstage.md" heading="Configuration" tab="Node.js" index=2
    // COPY: callTypeName="<call type name>"
    // call level
    await call.update({
      settings_override: {
        backstage: {
          enabled: true,
          join_ahead_time_seconds: 300,
        },
      },
    });

    // or call type level
    await client.video.updateCallType({
      name: callTypeName,
      settings: {
        backstage: {
          enabled: true,
          join_ahead_time_seconds: 300,
        },
      },
    });
    // #endregion snippet

    const { call: updated } = await call.get();
    expect(updated.settings.backstage).toMatchObject({
      enabled: true,
      join_ahead_time_seconds: 300,
    });
    const callType = await (updateCallType.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    expect(callType.settings.backstage).toMatchObject({
      enabled: true,
      join_ahead_time_seconds: 300,
    });
  });

  it('grants join-backstage to hosts', async () => {
    const before = await client.video.getCallType({ name: callTypeName });
    expect(before.grants.host ?? []).not.toContain(
      OwnCapability.JOIN_BACKSTAGE,
    );
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/03-streaming/02-backstage.md" heading="Backstage Permissions" tab="Node.js" index=1
    // COPY: callTypeName="<call type name>"
    await client.video.updateCallType({
      name: callTypeName,
      grants: {
        host: [OwnCapability.JOIN_BACKSTAGE],
      },
    });
    // #endregion snippet

    const response = await (updateCallType.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    expect(response.grants.host).toContain(OwnCapability.JOIN_BACKSTAGE);
  });

  it('goes live', async () => {
    const call = await createLivestream();
    const goLive = vi.spyOn(client.video, 'goLive');

    // #region snippet docs="video/api/03-streaming/02-backstage.md" heading="Go Live" tab="Node.js" index=1
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
  });

  it('stops live', async () => {
    const call = await createLivestream();
    await call.goLive();
    expect((await call.get()).call.backstage).toBe(false);
    const stopLive = vi.spyOn(client.video, 'stopLive');

    // #region snippet docs="video/api/03-streaming/02-backstage.md" heading="Stop Live" tab="Node.js" index=1
    await call.stopLive();

    await call.stopLive({
      // Optionally prevent stoping HLS broadcast
      continue_hls: true,
      // Optionally prevent stoping recording
      continue_recording: true,
      // Optionally prevent stoping closed captions
      continue_closed_caption: true,
      // Optionally prevent stoping call transcription
      continue_transcription: true,
    });
    // #endregion snippet

    const [first, second] = await Promise.all(
      stopLive.mock.results.map(
        (r) => r.value as ReturnType<typeof client.video.stopLive>,
      ),
    );
    expect(first.call.backstage).toBe(true);
    expect(second.call.backstage).toBe(true);
    expect((await call.get()).call.backstage).toBe(true);
  });
});
