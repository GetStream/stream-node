import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { createCallType } from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { joinCallAsUser } from '../../../../helpers/video';
import { retry } from '../../../../helpers/wait';
import type { CallResponse } from '../../../../../../index';

const DOCS = 'video/api/08-transcription/01-transcribing_calls.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  /** A `default` call with a `uniqueId` id, registered for cleanup (not created). */
  const newCall = () => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    return call;
  };

  /** A `default` call with a `uniqueId` id, created by john and registered for cleanup. */
  const createCall = async () => {
    const call = newCall();
    await call.getOrCreate({ data: { created_by_id: johnId } });
    return call;
  };

  /** The awaited results of every call to a spied method. */
  const spyResults = <T>(spy: { mock: { results: { value: unknown }[] } }) =>
    Promise.all(spy.mock.results.map((r) => r.value as Promise<T>));

  type UpdateCallResponse = Awaited<ReturnType<typeof client.video.updateCall>>;
  type UpdateCallTypeResponse = Awaited<
    ReturnType<typeof client.video.updateCallType>
  >;

  /**
   * A `default` call john is a member of and has joined over REST: transcription
   * and closed captions need a call session (see AGENTS.md). Both are stopped
   * in cleanup in case the test fails before its stops.
   */
  const createJoinedCall = async () => {
    const call = newCall();
    await call.getOrCreate({
      data: { created_by_id: johnId, members: [{ user_id: johnId }] },
    });
    await joinCallAsUser(call, johnId);
    cleanup.add(() => call.stopTranscription().catch(() => undefined));
    cleanup.add(() => call.stopClosedCaptions().catch(() => undefined));
    return call;
  };

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts and stops transcription and closed captions', async () => {
    const call = await createJoinedCall();
    // Wait for each process to come up right after its start, before the stops
    // (they turn true within a few seconds, 2026-10-16).
    const states: Pick<CallResponse, 'transcribing' | 'captioning'>[] = [];
    const waitFor = async (flag: 'transcribing' | 'captioning') => {
      const data = await retry(
        async () => {
          const { call: current } = await call.get();
          if (!current[flag]) throw new Error(`not ${flag} yet`);
          return current;
        },
        { timeout: 30000 },
      );
      states.push({
        transcribing: data.transcribing,
        captioning: data.captioning,
      });
    };
    const originalTranscription = client.video.startTranscription.bind(
      client.video,
    );
    const startTranscription = vi
      .spyOn(client.video, 'startTranscription')
      .mockImplementation(async (request) => {
        const response = await originalTranscription(request);
        if (startTranscription.mock.calls.length === 1) {
          await waitFor('transcribing');
        }
        return response;
      });
    const originalCaptions = client.video.startClosedCaptions.bind(
      client.video,
    );
    vi.spyOn(client.video, 'startClosedCaptions').mockImplementation(
      async (request) => {
        const response = await originalCaptions(request);
        await waitFor('captioning');
        return response;
      },
    );
    const stopTranscription = vi.spyOn(client.video, 'stopTranscription');

    // #region snippet docs="video/api/08-transcription/01-transcribing_calls.md" heading="Quick Start" tab="Node.js" index=1
    // start transcription with language
    await call.startTranscription({ language: 'en' });

    // start closed captions with language
    await call.startClosedCaptions({ language: 'en' });

    // stop transcription
    await call.stopTranscription();

    // stop closed captions
    await call.stopClosedCaptions();

    // you can also start or stop with a single API call
    await call.startTranscription({ enable_closed_captions: true });
    await call.stopTranscription({ stop_closed_captions: true });
    // #endregion snippet

    expect(startTranscription.mock.calls.map(([r]) => r)).toEqual([
      { type: call.type, id: call.id, language: 'en' },
      { type: call.type, id: call.id, enable_closed_captions: true },
    ]);
    expect(stopTranscription.mock.calls[1][0]).toEqual({
      type: call.type,
      id: call.id,
      stop_closed_captions: true,
    });
    expect(states).toEqual([
      { transcribing: true, captioning: false },
      { transcribing: true, captioning: true },
    ]);
    const { call: data } = await call.get();
    expect(data.transcribing).toBe(false);
    expect(data.captioning).toBe(false);
  });

  it('sets the transcription language', async () => {
    const call = newCall();
    // The docs update the built-in `default` type: run it on a test call type.
    const languageCallType = await createCallType(client, cleanup);
    const userId = johnId;
    const getOrCreateCall = vi.spyOn(client.video, 'getOrCreateCall');
    const updateCall = vi.spyOn(client.video, 'updateCall');
    const updateCallType = vi.spyOn(client.video, 'updateCallType');
    // The fence creates the call itself: join it (REST, see AGENTS.md) right
    // before its startTranscription, which needs a call session.
    const original = client.video.startTranscription.bind(client.video);
    const startTranscription = vi
      .spyOn(client.video, 'startTranscription')
      .mockImplementation(async (request) => {
        await joinCallAsUser(call, userId);
        return original(request);
      });
    cleanup.add(() => call.stopTranscription().catch(() => undefined));

    // #region snippet docs="video/api/08-transcription/01-transcribing_calls.md" heading="Transcription language" tab="Node.js" index=1
    // COPY: languageCallType="default", userId="user-id"
    // 1. set the language for all calls of the default type to "fr"
    await client.video.updateCallType({
      name: languageCallType,
      settings: {
        transcription: {
          language: 'fr',
        },
      },
    });

    // 2. create a call and set its language to "fr"
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        settings_override: {
          transcription: {
            language: 'fr',
          },
        },
      },
    });

    // 3. update an existing call and set its language to "fr"
    await call.update({
      settings_override: {
        transcription: {
          language: 'fr',
        },
      },
    });

    // 4. start transcription and set language to "fr"
    await call.startTranscription({ language: 'fr' });
    // #endregion snippet

    const [type] = await spyResults<UpdateCallTypeResponse>(updateCallType);
    expect(type.settings.transcription.language).toBe('fr');
    const [created] =
      await spyResults<
        Awaited<ReturnType<typeof client.video.getOrCreateCall>>
      >(getOrCreateCall);
    expect(created.created).toBe(true);
    expect(created.call.settings.transcription.language).toBe('fr');
    const [updated] = await spyResults<UpdateCallResponse>(updateCall);
    expect(updated.call.settings.transcription.language).toBe('fr');
    expect(startTranscription.mock.calls[0][0]).toMatchObject({
      language: 'fr',
    });
    await startTranscription.mock.results[0].value;
    // transcribing turns true within a few seconds of the start (2026-10-16).
    const data = await retry(
      async () => {
        const { call: current } = await call.get();
        if (!current.transcribing) throw new Error('not transcribing yet');
        return current;
      },
      { timeout: 30000 },
    );
    expect(data.transcribing).toBe(true);
    expect(data.settings.transcription.language).toBe('fr');
  });

  it('configures the speech segment settings', async () => {
    const call = await createCall();
    const segmentCallType = await createCallType(client, cleanup);
    const updateCall = vi.spyOn(client.video, 'updateCall');
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/08-transcription/01-transcribing_calls.md" heading="Configuration" tab="Node.js" index=1
    // COPY: segmentCallType="default"
    // Per call type (default)
    await client.video.updateCallType({
      name: segmentCallType,
      settings: {
        transcription: {
          speech_segment_config: {
            max_speech_caption_ms: 9000,
            silence_duration_ms: 700,
          },
        },
      },
    });

    // Per call (override)
    await call.update({
      settings_override: {
        transcription: {
          speech_segment_config: {
            max_speech_caption_ms: 5000,
            silence_duration_ms: 600,
          },
        },
      },
    });
    // #endregion snippet

    const [type] = await spyResults<UpdateCallTypeResponse>(updateCallType);
    expect(type.settings.transcription.speech_segment_config).toEqual({
      max_speech_caption_ms: 9000,
      silence_duration_ms: 700,
    });
    const [updated] = await spyResults<UpdateCallResponse>(updateCall);
    expect(updated.call.settings.transcription.speech_segment_config).toEqual({
      max_speech_caption_ms: 5000,
      silence_duration_ms: 600,
    });
  });

  it('lists call transcriptions', async () => {
    const call = await createCall();
    const listTranscriptions = vi.spyOn(client.video, 'listTranscriptions');

    // #region snippet docs="video/api/08-transcription/01-transcribing_calls.md" heading="List call transcriptions" tab="Node.js" index=1
    await call.listTranscriptions();
    // #endregion snippet

    const [response] =
      await spyResults<
        Awaited<ReturnType<typeof client.video.listTranscriptions>>
      >(listTranscriptions);
    expect(response.transcriptions).toEqual([]);
  });

  it('returns an error when deleting a transcription that does not exist', async () => {
    const call = await createCall();
    // "An error will be returned if the transcription doesn't exist": record
    // the error of the docs' placeholder session and filename.
    const original = client.video.deleteTranscription.bind(client.video);
    const errors: unknown[] = [];
    const deleteTranscription = vi
      .spyOn(client.video, 'deleteTranscription')
      .mockImplementation(async (request) => {
        try {
          return await original(request);
        } catch (error) {
          errors.push(error);
          return undefined as never;
        }
      });

    // #region snippet docs="video/api/08-transcription/01-transcribing_calls.md" heading="Delete call transcription" tab="Node.js" index=1
    await call.deleteTranscription({
      session: '<session ID>',
      filename: '<filename>',
    });
    // #endregion snippet

    expect(deleteTranscription.mock.calls[0][0]).toMatchObject({
      type: 'default',
      id: call.id,
      session: '<session ID>',
      filename: '<filename>',
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({ code: 16 });
    expect(String(errors[0])).toContain("transcription doesn't exist");
  });

  it('enables, disables and configures transcription', async () => {
    const call = await createCall();
    // The docs update a call type: run it on a test call type.
    const enableCallType = await createCallType(client, cleanup);
    const updateCall = vi.spyOn(client.video, 'updateCall');
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/08-transcription/01-transcribing_calls.md" heading="Enabling, disabling, automatically start" tab="Node.js" index=1
    // COPY: enableCallType="<call type name>"
    // Disable on call level
    await call.update({
      settings_override: {
        transcription: {
          mode: 'disabled',
          closed_caption_mode: 'disabled',
        },
      },
    });

    // Disable on call type level
    await client.video.updateCallType({
      name: enableCallType,
      settings: {
        transcription: {
          language: 'en',
          mode: 'disabled',
          closed_caption_mode: 'disabled',
        },
      },
    });

    // Enable
    await call.update({
      settings_override: {
        transcription: {
          language: 'en',
          mode: 'available',
          closed_caption_mode: 'available',
        },
      },
    });

    // Other settings
    await call.update({
      settings_override: {
        transcription: {
          language: 'en',
          mode: 'auto-on',
          closed_caption_mode: 'auto-on',
        },
      },
    });
    // #endregion snippet

    const calls = await spyResults<UpdateCallResponse>(updateCall);
    expect(
      calls.map((r) => [
        r.call.settings.transcription.mode,
        r.call.settings.transcription.closed_caption_mode,
      ]),
    ).toEqual([
      ['disabled', 'disabled'],
      ['available', 'available'],
      ['auto-on', 'auto-on'],
    ]);
    const [type] = await spyResults<UpdateCallTypeResponse>(updateCallType);
    expect(type.name).toBe(enableCallType);
    expect(type.settings.transcription).toMatchObject({
      language: 'en',
      mode: 'disabled',
      closed_caption_mode: 'disabled',
    });
  });
});
