import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { StreamError } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/04-configuration/04-filters.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' blocklist names, test-owned (blocklists are app-wide).
  const profanityCustom = uniqueId('profanity-custom');
  const blockedDomains = uniqueId('blocked-domains');
  const phoneNumbers = uniqueId('phone-numbers');
  const trustedDomains = uniqueId('trusted-domains');
  const approvedEmails = uniqueId('approved-emails');
  // The docs' "chat:messaging" policy, test-owned (a channel-level chat policy).
  const configKey = `chat:messaging:${uniqueId('filters')}`;
  const creatorId = uniqueId('creator');

  const isNotFound = (error: unknown) =>
    error instanceof StreamError && error.metadata.responseCode === 404;

  /** `getBlockList` retried until the blocklist matches `check`. */
  const waitForBlockList = (
    name: string,
    check: (words: string[]) => boolean,
  ) =>
    retry(async () => {
      const { blocklist } = await client.getBlockList({ name });
      if (!blocklist || !check(blocklist.words)) {
        throw new Error(`blocklist ${name} not updated yet`);
      }
      return blocklist;
    });

  beforeAll(async () => {
    await client.upsertUsers([{ id: creatorId }]);
    cleanup.users.push(creatorId);
    for (const name of [
      profanityCustom,
      blockedDomains,
      phoneNumbers,
      trustedDomains,
      approvedEmails,
    ]) {
      // "Delete a Blocklist" deletes `profanityCustom`; this covers a failure before that.
      cleanup.add(() =>
        client
          .deleteBlockList({ name })
          .then(() => undefined)
          .catch((error: unknown) => {
            if (!isNotFound(error)) throw error;
          }),
      );
    }
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('creates blocklists', async () => {
    // #region snippet docs="moderation/_default/04-configuration/04-filters.md" heading="Create a Blocklist" tab="Node.js" index=1
    // COPY: profanityCustom="profanity_custom", blockedDomains="blocked_domains", phoneNumbers="phone_numbers", trustedDomains="trusted_domains", approvedEmails="approved_emails"
    // Create a word blocklist
    await client.createBlockList({
      name: profanityCustom,
      words: ['badword1', 'badword2', 'offensive'],
      type: 'word',
    });

    // Create a domain blocklist
    await client.createBlockList({
      name: blockedDomains,
      words: ['spam-site.com', 'phishing.net'],
      type: 'domain',
    });

    // Create a regex filter
    await client.createBlockList({
      name: phoneNumbers,
      words: ['\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b'],
      type: 'regex',
    });

    // Create a domain allowlist (only these domains are permitted)
    await client.createBlockList({
      name: trustedDomains,
      words: ['myapp.com', 'getstream.io'],
      type: 'domain_allowlist',
    });

    // Create an email allowlist
    await client.createBlockList({
      name: approvedEmails,
      words: ['support@myapp.com', 'info@myapp.com'],
      type: 'email_allowlist',
    });
    // #endregion snippet

    const expected: Array<[string, string, string[]]> = [
      [profanityCustom, 'word', ['badword1', 'badword2', 'offensive']],
      [blockedDomains, 'domain', ['spam-site.com', 'phishing.net']],
      [phoneNumbers, 'regex', ['\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b']],
      [trustedDomains, 'domain_allowlist', ['myapp.com', 'getstream.io']],
      [
        approvedEmails,
        'email_allowlist',
        ['support@myapp.com', 'info@myapp.com'],
      ],
    ];
    for (const [name, type, words] of expected) {
      const blocklist = await waitForBlockList(name, () => true);
      expect(blocklist.type).toBe(type);
      expect([...blocklist.words].sort()).toEqual([...words].sort());
    }
  });

  it('updates a blocklist', async () => {
    // #region snippet docs="moderation/_default/04-configuration/04-filters.md" heading="Update a Blocklist" tab="Node.js" index=1
    // COPY: profanityCustom="profanity_custom"
    await client.updateBlockList({
      name: profanityCustom,
      words: ['badword1', 'badword2', 'offensive', 'newword'],
      is_leet_check_enabled: true,
      is_plural_check_enabled: true,
    });
    // #endregion snippet

    const blocklist = await waitForBlockList(profanityCustom, (words) =>
      words.includes('newword'),
    );
    expect([...blocklist.words].sort()).toEqual([
      'badword1',
      'badword2',
      'newword',
      'offensive',
    ]);
    expect(blocklist.is_leet_check_enabled).toBe(true);
    expect(blocklist.is_plural_check_enabled).toBe(true);
  });

  it('lists blocklists', async () => {
    // #region snippet docs="moderation/_default/04-configuration/04-filters.md" heading="List Blocklists" tab="Node.js" index=1
    const response = await client.listBlockLists();
    // #endregion snippet

    expect(response.blocklists.map(({ name }) => name)).toEqual(
      expect.arrayContaining([
        profanityCustom,
        blockedDomains,
        phoneNumbers,
        trustedDomains,
        approvedEmails,
      ]),
    );
  });

  it('gets a blocklist', async () => {
    // #region snippet docs="moderation/_default/04-configuration/04-filters.md" heading="Get a Blocklist" tab="Node.js" index=1
    // COPY: profanityCustom="profanity_custom"
    const response = await client.getBlockList({ name: profanityCustom });
    // #endregion snippet

    expect(response.blocklist?.name).toBe(profanityCustom);
    expect(response.blocklist?.type).toBe('word');
    expect(response.blocklist?.words).toContain('newword');
  });

  it('attaches blocklists to a policy', async () => {
    // Right after `createBlockList`, `upsertConfig` can fail with "Blocklist not found".
    const upsertConfig = client.moderation.upsertConfig.bind(client.moderation);
    vi.spyOn(client.moderation, 'upsertConfig').mockImplementation((request) =>
      retry(() => upsertConfig(request), {
        retryIf: (error) => String(error).includes('Blocklist not found'),
      }),
    );

    // #region snippet docs="moderation/_default/04-configuration/04-filters.md" heading="Attach a Blocklist to a Policy" tab="Node.js" index=1
    // COPY: configKey="chat:messaging", profanityCustom="profanity_custom", blockedDomains="blocked_domains", phoneNumbers="phone_numbers"
    await client.moderation.upsertConfig({
      key: configKey,
      block_list_config: {
        rules: [
          { name: profanityCustom, action: 'remove' },
          { name: blockedDomains, action: 'flag' },
          { name: phoneNumbers, action: 'flag' },
        ],
      },
    });
    // #endregion snippet

    const { config } = await client.moderation.getConfig({ key: configKey });
    expect(
      config?.block_list_config?.rules?.map(({ name, action }) => ({
        name,
        action,
      })),
    ).toEqual([
      { name: profanityCustom, action: 'remove' },
      { name: blockedDomains, action: 'flag' },
      { name: phoneNumbers, action: 'flag' },
    ]);

    // The policy applies: a word from the blocklist is removed, a phone number flagged.
    const check = (text: string) =>
      client.moderation.check({
        entity_type: 'stream:chat:v1:message',
        entity_id: uniqueId('message'),
        entity_creator_id: creatorId,
        config_key: configKey,
        moderation_payload: { texts: [text] },
      });
    const removed = await retry(async () => {
      const response = await check('this is badword1');
      if (response.recommended_action !== 'remove') {
        throw new Error(`not removed yet: ${response.recommended_action}`);
      }
      return response;
    });
    expect(removed.recommended_action).toBe('remove');
    expect((await check('call me at 555-123-4567')).recommended_action).toBe(
      'flag',
    );
    expect((await check('hello there')).recommended_action).toBe('keep');
  });

  it('deletes a blocklist', async () => {
    // #region snippet docs="moderation/_default/04-configuration/04-filters.md" heading="Delete a Blocklist" tab="Node.js" index=1
    // COPY: profanityCustom="profanity_custom"
    await client.deleteBlockList({ name: profanityCustom });
    // #endregion snippet

    await retry(async () => {
      const error: unknown = await client
        .getBlockList({ name: profanityCustom })
        .then(() => undefined)
        .catch((e: unknown) => e);
      if (!isNotFound(error)) throw new Error('blocklist still there');
    });
  });
});
