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
  ChangeFeedVisibilityResponse,
  SingleFollowResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/04-feeds-and-follows/05-changing-feed-visibility.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  let ownerId: string;
  let followerId: string;

  beforeAll(async () => {
    ownerId = uniqueId('owner');
    followerId = uniqueId('follower');
    cleanup.users.push(ownerId, followerId);
    await client.upsertUsers([{ id: ownerId }, { id: followerId }]);
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('changes the visibility of a feed', async () => {
    const jackId = uniqueId('jack');
    const jackFid = `user:${jackId}`;
    const timelineFid = `timeline:${followerId}`;
    cleanup.feeds.push(jackFid, timelineFid);
    await client.feeds.feed('user', jackId).getOrCreate({ user_id: ownerId });
    await client.feeds
      .feed('timeline', followerId)
      .getOrCreate({ user_id: followerId });

    // After the first change (to `followers`), a follow request comes in, so the
    // second change has a pending follow to process.
    const follows: SingleFollowResponse[] = [];
    const original = client.feeds.changeFeedVisibility.bind(client.feeds);
    const change = vi
      .spyOn(client.feeds, 'changeFeedVisibility')
      .mockImplementation(async (request) => {
        // A change right after another fails while the first is reconciled (code 4
        // "a visibility change is already in progress for this feed").
        const response = await retry(() => original(request), {
          retryIf: (error) => String(error).includes('already in progress'),
        });
        if (request.visibility === 'followers') {
          // Until the change is applied, a follow is still accepted at once: undo
          // it and retry until the follow request stays pending.
          follows.push(
            await retry(async () => {
              const follow = await client.feeds.follow({
                source: timelineFid,
                target: jackFid,
              });
              if (follow.follow.status !== 'pending') {
                await client.feeds.unfollow({
                  source: timelineFid,
                  target: jackFid,
                });
                throw new Error(`follow is ${follow.follow.status}`);
              }
              return follow;
            }),
          );
        }
        return response;
      });

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/05-changing-feed-visibility.md" heading="Examples" tab="Node.js" index=1
    // COPY: jackId="jack"
    const feed = client.feeds.feed('user', jackId);

    await feed.changeFeedVisibility({
      visibility: 'followers',
    });

    // Process pending follow requests while loosening from followers
    await feed.changeFeedVisibility({
      visibility: 'visible',
      pending_follows_action: 'auto_approve',
    });
    // #endregion snippet

    // The follow request was pending on the `followers` feed.
    expect(follows.map((f) => f.follow.status)).toEqual(['pending']);
    const [toFollowers, toVisible] = await Promise.all(
      change.mock.results.map(
        (r) => r.value as Promise<ChangeFeedVisibilityResponse>,
      ),
    );
    expect(toFollowers.feed.visibility).toBe('followers');
    expect(toVisible.feed.visibility).toBe('visible');
    // Loosening with `auto_approve` accepts it (reconciled in the background).
    await retry(async () => {
      const { follows: current } = await client.feeds.queryFollows({
        filter: { source_feed: timelineFid, target_feed: jackFid },
      });
      expect(current.map((f) => f.status)).toEqual(['accepted']);
    });
  });
});
