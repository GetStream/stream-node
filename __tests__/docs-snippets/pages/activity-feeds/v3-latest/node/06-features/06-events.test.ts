import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../../helpers/clients';
import { Cleanup } from '../../../../../helpers/cleanup';
import {
  saveAndRestoreEventHooks,
  waitForEventHooks,
} from '../../../../../helpers/server';

const DOCS = 'activity-feeds/v3-latest/node/06-features/06-events.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  beforeAll(async () => {
    await saveAndRestoreEventHooks(client, cleanup);
  });

  afterAll(() => cleanup.run());

  it('configures webhook event hooks', async () => {
    // The docs' "<webhook url>" placeholder.
    const webhookUrl = 'https://example.com/webhooks/stream/feeds';

    // #region snippet docs="activity-feeds/v3-latest/node/06-features/06-events.md" heading="" tab="Node.js" index=1
    // COPY: webhookUrl="<webhook url>"
    await client.updateApp({
      event_hooks: [
        {
          hook_type: 'webhook',
          enabled: true,
          // Pass an empty array to subscribe to all events
          event_types: [],
          webhook_url: webhookUrl,
        },
        {
          hook_type: 'webhook',
          enabled: true,
          // Subscribe only to specific events
          event_types: ['feeds.activity.added' /* ... */],
          webhook_url: webhookUrl,
        },
      ],
    });
    // #endregion snippet

    // The array replaces every existing hook.
    const hooks = await waitForEventHooks(
      client,
      (h) =>
        h.length === 2 && h.every((hook) => hook.webhook_url === webhookUrl),
    );
    expect(hooks.map((h) => [h.hook_type, h.enabled])).toEqual([
      ['webhook', true],
      ['webhook', true],
    ]);
    // Hook order isn't stable on read: an empty array reads back as every
    // event type plus "*", the other hook keeps its one type.
    const [allEvents, specificEvents] = [...hooks].sort(
      (a, b) => (b.event_types?.length ?? 0) - (a.event_types?.length ?? 0),
    );
    expect(allEvents.event_types).toEqual(expect.arrayContaining(['*']));
    expect(specificEvents.event_types).toEqual(['feeds.activity.added']);
  });
});
