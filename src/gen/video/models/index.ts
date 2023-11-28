/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface VideoAPIError
 */
export interface VideoAPIError {
    /**
     * Response HTTP status code
     * @type {number}
     * @memberof VideoAPIError
     */
    StatusCode: number;
    /**
     * API error code
     * @type {number}
     * @memberof VideoAPIError
     */
    code: number;
    /**
     * Additional error-specific information
     * @type {Array<number>}
     * @memberof VideoAPIError
     */
    details: Array<number>;
    /**
     * Request duration
     * @type {string}
     * @memberof VideoAPIError
     */
    duration: string;
    /**
     * Additional error info
     * @type {{ [key: string]: string; }}
     * @memberof VideoAPIError
     */
    exception_fields?: { [key: string]: string; };
    /**
     * Message describing an error
     * @type {string}
     * @memberof VideoAPIError
     */
    message: string;
    /**
     * URL with additional information
     * @type {string}
     * @memberof VideoAPIError
     */
    more_info: string;
}
/**
 * 
 * @export
 * @interface VideoAPNS
 */
export interface VideoAPNS {
    /**
     * 
     * @type {string}
     * @memberof VideoAPNS
     */
    body: string;
    /**
     * 
     * @type {string}
     * @memberof VideoAPNS
     */
    title: string;
}
/**
 * 
 * @export
 * @interface VideoAPNSRequest
 */
export interface VideoAPNSRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoAPNSRequest
     */
    body?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoAPNSRequest
     */
    title?: string;
}
/**
 * 
 * @export
 * @interface VideoAudioSettings
 */
export interface VideoAudioSettings {
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettings
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoAudioSettings
     */
    default_device: VideoAudioSettingsDefaultDeviceEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettings
     */
    mic_default_on: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettings
     */
    opus_dtx_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettings
     */
    redundant_coding_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettings
     */
    speaker_default_on: boolean;
}


/**
 * @export
 */
export const VideoAudioSettingsDefaultDeviceEnum = {
    SPEAKER: 'speaker',
    EARPIECE: 'earpiece'
} as const;
export type VideoAudioSettingsDefaultDeviceEnum = typeof VideoAudioSettingsDefaultDeviceEnum[keyof typeof VideoAudioSettingsDefaultDeviceEnum];

/**
 * 
 * @export
 * @interface VideoAudioSettingsRequest
 */
export interface VideoAudioSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsRequest
     */
    access_request_enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoAudioSettingsRequest
     */
    default_device: VideoAudioSettingsRequestDefaultDeviceEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsRequest
     */
    mic_default_on?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsRequest
     */
    opus_dtx_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsRequest
     */
    redundant_coding_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsRequest
     */
    speaker_default_on?: boolean;
}


/**
 * @export
 */
export const VideoAudioSettingsRequestDefaultDeviceEnum = {
    SPEAKER: 'speaker',
    EARPIECE: 'earpiece'
} as const;
export type VideoAudioSettingsRequestDefaultDeviceEnum = typeof VideoAudioSettingsRequestDefaultDeviceEnum[keyof typeof VideoAudioSettingsRequestDefaultDeviceEnum];

/**
 * 
 * @export
 * @interface VideoBackstageSettings
 */
export interface VideoBackstageSettings {
    /**
     * 
     * @type {boolean}
     * @memberof VideoBackstageSettings
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface VideoBackstageSettingsRequest
 */
export interface VideoBackstageSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoBackstageSettingsRequest
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface VideoBlockUserRequest
 */
export interface VideoBlockUserRequest {
    /**
     * the user to block
     * @type {string}
     * @memberof VideoBlockUserRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface VideoBlockUserResponse
 */
export interface VideoBlockUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoBlockUserResponse
     */
    duration: string;
}
/**
 * This event is sent to call participants to notify when a user is blocked on a call, clients can use this event to show a notification. 
 * If the user is the current user, the client should leave the call screen as well
 * @export
 * @interface VideoBlockedUserEvent
 */
export interface VideoBlockedUserEvent {
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoBlockedUserEvent
     */
    blocked_by_user?: VideoUserResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoBlockedUserEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoBlockedUserEvent
     */
    created_at: string;
    /**
     * The type of event: "call.blocked_user" in this case
     * @type {string}
     * @memberof VideoBlockedUserEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoBlockedUserEvent
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoBroadcastSettingsRequest
 */
export interface VideoBroadcastSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoBroadcastSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {VideoHLSSettingsRequest}
     * @memberof VideoBroadcastSettingsRequest
     */
    hls?: VideoHLSSettingsRequest;
}
/**
 * 
 * @export
 * @interface VideoBroadcastSettingsResponse
 */
export interface VideoBroadcastSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoBroadcastSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {VideoHLSSettingsResponse}
     * @memberof VideoBroadcastSettingsResponse
     */
    hls: VideoHLSSettingsResponse;
}
/**
 * This event is sent when a user accepts a notification to join a call.
 * @export
 * @interface VideoCallAcceptedEvent
 */
export interface VideoCallAcceptedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallAcceptedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallAcceptedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallAcceptedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.accepted" in this case
     * @type {string}
     * @memberof VideoCallAcceptedEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCallAcceptedEvent
     */
    user: VideoUserResponse;
}
/**
 * This event is sent when a call is created. Clients receiving this event should check if the ringing 
 * field is set to true and if so, show the call screen
 * @export
 * @interface VideoCallCreatedEvent
 */
export interface VideoCallCreatedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallCreatedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallCreatedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallCreatedEvent
     */
    created_at: string;
    /**
     * the members added to this call
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoCallCreatedEvent
     */
    members: Array<VideoMemberResponse>;
    /**
     * The type of event: "call.created" in this case
     * @type {string}
     * @memberof VideoCallCreatedEvent
     */
    type: string;
}
/**
 * This event is sent when a call is mark as ended for all its participants. Clients receiving this event should leave the call screen
 * @export
 * @interface VideoCallEndedEvent
 */
export interface VideoCallEndedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallEndedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallEndedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallEndedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.ended" in this case
     * @type {string}
     * @memberof VideoCallEndedEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCallEndedEvent
     */
    user?: VideoUserResponse;
}
/**
 * This event is sent when HLS broadcasting has failed
 * @export
 * @interface VideoCallHLSBroadcastingFailedEvent
 */
export interface VideoCallHLSBroadcastingFailedEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallHLSBroadcastingFailedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallHLSBroadcastingFailedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.hls_broadcasting_failed" in this case
     * @type {string}
     * @memberof VideoCallHLSBroadcastingFailedEvent
     */
    type: string;
}
/**
 * This event is sent when HLS broadcasting has started
 * @export
 * @interface VideoCallHLSBroadcastingStartedEvent
 */
export interface VideoCallHLSBroadcastingStartedEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallHLSBroadcastingStartedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallHLSBroadcastingStartedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallHLSBroadcastingStartedEvent
     */
    hls_playlist_url: string;
    /**
     * The type of event: "call.hls_broadcasting_started" in this case
     * @type {string}
     * @memberof VideoCallHLSBroadcastingStartedEvent
     */
    type: string;
}
/**
 * This event is sent when HLS broadcasting has stopped
 * @export
 * @interface VideoCallHLSBroadcastingStoppedEvent
 */
export interface VideoCallHLSBroadcastingStoppedEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallHLSBroadcastingStoppedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallHLSBroadcastingStoppedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.hls_broadcasting_stopped" in this case
     * @type {string}
     * @memberof VideoCallHLSBroadcastingStoppedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoCallIngressResponse
 */
export interface VideoCallIngressResponse {
    /**
     * 
     * @type {VideoRTMPIngress}
     * @memberof VideoCallIngressResponse
     */
    rtmp: VideoRTMPIngress;
}
/**
 * This event is sent when a call is started. Clients receiving this event should start the call.
 * @export
 * @interface VideoCallLiveStartedEvent
 */
export interface VideoCallLiveStartedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallLiveStartedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallLiveStartedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallLiveStartedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.live_started" in this case
     * @type {string}
     * @memberof VideoCallLiveStartedEvent
     */
    type: string;
}
/**
 * This event is sent when one or more members are added to a call
 * @export
 * @interface VideoCallMemberAddedEvent
 */
