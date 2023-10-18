import "dotenv/config";
import { beforeAll, describe, expect, it } from "vitest";
import { v4 as uuidv4 } from "uuid";
import { StreamChannel, StreamClient } from "..";
import fs from 'fs';

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("file and image uploads", () => {
  let client: StreamClient;
  let channel: StreamChannel;
  const user = {
    id: "stream-node-test-user",
    name: "Stream Node Test User",
    role: "admin",
  };

  beforeAll(async () => {
    client = new StreamClient(apiKey, secret);
    await client.updateUsers({
      users: {
        [user.id]: { ...user },
      }});
    channel = client.chat.channel('messaging', 'stream-node-test-channel');
    await channel.getOrCreate({data: {created_by_id: user.id}});
  });

  it('upload file', async () => {
    const file = fs.readFileSync('__tests__/assets/test-file.pdf');
    const response = await channel.uploadFile({user: user.id}, file);

    console.log(response);
  });
});
