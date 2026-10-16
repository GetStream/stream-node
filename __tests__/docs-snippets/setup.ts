import { afterAll, beforeAll } from 'vitest';
import './env';
import { getServerClient } from './helpers/clients';
import { mintedIds, runId } from './helpers/ids';
import {
  describeLeftovers,
  findLeftovers,
  removeLeftovers,
} from './helpers/leaks';
import { diffAppSnapshots, takeAppSnapshot } from './helpers/snapshot';
import type { AppSnapshot } from './helpers/snapshot';
import { retry } from './helpers/wait';

// These hooks are registered before the test file's own hooks, so `afterAll` below
// runs after the file's cleanup (vitest runs after-hooks in reverse order).

let snapshot: AppSnapshot | undefined;

beforeAll(async () => {
  snapshot = await takeAppSnapshot(getServerClient());
});

afterAll(async () => {
  const serverClient = getServerClient();

  let leakError: Error | undefined;

  // Leak check: everything this file created through `uniqueId` must be gone.
  if (mintedIds.size) {
    const filter = {
      matches: (id: string) => mintedIds.has(id) || id.includes(runId),
      channelIds: [...mintedIds],
    };
    let scan = await findLeftovers(serverClient, filter);
    if (scan.leftovers.length) {
      // Deletes are eventually consistent: only report what is still there after a while.
      let latest = scan;
      await retry(
        async () => {
          latest = await findLeftovers(serverClient, filter);
          if (latest.leftovers.length) throw new Error('leftovers still there');
        },
        { timeout: 15000, interval: 3000 },
      ).catch(() => undefined);
      scan = latest;
    }
    if (scan.errors.length) {
      console.warn(
        `[docs-snippets] leak check could not scan:\n  ${scan.errors.join('\n  ')}`,
      );
    }
    if (scan.leftovers.length) {
      // Thrown at the end, together with a possible drift error.
      const failed = await removeLeftovers(scan.leftovers);
      leakError = new Error(
        `[docs-snippets] LEAK: this test file left resources behind (they have now been removed` +
          `${failed.length ? `, except ${failed.length} that failed - run \`yarn test:docs:sweep\`` : ''}).\n` +
          `Register them on \`Cleanup\` (cleanup.users / channels / channelTypes, or cleanup.add(...)):\n` +
          describeLeftovers(scan.leftovers),
      );
    }
  }

  // App-level drift: settings a test changed must be restored (cleanup.add). Pages are
  // run one at a time, so any drift was caused by this file.
  let driftError: Error | undefined;
  if (snapshot) {
    const drift = diffAppSnapshots(
      snapshot,
      await takeAppSnapshot(serverClient),
    );
    if (drift.length) {
      driftError = new Error(
        `[docs-snippets] DRIFT: app settings changed by this file were not restored. Save the original values and restore them with cleanup.add(...):\n  ${drift.join('\n  ')}`,
      );
    }
  }

  if (leakError && driftError) {
    throw new AggregateError(
      [leakError, driftError],
      `${leakError.message}\n\n${driftError.message}`,
    );
  }
  const error = leakError ?? driftError;
  if (error) throw error;
});
