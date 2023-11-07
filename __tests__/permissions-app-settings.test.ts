import "dotenv/config";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { CreateRoleRequest, StreamClient, VideoOwnCapability } from "..";
import { v4 as uuidv4 } from "uuid";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("permissions and app settings API", () => {
  let client: StreamClient;
  let role: CreateRoleRequest;

  beforeAll(() => {
    role = {
      name: uuidv4(),
    };
    client = new StreamClient(apiKey, secret);
  });

  it("list permissions", async () => {
    const response = await client.listPermissions();

    expect(response.permissions).toBeDefined();

    const permission = response.permissions[0];

    const getResponse = await client.getPermission({ id: permission.id });

    expect(getResponse.permission.id).toBe(permission.id);
  });

  it("create role", async () => {
    const response = await client.createRole(role);

    expect(response.role.name).toBe(role.name);
  });

  it("list roles", async () => {
    const response = await client.listRoles();

    expect(response.roles.find((r) => r.name === role.name)).toBeDefined();
  });

  it("update role", async () => {
    const response = await client.updateAppSettings({
      grants: {
        [role.name]: [VideoOwnCapability.CREATE_CALL],
      },
    });

    expect(response).toBeDefined();

    const appSettings = await client.getAppSettings();

    expect(
      appSettings.app.grants[role.name].includes(VideoOwnCapability.CREATE_CALL)
    ).toBe(true);
  });

  it("delete role", async () => {
    await client.updateAppSettings({
      grants: {
        [role.name]: [],
      },
    });

    let response;

    try {
      response = await client.deleteRole({ name: role.name });
    } catch (e) {
      // the first request fails on backend sometimes
      // retry it
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 3000);
      });

      response = await client.deleteRole({ name: role.name });
    }

    expect(response).toBeDefined();
  });

  it("get rate limits", async () => {
    const response = await client.getRateLimits();

    expect(response.web).toBeDefined();
  });
});
