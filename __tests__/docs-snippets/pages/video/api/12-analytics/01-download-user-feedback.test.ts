import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { UserFeedbackResponse } from '../../../../../../index';
import { createUserToken, getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS = 'video/api/12-analytics/01-download-user-feedback.md';

const VIDEO_API = 'https://video.stream-io-api.com/api/v2/video';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const fooId = uniqueId('foo');
  const barId = uniqueId('bar');
  const call1 = client.video.call('default', uniqueId('call'));
  const call2 = client.video.call('default', uniqueId('call'));
  const call1Cid = call1.cid;
  let call1SessionId = '';

  /**
   * Sends a request to the video API as `userId` (client-side endpoints).
   * Feedback can only be submitted for a call session the user joined, and the
   * server-side `collectUserFeedback` has no `user_id` ("user_id is missing").
   */
  const asUser = async (userId: string, path: string, body: object) => {
    const response = await fetch(
      `${VIDEO_API}${path}?api_key=${process.env.STREAM_API_KEY}`,
      {
        method: 'POST',
        headers: {
          Authorization: createUserToken(userId),
          'stream-auth-type': 'jwt',
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    const json = (await response.json()) as {
      call?: { current_session_id: string };
    };
    if (!response.ok) {
      throw new Error(`${path}: ${response.status} ${JSON.stringify(json)}`);
    }
    return json;
  };

  /** Joins the call over REST (creates a session, no WebRTC) and rates it. */
  const rate = async (
    call: typeof call1,
    userId: string,
    rating: number,
    custom: Record<string, unknown>,
  ) => {
    const joined = await asUser(userId, `/call/${call.type}/${call.id}/join`, {
      location: 'AMS',
    });
    await asUser(userId, `/call/${call.type}/${call.id}/feedback`, {
      rating,
      reason: `rated ${rating}`,
      sdk: 'docs-test',
      sdk_version: '1.0.0',
      custom,
    });
    return joined.call?.current_session_id ?? '';
  };

  /** Feedback ordered as it was submitted in `beforeAll`. */
  const submitted: Array<{ cid: string; user_id: string; rating: number }> = [];

  /** Only the feedback this file submitted (feedback is app-wide). */
  const own = (items: UserFeedbackResponse[]) =>
    items.filter((f) => f.cid === call1.cid || f.cid === call2.cid);

  const summary = (items: UserFeedbackResponse[]) =>
    own(items).map(({ cid, user_id, rating }) => ({ cid, user_id, rating }));

  beforeAll(async () => {
    cleanup.users.push(fooId, barId);
    await client.upsertUsers([{ id: fooId }, { id: barId }]);
    for (const call of [call1, call2]) {
      cleanup.calls.push(call.cid);
      await call.create({ data: { created_by_id: fooId } });
    }

    const ratings: Array<[typeof call1, string, number]> = [
      [call1, fooId, 1],
      [call1, barId, 3],
      [call2, fooId, 5],
      [call2, barId, 4],
    ];
    for (const [call, userId, rating] of ratings) {
      const sessionId = await rate(call, userId, rating, { userId, rating });
      if (call === call1) call1SessionId = sessionId;
      submitted.push({ cid: call.cid, user_id: userId, rating });
    }

    // Feedback is queryable shortly after it is submitted.
    await retry(async () => {
      const { user_feedback } = await client.video.queryUserFeedback({
        filter_conditions: { call_cid: { $in: [call1.cid, call2.cid] } },
      });
      if (user_feedback.length !== submitted.length) {
        throw new Error(`${user_feedback.length} of ${submitted.length}`);
      }
    });
  });

  afterAll(() => cleanup.run());

  it('Download user feedback', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Download user feedback" tab="Node.js"
    const response = await client.video.queryUserFeedback({});
    // #endregion snippet

    // Most recent first by default.
    expect(summary(response.user_feedback)).toEqual([...submitted].reverse());
  });

  it('Filter by call', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Filter by call" tab="Node.js"
    // COPY: call1Cid="default:1234"
    const callCID = call1Cid;
    const response = await client.video.queryUserFeedback({
      filter_conditions: {
        call_cid: callCID,
      },
    });
    // #endregion snippet

    expect(response.user_feedback.map((f) => f.cid)).toEqual([
      call1.cid,
      call1.cid,
    ]);
  });

  it('Filter by call and session', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Filter by call" tab="Node.js" index=2
    // COPY: call1Cid="default:1234", call1SessionId="d1a5803b-6121-4fc2-b070-e5eed3277ed4"
    const callCID = call1Cid;
    const callSessionID = call1SessionId;
    const response = await client.video.queryUserFeedback({
      filter_conditions: {
        call_cid: callCID,
        call_session_id: callSessionID,
      },
    });
    // #endregion snippet

    expect(call1SessionId).not.toBe('');
    expect(response.user_feedback.map((f) => [f.cid, f.session_id])).toEqual([
      [call1.cid, call1SessionId],
      [call1.cid, call1SessionId],
    ]);
  });

  it('Filter by user', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Filter by user(s)" tab="Node.js"
    // COPY: fooId="foo"
    const userID = fooId;
    const response = await client.video.queryUserFeedback({
      filter_conditions: {
        user_id: userID,
      },
    });
    // #endregion snippet

    expect(summary(response.user_feedback)).toEqual([
      { cid: call2.cid, user_id: fooId, rating: 5 },
      { cid: call1.cid, user_id: fooId, rating: 1 },
    ]);
    expect(response.user_feedback.every((f) => f.user_id === fooId)).toBe(true);
  });

  it('Filter by multiple users', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Filter by user(s)" tab="Node.js" index=2
    // COPY: fooId="foo", barId="bar"
    const users = [fooId, barId];
    const response = await client.video.queryUserFeedback({
      filter_conditions: {
        user_id: { $in: users },
      },
    });
    // #endregion snippet

    expect(summary(response.user_feedback)).toEqual([...submitted].reverse());
    expect(response.user_feedback).toHaveLength(submitted.length);
  });

  it('Negative feedback', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Filter by rating" tab="Node.js"
    const response = await client.video.queryUserFeedback({
      filter_conditions: {
        rating: { $lt: 3 },
      },
    });
    // #endregion snippet

    expect(response.user_feedback.every((f) => f.rating < 3)).toBe(true);
    expect(summary(response.user_feedback)).toEqual([
      { cid: call1.cid, user_id: fooId, rating: 1 },
    ]);
  });

  it('Neutral feedback', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Filter by rating" tab="Node.js" index=2
    const response = await client.video.queryUserFeedback({
      filter_conditions: { rating: 3 },
    });
    // #endregion snippet

    expect(response.user_feedback.every((f) => f.rating === 3)).toBe(true);
    expect(summary(response.user_feedback)).toEqual([
      { cid: call1.cid, user_id: barId, rating: 3 },
    ]);
  });

  it('Positive feedback', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Filter by rating" tab="Node.js" index=3
    const response = await client.video.queryUserFeedback({
      filter_conditions: {
        rating: { $gte: 4 },
      },
    });
    // #endregion snippet

    expect(response.user_feedback.every((f) => f.rating >= 4)).toBe(true);
    expect(summary(response.user_feedback)).toEqual([
      { cid: call2.cid, user_id: barId, rating: 4 },
      { cid: call2.cid, user_id: fooId, rating: 5 },
    ]);
  });

  it('Combine multiple conditions', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Combine multiple conditions" tab="Node.js"
    // COPY: fooId="foo"
    const user = fooId;
    const response = await client.video.queryUserFeedback({
      filter_conditions: {
        user_id: user,
        rating: { $lt: 3 },
      },
    });
    // #endregion snippet

    expect(summary(response.user_feedback)).toEqual([
      { cid: call1.cid, user_id: fooId, rating: 1 },
    ]);
    expect(response.user_feedback).toHaveLength(1);
  });

  it('Specifying sort order', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Specifying sort order" tab="Node.js"
    const response = await client.video.queryUserFeedback({
      sort: [
        // 1  = ascending order
        // -1 = descending order (default for created_at)
        { field: 'created_at', direction: 1 },
      ],
    });
    // #endregion snippet

    // Earliest first: the order the feedback was submitted in.
    expect(summary(response.user_feedback)).toEqual(submitted);
  });

  it('Specifying the maximum number of items to be retrieved', async () => {
    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Specifying the maximum number of items to be retrieved" tab="Node.js"
    const response = await client.video.queryUserFeedback({ limit: 5 });
    // #endregion snippet

    expect(response.user_feedback.length).toBeGreaterThanOrEqual(
      submitted.length,
    );
    expect(response.user_feedback.length).toBeLessThanOrEqual(5);
    // More than 100 is rejected.
    await expect(
      client.video.queryUserFeedback({ limit: 101 }),
    ).rejects.toMatchObject({ code: 4, metadata: { responseCode: 400 } });
  });

  it('Downloading with custom data', async () => {
    // Without `full`, custom data is left out.
    const withoutFull = await client.video.queryUserFeedback({
      filter_conditions: { user_id: fooId },
    });
    expect(withoutFull.user_feedback.map((f) => f.custom)).toEqual([
      undefined,
      undefined,
    ]);

    // #region snippet docs="video/api/12-analytics/01-download-user-feedback.md" heading="Downloading with custom data" tab="Node.js"
    const response = await client.video.queryUserFeedback({ full: true });
    // #endregion snippet

    expect(own(response.user_feedback).map((f) => f.custom)).toEqual(
      [...submitted]
        .reverse()
        .map(({ user_id, rating }) => ({ userId: user_id, rating })),
    );
  });
});
