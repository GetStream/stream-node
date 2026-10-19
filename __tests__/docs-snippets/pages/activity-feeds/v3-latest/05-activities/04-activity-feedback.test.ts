import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { ActivityFeedbackResponse } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS =
  'activity-feeds/v3-latest/_default/05-activities/04-activity-feedback.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

/** Awaits the results of a spied `activityFeedback`. */
const spiedResults = (spy: { mock: { results: { value: unknown }[] } }) =>
  Promise.all(
    spy.mock.results.map((r) => r.value as Promise<ActivityFeedbackResponse>),
  );

describe(DOCS, () => {
  let ownerId: string;

  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A new activity by the owner in the owner's public `user` feed. */
  const createActivity = async () => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${ownerId}`],
      type: 'post',
      text: 'feedback me',
      user_id: ownerId,
    });
    return activity.id;
  };

  /** The activity as `userId` sees it in `queryActivities`, or undefined if not returned. */
  const queryAs = async (
    userId: string,
    activityId: string,
    hidden?: boolean,
  ) => {
    const { activities } = await client.feeds.queryActivities({
      user_id: userId,
      filter: {
        id: activityId,
        // `hidden: { $eq: true }` matches nothing (2026-10-16): use the bare value.
        ...(hidden === undefined ? {} : { hidden }),
      },
    });
    return activities.find((a) => a.id === activityId);
  };

  beforeAll(async () => {
    ownerId = await createUser('owner');
    cleanup.feeds.push(`user:${ownerId}`);
    await client.feeds.feed('user', ownerId).getOrCreate({ user_id: ownerId });
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('hides and unhides an activity', async () => {
    const activityId = await createActivity();
    const jane = await createUser('jane');
    await retry(async () =>
      expect(await queryAs(jane, activityId)).toBeDefined(),
    );
    const feedback = vi.spyOn(client.feeds, 'activityFeedback');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/04-activity-feedback.md" heading="Hide activity" tab="Node.js" index=1
    // COPY: activityId="activity_123", jane="jane"
    await client.feeds.activityFeedback({
      activity_id: activityId,
      hide: true,
      user_id: jane,
    });
    // #endregion snippet

    const [hidden] = await spiedResults(feedback);
    expect(hidden.activity_id).toBe(activityId);
    // Hidden for jane: only returned with a `hidden` filter, flagged `hidden`.
    await retry(async () => {
      expect(await queryAs(jane, activityId)).toBeUndefined();
      expect((await queryAs(jane, activityId, true))?.hidden).toBe(true);
    });
    // Jane's read of the owner's feed leaves it out.
    const janeRead = await client.feeds
      .feed('user', ownerId)
      .getOrCreate({ user_id: jane });
    expect(janeRead.activities.map((a) => a.id)).not.toContain(activityId);
    // Not hidden for the owner.
    expect(await queryAs(ownerId, activityId)).toBeDefined();
    feedback.mockClear();

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/04-activity-feedback.md" heading="Hide activity" tab="Node.js" index=2
    // COPY: activityId="activity_123", jane="jane"
    await client.feeds.activityFeedback({
      activity_id: activityId,
      hide: false,
      user_id: jane,
    });
    // #endregion snippet

    const [unhidden] = await spiedResults(feedback);
    expect(unhidden.activity_id).toBe(activityId);
    await retry(async () => {
      const activity = await queryAs(jane, activityId);
      expect(activity).toBeDefined();
      expect(activity?.hidden).toBeFalsy();
    });
  });

  it('asks for more and less similar content', async () => {
    const activityId = await createActivity();
    const jane = await createUser('jane');
    const feedback = vi.spyOn(client.feeds, 'activityFeedback');

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/04-activity-feedback.md" heading="Show more/less similar content" tab="Node.js" index=1
    // COPY: activityId="activity_123", jane="jane"
    await client.feeds.activityFeedback({
      activity_id: activityId,
      show_more: true,
      user_id: jane,
    });
    // #endregion snippet

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/04-activity-feedback.md" heading="Show more/less similar content" tab="Node.js" index=2
    // COPY: activityId="activity_123", jane="jane"
    await client.feeds.activityFeedback({
      activity_id: activityId,
      show_less: true,
      user_id: jane,
    });
    // #endregion snippet

    // #region snippet docs="activity-feeds/v3-latest/_default/05-activities/04-activity-feedback.md" heading="Show more/less similar content" tab="Node.js" index=3
    // COPY: activityId="activity_123", jane="jane"
    // Undo show more feedback
    await client.feeds.activityFeedback({
      activity_id: activityId,
      show_more: false,
      user_id: jane,
    });

    // Undo show less feedback
    await client.feeds.activityFeedback({
      activity_id: activityId,
      show_less: false,
      user_id: jane,
    });
    // #endregion snippet

    const results = await spiedResults(feedback);
    expect(results.map((r) => r.activity_id)).toEqual([
      activityId,
      activityId,
      activityId,
      activityId,
    ]);
    // Show more/less doesn't hide anything.
    expect(await queryAs(jane, activityId)).toBeDefined();
  });
});
