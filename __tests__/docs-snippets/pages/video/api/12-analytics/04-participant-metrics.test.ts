import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { joinCallAsUser } from '../../../../helpers/video';

const DOCS = 'video/api/12-analytics/04-participant-metrics.md';

/**
 * Participant metrics come from the SFU's stats. A REST join (`joinCallAsUser`)
 * starts a call session but no SFU participant, so there are never metrics for it
 * (code 16 "no stats available for this participant session", 2026-10-16). The
 * fences run against a real joined session: the spy records that 404, which
 * proves the request is accepted (a wrong session gives "call session not found",
 * a time window over 30 minutes gives code 4 "time window cannot exceed 30
 * minutes").
 */
describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const metricsUserId = uniqueId('user');
  const metricsCallId = uniqueId('call');
  const userSessionId = uniqueId('user-session');
  let sessionId = '';

  /** Records the API's rejection of each `getCallParticipantSessionMetrics` call. */
  const recordRejections = () => {
    const errors: unknown[] = [];
    const original = client.video.getCallParticipantSessionMetrics.bind(
      client.video,
    );
    const spy = vi
      .spyOn(client.video, 'getCallParticipantSessionMetrics')
      .mockImplementation(async (request) => {
        try {
          return await original(request);
        } catch (error) {
          errors.push(error);
          return undefined as never;
        }
      });
    return { errors, spy };
  };

  const expectNoStats = (errors: unknown[]) => {
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({
      code: 16,
      metadata: { responseCode: 404 },
    });
    expect(String(errors[0])).toContain(
      'no stats available for this participant session',
    );
  };

  beforeAll(async () => {
    cleanup.users.push(metricsUserId);
    await client.upsertUsers([{ id: metricsUserId }]);
    const setupCall = client.video.call('default', metricsCallId);
    cleanup.calls.push(setupCall.cid);
    await setupCall.create({ data: { created_by_id: metricsUserId } });
    sessionId = await joinCallAsUser(setupCall, metricsUserId);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Get participant session metrics', async () => {
    const { errors, spy } = recordRejections();

    // #region snippet docs="video/api/12-analytics/04-participant-metrics.md" heading="Response overview" tab="Node.js"
    // COPY: metricsCallId="call-id", sessionId="<session-id>", metricsUserId="<user-id>", userSessionId="<user-session-id>"
    const call = client.video.call('default', metricsCallId);
    const response = await call.getCallParticipantSessionMetrics({
      session: sessionId,
      user: metricsUserId,
      user_session: userSessionId,
    });
    // #endregion snippet

    expect(response).toBeUndefined();
    expect(spy.mock.calls[0][0]).toEqual({
      type: 'default',
      id: metricsCallId,
      session: sessionId,
      user: metricsUserId,
      user_session: userSessionId,
    });
    expectNoStats(errors);
  });

  it('Time range', async () => {
    const call = client.video.call('default', metricsCallId);
    const { errors, spy } = recordRejections();

    // #region snippet docs="video/api/12-analytics/04-participant-metrics.md" heading="Time range" tab="Node.js"
    // COPY: sessionId="<session-id>", metricsUserId="<user-id>", userSessionId="<user-session-id>"
    const response = await call.getCallParticipantSessionMetrics({
      session: sessionId,
      user: metricsUserId,
      user_session: userSessionId,
      since: new Date('2024-01-01T00:00:00Z'),
      until: new Date('2024-01-01T00:30:00Z'),
    });
    // #endregion snippet

    expect(response).toBeUndefined();
    expect(spy.mock.calls[0][0]).toMatchObject({
      since: new Date('2024-01-01T00:00:00Z'),
      until: new Date('2024-01-01T00:30:00Z'),
    });
    expectNoStats(errors);
  });
});
