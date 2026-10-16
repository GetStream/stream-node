import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClient } from '../../src/ApiClient';
import { StreamError } from '../../src/types';

const createApiClient = () =>
  new ApiClient({
    apiKey: 'test-api-key',
    token: 'test-token',
    baseUrl: 'https://example.com',
    timeout: 3000,
  });

const sendRequestError = (fetchError: Error) => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(fetchError);
  return createApiClient()
    .sendRequest('GET', '/test')
    .catch((e: unknown) => e);
};

describe('network errors', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('passes the original error as cause', async () => {
    const fetchError = new TypeError('fetch failed', {
      cause: new Error('invalid onRequestStart method'),
    });

    const error = await sendRequestError(fetchError);

    expect(error).toBeInstanceOf(StreamError);
    const streamError = error as StreamError;
    expect(streamError.message).toBe(
      'The request failed due to an unexpected error',
    );
    expect(streamError.code).toBeUndefined();
    expect(streamError.cause).toBe(fetchError);
  });

  it('passes the timeout error as cause', async () => {
    const timeoutError = new DOMException(
      'The operation was aborted due to timeout',
      'TimeoutError',
    );

    const error = await sendRequestError(timeoutError);

    expect(error).toBeInstanceOf(StreamError);
    const streamError = error as StreamError;
    expect(streamError.message).toContain('3000ms timeout');
    expect(streamError.code).toBeUndefined();
    expect(streamError.cause).toBe(timeoutError);
  });
});
