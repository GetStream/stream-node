import "dotenv/config";
import { beforeAll, describe, expect, it } from "vitest";
import { v4 as uuidv4 } from "uuid";
import { CreateChannelTypeRequestAutomodEnum, StreamClient } from "../";


const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("commands CRUD API", () => {
  let client: StreamClient;
  const commandName = 'stream-node-test-command';

  beforeAll(() => {
    client = new StreamClient(apiKey, secret);
  });

  it("create", async () => {
    const response = await client.chat.createCommand({name: commandName, description: 'This is a test command', args: "[description]",
	set: "test_commands_set",});

    expect(response.command?.name).toBe(commandName);
  });

  it("read", async () => {
    const response = await client.chat.listCommands();

    expect(response.commands.find(c => c.name === commandName)).toBeDefined();
  });

  it("update", async () => {
    const response = await client.chat.updateCommand(commandName, {
        description: 'Updated descrpition'
    });

    expect(response.command?.description).toBe('Updated descrpition');
  });

  it("delete", async () => {
    const response = await client.chat.deleteCommand({name: commandName});

    expect(response.name).toBe(commandName);

    await expect(() =>
      client.chat.getCommand({name: commandName})
    ).rejects.toThrowError();
  });
});