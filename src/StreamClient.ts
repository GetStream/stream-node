import { StreamChatClient } from "./StreamChatClient";
import { StreamVideoClient } from "./StreamVideoClient";
import {
  BanRequest,
  DeactivateUserRequest,
  DeactivateUsersRequest,
  DeleteUserRequest,
  DeleteUsersRequest,
  ExportUserRequest,
  ExportUsersRequest,
  FlagRequest,
  GuestRequest,
  MuteUserRequest,
  QueryBannedUsersRequest,
  QueryUsersRequest,
  ReactivateUserRequest,
  ReactivateUsersRequest,
  RestoreUsersRequest,
  UnbanRequest,
  UnmuteUserRequest,
  UpdateUserPartialRequest,
  UpdateUsersRequest,
  UsersApi,
} from "./gen/chat";
import {
  APIError,
  Configuration,
  CreateDeviceRequest,
  CreateGuestRequest,
  DefaultApi,
  DeleteDeviceRequest,
  HTTPQuery,
  JSONApiResponse,
  ListDevicesRequest,
  RequestContext,
  ResponseContext,
} from "./gen/video";
import { createToken } from "./utils/create-token";
import { v4 as uuidv4 } from "uuid";

export class StreamClient {
  public readonly video: StreamVideoClient;
  public readonly chat: StreamChatClient;
  private readonly videoDefaultApi;
  private readonly usersApi: UsersApi;
  private token: string;

  constructor(
    private apiKey: string,
    private secret: string,
    public readonly basePath?: string
  ) {
    this.token = createToken(this.secret);
    this.video = new StreamVideoClient(this);
    this.chat = new StreamChatClient(this);

    const videoConfiguration = this.getConfiguration({
      basePath: this.basePath || "https://video.stream-io-api.com/video",
    });
    this.videoDefaultApi = new DefaultApi(videoConfiguration);
    const chatConfiguration = this.getConfiguration();
    //@ts-expect-error typing problem
    this.usersApi = new UsersApi(chatConfiguration);
  }

  createDevice = (createDeviceRequest: CreateDeviceRequest) => {
    return this.videoDefaultApi.createDevice({ createDeviceRequest });
  };
  createGuest = (guestRequest: GuestRequest) => {
    return this.usersApi.createGuest({ guestRequest });
  };
  deleteDevice = (requestParameters: DeleteDeviceRequest) => {
    return this.videoDefaultApi.deleteDevice(requestParameters);
  };
  listDevices = (requestParameters: ListDevicesRequest) => {
    return this.videoDefaultApi.listDevices(requestParameters);
  };

  banUser = (banRequest: BanRequest) => {
    return this.usersApi.ban({ banRequest });
  };

  deactivateUser = (deactivateUserRequest: DeactivateUserRequest) => {
    return this.usersApi.deactivateUser({
      deactivateUserRequest,
      userId: deactivateUserRequest.user_id,
    });
  };

  deactivateUsers = (deactivateUsersRequest: DeactivateUsersRequest) => {
    return this.usersApi.deactivateUsers({ deactivateUsersRequest });
  };

  deleteUser = (request: DeleteUserRequest) => {
    return this.usersApi.deleteUser(request);
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

  flag = (flagRequest: FlagRequest) => {
    return this.usersApi.flag({ flagRequest });
  };

  queryBannedUsers = (payload: QueryBannedUsersRequest) => {
    return this.usersApi.queryBannedUsers({ payload });
  };

  queryUsers = (payload: QueryUsersRequest) => {
    return this.usersApi.queryUsers({ payload });
  };

  reactivateUser = (reactivateUserRequest: ReactivateUserRequest) => {
    return this.usersApi.reactivateUser({
      reactivateUserRequest,
      userId: reactivateUserRequest.user_id,
    });
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

  unflag = (flagRequest: FlagRequest) => {
    return this.usersApi.unflag({ flagRequest });
  };

  updateUsers = (updateUsersRequest: UpdateUsersRequest) => {
    return this.usersApi.updateUsers({ updateUsersRequest });
  };

  updateUserPartial = (updateUserPartialRequest: UpdateUserPartialRequest) => {
    return this.usersApi.updateUsersPartial({ updateUserPartialRequest });
  };

  muteUser = (muteUserRequest: MuteUserRequest) => {
    return this.usersApi.muteUser({ muteUserRequest });
  };

  unmuteUser = (unmuteUserRequest: UnmuteUserRequest) => {
    return this.usersApi.unmuteUser({ unmuteUserRequest });
  };

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
}
