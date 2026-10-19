import { afterEach, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { retryOnRateLimit } from '../../../../helpers/wait';

const DOCS = 'video/api/04-quality/03-stats.md';

describe(DOCS, () => {
  const client = getServerClient();

  afterEach(() => vi.restoreAllMocks());

  it('Active calls status endpoint', async () => {
    // `getActiveCallsStatus` is limited to 6 requests per minute: retry on 429.
    const original = client.video.getActiveCallsStatus.bind(client.video);
    vi.spyOn(client.video, 'getActiveCallsStatus').mockImplementation(() =>
      retryOnRateLimit(original),
    );

    // #region snippet docs="video/api/04-quality/03-stats.md" heading="Active calls status endpoint" tab="Node.js"
    const response = await client.video.getActiveCallsStatus();
    // #endregion snippet

    // The status covers the last minute.
    expect(response.start_time).toBeInstanceOf(Date);
    expect(response.end_time).toBeInstanceOf(Date);
    expect(
      response.end_time.getTime() - response.start_time.getTime(),
    ).toBeGreaterThan(0);
    // The test app usually has no running calls, so the numbers can be 0.
    expect(typeof response.summary?.active_calls).toBe('number');
    expect(typeof response.summary?.active_publishers).toBe('number');
    expect(typeof response.summary?.active_subscribers).toBe('number');
    expect(typeof response.summary?.participants).toBe('number');
    expect(response.metrics).toHaveProperty('join_call_api');
    expect(response.metrics).toHaveProperty('publishers');
    expect(response.metrics).toHaveProperty('subscribers');
  });
});
