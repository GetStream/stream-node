import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { QueryFeedModerationTemplatesResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

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
  // arguments (TS2554, see the TODO) and sends no name, so it fails with code 4 "name is
  // a required field". Cleanup deletes the template instead.
  it.skip('BLOCKED: SDK issue: v2DeleteTemplate() cannot send the template name', async () => {
    // #region snippet docs="moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md" heading="Delete Template" tab="Node.js" index=1
    // COPY: templateName="mod_tmpl_1"
    await client.moderation.v2DeleteTemplate({ name: templateName });
    // #endregion snippet

    expect(await findTemplate(templateName)).toBeUndefined();
  });
});
