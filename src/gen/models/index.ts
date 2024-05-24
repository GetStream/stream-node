export interface APIError {code: number;

duration: string;

message: string;

more_info: string;

status_code: number;

details: Array<number>;

exception_fields?: {[key: string]: string};

}



export interface APNConfig {auth_key?: string;

auth_type?: string;

bundle_id?: string;

development?: boolean;

disabled?: boolean;

host?: string;

key_id?: string;

notification_template?: string;

p12_cert?: string;

team_id?: string;

}



export interface APNConfigFields {development: boolean;

enabled: boolean;

notification_template: string;

auth_key?: string;

auth_type?: string;

bundle_id?: string;

host?: string;

key_id?: string;

p12_cert?: string;

team_id?: string;

}



export interface APNS {body: string;

title: string;

}



export interface Action {name: string;

text: string;

type: string;

style?: string;

value?: string;

}



export interface AppResponseFields {async_url_enrich_enabled: boolean;

auto_translation_enabled: boolean;

campaign_enabled: boolean;

cdn_expiration_seconds: number;

custom_action_handler_url: string;

disable_auth_checks: boolean;

disable_permissions_checks: boolean;

enforce_unique_usernames: string;

image_moderation_enabled: boolean;

multi_tenant_enabled: boolean;

name: string;

organization: string;

permission_version: string;

polls_enabled: boolean;

reminders_interval: number;

sns_key: string;

sns_secret: string;

sns_topic_arn: string;

sqs_key: string;

sqs_secret: string;

sqs_url: string;

suspended: boolean;

suspended_explanation: string;

video_provider: string;

webhook_url: string;

user_search_disallowed_roles: Array<string>;

webhook_events: Array<string>;

call_types: {[key: string]: CallType};

channel_configs: {[key: string]: ChannelConfig};

file_upload_config: FileUploadConfig;

grants: {[key: string]: Array<string>};

image_upload_config: FileUploadConfig;

policies: {[key: string]: Array<Policy>};

push_notifications: PushNotificationFields;

before_message_send_hook_url?: string;

revoke_tokens_issued_before?: Date;

allowed_flag_reasons?: Array<string>;

geofences?: Array<GeofenceResponse>;

image_moderation_labels?: Array<string>;

agora_options?: Config;

datadog_info?: DataDogInfo;

hms_options?: Config;

}



export interface AsyncModerationCallbackConfig {mode?: string;

server_url?: string;

}



export interface AsyncModerationConfiguration {timeout_ms?: number;

callback?: AsyncModerationCallbackConfig;

}



export interface Attachment {custom: {[key: string]: any};

asset_url?: string;

auth_or_icon?: string;

auth_or_link?: string;

auth_or_name?: string;

color?: string;

fallback?: string;

footer?: string;

footer_icon?: string;

image_url?: string;

og_scrape_url?: string;

original_height?: number;

original_width?: number;

pretext?: string;

text?: string;

thumb_url?: string;

title?: string;

title_link?: string;

type?: string;

actions?: Array<Action>;

fields?: Array<Field>;

giphy?: Images;

}



export interface AudioSettings {access_request_enabled: boolean;

default_device: string;

mic_default_on: boolean;

opus_dtx_enabled: boolean;

redundant_coding_enabled: boolean;

speaker_default_on: boolean;

noise_cancellation?: NoiseCancellationSettings;

}



export interface AudioSettingsRequest {default_device: string;

access_request_enabled?: boolean;

mic_default_on?: boolean;

opus_dtx_enabled?: boolean;

redundant_coding_enabled?: boolean;

speaker_default_on?: boolean;

noise_cancellation?: NoiseCancellationSettings;

}



export interface AudioSettingsResponse {access_request_enabled: boolean;

default_device: string;

mic_default_on: boolean;

opus_dtx_enabled: boolean;

redundant_coding_enabled: boolean;

speaker_default_on: boolean;

noise_cancellation?: NoiseCancellationSettings;

}



export interface AutomodDetails {action?: string;

original_message_type?: string;

image_labels?: Array<string>;

message_details?: FlagMessageDetails;

result?: MessageModerationResult;

}



export interface AzureRequest {abs_account_name: string;

abs_client_id: string;

abs_client_secret: string;

abs_tenant_id: string;

}



export interface BackstageSettings {enabled: boolean;

}



export interface BackstageSettingsRequest {enabled?: boolean;

}



export interface BackstageSettingsResponse {enabled: boolean;

}



export interface BanRequest {target_user_id: string;

banned_by_id?: string;

channel_cid?: string;

ip_ban?: boolean;

reason?: string;

shadow?: boolean;

timeout?: number;

user_id?: string;

banned_by?: UserRequest;

user?: UserRequest;

}



export interface BanResponse {created_at: Date;

expires?: Date;

reason?: string;

shadow?: boolean;

banned_by?: UserObject;

channel?: ChannelResponse;

user?: UserObject;

}



export interface BlockList {name: string;

type: string;

words: Array<string>;

created_at?: Date;

updated_at?: Date;

}



export interface BlockListOptions {behavior: string;

blocklist: string;

}



export interface BlockUserRequest {user_id: string;

}



export interface BlockUserResponse {duration: string;

}



export interface BroadcastSettings {enabled: boolean;

hls: HLSSettings;

}



export interface BroadcastSettingsRequest {enabled?: boolean;

hls?: HLSSettingsRequest;

}



export interface BroadcastSettingsResponse {enabled: boolean;

hls: HLSSettingsResponse;

}



export interface CallEvent {description: string;

end_timestamp: number;

severity: number;

timestamp: number;

type: string;

}



export interface CallIngressResponse {rtmp: RTMPIngress;

}



export interface CallParticipantResponse {joined_at: Date;

role: string;

user_session_id: string;

user: UserResponse;

}



export interface CallRecording {end_time: Date;

filename: string;

start_time: Date;

url: string;

}



export interface CallRequest {created_by_id?: string;

starts_at?: Date;

team?: string;

members?: Array<MemberRequest>;

created_by?: UserRequest;

custom?: {[key: string]: any};

settings_override?: CallSettingsRequest;

}



export interface CallResponse {backstage: boolean;

cid: string;

created_at: Date;

current_session_id: string;

id: string;

recording: boolean;

transcribing: boolean;

type: string;

updated_at: Date;

blocked_user_ids: Array<string>;

created_by: UserResponse;

custom: {[key: string]: any};

egress: EgressResponse;

ingress: CallIngressResponse;

settings: CallSettingsResponse;

ended_at?: Date;

starts_at?: Date;

team?: string;

session?: CallSessionResponse;

thumbnails?: ThumbnailResponse;

}



export interface CallSessionResponse {id: string;

participants: Array<CallParticipantResponse>;

accepted_by: {[key: string]: Date};

participants_count_by_role: {[key: string]: number};

rejected_by: {[key: string]: Date};

ended_at?: Date;

live_ended_at?: Date;

live_started_at?: Date;

started_at?: Date;

}



export interface CallSettings {audio?: AudioSettings;

backstage?: BackstageSettings;

broadcasting?: BroadcastSettings;

geofencing?: GeofenceSettings;

recording?: RecordSettings;

ring?: RingSettings;

screensharing?: ScreensharingSettings;

thumbnails?: ThumbnailsSettings;

transcription?: TranscriptionSettings;

video?: VideoSettings;

}



export interface CallSettingsRequest {audio?: AudioSettingsRequest;

backstage?: BackstageSettingsRequest;

broadcasting?: BroadcastSettingsRequest;

geofencing?: GeofenceSettingsRequest;

recording?: RecordSettingsRequest;

ring?: RingSettingsRequest;

screensharing?: ScreensharingSettingsRequest;

thumbnails?: ThumbnailsSettingsRequest;

transcription?: TranscriptionSettingsRequest;

video?: VideoSettingsRequest;

}



export interface CallSettingsResponse {audio: AudioSettingsResponse;

backstage: BackstageSettingsResponse;

broadcasting: BroadcastSettingsResponse;

geofencing: GeofenceSettingsResponse;

recording: RecordSettingsResponse;

ring: RingSettingsResponse;

screensharing: ScreensharingSettingsResponse;

thumbnails: ThumbnailsSettingsResponse;

transcription: TranscriptionSettingsResponse;

video: VideoSettingsResponse;

}



export interface CallStateResponseFields {members: Array<MemberResponse>;

own_capabilities: Array<OwnCapability>;

call: CallResponse;

}



export interface CallStatsReportSummaryResponse {call_cid: string;

call_duration_seconds: number;

call_session_id: string;

call_status: string;

first_stats_time: Date;

created_at?: Date;

quality_score?: number;

}



export interface CallTimeline {events: Array<CallEvent>;

}



export interface CallTranscription {end_time: Date;

filename: string;

start_time: Date;

url: string;

}



export interface CallType {app_pk: number;

created_at: Date;

external_storage: string;

name: string;

pk: number;

updated_at: Date;

notification_settings?: NotificationSettings;

settings?: CallSettings;

}



export interface CallTypeResponse {created_at: Date;

name: string;

updated_at: Date;

grants: {[key: string]: Array<string>};

notification_settings: NotificationSettings;

settings: CallSettingsResponse;

external_storage?: string;

}



export interface CastPollVoteRequest {user_id?: string;

user?: UserRequest;

vote?: VoteData;

}



export interface Channel {auto_translation_language: string;

cid: string;

created_at: Date;

disabled: boolean;

frozen: boolean;

id: string;

type: string;

updated_at: Date;

custom: {[key: string]: any};

auto_translation_enabled?: boolean;

cooldown?: number;

deleted_at?: Date;

last_message_at?: Date;

member_count?: number;

team?: string;

invites?: Array<ChannelMember>;

members?: Array<ChannelMember>;

config?: ChannelConfig;

config_overrides?: ChannelConfig;

created_by?: UserObject;

truncated_by?: UserObject;

}



