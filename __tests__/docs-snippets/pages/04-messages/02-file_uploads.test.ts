import { mkdtempSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { StreamError } from '../../../../index';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';

// A 4x4 JPEG and a minimal PDF, written to a temp dir: the docs read `./image1.jpg`,
// `./image2.jpg` and `./report.pdf`, COPY-mapped to these paths.
const JPEG_BASE64 =
  '/9j/4AAQSkZJRgABAQAAkACQAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAASgAwAEAAAAAQAAAAQAAAAA/8AAEQgABAAEAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A/fSJPL34JO5i3J6Z7D2qXNNHeloA/9k=';
const fixtureDir = mkdtempSync(join(tmpdir(), 'docs-file-uploads-'));
const image1Path = join(fixtureDir, 'image1.jpg');
const image2Path = join(fixtureDir, 'image2.jpg');
const reportPath = join(fixtureDir, 'report.pdf');
writeFileSync(image1Path, Buffer.from(JPEG_BASE64, 'base64'));
writeFileSync(image2Path, Buffer.from(JPEG_BASE64, 'base64'));
writeFileSync(reportPath, '%PDF-1.4\n%%EOF\n');

const client = getServerClient();

/** Swallows the 404 of deleting an upload that is already gone. */
const ignoreMissingFile = (error: unknown) => {
  if (error instanceof StreamError && error.metadata?.responseCode === 404) {
    return;
  }
  throw error;
};
const cleanup = new Cleanup(client);
const johnId = uniqueId('john');
const channelId = uniqueId('general');
const cid = `messaging:${channelId}`;

// The first region imports from node modules, so it runs at module level (imports
// can't go inside a test). Everything is registered on `cleanup` before it is created.
cleanup.users.push(johnId);
cleanup.channels.push(cid);
cleanup.add(() => rm(fixtureDir, { recursive: true, force: true }));
await client.upsertUsers([{ id: johnId }]);
await client.chat
  .channel('messaging', channelId)
  .getOrCreate({ data: { created_by_id: johnId } });

// #region snippet docs="_default/04-messages/02-file_uploads.md" heading="Uploading Files to a Channel" tab="Node.js" index=1
// COPY: image1Path="./image1.jpg", image2Path="./image2.jpg", reportPath="./report.pdf", channelId="general", johnId="john"
import { readFile } from 'node:fs/promises';
import { File } from 'node:buffer';

const channel = client.chat.channel('messaging', channelId);

// Upload multiple images in parallel
const results = await Promise.all(
  [image1Path, image2Path].map(async (path) => {
    const bytes = await readFile(path);
    const upload = new File([bytes], path, { type: 'image/jpeg' });
    return channel.uploadChannelImage({ file: upload, user: { id: johnId } });
  }),
);

await channel.sendMessage({
  message: {
    text: 'Check out these images',
    user_id: johnId,
    attachments: results.map((response) => ({
      type: 'image',
      asset_url: response.file,
      thumb_url: response.file,
      custom: {},
    })),
  },
});

const report = await readFile(reportPath);
const reportUpload = new File([report], 'report.pdf', {
  type: 'application/pdf',
});
const fileRes = await channel.uploadChannelFile({
  file: reportUpload,
  user: { id: johnId },
});

await channel.sendMessage({
  message: {
    text: 'Here is the report',
    user_id: johnId,
    attachments: [
      {
        type: 'file',
        asset_url: fileRes.file,
        title: 'report.pdf',
        custom: {},
      },
    ],
  },
});
// #endregion snippet

describe('_default/04-messages/02-file_uploads.md', () => {
  afterAll(() => cleanup.run());

  it('uploads files to a channel and attaches them to messages', async () => {
    expect(results).toHaveLength(2);
    for (const response of results) {
      expect(response.file).toMatch(/^https:\/\//);
    }
    expect(fileRes.file).toMatch(/^https:\/\//);

    const { messages } = await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ state: true, messages: { limit: 10 } });
    const images = messages.find((m) => m.text === 'Check out these images');
    expect(images?.attachments.map((a) => a.type)).toEqual(['image', 'image']);
    expect(images?.attachments.every((a) => !!a.asset_url)).toBe(true);
    const reportMessage = messages.find((m) => m.text === 'Here is the report');
    expect(reportMessage?.attachments[0]).toMatchObject({
      type: 'file',
      title: 'report.pdf',
    });
    expect(reportMessage?.attachments[0]?.asset_url).toBeTruthy();
  });

  it('deletes files', async () => {
    const uploadChannel = client.chat.channel('messaging', channelId);
    const jpeg = Buffer.from(JPEG_BASE64, 'base64');
    const { file: fileURL } = await uploadChannel.uploadChannelFile({
      file: new File(['hello'], 'hello.txt', { type: 'text/plain' }),
      user: { id: johnId },
    });
    const { file: imageURL } = await uploadChannel.uploadChannelImage({
      file: new File([jpeg], 'image.jpg', { type: 'image/jpeg' }),
      user: { id: johnId },
    });
    const { file: standaloneFileURL } = await client.uploadFile({
      file: new File(['hello'], 'hello.txt', { type: 'text/plain' }),
      user: { id: johnId },
    });
    const { file: standaloneImageURL } = await client.uploadImage({
      file: new File([jpeg], 'image.jpg', { type: 'image/jpeg' }),
      user: { id: johnId },
    });
    // In case the region fails before deleting them.
    cleanup.add(() =>
      client.deleteFile({ url: standaloneFileURL }).catch(ignoreMissingFile),
    );
    cleanup.add(() =>
      client.deleteImage({ url: standaloneImageURL }).catch(ignoreMissingFile),
    );
    for (const url of [
      fileURL,
      imageURL,
      standaloneFileURL,
      standaloneImageURL,
    ]) {
      expect(url).toMatch(/^https:\/\//);
    }

    // #region snippet docs="_default/04-messages/02-file_uploads.md" heading="Deleting Files" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Delete from the channel
    await channel.deleteChannelFile({ url: fileURL });
    await channel.deleteChannelImage({ url: imageURL });

    // Delete a standalone upload
    await client.deleteFile({ url: standaloneFileURL });
    await client.deleteImage({ url: standaloneImageURL });
    // #endregion snippet

    // Deleting them again fails: they are gone.
    const missing = { code: 16, metadata: { responseCode: 404 } };
    await expect(
      channel.deleteChannelFile({ url: fileURL }),
    ).rejects.toMatchObject(missing);
    await expect(
      channel.deleteChannelImage({ url: imageURL }),
    ).rejects.toMatchObject(missing);
    await expect(
      client.deleteFile({ url: standaloneFileURL }),
    ).rejects.toMatchObject(missing);
    await expect(
      client.deleteImage({ url: standaloneImageURL }),
    ).rejects.toMatchObject(missing);
  });

  it('sends an attachment hosted on your own CDN', async () => {
    const localPath = './image.jpg';
    const cdnUrl = 'https://example.com/cdn/image.jpg';
    const customCDN = { upload: (_path: string) => Promise.resolve(cdnUrl) };

    // #region snippet docs="_default/04-messages/02-file_uploads.md" heading="Using Your Own CDN" tab="Node.js" index=1
    // COPY: channelId="general", johnId="john"
    // An attachment URL can point anywhere. Upload to your own CDN and build the
    // attachment yourself.
    const assetUrl = await customCDN.upload(localPath);

    const channel = client.chat.channel('messaging', channelId);
    await channel.sendMessage({
      message: {
        text: 'Message with file attachment',
        user_id: johnId,
        attachments: [
          { type: 'file', asset_url: assetUrl, title: 'image.jpg', custom: {} },
        ],
      },
    });
    // #endregion snippet

    const { messages } = await channel.getOrCreate({
      state: true,
      messages: { limit: 10 },
    });
    const sent = messages.find(
      (m) => m.text === 'Message with file attachment',
    );
    expect(sent?.attachments[0]).toMatchObject({
      type: 'file',
      asset_url: cdnUrl,
      title: 'image.jpg',
    });
  });
});
