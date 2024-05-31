/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface APIError
 */
export interface APIError {
    /**
     * Response HTTP status code
     * @type {number}
     * @memberof APIError
     */
    StatusCode: number;
    /**
     * API error code
     * @type {number}
     * @memberof APIError
     */
    code: number;
    /**
     * Additional error-specific information
     * @type {Array<number>}
     * @memberof APIError
     */
    details: Array<number>;
    /**
     * Request duration
     * @type {string}
     * @memberof APIError
     */
    duration: string;
    /**
     * Additional error info
     * @type {{ [key: string]: string; }}
     * @memberof APIError
     */
    exception_fields?: { [key: string]: string; };
    /**
     * Message describing an error
     * @type {string}
     * @memberof APIError
     */
    message: string;
    /**
     * URL with additional information
     * @type {string}
     * @memberof APIError
     */
    more_info: string;
}
/**
 * 
 * @export
 * @interface APNConfig
 */
export interface APNConfig {
    /**
     * 
     * @type {boolean}
     * @memberof APNConfig
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    auth_key?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    auth_type?: APNConfigAuthTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    bundle_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof APNConfig
     */
    development?: boolean;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    host?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    key_id?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    p12_cert?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfig
     */
    team_id?: string;
}


/**
 * @export
 */
export const APNConfigAuthTypeEnum = {
    CERTIFICATE: 'certificate',
    TOKEN: 'token'
} as const;
export type APNConfigAuthTypeEnum = typeof APNConfigAuthTypeEnum[keyof typeof APNConfigAuthTypeEnum];

/**
 * 
 * @export
 * @interface APNConfigFields
 */
export interface APNConfigFields {
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    auth_key?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    auth_type?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    bundle_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof APNConfigFields
     */
    development: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof APNConfigFields
     */
    enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    host?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    key_id?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    notification_template: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    p12_cert?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigFields
     */
    team_id?: string;
}
/**
 * 
 * @export
 * @interface APNS
 */
export interface APNS {
    /**
     * 
     * @type {string}
     * @memberof APNS
     */
    body: string;
    /**
     * 
     * @type {string}
     * @memberof APNS
     */
    title: string;
}
/**
 * 
 * @export
 * @interface Action
 */
export interface Action {
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    style?: string;
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    text: string;
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    value?: string;
}
/**
 * 
 * @export
 * @interface AppResponseFields
 */
export interface AppResponseFields {
    /**
     * 
     * @type {Config}
     * @memberof AppResponseFields
     */
    agora_options?: Config;
    /**
     * 
     * @type {Array<string>}
     * @memberof AppResponseFields
     */
    allowed_flag_reasons?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    async_url_enrich_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    auto_translation_enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    before_message_send_hook_url?: string;
    /**
     * 
     * @type {{ [key: string]: CallType; }}
     * @memberof AppResponseFields
     */
    call_types: { [key: string]: CallType; };
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    campaign_enabled: boolean;
    /**
     * 
     * @type {number}
     * @memberof AppResponseFields
     */
    cdn_expiration_seconds: number;
    /**
     * 
     * @type {{ [key: string]: ChannelConfig; }}
     * @memberof AppResponseFields
     */
    channel_configs: { [key: string]: ChannelConfig; };
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    custom_action_handler_url: string;
    /**
     * 
     * @type {DataDogInfo}
     * @memberof AppResponseFields
     */
    datadog_info?: DataDogInfo;
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    disable_auth_checks: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    disable_permissions_checks: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    enforce_unique_usernames: string;
    /**
     * 
     * @type {FileUploadConfig}
     * @memberof AppResponseFields
     */
    file_upload_config: FileUploadConfig;
    /**
     * 
     * @type {Array<GeofenceResponse>}
     * @memberof AppResponseFields
     */
    geofences?: Array<GeofenceResponse>;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof AppResponseFields
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {Config}
     * @memberof AppResponseFields
     */
    hms_options?: Config;
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    image_moderation_enabled: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof AppResponseFields
     */
    image_moderation_labels?: Array<string>;
    /**
     * 
     * @type {FileUploadConfig}
     * @memberof AppResponseFields
     */
    image_upload_config: FileUploadConfig;
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    multi_tenant_enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    organization: string;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    permission_version: string;
    /**
     * 
     * @type {{ [key: string]: Array<Policy>; }}
     * @memberof AppResponseFields
     */
    policies: { [key: string]: Array<Policy>; };
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    polls_enabled: boolean;
    /**
     * 
     * @type {PushNotificationFields}
     * @memberof AppResponseFields
     */
    push_notifications: PushNotificationFields;
    /**
     * 
     * @type {number}
     * @memberof AppResponseFields
     */
    reminders_interval: number;
    /**
     * 
     * @type {number}
     * @memberof AppResponseFields
     */
    revoke_tokens_issued_before?: number;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    sns_key: string;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    sns_secret: string;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    sns_topic_arn: string;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    sqs_key: string;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    sqs_secret: string;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    sqs_url: string;
    /**
     * 
     * @type {boolean}
     * @memberof AppResponseFields
     */
    suspended: boolean;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    suspended_explanation: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AppResponseFields
     */
    user_search_disallowed_roles: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    video_provider: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AppResponseFields
     */
    webhook_events: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AppResponseFields
     */
    webhook_url: string;
}
/**
 * 
 * @export
 * @interface AsyncModerationCallbackConfig
 */
export interface AsyncModerationCallbackConfig {
    /**
     * 
     * @type {string}
     * @memberof AsyncModerationCallbackConfig
     */
    mode?: AsyncModerationCallbackConfigModeEnum;
    /**
     * 
     * @type {string}
     * @memberof AsyncModerationCallbackConfig
     */
    server_url?: string;
}


/**
 * @export
 */
export const AsyncModerationCallbackConfigModeEnum = {
    NONE: 'CALLBACK_MODE_NONE',
    REST: 'CALLBACK_MODE_REST',
    TWIRP: 'CALLBACK_MODE_TWIRP'
} as const;
export type AsyncModerationCallbackConfigModeEnum = typeof AsyncModerationCallbackConfigModeEnum[keyof typeof AsyncModerationCallbackConfigModeEnum];

/**
 * 
 * @export
 * @interface AsyncModerationConfiguration
 */
export interface AsyncModerationConfiguration {
    /**
     * 
     * @type {AsyncModerationCallbackConfig}
     * @memberof AsyncModerationConfiguration
     */
    callback?: AsyncModerationCallbackConfig;
    /**
     * 
     * @type {number}
     * @memberof AsyncModerationConfiguration
     */
    timeout_ms?: number;
}
/**
 * 
 * @export
 * @interface Attachment
 */
export interface Attachment {
    /**
     * 
     * @type {Array<Action>}
     * @memberof Attachment
     */
    actions?: Array<Action>;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    asset_url?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    author_icon?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    author_link?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    author_name?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    color?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Attachment
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    fallback?: string;
    /**
     * 
     * @type {Array<Field>}
     * @memberof Attachment
     */
    fields?: Array<Field>;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    footer?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    footer_icon?: string;
    /**
     * 
     * @type {Images}
     * @memberof Attachment
     */
    giphy?: Images;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    image_url?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    og_scrape_url?: string;
    /**
     * 
     * @type {number}
     * @memberof Attachment
     */
    original_height?: number;
    /**
     * 
     * @type {number}
     * @memberof Attachment
     */
    original_width?: number;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    pretext?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    text?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    thumb_url?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    title_link?: string;
    /**
     * Attachment type (e.g. image, video, url, poll)
     * @type {string}
     * @memberof Attachment
     */
    type?: string;
}
/**
 * 
 * @export
 * @interface AudioSettings
 */
export interface AudioSettings {
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettings
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof AudioSettings
     */
    default_device: AudioSettingsDefaultDeviceEnum;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettings
     */
    mic_default_on: boolean;
    /**
     * 
     * @type {NoiseCancellationSettings}
     * @memberof AudioSettings
     */
    noise_cancellation?: NoiseCancellationSettings;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettings
     */
    opus_dtx_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettings
     */
    redundant_coding_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettings
     */
    speaker_default_on: boolean;
}


/**
 * @export
 */
export const AudioSettingsDefaultDeviceEnum = {
    SPEAKER: 'speaker',
    EARPIECE: 'earpiece'
} as const;
export type AudioSettingsDefaultDeviceEnum = typeof AudioSettingsDefaultDeviceEnum[keyof typeof AudioSettingsDefaultDeviceEnum];

/**
 * 
 * @export
 * @interface AudioSettingsRequest
 */
export interface AudioSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsRequest
     */
    access_request_enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AudioSettingsRequest
     */
    default_device: AudioSettingsRequestDefaultDeviceEnum;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsRequest
     */
    mic_default_on?: boolean;
    /**
     * 
     * @type {NoiseCancellationSettings}
     * @memberof AudioSettingsRequest
     */
    noise_cancellation?: NoiseCancellationSettings;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsRequest
     */
    opus_dtx_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsRequest
     */
    redundant_coding_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsRequest
     */
    speaker_default_on?: boolean;
}


/**
 * @export
 */
export const AudioSettingsRequestDefaultDeviceEnum = {
    SPEAKER: 'speaker',
    EARPIECE: 'earpiece'
} as const;
export type AudioSettingsRequestDefaultDeviceEnum = typeof AudioSettingsRequestDefaultDeviceEnum[keyof typeof AudioSettingsRequestDefaultDeviceEnum];

/**
 * 
 * @export
 * @interface AudioSettingsResponse
 */
export interface AudioSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsResponse
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof AudioSettingsResponse
     */
    default_device: AudioSettingsResponseDefaultDeviceEnum;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsResponse
     */
    mic_default_on: boolean;
    /**
     * 
     * @type {NoiseCancellationSettings}
     * @memberof AudioSettingsResponse
     */
    noise_cancellation?: NoiseCancellationSettings;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsResponse
     */
    opus_dtx_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsResponse
     */
    redundant_coding_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AudioSettingsResponse
     */
    speaker_default_on: boolean;
}


/**
 * @export
 */
export const AudioSettingsResponseDefaultDeviceEnum = {
    SPEAKER: 'speaker',
    EARPIECE: 'earpiece'
} as const;
export type AudioSettingsResponseDefaultDeviceEnum = typeof AudioSettingsResponseDefaultDeviceEnum[keyof typeof AudioSettingsResponseDefaultDeviceEnum];

/**
 * 
 * @export
 * @interface AutomodDetails
 */
export interface AutomodDetails {
    /**
     * 
     * @type {string}
     * @memberof AutomodDetails
     */
    action?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AutomodDetails
     */
    image_labels?: Array<string>;
    /**
     * 
     * @type {FlagMessageDetails}
     * @memberof AutomodDetails
     */
    message_details?: FlagMessageDetails;
    /**
     * 
     * @type {string}
     * @memberof AutomodDetails
     */
    original_message_type?: string;
    /**
     * 
     * @type {MessageModerationResult}
     * @memberof AutomodDetails
     */
    result?: MessageModerationResult;
}
/**
 * 
 * @export
 * @interface AzureRequest
 */
export interface AzureRequest {
    /**
     * 
     * @type {string}
     * @memberof AzureRequest
     */
    abs_account_name: string;
    /**
     * 
     * @type {string}
     * @memberof AzureRequest
     */
    abs_client_id: string;
    /**
     * 
     * @type {string}
     * @memberof AzureRequest
     */
    abs_client_secret: string;
    /**
     * 
     * @type {string}
     * @memberof AzureRequest
     */
    abs_tenant_id: string;
}
/**
 * 
 * @export
 * @interface BackstageSettings
 */
