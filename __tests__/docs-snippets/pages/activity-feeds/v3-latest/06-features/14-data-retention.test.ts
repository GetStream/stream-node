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
  FeedsRetentionPolicy,
  SetFeedsRetentionPolicyResponse,
  StreamClient,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/06-features/14-data-retention.md';

/** The app's feeds retention policies, without server-managed fields. */
const policyConfigs = (policies: FeedsRetentionPolicy[]) =>
  policies
    .map((p) => ({ policy: p.policy, config: p.config }))
    .sort((a, b) => a.policy.localeCompare(b.policy));

/**
 * The `enabled` flag of `feedsGetRetentionPolicy` is eventually consistent (reads can
 * return the old value for ~6s after a change, while `policies` is up to date at once):
 * waits until 5 reads in a row return `expected`.
 */
const waitForRetentionEnabled = async (
  client: StreamClient,
  expected: boolean,
) => {
  let streak = 0;
  await retry(
    async () => {
      const { enabled } = await client.feeds.feedsGetRetentionPolicy();
      streak = enabled === expected ? streak + 1 : 0;
      if (streak < 5) {
        throw new Error(`retention enabled is ${enabled}, want ${expected}`);
      }
    },
    { interval: 500, timeout: 30000 },
  );
};

/**
 * Puts back the original feeds retention policies (and the enabled flag) and deletes
 * every policy the file added. Feeds retention policies are app-level and not part of
 * the leak / drift checks.
 */
const restoreFeedsRetention = async (
  client: StreamClient,
  original: { enabled: boolean; policies: FeedsRetentionPolicy[] },
) => {
  const { policies: current } = await client.feeds.feedsGetRetentionPolicy();
  for (const p of current) {
    if (!original.policies.some((o) => o.policy === p.policy)) {
      await client.feeds.feedsDeleteRetentionPolicy({ policy: p.policy });
    }
  }
  for (const p of original.policies) {
    await client.feeds.feedsSetRetentionPolicy({
      policy: p.policy,
      max_age_hours: p.config.max_age_hours,
      feed_groups: p.config.feed_groups,
      enabled: original.enabled,
    });
  }
};

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // The docs' own policy name ("stories"); the feed group stays the built-in `stories`.
  const storiesPolicy = uniqueId('stories');

  /** The `enabled` flag of each `feedsSetRetentionPolicy` response so far. */
  const setResponses = async (spy: {
    mock: { results: Array<{ value: unknown }> };
  }) =>
    (
      await Promise.all(
        spy.mock.results.map(
          (r) => r.value as Promise<SetFeedsRetentionPolicyResponse>,
        ),
      )
    ).map((r) => r.enabled);

  const getPolicy = async (name: string) =>
    (await client.feeds.feedsGetRetentionPolicy()).policies.find(
      (p) => p.policy === name,
    );

  beforeAll(async () => {
    const original = await client.feeds.feedsGetRetentionPolicy();
    cleanup.add(async () => {
      await restoreFeedsRetention(client, original);
      // Check that the app is back to where it started.
      const { policies } = await client.feeds.feedsGetRetentionPolicy();
      expect(policyConfigs(policies)).toEqual(policyConfigs(original.policies));
      await waitForRetentionEnabled(client, original.enabled);
    });
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('sets the app-wide retention policy', async () => {
    const set = vi.spyOn(client.feeds, 'feedsSetRetentionPolicy');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/14-data-retention.md" heading="Setting a retention policy" tab="Node.js" index=1
    // Delete all activities older than one year (8,760 hours)
    await client.feeds.feedsSetRetentionPolicy({
      policy: 'old-activities',
      max_age_hours: 8760,
    });
    // #endregion snippet

    const policy = await getPolicy('old-activities');
    expect(policy?.config.max_age_hours).toBe(8760);
    expect(policy?.config.feed_groups ?? []).toEqual([]);
    // Setting a policy turns retention on.
    expect(await setResponses(set)).toEqual([true]);
    await waitForRetentionEnabled(client, true);
  });

  it('sets a retention policy for some feed groups', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/14-data-retention.md" heading="Setting a retention policy" tab="Node.js" index=2
    // COPY: storiesPolicy="stories"
    // Delete activities posted to stories feeds after 30 days (720 hours)
    await client.feeds.feedsSetRetentionPolicy({
      policy: storiesPolicy,
      max_age_hours: 720,
      feed_groups: ['stories'],
    });
    // #endregion snippet

    const policy = await getPolicy(storiesPolicy);
    expect(policy?.config).toEqual({
      max_age_hours: 720,
      feed_groups: ['stories'],
    });
  });

  it('pauses retention', async () => {
    await waitForRetentionEnabled(client, true);
    const set = vi.spyOn(client.feeds, 'feedsSetRetentionPolicy');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/14-data-retention.md" heading="Pausing retention" tab="Node.js" index=1
    await client.feeds.feedsSetRetentionPolicy({
      policy: 'old-activities',
      max_age_hours: 8760,
      enabled: false,
    });
    // #endregion snippet

    expect(await setResponses(set)).toEqual([false]);
    await waitForRetentionEnabled(client, false);
    const response = await client.feeds.feedsGetRetentionPolicy();
    // Pausing keeps the policies.
    expect(response.policies.map((p) => p.policy)).toEqual(
      expect.arrayContaining(['old-activities', storiesPolicy]),
    );
  });

  it('retrieves retention policies', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/14-data-retention.md" heading="Retrieving retention policies" tab="Node.js" index=1
    const response = await client.feeds.feedsGetRetentionPolicy();
    console.log(response.enabled);
    console.log(response.policies);
    // [
    //   { policy: "old-activities", config: { max_age_hours: 8760 }, enabled_at: "..." },
    //   { policy: "stories", config: { max_age_hours: 720, feed_groups: ["stories"] }, enabled_at: "..." }
    // ]
    // #endregion snippet

    expect(response.enabled).toBe(false);
    const stories = response.policies.find((p) => p.policy === storiesPolicy);
    expect(stories?.config).toEqual({
      max_age_hours: 720,
      feed_groups: ['stories'],
    });
    expect(typeof stories?.enabled_at).toBe('number');
  });

  it('deletes a retention policy', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/14-data-retention.md" heading="Deleting a retention policy" tab="Node.js" index=1
    // COPY: storiesPolicy="stories"
    await client.feeds.feedsDeleteRetentionPolicy({ policy: storiesPolicy });
    // #endregion snippet

    expect(await getPolicy(storiesPolicy)).toBeUndefined();
    expect(await getPolicy('old-activities')).toBeDefined();
  });

  it('queries the cleanup run history', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/14-data-retention.md" heading="Viewing cleanup run history" tab="Node.js" index=1
    // COPY: storiesPolicy="stories"
    const response = await client.feeds.feedsGetRetentionPolicyRuns({
      filter_conditions: { policy: { $eq: storiesPolicy } },
      sort: [{ field: 'date', direction: -1 }],
      limit: 10,
    });

    console.log(response.runs);
    // [
    //   {
    //     app_pk: 12345,
    //     policy: "stories",
    //     date: "2026-10-20",
    //     stats: { activities_deleted: 15420 }
    //   }
    // ]
    // #endregion snippet

    // A new policy's first cleanup runs after its 24-hour grace period.
    expect(Array.isArray(response.runs)).toBe(true);
    for (const run of response.runs) expect(run.policy).toBe(storiesPolicy);
  });
});
