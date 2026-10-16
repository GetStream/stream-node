import { describe, expect, it } from 'vitest';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET as string;

// #region snippet docs="platform/01-start-here/01-backend-sdks.md" heading="Creating a client" tab="Node.js" index=1
// COPY: apiKey="your_api_key", apiSecret="your_api_secret"
import { StreamClient } from '@stream-io/node-sdk';
// or: const { StreamClient } = require("@stream-io/node-sdk");

const client = new StreamClient(apiKey, apiSecret);
// #endregion snippet

describe('platform/01-start-here/01-backend-sdks.md', () => {
  it('creates a client that reaches the API with the key and secret', async () => {
    expect(client).toBeInstanceOf(StreamClient);
    expect(client.apiKey).toBe(apiKey);

    // App-level operations live on the client.
    const response = await client.getApp();
    expect(typeof response.app.name).toBe('string');

    // Product namespaces hang off the same client.
    expect(client.chat).toBeDefined();
    expect(client.video).toBeDefined();
    expect(client.feeds).toBeDefined();
    expect(client.moderation).toBeDefined();
  });
});
