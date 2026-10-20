import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { StreamClient, UserResponse } from '../../../../../index';
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

  it.skip('BLOCKED: SDK issue: the node SDK has no exportModerationLogs (POST /api/v2/moderation/logs/export is `Ignore: true` in the spec)', async () => {
    // The node SDK has no exportModerationLogs: type the missing method (with the
    // request shape the docs use) so the skipped region typechecks and lints. It isn't
    // there at runtime.
    const client = getServerClient() as StreamClient & {
      moderation: {
        exportModerationLogs: (request: {
          filter: Record<string, unknown>;
        }) => Promise<{ task_id: string }>;
      };
    };

    // #region snippet docs="moderation/_default/09-logs-and-analytics/01-logs-and-analytics.md" heading="Export Moderation Logs" tab="Node.js" index=1
    const response = await client.moderation.exportModerationLogs({
      filter: { created_at: { $gte: '2024-01-01T00:00:00Z' } },
    });
    // #endregion snippet

    expect(response.task_id).toBeTruthy();
  });

  it.skip('BLOCKED: SDK issue: the node SDK has no getModerationAnalytics (POST /api/v2/moderation/analytics is `Ignore: true` in the spec)', async () => {
    // The node SDK has no getModerationAnalytics: type the missing method (with the
    // request shape the docs use) so the skipped region typechecks and lints. It isn't
    // there at runtime.
    const client = getServerClient() as StreamClient & {
      moderation: {
        getModerationAnalytics: (request: {
          from: string;
          to: string;
        }) => Promise<{ analytics: Record<string, unknown> }>;
      };
    };

    // #region snippet docs="moderation/_default/09-logs-and-analytics/01-logs-and-analytics.md" heading="Get Moderation Analytics" tab="Node.js" index=1
    const response = await client.moderation.getModerationAnalytics({
      from: '2024-01-01T00:00:00Z',
      to: '2024-01-31T23:59:59Z',
    });
    // #endregion snippet

    expect(response.analytics).toBeDefined();
  });

  it.skip('BLOCKED: SDK issue: the node SDK has no queryUsageStats (POST /api/v2/moderation/usage_stats is `Ignore: true` in the spec)', async () => {
    // The node SDK has no queryUsageStats: type the missing method (with the request
    // shape the docs use) so the skipped region typechecks and lints. It isn't there
    // at runtime.
    const client = getServerClient() as StreamClient & {
      moderation: {
        queryUsageStats: (request: {
          from: string;
          to: string;
        }) => Promise<{ items: unknown[] }>;
      };
    };

    // #region snippet docs="moderation/_default/09-logs-and-analytics/01-logs-and-analytics.md" heading="Query Usage Stats" tab="Node.js" index=1
    const response = await client.moderation.queryUsageStats({
      from: '2024-01-01T00:00:00Z',
      to: '2024-01-31T23:59:59Z',
    });
    // #endregion snippet

    expect(Array.isArray(response.items)).toBe(true);
  });

  it.skip('BLOCKED: SDK issue: the node SDK has no getUserModerationReport (GET /api/v2/moderation/user_report is left out of the spec)', async () => {
    const reportUser = await createMember('report-user');
    // The node SDK has no getUserModerationReport: type the missing method (from the
    // API's response) so the skipped region typechecks and lints. It isn't there at runtime.
    const client = getServerClient() as StreamClient & {
      moderation: {
        getUserModerationReport: (request: {
          user_id: string;
        }) => Promise<{ user: UserResponse }>;
      };
    };

    // #region snippet docs="moderation/_default/09-logs-and-analytics/01-logs-and-analytics.md" heading="Get User Moderation Report" tab="Node.js" index=1
    // COPY: reportUser="user_123"
    const response = await client.moderation.getUserModerationReport({
      user_id: reportUser,
    });
    // #endregion snippet

    expect(response.user.id).toBe(reportUser);
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
