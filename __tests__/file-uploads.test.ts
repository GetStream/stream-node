import { beforeAll, describe, it, expect } from 'vitest';
import { randomUUID } from 'crypto';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { StreamChannel } from '../src/StreamChannel';
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
        resize: 'scale',
        crop: 'center',
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

// Don't want to upload files and image every time we run the tests
describe.skip('channel file uploads', () => {
  let client: StreamClient;
  let channel: StreamChannel;
  const user = {
    id: 'stream-node-test-user',
    role: 'admin',
  };

  beforeAll(async () => {
    client = createTestClient();
    await client.upsertUsers([user]);

    channel = client.chat.channel('messaging', 'streamnodetest' + randomUUID());
    await channel.getOrCreate({ data: { created_by_id: user.id } });
  });

  it('upload and delete file', async () => {
    const filePath = path.join(__dirname, 'assets', 'test-file.pdf');
    const fileBuffer = fs.readFileSync(filePath);

    const response = await channel.uploadChannelFile({
      // @ts-expect-error API spec says file should be a string
      file: new File([fileBuffer], 'test-file.pdf'),
      user: { id: user.id },
    });

    expect(response.file).toBeDefined();

    const deleteResponse = await channel.deleteChannelFile({
      url: response.file,
    });

    expect(deleteResponse).toBeDefined();
  });

  it('upload image', async () => {
    const filePath = path.join(__dirname, 'assets', 'test-image.jpg');
    const fileBuffer = fs.readFileSync(filePath);

    const uploadSizes = [
      {
        width: 100,
        height: 100,
        resize: 'scale',
        crop: 'center',
      },
    ];

    const response = await channel.uploadChannelImage({
      // @ts-expect-error API spec says file should be a string
      file: new File([fileBuffer], 'test-image.jpg'),
      user: { id: user.id },
      upload_sizes: uploadSizes,
    });

    expect(response.upload_sizes?.length).toBe(1);
    expect(response.upload_sizes?.[0]).toMatchObject(uploadSizes[0]);

    const deleteResponse = await channel.deleteChannelImage({
      url: response.file,
    });

    expect(deleteResponse).toBeDefined();
  });
});
