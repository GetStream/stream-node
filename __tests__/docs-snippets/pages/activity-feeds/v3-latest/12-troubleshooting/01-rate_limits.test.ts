import { describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';

const DOCS =
  'activity-feeds/v3-latest/_default/12-troubleshooting/01-rate_limits.md';

/** The platform keys of a rate limits response. */
const platforms = (response: object) =>
  Object.keys(response)
    .filter((k) => !['duration', 'metadata'].includes(k))
    .sort();

const every = [
  'android',
  'ios',
  'server_side',
  'unity',
  'unity_console',
  'unity_desktop',
  'web',
];

describe(DOCS, () => {
  const client = getServerClient();

  it('Inspecting rate limits', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/12-troubleshooting/01-rate_limits.md" heading="Inspecting rate limits" tab="Node.js" index=1
    // 1. Get feeds rate limits, server-side platform
    const serverSideLimits = await client.feeds.getFeedsRateLimits({
      server_side: true,
    });

    // 2. Get feeds rate limits, all platforms
    const allLimits = await client.feeds.getFeedsRateLimits();

    // 3. Get feeds rate limits, iOS and Android
    const platformLimits = await client.feeds.getFeedsRateLimits({
      ios: true,
      android: true,
    });

    // 4. Get feeds rate limits for specific endpoints
    const endpointLimits = await client.feeds.getFeedsRateLimits({
      endpoints: 'QueryActivities,AddActivity,GetOrCreateFeed',
    });

    // Get rate limits (all platforms, common and moderation endpoints)
    const rateLimits = await client.getRateLimits();
    // #endregion snippet

    expect(platforms(serverSideLimits)).toEqual(['server_side']);
    expect(typeof serverSideLimits.server_side?.AddActivity?.limit).toBe(
      'number',
    );
    // Feeds endpoints only.
    expect(serverSideLimits.server_side?.QueryUsers).toBeUndefined();

    expect(platforms(allLimits)).toEqual(
      expect.arrayContaining(['android', 'ios', 'server_side', 'web']),
    );

    expect(platforms(platformLimits)).toEqual(['android', 'ios']);

    for (const platform of platforms(endpointLimits)) {
      const limits = (endpointLimits as unknown as Record<string, object>)[
        platform
      ];
      expect(Object.keys(limits).sort()).toEqual([
        'AddActivity',
        'GetOrCreateFeed',
        'QueryActivities',
      ]);
    }

    expect(platforms(rateLimits)).toEqual(every);
    expect(rateLimits.server_side?.QueryUsers).toBeDefined();
  });
});