export interface VideoCallMemberAddedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallMemberAddedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberAddedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberAddedEvent
     */
    created_at: string;
    /**
     * the members added to this call
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoCallMemberAddedEvent
     */
    members: Array<VideoMemberResponse>;
    /**
     * The type of event: "call.member_added" in this case
     * @type {string}
     * @memberof VideoCallMemberAddedEvent
     */
    type: string;
}
/**
 * This event is sent when one or more members are removed from a call
 * @export
 * @interface VideoCallMemberRemovedEvent
 */
export interface VideoCallMemberRemovedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallMemberRemovedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberRemovedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberRemovedEvent
     */
    created_at: string;
    /**
     * the list of member IDs removed from the call
     * @type {Array<string>}
     * @memberof VideoCallMemberRemovedEvent
     */
    members: Array<string>;
    /**
     * The type of event: "call.member_removed" in this case
     * @type {string}
     * @memberof VideoCallMemberRemovedEvent
     */
    type: string;
}
/**
 * This event is sent when one or more members are updated
 * @export
 * @interface VideoCallMemberUpdatedEvent
 */
export interface VideoCallMemberUpdatedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallMemberUpdatedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberUpdatedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberUpdatedEvent
     */
    created_at: string;
    /**
     * The list of members that were updated
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoCallMemberUpdatedEvent
     */
    members: Array<VideoMemberResponse>;
    /**
     * The type of event: "call.member_updated" in this case
     * @type {string}
     * @memberof VideoCallMemberUpdatedEvent
     */
    type: string;
}
/**
 * This event is sent when one or more members get its role updated
 * @export
 * @interface VideoCallMemberUpdatedPermissionEvent
 */
export interface VideoCallMemberUpdatedPermissionEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallMemberUpdatedPermissionEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberUpdatedPermissionEvent
     */
    call_cid: string;
    /**
     * The capabilities by role for this call
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoCallMemberUpdatedPermissionEvent
     */
    capabilities_by_role: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof VideoCallMemberUpdatedPermissionEvent
     */
    created_at: string;
    /**
     * The list of members that were updated
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoCallMemberUpdatedPermissionEvent
     */
    members: Array<VideoMemberResponse>;
    /**
     * The type of event: "call.member_added" in this case
     * @type {string}
     * @memberof VideoCallMemberUpdatedPermissionEvent
     */
    type: string;
}
/**
 * This event is sent to all call members to notify they are getting called
 * @export
 * @interface VideoCallNotificationEvent
 */
export interface VideoCallNotificationEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallNotificationEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallNotificationEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallNotificationEvent
     */
    created_at: string;
    /**
     * Call members
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoCallNotificationEvent
     */
    members: Array<VideoMemberResponse>;
    /**
     * Call session ID
     * @type {string}
     * @memberof VideoCallNotificationEvent
     */
    session_id: string;
    /**
     * The type of event: "call.notification" in this case
     * @type {string}
     * @memberof VideoCallNotificationEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCallNotificationEvent
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoCallParticipantResponse
 */
export interface VideoCallParticipantResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoCallParticipantResponse
     */
    joined_at: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallParticipantResponse
     */
    role: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCallParticipantResponse
     */
    user: VideoUserResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallParticipantResponse
     */
    user_session_id: string;
}
/**
 * This event is sent when a reaction is sent in a call, clients should use this to show the reaction in the call screen
 * @export
 * @interface VideoCallReactionEvent
 */
export interface VideoCallReactionEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallReactionEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallReactionEvent
     */
    created_at: string;
    /**
     * 
     * @type {VideoReactionResponse}
     * @memberof VideoCallReactionEvent
     */
    reaction: VideoReactionResponse;
    /**
     * The type of event: "call.reaction_new" in this case
     * @type {string}
     * @memberof VideoCallReactionEvent
     */
    type: string;
}
/**
 * CallRecording represents a recording of a call.
 * @export
 * @interface VideoCallRecording
 */
export interface VideoCallRecording {
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecording
     */
    end_time: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecording
     */
    filename: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecording
     */
    start_time: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecording
     */
    url: string;
}
/**
 * This event is sent when call recording has failed
 * @export
 * @interface VideoCallRecordingFailedEvent
 */
export interface VideoCallRecordingFailedEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingFailedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingFailedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.recording_failed" in this case
     * @type {string}
     * @memberof VideoCallRecordingFailedEvent
     */
    type: string;
}
/**
 * This event is sent when call recording is ready
 * @export
 * @interface VideoCallRecordingReadyEvent
 */
export interface VideoCallRecordingReadyEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingReadyEvent
     */
    call_cid: string;
    /**
     * 
     * @type {VideoCallRecording}
     * @memberof VideoCallRecordingReadyEvent
     */
    call_recording: VideoCallRecording;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingReadyEvent
     */
    created_at: string;
    /**
     * The type of event: "call.recording_ready" in this case
     * @type {string}
     * @memberof VideoCallRecordingReadyEvent
     */
    type: string;
}
/**
 * This event is sent when call recording has started
 * @export
 * @interface VideoCallRecordingStartedEvent
 */
export interface VideoCallRecordingStartedEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingStartedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingStartedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.recording_started" in this case
     * @type {string}
     * @memberof VideoCallRecordingStartedEvent
     */
    type: string;
}
/**
 * This event is sent when call recording has stopped
 * @export
 * @interface VideoCallRecordingStoppedEvent
 */
export interface VideoCallRecordingStoppedEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingStoppedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRecordingStoppedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.recording_stopped" in this case
     * @type {string}
     * @memberof VideoCallRecordingStoppedEvent
     */
    type: string;
}
/**
 * This event is sent when a user rejects a notification to join a call.
 * @export
 * @interface VideoCallRejectedEvent
 */
export interface VideoCallRejectedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallRejectedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRejectedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRejectedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.rejected" in this case
     * @type {string}
     * @memberof VideoCallRejectedEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCallRejectedEvent
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoCallRequest
 */
export interface VideoCallRequest {
    /**
     * 
     * @type {VideoUserRequest}
     * @memberof VideoCallRequest
     */
    created_by?: VideoUserRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRequest
     */
    created_by_id?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoCallRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {Array<VideoMemberRequest>}
     * @memberof VideoCallRequest
     */
    members?: Array<VideoMemberRequest>;
    /**
     * 
     * @type {VideoCallSettingsRequest}
     * @memberof VideoCallRequest
     */
    settings_override?: VideoCallSettingsRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRequest
     */
    starts_at?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRequest
     */
    team?: string;
}
/**
 * Represents a call
 * @export
 * @interface VideoCallResponse
 */
export interface VideoCallResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoCallResponse
     */
    backstage: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoCallResponse
     */
    blocked_user_ids: Array<string>;
    /**
     * The unique identifier for a call (<type>:<id>)
     * @type {string}
     * @memberof VideoCallResponse
     */
    cid: string;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof VideoCallResponse
     */
    created_at: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCallResponse
     */
    created_by: VideoUserResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallResponse
     */
    current_session_id: string;
    /**
     * Custom data for this object
     * @type {{ [key: string]: any; }}
     * @memberof VideoCallResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {VideoEgressResponse}
     * @memberof VideoCallResponse
     */
    egress: VideoEgressResponse;
    /**
     * Date/time when the call ended
     * @type {string}
     * @memberof VideoCallResponse
     */
    ended_at?: string;
    /**
     * Call ID
     * @type {string}
     * @memberof VideoCallResponse
     */
    id: string;
    /**
     * 
     * @type {VideoCallIngressResponse}
     * @memberof VideoCallResponse
     */
    ingress: VideoCallIngressResponse;
    /**
     * 
     * @type {boolean}
     * @memberof VideoCallResponse
     */
    recording: boolean;
    /**
     * 
     * @type {VideoCallSessionResponse}
     * @memberof VideoCallResponse
     */
    session?: VideoCallSessionResponse;
    /**
     * 
     * @type {VideoCallSettingsResponse}
     * @memberof VideoCallResponse
     */
    settings: VideoCallSettingsResponse;
    /**
     * Date/time when the call will start
     * @type {string}
     * @memberof VideoCallResponse
     */
    starts_at?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallResponse
     */
    team?: string;
    /**
     * 
     * @type {VideoThumbnailResponse}
     * @memberof VideoCallResponse
     */
    thumbnails?: VideoThumbnailResponse;
    /**
     * 
     * @type {boolean}
     * @memberof VideoCallResponse
     */
    transcribing: boolean;
    /**
     * The type of call
     * @type {string}
     * @memberof VideoCallResponse
     */
    type: string;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof VideoCallResponse
     */
    updated_at: string;
}
/**
 * This event is sent to all call members to notify they are getting called
 * @export
 * @interface VideoCallRingEvent
 */
