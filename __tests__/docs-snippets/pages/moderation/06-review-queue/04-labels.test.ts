import { afterAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'moderation/_default/06-review-queue/04-labels.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  afterAll(() => cleanup.run());

  it('classifies content', async () => {
    const contentId = uniqueId('msg');
    // A customer-supplied author id; registered in case the API creates the user.
    const authorId = uniqueId('author');
    cleanup.users.push(authorId);

    // #region snippet docs="moderation/_default/06-review-queue/04-labels.md" heading="Classify Content" tab="Node.js" index=1
    // COPY: contentId="msg-123", authorId="user-42"
    const response = await client.moderation.labels({
      content: 'you are a fucking idiot',
      content_type: 'message',
      category: 'chat',
      content_id: contentId,
      user_id: authorId,
    });
    // #endregion snippet

    expect(response.content_id).toBe(contentId);
    expect(response.labels).toEqual(
      expect.arrayContaining(['insult', 'vulgarity']),
    );
    expect(response.harm_type).toBe('hateful');
    expect(response.language).toBe('en');
    expect(['keep', 'flag', 'remove']).toContain(response.recommended_action);
    // Labels are classification only: no review queue item is created.
    const { items } = await client.moderation.queryReviewQueue({
      filter: { entity_id: contentId },
    });
    expect(items).toEqual([]);
  });

  it('queries stored results', async () => {
    // #region snippet docs="moderation/_default/06-review-queue/04-labels.md" heading="Query Stored Results" tab="Node.js" index=1
    const response = await client.moderation.queryLabelResults({
      filter: {
        category: 'chat',
        language: 'en',
        harm_type: 'hateful',
        date_range: '2026-04-01_2026-04-23',
      },
      sort: [{ field: 'created_at', direction: -1 }],
      limit: 25,
    });
    // #endregion snippet

    // Storage is opt-in and off on the test app: the query returns empty pages.
    expect(Array.isArray(response.label_results)).toBe(true);
    expect(response.label_results.length).toBeLessThanOrEqual(25);
    for (const result of response.label_results) {
      expect(result).toMatchObject({
        category: 'chat',
        language: 'en',
        harm_type: 'hateful',
      });
    }
  });
});
