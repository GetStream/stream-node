import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { QueryReviewQueueRequest } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { sendServerMessage, waitForReviewItem } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS =
  'moderation/_default/02-quick-start/05-build-moderation-dashboard.md';

/**
 * The review queue filters match the whole app: each test creates a fresh review queue
 * item that matches the fence's filter, waits until the same query returns it first
 * (newest `created_at`), and then asserts the fence returns it first too.
 */
describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  const creatorId = uniqueId('creator');
  const channelId = uniqueId('dashboard');
  const cid = `messaging:${channelId}`;
  const sort = [{ field: 'created_at', direction: -1 }];

  /** Flags a new message by the creator and returns its review queue item. */
  const flagMessage = async (
    message: Parameters<typeof sendServerMessage>[2],
  ) => {
    const { id } = await sendServerMessage(client, cid, message);
    await client.moderation.flag({
      entity_type: 'stream:chat:v1:message',
      entity_id: id,
      entity_creator_id: creatorId,
      reason: 'spam',
      user_id: moderatorId,
    });
    return waitForReviewItem(client, id);
  };

  /** Retries the query until its first item is the given entity's. */
  const waitUntilFirst = (
    filter: QueryReviewQueueRequest['filter'],
    entityId: string,
  ) =>
    retry(async () => {
      const { items } = await client.moderation.queryReviewQueue({
        filter,
        sort,
      });
      if (items[0]?.entity_id !== entityId) {
        throw new Error(`${entityId} is not the first item yet`);
      }
    });

  beforeAll(async () => {
    cleanup.users.push(moderatorId, creatorId);
    await client.upsertUsers([
      { id: moderatorId, role: 'admin' },
      { id: creatorId },
    ]);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: { created_by_id: moderatorId, members: [{ user_id: creatorId }] },
    });
    cleanup.channels.push(cid);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Text Review Queue', async () => {
    const flagged = await flagMessage({
      text: 'buy cheap followers now',
      user_id: creatorId,
    });
    await waitUntilFirst(
      { entity_type: 'stream:chat:v1:message', has_text: true },
      flagged.entity_id,
    );

    // #region snippet docs="moderation/_default/02-quick-start/05-build-moderation-dashboard.md" heading="Text Review Queue" tab="Node.js" index=1
    const response = await client.moderation.queryReviewQueue({
      filter: { entity_type: 'stream:chat:v1:message', has_text: true },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    expect(response.items[0].entity_id).toBe(flagged.entity_id);
    for (const item of response.items) {
      expect(item.entity_type).toBe('stream:chat:v1:message');
      expect(item.moderation_payload?.texts?.length).toBeGreaterThan(0);
    }
  });

  it('Text Review Queue: flags of an item', async () => {
    const item = await flagMessage({
      text: 'buy cheap followers now',
      user_id: creatorId,
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="moderation/_default/02-quick-start/05-build-moderation-dashboard.md" heading="Text Review Queue" tab="Node.js" index=2
    for (const flag of item.flags) {
      console.log(flag.type); // moderation engine type
      console.log(flag.labels); // list of labels or harm types detected
      console.log(flag.custom); // more details about the flag
    }
    // #endregion snippet

    expect(item.flags).toHaveLength(1);
    const [flag] = item.flags;
    expect(log.mock.calls).toEqual([[flag.type], [flag.labels], [flag.custom]]);
  });

  it('Media Review Queue', async () => {
    const flagged = await flagMessage({
      text: 'look at this',
      user_id: creatorId,
      attachments: [
        {
          type: 'image',
          image_url: 'https://getstream.io/images/icons/favicon-32x32.png',
          custom: {},
        },
      ],
    });
    await waitUntilFirst(
      { entity_type: 'stream:chat:v1:message', has_image: true },
      flagged.entity_id,
    );

    // #region snippet docs="moderation/_default/02-quick-start/05-build-moderation-dashboard.md" heading="Media Review Queue" tab="Node.js" index=1
    const response = await client.moderation.queryReviewQueue({
      filter: { entity_type: 'stream:chat:v1:message', has_image: true },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    expect(response.items[0].entity_id).toBe(flagged.entity_id);
    expect(response.items[0].moderation_payload?.images).toEqual([
      'https://getstream.io/images/icons/favicon-32x32.png',
    ]);
    for (const item of response.items) {
      expect(item.moderation_payload?.images?.length).toBeGreaterThan(0);
    }
  });

  it('Blocked Content', async () => {
    // A channel-level policy that removes messages with a blocklist word.
    const blocklist = uniqueId('blocked-words');
    await client.createBlockList({ name: blocklist, words: ['zorbleflux'] });
    cleanup.add(async () => {
      await client.deleteBlockList({ name: blocklist });
    });
    const configKey = `chat:messaging:${channelId}`;
    cleanup.add(async () => {
      await client.moderation.deleteConfig({ key: configKey });
    });
    // Right after `createBlockList`, `upsertConfig` can fail with "Blocklist not found".
    await retry(() =>
      client.moderation.upsertConfig({
        key: configKey,
        block_list_config: {
          enabled: true,
          rules: [{ name: blocklist, action: 'remove' }],
        },
      }),
    );
    // Server-side messages skip moderation unless forced.
    const blockedId = await retry(async () => {
      const { message } = await client.chat
        .channel('messaging', channelId)
        .sendMessage({
          message: { text: 'zorbleflux', user_id: creatorId },
          force_moderation: true,
        });
      if (message.type !== 'error') throw new Error('not blocked yet');
      return message.id;
    });
    await waitUntilFirst(
      { entity_type: 'stream:chat:v1:message', recommended_action: 'remove' },
      blockedId,
    );

    // #region snippet docs="moderation/_default/02-quick-start/05-build-moderation-dashboard.md" heading="Blocked Content" tab="Node.js" index=1
    const response = await client.moderation.queryReviewQueue({
      filter: {
        entity_type: 'stream:chat:v1:message',
        recommended_action: 'remove',
      },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    expect(response.items[0].entity_id).toBe(blockedId);
    for (const item of response.items) {
      expect(item.recommended_action).toBe('remove');
    }
  });

  it('Reviewed Content', async () => {
    const flagged = await flagMessage({
      text: 'buy cheap followers now',
      user_id: creatorId,
    });
    await client.moderation.submitAction({
      action_type: 'mark_reviewed',
      item_id: flagged.id,
      user_id: moderatorId,
    });
    await waitUntilFirst(
      { entity_type: 'stream:chat:v1:message', reviewed: true },
      flagged.entity_id,
    );

    // #region snippet docs="moderation/_default/02-quick-start/05-build-moderation-dashboard.md" heading="Reviewed Content" tab="Node.js" index=1
    const response = await client.moderation.queryReviewQueue({
      filter: { entity_type: 'stream:chat:v1:message', reviewed: true },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    expect(response.items[0].entity_id).toBe(flagged.entity_id);
    for (const item of response.items) {
      expect(item.reviewed_at).toBeTruthy();
    }
  });
});
