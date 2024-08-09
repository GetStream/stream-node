import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';

describe('external storage CRUD API', () => {
  let client: StreamClient;
  const storageName = `streamnodetest${uuidv4()}`;

  beforeAll(() => {
    client = createTestClient();
  });

  it('create', async () => {
    const response = await client.createExternalStorage({
      name: storageName,
      bucket: 'test',
      storage_type: 's3',
    });

    expect(response).toBeDefined();
  });

  it('read', async () => {
    const readResponse = await client.listExternalStorage();

    expect(readResponse.external_storages).toBeDefined();
    expect(readResponse.external_storages[storageName]).toBeDefined();
  });

  it('update', async () => {
    const newBucket = 'new bucket';
    const response = await client.updateExternalStorage({
      name: storageName,
      bucket: newBucket,
      storage_type: 'abs',
    });

    expect(response.bucket).toBe('new bucket');
  });

  it('delete', async () => {
    const response = await client.deleteExternalStorage({ name: storageName });

    expect(response).toBeDefined();
  });
});
