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
 * @interface APNConfigRequest
 */
export interface APNConfigRequest {
    /**
     * 
     * @type {boolean}
     * @memberof APNConfigRequest
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    auth_key?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    auth_type?: APNConfigRequestAuthTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    bundle_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof APNConfigRequest
     */
    development?: boolean;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    host?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    key_id?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    p12_cert?: string;
    /**
     * 
     * @type {string}
     * @memberof APNConfigRequest
     */
    team_id?: string;
}


/**
 * @export
 */
export const APNConfigRequestAuthTypeEnum = {
    CERTIFICATE: 'certificate',
    TOKEN: 'token'
} as const;
export type APNConfigRequestAuthTypeEnum = typeof APNConfigRequestAuthTypeEnum[keyof typeof APNConfigRequestAuthTypeEnum];

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
 * @interface ActionRequest
 */
export interface ActionRequest {
    /**
     * 
     * @type {string}
     * @memberof ActionRequest
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionRequest
     */
    style?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionRequest
     */
    text?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionRequest
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionRequest
     */
    value?: string;
}
/**
 * 
 * @export
 * @interface AgoraCall
 */
export interface AgoraCall {
    /**
     * 
     * @type {string}
     * @memberof AgoraCall
     */
    channel: string;
}
/**
 * 
 * @export
 * @interface AnyEvent
 */
