import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  waitForAppSetting,
  waitForTeamIdSupport,
} from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/10-multitenancy/01-multitenancy.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  /** The docs' "team-a" / "team-b". Teams are plain strings, not resources. */
  const teamA = uniqueId('team-a');
  const teamB = uniqueId('team-b');
  /** Used only to wait for multi-tenancy to settle (`waitForTeamIdSupport`). */
  const probeTeam = uniqueId('probe');

  /** The docs' "chat:messaging" team policy, as a test-owned channel-level key. */
  const configKey = `chat:messaging:${uniqueId('channel')}`;
  /** An older team-a policy, so the team query's sort can be checked. */
  const olderConfigKey = `chat:messaging:${uniqueId('older-channel')}`;
  /** A policy without a team, used to put a team-a user in the review queue. */
  const reviewConfigKey = `chat:messaging:${uniqueId('review-channel')}`;

  /** The docs' "myblocklist", "my_team_blocklist" and "my_global_blocklist". */
  const myBlocklist = uniqueId('myblocklist');
  const teamBlocklist = uniqueId('team-blocklist');
  const globalBlocklist = uniqueId('global-blocklist');

  const author = uniqueId('author');

  const isNotFound = (error: unknown) =>
    /not found|doesn't exist|does not exist/i.test(String(error));
  const ignoreNotFound = (error: unknown) => {
    if (!isNotFound(error)) throw error;
  };
  /** `upsertConfig` retried while a new blocklist isn't known everywhere yet. */
  const isBlocklistMissing = (error: unknown) =>
    String(error).includes('Blocklist not found');

  beforeAll(async () => {
    const { app } = await client.getApp();
    const original = app.multi_tenant_enabled;
    // Registered first, so it runs after every other custom cleanup step
    // (the team policies are deleted while multi-tenancy is still on).
    cleanup.add(async () => {
      await client.updateApp({ multi_tenant_enabled: original });
      await waitForAppSetting(client, 'multi_tenant_enabled', original);
      await waitForTeamIdSupport(client, probeTeam, original);
    });
  });

  afterAll(() => cleanup.run());
  afterEach(() => vi.restoreAllMocks());

  describe('with multi-tenancy', () => {
    beforeAll(async () => {
      // Team policies fail with code 4 "Team moderation configuration is not
      // supported in single tenant mode" while multi-tenancy is off.
      await client.updateApp({ multi_tenant_enabled: true });
      await waitForAppSetting(client, 'multi_tenant_enabled', true);
      await waitForTeamIdSupport(client, probeTeam, true);

      // Team blocklists aren't listed by the leak check (`listBlockLists()` without a team).
      for (const name of [myBlocklist, teamBlocklist]) {
        cleanup.add(() =>
          client.deleteBlockList({ name, team: teamA }).catch(ignoreNotFound),
        );
      }
      cleanup.add(() =>
        client.deleteBlockList({ name: globalBlocklist }).catch(ignoreNotFound),
      );
      // Team policies need their team to be deleted.
      for (const key of [configKey, olderConfigKey]) {
        cleanup.add(() =>
          client.moderation
            .deleteConfig({ key, team: teamA })
            .catch(ignoreNotFound),
        );
      }
      cleanup.add(() =>
        client.moderation
          .deleteConfig({ key: reviewConfigKey })
          .catch(ignoreNotFound),
      );

      cleanup.users.push(author);
      await client.upsertUsers([{ id: author, teams: [teamA] }]);
      await client.createBlockList({
        name: teamBlocklist,
        team: teamA,
        words: ['frobnicate'],
      });
      await client.createBlockList({
        name: globalBlocklist,
        words: ['quuxify'],
      });

      await client.moderation.upsertConfig({
        key: olderConfigKey,
        team: teamA,
        ai_text_config: { rules: [{ label: 'SPAM', action: 'flag' }] },
      });
      await retry(
        () =>
          client.moderation.upsertConfig({
            key: reviewConfigKey,
            block_list_config: {
              rules: [{ name: globalBlocklist, action: 'flag' }],
            },
          }),
        { retryIf: isBlocklistMissing },
      );
    });

    it('creates a team policy', async () => {
      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="Server Side Integration" tab="Node.js" index=1
      // COPY: configKey="chat:messaging", teamA="team-a"
      await client.moderation.upsertConfig({
        key: configKey,
        team: teamA,
        ai_text_config: {
          rules: [{ label: 'SEXUAL_HARASSMENT', action: 'flag' }],
        },
        ai_image_config: {
          rules: [
            {
              label: 'Non-Explicit Nudity',
              action: 'flag',
              min_confidence: 50,
            },
          ],
        },
      });
      // #endregion snippet

      const { config } = await client.moderation.getConfig({
        key: configKey,
        team: teamA,
      });
      expect(config?.team).toBe(teamA);
      expect(
        config?.ai_text_config?.rules?.map(({ label, action }) => ({
          label,
          action,
        })),
      ).toEqual([{ label: 'SEXUAL_HARASSMENT', action: 'flag' }]);
      expect(
        config?.ai_image_config?.rules?.map(({ label, action }) => ({
          label,
          action,
        })),
      ).toEqual([{ label: 'Non-Explicit Nudity', action: 'flag' }]);
      // A team policy is only found with its team.
      const error: unknown = await client.moderation
        .getConfig({ key: configKey })
        .then(() => undefined)
        .catch((e: unknown) => e);
      expect(isNotFound(error)).toBe(true);
    });

    it('queries team policies', async () => {
      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="Using Server side integration" tab="Node.js" index=1
      // COPY: teamA="team-a"
      // Get all the moderation configs for all the teams
      const { configs, next } = await client.moderation.queryModerationConfigs({
        limit: 2,
      });

      // Get all the moderation configs for the team `team-a`
      const { configs: teamConfigs, next: teamNext } =
        await client.moderation.queryModerationConfigs({
          filter: { team: teamA },
          sort: [{ field: 'created_at', direction: -1 }],
          limit: 2,
        });
      // #endregion snippet

      expect(configs.length).toBeLessThanOrEqual(2);
      // The API returns no `next` cursor here, although the app has more configs.
      expect(next ?? '').toBeTypeOf('string');
      // Newest first: the "creates a team policy" one, then the older one from setup.
      expect(teamConfigs.map((c) => c.key)).toEqual([
        configKey,
        olderConfigKey,
      ]);
      expect(teamConfigs.every((c) => c.team === teamA)).toBe(true);
      expect(teamNext).toBeUndefined();
    });

    it('queries the team review queue', async () => {
      // Flagged content by a team-a user puts that user in the review queue,
      // with the user's teams.
      const flagged = await retry(async () => {
        const response = await client.moderation.check({
          entity_type: 'stream:chat:v1:message',
          entity_id: uniqueId('message'),
          entity_creator_id: author,
          config_key: reviewConfigKey,
          moderation_payload: { texts: ['please quuxify this'] },
        });
        if (response.recommended_action !== 'flag') {
          throw new Error(`not flagged yet: ${response.recommended_action}`);
        }
        return response;
      });
      expect(flagged.recommended_action).toBe('flag');
      const item = await retry(async () => {
        const { items } = await client.moderation.queryReviewQueue({
          filter: { entity_type: 'stream:user', entity_id: author },
        });
        if (items.length !== 1) throw new Error('not in the review queue yet');
        return items[0];
      });
      expect(item.teams).toEqual([teamA]);

      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="Server Side Integration" tab="Node.js" index=2
      // COPY: teamA="team-a", teamB="team-b"
      // Get all the review queue for all the teams
      const { items, next } = await client.moderation.queryReviewQueue({
        limit: 2,
      });

      // Get all the review queue for the team `team-a`
      const { items: teamItems, next: teamNext } =
        await client.moderation.queryReviewQueue({
          filter: { teams: teamA },
          sort: [{ field: 'created_at', direction: -1 }],
          limit: 2,
        });

      // Get all the review queue for the team `team-a` and `team-b`
      const { items: multiTeamItems, next: multiTeamNext } =
        await client.moderation.queryReviewQueue({
          filter: { teams: { $in: [teamA, teamB] } },
          sort: [{ field: 'created_at', direction: -1 }],
          limit: 2,
        });
      // #endregion snippet

      expect(items.length).toBeLessThanOrEqual(2);
      expect(next ?? '').toBeTypeOf('string');
      expect(teamItems.map((i) => i.id)).toEqual([item.id]);
      expect(teamNext).toBeFalsy();
      expect(multiTeamItems.map((i) => i.id)).toEqual([item.id]);
      expect(multiTeamNext).toBeFalsy();
    });

    it('creates a team blocklist', async () => {
      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="Create a Team Level Blocklist" tab="Node.js" index=1
      // COPY: myBlocklist="myblocklist", teamA="team-a"
      await client.createBlockList({
        name: myBlocklist,
        team: teamA,
        words: ['bad-word-1', 'bad-word-2'],
        type: 'word',
      });
      // #endregion snippet

      const { blocklist } = await client.getBlockList({
        name: myBlocklist,
        team: teamA,
      });
      expect(blocklist?.team).toBe(teamA);
      expect(blocklist?.type).toBe('word');
      expect(blocklist?.words).toEqual(['bad-word-1', 'bad-word-2']);
    });

    it('updates a team blocklist', async () => {
      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="Update a Team Level Blocklist" tab="Node.js" index=1
      // COPY: myBlocklist="myblocklist", teamA="team-a"
      await client.updateBlockList({
        name: myBlocklist,
        words: ['test3', 'test4'],
        team: teamA,
      });
      // #endregion snippet

      const { blocklist } = await client.getBlockList({
        name: myBlocklist,
        team: teamA,
      });
      expect(blocklist?.words).toEqual(['test3', 'test4']);
    });

    it('deletes a team blocklist', async () => {
      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="Delete a Team Level Blocklist" tab="Node.js" index=1
      // COPY: myBlocklist="myblocklist", teamA="team-a"
      await client.deleteBlockList({
        name: myBlocklist,
        team: teamA,
      });
      // #endregion snippet

      await retry(async () => {
        const error: unknown = await client
          .getBlockList({ name: myBlocklist, team: teamA })
          .then(() => undefined)
          .catch((e: unknown) => e);
        if (!isNotFound(error)) throw new Error('blocklist still there');
      });
    });

    it.skip('BLOCKED: ListBlockLists with team fails with code 4 "Multi-tenant blocklist is not enabled for this app"', async () => {
      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="List Blocklists" tab="Node.js" index=1
      // COPY: teamA="team-a"
      // List global blocklists
      const globalBlocklists = await client.listBlockLists();

      // List team specific blocklists
      const teamBlocklists = await client.listBlockLists({ team: teamA });
      // #endregion snippet

      expect(globalBlocklists.blocklists.map((b) => b.name)).not.toContain(
        teamBlocklist,
      );
      expect(teamBlocklists.blocklists.map((b) => b.name)).toContain(
        teamBlocklist,
      );
    });

    it('uses team and global blocklists in a team policy', async () => {
      const upsertConfig = client.moderation.upsertConfig.bind(
        client.moderation,
      );
      vi.spyOn(client.moderation, 'upsertConfig').mockImplementation(
        (request) =>
          retry(() => upsertConfig(request), { retryIf: isBlocklistMissing }),
      );

      // #region snippet docs="moderation/_default/10-multitenancy/01-multitenancy.md" heading="Using Blocklists in Team Level Moderation Configuration" tab="Node.js" index=1
      // COPY: configKey="chat:messaging", teamA="team-a", teamBlocklist="my_team_blocklist", globalBlocklist="my_global_blocklist"
      await client.moderation.upsertConfig({
        key: configKey,
        team: teamA,
        block_list_config: {
          rules: [
            // team level blocklist
            {
              name: teamBlocklist,
              team: teamA,
              action: 'remove',
            },
            // global blocklist
            {
              name: globalBlocklist,
              action: 'flag',
            },
          ],
        },
      });
      // #endregion snippet

      const { config } = await client.moderation.getConfig({
        key: configKey,
        team: teamA,
      });
      expect(
        config?.block_list_config?.rules?.map(({ name, team, action }) => ({
          name,
          team,
          action,
        })),
      ).toEqual([
        { name: teamBlocklist, team: teamA, action: 'remove' },
        { name: globalBlocklist, team: '', action: 'flag' },
      ]);

      // API behavior (2026-10-16): a team policy is not applied by `check` with
      // `config_team` (nor to messages in team channels): a word of its global
      // blocklist is kept, while the same rule in a policy without a team flags it
      // (the review queue test above).
      const { recommended_action } = await client.moderation.check({
        entity_type: 'stream:chat:v1:message',
        entity_id: uniqueId('message'),
        entity_creator_id: author,
        config_key: configKey,
        config_team: teamA,
        moderation_payload: { texts: ['please quuxify'] },
      });
      expect(recommended_action).toBe('keep');
    });
  });
});
