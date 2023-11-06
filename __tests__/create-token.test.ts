import "dotenv/config";
import jwt from "jsonwebtoken";
import { beforeAll, describe, expect, it } from "vitest";
import { StreamClient } from "../src/StreamClient";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("creating tokens", () => {
  let client: StreamClient;
  const userId = "john";

  beforeAll(() => {
    client = new StreamClient(apiKey, secret);
  });

  it("with default expiration", () => {
    const token = client.createToken(userId);
    const decodedToken = jwt.verify(token, secret) as any;

    expect(decodedToken.user_id).toBe(userId);
    expect(
      new Date(decodedToken.iat * 1000).getTime() -
        (Date.now() + 60 * 60 * 1000)
    ).toBeLessThan(1000);
    expect(
      new Date(decodedToken.iat * 1000).getTime() - Date.now()
    ).toBeLessThan(1000);
  });

  it("with expiration provided", () => {
    const exp = Math.round(new Date().getTime() / 1000) + 58 * 60;
    const token = client.createToken(userId, exp);
    const decodedToken = jwt.verify(token, secret) as any;

    expect(decodedToken.exp).toBe(exp);
  });

  it("with call IDs provided", () => {
    const call_cids = ["default:call1", "livestream:call2"];
    const token = client.createCallToken(
      userId,
      call_cids,
      undefined,
      undefined
    );
    const decodedToken = jwt.verify(token, secret) as any;

    expect(decodedToken.call_cids).toEqual(call_cids);
  });
});
