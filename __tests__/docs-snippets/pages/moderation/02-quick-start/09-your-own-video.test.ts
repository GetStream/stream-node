import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'moderation/_default/02-quick-start/09-your-own-video.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "my-room-12345" entity and "user-abc" creator, test-owned.
  const roomEntityId = uniqueId('my-room');
  const creatorId = uniqueId('user-abc');

  beforeAll(async () => {
    cleanup.users.push(creatorId);
    await client.upsertUsers([{ id: creatorId }]);
  });

  afterAll(() => cleanup.run());

  it('sends a keyframe', async () => {
    // A real image: an unreachable one makes the check return `status: "partial"`.
    const keyframeUrl = 'https://getstream.io/images/og/OG_Home.png';

    // #region snippet docs="moderation/_default/02-quick-start/09-your-own-video.md" heading="Send a keyframe" tab="Node.js" index=1
    // COPY: roomEntityId="my-room-12345", creatorId="user-abc", keyframeUrl="https://your-cdn.com/keyframe-001.jpg"
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

    // With a call rule (keyframe condition) on the app, images are analysed
    // asynchronously: `status: "partial"` plus a `task_id`.
    expect(['complete', 'partial']).toContain(response.status);
    expect(response.recommended_action).toBe('keep');
  });

  it('sends a caption', async () => {
    // #region snippet docs="moderation/_default/02-quick-start/09-your-own-video.md" heading="Send a caption" tab="Node.js" index=1
    // COPY: roomEntityId="my-room-12345", creatorId="user-abc"
    const response = await client.moderation.check({
      entity_type: 'external:call',
      entity_id: roomEntityId,
      entity_creator_id: creatorId,
      content_published_at: new Date(),
      moderation_payload: {
        texts: ['transcribed audio segment'],
      },
    });
    // #endregion snippet

    expect(response.status).toBe('complete');
    expect(response.recommended_action).toBe('keep');
  });
});
