import { StreamCall } from "./StreamCall";
import { StreamClient } from "./StreamClient";
import {
  CreateCallTypeRequest,
  DefaultApi,
  QueryCallsRequest,
  ServerSideApi,
  UpdateCallTypeRequest,
} from "./gen/video";

export class StreamVideoClient {
  private readonly apiClient: DefaultApi;
  private readonly videoServerSideApiClient: ServerSideApi;

  constructor(private streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration({
      basePath:
        this.streamClient.basePath || "https://video.stream-io-api.com/video",
    });
    this.apiClient = new DefaultApi(configuration);
    this.videoServerSideApiClient = new ServerSideApi(configuration);
  }

  call = (type: string, id: string) => {
    return new StreamCall(this.streamClient, type, id);
  };

  queryCalls = (request?: QueryCallsRequest) => {
    return this.apiClient.queryCalls({
      queryCallsRequest: request || {},
    });
  };

  createCallType = (createCallTypeRequest: CreateCallTypeRequest) => {
    return this.videoServerSideApiClient.createCallType({
      createCallTypeRequest,
    });
  };

  deleteCallType = (name: string) => {
    return this.videoServerSideApiClient.deleteCallType({ name });
  };

  getCallType = (name: string) => {
    return this.videoServerSideApiClient.getCallType({ name });
  };

  listCallTypes = () => {
    return this.videoServerSideApiClient.listCallTypes();
  };

  updateCallType = (
    name: string,
    updateCallTypeRequest: UpdateCallTypeRequest
  ) => {
    return this.videoServerSideApiClient.updateCallType({
      name,
      updateCallTypeRequest,
    });
  };
}
