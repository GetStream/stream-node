import { inspect } from 'node:util';
import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { CallResponse } from '../../src/gen/models';
import { StreamCall } from '../../src/StreamCall';
import { StreamClient } from '../../src/StreamClient';

const apiKey = 'srt-test-key';
const secret = 'srt-test-secret';
const srtTemplate = (callType: string, callID: string) =>
  `srt://ingress.stream-io-video.com:10080?mode=caller&passphrase={passphrase}&streamid=${apiKey}.${callType}.${callID}/{token}`;

const initializedCall = (callType = 'livestream', callID = 'my-call') => {
  const client = new StreamClient(apiKey, secret);
  const call = client.video.call(callType, callID);
  call.data = {
    ingress: { srt: { address: srtTemplate(callType, callID) } },
  } as CallResponse;
  return call;
};

const tokenFrom = (address: string) => {
  const token = /streamid=[^/]+\/(.+)$/.exec(address)![1];
  const passphrase = /passphrase=([^&]+)/.exec(address)![1];
  return { token, passphrase };
};

describe('createSRTCredentials', () => {
  it('requires an initialized call', () => {
    const client = new StreamClient(apiKey, secret);
    const call: StreamCall = client.video.call('livestream', 'my-call');

    expect(() => call.createSRTCredentials('john')).toThrowError(
      'Object is not initialized',
    );
  });

  it('embeds a call-scoped token that expires after 24 hours by default', () => {
    const credentials = initializedCall().createSRTCredentials('john');
    const { token, passphrase } = tokenFrom(credentials.address);
    const claims = jwt.verify(token, secret) as jwt.JwtPayload;

    expect(claims.user_id).toBe('john');
    expect(claims.scoped_call_cid).toBe('livestream:my-call');
    expect(claims.call_cids).toBeUndefined();
    expect(claims.exp! - claims.iat!).toBe(24 * 60 * 60);
    expect(credentials.expires_at.getTime()).toBe(claims.exp! * 1000);
    expect(passphrase).toBe(token.split('.')[2]);
  });

  it('accepts a custom validity', () => {
    const credentials = initializedCall().createSRTCredentials('john', {
      validity_in_seconds: 3 * 60 * 60,
    });
    const claims = jwt.verify(
      tokenFrom(credentials.address).token,
      secret,
    ) as jwt.JwtPayload;

    expect(claims.exp! - claims.iat!).toBe(3 * 60 * 60);
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects validity_in_seconds=%s',
    (validity) => {
      expect(() =>
        initializedCall().createSRTCredentials('john', {
          validity_in_seconds: validity,
        }),
      ).toThrowError('validity_in_seconds must be a positive number');
    },
  );

  it('rejects a stream id over the 512-byte SRT limit', () => {
    const call = initializedCall('livestream', 'c'.repeat(200));

    expect(() => call.createSRTCredentials('u'.repeat(100))).toThrowError(
      /over the 512-byte SRT limit/,
    );
  });

  it('keeps the address out of inspect output', () => {
    const credentials = initializedCall().createSRTCredentials('john');
    const printed = inspect(credentials);

    expect(printed).toContain('[redacted]');
    expect(printed).not.toContain(tokenFrom(credentials.address).token);
    expect(JSON.parse(JSON.stringify(credentials)).address).toBe(
      credentials.address,
    );
  });
});
