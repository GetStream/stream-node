import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { UserResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage } from '../../../helpers/server';
import { retry, waitForTask } from '../../../helpers/wait';

const DOCS = 'platform/02-identity-and-access/05-gdpr.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  /** Creates a plain user with a `uniqueId` id and registers it for cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** Looks a user up by id (undefined when the API returns none). */
  const findUser = async (id: string): Promise<UserResponse | undefined> => {
    const { users } = await client.queryUsers({
      payload: { filter_conditions: { id } },
    });
    return users[0];
  };

  /**
   * A `user` feed owned by `ownerId` with one activity, hard-deleted in cleanup (the leak
   * check doesn't track feeds). The feed may already be gone after a delete snippet.
   */
  const createFeedWithActivity = async (ownerId: string, text: string) => {
    const feedId = uniqueId('user-feed');
    const feed = client.feeds.feed('user', feedId);
    await feed.getOrCreate({ user_id: ownerId });
    cleanup.add(async () => {
      await feed.delete({ hard_delete: true }).catch((error: unknown) => {
        if (!String(error).includes('not found')) throw error;
      });
    });
    const { activity } = await client.feeds.addActivity({
      id: uniqueId('activity'),
      type: 'post',
      feeds: [`user:${feedId}`],
      text,
      user_id: ownerId,
    });
    return activity.id;
  };

  /** Downloads an export file (line-separated JSON, no auth needed). */
  const download = async (url: unknown) => {
    expect(typeof url).toBe('string');
    const response = await fetch(String(url));
    expect(response.ok).toBe(true);
    return response.text();
  };

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('exports users', async () => {
    const userID = await createUser('export');
    const channel = client.chat.channel('messaging', uniqueId('channel'));
    await channel.getOrCreate({
      data: { created_by_id: userID, members: [{ user_id: userID }] },
    });
    cleanup.channels.push(channel.cid);
    const text = uniqueId('exported-message');
    await sendServerMessage(client, channel.cid, { text, user_id: userID });

    // #region snippet docs="platform/02-identity-and-access/05-gdpr.md" heading="The Right to Access Data" tab="Node.js" index=1
    const response = await client.exportUsers({
      user_ids: [userID],
    });
    const taskID = response.task_id;
    // #endregion snippet

    expect(typeof taskID).toBe('string');
    const task = await waitForTask(client, taskID);
    const contents = await download(task.result?.url);
    expect(contents).toContain(userID);
    expect(contents).toContain(text);
  });

  it('exports feeds data', async () => {
    const userToExport = { id: await createUser('feeds-export') };
    const text = uniqueId('exported-activity');
    const activityId = await createFeedWithActivity(userToExport.id, text);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="platform/02-identity-and-access/05-gdpr.md" heading="Exporting feeds data" tab="Node.js" index=1
    // Start the export task
    const response = await client.feeds.exportFeedUserData({
      user_id: userToExport.id,
    });

    // You have to poll this endpoint
    const taskResponse = await client.getTask({ id: response.task_id });
    console.log(taskResponse.status === 'completed');
    // #endregion snippet

    expect(taskResponse.task_id).toBe(response.task_id);
    expect(log).toHaveBeenCalledWith(taskResponse.status === 'completed');
    const task = await waitForTask(client, response.task_id);
    const contents = await download(task.result?.url);
    expect(contents).toContain(userToExport.id);
    expect(contents).toContain(activityId);
    expect(contents).toContain(text);
  });

  it('deletes and restores users', async () => {
    const userId = await createUser('delete');
    // Wait for the delete task and check the user is gone before the restore.
    const original_deleteUsers = client.deleteUsers.bind(client);
    vi.spyOn(client, 'deleteUsers').mockImplementation(async (request) => {
      const result = await original_deleteUsers(request);
      await waitForTask(client, result.task_id);
      expect(await findUser(userId)).toBeUndefined();
      return result;
    });

    // #region snippet docs="platform/02-identity-and-access/05-gdpr.md" heading="Deleting users" tab="Node.js" index=1
    // COPY: userId="<id>"
    await client.deleteUsers({ user_ids: [userId] });

    //restore
    await client.restoreUsers({ user_ids: [userId] });
    // #endregion snippet

    const restored = await findUser(userId);
    expect(restored).toMatchObject({ id: userId });
    expect(restored?.deleted_at).toBeUndefined();
  });

  it('deletes feeds data', async () => {
    const userToDelete = { id: await createUser('feeds-delete') };
    const activityId = await createFeedWithActivity(
      userToDelete.id,
      uniqueId('deleted-activity'),
    );
    expect(
      (await client.feeds.getActivity({ id: activityId })).activity.id,
    ).toBe(activityId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="platform/02-identity-and-access/05-gdpr.md" heading="Deleting feeds data" tab="Node.js" index=1
    // Start the delete task
    const response = await client.feeds.deleteFeedUserData({
      user_id: userToDelete.id,
      hard_delete: false,
    });

    // You have to poll this endpoint
    const taskResponse = await client.getTask({ id: response.task_id });
    console.log(taskResponse.status === 'completed');
    // #endregion snippet

    expect(taskResponse.task_id).toBe(response.task_id);
    expect(log).toHaveBeenCalledWith(taskResponse.status === 'completed');
    await waitForTask(client, response.task_id);
    // The user's activity is (soft-)deleted, the user account itself stays.
    await retry(async () => {
      const error = await client.feeds.getActivity({ id: activityId }).then(
        () => undefined,
        (e: unknown) => e,
      );
      expect(error).toMatchObject({ metadata: { responseCode: 404 } });
    });
    expect(await findUser(userToDelete.id)).toMatchObject({
      id: userToDelete.id,
    });
  });
});
