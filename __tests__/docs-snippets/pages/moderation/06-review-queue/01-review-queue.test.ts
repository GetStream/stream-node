import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage, waitForReviewItem } from '../../../helpers/server';

const DOCS = 'moderation/_default/06-review-queue/01-review-queue.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  const creatorId = uniqueId('creator');
  const channelId = uniqueId('review-channel');
  const cid = `messaging:${channelId}`;

  /** Flags a fresh message of `creatorId` and returns its review queue item. */
  const flagMessage = async () => {
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
    cleanup.users.push(moderatorId, creatorId);
    await client.upsertUsers([
      { id: moderatorId, role: 'admin' },
      { id: creatorId },
    ]);
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: moderatorId } });
    cleanup.channels.push(cid);
  });

  afterAll(() => cleanup.run());

  it('queries the review queue', async () => {
    // The filter matches every unreviewed message item of the app: flag a fresh
    // message just before, so it is the newest one. A newer item marked as reviewed
    // must not show up.
    const flagged = await flagMessage();
    const reviewed = await flagMessage();
    await client.moderation.submitAction({
      action_type: 'mark_reviewed',
      item_id: reviewed.id,
      user_id: moderatorId,
    });

    // #region snippet docs="moderation/_default/06-review-queue/01-review-queue.md" heading="Query Review Queue" tab="Node.js" index=1
    const response = await client.moderation.queryReviewQueue({
      filter: {
        entity_type: 'stream:chat:v1:message',
        reviewed: false,
      },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 20,
    });
    // #endregion snippet

    expect(response.items.length).toBeGreaterThan(0);
    expect(response.items.length).toBeLessThanOrEqual(20);
    expect(response.items[0].id).toBe(flagged.id);
    for (const item of response.items) {
      expect(item.entity_type).toBe('stream:chat:v1:message');
      expect(item.reviewed_at).toBeFalsy();
    }
    expect(response.items.map((item) => item.id)).not.toContain(reviewed.id);
  });

  it('gets a review queue item', async () => {
    const flagged = await flagMessage();
    const itemId = flagged.id;

    // #region snippet docs="moderation/_default/06-review-queue/01-review-queue.md" heading="Get Review Queue Item" tab="Node.js" index=1
    // COPY: itemId="item_id"
    const response = await client.moderation.getReviewQueueItem({ id: itemId });
    // #endregion snippet

    expect(response.item).toMatchObject({
      id: itemId,
      entity_id: flagged.entity_id,
      entity_type: 'stream:chat:v1:message',
      entity_creator_id: creatorId,
    });
    expect(response.item?.flags[0]).toMatchObject({
      reason: 'spam',
      user_id: moderatorId,
    });
  });
});
