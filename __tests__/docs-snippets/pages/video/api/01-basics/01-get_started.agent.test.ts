import { afterEach, describe, expect, it, vi } from 'vitest';
import { StreamClient } from '../../../../../../index';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const appSecret = process.env.STREAM_SECRET as string;

// #region snippet docs="video/api/01-basics/01-get_started.md" heading="Configuring Fetch API for Node SDK" tab="Node.js" index=1
import { Agent } from 'undici';

const client = new StreamClient(apiKey, appSecret, {
  agent: new Agent({ connections: 100 }),
});
// #endregion snippet

describe('video/api/01-basics/01-get_started.md (Configuring Fetch API)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the API through the custom undici Agent', async () => {
    const dispatch = vi.spyOn(Agent.prototype, 'dispatch');

    const response = await client.getApp();

    expect(typeof response.app.name).toBe('string');
    expect(dispatch).toHaveBeenCalled();
  });
});
