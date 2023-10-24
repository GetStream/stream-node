import { StreamChatClient } from "./StreamChatClient";
import { StreamVideoClient } from "./StreamVideoClient";
import {
  APIError,
  BanRequest,
  CheckPushRequest,
  CreateDeviceRequest,
  CreateRoleRequest,
  DeactivateUserRequest,
  DeactivateUsersRequest,
  DeleteDeviceRequest,
  DeletePushProviderRequest,
  DeleteRoleRequest,
  DeleteUserRequest,
  DeleteUsersRequest,
  DevicesApi,
  EventsApi,
  ExportUserRequest,
  ExportUsersRequest,
  FlagRequest,
  GetPermissionRequest,
  GetTaskRequest,
  GuestRequest,
  ListDevicesRequest,
  MuteUserRequest,
  PermissionsV2Api,
  PushApi,
  PushProviderRequest,
  QueryBannedUsersRequest,
  QueryUsersRequest,
  ReactivateUserRequest,
  ReactivateUsersRequest,
  RestoreUsersRequest,
  ServerSideApi,
  SettingsApi,
  TasksApi,
  TestingApi,
  UnbanRequest,
  UnmuteUserRequest,
  UpdateAppRequest,
  UpdateUserPartialRequest,
  UpdateUsersRequest,
  UserCustomEventRequest,
  UserObject,
  UserObjectRequest,
  UserResponse,
  UsersApi,
} from "./gen/chat";
import {
  Configuration,
  HTTPQuery,
  JSONApiResponse,
  RequestContext,
  ResponseContext,
} from "./gen/video";
import { v4 as uuidv4 } from "uuid";
import { JWTServerToken, JWTUserToken } from "./utils/create-token";

export class StreamClient {
  public readonly video: StreamVideoClient;
  public readonly chat: StreamChatClient;
  private readonly usersApi: UsersApi;
  private readonly devicesApi: DevicesApi;
  private readonly pushApi: PushApi;
  private readonly serversideApi: ServerSideApi;
  private readonly testingApi: TestingApi;
  private readonly permissionsApi: PermissionsV2Api;
  private readonly settingsApi: SettingsApi;
  private readonly eventsApi: EventsApi;
  private readonly tasksApi: TasksApi;
  private token: string;

  constructor(
    private apiKey: string,
    private secret: string,
    public readonly basePath?: string
  ) {
    this.token = JWTServerToken(this.secret);
    this.video = new StreamVideoClient(this);
    this.chat = new StreamChatClient(this);

    const chatConfiguration = this.getConfiguration();
    //@ts-expect-error typing problem
    this.usersApi = new UsersApi(chatConfiguration);
    //@ts-expect-error typing problem
    this.devicesApi = new DevicesApi(chatConfiguration);
    //@ts-expect-error typing problem
    this.pushApi = new PushApi(chatConfiguration);
    //@ts-expect-error typing problem
    this.serversideApi = new ServerSideApi(chatConfiguration);
    //@ts-expect-error typing problem
    this.testingApi = new TestingApi(chatConfiguration);
    //@ts-expect-error typing problem
    this.permissionsApi = new PermissionsV2Api(chatConfiguration);
    //@ts-expect-error typing problem
    this.settingsApi = new SettingsApi(chatConfiguration);
    //@ts-expect-error typing problem
    this.eventsApi = new EventsApi(chatConfiguration);
    //@ts-expect-error typing problem
    this.tasksApi = new TasksApi(chatConfiguration);
  }

  createToken(
    userID: string,
    exp?: number,
    iat?: number,
    call_cids?: string[],
  ) {
    const extra: { exp?: number; iat?: number; call_cids?: string[] } = {};

    if (exp) {
      extra.exp = exp;
    }

    if (iat) {
      extra.iat = iat;
    }

    if (call_cids) {
      extra.call_cids = call_cids;
    }

    return JWTUserToken(this.secret, userID, extra);
  }

  createDevice = (createDeviceRequest: CreateDeviceRequest) => {
    return this.devicesApi.createDevice({ createDeviceRequest });
  };
  deleteDevice = (requestParameters: DeleteDeviceRequest) => {
    return this.devicesApi.deleteDevice(requestParameters);
  };
  listDevices = (requestParameters: ListDevicesRequest) => {
    return this.devicesApi.listDevices(requestParameters);
  };

  listPushProviders= () => {
    return this.pushApi.listPushProviders();
  }

  deletePushProvider = (request: DeletePushProviderRequest) => {
    return this.pushApi.deletePushProvider(request);
  }

  upsertPushProvider = (request: PushProviderRequest) => {
    return this.serversideApi.upsertPushProvider({upsertPushProviderRequest: {push_provider: request}});
  }

