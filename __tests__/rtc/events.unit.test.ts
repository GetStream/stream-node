import { describe, expect, it, vi } from 'vitest';

import {
  parseRtcCallEvent,
  parseRtcCallState,
  parseRtcStats,
} from '../../src/rtc/contracts';
import { RtcEventDispatcher } from '../../src/rtc/events';
import type { RtcErrorEvent, RtcQueueOverflowEvent } from '../../src/rtc/types';

describe('RTC event dispatch', () => {
  it('isolates listener failures from peers, wildcards, and later events', () => {
    const dispatcher = new RtcEventDispatcher();
    const healthy = vi.fn();
    const wildcard = vi.fn();
    const errors: RtcErrorEvent[] = [];
    dispatcher.on('participantJoined', () => {
      throw new Error('user listener failed');
    });
    dispatcher.on('participantJoined', healthy);
    dispatcher.on('all', wildcard);
    dispatcher.on('error', (event) => {
      errors.push(event as RtcErrorEvent);
    });

    const event = { type: 'participantJoined' };
    expect(() => dispatcher.dispatch(event.type, event)).not.toThrow();
    expect(() => dispatcher.dispatch(event.type, event)).not.toThrow();

    expect(healthy).toHaveBeenCalledTimes(2);
    expect(wildcard).toHaveBeenCalledTimes(4);
    expect(errors).toHaveLength(2);
    expect(errors[0]).toMatchObject({
      type: 'error',
      sourceEventType: 'participantJoined',
      error: { code: 'RTC_UNKNOWN', message: 'user listener failed' },
    });
  });

  it('does not recurse when an error listener throws', () => {
    const dispatcher = new RtcEventDispatcher();
    const healthyErrorListener = vi.fn();
    dispatcher.on('error', () => {
      throw new Error('broken error listener');
    });
    dispatcher.on('error', healthyErrorListener);

    expect(() =>
      dispatcher.dispatch('error', {
        type: 'error',
        error: new Error('native failure'),
      }),
    ).not.toThrow();
    expect(healthyErrorListener).toHaveBeenCalledTimes(1);
  });

  it('isolates rejected async listeners and reports their errors', async () => {
    const dispatcher = new RtcEventDispatcher();
    const healthy = vi.fn();
    const errors: RtcErrorEvent[] = [];
    dispatcher.on('participantJoined', () =>
      Promise.reject(new Error('async listener failed')),
    );
    dispatcher.on('participantJoined', healthy);
    dispatcher.on('error', (event) => {
      errors.push(event as RtcErrorEvent);
    });

    dispatcher.dispatch('participantJoined', { type: 'participantJoined' });

    expect(healthy).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => expect(errors).toHaveLength(1));
    expect(errors[0]).toMatchObject({
      type: 'error',
      sourceEventType: 'participantJoined',
      error: { code: 'RTC_UNKNOWN', message: 'async listener failed' },
    });
  });
});

describe('RTC JSON contracts', () => {
  it('preserves the camel-case typed queue overflow contract', () => {
    const event: RtcQueueOverflowEvent = parseRtcCallEvent(
      JSON.stringify({
        type: 'queueOverflow',
        queue: 'events',
        dropped: 2,
        totalDropped: 5,
      }),
    ) as RtcQueueOverflowEvent;

    expect(event).toEqual({
      type: 'queueOverflow',
      queue: 'events',
      dropped: 2,
      totalDropped: 5,
    });
    expect(
      parseRtcStats(
        JSON.stringify({
          publisher: [],
          subscriber: [],
          droppedRemoteTracks: 4,
        }),
      ).droppedRemoteTracks,
    ).toBe(4);
  });

  it('accepts recovery and terminal states from the native state machine', () => {
    for (const callingState of [
      'reconnecting',
      'migrating',
      'reconnecting-failed',
      'left',
    ] as const) {
      const state = parseRtcCallState(
        JSON.stringify({
          callingState,
          participants: [],
          participantCount: 0,
          anonymousParticipantCount: 0,
          pins: [],
          e2eeEnabled: false,
          ownCapabilities: [],
        }),
      );
      expect(state.callingState).toBe(callingState);
      expect(
        parseRtcCallEvent(
          JSON.stringify({ type: 'callingStateChanged', callingState }),
        ),
      ).toEqual({ type: 'callingStateChanged', callingState });
    }
  });

  it('rejects malformed overflow, state, and stats payloads', () => {
    expect(() =>
      parseRtcCallEvent(
        JSON.stringify({
          type: 'queueOverflow',
          queue: 'remote_tracks',
          dropped: -1,
          total_dropped: 1,
        }),
      ),
    ).toThrow(/invalid queueOverflow event/);
    expect(() =>
      parseRtcCallState(
        JSON.stringify({ calling_state: 'joined', participants: [] }),
      ),
    ).toThrow(/invalid call state/);
    expect(() =>
      parseRtcStats(JSON.stringify({ dropped_remote_tracks: 3 })),
    ).toThrow(/invalid stats/);
  });
});
