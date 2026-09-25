import { isAbsolute } from 'node:path';
import { createRequire } from 'node:module';
import type { StreamClient } from '../StreamClient';
import { rtcClientCredentials } from './clientCredentials';
import {
  RTC_BINDING_API_VERSION,
  type PcmFrame,
  type RtpPacket,
  type VideoFrame,
} from './types';
import {
  RtcNativeUnavailableError,
  RtcNativeVersionMismatchError,
  RtcUnsupportedPlatformError,
} from './errors';

export interface NativeLocalAudioTrack {
  writePcm(data: Buffer, sampleRate: number, channels: number): Promise<void>;
  writeEncoded(
    data: Buffer,
    durationMs: number,
    audioLevel?: number,
  ): Promise<void>;
  writeRtp(packet: RtpPacket, audioLevel?: number): Promise<void>;
  flush(): void;
}

export interface NativeLocalVideoTrack {
  writeI420(
    data: Buffer,
    width: number,
    height: number,
    durationMs: number,
  ): Promise<void>;
  writeEncoded(data: Buffer, durationMs: number): Promise<void>;
  writeRtp(packet: RtpPacket): Promise<void>;
}

export interface NativeRemoteTrack {
  readonly userId: string;
  readonly sessionId: string;
  readonly trackLookupPrefix: string;
  readonly trackType: string;
  readonly mimeType: string;
  readonly payloadType: number;
  readonly clockRate: number;
  readonly channels: number;
  readonly ssrc: number;
  nextPcm(): Promise<PcmFrame | undefined | null>;
  nextVideoFrame(): Promise<VideoFrame | undefined | null>;
  readRtp(): Promise<RtpPacket | undefined | null>;
  drainRtp(): Promise<boolean>;
  requestKeyframe(): Promise<void>;
}

export interface NativeCall {
  join(optionsJson: string): Promise<void>;
  leave(): Promise<void>;
  stateJson(): Promise<string>;
  statsJson(): Promise<string | undefined | null>;
  nextEvent(): Promise<string | undefined | null>;
  nextRemoteTrack(): Promise<NativeRemoteTrack | undefined | null>;
  requestPermissions(permissions: string[]): Promise<string>;
  setDisconnectionTimeout(timeoutSeconds: number): void;
  updatePublishOptions(preferredVideoCodec?: string): void;
  updateSubscriptions(configJson: string): Promise<void>;
  updateSubscriptionTargets(targetsJson: string): Promise<void>;
  setIncomingVideoEnabled(enabled: boolean): Promise<void>;
  publishAudio(track: NativeLocalAudioTrack): Promise<void>;
  publishVideo(track: NativeLocalVideoTrack): Promise<void>;
  publishScreenShare(track: NativeLocalVideoTrack): Promise<void>;
  publishScreenShareAudio(track: NativeLocalAudioTrack): Promise<void>;
  stopPublishAudio(
    track: NativeLocalAudioTrack,
    trackType: string,
  ): Promise<void>;
  stopPublishVideo(
    track: NativeLocalVideoTrack,
    trackType: string,
  ): Promise<void>;
  muteTrack(trackType: string): Promise<void>;
  unmuteTrack(trackType: string): Promise<void>;
  startNoiseCancellation(): Promise<void>;
  stopNoiseCancellation(): Promise<void>;
}

interface NativeStreamClient {
  call(type: string, id: string): NativeCall;
}

interface NativeConstructor<T, A extends unknown[]> {
  new (...args: A): T;
}

export interface RtcNativeBinding {
  bindingApiVersion: number | (() => number);
  NativeCall: { prototype: NativeCall };
  NativeStreamClient: NativeConstructor<
    NativeStreamClient,
    [apiKey: string, apiSecret: string, baseUrl?: string]
  >;
  NativeLocalAudioTrack: {
    prototype: NativeLocalAudioTrack;
    opus(): NativeLocalAudioTrack;
  };
  NativeLocalVideoTrack: {
    prototype: NativeLocalVideoTrack;
    vp8(optionsJson?: string): NativeLocalVideoTrack;
    vp9(optionsJson?: string): NativeLocalVideoTrack;
    h264(optionsJson?: string): NativeLocalVideoTrack;
  };
  NativeRemoteTrack: { prototype: NativeRemoteTrack };
}

const require = createRequire(`${process.cwd()}/package.json`);
const supportedPlatforms = new Set(['darwin', 'linux']);

let loadedBinding: RtcNativeBinding | undefined;
const nativeClients = new WeakMap<StreamClient, NativeStreamClient>();

const method = (value: unknown, name: string) =>
  value !== null &&
  (typeof value === 'object' || typeof value === 'function') &&
  typeof (value as Record<string, unknown>)[name] === 'function';

const validateClass = (
  value: unknown,
  name: string,
  instanceMethods: string[],
  staticMethods: string[] = [],
) => {
  const prototype =
    typeof value === 'function'
      ? (value as unknown as { prototype: unknown }).prototype
      : undefined;
  if (
    typeof value !== 'function' ||
    !prototype ||
    typeof prototype !== 'object' ||
    !instanceMethods.every((entry) => method(prototype, entry)) ||
    !staticMethods.every((entry) => method(value, entry))
  ) {
    throw new RtcNativeUnavailableError(
      `The RTC native module has an invalid ${name} export`,
      { export: name },
    );
  }
};