export interface BackstageSettings {
    /**
     * 
     * @type {boolean}
     * @memberof BackstageSettings
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface BackstageSettingsRequest
 */
export interface BackstageSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof BackstageSettingsRequest
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface BackstageSettingsResponse
 */
export interface BackstageSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof BackstageSettingsResponse
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface BanRequest
 */
export interface BanRequest {
    /**
     * 
     * @type {UserRequest}
     * @memberof BanRequest
     */
    banned_by?: UserRequest;
    /**
     * User ID who issued a ban
     * @type {string}
     * @memberof BanRequest
     */
    banned_by_id?: string;
    /**
     * Channel CID to ban user in eg. messaging:123
     * @type {string}
     * @memberof BanRequest
     */
    channel_cid?: string;
    /**
     * Whether to perform IP ban or not
     * @type {boolean}
     * @memberof BanRequest
     */
    ip_ban?: boolean;
    /**
     * Ban reason
     * @type {string}
     * @memberof BanRequest
     */
    reason?: string;
    /**
     * Whether to perform shadow ban or not
     * @type {boolean}
     * @memberof BanRequest
     */
    shadow?: boolean;
    /**
     * ID of user to ban
     * @type {string}
     * @memberof BanRequest
     */
    target_user_id: string;
    /**
     * Timeout of ban in minutes. User will be unbanned after this period of time
     * @type {number}
     * @memberof BanRequest
     */
    timeout?: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof BanRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof BanRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface BanResponse
 */
export interface BanResponse {
    /**
     * 
     * @type {UserObject}
     * @memberof BanResponse
     */
    banned_by?: UserObject;
    /**
     * 
     * @type {ChannelResponse}
     * @memberof BanResponse
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {number}
     * @memberof BanResponse
     */
    created_at: number;
    /**
     * 
     * @type {number}
     * @memberof BanResponse
     */
    expires?: number;
    /**
     * 
     * @type {string}
     * @memberof BanResponse
     */
    reason?: string;
    /**
     * 
     * @type {boolean}
     * @memberof BanResponse
     */
    shadow?: boolean;
    /**
     * 
     * @type {UserObject}
     * @memberof BanResponse
     */
    user?: UserObject;
}
/**
 * Block list contains restricted words
 * @export
 * @interface BlockList
 */
export interface BlockList {
    /**
     * Date/time of creation
     * @type {number}
     * @memberof BlockList
     */
    created_at?: number;
    /**
     * Block list name
     * @type {string}
     * @memberof BlockList
     */
    name: string;
    /**
     * Block list type.
     * @type {string}
     * @memberof BlockList
     */
    type: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof BlockList
     */
    updated_at?: number;
    /**
     * List of words to block
     * @type {Array<string>}
     * @memberof BlockList
     */
    words: Array<string>;
}
/**
 * 
 * @export
 * @interface BlockListOptions
 */
export interface BlockListOptions {
    /**
     * 
     * @type {string}
     * @memberof BlockListOptions
     */
    behavior: BlockListOptionsBehaviorEnum;
    /**
     * 
     * @type {string}
     * @memberof BlockListOptions
     */
    blocklist: string;
}


/**
 * @export
 */
export const BlockListOptionsBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type BlockListOptionsBehaviorEnum = typeof BlockListOptionsBehaviorEnum[keyof typeof BlockListOptionsBehaviorEnum];

/**
 * 
 * @export
 * @interface BlockUserRequest
 */
export interface BlockUserRequest {
    /**
     * the user to block
     * @type {string}
     * @memberof BlockUserRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface BlockUserResponse
 */
export interface BlockUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof BlockUserResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface BroadcastSettings
 */
export interface BroadcastSettings {
    /**
     * 
     * @type {boolean}
     * @memberof BroadcastSettings
     */
    enabled: boolean;
    /**
     * 
     * @type {HLSSettings}
     * @memberof BroadcastSettings
     */
    hls: HLSSettings;
}
/**
 * 
 * @export
 * @interface BroadcastSettingsRequest
 */
export interface BroadcastSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof BroadcastSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {HLSSettingsRequest}
     * @memberof BroadcastSettingsRequest
     */
    hls?: HLSSettingsRequest;
}
/**
 * 
 * @export
 * @interface BroadcastSettingsResponse
 */
export interface BroadcastSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof BroadcastSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {HLSSettingsResponse}
     * @memberof BroadcastSettingsResponse
     */
    hls: HLSSettingsResponse;
}
/**
 * 
 * @export
 * @interface CallEvent
 */
export interface CallEvent {
    /**
     * 
     * @type {string}
     * @memberof CallEvent
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof CallEvent
     */
    end_timestamp: number;
    /**
     * 
     * @type {number}
     * @memberof CallEvent
     */
    severity: number;
    /**
     * 
     * @type {number}
     * @memberof CallEvent
     */
    timestamp: number;
    /**
     * 
     * @type {string}
     * @memberof CallEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface CallIngressResponse
 */
export interface CallIngressResponse {
    /**
     * 
     * @type {RTMPIngress}
     * @memberof CallIngressResponse
     */
    rtmp: RTMPIngress;
}
/**
 * 
 * @export
 * @interface CallParticipantResponse
 */
export interface CallParticipantResponse {
    /**
     * 
     * @type {number}
     * @memberof CallParticipantResponse
     */
    joined_at: number;
    /**
     * 
     * @type {string}
     * @memberof CallParticipantResponse
     */
    role: string;
    /**
     * 
     * @type {UserResponse}
     * @memberof CallParticipantResponse
     */
    user: UserResponse;
    /**
     * 
     * @type {string}
     * @memberof CallParticipantResponse
     */
    user_session_id: string;
}
/**
 * CallRecording represents a recording of a call.
 * @export
 * @interface CallRecording
 */
export interface CallRecording {
    /**
     * 
     * @type {number}
     * @memberof CallRecording
     */
    end_time: number;
    /**
     * 
     * @type {string}
     * @memberof CallRecording
     */
    filename: string;
    /**
     * 
     * @type {number}
     * @memberof CallRecording
     */
    start_time: number;
    /**
     * 
     * @type {string}
     * @memberof CallRecording
     */
    url: string;
}
/**
 * 
 * @export
 * @interface CallRequest
 */
export interface CallRequest {
    /**
     * 
     * @type {UserRequest}
     * @memberof CallRequest
     */
    created_by?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof CallRequest
     */
    created_by_id?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof CallRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {Array<MemberRequest>}
     * @memberof CallRequest
     */
    members?: Array<MemberRequest>;
    /**
     * 
     * @type {CallSettingsRequest}
     * @memberof CallRequest
     */
    settings_override?: CallSettingsRequest;
    /**
     * 
     * @type {number}
     * @memberof CallRequest
     */
    starts_at?: number;
    /**
     * 
     * @type {string}
     * @memberof CallRequest
     */
    team?: string;
}
/**
 * Represents a call
 * @export
 * @interface CallResponse
 */
export interface CallResponse {
    /**
     * 
     * @type {boolean}
     * @memberof CallResponse
     */
    backstage: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof CallResponse
     */
    blocked_user_ids: Array<string>;
    /**
     * The unique identifier for a call (<type>:<id>)
     * @type {string}
     * @memberof CallResponse
     */
    cid: string;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof CallResponse
     */
    created_at: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof CallResponse
     */
    created_by: UserResponse;
    /**
     * 
     * @type {string}
     * @memberof CallResponse
     */
    current_session_id: string;
    /**
     * Custom data for this object
     * @type {{ [key: string]: any; }}
     * @memberof CallResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {EgressResponse}
     * @memberof CallResponse
     */
    egress: EgressResponse;
    /**
     * Date/time when the call ended
     * @type {number}
     * @memberof CallResponse
     */
    ended_at?: number;
    /**
     * Call ID
     * @type {string}
     * @memberof CallResponse
     */
    id: string;
    /**
     * 
     * @type {CallIngressResponse}
     * @memberof CallResponse
     */
    ingress: CallIngressResponse;
    /**
     * 
     * @type {boolean}
     * @memberof CallResponse
     */
    recording: boolean;
    /**
     * 
     * @type {CallSessionResponse}
     * @memberof CallResponse
     */
    session?: CallSessionResponse;
    /**
     * 
     * @type {CallSettingsResponse}
     * @memberof CallResponse
     */
    settings: CallSettingsResponse;
    /**
     * Date/time when the call will start
     * @type {number}
     * @memberof CallResponse
     */
    starts_at?: number;
    /**
     * 
     * @type {string}
     * @memberof CallResponse
     */
    team?: string;
    /**
     * 
     * @type {ThumbnailResponse}
     * @memberof CallResponse
     */
    thumbnails?: ThumbnailResponse;
    /**
     * 
     * @type {boolean}
     * @memberof CallResponse
     */
    transcribing: boolean;
    /**
     * The type of call
     * @type {string}
     * @memberof CallResponse
     */
    type: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof CallResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface CallSessionResponse
 */
export interface CallSessionResponse {
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof CallSessionResponse
     */
    accepted_by: { [key: string]: number; };
    /**
     * 
     * @type {number}
     * @memberof CallSessionResponse
     */
    ended_at?: number;
    /**
     * 
     * @type {string}
     * @memberof CallSessionResponse
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof CallSessionResponse
     */
    live_ended_at?: number;
    /**
     * 
     * @type {number}
     * @memberof CallSessionResponse
     */
    live_started_at?: number;
    /**
     * 
     * @type {Array<CallParticipantResponse>}
     * @memberof CallSessionResponse
     */
    participants: Array<CallParticipantResponse>;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof CallSessionResponse
     */
    participants_count_by_role: { [key: string]: number; };
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof CallSessionResponse
     */
    rejected_by: { [key: string]: number; };
    /**
     * 
     * @type {number}
     * @memberof CallSessionResponse
     */
    started_at?: number;
}
/**
 * 
 * @export
 * @interface CallSettings
 */
export interface CallSettings {
    /**
     * 
     * @type {AudioSettings}
     * @memberof CallSettings
     */
    audio?: AudioSettings;
    /**
     * 
     * @type {BackstageSettings}
     * @memberof CallSettings
     */
    backstage?: BackstageSettings;
    /**
     * 
     * @type {BroadcastSettings}
     * @memberof CallSettings
     */
    broadcasting?: BroadcastSettings;
    /**
     * 
     * @type {GeofenceSettings}
     * @memberof CallSettings
     */
    geofencing?: GeofenceSettings;
    /**
     * 
     * @type {RecordSettings}
     * @memberof CallSettings
     */
    recording?: RecordSettings;
    /**
     * 
     * @type {RingSettings}
     * @memberof CallSettings
     */
    ring?: RingSettings;
    /**
     * 
     * @type {ScreensharingSettings}
     * @memberof CallSettings
     */
    screensharing?: ScreensharingSettings;
    /**
     * 
     * @type {ThumbnailsSettings}
     * @memberof CallSettings
     */
    thumbnails?: ThumbnailsSettings;
    /**
     * 
     * @type {TranscriptionSettings}
     * @memberof CallSettings
     */
    transcription?: TranscriptionSettings;
    /**
     * 
     * @type {VideoSettings}
     * @memberof CallSettings
     */
    video?: VideoSettings;
}
/**
 * 
 * @export
 * @interface CallSettingsRequest
 */
export interface CallSettingsRequest {
    /**
     * 
     * @type {AudioSettingsRequest}
     * @memberof CallSettingsRequest
     */
    audio?: AudioSettingsRequest;
    /**
     * 
     * @type {BackstageSettingsRequest}
     * @memberof CallSettingsRequest
     */
    backstage?: BackstageSettingsRequest;
    /**
     * 
     * @type {BroadcastSettingsRequest}
     * @memberof CallSettingsRequest
     */
    broadcasting?: BroadcastSettingsRequest;
    /**
     * 
     * @type {GeofenceSettingsRequest}
     * @memberof CallSettingsRequest
     */
    geofencing?: GeofenceSettingsRequest;
    /**
     * 
     * @type {RecordSettingsRequest}
     * @memberof CallSettingsRequest
     */
    recording?: RecordSettingsRequest;
    /**
     * 
     * @type {RingSettingsRequest}
     * @memberof CallSettingsRequest
     */
    ring?: RingSettingsRequest;
    /**
     * 
     * @type {ScreensharingSettingsRequest}
     * @memberof CallSettingsRequest
     */
    screensharing?: ScreensharingSettingsRequest;
    /**
     * 
     * @type {ThumbnailsSettingsRequest}
     * @memberof CallSettingsRequest
     */
    thumbnails?: ThumbnailsSettingsRequest;
    /**
     * 
     * @type {TranscriptionSettingsRequest}
     * @memberof CallSettingsRequest
     */
    transcription?: TranscriptionSettingsRequest;
    /**
     * 
     * @type {VideoSettingsRequest}
     * @memberof CallSettingsRequest
     */
    video?: VideoSettingsRequest;
}
/**
 * 
 * @export
 * @interface CallSettingsResponse
 */
export interface CallSettingsResponse {
    /**
     * 
     * @type {AudioSettingsResponse}
     * @memberof CallSettingsResponse
     */
    audio: AudioSettingsResponse;
    /**
     * 
     * @type {BackstageSettingsResponse}
     * @memberof CallSettingsResponse
     */
    backstage: BackstageSettingsResponse;
    /**
     * 
     * @type {BroadcastSettingsResponse}
     * @memberof CallSettingsResponse
     */
    broadcasting: BroadcastSettingsResponse;
    /**
     * 
     * @type {GeofenceSettingsResponse}
     * @memberof CallSettingsResponse
     */
    geofencing: GeofenceSettingsResponse;
    /**
     * 
     * @type {RecordSettingsResponse}
     * @memberof CallSettingsResponse
     */
    recording: RecordSettingsResponse;
    /**
     * 
     * @type {RingSettingsResponse}
     * @memberof CallSettingsResponse
     */
    ring: RingSettingsResponse;
    /**
     * 
     * @type {ScreensharingSettingsResponse}
     * @memberof CallSettingsResponse
     */
    screensharing: ScreensharingSettingsResponse;
    /**
     * 
     * @type {ThumbnailsSettingsResponse}
     * @memberof CallSettingsResponse
     */
    thumbnails: ThumbnailsSettingsResponse;
    /**
     * 
     * @type {TranscriptionSettingsResponse}
     * @memberof CallSettingsResponse
     */
    transcription: TranscriptionSettingsResponse;
    /**
     * 
     * @type {VideoSettingsResponse}
     * @memberof CallSettingsResponse
     */
    video: VideoSettingsResponse;
}
/**
 * 
 * @export
 * @interface CallStateResponseFields
 */
export interface CallStateResponseFields {
    /**
     * 
     * @type {CallResponse}
     * @memberof CallStateResponseFields
     */
    call: CallResponse;
    /**
     * List of call members
     * @type {Array<MemberResponse>}
     * @memberof CallStateResponseFields
     */
    members: Array<MemberResponse>;
    /**
     * 
     * @type {Array<OwnCapability>}
     * @memberof CallStateResponseFields
     */
    own_capabilities: Array<OwnCapability>;
}
/**
 * 
 * @export
 * @interface CallStatsReportSummaryResponse
 */
export interface CallStatsReportSummaryResponse {
    /**
     * 
     * @type {string}
     * @memberof CallStatsReportSummaryResponse
     */
    call_cid: string;
    /**
     * 
     * @type {number}
     * @memberof CallStatsReportSummaryResponse
     */
    call_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof CallStatsReportSummaryResponse
     */
    call_session_id: string;
    /**
     * 
     * @type {string}
     * @memberof CallStatsReportSummaryResponse
     */
    call_status: string;
    /**
     * 
     * @type {number}
     * @memberof CallStatsReportSummaryResponse
     */
    created_at?: number;
    /**
     * 
     * @type {number}
     * @memberof CallStatsReportSummaryResponse
     */
    first_stats_time: number;
    /**
     * 
     * @type {number}
     * @memberof CallStatsReportSummaryResponse
     */
    quality_score?: number;
}
/**
 * 
 * @export
 * @interface CallTimeline
 */
export interface CallTimeline {
    /**
     * 
     * @type {Array<CallEvent>}
     * @memberof CallTimeline
     */
    events: Array<CallEvent>;
}
/**
 * CallTranscription represents a transcription of a call.
 * @export
 * @interface CallTranscription
 */
export interface CallTranscription {
    /**
     * 
     * @type {number}
     * @memberof CallTranscription
     */
    end_time: number;
    /**
     * 
     * @type {string}
     * @memberof CallTranscription
     */
    filename: string;
    /**
     * 
     * @type {number}
     * @memberof CallTranscription
     */
    start_time: number;
    /**
     * 
     * @type {string}
     * @memberof CallTranscription
     */
    url: string;
}
/**
 * 
 * @export
 * @interface CallType
 */
export interface CallType {
    /**
     * 
     * @type {number}
     * @memberof CallType
     */
    AppPK: number;
    /**
     * 
     * @type {number}
     * @memberof CallType
     */
    CreatedAt: number;
    /**
     * 
     * @type {string}
     * @memberof CallType
     */
    ExternalStorage: string;
    /**
     * 
     * @type {string}
     * @memberof CallType
     */
    Name: string;
    /**
     * 
     * @type {NotificationSettings}
     * @memberof CallType
     */
    NotificationSettings?: NotificationSettings;
    /**
     * 
     * @type {number}
     * @memberof CallType
     */
    PK: number;
    /**
     * 
     * @type {CallSettings}
     * @memberof CallType
     */
    Settings?: CallSettings;
    /**
     * 
     * @type {number}
     * @memberof CallType
     */
    UpdatedAt: number;
}
/**
 * 
 * @export
 * @interface CallTypeResponse
 */
export interface CallTypeResponse {
    /**
     * 
     * @type {number}
     * @memberof CallTypeResponse
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof CallTypeResponse
     */
    external_storage?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof CallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {NotificationSettings}
     * @memberof CallTypeResponse
     */
    notification_settings: NotificationSettings;
    /**
     * 
     * @type {CallSettingsResponse}
     * @memberof CallTypeResponse
     */
    settings: CallSettingsResponse;
    /**
     * 
     * @type {number}
     * @memberof CallTypeResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface CastPollVoteRequest
 */
export interface CastPollVoteRequest {
    /**
     * 
     * @type {UserRequest}
     * @memberof CastPollVoteRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof CastPollVoteRequest
     */
    user_id?: string;
    /**
     * 
     * @type {VoteData}
     * @memberof CastPollVoteRequest
     */
    vote?: VoteData;
}
/**
 * 
 * @export
 * @interface Channel
 */
export interface Channel {
    /**
     * 
     * @type {boolean}
     * @memberof Channel
     */
    auto_translation_enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Channel
     */
    auto_translation_language: string;
    /**
     * 
     * @type {string}
     * @memberof Channel
     */
    cid: string;
    /**
     * 
     * @type {ChannelConfig}
     * @memberof Channel
     */
    config?: ChannelConfig | null;
    /**
     * 
     * @type {ChannelConfig}
     * @memberof Channel
     */
    config_overrides?: ChannelConfig | null;
    /**
     * 
     * @type {number}
     * @memberof Channel
     */
    cooldown?: number;
    /**
     * 
     * @type {number}
     * @memberof Channel
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Channel
     */
    created_by?: UserObject;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Channel
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof Channel
     */
    deleted_at?: number;
    /**
     * 
     * @type {boolean}
     * @memberof Channel
     */
    disabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Channel
     */
    frozen: boolean;
    /**
     * 
     * @type {string}
     * @memberof Channel
     */
    id: string;
    /**
     * 
     * @type {Array<ChannelMember>}
     * @memberof Channel
     */
    invites?: Array<ChannelMember>;
    /**
     * 
     * @type {number}
     * @memberof Channel
     */
    last_message_at?: number;
    /**
     * 
     * @type {number}
     * @memberof Channel
     */
    member_count?: number;
    /**
     * 
     * @type {Array<ChannelMember>}
     * @memberof Channel
     */
    members?: Array<ChannelMember>;
    /**
     * 
     * @type {string}
     * @memberof Channel
     */
    team?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof Channel
     */
    truncated_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof Channel
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof Channel
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface ChannelConfig
 */
export interface ChannelConfig {
    /**
     * 
     * @type {Array<string>}
     * @memberof ChannelConfig
     */
    allowed_flag_reasons?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfig
     */
    automod: ChannelConfigAutomodEnum;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfig
     */
    automod_behavior: ChannelConfigAutomodBehaviorEnum;
    /**
     * 
     * @type {Thresholds}
     * @memberof ChannelConfig
     */
    automod_thresholds?: Thresholds;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfig
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfig
     */
    blocklist_behavior?: ChannelConfigBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptions>}
     * @memberof ChannelConfig
     */
    blocklists?: Array<BlockListOptions>;
    /**
     * List of commands that channel supports
     * @type {Array<string>}
     * @memberof ChannelConfig
     */
    commands: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    connect_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelConfig
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    custom_events: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    mark_messages_pending: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelConfig
     */
    max_message_length: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    mutes: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfig
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    polls: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    push_notifications: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    quotes: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    reactions: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    read_events: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    reminders: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    replies: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    search: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    typing_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelConfig
     */
    updated_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    uploads: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfig
     */
    url_enrichment: boolean;
}


/**
 * @export
 */
export const ChannelConfigAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type ChannelConfigAutomodEnum = typeof ChannelConfigAutomodEnum[keyof typeof ChannelConfigAutomodEnum];

/**
 * @export
 */
export const ChannelConfigAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type ChannelConfigAutomodBehaviorEnum = typeof ChannelConfigAutomodBehaviorEnum[keyof typeof ChannelConfigAutomodBehaviorEnum];

/**
 * @export
 */
export const ChannelConfigBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type ChannelConfigBlocklistBehaviorEnum = typeof ChannelConfigBlocklistBehaviorEnum[keyof typeof ChannelConfigBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface ChannelConfigWithInfo
 */
export interface ChannelConfigWithInfo {
    /**
     * 
     * @type {Array<string>}
     * @memberof ChannelConfigWithInfo
     */
    allowed_flag_reasons?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    automod: ChannelConfigWithInfoAutomodEnum;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    automod_behavior: ChannelConfigWithInfoAutomodBehaviorEnum;
    /**
     * 
     * @type {Thresholds}
     * @memberof ChannelConfigWithInfo
     */
    automod_thresholds?: Thresholds;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    blocklist_behavior?: ChannelConfigWithInfoBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptions>}
     * @memberof ChannelConfigWithInfo
     */
    blocklists?: Array<BlockListOptions>;
    /**
     * 
     * @type {Array<Command>}
     * @memberof ChannelConfigWithInfo
     */
    commands: Array<Command>;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    connect_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelConfigWithInfo
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    custom_events: boolean;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof ChannelConfigWithInfo
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    mark_messages_pending: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelConfigWithInfo
     */
    max_message_length: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    mutes: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    polls: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    push_notifications: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    quotes: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    reactions: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    read_events: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    reminders: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    replies: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    search: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    typing_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelConfigWithInfo
     */
    updated_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    uploads: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfo
     */
    url_enrichment: boolean;
}


/**
 * @export
 */
export const ChannelConfigWithInfoAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type ChannelConfigWithInfoAutomodEnum = typeof ChannelConfigWithInfoAutomodEnum[keyof typeof ChannelConfigWithInfoAutomodEnum];

/**
 * @export
 */
export const ChannelConfigWithInfoAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type ChannelConfigWithInfoAutomodBehaviorEnum = typeof ChannelConfigWithInfoAutomodBehaviorEnum[keyof typeof ChannelConfigWithInfoAutomodBehaviorEnum];

/**
 * @export
 */
export const ChannelConfigWithInfoBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type ChannelConfigWithInfoBlocklistBehaviorEnum = typeof ChannelConfigWithInfoBlocklistBehaviorEnum[keyof typeof ChannelConfigWithInfoBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface ChannelExport
 */
export interface ChannelExport {
    /**
     * 
     * @type {string}
     * @memberof ChannelExport
     */
    cid?: string;
    /**
     * Channel ID
     * @type {string}
     * @memberof ChannelExport
     */
    id?: string;
    /**
     * Date to export messages since
     * @type {number}
     * @memberof ChannelExport
     */
    messages_since?: number;
    /**
     * Date to export messages until
     * @type {number}
     * @memberof ChannelExport
     */
    messages_until?: number;
    /**
     * Channel type
     * @type {string}
     * @memberof ChannelExport
     */
    type?: string;
}
/**
 * 
 * @export
 * @interface ChannelGetOrCreateRequest
 */
export interface ChannelGetOrCreateRequest {
    /**
     * 
     * @type {ChannelInput}
     * @memberof ChannelGetOrCreateRequest
     */
    data?: ChannelInput;
    /**
     * Whether this channel will be hidden for the user who created the channel or not
     * @type {boolean}
     * @memberof ChannelGetOrCreateRequest
     */
    hide_for_creator?: boolean;
    /**
     * 
     * @type {PaginationParams}
     * @memberof ChannelGetOrCreateRequest
     */
    members?: PaginationParams;
    /**
     * 
     * @type {object}
     * @memberof ChannelGetOrCreateRequest
     */
    messages?: object;
    /**
     * Refresh channel state
     * @type {boolean}
     * @memberof ChannelGetOrCreateRequest
     */
    state?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelGetOrCreateRequest
     */
    thread_unread_counts?: boolean;
    /**
     * 
     * @type {PaginationParams}
     * @memberof ChannelGetOrCreateRequest
     */
    watchers?: PaginationParams;
}
/**
 * 
 * @export
 * @interface ChannelInput
 */
export interface ChannelInput {
    /**
     * Enable or disable auto translation
     * @type {boolean}
     * @memberof ChannelInput
     */
    auto_translation_enabled?: boolean;
    /**
     * Switch auto translation language
     * @type {string}
     * @memberof ChannelInput
     */
    auto_translation_language?: string;
    /**
     * 
     * @type {ChannelConfig}
     * @memberof ChannelInput
     */
    config_overrides?: ChannelConfig | null;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelInput
     */
    created_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof ChannelInput
     */
    created_by_id?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ChannelInput
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof ChannelInput
     */
    disabled?: boolean;
    /**
     * Freeze or unfreeze the channel
     * @type {boolean}
     * @memberof ChannelInput
     */
    frozen?: boolean;
    /**
     * 
     * @type {Array<ChannelMember>}
     * @memberof ChannelInput
     */
    invites?: Array<ChannelMember>;
    /**
     * 
     * @type {Array<ChannelMember>}
     * @memberof ChannelInput
     */
    members?: Array<ChannelMember>;
    /**
     * Team the channel belongs to (if multi-tenant mode is enabled)
     * @type {string}
     * @memberof ChannelInput
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelInput
     */
    truncated_by_id?: string;
}
/**
 * 
 * @export
 * @interface ChannelMember
 */
export interface ChannelMember {
    /**
     * Expiration date of the ban
     * @type {number}
     * @memberof ChannelMember
     */
    ban_expires?: number;
    /**
     * Whether member is banned this channel or not
     * @type {boolean}
     * @memberof ChannelMember
     */
    banned: boolean;
    /**
     * Role of the member in the channel
     * @type {string}
     * @memberof ChannelMember
     */
    channel_role: string;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof ChannelMember
     */
    created_at: number;
    /**
     * 
     * @type {number}
     * @memberof ChannelMember
     */
    deleted_at?: number;
    /**
     * Date when invite was accepted
     * @type {number}
     * @memberof ChannelMember
     */
    invite_accepted_at?: number;
    /**
     * Date when invite was rejected
     * @type {number}
     * @memberof ChannelMember
     */
    invite_rejected_at?: number;
    /**
     * Whether member was invited or not
     * @type {boolean}
     * @memberof ChannelMember
     */
    invited?: boolean;
    /**
     * Whether member is channel moderator or not
     * @type {boolean}
     * @memberof ChannelMember
     */
    is_moderator?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelMember
     */
    notifications_muted: boolean;
    /**
     * Whether member is shadow banned in this channel or not
     * @type {boolean}
     * @memberof ChannelMember
     */
    shadow_banned: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelMember
     */
    status?: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof ChannelMember
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelMember
     */
    user?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof ChannelMember
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface ChannelMute
 */
export interface ChannelMute {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelMute
     */
    channel?: ChannelResponse;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof ChannelMute
     */
    created_at: number;
    /**
     * Date/time of mute expiration
     * @type {number}
     * @memberof ChannelMute
     */
    expires?: number;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof ChannelMute
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelMute
     */
    user?: UserObject;
}
/**
 * Represents channel in chat
 * @export
 * @interface ChannelResponse
 */
export interface ChannelResponse {
    /**
     * Whether auto translation is enabled or not
     * @type {boolean}
     * @memberof ChannelResponse
     */
    auto_translation_enabled?: boolean;
    /**
     * Language to translate to when auto translation is active
     * @type {string}
     * @memberof ChannelResponse
     */
    auto_translation_language?: string;
    /**
     * Channel CID (<type>:<id>)
     * @type {string}
     * @memberof ChannelResponse
     */
    cid: string;
    /**
     * 
     * @type {ChannelConfigWithInfo}
     * @memberof ChannelResponse
     */
    config?: ChannelConfigWithInfo;
    /**
     * Cooldown period after sending each message
     * @type {number}
     * @memberof ChannelResponse
     */
    cooldown?: number;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof ChannelResponse
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelResponse
     */
    created_by?: UserObject;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ChannelResponse
     */
    custom: { [key: string]: any; };
    /**
     * Date/time of deletion
     * @type {number}
     * @memberof ChannelResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelResponse
     */
    disabled: boolean;
    /**
     * Whether channel is frozen or not
     * @type {boolean}
     * @memberof ChannelResponse
     */
    frozen: boolean;
    /**
     * Whether this channel is hidden by current user or not
     * @type {boolean}
     * @memberof ChannelResponse
     */
    hidden?: boolean;
    /**
     * Date since when the message history is accessible
     * @type {number}
     * @memberof ChannelResponse
     */
    hide_messages_before?: number;
    /**
     * Channel unique ID
     * @type {string}
     * @memberof ChannelResponse
     */
    id: string;
    /**
     * Date of the last message sent
     * @type {number}
     * @memberof ChannelResponse
     */
    last_message_at?: number;
    /**
     * Number of members in the channel
     * @type {number}
     * @memberof ChannelResponse
     */
    member_count?: number;
    /**
     * List of channel members (max 100)
     * @type {Array<ChannelMember>}
     * @memberof ChannelResponse
     */
    members?: Array<ChannelMember>;
    /**
     * Date of mute expiration
     * @type {number}
     * @memberof ChannelResponse
     */
    mute_expires_at?: number;
    /**
     * Whether this channel is muted or not
     * @type {boolean}
     * @memberof ChannelResponse
     */
    muted?: boolean;
    /**
     * List of channel capabilities of authenticated user
     * @type {Array<string>}
     * @memberof ChannelResponse
     */
    own_capabilities?: Array<string>;
    /**
     * Team the channel belongs to (multi-tenant only)
     * @type {string}
     * @memberof ChannelResponse
     */
    team?: string;
    /**
     * Date of the latest truncation of the channel
     * @type {number}
     * @memberof ChannelResponse
     */
    truncated_at?: number;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelResponse
     */
    truncated_by?: UserObject;
    /**
     * Type of the channel
     * @type {string}
     * @memberof ChannelResponse
     */
    type: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof ChannelResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface ChannelStateResponse
 */
export interface ChannelStateResponse {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelStateResponse
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ChannelStateResponse
     */
    duration: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelStateResponse
     */
    hidden?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelStateResponse
     */
    hide_messages_before?: number;
    /**
     * 
     * @type {Array<ChannelMember>}
     * @memberof ChannelStateResponse
     */
    members: Array<ChannelMember>;
    /**
     * 
     * @type {ChannelMember}
     * @memberof ChannelStateResponse
     */
    membership?: ChannelMember | null;
    /**
     * 
     * @type {Array<MessageResponse>}
     * @memberof ChannelStateResponse
     */
    messages: Array<MessageResponse>;
    /**
     * 
     * @type {Array<PendingMessage>}
     * @memberof ChannelStateResponse
     */
    pending_messages?: Array<PendingMessage>;
    /**
     * 
     * @type {Array<MessageResponse>}
     * @memberof ChannelStateResponse
     */
    pinned_messages: Array<MessageResponse>;
    /**
     * 
     * @type {Array<ReadStateResponse>}
     * @memberof ChannelStateResponse
     */
    read?: Array<ReadStateResponse>;
    /**
     * 
     * @type {Array<ThreadState>}
     * @memberof ChannelStateResponse
     */
    threads: Array<ThreadState>;
    /**
     * 
     * @type {number}
     * @memberof ChannelStateResponse
     */
    watcher_count?: number;
    /**
     * 
     * @type {Array<UserResponse>}
     * @memberof ChannelStateResponse
     */
    watchers?: Array<UserResponse>;
}
/**
 * 
 * @export
 * @interface ChannelStateResponseFields
 */
export interface ChannelStateResponseFields {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelStateResponseFields
     */
    channel?: ChannelResponse;
    /**
     * Whether this channel is hidden or not
     * @type {boolean}
     * @memberof ChannelStateResponseFields
     */
    hidden?: boolean;
    /**
     * Messages before this date are hidden from the user
     * @type {number}
     * @memberof ChannelStateResponseFields
     */
    hide_messages_before?: number;
    /**
     * List of channel members
     * @type {Array<ChannelMember>}
     * @memberof ChannelStateResponseFields
     */
    members: Array<ChannelMember>;
    /**
     * 
     * @type {ChannelMember}
     * @memberof ChannelStateResponseFields
     */
    membership?: ChannelMember | null;
    /**
     * List of channel messages
     * @type {Array<MessageResponse>}
     * @memberof ChannelStateResponseFields
     */
    messages: Array<MessageResponse>;
    /**
     * Pending messages that this user has sent
     * @type {Array<PendingMessage>}
     * @memberof ChannelStateResponseFields
     */
    pending_messages?: Array<PendingMessage>;
    /**
     * List of pinned messages in the channel
     * @type {Array<MessageResponse>}
     * @memberof ChannelStateResponseFields
     */
    pinned_messages: Array<MessageResponse>;
    /**
     * List of read states
     * @type {Array<ReadStateResponse>}
     * @memberof ChannelStateResponseFields
     */
    read?: Array<ReadStateResponse>;
    /**
     * 
     * @type {Array<ThreadState>}
     * @memberof ChannelStateResponseFields
     */
    threads: Array<ThreadState>;
    /**
     * Number of channel watchers
     * @type {number}
     * @memberof ChannelStateResponseFields
     */
    watcher_count?: number;
    /**
     * List of user who is watching the channel
     * @type {Array<UserResponse>}
     * @memberof ChannelStateResponseFields
     */
    watchers?: Array<UserResponse>;
}
/**
 * 
 * @export
 * @interface ChannelTypeConfig
 */
export interface ChannelTypeConfig {
    /**
     * 
     * @type {Array<string>}
     * @memberof ChannelTypeConfig
     */
    allowed_flag_reasons?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    automod: ChannelTypeConfigAutomodEnum;
    /**
     * 
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    automod_behavior: ChannelTypeConfigAutomodBehaviorEnum;
    /**
     * 
     * @type {Thresholds}
     * @memberof ChannelTypeConfig
     */
    automod_thresholds?: Thresholds;
    /**
     * 
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    blocklist_behavior?: ChannelTypeConfigBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptions>}
     * @memberof ChannelTypeConfig
     */
    blocklists?: Array<BlockListOptions>;
    /**
     * List of commands that channel supports
     * @type {Array<Command>}
     * @memberof ChannelTypeConfig
     */
    commands: Array<Command>;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    connect_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelTypeConfig
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    custom_events: boolean;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof ChannelTypeConfig
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    mark_messages_pending: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelTypeConfig
     */
    max_message_length: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    mutes: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    name: string;
    /**
     * 
     * @type {Array<PolicyRequest>}
     * @memberof ChannelTypeConfig
     */
    permissions: Array<PolicyRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    polls: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    push_notifications: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    quotes: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    reactions: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    read_events: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    reminders: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    replies: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    search: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    typing_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelTypeConfig
     */
    updated_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    uploads: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelTypeConfig
     */
    url_enrichment: boolean;
}


/**
 * @export
 */
export const ChannelTypeConfigAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type ChannelTypeConfigAutomodEnum = typeof ChannelTypeConfigAutomodEnum[keyof typeof ChannelTypeConfigAutomodEnum];

/**
 * @export
 */
export const ChannelTypeConfigAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type ChannelTypeConfigAutomodBehaviorEnum = typeof ChannelTypeConfigAutomodBehaviorEnum[keyof typeof ChannelTypeConfigAutomodBehaviorEnum];

/**
 * @export
 */
export const ChannelTypeConfigBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type ChannelTypeConfigBlocklistBehaviorEnum = typeof ChannelTypeConfigBlocklistBehaviorEnum[keyof typeof ChannelTypeConfigBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface CheckExternalStorageResponse
 */
export interface CheckExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CheckExternalStorageResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface CheckPushRequest
 */
export interface CheckPushRequest {
    /**
     * Push message template for APN
     * @type {string}
     * @memberof CheckPushRequest
     */
    apn_template?: string;
    /**
     * Push message data template for Firebase
     * @type {string}
     * @memberof CheckPushRequest
     */
    firebase_data_template?: string;
    /**
     * Push message template for Firebase
     * @type {string}
     * @memberof CheckPushRequest
     */
    firebase_template?: string;
    /**
     * Message ID to send push notification for
     * @type {string}
     * @memberof CheckPushRequest
     */
    message_id?: string;
    /**
     * Name of push provider
     * @type {string}
     * @memberof CheckPushRequest
     */
    push_provider_name?: string;
    /**
     * Push provider type
     * @type {string}
     * @memberof CheckPushRequest
     */
    push_provider_type?: CheckPushRequestPushProviderTypeEnum;
    /**
     * Don't require existing devices to render templates
     * @type {boolean}
     * @memberof CheckPushRequest
     */
    skip_devices?: boolean;
    /**
     * 
     * @type {UserRequest}
     * @memberof CheckPushRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof CheckPushRequest
     */
    user_id?: string;
}


/**
 * @export
 */
export const CheckPushRequestPushProviderTypeEnum = {
    FIREBASE: 'firebase',
    APN: 'apn',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi'
} as const;
export type CheckPushRequestPushProviderTypeEnum = typeof CheckPushRequestPushProviderTypeEnum[keyof typeof CheckPushRequestPushProviderTypeEnum];

/**
 * 
 * @export
 * @interface CheckPushResponse
 */
export interface CheckPushResponse {
    /**
     * Object with device errors
     * @type {{ [key: string]: DeviceErrorInfo; }}
     * @memberof CheckPushResponse
     */
    device_errors?: { [key: string]: DeviceErrorInfo; };
    /**
     * 
     * @type {string}
     * @memberof CheckPushResponse
     */
    duration: string;
    /**
     * List of general errors
     * @type {Array<string>}
     * @memberof CheckPushResponse
     */
    general_errors?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof CheckPushResponse
     */
    rendered_apn_template?: string;
    /**
     * 
     * @type {string}
     * @memberof CheckPushResponse
     */
    rendered_firebase_template?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof CheckPushResponse
     */
    rendered_message?: { [key: string]: string; };
    /**
     * Don't require existing devices to render templates
     * @type {boolean}
     * @memberof CheckPushResponse
     */
    skip_devices?: boolean;
}
/**
 * 
 * @export
 * @interface CheckSNSRequest
 */
export interface CheckSNSRequest {
    /**
     * AWS SNS access key
     * @type {string}
     * @memberof CheckSNSRequest
     */
    sns_key?: string;
    /**
     * AWS SNS key secret
     * @type {string}
     * @memberof CheckSNSRequest
     */
    sns_secret?: string;
    /**
     * AWS SNS topic ARN
     * @type {string}
     * @memberof CheckSNSRequest
     */
    sns_topic_arn?: string;
}
/**
 * 
 * @export
 * @interface CheckSNSResponse
 */
export interface CheckSNSResponse {
    /**
     * Error data
     * @type {{ [key: string]: any; }}
     * @memberof CheckSNSResponse
     */
    data?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof CheckSNSResponse
     */
    duration: string;
    /**
     * Error text
     * @type {string}
     * @memberof CheckSNSResponse
     */
    error?: string;
    /**
     * Validation result
     * @type {string}
     * @memberof CheckSNSResponse
     */
    status: CheckSNSResponseStatusEnum;
}


/**
 * @export
 */
export const CheckSNSResponseStatusEnum = {
    OK: 'ok',
    ERROR: 'error'
} as const;
export type CheckSNSResponseStatusEnum = typeof CheckSNSResponseStatusEnum[keyof typeof CheckSNSResponseStatusEnum];

/**
 * 
 * @export
 * @interface CheckSQSRequest
 */
export interface CheckSQSRequest {
    /**
     * AWS SQS access key
     * @type {string}
     * @memberof CheckSQSRequest
     */
    sqs_key?: string;
    /**
     * AWS SQS key secret
     * @type {string}
     * @memberof CheckSQSRequest
     */
    sqs_secret?: string;
    /**
     * AWS SQS endpoint URL
     * @type {string}
     * @memberof CheckSQSRequest
     */
    sqs_url?: string;
}
/**
 * 
 * @export
 * @interface CheckSQSResponse
 */
export interface CheckSQSResponse {
    /**
     * Error data
     * @type {{ [key: string]: any; }}
     * @memberof CheckSQSResponse
     */
    data?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof CheckSQSResponse
     */
    duration: string;
    /**
     * Error text
     * @type {string}
     * @memberof CheckSQSResponse
     */
    error?: string;
    /**
     * Validation result
     * @type {string}
     * @memberof CheckSQSResponse
     */
    status: CheckSQSResponseStatusEnum;
}


/**
 * @export
 */
export const CheckSQSResponseStatusEnum = {
    OK: 'ok',
    ERROR: 'error'
} as const;
export type CheckSQSResponseStatusEnum = typeof CheckSQSResponseStatusEnum[keyof typeof CheckSQSResponseStatusEnum];

/**
 * 
 * @export
 * @interface CollectUserFeedbackRequest
 */
export interface CollectUserFeedbackRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof CollectUserFeedbackRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof CollectUserFeedbackRequest
     */
    rating: number;
    /**
     * 
     * @type {string}
     * @memberof CollectUserFeedbackRequest
     */
    reason?: string;
    /**
     * 
     * @type {string}
     * @memberof CollectUserFeedbackRequest
     */
    sdk: string;
    /**
     * 
     * @type {string}
     * @memberof CollectUserFeedbackRequest
     */
    sdk_version: string;
    /**
     * 
     * @type {string}
     * @memberof CollectUserFeedbackRequest
     */
    user_session_id: string;
}
/**
 * 
 * @export
 * @interface CollectUserFeedbackResponse
 */
export interface CollectUserFeedbackResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CollectUserFeedbackResponse
     */
    duration: string;
}
/**
 * Represents custom chat command
 * @export
 * @interface Command
 */
export interface Command {
    /**
     * Arguments help text, shown in commands auto-completion
     * @type {string}
     * @memberof Command
     */
    args: string;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof Command
     */
    readonly created_at?: number;
    /**
     * Description, shown in commands auto-completion
     * @type {string}
     * @memberof Command
     */
    description: string;
    /**
     * Unique command name
     * @type {string}
     * @memberof Command
     */
    name: string;
    /**
     * Set name used for grouping commands
     * @type {string}
     * @memberof Command
     */
    set: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof Command
     */
    readonly updated_at?: number;
}
/**
 * 
 * @export
 * @interface Config
 */
export interface Config {
    /**
     * 
     * @type {string}
     * @memberof Config
     */
    app_certificate: string;
    /**
     * 
     * @type {string}
     * @memberof Config
     */
    app_id: string;
    /**
     * 
     * @type {string}
     * @memberof Config
     */
    default_role?: ConfigDefaultRoleEnum;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof Config
     */
    role_map?: { [key: string]: string; };
}


/**
 * @export
 */
export const ConfigDefaultRoleEnum = {
    ATTENDEE: 'attendee',
    PUBLISHER: 'publisher',
    SUBSCRIBER: 'subscriber',
    ADMIN: 'admin'
} as const;
export type ConfigDefaultRoleEnum = typeof ConfigDefaultRoleEnum[keyof typeof ConfigDefaultRoleEnum];

/**
 * 
 * @export
 * @interface Coordinates
 */
export interface Coordinates {
    /**
     * 
     * @type {number}
     * @memberof Coordinates
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof Coordinates
     */
    longitude: number;
}
/**
 * Block list contains restricted words
 * @export
 * @interface CreateBlockListRequest
 */
export interface CreateBlockListRequest {
    /**
     * Block list name
     * @type {string}
     * @memberof CreateBlockListRequest
     */
    name: string;
    /**
     * Block list type.
     * @type {string}
     * @memberof CreateBlockListRequest
     */
    type?: CreateBlockListRequestTypeEnum;
    /**
     * List of words to block
     * @type {Array<string>}
     * @memberof CreateBlockListRequest
     */
    words: Array<string>;
}


/**
 * @export
 */
export const CreateBlockListRequestTypeEnum = {
    REGEX: 'regex',
    DOMAIN: 'domain',
    EMAIL: 'email',
    WORD: 'word'
} as const;
export type CreateBlockListRequestTypeEnum = typeof CreateBlockListRequestTypeEnum[keyof typeof CreateBlockListRequestTypeEnum];

/**
 * 
 * @export
 * @interface CreateCallTypeRequest
 */
export interface CreateCallTypeRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateCallTypeRequest
     */
    external_storage?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CreateCallTypeRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof CreateCallTypeRequest
     */
    name: string;
    /**
     * 
     * @type {NotificationSettings}
     * @memberof CreateCallTypeRequest
     */
    notification_settings?: NotificationSettings;
    /**
     * 
     * @type {CallSettingsRequest}
     * @memberof CreateCallTypeRequest
     */
    settings?: CallSettingsRequest;
}
/**
 * 
 * @export
 * @interface CreateCallTypeResponse
 */
export interface CreateCallTypeResponse {
    /**
     * 
     * @type {number}
     * @memberof CreateCallTypeResponse
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof CreateCallTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCallTypeResponse
     */
    external_storage?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CreateCallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof CreateCallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {NotificationSettings}
     * @memberof CreateCallTypeResponse
     */
    notification_settings: NotificationSettings;
    /**
     * 
     * @type {CallSettingsResponse}
     * @memberof CreateCallTypeResponse
     */
    settings: CallSettingsResponse;
    /**
     * 
     * @type {number}
     * @memberof CreateCallTypeResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface CreateChannelTypeRequest
 */
export interface CreateChannelTypeRequest {
    /**
     * Enables automatic message moderation
     * @type {string}
     * @memberof CreateChannelTypeRequest
     */
    automod: CreateChannelTypeRequestAutomodEnum;
    /**
     * Sets behavior of automatic moderation
     * @type {string}
     * @memberof CreateChannelTypeRequest
     */
    automod_behavior: CreateChannelTypeRequestAutomodBehaviorEnum;
    /**
     * Name of the blocklist to use
     * @type {string}
     * @memberof CreateChannelTypeRequest
     */
    blocklist?: string;
    /**
     * Sets behavior of blocklist
     * @type {string}
     * @memberof CreateChannelTypeRequest
     */
    blocklist_behavior?: CreateChannelTypeRequestBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptions>}
     * @memberof CreateChannelTypeRequest
     */
    blocklists?: Array<BlockListOptions>;
    /**
     * List of commands that channel supports
     * @type {Array<string>}
     * @memberof CreateChannelTypeRequest
     */
    commands?: Array<string>;
    /**
     * Connect events support
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    connect_events?: boolean;
    /**
     * Enables custom events
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    custom_events?: boolean;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CreateChannelTypeRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * Marks messages as pending by default
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    mark_messages_pending?: boolean;
    /**
     * Number of maximum message characters
     * @type {number}
     * @memberof CreateChannelTypeRequest
     */
    max_message_length: number;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelTypeRequest
     */
    message_retention?: string;
    /**
     * Enables mutes
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    mutes?: boolean;
    /**
     * Channel type name
     * @type {string}
     * @memberof CreateChannelTypeRequest
     */
    name: string;
    /**
     * List of permissions for the channel type
     * @type {Array<PolicyRequest>}
     * @memberof CreateChannelTypeRequest
     */
    permissions?: Array<PolicyRequest>;
    /**
     * Enables polls
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    polls?: boolean;
    /**
     * Enables push notifications
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    push_notifications?: boolean;
    /**
     * Enables message reactions
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    reactions?: boolean;
    /**
     * Read events support
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    read_events?: boolean;
    /**
     * Enables message replies (threads)
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    replies?: boolean;
    /**
     * Enables message search
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    search?: boolean;
    /**
     * Typing events support
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    typing_events?: boolean;
    /**
     * Enables file uploads
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    uploads?: boolean;
    /**
     * Enables URL enrichment
     * @type {boolean}
     * @memberof CreateChannelTypeRequest
     */
    url_enrichment?: boolean;
}


/**
 * @export
 */
export const CreateChannelTypeRequestAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type CreateChannelTypeRequestAutomodEnum = typeof CreateChannelTypeRequestAutomodEnum[keyof typeof CreateChannelTypeRequestAutomodEnum];

/**
 * @export
 */
export const CreateChannelTypeRequestAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type CreateChannelTypeRequestAutomodBehaviorEnum = typeof CreateChannelTypeRequestAutomodBehaviorEnum[keyof typeof CreateChannelTypeRequestAutomodBehaviorEnum];

/**
 * @export
 */
export const CreateChannelTypeRequestBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type CreateChannelTypeRequestBlocklistBehaviorEnum = typeof CreateChannelTypeRequestBlocklistBehaviorEnum[keyof typeof CreateChannelTypeRequestBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface CreateChannelTypeResponse
 */
export interface CreateChannelTypeResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof CreateChannelTypeResponse
     */
    allowed_flag_reasons?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    automod: CreateChannelTypeResponseAutomodEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    automod_behavior: CreateChannelTypeResponseAutomodBehaviorEnum;
    /**
     * 
     * @type {Thresholds}
     * @memberof CreateChannelTypeResponse
     */
    automod_thresholds?: Thresholds;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    blocklist_behavior?: CreateChannelTypeResponseBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptions>}
     * @memberof CreateChannelTypeResponse
     */
    blocklists?: Array<BlockListOptions>;
    /**
     * 
     * @type {Array<string>}
     * @memberof CreateChannelTypeResponse
     */
    commands: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    connect_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof CreateChannelTypeResponse
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    custom_events: boolean;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CreateChannelTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    mark_messages_pending: boolean;
    /**
     * 
     * @type {number}
     * @memberof CreateChannelTypeResponse
     */
    max_message_length: number;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    mutes: boolean;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    name: string;
    /**
     * 
     * @type {Array<PolicyRequest>}
     * @memberof CreateChannelTypeResponse
     */
    permissions: Array<PolicyRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    polls: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    push_notifications: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    quotes: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    reactions: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    read_events: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    reminders: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    replies: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    search: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    typing_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof CreateChannelTypeResponse
     */
    updated_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    uploads: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateChannelTypeResponse
     */
    url_enrichment: boolean;
}


/**
 * @export
 */
export const CreateChannelTypeResponseAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type CreateChannelTypeResponseAutomodEnum = typeof CreateChannelTypeResponseAutomodEnum[keyof typeof CreateChannelTypeResponseAutomodEnum];

/**
 * @export
 */
export const CreateChannelTypeResponseAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type CreateChannelTypeResponseAutomodBehaviorEnum = typeof CreateChannelTypeResponseAutomodBehaviorEnum[keyof typeof CreateChannelTypeResponseAutomodBehaviorEnum];

/**
 * @export
 */
export const CreateChannelTypeResponseBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type CreateChannelTypeResponseBlocklistBehaviorEnum = typeof CreateChannelTypeResponseBlocklistBehaviorEnum[keyof typeof CreateChannelTypeResponseBlocklistBehaviorEnum];

/**
 * Represents custom chat command
 * @export
 * @interface CreateCommandRequest
 */
export interface CreateCommandRequest {
    /**
     * Arguments help text, shown in commands auto-completion
     * @type {string}
     * @memberof CreateCommandRequest
     */
    args?: string;
    /**
     * Description, shown in commands auto-completion
     * @type {string}
     * @memberof CreateCommandRequest
     */
    description: string;
    /**
     * Unique command name
     * @type {string}
     * @memberof CreateCommandRequest
     */
    name: string;
    /**
     * Set name used for grouping commands
     * @type {string}
     * @memberof CreateCommandRequest
     */
    set?: string;
}
/**
 * 
 * @export
 * @interface CreateCommandResponse
 */
export interface CreateCommandResponse {
    /**
     * 
     * @type {Command}
     * @memberof CreateCommandResponse
     */
    command?: Command | null;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CreateCommandResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface CreateDeviceRequest
 */
export interface CreateDeviceRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    push_provider: CreateDeviceRequestPushProviderEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    push_provider_name?: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof CreateDeviceRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    user_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CreateDeviceRequest
     */
    voip_token?: boolean;
}


/**
 * @export
 */
export const CreateDeviceRequestPushProviderEnum = {
    FIREBASE: 'firebase',
    APN: 'apn',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi'
} as const;
export type CreateDeviceRequestPushProviderEnum = typeof CreateDeviceRequestPushProviderEnum[keyof typeof CreateDeviceRequestPushProviderEnum];

/**
 * 
 * @export
 * @interface CreateExternalStorageRequest
 */
export interface CreateExternalStorageRequest {
    /**
     * 
     * @type {S3Request}
     * @memberof CreateExternalStorageRequest
     */
    aws_s3?: S3Request;
    /**
     * 
     * @type {AzureRequest}
     * @memberof CreateExternalStorageRequest
     */
    azure_blob?: AzureRequest;
    /**
     * 
     * @type {string}
     * @memberof CreateExternalStorageRequest
     */
    bucket: string;
    /**
     * 
     * @type {string}
     * @memberof CreateExternalStorageRequest
     */
    gcs_credentials?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateExternalStorageRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateExternalStorageRequest
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateExternalStorageRequest
     */
    storage_type: string;
}
/**
 * 
 * @export
 * @interface CreateExternalStorageResponse
 */
export interface CreateExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CreateExternalStorageResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface CreateGuestRequest
 */
export interface CreateGuestRequest {
    /**
     * 
     * @type {UserRequest}
     * @memberof CreateGuestRequest
     */
    user: UserRequest;
}
/**
 * 
 * @export
 * @interface CreateGuestResponse
 */
export interface CreateGuestResponse {
    /**
     * the access token to authenticate the user
     * @type {string}
     * @memberof CreateGuestResponse
     */
    access_token: string;
    /**
     * 
     * @type {string}
     * @memberof CreateGuestResponse
     */
    duration: string;
    /**
     * 
     * @type {UserResponse}
     * @memberof CreateGuestResponse
     */
    user: UserResponse;
}
/**
 * 
 * @export
 * @interface CreateImportRequest
 */
export interface CreateImportRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateImportRequest
     */
    mode: CreateImportRequestModeEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateImportRequest
     */
    path: string;
}


/**
 * @export
 */
export const CreateImportRequestModeEnum = {
    INSERT: 'insert',
    UPSERT: 'upsert'
} as const;
export type CreateImportRequestModeEnum = typeof CreateImportRequestModeEnum[keyof typeof CreateImportRequestModeEnum];

/**
 * 
 * @export
 * @interface CreateImportResponse
 */
export interface CreateImportResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CreateImportResponse
     */
    duration: string;
    /**
     * 
     * @type {ImportTask}
     * @memberof CreateImportResponse
     */
    import_task?: ImportTask;
}
/**
 * 
 * @export
 * @interface CreateImportURLRequest
 */
export interface CreateImportURLRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateImportURLRequest
     */
    filename?: string;
}
/**
 * 
 * @export
 * @interface CreateImportURLResponse
 */
export interface CreateImportURLResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CreateImportURLResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof CreateImportURLResponse
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof CreateImportURLResponse
     */
    upload_url: string;
}
/**
 * 
 * @export
 * @interface CreatePollOptionRequest
 */
