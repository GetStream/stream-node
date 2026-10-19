import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { StreamClient, StreamError } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { getServerChannel } from '../../../helpers/server';

const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET as string;

describe('platform/04-using-the-api/07-api-error-codes.md', () => {
  const serverClient = getServerClient();
  const cleanup = new Cleanup(serverClient);
  const creatorId = uniqueId('creator');
  const missingChannelId = uniqueId('missing');
  const channelId = uniqueId('channel');

  beforeAll(async () => {
    cleanup.users.push(creatorId);
    // Registered in case a run creates them despite the error.
    cleanup.channels.push(
      `messaging:${missingChannelId}`,
      `messaging:${channelId}`,
    );
    await serverClient.upsertUsers([{ id: creatorId }]);
  });

  afterAll(() => cleanup.run());

  it('fails to get a channel that does not exist without created_by', async () => {
    const run = async () => {
      // #region snippet docs="platform/04-using-the-api/07-api-error-codes.md" heading="GetOrCreateChannel failed" tab="Node.js" index=1
      // COPY: apiKey="key", apiSecret="secret", missingChannelId="123"
      const client = new StreamClient(apiKey, apiSecret);
      const channel = client.chat.channel('messaging', missingChannelId);
      await channel.getOrCreate();
      // #endregion snippet
    };

    const error: unknown = await run().catch((e: unknown) => e);
    expect(error).toBeInstanceOf(StreamError);
    expect(error).toMatchObject({
      code: 4,
      metadata: { responseCode: 400 },
    });
    expect((error as StreamError).message).toMatch(
      /GetOrCreateChannel failed with error: "either data\.created_by or data\.created_by_id must be provided when using server side auth\."/,
    );

    // Nothing was created.
    const { channels } = await serverClient.chat.queryChannels({
      filter_conditions: { cid: `messaging:${missingChannelId}` },
    });
    expect(channels).toEqual([]);
  });

  it('creates the channel with created_by_id', async () => {
    // #region snippet docs="platform/04-using-the-api/07-api-error-codes.md" heading="GetOrCreateChannel failed" tab="Node.js" index=2
    // COPY: apiKey="key", apiSecret="secret", channelId="123", creatorId="4645"
    const client = new StreamClient(apiKey, apiSecret);
    // create the channel and set created_by to user id 4645
    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({
      data: { created_by_id: creatorId },
    });
    // #endregion snippet

    const created = await getServerChannel(
      serverClient,
      `messaging:${channelId}`,
    );
    expect(created.channel?.created_by?.id).toBe(creatorId);

    // Once the channel exists, the first snippet's call works without created_by.
    const response = await channel.getOrCreate();
    expect(response.channel?.cid).toBe(`messaging:${channelId}`);
  });
});
