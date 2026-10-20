import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { StreamError } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { waitForTask } from '../../../../helpers/wait';

const DOCS = 'video/api/09-GDPR and Privacy/03-calls.md';

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

  /** The error of `call.get()`, or `undefined` if it succeeds. */
  const getError = (call: Awaited<ReturnType<typeof createCall>>) =>
    call.get().then(
      () => undefined,
      (error: unknown) => error,
    );

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
  });

  afterAll(() => cleanup.run());

  it('soft-deletes a call', async () => {
    const call = await createCall();

    // #region snippet docs="video/api/09-GDPR and Privacy/03-calls.md" heading="Soft delete" tab="Node.js" index=1
    // soft-delete a call
    const resp = await call.delete({
      hard: false,
    });
    // resp.call contains call information
    // #endregion snippet

    expect(resp.call.cid).toBe(call.cid);
    expect(resp.task_id).toBeUndefined();
    const error = await getError(call);
    expect(error).toBeInstanceOf(StreamError);
    expect(error).toMatchObject({ metadata: { responseCode: 404 } });
  });

  it('hard-deletes a call', async () => {
    const call = await createCall();

    // #region snippet docs="video/api/09-GDPR and Privacy/03-calls.md" heading="Hard delete" tab="Node.js" index=1
    // hard-delete a call
    const resp = await call.delete({
      hard: true,
    });
    // resp.call contains call information
    // resp.task_id is the ID to be used for monitoring the task
    // #endregion snippet

    expect(resp.call.cid).toBe(call.cid);
    expect(typeof resp.task_id).toBe('string');
    await waitForTask(client, resp.task_id ?? '');
    const error = await getError(call);
    expect(error).toBeInstanceOf(StreamError);
    expect(error).toMatchObject({ metadata: { responseCode: 404 } });
  });
});
