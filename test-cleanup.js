require("dotenv/config");
const {
  StreamClient,
  DeleteUsersRequestUserEnum,
} = require("./dist/index.cjs.js");

const apiKey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_SECRET;

const createTestClient = () => {
  return new StreamClient(apiKey, secret, { timeout: 10000 });
};

const client = createTestClient();

const cleanupBlockLists = async () => {
  const blockLists = (await client.chat.listBlockLists()).blocklists;
  const customBlockLists = blockLists.filter((b) =>
    b.name.startsWith("streamnodetest-F1"),
  );

  await Promise.all(
    customBlockLists.map((b) => client.chat.deleteBlockList({ name: b.name })),
  );
};

const cleanupCallTypes = async () => {
  const callTypes = (await client.video.listCallTypes()).call_types;
  const customCallTypes = Object.keys(callTypes).filter(
    (t) => t.startsWith("streamnodetest") || t.startsWith("calltype"),
  );

  await Promise.all(
    customCallTypes.map((t) => client.video.deleteCallType({ name: t })),
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
      filter_conditions: { name: { $autocomplete: "streamnodetest" } },
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
  await client.updateAppSettings({
    grants,
  });

  await Promise.all(
    customRoles.map((r) => client.deleteRole({ name: r.name })),
  );
};

const cleanUpUsers = async () => {
  const users = (
    await client.queryUsers({
      filter_conditions: { name: { $autocomplete: "streamnodetest" } },
    })
  ).users;

  if (users.length > 0) {
    await client.deleteUsers({
      user_ids: users.map((u) => u.id),
      user: DeleteUsersRequestUserEnum.HARD,
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
};

cleanup().then(() => {
  console.log("cleanup done");
  process.exit();
});
