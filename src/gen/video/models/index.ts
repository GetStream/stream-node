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
    body?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoAPNS
     */
    title?: string;
}
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
     * @type {VideoNoiseCancellationSettings}
     * @memberof VideoAudioSettingsRequest
     */
    noise_cancellation?: VideoNoiseCancellationSettings;
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
 * @interface VideoAudioSettingsResponse
 */
export interface VideoAudioSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsResponse
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoAudioSettingsResponse
     */
    default_device: VideoAudioSettingsResponseDefaultDeviceEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsResponse
     */
    mic_default_on: boolean;
    /**
     * 
     * @type {VideoNoiseCancellationSettings}
     * @memberof VideoAudioSettingsResponse
     */
    noise_cancellation?: VideoNoiseCancellationSettings;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsResponse
     */
    opus_dtx_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsResponse
     */
    redundant_coding_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoAudioSettingsResponse
     */
    speaker_default_on: boolean;
}


/**
 * @export
 */
export const VideoAudioSettingsResponseDefaultDeviceEnum = {
    SPEAKER: 'speaker',
    EARPIECE: 'earpiece'
} as const;
export type VideoAudioSettingsResponseDefaultDeviceEnum = typeof VideoAudioSettingsResponseDefaultDeviceEnum[keyof typeof VideoAudioSettingsResponseDefaultDeviceEnum];

/**
 * 
 * @export
 * @interface VideoAzureRequest
 */
export interface VideoAzureRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoAzureRequest
     */
    abs_account_name: string;
    /**
     * 
     * @type {string}
     * @memberof VideoAzureRequest
     */
    abs_client_id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoAzureRequest
     */
    abs_client_secret: string;
    /**
     * 
     * @type {string}
     * @memberof VideoAzureRequest
     */
    abs_tenant_id: string;
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
    /**
     * 
     * @type {number}
     * @memberof VideoBackstageSettingsRequest
     */
    join_ahead_time_seconds?: number;
}
/**
 * 
 * @export
 * @interface VideoBackstageSettingsResponse
 */
export interface VideoBackstageSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoBackstageSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {number}
     * @memberof VideoBackstageSettingsResponse
     */
    join_ahead_time_seconds?: number;
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
 * 
 * @export
 * @interface VideoCallEvent
 */
export interface VideoCallEvent {
    /**
     * 
     * @type {string}
     * @memberof VideoCallEvent
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof VideoCallEvent
     */
    end_timestamp: number;
    /**
     * 
     * @type {number}
     * @memberof VideoCallEvent
     */
    severity: number;
    /**
     * 
     * @type {number}
     * @memberof VideoCallEvent
     */
    timestamp: number;
    /**
     * 
     * @type {string}
     * @memberof VideoCallEvent
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
     * @type {number}
     * @memberof VideoCallResponse
     */
    join_ahead_time_seconds?: number;
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
     * @type {{ [key: string]: string; }}
     * @memberof VideoCallSessionResponse
     */
    missed_by: { [key: string]: string; };
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
    /**
     * 
     * @type {string}
     * @memberof VideoCallSessionResponse
     */
    timer_ends_at?: string;
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
     * @type {VideoLimitsSettingsRequest}
     * @memberof VideoCallSettingsRequest
     */
    limits?: VideoLimitsSettingsRequest;
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
     * @type {VideoAudioSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    audio: VideoAudioSettingsResponse;
    /**
     * 
     * @type {VideoBackstageSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    backstage: VideoBackstageSettingsResponse;
    /**
     * 
     * @type {VideoBroadcastSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    broadcasting: VideoBroadcastSettingsResponse;
    /**
     * 
     * @type {VideoGeofenceSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    geofencing: VideoGeofenceSettingsResponse;
    /**
     * 
     * @type {VideoLimitsSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    limits: VideoLimitsSettingsResponse;
    /**
     * 
     * @type {VideoRecordSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    recording: VideoRecordSettingsResponse;
    /**
     * 
     * @type {VideoRingSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    ring: VideoRingSettingsResponse;
    /**
     * 
     * @type {VideoScreensharingSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    screensharing: VideoScreensharingSettingsResponse;
    /**
     * 
     * @type {VideoThumbnailsSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    thumbnails: VideoThumbnailsSettingsResponse;
    /**
     * 
     * @type {VideoTranscriptionSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    transcription: VideoTranscriptionSettingsResponse;
    /**
     * 
     * @type {VideoVideoSettingsResponse}
     * @memberof VideoCallSettingsResponse
     */
    video: VideoVideoSettingsResponse;
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
     * @type {Array<VideoOwnCapability>}
     * @memberof VideoCallStateResponseFields
     */
    own_capabilities: Array<VideoOwnCapability>;
}
/**
 * 
 * @export
 * @interface VideoCallStatsReportSummaryResponse
 */
export interface VideoCallStatsReportSummaryResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoCallStatsReportSummaryResponse
     */
    call_cid: string;
    /**
     * 
     * @type {number}
     * @memberof VideoCallStatsReportSummaryResponse
     */
    call_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof VideoCallStatsReportSummaryResponse
     */
    call_session_id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallStatsReportSummaryResponse
     */
    call_status: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallStatsReportSummaryResponse
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallStatsReportSummaryResponse
     */
    first_stats_time: string;
    /**
     * 
     * @type {number}
     * @memberof VideoCallStatsReportSummaryResponse
     */
    quality_score?: number;
}
/**
 * 
 * @export
 * @interface VideoCallTimeline
 */
