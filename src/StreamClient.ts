import { StreamChatClient } from './StreamChatClient';
import { StreamVideoClient } from './StreamVideoClient';
import {
  APIError,
  BanRequest,
  CheckExternalStorageRequest,
  CheckPushRequest,
  Configuration,
  CreateDeviceRequest,
  CreateExternalStorageRequest,
  CreateGuestRequest,
  CreateRoleRequest,
  DeactivateUserRequest,
  DeactivateUsersRequest,
  DeleteDeviceRequest,
  DeleteExternalStorageRequest,
  DeletePushProviderRequest,
  DeleteRoleRequest,
  DeleteUsersRequest,
  ErrorContext,
  ExportUserRequest,
  ExportUsersRequest,
  FetchError,
  FlagRequest,
  GetPermissionRequest,
  GetTaskRequest,
  HTTPQuery,
  JSONApiResponse,
  ListDevicesRequest,
  MuteUserRequest,
  ProductchatApi,
  ProductcommonApi,
  ProductvideoApi,
  PushProvider,
  QueryBannedUsersRequest,
  QueryUsersPayload,
  ReactivateUserRequest,
  ReactivateUsersRequest,
  RequestContext,
  ResponseContext,
  RestoreUsersRequest,
  UnbanRequest,
  UnmuteUserRequest,
  UpdateAppRequest,
  UpdateExternalStorageRequest,
  UpdateUserPartialRequest,
  UpdateUsersRequest,
  UserCustomEventRequest,
} from './gen';
import { v4 as uuidv4 } from 'uuid';
import { JWTServerToken, JWTUserToken } from './utils/create-token';
import crypto from 'crypto';

export interface StreamClientOptions {
  timeout?: number;
  basePath?: string;
}

export class StreamClient {
  public readonly video: StreamVideoClient;
  public readonly chat: StreamChatClient;
  public readonly options: StreamClientOptions = {};
  /**
   * @internal
   */
  public readonly chatApi: ProductchatApi;
  /**
   * @internal
   */
  public readonly videoApi: ProductvideoApi;
  /**
   * @internal
   */
  public readonly commonApi: ProductcommonApi;
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

    const chatConfiguration = this.getConfiguration();
    const videoConfiguration = this.getConfiguration('video');

    this.chatApi = new ProductchatApi(chatConfiguration);
    this.videoApi = new ProductvideoApi(videoConfiguration);
    this.commonApi = new ProductcommonApi(videoConfiguration);

