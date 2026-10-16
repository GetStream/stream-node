import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type {
  QueryCallsResponse,
  QueryChannelsResponse,
  QueryUsersResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import {
  waitForAppSetting,
  waitForTeamIdSupport,
} from '../../../helpers/server';

const DOCS = 'platform/02-identity-and-access/04-multi-tenancy.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  /** Teams are plain strings, not resources: `uniqueId` names keep the team queries to this file's data. */
  const redTeam = uniqueId('red');
  const blueTeam = uniqueId('blue');
  /** Used only to wait for multi-tenancy to settle (`waitForTeamIdSupport`). */
  const probeTeam = uniqueId('probe');

  /** Deletes a call (hard), ignoring "not found". */
  const registerCall = (type: string, id: string) =>
    cleanup.add(async () => {
      try {
        await client.video.call(type, id).delete({ hard: true });
      } catch (error) {
        if (!(error instanceof Error && /not.?found|404/i.test(error.message)))
          throw error;
      }
    });

  const enableMultiTenancy = async () => {
    await waitForAppSetting(client, 'multi_tenant_enabled', true);
    await waitForTeamIdSupport(client, probeTeam, true);
  };

  beforeAll(async () => {
    const { app } = await client.getApp();
    const original = app.multi_tenant_enabled;
    // Registered first, so it runs after every other custom cleanup step
    // (the team calls are deleted while multi-tenancy is still on).
    cleanup.add(async () => {
      await client.updateApp({ multi_tenant_enabled: original });
      await waitForAppSetting(client, 'multi_tenant_enabled', original);
      await waitForTeamIdSupport(client, probeTeam, original);
    });
  });

  afterAll(() => cleanup.run());
  afterEach(() => vi.restoreAllMocks());

  it('enables teams', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="Enable Teams for your application" tab="Node.js" index=1
    // shows the current status
    const appSettings = await client.getApp();
    console.log(appSettings.app.multi_tenant_enabled);

    // enables teams
    await client.updateApp({
      multi_tenant_enabled: true,
    });
    // #endregion snippet

    expect(log.mock.calls[0]).toEqual([appSettings.app.multi_tenant_enabled]);
    await enableMultiTenancy();
    const { app } = await client.getApp();
    expect(app.multi_tenant_enabled).toBe(true);
  });

  describe('with multi-tenancy', () => {
    const sara = uniqueId('sara');
    const creator = uniqueId('creator');
    const nickRed = uniqueId('nick-red');
    const nickNoTeam = uniqueId('nick-no-team');
    const tomNoTeam = uniqueId('tom-no-team');
    const tomBlue = uniqueId('tom-blue');
    const jane = uniqueId('jane');
    /** Shared `name`s of the user search snippet ("Nick", "Tom"). */
    const nick = uniqueId('nick');
    const tom = uniqueId('tom');

    /** A red team channel and a channel without a team for the channel queries. */
    const redChannelId = uniqueId('red-channel');
    const plainChannelId = uniqueId('plain-channel');
    /** A blue team call and a call without a team for the call queries. */
    const blueCallId = uniqueId('blue-call');
    const plainCallId = uniqueId('plain-call');

    beforeAll(async () => {
      // The "enables teams" test turns it on; make sure, in case it was run alone.
      await client.updateApp({ multi_tenant_enabled: true });
      await enableMultiTenancy();

      cleanup.users.push(
        sara,
        creator,
        nickRed,
        nickNoTeam,
        tomNoTeam,
        tomBlue,
        jane,
      );
      await client.upsertUsers([
        { id: creator, teams: [redTeam, blueTeam] },
        { id: nickRed, name: nick, teams: [redTeam] },
        { id: nickNoTeam, name: nick },
        { id: tomNoTeam, name: tom },
        { id: tomBlue, name: tom, teams: [blueTeam] },
      ]);

      cleanup.channels.push(
        `messaging:${redChannelId}`,
        `messaging:${plainChannelId}`,
      );
      await client.chat
        .channel('messaging', redChannelId)
        .getOrCreate({ data: { team: redTeam, created_by_id: creator } });
      await client.chat
        .channel('messaging', plainChannelId)
        .getOrCreate({ data: { created_by_id: creator } });

      registerCall('default', blueCallId);
      await client.video
        .call('default', blueCallId)
        .create({ data: { team: blueTeam, created_by_id: creator } });
      registerCall('default', plainCallId);
      await client.video
        .call('default', plainCallId)
        .create({ data: { created_by_id: creator } });
    });

    it('creates users with teams', async () => {
      const userId = sara;

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="User teams" tab="Node.js" index=1
      // COPY: userId="<user id>", redTeam="red", blueTeam="blue"
      await client.upsertUsers([
        {
          id: userId,
          name: 'Sara',
          teams: [redTeam, blueTeam],
        },
      ]);
      // #endregion snippet

      const { users } = await client.queryUsers({
        payload: { filter_conditions: { id: sara } },
      });
      expect(users[0]?.name).toBe('Sara');
      expect([...(users[0]?.teams ?? [])].sort()).toEqual(
        [redTeam, blueTeam].sort(),
      );
    });

    it('creates a channel with a team', async () => {
      const redGeneral = uniqueId('red-general');
      const userId = creator;
      cleanup.channels.push(`messaging:${redGeneral}`);

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="Creating chat channels with a team" tab="Node.js" index=1
      // COPY: redGeneral="red-general", redTeam="red", userId="<user_id>"
      // Creates the channel red-general for team red
      const channel = client.chat.channel('messaging', redGeneral);
      await channel.getOrCreate({
        data: { team: redTeam, created_by_id: userId },
      });
      // #endregion snippet

      const { channels } = await client.chat.queryChannels({
        filter_conditions: { cid: `messaging:${redGeneral}` },
      });
      expect(channels).toHaveLength(1);
      expect(channels[0]?.channel?.team).toBe(redTeam);
      expect(channels[0]?.channel?.created_by?.id).toBe(creator);
    });

    it('creates a call with a team', async () => {
      const redTeamWeekly = uniqueId('red-team-weekly');
      const userId = creator;
      registerCall('default', redTeamWeekly);

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="Creating video calls with a team" tab="Node.js" index=1
      // COPY: redTeamWeekly="red-team-weekly", redTeam="red", userId="<user_id>"
      await client.video.call('default', redTeamWeekly).create({
        data: { team: redTeam, created_by_id: userId },
      });
      // #endregion snippet

      const { call } = await client.video.call('default', redTeamWeekly).get();
      expect(call.team).toBe(redTeam);
      expect(call.created_by.id).toBe(creator);
    });

    it('searches users by team', async () => {
      const queryUsers = vi.spyOn(client, 'queryUsers');

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="User search" tab="Node.js" index=1
      // COPY: nick="Nick", tom="Tom", redTeam="red", blueTeam="blue"
      // search for users by name and team
      await client.queryUsers({
        payload: {
          filter_conditions: {
            name: nick,
            teams: { $in: [redTeam, blueTeam] },
          },
        },
      });

      // search for users that are not part of any team
      await client.queryUsers({
        payload: {
          filter_conditions: {
            name: tom,
            teams: null,
          },
        },
      });
      // #endregion snippet

      const [byTeam, noTeam] = await Promise.all(
        queryUsers.mock.results.map(
          (r) => r.value as Promise<QueryUsersResponse>,
        ),
      );
      expect(byTeam?.users.map((u) => u.id)).toEqual([nickRed]);
      expect(noTeam?.users.map((u) => u.id)).toEqual([tomNoTeam]);
    });

    it('queries channels by team', async () => {
      const queryChannels = vi.spyOn(client.chat, 'queryChannels');

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="Querying chat channels" tab="Node.js" index=1
      // COPY: redTeam="red"
      // server-side queries are not limited to the teams of a user
      // query all channels from all teams
      await client.chat.queryChannels({ filter_conditions: {} });

      // query all channels of a team
      await client.chat.queryChannels({ filter_conditions: { team: redTeam } });

      // query all channels with no teams
      await client.chat.queryChannels({
        filter_conditions: { team: { $eq: null } },
      });
      // #endregion snippet

      const [all, red, none] = await Promise.all(
        queryChannels.mock.results.map(
          (r) => r.value as Promise<QueryChannelsResponse>,
        ),
      );
      expect(all?.channels.length).toBeGreaterThan(0);
      const redIds = red?.channels.map((c) => c.channel?.id) ?? [];
      expect(redIds).toContain(redChannelId);
      expect(red?.channels.every((c) => c.channel?.team === redTeam)).toBe(
        true,
      );
      expect(none?.channels.length).toBeGreaterThan(0);
      expect(none?.channels.every((c) => !c.channel?.team)).toBe(true);
    });

    it('queries calls by team', async () => {
      const queryCalls = vi.spyOn(client.video, 'queryCalls');

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="Querying video calls" tab="Node.js" index=1
      // COPY: blueTeam="blue"
      // All calls
      await client.video.queryCalls();

      // Calls without team
      await client.video.queryCalls({
        filter_conditions: {
          team: null,
        },
      });

      // Calls with specific team
      await client.video.queryCalls({
        filter_conditions: {
          team: blueTeam,
        },
      });
      // #endregion snippet

      const [all, none, blue] = await Promise.all(
        queryCalls.mock.results.map(
          (r) => r.value as Promise<QueryCallsResponse>,
        ),
      );
      expect(all?.calls.length).toBeGreaterThan(0);
      expect(none?.calls.length).toBeGreaterThan(0);
      expect(none?.calls.every((c) => !c.call.team)).toBe(true);
      expect(blue?.calls.map((c) => c.call.id)).toEqual([blueCallId]);
    });

    it('sets team based roles', async () => {
      const janeId = jane;

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="Team based roles" tab="Node.js" index=1
      // COPY: janeId="Jane"
      await client.upsertUsers([
        {
          id: janeId,
          role: 'user',
          teams: ['red', 'blue'],
          teams_role: {
            red: 'admin',
            blue: 'user',
          },
        },
      ]);
      // #endregion snippet

      const { users } = await client.queryUsers({
        payload: { filter_conditions: { id: jane } },
      });
      expect(users[0]?.role).toBe('user');
      expect(users[0]?.teams_role).toEqual({ red: 'admin', blue: 'user' });
    });

    it('queries team usage stats', async () => {
      const pageSize = 1; // so the docs' pagination branch runs
      const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      // #region snippet docs="platform/02-identity-and-access/04-multi-tenancy.md" heading="Querying Team Usage Stats" tab="Node.js" index=1
      // COPY: pageSize=10
      // Query current month's stats
      const currentMonth = await client.chat.queryTeamUsageStats();

      // Query specific month
      const january = await client.chat.queryTeamUsageStats({
        month: '2024-01',
      });

      // Query date range
      const dateRange = await client.chat.queryTeamUsageStats({
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });

      // With pagination
      const response = await client.chat.queryTeamUsageStats({
        limit: pageSize,
      });
      if (response.next) {
        const nextPage = await client.chat.queryTeamUsageStats({
          limit: pageSize,
          next: response.next,
        });
        console.log(nextPage.teams);
      }
      // #endregion snippet

      for (const stats of [currentMonth, january, dateRange, response]) {
        expect(Array.isArray(stats.teams)).toBe(true);
        expect(stats.teams.length).toBeLessThanOrEqual(30);
      }
      // Monthly mode: totals only, no daily breakdown.
      expect(january.teams.every((t) => !t.users_daily.daily)).toBe(true);
      // The test app returns no rows at all (not even the docs' team "" row: an API
      // behavior issue), so the pagination branch only runs once it does.
      expect(response.teams.length).toBeLessThanOrEqual(pageSize);
      expect(log).toHaveBeenCalledTimes(response.next ? 1 : 0);
    });
  });
});
