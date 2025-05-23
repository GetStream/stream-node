require("dotenv/config");
const { StreamClient } = require("./dist/index.cjs.js");

const apiKey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_SECRET;

const createTestClient = () => {
  return new StreamClient(apiKey, secret, { timeout: 10000 });
};

const client = createTestClient();

const cleanupBlockLists = async () => {
  const blockLists = (await client.listBlockLists()).blocklists;
  const customBlockLists = blockLists.filter((b) =>
    b.name.startsWith("streamnodetest-F1"),
  );

  await Promise.all(
    customBlockLists.map((b) => client.deleteBlockList({ name: b.name })),
  );
};

const cleanupCalls = async () => {
  const calls = (await client.video.queryCalls()).calls;
  const testCalls = Object.keys(calls).filter((t) =>
    t.startsWith("callnodetest"),
  );

  await Promise.all(
    testCalls.map((t) =>
      client.video.call(t.call.type, t.call.id).delete({ hard: true }),
    ),
  );
};

const cleanupCallTypes = async () => {
  const callTypes = (await client.video.listCallTypes()).call_types;
  const customCallTypes = Object.keys(callTypes).filter(
    (t) =>
      t.startsWith("streamnodetest") ||
      t.startsWith("calltype") ||
      t.startsWith("long_inactivity_timeout") ||
      t.startsWith("frame_recording"),
  );

  await Promise.all(
    customCallTypes.map((t) => client.video.deleteCallType({ name: t })),
  );
};

const cleanupExternalStorage = async () => {
  const storage = (await client.listExternalStorage()).external_storages;
  const customStorage = Object.keys(storage).filter((k) =>
    k.startsWith("streamnodetest"),
  );

  await Promise.all(
    customStorage.map((s) => client.deleteExternalStorage({ name: s })),
  );
};

const cleanUpChannelTypes = async () => {
  const channelTypes = (await client.chat.listChannelTypes()).channel_types;
  const customChannelTypes = Object.keys(channelTypes).filter((type) =>
    type.startsWith("streamnodetest"),
  );

  await Promise.all(
    customChannelTypes.map((channelType) =>
      client.chat.deleteChannelType({ name: channelType }),
    ),
  );
};

const cleanUpChannels = async () => {
  const channels = (
    await client.chat.queryChannels({
      payload: {
        filter_conditions: { name: { $autocomplete: "streamnodetest" } },
      },
    })
  ).channels;

  await Promise.all(
    channels.map((c) =>
      client.chat
        .channel(c.channel.type, c.channel.id)
        .delete({ hardDelete: true }),
    ),
  );
};

const cleanUpCommands = async () => {
  const commands = (await client.chat.listCommands()).commands;
  const customCommands = commands.filter((c) =>
    c.name.startsWith("stream-node-test-command"),
  );

  await Promise.all(
    customCommands.map((c) => client.chat.deleteCommand({ name: c.name })),
  );
};

const cleanUpRoles = async () => {
  const roles = (await client.listRoles()).roles;
  const customRoles = roles.filter((r) => r.name.startsWith("streamnodetest"));

  let grants = {};
  customRoles.forEach((r) => {
    grants[r.name] = [];
  });
  await client.updateApp({
    grants,
  });

  await Promise.all(
    customRoles.map((r) => client.deleteRole({ name: r.name })),
  );
};

const cleanUpUsers = async () => {
  const users = (
    await client.queryUsers({
      payload: {
        filter_conditions: { name: { $autocomplete: "streamnodetest" } },
      },
    })
  ).users;

  if (users.length > 0) {
    await client.deleteUsers({
      user_ids: users.map((u) => u.id),
      user: "hard",
    });
  }
};

const cleanup = async () => {
  await cleanupBlockLists();
  await cleanupCallTypes();
  await cleanUpChannelTypes();
  await cleanUpChannels();
  await cleanUpCommands();
  await cleanUpRoles();
  await cleanUpUsers();
  await cleanupExternalStorage();
  await cleanupCalls();
};

cleanup().then(() => {
  console.log("cleanup done");
  process.exit();
});
