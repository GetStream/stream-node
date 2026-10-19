import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { UpsertModerationRuleResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'moderation/_default/11-guides/09-rule-triggered-webhooks.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a webhook_only content rule', async () => {
    // The docs' "chat:messaging" / "chat:livestream" config keys, test-owned: on the app's
    // own configs the rule would run on every chat message of the shared app.
    const configKey = `chat:messaging:${uniqueId('rule-hooks')}`;
    const livestreamConfigKey = `chat:livestream:${uniqueId('rule-hooks')}`;
    // The docs' rule name, test-owned (rules are app-wide).
    const ruleName = uniqueId('high-profile-harms');
    const upsertRule = vi.spyOn(client.moderation, 'upsertModerationRule');

    // #region snippet docs="moderation/_default/11-guides/09-rule-triggered-webhooks.md" heading="Content rule: notify on a harm label" tab="Node.js" index=1
    // COPY: configKey="chat:messaging", livestreamConfigKey="chat:livestream", ruleName="High-profile harms"
    await client.moderation.upsertModerationRule({
      name: ruleName,
      description: 'Notify when selected harm labels are detected',
      config_keys: [configKey, livestreamConfigKey],
      enabled: true,
      rule_type: 'content',
      conditions: [
        {
          type: 'text_content',
          text_content_params: {
            harm_labels: ['UNDERAGE_USER', 'SCAM'],
          },
        },
      ],
      action: { type: 'webhook_only' },
    });
    // #endregion snippet

    const { rule } = await (upsertRule.mock.results[0]
      .value as Promise<UpsertModerationRuleResponse>);
    if (!rule) throw new Error('upsertModerationRule returned no rule');
    cleanup.add(() =>
      client.moderation
        .deleteModerationRule({ id: rule.id })
        .then(() => undefined),
    );
    expect(rule).toMatchObject({
      name: ruleName,
      description: 'Notify when selected harm labels are detected',
      config_keys: [configKey, livestreamConfigKey],
      enabled: true,
      rule_type: 'content',
      action: { type: 'webhook_only' },
    });
    expect(rule.conditions).toEqual([
      {
        type: 'text_content',
        text_content_params: { harm_labels: ['UNDERAGE_USER', 'SCAM'] },
      },
    ]);
  });
});
