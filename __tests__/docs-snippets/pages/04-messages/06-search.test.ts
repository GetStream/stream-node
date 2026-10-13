import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { sendServerMessage } from '../../helpers/server';
import { retry } from '../../helpers/wait';
import type { SearchPayload, SearchResponse } from '../../../../index';

const DOCS = '_default/04-messages/06-search.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const john = uniqueId('john');
  const channelId = uniqueId('my-channel');
  const cid = `messaging:${channelId}`;
  // Its own channel, so the first test's messages don't match the pagination search.
  const pageChannelId = uniqueId('my-channel');
  const pageCid = `messaging:${pageChannelId}`;

  /** Search is indexed asynchronously: retry until `payload` finds `count` messages. */
  const waitForSearch = (payload: SearchPayload, count: number) =>
    retry(async () => {
      const { results } = await client.chat.search({ payload });
      if (results.length < count) {
        throw new Error(`search found ${results.length} of ${count} messages`);
      }
    });

  const ids = (r: SearchResponse) => r.results.map((hit) => hit.message?.id);

  beforeAll(async () => {
    cleanup.users.push(john);
    await client.upsertUsers([{ id: john }]);
    for (const id of [channelId, pageChannelId]) {
      cleanup.channels.push(`messaging:${id}`);
      await client.chat.channel('messaging', id).getOrCreate({
        data: { created_by_id: john, members: [{ user_id: john }] },
      });
    }
  });

  afterAll(() => cleanup.run());

  it('searches messages', async () => {
    const exact = await sendServerMessage(client, cid, {
      text: 'supercalifragilisticexpialidocious',
      user_id: john,
    });
    const withAttachment = await sendServerMessage(client, cid, {
      text: 'superb picture',
      user_id: john,
      attachments: [
        {
          type: 'image',
          image_url: 'https://example.com/picture.jpg',
          custom: {},
        },
      ],
    });
    // Matches the autocomplete but has no attachment, so the message filter drops it.
    await sendServerMessage(client, cid, {
      text: 'superb text only',
      user_id: john,
    });
    const userId = john;
    await waitForSearch(
      {
        filter_conditions: { members: { $in: [userId] } },
        message_filter_conditions: { text: { $autocomplete: 'super' } },
      },
      3,
    );

    // #region snippet docs="_default/04-messages/06-search.md" heading="Searching Messages" tab="Node.js" index=1
    // COPY: userId="john"
    // Search for messages containing text
    const results = await client.chat.search({
      payload: {
        filter_conditions: { members: { $in: [userId] } },
        query: 'supercalifragilisticexpialidocious',
        limit: 10,
      },
    });

    // Search with message filters
    const filtered = await client.chat.search({
      payload: {
        filter_conditions: { members: { $in: [userId] } },
        message_filter_conditions: {
          text: { $autocomplete: 'super' },
          attachments: { $exists: true },
        },
        limit: 10,
      },
    });
    // #endregion snippet

    expect(ids(results)).toEqual([exact.id]);
    expect(ids(filtered)).toEqual([withAttachment.id]);
  });

  it('paginates search results', async () => {
    const channelCid = pageCid;
    const pageSize = 1;
    // Three matches and a page size of 1, so there is a next and a previous page.
    const sent: string[] = [];
    for (const n of [1, 2, 3]) {
      const m = await sendServerMessage(client, pageCid, {
        text: `supercali page ${n}`,
        user_id: john,
        custom: { my_custom_field: n },
      });
      sent.push(m.id);
    }
    await waitForSearch(
      {
        filter_conditions: { cid: channelCid },
        message_filter_conditions: {
          text: { $autocomplete: 'supercali' },
          id: { $in: sent },
        },
      },
      3,
    );

    // #region snippet docs="_default/04-messages/06-search.md" heading="Pagination" tab="Node.js" index=1
    // COPY: channelCid="messaging:my-channel", pageSize=10
    const channelFilters = { cid: channelCid };
    const messageFilters = { text: { $autocomplete: 'supercali' } };

    // First page with custom sorting
    const page1 = await client.chat.search({
      payload: {
        filter_conditions: channelFilters,
        message_filter_conditions: messageFilters,
        sort: [
          { field: 'relevance', direction: -1 },
          { field: 'updated_at', direction: 1 },
          { field: 'my_custom_field', direction: -1 },
        ],
        limit: pageSize,
      },
    });

    // Next page using cursor
    const page2 = await client.chat.search({
      payload: {
        filter_conditions: channelFilters,
        message_filter_conditions: messageFilters,
        limit: pageSize,
        next: page1.next,
      },
    });

    // Previous page
    const page1Again = await client.chat.search({
      payload: {
        filter_conditions: channelFilters,
        message_filter_conditions: messageFilters,
        limit: pageSize,
        next: page2.previous,
      },
    });
    // #endregion snippet

    expect(page1.results).toHaveLength(1);
    expect(page1.next).toBeTruthy();
    expect(page2.results).toHaveLength(1);
    expect(page2.previous).toBeTruthy();
    expect(ids(page2)).not.toEqual(ids(page1));
    expect(ids(page1Again)).toEqual(ids(page1));
    for (const id of [...ids(page1), ...ids(page2)]) {
      expect(sent).toContain(id);
    }
  });
});
