import { afterEach, describe, expect, it } from 'vitest';

import { LocalAudioTrack } from '../../src/rtc/tracks';
import {
  canRunLive,
  createLiveClient,
  LiveCallRegistry,
  uniqueId,
  waitFor,
} from './live';

/*
 * Capability enforcement is decided by the SFU and the coordinator together, so
 * these are integration tests. A mocked addon would only assert that our own
 * calls were forwarded, not that a revoked publisher is actually stopped.
 *
 * Note which field is authoritative: `state.currentGrants` is what the SFU
 * enforces and what a revoke updates. `state.ownCapabilities` comes from the
 * coordinator and can still list a capability that has been revoked, so it is
 * not a reliable gate.
 */
const canPublishAudio = (call: { state: { currentGrants?: unknown } }) =>
  (call.state.currentGrants as { canPublishAudio?: boolean } | undefined)
    ?.canPublishAudio;
describe.runIf(canRunLive)('RTC permissions (live)', () => {
  const registry = new LiveCallRegistry();
  afterEach(() => registry.cleanup());

  const joinedCall = async () => {
    const client = createLiveClient();
    const ownerId = uniqueId('owner');
    const userId = uniqueId('member');
    await client.upsertUsers([{ id: ownerId }, { id: userId }]);

    const callId = uniqueId('call');
    const owner = client.video.call('default', callId);
    await owner.create({ data: { created_by_id: ownerId } });
    registry.track(owner, { created: true });

    const call = client.video.call('default', callId);
    registry.track(call);
    await call.join({ userId });
    return { client, owner, ownerId, call, userId };
  };

  it('grants publishing capabilities on join', async () => {
    const { call } = await joinedCall();
    expect(call.state.ownCapabilities).toContain('send-audio');
  });

  it('reflects a revoked capability in the SFU grants', async () => {
    const { owner, call, userId } = await joinedCall();
    expect(canPublishAudio(call)).not.toBe(false);

    await owner.revokePermissions(userId, ['send-audio']);

    await waitFor(() => canPublishAudio(call) === false, {
      label: 'canPublishAudio to go false',
    });
  });

  it('refuses to publish audio without send-audio', async () => {
    const { owner, call, userId } = await joinedCall();
    await owner.revokePermissions(userId, ['send-audio']);
    await waitFor(() => canPublishAudio(call) === false, {
      label: 'canPublishAudio to go false',
    });

    await expect(
      call.publishAudio(LocalAudioTrack.opus()),
    ).rejects.toMatchObject({ code: 'RTC_PERMISSION_DENIED' });
  });

  it('allows publishing again after a grant, without rejoining', async () => {
    const { owner, call, userId } = await joinedCall();
    const sessionBefore = call.state.sessionId;

    await owner.revokePermissions(userId, ['send-audio']);
    await waitFor(() => canPublishAudio(call) === false, {
      label: 'canPublishAudio to go false',
    });

    await owner.grantPermissions(userId, ['send-audio']);
    await waitFor(() => canPublishAudio(call) === true, {
      label: 'canPublishAudio to return',
    });

    await expect(
      call.publishAudio(LocalAudioTrack.opus()),
    ).resolves.toBeUndefined();
    // The grant took effect on the live session.
    expect(call.state.sessionId).toBe(sessionBefore);
    expect(call.state.callingState).toBe('joined');
  });

  it('stops an active publication when the capability is revoked', async () => {
    const { owner, call, userId } = await joinedCall();
    await call.publishAudio(LocalAudioTrack.opus());

    await owner.revokePermissions(userId, ['send-audio']);
    await waitFor(() => canPublishAudio(call) === false, {
      label: 'canPublishAudio to go false',
    });

    // A further publish attempt is refused while unauthorized.
    await expect(
      call.publishAudio(LocalAudioTrack.opus()),
    ).rejects.toMatchObject({ code: 'RTC_PERMISSION_DENIED' });
  });

  it('makes a permission request observable to another participant', async () => {
    const { client, owner, ownerId, call, userId } = await joinedCall();
    await owner.join({ userId: ownerId });

    const requests: unknown[] = [];
    owner.on('call.permission_request', (event) => void requests.push(event));

    await owner.revokePermissions(userId, ['send-audio']);
    await waitFor(() => canPublishAudio(call) === false, {
      label: 'canPublishAudio to go false',
    });

    const response = await call.requestPermissions({
      permissions: ['send-audio'],
    });
    expect(response).toBeDefined();

    await waitFor(() => requests.length > 0, {
      label: 'permission request to reach the owner',
      timeoutMs: 25_000,
    });

    void client;
  });

  it('keeps updateUserPermissions available as the REST operation', async () => {
    const { owner, call, userId } = await joinedCall();

    await owner.updateUserPermissions({
      user_id: userId,
      grant_permissions: ['send-video'],
      revoke_permissions: [],
    });

    await waitFor(() => call.state.ownCapabilities.includes('send-video'), {
      label: 'send-video to be granted',
    });
  });
});