export interface VideoCallRingEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallRingEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRingEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallRingEvent
     */
    created_at: string;
    /**
     * Call members
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoCallRingEvent
     */
    members: Array<VideoMemberResponse>;
    /**
     * Call session ID
     * @type {string}
     * @memberof VideoCallRingEvent
     */
    session_id: string;
    /**
     * The type of event: "call.notification" in this case
     * @type {string}
     * @memberof VideoCallRingEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCallRingEvent
     */
    user: VideoUserResponse;
}
/**
 * This event is sent when a call session ends
 * @export
 * @interface VideoCallSessionEndedEvent
 */
export interface VideoCallSessionEndedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallSessionEndedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionEndedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionEndedEvent
     */
    created_at: string;
    /**
     * Call session ID
     * @type {string}
     * @memberof VideoCallSessionEndedEvent
     */
    session_id: string;
    /**
     * The type of event: "call.session_ended" in this case
     * @type {string}
     * @memberof VideoCallSessionEndedEvent
     */
    type: string;
}
/**
 * This event is sent when a participant joins a call session
 * @export
 * @interface VideoCallSessionParticipantJoinedEvent
 */
export interface VideoCallSessionParticipantJoinedEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionParticipantJoinedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionParticipantJoinedEvent
     */
    created_at: string;
    /**
     * 
     * @type {VideoCallParticipantResponse}
     * @memberof VideoCallSessionParticipantJoinedEvent
     */
    participant: VideoCallParticipantResponse;
    /**
     * Call session ID
     * @type {string}
     * @memberof VideoCallSessionParticipantJoinedEvent
     */
    session_id: string;
    /**
     * The type of event: "call.session_participant_joined" in this case
     * @type {string}
     * @memberof VideoCallSessionParticipantJoinedEvent
     */
    type: string;
}
/**
 * This event is sent when a participant leaves a call session
 * @export
 * @interface VideoCallSessionParticipantLeftEvent
 */
export interface VideoCallSessionParticipantLeftEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionParticipantLeftEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionParticipantLeftEvent
     */
    created_at: string;
    /**
     * 
     * @type {VideoCallParticipantResponse}
     * @memberof VideoCallSessionParticipantLeftEvent
     */
    participant: VideoCallParticipantResponse;
    /**
     * Call session ID
     * @type {string}
     * @memberof VideoCallSessionParticipantLeftEvent
     */
    session_id: string;
    /**
     * The type of event: "call.session_participant_left" in this case
     * @type {string}
     * @memberof VideoCallSessionParticipantLeftEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoCallSessionResponse
 */
export interface VideoCallSessionResponse {
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof VideoCallSessionResponse
     */
    accepted_by: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionResponse
     */
    ended_at?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionResponse
     */
    live_ended_at?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionResponse
     */
    live_started_at?: string;
    /**
     * 
     * @type {Array<VideoCallParticipantResponse>}
     * @memberof VideoCallSessionResponse
     */
    participants: Array<VideoCallParticipantResponse>;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof VideoCallSessionResponse
     */
    participants_count_by_role: { [key: string]: number; };
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof VideoCallSessionResponse
     */
    rejected_by: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionResponse
     */
    started_at?: string;
}
/**
 * This event is sent when a call session starts
 * @export
 * @interface VideoCallSessionStartedEvent
 */
export interface VideoCallSessionStartedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallSessionStartedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionStartedEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionStartedEvent
     */
    created_at: string;
    /**
     * Call session ID
     * @type {string}
     * @memberof VideoCallSessionStartedEvent
     */
    session_id: string;
    /**
     * The type of event: "call.session_started" in this case
     * @type {string}
     * @memberof VideoCallSessionStartedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoCallSettingsRequest
 */
export interface VideoCallSettingsRequest {
    /**
     * 
     * @type {VideoAudioSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    audio?: VideoAudioSettingsRequest;
    /**
     * 
     * @type {VideoBackstageSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    backstage?: VideoBackstageSettingsRequest;
    /**
     * 
     * @type {VideoBroadcastSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    broadcasting?: VideoBroadcastSettingsRequest;
    /**
     * 
     * @type {VideoGeofenceSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    geofencing?: VideoGeofenceSettingsRequest;
    /**
     * 
     * @type {VideoRecordSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    recording?: VideoRecordSettingsRequest;
    /**
     * 
     * @type {VideoRingSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    ring?: VideoRingSettingsRequest;
    /**
     * 
     * @type {VideoScreensharingSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    screensharing?: VideoScreensharingSettingsRequest;
    /**
     * 
     * @type {VideoThumbnailsSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    thumbnails?: VideoThumbnailsSettingsRequest;
    /**
     * 
     * @type {VideoTranscriptionSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    transcription?: VideoTranscriptionSettingsRequest;
    /**
     * 
     * @type {VideoVideoSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    video?: VideoVideoSettingsRequest;
}
/**
 * 
 * @export
 * @interface VideoCallSettingsResponse
 */
export interface VideoCallSettingsResponse {
    /**
     * 
     * @type {VideoAudioSettings}
     * @memberof VideoCallSettingsResponse
     */
    audio: VideoAudioSettings;
    /**
     * 
     * @type {VideoBackstageSettings}
     * @memberof VideoCallSettingsResponse
     */
    backstage: VideoBackstageSettings;
    /**
     * 
     * @type {VideoBroadcastSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    broadcasting: VideoBroadcastSettingsResponse;
    /**
     * 
     * @type {VideoGeofenceSettings}
     * @memberof VideoCallSettingsResponse
     */
    geofencing: VideoGeofenceSettings;
    /**
     * 
     * @type {VideoRecordSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    recording: VideoRecordSettingsResponse;
    /**
     * 
     * @type {VideoRingSettings}
     * @memberof VideoCallSettingsResponse
     */
    ring: VideoRingSettings;
    /**
     * 
     * @type {VideoScreensharingSettings}
     * @memberof VideoCallSettingsResponse
     */
    screensharing: VideoScreensharingSettings;
    /**
     * 
     * @type {VideoThumbnailsSettings}
     * @memberof VideoCallSettingsResponse
     */
    thumbnails: VideoThumbnailsSettings;
    /**
     * 
     * @type {VideoTranscriptionSettings}
     * @memberof VideoCallSettingsResponse
     */
    transcription: VideoTranscriptionSettings;
    /**
     * 
     * @type {VideoVideoSettings}
     * @memberof VideoCallSettingsResponse
     */
    video: VideoVideoSettings;
}
/**
 * 
 * @export
 * @interface VideoCallStateResponseFields
 */
export interface VideoCallStateResponseFields {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallStateResponseFields
     */
    call: VideoCallResponse;
    /**
     * List of call members
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoCallStateResponseFields
     */
    members: Array<VideoMemberResponse>;
    /**
     * 
     * @type {VideoMemberResponse}
     * @memberof VideoCallStateResponseFields
     */
    membership?: VideoMemberResponse;
    /**
     * 
     * @type {Array<VideoOwnCapability>}
     * @memberof VideoCallStateResponseFields
     */
    own_capabilities: Array<VideoOwnCapability>;
}
/**
 * 
 * @export
 * @interface VideoCallTypeResponse
 */
export interface VideoCallTypeResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoCallTypeResponse
     */
    created_at: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoCallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof VideoCallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {VideoNotificationSettings}
     * @memberof VideoCallTypeResponse
     */
    notification_settings: VideoNotificationSettings;
    /**
     * 
     * @type {VideoCallSettingsResponse}
     * @memberof VideoCallTypeResponse
     */
    settings: VideoCallSettingsResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallTypeResponse
     */
    updated_at: string;
}
/**
 * This event is sent when a call is updated, clients should use this update the local state of the call. 
 * This event also contains the capabilities by role for the call, clients should update the own_capability for the current.
 * @export
 * @interface VideoCallUpdatedEvent
 */
export interface VideoCallUpdatedEvent {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoCallUpdatedEvent
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCallUpdatedEvent
     */
    call_cid: string;
    /**
     * The capabilities by role for this call
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoCallUpdatedEvent
     */
    capabilities_by_role: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof VideoCallUpdatedEvent
     */
    created_at: string;
    /**
     * The type of event: "call.ended" in this case
     * @type {string}
     * @memberof VideoCallUpdatedEvent
     */
    type: string;
}
/**
 * This event is sent when a call member is muted
 * @export
 * @interface VideoCallUserMuted
 */
