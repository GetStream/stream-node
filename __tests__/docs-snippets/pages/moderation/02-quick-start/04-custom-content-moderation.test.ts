import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { waitForReviewItem } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS =
  'moderation/_default/02-quick-start/04-custom-content-moderation.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "custom:my-content-platform-1" policy, test-owned: a blocklist that
  // flags a word of the docs text.
  const configKey = `custom:${uniqueId('my-content-platform')}`;
  const blocklist = uniqueId('custom-content-words');
  // The docs' "entity_type" placeholder, test-owned, so the review queue query of the
  // next snippet only matches this file's items.
  const entityType = uniqueId('entity-type');
  const entityId = uniqueId('entity');
  const creatorId = uniqueId('entity-creator');

  beforeAll(async () => {
    cleanup.users.push(creatorId);
    await client.upsertUsers([{ id: creatorId }]);
    await client.createBlockList({ name: blocklist, words: ['bullshit'] });
    cleanup.add(() => client.deleteBlockList({ name: blocklist }));
    // A new blocklist isn't known to the moderation API right away ("Blocklist not found").
    await retry(
      () =>
        client.moderation.upsertConfig({
          key: configKey,
          block_list_config: { rules: [{ name: blocklist, action: 'flag' }] },
        }),
      { retryIf: (error) => String(error).includes('Blocklist not found') },
    );
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
    // A new policy can take a moment to apply.
    await retry(async () => {
      const { recommended_action } = await client.moderation.check({
        entity_type: entityType,
        entity_id: uniqueId('warmup'),
        entity_creator_id: creatorId,
        config_key: configKey,
        moderation_payload: { texts: ['bullshit'] },
      });
      if (recommended_action !== 'flag') {
        throw new Error(`recommended_action: ${recommended_action}`);
      }
    });
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('submits custom content to the Check API', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="moderation/_default/02-quick-start/04-custom-content-moderation.md" heading="Submit custom content to the moderation Check API" tab="Node.js" index=1
    // COPY: entityType="entity_type", entityId="entity_id", creatorId="entity_creator_id", configKey="custom:my-content-platform-1"
    const response = await client.moderation.check({
      entity_type: entityType,
      entity_id: entityId,
      entity_creator_id: creatorId,
      moderation_payload: {
        texts: ['this is bullshit', 'f*ck you as***le'],
        images: ['example.com/test.jpg'],
      },
      config_key: configKey,
    });

    console.log(response.recommended_action); // keep | flag | remove | shadow
    // #endregion snippet

    expect(response.recommended_action).toBe('flag');
    expect(log.mock.calls[0]).toEqual(['flag']);
    expect(['complete', 'partial']).toContain(response.status);
    expect(response.item).toMatchObject({
      entity_id: entityId,
      entity_type: entityType,
    });
  });

  it('queries flagged content', async () => {
    // The flag of the previous snippet, once it reached the review queue.
    const flagged = await waitForReviewItem(client, entityId);

    // #region snippet docs="moderation/_default/02-quick-start/04-custom-content-moderation.md" heading="Query Flagged Content" tab="Node.js" index=1
    // COPY: entityType="entity_type"
    const response = await client.moderation.queryReviewQueue({
      filter: { entity_type: entityType },
      sort: [{ field: 'created_at', direction: -1 }],
    });
    // #endregion snippet

    // The newest item is the checked entity; the warm-up checks come after it.
    expect(response.items[0].id).toBe(flagged.id);
    for (const item of response.items) {
      expect(item.entity_type).toBe(entityType);
    }
  });
});
