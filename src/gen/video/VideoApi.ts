import { BaseApi } from '../../BaseApi';
import { ApiConfig } from '../../types';
import {
    // TODO: remove duplicates from import
    
    QueryCallMembersResponse,QueryCallMembersRequest,
    QueryCallStatsResponse,QueryCallStatsRequest,
    GetCallResponse,
    UpdateCallResponse,UpdateCallRequest,
    GetOrCreateCallResponse,GetOrCreateCallRequest,
    BlockUserResponse,BlockUserRequest,
    SendCallEventResponse,SendCallEventRequest,
    CollectUserFeedbackResponse,CollectUserFeedbackRequest,
    GoLiveResponse,GoLiveRequest,
    EndCallResponse,
    UpdateCallMembersResponse,UpdateCallMembersRequest,
    MuteUsersResponse,MuteUsersRequest,
    PinResponse,PinRequest,
    ListRecordingsResponse,
    StartHLSBroadcastingResponse,
    StartRecordingResponse,StartRecordingRequest,
    StartTranscriptionResponse,StartTranscriptionRequest,
    GetCallStatsResponse,
    StopHLSBroadcastingResponse,
    StopLiveResponse,
    StopRecordingResponse,
    StopTranscriptionResponse,
    ListTranscriptionsResponse,
    UnblockUserResponse,UnblockUserRequest,
    UnpinResponse,UnpinRequest,
    UpdateUserPermissionsResponse,UpdateUserPermissionsRequest,
    DeleteRecordingResponse,
    DeleteTranscriptionResponse,
    QueryCallsResponse,QueryCallsRequest,
    ListCallTypeResponse,
    CreateCallTypeResponse,CreateCallTypeRequest,
    Response,
    GetCallTypeResponse,
    UpdateCallTypeResponse,UpdateCallTypeRequest,
    GetEdgesResponse,} from '../models';

export class VideoApi extends BaseApi {

    constructor(apiConfig: ApiConfig) {
      super(apiConfig);
    }

    
    queryCallMembers(query_call_members_request: QueryCallMembersRequest): Promise<QueryCallMembersResponse> {
        const body = query_call_members_request;
        

        return this.sendRequest<QueryCallMembersResponse>('POST', '/api/v2/video/call/members',  undefined ,  undefined  , body);
}
    
    queryCallStats(query_call_stats_request?: QueryCallStatsRequest): Promise<QueryCallStatsResponse> {
        const body = query_call_stats_request;
        

        return this.sendRequest<QueryCallStatsResponse>('POST', '/api/v2/video/call/stats',  undefined ,  undefined  , body);
}
    
    getCall(type: string, id: string, members_limit?: number, ring?: boolean, notify?: boolean): Promise<GetCallResponse> {
        const queryParams = {
          members_limit: members_limit, ring: ring, notify: notify,
        };
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<GetCallResponse>('GET', '/api/v2/video/call/{type}/{id}', pathParams , queryParams  );
}
    
    updateCall(type: string, id: string, update_call_request?: UpdateCallRequest): Promise<UpdateCallResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = update_call_request;
        