export interface ChannelConfig {automod: string;

automod_behavior: string;

connect_events: boolean;

created_at: Date;

custom_events: boolean;

mark_messages_pending: boolean;

max_message_length: number;

mutes: boolean;

name: string;

polls: boolean;

push_notifications: boolean;

quotes: boolean;

reactions: boolean;

read_events: boolean;

reminders: boolean;

replies: boolean;

search: boolean;

typing_events: boolean;

updated_at: Date;

uploads: boolean;

url_enrichment: boolean;

commands: Array<string>;

blocklist?: string;

blocklist_behavior?: string;

allowed_flag_reasons?: Array<string>;

blocklists?: Array<BlockListOptions>;

automod_thresholds?: Thresholds;

}



export interface ChannelConfigWithInfo {automod: string;

automod_behavior: string;

connect_events: boolean;

created_at: Date;

custom_events: boolean;

mark_messages_pending: boolean;

max_message_length: number;

mutes: boolean;

name: string;

polls: boolean;

push_notifications: boolean;

quotes: boolean;

reactions: boolean;

read_events: boolean;

reminders: boolean;

replies: boolean;

search: boolean;

typing_events: boolean;

updated_at: Date;

uploads: boolean;

url_enrichment: boolean;

commands: Array<Command>;

blocklist?: string;

blocklist_behavior?: string;

allowed_flag_reasons?: Array<string>;

blocklists?: Array<BlockListOptions>;

automod_thresholds?: Thresholds;

grants?: {[key: string]: Array<string>};

}



export interface ChannelExport {cid?: string;

id?: string;

messages_since?: Date;

messages_until?: Date;

type?: string;

}



export interface ChannelGetOrCreateRequest {hide_for_creator?: boolean;

state?: boolean;

thread_unread_counts?: boolean;

data?: ChannelInput;

members?: PaginationParams;

messages?: MessagePaginationParams;

watchers?: PaginationParams;

}



export interface ChannelInput {auto_translation_enabled?: boolean;

auto_translation_language?: string;

created_by_id?: string;

disabled?: boolean;

frozen?: boolean;

team?: string;

truncated_by_id?: string;

invites?: Array<ChannelMember>;

members?: Array<ChannelMember>;

config_overrides?: ChannelConfig;

created_by?: UserObject;

custom?: {[key: string]: any};

}



export interface ChannelMember {banned: boolean;

channel_role: string;

created_at: Date;

notifications_muted: boolean;

shadow_banned: boolean;

updated_at: Date;

ban_expires?: Date;

deleted_at?: Date;

invite_accepted_at?: Date;

invite_rejected_at?: Date;

invited?: boolean;

is_moderator?: boolean;

status?: string;

user_id?: string;

user?: UserObject;

}



export interface ChannelMute {created_at: Date;

updated_at: Date;

expires?: Date;

channel?: ChannelResponse;

user?: UserObject;

}



export interface ChannelResponse {cid: string;

created_at: Date;

disabled: boolean;

frozen: boolean;

id: string;

type: string;

updated_at: Date;

custom: {[key: string]: any};

auto_translation_enabled?: boolean;

auto_translation_language?: string;

cooldown?: number;

deleted_at?: Date;

hidden?: boolean;

hide_messages_before?: Date;

last_message_at?: Date;

member_count?: number;

mute_expires_at?: Date;

muted?: boolean;

team?: string;

truncated_at?: Date;

members?: Array<ChannelMember>;

own_capabilities?: Array<string>;

config?: ChannelConfigWithInfo;

created_by?: UserObject;

truncated_by?: UserObject;

}



export interface ChannelStateResponse {duration: string;

members: Array<ChannelMember>;

messages: Array<MessageResponse>;

pinned_messages: Array<MessageResponse>;

threads: Array<ThreadState>;

hidden?: boolean;

hide_messages_before?: Date;

watcher_count?: number;

pending_messages?: Array<PendingMessage>;

read?: Array<ReadStateResponse>;

watchers?: Array<UserResponse>;

channel?: ChannelResponse;

membership?: ChannelMember;

}



export interface ChannelStateResponseFields {members: Array<ChannelMember>;

messages: Array<MessageResponse>;

pinned_messages: Array<MessageResponse>;

threads: Array<ThreadState>;

hidden?: boolean;

hide_messages_before?: Date;

watcher_count?: number;

pending_messages?: Array<PendingMessage>;

read?: Array<ReadStateResponse>;

watchers?: Array<UserResponse>;

channel?: ChannelResponse;

membership?: ChannelMember;

}



export interface ChannelTypeConfig {automod: string;

automod_behavior: string;

connect_events: boolean;

created_at: Date;

custom_events: boolean;

mark_messages_pending: boolean;

max_message_length: number;

mutes: boolean;

name: string;

polls: boolean;

push_notifications: boolean;

quotes: boolean;

reactions: boolean;

read_events: boolean;

reminders: boolean;

replies: boolean;

search: boolean;

typing_events: boolean;

updated_at: Date;

uploads: boolean;

url_enrichment: boolean;

commands: Array<Command>;

permissions: Array<PolicyRequest>;

grants: {[key: string]: Array<string>};

blocklist?: string;

blocklist_behavior?: string;

allowed_flag_reasons?: Array<string>;

blocklists?: Array<BlockListOptions>;

automod_thresholds?: Thresholds;

}



export interface CheckExternalStorageResponse {duration: string;

}



export interface CheckPushRequest {apn_template?: string;

firebase_data_template?: string;

firebase_template?: string;

message_id?: string;

push_provider_name?: string;

push_provider_type?: string;

skip_devices?: boolean;

user_id?: string;

user?: UserRequest;

}



export interface CheckPushResponse {duration: string;

rendered_apn_template?: string;

rendered_firebase_template?: string;

skip_devices?: boolean;

general_errors?: Array<string>;

device_errors?: {[key: string]: DeviceErrorInfo};

rendered_message?: {[key: string]: string};

}



export interface CheckSNSRequest {sns_key?: string;

sns_secret?: string;

sns_topic_arn?: string;

}



export interface CheckSNSResponse {duration: string;

status: string;

error?: string;

data?: {[key: string]: any};

}



export interface CheckSQSRequest {sqs_key?: string;

sqs_secret?: string;

sqs_url?: string;

}



export interface CheckSQSResponse {duration: string;

status: string;

error?: string;

data?: {[key: string]: any};

}



export interface CollectUserFeedbackRequest {rating: number;

sdk: string;

sdk_version: string;

user_session_id: string;

reason?: string;

custom?: {[key: string]: any};

}



export interface CollectUserFeedbackResponse {duration: string;

}



export interface Command {args: string;

description: string;

name: string;

set: string;

created_at?: Date;

updated_at?: Date;

}



export interface CommitMessageRequest {}



export interface Config {app_certificate: string;

app_id: string;

default_role?: string;

role_map?: {[key: string]: string};

}



export interface Coordinates {latitude: number;

longitude: number;

}



export interface CreateBlockListRequest {name: string;

words: Array<string>;

type?: string;

}



export interface CreateCallTypeRequest {name: string;

external_storage?: string;

grants?: {[key: string]: Array<string>};

notification_settings?: NotificationSettings;

settings?: CallSettingsRequest;

}



export interface CreateCallTypeResponse {created_at: Date;

duration: string;

name: string;

updated_at: Date;

grants: {[key: string]: Array<string>};

notification_settings: NotificationSettings;

settings: CallSettingsResponse;

external_storage?: string;

}



export interface CreateChannelTypeRequest {automod: string;

automod_behavior: string;

max_message_length: number;

name: string;

blocklist?: string;

blocklist_behavior?: string;

connect_events?: boolean;

custom_events?: boolean;

mark_messages_pending?: boolean;

message_retention?: string;

mutes?: boolean;

polls?: boolean;

push_notifications?: boolean;

reactions?: boolean;

read_events?: boolean;

replies?: boolean;

search?: boolean;

typing_events?: boolean;

uploads?: boolean;

url_enrichment?: boolean;

blocklists?: Array<BlockListOptions>;

commands?: Array<string>;

permissions?: Array<PolicyRequest>;

grants?: {[key: string]: Array<string>};

}



export interface CreateChannelTypeResponse {automod: string;

automod_behavior: string;

connect_events: boolean;

created_at: Date;

custom_events: boolean;

duration: string;

mark_messages_pending: boolean;

max_message_length: number;

mutes: boolean;

name: string;

polls: boolean;

push_notifications: boolean;

quotes: boolean;

reactions: boolean;

read_events: boolean;

reminders: boolean;

replies: boolean;

search: boolean;

typing_events: boolean;

updated_at: Date;

uploads: boolean;

url_enrichment: boolean;

commands: Array<string>;

permissions: Array<PolicyRequest>;

grants: {[key: string]: Array<string>};

blocklist?: string;

blocklist_behavior?: string;

allowed_flag_reasons?: Array<string>;

blocklists?: Array<BlockListOptions>;

automod_thresholds?: Thresholds;

}



export interface CreateCommandRequest {description: string;

name: string;

args?: string;

set?: string;

}



export interface CreateCommandResponse {duration: string;

command?: Command;

}



export interface CreateDeviceRequest {id: string;

push_provider: string;

push_provider_name?: string;

user_id?: string;

voip_token?: boolean;

user?: UserRequest;

}