export interface CreatePollOptionRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof CreatePollOptionRequest
     */
    Custom?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof CreatePollOptionRequest
     */
    position?: number;
    /**
     * 
     * @type {string}
     * @memberof CreatePollOptionRequest
     */
    text: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof CreatePollOptionRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof CreatePollOptionRequest
     */
    user_id?: string;
}
/**
 * Contains all information needed to create a new poll
 * @export
 * @interface CreatePollRequest
 */
export interface CreatePollRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof CreatePollRequest
     */
    Custom?: { [key: string]: any; };
    /**
     * Indicates whether users can suggest user defined answers
     * @type {boolean}
     * @memberof CreatePollRequest
     */
    allow_answers?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreatePollRequest
     */
    allow_user_suggested_options?: boolean;
    /**
     * A description of the poll
     * @type {string}
     * @memberof CreatePollRequest
     */
    description?: string;
    /**
     * Indicates whether users can cast multiple votes
     * @type {boolean}
     * @memberof CreatePollRequest
     */
    enforce_unique_vote?: boolean;
    /**
     * 
     * @type {string}
     * @memberof CreatePollRequest
     */
    id?: string;
    /**
     * Indicates whether the poll is open for voting
     * @type {boolean}
     * @memberof CreatePollRequest
     */
    is_closed?: boolean;
    /**
     * Indicates the maximum amount of votes a user can cast
     * @type {number}
     * @memberof CreatePollRequest
     */
    max_votes_allowed?: number;
    /**
     * The name of the poll
     * @type {string}
     * @memberof CreatePollRequest
     */
    name: string;
    /**
     * 
     * @type {Array<PollOptionInput>}
     * @memberof CreatePollRequest
     */
    options?: Array<PollOptionInput>;
    /**
     * 
     * @type {UserRequest}
     * @memberof CreatePollRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof CreatePollRequest
     */
    user_id?: string;
    /**
     * 
     * @type {string}
     * @memberof CreatePollRequest
     */
    voting_visibility?: CreatePollRequestVotingVisibilityEnum;
}


/**
 * @export
 */
export const CreatePollRequestVotingVisibilityEnum = {
    ANONYMOUS: 'anonymous',
    PUBLIC: 'public'
} as const;
export type CreatePollRequestVotingVisibilityEnum = typeof CreatePollRequestVotingVisibilityEnum[keyof typeof CreatePollRequestVotingVisibilityEnum];

/**
 * 
 * @export
 * @interface CreateRoleRequest
 */
export interface CreateRoleRequest {
    /**
     * Role name
     * @type {string}
     * @memberof CreateRoleRequest
     */
    name: string;
}
/**
 * 
 * @export
 * @interface CreateRoleResponse
 */
export interface CreateRoleResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CreateRoleResponse
     */
    duration: string;
    /**
     * 
     * @type {Role}
     * @memberof CreateRoleResponse
     */
    role: Role;
}
/**
 * 
 * @export
 * @interface DataDogInfo
 */
export interface DataDogInfo {
    /**
     * 
     * @type {string}
     * @memberof DataDogInfo
     */
    api_key?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DataDogInfo
     */
    enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof DataDogInfo
     */
    site?: string;
}
/**
 * 
 * @export
 * @interface DeactivateUserRequest
 */
export interface DeactivateUserRequest {
    /**
     * ID of the user who deactivated the user
     * @type {string}
     * @memberof DeactivateUserRequest
     */
    created_by_id?: string;
    /**
     * Makes messages appear to be deleted
     * @type {boolean}
     * @memberof DeactivateUserRequest
     */
    mark_messages_deleted?: boolean;
}
/**
 * 
 * @export
 * @interface DeactivateUserResponse
 */
export interface DeactivateUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeactivateUserResponse
     */
    duration: string;
    /**
     * 
     * @type {UserObject}
     * @memberof DeactivateUserResponse
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface DeactivateUsersRequest
 */
export interface DeactivateUsersRequest {
    /**
     * ID of the user who deactivated the users
     * @type {string}
     * @memberof DeactivateUsersRequest
     */
    created_by_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DeactivateUsersRequest
     */
    mark_channels_deleted?: boolean;
    /**
     * Makes messages appear to be deleted
     * @type {boolean}
     * @memberof DeactivateUsersRequest
     */
    mark_messages_deleted?: boolean;
    /**
     * User IDs to deactivate
     * @type {Array<string>}
     * @memberof DeactivateUsersRequest
     */
    user_ids: Array<string>;
}
/**
 * 
 * @export
 * @interface DeactivateUsersResponse
 */
export interface DeactivateUsersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeactivateUsersResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof DeactivateUsersResponse
     */
    task_id: string;
}
/**
 * 
 * @export
 * @interface DeleteChannelResponse
 */
export interface DeleteChannelResponse {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof DeleteChannelResponse
     */
    channel?: ChannelResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeleteChannelResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface DeleteChannelsRequest
 */
export interface DeleteChannelsRequest {
    /**
     * All channels that should be deleted
     * @type {Array<string>}
     * @memberof DeleteChannelsRequest
     */
    cids: Array<string>;
    /**
     * Specify if channels and all ressources should be hard deleted
     * @type {boolean}
     * @memberof DeleteChannelsRequest
     */
    hard_delete?: boolean;
}
/**
 * 
 * @export
 * @interface DeleteChannelsResponse
 */
export interface DeleteChannelsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeleteChannelsResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: DeleteChannelsResult; }}
     * @memberof DeleteChannelsResponse
     */
    result?: { [key: string]: DeleteChannelsResult; };
    /**
     * 
     * @type {string}
     * @memberof DeleteChannelsResponse
     */
    task_id?: string;
}
/**
 * 
 * @export
 * @interface DeleteChannelsResult
 */
export interface DeleteChannelsResult {
    /**
     * 
     * @type {string}
     * @memberof DeleteChannelsResult
     */
    error?: string;
    /**
     * 
     * @type {string}
     * @memberof DeleteChannelsResult
     */
    status: string;
}
/**
 * 
 * @export
 * @interface DeleteCommandResponse
 */
export interface DeleteCommandResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeleteCommandResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof DeleteCommandResponse
     */
    name: string;
}
/**
 * 
 * @export
 * @interface DeleteExternalStorageResponse
 */
export interface DeleteExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeleteExternalStorageResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface DeleteMessageResponse
 */
export interface DeleteMessageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeleteMessageResponse
     */
    duration: string;
    /**
     * 
     * @type {MessageResponse}
     * @memberof DeleteMessageResponse
     */
    message: MessageResponse;
}
/**
 * 
 * @export
 * @interface DeleteRecordingResponse
 */
export interface DeleteRecordingResponse {
    /**
     * 
     * @type {string}
     * @memberof DeleteRecordingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface DeleteTranscriptionResponse
 */
export interface DeleteTranscriptionResponse {
    /**
     * 
     * @type {string}
     * @memberof DeleteTranscriptionResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface DeleteUsersRequest
 */
export interface DeleteUsersRequest {
    /**
     * 
     * @type {string}
     * @memberof DeleteUsersRequest
     */
    calls?: DeleteUsersRequestCallsEnum;
    /**
     * Conversation channels delete mode.
     * Conversation channel is any channel which only has two members one of which is the user being deleted.
     * 
     * * null or empty string - doesn't delete any conversation channels
     * * soft - marks all conversation channels as deleted (same effect as Delete Channels with 'hard' option disabled)
     * * hard - deletes channel and all its data completely including messages (same effect as Delete Channels with 'hard' option enabled)
     * @type {string}
     * @memberof DeleteUsersRequest
     */
    conversations?: DeleteUsersRequestConversationsEnum;
    /**
     * Message delete mode.
     * 
     * * null or empty string - doesn't delete user messages
     * * soft - marks all user messages as deleted without removing any related message data
     * * pruning - marks all user messages as deleted, nullifies message information and removes some message data such as reactions and flags
     * * hard - deletes messages completely with all related information
     * @type {string}
     * @memberof DeleteUsersRequest
     */
    messages?: DeleteUsersRequestMessagesEnum;
    /**
     * 
     * @type {string}
     * @memberof DeleteUsersRequest
     */
    new_call_owner_id?: string;
    /**
     * 
     * @type {string}
     * @memberof DeleteUsersRequest
     */
    new_channel_owner_id?: string;
    /**
     * User delete mode.
     * 
     * * soft - marks user as deleted and retains all user data
     * * pruning - marks user as deleted and nullifies user information
     * * hard - deletes user completely. Requires 'hard' option for messages and conversations as well
     * @type {string}
     * @memberof DeleteUsersRequest
     */
    user?: DeleteUsersRequestUserEnum;
    /**
     * IDs of users to delete
     * @type {Array<string>}
     * @memberof DeleteUsersRequest
     */
    user_ids: Array<string>;
}


/**
 * @export
 */
export const DeleteUsersRequestCallsEnum = {
    SOFT: 'soft',
    HARD: 'hard'
} as const;
export type DeleteUsersRequestCallsEnum = typeof DeleteUsersRequestCallsEnum[keyof typeof DeleteUsersRequestCallsEnum];

/**
 * @export
 */
export const DeleteUsersRequestConversationsEnum = {
    SOFT: 'soft',
    HARD: 'hard'
} as const;
export type DeleteUsersRequestConversationsEnum = typeof DeleteUsersRequestConversationsEnum[keyof typeof DeleteUsersRequestConversationsEnum];

/**
 * @export
 */
export const DeleteUsersRequestMessagesEnum = {
    SOFT: 'soft',
    PRUNING: 'pruning',
    HARD: 'hard'
} as const;
export type DeleteUsersRequestMessagesEnum = typeof DeleteUsersRequestMessagesEnum[keyof typeof DeleteUsersRequestMessagesEnum];

/**
 * @export
 */
export const DeleteUsersRequestUserEnum = {
    SOFT: 'soft',
    PRUNING: 'pruning',
    HARD: 'hard'
} as const;
export type DeleteUsersRequestUserEnum = typeof DeleteUsersRequestUserEnum[keyof typeof DeleteUsersRequestUserEnum];

/**
 * 
 * @export
 * @interface DeleteUsersResponse
 */
export interface DeleteUsersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeleteUsersResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof DeleteUsersResponse
     */
    task_id: string;
}
/**
 * 
 * @export
 * @interface Device
 */
export interface Device {
    /**
     * 
     * @type {number}
     * @memberof Device
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof Device
     */
    disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    disabled_reason?: string;
    /**
     * Device ID
     * @type {string}
     * @memberof Device
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    push_provider: DevicePushProviderEnum;
    /**
     * Name of the push provider configuration
     * @type {string}
     * @memberof Device
     */
    push_provider_name?: string;
    /**
     * 
     * @type {string}
     * @memberof Device
     */
    user_id: string;
    /**
     * 
     * @type {boolean}
     * @memberof Device
     */
    voip?: boolean;
}


/**
 * @export
 */
export const DevicePushProviderEnum = {
    FIREBASE: 'firebase',
    APN: 'apn',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi'
} as const;
export type DevicePushProviderEnum = typeof DevicePushProviderEnum[keyof typeof DevicePushProviderEnum];

/**
 * 
 * @export
 * @interface DeviceErrorInfo
 */
export interface DeviceErrorInfo {
    /**
     * 
     * @type {string}
     * @memberof DeviceErrorInfo
     */
    error_message: string;
    /**
     * 
     * @type {string}
     * @memberof DeviceErrorInfo
     */
    provider: string;
    /**
     * 
     * @type {string}
     * @memberof DeviceErrorInfo
     */
    provider_name: string;
}
/**
 * 
 * @export
 * @interface EdgeResponse
 */
export interface EdgeResponse {
    /**
     * 
     * @type {string}
     * @memberof EdgeResponse
     */
    continent_code: string;
    /**
     * 
     * @type {string}
     * @memberof EdgeResponse
     */
    country_iso_code: string;
    /**
     * 
     * @type {number}
     * @memberof EdgeResponse
     */
    green: number;
    /**
     * 
     * @type {string}
     * @memberof EdgeResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof EdgeResponse
     */
    latency_test_url: string;
    /**
     * 
     * @type {number}
     * @memberof EdgeResponse
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof EdgeResponse
     */
    longitude: number;
    /**
     * 
     * @type {number}
     * @memberof EdgeResponse
     */
    red: number;
    /**
     * 
     * @type {string}
     * @memberof EdgeResponse
     */
    subdivision_iso_code: string;
    /**
     * 
     * @type {number}
     * @memberof EdgeResponse
     */
    yellow: number;
}
/**
 * 
 * @export
 * @interface EgressHLSResponse
 */
export interface EgressHLSResponse {
    /**
     * 
     * @type {string}
     * @memberof EgressHLSResponse
     */
    playlist_url: string;
}
/**
 * 
 * @export
 * @interface EgressRTMPResponse
 */
export interface EgressRTMPResponse {
    /**
     * 
     * @type {string}
     * @memberof EgressRTMPResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof EgressRTMPResponse
     */
    stream_key: string;
    /**
     * 
     * @type {string}
     * @memberof EgressRTMPResponse
     */
    url: string;
}
/**
 * 
 * @export
 * @interface EgressResponse
 */
export interface EgressResponse {
    /**
     * 
     * @type {boolean}
     * @memberof EgressResponse
     */
    broadcasting: boolean;
    /**
     * 
     * @type {EgressHLSResponse}
     * @memberof EgressResponse
     */
    hls?: EgressHLSResponse;
    /**
     * 
     * @type {Array<EgressRTMPResponse>}
     * @memberof EgressResponse
     */
    rtmps: Array<EgressRTMPResponse>;
}
/**
 * 
 * @export
 * @interface EndCallResponse
 */
export interface EndCallResponse {
    /**
     * 
     * @type {string}
     * @memberof EndCallResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface ErrorResult
 */
export interface ErrorResult {
    /**
     * 
     * @type {string}
     * @memberof ErrorResult
     */
    stacktrace?: string;
    /**
     * 
     * @type {string}
     * @memberof ErrorResult
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof ErrorResult
     */
    version?: string;
}
/**
 * 
 * @export
 * @interface EventNotificationSettings
 */
export interface EventNotificationSettings {
    /**
     * 
     * @type {APNS}
     * @memberof EventNotificationSettings
     */
    apns: APNS;
    /**
     * 
     * @type {boolean}
     * @memberof EventNotificationSettings
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface EventRequest
 */
export interface EventRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof EventRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof EventRequest
     */
    parent_id?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRequest
     */
    type: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof EventRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof EventRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface EventResponse
 */
export interface EventResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof EventResponse
     */
    duration: string;
    /**
     * 
     * @type {WSEvent}
     * @memberof EventResponse
     */
    event: WSEvent;
}
/**
 * 
 * @export
 * @interface ExportChannelsRequest
 */
export interface ExportChannelsRequest {
    /**
     * Export options for channels
     * @type {Array<ChannelExport>}
     * @memberof ExportChannelsRequest
     */
    channels: Array<ChannelExport>;
    /**
     * Set if deleted message text should be cleared
     * @type {boolean}
     * @memberof ExportChannelsRequest
     */
    clear_deleted_message_text?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ExportChannelsRequest
     */
    export_users?: boolean;
    /**
     * Set if you want to include deleted channels
     * @type {boolean}
     * @memberof ExportChannelsRequest
     */
    include_soft_deleted_channels?: boolean;
    /**
     * Set if you want to include truncated messages
     * @type {boolean}
     * @memberof ExportChannelsRequest
     */
    include_truncated_messages?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ExportChannelsRequest
     */
    version?: string;
}
/**
 * 
 * @export
 * @interface ExportChannelsResponse
 */
export interface ExportChannelsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ExportChannelsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof ExportChannelsResponse
     */
    task_id: string;
}
/**
 * 
 * @export
 * @interface ExportChannelsResult
 */
export interface ExportChannelsResult {
    /**
     * S3 path of result
     * @type {string}
     * @memberof ExportChannelsResult
     */
    path?: string;
    /**
     * S3 bucket name result
     * @type {string}
     * @memberof ExportChannelsResult
     */
    s3_bucket_name?: string;
    /**
     * URL of result
     * @type {string}
     * @memberof ExportChannelsResult
     */
    url: string;
}
/**
 * 
 * @export
 * @interface ExportUserResponse
 */
export interface ExportUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ExportUserResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<Message>}
     * @memberof ExportUserResponse
     */
    messages?: Array<Message>;
    /**
     * 
     * @type {Array<Reaction>}
     * @memberof ExportUserResponse
     */
    reactions?: Array<Reaction>;
    /**
     * 
     * @type {UserObject}
     * @memberof ExportUserResponse
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ExportUsersRequest
 */
export interface ExportUsersRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof ExportUsersRequest
     */
    user_ids: Array<string>;
}
/**
 * 
 * @export
 * @interface ExportUsersResponse
 */
export interface ExportUsersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ExportUsersResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof ExportUsersResponse
     */
    task_id: string;
}
/**
 * 
 * @export
 * @interface ExternalStorageResponse
 */
export interface ExternalStorageResponse {
    /**
     * 
     * @type {string}
     * @memberof ExternalStorageResponse
     */
    bucket: string;
    /**
     * 
     * @type {string}
     * @memberof ExternalStorageResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ExternalStorageResponse
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof ExternalStorageResponse
     */
    type: string;
}
/**
 * 
 * @export
 * @interface Field
 */
export interface Field {
    /**
     * 
     * @type {boolean}
     * @memberof Field
     */
    _short: boolean;
    /**
     * 
     * @type {string}
     * @memberof Field
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Field
     */
    value: string;
}
/**
 * 
 * @export
 * @interface FileDeleteResponse
 */
export interface FileDeleteResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof FileDeleteResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface FileUploadConfig
 */
export interface FileUploadConfig {
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfig
     */
    allowed_file_extensions?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfig
     */
    allowed_mime_types?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfig
     */
    blocked_file_extensions?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfig
     */
    blocked_mime_types?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof FileUploadConfig
     */
    size_limit: number;
}
/**
 * 
 * @export
 * @interface FileUploadRequest
 */
export interface FileUploadRequest {
    /**
     * file field
     * @type {string}
     * @memberof FileUploadRequest
     */
    file?: string;
    /**
     * 
     * @type {OnlyUserID}
     * @memberof FileUploadRequest
     */
    user?: OnlyUserID;
}
/**
 * 
 * @export
 * @interface FileUploadResponse
 */
export interface FileUploadResponse {
    /**
     * 
     * @type {string}
     * @memberof FileUploadResponse
     */
    duration: string;
    /**
     * URL to the uploaded asset. Should be used to put to `asset_url` attachment field
     * @type {string}
     * @memberof FileUploadResponse
     */
    file?: string;
    /**
     * URL of the file thumbnail for supported file formats. Should be put to `thumb_url` attachment field
     * @type {string}
     * @memberof FileUploadResponse
     */
    thumb_url?: string;
}
/**
 * 
 * @export
 * @interface FirebaseConfig
 */
export interface FirebaseConfig {
    /**
     * 
     * @type {boolean}
     * @memberof FirebaseConfig
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfig
     */
    apn_template?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfig
     */
    credentials_json?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfig
     */
    data_template?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfig
     */
    notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfig
     */
    server_key?: string;
}
/**
 * 
 * @export
 * @interface FirebaseConfigFields
 */
export interface FirebaseConfigFields {
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigFields
     */
    apn_template: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigFields
     */
    credentials_json?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigFields
     */
    data_template: string;
    /**
     * 
     * @type {boolean}
     * @memberof FirebaseConfigFields
     */
    enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigFields
     */
    notification_template: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigFields
     */
    server_key?: string;
}
/**
 * Contains information about flagged user or message
 * @export
 * @interface Flag
 */
export interface Flag {
    /**
     * Date of the approval
     * @type {number}
     * @memberof Flag
     */
    approved_at?: number;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof Flag
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof Flag
     */
    created_by_automod: boolean;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Flag
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {FlagDetails}
     * @memberof Flag
     */
    details?: FlagDetails;
    /**
     * 
     * @type {string}
     * @memberof Flag
     */
    reason?: string;
    /**
     * Date of the rejection
     * @type {number}
     * @memberof Flag
     */
    rejected_at?: number;
    /**
     * Date of the review
     * @type {number}
     * @memberof Flag
     */
    reviewed_at?: number;
    /**
     * 
     * @type {string}
     * @memberof Flag
     */
    reviewed_by?: string;
    /**
     * 
     * @type {Message}
     * @memberof Flag
     */
    target_message?: Message | null;
    /**
     * ID of flagged message
     * @type {string}
     * @memberof Flag
     */
    target_message_id?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof Flag
     */
    target_user?: UserObject;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof Flag
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Flag
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface FlagDetails
 */
export interface FlagDetails {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof FlagDetails
     */
    Extra: { [key: string]: any; };
    /**
     * 
     * @type {AutomodDetails}
     * @memberof FlagDetails
     */
    automod?: AutomodDetails;
    /**
     * 
     * @type {string}
     * @memberof FlagDetails
     */
    original_text: string;
}
/**
 * 
 * @export
 * @interface FlagFeedback
 */
export interface FlagFeedback {
    /**
     * 
     * @type {number}
     * @memberof FlagFeedback
     */
    created_at: number;
    /**
     * 
     * @type {Array<Label>}
     * @memberof FlagFeedback
     */
    labels: Array<Label>;
    /**
     * 
     * @type {string}
     * @memberof FlagFeedback
     */
    message_id: string;
}
/**
 * 
 * @export
 * @interface FlagMessageDetails
 */
export interface FlagMessageDetails {
    /**
     * 
     * @type {boolean}
     * @memberof FlagMessageDetails
     */
    pin_changed?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof FlagMessageDetails
     */
    should_enrich?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof FlagMessageDetails
     */
    skip_push?: boolean;
    /**
     * 
     * @type {string}
     * @memberof FlagMessageDetails
     */
    updated_by_id?: string;
}
/**
 * 
 * @export
 * @interface FlagRequest
 */
export interface FlagRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof FlagRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof FlagRequest
     */
    reason?: string;
    /**
     * ID of the message when reporting a message
     * @type {string}
     * @memberof FlagRequest
     */
    target_message_id?: string;
    /**
     * ID of the user when reporting a user
     * @type {string}
     * @memberof FlagRequest
     */
    target_user_id?: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof FlagRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof FlagRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface FlagResponse
 */
export interface FlagResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof FlagResponse
     */
    duration: string;
    /**
     * 
     * @type {Flag}
     * @memberof FlagResponse
     */
    flag?: Flag;
}
/**
 * 
 * @export
 * @interface FullUserResponse
 */
export interface FullUserResponse {
    /**
     * 
     * @type {boolean}
     * @memberof FullUserResponse
     */
    banned: boolean;
    /**
     * 
     * @type {Array<ChannelMute>}
     * @memberof FullUserResponse
     */
    channel_mutes: Array<ChannelMute>;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof FullUserResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    deactivated_at?: number;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {Array<Device>}
     * @memberof FullUserResponse
     */
    devices: Array<Device>;
    /**
     * 
     * @type {string}
     * @memberof FullUserResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof FullUserResponse
     */
    image?: string;
    /**
     * 
     * @type {boolean}
     * @memberof FullUserResponse
     */
    invisible: boolean;
    /**
     * 
     * @type {string}
     * @memberof FullUserResponse
     */
    language: string;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    last_active?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof FullUserResponse
     */
    latest_hidden_channels?: Array<string>;
    /**
     * 
     * @type {Array<UserMute>}
     * @memberof FullUserResponse
     */
    mutes: Array<UserMute>;
    /**
     * 
     * @type {string}
     * @memberof FullUserResponse
     */
    name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof FullUserResponse
     */
    online: boolean;
    /**
     * 
     * @type {PrivacySettings}
     * @memberof FullUserResponse
     */
    privacy_settings?: PrivacySettings;
    /**
     * 
     * @type {PushNotificationSettings}
     * @memberof FullUserResponse
     */
    push_notifications?: PushNotificationSettings;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    revoke_tokens_issued_before?: number;
    /**
     * 
     * @type {string}
     * @memberof FullUserResponse
     */
    role: string;
    /**
     * 
     * @type {boolean}
     * @memberof FullUserResponse
     */
    shadow_banned: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof FullUserResponse
     */
    teams: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    total_unread_count: number;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    unread_channels: number;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    unread_threads: number;
    /**
     * 
     * @type {number}
     * @memberof FullUserResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface GeofenceResponse
 */
export interface GeofenceResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof GeofenceResponse
     */
    country_codes?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof GeofenceResponse
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof GeofenceResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof GeofenceResponse
     */
    type?: string;
}
/**
 * 
 * @export
 * @interface GeofenceSettings
 */
export interface GeofenceSettings {
    /**
     * 
     * @type {Array<string>}
     * @memberof GeofenceSettings
     */
    names: Array<string>;
}
/**
 * 
 * @export
 * @interface GeofenceSettingsRequest
 */
export interface GeofenceSettingsRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof GeofenceSettingsRequest
     */
    names?: Array<string>;
}
/**
 * 
 * @export
 * @interface GeofenceSettingsResponse
 */
export interface GeofenceSettingsResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof GeofenceSettingsResponse
     */
    names: Array<string>;
}
/**
 * 
 * @export
 * @interface GeolocationResult
 */
export interface GeolocationResult {
    /**
     * 
     * @type {number}
     * @memberof GeolocationResult
     */
    accuracy_radius: number;
    /**
     * 
     * @type {string}
     * @memberof GeolocationResult
     */
    city: string;
    /**
     * 
     * @type {string}
     * @memberof GeolocationResult
     */
    continent: string;
    /**
     * 
     * @type {string}
     * @memberof GeolocationResult
     */
    continent_code: string;
    /**
     * 
     * @type {string}
     * @memberof GeolocationResult
     */
    country: string;
    /**
     * 
     * @type {string}
     * @memberof GeolocationResult
     */
    country_iso_code: string;
    /**
     * 
     * @type {number}
     * @memberof GeolocationResult
     */
    latitude: number;
    /**
     * 
     * @type {number}
     * @memberof GeolocationResult
     */
    longitude: number;
    /**
     * 
     * @type {string}
     * @memberof GeolocationResult
     */
    subdivision: string;
    /**
     * 
     * @type {string}
     * @memberof GeolocationResult
     */
    subdivision_iso_code: string;
}
/**
 * 
 * @export
 * @interface GetApplicationResponse
 */
