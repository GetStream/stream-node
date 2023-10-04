import { StreamCall } from "./StreamCall";
import {
  APIError,
  Configuration,
  CreateCallTypeRequest,
  CreateDeviceRequest,
  CreateGuestRequest,
  DefaultApi,
  DeleteDeviceRequest,
  JSONApiResponse,
  ListDevicesRequest,
  QueryCallsRequest,
  RequestContext,
  ResponseContext,
  ServerSideApi,
  UpdateCallTypeRequest,
} from "./gen/video";
import { createToken } from "./utils/create-token";
import { v4 as uuidv4 } from "uuid";

export class StreamClient {
  public readonly defaultApiClient;
  public readonly serverSideApiClient;
  private token: string;

  constructor(
    private apiKey: string,
    private secret: string,
    private basePath?: string
  ) {
    this.token = createToken(this.secret);

    const configuration = this.getConfiguration();
    this.defaultApiClient = new DefaultApi(configuration);
    this.serverSideApiClient = new ServerSideApi(configuration);
  }

  call = (type: string, id: string) => {
    return new StreamCall(this, type, id);
  };

  createDevice = (createDeviceRequest: CreateDeviceRequest) => {
    return this.defaultApiClient.createDevice({ createDeviceRequest });
  };
  createGuest = (createGuestRequest: CreateGuestRequest) => {
    return this.defaultApiClient.createGuest({ createGuestRequest });
  };
  deleteDevice = (requestParameters: DeleteDeviceRequest) => {
    return this.defaultApiClient.deleteDevice(requestParameters);
  };
  listDevices = (requestParameters: ListDevicesRequest) => {
    return this.defaultApiClient.listDevices(requestParameters);
  };
  queryCalls = (request?: QueryCallsRequest) => {
    return this.defaultApiClient.queryCalls({
      queryCallsRequest: request || {},
    });
  };

  createCallType = (createCallTypeRequest: CreateCallTypeRequest) => {
    return this.serverSideApiClient.createCallType({ createCallTypeRequest });
  };

  deleteCallType = (name: string) => {
    return this.serverSideApiClient.deleteCallType({ name });
  };

  getCallType = (name: string) => {
    return this.serverSideApiClient.getCallType({ name });
  };

  listCallTypes = () => {
    return this.serverSideApiClient.listCallTypes();
  };

  updateCallType = (
    name: string,
    updateCallTypeRequest: UpdateCallTypeRequest
  ) => {
    return this.serverSideApiClient.updateCallType({
      name,
      updateCallTypeRequest,
    });
  };

  private getConfiguration = () => {
    return new Configuration({
      apiKey: (name: string) => {
        const mapping: { [key: string]: string } = {
          "Stream-Auth-Type": "jwt",
          api_key: this.apiKey,
          Authorization: this.token,
        };

        return mapping[name];
      },
      basePath: this.basePath || "https://video.stream-io-api.com/video",
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
    });
  };
}
