import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type {
  CreateFeedViewResponse,
  GetOrCreateFeedResponse,
  ListFeedViewsResponse,
  UpdateFeedViewResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import {
  isFeedGroupMissing,
  retryOnFeedGroupMissing,
} from '../../../../helpers/feeds';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/02-feed-views.md';

// The docs use both names for the server client.
const client = getServerClient();
const serverClient = client;
const cleanup = new Cleanup(client);

// Feed views are app-wide: every view gets a uniqueId id and is deleted in
// cleanup (a snippet may delete it first).
const newFeedViewId = (name: string) => {
  const id = uniqueId(name);
  cleanup.add(() =>
    client.feeds.deleteFeedView({ id }).catch((error: unknown) => {
      if (!String(error).includes('not found')) throw error;
    }),
  );
  return id;
};

// A new feed view isn't known to every API node right away ("feed view not
// found" / "Feed view with ID ... not found").
const createFeedView = async (name: string) => {
  const id = newFeedViewId(name);
  await client.feeds.createFeedView({
    id,
    activity_selectors: [{ type: 'following' }],
  });
  await retry(() => client.feeds.getFeedView({ id }), {
    retryIf: isFeedGroupMissing,
  });
  return id;
};

const createUser = async (name: string) => {
  const id = uniqueId(name);
  cleanup.users.push(id);
  await client.upsertUsers([{ id }]);
  return id;
};

describe(DOCS, () => {
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a feed view', async () => {
    const viewId = newFeedViewId('view');
    const create = vi.spyOn(client.feeds, 'createFeedView');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/02-feed-views.md" heading="When to use feed views" tab="Node.js" index=1
    // COPY: viewId="<view id>"
    await serverClient.feeds.createFeedView({
      id: viewId,
      activity_selectors: [
        {
          type: 'following',
        },
      ],
    });
    // #endregion snippet

    const { feed_view } = await (create.mock.results[0]
      .value as Promise<CreateFeedViewResponse>);
    expect(feed_view.id).toBe(viewId);
    expect(feed_view.activity_selectors?.map((s) => s.type)).toEqual([
      'following',
    ]);
    // Without `ranking` the view ranks by recency (the API rejects
    // `type: "recency"`).
    expect(feed_view.ranking).toBeUndefined();
  });

  it('reads a feed with a feed view', async () => {
    const viewId = await createFeedView('view');
    const userId = await createUser('reader');
    cleanup.feeds.push(`user:${userId}`);
    const feed = client.feeds.feed('user', userId);
    // Other API nodes may not know the view yet.
    retryOnFeedGroupMissing(client, ['getOrCreateFeed']);
    // The same spy: vi.spyOn returns the existing mock.
    const getOrCreate = vi.spyOn(client.feeds, 'getOrCreateFeed');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/02-feed-views.md" heading="When to use feed views" tab="Node.js" index=2
    // COPY: viewId="<id of a feed view>", userId="<user id>"
    await feed.getOrCreate({
      // Override the default view id
      view: viewId,
      user_id: userId,
    });
    // #endregion snippet

    expect(getOrCreate.mock.calls[0][0]).toMatchObject({ view: viewId });
    const response = await (getOrCreate.mock.results[0]
      .value as Promise<GetOrCreateFeedResponse>);
    expect(response.feed.feed).toBe(`user:${userId}`);
    vi.restoreAllMocks();
    // An unknown view id is rejected, so the request above used the view.
    await expect(
      feed.getOrCreate({ view: uniqueId('missing-view'), user_id: userId }),
    ).rejects.toMatchObject({ code: 16 });
  });

  it('lists feed views', async () => {
    const viewId = await createFeedView('listed');
    // The list is eventually consistent too: wait until it has the new view.
    await retry(async () => {
      const { views } = await client.feeds.listFeedViews();
      if (!views[viewId]) throw new Error('view not listed yet');
    });
    const list = vi.spyOn(client.feeds, 'listFeedViews');

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/02-feed-views.md" heading="List feed views" tab="Node.js" index=1
    await client.feeds.listFeedViews();
    // #endregion snippet

    const { views } = await (list.mock.results[0]
      .value as Promise<ListFeedViewsResponse>);
    expect(views[viewId]?.activity_selectors?.map((s) => s.type)).toEqual([
      'following',
    ]);
  });

  it('updates a feed view', async () => {
    const viewId = await createFeedView('to-update');
    // A new view isn't known to every API node right away (code 16 "... not found").
    const updateFeedView = client.feeds.updateFeedView.bind(client.feeds);
    const update = vi.spyOn(client.feeds, 'updateFeedView');
    update.mockImplementation((request) =>
      retry(() => updateFeedView(request), { retryIf: isFeedGroupMissing }),
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/02-feed-views.md" heading="Updating feed views" tab="Node.js" index=1
    // COPY: viewId="<view id to update>"
    await serverClient.feeds.updateFeedView({
      id: viewId,
      // Fields to update
    });
    // #endregion snippet

    const { feed_view } = await (update.mock.results[0]
      .value as Promise<UpdateFeedViewResponse>);
    expect(feed_view.id).toBe(viewId);
    // Updates replace every field: the omitted activity selectors are gone.
    expect(feed_view.activity_selectors ?? []).toEqual([]);
  });

  it('deletes a feed view', async () => {
    const viewId = await createFeedView('to-delete');
    const deleteFeedView = client.feeds.deleteFeedView.bind(client.feeds);
    const del = vi.spyOn(client.feeds, 'deleteFeedView');
    del.mockImplementation((request) =>
      retry(() => deleteFeedView(request), { retryIf: isFeedGroupMissing }),
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/02-feed-views.md" heading="Deleting feed views" tab="Node.js" index=1
    // COPY: viewId="view id to delete"
    await serverClient.feeds.deleteFeedView({
      id: viewId,
    });
    // #endregion snippet

    expect(del).toHaveBeenCalledTimes(1);
    vi.restoreAllMocks();
    // Deleting it again proves it is gone.
    await expect(
      client.feeds.deleteFeedView({ id: viewId }),
    ).rejects.toMatchObject({ code: 16, metadata: { responseCode: 404 } });
  });
});
