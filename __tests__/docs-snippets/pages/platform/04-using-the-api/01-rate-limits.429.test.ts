import { describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { uniqueId } from '../../../helpers/ids';

// The "Catching 429s" fence starts with an import, so its region runs at module level.
// Values it uses are declared above it (TDZ). The request never reaches the API: never
// flood the shared test app. The next `fetch` answers with a 429 shaped like the real
// API one (error code 9, X-RateLimit-* headers), and the SDK's own ApiClient turns it
// into the StreamError.
const client = getServerClient();
const userId = uniqueId('john');
const reset = Math.floor(Date.now() / 1000) + 30;
const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
  new Response(
    JSON.stringify({
      code: 9,
      message:
        'QueryUsers failed with error: "Too many requests, check response headers for more information."',
      StatusCode: 429,
      duration: '0.00ms',
      more_info: 'https://getstream.io/chat/docs/api_errors_response',
    }),
    {
      status: 429,
      headers: {
        'content-type': 'application/json',
        'x-ratelimit-limit': '1000',
        'x-ratelimit-remaining': '0',
        'x-ratelimit-reset': String(reset),
      },
    },
  ),
);
const queryUsers = vi.spyOn(client, 'queryUsers');
const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

// #region snippet docs="platform/04-using-the-api/01-rate-limits.md" heading="Catching 429s in backend SDKs" tab="Node.js" index=1
// COPY: userId="john"
import { StreamError } from '@stream-io/node-sdk';

try {
  await client.queryUsers({
    payload: { filter_conditions: { id: userId } },
  });
} catch (error) {
  if (error instanceof StreamError && error.metadata.responseCode === 429) {
    const rateLimit = error.metadata.rateLimit;
    // Wait until rateLimit.rateLimitReset, then retry
    console.log(rateLimit?.rateLimitReset);
  }
}
// #endregion snippet

// Capture what the region did, then restore the spies before any test runs.
const fetchCalls = fetchSpy.mock.calls.length;
const rejection: unknown = await (
  queryUsers.mock.results[0].value as Promise<unknown>
).catch((e: unknown) => e);
const logCalls = [...log.mock.calls];
vi.restoreAllMocks();

describe('platform/04-using-the-api/01-rate-limits.md (429)', () => {
  it('handles a 429 from the API (simulated)', () => {
    expect(fetchCalls).toBe(1);
    expect(rejection).toBeInstanceOf(StreamError);
    expect(rejection).toMatchObject({
      code: 9,
      metadata: { responseCode: 429 },
    });
    expect(logCalls).toEqual([[new Date(reset * 1000)]]);
  });
});