export interface VideoCallTimeline {
    /**
     * 
     * @type {Array<VideoCallEvent>}
     * @memberof VideoCallTimeline
     */
    events: Array<VideoCallEvent>;
}
/**
 * CallTranscription represents a transcription of a call.
 * @export
 * @interface VideoCallTranscription
 */
export interface VideoCallTranscription {
    /**
     * 
     * @type {string}
     * @memberof VideoCallTranscription
     */
    end_time: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallTranscription
     */
    filename: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallTranscription
     */
    start_time: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCallTranscription
     */
    url: string;
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
     * @type {string}
     * @memberof VideoCallTypeResponse
     */
    external_storage?: string;
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
 * 
 * @export
 * @interface VideoCheckExternalStorageResponse
 */
export interface VideoCheckExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoCheckExternalStorageResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCheckExternalStorageResponse
     */
    file_url: string;
}
/**
 * 
 * @export
 * @interface VideoCollectUserFeedbackRequest
 */
export interface VideoCollectUserFeedbackRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoCollectUserFeedbackRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof VideoCollectUserFeedbackRequest
     */
    rating: number;
    /**
     * 
     * @type {string}
     * @memberof VideoCollectUserFeedbackRequest
     */
    reason?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCollectUserFeedbackRequest
     */
    sdk: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCollectUserFeedbackRequest
     */
    sdk_version: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCollectUserFeedbackRequest
     */
    user_session_id: string;
}
/**
 * 
 * @export
 * @interface VideoCollectUserFeedbackResponse
 */
export interface VideoCollectUserFeedbackResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoCollectUserFeedbackResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoCoordinates
 */
export interface VideoCoordinates {
    /**
     * 
     * @type {number}
     * @memberof VideoCoordinates
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof VideoCoordinates
     */
    longitude: number;
}
/**
 * 
 * @export
 * @interface VideoCreateCallTypeRequest
 */
export interface VideoCreateCallTypeRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoCreateCallTypeRequest
     */
    external_storage?: string;
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
     * @type {VideoNotificationSettings}
     * @memberof VideoCreateCallTypeRequest
     */
    notification_settings?: VideoNotificationSettings;
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
     * @type {string}
     * @memberof VideoCreateCallTypeResponse
     */
    external_storage?: string;
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
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateDeviceRequest
     */
    push_provider: VideoCreateDeviceRequestPushProviderEnum;
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
 * @interface VideoCreateExternalStorageRequest
 */
export interface VideoCreateExternalStorageRequest {
    /**
     * 
     * @type {VideoS3Request}
     * @memberof VideoCreateExternalStorageRequest
     */
    aws_s3?: VideoS3Request;
    /**
     * 
     * @type {VideoAzureRequest}
     * @memberof VideoCreateExternalStorageRequest
     */
    azure_blob?: VideoAzureRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateExternalStorageRequest
     */
    bucket: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateExternalStorageRequest
     */
    gcs_credentials?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateExternalStorageRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateExternalStorageRequest
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoCreateExternalStorageRequest
     */
    storage_type: VideoCreateExternalStorageRequestStorageTypeEnum;
}


/**
 * @export
 */
export const VideoCreateExternalStorageRequestStorageTypeEnum = {
    S3: 's3',
    GCS: 'gcs',
    ABS: 'abs'
} as const;
export type VideoCreateExternalStorageRequestStorageTypeEnum = typeof VideoCreateExternalStorageRequestStorageTypeEnum[keyof typeof VideoCreateExternalStorageRequestStorageTypeEnum];

/**
 * 
 * @export
 * @interface VideoCreateExternalStorageResponse
 */
export interface VideoCreateExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoCreateExternalStorageResponse
     */
    duration: string;
}
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
 * 
 * @export
 * @interface VideoDeleteCallRequest
 */
export interface VideoDeleteCallRequest {
    /**
     * if true the call will be hard deleted along with all related data
     * @type {boolean}
     * @memberof VideoDeleteCallRequest
     */
    hard?: boolean;
}
/**
 * 
 * @export
 * @interface VideoDeleteCallResponse
 */
export interface VideoDeleteCallResponse {
    /**
     * 
     * @type {VideoCallResponse}
     * @memberof VideoDeleteCallResponse
     */
    call: VideoCallResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoDeleteCallResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof VideoDeleteCallResponse
     */
    task_id?: string;
}
/**
 * 
 * @export
 * @interface VideoDeleteExternalStorageResponse
 */
export interface VideoDeleteExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoDeleteExternalStorageResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoDeleteRecordingResponse
 */
