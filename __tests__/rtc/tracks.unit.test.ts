import { describe, expect, it, vi } from 'vitest';

import { RtcIllegalStateError } from '../../src/rtc/errors';
import { RemoteTrack } from '../../src/rtc/tracks';
import type { PcmFrame, RtpPacket } from '../../src/rtc/types';
import { PullQueue, remoteTrackFixture } from './test-helpers';

const rtpPacket = (): RtpPacket => ({
  version: 2,
  padding: false,
  extension: false,
  marker: false,
  payloadType: 111,
  sequenceNumber: 1,
  timestamp: 2,
  ssrc: 3,
  csrc: [],
  extensionProfile: 0,
  extensions: [],
  extensionsPadding: 0,
  payload: Buffer.from([1, 2, 3]),
});

describe('RemoteTrack read ownership', () => {
  it('permanently selects decoded mode on the first read', async () => {
    const readRtp = vi.fn(() => Promise.resolve(undefined));
    const native = remoteTrackFixture({
      nextPcm: vi.fn(() =>
        Promise.resolve({
          data: Buffer.alloc(2),
          sampleRate: 48_000,
          channels: 1,
          durationMs: 20,
        }),
      ),
      readRtp,
    });
    const track = new RemoteTrack(native);

    await track.nextPcm();
    await expect(track.readRtp()).rejects.toBeInstanceOf(RtcIllegalStateError);

    expect(readRtp).not.toHaveBeenCalled();
    await expect(track.nextPcm()).resolves.toBeDefined();
  });

  it('permanently selects RTP mode even after the first read ends', async () => {
    const nextPcm = vi.fn(() => Promise.resolve(undefined));
    const native = remoteTrackFixture({
      nextPcm,
      readRtp: vi.fn(() => Promise.resolve(rtpPacket())),
    });
    const track = new RemoteTrack(native);

    await track.readRtp();
    await expect(track.nextPcm()).rejects.toMatchObject({
      code: 'RTC_ILLEGAL_STATE',
      details: { selectedMode: 'rtp', requestedMode: 'decoded' },
    });

    expect(nextPcm).not.toHaveBeenCalled();
    await expect(track.drainRtp()).resolves.toBe(false);
  });

  it('keeps the first mode when its native read fails', async () => {
    const track = new RemoteTrack(
      remoteTrackFixture({
        nextPcm: vi.fn(() => Promise.reject(new Error('decoder failed'))),
      }),
    );

    await expect(track.nextPcm()).rejects.toThrow('decoder failed');
    await expect(track.readRtp()).rejects.toBeInstanceOf(RtcIllegalStateError);
  });

  it('allows a pending read to drain buffered data before ending', async () => {
    const reads = new PullQueue<PcmFrame | null>();
    const track = new RemoteTrack(
      remoteTrackFixture({
        nextPcm: reads.next,
      }),
    );
    const frame: PcmFrame = {
      data: Buffer.from([1, 0]),
      sampleRate: 48_000,
      channels: 1,
      durationMs: 20,
    };

    const buffered = track.nextPcm();
    reads.push(frame);
    await expect(buffered).resolves.toBe(frame);

    const terminal = track.nextPcm();
    reads.end();
    await expect(terminal).resolves.toBeUndefined();
  });
});
