import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS =
  'moderation/_default/03-moderation-engines/08-usernames-and-images.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' app-wide "username:default" and "user_profile:default" policies,
  // test-owned. `labels` fails with code 4 "configuration not found" without the policy.
  const usernamePolicy = `username:${uniqueId('usernames')}`;
  const profilePolicy = `user_profile:${uniqueId('profiles')}`;
  const userId = uniqueId('user');

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
    cleanup.add(() => client.moderation.deleteConfig({ key: usernamePolicy }));
    cleanup.add(() => client.moderation.deleteConfig({ key: profilePolicy }));
    await client.moderation.upsertConfig({
      key: usernamePolicy,
      ai_text_config: { rules: [{ label: 'INSULT', action: 'flag' }] },
    });
    await client.moderation.upsertConfig({
      key: profilePolicy,
      ai_text_config: { rules: [{ label: 'INSULT', action: 'flag' }] },
      ai_image_config: {
        rules: [{ label: 'Explicit', action: 'remove', min_confidence: 50 }],
      },
    });
  });

  afterAll(() => cleanup.run());

  it('checks a username with the labels fast path', async () => {
    // #region snippet docs="moderation/_default/03-moderation-engines/08-usernames-and-images.md" heading="Check Username" tab="Node.js" index=1
    // COPY: usernamePolicy="username:default"
    const response = await client.moderation.labels({
      content: 'username_to_check',
      content_type: 'username',
      policy: usernamePolicy,
    });

    if (response.recommended_action === 'keep') {
      // Username is acceptable
    }
    // #endregion snippet

    expect(response.recommended_action).toBe('keep');
  });

  it('checks a username against a user profile policy', async () => {
    // #region snippet docs="moderation/_default/03-moderation-engines/08-usernames-and-images.md" heading="Check Username" tab="Node.js" index=2
    // COPY: profilePolicy="user_profile:default"
    const response = await client.moderation.check({
      entity_type: 'stream:v1:user_profile',
      entity_id: userId,
      entity_creator_id: userId,
      moderation_payload: { texts: ['username_to_check'] },
      config_key: profilePolicy,
    });

    // Response will indicate if the username is acceptable
    if (response.recommended_action === 'keep') {
      // Username is acceptable, proceed with user creation/update
    } else {
      // Username violates moderation rules, ask user to choose a different name
    }
    // #endregion snippet

    expect(response.status).toBe('complete');
    expect(response.recommended_action).toBe('keep');
  });

  it('checks a profile image', async () => {
    // #region snippet docs="moderation/_default/03-moderation-engines/08-usernames-and-images.md" heading="Check Profile Images" tab="Node.js" index=1
    // COPY: profilePolicy="user_profile:default"
    const response = await client.moderation.check({
      entity_type: 'stream:v1:user_profile',
      entity_id: userId,
      entity_creator_id: userId,
      moderation_payload: { images: ['https://example.com/profile.jpg'] },
      config_key: profilePolicy,
    });

    // Handle the moderation result
    if (response.recommended_action === 'keep') {
      // Image is safe to use as profile picture
    } else {
      // Image violates moderation rules
    }
    // #endregion snippet

    expect(['complete', 'partial']).toContain(response.status);
    expect(response.recommended_action).toBe('keep');
  });
});
