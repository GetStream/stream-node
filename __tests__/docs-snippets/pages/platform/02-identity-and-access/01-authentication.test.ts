import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerUser } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'platform/02-identity-and-access/01-authentication.md';

const apiSecret = process.env.STREAM_SECRET as string;

/** The claims of `token`, after checking its signature with the API secret. */
const claims = (token: string) => jwt.verify(token, apiSecret) as JwtPayload;

/** Client-side query channels with `token`: the HTTP status and the Stream error code. */
const queryChannelsAs = async (token: string, userId: string) => {
  const response = await fetch(
    `https://chat.stream-io-api.com/channels?api_key=${process.env.STREAM_API_KEY ?? ''}`,
    {
      method: 'POST',
      headers: {
        Authorization: token,
        'stream-auth-type': 'jwt',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        filter_conditions: { members: { $in: [userId] } },
      }),
    },
  );
  const body = (await response.json()) as { code?: number; message?: string };
  return { status: response.status, code: body.code, message: body.message };
};

/** Retries until every token gets `status` from the API (revocation is eventually consistent). */
const waitForStatus = (
  tokens: { token: string; userId: string }[],
  status: number,
) =>
  retry(async () => {
    const results = await Promise.all(
      tokens.map(({ token, userId }) => queryChannelsAs(token, userId)),
    );
    expect(results.map((r) => r.status)).toEqual(tokens.map(() => status));
    return results;
  });

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  const revokedUserId = uniqueId('user');
  const user1Id = uniqueId('user1');
  const user2Id = uniqueId('user2');
  const iatUserId = uniqueId('user-iat');

  /** Tokens issued two minutes ago, so a revocation date of "now" applies to them. */
  const oldTokens = () => {
    const iat = Math.floor(Date.now() / 1000) - 120;
    return [revokedUserId, user1Id, user2Id].map((userId) => ({
      userId,
      token: client.generateUserToken({ user_id: userId, iat }),
    }));
  };
  let revokedTokens: { token: string; userId: string }[] = [];

  beforeAll(async () => {
    const ids = [johnId, revokedUserId, user1Id, user2Id, iatUserId];
    await client.upsertUsers(ids.map((id) => ({ id })));
    cleanup.users.push(...ids);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('generates a user token valid for one day', async () => {
    const generate = vi.spyOn(client, 'generateUserToken');

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Generating Tokens" tab="Node.js" index=1
    // COPY: johnId="john"
    const userId = johnId;
    // validity is optional, in this case we set it to 1 day
    const validity = 24 * 60 * 60;
    client.generateUserToken({
      user_id: userId,
      validity_in_seconds: validity,
    });
    // #endregion snippet

    const token = generate.mock.results[0].value as string;
    const payload = claims(token);
    expect(payload.user_id).toBe(johnId);
    expect(payload).not.toHaveProperty('validity_in_seconds');
    expect((payload.exp ?? 0) - (payload.iat ?? 0)).toBe(validity);

    // The API accepts it for that user.
    expect((await queryChannelsAs(token, johnId)).status).toBe(201);
  });

  it('generates call tokens, optionally with a role', async () => {
    const generate = vi.spyOn(client, 'generateCallToken');

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Call tokens" tab="Node.js" index=1
    // COPY: johnId="john"
    const user_id = johnId;
    // validity is optional (by default the token is valid for an hour)
    const validity_in_seconds = 60 * 60;

    const call_cids = ['default:call1', 'livestream:call2'];

    client.generateCallToken({ user_id, call_cids, validity_in_seconds });

    // Optionally provide a role for the call(s)
    client.generateCallToken({ user_id, call_cids, role: 'admin' });
    // #endregion snippet

    const [callToken, adminToken] = generate.mock.results.map(
      (r) => r.value as string,
    );
    const payload = claims(callToken);
    expect(payload).toMatchObject({ user_id: johnId, call_cids });
    expect(payload).not.toHaveProperty('role');
    expect((payload.exp ?? 0) - (payload.iat ?? 0)).toBe(validity_in_seconds);

    const adminPayload = claims(adminToken);
    expect(adminPayload).toMatchObject({
      user_id: johnId,
      call_cids,
      role: 'admin',
    });
    // Without a validity, the token is valid for an hour.
    expect((adminPayload.exp ?? 0) - (adminPayload.iat ?? 0)).toBe(60 * 60);

    expect((await queryChannelsAs(callToken, johnId)).status).toBe(201);
  });

  it('sets the token expiration with exp or validity_in_seconds', () => {
    const before = Math.floor(Date.now() / 1000);

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Setting Automatic Token Expiration" tab="Node.js" index=1
    // COPY: johnId="john"
    // creates a token that expires in 1 hour
    const token1 = client.generateUserToken({
      user_id: johnId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    // the same can be done with validity_in_seconds
    const token2 = client.generateUserToken({
      user_id: johnId,
      validity_in_seconds: 60 * 60,
    });
    // #endregion snippet

    const after = Math.floor(Date.now() / 1000);
    const payload1 = claims(token1);
    const payload2 = claims(token2);
    expect(payload1.user_id).toBe(johnId);
    expect(payload1.exp).toBeGreaterThanOrEqual(before + 3600);
    expect(payload1.exp).toBeLessThanOrEqual(after + 3600);
    expect(payload2.user_id).toBe(johnId);
    expect((payload2.exp ?? 0) - (payload2.iat ?? 0)).toBe(3600);
  });

  it('revokes the tokens of one user and of a list of users', async () => {
    revokedTokens = oldTokens();
    await waitForStatus(revokedTokens, 201);
    const revokeDate = new Date();

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Token Revocation by User" tab="Node.js" index=1
    // COPY: revokedUserId="user-id", user1Id="user1-id", user2Id="user2-id"
    await client.updateUsersPartial({
      users: [
        { id: revokedUserId, set: { revoke_tokens_issued_before: revokeDate } },
      ],
    });
    await client.updateUsersPartial({
      users: [
        { id: user1Id, set: { revoke_tokens_issued_before: revokeDate } },
        { id: user2Id, set: { revoke_tokens_issued_before: revokeDate } },
      ],
    });
    // #endregion snippet

    for (const userId of [revokedUserId, user1Id, user2Id]) {
      const user = await getServerUser(client, userId);
      // Stored with sub-millisecond rounding: compare to the millisecond.
      expect(
        Math.abs(
          (user.revoke_tokens_issued_before?.getTime() ?? 0) -
            revokeDate.getTime(),
        ),
      ).toBeLessThanOrEqual(1);
    }
    // Tokens issued before the date are rejected, new ones still work.
    const results = await waitForStatus(revokedTokens, 401);
    for (const result of results) {
      expect(result.code).toBe(40);
      expect(result.message).toContain('This token has been revoked');
    }
    // (the SDK's default `iat` is a second in the past: retry until it is after the date)
    await retry(async () => {
      const fresh = client.generateUserToken({ user_id: revokedUserId });
      expect((await queryChannelsAs(fresh, revokedUserId)).status).toBe(201);
    });
  });

  it('undoes the user-level revocation', async () => {
    expect(revokedTokens).toHaveLength(3);

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Undoing the revoke" tab="Node.js" index=1
    // COPY: revokedUserId="user-id", user1Id="user1-id", user2Id="user2-id"
    await client.updateUsersPartial({
      users: [
        { id: revokedUserId, set: { revoke_tokens_issued_before: null } },
      ],
    });
    await client.updateUsersPartial({
      users: [
        { id: user1Id, set: { revoke_tokens_issued_before: null } },
        { id: user2Id, set: { revoke_tokens_issued_before: null } },
      ],
    });
    // #endregion snippet

    for (const userId of [revokedUserId, user1Id, user2Id]) {
      const user = await getServerUser(client, userId);
      expect(user.revoke_tokens_issued_before).toBeUndefined();
    }
    // The old tokens work again.
    await waitForStatus(revokedTokens, 201);
  });

  it.skip('BLOCKED: app-wide revocation of every token of the shared test app is not run (decision: it would revoke every user token of the shared test app)', async () => {
    const revokeDate = new Date();

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Token Revocation by Application" tab="Node.js" index=1
    await client.updateApp({ revoke_tokens_issued_before: revokeDate });
    // revokeDate is a Date object
    // #endregion snippet

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Undoing the revoke" tab="Node.js" index=2
    await client.updateApp({ revoke_tokens_issued_before: null });
    // #endregion snippet

    expect((await client.getApp()).app.revoke_tokens_issued_before).toBeNull();
  });

  it('generates a token with an iat claim', async () => {
    const generate = vi.spyOn(client, 'generateUserToken');
    const issuedAt = Math.floor(Date.now() / 1000) - 30;
    const expireTime = issuedAt + 60 * 60;

    // #region snippet docs="platform/02-identity-and-access/01-authentication.md" heading="Adding iat claim to token" tab="Node.js" index=1
    // COPY: iatUserId="user-id"
    client.generateUserToken({
      user_id: iatUserId,
      exp: expireTime,
      iat: issuedAt,
    });
    // issuedAt should be unix timestamp, by default it's set to the current time
    // issuedAt = Math.floor(Date.now() / 1000)
    // #endregion snippet

    const token = generate.mock.results[0].value as string;
    expect(claims(token)).toMatchObject({
      user_id: iatUserId,
      iat: issuedAt,
      exp: expireTime,
    });
    expect((await queryChannelsAs(token, iatUserId)).status).toBe(201);
  });
});
