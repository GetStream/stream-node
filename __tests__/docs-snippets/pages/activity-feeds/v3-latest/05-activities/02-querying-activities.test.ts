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
  QueryActivitiesRequest,
  QueryActivitiesResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

/** Ids of the activities a query returns. */
const ids = (response: QueryActivitiesResponse) =>
  response.activities.map((a) => a.id);

/** Queries until the result contains every id in `expected` (search is eventually consistent). */
const queryUntilFound = (request: QueryActivitiesRequest, expected: string[]) =>
  retry(async () => {
    const response = await client.feeds.queryActivities(request);
    expect(ids(response)).toEqual(expect.arrayContaining(expected));
    return response;
  });

/** Awaits the results of a spied `queryActivities`. */
const spiedResults = (spy: { mock: { results: { value: unknown }[] } }) =>
  Promise.all(
    spy.mock.results.map((r) => r.value as Promise<QueryActivitiesResponse>),
  );

describe(DOCS, () => {
  let userId: string;
  let fid: string;

  /** Adds an activity by the owner to the owner's `user` feed and returns its id. */
  const createActivity = async (
    extra: Partial<Parameters<typeof client.feeds.addActivity>[0]> = {},
  ) => {
    const { activity } = await client.feeds.addActivity({
      feeds: [fid],
      type: 'post',
      text: 'setup',
      user_id: userId,
      ...extra,
    });
    return activity.id;
  };

  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  beforeAll(async () => {
    userId = await createUser('owner');
    fid = `user:${userId}`;
    cleanup.feeds.push(fid);
    await client.feeds.feed('user', userId).getOrCreate({ user_id: userId });
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('queries activities', async () => {
    const activityId = await createActivity();
    await queryUntilFound({ filter: { id: activityId } }, [activityId]);
    const query = vi.spyOn(client.feeds, 'queryActivities');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="Examples" tab="Node.js" index=1
    await client.feeds.queryActivities({
      filter: {
        activity_type: 'post',
      },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 10,
    });
    // #endregion snippet

    const [response] = await spiedResults(query);
    expect(response.activities.length).toBeGreaterThan(0);
    expect(response.activities.length).toBeLessThanOrEqual(10);
    expect(response.activities.every((a) => a.type === 'post')).toBe(true);
    // Newest first: the activity just created comes first.
    expect(response.activities[0].id).toBe(activityId);
    const times = response.activities.map((a) => a.created_at);
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });

  it('queries activities by text', async () => {
    const matchId = await createActivity({ text: 'popularity contest' });
    const otherId = await createActivity({ text: 'something else' });
    await queryUntilFound(
      { filter: { user_id: userId, text: { $q: 'popularity' } } },
      [matchId],
    );
    const query = vi.spyOn(client.feeds, 'queryActivities');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="Querying activities by text" tab="Node.js" index=1
    await client.feeds.queryActivities({
      filter: {
        text: {
          $q: 'popularity',
        },
      },
    });
    // #endregion snippet

    const [response] = await spiedResults(query);
    expect(ids(response)).toContain(matchId);
    expect(ids(response)).not.toContain(otherId);
  });

  it('queries activities by search data', async () => {
    const mallId = await createActivity({
      text: 'Check out our spring sale!',
      search_data: {
        campaign: {
          id: 'spring-sale-2025',
          location: { mall: 'yorkdale', city: 'toronto', country: 'canada' },
        },
      },
    });
    const onlineId = await createActivity({
      text: 'Spring sale online',
      search_data: { campaign: { id: 'spring-sale-2025' } },
    });
    await queryUntilFound(
      {
        filter: {
          user_id: userId,
          search_data: { $contains: { campaign: { id: 'spring-sale-2025' } } },
        },
      },
      [mallId, onlineId],
    );
    const query = vi.spyOn(client.feeds, 'queryActivities');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="Querying activities by search data" tab="Node.js" index=1
    await client.feeds.queryActivities({
      filter: {
        search_data: { $contains: { campaign: { id: 'spring-sale-2025' } } },
      },
    });

    await client.feeds.queryActivities({
      filter: {
        search_data: { $path_exists: 'campaign.location.mall' },
      },
    });
    // #endregion snippet

    const [byCampaign, byMall] = await spiedResults(query);
    expect(ids(byCampaign)).toEqual(expect.arrayContaining([mallId, onlineId]));
    expect(ids(byMall)).toContain(mallId);
    expect(ids(byMall)).not.toContain(onlineId);
  });

  it('queries private activities', async () => {
    const privateId = await createActivity({
      text: 'private',
      visibility: 'private',
    });
    await queryUntilFound(
      { include_private_activities: true, filter: { id: privateId } },
      [privateId],
    );
    // Without the flag the private activity isn't returned.
    const without = await client.feeds.queryActivities({
      filter: { id: privateId },
    });
    expect(ids(without)).toEqual([]);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="Querying private activities" tab="Node.js" index=1
    const response = await client.feeds.queryActivities({
      include_private_activities: true,
      filter: {
        // your filter here
      },
    });
    // #endregion snippet

    // An empty filter matches the whole app; the newest activity comes first.
    expect(ids(response)).toContain(privateId);
  });

  it('queries soft-deleted activities', async () => {
    const deletedId = await createActivity({ text: 'deleted' });
    await client.feeds.deleteActivity({ id: deletedId, hard_delete: false });
    await queryUntilFound(
      { include_soft_deleted_activities: true, filter: { id: deletedId } },
      [deletedId],
    );
    const without = await client.feeds.queryActivities({
      filter: { id: deletedId },
    });
    expect(ids(without)).toEqual([]);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="Querying soft-deleted activities" tab="Node.js" index=1
    const response = await client.feeds.queryActivities({
      include_soft_deleted_activities: true,
      filter: {
        // your filter here
      },
    });
    // #endregion snippet

    const deleted = response.activities.find((a) => a.id === deletedId);
    expect(deleted?.deleted_at).toEqual(expect.any(Number));
  });

  it('queries moderated activities', async () => {
    // A feed whose test-owned policy removes activities with a blocked word.
    const blockedWord = 'frobnicate';
    const blocklist = uniqueId('blocklist');
    await client.createBlockList({ name: blocklist, words: [blockedWord] });
    cleanup.add(() => client.deleteBlockList({ name: blocklist }));
    const policy = uniqueId('policy');
    cleanup.add(() =>
      client.moderation
        .deleteConfig({ key: policy })
        .catch((error: unknown) => {
          if (!String(error).includes('not found')) throw error;
        }),
    );
    await retry(
      () =>
        client.moderation.upsertConfig({
          key: policy,
          block_list_config: { rules: [{ name: blocklist, action: 'remove' }] },
        }),
      { retryIf: (error) => String(error).includes('Blocklist not found') },
    );
    const moderatedFeedId = uniqueId('moderated');
    cleanup.feeds.push(`user:${moderatedFeedId}`);
    const moderatedFeed = client.feeds.feed('user', moderatedFeedId);
    await moderatedFeed.getOrCreate({ user_id: userId });
    await moderatedFeed.update({ custom: { moderation_policy: policy } });

    const removedActivityId = await retry(async () => {
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${moderatedFeedId}`],
        text: `you ${blockedWord}`,
        user_id: userId,
        force_moderation: true,
      });
      expect(activity.moderation?.action).toBe('remove');
      return activity.id;
    });
    const normalActivityId = await createActivity({ text: 'normal' });
    await queryUntilFound(
      {
        include_moderated_activities: true,
        filter: { id: { $in: [removedActivityId, normalActivityId] } },
      },
      [removedActivityId, normalActivityId],
    );
    const without = await client.feeds.queryActivities({
      filter: { id: { $in: [removedActivityId, normalActivityId] } },
    });
    expect(ids(without)).toEqual([normalActivityId]);

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="Querying moderated activities" tab="Node.js" index=1
    // COPY: removedActivityId="activity_123", normalActivityId="activity_456"
    const response = await client.feeds.queryActivities({
      include_moderated_activities: true,
      filter: {
        id: { $in: [removedActivityId, normalActivityId] },
      },
    });
    // #endregion snippet

    expect([...ids(response)].sort()).toEqual(
      [removedActivityId, normalActivityId].sort(),
    );
    const removed = response.activities.find((a) => a.id === removedActivityId);
    expect(removed?.moderation_action).toBe('remove');
  });

  it('queries activities as a user', async () => {
    const john = await createUser('john');
    const privateId = await createActivity({
      text: 'private for john',
      visibility: 'private',
    });
    await queryUntilFound(
      { include_private_activities: true, filter: { id: privateId } },
      [privateId],
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="`user_id` for server-side requests" tab="Node.js" index=1
    // COPY: john="john"
    const response = await client.feeds.queryActivities({
      user_id: john,
      filter: {
        // your filter here
      },
    });
    // #endregion snippet

    // A client-side request: another user's private activity isn't returned.
    expect(response.activities.length).toBeGreaterThan(0);
    expect(ids(response)).not.toContain(privateId);
  });

  it('combines filters with $and', async () => {
    const bothId = await createActivity({
      text: 'both',
      filter_tags: ['green', 'orange'],
    });
    const greenId = await createActivity({
      text: 'green',
      filter_tags: ['green'],
    });

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/02-querying-activities.md" heading="`$contains` on custom fields" tab="Node.js" index=1
    // Get all the activities where filter tags contain both "green" and "orange"
    const filter = {
      $and: [{ filter_tags: ['green'] }, { filter_tags: ['orange'] }],
    };
    // #endregion snippet

    const response = await queryUntilFound(
      { filter: { $and: [filter, { user_id: userId }] } },
      [bothId],
    );
    expect(ids(response)).toEqual([bothId]);
    expect(ids(response)).not.toContain(greenId);
  });
});
