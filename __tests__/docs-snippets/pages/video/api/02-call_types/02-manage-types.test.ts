import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { OwnCapability } from '../../../../../../index';
import { trackCallTypeCreates } from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS = 'video/api/02-call_types/02-manage-types.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  /** The docs' "allhands" type: created by the "Create call type" fence. */
  const allhandsType = uniqueId('allhands');

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reads call types', async () => {
    const list = vi.spyOn(client.video, 'listCallTypes');
    const get = vi.spyOn(client.video, 'getCallType');

    // #region snippet docs="video/api/02-call_types/02-manage-types.md" heading="Read call types" tab="Node.js" index=1
    await client.video.listCallTypes();

    //or
    await client.video.getCallType({ name: 'livestream' });
    // #endregion snippet

    const { call_types } = await (list.mock.results[0].value as ReturnType<
      typeof client.video.listCallTypes
    >);
    expect(Object.keys(call_types)).toEqual(
      expect.arrayContaining(['default', 'livestream']),
    );
    const livestream = await (get.mock.results[0].value as ReturnType<
      typeof client.video.getCallType
    >);
    expect(livestream.name).toBe('livestream');
  });

  it('creates a call type', async () => {
    const create = trackCallTypeCreates(client, cleanup);

    // #region snippet docs="video/api/02-call_types/02-manage-types.md" heading="Create call type" tab="Node.js" index=1
    // COPY: allhandsType="allhands"
    await client.video.createCallType({
      name: allhandsType,
      settings: {
        audio: {
          mic_default_on: true,
          default_device: 'speaker',
        },
      },
      grants: {
        admin: [
          OwnCapability.SEND_AUDIO,
          OwnCapability.SEND_VIDEO,
          OwnCapability.MUTE_USERS,
        ],
        user: [OwnCapability.SEND_AUDIO, OwnCapability.SEND_VIDEO],
      },
    });
    // #endregion snippet

    expect(create).toHaveBeenCalledTimes(1);
    const callType = await client.video.getCallType({ name: allhandsType });
    expect(callType.settings.audio).toMatchObject({
      mic_default_on: true,
      default_device: 'speaker',
    });
    expect([...callType.grants.admin].sort()).toEqual(
      ['send-audio', 'send-video', 'mute-users'].sort(),
    );
    expect([...callType.grants.user].sort()).toEqual(
      ['send-audio', 'send-video'].sort(),
    );
  });

  it('updates a call type', async () => {
    const update = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/02-call_types/02-manage-types.md" heading="Update call type" tab="Node.js" index=1
    // COPY: allhandsType="allhands"
    await client.video.updateCallType({
      name: allhandsType,
      settings: {
        audio: {
          mic_default_on: false,
          default_device: 'earpiece',
        },
      },
    });
    // #endregion snippet

    const response = await (update.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    expect(response.settings.audio).toMatchObject({
      mic_default_on: false,
      default_device: 'earpiece',
    });
    // Grants are kept.
    expect([...response.grants.user].sort()).toEqual(
      ['send-audio', 'send-video'].sort(),
    );
  });

  it('deletes a call type', async () => {
    // #region snippet docs="video/api/02-call_types/02-manage-types.md" heading="Delete call type" tab="Node.js" index=1
    // COPY: allhandsType="allhands"
    await client.video.deleteCallType({ name: allhandsType });
    // #endregion snippet

    // Reads can lag behind on other API nodes.
    await retry(async () => {
      const { call_types } = await client.video.listCallTypes();
      expect(call_types[allhandsType]).toBeUndefined();
    });
  });
});
