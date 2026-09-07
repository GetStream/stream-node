import { RtcNativeVersionMismatchError } from './errors';
import {
  RTC_BINDING_API_VERSION,
  type RtcCallEvent,
  type RtcCallStateSnapshot,
  type RtcCallingState,
  type RtcQueueOverflowEvent,
  type RtcStats,
  type RtcTrackType,
} from './types';

const callingStates = new Set<RtcCallingState>([
  'idle',
  'joining',
  'joined',
  'reconnecting',
  'migrating',
  'reconnecting-failed',
  'left',
  'offline',
]);

const trackTypes = new Set<RtcTrackType>([
  'audio',
  'video',
  'screenshare',
  'screenshare_audio',
]);

const contractError = (value: string) =>
  new RtcNativeVersionMismatchError(
    `RTC binding API ${RTC_BINDING_API_VERSION} returned invalid ${value}`,
    { bindingApiVersion: RTC_BINDING_API_VERSION, value },
  );

const parseObject = (json: string, value: string) => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new RtcNativeVersionMismatchError(
      `RTC binding API ${RTC_BINDING_API_VERSION} returned malformed ${value} JSON`,
      { bindingApiVersion: RTC_BINDING_API_VERSION, value },
      { cause: error },
    );
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw contractError(value);
  }
  return parsed as Record<string, unknown>;
};

const isNonNegativeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;

export const parseRtcCallEvent = (json: string): RtcCallEvent => {
  const event = parseObject(json, 'call event');
  if (typeof event.type !== 'string' || event.type.length === 0) {
    throw contractError('call event type');
  }

  if (event.type === 'callingStateChanged') {
    if (
      typeof event.callingState !== 'string' ||
      !callingStates.has(event.callingState as RtcCallingState)
    ) {
      throw contractError('callingStateChanged event');
    }
  } else if (event.type === 'trackUnpublished') {
    if (
      typeof event.userId !== 'string' ||
      typeof event.sessionId !== 'string' ||
      typeof event.trackType !== 'string' ||
      !trackTypes.has(event.trackType as RtcTrackType) ||
      !isNonNegativeInteger(event.trackTypeCode)
    ) {
      throw contractError('trackUnpublished event');
    }
  } else if (event.type === 'queueOverflow') {
    if (
      event.queue !== 'events' ||
      !isNonNegativeInteger(event.dropped) ||
      !isNonNegativeInteger(event.totalDropped)
    ) {
      throw contractError('queueOverflow event');
    }
    return event as unknown as RtcQueueOverflowEvent;
  }

  return event as RtcCallEvent;
};

export const parseRtcCallState = (json: string): RtcCallStateSnapshot => {
  const snapshot = parseObject(json, 'call state');
  if (
    typeof snapshot.callingState !== 'string' ||
    !callingStates.has(snapshot.callingState as RtcCallingState) ||
    (snapshot.sessionId !== undefined &&
      snapshot.sessionId !== null &&
      typeof snapshot.sessionId !== 'string') ||
    !Array.isArray(snapshot.participants) ||
    !isNonNegativeInteger(snapshot.participantCount) ||
    !isNonNegativeInteger(snapshot.anonymousParticipantCount) ||
    !Array.isArray(snapshot.pins) ||
    (snapshot.startedAt !== undefined &&
      snapshot.startedAt !== null &&
      typeof snapshot.startedAt !== 'string') ||
    typeof snapshot.e2eeEnabled !== 'boolean' ||
    !Array.isArray(snapshot.ownCapabilities) ||
    !snapshot.ownCapabilities.every(
      (capability) => typeof capability === 'string',
    )
  ) {
    throw contractError('call state');
  }
  return snapshot as unknown as RtcCallStateSnapshot;
};

export const parseRtcStats = (json: string): RtcStats => {
  const stats = parseObject(json, 'stats');
  if (!isNonNegativeInteger(stats.droppedRemoteTracks)) {
    throw contractError('stats');
  }
  return stats as unknown as RtcStats;
};
