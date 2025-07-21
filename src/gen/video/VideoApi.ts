import { ApiClient, StreamResponse } from '../../gen-imports';
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
  GetActiveCallsStatusResponse,
  GetCallReportResponse,
  GetCallResponse,
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
  QueryAggregateCallStatsRequest,
  QueryAggregateCallStatsResponse,
  QueryCallMembersRequest,
  QueryCallMembersResponse,
  QueryCallParticipantsRequest,
  QueryCallParticipantsResponse,
  QueryCallStatsRequest,
  QueryCallStatsResponse,
  QueryCallsRequest,
  QueryCallsResponse,
  QueryUserFeedbackRequest,
  QueryUserFeedbackResponse,
  Response,
  SendCallEventRequest,
  SendCallEventResponse,
  StartClosedCaptionsRequest,
  StartClosedCaptionsResponse,
  StartFrameRecordingRequest,
  StartFrameRecordingResponse,
  StartHLSBroadcastingResponse,
  StartRTMPBroadcastsRequest,
  StartRTMPBroadcastsResponse,
  StartRecordingRequest,
  StartRecordingResponse,
  StartTranscriptionRequest,
  StartTranscriptionResponse,
  StopAllRTMPBroadcastsResponse,
  StopClosedCaptionsRequest,
  StopClosedCaptionsResponse,
  StopFrameRecordingResponse,
  StopHLSBroadcastingResponse,
  StopLiveRequest,
  StopLiveResponse,
  StopRTMPBroadcastsRequest,
  StopRTMPBroadcastsResponse,
  StopRecordingResponse,
  StopTranscriptionRequest,
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
import { decoders } from '../model-decoders/decoders';

export class VideoApi {
  constructor(public readonly apiClient: ApiClient) {}

  async getActiveCallsStatus(): Promise<
    StreamResponse<GetActiveCallsStatusResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetActiveCallsStatusResponse>
    >('GET', '/api/v2/video/active_calls_status', undefined, undefined);

