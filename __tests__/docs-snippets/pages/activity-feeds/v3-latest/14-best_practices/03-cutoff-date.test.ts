import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { CreateFeedGroupResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { addActivityOnce, isFeedGroupMissing } from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/14-best_practices/03-cutoff-date.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('How to set a cutoff', async () => {
    // Feed groups are app-wide: the docs' group gets a uniqueId id.
    const teamUpdates = uniqueId('team-updates');
    cleanup.feedGroups.push(teamUpdates);
    const createFeedGroup = vi.spyOn(client.feeds, 'createFeedGroup');

    // #region snippet docs="activity-feeds/v3-latest/_default/14-best_practices/03-cutoff-date.md" heading="How to set a cutoff" tab="Node.js" index=1
    // COPY: teamUpdates="team_updates"
    // Bound a filtered current_feed scan to the last 14 days.
    await client.feeds.createFeedGroup({
      id: teamUpdates,
      activity_selectors: [
        {
          type: 'current_feed',
          filter: {
            search_data: { $contains: { category: 'announcement' } },
          },
          cutoff_window: '14d',
        },
      ],
    });
    // #endregion snippet

    const { feed_group } = await (createFeedGroup.mock.results[0]
      .value as Promise<CreateFeedGroupResponse>);
    expect(feed_group.id).toBe(teamUpdates);
    expect(feed_group.activity_selectors).toMatchObject([
      {
        type: 'current_feed',
        filter: { search_data: { $contains: { category: 'announcement' } } },
        cutoff_window: '14d',
      },
    ]);

    // The filtered selector returns only the announcement.
    const userId = uniqueId('author');
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    const fid = `${teamUpdates}:${userId}`;
    cleanup.feeds.push(fid);
    const feed = client.feeds.feed(teamUpdates, userId);
    await retry(() => feed.getOrCreate({ user_id: userId }), {
      retryIf: isFeedGroupMissing,
    });
    const announcement = await addActivityOnce(client, {
      type: 'post',
      feeds: [fid],
      text: 'Office closed on Friday',
      search_data: { category: 'announcement' },
      user_id: userId,
    });
    await addActivityOnce(client, {
      type: 'post',
      feeds: [fid],
      text: 'Lunch?',
      search_data: { category: 'chat' },
      user_id: userId,
    });
    const read = await retry(
      async () => {
        const response = await feed.getOrCreate({ user_id: userId });
        const ids = response.activities.map((a) => a.id);
        if (ids.length !== 1) throw new Error(`got ${ids.join(', ')}`);
        return ids;
      },
      { retryIf: () => true },
    );
    expect(read).toEqual([announcement]);
  });
});
