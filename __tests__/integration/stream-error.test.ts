import { randomUUID } from 'crypto';
import { describe, expect, it } from 'vitest';
import { StreamError } from '../../index';
import { createTestClient } from './create-test-client';

describe('StreamError', () => {
  const client = createTestClient();

  it('is exported from the package entry and thrown for failed requests', async () => {
    const error: unknown = await client.chat
      .getChannel({ type: 'messaging', id: `stream-node-test-${randomUUID()}` })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(StreamError);
    expect(error).toBeInstanceOf(Error);
    const streamError = error as StreamError;
    expect(streamError.code).toBeDefined();
    expect(streamError.metadata.responseCode).toBe(404);
  });
});
