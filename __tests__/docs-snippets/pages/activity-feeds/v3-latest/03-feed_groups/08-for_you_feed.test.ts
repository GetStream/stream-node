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
    // addActivity into the new stock group can still answer "Feed group ... not
    // found" from some API nodes after waitForFeedGroup (2026-11-05). Retry it
    // like addActivityOnce: with an explicit id, only while it isn't stored.
    const addActivity = client.feeds.addActivity.bind(client.feeds);
    vi.spyOn(client.feeds, 'addActivity').mockImplementation((request) => {
      const id = request.id ?? uniqueId('activity');
      return retry(
        async () => {
          try {
            return await addActivity({ ...request, id });
          } catch (error) {
            const stored = await client.feeds
              .getActivity({ id })
              .catch(() => undefined);
            if (!stored) throw error;
            return stored;
          }
        },
        { retryIf: isFeedGroupMissing },
      );
    });

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

  it('explains why an activity is in the feed', async () => {
    // Reasons are only returned on the app's built-in `foryou` group (read only
    // here): the reader gets a uniqueId feed in it that follows an author whose
    // activity matches the reader's interest.
    const readerId = await createUser('reader');
    const authorId = await createUser('author');
    const authorFid = await createFeed('user', authorId, authorId);
    await createFeed('foryou', readerId, readerId);
    await client.feeds.follow({
      source: `foryou:${readerId}`,
      target: authorFid,
    });
    await client.feeds.upsertUserInterests({
      user_id: readerId,
      interests: [{ tag: 'nba' }],
    });
    await client.feeds.addActivity({
      feeds: [authorFid],
      type: 'post',
      text: 'what a game',
      interest_tags: ['nba'],
      user_id: authorId,
    });
    // The follow and the new activity reach the feed within a few seconds.
    await retry(async () => {
      const { activities } = await client.feeds
        .feed('foryou', readerId)
        .getOrCreate({ user_id: readerId });
      if (!activities.length) throw new Error('foryou feed still empty');
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/08-for_you_feed.md" heading="Why am I seeing this" tab="Node.js" index=1
    // COPY: readerId="jack"
    const feed = client.feeds.feed('foryou', readerId);
    const response = await feed.getOrCreate({
      user_id: readerId,
      enrichment_options: { include_reasons: true },
    });

    console.log(response.activities[0].reasons); // ["popular", "interest:nba"]
    // #endregion snippet

    expect(response.activities[0].text).toBe('what a game');
    expect(response.activities[0].reasons).toEqual([
      'following',
      'interest:nba',
    ]);
    expect(log.mock.calls[0]).toEqual([['following', 'interest:nba']]);
  });
});
