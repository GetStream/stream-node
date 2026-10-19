import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { nsToDate } from '../../../../../index';
import type { MembersResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'chat/_default/03-channels/04-query_members.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const channelId = uniqueId('general');
  const tommasoId = uniqueId('tommaso');
  const tomId = uniqueId('tomas');
  const thierryId = uniqueId('thierry');
  const memberIds = [tommasoId, tomId, thierryId];

  /** Spies on `client.chat.queryMembers` (which `channel.queryMembers` calls) and returns the responses. */
  const spyOnQueryMembers = () => {
    const spy = vi.spyOn(client.chat, 'queryMembers');
    return {
      responses: () =>
        Promise.all(
          spy.mock.results.map(
            (result) => result.value as Promise<MembersResponse>,
          ),
        ),
      restore: () => spy.mockRestore(),
    };
  };

  const ids = (response: MembersResponse) =>
    response.members.map((m) => m.user_id);

  beforeAll(async () => {
    cleanup.users.push(...memberIds);
    await client.upsertUsers([
      { id: tommasoId, name: 'tommaso' },
      { id: tomId, name: 'tomas' },
      { id: thierryId, name: 'thierry' },
    ]);

    cleanup.channels.push(`messaging:${channelId}`);
    // Members one by one, so their `created_at` differ.
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: { created_by_id: tommasoId },
    });
    for (const user_id of memberIds) {
      await client.chat
        .channel('messaging', channelId)
        .update({ add_members: [{ user_id }] });
    }
  });

  afterAll(() => cleanup.run());

  it('queries members by name, autocomplete and all', async () => {
    const spy = spyOnQueryMembers();

    // #region snippet docs="chat/_default/03-channels/04-query_members.md" heading="" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Query members by user name
    await channel.queryMembers({
      payload: { filter_conditions: { name: 'tommaso' } },
    });

    // Autocomplete members by user name
    await channel.queryMembers({
      payload: { filter_conditions: { name: { $autocomplete: 'tom' } } },
    });

    // Query all members
    await channel.queryMembers({ payload: { filter_conditions: {} } });
    // #endregion snippet

    const [byName, autocomplete, all] = await spy.responses();
    spy.restore();
    expect(channel.cid).toBe(`messaging:${channelId}`);
    expect(ids(byName)).toEqual([tommasoId]);
    expect(ids(autocomplete).sort()).toEqual([tommasoId, tomId].sort());
    expect(ids(all).sort()).toEqual([...memberIds].sort());
  });

  it('paginates channel members', async () => {
    const spy = spyOnQueryMembers();

    // #region snippet docs="chat/_default/03-channels/04-query_members.md" heading="Paginating Channel Members" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // Returns members ordered by created_at descending
    const byCreatedAt = await channel.queryMembers({
      payload: {
        filter_conditions: {},
        sort: [{ field: 'created_at', direction: -1 }],
        limit: 100,
      },
    });

    // Paginate by created_at in descending order
    const lastByCreatedAt = byCreatedAt.members[byCreatedAt.members.length - 1];
    await channel.queryMembers({
      payload: {
        filter_conditions: {},
        sort: [{ field: 'created_at', direction: -1 }],
        limit: 100,
        created_at_before: nsToDate(lastByCreatedAt.created_at),
      },
    });

    // Returns members ordered by user_id ascending
    const byUserId = await channel.queryMembers({
      payload: {
        filter_conditions: {},
        sort: [{ field: 'user_id', direction: 1 }],
        limit: 100,
      },
    });

    // Paginate by user_id in ascending order
    const lastByUserId = byUserId.members[byUserId.members.length - 1];
    await channel.queryMembers({
      payload: {
        filter_conditions: {},
        sort: [{ field: 'user_id', direction: 1 }],
        limit: 100,
        user_id_gt: lastByUserId.user_id,
      },
    });

    // Paginate using offset
    await channel.queryMembers({
      payload: {
        filter_conditions: {},
        sort: [{ field: 'user_id', direction: 1 }],
        limit: 20,
        offset: 20,
      },
    });
    // #endregion snippet

    const responses = await spy.responses();
    spy.restore();
    expect(responses).toHaveLength(5);
    const [, afterCreatedAt, , afterUserId, offset] = responses;

    // created_at descending: the last member added comes first.
    expect(ids(byCreatedAt)).toEqual([...memberIds].reverse());
    expect(ids(afterCreatedAt)).toEqual([]);
    expect(ids(byUserId)).toEqual([...memberIds].sort());
    expect(ids(afterUserId)).toEqual([]);
    expect(ids(offset)).toEqual([]);
  });
});
