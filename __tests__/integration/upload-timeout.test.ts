import { createServer, Server, ServerResponse } from 'http';
import { AddressInfo } from 'net';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClient, DEFAULT_UPLOAD_TIMEOUT } from '../../src/ApiClient';
import { StreamClient } from '../../src/StreamClient';
import { ApiConfig, StreamError } from '../../src/types';

const createApiClient = (config: Partial<ApiConfig> = {}) =>
  new ApiClient({
    apiKey: 'test-api-key',
    token: 'test-token',
    baseUrl: 'https://example.com',
    timeout: 3000,
    ...config,
  });

const mockFetch = () =>
  vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    ),
  );

const upload = (client: ApiClient) =>
  client.sendRequest(
    'POST',
    '/test',
    undefined,
    undefined,
    { file: new File(['file-contents'], 'test-file.pdf') },
    'multipart/form-data',
  );

/** The timeout (ms) the SDK armed for the single request it sent. */
const armedTimeout = (timeoutSpy: { mock: { calls: number[][] } }) => {
  expect(timeoutSpy.mock.calls).toHaveLength(1);
  return timeoutSpy.mock.calls[0][0];
};

describe('upload timeout', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gives multipart uploads an abort signal', async () => {
    const fetchSpy = mockFetch();

    await upload(createApiClient());

    expect(fetchSpy.mock.calls[0][1]!.signal).toBeInstanceOf(AbortSignal);
  });

  it('defaults uploads to DEFAULT_UPLOAD_TIMEOUT, not the request timeout', async () => {
    mockFetch();
    const timeoutSpy = vi.spyOn(AbortSignal, 'timeout');

    await upload(createApiClient({ timeout: 3000 }));

    expect(armedTimeout(timeoutSpy)).toBe(DEFAULT_UPLOAD_TIMEOUT);
  });

  it('never gives uploads less than the request timeout by default', async () => {
    mockFetch();
    const timeoutSpy = vi.spyOn(AbortSignal, 'timeout');

    await upload(createApiClient({ timeout: 120_000 }));

    expect(armedTimeout(timeoutSpy)).toBe(120_000);
  });

  it('uses uploadTimeout when set', async () => {
    mockFetch();
    const timeoutSpy = vi.spyOn(AbortSignal, 'timeout');

    await upload(createApiClient({ uploadTimeout: 5000 }));

    expect(armedTimeout(timeoutSpy)).toBe(5000);
  });

  it('keeps the request timeout for non-multipart requests', async () => {
    mockFetch();
    const timeoutSpy = vi.spyOn(AbortSignal, 'timeout');

    await createApiClient({ uploadTimeout: 5000 }).sendRequest('GET', '/test');

    expect(armedTimeout(timeoutSpy)).toBe(3000);
  });

  it('passes uploadTimeout from the StreamClient options', async () => {
    mockFetch();
    const timeoutSpy = vi.spyOn(AbortSignal, 'timeout');
    const client = new StreamClient('test-api-key', 'test-secret', {
      uploadTimeout: 7000,
    });

    await client.uploadFile({
      file: new File(['file-contents'], 'test-file.pdf'),
    });

    expect(armedTimeout(timeoutSpy)).toBe(7000);
  });

  it('aborts a stalled upload with a timeout error', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init!.signal!.addEventListener('abort', () =>
            reject(init!.signal!.reason as Error),
          );
        }),
    );

    const error = await upload(createApiClient({ uploadTimeout: 20 })).catch(
      (e: unknown) => e,
    );

    expect(error).toBeInstanceOf(StreamError);
    expect((error as StreamError).message).toContain('20ms timeout');
    expect((error as StreamError).message).toContain('uploadTimeout');
  });

  describe('when the response body stalls after the headers', () => {
    let server: Server | undefined;

    afterEach(async () => {
      server?.closeAllConnections();
      await new Promise((resolve) => server?.close(resolve) ?? resolve(null));
      server = undefined;
    });

    /** A real server that sends the headers and part of the body, then stalls. */
    const stallingServer = async (
      status: number,
      contentType = 'application/json',
      partialBody = '{"file":',
    ) => {
      server = createServer((req, res: ServerResponse) => {
        req.resume();
        req.on('end', () => {
          res.writeHead(status, {
            'Content-Type': contentType,
            'x-ratelimit-limit': '100',
          });
          res.write(partialBody);
        });
      });
      await new Promise<void>((resolve) =>
        server!.listen(0, '127.0.0.1', resolve),
      );
      return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    };

    const uploadTo = async (baseUrl: string): Promise<StreamError> => {
      try {
        await upload(createApiClient({ baseUrl, uploadTimeout: 100 }));
      } catch (e) {
        return e as StreamError;
      }
      throw new Error('the upload should have failed');
    };

    it('keeps the status and headers of a success response', async () => {
      const error = await uploadTo(await stallingServer(201));

      expect(error).toBeInstanceOf(StreamError);
      expect(error.metadata.responseCode).toBe(201);
      expect(error.metadata.responseHeaders?.get('x-ratelimit-limit')).toBe(
        '100',
      );
      expect(error.metadata.rateLimit?.rateLimit).toBe(100);
      expect(error.metadata.clientRequestId).toEqual(expect.any(String));
      expect((error.cause as Error).name).toBe('TimeoutError');
      expect(error.message).toContain('100ms timeout');
      expect(error.message).toContain('uploadTimeout');
      expect(error.message).toContain('may have already processed');
    });

    it('reports a timeout, not a status error, for an error response', async () => {
      const error = await uploadTo(await stallingServer(400));

      expect(error).toBeInstanceOf(StreamError);
      expect(error.metadata.responseCode).toBe(400);
      expect(error.metadata.responseHeaders?.get('x-ratelimit-limit')).toBe(
        '100',
      );
      expect((error.cause as Error).name).toBe('TimeoutError');
      expect(error.message).toContain('100ms timeout');
    });

    it('keeps the parse error as the cause of a non-JSON error response', async () => {
      server = createServer((req, res) => {
        req.resume();
        req.on('end', () => {
          res.writeHead(502, { 'Content-Type': 'text/html' });
          res.end('<html>bad gateway</html>');
        });
      });
      await new Promise<void>((resolve) =>
        server!.listen(0, '127.0.0.1', resolve),
      );
      const baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

      const error = await uploadTo(baseUrl);

      expect(error).toBeInstanceOf(StreamError);
      expect(error.message).toBe('Stream error: 502 - Bad Gateway');
      expect(error.code).toBe(502);
      expect(error.metadata.responseCode).toBe(502);
      expect(error.cause).toBeInstanceOf(SyntaxError);
    });
  });
});
