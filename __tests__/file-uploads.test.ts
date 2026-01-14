import { beforeAll, describe, it, expect } from 'vitest';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import fs from 'fs';
import path from 'path';
import { File } from 'buffer';

// Don't want to upload files and image every time we run the tests
describe.skip('global file uploads', () => {
  let client: StreamClient;
  const user = {
    id: 'stream-node-test-user',
    role: 'admin',
  };

  beforeAll(async () => {
    client = createTestClient();
    await client.upsertUsers([user]);
  });

  it('upload and delete file', async () => {
    // Read the test PDF file from assets
    const filePath = path.join(__dirname, 'assets', 'test-file.pdf');
    const fileBuffer = fs.readFileSync(filePath);

    const response = await client.uploadFile({
      file: new File([fileBuffer], 'test-file.pdf'),
      user: { id: user.id },
    });

    expect(response).toBeDefined();
    expect(response.file).toBeDefined();
    expect(response.duration).toBeDefined();

    const deleteResponse = await client.deleteFile({
      url: response.file,
    });

    expect(deleteResponse).toBeDefined();
  });

  it('upload image', async () => {
    // Read the test PDF file from assets
    const filePath = path.join(__dirname, 'assets', 'test-image.jpg');
    const fileBuffer = fs.readFileSync(filePath);

    const uploadSizes = [
      {
        width: 100,
        height: 100,
        resize: 'scale' as 'scale',
        crop: 'center' as 'center',
      },
    ];

    // Upload the file
    const response = await client.uploadImage({
      file: new File([fileBuffer], 'test-image.jpg'),
      user: { id: user.id },
      upload_sizes: uploadSizes,
    });

    expect(response.upload_sizes?.length).toBe(1);
    expect(response.upload_sizes?.[0]).toMatchObject(uploadSizes[0]);
    const deleteResponse = await client.deleteImage({
      url: response.file,
    });

    expect(deleteResponse).toBeDefined();
  });
});