    decoders.GetActiveCallsStatusResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryUserFeedback(
    request?: QueryUserFeedbackRequest & { full?: boolean },
  ): Promise<StreamResponse<QueryUserFeedbackResponse>> {
    const queryParams = {
      full: request?.full,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryUserFeedbackResponse>
    >(
      'POST',
      '/api/v2/video/call/feedback',
      undefined,
      queryParams,
      body,
      'application/json',
    );

    decoders.QueryUserFeedbackResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCallMembers(
    request: QueryCallMembersRequest,
  ): Promise<StreamResponse<QueryCallMembersResponse>> {
    const body = {
      id: request?.id,
      type: request?.type,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallMembersResponse>
    >(
      'POST',
      '/api/v2/video/call/members',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryCallMembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCallStats(
    request?: QueryCallStatsRequest,
  ): Promise<StreamResponse<QueryCallStatsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallStatsResponse>
    >(
      'POST',
      '/api/v2/video/call/stats',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryCallStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCall(request: {
    type: string;
    id: string;
    members_limit?: number;
    ring?: boolean;
    notify?: boolean;
    video?: boolean;
  }): Promise<StreamResponse<GetCallResponse>> {
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCallResponse>
    >('GET', '/api/v2/video/call/{type}/{id}', pathParams, queryParams);

    decoders.GetCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateCall(
    request: UpdateCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      starts_at: request?.starts_at,
      custom: request?.custom,
      settings_override: request?.settings_override,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCallResponse>
    >(
      'PATCH',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getOrCreateCall(
    request: GetOrCreateCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<GetOrCreateCallResponse>> {
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOrCreateCallResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.GetOrCreateCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async blockUser(
    request: BlockUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<BlockUserResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<BlockUserResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/block',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.BlockUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteCall(
    request: DeleteCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<DeleteCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      hard: request?.hard,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteCallResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/delete',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.DeleteCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async sendCallEvent(
    request: SendCallEventRequest & { type: string; id: string },
  ): Promise<StreamResponse<SendCallEventResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SendCallEventResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/event',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.SendCallEventResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async collectUserFeedback(
    request: CollectUserFeedbackRequest & { type: string; id: string },
  ): Promise<StreamResponse<CollectUserFeedbackResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      rating: request?.rating,
      sdk: request?.sdk,
      sdk_version: request?.sdk_version,
      reason: request?.reason,
      user_session_id: request?.user_session_id,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CollectUserFeedbackResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/feedback',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.CollectUserFeedbackResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async goLive(
    request: GoLiveRequest & { type: string; id: string },
  ): Promise<StreamResponse<GoLiveResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_storage_name: request?.recording_storage_name,
      start_closed_caption: request?.start_closed_caption,
      start_hls: request?.start_hls,
      start_recording: request?.start_recording,
      start_transcription: request?.start_transcription,
      transcription_storage_name: request?.transcription_storage_name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GoLiveResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/go_live',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.GoLiveResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async endCall(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<EndCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<EndCallResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/mark_ended',
      pathParams,
      undefined,
    );

    decoders.EndCallResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateCallMembers(
    request: UpdateCallMembersRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateCallMembersResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      remove_members: request?.remove_members,
      update_members: request?.update_members,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCallMembersResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/members',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateCallMembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async muteUsers(
    request: MuteUsersRequest & { type: string; id: string },
  ): Promise<StreamResponse<MuteUsersResponse>> {
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<MuteUsersResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/mute_users',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.MuteUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCallParticipants(
    request: QueryCallParticipantsRequest & {
      id: string;
      type: string;
      limit?: number;
    },
  ): Promise<StreamResponse<QueryCallParticipantsResponse>> {
    const queryParams = {
      limit: request?.limit,
    };
    const pathParams = {
      id: request?.id,
      type: request?.type,
    };
    const body = {
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallParticipantsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/participants',
      pathParams,
      queryParams,
      body,
      'application/json',
    );

    decoders.QueryCallParticipantsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async videoPin(
    request: PinRequest & { type: string; id: string },
  ): Promise<StreamResponse<PinResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      session_id: request?.session_id,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PinResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/pin',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.PinResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listRecordings(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListRecordingsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ListRecordingsResponse>
    >(
      'GET',
      '/api/v2/video/call/{type}/{id}/recordings',
      pathParams,
      undefined,
    );

    decoders.ListRecordingsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCallReport(request: {
    type: string;
    id: string;
    session_id?: string;
  }): Promise<StreamResponse<GetCallReportResponse>> {
    const queryParams = {
      session_id: request?.session_id,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCallReportResponse>
    >('GET', '/api/v2/video/call/{type}/{id}/report', pathParams, queryParams);

    decoders.GetCallReportResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startRTMPBroadcasts(
    request: StartRTMPBroadcastsRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartRTMPBroadcastsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      broadcasts: request?.broadcasts,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StartRTMPBroadcastsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopAllRTMPBroadcasts(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopAllRTMPBroadcastsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopAllRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/stop',
      pathParams,
      undefined,
    );

    decoders.StopAllRTMPBroadcastsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopRTMPBroadcast(
    request: StopRTMPBroadcastsRequest & {
      type: string;
      id: string;
      name: string;
    },
  ): Promise<StreamResponse<StopRTMPBroadcastsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      name: request?.name,
    };
    const body = {};

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopRTMPBroadcastsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/{name}/stop',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StopRTMPBroadcastsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startHLSBroadcasting(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StartHLSBroadcastingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartHLSBroadcastingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_broadcasting',
      pathParams,
      undefined,
    );

    decoders.StartHLSBroadcastingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startClosedCaptions(
    request: StartClosedCaptionsRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartClosedCaptionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      enable_transcription: request?.enable_transcription,
      external_storage: request?.external_storage,
      language: request?.language,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartClosedCaptionsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_closed_captions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StartClosedCaptionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startFrameRecording(
    request: StartFrameRecordingRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartFrameRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_external_storage: request?.recording_external_storage,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartFrameRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_frame_recording',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StartFrameRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startRecording(
    request: StartRecordingRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      recording_external_storage: request?.recording_external_storage,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_recording',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StartRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async startTranscription(
    request: StartTranscriptionRequest & { type: string; id: string },
  ): Promise<StreamResponse<StartTranscriptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      enable_closed_captions: request?.enable_closed_captions,
      language: request?.language,
      transcription_external_storage: request?.transcription_external_storage,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartTranscriptionResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/start_transcription',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StartTranscriptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopHLSBroadcasting(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopHLSBroadcastingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopHLSBroadcastingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_broadcasting',
      pathParams,
      undefined,
    );

    decoders.StopHLSBroadcastingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopClosedCaptions(
    request: StopClosedCaptionsRequest & { type: string; id: string },
  ): Promise<StreamResponse<StopClosedCaptionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      stop_transcription: request?.stop_transcription,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopClosedCaptionsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_closed_captions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StopClosedCaptionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopFrameRecording(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopFrameRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopFrameRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_frame_recording',
      pathParams,
      undefined,
    );

    decoders.StopFrameRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopLive(
    request: StopLiveRequest & { type: string; id: string },
  ): Promise<StreamResponse<StopLiveResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      continue_closed_caption: request?.continue_closed_caption,
      continue_hls: request?.continue_hls,
      continue_recording: request?.continue_recording,
      continue_rtmp_broadcasts: request?.continue_rtmp_broadcasts,
      continue_transcription: request?.continue_transcription,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopLiveResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_live',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StopLiveResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopRecording(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopRecordingResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_recording',
      pathParams,
      undefined,
    );

    decoders.StopRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async stopTranscription(
    request: StopTranscriptionRequest & { type: string; id: string },
  ): Promise<StreamResponse<StopTranscriptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      stop_closed_captions: request?.stop_closed_captions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<StopTranscriptionResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_transcription',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StopTranscriptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listTranscriptions(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListTranscriptionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ListTranscriptionsResponse>
    >(
      'GET',
      '/api/v2/video/call/{type}/{id}/transcriptions',
      pathParams,
      undefined,
    );

    decoders.ListTranscriptionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unblockUser(
    request: UnblockUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<UnblockUserResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnblockUserResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/unblock',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UnblockUserResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async videoUnpin(
    request: UnpinRequest & { type: string; id: string },
  ): Promise<StreamResponse<UnpinResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      session_id: request?.session_id,
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnpinResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/unpin',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UnpinResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateUserPermissions(
    request: UpdateUserPermissionsRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateUserPermissionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      grant_permissions: request?.grant_permissions,
      revoke_permissions: request?.revoke_permissions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateUserPermissionsResponse>
    >(
      'POST',
      '/api/v2/video/call/{type}/{id}/user_permissions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateUserPermissionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteRecording(request: {
    type: string;
    id: string;
    session: string;
    filename: string;
  }): Promise<StreamResponse<DeleteRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
      filename: request?.filename,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteRecordingResponse>
    >(
      'DELETE',
      '/api/v2/video/call/{type}/{id}/{session}/recordings/{filename}',
      pathParams,
      undefined,
    );

    decoders.DeleteRecordingResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteTranscription(request: {
    type: string;
    id: string;
    session: string;
    filename: string;
  }): Promise<StreamResponse<DeleteTranscriptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
      filename: request?.filename,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteTranscriptionResponse>
    >(
      'DELETE',
      '/api/v2/video/call/{type}/{id}/{session}/transcriptions/{filename}',
      pathParams,
      undefined,
    );

    decoders.DeleteTranscriptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCalls(
    request?: QueryCallsRequest,
  ): Promise<StreamResponse<QueryCallsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCallsResponse>
    >(
      'POST',
      '/api/v2/video/calls',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryCallsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listCallTypes(): Promise<StreamResponse<ListCallTypeResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListCallTypeResponse>
    >('GET', '/api/v2/video/calltypes', undefined, undefined);

    decoders.ListCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createCallType(
    request: CreateCallTypeRequest,
  ): Promise<StreamResponse<CreateCallTypeResponse>> {
    const body = {
      name: request?.name,
      external_storage: request?.external_storage,
      grants: request?.grants,
      notification_settings: request?.notification_settings,
      settings: request?.settings,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateCallTypeResponse>
    >(
      'POST',
      '/api/v2/video/calltypes',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteCallType(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCallType(request: {
    name: string;
  }): Promise<StreamResponse<GetCallTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCallTypeResponse>
    >('GET', '/api/v2/video/calltypes/{name}', pathParams, undefined);

    decoders.GetCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateCallType(
    request: UpdateCallTypeRequest & { name: string },
  ): Promise<StreamResponse<UpdateCallTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      external_storage: request?.external_storage,
      grants: request?.grants,
      notification_settings: request?.notification_settings,
      settings: request?.settings,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCallTypeResponse>
    >(
      'PUT',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateCallTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getEdges(): Promise<StreamResponse<GetEdgesResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetEdgesResponse>
    >('GET', '/api/v2/video/edges', undefined, undefined);

    decoders.GetEdgesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryAggregateCallStats(
    request?: QueryAggregateCallStatsRequest,
  ): Promise<StreamResponse<QueryAggregateCallStatsResponse>> {
    const body = {
      from: request?.from,
      to: request?.to,
      report_types: request?.report_types,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryAggregateCallStatsResponse>
    >(
      'POST',
      '/api/v2/video/stats',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryAggregateCallStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}
