import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamCall } from '../src/StreamCall';
import { StreamClient } from '../src/StreamClient';

describe('call API', () => {
  let client: StreamClient;
  const callId = `call${uuidv4()}`;
  let call: StreamCall;

  beforeAll(async () => {
    client = createTestClient();

    call = client.video.call('default', callId);

    await client.upsertUsers([{ name: 'John', id: 'john' }]);
  });

  it('create', async () => {
    const response = await call.create({
      data: {
        created_by_id: 'john',
        settings_override: {
          geofencing: {
            names: ['canada'],
          },
          screensharing: {
            enabled: false,
          },
        },
        custom: {
          color: 'blue',
        },
      },
    });

    expect(response.call.created_by.id).toBe('john');
    expect(response.call.settings.geofencing.names).toEqual(['canada']);
    expect(response.call.settings.screensharing.enabled).toBe(false);
    expect(response.call.custom.color).toBe('blue');
  });

  it('send custom event', async () => {
    const response = await call.sendCallEvent({
      custom: {
        'render-animation': 'balloons',
      },
      user_id: 'john',
    });

    expect(response.duration).toBeDefined();
  });

  it('update', async () => {
    const response = await call.update({
      settings_override: {
        audio: { mic_default_on: true, default_device: 'speaker' },
        screensharing: { enabled: true, access_request_enabled: true },
      },
      custom: { color: 'red' },
    });

    expect(response.call.settings.audio.mic_default_on).toBe(true);
    expect(response.call.custom.color).toBe('red');
  });

  it('RTMP address', async () => {
    const resp = await call.get();

    // userId of existing user
    const userId = 'jane';
    await client.upsertUsers([
      {
        id: userId,
      },
    ]);
    const token = client.createToken(userId);
    const rtmpURL = resp.call.ingress.rtmp.address;
    const streamKey = token;

    expect(rtmpURL).toBeDefined();
    expect(streamKey).toBeDefined();
  });

  it('query calls', async () => {
    let response = await client.video.queryCalls();

    let calls = response.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);

    const queryCallsReq = {
      sort: [{ field: 'starts_at', direction: -1 }],
      limit: 2,
    };
    response = await client.video.queryCalls(queryCallsReq);

    calls = response.calls;
    expect(calls.length).toBe(2);

    response = await client.video.queryCalls({
      ...queryCallsReq,
      next: response.next,
    });

    expect(response.calls.length).toBeLessThanOrEqual(2);

    response = await client.video.queryCalls({
      filter_conditions: { backstage: { $eq: false } },
    });

    expect(response.calls.length).toBeGreaterThanOrEqual(1);
  });

  it('query calls - ongoing', async () => {
    const response = await client.video.queryCalls({
      filter_conditions: { ongoing: { $eq: true } },
    });

    // Dummy test
    expect(response.calls).toBeDefined();
  });

  it('query calls - upcoming', async () => {
    const mins30 = 1000 * 60 * 60 * 30;
    const inNext30mins = new Date(Date.now() + mins30);
    const response = await client.video.queryCalls({
      filter_conditions: {
        starts_at: { $gt: inNext30mins.toISOString() },
      },
    });

    // Dummy test
    expect(response.calls).toBeDefined();
  });

  it('query call stats - single call', async () => {
    const response = await client.video.queryCallStats({
      filter_conditions: { call_cid: call.cid },
    });

    expect(response.reports).toBeDefined();
  });

  describe('recording', () => {
    it('enable call recording', async () => {
      let response = await call.update({
        settings_override: {
          recording: {
            mode: 'disabled',
            audio_only: true,
          },
        },
      });
      let settings = response.call.settings.recording;

      expect(settings.mode).toBe('disabled');

      response = await call.update({
        settings_override: {
          recording: {
            mode: 'available',
            // TODO: backend had a regression recently
            quality: '1080p',
          },
        },
      });

      settings = response.call.settings.recording;
      expect(settings.mode).toBe('available');

      response = await call.update({
        settings_override: {
          recording: {
            audio_only: false,
            quality: '1080p',
            mode: 'auto-on',
          },
        },
      });

      settings = response.call.settings.recording;
      expect(settings.audio_only).toBe(false);
      expect(settings.quality).toBe('1080p');
    });

    it('start recording', async () => {
      // somewhat dummy test, we should do a proper test in the future where we join a call and start recording
      await expect(() => call.startRecording()).rejects.toThrowError(
        'Stream error code 4: StartRecording failed with error: "there is no active session"',
      );
    });
  });

  it('enable backstage mode', async () => {
    const response = await call.update({
      settings_override: {
        backstage: {
          enabled: true,
        },
      },
    });

    expect(response.call.settings.backstage.enabled).toBe(true);
  });

  it('go live', async () => {
    const response = await call.goLive();

    expect(response.call.backstage).toBe(false);
  });

  it('stop live', async () => {
    const response = await call.stopLive();

    expect(response.call.backstage).toBe(true);
  });

  describe.skip('transcriptions', () => {
    it('start transcribing', async () => {
      // somewhat dummy test, we should do a proper test in the future where we join a call and start recording
      await expect(() => call.startTranscription()).rejects.toThrowError(
        'Stream error code 4: StartTranscription failed with error: "there is no active session"',
      );
    });

    it('stop transcribing', async () => {
      // somewhat dummy test, we should do a proper test in the future
      await expect(() => call.stopTranscription()).rejects.toThrowError(
        'Stream error code 4: StopTranscription failed with error: "call is not being transcribed"',
      );
    });

    it('delete transcription', async () => {
      // somewhat dummy test, we should do a proper test in the future
      await expect(() =>
        call.deleteTranscription({ session: 'test', filename: 'test' }),
      ).rejects.toThrowError(
        `Stream error code 16: DeleteTranscription failed with error: "transcription doesn't exist"`,
      );
    });
  });

  it('delete call', async () => {
    try {
      await call.delete({ hard: true });
    } catch (e) {
      // the first request fails on backend sometimes
      // retry it
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });

      await call.delete({ hard: true });
    }
  });
});
