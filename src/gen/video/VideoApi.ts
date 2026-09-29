import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  BlockUserRequest,
  BlockUserResponse,
  CollectUserFeedbackRequest,
  CollectUserFeedbackResponse,
  CreateCallTypeRequest,
  CreateCallTypeResponse,
  CreateSIPTrunkRequest,
  CreateSIPTrunkResponse,
  DeleteCallRequest,
  DeleteCallResponse,
  DeleteRecordingResponse,
  DeleteSIPInboundRoutingRuleResponse,
  DeleteSIPTrunkResponse,
  DeleteTranscriptionResponse,
  EndCallResponse,
  GetActiveCallsStatusResponse,
  GetCallParticipantSessionMetricsResponse,
  GetCallReportResponse,
  GetCallResponse,
  GetCallSessionParticipantStatsDetailsResponse,
  GetCallTypeResponse,
  GetDailyDigestResponse,
  GetEdgesResponse,
  GetOrCreateCallRequest,
  GetOrCreateCallResponse,
  GoLiveRequest,
  GoLiveResponse,
  KickUserRequest,
  KickUserResponse,
  ListCallTypeResponse,
  ListRecordingsResponse,
  ListSIPInboundRoutingRuleResponse,
  ListSIPTrunksResponse,
  ListTranscriptionsResponse,
  MuteUsersRequest,
  MuteUsersResponse,
  PinRequest,
  PinResponse,
  QueryAggregateCallStatsRequest,
  QueryAggregateCallStatsResponse,
  QueryCallMembersRequest,
  QueryCallMembersResponse,
  QueryCallParticipantSessionsResponse,
  QueryCallParticipantsRequest,
  QueryCallParticipantsResponse,
  QueryCallSessionParticipantStatsResponse,
  QueryCallSessionParticipantStatsTimelineResponse,
  QueryCallSessionStatsRequest,
  QueryCallSessionStatsResponse,
  QueryCallStatsMapResponse,
  QueryCallStatsRequest,
  QueryCallStatsResponse,
  QueryCallsRequest,
  QueryCallsResponse,
  QueryUserFeedbackRequest,
  QueryUserFeedbackResponse,
  ReportClientEventRequest,
  ReportClientEventResponse,
  ResolveSipAuthRequest,
  ResolveSipAuthResponse,
  ResolveSipInboundRequest,
  ResolveSipInboundResponse,
  Response,
  RingCallRequest,
  RingCallResponse,
  SIPInboundRoutingRuleRequest,
  SIPInboundRoutingRuleResponse,
  SendCallEventRequest,
  SendCallEventResponse,
  SendClosedCaptionRequest,
  SendClosedCaptionResponse,
  SortParamRequest,
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
  StopRecordingRequest,
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
  UpdateSIPInboundRoutingRuleRequest,
  UpdateSIPInboundRoutingRuleResponse,
  UpdateSIPTrunkRequest,
  UpdateSIPTrunkResponse,
  UpdateUserPermissionsRequest,
  UpdateUserPermissionsResponse,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class VideoApi {
  constructor(public readonly apiClient: ApiClient) {}

  async getActiveCallsStatus(): Promise<
    StreamResponse<GetActiveCallsStatusResponse>
  > {
    const response =
      await this.apiClient.sendRequest<GetActiveCallsStatusResponse>(
        'GET',
        '/api/v2/video/active_calls_status',
        undefined,
        undefined,
      );

    decoders['GetActiveCallsStatusResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<QueryUserFeedbackResponse>(
        'POST',
        '/api/v2/video/call/feedback',
        undefined,
        queryParams,
        body,
      );

    decoders['QueryUserFeedbackResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<QueryCallMembersResponse>(
      'POST',
      '/api/v2/video/call/members',
      undefined,
      undefined,
      body,
    );

    decoders['QueryCallMembersResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<QueryCallStatsResponse>(
      'POST',
      '/api/v2/video/call/stats',
      undefined,
      undefined,
      body,
    );

    decoders['QueryCallStatsResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<GetCallResponse>(
      'GET',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      queryParams,
    );

    decoders['GetCallResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<UpdateCallResponse>(
      'PATCH',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateCallResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<GetOrCreateCallResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['GetOrCreateCallResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<BlockUserResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/block',
      pathParams,
      undefined,
      body,
    );

    decoders['BlockUserResponse']?.(response);

    return response;
  }

  async sendClosedCaption(
    request: SendClosedCaptionRequest & { type: string; id: string },
  ): Promise<StreamResponse<SendClosedCaptionResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      speaker_id: request?.speaker_id,
      text: request?.text,
      end_time: request?.end_time,
      language: request?.language,
      service: request?.service,
      start_time: request?.start_time,
      translated: request?.translated,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<SendClosedCaptionResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/closed_captions',
        pathParams,
        undefined,
        body,
      );

    decoders['SendClosedCaptionResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<DeleteCallResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/delete',
      pathParams,
      undefined,
      body,
    );

    decoders['DeleteCallResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<SendCallEventResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/event',
      pathParams,
      undefined,
      body,
    );

    decoders['SendCallEventResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<CollectUserFeedbackResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/feedback',
        pathParams,
        undefined,
        body,
      );

    decoders['CollectUserFeedbackResponse']?.(response);

    return response;
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
      start_composite_recording: request?.start_composite_recording,
      start_hls: request?.start_hls,
      start_individual_recording: request?.start_individual_recording,
      start_raw_recording: request?.start_raw_recording,
      start_recording: request?.start_recording,
      start_transcription: request?.start_transcription,
      transcription_storage_name: request?.transcription_storage_name,
    };

    const response = await this.apiClient.sendRequest<GoLiveResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/go_live',
      pathParams,
      undefined,
      body,
    );

    decoders['GoLiveResponse']?.(response);

    return response;
  }

  async kickUser(
    request: KickUserRequest & { type: string; id: string },
  ): Promise<StreamResponse<KickUserResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      block: request?.block,
      kicked_by_id: request?.kicked_by_id,
      kicked_by: request?.kicked_by,
    };

    const response = await this.apiClient.sendRequest<KickUserResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/kick',
      pathParams,
      undefined,
      body,
    );

    decoders['KickUserResponse']?.(response);

    return response;
  }

  async endCall(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<EndCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<EndCallResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/mark_ended',
      pathParams,
      undefined,
    );

    decoders['EndCallResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<UpdateCallMembersResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/members',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateCallMembersResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<MuteUsersResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/mute_users',
      pathParams,
      undefined,
      body,
    );

    decoders['MuteUsersResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<QueryCallParticipantsResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/participants',
        pathParams,
        queryParams,
        body,
      );

    decoders['QueryCallParticipantsResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<PinResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/pin',
      pathParams,
      undefined,
      body,
    );

    decoders['PinResponse']?.(response);

    return response;
  }

  async listRecordings(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListRecordingsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<ListRecordingsResponse>(
      'GET',
      '/api/v2/video/call/{type}/{id}/recordings',
      pathParams,
      undefined,
    );

    decoders['ListRecordingsResponse']?.(response);

    return response;
  }

  async startRecording(
    request: StartRecordingRequest & {
      type: string;
      id: string;
      recording_type: string;
    },
  ): Promise<StreamResponse<StartRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      recording_type: request?.recording_type,
    };
    const body = {
      recording_external_storage: request?.recording_external_storage,
    };

    const response = await this.apiClient.sendRequest<StartRecordingResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/recordings/{recording_type}/start',
      pathParams,
      undefined,
      body,
    );

    decoders['StartRecordingResponse']?.(response);

    return response;
  }

  async stopRecording(
    request: StopRecordingRequest & {
      type: string;
      id: string;
      recording_type: string;
    },
  ): Promise<StreamResponse<StopRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
      recording_type: request?.recording_type,
    };
    const body = {};

    const response = await this.apiClient.sendRequest<StopRecordingResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/recordings/{recording_type}/stop',
      pathParams,
      undefined,
      body,
    );

    decoders['StopRecordingResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<GetCallReportResponse>(
      'GET',
      '/api/v2/video/call/{type}/{id}/report',
      pathParams,
      queryParams,
    );

    decoders['GetCallReportResponse']?.(response);

    return response;
  }

  async ringCall(
    request: RingCallRequest & { type: string; id: string },
  ): Promise<StreamResponse<RingCallResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      video: request?.video,
      members_ids: request?.members_ids,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<RingCallResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/ring',
      pathParams,
      undefined,
      body,
    );

    decoders['RingCallResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<StartRTMPBroadcastsResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/rtmp_broadcasts',
        pathParams,
        undefined,
        body,
      );

    decoders['StartRTMPBroadcastsResponse']?.(response);

    return response;
  }

  async stopAllRTMPBroadcasts(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopAllRTMPBroadcastsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<StopAllRTMPBroadcastsResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/stop',
        pathParams,
        undefined,
      );

    decoders['StopAllRTMPBroadcastsResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<StopRTMPBroadcastsResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/rtmp_broadcasts/{name}/stop',
        pathParams,
        undefined,
        body,
      );

    decoders['StopRTMPBroadcastsResponse']?.(response);

    return response;
  }

  async getCallParticipantSessionMetrics(request: {
    type: string;
    id: string;
    session: string;
    user: string;
    user_session: string;
    since?: Date;
    until?: Date;
  }): Promise<StreamResponse<GetCallParticipantSessionMetricsResponse>> {
    const queryParams = {
      since: request?.since,
      until: request?.until,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
      user: request?.user,
      user_session: request?.user_session,
    };

    const response =
      await this.apiClient.sendRequest<GetCallParticipantSessionMetricsResponse>(
        'GET',
        '/api/v2/video/call/{type}/{id}/session/{session}/participant/{user}/{user_session}/details/track',
        pathParams,
        queryParams,
      );

    decoders['GetCallParticipantSessionMetricsResponse']?.(response);

    return response;
  }

  async queryCallParticipantSessions(request: {
    type: string;
    id: string;
    session: string;
    limit?: number;
    prev?: string;
    next?: string;
    filter_conditions?: Record<string, any>;
  }): Promise<StreamResponse<QueryCallParticipantSessionsResponse>> {
    const queryParams = {
      limit: request?.limit,
      prev: request?.prev,
      next: request?.next,
      filter_conditions: request?.filter_conditions,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
      session: request?.session,
    };

    const response =
      await this.apiClient.sendRequest<QueryCallParticipantSessionsResponse>(
        'GET',
        '/api/v2/video/call/{type}/{id}/session/{session}/participant_sessions',
        pathParams,
        queryParams,
      );

    decoders['QueryCallParticipantSessionsResponse']?.(response);

    return response;
  }

  async startHLSBroadcasting(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StartHLSBroadcastingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<StartHLSBroadcastingResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/start_broadcasting',
        pathParams,
        undefined,
      );

    decoders['StartHLSBroadcastingResponse']?.(response);

    return response;
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
      speech_segment_config: request?.speech_segment_config,
    };

    const response =
      await this.apiClient.sendRequest<StartClosedCaptionsResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/start_closed_captions',
        pathParams,
        undefined,
        body,
      );

    decoders['StartClosedCaptionsResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<StartFrameRecordingResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/start_frame_recording',
        pathParams,
        undefined,
        body,
      );

    decoders['StartFrameRecordingResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<StartTranscriptionResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/start_transcription',
        pathParams,
        undefined,
        body,
      );

    decoders['StartTranscriptionResponse']?.(response);

    return response;
  }

  async stopHLSBroadcasting(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopHLSBroadcastingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<StopHLSBroadcastingResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/stop_broadcasting',
        pathParams,
        undefined,
      );

    decoders['StopHLSBroadcastingResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<StopClosedCaptionsResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/stop_closed_captions',
        pathParams,
        undefined,
        body,
      );

    decoders['StopClosedCaptionsResponse']?.(response);

    return response;
  }

  async stopFrameRecording(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<StopFrameRecordingResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<StopFrameRecordingResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/stop_frame_recording',
        pathParams,
        undefined,
      );

    decoders['StopFrameRecordingResponse']?.(response);

    return response;
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
      continue_composite_recording: request?.continue_composite_recording,
      continue_hls: request?.continue_hls,
      continue_individual_recording: request?.continue_individual_recording,
      continue_raw_recording: request?.continue_raw_recording,
      continue_recording: request?.continue_recording,
      continue_rtmp_broadcasts: request?.continue_rtmp_broadcasts,
      continue_transcription: request?.continue_transcription,
    };

    const response = await this.apiClient.sendRequest<StopLiveResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/stop_live',
      pathParams,
      undefined,
      body,
    );

    decoders['StopLiveResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<StopTranscriptionResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/stop_transcription',
        pathParams,
        undefined,
        body,
      );

    decoders['StopTranscriptionResponse']?.(response);

    return response;
  }

  async listTranscriptions(request: {
    type: string;
    id: string;
  }): Promise<StreamResponse<ListTranscriptionsResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<ListTranscriptionsResponse>(
        'GET',
        '/api/v2/video/call/{type}/{id}/transcriptions',
        pathParams,
        undefined,
      );

    decoders['ListTranscriptionsResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<UnblockUserResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/unblock',
      pathParams,
      undefined,
      body,
    );

    decoders['UnblockUserResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<UnpinResponse>(
      'POST',
      '/api/v2/video/call/{type}/{id}/unpin',
      pathParams,
      undefined,
      body,
    );

    decoders['UnpinResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<UpdateUserPermissionsResponse>(
        'POST',
        '/api/v2/video/call/{type}/{id}/user_permissions',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateUserPermissionsResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<DeleteRecordingResponse>(
      'DELETE',
      '/api/v2/video/call/{type}/{id}/{session}/recordings/{filename}',
      pathParams,
      undefined,
    );

    decoders['DeleteRecordingResponse']?.(response);

    return response;
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

    const response =
      await this.apiClient.sendRequest<DeleteTranscriptionResponse>(
        'DELETE',
        '/api/v2/video/call/{type}/{id}/{session}/transcriptions/{filename}',
        pathParams,
        undefined,
      );

    decoders['DeleteTranscriptionResponse']?.(response);

    return response;
  }

  async reportClientCallEvent(
    request: ReportClientEventRequest,
  ): Promise<StreamResponse<ReportClientEventResponse>> {
    const body = {
      events: request?.events,
    };

    const response =
      await this.apiClient.sendRequest<ReportClientEventResponse>(
        'POST',
        '/api/v2/video/call_client_event',
        undefined,
        undefined,
        body,
      );

    decoders['ReportClientEventResponse']?.(response);

    return response;
  }

  async queryCallSessionStats(
    request?: QueryCallSessionStatsRequest,
  ): Promise<StreamResponse<QueryCallSessionStatsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response =
      await this.apiClient.sendRequest<QueryCallSessionStatsResponse>(
        'POST',
        '/api/v2/video/call_stats',
        undefined,
        undefined,
        body,
      );

    decoders['QueryCallSessionStatsResponse']?.(response);

    return response;
  }

  async getCallStatsMap(request: {
    call_type: string;
    call_id: string;
    session: string;
    start_time?: Date;
    end_time?: Date;
    exclude_publishers?: boolean;
    exclude_subscribers?: boolean;
    exclude_sfus?: boolean;
  }): Promise<StreamResponse<QueryCallStatsMapResponse>> {
    const queryParams = {
      start_time: request?.start_time,
      end_time: request?.end_time,
      exclude_publishers: request?.exclude_publishers,
      exclude_subscribers: request?.exclude_subscribers,
      exclude_sfus: request?.exclude_sfus,
    };
    const pathParams = {
      call_type: request?.call_type,
      call_id: request?.call_id,
      session: request?.session,
    };

    const response =
      await this.apiClient.sendRequest<QueryCallStatsMapResponse>(
        'GET',
        '/api/v2/video/call_stats/{call_type}/{call_id}/{session}/map',
        pathParams,
        queryParams,
      );

    decoders['QueryCallStatsMapResponse']?.(response);

    return response;
  }

  async getCallSessionParticipantStatsDetails(request: {
    call_type: string;
    call_id: string;
    session: string;
    user: string;
    user_session: string;
    since?: string;
    until?: string;
    max_points?: number;
  }): Promise<StreamResponse<GetCallSessionParticipantStatsDetailsResponse>> {
    const queryParams = {
      since: request?.since,
      until: request?.until,
      max_points: request?.max_points,
    };
    const pathParams = {
      call_type: request?.call_type,
      call_id: request?.call_id,
      session: request?.session,
      user: request?.user,
      user_session: request?.user_session,
    };

    const response =
      await this.apiClient.sendRequest<GetCallSessionParticipantStatsDetailsResponse>(
        'GET',
        '/api/v2/video/call_stats/{call_type}/{call_id}/{session}/participant/{user}/{user_session}/details',
        pathParams,
        queryParams,
      );

    decoders['GetCallSessionParticipantStatsDetailsResponse']?.(response);

    return response;
  }

  async queryCallSessionParticipantStats(request: {
    call_type: string;
    call_id: string;
    session: string;
    limit?: number;
    prev?: string;
    next?: string;
    sort?: Array<SortParamRequest>;
    filter_conditions?: Record<string, any>;
  }): Promise<StreamResponse<QueryCallSessionParticipantStatsResponse>> {
    const queryParams = {
      limit: request?.limit,
      prev: request?.prev,
      next: request?.next,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };
    const pathParams = {
      call_type: request?.call_type,
      call_id: request?.call_id,
      session: request?.session,
    };

    const response =
      await this.apiClient.sendRequest<QueryCallSessionParticipantStatsResponse>(
        'GET',
        '/api/v2/video/call_stats/{call_type}/{call_id}/{session}/participants',
        pathParams,
        queryParams,
      );

    decoders['QueryCallSessionParticipantStatsResponse']?.(response);

    return response;
  }

  async getCallSessionParticipantStatsTimeline(request: {
    call_type: string;
    call_id: string;
    session: string;
    user: string;
    user_session: string;
    start_time?: string;
    end_time?: string;
    severity?: Array<string>;
  }): Promise<
    StreamResponse<QueryCallSessionParticipantStatsTimelineResponse>
  > {
    const queryParams = {
      start_time: request?.start_time,
      end_time: request?.end_time,
      severity: request?.severity,
    };
    const pathParams = {
      call_type: request?.call_type,
      call_id: request?.call_id,
      session: request?.session,
      user: request?.user,
      user_session: request?.user_session,
    };

    const response =
      await this.apiClient.sendRequest<QueryCallSessionParticipantStatsTimelineResponse>(
        'GET',
        '/api/v2/video/call_stats/{call_type}/{call_id}/{session}/participants/{user}/{user_session}/timeline',
        pathParams,
        queryParams,
      );

    decoders['QueryCallSessionParticipantStatsTimelineResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<QueryCallsResponse>(
      'POST',
      '/api/v2/video/calls',
      undefined,
      undefined,
      body,
    );

    decoders['QueryCallsResponse']?.(response);

    return response;
  }

  async listCallTypes(): Promise<StreamResponse<ListCallTypeResponse>> {
    const response = await this.apiClient.sendRequest<ListCallTypeResponse>(
      'GET',
      '/api/v2/video/calltypes',
      undefined,
      undefined,
    );

    decoders['ListCallTypeResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<CreateCallTypeResponse>(
      'POST',
      '/api/v2/video/calltypes',
      undefined,
      undefined,
      body,
    );

    decoders['CreateCallTypeResponse']?.(response);

    return response;
  }

  async deleteCallType(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getCallType(request: {
    name: string;
  }): Promise<StreamResponse<GetCallTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<GetCallTypeResponse>(
      'GET',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
    );

    decoders['GetCallTypeResponse']?.(response);

    return response;
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

    const response = await this.apiClient.sendRequest<UpdateCallTypeResponse>(
      'PUT',
      '/api/v2/video/calltypes/{name}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateCallTypeResponse']?.(response);

    return response;
  }

  async getEdges(): Promise<StreamResponse<GetEdgesResponse>> {
    const response = await this.apiClient.sendRequest<GetEdgesResponse>(
      'GET',
      '/api/v2/video/edges',
      undefined,
      undefined,
    );

    decoders['GetEdgesResponse']?.(response);

    return response;
  }

  async resolveSipAuth(
    request: ResolveSipAuthRequest,
  ): Promise<StreamResponse<ResolveSipAuthResponse>> {
    const body = {
      sip_caller_number: request?.sip_caller_number,
      sip_trunk_number: request?.sip_trunk_number,
      from_host: request?.from_host,
      source_ip: request?.source_ip,
    };

    const response = await this.apiClient.sendRequest<ResolveSipAuthResponse>(
      'POST',
      '/api/v2/video/sip/auth',
      undefined,
      undefined,
      body,
    );

    decoders['ResolveSipAuthResponse']?.(response);

    return response;
  }

  async listSIPInboundRoutingRule(): Promise<
    StreamResponse<ListSIPInboundRoutingRuleResponse>
  > {
    const response =
      await this.apiClient.sendRequest<ListSIPInboundRoutingRuleResponse>(
        'GET',
        '/api/v2/video/sip/inbound_routing_rules',
        undefined,
        undefined,
      );

    decoders['ListSIPInboundRoutingRuleResponse']?.(response);

    return response;
  }

  async createSIPInboundRoutingRule(
    request: SIPInboundRoutingRuleRequest,
  ): Promise<StreamResponse<SIPInboundRoutingRuleResponse>> {
    const body = {
      name: request?.name,
      trunk_ids: request?.trunk_ids,
      caller_configs: request?.caller_configs,
      called_numbers: request?.called_numbers,
      caller_numbers: request?.caller_numbers,
      call_configs: request?.call_configs,
      direct_routing_configs: request?.direct_routing_configs,
      pin_protection_configs: request?.pin_protection_configs,
      pin_routing_configs: request?.pin_routing_configs,
    };

    const response =
      await this.apiClient.sendRequest<SIPInboundRoutingRuleResponse>(
        'POST',
        '/api/v2/video/sip/inbound_routing_rules',
        undefined,
        undefined,
        body,
      );

    decoders['SIPInboundRoutingRuleResponse']?.(response);

    return response;
  }

  async deleteSIPInboundRoutingRule(request: {
    id: string;
  }): Promise<StreamResponse<DeleteSIPInboundRoutingRuleResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<DeleteSIPInboundRoutingRuleResponse>(
        'DELETE',
        '/api/v2/video/sip/inbound_routing_rules/{id}',
        pathParams,
        undefined,
      );

    decoders['DeleteSIPInboundRoutingRuleResponse']?.(response);

    return response;
  }

  async updateSIPInboundRoutingRule(
    request: UpdateSIPInboundRoutingRuleRequest & { id: string },
  ): Promise<StreamResponse<UpdateSIPInboundRoutingRuleResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      name: request?.name,
      trunk_ids: request?.trunk_ids,
      caller_configs: request?.caller_configs,
      called_numbers: request?.called_numbers,
      caller_numbers: request?.caller_numbers,
      call_configs: request?.call_configs,
      direct_routing_configs: request?.direct_routing_configs,
      pin_protection_configs: request?.pin_protection_configs,
      pin_routing_configs: request?.pin_routing_configs,
    };

    const response =
      await this.apiClient.sendRequest<UpdateSIPInboundRoutingRuleResponse>(
        'PUT',
        '/api/v2/video/sip/inbound_routing_rules/{id}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateSIPInboundRoutingRuleResponse']?.(response);

    return response;
  }

  async listSIPTrunks(): Promise<StreamResponse<ListSIPTrunksResponse>> {
    const response = await this.apiClient.sendRequest<ListSIPTrunksResponse>(
      'GET',
      '/api/v2/video/sip/inbound_trunks',
      undefined,
      undefined,
    );

    decoders['ListSIPTrunksResponse']?.(response);

    return response;
  }

  async createSIPTrunk(
    request: CreateSIPTrunkRequest,
  ): Promise<StreamResponse<CreateSIPTrunkResponse>> {
    const body = {
      name: request?.name,
      numbers: request?.numbers,
      password: request?.password,
      allowed_ips: request?.allowed_ips,
    };

    const response = await this.apiClient.sendRequest<CreateSIPTrunkResponse>(
      'POST',
      '/api/v2/video/sip/inbound_trunks',
      undefined,
      undefined,
      body,
    );

    decoders['CreateSIPTrunkResponse']?.(response);

    return response;
  }

  async deleteSIPTrunk(request: {
    id: string;
  }): Promise<StreamResponse<DeleteSIPTrunkResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteSIPTrunkResponse>(
      'DELETE',
      '/api/v2/video/sip/inbound_trunks/{id}',
      pathParams,
      undefined,
    );

    decoders['DeleteSIPTrunkResponse']?.(response);

    return response;
  }

  async updateSIPTrunk(
    request: UpdateSIPTrunkRequest & { id: string },
  ): Promise<StreamResponse<UpdateSIPTrunkResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      name: request?.name,
      numbers: request?.numbers,
      password: request?.password,
      allowed_ips: request?.allowed_ips,
    };

    const response = await this.apiClient.sendRequest<UpdateSIPTrunkResponse>(
      'PUT',
      '/api/v2/video/sip/inbound_trunks/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateSIPTrunkResponse']?.(response);

    return response;
  }

  async resolveSipInbound(
    request: ResolveSipInboundRequest,
  ): Promise<StreamResponse<ResolveSipInboundResponse>> {
    const body = {
      sip_caller_number: request?.sip_caller_number,
      sip_trunk_number: request?.sip_trunk_number,
      routing_number: request?.routing_number,
      trunk_id: request?.trunk_id,
      challenge: request?.challenge,
      sip_headers: request?.sip_headers,
    };

    const response =
      await this.apiClient.sendRequest<ResolveSipInboundResponse>(
        'POST',
        '/api/v2/video/sip/resolve',
        undefined,
        undefined,
        body,
      );

    decoders['ResolveSipInboundResponse']?.(response);

    return response;
  }

  async queryAggregateCallStats(
    request?: QueryAggregateCallStatsRequest,
  ): Promise<StreamResponse<QueryAggregateCallStatsResponse>> {
    const body = {
      from: request?.from,
      to: request?.to,
      report_types: request?.report_types,
    };

    const response =
      await this.apiClient.sendRequest<QueryAggregateCallStatsResponse>(
        'POST',
        '/api/v2/video/stats',
        undefined,
        undefined,
        body,
      );

    decoders['QueryAggregateCallStatsResponse']?.(response);

    return response;
  }

  async getDailyDigest(request?: {
    date?: string;
    target_app_id?: string;
  }): Promise<StreamResponse<GetDailyDigestResponse>> {
    const queryParams = {
      date: request?.date,
      target_app_id: request?.target_app_id,
    };

    const response = await this.apiClient.sendRequest<GetDailyDigestResponse>(
      'GET',
      '/api/v2/video/stats/daily_digest',
      undefined,
      queryParams,
    );

    decoders['GetDailyDigestResponse']?.(response);

    return response;
  }
}
