import { StreamClient } from './StreamClient';
import {
  BlockUserRequest,
  GetOrCreateCallRequest,
  GoLiveRequest,
  MuteUsersRequest,
  PinRequest,
  QueryCallMembersRequest,
  SendCallEventRequest,
  StartRecordingRequest,
  StartTranscriptionRequest,
  UnblockUserRequest,
  UnpinRequest,
  UpdateCallMembersRequest,
  UpdateCallRequest,
  UpdateUserPermissionsRequest,
} from './gen';
import {
  DeleteRecordingRequest,
  DeleteTranscriptionRequest,
  GetCallRequest,
  ProductvideoApi,
} from './gen/apis';

import { OmitTypeId } from './types';

export class StreamCall {
  private readonly baseRequest: { type: string; id: string };
  private readonly videoApi: ProductvideoApi;

  constructor(
    private readonly streamClient: StreamClient,
    private readonly type: string,
    private readonly id: string,
  ) {
    this.baseRequest = { id: this.id, type: this.type };
    this.videoApi = this.streamClient.videoApi;
  }

  blockUser = (blockUserRequest: BlockUserRequest) => {
    return this.videoApi.blockUser({
      ...this.baseRequest,
      blockUserRequest,
    });
  };

  endCall = () => {
    return this.videoApi.endCall({ ...this.baseRequest });
  };

  get = (request?: OmitTypeId<GetCallRequest>) => {
    return this.videoApi.getCall({ ...(request ?? {}), ...this.baseRequest });
  };

  getOrCreate = (getOrCreateCallRequest?: GetOrCreateCallRequest) => {
    return this.videoApi.getOrCreateCall({
      ...this.baseRequest,
      getOrCreateCallRequest: getOrCreateCallRequest ?? {},
    });
  };

  create = (getOrCreateCallRequest?: GetOrCreateCallRequest) => {
    return this.getOrCreate(getOrCreateCallRequest);
  };

  goLive = (goLiveRequest?: GoLiveRequest) => {
    return this.videoApi.goLive({
      ...this.baseRequest,
      goLiveRequest: goLiveRequest ?? {},
    });
  };

  listRecordings = () => {
    return this.videoApi.listRecordings({
      ...this.baseRequest,
    });
  };

  deleteRecording = (request: OmitTypeId<DeleteRecordingRequest>) => {
    return this.videoApi.deleteRecording({ ...this.baseRequest, ...request });
  };

  listTranscriptions = () => {
    return this.videoApi.listTranscriptions({
      ...this.baseRequest,
    });
  };

  muteUsers = (muteUsersRequest: MuteUsersRequest) => {
    return this.videoApi.muteUsers({
      ...this.baseRequest,
      muteUsersRequest,
    });
  };

  queryMembers = (request?: OmitTypeId<QueryCallMembersRequest>) => {
    return this.videoApi.queryCallMembers({
      queryCallMembersRequest: { ...(request ?? {}), ...this.baseRequest },
    });
  };

  sendCustomEvent = (sendCallEventRequest: SendCallEventRequest) => {
    return this.videoApi.sendCallEvent({
      sendCallEventRequest,
      ...this.baseRequest,
    });
  };

  startHLSBroadcasting = () => {
    return this.videoApi.startHLSBroadcasting({ ...this.baseRequest });
  };

  startRecording = (request?: StartRecordingRequest) => {
    return this.videoApi.startRecording({
      ...this.baseRequest,
      startRecordingRequest: request ?? {},
    });
  };

  startTranscription = (
    startTranscriptionRequest: StartTranscriptionRequest = {},
  ) => {
    return this.videoApi.startTranscription({
      ...this.baseRequest,
      startTranscriptionRequest,
    });
  };

  deleteTranscription = (request: OmitTypeId<DeleteTranscriptionRequest>) => {
    return this.videoApi.deleteTranscription({
      ...this.baseRequest,
      ...request,
    });
  };

  stopHLSBroadcasting = () => {
    return this.videoApi.stopHLSBroadcasting({ ...this.baseRequest });
  };

  stopLive = () => {
    return this.videoApi.stopLive({ ...this.baseRequest });
  };

  stopRecording = () => {
    return this.videoApi.stopRecording({ ...this.baseRequest });
  };

  stopTranscription = () => {
    return this.videoApi.stopTranscription({ ...this.baseRequest });
  };

  unblockUser = (unblockUserRequest: UnblockUserRequest) => {
    return this.videoApi.unblockUser({
      unblockUserRequest,
      ...this.baseRequest,
    });
  };

  update = (updateCallRequest: UpdateCallRequest) => {
    return this.videoApi.updateCall({
      updateCallRequest,
      ...this.baseRequest,
    });
  };

  updateCallMembers = (updateCallMembersRequest: UpdateCallMembersRequest) => {
    return this.videoApi.updateCallMembers({
      updateCallMembersRequest,
      ...this.baseRequest,
    });
  };

  updateUserPermissions = (
    updateUserPermissionsRequest: UpdateUserPermissionsRequest,
  ) => {
    return this.videoApi.updateUserPermissions({
      updateUserPermissionsRequest,
      ...this.baseRequest,
    });
  };

  pinVideo = (pinRequest: PinRequest) => {
    return this.videoApi.videoPin({ pinRequest, ...this.baseRequest });
  };

  unpinVideo = (unpinRequest: UnpinRequest) => {
    return this.videoApi.videoUnpin({
      unpinRequest,
      ...this.baseRequest,
    });
  };
}