  checkPush = (checkPushRequest: CheckPushRequest) => {
    return this.testingApi.checkPush({checkPushRequest});
  }

  createGuest = async (guestRequest: GuestRequest) => {
    guestRequest.user = this.mapCustomDataBeforeSend(guestRequest.user);
    const response = await this.usersApi.createGuest({ guestRequest });
    response.user = this.mapCustomDataAfterReceive(response.user);

    return response;
  };

  banUser = (banRequest: BanRequest) => {
    banRequest.user = this.mapCustomDataBeforeSend(banRequest.user);
    banRequest.banned_by = this.mapCustomDataBeforeSend(banRequest.banned_by);
    return this.usersApi.ban({ banRequest });
  };

  deactivateUser = async (deactivateUserRequest: DeactivateUserRequest) => {
    const response = await this.usersApi.deactivateUser({
      deactivateUserRequest,
      userId: deactivateUserRequest.user_id,
    });
    response.user = this.mapCustomDataAfterReceive(response.user);

    return response;
  };

  deactivateUsers = (deactivateUsersRequest: DeactivateUsersRequest) => {
    return this.usersApi.deactivateUsers({ deactivateUsersRequest });
  };

  deleteUser = async (request: DeleteUserRequest) => {
    const response = await this.usersApi.deleteUser(request);
    response.user = this.mapCustomDataAfterReceive(response.user);

    return response;
  };

  deleteUsers = (deleteUsersRequest: DeleteUsersRequest) => {
    return this.usersApi.deleteUsers({ deleteUsersRequest });
  };

  exportUser = (request: ExportUserRequest) => {
    return this.usersApi.exportUser(request);
  };

  exportUsers = (exportUsersRequest: ExportUsersRequest) => {
    return this.usersApi.exportUsers({ exportUsersRequest });
  };

  flag = async (flagRequest: FlagRequest) => {
    flagRequest.user = this.mapCustomDataBeforeSend(flagRequest.user);
    const response = await this.usersApi.flag({ flagRequest });
    if (response.flag?.user) {
      response.flag.user = this.mapCustomDataAfterReceive(response.flag?.user);
    }

    return response;
  };

  queryBannedUsers = async (payload: QueryBannedUsersRequest) => {
    payload.user = this.mapCustomDataBeforeSend(payload.user);
    const response = await this.usersApi.queryBannedUsers({ payload });
    response.bans.forEach(b => {
      b.banned_by = this.mapCustomDataAfterReceive(b.banned_by);
      b.user = this.mapCustomDataAfterReceive(b.user);
    })

    return response;
  };

  queryUsers = async (payload: QueryUsersRequest) => {
    payload.user = this.mapCustomDataBeforeSend(payload.user);
    const response = await this.usersApi.queryUsers({ payload });
    // @ts-expect-error
    response.users = response.users.map(u => this.mapCustomDataAfterReceive(u)!);

    return response;
  };

  reactivateUser = async (reactivateUserRequest: ReactivateUserRequest) => {
    const response = await this.usersApi.reactivateUser({
      reactivateUserRequest,
      userId: reactivateUserRequest.user_id,
    });
    response.user = this.mapCustomDataAfterReceive(response.user);
  };

  reactivateUsers = (reactivateUsersRequest: ReactivateUsersRequest) => {
    return this.usersApi.reactivateUsers({ reactivateUsersRequest });
  };

  restoreUsers = (restoreUsersRequest: RestoreUsersRequest) => {
    return this.usersApi.restoreUsers({ restoreUsersRequest });
  };

  unbanUser = (request: UnbanRequest) => {
    return this.usersApi.unban(request);
  };

  unflag = async (flagRequest: FlagRequest) => {
    const response = await this.usersApi.unflag({ flagRequest });
    if (response.flag?.user) {
      response.flag.user = this.mapCustomDataAfterReceive(response.flag.user);
    }

    return response;
  };

  updateUsers = async (updateUsersRequest: UpdateUsersRequest) => {
    Object.keys(updateUsersRequest.users).forEach(key => {
      updateUsersRequest.users[key] = this.mapCustomDataBeforeSend(updateUsersRequest.users[key]);
    })
    const response = await this.usersApi.updateUsers({ updateUsersRequest });
    Object.keys(response.users).forEach(key => {
      response.users[key] = this.mapCustomDataAfterReceive(response.users[key])!;
    });

    return response;
  };

  updateUsersPartial = async (request: {users: UpdateUserPartialRequest[]}) => {
    // @ts-expect-error typing error
    const response = await this.usersApi.updateUsersPartial({ updateUserPartialRequest: request });
    Object.keys(response.users).forEach(key => {
      response.users[key] = this.mapCustomDataAfterReceive(response.users[key])!;
    });

    return response;
  };