export interface VideoCallUserMuted {
    /**
     * 
     * @type {string}
     * @memberof VideoCallUserMuted
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallUserMuted
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallUserMuted
     */
    from_user_id: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoCallUserMuted
     */
    muted_user_ids: Array<string>;
    /**
     * The type of event: "call.user_muted" in this case
     * @type {string}
     * @memberof VideoCallUserMuted
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoConnectUserDetailsRequest
 */
export interface VideoConnectUserDetailsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoConnectUserDetailsRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof VideoConnectUserDetailsRequest
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoConnectUserDetailsRequest
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoConnectUserDetailsRequest
     */
    name?: string;
}
/**
 * This event is sent when the WS connection is established and authenticated, this event contains the full user object as it is stored on the server
 * @export
 * @interface VideoConnectedEvent
 */
export interface VideoConnectedEvent {
    /**
     * The connection_id for this client
     * @type {string}
     * @memberof VideoConnectedEvent
     */
    connection_id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoConnectedEvent
     */
    created_at: string;
    /**
     * 
     * @type {VideoOwnUserResponse}
     * @memberof VideoConnectedEvent
     */
    me: VideoOwnUserResponse;
    /**
     * The type of event: "connection.ok" in this case
     * @type {string}
     * @memberof VideoConnectedEvent
     */
    type: string;
}
/**
 * This event is sent when the WS connection fails
 * @export
 * @interface VideoConnectionErrorEvent
 */
export interface VideoConnectionErrorEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoConnectionErrorEvent
     */
    connection_id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoConnectionErrorEvent
     */
    created_at: string;
    /**
     * 
     * @type {VideoAPIError}
     * @memberof VideoConnectionErrorEvent
     */
    error: VideoAPIError | null;
    /**
     * The type of event: "connection.ok" in this case
     * @type {string}
     * @memberof VideoConnectionErrorEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoCreateCallTypeRequest
 */
export interface VideoCreateCallTypeRequest {
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoCreateCallTypeRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof VideoCreateCallTypeRequest
     */
    name: string;
    /**
     * 
     * @type {VideoNotificationSettingsRequest}
     * @memberof VideoCreateCallTypeRequest
     */
    notification_settings?: VideoNotificationSettingsRequest;
    /**
     * 
     * @type {VideoCallSettingsRequest}
     * @memberof VideoCreateCallTypeRequest
     */
    settings?: VideoCallSettingsRequest;
}
/**
 * 
 * @export
 * @interface VideoCreateCallTypeResponse
 */
export interface VideoCreateCallTypeResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoCreateCallTypeResponse
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateCallTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoCreateCallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof VideoCreateCallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {VideoNotificationSettings}
     * @memberof VideoCreateCallTypeResponse
     */
    notification_settings: VideoNotificationSettings;
    /**
     * 
     * @type {VideoCallSettingsResponse}
     * @memberof VideoCreateCallTypeResponse
     */
    settings: VideoCallSettingsResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateCallTypeResponse
     */
    updated_at: string;
}
/**
 * 
 * @export
 * @interface VideoCreateDeviceRequest
 */
export interface VideoCreateDeviceRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoCreateDeviceRequest
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateDeviceRequest
     */
    push_provider?: VideoCreateDeviceRequestPushProviderEnum;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateDeviceRequest
     */
    push_provider_name?: string;
    /**
     * 
     * @type {VideoUserRequest}
     * @memberof VideoCreateDeviceRequest
     */
    user?: VideoUserRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateDeviceRequest
     */
    user_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof VideoCreateDeviceRequest
     */
    voip_token?: boolean;
}


/**
 * @export
 */
export const VideoCreateDeviceRequestPushProviderEnum = {
    FIREBASE: 'firebase',
    APN: 'apn',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi'
} as const;
export type VideoCreateDeviceRequestPushProviderEnum = typeof VideoCreateDeviceRequestPushProviderEnum[keyof typeof VideoCreateDeviceRequestPushProviderEnum];

/**
 * 
 * @export
 * @interface VideoCreateGuestRequest
 */
export interface VideoCreateGuestRequest {
    /**
     * 
     * @type {VideoUserRequest}
     * @memberof VideoCreateGuestRequest
     */
    user: VideoUserRequest;
}
/**
 * 
 * @export
 * @interface VideoCreateGuestResponse
 */
export interface VideoCreateGuestResponse {
    /**
     * the access token to authenticate the user
     * @type {string}
     * @memberof VideoCreateGuestResponse
     */
    access_token: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateGuestResponse
     */
    duration: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCreateGuestResponse
     */
    user: VideoUserResponse;
}
/**
 * A custom event, this event is used to send custom events to other participants in the call.
 * @export
 * @interface VideoCustomVideoEvent
 */
export interface VideoCustomVideoEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCustomVideoEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCustomVideoEvent
     */
    created_at: string;
    /**
     * Custom data for this object
     * @type {{ [key: string]: any; }}
     * @memberof VideoCustomVideoEvent
     */
    custom: { [key: string]: any; };
    /**
     * The type of event, "custom" in this case
     * @type {string}
     * @memberof VideoCustomVideoEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoCustomVideoEvent
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoDevice
 */
export interface VideoDevice {
    /**
     * Date/time of creation
     * @type {string}
     * @memberof VideoDevice
     */
    created_at: string;
    /**
     * Whether device is disabled or not
     * @type {boolean}
     * @memberof VideoDevice
     */
    disabled?: boolean;
    /**
     * Reason explaining why device had been disabled
     * @type {string}
     * @memberof VideoDevice
     */
    disabled_reason?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoDevice
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoDevice
     */
    push_provider: string;
    /**
     * 
     * @type {string}
     * @memberof VideoDevice
     */
    push_provider_name?: string;
    /**
     * When true the token is for Apple VoIP push notifications
     * @type {boolean}
     * @memberof VideoDevice
     */
    voip?: boolean;
}
/**
 * 
 * @export
 * @interface VideoEdgeResponse
 */
export interface VideoEdgeResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoEdgeResponse
     */
    continent_code: string;
    /**
     * 
     * @type {string}
     * @memberof VideoEdgeResponse
     */
    country_iso_code: string;
    /**
     * 
     * @type {number}
     * @memberof VideoEdgeResponse
     */
    green: number;
    /**
     * 
     * @type {string}
     * @memberof VideoEdgeResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoEdgeResponse
     */
    latency_test_url: string;
    /**
     * 
     * @type {number}
     * @memberof VideoEdgeResponse
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof VideoEdgeResponse
     */
    longitude: number;
    /**
     * 
     * @type {number}
     * @memberof VideoEdgeResponse
     */
    red: number;
    /**
     * 
     * @type {string}
     * @memberof VideoEdgeResponse
     */
    subdivision_iso_code: string;
    /**
     * 
     * @type {number}
     * @memberof VideoEdgeResponse
     */
    yellow: number;
}
/**
 * 
 * @export
 * @interface VideoEgressHLSResponse
 */
export interface VideoEgressHLSResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoEgressHLSResponse
     */
    playlist_url: string;
}
/**
 * 
 * @export
 * @interface VideoEgressRTMPResponse
 */
export interface VideoEgressRTMPResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoEgressRTMPResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof VideoEgressRTMPResponse
     */
    stream_key: string;
    /**
     * 
     * @type {string}
     * @memberof VideoEgressRTMPResponse
     */
    url: string;
}
/**
 * 
 * @export
 * @interface VideoEgressResponse
 */
export interface VideoEgressResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoEgressResponse
     */
    broadcasting: boolean;
    /**
     * 
     * @type {VideoEgressHLSResponse}
     * @memberof VideoEgressResponse
     */
    hls?: VideoEgressHLSResponse;
    /**
     * 
     * @type {Array<VideoEgressRTMPResponse>}
     * @memberof VideoEgressResponse
     */
    rtmps: Array<VideoEgressRTMPResponse>;
}
/**
 * 
 * @export
 * @interface VideoEndCallResponse
 */
export interface VideoEndCallResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoEndCallResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoEventNotificationSettings
 */
