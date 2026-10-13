import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { sendServerMessage } from '../../helpers/server';
import { waitForTask } from '../../helpers/wait';

const DOCS = '_default/10-migrating/03-exporting_channels.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const ownerId = uniqueId('owner');
  const channelId = uniqueId('white-room');
  const channelId2 = uniqueId('white-room2');
  const user1 = { id: uniqueId('user-1') };
  const user2 = { id: uniqueId('user-2') };

  beforeAll(async () => {
    cleanup.users.push(ownerId, user1.id, user2.id);
    await client.upsertUsers([{ id: ownerId }, user1, user2]);

    for (const id of [channelId, channelId2]) {
      cleanup.channels.push(`livestream:${id}`);
      await client.chat.channel('livestream', id).getOrCreate({
        data: {
          created_by_id: ownerId,
          members: [{ user_id: user1.id }, { user_id: user2.id }],
        },
      });
      await sendServerMessage(client, `livestream:${id}`, {
        text: `hello from ${user1.id}`,
        user_id: user1.id,
      });
      await sendServerMessage(client, `livestream:${id}`, {
        text: `hello from ${user2.id}`,
        user_id: user2.id,
      });
    }
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('exports one and several channels, then checks the export status', async () => {
    // #region snippet docs="_default/10-migrating/03-exporting_channels.md" heading="Exporting Channels" tab="Node.js" index=1
    // COPY: channelId="white-room", channelId2="white-room2"
    // Export a single channel
    const response = await client.chat.exportChannels({
      channels: [
        {
          type: 'livestream',
          id: channelId,
          messages_since: new Date('2020-11-10T09:30:00.000Z'),
          messages_until: new Date('2020-11-10T11:30:00.000Z'),
        },
      ],
      include_truncated_messages: true,
      include_soft_deleted_channels: true,
    });

    const taskId = response.task_id;

    // Export multiple channels
    const multiResponse = await client.chat.exportChannels({
      channels: [
        {
          type: 'livestream',
          id: channelId,
          messages_since: new Date('2020-11-10T09:30:00.000Z'),
          messages_until: new Date('2020-11-10T11:30:00.000Z'),
        },
        {
          type: 'livestream',
          id: channelId2,
        },
      ],
      include_truncated_messages: true,
      include_soft_deleted_channels: true,
    });
    const multiTaskId = multiResponse.task_id;
    // #endregion snippet

    expect(typeof taskId).toBe('string');
    expect(typeof multiTaskId).toBe('string');
    expect(multiTaskId).not.toBe(taskId);

    const multiTask = await waitForTask(client, multiTaskId);
    expect(typeof multiTask.result?.url).toBe('string');

    await waitForTask(client, taskId);
    {
      const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      // #region snippet docs="_default/10-migrating/03-exporting_channels.md" heading="Checking Export Status" tab="Node.js" index=1
      const response = await client.getTask({ id: taskId });

      console.log(response.status); // Task status
      console.log(response.result); // Result object (when completed)
      console.log(response.result?.url); // Download URL (when completed)
      console.log(response.error); // Error description (if failed)
      // #endregion snippet

      expect(response.task_id).toBe(taskId);
      expect(response.status).toBe('completed');
      expect(typeof response.result?.url).toBe('string');
      expect(log.mock.calls).toEqual([
        ['completed'],
        [response.result],
        [response.result?.url],
        [undefined],
      ]);
    }
  });

  it('exports a channel in the v2 format', async () => {
    // #region snippet docs="_default/10-migrating/03-exporting_channels.md" heading="Export Format (v2)" tab="Node.js" index=1
    // COPY: channelId="white-room"
    const response = await client.chat.exportChannels({
      channels: [{ type: 'livestream', id: channelId }],
      version: 'v2',
    });
    // #endregion snippet

    const task = await waitForTask(client, response.task_id);
    const url: unknown = task.result?.url;
    expect(typeof url).toBe('string');

    // v2 is line-separated JSON: one entity per line, including the channel's messages.
    const body = await (await fetch(String(url))).text();
    const lines = body.trim().split('\n');
    expect(lines.length).toBeGreaterThan(1);
    for (const line of lines)
      expect(() => JSON.parse(line) as unknown).not.toThrow();
    expect(body).toContain(channelId);
    expect(body).toContain(`hello from ${user1.id}`);
  });

  it('exports users, then checks the export status', async () => {
    // #region snippet docs="_default/10-migrating/03-exporting_channels.md" heading="Exporting Users" tab="Node.js" index=1
    const response = await client.exportUsers({
      user_ids: [user1.id, user2.id],
    });
    const taskId = response.task_id;
    // #endregion snippet

    expect(typeof taskId).toBe('string');
    await waitForTask(client, taskId);
    {
      const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      // #region snippet docs="_default/10-migrating/03-exporting_channels.md" heading="Checking Export Status" tab="Node.js" index=2
      const response = await client.getTask({ id: taskId });

      if (response.status === 'completed') {
        console.log(response.result?.url);
      }
      // #endregion snippet

      expect(response.status).toBe('completed');
      expect(typeof response.result?.url).toBe('string');
      expect(log.mock.calls).toEqual([[response.result?.url]]);
    }
  });
});
