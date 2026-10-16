import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { EventResponse, Response } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';

const DOCS = 'chat/_default/05-features/02-events.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');
  const targetUserID = uniqueId('target-user');
  const channelId = uniqueId('general');
  const cid = `messaging:${channelId}`;

  beforeAll(async () => {
    cleanup.users.push(johnId, targetUserID);
    cleanup.channels.push(cid);
    await client.upsertUsers([{ id: johnId }, { id: targetUserID }]);
    await client.chat.channel('messaging', channelId).getOrCreate({
      data: { created_by_id: johnId, members: [{ user_id: johnId }] },
    });
  });

  afterAll(() => cleanup.run());

  it('sends a custom event to a channel', async () => {
    const spy = vi.spyOn(client.chat, 'sendEvent');

    // #region snippet docs="chat/_default/05-features/02-events.md" heading="To a channel" tab="Node.js" index=1
    // COPY: channelId="general", johnId="john"
    const channel = client.chat.channel('messaging', channelId);

    // server-side the event must name the user it is sent on behalf of
    await channel.sendEvent({
      event: {
        type: 'friendship_request',
        user_id: johnId,
        custom: { text: 'Hey there, long time no see!' },
      },
    });
    // #endregion snippet

    expect(spy).toHaveBeenCalledTimes(1);
    const response = await (spy.mock.results[0]
      ?.value as Promise<EventResponse>);
    spy.mockRestore();
    expect(channel.cid).toBe(cid);
    expect(response.event.type).toBe('friendship_request');
    expect(response.event.cid).toBe(cid);
    expect(response.event.user?.id).toBe(johnId);
    expect(response.event.custom.text).toBe('Hey there, long time no see!');
  });

  it('sends a custom event to a user', async () => {
    const spy = vi.spyOn(client.chat, 'sendUserCustomEvent');

    // #region snippet docs="chat/_default/05-features/02-events.md" heading="To a user" tab="Node.js" index=1
    await client.chat.sendUserCustomEvent({
      user_id: targetUserID,
      event: {
        type: 'friendship_request',
        custom: { text: 'Tommaso wants to be your friend' },
      },
    });
    // #endregion snippet

    expect(spy).toHaveBeenCalledTimes(1);
    const response = await (spy.mock.results[0]?.value as Promise<Response>);
    spy.mockRestore();
    expect(typeof response.duration).toBe('string');
  });
});
