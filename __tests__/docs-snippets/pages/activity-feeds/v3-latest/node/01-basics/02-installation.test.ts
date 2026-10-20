import { afterEach, describe, expect, it, vi } from 'vitest';

// The docs' empty placeholders are COPY-mapped to the test app's credentials.
const streamApiKey = process.env.STREAM_API_KEY as string;
const streamSecret = process.env.STREAM_SECRET as string;

// #region snippet docs="activity-feeds/v3-latest/node/01-basics/02-installation.md" heading="Stream CLI and Agent Skills" tab="Node.js" index=1
// COPY: streamApiKey="", streamSecret=""
import { StreamClient } from '@stream-io/node-sdk';
// or
// const { StreamClient } = require("@stream-io/node-sdk");

const apiKey = streamApiKey;
const secret = streamSecret;
const client = new StreamClient(apiKey, secret);

// optionally add timeout to API requests
// the default timeout is 3000ms
const clientWithTimeout = new StreamClient(apiKey, secret, { timeout: 3000 });
// #endregion snippet

describe('activity-feeds/v3-latest/node/01-basics/02-installation.md (server-side client)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a client with the default timeout', async () => {
    const timeout = vi.spyOn(AbortSignal, 'timeout');

    const response = await client.feeds.listFeedGroups();

    expect(response.groups).toHaveProperty('user');
    expect(timeout).toHaveBeenCalledWith(3000);
  });

  it('creates a client with a custom timeout', async () => {
    const timeout = vi.spyOn(AbortSignal, 'timeout');

    const response = await clientWithTimeout.feeds.listFeedGroups();

    expect(response.groups).toHaveProperty('user');
    expect(timeout).toHaveBeenCalledWith(3000);
  });
});
