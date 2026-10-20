import { expect, it } from 'vitest';
import { getServerClient } from '../helpers/clients';
import { createdAtFromId, DOCS_TEST_PREFIX } from '../helpers/ids';
import {
  describeLeftovers,
  findLeftovers,
  removeLeftovers,
} from '../helpers/leaks';
import type { Leftover } from '../helpers/leaks';
import {
  getRetentionPolicies,
  restoreRetentionPolicies,
} from '../helpers/retention';

// Finds (and by default removes) everything with the docs-test prefix, and turns off
// retention policies, e.g. after a crashed run. Run with `yarn test:docs:sweep`.
//   DOCS_SWEEP_DRY_RUN=1   only list what would be removed
//   DOCS_SWEEP_MIN_AGE=0   minutes; skip younger resources so runs in progress are left alone (default 30)
const dryRun = process.env.DOCS_SWEEP_DRY_RUN === '1';
const minAgeMinutes = Number(process.env.DOCS_SWEEP_MIN_AGE ?? 30);

const isOldEnough = (leftover: Leftover) => {
  const createdAt = leftover.createdAt
    ? new Date(leftover.createdAt)
    : createdAtFromId(leftover.id.split(' ')[0]);
  // Unknown age: only sweep it when explicitly asked to ignore age.
  if (!createdAt || Number.isNaN(createdAt.getTime()))
    return minAgeMinutes === 0;
  return Date.now() - createdAt.getTime() >= minAgeMinutes * 60_000;
};

it('sweeps docs-test leftovers', async () => {
  const serverClient = getServerClient();
  const { leftovers, errors } = await findLeftovers(serverClient, {
    // `includes`: guest user ids are rewritten to `guest-<uuid>-docs-test-...`.
    matches: (id) => id.includes(DOCS_TEST_PREFIX),
    // Channels, calls and feeds can't be searched by id prefix: list every one and keep the docs-test
    // ones (they can outlive their creator, e.g. when a file crashed before cleanup).
    createdSince: new Date(0),
  });

  if (errors.length) console.warn(`could not scan:\n  ${errors.join('\n  ')}`);

  // Retention policies have fixed names, so a docs-test one can't be told apart from
  // another; the docs test app has none (see "Test app" in AGENTS.md), so turn off any that
  // are set. They delete old messages and inactive channels on the shared app.
  const policies = (await getRetentionPolicies(serverClient)) ?? [];
  if (policies.length) {
    console.log(
      `${dryRun ? 'Would delete' : 'Deleting'} ${policies.length} retention policy(s):\n${policies
        .map((p) => `  - ${p.policy}: max_age_hours ${p.config.max_age_hours}`)
        .join('\n')}`,
    );
    if (!dryRun) await restoreRetentionPolicies(serverClient, []);
  }

  const toRemove = leftovers.filter(isOldEnough);
  const skipped = leftovers.length - toRemove.length;

  console.log(
    toRemove.length
      ? `${dryRun ? 'Would remove' : 'Removing'} ${toRemove.length} leftover(s):\n${describeLeftovers(toRemove)}`
      : 'No docs-test leftovers found.',
  );
  if (skipped) {
    console.log(
      `Skipped ${skipped} younger than ${minAgeMinutes} min (DOCS_SWEEP_MIN_AGE=0 to include).`,
    );
  }
  if (dryRun) return;

  const failed = await removeLeftovers(toRemove);
  for (const { leftover, error } of failed) {
    console.error(`failed to remove ${leftover.kind} ${leftover.id}: ${error}`);
  }
  expect(failed).toEqual([]);
});