  muteUser = async (muteUserRequest: MuteUserRequest) => {
    muteUserRequest.user = this.mapCustomDataBeforeSend(muteUserRequest.user);
    const response = await this.usersApi.muteUser({ muteUserRequest });
    if (response.mute?.user) {
      response.mute.user = this.mapCustomDataAfterReceive(response.mute?.user);
    }
    if (response.mutes) {
      response.mutes = response.mutes.map(m => {
        return {
          ...m,
          user: this.mapCustomDataAfterReceive(m.user)
        }
      });
    }

    return response;
  };

  unmuteUser = (unmuteUserRequest: UnmuteUserRequest) => {
    unmuteUserRequest.user = this.mapCustomDataBeforeSend(unmuteUserRequest.user);
    return this.usersApi.unmuteUser({ unmuteUserRequest });
  };

  sendCustomEventToUser = (userId: string, event: UserCustomEventRequest) => {
    return this.eventsApi.sendUserCustomEvent({userId, sendUserCustomEventRequest: {event}});
  }

  createRole = (createRoleRequest: CreateRoleRequest) => {
    return this.permissionsApi.createRole({createRoleRequest});
  }

  deleteRole = (request: DeleteRoleRequest) => {
    return this.permissionsApi.deleteRole(request);
  }

  getPermission = (request: GetPermissionRequest) => {
    return this.permissionsApi.getPermission(request);
  }

  listPermissions = () => {
    return this.permissionsApi.listPermissions();
  }

  listRoles = () => {
    return this.permissionsApi.listRoles();
  }

  getAppSettings = () => {
    return this.settingsApi.getApp();
  }

  updateAppSettings = (updateAppRequest: UpdateAppRequest) => {
    return this.settingsApi.updateApp({updateAppRequest});
  }

  getRateLimits = () => {
    return this.settingsApi.getRateLimits();
  }

  getTaskStatus = (request: GetTaskRequest) => {
    return this.tasksApi.getTask(request);
  }

  getConfiguration = (options?: { basePath?: string }) => {
    return new Configuration({
      apiKey: (name: string) => {
        const mapping: { [key: string]: string } = {
          "Stream-Auth-Type": "jwt",
          api_key: this.apiKey,
          Authorization: this.token,
        };

        return mapping[name];
      },
      basePath: options?.basePath || this.basePath,
      headers: {
        "X-Stream-Client": "stream-node-" + process.env.PKG_VERSION,
      },
      middleware: [
        {
          pre: (context: RequestContext) => {
            context.init.headers = {
              ...context.init.headers,
              "x-client-request-id": uuidv4(),
            };

            return Promise.resolve(context);
          },
        },
        {
          // This should be the last post middleware because that will throw an error
          // The Fetch API won't throw an error for HTTP error responses, which means the "onError" middleware won't be called so we need to throw error from "post" middleware
          post: async (context: ResponseContext) => {
            if (
              (context.response && context.response.status < 200) ||
              context.response.status >= 300
            ) {
              const response = new JSONApiResponse(context.response);
              const value = (await response.value()) as APIError;
              throw new Error(
                `Stream error code ${value.code}: ${value.message}`
              );
            }
          },
        },
      ],
      // https://github.com/OpenAPITools/openapi-generator/issues/13222
      queryParamsStringify: (params: HTTPQuery) => {
        const newParams = [];
        for (const k in params) {
          if (Array.isArray(params[k]) || typeof params[k] === "object") {
            newParams.push(
              `${k}=${encodeURIComponent(JSON.stringify(params[k]))}`
            );
          } else {
            const value = params[k];
            if (
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              newParams.push(`${k}=${encodeURIComponent(value)}`);
            }
          }
        }

        return newParams.join("&");
      },
    });
  };

  private reservedKeywords = ['ban_expires', 'banned', 'id', 'invisible', 'language', 'push_notifications', 'revoke_tokens_issued_before', 'role', 'teams', 'created_at', 'deactivated_at', 'deleted_at', 'last_active', 'online', 'updated_at', 'shadow_banned', 'name', 'image'];
  private mapCustomDataBeforeSend = (user: UserObject | UserObjectRequest | UserResponse | undefined) => {
    if (!user) {
      return undefined;
    }
    const copy = {...user};
    delete copy.custom;
    return {...copy, ...user.custom}
  }

  private mapCustomDataAfterReceive = (user: UserObject | UserResponse | undefined) => {
    if (!user) {
      return undefined;
    }
    // @ts-expect-error
    let result: UserObject | UserResponse = {};
    Object.keys(user).forEach(key => {
      if (!this.reservedKeywords.includes(key)) {
        if (!result.custom) {
          result.custom = {};
        }
        result.custom[key] = (user as any)[key];
      } else {
        result[key] = (user as any)[key];
      }
    });

    return result;
  }
}
