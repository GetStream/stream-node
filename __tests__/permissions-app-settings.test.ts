import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { CreateRoleRequest } from '../src/gen/chat';
import { VideoOwnCapability } from '../src/gen/video';

describe('permissions and app settings API', () => {
  let client: StreamClient;
  let role: CreateRoleRequest;

  beforeAll(() => {
    role = {
      name: 'streamnodetest' + uuidv4(),
    };
    client = createTestClient();
  });

  it('list permissions', async () => {
    const response = await client.listPermissions();

    expect(response.permissions).toBeDefined();

    const permission = response.permissions[0];

    const getResponse = await client.getPermission({ id: permission.id });

    expect(getResponse.permission.id).toBe(permission.id);
  });

  it('create role', async () => {
    const response = await client.createRole(role);

    expect(response.role.name).toBe(role.name);
  });

  it('list roles', async () => {
    const response = await client.listRoles();

    expect(response.roles.find((r) => r.name === role.name)).toBeDefined();
  });

  it('update role', async () => {
    const response = await client.updateAppSettings({
      grants: {
        [role.name]: [VideoOwnCapability.CREATE_CALL],
      },
    });

    expect(response).toBeDefined();

    // temporary disable due to rate limit issues
    // const appSettings = await client.getAppSettings();

    // expect(
    //   appSettings.app.grants[role.name].includes(VideoOwnCapability.CREATE_CALL)
    // ).toBe(true);
  });

  it('delete role', async () => {
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

  it('get rate limits', async () => {
    const response = await client.getRateLimits();

    expect(response.web).toBeDefined();
  });
});
