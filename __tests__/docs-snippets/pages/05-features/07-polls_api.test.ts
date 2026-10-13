import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CreatePollRequest } from '../../../../index';
import { getServerClient } from '../../helpers/clients';
import { Cleanup } from '../../helpers/cleanup';
import { uniqueId } from '../../helpers/ids';
import { deletePollsCreatedBy } from '../../helpers/server';

const DOCS = '_default/05-features/07-polls_api.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  const johnId = uniqueId('john');
  const channelId = uniqueId('general');

  beforeAll(async () => {
    cleanup.users.push(johnId);
    cleanup.channels.push(`messaging:${channelId}`);
    // Polls survive their creator's deletion: delete them before the user.
    cleanup.add(() => deletePollsCreatedBy(client, johnId));
    await client.upsertUsers([{ id: johnId }]);
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: johnId } });
  });

  afterAll(() => cleanup.run());

  /** A poll created by john with two options. */
  const createPoll = async (extra: Partial<CreatePollRequest> = {}) => {
    const { poll } = await client.createPoll({
      name: 'Test poll',
      options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      user_id: johnId,
      ...extra,
    });
    const [option1, option2] = poll.options;
    return { poll, option1Id: option1.id, option2Id: option2.id };
  };

  /** Sends `pollId` in a message to the shared channel (votes need a message). */
  const sendPoll = async (pollId: string) => {
    const { message } = await client.chat
      .channel('messaging', channelId)
      .sendMessage({
        message: { text: 'Poll', poll_id: pollId, user_id: johnId },
      });
    return message.id;
  };

  it('Polls at a Quick Glance', async () => {
    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Polls at a Quick Glance" tab="Node.js" index=1
    // COPY: johnId="john", channelId="general"
    // Create a poll and send it in a message
    const { poll } = await client.createPoll({
      name: 'Where should we host our next event?',
      options: [{ text: 'Amsterdam' }, { text: 'Boulder' }],
      user_id: johnId,
    });

    const channel = client.chat.channel('messaging', channelId);
    const { message } = await channel.sendMessage({
      message: { text: 'Vote now!', poll_id: poll.id, user_id: johnId },
    });

    // Vote on a poll
    await client.chat.castPollVote({
      message_id: message.id,
      poll_id: poll.id,
      vote: { option_id: poll.options[0].id },
      user_id: johnId,
    });

    // Retrieve poll results
    const { poll: results } = await client.getPoll({ poll_id: poll.id });
    console.log(results.vote_counts_by_option); // { 'option-id': 5 }
    // #endregion snippet

    expect(message.poll_id).toBe(poll.id);
    expect(results.vote_counts_by_option).toEqual({ [poll.options[0].id]: 1 });
  });

  it('Creating a poll and sending it as part of a message', async () => {
    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Creating a poll and sending it as part of a message" tab="Node.js" index=1
    // COPY: johnId="john", channelId="general"
    const { poll } = await client.createPoll({
      name: 'Where should we host our next company event?',
      options: [
        { text: 'Amsterdam, The Netherlands' },
        { text: 'Boulder, CO' },
      ],
      user_id: johnId,
    });

    const channel = client.chat.channel('messaging', channelId);

    const { message } = await channel.sendMessage({
      message: {
        text: 'We want to know your opinion!',
        poll_id: poll.id,
        user_id: johnId,
      },
    });

    // message.poll contains all relevant poll data
    // #endregion snippet

    expect(message.poll?.id).toBe(poll.id);
    expect(message.poll?.name).toBe(
      'Where should we host our next company event?',
    );
    expect(message.poll?.options.map((o) => o.text)).toEqual([
      'Amsterdam, The Netherlands',
      'Boulder, CO',
    ]);
  });

  it('Poll options', async () => {
    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Poll options" tab="Node.js" index=1
    // COPY: johnId="john"
    // custom properties live under `custom`, on the poll and on each option
    const { poll } = await client.createPoll({
      name: 'Where should we host our next company event?',
      options: [
        { text: 'Amsterdam, The Netherlands', custom: { foo: 'bar' } },
        { text: 'Boulder, CO', custom: { foo: 'baz' } },
      ],
      custom: { foo: 'bar' },
      user_id: johnId,
    });
    // #endregion snippet

    expect(poll.custom).toMatchObject({ foo: 'bar' });
    expect(poll.options.map((o) => o.custom)).toEqual([
      { foo: 'bar' },
      { foo: 'baz' },
    ]);
  });

  it('Send vote on option', async () => {
    const created = await createPoll();
    const pollId = created.poll.id;
    const messageId = await sendPoll(pollId);
    const someOptionId = created.option1Id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Send vote on option" tab="Node.js" index=1
    // COPY: johnId="john", someOptionId="some-option-id-328904342"
    const { vote } = await client.chat.castPollVote({
      message_id: messageId,
      poll_id: pollId,
      vote: { option_id: someOptionId },
      user_id: johnId,
    });
    // #endregion snippet

    expect(vote?.option_id).toBe(someOptionId);
    expect(vote?.user_id).toBe(johnId);
  });

  it('Send an answer (if answers are configured to be allowed)', async () => {
    const created = await createPoll({ allow_answers: true });
    const pollId = created.poll.id;
    const messageId = await sendPoll(pollId);

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Send an answer (if answers are configured to be allowed)" tab="Node.js" index=1
    // COPY: johnId="john"
    const { vote } = await client.chat.castPollVote({
      message_id: messageId,
      poll_id: pollId,
      vote: { answer_text: 'This is my answer text' },
      user_id: johnId,
    });
    // #endregion snippet

    expect(vote?.is_answer).toBe(true);
    expect(vote?.answer_text).toBe('This is my answer text');
    const { poll } = await client.getPoll({ poll_id: pollId });
    expect(poll.answers_count).toBe(1);
  });

  it('Removing a vote', async () => {
    const created = await createPoll();
    const pollId = created.poll.id;
    const messageId = await sendPoll(pollId);
    const cast = await client.chat.castPollVote({
      message_id: messageId,
      poll_id: pollId,
      vote: { option_id: created.option1Id },
      user_id: johnId,
    });
    const voteId = cast.vote?.id ?? '';
    expect(voteId).not.toBe('');

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Removing a vote" tab="Node.js" index=1
    // COPY: johnId="john"
    const { vote } = await client.chat.deletePollVote({
      message_id: messageId,
      poll_id: pollId,
      vote_id: voteId,
      user_id: johnId,
    });
    // #endregion snippet

    expect(vote?.id).toBe(voteId);
    const { poll } = await client.getPoll({ poll_id: pollId });
    expect(poll.vote_count).toBe(0);
  });

  it('Closing a poll', async () => {
    const pollId = (await createPoll()).poll.id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Closing a poll" tab="Node.js" index=1
    // COPY: johnId="john"
    // close a poll by setting `is_closed`
    const { poll } = await client.updatePollPartial({
      poll_id: pollId,
      set: { is_closed: true },
      user_id: johnId,
    });
    // #endregion snippet

    expect(poll.is_closed).toBe(true);
  });

  it('Retrieving a poll', async () => {
    const created = await createPoll();
    const pollId = created.poll.id;
    const messageId = await sendPoll(pollId);
    await client.chat.castPollVote({
      message_id: messageId,
      poll_id: pollId,
      vote: { option_id: created.option2Id },
      user_id: johnId,
    });

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Retrieving a poll" tab="Node.js" index=1
    // COPY: johnId="john"
    // user_id is optional, provide it when you want the response to include
    // that user's own votes
    const { poll } = await client.getPoll({ poll_id: pollId, user_id: johnId });
    // #endregion snippet

    expect(poll.id).toBe(pollId);
    expect(poll.own_votes.map((v) => v.option_id)).toEqual([created.option2Id]);
  });

  it('Full update', async () => {
    const created = await createPoll({
      description: 'reset by a full update',
    });
    const pollId = created.poll.id;
    const { option1Id, option2Id } = created;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Full update" tab="Node.js" index=1
    // COPY: johnId="john"
    // `name` is required on a full update, and every property you leave out is
    // reset to its default, so send the complete poll.
    const { poll } = await client.updatePoll({
      id: pollId,
      name: 'Where should we not go to?',
      options: [
        {
          id: option1Id,
          text: 'Amsterdam, The Netherlands',
          custom: { foo: 'bar' },
        },
        { id: option2Id, text: 'Boulder, CO', custom: { foo: 'baz' } },
      ],
      user_id: johnId,
    });
    // #endregion snippet

    expect(poll.name).toBe('Where should we not go to?');
    expect(poll.description).toBe('');
    expect(poll.options).toMatchObject([
      {
        id: option1Id,
        text: 'Amsterdam, The Netherlands',
        custom: { foo: 'bar' },
      },
      { id: option2Id, text: 'Boulder, CO', custom: { foo: 'baz' } },
    ]);
  });

  it('Partial update', async () => {
    const created = await createPoll({
      custom: { custom_property: 'value', kept: 'yes' },
    });
    const pollId = created.poll.id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Partial update" tab="Node.js" index=1
    // COPY: johnId="john"
    const { poll } = await client.updatePollPartial({
      poll_id: pollId,
      set: { name: 'Where should we not go to?' },
      unset: ['custom_property'],
      user_id: johnId,
    });
    // #endregion snippet

    expect(poll.name).toBe('Where should we not go to?');
    expect(poll.custom).toEqual({ kept: 'yes' });
  });

  it('Deleting a poll', async () => {
    const pollId = (await createPoll()).poll.id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Deleting a poll" tab="Node.js" index=1
    // COPY: johnId="john"
    await client.deletePoll({ poll_id: pollId, user_id: johnId });
    // #endregion snippet

    await expect(client.getPoll({ poll_id: pollId })).rejects.toMatchObject({
      code: 16,
      metadata: { responseCode: 404 },
    });
  });

  it('Add poll option', async () => {
    const pollId = (await createPoll()).poll.id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="**Add poll option**" tab="Node.js" index=1
    // COPY: johnId="john"
    const { poll_option } = await client.createPollOption({
      poll_id: pollId,
      text: 'Another option',
      user_id: johnId,
    });
    // #endregion snippet

    expect(poll_option.text).toBe('Another option');
    const { poll } = await client.getPoll({ poll_id: pollId });
    expect(poll.options.map((o) => o.id)).toContain(poll_option.id);
  });

  it('Update poll option', async () => {
    const created = await createPoll();
    const pollId = created.poll.id;
    const optionId = created.option1Id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Update poll option" tab="Node.js" index=1
    // COPY: johnId="john"
    const { poll_option } = await client.updatePollOption({
      poll_id: pollId,
      id: optionId,
      text: 'Updated option',
      custom: { my_custom_property: 'my_custom_value' },
      user_id: johnId,
    });
    // #endregion snippet

    expect(poll_option).toMatchObject({
      id: optionId,
      text: 'Updated option',
      custom: { my_custom_property: 'my_custom_value' },
    });
  });

  it('Delete poll option', async () => {
    const created = await createPoll();
    const pollId = created.poll.id;
    const optionId = created.option1Id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Delete poll option" tab="Node.js" index=1
    // COPY: johnId="john"
    await client.deletePollOption({
      poll_id: pollId,
      option_id: optionId,
      user_id: johnId,
    });
    // #endregion snippet

    const { poll } = await client.getPoll({ poll_id: pollId });
    expect(poll.options.map((o) => o.id)).toEqual([created.option2Id]);
  });

  it('Querying votes', async () => {
    const created = await createPoll({
      options: [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' },
      ],
    });
    const pollId = created.poll.id;
    const { option1Id, option2Id } = created;
    const option3Id = created.poll.options[2].id;
    const messageId = await sendPoll(pollId);
    for (const option_id of [option1Id, option2Id, option3Id]) {
      await client.chat.castPollVote({
        message_id: messageId,
        poll_id: pollId,
        vote: { option_id },
        user_id: johnId,
      });
    }

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Querying votes" tab="Node.js" index=1
    // COPY: johnId="john"
    // retrieve all votes on either option1Id or option2Id
    const { votes } = await client.queryPollVotes({
      poll_id: pollId,
      filter: { option_id: { $in: [option1Id, option2Id] } },
      user_id: johnId,
    });
    // #endregion snippet

    expect(votes.map((v) => v.option_id).sort()).toEqual(
      [option1Id, option2Id].sort(),
    );
  });

  it('Querying polls', async () => {
    const open = (await createPoll()).poll.id;
    const closed1 = (await createPoll({ is_closed: true })).poll.id;
    const closed2 = (await createPoll({ is_closed: true })).poll.id;

    // #region snippet docs="_default/05-features/07-polls_api.md" heading="Querying polls" tab="Node.js" index=1
    // COPY: johnId="john"
    // retrieve all polls that are closed for voting sorted by created_at
    const { polls } = await client.queryPolls({
      filter: { is_closed: true },
      sort: [{ field: 'created_at', direction: -1 }],
      user_id: johnId,
    });
    // #endregion snippet

    // The filter matches every closed poll of the app: check the test's own ones.
    expect(polls.every((p) => p.is_closed)).toBe(true);
    const ids = polls.map((p) => p.id);
    expect(ids).not.toContain(open);
    expect(ids.indexOf(closed2)).toBeGreaterThanOrEqual(0);
    expect(ids.indexOf(closed2)).toBeLessThan(ids.indexOf(closed1));
  });
});
