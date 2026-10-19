import { afterEach, describe, expect, it, vi } from 'vitest';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const secret = process.env.STREAM_SECRET as string;

// #region snippet docs="activity-feeds/v3-latest/node/01-basics/02-installation.md" heading="Custom HTTP agent" tab="Node.js" index=1
import { StreamClient } from '@stream-io/node-sdk';
import { Agent } from 'undici';

const agent = new Agent({
  connections: 10, // max connections per origin
  keepAliveTimeout: 55_000, // idle socket timeout in ms
});

const client = new StreamClient(apiKey, secret, { timeout: 3000, agent });
// #endregion snippet

describe('activity-feeds/v3-latest/node/01-basics/02-installation.md (Custom HTTP agent)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the API through the custom undici Agent', async () => {
    const timeout = vi.spyOn(AbortSignal, 'timeout');
    const dispatch = vi.spyOn(Agent.prototype, 'dispatch');

    const response = await client.feeds.listFeedGroups();

    expect(response.groups).toHaveProperty('user');
    expect(timeout).toHaveBeenCalledWith(3000);
    expect(dispatch).toHaveBeenCalled();
  });
});
