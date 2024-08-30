export interface APIError {
  code: number;

  duration: string;

  message: string;

  more_info: string;

  status_code: number;

  details: number[];

  unrecoverable?: boolean;

  exception_fields?: Record<string, string>;
}

export interface APNConfig {
  auth_key?: string;

  auth_type?: 'certificate' | 'token';

  bundle_id?: string;

  development?: boolean;

  disabled?: boolean;

  host?: string;

  key_id?: string;

  notification_template?: string;

  p12_cert?: string;

  team_id?: string;
}

export interface APNConfigFields {
  development: boolean;

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

export interface APNS {
  body: string;

  title: string;
}

export interface AWSRekognitionConfig {
  enabled?: boolean;

  rules?: AWSRekognitionRule[];
}

export interface AWSRekognitionRule {
  action: 'flag' | 'shadow' | 'remove';

  label: string;
}

export interface Action {
  name: string;

  text: string;

  type: string;

  style?: string;

  value?: string;
}

export interface ActionLog {
  created_at: Date;

  id: string;

  reason: string;

  review_queue_item_id: string;

  target_user_id: string;

  type: string;

  custom: Record<string, any>;

  review_queue_item?: ReviewQueueItem;

  target_user?: UserObject;

  user?: UserObject;
}

export interface ActionLogResponse {
  created_at: Date;

  id: string;

  reason: string;

  type: string;

  custom: Record<string, any>;

  review_queue_item?: ReviewQueueItem;

  target_user?: UserResponse;

  user?: UserResponse;
}

export interface AggregatedStats {
  countrywise_aggregate_stats?: Record<string, CountrywiseAggregateStats>;

  publisher_aggregate_stats?: PublisherAggregateStats;

  turn?: TURNAggregatedStats;
}

export interface AppResponseFields {
  async_url_enrich_enabled: boolean;

  auto_translation_enabled: boolean;

  campaign_enabled: boolean;

  cdn_expiration_seconds: number;

  custom_action_handler_url: string;

  disable_auth_checks: boolean;

  disable_permissions_checks: boolean;

  enforce_unique_usernames: string;

  image_moderation_enabled: boolean;

  moderation_enabled: boolean;

  moderation_webhook_url: string;

  multi_tenant_enabled: boolean;

  name: string;

  organization: string;

  permission_version: string;

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

  user_search_disallowed_roles: string[];

  webhook_events: string[];

  call_types: Record<string, CallType>;

  channel_configs: Record<string, ChannelConfig>;

  file_upload_config: FileUploadConfig;

  grants: Record<string, string[]>;

  image_upload_config: FileUploadConfig;

  policies: Record<string, Policy[]>;

  push_notifications: PushNotificationFields;

  before_message_send_hook_url?: string;

  revoke_tokens_issued_before?: Date;

  allowed_flag_reasons?: string[];

  geofences?: GeofenceResponse[];

  image_moderation_labels?: string[];

  agora_options?: Config;

  datadog_info?: DataDogInfo;

  hms_options?: Config;
}

export interface AsyncModerationCallbackConfig {
  mode?: 'CALLBACK_MODE_NONE' | 'CALLBACK_MODE_REST' | 'CALLBACK_MODE_TWIRP';

  server_url?: string;
}

export interface AsyncModerationConfiguration {
  timeout_ms?: number;

  callback?: AsyncModerationCallbackConfig;
}

export interface Attachment {
  custom: Record<string, any>;

  asset_url?: string;

  author_icon?: string;

  author_link?: string;

  author_name?: string;

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

  actions?: Action[];

  fields?: Field[];

  giphy?: Images;
}

export interface AudioSettings {
  access_request_enabled: boolean;

  default_device: 'speaker' | 'earpiece';

  mic_default_on: boolean;

  opus_dtx_enabled: boolean;

  redundant_coding_enabled: boolean;

  speaker_default_on: boolean;

  noise_cancellation?: NoiseCancellationSettings;
}

export interface AudioSettingsRequest {
  default_device: 'speaker' | 'earpiece';

  access_request_enabled?: boolean;

  mic_default_on?: boolean;

  opus_dtx_enabled?: boolean;

  redundant_coding_enabled?: boolean;

  speaker_default_on?: boolean;

  noise_cancellation?: NoiseCancellationSettings;
}

export interface AudioSettingsResponse {
  access_request_enabled: boolean;

  default_device: 'speaker' | 'earpiece';

  mic_default_on: boolean;

  opus_dtx_enabled: boolean;

  redundant_coding_enabled: boolean;

  speaker_default_on: boolean;

  noise_cancellation?: NoiseCancellationSettings;
}

export interface AutomodDetails {
  action?: string;

  original_message_type?: string;

  image_labels?: string[];

  message_details?: FlagMessageDetails;

  result?: MessageModerationResult;
}

export interface AutomodPlatformCircumventionConfig {
  enabled?: boolean;

  rules?: AutomodRule[];
}

export interface AutomodRule {
  action: 'flag' | 'shadow' | 'remove';

  label: string;

  threshold: number;
}

export interface AutomodSemanticFiltersConfig {
  enabled?: boolean;

  rules?: AutomodSemanticFiltersRule[];
}

export interface AutomodSemanticFiltersRule {
  action: 'flag' | 'shadow' | 'remove';

  name: string;

  threshold: number;
}

export interface AutomodToxicityConfig {
  enabled?: boolean;

  rules?: AutomodRule[];
}

export interface AzureRequest {
  abs_account_name: string;

  abs_client_id: string;

  abs_client_secret: string;

  abs_tenant_id: string;
}

export interface BackstageSettings {
  enabled: boolean;

  join_ahead_time_seconds?: number;
}

export interface BackstageSettingsRequest {
  enabled?: boolean;

  join_ahead_time_seconds?: number;
}

export interface BackstageSettingsResponse {
  enabled: boolean;

  join_ahead_time_seconds?: number;
}

export interface Ban {
  created_at: Date;

  shadow: boolean;

  expires?: Date;

  reason?: string;

  channel?: Channel;

  created_by?: UserObject;

  target?: UserObject;
}

export interface BanActionRequest {
  channel_ban_only?: boolean;

  reason?: string;

  shadow?: boolean;

  timeout?: number;
}

export interface BanRequest {
  target_user_id: string;

  banned_by_id?: string;

  channel_cid?: string;

  ip_ban?: boolean;

  reason?: string;

  shadow?: boolean;

  timeout?: number;

  banned_by?: UserRequest;
}

export interface BanResponse {
  created_at: Date;

  expires?: Date;

  reason?: string;

  shadow?: boolean;

  banned_by?: UserResponse;

  channel?: ChannelResponse;

  user?: UserResponse;
}

export interface BlockListConfig {
  enabled?: boolean;

  rules?: BlockListRule[];
}

export interface BlockListOptions {
  behavior: 'flag' | 'block' | 'shadow_block';

  blocklist: string;
}

export interface BlockListResponse {
  name: string;

  type: string;

  words: string[];

  created_at?: Date;

  updated_at?: Date;
}

export interface BlockListRule {
  action: 'flag' | 'shadow' | 'remove';

  name: string;
}

export interface BlockUserRequest {
  user_id: string;
}

export interface BlockUserResponse {
  duration: string;
}

export interface BlockUsersRequest {
  blocked_user_id: string;

  user_id?: string;

  user?: UserRequest;
}

export interface BlockUsersResponse {
  blocked_by_user_id: string;

  blocked_user_id: string;

  created_at: Date;

  duration: string;
}

export interface BlockedUserResponse {
  blocked_user_id: string;

  created_at: Date;

  user_id: string;

  blocked_user: UserResponse;

  user: UserResponse;
}

export interface BodyguardConfig {
  enabled?: boolean;

  profile?: string;

  rules?: BodyguardRule[];

  severity_rules?: BodyguardSeverityRule[];
}

export interface BodyguardRule {
  action: 'flag' | 'shadow' | 'remove';

  label: string;
}

export interface BodyguardSeverityRule {
  action: 'flag' | 'shadow' | 'remove';

  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface BroadcastSettings {
  enabled: boolean;

  hls?: HLSSettings;

  rtmp?: RTMPSettings;
}

export interface BroadcastSettingsRequest {
  enabled?: boolean;

  hls?: HLSSettingsRequest;

  rtmp?: RTMPSettingsRequest;
}

export interface BroadcastSettingsResponse {
  enabled: boolean;

  hls: HLSSettingsResponse;

  rtmp: RTMPSettingsResponse;
}

export interface CallEvent {
  description: string;

  end_timestamp: number;

  severity: number;

  timestamp: number;

  type: string;

  component?: string;

  additional?: Record<string, any>;
}

export interface CallIngressResponse {
  rtmp: RTMPIngress;
}

export interface CallParticipantResponse {
  joined_at: Date;

  role: string;

  user_session_id: string;

  user: UserResponse;
}

export interface CallRecording {
  end_time: Date;

  filename: string;

  start_time: Date;

  url: string;
}

export interface CallRequest {
  created_by_id?: string;

  starts_at?: Date;

  team?: string;

  video?: boolean;

  members?: MemberRequest[];

  created_by?: UserRequest;

  custom?: Record<string, any>;

  settings_override?: CallSettingsRequest;
}

export interface CallResponse {
  backstage: boolean;

  cid: string;

  created_at: Date;

  current_session_id: string;

  id: string;

  recording: boolean;

  transcribing: boolean;

  type: string;

  updated_at: Date;

  blocked_user_ids: string[];

  created_by: UserResponse;

  custom: Record<string, any>;

  egress: EgressResponse;

  ingress: CallIngressResponse;

  settings: CallSettingsResponse;

  ended_at?: Date;

  join_ahead_time_seconds?: number;

  starts_at?: Date;

  team?: string;

  session?: CallSessionResponse;

  thumbnails?: ThumbnailResponse;
}

export interface CallSessionResponse {
  anonymous_participant_count: number;

  id: string;

  participants: CallParticipantResponse[];

  accepted_by: Record<string, Date>;

  missed_by: Record<string, Date>;

  participants_count_by_role: Record<string, number>;

  rejected_by: Record<string, Date>;

  ended_at?: Date;

  live_ended_at?: Date;

  live_started_at?: Date;

  started_at?: Date;

  timer_ends_at?: Date;
}

export interface CallSettings {
  audio?: AudioSettings;

  backstage?: BackstageSettings;

  broadcasting?: BroadcastSettings;

  geofencing?: GeofenceSettings;

  limits?: LimitsSettings;

  recording?: RecordSettings;

  ring?: RingSettings;

  screensharing?: ScreensharingSettings;

  thumbnails?: ThumbnailsSettings;

  transcription?: TranscriptionSettings;

