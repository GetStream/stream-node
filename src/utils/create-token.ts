import jwt, { Secret, SignOptions } from 'jsonwebtoken';

/**
 * The claims the Stream backend reads from a token. It decodes them into a Go
 * struct with encoding/json, which matches key names case-insensitively, so a
 * key such as `User_ID` would set or replace `user_id`.
 */
const BACKEND_CLAIMS = new Set([
  'user_id',
  'call_cids',
  'channel_cids',
  'role',
  'egress',
  'stream_check_writes',
  'scoped_call_cid',
  'iss',
  'sub',
  'aud',
  'exp',
  'nbf',
  'iat',
  'jti',
  'server',
]);

/**
 * Claims a user token may not carry. The backend treats a token without a
 * user_id as a server token, and `egress` lets a token join calls without the
 * app's role grants. Neither belongs on a token minted for a user.
 */
const RESERVED_CLAIMS = new Set(['server', 'egress']);

/**
 * Keys that would change how the payload serializes after it is validated:
 * JSON.stringify calls a `toJSON` method, and copying `__proto__` with
 * Object.assign (as jsonwebtoken does) sets the payload's prototype.
 */
const SERIALIZATION_KEYS = new Set(['toJSON', '__proto__']);

/**
 * Folds a claim name the way Go's encoding/json matches names (bytes.EqualFold).
 * The names in BACKEND_CLAIMS are ASCII, and the only non-ASCII characters
 * that fold to ASCII letters are the Kelvin sign (to k) and the long s (to s).
 */
const foldClaimName = (name: string) =>
  name.toLowerCase().replace(/K/g, 'k').replace(/ſ/g, 's');

/**
 * Copies the payload's own enumerable properties into a new object, reading
 * each value once, and checks the copy. The copy is what gets signed, so
 * getters, serialization hooks and inherited properties on the payload cannot
 * change the claims after they are checked.
 */
const toUserClaims = (payload: Record<string, unknown>) => {
  const claims: Record<string, unknown> = {};
  for (const key of Object.keys(payload)) {
    if (SERIALIZATION_KEYS.has(key)) {
      throw new Error(`"${key}" cannot be set on a user token`);
    }
    const folded = foldClaimName(key);
    if (BACKEND_CLAIMS.has(folded) && key !== folded) {
      throw new Error(
        `Claim "${key}" is read by the backend as "${folded}"; use "${folded}"`,
      );
    }
    if (RESERVED_CLAIMS.has(key)) {
      throw new Error(
        `The "${key}" claim is reserved and cannot be set on a user token`,
      );
    }
    Object.defineProperty(claims, key, {
      value: payload[key],
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }

  // The backend treats a token without a user_id as a server token, so an
  // empty user_id would mint a token with full API access.
  if (typeof claims.user_id !== 'string' || claims.user_id === '') {
    throw new Error('user_id is required and must be a non-empty string');
  }

  // The backend skips per-user token revocation for a token without an iat,
  // and a token issued "later" outlives revocations made before that time.
  const iat = claims.iat;
  if (
    typeof iat !== 'number' ||
    !Number.isInteger(iat) ||
    iat <= 0 ||
    iat > Math.floor(Date.now() / 1000)
  ) {
    throw new Error(
      'iat must be a positive integer unix timestamp that is not in the future',
    );
  }

  return claims;
};

export function JWTUserToken(
  apiSecret: Secret,
  payload: {
    user_id: string;
    exp?: number;
    iat: number;
    call_cids?: string[];
  } & Record<string, any>,
) {
  // make sure we return a clear error when jwt is shimmed (ie. browser build)
  if (jwt?.sign == null) {
    throw Error(
      `Unable to find jwt crypto, if you are getting this error is probably because you are trying to generate tokens on browser or React Native (or other environment where crypto functions are not available). Please Note: token should only be generated server-side.`,
    );
  }

  const claims = toUserClaims(payload);

  // iat is always set (checked above), so jsonwebtoken signs it as given.
  const opts: SignOptions = {
    algorithm: 'HS256',
  };

  return jwt.sign(claims, apiSecret, opts);
}

export function JWTServerToken(
  apiSecret: Secret,
  jwtOptions: SignOptions = {},
) {
  const payload = {
    server: true,
  };

  const opts: SignOptions = Object.assign(
    { algorithm: 'HS256', noTimestamp: true },
    jwtOptions,
  );
  return jwt.sign(payload, apiSecret, opts);
}
