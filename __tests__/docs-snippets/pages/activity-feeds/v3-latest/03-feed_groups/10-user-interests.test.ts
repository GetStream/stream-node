import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS =
  'activity-feeds/v3-latest/_default/03-feed_groups/10-user-interests.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

// Interests are per user: they go away with the uniqueId user.
let aliceId: string;

describe(DOCS, () => {
  afterAll(() => cleanup.run());

  beforeAll(async () => {
    aliceId = uniqueId('alice');
    cleanup.users.push(aliceId);
    await client.upsertUsers([{ id: aliceId }]);
  });

  it('sets interests', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/10-user-interests.md" heading="Setting interests" tab="Node.js" index=1
    // COPY: aliceId="alice"
    const response = await client.feeds.upsertUserInterests({
      user_id: aliceId,
      interests: [
        { tag: 'cycling', weight: 0.8 },
        { tag: 'jazz' }, // weight defaults to 1.0
        { tag: 'golf', weight: -1.0 }, // a dislike
      ],
    });
    // #endregion snippet

    // The full list, by descending weight.
    expect(response.interests).toMatchObject([
      { tag: 'jazz', weight: 1, source: 'manual', count: 0 },
      { tag: 'cycling', weight: 0.8, source: 'manual', count: 0 },
      { tag: 'golf', weight: -1, source: 'manual', count: 0 },
    ]);
  });

  it('reads interests', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/10-user-interests.md" heading="Reading interests" tab="Node.js" index=1
    // COPY: aliceId="alice"
    const response = await client.feeds.getUserInterests({
      user_id: aliceId,
      limit: 20,
    });

    console.log(response.interests);
    // #endregion snippet

    expect(response.interests.map((i) => i.tag)).toEqual([
      'jazz',
      'cycling',
      'golf',
    ]);
  });

  it('removes interests', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/03-feed_groups/10-user-interests.md" heading="Removing interests" tab="Node.js" index=1
    // COPY: aliceId="alice"
    const response = await client.feeds.deleteUserInterests({
      user_id: aliceId,
      tags: ['cycling', 'jazz'],
    });
    // #endregion snippet

    expect(response.interests.map((i) => i.tag)).toEqual(['golf']);
    const { interests } = await client.feeds.getUserInterests({
      user_id: aliceId,
    });
    expect(interests.map((i) => i.tag)).toEqual(['golf']);
  });
});
