import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerUser } from '../../../../helpers/server';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/13-translation.md';

// Translation works on the test app with auto-translation off.
describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const authorId = uniqueId('author');
  const johnId = uniqueId('john');

  /** A new user with `language: "en"` and their user feed, registered for cleanup. */
  const createUser = async (id: string) => {
    cleanup.users.push(id);
    cleanup.feeds.push(`user:${id}`);
    await client.upsertUsers([{ id, language: 'en' }]);
    await client.feeds.feed('user', id).getOrCreate({ user_id: id });
  };

  /** A new activity by `userId` in their user feed. */
  const createActivity = async (userId: string, text: string) =>
    (
      await client.feeds.addActivity({
        feeds: [`user:${userId}`],
        type: 'post',
        text,
        user_id: userId,
      })
    ).activity;

  beforeAll(async () => {
    await createUser(authorId);
    await createUser(johnId);
    // John's feed has one English activity with a stored Spanish translation.
    const activity = await createActivity(johnId, 'Hello world');
    await client.feeds.translateActivity({ id: activity.id, language: 'es' });
  });

  afterAll(() => cleanup.run());

  it('translates an activity', async () => {
    const activityId = (
      await createActivity(
        authorId,
        'Hello, I would like to know more about your product.',
      )
    ).id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/13-translation.md" heading="Translate an activity" tab="Node.js" index=1
    // COPY: activityId="activity_123"
    const response = await client.feeds.translateActivity({
      id: activityId,
      language: 'fr',
    });

    console.log(response.activity.i18n?.fr_text);
    // "Bonjour, j'aimerais en savoir plus sur votre produit."
    // #endregion snippet

    expect(response.activity.id).toBe(activityId);
    expect(response.activity.i18n?.language).toBe('en');
    expect(typeof response.activity.i18n?.fr_text).toBe('string');
    expect(response.activity.i18n?.fr_text).not.toBe(response.activity.text);
  });

  it('translates a comment', async () => {
    const activity = await createActivity(authorId, 'setup');
    const commentId = (
      await client.feeds.addComment({
        object_id: activity.id,
        object_type: 'activity',
        comment: 'Good morning, how are you?',
        user_id: authorId,
      })
    ).comment.id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/13-translation.md" heading="Translate a comment" tab="Node.js" index=1
    // COPY: commentId="comment_456"
    const response = await client.feeds.translateComment({
      id: commentId,
      language: 'es',
    });

    console.log(response.comment.i18n?.es_text);
    // #endregion snippet

    expect(response.comment.id).toBe(commentId);
    expect(response.comment.i18n?.language).toBe('en');
    expect(typeof response.comment.i18n?.es_text).toBe('string');
    expect(response.comment.i18n?.es_text).not.toBe(response.comment.text);
  });

  it('reads a feed with the default projection', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/13-translation.md" heading="Default projection (`translate_text=false`)" tab="Node.js" index=1
    // COPY: johnId="john"
    const feed = client.feeds.feed('user', johnId);
    const response = await feed.getOrCreate({
      user_id: johnId,
      language: 'es',
    });

    // text is still the original English
    console.log(response.activities[0].text);
    // "Hello world"

    // projected i18n includes Spanish when translated
    console.log(response.activities[0].i18n?.es_text);
    // "Hola mundo"
    // #endregion snippet

    expect(response.activities).toHaveLength(1);
    const [activity] = response.activities;
    expect(activity.text).toBe('Hello world');
    expect(activity.i18n?.language).toBe('en');
    expect(typeof activity.i18n?.es_text).toBe('string');
    expect(activity.i18n?.es_text).not.toBe('Hello world');
  });

  it('reads a feed with the translated text', async () => {
    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/13-translation.md" heading="Substitute `text` (`translate_text=true`)" tab="Node.js" index=1
    // COPY: johnId="john"
    const feed = client.feeds.feed('user', johnId);
    const response = await feed.getOrCreate({
      user_id: johnId,
      language: 'es',
      translate_text: true,
    });

    console.log(response.activities[0].text);
    // "Hola mundo"

    console.log(response.activities[0].i18n?.language);
    // "en"
    // #endregion snippet

    expect(response.activities).toHaveLength(1);
    const [activity] = response.activities;
    expect(activity.i18n?.language).toBe('en');
    expect(activity.i18n?.en_text).toBe('Hello world');
    expect(activity.text).not.toBe('Hello world');
    expect(activity.text).toBe(activity.i18n?.es_text);
  });

  it('sets the user language', async () => {
    const user123Id = uniqueId('user');
    cleanup.users.push(user123Id);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/13-translation.md" heading="Set user language" tab="Node.js" index=1
    // COPY: user123Id="user_123"
    await client.updateUsers({
      users: {
        user_123: { id: user123Id, language: 'en', name: 'Jane' },
      },
    });
    // #endregion snippet

    const user = await getServerUser(client, user123Id);
    expect(user.language).toBe('en');
    expect(user.name).toBe('Jane');
  });
});
