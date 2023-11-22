import { beforeAll, describe, expect, it } from "vitest";
import { v4 as uuidv4 } from "uuid";
import { createTestClient } from "./create-test-client";
import { StreamClient } from "../src/StreamClient";

describe("user-video compatibility API", () => {
  let client: StreamClient;
  const user = {
    id: "stream-node-test-user",
    role: "admin",
    name: "Test User for user API compatibily",
    custom: {
      note: "compatibilty test",
    },
  };

  beforeAll(async () => {
    client = createTestClient();
    await client.upsertUsers({
      users: {
        [user.id]: { ...user },
      },
    });
  });

  it("create call", async () => {
    const call = client.video.call("default", uuidv4());
    const response = await call.create({ data: { created_by: user } });

    expect(response.call.created_by.custom.note).toBe("compatibilty test");
    expect(response.call.created_by.name).toBe(
      "Test User for user API compatibily"
    );
  });
});