export interface GetApplicationResponse {
    /**
     * 
     * @type {AppResponseFields}
     * @memberof GetApplicationResponse
     */
    app: AppResponseFields;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetApplicationResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface GetBlockListResponse
 */
export interface GetBlockListResponse {
    /**
     * 
     * @type {BlockList}
     * @memberof GetBlockListResponse
     */
    blocklist?: BlockList | null;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetBlockListResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface GetCallResponse
 */
export interface GetCallResponse {
    /**
     * 
     * @type {CallResponse}
     * @memberof GetCallResponse
     */
    call: CallResponse;
    /**
     * 
     * @type {string}
     * @memberof GetCallResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MemberResponse>}
     * @memberof GetCallResponse
     */
    members: Array<MemberResponse>;
    /**
     * 
     * @type {Array<OwnCapability>}
     * @memberof GetCallResponse
     */
    own_capabilities: Array<OwnCapability>;
}
/**
 * 
 * @export
 * @interface GetCallStatsResponse
 */
export interface GetCallStatsResponse {
    /**
     * 
     * @type {number}
     * @memberof GetCallStatsResponse
     */
    call_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof GetCallStatsResponse
     */
    call_status: string;
    /**
     * 
     * @type {CallTimeline}
     * @memberof GetCallStatsResponse
     */
    call_timeline?: CallTimeline;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetCallStatsResponse
     */
    duration: string;
    /**
     * 
     * @type {Stats}
     * @memberof GetCallStatsResponse
     */
    jitter?: Stats;
    /**
     * 
     * @type {Stats}
     * @memberof GetCallStatsResponse
     */
    latency?: Stats;
    /**
     * 
     * @type {number}
     * @memberof GetCallStatsResponse
     */
    max_freezes_duration_seconds: number;
    /**
     * 
     * @type {number}
     * @memberof GetCallStatsResponse
     */
    max_participants: number;
    /**
     * 
     * @type {number}
     * @memberof GetCallStatsResponse
     */
    max_total_quality_limitation_duration_seconds: number;
    /**
     * 
     * @type {Array<UserStats>}
     * @memberof GetCallStatsResponse
     */
    participant_report: Array<UserStats>;
    /**
     * 
     * @type {number}
     * @memberof GetCallStatsResponse
     */
    publishing_participants: number;
    /**
     * 
     * @type {number}
     * @memberof GetCallStatsResponse
     */
    quality_score: number;
    /**
     * 
     * @type {number}
     * @memberof GetCallStatsResponse
     */
    sfu_count: number;
    /**
     * 
     * @type {Array<SFULocationResponse>}
     * @memberof GetCallStatsResponse
     */
    sfus: Array<SFULocationResponse>;
}
/**
 * 
 * @export
 * @interface GetCallTypeResponse
 */
export interface GetCallTypeResponse {
    /**
     * 
     * @type {number}
     * @memberof GetCallTypeResponse
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof GetCallTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof GetCallTypeResponse
     */
    external_storage?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof GetCallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof GetCallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {NotificationSettings}
     * @memberof GetCallTypeResponse
     */
    notification_settings: NotificationSettings;
    /**
     * 
     * @type {CallSettingsResponse}
     * @memberof GetCallTypeResponse
     */
    settings: CallSettingsResponse;
    /**
     * 
     * @type {number}
     * @memberof GetCallTypeResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface GetCommandResponse
 */
export interface GetCommandResponse {
    /**
     * 
     * @type {string}
     * @memberof GetCommandResponse
     */
    args: string;
    /**
     * 
     * @type {number}
     * @memberof GetCommandResponse
     */
    readonly created_at?: number;
    /**
     * 
     * @type {string}
     * @memberof GetCommandResponse
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof GetCommandResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof GetCommandResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof GetCommandResponse
     */
    set: string;
    /**
     * 
     * @type {number}
     * @memberof GetCommandResponse
     */
    readonly updated_at?: number;
}
/**
 * 
 * @export
 * @interface GetCustomPermissionResponse
 */
export interface GetCustomPermissionResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetCustomPermissionResponse
     */
    duration: string;
    /**
     * 
     * @type {Permission}
     * @memberof GetCustomPermissionResponse
     */
    permission: Permission;
}
/**
 * 
 * @export
 * @interface GetEdgesResponse
 */
export interface GetEdgesResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetEdgesResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<EdgeResponse>}
     * @memberof GetEdgesResponse
     */
    edges: Array<EdgeResponse>;
}
/**
 * 
 * @export
 * @interface GetExportChannelsStatusResponse
 */
export interface GetExportChannelsStatusResponse {
    /**
     * 
     * @type {number}
     * @memberof GetExportChannelsStatusResponse
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof GetExportChannelsStatusResponse
     */
    duration: string;
    /**
     * 
     * @type {ErrorResult}
     * @memberof GetExportChannelsStatusResponse
     */
    error?: ErrorResult;
    /**
     * 
     * @type {ExportChannelsResult}
     * @memberof GetExportChannelsStatusResponse
     */
    result?: ExportChannelsResult;
    /**
     * 
     * @type {string}
     * @memberof GetExportChannelsStatusResponse
     */
    status: string;
    /**
     * 
     * @type {string}
     * @memberof GetExportChannelsStatusResponse
     */
    task_id: string;
    /**
     * 
     * @type {number}
     * @memberof GetExportChannelsStatusResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface GetImportResponse
 */
export interface GetImportResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetImportResponse
     */
    duration: string;
    /**
     * 
     * @type {ImportTask}
     * @memberof GetImportResponse
     */
    import_task?: ImportTask;
}
/**
 * 
 * @export
 * @interface GetManyMessagesResponse
 */
export interface GetManyMessagesResponse {
    /**
     * 
     * @type {string}
     * @memberof GetManyMessagesResponse
     */
    duration: string;
    /**
     * List of messages
     * @type {Array<Message>}
     * @memberof GetManyMessagesResponse
     */
    messages: Array<Message>;
}
/**
 * 
 * @export
 * @interface GetMessageResponse
 */
export interface GetMessageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetMessageResponse
     */
    duration: string;
    /**
     * 
     * @type {MessageWithChannelResponse}
     * @memberof GetMessageResponse
     */
    message: MessageWithChannelResponse;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof GetMessageResponse
     */
    pending_message_metadata?: { [key: string]: string; };
}
/**
 * 
 * @export
 * @interface GetOGResponse
 */
export interface GetOGResponse {
    /**
     * 
     * @type {Array<Action>}
     * @memberof GetOGResponse
     */
    actions?: Array<Action>;
    /**
     * URL of detected video or audio
     * @type {string}
     * @memberof GetOGResponse
     */
    asset_url?: string;
    /**
     * 
     * @type {string}
     * @memberof GetOGResponse
     */
    author_icon?: string;
    /**
     * og:site
     * @type {string}
     * @memberof GetOGResponse
     */
    author_link?: string;
    /**
     * og:site_name
     * @type {string}
     * @memberof GetOGResponse
     */
    author_name?: string;
    /**
     * 
     * @type {string}
     * @memberof GetOGResponse
     */
    color?: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof GetOGResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof GetOGResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof GetOGResponse
     */
    fallback?: string;
    /**
     * 
     * @type {Array<Field>}
     * @memberof GetOGResponse
     */
    fields?: Array<Field>;
    /**
     * 
     * @type {string}
     * @memberof GetOGResponse
     */
    footer?: string;
    /**
     * 
     * @type {string}
     * @memberof GetOGResponse
     */
    footer_icon?: string;
    /**
     * 
     * @type {Images}
     * @memberof GetOGResponse
     */
    giphy?: Images;
    /**
     * URL of detected image
     * @type {string}
     * @memberof GetOGResponse
     */
    image_url?: string;
    /**
     * extracted url from the text
     * @type {string}
     * @memberof GetOGResponse
     */
    og_scrape_url?: string;
    /**
     * 
     * @type {number}
     * @memberof GetOGResponse
     */
    original_height?: number;
    /**
     * 
     * @type {number}
     * @memberof GetOGResponse
     */
    original_width?: number;
    /**
     * 
     * @type {string}
     * @memberof GetOGResponse
     */
    pretext?: string;
    /**
     * og:description
     * @type {string}
     * @memberof GetOGResponse
     */
    text?: string;
    /**
     * URL of detected thumb image
     * @type {string}
     * @memberof GetOGResponse
     */
    thumb_url?: string;
    /**
     * og:title
     * @type {string}
     * @memberof GetOGResponse
     */
    title?: string;
    /**
     * og:url
     * @type {string}
     * @memberof GetOGResponse
     */
    title_link?: string;
    /**
     * Attachment type, could be empty, image, audio or video
     * @type {string}
     * @memberof GetOGResponse
     */
    type?: string;
}
/**
 * 
 * @export
 * @interface GetOrCreateCallRequest
 */
export interface GetOrCreateCallRequest {
    /**
     * 
     * @type {CallRequest}
     * @memberof GetOrCreateCallRequest
     */
    data?: CallRequest;
    /**
     * 
     * @type {number}
     * @memberof GetOrCreateCallRequest
     */
    members_limit?: number;
    /**
     * if provided it sends a notification event to the members for this call
     * @type {boolean}
     * @memberof GetOrCreateCallRequest
     */
    notify?: boolean;
    /**
     * if provided it sends a ring event to the members for this call
     * @type {boolean}
     * @memberof GetOrCreateCallRequest
     */
    ring?: boolean;
}
/**
 * 
 * @export
 * @interface GetOrCreateCallResponse
 */
export interface GetOrCreateCallResponse {
    /**
     * 
     * @type {CallResponse}
     * @memberof GetOrCreateCallResponse
     */
    call: CallResponse;
    /**
     * 
     * @type {boolean}
     * @memberof GetOrCreateCallResponse
     */
    created: boolean;
    /**
     * 
     * @type {string}
     * @memberof GetOrCreateCallResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MemberResponse>}
     * @memberof GetOrCreateCallResponse
     */
    members: Array<MemberResponse>;
    /**
     * 
     * @type {Array<OwnCapability>}
     * @memberof GetOrCreateCallResponse
     */
    own_capabilities: Array<OwnCapability>;
}
/**
 * 
 * @export
 * @interface GetRateLimitsResponse
 */
export interface GetRateLimitsResponse {
    /**
     * Map of endpoint rate limits for the Android platform
     * @type {{ [key: string]: LimitInfo; }}
     * @memberof GetRateLimitsResponse
     */
    android?: { [key: string]: LimitInfo; };
    /**
     * 
     * @type {string}
     * @memberof GetRateLimitsResponse
     */
    duration: string;
    /**
     * Map of endpoint rate limits for the iOS platform
     * @type {{ [key: string]: LimitInfo; }}
     * @memberof GetRateLimitsResponse
     */
    ios?: { [key: string]: LimitInfo; };
    /**
     * Map of endpoint rate limits for the server-side platform
     * @type {{ [key: string]: LimitInfo; }}
     * @memberof GetRateLimitsResponse
     */
    server_side?: { [key: string]: LimitInfo; };
    /**
     * Map of endpoint rate limits for the web platform
     * @type {{ [key: string]: LimitInfo; }}
     * @memberof GetRateLimitsResponse
     */
    web?: { [key: string]: LimitInfo; };
}
/**
 * 
 * @export
 * @interface GetReactionsResponse
 */
export interface GetReactionsResponse {
    /**
     * 
     * @type {string}
     * @memberof GetReactionsResponse
     */
    duration: string;
    /**
     * List of reactions
     * @type {Array<Reaction>}
     * @memberof GetReactionsResponse
     */
    reactions: Array<Reaction>;
}
/**
 * 
 * @export
 * @interface GetRepliesResponse
 */
export interface GetRepliesResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetRepliesResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MessageResponse>}
     * @memberof GetRepliesResponse
     */
    messages: Array<MessageResponse>;
}
/**
 * 
 * @export
 * @interface GetTaskResponse
 */
export interface GetTaskResponse {
    /**
     * 
     * @type {number}
     * @memberof GetTaskResponse
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof GetTaskResponse
     */
    duration: string;
    /**
     * 
     * @type {ErrorResult}
     * @memberof GetTaskResponse
     */
    error?: ErrorResult;
    /**
     * Result produced by task after completion
     * @type {{ [key: string]: any; }}
     * @memberof GetTaskResponse
     */
    result?: { [key: string]: any; };
    /**
     * Current status of task
     * @type {string}
     * @memberof GetTaskResponse
     */
    status: string;
    /**
     * ID of task
     * @type {string}
     * @memberof GetTaskResponse
     */
    task_id: string;
    /**
     * 
     * @type {number}
     * @memberof GetTaskResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface GetThreadResponse
 */
export interface GetThreadResponse {
    /**
     * 
     * @type {string}
     * @memberof GetThreadResponse
     */
    duration: string;
    /**
     * 
     * @type {ThreadStateResponse}
     * @memberof GetThreadResponse
     */
    thread: ThreadStateResponse;
}
/**
 * 
 * @export
 * @interface GoLiveRequest
 */
export interface GoLiveRequest {
    /**
     * 
     * @type {string}
     * @memberof GoLiveRequest
     */
    recording_storage_name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof GoLiveRequest
     */
    start_hls?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof GoLiveRequest
     */
    start_recording?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof GoLiveRequest
     */
    start_transcription?: boolean;
    /**
     * 
     * @type {string}
     * @memberof GoLiveRequest
     */
    transcription_storage_name?: string;
}
/**
 * 
 * @export
 * @interface GoLiveResponse
 */
export interface GoLiveResponse {
    /**
     * 
     * @type {CallResponse}
     * @memberof GoLiveResponse
     */
    call: CallResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GoLiveResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface HLSSettings
 */
export interface HLSSettings {
    /**
     * 
     * @type {boolean}
     * @memberof HLSSettings
     */
    auto_on: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof HLSSettings
     */
    enabled: boolean;
    /**
     * 
     * @type {LayoutSettings}
     * @memberof HLSSettings
     */
    layout?: LayoutSettings;
    /**
     * 
     * @type {Array<string>}
     * @memberof HLSSettings
     */
    quality_tracks: Array<string>;
}
/**
 * 
 * @export
 * @interface HLSSettingsRequest
 */
export interface HLSSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof HLSSettingsRequest
     */
    auto_on?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof HLSSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {LayoutSettingsRequest}
     * @memberof HLSSettingsRequest
     */
    layout?: LayoutSettingsRequest;
    /**
     * 
     * @type {Array<string>}
     * @memberof HLSSettingsRequest
     */
    quality_tracks: Array<string>;
}
/**
 * 
 * @export
 * @interface HLSSettingsResponse
 */
export interface HLSSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof HLSSettingsResponse
     */
    auto_on: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof HLSSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {LayoutSettingsResponse}
     * @memberof HLSSettingsResponse
     */
    layout: LayoutSettingsResponse;
    /**
     * 
     * @type {Array<string>}
     * @memberof HLSSettingsResponse
     */
    quality_tracks: Array<string>;
}
/**
 * 
 * @export
 * @interface HideChannelRequest
 */
export interface HideChannelRequest {
    /**
     * Whether to clear message history of the channel or not
     * @type {boolean}
     * @memberof HideChannelRequest
     */
    clear_history?: boolean;
    /**
     * 
     * @type {UserRequest}
     * @memberof HideChannelRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof HideChannelRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface HideChannelResponse
 */
export interface HideChannelResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof HideChannelResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface HuaweiConfig
 */
export interface HuaweiConfig {
    /**
     * 
     * @type {boolean}
     * @memberof HuaweiConfig
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof HuaweiConfig
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof HuaweiConfig
     */
    secret?: string;
}
/**
 * 
 * @export
 * @interface HuaweiConfigFields
 */
export interface HuaweiConfigFields {
    /**
     * 
     * @type {boolean}
     * @memberof HuaweiConfigFields
     */
    enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof HuaweiConfigFields
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof HuaweiConfigFields
     */
    secret?: string;
}
/**
 * 
 * @export
 * @interface ImageData
 */
export interface ImageData {
    /**
     * 
     * @type {string}
     * @memberof ImageData
     */
    frames: string;
    /**
     * 
     * @type {string}
     * @memberof ImageData
     */
    height: string;
    /**
     * 
     * @type {string}
     * @memberof ImageData
     */
    size: string;
    /**
     * 
     * @type {string}
     * @memberof ImageData
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof ImageData
     */
    width: string;
}
/**
 * 
 * @export
 * @interface ImageSize
 */
export interface ImageSize {
    /**
     * Crop mode
     * @type {string}
     * @memberof ImageSize
     */
    crop?: ImageSizeCropEnum;
    /**
     * Target image height
     * @type {number}
     * @memberof ImageSize
     */
    height?: number;
    /**
     * Resize method
     * @type {string}
     * @memberof ImageSize
     */
    resize?: ImageSizeResizeEnum;
    /**
     * Target image width
     * @type {number}
     * @memberof ImageSize
     */
    width?: number;
}


/**
 * @export
 */
export const ImageSizeCropEnum = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center'
} as const;
export type ImageSizeCropEnum = typeof ImageSizeCropEnum[keyof typeof ImageSizeCropEnum];

/**
 * @export
 */
export const ImageSizeResizeEnum = {
    CLIP: 'clip',
    CROP: 'crop',
    SCALE: 'scale',
    FILL: 'fill'
} as const;
export type ImageSizeResizeEnum = typeof ImageSizeResizeEnum[keyof typeof ImageSizeResizeEnum];

/**
 * 
 * @export
 * @interface ImageUploadRequest
 */
export interface ImageUploadRequest {
    /**
     * 
     * @type {string}
     * @memberof ImageUploadRequest
     */
    file?: string;
    /**
     * field with JSON-encoded array of image size configurations
     * @type {Array<ImageSize>}
     * @memberof ImageUploadRequest
     */
    upload_sizes?: Array<ImageSize>;
    /**
     * 
     * @type {OnlyUserID}
     * @memberof ImageUploadRequest
     */
    user?: OnlyUserID;
}
/**
 * 
 * @export
 * @interface ImageUploadResponse
 */
export interface ImageUploadResponse {
    /**
     * 
     * @type {string}
     * @memberof ImageUploadResponse
     */
    duration: string;
    /**
     * URL to the uploaded asset. Should be used to put to `asset_url` attachment field
     * @type {string}
     * @memberof ImageUploadResponse
     */
    file?: string;
    /**
     * URL of the file thumbnail for supported file formats. Should be put to `thumb_url` attachment field
     * @type {string}
     * @memberof ImageUploadResponse
     */
    thumb_url?: string;
    /**
     * 
     * @type {Array<ImageSize>}
     * @memberof ImageUploadResponse
     */
    upload_sizes?: Array<ImageSize>;
}
/**
 * 
 * @export
 * @interface Images
 */
export interface Images {
    /**
     * 
     * @type {ImageData}
     * @memberof Images
     */
    fixed_height: ImageData;
    /**
     * 
     * @type {ImageData}
     * @memberof Images
     */
    fixed_height_downsampled: ImageData;
    /**
     * 
     * @type {ImageData}
     * @memberof Images
     */
    fixed_height_still: ImageData;
    /**
     * 
     * @type {ImageData}
     * @memberof Images
     */
    fixed_width: ImageData;
    /**
     * 
     * @type {ImageData}
     * @memberof Images
     */
    fixed_width_downsampled: ImageData;
    /**
     * 
     * @type {ImageData}
     * @memberof Images
     */
    fixed_width_still: ImageData;
    /**
     * 
     * @type {ImageData}
     * @memberof Images
     */
    original: ImageData;
}
/**
 * 
 * @export
 * @interface ImportTask
 */
export interface ImportTask {
    /**
     * 
     * @type {number}
     * @memberof ImportTask
     */
    created_at: number;
    /**
     * 
     * @type {Array<ImportTaskHistory>}
     * @memberof ImportTask
     */
    history: Array<ImportTaskHistory>;
    /**
     * 
     * @type {string}
     * @memberof ImportTask
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ImportTask
     */
    mode: string;
    /**
     * 
     * @type {string}
     * @memberof ImportTask
     */
    path: string;
    /**
     * 
     * @type {number}
     * @memberof ImportTask
     */
    size?: number;
    /**
     * 
     * @type {string}
     * @memberof ImportTask
     */
    state: string;
    /**
     * 
     * @type {number}
     * @memberof ImportTask
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface ImportTaskHistory
 */
export interface ImportTaskHistory {
    /**
     * 
     * @type {number}
     * @memberof ImportTaskHistory
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof ImportTaskHistory
     */
    next_state: string;
    /**
     * 
     * @type {string}
     * @memberof ImportTaskHistory
     */
    prev_state: string;
}
/**
 * 
 * @export
 * @interface Label
 */
export interface Label {
    /**
     * 
     * @type {Array<string>}
     * @memberof Label
     */
    harm_labels?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Label
     */
    name: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof Label
     */
    phrase_list_ids?: Array<number>;
}
/**
 * 
 * @export
 * @interface LabelThresholds
 */
export interface LabelThresholds {
    /**
     * Threshold for automatic message block
     * @type {number}
     * @memberof LabelThresholds
     */
    block?: number;
    /**
     * Threshold for automatic message flag
     * @type {number}
     * @memberof LabelThresholds
     */
    flag?: number;
}
/**
 * 
 * @export
 * @interface LayoutSettings
 */
export interface LayoutSettings {
    /**
     * 
     * @type {string}
     * @memberof LayoutSettings
     */
    external_app_url: string;
    /**
     * 
     * @type {string}
     * @memberof LayoutSettings
     */
    external_css_url: string;
    /**
     * 
     * @type {string}
     * @memberof LayoutSettings
     */
    name: LayoutSettingsNameEnum;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof LayoutSettings
     */
    options?: { [key: string]: any; };
}


/**
 * @export
 */
export const LayoutSettingsNameEnum = {
    SPOTLIGHT: 'spotlight',
    GRID: 'grid',
    SINGLE_PARTICIPANT: 'single-participant',
    MOBILE: 'mobile',
    CUSTOM: 'custom'
} as const;
export type LayoutSettingsNameEnum = typeof LayoutSettingsNameEnum[keyof typeof LayoutSettingsNameEnum];

/**
 * 
 * @export
 * @interface LayoutSettingsRequest
 */
export interface LayoutSettingsRequest {
    /**
     * 
     * @type {string}
     * @memberof LayoutSettingsRequest
     */
    external_app_url?: string;
    /**
     * 
     * @type {string}
     * @memberof LayoutSettingsRequest
     */
    external_css_url?: string;
    /**
     * 
     * @type {string}
     * @memberof LayoutSettingsRequest
     */
    name: LayoutSettingsRequestNameEnum;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof LayoutSettingsRequest
     */
    options?: { [key: string]: any; };
}


/**
 * @export
 */
export const LayoutSettingsRequestNameEnum = {
    SPOTLIGHT: 'spotlight',
    GRID: 'grid',
    SINGLE_PARTICIPANT: 'single-participant',
    MOBILE: 'mobile',
    CUSTOM: 'custom'
} as const;
export type LayoutSettingsRequestNameEnum = typeof LayoutSettingsRequestNameEnum[keyof typeof LayoutSettingsRequestNameEnum];

/**
 * 
 * @export
 * @interface LayoutSettingsResponse
 */
export interface LayoutSettingsResponse {
    /**
     * 
     * @type {string}
     * @memberof LayoutSettingsResponse
     */
    external_app_url: string;
    /**
     * 
     * @type {string}
     * @memberof LayoutSettingsResponse
     */
    external_css_url: string;
    /**
     * 
     * @type {string}
     * @memberof LayoutSettingsResponse
     */
    name: LayoutSettingsResponseNameEnum;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof LayoutSettingsResponse
     */
    options?: { [key: string]: any; };
}


/**
 * @export
 */
export const LayoutSettingsResponseNameEnum = {
    SPOTLIGHT: 'spotlight',
    GRID: 'grid',
    SINGLE_PARTICIPANT: 'single-participant',
    MOBILE: 'mobile',
    CUSTOM: 'custom'
} as const;
export type LayoutSettingsResponseNameEnum = typeof LayoutSettingsResponseNameEnum[keyof typeof LayoutSettingsResponseNameEnum];

/**
 * 
 * @export
 * @interface LimitInfo
 */
export interface LimitInfo {
    /**
     * The maximum number of calls allowed for the time window
     * @type {number}
     * @memberof LimitInfo
     */
    limit: number;
    /**
     * The number of remaining calls in the current window
     * @type {number}
     * @memberof LimitInfo
     */
    remaining: number;
    /**
     * The Unix timestamp of the next window
     * @type {number}
     * @memberof LimitInfo
     */
    reset: number;
}
/**
 * 
 * @export
 * @interface ListBlockListResponse
 */
export interface ListBlockListResponse {
    /**
     * 
     * @type {Array<BlockList>}
     * @memberof ListBlockListResponse
     */
    blocklists: Array<BlockList>;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ListBlockListResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface ListCallTypeResponse
 */
export interface ListCallTypeResponse {
    /**
     * 
     * @type {{ [key: string]: CallTypeResponse; }}
     * @memberof ListCallTypeResponse
     */
    call_types: { [key: string]: CallTypeResponse; };
    /**
     * 
     * @type {string}
     * @memberof ListCallTypeResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface ListChannelTypesResponse
 */
export interface ListChannelTypesResponse {
    /**
     * Object with all channel types
     * @type {{ [key: string]: ChannelTypeConfig; }}
     * @memberof ListChannelTypesResponse
     */
    channel_types: { [key: string]: ChannelTypeConfig; };
    /**
     * 
     * @type {string}
     * @memberof ListChannelTypesResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface ListCommandsResponse
 */
export interface ListCommandsResponse {
    /**
     * 
     * @type {Array<Command>}
     * @memberof ListCommandsResponse
     */
    commands: Array<Command>;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ListCommandsResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface ListDevicesResponse
 */
export interface ListDevicesResponse {
    /**
     * List of devices
     * @type {Array<Device>}
     * @memberof ListDevicesResponse
     */
    devices: Array<Device>;
    /**
     * 
     * @type {string}
     * @memberof ListDevicesResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface ListExternalStorageResponse
 */
export interface ListExternalStorageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ListExternalStorageResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: ExternalStorageResponse; }}
     * @memberof ListExternalStorageResponse
     */
    external_storages: { [key: string]: ExternalStorageResponse; };
}
/**
 * 
 * @export
 * @interface ListImportsResponse
 */
export interface ListImportsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ListImportsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<ImportTask>}
     * @memberof ListImportsResponse
     */
    import_tasks: Array<ImportTask>;
}
/**
 * 
 * @export
 * @interface ListPermissionsResponse
 */
export interface ListPermissionsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ListPermissionsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<Permission>}
     * @memberof ListPermissionsResponse
     */
    permissions: Array<Permission>;
}
/**
 * 
 * @export
 * @interface ListPushProvidersResponse
 */
export interface ListPushProvidersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ListPushProvidersResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<PushProviderResponse>}
     * @memberof ListPushProvidersResponse
     */
    push_providers: Array<PushProviderResponse>;
}
/**
 * 
 * @export
 * @interface ListRecordingsResponse
 */
export interface ListRecordingsResponse {
    /**
     * 
     * @type {string}
     * @memberof ListRecordingsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<CallRecording>}
     * @memberof ListRecordingsResponse
     */
    recordings: Array<CallRecording>;
}
/**
 * 
 * @export
 * @interface ListRolesResponse
 */
export interface ListRolesResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ListRolesResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<Role>}
     * @memberof ListRolesResponse
     */
    roles: Array<Role>;
}
/**
 * 
 * @export
 * @interface ListTranscriptionsResponse
 */
export interface ListTranscriptionsResponse {
    /**
     * 
     * @type {string}
     * @memberof ListTranscriptionsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<CallTranscription>}
     * @memberof ListTranscriptionsResponse
     */
    transcriptions: Array<CallTranscription>;
}
/**
 * 
 * @export
 * @interface Location
 */
export interface Location {
    /**
     * 
     * @type {string}
     * @memberof Location
     */
    continent_code: string;
    /**
     * 
     * @type {string}
     * @memberof Location
     */
    country_iso_code: string;
    /**
     * 
     * @type {string}
     * @memberof Location
     */
    subdivision_iso_code: string;
}
/**
 * 
 * @export
 * @interface MOSStats
 */
export interface MOSStats {
    /**
     * 
     * @type {number}
     * @memberof MOSStats
     */
    average_score: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof MOSStats
     */
    histogram_duration_seconds: Array<number>;
    /**
     * 
     * @type {number}
     * @memberof MOSStats
     */
    max_score: number;
    /**
     * 
     * @type {number}
     * @memberof MOSStats
     */
    min_score: number;
}
/**
 * 
 * @export
 * @interface MarkChannelsReadRequest
 */
