import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  addActivityOnce,
  isFeedGroupMissing,
  retryOnFeedGroupMissing,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/14-best_practices/04-hot-feed-cache.md';

/**
 * Hot feed cache is enabled by Stream support per app and feed, and a cached read looks
 * like a normal one (the page: "Transparent fallback"), so the test can't tell whether a
 * read was cached. It shows the fence's paginated read with the same `external_ranking`
 * on both pages: the external data changes the order, and page 2 continues page 1.
 */
describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('External ranking', async () => {
    const systemId = uniqueId('system');
    cleanup.users.push(systemId);
    await client.upsertUsers([{ id: systemId }]);

    // A ranked feed group whose score uses the fence's external data.
    const groupId = uniqueId('ranked');
    cleanup.feedGroups.push(groupId);
    await client.feeds.createFeedGroup({
      id: groupId,
      ranking: {
        type: 'expression',
        score:
          'popularity * external.popularity_multiplier + share_count * external.share_multiplier',
        defaults: {
          external: { popularity_multiplier: 1, share_multiplier: 1 },
        },
      },
    });
    const fid = `${groupId}:${systemId}`;
    cleanup.feeds.push(fid);
    const feed = client.feeds.feed(groupId, systemId);
    await retry(() => feed.getOrCreate({ user_id: systemId }), {
      retryIf: isFeedGroupMissing,
    });

    // `shared` is older but shared once (on the user's own `user` feed), so it ranks
    // above the newer `fresh` (score 3 + 100 vs 0).
    const shared = await addActivityOnce(client, {
      type: 'post',
      feeds: [fid],
      text: 'shared',
      user_id: systemId,
    });
    const fresh = await addActivityOnce(client, {
      type: 'post',
      feeds: [fid],
      text: 'fresh',
      user_id: systemId,
    });
    cleanup.feeds.push(`user:${systemId}`);
    await client.feeds.addActivity({
      type: 'post',
      feeds: [`user:${systemId}`],
      parent_id: shared,
      text: 'share',
      user_id: systemId,
    });
    // Wait for the share to count in the ranking.
    const external_ranking = {
      popularity_multiplier: 1,
      share_multiplier: 100,
    };
    await retry(async () => {
      const { activities } = await feed.getOrCreate({
        user_id: systemId,
        external_ranking,
      });
      expect(activities.map((a) => a.id)).toEqual([shared, fresh]);
    });

    const pageSize = 1;
    // Reads of a new group can still hit an API node that doesn't know it yet.
    retryOnFeedGroupMissing(client, ['getOrCreateFeed']);

    // #region snippet docs="activity-feeds/v3-latest/_default/14-best_practices/04-hot-feed-cache.md" heading="External ranking" tab="Node.js" index=1
    // COPY: systemId="system", pageSize=20
    // Server-side call (backend SDK / server token)
    // Page 1
    const page1 = await feed.getOrCreate({
      user_id: systemId,
      limit: pageSize,
      external_ranking: {
        popularity_multiplier: 1,
        share_multiplier: 100,
      },
    });

    // Page 2: pass the same external_ranking
    const page2 = await feed.getOrCreate({
      user_id: systemId,
      limit: pageSize,
      next: page1.next,
      external_ranking: {
        popularity_multiplier: 1,
        share_multiplier: 100,
      },
    });
    // #endregion snippet

    expect(page1.activities.map((a) => a.id)).toEqual([shared]);
    expect(typeof page1.next).toBe('string');
    expect(page2.activities.map((a) => a.id)).toEqual([fresh]);
  });
});
