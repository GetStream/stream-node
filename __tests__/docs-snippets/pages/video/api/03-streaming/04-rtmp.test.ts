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

const DOCS = 'video/api/03-streaming/04-rtmp.md';

/** Reads the JSON payload of a JWT. */
const jwtPayload = (token: string) =>
  JSON.parse(
    Buffer.from(token.split('.')[1], 'base64url').toString('utf8'),
  ) as Record<string, unknown>;

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const hostId = uniqueId('host');
  const janeId = uniqueId('jane');

  beforeAll(async () => {
    cleanup.users.push(hostId, janeId);
    await client.upsertUsers([{ id: hostId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gets the RTMP URL and stream key', async () => {
    const call = client.video.call('livestream', uniqueId('livestream'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({ data: { created_by_id: hostId } });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="video/api/03-streaming/04-rtmp.md" heading="RTMP publishing" tab="Node.js" index=1
    // COPY: janeId="jane"
    const resp = await call.get();

    // userId of existing user
    const userId = janeId;
    await client.upsertUsers([{ id: userId }]);
    const token = client.generateUserToken({ user_id: userId });
    const rtmpURL = resp.call.ingress.rtmp.address;
    const streamKey = token;

    console.log(rtmpURL, streamKey);
    // #endregion snippet

    expect(rtmpURL).toMatch(/^rtmps:\/\//);
    expect(rtmpURL).toContain(`livestream.${call.id}`);
    expect(jwtPayload(streamKey).user_id).toBe(janeId);
    expect(log.mock.calls[0]).toEqual([rtmpURL, streamKey]);
    const { users } = await client.queryUsers({
      payload: { filter_conditions: { id: janeId } },
    });
    expect(users.map((u) => u.id)).toEqual([janeId]);
  });
});