    this.video = new StreamVideoClient(this);
    this.chat = new StreamChatClient(this);
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
    exp = Math.round(new Date().getTime() / 1000) + 60 * 60,
    iat = Math.round(Date.now() / 1000),
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
      console.warn(
        `Use createCallToken method for creating call tokens, the "call_cids" param will be removed from the createToken method with version 0.2.0`,
      );
      extra.call_cids = call_cids;
    }

    return JWTUserToken(this.secret, userID, extra);
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
    userID: string,
    call_cids: string[],
    exp = Math.round(new Date().getTime() / 1000) + 60 * 60,
    iat = Math.round(Date.now() / 1000),
  ) {
    const extra: { exp?: number; iat?: number; call_cids?: string[] } = {};

    if (exp) {
      extra.exp = exp;
    }

    if (iat) {
      extra.iat = iat;
    }

    extra.call_cids = call_cids;

    return JWTUserToken(this.secret, userID, extra);
  }

  createDevice = (createDeviceRequest: CreateDeviceRequest) => {
    return this.commonApi.createDevice({ createDeviceRequest });
  };

  deleteDevice = (requestParameters: DeleteDeviceRequest) => {
    return this.commonApi.deleteDevice(requestParameters);
  };

  listDevices = (requestParameters: ListDevicesRequest) => {
    return this.commonApi.listDevices(requestParameters);
  };

  listPushProviders = () => {
    return this.commonApi.listPushProviders();
  };

  deletePushProvider = (request: DeletePushProviderRequest) => {
    return this.commonApi.deletePushProvider(request);
  };

  upsertPushProvider = (request: PushProvider) => {
    return this.commonApi.upsertPushProvider({
      upsertPushProviderRequest: { push_provider: request },
    });
  };

  checkPush = (checkPushRequest: CheckPushRequest) => {
    return this.commonApi.checkPush({ checkPushRequest });
  };

  createGuest = (createGuestRequest: CreateGuestRequest) => {
    return this.commonApi.createGuest({ createGuestRequest });
  };

  banUser = (banRequest: BanRequest) => {
    return this.commonApi.ban({ banRequest });
  };

  deactivateUser = (
    deactivateUserRequest: DeactivateUserRequest & { user_id: string },
  ) => {
    return this.commonApi.deactivateUser({
      deactivateUserRequest,
      userId: deactivateUserRequest.user_id,
    });
  };

  deactivateUsers = (deactivateUsersRequest: DeactivateUsersRequest) => {
    return this.commonApi.deactivateUsers({ deactivateUsersRequest });
  };

  deleteUsers = (deleteUsersRequest: DeleteUsersRequest) => {
    return this.commonApi.deleteUsers({ deleteUsersRequest });
  };

  exportUser = (request: ExportUserRequest) => {
    return this.commonApi.exportUser(request);
  };

  exportUsers = (exportUsersRequest: ExportUsersRequest) => {
    return this.commonApi.exportUsers({ exportUsersRequest });
  };

  flag = (flagRequest: FlagRequest) => {
    return this.commonApi.flag({ flagRequest });
  };

  queryBannedUsers = (payload: QueryBannedUsersRequest) => {
    return this.chatApi.queryBannedUsers({ payload });
  };

  queryUsers = (payload: QueryUsersPayload) => {
    return this.commonApi.queryUsers({ payload });
  };

  reactivateUser = (
    reactivateUserRequest: ReactivateUserRequest & { user_id: string },
  ) => {
    return this.commonApi.reactivateUser({
      reactivateUserRequest,
      userId: reactivateUserRequest.user_id,
    });
  };

  reactivateUsers = (reactivateUsersRequest: ReactivateUsersRequest) => {
    return this.commonApi.reactivateUsers({ reactivateUsersRequest });
  };

  restoreUsers = (restoreUsersRequest: RestoreUsersRequest) => {
    return this.commonApi.restoreUsers({ restoreUsersRequest });
  };

  unbanUser = (request: UnbanRequest) => {
    return this.commonApi.unban(request);
  };

  upsertUsers = (updateUsersRequest: UpdateUsersRequest) => {
    return this.commonApi.updateUsers({ updateUsersRequest });
  };

  updateUsersPartial = (request: { users: UpdateUserPartialRequest[] }) => {
    return this.commonApi.updateUsersPartial({
      updateUsersPartialRequest: request,
    });
  };

  muteUser = (muteUserRequest: MuteUserRequest) => {
    return this.commonApi.muteUser({ muteUserRequest });
  };

  unmuteUser = (unmuteUserRequest: UnmuteUserRequest) => {
    return this.commonApi.unmuteUser({ unmuteUserRequest });
  };

  sendCustomEventToUser = (userId: string, event: UserCustomEventRequest) => {
    return this.chatApi.sendUserCustomEvent({
      userId,
      sendUserCustomEventRequest: { event },
    });
  };

  createRole = (createRoleRequest: CreateRoleRequest) => {
    return this.commonApi.createRole({ createRoleRequest });
  };

  deleteRole = (request: DeleteRoleRequest) => {
    return this.commonApi.deleteRole(request);
  };

  getPermission = (request: GetPermissionRequest) => {
    return this.commonApi.getPermission(request);
  };

  listPermissions = () => {
    return this.commonApi.listPermissions();
  };

  listRoles = () => {
    return this.commonApi.listRoles();
  };

  getAppSettings = () => {
    return this.commonApi.getApp();
  };

  updateAppSettings = (updateAppRequest: UpdateAppRequest) => {
    return this.commonApi.updateApp({ updateAppRequest });
  };

  getRateLimits = () => {
    return this.commonApi.getRateLimits();
  };

  getTaskStatus = (request: GetTaskRequest) => {
    return this.commonApi.getTask(request);
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

  listExternalStorages = () => {
    return this.commonApi.listExternalStorage();
  };

  createExternalStorage = (
    createExternalStorageRequest: CreateExternalStorageRequest,
  ) => {
    return this.commonApi.createExternalStorage({
      createExternalStorageRequest,
    });
  };

  deleteExternalStorage = (request: DeleteExternalStorageRequest) => {
    return this.commonApi.deleteExternalStorage(request);
  };

  updateExternalStorage = (
    name: string,
    updateExternalStorageRequest: UpdateExternalStorageRequest,
  ) => {
    return this.commonApi.updateExternalStorage({
      name,
      updateExternalStorageRequest,
    });
  };

  checkExternalStorage = (request: CheckExternalStorageRequest) => {
    return this.commonApi.checkExternalStorage(request);
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
}
