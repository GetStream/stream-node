import { mkdtempSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { getServerUser } from '../../helpers/server';

// The "Uploading Standalone Files" fence of 02-file_uploads.md. It is in its own file
// because it imports the same names as the "Uploading Files to a Channel" fence, and
// imports can only run at module level (one binding per module).

// A 4x4 JPEG, written to a temp dir: the docs read `./avatar.jpg`, COPY-mapped to it.
const JPEG_BASE64 =
  '/9j/4AAQSkZJRgABAQAAkACQAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAASgAwAEAAAAAQAAAAQAAAAA/8AAEQgABAAEAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A/fSJPL34JO5i3J6Z7D2qXNNHeloA/9k=';
const fixtureDir = mkdtempSync(join(tmpdir(), 'docs-file-uploads-'));
const avatarPath = join(fixtureDir, 'avatar.jpg');
writeFileSync(avatarPath, Buffer.from(JPEG_BASE64, 'base64'));

const client = getServerClient();
const cleanup = new Cleanup(client);
const userId = uniqueId('user');

// Everything is registered on `cleanup` before it is created.
cleanup.users.push(userId);
cleanup.add(() => rm(fixtureDir, { recursive: true, force: true }));
await client.upsertUsers([{ id: userId }]);

// #region snippet docs="_default/04-messages/02-file_uploads.md" heading="Uploading Standalone Files" tab="Node.js" index=1
// COPY: avatarPath="./avatar.jpg"
import { readFile } from 'node:fs/promises';
import { File } from 'node:buffer';

const bytes = await readFile(avatarPath);

const { file: imageUrl } = await client.uploadImage({
  file: new File([bytes], 'avatar.jpg', { type: 'image/jpeg' }),
  user: { id: userId },
});

// Example: use the image URL as a user avatar
await client.updateUsersPartial({
  users: [{ id: userId, set: { image: imageUrl } }],
});
// #endregion snippet

if (imageUrl) {
  cleanup.add(() => client.deleteImage({ url: imageUrl }));
}

describe('_default/04-messages/02-file_uploads.md (standalone files)', () => {
  afterAll(() => cleanup.run());

  it('uploads a standalone image and uses it as a user avatar', async () => {
    expect(imageUrl).toMatch(/^https:\/\//);
    const user = await getServerUser(client, userId);
    // The stored URL is re-signed on read, so compare without the query string.
    expect(user.image?.split('?')[0]).toBe(imageUrl?.split('?')[0]);
  });
});
