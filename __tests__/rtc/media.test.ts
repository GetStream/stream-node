import { afterEach, describe, expect, it } from 'vitest';

import type { StreamCall } from '../../src/StreamCall';
import { RtcIllegalStateError } from '../../src/rtc/errors';
import { LocalAudioTrack, LocalVideoTrack } from '../../src/rtc/tracks';
import type { RemoteTrack } from '../../src/rtc/tracks';
import type { RtpPacket } from '../../src/rtc/types';
import {
  AUDIO_SAMPLE_RATE,
  canRunLive,
  collectPcm,
  collectVideo,
  createLiveClient,
  LiveCallRegistry,
  sleep,
  startPump,
  toneFrame,
  uniqueId,
  SCREEN_SHARE_CODEC,
  VIDEO_CODEC,
  waitFor,
} from './live';

/*
 * Media flow through the SFU: publish, subscribe, decode, forward. Every case
 * depends on real codec negotiation and real forwarding, so none of it is
 * meaningfully testable against a mock.
 */
describe.runIf(canRunLive)('RTC media (live)', () => {
  const registry = new LiveCallRegistry();
  const stops: Array<() => void> = [];

  afterEach(async () => {
    for (const stop of stops) stop();
    stops.length = 0;
    await registry.cleanup();
  });

  /** Pump media for the rest of the test, stopped automatically on teardown. */
  const pump = (options: Parameters<typeof startPump>[0]) => {
    const stop = startPump(options);
    stops.push(stop);
    return stop;
  };

  /** Two participants joined to the same fresh call. */
  const twoParticipants = async () => {
    const client = createLiveClient();
    const senderId = uniqueId('sender');
    const receiverId = uniqueId('receiver');
    await client.upsertUsers([{ id: senderId }, { id: receiverId }]);

    const callId = uniqueId('call');
    const sender = client.video.call('default', callId);
    const receiver = client.video.call('default', callId);
    await sender.create({ data: { created_by_id: senderId } });
    registry.track(sender, { created: true });
    registry.track(receiver);

    sender.updatePublishOptions({ preferredVideoCodec: VIDEO_CODEC });
    receiver.updatePublishOptions({ preferredVideoCodec: VIDEO_CODEC });

    await sender.join({ userId: senderId });
    await receiver.join({ userId: receiverId });
    return { client, sender, senderId, receiver, receiverId };
  };

  /**
   * Await the first remote track of a given kind.
   *
   * The SFU only creates an inbound track once media is actually flowing, so
   * callers must already be pumping. Rejects rather than hanging so a missing
   * track fails with a useful message instead of the global test timeout.
   */
  const firstTrack = (call: StreamCall, type: string, timeoutMs = 25_000) =>
    new Promise<RemoteTrack>((resolve, reject) => {
      let unsubscribe = () => {};
      const done = (track: RemoteTrack) => {
        clearTimeout(timer);
        unsubscribe();
        resolve(track);
      };
      const timer = setTimeout(() => {
        unsubscribe();
        reject(new Error(`no remote ${type} track within ${timeoutMs}ms`));
      }, timeoutMs);
      for (const existing of call.state.remoteTracks) {
        if (existing.type === type) return done(existing);
      }
      unsubscribe = call.on('remoteTrack', (track) => {
        if (track.type === type) done(track);
      });
    });

  it('delivers published PCM to a subscriber', async () => {
    const { sender, receiver } = await twoParticipants();
    const audio = LocalAudioTrack.opus();
    await sender.publishAudio(audio);
    pump({ audio });

    const track = await firstTrack(receiver, 'audio');
    expect(track.mimeType.toLowerCase()).toContain('opus');
    expect(track.clockRate).toBe(48_000);

    const heard = { frames: 0, peakRms: 0 };
    collectPcm(track, heard);
    await waitFor(() => heard.frames > 50, { label: 'decoded PCM frames' });

    // A 12000-amplitude tone lands near 12000/sqrt(2) after Opus.
    expect(heard.peakRms).toBeGreaterThan(3_000);
  });

  it('delivers published I420 video to a subscriber', async () => {
    const { sender, receiver } = await twoParticipants();
    const video = LocalVideoTrack[VIDEO_CODEC]({ targetBitrateBps: 600_000 });
    await receiver.updateSubscriptions({ audio: false, video: true });
    await sender.publishVideo(video);
    pump({ video });

    const track = await firstTrack(receiver, 'video');
    const seen = { frames: 0, luma: [] as number[] };
    collectVideo(track, seen);
    await waitFor(() => seen.frames > 10, { label: 'decoded video frames' });

    // A flat I420 frame survives encode/decode essentially intact.
    const average = seen.luma.reduce((a, b) => a + b, 0) / seen.luma.length;
    expect(average).toBeGreaterThan(188);
    expect(average).toBeLessThan(212);
  });

  it('publishes screen share as a track distinct from camera video', async () => {
    const { sender, receiver } = await twoParticipants();
    const screen = LocalVideoTrack[SCREEN_SHARE_CODEC]({
      targetBitrateBps: 600_000,
    });
    await receiver.updateSubscriptions({ audio: false, screenShare: true });
    await sender.publishScreenShare(screen);
    pump({ video: screen });

    const track = await firstTrack(receiver, 'screenshare');
    expect(track.type).toBe('screenshare');

    const seen = { frames: 0, luma: [] as number[] };
    collectVideo(track, seen);
    await waitFor(() => seen.frames > 5, { label: 'screen share frames' });

    expect(
      receiver.state.remoteTracks.filter((t) => t.type === 'video'),
    ).toHaveLength(0);
  });

  it('forwards raw RTP and delivers audible media', async () => {
    const { sender, receiver } = await twoParticipants();

    const source = LocalAudioTrack.opus();
    await sender.publishAudio(source);
    pump({ audio: source });

    const relay = LocalAudioTrack.opus();
    await receiver.publishAudio(relay);
    const inbound = await firstTrack(receiver, 'audio');
    const relayedInbound = await firstTrack(sender, 'audio');
    const heard = { frames: 0, peakRms: 0 };
    collectPcm(relayedInbound, heard);

    const seen: RtpPacket[] = [];
    let forwarded = 0;
    let writeError: unknown;
    void (async () => {
      for (;;) {
        const packet: RtpPacket | undefined = await inbound.readRtp();
        if (!packet) return;
        if (seen.length < 10) seen.push(packet);
        try {
          await relay.writeRtp(packet);
          forwarded += 1;
        } catch (error) {
          writeError ??= error;
          return;
        }
        // Mutating after the write must not corrupt what native received.
        packet.payload.fill(0);
      }
    })();

    await waitFor(() => forwarded > 30, { label: 'RTP packets forwarded' });
    await waitFor(() => heard.frames > 20, { label: 'forwarded RTP audio' });

    expect(writeError).toBeUndefined();
    expect(heard.peakRms).toBeGreaterThan(3_000);
    for (const packet of seen) {
      expect(packet.payloadType).toBeGreaterThan(0);
      expect(packet.ssrc).toBeGreaterThan(0);
      expect(packet.payload.length).toBeGreaterThan(0);
      expect(packet.version).toBe(2);
    }
    // Sequence numbers advance rather than repeating.
    expect(new Set(seen.map((p) => p.sequenceNumber)).size).toBe(seen.length);
  });

  it('drains raw RTP without decoding', async () => {
    const { sender, receiver } = await twoParticipants();
    const audio = LocalAudioTrack.opus();
    await sender.publishAudio(audio);
    pump({ audio });

    const track = await firstTrack(receiver, 'audio');
    await expect(track.drainRtp()).resolves.toBe(true);
  });

  it('republishes pre-encoded Opus without decoding in JavaScript', async () => {
    const { sender, receiver } = await twoParticipants();

    const source = LocalAudioTrack.opus();
    await sender.publishAudio(source);
    pump({ audio: source });

    const inbound = await firstTrack(receiver, 'audio');
    const encodedOut = LocalAudioTrack.opus();
    await receiver.publishAudio(encodedOut);

    let republished = 0;
    void (async () => {
      for (;;) {
        const packet = await inbound.readRtp();
        if (!packet) return;
        await encodedOut.writeEncoded(packet.payload, { durationMs: 20 });
        republished += 1;
      }
    })();

    const heard = { frames: 0, peakRms: 0 };
    collectPcm(await firstTrack(sender, 'audio'), heard);
    await waitFor(() => heard.frames > 20, {
      label: 'republished encoded audio',
    });

    expect(republished).toBeGreaterThan(20);
  });

  it('refuses to mix decoded and raw reads on one track', async () => {
    const { sender, receiver } = await twoParticipants();
    const audio = LocalAudioTrack.opus();
    await sender.publishAudio(audio);
    pump({ audio });

    const track = await firstTrack(receiver, 'audio');

    const decoded = track.nextPcm();
    await expect(track.readRtp()).rejects.toBeInstanceOf(RtcIllegalStateError);
    await decoded;

    const raw = track.readRtp();
    await expect(track.nextPcm()).rejects.toBeInstanceOf(RtcIllegalStateError);
    await raw;
  });

  it('releases pending reads when the call is left', async () => {
    const { sender, receiver } = await twoParticipants();
    const audio = LocalAudioTrack.opus();
    await sender.publishAudio(audio);
    const stop = pump({ audio });

    const track = await firstTrack(receiver, 'audio');
    await track.nextPcm();
    stop();

    // A read issued before leaving must not hang. Frames already queued are
    // still delivered, so the guarantee is that the stream terminates: keep
    // reading until it yields undefined rather than assuming the next one does.
    const pending = track.nextPcm();
    await receiver.leave();
    await expect(pending).resolves.toBeDefined();

    let reads = 0;
    let last: unknown = null;
    while (reads < 500) {
      last = await track.nextPcm();
      reads += 1;
      if (last === undefined) break;
    }

    expect(last).toBeUndefined();
    expect(receiver.state.remoteTracks).toHaveLength(0);
  });

  it('withholds video until it is subscribed', async () => {
    const { sender, receiver } = await twoParticipants();
    const video = LocalVideoTrack[VIDEO_CODEC]({ targetBitrateBps: 600_000 });
    await sender.publishVideo(video);
    pump({ video });

    // The default policy is audio-only, so nothing should arrive.
    await sleep(6_000);
    expect(
      receiver.state.remoteTracks.filter((t) => t.type === 'video'),
    ).toHaveLength(0);

    await receiver.updateSubscriptions({ audio: false, video: true });
    const track = await firstTrack(receiver, 'video');
    expect(track.type).toBe('video');
  });

  it('accepts a keyframe request on a video track', async () => {
    const { sender, receiver } = await twoParticipants();
    const video = LocalVideoTrack[VIDEO_CODEC]({ targetBitrateBps: 600_000 });
    await receiver.updateSubscriptions({ audio: false, video: true });
    await sender.publishVideo(video);
    pump({ video });

    const track = await firstTrack(receiver, 'video');
    await expect(track.requestKeyframe()).resolves.toBeUndefined();
  });

  it('stops publishing, mutes, and unmutes without leaving', async () => {
    const { sender } = await twoParticipants();
    const audio = LocalAudioTrack.opus();
    await sender.publishAudio(audio);

    await expect(sender.muteTrack('audio')).resolves.toBeUndefined();
    await expect(sender.unmuteTrack('audio')).resolves.toBeUndefined();
    await expect(sender.stopPublish(audio)).resolves.toBeUndefined();

    expect(sender.state.callingState).toBe('joined');
  });

  it('reports queue overflow when a producer outruns the PCM queue', async () => {
    const { sender } = await twoParticipants();
    const audio = LocalAudioTrack.opus();
    await sender.publishAudio(audio);

    // Deliberately unpaced: the bounded queue must report the overrun rather
    // than dropping silently or growing without limit.
    let overflow: unknown;
    try {
      for (let i = 0; i < 2_000; i += 1) {
        await audio.writePcm(toneFrame(i), {
          sampleRate: AUDIO_SAMPLE_RATE,
          channels: 1,
        });
      }
    } catch (error) {
      overflow = error;
    }

    expect(overflow).toBeDefined();
    expect((overflow as { code: string }).code).toBe('RTC_QUEUE_OVERFLOW');
    expect((overflow as { details: object }).details).toHaveProperty(
      'droppedSamples',
    );
  });

  it('rejects a video codec the SFU did not advertise', async () => {
    const { sender } = await twoParticipants();
    // The call negotiated VP9; VP8 must fail with a message naming the codecs
    // that are actually available.
    const mismatched = VIDEO_CODEC === 'vp9' ? 'vp8' : 'vp9';
    const track = LocalVideoTrack[mismatched]({ targetBitrateBps: 300_000 });

    await expect(sender.publishVideo(track)).rejects.toMatchObject({
      code: 'RTC_MEDIA',
    });
  });

  it('exposes remote track metadata for routing', async () => {
    const { sender, senderId, receiver } = await twoParticipants();
    const audio = LocalAudioTrack.opus();
    await sender.publishAudio(audio);
    pump({ audio });

    const track = await firstTrack(receiver, 'audio');

    expect(track.userId).toBe(senderId);
    expect(track.sessionId).toBe(sender.state.sessionId);
    expect(track.trackLookupPrefix).toBeTruthy();
    expect(track.ssrc).toBeGreaterThan(0);
    expect(track.payloadType).toBeGreaterThan(0);
  });

  it('applies a per-participant resolution preference', async () => {
    const { sender, receiver } = await twoParticipants();
    const video = LocalVideoTrack[VIDEO_CODEC]({ targetBitrateBps: 600_000 });
    await receiver.updateSubscriptions({ audio: false, video: true });
    await sender.publishVideo(video);
    pump({ video });
    await firstTrack(receiver, 'video');

    await expect(
      receiver.setPreferredIncomingVideoResolution(
        { width: 160, height: 120 },
        [sender.state.sessionId!],
      ),
    ).resolves.toBeUndefined();
  });

  it('enables and disables incoming video', async () => {
    const { sender, receiver } = await twoParticipants();
    const video = LocalVideoTrack[VIDEO_CODEC]({ targetBitrateBps: 600_000 });
    await sender.publishVideo(video);
    pump({ video });

    await receiver.setIncomingVideoEnabled(true);
    const track = await firstTrack(receiver, 'video');
    const seen = { frames: 0, luma: [] as number[] };
    collectVideo(track, seen);
    await waitFor(() => seen.frames > 0, { label: 'video after enable' });

    await expect(
      receiver.setIncomingVideoEnabled(false),
    ).resolves.toBeUndefined();
  });
});
