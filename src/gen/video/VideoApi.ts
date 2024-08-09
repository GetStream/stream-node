import { BaseApi } from '../../BaseApi';
import { StreamResponse } from '../../types';
import {
  BlockUserRequest,
  BlockUserResponse,
  CollectUserFeedbackRequest,
  CollectUserFeedbackResponse,
  CreateCallTypeRequest,
  CreateCallTypeResponse,
  DeleteCallRequest,
  DeleteCallResponse,
  DeleteRecordingResponse,
  DeleteTranscriptionResponse,
  EndCallResponse,
  GetCallResponse,
  GetCallStatsResponse,
  GetCallTypeResponse,
  GetEdgesResponse,
  GetOrCreateCallRequest,
  GetOrCreateCallResponse,
  GoLiveRequest,
  GoLiveResponse,
  ListCallTypeResponse,
  ListRecordingsResponse,
  ListTranscriptionsResponse,
  MuteUsersRequest,
  MuteUsersResponse,
  PinRequest,
  PinResponse,
  QueryCallMembersRequest,
  QueryCallMembersResponse,
  QueryCallStatsRequest,
  QueryCallStatsResponse,
  QueryCallsRequest,
  QueryCallsResponse,
  Response,
  SendCallEventRequest,
  SendCallEventResponse,
  StartHLSBroadcastingResponse,
  StartRTMPBroadcastsRequest,
  StartRTMPBroadcastsResponse,
  StartRecordingRequest,
  StartRecordingResponse,
  StartTranscriptionRequest,
  StartTranscriptionResponse,
  StopAllRTMPBroadcastsResponse,
  StopHLSBroadcastingResponse,
  StopLiveResponse,
  StopRTMPBroadcastsRequest,
  StopRTMPBroadcastsResponse,
  StopRecordingResponse,
  StopTranscriptionResponse,
  UnblockUserRequest,
  UnblockUserResponse,
  UnpinRequest,
  UnpinResponse,
  UpdateCallMembersRequest,
  UpdateCallMembersResponse,
  UpdateCallRequest,
  UpdateCallResponse,
  UpdateCallTypeRequest,
  UpdateCallTypeResponse,
  UpdateUserPermissionsRequest,
  UpdateUserPermissionsResponse,
} from '../models';
import { decoders } from '../model-decoders';

export class VideoApi extends BaseApi {
  queryCallMembers = async (
    request: QueryCallMembersRequest,
  ): Promise<StreamResponse<QueryCallMembersResponse>> => {
    const body = {
      id: request?.id,
      type: request?.type,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryCallMembersResponse>
    >('POST', '/api/v2/video/call/members', undefined, undefined, body);

    decoders.QueryCallMembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryCallStats = async (
    request?: QueryCallStatsRequest,
  ): Promise<StreamResponse<QueryCallStatsResponse>> => {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryCallStatsResponse>
    >('POST', '/api/v2/video/call/stats', undefined, undefined, body);

    decoders.QueryCallStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getCall = async (request: {
    type: string;
    id: string;
    members_limit?: number;
    ring?: boolean;
    notify?: boolean;
    video?: boolean;
  }): Promise<StreamResponse<GetCallResponse>> => {
    const queryParams = {
      members_limit: request?.members_limit,
      ring: request?.ring,
      notify: request?.notify,
      video: request?.video,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<GetCallResponse>>(
      'GET',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      queryParams,
    );

    decoders.GetCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateCall = async (
    request: UpdateCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateCallResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      starts_at: request?.starts_at,
      custom: request?.custom,
      settings_override: request?.settings_override,
    };

    const response = await this.sendRequest<StreamResponse<UpdateCallResponse>>(
      'PATCH',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getOrCreateCall = async (
    request: GetOrCreateCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<GetOrCreateCallResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      members_limit: request?.members_limit,
      notify: request?.notify,
      ring: request?.ring,
      video: request?.video,
      data: request?.data,
    };

    const response = await this.sendRequest<
      StreamResponse<GetOrCreateCallResponse>
    >('POST', '/api/v2/video/call/{type}/{id}', pathParams, undefined, body);

    decoders.GetOrCreateCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  blockUser = async (
    request: BlockUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<BlockUserResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<StreamResponse<BlockUserResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/block',
      pathParams,
      undefined,
      body,
    );

    decoders.BlockUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteCall = async (
    request: DeleteCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<DeleteCallResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      hard: request?.hard,
    };

    const response = await this.sendRequest<StreamResponse<DeleteCallResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/delete',
      pathParams,
      undefined,
      body,
    );

    decoders.DeleteCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  sendCallEvent = async (
    request: SendCallEventRequest & { type: string; id: string },
  ): Promise<StreamResponse<SendCallEventResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<SendCallEventResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/event',
      pathParams,
      undefined,
      body,
    );

    decoders.SendCallEventResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  collectUserFeedback = async (
    request: CollectUserFeedbackRequest & {
      type: string;
      id: string;
      session: string;
    },
  ): Promise<StreamResponse<CollectUserFeedbackResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
    };
    const body = {
      rating: request?.rating,
      sdk: request?.sdk,
      sdk_version: request?.sdk_version,
      user_session_id: request?.user_session_id,
      reason: request?.reason,
      custom: request?.custom,
    };

    const response = await this.sendRequest<
      StreamResponse<CollectUserFeedbackResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/feedback/{session}',
      pathParams,
      undefined,
      body,
    );

    decoders.CollectUserFeedbackResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  goLive = async (
    request: GoLiveRequest & { type: string; id: string },
  ): Promise<StreamResponse<GoLiveResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_storage_name: request?.recording_storage_name,
      start_hls: request?.start_hls,
      start_recording: request?.start_recording,
      start_rtmp_broadcasts: request?.start_rtmp_broadcasts,
      start_transcription: request?.start_transcription,
      transcription_storage_name: request?.transcription_storage_name,
    };

    const response = await this.sendRequest<StreamResponse<GoLiveResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/go_live',
      pathParams,
      undefined,
      body,
    );

