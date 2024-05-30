import { StreamChatClient } from './StreamChatClient';
import { StreamVideoClient } from './StreamVideoClient';
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
} from './gen/chat';
import {
  Configuration,
  ErrorContext,
  FetchError,
  HTTPQuery,
  JSONApiResponse,
  RequestContext,
  ResponseContext,
} from './gen/video';
import { v4 as uuidv4 } from 'uuid';
import { JWTServerToken, JWTUserToken } from './utils/create-token';
import crypto from 'crypto';
import { CallTokenPayload, UserTokenPayload } from './types';

export interface StreamClientOptions {
  timeout?: number;
  basePath?: string;
}

export class StreamClient {
  public readonly video: StreamVideoClient;
  public readonly chat: StreamChatClient;
  public readonly options: StreamClientOptions = {};
  private readonly usersApi: UsersApi;
  private readonly devicesApi: DevicesApi;
  private readonly pushApi: PushApi;
  private readonly serversideApi: ServerSideApi;
  private readonly testingApi: TestingApi;
  private readonly permissionsApi: PermissionsV2Api;
  private readonly settingsApi: SettingsApi;
  private readonly eventsApi: EventsApi;
  private readonly tasksApi: TasksApi;
  private readonly token: string;
  private static readonly DEFAULT_TIMEOUT = 3000;

  /**
   *
   * @param apiKey
   * @param secret
   * @param config can be a string, which will be interpreted as base path (deprecated), or a config object
   */
  constructor(
    private readonly apiKey: string,
    private readonly secret: string,
    readonly config?: string | StreamClientOptions,
  ) {
    this.token = JWTServerToken(this.secret);

    if (typeof config === 'string') {
      this.options.basePath = config;
      this.options.timeout = StreamClient.DEFAULT_TIMEOUT;
    } else {
      if (config) {
        this.options = config;
      }
      this.options.timeout = config?.timeout ?? StreamClient.DEFAULT_TIMEOUT;
    }

    this.video = new StreamVideoClient(this);
    this.chat = new StreamChatClient(this);

    const chatConfiguration = this.getConfiguration();
    /** @ts-expect-error */
    this.usersApi = new UsersApi(chatConfiguration);
    /** @ts-expect-error */
    this.devicesApi = new DevicesApi(chatConfiguration);
    /** @ts-expect-error */
    this.pushApi = new PushApi(chatConfiguration);
    /** @ts-expect-error */
    this.serversideApi = new ServerSideApi(chatConfiguration);
    /** @ts-expect-error */
    this.testingApi = new TestingApi(chatConfiguration);
    /** @ts-expect-error */
    this.permissionsApi = new PermissionsV2Api(chatConfiguration);
    /** @ts-expect-error */
    this.settingsApi = new SettingsApi(chatConfiguration);
    /** @ts-expect-error */
    this.eventsApi = new EventsApi(chatConfiguration);
    /** @ts-expect-error */
    this.tasksApi = new TasksApi(chatConfiguration);
  }

  /**
   *
   * @param userID
   * @param exp
   * @param iat deprecated, the default date will be set internally
   * @param call_cids this parameter is deprecated use `createCallToken` for call tokens
   * @returns
   */
  createToken(
    userID: string,
    exp = Math.round(Date.now() / 1000) + 60 * 60,
    iat = Math.floor((Date.now() - 1000) / 1000),
    call_cids?: string[],
  ) {
    const payload: UserTokenPayload = {
      user_id: userID,
      exp,
      iat,
    };

    if (call_cids) {
      console.warn(
        `Use createCallToken method for creating call tokens, the "call_cids" param will be removed from the createToken method with version 0.2.0`,
      );
      payload.call_cids = call_cids;
    }

    return JWTUserToken(this.secret, payload);
  }

