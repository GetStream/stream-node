import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { UpdateChannelResponse } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerChannel } from '../../../helpers/server';

const DOCS = '_default/05-features/10-advanced/11-slow_mode_and_throttling.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const userId = uniqueId('slowmode-user');
  const channelId = uniqueId('general');

  beforeAll(async () => {
    cleanup.users.push(userId);
    await client.upsertUsers([{ id: userId }]);

    cleanup.channels.push(`messaging:${channelId}`);
    await client.chat
      .channel('messaging', channelId)
      .getOrCreate({ data: { created_by_id: userId } });
  });

  afterAll(() => cleanup.run());

  it('enables, changes and disables slow mode', async () => {
    const updateSpy = vi.spyOn(client.chat, 'updateChannel');

    // #region snippet docs="_default/05-features/10-advanced/11-slow_mode_and_throttling.md" heading="Channel Slow Mode" tab="Node.js" index=1
    // COPY: channelId="general"
    const channel = client.chat.channel('messaging', channelId);

    // enable slow mode and set cooldown to 1s
    await channel.update({ cooldown: 1 });

    // increase cooldown to 30s
    await channel.update({ cooldown: 30 });

    // disable slow mode
    await channel.update({ cooldown: 0 });
    // #endregion snippet

    const responses = await Promise.all(
      updateSpy.mock.results.map(
        (r) => r.value as Promise<UpdateChannelResponse>,
      ),
    );
    updateSpy.mockRestore();

    expect(responses.map((r) => r.channel?.cooldown ?? 0)).toEqual([1, 30, 0]);

    const current = await getServerChannel(client, `messaging:${channelId}`);
    expect(current.channel?.cooldown ?? 0).toBe(0);
  });
});
