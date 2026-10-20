import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type {
  ChannelResponse,
  QueryChannelsResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage } from '../../../helpers/server';

const CHANNEL_COUNT = 12;

const client = getServerClient();
const thierryId = uniqueId('thierry');
const otherId = uniqueId('other');
const channelIds = Array.from({ length: CHANNEL_COUNT }, () =>
  uniqueId('query-channel'),
);
const cids = channelIds.map((id) => `messaging:${id}`);

const cleanup = new Cleanup(client);

// Setup and two regions run at module level: inside a test, the extra indentation
// makes prettier wrap `{ filter_conditions: { type: "messaging" } }`, and the sync
// check keeps that wrapping, so those regions would no longer match the one-line
// docs fences. Everything is registered on `cleanup` before it is created.
cleanup.users.push(thierryId, otherId);
cleanup.channels.push(...cids);
await client.upsertUsers([thierryId, otherId].map((id) => ({ id })));
for (const id of channelIds) {
  await client.chat.channel('messaging', id).getOrCreate({
    data: {
      created_by_id: otherId,
      members: [{ user_id: thierryId }, { user_id: otherId }],
    },
  });
}
// Messages in sequence, so `last_message_at` orders the channels.
for (const cid of cids) {
  await sendServerMessage(client, cid, { text: 'hi', user_id: otherId });
}

const channelCID = cids[0];
const userID = thierryId;
const userId = thierryId;

// #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Filter Best Practices" tab="Node.js" index=1
// Most performant: filter by CID
await client.chat.queryChannels({ filter_conditions: { cid: channelCID } });

// Recommended for social messaging
await client.chat.queryChannels({
  filter_conditions: { type: 'messaging', members: { $in: [userID] } },
});

// Not recommended: type alone
await client.chat.queryChannels({ filter_conditions: { type: 'messaging' } });
// #endregion snippet
const filterBestPracticesRan = true;

// #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Bad Pattern: Overly Broad or Complex Filters" tab="Node.js" index=1
// ❌ BAD: Type-only filter (too broad)
await client.chat.queryChannels({ filter_conditions: { type: 'messaging' } });

// ❌ BAD: Deep nesting of logical operators
await client.chat.queryChannels({
  filter_conditions: {
    $and: [
      { $or: [{ frozen: true }, { disabled: true }] },
      { $or: [{ hidden: true }, { muted: true }] },
    ],
  },
  user_id: userId,
});
// #endregion snippet
const badPatternsRan = true;