  /**
   *
   * @param userID
   * @param call_cids
   * @param exp
   * @param iat this is deprecated, the current date will be set internally
   * @returns
   */
  createCallToken(
    userIdOrObject: string | { user_id: string; role?: string },
    call_cids: string[],
    exp = Math.round(Date.now() / 1000) + 60 * 60,
    iat = Math.floor((Date.now() - 1000) / 1000),
  ) {
    const payload: CallTokenPayload = {
      exp,
      iat,
      call_cids,
      user_id:
        typeof userIdOrObject === 'string'
          ? userIdOrObject
          : userIdOrObject.user_id,
    };

    if (typeof userIdOrObject === 'object' && userIdOrObject.role) {
      payload.role = userIdOrObject.role;
    }

    return JWTUserToken(this.secret, payload);
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

  listPushProviders = () => {
    return this.pushApi.listPushProviders();
  };

  deletePushProvider = (request: DeletePushProviderRequest) => {
    return this.pushApi.deletePushProvider(request);
  };

  upsertPushProvider = (request: PushProviderRequest) => {
    return this.serversideApi.upsertPushProvider({
      upsertPushProviderRequest: { push_provider: request },
    });
  };

  checkPush = (checkPushRequest: CheckPushRequest) => {
    return this.testingApi.checkPush({ checkPushRequest });
  };

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

  /**
   * @deprecated use `deleteUsers` instead
   * @param deleteUsersRequest
   * @returns
   */
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
    response.bans.forEach((b) => {
      b.banned_by = this.mapCustomDataAfterReceive(b.banned_by);
      b.user = this.mapCustomDataAfterReceive(b.user);
    });

    return response;
  };