export interface VideoEventNotificationSettings {
    /**
     * 
     * @type {VideoAPNS}
     * @memberof VideoEventNotificationSettings
     */
    apns: VideoAPNS;
    /**
     * 
     * @type {boolean}
     * @memberof VideoEventNotificationSettings
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface VideoEventNotificationSettingsRequest
 */
export interface VideoEventNotificationSettingsRequest {
    /**
     * 
     * @type {VideoAPNSRequest}
     * @memberof VideoEventNotificationSettingsRequest
     */
    apns?: VideoAPNSRequest;
    /**
     * 
     * @type {boolean}
     * @memberof VideoEventNotificationSettingsRequest
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface VideoGeofenceSettings
 */
export interface VideoGeofenceSettings {
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoGeofenceSettings
     */
    names: Array<string>;
}
/**
 * 
 * @export
 * @interface VideoGeofenceSettingsRequest
 */
export interface VideoGeofenceSettingsRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoGeofenceSettingsRequest
     */
    names?: Array<string>;
}
/**
 * 
 * @export
 * @interface VideoGetCallResponse
 */
export interface VideoGetCallResponse {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoGetCallResponse
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoGetCallResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoGetCallResponse
     */
    members: Array<VideoMemberResponse>;
    /**
     * 
     * @type {VideoMemberResponse}
     * @memberof VideoGetCallResponse
     */
    membership?: VideoMemberResponse;
    /**
     * 
     * @type {Array<VideoOwnCapability>}
     * @memberof VideoGetCallResponse
     */
    own_capabilities: Array<VideoOwnCapability>;
}
/**
 * 
 * @export
 * @interface VideoGetCallTypeResponse
 */
export interface VideoGetCallTypeResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoGetCallTypeResponse
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof VideoGetCallTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoGetCallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof VideoGetCallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {VideoNotificationSettings}
     * @memberof VideoGetCallTypeResponse
     */
    notification_settings: VideoNotificationSettings;
    /**
     * 
     * @type {VideoCallSettingsResponse}
     * @memberof VideoGetCallTypeResponse
     */
    settings: VideoCallSettingsResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoGetCallTypeResponse
     */
    updated_at: string;
}
/**
 * 
 * @export
 * @interface VideoGetEdgesResponse
 */
export interface VideoGetEdgesResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoGetEdgesResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoEdgeResponse>}
     * @memberof VideoGetEdgesResponse
     */
    edges: Array<VideoEdgeResponse>;
}
/**
 * 
 * @export
 * @interface VideoGetOrCreateCallRequest
 */
export interface VideoGetOrCreateCallRequest {
    /**
     * 
     * @type {VideoCallRequest}
     * @memberof VideoGetOrCreateCallRequest
     */
    data?: VideoCallRequest;
    /**
     * 
     * @type {number}
     * @memberof VideoGetOrCreateCallRequest
     */
    members_limit?: number;
    /**
     * if provided it sends a notification event to the members for this call
     * @type {boolean}
     * @memberof VideoGetOrCreateCallRequest
     */
    notify?: boolean;
    /**
     * if provided it sends a ring event to the members for this call
     * @type {boolean}
     * @memberof VideoGetOrCreateCallRequest
     */
    ring?: boolean;
}
/**
 * 
 * @export
 * @interface VideoGetOrCreateCallResponse
 */
export interface VideoGetOrCreateCallResponse {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoGetOrCreateCallResponse
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {boolean}
     * @memberof VideoGetOrCreateCallResponse
     */
    created: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoGetOrCreateCallResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoGetOrCreateCallResponse
     */
    members: Array<VideoMemberResponse>;
    /**
     * 
     * @type {VideoMemberResponse}
     * @memberof VideoGetOrCreateCallResponse
     */
    membership?: VideoMemberResponse;
    /**
     * 
     * @type {Array<VideoOwnCapability>}
     * @memberof VideoGetOrCreateCallResponse
     */
    own_capabilities: Array<VideoOwnCapability>;
}
/**
 * 
 * @export
 * @interface VideoGoLiveRequest
 */
export interface VideoGoLiveRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoGoLiveRequest
     */
    start_hls?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoGoLiveRequest
     */
    start_recording?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoGoLiveRequest
     */
    start_transcription?: boolean;
}
/**
 * 
 * @export
 * @interface VideoGoLiveResponse
 */
export interface VideoGoLiveResponse {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoGoLiveResponse
     */
    call: VideoCallResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoGoLiveResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoHLSSettingsRequest
 */
export interface VideoHLSSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoHLSSettingsRequest
     */
    auto_on?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoHLSSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {VideoLayoutSettingsRequest}
     * @memberof VideoHLSSettingsRequest
     */
    layout?: VideoLayoutSettingsRequest;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoHLSSettingsRequest
     */
    quality_tracks?: Array<string>;
}
/**
 * 
 * @export
 * @interface VideoHLSSettingsResponse
 */
export interface VideoHLSSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoHLSSettingsResponse
     */
    auto_on: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoHLSSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {VideoLayoutSettings}
     * @memberof VideoHLSSettingsResponse
     */
    layout: VideoLayoutSettings;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoHLSSettingsResponse
     */
    quality_tracks: Array<string>;
}
/**
 * 
 * @export
 * @interface VideoHealthCheckEvent
 */
export interface VideoHealthCheckEvent {
    /**
     * The connection_id for this client
     * @type {string}
     * @memberof VideoHealthCheckEvent
     */
    connection_id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoHealthCheckEvent
     */
    created_at: string;
    /**
     * The type of event: "health.check" in this case
     * @type {string}
     * @memberof VideoHealthCheckEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoLayoutSettings
 */
export interface VideoLayoutSettings {
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettings
     */
    external_app_url: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettings
     */
    external_css_url: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettings
     */
    name: VideoLayoutSettingsNameEnum;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoLayoutSettings
     */
    options?: { [key: string]: any; };
}


/**
 * @export
 */
export const VideoLayoutSettingsNameEnum = {
    SPOTLIGHT: 'spotlight',
    GRID: 'grid',
    SINGLE_PARTICIPANT: 'single-participant',
    MOBILE: 'mobile',
    CUSTOM: 'custom'
} as const;
export type VideoLayoutSettingsNameEnum = typeof VideoLayoutSettingsNameEnum[keyof typeof VideoLayoutSettingsNameEnum];

/**
 * 
 * @export
 * @interface VideoLayoutSettingsRequest
 */
export interface VideoLayoutSettingsRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettingsRequest
     */
    external_app_url?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettingsRequest
     */
    external_css_url?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettingsRequest
     */
    name: VideoLayoutSettingsRequestNameEnum;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoLayoutSettingsRequest
     */
    options?: { [key: string]: any; };
}


/**
 * @export
 */
export const VideoLayoutSettingsRequestNameEnum = {
    SPOTLIGHT: 'spotlight',
    GRID: 'grid',
    SINGLE_PARTICIPANT: 'single-participant',
    MOBILE: 'mobile',
    CUSTOM: 'custom'
} as const;
export type VideoLayoutSettingsRequestNameEnum = typeof VideoLayoutSettingsRequestNameEnum[keyof typeof VideoLayoutSettingsRequestNameEnum];

/**
 * 
 * @export
 * @interface VideoListCallTypeResponse
 */
export interface VideoListCallTypeResponse {
    /**
     * 
     * @type {{ [key: string]: VideoCallTypeResponse; }}
     * @memberof VideoListCallTypeResponse
     */
    call_types: { [key: string]: VideoCallTypeResponse; };
    /**
     * 
     * @type {string}
     * @memberof VideoListCallTypeResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoListDevicesResponse
 */
export interface VideoListDevicesResponse {
    /**
     * List of devices
     * @type {Array<VideoDevice>}
     * @memberof VideoListDevicesResponse
     */
    devices: Array<VideoDevice>;
    /**
     * 
     * @type {string}
     * @memberof VideoListDevicesResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoListRecordingsResponse
 */
export interface VideoListRecordingsResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoListRecordingsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoCallRecording>}
     * @memberof VideoListRecordingsResponse
     */
    recordings: Array<VideoCallRecording>;
}
/**
 * 
 * @export
 * @interface VideoMemberRequest
 */
