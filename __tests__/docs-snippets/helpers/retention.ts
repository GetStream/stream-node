import type { RetentionPolicy, StreamClient } from '../../../index';

export type RetentionPolicyName = 'old-messages' | 'inactive-channels';
export const RETENTION_POLICY_NAMES: RetentionPolicyName[] = [
  'old-messages',
  'inactive-channels',
];

/** The app's retention policies, or `undefined` if the plan doesn't support them. */
export const getRetentionPolicies = async (client: StreamClient) => {
  try {
    return (await client.chat.getRetentionPolicy()).policies;
  } catch {
    return undefined;
  }
};

/** Puts back `original` and deletes every policy that wasn't in it. Returns the policies it changed. */
export const restoreRetentionPolicies = async (
  client: StreamClient,
  original: RetentionPolicy[],
) => {
  const current = (await client.chat.getRetentionPolicy()).policies;
  const changed: string[] = [];
  for (const name of RETENTION_POLICY_NAMES) {
    const before = original.find((p) => p.policy === name);
    const now = current.find((p) => p.policy === name);
    if (before && now?.config.max_age_hours !== before.config.max_age_hours) {
      await client.chat.setRetentionPolicy({
        policy: name,
        max_age_hours: before.config.max_age_hours,
      });
      changed.push(name);
    } else if (!before && now) {
      await client.chat.deleteRetentionPolicy({ policy: name });
      changed.push(name);
    }
  }
  return changed;
};
