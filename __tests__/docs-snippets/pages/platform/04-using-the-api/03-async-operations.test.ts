import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'platform/04-using-the-api/03-async-operations.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const userId1 = uniqueId('async-user1');
  const userId2 = uniqueId('async-user2');

  beforeAll(async () => {
    cleanup.users.push(userId1, userId2);
    await client.upsertUsers([{ id: userId1 }, { id: userId2 }]);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('polls a task manually', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="platform/04-using-the-api/03-async-operations.md" heading="Polling manually" tab="Node.js" index=1
    // COPY: userId1="<user id1>", userId2="<user id2>"
    const response = await client.exportUsers({
      user_ids: [userId1, userId2],
    });

    // poll until the status is completed or failed
    let taskResponse = await client.getTask({ id: response.task_id });
    while (
      taskResponse.status !== 'completed' &&
      taskResponse.status !== 'failed'
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      taskResponse = await client.getTask({ id: response.task_id });
    }

    console.log(taskResponse.status, taskResponse.result);
    // #endregion snippet

    expect(taskResponse.task_id).toBe(response.task_id);
    expect(taskResponse.status).toBe('completed');
    expect(log).toHaveBeenCalledWith('completed', taskResponse.result);
    const url = taskResponse.result?.url as unknown;
    expect(typeof url).toBe('string');
    const contents = await (await fetch(String(url))).text();
    expect(contents).toContain(userId1);
    expect(contents).toContain(userId2);
  });
});
