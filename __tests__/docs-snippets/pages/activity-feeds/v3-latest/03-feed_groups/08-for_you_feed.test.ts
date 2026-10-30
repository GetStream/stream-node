import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  copyFeedGroup,
  isFeedGroupMissing,
  retryOnFeedGroupMissing,
  waitForFeedGroup,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/08-for_you_feed.md';

// The docs use both names for the server client.
const client = getServerClient();
const serverClient = client;
const cleanup = new Cleanup(client);

// Feed groups are app-wide: every group a test creates gets a uniqueId id.
const newFeedGroupId = (name: string) => {
  const id = uniqueId(name);
  cleanup.feedGroups.push(id);
  return id;
};

const createUser = async (name: string) => {
  const id = uniqueId(name);
  cleanup.users.push(id);
  await client.upsertUsers([{ id }]);
  return id;
};

/** Creates a feed (registered for cleanup) and returns its fid. */
const createFeed = async (group: string, id: string, userId: string) => {
  cleanup.feeds.push(`${group}:${id}`);
  await retry(
    () => client.feeds.feed(group, id).getOrCreate({ user_id: userId }),
    {
      retryIf: isFeedGroupMissing,
    },
  );
  return `${group}:${id}`;
};

// "jack" posts to his user feed, to "user:1" and to a "stock:apple" feed.
let jackId: string;
let oneFid: string;
let appleFid: string;

describe(DOCS, () => {
  beforeEach(() =>
    retryOnFeedGroupMissing(client, ['updateFeedGroup', 'getOrCreateFeed']),
  );
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  beforeAll(async () => {
    jackId = await createUser('jack');
    const oneId = await createUser('one');
    await createFeed('user', jackId, jackId);
    oneFid = await createFeed('user', oneId, oneId);
    const stockGroupId = newFeedGroupId('stock');
    await client.feeds.createFeedGroup({ id: stockGroupId });
    // The fence adds an activity into this group, and addActivity can't be retried.
    await waitForFeedGroup(client, stockGroupId);
    appleFid = await createFeed(stockGroupId, uniqueId('apple'), jackId);
  });

  it('creates an interest ranked feed group', async () => {
    // The built-in timeline group is app-wide: the fence runs on a uniqueId
    // group created with its settings.
    const { id: timelineId } = await copyFeedGroup(client, cleanup, 'timeline');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/08-for_you_feed.md" heading="Step 1 - Create a feed group" tab="Node.js" index=1
    // COPY: timelineId="timeline"
    const response = await serverClient.feeds.updateFeedGroup({
      id: timelineId,
      activity_selectors: [{ type: 'following' }, { type: 'popular' }],
      ranking: {
        type: 'interest',
        score:
          'interest_score * (popularity > 0 ? popularity : 1) * decay_exp(time)',
      },
      activity_processors: [{ type: 'text_interest_tags' }],
    });
    // #endregion snippet

    const { feed_group } = response;
    expect(feed_group.id).toBe(timelineId);
    expect(feed_group.ranking).toMatchObject({
      type: 'interest',
      score:
        'interest_score * (popularity > 0 ? popularity : 1) * decay_exp(time)',
    });
    expect(feed_group.activity_selectors?.map((s) => s.type)).toEqual([
      'following',
      'popular',
    ]);
    expect(feed_group.activity_processors?.map((p) => p.type)).toEqual([
      'text_interest_tags',
    ]);
  });

  it('adds activities with interest tags', async () => {
    // The built-in user group runs no activity processors on the test app
    // (2026-10-16), so the first activity gets no topics, despite the comment.
    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/08-for_you_feed.md" heading="Step 2 - Activities with interest tags" tab="Node.js" index=1
    // COPY: jackId="jack", oneFid="user:1", appleFid="stock:apple"
    const feed = client.feeds.feed('user', jackId);

    // since we've enabled the "text_topics" activity processor the "activity.interest_tags" will be automatically set
    const response = await client.feeds.addActivity({
      feeds: [feed.feed],
      type: 'post',
      text: 'apple stock will go up',
      user_id: jackId,
    });

    // you can also set this field manually
    const responseWithTags = await client.feeds.addActivity({
      feeds: [oneFid, appleFid],
      type: 'post',
      text: 'apple stock will go up',
      interest_tags: ['apple', 'stock'],
      user_id: jackId,
    });
    // #endregion snippet

    expect(response.activity.feeds).toEqual([`user:${jackId}`]);
    expect(responseWithTags.activity.interest_tags).toEqual(['apple', 'stock']);
    expect(responseWithTags.activity.feeds).toEqual([oneFid, appleFid]);
  });

  it('reads with interest weights', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/08-for_you_feed.md" heading="Step 3 - Reading the interest based ranked feed" tab="Node.js" index=1
    // COPY: jackId="jack"
    const interestWeights = {
      go: 1.0, // User loves Go
      python: 0.5, // User is ok with Python
      ruby: -1.0, // User dislikes Ruby
    };
    const feed = client.feeds.feed('user', jackId);
    const response = await feed.getOrCreate({
      limit: 10,
      interest_weights: interestWeights, // Merged with the user's stored interests for this request
      user_id: jackId,
    });
    // #endregion snippet

    expect(response.feed.feed).toBe(`user:${jackId}`);
    expect(response.activities.map((a) => a.text)).toEqual([
      'apple stock will go up',
    ]);
  });

  it('seeds interests at onboarding', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/08-for_you_feed.md" heading="Seeding interests at onboarding" tab="Node.js" index=1
    // COPY: jackId="jack"
    // Called from your backend once the user completes the onboarding questionnaire
    await client.feeds.upsertUserInterests({
      user_id: jackId,
      interests: [
        { tag: 'go' }, // weight defaults to 1.0
        { tag: 'python', weight: 0.5 },
        { tag: 'ruby', weight: -1.0 }, // a dislike is applied as a penalty in ranking
      ],
    });
    // #endregion snippet

    const { interests } = await client.feeds.getUserInterests({
      user_id: jackId,
    });
    expect(interests).toMatchObject([
      { tag: 'go', weight: 1, source: 'manual' },
      { tag: 'python', weight: 0.5, source: 'manual' },
      { tag: 'ruby', weight: -1, source: 'manual' },
    ]);
  });
});
