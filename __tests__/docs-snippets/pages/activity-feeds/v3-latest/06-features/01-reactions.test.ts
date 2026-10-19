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
  ActivityResponse,
  AddCommentReactionResponse,
  CommentResponse,
  QueryActivityReactionsResponse,
  QueryCommentReactionsResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/01-reactions.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  let authorId: string;

  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A new activity in the author's user feed. */
  const createActivity = async (text = 'setup') => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${authorId}`],
      type: 'post',
      text,
      user_id: authorId,
    });
    return activity;
  };

  /** A new comment by the author on `activityId`. */
  const createComment = async (activityId: string, text = 'setup') => {
    const { comment } = await client.feeds.addComment({
      object_id: activityId,
      object_type: 'activity',
      comment: text,
      user_id: authorId,
    });
    return comment;
  };

  beforeAll(async () => {
    authorId = await createUser('author');
    cleanup.feeds.push(`user:${authorId}`);
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('adds and deletes reactions', async () => {
    const activity = await createActivity();
    const comment = await createComment(activity.id);
    const activityId = activity.id;
    const commentId = comment.id;
    const reactingUserId = await createUser('reacting');
    const addCommentReaction = vi.spyOn(client.feeds, 'addCommentReaction');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/01-reactions.md" heading="Overview" tab="Node.js" index=1
    // COPY: activityId="activity_123", commentId="comment_456", reactingUserId="reacting_user_id"
    // Add a reaction to an activity
    const addResponse = await client.feeds.addActivityReaction({
      activity_id: activityId,
      type: 'like',
      custom: {
        emoji: '❤️',
      },
      user_id: reactingUserId,
      // Optionally override existing reaction
      enforce_unique: true,
    });

    console.log(addResponse.reaction);

    // Adding a reaction without triggering push notifications
    await client.feeds.addActivityReaction({
      activity_id: activityId,
      type: 'like',
      custom: {
        emoji: '❤️',
      },
      user_id: reactingUserId,
      skip_push: true,
    });

    // Add a reaction to a comment
    await client.feeds.addCommentReaction({
      id: commentId,
      type: 'like',
      custom: {
        emoji: '👍',
      },
      user_id: reactingUserId,
      // Optionally override existing reaction
      enforce_unique: true,
    });

    // Adding a comment reaction without triggering push notifications
    await client.feeds.addCommentReaction({
      id: commentId,
      type: 'like',
      custom: {
        emoji: '👍',
      },
      user_id: reactingUserId,
      skip_push: true,
    });

    const deleteResponse = await client.feeds.deleteActivityReaction({
      activity_id: activityId,
      type: 'like',
      user_id: reactingUserId,
    });

    console.log(deleteResponse.reaction);
    // #endregion snippet

    expect(addResponse.reaction).toMatchObject({
      activity_id: activityId,
      type: 'like',
      custom: { emoji: '❤️' },
      user: { id: reactingUserId },
    });
    expect(deleteResponse.reaction).toMatchObject({
      activity_id: activityId,
      type: 'like',
      user: { id: reactingUserId },
    });
    expect(log.mock.calls).toEqual([
      [addResponse.reaction],
      [deleteResponse.reaction],
    ]);
    const commentReactions = await Promise.all(
      addCommentReaction.mock.results.map(
        (r) => r.value as Promise<AddCommentReactionResponse>,
      ),
    );
    expect(commentReactions.map((r) => r.reaction)).toMatchObject([
      { comment_id: commentId, type: 'like', custom: { emoji: '👍' } },
      { comment_id: commentId, type: 'like', custom: { emoji: '👍' } },
    ]);

    // The activity reaction is gone, the comment reaction stays (one per type).
    const { activity: stored } = await client.feeds.getActivity({
      id: activityId,
    });
    expect(stored.reaction_groups.like).toBeUndefined();
    const { reactions } = await client.feeds.queryCommentReactions({
      id: commentId,
    });
    expect(reactions).toHaveLength(1);
  });

  it('reads reactions from the feed', async () => {
    const saraId = await createUser('sara');
    cleanup.feeds.push(`user:${saraId}`);
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${saraId}`],
      type: 'post',
      text: 'hello',
      user_id: saraId,
    });
    await client.feeds.addActivityReaction({
      activity_id: activity.id,
      type: 'like',
      user_id: saraId,
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/01-reactions.md" heading="Reaction write outcome" tab="Node.js" index=1
    // COPY: saraId="sara"
    const feed = client.feeds.feed('user', saraId);
    const response = await feed.getOrCreate({ user_id: saraId });

    console.log(response.activities[0].own_reactions);
    console.log(response.activities[0].latest_reactions);
    console.log(response.activities[0].reaction_groups);
    // #endregion snippet

    const [first] = response.activities;
    expect(first.id).toBe(activity.id);
    expect(first.own_reactions).toMatchObject([
      { type: 'like', user: { id: saraId } },
    ]);
    expect(first.latest_reactions).toMatchObject([
      { type: 'like', user: { id: saraId } },
    ]);
    expect(first.reaction_groups.like).toMatchObject({ count: 1 });
    expect(log.mock.calls).toEqual([
      [first.own_reactions],
      [first.latest_reactions],
      [first.reaction_groups],
    ]);
  });

  it('queries reactions', async () => {
    const activity: ActivityResponse = await createActivity();
    const comment: CommentResponse = await createComment(activity.id);
    const userId = await createUser('reacting');
    for (const type of ['like', 'love']) {
      await client.feeds.addActivityReaction({
        activity_id: activity.id,
        type,
        user_id: userId,
      });
      await client.feeds.addCommentReaction({
        id: comment.id,
        type,
        user_id: userId,
      });
    }
    const queryActivityReactions = vi.spyOn(
      client.feeds,
      'queryActivityReactions',
    );
    const queryCommentReactions = vi.spyOn(
      client.feeds,
      'queryCommentReactions',
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/01-reactions.md" heading="Querying Reactions" tab="Node.js" index=1
    await client.feeds.queryActivityReactions({
      activity_id: activity.id,
      // Provide optional filters
      filter: {
        reaction_type: 'like',
      },
    });

    await client.feeds.queryCommentReactions({
      id: comment.id,
      // Provide optional filters

      filter: {
        reaction_type: 'like',
      },
    });
    // #endregion snippet

    const activityReactions = await (queryActivityReactions.mock.results[0]
      .value as Promise<QueryActivityReactionsResponse>);
    const commentReactions = await (queryCommentReactions.mock.results[0]
      .value as Promise<QueryCommentReactionsResponse>);
    // The filter keeps only the "like" reactions.
    expect(activityReactions.reactions).toMatchObject([
      { type: 'like', activity_id: activity.id },
    ]);
    expect(commentReactions.reactions).toMatchObject([
      { type: 'like', comment_id: comment.id },
    ]);
  });

  it('batch queries activity reactions', async () => {
    const activities = [await createActivity('a'), await createActivity('b')];
    const saraId = await createUser('sara');
    const otherId = await createUser('other');
    for (const activity of activities) {
      for (const [user_id, type] of [
        [saraId, 'like'],
        [saraId, 'love'],
        [otherId, 'like'],
      ]) {
        await client.feeds.addActivityReaction({
          activity_id: activity.id,
          type,
          user_id,
        });
      }
    }

    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/01-reactions.md" heading="Batch query activity reactions" tab="Node.js" index=1
    // COPY: saraId="sara"
    // Server-side: pass user_id to choose whose reactions to fetch.
    const response = await client.feeds.batchQueryActivityReactions({
      activity_ids: activities.map((activity) => activity.id),
      user_id: saraId,
      filter: { reaction_type: 'like' },
    });

    console.log(response.reactions);
    // #endregion snippet

    // Only Sara's "like" reactions, on both activities.
    expect(log).toHaveBeenCalledWith(response.reactions);
    const flattened = response.reactions;
    expect(flattened).toHaveLength(2);
    for (const reaction of flattened) {
      expect(reaction).toMatchObject({ type: 'like', user: { id: saraId } });
    }
  });

  it('batch queries comment reactions', async () => {
    const activity = await createActivity();
    const comments = [
      await createComment(activity.id, 'a'),
      await createComment(activity.id, 'b'),
    ];
    const saraId = await createUser('sara');
    const otherId = await createUser('other');
    for (const comment of comments) {
      for (const [user_id, type] of [
        [saraId, 'like'],
        [saraId, 'love'],
        [otherId, 'like'],
      ]) {
        await client.feeds.addCommentReaction({
          id: comment.id,
          type,
          user_id,
        });
      }
    }

    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/01-reactions.md" heading="Batch query comment reactions" tab="Node.js" index=1
    // COPY: saraId="sara"
    // Server-side: pass user_id to choose whose reactions to fetch.
    const response = await client.feeds.batchQueryCommentReactions({
      comment_ids: comments.map((comment) => comment.id),
      user_id: saraId,
      filter: { reaction_type: 'like' },
    });

    console.log(response.reactions);
    // #endregion snippet

    expect(log).toHaveBeenCalledWith(response.reactions);
    const flattened = response.reactions;
    expect(flattened).toHaveLength(2);
    for (const reaction of flattened) {
      expect(reaction).toMatchObject({ type: 'like', user: { id: saraId } });
    }
  });
});