export interface VideoDeleteRecordingResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoDeleteRecordingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoDeleteTranscriptionResponse
 */
export interface VideoDeleteTranscriptionResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoDeleteTranscriptionResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoDevice
 */
export interface VideoDevice {
    /**
     * 
     * @type {string}
     * @memberof VideoDevice
     */
    created_at: string;
    /**
     * 
     * @type {boolean}
     * @memberof VideoDevice
     */
    disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoDevice
     */
    disabled_reason?: string;
    /**
     * Device ID
     * @type {string}
     * @memberof VideoDevice
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VideoDevice
     */
    push_provider: VideoDevicePushProviderEnum;
    /**
     * Name of the push provider configuration
     * @type {string}
     * @memberof VideoDevice
     */
    push_provider_name?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoDevice
     */
    user_id: string;
    /**
     * 
     * @type {boolean}
     * @memberof VideoDevice
     */
    voip?: boolean;
}


/**
 * @export
 */
export const VideoDevicePushProviderEnum = {
    FIREBASE: 'firebase',
    APN: 'apn',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi'
} as const;
export type VideoDevicePushProviderEnum = typeof VideoDevicePushProviderEnum[keyof typeof VideoDevicePushProviderEnum];

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
    apns?: VideoAPNS;
    /**
     * 
     * @type {boolean}
     * @memberof VideoEventNotificationSettings
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface VideoExternalStorageResponse
 */
export interface VideoExternalStorageResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoExternalStorageResponse
     */
    bucket: string;
    /**
     * 
     * @type {string}
     * @memberof VideoExternalStorageResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof VideoExternalStorageResponse
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof VideoExternalStorageResponse
     */
    type: VideoExternalStorageResponseTypeEnum;
}


/**
 * @export
 */
export const VideoExternalStorageResponseTypeEnum = {
    S3: 's3',
    GCS: 'gcs',
    ABS: 'abs'
} as const;
export type VideoExternalStorageResponseTypeEnum = typeof VideoExternalStorageResponseTypeEnum[keyof typeof VideoExternalStorageResponseTypeEnum];

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
 * @interface VideoGeofenceSettingsResponse
 */
export interface VideoGeofenceSettingsResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoGeofenceSettingsResponse
     */
    names: Array<string>;
}
/**
 * 
 * @export
 * @interface VideoGeolocationResult
 */
export interface VideoGeolocationResult {
    /**
     * 
     * @type {number}
     * @memberof VideoGeolocationResult
     */
    accuracy_radius: number;
    /**
     * 
     * @type {string}
     * @memberof VideoGeolocationResult
     */
    city: string;
    /**
     * 
     * @type {string}
     * @memberof VideoGeolocationResult
     */
    continent: string;
    /**
     * 
     * @type {string}
     * @memberof VideoGeolocationResult
     */
    continent_code: string;
    /**
     * 
     * @type {string}
     * @memberof VideoGeolocationResult
     */
    country: string;
    /**
     * 
     * @type {string}
     * @memberof VideoGeolocationResult
     */
    country_iso_code: string;
    /**
     * 
     * @type {number}
     * @memberof VideoGeolocationResult
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof VideoGeolocationResult
     */
    longitude: number;
    /**
     * 
     * @type {string}
     * @memberof VideoGeolocationResult
     */
    subdivision: string;
    /**
     * 
     * @type {string}
     * @memberof VideoGeolocationResult
     */
    subdivision_iso_code: string;
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
     * @type {Array<VideoOwnCapability>}
     * @memberof VideoGetCallResponse
     */
    own_capabilities: Array<VideoOwnCapability>;
}
/**
 * 
 * @export
 * @interface VideoGetCallStatsResponse
 */
export interface VideoGetCallStatsResponse {
    /**
     * 
     * @type {number}
     * @memberof VideoGetCallStatsResponse
     */
    call_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof VideoGetCallStatsResponse
     */
    call_status: string;
    /**
     * 
     * @type {VideoCallTimeline}
     * @memberof VideoGetCallStatsResponse
     */
    call_timeline?: VideoCallTimeline;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoGetCallStatsResponse
     */
    duration: string;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoGetCallStatsResponse
     */
    jitter?: VideoStats;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoGetCallStatsResponse
     */
    latency?: VideoStats;
    /**
     * 
     * @type {number}
     * @memberof VideoGetCallStatsResponse
     */
    max_freezes_duration_seconds: number;
    /**
     * 
     * @type {number}
     * @memberof VideoGetCallStatsResponse
     */
    max_participants: number;
    /**
     * 
     * @type {number}
     * @memberof VideoGetCallStatsResponse
     */
    max_total_quality_limitation_duration_seconds: number;
    /**
     * 
     * @type {Array<VideoUserStats>}
     * @memberof VideoGetCallStatsResponse
     */
    participant_report: Array<VideoUserStats>;
    /**
     * 
     * @type {number}
     * @memberof VideoGetCallStatsResponse
     */
    publishing_participants: number;
    /**
     * 
     * @type {number}
     * @memberof VideoGetCallStatsResponse
     */
    quality_score: number;
    /**
     * 
     * @type {number}
     * @memberof VideoGetCallStatsResponse
     */
    sfu_count: number;
    /**
     * 
     * @type {Array<VideoSFULocationResponse>}
     * @memberof VideoGetCallStatsResponse
     */
    sfus: Array<VideoSFULocationResponse>;
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
     * @type {string}
     * @memberof VideoGetCallTypeResponse
     */
    external_storage?: string;
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
     * @type {string}
     * @memberof VideoGoLiveRequest
     */
    recording_storage_name?: string;
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
    /**
     * 
     * @type {string}
     * @memberof VideoGoLiveRequest
     */
    transcription_storage_name?: string;
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
    quality_tracks: Array<string>;
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
     * @type {VideoLayoutSettingsResponse}
     * @memberof VideoHLSSettingsResponse
     */
    layout: VideoLayoutSettingsResponse;
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
 * @interface VideoLayoutSettingsResponse
 */
export interface VideoLayoutSettingsResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettingsResponse
     */
    external_app_url: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettingsResponse
     */
    external_css_url: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLayoutSettingsResponse
     */
    name: VideoLayoutSettingsResponseNameEnum;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoLayoutSettingsResponse
     */
    options?: { [key: string]: any; };
}


