import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { GetConfigResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS =
  'moderation/_default/03-moderation-engines/01-ai-llm-text-harm-detection-engine.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "news-comments" policy and "user-42" comment author, test-owned.
  const configKey = uniqueId('news-comments');
  const creatorId = uniqueId('user-42');

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('configures custom data keys as LLM context', async () => {
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));

    // #region snippet docs="moderation/_default/03-moderation-engines/01-ai-llm-text-harm-detection-engine.md" heading="Context from custom data" tab="Node.js" index=1
    // COPY: configKey="news-comments"
    await client.moderation.upsertConfig({
      key: configKey,
      llm_config: {
        enabled: true,
        app_context:
          'Comment sections under sports articles and videos. Trash talk about teams and performances is normal and allowed; attacks on people are not.',
        context_custom_keys: ['content', 'thread'],
        custom_keys_context_description:
          'content is the article or video the comment is posted under. thread.topLevel is the comment being replied to; thread.earlierReplies are earlier replies, oldest first.',
        rules: [
          {
            label: 'HARASSMENT',
            description:
              'Insulting, demeaning or bullying another user, player, coach or referee as a person',
            action: 'flag',
          },
          {
            label: 'VIOLENCE',
            description:
              "Threats, wishing injury or death on someone, or encouraging people to show up at someone's home",
            action: 'remove',
          },
        ],
      },
    });
    // #endregion snippet

    const { config }: GetConfigResponse = await client.moderation.getConfig({
      key: configKey,
    });
    expect(config?.llm_config).toMatchObject({
      enabled: true,
      context_custom_keys: ['content', 'thread'],
      custom_keys_context_description: expect.stringContaining(
        'thread.topLevel is the comment being replied to',
      ) as unknown,
    });
    expect(
      config?.llm_config?.rules?.map(({ label, action }) => ({
        label,
        action,
      })),
    ).toEqual([
      { label: 'HARASSMENT', action: 'flag' },
      { label: 'VIOLENCE', action: 'remove' },
    ]);
  });

  it('checks a comment with its context', async () => {
    cleanup.users.push(creatorId);
    await client.upsertUsers([{ id: creatorId }]);
    const commentId = uniqueId('comment-123');
    const check = vi.spyOn(client.moderation, 'check');

    // #region snippet docs="moderation/_default/03-moderation-engines/01-ai-llm-text-harm-detection-engine.md" heading="Context from custom data" tab="Node.js" index=2
    // COPY: commentId="comment-123", creatorId="user-42", configKey="news-comments"
    await client.moderation.check({
      entity_type: 'comment',
      entity_id: commentId,
      entity_creator_id: creatorId,
      config_key: configKey,
      moderation_payload: {
        texts: [
          "bet, see everyone at his place after the game, I'll bring friends",
        ],
        custom: {
          schemaVersion: 1,
          content: {
            type: 'video',
            title: 'Controversial late call by referee decides the game',
          },
          thread: {
            topLevel: {
              id: 'comment-100',
              user: { id: 'user-7' },
              text: 'That ref lives at 22 Oak Ridge Drive, someone should pay him a visit',
            },
            earlierReplies: [
              {
                id: 'comment-110',
                user: { id: 'user-9' },
                text: 'He deserves whatever he gets',
              },
            ],
          },
        },
      },
    });
    // #endregion snippet

    // The LLM engine doesn't classify on the test app (even a direct threat comes back
    // `keep`), so the docs' `remove` / `VIOLENCE` verdict can't be asserted here: check
    // that the policy was applied and the check completed.
    const response = await (check.mock.results[0].value as ReturnType<
      typeof client.moderation.check
    >);
    expect(response.status).toBe('complete');
    expect(['keep', 'flag', 'remove']).toContain(response.recommended_action);
  });
});
