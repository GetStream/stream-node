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
import { sendServerMessage } from '../../../helpers/server';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/05-content-moderation/01-check.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "config_key" / "catalog-v1" policies, test-owned: a blocklist that flags
  // a word of the "API Usage" text and of the comment-context text.
  const configKey = uniqueId('check-config');
  const blocklist = uniqueId('check-words');
  const creator = uniqueId('creator');
  const driverDan = uniqueId('driver-dan');
  const listingUser = uniqueId('listing-user');
  const channelId = uniqueId('check-channel');

  beforeAll(async () => {
    cleanup.users.push(creator, driverDan, listingUser);
    await client.upsertUsers([
      { id: creator },
      { id: driverDan },
      { id: listingUser },
    ]);
    await client.createBlockList({
      name: blocklist,
      words: ['bullshit', 'cyclists'],
    });
    cleanup.add(() => client.deleteBlockList({ name: blocklist }));
    // A new blocklist isn't known to the moderation API right away ("Blocklist not found").
    await retry(
      () =>
        client.moderation.upsertConfig({
          key: configKey,
          block_list_config: {
            rules: [{ name: blocklist, action: 'flag' }],
          },
        }),
      { retryIf: (error) => String(error).includes('Blocklist not found') },
    );
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
    // A new policy can take a moment to apply.
    await retry(async () => {
      const { recommended_action } = await client.moderation.check({
        entity_type: 'stream:chat:v1:message',
        entity_id: uniqueId('warmup'),
        entity_creator_id: creator,
        config_key: configKey,
        moderation_payload: { texts: ['bullshit'] },
      });
      if (recommended_action !== 'flag') {
        throw new Error(`recommended_action: ${recommended_action}`);
      }
    });

    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({ data: { created_by_id: creator } });
    cleanup.channels.push(`messaging:${channelId}`);
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('checks an entity', async () => {
    const entityId = uniqueId('entity');

    // #region snippet docs="moderation/_default/05-content-moderation/01-check.md" heading="API Usage" tab="Node.js" index=1
    // COPY: entityId="entity_id", creator="entity_creator_id", configKey="config_key"
    const response = await client.moderation.check({
      entity_type: 'entity_type',
      entity_id: entityId,
      entity_creator_id: creator,
      moderation_payload: {
        texts: ['this is bullshit', 'f*ck you as***le'],
        images: ['example.com/test.jpg'],
      },
      config_key: configKey,
      options: { force_sync: true },
    });
    // #endregion snippet

    expect(response.recommended_action).toBe('flag');
    expect(['complete', 'partial']).toContain(response.status);
    expect(response.item).toMatchObject({
      entity_id: entityId,
      entity_type: 'entity_type',
    });
  });

  it('sends comment context for the review queue', async () => {
    const commentId = uniqueId('a-r7');
    const check = vi.spyOn(client.moderation, 'check');

    // #region snippet docs="moderation/_default/05-content-moderation/01-check.md" heading="Comment context in the review queue" tab="Node.js" index=1
    // COPY: commentId="a_r7", driverDan="driver_dan", configKey="config_key"
    await client.moderation.check({
      entity_type: 'comment',
      entity_id: commentId,
      entity_creator_id: driverDan,
      moderation_payload: {
        texts: ['Cyclists can all go back where they came from'],
        custom: {
          schemaVersion: 1,
          depth: 1,
          content: {
            id: 'news-48213',
            type: 'article',
            title: 'City council approves new bike lanes downtown',
            subtitle: 'Local news',
            tags: [
              { key: 'section', label: 'Section', values: ['Transport'] },
              {
                key: 'topics',
                label: 'Topics',
                values: ['City council', 'Cycling'],
              },
            ],
            description:
              'The plan adds 12 km of protected lanes over two years...',
            url: 'https://example.com/news/bike-lanes',
            imageUrl: 'https://example.com/news/bike-lanes.jpg',
          },
          thread: {
            topLevel: {
              id: 'a_top',
              user: { id: 'cyclist_jen', name: 'Jen' },
              text: 'Finally. I have been waiting for this for years.',
              createdAt: '2026-10-06T08:12:00Z',
            },
            earlierReplyCount: 7,
            earlierReplies: [
              {
                id: 'a_r6',
                user: { id: driverDan, name: 'Dan' },
                text: 'Good luck finding parking now.',
                createdAt: '2026-10-06T08:40:00Z',
              },
            ],
          },
        },
      },
      config_key: configKey,
    });
    // #endregion snippet

    const response = await (check.mock.results[0].value as ReturnType<
      typeof client.moderation.check
    >);
    expect(response.recommended_action).toBe('flag');

    // The review queue item keeps the context in moderation_payload.custom.
    const item = await retry(async () => {
      const { items } = await client.moderation.queryReviewQueue({
        filter: { entity_id: commentId },
      });
      if (items.length !== 1) throw new Error(`items: ${items.length}`);
      return items[0];
    });
    expect(item.entity_type).toBe('comment');
    expect(item.entity_creator_id).toBe(driverDan);
    expect(item.moderation_payload?.custom).toMatchObject({
      schemaVersion: 1,
      depth: 1,
      content: { id: 'news-48213', type: 'article' },
      thread: {
        topLevel: { id: 'a_top' },
        earlierReplyCount: 7,
        earlierReplies: [{ id: 'a_r6', user: { id: driverDan } }],
      },
    });
  });

  // The generated analyze() sends JSON, but the API only accepts multipart/form-data with
  // a JSON `payload` part (a raw multipart request with the same fields returns 201 and
  // `texts.caption: { id: 'cap_42', action: 'keep' }`).
  it.skip('BLOCKED: SDK issue: V2Analyze failed with error: "Content-Type must be multipart/form-data, got "application/json""', async () => {
    const listingId = uniqueId('listing');
    const catalogConfig = configKey;

    // #region snippet docs="moderation/_default/05-content-moderation/01-check.md" heading="Calling Analyze" tab="Node.js" index=1
    // COPY: listingId="listing_42", listingUser="user_42", catalogConfig="catalog-v1"
    const response = await client.moderation.analyze({
      entity_type: 'listing',
      entity_id: listingId,
      entity_creator_id: listingUser,
      config_key: catalogConfig,
      content_ids: { caption: 'cap_42' },
      texts: { caption: 'Vintage watch, mint condition' },
    });
    // #endregion snippet

    expect(response.status).toBe('complete');
    expect(response.texts?.caption).toMatchObject({
      id: 'cap_42',
      action: 'keep',
    });
  });

  it('adds custom flags to a chat message', async () => {
    const message = await sendServerMessage(client, `messaging:${channelId}`, {
      text: 'A message with an image',
      user_id: creator,
    });
    const messageId = message.id;
    const customCheck = vi.spyOn(client.moderation, 'customCheck');

    // #region snippet docs="moderation/_default/05-content-moderation/01-check.md" heading="Add Custom Flags to a Chat Message" tab="Node.js" index=1
    // COPY: creator="user_id"
    await client.moderation.customCheck({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId,
      entity_creator_id: creator,
      flags: [
        {
          type: 'custom_check_image',
          reason: 'Image was NSFW',
          labels: ['NSFW'],
        },
        {
          type: 'custom_check_text',
          reason: 'Text was harmful',
          labels: ['harmful'],
        },
        {
          type: 'custom_check_video',
          reason: 'Video contains copyright material',
          labels: ['copyright-violation'],
        },
      ],
    });
    // #endregion snippet

    const response = await (customCheck.mock.results[0].value as ReturnType<
      typeof client.moderation.customCheck
    >);
    expect(typeof response.id).toBe('string');
    expect(response.item?.entity_id).toBe(messageId);
    // The response item has no flags yet: they reach the review queue item a moment later.
    const item = await retry(async () => {
      const { items } = await client.moderation.queryReviewQueue({
        filter: { entity_id: messageId },
      });
      if (items.length !== 1 || items[0].flags.length !== 3) {
        throw new Error(`items: ${items.length}`);
      }
      return items[0];
    });
    expect(item.entity_type).toBe('stream:chat:v1:message');
    expect(
      item.flags.map(({ type, reason, labels }) => ({ type, reason, labels })),
    ).toEqual(
      expect.arrayContaining([
        {
          type: 'custom_check_image',
          reason: 'Image was NSFW',
          labels: ['NSFW'],
        },
        {
          type: 'custom_check_text',
          reason: 'Text was harmful',
          labels: ['harmful'],
        },
        {
          type: 'custom_check_video',
          reason: 'Video contains copyright material',
          labels: ['copyright-violation'],
        },
      ]),
    );
  });

  it('adds custom flags to custom content', async () => {
    const entityId = uniqueId('custom-entity');
    const customCheck = vi.spyOn(client.moderation, 'customCheck');

    // #region snippet docs="moderation/_default/05-content-moderation/01-check.md" heading="Add Custom Check Flags to the Custom Content" tab="Node.js" index=1
    // COPY: entityId="entity_id", creator="entity_creator_id"
    await client.moderation.customCheck({
      entity_type: 'entity_type',
      entity_id: entityId,
      entity_creator_id: creator,
      moderation_payload: {
        texts: ['offensive'],
      },
      flags: [
        {
          type: 'custom_check_text',
          reason: 'Text was offensive',
          custom: {
            explaination:
              'custom is a nullable field allowing you to attach a custom object to the flag for your specific use cases or requirements',
          },
        },
      ],
    });
    // #endregion snippet

    const response = await (customCheck.mock.results[0].value as ReturnType<
      typeof client.moderation.customCheck
    >);
    expect(response.item).toMatchObject({
      entity_id: entityId,
      entity_type: 'entity_type',
      entity_creator_id: creator,
    });
    const item = await retry(async () => {
      const { items } = await client.moderation.queryReviewQueue({
        filter: { entity_id: entityId },
      });
      if (items.length !== 1) throw new Error(`items: ${items.length}`);
      return items[0];
    });
    expect(item.flags[0]).toMatchObject({
      type: 'custom_check_text',
      reason: 'Text was offensive',
    });
  });
});
