import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

describe('platform/04-using-the-api/01-rate-limits.md', () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const userId = uniqueId('john');

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await cleanup.run();
  });

  it('reads the rate limit headers from a response', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="platform/04-using-the-api/01-rate-limits.md" heading="Rate Limit Headers" tab="Node.js" index=1
    // COPY: userId="john"
    const response = await client.queryUsers({
      payload: { filter_conditions: { id: userId } },
    });
    const rateLimit = response.metadata.rateLimit;
    // the total limit allowed for the resource requested
    console.log(rateLimit.rateLimit);
    // the remaining limit
    console.log(rateLimit.rateLimitRemaining);
    // when the current limit will reset - Date
    console.log(rateLimit.rateLimitReset);
    // #endregion snippet

    expect(response.users.map((u) => u.id)).toEqual([userId]);

    // The values come from the X-RateLimit-* response headers.
    const headers = response.metadata.responseHeaders;
    expect(rateLimit.rateLimit).toBe(Number(headers.get('x-ratelimit-limit')));
    expect(rateLimit.rateLimit).toBeGreaterThan(0);
    expect(rateLimit.rateLimitRemaining).toBe(
      Number(headers.get('x-ratelimit-remaining')),
    );
    expect(rateLimit.rateLimitRemaining).toBeLessThanOrEqual(
      rateLimit.rateLimit ?? 0,
    );
    expect(rateLimit.rateLimitReset).toBeInstanceOf(Date);
    expect(rateLimit.rateLimitReset?.getTime()).toBe(
      Number(headers.get('x-ratelimit-reset')) * 1000,
    );

    expect(log.mock.calls).toEqual([
      [rateLimit.rateLimit],
      [rateLimit.rateLimitRemaining],
      [rateLimit.rateLimitReset],
    ]);
  });

  it('inspects the rate limits through the API', async () => {
    // #region snippet docs="platform/04-using-the-api/01-rate-limits.md" heading="Inspecting Rate Limits" tab="Node.js" index=1
    // Server-side platform only
    const serverSideLimits = await client.getRateLimits({ server_side: true });

    // All platforms
    const allLimits = await client.getRateLimits();

    // Specific platforms
    const platformLimits = await client.getRateLimits({
      ios: true,
      android: true,
    });

    // Specific endpoints
    const endpointLimits = await client.getRateLimits({
      endpoints: 'QueryUsers,UpdateUsers',
    });
    // #endregion snippet

    const platforms = (r: object) =>
      Object.keys(r)
        .filter((k) => !['duration', 'metadata'].includes(k))
        .sort();

    expect(platforms(serverSideLimits)).toEqual(['server_side']);
    expect(serverSideLimits.server_side?.QueryUsers).toMatchObject({
      limit: 1000,
    });

    const every = [
      'android',
      'ios',
      'server_side',
      'unity',
      'unity_console',
      'unity_desktop',
      'web',
    ];
    expect(platforms(allLimits)).toEqual(every);
    expect(Object.keys(allLimits.server_side ?? {}).length).toBeGreaterThan(2);

    expect(platforms(platformLimits)).toEqual(['android', 'ios']);

    // Every platform, restricted to the two endpoints.
    expect(platforms(endpointLimits)).toEqual(every);
    for (const endpoints of [
      endpointLimits.server_side,
      endpointLimits.ios,
      endpointLimits.web,
    ]) {
      expect(Object.keys(endpoints ?? {}).sort()).toEqual([
        'QueryUsers',
        'UpdateUsers',
      ]);
    }
    const queryUsers = endpointLimits.server_side?.QueryUsers;
    expect(queryUsers?.limit).toBe(1000);
    expect(queryUsers?.remaining).toBeLessThanOrEqual(1000);
    expect(typeof queryUsers?.reset).toBe('number');
  });
});
