import { StreamClient } from "./StreamClient";
import {
  DefaultApi,
  GetCallRequest,
  VideoPinRequest,
  QueryMembersRequest,
  VideoUnpinRequest,
  VideoBlockUserRequest,
  VideoGetOrCreateCallRequest,
  VideoGoLiveRequest,
  VideoMuteUsersRequest,
  VideoUnblockUserRequest,
  VideoUpdateCallRequest,
  VideoUpdateCallMembersRequest,
  VideoUpdateUserPermissionsRequest,
  VideoQueryMembersRequest,
} from "./gen/video";

export type OmitCallTypeId<T> = Omit<T, "type" | "id" | "connectionId">;

export class StreamCall {
  private readonly baseRequest: { type: string; id: string };
  private readonly apiClient: DefaultApi;

  constructor(
    private streamClient: StreamClient,
    private type: string,
    private id: string
  ) {
    this.baseRequest = { id: this.id, type: this.type };
    const configuration = this.streamClient.getConfiguration({
      basePath:
        this.streamClient.basePath || "https://video.stream-io-api.com/video",
    });
    this.apiClient = new DefaultApi(configuration);
  }

  accept = () => {
    return this.apiClient.acceptCall(this.baseRequest);
  };

  blockUser = (videoBlockUserRequest: VideoBlockUserRequest) => {
    return this.apiClient.blockUser({
      ...this.baseRequest,
      videoBlockUserRequest,
    });
  };

  endCall = () => {
    return this.apiClient.endCall({ ...this.baseRequest });
  };

  get = (request: OmitCallTypeId<GetCallRequest>) => {
    return this.apiClient.getCall({ ...request, ...this.baseRequest });
  };

  getOrCreate = (videoGetOrCreateCallRequest?: VideoGetOrCreateCallRequest) => {
    return this.apiClient.getOrCreateCall({
      ...this.baseRequest,
      videoGetOrCreateCallRequest: videoGetOrCreateCallRequest || {},
    });
  };

  create = (getOrCreateCallRequest?: VideoGetOrCreateCallRequest) => {
    return this.getOrCreate(getOrCreateCallRequest);
  };

  goLive = (videoGoLiveRequest?: VideoGoLiveRequest) => {
    return this.apiClient.goLive({
      ...this.baseRequest,
      videoGoLiveRequest: videoGoLiveRequest || null,
    });
  };

  listRecordings = (sessionId?: string) => {
    if (sessionId) {
      return this.apiClient.listRecordingsTypeIdSession1({
        ...this.baseRequest,
        session: sessionId,
      });
    } else {
      return this.apiClient.listRecordingsTypeId0({
        ...this.baseRequest,
      });
    }
  };

  muteUsers = (videoMuteUsersRequest: VideoMuteUsersRequest) => {
    return this.apiClient.muteUsers({ ...this.baseRequest, videoMuteUsersRequest });
  };

  queryMembers = (request?: OmitCallTypeId<VideoQueryMembersRequest>) => {
    return this.apiClient.queryMembers({
      videoQueryMembersRequest: { ...(request || {}), ...this.baseRequest },
    });
  };

  sendCustomEvent = (event: { [key: string]: any }) => {
    return this.apiClient.sendEvent({
      videoSendEventRequest: { custom: event },
      ...this.baseRequest,
    });
  };

  startHLSBroadcasting = () => {
    return this.apiClient.startHLSBroadcasting({ ...this.baseRequest });
  };

  startRecording = () => {
    return this.apiClient.startRecording({ ...this.baseRequest });
  };

  startTranscription = () => {
    return this.apiClient.startTranscription({ ...this.baseRequest });
  };

  stopHLSBroadcasting = () => {
    return this.apiClient.stopHLSBroadcasting({ ...this.baseRequest });
  };

  stopLive = () => {
    return this.apiClient.stopLive({ ...this.baseRequest });
  };

  stopRecording = () => {
    return this.apiClient.stopRecording({ ...this.baseRequest });
  };

  stopTranscription = () => {
    return this.apiClient.stopTranscription({ ...this.baseRequest });
  };

  unblockUser = (videoUnblockUserRequest: VideoUnblockUserRequest) => {
    return this.apiClient.unblockUser({
      videoUnblockUserRequest,
      ...this.baseRequest,
    });
  };

  update = (videoUpdateCallRequest: VideoUpdateCallRequest) => {
    return this.apiClient.updateCall({
      videoUpdateCallRequest,
      ...this.baseRequest,
    });
  };

  updateCallMembers = (videoUpdateCallMembersRequest: VideoUpdateCallMembersRequest) => {
    return this.apiClient.updateCallMembers({
      videoUpdateCallMembersRequest,
      ...this.baseRequest,
    });
  };

  updateUserPermissions = (
    videoUpdateUserPermissionsRequest: VideoUpdateUserPermissionsRequest
  ) => {
    return this.apiClient.updateUserPermissions({
      videoUpdateUserPermissionsRequest,
      ...this.baseRequest,
    });
  };

  pinVideo = (videoPinRequest: VideoPinRequest) => {
    return this.apiClient.videoPin({ videoPinRequest, ...this.baseRequest });
  };

  unpinVideo = (videoUnpinRequest: VideoUnpinRequest) => {
    return this.apiClient.videoUnpin({ videoUnpinRequest, ...this.baseRequest });
  };
}
