import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  retryOnCallTypeMissing,
  trackCallTypeCreates,
} from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'video/api/02-call_types/03-geofencing.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets geofences on a call type and a call', async () => {
    const geoCallType = uniqueId('call-type');
    const call = client.video.call(geoCallType, uniqueId('call'));
    const create = trackCallTypeCreates(client, cleanup);
    // Other API nodes can still answer "call type does not exist" for the new type.
    const originalGetOrCreate = client.video.getOrCreateCall.bind(client.video);
    const getOrCreate = vi
      .spyOn(client.video, 'getOrCreateCall')
      .mockImplementation((request) =>
        retryOnCallTypeMissing(() => originalGetOrCreate(request)),
      );

    // #region snippet docs="video/api/02-call_types/03-geofencing.md" heading="Exclusion Geofences" tab="Node.js" index=1
    // COPY: geoCallType="<call type name>", johnId="john"
    await client.video.createCallType({
      name: geoCallType,
      settings: {
        geofencing: {
          names: ['european_union'],
        },
      },
    });

    //override settings on call level
    await call.create({
      data: {
        created_by_id: johnId,
        settings_override: {
          geofencing: {
            names: ['european_union', 'united_states'],
          },
        },
      },
    });
    // #endregion snippet
    cleanup.calls.push(call.cid);

    const callType = await (create.mock.results[0].value as ReturnType<
      typeof client.video.createCallType
    >);
    expect(callType.settings.geofencing.names).toEqual(['european_union']);
    const created = await (getOrCreate.mock.results[0].value as ReturnType<
      typeof client.video.getOrCreateCall
    >);
    expect(created.created).toBe(true);
    expect(created.call.settings.geofencing.names).toEqual([
      'european_union',
      'united_states',
    ]);
  });
});
