import { afterEach, describe, expect, it, vi } from 'vitest';
import { StreamClient } from '../../../../../index';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET as string;

// #region snippet docs="platform/04-using-the-api/06-connection-pooling.md" heading="SDK-specific notes" tab="Node.js" index=1
import { Agent } from 'undici';

const client = new StreamClient(apiKey, apiSecret, {
  agent: new Agent({ connections: 100 }),
});
// #endregion snippet

describe('platform/04-using-the-api/06-connection-pooling.md', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('passes the custom undici Agent to fetch as its dispatcher', async () => {
    // No network: only check what the SDK hands to the built-in fetch.
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ app: { name: 'app' }, duration: '0' })),
      );

    const response = await client.getApp();

    expect(response.app.name).toBe('app');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.mock.calls[0][1]?.dispatcher).toBeInstanceOf(Agent);
  });

  it('calls the API through the custom Agent', async () => {
    // Calls go through: the spy only records that the undici Agent handled the request.
    const dispatch = vi.spyOn(Agent.prototype, 'dispatch');

    const response = await client.getApp();

    expect(dispatch).toHaveBeenCalled();
    expect(typeof response.app.name).toBe('string');
  });
});
