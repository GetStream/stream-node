import { describe, expect, it, vi } from 'vitest';

import { RtcCallLifecycle } from '../../src/rtc/callLifecycle';
import { RtcEventDispatcher } from '../../src/rtc/events';
import type { NativeCall, NativeRemoteTrack } from '../../src/rtc/native';
import { StreamCallState } from '../../src/rtc/state';
import type { RtcCallEvent } from '../../src/rtc/types';
import {
  callStateJson,
  deferred,
  nativeCallFixture,
  PullQueue,
  remoteTrackFixture,
} from './test-helpers';

const encodedError = (code: string, message: string) =>
  new Error(JSON.stringify({ code, message }));

const lifecycleFixture = ({
  calls,
  prepare = () => undefined,
  configure = () => Promise.resolve(),
}: {
  calls: NativeCall[];
  prepare?: () => void;
  configure?: (native: NativeCall) => Promise<void>;
}) => {
  const state = new StreamCallState();
  const dispatcher = new RtcEventDispatcher();
  const createNativeCall = vi.fn(() => {
    const native = calls.shift();
    if (!native) throw new Error('no native call fixture');
    return native;
  });
  const lifecycle = new RtcCallLifecycle({
    state,
    createNativeCall,
    prepareNativeCall: prepare,
    configureJoinedCall: configure,
    emit: dispatcher.dispatch,
  });
  return { createNativeCall, dispatcher, lifecycle, state };
};