const nativeCallMethods = [
  'join',
  'leave',
  'stateJson',
  'statsJson',
  'nextEvent',
  'nextRemoteTrack',
  'requestPermissions',
  'setDisconnectionTimeout',
  'updatePublishOptions',
  'updateSubscriptions',
  'updateSubscriptionTargets',
  'setIncomingVideoEnabled',
  'publishAudio',
  'publishVideo',
  'publishScreenShare',
  'publishScreenShareAudio',
  'stopPublishAudio',
  'stopPublishVideo',
  'muteTrack',
  'unmuteTrack',
  'startNoiseCancellation',
  'stopNoiseCancellation',
];

const validateBinding = (candidate: unknown): RtcNativeBinding => {
  if (!candidate || typeof candidate !== 'object') {
    throw new RtcNativeUnavailableError(
      'The RTC native module did not export a binding object',
    );
  }

  const exports = candidate as Record<string, unknown>;
  const versionExport = exports.bindingApiVersion;
  if (
    typeof versionExport !== 'number' &&
    typeof versionExport !== 'function'
  ) {
    throw new RtcNativeUnavailableError(
      'The RTC native module has an invalid bindingApiVersion export',
    );
  }

  let actual: unknown;
  try {
    actual =
      typeof versionExport === 'function'
        ? (versionExport as () => unknown)()
        : versionExport;
  } catch (error) {
    throw new RtcNativeUnavailableError(
      'The RTC native module could not report its binding API version',
      {},
      { cause: error },
    );
  }
  if (actual !== RTC_BINDING_API_VERSION) {
    throw new RtcNativeVersionMismatchError(
      `RTC binding API ${String(actual)} is incompatible with the required API ${RTC_BINDING_API_VERSION}`,
      { actual, expected: RTC_BINDING_API_VERSION },
    );
  }

  validateClass(exports.NativeStreamClient, 'NativeStreamClient', ['call']);
  validateClass(exports.NativeCall, 'NativeCall', nativeCallMethods);
  validateClass(
    exports.NativeLocalAudioTrack,
    'NativeLocalAudioTrack',
    ['writePcm', 'writeEncoded', 'writeRtp', 'flush'],
    ['opus'],
  );
  validateClass(
    exports.NativeLocalVideoTrack,
    'NativeLocalVideoTrack',
    ['writeI420', 'writeEncoded', 'writeRtp'],
    ['vp8', 'vp9', 'h264'],
  );
  validateClass(exports.NativeRemoteTrack, 'NativeRemoteTrack', [
    'nextPcm',
    'nextVideoFrame',
    'readRtp',
    'drainRtp',
    'requestKeyframe',
  ]);

  return candidate as RtcNativeBinding;
};

export const loadRtcNativeBinding = (): RtcNativeBinding => {
  if (loadedBinding) return loadedBinding;

  if (!supportedPlatforms.has(process.platform)) {
    throw new RtcUnsupportedPlatformError(
      `Server-side RTC is not available on ${process.platform}/${process.arch}; this preview supports macOS and Linux`,
      { arch: process.arch, platform: process.platform },
    );
  }

  const configuredPath = process.env.STREAM_NODE_RTC_NATIVE_PATH;
  if (configuredPath && !isAbsolute(configuredPath)) {
    throw new RtcNativeUnavailableError(
      'STREAM_NODE_RTC_NATIVE_PATH must be an absolute path',
      { path: configuredPath },
    );
  }

  const candidates = configuredPath
    ? [configuredPath]
    : ['@stream-io/node-rtc'];
  let cause: unknown;

  for (const candidate of candidates) {
    let resolved: unknown;
    try {
      resolved = require(candidate);
    } catch (error) {
      // Only a resolution failure is worth trying the next candidate for.
      cause = error;
      continue;
    }
    // A module that loaded but is not a usable binding is a hard error: saying
    // "could not load" would send the caller after the wrong problem.
    loadedBinding = validateBinding(resolved);
    return loadedBinding;
  }

  throw new RtcNativeUnavailableError(
    'Server-side RTC could not load its native addon. Build the Rust binding and set STREAM_NODE_RTC_NATIVE_PATH to the absolute .node file.',
    { path: configuredPath, platform: process.platform, arch: process.arch },
    { cause },
  );
};

export const nativeRtcClient = (client: StreamClient) => {
  const existing = nativeClients.get(client);
  if (existing) return existing;

  const binding = loadRtcNativeBinding();
  const value = rtcClientCredentials(client);
  const nativeClient = new binding.NativeStreamClient(
    value.apiKey,
    value.apiSecret,
    value.baseUrl,
  );
  nativeClients.set(client, nativeClient);
  return nativeClient;
};

export const nativeRtcCall = (
  client: StreamClient,
  callType: string,
  id: string,
) => {
  const nativeCall = nativeRtcClient(client).call(callType, id);
  if (
    !nativeCall ||
    typeof nativeCall !== 'object' ||
    !nativeCallMethods.every((name) => method(nativeCall, name))
  ) {
    throw new RtcNativeUnavailableError(
      'The RTC native module returned an invalid NativeCall handle',
    );
  }
  return nativeCall;
};

/**
 * Drop the memoized addon so the next RTC use resolves it again.
 *
 * Only the loader's own tests need this — they point
 * `STREAM_NODE_RTC_NATIVE_PATH` at different modules across cases. There is
 * deliberately no public API for injecting a substitute binding.
 *
 * @internal
 */
export const resetRtcNativeBindingCache = () => {
  loadedBinding = undefined;
};
