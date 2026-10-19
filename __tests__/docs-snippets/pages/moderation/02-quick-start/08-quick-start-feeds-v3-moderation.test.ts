import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { StreamError } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerUser } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS =
  'moderation/_default/02-quick-start/08-quick-start-feeds-v3-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const blockedWord = 'frobnicate';
  // The docs' "profanity_en" blocklist, test-owned.
  const profanityBlocklist = uniqueId('profanity');

  /** Creates a plain user with a `uniqueId` id and registers it for cleanup. */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** Deletes moderation config `key` in cleanup (a snippet may not have created it). */
  const deleteConfigInCleanup = (key: string) =>
    cleanup.add(() =>
      client.moderation.deleteConfig({ key }).catch((error: unknown) => {
        if (!String(error).includes('not found')) throw error;
      }),
    );

  /** `upsertConfig` retried while the new blocklist isn't known everywhere yet. */
  const isBlocklistMissing = (error: unknown) =>
    String(error).includes('Blocklist not found');

  beforeAll(async () => {
    await client.createBlockList({
      name: profanityBlocklist,
      words: [blockedWord],
    });
    cleanup.add(() => client.deleteBlockList({ name: profanityBlocklist }));
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('sets up a policy', async () => {
    // The docs' app-wide "feeds" policy: a test-owned key, so no feed of the app uses it.
    const feedsConfigKey = uniqueId('feeds');
    deleteConfigInCleanup(feedsConfigKey);
    const upsertConfig = client.moderation.upsertConfig.bind(client.moderation);
    vi.spyOn(client.moderation, 'upsertConfig').mockImplementation((request) =>
      retry(() => upsertConfig(request), { retryIf: isBlocklistMissing }),
    );

    // #region snippet docs="moderation/_default/02-quick-start/08-quick-start-feeds-v3-moderation.md" heading="Configure Moderation Policy" tab="Node.js" index=1
    // COPY: feedsConfigKey="feeds", profanityBlocklist="profanity_en"
    await client.moderation.upsertConfig({
      key: feedsConfigKey,
      ai_text_config: {
        rules: [
          { label: 'SPAM', action: 'flag' },
          { label: 'MORAL_HARASSMENT', action: 'remove' },
        ],
      },
      block_list_config: {
        rules: [{ name: profanityBlocklist, action: 'remove' }],
      },
      ai_image_config: {
        rules: [
          { label: 'Non-Explicit Nudity', action: 'flag', min_confidence: 50 },
        ],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({
      key: feedsConfigKey,
    });
    expect(
      config?.ai_text_config?.rules?.map(({ label, action }) => ({
        label,
        action,
      })),
    ).toEqual([
      { label: 'SPAM', action: 'flag' },
      { label: 'MORAL_HARASSMENT', action: 'remove' },
    ]);
    expect(
      config?.block_list_config?.rules?.map(({ name, action }) => ({
        name,
        action,
      })),
    ).toEqual([{ name: profanityBlocklist, action: 'remove' }]);
    expect(
      config?.ai_image_config?.rules?.map(
        ({ label, action, min_confidence }) => ({
          label,
          action,
          min_confidence,
        }),
      ),
    ).toEqual([
      { label: 'Non-Explicit Nudity', action: 'flag', min_confidence: 50 },
    ]);
  });

  it('assigns a named policy to a feed', async () => {
    const ownerId = await createUser('owner');
    const feedId = uniqueId('feed');
    cleanup.feeds.push(`user:${feedId}`);
    const feed = client.feeds.feed('user', feedId);
    await feed.getOrCreate({ user_id: ownerId });
    // The docs' "pm:acme" policy: blocks the test blocklist's words.
    const namedPolicy = uniqueId('pm');
    deleteConfigInCleanup(namedPolicy);
    await retry(
      () =>
        client.moderation.upsertConfig({
          key: namedPolicy,
          block_list_config: {
            rules: [{ name: profanityBlocklist, action: 'remove' }],
          },
        }),
      { retryIf: isBlocklistMissing },
    );

    // #region snippet docs="moderation/_default/02-quick-start/08-quick-start-feeds-v3-moderation.md" heading="Assign a named policy to a feed" tab="Node.js" index=1
    // COPY: namedPolicy="pm:acme"
    await feed.update({
      custom: {
        moderation_policy: namedPolicy,
      },
    });
    // #endregion snippet

    const { feed: stored } = await feed.getOrCreate({ user_id: ownerId });
    expect(stored.custom).toEqual({ moderation_policy: namedPolicy });

    // The feed's activities are now moderated with that policy.
    const moderation = await retry(async () => {
      const { activity } = await client.feeds.addActivity({
        type: 'post',
        feeds: [`user:${feedId}`],
        text: `you ${blockedWord}`,
        user_id: ownerId,
        force_moderation: true,
      });
      expect(activity.moderation?.action).toBe('remove');
      return activity.moderation;
    });
    expect(moderation?.blocklists_matched).toEqual([profanityBlocklist]);
  });

  it('flags a user', async () => {
    const targetUserId = await createUser('target');
    const reportingUserId = await createUser('reporter');

    // #region snippet docs="moderation/_default/02-quick-start/08-quick-start-feeds-v3-moderation.md" heading="Flag a User" tab="Node.js" index=1
    await client.moderation.flag({
      entity_type: 'stream:user',
      entity_id: targetUserId,
      reason: 'harassment',
      user_id: reportingUserId,
    });
    // #endregion snippet

    const flag = await retry(async () => {
      const { items } = await client.moderation.queryReviewQueue({
        filter: { entity_id: targetUserId },
      });
      expect(items).toHaveLength(1);
      expect(items[0].flags).toHaveLength(1);
      return items[0].flags[0];
    });
    expect(flag.reason).toBe('harassment');
    expect(flag.user?.id).toBe(reportingUserId);
  });

  it('bans a user', async () => {
    const targetUserId = await createUser('target');
    const moderatorId = await createUser('moderator');
    const feedId = uniqueId('feed');
    cleanup.feeds.push(`user:${feedId}`);
    await client.feeds
      .feed('user', feedId)
      .getOrCreate({ user_id: targetUserId });

    // #region snippet docs="moderation/_default/02-quick-start/08-quick-start-feeds-v3-moderation.md" heading="Ban a User" tab="Node.js" index=1
    await client.moderation.ban({
      target_user_id: targetUserId,
      banned_by_id: moderatorId,
      reason: 'Repeated violations',
    });
    // #endregion snippet

    expect((await getServerUser(client, targetUserId)).banned).toBe(true);
    // "Banned users are prevented from ... creating activities".
    const error: unknown = await client.feeds
      .addActivity({
        type: 'post',
        feeds: [`user:${feedId}`],
        text: 'hello',
        user_id: targetUserId,
      })
      .catch((e: unknown) => e);
    expect(error).toBeInstanceOf(StreamError);
    expect(error).toMatchObject({ code: 17 });
    expect(String(error)).toContain('Your account is currently banned');
  });
});
