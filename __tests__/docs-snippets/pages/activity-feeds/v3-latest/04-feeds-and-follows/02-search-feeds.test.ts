import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { QueryFeedsResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { runId, uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/04-feeds-and-follows/02-search-feeds.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

/** A `user` feed with a uniqueId id, registered for cleanup (not created). */
const newFeedId = (name: string) => {
  const id = uniqueId(name);
  cleanup.feeds.push(`user:${id}`);
  return id;
};

const newUser = async (name: string, displayName?: string) => {
  const id = uniqueId(name);
  cleanup.users.push(id);
  await client.upsertUsers([{ id, name: displayName }]);
  return id;
};

const fids = (response: QueryFeedsResponse) =>
  response.feeds.map((f) => f.feed);

/** Results of every `queryFeeds` call made since the spy was installed. */
const queryResults = (spy: { mock: { results: Array<{ value: unknown }> } }) =>
  Promise.all(
    spy.mock.results.map((r) => r.value as Promise<QueryFeedsResponse>),
  );

describe(DOCS, () => {
  let ownerId: string;

  beforeAll(async () => {
    ownerId = await newUser('owner');
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('queries my feeds with pagination', async () => {
    const johnId = await newUser('john');
    const created = Array.from({ length: 12 }, () => newFeedId('johnfeed'));
    await client.feeds.createFeedsBatch({
      feeds: created.map((feed_id) => ({
        feed_group_id: 'user',
        feed_id,
        created_by_id: johnId,
      })),
    });
    const expected = created.map((id) => `user:${id}`).sort();
    // Wait until every feed is queryable, so the region sees them all.
    await retry(async () => {
      const all = await client.feeds.queryFeeds({
        filter: { created_by_id: johnId },
        limit: 25,
      });
      expect(fids(all).sort()).toEqual(expected);
    });

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/02-search-feeds.md" heading="Querying My Feeds" tab="Node.js" index=1
    // COPY: johnId="john"
    const firstPage = await client.feeds.queryFeeds({
      filter: {
        created_by_id: johnId,
      },
      limit: 10,
      sort: [{ field: 'created_at', direction: -1 }],
    });

    const secondPage = await client.feeds.queryFeeds({
      filter: {
        created_by_id: johnId,
      },
      limit: 10,
      sort: [{ field: 'created_at', direction: -1 }],
      next: firstPage.next,
    });
    // #endregion snippet

    expect(firstPage.feeds).toHaveLength(10);
    expect(firstPage.next).toBeTruthy();
    expect(secondPage.feeds).toHaveLength(2);
    expect([...fids(firstPage), ...fids(secondPage)].sort()).toEqual(expected);
    const times = [...firstPage.feeds, ...secondPage.feeds].map((f) =>
      f.created_at.getTime(),
    );
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });

  it('queries feeds where I am a member', async () => {
    const johnId = await newUser('john');
    const memberFeedId = newFeedId('memberfeed');
    const otherFeedId = newFeedId('otherfeed');
    await client.feeds.feed('user', memberFeedId).getOrCreate({
      user_id: ownerId,
      data: { members: [{ user_id: johnId }] },
    });
    await client.feeds.feed('user', otherFeedId).getOrCreate({
      user_id: ownerId,
    });
    await retry(async () => {
      const r = await client.feeds.queryFeeds({
        filter: { members: { $in: [johnId] } },
      });
      expect(fids(r)).toEqual([`user:${memberFeedId}`]);
    });
    const query = vi.spyOn(client.feeds, 'queryFeeds');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/02-search-feeds.md" heading="Querying Feeds Where I Am a Member" tab="Node.js" index=1
    // COPY: johnId="john"
    await client.feeds.queryFeeds({
      filter: {
        members: { $in: [johnId] },
      },
    });
    // #endregion snippet

    const [response] = await queryResults(query);
    expect(fids(response)).toEqual([`user:${memberFeedId}`]);
  });

  it('queries feeds by name or description', async () => {
    const token = `name${runId}`;
    const matchingId = newFeedId('sports');
    const privateId = newFeedId('sportsprivate');
    await client.feeds.feed('user', matchingId).getOrCreate({
      user_id: ownerId,
      data: {
        visibility: 'public',
        name: `Sports ${token}`,
        description: `tech news ${token}`,
      },
    });
    // Same name and description, but not public: must not be returned.
    await client.feeds.feed('user', privateId).getOrCreate({
      user_id: ownerId,
      data: {
        visibility: 'private',
        name: `Sports ${token}`,
        description: `tech news ${token}`,
      },
    });
    await retry(async () => {
      const r = await client.feeds.queryFeeds({
        filter: { name: { $q: token } },
      });
      expect(fids(r)).toHaveLength(2);
    });
    const query = vi.spyOn(client.feeds, 'queryFeeds');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/02-search-feeds.md" heading="Querying feeds by name or description" tab="Node.js" index=1
    await client.feeds.queryFeeds({
      filter: {
        visibility: { $eq: 'public' },
        name: { $q: 'Sports' },
      },
    });

    // search public feeds by description
    await client.feeds.queryFeeds({
      filter: {
        visibility: 'public',
        description: { $q: 'tech' },
      },
    });
    // #endregion snippet

    // The filters match the whole app: check the test's feeds are in the results.
    const [byName, byDescription] = await queryResults(query);
    for (const response of [byName, byDescription]) {
      expect(fids(response)).toContain(`user:${matchingId}`);
      expect(fids(response)).not.toContain(`user:${privateId}`);
      expect(response.feeds.every((f) => f.visibility === 'public')).toBe(true);
    }
    expect(byName.feeds.every((f) => /sports/i.test(f.name))).toBe(true);
    expect(byDescription.feeds.every((f) => /tech/i.test(f.description))).toBe(
      true,
    );
  });

  it('queries feeds by creator name', async () => {
    const thompsonId = await newUser('thompson', `Rick Thompson ${runId}`);
    const publicId = newFeedId('thompsonpublic');
    const privateId = newFeedId('thompsonprivate');
    await client.feeds.feed('user', publicId).getOrCreate({
      user_id: thompsonId,
      data: { visibility: 'public' },
    });
    await client.feeds.feed('user', privateId).getOrCreate({
      user_id: thompsonId,
      data: { visibility: 'private' },
    });
    await retry(async () => {
      const r = await client.feeds.queryFeeds({
        filter: { created_by_id: thompsonId },
      });
      expect(fids(r)).toHaveLength(2);
    });
    const query = vi.spyOn(client.feeds, 'queryFeeds');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/02-search-feeds.md" heading="Querying feeds by creator name" tab="Node.js" index=1
    // search public feeds created by users with 'Thompson' in their name
    await client.feeds.queryFeeds({
      filter: {
        visibility: 'public',
        'created_by.name': { $q: 'Thompson' },
      },
    });
    // #endregion snippet

    // The filter matches the whole app: check the test's feeds.
    const [response] = await queryResults(query);
    expect(fids(response)).toContain(`user:${publicId}`);
    expect(fids(response)).not.toContain(`user:${privateId}`);
    expect(
      response.feeds.every(
        (f) =>
          f.visibility === 'public' &&
          /thompson/i.test(f.created_by.name ?? ''),
      ),
    ).toBe(true);
  });

  it('runs the complex example', async () => {
    // A word only this test's feeds and users contain.
    const searchQuery = `query${runId}`;
    const creatorId = await newUser('creator', `Jane ${searchQuery}`);
    const byNameId = newFeedId('byname');
    const byDescriptionId = newFeedId('bydescription');
    const byCreatorId = newFeedId('bycreator');
    await client.feeds.feed('user', byNameId).getOrCreate({
      user_id: ownerId,
      data: { name: `Feed ${searchQuery}` },
    });
    await client.feeds.feed('user', byDescriptionId).getOrCreate({
      user_id: ownerId,
      data: { description: `About ${searchQuery}` },
    });
    await client.feeds.feed('user', byCreatorId).getOrCreate({
      user_id: creatorId,
    });
    const expected = [byNameId, byDescriptionId, byCreatorId]
      .map((id) => `user:${id}`)
      .sort();
    await retry(async () => {
      const r = await client.feeds.queryFeeds({
        filter: {
          $or: [
            { name: { $q: searchQuery } },
            { description: { $q: searchQuery } },
            { 'created_by.name': { $q: searchQuery } },
          ],
        },
      });
      expect(fids(r).sort()).toEqual(expected);
    });
    const query = vi.spyOn(client.feeds, 'queryFeeds');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/02-search-feeds.md" heading="A complex example" tab="Node.js" index=1
    await client.feeds.queryFeeds({
      filter: {
        group_id: 'user',
        $or: [
          { name: { $q: searchQuery } },
          { description: { $q: searchQuery } },
          { 'created_by.name': { $q: searchQuery } },
        ],
      },
    });
    // #endregion snippet

    const [response] = await queryResults(query);
    expect(fids(response).sort()).toEqual(expected);
  });
});
