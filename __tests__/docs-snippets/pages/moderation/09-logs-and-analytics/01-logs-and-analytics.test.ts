import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage, waitForReviewItem } from '../../../helpers/server';

const DOCS =
  'moderation/_default/09-logs-and-analytics/01-logs-and-analytics.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  const channelId = uniqueId('logs-channel');
  const cid = `messaging:${channelId}`;

  /** Creates a channel member with a `uniqueId` id. */
  const createMember = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    await client.chat
      .channel('messaging', channelId)
      .update({ add_members: [{ user_id: id }] });
    return id;
  };

  /** Sends a message of `creatorId`, flags it and returns its review queue item. */
  const flagMessage = async (creatorId: string) => {
    const message = await sendServerMessage(client, cid, {
      text: 'buy cheap followers now',
      user_id: creatorId,
    });
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: message.id,
      entity_creator_id: creatorId,
      reason: 'spam',
      user_id: moderatorId,
    });
    return waitForReviewItem(client, message.id);
  };

  beforeAll(async () => {
    cleanup.users.push(moderatorId);
    await client.upsertUsers([{ id: moderatorId, role: 'admin' }]);
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: moderatorId } });
    cleanup.channels.push(cid);
  });

  afterAll(() => cleanup.run());

  it('queries moderation logs', async () => {
    const creatorId = await createMember('creator');
    const item = await flagMessage(creatorId);
    await client.moderation.submitAction({
      action_type: 'delete_message',
      item_id: item.id,
      user_id: moderatorId,
    });

    // #region snippet docs="moderation/_default/09-logs-and-analytics/01-logs-and-analytics.md" heading="Query Moderation Logs" tab="Node.js" index=1
    const response = await client.moderation.queryModerationLogs({
      filter: { type: 'delete_message' },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 50,
    });
    // #endregion snippet

    // The newest delete_message log is the test's action.
    expect(response.logs[0]).toMatchObject({
      type: 'delete_message',
      user_id: moderatorId,
      target_user_id: creatorId,
    });
    expect(response.logs[0].review_queue_item?.id).toBe(item.id);
    expect(response.logs.every((log) => log.type === 'delete_message')).toBe(
      true,
    );
  });

  it('gets the flag count of a user', async () => {
    const flaggedUser = await createMember('flagged');
    await flagMessage(flaggedUser);
    await flagMessage(flaggedUser);

    // #region snippet docs="moderation/_default/09-logs-and-analytics/01-logs-and-analytics.md" heading="Get Flag Count" tab="Node.js" index=1
    // COPY: flaggedUser="user_123"
    const response = await client.moderation.getFlagCount({
      entity_creator_id: flaggedUser,
    });
    // #endregion snippet

    expect(response.count).toBe(2);
  });
});
