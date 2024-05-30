import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { beforeAll, describe, expect, it } from 'vitest';
import { StreamClient } from '../src/StreamClient';
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
        const token = client.createToken(userId);
        const decodedToken = jwt.verify(token, secret) as any;
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const oneSec = 1000;
        const exp = new Date(decodedToken.exp * 1000).getTime();
        const tokenValidity = exp - now;

        expect(decodedToken.user_id).toBe(userId);
        expect(tokenValidity).toBeLessThanOrEqual(oneHour + oneSec);
        expect(tokenValidity).toBeGreaterThanOrEqual(oneHour - oneSec);
      }
    });

    it(`should make sure iat is correct`, () => {
      for (let i = 0; i < 5; i++) {
        const token = client.createToken(userId);
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
      const token = client.createToken(userId, exp);
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.exp).toBe(exp);
    });

    it('with iat provided', () => {
      const iat = Math.round(new Date().getTime() / 1000) + 60 * 60;
      const token = client.createToken(userId, undefined, iat);
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.iat).toBe(iat);
      expect(decodedToken.exp).toBeDefined();
    });
  });

  describe('call token', () => {
    const call_cids = ['default:call1', 'livestream:call2'];

    it('with call IDs provided', () => {
      const token = client.createCallToken(userId, call_cids);
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.user_id).toEqual(userId);
      expect(decodedToken.call_cids).toEqual(call_cids);
      expect(decodedToken.iat).toBeDefined();
      expect(decodedToken.exp).toBeDefined();
    });

    it('with call IDs and role provided', () => {
      const token = client.createCallToken(
        { user_id: userId, role: 'admin' },
        call_cids,
      );
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.call_cids).toEqual(call_cids);
      expect(decodedToken.role).toEqual('admin');
      expect(decodedToken.user_id).toEqual(userId);
      expect(decodedToken.iat).toBeDefined();
      expect(decodedToken.exp).toBeDefined();
    });

    it('with default expiration', () => {
      for (let i = 0; i < 5; i++) {
        const token = client.createCallToken(userId, call_cids);
        const decodedToken = jwt.verify(token, secret) as any;
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const oneSec = 1000;
        const exp = new Date(decodedToken.exp * 1000).getTime();
        const tokenValidity = exp - now;

        expect(decodedToken.user_id).toBe(userId);
        expect(tokenValidity).toBeLessThanOrEqual(oneHour + oneSec);
        expect(tokenValidity).toBeGreaterThanOrEqual(oneHour - oneSec);
      }
    });

    it(`should make sure iat is correct`, () => {
      for (let i = 0; i < 5; i++) {
        const token = client.createCallToken(userId, call_cids);
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
      const token = client.createCallToken(userId, call_cids, exp);
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.exp).toBe(exp);
    });

    it('with iat provided', () => {
      const iat = Math.round(new Date().getTime() / 1000) + 60 * 60;
      const token = client.createCallToken(userId, call_cids, undefined, iat);
      const decodedToken = jwt.verify(token, secret) as any;

      expect(decodedToken.iat).toBe(iat);
      expect(decodedToken.exp).toBeDefined();
    });
  });
});