export interface AnyEvent {
    /**
     * 
     * @type {string}
     * @memberof AnyEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof AnyEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface App
 */
export interface App {
    /**
     * 
     * @type {Config}
     * @memberof App
     */
    agora_options?: Config;
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    async_url_enrich_enabled: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    auto_translation_enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    before_message_send_hook_url?: string;
    /**
     * 
     * @type {{ [key: string]: CallType; }}
     * @memberof App
     */
    call_types: { [key: string]: CallType; };
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    campaign_enabled: boolean;
    /**
     * 
     * @type {number}
     * @memberof App
     */
    cdn_expiration_seconds: number;
    /**
     * Object with channel configs
     * @type {{ [key: string]: ChannelConfig; }}
     * @memberof App
     */
    channel_configs: { [key: string]: ChannelConfig; };
    /**
     * 
     * @type {string}
     * @memberof App
     */
    custom_action_handler_url: string;
    /**
     * 
     * @type {DataDogInfo}
     * @memberof App
     */
    datadog_info?: DataDogInfo;
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    disable_auth_checks: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    disable_permissions_checks: boolean;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    enforce_unique_usernames: string;
    /**
     * 
     * @type {FileUploadConfig}
     * @memberof App
     */
    file_upload_config: FileUploadConfig;
    /**
     * 
     * @type {Array<GeofenceResponse>}
     * @memberof App
     */
    geofences?: Array<GeofenceResponse>;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof App
     */
    grants: { [key: string]: Array<string>; };
    /**
     * 
     * @type {Config}
     * @memberof App
     */
    hms_options?: Config;
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    image_moderation_enabled: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof App
     */
    image_moderation_labels?: Array<string>;
    /**
     * 
     * @type {FileUploadConfig}
     * @memberof App
     */
    image_upload_config: FileUploadConfig;
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    multi_tenant_enabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    organization: string;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    permission_version: string;
    /**
     * 
     * @type {{ [key: string]: Array<Policy>; }}
     * @memberof App
     */
    policies: { [key: string]: Array<Policy>; };
    /**
     * 
     * @type {PushNotificationFields}
     * @memberof App
     */
    push_notifications: PushNotificationFields;
    /**
     * 
     * @type {number}
     * @memberof App
     */
    reminders_interval: number;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    revoke_tokens_issued_before?: string;
    /**
     * Backend implementation used for search
     * @type {string}
     * @memberof App
     */
    search_backend: AppSearchBackendEnum;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    sns_key: string;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    sns_secret: string;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    sns_topic_arn: string;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    sqs_key: string;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    sqs_secret: string;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    sqs_url: string;
    /**
     * 
     * @type {boolean}
     * @memberof App
     */
    suspended: boolean;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    suspended_explanation: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof App
     */
    user_search_disallowed_roles: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    video_provider: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof App
     */
    webhook_events: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof App
     */
    webhook_url: string;
}


/**
 * @export
 */
export const AppSearchBackendEnum = {
    ELASTICSEARCH: 'elasticsearch',
    POSTGRES: 'postgres',
    DISABLED: 'disabled'
} as const;
export type AppSearchBackendEnum = typeof AppSearchBackendEnum[keyof typeof AppSearchBackendEnum];

/**
 * 
 * @export
 * @interface AsyncModerationCallbackConfigRequest
 */
export interface AsyncModerationCallbackConfigRequest {
    /**
     * 
     * @type {string}
     * @memberof AsyncModerationCallbackConfigRequest
     */
    mode?: AsyncModerationCallbackConfigRequestModeEnum;
    /**
     * 
     * @type {string}
     * @memberof AsyncModerationCallbackConfigRequest
     */
    server_url?: string;
}


/**
 * @export
 */
export const AsyncModerationCallbackConfigRequestModeEnum = {
    NONE: 'CALLBACK_MODE_NONE',
    REST: 'CALLBACK_MODE_REST',
    TWIRP: 'CALLBACK_MODE_TWIRP'
} as const;
export type AsyncModerationCallbackConfigRequestModeEnum = typeof AsyncModerationCallbackConfigRequestModeEnum[keyof typeof AsyncModerationCallbackConfigRequestModeEnum];

/**
 * 
 * @export
 * @interface AsyncModerationConfigurationRequest
 */
export interface AsyncModerationConfigurationRequest {
    /**
     * 
     * @type {AsyncModerationCallbackConfigRequest}
     * @memberof AsyncModerationConfigurationRequest
     */
    callback?: AsyncModerationCallbackConfigRequest;
    /**
     * 
     * @type {number}
     * @memberof AsyncModerationConfigurationRequest
     */
    timeout_ms?: number;
}
/**
 * 
 * @export
 * @interface Attachment
 */
export interface Attachment {
    [key: string]: any | any;
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
     * Attachment type (e.g. image, video, url)
     * @type {string}
     * @memberof Attachment
     */
    type?: string;
}
/**
 * 
 * @export
 * @interface AttachmentRequest
 */
export interface AttachmentRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {Array<ActionRequest>}
     * @memberof AttachmentRequest
     */
    actions?: Array<ActionRequest>;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    asset_url?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    author_icon?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    author_link?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    author_name?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    color?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    fallback?: string;
    /**
     * 
     * @type {Array<FieldRequest>}
     * @memberof AttachmentRequest
     */
    fields?: Array<FieldRequest>;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    footer?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    footer_icon?: string;
    /**
     * 
     * @type {ImagesRequest}
     * @memberof AttachmentRequest
     */
    giphy?: ImagesRequest;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    image_url?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    og_scrape_url?: string;
    /**
     * 
     * @type {number}
     * @memberof AttachmentRequest
     */
    original_height?: number;
    /**
     * 
     * @type {number}
     * @memberof AttachmentRequest
     */
    original_width?: number;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    pretext?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    text?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    thumb_url?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachmentRequest
     */
    title_link?: string;
    /**
     * Attachment type (e.g. image, video, url)
     * @type {string}
     * @memberof AttachmentRequest
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
 * @interface BanRequest
 */
export interface BanRequest {
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof BanRequest
     */
    banned_by?: UserObjectRequest;
    /**
     * User ID who issued a ban
     * @type {string}
     * @memberof BanRequest
     */
    banned_by_id?: string;
    /**
     * Channel ID to ban user in
     * @type {string}
     * @memberof BanRequest
     */
    id?: string;
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
     * Channel type to ban user in
     * @type {string}
     * @memberof BanRequest
     */
    type?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof BanRequest
     */
    user?: UserObjectRequest;
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
     * @type {string}
     * @memberof BanResponse
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof BanResponse
     */
    expires?: string;
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
     * @type {string}
     * @memberof BlockList
     */
    created_at?: string;
    /**
     * Block list name
     * @type {string}
     * @memberof BlockList
     */
    name: string;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof BlockList
     */
    updated_at?: string;
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
    BLOCK: 'block'
} as const;
export type BlockListOptionsBehaviorEnum = typeof BlockListOptionsBehaviorEnum[keyof typeof BlockListOptionsBehaviorEnum];

/**
 * 
 * @export
 * @interface BlockListOptionsRequest
 */
export interface BlockListOptionsRequest {
    /**
     * 
     * @type {string}
     * @memberof BlockListOptionsRequest
     */
    behavior?: BlockListOptionsRequestBehaviorEnum;
    /**
     * 
     * @type {string}
     * @memberof BlockListOptionsRequest
     */
    blocklist?: string;
}


/**
 * @export
 */
export const BlockListOptionsRequestBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type BlockListOptionsRequestBehaviorEnum = typeof BlockListOptionsRequestBehaviorEnum[keyof typeof BlockListOptionsRequestBehaviorEnum];

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
 * @interface Call
 */
export interface Call {
    /**
     * 
     * @type {AgoraCall}
     * @memberof Call
     */
    agora?: AgoraCall;
    /**
     * 
     * @type {HMSCall}
     * @memberof Call
     */
    hms?: HMSCall;
    /**
     * 
     * @type {string}
     * @memberof Call
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Call
     */
    provider: string;
    /**
     * 
     * @type {string}
     * @memberof Call
     */
    type: string;
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
     * @type {string}
     * @memberof CallType
     */
    CreatedAt: string;
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
     * @type {string}
     * @memberof CallType
     */
    UpdatedAt: string;
}
/**
 * 
 * @export
 * @interface Channel
 */
export interface Channel {
    [key: string]: any | any;
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
    config?: ChannelConfig;
    /**
     * 
     * @type {ChannelConfig}
     * @memberof Channel
     */
    config_overrides?: ChannelConfig;
    /**
     * 
     * @type {number}
     * @memberof Channel
     */
    cooldown?: number;
    /**
     * 
     * @type {string}
     * @memberof Channel
     */
    created_at: string;
    /**
     * 
     * @type {UserObject}
     * @memberof Channel
     */
    created_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof Channel
     */
    deleted_at?: string;
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
     * @type {string}
     * @memberof Channel
     */
    last_message_at?: string;
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
     * @type {string}
     * @memberof Channel
     */
    updated_at: string;
}
/**
 * 
 * @export
 * @interface ChannelConfig
 */
export interface ChannelConfig {
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
     * @type {string}
     * @memberof ChannelConfig
     */
    created_at: string;
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
     * @type {string}
     * @memberof ChannelConfig
     */
    message_retention: string;
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
     * @type {string}
     * @memberof ChannelConfig
     */
    updated_at: string;
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
    BLOCK: 'block'
} as const;
export type ChannelConfigAutomodBehaviorEnum = typeof ChannelConfigAutomodBehaviorEnum[keyof typeof ChannelConfigAutomodBehaviorEnum];

/**
 * @export
 */
export const ChannelConfigBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type ChannelConfigBlocklistBehaviorEnum = typeof ChannelConfigBlocklistBehaviorEnum[keyof typeof ChannelConfigBlocklistBehaviorEnum];

/**
 * Channel configuration overrides
 * @export
 * @interface ChannelConfigRequest
 */
export interface ChannelConfigRequest {
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigRequest
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigRequest
     */
    blocklist_behavior?: ChannelConfigRequestBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof ChannelConfigRequest
     */
    commands?: Array<string>;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof ChannelConfigRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * Overrides max message length
     * @type {number}
     * @memberof ChannelConfigRequest
     */
    max_message_length?: number;
    /**
     * Enables message quotes
     * @type {boolean}
     * @memberof ChannelConfigRequest
     */
    quotes?: boolean;
    /**
     * Enables or disables reactions
     * @type {boolean}
     * @memberof ChannelConfigRequest
     */
    reactions?: boolean;
    /**
     * Enables message replies (threads)
     * @type {boolean}
     * @memberof ChannelConfigRequest
     */
    replies?: boolean;
    /**
     * Enables or disables typing events
     * @type {boolean}
     * @memberof ChannelConfigRequest
     */
    typing_events?: boolean;
    /**
     * Enables or disables file uploads
     * @type {boolean}
     * @memberof ChannelConfigRequest
     */
    uploads?: boolean;
    /**
     * Enables or disables URL enrichment
     * @type {boolean}
     * @memberof ChannelConfigRequest
     */
    url_enrichment?: boolean;
}


/**
 * @export
 */
export const ChannelConfigRequestBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type ChannelConfigRequestBlocklistBehaviorEnum = typeof ChannelConfigRequestBlocklistBehaviorEnum[keyof typeof ChannelConfigRequestBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface ChannelConfigWithInfo
 */
export interface ChannelConfigWithInfo {
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
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    created_at: string;
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
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    message_retention: string;
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
     * @type {string}
     * @memberof ChannelConfigWithInfo
     */
    updated_at: string;
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
    BLOCK: 'block'
} as const;
export type ChannelConfigWithInfoAutomodBehaviorEnum = typeof ChannelConfigWithInfoAutomodBehaviorEnum[keyof typeof ChannelConfigWithInfoAutomodBehaviorEnum];

/**
 * @export
 */
export const ChannelConfigWithInfoBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type ChannelConfigWithInfoBlocklistBehaviorEnum = typeof ChannelConfigWithInfoBlocklistBehaviorEnum[keyof typeof ChannelConfigWithInfoBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface ChannelConfigWithInfoRequest
 */
export interface ChannelConfigWithInfoRequest {
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    automod: ChannelConfigWithInfoRequestAutomodEnum;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    automod_behavior?: ChannelConfigWithInfoRequestAutomodBehaviorEnum;
    /**
     * 
     * @type {ThresholdsRequest}
     * @memberof ChannelConfigWithInfoRequest
     */
    automod_thresholds?: ThresholdsRequest;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    blocklist?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    blocklist_behavior?: ChannelConfigWithInfoRequestBlocklistBehaviorEnum;
    /**
     * 
     * @type {Array<BlockListOptionsRequest>}
     * @memberof ChannelConfigWithInfoRequest
     */
    blocklists?: Array<BlockListOptionsRequest>;
    /**
     * 
     * @type {Array<CommandRequest>}
     * @memberof ChannelConfigWithInfoRequest
     */
    commands?: Array<CommandRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    connect_events?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    created_at?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    custom_events?: boolean;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof ChannelConfigWithInfoRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    mark_messages_pending?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ChannelConfigWithInfoRequest
     */
    max_message_length?: number;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    message_retention?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    mutes?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    push_notifications?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    quotes?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    reactions?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    read_events?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    reminders?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    replies?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    search?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    typing_events?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelConfigWithInfoRequest
     */
    updated_at?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    uploads?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelConfigWithInfoRequest
     */
    url_enrichment?: boolean;
}


/**
 * @export
 */
export const ChannelConfigWithInfoRequestAutomodEnum = {
    DISABLED: 'disabled',
    SIMPLE: 'simple',
    AI: 'AI'
} as const;
export type ChannelConfigWithInfoRequestAutomodEnum = typeof ChannelConfigWithInfoRequestAutomodEnum[keyof typeof ChannelConfigWithInfoRequestAutomodEnum];

/**
 * @export
 */
export const ChannelConfigWithInfoRequestAutomodBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type ChannelConfigWithInfoRequestAutomodBehaviorEnum = typeof ChannelConfigWithInfoRequestAutomodBehaviorEnum[keyof typeof ChannelConfigWithInfoRequestAutomodBehaviorEnum];

/**
 * @export
 */
export const ChannelConfigWithInfoRequestBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type ChannelConfigWithInfoRequestBlocklistBehaviorEnum = typeof ChannelConfigWithInfoRequestBlocklistBehaviorEnum[keyof typeof ChannelConfigWithInfoRequestBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface ChannelCreatedEvent
 */
export interface ChannelCreatedEvent {
    /**
     * 
     * @type {string}
     * @memberof ChannelCreatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelCreatedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelDeletedEvent
 */
export interface ChannelDeletedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelDeletedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ChannelDeletedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelDeletedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelDeletedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelDeletedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelDeletedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelDeletedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelExportRequest
 */
export interface ChannelExportRequest {
    /**
     * 
     * @type {string}
     * @memberof ChannelExportRequest
     */
    cid?: string;
    /**
     * Channel ID
     * @type {string}
     * @memberof ChannelExportRequest
     */
    id?: string;
    /**
     * Date to export messages since
     * @type {string}
     * @memberof ChannelExportRequest
     */
    messages_since?: string;
    /**
     * Date to export messages until
     * @type {string}
     * @memberof ChannelExportRequest
     */
    messages_until?: string;
    /**
     * Channel type
     * @type {string}
     * @memberof ChannelExportRequest
     */
    type?: string;
}
/**
 * 
 * @export
 * @interface ChannelFrozenEvent
 */
export interface ChannelFrozenEvent {
    /**
     * 
     * @type {string}
     * @memberof ChannelFrozenEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelFrozenEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelFrozenEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelFrozenEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelFrozenEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelGetOrCreateRequest
 */
export interface ChannelGetOrCreateRequest {
    /**
     * 
     * @type {ChannelRequest}
     * @memberof ChannelGetOrCreateRequest
     */
    data?: ChannelRequest;
    /**
     * Whether this channel will be hidden for the user who created the channel or not
     * @type {boolean}
     * @memberof ChannelGetOrCreateRequest
     */
    hide_for_creator?: boolean;
    /**
     * 
     * @type {PaginationParamsRequest}
     * @memberof ChannelGetOrCreateRequest
     */
    members?: PaginationParamsRequest;
    /**
     * 
     * @type {MessagePaginationParamsRequest}
     * @memberof ChannelGetOrCreateRequest
     */
    messages?: MessagePaginationParamsRequest;
    /**
     * Refresh channel state
     * @type {boolean}
     * @memberof ChannelGetOrCreateRequest
     */
    state?: boolean;
    /**
     * 
     * @type {PaginationParamsRequest}
     * @memberof ChannelGetOrCreateRequest
     */
    watchers?: PaginationParamsRequest;
}
/**
 * 
 * @export
 * @interface ChannelHiddenEvent
 */
export interface ChannelHiddenEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelHiddenEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ChannelHiddenEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelHiddenEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelHiddenEvent
     */
    cid: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelHiddenEvent
     */
    clear_history: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelHiddenEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelHiddenEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelHiddenEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ChannelKickedEvent
 */
export interface ChannelKickedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelKickedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ChannelKickedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelKickedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelKickedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelKickedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelKickedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelMember
 */
export interface ChannelMember {
    /**
     * Expiration date of the ban
     * @type {string}
     * @memberof ChannelMember
     */
    ban_expires?: string;
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
     * @type {string}
     * @memberof ChannelMember
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelMember
     */
    deleted_at?: string;
    /**
     * Date when invite was accepted
     * @type {string}
     * @memberof ChannelMember
     */
    invite_accepted_at?: string;
    /**
     * Date when invite was rejected
     * @type {string}
     * @memberof ChannelMember
     */
    invite_rejected_at?: string;
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
     * Permission level of the member in the channel (DEPRECATED: use channel_role instead)
     * @type {string}
     * @memberof ChannelMember
     */
    role?: ChannelMemberRoleEnum;
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
     * @type {string}
     * @memberof ChannelMember
     */
    updated_at: string;
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
 * @export
 */
export const ChannelMemberRoleEnum = {
    MEMBER: 'member',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    OWNER: 'owner'
} as const;
export type ChannelMemberRoleEnum = typeof ChannelMemberRoleEnum[keyof typeof ChannelMemberRoleEnum];

/**
 * 
 * @export
 * @interface ChannelMemberRequest
 */
export interface ChannelMemberRequest {
    /**
     * Expiration date of the ban
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    ban_expires?: string;
    /**
     * Whether member is banned this channel or not
     * @type {boolean}
     * @memberof ChannelMemberRequest
     */
    banned?: boolean;
    /**
     * Role of the member in the channel
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    channel_role?: string;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    deleted_at?: string;
    /**
     * Date when invite was accepted
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    invite_accepted_at?: string;
    /**
     * Date when invite was rejected
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    invite_rejected_at?: string;
    /**
     * Whether member was invited or not
     * @type {boolean}
     * @memberof ChannelMemberRequest
     */
    invited?: boolean;
    /**
     * Whether member is channel moderator or not
     * @type {boolean}
     * @memberof ChannelMemberRequest
     */
    is_moderator?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelMemberRequest
     */
    notifications_muted?: boolean;
    /**
     * Permission level of the member in the channel (DEPRECATED: use channel_role instead)
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    role?: ChannelMemberRequestRoleEnum;
    /**
     * Whether member is shadow banned in this channel or not
     * @type {boolean}
     * @memberof ChannelMemberRequest
     */
    shadow_banned?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    status?: string;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    updated_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof ChannelMemberRequest
     */
    user?: UserObjectRequest;
    /**
     * 
     * @type {string}
     * @memberof ChannelMemberRequest
     */
    user_id?: string;
}


/**
 * @export
 */
export const ChannelMemberRequestRoleEnum = {
    MEMBER: 'member',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    OWNER: 'owner'
} as const;
export type ChannelMemberRequestRoleEnum = typeof ChannelMemberRequestRoleEnum[keyof typeof ChannelMemberRequestRoleEnum];

/**
 * 
 * @export
 * @interface ChannelMessages
 */
export interface ChannelMessages {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelMessages
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {Array<Message>}
     * @memberof ChannelMessages
     */
    messages: Array<Message>;
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
     * @type {string}
     * @memberof ChannelMute
     */
    created_at: string;
    /**
     * Date/time of mute expiration
     * @type {string}
     * @memberof ChannelMute
     */
    expires?: string;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof ChannelMute
     */
    updated_at: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelMute
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ChannelMuteRequest
 */
export interface ChannelMuteRequest {
    /**
     * 
     * @type {ChannelResponseRequest}
     * @memberof ChannelMuteRequest
     */
    channel?: ChannelResponseRequest;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof ChannelMuteRequest
     */
    created_at?: string;
    /**
     * Date/time of mute expiration
     * @type {string}
     * @memberof ChannelMuteRequest
     */
    expires?: string;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof ChannelMuteRequest
     */
    updated_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof ChannelMuteRequest
     */
    user?: UserObjectRequest;
}
/**
 * 
 * @export
 * @interface ChannelMutedEvent
 */
export interface ChannelMutedEvent {
    /**
     * 
     * @type {string}
     * @memberof ChannelMutedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelMutedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelRequest
 */
export interface ChannelRequest {
    [key: string]: any | any;
    /**
     * Enable or disable auto translation
     * @type {boolean}
     * @memberof ChannelRequest
     */
    auto_translation_enabled?: boolean;
    /**
     * Switch auto translation language
     * @type {string}
     * @memberof ChannelRequest
     */
    auto_translation_language?: string;
    /**
     * 
     * @type {ChannelConfigRequest}
     * @memberof ChannelRequest
     */
    config_overrides?: ChannelConfigRequest;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelRequest
     */
    disabled?: boolean;
    /**
     * Freeze or unfreeze the channel
     * @type {boolean}
     * @memberof ChannelRequest
     */
    frozen?: boolean;
    /**
     * 
     * @type {Array<ChannelMemberRequest>}
     * @memberof ChannelRequest
     */
    members?: Array<ChannelMemberRequest>;
    /**
     * 
     * @type {Array<number>}
     * @memberof ChannelRequest
     */
    own_capabilities?: Array<number>;
    /**
     * Team the channel belongs to (if multi-tenant mode is enabled)
     * @type {string}
     * @memberof ChannelRequest
     */
    team?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof ChannelRequest
     */
    truncated_at?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof ChannelRequest
     */
    truncated_by?: Array<number>;
    /**
     * 
     * @type {string}
     * @memberof ChannelRequest
     */
    truncated_by_id?: string;
}
/**
 * Represents channel in chat
 * @export
 * @interface ChannelResponse
 */
export interface ChannelResponse {
    [key: string]: any | any;
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
     * @type {string}
     * @memberof ChannelResponse
     */
    created_at?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelResponse
     */
    created_by?: UserObject;
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof ChannelResponse
     */
    deleted_at?: string;
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
     * @type {string}
     * @memberof ChannelResponse
     */
    hide_messages_before?: string;
    /**
     * Channel unique ID
     * @type {string}
     * @memberof ChannelResponse
     */
    id: string;
    /**
     * Date of the last message sent
     * @type {string}
     * @memberof ChannelResponse
     */
    last_message_at?: string;
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
     * @type {string}
     * @memberof ChannelResponse
     */
    mute_expires_at?: string;
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
     * @type {string}
     * @memberof ChannelResponse
     */
    truncated_at?: string;
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
     * @type {string}
     * @memberof ChannelResponse
     */
    updated_at?: string;
}
/**
 * Represents channel in chat
 * @export
 * @interface ChannelResponseRequest
 */
export interface ChannelResponseRequest {
    [key: string]: any | any;
    /**
     * Whether auto translation is enabled or not
     * @type {boolean}
     * @memberof ChannelResponseRequest
     */
    auto_translation_enabled?: boolean;
    /**
     * Language to translate to when auto translation is active
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    auto_translation_language?: string;
    /**
     * Channel CID (<type>:<id>)
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    cid?: string;
    /**
     * 
     * @type {ChannelConfigWithInfoRequest}
     * @memberof ChannelResponseRequest
     */
    config?: ChannelConfigWithInfoRequest;
    /**
     * Cooldown period after sending each message
     * @type {number}
     * @memberof ChannelResponseRequest
     */
    cooldown?: number;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    created_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof ChannelResponseRequest
     */
    created_by?: UserObjectRequest;
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    deleted_at?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ChannelResponseRequest
     */
    disabled?: boolean;
    /**
     * Whether channel is frozen or not
     * @type {boolean}
     * @memberof ChannelResponseRequest
     */
    frozen?: boolean;
    /**
     * Whether this channel is hidden by current user or not
     * @type {boolean}
     * @memberof ChannelResponseRequest
     */
    hidden?: boolean;
    /**
     * Date since when the message history is accessible
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    hide_messages_before?: string;
    /**
     * Channel unique ID
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    id?: string;
    /**
     * Date of the last message sent
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    last_message_at?: string;
    /**
     * Number of members in the channel
     * @type {number}
     * @memberof ChannelResponseRequest
     */
    member_count?: number;
    /**
     * List of channel members (max 100)
     * @type {Array<ChannelMemberRequest>}
     * @memberof ChannelResponseRequest
     */
    members?: Array<ChannelMemberRequest>;
    /**
     * Date of mute expiration
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    mute_expires_at?: string;
    /**
     * Whether this channel is muted or not
     * @type {boolean}
     * @memberof ChannelResponseRequest
     */
    muted?: boolean;
    /**
     * List of channel capabilities of authenticated user
     * @type {Array<string>}
     * @memberof ChannelResponseRequest
     */
    own_capabilities?: Array<string>;
    /**
     * Team the channel belongs to (multi-tenant only)
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    team?: string;
    /**
     * Date of the latest truncation of the channel
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    truncated_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof ChannelResponseRequest
     */
    truncated_by?: UserObjectRequest;
    /**
     * Type of the channel
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    type?: string;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof ChannelResponseRequest
     */
    updated_at?: string;
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
     * @type {string}
     * @memberof ChannelStateResponse
     */
    hide_messages_before?: string;
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
     * @type {Array<Message>}
     * @memberof ChannelStateResponse
     */
    messages: Array<Message>;
    /**
     * 
     * @type {Array<PendingMessage>}
     * @memberof ChannelStateResponse
     */
    pending_messages?: Array<PendingMessage>;
    /**
     * 
     * @type {Array<Message>}
     * @memberof ChannelStateResponse
     */
    pinned_messages: Array<Message>;
    /**
     * 
     * @type {Array<Read>}
     * @memberof ChannelStateResponse
     */
    read?: Array<Read>;
    /**
     * 
     * @type {number}
     * @memberof ChannelStateResponse
     */
    watcher_count?: number;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof ChannelStateResponse
     */
    watchers?: Array<UserObject>;
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
     * @type {string}
     * @memberof ChannelStateResponseFields
     */
    hide_messages_before?: string;
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
     * @type {Array<Message>}
     * @memberof ChannelStateResponseFields
     */
    messages: Array<Message>;
    /**
     * Pending messages that this user has sent
     * @type {Array<PendingMessage>}
     * @memberof ChannelStateResponseFields
     */
    pending_messages?: Array<PendingMessage>;
    /**
     * List of pinned messages in the channel
     * @type {Array<Message>}
     * @memberof ChannelStateResponseFields
     */
    pinned_messages: Array<Message>;
    /**
     * List of read states
     * @type {Array<Read>}
     * @memberof ChannelStateResponseFields
     */
    read?: Array<Read>;
    /**
     * Number of channel watchers
     * @type {number}
     * @memberof ChannelStateResponseFields
     */
    watcher_count?: number;
    /**
     * List of user who is watching the channel
     * @type {Array<UserObject>}
     * @memberof ChannelStateResponseFields
     */
    watchers?: Array<UserObject>;
}
/**
 * 
 * @export
 * @interface ChannelTruncatedEvent
 */
export interface ChannelTruncatedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelTruncatedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ChannelTruncatedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelTruncatedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelTruncatedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelTruncatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelTruncatedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelTypeConfig
 */
export interface ChannelTypeConfig {
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
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    created_at: string;
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
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    message_retention: string;
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
     * @type {Array<PolicyRequest1>}
     * @memberof ChannelTypeConfig
     */
    permissions: Array<PolicyRequest1>;
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
     * @type {string}
     * @memberof ChannelTypeConfig
     */
    updated_at: string;
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
    BLOCK: 'block'
} as const;
export type ChannelTypeConfigAutomodBehaviorEnum = typeof ChannelTypeConfigAutomodBehaviorEnum[keyof typeof ChannelTypeConfigAutomodBehaviorEnum];

/**
 * @export
 */
export const ChannelTypeConfigBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type ChannelTypeConfigBlocklistBehaviorEnum = typeof ChannelTypeConfigBlocklistBehaviorEnum[keyof typeof ChannelTypeConfigBlocklistBehaviorEnum];

/**
 * 
 * @export
 * @interface ChannelUnFrozenEvent
 */
export interface ChannelUnFrozenEvent {
    /**
     * 
     * @type {string}
     * @memberof ChannelUnFrozenEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUnFrozenEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUnFrozenEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUnFrozenEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUnFrozenEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelUnmutedEvent
 */
export interface ChannelUnmutedEvent {
    /**
     * 
     * @type {string}
     * @memberof ChannelUnmutedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUnmutedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface ChannelUpdatedEvent
 */
export interface ChannelUpdatedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof ChannelUpdatedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof ChannelUpdatedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUpdatedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUpdatedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof ChannelUpdatedEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof ChannelUpdatedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelUpdatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelUpdatedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ChannelVisibleEvent
 */
export interface ChannelVisibleEvent {
    /**
     * 
     * @type {string}
     * @memberof ChannelVisibleEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelVisibleEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelVisibleEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelVisibleEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelVisibleEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ChannelVisibleEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ChannelsResponse
 */
export interface ChannelsResponse {
    /**
     * List of channels
     * @type {Array<ChannelStateResponseFields>}
     * @memberof ChannelsResponse
     */
    channels: Array<ChannelStateResponseFields>;
    /**
     * 
     * @type {string}
     * @memberof ChannelsResponse
     */
    duration: string;
}
/**
 * @type ChatEvent
 * The discriminator object for all websocket events, you should use this to map event payloads to their own type
 * @export
 */
export type ChatEvent = { type: 'any' } & AnyEvent | { type: 'channel.created' } & ChannelCreatedEvent | { type: 'channel.deleted' } & ChannelDeletedEvent | { type: 'channel.frozen' } & ChannelFrozenEvent | { type: 'channel.hidden' } & ChannelHiddenEvent | { type: 'channel.kicked' } & ChannelKickedEvent | { type: 'channel.muted' } & ChannelMutedEvent | { type: 'channel.truncated' } & ChannelTruncatedEvent | { type: 'channel.unfrozen' } & ChannelUnFrozenEvent | { type: 'channel.unmuted' } & ChannelUnmutedEvent | { type: 'channel.updated' } & ChannelUpdatedEvent | { type: 'channel.visible' } & ChannelVisibleEvent | { type: 'custom' } & AnyEvent | { type: 'flag.updated' } & FlagUpdatedEvent | { type: 'health.check' } & HealthCheckEvent | { type: 'member.added' } & MemberAddedEvent | { type: 'member.removed' } & MemberRemovedEvent | { type: 'member.updated' } & MemberUpdatedEvent | { type: 'message.deleted' } & MessageDeletedEvent | { type: 'message.flagged' } & MessageFlaggedEvent | { type: 'message.new' } & MessageNewEvent | { type: 'message.read' } & MessageReadEvent | { type: 'message.unblocked' } & MessageUnblockedEvent | { type: 'message.updated' } & MessageUpdatedEvent | { type: 'notification.added_to_channel' } & NotificationAddedToChannelEvent | { type: 'notification.channel_deleted' } & NotificationChannelDeletedEvent | { type: 'notification.channel_mutes_updated' } & NotificationChannelMutesUpdatedEvent | { type: 'notification.channel_truncated' } & NotificationChannelTruncatedEvent | { type: 'notification.invite_accepted' } & NotificationInviteAcceptedEvent | { type: 'notification.invite_rejected' } & NotificationInviteRejectedEvent | { type: 'notification.invited' } & NotificationInvitedEvent | { type: 'notification.mark_read' } & NotificationMarkReadEvent | { type: 'notification.mark_unread' } & NotificationMarkUnreadEvent | { type: 'notification.message_new' } & NotificationNewMessageEvent | { type: 'notification.mutes_updated' } & NotificationMutesUpdatedEvent | { type: 'notification.removed_from_channel' } & NotificationRemovedFromChannelEvent | { type: 'reaction.deleted' } & ReactionDeletedEvent | { type: 'reaction.new' } & ReactionNewEvent | { type: 'reaction.updated' } & ReactionUpdatedEvent | { type: 'typing.start' } & TypingStartEvent | { type: 'typing.stop' } & TypingStopEvent | { type: 'user.banned' } & UserBannedEvent | { type: 'user.deactivated' } & UserDeactivatedEvent | { type: 'user.deleted' } & UserDeletedEvent | { type: 'user.flagged' } & UserFlaggedEvent | { type: 'user.muted' } & UserMutedEvent | { type: 'user.presence.changed' } & UserPresenceChangedEvent | { type: 'user.reactivated' } & UserReactivatedEvent | { type: 'user.unbanned' } & UserUnbannedEvent | { type: 'user.unmuted' } & UserUnmutedEvent | { type: 'user.unread_message_reminder' } & UserUnreadReminderEvent | { type: 'user.updated' } & UserUpdatedEvent | { type: 'user.watching.start' } & UserWatchingStartEvent | { type: 'user.watching.stop' } & UserWatchingStopEvent;
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
     * @type {UserObjectRequest}
     * @memberof CheckPushRequest
     */
    user?: UserObjectRequest;
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
     * @type {string}
     * @memberof Command
     */
    readonly created_at?: string;
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
     * @type {string}
     * @memberof Command
     */
    readonly updated_at?: string;
}
/**
 * Represents custom chat command
 * @export
 * @interface CommandRequest
 */
export interface CommandRequest {
    /**
     * Arguments help text, shown in commands auto-completion
     * @type {string}
     * @memberof CommandRequest
     */
    args?: string;
    /**
     * Description, shown in commands auto-completion
     * @type {string}
     * @memberof CommandRequest
     */
    description?: string;
    /**
     * Unique command name
     * @type {string}
     * @memberof CommandRequest
     */
    name?: string;
    /**
     * Set name used for grouping commands
     * @type {string}
     * @memberof CommandRequest
     */
    set?: string;
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
 * @interface ConfigRequest
 */
export interface ConfigRequest {
    /**
     * 
     * @type {string}
     * @memberof ConfigRequest
     */
    app_certificate: string;
    /**
     * 
     * @type {string}
     * @memberof ConfigRequest
     */
    app_id: string;
    /**
     * 
     * @type {string}
     * @memberof ConfigRequest
     */
    default_role?: ConfigRequestDefaultRoleEnum;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ConfigRequest
     */
    role_map?: { [key: string]: string; };
}


/**
 * @export
 */
export const ConfigRequestDefaultRoleEnum = {
    ATTENDEE: 'attendee',
    PUBLISHER: 'publisher',
    SUBSCRIBER: 'subscriber',
    ADMIN: 'admin'
} as const;
export type ConfigRequestDefaultRoleEnum = typeof ConfigRequestDefaultRoleEnum[keyof typeof ConfigRequestDefaultRoleEnum];

/**
 * 
 * @export
 * @interface ConnectRequest
 */
export interface ConnectRequest {
    /**
     * 
     * @type {DeviceFields}
     * @memberof ConnectRequest
     */
    device?: DeviceFields;
    /**
     * 
     * @type {UserObject}
     * @memberof ConnectRequest
     */
    user_details: UserObject;
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
     * List of words to block
     * @type {Array<string>}
     * @memberof CreateBlockListRequest
     */
    words: Array<string>;
}
/**
 * 
 * @export
 * @interface CreateCallRequest
 */
export interface CreateCallRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateCallRequest
     */
    id: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof CreateCallRequest
     */
    options?: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof CreateCallRequest
     */
    type: CreateCallRequestTypeEnum;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof CreateCallRequest
     */
    user?: UserObjectRequest;
    /**
     * **Server-side only**. User ID which server acts upon
     * @type {string}
     * @memberof CreateCallRequest
     */
    user_id?: string;
}


/**
 * @export
 */
export const CreateCallRequestTypeEnum = {
    AUDIO: 'audio',
    VIDEO: 'video'
} as const;
export type CreateCallRequestTypeEnum = typeof CreateCallRequestTypeEnum[keyof typeof CreateCallRequestTypeEnum];

/**
 * 
 * @export
 * @interface CreateCallResponse
 */
export interface CreateCallResponse {
    /**
     * 
     * @type {string}
     * @memberof CreateCallResponse
     */
    agora_app_id?: string;
    /**
     * 
     * @type {number}
     * @memberof CreateCallResponse
     */
    agora_uid?: number;
    /**
     * 
     * @type {Call}
     * @memberof CreateCallResponse
     */
    call?: Call;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof CreateCallResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCallResponse
     */
    token: string;
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
    automod_behavior?: CreateChannelTypeRequestAutomodBehaviorEnum;
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
     * @type {{ [key: string]: BlockListOptionsRequest; }}
     * @memberof CreateChannelTypeRequest
     */
    blocklists?: { [key: string]: BlockListOptionsRequest; };
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
    max_message_length?: number;
    /**
     * Number of days to keep messages. 'infinite' disables retention
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
    BLOCK: 'block'
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
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    created_at: string;
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
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    message_retention: string;
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
     * @type {Array<PolicyRequest1>}
     * @memberof CreateChannelTypeResponse
     */
    permissions: Array<PolicyRequest1>;
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
     * @type {string}
     * @memberof CreateChannelTypeResponse
     */
    updated_at: string;
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
    BLOCK: 'block'
} as const;
export type CreateChannelTypeResponseAutomodBehaviorEnum = typeof CreateChannelTypeResponseAutomodBehaviorEnum[keyof typeof CreateChannelTypeResponseAutomodBehaviorEnum];

/**
 * @export
 */
export const CreateChannelTypeResponseBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
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
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    push_provider?: CreateDeviceRequestPushProviderEnum;
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
 * @interface CreateImportRequest
 */
export interface CreateImportRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateImportRequest
     */
    mode?: CreateImportRequestModeEnum;
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
    api_key: string;
    /**
     * 
     * @type {string}
     * @memberof DataDogInfo
     */
    site: string;
}
/**
 * 
 * @export
 * @interface DataDogInfoRequest
 */
export interface DataDogInfoRequest {
    /**
     * 
     * @type {string}
     * @memberof DataDogInfoRequest
     */
    api_key?: string;
    /**
     * 
     * @type {string}
     * @memberof DataDogInfoRequest
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
    /**
     * 
     * @type {string}
     * @memberof DeactivateUserRequest
     */
    user_id: string;
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
    cids?: Array<string>;
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
 * @interface DeleteUserResponse
 */
export interface DeleteUserResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof DeleteUserResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof DeleteUserResponse
     */
    task_id: string;
    /**
     * 
     * @type {UserObject}
     * @memberof DeleteUserResponse
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface DeleteUsersRequest
 */
export interface DeleteUsersRequest {
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
     * @type {string}
     * @memberof Device
     */
    created_at: string;
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
 * @interface DeviceFields
 */
export interface DeviceFields {
    /**
     * Device ID
     * @type {string}
     * @memberof DeviceFields
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof DeviceFields
     */
    push_provider: DeviceFieldsPushProviderEnum;
    /**
     * Name of the push provider configuration
     * @type {string}
     * @memberof DeviceFields
     */
    push_provider_name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DeviceFields
     */
    voip?: boolean;
}


/**
 * @export
 */
export const DeviceFieldsPushProviderEnum = {
    FIREBASE: 'firebase',
    APN: 'apn',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi'
} as const;
export type DeviceFieldsPushProviderEnum = typeof DeviceFieldsPushProviderEnum[keyof typeof DeviceFieldsPushProviderEnum];

/**
 * 
 * @export
 * @interface DeviceRequest
 */
export interface DeviceRequest {
    /**
     * 
     * @type {string}
     * @memberof DeviceRequest
     */
    created_at?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DeviceRequest
     */
    disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof DeviceRequest
     */
    disabled_reason?: string;
    /**
     * Device ID
     * @type {string}
     * @memberof DeviceRequest
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof DeviceRequest
     */
    push_provider: DeviceRequestPushProviderEnum;
    /**
     * Name of the push provider configuration
     * @type {string}
     * @memberof DeviceRequest
     */
    push_provider_name?: string;
    /**
     * 
     * @type {string}
     * @memberof DeviceRequest
     */
    user_id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DeviceRequest
     */
    voip?: boolean;
}


/**
 * @export
 */
export const DeviceRequestPushProviderEnum = {
    FIREBASE: 'firebase',
    APN: 'apn',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi'
} as const;
export type DeviceRequestPushProviderEnum = typeof DeviceRequestPushProviderEnum[keyof typeof DeviceRequestPushProviderEnum];

/**
 * 
 * @export
 * @interface ErrorResult
 */
export interface ErrorResult {
    /**
     * 
     * @type {any}
     * @memberof ErrorResult
     */
    description: any | null;
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
 * Represents an BaseEvent that happened in Stream Chat
 * @export
 * @interface Event
 */
export interface Event {
    [key: string]: any | any;
    /**
     * Only applicable to `message.flagged` BaseEvent.
     * @type {boolean}
     * @memberof Event
     */
    automoderation?: boolean;
    /**
     * 
     * @type {ModerationResponse}
     * @memberof Event
     */
    automoderation_scores?: ModerationResponse;
    /**
     * 
     * @type {ChannelResponse}
     * @memberof Event
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    channel_id?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    channel_type?: string;
    /**
     * Channel CID (<type>:<id>)
     * @type {string}
     * @memberof Event
     */
    cid?: string;
    /**
     * Only applicable to `health.check` BaseEvent
     * @type {string}
     * @memberof Event
     */
    connection_id?: string;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof Event
     */
    created_at: string;
    /**
     * 
     * @type {UserObject}
     * @memberof Event
     */
    created_by?: UserObject;
    /**
     * 
     * @type {OwnUser}
     * @memberof Event
     */
    me?: OwnUser;
    /**
     * 
     * @type {ChannelMember}
     * @memberof Event
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {Message}
     * @memberof Event
     */
    message?: Message | null;
    /**
     * ID of thread. Used in typing events
     * @type {string}
     * @memberof Event
     */
    parent_id?: string;
    /**
     * 
     * @type {Reaction}
     * @memberof Event
     */
    reaction?: Reaction | null;
    /**
     * Ban reason. Only applicable to `user.banned` BaseEvent
     * @type {string}
     * @memberof Event
     */
    reason?: string;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    team?: string;
    /**
     * Event type. To use custom BaseEvent types see Custom Events documentation
     * @type {string}
     * @memberof Event
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof Event
     */
    user?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    user_id?: string;
    /**
     * Number of watchers who received this BaseEvent
     * @type {number}
     * @memberof Event
     */
    watcher_count?: number;
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
 * Represents an BaseEvent that happened in Stream Chat
 * @export
 * @interface EventRequest
 */
export interface EventRequest {
    [key: string]: any | any;
    /**
     * Only applicable to `message.flagged` BaseEvent.
     * @type {boolean}
     * @memberof EventRequest
     */
    automoderation?: boolean;
    /**
     * 
     * @type {ModerationResponseRequest}
     * @memberof EventRequest
     */
    automoderation_scores?: ModerationResponseRequest;
    /**
     * 
     * @type {ChannelResponseRequest}
     * @memberof EventRequest
     */
    channel?: ChannelResponseRequest;
    /**
     * 
     * @type {string}
     * @memberof EventRequest
     */
    channel_id?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRequest
     */
    channel_type?: string;
    /**
     * Channel CID (<type>:<id>)
     * @type {string}
     * @memberof EventRequest
     */
    cid?: string;
    /**
     * Only applicable to `health.check` BaseEvent
     * @type {string}
     * @memberof EventRequest
     */
    connection_id?: string;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof EventRequest
     */
    created_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof EventRequest
     */
    created_by?: UserObjectRequest;
    /**
     * 
     * @type {OwnUserRequest}
     * @memberof EventRequest
     */
    me?: OwnUserRequest;
    /**
     * 
     * @type {ChannelMemberRequest}
     * @memberof EventRequest
     */
    member?: ChannelMemberRequest | null;
    /**
     * 
     * @type {MessageRequest1}
     * @memberof EventRequest
     */
    message?: MessageRequest1;
    /**
     * ID of thread. Used in typing events
     * @type {string}
     * @memberof EventRequest
     */
    parent_id?: string;
    /**
     * 
     * @type {ReactionRequest}
     * @memberof EventRequest
     */
    reaction?: ReactionRequest | null;
    /**
     * Ban reason. Only applicable to `user.banned` BaseEvent
     * @type {string}
     * @memberof EventRequest
     */
    reason?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRequest
     */
    team?: string;
    /**
     * Event type. To use custom BaseEvent types see Custom Events documentation
     * @type {string}
     * @memberof EventRequest
     */
    type: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof EventRequest
     */
    user?: UserObjectRequest;
    /**
     * 
     * @type {string}
     * @memberof EventRequest
     */
    user_id?: string;
    /**
     * Number of watchers who received this BaseEvent
     * @type {number}
     * @memberof EventRequest
     */
    watcher_count?: number;
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
     * @type {Event}
     * @memberof EventResponse
     */
    event?: Event;
}
/**
 * 
 * @export
 * @interface ExportChannelsRequest
 */
export interface ExportChannelsRequest {
    /**
     * Export options for channels
     * @type {Array<ChannelExportRequest>}
     * @memberof ExportChannelsRequest
     */
    channels?: Array<ChannelExportRequest>;
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
 * @interface FieldRequest
 */
export interface FieldRequest {
    /**
     * 
     * @type {boolean}
     * @memberof FieldRequest
     */
    _short?: boolean;
    /**
     * 
     * @type {string}
     * @memberof FieldRequest
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof FieldRequest
     */
    value?: string;
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
    allowed_file_extensions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfig
     */
    allowed_mime_types: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfig
     */
    blocked_file_extensions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfig
     */
    blocked_mime_types: Array<string>;
}
/**
 * 
 * @export
 * @interface FileUploadConfigRequest
 */
export interface FileUploadConfigRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfigRequest
     */
    allowed_file_extensions?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfigRequest
     */
    allowed_mime_types?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfigRequest
     */
    blocked_file_extensions?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof FileUploadConfigRequest
     */
    blocked_mime_types?: Array<string>;
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
 * 
 * @export
 * @interface FirebaseConfigRequest
 */
export interface FirebaseConfigRequest {
    /**
     * 
     * @type {boolean}
     * @memberof FirebaseConfigRequest
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigRequest
     */
    apn_template?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigRequest
     */
    credentials_json?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigRequest
     */
    data_template?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigRequest
     */
    notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof FirebaseConfigRequest
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
     * @type {string}
     * @memberof Flag
     */
    approved_at?: string;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof Flag
     */
    created_at: string;
    /**
     * 
     * @type {boolean}
     * @memberof Flag
     */
    created_by_automod: boolean;
    /**
     * 
     * @type {FlagDetails}
     * @memberof Flag
     */
    details?: FlagDetails;
    /**
     * Date of the rejection
     * @type {string}
     * @memberof Flag
     */
    rejected_at?: string;
    /**
     * Date of the review
     * @type {string}
     * @memberof Flag
     */
    reviewed_at?: string;
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
     * @type {string}
     * @memberof Flag
     */
    updated_at: string;
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
    [key: string]: any | any;
    /**
     * 
     * @type {AutomodDetails}
     * @memberof FlagDetails
     */
    automod?: AutomodDetails;
}
/**
 * 
 * @export
 * @interface FlagFeedback
 */
export interface FlagFeedback {
    /**
     * 
     * @type {string}
     * @memberof FlagFeedback
     */
    created_at: string;
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
     * ID of the message when reporting a message
     * @type {string}
     * @memberof FlagRequest
     */
    target_message_id?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof FlagRequest
     */
    user?: UserObjectRequest;
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
 * @interface FlagUpdatedEvent
 */
export interface FlagUpdatedEvent {
    /**
     * 
     * @type {UserObject}
     * @memberof FlagUpdatedEvent
     */
    CreatedBy?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof FlagUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof FlagUpdatedEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof FlagUpdatedEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof FlagUpdatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof FlagUpdatedEvent
     */
    user?: UserObject;
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
 * @interface GetApplicationResponse
 */
export interface GetApplicationResponse {
    /**
     * 
     * @type {App}
     * @memberof GetApplicationResponse
     */
    app: App;
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
    blocklist?: BlockList;
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
 * @interface GetCallTokenRequest
 */
export interface GetCallTokenRequest {
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof GetCallTokenRequest
     */
    user?: UserObjectRequest;
    /**
     * **Server-side only**. User ID which server acts upon
     * @type {string}
     * @memberof GetCallTokenRequest
     */
    user_id?: string;
}
/**
 * 
 * @export
 * @interface GetCallTokenResponse
 */
export interface GetCallTokenResponse {
    /**
     * 
     * @type {string}
     * @memberof GetCallTokenResponse
     */
    agora_app_id?: string;
    /**
     * 
     * @type {number}
     * @memberof GetCallTokenResponse
     */
    agora_uid?: number;
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof GetCallTokenResponse
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof GetCallTokenResponse
     */
    token: string;
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
     * @type {string}
     * @memberof GetCommandResponse
     */
    readonly created_at?: string;
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
     * @type {string}
     * @memberof GetCommandResponse
     */
    readonly updated_at?: string;
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
 * @interface GetExportChannelsStatusResponse
 */
export interface GetExportChannelsStatusResponse {
    /**
     * 
     * @type {string}
     * @memberof GetExportChannelsStatusResponse
     */
    created_at: string;
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
     * @type {string}
     * @memberof GetExportChannelsStatusResponse
     */
    updated_at: string;
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
 * @interface GetOGResponse
 */
export interface GetOGResponse {
    [key: string]: any | any;
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
     * 
     * @type {string}
     * @memberof GetRepliesResponse
     */
    duration: string;
    /**
     * List of messages
     * @type {Array<Message>}
     * @memberof GetRepliesResponse
     */
    messages: Array<Message>;
}
/**
 * 
 * @export
 * @interface GetTaskResponse
 */
export interface GetTaskResponse {
    /**
     * 
     * @type {string}
     * @memberof GetTaskResponse
     */
    created_at: string;
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
     * @type {string}
     * @memberof GetTaskResponse
     */
    updated_at: string;
}
/**
 * 
 * @export
 * @interface GuestRequest
 */
export interface GuestRequest {
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof GuestRequest
     */
    user: UserObjectRequest;
}
/**
 * 
 * @export
 * @interface GuestResponse
 */
export interface GuestResponse {
    /**
     * Authentication token to use for guest user
     * @type {string}
     * @memberof GuestResponse
     */
    access_token: string;
    /**
     * 
     * @type {string}
     * @memberof GuestResponse
     */
    duration: string;
    /**
     * 
     * @type {UserObject}
     * @memberof GuestResponse
     */
    user?: UserObject;
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
 * @interface HMSCall
 */
export interface HMSCall {
    /**
     * 
     * @type {string}
     * @memberof HMSCall
     */
    room_id: string;
    /**
     * 
     * @type {string}
     * @memberof HMSCall
     */
    room_name: string;
}
/**
 * 
 * @export
 * @interface HealthCheckEvent
 */
export interface HealthCheckEvent {
    /**
     * 
     * @type {string}
     * @memberof HealthCheckEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof HealthCheckEvent
     */
    created_at: string;
    /**
     * 
     * @type {OwnUser}
     * @memberof HealthCheckEvent
     */
    me?: OwnUser;
    /**
     * 
     * @type {string}
     * @memberof HealthCheckEvent
     */
    type: string;
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
     * @type {UserObjectRequest}
     * @memberof HideChannelRequest
     */
    user?: UserObjectRequest;
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
 * @interface HuaweiConfigRequest
 */
export interface HuaweiConfigRequest {
    /**
     * 
     * @type {boolean}
     * @memberof HuaweiConfigRequest
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof HuaweiConfigRequest
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof HuaweiConfigRequest
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
 * @interface ImageDataRequest
 */
export interface ImageDataRequest {
    /**
     * 
     * @type {string}
     * @memberof ImageDataRequest
     */
    frames?: string;
    /**
     * 
     * @type {string}
     * @memberof ImageDataRequest
     */
    height?: string;
    /**
     * 
     * @type {string}
     * @memberof ImageDataRequest
     */
    size?: string;
    /**
     * 
     * @type {string}
     * @memberof ImageDataRequest
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof ImageDataRequest
     */
    width?: string;
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
    crop: ImageSizeCropEnum;
    /**
     * Target image height
     * @type {number}
     * @memberof ImageSize
     */
    height: number;
    /**
     * Resize method
     * @type {string}
     * @memberof ImageSize
     */
    resize: ImageSizeResizeEnum;
    /**
     * Target image width
     * @type {number}
     * @memberof ImageSize
     */
    width: number;
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
 * @interface ImagesRequest
 */
export interface ImagesRequest {
    /**
     * 
     * @type {ImageDataRequest}
     * @memberof ImagesRequest
     */
    fixed_height?: ImageDataRequest;
    /**
     * 
     * @type {ImageDataRequest}
     * @memberof ImagesRequest
     */
    fixed_height_downsampled?: ImageDataRequest;
    /**
     * 
     * @type {ImageDataRequest}
     * @memberof ImagesRequest
     */
    fixed_height_still?: ImageDataRequest;
    /**
     * 
     * @type {ImageDataRequest}
     * @memberof ImagesRequest
     */
    fixed_width?: ImageDataRequest;
    /**
     * 
     * @type {ImageDataRequest}
     * @memberof ImagesRequest
     */
    fixed_width_downsampled?: ImageDataRequest;
    /**
     * 
     * @type {ImageDataRequest}
     * @memberof ImagesRequest
     */
    fixed_width_still?: ImageDataRequest;
    /**
     * 
     * @type {ImageDataRequest}
     * @memberof ImagesRequest
     */
    original?: ImageDataRequest;
}
/**
 * 
 * @export
 * @interface ImportTask
 */
export interface ImportTask {
    /**
     * 
     * @type {string}
     * @memberof ImportTask
     */
    created_at: string;
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
     * @type {any}
     * @memberof ImportTask
     */
    result?: any | null;
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
     * @type {string}
     * @memberof ImportTask
     */
    updated_at: string;
}
/**
 * 
 * @export
 * @interface ImportTaskHistory
 */
export interface ImportTaskHistory {
    /**
     * 
     * @type {string}
     * @memberof ImportTaskHistory
     */
    created_at: string;
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
 * @interface LabelThresholdsRequest
 */
export interface LabelThresholdsRequest {
    /**
     * Threshold for automatic message block
     * @type {number}
     * @memberof LabelThresholdsRequest
     */
    block?: number;
    /**
     * Threshold for automatic message flag
     * @type {number}
     * @memberof LabelThresholdsRequest
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
 * @interface MarkChannelsReadRequest
 */
export interface MarkChannelsReadRequest {
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MarkChannelsReadRequest
     */
    user?: UserObjectRequest;
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
     * 
     * @type {UserObjectRequest}
     * @memberof MarkReadRequest
     */
    user?: UserObjectRequest;
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
    message_id: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MarkUnreadRequest
     */
    user?: UserObjectRequest;
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
 * @interface MemberAddedEvent
 */
export interface MemberAddedEvent {
    /**
     * 
     * @type {string}
     * @memberof MemberAddedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof MemberAddedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof MemberAddedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MemberAddedEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof MemberAddedEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof MemberAddedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof MemberAddedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MemberAddedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface MemberRemovedEvent
 */
export interface MemberRemovedEvent {
    /**
     * 
     * @type {string}
     * @memberof MemberRemovedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof MemberRemovedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof MemberRemovedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MemberRemovedEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof MemberRemovedEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof MemberRemovedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MemberRemovedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface MemberUpdatedEvent
 */
export interface MemberUpdatedEvent {
    /**
     * 
     * @type {string}
     * @memberof MemberUpdatedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof MemberUpdatedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof MemberUpdatedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MemberUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof MemberUpdatedEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof MemberUpdatedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof MemberUpdatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MemberUpdatedEvent
     */
    user?: UserObject;
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
    [key: string]: any | any;
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
     * @type {string}
     * @memberof Message
     */
    created_at: string;
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof Message
     */
    deleted_at?: string;
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
     * @type {string}
     * @memberof Message
     */
    pin_expires?: string;
    /**
     * Whether message is pinned or not
     * @type {boolean}
     * @memberof Message
     */
    pinned: boolean;
    /**
     * Date when message got pinned
     * @type {string}
     * @memberof Message
     */
    pinned_at?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof Message
     */
    pinned_by?: UserObject;
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
     * @type {string}
     * @memberof Message
     */
    updated_at: string;
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
     * 
     * @type {string}
     * @memberof MessageActionRequest
     */
    ID?: string;
    /**
     * Data to execute command with
     * @type {{ [key: string]: string; }}
     * @memberof MessageActionRequest
     */
    form_data: { [key: string]: string; };
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MessageActionRequest
     */
    user?: UserObjectRequest;
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
 * @interface MessageDeletedEvent
 */
export interface MessageDeletedEvent {
    /**
     * 
     * @type {string}
     * @memberof MessageDeletedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof MessageDeletedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof MessageDeletedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MessageDeletedEvent
     */
    created_at: string;
    /**
     * 
     * @type {boolean}
     * @memberof MessageDeletedEvent
     */
    hard_delete: boolean;
    /**
     * 
     * @type {Message}
     * @memberof MessageDeletedEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof MessageDeletedEvent
     */
    team?: string;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof MessageDeletedEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof MessageDeletedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageDeletedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface MessageFlag
 */
export interface MessageFlag {
    /**
     * 
     * @type {string}
     * @memberof MessageFlag
     */
    approved_at?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageFlag
     */
    created_at: string;
    /**
     * 
     * @type {boolean}
     * @memberof MessageFlag
     */
    created_by_automod: boolean;
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
    rejected_at?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageFlag
     */
    reviewed_at?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageFlag
     */
    reviewed_by?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof MessageFlag
     */
    updated_at: string;
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
 * @interface MessageFlaggedEvent
 */
export interface MessageFlaggedEvent {
    /**
     * 
     * @type {string}
     * @memberof MessageFlaggedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MessageFlaggedEvent
     */
    created_at: string;
    /**
     * 
     * @type {Flag}
     * @memberof MessageFlaggedEvent
     */
    flag?: Flag;
    /**
     * 
     * @type {Message}
     * @memberof MessageFlaggedEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof MessageFlaggedEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof MessageFlaggedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageFlaggedEvent
     */
    user?: UserObject;
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
     * @type {string}
     * @memberof MessageModerationResult
     */
    created_at: string;
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
     * @type {string}
     * @memberof MessageModerationResult
     */
    updated_at: string;
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
 * @interface MessageNewEvent
 */
export interface MessageNewEvent {
    /**
     * 
     * @type {string}
     * @memberof MessageNewEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof MessageNewEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof MessageNewEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MessageNewEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof MessageNewEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof MessageNewEvent
     */
    team?: string;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof MessageNewEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof MessageNewEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageNewEvent
     */
    user?: UserObject;
    /**
     * 
     * @type {number}
     * @memberof MessageNewEvent
     */
    watcher_count: number;
}
/**
 * 
 * @export
 * @interface MessagePaginationParamsRequest
 */
export interface MessagePaginationParamsRequest {
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    created_at_after?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    created_at_after_or_equal?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    created_at_around?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    created_at_before?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    created_at_before_or_equal?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    id_around?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    id_gt?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    id_gte?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    id_lt?: string;
    /**
     * 
     * @type {string}
     * @memberof MessagePaginationParamsRequest
     */
    id_lte?: string;
    /**
     * 
     * @type {number}
     * @memberof MessagePaginationParamsRequest
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof MessagePaginationParamsRequest
     */
    offset?: number;
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
     * @type {string}
     * @memberof MessageReadEvent
     */
    created_at: string;
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
 * Represents any chat message
 * @export
 * @interface MessageRequest
 */
export interface MessageRequest {
    [key: string]: any | any;
    /**
     * Array of message attachments
     * @type {Array<AttachmentRequest>}
     * @memberof MessageRequest
     */
    attachments: Array<AttachmentRequest>;
    /**
     * Channel unique identifier in <type>:<id> format
     * @type {Array<number>}
     * @memberof MessageRequest
     */
    cid?: Array<number>;
    /**
     * Contains HTML markup of the message. Can only be set when using server-side API
     * @type {string}
     * @memberof MessageRequest
     */
    html?: string;
    /**
     * Message ID is unique string identifier of the message
     * @type {string}
     * @memberof MessageRequest
     */
    id?: string;
    /**
     * List of mentioned users
     * @type {Array<string>}
     * @memberof MessageRequest
     */
    mentioned_users?: Array<string>;
    /**
     * Should be empty if `text` is provided. Can only be set when using server-side API
     * @type {string}
     * @memberof MessageRequest
     */
    mml?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof MessageRequest
     */
    parent?: Array<number>;
    /**
     * ID of parent message (thread)
     * @type {string}
     * @memberof MessageRequest
     */
    parent_id?: string;
    /**
     * Date when pinned message expires
     * @type {string}
     * @memberof MessageRequest
     */
    pin_expires?: string;
    /**
     * Whether message is pinned or not
     * @type {boolean}
     * @memberof MessageRequest
     */
    pinned?: boolean;
    /**
     * Date when message got pinned
     * @type {string}
     * @memberof MessageRequest
     */
    pinned_at?: string | null;
    /**
     * Contains user who pinned the message
     * @type {Array<number>}
     * @memberof MessageRequest
     */
    pinned_by?: Array<number>;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest
     */
    quoted_message_id?: string;
    /**
     * An object containing scores of reactions of each type. Key: reaction type (string), value: total score of reactions (int)
     * @type {Array<number>}
     * @memberof MessageRequest
     */
    reaction_scores?: Array<number>;
    /**
     * Whether thread reply should be shown in the channel as well
     * @type {boolean}
     * @memberof MessageRequest
     */
    show_in_channel?: boolean;
    /**
     * Whether message is silent or not
     * @type {boolean}
     * @memberof MessageRequest
     */
    silent?: boolean;
    /**
     * Text of the message. Should be empty if `mml` is provided
     * @type {string}
     * @memberof MessageRequest
     */
    text?: string;
    /**
     * Contains type of the message
     * @type {string}
     * @memberof MessageRequest
     */
    type?: MessageRequestTypeEnum;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MessageRequest
     */
    user?: UserObjectRequest;
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
    REGULAR: 'regular',
    EPHEMERAL: 'ephemeral',
    ERROR: 'error',
    REPLY: 'reply',
    SYSTEM: 'system',
    DELETED: 'deleted'
} as const;
export type MessageRequestTypeEnum = typeof MessageRequestTypeEnum[keyof typeof MessageRequestTypeEnum];

/**
 * Represents any chat message
 * @export
 * @interface MessageRequest1
 */
export interface MessageRequest1 {
    [key: string]: any | any;
    /**
     * Array of message attachments
     * @type {Array<AttachmentRequest>}
     * @memberof MessageRequest1
     */
    attachments?: Array<AttachmentRequest>;
    /**
     * Whether `before_message_send webhook` failed or not. Field is only accessible in push webhook
     * @type {boolean}
     * @memberof MessageRequest1
     */
    before_message_send_failed?: boolean;
    /**
     * Channel unique identifier in <type>:<id> format
     * @type {string}
     * @memberof MessageRequest1
     */
    cid?: string;
    /**
     * Contains provided slash command
     * @type {string}
     * @memberof MessageRequest1
     */
    command?: string;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof MessageRequest1
     */
    created_at?: string;
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof MessageRequest1
     */
    deleted_at?: string;
    /**
     * 
     * @type {number}
     * @memberof MessageRequest1
     */
    deleted_reply_count?: number;
    /**
     * Contains HTML markup of the message. Can only be set when using server-side API
     * @type {string}
     * @memberof MessageRequest1
     */
    html?: string;
    /**
     * Object with translations. Key `language` contains the original language key. Other keys contain translations
     * @type {{ [key: string]: string; }}
     * @memberof MessageRequest1
     */
    i18n?: { [key: string]: string; };
    /**
     * Message ID is unique string identifier of the message
     * @type {string}
     * @memberof MessageRequest1
     */
    id?: string;
    /**
     * Contains image moderation information
     * @type {{ [key: string]: Array<string>; }}
     * @memberof MessageRequest1
     */
    image_labels?: { [key: string]: Array<string>; };
    /**
     * List of 10 latest reactions to this message
     * @type {Array<ReactionRequest>}
     * @memberof MessageRequest1
     */
    latest_reactions?: Array<ReactionRequest>;
    /**
     * List of mentioned users
     * @type {Array<UserObjectRequest>}
     * @memberof MessageRequest1
     */
    mentioned_users?: Array<UserObjectRequest>;
    /**
     * Should be empty if `text` is provided. Can only be set when using server-side API
     * @type {string}
     * @memberof MessageRequest1
     */
    mml: string;
    /**
     * List of 10 latest reactions of authenticated user to this message
     * @type {Array<ReactionRequest>}
     * @memberof MessageRequest1
     */
    own_reactions?: Array<ReactionRequest>;
    /**
     * ID of parent message (thread)
     * @type {string}
     * @memberof MessageRequest1
     */
    parent_id?: string;
    /**
     * Date when pinned message expires
     * @type {string}
     * @memberof MessageRequest1
     */
    pin_expires?: string;
    /**
     * Whether message is pinned or not
     * @type {boolean}
     * @memberof MessageRequest1
     */
    pinned?: boolean;
    /**
     * Date when message got pinned
     * @type {string}
     * @memberof MessageRequest1
     */
    pinned_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MessageRequest1
     */
    pinned_by?: UserObjectRequest;
    /**
     * 
     * @type {MessageRequest1}
     * @memberof MessageRequest1
     */
    quoted_message?: MessageRequest1;
    /**
     * 
     * @type {string}
     * @memberof MessageRequest1
     */
    quoted_message_id?: string;
    /**
     * An object containing number of reactions of each type. Key: reaction type (string), value: number of reactions (int)
     * @type {{ [key: string]: number; }}
     * @memberof MessageRequest1
     */
    reaction_counts?: { [key: string]: number; };
    /**
     * An object containing scores of reactions of each type. Key: reaction type (string), value: total score of reactions (int)
     * @type {{ [key: string]: number; }}
     * @memberof MessageRequest1
     */
    reaction_scores?: { [key: string]: number; };
    /**
     * Number of replies to this message
     * @type {number}
     * @memberof MessageRequest1
     */
    reply_count?: number;
    /**
     * Whether the message was shadowed or not
     * @type {boolean}
     * @memberof MessageRequest1
     */
    shadowed?: boolean;
    /**
     * Whether thread reply should be shown in the channel as well
     * @type {boolean}
     * @memberof MessageRequest1
     */
    show_in_channel?: boolean;
    /**
     * Whether message is silent or not
     * @type {boolean}
     * @memberof MessageRequest1
     */
    silent?: boolean;
    /**
     * Text of the message. Should be empty if `mml` is provided
     * @type {string}
     * @memberof MessageRequest1
     */
    text: string;
    /**
     * List of users who participate in thread
     * @type {Array<UserObjectRequest>}
     * @memberof MessageRequest1
     */
    thread_participants?: Array<UserObjectRequest>;
    /**
     * Contains type of the message
     * @type {string}
     * @memberof MessageRequest1
     */
    type?: MessageRequest1TypeEnum;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof MessageRequest1
     */
    updated_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MessageRequest1
     */
    user?: UserObjectRequest;
}


/**
 * @export
 */
export const MessageRequest1TypeEnum = {
    REGULAR: 'regular',
    EPHEMERAL: 'ephemeral',
    ERROR: 'error',
    REPLY: 'reply',
    SYSTEM: 'system',
    DELETED: 'deleted'
} as const;
export type MessageRequest1TypeEnum = typeof MessageRequest1TypeEnum[keyof typeof MessageRequest1TypeEnum];

/**
 * 
 * @export
 * @interface MessageResponse
 */
export interface MessageResponse {
    /**
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof MessageResponse
     */
    duration: string;
    /**
     * 
     * @type {Message}
     * @memberof MessageResponse
     */
    message?: Message | null;
}
/**
 * 
 * @export
 * @interface MessageUnblockedEvent
 */
export interface MessageUnblockedEvent {
    /**
     * 
     * @type {string}
     * @memberof MessageUnblockedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MessageUnblockedEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof MessageUnblockedEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof MessageUnblockedEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof MessageUnblockedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageUnblockedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface MessageUpdatedEvent
 */
export interface MessageUpdatedEvent {
    /**
     * 
     * @type {string}
     * @memberof MessageUpdatedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof MessageUpdatedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof MessageUpdatedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof MessageUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof MessageUpdatedEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {string}
     * @memberof MessageUpdatedEvent
     */
    team?: string;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof MessageUpdatedEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof MessageUpdatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof MessageUpdatedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface MessageWithPendingMetadataResponse
 */
export interface MessageWithPendingMetadataResponse {
    /**
     * 
     * @type {string}
     * @memberof MessageWithPendingMetadataResponse
     */
    duration: string;
    /**
     * 
     * @type {Message}
     * @memberof MessageWithPendingMetadataResponse
     */
    message?: Message | null;
    /**
     * Metadata attached to a message while it is pending
     * @type {{ [key: string]: string; }}
     * @memberof MessageWithPendingMetadataResponse
     */
    pending_message_metadata?: { [key: string]: string; };
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
     * @type {any}
     * @memberof ModerationResponse
     */
    automod_response: any | null;
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
 * @interface ModerationResponseRequest
 */
export interface ModerationResponseRequest {
    /**
     * 
     * @type {string}
     * @memberof ModerationResponseRequest
     */
    action?: string;
    /**
     * 
     * @type {any}
     * @memberof ModerationResponseRequest
     */
    automod_response?: any | null;
    /**
     * 
     * @type {number}
     * @memberof ModerationResponseRequest
     */
    explicit?: number;
    /**
     * 
     * @type {number}
     * @memberof ModerationResponseRequest
     */
    spam?: number;
    /**
     * 
     * @type {number}
     * @memberof ModerationResponseRequest
     */
    toxic?: number;
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
    channel_cids: Array<string>;
    /**
     * Duration of mute in milliseconds
     * @type {number}
     * @memberof MuteChannelRequest
     */
    expiration?: number;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MuteChannelRequest
     */
    user?: UserObjectRequest;
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
    target_ids: Array<string>;
    /**
     * Duration of mute in minutes
     * @type {number}
     * @memberof MuteUserRequest
     */
    timeout?: number;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof MuteUserRequest
     */
    user?: UserObjectRequest;
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
 * @interface NotificationAddedToChannelEvent
 */
export interface NotificationAddedToChannelEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationAddedToChannelEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationAddedToChannelEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationAddedToChannelEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationAddedToChannelEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationAddedToChannelEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof NotificationAddedToChannelEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof NotificationAddedToChannelEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface NotificationChannelDeletedEvent
 */
export interface NotificationChannelDeletedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationChannelDeletedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelDeletedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelDeletedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelDeletedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelDeletedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelDeletedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelDeletedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface NotificationChannelMutesUpdatedEvent
 */
export interface NotificationChannelMutesUpdatedEvent {
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelMutesUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {OwnUser}
     * @memberof NotificationChannelMutesUpdatedEvent
     */
    me: OwnUser;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelMutesUpdatedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface NotificationChannelTruncatedEvent
 */
export interface NotificationChannelTruncatedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationChannelTruncatedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelTruncatedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelTruncatedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelTruncatedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelTruncatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationChannelTruncatedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface NotificationInviteAcceptedEvent
 */
export interface NotificationInviteAcceptedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationInviteAcceptedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteAcceptedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteAcceptedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteAcceptedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteAcceptedEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof NotificationInviteAcceptedEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteAcceptedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof NotificationInviteAcceptedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface NotificationInviteRejectedEvent
 */
export interface NotificationInviteRejectedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationInviteRejectedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteRejectedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteRejectedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteRejectedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteRejectedEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof NotificationInviteRejectedEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof NotificationInviteRejectedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof NotificationInviteRejectedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface NotificationInvitedEvent
 */
export interface NotificationInvitedEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationInvitedEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationInvitedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInvitedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInvitedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationInvitedEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof NotificationInvitedEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof NotificationInvitedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof NotificationInvitedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface NotificationMarkReadEvent
 */
export interface NotificationMarkReadEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationMarkReadEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkReadEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkReadEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkReadEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkReadEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkReadEvent
     */
    team?: string;
    /**
     * 
     * @type {number}
     * @memberof NotificationMarkReadEvent
     */
    total_unread_count: number;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkReadEvent
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof NotificationMarkReadEvent
     */
    unread_channels: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationMarkReadEvent
     */
    unread_count: number;
    /**
     * 
     * @type {UserObject}
     * @memberof NotificationMarkReadEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface NotificationMarkUnreadEvent
 */
export interface NotificationMarkUnreadEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationMarkUnreadEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    first_unread_message_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    last_read_at: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    last_read_message_id?: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    team?: string;
    /**
     * 
     * @type {number}
     * @memberof NotificationMarkUnreadEvent
     */
    total_unread_count: number;
    /**
     * 
     * @type {string}
     * @memberof NotificationMarkUnreadEvent
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof NotificationMarkUnreadEvent
     */
    unread_channels: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationMarkUnreadEvent
     */
    unread_count: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationMarkUnreadEvent
     */
    unread_messages: number;
    /**
     * 
     * @type {UserObject}
     * @memberof NotificationMarkUnreadEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface NotificationMutesUpdatedEvent
 */
export interface NotificationMutesUpdatedEvent {
    /**
     * 
     * @type {string}
     * @memberof NotificationMutesUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {OwnUser}
     * @memberof NotificationMutesUpdatedEvent
     */
    me: OwnUser;
    /**
     * 
     * @type {string}
     * @memberof NotificationMutesUpdatedEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface NotificationNewMessageEvent
 */
export interface NotificationNewMessageEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationNewMessageEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationNewMessageEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationNewMessageEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationNewMessageEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationNewMessageEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof NotificationNewMessageEvent
     */
    message: Message | null;
    /**
     * 
     * @type {string}
     * @memberof NotificationNewMessageEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationNewMessageEvent
     */
    type: string;
}
/**
 * 
 * @export
 * @interface NotificationRemovedFromChannelEvent
 */
export interface NotificationRemovedFromChannelEvent {
    /**
     * 
     * @type {ChannelResponse}
     * @memberof NotificationRemovedFromChannelEvent
     */
    channel?: ChannelResponse;
    /**
     * 
     * @type {string}
     * @memberof NotificationRemovedFromChannelEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationRemovedFromChannelEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationRemovedFromChannelEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof NotificationRemovedFromChannelEvent
     */
    created_at: string;
    /**
     * 
     * @type {ChannelMember}
     * @memberof NotificationRemovedFromChannelEvent
     */
    member?: ChannelMember | null;
    /**
     * 
     * @type {string}
     * @memberof NotificationRemovedFromChannelEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof NotificationRemovedFromChannelEvent
     */
    user?: UserObject;
}
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
 * @interface OwnUser
 */
export interface OwnUser {
    [key: string]: any | any;
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
     * @type {string}
     * @memberof OwnUser
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof OwnUser
     */
    deactivated_at?: string;
    /**
     * 
     * @type {string}
     * @memberof OwnUser
     */
    deleted_at?: string;
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
     * @type {string}
     * @memberof OwnUser
     */
    last_active?: string;
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
     * @type {string}
     * @memberof OwnUser
     */
    updated_at: string;
}
/**
 * 
 * @export
 * @interface OwnUserRequest
 */
export interface OwnUserRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof OwnUserRequest
     */
    banned?: boolean;
    /**
     * 
     * @type {Array<ChannelMuteRequest>}
     * @memberof OwnUserRequest
     */
    channel_mutes?: Array<ChannelMuteRequest>;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    deactivated_at?: string;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    deleted_at?: string;
    /**
     * 
     * @type {Array<DeviceRequest>}
     * @memberof OwnUserRequest
     */
    devices?: Array<DeviceRequest>;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OwnUserRequest
     */
    invisible?: boolean;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    last_active?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof OwnUserRequest
     */
    latest_hidden_channels?: Array<string>;
    /**
     * 
     * @type {Array<UserMuteRequest>}
     * @memberof OwnUserRequest
     */
    mutes?: Array<UserMuteRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof OwnUserRequest
     */
    online?: boolean;
    /**
     * 
     * @type {PushNotificationSettingsRequest}
     * @memberof OwnUserRequest
     */
    push_notifications?: PushNotificationSettingsRequest;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    role?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof OwnUserRequest
     */
    teams?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof OwnUserRequest
     */
    total_unread_count?: number;
    /**
     * 
     * @type {number}
     * @memberof OwnUserRequest
     */
    unread_channels?: number;
    /**
     * 
     * @type {number}
     * @memberof OwnUserRequest
     */
    unread_count?: number;
    /**
     * 
     * @type {string}
     * @memberof OwnUserRequest
     */
    updated_at?: string;
}
/**
 * 
 * @export
 * @interface PaginationParamsRequest
 */
export interface PaginationParamsRequest {
    /**
     * 
     * @type {number}
     * @memberof PaginationParamsRequest
     */
    id_gt?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationParamsRequest
     */
    id_gte?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationParamsRequest
     */
    id_lt?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationParamsRequest
     */
    id_lte?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationParamsRequest
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationParamsRequest
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
     * @type {string}
     * @memberof Policy
     */
    created_at: string;
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
     * @type {string}
     * @memberof Policy
     */
    updated_at: string;
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
    action?: PolicyRequestActionEnum;
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
    owner?: boolean;
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
    resources?: Array<string>;
    /**
     * List of roles to apply policy to
     * @type {Array<string>}
     * @memberof PolicyRequest
     */
    roles?: Array<string>;
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
 * @interface PolicyRequest1
 */
export interface PolicyRequest1 {
    /**
     * 
     * @type {string}
     * @memberof PolicyRequest1
     */
    action: PolicyRequest1ActionEnum;
    /**
     * User-friendly policy name
     * @type {string}
     * @memberof PolicyRequest1
     */
    name: string;
    /**
     * Whether policy applies to resource owner or not
     * @type {boolean}
     * @memberof PolicyRequest1
     */
    owner: boolean;
    /**
     * Policy priority
     * @type {number}
     * @memberof PolicyRequest1
     */
    priority: number;
    /**
     * List of resources to apply policy to
     * @type {Array<string>}
     * @memberof PolicyRequest1
     */
    resources: Array<string>;
    /**
     * List of roles to apply policy to
     * @type {Array<string>}
     * @memberof PolicyRequest1
     */
    roles: Array<string>;
}


/**
 * @export
 */
export const PolicyRequest1ActionEnum = {
    DENY: 'Deny',
    ALLOW: 'Allow'
} as const;
export type PolicyRequest1ActionEnum = typeof PolicyRequest1ActionEnum[keyof typeof PolicyRequest1ActionEnum];

/**
 * 
 * @export
 * @interface PushConfigRequest
 */
export interface PushConfigRequest {
    /**
     * 
     * @type {boolean}
     * @memberof PushConfigRequest
     */
    offline_only?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushConfigRequest
     */
    version?: PushConfigRequestVersionEnum;
}


/**
 * @export
 */
export const PushConfigRequestVersionEnum = {
    V1: 'v1',
    V2: 'v2'
} as const;
export type PushConfigRequestVersionEnum = typeof PushConfigRequestVersionEnum[keyof typeof PushConfigRequestVersionEnum];

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
     * @type {string}
     * @memberof PushNotificationSettings
     */
    disabled_until?: string;
}
/**
 * 
 * @export
 * @interface PushNotificationSettingsRequest
 */
export interface PushNotificationSettingsRequest {
    /**
     * 
     * @type {boolean}
     * @memberof PushNotificationSettingsRequest
     */
    disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationSettingsRequest
     */
    disabled_until?: string;
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
     * @type {string}
     * @memberof PushProvider
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    disabled_at?: string;
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
     * @type {number}
     * @memberof PushProvider
     */
    type: number;
    /**
     * 
     * @type {string}
     * @memberof PushProvider
     */
    updated_at: string;
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
 * @interface PushProviderRequest
 */
export interface PushProviderRequest {
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_auth_key?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_auth_type?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PushProviderRequest
     */
    apn_development?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_host?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_key_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_p12_cert?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_team_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    apn_topic?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    disabled_at?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    disabled_reason?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    firebase_apn_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    firebase_credentials?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    firebase_data_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    firebase_host?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    firebase_notification_template?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    firebase_server_key?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    huawei_app_id?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    huawei_app_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof PushProviderRequest
     */
    type?: number;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    updated_at?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
     */
    xiaomi_app_secret?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderRequest
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
     * @type {string}
     * @memberof PushProviderResponse
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof PushProviderResponse
     */
    disabled_at?: string;
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
     * @type {string}
     * @memberof PushProviderResponse
     */
    updated_at: string;
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
     * @type {string}
     * @memberof QueryBannedUsersRequest
     */
    created_at_after?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryBannedUsersRequest
     */
    created_at_after_or_equal?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryBannedUsersRequest
     */
    created_at_before?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryBannedUsersRequest
     */
    created_at_before_or_equal?: string;
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
     * @type {UserObject}
     * @memberof QueryBannedUsersRequest
     */
    user?: UserObject;
    /**
     * **Server-side only**. User ID which server acts upon
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
     * 
     * @type {boolean}
     * @memberof QueryChannelsRequest
     */
    presence?: boolean;
    /**
     * List of sort parameters
     * @type {Array<SortParamRequest>}
     * @memberof QueryChannelsRequest
     */
    sort?: Array<SortParamRequest>;
    /**
     * Whether to update channel state or not
     * @type {boolean}
     * @memberof QueryChannelsRequest
     */
    state?: boolean;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof QueryChannelsRequest
     */
    user?: UserObjectRequest;
    /**
     * 
     * @type {string}
     * @memberof QueryChannelsRequest
     */
    user_id?: string;
    /**
     * Whether to start watching found channels or not
     * @type {boolean}
     * @memberof QueryChannelsRequest
     */
    watch?: boolean;
}
/**
 * 
 * @export
 * @interface QueryMembersRequest
 */
export interface QueryMembersRequest {
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    created_at_after?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    created_at_after_or_equal?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    created_at_before?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    created_at_before_or_equal?: string;
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
     * @type {UserObject}
     * @memberof QueryMembersRequest
     */
    user?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    user_id?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    user_id_gt?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    user_id_gte?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    user_id_lt?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryMembersRequest
     */
    user_id_lte?: string;
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
     * @type {UserObject}
     * @memberof QueryMessageFlagsRequest
     */
    user?: UserObject;
    /**
     * **Server-side only**. User ID which server acts upon
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
 * @interface QueryUsersRequest
 */
export interface QueryUsersRequest {
    /**
     * User filters
     * @type {{ [key: string]: any; }}
     * @memberof QueryUsersRequest
     */
    filter_conditions: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof QueryUsersRequest
     */
    id_gt?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryUsersRequest
     */
    id_gte?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryUsersRequest
     */
    id_lt?: string;
    /**
     * 
     * @type {string}
     * @memberof QueryUsersRequest
     */
    id_lte?: string;
    /**
     * 
     * @type {number}
     * @memberof QueryUsersRequest
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof QueryUsersRequest
     */
    offset?: number;
    /**
     * Request user presence status
     * @type {boolean}
     * @memberof QueryUsersRequest
     */
    presence?: boolean;
    /**
     * Array of sort parameters
     * @type {Array<SortParam>}
     * @memberof QueryUsersRequest
     */
    sort?: Array<SortParam>;
    /**
     * 
     * @type {UserObject}
     * @memberof QueryUsersRequest
     */
    user?: UserObject;
    /**
     * 
     * @type {string}
     * @memberof QueryUsersRequest
     */
    user_id?: string;
}
/**
 * Represents user reaction to a message
 * @export
 * @interface Reaction
 */
export interface Reaction {
    [key: string]: any | any;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof Reaction
     */
    readonly created_at: string;
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
     * @type {string}
     * @memberof Reaction
     */
    readonly updated_at: string;
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
 * @interface ReactionDeletedEvent
 */
export interface ReactionDeletedEvent {
    /**
     * 
     * @type {string}
     * @memberof ReactionDeletedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionDeletedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionDeletedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionDeletedEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof ReactionDeletedEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {Reaction}
     * @memberof ReactionDeletedEvent
     */
    reaction?: Reaction | null;
    /**
     * 
     * @type {string}
     * @memberof ReactionDeletedEvent
     */
    team?: string;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof ReactionDeletedEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof ReactionDeletedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ReactionDeletedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface ReactionNewEvent
 */
export interface ReactionNewEvent {
    /**
     * 
     * @type {string}
     * @memberof ReactionNewEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionNewEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionNewEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionNewEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof ReactionNewEvent
     */
    message?: Message | null;
    /**
     * 
     * @type {Reaction}
     * @memberof ReactionNewEvent
     */
    reaction?: Reaction | null;
    /**
     * 
     * @type {string}
     * @memberof ReactionNewEvent
     */
    team?: string;
    /**
     * 
     * @type {Array<UserObject>}
     * @memberof ReactionNewEvent
     */
    thread_participants?: Array<UserObject>;
    /**
     * 
     * @type {string}
     * @memberof ReactionNewEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ReactionNewEvent
     */
    user?: UserObject;
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
 * Represents user reaction to a message
 * @export
 * @interface ReactionRequest
 */
export interface ReactionRequest {
    [key: string]: any | any;
    /**
     * ID of a message user reacted to
     * @type {string}
     * @memberof ReactionRequest
     */
    message_id?: string;
    /**
     * Reaction score. If not specified reaction has score of 1
     * @type {number}
     * @memberof ReactionRequest
     */
    score?: number;
    /**
     * The type of reaction (e.g. 'like', 'laugh', 'wow')
     * @type {string}
     * @memberof ReactionRequest
     */
    type: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof ReactionRequest
     */
    user?: UserObjectRequest;
    /**
     * ID of a user who reacted to a message
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
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof ReactionResponse
     */
    duration: string;
    /**
     * 
     * @type {Message}
     * @memberof ReactionResponse
     */
    message?: Message | null;
    /**
     * 
     * @type {Reaction}
     * @memberof ReactionResponse
     */
    reaction?: Reaction | null;
}
/**
 * 
 * @export
 * @interface ReactionUpdatedEvent
 */
export interface ReactionUpdatedEvent {
    /**
     * 
     * @type {string}
     * @memberof ReactionUpdatedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionUpdatedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionUpdatedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {Message}
     * @memberof ReactionUpdatedEvent
     */
    message: Message | null;
    /**
     * 
     * @type {Reaction}
     * @memberof ReactionUpdatedEvent
     */
    reaction: Reaction | null;
    /**
     * 
     * @type {string}
     * @memberof ReactionUpdatedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof ReactionUpdatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof ReactionUpdatedEvent
     */
    user?: UserObject;
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
    /**
     * 
     * @type {string}
     * @memberof ReactivateUserRequest
     */
    user_id: string;
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
     * @type {string}
     * @memberof Read
     */
    last_read: string;
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
 * @interface Role
 */
export interface Role {
    /**
     * Date/time of creation
     * @type {string}
     * @memberof Role
     */
    created_at: string;
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
     * @type {string}
     * @memberof Role
     */
    updated_at: string;
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
    [key: string]: any | any;
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
     * @type {string}
     * @memberof SearchResultMessage
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    deleted_at?: string;
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
     * @type {string}
     * @memberof SearchResultMessage
     */
    pin_expires?: string;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResultMessage
     */
    pinned: boolean;
    /**
     * 
     * @type {string}
     * @memberof SearchResultMessage
     */
    pinned_at?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof SearchResultMessage
     */
    pinned_by?: UserObject;
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
     * @type {string}
     * @memberof SearchResultMessage
     */
    updated_at: string;
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
 * Contains all information needed to send new message
 * @export
 * @interface SendMessageRequest
 */
export interface SendMessageRequest {
    /**
     * Enable moderation on server-side requests
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    force_moderation?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    is_pending_message?: boolean;
    /**
     * Keeps the channel hidden for the sender
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
     * Make the message a pending message. This message will not be viewable to others until it is committed.
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
     * Do not try to enrich the links within message
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    skip_enrich_url?: boolean;
    /**
     * Disables all push notifications for this message
     * @type {boolean}
     * @memberof SendMessageRequest
     */
    skip_push?: boolean;
}
/**
 * 
 * @export
 * @interface SendReactionRequest
 */
export interface SendReactionRequest {
    /**
     * 
     * @type {string}
     * @memberof SendReactionRequest
     */
    ID?: string;
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
    reaction: ReactionRequest | null;
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
     * @type {UserObjectRequest}
     * @memberof ShowChannelRequest
     */
    user?: UserObjectRequest;
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
 * @interface SortParamRequest
 */
export interface SortParamRequest {
    /**
     * Direction of sorting, -1 for descending, 1 for ascending
     * @type {number}
     * @memberof SortParamRequest
     */
    direction?: number;
    /**
     * Name of field to sort by
     * @type {string}
     * @memberof SortParamRequest
     */
    field?: string;
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
 * Sets thresholds for AI moderation
 * @export
 * @interface ThresholdsRequest
 */
export interface ThresholdsRequest {
    /**
     * 
     * @type {LabelThresholdsRequest}
     * @memberof ThresholdsRequest
     */
    explicit?: LabelThresholdsRequest;
    /**
     * 
     * @type {LabelThresholdsRequest}
     * @memberof ThresholdsRequest
     */
    spam?: LabelThresholdsRequest;
    /**
     * 
     * @type {LabelThresholdsRequest}
     * @memberof ThresholdsRequest
     */
    toxic?: LabelThresholdsRequest;
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
     * 
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
     * @type {string}
     * @memberof TruncateChannelRequest
     */
    truncated_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof TruncateChannelRequest
     */
    user?: UserObjectRequest;
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
 * @interface TypingStartEvent
 */
export interface TypingStartEvent {
    /**
     * 
     * @type {string}
     * @memberof TypingStartEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStartEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStartEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStartEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStartEvent
     */
    parent_id?: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStartEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof TypingStartEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface TypingStopEvent
 */
export interface TypingStopEvent {
    /**
     * 
     * @type {string}
     * @memberof TypingStopEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStopEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStopEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStopEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStopEvent
     */
    parent_id?: string;
    /**
     * 
     * @type {string}
     * @memberof TypingStopEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof TypingStopEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UnmuteChannelRequest
 */
export interface UnmuteChannelRequest {
    /**
     * 
     * @type {string}
     * @memberof UnmuteChannelRequest
     */
    channel_cid: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UnmuteChannelRequest
     */
    channel_cids: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof UnmuteChannelRequest
     */
    expiration?: number;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof UnmuteChannelRequest
     */
    user?: UserObjectRequest;
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
     * 
     * @type {string}
     * @memberof UnmuteUserRequest
     */
    target_id: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UnmuteUserRequest
     */
    target_ids: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof UnmuteUserRequest
     */
    timeout?: number;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof UnmuteUserRequest
     */
    user?: UserObjectRequest;
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
     * @type {string}
     * @memberof UnreadCountsChannel
     */
    last_read: string;
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
     * Duration of the request in human-readable format
     * @type {string}
     * @memberof UnreadCountsResponse
     */
    duration: string;
    /**
     * 
     * @type {number}
     * @memberof UnreadCountsResponse
     */
    total_unread_count: number;
}
/**
 * 
 * @export
 * @interface UpdateAppRequest
 */
export interface UpdateAppRequest {
    /**
     * 
     * @type {ConfigRequest}
     * @memberof UpdateAppRequest
     */
    agora_options?: ConfigRequest;
    /**
     * 
     * @type {APNConfigRequest}
     * @memberof UpdateAppRequest
     */
    apn_config?: APNConfigRequest;
    /**
     * 
     * @type {AsyncModerationConfigurationRequest}
     * @memberof UpdateAppRequest
     */
    async_moderation_config?: AsyncModerationConfigurationRequest;
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
     * @type {DataDogInfoRequest}
     * @memberof UpdateAppRequest
     */
    datadog_info?: DataDogInfoRequest;
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
     * @type {FileUploadConfigRequest}
     * @memberof UpdateAppRequest
     */
    file_upload_config?: FileUploadConfigRequest;
    /**
     * 
     * @type {FirebaseConfigRequest}
     * @memberof UpdateAppRequest
     */
    firebase_config?: FirebaseConfigRequest;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof UpdateAppRequest
     */
    grants?: { [key: string]: Array<string>; };
    /**
     * 
     * @type {ConfigRequest}
     * @memberof UpdateAppRequest
     */
    hms_options?: ConfigRequest;
    /**
     * 
     * @type {HuaweiConfigRequest}
     * @memberof UpdateAppRequest
     */
    huawei_config?: HuaweiConfigRequest;
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
     * @type {FileUploadConfigRequest}
     * @memberof UpdateAppRequest
     */
    image_upload_config?: FileUploadConfigRequest;
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
     * @type {PushConfigRequest}
     * @memberof UpdateAppRequest
     */
    push_config?: PushConfigRequest;
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
     * @type {string}
     * @memberof UpdateAppRequest
     */
    revoke_tokens_issued_before?: string;
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
     * @type {XiaomiConfigRequest}
     * @memberof UpdateAppRequest
     */
    xiaomi_config?: XiaomiConfigRequest;
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
     * 
     * @type {string}
     * @memberof UpdateBlockListRequest
     */
    Name?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateBlockListRequest
     */
    words?: Array<string>;
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
    set: { [key: string]: any; };
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateChannelPartialRequest
     */
    unset: Array<string>;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof UpdateChannelPartialRequest
     */
    user?: UserObjectRequest;
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
     * @type {Array<ChannelMemberRequest>}
     * @memberof UpdateChannelRequest
     */
    add_members?: Array<ChannelMemberRequest>;
    /**
     * List of user IDs to make channel moderators
     * @type {Array<string>}
     * @memberof UpdateChannelRequest
     */
    add_moderators: Array<string>;
    /**
     * List of channel member role assignments. If any specified user is not part of the channel, the request will fail
     * @type {Array<ChannelMemberRequest>}
     * @memberof UpdateChannelRequest
     */
    assign_roles?: Array<ChannelMemberRequest>;
    /**
     * Sets cool down period for the channel in seconds
     * @type {number}
     * @memberof UpdateChannelRequest
     */
    cooldown?: number;
    /**
     * 
     * @type {ChannelRequest}
     * @memberof UpdateChannelRequest
     */
    data?: ChannelRequest;
    /**
     * List of user IDs to take away moderators status from
     * @type {Array<string>}
     * @memberof UpdateChannelRequest
     */
    demote_moderators: Array<string>;
    /**
     * Set to `true` to hide channel's history when adding new members
     * @type {boolean}
     * @memberof UpdateChannelRequest
     */
    hide_history?: boolean;
    /**
     * List of user IDs to invite to the channel
     * @type {Array<ChannelMemberRequest>}
     * @memberof UpdateChannelRequest
     */
    invites?: Array<ChannelMemberRequest>;
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
    remove_members: Array<string>;
    /**
     * When `message` is set disables all push notifications for it
     * @type {boolean}
     * @memberof UpdateChannelRequest
     */
    skip_push?: boolean;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof UpdateChannelRequest
     */
    user?: UserObjectRequest;
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
     * @type {string}
     * @memberof UpdateChannelTypeRequest
     */
    NameFromPath?: string;
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
    automod_behavior?: UpdateChannelTypeRequestAutomodBehaviorEnum;
    /**
     * 
     * @type {ThresholdsRequest}
     * @memberof UpdateChannelTypeRequest
     */
    automod_thresholds?: ThresholdsRequest;
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
     * @type {Array<BlockListOptionsRequest>}
     * @memberof UpdateChannelTypeRequest
     */
    blocklists?: Array<BlockListOptionsRequest>;
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
    max_message_length?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateChannelTypeRequest
     */
    message_retention?: string;
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
    BLOCK: 'block'
} as const;
export type UpdateChannelTypeRequestAutomodBehaviorEnum = typeof UpdateChannelTypeRequestAutomodBehaviorEnum[keyof typeof UpdateChannelTypeRequestAutomodBehaviorEnum];

/**
 * @export
 */
export const UpdateChannelTypeRequestBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
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
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    created_at: string;
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
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    message_retention: string;
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
     * @type {Array<PolicyRequest1>}
     * @memberof UpdateChannelTypeResponse
     */
    permissions: Array<PolicyRequest1>;
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
     * @type {string}
     * @memberof UpdateChannelTypeResponse
     */
    updated_at: string;
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
    BLOCK: 'block'
} as const;
export type UpdateChannelTypeResponseAutomodBehaviorEnum = typeof UpdateChannelTypeResponseAutomodBehaviorEnum[keyof typeof UpdateChannelTypeResponseAutomodBehaviorEnum];

/**
 * @export
 */
export const UpdateChannelTypeResponseBlocklistBehaviorEnum = {
    FLAG: 'flag',
    BLOCK: 'block'
} as const;
export type UpdateChannelTypeResponseBlocklistBehaviorEnum = typeof UpdateChannelTypeResponseBlocklistBehaviorEnum[keyof typeof UpdateChannelTypeResponseBlocklistBehaviorEnum];

/**
 * Represents custom chat command
 * @export
 * @interface UpdateCommandRequest
 */
export interface UpdateCommandRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateCommandRequest
     */
    Name?: string;
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
 * @interface UpdateMessagePartialRequest
 */
export interface UpdateMessagePartialRequest {
    /**
     * Sets new field values
     * @type {{ [key: string]: any; }}
     * @memberof UpdateMessagePartialRequest
     */
    set: { [key: string]: any; };
    /**
     * Do not try to enrich the links within message
     * @type {boolean}
     * @memberof UpdateMessagePartialRequest
     */
    skip_enrich_url?: boolean;
    /**
     * Array of field names to unset
     * @type {Array<string>}
     * @memberof UpdateMessagePartialRequest
     */
    unset: Array<string>;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof UpdateMessagePartialRequest
     */
    user?: UserObjectRequest;
    /**
     * 
     * @type {string}
     * @memberof UpdateMessagePartialRequest
     */
    user_id?: string;
}
/**
 * Contains all information needed to update a message
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
     * @type {{ [key: string]: string; }}
     * @memberof UpdateMessageRequest
     */
    pending_message_metadata?: { [key: string]: string; };
    /**
     * Do not try to enrich the links within message
     * @type {boolean}
     * @memberof UpdateMessageRequest
     */
    skip_enrich_url?: boolean;
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
    set: { [key: string]: any; };
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateUserPartialRequest
     */
    unset: Array<string>;
}
/**
 * 
 * @export
 * @interface UpdateUsersRequest
 */
export interface UpdateUsersRequest {
    /**
     * Object containing users
     * @type {{ [key: string]: UserObjectRequest; }}
     * @memberof UpdateUsersRequest
     */
    users: { [key: string]: UserObjectRequest; };
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
     * Object containing users
     * @type {{ [key: string]: UserObject; }}
     * @memberof UpdateUsersResponse
     */
    users: { [key: string]: UserObject; };
}
/**
 * 
 * @export
 * @interface UpsertPushProviderRequest
 */
export interface UpsertPushProviderRequest {
    /**
     * 
     * @type {PushProviderRequest}
     * @memberof UpsertPushProviderRequest
     */
    push_provider?: PushProviderRequest;
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
 * @interface UserBannedEvent
 */
export interface UserBannedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    created_at: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserBannedEvent
     */
    created_by: UserObject;
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    expiration?: string;
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    reason?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserBannedEvent
     */
    shadow: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof UserBannedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserBannedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserCustomEventRequest
 */
export interface UserCustomEventRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof UserCustomEventRequest
     */
    created_at?: string;
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
 * @interface UserDeactivatedEvent
 */
export interface UserDeactivatedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserDeactivatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserDeactivatedEvent
     */
    created_by: UserObject;
    /**
     * 
     * @type {string}
     * @memberof UserDeactivatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserDeactivatedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserDeletedEvent
 */
export interface UserDeletedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserDeletedEvent
     */
    created_at: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserDeletedEvent
     */
    delete_conversation_channels: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserDeletedEvent
     */
    hard_delete: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserDeletedEvent
     */
    mark_messages_deleted: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserDeletedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserDeletedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserFlaggedEvent
 */
export interface UserFlaggedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserFlaggedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserFlaggedEvent
     */
    target_user?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserFlaggedEvent
     */
    target_users?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserFlaggedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserFlaggedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserMute
 */
export interface UserMute {
    /**
     * Date/time of creation
     * @type {string}
     * @memberof UserMute
     */
    created_at: string;
    /**
     * Date/time of mute expiration
     * @type {string}
     * @memberof UserMute
     */
    expires?: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserMute
     */
    target?: UserObject;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof UserMute
     */
    updated_at: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserMute
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserMuteRequest
 */
export interface UserMuteRequest {
    /**
     * Date/time of creation
     * @type {string}
     * @memberof UserMuteRequest
     */
    created_at?: string;
    /**
     * Date/time of mute expiration
     * @type {string}
     * @memberof UserMuteRequest
     */
    expires?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof UserMuteRequest
     */
    target?: UserObjectRequest;
    /**
     * Date/time of the last update
     * @type {string}
     * @memberof UserMuteRequest
     */
    updated_at?: string;
    /**
     * 
     * @type {UserObjectRequest}
     * @memberof UserMuteRequest
     */
    user?: UserObjectRequest;
}
/**
 * 
 * @export
 * @interface UserMutedEvent
 */
export interface UserMutedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserMutedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserMutedEvent
     */
    target_user?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserMutedEvent
     */
    target_users?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserMutedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserMutedEvent
     */
    user?: UserObject;
}
/**
 * Represents chat user
 * @export
 * @interface UserObject
 */
export interface UserObject {
    [key: string]: any | any;
    /**
     * Expiration date of the ban
     * @type {string}
     * @memberof UserObject
     */
    ban_expires?: string;
    /**
     * Whether a user is banned or not
     * @type {boolean}
     * @memberof UserObject
     */
    banned: boolean;
    /**
     * Date/time of creation
     * @type {string}
     * @memberof UserObject
     */
    readonly created_at?: string;
    /**
     * Date of deactivation
     * @type {string}
     * @memberof UserObject
     */
    readonly deactivated_at?: string;
    /**
     * Date/time of deletion
     * @type {string}
     * @memberof UserObject
     */
    readonly deleted_at?: string;
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
     * @type {string}
     * @memberof UserObject
     */
    readonly last_active?: string;
    /**
     * Whether a user online or not
     * @type {boolean}
     * @memberof UserObject
     */
    readonly online: boolean;
    /**
     * 
     * @type {PushNotificationSettings}
     * @memberof UserObject
     */
    push_notifications?: PushNotificationSettings;
    /**
     * Revocation date for tokens
     * @type {string}
     * @memberof UserObject
     */
    revoke_tokens_issued_before?: string;
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
     * @type {string}
     * @memberof UserObject
     */
    readonly updated_at?: string;
}
/**
 * Represents chat user
 * @export
 * @interface UserObjectRequest
 */
export interface UserObjectRequest {
    [key: string]: any | any;
    /**
     * Expiration date of the ban
     * @type {string}
     * @memberof UserObjectRequest
     */
    ban_expires?: string;
    /**
     * Whether a user is banned or not
     * @type {boolean}
     * @memberof UserObjectRequest
     */
    banned?: boolean;
    /**
     * Unique user identifier
     * @type {string}
     * @memberof UserObjectRequest
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserObjectRequest
     */
    invisible?: boolean;
    /**
     * Preferred language of a user
     * @type {string}
     * @memberof UserObjectRequest
     */
    language?: string;
    /**
     * 
     * @type {PushNotificationSettingsRequest}
     * @memberof UserObjectRequest
     */
    push_notifications?: PushNotificationSettingsRequest;
    /**
     * Revocation date for tokens
     * @type {string}
     * @memberof UserObjectRequest
     */
    revoke_tokens_issued_before?: string;
    /**
     * Determines the set of user permissions
     * @type {string}
     * @memberof UserObjectRequest
     */
    role?: string;
    /**
     * List of teams user is a part of
     * @type {Array<string>}
     * @memberof UserObjectRequest
     */
    teams?: Array<string>;
}
/**
 * 
 * @export
 * @interface UserPresenceChangedEvent
 */
export interface UserPresenceChangedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserPresenceChangedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserPresenceChangedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserPresenceChangedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserReactivatedEvent
 */
export interface UserReactivatedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserReactivatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserReactivatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserReactivatedEvent
     */
    user?: UserObject;
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
     * Optional name of user
     * @type {string}
     * @memberof UserRequest
     */
    name?: string;
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
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    ban_expires?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserResponse
     */
    banned: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    readonly created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    readonly deactivated_at?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    readonly deleted_at?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserResponse
     */
    invisible?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    readonly last_active?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserResponse
     */
    readonly online: boolean;
    /**
     * 
     * @type {PushNotificationSettings}
     * @memberof UserResponse
     */
    push_notifications?: PushNotificationSettings;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    revoke_tokens_issued_before?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    role: string;
    /**
     * Whether user is shadow banned or not
     * @type {boolean}
     * @memberof UserResponse
     */
    shadow_banned: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserResponse
     */
    teams?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    readonly updated_at?: string;
}
/**
 * 
 * @export
 * @interface UserUnbannedEvent
 */
export interface UserUnbannedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserUnbannedEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof UserUnbannedEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof UserUnbannedEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof UserUnbannedEvent
     */
    created_at: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserUnbannedEvent
     */
    shadow: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserUnbannedEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUnbannedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserUnbannedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserUnmutedEvent
 */
export interface UserUnmutedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserUnmutedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserUnmutedEvent
     */
    target_user?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UserUnmutedEvent
     */
    target_users?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserUnmutedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserUnmutedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserUnreadReminderEvent
 */
export interface UserUnreadReminderEvent {
    /**
     * 
     * @type {{ [key: string]: ChannelMessages; }}
     * @memberof UserUnreadReminderEvent
     */
    channels: { [key: string]: ChannelMessages; };
    /**
     * 
     * @type {string}
     * @memberof UserUnreadReminderEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserUnreadReminderEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserUnreadReminderEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserUpdatedEvent
 */
export interface UserUpdatedEvent {
    /**
     * 
     * @type {string}
     * @memberof UserUpdatedEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserUpdatedEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserUpdatedEvent
     */
    user?: UserObject;
}
/**
 * 
 * @export
 * @interface UserWatchingStartEvent
 */
export interface UserWatchingStartEvent {
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStartEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStartEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStartEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStartEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStartEvent
     */
    team?: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStartEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserWatchingStartEvent
     */
    user?: UserObject;
    /**
     * 
     * @type {number}
     * @memberof UserWatchingStartEvent
     */
    watcher_count: number;
}
/**
 * 
 * @export
 * @interface UserWatchingStopEvent
 */
export interface UserWatchingStopEvent {
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStopEvent
     */
    channel_id: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStopEvent
     */
    channel_type: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStopEvent
     */
    cid: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStopEvent
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof UserWatchingStopEvent
     */
    type: string;
    /**
     * 
     * @type {UserObject}
     * @memberof UserWatchingStopEvent
     */
    user?: UserObject;
    /**
     * 
     * @type {number}
     * @memberof UserWatchingStopEvent
     */
    watcher_count: number;
}
/**
 * 
 * @export
 * @interface UsersResponse
 */
export interface UsersResponse {
    /**
     * 
     * @type {string}
     * @memberof UsersResponse
     */
    duration: string;
    /**
     * List of found users
     * @type {Array<UserResponse>}
     * @memberof UsersResponse
     */
    users: Array<UserResponse>;
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
 * This is just a placeholder for all client events
 * @export
 * @interface WSClientEvent
 */
export interface WSClientEvent {
    /**
     * 
     * @type {string}
     * @memberof WSClientEvent
     */
    connection_id?: string;
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
/**
 * 
 * @export
 * @interface XiaomiConfigRequest
 */
export interface XiaomiConfigRequest {
    /**
     * 
     * @type {boolean}
     * @memberof XiaomiConfigRequest
     */
    Disabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof XiaomiConfigRequest
     */
    package_name?: string;
    /**
     * 
     * @type {string}
     * @memberof XiaomiConfigRequest
     */
    secret?: string;
}
