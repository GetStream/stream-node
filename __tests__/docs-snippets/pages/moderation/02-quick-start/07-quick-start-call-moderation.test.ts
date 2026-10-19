import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import type { UpsertModerationRuleResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS =
  'moderation/_default/02-quick-start/07-quick-start-call-moderation.md';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const secret = process.env.STREAM_SECRET as string;
// The docs' "my-room-12345" entity and "user-abc" creator, test-owned.
const roomEntityId = uniqueId('my-room');
const creatorId = uniqueId('user-abc');
// A real image: an unreachable one makes the check return `status: "partial"`.
const keyframeUrl = 'https://getstream.io/images/og/OG_Home.png';
await getServerClient().upsertUsers([{ id: creatorId }]);

// #region snippet docs="moderation/_default/02-quick-start/07-quick-start-call-moderation.md" heading="Sending Keyframes" tab="Node.js" index=1
// COPY: roomEntityId="my-room-12345", creatorId="user-abc", keyframeUrl="https://your-cdn.com/keyframe-001.jpg"
import { StreamClient } from '@stream-io/node-sdk';

const client = new StreamClient(apiKey, secret);

const response = await client.moderation.check({
  entity_type: 'external:call',
  entity_id: roomEntityId,
  entity_creator_id: creatorId,
  content_published_at: new Date(),
  moderation_payload: {
    images: [keyframeUrl],
  },
});
// #endregion snippet

describe(DOCS, () => {
  const serverClient = getServerClient();
  const cleanup = new Cleanup(serverClient);
  cleanup.users.push(creatorId);

  /** Deletes the rules `upsertModerationRule` created in a region, by the ids it returned. */
  const deleteUpsertedRules = (spy: {
    mock: { results: Array<{ value: unknown }> };
  }) =>
    Promise.all(
      spy.mock.results.map(async (r) => {
        const { rule } =
          await (r.value as Promise<UpsertModerationRuleResponse>);
        if (!rule) throw new Error('upsertModerationRule returned no rule');
        cleanup.add(() =>
          serverClient.moderation.deleteModerationRule({ id: rule.id }),
        );
        return rule;
      }),
    );

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates a call rule via the API', async () => {
    // The docs' rule name, test-owned (rules are app-wide and identified by name).
    const callRuleName = uniqueId('inappropriate-content-detection');
    const upsertRule = vi.spyOn(client.moderation, 'upsertModerationRule');

    // #region snippet docs="moderation/_default/02-quick-start/07-quick-start-call-moderation.md" heading="Configure Via API" tab="Node.js" index=1
    // COPY: callRuleName="Inappropriate Content Detection"
    await client.moderation.upsertModerationRule({
      name: callRuleName,
      description:
        'Detects and responds to inappropriate content in live video and audio',
      rule_type: 'call',
      enabled: true,
      cooldown_period: '5m',
      logic: 'OR',
      conditions: [
        {
          type: 'keyframe_rule',
          keyframe_rule_params: {
            harm_labels: ['NUDITY', 'VIOLENCE'],
            threshold: 3,
            time_window: '1m',
            min_confidence: 0.75,
          },
        },
        {
          type: 'closed_caption_rule',
          closed_caption_rule_params: {
            threshold: 2,
            time_window: '1m',
            llm_harm_labels: {
              HATE_SPEECH:
                'Content that promotes hatred, discrimination, or violence',
            },
          },
        },
      ],
      action_sequences: [
        {
          violation_number: 1,
          actions: ['mute_video', 'call_warning'],
          call_options: { warning_text: 'Please keep your video appropriate' },
        },
        { violation_number: 2, actions: ['mute_audio', 'mute_video'] },
        { violation_number: 3, actions: ['kick_user'] },
      ],
    });
    // #endregion snippet

    const [rule] = await deleteUpsertedRules(upsertRule);
    const { rule: stored } = await client.moderation.getModerationRule({
      id: rule.id,
    });
    expect(stored).toMatchObject({
      name: callRuleName,
      rule_type: 'call',
      enabled: true,
      logic: 'OR',
      cooldown_period: '5m',
    });
    expect(stored?.conditions?.map(({ type }) => type)).toEqual([
      'keyframe_rule',
      'closed_caption_rule',
    ]);
    expect(stored?.conditions?.[0].keyframe_rule_params).toMatchObject({
      harm_labels: ['NUDITY', 'VIOLENCE'],
      threshold: 3,
      min_confidence: 0.75,
    });
    expect(
      stored?.action_sequences?.map(({ violation_number, actions }) => ({
        violation_number,
        actions,
      })),
    ).toEqual([
      { violation_number: 1, actions: ['mute_video', 'call_warning'] },
      { violation_number: 2, actions: ['mute_audio', 'mute_video'] },
      { violation_number: 3, actions: ['kick_user'] },
    ]);
  });

  it('creates a cross-call violation user rule via the API', async () => {
    const userRuleName = uniqueId('ban-repeat-call-offenders');
    const upsertRule = vi.spyOn(client.moderation, 'upsertModerationRule');

    // #region snippet docs="moderation/_default/02-quick-start/07-quick-start-call-moderation.md" heading="Configure Via API" tab="Node.js" index=2
    // COPY: userRuleName="Ban Repeat Call Offenders"
    await client.moderation.upsertModerationRule({
      name: userRuleName,
      rule_type: 'user',
      enabled: true,
      cooldown_period: '24h',
      logic: 'AND',
      conditions: [
        {
          type: 'call_violation_count',
          call_violation_count_params: { threshold: 5, time_window: '24h' },
        },
      ],
      action: { type: 'ban_user' },
    });
    // #endregion snippet

    const [rule] = await deleteUpsertedRules(upsertRule);
    expect(rule).toMatchObject({
      name: userRuleName,
      rule_type: 'user',
      action: { type: 'ban_user' },
      conditions: [
        {
          type: 'call_violation_count',
          call_violation_count_params: { threshold: 5, time_window: '24h' },
        },
      ],
    });
  });

  it('sends keyframes', () => {
    // The check ran at module level (the fence imports the SDK).
    expect(client).toBeInstanceOf(StreamClient);
    expect(response.status).toBe('complete');
    expect(response.recommended_action).toBe('keep');
  });

  it('sends closed captions', async () => {
    // #region snippet docs="moderation/_default/02-quick-start/07-quick-start-call-moderation.md" heading="Sending Closed Captions" tab="Node.js" index=1
    // COPY: roomEntityId="my-room-12345", creatorId="user-abc"
    const response = await client.moderation.check({
      entity_type: 'external:call',
      entity_id: roomEntityId,
      entity_creator_id: creatorId,
      content_published_at: new Date(),
      moderation_payload: {
        texts: ['transcribed audio segment from the call'],
      },
    });
    // #endregion snippet

    expect(response.status).toBe('complete');
    expect(response.recommended_action).toBe('keep');
  });

  it('runs a continuous moderation loop', async () => {
    const roomId = uniqueId('room');

    // #region snippet docs="moderation/_default/02-quick-start/07-quick-start-call-moderation.md" heading="Example: Continuous Moderation Loop" tab="Node.js" index=1
    const ENTITY_ID = `room-${roomId}`;
    const INTERVAL_MS = 5000;

    async function moderateKeyframe(imageUrl: string, userId: string) {
      return client.moderation.check({
        entity_type: 'external:call',
        entity_id: ENTITY_ID,
        entity_creator_id: userId,
        content_published_at: new Date(),
        moderation_payload: {
          images: [imageUrl],
        },
      });
    }

    async function moderateCaption(text: string, userId: string) {
      return client.moderation.check({
        entity_type: 'external:call',
        entity_id: ENTITY_ID,
        entity_creator_id: userId,
        content_published_at: new Date(),
        moderation_payload: {
          texts: [text],
        },
      });
    }
    // #endregion snippet

    expect(INTERVAL_MS).toBe(5000);
    const check = vi.spyOn(client.moderation, 'check');
    const keyframe = await moderateKeyframe(keyframeUrl, creatorId);
    const caption = await moderateCaption('hello everyone', creatorId);
    // With the page's call rule (keyframe condition) in place, the image is analysed
    // asynchronously: `status: "partial"` plus a `task_id`.
    expect(['complete', 'partial']).toContain(keyframe.status);
    expect(keyframe.recommended_action).toBe('keep');
    expect(caption.status).toBe('complete');
    expect(check.mock.calls.map(([request]) => request.entity_id)).toEqual([
      ENTITY_ID,
      ENTITY_ID,
    ]);
  });
});
