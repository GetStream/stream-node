import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';

import { StreamClient } from '../../src/StreamClient';
import type { StreamCall } from '../../src/StreamCall';
import type { LocalAudioTrack, LocalVideoTrack } from '../../src/rtc/tracks';
import type { PcmFrame, VideoFrame } from '../../src/rtc/types';

/*
 * Harness for live RTC integration tests.
 *
 * The RTC path spans JavaScript, a native addon, and Stream's SFU; a mocked
 * addon proves only that our own glue is self-consistent. Protocol behaviour is
 * therefore tested against a real call, and only genuinely local behaviour
 * (native-module resolution, error decoding) is unit tested.
 *
 * Needs RUN_STREAM_RTC_LIVE=1, STREAM_API_KEY, STREAM_SECRET, and
 * STREAM_NODE_RTC_NATIVE_PATH. Credentials alone never opt a developer's
 * default test run into network calls or billable RTC resources.
 */
export const liveCredentials = {
  apiKey: process.env.STREAM_API_KEY,
  secret: process.env.STREAM_SECRET,
  nativePath: process.env.STREAM_NODE_RTC_NATIVE_PATH,
};

export const canLoadNative = Boolean(
  liveCredentials.nativePath && existsSync(liveCredentials.nativePath),
);

export const canRunLive = Boolean(
  process.env.RUN_STREAM_RTC_LIVE === '1' &&
  liveCredentials.apiKey &&
  liveCredentials.secret &&
  liveCredentials.nativePath,
);

export const AUDIO_SAMPLE_RATE = 48_000;
export const AUDIO_FRAME_SAMPLES = AUDIO_SAMPLE_RATE / 50; // 20ms
export const VIDEO_WIDTH = 320;
export const VIDEO_HEIGHT = 240;
export const VIDEO_LUMA_SIZE = VIDEO_WIDTH * VIDEO_HEIGHT;

/**
 * Codecs are negotiated per track type, not per call: the default call type
 * advertises VP9 for camera video but VP8 for screen share. Publishing the
 * wrong one fails with RTC_MEDIA naming the codecs actually available.
 */
export const VIDEO_CODEC = 'vp9' as const;
export const SCREEN_SHARE_CODEC = 'vp8' as const;

export const createLiveClient = () =>
  new StreamClient(liveCredentials.apiKey!, liveCredentials.secret!, {
    timeout: 30_000,
  });

export const uniqueId = (prefix: string) =>
  `${prefix}-${randomUUID().slice(0, 12)}`;

/** A deterministic 440Hz tone at a known amplitude. */
export const toneFrame = (index: number, amplitude = 12_000) => {
  const data = Buffer.alloc(AUDIO_FRAME_SAMPLES * 2);
  for (let i = 0; i < AUDIO_FRAME_SAMPLES; i += 1) {
    const t = (index * AUDIO_FRAME_SAMPLES + i) / AUDIO_SAMPLE_RATE;
    data.writeInt16LE(
      Math.round(Math.sin(2 * Math.PI * 440 * t) * amplitude),
      i * 2,
    );
  }
  return data;
};

/** A flat I420 frame: constant luma, neutral chroma. */
export const i420Frame = (luma: number) => {
  const data = Buffer.alloc(VIDEO_LUMA_SIZE * 1.5);
  data.fill(luma, 0, VIDEO_LUMA_SIZE);
  data.fill(128, VIDEO_LUMA_SIZE);
  return data;
};

export const rms = (buffer: Buffer) => {
  let sum = 0;
  const count = buffer.length / 2;
  for (let i = 0; i < count; i += 1) {
    const sample = buffer.readInt16LE(i * 2);
    sum += sample * sample;
  }
  return Math.sqrt(sum / Math.max(1, count));
};

export const meanLuma = (data: Buffer) => {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < VIDEO_LUMA_SIZE; i += 64) {
    sum += data[i];
    count += 1;
  }
  return sum / count;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));

/**
 * Poll until `predicate` holds. Live media takes an unpredictable moment to
 * flow, so tests wait on the condition rather than on a fixed sleep.
 */
export const waitFor = async (
  predicate: () => boolean,
  { timeoutMs = 20_000, label = 'condition' } = {},
) => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await sleep(100);
  }
  throw new Error(`timed out after ${timeoutMs}ms waiting for ${label}`);
};

/**
 * Feed media at wall-clock rate in the background until stopped.
 *
 * Writes queue rather than block, so the producer must pace itself or it
 * overruns the bounded native queue. Returns a stop function; callers wait on
 * an observable condition instead of a fixed duration.
 */
export const startPump = ({
  audio,
  video,
  maxDurationMs = 30_000,
}: {
  audio?: Pick<LocalAudioTrack, 'writePcm'>;
  video?: Pick<LocalVideoTrack, 'writeI420'>;
  maxDurationMs?: number;
}) => {
  let running = true;
  const stop = () => {
    running = false;
  };

  void (async () => {
    const started = Date.now();
    let audioIndex = 0;
    let videoIndex = 0;

    while (running && Date.now() < started + maxDurationMs) {
      try {
        if (audio) {
          await audio.writePcm(toneFrame(audioIndex), {
            sampleRate: AUDIO_SAMPLE_RATE,
            channels: 1,
          });
        }
        audioIndex += 1;

        if (video && Date.now() - started >= videoIndex * 33) {
          await video.writeI420(i420Frame(200), {
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            durationMs: 33,
          });
          videoIndex += 1;
        }
      } catch {
        // The call was left mid-pump; nothing left to feed.
        return;
      }
      await sleep(started + audioIndex * 20 - Date.now());
    }
  })();

  return stop;
};

/** Drain a track's PCM into `sink` until the track ends. */
export const collectPcm = (
  track: { nextPcm: () => Promise<PcmFrame | undefined> },
  sink: { frames: number; peakRms: number },
) =>
  void (async () => {
    for (;;) {
      const frame = await track.nextPcm();
      if (!frame) return;
      sink.frames += 1;
      sink.peakRms = Math.max(sink.peakRms, rms(frame.data));
    }
  })();

/** Drain a track's video frames into `sink` until the track ends. */
export const collectVideo = (
  track: { nextVideoFrame: () => Promise<VideoFrame | undefined> },
  sink: { frames: number; luma: number[] },
) =>
  void (async () => {
    for (;;) {
      const frame = await track.nextVideoFrame();
      if (!frame) return;
      sink.frames += 1;
      sink.luma.push(meanLuma(frame.data));
    }
  })();

/**
 * Tracks every call joined during a test so they are left and ended on
 * success, failure, and timeout alike.
 */
export class LiveCallRegistry {
  private readonly joined: StreamCall[] = [];
  private readonly created: StreamCall[] = [];

  track(call: StreamCall, { created = false } = {}) {
    this.joined.push(call);
    if (created) this.created.push(call);
    return call;
  }

  async cleanup() {
    for (const call of this.joined.reverse()) {
      await call.leave().catch(() => {});
    }
    this.joined.length = 0;
    // End the call server-side so the test leaves nothing running.
    for (const call of this.created.reverse()) {
      await call.end().catch(() => {});
    }
    this.created.length = 0;
  }
}
