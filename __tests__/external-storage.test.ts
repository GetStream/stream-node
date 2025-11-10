import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';

describe('external storage CRUD API', () => {
  let client: StreamClient;
  const storageName = `streamnodetest${uuidv4()}`;
  const s3name = `streamnodetest-${uuidv4()}`;
  const gcsName = `streamnodetest-${uuidv4()}`;
  const azureName = `streamnodetest-${uuidv4()}`;

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

  // Fails on CI a lot, most likely one issue is that we need to wait before trying to delete
  // Other issue is that it's easy to reach limits with these tests
  it.skip('docs snippets', async () => {
    await client.createExternalStorage({
      name: s3name,
      storage_type: 's3',
      bucket: 'my-bucket',
      path: 'directory_name/',
      aws_s3: {
        s3_api_key: 'us-east-1',
        s3_region: 'my-access-key',
        s3_secret: 'my-secret',
      },
    });

    await client.deleteExternalStorage({ name: s3name });

    await client.createExternalStorage({
      bucket: 'my-bucket',
      name: gcsName,
      storage_type: 'gcs',
      path: 'directory_name/',
      gcs_credentials: '{"type": "service_account"}',
    });

    await client.deleteExternalStorage({ name: gcsName });

    await client.createExternalStorage({
      name: azureName,
      storage_type: 'abs',
      bucket: 'my-bucket',
      path: 'directory_name/',
      azure_blob: {
        abs_account_name: '...',
        abs_client_id: '...',
        abs_client_secret: '...',
        abs_tenant_id: '...',
      },
    });

    await client.deleteExternalStorage({ name: azureName });
  });

  afterAll(async () => {
    try {
      await client.deleteExternalStorage({ name: s3name });
    } catch (error) {}
    try {
      await client.deleteExternalStorage({ name: gcsName });
    } catch (error) {}
    try {
      await client.deleteExternalStorage({ name: azureName });
    } catch (error) {}
    try {
      await client.deleteExternalStorage({ name: storageName });
    } catch (error) {}
  });
});