describe('RTC call lifecycle', () => {
  it('owns one in-flight join and one concurrent leave teardown', async () => {
    const joinGate = deferred<void>();
    const leaveGate = deferred<void>();
    const leave = vi.fn(() => {
      joinGate.reject(encodedError('RTC_CLOSED', 'left during join'));
      return leaveGate.promise;
    });
    const native = nativeCallFixture({
      join: vi.fn(() => joinGate.promise),
      leave,
    });
    const { lifecycle, state } = lifecycleFixture({ calls: [native] });

    const joinResult = lifecycle
      .join({ userId: 'agent' })
      .catch((error: unknown) => error);
    await expect(lifecycle.join({ userId: 'agent' })).rejects.toMatchObject({
      code: 'RTC_ILLEGAL_STATE',
    });

    const firstLeave = lifecycle.leave();
    const secondLeave = lifecycle.leave();
    expect(secondLeave).toBe(firstLeave);
    expect(leave).toHaveBeenCalledTimes(1);

    leaveGate.resolve();
    await firstLeave;
    await expect(joinResult).resolves.toMatchObject({ code: 'RTC_CLOSED' });
    expect(state.callingState).toBe('left');
  });

  it('tears down exactly once after a native join failure', async () => {
    const order: string[] = [];
    const join = vi.fn(() => {
      order.push('join');
      return Promise.reject(encodedError('RTC_JOIN', 'join failed'));
    });
    const leave = vi.fn(() => {
      order.push('leave');
      return Promise.resolve();
    });
    const native = nativeCallFixture({
      join,
      leave,
    });
    const { lifecycle, state } = lifecycleFixture({ calls: [native] });

    await expect(lifecycle.join({ userId: 'agent' })).rejects.toMatchObject({
      code: 'RTC_JOIN',
    });

    expect(leave).toHaveBeenCalledTimes(1);
    expect(order).toEqual(['join', 'leave']);
    expect(state.callingState).toBe('idle');
  });

  it('preserves both the join error and a cleanup failure', async () => {
    const native = nativeCallFixture({
      join: vi.fn(() =>
        Promise.reject(encodedError('RTC_JOIN', 'join failed')),
      ),
      leave: vi.fn(() =>
        Promise.reject(encodedError('RTC_CLOSED', 'cleanup failed')),
      ),
    });
    const { lifecycle, state } = lifecycleFixture({ calls: [native] });

    await expect(lifecycle.join({ userId: 'agent' })).rejects.toMatchObject({
      code: 'RTC_JOIN',
      message: 'join failed; native cleanup failed: cleanup failed',
      details: {
        cleanupError: { code: 'RTC_CLOSED', message: 'cleanup failed' },
      },
    });
    expect(state.callingState).toBe('idle');
  });

  it('tears down when pre-join or post-join setup fails', async () => {
    const beforeNativeJoin = vi.fn(() => Promise.resolve());
    const beforeLeave = vi.fn(() => Promise.resolve());
    const beforeJoin = nativeCallFixture({
      join: beforeNativeJoin,
      leave: beforeLeave,
    });
    const before = lifecycleFixture({
      calls: [beforeJoin],
      prepare: () => {
        throw new Error('publish options failed');
      },
    });

    await expect(before.lifecycle.join({ userId: 'agent' })).rejects.toThrow(
      'publish options failed',
    );
    expect(beforeNativeJoin).not.toHaveBeenCalled();
    expect(beforeLeave).toHaveBeenCalledTimes(1);
    expect(before.state.callingState).toBe('idle');

    const order: string[] = [];
    const afterLeave = vi.fn(() => {
      order.push('leave');
      return Promise.resolve();
    });
    const afterJoin = nativeCallFixture({
      join: vi.fn(() => {
        order.push('join');
        return Promise.resolve();
      }),
      stateJson: vi.fn(() => {
        order.push('state');
        return Promise.resolve(callStateJson());
      }),
      leave: afterLeave,
    });
    const after = lifecycleFixture({
      calls: [afterJoin],
      configure: () => {
        order.push('configure');
        return Promise.reject(new Error('subscription setup failed'));
      },
    });

    await expect(after.lifecycle.join({ userId: 'agent' })).rejects.toThrow(
      'subscription setup failed',
    );
    expect(afterLeave).toHaveBeenCalledTimes(1);
    expect(order).toEqual(['join', 'state', 'configure', 'leave']);
    expect(after.state.callingState).toBe('idle');
  });

  it('invalidates stale event and track generations before leave settles', async () => {
    const oldEvents = new PullQueue<string>();
    const oldTracks = new PullQueue<NativeRemoteTrack>();
    const firstStateJson = vi.fn(() => Promise.resolve(callStateJson()));
    const first = nativeCallFixture({
      nextEvent: oldEvents.next,
      nextRemoteTrack: oldTracks.next,
      stateJson: firstStateJson,
    });
    const second = nativeCallFixture();
    const { dispatcher, lifecycle, state } = lifecycleFixture({
      calls: [first, second],
    });
    const delivered: string[] = [];
    const remoteTracks = vi.fn();
    dispatcher.on('all', (event) => {
      delivered.push((event as RtcCallEvent).type);
    });
    dispatcher.on('remoteTrack', remoteTracks);

    await lifecycle.join({ userId: 'agent' });
    await lifecycle.leave();
    oldEvents.push(
      JSON.stringify({
        type: 'participantJoined',
        userId: 'stale',
        sessionId: 'stale-session',
      }),
    );
    oldTracks.push({} as NativeRemoteTrack);
    await lifecycle.join({ userId: 'agent' });
    await Promise.resolve();

    expect(delivered).not.toContain('participantJoined');
    expect(remoteTracks).not.toHaveBeenCalled();
    expect(firstStateJson).toHaveBeenCalledTimes(1);
    expect(state.callingState).toBe('joined');
  });

  it('stops protocol events as soon as leave begins', async () => {
    const events = new PullQueue<string>();
    const leaveGate = deferred<void>();
    const native = nativeCallFixture({
      leave: vi.fn(() => leaveGate.promise),
      nextEvent: events.next,
    });
    const { dispatcher, lifecycle, state } = lifecycleFixture({
      calls: [native],
    });
    const participantJoined = vi.fn();
    dispatcher.on('participantJoined', participantJoined);

    await lifecycle.join({ userId: 'agent' });
    const leave = lifecycle.leave();
    events.push(
      JSON.stringify({
        type: 'participantJoined',
        userId: 'late-peer',
        sessionId: 'late-session',
      }),
    );
    await Promise.resolve();
    await Promise.resolve();

    expect(participantJoined).not.toHaveBeenCalled();

    leaveGate.resolve();
    await leave;
    expect(state.callingState).toBe('left');
  });

  it('allows a fresh join after a failed leave reaches its terminal state', async () => {
    const first = nativeCallFixture({
      leave: vi.fn(() =>
        Promise.reject(encodedError('RTC_CLOSED', 'teardown failed')),
      ),
    });
    const second = nativeCallFixture();
    const { createNativeCall, lifecycle, state } = lifecycleFixture({
      calls: [first, second],
    });

    await lifecycle.join({ userId: 'agent' });
    await expect(lifecycle.leave()).rejects.toMatchObject({
      code: 'RTC_CLOSED',
      message: 'teardown failed',
    });
    expect(state.callingState).toBe('left');

    await expect(lifecycle.join({ userId: 'agent' })).resolves.toBeUndefined();
    expect(createNativeCall).toHaveBeenCalledTimes(2);
    expect(state.callingState).toBe('joined');
    await lifecycle.leave();
  });

  it('updates state before dispatching an event', async () => {
    const events = new PullQueue<string>();
    const peer = {
      userId: 'peer',
      sessionId: 'peer-session',
      trackLookupPrefix: 'peer-prefix',
      publishedTracks: [],
      connectionQuality: 'good',
      isSpeaking: false,
      isDominantSpeaker: false,
      audioLevel: 0,
      name: 'Peer',
      image: '',
      roles: [],
      source: 'webrtc',
      pausedTracks: [],
    };
    const native = nativeCallFixture({
      nextEvent: events.next,
      stateJson: vi
        .fn()
        .mockResolvedValueOnce(callStateJson())
        .mockResolvedValueOnce(
          callStateJson('joined', {
            participants: [peer],
            participantCount: 1,
          }),
        ),
    });
    const { dispatcher, lifecycle, state } = lifecycleFixture({
      calls: [native],
    });
    const observed: string[][] = [];
    dispatcher.on('participantJoined', () => {
      observed.push(
        state.participants.map((participant) => participant.userId),
      );
    });

    await lifecycle.join({ userId: 'agent' });
    events.push(
      JSON.stringify({
        type: 'participantJoined',
        userId: peer.userId,
        sessionId: peer.sessionId,
      }),
    );

    await vi.waitFor(() => expect(observed).toEqual([['peer']]));
  });

  it('keeps event and track pumps alive after listener failures', async () => {
    const events = new PullQueue<string>();
    const tracks = new PullQueue<NativeRemoteTrack>();
    const native = nativeCallFixture({
      nextEvent: events.next,
      nextRemoteTrack: tracks.next,
      stateJson: vi.fn(() => Promise.resolve(callStateJson())),
    });
    const { dispatcher, lifecycle } = lifecycleFixture({ calls: [native] });
    const healthyEvents = vi.fn();
    const overflow = vi.fn();
    const healthyTracks = vi.fn();
    dispatcher.on('participantJoined', () => {
      throw new Error('event listener failed');
    });
    dispatcher.on('participantJoined', healthyEvents);
    dispatcher.on('queueOverflow', overflow);
    dispatcher.on('remoteTrack', () => {
      throw new Error('track listener failed');
    });
    dispatcher.on('remoteTrack', healthyTracks);

    await lifecycle.join({ userId: 'agent' });
    events.push(
      JSON.stringify({
        type: 'participantJoined',
        userId: 'peer',
        sessionId: 'peer-session',
      }),
    );
    events.push(
      JSON.stringify({
        type: 'queueOverflow',
        queue: 'events',
        dropped: 1,
        totalDropped: 1,
      }),
    );
    tracks.push(remoteTrackFixture());
    tracks.push(remoteTrackFixture({ sessionId: 'second-session' }));

    await vi.waitFor(() => {
      expect(overflow).toHaveBeenCalledTimes(1);
      expect(healthyTracks).toHaveBeenCalledTimes(2);
    });
    expect(healthyEvents).toHaveBeenCalledTimes(1);
  });

  it('reports a refresh failure and continues with the next typed event', async () => {
    const events = new PullQueue<string>();
    const native = nativeCallFixture({
      nextEvent: events.next,
      stateJson: vi
        .fn()
        .mockResolvedValueOnce(callStateJson())
        .mockRejectedValueOnce(new Error('state unavailable'))
        .mockResolvedValueOnce(callStateJson()),
    });
    const { dispatcher, lifecycle } = lifecycleFixture({ calls: [native] });
    const delivered: string[] = [];
    dispatcher.on('all', (event) => {
      delivered.push((event as RtcCallEvent).type);
    });

    await lifecycle.join({ userId: 'agent' });
    events.push(
      JSON.stringify({
        type: 'participantJoined',
        userId: 'peer',
        sessionId: 'peer-session',
      }),
    );
    events.push(
      JSON.stringify({
        type: 'queueOverflow',
        queue: 'events',
        dropped: 3,
        totalDropped: 7,
      }),
    );

    await vi.waitFor(() => expect(delivered).toContain('queueOverflow'));
    expect(delivered).toContain('error');
    expect(delivered).not.toContain('participantJoined');
  });

  it('invalidates the generation even when leave has no native handle', async () => {
    const { lifecycle, state } = lifecycleFixture({ calls: [] });

    await expect(lifecycle.leave()).resolves.toBeUndefined();
    await expect(lifecycle.leave()).resolves.toBeUndefined();

    expect(state.callingState).toBe('left');
  });
});
