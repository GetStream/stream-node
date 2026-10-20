import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'moderation/_default/04-configuration/05-flooding.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' app-wide "chat:messaging" policy, test-owned.
  const configKey = uniqueId('flood-config');
  const sender = uniqueId('flooder');

  beforeAll(async () => {
    cleanup.users.push(sender);
    await client.upsertUsers([{ id: sender }]);
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
  });

  afterAll(() => cleanup.run());

  it('configures flood detection', async () => {
    // #region snippet docs="moderation/_default/04-configuration/05-flooding.md" heading="Configuration" tab="Node.js" index=1
    // COPY: configKey="chat:messaging"
    await client.moderation.upsertConfig({
      key: configKey,
      flood_config: {
        identical: {
          enabled: true,
          threshold: 5,
          time_window: '30m',
          action: 'flag',
        },
        similar: {
          enabled: true,
          threshold: 5,
          time_window: '30m',
          similarity_distance: 5,
          action: 'remove',
        },
        allowlist: ['gg', 'well played'],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({ key: configKey });
    expect(config?.flood_config).toMatchObject({
      identical: {
        enabled: true,
        threshold: 5,
        time_window: '30m',
        action: 'flag',
      },
      similar: {
        enabled: true,
        threshold: 5,
        time_window: '30m',
        similarity_distance: 5,
        action: 'remove',
      },
      allowlist: ['gg', 'well played'],
    });

    // The policy applies: the fifth identical message from one user is flagged.
    const check = (text: string) =>
      client.moderation.check({
        entity_type: 'stream:chat:v1:message',
        entity_id: uniqueId('message'),
        entity_creator_id: sender,
        config_key: configKey,
        moderation_payload: { texts: [text] },
      });
    const actions: string[] = [];
    for (let i = 0; i < 5; i++) {
      const response = await check('buy my stuff at the shop now');
      actions.push(response.recommended_action);
    }
    expect(actions).toEqual(['keep', 'keep', 'keep', 'keep', 'flag']);
    // Allowlisted phrases are never flood-flagged.
    const allowlisted: string[] = [];
    for (let i = 0; i < 6; i++) {
      const response = await check('well played');
      allowlisted.push(response.recommended_action);
    }
    expect(allowlisted.every((action) => action === 'keep')).toBe(true);
  });
});