export interface VideoMemberRequest {
    /**
     * Custom data for this object
     * @type {{ [key: string]: any; }}
     * @memberof VideoMemberRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof VideoMemberRequest
     */
    role?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoMemberRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface VideoMemberResponse
 */
export interface VideoMemberResponse {
    /**
     * Date/time of creation
     * @type {string}
     * @memberof VideoMemberResponse
     */
    created_at: string;
    /**
     * Custom member response data
     * @type {{ [key: string]: any; }}
     * @memberof VideoMemberResponse
     */
    custom: { [key: string]: any; };
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof VideoMemberResponse
     */
    deleted_at?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoMemberResponse
     */
    role?: string;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof VideoMemberResponse
     */
    updated_at: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoMemberResponse
     */
    user: VideoUserResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoMemberResponse
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface VideoMuteUsersRequest
 */
export interface VideoMuteUsersRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoMuteUsersRequest
     */
    audio?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoMuteUsersRequest
     */
    mute_all_users?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoMuteUsersRequest
     */
    screenshare?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoMuteUsersRequest
     */
    screenshare_audio?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoMuteUsersRequest
     */
    user_ids?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof VideoMuteUsersRequest
     */
    video?: boolean;
}
/**
 * 
 * @export
 * @interface VideoMuteUsersResponse
 */
export interface VideoMuteUsersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoMuteUsersResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoNotificationSettings
 */
export interface VideoNotificationSettings {
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    call_live_started: VideoEventNotificationSettings;
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    call_notification: VideoEventNotificationSettings;
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    call_ring: VideoEventNotificationSettings;
    /**
     * 
     * @type {boolean}
     * @memberof VideoNotificationSettings
     */
    enabled: boolean;
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    session_started: VideoEventNotificationSettings;
}
/**
 * 
 * @export
 * @interface VideoNotificationSettingsRequest
 */
export interface VideoNotificationSettingsRequest {
    /**
     * 
     * @type {VideoEventNotificationSettingsRequest}
     * @memberof VideoNotificationSettingsRequest
     */
    call_live_started?: VideoEventNotificationSettingsRequest;
    /**
     * 
     * @type {VideoEventNotificationSettingsRequest}
     * @memberof VideoNotificationSettingsRequest
     */
    call_notification?: VideoEventNotificationSettingsRequest;
    /**
     * 
     * @type {VideoEventNotificationSettingsRequest}
     * @memberof VideoNotificationSettingsRequest
     */
    call_ring?: VideoEventNotificationSettingsRequest;
    /**
     * 
     * @type {boolean}
     * @memberof VideoNotificationSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {VideoEventNotificationSettingsRequest}
     * @memberof VideoNotificationSettingsRequest
     */
    session_started?: VideoEventNotificationSettingsRequest;
}

/**
 * All possibility of string to use
 * @export
 */
export const VideoOwnCapability = {
    BLOCK_USERS: 'block-users',
    CREATE_CALL: 'create-call',
    CREATE_REACTION: 'create-reaction',
    END_CALL: 'end-call',
    JOIN_BACKSTAGE: 'join-backstage',
    JOIN_CALL: 'join-call',
    JOIN_ENDED_CALL: 'join-ended-call',
    MUTE_USERS: 'mute-users',
    PIN_FOR_EVERYONE: 'pin-for-everyone',
    READ_CALL: 'read-call',
    REMOVE_CALL_MEMBER: 'remove-call-member',
    SCREENSHARE: 'screenshare',
    SEND_AUDIO: 'send-audio',
    SEND_VIDEO: 'send-video',
    START_BROADCAST_CALL: 'start-broadcast-call',
    START_RECORD_CALL: 'start-record-call',
    START_TRANSCRIPTION_CALL: 'start-transcription-call',
    STOP_BROADCAST_CALL: 'stop-broadcast-call',
    STOP_RECORD_CALL: 'stop-record-call',
    STOP_TRANSCRIPTION_CALL: 'stop-transcription-call',
    UPDATE_CALL: 'update-call',
    UPDATE_CALL_MEMBER: 'update-call-member',
    UPDATE_CALL_PERMISSIONS: 'update-call-permissions',
    UPDATE_CALL_SETTINGS: 'update-call-settings'
} as const;
export type VideoOwnCapability = typeof VideoOwnCapability[keyof typeof VideoOwnCapability];

/**
 * 
 * @export
 * @interface VideoOwnUserResponse
 */
export interface VideoOwnUserResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoOwnUserResponse
     */
    created_at: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoOwnUserResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof VideoOwnUserResponse
     */
    deleted_at?: string;
    /**
     * 
     * @type {Array<VideoDevice>}
     * @memberof VideoOwnUserResponse
     */
    devices: Array<VideoDevice>;
    /**
     * 
     * @type {string}
     * @memberof VideoOwnUserResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoOwnUserResponse
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoOwnUserResponse
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoOwnUserResponse
     */
    role: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoOwnUserResponse
     */
    teams: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof VideoOwnUserResponse
     */
    updated_at: string;
}
/**
 * This event is sent when a user requests access to a feature on a call,
 * clients receiving this event should display a permission request to the user
 * @export
 * @interface VideoPermissionRequestEvent
 */
export interface VideoPermissionRequestEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoPermissionRequestEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoPermissionRequestEvent
     */
    created_at: string;
    /**
     * The list of permissions requested by the user
     * @type {Array<string>}
     * @memberof VideoPermissionRequestEvent
     */
    permissions: Array<string>;
    /**
     * The type of event: "call.permission_request" in this case
     * @type {string}
     * @memberof VideoPermissionRequestEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoPermissionRequestEvent
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoPinRequest
 */
export interface VideoPinRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoPinRequest
     */
    session_id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoPinRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface VideoPinResponse
 */
export interface VideoPinResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoPinResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoQueryCallsRequest
 */
export interface VideoQueryCallsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoQueryCallsRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof VideoQueryCallsRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallsRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallsRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<VideoSortParamRequest>}
     * @memberof VideoQueryCallsRequest
     */
    sort?: Array<VideoSortParamRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof VideoQueryCallsRequest
     */
    watch?: boolean;
}
/**
 * 
 * @export
 * @interface VideoQueryCallsResponse
 */
export interface VideoQueryCallsResponse {
    /**
     * 
     * @type {Array<VideoCallStateResponseFields>}
     * @memberof VideoQueryCallsResponse
     */
    calls: Array<VideoCallStateResponseFields>;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallsResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallsResponse
     */
    prev?: string;
}
/**
 * 
 * @export
 * @interface VideoQueryMembersRequest
 */
export interface VideoQueryMembersRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoQueryMembersRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof VideoQueryMembersRequest
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof VideoQueryMembersRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryMembersRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryMembersRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<VideoSortParamRequest>}
     * @memberof VideoQueryMembersRequest
     */
    sort?: Array<VideoSortParamRequest>;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryMembersRequest
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoQueryMembersResponse
 */
export interface VideoQueryMembersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoQueryMembersResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoQueryMembersResponse
     */
    members: Array<VideoMemberResponse>;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryMembersResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryMembersResponse
     */
    prev?: string;
}
/**
 * RTMP input settings
 * @export
 * @interface VideoRTMPIngress
 */
export interface VideoRTMPIngress {
    /**
     * 
     * @type {string}
     * @memberof VideoRTMPIngress
     */
    address: string;
}
/**
 * 
 * @export
 * @interface VideoReactionResponse
 */
export interface VideoReactionResponse {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoReactionResponse
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof VideoReactionResponse
     */
    emoji_code?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoReactionResponse
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoReactionResponse
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoRecordSettingsRequest
 */
export interface VideoRecordSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoRecordSettingsRequest
     */
    audio_only?: boolean;
    /**
     * 
     * @type {VideoLayoutSettingsRequest}
     * @memberof VideoRecordSettingsRequest
     */
    layout?: VideoLayoutSettingsRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoRecordSettingsRequest
     */
    mode: VideoRecordSettingsRequestModeEnum;
    /**
     * 
     * @type {string}
     * @memberof VideoRecordSettingsRequest
     */
    quality?: VideoRecordSettingsRequestQualityEnum;
}


/**
 * @export
 */
export const VideoRecordSettingsRequestModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type VideoRecordSettingsRequestModeEnum = typeof VideoRecordSettingsRequestModeEnum[keyof typeof VideoRecordSettingsRequestModeEnum];

/**
 * @export
 */
export const VideoRecordSettingsRequestQualityEnum = {
    _360P: '360p',
    _480P: '480p',
    _720P: '720p',
    _1080P: '1080p',
    _1440P: '1440p'
} as const;
export type VideoRecordSettingsRequestQualityEnum = typeof VideoRecordSettingsRequestQualityEnum[keyof typeof VideoRecordSettingsRequestQualityEnum];

/**
 * 
 * @export
 * @interface VideoRecordSettingsResponse
 */