    decoders.GoLiveResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  endCall = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<EndCallResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<EndCallResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/mark_ended',
      pathParams,
      undefined,
    );

    decoders.EndCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateCallMembers = async (
    request: UpdateCallMembersRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateCallMembersResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      remove_members: request?.remove_members,
      update_members: request?.update_members,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateCallMembersResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/members',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateCallMembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  muteUsers = async (
    request: MuteUsersRequest & { type: string; id: string },
  ): Promise<StreamResponse<MuteUsersResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      audio: request?.audio,
      mute_all_users: request?.mute_all_users,
      muted_by_id: request?.muted_by_id,
      screenshare: request?.screenshare,
      screenshare_audio: request?.screenshare_audio,
      video: request?.video,
      user_ids: request?.user_ids,
      muted_by: request?.muted_by,
    };

    const response = await this.sendRequest<StreamResponse<MuteUsersResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/mute_users',
      pathParams,
      undefined,
      body,
    );

    decoders.MuteUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  videoPin = async (
    request: PinRequest & { type: string; id: string },
  ): Promise<StreamResponse<PinResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      session_id: request?.session_id,
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<StreamResponse<PinResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/pin',
      pathParams,
      undefined,
      body,
    );

    decoders.PinResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listRecordings = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListRecordingsResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<ListRecordingsResponse>
    >(
      'GET',
      '/api/v2/video/call/{type}/{id}/recordings',
      pathParams,
      undefined,
    );

    decoders.ListRecordingsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  startRTMPBroadcast = async (
    request: StartRTMPBroadcastsRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartRTMPBroadcastsResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      name: request?.name,
      stream_url: request?.stream_url,
      quality: request?.quality,
      stream_key: request?.stream_key,
      layout: request?.layout,
    };

    const response = await this.sendRequest<
      StreamResponse<StartRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts',
      pathParams,
      undefined,
      body,
    );

    decoders.StartRTMPBroadcastsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  stopAllRTMPBroadcasts = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopAllRTMPBroadcastsResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<StopAllRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/stop',
      pathParams,
      undefined,
    );

    decoders.StopAllRTMPBroadcastsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  stopRTMPBroadcast = async (
    request: StopRTMPBroadcastsRequest & {
      type: string;
      id: string;
      name: string;
    },
  ): Promise<StreamResponse<StopRTMPBroadcastsResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      name: request?.name,
    };
    const body = {};

    const response = await this.sendRequest<
      StreamResponse<StopRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/{name}/stop',
      pathParams,
      undefined,
      body,
    );

    decoders.StopRTMPBroadcastsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  startHLSBroadcasting = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StartHLSBroadcastingResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<StartHLSBroadcastingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_broadcasting',
      pathParams,
      undefined,
    );

    decoders.StartHLSBroadcastingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  startRecording = async (
    request: StartRecordingRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartRecordingResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_external_storage: request?.recording_external_storage,
    };

    const response = await this.sendRequest<
      StreamResponse<StartRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_recording',
      pathParams,
      undefined,
      body,
    );

    decoders.StartRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  startTranscription = async (
    request: StartTranscriptionRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartTranscriptionResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      transcription_external_storage: request?.transcription_external_storage,
    };

    const response = await this.sendRequest<
      StreamResponse<StartTranscriptionResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_transcription',
      pathParams,
      undefined,
      body,
    );

    decoders.StartTranscriptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getCallStats = async (request: {
    type: string;
    id: string;
    session: string;
  }): Promise<StreamResponse<GetCallStatsResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
    };

    const response = await this.sendRequest<
      StreamResponse<GetCallStatsResponse>
    >(
      'GET',
      '/api/v2/video/call/{type}/{id}/stats/{session}',
      pathParams,
      undefined,
    );

    decoders.GetCallStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  stopHLSBroadcasting = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopHLSBroadcastingResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<StopHLSBroadcastingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_broadcasting',
      pathParams,
      undefined,
    );

    decoders.StopHLSBroadcastingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  stopLive = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopLiveResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<StopLiveResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_live',
      pathParams,
      undefined,
    );

    decoders.StopLiveResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  stopRecording = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopRecordingResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<StopRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_recording',
      pathParams,
      undefined,
    );

    decoders.StopRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  stopTranscription = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopTranscriptionResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<StopTranscriptionResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_transcription',
      pathParams,
      undefined,
    );

    decoders.StopTranscriptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listTranscriptions = async (request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListTranscriptionsResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<ListTranscriptionsResponse>
    >(
      'GET',
      '/api/v2/video/call/{type}/{id}/transcriptions',
      pathParams,
      undefined,
    );

    decoders.ListTranscriptionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unblockUser = async (
    request: UnblockUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<UnblockUserResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<
      StreamResponse<UnblockUserResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/unblock',
      pathParams,
      undefined,
      body,
    );

    decoders.UnblockUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  videoUnpin = async (
    request: UnpinRequest & { type: string; id: string },
  ): Promise<StreamResponse<UnpinResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      session_id: request?.session_id,
      user_id: request?.user_id,
    };

    const response = await this.sendRequest<StreamResponse<UnpinResponse>>(
      'POST',
      '/api/v2/video/call/{type}/{id}/unpin',
      pathParams,
      undefined,
      body,
    );

    decoders.UnpinResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateUserPermissions = async (
    request: UpdateUserPermissionsRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateUserPermissionsResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      grant_permissions: request?.grant_permissions,
      revoke_permissions: request?.revoke_permissions,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateUserPermissionsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/user_permissions',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateUserPermissionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteRecording = async (request: {
    type: string;
    id: string;
    session: string;
    filename: string;
  }): Promise<StreamResponse<DeleteRecordingResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
      filename: request?.filename,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteRecordingResponse>
    >(
      'DELETE',
      '/api/v2/video/call/{type}/{id}/{session}/recordings/{filename}',
      pathParams,
      undefined,
    );

    decoders.DeleteRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteTranscription = async (request: {
    type: string;
    id: string;
    session: string;
    filename: string;
  }): Promise<StreamResponse<DeleteTranscriptionResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
      filename: request?.filename,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteTranscriptionResponse>
    >(
      'DELETE',
      '/api/v2/video/call/{type}/{id}/{session}/transcriptions/{filename}',
      pathParams,
      undefined,
    );

    decoders.DeleteTranscriptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryCalls = async (
    request?: QueryCallsRequest,
  ): Promise<StreamResponse<QueryCallsResponse>> => {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.sendRequest<StreamResponse<QueryCallsResponse>>(
      'POST',
      '/api/v2/video/calls',
      undefined,
      undefined,
      body,
    );

    decoders.QueryCallsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listCallTypes = async (): Promise<StreamResponse<ListCallTypeResponse>> => {
    const response = await this.sendRequest<
      StreamResponse<ListCallTypeResponse>
    >('GET', '/api/v2/video/calltypes', undefined, undefined);

    decoders.ListCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createCallType = async (
    request: CreateCallTypeRequest,
  ): Promise<StreamResponse<CreateCallTypeResponse>> => {
    const body = {
      name: request?.name,
      external_storage: request?.external_storage,
      grants: request?.grants,
      notification_settings: request?.notification_settings,
      settings: request?.settings,
    };

    const response = await this.sendRequest<
      StreamResponse<CreateCallTypeResponse>
    >('POST', '/api/v2/video/calltypes', undefined, undefined, body);

    decoders.CreateCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteCallType = async (request: {
    name: string;
  }): Promise<StreamResponse<Response>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getCallType = async (request: {
    name: string;
  }): Promise<StreamResponse<GetCallTypeResponse>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<
      StreamResponse<GetCallTypeResponse>
    >('GET', '/api/v2/video/calltypes/{name}', pathParams, undefined);

    decoders.GetCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateCallType = async (
    request: UpdateCallTypeRequest & { name: string },
  ): Promise<StreamResponse<UpdateCallTypeResponse>> => {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      external_storage: request?.external_storage,
      grants: request?.grants,
      notification_settings: request?.notification_settings,
      settings: request?.settings,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateCallTypeResponse>
    >('PUT', '/api/v2/video/calltypes/{name}', pathParams, undefined, body);

    decoders.UpdateCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getEdges = async (): Promise<StreamResponse<GetEdgesResponse>> => {
    const response = await this.sendRequest<StreamResponse<GetEdgesResponse>>(
      'GET',
      '/api/v2/video/edges',
      undefined,
      undefined,
    );

    decoders.GetEdgesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };
}
