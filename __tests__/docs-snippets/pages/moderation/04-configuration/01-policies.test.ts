import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type {
  GetConfigResponse,
  QueryModerationConfigsResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/04-configuration/01-policies.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "my_config" policy and "profanity_en" blocklist, test-owned.
  const configKey = uniqueId('my-config');
  const profanityBlocklist = uniqueId('profanity');

  /** `upsertConfig` retried while the new blocklist isn't known everywhere yet. */
  const isBlocklistMissing = (error: unknown) =>
    String(error).includes('Blocklist not found');

  beforeAll(async () => {
    await client.createBlockList({
      name: profanityBlocklist,
      words: ['frobnicate'],
    });
    cleanup.add(() => client.deleteBlockList({ name: profanityBlocklist }));
    // The "Delete Config" snippet deletes it; this covers a failure before that.
    cleanup.add(() =>
      client.moderation
        .deleteConfig({ key: configKey })
        .catch((error: unknown) => {
          if (!String(error).includes('not found')) throw error;
        }),
    );
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('upserts a config', async () => {
    const upsertConfig = client.moderation.upsertConfig.bind(client.moderation);
    vi.spyOn(client.moderation, 'upsertConfig').mockImplementation((request) =>
      retry(() => upsertConfig(request), { retryIf: isBlocklistMissing }),
    );

    // #region snippet docs="moderation/_default/04-configuration/01-policies.md" heading="Upsert Config" tab="Node.js" index=1
    // COPY: configKey="my_config", profanityBlocklist="profanity_en"
    await client.moderation.upsertConfig({
      key: configKey,
      ai_text_config: {
        rules: [
          { label: 'SPAM', action: 'flag' },
          {
            label: 'HATRED',
            severity_rules: [
              { severity: 'low', action: 'flag' },
              { severity: 'high', action: 'remove' },
            ],
          },
        ],
      },
      block_list_config: {
        rules: [{ name: profanityBlocklist, action: 'remove' }],
      },
      ai_image_config: {
        rules: [
          { label: 'Non-Explicit Nudity', action: 'flag', min_confidence: 50 },
        ],
      },
    });
    // #endregion snippet
  });

  it('gets a config', async () => {
    const getConfig = vi.spyOn(client.moderation, 'getConfig');

    // #region snippet docs="moderation/_default/04-configuration/01-policies.md" heading="Get Config" tab="Node.js" index=1
    // COPY: configKey="my_config"
    await client.moderation.getConfig({ key: configKey });
    // #endregion snippet

    const { config } = await (getConfig.mock.results[0]
      .value as Promise<GetConfigResponse>);
    expect(config?.key).toBe(configKey);
    expect(
      config?.ai_text_config?.rules?.map(
        ({ label, action, severity_rules }) => ({
          label,
          action,
          severity_rules: severity_rules?.map(({ severity, action }) => ({
            severity,
            action,
          })),
        }),
      ),
    ).toEqual([
      { label: 'SPAM', action: 'flag', severity_rules: [] },
      {
        label: 'HATRED',
        action: '',
        severity_rules: [
          { severity: 'low', action: 'flag' },
          { severity: 'high', action: 'remove' },
        ],
      },
    ]);
    expect(
      config?.block_list_config?.rules?.map(({ name, action }) => ({
        name,
        action,
      })),
    ).toEqual([{ name: profanityBlocklist, action: 'remove' }]);
    expect(
      config?.ai_image_config?.rules?.map(
        ({ label, action, min_confidence }) => ({
          label,
          action,
          min_confidence,
        }),
      ),
    ).toEqual([
      { label: 'Non-Explicit Nudity', action: 'flag', min_confidence: 50 },
    ]);
  });

  it('queries configs', async () => {
    const queryConfigs = vi.spyOn(client.moderation, 'queryModerationConfigs');

    // #region snippet docs="moderation/_default/04-configuration/01-policies.md" heading="Query Configs" tab="Node.js" index=1
    await client.moderation.queryModerationConfigs({
      filter: {},
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 10,
    });
    // #endregion snippet

    const { configs } = await (queryConfigs.mock.results[0]
      .value as Promise<QueryModerationConfigsResponse>);
    expect(configs.length).toBeGreaterThan(0);
    expect(configs.length).toBeLessThanOrEqual(10);
    // Newest first: the config this file just created is among them.
    const createdAt = configs.map(({ created_at }) => created_at);
    expect(createdAt).toEqual([...createdAt].sort((a, b) => b - a));
    expect(configs.map(({ key }) => key)).toContain(configKey);
  });

  it('deletes a config', async () => {
    // #region snippet docs="moderation/_default/04-configuration/01-policies.md" heading="Delete Config" tab="Node.js" index=1
    // COPY: configKey="my_config"
    await client.moderation.deleteConfig({ key: configKey });
    // #endregion snippet

    const error: unknown = await client.moderation
      .getConfig({ key: configKey })
      .catch((e: unknown) => e);
    expect(error).toMatchObject({ metadata: { responseCode: 404 } });
  });
});
