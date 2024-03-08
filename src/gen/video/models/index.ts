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
     * @type {object}
     * @memberof VideoCallRequest
     */
    custom?: object;
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
     * @type {object}
     * @memberof VideoCallResponse
     */
    custom: object;
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
}
/**
 * 
 * @export
 * @interface VideoConnectUserDetailsRequest
 */
export interface VideoConnectUserDetailsRequest {
    /**
     * 
     * @type {object}
     * @memberof VideoConnectUserDetailsRequest
     */
    custom?: object;
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
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof VideoConnectUserDetailsRequest
     */
    name?: string;
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
    storage_type: string;
}
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
    type: string;
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
     * @type {object}
     * @memberof VideoLayoutSettings
     */
    options?: object;
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
     * @type {object}
     * @memberof VideoLayoutSettingsRequest
     */
    options?: object;
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
 * @interface VideoMemberRequest
 */
export interface VideoMemberRequest {
    /**
     * Custom data for this object
     * @type {object}
     * @memberof VideoMemberRequest
     */
    custom?: object;
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
     * @type {object}
     * @memberof VideoMemberResponse
     */
    custom: object;
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
     * @type {object}
     * @memberof VideoQueryCallsRequest
     */
    filter_conditions?: object;
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
     * @type {object}
     * @memberof VideoQueryMembersRequest
     */
    filter_conditions?: object;
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
     * @type {object}
     * @memberof VideoSendEventRequest
     */
    custom?: object;
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
     * @type {object}
     * @memberof VideoUpdateCallRequest
     */
    custom?: object;
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
    storage_type: string;
}
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
    type: string;
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
 * 
 * @export
 * @interface VideoUserRequest
 */
export interface VideoUserRequest {
    /**
     * 
     * @type {object}
     * @memberof VideoUserRequest
     */
    custom?: object;
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
     * @type {object}
     * @memberof VideoUserResponse
     */
    custom: object;
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
    language: string;
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
