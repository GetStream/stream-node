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

const DOCS = 'video/api/12-analytics/03-call-attendance.md';

/**
 * Participant sessions come from the SFU's stats. A REST join (`joinCallAsUser`)
 * starts a call session but no SFU participant, so the endpoint never has data
 * for it (code 16 "session participant stats for call ... not found", still after
 * ending the call and waiting a minute, 2026-10-16), and the app has no call
 * stats reports to read instead. The single-call fences run against a real joined
 * session: the spy records that 404, which proves the request itself (call,
 * session, limit, filter) is accepted (a wrong session id gives "call session
 * not found", `limit: 101` and a bad cursor give code 4).
 */
describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const aliceId = uniqueId('alice');
  const attendanceCallId = uniqueId('call');
  let sessionId = '';

  /** Records the API's rejection of each `queryCallParticipantSessions` call. */
  const recordRejections = () => {
    const errors: unknown[] = [];
    const original = client.video.queryCallParticipantSessions.bind(
      client.video,
    );
    const spy = vi
      .spyOn(client.video, 'queryCallParticipantSessions')
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

  const expectNoStatsYet = (errors: unknown[]) => {
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({
      code: 16,
      metadata: { responseCode: 404 },
    });
    expect(String(errors[0])).toContain(
      `session participant stats for call default:${attendanceCallId}:${sessionId} not found`,
    );
  };

  beforeAll(async () => {
    cleanup.users.push(aliceId);
    await client.upsertUsers([{ id: aliceId }]);
    const setupCall = client.video.call('default', attendanceCallId);
    cleanup.calls.push(setupCall.cid);
    await setupCall.create({ data: { created_by_id: aliceId } });
    sessionId = await joinCallAsUser(setupCall, aliceId);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Query call participant sessions', async () => {
    const { errors, spy } = recordRejections();

    // #region snippet docs="video/api/12-analytics/03-call-attendance.md" heading="Response overview" tab="Node.js"
    // COPY: attendanceCallId="call-id", sessionId="<session-id>"
    const call = client.video.call('default', attendanceCallId);
    const response = await call.queryCallParticipantSessions({
      session: sessionId,
      limit: 25,
    });
    // #endregion snippet

    expect(response).toBeUndefined();
    expect(spy.mock.calls[0][0]).toEqual({
      type: 'default',
      id: attendanceCallId,
      session: sessionId,
      limit: 25,
    });
    expectNoStatsYet(errors);
  });

  it('Filtering', async () => {
    const call = client.video.call('default', attendanceCallId);
    const { errors, spy } = recordRejections();

    // #region snippet docs="video/api/12-analytics/03-call-attendance.md" heading="Filtering" tab="Node.js"
    // COPY: sessionId="<session-id>", aliceId="alice"
    const response = await call.queryCallParticipantSessions({
      session: sessionId,
      filter_conditions: { user_id: { $eq: aliceId } },
    });
    // #endregion snippet

    expect(response).toBeUndefined();
    expect(spy.mock.calls[0][0]).toMatchObject({
      session: sessionId,
      filter_conditions: { user_id: { $eq: aliceId } },
    });
    expectNoStatsYet(errors);
  });

  it.skip('BLOCKED: code 16 "session participant stats for call <cid>:<session> not found" (no SFU participants without WebRTC): Filtering, aggregate over pages', async () => {
    const call = client.video.call('default', attendanceCallId);

    // #region snippet docs="video/api/12-analytics/03-call-attendance.md" heading="Filtering" tab="Node.js" index=2
    // COPY: sessionId="<session-id>", aliceId="alice"
    const filter_conditions = { user_id: { $eq: aliceId } };
    let cursor;
    let totalDuration = 0;
    let totalSessions = 0;

    do {
      const response = await call.queryCallParticipantSessions({
        session: sessionId,
        limit: 100,
        next: cursor,
        filter_conditions,
      });
      for (const s of response.participants_sessions) {
        totalDuration += s.duration_in_seconds ?? 0;
        totalSessions += 1;
      }
      cursor = response.next;
    } while (cursor);
    // #endregion snippet

    expect(totalSessions).toBeGreaterThan(0);
    expect(totalDuration).toBeGreaterThan(0);
  });

  it.skip('BLOCKED: code 16 "session participant stats for call <cid>:<session> not found" (no SFU participants without WebRTC): Pagination', async () => {
    const call = client.video.call('default', attendanceCallId);

    // #region snippet docs="video/api/12-analytics/03-call-attendance.md" heading="Pagination" tab="Node.js"
    // COPY: sessionId="<session-id>"
    let cursor;
    do {
      const response = await call.queryCallParticipantSessions({
        session: sessionId,
        limit: 25,
        next: cursor,
      });
      cursor = response.next;
    } while (cursor);
    // #endregion snippet

    expect(cursor).toBeUndefined();
  });
});
