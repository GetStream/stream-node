import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { afterAll, describe, expect, it } from 'vitest';

import { StreamClient } from '../../src/StreamClient';
import type { StreamCall } from '../../src/StreamCall';
import { LocalAudioTrack, LocalVideoTrack } from '../../src/rtc/tracks';
import type { RemoteTrack } from '../../src/rtc/tracks';
import {
  createNeonTimeSlice,
  createRobotVoice,
} from '../../examples/rtc-neon-effects.mjs';

/*
 * The provider-free agent scenario: a publisher sends audio and video, a
 * backend agent joins, receives both, transforms them deterministically, and
 * publishes the result back where the publisher can observe it.
 *
 * Needs live credentials and a locally built addon:
 *   export RUN_STREAM_RTC_LIVE=1
 *   export STREAM_API_KEY=... STREAM_SECRET=...
 *   export STREAM_NODE_RTC_NATIVE_PATH=/abs/path/to/stream-node-rtc.node
 */
const apiKey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_SECRET;
const live = Boolean(
  process.env.RUN_STREAM_RTC_LIVE === '1' &&
  apiKey &&
  secret &&
  process.env.STREAM_NODE_RTC_NATIVE_PATH,
);

const SAMPLE_RATE = 48_000;
const AUDIO_FRAME_SAMPLES = SAMPLE_RATE / 50; // 20ms
const WIDTH = 320;
const HEIGHT = 240;
const LUMA_SIZE = WIDTH * HEIGHT;
const SOURCE_LUMA = 200;
const SOURCE_AMPLITUDE = 12_000;
const MEDIA_DURATION_MS = 12_000;

/** A deterministic 440Hz tone at a known amplitude. */
const toneFrame = (index: number) => {
  const data = Buffer.alloc(AUDIO_FRAME_SAMPLES * 2);
  for (let i = 0; i < AUDIO_FRAME_SAMPLES; i += 1) {
    const t = (index * AUDIO_FRAME_SAMPLES + i) / SAMPLE_RATE;
    const value = Math.sin(2 * Math.PI * 440 * t) * SOURCE_AMPLITUDE;
    data.writeInt16LE(Math.round(value), i * 2);
  }
  return data;
};

/** A flat I420 frame: constant luma, neutral chroma. */
const videoFrame = (luma: number) => {
  const data = Buffer.alloc(LUMA_SIZE * 1.5);
  data.fill(luma, 0, LUMA_SIZE);
  data.fill(128, LUMA_SIZE);
  return data;
};

const rms = (buffer: Buffer) => {
  let sum = 0;
  const count = buffer.length / 2;
  for (let i = 0; i < count; i += 1) {
    const sample = buffer.readInt16LE(i * 2);
    sum += sample * sample;
  }
  return Math.sqrt(sum / Math.max(1, count));
};

const meanLuma = (data: Buffer) => {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < LUMA_SIZE; i += 64) {
    sum += data[i];
    count += 1;
  }
  return sum / count;
};

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));

