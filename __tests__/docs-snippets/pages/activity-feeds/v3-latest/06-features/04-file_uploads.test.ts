import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import {
  ignoreMissingFile,
  jpeg,
  MINIMAL_PDF,
} from '../../../../helpers/uploads';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/04-file_uploads.md';

// A 4x4 JPEG and a minimal PDF, written to a temp dir: the docs read
// `<import.meta.dirname>/assets/test-image.jpg` and `test-file.pdf`, and `import.meta.dirname` is
// COPY-mapped to the temp dir.
const fixturesDir = mkdtempSync(join(tmpdir(), 'docs-feeds-file-uploads-'));
mkdirSync(join(fixturesDir, 'assets'));
writeFileSync(join(fixturesDir, 'assets', 'test-image.jpg'), jpeg);
writeFileSync(join(fixturesDir, 'assets', 'test-file.pdf'), MINIMAL_PDF);

const client = getServerClient();
const cleanup = new Cleanup(client);
const userId = uniqueId('user');
const user = { id: userId };

// The upload region imports from node modules, so it runs at module level (imports
// can't go inside a test). Everything is registered on `cleanup` before it is created.
cleanup.users.push(userId);
cleanup.add(() => rm(fixturesDir, { recursive: true, force: true }));
await client.upsertUsers([user]);

// #region snippet docs="activity-feeds/v3-latest/_default/06-features/04-file_uploads.md" heading="How to upload a file or image" tab="Node.js" index=1
// COPY: fixturesDir=import.meta.dirname
import fs from 'fs';
import path from 'path';
import { File } from 'buffer';

const filePath = path.join(fixturesDir, 'assets', 'test-image.jpg');
const fileBuffer = fs.readFileSync(filePath);

const response = await client.uploadImage({
  file: new File([fileBuffer], 'test-image.jpg'),
  user: { id: user.id },
  upload_sizes: [
    {
      width: 100,
      height: 100,
      resize: 'scale',
      crop: 'center',
    },
  ],
});

const filePath2 = path.join(fixturesDir, 'assets', 'test-file.pdf');
const fileBuffer2 = fs.readFileSync(filePath2);

const fileResponse = await client.uploadFile({
  file: new File([fileBuffer2], 'test-file.pdf'),
  user: { id: user.id },
});
// #endregion snippet

for (const url of [response.file, fileResponse.file]) {
  if (url) {
    cleanup.add(() =>
      (url === response.file
        ? client.deleteImage({ url })
        : client.deleteFile({ url })
      ).catch(ignoreMissingFile),
    );
  }
}

describe(DOCS, () => {
  afterAll(() => cleanup.run());

  it('uploads an image and a file', () => {
    expect(response.file).toMatch(/^https:\/\//);
    expect(response.upload_sizes).toMatchObject([
      { width: 100, height: 100, resize: 'scale', crop: 'center' },
    ]);
    expect(fileResponse.file).toMatch(/^https:\/\//);
  });

  it('deletes an image and a file', async () => {
    const { file: imageUrl } = await client.uploadImage({
      file: new File([jpeg], 'image.jpg', { type: 'image/jpeg' }),
      user,
    });
    const { file: fileUrl } = await client.uploadFile({
      file: new File([MINIMAL_PDF], 'file.pdf', {
        type: 'application/pdf',
      }),
      user,
    });
    if (!imageUrl || !fileUrl) throw new Error('upload returned no url');
    // In case the region fails before deleting them.
    cleanup.add(() =>
      client.deleteImage({ url: imageUrl }).catch(ignoreMissingFile),
    );
    cleanup.add(() =>
      client.deleteFile({ url: fileUrl }).catch(ignoreMissingFile),
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/04-file_uploads.md" heading="Deleting Files and Images" tab="Node.js" index=1
    // COPY: imageUrl="<image url>", fileUrl="<file url>"
    await client.deleteImage({
      url: imageUrl,
    });

    await client.deleteFile({
      url: fileUrl,
    });
    // #endregion snippet

    // Deleting them again fails: they are gone.
    const missing = { code: 16, metadata: { responseCode: 404 } };
    await expect(client.deleteImage({ url: imageUrl })).rejects.toMatchObject(
      missing,
    );
    await expect(client.deleteFile({ url: fileUrl })).rejects.toMatchObject(
      missing,
    );
  });
});
