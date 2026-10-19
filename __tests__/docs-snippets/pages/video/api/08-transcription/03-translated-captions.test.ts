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
  createCallType,
  retryOnCallTypeMissing,
} from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { joinCallAsUser } from '../../../../helpers/video';
import { retry } from '../../../../helpers/wait';

const DOCS = 'video/api/08-transcription/03-translated-captions.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const hostId = uniqueId('host');

  /** The awaited results of every call to a spied method. */
  const spyResults = <T>(spy: { mock: { results: { value: unknown }[] } }) =>
    Promise.all(spy.mock.results.map((r) => r.value as Promise<T>));

  beforeAll(async () => {
    cleanup.users.push(hostId);
    await client.upsertUsers([{ id: hostId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('enables translated captions for a call and a call type', async () => {
    // The docs create a `default` call and update the built-in `default`
    // type: run both on a test call type.
    const translationCallType = await createCallType(client, cleanup);
    const callId = uniqueId('call');
    cleanup.calls.push(`${translationCallType}:${callId}`);
    // A just-created call type can be unknown to some API nodes for a while.
    const originalGetOrCreate = client.video.getOrCreateCall.bind(client.video);
    const getOrCreateCall = vi
      .spyOn(client.video, 'getOrCreateCall')
      .mockImplementation((request) =>
        retryOnCallTypeMissing(() => originalGetOrCreate(request)),
      );
    const updateCallType = vi.spyOn(client.video, 'updateCallType');
    // The fence creates the call itself: join it (REST, see AGENTS.md) right
    // before its startClosedCaptions, which needs a call session.
    const original = client.video.startClosedCaptions.bind(client.video);
    let captioningAfterStart = false;
    const startClosedCaptions = vi
      .spyOn(client.video, 'startClosedCaptions')
      .mockImplementation(async (request) => {
        await retryOnCallTypeMissing(() =>
          joinCallAsUser({ type: request.type, id: request.id }, hostId),
        );
        cleanup.add(() =>
          client.video
            .stopClosedCaptions({ type: request.type, id: request.id })
            .catch(() => undefined),
        );
        let response = await retryOnCallTypeMissing(() => original(request));
        // captioning turns true within a few seconds of the start (2026-10-16),
        // but now and then it never does: stop and start once more.
        const waitForCaptioning = () =>
          retry(
            async () => {
              const { call: current } = await client.video.getCall(request);
              if (!current.captioning) throw new Error('not captioning yet');
              return current.captioning;
            },
            { timeout: 30000 },
          );
        try {
          captioningAfterStart = await waitForCaptioning();
        } catch {
          await client.video
            .stopClosedCaptions({ type: request.type, id: request.id })
            .catch(() => undefined);
          response = await retryOnCallTypeMissing(() => original(request));
          captioningAfterStart = await waitForCaptioning();
        }
        return response;
      });

    // #region snippet docs="video/api/08-transcription/03-translated-captions.md" heading="Enabling translated captions" tab="Node.js" index=1
    // COPY: translationCallType="default", hostId="host-id"
    // enable translation for a single call
    const call = client.video.call(translationCallType, callId);
    await call.getOrCreate({
      data: {
        created_by_id: hostId,
        settings_override: {
          transcription: {
            mode: 'available',
            closed_caption_mode: 'available',
            language: 'en',
            translation: {
              enabled: true,
              languages: ['es', 'fr'],
            },
          },
        },
      },
    });

    // closed captions must be running for translations to be produced
    await call.startClosedCaptions();

    // enable translation for all calls of a call type instead
    await client.video.updateCallType({
      name: translationCallType,
      settings: {
        transcription: {
          closed_caption_mode: 'available',
          language: 'en',
          translation: {
            enabled: true,
            languages: ['es', 'fr'],
          },
        },
      },
    });
    // #endregion snippet

    const [created] =
      await spyResults<
        Awaited<ReturnType<typeof client.video.getOrCreateCall>>
      >(getOrCreateCall);
    expect(created.created).toBe(true);
    expect(created.call.settings.transcription).toMatchObject({
      mode: 'available',
      closed_caption_mode: 'available',
      language: 'en',
      translation: { enabled: true, languages: ['es', 'fr'] },
    });
    expect(startClosedCaptions).toHaveBeenCalledTimes(1);
    expect(captioningAfterStart).toBe(true);
    const [type] =
      await spyResults<Awaited<ReturnType<typeof client.video.updateCallType>>>(
        updateCallType,
      );
    expect(type.settings.transcription).toMatchObject({
      closed_caption_mode: 'available',
      language: 'en',
      translation: { enabled: true, languages: ['es', 'fr'] },
    });
  }, 180_000);

  it('changes the translation languages during a call', async () => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({
      data: {
        created_by_id: hostId,
        settings_override: {
          transcription: {
            closed_caption_mode: 'available',
            translation: { enabled: true, languages: ['es', 'fr'] },
          },
        },
      },
    });
    const updateCall = vi.spyOn(client.video, 'updateCall');

    // #region snippet docs="video/api/08-transcription/03-translated-captions.md" heading="Changing languages during a call" tab="Node.js" index=1
    // add German to a call that already translates to Spanish and French
    await call.update({
      settings_override: {
        transcription: {
          translation: {
            enabled: true,
            languages: ['es', 'fr', 'de'],
          },
        },
      },
    });
    // #endregion snippet

    const [updated] =
      await spyResults<Awaited<ReturnType<typeof client.video.updateCall>>>(
        updateCall,
      );
    expect(updated.call.settings.transcription.translation).toEqual({
      enabled: true,
      languages: ['es', 'fr', 'de'],
    });
  });
});