  queryUsers = async (payload: QueryUsersRequest) => {
    payload.user = this.mapCustomDataBeforeSend(payload.user);
    const response = await this.usersApi.queryUsers({ payload });
    /** @ts-expect-error */
    response.users = response.users.map((u) =>
      this.mapCustomDataAfterReceive(u),
    );

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

  upsertUsers = async (updateUsersRequest: UpdateUsersRequest) => {
    Object.keys(updateUsersRequest.users).forEach((key) => {
      updateUsersRequest.users[key] = this.mapCustomDataBeforeSend(
        updateUsersRequest.users[key],
      );
    });
    const response = await this.usersApi.updateUsers({ updateUsersRequest });
    Object.keys(response.users).forEach((key) => {
      response.users[key] = this.mapCustomDataAfterReceive(
        response.users[key],
      )!;
    });

    return response;
  };

  updateUsersPartial = async (request: {
    users: UpdateUserPartialRequest[];
  }) => {
    const response = await this.usersApi.updateUsersPartial({
      /** @ts-expect-error */
      updateUserPartialRequest: request,
    });
    Object.keys(response.users).forEach((key) => {
      response.users[key] = this.mapCustomDataAfterReceive(
        response.users[key],
      )!;
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
      response.mutes = response.mutes.map((m) => {
        return {
          ...m,
          user: this.mapCustomDataAfterReceive(m.user),
        };
      });
    }

    return response;
  };

  unmuteUser = (unmuteUserRequest: UnmuteUserRequest) => {
    unmuteUserRequest.user = this.mapCustomDataBeforeSend(
      unmuteUserRequest.user,
    );
    return this.usersApi.unmuteUser({ unmuteUserRequest });
  };

  sendCustomEventToUser = (userId: string, event: UserCustomEventRequest) => {
    return this.eventsApi.sendUserCustomEvent({
      userId,
      sendUserCustomEventRequest: { event },
    });
  };

  createRole = (createRoleRequest: CreateRoleRequest) => {
    return this.permissionsApi.createRole({ createRoleRequest });
  };

  deleteRole = (request: DeleteRoleRequest) => {
    return this.permissionsApi.deleteRole(request);
  };

  getPermission = (request: GetPermissionRequest) => {
    return this.permissionsApi.getPermission(request);
  };

  listPermissions = () => {
    return this.permissionsApi.listPermissions();
  };

  listRoles = () => {
    return this.permissionsApi.listRoles();
  };

  getAppSettings = () => {
    return this.settingsApi.getApp();
  };

  updateAppSettings = (updateAppRequest: UpdateAppRequest) => {
    return this.settingsApi.updateApp({ updateAppRequest });
  };

  getRateLimits = () => {
    return this.settingsApi.getRateLimits();
  };

  getTaskStatus = (request: GetTaskRequest) => {
    return this.tasksApi.getTask(request);
  };

  verifyWebhook = (requestBody: string | Buffer, xSignature: string) => {
    const key = Buffer.from(this.secret, 'utf8');
    const hash = crypto
      .createHmac('sha256', key)
      .update(requestBody)
      .digest('hex');

    try {
      return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(xSignature));
    } catch (err) {
      return false;
    }
  };

  getConfiguration = (product: 'chat' | 'video' = 'chat') => {
    return new Configuration({
      apiKey: (name: string) => {
        const mapping: Record<string, string> = {
          'Stream-Auth-Type': 'jwt',
          api_key: this.apiKey,
          Authorization: this.token,
        };

        return mapping[name];
      },
      basePath:
        this.options.basePath ??
        (product === 'chat'
          ? 'https://chat.stream-io-api.com'
          : 'https://video.stream-io-api.com'),
      headers: {
        'X-Stream-Client': 'stream-node-' + process.env.PKG_VERSION,
      },
      middleware: [
        {
          pre: (context: RequestContext) => {
            context.init.headers = {
              ...context.init.headers,
              'x-client-request-id': uuidv4(),
              'Accept-Encoding': 'gzip',
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
                `Stream error code ${value.code}: ${value.message}`,
              );
            }
          },
        },
        {
          pre: (context: RequestContext) => {
            context.init.signal = AbortSignal.timeout(this.options.timeout!);

            return Promise.resolve(context);
          },
          onError: (context: ErrorContext) => {
            const error = context.error as DOMException;
            if (error.name === 'AbortError' || error.name === 'TimeoutError') {
              throw new FetchError(
                error,
                `The request was aborted due to to the ${this.options.timeout}ms timeout, you can set the timeout in the StreamClient constructor`,
              );
            }

            return Promise.resolve(context.response);
          },
        },
      ],
      // https://github.com/OpenAPITools/openapi-generator/issues/13222
      queryParamsStringify: (params: HTTPQuery) => {
        const newParams = [];
        for (const k in params) {
          const param = params[k];
          if (Array.isArray(param)) {
            newParams.push(`${k}=${encodeURIComponent(param.join(','))}`);
          } else if (typeof param === 'object') {
            newParams.push(`${k}=${encodeURIComponent(JSON.stringify(param))}`);
          } else {
            if (
              typeof param === 'string' ||
              typeof param === 'number' ||
              typeof param === 'boolean'
            ) {
              newParams.push(`${k}=${encodeURIComponent(param)}`);
            }
          }
        }

        return newParams.join('&');
      },
    });
  };

  private readonly reservedKeywords = [
    'ban_expires',
    'banned',
    'id',
    'invisible',
    'language',
    'push_notifications',
    'revoke_tokens_issued_before',
    'role',
    'teams',
    'created_at',
    'deactivated_at',
    'deleted_at',
    'last_active',
    'online',
    'updated_at',
    'shadow_banned',
    'name',
    'image',
  ];

  private readonly mapCustomDataBeforeSend = (
    user: UserObject | UserObjectRequest | UserResponse | undefined,
  ) => {
    if (!user) {
      return undefined;
    }
    const copy = { ...user };
    delete copy.custom;
    return { ...copy, ...user.custom };
  };

  private mapCustomDataAfterReceive<T = UserObject | UserResponse | undefined>(
    user: T,
  ) {
    if (!user) {
      return undefined;
    }
    /** @ts-expect-error */
    const result: UserObject | UserResponse = {};
    Object.keys(user).forEach((key) => {
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
