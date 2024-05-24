import { VideoApi } from './VideoApi';

export class Call {

    constructor(private videoApi: VideoApi, public readonly type: string, public readonly id: string) {}


    get(, members_limit?: number, ring?: boolean, notify?: boolean): Prmoise<GetCallResponse> {
        return this.videoApi.getCall(this.type, this.id, , ring, notify)
    }

    update(, update_call_request?: UpdateCallRequest): Prmoise<UpdateCallResponse> {
        return this.videoApi.updateCall(this.type, this.id, )
    }

    getOrCreate(, get_or_create_call_request?: GetOrCreateCallRequest): Prmoise<GetOrCreateCallResponse> {
        return this.videoApi.getOrCreateCall(this.type, this.id, )
    }

    blockUser(, block_user_request: BlockUserRequest): Prmoise<BlockUserResponse> {
        return this.videoApi.blockUser(this.type, this.id, )
    }

    sendCallEvent(, send_call_event_request?: SendCallEventRequest): Prmoise<SendCallEventResponse> {
        return this.videoApi.sendCallEvent(this.type, this.id, )
    }

    collectUserFeedback(, session: string, collect_user_feedback_request: CollectUserFeedbackRequest): Prmoise<CollectUserFeedbackResponse> {
        return this.videoApi.collectUserFeedback(this.type, this.id, , collect_user_feedback_request)
    }

    goLive(, go_live_request?: GoLiveRequest): Prmoise<GoLiveResponse> {
        return this.videoApi.goLive(this.type, this.id, )
    }

    end(): Prmoise<EndCallResponse> {
        return this.videoApi.endCall(this.type, this.id)
    }

    updateCallMembers(, update_call_members_request?: UpdateCallMembersRequest): Prmoise<UpdateCallMembersResponse> {
        return this.videoApi.updateCallMembers(this.type, this.id, )
    }

    muteUsers(, mute_users_request?: MuteUsersRequest): Prmoise<MuteUsersResponse> {
        return this.videoApi.muteUsers(this.type, this.id, )
    }

    videoPin(, pin_request: PinRequest): Prmoise<PinResponse> {
        return this.videoApi.videoPin(this.type, this.id, )
    }

    listRecordings(): Prmoise<ListRecordingsResponse> {
        return this.videoApi.listRecordings(this.type, this.id)
    }

    startHLSBroadcasting(): Prmoise<StartHLSBroadcastingResponse> {
        return this.videoApi.startHLSBroadcasting(this.type, this.id)
    }

    startRecording(, start_recording_request?: StartRecordingRequest): Prmoise<StartRecordingResponse> {
        return this.videoApi.startRecording(this.type, this.id, )
    }

    startTranscription(, start_transcription_request?: StartTranscriptionRequest): Prmoise<StartTranscriptionResponse> {
        return this.videoApi.startTranscription(this.type, this.id, )
    }

    getCallStats(, session: string): Prmoise<GetCallStatsResponse> {
        return this.videoApi.getCallStats(this.type, this.id, )
    }

    stopHLSBroadcasting(): Prmoise<StopHLSBroadcastingResponse> {
        return this.videoApi.stopHLSBroadcasting(this.type, this.id)
    }

    stopLive(): Prmoise<StopLiveResponse> {
        return this.videoApi.stopLive(this.type, this.id)
    }

    stopRecording(): Prmoise<StopRecordingResponse> {
        return this.videoApi.stopRecording(this.type, this.id)
    }

    stopTranscription(): Prmoise<StopTranscriptionResponse> {
        return this.videoApi.stopTranscription(this.type, this.id)
    }

    listTranscriptions(): Prmoise<ListTranscriptionsResponse> {
        return this.videoApi.listTranscriptions(this.type, this.id)
    }

    unblockUser(, unblock_user_request: UnblockUserRequest): Prmoise<UnblockUserResponse> {
        return this.videoApi.unblockUser(this.type, this.id, )
    }

    videoUnpin(, unpin_request: UnpinRequest): Prmoise<UnpinResponse> {
        return this.videoApi.videoUnpin(this.type, this.id, )
    }

    updateUserPermissions(, update_user_permissions_request: UpdateUserPermissionsRequest): Prmoise<UpdateUserPermissionsResponse> {
        return this.videoApi.updateUserPermissions(this.type, this.id, )
    }

    deleteRecording(, session: string, filename: string): Prmoise<DeleteRecordingResponse> {
        return this.videoApi.deleteRecording(this.type, this.id, , filename)
    }

    deleteTranscription(, session: string, filename: string): Prmoise<DeleteTranscriptionResponse> {
        return this.videoApi.deleteTranscription(this.type, this.id, , filename)
    }
}