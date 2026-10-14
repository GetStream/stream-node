import jwt from 'jsonwebtoken';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { getServerMember, getServerUser } from '../../../../helpers/server';

// Values the module-level region below uses (it must come after them: TDZ).
const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET as string;
const johnId = uniqueId('john');

// #region snippet docs="chat/node/01-quick_start/01-backend_quickstart.md" heading="Generating user tokens" tab="Node.js" index=1
// COPY: apiKey="{{ api_key }}", apiSecret="{{ api_secret }}", johnId="john"
// npm install @stream-io/node-sdk
import { StreamClient } from '@stream-io/node-sdk';
// or: const { StreamClient } = require("@stream-io/node-sdk");

// instantiate your stream client using the API key and secret
// the secret is only used server side and gives you full access to the API
const client = new StreamClient(apiKey, apiSecret);

// generate a token for the user with id 'john'
const token = client.generateUserToken({ user_id: johnId });
// next, hand this token to the client in your login or registration response
// #endregion snippet

describe('chat/node/01-quick_start/01-backend_quickstart.md', () => {
  const serverClient = getServerClient();
  const cleanup = new Cleanup(serverClient);
  const creatorId = uniqueId('creator');
  const thierryId = uniqueId('thierry');
  const joshId = uniqueId('josh');
  const tommasoId = uniqueId('tommaso');
  const channelId = uniqueId('kung-fu');
  const cid = `messaging:${channelId}`;

  beforeAll(async () => {
    cleanup.users.push(johnId, creatorId, thierryId, joshId, tommasoId);
    cleanup.channels.push(cid);
    await serverClient.upsertUsers(
      [johnId, creatorId, thierryId, joshId, tommasoId].map((id) => ({ id })),
    );
  });

  afterAll(() => cleanup.run());

  /** The page's channel (whether or not "Syncing channels" ran first), with `memberIds` added. */
  const getChannel = async (memberIds: string[]) => {
    const channel = client.chat.channel('messaging', channelId);
    await channel.getOrCreate({ data: { created_by_id: creatorId } });
    // `getOrCreate` only applies `members` when it creates the channel.
    await channel.update({
      add_members: memberIds.map((user_id) => ({ user_id })),
    });
    return channel;
  };

  it('generates a user token', () => {
    expect(client).toBeInstanceOf(StreamClient);
    const payload = jwt.verify(token, apiSecret) as jwt.JwtPayload;
    expect(payload.user_id).toBe(johnId);
  });

  it('syncs users', async () => {
    const userID = uniqueId('user');
    cleanup.users.push(userID);

    // #region snippet docs="chat/node/01-quick_start/01-backend_quickstart.md" heading="Syncing users" tab="Node.js" index=1
    const response = await client.upsertUsers([
      {
        id: userID,
        role: 'admin',
        custom: { mycustomfield: '123' },
      },
    ]);
    // #endregion snippet

    expect(response.users[userID]?.role).toBe('admin');
    const user = await getServerUser(serverClient, userID);
    expect(user.role).toBe('admin');
    expect(user.custom.mycustomfield).toBe('123');
  });

  it('syncs channels', async () => {
    // #region snippet docs="chat/node/01-quick_start/01-backend_quickstart.md" heading="Syncing channels" tab="Node.js" index=1
    // COPY: channelId="kung-fu", creatorId="4645"
    const channel = client.chat.channel('messaging', channelId);

    // create the channel and set created_by to user id 4645
    await channel.getOrCreate({ data: { created_by_id: creatorId } });

    const update = await channel.update({
      data: {
        custom: {
          name: 'myspecialchannel',
          image: 'imageurl',
          mycustomfield: '123',
        },
      },
    });
    // #endregion snippet

    expect(update.channel?.created_by?.id).toBe(creatorId);
    expect(update.channel?.custom).toMatchObject({
      name: 'myspecialchannel',
      image: 'imageurl',
      mycustomfield: '123',
    });
  });

  it('adds members and moderators', async () => {
    const channel = await getChannel([tommasoId]);
    await getServerMember(serverClient, cid, tommasoId);

    // #region snippet docs="chat/node/01-quick_start/01-backend_quickstart.md" heading="Adding members or moderators" tab="Node.js" index=1
    // COPY: thierryId="thierry", joshId="josh", tommasoId="tommaso"
    await channel.update({
      add_members: [{ user_id: thierryId }, { user_id: joshId }],
    });
    await channel.update({ remove_members: [tommasoId] });

    await channel.update({ add_moderators: [thierryId] });
    await channel.update({ demote_moderators: [thierryId] });
    // #endregion snippet

    const { members } = await channel.queryMembers({ payload: {} });
    const memberIds = members.map((member) => member.user_id);
    expect(memberIds).toEqual(expect.arrayContaining([thierryId, joshId]));
    expect(memberIds).not.toContain(tommasoId);
    // Promoted and then demoted again.
    const thierry = await getServerMember(serverClient, cid, thierryId);
    expect(thierry.channel_role).toBe('channel_member');
  });

  it('sends a message', async () => {
    const channel = await getChannel([johnId, joshId]);

    // #region snippet docs="chat/node/01-quick_start/01-backend_quickstart.md" heading="Sending messages" tab="Node.js" index=1
    // COPY: johnId="john", joshId="josh"
    const { message } = await channel.sendMessage({
      message: {
        text: '@Josh I told them I was pesca-pescatarian. Which is one who eats solely fish who eat other fish.',
        user_id: johnId,
        mentioned_users: [joshId],
        attachments: [
          {
            type: 'image',
            asset_url: 'https://bit.ly/2K74TaG',
            thumb_url: 'https://bit.ly/2Uumxti',
            custom: { myCustomField: 123 },
          },
        ],
        custom: { anotherCustomField: 234 },
      },
    });
    // #endregion snippet

    expect(message.user?.id).toBe(johnId);
    expect(message.mentioned_users.map((user) => user.id)).toEqual([joshId]);
    expect(message.attachments[0]).toMatchObject({
      type: 'image',
      asset_url: 'https://bit.ly/2K74TaG',
    });
    expect(message.attachments[0].custom.myCustomField).toBe(123);
    expect(message.custom.anotherCustomField).toBe(234);
  });
});
