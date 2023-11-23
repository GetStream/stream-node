import { StreamCall } from './StreamCall';
import { StreamClient } from './StreamClient';
import {
  DefaultApi,
  DeleteCallTypeRequest,
  GetCallTypeRequest,
  ServerSideApi,
  VideoCreateCallTypeRequest,
  VideoQueryCallsRequest,
  VideoUpdateCallTypeRequest,
} from './gen/video';

export class StreamVideoClient {
  private readonly apiClient: DefaultApi;
  private readonly videoServerSideApiClient: ServerSideApi;

  constructor(private readonly streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration({
      basePath:
        this.streamClient.options.basePath ??
        'https://video.stream-io-api.com/video',
    });
    this.apiClient = new DefaultApi(configuration);
    this.videoServerSideApiClient = new ServerSideApi(configuration);
  }

  call = (type: string, id: string) => {
    return new StreamCall(this.streamClient, type, id);
  };

  queryCalls = (request?: VideoQueryCallsRequest) => {
    return this.apiClient.queryCalls({
      videoQueryCallsRequest: request ?? {},
    });
  };

  createCallType = (videoCreateCallTypeRequest: VideoCreateCallTypeRequest) => {
    return this.videoServerSideApiClient.createCallType({
      videoCreateCallTypeRequest,
    });
  };

  deleteCallType = (request: DeleteCallTypeRequest) => {
    return this.videoServerSideApiClient.deleteCallType(request);
  };

  getCallType = (request: GetCallTypeRequest) => {
    return this.videoServerSideApiClient.getCallType(request);
  };

  listCallTypes = () => {
    return this.videoServerSideApiClient.listCallTypes();
  };

  updateCallType = (
    name: string,
    videoUpdateCallTypeRequest: VideoUpdateCallTypeRequest,
  ) => {
    return this.videoServerSideApiClient.updateCallType({
      name,
      videoUpdateCallTypeRequest,
    });
  };
}
