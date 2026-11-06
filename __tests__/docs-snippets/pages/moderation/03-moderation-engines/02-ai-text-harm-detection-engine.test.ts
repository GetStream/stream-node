import { afterAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS =
  'moderation/_default/03-moderation-engines/02-ai-text-harm-detection-engine.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' app-wide "chat:messaging" policy, test-owned.
  const policyKey = uniqueId('ai-text-policy');

  afterAll(() => cleanup.run());

  it('configures the NLP engine with actions and severity rules', async () => {
    cleanup.add(() => client.moderation.deleteConfig({ key: policyKey }));

    // #region snippet docs="moderation/_default/03-moderation-engines/02-ai-text-harm-detection-engine.md" heading="Configuration" tab="Node.js" index=1
    // COPY: policyKey="chat:messaging"
    await client.moderation.upsertConfig({
      key: policyKey,
      ai_text_config: {
        enabled: true,
        rules: [
          // One action for every match
          { label: 'INSULT', action: 'flag' },
          // Labels without severity can only take one action
          { label: 'PLATFORM_BYPASS', action: 'flag' },
          // An action per severity
          {
            label: 'HATRED',
            severity_rules: [
              { severity: 'low', action: 'flag' },
              { severity: 'medium', action: 'flag' },
              { severity: 'high', action: 'remove' },
              { severity: 'critical', action: 'remove' },
            ],
          },
        ],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({ key: policyKey });
    expect(config?.ai_text_config?.enabled).toBe(true);
    expect(config?.ai_text_config?.rules).toMatchObject([
      { label: 'INSULT', action: 'flag' },
      { label: 'PLATFORM_BYPASS', action: 'flag' },
      {
        label: 'HATRED',
        severity_rules: [
          { severity: 'low', action: 'flag' },
          { severity: 'medium', action: 'flag' },
          { severity: 'high', action: 'remove' },
          { severity: 'critical', action: 'remove' },
        ],
      },
    ]);
  });
});
