import { mkdtempSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerUser } from '../../../helpers/server';
import { jpeg } from '../../../helpers/uploads';

// The "Uploading Standalone Files" fence of 02-file_uploads.md. It is in its own file
// because it imports the same names as the "Uploading Files to a Channel" fence, and
// imports can only run at module level (one binding per module).

// A 4x4 JPEG, written to a temp dir: the docs read `./avatar.jpg`, COPY-mapped to it.
const fixtureDir = mkdtempSync(join(tmpdir(), 'docs-file-uploads-'));
const avatarPath = join(fixtureDir, 'avatar.jpg');
writeFileSync(avatarPath, jpeg);

const client = getServerClient();
const cleanup = new Cleanup(client);
const userId = uniqueId('user');

// Everything is registered on `cleanup` before it is created.
cleanup.users.push(userId);
cleanup.add(() => rm(fixtureDir, { recursive: true, force: true }));
await client.upsertUsers([{ id: userId }]);

// #region snippet docs="chat/_default/04-messages/02-file_uploads.md" heading="Uploading Standalone Files" tab="Node.js" index=1
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
