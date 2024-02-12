import { StreamCall } from './StreamCall';
import { StreamClient } from './StreamClient';
import {
  CheckExternalStorageRequest,
  DefaultApi,
  DeleteCallTypeRequest,
  DeleteExternalStorageRequest,
  GetCallTypeRequest,
  ServerSideApi,
  SettingsApi,
  VideoCreateCallTypeRequest,
  VideoCreateExternalStorageRequest,
  VideoQueryCallsRequest,
  VideoUpdateCallTypeRequest,
  VideoUpdateExternalStorageRequest,
} from './gen/video';

export class StreamVideoClient {
  private readonly apiClient: DefaultApi;
  private readonly videoServerSideApiClient: ServerSideApi;
  private readonly settingsApi: SettingsApi;

  constructor(private readonly streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration('video');
    this.apiClient = new DefaultApi(configuration);
    this.settingsApi = new SettingsApi(configuration);
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

  listExternalStorages = () => {
    return this.settingsApi.listExternalStorage();
  };

  createExternalStorage = (
    videoCreateExternalStorageRequest: VideoCreateExternalStorageRequest,
  ) => {
    return this.settingsApi.createExternalStorage({
      videoCreateExternalStorageRequest,
    });
  };

  deleteExternalStorage = (request: DeleteExternalStorageRequest) => {
    return this.settingsApi.deleteExternalStorage(request);
  };

  updateExternalStorage = (
    name: string,
    videoUpdateExternalStorageRequest: VideoUpdateExternalStorageRequest,
  ) => {
    return this.videoServerSideApiClient.updateExternalStorage({
      name,
      videoUpdateExternalStorageRequest,
    });
  };

  checkExternalStorage = (request: CheckExternalStorageRequest) => {
    return this.videoServerSideApiClient.checkExternalStorage(request);
  };
}
