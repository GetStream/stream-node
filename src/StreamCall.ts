import { StreamClient } from './StreamClient';
import {
  DefaultApi,
  GetCallRequest,
  VideoBlockUserRequest,
  VideoGetOrCreateCallRequest,
  VideoGoLiveRequest,
  VideoMuteUsersRequest,
  VideoPinRequest,
  VideoQueryMembersRequest,
  VideoStartRecordingRequest,
  VideoStartTranscriptionRequest,
  VideoUnblockUserRequest,
  VideoUnpinRequest,
  VideoUpdateCallMembersRequest,
  VideoUpdateCallRequest,
  VideoUpdateUserPermissionsRequest,
} from './gen/video';
import { OmitTypeId } from './types';

export class StreamCall {
  private readonly baseRequest: { type: string; id: string };
  private readonly apiClient: DefaultApi;

  constructor(
    private readonly streamClient: StreamClient,
    private readonly type: string,
    private readonly id: string,
  ) {
    this.baseRequest = { id: this.id, type: this.type };
    const configuration = this.streamClient.getConfiguration('video');
    this.apiClient = new DefaultApi(configuration);
  }

  blockUser = (videoBlockUserRequest: VideoBlockUserRequest) => {
    return this.apiClient.blockUser({
      ...this.baseRequest,
      videoBlockUserRequest,
    });
  };

  endCall = () => {
    return this.apiClient.endCall({ ...this.baseRequest });
  };

  get = (request?: OmitTypeId<GetCallRequest>) => {
    return this.apiClient.getCall({ ...(request ?? {}), ...this.baseRequest });
  };

  getOrCreate = (videoGetOrCreateCallRequest?: VideoGetOrCreateCallRequest) => {
    return this.apiClient.getOrCreateCall({
      ...this.baseRequest,
      videoGetOrCreateCallRequest: videoGetOrCreateCallRequest ?? {},
    });
  };

  create = (getOrCreateCallRequest?: VideoGetOrCreateCallRequest) => {
    return this.getOrCreate(getOrCreateCallRequest);
  };

  goLive = (videoGoLiveRequest?: VideoGoLiveRequest) => {
    return this.apiClient.goLive({
      ...this.baseRequest,
      videoGoLiveRequest: videoGoLiveRequest ?? {},
    });
  };

  listRecordings = () => {
    return this.apiClient.listRecordings({
      ...this.baseRequest,
    });
  };

  listTranscriptions = () => {
    return this.apiClient.listTranscriptions({
      ...this.baseRequest,
    });
  };

  muteUsers = (videoMuteUsersRequest: VideoMuteUsersRequest) => {
    return this.apiClient.muteUsers({
      ...this.baseRequest,
      videoMuteUsersRequest,
    });
  };

  queryMembers = (request?: OmitTypeId<VideoQueryMembersRequest>) => {
    return this.apiClient.queryMembers({
      videoQueryMembersRequest: { ...(request ?? {}), ...this.baseRequest },
    });
  };

  sendCustomEvent = (event: Record<string, any>) => {
    return this.apiClient.sendEvent({
      videoSendEventRequest: { custom: event },
      ...this.baseRequest,
    });
  };

  startHLSBroadcasting = () => {
    return this.apiClient.startHLSBroadcasting({ ...this.baseRequest });
  };

  startRecording = (request?: VideoStartRecordingRequest) => {
    return this.apiClient.startRecording({
      ...this.baseRequest,
      videoStartRecordingRequest: request ?? {},
    });
  };

  startTranscription = (
    videoStartTranscriptionRequest: VideoStartTranscriptionRequest = {},
  ) => {
    return this.apiClient.startTranscription({
      ...this.baseRequest,
      videoStartTranscriptionRequest,
    });
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

  updateCallMembers = (
    videoUpdateCallMembersRequest: VideoUpdateCallMembersRequest,
  ) => {
    return this.apiClient.updateCallMembers({
      videoUpdateCallMembersRequest,
      ...this.baseRequest,
    });
  };

  updateUserPermissions = (
    videoUpdateUserPermissionsRequest: VideoUpdateUserPermissionsRequest,
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
    return this.apiClient.videoUnpin({
      videoUnpinRequest,
      ...this.baseRequest,
    });
  };
}
