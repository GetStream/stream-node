import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  loadRtcNativeBinding,
  resetRtcNativeBindingCache,
} from '../../src/rtc/native';
import {
  RtcNativeUnavailableError,
  RtcNativeVersionMismatchError,
  RtcUnsupportedPlatformError,
} from '../../src/rtc/errors';
import { LocalAudioTrack } from '../../src/rtc/tracks';
import type { RtpPacket } from '../../src/rtc/types';

const NATIVE_PATH = 'STREAM_NODE_RTC_NATIVE_PATH';

/**
 * Write a CommonJS stand-in for the addon. `loadCount` on globalThis proves how
 * many times the loader actually pulled it off disk.
 */
const writeFixture = (source: string) => {
  const directory = mkdtempSync(join(tmpdir(), 'stream-rtc-'));
  const file = join(directory, 'addon.cjs');
  writeFileSync(file, source);
  return file;
};

const validFixture = (version: number | string = 1) =>
  writeFixture(`
    globalThis.__rtcLoadCount = (globalThis.__rtcLoadCount ?? 0) + 1;
    class NativeCall {
      join() {} leave() {} stateJson() {} statsJson() {}
      nextEvent() {} nextRemoteTrack() {} requestPermissions() {}
      setDisconnectionTimeout() {} updatePublishOptions() {}
      updateSubscriptions() {} updateSubscriptionTargets() {}
      setIncomingVideoEnabled() {} publishAudio() {} publishVideo() {}
      publishScreenShare() {} publishScreenShareAudio() {}
      stopPublishAudio() {} stopPublishVideo() {} muteTrack() {}
      unmuteTrack() {} startNoiseCancellation() {} stopNoiseCancellation() {}
    }
    class NativeLocalAudioTrack {
      static opus() { return new NativeLocalAudioTrack(); }
      writePcm(data) {
        globalThis.__rtcWriteSnapshot = {
          received: data,
          copied: Buffer.from(data),
        };
        return Promise.resolve();
      }
      writeEncoded() {}
      writeRtp(packet) {
        globalThis.__rtcRtpSnapshot = {
          received: packet,
          csrc: [...packet.csrc],
          payload: Buffer.from(packet.payload),
          extensions: packet.extensions.map((extension) => ({
            ...extension,
            payload: Buffer.from(extension.payload),
          })),
        };
        return Promise.resolve();
      }
      flush() {}
    }
    class NativeLocalVideoTrack {
      static vp8() { return new NativeLocalVideoTrack(); }
      static vp9() { return new NativeLocalVideoTrack(); }
      static h264() { return new NativeLocalVideoTrack(); }
      writeI420() {} writeEncoded() {} writeRtp() {}
    }
    class NativeRemoteTrack {
      nextPcm() {} nextVideoFrame() {} readRtp() {}
      drainRtp() {} requestKeyframe() {}
    }
    module.exports = {
      bindingApiVersion: ${version},
      NativeCall,
      NativeStreamClient: class { call() { return new NativeCall(); } },
      NativeLocalAudioTrack,
      NativeLocalVideoTrack,
      NativeRemoteTrack,
    };
  `);