export interface VideoRecordSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoRecordSettingsResponse
     */
    audio_only: boolean;
    /**
     * 
     * @type {VideoLayoutSettings}
     * @memberof VideoRecordSettingsResponse
     */
    layout: VideoLayoutSettings;
    /**
     * 
     * @type {string}
     * @memberof VideoRecordSettingsResponse
     */
    mode: string;
    /**
     * 
     * @type {string}
     * @memberof VideoRecordSettingsResponse
     */
    quality: string;
}
/**
 * 
 * @export
 * @interface VideoResponse
 */
export interface VideoResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoRingSettings
 */
export interface VideoRingSettings {
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettings
     */
    auto_cancel_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettings
     */
    incoming_call_timeout_ms: number;
}
/**
 * 
 * @export
 * @interface VideoRingSettingsRequest
 */
export interface VideoRingSettingsRequest {
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsRequest
     */
    auto_cancel_timeout_ms?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsRequest
     */
    incoming_call_timeout_ms?: number;
}
/**
 * 
 * @export
 * @interface VideoScreensharingSettings
 */
export interface VideoScreensharingSettings {
    /**
     * 
     * @type {boolean}
     * @memberof VideoScreensharingSettings
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoScreensharingSettings
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface VideoScreensharingSettingsRequest
 */
export interface VideoScreensharingSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoScreensharingSettingsRequest
     */
    access_request_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoScreensharingSettingsRequest
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface VideoSendEventRequest
 */
export interface VideoSendEventRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoSendEventRequest
     */
    custom?: { [key: string]: any; };
}
/**
 * 
 * @export
 * @interface VideoSendEventResponse
 */
export interface VideoSendEventResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoSendEventResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoSortParamRequest
 */
export interface VideoSortParamRequest {
    /**
     * Direction of sorting, -1 for descending, 1 for ascending
     * @type {number}
     * @memberof VideoSortParamRequest
     */
    direction?: number;
    /**
     * Name of field to sort by
     * @type {string}
     * @memberof VideoSortParamRequest
     */
    field?: string;
}
/**
 * 
 * @export
 * @interface VideoStartHLSBroadcastingResponse
 */
export interface VideoStartHLSBroadcastingResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoStartHLSBroadcastingResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof VideoStartHLSBroadcastingResponse
     */
    playlist_url: string;
}
/**
 * 
 * @export
 * @interface VideoStartRecordingResponse
 */
export interface VideoStartRecordingResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoStartRecordingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoStartTranscriptionResponse
 */
export interface VideoStartTranscriptionResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoStartTranscriptionResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoStopHLSBroadcastingResponse
 */
export interface VideoStopHLSBroadcastingResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoStopHLSBroadcastingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoStopLiveResponse
 */
export interface VideoStopLiveResponse {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoStopLiveResponse
     */
    call: VideoCallResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoStopLiveResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoStopRecordingResponse
 */
export interface VideoStopRecordingResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoStopRecordingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoStopTranscriptionResponse
 */
export interface VideoStopTranscriptionResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoStopTranscriptionResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoTargetResolution
 */
export interface VideoTargetResolution {
    /**
     * 
     * @type {number}
     * @memberof VideoTargetResolution
     */
    bitrate: number;
    /**
     * 
     * @type {number}
     * @memberof VideoTargetResolution
     */
    height: number;
    /**
     * 
     * @type {number}
     * @memberof VideoTargetResolution
     */
    width: number;
}
/**
 * 
 * @export
 * @interface VideoTargetResolutionRequest
 */
export interface VideoTargetResolutionRequest {
    /**
     * 
     * @type {number}
     * @memberof VideoTargetResolutionRequest
     */
    bitrate?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoTargetResolutionRequest
     */
    height?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoTargetResolutionRequest
     */
    width?: number;
}
/**
 * 
 * @export
 * @interface VideoThumbnailResponse
 */
export interface VideoThumbnailResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoThumbnailResponse
     */
    image_url: string;
}
/**
 * 
 * @export
 * @interface VideoThumbnailsSettings
 */
export interface VideoThumbnailsSettings {
    /**
     * 
     * @type {boolean}
     * @memberof VideoThumbnailsSettings
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface VideoThumbnailsSettingsRequest
 */
export interface VideoThumbnailsSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoThumbnailsSettingsRequest
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface VideoTranscriptionSettings
 */
export interface VideoTranscriptionSettings {
    /**
     * 
     * @type {string}
     * @memberof VideoTranscriptionSettings
     */
    closed_caption_mode: string;
    /**
     * 
     * @type {string}
     * @memberof VideoTranscriptionSettings
     */
    mode: VideoTranscriptionSettingsModeEnum;
}


/**
 * @export
 */
export const VideoTranscriptionSettingsModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type VideoTranscriptionSettingsModeEnum = typeof VideoTranscriptionSettingsModeEnum[keyof typeof VideoTranscriptionSettingsModeEnum];

/**
 * 
 * @export
 * @interface VideoTranscriptionSettingsRequest
 */
export interface VideoTranscriptionSettingsRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoTranscriptionSettingsRequest
     */
    closed_caption_mode?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoTranscriptionSettingsRequest
     */
    mode?: VideoTranscriptionSettingsRequestModeEnum;
}


/**
 * @export
 */
export const VideoTranscriptionSettingsRequestModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type VideoTranscriptionSettingsRequestModeEnum = typeof VideoTranscriptionSettingsRequestModeEnum[keyof typeof VideoTranscriptionSettingsRequestModeEnum];

/**
 * 
 * @export
 * @interface VideoUnblockUserRequest
 */
export interface VideoUnblockUserRequest {
    /**
     * the user to unblock
     * @type {string}
     * @memberof VideoUnblockUserRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface VideoUnblockUserResponse
 */
export interface VideoUnblockUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoUnblockUserResponse
     */
    duration: string;
}
/**
 * This event is sent when a user is unblocked on a call, 
 * this can be useful to notify the user that they can now join the call again
 * @export
 * @interface VideoUnblockedUserEvent
 */
export interface VideoUnblockedUserEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoUnblockedUserEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUnblockedUserEvent
     */
    created_at: string;
    /**
     * The type of event: "call.unblocked_user" in this case
     * @type {string}
     * @memberof VideoUnblockedUserEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoUnblockedUserEvent
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoUnpinRequest
 */
export interface VideoUnpinRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoUnpinRequest
     */
    session_id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUnpinRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface VideoUnpinResponse
 */
export interface VideoUnpinResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoUnpinResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoUpdateCallMembersRequest
 */
export interface VideoUpdateCallMembersRequest {
    /**
     * List of userID to remove
     * @type {Array<string>}
     * @memberof VideoUpdateCallMembersRequest
     */
    remove_members?: Array<string>;
    /**
     * List of members to update or insert
     * @type {Array<VideoMemberRequest>}
     * @memberof VideoUpdateCallMembersRequest
     */
    update_members?: Array<VideoMemberRequest>;
}
/**
 * 
 * @export
 * @interface VideoUpdateCallMembersResponse
 */
export interface VideoUpdateCallMembersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoUpdateCallMembersResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoUpdateCallMembersResponse
     */
    members: Array<VideoMemberResponse>;
}
/**
 * 
 * @export
 * @interface VideoUpdateCallRequest
 */
export interface VideoUpdateCallRequest {
    /**
     * Custom data for this object
     * @type {{ [key: string]: any; }}
     * @memberof VideoUpdateCallRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {VideoCallSettingsRequest}
     * @memberof VideoUpdateCallRequest
     */
    settings_override?: VideoCallSettingsRequest;
    /**
     * the time the call is scheduled to start
     * @type {string}
     * @memberof VideoUpdateCallRequest
     */
    starts_at?: string;
}
/**
 * Represents a call
 * @export
 * @interface VideoUpdateCallResponse
 */
export interface VideoUpdateCallResponse {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoUpdateCallResponse
     */
    call: VideoCallResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateCallResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoUpdateCallResponse
     */
    members: Array<VideoMemberResponse>;
    /**
     * 
     * @type {VideoMemberResponse}
     * @memberof VideoUpdateCallResponse
     */
    membership?: VideoMemberResponse;
    /**
     * 
     * @type {Array<VideoOwnCapability>}
     * @memberof VideoUpdateCallResponse
     */
    own_capabilities: Array<VideoOwnCapability>;
}
/**
 * 
 * @export
 * @interface VideoUpdateCallTypeRequest
 */
