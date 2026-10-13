import { config } from 'dotenv';
import path from 'node:path';
import { getServerClient } from './helpers/clients';
import { createdAtFromId, DOCS_TEST_PREFIX } from './helpers/ids';
import {
  describeLeftovers,
  findLeftovers,
  removeLeftovers,
} from './helpers/leaks';
import type { Leftover } from './helpers/leaks';
import {
  getRetentionPolicies,
  restoreRetentionPolicies,
} from './helpers/retention';

// Safety net for the per-file leak check in setup.ts: a test file that throws while it
// is loaded (module-level setup or region) runs no hooks, so neither its cleanup nor the
// leak check runs. After the whole run, remove every docs-test resource created since the
// run started, put back the retention policies the run started with (they are app-level
// and delete old data), and fail the run if either was needed.

/** Server and local clocks can differ a little. */
const CLOCK_SKEW_MS = 5000;

const createdAt = (leftover: Leftover) => {
  // Campaigns and polls are listed as `<id> (<name>)`; ids minted by `uniqueId` carry
  // their creation time, anything else falls back to the server timestamp.
  const fromId = createdAtFromId(leftover.id.split(' ')[0]);
  if (fromId) return fromId;
  return leftover.createdAt ? new Date(leftover.createdAt) : undefined;
};

const loadEnv = () => {
  config({ path: path.join(__dirname, '../../.env'), quiet: true });
  return Boolean(process.env.STREAM_API_KEY && process.env.STREAM_SECRET);
};

export default async function setup() {
  const startedAt = Date.now();
  const retentionPolicies = loadEnv()
    ? await getRetentionPolicies(getServerClient())
    : undefined;

  return async function teardown() {
    if (!loadEnv()) return;
    const client = getServerClient();

    const restoredPolicies = retentionPolicies
      ? await restoreRetentionPolicies(client, retentionPolicies)
      : [];

    const { leftovers, errors } = await findLeftovers(client, {
      // `includes`: guest user ids are rewritten to `guest-<uuid>-docs-test-...`.
      matches: (id) => id.includes(DOCS_TEST_PREFIX),
      channelsCreatedSince: new Date(startedAt - CLOCK_SKEW_MS),
    });
    if (errors.length) {
      console.warn(
        `[docs-snippets] end-of-run sweep could not scan:\n  ${errors.join('\n  ')}`,
      );
    }
    const fromThisRun = leftovers.filter((leftover) => {
      const time = createdAt(leftover);
      return time !== undefined && time.getTime() >= startedAt - CLOCK_SKEW_MS;
    });
    const problems: string[] = [];
    if (restoredPolicies.length) {
      problems.push(
        `[docs-snippets] DRIFT: this run changed retention policies (${restoredPolicies.join(', ')}). ` +
          `They have now been restored to what the app had when the run started.`,
      );
    }
    if (fromThisRun.length) {
      const failed = await removeLeftovers(fromThisRun);
      problems.push(
        `[docs-snippets] LEAK: this run left resources behind that no per-file leak check ` +
          `caught (usually a test file that failed while loading). They have now been removed` +
          `${failed.length ? `, except ${failed.length} that failed - run \`yarn test:docs:sweep\`` : ''}:\n` +
          describeLeftovers(fromThisRun),
      );
    }
    if (problems.length) throw new Error(problems.join('\n'));
  };
}