describe('RTC native loader', () => {
  const originalPath = process.env[NATIVE_PATH];

  beforeEach(() => {
    resetRtcNativeBindingCache();
    (globalThis as Record<string, unknown>).__rtcLoadCount = 0;
    (globalThis as Record<string, unknown>).__rtcWriteSnapshot = undefined;
    (globalThis as Record<string, unknown>).__rtcRtpSnapshot = undefined;
  });

  afterEach(() => {
    resetRtcNativeBindingCache();
    if (originalPath === undefined) delete process.env[NATIVE_PATH];
    else process.env[NATIVE_PATH] = originalPath;
  });

  it('loads the addon from an absolute path exactly once', () => {
    process.env[NATIVE_PATH] = validFixture();

    const first = loadRtcNativeBinding();
    const second = loadRtcNativeBinding();

    expect(second).toBe(first);
    expect((globalThis as Record<string, unknown>).__rtcLoadCount).toBe(1);
  });

  it('rejects a relative native path', () => {
    process.env[NATIVE_PATH] = './addon.node';

    expect(() => loadRtcNativeBinding()).toThrow(RtcNativeUnavailableError);
    expect((globalThis as Record<string, unknown>).__rtcLoadCount).toBe(0);
  });

  it('reports an actionable error when the path does not resolve', () => {
    process.env[NATIVE_PATH] = join(tmpdir(), 'stream-rtc-missing.node');

    expect(() => loadRtcNativeBinding()).toThrow(/STREAM_NODE_RTC_NATIVE_PATH/);
  });

  it('rejects an addon missing required exports', () => {
    process.env[NATIVE_PATH] = writeFixture(
      'module.exports = { bindingApiVersion: 1 };',
    );

    expect(() => loadRtcNativeBinding()).toThrow(/invalid NativeStreamClient/);
  });

  it('rejects an incompatible binding API version', () => {
    process.env[NATIVE_PATH] = validFixture(99);

    let error: unknown;
    try {
      loadRtcNativeBinding();
    } catch (caught) {
      error = caught;
    }

    expect(error).toBeInstanceOf(RtcNativeVersionMismatchError);
    expect((error as RtcNativeVersionMismatchError).details).toMatchObject({
      actual: 99,
      expected: 1,
    });
  });

  it('accepts a binding that exposes its version as a getter function', () => {
    process.env[NATIVE_PATH] = validFixture('() => 1');

    expect(() => loadRtcNativeBinding()).not.toThrow();
  });

  it('never loads the addon for SDK import or REST-only usage', async () => {
    // An addon that explodes on load: nothing on the REST path may require it.
    process.env[NATIVE_PATH] = writeFixture(
      'throw new Error("the addon must not be loaded here");',
    );

    const sdk = await import('../../index');
    const client = new sdk.StreamClient('key', 'secret');
    const restCall = client.video.call('default', 'rest-only');

    expect(restCall.cid).toBe('default:rest-only');
    expect(restCall.state.callingState).toBe('idle');
    expect(restCall.state.participants).toEqual([]);
    expect(client.video.call('default', 'another').cid).toBe('default:another');
    expect((globalThis as Record<string, unknown>).__rtcLoadCount).toBe(0);
  });

  it('hands media to the native copy boundary synchronously', async () => {
    process.env[NATIVE_PATH] = validFixture();
    const track = LocalAudioTrack.opus();
    const pcm = Buffer.from([1, 2, 3, 4]);
    const originalPcm = Buffer.from(pcm);

    const pcmWrite = track.writePcm(pcm, {
      sampleRate: 48_000,
      channels: 1,
    });
    const pcmSnapshot = (globalThis as Record<string, unknown>)
      .__rtcWriteSnapshot as { received: Buffer; copied: Buffer };
    pcm.fill(0);
    await pcmWrite;

    expect(pcmSnapshot.received).toBe(pcm);
    expect(pcmSnapshot.copied).toEqual(originalPcm);

    const packet: RtpPacket = {
      version: 2,
      padding: false,
      extension: true,
      marker: false,
      payloadType: 111,
      sequenceNumber: 1,
      timestamp: 2,
      ssrc: 3,
      csrc: [4],
      extensionProfile: 0xbede,
      extensions: [{ id: 1, payload: Buffer.from([5, 6]) }],
      extensionsPadding: 0,
      payload: Buffer.from([7, 8]),
    };
    const rtpWrite = track.writeRtp(packet);
    const rtpSnapshot = (globalThis as Record<string, unknown>)
      .__rtcRtpSnapshot as {
      received: RtpPacket;
      csrc: number[];
      payload: Buffer;
      extensions: Array<{ id: number; payload: Buffer }>;
    };
    packet.csrc[0] = 0;
    packet.extensions[0].payload.fill(0);
    packet.payload.fill(0);
    await rtpWrite;

    expect(rtpSnapshot.received).toBe(packet);
    expect(rtpSnapshot.csrc).toEqual([4]);
    expect(rtpSnapshot.extensions[0].payload).toEqual(Buffer.from([5, 6]));
    expect(rtpSnapshot.payload).toEqual(Buffer.from([7, 8]));
  });

  it('refuses unsupported platforms before touching the filesystem', () => {
    process.env[NATIVE_PATH] = validFixture();
    const descriptor = Object.getOwnPropertyDescriptor(process, 'platform')!;
    Object.defineProperty(process, 'platform', { value: 'win32' });

    try {
      expect(() => loadRtcNativeBinding()).toThrow(RtcUnsupportedPlatformError);
      expect((globalThis as Record<string, unknown>).__rtcLoadCount).toBe(0);
    } finally {
      Object.defineProperty(process, 'platform', descriptor);
    }
  });
});
