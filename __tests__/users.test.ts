import "dotenv/config";
import { beforeAll, describe, expect, it } from "vitest";
import { StreamClient, UserObjectRequest } from "../";
import { v4 as uuidv4 } from "uuid";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("user API", () => {
  let client: StreamClient;
  const newUser: UserObjectRequest = {
    id: uuidv4(),
    role: "user",
  };
  const user = {
    id: "stream-node-test-user",
    role: "admin",
  };

  beforeAll(async () => {
    client = new StreamClient(apiKey, secret);
    await client.updateUsers({
      users: {
        [user.id]: { ...user },
      },
    });
  });

  it("query users", async () => {
    let response = await client.queryUsers({
      sort: [{ field: "name", direction: 1 }],
      filter_conditions: {},
    });

    expect(response.users).toBeDefined();

    response = await client.queryUsers({
      sort: [{ field: "name", direction: 1 }],
      filter_conditions: {
        id: { $eq: "zitaszuperagetstreamio" },
      },
    });

    expect(response.users.length).toBe(1);
  });

  it("create", async () => {
    const response = await client.updateUsers({
      users: {
        [newUser.id]: {
          ...newUser,
        },
      },
    });

    const createdUser = response.users[newUser.id];

    expect(createdUser.id).toBe(newUser.id);
    expect(createdUser.role).toBe(newUser.role);

    const queryResponse = await client.queryUsers({
      sort: [],
      filter_conditions: {
        id: { $eq: newUser.id },
      },
    });

    expect(queryResponse.users.length).toBe(1);
  });

  it("create guest", async () => {
    const guest: UserObjectRequest = {
      id: uuidv4(),
    };

    const response = await client.createGuest({ user: guest });

    expect(response.user?.role).toBe("guest");
  });

  it("ban and unban", async () => {
    await client.banUser({
      target_user_id: newUser.id,
      user_id: user.id,
    });

    let queryResponse = await client.queryBannedUsers({
      filter_conditions: {},
    });

    expect(
      queryResponse.bans.find((b) => b.user?.id === newUser.id)
    ).toBeDefined();

    await client.unbanUser({
      targetUserId: newUser.id,
      id: user.id,
    });

    queryResponse = await client.queryBannedUsers({
      filter_conditions: {},
    });

    expect(
      queryResponse.bans.find((b) => b.user?.id === newUser.id)
    ).toBeUndefined();
  });

  it("mute and unmute", async () => {
    const muteResponse = await client.muteUser({
      target_ids: [newUser.id],
      user_id: user.id,
    });

    expect(muteResponse.mute?.target?.id).toBe(newUser.id);

    const unmuteResponse = await client.unmuteUser({
      target_id: newUser.id,
      target_ids: [],
      user_id: user.id,
    });

    expect(unmuteResponse).toBeDefined();
  });

  // TODO: open API spec seems to be faulty here
  //   it("update", async () => {
  //     const response = client.updateUserPartial({
  //       id: newUser.id,
  //       set: {
  //         role: "admin",
  //         name: "Test User" + newUser.id,
  //       },
  //       unset: [],
  //     });

  //     console.log(response);
  //   });

  it("deactivate and reactivate", async () => {
    const deactivateResponse = await client.deactivateUser({
      user_id: newUser.id,
    });

    expect(deactivateResponse.user?.id).toBe(newUser.id);

    const reactivateResponse = await client.reactivateUsers({
      user_ids: [newUser.id],
    });

    expect(reactivateResponse.task_id).toBeDefined();
  });

  it("restore", async () => {
    await expect(() =>
      client.restoreUsers({ user_ids: [newUser.id] })
    ).rejects.toThrowError(
      `Stream error code 4: RestoreUsers failed with error: "user "${newUser.id}" is not deleted, it can't be restored"`
    );
  });

  it("delete", async () => {
    const response = await client.deleteUser({ userId: newUser.id });

    expect(response.user?.id).toBe(newUser.id);
  });
});
