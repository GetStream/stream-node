import type { CallRequest } from '../gen/models';
import type { RtcError } from './errors';
import type { RemoteTrack } from './tracks';

export const RTC_BINDING_API_VERSION = 1;

export type RtcCallingState =
  | 'idle'
  | 'joining'
  | 'joined'
  | 'reconnecting'
  | 'migrating'
  | 'reconnecting-failed'
  | 'left'
  | 'offline';

export type RtcTrackType =
  'audio' | 'video' | 'screenshare' | 'screenshare_audio';

export type RtcVideoCodec = 'vp8' | 'vp9' | 'h264';

export interface JoinCallOptions {
  userId: string;
  create?: boolean;
  data?: CallRequest;
  ring?: boolean;
  notify?: boolean;
  video?: boolean;
  location?: string;
  preferredVideoCodec?: RtcVideoCodec;
  maxJoinRetries?: number;
  joinResponseTimeoutMs?: number;
  rpcRequestTimeoutMs?: number;
}

export interface RtcParticipant {
  userId: string;
  sessionId: string;
  trackLookupPrefix: string;
  publishedTracks: RtcTrackType[];
  joinedAt?: string | null;
  connectionQuality: string;
  isSpeaking: boolean;
  isDominantSpeaker: boolean;
  audioLevel: number;
  name: string;
  image: string;
  custom?: Record<string, unknown> | null;
  roles: string[];
  source: string;
  pausedTracks: RtcTrackType[];
}

export interface RtcCallStateSnapshot {
  callingState: RtcCallingState;
  sessionId?: string | null;
  participants: RtcParticipant[];
  participantCount: number;
  anonymousParticipantCount: number;
  pins: unknown[];
  startedAt?: string | null;
  e2eeEnabled: boolean;
  ownCapabilities: string[];
  currentGrants?: unknown;
}

export interface RtcStats {
  publisher: unknown;
  subscriber: unknown;
  droppedRemoteTracks: number;
}

export interface SubscriptionConfig {
  audio?: boolean;
  video?: boolean;
  screenShare?: boolean;
  videoDimension?: VideoDimension;
}

export interface SubscriptionTarget {
  sessionId: string;
  trackType: RtcTrackType;
  dimension?: VideoDimension;
}

export interface VideoDimension {
  width: number;
  height: number;
}

export interface VideoTrackOptions {
  targetBitrateBps?: number;
  allowFrameSkipping?: boolean;
  layering?:
    | { mode: 'single' }
    | {
        mode: 'server-managed';
        maxSpatialLayers?: number;
        maxTemporalLayers?: number;
      };
}

export interface PcmFrame {
  data: Buffer;
  sampleRate: number;
  channels: number;
  durationMs: number;
}

export interface VideoFrame {
  data: Buffer;
  width: number;
  height: number;
  rtpTimestamp: number;
}

export interface RtpExtension {
  id: number;
  payload: Buffer;
}

export interface RtpPacket {
  version: number;
  padding: boolean;
  extension: boolean;
  marker: boolean;
  payloadType: number;
  sequenceNumber: number;
  timestamp: number;
  ssrc: number;
  csrc: number[];
  extensionProfile: number;
  extensions: RtpExtension[];
  extensionsPadding: number;
  payload: Buffer;
}

export interface RtcCallEvent {
  type: string;
  [key: string]: unknown;
}

export interface RtcCallingStateChangedEvent extends RtcCallEvent {
  type: 'callingStateChanged';
  callingState: RtcCallingState;
}

export interface RtcTrackUnpublishedEvent extends RtcCallEvent {
  type: 'trackUnpublished';
  userId: string;
  sessionId: string;
  trackType: RtcTrackType;
  trackTypeCode: number;
}

export interface RtcQueueOverflowEvent extends RtcCallEvent {
  type: 'queueOverflow';
  queue: 'events';
  dropped: number;
  totalDropped: number;
}

export interface RtcErrorEvent extends RtcCallEvent {
  type: 'error';
  error?: RtcError;
  sourceEventType?: string;
}

export interface RtcCallEventMap {
  all: RtcCallEvent | RemoteTrack;
  participantJoined: RtcCallEvent;
  participantLeft: RtcCallEvent;
  participantUpdated: RtcCallEvent;
  trackPublished: RtcCallEvent;
  trackUnpublished: RtcTrackUnpublishedEvent;
  dominantSpeakerChanged: RtcCallEvent;
  audioLevelChanged: RtcCallEvent;
  connectionQualityChanged: RtcCallEvent;
  participantCountChanged: RtcCallEvent;
  pinsUpdated: RtcCallEvent;
  inboundStateChanged: RtcCallEvent;
  publishOptionsChanged: RtcCallEvent;
  publishQualityChanged: RtcCallEvent;
  callGrantsUpdated: RtcCallEvent;
  iceRestarted: RtcCallEvent;
  callEnded: RtcCallEvent;
  callingStateChanged: RtcCallingStateChangedEvent;
  queueOverflow: RtcQueueOverflowEvent;
  error: RtcErrorEvent;
  remoteTrack: RemoteTrack;
}

export type RtcCallEventName = keyof RtcCallEventMap;
export type RtcCallEventHandler<E extends RtcCallEventName> = (
  event: RtcCallEventMap[E],
) => void;