/**
 * @export
 */
export const VideoLayoutSettingsResponseNameEnum = {
    SPOTLIGHT: 'spotlight',
    GRID: 'grid',
    SINGLE_PARTICIPANT: 'single-participant',
    MOBILE: 'mobile',
    CUSTOM: 'custom'
} as const;
export type VideoLayoutSettingsResponseNameEnum = typeof VideoLayoutSettingsResponseNameEnum[keyof typeof VideoLayoutSettingsResponseNameEnum];

/**
 * 
 * @export
 * @interface VideoLimitsSettingsRequest
 */
export interface VideoLimitsSettingsRequest {
    /**
     * 
     * @type {number}
     * @memberof VideoLimitsSettingsRequest
     */
    max_duration_seconds?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoLimitsSettingsRequest
     */
    max_participants?: number;
}
/**
 * 
 * @export
 * @interface VideoLimitsSettingsResponse
 */
export interface VideoLimitsSettingsResponse {
    /**
     * 
     * @type {number}
     * @memberof VideoLimitsSettingsResponse
     */
    max_duration_seconds?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoLimitsSettingsResponse
     */
    max_participants?: number;
}
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
 * @interface VideoListExternalStorageResponse
 */
export interface VideoListExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoListExternalStorageResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: VideoExternalStorageResponse; }}
     * @memberof VideoListExternalStorageResponse
     */
    external_storages: { [key: string]: VideoExternalStorageResponse; };
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
 * @interface VideoListTranscriptionsResponse
 */
export interface VideoListTranscriptionsResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoListTranscriptionsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoCallTranscription>}
     * @memberof VideoListTranscriptionsResponse
     */
    transcriptions: Array<VideoCallTranscription>;
}
/**
 * 
 * @export
 * @interface VideoLocation
 */
export interface VideoLocation {
    /**
     * 
     * @type {string}
     * @memberof VideoLocation
     */
    continent_code: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLocation
     */
    country_iso_code: string;
    /**
     * 
     * @type {string}
     * @memberof VideoLocation
     */
    subdivision_iso_code: string;
}
/**
 * 
 * @export
 * @interface VideoMOSStats
 */
export interface VideoMOSStats {
    /**
     * 
     * @type {number}
     * @memberof VideoMOSStats
     */
    average_score: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof VideoMOSStats
     */
    histogram_duration_seconds: Array<number>;
    /**
     * 
     * @type {number}
     * @memberof VideoMOSStats
     */
    max_score: number;
    /**
     * 
     * @type {number}
     * @memberof VideoMOSStats
     */
    min_score: number;
}
/**
 * 
 * @export
 * @interface VideoMediaPubSubHint
 */
export interface VideoMediaPubSubHint {
    /**
     * 
     * @type {boolean}
     * @memberof VideoMediaPubSubHint
     */
    audio_published: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoMediaPubSubHint
     */
    audio_subscribed: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoMediaPubSubHint
     */
    video_published: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoMediaPubSubHint
     */
    video_subscribed: boolean;
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
     * @type {VideoUserRequest}
     * @memberof VideoMuteUsersRequest
     */
    muted_by?: VideoUserRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoMuteUsersRequest
     */
    muted_by_id?: string;
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
 * @interface VideoNoiseCancellationSettings
 */
export interface VideoNoiseCancellationSettings {
    /**
     * 
     * @type {string}
     * @memberof VideoNoiseCancellationSettings
     */
    mode: VideoNoiseCancellationSettingsModeEnum;
}


/**
 * @export
 */
export const VideoNoiseCancellationSettingsModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type VideoNoiseCancellationSettingsModeEnum = typeof VideoNoiseCancellationSettingsModeEnum[keyof typeof VideoNoiseCancellationSettingsModeEnum];

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
    call_live_started?: VideoEventNotificationSettings;
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    call_missed?: VideoEventNotificationSettings;
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    call_notification?: VideoEventNotificationSettings;
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    call_ring?: VideoEventNotificationSettings;
    /**
     * 
     * @type {boolean}
     * @memberof VideoNotificationSettings
     */
    enabled?: boolean;
    /**
     * 
     * @type {VideoEventNotificationSettings}
     * @memberof VideoNotificationSettings
     */
    session_started?: VideoEventNotificationSettings;
}
/**
 * 
 * @export
 * @interface VideoNullBool
 */
