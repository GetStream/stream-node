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

const sendRequestWithResponse = (response: Response) => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(response);
  return createApiClient()
    .sendRequest('POST', '/test', undefined, undefined, {})
    .catch((e: unknown) => e);
};

describe('API errors', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps the parsed error body on the thrown StreamError', async () => {
    const body = {
      code: 4,
      message:
        'RewindChannel failed with error: "expected_last_message_id is stale"',
      StatusCode: 409,
      duration: '0.42ms',
      more_info: 'https://getstream.io/chat/docs/api_errors_response',
      details: [],
      exception_fields: { last_message_id: 'stale' },
    };

    const error = await sendRequestWithResponse(
      new Response(JSON.stringify(body), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    expect(error).toBeInstanceOf(StreamError);
    const streamError = error as StreamError;
    expect(streamError.message).toBe(`Stream error code 4: ${body.message}`);
    expect(streamError.code).toBe(4);
    expect(streamError.metadata.responseCode).toBe(409);
    expect(streamError.apiError).toEqual(body);
    expect(streamError.apiError?.exception_fields).toEqual({
      last_message_id: 'stale',
    });
  });

  it('leaves apiError undefined when the error body is not JSON', async () => {
    const error = await sendRequestWithResponse(
      new Response('<html>Bad Gateway</html>', {
        status: 502,
        statusText: 'Bad Gateway',
      }),
    );

    expect(error).toBeInstanceOf(StreamError);
    const streamError = error as StreamError;
    expect(streamError.message).toBe('Stream error: 502 - Bad Gateway');
    expect(streamError.code).toBe(502);
    expect(streamError.apiError).toBeUndefined();
  });
});
