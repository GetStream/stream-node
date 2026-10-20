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
  CreatePollRequest,
  PollResponse,
  PollVoteResponse,
  PollVotesResponse,
  QueryPollsResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { deletePollsCreatedBy } from '../../../../helpers/server';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/08-polls.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  // The docs' "<user id>": owns the feed and creates every poll.
  const userId = uniqueId('poll-owner');
  const voterId = uniqueId('poll-voter');
  const feed = client.feeds.feed('user', userId);

  beforeAll(async () => {
    cleanup.users.push(userId, voterId);
    cleanup.feeds.push(`user:${userId}`);
    // Polls survive their creator's deletion: delete them before the user.
    cleanup.add(() => deletePollsCreatedBy(client, userId));
    await client.upsertUsers([{ id: userId }, { id: voterId }]);
    await feed.getOrCreate({ user_id: userId });
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  /** A poll created by the owner with two options. */
  const createPoll = async (extra: Partial<CreatePollRequest> = {}) => {
    const { poll } = await client.createPoll({
      name: 'Test poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      user_id: userId,
      ...extra,
    });
    return poll;
  };

  /** A poll attached to an activity in the owner's feed (votes need one). */
  const createPollActivity = async (extra: Partial<CreatePollRequest> = {}) => {
    const poll = await createPoll(extra);
    const { activity } = await client.feeds.addActivity({
      feeds: [feed.feed],
      type: 'post',
      text: 'Vote now',
      poll_id: poll.id,
      user_id: userId,
    });
    return { poll, activityId: activity.id };
  };

  it('Creating a Poll and Sending it as Part of an Activity', async () => {
    const addActivity = vi.spyOn(client.feeds, 'addActivity');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Creating a Poll and Sending it as Part of an Activity" tab="Node.js" index=1
    // COPY: userId="<user id>"
    const response = await client.createPoll({
      name: 'Where should we host our next company event?',
      options: [
        { text: 'Amsterdam, The Netherlands' },
        { text: 'Boulder, CO' },
      ],
      user_id: userId,
    });

    // Attach poll to an activity
    await client.feeds.addActivity({
      feeds: [feed.feed],
      type: 'post',
      poll_id: response.poll.id,
      user_id: userId,
    });
    // #endregion snippet

    expect(response.poll.options.map((o) => o.text)).toEqual([
      'Amsterdam, The Netherlands',
      'Boulder, CO',
    ]);
    const { activity } = await (addActivity.mock.results[0]
      .value as Promise<AddActivityResponse>);
    expect(activity.feeds).toEqual([`user:${userId}`]);
    expect(activity.poll?.id).toBe(response.poll.id);
  });

  it('Overview of the poll and vote models', async () => {
    const createPollSpy = vi.spyOn(client, 'createPoll');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Overview of the poll and vote models" tab="Node.js" index=1
    // COPY: userId="<user id>"
    await client.createPoll({
      name: 'Where should we host our next company event?',
      options: [
        {
          text: 'Amsterdam, The Netherlands',
          custom: {
            country: 'Netherlands',
            timezone: 'CET',
          },
        },
        {
          text: 'Boulder, CO',
          custom: {
            country: 'United States',
            timezone: 'MST',
          },
        },
      ],
      custom: {
        category: 'event_planning',
        priority: 'high',
      },
      user_id: userId,
    });
    // #endregion snippet

    const { poll } = await (createPollSpy.mock.results[0]
      .value as Promise<PollResponse>);
    expect(poll.custom).toMatchObject({
      category: 'event_planning',
      priority: 'high',
    });
    expect(poll.options.map((o) => o.custom)).toEqual([
      { country: 'Netherlands', timezone: 'CET' },
      { country: 'United States', timezone: 'MST' },
    ]);
  });

  it('Send Vote on Option', async () => {
    const { poll, activityId } = await createPollActivity();
    const pollId = poll.id;
    const optionId = poll.options[0].id;
    const castPollVote = vi.spyOn(client.feeds, 'castPollVote');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Send Vote on Option" tab="Node.js" index=1
    // COPY: userId="<user id>", activityId="activity_123", pollId="poll_456", optionId="option_789"
    await client.feeds.castPollVote({
      activity_id: activityId,
      poll_id: pollId,
      user_id: userId,
      vote: {
        option_id: optionId,
      },
    });
    // #endregion snippet

    const { vote } = await (castPollVote.mock.results[0]
      .value as Promise<PollVoteResponse>);
    expect(vote?.option_id).toBe(optionId);
    expect(vote?.user_id).toBe(userId);
    const { poll: after } = await client.getPoll({ poll_id: pollId });
    expect(after.vote_counts_by_option).toEqual({ [optionId]: 1 });
  });

  it('Send an Answer (if answers are configured to be allowed)', async () => {
    const { poll, activityId } = await createPollActivity({
      allow_answers: true,
    });
    const pollId = poll.id;
    const castPollVote = vi.spyOn(client.feeds, 'castPollVote');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Send an Answer (if answers are configured to be allowed)" tab="Node.js" index=1
    // COPY: userId="<user id>", activityId="activity_123", pollId="poll_456"
    await client.feeds.castPollVote({
      activity_id: activityId,
      poll_id: pollId,
      user_id: userId,
      vote: {
        answer_text: `Let's go somewhere else`,
      },
    });
    // #endregion snippet

    const { vote } = await (castPollVote.mock.results[0]
      .value as Promise<PollVoteResponse>);
    expect(vote?.is_answer).toBe(true);
    expect(vote?.answer_text).toBe(`Let's go somewhere else`);
  });

  it('Removing a Vote', async () => {
    const { poll, activityId } = await createPollActivity();
    const pollId = poll.id;
    const optionId = poll.options[0].id;
    const { vote } = await client.feeds.castPollVote({
      activity_id: activityId,
      poll_id: pollId,
      user_id: userId,
      vote: { option_id: optionId },
    });
    const voteId = vote?.id as string;
    expect(voteId).toBeTruthy();

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Removing a Vote" tab="Node.js" index=1
    // COPY: userId="<user id>", activityId="activity_123", pollId="poll_456", voteId="vote_789"
    await client.feeds.deletePollVote({
      activity_id: activityId,
      poll_id: pollId,
      vote_id: voteId,
      user_id: userId,
    });
    // #endregion snippet

    const { votes } = await client.queryPollVotes({
      poll_id: pollId,
      user_id: userId,
    });
    expect(votes).toEqual([]);
  });

  it('Closing a Poll', async () => {
    const pollId = (await createPoll()).id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Closing a Poll" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="poll_456"
    await client.updatePollPartial({
      poll_id: pollId,
      set: {
        is_closed: true,
      },
      user_id: userId,
    });
    // #endregion snippet

    const { poll } = await client.getPoll({ poll_id: pollId });
    expect(poll.is_closed).toBe(true);
  });

  it('Retrieving a Poll', async () => {
    const { poll } = await createPollActivity();
    const pollId = poll.id;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Retrieving a Poll" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="<poll id>"
    const response = await feed.getOrCreate({ user_id: userId });

    console.log(response.activities[0].poll);

    // or use poll id
    const pollResponse = await client.getPoll({
      poll_id: pollId,
      user_id: userId,
    });
    // #endregion snippet

    expect(response.activities[0].poll?.id).toBe(pollId);
    expect(log.mock.calls[0][0]).toMatchObject({ id: pollId });
    expect(pollResponse.poll.id).toBe(pollId);
    expect(pollResponse.poll.name).toBe('Test poll');
  });

  it('Full Update', async () => {
    const created = await createPoll({ description: 'To be reset' });
    const pollId = created.id;
    const optionId = created.options[0].id;
    const option123Id = created.options[1].id;
    const updatePoll = vi.spyOn(client, 'updatePoll');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Full Update" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="poll_456", optionId="option_789", option123Id="option_123"
    await client.updatePoll({
      id: pollId,
      name: 'Where should we host our next company event?',
      options: [
        {
          id: optionId,
          text: 'Amsterdam, The Netherlands',
          custom: {
            reason: 'too expensive',
          },
        },
        {
          id: option123Id,
          text: 'Boulder, CO',
          custom: {
            reason: 'too far',
          },
        },
      ],
      user_id: userId,
    });
    // #endregion snippet

    const { poll } = await (updatePoll.mock.results[0]
      .value as Promise<PollResponse>);
    expect(poll.name).toBe('Where should we host our next company event?');
    // Omitted fields are reset.
    expect(poll.description).toBe('');
    expect(
      poll.options.map((o) => ({ id: o.id, text: o.text, custom: o.custom })),
    ).toEqual([
      {
        id: optionId,
        text: 'Amsterdam, The Netherlands',
        custom: { reason: 'too expensive' },
      },
      { id: option123Id, text: 'Boulder, CO', custom: { reason: 'too far' } },
    ]);
  });

  it('Partial Update', async () => {
    const pollId = (
      await createPoll({ custom: { custom: 'to be unset', keep: 'me' } })
    ).id;
    const updatePollPartial = vi.spyOn(client, 'updatePollPartial');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Partial Update" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="poll_456"
    await client.updatePollPartial({
      poll_id: pollId,
      set: {
        name: 'Updated poll name',
      },
      unset: ['custom'],
      user_id: userId,
    });
    // #endregion snippet

    const { poll } = await (updatePollPartial.mock.results[0]
      .value as Promise<PollResponse>);
    expect(poll.name).toBe('Updated poll name');
    // `unset` names custom properties by their bare name.
    expect(poll.custom).toEqual({ keep: 'me' });
  });

  it('Deleting a Poll', async () => {
    const pollId = (await createPoll()).id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Deleting a Poll" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="poll_456"
    await client.deletePoll({
      poll_id: pollId,
      user_id: userId,
    });
    // #endregion snippet

    const { polls } = await client.queryPolls({
      filter: { id: pollId },
      user_id: userId,
    });
    expect(polls).toEqual([]);
  });

  it('Add Poll Option', async () => {
    const pollId = (await createPoll()).id;
    const optionUserId = userId;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Add Poll Option" tab="Node.js" index=1
    // COPY: optionUserId="user_123", pollId="poll_456"
    await client.createPollOption({
      poll_id: pollId,
      text: 'Another option',
      custom: {
        added_by: optionUserId,
      },
      user_id: optionUserId,
    });
    // #endregion snippet

    const { poll } = await client.getPoll({ poll_id: pollId });
    const added = poll.options.find((o) => o.text === 'Another option');
    expect(added?.custom).toEqual({ added_by: userId });
    expect(poll.options).toHaveLength(3);
  });

  it('Update Poll Option', async () => {
    const created = await createPoll();
    const pollId = created.id;
    const optionId = created.options[1].id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Update Poll Option" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="poll_456", optionId="option_123"
    await client.updatePollOption({
      poll_id: pollId,
      id: optionId,
      text: 'Updated option',
      custom: {
        my_custom_property: 'my_custom_value',
      },
      user_id: userId,
    });
    // #endregion snippet

    const { poll } = await client.getPoll({ poll_id: pollId });
    const updated = poll.options.find((o) => o.id === optionId);
    expect(updated?.text).toBe('Updated option');
    expect(updated?.custom).toEqual({ my_custom_property: 'my_custom_value' });
  });

  it('Delete Poll Option', async () => {
    const created = await createPoll();
    const pollId = created.id;
    const optionId = created.options[0].id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Delete Poll Option" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="poll_456", optionId="option_789"
    await client.deletePollOption({
      poll_id: pollId,
      option_id: optionId,
      user_id: userId,
    });
    // #endregion snippet

    const { poll } = await client.getPoll({ poll_id: pollId });
    expect(poll.options.map((o) => o.id)).toEqual([created.options[1].id]);
  });

  it('Querying Votes', async () => {
    const { poll, activityId } = await createPollActivity({
      options: [{ text: 'A' }, { text: 'B' }, { text: 'C' }],
    });
    const pollId = poll.id;
    const [optionId, option790Id, otherOptionId] = poll.options.map(
      (o) => o.id,
    );
    const vote = async (user_id: string, option_id: string) =>
      (
        await client.feeds.castPollVote({
          activity_id: activityId,
          poll_id: pollId,
          user_id,
          vote: { option_id },
        })
      ).vote?.id;
    const voteIds = [
      await vote(userId, optionId),
      await vote(voterId, option790Id),
    ];
    // A vote on a third option the filter leaves out.
    await vote(voterId, otherOptionId);
    const queryPollVotes = vi.spyOn(client, 'queryPollVotes');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Querying Votes" tab="Node.js" index=1
    // COPY: userId="<user id>", pollId="poll_456", optionId="option_789", option790Id="option_790"
    await client.queryPollVotes({
      filter: {
        option_id: { $in: [optionId, option790Id] },
      },
      user_id: userId,
      poll_id: pollId,
    });
    // #endregion snippet

    const { votes } = await (queryPollVotes.mock.results[0]
      .value as Promise<PollVotesResponse>);
    expect(votes.map((v) => v.id).sort()).toEqual([...voteIds].sort());
  });

  it('Querying Polls', async () => {
    // The filter matches every closed poll in the app: create two and check
    // their order under the docs sort.
    const older = await createPoll({ is_closed: true });
    const newer = await createPoll({ is_closed: true });
    const queryPolls = vi.spyOn(client, 'queryPolls');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/08-polls.md" heading="Querying Polls" tab="Node.js" index=1
    // COPY: userId="<user id>"
    await client.queryPolls({
      filter: {
        is_closed: true,
      },
      sort: [{ field: 'created_at', direction: -1 }],
      user_id: userId,
    });
    // #endregion snippet

    const { polls } = await (queryPolls.mock.results[0]
      .value as Promise<QueryPollsResponse>);
    expect(polls.every((p) => p.is_closed)).toBe(true);
    const ids = polls.map((p) => p.id);
    expect(ids).toContain(newer.id);
    expect(ids).toContain(older.id);
    expect(ids.indexOf(newer.id)).toBeLessThan(ids.indexOf(older.id));
  });
});
