import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS =
  'moderation/_default/03-moderation-engines/06-ai-video-file-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' app-wide "chat:messaging" and "marketplace" policies, test-owned.
  const policyKey = uniqueId('video-policy');
  const marketplaceKey = uniqueId('marketplace');
  const creatorId = uniqueId('user-42');

  beforeAll(async () => {
    cleanup.users.push(creatorId);
    await client.upsertUsers([{ id: creatorId }]);
    cleanup.add(() => client.moderation.deleteConfig({ key: policyKey }));
    cleanup.add(() => client.moderation.deleteConfig({ key: marketplaceKey }));
    // The "marketplace" policy the check uses, with video moderation on.
    await client.moderation.upsertConfig({
      key: marketplaceKey,
      ai_video_config: {
        rules: [{ label: 'Explicit', action: 'remove', min_confidence: 70 }],
      },
    });
  });

  afterAll(() => cleanup.run());

  it('configures video moderation', async () => {
    // #region snippet docs="moderation/_default/03-moderation-engines/06-ai-video-file-moderation.md" heading="Configuration" tab="Node.js" index=1
    // COPY: policyKey="chat:messaging"
    await client.moderation.upsertConfig({
      key: policyKey,
      ai_video_config: {
        rules: [
          { label: 'Explicit', action: 'remove', min_confidence: 70 },
          { label: 'Violence', action: 'flag', min_confidence: 50 },
        ],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({ key: policyKey });
    expect(config?.ai_video_config).toMatchObject({
      enabled: true,
      rules: [
        { label: 'Explicit', action: 'remove', min_confidence: 70 },
        { label: 'Violence', action: 'flag', min_confidence: 50 },
      ],
    });
    // Video and image are set separately.
    expect(config?.ai_image_config).toBeNull();
  });

  it('sends videos to the Check API', async () => {
    const listingId = uniqueId('listing-123');

    // #region snippet docs="moderation/_default/03-moderation-engines/06-ai-video-file-moderation.md" heading="Configuration" tab="Node.js" index=2
    // COPY: listingId="listing-123", creatorId="user-42", marketplaceKey="marketplace"
    const response = await client.moderation.check({
      entity_type: 'listing',
      entity_id: listingId,
      entity_creator_id: creatorId,
      config_key: marketplaceKey,
      moderation_payload: {
        videos: ['https://cdn.example.com/listings/123/tour.mp4'],
      },
    });
    // response.status is "pending" until the video is analyzed
    // #endregion snippet

    // Video analysis is always async: the check returns at once with a task id.
    // The docs say `"pending"`; the test app answers `"partial"`.
    expect(['pending', 'partial']).toContain(response.status);
    expect(typeof response.task_id).toBe('string');
    expect(response.recommended_action).toBe('keep');
  });
});
