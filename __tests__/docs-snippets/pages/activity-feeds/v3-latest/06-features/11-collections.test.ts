import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { AddActivityResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/11-collections.md';

/**
 * Collections are app-level objects (not removed with a user or feed) and the leak check
 * doesn't scan them: every collection gets a `uniqueId` name and id, cleanup deletes
 * every ref the file created, and `afterAll` checks that none of the names is left.
 */
describe(DOCS, () => {
  const client = getServerClient();
  // The "Upserting Collections" fence calls the server client `serverClient`.
  const serverClient = client;
  const cleanup = new Cleanup(client);

  const names: string[] = [];
  const refs: string[] = [];

  /** A `uniqueId` collection name / id pair (not created), registered for cleanup. */
  const newCollection = (name = uniqueId('movies')) => {
    const id = uniqueId('lotr');
    if (!names.includes(name)) names.push(name);
    refs.push(`${name}:${id}`);
    return { name, id, ref: `${name}:${id}` };
  };

  /** Creates a collection with the page's movie data. */
  const createCollection = async (collection = newCollection()) => {
    await client.feeds.createCollections({
      collections: [
        {
          name: collection.name,
          id: collection.id,
          custom: { title: 'Lord of the Rings', genre: 'fantasy', rating: 9 },
        },
      ],
    });
    return collection;
  };

  const readCollection = async (ref: string) =>
    (await client.feeds.readCollections({ collection_refs: [ref] }))
      .collections;

  let jackId: string;

  beforeAll(async () => {
    cleanup.add(async () => {
      if (refs.length > 0)
        await client.feeds.deleteCollections({ collection_refs: refs });
    });
    jackId = uniqueId('jack');
    cleanup.users.push(jackId);
    cleanup.feeds.push(`user:${jackId}`);
    await client.upsertUsers([{ id: jackId }]);
  });

  afterEach(() => vi.restoreAllMocks());

  afterAll(async () => {
    await cleanup.run();
    // Leak check for collections (not covered by setup.ts).
    if (names.length === 0) return;
    const { collections } = await client.feeds.queryCollections({
      filter: { name: { $in: names } },
      limit: 100,
    });
    if (collections.length > 0) {
      await client.feeds.deleteCollections({
        collection_refs: collections.map((c) => `${c.name}:${c.id}`),
      });
      throw new Error(
        `LEAK: collections ${collections.map((c) => `${c.name}:${c.id}`).join(', ')}`,
      );
    }
  });

  it('Creating Collections', async () => {
    const { name: collectionName, id: collectionId, ref } = newCollection();

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Creating Collections" tab="Node.js" index=1
    // COPY: collectionName="movies", collectionId="lord_of_the_rings"
    const response = await client.feeds.createCollections({
      collections: [
        {
          name: collectionName,
          id: collectionId,
          custom: {
            title: 'Lord of the Rings',
            genre: 'fantasy',
            rating: 9,
          },
        },
      ],
    });
    // #endregion snippet

    const expected = {
      name: collectionName,
      id: collectionId,
      custom: { title: 'Lord of the Rings', genre: 'fantasy', rating: 9 },
    };
    expect(response.collections).toMatchObject([expected]);
    expect(await readCollection(ref)).toMatchObject([expected]);
  });

  it('Updating Collections', async () => {
    const {
      name: collectionName,
      id: collectionId,
      ref,
    } = await createCollection();

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Updating Collections" tab="Node.js" index=1
    // COPY: collectionName="movies", collectionId="lord_of_the_rings"
    const response = await client.feeds.updateCollections({
      collections: [
        {
          name: collectionName,
          id: collectionId,
          custom: {
            title: 'Lord of the Rings',
            genre: 'fantasy',
            rating: 9.5,
          },
        },
      ],
    });
    // #endregion snippet

    expect(response.collections).toMatchObject([
      { name: collectionName, id: collectionId, custom: { rating: 9.5 } },
    ]);
    expect(await readCollection(ref)).toMatchObject([
      { custom: { title: 'Lord of the Rings', genre: 'fantasy', rating: 9.5 } },
    ]);
  });

  it('Upserting Collections', async () => {
    // A collection that doesn't exist yet: the upsert creates it.
    const { name: collectionName, id: collectionId, ref } = newCollection();
    expect(await readCollection(ref)).toEqual([]);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Upserting Collections" tab="Node.js" index=1
    // COPY: collectionName="movies", collectionId="lord_of_the_rings"
    const response = await serverClient.feeds.upsertCollections({
      collections: [
        {
          name: collectionName,
          id: collectionId,
          custom: {
            title: 'Lord of the Rings',
            genre: 'fantasy',
            rating: 9.5,
          },
        },
      ],
    });
    // #endregion snippet

    expect(response.collections).toMatchObject([
      { name: collectionName, id: collectionId, custom: { rating: 9.5 } },
    ]);
    expect(await readCollection(ref)).toMatchObject([
      { custom: { title: 'Lord of the Rings', genre: 'fantasy', rating: 9.5 } },
    ]);

    // An existing collection: the same upsert updates it.
    await client.feeds.upsertCollections({
      collections: [
        { name: collectionName, id: collectionId, custom: { rating: 8 } },
      ],
    });
    expect(await readCollection(ref)).toMatchObject([
      { custom: { rating: 8 } },
    ]);
  });

  it('Deleting Collections', async () => {
    const { ref: collectionRef } = await createCollection();
    expect(await readCollection(collectionRef)).toHaveLength(1);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Deleting Collections" tab="Node.js" index=1
    // COPY: collectionRef="movies:lord_of_the_rings"
    const response = await client.feeds.deleteCollections({
      collection_refs: [collectionRef],
    });
    // #endregion snippet

    expect(typeof response.duration).toBe('string');
    expect(await readCollection(collectionRef)).toEqual([]);
  });

  it('Reading Collections', async () => {
    const { name, id, ref: collectionRef } = await createCollection();

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Reading Collections" tab="Node.js" index=1
    // COPY: collectionRef="movies:lord_of_the_rings"
    const response = await client.feeds.readCollections({
      collection_refs: [collectionRef],
    });
    // #endregion snippet

    expect(response.collections).toMatchObject([
      {
        name,
        id,
        custom: { title: 'Lord of the Rings', genre: 'fantasy', rating: 9 },
      },
    ]);
  });

  it('Query Collections', async () => {
    const collectionName = uniqueId('movies');
    // Created oldest first: ascending created_at returns them in this order.
    const first = await createCollection(newCollection(collectionName));
    const second = await createCollection(newCollection(collectionName));

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Query Collections" tab="Node.js" index=1
    // COPY: collectionName="movies"
    const response = await client.feeds.queryCollections({
      filter: {
        name: collectionName,
      },
      sort: [{ field: 'created_at', direction: 1 }],
      limit: 25,
    });
    // #endregion snippet

    expect(response.collections.map((c) => c.id)).toEqual([
      first.id,
      second.id,
    ]);
    expect(response.next).toBeUndefined();
  });

  it('Adding Collections to an Activity', async () => {
    const { ref: collectionRef } = await createCollection();
    const jackFeed = `user:${jackId}`;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Adding Collections to an Activity" tab="Node.js" index=1
    // COPY: jackFeed="user:jack", jackId="jack", collectionRef="movies:lord_of_the_rings"
    const response = await client.feeds.addActivity({
      type: 'post',
      feeds: [jackFeed],
      text: 'I love this movie!',
      user_id: jackId,
      collection_refs: [collectionRef],
    });
    // #endregion snippet

    expect(response.activity).toMatchObject({
      text: 'I love this movie!',
      user: { id: jackId },
      collections: {
        [collectionRef]: {
          status: 'ok',
          custom: { title: 'Lord of the Rings', genre: 'fantasy', rating: 9 },
        },
      },
    });
  });

  it('Enrichment', async () => {
    const {
      name: collectionName,
      id: collectionId,
      ref: collectionRef,
    } = newCollection();
    const jackFeed = `user:${jackId}`;
    const addActivity = vi.spyOn(client.feeds, 'addActivity');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/11-collections.md" heading="Enrichment" tab="Node.js" index=1
    // COPY: collectionName="movies", collectionId="lord_of_the_rings", jackFeed="user:jack", jackId="jack", collectionRef="movies:lord_of_the_rings"
    // Create a collection
    await client.feeds.createCollections({
      collections: [
        {
          name: collectionName,
          id: collectionId,
          custom: {
            title: 'Lord of the Rings',
            genre: 'fantasy',
            rating: 9,
          },
        },
      ],
    });

    // Add the reference to an activity
    const feed = client.feeds.feed('user', jackId);
    await client.feeds.addActivity({
      type: 'post',
      feeds: [jackFeed],
      text: 'I love this movie!',
      collection_refs: [collectionRef],
      user_id: jackId,
    });

    // Read the feed and see the enriched collection data
    const response = await feed.getOrCreate({ user_id: jackId });
    console.log(response);
    /*
    {
        "activities": [
            {
                "type": "post",
                "text": "I love this movie!",
                "collections": {
                    "movies:lord_of_the_rings": {
                        "name": "movies",
                        "id": "lord_of_the_rings",
                        "custom": {
                            "title": "Lord of the Rings",
                            "genre": "fantasy",
                            "rating": 9
                        },
                        "user_id": "jack",
                        "created_at": "2025-01-01T00:00:00.000Z",
                        "updated_at": "2025-01-01T00:00:00.000Z",
                        "status": "ok"
                    }
                }
            }
        ],
        ...
    }
    */
    // #endregion snippet

    const { activity } = await (addActivity.mock.results[0]
      .value as Promise<AddActivityResponse>);
    expect(log.mock.calls).toEqual([[response]]);
    const read = response.activities.find((a) => a.id === activity.id);
    expect(read).toMatchObject({
      type: 'post',
      text: 'I love this movie!',
      collections: {
        [collectionRef]: {
          name: collectionName,
          id: collectionId,
          custom: { title: 'Lord of the Rings', genre: 'fantasy', rating: 9 },
          status: 'ok',
        },
      },
    });
  });
});
