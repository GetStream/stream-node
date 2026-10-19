import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { StreamError } from '../../../../../index';
import type { StreamChannel, UpdateAppRequest } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { waitForAppSetting } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'chat/_default/06-app_and_channel_settings/02-app_settings.md';

// A 4x4 JPEG, uploaded once as `.jpeg` (allowed) and once as `.jpg` (not in the docs list).
const JPEG_BASE64 =
  '/9j/4AAQSkZJRgABAQAAkACQAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAASgAwAEAAAAAQAAAAQAAAAA/8AAEQgABAAEAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A/fSJPL34JO5i3J6Z7D2qXNNHeloA/9k=';

// Short CSV content is sniffed as text/plain by the API, so use a few rows.
const CSV = 'name,age,city\nalice,30,Amsterdam\nbob,25,Boulder\n'.repeat(20);

/** A dev token: unsigned, only accepted while `disable_auth_checks` is on. */
const devToken = (userId: string) => {
  const part = (value: object) =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${part({ alg: 'HS256', typ: 'JWT' })}.${part({ user_id: userId })}.devtoken`;
};

/** Client-side query channels with a dev token: the HTTP status and the error message. */
const queryChannelsWithDevToken = async (userId: string) => {
  const response = await fetch(
    `https://chat.stream-io-api.com/channels?api_key=${process.env.STREAM_API_KEY ?? ''}`,
    {
      method: 'POST',
      headers: {
        Authorization: devToken(userId),
        'stream-auth-type': 'jwt',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        filter_conditions: { members: { $in: [userId] } },
      }),
    },
  );
  const body = (await response.json()) as { message?: string };
  return { status: response.status, message: body.message ?? '' };
};

