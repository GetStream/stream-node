import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { StreamError } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'moderation/_default/06-review-queue/05-custom-views.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  // Views have server-assigned ids: every view the file creates gets a `uniqueId`
  // name, and is deleted by id in cleanup (the leak check doesn't know views).
  const viewNames: string[] = [];
  const viewName = (prefix: string) => {
    const name = uniqueId(prefix);
    viewNames.push(name);
    return name;
  };
  let queueId = '';

  /** Deletes a view, ignoring one that is already gone. */
  const deleteView = (id: string) =>
    client.moderation
      .deleteQueue({ id, user_id: moderatorId })
      .catch((error: unknown) => {
        if (!(error instanceof StreamError && error.code === 16)) throw error;
      });

  beforeAll(async () => {
    cleanup.users.push(moderatorId);
    await client.upsertUsers([{ id: moderatorId, role: 'admin' }]);
    // Local leak check for views (capped at 10 per app). Added first, so it runs
    // after the view deletions and before the moderator is deleted (`listQueues`
    // with a missing `user_id` would create that user again).
    cleanup.add(async () => {
      const { queues } = await client.moderation.listQueues({
        user_id: moderatorId,
      });
      const leaked = queues.filter((queue) => viewNames.includes(queue.name));
      await Promise.all(leaked.map((queue) => deleteView(queue.id)));
      if (leaked.length) {
        throw new Error(
          `LEAK: views ${leaked.map((queue) => queue.name).join(', ')}`,
        );
      }
    });

    // The view the list / get / update / delete snippets act on.
    const { queue } = await client.moderation.createQueue({
      name: viewName('shared-view'),
      type: 'personal_view',
      description: 'Created by the docs snippet tests',
      user_id: moderatorId,
      filters: { entity_type: 'stream:chat:v1:message', reporter_type: 'user' },
    });
    queueId = queue!.id;
    cleanup.add(() => deleteView(queueId));
  });

  afterAll(() => cleanup.run());

  it('creates a view', async () => {
    const flaggedImagesName = viewName('flagged-images');

    // #region snippet docs="moderation/_default/06-review-queue/05-custom-views.md" heading="Create a View" tab="Node.js" index=1
    // COPY: flaggedImagesName="Flagged images", moderatorId="moderator-1"
    const response = await client.moderation.createQueue({
      name: flaggedImagesName,
      type: 'personal_view',
      description: 'Unreviewed image content flagged by the AI image engine',
      user_id: moderatorId,
      filters: {
        entity_type: 'stream:chat:v1:message',
        has_image: true,
        category: 'ai_image',
      },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    const id = response.queue!.id;
    cleanup.add(() => deleteView(id));
    expect(response.queue).toMatchObject({
      name: flaggedImagesName,
      type: 'personal_view',
      description: 'Unreviewed image content flagged by the AI image engine',
      created_by: moderatorId,
      filters: {
        entity_type: 'stream:chat:v1:message',
        has_image: true,
        category: 'ai_image',
      },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    expect(typeof id).toBe('string');
  });

  it('lists views', async () => {
    // #region snippet docs="moderation/_default/06-review-queue/05-custom-views.md" heading="List Views" tab="Node.js" index=1
    // COPY: moderatorId="moderator-1"
    const response = await client.moderation.listQueues({
      user_id: moderatorId,
    });
    // #endregion snippet

    const view = response.queues.find((queue) => queue.id === queueId);
    expect(view?.created_by).toBe(moderatorId);
    expect(typeof view?.item_count).toBe('number');
  });

  it('gets a view', async () => {
    // #region snippet docs="moderation/_default/06-review-queue/05-custom-views.md" heading="Get a View" tab="Node.js" index=1
    // COPY: queueId="queue-id", moderatorId="moderator-1"
    const response = await client.moderation.getQueue({
      id: queueId,
      user_id: moderatorId,
    });
    // #endregion snippet

    expect(response.queue).toMatchObject({
      id: queueId,
      type: 'personal_view',
      created_by: moderatorId,
    });
  });

  it('updates a view', async () => {
    const flaggedImagesEuName = viewName('flagged-images-eu');

    // #region snippet docs="moderation/_default/06-review-queue/05-custom-views.md" heading="Update a View" tab="Node.js" index=1
    // COPY: queueId="queue-id", flaggedImagesEuName="Flagged images (EU)", moderatorId="moderator-1"
    const response = await client.moderation.updateQueue({
      id: queueId,
      name: flaggedImagesEuName,
      user_id: moderatorId,
      filters: {
        entity_type: 'stream:chat:v1:message',
        has_image: true,
        category: 'ai_image',
        label: 'nudity',
      },
    });
    // #endregion snippet

    // Omitted fields are kept; `filters` is replaced (the old `reporter_type` is gone).
    expect(response.queue).toMatchObject({
      id: queueId,
      name: flaggedImagesEuName,
      description: 'Created by the docs snippet tests',
      type: 'personal_view',
    });
    expect(response.queue?.filters).toEqual({
      entity_type: 'stream:chat:v1:message',
      has_image: true,
      category: 'ai_image',
      label: 'nudity',
    });
  });

  it('deletes a view', async () => {
    // #region snippet docs="moderation/_default/06-review-queue/05-custom-views.md" heading="Delete a View" tab="Node.js" index=1
    // COPY: queueId="queue-id", moderatorId="moderator-1"
    const response = await client.moderation.deleteQueue({
      id: queueId,
      user_id: moderatorId,
    });
    // #endregion snippet

    expect(response.metadata.responseCode).toBe(201);
    await expect(
      client.moderation.getQueue({ id: queueId, user_id: moderatorId }),
    ).rejects.toMatchObject({ code: 16, metadata: { responseCode: 404 } });
    const { queues } = await client.moderation.listQueues({
      user_id: moderatorId,
    });
    expect(queues.map((queue) => queue.id)).not.toContain(queueId);
  });
});