export interface MarkChannelsReadRequest {
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof MarkChannelsReadRequest
     */
    read_by_channel?: { [key: string]: string; };
    /**
     * 
     * @type {UserRequest}
     * @memberof MarkChannelsReadRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MarkChannelsReadRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface MarkReadRequest
 */
export interface MarkReadRequest {
    /**
     * ID of the message that is considered last read by client
     * @type {string}
     * @memberof MarkReadRequest
     */
    message_id?: string;
    /**
     * Optional Thread ID to specifically mark a given thread as read
     * @type {string}
     * @memberof MarkReadRequest
     */
    thread_id?: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof MarkReadRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MarkReadRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface MarkReadResponse
 */
export interface MarkReadResponse {
    /**
     * 
     * @type {string}
     * @memberof MarkReadResponse
     */
    duration: string;
    /**
     * 
     * @type {MessageReadEvent}
     * @memberof MarkReadResponse
     */
    event?: MessageReadEvent;
}
/**
 * 
 * @export
 * @interface MarkUnreadRequest
 */
export interface MarkUnreadRequest {
    /**
     * ID of the message from where the channel is marked unread
     * @type {string}
     * @memberof MarkUnreadRequest
     */
    message_id?: string;
    /**
     * Mark a thread unread, specify both the thread and message id
     * @type {string}
     * @memberof MarkUnreadRequest
     */
    thread_id?: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof MarkUnreadRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MarkUnreadRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface MediaPubSubHint
 */
export interface MediaPubSubHint {
    /**
     * 
     * @type {boolean}
     * @memberof MediaPubSubHint
     */
    audio_published: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MediaPubSubHint
     */
    audio_subscribed: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MediaPubSubHint
     */
    video_published: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MediaPubSubHint
     */
    video_subscribed: boolean;
}
/**
 * 
 * @export
 * @interface MemberRequest
 */
export interface MemberRequest {
    /**
     * Custom data for this object
     * @type {{ [key: string]: any; }}
     * @memberof MemberRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof MemberRequest
     */
    role?: string;
    /**
     * 
     * @type {string}
     * @memberof MemberRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface MemberResponse
 */
export interface MemberResponse {
    /**
     * Date/time of creation
     * @type {number}
     * @memberof MemberResponse
     */
    created_at: number;
    /**
     * Custom member response data
     * @type {{ [key: string]: any; }}
     * @memberof MemberResponse
     */
    custom: { [key: string]: any; };
    /**
     * Date/time of deletion
     * @type {number}
     * @memberof MemberResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {string}
     * @memberof MemberResponse
     */
    role?: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof MemberResponse
     */
    updated_at: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof MemberResponse
     */
    user: UserResponse;
    /**
     * 
     * @type {string}
     * @memberof MemberResponse
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface MembersResponse
 */
export interface MembersResponse {
    /**
     * 
     * @type {string}
     * @memberof MembersResponse
     */
    duration: string;
    /**
     * List of found members
     * @type {Array<ChannelMember>}
     * @memberof MembersResponse
     */
    members: Array<ChannelMember>;
}
/**
 * Represents any chat message
 * @export
 * @interface Message
 */
export interface Message {
    /**
     * Array of message attachments
     * @type {Array<Attachment>}
     * @memberof Message
     */
    attachments: Array<Attachment>;
    /**
     * Whether `before_message_send webhook` failed or not. Field is only accessible in push webhook
     * @type {boolean}
     * @memberof Message
     */
    before_message_send_failed?: boolean;
    /**
     * Channel unique identifier in <type>:<id> format
     * @type {string}
     * @memberof Message
     */
    cid: string;
    /**
     * Contains provided slash command
     * @type {string}
     * @memberof Message
     */
    command?: string;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof Message
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Message
     */
    custom: { [key: string]: any; };
    /**
     * Date/time of deletion
     * @type {number}
     * @memberof Message
     */
    deleted_at?: number;
    /**
     * 
     * @type {number}
     * @memberof Message
     */
    deleted_reply_count: number;
    /**
     * Contains HTML markup of the message. Can only be set when using server-side API
     * @type {string}
     * @memberof Message
     */
    html: string;
    /**
     * Object with translations. Key `language` contains the original language key. Other keys contain translations
     * @type {{ [key: string]: string; }}
     * @memberof Message
     */
    i18n?: { [key: string]: string; };
    /**
     * Message ID is unique string identifier of the message
     * @type {string}
     * @memberof Message
     */
    id: string;
    /**
     * Contains image moderation information
     * @type {{ [key: string]: Array<string>; }}
     * @memberof Message
     */
    image_labels?: { [key: string]: Array<string>; };
    /**
     * List of 10 latest reactions to this message
     * @type {Array<Reaction>}
     * @memberof Message
     */
    latest_reactions: Array<Reaction>;
    /**
     * List of mentioned users
     * @type {Array<UserObject>}
     * @memberof Message
     */
    mentioned_users: Array<UserObject>;
    /**
     * 
     * @type {number}
     * @memberof Message
     */
    message_text_updated_at?: number;
    /**
     * Should be empty if `text` is provided. Can only be set when using server-side API
     * @type {string}
     * @memberof Message
     */
    mml?: string;
    /**
     * List of 10 latest reactions of authenticated user to this message
     * @type {Array<Reaction>}
     * @memberof Message
     */
    own_reactions: Array<Reaction>;
    /**
     * ID of parent message (thread)
     * @type {string}
     * @memberof Message
     */
    parent_id?: string;
    /**
     * Date when pinned message expires
     * @type {number}
     * @memberof Message
     */
    pin_expires?: number;
    /**
     * Whether message is pinned or not
     * @type {boolean}
     * @memberof Message
     */
    pinned: boolean;
    /**
     * Date when message got pinned
     * @type {number}
     * @memberof Message
     */
    pinned_at?: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Message
     */
    pinned_by?: UserObject;
    /**
     * 
     * @type {Poll}
     * @memberof Message
     */
    poll?: Poll;
    /**
     * Identifier of the poll to include in the message
     * @type {string}
     * @memberof Message
     */
    poll_id?: string;
    /**
     * 
     * @type {Message}
     * @memberof Message
     */
    quoted_message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    quoted_message_id?: string;
    /**
     * An object containing number of reactions of each type. Key: reaction type (string), value: number of reactions (int)
     * @type {{ [key: string]: number; }}
     * @memberof Message
     */
    reaction_counts: { [key: string]: number; };
    /**
     * 
     * @type {{ [key: string]: ReactionGroupResponse; }}
     * @memberof Message
     */
    reaction_groups: { [key: string]: ReactionGroupResponse; };
    /**
     * An object containing scores of reactions of each type. Key: reaction type (string), value: total score of reactions (int)
     * @type {{ [key: string]: number; }}
     * @memberof Message
     */
    reaction_scores: { [key: string]: number; };
    /**
     * Number of replies to this message
     * @type {number}
     * @memberof Message
     */
    reply_count: number;
    /**
     * Whether the message was shadowed or not
     * @type {boolean}
     * @memberof Message
     */
    shadowed: boolean;
    /**
     * Whether thread reply should be shown in the channel as well
     * @type {boolean}
     * @memberof Message
     */
    show_in_channel?: boolean;
    /**
     * Whether message is silent or not
     * @type {boolean}
     * @memberof Message
     */
    silent: boolean;
    /**
     * Text of the message. Should be empty if `mml` is provided
     * @type {string}
     * @memberof Message
     */
    text: string;
    /**
     * List of users who participate in thread
     * @type {Array<UserObject>}
     * @memberof Message
     */
    thread_participants?: Array<UserObject>;
    /**
     * Contains type of the message
     * @type {string}
     * @memberof Message
     */
    type: MessageTypeEnum;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof Message
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Message
     */
    user?: UserObject;
}


/**
 * @export
 */
export const MessageTypeEnum = {
    REGULAR: 'regular',
    EPHEMERAL: 'ephemeral',
    ERROR: 'error',
    REPLY: 'reply',
    SYSTEM: 'system',
    DELETED: 'deleted'
} as const;
export type MessageTypeEnum = typeof MessageTypeEnum[keyof typeof MessageTypeEnum];

/**
 * 
 * @export
 * @interface MessageActionRequest
 */
export interface MessageActionRequest {
    /**
     * ReadOnlyData to execute command with
     * @type {{ [key: string]: string; }}
     * @memberof MessageActionRequest
     */
    form_data: { [key: string]: string; };
    /**
     * 
     * @type {UserRequest}
     * @memberof MessageActionRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MessageActionRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface MessageChangeSet
 */
export interface MessageChangeSet {
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    attachments: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    custom: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    html: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    mentioned_user_ids: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    mml: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    pin: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    quoted_message_id: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    silent: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageChangeSet
     */
    text: boolean;
}
/**
 * 
 * @export
 * @interface MessageFlag
 */
export interface MessageFlag {
    /**
     * 
     * @type {number}
     * @memberof MessageFlag
     */
    approved_at?: number;
    /**
     * 
     * @type {number}
     * @memberof MessageFlag
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof MessageFlag
     */
    created_by_automod: boolean;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof MessageFlag
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {FlagDetails}
     * @memberof MessageFlag
     */
    details?: FlagDetails;
    /**
     * 
     * @type {Message}
     * @memberof MessageFlag
     */
    message?: Message | null;
    /**
     * 
     * @type {FlagFeedback}
     * @memberof MessageFlag
     */
    moderation_feedback?: FlagFeedback;
    /**
     * 
     * @type {MessageModerationResult}
     * @memberof MessageFlag
     */
    moderation_result?: MessageModerationResult;
    /**
     * 
     * @type {string}
     * @memberof MessageFlag
     */
    reason?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageFlag
     */
    rejected_at?: number;
    /**
     * 
     * @type {number}
     * @memberof MessageFlag
     */
    reviewed_at?: number;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageFlag
     */
    reviewed_by?: UserObject;
    /**
     * 
     * @type {number}
     * @memberof MessageFlag
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageFlag
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface MessageHistoryEntry
 */
export interface MessageHistoryEntry {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof MessageHistoryEntry
     */
    Custom: { [key: string]: any; };
    /**
     * 
     * @type {Array<Attachment>}
     * @memberof MessageHistoryEntry
     */
    attachments: Array<Attachment>;
    /**
     * 
     * @type {string}
     * @memberof MessageHistoryEntry
     */
    message_id: string;
    /**
     * 
     * @type {number}
     * @memberof MessageHistoryEntry
     */
    message_updated_at: number;
    /**
     * 
     * @type {string}
     * @memberof MessageHistoryEntry
     */
    message_updated_by_id: string;
    /**
     * 
     * @type {string}
     * @memberof MessageHistoryEntry
     */
    text: string;
}
/**
 * 
 * @export
 * @interface MessageModerationResult
 */
export interface MessageModerationResult {
    /**
     * 
     * @type {string}
     * @memberof MessageModerationResult
     */
    action: string;
    /**
     * 
     * @type {ModerationResponse}
     * @memberof MessageModerationResult
     */
    ai_moderation_response?: ModerationResponse;
    /**
     * 
     * @type {string}
     * @memberof MessageModerationResult
     */
    blocked_word?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageModerationResult
     */
    blocklist_name?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageModerationResult
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof MessageModerationResult
     */
    message_id: string;
    /**
     * 
     * @type {string}
     * @memberof MessageModerationResult
     */
    moderated_by?: string;
    /**
     * 
     * @type {Thresholds}
     * @memberof MessageModerationResult
     */
    moderation_thresholds?: Thresholds;
    /**
     * 
     * @type {number}
     * @memberof MessageModerationResult
     */
    updated_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof MessageModerationResult
     */
    user_bad_karma: boolean;
    /**
     * 
     * @type {number}
     * @memberof MessageModerationResult
     */
    user_karma: number;
}
/**
 * 
 * @export
 * @interface MessageReadEvent
 */
export interface MessageReadEvent {
    /**
     * 
     * @type {string}
     * @memberof MessageReadEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof MessageReadEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof MessageReadEvent
     */
    cid: string;
    /**
     * 
     * @type {number}
     * @memberof MessageReadEvent
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof MessageReadEvent
     */
    last_read_message_id?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageReadEvent
     */
    team?: string;
    /**
     * 
     * @type {Thread}
     * @memberof MessageReadEvent
     */
    thread?: Thread;
    /**
     * 
     * @type {string}
     * @memberof MessageReadEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageReadEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface MessageRequest
 */
export interface MessageRequest {
    /**
     * 
     * @type {Array<Attachment>}
     * @memberof MessageRequest
     */
    attachments?: Array<Attachment>;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof MessageRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    html?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    id?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof MessageRequest
     */
    mentioned_users?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    mml?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    parent_id?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageRequest
     */
    pin_expires?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MessageRequest
     */
    pinned?: boolean;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    pinned_at?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    poll_id?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    quoted_message_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof MessageRequest
     */
    show_in_channel?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageRequest
     */
    silent?: boolean;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    text?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    type?: MessageRequestTypeEnum;
    /**
     * 
     * @type {UserRequest}
     * @memberof MessageRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    user_id?: string;
}


/**
 * @export
 */
export const MessageRequestTypeEnum = {
    REGULAR: '\'\'regular',
    SYSTEM: 'system'
} as const;
export type MessageRequestTypeEnum = typeof MessageRequestTypeEnum[keyof typeof MessageRequestTypeEnum];

/**
 * 
 * @export
 * @interface MessageResponse
 */
export interface MessageResponse {
    /**
     * 
     * @type {Array<Attachment>}
     * @memberof MessageResponse
     */
    attachments: Array<Attachment>;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    command?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof MessageResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    deleted_reply_count: number;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    html: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof MessageResponse
     */
    i18n?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    id: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof MessageResponse
     */
    image_labels?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {Array<ReactionResponse>}
     * @memberof MessageResponse
     */
    latest_reactions: Array<ReactionResponse>;
    /**
     * 
     * @type {Array<UserResponse>}
     * @memberof MessageResponse
     */
    mentioned_users: Array<UserResponse>;
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    message_text_updated_at?: number;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    mml?: string;
    /**
     * 
     * @type {Array<ReactionResponse>}
     * @memberof MessageResponse
     */
    own_reactions: Array<ReactionResponse>;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    parent_id?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    pin_expires?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MessageResponse
     */
    pinned: boolean;
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    pinned_at?: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof MessageResponse
     */
    pinned_by?: UserResponse;
    /**
     * 
     * @type {Poll}
     * @memberof MessageResponse
     */
    poll?: Poll;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    poll_id?: string;
    /**
     * 
     * @type {Message}
     * @memberof MessageResponse
     */
    quoted_message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    quoted_message_id?: string;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof MessageResponse
     */
    reaction_counts: { [key: string]: number; };
    /**
     * 
     * @type {{ [key: string]: ReactionGroupResponse; }}
     * @memberof MessageResponse
     */
    reaction_groups?: { [key: string]: ReactionGroupResponse; };
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof MessageResponse
     */
    reaction_scores: { [key: string]: number; };
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    reply_count: number;
    /**
     * 
     * @type {boolean}
     * @memberof MessageResponse
     */
    shadowed: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageResponse
     */
    show_in_channel?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageResponse
     */
    silent: boolean;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    text: string;
    /**
     * 
     * @type {Array<UserResponse>}
     * @memberof MessageResponse
     */
    thread_participants?: Array<UserResponse>;
    /**
     * 
     * @type {string}
     * @memberof MessageResponse
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof MessageResponse
     */
    updated_at: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof MessageResponse
     */
    user: UserResponse;
}
/**
 * 
 * @export
 * @interface MessageUpdate
 */
export interface MessageUpdate {
    /**
     * 
     * @type {MessageChangeSet}
     * @memberof MessageUpdate
     */
    change_set?: MessageChangeSet;
    /**
     * 
     * @type {string}
     * @memberof MessageUpdate
     */
    old_text?: string;
}
/**
 * 
 * @export
 * @interface MessageWithChannelResponse
 */
export interface MessageWithChannelResponse {
    /**
     * 
     * @type {Array<Attachment>}
     * @memberof MessageWithChannelResponse
     */
    attachments: Array<Attachment>;
    /**
     * 
     * @type {ChannelResponse}
     * @memberof MessageWithChannelResponse
     */
    channel: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    command?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof MessageWithChannelResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    deleted_reply_count: number;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    html: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof MessageWithChannelResponse
     */
    i18n?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    id: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof MessageWithChannelResponse
     */
    image_labels?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {Array<ReactionResponse>}
     * @memberof MessageWithChannelResponse
     */
    latest_reactions: Array<ReactionResponse>;
    /**
     * 
     * @type {Array<UserResponse>}
     * @memberof MessageWithChannelResponse
     */
    mentioned_users: Array<UserResponse>;
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    message_text_updated_at?: number;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    mml?: string;
    /**
     * 
     * @type {Array<ReactionResponse>}
     * @memberof MessageWithChannelResponse
     */
    own_reactions: Array<ReactionResponse>;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    parent_id?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    pin_expires?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MessageWithChannelResponse
     */
    pinned: boolean;
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    pinned_at?: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof MessageWithChannelResponse
     */
    pinned_by?: UserResponse;
    /**
     * 
     * @type {Poll}
     * @memberof MessageWithChannelResponse
     */
    poll?: Poll;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    poll_id?: string;
    /**
     * 
     * @type {Message}
     * @memberof MessageWithChannelResponse
     */
    quoted_message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    quoted_message_id?: string;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof MessageWithChannelResponse
     */
    reaction_counts: { [key: string]: number; };
    /**
     * 
     * @type {{ [key: string]: ReactionGroupResponse; }}
     * @memberof MessageWithChannelResponse
     */
    reaction_groups?: { [key: string]: ReactionGroupResponse; };
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof MessageWithChannelResponse
     */
    reaction_scores: { [key: string]: number; };
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    reply_count: number;
    /**
     * 
     * @type {boolean}
     * @memberof MessageWithChannelResponse
     */
    shadowed: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageWithChannelResponse
     */
    show_in_channel?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MessageWithChannelResponse
     */
    silent: boolean;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    text: string;
    /**
     * 
     * @type {Array<UserResponse>}
     * @memberof MessageWithChannelResponse
     */
    thread_participants?: Array<UserResponse>;
    /**
     * 
     * @type {string}
     * @memberof MessageWithChannelResponse
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof MessageWithChannelResponse
     */
    updated_at: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof MessageWithChannelResponse
     */
    user: UserResponse;
}
/**
 * 
 * @export
 * @interface ModerationResponse
 */
export interface ModerationResponse {
    /**
     * 
     * @type {string}
     * @memberof ModerationResponse
     */
    action: string;
    /**
     * 
     * @type {number}
     * @memberof ModerationResponse
     */
    explicit: number;
    /**
     * 
     * @type {number}
     * @memberof ModerationResponse
     */
    spam: number;
    /**
     * 
     * @type {number}
     * @memberof ModerationResponse
     */
    toxic: number;
}
/**
 * 
 * @export
 * @interface MuteChannelRequest
 */
export interface MuteChannelRequest {
    /**
     * Channel CIDs to mute (if multiple channels)
     * @type {Array<string>}
     * @memberof MuteChannelRequest
     */
    channel_cids?: Array<string>;
    /**
     * Duration of mute in milliseconds
     * @type {number}
     * @memberof MuteChannelRequest
     */
    expiration?: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof MuteChannelRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MuteChannelRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface MuteChannelResponse
 */
export interface MuteChannelResponse {
    /**
     * 
     * @type {ChannelMute}
     * @memberof MuteChannelResponse
     */
    channel_mute?: ChannelMute | null;
    /**
     * Object with mutes (if multiple channels were muted)
     * @type {Array<ChannelMute>}
     * @memberof MuteChannelResponse
     */
    channel_mutes?: Array<ChannelMute>;
    /**
     * 
     * @type {string}
     * @memberof MuteChannelResponse
     */
    duration: string;
    /**
     * 
     * @type {OwnUser}
     * @memberof MuteChannelResponse
     */
    own_user?: OwnUser;
}
/**
 * 
 * @export
 * @interface MuteUserRequest
 */
export interface MuteUserRequest {
    /**
     * User IDs to mute (if multiple users)
     * @type {Array<string>}
     * @memberof MuteUserRequest
     */
    target_ids?: Array<string>;
    /**
     * Duration of mute in minutes
     * @type {number}
     * @memberof MuteUserRequest
     */
    timeout: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof MuteUserRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MuteUserRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface MuteUserResponse
 */
export interface MuteUserResponse {
    /**
     * 
     * @type {string}
     * @memberof MuteUserResponse
     */
    duration: string;
    /**
     * 
     * @type {UserMute}
     * @memberof MuteUserResponse
     */
    mute?: UserMute | null;
    /**
     * Object with mutes (if multiple users were muted)
     * @type {Array<UserMute>}
     * @memberof MuteUserResponse
     */
    mutes?: Array<UserMute>;
    /**
     * 
     * @type {Array<string>}
     * @memberof MuteUserResponse
     */
    non_existing_users?: Array<string>;
    /**
     * 
     * @type {OwnUser}
     * @memberof MuteUserResponse
     */
    own_user?: OwnUser;
}
/**
 * 
 * @export
 * @interface MuteUsersRequest
 */
export interface MuteUsersRequest {
    /**
     * 
     * @type {boolean}
     * @memberof MuteUsersRequest
     */
    audio?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MuteUsersRequest
     */
    mute_all_users?: boolean;
    /**
     * 
     * @type {UserRequest}
     * @memberof MuteUsersRequest
     */
    muted_by?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof MuteUsersRequest
     */
    muted_by_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof MuteUsersRequest
     */
    screenshare?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MuteUsersRequest
     */
    screenshare_audio?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof MuteUsersRequest
     */
    user_ids?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof MuteUsersRequest
     */
    video?: boolean;
}
/**
 * 
 * @export
 * @interface MuteUsersResponse
 */
export interface MuteUsersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof MuteUsersResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface NoiseCancellationSettings
 */
export interface NoiseCancellationSettings {
    /**
     * 
     * @type {string}
     * @memberof NoiseCancellationSettings
     */
    mode: NoiseCancellationSettingsModeEnum;
}


/**
 * @export
 */
export const NoiseCancellationSettingsModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type NoiseCancellationSettingsModeEnum = typeof NoiseCancellationSettingsModeEnum[keyof typeof NoiseCancellationSettingsModeEnum];

/**
 * 
 * @export
 * @interface NotificationSettings
 */
export interface NotificationSettings {
    /**
     * 
     * @type {EventNotificationSettings}
     * @memberof NotificationSettings
     */
    call_live_started: EventNotificationSettings;
    /**
     * 
     * @type {EventNotificationSettings}
     * @memberof NotificationSettings
     */
    call_notification: EventNotificationSettings;
    /**
     * 
     * @type {EventNotificationSettings}
     * @memberof NotificationSettings
     */
    call_ring: EventNotificationSettings;
    /**
     * 
     * @type {boolean}
     * @memberof NotificationSettings
     */
    enabled: boolean;
    /**
     * 
     * @type {EventNotificationSettings}
     * @memberof NotificationSettings
     */
    session_started: EventNotificationSettings;
}
/**
 * 
 * @export
 * @interface NullBool
 */
export interface NullBool {
    /**
     * 
     * @type {boolean}
     * @memberof NullBool
     */
    HasValue?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof NullBool
     */
    Value?: boolean;
}
/**
 * 
 * @export
 * @interface NullTime
 */
export interface NullTime {
    /**
     * 
     * @type {boolean}
     * @memberof NullTime
     */
    HasValue?: boolean;
    /**
     * 
     * @type {number}
     * @memberof NullTime
     */
    Value?: number;
}
/**
 * 
 * @export
 * @interface OnlyUserID
 */
export interface OnlyUserID {
    /**
     * 
     * @type {string}
     * @memberof OnlyUserID
     */
    id: string;
}

/**
 * All possibility of string to use
 * @export
 */
export const OwnCapability = {
    BLOCK_USERS: 'block-users',
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
export type OwnCapability = typeof OwnCapability[keyof typeof OwnCapability];

/**
 * 
 * @export
 * @interface OwnUser
 */
export interface OwnUser {
    /**
     * 
     * @type {boolean}
     * @memberof OwnUser
     */
    banned: boolean;
    /**
     * 
     * @type {Array<ChannelMute>}
     * @memberof OwnUser
     */
    channel_mutes: Array<ChannelMute>;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof OwnUser
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    deactivated_at?: number;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    deleted_at?: number;
    /**
     * 
     * @type {Array<Device>}
     * @memberof OwnUser
     */
    devices: Array<Device>;
    /**
     * 
     * @type {string}
     * @memberof OwnUser
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof OwnUser
     */
    invisible?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OwnUser
     */
    language: string;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    last_active?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof OwnUser
     */
    latest_hidden_channels?: Array<string>;
    /**
     * 
     * @type {Array<UserMute>}
     * @memberof OwnUser
     */
    mutes: Array<UserMute>;
    /**
     * 
     * @type {boolean}
     * @memberof OwnUser
     */
    online: boolean;
    /**
     * 
     * @type {PrivacySettings}
     * @memberof OwnUser
     */
    privacy_settings?: PrivacySettings;
    /**
     * 
     * @type {PushNotificationSettings}
     * @memberof OwnUser
     */
    push_notifications?: PushNotificationSettings;
    /**
     * 
     * @type {string}
     * @memberof OwnUser
     */
    role: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof OwnUser
     */
    teams?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    total_unread_count: number;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    unread_channels: number;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    unread_count: number;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    unread_threads: number;
    /**
     * 
     * @type {number}
     * @memberof OwnUser
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface PaginationParams
 */
export interface PaginationParams {
    /**
     * 
     * @type {number}
     * @memberof PaginationParams
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationParams
     */
    offset?: number;
}
/**
 * 
 * @export
 * @interface PendingMessage
 */
export interface PendingMessage {
    /**
     * 
     * @type {Channel}
     * @memberof PendingMessage
     */
    channel?: Channel;
    /**
     * 
     * @type {Message}
     * @memberof PendingMessage
     */
    message?: Message | null;
    /**
     * Additional data attached to the pending message. This data is discarded once the pending message is committed.
     * @type {{ [key: string]: string; }}
     * @memberof PendingMessage
     */
    metadata?: { [key: string]: string; };
    /**
     * 
     * @type {UserObject}
     * @memberof PendingMessage
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface Permission
 */
export interface Permission {
    /**
     * Action name this permission is for (e.g. SendMessage)
     * @type {string}
     * @memberof Permission
     */
    action: string;
    /**
     * MongoDB style condition which decides whether or not the permission is granted
     * @type {{ [key: string]: any; }}
     * @memberof Permission
     */
    condition?: { [key: string]: any; };
    /**
     * Whether this is a custom permission or built-in
     * @type {boolean}
     * @memberof Permission
     */
    custom: boolean;
    /**
     * Description of the permission
     * @type {string}
     * @memberof Permission
     */
    description: string;
    /**
     * Unique permission ID
     * @type {string}
     * @memberof Permission
     */
    id: string;
    /**
     * Level at which permission could be applied (app or channel)
     * @type {string}
     * @memberof Permission
     */
    level: PermissionLevelEnum;
    /**
     * Name of the permission
     * @type {string}
     * @memberof Permission
     */
    name: string;
    /**
     * Whether this permission applies to resource owner or not
     * @type {boolean}
     * @memberof Permission
     */
    owner: boolean;
    /**
     * Whether this permission applies to teammates (multi-tenancy mode only)
     * @type {boolean}
     * @memberof Permission
     */
    same_team: boolean;
    /**
     * List of tags of the permission
     * @type {Array<string>}
     * @memberof Permission
     */
    tags: Array<string>;
}


/**
 * @export
 */
export const PermissionLevelEnum = {
    APP: 'app',
    CHANNEL: 'channel'
} as const;
export type PermissionLevelEnum = typeof PermissionLevelEnum[keyof typeof PermissionLevelEnum];

/**
 * 
 * @export
 * @interface PinRequest
 */
export interface PinRequest {
    /**
     * 
     * @type {string}
     * @memberof PinRequest
     */
    session_id: string;
    /**
     * 
     * @type {string}
     * @memberof PinRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface PinResponse
 */
export interface PinResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof PinResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface Policy
 */
export interface Policy {
    /**
     * 
     * @type {number}
     * @memberof Policy
     */
    action: number;
    /**
     * 
     * @type {number}
     * @memberof Policy
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof Policy
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof Policy
     */
    owner: boolean;
    /**
     * 
     * @type {number}
     * @memberof Policy
     */
    priority: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Policy
     */
    resources: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Policy
     */
    roles: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof Policy
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface PolicyRequest
 */
export interface PolicyRequest {
    /**
     * 
     * @type {string}
     * @memberof PolicyRequest
     */
    action: PolicyRequestActionEnum;
    /**
     * User-friendly policy name
     * @type {string}
     * @memberof PolicyRequest
     */
    name: string;
    /**
     * Whether policy applies to resource owner or not
     * @type {boolean}
     * @memberof PolicyRequest
     */
    owner: boolean;
    /**
     * Policy priority
     * @type {number}
     * @memberof PolicyRequest
     */
    priority: number;
    /**
     * List of resources to apply policy to
     * @type {Array<string>}
     * @memberof PolicyRequest
     */
    resources: Array<string>;
    /**
     * List of roles to apply policy to
     * @type {Array<string>}
     * @memberof PolicyRequest
     */
    roles: Array<string>;
}


/**
 * @export
 */
export const PolicyRequestActionEnum = {
    DENY: 'Deny',
    ALLOW: 'Allow'
} as const;
export type PolicyRequestActionEnum = typeof PolicyRequestActionEnum[keyof typeof PolicyRequestActionEnum];

/**
 * 
 * @export
 * @interface Poll
 */
export interface Poll {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Poll
     */
    Custom: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof Poll
     */
    allow_answers: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Poll
     */
    allow_user_suggested_options: boolean;
    /**
     * 
     * @type {number}
     * @memberof Poll
     */
    answers_count: number;
    /**
     * 
     * @type {number}
     * @memberof Poll
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Poll
     */
    created_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof Poll
     */
    created_by_id: string;
    /**
     * 
     * @type {string}
     * @memberof Poll
     */
    description: string;
    /**
     * 
     * @type {boolean}
     * @memberof Poll
     */
    enforce_unique_vote: boolean;
    /**
     * 
     * @type {string}
     * @memberof Poll
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof Poll
     */
    is_closed?: boolean;
    /**
     * 
     * @type {Array<PollVote>}
     * @memberof Poll
     */
    latest_answers: Array<PollVote>;
    /**
     * 
     * @type {{ [key: string]: Array<PollVote>; }}
     * @memberof Poll
     */
    latest_votes_by_option: { [key: string]: Array<PollVote>; };
    /**
     * 
     * @type {number}
     * @memberof Poll
     */
    max_votes_allowed?: number;
    /**
     * 
     * @type {string}
     * @memberof Poll
     */
    name: string;
    /**
     * 
     * @type {Array<PollOption>}
     * @memberof Poll
     */
    options: Array<PollOption>;
    /**
     * 
     * @type {Array<PollVote>}
     * @memberof Poll
     */
    own_votes: Array<PollVote>;
    /**
     * 
     * @type {number}
     * @memberof Poll
     */
    updated_at: number;
    /**
     * 
     * @type {number}
     * @memberof Poll
     */
    vote_count: number;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof Poll
     */
    vote_counts_by_option: { [key: string]: number; };
    /**
     * 
     * @type {string}
     * @memberof Poll
     */
    voting_visibility?: string;
}
/**
 * 
 * @export
 * @interface PollOption
 */
export interface PollOption {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof PollOption
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof PollOption
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PollOption
     */
    text: string;
}
/**
 * 
 * @export
 * @interface PollOptionInput
 */
export interface PollOptionInput {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof PollOptionInput
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof PollOptionInput
     */
    text?: string;
}
/**
 * 
 * @export
 * @interface PollOptionResponse
 */
export interface PollOptionResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof PollOptionResponse
     */
    duration: string;
    /**
     * 
     * @type {PollOptionResponseData}
     * @memberof PollOptionResponse
     */
    poll_option: PollOptionResponseData | null;
}
/**
 * 
 * @export
 * @interface PollOptionResponseData
 */
export interface PollOptionResponseData {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof PollOptionResponseData
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof PollOptionResponseData
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PollOptionResponseData
     */
    text: string;
}
/**
 * 
 * @export
 * @interface PollResponse
 */
export interface PollResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof PollResponse
     */
    duration: string;
    /**
     * 
     * @type {PollResponseData}
     * @memberof PollResponse
     */
    poll: PollResponseData;
}
/**
 * 
 * @export
 * @interface PollResponseData
 */
export interface PollResponseData {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof PollResponseData
     */
    Custom: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof PollResponseData
     */
    allow_answers: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PollResponseData
     */
    allow_user_suggested_options: boolean;
    /**
     * 
     * @type {number}
     * @memberof PollResponseData
     */
    answers_count: number;
    /**
     * 
     * @type {number}
     * @memberof PollResponseData
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof PollResponseData
     */
    created_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof PollResponseData
     */
    created_by_id: string;
    /**
     * 
     * @type {string}
     * @memberof PollResponseData
     */
    description: string;
    /**
     * 
     * @type {boolean}
     * @memberof PollResponseData
     */
    enforce_unique_vote: boolean;
    /**
     * 
     * @type {string}
     * @memberof PollResponseData
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof PollResponseData
     */
    is_closed?: boolean;
    /**
     * 
     * @type {{ [key: string]: Array<PollVoteResponseData>; }}
     * @memberof PollResponseData
     */
    latest_votes_by_option: { [key: string]: Array<PollVoteResponseData>; };
    /**
     * 
     * @type {number}
     * @memberof PollResponseData
     */
    max_votes_allowed?: number;
    /**
     * 
     * @type {string}
     * @memberof PollResponseData
     */
    name: string;
    /**
     * 
     * @type {Array<PollOptionResponseData>}
     * @memberof PollResponseData
     */
    options: Array<PollOptionResponseData>;
    /**
     * 
     * @type {Array<PollVoteResponseData>}
     * @memberof PollResponseData
     */
    own_votes: Array<PollVoteResponseData>;
    /**
     * 
     * @type {number}
     * @memberof PollResponseData
     */
    updated_at: number;
    /**
     * 
     * @type {number}
     * @memberof PollResponseData
     */
    vote_count: number;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof PollResponseData
     */
    vote_counts_by_option: { [key: string]: number; };
    /**
     * 
     * @type {string}
     * @memberof PollResponseData
     */
    voting_visibility: string;
}
/**
 * 
 * @export
 * @interface PollVote
 */
export interface PollVote {
    /**
     * 
     * @type {string}
     * @memberof PollVote
     */
    answer_text?: string;
    /**
     * 
     * @type {number}
     * @memberof PollVote
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof PollVote
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof PollVote
     */
    is_answer?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PollVote
     */
    option_id: string;
    /**
     * 
     * @type {string}
     * @memberof PollVote
     */
    poll_id: string;
    /**
     * 
     * @type {number}
     * @memberof PollVote
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof PollVote
     */
    user?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof PollVote
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface PollVoteResponse
 */
export interface PollVoteResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof PollVoteResponse
     */
    duration: string;
    /**
     * 
     * @type {PollVoteResponseData}
     * @memberof PollVoteResponse
     */
    vote?: PollVoteResponseData | null;
}
/**
 * 
 * @export
 * @interface PollVoteResponseData
 */
export interface PollVoteResponseData {
    /**
     * 
     * @type {string}
     * @memberof PollVoteResponseData
     */
    answer_text?: string;
    /**
     * 
     * @type {number}
     * @memberof PollVoteResponseData
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof PollVoteResponseData
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof PollVoteResponseData
     */
    is_answer?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PollVoteResponseData
     */
    option_id: string;
    /**
     * 
     * @type {string}
     * @memberof PollVoteResponseData
     */
    poll_id: string;
    /**
     * 
     * @type {number}
     * @memberof PollVoteResponseData
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof PollVoteResponseData
     */
    user?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof PollVoteResponseData
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface PollVotesResponse
 */
export interface PollVotesResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof PollVotesResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof PollVotesResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof PollVotesResponse
     */
    prev?: string;
    /**
     * 
     * @type {Array<PollVoteResponseData>}
     * @memberof PollVotesResponse
     */
    votes: Array<PollVoteResponseData>;
}
/**
 * 
 * @export
 * @interface PrivacySettings
 */
export interface PrivacySettings {
    /**
     * 
     * @type {ReadReceipts}
     * @memberof PrivacySettings
     */
    read_receipts?: ReadReceipts;
    /**
     * 
     * @type {TypingIndicators}
     * @memberof PrivacySettings
     */
    typing_indicators?: TypingIndicators;
}
/**
 * 
 * @export
 * @interface PublishedTrackInfo
 */
export interface PublishedTrackInfo {
    /**
     * 
     * @type {string}
     * @memberof PublishedTrackInfo
     */
    codec_mime_type?: string;
    /**
     * 
     * @type {number}
     * @memberof PublishedTrackInfo
     */
    duration_seconds?: number;
    /**
     * 
     * @type {string}
     * @memberof PublishedTrackInfo
     */
    track_type?: string;
}
/**
 * 
 * @export
 * @interface PushConfig
 */
export interface PushConfig {
    /**
     * 
     * @type {boolean}
     * @memberof PushConfig
     */
    offline_only?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushConfig
     */
    version: PushConfigVersionEnum;
}


/**
 * @export
 */
export const PushConfigVersionEnum = {
    V1: 'v1',
    V2: 'v2'
} as const;
export type PushConfigVersionEnum = typeof PushConfigVersionEnum[keyof typeof PushConfigVersionEnum];

/**
 * 
 * @export
 * @interface PushNotificationFields
 */
export interface PushNotificationFields {
    /**
     * 
     * @type {APNConfigFields}
     * @memberof PushNotificationFields
     */
    apn: APNConfigFields;
    /**
     * 
     * @type {FirebaseConfigFields}
     * @memberof PushNotificationFields
     */
    firebase: FirebaseConfigFields;
    /**
     * 
     * @type {HuaweiConfigFields}
     * @memberof PushNotificationFields
     */
    huawei: HuaweiConfigFields;
    /**
     * 
     * @type {boolean}
     * @memberof PushNotificationFields
     */
    offline_only: boolean;
    /**
     * 
     * @type {Array<PushProvider>}
     * @memberof PushNotificationFields
     */
    providers?: Array<PushProvider>;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationFields
     */
    version: string;
    /**
     * 
     * @type {XiaomiConfigFields}
     * @memberof PushNotificationFields
     */
    xiaomi: XiaomiConfigFields;
}
/**
 * 
 * @export
 * @interface PushNotificationSettings
 */
export interface PushNotificationSettings {
    /**
     * 
     * @type {boolean}
     * @memberof PushNotificationSettings
     */
    disabled?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PushNotificationSettings
     */
    disabled_until?: number;
}
/**
 * 
 * @export
 * @interface PushNotificationSettingsInput
 */
export interface PushNotificationSettingsInput {
    /**
     * 
     * @type {NullBool}
     * @memberof PushNotificationSettingsInput
     */
    disabled?: NullBool;
    /**
     * 
     * @type {NullTime}
     * @memberof PushNotificationSettingsInput
     */
    disabled_until?: NullTime;
}
/**
 * 
 * @export
 * @interface PushProvider
 */
export interface PushProvider {
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_auth_key?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_auth_type?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PushProvider
     */
    apn_development?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_host?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_key_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_p12_cert?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_team_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    apn_topic?: string;
    /**
     * 
     * @type {number}
     * @memberof PushProvider
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof PushProvider
     */
    disabled_at?: number;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    disabled_reason?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    firebase_apn_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    firebase_credentials?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    firebase_data_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    firebase_host?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    firebase_notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    firebase_server_key?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    huawei_app_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    huawei_app_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof PushProvider
     */
    updated_at: number;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    xiaomi_app_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    xiaomi_package_name?: string;
}
/**
 * 
 * @export
 * @interface PushProviderResponse
 */
export interface PushProviderResponse {
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    apn_auth_key?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    apn_auth_type?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PushProviderResponse
     */
    apn_development?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    apn_host?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    apn_key_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    apn_p12_cert?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PushProviderResponse
     */
    apn_sandbox_certificate?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PushProviderResponse
     */
    apn_supports_remote_notifications?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PushProviderResponse
     */
    apn_supports_voip_notifications?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    apn_team_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    apn_topic?: string;
    /**
     * 
     * @type {number}
     * @memberof PushProviderResponse
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof PushProviderResponse
     */
    disabled_at?: number;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    disabled_reason?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    firebase_apn_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    firebase_credentials?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    firebase_data_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    firebase_host?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    firebase_notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    firebase_server_key?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    huawei_app_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    huawei_app_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof PushProviderResponse
     */
    updated_at: number;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    xiaomi_app_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    xiaomi_package_name?: string;
}
/**
 * 
 * @export
 * @interface QueryBannedUsersRequest
 */
export interface QueryBannedUsersRequest {
    /**
     * 
     * @type {boolean}
     * @memberof QueryBannedUsersRequest
     */
    exclude_expired_bans?: boolean;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryBannedUsersRequest
     */
    filter_conditions: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryBannedUsersRequest
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof QueryBannedUsersRequest
     */
    offset?: number;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryBannedUsersRequest
     */
    sort?: Array<SortParam>;
    /**
     * 
     * @type {UserRequest}
     * @memberof QueryBannedUsersRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryBannedUsersRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface QueryBannedUsersResponse
 */
export interface QueryBannedUsersResponse {
    /**
     * 
     * @type {Array<BanResponse>}
     * @memberof QueryBannedUsersResponse
     */
    bans: Array<BanResponse>;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryBannedUsersResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface QueryCallMembersRequest
 */
export interface QueryCallMembersRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryCallMembersRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof QueryCallMembersRequest
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof QueryCallMembersRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryCallMembersRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallMembersRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryCallMembersRequest
     */
    sort?: Array<SortParam>;
    /**
     * 
     * @type {string}
     * @memberof QueryCallMembersRequest
     */
    type: string;
}
/**
 * 
 * @export
 * @interface QueryCallMembersResponse
 */
export interface QueryCallMembersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryCallMembersResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MemberResponse>}
     * @memberof QueryCallMembersResponse
     */
    members: Array<MemberResponse>;
    /**
     * 
     * @type {string}
     * @memberof QueryCallMembersResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallMembersResponse
     */
    prev?: string;
}
/**
 * 
 * @export
 * @interface QueryCallStatsRequest
 */
export interface QueryCallStatsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryCallStatsRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryCallStatsRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryCallStatsRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallStatsRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryCallStatsRequest
     */
    sort?: Array<SortParam>;
}
/**
 * 
 * @export
 * @interface QueryCallStatsResponse
 */
export interface QueryCallStatsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryCallStatsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallStatsResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallStatsResponse
     */
    prev?: string;
    /**
     * 
     * @type {Array<CallStatsReportSummaryResponse>}
     * @memberof QueryCallStatsResponse
     */
    reports: Array<CallStatsReportSummaryResponse>;
}
/**
 * 
 * @export
 * @interface QueryCallsRequest
 */
export interface QueryCallsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryCallsRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryCallsRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryCallsRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallsRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryCallsRequest
     */
    sort?: Array<SortParam>;
}
/**
 * 
 * @export
 * @interface QueryCallsResponse
 */
export interface QueryCallsResponse {
    /**
     * 
     * @type {Array<CallStateResponseFields>}
     * @memberof QueryCallsResponse
     */
    calls: Array<CallStateResponseFields>;
    /**
     * 
     * @type {string}
     * @memberof QueryCallsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallsResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryCallsResponse
     */
    prev?: string;
}
/**
 * 
 * @export
 * @interface QueryChannelsRequest
 */
export interface QueryChannelsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryChannelsRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * Number of channels to limit
     * @type {number}
     * @memberof QueryChannelsRequest
     */
    limit?: number;
    /**
     * Number of members to limit
     * @type {number}
     * @memberof QueryChannelsRequest
     */
    member_limit?: number;
    /**
     * Number of messages to limit
     * @type {number}
     * @memberof QueryChannelsRequest
     */
    message_limit?: number;
    /**
     * Channel pagination offset
     * @type {number}
     * @memberof QueryChannelsRequest
     */
    offset?: number;
    /**
     * List of sort parameters
     * @type {Array<SortParam>}
     * @memberof QueryChannelsRequest
     */
    sort?: Array<SortParam>;
    /**
     * Whether to update channel state or not
     * @type {boolean}
     * @memberof QueryChannelsRequest
     */
    state?: boolean;
    /**
     * 
     * @type {UserRequest}
     * @memberof QueryChannelsRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryChannelsRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface QueryChannelsResponse
 */
export interface QueryChannelsResponse {
    /**
     * List of channels
     * @type {Array<ChannelStateResponseFields>}
     * @memberof QueryChannelsResponse
     */
    channels: Array<ChannelStateResponseFields>;
    /**
     * 
     * @type {string}
     * @memberof QueryChannelsResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface QueryMembersRequest
 */
export interface QueryMembersRequest {
    /**
     * Filter to apply to members
     * @type {{ [key: string]: any; }}
     * @memberof QueryMembersRequest
     */
    filter_conditions: { [key: string]: any; };
    /**
     * Channel ID to interact with
     * @type {string}
     * @memberof QueryMembersRequest
     */
    id?: string;
    /**
     * Number of records to return
     * @type {number}
     * @memberof QueryMembersRequest
     */
    limit?: number;
    /**
     * List of members to search in distinct channels
     * @type {Array<ChannelMember>}
     * @memberof QueryMembersRequest
     */
    members?: Array<ChannelMember>;
    /**
     * Number of records to offset
     * @type {number}
     * @memberof QueryMembersRequest
     */
    offset?: number;
    /**
     * Array of sort parameters
     * @type {Array<SortParam>}
     * @memberof QueryMembersRequest
     */
    sort?: Array<SortParam>;
    /**
     * Channel type to interact with
     * @type {string}
     * @memberof QueryMembersRequest
     */
    type: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof QueryMembersRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface QueryMessageFlagsRequest
 */
export interface QueryMessageFlagsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryMessageFlagsRequest
     */
    filter_conditions?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryMessageFlagsRequest
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof QueryMessageFlagsRequest
     */
    offset?: number;
    /**
     * 
     * @type {boolean}
     * @memberof QueryMessageFlagsRequest
     */
    show_deleted_messages?: boolean;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryMessageFlagsRequest
     */
    sort?: Array<SortParam>;
    /**
     * 
     * @type {UserRequest}
     * @memberof QueryMessageFlagsRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryMessageFlagsRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface QueryMessageFlagsResponse
 */
export interface QueryMessageFlagsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryMessageFlagsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MessageFlag>}
     * @memberof QueryMessageFlagsResponse
     */
    flags: Array<MessageFlag>;
}
/**
 * 
 * @export
 * @interface QueryMessageHistoryRequest
 */
export interface QueryMessageHistoryRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryMessageHistoryRequest
     */
    filter: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryMessageHistoryRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryMessageHistoryRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMessageHistoryRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryMessageHistoryRequest
     */
    sort?: Array<SortParam>;
}
/**
 * 
 * @export
 * @interface QueryMessageHistoryResponse
 */
export interface QueryMessageHistoryResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryMessageHistoryResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MessageHistoryEntry>}
     * @memberof QueryMessageHistoryResponse
     */
    message_history: Array<MessageHistoryEntry>;
    /**
     * 
     * @type {string}
     * @memberof QueryMessageHistoryResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMessageHistoryResponse
     */
    prev?: string;
}
/**
 * 
 * @export
 * @interface QueryPollVotesRequest
 */
export interface QueryPollVotesRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryPollVotesRequest
     */
    filter?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryPollVotesRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryPollVotesRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryPollVotesRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryPollVotesRequest
     */
    sort?: Array<SortParam>;
}
/**
 * 
 * @export
 * @interface QueryPollsRequest
 */
export interface QueryPollsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryPollsRequest
     */
    filter?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryPollsRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryPollsRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryPollsRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryPollsRequest
     */
    sort?: Array<SortParam>;
}
/**
 * 
 * @export
 * @interface QueryPollsResponse
 */
export interface QueryPollsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryPollsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof QueryPollsResponse
     */
    next?: string;
    /**
     * 
     * @type {Array<PollResponseData>}
     * @memberof QueryPollsResponse
     */
    polls: Array<PollResponseData>;
    /**
     * 
     * @type {string}
     * @memberof QueryPollsResponse
     */
    prev?: string;
}
/**
 * 
 * @export
 * @interface QueryReactionsRequest
 */
export interface QueryReactionsRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryReactionsRequest
     */
    filter?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof QueryReactionsRequest
     */
    limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryReactionsRequest
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryReactionsRequest
     */
    prev?: string;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryReactionsRequest
     */
    sort?: Array<SortParam>;
    /**
     * 
     * @type {UserRequest}
     * @memberof QueryReactionsRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryReactionsRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface QueryReactionsResponse
 */
export interface QueryReactionsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryReactionsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof QueryReactionsResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryReactionsResponse
     */
    prev?: string;
    /**
     * 
     * @type {Array<ReactionResponse>}
     * @memberof QueryReactionsResponse
     */
    reactions: Array<ReactionResponse>;
}
/**
 * 
 * @export
 * @interface QueryThreadsRequest
 */
export interface QueryThreadsRequest {
    /**
     * 
     * @type {number}
     * @memberof QueryThreadsRequest
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof QueryThreadsRequest
     */
    member_limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryThreadsRequest
     */
    next?: string;
    /**
     * Limit the number of participants returned per each thread
     * @type {number}
     * @memberof QueryThreadsRequest
     */
    participant_limit?: number;
    /**
     * 
     * @type {string}
     * @memberof QueryThreadsRequest
     */
    prev?: string;
    /**
     * Limit the number of replies returned per each thread
     * @type {number}
     * @memberof QueryThreadsRequest
     */
    reply_limit?: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof QueryThreadsRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryThreadsRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface QueryThreadsResponse
 */
export interface QueryThreadsResponse {
    /**
     * 
     * @type {string}
     * @memberof QueryThreadsResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof QueryThreadsResponse
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryThreadsResponse
     */
    prev?: string;
    /**
     * List of enriched thread states
     * @type {Array<ThreadStateResponse>}
     * @memberof QueryThreadsResponse
     */
    threads: Array<ThreadStateResponse>;
}
/**
 * 
 * @export
 * @interface QueryUsersPayload
 */
export interface QueryUsersPayload {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof QueryUsersPayload
     */
    filter_conditions: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof QueryUsersPayload
     */
    include_deactivated_users?: boolean;
    /**
     * 
     * @type {number}
     * @memberof QueryUsersPayload
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof QueryUsersPayload
     */
    offset?: number;
    /**
     * 
     * @type {boolean}
     * @memberof QueryUsersPayload
     */
    presence?: boolean;
    /**
     * 
     * @type {Array<SortParam>}
     * @memberof QueryUsersPayload
     */
    sort?: Array<SortParam>;
    /**
     * 
     * @type {UserRequest}
     * @memberof QueryUsersPayload
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryUsersPayload
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface QueryUsersResponse
 */
export interface QueryUsersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof QueryUsersResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<FullUserResponse>}
     * @memberof QueryUsersResponse
     */
    users: Array<FullUserResponse>;
}
/**
 * RTMP input settings
 * @export
 * @interface RTMPIngress
 */
export interface RTMPIngress {
    /**
     * 
     * @type {string}
     * @memberof RTMPIngress
     */
    address: string;
}
/**
 * Represents user reaction to a message
 * @export
 * @interface Reaction
 */
export interface Reaction {
    /**
     * Date/time of creation
     * @type {number}
     * @memberof Reaction
     */
    readonly created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Reaction
     */
    custom: { [key: string]: any; };
    /**
     * ID of a message user reacted to
     * @type {string}
     * @memberof Reaction
     */
    message_id: string;
    /**
     * Reaction score. If not specified reaction has score of 1
     * @type {number}
     * @memberof Reaction
     */
    score: number;
    /**
     * The type of reaction (e.g. 'like', 'laugh', 'wow')
     * @type {string}
     * @memberof Reaction
     */
    type: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof Reaction
     */
    readonly updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Reaction
     */
    user?: UserObject;
    /**
     * ID of a user who reacted to a message
     * @type {string}
     * @memberof Reaction
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface ReactionGroupResponse
 */
export interface ReactionGroupResponse {
    /**
     * 
     * @type {number}
     * @memberof ReactionGroupResponse
     */
    count: number;
    /**
     * 
     * @type {number}
     * @memberof ReactionGroupResponse
     */
    first_reaction_at: number;
    /**
     * 
     * @type {number}
     * @memberof ReactionGroupResponse
     */
    last_reaction_at: number;
    /**
     * 
     * @type {number}
     * @memberof ReactionGroupResponse
     */
    sum_scores: number;
}
/**
 * 
 * @export
 * @interface ReactionRemovalResponse
 */
export interface ReactionRemovalResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ReactionRemovalResponse
     */
    duration: string;
    /**
     * 
     * @type {Message}
     * @memberof ReactionRemovalResponse
     */
    message?: Message | null;
    /**
     * 
     * @type {Reaction}
     * @memberof ReactionRemovalResponse
     */
    reaction?: Reaction | null;
}
/**
 * 
 * @export
 * @interface ReactionRequest
 */
export interface ReactionRequest {
    /**
     * 
     * @type {number}
     * @memberof ReactionRequest
     */
    created_at?: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ReactionRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof ReactionRequest
     */
    score?: number;
    /**
     * 
     * @type {string}
     * @memberof ReactionRequest
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof ReactionRequest
     */
    updated_at?: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof ReactionRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof ReactionRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface ReactionResponse
 */
export interface ReactionResponse {
    /**
     * 
     * @type {number}
     * @memberof ReactionResponse
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ReactionResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof ReactionResponse
     */
    message_id: string;
    /**
     * 
     * @type {number}
     * @memberof ReactionResponse
     */
    score: number;
    /**
     * 
     * @type {string}
     * @memberof ReactionResponse
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof ReactionResponse
     */
    updated_at: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof ReactionResponse
     */
    user: UserResponse;
    /**
     * 
     * @type {string}
     * @memberof ReactionResponse
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface ReactivateUserRequest
 */
export interface ReactivateUserRequest {
    /**
     * ID of the user who's reactivating the user
     * @type {string}
     * @memberof ReactivateUserRequest
     */
    created_by_id?: string;
    /**
     * Set this field to put new name for the user
     * @type {string}
     * @memberof ReactivateUserRequest
     */
    name?: string;
    /**
     * Restore previously deleted messages
     * @type {boolean}
     * @memberof ReactivateUserRequest
     */
    restore_messages?: boolean;
}
/**
 * 
 * @export
 * @interface ReactivateUserResponse
 */
export interface ReactivateUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ReactivateUserResponse
     */
    duration: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ReactivateUserResponse
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ReactivateUsersRequest
 */
export interface ReactivateUsersRequest {
    /**
     * ID of the user who's reactivating the users
     * @type {string}
     * @memberof ReactivateUsersRequest
     */
    created_by_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ReactivateUsersRequest
     */
    restore_channels?: boolean;
    /**
     * Restore previously deleted messages
     * @type {boolean}
     * @memberof ReactivateUsersRequest
     */
    restore_messages?: boolean;
    /**
     * User IDs to reactivate
     * @type {Array<string>}
     * @memberof ReactivateUsersRequest
     */
    user_ids: Array<string>;
}
/**
 * 
 * @export
 * @interface ReactivateUsersResponse
 */
export interface ReactivateUsersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ReactivateUsersResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof ReactivateUsersResponse
     */
    task_id: string;
}
/**
 * 
 * @export
 * @interface Read
 */
export interface Read {
    /**
     * 
     * @type {number}
     * @memberof Read
     */
    last_read: number;
    /**
     * 
     * @type {string}
     * @memberof Read
     */
    last_read_message_id?: string;
    /**
     * 
     * @type {number}
     * @memberof Read
     */
    unread_messages: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Read
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ReadReceipts
 */
export interface ReadReceipts {
    /**
     * 
     * @type {boolean}
     * @memberof ReadReceipts
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface ReadStateResponse
 */
export interface ReadStateResponse {
    /**
     * 
     * @type {number}
     * @memberof ReadStateResponse
     */
    last_read: number;
    /**
     * 
     * @type {string}
     * @memberof ReadStateResponse
     */
    last_read_message_id?: string;
    /**
     * 
     * @type {number}
     * @memberof ReadStateResponse
     */
    unread_messages: number;
    /**
     * 
     * @type {UserResponse}
     * @memberof ReadStateResponse
     */
    user: UserResponse;
}
/**
 * 
 * @export
 * @interface RecordSettings
 */
export interface RecordSettings {
    /**
     * 
     * @type {boolean}
     * @memberof RecordSettings
     */
    audio_only: boolean;
    /**
     * 
     * @type {LayoutSettings}
     * @memberof RecordSettings
     */
    layout?: LayoutSettings;
    /**
     * 
     * @type {string}
     * @memberof RecordSettings
     */
    mode: string;
    /**
     * 
     * @type {string}
     * @memberof RecordSettings
     */
    quality: string;
}
/**
 * 
 * @export
 * @interface RecordSettingsRequest
 */
export interface RecordSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof RecordSettingsRequest
     */
    audio_only?: boolean;
    /**
     * 
     * @type {LayoutSettingsRequest}
     * @memberof RecordSettingsRequest
     */
    layout?: LayoutSettingsRequest;
    /**
     * 
     * @type {string}
     * @memberof RecordSettingsRequest
     */
    mode: RecordSettingsRequestModeEnum;
    /**
     * 
     * @type {string}
     * @memberof RecordSettingsRequest
     */
    quality?: RecordSettingsRequestQualityEnum;
}


/**
 * @export
 */
export const RecordSettingsRequestModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type RecordSettingsRequestModeEnum = typeof RecordSettingsRequestModeEnum[keyof typeof RecordSettingsRequestModeEnum];

/**
 * @export
 */
export const RecordSettingsRequestQualityEnum = {
    _360P: '360p',
    _480P: '480p',
    _720P: '720p',
    _1080P: '1080p',
    _1440P: '1440p'
} as const;
export type RecordSettingsRequestQualityEnum = typeof RecordSettingsRequestQualityEnum[keyof typeof RecordSettingsRequestQualityEnum];

/**
 * 
 * @export
 * @interface RecordSettingsResponse
 */
export interface RecordSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof RecordSettingsResponse
     */
    audio_only: boolean;
    /**
     * 
     * @type {LayoutSettingsResponse}
     * @memberof RecordSettingsResponse
     */
    layout: LayoutSettingsResponse;
    /**
     * 
     * @type {string}
     * @memberof RecordSettingsResponse
     */
    mode: string;
    /**
     * 
     * @type {string}
     * @memberof RecordSettingsResponse
     */
    quality: string;
}
/**
 * 
 * @export
 * @interface Response
 */
export interface Response {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof Response
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface RestoreUsersRequest
 */
export interface RestoreUsersRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof RestoreUsersRequest
     */
    user_ids: Array<string>;
}
/**
 * 
 * @export
 * @interface RingSettings
 */
export interface RingSettings {
    /**
     * 
     * @type {number}
     * @memberof RingSettings
     */
    auto_cancel_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof RingSettings
     */
    incoming_call_timeout_ms: number;
}
/**
 * 
 * @export
 * @interface RingSettingsRequest
 */
export interface RingSettingsRequest {
    /**
     * 
     * @type {number}
     * @memberof RingSettingsRequest
     */
    auto_cancel_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof RingSettingsRequest
     */
    incoming_call_timeout_ms: number;
}
/**
 * 
 * @export
 * @interface RingSettingsResponse
 */
export interface RingSettingsResponse {
    /**
     * 
     * @type {number}
     * @memberof RingSettingsResponse
     */
    auto_cancel_timeout_ms: number;
    /**
     * 
     * @type {number}
     * @memberof RingSettingsResponse
     */
    incoming_call_timeout_ms: number;
}
/**
 * 
 * @export
 * @interface Role
 */
export interface Role {
    /**
     * Date/time of creation
     * @type {number}
     * @memberof Role
     */
    created_at: number;
    /**
     * Whether this is a custom role or built-in
     * @type {boolean}
     * @memberof Role
     */
    custom: boolean;
    /**
     * Unique role name
     * @type {string}
     * @memberof Role
     */
    name: string;
    /**
     * List of scopes where this role is currently present. `.app` means that role is present in app-level grants
     * @type {Array<string>}
     * @memberof Role
     */
    scopes: Array<string>;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof Role
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface S3Request
 */
export interface S3Request {
    /**
     * 
     * @type {string}
     * @memberof S3Request
     */
    s3_api_key?: string;
    /**
     * 
     * @type {string}
     * @memberof S3Request
     */
    s3_region: string;
    /**
     * 
     * @type {string}
     * @memberof S3Request
     */
    s3_secret?: string;
}
/**
 * 
 * @export
 * @interface SFULocationResponse
 */
export interface SFULocationResponse {
    /**
     * 
     * @type {Coordinates}
     * @memberof SFULocationResponse
     */
    coordinates: Coordinates;
    /**
     * 
     * @type {string}
     * @memberof SFULocationResponse
     */
    datacenter: string;
    /**
     * 
     * @type {string}
     * @memberof SFULocationResponse
     */
    id: string;
    /**
     * 
     * @type {Location}
     * @memberof SFULocationResponse
     */
    location: Location;
}
/**
 * 
 * @export
 * @interface ScreensharingSettings
 */
export interface ScreensharingSettings {
    /**
     * 
     * @type {boolean}
     * @memberof ScreensharingSettings
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ScreensharingSettings
     */
    enabled: boolean;
    /**
     * 
     * @type {TargetResolution}
     * @memberof ScreensharingSettings
     */
    target_resolution?: TargetResolution;
}
/**
 * 
 * @export
 * @interface ScreensharingSettingsRequest
 */
export interface ScreensharingSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof ScreensharingSettingsRequest
     */
    access_request_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ScreensharingSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {TargetResolution}
     * @memberof ScreensharingSettingsRequest
     */
    target_resolution?: TargetResolution;
}
/**
 * 
 * @export
 * @interface ScreensharingSettingsResponse
 */
export interface ScreensharingSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof ScreensharingSettingsResponse
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ScreensharingSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {TargetResolution}
     * @memberof ScreensharingSettingsResponse
     */
    target_resolution?: TargetResolution;
}
/**
 * 
 * @export
 * @interface SearchRequest
 */
export interface SearchRequest {
    /**
     * Channel filter conditions
     * @type {{ [key: string]: any; }}
     * @memberof SearchRequest
     */
    filter_conditions: { [key: string]: any; };
    /**
     * Number of messages to return
     * @type {number}
     * @memberof SearchRequest
     */
    limit?: number;
    /**
     * Message filter conditions
     * @type {{ [key: string]: any; }}
     * @memberof SearchRequest
     */
    message_filter_conditions?: { [key: string]: any; };
    /**
     * Pagination parameter. Cannot be used with non-zero offset.
     * @type {string}
     * @memberof SearchRequest
     */
    next?: string;
    /**
     * Pagination offset. Cannot be used with sort or next.
     * @type {number}
     * @memberof SearchRequest
     */
    offset?: number;
    /**
     * Search phrase
     * @type {string}
     * @memberof SearchRequest
     */
    query?: string;
    /**
     * Sort parameters. Cannot be used with non-zero offset
     * @type {Array<SortParam>}
     * @memberof SearchRequest
     */
    sort?: Array<SortParam>;
}
/**
 * 
 * @export
 * @interface SearchResponse
 */
export interface SearchResponse {
    /**
     * 
     * @type {string}
     * @memberof SearchResponse
     */
    duration: string;
    /**
     * Value to pass to the next search query in order to paginate
     * @type {string}
     * @memberof SearchResponse
     */
    next?: string;
    /**
     * Value that points to the previous page. Pass as the next value in a search query to paginate backwards
     * @type {string}
     * @memberof SearchResponse
     */
    previous?: string;
    /**
     * Search results
     * @type {Array<SearchResult>}
     * @memberof SearchResponse
     */
    results: Array<SearchResult>;
    /**
     * 
     * @type {SearchWarning}
     * @memberof SearchResponse
     */
    results_warning?: SearchWarning;
}
/**
 * 
 * @export
 * @interface SearchResult
 */
export interface SearchResult {
    /**
     * 
     * @type {SearchResultMessage}
     * @memberof SearchResult
     */
    message?: SearchResultMessage;
}
/**
 * 
 * @export
 * @interface SearchResultMessage
 */
export interface SearchResultMessage {
    /**
     * 
     * @type {Array<Attachment>}
     * @memberof SearchResultMessage
     */
    attachments: Array<Attachment>;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResultMessage
     */
    before_message_send_failed?: boolean;
    /**
     * 
     * @type {ChannelResponse}
     * @memberof SearchResultMessage
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    command?: string;
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof SearchResultMessage
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    deleted_at?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    deleted_reply_count: number;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    html: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SearchResultMessage
     */
    i18n?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    id: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof SearchResultMessage
     */
    image_labels?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {Array<Reaction>}
     * @memberof SearchResultMessage
     */
    latest_reactions: Array<Reaction>;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof SearchResultMessage
     */
    mentioned_users: Array<UserObject>;
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    message_text_updated_at?: number;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    mml?: string;
    /**
     * 
     * @type {Array<Reaction>}
     * @memberof SearchResultMessage
     */
    own_reactions: Array<Reaction>;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    parent_id?: string;
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    pin_expires?: number;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResultMessage
     */
    pinned: boolean;
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    pinned_at?: number;
    /**
     * 
     * @type {UserObject}
     * @memberof SearchResultMessage
     */
    pinned_by?: UserObject;
    /**
     * 
     * @type {Poll}
     * @memberof SearchResultMessage
     */
    poll?: Poll;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    poll_id?: string;
    /**
     * 
     * @type {Message}
     * @memberof SearchResultMessage
     */
    quoted_message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    quoted_message_id?: string;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof SearchResultMessage
     */
    reaction_counts: { [key: string]: number; };
    /**
     * 
     * @type {{ [key: string]: ReactionGroupResponse; }}
     * @memberof SearchResultMessage
     */
    reaction_groups: { [key: string]: ReactionGroupResponse; };
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof SearchResultMessage
     */
    reaction_scores: { [key: string]: number; };
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    reply_count: number;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResultMessage
     */
    shadowed: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResultMessage
     */
    show_in_channel?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResultMessage
     */
    silent: boolean;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    text: string;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof SearchResultMessage
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof SearchResultMessage
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof SearchResultMessage
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface SearchWarning
 */
export interface SearchWarning {
    /**
     * Channel CIDs for the searched channels
     * @type {Array<string>}
     * @memberof SearchWarning
     */
    channel_search_cids?: Array<string>;
    /**
     * Number of channels searched
     * @type {number}
     * @memberof SearchWarning
     */
    channel_search_count?: number;
    /**
     * Code corresponding to the warning
     * @type {number}
     * @memberof SearchWarning
     */
    warning_code: number;
    /**
     * Description of the warning
     * @type {string}
     * @memberof SearchWarning
     */
    warning_description: string;
}
/**
 * 
 * @export
 * @interface SendCallEventRequest
 */
export interface SendCallEventRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof SendCallEventRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {UserRequest}
     * @memberof SendCallEventRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof SendCallEventRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface SendCallEventResponse
 */
export interface SendCallEventResponse {
    /**
     * 
     * @type {string}
     * @memberof SendCallEventResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface SendEventRequest
 */
export interface SendEventRequest {
    /**
     * 
     * @type {EventRequest}
     * @memberof SendEventRequest
     */
    event: EventRequest;
}
/**
 * 
 * @export
 * @interface SendMessageRequest
 */
export interface SendMessageRequest {
    /**
     * 
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    force_moderation?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    keep_channel_hidden?: boolean;
    /**
     * 
     * @type {MessageRequest}
     * @memberof SendMessageRequest
     */
    message: MessageRequest;
    /**
     * 
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    pending?: boolean;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SendMessageRequest
     */
    pending_message_metadata?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    skip_enrich_url?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    skip_push?: boolean;
}
/**
 * 
 * @export
 * @interface SendMessageResponse
 */
export interface SendMessageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof SendMessageResponse
     */
    duration: string;
    /**
     * 
     * @type {MessageResponse}
     * @memberof SendMessageResponse
     */
    message: MessageResponse;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SendMessageResponse
     */
    pending_message_metadata?: { [key: string]: string; };
}
/**
 * 
 * @export
 * @interface SendReactionRequest
 */
export interface SendReactionRequest {
    /**
     * Whether to replace all existing user reactions
     * @type {boolean}
     * @memberof SendReactionRequest
     */
    enforce_unique?: boolean;
    /**
     * 
     * @type {ReactionRequest}
     * @memberof SendReactionRequest
     */
    reaction: ReactionRequest;
    /**
     * Skips any mobile push notifications
     * @type {boolean}
     * @memberof SendReactionRequest
     */
    skip_push?: boolean;
}
/**
 * 
 * @export
 * @interface SendReactionResponse
 */
export interface SendReactionResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof SendReactionResponse
     */
    duration: string;
    /**
     * 
     * @type {MessageResponse}
     * @memberof SendReactionResponse
     */
    message: MessageResponse;
    /**
     * 
     * @type {ReactionResponse}
     * @memberof SendReactionResponse
     */
    reaction: ReactionResponse;
}
/**
 * 
 * @export
 * @interface SendUserCustomEventRequest
 */
export interface SendUserCustomEventRequest {
    /**
     * 
     * @type {UserCustomEventRequest}
     * @memberof SendUserCustomEventRequest
     */
    event: UserCustomEventRequest;
}
/**
 * 
 * @export
 * @interface ShowChannelRequest
 */
export interface ShowChannelRequest {
    /**
     * 
     * @type {UserRequest}
     * @memberof ShowChannelRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof ShowChannelRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface ShowChannelResponse
 */
export interface ShowChannelResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ShowChannelResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface SortParam
 */
export interface SortParam {
    /**
     * Direction of sorting, -1 for descending, 1 for ascending
     * @type {number}
     * @memberof SortParam
     */
    direction?: number;
    /**
     * Name of field to sort by
     * @type {string}
     * @memberof SortParam
     */
    field?: string;
}
/**
 * 
 * @export
 * @interface StartHLSBroadcastingResponse
 */
export interface StartHLSBroadcastingResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof StartHLSBroadcastingResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof StartHLSBroadcastingResponse
     */
    playlist_url: string;
}
/**
 * 
 * @export
 * @interface StartRecordingRequest
 */
export interface StartRecordingRequest {
    /**
     * 
     * @type {string}
     * @memberof StartRecordingRequest
     */
    recording_external_storage?: string;
}
/**
 * 
 * @export
 * @interface StartRecordingResponse
 */
export interface StartRecordingResponse {
    /**
     * 
     * @type {string}
     * @memberof StartRecordingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface StartTranscriptionRequest
 */
export interface StartTranscriptionRequest {
    /**
     * 
     * @type {string}
     * @memberof StartTranscriptionRequest
     */
    transcription_external_storage?: string;
}
/**
 * 
 * @export
 * @interface StartTranscriptionResponse
 */
export interface StartTranscriptionResponse {
    /**
     * 
     * @type {string}
     * @memberof StartTranscriptionResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface Stats
 */
export interface Stats {
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    average_seconds: number;
    /**
     * 
     * @type {number}
     * @memberof Stats
     */
    max_seconds: number;
}
/**
 * 
 * @export
 * @interface StopHLSBroadcastingResponse
 */
export interface StopHLSBroadcastingResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof StopHLSBroadcastingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface StopLiveResponse
 */
export interface StopLiveResponse {
    /**
     * 
     * @type {CallResponse}
     * @memberof StopLiveResponse
     */
    call: CallResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof StopLiveResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface StopRecordingResponse
 */
export interface StopRecordingResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof StopRecordingResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface StopTranscriptionResponse
 */
export interface StopTranscriptionResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof StopTranscriptionResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface Subsession
 */
export interface Subsession {
    /**
     * 
     * @type {number}
     * @memberof Subsession
     */
    ended_at: number;
    /**
     * 
     * @type {number}
     * @memberof Subsession
     */
    joined_at: number;
    /**
     * 
     * @type {MediaPubSubHint}
     * @memberof Subsession
     */
    pub_sub_hint?: MediaPubSubHint;
    /**
     * 
     * @type {string}
     * @memberof Subsession
     */
    sfu_id: string;
}
/**
 * 
 * @export
 * @interface TargetResolution
 */
export interface TargetResolution {
    /**
     * 
     * @type {number}
     * @memberof TargetResolution
     */
    bitrate: number;
    /**
     * 
     * @type {number}
     * @memberof TargetResolution
     */
    height: number;
    /**
     * 
     * @type {number}
     * @memberof TargetResolution
     */
    width: number;
}
/**
 * Represents a conversation thread linked to a specific message in a channel.
 * @export
 * @interface Thread
 */
export interface Thread {
    /**
     * 
     * @type {Channel}
     * @memberof Thread
     */
    channel?: Channel;
    /**
     * Channel CID is unique string identifier of the channel
     * @type {string}
     * @memberof Thread
     */
    channel_cid: string;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof Thread
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof Thread
     */
    created_by?: UserObject;
    /**
     * Custom is the custom data of the thread
     * @type {{ [key: string]: any; }}
     * @memberof Thread
     */
    custom: { [key: string]: any; };
    /**
     * Date/time of deletion
     * @type {number}
     * @memberof Thread
     */
    deleted_at?: number;
    /**
     * Last Message At is the time of the last message in the thread
     * @type {number}
     * @memberof Thread
     */
    last_message_at?: number;
    /**
     * 
     * @type {Message}
     * @memberof Thread
     */
    parent_message?: Message | null;
    /**
     * Parent Message ID is unique string identifier of the parent message
     * @type {string}
     * @memberof Thread
     */
    parent_message_id: string;
    /**
     * The number of participants in the thread
     * @type {number}
     * @memberof Thread
     */
    participant_count?: number;
    /**
     * The number of replies in the thread
     * @type {number}
     * @memberof Thread
     */
    reply_count?: number;
    /**
     * 
     * @type {Array<ThreadParticipant>}
     * @memberof Thread
     */
    thread_participants?: Array<ThreadParticipant>;
    /**
     * Title is the title of the thread
     * @type {string}
     * @memberof Thread
     */
    title: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof Thread
     */
    updated_at: number;
}
/**
 * Represents a user that is participating in a thread.
 * @export
 * @interface ThreadParticipant
 */
export interface ThreadParticipant {
    /**
     * 
     * @type {number}
     * @memberof ThreadParticipant
     */
    readonly app_pk: number;
    /**
     * 
     * @type {string}
     * @memberof ThreadParticipant
     */
    channel_cid: string;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof ThreadParticipant
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ThreadParticipant
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof ThreadParticipant
     */
    last_read_at: number;
    /**
     * Left Thread At is the time when the user left the thread
     * @type {number}
     * @memberof ThreadParticipant
     */
    left_thread_at?: number;
    /**
     * Thead ID is unique string identifier of the thread
     * @type {string}
     * @memberof ThreadParticipant
     */
    thread_id?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ThreadParticipant
     */
    user?: UserObject;
    /**
     * User ID is unique string identifier of the user
     * @type {string}
     * @memberof ThreadParticipant
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface ThreadResponse
 */
export interface ThreadResponse {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ThreadResponse
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ThreadResponse
     */
    channel_cid: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadResponse
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof ThreadResponse
     */
    created_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof ThreadResponse
     */
    created_by_user_id: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ThreadResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof ThreadResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {number}
     * @memberof ThreadResponse
     */
    last_message_at?: number;
    /**
     * 
     * @type {Message}
     * @memberof ThreadResponse
     */
    parent_message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof ThreadResponse
     */
    parent_message_id: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadResponse
     */
    participant_count?: number;
    /**
     * 
     * @type {number}
     * @memberof ThreadResponse
     */
    reply_count?: number;
    /**
     * 
     * @type {Array<ThreadParticipant>}
     * @memberof ThreadResponse
     */
    thread_participants?: Array<ThreadParticipant>;
    /**
     * 
     * @type {string}
     * @memberof ThreadResponse
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadResponse
     */
    updated_at: number;
}
/**
 * Represents a conversation thread linked to a specific message in a channel.
 * @export
 * @interface ThreadState
 */
export interface ThreadState {
    /**
     * 
     * @type {Channel}
     * @memberof ThreadState
     */
    channel?: Channel;
    /**
     * Channel CID is unique string identifier of the channel
     * @type {string}
     * @memberof ThreadState
     */
    channel_cid: string;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof ThreadState
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof ThreadState
     */
    created_by?: UserObject;
    /**
     * Custom is the custom data of the thread
     * @type {{ [key: string]: any; }}
     * @memberof ThreadState
     */
    custom: { [key: string]: any; };
    /**
     * Date/time of deletion
     * @type {number}
     * @memberof ThreadState
     */
    deleted_at?: number;
    /**
     * Last Message At is the time of the last message in the thread
     * @type {number}
     * @memberof ThreadState
     */
    last_message_at?: number;
    /**
     * 
     * @type {Array<Message>}
     * @memberof ThreadState
     */
    latest_replies: Array<Message>;
    /**
     * 
     * @type {Message}
     * @memberof ThreadState
     */
    parent_message?: Message | null;
    /**
     * Parent Message ID is unique string identifier of the parent message
     * @type {string}
     * @memberof ThreadState
     */
    parent_message_id: string;
    /**
     * The number of participants in the thread
     * @type {number}
     * @memberof ThreadState
     */
    participant_count?: number;
    /**
     * 
     * @type {Array<Read>}
     * @memberof ThreadState
     */
    read?: Array<Read>;
    /**
     * The number of replies in the thread
     * @type {number}
     * @memberof ThreadState
     */
    reply_count?: number;
    /**
     * 
     * @type {Array<ThreadParticipant>}
     * @memberof ThreadState
     */
    thread_participants?: Array<ThreadParticipant>;
    /**
     * Title is the title of the thread
     * @type {string}
     * @memberof ThreadState
     */
    title: string;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof ThreadState
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface ThreadStateResponse
 */
export interface ThreadStateResponse {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ThreadStateResponse
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ThreadStateResponse
     */
    channel_cid: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadStateResponse
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof ThreadStateResponse
     */
    created_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof ThreadStateResponse
     */
    created_by_user_id: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ThreadStateResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof ThreadStateResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {number}
     * @memberof ThreadStateResponse
     */
    last_message_at?: number;
    /**
     * 
     * @type {Array<Message>}
     * @memberof ThreadStateResponse
     */
    latest_replies: Array<Message>;
    /**
     * 
     * @type {Message}
     * @memberof ThreadStateResponse
     */
    parent_message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof ThreadStateResponse
     */
    parent_message_id: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadStateResponse
     */
    participant_count?: number;
    /**
     * 
     * @type {Array<Read>}
     * @memberof ThreadStateResponse
     */
    read?: Array<Read>;
    /**
     * 
     * @type {number}
     * @memberof ThreadStateResponse
     */
    reply_count?: number;
    /**
     * 
     * @type {Array<ThreadParticipant>}
     * @memberof ThreadStateResponse
     */
    thread_participants?: Array<ThreadParticipant>;
    /**
     * 
     * @type {string}
     * @memberof ThreadStateResponse
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof ThreadStateResponse
     */
    updated_at: number;
}
/**
 * Sets thresholds for AI moderation
 * @export
 * @interface Thresholds
 */
export interface Thresholds {
    /**
     * 
     * @type {LabelThresholds}
     * @memberof Thresholds
     */
    explicit?: LabelThresholds;
    /**
     * 
     * @type {LabelThresholds}
     * @memberof Thresholds
     */
    spam?: LabelThresholds;
    /**
     * 
     * @type {LabelThresholds}
     * @memberof Thresholds
     */
    toxic?: LabelThresholds;
}
/**
 * 
 * @export
 * @interface ThumbnailResponse
 */
export interface ThumbnailResponse {
    /**
     * 
     * @type {string}
     * @memberof ThumbnailResponse
     */
    image_url: string;
}
/**
 * 
 * @export
 * @interface ThumbnailsSettings
 */
export interface ThumbnailsSettings {
    /**
     * 
     * @type {boolean}
     * @memberof ThumbnailsSettings
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface ThumbnailsSettingsRequest
 */
export interface ThumbnailsSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof ThumbnailsSettingsRequest
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface ThumbnailsSettingsResponse
 */
export interface ThumbnailsSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof ThumbnailsSettingsResponse
     */
    enabled: boolean;
}
/**
 * 
 * @export
 * @interface TranscriptionSettings
 */
export interface TranscriptionSettings {
    /**
     * 
     * @type {string}
     * @memberof TranscriptionSettings
     */
    closed_caption_mode: string;
    /**
     * the languages to transcribe to
     * @type {Array<string>}
     * @memberof TranscriptionSettings
     */
    languages: Array<string>;
    /**
     * oneof=available disabled auto-on
     * @type {string}
     * @memberof TranscriptionSettings
     */
    mode: TranscriptionSettingsModeEnum;
}


/**
 * @export
 */
export const TranscriptionSettingsModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type TranscriptionSettingsModeEnum = typeof TranscriptionSettingsModeEnum[keyof typeof TranscriptionSettingsModeEnum];

/**
 * 
 * @export
 * @interface TranscriptionSettingsRequest
 */
export interface TranscriptionSettingsRequest {
    /**
     * 
     * @type {string}
     * @memberof TranscriptionSettingsRequest
     */
    closed_caption_mode?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof TranscriptionSettingsRequest
     */
    languages?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof TranscriptionSettingsRequest
     */
    mode: TranscriptionSettingsRequestModeEnum;
}


/**
 * @export
 */
export const TranscriptionSettingsRequestModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type TranscriptionSettingsRequestModeEnum = typeof TranscriptionSettingsRequestModeEnum[keyof typeof TranscriptionSettingsRequestModeEnum];

/**
 * 
 * @export
 * @interface TranscriptionSettingsResponse
 */
export interface TranscriptionSettingsResponse {
    /**
     * 
     * @type {string}
     * @memberof TranscriptionSettingsResponse
     */
    closed_caption_mode: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof TranscriptionSettingsResponse
     */
    languages: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof TranscriptionSettingsResponse
     */
    mode: TranscriptionSettingsResponseModeEnum;
}


/**
 * @export
 */
export const TranscriptionSettingsResponseModeEnum = {
    AVAILABLE: 'available',
    DISABLED: 'disabled',
    AUTO_ON: 'auto-on'
} as const;
export type TranscriptionSettingsResponseModeEnum = typeof TranscriptionSettingsResponseModeEnum[keyof typeof TranscriptionSettingsResponseModeEnum];

/**
 * 
 * @export
 * @interface TranslateMessageRequest
 */
export interface TranslateMessageRequest {
    /**
     * Language to translate message to
     * @type {string}
     * @memberof TranslateMessageRequest
     */
    language: TranslateMessageRequestLanguageEnum;
}


/**
 * @export
 */
export const TranslateMessageRequestLanguageEnum = {
    AF: 'af',
    SQ: 'sq',
    AM: 'am',
    AR: 'ar',
    AZ: 'az',
    BN: 'bn',
    BS: 'bs',
    BG: 'bg',
    ZH: 'zh',
    ZH_TW: 'zh-TW',
    HR: 'hr',
    CS: 'cs',
    DA: 'da',
    FA_AF: 'fa-AF',
    NL: 'nl',
    EN: 'en',
    ET: 'et',
    FI: 'fi',
    FR: 'fr',
    FR_CA: 'fr-CA',
    KA: 'ka',
    DE: 'de',
    EL: 'el',
    HA: 'ha',
    HE: 'he',
    HI: 'hi',
    HU: 'hu',
    ID: 'id',
    IT: 'it',
    JA: 'ja',
    KO: 'ko',
    LV: 'lv',
    MS: 'ms',
    NO: 'no',
    FA: 'fa',
    PS: 'ps',
    PL: 'pl',
    PT: 'pt',
    RO: 'ro',
    RU: 'ru',
    SR: 'sr',
    SK: 'sk',
    SL: 'sl',
    SO: 'so',
    ES: 'es',
    ES_MX: 'es-MX',
    SW: 'sw',
    SV: 'sv',
    TL: 'tl',
    TA: 'ta',
    TH: 'th',
    TR: 'tr',
    UK: 'uk',
    UR: 'ur',
    VI: 'vi'
} as const;
export type TranslateMessageRequestLanguageEnum = typeof TranslateMessageRequestLanguageEnum[keyof typeof TranslateMessageRequestLanguageEnum];

/**
 * 
 * @export
 * @interface TruncateChannelRequest
 */
export interface TruncateChannelRequest {
    /**
     * Permanently delete channel data (messages, reactions, etc.)
     * @type {boolean}
     * @memberof TruncateChannelRequest
     */
    hard_delete?: boolean;
    /**
     * 
     * @type {MessageRequest}
     * @memberof TruncateChannelRequest
     */
    message?: MessageRequest;
    /**
     * When `message` is set disables all push notifications for it
     * @type {boolean}
     * @memberof TruncateChannelRequest
     */
    skip_push?: boolean;
    /**
     * Truncate channel data up to `truncated_at`. The system message (if provided) creation time is always greater than `truncated_at`
     * @type {number}
     * @memberof TruncateChannelRequest
     */
    truncated_at?: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof TruncateChannelRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof TruncateChannelRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface TruncateChannelResponse
 */
export interface TruncateChannelResponse {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof TruncateChannelResponse
     */
    channel?: ChannelResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof TruncateChannelResponse
     */
    duration: string;
    /**
     * 
     * @type {Message}
     * @memberof TruncateChannelResponse
     */
    message?: Message | null;
}
/**
 * 
 * @export
 * @interface TypingIndicators
 */
export interface TypingIndicators {
    /**
     * 
     * @type {boolean}
     * @memberof TypingIndicators
     */
    enabled?: boolean;
}
/**
 * 
 * @export
 * @interface UnblockUserRequest
 */
export interface UnblockUserRequest {
    /**
     * the user to unblock
     * @type {string}
     * @memberof UnblockUserRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface UnblockUserResponse
 */
export interface UnblockUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UnblockUserResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface UnmuteChannelRequest
 */
export interface UnmuteChannelRequest {
    /**
     * Channel CIDs to mute (if multiple channels)
     * @type {Array<string>}
     * @memberof UnmuteChannelRequest
     */
    channel_cids?: Array<string>;
    /**
     * Duration of mute in milliseconds
     * @type {number}
     * @memberof UnmuteChannelRequest
     */
    expiration?: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof UnmuteChannelRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UnmuteChannelRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UnmuteResponse
 */
export interface UnmuteResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UnmuteResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UnmuteResponse
     */
    non_existing_users?: Array<string>;
}
/**
 * 
 * @export
 * @interface UnmuteUserRequest
 */
export interface UnmuteUserRequest {
    /**
     * User IDs to mute (if multiple users)
     * @type {Array<string>}
     * @memberof UnmuteUserRequest
     */
    target_ids?: Array<string>;
    /**
     * Duration of mute in minutes
     * @type {number}
     * @memberof UnmuteUserRequest
     */
    timeout: number;
    /**
     * 
     * @type {UserRequest}
     * @memberof UnmuteUserRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UnmuteUserRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UnpinRequest
 */
export interface UnpinRequest {
    /**
     * 
     * @type {string}
     * @memberof UnpinRequest
     */
    session_id: string;
    /**
     * 
     * @type {string}
     * @memberof UnpinRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface UnpinResponse
 */
export interface UnpinResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UnpinResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface UnreadCountsBatchRequest
 */
export interface UnreadCountsBatchRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof UnreadCountsBatchRequest
     */
    user_ids: Array<string>;
}
/**
 * 
 * @export
 * @interface UnreadCountsBatchResponse
 */
export interface UnreadCountsBatchResponse {
    /**
     * 
     * @type {{ [key: string]: UnreadCountsResponse; }}
     * @memberof UnreadCountsBatchResponse
     */
    counts_by_user: { [key: string]: UnreadCountsResponse; };
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UnreadCountsBatchResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface UnreadCountsChannel
 */
export interface UnreadCountsChannel {
    /**
     * 
     * @type {string}
     * @memberof UnreadCountsChannel
     */
    channel_id: string;
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsChannel
     */
    last_read: number;
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsChannel
     */
    unread_count: number;
}
/**
 * 
 * @export
 * @interface UnreadCountsChannelType
 */
export interface UnreadCountsChannelType {
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsChannelType
     */
    channel_count: number;
    /**
     * 
     * @type {string}
     * @memberof UnreadCountsChannelType
     */
    channel_type: string;
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsChannelType
     */
    unread_count: number;
}
/**
 * 
 * @export
 * @interface UnreadCountsResponse
 */
export interface UnreadCountsResponse {
    /**
     * 
     * @type {Array<UnreadCountsChannelType>}
     * @memberof UnreadCountsResponse
     */
    channel_type: Array<UnreadCountsChannelType>;
    /**
     * 
     * @type {Array<UnreadCountsChannel>}
     * @memberof UnreadCountsResponse
     */
    channels: Array<UnreadCountsChannel>;
    /**
     * 
     * @type {Array<UnreadCountsThread>}
     * @memberof UnreadCountsResponse
     */
    threads: Array<UnreadCountsThread>;
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsResponse
     */
    total_unread_count: number;
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsResponse
     */
    total_unread_threads_count: number;
}
/**
 * 
 * @export
 * @interface UnreadCountsThread
 */
export interface UnreadCountsThread {
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsThread
     */
    last_read: number;
    /**
     * 
     * @type {string}
     * @memberof UnreadCountsThread
     */
    last_read_message_id: string;
    /**
     * 
     * @type {string}
     * @memberof UnreadCountsThread
     */
    parent_message_id: string;
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsThread
     */
    unread_count: number;
}
/**
 * 
 * @export
 * @interface UpdateAppRequest
 */
export interface UpdateAppRequest {
    /**
     * 
     * @type {Config}
     * @memberof UpdateAppRequest
     */
    agora_options?: Config;
    /**
     * 
     * @type {APNConfig}
     * @memberof UpdateAppRequest
     */
    apn_config?: APNConfig;
    /**
     * 
     * @type {AsyncModerationConfiguration}
     * @memberof UpdateAppRequest
     */
    async_moderation_config?: AsyncModerationConfiguration;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    async_url_enrich_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    auto_translation_enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    before_message_send_hook_url?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateAppRequest
     */
    cdn_expiration_seconds?: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    channel_hide_members_only?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    custom_action_handler_url?: string;
    /**
     * 
     * @type {DataDogInfo}
     * @memberof UpdateAppRequest
     */
    datadog_info?: DataDogInfo;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    disable_auth_checks?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    disable_permissions_checks?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    enforce_unique_usernames?: UpdateAppRequestEnforceUniqueUsernamesEnum;
    /**
     * 
     * @type {FileUploadConfig}
     * @memberof UpdateAppRequest
     */
    file_upload_config?: FileUploadConfig;
    /**
     * 
     * @type {FirebaseConfig}
     * @memberof UpdateAppRequest
     */
    firebase_config?: FirebaseConfig;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof UpdateAppRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {Config}
     * @memberof UpdateAppRequest
     */
    hms_options?: Config;
    /**
     * 
     * @type {HuaweiConfig}
     * @memberof UpdateAppRequest
     */
    huawei_config?: HuaweiConfig;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateAppRequest
     */
    image_moderation_block_labels?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    image_moderation_enabled?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateAppRequest
     */
    image_moderation_labels?: Array<string>;
    /**
     * 
     * @type {FileUploadConfig}
     * @memberof UpdateAppRequest
     */
    image_upload_config?: FileUploadConfig;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    migrate_permissions_to_v2?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateAppRequest
     */
    multi_tenant_enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    permission_version?: UpdateAppRequestPermissionVersionEnum;
    /**
     * 
     * @type {PushConfig}
     * @memberof UpdateAppRequest
     */
    push_config?: PushConfig;
    /**
     * 
     * @type {number}
     * @memberof UpdateAppRequest
     */
    reminders_interval?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateAppRequest
     */
    reminders_max_members?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateAppRequest
     */
    revoke_tokens_issued_before?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    sns_key?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    sns_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    sns_topic_arn?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    sqs_key?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    sqs_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    sqs_url?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateAppRequest
     */
    user_search_disallowed_roles?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    video_provider?: UpdateAppRequestVideoProviderEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateAppRequest
     */
    webhook_events?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UpdateAppRequest
     */
    webhook_url?: string;
    /**
     * 
     * @type {XiaomiConfig}
     * @memberof UpdateAppRequest
     */
    xiaomi_config?: XiaomiConfig;
}


/**
 * @export
 */
export const UpdateAppRequestEnforceUniqueUsernamesEnum = {
    NO: 'no',
    APP: 'app',
    TEAM: 'team'
} as const;
export type UpdateAppRequestEnforceUniqueUsernamesEnum = typeof UpdateAppRequestEnforceUniqueUsernamesEnum[keyof typeof UpdateAppRequestEnforceUniqueUsernamesEnum];

/**
 * @export
 */
export const UpdateAppRequestPermissionVersionEnum = {
    V1: 'v1',
    V2: 'v2'
} as const;
export type UpdateAppRequestPermissionVersionEnum = typeof UpdateAppRequestPermissionVersionEnum[keyof typeof UpdateAppRequestPermissionVersionEnum];

/**
 * @export
 */
export const UpdateAppRequestVideoProviderEnum = {
    AGORA: 'agora',
    HMS: 'hms'
} as const;
export type UpdateAppRequestVideoProviderEnum = typeof UpdateAppRequestVideoProviderEnum[keyof typeof UpdateAppRequestVideoProviderEnum];

/**
 * 
 * @export
 * @interface UpdateBlockListRequest
 */
export interface UpdateBlockListRequest {
    /**
     * List of words to block
     * @type {Array<string>}
     * @memberof UpdateBlockListRequest
     */
    words?: Array<string>;
}
/**
 * 
 * @export
 * @interface UpdateCallMembersRequest
 */
export interface UpdateCallMembersRequest {
    /**
     * List of userID to remove
     * @type {Array<string>}
     * @memberof UpdateCallMembersRequest
     */
    remove_members?: Array<string>;
    /**
     * List of members to update or insert
     * @type {Array<MemberRequest>}
     * @memberof UpdateCallMembersRequest
     */
    update_members?: Array<MemberRequest>;
}
/**
 * 
 * @export
 * @interface UpdateCallMembersResponse
 */
export interface UpdateCallMembersResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpdateCallMembersResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MemberResponse>}
     * @memberof UpdateCallMembersResponse
     */
    members: Array<MemberResponse>;
}
/**
 * 
 * @export
 * @interface UpdateCallRequest
 */
export interface UpdateCallRequest {
    /**
     * Custom data for this object
     * @type {{ [key: string]: any; }}
     * @memberof UpdateCallRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {CallSettingsRequest}
     * @memberof UpdateCallRequest
     */
    settings_override?: CallSettingsRequest;
    /**
     * the time the call is scheduled to start
     * @type {number}
     * @memberof UpdateCallRequest
     */
    starts_at?: number;
}
/**
 * Represents a call
 * @export
 * @interface UpdateCallResponse
 */
export interface UpdateCallResponse {
    /**
     * 
     * @type {CallResponse}
     * @memberof UpdateCallResponse
     */
    call: CallResponse;
    /**
     * 
     * @type {string}
     * @memberof UpdateCallResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<MemberResponse>}
     * @memberof UpdateCallResponse
     */
    members: Array<MemberResponse>;
    /**
     * 
     * @type {Array<OwnCapability>}
     * @memberof UpdateCallResponse
     */
    own_capabilities: Array<OwnCapability>;
}
/**
 * 
 * @export
 * @interface UpdateCallTypeRequest
 */
export interface UpdateCallTypeRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateCallTypeRequest
     */
    external_storage?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof UpdateCallTypeRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {NotificationSettings}
     * @memberof UpdateCallTypeRequest
     */
    notification_settings?: NotificationSettings;
    /**
     * 
     * @type {CallSettingsRequest}
     * @memberof UpdateCallTypeRequest
     */
    settings?: CallSettingsRequest;
}
/**
 * 
 * @export
 * @interface UpdateCallTypeResponse
 */
export interface UpdateCallTypeResponse {
    /**
     * 
     * @type {number}
     * @memberof UpdateCallTypeResponse
     */
    created_at: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateCallTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCallTypeResponse
     */
    external_storage?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof UpdateCallTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {string}
     * @memberof UpdateCallTypeResponse
     */
    name: string;
    /**
     * 
     * @type {NotificationSettings}
     * @memberof UpdateCallTypeResponse
     */
    notification_settings: NotificationSettings;
    /**
     * 
     * @type {CallSettingsResponse}
     * @memberof UpdateCallTypeResponse
     */
    settings: CallSettingsResponse;
    /**
     * 
     * @type {number}
     * @memberof UpdateCallTypeResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface UpdateChannelPartialRequest
 */
export interface UpdateChannelPartialRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UpdateChannelPartialRequest
     */
    set?: { [key: string]: any; };
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateChannelPartialRequest
     */
    unset?: Array<string>;
    /**
     * 
     * @type {UserRequest}
     * @memberof UpdateChannelPartialRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelPartialRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UpdateChannelPartialResponse
 */
export interface UpdateChannelPartialResponse {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof UpdateChannelPartialResponse
     */
    channel?: ChannelResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpdateChannelPartialResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<ChannelMember>}
     * @memberof UpdateChannelPartialResponse
     */
    members: Array<ChannelMember>;
}
/**
 * 
 * @export
 * @interface UpdateChannelRequest
 */
export interface UpdateChannelRequest {
    /**
     * Set to `true` to accept the invite
     * @type {boolean}
     * @memberof UpdateChannelRequest
     */
    accept_invite?: boolean;
    /**
     * List of user IDs to add to the channel
     * @type {Array<ChannelMember>}
     * @memberof UpdateChannelRequest
     */
    add_members?: Array<ChannelMember>;
    /**
     * List of user IDs to make channel moderators
     * @type {Array<string>}
     * @memberof UpdateChannelRequest
     */
    add_moderators?: Array<string>;
    /**
     * List of channel member role assignments. If any specified user is not part of the channel, the request will fail
     * @type {Array<ChannelMember>}
     * @memberof UpdateChannelRequest
     */
    assign_roles?: Array<ChannelMember>;
    /**
     * Sets cool down period for the channel in seconds
     * @type {number}
     * @memberof UpdateChannelRequest
     */
    cooldown?: number;
    /**
     * 
     * @type {ChannelInput}
     * @memberof UpdateChannelRequest
     */
    data?: ChannelInput;
    /**
     * List of user IDs to take away moderators status from
     * @type {Array<string>}
     * @memberof UpdateChannelRequest
     */
    demote_moderators?: Array<string>;
    /**
     * Set to `true` to hide channel's history when adding new members
     * @type {boolean}
     * @memberof UpdateChannelRequest
     */
    hide_history?: boolean;
    /**
     * List of user IDs to invite to the channel
     * @type {Array<ChannelMember>}
     * @memberof UpdateChannelRequest
     */
    invites?: Array<ChannelMember>;
    /**
     * 
     * @type {MessageRequest}
     * @memberof UpdateChannelRequest
     */
    message?: MessageRequest;
    /**
     * Set to `true` to reject the invite
     * @type {boolean}
     * @memberof UpdateChannelRequest
     */
    reject_invite?: boolean;
    /**
     * List of user IDs to remove from the channel
     * @type {Array<string>}
     * @memberof UpdateChannelRequest
     */
    remove_members?: Array<string>;
    /**
     * When `message` is set disables all push notifications for it
     * @type {boolean}
     * @memberof UpdateChannelRequest
     */
    skip_push?: boolean;
    /**
     * 
     * @type {UserRequest}
     * @memberof UpdateChannelRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UpdateChannelResponse
 */
export interface UpdateChannelResponse {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof UpdateChannelResponse
     */
    channel?: ChannelResponse;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpdateChannelResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<ChannelMember>}
     * @memberof UpdateChannelResponse
     */
    members: Array<ChannelMember>;
    /**
     * 
     * @type {Message}
     * @memberof UpdateChannelResponse
     */
    message?: Message | null;
}
/**
 * 
 * @export
 * @interface UpdateChannelTypeRequest
 */
export interface UpdateChannelTypeRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateChannelTypeRequest
     */
    allowed_flag_reasons?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeRequest
     */
    automod: UpdateChannelTypeRequestAutomodEnum;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeRequest
     */
    automod_behavior: UpdateChannelTypeRequestAutomodBehaviorEnum;
    /**
     * 
     * @type {Thresholds}
     * @memberof UpdateChannelTypeRequest
     */
    automod_thresholds?: Thresholds;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeRequest
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeRequest
     */
    blocklist_behavior?: UpdateChannelTypeRequestBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptions>}
     * @memberof UpdateChannelTypeRequest
     */
    blocklists?: Array<BlockListOptions>;
    /**
     * List of commands that channel supports
     * @type {Array<string>}
     * @memberof UpdateChannelTypeRequest
     */
    commands?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    connect_events?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    custom_events?: boolean;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof UpdateChannelTypeRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    mark_messages_pending?: boolean;
    /**
     * 
     * @type {number}
     * @memberof UpdateChannelTypeRequest
     */
    max_message_length: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    mutes?: boolean;
    /**
     * 
     * @type {Array<PolicyRequest>}
     * @memberof UpdateChannelTypeRequest
     */
    permissions?: Array<PolicyRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    polls?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    push_notifications?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    quotes?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    reactions?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    read_events?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    reminders?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    replies?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    search?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    typing_events?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    uploads?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeRequest
     */
    url_enrichment?: boolean;
}


/**
 * @export
 */
export const UpdateChannelTypeRequestAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type UpdateChannelTypeRequestAutomodEnum = typeof UpdateChannelTypeRequestAutomodEnum[keyof typeof UpdateChannelTypeRequestAutomodEnum];

/**
 * @export
 */
export const UpdateChannelTypeRequestAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type UpdateChannelTypeRequestAutomodBehaviorEnum = typeof UpdateChannelTypeRequestAutomodBehaviorEnum[keyof typeof UpdateChannelTypeRequestAutomodBehaviorEnum];

/**
 * @export
 */
export const UpdateChannelTypeRequestBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type UpdateChannelTypeRequestBlocklistBehaviorEnum = typeof UpdateChannelTypeRequestBlocklistBehaviorEnum[keyof typeof UpdateChannelTypeRequestBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface UpdateChannelTypeResponse
 */
export interface UpdateChannelTypeResponse {
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateChannelTypeResponse
     */
    allowed_flag_reasons?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    automod: UpdateChannelTypeResponseAutomodEnum;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    automod_behavior: UpdateChannelTypeResponseAutomodBehaviorEnum;
    /**
     * 
     * @type {Thresholds}
     * @memberof UpdateChannelTypeResponse
     */
    automod_thresholds?: Thresholds;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    blocklist_behavior?: UpdateChannelTypeResponseBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptions>}
     * @memberof UpdateChannelTypeResponse
     */
    blocklists?: Array<BlockListOptions>;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateChannelTypeResponse
     */
    commands: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    connect_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof UpdateChannelTypeResponse
     */
    created_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    custom_events: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    duration: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof UpdateChannelTypeResponse
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    mark_messages_pending: boolean;
    /**
     * 
     * @type {number}
     * @memberof UpdateChannelTypeResponse
     */
    max_message_length: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    mutes: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    name: string;
    /**
     * 
     * @type {Array<PolicyRequest>}
     * @memberof UpdateChannelTypeResponse
     */
    permissions: Array<PolicyRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    polls: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    push_notifications: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    quotes: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    reactions: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    read_events: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    reminders: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    replies: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    search: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    typing_events: boolean;
    /**
     * 
     * @type {number}
     * @memberof UpdateChannelTypeResponse
     */
    updated_at: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    uploads: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateChannelTypeResponse
     */
    url_enrichment: boolean;
}


/**
 * @export
 */
export const UpdateChannelTypeResponseAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type UpdateChannelTypeResponseAutomodEnum = typeof UpdateChannelTypeResponseAutomodEnum[keyof typeof UpdateChannelTypeResponseAutomodEnum];

/**
 * @export
 */
export const UpdateChannelTypeResponseAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type UpdateChannelTypeResponseAutomodBehaviorEnum = typeof UpdateChannelTypeResponseAutomodBehaviorEnum[keyof typeof UpdateChannelTypeResponseAutomodBehaviorEnum];

/**
 * @export
 */
export const UpdateChannelTypeResponseBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block',
    SHADOW_BLOCK: 'shadow_block'
} as const;
export type UpdateChannelTypeResponseBlocklistBehaviorEnum = typeof UpdateChannelTypeResponseBlocklistBehaviorEnum[keyof typeof UpdateChannelTypeResponseBlocklistBehaviorEnum];

/**
 * Represents custom chat command
 * @export
 * @interface UpdateCommandRequest
 */
export interface UpdateCommandRequest {
    /**
     * Arguments help text, shown in commands auto-completion
     * @type {string}
     * @memberof UpdateCommandRequest
     */
    args?: string;
    /**
     * Description, shown in commands auto-completion
     * @type {string}
     * @memberof UpdateCommandRequest
     */
    description: string;
    /**
     * Set name used for grouping commands
     * @type {string}
     * @memberof UpdateCommandRequest
     */
    set?: string;
}
/**
 * 
 * @export
 * @interface UpdateCommandResponse
 */
export interface UpdateCommandResponse {
    /**
     * 
     * @type {Command}
     * @memberof UpdateCommandResponse
     */
    command?: Command | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateCommandResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface UpdateExternalStorageRequest
 */
export interface UpdateExternalStorageRequest {
    /**
     * 
     * @type {S3Request}
     * @memberof UpdateExternalStorageRequest
     */
    aws_s3?: S3Request;
    /**
     * 
     * @type {AzureRequest}
     * @memberof UpdateExternalStorageRequest
     */
    azure_blob?: AzureRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageRequest
     */
    bucket: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageRequest
     */
    gcs_credentials?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageRequest
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageRequest
     */
    storage_type: string;
}
/**
 * 
 * @export
 * @interface UpdateExternalStorageResponse
 */
export interface UpdateExternalStorageResponse {
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageResponse
     */
    bucket: string;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpdateExternalStorageResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageResponse
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateExternalStorageResponse
     */
    type: string;
}
/**
 * 
 * @export
 * @interface UpdateMessagePartialRequest
 */
export interface UpdateMessagePartialRequest {
    /**
     * Sets new field values
     * @type {{ [key: string]: any; }}
     * @memberof UpdateMessagePartialRequest
     */
    set?: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdateMessagePartialRequest
     */
    skip_enrich_url?: boolean;
    /**
     * Array of field names to unset
     * @type {Array<string>}
     * @memberof UpdateMessagePartialRequest
     */
    unset?: Array<string>;
    /**
     * 
     * @type {UserRequest}
     * @memberof UpdateMessagePartialRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdateMessagePartialRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UpdateMessagePartialResponse
 */
export interface UpdateMessagePartialResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpdateMessagePartialResponse
     */
    duration: string;
    /**
     * 
     * @type {Message}
     * @memberof UpdateMessagePartialResponse
     */
    message?: Message | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof UpdateMessagePartialResponse
     */
    pending_message_metadata?: { [key: string]: string; };
}
/**
 * 
 * @export
 * @interface UpdateMessageRequest
 */
export interface UpdateMessageRequest {
    /**
     * 
     * @type {MessageRequest}
     * @memberof UpdateMessageRequest
     */
    message: MessageRequest;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateMessageRequest
     */
    skip_enrich_url?: boolean;
}
/**
 * 
 * @export
 * @interface UpdateMessageResponse
 */
export interface UpdateMessageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpdateMessageResponse
     */
    duration: string;
    /**
     * 
     * @type {Message}
     * @memberof UpdateMessageResponse
     */
    message: Message | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof UpdateMessageResponse
     */
    pending_message_metadata?: { [key: string]: string; };
}
/**
 * 
 * @export
 * @interface UpdatePollOptionRequest
 */
export interface UpdatePollOptionRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UpdatePollOptionRequest
     */
    Custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof UpdatePollOptionRequest
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollOptionRequest
     */
    text: string;
    /**
     * 
     * @type {UserRequest}
     * @memberof UpdatePollOptionRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollOptionRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UpdatePollPartialRequest
 */
export interface UpdatePollPartialRequest {
    /**
     * Sets new field values
     * @type {{ [key: string]: any; }}
     * @memberof UpdatePollPartialRequest
     */
    set?: { [key: string]: any; };
    /**
     * Array of field names to unset
     * @type {Array<string>}
     * @memberof UpdatePollPartialRequest
     */
    unset?: Array<string>;
    /**
     * 
     * @type {UserRequest}
     * @memberof UpdatePollPartialRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollPartialRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UpdatePollRequest
 */
export interface UpdatePollRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UpdatePollRequest
     */
    Custom?: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePollRequest
     */
    allow_answers?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePollRequest
     */
    allow_user_suggested_options?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollRequest
     */
    description?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePollRequest
     */
    enforce_unique_vote?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollRequest
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdatePollRequest
     */
    is_closed?: boolean;
    /**
     * 
     * @type {number}
     * @memberof UpdatePollRequest
     */
    max_votes_allowed?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollRequest
     */
    name: string;
    /**
     * 
     * @type {Array<PollOption>}
     * @memberof UpdatePollRequest
     */
    options?: Array<PollOption>;
    /**
     * 
     * @type {UserRequest}
     * @memberof UpdatePollRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollRequest
     */
    user_id?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePollRequest
     */
    voting_visibility?: UpdatePollRequestVotingVisibilityEnum;
}


/**
 * @export
 */
export const UpdatePollRequestVotingVisibilityEnum = {
    ANONYMOUS: 'anonymous',
    PUBLIC: 'public'
} as const;
export type UpdatePollRequestVotingVisibilityEnum = typeof UpdatePollRequestVotingVisibilityEnum[keyof typeof UpdatePollRequestVotingVisibilityEnum];

/**
 * 
 * @export
 * @interface UpdateThreadPartialRequest
 */
export interface UpdateThreadPartialRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UpdateThreadPartialRequest
     */
    set?: { [key: string]: any; };
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateThreadPartialRequest
     */
    unset?: Array<string>;
    /**
     * 
     * @type {UserRequest}
     * @memberof UpdateThreadPartialRequest
     */
    user?: UserRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdateThreadPartialRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface UpdateThreadPartialResponse
 */
export interface UpdateThreadPartialResponse {
    /**
     * 
     * @type {string}
     * @memberof UpdateThreadPartialResponse
     */
    duration: string;
    /**
     * 
     * @type {ThreadResponse}
     * @memberof UpdateThreadPartialResponse
     */
    thread: ThreadResponse;
}
/**
 * 
 * @export
 * @interface UpdateUserPartialRequest
 */
export interface UpdateUserPartialRequest {
    /**
     * User ID to update
     * @type {string}
     * @memberof UpdateUserPartialRequest
     */
    id: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UpdateUserPartialRequest
     */
    set?: { [key: string]: any; };
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateUserPartialRequest
     */
    unset?: Array<string>;
}
/**
 * 
 * @export
 * @interface UpdateUserPermissionsRequest
 */
export interface UpdateUserPermissionsRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateUserPermissionsRequest
     */
    grant_permissions?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateUserPermissionsRequest
     */
    revoke_permissions?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserPermissionsRequest
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface UpdateUserPermissionsResponse
 */
export interface UpdateUserPermissionsResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpdateUserPermissionsResponse
     */
    duration: string;
}
/**
 * 
 * @export
 * @interface UpdateUsersPartialRequest
 */
export interface UpdateUsersPartialRequest {
    /**
     * 
     * @type {Array<UpdateUserPartialRequest>}
     * @memberof UpdateUsersPartialRequest
     */
    users: Array<UpdateUserPartialRequest>;
}
/**
 * 
 * @export
 * @interface UpdateUsersRequest
 */
export interface UpdateUsersRequest {
    /**
     * Object containing users
     * @type {{ [key: string]: UserRequest; }}
     * @memberof UpdateUsersRequest
     */
    users: { [key: string]: UserRequest; };
}
/**
 * 
 * @export
 * @interface UpdateUsersResponse
 */
export interface UpdateUsersResponse {
    /**
     * 
     * @type {string}
     * @memberof UpdateUsersResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUsersResponse
     */
    membership_deletion_task_id: string;
    /**
     * Object containing users
     * @type {{ [key: string]: FullUserResponse; }}
     * @memberof UpdateUsersResponse
     */
    users: { [key: string]: FullUserResponse; };
}
/**
 * 
 * @export
 * @interface UpsertPushProviderRequest
 */
export interface UpsertPushProviderRequest {
    /**
     * 
     * @type {PushProvider}
     * @memberof UpsertPushProviderRequest
     */
    push_provider?: PushProvider | null;
}
/**
 * 
 * @export
 * @interface UpsertPushProviderResponse
 */
export interface UpsertPushProviderResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UpsertPushProviderResponse
     */
    duration: string;
    /**
     * 
     * @type {PushProviderResponse}
     * @memberof UpsertPushProviderResponse
     */
    push_provider: PushProviderResponse;
}
/**
 * 
 * @export
 * @interface UserCustomEventRequest
 */
export interface UserCustomEventRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UserCustomEventRequest
     */
    custom?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof UserCustomEventRequest
     */
    type: string;
}
/**
 * 
 * @export
 * @interface UserInfoResponse
 */
export interface UserInfoResponse {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UserInfoResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof UserInfoResponse
     */
    image: string;
    /**
     * 
     * @type {string}
     * @memberof UserInfoResponse
     */
    name: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserInfoResponse
     */
    roles: Array<string>;
}
/**
 * 
 * @export
 * @interface UserMute
 */
export interface UserMute {
    /**
     * Date/time of creation
     * @type {number}
     * @memberof UserMute
     */
    created_at: number;
    /**
     * Date/time of mute expiration
     * @type {number}
     * @memberof UserMute
     */
    expires?: number;
    /**
     * 
     * @type {UserObject}
     * @memberof UserMute
     */
    target?: UserObject;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof UserMute
     */
    updated_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof UserMute
     */
    user?: UserObject;
}
/**
 * Represents chat user
 * @export
 * @interface UserObject
 */
export interface UserObject {
    /**
     * Expiration date of the ban
     * @type {number}
     * @memberof UserObject
     */
    ban_expires?: number;
    /**
     * Whether a user is banned or not
     * @type {boolean}
     * @memberof UserObject
     */
    banned: boolean;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof UserObject
     */
    readonly created_at?: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UserObject
     */
    custom: { [key: string]: any; };
    /**
     * Date of deactivation
     * @type {number}
     * @memberof UserObject
     */
    readonly deactivated_at?: number;
    /**
     * Date/time of deletion
     * @type {number}
     * @memberof UserObject
     */
    readonly deleted_at?: number;
    /**
     * Unique user identifier
     * @type {string}
     * @memberof UserObject
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserObject
     */
    invisible?: boolean;
    /**
     * Preferred language of a user
     * @type {string}
     * @memberof UserObject
     */
    language?: string;
    /**
     * Date of last activity
     * @type {number}
     * @memberof UserObject
     */
    readonly last_active?: number;
    /**
     * Whether a user online or not
     * @type {boolean}
     * @memberof UserObject
     */
    readonly online: boolean;
    /**
     * 
     * @type {PrivacySettings}
     * @memberof UserObject
     */
    privacy_settings?: PrivacySettings;
    /**
     * 
     * @type {PushNotificationSettings}
     * @memberof UserObject
     */
    push_notifications?: PushNotificationSettings;
    /**
     * Revocation date for tokens
     * @type {number}
     * @memberof UserObject
     */
    revoke_tokens_issued_before?: number;
    /**
     * Determines the set of user permissions
     * @type {string}
     * @memberof UserObject
     */
    role: string;
    /**
     * List of teams user is a part of
     * @type {Array<string>}
     * @memberof UserObject
     */
    teams?: Array<string>;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof UserObject
     */
    readonly updated_at?: number;
}
/**
 * 
 * @export
 * @interface UserRequest
 */
export interface UserRequest {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UserRequest
     */
    custom?: { [key: string]: any; };
    /**
     * User ID
     * @type {string}
     * @memberof UserRequest
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    image?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserRequest
     */
    invisible?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    language?: string;
    /**
     * Optional name of user
     * @type {string}
     * @memberof UserRequest
     */
    name?: string;
    /**
     * 
     * @type {PrivacySettings}
     * @memberof UserRequest
     */
    privacy_settings?: PrivacySettings;
    /**
     * 
     * @type {PushNotificationSettingsInput}
     * @memberof UserRequest
     */
    push_notifications?: PushNotificationSettingsInput;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    role?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserRequest
     */
    teams?: Array<string>;
}
/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {boolean}
     * @memberof UserResponse
     */
    banned: boolean;
    /**
     * Date/time of creation
     * @type {number}
     * @memberof UserResponse
     */
    created_at: number;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UserResponse
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof UserResponse
     */
    deactivated_at?: number;
    /**
     * Date/time of deletion
     * @type {number}
     * @memberof UserResponse
     */
    deleted_at?: number;
    /**
     * 
     * @type {Array<Device>}
     * @memberof UserResponse
     */
    devices: Array<Device>;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    image?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserResponse
     */
    invisible: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    language: string;
    /**
     * 
     * @type {number}
     * @memberof UserResponse
     */
    last_active?: number;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserResponse
     */
    online: boolean;
    /**
     * 
     * @type {PushNotificationSettings}
     * @memberof UserResponse
     */
    push_notifications?: PushNotificationSettings;
    /**
     * 
     * @type {number}
     * @memberof UserResponse
     */
    revoke_tokens_issued_before?: number;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    role: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserResponse
     */
    shadow_banned: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserResponse
     */
    teams: Array<string>;
    /**
     * Date/time of the last update
     * @type {number}
     * @memberof UserResponse
     */
    updated_at: number;
}
/**
 * 
 * @export
 * @interface UserSessionStats
 */
export interface UserSessionStats {
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    browser?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    browser_version?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    current_ip?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    current_sfu?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    device_model?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    device_version?: string;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    distance_to_sfu_kilometers?: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    freeze_duration_seconds: number;
    /**
     * 
     * @type {GeolocationResult}
     * @memberof UserSessionStats
     */
    geolocation?: GeolocationResult;
    /**
     * 
     * @type {Stats}
     * @memberof UserSessionStats
     */
    jitter?: Stats;
    /**
     * 
     * @type {Stats}
     * @memberof UserSessionStats
     */
    latency?: Stats;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    max_fir_per_second?: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    max_freeze_fraction: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    max_freezes_duration_seconds: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    max_freezes_per_second?: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    max_nack_per_second?: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    max_pli_per_second?: number;
    /**
     * 
     * @type {VideoQuality}
     * @memberof UserSessionStats
     */
    max_publishing_video_quality?: VideoQuality;
    /**
     * 
     * @type {VideoQuality}
     * @memberof UserSessionStats
     */
    max_receiving_video_quality?: VideoQuality;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    os?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    os_version?: string;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    packet_loss_fraction: number;
    /**
     * 
     * @type {MediaPubSubHint}
     * @memberof UserSessionStats
     */
    pub_sub_hints?: MediaPubSubHint;
    /**
     * 
     * @type {Array<PublishedTrackInfo>}
     * @memberof UserSessionStats
     */
    published_tracks?: Array<PublishedTrackInfo>;
    /**
     * 
     * @type {MOSStats}
     * @memberof UserSessionStats
     */
    publisher_audio_mos?: MOSStats;
    /**
     * 
     * @type {Stats}
     * @memberof UserSessionStats
     */
    publisher_jitter?: Stats;
    /**
     * 
     * @type {Stats}
     * @memberof UserSessionStats
     */
    publisher_latency?: Stats;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    publisher_noise_cancellation_seconds?: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    publisher_packet_loss_fraction: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    publisher_quality_limitation_fraction?: number;
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof UserSessionStats
     */
    publisher_video_quality_limitation_duration_seconds?: { [key: string]: number; };
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    publishing_audio_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    publishing_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    publishing_video_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    quality_score: number;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    receiving_audio_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    receiving_duration_seconds: number;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    receiving_video_codec?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    sdk?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    sdk_version?: string;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    session_id: string;
    /**
     * 
     * @type {MOSStats}
     * @memberof UserSessionStats
     */
    subscriber_audio_mos?: MOSStats;
    /**
     * 
     * @type {Stats}
     * @memberof UserSessionStats
     */
    subscriber_jitter?: Stats;
    /**
     * 
     * @type {Stats}
     * @memberof UserSessionStats
     */
    subscriber_latency?: Stats;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    subscriber_video_quality_throttled_duration_seconds?: number;
    /**
     * 
     * @type {Array<Subsession>}
     * @memberof UserSessionStats
     */
    subsessions?: Array<Subsession>;
    /**
     * 
     * @type {CallTimeline}
     * @memberof UserSessionStats
     */
    timeline?: CallTimeline;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    total_pixels_in: number;
    /**
     * 
     * @type {number}
     * @memberof UserSessionStats
     */
    total_pixels_out: number;
    /**
     * 
     * @type {string}
     * @memberof UserSessionStats
     */
    webrtc_version?: string;
}
/**
 * 
 * @export
 * @interface UserStats
 */
export interface UserStats {
    /**
     * 
     * @type {UserInfoResponse}
     * @memberof UserStats
     */
    info: UserInfoResponse;
    /**
     * 
     * @type {number}
     * @memberof UserStats
     */
    min_event_ts: number;
    /**
     * 
     * @type {number}
     * @memberof UserStats
     */
    rating?: number;
    /**
     * 
     * @type {Array<UserSessionStats>}
     * @memberof UserStats
     */
    session_stats: Array<UserSessionStats>;
}
/**
 * 
 * @export
 * @interface VideoQuality
 */
export interface VideoQuality {
    /**
     * 
     * @type {VideoResolution}
     * @memberof VideoQuality
     */
    resolution?: VideoResolution;
    /**
     * 
     * @type {string}
     * @memberof VideoQuality
     */
    usage_type?: string;
}
/**
 * 
 * @export
 * @interface VideoResolution
 */
export interface VideoResolution {
    /**
     * 
     * @type {number}
     * @memberof VideoResolution
     */
    height: number;
    /**
     * 
     * @type {number}
     * @memberof VideoResolution
     */
    width: number;
}
/**
 * 
 * @export
 * @interface VideoSettings
 */
export interface VideoSettings {
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettings
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettings
     */
    camera_default_on: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoSettings
     */
    camera_facing: VideoSettingsCameraFacingEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettings
     */
    enabled: boolean;
    /**
     * 
     * @type {TargetResolution}
     * @memberof VideoSettings
     */
    target_resolution: TargetResolution;
}


/**
 * @export
 */
export const VideoSettingsCameraFacingEnum = {
    FRONT: 'front',
    BACK: 'back',
    EXTERNAL: 'external'
} as const;
export type VideoSettingsCameraFacingEnum = typeof VideoSettingsCameraFacingEnum[keyof typeof VideoSettingsCameraFacingEnum];

/**
 * 
 * @export
 * @interface VideoSettingsRequest
 */
export interface VideoSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettingsRequest
     */
    access_request_enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettingsRequest
     */
    camera_default_on?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoSettingsRequest
     */
    camera_facing?: VideoSettingsRequestCameraFacingEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettingsRequest
     */
    enabled?: boolean;
    /**
     * 
     * @type {TargetResolution}
     * @memberof VideoSettingsRequest
     */
    target_resolution?: TargetResolution;
}


/**
 * @export
 */
export const VideoSettingsRequestCameraFacingEnum = {
    FRONT: 'front',
    BACK: 'back',
    EXTERNAL: 'external'
} as const;
export type VideoSettingsRequestCameraFacingEnum = typeof VideoSettingsRequestCameraFacingEnum[keyof typeof VideoSettingsRequestCameraFacingEnum];

/**
 * 
 * @export
 * @interface VideoSettingsResponse
 */
export interface VideoSettingsResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettingsResponse
     */
    access_request_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettingsResponse
     */
    camera_default_on: boolean;
    /**
     * 
     * @type {string}
     * @memberof VideoSettingsResponse
     */
    camera_facing: VideoSettingsResponseCameraFacingEnum;
    /**
     * 
     * @type {boolean}
     * @memberof VideoSettingsResponse
     */
    enabled: boolean;
    /**
     * 
     * @type {TargetResolution}
     * @memberof VideoSettingsResponse
     */
    target_resolution: TargetResolution;
}


