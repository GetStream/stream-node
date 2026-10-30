import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerUser } from '../../../helpers/server';

const DOCS = 'moderation/_default/11-guides/06-bypass-user-from-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "user-123", test-owned.
  const userId = uniqueId('user');

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);
  });

  afterAll(() => cleanup.run());

  it('enables moderation bypass for a user', async () => {
    expect(
      (await getServerUser(client, userId)).bypass_moderation ?? false,
    ).toBe(false);

    // #region snippet docs="moderation/_default/11-guides/06-bypass-user-from-moderation.md" heading="Enable or Disable Bypass" tab="Node.js" index=1
    // COPY: userId="user-123"
    await client.moderation.bypass({
      target_user_id: userId,
      enabled: true,
    });
    // #endregion snippet

    expect((await getServerUser(client, userId)).bypass_moderation).toBe(true);
  });
});
