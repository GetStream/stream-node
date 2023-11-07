import "dotenv/config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { v4 as uuidv4 } from "uuid";
import { CreateChannelTypeRequestAutomodEnum, StreamClient } from "../";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("channel types CRUD API", () => {
  let client: StreamClient;
  const channelType = "streamnodetest" + uuidv4();

  beforeAll(() => {
    client = new StreamClient(apiKey, secret);
  });

  it("create", async () => {
    const response = await client.chat.createChannelType({
      name: channelType,
      automod: CreateChannelTypeRequestAutomodEnum.DISABLED,
    });

    expect(response.name).toBe(channelType);
  });

  it("read", async () => {
    const response = await client.chat.listChannelTypes();

    expect(response.channel_types[channelType]).toBeDefined();
  });

  it("update", async () => {
    const response = await client.chat.updateChannelType(channelType, {
      automod: CreateChannelTypeRequestAutomodEnum.SIMPLE,
    });

    expect(response.automod).toBe(CreateChannelTypeRequestAutomodEnum.SIMPLE);

    const getResponse = await client.chat.getChannelType({ name: channelType });

    //@ts-expect-error typing problem
    expect(getResponse.automod).toBe(
      CreateChannelTypeRequestAutomodEnum.SIMPLE
    );
  });

  it("delete", async () => {
    const response = await client.chat.deleteChannelType({ name: channelType });
    expect(response).toBeDefined();
  });

  afterAll(async () => {
    const channelTypes = (await client.chat.listChannelTypes()).channel_types;
    const customChannelTypes = Object.keys(channelTypes).filter((type) =>
      type.startsWith("streamnodetest")
    );

    await Promise.all(
      customChannelTypes.map((t) =>
        client.chat.deleteChannelType({ name: channelType })
      )
    );
  });
});
