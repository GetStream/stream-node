import { StreamCall } from './StreamCall';
import { StreamClient } from './StreamClient';
import {
  CreateCallTypeRequest,
  DeleteCallTypeRequest,
  GetCallTypeRequest,
  ProductvideoApi,
  QueryCallsRequest,
  UpdateCallTypeRequest,
} from './gen';

export class StreamVideoClient {
  private readonly videoApi: ProductvideoApi;

  constructor(private readonly streamClient: StreamClient) {
    this.videoApi = this.streamClient.videoApi;
  }

  call = (type: string, id: string) => {
    return new StreamCall(this.streamClient, type, id);
  };

  queryCalls = (request?: QueryCallsRequest) => {
    return this.videoApi.queryCalls({
      queryCallsRequest: request ?? {},
    });
  };

  createCallType = (createCallTypeRequest: CreateCallTypeRequest) => {
    return this.videoApi.createCallType({
      createCallTypeRequest,
    });
  };

  deleteCallType = (request: DeleteCallTypeRequest) => {
    return this.videoApi.deleteCallType(request);
  };

  getCallType = (request: GetCallTypeRequest) => {
    return this.videoApi.getCallType(request);
  };

  listCallTypes = () => {
    return this.videoApi.listCallTypes();
  };

  updateCallType = (
    name: string,
    updateCallTypeRequest: UpdateCallTypeRequest,
  ) => {
    return this.videoApi.updateCallType({
      name,
      updateCallTypeRequest,
    });
  };
}
