import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { isFeedGroupMissing } from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { waitForAppSetting } from '../../../../helpers/server';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md';

// The docs use both names for the server client.
const client = getServerClient();
const serverClient = client;
const cleanup = new Cleanup(client);

/**
 * `activity_metrics_config` is absent on the test app. `updateApp({ activity_metrics_config: {} })`
 * leaves `{}` behind (DRIFT), and the generated `UpdateAppRequest` has no `| null`, so the
 * restore sends `null` with a raw request, which removes the setting again.
 */
const restoreMetricsConfig = async (original?: Record<string, number>) => {
  await client.apiClient.sendRequest(
    'PATCH',
    '/api/v2/app',
    undefined,
    undefined,
    { activity_metrics_config: original ?? null },
  );
  await waitForAppSetting(client, 'activity_metrics_config', original);
};

describe(DOCS, () => {
  let authorId: string;
  let originalConfig: Record<string, number> | undefined;

  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A new activity in the author's user feed; returns its id. */
  const createActivity = async (text = 'setup') => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${authorId}`],
      type: 'post',
      text,
      user_id: authorId,
    });
    return activity.id;
  };

  beforeAll(async () => {
    originalConfig = (await client.getApp()).app.activity_metrics_config;
    authorId = await createUser('author');
    cleanup.feeds.push(`user:${authorId}`);
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('tracks metrics', async () => {
    const activityId = await createActivity();
    const userId = await createUser('viewer');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Tracking Metrics" tab="Node.js" index=1
    // COPY: activityId="activity_123", userId="user_456"
    const response = await client.feeds.trackActivityMetrics({
      events: [
        { activity_id: activityId, metric: 'views' },
        { activity_id: activityId, metric: 'clicks', delta: 2 },
      ],
      user_id: userId,
    });

    for (const result of response.results) {
      console.log(
        `${result.activity_id}/${result.metric}: allowed=${result.allowed}`,
      );
    }
    // #endregion snippet

    expect(response.results).toMatchObject([
      { activity_id: activityId, metric: 'views', allowed: true },
      { activity_id: activityId, metric: 'clicks', allowed: true },
    ]);
    expect(log.mock.calls).toEqual([
      [`${activityId}/views: allowed=true`],
      [`${activityId}/clicks: allowed=true`],
    ]);
  });

  it('tracks metrics for several activities in one request', async () => {
    const activity1 = await createActivity('one');
    const activity2 = await createActivity('two');
    const activity3 = await createActivity('three');
    const userId = await createUser('viewer');
    const track = vi.spyOn(client.feeds, 'trackActivityMetrics');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Batching" tab="Node.js" index=1
    // COPY: activity1="activity_1", activity2="activity_2", activity3="activity_3", userId="user_456"
    // Track metrics for multiple activities in one request (server-side)
    const response = await client.feeds.trackActivityMetrics({
      events: [
        { activity_id: activity1, metric: 'views' },
        { activity_id: activity1, metric: 'clicks' },
        { activity_id: activity2, metric: 'views' },
        { activity_id: activity3, metric: 'impressions', delta: 5 },
      ],
      user_id: userId,
    });
    // #endregion snippet

    expect(track).toHaveBeenCalledTimes(1);
    // Each event gets its own result, in request order.
    expect(response.results).toMatchObject([
      { activity_id: activity1, metric: 'views', allowed: true },
      { activity_id: activity1, metric: 'clicks', allowed: true },
      { activity_id: activity2, metric: 'views', allowed: true },
      { activity_id: activity3, metric: 'impressions', allowed: true },
    ]);
  });

  it('checks the allowed field', async () => {
    const activityId = await createActivity();
    const userId = await createUser('viewer');
    // Use up this user's hourly "views" limit (10) on the activity, so the
    // region's event is rate limited. The absolute delta counts against it.
    const setup = await client.feeds.trackActivityMetrics({
      events: [{ activity_id: activityId, metric: 'views', delta: 10 }],
      user_id: userId,
    });
    expect(setup.results[0].allowed).toBe(true);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Rate Limiting" tab="Node.js" index=1
    // COPY: activityId="activity_123", userId="user_456"
    const response = await client.feeds.trackActivityMetrics({
      events: [{ activity_id: activityId, metric: 'views' }],
      user_id: userId,
    });

    for (const result of response.results) {
      if (!result.allowed) {
        console.log(`Rate limited: ${result.activity_id}/${result.metric}`);
      }
    }
    // #endregion snippet

    // A rate-limited event is not an error, just `allowed: false`.
    expect(response.results).toMatchObject([
      { activity_id: activityId, metric: 'views', allowed: false },
    ]);
    expect(log.mock.calls).toEqual([[`Rate limited: ${activityId}/views`]]);
  });

  it('reads metrics from an activity', async () => {
    const activityId = await createActivity();
    const userId = await createUser('viewer');
    await client.feeds.trackActivityMetrics({
      events: [{ activity_id: activityId, metric: 'views' }],
      user_id: userId,
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Reading Metrics" tab="Node.js" index=1
    // COPY: activityId="activity_123"
    // metrics is available on any activity response
    const { activity } = await client.feeds.getActivity({ id: activityId });
    console.log(activity.metrics);
    // { views: 42, clicks: 15, impressions: 200 }
    // #endregion snippet

    expect(activity.id).toBe(activityId);
    expect(log).toHaveBeenCalledWith(activity.metrics);
    // Metrics are synced to the database every 5 minutes, so the view tracked
    // above isn't there yet: `metrics` is absent until the first sync.
    expect(
      activity.metrics === undefined || typeof activity.metrics === 'object',
    ).toBe(true);
  });

  it('ranks a feed group by metrics', async () => {
    const trendingId = uniqueId('trending');
    cleanup.feedGroups.push(trendingId);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Using Metrics in Ranking" tab="Node.js" index=1
    // COPY: trendingId="trending"
    // Create a feed group ranked by engagement metrics
    const response = await serverClient.feeds.createFeedGroup({
      id: trendingId,
      ranking: {
        type: 'expression',
        score: 'metrics.views * 2 + metrics.clicks * 3',
        defaults: {
          metrics: {
            views: 0,
            clicks: 0,
          },
        },
      },
      activity_selectors: [{ type: 'following' }],
    });
    // #endregion snippet

    expect(response.feed_group).toMatchObject({
      id: trendingId,
      ranking: {
        type: 'expression',
        score: 'metrics.views * 2 + metrics.clicks * 3',
      },
    });

    // A feed in the group that follows the author ranks the author's
    // activities (none has metrics yet, so the defaults apply).
    const activityId = await createActivity('ranked');
    const readerId = await createUser('reader');
    cleanup.feeds.push(`${trendingId}:${readerId}`);
    const feed = client.feeds.feed(trendingId, readerId);
    await retry(() => feed.getOrCreate({ user_id: readerId }), {
      retryIf: isFeedGroupMissing,
    });
    await retry(
      () =>
        client.feeds.follow({
          source: feed.feed,
          target: `user:${authorId}`,
        }),
      { retryIf: isFeedGroupMissing },
    );
    const read = await retry(async () => {
      const result = await feed.getOrCreate({ user_id: readerId });
      if (!result.activities.some((a) => a.id === activityId)) {
        throw new Error('activity not in the ranked feed yet');
      }
      return result;
    });
    expect(read.activities.map((a) => a.id)).toContain(activityId);
  });

  it('configures custom metrics', async () => {
    cleanup.add(() => restoreMetricsConfig(originalConfig));
    const activityId = await createActivity();
    const userId = await createUser('viewer');
    const updateApp = vi.spyOn(client, 'updateApp');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Custom Metrics Configuration" tab="Node.js" index=1
    // Add custom metrics and override the default "views" limit (server-side)
    await client.updateApp({
      activity_metrics_config: {
        shares: 5, // new custom metric: 5 per hour per user per activity
        saves: 10, // new custom metric: 10 per hour
        views: 20, // override default views limit from 10 to 20
        impressions: 0, // disable the default impressions metric
      },
    });
    // #endregion snippet

    const custom = { shares: 5, saves: 10, views: 20, impressions: 0 };
    expect(updateApp).toHaveBeenCalledTimes(1);
    await waitForAppSetting(client, 'activity_metrics_config', custom);

    {
      // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Custom Metrics Configuration" tab="Node.js" index=2
      const app = await client.getApp();
      console.log(app.app.activity_metrics_config);
      // { shares: 5, saves: 10, views: 20, impressions: 0 }
      // #endregion snippet

      expect(app.app.activity_metrics_config).toEqual(custom);
      expect(log).toHaveBeenCalledWith(custom);
    }

    // The new metric counts, the disabled default is rejected.
    const tracked = await retry(async () => {
      const result = await client.feeds.trackActivityMetrics({
        events: [
          { activity_id: activityId, metric: 'shares' },
          { activity_id: activityId, metric: 'impressions' },
        ],
        user_id: userId,
      });
      if (!result.results[0].allowed) throw new Error('config not applied');
      return result;
    });
    expect(tracked.results).toMatchObject([
      { metric: 'shares', allowed: true },
      { metric: 'impressions', allowed: false },
    ]);
    expect(tracked.results[1].error).toContain('impressions');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/05-activity-metrics.md" heading="Custom Metrics Configuration" tab="Node.js" index=3
    await client.updateApp({ activity_metrics_config: {} });
    // #endregion snippet

    expect(updateApp).toHaveBeenCalledTimes(2);
    // The docs say an empty config clears every custom override, but
    // `updateApp` merges `activity_metrics_config` into the stored one, so `{}`
    // changes nothing (2026-10-16). Only a raw `null` (not allowed by the
    // generated types) removes it, which is what the restore below does.
    await waitForAppSetting(client, 'activity_metrics_config', custom);
    const after = await client.feeds.trackActivityMetrics({
      events: [{ activity_id: activityId, metric: 'impressions' }],
      user_id: userId,
    });
    expect(after.results).toMatchObject([
      { metric: 'impressions', allowed: false },
    ]);

    await restoreMetricsConfig(originalConfig);
  });
});
