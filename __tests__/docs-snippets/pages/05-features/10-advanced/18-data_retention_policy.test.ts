import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { RetentionPolicy } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import {
  RETENTION_POLICY_NAMES as POLICY_NAMES,
  restoreRetentionPolicies,
} from '../../../helpers/retention';
import type { RetentionPolicyName as PolicyName } from '../../../helpers/retention';

describe('_default/05-features/10-advanced/18-data_retention_policy.md', () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const getPolicy = async (name: PolicyName) =>
    (await client.chat.getRetentionPolicy()).policies.find(
      (p) => p.policy === name,
    );

  beforeAll(async () => {
    // Retention policies are app-level: restore whatever the app had before.
    const original: RetentionPolicy[] = (await client.chat.getRetentionPolicy())
      .policies;
    cleanup.add(() => restoreRetentionPolicies(client, original));
  });

  afterAll(() => cleanup.run());

  it('sets retention policies', async () => {
    // #region snippet docs="_default/05-features/10-advanced/18-data_retention_policy.md" heading="Setting a Retention Policy" tab="Node.js" index=1
    // Delete messages older than 6 months (4,380 hours)
    const oldMsgResponse = await client.chat.setRetentionPolicy({
      policy: 'old-messages',
      max_age_hours: 4380,
    });

    // Delete channels inactive for more than 6 months
    const inactiveChanResponse = await client.chat.setRetentionPolicy({
      policy: 'inactive-channels',
      max_age_hours: 4380,
    });
    // #endregion snippet

    expect(oldMsgResponse.policy.policy).toBe('old-messages');
    expect(oldMsgResponse.policy.config.max_age_hours).toBe(4380);
    expect(inactiveChanResponse.policy.policy).toBe('inactive-channels');
    expect(inactiveChanResponse.policy.config.max_age_hours).toBe(4380);
  });

  it('retrieves retention policies', async () => {
    // #region snippet docs="_default/05-features/10-advanced/18-data_retention_policy.md" heading="Retrieving Retention Policies" tab="Node.js" index=1
    const response = await client.chat.getRetentionPolicy();
    console.log(response.policies);
    // #endregion snippet

    expect(response.policies.map((p) => p.policy)).toEqual(
      expect.arrayContaining(POLICY_NAMES),
    );
  });

  it('deletes a retention policy', async () => {
    // #region snippet docs="_default/05-features/10-advanced/18-data_retention_policy.md" heading="Deleting a Retention Policy" tab="Node.js" index=1
    await client.chat.deleteRetentionPolicy({
      policy: 'old-messages',
    });
    // #endregion snippet

    expect(await getPolicy('old-messages')).toBeUndefined();
    expect(await getPolicy('inactive-channels')).toBeDefined();
  });

  it('queries cleanup run history', async () => {
    // #region snippet docs="_default/05-features/10-advanced/18-data_retention_policy.md" heading="Viewing Cleanup Run History" tab="Node.js" index=1
    const response = await client.chat.getRetentionPolicyRuns({
      filter_conditions: {
        policy: { $eq: 'old-messages' },
      },
      sort: [{ field: 'date', direction: -1 }],
      limit: 10,
    });

    console.log(response.runs);
    // #endregion snippet

    // A fresh policy has a 24h grace period, so there may be no runs yet.
    expect(Array.isArray(response.runs)).toBe(true);
    for (const run of response.runs) expect(run.policy).toBe('old-messages');
  });
});