export interface CreateExternalStorageRequest {bucket: string;

name: string;

storage_type: string;

gcs_credentials?: string;

path?: string;

aws_s3?: S3Request;

azure_blob?: AzureRequest;

}



export interface CreateExternalStorageResponse {duration: string;

}



export interface CreateGuestRequest {user: UserRequest;

}



export interface CreateGuestResponse {access_token: string;

duration: string;

user: UserResponse;

}



export interface CreateImportRequest {mode: string;

path: string;

}



export interface CreateImportResponse {duration: string;

import_task?: ImportTask;

}



export interface CreateImportURLRequest {filename?: string;

}



export interface CreateImportURLResponse {duration: string;

path: string;

upload_url: string;

}



export interface CreatePollOptionRequest {text: string;

position?: number;

user_id?: string;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface CreatePollRequest {name: string;

allow_answers?: boolean;

allow_user_suggested_options?: boolean;

description?: string;

enforce_unique_vote?: boolean;

id?: string;

is_closed?: boolean;

max_votes_allowed?: number;

user_id?: string;

voting_visibility?: string;

options?: Array<PollOptionInput>;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface CreateRoleRequest {name: string;

}



export interface CreateRoleResponse {duration: string;

role: Role;

}



export interface DataDogInfo {api_key?: string;

enabled?: boolean;

site?: string;

}



export interface DeactivateUserRequest {created_by_id?: string;

mark_messages_deleted?: boolean;

}



export interface DeactivateUserResponse {duration: string;

user?: UserObject;

}



export interface DeactivateUsersRequest {user_ids: Array<string>;

created_by_id?: string;

mark_channels_deleted?: boolean;

mark_messages_deleted?: boolean;

}



export interface DeactivateUsersResponse {duration: string;

task_id: string;

}



export interface DeleteChannelResponse {duration: string;

channel?: ChannelResponse;

}



export interface DeleteChannelsRequest {cids: Array<string>;

hard_delete?: boolean;

}



export interface DeleteChannelsResponse {duration: string;

task_id?: string;

result?: {[key: string]: DeleteChannelsResult};

}



export interface DeleteChannelsResult {status: string;

error?: string;

}



export interface DeleteCommandResponse {duration: string;

name: string;

}



export interface DeleteExternalStorageResponse {duration: string;

}



export interface DeleteMessageResponse {duration: string;

message: MessageResponse;

}



export interface DeleteRecordingResponse {duration: string;

}



export interface DeleteTranscriptionResponse {duration: string;

}



export interface DeleteUsersRequest {user_ids: Array<string>;

calls?: string;

conversations?: string;

messages?: string;

new_call_owner_id?: string;

new_channel_owner_id?: string;

user?: string;

}



export interface DeleteUsersResponse {duration: string;

task_id: string;

}



export interface Device {created_at: Date;

id: string;

push_provider: string;

user_id: string;

disabled?: boolean;

disabled_reason?: string;

push_provider_name?: string;

voip?: boolean;

}



export interface DeviceErrorInfo {error_message: string;

provider: string;

provider_name: string;

}



export interface EdgeResponse {continent_code: string;

country_iso_code: string;

green: number;

id: string;

latency_test_url: string;

latitude: number;

longitude: number;

red: number;

subdivision_iso_code: string;

yellow: number;

}



export interface EgressHLSResponse {playlist_url: string;

}



export interface EgressRTMPResponse {name: string;

stream_key: string;

url: string;

}



export interface EgressResponse {broadcasting: boolean;

rtmp_s: Array<EgressRTMPResponse>;

hls?: EgressHLSResponse;

}



export interface EndCallRequest {}



export interface EndCallResponse {duration: string;

}



export interface ErrorResult {type: string;

stacktrace?: string;

version?: string;

}



export interface EventNotificationSettings {enabled: boolean;

apns: APNS;

}



export interface EventRequest {type: string;

parent_id?: string;

user_id?: string;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface EventResponse {duration: string;

event: WSEvent;

}



export interface ExportChannelsRequest {channels: Array<ChannelExport>;

clear_deleted_message_text?: boolean;

export_users?: boolean;

include_soft_deleted_channels?: boolean;

include_truncated_messages?: boolean;

version?: string;

}



export interface ExportChannelsResponse {duration: string;

task_id: string;

}



export interface ExportChannelsResult {url: string;

path?: string;

s3_bucket_name?: string;

}



export interface ExportUserResponse {duration: string;

messages?: Array<Message>;

reactions?: Array<Reaction>;

user?: UserObject;

}



export interface ExportUsersRequest {user_ids: Array<string>;

}



export interface ExportUsersResponse {duration: string;

task_id: string;

}



export interface ExternalStorageResponse {bucket: string;

name: string;

path: string;

type: string;

}



export interface Field {short: boolean;

title: string;

value: string;

}



export interface FileDeleteResponse {duration: string;

}



export interface FileUploadConfig {size_limit: number;

allowed_file_extensions?: Array<string>;

allowed_mime_types?: Array<string>;

blocked_file_extensions?: Array<string>;

blocked_mime_types?: Array<string>;

}



export interface FileUploadRequest {file?: string;

user?: OnlyUserID;

}



export interface FileUploadResponse {duration: string;

file?: string;

thumb_url?: string;

}



export interface FirebaseConfig {apn_template?: string;

credentials_json?: string;

data_template?: string;

disabled?: boolean;

notification_template?: string;

server_key?: string;

}



export interface FirebaseConfigFields {apn_template: string;

data_template: string;

enabled: boolean;

notification_template: string;

credentials_json?: string;

server_key?: string;

}



export interface Flag {created_at: Date;

created_by_automod: boolean;

updated_at: Date;

app_roved_at?: Date;

reason?: string;

rejected_at?: Date;

reviewed_at?: Date;

reviewed_by?: string;

target_message_id?: string;

custom?: {[key: string]: any};

details?: FlagDetails;

target_message?: Message;

target_user?: UserObject;

user?: UserObject;

}



export interface FlagDetails {original_text: string;

extra: {[key: string]: any};

automod?: AutomodDetails;

}



export interface FlagFeedback {created_at: Date;

message_id: string;

labels: Array<Label>;

}



export interface FlagMessageDetails {pin_changed?: boolean;

should_enrich?: boolean;

skip_push?: boolean;

updated_by_id?: string;

}



export interface FlagRequest {reason?: string;

target_message_id?: string;

target_user_id?: string;

user_id?: string;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface FlagResponse {duration: string;

flag?: Flag;

}



export interface FullUserResponse {banned: boolean;

created_at: Date;

id: string;

invisible: boolean;

language: string;

online: boolean;

role: string;

shadow_banned: boolean;

total_unread_count: number;

unread_channels: number;

unread_threads: number;

updated_at: Date;

channel_mutes: Array<ChannelMute>;

devices: Array<Device>;

mutes: Array<UserMute>;

teams: Array<string>;

custom: {[key: string]: any};

deactivated_at?: Date;

deleted_at?: Date;

image?: string;

last_active?: Date;

name?: string;

revoke_tokens_issued_before?: Date;

latest_hidden_channels?: Array<string>;

privacy_settings?: PrivacySettings;

push_notifications?: PushNotificationSettings;

}



export interface GeofenceResponse {name: string;

description?: string;

type?: string;

country_codes?: Array<string>;

}



export interface GeofenceSettings {names: Array<string>;

}



export interface GeofenceSettingsRequest {names?: Array<string>;

}



export interface GeofenceSettingsResponse {names: Array<string>;

}



export interface GeolocationResult {accuracy_radius: number;

city: string;

continent: string;

continent_code: string;

country: string;

country_iso_code: string;

latitude: number;

longitude: number;

subdivision: string;

subdivision_iso_code: string;

}



export interface GetApplicationResponse {duration: string;

app: AppResponseFields;

}



export interface GetBlockListResponse {duration: string;

blocklist?: BlockList;

}



export interface GetCallResponse {duration: string;

members: Array<MemberResponse>;

own_capabilities: Array<OwnCapability>;

call: CallResponse;

}



export interface GetCallStatsResponse {call_duration_seconds: number;

call_status: string;

duration: string;

max_freezes_duration_seconds: number;

max_participants: number;

max_total_quality_limitation_duration_seconds: number;

publishing_participants: number;

quality_score: number;

sfu_count: number;

participant_report: Array<UserStats>;

sfus: Array<SFULocationResponse>;

call_timeline?: CallTimeline;

jitter?: Stats;

latency?: Stats;

}



export interface GetCallTypeResponse {created_at: Date;

duration: string;

name: string;

updated_at: Date;

grants: {[key: string]: Array<string>};

notification_settings: NotificationSettings;

settings: CallSettingsResponse;

external_storage?: string;

}



export interface GetCommandResponse {args: string;

description: string;

duration: string;

name: string;

set: string;

created_at?: Date;

updated_at?: Date;

}



export interface GetCustomPermissionResponse {duration: string;

permission: Permission;

}



export interface GetEdgesResponse {duration: string;

edges: Array<EdgeResponse>;

}



export interface GetExportChannelsStatusResponse {created_at: Date;

duration: string;

status: string;

task_id: string;

updated_at: Date;

error?: ErrorResult;

result?: ExportChannelsResult;

}



export interface GetImportResponse {duration: string;

import_task?: ImportTask;

}



export interface GetManyMessagesResponse {duration: string;

messages: Array<Message>;

}



export interface GetMessageResponse {duration: string;

message: MessageWithChannelResponse;

pending_message_metadata?: {[key: string]: string};

}



export interface GetOGResponse {duration: string;

custom: {[key: string]: any};

asset_url?: string;

auth_or_icon?: string;

auth_or_link?: string;

auth_or_name?: string;

color?: string;

fallback?: string;

footer?: string;

footer_icon?: string;

image_url?: string;

og_scrape_url?: string;

original_height?: number;

original_width?: number;

pretext?: string;

text?: string;

thumb_url?: string;

title?: string;

title_link?: string;

type?: string;

actions?: Array<Action>;

fields?: Array<Field>;

giphy?: Images;

}



export interface GetOrCreateCallRequest {members_limit?: number;

notify?: boolean;

ring?: boolean;

data?: CallRequest;

}



export interface GetOrCreateCallResponse {created: boolean;

duration: string;

members: Array<MemberResponse>;

own_capabilities: Array<OwnCapability>;

call: CallResponse;

}



export interface GetRateLimitsResponse {duration: string;

android?: {[key: string]: LimitInfo};

ios?: {[key: string]: LimitInfo};

server_side?: {[key: string]: LimitInfo};

web?: {[key: string]: LimitInfo};

}



export interface GetReactionsResponse {duration: string;

reactions: Array<Reaction>;

}



export interface GetRepliesResponse {duration: string;

messages: Array<MessageResponse>;

}



export interface GetTaskResponse {created_at: Date;

duration: string;

status: string;

task_id: string;

updated_at: Date;

error?: ErrorResult;

result?: {[key: string]: any};

}



export interface GetThreadResponse {duration: string;

thread: ThreadStateResponse;

}



export interface GoLiveRequest {recording_storage_name?: string;

start_hls?: boolean;

start_recording?: boolean;

start_transcription?: boolean;

transcription_storage_name?: string;

}



export interface GoLiveResponse {duration: string;

call: CallResponse;

}



export interface HLSSettings {auto_on: boolean;

enabled: boolean;

quality_tracks: Array<string>;

layout?: LayoutSettings;

}



export interface HLSSettingsRequest {quality_tracks: Array<string>;

auto_on?: boolean;

enabled?: boolean;

layout?: LayoutSettingsRequest;

}



export interface HLSSettingsResponse {auto_on: boolean;

enabled: boolean;

quality_tracks: Array<string>;

layout: LayoutSettingsResponse;

}



export interface HideChannelRequest {clear_history?: boolean;

user_id?: string;

user?: UserRequest;

}



export interface HideChannelResponse {duration: string;

}



export interface HuaweiConfig {disabled?: boolean;

id?: string;

secret?: string;

}



export interface HuaweiConfigFields {enabled: boolean;

id?: string;

secret?: string;

}



export interface ImageData {frames: string;

height: string;

size: string;

url: string;

width: string;

}



export interface ImageSize {crop?: string;

height?: number;

resize?: string;

width?: number;

}



export interface ImageUploadRequest {file?: string;

upload_sizes?: Array<ImageSize>;

user?: OnlyUserID;

}



export interface ImageUploadResponse {duration: string;

file?: string;

thumb_url?: string;

upload_sizes?: Array<ImageSize>;

}



export interface Images {fixed_height: ImageData;

fixed_height_downsampled: ImageData;

fixed_height_still: ImageData;

fixed_width: ImageData;

fixed_width_downsampled: ImageData;

fixed_width_still: ImageData;

original: ImageData;

}



export interface ImportTask {created_at: Date;

id: string;

mode: string;

path: string;

state: string;

updated_at: Date;

history: Array<ImportTaskHistory>;

size?: number;

}



export interface ImportTaskHistory {created_at: Date;

next_state: string;

prev_state: string;

}



export interface Label {name: string;

harm_labels?: Array<string>;

phrase_list_ids?: Array<number>;

}



export interface LabelThresholds {block?: number;

flag?: number;

}



export interface LayoutSettings {external_app_url: string;

external_css_url: string;

name: string;

options?: {[key: string]: any};

}



export interface LayoutSettingsRequest {name: string;

external_app_url?: string;

external_css_url?: string;

options?: {[key: string]: any};

}



export interface LayoutSettingsResponse {external_app_url: string;

external_css_url: string;

name: string;

options?: {[key: string]: any};

}



export interface LimitInfo {limit: number;

remaining: number;

reset: number;

}



export interface ListBlockListResponse {duration: string;

blocklists: Array<BlockList>;

}



export interface ListCallTypeResponse {duration: string;

call_types: {[key: string]: CallTypeResponse};

}



export interface ListChannelTypesResponse {duration: string;

channel_types: {[key: string]: ChannelTypeConfig};

}



export interface ListCommandsResponse {duration: string;

commands: Array<Command>;

}



export interface ListDevicesResponse {duration: string;

devices: Array<Device>;

}



export interface ListExternalStorageResponse {duration: string;

external_storages: {[key: string]: ExternalStorageResponse};

}



export interface ListImportsResponse {duration: string;

import_tasks: Array<ImportTask>;

}



export interface ListPermissionsResponse {duration: string;

permissions: Array<Permission>;

}



export interface ListPushProvidersResponse {duration: string;

push_providers: Array<PushProviderResponse>;

}



export interface ListRecordingsResponse {duration: string;

recordings: Array<CallRecording>;

}



export interface ListRolesResponse {duration: string;

roles: Array<Role>;

}



export interface ListTranscriptionsResponse {duration: string;

transcriptions: Array<CallTranscription>;

}



export interface Location {continent_code: string;

country_iso_code: string;

subdivision_iso_code: string;

}



export interface MOSStats {average_score: number;

max_score: number;

min_score: number;

hist_og_ram_duration_seconds: Array<number>;

}



export interface MarkChannelsReadRequest {user_id?: string;

read_by_channel?: {[key: string]: string};

user?: UserRequest;

}



export interface MarkReadRequest {message_id?: string;

thread_id?: string;

user_id?: string;

user?: UserRequest;

}



export interface MarkReadResponse {duration: string;

event?: MessageReadEvent;

}



export interface MarkUnreadRequest {message_id?: string;

thread_id?: string;

user_id?: string;

user?: UserRequest;

}



export interface MediaPubSubHint {audio_published: boolean;

audio_subscribed: boolean;

video_published: boolean;

video_subscribed: boolean;

}



export interface MemberRequest {user_id: string;

role?: string;

custom?: {[key: string]: any};

}



export interface MemberResponse {created_at: Date;

updated_at: Date;

user_id: string;

custom: {[key: string]: any};

user: UserResponse;

deleted_at?: Date;

role?: string;

}



export interface MembersResponse {duration: string;

members: Array<ChannelMember>;

}



export interface Message {cid: string;

created_at: Date;

deleted_reply_count: number;

html: string;

id: string;

pinned: boolean;

reply_count: number;

shadowed: boolean;

silent: boolean;

text: string;

type: string;

updated_at: Date;

attachments: Array<Attachment>;

latest_reactions: Array<Reaction>;

mentioned_users: Array<UserObject>;

own_reactions: Array<Reaction>;

custom: {[key: string]: any};

reaction_counts: {[key: string]: number};

reaction_groups: {[key: string]: ReactionGroupResponse};

reaction_scores: {[key: string]: number};

before_message_send_failed?: boolean;

command?: string;

deleted_at?: Date;

message_text_updated_at?: Date;

mml?: string;

parent_id?: string;

pin_expires?: Date;

pinned_at?: Date;

poll_id?: string;

quoted_message_id?: string;

show_in_channel?: boolean;

thread_participants?: Array<UserObject>;

i18n?: {[key: string]: string};

image_labels?: {[key: string]: Array<string>};

pinned_by?: UserObject;

poll?: Poll;

quoted_message?: Message;

user?: UserObject;

}



export interface MessageActionRequest {form_data: {[key: string]: string};

user_id?: string;

user?: UserRequest;

}



export interface MessageChangeSet {attachments: boolean;

custom: boolean;

html: boolean;

mentioned_user_ids: boolean;

mml: boolean;

pin: boolean;

quoted_message_id: boolean;

silent: boolean;

text: boolean;

}



export interface MessageFlag {created_at: Date;

created_by_automod: boolean;

updated_at: Date;

app_roved_at?: Date;

reason?: string;

rejected_at?: Date;

reviewed_at?: Date;

custom?: {[key: string]: any};

details?: FlagDetails;

message?: Message;

moderation_feedback?: FlagFeedback;

moderation_result?: MessageModerationResult;

reviewed_by?: UserObject;

user?: UserObject;

}



export interface MessageHistoryEntry {message_id: string;

message_updated_at: Date;

message_updated_by_id: string;

text: string;

attachments: Array<Attachment>;

custom: {[key: string]: any};

}



export interface MessageModerationResult {action: string;

created_at: Date;

message_id: string;

updated_at: Date;

user_bad_karma: boolean;

user_karma: number;

blocked_word?: string;

blocklist_name?: string;

moderated_by?: string;

ai_moderation_response?: ModerationResponse;

moderation_thresholds?: Thresholds;

}



export interface MessagePaginationParams {}



export interface MessageReadEvent {channel_id: string;

channel_type: string;

cid: string;

created_at: Date;

type: string;

last_read_message_id?: string;

team?: string;

thread?: Thread;

user?: UserObject;

}



export interface MessageRequest {html?: string;

id?: string;

mml?: string;

parent_id?: string;

pin_expires?: Date;

pinned?: boolean;

pinned_at?: Date;

poll_id?: string;

quoted_message_id?: string;

show_in_channel?: boolean;

silent?: boolean;

text?: string;

type?: string;

user_id?: string;

attachments?: Array<Attachment>;

mentioned_users?: Array<string>;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface MessageResponse {cid: string;

created_at: Date;

deleted_reply_count: number;

html: string;

id: string;

pinned: boolean;

reply_count: number;

shadowed: boolean;

silent: boolean;

text: string;

type: string;

updated_at: Date;

attachments: Array<Attachment>;

latest_reactions: Array<ReactionResponse>;

mentioned_users: Array<UserResponse>;

own_reactions: Array<ReactionResponse>;

custom: {[key: string]: any};

reaction_counts: {[key: string]: number};

reaction_scores: {[key: string]: number};

user: UserResponse;

command?: string;

deleted_at?: Date;

message_text_updated_at?: Date;

mml?: string;

parent_id?: string;

pin_expires?: Date;

pinned_at?: Date;

poll_id?: string;

quoted_message_id?: string;

show_in_channel?: boolean;

thread_participants?: Array<UserResponse>;

i18n?: {[key: string]: string};

image_labels?: {[key: string]: Array<string>};

pinned_by?: UserResponse;

poll?: Poll;

quoted_message?: Message;

reaction_groups?: {[key: string]: ReactionGroupResponse};

}



export interface MessageUpdate {old_text?: string;

change_set?: MessageChangeSet;

}



export interface MessageWithChannelResponse {cid: string;

created_at: Date;

deleted_reply_count: number;

html: string;

id: string;

pinned: boolean;

reply_count: number;

shadowed: boolean;

silent: boolean;

text: string;

type: string;

updated_at: Date;

attachments: Array<Attachment>;

latest_reactions: Array<ReactionResponse>;

mentioned_users: Array<UserResponse>;

own_reactions: Array<ReactionResponse>;

channel: ChannelResponse;

custom: {[key: string]: any};

reaction_counts: {[key: string]: number};

reaction_scores: {[key: string]: number};

user: UserResponse;

command?: string;

deleted_at?: Date;

message_text_updated_at?: Date;

mml?: string;

parent_id?: string;

pin_expires?: Date;

pinned_at?: Date;

poll_id?: string;

quoted_message_id?: string;

show_in_channel?: boolean;

thread_participants?: Array<UserResponse>;

i18n?: {[key: string]: string};

image_labels?: {[key: string]: Array<string>};

pinned_by?: UserResponse;

poll?: Poll;

quoted_message?: Message;

reaction_groups?: {[key: string]: ReactionGroupResponse};

}



export interface ModerationResponse {action: string;

explicit: number;

spam: number;

toxic: number;

}



export interface MuteChannelRequest {expiration?: number;

user_id?: string;

channel_cids?: Array<string>;

user?: UserRequest;

}



export interface MuteChannelResponse {duration: string;

channel_mutes?: Array<ChannelMute>;

channel_mute?: ChannelMute;

own_user?: OwnUser;

}



export interface MuteUserRequest {timeout: number;

user_id?: string;

target_ids?: Array<string>;

user?: UserRequest;

}



export interface MuteUserResponse {duration: string;

mutes?: Array<UserMute>;

non_existing_users?: Array<string>;

mute?: UserMute;

own_user?: OwnUser;

}



export interface MuteUsersRequest {audio?: boolean;

mute_all_users?: boolean;

muted_by_id?: string;

screenshare?: boolean;

screenshare_audio?: boolean;

video?: boolean;

user_ids?: Array<string>;

muted_by?: UserRequest;

}



export interface MuteUsersResponse {duration: string;

}



export interface NoiseCancellationSettings {mode: string;

}



export interface NotificationSettings {enabled: boolean;

call_live_started: EventNotificationSettings;

call_notification: EventNotificationSettings;

call_ring: EventNotificationSettings;

session_started: EventNotificationSettings;

}



export interface NullBool {has_value?: boolean;

value?: boolean;

}



export interface NullTime {has_value?: boolean;

value?: Date;

}



export interface OnlyUserID {id: string;

}



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
    UPDATE_CALL_SETTINGS: 'update-call-settings',
} as const;

export type OwnCapability = typeof OwnCapability[keyof typeof OwnCapability]



export interface OwnUser {banned: boolean;

created_at: Date;

id: string;

language: string;

online: boolean;

role: string;

total_unread_count: number;

unread_channels: number;

unread_count: number;

unread_threads: number;

updated_at: Date;

channel_mutes: Array<ChannelMute>;

devices: Array<Device>;

mutes: Array<UserMute>;

custom: {[key: string]: any};

deactivated_at?: Date;

deleted_at?: Date;

invisible?: boolean;

last_active?: Date;

latest_hidden_channels?: Array<string>;

teams?: Array<string>;

privacy_settings?: PrivacySettings;

push_notifications?: PushNotificationSettings;

}



export interface PaginationParams {limit?: number;

offset?: number;

}



export interface PendingMessage {channel?: Channel;

message?: Message;

metadata?: {[key: string]: string};

user?: UserObject;

}



export interface Permission {action: string;

custom: boolean;

description: string;

id: string;

level: string;

name: string;

owner: boolean;

same_team: boolean;

tags: Array<string>;

condition?: {[key: string]: any};

}



export interface PinRequest {session_id: string;

user_id: string;

}



export interface PinResponse {duration: string;

}



export interface Policy {action: number;

created_at: Date;

name: string;

owner: boolean;

priority: number;

updated_at: Date;

resources: Array<string>;

roles: Array<string>;

}



export interface PolicyRequest {action: string;

name: string;

owner: boolean;

priority: number;

resources: Array<string>;

roles: Array<string>;

}



export interface Poll {allow_answers: boolean;

allow_user_suggested_options: boolean;

answers_count: number;

created_at: Date;

created_by_id: string;

description: string;

enforce_unique_vote: boolean;

id: string;

name: string;

updated_at: Date;

vote_count: number;

latest_answers: Array<PollVote>;

options: Array<PollOption>;

own_votes: Array<PollVote>;

custom: {[key: string]: any};

latest_votes_by_option: {[key: string]: Array<PollVote | null>};

vote_counts_by_option: {[key: string]: number};

is_closed?: boolean;

max_votes_allowed?: number;

voting_visibility?: string;

created_by?: UserObject;

}



export interface PollOption {id: string;

text: string;

custom: {[key: string]: any};

}



export interface PollOptionInput {text?: string;

custom?: {[key: string]: any};

}



export interface PollOptionResponse {duration: string;

poll_option: PollOptionResponseData;

}



export interface PollOptionResponseData {id: string;

text: string;

custom: {[key: string]: any};

}



export interface PollResponse {duration: string;

poll: PollResponseData;

}



export interface PollResponseData {allow_answers: boolean;

allow_user_suggested_options: boolean;

answers_count: number;

created_at: Date;

created_by_id: string;

description: string;

enforce_unique_vote: boolean;

id: string;

name: string;

updated_at: Date;

vote_count: number;

voting_visibility: string;

options: Array<PollOptionResponseData>;

own_votes: Array<PollVoteResponseData>;

custom: {[key: string]: any};

latest_votes_by_option: {[key: string]: Array<PollVoteResponseData | null>};

vote_counts_by_option: {[key: string]: number};

is_closed?: boolean;

max_votes_allowed?: number;

created_by?: UserObject;

}



export interface PollVote {created_at: Date;

id: string;

option_id: string;

poll_id: string;

updated_at: Date;

answer_text?: string;

is_answer?: boolean;

user_id?: string;

user?: UserObject;

}



export interface PollVoteResponse {duration: string;

vote?: PollVoteResponseData;

}



export interface PollVoteResponseData {created_at: Date;

id: string;

option_id: string;

poll_id: string;

updated_at: Date;

answer_text?: string;

is_answer?: boolean;

user_id?: string;

user?: UserObject;

}



export interface PollVotesResponse {duration: string;

votes: Array<PollVoteResponseData>;

next?: string;

prev?: string;

}



export interface PrivacySettings {read_receipts?: ReadReceipts;

typing_indicators?: TypingIndicators;

}



export interface PublishedTrackInfo {codec_mime_type?: string;

duration_seconds?: number;

track_type?: string;

}



export interface PushConfig {version: string;

offline_only?: boolean;

}



export interface PushNotificationFields {offline_only: boolean;

version: string;

apn: APNConfigFields;

firebase: FirebaseConfigFields;

huawei: HuaweiConfigFields;

xiaomi: XiaomiConfigFields;

providers?: Array<PushProvider>;

}



export interface PushNotificationSettings {disabled?: boolean;

disabled_until?: Date;

}



export interface PushNotificationSettingsInput {disabled?: NullBool;

disabled_until?: NullTime;

}



export interface PushProvider {created_at: Date;

name: string;

type: string;

updated_at: Date;

apn_auth_key?: string;

apn_auth_type?: string;

apn_development?: boolean;

apn_host?: string;

apn_key_id?: string;

apn_notification_template?: string;

apn_p12_cert?: string;

apn_team_id?: string;

apn_topic?: string;

description?: string;

disabled_at?: Date;

disabled_reason?: string;

firebase_apn_template?: string;

firebase_credentials?: string;

firebase_data_template?: string;

firebase_host?: string;

firebase_notification_template?: string;

firebase_server_key?: string;

huawei_app_id?: string;

huawei_app_secret?: string;

xiaomi_app_secret?: string;

xiaomi_package_name?: string;

}



export interface PushProviderResponse {created_at: Date;

name: string;

type: string;

updated_at: Date;

apn_auth_key?: string;

apn_auth_type?: string;

apn_development?: boolean;

apn_host?: string;

apn_key_id?: string;

apn_p12_cert?: string;

apn_sandbox_certificate?: boolean;

apn_supports_remote_notifications?: boolean;

apn_supports_voip_notifications?: boolean;

apn_team_id?: string;

apn_topic?: string;

description?: string;

disabled_at?: Date;

disabled_reason?: string;

firebase_apn_template?: string;

firebase_credentials?: string;

firebase_data_template?: string;

firebase_host?: string;

firebase_notification_template?: string;

firebase_server_key?: string;

huawei_app_id?: string;

huawei_app_secret?: string;

xiaomi_app_secret?: string;

xiaomi_package_name?: string;

}



export interface QueryBannedUsersRequest {filter_conditions: {[key: string]: any};

exclude_expired_bans?: boolean;

limit?: number;

offset?: number;

user_id?: string;

sort?: Array<SortParam>;

user?: UserRequest;

}



export interface QueryBannedUsersResponse {duration: string;

bans: Array<BanResponse>;

}



export interface QueryCallMembersRequest {id: string;

type: string;

limit?: number;

next?: string;

prev?: string;

sort?: Array<SortParam>;

filter_conditions?: {[key: string]: any};

}



export interface QueryCallMembersResponse {duration: string;

members: Array<MemberResponse>;

next?: string;

prev?: string;

}



export interface QueryCallStatsRequest {limit?: number;

next?: string;

prev?: string;

sort?: Array<SortParam>;

filter_conditions?: {[key: string]: any};

}



export interface QueryCallStatsResponse {duration: string;

reports: Array<CallStatsReportSummaryResponse>;

next?: string;

prev?: string;

}



export interface QueryCallsRequest {limit?: number;

next?: string;

prev?: string;

sort?: Array<SortParam>;

filter_conditions?: {[key: string]: any};

}



export interface QueryCallsResponse {duration: string;

calls: Array<CallStateResponseFields>;

next?: string;

prev?: string;

}



export interface QueryChannelsRequest {limit?: number;

member_limit?: number;

message_limit?: number;

offset?: number;

state?: boolean;

user_id?: string;

sort?: Array<SortParam>;

filter_conditions?: {[key: string]: any};

user?: UserRequest;

}



export interface QueryChannelsResponse {duration: string;

channels: Array<ChannelStateResponseFields>;

}



export interface QueryMembersRequest {type: string;

filter_conditions: {[key: string]: any};

id?: string;

limit?: number;

offset?: number;

user_id?: string;

members?: Array<ChannelMember>;

sort?: Array<SortParam>;

user?: UserRequest;

}



export interface QueryMessageFlagsRequest {limit?: number;

offset?: number;

show_deleted_messages?: boolean;

user_id?: string;

sort?: Array<SortParam>;

filter_conditions?: {[key: string]: any};

user?: UserRequest;

}



export interface QueryMessageFlagsResponse {duration: string;

flags: Array<MessageFlag>;

}



export interface QueryMessageHistoryRequest {filter: {[key: string]: any};

limit?: number;

next?: string;

prev?: string;

sort?: Array<SortParam>;

}



export interface QueryMessageHistoryResponse {duration: string;

message_history: Array<MessageHistoryEntry>;

next?: string;

prev?: string;

}



export interface QueryPollVotesRequest {limit?: number;

next?: string;

prev?: string;

sort?: Array<SortParam>;

filter?: {[key: string]: any};

}



export interface QueryPollsRequest {limit?: number;

next?: string;

prev?: string;

sort?: Array<SortParam>;

filter?: {[key: string]: any};

}



export interface QueryPollsResponse {duration: string;

polls: Array<PollResponseData>;

next?: string;

prev?: string;

}



export interface QueryReactionsRequest {limit?: number;

next?: string;

prev?: string;

user_id?: string;

sort?: Array<SortParam>;

filter?: {[key: string]: any};

user?: UserRequest;

}



export interface QueryReactionsResponse {duration: string;

reactions: Array<ReactionResponse>;

next?: string;

prev?: string;

}



export interface QueryThreadsRequest {limit?: number;

member_limit?: number;

next?: string;

participant_limit?: number;

prev?: string;

reply_limit?: number;

user_id?: string;

user?: UserRequest;

}



export interface QueryThreadsResponse {duration: string;

threads: Array<ThreadStateResponse>;

next?: string;

prev?: string;

}



export interface QueryUsersPayload {filter_conditions: {[key: string]: any};

include_deactivated_users?: boolean;

limit?: number;

offset?: number;

presence?: boolean;

user_id?: string;

sort?: Array<SortParam>;

user?: UserRequest;

}



export interface QueryUsersResponse {duration: string;

users: Array<FullUserResponse>;

}



export interface RTMPIngress {address: string;

}



export interface Reaction {created_at: Date;

message_id: string;

score: number;

type: string;

updated_at: Date;

custom: {[key: string]: any};

user_id?: string;

user?: UserObject;

}



export interface ReactionGroupResponse {count: number;

first_reaction_at: Date;

last_reaction_at: Date;

sum_scores: number;

}



export interface ReactionRemovalResponse {duration: string;

message?: Message;

reaction?: Reaction;

}



export interface ReactionRequest {type: string;

created_at?: Date;

score?: number;

updated_at?: Date;

user_id?: string;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface ReactionResponse {created_at: Date;

message_id: string;

score: number;

type: string;

updated_at: Date;

user_id: string;

custom: {[key: string]: any};

user: UserResponse;

}



export interface ReactivateUserRequest {created_by_id?: string;

name?: string;

restore_messages?: boolean;

}



export interface ReactivateUserResponse {duration: string;

user?: UserObject;

}



export interface ReactivateUsersRequest {user_ids: Array<string>;

created_by_id?: string;

restore_channels?: boolean;

restore_messages?: boolean;

}



export interface ReactivateUsersResponse {duration: string;

task_id: string;

}



export interface Read {last_read: Date;

unread_messages: number;

last_read_message_id?: string;

user?: UserObject;

}



export interface ReadReceipts {enabled?: boolean;

}



export interface ReadStateResponse {last_read: Date;

unread_messages: number;

user: UserResponse;

last_read_message_id?: string;

}



export interface RecordSettings {audio_only: boolean;

mode: string;

quality: string;

layout?: LayoutSettings;

}



export interface RecordSettingsRequest {mode: string;

audio_only?: boolean;

quality?: string;

layout?: LayoutSettingsRequest;

}



export interface RecordSettingsResponse {audio_only: boolean;

mode: string;

quality: string;

layout: LayoutSettingsResponse;

}



export interface Response {duration: string;

}



export interface RestoreUsersRequest {user_ids: Array<string>;

}



export interface RingSettings {auto_cancel_timeout_ms: number;

incoming_call_timeout_ms: number;

}



export interface RingSettingsRequest {auto_cancel_timeout_ms: number;

incoming_call_timeout_ms: number;

}



export interface RingSettingsResponse {auto_cancel_timeout_ms: number;

incoming_call_timeout_ms: number;

}



export interface Role {created_at: Date;

custom: boolean;

name: string;

updated_at: Date;

scopes: Array<string>;

}



export interface S3Request {s3_region: string;

s3_api_key?: string;

s3_secret?: string;

}



export interface SFULocationResponse {datacenter: string;

id: string;

coordinates: Coordinates;

location: Location;

}



export interface ScreensharingSettings {access_request_enabled: boolean;

enabled: boolean;

target_resolution?: TargetResolution;

}



export interface ScreensharingSettingsRequest {access_request_enabled?: boolean;

enabled?: boolean;

target_resolution?: TargetResolution;

}



export interface ScreensharingSettingsResponse {access_request_enabled: boolean;

enabled: boolean;

target_resolution?: TargetResolution;

}



export interface SearchRequest {filter_conditions: {[key: string]: any};

limit?: number;

next?: string;

offset?: number;

query?: string;

sort?: Array<SortParam>;

message_filter_conditions?: {[key: string]: any};

}



export interface SearchResponse {duration: string;

results: Array<SearchResult>;

next?: string;

previous?: string;

results_warning?: SearchWarning;

}



export interface SearchResult {message?: SearchResultMessage;

}



export interface SearchResultMessage {cid: string;

created_at: Date;

deleted_reply_count: number;

html: string;

id: string;

pinned: boolean;

reply_count: number;

shadowed: boolean;

silent: boolean;

text: string;

type: string;

updated_at: Date;

attachments: Array<Attachment>;

latest_reactions: Array<Reaction>;

mentioned_users: Array<UserObject>;

own_reactions: Array<Reaction>;

custom: {[key: string]: any};

reaction_counts: {[key: string]: number};

reaction_groups: {[key: string]: ReactionGroupResponse};

reaction_scores: {[key: string]: number};

before_message_send_failed?: boolean;

command?: string;

deleted_at?: Date;

message_text_updated_at?: Date;

mml?: string;

parent_id?: string;

pin_expires?: Date;

pinned_at?: Date;

poll_id?: string;

quoted_message_id?: string;

show_in_channel?: boolean;

thread_participants?: Array<UserObject>;

channel?: ChannelResponse;

i18n?: {[key: string]: string};

image_labels?: {[key: string]: Array<string>};

pinned_by?: UserObject;

poll?: Poll;

quoted_message?: Message;

user?: UserObject;

}



export interface SearchWarning {warning_code: number;

warning_description: string;

channel_search_count?: number;

channel_search_cids?: Array<string>;

}



export interface SendCallEventRequest {user_id?: string;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface SendCallEventResponse {duration: string;

}



export interface SendEventRequest {event: EventRequest;

}



export interface SendMessageRequest {message: MessageRequest;

force_moderation?: boolean;

keep_channel_hidden?: boolean;

pending?: boolean;

skip_enrich_url?: boolean;

skip_push?: boolean;

pending_message_metadata?: {[key: string]: string};

}



export interface SendMessageResponse {duration: string;

message: MessageResponse;

pending_message_metadata?: {[key: string]: string};

}



export interface SendReactionRequest {reaction: ReactionRequest;

enforce_unique?: boolean;

skip_push?: boolean;

}



export interface SendReactionResponse {duration: string;

message: MessageResponse;

reaction: ReactionResponse;

}



export interface SendUserCustomEventRequest {event: UserCustomEventRequest;

}



export interface ShowChannelRequest {user_id?: string;

user?: UserRequest;

}



export interface ShowChannelResponse {duration: string;

}



export interface SortParam {direction?: number;

field?: string;

}



export interface StartHLSBroadcastingRequest {}



export interface StartHLSBroadcastingResponse {duration: string;

playlist_url: string;

}



export interface StartRecordingRequest {recording_external_storage?: string;

}



export interface StartRecordingResponse {duration: string;

}



export interface StartTranscriptionRequest {transcription_external_storage?: string;

}



export interface StartTranscriptionResponse {duration: string;

}



export interface Stats {average_seconds: number;

max_seconds: number;

}



export interface StopHLSBroadcastingRequest {}



export interface StopHLSBroadcastingResponse {duration: string;

}



export interface StopLiveRequest {}



export interface StopLiveResponse {duration: string;

call: CallResponse;

}



export interface StopRecordingRequest {}



export interface StopRecordingResponse {duration: string;

}



export interface StopTranscriptionRequest {}



export interface StopTranscriptionResponse {duration: string;

}



export interface Subsession {ended_at: number;

joined_at: number;

sfu_id: string;

pub_sub_hint?: MediaPubSubHint;

}



export interface TargetResolution {bitrate: number;

height: number;

width: number;

}



export interface Thread {channel_cid: string;

created_at: Date;

parent_message_id: string;

title: string;

updated_at: Date;

custom: {[key: string]: any};

deleted_at?: Date;

last_message_at?: Date;

participant_count?: number;

reply_count?: number;

thread_participants?: Array<ThreadParticipant>;

channel?: Channel;

created_by?: UserObject;

parent_message?: Message;

}



export interface ThreadParticipant {app_pk: number;

channel_cid: string;

created_at: Date;

last_read_at: Date;

custom: {[key: string]: any};

left_thread_at?: Date;

thread_id?: string;

user_id?: string;

user?: UserObject;

}



export interface ThreadResponse {channel_cid: string;

created_at: Date;

created_by_user_id: string;

parent_message_id: string;

title: string;

updated_at: Date;

custom: {[key: string]: any};

deleted_at?: Date;

last_message_at?: Date;

participant_count?: number;

reply_count?: number;

thread_participants?: Array<ThreadParticipant>;

channel?: ChannelResponse;

created_by?: UserObject;

parent_message?: Message;

}



export interface ThreadState {channel_cid: string;

created_at: Date;

parent_message_id: string;

title: string;

updated_at: Date;

latest_replies: Array<Message>;

custom: {[key: string]: any};

deleted_at?: Date;

last_message_at?: Date;

participant_count?: number;

reply_count?: number;

read?: Array<Read>;

thread_participants?: Array<ThreadParticipant>;

channel?: Channel;

created_by?: UserObject;

parent_message?: Message;

}



export interface ThreadStateResponse {channel_cid: string;

created_at: Date;

created_by_user_id: string;

parent_message_id: string;

title: string;

updated_at: Date;

latest_replies: Array<Message>;

custom: {[key: string]: any};

deleted_at?: Date;

last_message_at?: Date;

participant_count?: number;

reply_count?: number;

read?: Array<Read>;

thread_participants?: Array<ThreadParticipant>;

channel?: ChannelResponse;

created_by?: UserObject;

parent_message?: Message;

}



export interface Thresholds {explicit?: LabelThresholds;

spam?: LabelThresholds;

toxic?: LabelThresholds;

}



export interface ThumbnailResponse {image_url: string;

}



export interface ThumbnailsSettings {enabled: boolean;

}



export interface ThumbnailsSettingsRequest {enabled?: boolean;

}



export interface ThumbnailsSettingsResponse {enabled: boolean;

}



export interface TranscriptionSettings {closed_caption_mode: string;

mode: string;

languages: Array<string>;

}



export interface TranscriptionSettingsRequest {mode: string;

closed_caption_mode?: string;

languages?: Array<string>;

}



export interface TranscriptionSettingsResponse {closed_caption_mode: string;

mode: string;

languages: Array<string>;

}



export interface TranslateMessageRequest {language: string;

}



export interface TruncateChannelRequest {hard_delete?: boolean;

skip_push?: boolean;

truncated_at?: Date;

user_id?: string;

message?: MessageRequest;

user?: UserRequest;

}



export interface TruncateChannelResponse {duration: string;

channel?: ChannelResponse;

message?: Message;

}



export interface TypingIndicators {enabled?: boolean;

}



export interface UnblockUserRequest {user_id: string;

}



export interface UnblockUserResponse {duration: string;

}



export interface UnmuteChannelRequest {expiration?: number;

user_id?: string;

channel_cids?: Array<string>;

user?: UserRequest;

}



export interface UnmuteResponse {duration: string;

non_existing_users?: Array<string>;

}



export interface UnmuteUserRequest {timeout: number;

user_id?: string;

target_ids?: Array<string>;

user?: UserRequest;

}



export interface UnpinRequest {session_id: string;

user_id: string;

}



export interface UnpinResponse {duration: string;

}



export interface UnreadCountsBatchRequest {user_ids: Array<string>;

}



export interface UnreadCountsBatchResponse {duration: string;

counts_by_user: {[key: string]: UnreadCountsResponse};

}



export interface UnreadCountsChannel {channel_id: string;

last_read: Date;

unread_count: number;

}



export interface UnreadCountsChannelType {channel_count: number;

channel_type: string;

unread_count: number;

}



export interface UnreadCountsResponse {total_unread_count: number;

total_unread_threads_count: number;

channel_type: Array<UnreadCountsChannelType>;

channels: Array<UnreadCountsChannel>;

threads: Array<UnreadCountsThread>;

}



export interface UnreadCountsThread {last_read: Date;

last_read_message_id: string;

parent_message_id: string;

unread_count: number;

}



export interface UpdateAppRequest {async_url_enrich_enabled?: boolean;

auto_translation_enabled?: boolean;

before_message_send_hook_url?: string;

cdn_expiration_seconds?: number;

channel_hide_members_only?: boolean;

custom_action_handler_url?: string;

disable_auth_checks?: boolean;

disable_permissions_checks?: boolean;

enforce_unique_usernames?: string;

image_moderation_enabled?: boolean;

migrate_permissions_to_v2?: boolean;

multi_tenant_enabled?: boolean;

permission_version?: string;

reminders_interval?: number;

reminders_max_members?: number;

revoke_tokens_issued_before?: Date;

sns_key?: string;

sns_secret?: string;

sns_topic_arn?: string;

sqs_key?: string;

sqs_secret?: string;

sqs_url?: string;

video_provider?: string;

webhook_url?: string;

image_moderation_block_labels?: Array<string>;

image_moderation_labels?: Array<string>;

user_search_disallowed_roles?: Array<string>;

webhook_events?: Array<string>;

agora_options?: Config;

apn_config?: APNConfig;

async_moderation_config?: AsyncModerationConfiguration;

datadog_info?: DataDogInfo;

file_upload_config?: FileUploadConfig;

firebase_config?: FirebaseConfig;

grants?: {[key: string]: Array<string>};

hms_options?: Config;

huawei_config?: HuaweiConfig;

image_upload_config?: FileUploadConfig;

push_config?: PushConfig;

xiaomi_config?: XiaomiConfig;

}



export interface UpdateBlockListRequest {words?: Array<string>;

}



export interface UpdateCallMembersRequest {remove_members?: Array<string>;

update_members?: Array<MemberRequest>;

}



export interface UpdateCallMembersResponse {duration: string;

members: Array<MemberResponse>;

}



export interface UpdateCallRequest {starts_at?: Date;

custom?: {[key: string]: any};

settings_override?: CallSettingsRequest;

}



export interface UpdateCallResponse {duration: string;

members: Array<MemberResponse>;

own_capabilities: Array<OwnCapability>;

call: CallResponse;

}



export interface UpdateCallTypeRequest {external_storage?: string;

grants?: {[key: string]: Array<string>};

notification_settings?: NotificationSettings;

settings?: CallSettingsRequest;

}



export interface UpdateCallTypeResponse {created_at: Date;

duration: string;

name: string;

updated_at: Date;

grants: {[key: string]: Array<string>};

notification_settings: NotificationSettings;

settings: CallSettingsResponse;

external_storage?: string;

}



export interface UpdateChannelPartialRequest {user_id?: string;

unset?: Array<string>;

set?: {[key: string]: any};

user?: UserRequest;

}



export interface UpdateChannelPartialResponse {duration: string;

members: Array<ChannelMember>;

channel?: ChannelResponse;

}



export interface UpdateChannelRequest {accept_invite?: boolean;

cooldown?: number;

hide_history?: boolean;

reject_invite?: boolean;

skip_push?: boolean;

user_id?: string;

add_members?: Array<ChannelMember>;

add_moderators?: Array<string>;

assign_roles?: Array<ChannelMember>;

demote_moderators?: Array<string>;

invites?: Array<ChannelMember>;

remove_members?: Array<string>;

data?: ChannelInput;

message?: MessageRequest;

user?: UserRequest;

}



export interface UpdateChannelResponse {duration: string;

members: Array<ChannelMember>;

channel?: ChannelResponse;

message?: Message;

}



export interface UpdateChannelTypeRequest {automod: string;

automod_behavior: string;

max_message_length: number;

blocklist?: string;

blocklist_behavior?: string;

connect_events?: boolean;

custom_events?: boolean;

mark_messages_pending?: boolean;

mutes?: boolean;

polls?: boolean;

push_notifications?: boolean;

quotes?: boolean;

reactions?: boolean;

read_events?: boolean;

reminders?: boolean;

replies?: boolean;

search?: boolean;

typing_events?: boolean;

uploads?: boolean;

url_enrichment?: boolean;

allowed_flag_reasons?: Array<string>;

blocklists?: Array<BlockListOptions>;

commands?: Array<string>;

permissions?: Array<PolicyRequest>;

automod_thresholds?: Thresholds;

grants?: {[key: string]: Array<string>};

}



export interface UpdateChannelTypeResponse {automod: string;

automod_behavior: string;

connect_events: boolean;

created_at: Date;

custom_events: boolean;

duration: string;

mark_messages_pending: boolean;

max_message_length: number;

mutes: boolean;

name: string;

polls: boolean;

push_notifications: boolean;

quotes: boolean;

reactions: boolean;

read_events: boolean;

reminders: boolean;

replies: boolean;

search: boolean;

typing_events: boolean;

updated_at: Date;

uploads: boolean;

url_enrichment: boolean;

commands: Array<string>;

permissions: Array<PolicyRequest>;

grants: {[key: string]: Array<string>};

blocklist?: string;

blocklist_behavior?: string;

allowed_flag_reasons?: Array<string>;

blocklists?: Array<BlockListOptions>;

automod_thresholds?: Thresholds;

}



export interface UpdateCommandRequest {description: string;

args?: string;

set?: string;

}



export interface UpdateCommandResponse {duration: string;

command?: Command;

}



export interface UpdateExternalStorageRequest {bucket: string;

storage_type: string;

gcs_credentials?: string;

path?: string;

aws_s3?: S3Request;

azure_blob?: AzureRequest;

}



export interface UpdateExternalStorageResponse {bucket: string;

duration: string;

name: string;

path: string;

type: string;

}



export interface UpdateMessagePartialRequest {skip_enrich_url?: boolean;

user_id?: string;

unset?: Array<string>;

set?: {[key: string]: any};

user?: UserRequest;

}



export interface UpdateMessagePartialResponse {duration: string;

message?: Message;

pending_message_metadata?: {[key: string]: string};

}



export interface UpdateMessageRequest {message: MessageRequest;

skip_enrich_url?: boolean;

}



export interface UpdateMessageResponse {duration: string;

message: Message;

pending_message_metadata?: {[key: string]: string};

}



export interface UpdatePollOptionRequest {id: string;

text: string;

user_id?: string;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface UpdatePollPartialRequest {user_id?: string;

unset?: Array<string>;

set?: {[key: string]: any};

user?: UserRequest;

}



export interface UpdatePollRequest {id: string;

name: string;

allow_answers?: boolean;

allow_user_suggested_options?: boolean;

description?: string;

enforce_unique_vote?: boolean;

is_closed?: boolean;

max_votes_allowed?: number;

user_id?: string;

voting_visibility?: string;

options?: Array<PollOption>;

custom?: {[key: string]: any};

user?: UserRequest;

}



export interface UpdateThreadPartialRequest {user_id?: string;

unset?: Array<string>;

set?: {[key: string]: any};

user?: UserRequest;

}



export interface UpdateThreadPartialResponse {duration: string;

thread: ThreadResponse;

}



export interface UpdateUserPartialRequest {id: string;

unset?: Array<string>;

set?: {[key: string]: any};

}



export interface UpdateUserPermissionsRequest {user_id: string;

grant_permissions?: Array<string>;

revoke_permissions?: Array<string>;

}



export interface UpdateUserPermissionsResponse {duration: string;

}



export interface UpdateUsersPartialRequest {users: Array<UpdateUserPartialRequest>;

}



export interface UpdateUsersRequest {users: {[key: string]: UserRequest};

}



export interface UpdateUsersResponse {duration: string;

membership_deletion_task_id: string;

users: {[key: string]: FullUserResponse};

}



export interface UpsertPushProviderRequest {push_provider?: PushProvider;

}



export interface UpsertPushProviderResponse {duration: string;

push_provider: PushProviderResponse;

}



export interface UserCustomEventRequest {type: string;

custom?: {[key: string]: any};

}



export interface UserInfoResponse {image: string;

name: string;

roles: Array<string>;

custom: {[key: string]: any};

}



export interface UserMute {created_at: Date;

updated_at: Date;

expires?: Date;

target?: UserObject;

user?: UserObject;

}



export interface UserObject {banned: boolean;

id: string;

online: boolean;

role: string;

custom: {[key: string]: any};

ban_expires?: Date;

created_at?: Date;

deactivated_at?: Date;

deleted_at?: Date;

invisible?: boolean;

language?: string;

last_active?: Date;

revoke_tokens_issued_before?: Date;

updated_at?: Date;

teams?: Array<string>;

privacy_settings?: PrivacySettings;

push_notifications?: PushNotificationSettings;

}



export interface UserRequest {id: string;

image?: string;

invisible?: boolean;

language?: string;

name?: string;

role?: string;

teams?: Array<string>;

custom?: {[key: string]: any};

privacy_settings?: PrivacySettings;

push_notifications?: PushNotificationSettingsInput;

}



export interface UserResponse {banned: boolean;

created_at: Date;

id: string;

invisible: boolean;

language: string;

online: boolean;

role: string;

shadow_banned: boolean;

updated_at: Date;

devices: Array<Device>;

teams: Array<string>;

custom: {[key: string]: any};

deactivated_at?: Date;

deleted_at?: Date;

image?: string;

last_active?: Date;

name?: string;

revoke_tokens_issued_before?: Date;

push_notifications?: PushNotificationSettings;

}



export interface UserSessionStats {freeze_duration_seconds: number;

max_freeze_fraction: number;

max_freezes_duration_seconds: number;

packet_loss_fraction: number;

publisher_packet_loss_fraction: number;

publishing_duration_seconds: number;

quality_score: number;

receiving_duration_seconds: number;

session_id: string;

total_pixels_in: number;

total_pixels_out: number;

bro_ws_er?: string;

browser_version?: string;

current_ip?: string;

current_sfu?: string;

device_model?: string;

device_version?: string;

distance_to_sfu_kilometers?: number;

max_fir_per_second?: number;

max_freezes_per_second?: number;

max_nack_per_second?: number;

max_pli_per_second?: number;

os?: string;

os_version?: string;

publisher_noise_cancellation_seconds?: number;

publisher_quality_limitation_fraction?: number;

publishing_audio_codec?: string;

publishing_video_codec?: string;

receiving_audio_codec?: string;

receiving_video_codec?: string;

sdk?: string;

sdk_version?: string;

subscriber_video_quality_throttled_duration_seconds?: number;

webrtc_version?: string;

published_tracks?: Array<PublishedTrackInfo>;

subsessions?: Array<Subsession>;

geolocation?: GeolocationResult;

jitter?: Stats;

latency?: Stats;

max_publishing_video_quality?: VideoQuality;

max_receiving_video_quality?: VideoQuality;

pub_sub_hints?: MediaPubSubHint;

publisher_audio_mos?: MOSStats;

publisher_jitter?: Stats;

publisher_latency?: Stats;

publisher_video_quality_limitation_duration_seconds?: {[key: string]: number};

subscriber_audio_mos?: MOSStats;

subscriber_jitter?: Stats;

subscriber_latency?: Stats;

timeline?: CallTimeline;

}



export interface UserStats {min_event_ts: number;

session_stats: Array<UserSessionStats>;

info: UserInfoResponse;

rating?: number;

}



export interface VideoQuality {usage_type?: string;

resolution?: VideoResolution;

}



export interface VideoResolution {height: number;

width: number;

}



export interface VideoSettings {access_request_enabled: boolean;

camera_default_on: boolean;

camera_facing: string;

enabled: boolean;

target_resolution: TargetResolution;

}



export interface VideoSettingsRequest {access_request_enabled?: boolean;

camera_default_on?: boolean;

camera_facing?: string;

enabled?: boolean;

target_resolution?: TargetResolution;

}



export interface VideoSettingsResponse {access_request_enabled: boolean;

camera_default_on: boolean;

camera_facing: string;

enabled: boolean;

target_resolution: TargetResolution;

}



export interface VoteData {answer_text?: string;

option_id?: string;

option?: PollOption;

}



export interface WSEvent {created_at: Date;

type: string;

custom: {[key: string]: any};

automoderation?: boolean;

channel_id?: string;

channel_type?: string;

cid?: string;

connection_id?: string;

parent_id?: string;

reason?: string;

team?: string;

user_id?: string;

watcher_count?: number;

automoderation_scores?: ModerationResponse;

channel?: ChannelResponse;

created_by?: UserObject;

me?: OwnUser;

member?: ChannelMember;

message?: Message;

message_update?: MessageUpdate;

poll?: Poll;

poll_vote?: PollVote;

reaction?: Reaction;

thread?: Thread;

user?: UserObject;

}



export interface WrappedUnreadCountsResponse {duration: string;

total_unread_count: number;

total_unread_threads_count: number;

channel_type: Array<UnreadCountsChannelType>;

channels: Array<UnreadCountsChannel>;

threads: Array<UnreadCountsThread>;

}



export interface XiaomiConfig {disabled?: boolean;

package_name?: string;

secret?: string;

}



export interface XiaomiConfigFields {enabled: boolean;

package_name?: string;

secret?: string;

}










