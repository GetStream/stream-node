import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { nsToMs } from '../../../../../index';
import { StreamError } from '../../../../../index';
import type {
  CampaignResponse,
  CreateSegmentResponse,
  QuerySegmentTargetsResponse,
  StopCampaignResponse,
  UpdateCampaignResponse,
} from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { deletePollsCreatedBy } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'chat/_default/05-features/06-campaign_api.md';

const isNotFound = (error: unknown) =>
  error instanceof StreamError && error.code === 16;

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  // Short ids: campaign channels are named "{{receiver.id}}-{{sender.id}}" (max 64 chars).
  const campaignSender = uniqueId('s');
  const member1 = uniqueId('m');
  const member2 = uniqueId('m');
  const receiver1 = uniqueId('r');
  const receiver2 = uniqueId('r');
  const updatedSender = uniqueId('s');
  const usaReceiver = uniqueId('r');
  const allUserIds = [
    campaignSender,
    member1,
    member2,
    receiver1,
    receiver2,
    updatedSender,
    usaReceiver,
  ];
  /** Custom `country` of `usaReceiver`, in place of the docs' "USA" (other users of the app may have it). */
  const usaCountry = uniqueId('usa');
  /**
   * The docs segment targets every user created after 2020: only target the users of this
   * file. A few seconds earlier than now, in case the server clock is behind.
   */
  const createdAfter = new Date(Date.now() - 5000).toISOString();

  /** A segment with `receiver1` as its only target, and a draft campaign that uses it. */
  const sharedSegmentId = uniqueId('seg');
  const sharedSegmentName = uniqueId('seg-name');
  const listedCampaignId = uniqueId('camp');
  const listedCampaignName = uniqueId('camp-name');

  const campaigns: string[] = [listedCampaignId];
  const segments: string[] = [sharedSegmentId];
  let pollId = '';

  /** Stops (when needed) and deletes a campaign; a running one can't be deleted. */
  const removeCampaign = async (id: string) => {
    try {
      await retry(
        async () => {
          try {
            await client.chat.deleteCampaign({ id });
          } catch (error) {
            if (/in progress/.test(errorMessage(error))) {
              await client.chat.stopCampaign({ id }).catch(() => undefined);
            }
            throw error;
          }
        },
        {
          timeout: 120000,
          interval: 3000,
          retryIf: (error) => /in progress/.test(errorMessage(error)),
        },
      );
    } catch (error) {
      if (!isNotFound(error)) throw error;
    }
  };

  const removeSegment = async (id: string) => {
    try {
      await client.chat.deleteSegment({ id });
    } catch (error) {
      if (!isNotFound(error)) throw error;
    }
  };

  /** Campaigns create channels with ids from the channel template: find them by member. */
  const registerCampaignChannels = async () => {
    const { channels } = await client.chat.queryChannels({
      filter_conditions: { members: { $in: allUserIds } },
      limit: 100,
      state: false,
    });
    for (const { channel } of channels) {
      if (channel && !cleanup.channels.includes(channel.cid)) {
        cleanup.channels.push(channel.cid);
      }
    }
  };

  /**
   * A draft campaign for the "<another-campaign-id>" placeholder: a campaign can only be
   * started once, so the docs' "start now" and "schedule" alternatives need one each.
   */
  const createDraftCampaign = async () => {
    const id = uniqueId('camp');
    campaigns.push(id);
    await client.chat.createCampaign({
      id,
      name: uniqueId('camp-name'),
      user_ids: [receiver2],
      sender_id: campaignSender,
      message_template: { text: 'Hi' },
    });
    return id;
  };

  /** A campaign started "now" is queued as `scheduled` without a future `scheduled_for`. */
  const expectStartedNow = (campaign: CampaignResponse | undefined) => {
    expect(['scheduled', 'in_progress', 'completed']).toContain(
      campaign?.status,
    );
    expect(nsToMs(campaign?.scheduled_for ?? 0)).toBeLessThan(
      Date.now() + 60000,
    );
  };

  /** Captures the segments a region creates without keeping the response. */
  const spyOnCreateSegment = () => vi.spyOn(client.chat, 'createSegment');
  const createdSegments = async (
    spy: ReturnType<typeof spyOnCreateSegment>,
  ) => {
    const responses = await Promise.all(
      spy.mock.results.map((r) => r.value as Promise<CreateSegmentResponse>),
    );
    return responses.flatMap((r) => (r.segment ? [r.segment] : []));
  };

  beforeAll(async () => {
    cleanup.users.push(...allUserIds);
    cleanup.add(() => deletePollsCreatedBy(client, campaignSender));
    // Campaigns first (a segment can't be deleted while a campaign uses it), then the
    // channels the campaigns created, then the segments.
    cleanup.add(async () => {
      for (const id of campaigns) await removeCampaign(id);
      await registerCampaignChannels();
      for (const id of segments) await removeSegment(id);
    });

    await client.upsertUsers([
      ...allUserIds
        .filter((id) => id !== usaReceiver)
        .map((id) => ({ id, name: id })),
      { id: usaReceiver, name: usaReceiver, custom: { country: usaCountry } },
    ]);

    const { poll } = await client.createPoll({
      name: 'Favourite feature?',
      user_id: campaignSender,
      options: [{ text: 'Chat' }, { text: 'Video' }],
    });
    pollId = poll?.id ?? '';

    await client.chat.createSegment({
      type: 'user',
      id: sharedSegmentId,
      name: sharedSegmentName,
    });
    await client.chat.addSegmentTargets({
      id: sharedSegmentId,
      target_ids: [receiver1],
    });
    await client.chat.createCampaign({
      id: listedCampaignId,
      name: listedCampaignName,
      segment_ids: [sharedSegmentId],
      sender_id: campaignSender,
      message_template: { text: 'Hi' },
    });
  });

  afterEach(() => vi.restoreAllMocks());

  afterAll(() => cleanup.run());

  it('sends a campaign', async () => {
    const testSegmentId = uniqueId('seg');
    const testCampaignId = uniqueId('camp');
    const campaignName = uniqueId('camp-name');
    segments.push(testSegmentId);
    campaigns.push(testCampaignId);
    const anotherCampaignId = await createDraftCampaign();

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Sending a Campaign" tab="Node.js" index=1
    // COPY: anotherCampaignId="<another-campaign-id>", testSegmentId="<segment-id>", createdAfter="2020-01-01T00:00:00Z", testCampaignId="<campaign-id>", campaignSender="<user-id-of-sender>", campaignName="Campaign name", pollId="poll-id", member1="user-id-1", member2="user-id-2"
    const segmentId = testSegmentId; // Optional, generated server side when omitted
    // Create a dynamic user segment based on the filter provided.
    // e.g., following segment will include all users created after 2020-01-01
    await client.chat.createSegment({
      type: 'user', // Mandatory, "user" or "channel"
      id: segmentId,
      name: 'New App Users Segment (optional)',
      filter: {
        created_at: {
          $gte: createdAfter,
        },
      },
    });

    const campaignId = testCampaignId; // Optional, generated server side when omitted
    await client.chat.createCampaign({
      id: campaignId,
      // Users targeted by following segment will receive the message
      segment_ids: [segmentId],
      // Alternatively, instead of segment_ids, you can also provide user_ids to send the message to specific users
      // user_ids: ['<user-id-1>', '<user-id-2>'],
      sender_id: campaignSender, // Mandatory
      // Optional, specifies whether to 'exclude' or 'include' the sender from the channel. Omit for the default.
      sender_mode: 'exclude',
      // Optional, controls the visibility of the new channels for the sender ('hidden' or 'archived'). Omit for the default.
      sender_visibility: 'hidden',
      name: campaignName, // Optional
      description: 'Campaign Description', // Optional
      message_template: {
        text: 'Hello {{receiver.name}}!', // Mandatory, message text template
        attachments: [], // Optional, message attachments
        poll_id: pollId, // Optional, send a poll with message
        custom: { promotional: true }, // Optional, custom fields will be added to message object received by the receiver.
      },
      show_channels: true, // Optional, show hidden channels for receiver
      create_channels: true, // Optional, create channel between sender and receiver if not already present
      // channel_template is required if create_channels is true
      channel_template: {
        // Mandatory, channel type
        type: 'messaging',
        // Optional, template for channel id for channel creation
        // if not provided, channel id will be generated on server side
        id: '{{receiver.id}}-{{sender.id}}',
        // Optional, custom fields will be added to channel object
        custom: { promotional: true },
        // Optional, if provided (and multi tenancy is enabled), you can limit accessibility to the channel only to a team
        team: 'kansas-city-chiefs',
        // Optional, if provided following members will be added to each of the newly created channel
        // if not provided, only sender and receiver will be added to the channel
        // You can use this to add e.g., moderator or admin to each newly created channel
        members: [member1, member2],
        // Alternatively, you can use members_template to specify channel roles and custom data for members.
        // members and members_template cannot be used together.
        // members_template: [
        //   {
        //     user_id: 'user-id-1',
        //     channel_role: 'channel_moderator', // Optional
        //     custom: { key1: 'value1' }, // Optional
        //   },
        //   {
        //     user_id: 'user-id-2',
        //     channel_role: 'channel_moderator', // Optional
        //   },
        // ]
      },
    });

    // Start sending messages to targeted users
    await client.chat.startCampaign({ id: campaignId });

    // Alternatively you can also schedule the campaign to start at a later time and stop at a specific time.
    await client.chat.startCampaign({
      id: anotherCampaignId,
      scheduled_for: new Date(Date.now() + 48 * 60 * 60 * 1000),
      stop_at: new Date(Date.now() + 72 * 60 * 60 * 1000),
    });
    // #endregion snippet

    const { segment } = await client.chat.getSegment({ id: testSegmentId });
    expect(segment?.filter).toEqual({ created_at: { $gte: createdAfter } });

    const { campaign } = await client.chat.getCampaign({ id: testCampaignId });
    expect(campaign?.name).toBe(campaignName);
    expect(campaign?.segment_ids).toEqual([testSegmentId]);
    expect(campaign?.sender_id).toBe(campaignSender);
    expect(campaign?.sender_mode).toBe('exclude');
    expect(campaign?.sender_visibility).toBe('hidden');
    expect(campaign?.create_channels).toBe(true);
    expect(campaign?.message_template?.poll_id).toBe(pollId);
    expect(campaign?.channel_template?.members).toEqual([member1, member2]);
    expectStartedNow(campaign);

    const { campaign: scheduled } = await client.chat.getCampaign({
      id: anotherCampaignId,
    });
    expect(scheduled?.status).toBe('scheduled');
    expect(scheduled?.scheduled_for).toEqual(expect.any(Number));
    expect(scheduled?.stop_at).toEqual(expect.any(Number));
  });

  it('updates, starts, stops, deletes and queries a campaign', async () => {
    const testCampaignId = uniqueId('camp');
    const updatedName = uniqueId('camp-name');
    campaigns.push(testCampaignId);
    await client.chat.createCampaign({
      id: testCampaignId,
      name: uniqueId('camp-name'),
      user_ids: [receiver2],
      sender_id: campaignSender,
      message_template: { text: 'Hello {{receiver.name}}!' },
    });
    const updateCampaign = vi.spyOn(client.chat, 'updateCampaign');
    const startCampaign = vi.spyOn(client.chat, 'startCampaign');
    const stopCampaign = vi.spyOn(client.chat, 'stopCampaign');
    const listedSegmentId = sharedSegmentId;
    const encodedNext = '';
    const anotherCampaignId = await createDraftCampaign();

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Sending a Campaign" tab="Node.js" index=2
    // COPY: anotherCampaignId="<another-campaign-id>", testCampaignId="<campaign-id>", sharedSegmentId="a869fc0f-2e7e-4fe0-8651-775c892c1718", updatedSender="Updated-user-id-of-sender", updatedName="Updated name (optional)", listedSegmentId="<segment-id>", encodedNext="<encoded_next>"
    const campaignId = testCampaignId;

    // Check the status of the campaign
    await client.chat.getCampaign({ id: campaignId });

    // Update the campaign data. sender_id and message_template are always required,
    // even when you are only changing one of the other fields.
    await client.chat.updateCampaign({
      id: campaignId,
      segment_ids: [sharedSegmentId],
      sender_id: updatedSender, // mandatory
      sender_mode: 'include', // optional
      sender_visibility: 'archived', // optional
      name: updatedName,
      message_template: {
        text: 'Updated Hello {{receiver.name}}!', // mandatory
      },
    });

    // You can start a campaign immediately, which will start sending messages to the users in the segment(s) immediately.
    await client.chat.startCampaign({ id: anotherCampaignId });

    // Or you can schedule a campaign to start at a later time.
    await client.chat.startCampaign({
      id: campaignId,
      // start campaign in 48 hours; optional, campaign will start running after this time
      scheduled_for: new Date(Date.now() + 48 * 60 * 60 * 1000),
      // automatically stop the campaign after 72 hours; optional
      stop_at: new Date(Date.now() + 72 * 60 * 60 * 1000),
    });

    // Stop the campaign
    await client.chat.stopCampaign({ id: campaignId });

    // Delete the campaign
    await client.chat.deleteCampaign({ id: campaignId });

    // Query campaigns
    const result = await client.chat.queryCampaigns({
      filter: { segments: { $in: [listedSegmentId] } },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 30,
      next: encodedNext,
    });
    // result.campaigns is an array of campaigns
    // result.next is a cursor for the next page of campaigns
    // #endregion snippet

    const [updated] = await Promise.all(
      updateCampaign.mock.results.map(
        (r) => r.value as Promise<UpdateCampaignResponse>,
      ),
    );
    expect(updated).toMatchObject({
      campaign: {
        name: updatedName,
        sender_id: updatedSender,
        sender_mode: 'include',
        segment_ids: [sharedSegmentId],
      },
    });
    expect(startCampaign).toHaveBeenCalledTimes(2);
    const stopped = await (stopCampaign.mock.results[0]
      .value as Promise<StopCampaignResponse>);
    expect(stopped.campaign?.id).toBe(testCampaignId);
    const { campaign: started } = await client.chat.getCampaign({
      id: anotherCampaignId,
    });
    expectStartedNow(started);

    await expect(
      client.chat.getCampaign({ id: testCampaignId }),
    ).rejects.toMatchObject({ code: 16 });
    const ids = result.campaigns.map((c) => c.id);
    expect(ids).toContain(listedCampaignId);
    expect(ids).not.toContain(testCampaignId);
  });

  it('queries campaigns with pagination', async () => {
    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Querying Campaigns" tab="Node.js" index=1
    // Query campaigns with which are scheduled or in progress
    const filter = { status: { $in: ['scheduled', 'in_progress'] } };
    const sort = [{ field: 'created_at', direction: -1 }];

    // query first page
    const { campaigns, next } = await client.chat.queryCampaigns({
      filter,
      sort,
      limit: 10,
    });

    // query next page
    const res = await client.chat.queryCampaigns({
      filter,
      sort,
      limit: 10,
      next,
    });
    // #endregion snippet

    expect(campaigns.length).toBeLessThanOrEqual(10);
    for (const c of [...campaigns, ...res.campaigns]) {
      expect(['scheduled', 'in_progress']).toContain(c.status);
    }
    const firstPageIds = campaigns.map((c) => c.id);
    if (next) {
      for (const c of res.campaigns) expect(firstPageIds).not.toContain(c.id);
    } else {
      // No next page: the second query is the first one again.
      expect(res.campaigns.map((c) => c.id)).toEqual(firstPageIds);
    }
  });

  it('filters campaigns', async () => {
    const otherCampaignId = uniqueId('camp');
    const otherName = uniqueId('camp-name');
    const otherSegmentId = uniqueId('seg');

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Querying Campaigns" tab="Node.js" index=2
    // COPY: listedCampaignId="campaign_id_1", otherCampaignId="campaign_id_2", sharedSegmentId="segment_id_1", otherSegmentId="segment_id_2", listedCampaignName="campaign_name_1", otherName="campaign_name_2", campaignSender="sender_1", updatedSender="sender_2"
    const filterStatus = { status: { $in: ['scheduled', 'in_progress'] } };
    const filterID = { id: { $in: [listedCampaignId, otherCampaignId] } };
    const filterBySegments = {
      segments: { $in: [sharedSegmentId, otherSegmentId] },
    };
    const filterByName = { name: { $in: [listedCampaignName, otherName] } };
    const filterBySender = {
      sender_id: { $in: [campaignSender, updatedSender] },
    };
    const filterByCreated = { created_at: { $gte: '2021-01-01T00:00:00Z' } };
    const filterByUpdated = { updated_at: { $gte: '2021-01-01T00:00:00Z' } };
    // #endregion snippet

    const query = async (filter: Record<string, unknown>) =>
      (await client.chat.queryCampaigns({ filter, limit: 100 })).campaigns.map(
        (c) => c.id,
      );
    // The draft campaign of this file matches every filter except the status one.
    expect(await query(filterStatus)).not.toContain(listedCampaignId);
    for (const filter of [
      filterID,
      filterBySegments,
      filterByName,
      filterBySender,
    ]) {
      expect(await query(filter)).toContain(listedCampaignId);
    }
    for (const filter of [filterByCreated, filterByUpdated]) {
      const { campaigns } = await client.chat.queryCampaigns({
        filter,
        limit: 10,
      });
      expect(campaigns.length).toBeGreaterThan(0);
    }
  });

  it('paginates campaign users', async () => {
    const testCampaignId = uniqueId('camp');
    campaigns.push(testCampaignId);
    await client.chat.createCampaign({
      id: testCampaignId,
      name: uniqueId('camp-name'),
      user_ids: [receiver1, receiver2],
      sender_id: campaignSender,
      message_template: { text: 'Hi' },
    });
    // Two users, one per page, so the second page has something to fetch.
    const pageSize = 1;

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Paginating Campaign Users" tab="Node.js" index=1
    // COPY: testCampaignId="<campaign-id>", pageSize=1000
    // Let's say you have a campaign with 2000 users
    const campaignId = testCampaignId;

    // Fetch campaign with the first 1000 users.
    // limit, next and prev are flat parameters on the request, not nested under `users`.
    const res1 = await client.chat.getCampaign({
      id: campaignId,
      limit: pageSize,
    });
    // The user objects live on the campaign, the page cursors on the response
    const firstPageUsers = res1.campaign?.users;

    // Fetch campaign with the next 1000 users
    const res2 = await client.chat.getCampaign({
      id: campaignId,
      limit: pageSize, // 1000 is max allowed limit
      next: res1.users?.next,
      // or use prev to get the previous page; only one of next and prev is allowed
      // prev: res1.users?.prev,
    });
    const secondPageUsers = res2.campaign?.users;
    // #endregion snippet

    expect(res1.users?.next).toBeTruthy();
    const pages = [firstPageUsers, secondPageUsers].map((users) =>
      (users ?? []).map((u) => u.id),
    );
    expect(pages[0]).toHaveLength(1);
    expect(pages[1]).toHaveLength(1);
    expect([...pages[0], ...pages[1]].sort()).toEqual(
      [receiver1, receiver2].sort(),
    );
  });

  it('creates a user segment', async () => {
    const testSegmentId = uniqueId('seg');
    const segmentName = uniqueId('seg-name');
    segments.push(testSegmentId);

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="User Segments" tab="Node.js" index=1
    // COPY: testSegmentId="<segment_id>", segmentName="segment_name"
    const { segment } = await client.chat.createSegment({
      type: 'user', // mandatory, "user" or "channel"
      id: testSegmentId, // optional, generated server side when omitted
      // everything below is optional
      filter: {
        team: 'commonteam',
      },
      name: segmentName,
      description: 'segment_description',
    });
    // #endregion snippet

    expect(segment?.id).toBe(testSegmentId);
    expect(segment?.type).toBe('user');
    expect(segment?.name).toBe(segmentName);
    expect(segment?.description).toBe('segment_description');
    expect(segment?.filter).toEqual({ team: 'commonteam' });
  });

  it('manages a user segment and its targets', async () => {
    const testSegmentId = uniqueId('seg');
    segments.push(testSegmentId);
    const userIds = [receiver1, receiver2];
    const userId = receiver1;
    const querySegmentTargets = vi.spyOn(client.chat, 'querySegmentTargets');
    const updateSegment = vi.spyOn(client.chat, 'updateSegment');
    const segmentTargetExists = vi.spyOn(client.chat, 'segmentTargetExists');
    const firstTarget = '';
    const encodedNext = '';

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="User Segments" tab="Node.js" index=2
    // COPY: testSegmentId="<segment_id>", firstTarget="<user_id>", encodedNext="<encoded_next>"
    const segmentId = testSegmentId; // optional on create, generated server side when omitted

    await client.chat.createSegment({
      type: 'user', // mandatory
      id: segmentId,
    });

    // Fetch the segment
    await client.chat.getSegment({ id: segmentId });

    // Update the segment. Only name, description and filter can be updated.
    await client.chat.updateSegment({ id: segmentId, name: 'new name' });

    // Add targets. A max of 10,000 users can be added in 1 API call.
    await client.chat.addSegmentTargets({ id: segmentId, target_ids: userIds });

    // Check if a target exists in the segment. Rejects with a 404 when it does not.
    await client.chat.segmentTargetExists({ id: segmentId, target_id: userId });

    // Query targets in the segment
    await client.chat.querySegmentTargets({
      id: segmentId,
      filter: { target_id: { $gte: firstTarget } },
      sort: [{ field: 'target_id', direction: -1 }],
      limit: 10000,
      next: encodedNext, // or prev
    });

    // Remove targets. No error if they don't exist.
    await client.chat.deleteSegmentTargets({
      id: segmentId,
      target_ids: userIds,
    });

    // Delete the segment
    await client.chat.deleteSegment({ id: segmentId });
    // #endregion snippet

    const [updated] = await Promise.all(
      updateSegment.mock.results.map(
        (r) => r.value as ReturnType<typeof client.chat.updateSegment>,
      ),
    );
    expect(updated.segment?.name).toBe('new name');
    expect(segmentTargetExists).toHaveBeenCalledTimes(1);
    const [targets] = await Promise.all(
      querySegmentTargets.mock.results.map(
        (r) => r.value as Promise<QuerySegmentTargetsResponse>,
      ),
    );
    expect(targets.targets.map((t) => t.target_id)).toEqual(
      [...userIds].sort().reverse(),
    );
    await expect(
      client.chat.getSegment({ id: testSegmentId }),
    ).rejects.toMatchObject({ code: 16 });
  });

  it('creates a segment of all users', async () => {
    const everyoneName = uniqueId('everyone');
    const createSegment = spyOnCreateSegment();

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="User Segments" tab="Node.js" index=3
    // COPY: everyoneName="everyone"
    await client.chat.createSegment({
      type: 'user',
      name: everyoneName,
      all_users: true,
    });
    // #endregion snippet

    const [segment] = await createdSegments(createSegment);
    segments.push(segment.id);
    expect(segment.name).toBe(everyoneName);
    expect(segment.all_users).toBe(true);
  });

  it('manages a channel segment and its targets', async () => {
    const channelSegmentId = uniqueId('seg');
    segments.push(channelSegmentId);
    const channelCids: string[] = [];
    for (const name of ['ch-a', 'ch-b']) {
      const channel = client.chat.channel('messaging', uniqueId(name));
      await channel.getOrCreate({ data: { created_by_id: campaignSender } });
      cleanup.channels.push(channel.cid);
      channelCids.push(channel.cid);
    }
    const channelCid = channelCids[0];
    const getSegment = vi.spyOn(client.chat, 'getSegment');
    const segmentTargetExists = vi.spyOn(client.chat, 'segmentTargetExists');

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Channel Segments" tab="Node.js" index=1
    // COPY: channelSegmentId="segmentId"
    // note: channel template is not required for channel segment
    const segmentId = channelSegmentId;

    await client.chat.createSegment({
      type: 'channel',
      id: segmentId,
      name: 'segment_name',
      description: 'segment_description',
      filter: {
        team: 'commonteam',
      },
    });

    await client.chat.getSegment({ id: segmentId });
    await client.chat.addSegmentTargets({
      id: segmentId,
      target_ids: channelCids,
    });
    await client.chat.segmentTargetExists({
      id: segmentId,
      target_id: channelCid,
    });
    await client.chat.deleteSegmentTargets({
      id: segmentId,
      target_ids: channelCids,
    });
    await client.chat.deleteSegment({ id: segmentId });
    // #endregion snippet

    const [fetched] = await Promise.all(
      getSegment.mock.results.map(
        (r) => r.value as ReturnType<typeof client.chat.getSegment>,
      ),
    );
    expect(fetched.segment?.type).toBe('channel');
    expect(fetched.segment?.filter).toEqual({ team: 'commonteam' });
    expect(segmentTargetExists).toHaveBeenCalledTimes(1);
    await expect(
      client.chat.getSegment({ id: channelSegmentId }),
    ).rejects.toMatchObject({ code: 16 });
  });

  it("creates a segment of all the sender's channels", async () => {
    const segmentName = uniqueId('all-chats');
    const createSegment = spyOnCreateSegment();

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Channel Segments" tab="Node.js" index=2
    // COPY: segmentName="All my existing chats"
    await client.chat.createSegment({
      type: 'channel',
      name: segmentName,
      all_sender_channels: true,
    });
    // #endregion snippet

    const [segment] = await createdSegments(createSegment);
    segments.push(segment.id);
    expect(segment.type).toBe('channel');
    expect(segment.name).toBe(segmentName);
    expect(segment.all_sender_channels).toBe(true);
  });

  it('gets a segment', async () => {
    const segmentId = sharedSegmentId;

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Getting Segment" tab="Node.js" index=1
    // The segment type is not needed, the ID identifies the segment on its own
    const response = await client.chat.getSegment({ id: segmentId });
    // #endregion snippet

    expect(response.segment?.id).toBe(sharedSegmentId);
    expect(response.segment?.name).toBe(sharedSegmentName);
    expect(response.segment?.size).toBe(1);
  });

  describe('example: messaging users in the USA', () => {
    const usaSegmentId = uniqueId('seg');
    const usaCampaignId = uniqueId('camp');
    const usaCampaignName = uniqueId('camp-name');
    segments.push(usaSegmentId);
    campaigns.push(usaCampaignId);

    it('creates a segment for users in the USA', async () => {
      // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="**Create a segment for user’s in the USA**" tab="Node.js" index=1
      // COPY: usaSegmentId="<segment-id>", usaCountry="USA"
      const segmentId = usaSegmentId; // optional, generated server side when omitted
      await client.chat.createSegment({
        type: 'user',
        id: segmentId,
        name: 'People in the USA',
        filter: {
          country: usaCountry,
        },
      });
      // #endregion snippet

      const { segment } = await client.chat.getSegment({ id: usaSegmentId });
      expect(segment?.filter).toEqual({ country: usaCountry });
    });

    it('messages the segment', async () => {
      const segmentId = usaSegmentId;
      const startCampaign = vi.spyOn(client.chat, 'startCampaign');
      const anotherCampaignId = await createDraftCampaign();

      // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="**Message the above segment**" tab="Node.js" index=1
      // COPY: anotherCampaignId="<another-campaign-id>", usaCampaignId="<campaign-id>", campaignSender="user-id-of-sender", usaCampaignName="Campaign name (optional)"
      const campaignId = usaCampaignId; // optional, generated server side when omitted
      await client.chat.createCampaign({
        id: campaignId,
        segment_ids: [segmentId],
        sender_id: campaignSender, // mandatory
        name: usaCampaignName,
        description: 'Optional description',
        message_template: {
          text: "Hi {{ receiver.name }} I'm {{ sender.name }}!",
        },
      });
      await client.chat.startCampaign({ id: campaignId });

      // Alternatively you can schedule the campaign to start at a later time.
      // Also you can stop the campaign at a specific time. E.g.,
      await client.chat.startCampaign({
        id: anotherCampaignId,
        scheduled_for: new Date(Date.now() + 48 * 60 * 60 * 1000),
        stop_at: new Date(Date.now() + 72 * 60 * 60 * 1000),
      });
      // #endregion snippet

      expect(startCampaign).toHaveBeenCalledTimes(2);
      const { campaign } = await client.chat.getCampaign({ id: usaCampaignId });
      expect(campaign?.segment_ids).toEqual([usaSegmentId]);
      expectStartedNow(campaign);
      const { campaign: scheduled } = await client.chat.getCampaign({
        id: anotherCampaignId,
      });
      expect(scheduled?.status).toBe('scheduled');
    });

    it('checks the status of the campaign', async () => {
      const campaignId = usaCampaignId;
      const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

      // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="**Check the status of the campaign**" tab="Node.js" index=1
      const res = await client.chat.getCampaign({ id: campaignId });
      console.log(res.campaign?.status); // "draft" | "scheduled" | "stopped" | "completed" | "in_progress"
      // #endregion snippet

      expect(log.mock.calls[0]).toEqual([res.campaign?.status]);
      expectStartedNow(res.campaign);
    });

    it('reads the campaign stats', async () => {
      // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Campaign Stats" tab="Node.js" index=1
      // COPY: usaCampaignId="<campaign-id>"
      const res = await client.chat.getCampaign({ id: usaCampaignId });

      const stats = res.campaign?.stats;
      // stats.stats_started_at
      // stats.stats_completed_at
      // stats.stats_messages_sent
      // stats.stats_channels_created
      // stats.progress
      // stats.stats_users_sent   number of users the campaign message was sent to
      // stats.stats_users_read   number of users who read the campaign message
      // #endregion snippet

      expect(typeof stats?.progress).toBe('number');
      expect(typeof stats?.stats_messages_sent).toBe('number');
      expect(typeof stats?.stats_users_sent).toBe('number');
      expect(stats?.stats_started_at).toEqual(expect.any(Number));
    });
  });

  it('queries segments by name', async () => {
    const encodedNext = '';

    // #region snippet docs="chat/_default/05-features/06-campaign_api.md" heading="Updating a large Segment" tab="Node.js" index=1
    // COPY: sharedSegmentName="<name>", encodedNext="<encoded_next>"
    const response = await client.chat.querySegments({
      filter: { name: sharedSegmentName }, // mandatory, pass {} to match every segment
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 30,
      next: encodedNext,
    });
    // #endregion snippet

    expect(response.segments.map((s) => s.id)).toEqual([sharedSegmentId]);
  });
});
