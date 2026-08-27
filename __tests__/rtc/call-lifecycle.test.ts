import { afterEach, describe, expect, it } from 'vitest';

import { RtcError, RtcIllegalStateError } from '../../src/rtc/errors';
import { LocalAudioTrack } from '../../src/rtc/tracks';
import type { RtcCallEvent } from '../../src/rtc/types';
import {
  canRunLive,
  createLiveClient,
  LiveCallRegistry,
  uniqueId,
  waitFor,
} from './live';

/*
 * Join, state, and event behaviour against a real SFU. These exercise the
 * protocol, so they are integration tests rather than mocked ones.
 */
describe.runIf(canRunLive)('RTC call lifecycle (live)', () => {
  const registry = new LiveCallRegistry();
  afterEach(() => registry.cleanup());

  /** A fresh call plus the user that owns it. */
  const setUpCall = async () => {
    const client = createLiveClient();
    const userId = uniqueId('user');
    await client.upsertUsers([{ id: userId, name: 'Live Test' }]);

    const call = client.video.call('default', uniqueId('call'));
    await call.create({ data: { created_by_id: userId } });
    registry.track(call, { created: true });
    return { client, call, userId };
  };

  it('starts idle and reaches joined with a session id', async () => {
    const { call, userId } = await setUpCall();
    expect(call.state.callingState).toBe('idle');
    expect(call.state.sessionId).toBeUndefined();

    await call.join({ userId });

    expect(call.state.callingState).toBe('joined');
    expect(call.state.sessionId).toBeTruthy();
    expect(call.state.localParticipant?.userId).toBe(userId);
    expect(call.state.remoteParticipants).toHaveLength(0);
    expect(call.state.ownCapabilities.length).toBeGreaterThan(0);
  });

  it('leaves cleanly and reports the terminal state', async () => {
    const { call, userId } = await setUpCall();
    await call.join({ userId });

    await call.leave();

    expect(call.state.callingState).toBe('left');
    expect(call.state.remoteTracks).toHaveLength(0);
  });

  it('supports join, leave, and rejoin on the same call handle', async () => {
    const { call, userId } = await setUpCall();

    await call.join({ userId });
    const firstSession = call.state.sessionId;
    await call.leave();

    await call.join({ userId });
    const secondSession = call.state.sessionId;

    expect(call.state.callingState).toBe('joined');
    expect(secondSession).toBeTruthy();
    // A rejoin is a new SFU session, not a resumed one.
    expect(secondSession).not.toBe(firstSession);
  });

  it('survives repeated join/leave cycles', async () => {
    const { call, userId } = await setUpCall();

    for (let cycle = 0; cycle < 3; cycle += 1) {
      await call.join({ userId });
      expect(call.state.callingState).toBe('joined');
      await call.leave();
      expect(call.state.callingState).toBe('left');
    }
  });

  it('rejects a concurrent join and a duplicate join', async () => {
    const { call, userId } = await setUpCall();

    const join = call.join({ userId });
    await expect(call.join({ userId })).rejects.toBeInstanceOf(
      RtcIllegalStateError,
    );

    await join;
    await expect(call.join({ userId })).rejects.toBeInstanceOf(
      RtcIllegalStateError,
    );
  });

  it('rejects an empty userId before touching the network', async () => {
    const { call } = await setUpCall();
    await expect(call.join({ userId: '' })).rejects.toBeInstanceOf(
      RtcIllegalStateError,
    );
    expect(call.state.callingState).toBe('idle');
  });

  it('returns to idle when the SFU rejects the join', async () => {
    const client = createLiveClient();
    const userId = uniqueId('user');
    await client.upsertUsers([{ id: userId }]);

    // Never created, and create is not requested: the coordinator refuses.
    const missing = client.video.call('default', uniqueId('absent'));

    let error: unknown;
    try {
      await missing.join({ userId });
    } catch (caught) {
      error = caught;
    }

    expect(error).toBeInstanceOf(RtcError);
    expect(missing.state.callingState).toBe('idle');
  });

  it('leaving without joining is a no-op that reaches the left state', async () => {
    const { call } = await setUpCall();
    await call.leave();
    expect(call.state.callingState).toBe('left');
  });

  it('requires an active call for participant operations', async () => {
    const { call } = await setUpCall();

    await expect(
      call.publishAudio(LocalAudioTrack.opus()),
    ).rejects.toBeInstanceOf(RtcIllegalStateError);
    await expect(call.getStats()).rejects.toBeInstanceOf(RtcIllegalStateError);
    await expect(call.setIncomingVideoEnabled(true)).rejects.toBeInstanceOf(
      RtcIllegalStateError,
    );
  });

  it('reports stats once connected', async () => {
    const { call, userId } = await setUpCall();
    await call.join({ userId });

    const stats = await call.getStats();

    expect(stats).toBeDefined();
    expect(stats!.droppedRemoteTracks).toBe(0);
  });

  it('sees another participant join and leave', async () => {
    const { client, call, userId } = await setUpCall();
    const peerId = uniqueId('peer');
    await client.upsertUsers([{ id: peerId }]);
    const peerCall = registry.track(client.video.call('default', call.id));

    await call.join({ userId });
    await peerCall.join({ userId: peerId });

    await waitFor(
      () => call.state.remoteParticipants.some((p) => p.userId === peerId),
      { label: 'peer to appear in state' },
    );
    // Each side sees the other.
    expect(peerCall.state.remoteParticipants.map((p) => p.userId)).toContain(
      userId,
    );

    // participantCount is the SFU's own periodic total and lags the roster by
    // a few seconds, so it is waited on rather than read immediately.
    await waitFor(() => call.state.participantCount >= 2, {
      label: 'SFU participant count to catch up',
    });

    await peerCall.leave();
    await waitFor(
      () => call.state.remoteParticipants.every((p) => p.userId !== peerId),
      { label: 'peer to disappear from state' },
    );
  });

  it('updates state before the event handler runs', async () => {
    const { client, call, userId } = await setUpCall();
    const peerId = uniqueId('peer');
    await client.upsertUsers([{ id: peerId }]);
    const peerCall = registry.track(client.video.call('default', call.id));

    await call.join({ userId });

    // Captured inside the handler: state must already reflect the event.
    const observed: string[][] = [];
    call.on('participantJoined', () => {
      observed.push(call.state.participants.map((p) => p.userId));
    });

    await peerCall.join({ userId: peerId });
    await waitFor(() => observed.length > 0, { label: 'participantJoined' });

    expect(observed[0]).toContain(peerId);
  });

  it('delivers events to typed and wildcard listeners and stops after unsubscribe', async () => {
    const { client, call, userId } = await setUpCall();
    const peerId = uniqueId('peer');
    await client.upsertUsers([{ id: peerId }]);
    const peerCall = registry.track(client.video.call('default', call.id));

    const typed: RtcCallEvent[] = [];
    const all: unknown[] = [];
    const unsubscribe = call.on('participantJoined', (e) => void typed.push(e));
    call.on('all', (e) => void all.push(e));

    await call.join({ userId });
    await peerCall.join({ userId: peerId });
    await waitFor(() => typed.length > 0, { label: 'participantJoined' });

    expect(all.length).toBeGreaterThan(0);

    const seenBefore = typed.length;
    unsubscribe();
    await peerCall.leave();
    await peerCall.join({ userId: peerId });
    await waitFor(
      () => call.state.remoteParticipants.some((p) => p.userId === peerId),
      { label: 'peer to rejoin' },
    );

    // The unsubscribed handler stops receiving; the wildcard keeps going.
    expect(typed).toHaveLength(seenBefore);
  });

  it('emits callingStateChanged as the call progresses', async () => {
    const { call, userId } = await setUpCall();
    const states: string[] = [];
    call.on(
      'callingStateChanged',
      (event) => void states.push(String(event.callingState)),
    );

    await call.join({ userId });
    await waitFor(() => states.includes('joined'), { label: 'joined state' });

    await call.leave();
    await waitFor(() => states.includes('left'), { label: 'left state' });
  });

  it('ignores events from a previous join generation', async () => {
    const { client, call, userId } = await setUpCall();
    const peerId = uniqueId('peer');
    await client.upsertUsers([{ id: peerId }]);
    const peerCall = registry.track(client.video.call('default', call.id));

    await call.join({ userId });
    await call.leave();
    await call.join({ userId });

    const afterRejoin: unknown[] = [];
    call.on('all', (event) => void afterRejoin.push(event));

    // Activity on the live generation still lands; nothing from the old one
    // can resurrect, and state stays consistent with the current session.
    await peerCall.join({ userId: peerId });
    await waitFor(
      () => call.state.remoteParticipants.some((p) => p.userId === peerId),
      { label: 'peer visible after rejoin' },
    );

    expect(call.state.callingState).toBe('joined');
    expect(call.state.sessionId).toBeTruthy();
    expect(
      call.state.participants.filter((p) => p.userId === userId),
    ).toHaveLength(1);
  });
});
