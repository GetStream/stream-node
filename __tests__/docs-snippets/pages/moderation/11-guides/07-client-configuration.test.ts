import { afterEach, describe, expect, it, vi } from 'vitest';
import { StreamClient } from '../../../../../index';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET as string;

// #region snippet docs="moderation/_default/11-guides/07-client-configuration.md" heading="Node" tab="Node.js" index=1
// COPY: apiKey="YOUR_API_KEY", apiSecret="YOUR_API_SECRET"
import { Agent } from 'undici';

const client = new StreamClient(apiKey, apiSecret, {
  timeout: 10000, // Request timeout in milliseconds
  agent: new Agent({
    keepAliveTimeout: 30000, // Keep-alive timeout in ms
    keepAliveMaxTimeout: 60000, // Max keep-alive timeout in ms
    connections: 50, // Max concurrent connections per host
    pipelining: 1, // HTTP pipelining
  }),
});
// #endregion snippet

describe('moderation/_default/11-guides/07-client-configuration.md', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the API with the custom timeout and undici Agent', async () => {
    const timeout = vi.spyOn(AbortSignal, 'timeout');
    const dispatch = vi.spyOn(Agent.prototype, 'dispatch');

    const response = await client.getApp();

    expect(typeof response.app.name).toBe('string');
    expect(timeout).toHaveBeenCalledWith(10000);
    expect(dispatch).toHaveBeenCalled();
  });
});
