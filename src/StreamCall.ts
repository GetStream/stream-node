import { StreamClient } from "./StreamClient";
import {
  BlockUserRequest,
  DefaultApi,
  GetCallRequest,
  GetOrCreateCallRequest,
  GoLiveRequest,
  MuteUsersRequest,
  PinRequest,
  QueryMembersRequest,
  UnblockUserRequest,
  UnpinRequest,
  UpdateCallMembersRequest,
  UpdateCallRequest,
  UpdateUserPermissionsRequest,
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
    this.apiClient = this.streamClient.defaultApiClient;
  }

  accept = () => {
    return this.apiClient.acceptCall(this.baseRequest);
  };

  blockUser = (blockUserRequest: BlockUserRequest) => {
    return this.apiClient.blockUser({
      ...this.baseRequest,
      blockUserRequest,
    });
  };

  endCall = () => {
    return this.apiClient.endCall({ ...this.baseRequest });
  };

  get = (request: OmitCallTypeId<GetCallRequest>) => {
    return this.apiClient.getCall({ ...request, ...this.baseRequest });
  };

  getOrCreate = (getOrCreateCallRequest?: GetOrCreateCallRequest) => {
    return this.apiClient.getOrCreateCall({
      ...this.baseRequest,
      getOrCreateCallRequest: getOrCreateCallRequest || {},
    });
  };

  create = (getOrCreateCallRequest?: GetOrCreateCallRequest) => {
    return this.getOrCreate(getOrCreateCallRequest);
  };

  goLive = (goLiveRequest?: GoLiveRequest) => {
    return this.apiClient.goLive({
      ...this.baseRequest,
      goLiveRequest: goLiveRequest || null,
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

  muteUsers = (muteUsersRequest: MuteUsersRequest) => {
    return this.apiClient.muteUsers({ ...this.baseRequest, muteUsersRequest });
  };

  queryMembers = (request?: OmitCallTypeId<QueryMembersRequest>) => {
    return this.apiClient.queryMembers({
      queryMembersRequest: { ...(request || {}), ...this.baseRequest },
    });
  };

  sendCustomEvent = (event: { [key: string]: any }) => {
    return this.apiClient.sendEvent({
      sendEventRequest: { custom: event },
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

  unblockUser = (unblockUserRequest: UnblockUserRequest) => {
    return this.apiClient.unblockUser({
      unblockUserRequest,
      ...this.baseRequest,
    });
  };

  update = (updateCallRequest: UpdateCallRequest) => {
    return this.apiClient.updateCall({
      updateCallRequest,
      ...this.baseRequest,
    });
  };

  updateCallMembers = (updateCallMembersRequest: UpdateCallMembersRequest) => {
    return this.apiClient.updateCallMembers({
      updateCallMembersRequest,
      ...this.baseRequest,
    });
  };

  updateUserPermissions = (
    updateUserPermissionsRequest: UpdateUserPermissionsRequest
  ) => {
    return this.apiClient.updateUserPermissions({
      updateUserPermissionsRequest,
      ...this.baseRequest,
    });
  };

  pinVideo = (pinRequest: PinRequest) => {
    return this.apiClient.videoPin({ pinRequest, ...this.baseRequest });
  };

  unpinVideo = (unpinRequest: UnpinRequest) => {
    return this.apiClient.videoUnpin({ unpinRequest, ...this.baseRequest });
  };
}
