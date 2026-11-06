import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'moderation/_default/03-moderation-engines/05-image-moderation.md';

// A small image that Stream's servers can download.
const REACHABLE_IMAGE =
  'https://theme.zdassets.com/theme_assets/9442057/efc3820e436f9150bc8cf34267fff4df052a1f9c.png';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' app-wide "chat:messaging" and "marketplace" policies, test-owned.
  const policyKey = uniqueId('image-policy');
  const marketplaceKey = uniqueId('marketplace');
  const creatorId = uniqueId('user-42');

  beforeAll(async () => {
    cleanup.users.push(creatorId);
    await client.upsertUsers([{ id: creatorId }]);
    cleanup.add(() => client.moderation.deleteConfig({ key: policyKey }));
    cleanup.add(() => client.moderation.deleteConfig({ key: marketplaceKey }));
    // The "marketplace" policy the "Send images" check uses: async image moderation.
    await client.moderation.upsertConfig({
      key: marketplaceKey,
      ai_image_config: {
        rules: [{ label: 'Explicit', action: 'remove', min_confidence: 70 }],
      },
    });
  });

  afterAll(() => cleanup.run());

  it('configures image moderation', async () => {
    // #region snippet docs="moderation/_default/03-moderation-engines/05-image-moderation.md" heading="Configuration" tab="Node.js" index=1
    // COPY: policyKey="chat:messaging"
    await client.moderation.upsertConfig({
      key: policyKey,
      ai_image_config: {
        rules: [
          { label: 'Explicit', action: 'remove', min_confidence: 70 },
          { label: 'Violence', action: 'flag', min_confidence: 50 },
        ],
        ocr_rules: [{ label: 'PII', action: 'flag' }],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({ key: policyKey });
    expect(config?.ai_image_config).toMatchObject({
      enabled: true,
      rules: [
        { label: 'Explicit', action: 'remove', min_confidence: 70 },
        { label: 'Violence', action: 'flag', min_confidence: 50 },
      ],
      ocr_rules: [{ label: 'PII', action: 'flag' }],
    });
  });

  it('sends images to the Check API', async () => {
    const listingId = uniqueId('listing-123');

    // #region snippet docs="moderation/_default/03-moderation-engines/05-image-moderation.md" heading="Send images" tab="Node.js" index=1
    // COPY: listingId="listing-123", creatorId="user-42", marketplaceKey="marketplace"
    const response = await client.moderation.check({
      entity_type: 'listing',
      entity_id: listingId,
      entity_creator_id: creatorId,
      config_key: marketplaceKey,
      moderation_payload: {
        images: ['https://cdn.example.com/listings/123/photo-1.jpg'],
      },
    });
    // #endregion snippet

    // Async image moderation: the check returns before the analysis, with a task id.
    // The docs say `status: "pending"`; the test app answers `"partial"`.
    expect(['pending', 'partial']).toContain(response.status);
    expect(typeof response.task_id).toBe('string');
    expect(response.recommended_action).toBe('keep');
  });

  it('turns on synchronous image moderation', async () => {
    // #region snippet docs="moderation/_default/03-moderation-engines/05-image-moderation.md" heading="Synchronous moderation" tab="Node.js" index=1
    // COPY: marketplaceKey="marketplace"
    await client.moderation.upsertConfig({
      key: marketplaceKey,
      ai_image_config: {
        async: false,
        rules: [{ label: 'Explicit', action: 'remove', min_confidence: 50 }],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({
      key: marketplaceKey,
    });
    expect(config?.ai_image_config).toMatchObject({
      async: false,
      rules: [{ label: 'Explicit', action: 'remove', min_confidence: 50 }],
    });

    // Check now returns the image verdict in its response: no task id.
    const check = await client.moderation.check({
      entity_type: 'listing',
      entity_id: uniqueId('listing'),
      entity_creator_id: creatorId,
      config_key: marketplaceKey,
      moderation_payload: { images: [REACHABLE_IMAGE] },
    });
    expect(check.status).toBe('complete');
    expect(check.task_id).toBeUndefined();
    expect(check.recommended_action).toBe('keep');
  });
});
