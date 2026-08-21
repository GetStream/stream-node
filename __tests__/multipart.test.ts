import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClient } from '../src/ApiClient';
import { StreamChatClient } from '../src/StreamChatClient';
import { StreamClient } from '../src/StreamClient';

const createApiClient = () =>
  new ApiClient({
    apiKey: 'test-api-key',
    token: 'test-token',
    baseUrl: 'https://example.com',
    timeout: 3000,
  });

const mockFetch = () =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

/**
 * Sends a multipart request with the given body and returns the form data
 * that was actually put on the wire.
 */
const formDataFor = async (body: Record<string, any>) => {
  const fetchSpy = mockFetch();

  await createApiClient().sendRequest(
    'POST',
    '/test',
    undefined,
    undefined,
    body,
    'multipart/form-data',
  );

  return fetchSpy.mock.calls[0][1]!.body as FormData;
};

describe('multipart form data serialization', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('serializes an object field as JSON', async () => {
    const formData = await formDataFor({ user: { id: 'user-id' } });

    expect(formData.get('user')).toBe('{"id":"user-id"}');
  });

  it('serializes an array field as JSON', async () => {
    const formData = await formDataFor({
      upload_sizes: [{ width: 100, height: 100, resize: 'scale' }],
    });

    expect(formData.get('upload_sizes')).toBe(
      '[{"width":100,"height":100,"resize":"scale"}]',
    );
  });

  it('keeps a file field as a file', async () => {
    const file = new File(['file-contents'], 'test-file.pdf');
    const formData = await formDataFor({ file });

    const sent = formData.get('file');
    expect(sent).toBeInstanceOf(File);
    expect((sent as File).name).toBe('test-file.pdf');
    expect(await (sent as File).text()).toBe('file-contents');
  });

  it('omits fields with no value', async () => {
    const formData = await formDataFor({ user: undefined, custom: null });

    expect([...formData.keys()]).toEqual([]);
  });

  it('keeps scalar fields as-is', async () => {
    const formData = await formDataFor({ name: 'a-name', limit: 10 });

    expect(formData.get('name')).toBe('a-name');
    expect(formData.get('limit')).toBe('10');
  });

  it('does not double-encode an already JSON-encoded field', async () => {
    const formData = await formDataFor({
      user: JSON.stringify({ id: 'user-id' }),
    });

    expect(formData.get('user')).toBe('{"id":"user-id"}');
  });

  it('encodes the user of a global image upload', async () => {
    const fetchSpy = mockFetch();
    const client = new StreamClient('test-api-key', 'test-secret');

    await client.uploadImage({
      file: new File(['image-contents'], 'test-image.jpg'),
      upload_sizes: [{ width: 100, height: 100 }],
      user: { id: 'user-id' },
    });

    const formData = fetchSpy.mock.calls[0][1]!.body as FormData;
    expect(formData.get('user')).toBe('{"id":"user-id"}');
    expect(formData.get('upload_sizes')).toBe('[{"width":100,"height":100}]');
    expect(formData.get('file')).toBeInstanceOf(File);
  });

  it('omits the user of a global file upload when it has no value', async () => {
    const fetchSpy = mockFetch();
    const client = new StreamClient('test-api-key', 'test-secret');

    await client.uploadFile({
      file: new File(['file-contents'], 'test-file.pdf'),
    });

    const formData = fetchSpy.mock.calls[0][1]!.body as FormData;
    expect([...formData.keys()]).toEqual(['file']);
  });

  it('encodes the user of a channel image upload', async () => {
    const fetchSpy = mockFetch();
    const chat = new StreamChatClient(createApiClient());

    await chat.uploadChannelImage({
      type: 'messaging',
      id: 'channel-id',
      // @ts-expect-error API spec says file should be a string
      file: new File(['image-contents'], 'test-image.jpg'),
      upload_sizes: [{ width: 100, height: 100 }],
      user: { id: 'user-id' },
    });

    const formData = fetchSpy.mock.calls[0][1]!.body as FormData;
    expect(formData.get('user')).toBe('{"id":"user-id"}');
    expect(formData.get('upload_sizes')).toBe('[{"width":100,"height":100}]');
    expect(formData.get('file')).toBeInstanceOf(File);
  });

  it('encodes the user of a channel file upload', async () => {
    const fetchSpy = mockFetch();
    const chat = new StreamChatClient(createApiClient());

    await chat.uploadChannelFile({
      type: 'messaging',
      id: 'channel-id',
      // @ts-expect-error API spec says file should be a string
      file: new File(['file-contents'], 'test-file.pdf'),
      user: { id: 'user-id' },
    });

    const formData = fetchSpy.mock.calls[0][1]!.body as FormData;
    expect(formData.get('user')).toBe('{"id":"user-id"}');
    expect(formData.get('file')).toBeInstanceOf(File);
  });
});
