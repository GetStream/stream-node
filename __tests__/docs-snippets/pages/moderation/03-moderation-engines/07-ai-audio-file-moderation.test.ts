import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS =
  'moderation/_default/03-moderation-engines/07-ai-audio-file-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' app-wide "chat:messaging" policy, test-owned (both fences use it).
  const policyKey = uniqueId('audio-policy');
  const creatorId = uniqueId('user-42');

  beforeAll(async () => {
    cleanup.users.push(creatorId);
    await client.upsertUsers([{ id: creatorId }]);
    cleanup.add(() => client.moderation.deleteConfig({ key: policyKey }));
  });

  afterAll(() => cleanup.run());

  it('configures audio moderation', async () => {
    // #region snippet docs="moderation/_default/03-moderation-engines/07-ai-audio-file-moderation.md" heading="Configuration" tab="Node.js" index=1
    // COPY: policyKey="chat:messaging"
    await client.moderation.upsertConfig({
      key: policyKey,
      ai_audio_config: {
        ai_text_config: {
          rules: [{ label: 'HATRED', action: 'flag' }],
        },
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({ key: policyKey });
    // A rule with an action turns audio moderation on.
    expect(config?.ai_audio_config?.enabled).toBe(true);
    expect(config?.ai_audio_config?.ai_text_config?.rules).toMatchObject([
      { label: 'HATRED', action: 'flag' },
    ]);
    // Text policy rules don't apply to transcripts: the policy has no text config.
    expect(config?.ai_text_config).toBeNull();
  });

  it('sends audio to the Check API', async () => {
    const voiceNoteId = uniqueId('voice-note-123');

    // #region snippet docs="moderation/_default/03-moderation-engines/07-ai-audio-file-moderation.md" heading="Send audio" tab="Node.js" index=1
    // COPY: voiceNoteId="voice-note-123", creatorId="user-42", policyKey="chat:messaging"
    const response = await client.moderation.check({
      entity_type: 'voice_note',
      entity_id: voiceNoteId,
      entity_creator_id: creatorId,
      config_key: policyKey,
      moderation_payload: {
        audios: ['https://cdn.example.com/voice/123.m4a'],
      },
    });
    // response.status is "pending" until transcription and classification finish
    // #endregion snippet

    // Audio is always async: the check returns at once with a task id.
    // The docs say `"pending"`; the test app answers `"partial"`.
    expect(['pending', 'partial']).toContain(response.status);
    expect(typeof response.task_id).toBe('string');
    expect(response.recommended_action).toBe('keep');
  });
});
