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
  AddActivityResponse,
  CreateMembershipLevelResponse,
  MembershipLevelResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/04-feeds-and-follows/05-membership-levels.md';

const client = getServerClient();
const serverClient = client;
const cleanup = new Cleanup(client);

// Membership levels are app-wide and not in the leak check: every id comes
// from `uniqueId`, is deleted after the feeds (a level in use by a feed member
// can't be deleted) and checked to be gone afterwards.
const levelIds: string[] = [];
const uuidv4 = () => {
  const id = uniqueId('level');
  levelIds.push(id);
  return id;
};
const deleteLevels = async () => {
  for (const id of levelIds) {
    await retry(
      () =>
        client.feeds.deleteMembershipLevel({ id }).catch((error: unknown) => {
          if (!String(error).includes("can't be found")) throw error;
        }),
      { timeout: 30000, retryIf: (e) => String(e).includes('in use') },
    );
  }
};

const levelsById = async () =>
  (
    await client.feeds.queryMembershipLevels({
      filter: { id: { $in: levelIds } },
      limit: 25,
    })
  ).membership_levels;

const creatorId = uniqueId('creator');
const premiumFanId = uniqueId('premium-fan');
const viewerId = uniqueId('viewer');
const creator = { id: creatorId };
const premiumFan = { id: premiumFanId };
const creatorFeed = client.feeds.feed('user', creatorId);

let premiumMembershipLevel: MembershipLevelResponse;
let innerCircleMembershipLevel: MembershipLevelResponse;

