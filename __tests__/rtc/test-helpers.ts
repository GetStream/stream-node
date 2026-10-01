import { vi } from 'vitest';

import type { NativeCall, NativeRemoteTrack } from '../../src/rtc/native';
import type {
  RtcCallStateSnapshot,
  RtcCallingState,
} from '../../src/rtc/types';

export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

export const deferred = <T>(): Deferred<T> => {
  let resolve!: Deferred<T>['resolve'];
  let reject!: Deferred<T>['reject'];
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
};

export class PullQueue<T> {
  private readonly buffered: T[] = [];
  private readonly readers: Array<Deferred<T | undefined>> = [];
  private ended = false;

  next = () => {
    const value = this.buffered.shift();
    if (value !== undefined) return Promise.resolve(value);
    if (this.ended) return Promise.resolve(undefined);
    const reader = deferred<T | undefined>();
    this.readers.push(reader);
    return reader.promise;
  };

  push = (value: T) => {
    const reader = this.readers.shift();
    if (reader) reader.resolve(value);
    else this.buffered.push(value);
  };

  end = () => {
    this.ended = true;
    for (const reader of this.readers.splice(0)) reader.resolve(undefined);
  };
}

export const callStateJson = (
  callingState: RtcCallingState = 'joined',
  overrides: Partial<RtcCallStateSnapshot> = {},
) =>
  JSON.stringify({
    callingState,
    participants: [],
    participantCount: 0,
    anonymousParticipantCount: 0,
    pins: [],
    e2eeEnabled: false,
    ownCapabilities: [],
    ...overrides,
  } satisfies RtcCallStateSnapshot);

export const nativeCallFixture = (
  overrides: Partial<NativeCall> = {},
): NativeCall => ({
  join: vi.fn(() => Promise.resolve()),
  leave: vi.fn(() => Promise.resolve()),
  stateJson: vi.fn(() => Promise.resolve(callStateJson())),
  statsJson: vi.fn(() => Promise.resolve(undefined)),
  nextEvent: vi.fn(() => new Promise<undefined>(() => {})),
  nextRemoteTrack: vi.fn(
    () => new Promise<NativeRemoteTrack | undefined>(() => {}),
  ),
  requestPermissions: vi.fn(() => Promise.resolve('{}')),
  setDisconnectionTimeout: vi.fn(),
  updatePublishOptions: vi.fn(),
  updateSubscriptions: vi.fn(() => Promise.resolve()),
  updateSubscriptionTargets: vi.fn(() => Promise.resolve()),
  setIncomingVideoEnabled: vi.fn(() => Promise.resolve()),
  publishAudio: vi.fn(() => Promise.resolve()),
  publishVideo: vi.fn(() => Promise.resolve()),
  publishScreenShare: vi.fn(() => Promise.resolve()),
  publishScreenShareAudio: vi.fn(() => Promise.resolve()),
  stopPublishAudio: vi.fn(() => Promise.resolve()),
  stopPublishVideo: vi.fn(() => Promise.resolve()),
  muteTrack: vi.fn(() => Promise.resolve()),
  unmuteTrack: vi.fn(() => Promise.resolve()),
  startNoiseCancellation: vi.fn(() => Promise.resolve()),
  stopNoiseCancellation: vi.fn(() => Promise.resolve()),
  ...overrides,
});

export const remoteTrackFixture = (
  overrides: Partial<NativeRemoteTrack> = {},
): NativeRemoteTrack => ({
  userId: 'peer',
  sessionId: 'peer-session',
  trackLookupPrefix: 'peer-prefix',
  trackType: 'audio',
  mimeType: 'audio/opus',
  payloadType: 111,
  clockRate: 48_000,
  channels: 1,
  ssrc: 42,
  nextPcm: vi.fn(() => Promise.resolve(undefined)),
  nextVideoFrame: vi.fn(() => Promise.resolve(undefined)),
  readRtp: vi.fn(() => Promise.resolve(undefined)),
  drainRtp: vi.fn(() => Promise.resolve(false)),
  requestKeyframe: vi.fn(() => Promise.resolve()),
  ...overrides,
});
