import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  apiSecret: Secret,
  jwtOptions: SignOptions = {}
) => {
  const payload = {
    server: true,
  };

  const opts: SignOptions = Object.assign(
    { algorithm: "HS256", noTimestamp: true },
    jwtOptions
  );
  return jwt.sign(payload, apiSecret, opts);
};