describe(DOCS, () => {
  beforeAll(async () => {
    cleanup.users.push(creatorId, premiumFanId, viewerId);
    await client.upsertUsers([
      { id: creatorId },
      { id: premiumFanId },
      { id: viewerId },
    ]);
    cleanup.feeds.push(creatorFeed.feed);
    await creatorFeed.getOrCreate({ user_id: creatorId });
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(async () => {
    try {
      await cleanup.run();
    } finally {
      await deleteLevels();
    }
    expect(levelIds.length).toBeGreaterThan(0);
    expect(await levelsById()).toEqual([]);
  });

  it('creates membership levels', async () => {
    const create = vi.spyOn(serverClient.feeds, 'createMembershipLevel');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/05-membership-levels.md" heading="Create membership levels" tab="Node.js" index=1
    await serverClient.feeds.createMembershipLevel({
      id: uuidv4(),
      name: 'Premium',
      description: 'Weekly QA with me',
      custom: {
        // Lets you query membership levels by creator.id, useful if you want to scope membership levels to users
        creator_id: creator.id,
      },
      // Lets you sort membership levels by priority
      priority: 100,
      // Users with this membership level can see activities with these tags
      tags: ['premium'],
    });

    await serverClient.feeds.createMembershipLevel({
      id: uuidv4(),
      name: 'Inner Circle',
      description: `You can see new videos a week earlier, and weekly QA with me`,
      // Users in this membership level can see premium and inner circle content as well
      tags: ['premium', 'inner-circle'],
      priority: 200,
      custom: {
        creator_id: creator.id,
      },
    });
    // #endregion snippet

    const [premium, innerCircle] = await Promise.all(
      create.mock.results.map(
        async (r) =>
          (await (r.value as Promise<CreateMembershipLevelResponse>))
            .membership_level,
      ),
    );
    premiumMembershipLevel = premium;
    innerCircleMembershipLevel = innerCircle;
    expect(premium).toMatchObject({
      id: levelIds[0],
      name: 'Premium',
      priority: 100,
      tags: ['premium'],
      custom: { creator_id: creatorId },
    });
    expect(innerCircle).toMatchObject({
      id: levelIds[1],
      name: 'Inner Circle',
      priority: 200,
      tags: ['premium', 'inner-circle'],
    });
    expect((await levelsById()).map((l) => l.id).sort()).toEqual(
      [...levelIds].sort(),
    );
  });

  it('assigns a membership level to a user', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/05-membership-levels.md" heading="Assign membership level to users" tab="Node.js" index=1
    await serverClient.feeds.updateFeedMembers({
      feed_group_id: creatorFeed.group,
      feed_id: creatorFeed.id,
      operation: 'upsert',
      members: [
        {
          user_id: premiumFan.id,
          membership_level: premiumMembershipLevel.id,
          role: 'feed_member_viewer',
        },
      ],
    });
    // #endregion snippet

    const { members } = await creatorFeed.queryFeedMembers({});
    expect(
      members.map((m) => ({
        user: m.user.id,
        role: m.role,
        level: m.membership_level?.id,
        status: m.status,
      })),
    ).toEqual([
      {
        user: premiumFanId,
        role: 'feed_member_viewer',
        level: premiumMembershipLevel.id,
        status: 'member',
      },
    ]);
  });

  it('creates a premium activity', async () => {
    const creatorFid = creatorFeed.feed;
    const userId = creatorId;
    const addActivity = vi.spyOn(client.feeds, 'addActivity');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/05-membership-levels.md" heading="Create a premium activity" tab="Node.js" index=1
    // COPY: creatorFid="user:1", userId="<user id>"
    await client.feeds.addActivity({
      feeds: [creatorFid],
      type: 'post',
      text: 'Premium content',
      visibility: 'tag',
      visibility_tag: 'premium',
      user_id: userId,
    });
    // Premium users can see full activity, others a preview
    // #endregion snippet

    const { activity } = await (addActivity.mock.results[0]
      .value as Promise<AddActivityResponse>);
    expect(activity).toMatchObject({
      visibility: 'tag',
      visibility_tag: 'premium',
    });

    // The premium member gets the full activity, a non-member a preview.
    const previews = async (user_id: string) =>
      (await creatorFeed.getOrCreate({ user_id })).activities.map((a) => ({
        preview: a.preview,
        text: a.text,
      }));
    await retry(async () => {
      expect(await previews(premiumFanId)).toEqual([
        { preview: false, text: 'Premium content' },
      ]);
    });
    const asViewer = await previews(viewerId);
    expect(asViewer.map((a) => a.preview)).toEqual([true]);
  });

  it('queries membership levels', async () => {
    const query = vi.spyOn(serverClient.feeds, 'queryMembershipLevels');

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/05-membership-levels.md" heading="Query membership levels" tab="Node.js" index=1
    await serverClient.feeds.queryMembershipLevels({
      filter: {
        custom: {
          $contains: {
            creator_id: creator.id,
          },
        },
      },
      sort: [{ field: 'priority', direction: -1 }],
    });
    // #endregion snippet

    const { membership_levels } = await (query.mock.results[0]
      .value as ReturnType<typeof client.feeds.queryMembershipLevels>);
    expect(membership_levels.map((l) => l.id)).toEqual([
      innerCircleMembershipLevel.id,
      premiumMembershipLevel.id,
    ]);
  });

  it('updates a membership level', async () => {
    // API behavior: a level that was ever assigned to a feed member can't be
    // updated (500, code -1, empty message), even after the member is removed.
    // Record that error and show the same request works on a level that was
    // never assigned.
    const updateMembershipLevel = client.feeds.updateMembershipLevel.bind(
      client.feeds,
    );
    const errors: unknown[] = [];
    vi.spyOn(serverClient.feeds, 'updateMembershipLevel').mockImplementation(
      async (request) => {
        try {
          return await updateMembershipLevel(request);
        } catch (error) {
          errors.push(error);
          return undefined as never;
        }
      },
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/05-membership-levels.md" heading="Update membership levels" tab="Node.js" index=1
    await serverClient.feeds.updateMembershipLevel({
      id: premiumMembershipLevel.id,
      name: 'Premium',
      description: 'Weekly QA with me',
      custom: {
        creator_id: creator.id,
      },
      priority: 100,
      tags: ['premium'],
    });
    // #endregion snippet

    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({
      code: -1,
      metadata: { responseCode: 500 },
    });

    const neverAssignedId = uuidv4();
    await client.feeds.createMembershipLevel({
      id: neverAssignedId,
      name: 'Old name',
      description: 'Old description',
      priority: 1,
      tags: ['old'],
    });
    const { membership_level } = await updateMembershipLevel({
      id: neverAssignedId,
      name: 'Premium',
      description: 'Weekly QA with me',
      custom: {
        creator_id: creator.id,
      },
      priority: 100,
      tags: ['premium'],
    });
    expect(membership_level).toMatchObject({
      id: neverAssignedId,
      name: 'Premium',
      description: 'Weekly QA with me',
      custom: { creator_id: creatorId },
      priority: 100,
      tags: ['premium'],
    });
  });

  it('deletes a membership level', async () => {
    // A level in use by a feed member can't be deleted (code 17 "Cannot delete
    // membership level that is currently in use by feed members").
    await creatorFeed.updateFeedMembers({
      operation: 'remove',
      members: [{ user_id: premiumFanId }],
    });

    // #region snippet docs="activity-feeds/v3-latest/_default/04-feeds-and-follows/05-membership-levels.md" heading="Delete membership level" tab="Node.js" index=1
    await serverClient.feeds.deleteMembershipLevel({
      id: premiumMembershipLevel.id,
    });
    // #endregion snippet

    await retry(async () => {
      expect((await levelsById()).map((l) => l.id)).not.toContain(
        premiumMembershipLevel.id,
      );
    });
    expect((await levelsById()).map((l) => l.id)).toContain(
      innerCircleMembershipLevel.id,
    );
  });
});
