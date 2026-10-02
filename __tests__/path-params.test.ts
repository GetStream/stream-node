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
 * Sends a request with the given path params and returns the URL that was
 * actually requested.
 */
const requestedUrlFor = async (
  url: string,
  pathParams: Record<string, string>,
) => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

  await createApiClient().sendRequest('GET', url, pathParams);

  return new URL(fetchSpy.mock.calls[0][0]);
};

describe('path param serialization', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('leaves plain values unchanged', async () => {
    const url = await requestedUrlFor('/api/v2/chat/messages/{id}', {
      id: 'message-1_a',
    });

    expect(url.pathname).toBe('/api/v2/chat/messages/message-1_a');
  });

  it('keeps reserved characters inside a single path segment', async () => {
    const url = await requestedUrlFor('/api/v2/chat/messages/{id}', {
      id: 'a/b?c#d',
    });

    expect(url.pathname).toBe('/api/v2/chat/messages/a%2Fb%3Fc%23d');
    expect(url.search).toBe('?api_key=test-api-key');
    expect(url.hash).toBe('');
  });

  it('encodes each path param separately', async () => {
    const url = await requestedUrlFor(
      '/api/v2/video/call/{type}/{id}/{session}',
      { type: 'default', id: 'call 100%', session: 's/1' },
    );

    expect(url.pathname).toBe('/api/v2/video/call/default/call%20100%25/s%2F1');
  });
});