describe.runIf(live)('provider-free agent scenario', () => {
  // Built inside the test: `describe.runIf` still evaluates this body when the
  // suite is skipped, and the credentials are absent then.
  const callId = `rtc-agent-${randomUUID()}`;
  const publisherId = `publisher-${randomUUID().slice(0, 8)}`;
  const agentId = `agent-${randomUUID().slice(0, 8)}`;

  let publisherCall: StreamCall;
  let agentCall: StreamCall;

  afterAll(async () => {
    await agentCall?.leave().catch(() => {});
    await publisherCall?.leave().catch(() => {});
    await publisherCall?.end().catch(() => {});
  });

  it(
    'receives, transforms, and republishes both audio and video',
    { timeout: 120_000 },
    async () => {
      const client = new StreamClient(apiKey!, secret!, { timeout: 30_000 });

      await client.upsertUsers([
        { id: publisherId, name: 'Publisher' },
        { id: agentId, name: 'Agent' },
      ]);

      publisherCall = client.video.call('default', callId);
      agentCall = client.video.call('default', callId);
      await publisherCall.create({ data: { created_by_id: publisherId } });

      // Pin the codec so both sides negotiate the same encoder.
      publisherCall.updatePublishOptions({ preferredVideoCodec: 'vp9' });
      agentCall.updatePublishOptions({ preferredVideoCodec: 'vp9' });

      const sourceAudio = LocalAudioTrack.opus();
      const sourceVideo = LocalVideoTrack.vp9({ targetBitrateBps: 600_000 });
      const agentAudio = LocalAudioTrack.opus();
      const agentVideo = LocalVideoTrack.vp9({ targetBitrateBps: 600_000 });

      const agentAudioIn = { frames: 0 };
      const agentVideoIn = { frames: 0, luma: [] as number[] };

      const transformAudio = createRobotVoice();
      const transformVideo = createNeonTimeSlice();

      // The agent runs the same transforms as the runnable Neon example.
      agentCall.on('remoteTrack', (track: RemoteTrack) => {
        void (async () => {
          if (track.type === 'audio') {
            for (;;) {
              const frame = await track.nextPcm();
              if (!frame) break;
              agentAudioIn.frames += 1;
              const output = transformAudio(frame);
              await agentAudio.writePcm(output.data, {
                sampleRate: output.sampleRate,
                channels: output.channels,
              });
            }
          } else if (track.type === 'video') {
            for (;;) {
              const frame = await track.nextVideoFrame();
              if (!frame) break;
              agentVideoIn.frames += 1;
              agentVideoIn.luma.push(meanLuma(frame.data));
              const output = transformVideo(frame);
              await agentVideo.writeI420(output.data, {
                width: output.width,
                height: output.height,
                durationMs: 33,
              });
            }
          }
        })();
      });

      // The publisher verifies the agent's response.
      const back = {
        audio: 0,
        video: 0,
        peakRms: 0,
        minLuma: 255,
        maxLuma: 0,
        responders: new Set<string>(),
      };
      publisherCall.on('remoteTrack', (track: RemoteTrack) => {
        void (async () => {
          back.responders.add(track.userId);
          if (track.type === 'audio') {
            for (;;) {
              const frame = await track.nextPcm();
              if (!frame) break;
              back.audio += 1;
              back.peakRms = Math.max(back.peakRms, rms(frame.data));
            }
          } else if (track.type === 'video') {
            for (;;) {
              const frame = await track.nextVideoFrame();
              if (!frame) break;
              back.video += 1;
              const lumaSize = frame.width * frame.height;
              for (let index = 0; index < lumaSize; index += 97) {
                back.minLuma = Math.min(back.minLuma, frame.data[index]);
                back.maxLuma = Math.max(back.maxLuma, frame.data[index]);
              }
            }
          }
        })();
      });

      await publisherCall.join({ userId: publisherId });
      await agentCall.join({ userId: agentId });

      expect(publisherCall.state.callingState).toBe('joined');
      expect(agentCall.state.callingState).toBe('joined');
      expect(publisherCall.state.sessionId).toBeTruthy();

      const subscription = { audio: true, video: true } as const;
      await agentCall.updateSubscriptions(subscription);
      await publisherCall.updateSubscriptions(subscription);

      await publisherCall.publishAudio(sourceAudio);
      await publisherCall.publishVideo(sourceVideo);
      await agentCall.publishAudio(agentAudio);
      await agentCall.publishVideo(agentVideo);

      // Feed media at wall-clock rate: writes queue, so the producer paces.
      const started = Date.now();
      let audioIndex = 0;
      let videoIndex = 0;
      while (Date.now() < started + MEDIA_DURATION_MS) {
        await sourceAudio.writePcm(toneFrame(audioIndex++), {
          sampleRate: SAMPLE_RATE,
          channels: 1,
        });
        if (Date.now() - started >= videoIndex * 33) {
          await sourceVideo.writeI420(videoFrame(SOURCE_LUMA), {
            width: WIDTH,
            height: HEIGHT,
            durationMs: 33,
          });
          videoIndex += 1;
        }
        await sleep(started + audioIndex * 20 - Date.now());
      }

      // Each participant sees the other.
      expect(
        publisherCall.state.participants.map((p) => p.userId).sort(),
      ).toEqual([agentId, publisherId].sort());
      expect(agentCall.state.remoteParticipants.map((p) => p.userId)).toContain(
        publisherId,
      );

      // The agent received both kinds of media.
      expect(agentAudioIn.frames).toBeGreaterThan(100);
      expect(agentVideoIn.frames).toBeGreaterThan(20);
      expect(agentCall.state.remoteTracks.map((t) => t.type).sort()).toEqual([
        'audio',
        'video',
      ]);

      // I420 round-trips exactly for a flat frame, so the source luma is intact.
      const averageLuma =
        agentVideoIn.luma.reduce((sum, value) => sum + value, 0) /
        agentVideoIn.luma.length;
      expect(averageLuma).toBeGreaterThan(SOURCE_LUMA - 12);
      expect(averageLuma).toBeLessThan(SOURCE_LUMA + 12);

      // The publisher heard and saw the agent's response.
      expect(back.responders).toContain(agentId);
      expect(back.audio).toBeGreaterThan(100);
      expect(back.video).toBeGreaterThan(20);

      // The transforms are observable after both codec round trips.
      const sourceRms = SOURCE_AMPLITUDE / Math.SQRT2;
      expect(back.peakRms).toBeGreaterThan(sourceRms * 0.2);
      expect(back.peakRms).toBeLessThan(sourceRms * 1.05);
      expect(back.minLuma).toBeLessThan(60);
      expect(back.maxLuma).toBeGreaterThan(180);

      // Leaving releases every pending reader and reaches the terminal state.
      await agentCall.leave();
      await publisherCall.leave();
      expect(agentCall.state.callingState).toBe('left');
      expect(publisherCall.state.callingState).toBe('left');
      expect(agentCall.state.remoteTracks).toHaveLength(0);
    },
  );
});
