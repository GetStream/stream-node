import "dotenv/config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { BlockList, StreamClient } from "../";
import { v4 as uuidv4 } from "uuid";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("block lists CRUD API", () => {
  let client: StreamClient;
  let blockList: BlockList;

  beforeAll(() => {
    client = new StreamClient(apiKey, secret);
    blockList = {
      name: "streamnodetest-F1" + uuidv4(),
      words: ["Ricciardo should retire"],
    };
  });

  it("create", async () => {
    const response = await client.chat.createBlockList(blockList);

    expect(response).toBeDefined();
  });

  it("list", async () => {
    const listResponse = await client.chat.listBlockLists();

    expect(
      listResponse.blocklists.find((b) => b.name === blockList.name)
    ).toBeDefined();

    const getResponse = await client.chat.getBlockList({
      name: blockList.name,
    });

    expect(getResponse.blocklist?.name).toBe(blockList.name);
  });

  it("update", async () => {
    const response = await client.chat.updateBlockList(blockList.name, {
      words: [...blockList.words, "R1cciardo should retire"],
    });

    expect(response).toBeDefined();

    const updatedBlockList = await client.chat.getBlockList({
      name: blockList.name,
    });

    expect(updatedBlockList.blocklist?.words.length).toBe(2);
  });

  it("delete", async () => {
    const response = await client.chat.deleteBlockList({
      name: blockList.name,
    });
    expect(response).toBeDefined();
  });

  afterAll(async () => {
    const blockLists = (await client.chat.listBlockLists()).blocklists;
    const customBlockLists = blockLists.filter((b) =>
      b.name.startsWith("streamnodetest-F1")
    );

    await Promise.all(
      customBlockLists.map((b) => client.chat.deleteBlockList({ name: b.name }))
    );
  });
});