/**
 * @export
 */
export const VideoSettingsResponseCameraFacingEnum = {
    FRONT: 'front',
    BACK: 'back',
    EXTERNAL: 'external'
} as const;
export type VideoSettingsResponseCameraFacingEnum = typeof VideoSettingsResponseCameraFacingEnum[keyof typeof VideoSettingsResponseCameraFacingEnum];

/**
 * 
 * @export
 * @interface VoteData
 */
export interface VoteData {
    /**
     * 
     * @type {PollOption}
     * @memberof VoteData
     */
    Option?: PollOption | null;
    /**
     * 
     * @type {string}
     * @memberof VoteData
     */
    answer_text?: string;
    /**
     * 
     * @type {string}
     * @memberof VoteData
     */
    option_id?: string;
}
/**
 * Represents an BaseEvent that happened in Stream Chat
 * @export
 * @interface WSEvent
 */
export interface WSEvent {
    /**
     * 
     * @type {boolean}
     * @memberof WSEvent
     */
    automoderation?: boolean;
    /**
     * 
     * @type {ModerationResponse}
     * @memberof WSEvent
     */
    automoderation_scores?: ModerationResponse;
    /**
     * 
     * @type {ChannelResponse}
     * @memberof WSEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    channel_id?: string;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    channel_type?: string;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    cid?: string;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    connection_id?: string;
    /**
     * 
     * @type {number}
     * @memberof WSEvent
     */
    created_at: number;
    /**
     * 
     * @type {UserObject}
     * @memberof WSEvent
     */
    created_by?: UserObject;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof WSEvent
     */
    custom: { [key: string]: any; };
    /**
     * 
     * @type {OwnUser}
     * @memberof WSEvent
     */
    me?: OwnUser;
    /**
     * 
     * @type {ChannelMember}
     * @memberof WSEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {Message}
     * @memberof WSEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {MessageUpdate}
     * @memberof WSEvent
     */
    message_update?: MessageUpdate;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    parent_id?: string;
    /**
     * 
     * @type {Poll}
     * @memberof WSEvent
     */
    poll?: Poll;
    /**
     * 
     * @type {PollVote}
     * @memberof WSEvent
     */
    poll_vote?: PollVote | null;
    /**
     * 
     * @type {Reaction}
     * @memberof WSEvent
     */
    reaction?: Reaction | null;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    reason?: string;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    team?: string;
    /**
     * 
     * @type {Thread}
     * @memberof WSEvent
     */
    thread?: Thread;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof WSEvent
     */
    user?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof WSEvent
     */
    user_id?: string;
    /**
     * 
     * @type {number}
     * @memberof WSEvent
     */
    watcher_count?: number;
}
/**
 * 
 * @export
 * @interface WrappedUnreadCountsResponse
 */
