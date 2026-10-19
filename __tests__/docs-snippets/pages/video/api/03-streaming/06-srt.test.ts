import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'video/api/03-streaming/06-srt.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const hostUserId = uniqueId('host-user');
  const johnId = uniqueId('john');
  const myLivestreamId = uniqueId('my-livestream');

  beforeAll(async () => {
    cleanup.users.push(hostUserId, johnId);
    cleanup.calls.push(`livestream:${myLivestreamId}`);
    await client.upsertUsers([{ id: hostUserId }, { id: johnId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a call and generates SRT credentials', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const getOrCreate = vi.spyOn(client.video, 'getOrCreateCall');

    // #region snippet docs="video/api/03-streaming/06-srt.md" heading="1) Create a call and generate SRT credentials" tab="Node.js" index=1
    // COPY: hostUserId="host-user-id", myLivestreamId="my-livestream", johnId="john"
    const userID = hostUserId;
    const callID = myLivestreamId;

    const call = client.video.call('livestream', callID);
    await call.getOrCreate({
      data: {
        created_by_id: userID,
        members: [{ user_id: johnId, role: 'host' }],
      },
    });
    const credentials = call.createSRTCredentials(userID);

    console.log(credentials.address);
    // #endregion snippet

    const response = await (getOrCreate.mock.results[0].value as ReturnType<
      typeof client.video.getOrCreateCall
    >);
    expect(response.created).toBe(true);
    expect(response.call.created_by.id).toBe(hostUserId);
    const template = response.call.ingress.srt.address;
    expect(template).toContain('{passphrase}');
    expect(template).toContain('{token}');
    // The address embeds a user token for the host and its signature as the passphrase
    const url = new URL(credentials.address);
    const token = String(url.searchParams.get('streamid')).split('/').pop();
    const [, payload, signature] = String(token).split('.');
    expect(url.searchParams.get('passphrase')).toBe(signature);
    expect(
      (
        JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
          user_id: string;
        }
      ).user_id,
    ).toBe(hostUserId);
    expect(credentials.address).toBe(
      template
        .replace('{passphrase}', signature)
        .replace('{token}', String(token)),
    );
    expect(credentials.address).toMatch(/^srt:\/\//);
    expect(credentials.address).toContain(`livestream.${myLivestreamId}`);
    expect(log.mock.calls[0]).toEqual([credentials.address]);
  });
});
