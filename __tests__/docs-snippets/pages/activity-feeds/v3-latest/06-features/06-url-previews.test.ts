import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { StreamError } from '../../../../../../index';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { waitForAppSetting } from '../../../../helpers/server';
import { retry } from '../../../../helpers/wait';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/06-url-previews.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

/**
 * `https://example.com/...` has no OG data ("could not find any opengraph data for the
 * given URL", 2026-10-16), so the tests COPY-map the docs URLs to one that has.
 */
const enrichedUrl = 'https://getstream.io';

/** Retries `getActivity` until URL enrichment (async on the test app) added a preview. */
const waitForActivityPreview = (id: string) =>
  retry(
    async () => {
      const { activity } = await client.feeds.getActivity({ id });
      if (!activity.attachments[0]) throw new Error('no preview yet');
      return activity;
    },
    { timeout: 30000 },
  );

/** Retries `getComment` until URL enrichment added a preview. */
const waitForCommentPreview = (id: string) =>
  retry(
    async () => {
      const { comment } = await client.feeds.getComment({ id });
      if (!comment.attachments?.[0]) throw new Error('no preview yet');
      return comment;
    },
    { timeout: 30000 },
  );

describe(DOCS, () => {
  let ericId: string;
  let aliceId: string;
  let ericFeed: string;
  /** The enriched activity and comment from the first snippets. */
  let enrichedActivityId: string;
  let enrichedCommentId: string;

  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    await client.upsertUsers([{ id }]);
    return id;
  };

  const createActivity = async () => {
    const { activity } = await client.feeds.addActivity({
      feeds: [ericFeed],
      type: 'post',
      text: 'An activity to comment on',
      user_id: ericId,
    });
    return activity.id;
  };

  beforeAll(async () => {
    ericId = await createUser('eric');
    aliceId = await createUser('alice');
    ericFeed = `user:${ericId}`;
    cleanup.feeds.push(ericFeed);
    await client.feeds.feed('user', ericId).getOrCreate({ user_id: ericId });
  });
  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('adds an activity with URL enrichment', async () => {
    const postText = `Check this out: ${enrichedUrl}`;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/06-url-previews.md" heading="Activities with URL enrichment" tab="Node.js" index=1
    // COPY: ericFeed="user:eric", ericId="eric", postText="Check this out: https://example.com/article"
    const response = await client.feeds.addActivity({
      feeds: [ericFeed],
      type: 'post',
      text: postText,
      user_id: ericId,
    });
    // response.activity.attachments may include OG preview when enrichment completes
    // #endregion snippet

    enrichedActivityId = response.activity.id;
    const activity = await waitForActivityPreview(enrichedActivityId);
    expect(activity.attachments[0]).toMatchObject({
      og_scrape_url: enrichedUrl,
    });
    expect(typeof activity.attachments[0].title).toBe('string');
  });

  it('adds a comment with URL enrichment', async () => {
    const activityId = enrichedActivityId;
    const commentText = `See also: ${enrichedUrl}`;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/06-url-previews.md" heading="Comments with URL enrichment" tab="Node.js" index=1
    // COPY: aliceId="alice", commentText="See also: https://example.com/related"
    const response = await client.feeds.addComment({
      comment: commentText,
      object_id: activityId,
      object_type: 'activity',
      user_id: aliceId,
    });
    // #endregion snippet

    enrichedCommentId = response.comment.id;
    const comment = await waitForCommentPreview(enrichedCommentId);
    expect(comment.attachments?.[0]).toMatchObject({
      og_scrape_url: enrichedUrl,
    });
  });

  it('skips URL enrichment', async () => {
    const activityId = await createActivity();
    const pageUrl = enrichedUrl;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/06-url-previews.md" heading="Skipping URL enrichment" tab="Node.js" index=1
    // COPY: ericFeed="user:eric", ericId="eric", aliceId="alice", pageUrl="https://example.com/page"
    // Activity
    const activityResponse = await client.feeds.addActivity({
      feeds: [ericFeed],
      type: 'post',
      text: pageUrl,
      user_id: ericId,
      skip_enrich_url: true,
    });
    // Comment
    const commentResponse = await client.feeds.addComment({
      comment: pageUrl,
      object_id: activityId,
      object_type: 'activity',
      user_id: aliceId,
      skip_enrich_url: true,
    });
    // #endregion snippet

    // The same URL is enriched within seconds without the flag (tests above).
    await new Promise((resolve) => setTimeout(resolve, 8000));
    const { activity } = await client.feeds.getActivity({
      id: activityResponse.activity.id,
    });
    expect(activity.attachments).toEqual([]);
    const { comment } = await client.feeds.getComment({
      id: commentResponse.comment.id,
    });
    expect(comment.attachments ?? []).toEqual([]);
  });

  it('reads URL preview attachments', async () => {
    const activityId = enrichedActivityId;
    // The enriched comment is the activity's only comment.
    await waitForCommentPreview(enrichedCommentId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/06-url-previews.md" heading="Reading URL preview attachments" tab="Node.js" index=1
    // From an activity
    const { activity } = await client.feeds.getActivity({ id: activityId });
    (activity.attachments || []).forEach((a) => {
      // use a.title, a.image_url, a.og_scrape_url, etc.
      console.log(a.title, a.image_url, a.og_scrape_url);
    });

    // From a comment
    const comment = activity.comments[0];
    (comment?.attachments || []).forEach((a) => {
      // use a.title, a.image_url, a.og_scrape_url, etc.
      console.log(a.title, a.image_url, a.og_scrape_url);
    });
    // #endregion snippet

    expect(comment.id).toBe(enrichedCommentId);
    expect(log.mock.calls).toHaveLength(2);
    for (const call of log.mock.calls) {
      expect(call[2]).toBe(enrichedUrl);
      expect(typeof call[0]).toBe('string');
    }
  });

  it('adds OG data from getOG as attachments', async () => {
    const activityId = await createActivity();
    const articleUrl = enrichedUrl;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/06-url-previews.md" heading="URL enrichment using `getOG` endpoint" tab="Node.js" index=1
    // COPY: articleUrl="https://example.com/article", ericFeed="user:eric", ericId="eric", aliceId="alice"
    const url = articleUrl;
    const attachments = [];

    try {
      const ogResponse = await client.getOG({ url });
      const { duration: _d, metadata: _m, ...ogData } = ogResponse;
      attachments.push(ogData);
    } catch (error) {
      // OG may not be fetched for all URLs
      if (!(error instanceof StreamError && error.code === 4)) {
        throw error;
      }
    }

    // Activity
    const activityResponse = await client.feeds.addActivity({
      feeds: [ericFeed],
      type: 'post',
      text: `Check this out: ${url}`,
      user_id: ericId,
      skip_enrich_url: true,
      attachments: attachments,
    });
    // Comment
    const commentResponse = await client.feeds.addComment({
      comment: `See also: ${url}`,
      object_id: activityId,
      object_type: 'activity',
      user_id: aliceId,
      skip_enrich_url: true,
      attachments: attachments,
    });
    // #endregion snippet

    expect(attachments).toHaveLength(1);
    expect(activityResponse.activity.attachments).toHaveLength(1);
    expect(activityResponse.activity.attachments[0]).toMatchObject({
      og_scrape_url: enrichedUrl,
      title: attachments[0].title,
    });
    expect(commentResponse.comment.attachments).toHaveLength(1);
    expect(commentResponse.comment.attachments?.[0]).toMatchObject({
      og_scrape_url: enrichedUrl,
    });
  });

  it('switches between sync and async enrichment', async () => {
    const { app } = await client.getApp();
    const original = app.async_url_enrich_enabled;
    cleanup.add(async () => {
      await client.updateApp({ async_url_enrich_enabled: original });
      await waitForAppSetting(client, 'async_url_enrich_enabled', original);
    });

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/06-url-previews.md" heading="Sync vs async enrichment" tab="Node.js" index=1
    // Async enrichment: API returns immediately; OG data is attached in the background
    await client.updateApp({ async_url_enrich_enabled: true });

    // Sync enrichment: API waits for OG scraping (up to ~4s) before responding
    await client.updateApp({ async_url_enrich_enabled: false });
    // #endregion snippet

    await waitForAppSetting(client, 'async_url_enrich_enabled', false);
    await client.updateApp({ async_url_enrich_enabled: original });
    await waitForAppSetting(client, 'async_url_enrich_enabled', original);
  });
});
