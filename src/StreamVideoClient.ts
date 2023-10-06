import { StreamCall } from "./StreamCall";
import { StreamClient } from "./StreamClient";
import {
  DefaultApi,
  ServerSideApi,
  VideoCreateCallTypeRequest,
  VideoQueryCallsRequest,
  VideoUpdateCallTypeRequest,
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

  queryCalls = (request?: VideoQueryCallsRequest) => {
    return this.apiClient.queryCalls({
      videoQueryCallsRequest: request || {},
    });
  };

  createCallType = (videoCreateCallTypeRequest: VideoCreateCallTypeRequest) => {
    return this.videoServerSideApiClient.createCallType({
      videoCreateCallTypeRequest,
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
    videoUpdateCallTypeRequest: VideoUpdateCallTypeRequest
  ) => {
    return this.videoServerSideApiClient.updateCallType({
      name,
      videoUpdateCallTypeRequest,
    });
  };
}
