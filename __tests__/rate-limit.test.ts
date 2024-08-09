import { beforeAll, describe, expect, it } from 'vitest';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import exp from 'constants';

describe('rate limit', () => {
  let client: StreamClient;

  beforeAll(async () => {
    client = createTestClient();
  });

  it('should inspect rate limit', async () => {
    const response = await client.getRateLimits({
      server_side: true,
      endpoints: 'QueryChannels,GetOrCreateChannel',
    });

    expect(response.server_side).toBeDefined();
    expect(response.server_side!['QueryChannels']).toBeDefined();
    expect(response.server_side!['GetOrCreateChannel']).toBeDefined();
  });

  it('should get rate limit from response header', async () => {
    let response = await client.getApp();
    const rateLimit = response.metadata.rateLimit;
    const now = Date.now();

    expect(typeof rateLimit.rateLimit).toBe('number');
    expect(typeof rateLimit.rateLimitRemaining).toBe('number');
    expect(rateLimit.rateLimitReset instanceof Date).toBe(true);

    expect(rateLimit.rateLimit).toBe(
      +response.metadata.responseHeaders.get('x-ratelimit-limit')!,
    );
    expect(rateLimit.rateLimitRemaining).toBe(
      +response.metadata.responseHeaders.get('x-ratelimit-remaining')!,
    );
    expect(rateLimit.rateLimitReset!.getTime()).toBe(
      new Date(
        +response.metadata.responseHeaders.get('x-ratelimit-reset')! * 1000,
      ).getTime(),
    );

    // Some basic tests for date parsing
    expect(rateLimit.rateLimitReset!.getTime()).toBeGreaterThanOrEqual(now);
    expect(rateLimit.rateLimitReset!.getTime()).toBeLessThan(
      now + 1000 * 60 * 60 * 24,
    );

    response = await client.getApp();
    const rateLimit2 = response.metadata.rateLimit;

    // It might fail in some rare cases, but since we retry every test 3x, this shouldn't be a problem
    expect(rateLimit2.rateLimitRemaining).toBeLessThan(
      rateLimit.rateLimitRemaining!,
    );
  });

  it('should include rate limit in errors as well', async () => {
    const call = client.video.call('default', 'test');
    try {
      await call.startTranscription();
      throw new Error(`Method didn't throw`);
    } catch (error) {
      expect(error.code).toBeDefined();
      expect(error.metadata).toBeDefined();
      expect(error.metadata.responseCode).toBe(404);

      const rateLimit = error.metadata.rateLimit;

      expect(rateLimit.rateLimit).toBeDefined();
    }
  });
});
