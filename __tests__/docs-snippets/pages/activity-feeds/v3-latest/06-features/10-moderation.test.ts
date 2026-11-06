import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { nsToMs } from '../../../../../../index';
import type {
  QueryModerationConfigsResponse,
  QueryReviewQueueResponse,
} from '../../../../../../index';
import { StreamClient } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerUser, waitForReviewItem } from '../../../../helpers/server';
import { retry } from '../../../../helpers/wait';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/10-moderation.md';

// The docs' empty credential placeholders, COPY-mapped to the test app's.
const streamApiKey = process.env.STREAM_API_KEY as string;
const streamSecret = process.env.STREAM_SECRET as string;

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const moderatorId = uniqueId('moderator');
  const ownerId = uniqueId('owner');
  // The docs' app-wide "feeds" policy: a test-owned key, so no feed of the app uses it.
  const feedsConfigKey = uniqueId('feeds');

  /** A fresh `uniqueId` user, removed in cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** An activity by the owner in their `user` feed. */
  const addActivity = async (text: string) => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${ownerId}`],
      type: 'post',
      text,
      user_id: ownerId,
    });
    return activity.id;
  };

  /** A ban's length in minutes (`expires` is exactly `created_at` + timeout). */
  const banMinutes = async (userId: string) => {
    const { bans } = await client.queryBannedUsers({
      payload: { filter_conditions: { user_id: { $eq: userId } } },
    });
    expect(bans).toHaveLength(1);
    return (nsToMs(bans[0].expires ?? 0) - nsToMs(bans[0].created_at)) / 60_000;
  };

  beforeAll(async () => {
    cleanup.users.push(moderatorId, ownerId);
    await client.upsertUsers([
      { id: moderatorId, role: 'admin' },
      { id: ownerId },
    ]);
    cleanup.feeds.push(`user:${ownerId}`);
    await client.feeds.feed('user', ownerId).getOrCreate({ user_id: ownerId });
    cleanup.add(() =>
      client.moderation
        .deleteConfig({ key: feedsConfigKey })
        .catch((error: unknown) => {
          if (!String(error).includes('not found')) throw error;
        }),
    );
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('Overview', () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Overview" tab="Node.js" index=1
    // COPY: streamApiKey="", streamSecret=""
    const apiKey = streamApiKey;
    const secret = streamSecret;
    const client = new StreamClient(apiKey, secret);

    const moderation = client.moderation;
    // #endregion snippet

    expect(typeof moderation.ban).toBe('function');
  });

  it('Ban Users', async () => {
    const banTarget = await createUser('ban-target');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Ban Users" tab="Node.js" index=1
    // COPY: banTarget="user-123", moderatorId="<banned by user id>"
    await client.moderation.ban({
      target_user_id: banTarget,
      banned_by_id: moderatorId,
      reason: 'Violation of community guidelines',
      timeout: 60, // 1 hour in minutes
      shadow: false,
      ip_ban: false,
    });
    // #endregion snippet

    const user = await getServerUser(client, banTarget);
    expect(user.banned).toBe(true);
    expect(await banMinutes(banTarget)).toBe(60);
  });

  it('Block Users', async () => {
    const blockedUserId = await createUser('blocked');
    const blockingUserId = await createUser('blocking');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Block Users" tab="Node.js" index=1
    // COPY: blockedUserId="user-123", blockingUserId="user-456"
    await client.blockUsers({
      blocked_user_id: blockedUserId,
      user_id: blockingUserId,
    });
    // #endregion snippet

    const { blocks } = await client.getBlockedUsers({
      user_id: blockingUserId,
    });
    expect(blocks.map((b) => b.blocked_user_id)).toEqual([blockedUserId]);
  });

  it('Unblock Users', async () => {
    const unblockedUserId = await createUser('unblocked');
    const unblockingUserId = await createUser('unblocking');
    await client.blockUsers({
      blocked_user_id: unblockedUserId,
      user_id: unblockingUserId,
    });

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Unblock Users" tab="Node.js" index=1
    // COPY: unblockedUserId="user-123", unblockingUserId="user-456"
    await client.unblockUsers({
      blocked_user_id: unblockedUserId,
      user_id: unblockingUserId,
    });
    // #endregion snippet

    const { blocks } = await client.getBlockedUsers({
      user_id: unblockingUserId,
    });
    expect(blocks).toEqual([]);
  });

  it('Get Blocked Users', async () => {
    const blockedId = await createUser('get-blocked');
    const blockerId = await createUser('get-blocker');
    await client.blockUsers({ blocked_user_id: blockedId, user_id: blockerId });

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Get Blocked Users" tab="Node.js" index=1
    // COPY: blockerId="user-456"
    const response = await client.getBlockedUsers({ user_id: blockerId });
    // #endregion snippet

    expect(response.blocks.map((b) => [b.user_id, b.blocked_user_id])).toEqual([
      [blockerId, blockedId],
    ]);
  });

  it('Flag Content', async () => {
    const activityId = await addActivity('flag me');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Flag Content" tab="Node.js" index=1
    // COPY: activityId="activity_123", moderatorId="<moderator user id>"
    await client.moderation.flag({
      entity_type: 'stream:feeds:v3:activity',
      entity_id: activityId,
      reason: 'Inappropriate content',
      user_id: moderatorId,
    });
    // #endregion snippet

    const item = await waitForReviewItem(client, activityId);
    expect(item.entity_type).toBe('stream:feeds:v3:activity');
    expect(item.flags[0]).toMatchObject({
      reason: 'Inappropriate content',
      user_id: moderatorId,
    });
  });

  it('Submit Moderation Actions', async () => {
    const activityId = await addActivity('review me');
    await client.moderation.flag({
      entity_type: 'stream:feeds:v3:activity',
      entity_id: activityId,
      reason: 'spam',
      user_id: moderatorId,
    });
    const { id: reviewItemId } = await waitForReviewItem(client, activityId);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Submit Moderation Actions" tab="Node.js" index=1
    // COPY: reviewItemId="<review item id>", moderatorId="<user id>"
    await client.moderation.submitAction({
      // Action details for moderation
      action_type: 'mark_reviewed',
      item_id: reviewItemId,
      user_id: moderatorId,
    });
    // #endregion snippet

    const { item } = await client.moderation.getReviewQueueItem({
      id: reviewItemId,
    });
    expect(item?.latest_moderator_action).toBe('mark_reviewed');
  });

  it('Query Review Queue', async () => {
    const activityId = await addActivity('queue me');
    await client.moderation.flag({
      entity_type: 'stream:feeds:v3:activity',
      entity_id: activityId,
      reason: 'spam',
      user_id: moderatorId,
    });
    await waitForReviewItem(client, activityId);
    const user = { id: moderatorId };
    const queryReviewQueue = vi.spyOn(client.moderation, 'queryReviewQueue');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Query Review Queue" tab="Node.js" index=1
    await client.moderation.queryReviewQueue({
      // Query parameters for filtering and pagination
      user_id: user.id,
    });
    // #endregion snippet

    const { items } = await (queryReviewQueue.mock.results[0]
      .value as Promise<QueryReviewQueueResponse>);
    expect(items.length).toBeGreaterThan(0);
  });

  describe('Configuration Management', () => {
    // The docs' "existing block lists", test-owned.
    const blocklistName = uniqueId('remove-list');
    const flagBlocklistName = uniqueId('flag-list');
    const shadowBlocklistName = uniqueId('shadow-list');
    const bounceBlocklistName = uniqueId('bounce-list');

    beforeAll(async () => {
      for (const [i, name] of [
        blocklistName,
        flagBlocklistName,
        shadowBlocklistName,
        bounceBlocklistName,
      ].entries()) {
        await client.createBlockList({ name, words: [`frobnicate${i}`] });
        cleanup.add(() => client.deleteBlockList({ name }));
      }
    });

    it('Upsert Moderation Configuration', async () => {
      const upsertConfig = client.moderation.upsertConfig.bind(
        client.moderation,
      );
      vi.spyOn(client.moderation, 'upsertConfig').mockImplementation(
        (request) =>
          retry(() => upsertConfig(request), {
            retryIf: (error) => String(error).includes('Blocklist not found'),
          }),
      );

      // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Upsert Moderation Configuration" tab="Node.js" index=1
      // COPY: feedsConfigKey="feeds"
      await client.moderation.upsertConfig({
        key: feedsConfigKey,
        block_list_config: {
          enabled: true,
          rules: [
            // Names of existing block lists
            { name: blocklistName, action: 'remove' },
            { name: flagBlocklistName, action: 'flag' },
            { name: shadowBlocklistName, action: 'shadow' },
            { name: bounceBlocklistName, action: 'bounce' },
          ],
        },
        ai_image_config: {
          enabled: true,
          rules: [
            {
              label: 'Non-Explicit Nudity',
              action: 'remove',
              min_confidence: 0,
            },
          ],
          ocr_rules: [{ label: 'SEXUAL_HARASSMENT', action: 'remove' }],
        },
      });
      // #endregion snippet

      const { config } = await client.moderation.getConfig({
        key: feedsConfigKey,
      });
      expect(
        config?.block_list_config?.rules?.map(({ name, action }) => [
          name,
          action,
        ]),
      ).toEqual([
        [blocklistName, 'remove'],
        [flagBlocklistName, 'flag'],
        [shadowBlocklistName, 'shadow'],
        [bounceBlocklistName, 'bounce'],
      ]);
      expect(config?.ai_image_config?.rules?.map((r) => r.label)).toEqual([
        'Non-Explicit Nudity',
      ]);
      expect(config?.ai_image_config?.ocr_rules?.map((r) => r.label)).toEqual([
        'SEXUAL_HARASSMENT',
      ]);
    });

    it('Get Moderation Configuration', async () => {
      const getConfig = vi.spyOn(client.moderation, 'getConfig');

      // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Get Moderation Configuration" tab="Node.js" index=1
      // COPY: feedsConfigKey="feeds"
      await client.moderation.getConfig({
        key: feedsConfigKey,
      });
      // #endregion snippet

      const { config } = await (getConfig.mock.results[0].value as ReturnType<
        typeof client.moderation.getConfig
      >);
      expect(config?.key).toBe(feedsConfigKey);
    });

    it('Query Moderation Configurations', async () => {
      const queryModerationConfigs = vi.spyOn(
        client.moderation,
        'queryModerationConfigs',
      );

      // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Query Moderation Configurations" tab="Node.js" index=1
      await client.moderation.queryModerationConfigs({
        filter: {
          // Filter params
        },
      });
      // #endregion snippet

      const { configs } = await (queryModerationConfigs.mock.results[0]
        .value as Promise<QueryModerationConfigsResponse>);
      expect(configs.length).toBeGreaterThan(0);
    });

    it('Delete Moderation Configuration', async () => {
      // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Delete Moderation Configuration" tab="Node.js" index=1
      // COPY: feedsConfigKey="feeds"
      await client.moderation.deleteConfig({
        key: feedsConfigKey,
      });
      // #endregion snippet

      await expect(
        client.moderation.getConfig({ key: feedsConfigKey }),
      ).rejects.toMatchObject({ metadata: { responseCode: 404 } });
    });
  });

  it('Error Handling', async () => {
    const banTarget = await createUser('error-ban-target');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const error = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/10-moderation.md" heading="Error Handling" tab="Node.js" index=1
    // COPY: banTarget="user-123", moderatorId="<banned by user id>"
    try {
      await client.moderation.ban({
        target_user_id: banTarget,
        banned_by_id: moderatorId,
        reason: 'Violation of community guidelines',
        timeout: 60, // 1 hour in minutes
        shadow: false,
        ip_ban: false,
      });

      console.log(`Banned successfully`);
    } catch (e) {
      console.error(`Failed to ban user, error: ${String(e)}`);
    }
    // #endregion snippet

    expect(log.mock.calls).toEqual([['Banned successfully']]);
    expect(error).not.toHaveBeenCalled();
    expect(await banMinutes(banTarget)).toBe(60);
  });
});
