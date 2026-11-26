import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { AddressInfo } from 'net';
import { Agent } from 'undici';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClient } from '../../src/ApiClient';
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
    { file: new File([new Uint8Array(1024 * 1024)], 'test-file.bin') },
    'multipart/form-data',
  );

const errorOf = async (request: Promise<unknown>): Promise<StreamError> => {
  try {
    await request;
  } catch (e) {
    return e as StreamError;
  }
  throw new Error('the request should have failed');
};

// The undici package's Agent and Node's bundled fetch types differ, which is
// also why `StreamClientOptions.agent` is `unknown`.
const asAgent = (agent: Agent) => agent as unknown as ApiConfig['agent'];

// Bun's fetch ignores the undici `dispatcher`.
const itWithUndiciAgent = it.skipIf('bun' in process.versions);

describe('request timeouts', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gives regular requests the timeout as a deadline', async () => {
    const fetchSpy = mockFetch();
    const timeoutSpy = vi.spyOn(AbortSignal, 'timeout');

    await createApiClient().sendRequest('GET', '/test');

    expect(timeoutSpy.mock.calls).toEqual([[3000]]);
    expect(fetchSpy.mock.calls[0][1]!.signal).toBeInstanceOf(AbortSignal);
  });

  it('does not cut uploads off at the request timeout', async () => {
    const fetchSpy = mockFetch();

    await upload(createApiClient());

    expect(fetchSpy.mock.calls[0][1]!.signal).toBeUndefined();
  });

  describe('against a real server', () => {
    let server: Server | undefined;
    let agent: Agent | undefined;

    afterEach(async () => {
      server?.closeAllConnections();
      await new Promise((resolve) => server?.close(resolve) ?? resolve(null));
      await agent?.destroy();
      server = undefined;
      agent = undefined;
    });

    const listen = async (
      handler: (req: IncomingMessage, res: ServerResponse) => void,
    ) => {
      server = createServer(handler);
      await new Promise<void>((resolve) =>
        server!.listen(0, '127.0.0.1', resolve),
      );
      return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    };

    /** Reads the request, sends the headers and part of the body, then stalls. */
    const stallingServer = (status: number) =>
      listen((req, res) => {
        req.resume();
        req.on('end', () => {
          res.writeHead(status, {
            'Content-Type': 'application/json',
            'x-ratelimit-limit': '100',
          });
          res.write('{"duration":');
        });
      });

    itWithUndiciAgent(
      "bounds a stalled upload by the agent's headersTimeout",
      async () => {
        // The server never reads the upload and never answers.
        const baseUrl = await listen((req) => req.pause());
        agent = new Agent({ headersTimeout: 200 });

        const error = await errorOf(
          upload(createApiClient({ baseUrl, agent: asAgent(agent) })),
        );

        expect(error).toBeInstanceOf(StreamError);
        expect(error.metadata.responseCode).toBeUndefined();
        expect(((error.cause as Error).cause as { code: string }).code).toBe(
          'UND_ERR_HEADERS_TIMEOUT',
        );
      },
    );

    itWithUndiciAgent(
      "keeps the response metadata when the agent's bodyTimeout fires on an upload",
      async () => {
        const baseUrl = await stallingServer(201);
        agent = new Agent({ bodyTimeout: 200 });

        const error = await errorOf(
          upload(createApiClient({ baseUrl, agent: asAgent(agent) })),
        );

        expect(error.metadata.responseCode).toBe(201);
        expect(error.metadata.responseHeaders?.get('x-ratelimit-limit')).toBe(
          '100',
        );
      },
    );

    it('keeps the status and headers when a success body times out', async () => {
      const baseUrl = await stallingServer(201);

      const error = await errorOf(
        createApiClient({ baseUrl, timeout: 100 }).sendRequest('GET', '/test'),
      );

      expect(error).toBeInstanceOf(StreamError);
      expect(error.metadata.responseCode).toBe(201);
      expect(error.metadata.responseHeaders?.get('x-ratelimit-limit')).toBe(
        '100',
      );
      expect(error.metadata.rateLimit?.rateLimit).toBe(100);
      expect(error.metadata.clientRequestId).toEqual(expect.any(String));
      expect((error.cause as Error).name).toBe('TimeoutError');
      expect(error.message).toContain('100ms timeout');
    });

    it('reports a timeout, not a status error, when an error body times out', async () => {
      const baseUrl = await stallingServer(400);

      const error = await errorOf(
        createApiClient({ baseUrl, timeout: 100 }).sendRequest('GET', '/test'),
      );

      expect(error).toBeInstanceOf(StreamError);
      expect(error.metadata.responseCode).toBe(400);
      expect(error.metadata.responseHeaders?.get('x-ratelimit-limit')).toBe(
        '100',
      );
      expect((error.cause as Error).name).toBe('TimeoutError');
      expect(error.message).toContain('100ms timeout');
    });

    it('keeps the parse error as the cause of a non-JSON error response', async () => {
      const baseUrl = await listen((req, res) => {
        req.resume();
        req.on('end', () => {
          res.writeHead(502, { 'Content-Type': 'text/html' });
          res.end('<html>bad gateway</html>');
        });
      });

      const error = await errorOf(
        createApiClient({ baseUrl }).sendRequest('GET', '/test'),
      );

      expect(error).toBeInstanceOf(StreamError);
      expect(error.message).toBe('Stream error: 502 - Bad Gateway');
      expect(error.code).toBe(502);
      expect(error.metadata.responseCode).toBe(502);
      expect(error.cause).toBeInstanceOf(SyntaxError);
    });
  });
});