export interface WrappedUnreadCountsResponse {
    /**
     * 
     * @type {Array<UnreadCountsChannelType>}
     * @memberof WrappedUnreadCountsResponse
     */
    channel_type: Array<UnreadCountsChannelType>;
    /**
     * 
     * @type {Array<UnreadCountsChannel>}
     * @memberof WrappedUnreadCountsResponse
     */
    channels: Array<UnreadCountsChannel>;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof WrappedUnreadCountsResponse
     */
    duration: string;
    /**
     * 
     * @type {Array<UnreadCountsThread>}
     * @memberof WrappedUnreadCountsResponse
     */
    threads: Array<UnreadCountsThread>;
    /**
     * 
     * @type {number}
     * @memberof WrappedUnreadCountsResponse
     */
    total_unread_count: number;
    /**
     * 
     * @type {number}
     * @memberof WrappedUnreadCountsResponse
     */
    total_unread_threads_count: number;
}
/**
 * 
 * @export
 * @interface XiaomiConfig
 */
export interface XiaomiConfig {
    /**
     * 
     * @type {boolean}
     * @memberof XiaomiConfig
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof XiaomiConfig
     */
    package_name?: string;
    /**
     * 
     * @type {string}
     * @memberof XiaomiConfig
     */
    secret?: string;
}
/**
 * 
 * @export
 * @interface XiaomiConfigFields
 */
export interface XiaomiConfigFields {
    /**
     * 
     * @type {boolean}
     * @memberof XiaomiConfigFields
     */
    enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof XiaomiConfigFields
     */
    package_name?: string;
    /**
     * 
     * @type {string}
     * @memberof XiaomiConfigFields
     */
    secret?: string;
}
