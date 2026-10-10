import 'dotenv/config';
import { describe, expect, it } from 'vitest';

import {
  RtcClosedError,
  RtcConnectionError,
  RtcError,
  RtcIllegalStateError,
  RtcNativeUnavailableError,
  RtcNativeVersionMismatchError,
  RtcNegotiationError,
  RtcPermissionDeniedError,
  RtcQueueOverflowError,
  RtcSizeLimitError,
  RtcTimeoutError,
  RtcUnsupportedPlatformError,
  toRtcError,
} from '../../src/rtc/errors';
import { LocalAudioTrack, LocalVideoTrack } from '../../src/rtc/tracks';
import { canLoadNative } from './live';

/*
 * Error decoding is pure local logic over an Error object, so it is unit
 * tested. The construction cases below use the real addon — its validation is
 * exactly what we want to assert, and faking it would prove nothing.
 */
const encoded = (
  code: string,
  message: string,
  details: Record<string, unknown> = {},
) => new Error(JSON.stringify({ code, message, details }));

describe('RTC error decoding', () => {
  it('decodes a structured native error into its code and details', () => {
    const error = toRtcError(
      encoded('RTC_PERMISSION_DENIED', 'missing send-audio', {
        capability: 'send-audio',
      }),
    );

    expect(error).toBeInstanceOf(RtcError);
    expect(error).toBeInstanceOf(RtcPermissionDeniedError);
    expect(error.code).toBe('RTC_PERMISSION_DENIED');
    expect(error.message).toBe('missing send-audio');
    expect(error.details).toEqual({ capability: 'send-audio' });
  });

  it('maps an illegal-state code to its dedicated class', () => {
    expect(
      toRtcError(encoded('RTC_ILLEGAL_STATE', 'already joined')),
    ).toBeInstanceOf(RtcIllegalStateError);
  });

  it('maps queue overflow and size-limit codes', () => {
    expect(toRtcError(encoded('RTC_QUEUE_OVERFLOW', 'full'))).toBeInstanceOf(
      RtcQueueOverflowError,
    );
    expect(toRtcError(encoded('RTC_SIZE_LIMIT', 'too big'))).toBeInstanceOf(
      RtcSizeLimitError,
    );
  });

  it('maps timeout, connection, negotiation, and closed terminal errors', () => {
    expect(toRtcError(encoded('RTC_TIMEOUT', 'timed out'))).toBeInstanceOf(
      RtcTimeoutError,
    );
    expect(
      toRtcError(encoded('RTC_CONNECTION', 'connection lost')),
    ).toBeInstanceOf(RtcConnectionError);
    expect(
      toRtcError(encoded('RTC_NEGOTIATION', 'negotiation failed')),
    ).toBeInstanceOf(RtcNegotiationError);
    expect(toRtcError(encoded('RTC_CLOSED', 'call left'))).toBeInstanceOf(
      RtcClosedError,
    );
  });

  it('maps encoded loader failures to their dedicated classes', () => {
    expect(
      toRtcError(encoded('RTC_NATIVE_UNAVAILABLE', 'missing addon')),
    ).toBeInstanceOf(RtcNativeUnavailableError);
    expect(
      toRtcError(encoded('RTC_NATIVE_VERSION_MISMATCH', 'wrong version')),
    ).toBeInstanceOf(RtcNativeVersionMismatchError);
    expect(
      toRtcError(encoded('RTC_UNSUPPORTED_PLATFORM', 'windows')),
    ).toBeInstanceOf(RtcUnsupportedPlatformError);
  });

  it('falls back to RTC_UNKNOWN for an unrecognized code', () => {
    expect(toRtcError(encoded('NOT_A_REAL_CODE', 'hm')).code).toBe(
      'RTC_UNKNOWN',
    );
  });

  it('preserves a plain native error message and keeps the cause', () => {
    const cause = new Error('libvpx exploded');
    const error = toRtcError(cause);

    expect(error.code).toBe('RTC_UNKNOWN');
    expect(error.message).toBe('libvpx exploded');
    expect(error.cause).toBe(cause);
  });

  it('tolerates a message that only looks like JSON', () => {
    expect(toRtcError(new Error('{not json')).message).toBe('{not json');
  });

  it('passes an existing RtcError through unchanged', () => {
    const original = new RtcIllegalStateError('nope');
    expect(toRtcError(original)).toBe(original);
  });
});

describe.runIf(canLoadNative)('local track construction (real addon)', () => {
  it('builds every supported codec without a system libvpx', () => {
    expect(LocalAudioTrack.opus()).toBeInstanceOf(LocalAudioTrack);
    expect(LocalVideoTrack.vp8().codec).toBe('vp8');
    expect(LocalVideoTrack.vp9().codec).toBe('vp9');
    expect(LocalVideoTrack.h264().codec).toBe('h264');
  });

  it('accepts bitrate and layering options', () => {
    expect(
      LocalVideoTrack.vp9({
        targetBitrateBps: 600_000,
        layering: {
          mode: 'server-managed',
          maxSpatialLayers: 3,
          maxTemporalLayers: 3,
        },
      }).codec,
    ).toBe('vp9');
    expect(LocalVideoTrack.vp8({ layering: { mode: 'single' } }).codec).toBe(
      'vp8',
    );
  });

  /*
   * Native validation must surface as a typed RtcError, not as a raw napi
   * GenericFailure carrying JSON in its message.
   */
  it('reports invalid layering as a typed RTC error', () => {
    let error: unknown;
    try {
      LocalVideoTrack.vp8({
        layering: { mode: 'server-managed', maxSpatialLayers: 9 },
      });
    } catch (caught) {
      error = caught;
    }

    expect(error).toBeInstanceOf(RtcError);
    expect((error as RtcError).code).toBe('RTC_MEDIA');
    expect((error as RtcError).message).toContain('maxSpatialLayers');
    expect((error as RtcError).message).not.toContain('{');
  });

  it('rejects a PCM buffer that is not whole int16 samples', async () => {
    const track = LocalAudioTrack.opus();
    let error: unknown;
    try {
      await track.writePcm(Buffer.from([1, 2, 3]), {
        sampleRate: 48_000,
        channels: 1,
      });
    } catch (caught) {
      error = caught;
    }

    expect(error).toBeInstanceOf(RtcError);
    expect((error as RtcError).code).toBe('RTC_MEDIA');
  });

  it('rejects a zero sample rate and a non-positive duration', async () => {
    const audio = LocalAudioTrack.opus();
    await expect(
      audio.writePcm(Buffer.alloc(2), { sampleRate: 0, channels: 1 }),
    ).rejects.toBeInstanceOf(RtcError);

    await expect(
      audio.writeEncoded(Buffer.alloc(4), { durationMs: 0 }),
    ).rejects.toBeInstanceOf(RtcError);
  });
});
