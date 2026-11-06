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
  AddCommentResponse,
  DeleteCommentReactionResponse,
  QueryCommentsResponse,
} from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/03-comments.md';

const client = getServerClient();
// Some fences of the page call the server client `serverClient`.
const serverClient = client;
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  let userId: string;

  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    cleanup.feeds.push(`user:${id}`);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A new activity in `authorId`'s user feed. */
  const createActivity = async (authorId = userId) => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${authorId}`],
      type: 'post',
      text: 'setup',
      user_id: authorId,
    });
    return activity.id;
  };

  /** A new comment by the user on an activity, or a reply to a comment. */
  const createComment = async (
    target: { object_id: string } | { parent_id: string },
    extra: { id?: string; comment?: string; user_id?: string } = {},
  ) => {
    const { comment } = await client.feeds.addComment({
      ...('object_id' in target
        ? { object_id: target.object_id, object_type: 'activity' }
        : target),
      comment: 'setup',
      user_id: userId,
      ...extra,
    });
    return comment;
  };

  beforeAll(async () => {
    userId = await createUser('user');
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('adds comments', async () => {
    const activityId = await createActivity();
    const parentCommentId = (await createComment({ object_id: activityId })).id;
    const commentId = uniqueId('comment');
    const addComment = vi.spyOn(serverClient.feeds, 'addComment');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Adding Comments" tab="Node.js" index=1
    // COPY: commentId="comment_123", activityId="activity_123", userId="<user_id>", parentCommentId="comment_456"
    // Adding a comment to an activity
    await serverClient.feeds.addComment({
      id: commentId, // id is optional, but must be unique. will be auto-generated if not provided
      comment: 'So great!',
      object_id: activityId,
      object_type: 'activity',
      user_id: userId,
      custom: {
        sentiment: 'positive',
      },
    });

    // Adding a reply to a comment
    await serverClient.feeds.addComment({
      comment: 'I agree!',
      parent_id: parentCommentId,
      user_id: userId,
    });

    // Adding a comment without triggering push notifications
    await serverClient.feeds.addComment({
      comment: 'Silent comment',
      object_id: activityId,
      object_type: 'activity',
      user_id: userId,
      skip_push: true,
    });

    // Adding a comment with attachments
    await serverClient.feeds.addComment({
      comment: 'Check out this image!',
      object_id: activityId,
      object_type: 'activity',
      user_id: userId,
      attachments: [
        {
          type: 'image',
          image_url: 'https://example.com/image.png',
          custom: {},
        },
      ],
    });
    // #endregion snippet

    const [comment, reply, silent, withImage] = await Promise.all(
      addComment.mock.results.map(
        (r) => r.value as Promise<AddCommentResponse>,
      ),
    );
    expect(comment.comment).toMatchObject({
      id: commentId,
      text: 'So great!',
      object_id: activityId,
      custom: { sentiment: 'positive' },
      user: { id: userId },
    });
    expect(reply.comment).toMatchObject({
      text: 'I agree!',
      parent_id: parentCommentId,
      object_id: activityId,
    });
    expect(silent.comment.text).toBe('Silent comment');
    expect(withImage.comment.attachments).toMatchObject([
      { type: 'image', image_url: 'https://example.com/image.png' },
    ]);
  });

  it('updates a comment', async () => {
    const activityId = await createActivity();
    const commentId = (await createComment({ object_id: activityId })).id;
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Updating Comments" tab="Node.js" index=1
    // COPY: commentId="comment_123", userId="<user_id>"
    // Update a comment
    const response = await client.feeds.updateComment({
      id: commentId,
      comment: 'Updated comment',
      user_id: userId,
    });
    console.log(response.comment.edited_at);
    // #endregion snippet

    expect(response.comment.text).toBe('Updated comment');
    expect(response.comment.edited_at).toEqual(expect.any(Number));
    expect(log).toHaveBeenCalledWith(response.comment.edited_at);
  });

  it('removes a comment', async () => {
    const activityId = await createActivity();
    const commentId = (await createComment({ object_id: activityId })).id;
    const deleteComment = vi.spyOn(client.feeds, 'deleteComment');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Removing Comments" tab="Node.js" index=1
    // COPY: commentId="comment_123"
    await client.feeds.deleteComment({
      id: commentId,
    });
    // #endregion snippet

    await deleteComment.mock.results[0].value;
    const { comments } = await client.feeds.getComments({
      object_type: 'activity',
      object_id: activityId,
    });
    expect(comments.map((c) => c.id)).not.toContain(commentId);
  });

  it('reads comments', async () => {
    const readActivityId = await createActivity();
    const readCommentId = (await createComment({ object_id: readActivityId }))
      .id;
    const feed = client.feeds.feed('user', userId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Reading Comments" tab="Node.js" index=1
    // COPY: userId="<user id>", readActivityId="123", readCommentId="123"
    const response = await feed.getOrCreate({
      user_id: userId,
    });

    console.log(response.activities[0].comments);

    // Or using the getComments endpoint
    const comments = await client.feeds.getComments({
      object_type: 'activity',
      object_id: readActivityId,
      limit: 10,
      sort: 'best',
    });

    // Reading a single comment
    const comment = await client.feeds.getComment({ id: readCommentId });
    // #endregion snippet

    const latest = response.activities[0];
    expect(latest.id).toBe(readActivityId);
    expect(latest.comments.map((c) => c.id)).toEqual([readCommentId]);
    expect(log).toHaveBeenCalledWith(latest.comments);
    expect(comments.comments.map((c) => c.id)).toEqual([readCommentId]);
    expect(comment.comment).toMatchObject({
      id: readCommentId,
      object_id: readActivityId,
    });
  });

  it('reads comment counts', async () => {
    const activityId = await createActivity();
    const parent = await createComment({ object_id: activityId });
    await createComment({ parent_id: parent.id });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Comment counts" tab="Node.js" index=1
    // COPY: activityId="activity_123"
    // Top-level count on a single activity
    const { activity } = await client.feeds.getActivity({
      id: activityId,
      include_top_level_comment_count: true,
    });
    console.log(activity.comment_count, activity.top_level_comment_count);

    // Both counts on the first page of comments
    const response = await client.feeds.getComments({
      object_type: 'activity',
      object_id: activityId,
      limit: 20,
      include_top_level_comment_count: true,
    });
    console.log(response.comment_count, response.top_level_comment_count);
    // #endregion snippet

    // One top-level comment plus one reply.
    expect(activity.comment_count).toBe(2);
    expect(activity.top_level_comment_count).toBe(1);
    expect(response.comment_count).toBe(2);
    expect(response.top_level_comment_count).toBe(1);
    expect(log.mock.calls).toEqual([
      [2, 1],
      [2, 1],
    ]);
  });

  it('searches comments', async () => {
    const janeId = await createUser('jane');
    const jane = { id: janeId };
    const activityId = await createActivity(janeId);
    const oatComment = await createComment(
      { object_id: activityId },
      { comment: `I love oat milk ${janeId}`, user_id: janeId },
    );
    // Wait until the search index has the comment, so the region runs once.
    await retry(async () => {
      const { comments } = await client.feeds.queryComments({
        filter: { comment_text: { $q: 'oat' }, user_id: janeId },
      });
      expect(comments.map((c) => c.id)).toContain(oatComment.id);
    });
    const queryComments = vi.spyOn(client.feeds, 'queryComments');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Search for Comments" tab="Node.js" index=1
    // Search in comment texts
    await client.feeds.queryComments({
      filter: { comment_text: { $q: 'oat' } },
    });

    // Comments of a user
    await client.feeds.queryComments({
      filter: {
        user_id: jane.id,
      },
      limit: 20,
    });
    // #endregion snippet

    const [byText, byUser] = await Promise.all(
      queryComments.mock.results.map(
        (r) => r.value as Promise<QueryCommentsResponse>,
      ),
    );
    // The text search matches comments of the whole app: ours is among them.
    expect(byText.comments.every((c) => /oat/i.test(c.text ?? ''))).toBe(true);
    expect(byUser.comments.map((c) => c.id)).toEqual([oatComment.id]);
  });

  it('adds and deletes a comment reaction', async () => {
    const activityId = await createActivity();
    const commentId = (await createComment({ object_id: activityId })).id;
    const deleteCommentReaction = vi.spyOn(
      client.feeds,
      'deleteCommentReaction',
    );

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Comment Reactions" tab="Node.js" index=1
    // COPY: commentId="comment_123", userId="<user id>"
    // Add a reaction to a comment
    const response = await client.feeds.addCommentReaction({
      id: commentId,
      type: 'like',
      user_id: userId,
      // Optionally override existing reaction
      enforce_unique: true,
    });

    await client.feeds.deleteCommentReaction({
      id: commentId,
      type: 'like',
      user_id: userId,
    });
    // #endregion snippet

    expect(response.reaction).toMatchObject({
      comment_id: commentId,
      type: 'like',
      user: { id: userId },
    });
    const deleted = await (deleteCommentReaction.mock.results[0]
      .value as Promise<DeleteCommentReactionResponse>);
    expect(deleted.reaction).toMatchObject({ type: 'like' });
    const { reactions } = await client.feeds.queryCommentReactions({
      id: commentId,
    });
    expect(reactions).toEqual([]);
  });

  it('reads threaded comments', async () => {
    const activityId = await createActivity();
    const parent = await createComment({ object_id: activityId });
    const reply = await createComment({ parent_id: parent.id });
    const nested = await createComment({ parent_id: reply.id });
    const parentId = parent.id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Comment Threading" tab="Node.js" index=1
    // COPY: activityId="activity_123", parentId="<parent id>"
    const response = await client.feeds.getComments({
      object_id: activityId,
      object_type: 'activity',
      // Depth of the threaded comments
      depth: 3,
      limit: 20,
    });

    // Get replies of a specific parent comment
    const repliesResponse = await client.feeds.getCommentReplies({
      id: parentId,
    });
    // #endregion snippet

    // The top level holds the parent, with its replies nested below it.
    expect(response.comments.map((c) => c.id)).toEqual([parent.id]);
    const [replyThread] = response.comments[0].replies ?? [];
    expect(replyThread?.id).toBe(reply.id);
    expect(replyThread?.replies?.map((c) => c.id)).toEqual([nested.id]);
    expect(repliesResponse.comments.map((c) => c.id)).toEqual([reply.id]);
  });

  it('restricts who can add comments', async () => {
    const userFeed = `user:${userId}`;
    const strangerId = await createUser('stranger');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Set who can add comments" tab="Node.js" index=1
    // COPY: userFeed="user:1", userId="<user id>"
    const response = await client.feeds.addActivity({
      feeds: [userFeed],
      type: 'post',
      text: 'apple stock will go up',
      user_id: userId,
      restrict_replies: 'people_i_follow', // Options: "everyone", "people_i_follow", "nobody"
    });
    // #endregion snippet

    expect(response.activity.restrict_replies).toBe('people_i_follow');
    // The author doesn't follow the stranger, so the stranger can't comment.
    const error: unknown = await createComment(
      { object_id: response.activity.id },
      { user_id: strangerId },
    ).catch((e: unknown) => e);
    expect(String(error)).toContain(
      'only users followed by the activity author can reply',
    );
    // The author always can.
    const own = await createComment({ object_id: response.activity.id });
    expect(own.user.id).toBe(userId);
  });

  it('adds comments in batch', async () => {
    const activityId = await createActivity();
    const commentId = uniqueId('comment');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/03-comments.md" heading="Add comments in batch" tab="Node.js" index=1
    // COPY: commentId="comment_123", activityId="activity_123", userId="<user_id>"
    await serverClient.feeds.addCommentsBatch({
      comments: [
        {
          id: commentId, // id is optional, but must be unique. will be auto-generated if not provided
          comment: 'So great!',
          object_id: activityId,
          object_type: 'activity',
          user_id: userId,
          custom: {
            sentiment: 'positive',
          },
        },
      ],
    });
    // #endregion snippet

    const { comment } = await client.feeds.getComment({ id: commentId });
    expect(comment).toMatchObject({
      text: 'So great!',
      object_id: activityId,
      custom: { sentiment: 'positive' },
      user: { id: userId },
    });
  });
});
