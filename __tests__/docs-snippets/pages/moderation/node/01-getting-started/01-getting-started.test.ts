import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { retry } from '../../../../helpers/wait';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET as string;

// #region snippet docs="moderation/node/01-getting-started/01-getting-started.md" heading="Initialize the client" tab="Node.js" index=1
// COPY: apiKey="YOUR_API_KEY", apiSecret="YOUR_API_SECRET"
import { StreamClient } from '@stream-io/node-sdk';
// or: const { StreamClient } = require("@stream-io/node-sdk");

const client = new StreamClient(apiKey, apiSecret);
// #endregion snippet

const DOCS = 'moderation/node/01-getting-started/01-getting-started.md';

describe(DOCS, () => {
  const serverClient = getServerClient();
  const cleanup = new Cleanup(serverClient);
  // The docs' "my_config" policy and "profanity_en" blocklist, both test-owned.
  const myConfig = uniqueId('my-config');
  const profanityBlocklist = uniqueId('profanity');
  const blockedWord = 'frobnicate';
  const userId = uniqueId('user');

  beforeAll(async () => {
    cleanup.users.push(userId);
    await serverClient.upsertUsers([{ id: userId }]);
    await serverClient.createBlockList({
      name: profanityBlocklist,
      words: [blockedWord],
    });
    cleanup.add(() =>
      serverClient.deleteBlockList({ name: profanityBlocklist }),
    );
    cleanup.add(() =>
      serverClient.moderation
        .deleteConfig({ key: myConfig })
        .catch((error: unknown) => {
          if (!String(error).includes('not found')) throw error;
        }),
    );
  });

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('initializes the client', async () => {
    expect(client).toBeInstanceOf(StreamClient);
    expect(client.apiKey).toBe(apiKey);
    expect(client.moderation).toBeDefined();
    const { app } = await client.getApp();
    expect(typeof app.name).toBe('string');
  });

  it('creates a moderation policy', async () => {
    // A new blocklist isn't known to the moderation API right away ("Blocklist not found").
    const upsertConfig = client.moderation.upsertConfig.bind(client.moderation);
    vi.spyOn(client.moderation, 'upsertConfig').mockImplementation((request) =>
      retry(() => upsertConfig(request), {
        retryIf: (error) => String(error).includes('Blocklist not found'),
      }),
    );

    // #region snippet docs="moderation/node/01-getting-started/01-getting-started.md" heading="Create a moderation policy" tab="Node.js" index=1
    // COPY: myConfig="my_config", profanityBlocklist="profanity_en"
    await client.moderation.upsertConfig({
      key: myConfig,
      ai_text_config: {
        rules: [
          { label: 'SPAM', action: 'flag' },
          { label: 'MORAL_HARASSMENT', action: 'remove' },
        ],
      },
      block_list_config: {
        rules: [{ name: profanityBlocklist, action: 'remove' }],
      },
    });
    // #endregion snippet

    const { config } = await serverClient.moderation.getConfig({
      key: myConfig,
    });
    expect(config?.key).toBe(myConfig);
    expect(
      config?.ai_text_config?.rules?.map(({ label, action }) => ({
        label,
        action,
      })),
    ).toEqual([
      { label: 'SPAM', action: 'flag' },
      { label: 'MORAL_HARASSMENT', action: 'remove' },
    ]);
    expect(
      config?.block_list_config?.rules?.map(({ name, action }) => ({
        name,
        action,
      })),
    ).toEqual([{ name: profanityBlocklist, action: 'remove' }]);
  });

  it('checks content', async () => {
    const messageId = uniqueId('message');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="moderation/node/01-getting-started/01-getting-started.md" heading="Check content" tab="Node.js" index=1
    // COPY: messageId="message-123", userId="user-456", myConfig="my_config"
    const response = await client.moderation.check({
      entity_type: 'stream:chat:v1:message',
      entity_id: messageId,
      entity_creator_id: userId,
      moderation_payload: {
        texts: ['Hello, this is a test message'],
      },
      config_key: myConfig,
    });

    console.log(response.recommended_action); // "keep", "flag", or "remove"
    // #endregion snippet

    expect(response.status).toBe('complete');
    expect(response.recommended_action).toBe('keep');
    expect(log.mock.calls).toEqual([['keep']]);
  });

  it('handles the response', async () => {
    // A text with a word from the policy's blocklist, so the "remove" branch runs.
    // The new blocklist and policy take a few seconds to be used by every API node.
    const response = await retry(async () => {
      const result = await client.moderation.check({
        entity_type: 'stream:chat:v1:message',
        entity_id: uniqueId('message'),
        entity_creator_id: userId,
        moderation_payload: { texts: [`you ${blockedWord}`] },
        config_key: myConfig,
      });
      if (result.recommended_action !== 'remove') {
        throw new Error(`recommended_action: ${result.recommended_action}`);
      }
      return result;
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="moderation/node/01-getting-started/01-getting-started.md" heading="Handle the response" tab="Node.js" index=1
    if (response.recommended_action === 'keep') {
      // Content is safe, no action needed
    } else if (response.recommended_action === 'flag') {
      // Content is suspicious; Stream has queued it for review
      console.log('Flagged for review:', response.item);
    } else if (response.recommended_action === 'remove') {
      // Content violates policies, remove it
      console.log('Content removed:', response.item);
    }
    // #endregion snippet

    expect(response.recommended_action).toBe('remove');
    expect(log.mock.calls).toHaveLength(1);
    expect(log.mock.calls[0][0]).toBe('Content removed:');
    expect(log.mock.calls[0][1]).toBe(response.item);
    expect(typeof response.item?.id).toBe('string');
  });
});