        return this.sendRequest<UpdateCallResponse>('PATCH', '/api/v2/video/call/{type}/{id}', pathParams ,  undefined  , body);
}
    
    getOrCreateCall(type: string, id: string, get_or_create_call_request?: GetOrCreateCallRequest): Promise<GetOrCreateCallResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = get_or_create_call_request;
        

        return this.sendRequest<GetOrCreateCallResponse>('POST', '/api/v2/video/call/{type}/{id}', pathParams ,  undefined  , body);
}
    
    blockUser(type: string, id: string, block_user_request: BlockUserRequest): Promise<BlockUserResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = block_user_request;
        

        return this.sendRequest<BlockUserResponse>('POST', '/api/v2/video/call/{type}/{id}/block', pathParams ,  undefined  , body);
}
    
    sendCallEvent(type: string, id: string, send_call_event_request?: SendCallEventRequest): Promise<SendCallEventResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = send_call_event_request;
        

        return this.sendRequest<SendCallEventResponse>('POST', '/api/v2/video/call/{type}/{id}/event', pathParams ,  undefined  , body);
}
    
    collectUserFeedback(type: string, id: string, session: string, collect_user_feedback_request: CollectUserFeedbackRequest): Promise<CollectUserFeedbackResponse> {
        const pathParams = {
          type: type, id: id, session: session,
        };
        const body = collect_user_feedback_request;
        

        return this.sendRequest<CollectUserFeedbackResponse>('POST', '/api/v2/video/call/{type}/{id}/feedback/{session}', pathParams ,  undefined  , body);
}
    
    goLive(type: string, id: string, go_live_request?: GoLiveRequest): Promise<GoLiveResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = go_live_request;
        

        return this.sendRequest<GoLiveResponse>('POST', '/api/v2/video/call/{type}/{id}/go_live', pathParams ,  undefined  , body);
}
    
    endCall(type: string, id: string): Promise<EndCallResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<EndCallResponse>('POST', '/api/v2/video/call/{type}/{id}/mark_ended', pathParams ,  undefined  );
}
    
    updateCallMembers(type: string, id: string, update_call_members_request?: UpdateCallMembersRequest): Promise<UpdateCallMembersResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = update_call_members_request;
        

        return this.sendRequest<UpdateCallMembersResponse>('POST', '/api/v2/video/call/{type}/{id}/members', pathParams ,  undefined  , body);
}
    
    muteUsers(type: string, id: string, mute_users_request?: MuteUsersRequest): Promise<MuteUsersResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = mute_users_request;
        

        return this.sendRequest<MuteUsersResponse>('POST', '/api/v2/video/call/{type}/{id}/mute_users', pathParams ,  undefined  , body);
}
    
    videoPin(type: string, id: string, pin_request: PinRequest): Promise<PinResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = pin_request;
        

        return this.sendRequest<PinResponse>('POST', '/api/v2/video/call/{type}/{id}/pin', pathParams ,  undefined  , body);
}
    
    listRecordings(type: string, id: string): Promise<ListRecordingsResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<ListRecordingsResponse>('GET', '/api/v2/video/call/{type}/{id}/recordings', pathParams ,  undefined  );
}
    
    startHLSBroadcasting(type: string, id: string): Promise<StartHLSBroadcastingResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<StartHLSBroadcastingResponse>('POST', '/api/v2/video/call/{type}/{id}/start_broadcasting', pathParams ,  undefined  );
}
    
    startRecording(type: string, id: string, start_recording_request?: StartRecordingRequest): Promise<StartRecordingResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = start_recording_request;
        

        return this.sendRequest<StartRecordingResponse>('POST', '/api/v2/video/call/{type}/{id}/start_recording', pathParams ,  undefined  , body);
}
    
    startTranscription(type: string, id: string, start_transcription_request?: StartTranscriptionRequest): Promise<StartTranscriptionResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = start_transcription_request;
        

        return this.sendRequest<StartTranscriptionResponse>('POST', '/api/v2/video/call/{type}/{id}/start_transcription', pathParams ,  undefined  , body);
}
    
    getCallStats(type: string, id: string, session: string): Promise<GetCallStatsResponse> {
        const pathParams = {
          type: type, id: id, session: session,
        };
        

        return this.sendRequest<GetCallStatsResponse>('GET', '/api/v2/video/call/{type}/{id}/stats/{session}', pathParams ,  undefined  );
}
    
    stopHLSBroadcasting(type: string, id: string): Promise<StopHLSBroadcastingResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<StopHLSBroadcastingResponse>('POST', '/api/v2/video/call/{type}/{id}/stop_broadcasting', pathParams ,  undefined  );
}
    
    stopLive(type: string, id: string): Promise<StopLiveResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<StopLiveResponse>('POST', '/api/v2/video/call/{type}/{id}/stop_live', pathParams ,  undefined  );
}
    
    stopRecording(type: string, id: string): Promise<StopRecordingResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<StopRecordingResponse>('POST', '/api/v2/video/call/{type}/{id}/stop_recording', pathParams ,  undefined  );
}
    
    stopTranscription(type: string, id: string): Promise<StopTranscriptionResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<StopTranscriptionResponse>('POST', '/api/v2/video/call/{type}/{id}/stop_transcription', pathParams ,  undefined  );
}
    
    listTranscriptions(type: string, id: string): Promise<ListTranscriptionsResponse> {
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<ListTranscriptionsResponse>('GET', '/api/v2/video/call/{type}/{id}/transcriptions', pathParams ,  undefined  );
}
    
    unblockUser(type: string, id: string, unblock_user_request: UnblockUserRequest): Promise<UnblockUserResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = unblock_user_request;
        

        return this.sendRequest<UnblockUserResponse>('POST', '/api/v2/video/call/{type}/{id}/unblock', pathParams ,  undefined  , body);
}
    
    videoUnpin(type: string, id: string, unpin_request: UnpinRequest): Promise<UnpinResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = unpin_request;
        

        return this.sendRequest<UnpinResponse>('POST', '/api/v2/video/call/{type}/{id}/unpin', pathParams ,  undefined  , body);
}
    
    updateUserPermissions(type: string, id: string, update_user_permissions_request: UpdateUserPermissionsRequest): Promise<UpdateUserPermissionsResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = update_user_permissions_request;
        

        return this.sendRequest<UpdateUserPermissionsResponse>('POST', '/api/v2/video/call/{type}/{id}/user_permissions', pathParams ,  undefined  , body);
}
    
    deleteRecording(type: string, id: string, session: string, filename: string): Promise<DeleteRecordingResponse> {
        const pathParams = {
          type: type, id: id, session: session, filename: filename,
        };
        

        return this.sendRequest<DeleteRecordingResponse>('DELETE', '/api/v2/video/call/{type}/{id}/{session}/recordings/{filename}', pathParams ,  undefined  );
}
    
    deleteTranscription(type: string, id: string, session: string, filename: string): Promise<DeleteTranscriptionResponse> {
        const pathParams = {
          type: type, id: id, session: session, filename: filename,
        };
        

        return this.sendRequest<DeleteTranscriptionResponse>('DELETE', '/api/v2/video/call/{type}/{id}/{session}/transcriptions/{filename}', pathParams ,  undefined  );
}
    
    queryCalls(query_calls_request?: QueryCallsRequest): Promise<QueryCallsResponse> {
        const body = query_calls_request;
        

        return this.sendRequest<QueryCallsResponse>('POST', '/api/v2/video/calls',  undefined ,  undefined  , body);
}
    
    listCallTypes(): Promise<ListCallTypeResponse> {
        

        return this.sendRequest<ListCallTypeResponse>('GET', '/api/v2/video/calltypes',  undefined ,  undefined  );
}
    
    createCallType(create_call_type_request: CreateCallTypeRequest): Promise<CreateCallTypeResponse> {
        const body = create_call_type_request;
        

        return this.sendRequest<CreateCallTypeResponse>('POST', '/api/v2/video/calltypes',  undefined ,  undefined  , body);
}
    
    deleteCallType(name: string): Promise<Response> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/video/calltypes/{name}', pathParams ,  undefined  );
}
    
    getCallType(name: string): Promise<GetCallTypeResponse> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<GetCallTypeResponse>('GET', '/api/v2/video/calltypes/{name}', pathParams ,  undefined  );
}
    
    updateCallType(name: string, update_call_type_request?: UpdateCallTypeRequest): Promise<UpdateCallTypeResponse> {
        const pathParams = {
          name: name,
        };
        const body = update_call_type_request;
        

        return this.sendRequest<UpdateCallTypeResponse>('PUT', '/api/v2/video/calltypes/{name}', pathParams ,  undefined  , body);
}
    
    getEdges(): Promise<GetEdgesResponse> {
        

        return this.sendRequest<GetEdgesResponse>('GET', '/api/v2/video/edges',  undefined ,  undefined  );
}
    }