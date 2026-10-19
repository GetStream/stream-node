import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import {
  createCallType,
  trackCallTypeCreates,
} from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS = 'video/api/02-call_types/03-permissions.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('configures roles on a call type', async () => {
    const rolesCallType = uniqueId('call-type');
    // The docs' "edit a built-in call type": run on a test call type instead.
    const defaultCallType = await createCallType(client, cleanup);
    // "you need to create the `customrole` beforehand"
    const customRole = uniqueId('customrole');
    await client.createRole({ name: customRole });
    // The role can't be deleted while a call type grants it, and
    // `cleanup.callTypes` runs after the custom steps: delete the fence's call
    // type first ("does not exist": not created, not propagated yet, or gone).
    cleanup.add(async () => {
      await retry(() => client.video.deleteCallType({ name: rolesCallType }), {
        timeout: 20000,
        retryIf: (error) => String(error).includes('does not exist'),
      }).catch(() => undefined);
      await retry(() => client.deleteRole({ name: customRole }), {
        retryIf: (error) =>
          String(error).includes('does not exist') ||
          String(error).includes('present in permission grants'),
      });
    });
    // A just-created custom role isn't known to every API node right away
    // ("cannot use unknown role"): retry the tracked create on that.
    const create = trackCallTypeCreates(client, cleanup);
    const trackedCreate = create.getMockImplementation()!;
    create.mockImplementation((request) =>
      retry(() => trackedCreate(request), {
        retryIf: (error) => String(error).includes('unknown role'),
      }),
    );
    const update = vi.spyOn(client.video, 'updateCallType');
    const original = await client.video.getCallType({
      name: defaultCallType,
    });

    // #region snippet docs="video/api/02-call_types/03-permissions.md" heading="Configuring roles" tab="Node.js" index=1
    // COPY: rolesCallType="<call type name>", customRole="customrole", defaultCallType="default"
    await client.video.createCallType({
      name: rolesCallType,
      grants: {
        admin: ['send-audio', 'send-video', 'mute-users'],
        [customRole]: ['send-audio', 'send-video'],
      },
    });

    // or edit a built-in call type
    await client.video.updateCallType({
      name: defaultCallType,
      grants: {/* ... */},
    });
    // #endregion snippet

    const { grants } = await client.video.getCallType({ name: rolesCallType });
    expect([...grants.admin].sort()).toEqual(
      ['send-audio', 'send-video', 'mute-users'].sort(),
    );
    expect([...grants[customRole]].sort()).toEqual(
      ['send-audio', 'send-video'].sort(),
    );

    // An empty `grants` object changes nothing.
    const updated = await (update.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    expect(updated.name).toBe(defaultCallType);
    expect(updated.grants).toEqual(original.grants);
  });

  it('lists call types and their roles', async () => {
    const list = vi.spyOn(client.video, 'listCallTypes');
    const get = vi.spyOn(client.video, 'getCallType');

    // #region snippet docs="video/api/02-call_types/03-permissions.md" heading="Built-in roles" tab="Node.js" index=1
    await client.video.listCallTypes();

    //or
    await client.video.getCallType({ name: 'livestream' });
    // #endregion snippet

    const { call_types } = await (list.mock.results[0].value as ReturnType<
      typeof client.video.listCallTypes
    >);
    expect(call_types.default.grants).toHaveProperty('admin');
    const livestream = await (get.mock.results[0].value as ReturnType<
      typeof client.video.getCallType
    >);
    expect(livestream.name).toBe('livestream');
    expect(Object.keys(livestream.grants)).toEqual(
      expect.arrayContaining(['user', 'admin', 'host']),
    );
  });

  it('lists permissions', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="video/api/02-call_types/03-permissions.md" heading="Permissions" tab="Node.js" index=1
    const response = await client.listPermissions();
    console.log(response.permissions);
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(response.permissions);
    const ids = response.permissions.map((p) => p.id);
    expect(ids).toEqual(
      expect.arrayContaining(['send-audio', 'send-video', 'mute-users']),
    );
  });
});