describe('chat/_default/03-channels/02-query_channels.md', () => {
  const idsOf = (response: QueryChannelsResponse) =>
    response.channels
      .map((c) => c.channel)
      .filter((c): c is ChannelResponse => c !== undefined)
      .map((c) => c.id);

  afterAll(() => cleanup.run());

  /** Channel ids, most recent message first. */
  const byLastMessage = () => [...channelIds].reverse();

  it('queries channels', async () => {
    // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="" tab="Node.js" index=1
    // COPY: thierryId="thierry"
    const response = await client.chat.queryChannels({
      filter_conditions: { type: 'messaging', members: { $in: [thierryId] } },
      sort: [{ field: 'last_message_at', direction: -1 }],
      limit: 15,
    });
    // #endregion snippet

    expect(idsOf(response)).toEqual(byLastMessage());
  });

  it('filters messaging channels by member', async () => {
    // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Messaging and Team Channels" tab="Node.js" index=1
    // COPY: thierryId="thierry"
    // In the Node SDK the filter goes under `filter_conditions`.
    const response = await client.chat.queryChannels({
      filter_conditions: { members: { $in: [thierryId] }, type: 'messaging' },
    });
    // #endregion snippet

    // Default limit: 10 of the user's 12 channels.
    expect(idsOf(response)).toHaveLength(10);
    expect(channelIds).toEqual(expect.arrayContaining(idsOf(response)));
  });

  it('paginates', async () => {
    // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Pagination" tab="Node.js" index=1
    // COPY: thierryId="thierry"
    // Get channels 11-30
    const response = await client.chat.queryChannels({
      filter_conditions: { members: { $in: [thierryId] } },
      sort: [{ field: 'last_message_at', direction: -1 }],
      limit: 20,
      offset: 10,
    });
    // #endregion snippet

    expect(idsOf(response)).toEqual(byLastMessage().slice(10));
  });

  it('runs the filter best practices queries', async () => {
    // The region ran at module level (see the top of the file). It has no
    // results to check, so check that the CID filter form finds the channel.
    expect(filterBestPracticesRan).toBe(true);
    const { channels } = await client.chat.queryChannels({
      filter_conditions: { cid: channelCID },
    });
    expect(channels.map((c) => c.channel?.cid)).toEqual([channelCID]);
  });

  it('sorts by last_message_at', async () => {
    const userID = thierryId;

    // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Sort Best Practices" tab="Node.js" index=1
    // The Node SDK takes an array of explicit field/direction pairs.
    const response = await client.chat.queryChannels({
      filter_conditions: { type: 'messaging', members: { $in: [userID] } },
      sort: [{ field: 'last_message_at', direction: -1 }],
    });
    // #endregion snippet

    expect(idsOf(response)).toEqual(byLastMessage().slice(0, 10));
  });

  it('uses a selective filter with indexed fields', async () => {
    const userId = thierryId;
    const thirtyDaysAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).toISOString();

    // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Good Pattern: Selective Filter with Indexed Fields" tab="Node.js" index=1
    // ✅ GOOD: Selective filter using indexed fields
    const response = await client.chat.queryChannels({
      filter_conditions: {
        type: 'messaging',
        members: { $in: [userId] },
        last_message_at: { $gte: thirtyDaysAgo },
      },
      sort: [{ field: 'last_message_at', direction: -1 }],
      limit: 20,
    });
    // #endregion snippet

    expect(idsOf(response)).toEqual(byLastMessage());
  });

  it('runs the overly broad and complex filters', () => {
    // The region ran at module level (see the top of the file): the API accepted both filters.
    expect(badPatternsRan).toBe(true);
  });

  describe('predefined filters', () => {
    const filterName = uniqueId('user_messaging_channels');

    beforeAll(async () => {
      await client.chat.createPredefinedFilter({
        name: filterName,
        operation: 'QueryChannels',
        filter: { type: 'messaging', members: { $in: ['{{user_id}}'] } },
      });
      cleanup.add(() =>
        client.chat.deletePredefinedFilter({ name: filterName }),
      );
    });

    it('uses a predefined filter in production', async () => {
      const userId = thierryId;

      // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Using Predefined Filters in Production" tab="Node.js" index=1
      // COPY: filterName="user_messaging_channels"
      // Production-ready: use a predefined filter
      // `filter_conditions` is ignored when `predefined_filter` is set.
      const response = await client.chat.queryChannels({
        predefined_filter: filterName,
        filter_values: { user_id: userId },
        sort: [{ field: 'last_message_at', direction: -1 }],
        limit: 20,
      });
      // #endregion snippet

      expect(idsOf(response)).toEqual(byLastMessage());
    });

    it('uses a predefined filter', async () => {
      const user123 = thierryId;

      // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Using Predefined Filters" tab="Node.js" index=1
      // COPY: filterName="user_messaging_channels", user123="user123"
      // `filter_conditions` is ignored when `predefined_filter` is set.
      const response = await client.chat.queryChannels({
        predefined_filter: filterName,
        filter_values: { user_id: user123 },
        sort: [{ field: 'last_message_at', direction: -1 }],
        limit: 20,
      });
      // #endregion snippet

      expect(idsOf(response)).toEqual(byLastMessage());
    });
  });

  it('uses a simple, selective filter', async () => {
    const userId = thierryId;
    const thirtyDaysAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).toISOString();

    // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Query Complexity" tab="Node.js" index=1
    // RECOMMENDED: simple, selective filter with indexed fields
    const response = await client.chat.queryChannels({
      filter_conditions: {
        type: 'messaging',
        members: { $in: [userId] },
        last_message_at: { $gte: thirtyDaysAgo },
      },
    });
    // #endregion snippet

    // Default limit: 10 of the user's 12 channels.
    expect(idsOf(response)).toHaveLength(10);
    expect(channelIds).toEqual(expect.arrayContaining(idsOf(response)));
  });

  it('paginates with a members filter', async () => {
    const userId = thierryId;

    // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Pagination Best Practices" tab="Node.js" index=1
    // Efficient pagination with members filter
    const response = await client.chat.queryChannels({
      filter_conditions: { type: 'messaging', members: { $in: [userId] } },
      sort: [{ field: 'last_message_at', direction: -1 }],
      limit: 20,
    });
    // #endregion snippet

    expect(idsOf(response)).toEqual(byLastMessage());
  });

  describe('hidden and muted channels', () => {
    // A user of its own with three channels: one hidden, one muted, one plain.
    const listerId = uniqueId('lister');
    const hiddenId = uniqueId('hidden-channel');
    const mutedId = uniqueId('muted-channel');
    const plainId = uniqueId('plain-channel');
    const hiddenCid = `messaging:${hiddenId}`;
    const mutedCid = `messaging:${mutedId}`;
    const plainCid = `messaging:${plainId}`;

    beforeAll(async () => {
      cleanup.users.push(listerId);
      cleanup.channels.push(hiddenCid, mutedCid, plainCid);
      await client.upsertUsers([{ id: listerId }]);
      for (const id of [hiddenId, mutedId, plainId]) {
        await client.chat.channel('messaging', id).getOrCreate({
          data: {
            created_by_id: otherId,
            members: [{ user_id: listerId }, { user_id: otherId }],
          },
        });
      }
      await client.chat
        .channel('messaging', hiddenId)
        .hide({ user_id: listerId });
      await client.chat.muteChannel({
        channel_cids: [mutedCid],
        user_id: listerId,
      });
    });

    const sorted = (ids: string[]) => [...ids].sort();

    it("lists a user's hidden and visible channels", async () => {
      const userID = listerId;

      // Without the hidden filter, the hidden channel is left out.
      const visible = await client.chat.queryChannels({
        filter_conditions: { type: 'messaging', members: { $in: [userID] } },
        user_id: userID,
      });
      expect(sorted(idsOf(visible))).toEqual(sorted([mutedId, plainId]));

      // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Listing a User's Channels" tab="Node.js" index=1
      const response = await client.chat.queryChannels({
        filter_conditions: {
          type: 'messaging',
          members: { $in: [userID] },
          $or: [{ hidden: true }, { hidden: false }],
        },
        user_id: userID,
      });
      // #endregion snippet

      // The docs say this also returns the hidden channel, but the API leaves it out
      // without a top-level `cid` filter.
      expect(sorted(idsOf(response))).toEqual(sorted([mutedId, plainId]));
    });

    it('queries channels by id within the user membership', async () => {
      const userID = listerId;
      const cids = [hiddenCid, plainCid];

      // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Filtering by Member Data" tab="Node.js" index=1
      const response = await client.chat.queryChannels({
        filter_conditions: {
          cid: { $in: cids },
          members: { $in: [userID] },
          $or: [{ hidden: true }, { hidden: false }],
        },
        user_id: userID,
      });
      // #endregion snippet

      expect(sorted(idsOf(response))).toEqual(sorted([hiddenId, plainId]));
    });

    it('combines the id list with muted channels', async () => {
      const userID = listerId;
      // The hidden channel is in the list, to check the hidden filter.
      const cids = [hiddenCid];

      // #region snippet docs="chat/_default/03-channels/02-query_channels.md" heading="Filtering by Member Data" tab="Node.js" index=2
      const response = await client.chat.queryChannels({
        filter_conditions: {
          members: { $in: [userID] },
          $and: [
            { $or: [{ cid: { $in: cids } }, { muted: true }] },
            { $or: [{ hidden: true }, { hidden: false }] },
          ],
        },
        user_id: userID,
      });
      // #endregion snippet

      // The docs say the hidden channel in `cids` is returned too, but inside `$and`
      // the hidden filter has no effect.
      expect(sorted(idsOf(response))).toEqual([mutedId]);
    });
  });
});