export interface VideoNullBool {
    /**
     * 
     * @type {boolean}
     * @memberof VideoNullBool
     */
    HasValue?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoNullBool
     */
    Value?: boolean;
}
/**
 * 
 * @export
 * @interface VideoNullTime
 */
export interface VideoNullTime {
    /**
     * 
     * @type {boolean}
     * @memberof VideoNullTime
     */
    HasValue?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoNullTime
     */
    Value?: string;
}

/**
 * All possibility of string to use
 * @export
 */
export const VideoOwnCapability = {
    BLOCK_USERS: 'block-users',
    CHANGE_MAX_DURATION: 'change-max-duration',
    CREATE_CALL: 'create-call',
    CREATE_REACTION: 'create-reaction',
    ENABLE_NOISE_CANCELLATION: 'enable-noise-cancellation',
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
 * @interface VideoPrivacySettings
 */
export interface VideoPrivacySettings {
    /**
     * 
     * @type {VideoReadReceipts}
     * @memberof VideoPrivacySettings
     */
    read_receipts?: VideoReadReceipts;
    /**
     * 
     * @type {VideoTypingIndicators}
     * @memberof VideoPrivacySettings
     */
    typing_indicators?: VideoTypingIndicators;
}
/**
 * 
 * @export
 * @interface VideoPublishedTrackInfo
 */
export interface VideoPublishedTrackInfo {
    /**
     * 
     * @type {string}
     * @memberof VideoPublishedTrackInfo
     */
    codec_mime_type?: string;
    /**
     * 
     * @type {number}
     * @memberof VideoPublishedTrackInfo
     */
    duration_seconds?: number;
    /**
     * 
     * @type {string}
     * @memberof VideoPublishedTrackInfo
     */
    track_type?: string;
}
/**
 * 
 * @export
 * @interface VideoPushNotificationSettings
 */
export interface VideoPushNotificationSettings {
    /**
     * 
     * @type {boolean}
     * @memberof VideoPushNotificationSettings
     */
    disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoPushNotificationSettings
     */
    disabled_until?: string;
}
/**
 * 
 * @export
 * @interface VideoPushNotificationSettingsInput
 */
export interface VideoPushNotificationSettingsInput {
    /**
     * 
     * @type {VideoNullBool}
     * @memberof VideoPushNotificationSettingsInput
     */
    disabled?: VideoNullBool;
    /**
     * 
     * @type {VideoNullTime}
     * @memberof VideoPushNotificationSettingsInput
     */
    disabled_until?: VideoNullTime;
}
/**
 * 
 * @export
 * @interface VideoQueryCallMembersRequest
 */
export interface VideoQueryCallMembersRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoQueryCallMembersRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallMembersRequest
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof VideoQueryCallMembersRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallMembersRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallMembersRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<VideoSortParam>}
     * @memberof VideoQueryCallMembersRequest
     */
    sort?: Array<VideoSortParam>;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallMembersRequest
     */
    type: string;
}
/**
 * 
 * @export
 * @interface VideoQueryCallMembersResponse
 */
export interface VideoQueryCallMembersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoQueryCallMembersResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<VideoMemberResponse>}
     * @memberof VideoQueryCallMembersResponse
     */
    members: Array<VideoMemberResponse>;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallMembersResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallMembersResponse
     */
    prev?: string;
}
/**
 * 
 * @export
 * @interface VideoQueryCallStatsRequest
 */
export interface VideoQueryCallStatsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoQueryCallStatsRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof VideoQueryCallStatsRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallStatsRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallStatsRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<VideoSortParam>}
     * @memberof VideoQueryCallStatsRequest
     */
    sort?: Array<VideoSortParam>;
}
/**
 * 
 * @export
 * @interface VideoQueryCallStatsResponse
 */
export interface VideoQueryCallStatsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoQueryCallStatsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallStatsResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoQueryCallStatsResponse
     */
    prev?: string;
    /**
     * 
     * @type {Array<VideoCallStatsReportSummaryResponse>}
     * @memberof VideoQueryCallStatsResponse
     */
    reports: Array<VideoCallStatsReportSummaryResponse>;
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
     * @type {Array<VideoSortParam>}
     * @memberof VideoQueryCallsRequest
     */
    sort?: Array<VideoSortParam>;
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
 * @interface VideoReadReceipts
 */
