import { RtcIllegalStateError, toRtcError } from './errors';
import {
  loadRtcNativeBinding,
  type NativeLocalAudioTrack,
  type NativeLocalVideoTrack,
  type NativeRemoteTrack,
} from './native';
import type {
  PcmFrame,
  RtpPacket,
  RtcTrackType,
  RtcVideoCodec,
  VideoFrame,
  VideoTrackOptions,
} from './types';

export interface PcmWriteOptions {
  sampleRate: number;
  channels: number;
}

export interface EncodedAudioWriteOptions {
  durationMs: number;
  audioLevel?: number;
}

export interface RtpAudioWriteOptions {
  audioLevel?: number;
}

export interface VideoFrameWriteOptions {
  width: number;
  height: number;
  durationMs: number;
}

export interface EncodedVideoWriteOptions {
  durationMs: number;
}

const audioHandles = new WeakMap<LocalAudioTrack, NativeLocalAudioTrack>();
const videoHandles = new WeakMap<LocalVideoTrack, NativeLocalVideoTrack>();

export class LocalAudioTrack {
  private constructor(handle: NativeLocalAudioTrack) {
    audioHandles.set(this, handle);
  }

  static opus = () => {
    try {
      return new LocalAudioTrack(
        loadRtcNativeBinding().NativeLocalAudioTrack.opus(),
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  writePcm = async (data: Buffer, options: PcmWriteOptions) => {
    try {
      await nativeAudioTrack(this).writePcm(
        data,
        options.sampleRate,
        options.channels,
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  writeEncoded = async (data: Buffer, options: EncodedAudioWriteOptions) => {
    try {
      await nativeAudioTrack(this).writeEncoded(
        data,
        options.durationMs,
        options.audioLevel,
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  writeRtp = async (packet: RtpPacket, options?: RtpAudioWriteOptions) => {
    try {
      await nativeAudioTrack(this).writeRtp(packet, options?.audioLevel);
    } catch (error) {
      throw toRtcError(error);
    }
  };

  flush = () => {
    try {
      nativeAudioTrack(this).flush();
    } catch (error) {
      throw toRtcError(error);
    }
  };
}

export class LocalVideoTrack {
  readonly codec: RtcVideoCodec;

  private constructor(handle: NativeLocalVideoTrack, codec: RtcVideoCodec) {
    this.codec = codec;
    videoHandles.set(this, handle);
  }

  private static create = (
    codec: RtcVideoCodec,
    options?: VideoTrackOptions,
  ) => {
    try {
      const constructors = loadRtcNativeBinding().NativeLocalVideoTrack;
      const handle = constructors[codec](
        options ? JSON.stringify(options) : undefined,
      );
      return new LocalVideoTrack(handle, codec);
    } catch (error) {
      throw toRtcError(error);
    }
  };

  static vp8 = (options?: VideoTrackOptions) => this.create('vp8', options);
  static vp9 = (options?: VideoTrackOptions) => this.create('vp9', options);
  static h264 = (options?: VideoTrackOptions) => this.create('h264', options);

  writeI420 = async (data: Buffer, options: VideoFrameWriteOptions) => {
    try {
      await nativeVideoTrack(this).writeI420(
        data,
        options.width,
        options.height,
        options.durationMs,
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  writeEncoded = async (data: Buffer, options: EncodedVideoWriteOptions) => {
    try {
      await nativeVideoTrack(this).writeEncoded(data, options.durationMs);
    } catch (error) {
      throw toRtcError(error);
    }
  };

  writeRtp = async (packet: RtpPacket) => {
    try {
      await nativeVideoTrack(this).writeRtp(packet);
    } catch (error) {
      throw toRtcError(error);
    }
  };
}

type ReadMode = 'decoded' | 'rtp';

export class RemoteTrack {
  private readMode?: ReadMode;

  constructor(private readonly native: NativeRemoteTrack) {}

  get userId() {
    return this.native.userId;
  }

  get sessionId() {
    return this.native.sessionId;
  }

  get trackLookupPrefix() {
    return this.native.trackLookupPrefix;
  }

  get type() {
    return this.native.trackType as RtcTrackType;
  }

  get mimeType() {
    return this.native.mimeType;
  }

  get payloadType() {
    return this.native.payloadType;
  }

  get clockRate() {
    return this.native.clockRate;
  }

  get channels() {
    return this.native.channels;
  }

  get ssrc() {
    return this.native.ssrc;
  }

  nextPcm = () =>
    this.read(
      'decoded',
      async () => (await this.native.nextPcm()) ?? undefined,
    );

  nextVideoFrame = () =>
    this.read(
      'decoded',
      async () => (await this.native.nextVideoFrame()) ?? undefined,
    );

  readRtp = () =>
    this.read('rtp', async () => (await this.native.readRtp()) ?? undefined);

  drainRtp = () => this.read('rtp', () => this.native.drainRtp());

  requestKeyframe = async () => {
    try {
      await this.native.requestKeyframe();
    } catch (error) {
      throw toRtcError(error);
    }
  };

  private read = async <T>(mode: ReadMode, operation: () => Promise<T>) => {
    if (this.readMode && this.readMode !== mode) {
      throw new RtcIllegalStateError(
        'A remote track cannot switch between decoded and raw RTP reads',
        { requestedMode: mode, selectedMode: this.readMode },
      );
    }

    this.readMode = mode;
    try {
      return await operation();
    } catch (error) {
      throw toRtcError(error);
    }
  };
}

export const nativeAudioTrack = (track: LocalAudioTrack) => {
  const native = audioHandles.get(track);
  if (!native) throw new RtcIllegalStateError('Invalid local audio track');
  return native;
};

export const nativeVideoTrack = (track: LocalVideoTrack) => {
  const native = videoHandles.get(track);
  if (!native) throw new RtcIllegalStateError('Invalid local video track');
  return native;
};

export type { PcmFrame, RtpPacket, VideoFrame };
