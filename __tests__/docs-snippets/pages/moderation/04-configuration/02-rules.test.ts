import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  GetModerationRuleResponse,
  QueryModerationRulesResponse,
  UpsertModerationRuleResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'moderation/_default/04-configuration/02-rules.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "chat:messaging" config key, test-owned: an enabled rule on the app's
  // own config would act on every chat message of the shared app.
  const configKey = `chat:messaging:${uniqueId('rules')}`;
  // The id of the rule the "Upsert Rule" snippet creates ("rule_id" in the docs).
  let ruleId = '';

  /** Deletes a rule unless a snippet already did. */
  const deleteRule = (id: string) =>
    client.moderation
      .deleteModerationRule({ id })
      .then(() => undefined)
      .catch((error: unknown) => {
        if (!String(error).includes('not found')) throw error;
      });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('upserts a rule', async () => {
    // The docs' rule name, test-owned (rules are app-wide).
    const ruleName = uniqueId('ban-on-severe-harassment');
    const upsertRule = vi.spyOn(client.moderation, 'upsertModerationRule');

    // #region snippet docs="moderation/_default/04-configuration/02-rules.md" heading="Upsert Rule" tab="Node.js" index=1
    // COPY: ruleName="ban_on_severe_harassment", configKey="chat:messaging"
    await client.moderation.upsertModerationRule({
      name: ruleName,
      rule_type: 'content',
      config_keys: [configKey],
      action: {
        type: 'ban_user',
        ban_options: { duration: 86400, reason: 'Severe harassment' },
      },
      conditions: [
        {
          type: 'text_content',
          text_content_params: {
            harm_labels: ['HARASSMENT'],
            severity: 'critical',
          },
        },
      ],
      enabled: true,
      description: 'Auto-ban users for critical harassment',
    });
    // #endregion snippet

    const { rule } = await (upsertRule.mock.results[0]
      .value as Promise<UpsertModerationRuleResponse>);
    if (!rule) throw new Error('upsertModerationRule returned no rule');
    ruleId = rule.id;
    cleanup.add(() => deleteRule(rule.id));
    expect(rule).toMatchObject({
      name: ruleName,
      rule_type: 'content',
      config_keys: [configKey],
      enabled: true,
      description: 'Auto-ban users for critical harassment',
      action: {
        type: 'ban_user',
        ban_options: { duration: 86400, reason: 'Severe harassment' },
      },
    });
    expect(rule.conditions).toEqual([
      {
        type: 'text_content',
        text_content_params: {
          harm_labels: ['HARASSMENT'],
          severity: 'critical',
        },
      },
    ]);
  });

  it('gets a rule', async () => {
    expect(ruleId).not.toBe('');
    const getRule = vi.spyOn(client.moderation, 'getModerationRule');

    // #region snippet docs="moderation/_default/04-configuration/02-rules.md" heading="Get Rule" tab="Node.js" index=1
    // COPY: ruleId="rule_id"
    await client.moderation.getModerationRule({ id: ruleId });
    // #endregion snippet

    const { rule } = await (getRule.mock.results[0]
      .value as Promise<GetModerationRuleResponse>);
    expect(rule).toMatchObject({
      id: ruleId,
      rule_type: 'content',
      config_keys: [configKey],
      enabled: true,
    });
  });

  it('deletes a rule', async () => {
    expect(ruleId).not.toBe('');
    const before = await client.moderation.queryModerationRules({
      filter: { id: ruleId },
    });
    expect(before.rules.map(({ id }) => id)).toEqual([ruleId]);

    // #region snippet docs="moderation/_default/04-configuration/02-rules.md" heading="Delete Rule" tab="Node.js" index=1
    // COPY: ruleId="rule_id"
    await client.moderation.deleteModerationRule({ id: ruleId });
    // #endregion snippet

    const { rules } = await client.moderation.queryModerationRules({
      filter: { id: ruleId },
    });
    expect(rules).toEqual([]);
    await expect(
      client.moderation.getModerationRule({ id: ruleId }),
    ).rejects.toThrow();
  });

  it('queries rules', async () => {
    // Two enabled rules, created in order: the docs query matches every enabled rule
    // of the app, newest first, so the second one must come before the first.
    const created: string[] = [];
    for (const name of [uniqueId('older-rule'), uniqueId('newer-rule')]) {
      const { rule } = await client.moderation.upsertModerationRule({
        name,
        rule_type: 'content',
        config_keys: [configKey],
        action: { type: 'flag_content' },
        conditions: [
          {
            type: 'text_content',
            text_content_params: { harm_labels: ['SPAM'] },
          },
        ],
        enabled: true,
      });
      if (!rule) throw new Error('upsertModerationRule returned no rule');
      cleanup.add(() => deleteRule(rule.id));
      created.push(rule.id);
    }
    const queryRules = vi.spyOn(client.moderation, 'queryModerationRules');

    // #region snippet docs="moderation/_default/04-configuration/02-rules.md" heading="Query Rules" tab="Node.js" index=1
    await client.moderation.queryModerationRules({
      filter: { enabled: true },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 10,
    });
    // #endregion snippet

    const { rules } = await (queryRules.mock.results[0]
      .value as Promise<QueryModerationRulesResponse>);
    expect(rules.length).toBeLessThanOrEqual(10);
    expect(rules.every((rule) => rule.enabled)).toBe(true);
    const ours = rules
      .map((rule) => rule.id)
      .filter((id) => created.includes(id));
    expect(ours).toEqual([created[1], created[0]]);
  });
});
