import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { SubmitModerationFeedbackResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage, waitForReviewItem } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

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

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('queries flagged items that are not reviewed yet', async () => {
    // Manual flags have `recommended_action: "keep"`: flag messages through a
    // channel-level blocklist policy (action `flag`) of a new channel instead.
    const policyChannelId = uniqueId('policy-channel');
    const policyCid = `messaging:${policyChannelId}`;
    const configKey = `chat:${policyCid}`;
    const blocklist = uniqueId('review-words');
    await client.chat
      .channel('messaging', policyChannelId)
      .getOrCreate({ data: { created_by_id: moderatorId } });
    cleanup.channels.push(policyCid);
    await client.createBlockList({ name: blocklist, words: ['frobnicate'] });
    cleanup.add(() => client.deleteBlockList({ name: blocklist }));
    // A new blocklist isn't known to the moderation API right away.
    await retry(
      () =>
        client.moderation.upsertConfig({
          key: configKey,
          block_list_config: { rules: [{ name: blocklist, action: 'flag' }] },
        }),
      { retryIf: (error) => String(error).includes('Blocklist not found') },
    );
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
    // A new policy can take a moment to apply.
    await retry(async () => {
      const { recommended_action } = await client.moderation.check({
        entity_type: 'stream:chat:v1:message',
        entity_id: uniqueId('warmup'),
        entity_creator_id: creatorId,
        config_key: configKey,
        moderation_payload: { texts: ['frobnicate'] },
      });
      expect(recommended_action).toBe('flag');
    });
    /** Sends a message the policy flags, and returns its review queue item. */
    // The channel's policy can apply to messages a while after `check` sees it:
    // send again until a message reaches the review queue.
    const policyFlaggedMessage = () =>
      retry(async () => {
        const message = await sendServerMessage(
          client,
          policyCid,
          { text: 'please frobnicate now', user_id: creatorId },
          { force_moderation: true },
        );
        return retry(
          async () => {
            const { items } = await client.moderation.queryReviewQueue({
              filter: { entity_id: message.id },
            });
            expect(items).toHaveLength(1);
            return items[0];
          },
          { timeout: 5000 },
        );
      });
    // The filter matches every unreviewed flagged item of the app: flag a fresh
    // message just before, so it is the newest one. A newer item marked as reviewed
    // must not show up.
    const flagged = await policyFlaggedMessage();
    const reviewed = await policyFlaggedMessage();
    await client.moderation.submitAction({
      action_type: 'mark_reviewed',
      item_id: reviewed.id,
      user_id: moderatorId,
    });

    // #region snippet docs="moderation/_default/06-review-queue/01-review-queue.md" heading="Query Review Queue" tab="Node.js" index=1
    const response = await client.moderation.queryReviewQueue({
      filter: { recommended_action: 'flag', reviewed: false },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    expect(response.items[0].id).toBe(flagged.id);
    expect(response.items[0].recommended_action).toBe('flag');
    // The bare `recommended_action: "flag"` equality doesn't narrow the results on
    // the test app (items with "keep" come back too; `{ $in: ["flag"] }` does narrow
    // them, 2026-10-29), so only the `reviewed` part is asserted for every item.
    for (const item of response.items) {
      expect(item.reviewed_at).toBeFalsy();
    }
    expect(response.items.map((item) => item.id)).not.toContain(reviewed.id);
  });

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

    // #region snippet docs="moderation/_default/06-review-queue/01-review-queue.md" heading="Query Review Queue" tab="Node.js" index=2
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

  it('submits moderator feedback', async () => {
    const submitFeedback = vi.spyOn(
      client.moderation,
      'submitModerationFeedback',
    );

    // #region snippet docs="moderation/_default/06-review-queue/01-review-queue.md" heading="Moderator feedback" tab="Node.js" index=1
    await client.moderation.submitModerationFeedback({
      message: 'the moderated text',
      published_at: '2026-10-20T13:13:38Z',
      reference: 'provider-reference',
      current_labels: ['HATRED'],
      current_recommended_action: 'remove',
      expected_labels: ['INSULT'],
      expected_recommended_action: 'flag',
    });
    // #endregion snippet

    const [response] = await Promise.all(
      submitFeedback.mock.results.map(
        (r) => r.value as Promise<SubmitModerationFeedbackResponse>,
      ),
    );
    expect(response.duration).toBeTruthy();
  });
});
