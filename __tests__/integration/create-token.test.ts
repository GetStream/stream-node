import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { beforeAll, describe, expect, it } from 'vitest';
import { StreamClient } from '../../src/StreamClient';
import { JWTUserToken } from '../../src/utils/create-token';
import { createTestClient } from './create-test-client';

const secret = process.env.STREAM_SECRET!;

describe('creating tokens', () => {
  let client: StreamClient;
  const userId = 'john';

  beforeAll(() => {
    client = createTestClient();
  });

  describe('user token', () => {
    it('with default expiration', () => {
      for (let i = 0; i < 5; i++) {
        const token = client.generateUserToken({ user_id: userId });
        const decodedToken = jwt.verify(token, secret) as any;
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const oneSec = 1010;
        const exp = new Date(decodedToken.exp * 1000).getTime();
        const tokenValidity = exp - now;

        expect(decodedToken.user_id).toBe(userId);
        expect(tokenValidity).toBeLessThanOrEqual(oneHour);
        expect(tokenValidity).toBeGreaterThanOrEqual(oneHour - 2 * oneSec);
      }
    });

    it('with custom data', () => {
      const token = client.generateUserToken({
        user_id: userId,
        my_own_id: 'my_own_id',
      });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.my_own_id).toBe('my_own_id');
    });

    it('with token validity', () => {
      for (let i = 0; i < 5; i++) {
        const validity = 120 * 60;
        const token = client.generateUserToken({
          user_id: userId,
          validity_in_seconds: validity,
        });
        const decodedToken = jwt.verify(token, secret) as any;
        const iat = new Date(decodedToken.iat * 1000).getTime();
        const exp = new Date(decodedToken.exp * 1000).getTime();
        const tokenValidity = (exp - iat) / 1000;

        expect(decodedToken.user_id).toBe(userId);
        expect(tokenValidity).toBe(validity);
      }
    });

    it('should not encode validity_in_seconds in the payload', () => {
      const token = client.generateUserToken({
        user_id: userId,
        validity_in_seconds: 120,
      });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken).not.toHaveProperty('validity_in_seconds');
      expect(Object.keys(decodedToken).sort()).toEqual(
        ['exp', 'iat', 'user_id'].sort(),
      );
    });

    it('should not mutate the provided payload', () => {
      const payload = { user_id: userId, validity_in_seconds: 120 };
      client.generateUserToken(payload);

      expect(payload).toEqual({ user_id: userId, validity_in_seconds: 120 });
    });

    it(`should make sure iat is correct`, () => {
      for (let i = 0; i < 5; i++) {
        const token = client.generateUserToken({ user_id: userId });
        const decodedToken = jwt.verify(token, secret) as any;
        const now = Date.now();
        const nowMinus1sec = now - 1000;
        const nowMinus2secs = now - 2000;
        const iat = new Date(decodedToken.iat * 1000).getTime();

        expect(iat).toBeLessThanOrEqual(nowMinus1sec);
        expect(iat).toBeGreaterThanOrEqual(nowMinus2secs);
      }
    });

    it('with expiration provided', () => {
      const exp = Math.round(new Date().getTime() / 1000) + 58 * 60;
      const token = client.generateUserToken({ user_id: userId, exp });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.exp).toBe(exp);
    });

    it('with iat provided', () => {
      const iat = Math.round(new Date().getTime() / 1000) - 60;
      const token = client.generateUserToken({ user_id: userId, iat });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.iat).toBe(iat);
      expect(decodedToken.exp).toBeDefined();
    });

    it('should reject an empty or missing user_id', () => {
      expect(() => client.generateUserToken({ user_id: '' })).toThrow(
        /user_id/,
      );
      expect(() =>
        client.generateUserToken({ user_id: undefined as any }),
      ).toThrow(/user_id/);
      expect(() => client.generatePermanentUserToken({ user_id: '' })).toThrow(
        /user_id/,
      );
      expect(() => client.createToken('')).toThrow(/user_id/);
    });

    it('should reject a server claim', () => {
      for (const server of [true, false]) {
        expect(() =>
          client.generateUserToken({ user_id: userId, server }),
        ).toThrow(/server/);
        expect(() =>
          client.generatePermanentUserToken({ user_id: userId, server }),
        ).toThrow(/server/);
      }
    });

    it('should reject an egress claim', () => {
      expect(() =>
        client.generateUserToken({ user_id: userId, egress: true }),
      ).toThrow(/egress/);
    });

    it('should reject other spellings of claims the backend reads', () => {
      // The backend's JSON decoder matches claim names case-insensitively,
      // including the Kelvin sign (folds to k) and the long s (folds to s).
      for (const key of [
        'User_ID',
        'USER_ID',
        'u\u017Fer_id',
        'Server',
        'EGRESS',
        'egre\u017F\u017F',
        'IAT',
        'Exp',
        'Call_CIDs',
        'ROLE',
        'stream_chec\u212A_writes',
      ]) {
        expect(
          () => client.generateUserToken({ user_id: userId, [key]: '' }),
          key,
        ).toThrow(/read by the backend/);
      }
    });

    it('should reject a missing, zero or future iat', () => {
      const now = Math.floor(Date.now() / 1000);
      for (const iat of [0, -1, 1.5, now + 60 * 60]) {
        expect(
          () => client.generateUserToken({ user_id: userId, iat }),
          String(iat),
        ).toThrow(/iat/);
      }
      expect(() => client.createToken(userId, now + 3600, 0)).toThrow(/iat/);
      expect(() => JWTUserToken(secret, { user_id: userId } as any)).toThrow(
        /iat/,
      );
    });

    it('should reject serialization hooks on the payload', () => {
      expect(() =>
        client.generateUserToken({
          user_id: userId,
          toJSON: () => ({ server: true }),
        }),
      ).toThrow(/toJSON/);
      expect(() =>
        client.generateUserToken(
          JSON.parse(`{"user_id":"${userId}","__proto__":{"server":true}}`),
        ),
      ).toThrow(/__proto__/);
    });

    it('should sign the claims it checked', () => {
      // A getter could return a valid user_id when checked and an empty one
      // when the payload is serialized for signing.
      let reads = 0;
      const payload = {
        get user_id() {
          return reads++ === 0 ? userId : '';
        },
        iat: Math.floor(Date.now() / 1000) - 1,
        role: 'user',
      };
      const token = JWTUserToken(secret, payload);
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.user_id).toBe(userId);
      expect(decodedToken.role).toBe('user');
      expect(decodedToken).not.toHaveProperty('server');
      expect(reads).toBe(1);
    });
  });

  describe('call token', () => {
    const call_cids = ['default:call1', 'livestream:call2'];

    it('with call IDs provided', () => {
      const token = client.generateCallToken({ user_id: userId, call_cids });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.user_id).toEqual(userId);
      expect(decodedToken.call_cids).toEqual(call_cids);
      expect(decodedToken.iat).toBeDefined();
      expect(decodedToken.exp).toBeDefined();
    });

    it('with call IDs and role provided', () => {
      const token = client.generateCallToken({
        user_id: userId,
        call_cids,
        role: 'admin',
      });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.call_cids).toEqual(call_cids);
      expect(decodedToken.role).toEqual('admin');
      expect(decodedToken.user_id).toEqual(userId);
      expect(decodedToken.iat).toBeDefined();
      expect(decodedToken.exp).toBeDefined();
    });

    it('should not encode validity_in_seconds in the payload', () => {
      const token = client.generateCallToken({
        user_id: userId,
        call_cids,
        validity_in_seconds: 120,
      });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken).not.toHaveProperty('validity_in_seconds');
      expect(decodedToken.exp - decodedToken.iat).toBe(120);
    });

    it('with default expiration', () => {
      for (let i = 0; i < 5; i++) {
        const token = client.generateCallToken({ user_id: userId, call_cids });
        const decodedToken = jwt.verify(token, secret) as any;
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const oneSec = 1000;
        const exp = new Date(decodedToken.exp * 1000).getTime();
        const tokenValidity = exp - now;

        expect(decodedToken.user_id).toBe(userId);
        expect(tokenValidity).toBeLessThanOrEqual(oneHour);
        expect(tokenValidity).toBeGreaterThanOrEqual(oneHour - 2 * oneSec);
      }
    });

    it(`should make sure iat is correct`, () => {
      for (let i = 0; i < 5; i++) {
        const token = client.generateCallToken({ user_id: userId, call_cids });
        const decodedToken = jwt.verify(token, secret) as any;
        const now = Date.now();
        const nowMinus1sec = now - 1000;
        const nowMinus2secs = now - 2000;
        const iat = new Date(decodedToken.iat * 1000).getTime();

        expect(iat).toBeLessThanOrEqual(nowMinus1sec);
        expect(iat).toBeGreaterThanOrEqual(nowMinus2secs);
      }
    });

    it('with expiration provided', () => {
      const exp = Math.round(new Date().getTime() / 1000) + 58 * 60;
      const token = client.generateCallToken({
        user_id: userId,
        call_cids,
        exp,
      });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.exp).toBe(exp);
    });

    it('with iat provided', () => {
      const iat = Math.round(new Date().getTime() / 1000) - 60;
      const token = client.generateCallToken({
        user_id: userId,
        call_cids,
        iat,
      });
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.iat).toBe(iat);
      expect(decodedToken.exp).toBeDefined();
    });

    it('should reject an empty user_id or a server claim', () => {
      expect(() =>
        client.generateCallToken({ user_id: '', call_cids }),
      ).toThrow(/user_id/);
      expect(() =>
        client.generateCallToken({ user_id: userId, call_cids, server: true }),
      ).toThrow(/server/);
      expect(() => client.createCallToken('', call_cids)).toThrow(/user_id/);
    });
  });
});
