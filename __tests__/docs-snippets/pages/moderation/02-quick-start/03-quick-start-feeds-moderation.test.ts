import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { QueryFeedModerationTemplatesResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { waitForReviewItem } from '../../../helpers/server';

const DOCS =
  'moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "mod_tmpl_1" template, test-owned.
  const templateName = uniqueId('mod-tmpl');

  /**
   * Feed moderation templates aren't covered by the leak check, and the generated
   * `v2DeleteTemplate()` can't send the template name (the API reads it from the
   * request body), so cleanup sends the delete request itself.
   */
  const deleteTemplate = (name: string) =>
    client.moderation.apiClient
      .sendRequest(
        'DELETE',
        '/api/v2/moderation/feeds_moderation_template',
        undefined,
        undefined,
        { name },
      )
      .catch((error: unknown) => {
        if (!String(error).includes('does not exist')) throw error;
      });

  const findTemplate = async (name: string) => {
    const { templates } = await client.moderation.v2QueryTemplates();
    return templates.find((template) => template.name === name);
  };

  afterEach(() => vi.restoreAllMocks());
  afterAll(async () => {
    await cleanup.run();
    expect(await findTemplate(templateName)).toBeUndefined();
  });

  it('creates a template via the API', async () => {
    cleanup.add(() => deleteTemplate(templateName));

    // #region snippet docs="moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md" heading="Create a Template via API" tab="Node.js" index=1
    // COPY: templateName="mod_tmpl_1"
    await client.moderation.v2UpsertTemplate({
      name: templateName,
      config: {
        data_types: { text: 'text', attachments: 'image' },
        config_key: 'feeds:default',
      },
    });
    // #endregion snippet

    const template = await findTemplate(templateName);
    expect(template?.config).toMatchObject({
      data_types: { text: 'text', attachments: 'image' },
      config_key: 'feeds:default',
    });
  });

  it('queries templates', async () => {
    const queryTemplates = vi.spyOn(client.moderation, 'v2QueryTemplates');

    // #region snippet docs="moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md" heading="Query Templates" tab="Node.js" index=1
    await client.moderation.v2QueryTemplates();
    // #endregion snippet

    const [response] = await Promise.all(
      queryTemplates.mock.results.map(
        (r) => r.value as Promise<QueryFeedModerationTemplatesResponse>,
      ),
    );
    expect(response.templates.map(({ name }) => name)).toContain(templateName);
  });

  // The fence is right for the API, but the generated `v2DeleteTemplate()` takes no
  // arguments (TS2554) and sends no name, so it fails with code 4 "name is
  // a required field". Cleanup deletes the template instead.
  it.skip('BLOCKED: SDK issue: v2DeleteTemplate() cannot send the template name', async () => {
    // #region snippet docs="moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md" heading="Delete Template" tab="Node.js" index=1
    // COPY: templateName="mod_tmpl_1"
    await client.moderation.v2DeleteTemplate({ name: templateName });
    // #endregion snippet

    expect(await findTemplate(templateName)).toBeUndefined();
  });

  // The node SDK can't create Feeds v2 activities (the test app has no Feeds v2 data).
  // Don't run this against the shared app: the failing flag still stores a review
  // queue item, and every read that includes it (getReviewQueueItem, a
  // queryReviewQueue page with it, submitAction on it) fails with the same empty
  // code -1 error (2026-10-29).
  it.skip('BLOCKED: flagging a Feeds v2 activity id that does not exist fails with code -1 (500), message: V2Flag failed with error: ""', async () => {
    // The docs' undefined app values: a Feeds v2 activity (the moderation API takes
    // any entity id) and its users.
    const activityId = uniqueId('activity');
    const actorId = uniqueId('actor');
    const reporterId = uniqueId('reporter');
    cleanup.users.push(actorId, reporterId);
    await client.upsertUsers([{ id: actorId }, { id: reporterId }]);

    // #region snippet docs="moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md" heading="User-Driven Actions" tab="Node.js" index=1
    await client.moderation.flag({
      entity_type: 'stream:feeds:v2:activity',
      entity_id: activityId,
      entity_creator_id: actorId,
      reason: 'inappropriate_content',
      user_id: reporterId,
    });
    // #endregion snippet

    const item = await waitForReviewItem(client, activityId);
    expect(item).toMatchObject({
      entity_type: 'stream:feeds:v2:activity',
      entity_creator_id: actorId,
    });
    expect(item.flags[0]).toMatchObject({
      reason: 'inappropriate_content',
      user_id: reporterId,
    });
  });
});