export interface VideoReadReceipts {
    /**
     * 
     * @type {boolean}
     * @memberof VideoReadReceipts
     */
    enabled?: boolean;
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
     * @type {VideoLayoutSettingsResponse}
     * @memberof VideoRecordSettingsResponse
     */
    layout: VideoLayoutSettingsResponse;
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
 * @interface VideoRingSettingsRequest
 */
export interface VideoRingSettingsRequest {
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsRequest
     */
    auto_cancel_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsRequest
     */
    incoming_call_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsRequest
     */
    missed_call_timeout_ms?: number;
}
/**
 * 
 * @export
 * @interface VideoRingSettingsResponse
 */
export interface VideoRingSettingsResponse {
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsResponse
     */
    auto_cancel_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsResponse
     */
    incoming_call_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof VideoRingSettingsResponse
     */
    missed_call_timeout_ms: number;
}
/**
 * 
 * @export
 * @interface VideoS3Request
 */
export interface VideoS3Request {
    /**
     * 
     * @type {string}
     * @memberof VideoS3Request
     */
    s3_api_key?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoS3Request
     */
    s3_region: string;
    /**
     * 
     * @type {string}
     * @memberof VideoS3Request
     */
    s3_secret?: string;
}
/**
 * 
 * @export
 * @interface VideoSFULocationResponse
 */
export interface VideoSFULocationResponse {
    /**
     * 
     * @type {VideoCoordinates}
     * @memberof VideoSFULocationResponse
     */
    coordinates: VideoCoordinates;
    /**
     * 
     * @type {string}
     * @memberof VideoSFULocationResponse
     */
    datacenter: string;
    /**
     * 
     * @type {string}
     * @memberof VideoSFULocationResponse
     */
    id: string;
    /**
     * 
     * @type {VideoLocation}
     * @memberof VideoSFULocationResponse
     */
    location: VideoLocation;
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
    /**
     * 
     * @type {VideoTargetResolution}
     * @memberof VideoScreensharingSettingsRequest
     */
    target_resolution?: VideoTargetResolution;
}
/**
 * 
 * @export
 * @interface VideoScreensharingSettingsResponse
 */
export interface VideoScreensharingSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoScreensharingSettingsResponse
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoScreensharingSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {VideoTargetResolution}
     * @memberof VideoScreensharingSettingsResponse
     */
    target_resolution?: VideoTargetResolution;
}
/**
 * 
 * @export
 * @interface VideoSendCallEventRequest
 */
export interface VideoSendCallEventRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoSendCallEventRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {VideoUserRequest}
     * @memberof VideoSendCallEventRequest
     */
    user?: VideoUserRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoSendCallEventRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface VideoSendCallEventResponse
 */
export interface VideoSendCallEventResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoSendCallEventResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface VideoSortParam
 */
