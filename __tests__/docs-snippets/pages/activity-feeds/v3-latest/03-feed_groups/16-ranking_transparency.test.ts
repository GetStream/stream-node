import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  addActivityOnce,
  retryOnFeedGroupMissing,
  waitForFeedGroup,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/16-ranking_transparency.md';

describe(DOCS, () => {
  // The fence calls the server client `serverClient`.
  const client = getServerClient();
  const serverClient = client;
  const cleanup = new Cleanup(client);

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a non-personalized feed group', async () => {
    const chronologicalId = uniqueId('chronological');
    cleanup.feedGroups.push(chronologicalId);

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/16-ranking_transparency.md" heading="Non-personalized feed" tab="Node.js" index=1
    // COPY: chronologicalId="chronological"
    await serverClient.feeds.createFeedGroup({
      id: chronologicalId,
      activity_selectors: [{ type: 'following' }],
    });
    // #endregion snippet

    await waitForFeedGroup(client, chronologicalId);
    const { feed_group } = await client.feeds.getFeedGroup({
      id: chronologicalId,
    });
    expect(feed_group.activity_selectors?.map((s) => s.type)).toEqual([
      'following',
    ]);
    expect(feed_group.ranking).toBeUndefined();

    // Without a ranking the feed lists the followed activities newest first.
    retryOnFeedGroupMissing(client, ['getOrCreateFeed', 'follow']);
    const readerId = uniqueId('reader');
    const authorId = uniqueId('author');
    cleanup.users.push(readerId, authorId);
    await client.upsertUsers([{ id: readerId }, { id: authorId }]);
    const authorFid = `user:${authorId}`;
    const readerFid = `${chronologicalId}:${readerId}`;
    cleanup.feeds.push(authorFid, readerFid);
    await client.feeds
      .feed('user', authorId)
      .getOrCreate({ user_id: authorId });
    await client.feeds
      .feed(chronologicalId, readerId)
      .getOrCreate({ user_id: readerId });
    await client.feeds.follow({ source: readerFid, target: authorFid });
    for (const text of ['first', 'second']) {
      await addActivityOnce(client, {
        feeds: [authorFid],
        type: 'post',
        text,
        user_id: authorId,
      });
    }
    const texts = await retry(async () => {
      const { activities } = await client.feeds
        .feed(chronologicalId, readerId)
        .getOrCreate({ user_id: readerId });
      if (activities.length < 2) throw new Error('activities not there yet');
      return activities.map((a) => a.text);
    });
    expect(texts).toEqual(['second', 'first']);
  });
});
