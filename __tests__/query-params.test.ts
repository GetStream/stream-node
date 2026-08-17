import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClient } from '../src/ApiClient';

const createApiClient = () =>
  new ApiClient({
    apiKey: 'test-api-key',
    token: 'test-token',
    baseUrl: 'https://example.com',
    timeout: 3000,
  });

/**
 * Sends a request with the given query params and returns the query string
 * that was actually put on the wire.
 */
const queryStringFor = async (queryParams: Record<string, any>) => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

  await createApiClient().sendRequest('GET', '/test', undefined, queryParams);

  const requestedUrl = fetchSpy.mock.calls[0][0] as string;
  return new URL(requestedUrl).search.replace(/^\?/, '');
};

describe('query param serialization', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('serializes an array of objects as JSON', async () => {
    const search = await queryStringFor({
      sort: [{ field: 'created_at', direction: 1 }],
    });

    expect(search).toContain(
      `sort=${encodeURIComponent('[{"field":"created_at","direction":1}]')}`,
    );
  });

  it('keeps the param name for Date values', async () => {
    const search = await queryStringFor({
      start_time: new Date('2026-08-15T10:00:00.000Z'),
    });

    expect(search).toContain(
      `start_time=${encodeURIComponent('2026-08-15T10:00:00.000Z')}`,
    );
  });

  it('serializes an array of strings comma-separated', async () => {
    const search = await queryStringFor({ ids: ['first', 'second'] });

    expect(search).toContain(`ids=${encodeURIComponent('first,second')}`);
  });

  it('drops empty entries from an array of strings', async () => {
    const search = await queryStringFor({
      ids: ['first', null, undefined, 'second'],
    });

    expect(search).toContain(`ids=${encodeURIComponent('first,second')}`);
  });

  it('drops empty entries from an array of objects', async () => {
    const search = await queryStringFor({
      sort: [{ field: 'created_at', direction: 1 }, null],
    });

    expect(search).toContain(
      `sort=${encodeURIComponent('[{"field":"created_at","direction":1}]')}`,
    );
  });

  it('serializes a nested object as JSON', async () => {
    const search = await queryStringFor({
      payload: { sort: [{ field: 'created_at', direction: 1 }] },
    });

    expect(search).toContain(
      `payload=${encodeURIComponent(
        '{"sort":[{"field":"created_at","direction":1}]}',
      )}`,
    );
  });

  it('omits params with no value', async () => {
    const search = await queryStringFor({ limit: undefined, id_gt: null });

    expect(search).toBe('api_key=test-api-key');
  });
});