  video?: VideoSettings;
}

export interface CallSettingsRequest {
  audio?: AudioSettingsRequest;

  backstage?: BackstageSettingsRequest;

  broadcasting?: BroadcastSettingsRequest;

  geofencing?: GeofenceSettingsRequest;

  limits?: LimitsSettingsRequest;

  recording?: RecordSettingsRequest;

  ring?: RingSettingsRequest;

  screensharing?: ScreensharingSettingsRequest;

  thumbnails?: ThumbnailsSettingsRequest;

  transcription?: TranscriptionSettingsRequest;

  video?: VideoSettingsRequest;
}

export interface CallSettingsResponse {
  audio: AudioSettingsResponse;

  backstage: BackstageSettingsResponse;

  broadcasting: BroadcastSettingsResponse;

  geofencing: GeofenceSettingsResponse;

  limits: LimitsSettingsResponse;

  recording: RecordSettingsResponse;

  ring: RingSettingsResponse;

  screensharing: ScreensharingSettingsResponse;

  thumbnails: ThumbnailsSettingsResponse;

  transcription: TranscriptionSettingsResponse;

  video: VideoSettingsResponse;
}

export interface CallStateResponseFields {
  members: MemberResponse[];

  own_capabilities: OwnCapability[];

  call: CallResponse;
}

export interface CallStatsReportSummaryResponse {
  call_cid: string;

  call_duration_seconds: number;

  call_session_id: string;

  call_status: string;

  first_stats_time: Date;

  created_at?: Date;

  quality_score?: number;
}

export interface CallTimeline {
  events: CallEvent[];
}

export interface CallTranscription {
  end_time: Date;

  filename: string;

  start_time: Date;

  url: string;
}

export interface CallType {
  app_pk: number;

  created_at: Date;

  external_storage: string;

  name: string;

  pk: number;

  updated_at: Date;

  notification_settings?: NotificationSettings;

  settings?: CallSettings;
}

export interface CallTypeResponse {
  created_at: Date;

  name: string;

  updated_at: Date;

  grants: Record<string, string[]>;

  notification_settings: NotificationSettings;

  settings: CallSettingsResponse;

  external_storage?: string;
}

export interface CastPollVoteRequest {
  user_id?: string;

  user?: UserRequest;

  vote?: VoteData;
}

export interface Channel {
  auto_translation_language: string;

  cid: string;

  created_at: Date;

  disabled: boolean;

  frozen: boolean;

  id: string;

  type: string;

  updated_at: Date;

  custom: Record<string, any>;

  auto_translation_enabled?: boolean;

  cooldown?: number;

  deleted_at?: Date;

  last_message_at?: Date;

  member_count?: number;

  team?: string;

  invites?: ChannelMember[];

  members?: ChannelMember[];

  config?: ChannelConfig;

  config_overrides?: ChannelConfig;

  created_by?: UserObject;

  truncated_by?: UserObject;
}

export interface ChannelConfig {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

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

  commands: string[];

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;
}

export interface ChannelConfigWithInfo {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

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

  commands: Command[];

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: number;

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;

  grants?: Record<string, string[]>;
}

export interface ChannelExport {
  cid?: string;

  id?: string;

  messages_since?: Date;

  messages_until?: Date;

  type?: string;
}

export interface ChannelGetOrCreateRequest {
  hide_for_creator?: boolean;

  state?: boolean;

  thread_unread_counts?: boolean;

  data?: ChannelInput;

  members?: PaginationParams;

  messages?: MessagePaginationParams;

  watchers?: PaginationParams;
}

export interface ChannelInput {
  auto_translation_enabled?: boolean;

  auto_translation_language?: string;

  created_by_id?: string;

  disabled?: boolean;

  frozen?: boolean;

  team?: string;

  truncated_by_id?: string;

  invites?: ChannelMember[];

  members?: ChannelMember[];

  config_overrides?: ChannelConfig;

  created_by?: UserRequest;

  custom?: Record<string, any>;
}

export interface ChannelMember {
  banned: boolean;

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

export interface ChannelMemberResponse {
  banned: boolean;

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

  role?: 'member' | 'moderator' | 'admin' | 'owner';

  status?: string;

  user_id?: string;

  user?: UserResponse;
}

export interface ChannelMute {
  created_at: Date;

  updated_at: Date;

  expires?: Date;

  channel?: ChannelResponse;

  user?: UserObject;
}

export interface ChannelResponse {
  cid: string;

  created_at: Date;

  disabled: boolean;

  frozen: boolean;

  id: string;

  type: string;

  updated_at: Date;

  custom: Record<string, any>;

  auto_translation_enabled?: boolean;

  auto_translation_language?: string;

  blocked?: boolean;

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

  members?: ChannelMember[];

  own_capabilities?: string[];

  config?: ChannelConfigWithInfo;

  created_by?: UserObject;

  truncated_by?: UserObject;
}

export interface ChannelStateResponse {
  duration: string;

  members: ChannelMember[];

  messages: MessageResponse[];

  pinned_messages: MessageResponse[];

  threads: ThreadState[];

  hidden?: boolean;

  hide_messages_before?: Date;

  watcher_count?: number;

  pending_messages?: PendingMessage[];

  read?: ReadStateResponse[];

  watchers?: UserResponse[];

  channel?: ChannelResponse;

  membership?: ChannelMember;
}

export interface ChannelStateResponseFields {
  members: ChannelMember[];

  messages: MessageResponse[];

  pinned_messages: MessageResponse[];

  threads: ThreadState[];

  hidden?: boolean;

  hide_messages_before?: Date;

  watcher_count?: number;

  pending_messages?: PendingMessage[];

  read?: ReadStateResponse[];

  watchers?: UserResponse[];

  channel?: ChannelResponse;

  membership?: ChannelMember;
}

export interface ChannelTypeConfig {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

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

  commands: Command[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: number;

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;
}

export interface CheckExternalStorageResponse {
  duration: string;

  file_url: string;
}

export interface CheckPushRequest {
  apn_template?: string;

  firebase_data_template?: string;

  firebase_template?: string;

  message_id?: string;

  push_provider_name?: string;

  push_provider_type?: 'firebase' | 'apn' | 'huawei' | 'xiaomi';

  skip_devices?: boolean;

  user_id?: string;

  user?: UserRequest;
}

export interface CheckPushResponse {
  duration: string;

  rendered_apn_template?: string;

  rendered_firebase_template?: string;

  skip_devices?: boolean;

  general_errors?: string[];

  device_errors?: Record<string, DeviceErrorInfo>;

  rendered_message?: Record<string, string>;
}

export interface CheckRequest {
  config_key: string;

  entity_creator_id: string;

  entity_id: string;

  entity_type: string;

  user_id?: string;

  moderation_payload?: ModerationPayload;

  options?: Record<string, any>;

  user?: UserRequest;
}

export interface CheckResponse {
  duration: string;

  recommended_action: string;

  status: string;

  task_id?: string;

  item?: ReviewQueueItem;
}

export interface CheckSNSRequest {
  sns_key?: string;

  sns_secret?: string;

  sns_topic_arn?: string;
}

export interface CheckSNSResponse {
  duration: string;

  status: 'ok' | 'error';

  error?: string;

  data?: Record<string, any>;
}

export interface CheckSQSRequest {
  sqs_key?: string;

  sqs_secret?: string;

  sqs_url?: string;
}

export interface CheckSQSResponse {
  duration: string;

  status: 'ok' | 'error';

  error?: string;

  data?: Record<string, any>;
}

export interface CollectUserFeedbackRequest {
  rating: number;

  sdk: string;

  sdk_version: string;

  user_session_id: string;

  reason?: string;

  custom?: Record<string, any>;
}

export interface CollectUserFeedbackResponse {
  duration: string;
}

export interface Command {
  args: string;

  description: string;

  name: string;

  set: string;

  created_at?: Date;

  updated_at?: Date;
}

export interface CommitMessageRequest {}

export interface Config {
  app_certificate: string;

  app_id: string;

  default_role?: 'attendee' | 'publisher' | 'subscriber' | 'admin';

  role_map?: Record<string, string>;
}

export interface ConfigResponse {
  async: boolean;

  created_at: Date;

  key: string;

  updated_at: Date;

  automod_platform_circumvention_config?: AutomodPlatformCircumventionConfig;

  automod_semantic_filters_config?: AutomodSemanticFiltersConfig;

  automod_toxicity_config?: AutomodToxicityConfig;

  aws_rek_og_nition_config?: AWSRekognitionConfig;

  block_list_config?: BlockListConfig;

  bodyguard_config?: BodyguardConfig;

  go_og_le_vision_config?: GoogleVisionConfig;
}

export interface Coordinates {
  latitude: number;

  longitude: number;
}

export interface Count {
  app_roximate: boolean;

  value: number;
}

export interface CountrywiseAggregateStats {
  participant_count?: Count;

  publisher_jitter?: TimeStats;

  publisher_latency?: TimeStats;

  subscriber_jitter?: TimeStats;

  subscriber_latency?: TimeStats;
}

export interface CreateBlockListRequest {
  name: string;

  words: string[];

  type?: 'regex' | 'domain' | 'email' | 'word';
}

export interface CreateCallTypeRequest {
  name: string;

  external_storage?: string;

  grants?: Record<string, string[]>;

  notification_settings?: NotificationSettings;

  settings?: CallSettingsRequest;
}

export interface CreateCallTypeResponse {
  created_at: Date;

  duration: string;

  name: string;

  updated_at: Date;

  grants: Record<string, string[]>;

  notification_settings: NotificationSettings;

  settings: CallSettingsResponse;

  external_storage?: string;
}

export interface CreateChannelTypeRequest {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block';

  max_message_length: number;

  name: string;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  connect_events?: boolean;

  custom_events?: boolean;

  mark_messages_pending?: boolean;

  message_retention?: string;

  mutes?: boolean;

  partition_size?: number;

  partition_ttl?: string;

  polls?: boolean;

  push_notifications?: boolean;

  reactions?: boolean;

  read_events?: boolean;

  replies?: boolean;

  search?: boolean;

  typing_events?: boolean;

  uploads?: boolean;

  url_enrichment?: boolean;

  blocklists?: BlockListOptions[];

  commands?: string[];

  permissions?: PolicyRequest[];

  grants?: Record<string, string[]>;
}

export interface CreateChannelTypeResponse {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

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

  commands: string[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: number;

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;
}

export interface CreateCommandRequest {
  description: string;

  name: string;

  args?: string;

  set?: string;
}

export interface CreateCommandResponse {
  duration: string;

  command?: Command;
}

export interface CreateDeviceRequest {
  id: string;

  push_provider: 'firebase' | 'apn' | 'huawei' | 'xiaomi';