export interface VideoSortParam {
    /**
     * Direction of sorting, -1 for descending, 1 for ascending
     * @type {number}
     * @memberof VideoSortParam
     */
    direction?: number;
    /**
     * Name of field to sort by
     * @type {string}
     * @memberof VideoSortParam
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
 * @interface VideoStartRecordingRequest
 */
export interface VideoStartRecordingRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoStartRecordingRequest
     */
    recording_external_storage?: string;
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
 * @interface VideoStartTranscriptionRequest
 */
export interface VideoStartTranscriptionRequest {
    /**
     * 
     * @type {string}
     * @memberof VideoStartTranscriptionRequest
     */
    transcription_external_storage?: string;
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
 * @interface VideoStats
 */
export interface VideoStats {
    /**
     * 
     * @type {number}
     * @memberof VideoStats
     */
    average_seconds: number;
    /**
     * 
     * @type {number}
     * @memberof VideoStats
     */
    max_seconds: number;
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
 * @interface VideoSubsession
 */
export interface VideoSubsession {
    /**
     * 
     * @type {number}
     * @memberof VideoSubsession
     */
    ended_at: number;
    /**
     * 
     * @type {number}
     * @memberof VideoSubsession
     */
    joined_at: number;
    /**
     * 
     * @type {VideoMediaPubSubHint}
     * @memberof VideoSubsession
     */
    pub_sub_hint?: VideoMediaPubSubHint;
    /**
     * 
     * @type {string}
     * @memberof VideoSubsession
     */
    sfu_id: string;
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
    bitrate?: number;
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
 * @interface VideoThumbnailsSettingsResponse
 */
export interface VideoThumbnailsSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoThumbnailsSettingsResponse
     */
    enabled: boolean;
}
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
     * @type {Array<string>}
     * @memberof VideoTranscriptionSettingsRequest
     */
    languages?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof VideoTranscriptionSettingsRequest
     */
    mode: VideoTranscriptionSettingsRequestModeEnum;
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
 * @interface VideoTranscriptionSettingsResponse
 */
export interface VideoTranscriptionSettingsResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoTranscriptionSettingsResponse
     */
    closed_caption_mode: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoTranscriptionSettingsResponse
     */
    languages: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof VideoTranscriptionSettingsResponse
     */
    mode: VideoTranscriptionSettingsResponseModeEnum;
}


/**
 * @export
 */
export const VideoTranscriptionSettingsResponseModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type VideoTranscriptionSettingsResponseModeEnum = typeof VideoTranscriptionSettingsResponseModeEnum[keyof typeof VideoTranscriptionSettingsResponseModeEnum];

/**
 * 
 * @export
 * @interface VideoTypingIndicators
 */
export interface VideoTypingIndicators {
    /**
     * 
     * @type {boolean}
     * @memberof VideoTypingIndicators
     */
    enabled?: boolean;
}
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
     * @type {string}
     * @memberof VideoUpdateCallTypeRequest
     */
    external_storage?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof VideoUpdateCallTypeRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {VideoNotificationSettings}
     * @memberof VideoUpdateCallTypeRequest
     */
    notification_settings?: VideoNotificationSettings;
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
     * @type {string}
     * @memberof VideoUpdateCallTypeResponse
     */
    external_storage?: string;
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
 * @interface VideoUpdateExternalStorageRequest
 */
export interface VideoUpdateExternalStorageRequest {
    /**
     * 
     * @type {VideoS3Request}
     * @memberof VideoUpdateExternalStorageRequest
     */
    aws_s3?: VideoS3Request;
    /**
     * 
     * @type {VideoAzureRequest}
     * @memberof VideoUpdateExternalStorageRequest
     */
    azure_blob?: VideoAzureRequest;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageRequest
     */
    bucket: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageRequest
     */
    gcs_credentials?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageRequest
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageRequest
     */
    storage_type: VideoUpdateExternalStorageRequestStorageTypeEnum;
}


/**
 * @export
 */
export const VideoUpdateExternalStorageRequestStorageTypeEnum = {
    S3: 's3',
    GCS: 'gcs',
    ABS: 'abs'
} as const;
export type VideoUpdateExternalStorageRequestStorageTypeEnum = typeof VideoUpdateExternalStorageRequestStorageTypeEnum[keyof typeof VideoUpdateExternalStorageRequestStorageTypeEnum];

/**
 * 
 * @export
 * @interface VideoUpdateExternalStorageResponse
 */
export interface VideoUpdateExternalStorageResponse {
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageResponse
     */
    bucket: string;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof VideoUpdateExternalStorageResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageResponse
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUpdateExternalStorageResponse
     */
    type: VideoUpdateExternalStorageResponseTypeEnum;
}


/**
 * @export
 */
export const VideoUpdateExternalStorageResponseTypeEnum = {
    S3: 's3',
    GCS: 'gcs',
    ABS: 'abs'
} as const;
export type VideoUpdateExternalStorageResponseTypeEnum = typeof VideoUpdateExternalStorageResponseTypeEnum[keyof typeof VideoUpdateExternalStorageResponseTypeEnum];

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
 * 
 * @export
 * @interface VideoUserInfoResponse
 */
export interface VideoUserInfoResponse {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof VideoUserInfoResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof VideoUserInfoResponse
     */
    image: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserInfoResponse
     */
    name: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoUserInfoResponse
     */
    roles: Array<string>;
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
     * 
     * @type {boolean}
     * @memberof VideoUserRequest
     */
    invisible?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoUserRequest
     */
    language?: string;
    /**
     * Optional name of user
     * @type {string}
     * @memberof VideoUserRequest
     */
    name?: string;
    /**
     * 
     * @type {VideoPrivacySettings}
     * @memberof VideoUserRequest
     */
    privacy_settings?: VideoPrivacySettings;
    /**
     * 
     * @type {VideoPushNotificationSettingsInput}
     * @memberof VideoUserRequest
     */
    push_notifications?: VideoPushNotificationSettingsInput;
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
     * 
     * @type {boolean}
     * @memberof VideoUserResponse
     */
    banned: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof VideoUserResponse
     */
    blocked_user_ids: Array<string>;
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
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    deactivated_at?: string;
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof VideoUserResponse
     */
    deleted_at?: string;
    /**
     * 
     * @type {Array<VideoDevice>}
     * @memberof VideoUserResponse
     */
    devices: Array<VideoDevice>;
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
     * @type {boolean}
     * @memberof VideoUserResponse
     */
    invisible: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    language: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    last_active?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof VideoUserResponse
     */
    online: boolean;
    /**
     * 
     * @type {VideoPushNotificationSettings}
     * @memberof VideoUserResponse
     */
    push_notifications?: VideoPushNotificationSettings;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    revoke_tokens_issued_before?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserResponse
     */
    role: string;
    /**
     * 
     * @type {boolean}
     * @memberof VideoUserResponse
     */
    shadow_banned: boolean;
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
 * 
 * @export
 * @interface VideoUserSessionStats
 */
export interface VideoUserSessionStats {
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    browser?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    browser_version?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    current_ip?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    current_sfu?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    device_model?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    device_version?: string;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    distance_to_sfu_kilometers?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    freeze_duration_seconds: number;
    /**
     * 
     * @type {VideoGeolocationResult}
     * @memberof VideoUserSessionStats
     */
    geolocation?: VideoGeolocationResult;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoUserSessionStats
     */
    jitter?: VideoStats;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoUserSessionStats
     */
    latency?: VideoStats;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    max_fir_per_second?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    max_freeze_fraction: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    max_freezes_duration_seconds: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    max_freezes_per_second?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    max_nack_per_second?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    max_pli_per_second?: number;
    /**
     * 
     * @type {VideoVideoQuality}
     * @memberof VideoUserSessionStats
     */
    max_publishing_video_quality?: VideoVideoQuality;
    /**
     * 
     * @type {VideoVideoQuality}
     * @memberof VideoUserSessionStats
     */
    max_receiving_video_quality?: VideoVideoQuality;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    os?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    os_version?: string;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    packet_loss_fraction: number;
    /**
     * 
     * @type {VideoMediaPubSubHint}
     * @memberof VideoUserSessionStats
     */
    pub_sub_hints?: VideoMediaPubSubHint;
    /**
     * 
     * @type {Array<VideoPublishedTrackInfo>}
     * @memberof VideoUserSessionStats
     */
    published_tracks?: Array<VideoPublishedTrackInfo>;
    /**
     * 
     * @type {VideoMOSStats}
     * @memberof VideoUserSessionStats
     */
    publisher_audio_mos?: VideoMOSStats;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoUserSessionStats
     */
    publisher_jitter?: VideoStats;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoUserSessionStats
     */
    publisher_latency?: VideoStats;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    publisher_noise_cancellation_seconds?: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    publisher_packet_loss_fraction: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    publisher_quality_limitation_fraction?: number;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof VideoUserSessionStats
     */
    publisher_video_quality_limitation_duration_seconds?: { [key: string]: number; };
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    publishing_audio_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    publishing_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    publishing_video_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    quality_score: number;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    receiving_audio_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    receiving_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    receiving_video_codec?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    sdk?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    sdk_version?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    session_id: string;
    /**
     * 
     * @type {VideoMOSStats}
     * @memberof VideoUserSessionStats
     */
    subscriber_audio_mos?: VideoMOSStats;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoUserSessionStats
     */
    subscriber_jitter?: VideoStats;
    /**
     * 
     * @type {VideoStats}
     * @memberof VideoUserSessionStats
     */
    subscriber_latency?: VideoStats;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    subscriber_video_quality_throttled_duration_seconds?: number;
    /**
     * 
     * @type {Array<VideoSubsession>}
     * @memberof VideoUserSessionStats
     */
    subsessions?: Array<VideoSubsession>;
    /**
     * 
     * @type {VideoCallTimeline}
     * @memberof VideoUserSessionStats
     */
    timeline?: VideoCallTimeline;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    total_pixels_in: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserSessionStats
     */
    total_pixels_out: number;
    /**
     * 
     * @type {string}
     * @memberof VideoUserSessionStats
     */
    webrtc_version?: string;
}
/**
 * 
 * @export
 * @interface VideoUserStats
 */
export interface VideoUserStats {
    /**
     * 
     * @type {VideoUserInfoResponse}
     * @memberof VideoUserStats
     */
    info: VideoUserInfoResponse;
    /**
     * 
     * @type {number}
     * @memberof VideoUserStats
     */
    min_event_ts: number;
    /**
     * 
     * @type {number}
     * @memberof VideoUserStats
     */
    rating?: number;
    /**
     * 
     * @type {Array<VideoUserSessionStats>}
     * @memberof VideoUserStats
     */
    session_stats: Array<VideoUserSessionStats>;
}
/**
 * 
 * @export
 * @interface VideoVideoQuality
 */
export interface VideoVideoQuality {
    /**
     * 
     * @type {VideoVideoResolution}
     * @memberof VideoVideoQuality
     */
    resolution?: VideoVideoResolution;
    /**
     * 
     * @type {string}
     * @memberof VideoVideoQuality
     */
    usage_type?: string;
}
/**
 * 
 * @export
 * @interface VideoVideoResolution
 */
export interface VideoVideoResolution {
    /**
     * 
     * @type {number}
     * @memberof VideoVideoResolution
     */
    height: number;
    /**
     * 
     * @type {number}
     * @memberof VideoVideoResolution
     */
    width: number;
}
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
     * @type {VideoTargetResolution}
     * @memberof VideoVideoSettingsRequest
     */
    target_resolution?: VideoTargetResolution;
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
 * @interface VideoVideoSettingsResponse
 */
export interface VideoVideoSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettingsResponse
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettingsResponse
     */
    camera_default_on: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoVideoSettingsResponse
     */
    camera_facing: VideoVideoSettingsResponseCameraFacingEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoVideoSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {VideoTargetResolution}
     * @memberof VideoVideoSettingsResponse
     */
    target_resolution: VideoTargetResolution;
}


/**
 * @export
 */
export const VideoVideoSettingsResponseCameraFacingEnum = {
    FRONT: 'front',
    BACK: 'back',
    EXTERNAL: 'external'
} as const;
export type VideoVideoSettingsResponseCameraFacingEnum = typeof VideoVideoSettingsResponseCameraFacingEnum[keyof typeof VideoVideoSettingsResponseCameraFacingEnum];