/** The upload's Stream error message, or `undefined` if it was accepted. */
const uploadError = async (upload: () => Promise<unknown>) => {
  try {
    await upload();
    return undefined;
  } catch (error) {
    if (error instanceof StreamError && error.code === 4) return error.message;
    throw error;
  }
};

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const userId = uniqueId('uploader');
  const channelId = uniqueId('uploads');
  let channel: StreamChannel;

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    channel = client.chat.channel('messaging', channelId);
    cleanup.channels.push(`messaging:${channelId}`);
    await channel.getOrCreate({ data: { created_by_id: userId } });
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Authentication Behaviour', async () => {
    const { app } = await client.getApp();
    const original = app.disable_auth_checks;
    expect(original).toBe(false);
    cleanup.add(async () => {
      await client.updateApp({ disable_auth_checks: original });
      await waitForAppSetting(client, 'disable_auth_checks', original);
    });

    // After each update: wait until the setting has settled, then record whether a dev
    // token is accepted ("allows dev token usage").
    const devTokenStatus: number[] = [];
    const updateApp = client.updateApp.bind(client);
    vi.spyOn(client, 'updateApp').mockImplementation(
      async (request?: UpdateAppRequest) => {
        const response = await updateApp(request);
        const disabled = request?.disable_auth_checks ?? false;
        await waitForAppSetting(client, 'disable_auth_checks', disabled);
        // With auth checks on, API nodes reject the dev token with either "development
        // tokens are not allowed for this application" or "Token signature is invalid"
        // (seen for over a minute on some nodes): both are 401 rejections.
        const result = await retry(async () => {
          const query = await queryChannelsWithDevToken(userId);
          const settled = disabled
            ? query.status === 201
            : query.status === 401 &&
              (query.message.includes(
                'development tokens are not allowed for this application',
              ) ||
                query.message.includes('Token signature is invalid'));
          if (!settled) {
            throw new Error(
              `dev token not settled: ${query.status} ${query.message}`,
            );
          }
          return query;
        });
        devTokenStatus.push(result.status);
        return response;
      },
    );

    // #region snippet docs="chat/_default/06-app_and_channel_settings/02-app_settings.md" heading="Authentication Behaviour" tab="Node.js" index=1
    // disable auth checks, allows dev token usage
    await client.updateApp({
      disable_auth_checks: true,
    });

    // re-enable auth checks
    await client.updateApp({
      disable_auth_checks: false,
    });
    // #endregion snippet

    expect(devTokenStatus).toEqual([201, 401]);
    expect((await client.getApp()).app.disable_auth_checks).toBe(false);
  });

  it('File Uploads', async () => {
    const { app } = await client.getApp();
    const original = app.file_upload_config;
    expect(original.allowed_file_extensions ?? []).toEqual([]);
    cleanup.add(async () => {
      await client.updateApp({ file_upload_config: original });
      await retry(async () => {
        const { app: restored } = await client.getApp();
        expect(restored.file_upload_config).toEqual(original);
      });
    });

    // #region snippet docs="chat/_default/06-app_and_channel_settings/02-app_settings.md" heading="File Uploads" tab="Node.js" index=1
    // Only accept .CSV files
    await client.updateApp({
      file_upload_config: {
        size_limit: 0,
        allowed_file_extensions: ['.csv'],
        allowed_mime_types: ['text/csv'],
      },
    });
    // #endregion snippet

    const { app: updated } = await client.getApp();
    expect(updated.file_upload_config).toMatchObject({
      size_limit: 0,
      allowed_file_extensions: ['.csv'],
      allowed_mime_types: ['text/csv'],
    });

    // A .txt upload is rejected once the setting has reached the API nodes.
    const txtError = await retry(async () => {
      const message = await uploadError(() =>
        channel.uploadChannelFile({
          file: new File(['hello'], 'hello.txt', { type: 'text/plain' }),
          user: { id: userId },
        }),
      );
      if (message === undefined) throw new Error('.txt upload still accepted');
      return message;
    });
    expect(txtError).toContain('File extension .txt is not supported');

    const { file: csvUrl } = await channel.uploadChannelFile({
      file: new File([CSV], 'report.csv', { type: 'text/csv' }),
      user: { id: userId },
    });
    expect(csvUrl).toEqual(expect.any(String));
    await channel.deleteChannelFile({ url: csvUrl });
  });

  it('Image Uploads', async () => {
    const { app } = await client.getApp();
    const original = app.image_upload_config;
    expect(original.allowed_file_extensions ?? []).toEqual([]);
    cleanup.add(async () => {
      await client.updateApp({ image_upload_config: original });
      await retry(async () => {
        const { app: restored } = await client.getApp();
        expect(restored.image_upload_config).toEqual(original);
      });
    });

    // #region snippet docs="chat/_default/06-app_and_channel_settings/02-app_settings.md" heading="Image Uploads" tab="Node.js" index=1
    // Only accept gif, jpeg, or png files.
    await client.updateApp({
      image_upload_config: {
        size_limit: 0,
        allowed_file_extensions: ['.gif', '.jpeg', '.png'],
        allowed_mime_types: ['image/gif', 'image/jpeg', 'image/png'],
      },
    });
    // #endregion snippet

    const { app: updated } = await client.getApp();
    expect(updated.image_upload_config).toMatchObject({
      size_limit: 0,
      allowed_file_extensions: ['.gif', '.jpeg', '.png'],
      allowed_mime_types: ['image/gif', 'image/jpeg', 'image/png'],
    });

    const jpeg = Buffer.from(JPEG_BASE64, 'base64');
    // A .webp upload is rejected once the setting has reached the API nodes.
    const webpError = await retry(async () => {
      const message = await uploadError(() =>
        channel.uploadChannelImage({
          file: new File([jpeg], 'image.webp', { type: 'image/webp' }),
          user: { id: userId },
        }),
      );
      if (message === undefined) throw new Error('.webp upload still accepted');
      return message;
    });
    expect(webpError).toContain('File extension .webp is not supported');

    const { file: jpegUrl } = await channel.uploadChannelImage({
      file: new File([jpeg], 'image.jpeg', { type: 'image/jpeg' }),
      user: { id: userId },
    });
    expect(jpegUrl).toEqual(expect.any(String));
    if (jpegUrl) await channel.deleteChannelImage({ url: jpegUrl });
  });
});