  push_provider_name?: string;

  user_id?: string;

  voip_token?: boolean;

  user?: UserRequest;
}

export interface CreateExternalStorageRequest {
  bucket: string;

  name: string;

  storage_type: 's3' | 'gcs' | 'abs';

  gcs_credentials?: string;

  path?: string;

  aws_s3?: S3Request;

  azure_blob?: AzureRequest;
}

export interface CreateExternalStorageResponse {
  duration: string;
}

export interface CreateGuestRequest {
  user: UserRequest;
}

export interface CreateGuestResponse {
  access_token: string;

  duration: string;

  user: UserResponse;
}

export interface CreateImportRequest {
  mode: 'insert' | 'upsert';

  path: string;
}

export interface CreateImportResponse {
  duration: string;

  import_task?: ImportTask;
}

export interface CreateImportURLRequest {
  filename?: string;
}

export interface CreateImportURLResponse {
  duration: string;

  path: string;

  upload_url: string;
}

export interface CreatePollOptionRequest {
  text: string;

  position?: number;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface CreatePollRequest {
  name: string;

  allow_answers?: boolean;

  allow_user_suggested_options?: boolean;

  description?: string;

  enforce_unique_vote?: boolean;

  id?: string;

  is_closed?: boolean;

  max_votes_allowed?: number;

  user_id?: string;

  voting_visibility?: 'anonymous' | 'public';

  options?: PollOptionInput[];

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface CreateRoleRequest {
  name: string;
}

export interface CreateRoleResponse {
  duration: string;

  role: Role;
}

export interface CustomActionRequest {
  id?: string;

  options?: Record<string, any>;
}

export interface CustomCheckRequest {
  entity_creator_id: string;

  entity_id: string;

  entity_type: string;

  name?: string;

  reason?: string;

  recommended_action?: string;

  user_id?: string;

  moderation_payload?: ModerationPayload;

  user?: UserRequest;
}

export interface CustomCheckResponse {
  duration: string;

  id: string;

  recommended_action: string;

  scored_at: Date;

  status: string;

  report: any[];

  moderator_action?: string;

  reviewed_at?: Date;
}

export interface Data {
  id: string;
}

export interface DataDogInfo {
  api_key?: string;

  enabled?: boolean;

  site?: string;
}

export interface DeactivateUserRequest {
  created_by_id?: string;

  mark_messages_deleted?: boolean;
}

export interface DeactivateUserResponse {
  duration: string;

  user?: UserResponse;
}

export interface DeactivateUsersRequest {
  user_ids: string[];

  created_by_id?: string;

  mark_channels_deleted?: boolean;

  mark_messages_deleted?: boolean;
}

export interface DeactivateUsersResponse {
  duration: string;

  task_id: string;
}

export interface DeleteActivityRequest {}

export interface DeleteCallRequest {
  hard?: boolean;
}

export interface DeleteCallResponse {
  duration: string;

  call: CallResponse;

  task_id?: string;
}

export interface DeleteChannelResponse {
  duration: string;

  channel?: ChannelResponse;
}

export interface DeleteChannelsRequest {
  cids: string[];

  hard_delete?: boolean;
}

export interface DeleteChannelsResponse {
  duration: string;

  task_id?: string;

  result?: Record<string, DeleteChannelsResultResponse>;
}

export interface DeleteChannelsResultResponse {
  status: string;

  error?: string;
}

export interface DeleteCommandResponse {
  duration: string;

  name: string;
}

export interface DeleteExternalStorageResponse {
  duration: string;
}

export interface DeleteMessageRequest {
  hard_delete?: boolean;
}

export interface DeleteMessageResponse {
  duration: string;

  message: MessageResponse;
}

export interface DeleteModerationTemplateResponse {
  duration: string;
}

export interface DeleteReactionRequest {
  hard_delete?: boolean;
}

export interface DeleteRecordingResponse {
  duration: string;
}

export interface DeleteTranscriptionResponse {
  duration: string;
}

export interface DeleteUserRequest {
  delete_conversation_channels?: boolean;

  hard_delete?: boolean;

  mark_messages_deleted?: boolean;
}

export interface DeleteUsersRequest {
  user_ids: string[];

  calls?: 'soft' | 'hard';

  conversations?: 'soft' | 'hard';

  messages?: 'soft' | 'pruning' | 'hard';

  new_call_owner_id?: string;

  new_channel_owner_id?: string;

  user?: 'soft' | 'pruning' | 'hard';
}

export interface DeleteUsersResponse {
  duration: string;

  task_id: string;
}

export interface Device {
  created_at: Date;

  id: string;

  push_provider: string;

  user_id: string;

  disabled?: boolean;

  disabled_reason?: string;

  push_provider_name?: string;

  voip?: boolean;
}

export interface DeviceErrorInfo {
  error_message: string;

  provider: string;

  provider_name: string;
}

export interface EdgeResponse {
  continent_code: string;

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

export interface EgressHLSResponse {
  playlist_url: string;
}

export interface EgressRTMPResponse {
  name: string;

  started_at: Date;

  stream_key?: string;

  stream_url?: string;
}

export interface EgressResponse {
  broadcasting: boolean;

  rtmp_s: EgressRTMPResponse[];

  hls?: EgressHLSResponse;
}

export interface EndCallRequest {}

export interface EndCallResponse {
  duration: string;
}

export interface EnrichedActivity {
  foreign_id?: string;

  id?: string;

  score?: number;

  verb?: string;

  to?: string[];

  actor?: Data;

  latest_reactions?: Record<string, Array<EnrichedReaction | null>>;

  object?: Data;

  origin?: Data;

  own_reactions?: Record<string, Array<EnrichedReaction | null>>;

  reaction_counts?: Record<string, number>;

  target?: Data;
}

export interface EnrichedReaction {
  activity_id: string;

  kind: string;

  user_id: string;

  id?: string;

  parent?: string;

  target_feeds?: string[];

  children_counts?: Record<string, number>;

  created_at?: Time;

  data?: Record<string, any>;

  latest_children?: Record<string, Array<EnrichedReaction | null>>;

  own_children?: Record<string, Array<EnrichedReaction | null>>;

  updated_at?: Time;

  user?: Data;
}

export interface ErrorResult {
  type: string;

  stacktrace?: string;

  version?: string;
}

export interface EventNotificationSettings {
  enabled: boolean;

  apns: APNS;
}

export interface EventRequest {
  type: string;

  parent_id?: string;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface EventResponse {
  duration: string;

  event: WSEvent;
}

export interface ExportChannelsRequest {
  channels: ChannelExport[];

  clear_deleted_message_text?: boolean;

  export_users?: boolean;

  include_soft_deleted_channels?: boolean;

  include_truncated_messages?: boolean;

  version?: string;
}

export interface ExportChannelsResponse {
  duration: string;

  task_id: string;
}

export interface ExportChannelsResult {
  url: string;

  path?: string;

  s3_bucket_name?: string;
}

export interface ExportUserResponse {
  duration: string;

  messages?: Message[];

  reactions?: Reaction[];

  user?: UserResponse;
}

export interface ExportUsersRequest {
  user_ids: string[];
}

export interface ExportUsersResponse {
  duration: string;

  task_id: string;
}

export interface ExternalStorageResponse {
  bucket: string;

  name: string;

  path: string;

  type: 's3' | 'gcs' | 'abs';
}

export interface FeedsModerationTemplateConfig {
  config_key: string;

  data_types: Record<string, string>;
}

export interface Field {
  short: boolean;

  title: string;

  value: string;
}

export interface FileUploadConfig {
  size_limit: number;

  allowed_file_extensions?: string[];

  allowed_mime_types?: string[];

  blocked_file_extensions?: string[];

  blocked_mime_types?: string[];
}

export interface FileUploadRequest {
  file?: string;

  user?: OnlyUserID;
}

export interface FileUploadResponse {
  duration: string;

  file?: string;

  thumb_url?: string;
}

export interface FirebaseConfig {
  apn_template?: string;

  credentials_json?: string;

  data_template?: string;

  disabled?: boolean;

  notification_template?: string;

  server_key?: string;
}

export interface FirebaseConfigFields {
  apn_template: string;

  data_template: string;

  enabled: boolean;

  notification_template: string;

  credentials_json?: string;

  server_key?: string;
}

export interface Flag2 {
  created_at: Date;

  entity_id: string;

  entity_type: string;

  updated_at: Date;

  result: Array<Record<string, any>>;

  entity_creator_id?: string;

  moderation_payload_hash?: string;

  reason?: string;

  review_queue_item_id?: string;

  type?: string;

  labels?: string[];

  custom?: Record<string, any>;

  moderation_payload?: ModerationPayload;

  user?: UserObject;
}

export interface FlagDetails {
  original_text: string;

  extra: Record<string, any>;

  automod?: AutomodDetails;
}

export interface FlagFeedback {
  created_at: Date;

  message_id: string;

  labels: Label[];
}

export interface FlagMessageDetails {
  pin_changed?: boolean;

  should_enrich?: boolean;

  skip_push?: boolean;

  updated_by_id?: string;
}

export interface FlagRequest {
  entity_id: string;

  entity_type: string;

  reason: string;

  entity_creator_id?: string;

  user_id?: string;

  custom?: Record<string, any>;

  moderation_payload?: ModerationPayload;

  user?: UserRequest;
}

export interface FlagResponse {
  duration: string;

  item_id: string;
}

export interface FullUserResponse {
  banned: boolean;

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

  blocked_user_ids: string[];

  channel_mutes: ChannelMute[];

  devices: Device[];

  mutes: UserMuteResponse[];

  teams: string[];

  custom: Record<string, any>;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  latest_hidden_channels?: string[];

  privacy_settings?: PrivacySettingsResponse;

  push_notifications?: PushNotificationSettingsResponse;
}

export interface GeofenceResponse {
  name: string;

  description?: string;

  type?: string;

  country_codes?: string[];
}

export interface GeofenceSettings {
  names: string[];
}

export interface GeofenceSettingsRequest {
  names?: string[];
}

export interface GeofenceSettingsResponse {
  names: string[];
}

export interface GeolocationResult {
  accuracy_radius: number;

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

export interface GetApplicationResponse {
  duration: string;

  app: AppResponseFields;
}

export interface GetBlockListResponse {
  duration: string;

  blocklist?: BlockListResponse;
}

export interface GetBlockedUsersResponse {
  duration: string;

  blocks: BlockedUserResponse[];
}

export interface GetCallResponse {
  duration: string;

  members: MemberResponse[];

  own_capabilities: OwnCapability[];

  call: CallResponse;
}

export interface GetCallStatsResponse {
  call_duration_seconds: number;

  call_status: string;

  duration: string;

  max_freezes_duration_seconds: number;

  max_participants: number;

  max_total_quality_limitation_duration_seconds: number;

  publishing_participants: number;

  quality_score: number;

  sfu_count: number;

  participant_report: UserStats[];

  sfus: SFULocationResponse[];

  aggregated?: AggregatedStats;

  call_timeline?: CallTimeline;

  jitter?: TimeStats;

  latency?: TimeStats;
}

export interface GetCallTypeResponse {
  created_at: Date;

  duration: string;

  name: string;

  updated_at: Date;

  grants: Record<string, string[]>;

  notification_settings: NotificationSettings;

  settings: CallSettingsResponse;

  external_storage?: string;
}

export interface GetChannelTypeResponse {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

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

  commands: Command[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: number;

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;
}

export interface GetCommandResponse {
  args: string;

  description: string;

  duration: string;

  name: string;

  set: string;

  created_at?: Date;

  updated_at?: Date;
}

export interface GetConfigResponse {
  duration: string;

  config?: ConfigResponse;
}

export interface GetCustomPermissionResponse {
  duration: string;

  permission: Permission;
}

export interface GetEdgesResponse {
  duration: string;

  edges: EdgeResponse[];
}

export interface GetExportChannelsStatusResponse {
  created_at: Date;

  duration: string;

  status:
    | 'waiting'
    | 'pending'
    | 'running'
    | 'completed'
    | 'failed'
    | 'canceled';

  task_id: string;

  updated_at: Date;

  error?: ErrorResult;

  result?: ExportChannelsResult;
}

export interface GetImportResponse {
  duration: string;

  import_task?: ImportTask;
}

export interface GetManyMessagesResponse {
  duration: string;

  messages: Message[];
}

export interface GetMessageResponse {
  duration: string;

  message: MessageWithChannelResponse;

  pending_message_metadata?: Record<string, string>;
}

export interface GetOGResponse {
  duration: string;

  custom: Record<string, any>;

  asset_url?: string;

  author_icon?: string;

  author_link?: string;

  author_name?: string;

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

  actions?: Action[];

  fields?: Field[];

  giphy?: Images;
}

export interface GetOrCreateCallRequest {
  members_limit?: number;

  notify?: boolean;

  ring?: boolean;

  video?: boolean;

  data?: CallRequest;
}

export interface GetOrCreateCallResponse {
  created: boolean;

  duration: string;

  members: MemberResponse[];

  own_capabilities: OwnCapability[];

  call: CallResponse;
}

export interface GetRateLimitsResponse {
  duration: string;

  android?: Record<string, LimitInfo>;

  ios?: Record<string, LimitInfo>;

  server_side?: Record<string, LimitInfo>;

  web?: Record<string, LimitInfo>;
}

export interface GetReactionsResponse {
  duration: string;

  reactions: Reaction[];
}

export interface GetRepliesResponse {
  duration: string;

  messages: MessageResponse[];
}

export interface GetReviewQueueItemResponse {
  duration: string;

  history: ReviewQueueItem[];

  item?: ReviewQueueItem;
}

export interface GetTaskResponse {
  created_at: Date;

  duration: string;

  status: string;

  task_id: string;

  updated_at: Date;

  error?: ErrorResult;

  result?: Record<string, any>;
}

export interface GetThreadResponse {
  duration: string;

  thread: ThreadStateResponse;
}

export interface GetUserModerationReportResponse {
  duration: string;

  user_blocks: UserBlock[];

  user_mutes: UserMute[];

  user: UserResponse;
}

export interface GoLiveRequest {
  recording_storage_name?: string;

  start_hls?: boolean;

  start_recording?: boolean;

  start_rtmp_broadcasts?: boolean;

  start_transcription?: boolean;

  transcription_storage_name?: string;
}

export interface GoLiveResponse {
  duration: string;

  call: CallResponse;
}

export interface GoogleVisionConfig {
  enabled?: boolean;
}

export interface HLSSettings {
  auto_on: boolean;

  enabled: boolean;

  quality_tracks: string[];

  layout?: LayoutSettings;
}

export interface HLSSettingsRequest {
  quality_tracks: string[];

  auto_on?: boolean;

  enabled?: boolean;

  layout?: LayoutSettingsRequest;
}

export interface HLSSettingsResponse {
  auto_on: boolean;

  enabled: boolean;

  quality_tracks: string[];

  layout: LayoutSettingsResponse;
}

export interface HideChannelRequest {
  clear_history?: boolean;

  user_id?: string;

  user?: UserRequest;
}

export interface HideChannelResponse {
  duration: string;
}

export interface HuaweiConfig {
  disabled?: boolean;

  id?: string;

  secret?: string;
}

export interface HuaweiConfigFields {
  enabled: boolean;

  id?: string;

  secret?: string;
}

export interface ImageData {
  frames: string;

  height: string;

  size: string;

  url: string;

  width: string;
}

export interface ImageSize {
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center';

  height?: number;

  resize?: 'clip' | 'crop' | 'scale' | 'fill';

  width?: number;
}

export interface ImageUploadRequest {
  file?: string;

  upload_sizes?: ImageSize[];

  user?: OnlyUserID;
}

export interface ImageUploadResponse {
  duration: string;

  file?: string;

  thumb_url?: string;

  upload_sizes?: ImageSize[];
}

export interface Images {
  fixed_height: ImageData;

  fixed_height_downsampled: ImageData;

  fixed_height_still: ImageData;

  fixed_width: ImageData;

  fixed_width_downsampled: ImageData;

  fixed_width_still: ImageData;

  original: ImageData;
}

export interface ImportTask {
  created_at: Date;

  id: string;

  mode: string;

  path: string;

  state: string;

  updated_at: Date;

  history: ImportTaskHistory[];

  size?: number;
}

export interface ImportTaskHistory {
  created_at: Date;

  next_state: string;

  prev_state: string;
}

export interface Label {
  name: string;

  harm_labels?: string[];

  phrase_list_ids?: number[];
}

export interface LabelThresholds {
  block?: number;

  flag?: number;
}

export interface LayoutSettings {
  external_app_url: string;

  external_css_url: string;

  name: 'spotlight' | 'grid' | 'single-participant' | 'mobile' | 'custom';

  options?: Record<string, any>;
}

export interface LayoutSettingsRequest {
  name: 'spotlight' | 'grid' | 'single-participant' | 'mobile' | 'custom';

  external_app_url?: string;

  external_css_url?: string;

  options?: Record<string, any>;
}

export interface LayoutSettingsResponse {
  external_app_url: string;

  external_css_url: string;

  name: 'spotlight' | 'grid' | 'single-participant' | 'mobile' | 'custom';

  options?: Record<string, any>;
}

export interface LimitInfo {
  limit: number;

  remaining: number;

  reset: number;
}

export interface LimitsSettings {
  max_duration_seconds?: number;

  max_participants?: number;
}

export interface LimitsSettingsRequest {
  max_duration_seconds?: number;

  max_participants?: number;
}

export interface LimitsSettingsResponse {
  max_duration_seconds?: number;

  max_participants?: number;
}

export interface ListBlockListResponse {
  duration: string;

  blocklists: BlockListResponse[];
}

export interface ListCallTypeResponse {
  duration: string;

  call_types: Record<string, CallTypeResponse>;
}

export interface ListChannelTypesResponse {
  duration: string;

  channel_types: Record<string, ChannelTypeConfig>;
}

export interface ListCommandsResponse {
  duration: string;

  commands: Command[];
}

export interface ListDevicesResponse {
  duration: string;

  devices: Device[];
}

export interface ListExternalStorageResponse {
  duration: string;

  external_storages: Record<string, ExternalStorageResponse>;
}

export interface ListImportsResponse {
  duration: string;

  import_tasks: ImportTask[];
}

export interface ListPermissionsResponse {
  duration: string;

  permissions: Permission[];
}

export interface ListPushProvidersResponse {
  duration: string;

  push_providers: PushProviderResponse[];
}

export interface ListRecordingsResponse {
  duration: string;

  recordings: CallRecording[];
}

export interface ListRolesResponse {
  duration: string;

  roles: Role[];
}

export interface ListTranscriptionsResponse {
  duration: string;

  transcriptions: CallTranscription[];
}

export interface Location {
  continent_code: string;

  country_iso_code: string;

  subdivision_iso_code: string;
}

export interface MOSStats {
  average_score: number;

  max_score: number;

  min_score: number;

  hist_og_ram_duration_seconds: number[];
}

export interface MarkChannelsReadRequest {
  user_id?: string;

  read_by_channel?: Record<string, string>;

  user?: UserRequest;
}

export interface MarkReadRequest {
  message_id?: string;

  thread_id?: string;

  user_id?: string;

  user?: UserRequest;
}

export interface MarkReadResponse {
  duration: string;

  event?: MessageReadEvent;
}

export interface MarkUnreadRequest {
  message_id?: string;

  thread_id?: string;

  user_id?: string;

  user?: UserRequest;
}

export interface MediaPubSubHint {
  audio_published: boolean;

  audio_subscribed: boolean;

  video_published: boolean;

  video_subscribed: boolean;
}

export interface MemberRequest {
  user_id: string;

  role?: string;

  custom?: Record<string, any>;
}

export interface MemberResponse {
  created_at: Date;

  updated_at: Date;

  user_id: string;

  custom: Record<string, any>;

  user: UserResponse;

  deleted_at?: Date;

  role?: string;
}

export interface MembersResponse {
  duration: string;

  members: ChannelMember[];
}

export interface Message {
  cid: string;

  created_at: Date;

  deleted_reply_count: number;

  html: string;

  id: string;

  pinned: boolean;

  reply_count: number;

  shadowed: boolean;

  silent: boolean;

  text: string;

  type: 'regular' | 'ephemeral' | 'error' | 'reply' | 'system' | 'deleted';

  updated_at: Date;

  attachments: Attachment[];

  latest_reactions: Reaction[];

  mentioned_users: UserObject[];

  own_reactions: Reaction[];

  custom: Record<string, any>;

  reaction_counts: Record<string, number>;

  reaction_groups: Record<string, ReactionGroupResponse>;

  reaction_scores: Record<string, number>;

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

  thread_participants?: UserObject[];

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  pinned_by?: UserObject;

  poll?: Poll;

  quoted_message?: Message;

  user?: UserObject;
}

export interface MessageActionRequest {
  form_data: Record<string, string>;

  user_id?: string;

  user?: UserRequest;
}

export interface MessageChangeSet {
  attachments: boolean;

  custom: boolean;

  html: boolean;

  mentioned_user_ids: boolean;

  mml: boolean;

  pin: boolean;

  quoted_message_id: boolean;

  silent: boolean;

  text: boolean;
}

export interface MessageFlagResponse {
  created_at: Date;

  created_by_automod: boolean;

  updated_at: Date;

  approved_at?: Date;

  reason?: string;

  rejected_at?: Date;

  reviewed_at?: Date;

  custom?: Record<string, any>;

  details?: FlagDetails;

  message?: Message;

  moderation_feedback?: FlagFeedback;

  moderation_result?: MessageModerationResult;

  reviewed_by?: UserResponse;

  user?: UserResponse;
}

export interface MessageHistoryEntryResponse {
  message_id: string;

  message_updated_at: Date;

  message_updated_by_id: string;

  text: string;

  attachments: Attachment[];

  custom: Record<string, any>;
}

export interface MessageModerationResult {
  action: string;

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

export interface MessageReadEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  last_read_message_id?: string;

  team?: string;

  thread?: ThreadResponse;

  user?: UserObject;
}

export interface MessageRequest {
  html?: string;

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

  type?: "''regular" | 'system';

  user_id?: string;

  attachments?: Attachment[];

  mentioned_users?: string[];

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface MessageResponse {
  cid: string;

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

  attachments: Attachment[];

  latest_reactions: ReactionResponse[];

  mentioned_users: UserResponse[];

  own_reactions: ReactionResponse[];

  custom: Record<string, any>;

  reaction_counts: Record<string, number>;

  reaction_scores: Record<string, number>;

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

  thread_participants?: UserResponse[];

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  pinned_by?: UserResponse;

  poll?: Poll;

  quoted_message?: Message;

  reaction_groups?: Record<string, ReactionGroupResponse>;
}

export interface MessageUpdate {
  old_text?: string;

  change_set?: MessageChangeSet;
}

export interface MessageWithChannelResponse {
  cid: string;

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

  attachments: Attachment[];

  latest_reactions: ReactionResponse[];

  mentioned_users: UserResponse[];

  own_reactions: ReactionResponse[];

  channel: ChannelResponse;

  custom: Record<string, any>;

  reaction_counts: Record<string, number>;

  reaction_scores: Record<string, number>;

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

  thread_participants?: UserResponse[];

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  pinned_by?: UserResponse;

  poll?: Poll;

  quoted_message?: Message;

  reaction_groups?: Record<string, ReactionGroupResponse>;
}

export interface ModerationActionConfig {
  action: string;

  description: string;

  entity_type: string;

  icon: string;

  order: number;

  custom: Record<string, any>;
}

export interface ModerationPayload {
  created_at?: Date;

  images?: string[];

  texts?: string[];

  videos?: string[];

  custom?: Record<string, any>;
}

export interface ModerationResponse {
  action: string;

  explicit: number;

  spam: number;

  toxic: number;
}

export interface ModerationUsageStats {
  bucket: string;

  metric: string;

  updated_at: Date;

  value: number;
}

export interface ModeratorStats {
  id: string;

  items_reviewed: number;

  action_counts: Record<string, number>;
}

export interface ModeratorStatsResponse {
  duration: string;

  moderator_stats: ModeratorStats[];
}

export interface MuteChannelRequest {
  expiration?: number;

  user_id?: string;

  channel_cids?: string[];

  user?: UserRequest;
}

export interface MuteChannelResponse {
  duration: string;

  channel_mutes?: ChannelMute[];

  channel_mute?: ChannelMute;

  own_user?: OwnUser;
}

export interface MuteRequest {
  target_ids: string[];

  timeout?: number;

  user_id?: string;

  user?: UserRequest;
}

export interface MuteResponse {
  duration: string;

  mutes?: UserMute[];

  non_existing_users?: string[];

  own_user?: OwnUser;
}

export interface MuteUsersRequest {
  audio?: boolean;

  mute_all_users?: boolean;

  muted_by_id?: string;

  screenshare?: boolean;

  screenshare_audio?: boolean;

  video?: boolean;

  user_ids?: string[];

  muted_by?: UserRequest;
}

export interface MuteUsersResponse {
  duration: string;
}

export interface NoiseCancellationSettings {
  mode: 'available' | 'disabled' | 'auto-on';
}

export interface NotificationSettings {
  enabled: boolean;

  call_live_started: EventNotificationSettings;

  call_missed: EventNotificationSettings;

  call_notification: EventNotificationSettings;

  call_ring: EventNotificationSettings;

  session_started: EventNotificationSettings;
}

export interface NullBool {
  has_value?: boolean;

  value?: boolean;
}

export interface NullTime {
  has_value?: boolean;

  value?: Date;
}

export interface OnlyUserID {
  id: string;
}

export const OwnCapability = {
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
  UPDATE_CALL_SETTINGS: 'update-call-settings',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type OwnCapability = (typeof OwnCapability)[keyof typeof OwnCapability];

export interface OwnUser {
  banned: boolean;

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

  channel_mutes: ChannelMute[];

  devices: Device[];

  mutes: UserMute[];

  custom: Record<string, any>;

  deactivated_at?: Date;

  deleted_at?: Date;

  invisible?: boolean;

  last_active?: Date;

  blocked_user_ids?: string[];

  latest_hidden_channels?: string[];

  teams?: string[];

  privacy_settings?: PrivacySettings;

  push_notifications?: PushNotificationSettings;
}

export interface PaginationParams {
  limit?: number;

  offset?: number;
}

export interface PendingMessage {
  channel?: Channel;

  message?: Message;

  metadata?: Record<string, string>;

  user?: UserObject;
}

export interface Permission {
  action: string;

  custom: boolean;

  description: string;

  id: string;

  level: 'app' | 'channel';

  name: string;

  owner: boolean;

  same_team: boolean;

  tags: string[];

  condition?: Record<string, any>;
}

export interface PinRequest {
  session_id: string;

  user_id: string;
}

export interface PinResponse {
  duration: string;
}

export interface Policy {
  action: number;

  created_at: Date;

  name: string;

  owner: boolean;

  priority: number;

  updated_at: Date;

  resources: string[];

  roles: string[];
}

export interface PolicyRequest {
  action: 'Deny' | 'Allow';

  name: string;

  owner: boolean;

  priority: number;

  resources: string[];

  roles: string[];
}

export interface Poll {
  allow_answers: boolean;

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

  latest_answers: PollVote[];

  options: PollOption[];

  own_votes: PollVote[];

  custom: Record<string, any>;

  latest_votes_by_option: Record<string, Array<PollVote | null>>;

  vote_counts_by_option: Record<string, number>;

  is_closed?: boolean;

  max_votes_allowed?: number;

  voting_visibility?: string;

  created_by?: UserObject;
}

export interface PollOption {
  id: string;

  text: string;

  custom: Record<string, any>;
}

export interface PollOptionInput {
  text?: string;

  custom?: Record<string, any>;
}

export interface PollOptionRequest {
  id: string;

  text?: string;

  custom?: Record<string, any>;
}

export interface PollOptionResponse {
  duration: string;

  poll_option: PollOptionResponseData;
}

export interface PollOptionResponseData {
  id: string;

  text: string;

  custom: Record<string, any>;
}

export interface PollResponse {
  duration: string;

  poll: PollResponseData;
}

export interface PollResponseData {
  allow_answers: boolean;

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

  options: PollOptionResponseData[];

  own_votes: PollVoteResponseData[];

  custom: Record<string, any>;

  latest_votes_by_option: Record<string, Array<PollVoteResponseData | null>>;

  vote_counts_by_option: Record<string, number>;

  is_closed?: boolean;

  max_votes_allowed?: number;

  created_by?: UserResponse;
}

export interface PollVote {
  created_at: Date;

  id: string;

  option_id: string;

  poll_id: string;

  updated_at: Date;

  answer_text?: string;

  is_answer?: boolean;

  user_id?: string;

  user?: UserObject;
}

export interface PollVoteResponse {
  duration: string;

  vote?: PollVoteResponseData;
}

export interface PollVoteResponseData {
  created_at: Date;

  id: string;

  option_id: string;

  poll_id: string;

  updated_at: Date;

  answer_text?: string;

  is_answer?: boolean;

  user_id?: string;

  user?: UserResponse;
}

export interface PollVotesResponse {
  duration: string;

  votes: PollVoteResponseData[];

  next?: string;

  prev?: string;
}

export interface PrivacySettings {
  read_receipts?: ReadReceipts;

  typing_indicators?: TypingIndicators;
}

export interface PrivacySettingsResponse {
  read_receipts?: ReadReceiptsResponse;

  typing_indicators?: TypingIndicatorsResponse;
}

export interface PublishedTrackInfo {
  codec_mime_type?: string;

  duration_seconds?: number;

  track_type?: string;
}

export interface PublisherAggregateStats {
  by_track_type?: Record<string, Count>;

  total?: Count;
}

export interface PushConfig {
  version: 'v1' | 'v2';

  offline_only?: boolean;
}

export interface PushNotificationFields {
  offline_only: boolean;

  version: string;

  apn: APNConfigFields;

  firebase: FirebaseConfigFields;

  huawei: HuaweiConfigFields;

  xiaomi: XiaomiConfigFields;

  providers?: PushProvider[];
}

export interface PushNotificationSettings {
  disabled?: boolean;

  disabled_until?: Date;
}

export interface PushNotificationSettingsInput {
  disabled?: NullBool;

  disabled_until?: NullTime;
}

export interface PushNotificationSettingsResponse {
  disabled?: boolean;

  disabled_until?: Date;
}

export interface PushProvider {
  created_at: Date;

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

export interface PushProviderResponse {
  created_at: Date;

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

export interface QueryBannedUsersRequest {
  filter_conditions: Record<string, any>;

  exclude_expired_bans?: boolean;

  limit?: number;

  offset?: number;

  user_id?: string;

  sort?: SortParamRequest[];

  user?: UserRequest;
}

export interface QueryBannedUsersResponse {
  duration: string;

  bans: BanResponse[];
}

export interface QueryCallMembersRequest {
  id: string;

  type: string;

  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter_conditions?: Record<string, any>;
}

export interface QueryCallMembersResponse {
  duration: string;

  members: MemberResponse[];

  next?: string;

  prev?: string;
}

export interface QueryCallStatsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter_conditions?: Record<string, any>;
}

export interface QueryCallStatsResponse {
  duration: string;

  reports: CallStatsReportSummaryResponse[];

  next?: string;

  prev?: string;
}

export interface QueryCallsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter_conditions?: Record<string, any>;
}

export interface QueryCallsResponse {
  duration: string;

  calls: CallStateResponseFields[];

  next?: string;

  prev?: string;
}

export interface QueryChannelsRequest {
  limit?: number;

  member_limit?: number;

  message_limit?: number;

  offset?: number;

  state?: boolean;

  user_id?: string;

  sort?: SortParamRequest[];

  filter_conditions?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryChannelsResponse {
  duration: string;

  channels: ChannelStateResponseFields[];
}

export interface QueryFeedModerationTemplate {
  created_at: Date;

  name: string;

  updated_at: Date;

  config?: FeedsModerationTemplateConfig;
}

export interface QueryFeedModerationTemplatesResponse {
  duration: string;

  templates: QueryFeedModerationTemplate[];
}

export interface QueryMembersRequest {
  type: string;

  filter_conditions: Record<string, any>;

  id?: string;

  limit?: number;

  offset?: number;

  user_id?: string;

  members?: ChannelMember[];

  sort?: SortParamRequest[];

  user?: UserRequest;
}

export interface QueryMessageFlagsRequest {
  limit?: number;

  offset?: number;

  show_deleted_messages?: boolean;

  user_id?: string;

  sort?: SortParam[];

  filter_conditions?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryMessageFlagsResponse {
  duration: string;

  flags: MessageFlagResponse[];
}

export interface QueryMessageHistoryRequest {
  filter: Record<string, any>;

  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];
}

export interface QueryMessageHistoryResponse {
  duration: string;

  message_history: MessageHistoryEntryResponse[];

  next?: string;

  prev?: string;
}

export interface QueryModerationLogsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryModerationLogsResponse {
  duration: string;

  l_og_s: ActionLogResponse[];

  next?: string;

  prev?: string;
}

export interface QueryPollVotesRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryPollsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryPollsResponse {
  duration: string;

  polls: PollResponseData[];

  next?: string;

  prev?: string;
}

export interface QueryReactionsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryReactionsResponse {
  duration: string;

  reactions: ReactionResponse[];

  next?: string;

  prev?: string;
}

export interface QueryReviewQueueRequest {
  limit?: number;

  lock_moderator_duration?: number;

  lock_moderator_id?: string;

  next?: string;

  prev?: string;

  stats_only?: boolean;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryReviewQueueResponse {
  duration: string;

  items: ReviewQueueItem[];

  action_config: Record<string, Array<ModerationActionConfig | null>>;

  stats: Record<string, number>;

  next?: string;

  prev?: string;
}

export interface QueryThreadsRequest {
  limit?: number;

  member_limit?: number;

  next?: string;

  participant_limit?: number;

  prev?: string;

  reply_limit?: number;

  user_id?: string;

  user?: UserRequest;
}

export interface QueryThreadsResponse {
  duration: string;

  threads: ThreadStateResponse[];

  next?: string;

  prev?: string;
}

export interface QueryUsageStatsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryUsageStatsResponse {
  duration: string;

  items: ModerationUsageStats[];

  next?: string;

  prev?: string;
}

export interface QueryUsersPayload {
  filter_conditions: Record<string, any>;

  include_deactivated_users?: boolean;

  limit?: number;

  offset?: number;

  presence?: boolean;

  user_id?: string;

  sort?: SortParamRequest[];

  user?: UserRequest;
}

export interface QueryUsersResponse {
  duration: string;

  users: FullUserResponse[];
}

export interface QueueStatsResponse {
  avg_time_to_action: number;

  duration: string;

  time_to_action_buckets: Record<string, number>;
}

export interface RTMPIngress {
  address: string;
}

export interface RTMPLocation {
  name: string;

  stream_key: string;

  stream_url: string;
}

export interface RTMPSettings {
  enabled: boolean;

  quality_name?: string;

  layout?: LayoutSettings;

  location?: RTMPLocation;
}

export interface RTMPSettingsRequest {
  enabled?: boolean;

  quality?:
    | '360p'
    | '480p'
    | '720p'
    | '1080p'
    | '1440p'
    | 'portrait-360x640'
    | 'portrait-480x854'
    | 'portrait-720x1280'
    | 'portrait-1080x1920'
    | 'portrait-1440x2560';

  layout?: LayoutSettingsRequest;
}

export interface RTMPSettingsResponse {
  enabled: boolean;

  quality: string;

  layout: LayoutSettingsResponse;
}

export interface Reaction {
  created_at: Date;

  message_id: string;

  score: number;

  type: string;

  updated_at: Date;

  custom: Record<string, any>;

  user_id?: string;

  user?: UserObject;
}

export interface ReactionGroupResponse {
  count: number;

  first_reaction_at: Date;

  last_reaction_at: Date;

  sum_scores: number;
}

export interface ReactionRemovalResponse {
  duration: string;

  message?: Message;

  reaction?: Reaction;
}

export interface ReactionRequest {
  type: string;

  created_at?: Date;

  score?: number;

  updated_at?: Date;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface ReactionResponse {
  created_at: Date;

  message_id: string;

  score: number;

  type: string;

  updated_at: Date;

  user_id: string;

  custom: Record<string, any>;

  user: UserResponse;
}

export interface ReactivateUserRequest {
  created_by_id?: string;

  name?: string;

  restore_messages?: boolean;
}

export interface ReactivateUserResponse {
  duration: string;

  user?: UserResponse;
}

export interface ReactivateUsersRequest {
  user_ids: string[];

  created_by_id?: string;

  restore_channels?: boolean;

  restore_messages?: boolean;
}

export interface ReactivateUsersResponse {
  duration: string;

  task_id: string;
}

export interface Read {
  last_read: Date;

  unread_messages: number;

  last_read_message_id?: string;

  user?: UserObject;
}

export interface ReadReceipts {
  enabled?: boolean;
}

export interface ReadReceiptsResponse {
  enabled: boolean;
}

export interface ReadStateResponse {
  last_read: Date;

  unread_messages: number;

  user: UserResponse;

  last_read_message_id?: string;
}

export interface RecordSettings {
  audio_only: boolean;

  mode: string;

  quality: string;

  layout?: LayoutSettings;
}

export interface RecordSettingsRequest {
  mode: 'available' | 'disabled' | 'auto-on';

  audio_only?: boolean;

  quality?:
    | '360p'
    | '480p'
    | '720p'
    | '1080p'
    | '1440p'
    | 'portrait-360x640'
    | 'portrait-480x854'
    | 'portrait-720x1280'
    | 'portrait-1080x1920'
    | 'portrait-1440x2560';

  layout?: LayoutSettingsRequest;
}

export interface RecordSettingsResponse {
  audio_only: boolean;

  mode: string;

  quality: string;

  layout: LayoutSettingsResponse;
}

export interface Response {
  duration: string;
}

export interface RestoreActionRequest {}

export interface RestoreUsersRequest {
  user_ids: string[];
}

export interface ReviewQueueItem {
  content_changed: boolean;

  created_at: Date;

  entity_id: string;

  entity_type: string;

  has_image: boolean;

  has_text: boolean;

  has_video: boolean;

  id: string;

  moderation_payload_hash: string;

  recommended_action: string;

  reviewed_by: string;

  severity: number;

  status: string;

  updated_at: Date;

  actions: ActionLog[];

  bans: Ban[];

  flags: Flag2[];

  languages: string[];

  completed_at: NullTime;

  reviewed_at: NullTime;

  assigned_to?: UserObject;

  entity_creator?: UserObject;

  feeds_v2_activity?: EnrichedActivity;

  feeds_v2_reaction?: Reaction;

  message?: Message;

  moderation_payload?: ModerationPayload;
}

export interface RingSettings {
  auto_cancel_timeout_ms: number;

  incoming_call_timeout_ms: number;

  missed_call_timeout_ms: number;
}

export interface RingSettingsRequest {
  auto_cancel_timeout_ms: number;

  incoming_call_timeout_ms: number;

  missed_call_timeout_ms?: number;
}

export interface RingSettingsResponse {
  auto_cancel_timeout_ms: number;

  incoming_call_timeout_ms: number;

  missed_call_timeout_ms: number;
}

export interface Role {
  created_at: Date;

  custom: boolean;

  name: string;

  updated_at: Date;

  scopes: string[];
}

export interface S3Request {
  s3_region: string;

  s3_api_key?: string;

  s3_secret?: string;
}

export interface SFULocationResponse {
  datacenter: string;

  id: string;

  coordinates: Coordinates;

  location: Location;
}

export interface ScreensharingSettings {
  access_request_enabled: boolean;

  enabled: boolean;

  target_resolution?: TargetResolution;
}

export interface ScreensharingSettingsRequest {
  access_request_enabled?: boolean;

  enabled?: boolean;

  target_resolution?: TargetResolution;
}

export interface ScreensharingSettingsResponse {
  access_request_enabled: boolean;

  enabled: boolean;

  target_resolution?: TargetResolution;
}

export interface SearchRequest {
  filter_conditions: Record<string, any>;

  limit?: number;

  next?: string;

  offset?: number;

  query?: string;

  sort?: SortParamRequest[];

  message_filter_conditions?: Record<string, any>;
}

export interface SearchResponse {
  duration: string;

  results: SearchResult[];

  next?: string;

  previous?: string;

  results_warning?: SearchWarning;
}

export interface SearchResult {
  message?: SearchResultMessage;
}

export interface SearchResultMessage {
  cid: string;

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

  attachments: Attachment[];

  latest_reactions: Reaction[];

  mentioned_users: UserObject[];

  own_reactions: Reaction[];

  custom: Record<string, any>;

  reaction_counts: Record<string, number>;

  reaction_groups: Record<string, ReactionGroupResponse>;

  reaction_scores: Record<string, number>;

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

  thread_participants?: UserObject[];

  channel?: ChannelResponse;

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  pinned_by?: UserObject;

  poll?: Poll;

  quoted_message?: Message;

  user?: UserObject;
}

export interface SearchWarning {
  warning_code: number;

  warning_description: string;

  channel_search_count?: number;

  channel_search_cids?: string[];
}

export interface SendCallEventRequest {
  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface SendCallEventResponse {
  duration: string;
}

export interface SendEventRequest {
  event: EventRequest;
}

export interface SendMessageRequest {
  message: MessageRequest;

  force_moderation?: boolean;

  keep_channel_hidden?: boolean;

  pending?: boolean;

  skip_enrich_url?: boolean;

  skip_push?: boolean;

  pending_message_metadata?: Record<string, string>;
}

export interface SendMessageResponse {
  duration: string;

  message: MessageResponse;

  pending_message_metadata?: Record<string, string>;
}

export interface SendReactionRequest {
  reaction: ReactionRequest;

  enforce_unique?: boolean;

  skip_push?: boolean;
}

export interface SendReactionResponse {
  duration: string;

  message: MessageResponse;

  reaction: ReactionResponse;
}

export interface SendUserCustomEventRequest {
  event: UserCustomEventRequest;
}

export interface ShowChannelRequest {
  user_id?: string;

  user?: UserRequest;
}

export interface ShowChannelResponse {
  duration: string;
}

export interface SortParam {
  direction?: number;

  field?: string;
}

export interface SortParamRequest {
  direction?: number;

  field?: string;
}

export interface StartHLSBroadcastingRequest {}

export interface StartHLSBroadcastingResponse {
  duration: string;

  playlist_url: string;
}

export interface StartRTMPBroadcastsRequest {
  name: string;

  stream_url: string;

  quality?:
    | '360p'
    | '480p'
    | '720p'
    | '1080p'
    | '1440p'
    | 'portrait-360x640'
    | 'portrait-480x854'
    | 'portrait-720x1280'
    | 'portrait-1080x1920'
    | 'portrait-1440x2560';

  stream_key?: string;

  layout?: LayoutSettingsRequest;
}

export interface StartRTMPBroadcastsResponse {
  duration: string;
}

export interface StartRecordingRequest {
  recording_external_storage?: string;
}

export interface StartRecordingResponse {
  duration: string;
}

export interface StartTranscriptionRequest {
  transcription_external_storage?: string;
}

export interface StartTranscriptionResponse {
  duration: string;
}

export interface StopAllRTMPBroadcastsRequest {}

export interface StopAllRTMPBroadcastsResponse {
  duration: string;
}

export interface StopHLSBroadcastingRequest {}

export interface StopHLSBroadcastingResponse {
  duration: string;
}

export interface StopLiveRequest {}

export interface StopLiveResponse {
  duration: string;

  call: CallResponse;
}

export interface StopRTMPBroadcastsRequest {}

export interface StopRTMPBroadcastsResponse {
  duration: string;
}

export interface StopRecordingRequest {}

export interface StopRecordingResponse {
  duration: string;
}

export interface StopTranscriptionRequest {}

export interface StopTranscriptionResponse {
  duration: string;
}

export interface SubmitActionRequest {
  action_type:
    | 'mark_safe'
    | 'delete_message'
    | 'delete_activity'
    | 'delete_reaction'
    | 'ban'
    | 'custom'
    | 'unban'
    | 'restore'
    | 'delete_user'
    | 'unblock';

  item_id: string;

  user_id?: string;

  ban?: BanActionRequest;

  custom?: CustomActionRequest;

  delete_message?: DeleteMessageRequest;

  delete_reaction?: DeleteReactionRequest;

  delete_user?: DeleteUserRequest;

  unban?: UnbanActionRequest;

  user?: UserRequest;
}

export interface SubmitActionResponse {
  duration: string;

  item?: ReviewQueueItem;
}

export interface Subsession {
  ended_at: number;

  joined_at: number;

  sfu_id: string;

  pub_sub_hint?: MediaPubSubHint;
}

export interface TURNAggregatedStats {
  tcp?: Count;

  total?: Count;
}

export interface TargetResolution {
  bitrate: number;

  height: number;

  width: number;
}

export interface ThreadParticipant {
  app_pk: number;

  channel_cid: string;

  created_at: Date;

  last_read_at: Date;

  custom: Record<string, any>;

  last_thread_message_at?: Date;

  left_thread_at?: Date;

  thread_id?: string;

  user_id?: string;

  user?: UserObject;
}

export interface ThreadResponse {
  channel_cid: string;

  created_at: Date;

  created_by_user_id: string;

  parent_message_id: string;

  title: string;

  updated_at: Date;

  custom: Record<string, any>;

  active_participant_count?: number;

  deleted_at?: Date;

  last_message_at?: Date;

  participant_count?: number;

  reply_count?: number;

  thread_participants?: ThreadParticipant[];

  channel?: ChannelResponse;

  created_by?: UserObject;

  parent_message?: Message;
}

export interface ThreadState {
  channel_cid: string;

  created_at: Date;

  parent_message_id: string;

  title: string;

  updated_at: Date;

  latest_replies: Message[];

  custom: Record<string, any>;

  active_participant_count?: number;

  deleted_at?: Date;

  last_message_at?: Date;

  participant_count?: number;

  reply_count?: number;

  read?: Read[];

  thread_participants?: ThreadParticipant[];

  channel?: Channel;

  created_by?: UserObject;

  parent_message?: Message;
}

export interface ThreadStateResponse {
  channel_cid: string;

  created_at: Date;

  created_by_user_id: string;

  parent_message_id: string;

  title: string;

  updated_at: Date;

  latest_replies: Message[];

  custom: Record<string, any>;

  active_participant_count?: number;

  deleted_at?: Date;

  last_message_at?: Date;

  participant_count?: number;

  reply_count?: number;

  read?: Read[];

  thread_participants?: ThreadParticipant[];

  channel?: ChannelResponse;

  created_by?: UserResponse;

  parent_message?: Message;
}

export interface Thresholds {
  explicit?: LabelThresholds;

  spam?: LabelThresholds;

  toxic?: LabelThresholds;
}

export interface ThumbnailResponse {
  image_url: string;
}

export interface ThumbnailsSettings {
  enabled: boolean;
}

export interface ThumbnailsSettingsRequest {
  enabled?: boolean;
}

export interface ThumbnailsSettingsResponse {
  enabled: boolean;
}

export interface Time {}

export interface TimeStats {
  average_seconds: number;

  max_seconds: number;
}

export interface TranscriptionSettings {
  closed_caption_mode: string;

  mode: 'available' | 'disabled' | 'auto-on';

  languages: string[];
}

export interface TranscriptionSettingsRequest {
  mode: 'available' | 'disabled' | 'auto-on';

  closed_caption_mode?: string;

  languages?: string[];
}

export interface TranscriptionSettingsResponse {
  closed_caption_mode: string;

  mode: 'available' | 'disabled' | 'auto-on';

  languages: string[];
}

export interface TranslateMessageRequest {
  language:
    | 'af'
    | 'sq'
    | 'am'
    | 'ar'
    | 'az'
    | 'bn'
    | 'bs'
    | 'bg'
    | 'zh'
    | 'zh-TW'
    | 'hr'
    | 'cs'
    | 'da'
    | 'fa-AF'
    | 'nl'
    | 'en'
    | 'et'
    | 'fi'
    | 'fr'
    | 'fr-CA'
    | 'ka'
    | 'de'
    | 'el'
    | 'ha'
    | 'he'
    | 'hi'
    | 'hu'
    | 'id'
    | 'it'
    | 'ja'
    | 'ko'
    | 'lv'
    | 'ms'
    | 'no'
    | 'fa'
    | 'ps'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'ru'
    | 'sr'
    | 'sk'
    | 'sl'
    | 'so'
    | 'es'
    | 'es-MX'
    | 'sw'
    | 'sv'
    | 'tl'
    | 'ta'
    | 'th'
    | 'tr'
    | 'uk'
    | 'ur'
    | 'vi';
}

export interface TruncateChannelRequest {
  hard_delete?: boolean;

  skip_push?: boolean;

  truncated_at?: Date;

  user_id?: string;

  message?: MessageRequest;

  user?: UserRequest;
}

export interface TruncateChannelResponse {
  duration: string;

  channel?: ChannelResponse;

  message?: Message;
}

export interface TypingIndicators {
  enabled?: boolean;
}

export interface TypingIndicatorsResponse {
  enabled: boolean;
}

export interface UnbanActionRequest {}

export interface UnbanRequest {
  unbanned_by_id?: string;

  unbanned_by?: UserRequest;
}

export interface UnbanResponse {
  duration: string;
}

export interface UnblockActionRequest {}

export interface UnblockUserRequest {
  user_id: string;
}

export interface UnblockUserResponse {
  duration: string;
}

export interface UnblockUsersRequest {
  blocked_user_id: string;

  user_id?: string;

  user?: UserRequest;
}

export interface UnblockUsersResponse {
  duration: string;
}

export interface UnmuteChannelRequest {
  expiration?: number;

  user_id?: string;

  channel_cids?: string[];

  user?: UserRequest;
}

export interface UnmuteRequest {
  target_ids: string[];

  user_id?: string;

  user?: UserRequest;
}

export interface UnmuteResponse {
  duration: string;

  non_existing_users?: string[];
}

export interface UnpinRequest {
  session_id: string;

  user_id: string;
}

export interface UnpinResponse {
  duration: string;
}

export interface UnreadCountsBatchRequest {
  user_ids: string[];
}

export interface UnreadCountsBatchResponse {
  duration: string;

  counts_by_user: Record<string, UnreadCountsResponse>;
}

export interface UnreadCountsChannel {
  channel_id: string;

  last_read: Date;

  unread_count: number;
}

export interface UnreadCountsChannelType {
  channel_count: number;

  channel_type: string;

  unread_count: number;
}

export interface UnreadCountsResponse {
  total_unread_count: number;

  total_unread_threads_count: number;

  channel_type: UnreadCountsChannelType[];

  channels: UnreadCountsChannel[];

  threads: UnreadCountsThread[];
}

export interface UnreadCountsThread {
  last_read: Date;

  last_read_message_id: string;

  parent_message_id: string;

  unread_count: number;
}

export interface UpdateAppRequest {
  async_url_enrich_enabled?: boolean;

  auto_translation_enabled?: boolean;

  before_message_send_hook_url?: string;

  cdn_expiration_seconds?: number;

  channel_hide_members_only?: boolean;

  custom_action_handler_url?: string;

  disable_auth_checks?: boolean;

  disable_permissions_checks?: boolean;

  enforce_unique_usernames?: 'no' | 'app' | 'team';

  feeds_moderation_enabled?: boolean;

  feeds_v2_region?: string;

  image_moderation_enabled?: boolean;

  migrate_permissions_to_v2?: boolean;

  moderation_enabled?: boolean;

  moderation_webhook_url?: string;

  multi_tenant_enabled?: boolean;

  permission_version?: 'v1' | 'v2';

  reminders_interval?: number;

  reminders_max_members?: number;

  revoke_tokens_issued_before?: Date;

  sns_key?: string;

  sns_secret?: string;

  sns_topic_arn?: string;

  sqs_key?: string;

  sqs_secret?: string;

  sqs_url?: string;

  video_provider?: 'agora' | 'hms';

  webhook_url?: string;

  allowed_flag_reasons?: string[];

  image_moderation_block_labels?: string[];

  image_moderation_labels?: string[];

  user_search_disallowed_roles?: string[];

  webhook_events?: string[];

  agora_options?: Config;

  apn_config?: APNConfig;

  async_moderation_config?: AsyncModerationConfiguration;

  datadog_info?: DataDogInfo;

  file_upload_config?: FileUploadConfig;

  firebase_config?: FirebaseConfig;

  grants?: Record<string, string[]>;

  hms_options?: Config;

  huawei_config?: HuaweiConfig;

  image_upload_config?: FileUploadConfig;

  push_config?: PushConfig;

  xiaomi_config?: XiaomiConfig;
}

export interface UpdateBlockListRequest {
  words?: string[];
}

export interface UpdateCallMembersRequest {
  remove_members?: string[];

  update_members?: MemberRequest[];
}

export interface UpdateCallMembersResponse {
  duration: string;

  members: MemberResponse[];
}

export interface UpdateCallRequest {
  starts_at?: Date;

  custom?: Record<string, any>;

  settings_override?: CallSettingsRequest;
}

export interface UpdateCallResponse {
  duration: string;

  members: MemberResponse[];

  own_capabilities: OwnCapability[];

  call: CallResponse;
}

export interface UpdateCallTypeRequest {
  external_storage?: string;

  grants?: Record<string, string[]>;

  notification_settings?: NotificationSettings;

  settings?: CallSettingsRequest;
}

export interface UpdateCallTypeResponse {
  created_at: Date;

  duration: string;

  name: string;

  updated_at: Date;

  grants: Record<string, string[]>;

  notification_settings: NotificationSettings;

  settings: CallSettingsResponse;

  external_storage?: string;
}

export interface UpdateChannelPartialRequest {
  user_id?: string;

  unset?: string[];

  set?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdateChannelPartialResponse {
  duration: string;

  members: ChannelMemberResponse[];

  channel?: ChannelResponse;
}

export interface UpdateChannelRequest {
  accept_invite?: boolean;

  cooldown?: number;

  hide_history?: boolean;

  reject_invite?: boolean;

  skip_push?: boolean;

  user_id?: string;

  add_members?: ChannelMember[];

  add_moderators?: string[];

  assign_roles?: ChannelMember[];

  demote_moderators?: string[];

  invites?: ChannelMember[];

  remove_members?: string[];

  data?: ChannelInput;

  message?: MessageRequest;

  user?: UserRequest;
}

export interface UpdateChannelResponse {
  duration: string;

  members: ChannelMember[];

  channel?: ChannelResponse;

  message?: Message;
}

export interface UpdateChannelTypeRequest {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  max_message_length: number;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  connect_events?: boolean;

  custom_events?: boolean;

  mark_messages_pending?: boolean;

  mutes?: boolean;

  partition_size?: number;

  partition_ttl?: string;

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

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  commands?: string[];

  permissions?: PolicyRequest[];

  automod_thresholds?: Thresholds;

  grants?: Record<string, string[]>;
}

export interface UpdateChannelTypeResponse {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

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

  commands: string[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: number;

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;
}

export interface UpdateCommandRequest {
  description: string;

  args?: string;

  set?: string;
}

export interface UpdateCommandResponse {
  duration: string;

  command?: Command;
}

export interface UpdateExternalStorageRequest {
  bucket: string;

  storage_type: 's3' | 'gcs' | 'abs';

  gcs_credentials?: string;

  path?: string;

  aws_s3?: S3Request;

  azure_blob?: AzureRequest;
}

export interface UpdateExternalStorageResponse {
  bucket: string;

  duration: string;

  name: string;

  path: string;

  type: 's3' | 'gcs' | 'abs';
}

export interface UpdateMessagePartialRequest {
  skip_enrich_url?: boolean;

  user_id?: string;

  unset?: string[];

  set?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdateMessagePartialResponse {
  duration: string;

  message?: Message;

  pending_message_metadata?: Record<string, string>;
}

export interface UpdateMessageRequest {
  message: MessageRequest;

  skip_enrich_url?: boolean;
}

export interface UpdateMessageResponse {
  duration: string;

  message: Message;

  pending_message_metadata?: Record<string, string>;
}

export interface UpdatePollOptionRequest {
  id: string;

  text: string;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdatePollPartialRequest {
  user_id?: string;

  unset?: string[];

  set?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdatePollRequest {
  id: string;

  name: string;

  allow_answers?: boolean;

  allow_user_suggested_options?: boolean;

  description?: string;

  enforce_unique_vote?: boolean;

  is_closed?: boolean;

  max_votes_allowed?: number;

  user_id?: string;

  voting_visibility?: 'anonymous' | 'public';

  options?: PollOptionRequest[];

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdateThreadPartialRequest {
  user_id?: string;

  unset?: string[];

  set?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdateThreadPartialResponse {
  duration: string;

  thread: ThreadResponse;
}

export interface UpdateUserPartialRequest {
  id: string;

  unset?: string[];

  set?: Record<string, any>;
}

export interface UpdateUserPermissionsRequest {
  user_id: string;

  grant_permissions?: string[];

  revoke_permissions?: string[];
}

export interface UpdateUserPermissionsResponse {
  duration: string;
}

export interface UpdateUsersPartialRequest {
  users: UpdateUserPartialRequest[];
}

export interface UpdateUsersRequest {
  users: Record<string, UserRequest>;
}

export interface UpdateUsersResponse {
  duration: string;

  membership_deletion_task_id: string;

  users: Record<string, FullUserResponse>;
}

export interface UpsertConfigRequest {
  key: string;

  async?: boolean;

  automod_platform_circumvention_config?: AutomodPlatformCircumventionConfig;

  automod_semantic_filters_config?: AutomodSemanticFiltersConfig;

  automod_toxicity_config?: AutomodToxicityConfig;

  aws_rek_og_nition_config?: AWSRekognitionConfig;

  block_list_config?: BlockListConfig;

  bodyguard_config?: BodyguardConfig;

  go_og_le_vision_config?: GoogleVisionConfig;
}

export interface UpsertConfigResponse {
  duration: string;

  config?: ConfigResponse;
}

export interface UpsertModerationTemplateRequest {
  name: string;

  config: FeedsModerationTemplateConfig;
}

export interface UpsertModerationTemplateResponse {
  created_at: Date;

  duration: string;

  name: string;

  updated_at: Date;

  config?: FeedsModerationTemplateConfig;
}

export interface UpsertPushProviderRequest {
  push_provider?: PushProvider;
}

export interface UpsertPushProviderResponse {
  duration: string;

  push_provider: PushProviderResponse;
}

export interface UserBlock {
  blocked_by_user_id: string;

  blocked_user_id: string;

  created_at: Date;
}

export interface UserCustomEventRequest {
  type: string;

  custom?: Record<string, any>;
}

export interface UserInfoResponse {
  image: string;

  name: string;

  roles: string[];

  custom: Record<string, any>;
}

export interface UserMute {
  created_at: Date;

  updated_at: Date;

  expires?: Date;

  target?: UserObject;

  user?: UserObject;
}

export interface UserMuteResponse {
  created_at: Date;

  updated_at: Date;

  expires?: Date;

  target?: UserResponse;

  user?: UserResponse;
}

export interface UserObject {
  banned: boolean;

  id: string;

  online: boolean;

  role: string;

  custom: Record<string, any>;

  ban_expires?: Date;

  created_at?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  invisible?: boolean;

  language?: string;

  last_active?: Date;

  revoke_tokens_issued_before?: Date;

  updated_at?: Date;

  teams?: string[];

  privacy_settings?: PrivacySettings;

  push_notifications?: PushNotificationSettings;
}

export interface UserRequest {
  id: string;

  image?: string;

  invisible?: boolean;

  language?: string;

  name?: string;

  role?: string;

  teams?: string[];

  custom?: Record<string, any>;

  privacy_settings?: PrivacySettings;

  push_notifications?: PushNotificationSettingsInput;
}

export interface UserResponse {
  banned: boolean;

  created_at: Date;

  id: string;

  invisible: boolean;

  language: string;

  online: boolean;

  role: string;

  shadow_banned: boolean;

  updated_at: Date;

  blocked_user_ids: string[];

  devices: Device[];

  teams: string[];

  custom: Record<string, any>;

  ban_expires?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  privacy_settings?: PrivacySettingsResponse;

  push_notifications?: PushNotificationSettingsResponse;
}

export interface UserSessionStats {
  freeze_duration_seconds: number;

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

  truncated?: boolean;

  webrtc_version?: string;

  published_tracks?: PublishedTrackInfo[];

  subsessions?: Subsession[];

  geolocation?: GeolocationResult;

  jitter?: TimeStats;

  latency?: TimeStats;

  max_publishing_video_quality?: VideoQuality;

  max_receiving_video_quality?: VideoQuality;

  pub_sub_hints?: MediaPubSubHint;

  publisher_audio_mos?: MOSStats;

  publisher_jitter?: TimeStats;

  publisher_latency?: TimeStats;

  publisher_video_quality_limitation_duration_seconds?: Record<string, number>;

  subscriber_audio_mos?: MOSStats;

  subscriber_jitter?: TimeStats;

  subscriber_latency?: TimeStats;

  timeline?: CallTimeline;
}

export interface UserStats {
  min_event_ts: number;

  session_stats: UserSessionStats[];

  info: UserInfoResponse;

  rating?: number;
}

export interface VideoQuality {
  usage_type?: string;

  resolution?: VideoResolution;
}

export interface VideoResolution {
  height: number;

  width: number;
}

export interface VideoSettings {
  access_request_enabled: boolean;

  camera_default_on: boolean;

  camera_facing: 'front' | 'back' | 'external';

  enabled: boolean;

  target_resolution: TargetResolution;
}

export interface VideoSettingsRequest {
  access_request_enabled?: boolean;

  camera_default_on?: boolean;

  camera_facing?: 'front' | 'back' | 'external';

  enabled?: boolean;

  target_resolution?: TargetResolution;
}

export interface VideoSettingsResponse {
  access_request_enabled: boolean;

  camera_default_on: boolean;

  camera_facing: 'front' | 'back' | 'external';

  enabled: boolean;

  target_resolution: TargetResolution;
}

export interface VoteData {
  answer_text?: string;

  option_id?: string;

  option?: PollOption;
}

export interface WSEvent {
  created_at: Date;

  type: string;

  custom: Record<string, any>;

  automoderation?: boolean;

  channel_id?: string;

  channel_type?: string;

  cid?: string;

  connection_id?: string;

  parent_id?: string;

  reason?: string;

  team?: string;

  thread_id?: string;

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

  thread?: ThreadResponse;

  user?: UserObject;
}

export interface WrappedUnreadCountsResponse {
  duration: string;

  total_unread_count: number;

  total_unread_threads_count: number;

  channel_type: UnreadCountsChannelType[];

  channels: UnreadCountsChannel[];

  threads: UnreadCountsThread[];
}

export interface XiaomiConfig {
  disabled?: boolean;

  package_name?: string;

  secret?: string;
}

export interface XiaomiConfigFields {
  enabled: boolean;

  package_name?: string;

  secret?: string;
}
