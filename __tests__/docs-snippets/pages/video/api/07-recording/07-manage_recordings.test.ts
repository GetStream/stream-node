import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { joinCallAsUser } from '../../../../helpers/video';
import { retry } from '../../../../helpers/wait';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DOCS = 'video/api/07-recording/07-manage_recordings.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  /** A `default` call with a `uniqueId` id, created by john and registered for cleanup. */
  const createCall = async () => {
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({ data: { created_by_id: johnId } });
    return call;
  };

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  it('lists the recordings of a call', async () => {
    const call = await createCall();
    const listRecordings = vi.spyOn(client.video, 'listRecordings');

    // #region snippet docs="video/api/07-recording/07-manage_recordings.md" heading="List recordings" tab="Node.js" index=1
    await call.listRecordings();
    // #endregion snippet

    expect(listRecordings).toHaveBeenCalledWith({
      id: call.id,
      type: call.type,
    });
    const response = await (listRecordings.mock.results[0].value as ReturnType<
      typeof client.video.listRecordings
    >);
    // A call nobody joined has no recordings.
    expect(response.recordings).toEqual([]);
    listRecordings.mockRestore();
  });

  it('deletes a recording', { timeout: 120_000 }, async () => {
    // A composite recording of a few seconds on a call with a session (REST
    // join, see AGENTS.md) shows up in listRecordings within ~15s (2026-10-16).
    const call = client.video.call('default', uniqueId('call'));
    cleanup.calls.push(call.cid);
    await call.getOrCreate({
      data: { created_by_id: johnId, members: [{ user_id: johnId }] },
    });
    await joinCallAsUser(call, johnId);
    cleanup.add(() =>
      call
        .stopRecording({ recording_type: 'composite' })
        .catch(() => undefined),
    );
    await call.startRecording({ recording_type: 'composite' });
    await sleep(10000);
    await call.stopRecording({ recording_type: 'composite' });
    const [recording] = await retry(
      async () => {
        const { recordings } = await call.listRecordings();
        if (recordings.length === 0) throw new Error('no recording yet');
        return recordings;
      },
      { timeout: 90000, interval: 5000 },
    );
    const sessionId = recording.session_id;
    const recordingFilename = recording.filename;

    // #region snippet docs="video/api/07-recording/07-manage_recordings.md" heading="Delete recording" tab="Node.js" index=1
    // COPY: sessionId="<session id>", recordingFilename="<filename>"
    await call.deleteRecording({
      session: sessionId,
      filename: recordingFilename,
    });
    // #endregion snippet

    const response = await call.listRecordings();
    expect(response.recordings).toEqual([]);
  });
});