export interface VideoUpdateCallTypeRequest {
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoUpdateCallTypeRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {VideoNotificationSettingsRequest}
     * @memberof VideoUpdateCallTypeRequest
     */
    notification_settings?: VideoNotificationSettingsRequest;
    /**
     * 
     * @type {VideoCallSettingsRequest}
     * @memberof VideoUpdateCallTypeRequest
     */
    settings?: VideoCallSettingsRequest;
}
/**
 * 
 * @export
 * @interface VideoUpdateCallTypeResponse
 */
export interface VideoUpdateCallTypeResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateCallTypeResponse
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateCallTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoUpdateCallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateCallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {VideoNotificationSettings}
     * @memberof VideoUpdateCallTypeResponse
     */
    notification_settings: VideoNotificationSettings;
    /**
     * 
     * @type {VideoCallSettingsResponse}
     * @memberof VideoUpdateCallTypeResponse
     */
    settings: VideoCallSettingsResponse;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateCallTypeResponse
     */
    updated_at: string;
}
/**
 * 
 * @export
 * @interface VideoUpdateUserPermissionsRequest
 */
export interface VideoUpdateUserPermissionsRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoUpdateUserPermissionsRequest
     */
    grant_permissions?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoUpdateUserPermissionsRequest
     */
    revoke_permissions?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateUserPermissionsRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface VideoUpdateUserPermissionsResponse
 */
export interface VideoUpdateUserPermissionsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoUpdateUserPermissionsResponse
     */
    duration: string;
}
/**
 * This event is sent to notify about permission changes for a user, clients receiving this event should update their UI accordingly
 * @export
 * @interface VideoUpdatedCallPermissionsEvent
 */
export interface VideoUpdatedCallPermissionsEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoUpdatedCallPermissionsEvent
     */
    call_cid: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdatedCallPermissionsEvent
     */
    created_at: string;
    /**
     * The capabilities of the current user
     * @type {Array<VideoOwnCapability>}
     * @memberof VideoUpdatedCallPermissionsEvent
     */
    own_capabilities: Array<VideoOwnCapability>;
    /**
     * The type of event: "call.permissions_updated" in this case
     * @type {string}
     * @memberof VideoUpdatedCallPermissionsEvent
     */
    type: string;
    /**
     * 
     * @type {VideoUserResponse}
     * @memberof VideoUpdatedCallPermissionsEvent
     */
    user: VideoUserResponse;
}
/**
 * 
 * @export
 * @interface VideoUserRequest
 */
export interface VideoUserRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoUserRequest
     */
    custom?: { [key: string]: any; };
    /**
     * User ID
     * @type {string}
     * @memberof VideoUserRequest
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserRequest
     */
    image?: string;
    /**
     * Optional name of user
     * @type {string}
     * @memberof VideoUserRequest
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserRequest
     */
    role?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoUserRequest
     */
    teams?: Array<string>;
}
/**
 * 
 * @export
 * @interface VideoUserResponse
 */
export interface VideoUserResponse {
    /**
     * Date/time of creation
     * @type {string}
     * @memberof VideoUserResponse
     */
    created_at: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoUserResponse
     */
    custom: { [key: string]: any; };
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof VideoUserResponse
     */
    deleted_at?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    role: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoUserResponse
     */
    teams: Array<string>;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof VideoUserResponse
     */
    updated_at: string;
}
/**
 * @type VideoVideoEvent
 * The discriminator object for all websocket events, you should use this to map event payloads to their own type
 * @export
 */
export type VideoVideoEvent = { type: 'call.accepted' } & VideoCallAcceptedEvent | { type: 'call.blocked_user' } & VideoBlockedUserEvent | { type: 'call.created' } & VideoCallCreatedEvent | { type: 'call.ended' } & VideoCallEndedEvent | { type: 'call.hls_broadcasting_failed' } & VideoCallHLSBroadcastingFailedEvent | { type: 'call.hls_broadcasting_started' } & VideoCallHLSBroadcastingStartedEvent | { type: 'call.hls_broadcasting_stopped' } & VideoCallHLSBroadcastingStoppedEvent | { type: 'call.live_started' } & VideoCallLiveStartedEvent | { type: 'call.member_added' } & VideoCallMemberAddedEvent | { type: 'call.member_removed' } & VideoCallMemberRemovedEvent | { type: 'call.member_updated' } & VideoCallMemberUpdatedEvent | { type: 'call.member_updated_permission' } & VideoCallMemberUpdatedPermissionEvent | { type: 'call.notification' } & VideoCallNotificationEvent | { type: 'call.permission_request' } & VideoPermissionRequestEvent | { type: 'call.permissions_updated' } & VideoUpdatedCallPermissionsEvent | { type: 'call.reaction_new' } & VideoCallReactionEvent | { type: 'call.recording_failed' } & VideoCallRecordingFailedEvent | { type: 'call.recording_ready' } & VideoCallRecordingReadyEvent | { type: 'call.recording_started' } & VideoCallRecordingStartedEvent | { type: 'call.recording_stopped' } & VideoCallRecordingStoppedEvent | { type: 'call.rejected' } & VideoCallRejectedEvent | { type: 'call.ring' } & VideoCallRingEvent | { type: 'call.session_ended' } & VideoCallSessionEndedEvent | { type: 'call.session_participant_joined' } & VideoCallSessionParticipantJoinedEvent | { type: 'call.session_participant_left' } & VideoCallSessionParticipantLeftEvent | { type: 'call.session_started' } & VideoCallSessionStartedEvent | { type: 'call.unblocked_user' } & VideoUnblockedUserEvent | { type: 'call.updated' } & VideoCallUpdatedEvent | { type: 'call.user_muted' } & VideoCallUserMuted | { type: 'connection.error' } & VideoConnectionErrorEvent | { type: 'connection.ok' } & VideoConnectedEvent | { type: 'custom' } & VideoCustomVideoEvent | { type: 'health.check' } & VideoHealthCheckEvent;
/**
 * 
 * @export
 * @interface VideoVideoSettings
 */
export interface VideoVideoSettings {
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettings
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettings
     */
    camera_default_on: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoVideoSettings
     */
    camera_facing: VideoVideoSettingsCameraFacingEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettings
     */
    enabled: boolean;
    /**
     * 
     * @type {VideoTargetResolution}
     * @memberof VideoVideoSettings
     */
    target_resolution: VideoTargetResolution;
}


/**
 * @export
 */
export const VideoVideoSettingsCameraFacingEnum = {
    FRONT: 'front',
    BACK: 'back',
    EXTERNAL: 'external'
} as const;
export type VideoVideoSettingsCameraFacingEnum = typeof VideoVideoSettingsCameraFacingEnum[keyof typeof VideoVideoSettingsCameraFacingEnum];

/**
 * 
 * @export
 * @interface VideoVideoSettingsRequest
 */
export interface VideoVideoSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettingsRequest
     */
    access_request_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettingsRequest
     */
    camera_default_on?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoVideoSettingsRequest
     */
    camera_facing?: VideoVideoSettingsRequestCameraFacingEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {VideoTargetResolutionRequest}
     * @memberof VideoVideoSettingsRequest
     */
    target_resolution?: VideoTargetResolutionRequest;
}


/**
 * @export
 */
export const VideoVideoSettingsRequestCameraFacingEnum = {
    FRONT: 'front',
    BACK: 'back',
    EXTERNAL: 'external'
} as const;
export type VideoVideoSettingsRequestCameraFacingEnum = typeof VideoVideoSettingsRequestCameraFacingEnum[keyof typeof VideoVideoSettingsRequestCameraFacingEnum];

/**
 * 
 * @export
 * @interface VideoWSAuthMessageRequest
 */
export interface VideoWSAuthMessageRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoWSAuthMessageRequest
     */
    token: string;
    /**
     * 
     * @type {VideoConnectUserDetailsRequest}
     * @memberof VideoWSAuthMessageRequest
     */
    user_details: VideoConnectUserDetailsRequest;
}
/**
 * This is just a placeholder for all client events
 * @export
 * @interface VideoWSCallEvent
 */
export interface VideoWSCallEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoWSCallEvent
     */
    call_cid?: string;
}
/**
 * This is just a placeholder for all client events
 * @export
 * @interface VideoWSClientEvent
 */
export interface VideoWSClientEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoWSClientEvent
     */
    connection_id?: string;
}
