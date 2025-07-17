export interface AIImageConfig {
  enabled: boolean;

  ocr_rules: OCRRule[];

  rules: AWSRekognitionRule[];

  async?: boolean;
}

export interface AITextConfig {
  enabled: boolean;

  profile: string;

  rules: BodyguardRule[];

  severity_rules: BodyguardSeverityRule[];

  async?: boolean;
}

export interface AIVideoConfig {
  enabled: boolean;

  rules: AWSRekognitionRule[];

  async?: boolean;
}

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

  auth_key?: string;

  auth_type?: string;

  bundle_id?: string;

  host?: string;

  key_id?: string;

  notification_template?: string;

  p12_cert?: string;

  team_id?: string;
}

export interface APNS {
  body: string;

  title: string;

  content_available?: number;

  mutable_content?: number;

  sound?: string;

  data?: Record<string, any>;
}

export interface AWSRekognitionRule {
  action:
    | 'flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  label: string;

  min_confidence: number;
}

export interface AcceptFeedMemberInviteRequest {
  user_id?: string;

  user?: UserRequest;
}

export interface AcceptFeedMemberInviteResponse {
  duration: string;

  member: FeedMemberResponse;
}

export interface AcceptFollowRequest {
  source_fid: string;

  target_fid: string;

  follower_role?: string;
}

export interface AcceptFollowResponse {
  duration: string;

  follow: FollowResponse;
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

  reporter_type: string;

  review_queue_item_id: string;

  target_user_id: string;

  type: string;

  custom: Record<string, any>;

  review_queue_item?: ReviewQueueItem;

  target_user?: User;

  user?: User;
}

export interface ActionLogResponse {
  created_at: Date;

  id: string;

  reason: string;

  target_user_id: string;

  type: string;

  user_id: string;

  custom: Record<string, any>;

  review_queue_item?: ReviewQueueItemResponse;

  target_user?: UserResponse;

  user?: UserResponse;
}

export interface ActionSequence {
  action: string;

  blur: boolean;

  cooldown_period: number;

  threshold: number;

  time_window: number;

  warning: boolean;

  warning_text: string;
}

export interface ActiveCallsFPSStats {
  p05: number;

  p10: number;

  p50: number;

  p90: number;
}

export interface ActiveCallsLatencyStats {
  p50: number;

  p90: number;
}

export interface ActiveCallsMetrics {
  join_call_api?: JoinCallAPIMetrics;

  publishers?: PublishersMetrics;

  subscribers?: SubscribersMetrics;
}

export interface ActiveCallsSummary {
  active_calls: number;

  active_publishers: number;

  active_subscribers: number;

  participants: number;
}

export interface ActivityAddedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityDeletedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityLocation {
  lat: number;

  lng: number;
}

export interface ActivityMarkEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  type: string;

  mark_all_read?: boolean;

  mark_all_seen?: boolean;

  received_at?: Date;

  mark_read?: string[];

  mark_watched?: string[];

  user?: UserResponseCommonFields;
}

export interface ActivityMarkedEvent {
  all_read: boolean;

  all_seen: boolean;

  created_at: Date;

  feed_id: string;

  user_id: string;

  type: string;

  marked_read?: string[];

  marked_watched?: string[];
}

export interface ActivityPinResponse {
  created_at: Date;

  feed: string;

  updated_at: Date;

  activity: ActivityResponse;

  user: UserResponse;
}

export interface ActivityPinnedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  pinned_activity: PinActivityResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityProcessorConfig {}

export interface ActivityReactionAddedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityReactionDeletedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityReactionUpdatedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityRemovedFromFeedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityRequest {
  type: string;

  fids: string[];

  expires_at?: string;

  id?: string;

  parent_id?: string;

  poll_id?: string;

  text?: string;

  user_id?: string;

  visibility?: 'public' | 'private' | 'tag';

  visibility_tag?: string;

  attachments?: Attachment[];

  filter_tags?: string[];

  interest_tags?: string[];

  mentioned_user_ids?: string[];

  custom?: Record<string, any>;

  location?: ActivityLocation;

  search_data?: Record<string, any>;
}

export interface ActivityResponse {
  bookmark_count: number;

  comment_count: number;

  created_at: Date;

  id: string;

  popularity: number;

  reaction_count: number;

  score: number;

  share_count: number;

  type: string;

  updated_at: Date;

  visibility: 'public' | 'private' | 'tag';

  attachments: Attachment[];

  comments: CommentResponse[];

  feeds: string[];

  filter_tags: string[];

  interest_tags: string[];

  latest_reactions: FeedsReactionResponse[];

  mentioned_users: UserResponse[];

  own_bookmarks: BookmarkResponse[];

  own_reactions: FeedsReactionResponse[];

  custom: Record<string, any>;

  reaction_groups: Record<string, ReactionGroupResponse>;

  search_data: Record<string, any>;

  user: UserResponse;

  deleted_at?: Date;

  edited_at?: Date;

  expires_at?: Date;

  text?: string;

  visibility_tag?: string;

  current_feed?: FeedResponse;

  location?: ActivityLocation;

  moderation?: ModerationV2Response;

  object?: Record<string, any>;

  parent?: ActivityResponse;

  poll?: PollResponseData;
}

export interface ActivitySelectorConfig {
  cutoff_time?: Date;

  min_popularity?: number;

  type?: string;

  sort?: SortParam[];

  filter?: Record<string, any>;
}

export interface ActivityUnpinnedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  pinned_activity: PinActivityResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityUpdatedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface AddActivityRequest {
  type: string;

  fids: string[];

  expires_at?: string;

  id?: string;

  parent_id?: string;

  poll_id?: string;

  text?: string;

  user_id?: string;

  visibility?: 'public' | 'private' | 'tag';

  visibility_tag?: string;

  attachments?: Attachment[];

  filter_tags?: string[];

  interest_tags?: string[];

  mentioned_user_ids?: string[];

  custom?: Record<string, any>;

  location?: ActivityLocation;

  search_data?: Record<string, any>;
}

export interface AddActivityResponse {
  duration: string;

  activity: ActivityResponse;
}

export interface AddBookmarkRequest {
  folder_id?: string;

  user_id?: string;

  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;

  user?: UserRequest;
}

export interface AddBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface AddCommentReactionRequest {
  type: string;

  create_notification_activity?: boolean;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface AddCommentReactionResponse {
  duration: string;

  comment: CommentResponse;

  reaction: FeedsReactionResponse;
}

export interface AddCommentRequest {
  comment: string;

  object_id: string;

  object_type: string;

  create_notification_activity?: boolean;

  parent_id?: string;

  user_id?: string;

  attachments?: Attachment[];

  mentioned_user_ids?: string[];

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface AddCommentResponse {
  duration: string;

  comment: CommentResponse;
}

export interface AddCommentsBatchRequest {
  comments: AddCommentRequest[];
}

export interface AddCommentsBatchResponse {
  duration: string;

  comments: CommentResponse[];
}

export interface AddFolderRequest {
  name: string;

  custom?: Record<string, any>;
}

export interface AddReactionRequest {
  type: string;

  create_notification_activity?: boolean;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface AddReactionResponse {
  duration: string;

  activity: ActivityResponse;

  reaction: FeedsReactionResponse;
}

export interface AggregatedActivityResponse {
  activity_count: number;

  created_at: Date;

  group: string;

  score: number;

  updated_at: Date;

  user_count: number;

  activities: ActivityResponse[];
}

export interface AggregationConfig {
  format?: string;
}

export interface AnyEvent {
  created_at: Date;

  type: string;
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

  guest_user_creation_disabled: boolean;

  image_moderation_enabled: boolean;

  moderation_enabled: boolean;

  moderation_multitenant_blocklist_enabled: boolean;

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

  use_hook_v2: boolean;

  webhook_url: string;

  event_hooks: EventHook[];

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

  datadog_info?: DataDogInfo;

  moderation_dashboard_preferences?: ModerationDashboardPreferences;
}

export interface AsyncBulkImageModerationEvent {
  created_at: Date;

  finished_at: Date;

  started_at: Date;

  task_id: string;

  url: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface AsyncExportChannelsEvent {
  created_at: Date;

  finished_at: Date;

  started_at: Date;

  task_id: string;

  url: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface AsyncExportErrorEvent {
  created_at: Date;

  error: string;

  finished_at: Date;

  started_at: Date;

  task_id: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface AsyncExportModerationLogsEvent {
  created_at: Date;

  finished_at: Date;

  started_at: Date;

  task_id: string;

  url: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface AsyncExportUsersEvent {
  created_at: Date;

  finished_at: Date;

  started_at: Date;

  task_id: string;

  url: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
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
  enabled: boolean;

  rules: AutomodRule[];

  async?: boolean;
}

export interface AutomodRule {
  action:
    | 'flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  label: string;

  threshold: number;
}

export interface AutomodSemanticFiltersConfig {
  enabled: boolean;

  rules: AutomodSemanticFiltersRule[];

  async?: boolean;
}

export interface AutomodSemanticFiltersRule {
  action: 'flag' | 'shadow' | 'remove';

  name: string;

  threshold: number;
}

export interface AutomodToxicityConfig {
  enabled: boolean;

  rules: AutomodRule[];

  async?: boolean;
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

  created_by?: User;

  target?: User;
}

export interface BanActionRequest {
  channel_ban_only?: boolean;

  delete_messages?: 'soft' | 'pruning' | 'hard';

  ip_ban?: boolean;

  reason?: string;

  shadow?: boolean;

  timeout?: number;
}

export interface BanOptions {
  duration: number;

  ip_ban: boolean;

  reason: string;

  shadow_ban: boolean;
}

export interface BanRequest {
  target_user_id: string;

  banned_by_id?: string;

  channel_cid?: string;

  delete_messages?: 'soft' | 'pruning' | 'hard';

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

export interface BlockContentOptions {
  reason: string;
}

export interface BlockListConfig {
  enabled: boolean;

  rules: BlockListRule[];

  async?: boolean;
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

  id?: string;

  team?: string;

  updated_at?: Date;
}

export interface BlockListRule {
  action:
    | 'flag'
    | 'mask_flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  name: string;

  team: string;
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

export interface BlockedUserEvent {
  call_cid: string;

  created_at: Date;

  user: UserResponse;

  type: string;

  blocked_by_user?: UserResponse;
}

export interface BlockedUserResponse {
  blocked_user_id: string;

  created_at: Date;

  user_id: string;

  blocked_user: UserResponse;

  user: UserResponse;
}

export interface BodyguardRule {
  action:
    | 'flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  label: string;

  severity_rules: BodyguardSeverityRule[];
}

export interface BodyguardSeverityRule {
  action:
    | 'flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface BookmarkAddedEvent {
  created_at: Date;

  bookmark: BookmarkResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkDeletedEvent {
  created_at: Date;

  bookmark: BookmarkResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkFolderDeletedEvent {
  created_at: Date;

  bookmark_folder: BookmarkFolderResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkFolderResponse {
  created_at: Date;

  id: string;

  name: string;

  updated_at: Date;

  custom?: Record<string, any>;
}

export interface BookmarkFolderUpdatedEvent {
  created_at: Date;

  bookmark_folder: BookmarkFolderResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkResponse {
  created_at: Date;

  updated_at: Date;

  activity: ActivityResponse;

  user: UserResponse;

  custom?: Record<string, any>;

  folder?: BookmarkFolderResponse;
}

export interface BookmarkUpdatedEvent {
  created_at: Date;

  bookmark: BookmarkResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface Bound {
  inclusive: boolean;

  value: number;
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

export interface BrowserDataResponse {
  name?: string;

  version?: string;
}

export interface BulkImageModerationRequest {
  csv_file: string;
}

export interface BulkImageModerationResponse {
  duration: string;

  task_id: string;
}

export interface Call {
  app_pk: number;

  backstage: boolean;

  channel_cid: string;

  cid: string;

  created_at: Date;

  created_by_user_id: string;

  current_session_id: string;

  id: string;

  last_session_id: string;

  team: string;

  thumbnail_url: string;

  type: string;

  updated_at: Date;

  blocked_user_i_ds: string[];

  blocked_users: User[];

  egresses: CallEgress[];

  members: CallMember[];

  custom: Record<string, any>;

  deleted_at?: Date;

  egress_updated_at?: Date;

  ended_at?: Date;

  join_ahead_time_seconds?: number;

  last_heartbeat_at?: Date;

  member_count?: number;

  starts_at?: Date;

  call_type?: CallType;

  created_by?: User;

  member_lookup?: MemberLookup;

  session?: CallSession;

  settings?: CallSettings;

  settings_overrides?: CallSettings;
}

export interface CallAcceptedEvent {
  call_cid: string;

  created_at: Date;

  call: CallResponse;

  user: UserResponse;

  type: string;
}

export interface CallClosedCaption {
  end_time: Date;

  speaker_id: string;

  start_time: Date;

  text: string;

  user: UserResponse;
}

export interface CallClosedCaptionsFailedEvent {
  call_cid: string;

  created_at: Date;

  type: string;
}

export interface CallClosedCaptionsStartedEvent {
  call_cid: string;

  created_at: Date;

  type: string;
}

export interface CallClosedCaptionsStoppedEvent {
  call_cid: string;

  created_at: Date;

  type: string;
}

export interface CallCreatedEvent {
  call_cid: string;

  created_at: Date;

  members: MemberResponse[];

  call: CallResponse;

  type: string;
}

export interface CallDeletedEvent {
  call_cid: string;

  created_at: Date;

  call: CallResponse;

  type: string;
}

export interface CallDurationReport {
  histogram: ReportByHistogramBucket[];
}

export interface CallDurationReportResponse {
  daily: DailyAggregateCallDurationReportResponse[];
}

export interface CallEgress {
  app_pk: number;

  call_id: string;

  call_type: string;

  egress_id: string;

  egress_type: string;

  instance_ip: string;

  started_at: Date;

  state: string;

  updated_at: Date;

  stopped_at?: Date;

  config?: EgressTaskConfig;
}

export interface CallEndedEvent {
  call_cid: string;

  created_at: Date;

  call: CallResponse;

  type: string;

  reason?: string;

  user?: UserResponse;
}

export interface CallFrameRecordingFailedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  call: CallResponse;

  type: string;
}

export interface CallFrameRecordingFrameReadyEvent {
  call_cid: string;

  captured_at: Date;

  created_at: Date;

  egress_id: string;

  session_id: string;

  track_type: string;

  url: string;

  users: Record<string, UserResponse>;

  type: string;
}

export interface CallFrameRecordingStartedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  call: CallResponse;

  type: string;
}

export interface CallFrameRecordingStoppedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  call: CallResponse;

  type: string;
}

export interface CallHLSBroadcastingFailedEvent {
  call_cid: string;

  created_at: Date;

  type: string;
}

export interface CallHLSBroadcastingStartedEvent {
  call_cid: string;

  created_at: Date;

  hls_playlist_url: string;

  call: CallResponse;

  type: string;
}

export interface CallHLSBroadcastingStoppedEvent {
  call_cid: string;

  created_at: Date;

  type: string;
}

export interface CallIngressResponse {
  rtmp: RTMPIngress;
}

export interface CallLiveStartedEvent {
  call_cid: string;

  created_at: Date;

  call: CallResponse;

  type: string;
}

export interface CallMember {
  created_at: Date;

  role: string;

  updated_at: Date;

  user_id: string;

  custom: Record<string, any>;

  deleted_at?: Date;

  user?: User;
}

export interface CallMemberAddedEvent {
  call_cid: string;

  created_at: Date;

  members: MemberResponse[];

  call: CallResponse;

  type: string;
}

export interface CallMemberRemovedEvent {
  call_cid: string;

  created_at: Date;

  members: string[];

  call: CallResponse;

  type: string;
}

export interface CallMemberUpdatedEvent {
  call_cid: string;

  created_at: Date;

  members: MemberResponse[];

  call: CallResponse;

  type: string;
}

export interface CallMemberUpdatedPermissionEvent {
  call_cid: string;

  created_at: Date;

  members: MemberResponse[];

  call: CallResponse;

  capabilities_by_role: Record<string, string[]>;

  type: string;
}

export interface CallMissedEvent {
  call_cid: string;

  created_at: Date;

  notify_user: boolean;

  session_id: string;

  members: MemberResponse[];

  call: CallResponse;

  user: UserResponse;

  type: string;
}

export interface CallModerationBlurEvent {
  call_cid: string;

  created_at: Date;

  user_id: string;

  custom: Record<string, any>;

  type: string;
}

export interface CallModerationWarningEvent {
  call_cid: string;

  created_at: Date;

  message: string;

  user_id: string;

  custom: Record<string, any>;

  type: string;
}

export interface CallNotificationEvent {
  call_cid: string;

  created_at: Date;

  session_id: string;

  members: MemberResponse[];

  call: CallResponse;

  user: UserResponse;

  type: string;
}

export interface CallParticipant {
  banned: boolean;

  id: string;

  joined_at: Date;

  online: boolean;

  role: string;

  user_session_id: string;

  custom: Record<string, any>;

  teams_role: Record<string, string>;

  ban_expires?: Date;

  created_at?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  invisible?: boolean;

  language?: string;

  last_active?: Date;

  last_engaged_at?: Date;

  revoke_tokens_issued_before?: Date;

  updated_at?: Date;

  teams?: string[];

  privacy_settings?: PrivacySettings;
}

export interface CallParticipantCountReport {
  histogram: ReportByHistogramBucket[];
}

export interface CallParticipantCountReportResponse {
  daily: DailyAggregateCallParticipantCountReportResponse[];
}

export interface CallParticipantResponse {
  joined_at: Date;

  role: string;

  user_session_id: string;

  user: UserResponse;
}

export interface CallReactionEvent {
  call_cid: string;

  created_at: Date;

  reaction: ReactionResponse;

  type: string;
}

export interface CallRecording {
  end_time: Date;

  filename: string;

  session_id: string;

  start_time: Date;

  url: string;
}

export interface CallRecordingFailedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  type: string;
}

export interface CallRecordingReadyEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  call_recording: CallRecording;

  type: string;
}

export interface CallRecordingStartedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  type: string;
}

export interface CallRecordingStoppedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  type: string;
}

export interface CallRejectedEvent {
  call_cid: string;

  created_at: Date;

  call: CallResponse;

  user: UserResponse;

  type: string;

  reason?: string;
}

export interface CallReportResponse {
  score: number;

  ended_at?: Date;

  started_at?: Date;
}

export interface CallRequest {
  channel_cid?: string;

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

  captioning: boolean;

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

  channel_cid?: string;

  ended_at?: Date;

  join_ahead_time_seconds?: number;

  starts_at?: Date;

  team?: string;

  session?: CallSessionResponse;

  thumbnails?: ThumbnailResponse;
}

export interface CallRingEvent {
  call_cid: string;

  created_at: Date;

  session_id: string;

  video: boolean;

  members: MemberResponse[];

  call: CallResponse;

  user: UserResponse;

  type: string;
}

export interface CallRtmpBroadcastFailedEvent {
  call_cid: string;

  created_at: Date;

  name: string;

  type: string;
}

export interface CallRtmpBroadcastStartedEvent {
  call_cid: string;

  created_at: Date;

  name: string;

  type: string;
}

export interface CallRtmpBroadcastStoppedEvent {
  call_cid: string;

  created_at: Date;

  name: string;

  type: string;
}

export interface CallSession {
  anonymous_participant_count: number;

  app_pk: number;

  call_id: string;

  call_type: string;

  created_at: Date;

  session_id: string;

  active_sf_us: SFUIDLastSeen[];

  participants: CallParticipant[];

  sfui_ds: string[];

  accepted_by: Record<string, Date>;

  missed_by: Record<string, Date>;

  participants_count_by_role: Record<string, number>;

  rejected_by: Record<string, Date>;

  user_permission_overrides: Record<string, Record<string, boolean>>;

  deleted_at?: Date;

  ended_at?: Date;

  live_ended_at?: Date;

  live_started_at?: Date;

  ring_at?: Date;

  started_at?: Date;

  timer_ends_at?: Date;
}

export interface CallSessionEndedEvent {
  call_cid: string;

  created_at: Date;

  session_id: string;

  call: CallResponse;

  type: string;
}

export interface CallSessionParticipantJoinedEvent {
  call_cid: string;

  created_at: Date;

  session_id: string;

  participant: CallParticipantResponse;

  type: string;
}

export interface CallSessionParticipantLeftEvent {
  call_cid: string;

  created_at: Date;

  duration_seconds: number;

  session_id: string;

  participant: CallParticipantResponse;

  type: string;
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

export interface CallSessionStartedEvent {
  call_cid: string;

  created_at: Date;

  session_id: string;

  call: CallResponse;

  type: string;
}

export interface CallSettings {
  audio?: AudioSettings;

  backstage?: BackstageSettings;

  broadcasting?: BroadcastSettings;

  frame_recording?: FrameRecordSettings;

  geofencing?: GeofenceSettings;

  limits?: LimitsSettings;

  recording?: RecordSettings;

  ring?: RingSettings;

  screensharing?: ScreensharingSettings;

  session?: SessionSettings;

  thumbnails?: ThumbnailsSettings;

  transcription?: TranscriptionSettings;

  video?: VideoSettings;
}

export interface CallSettingsRequest {
  audio?: AudioSettingsRequest;

  backstage?: BackstageSettingsRequest;

  broadcasting?: BroadcastSettingsRequest;

  frame_recording?: FrameRecordingSettingsRequest;

  geofencing?: GeofenceSettingsRequest;

  limits?: LimitsSettingsRequest;

  recording?: RecordSettingsRequest;

  ring?: RingSettingsRequest;

  screensharing?: ScreensharingSettingsRequest;

  session?: SessionSettingsRequest;

  thumbnails?: ThumbnailsSettingsRequest;

  transcription?: TranscriptionSettingsRequest;

  video?: VideoSettingsRequest;
}

export interface CallSettingsResponse {
  audio: AudioSettingsResponse;

  backstage: BackstageSettingsResponse;

  broadcasting: BroadcastSettingsResponse;

  frame_recording: FrameRecordingSettingsResponse;

  geofencing: GeofenceSettingsResponse;

  limits: LimitsSettingsResponse;

  recording: RecordSettingsResponse;

  ring: RingSettingsResponse;

  screensharing: ScreensharingSettingsResponse;

  session: SessionSettingsResponse;

  thumbnails: ThumbnailsSettingsResponse;

  transcription: TranscriptionSettingsResponse;

  video: VideoSettingsResponse;
}

export interface CallStateResponseFields {
  members: MemberResponse[];

  own_capabilities: OwnCapability[];

  call: CallResponse;
}

export interface CallStatsReportReadyEvent {
  call_cid: string;

  created_at: Date;

  session_id: string;

  type: string;
}

export interface CallStatsReportSummaryResponse {
  call_cid: string;

  call_duration_seconds: number;

  call_session_id: string;

  call_status: string;

  first_stats_time: Date;

  created_at?: Date;

  min_user_rating?: number;

  quality_score?: number;
}

export interface CallTranscription {
  end_time: Date;

  filename: string;

  session_id: string;

  start_time: Date;

  url: string;
}

export interface CallTranscriptionFailedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  type: string;

  error?: string;
}

export interface CallTranscriptionReadyEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  call_transcription: CallTranscription;

  type: string;
}

export interface CallTranscriptionStartedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  type: string;
}

export interface CallTranscriptionStoppedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  type: string;
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

export interface CallUpdatedEvent {
  call_cid: string;

  created_at: Date;

  call: CallResponse;

  capabilities_by_role: Record<string, string[]>;

  type: string;
}

export interface CallUserFeedbackSubmittedEvent {
  call_cid: string;

  created_at: Date;

  rating: number;

  session_id: string;

  user: UserResponse;

  type: string;

  reason?: string;

  sdk?: string;

  sdk_version?: string;

  custom?: Record<string, any>;
}

export interface CallUserMutedEvent {
  call_cid: string;

  created_at: Date;

  from_user_id: string;

  muted_user_ids: string[];

  type: string;
}

export interface CallsPerDayReport {
  count: number;
}

export interface CallsPerDayReportResponse {
  daily: DailyAggregateCallsPerDayReportResponse[];
}

export interface CampaignChannelTemplate {
  type: string;

  custom: Record<string, any>;

  id?: string;

  team?: string;

  members?: string[];
}

export interface CampaignCompletedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  campaign?: CampaignResponse;
}

export interface CampaignMessageTemplate {
  poll_id: string;

  text: string;

  attachments: Attachment[];

  custom: Record<string, any>;
}

export interface CampaignResponse {
  create_channels: boolean;

  created_at: Date;

  description: string;

  id: string;

  name: string;

  sender_id: string;

  sender_mode: string;

  show_channels: boolean;

  skip_push: boolean;

  skip_webhook: boolean;

  status: string;

  updated_at: Date;

  segment_ids: string[];

  segments: Segment[];

  user_ids: string[];

  users: UserResponse[];

  stats: CampaignStatsResponse;

  scheduled_for?: Date;

  stop_at?: Date;

  channel_template?: CampaignChannelTemplate;

  message_template?: CampaignMessageTemplate;

  sender?: UserResponse;
}

export interface CampaignStartedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  campaign?: CampaignResponse;
}

export interface CampaignStatsResponse {
  progress: number;

  stats_channels_created: number;

  stats_completed_at: Date;

  stats_messages_sent: number;

  stats_started_at: Date;

  stats_users_read: number;

  stats_users_sent: number;
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

  last_campaigns?: string;

  last_message_at?: Date;

  member_count?: number;

  team?: string;

  active_live_locations?: SharedLocation[];

  invites?: ChannelMember[];

  members?: ChannelMember[];

  config?: ChannelConfig;

  config_overrides?: ConfigOverrides;

  created_by?: User;

  truncated_by?: User;
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

  shared_locations: boolean;

  skip_last_msg_update_for_system_msgs: boolean;

  typing_events: boolean;

  updated_at: Date;

  uploads: boolean;

  url_enrichment: boolean;

  user_message_reminders: boolean;

  commands: string[];

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: number;

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

  shared_locations: boolean;

  skip_last_msg_update_for_system_msgs: boolean;

  typing_events: boolean;

  updated_at: Date;

  uploads: boolean;

  url_enrichment: boolean;

  user_message_reminders: boolean;

  commands: Command[];

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;

  grants?: Record<string, string[]>;
}

export interface ChannelCreatedEvent {
  created_at: Date;

  type: string;
}

export interface ChannelDeletedEvent {
  channel_id: string;

  channel_member_count: number;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  channel?: ChannelResponse;
}

export interface ChannelExport {
  cid?: string;

  id?: string;

  messages_since?: Date;

  messages_until?: Date;

  type?: string;
}

export interface ChannelFrozenEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;
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

export interface ChannelHiddenEvent {
  channel_id: string;

  channel_member_count: number;

  channel_type: string;

  cid: string;

  clear_history: boolean;

  created_at: Date;

  type: string;

  channel?: ChannelResponse;

  user?: User;
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

  custom: Record<string, any>;

  archived_at?: Date;

  ban_expires?: Date;

  deleted_at?: Date;

  invite_accepted_at?: Date;

  invite_rejected_at?: Date;

  invited?: boolean;

  is_moderator?: boolean;

  pinned_at?: Date;

  role?: 'member' | 'moderator' | 'admin' | 'owner';

  status?: string;

  user_id?: string;

  user?: UserResponse;
}

export interface ChannelMemberResponse {
  banned: boolean;

  channel_role: string;

  created_at: Date;

  notifications_muted: boolean;

  shadow_banned: boolean;

  updated_at: Date;

  custom: Record<string, any>;

  archived_at?: Date;

  ban_expires?: Date;

  deleted_at?: Date;

  invite_accepted_at?: Date;

  invite_rejected_at?: Date;

  invited?: boolean;

  is_moderator?: boolean;

  pinned_at?: Date;

  role?: 'member' | 'moderator' | 'admin' | 'owner';

  status?: string;

  user_id?: string;

  user?: UserResponse;
}

export interface ChannelMessages {
  messages: Message[];

  channel?: ChannelResponse;
}

export interface ChannelMute {
  created_at: Date;

  updated_at: Date;

  expires?: Date;

  channel?: ChannelResponse;

  user?: UserResponse;
}

export interface ChannelMutedEvent {
  created_at: Date;

  type: string;
}

export const ChannelOwnCapability = {
  BAN_CHANNEL_MEMBERS: 'ban-channel-members',
  CAST_POLL_VOTE: 'cast-poll-vote',
  CONNECT_EVENTS: 'connect-events',
  CREATE_ATTACHMENT: 'create-attachment',
  DELETE_ANY_MESSAGE: 'delete-any-message',
  DELETE_CHANNEL: 'delete-channel',
  DELETE_OWN_MESSAGE: 'delete-own-message',
  FLAG_MESSAGE: 'flag-message',
  FREEZE_CHANNEL: 'freeze-channel',
  JOIN_CHANNEL: 'join-channel',
  LEAVE_CHANNEL: 'leave-channel',
  MUTE_CHANNEL: 'mute-channel',
  PIN_MESSAGE: 'pin-message',
  QUERY_POLL_VOTES: 'query-poll-votes',
  QUOTE_MESSAGE: 'quote-message',
  READ_EVENTS: 'read-events',
  SEARCH_MESSAGES: 'search-messages',
  SEND_CUSTOM_EVENTS: 'send-custom-events',
  SEND_LINKS: 'send-links',
  SEND_MESSAGE: 'send-message',
  SEND_POLL: 'send-poll',
  SEND_REACTION: 'send-reaction',
  SEND_REPLY: 'send-reply',
  SEND_RESTRICTED_VISIBILITY_MESSAGE: 'send-restricted-visibility-message',
  SEND_TYPING_EVENTS: 'send-typing-events',
  SET_CHANNEL_COOLDOWN: 'set-channel-cooldown',
  SHARE_LOCATION: 'share-location',
  SKIP_SLOW_MODE: 'skip-slow-mode',
  SLOW_MODE: 'slow-mode',
  TYPING_EVENTS: 'typing-events',
  UPDATE_ANY_MESSAGE: 'update-any-message',
  UPDATE_CHANNEL: 'update-channel',
  UPDATE_CHANNEL_MEMBERS: 'update-channel-members',
  UPDATE_OWN_MESSAGE: 'update-own-message',
  UPDATE_THREAD: 'update-thread',
  UPLOAD_FILE: 'upload-file',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ChannelOwnCapability =
  (typeof ChannelOwnCapability)[keyof typeof ChannelOwnCapability];

export interface ChannelPushPreferences {
  chat_level?: string;

  disabled_until?: Date;
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

  own_capabilities?: ChannelOwnCapability[];

  config?: ChannelConfigWithInfo;

  created_by?: UserResponse;

  truncated_by?: UserResponse;
}

export interface ChannelStateResponse {
  duration: string;

  members: ChannelMember[];

  messages: MessageResponse[];

  pinned_messages: MessageResponse[];

  threads: ThreadStateResponse[];

  hidden?: boolean;

  hide_messages_before?: Date;

  watcher_count?: number;

  active_live_locations?: SharedLocationResponseData[];

  pending_messages?: PendingMessageResponse[];

  read?: ReadStateResponse[];

  watchers?: UserResponse[];

  channel?: ChannelResponse;

  draft?: DraftResponse;

  membership?: ChannelMember;

  push_preferences?: ChannelPushPreferences;
}

export interface ChannelStateResponseFields {
  members: ChannelMember[];

  messages: MessageResponse[];

  pinned_messages: MessageResponse[];

  threads: ThreadStateResponse[];

  hidden?: boolean;

  hide_messages_before?: Date;

  watcher_count?: number;

  active_live_locations?: SharedLocationResponseData[];

  pending_messages?: PendingMessageResponse[];

  read?: ReadStateResponse[];

  watchers?: UserResponse[];

  channel?: ChannelResponse;

  draft?: DraftResponse;

  membership?: ChannelMember;

  push_preferences?: ChannelPushPreferences;
}

export interface ChannelTruncatedEvent {
  channel_id: string;

  channel_member_count: number;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  channel?: ChannelResponse;
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

  shared_locations: boolean;

  skip_last_msg_update_for_system_msgs: boolean;

  typing_events: boolean;

  updated_at: Date;

  uploads: boolean;

  url_enrichment: boolean;

  user_message_reminders: boolean;

  commands: Command[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  allowed_flag_reasons?: string[];

  blocklists?: BlockListOptions[];

  automod_thresholds?: Thresholds;
}

export interface ChannelUnFrozenEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;
}

export interface ChannelUnmutedEvent {
  created_at: Date;

  type: string;
}

export interface ChannelUpdatedEvent {
  channel_id: string;

  channel_member_count: number;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  channel?: ChannelResponse;

  message?: Message;

  user?: User;
}

export interface ChannelVisibleEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  user?: User;
}

export interface ChatActivityStatsResponse {
  messages?: MessageStatsResponse;
}

export interface CheckExternalStorageResponse {
  duration: string;

  file_url: string;
}

export interface CheckPushRequest {
  apn_template?: string;

  event_type?:
    | 'message.new'
    | 'message.updated'
    | 'reaction.new'
    | 'reaction.updated'
    | 'notification.reminder_due';

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

  event_type?: string;

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

  config_team?: string;

  test_mode?: boolean;

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

  item?: ReviewQueueItemResponse;
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

export interface ClientOSDataResponse {
  architecture?: string;

  name?: string;

  version?: string;
}

export interface ClosedCaptionEvent {
  call_cid: string;

  created_at: Date;

  closed_caption: CallClosedCaption;

  type: string;
}

export interface CollectUserFeedbackRequest {
  rating: number;

  sdk: string;

  sdk_version: string;

  reason?: string;

  user_session_id?: string;

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

export interface CommentAddedEvent {
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentDeletedEvent {
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentReactionAddedEvent {
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentReactionDeletedEvent {
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  type: string;

  received_at?: Date;
}

export interface CommentReactionUpdatedEvent {
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentResponse {
  confidence_score: number;

  created_at: Date;

  downvote_count: number;

  id: string;

  object_id: string;

  object_type: string;

  reaction_count: number;

  reply_count: number;

  score: number;

  status: string;

  updated_at: Date;

  upvote_count: number;

  mentioned_users: UserResponse[];

  own_reactions: FeedsReactionResponse[];

  user: UserResponse;

  controversy_score?: number;

  deleted_at?: Date;

  parent_id?: string;

  text?: string;

  attachments?: Attachment[];

  latest_reactions?: FeedsReactionResponse[];

  custom?: Record<string, any>;

  moderation?: ModerationV2Response;

  reaction_groups?: Record<string, ReactionGroupResponse>;
}

export interface CommentUpdatedEvent {
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommitMessageRequest {}

export interface CompositeAppSettings {
  json_encoded_settings?: string;

  url?: string;
}

export interface ConfigOverrides {
  commands: string[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block';

  max_message_length?: number;

  quotes?: boolean;

  reactions?: boolean;

  replies?: boolean;

  shared_locations?: boolean;

  typing_events?: boolean;

  uploads?: boolean;

  url_enrichment?: boolean;

  user_message_reminders?: boolean;
}

export interface ConfigResponse {
  async: boolean;

  created_at: Date;

  key: string;

  team: string;

  updated_at: Date;

  ai_image_config?: AIImageConfig;

  ai_text_config?: AITextConfig;

  ai_video_config?: AIVideoConfig;

  automod_platform_circumvention_config?: AutomodPlatformCircumventionConfig;

  automod_semantic_filters_config?: AutomodSemanticFiltersConfig;

  automod_toxicity_config?: AutomodToxicityConfig;

  block_list_config?: BlockListConfig;

  rule_builder_config?: RuleBuilderConfig;

  velocity_filter_config?: VelocityFilterConfig;

  video_call_rule_config?: VideoCallRuleConfig;
}

export interface ContentCountRuleParameters {
  threshold: number;

  time_window: string;
}

export interface CountByMinuteResponse {
  count: number;

  start_ts: Date;
}

export interface CreateBlockListRequest {
  name: string;

  words: string[];

  team?: string;

  type?: 'regex' | 'domain' | 'domain_allowlist' | 'email' | 'word';
}

export interface CreateBlockListResponse {
  duration: string;

  blocklist?: BlockListResponse;
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

  message_retention?: 'infinite' | 'numeric';

  mutes?: boolean;

  partition_size?: number;

  partition_ttl?: string;

  polls?: boolean;

  push_notifications?: boolean;

  reactions?: boolean;

  read_events?: boolean;

  replies?: boolean;

  search?: boolean;

  shared_locations?: boolean;

  skip_last_msg_update_for_system_msgs?: boolean;

  typing_events?: boolean;

  uploads?: boolean;

  url_enrichment?: boolean;

  user_message_reminders?: boolean;

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

  shared_locations: boolean;

  skip_last_msg_update_for_system_msgs: boolean;

  typing_events: boolean;

  updated_at: Date;

  uploads: boolean;

  url_enrichment: boolean;

  user_message_reminders: boolean;

  commands: string[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

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

export interface CreateFeedGroupRequest {
  feed_group_id: string;

  default_view_id?: string;

  default_visibility?:
    | 'public'
    | 'visible'
    | 'followers'
    | 'members'
    | 'private';

  custom?: Record<string, any>;

  notification?: NotificationConfig;
}

export interface CreateFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface CreateFeedViewRequest {
  view_id: string;

  activity_processors?: ActivityProcessorConfig[];

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface CreateFeedViewResponse {
  duration: string;

  feed_view: FeedViewResponse;
}

export interface CreateFeedsBatchRequest {
  feeds: FeedRequest[];
}

export interface CreateFeedsBatchResponse {
  duration: string;

  feeds: FeedResponse[];
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

export interface CreateReminderRequest {
  remind_at?: Date;

  user_id?: string;

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

export interface CustomCheckFlag {
  type: string;

  reason?: string;

  labels?: string[];

  custom?: Record<string, any>;
}

export interface CustomCheckRequest {
  entity_id: string;

  entity_type: string;

  flags: CustomCheckFlag[];

  entity_creator_id?: string;

  user_id?: string;

  moderation_payload?: ModerationPayload;

  user?: UserRequest;
}

export interface CustomCheckResponse {
  duration: string;

  id: string;

  status: string;

  item?: ReviewQueueItemResponse;
}

export interface CustomVideoEvent {
  call_cid: string;

  created_at: Date;

  custom: Record<string, any>;

  user: UserResponse;

  type: string;
}

export interface DailyAggregateCallDurationReportResponse {
  date: string;

  report: CallDurationReport;
}

export interface DailyAggregateCallParticipantCountReportResponse {
  date: string;

  report: CallParticipantCountReport;
}

export interface DailyAggregateCallsPerDayReportResponse {
  date: string;

  report: CallsPerDayReport;
}

export interface DailyAggregateQualityScoreReportResponse {
  date: string;

  report: QualityScoreReport;
}

export interface DailyAggregateSDKUsageReportResponse {
  date: string;

  report: SDKUsageReport;
}

export interface DailyAggregateUserFeedbackReportResponse {
  date: string;

  report: UserFeedbackReport;
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

export interface DecayFunctionConfig {
  base?: string;

  decay?: string;

  direction?: string;

  offset?: string;

  origin?: string;

  scale?: string;
}

export interface DeleteActivitiesRequest {
  activity_ids: string[];

  hard_delete?: boolean;

  user_id?: string;

  user?: UserRequest;
}

export interface DeleteActivitiesResponse {
  duration: string;

  deleted_activity_ids: string[];
}

export interface DeleteActivityReactionResponse {
  duration: string;

  activity: ActivityResponse;

  reaction: FeedsReactionResponse;
}

export interface DeleteActivityRequest {
  hard_delete?: boolean;
}

export interface DeleteActivityResponse {
  duration: string;
}

export interface DeleteBookmarkFolderResponse {
  duration: string;
}

export interface DeleteBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

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

export interface DeleteCommentReactionResponse {
  duration: string;

  comment: CommentResponse;

  reaction: FeedsReactionResponse;
}

export interface DeleteCommentResponse {
  duration: string;
}

export interface DeleteExternalStorageResponse {
  duration: string;
}

export interface DeleteFeedGroupResponse {
  duration: string;
}

export interface DeleteFeedResponse {
  duration: string;
}

export interface DeleteFeedUserDataResponse {
  deleted_activities: number;

  deleted_bookmarks: number;

  deleted_comments: number;

  deleted_reactions: number;

  duration: string;
}

export interface DeleteFeedViewResponse {
  duration: string;
}

export interface DeleteMessageRequest {
  hard_delete?: boolean;
}

export interface DeleteMessageResponse {
  duration: string;

  message: MessageResponse;
}

export interface DeleteModerationConfigResponse {
  duration: string;
}

export interface DeleteModerationTemplateResponse {
  duration: string;
}

export interface DeleteReactionRequest {
  hard_delete?: boolean;
}

export interface DeleteReactionResponse {
  duration: string;

  message: MessageResponse;

  reaction: ReactionResponse;
}

export interface DeleteRecordingResponse {
  duration: string;
}

export interface DeleteReminderResponse {
  duration: string;
}

export interface DeleteSegmentTargetsRequest {
  target_ids: string[];
}

export interface DeleteTranscriptionResponse {
  duration: string;
}

export interface DeleteUserRequest {
  delete_conversation_channels?: boolean;

  delete_feeds_content?: boolean;

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

  push_provider: 'firebase' | 'apn' | 'huawei' | 'xiaomi';

  user_id: string;

  disabled?: boolean;

  disabled_reason?: string;

  push_provider_name?: string;

  voip?: boolean;
}

export interface DeviceDataResponse {
  name?: string;

  version?: string;
}

export interface DeviceErrorInfo {
  error_message: string;

  provider: string;

  provider_name: string;
}

export interface DeviceResponse {
  created_at: Date;

  id: string;

  push_provider: string;

  user_id: string;

  disabled?: boolean;

  disabled_reason?: string;

  push_provider_name?: string;

  voip?: boolean;
}

export interface DraftPayloadResponse {
  id: string;

  text: string;

  custom: Record<string, any>;

  html?: string;

  mml?: string;

  parent_id?: string;

  poll_id?: string;

  quoted_message_id?: string;

  show_in_channel?: boolean;

  silent?: boolean;

  type?: string;

  attachments?: Attachment[];

  mentioned_users?: UserResponse[];
}

export interface DraftResponse {
  channel_cid: string;

  created_at: Date;

  message: DraftPayloadResponse;

  parent_id?: string;

  channel?: ChannelResponse;

  parent_message?: MessageResponse;

  quoted_message?: MessageResponse;
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

  status: string;
}

export interface EgressRTMPResponse {
  name: string;

  started_at: Date;

  stream_key?: string;

  stream_url?: string;
}

export interface EgressResponse {
  broadcasting: boolean;

  rtmps: EgressRTMPResponse[];

  frame_recording?: FrameRecordingResponse;

  hls?: EgressHLSResponse;
}

export interface EgressTaskConfig {
  egress_user?: EgressUser;

  frame_recording_egress_config?: FrameRecordingEgressConfig;

  hls_egress_config?: HLSEgressConfig;

  recording_egress_config?: RecordingEgressConfig;

  rtmp_egress_config?: RTMPEgressConfig;

  stt_egress_config?: STTEgressConfig;
}

export interface EgressUser {
  token?: string;
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

  latest_reactions?: Record<string, EnrichedReaction[]>;

  object?: Data;

  origin?: Data;

  own_reactions?: Record<string, EnrichedReaction[]>;

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

  latest_children?: Record<string, EnrichedReaction[]>;

  own_children?: Record<string, EnrichedReaction[]>;

  updated_at?: Time;

  user?: Data;
}

export interface EntityCreator {
  ban_count: number;

  banned: boolean;

  deleted_content_count: number;

  id: string;

  online: boolean;

  role: string;

  custom: Record<string, any>;

  teams_role: Record<string, string>;

  ban_expires?: Date;

  created_at?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  invisible?: boolean;

  language?: string;

  last_active?: Date;

  last_engaged_at?: Date;

  revoke_tokens_issued_before?: Date;

  updated_at?: Date;

  teams?: string[];

  privacy_settings?: PrivacySettings;
}

export interface EntityCreatorResponse {
  ban_count: number;

  banned: boolean;

  created_at: Date;

  deleted_content_count: number;

  flagged_count: number;

  id: string;

  invisible: boolean;

  language: string;

  online: boolean;

  role: string;

  shadow_banned: boolean;

  updated_at: Date;

  blocked_user_ids: string[];

  teams: string[];

  custom: Record<string, any>;

  ban_expires?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  devices?: DeviceResponse[];

  privacy_settings?: PrivacySettingsResponse;

  push_notifications?: PushNotificationSettingsResponse;

  teams_role?: Record<string, string>;
}

export interface ErrorResult {
  type: string;

  stacktrace?: string;

  version?: string;
}

export interface EventHook {
  created_at?: Date;

  enabled?: boolean;

  hook_type?: string;

  id?: string;

  sns_auth_type?: string;

  sns_key?: string;

  sns_region?: string;

  sns_role_arn?: string;

  sns_secret?: string;

  sns_topic_arn?: string;

  sqs_auth_type?: string;

  sqs_key?: string;

  sqs_queue_url?: string;

  sqs_region?: string;

  sqs_role_arn?: string;

  sqs_secret?: string;

  timeout_ms?: number;

  updated_at?: Date;

  webhook_url?: string;

  event_types?: string[];

  callback?: AsyncModerationCallbackConfig;
}

export interface EventNotificationSettings {
  enabled: boolean;

  apns: APNS;

  fcm: FCM;
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

export interface ExportFeedUserDataRequest {}

export interface ExportFeedUserDataResponse {
  duration: string;

  task_id: string;
}

export interface ExportUserResponse {
  duration: string;

  messages?: MessageResponse[];

  reactions?: ReactionResponse[];

  user?: UserResponse;
}

export interface ExportUsersRequest {
  user_ids: string[];
}

export interface ExportUsersResponse {
  duration: string;

  task_id: string;
}

export interface ExternalStorage {
  abs_account_name?: string;

  abs_client_id?: string;

  abs_client_secret?: string;

  abs_tenant_id?: string;

  bucket?: string;

  gcs_credentials?: string;

  path?: string;

  s3_api_key?: string;

  s3_custom_endpoint?: string;

  s3_region?: string;

  s3_secret_key?: string;

  storage_name?: string;

  storage_type?: number;
}

export interface ExternalStorageResponse {
  bucket: string;

  name: string;

  path: string;

  type: 's3' | 'gcs' | 'abs';
}

export interface FCM {
  data?: Record<string, any>;
}

export interface FeedCreatedEvent {
  created_at: Date;

  fid: string;

  members: FeedMemberResponse[];

  custom: Record<string, any>;

  feed: FeedResponse;

  user: UserResponseCommonFields;

  type: string;

  received_at?: Date;
}

export interface FeedDeletedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedGroup {
  app_pk: number;

  created_at: Date;

  default_view_id: string;

  default_visibility: string;

  id: string;

  updated_at: Date;

  custom: Record<string, any>;

  deleted_at?: Date;

  last_feed_get_at?: Date;

  notification?: NotificationConfig;

  stories?: StoriesConfig;
}

export interface FeedGroupChangedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  feed_group?: FeedGroup;

  user?: UserResponseCommonFields;
}

export interface FeedGroupDeletedEvent {
  created_at: Date;

  fid: string;

  group_id: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface FeedGroupResponse {
  created_at: Date;

  id: string;

  updated_at: Date;

  default_view_id?: string;

  default_visibility?: string;

  custom?: Record<string, any>;

  notification?: NotificationConfig;

  stories?: StoriesConfig;
}

export interface FeedInput {
  description?: string;

  name?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  filter_tags?: string[];

  members?: FeedMemberRequest[];

  custom?: Record<string, any>;
}

export interface FeedMemberAddedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  member: FeedMemberResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedMemberRemovedEvent {
  created_at: Date;

  fid: string;

  member_id: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedMemberRequest {
  user_id: string;

  invite?: boolean;

  role?: string;

  custom?: Record<string, any>;
}

export interface FeedMemberResponse {
  created_at: Date;

  role: string;

  status: 'member' | 'pending' | 'rejected';

  updated_at: Date;

  user: UserResponse;

  invite_accepted_at?: Date;

  invite_rejected_at?: Date;

  custom?: Record<string, any>;
}

export interface FeedMemberUpdatedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  member: FeedMemberResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export const FeedOwnCapability = {
  ADD_ACTIVITY: 'add-activity',
  ADD_ACTIVITY_REACTION: 'add-activity-reaction',
  ADD_COMMENT: 'add-comment',
  ADD_COMMENT_REACTION: 'add-comment-reaction',
  BOOKMARK_ACTIVITY: 'bookmark-activity',
  CREATE_FEED: 'create-feed',
  DELETE_BOOKMARK: 'delete-bookmark',
  DELETE_COMMENT: 'delete-comment',
  DELETE_FEED: 'delete-feed',
  EDIT_BOOKMARK: 'edit-bookmark',
  FOLLOW: 'follow',
  INVITE_FEED: 'invite-feed',
  JOIN_FEED: 'join-feed',
  LEAVE_FEED: 'leave-feed',
  MANAGE_FEED_GROUP: 'manage-feed-group',
  MARK_ACTIVITY: 'mark-activity',
  PIN_ACTIVITY: 'pin-activity',
  QUERY_FEED_MEMBERS: 'query-feed-members',
  QUERY_FOLLOWS: 'query-follows',
  READ_ACTIVITIES: 'read-activities',
  READ_FEED: 'read-feed',
  REMOVE_ACTIVITY: 'remove-activity',
  REMOVE_ACTIVITY_REACTION: 'remove-activity-reaction',
  REMOVE_COMMENT_REACTION: 'remove-comment-reaction',
  UNFOLLOW: 'unfollow',
  UPDATE_ACTIVITY: 'update-activity',
  UPDATE_COMMENT: 'update-comment',
  UPDATE_FEED: 'update-feed',
  UPDATE_FEED_FOLLOWERS: 'update-feed-followers',
  UPDATE_FEED_MEMBERS: 'update-feed-members',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FeedOwnCapability =
  (typeof FeedOwnCapability)[keyof typeof FeedOwnCapability];

export interface FeedRequest {
  feed_group_id: string;

  feed_id: string;

  created_by_id?: string;

  description?: string;

  name?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  filter_tags?: string[];

  members?: FeedMemberRequest[];

  custom?: Record<string, any>;
}

export interface FeedResponse {
  created_at: Date;

  description: string;

  fid: string;

  follower_count: number;

  following_count: number;

  group_id: string;

  id: string;

  member_count: number;

  name: string;

  pin_count: number;

  updated_at: Date;

  created_by: UserResponse;

  deleted_at?: Date;

  visibility?: string;

  filter_tags?: string[];

  custom?: Record<string, any>;
}

export interface FeedUpdatedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  feed: FeedResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedViewResponse {
  view_id: string;

  last_used_at?: Date;

  activity_processors?: ActivityProcessorConfig[];

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface FeedsModerationTemplateConfig {
  config_key: string;

  data_types: Record<string, string>;
}

export interface FeedsReactionResponse {
  activity_id: string;

  created_at: Date;

  type: string;

  updated_at: Date;

  user: UserResponse;

  comment_id?: string;

  custom?: Record<string, any>;
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
  enabled: boolean;

  apn_template?: string;

  credentials_json?: string;

  data_template?: string;

  notification_template?: string;

  server_key?: string;
}

export interface Flag {
  created_at: Date;

  created_by_automod: boolean;

  updated_at: Date;

  approved_at?: Date;

  reason?: string;

  rejected_at?: Date;

  reviewed_at?: Date;

  reviewed_by?: string;

  target_message_id?: string;

  custom?: Record<string, any>;

  details?: FlagDetails;

  target_message?: Message;

  target_user?: User;

  user?: User;
}

export interface FlagContentOptions {
  reason: string;
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

  entity_creator_id?: string;

  reason?: string;

  user_id?: string;

  custom?: Record<string, any>;

  moderation_payload?: ModerationPayload;

  user?: UserRequest;
}

export interface FlagResponse {
  duration: string;

  item_id: string;
}

export interface FlagUpdatedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  created_by?: UserResponse;

  message?: MessageResponse;

  user?: UserResponse;
}

export interface FlagUserOptions {
  reason: string;
}

export interface FollowBatchRequest {
  follows: FollowRequest[];
}

export interface FollowBatchResponse {
  duration: string;

  follows: FollowResponse[];
}

export interface FollowCreatedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: FollowResponse;

  type: string;

  received_at?: Date;
}

export interface FollowDeletedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: FollowResponse;

  type: string;

  received_at?: Date;
}

export interface FollowPair {
  source: string;

  target: string;
}

export interface FollowRequest {
  source: string;

  target: string;

  create_notification_activity?: boolean;

  push_preference?: 'all' | 'none';

  custom?: Record<string, any>;
}

export interface FollowResponse {
  created_at: Date;

  follower_role: string;

  push_preference: 'all' | 'none';

  status: 'accepted' | 'pending' | 'rejected';

  updated_at: Date;

  source_feed: FeedResponse;

  target_feed: FeedResponse;

  request_accepted_at?: Date;

  request_rejected_at?: Date;

  custom?: Record<string, any>;
}

export interface FollowUpdatedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: FollowResponse;

  type: string;

  received_at?: Date;
}

export interface FrameRecordSettings {
  capture_interval_in_seconds: number;

  mode: 'available' | 'disabled' | 'auto-on';

  quality?: string;
}

export interface FrameRecordingEgressConfig {
  capture_interval_in_seconds?: number;

  storage_name?: string;

  external_storage?: ExternalStorage;

  quality?: Quality;
}

export interface FrameRecordingResponse {
  status: string;
}

export interface FrameRecordingSettingsRequest {
  capture_interval_in_seconds: number;

  mode: 'available' | 'disabled' | 'auto-on';

  quality?: '360p' | '480p' | '720p' | '1080p' | '1440p';
}

export interface FrameRecordingSettingsResponse {
  capture_interval_in_seconds: number;

  mode: 'available' | 'disabled' | 'auto-on';

  quality?: string;
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

  unread_count: number;

  unread_threads: number;

  updated_at: Date;

  blocked_user_ids: string[];

  channel_mutes: ChannelMute[];

  devices: DeviceResponse[];

  mutes: UserMuteResponse[];

  teams: string[];

  custom: Record<string, any>;

  ban_expires?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  latest_hidden_channels?: string[];

  privacy_settings?: PrivacySettingsResponse;

  teams_role?: Record<string, string>;
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

export interface GetActiveCallsStatusResponse {
  duration: string;

  end_time: Date;

  start_time: Date;

  metrics?: ActiveCallsMetrics;

  summary?: ActiveCallsSummary;
}

export interface GetActivityResponse {
  duration: string;

  activity: ActivityResponse;
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

export interface GetCallReportResponse {
  duration: string;

  session_id: string;

  report: ReportResponse;

  video_reactions?: VideoReactionsResponse[];

  chat_activity?: ChatActivityStatsResponse;
}

export interface GetCallResponse {
  duration: string;

  members: MemberResponse[];

  own_capabilities: OwnCapability[];

  call: CallResponse;
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

export interface GetCampaignResponse {
  duration: string;

  campaign?: CampaignResponse;

  users?: PagerResponse;
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

  shared_locations: boolean;

  skip_last_msg_update_for_system_msgs: boolean;

  typing_events: boolean;

  updated_at: Date;

  uploads: boolean;

  url_enrichment: boolean;

  user_message_reminders: boolean;

  commands: Command[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

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

export interface GetCommentRepliesResponse {
  duration: string;

  comments: ThreadedCommentResponse[];

  next?: string;

  prev?: string;
}

export interface GetCommentResponse {
  duration: string;

  comment: CommentResponse;
}

export interface GetCommentsResponse {
  duration: string;

  comments: ThreadedCommentResponse[];

  next?: string;

  prev?: string;
}

export interface GetConfigResponse {
  duration: string;

  config?: ConfigResponse;
}

export interface GetCustomPermissionResponse {
  duration: string;

  permission: Permission;
}

export interface GetDraftResponse {
  duration: string;

  draft: DraftResponse;
}

export interface GetEdgesResponse {
  duration: string;

  edges: EdgeResponse[];
}

export interface GetFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface GetFeedViewResponse {
  duration: string;

  feed_view: FeedViewResponse;
}

export interface GetFollowSuggestionsResponse {
  duration: string;

  suggestions: FeedResponse[];
}

export interface GetImportResponse {
  duration: string;

  import_task?: ImportTask;
}

export interface GetManyMessagesResponse {
  duration: string;

  messages: MessageResponse[];
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

export interface GetOrCreateFeedRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  view?: string;

  watch?: boolean;

  activity_selector_options?: Record<string, any>;

  data?: FeedInput;

  external_ranking?: Record<string, any>;

  filter?: Record<string, any>;

  followers_pagination?: PagerRequest;

  following_pagination?: PagerRequest;

  interest_weights?: Record<string, number>;

  member_pagination?: PagerRequest;

  user?: UserRequest;
}

export interface GetOrCreateFeedResponse {
  created: boolean;

  duration: string;

  activities: ActivityResponse[];

  aggregated_activities: AggregatedActivityResponse[];

  followers: FollowResponse[];

  following: FollowResponse[];

  members: FeedMemberResponse[];

  own_capabilities: FeedOwnCapability[];

  pinned_activities: ActivityPinResponse[];

  feed: FeedResponse;

  next?: string;

  prev?: string;

  own_follows?: FollowResponse[];

  followers_pagination?: PagerResponse;

  following_pagination?: PagerResponse;

  member_pagination?: PagerResponse;

  notification_status?: NotificationStatusResponse;

  own_membership?: FeedMemberResponse;
}

export interface GetPushTemplatesResponse {
  duration: string;

  templates: PushTemplate[];
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

  item?: ReviewQueueItemResponse;
}

export interface GetSegmentResponse {
  duration: string;

  segment?: SegmentResponse;
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

export interface GoLiveRequest {
  recording_storage_name?: string;

  start_closed_caption?: boolean;

  start_hls?: boolean;

  start_recording?: boolean;

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

export interface GroupedStatsResponse {
  name: string;

  unique: number;
}

export interface HLSEgressConfig {
  playlist_url?: string;

  start_unix_nano?: number;

  qualities?: Quality[];

  composite_app_settings?: CompositeAppSettings;
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

export interface HarmConfig {
  severity: number;

  action_sequences: ActionSequence[];
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

export interface ImageContentParameters {
  harm_labels?: string[];
}

export interface ImageData {
  frames: string;

  height: string;

  size: string;

  url: string;

  width: string;
}

export interface ImageRuleParameters {
  threshold: number;

  time_window: string;

  harm_labels?: string[];
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

export interface JoinCallAPIMetrics {
  failures: number;

  total: number;

  latency?: ActiveCallsLatencyStats;
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

  detect_orientation?: boolean;

  options?: Record<string, any>;
}

export interface LayoutSettingsRequest {
  name: 'spotlight' | 'grid' | 'single-participant' | 'mobile' | 'custom';

  detect_orientation?: boolean;

  external_app_url?: string;

  external_css_url?: string;

  options?: Record<string, any>;
}

export interface LayoutSettingsResponse {
  external_app_url: string;

  external_css_url: string;

  name: 'spotlight' | 'grid' | 'single-participant' | 'mobile' | 'custom';

  detect_orientation?: boolean;

  options?: Record<string, any>;
}

export interface LimitInfo {
  limit: number;

  remaining: number;

  reset: number;
}

export interface LimitsSettings {
  max_participants_exclude_roles: string[];

  max_duration_seconds?: number;

  max_participants?: number;

  max_participants_exclude_owner?: boolean;
}

export interface LimitsSettingsRequest {
  max_duration_seconds?: number;

  max_participants?: number;

  max_participants_exclude_owner?: boolean;

  max_participants_exclude_roles?: string[];
}

export interface LimitsSettingsResponse {
  max_participants_exclude_roles: string[];

  max_duration_seconds?: number;

  max_participants?: number;

  max_participants_exclude_owner?: boolean;
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

  devices: DeviceResponse[];
}

export interface ListExternalStorageResponse {
  duration: string;

  external_storages: Record<string, ExternalStorageResponse>;
}

export interface ListFeedGroupsResponse {
  duration: string;

  groups: Record<string, FeedGroupResponse>;
}

export interface ListFeedViewsResponse {
  duration: string;

  views: Record<string, FeedViewResponse>;
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

export interface MarkActivityRequest {
  mark_all_read?: boolean;

  mark_all_seen?: boolean;

  user_id?: string;

  mark_read?: string[];

  mark_watched?: string[];

  user?: UserRequest;
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

export interface MarkReviewedRequest {
  content_to_mark_as_reviewed_limit?: number;

  disable_marking_content_as_reviewed?: boolean;
}

export interface MarkUnreadRequest {
  message_id?: string;

  thread_id?: string;

  user_id?: string;

  user?: UserRequest;
}

export interface MemberAddedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  member?: ChannelMember;

  user?: User;
}

export interface MemberLookup {
  limit: number;
}

export interface MemberRemovedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  member?: ChannelMember;

  user?: User;
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

export interface MemberUpdatedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  member?: ChannelMember;

  user?: User;
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

  type: string;

  updated_at: Date;

  attachments: Attachment[];

  latest_reactions: Reaction[];

  mentioned_users: User[];

  own_reactions: Reaction[];

  restricted_visibility: string[];

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

  thread_participants?: User[];

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  moderation?: ModerationV2Response;

  pinned_by?: User;

  poll?: Poll;

  quoted_message?: Message;

  reminder?: MessageReminder;

  shared_location?: SharedLocation;

  user?: User;
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

export interface MessageDeletedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  hard_delete: boolean;

  type: string;

  team?: string;

  thread_participants?: User[];

  message?: Message;

  user?: User;
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

export interface MessageFlaggedEvent {
  cid: string;

  created_at: Date;

  type: string;

  thread_participants?: User[];

  flag?: Flag;

  message?: Message;

  user?: User;
}

export interface MessageHistoryEntryResponse {
  is_deleted: boolean;

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

export interface MessageNewEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  watcher_count: number;

  type: string;

  team?: string;

  thread_participants?: User[];

  message?: Message;

  user?: User;
}

export interface MessageOptions {
  include_thread_participants?: boolean;
}

export interface MessagePaginationParams {}

export interface MessageReadEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  channel_last_message_at?: Date;

  last_read_message_id?: string;

  team?: string;

  thread?: ThreadResponse;

  user?: UserResponseCommonFields;
}

export interface MessageReminder {
  channel_cid: string;

  created_at: Date;

  message_id: string;

  task_id: string;

  updated_at: Date;

  user_id: string;

  remind_at?: Date;

  channel?: Channel;

  message?: Message;

  user?: User;
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

  type?: "''" | 'regular' | 'system';

  user_id?: string;

  attachments?: Attachment[];

  mentioned_users?: string[];

  restricted_visibility?: string[];

  custom?: Record<string, any>;

  shared_location?: SharedLocation;

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

  type: 'regular' | 'ephemeral' | 'error' | 'reply' | 'system' | 'deleted';

  updated_at: Date;

  attachments: Attachment[];

  latest_reactions: ReactionResponse[];

  mentioned_users: UserResponse[];

  own_reactions: ReactionResponse[];

  restricted_visibility: string[];

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

  draft?: DraftResponse;

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  moderation?: ModerationV2Response;

  pinned_by?: UserResponse;

  poll?: PollResponseData;

  quoted_message?: MessageResponse;

  reaction_groups?: Record<string, ReactionGroupResponse>;

  reminder?: ReminderResponseData;

  shared_location?: SharedLocationResponseData;
}

export interface MessageStatsResponse {
  count_over_time?: CountByMinuteResponse[];
}

export interface MessageUnblockedEvent {
  cid: string;

  created_at: Date;

  type: string;

  thread_participants?: User[];

  message?: Message;

  user?: User;
}

export interface MessageUndeletedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  thread_participants?: User[];

  message?: Message;

  user?: User;
}

export interface MessageUpdate {
  old_text?: string;

  change_set?: MessageChangeSet;
}

export interface MessageUpdatedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  thread_participants?: User[];

  message?: Message;

  user?: User;
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

  type: 'regular' | 'ephemeral' | 'error' | 'reply' | 'system' | 'deleted';

  updated_at: Date;

  attachments: Attachment[];

  latest_reactions: ReactionResponse[];

  mentioned_users: UserResponse[];

  own_reactions: ReactionResponse[];

  restricted_visibility: string[];

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

  draft?: DraftResponse;

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  moderation?: ModerationV2Response;

  pinned_by?: UserResponse;

  poll?: PollResponseData;

  quoted_message?: MessageResponse;

  reaction_groups?: Record<string, ReactionGroupResponse>;

  reminder?: ReminderResponseData;

  shared_location?: SharedLocationResponseData;
}

export interface ModerationActionConfig {
  action: string;

  description: string;

  entity_type: string;

  icon: string;

  order: number;

  custom: Record<string, any>;
}

export interface ModerationCheckCompletedEvent {
  created_at: Date;

  entity_id: string;

  entity_type: string;

  recommended_action: string;

  review_queue_item_id: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface ModerationCustomActionEvent {
  created_at: Date;

  type: string;

  item?: ReviewQueueItem;

  message?: Message;

  user?: User;
}

export interface ModerationDashboardPreferences {
  flag_user_on_flagged_content?: boolean;

  media_queue_blur_enabled?: boolean;
}

export interface ModerationFlagResponse {
  created_at: string;

  entity_id: string;

  entity_type: string;

  id: string;

  type: string;

  updated_at: string;

  entity_creator_id?: string;

  reason?: string;

  review_queue_item_id?: string;

  labels?: string[];

  result?: Array<Record<string, any>>;

  custom?: Record<string, any>;

  moderation_payload?: ModerationPayload;

  review_queue_item?: ReviewQueueItemResponse;

  user?: UserResponse;
}

export interface ModerationFlaggedEvent {
  created_at: Date;

  type: string;

  item?: string;

  object_id?: string;

  user?: User;
}

export interface ModerationMarkReviewedEvent {
  created_at: Date;

  type: string;

  item?: ReviewQueueItem;

  message?: Message;

  user?: User;
}

export interface ModerationPayload {
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

export interface ModerationV2Response {
  action: string;

  original_text: string;

  blocklist_matched?: string;

  platform_circumvented?: boolean;

  semantic_filter_matched?: string;

  image_harms?: string[];

  text_harms?: string[];
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

export interface NetworkMetricsReportResponse {
  average_connection_time?: number;

  average_jitter?: number;

  average_latency?: number;

  average_time_to_reconnect?: number;
}

export interface NoiseCancellationSettings {
  mode: 'available' | 'disabled' | 'auto-on';
}

export interface NotificationConfig {
  track_read?: boolean;

  track_seen?: boolean;
}

export interface NotificationMarkUnreadEvent {
  channel_id: string;

  channel_member_count: number;

  channel_type: string;

  cid: string;

  created_at: Date;

  first_unread_message_id: string;

  last_read_at: Date;

  total_unread_count: number;

  unread_channels: number;

  unread_count: number;

  unread_messages: number;

  unread_threads: number;

  type: string;

  last_read_message_id?: string;

  team?: string;

  thread_id?: string;

  channel?: ChannelResponse;

  user?: User;
}

export interface NotificationSettings {
  enabled: boolean;

  call_live_started: EventNotificationSettings;

  call_missed: EventNotificationSettings;

  call_notification: EventNotificationSettings;

  call_ring: EventNotificationSettings;

  session_started: EventNotificationSettings;
}

export interface NotificationStatusResponse {
  unread: number;

  unseen: number;

  last_seen_at?: Date;

  read_activities?: string[];
}

export interface NullTime {}

export interface OCRRule {
  action:
    | 'flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  label: string;
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
  START_CLOSED_CAPTIONS_CALL: 'start-closed-captions-call',
  START_FRAME_RECORD_CALL: 'start-frame-record-call',
  START_RECORD_CALL: 'start-record-call',
  START_TRANSCRIPTION_CALL: 'start-transcription-call',
  STOP_BROADCAST_CALL: 'stop-broadcast-call',
  STOP_CLOSED_CAPTIONS_CALL: 'stop-closed-captions-call',
  STOP_FRAME_RECORD_CALL: 'stop-frame-record-call',
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

  total_unread_count_by_team: Record<string, number>;

  deactivated_at?: Date;

  deleted_at?: Date;

  invisible?: boolean;

  last_active?: Date;

  last_engaged_at?: Date;

  blocked_user_ids?: string[];

  latest_hidden_channels?: string[];

  teams?: string[];

  privacy_settings?: PrivacySettings;

  push_preferences?: PushPreferences;

  teams_role?: Record<string, string>;
}

export interface OwnUserResponse {
  banned: boolean;

  created_at: Date;

  id: string;

  invisible: boolean;

  language: string;

  online: boolean;

  role: string;

  total_unread_count: number;

  unread_channels: number;

  unread_count: number;

  unread_threads: number;

  updated_at: Date;

  channel_mutes: ChannelMute[];

  devices: DeviceResponse[];

  mutes: UserMuteResponse[];

  teams: string[];

  custom: Record<string, any>;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  blocked_user_ids?: string[];

  latest_hidden_channels?: string[];

  privacy_settings?: PrivacySettingsResponse;

  push_preferences?: PushPreferences;

  teams_role?: Record<string, string>;

  total_unread_count_by_team?: Record<string, number>;
}

export interface PagerRequest {
  limit?: number;

  next?: string;

  prev?: string;
}

export interface PagerResponse {
  next?: string;

  prev?: string;
}

export interface PaginationParams {
  limit?: number;

  offset?: number;
}

export interface ParticipantCountByMinuteResponse {
  first: number;

  last: number;

  max: number;

  min: number;

  start_ts: Date;
}

export interface ParticipantCountOverTimeResponse {
  by_minute?: ParticipantCountByMinuteResponse[];
}

export interface ParticipantReportResponse {
  sum: number;

  unique: number;

  max_concurrent?: number;

  by_browser?: GroupedStatsResponse[];

  by_country?: GroupedStatsResponse[];

  by_device?: GroupedStatsResponse[];

  by_operating_system?: GroupedStatsResponse[];

  count_over_time?: ParticipantCountOverTimeResponse;

  publishers?: PublisherStatsResponse;

  subscribers?: SubscriberStatsResponse;
}

export interface PendingMessageEvent {
  created_at: Date;

  method: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  channel?: Channel;

  message?: Message;

  metadata?: Record<string, string>;

  user?: User;
}

export interface PendingMessageResponse {
  channel?: ChannelResponse;

  message?: MessageResponse;

  metadata?: Record<string, string>;

  user?: UserResponse;
}

export interface PerSDKUsageReport {
  total: number;

  by_version: Record<string, number>;
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

export interface PermissionRequestEvent {
  call_cid: string;

  created_at: Date;

  permissions: string[];

  user: UserResponse;

  type: string;
}

export interface PinActivityRequest {
  user_id?: string;

  user?: UserRequest;
}

export interface PinActivityResponse {
  created_at: Date;

  duration: string;

  fid: string;

  user_id: string;

  activity: ActivityResponse;
}

export interface PinRequest {
  session_id: string;

  user_id: string;
}

export interface PinResponse {
  duration: string;
}

export interface PlatformDataResponse {
  browser: BrowserDataResponse;

  device: DeviceDataResponse;

  os: ClientOSDataResponse;
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

  latest_votes_by_option: Record<string, PollVote[]>;

  vote_counts_by_option: Record<string, number>;

  is_closed?: boolean;

  max_votes_allowed?: number;

  voting_visibility?: string;

  created_by?: User;
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

  latest_answers: PollVoteResponseData[];

  options: PollOptionResponseData[];

  own_votes: PollVoteResponseData[];

  custom: Record<string, any>;

  latest_votes_by_option: Record<string, PollVoteResponseData[]>;

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

  user?: User;
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

export interface PublisherAllMetrics {
  audio?: PublisherAudioMetrics;

  rtt_ms?: ActiveCallsLatencyStats;

  video?: PublisherVideoMetrics;
}

export interface PublisherAudioMetrics {
  jitter_ms?: ActiveCallsLatencyStats;
}

export interface PublisherStatsResponse {
  total: number;

  unique: number;

  by_track?: TrackStatsResponse[];
}

export interface PublisherVideoMetrics {
  fps_30?: ActiveCallsFPSStats;

  frame_encoding_time_ms?: ActiveCallsLatencyStats;

  jitter_ms?: ActiveCallsLatencyStats;
}

export interface PublishersMetrics {
  all?: PublisherAllMetrics;
}

export interface PushConfig {
  version: 'v1' | 'v2' | 'v3';

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

export interface PushNotificationSettingsResponse {
  disabled?: boolean;

  disabled_until?: Date;
}

export interface PushPreferenceInput {
  call_level?: 'all' | 'none' | 'default';

  channel_cid?: string;

  chat_level?: 'all' | 'mentions' | 'none' | 'default';

  disabled_until?: Date;

  remove_disable?: boolean;

  user_id?: string;
}

export interface PushPreferences {
  call_level?: string;

  chat_level?: string;

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

  push_templates?: PushTemplate[];
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

export interface PushTemplate {
  created_at: Date;

  enable_push: boolean;

  event_type:
    | 'message.new'
    | 'message.updated'
    | 'reaction.new'
    | 'notification.reminder_due';

  updated_at: Date;

  template?: string;
}

export interface Quality {
  bitdepth?: number;

  framerate?: number;

  height?: number;

  name?: string;

  video_bitrate?: number;

  width?: number;
}

export interface QualityScoreReport {
  histogram: ReportByHistogramBucket[];
}

export interface QualityScoreReportResponse {
  daily: DailyAggregateQualityScoreReportResponse[];
}

export interface QueryActivitiesRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryActivitiesResponse {
  duration: string;

  activities: ActivityResponse[];

  next?: string;

  prev?: string;
}

export interface QueryActivityReactionsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryActivityReactionsResponse {
  duration: string;

  reactions: FeedsReactionResponse[];

  next?: string;

  prev?: string;
}

export interface QueryAggregateCallStatsRequest {
  from?: string;

  to?: string;

  report_types?: string[];
}

export interface QueryAggregateCallStatsResponse {
  duration: string;

  call_duration_report?: CallDurationReportResponse;

  call_participant_count_report?: CallParticipantCountReportResponse;

  calls_per_day_report?: CallsPerDayReportResponse;

  network_metrics_report?: NetworkMetricsReportResponse;

  quality_score_report?: QualityScoreReportResponse;

  sdk_usage_report?: SDKUsageReportResponse;

  user_feedback_report?: UserFeedbackReportResponse;
}

export interface QueryBannedUsersPayload {
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

export interface QueryBookmarkFoldersRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryBookmarkFoldersResponse {
  duration: string;

  bookmark_folders: BookmarkFolderResponse[];

  next?: string;

  prev?: string;
}

export interface QueryBookmarksRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryBookmarksResponse {
  duration: string;

  bookmarks: BookmarkResponse[];

  next?: string;

  prev?: string;
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

export interface QueryCallParticipantsRequest {
  filter_conditions?: Record<string, any>;
}

export interface QueryCallParticipantsResponse {
  duration: string;

  total_participants: number;

  members: MemberResponse[];

  own_capabilities: OwnCapability[];

  participants: CallParticipantResponse[];

  call: CallResponse;
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

export interface QueryCampaignsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_limit?: number;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryCampaignsResponse {
  duration: string;

  campaigns: CampaignResponse[];

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

export interface QueryCommentReactionsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryCommentReactionsResponse {
  duration: string;

  reactions: FeedsReactionResponse[];

  next?: string;

  prev?: string;
}

export interface QueryCommentsRequest {
  filter: Record<string, any>;

  limit?: number;

  next?: string;

  prev?: string;

  sort?: 'first' | 'last' | 'top' | 'best' | 'controversial';
}

export interface QueryCommentsResponse {
  duration: string;

  comments: CommentResponse[];

  next?: string;

  prev?: string;
}

export interface QueryDraftsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryDraftsResponse {
  duration: string;

  drafts: DraftResponse[];

  next?: string;

  prev?: string;
}

export interface QueryFeedMembersRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryFeedMembersResponse {
  duration: string;

  members: FeedMemberResponse[];

  next?: string;

  prev?: string;
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

export interface QueryFeedsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  watch?: boolean;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryFeedsResponse {
  duration: string;

  feeds: FeedResponse[];

  next?: string;

  prev?: string;
}

export interface QueryFollowsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryFollowsResponse {
  duration: string;

  follows: FollowResponse[];

  next?: string;

  prev?: string;
}

export interface QueryMembersPayload {
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

export interface QueryMessageFlagsPayload {
  limit?: number;

  offset?: number;

  show_deleted_messages?: boolean;

  user_id?: string;

  sort?: SortParamRequest[];

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

export interface QueryModerationConfigsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryModerationConfigsResponse {
  duration: string;

  configs: ConfigResponse[];

  next?: string;

  prev?: string;
}

export interface QueryModerationFlagsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParam[];

  filter?: Record<string, any>;
}

export interface QueryModerationFlagsResponse {
  duration: string;

  flags: ModerationFlagResponse[];

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

  logs: ActionLogResponse[];

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

export interface QueryRemindersRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryRemindersResponse {
  duration: string;

  reminders: ReminderResponseData[];

  next?: string;

  prev?: string;
}

export interface QueryReviewQueueRequest {
  limit?: number;

  lock_count?: number;

  lock_duration?: number;

  lock_items?: boolean;

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

  items: ReviewQueueItemResponse[];

  action_config: Record<string, ModerationActionConfig[]>;

  stats: Record<string, any>;

  next?: string;

  prev?: string;
}

export interface QuerySegmentTargetsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QuerySegmentTargetsResponse {
  duration: string;

  targets: SegmentTargetResponse[];

  next?: string;

  prev?: string;
}

export interface QuerySegmentsRequest {
  filter: Record<string, any>;

  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];
}

export interface QuerySegmentsResponse {
  duration: string;

  segments: SegmentResponse[];

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

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryThreadsResponse {
  duration: string;

  threads: ThreadStateResponse[];

  next?: string;

  prev?: string;
}

export interface QueryUserFeedbackRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter_conditions?: Record<string, any>;
}

export interface QueryUserFeedbackResponse {
  duration: string;

  user_feedback: UserFeedbackResponse[];

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

export interface RTMPBroadcastRequest {
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

export interface RTMPEgressConfig {
  rtmp_location?: string;

  composite_app_settings?: CompositeAppSettings;

  quality?: Quality;
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

export interface RankingConfig {
  score?: string;

  type?: string;

  defaults?: Record<string, any>;

  functions?: Record<string, DecayFunctionConfig>;
}

export interface Reaction {
  created_at: Date;

  message_id: string;

  score: number;

  type: string;

  updated_at: Date;

  custom: Record<string, any>;

  user_id?: string;

  user?: User;
}

export interface ReactionDeletedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  thread_participants?: User[];

  message?: Message;

  reaction?: Reaction;

  user?: User;
}

export interface ReactionGroupResponse {
  count: number;

  first_reaction_at: Date;

  last_reaction_at: Date;

  sum_scores: number;
}

export interface ReactionNewEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  team?: string;

  thread_participants?: User[];

  message?: Message;

  reaction?: Reaction;

  user?: User;
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

export interface ReactionUpdatedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  message: Message;

  reaction: Reaction;

  type: string;

  team?: string;

  user?: User;
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

export interface ReadReceipts {
  enabled: boolean;
}

export interface ReadReceiptsResponse {
  enabled?: boolean;
}

export interface ReadStateResponse {
  last_read: Date;

  unread_messages: number;

  user: UserResponse;

  last_read_message_id?: string;
}

export interface RecordSettings {
  mode: string;

  audio_only?: boolean;

  quality?: string;

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

export interface RecordingEgressConfig {
  audio_only?: boolean;

  storage_name?: string;

  composite_app_settings?: CompositeAppSettings;

  external_storage?: ExternalStorage;

  quality?: Quality;

  video_orientation_hint?: VideoOrientation;
}

export interface RejectFeedMemberInviteRequest {
  user_id?: string;

  user?: UserRequest;
}

export interface RejectFeedMemberInviteResponse {
  duration: string;

  member: FeedMemberResponse;
}

export interface RejectFollowRequest {
  source_fid: string;

  target_fid: string;
}

export interface RejectFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface ReminderResponseData {
  channel_cid: string;

  created_at: Date;

  message_id: string;

  updated_at: Date;

  user_id: string;

  remind_at?: Date;

  channel?: ChannelResponse;

  message?: Message;

  user?: User;
}

export interface RepliesMeta {
  depth_truncated: boolean;

  has_more: boolean;

  remaining: number;

  next_cursor?: string;
}

export interface ReportByHistogramBucket {
  category: string;

  count: number;

  sum: number;

  lower_bound?: Bound;

  upper_bound?: Bound;
}

export interface ReportResponse {
  call: CallReportResponse;

  participants: ParticipantReportResponse;

  user_ratings: UserRatingReportResponse;
}

export interface Response {
  duration: string;
}

export interface RestoreActionRequest {}

export interface RestoreUsersRequest {
  user_ids: string[];
}

export interface ReviewQueueItem {
  ai_text_severity: string;

  bounce_count: number;

  config_key: string;

  content_changed: boolean;

  created_at: Date;

  entity_id: string;

  entity_type: string;

  flags_count: number;

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

  flags: Flag[];

  languages: string[];

  teams: string[];

  completed_at: NullTime;

  reviewed_at: NullTime;

  activity?: EnrichedActivity;

  assigned_to?: User;

  call?: Call;

  entity_creator?: EntityCreator;

  feeds_v2_activity?: EnrichedActivity;

  feeds_v2_reaction?: Reaction;

  message?: Message;

  moderation_payload?: ModerationPayload;

  reaction?: Reaction;
}

export interface ReviewQueueItemNewEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  flags?: FlagResponse[];

  action?: ActionLogResponse;

  review_queue_item?: ReviewQueueItemResponse;
}

export interface ReviewQueueItemResponse {
  ai_text_severity: string;

  created_at: Date;

  entity_id: string;

  entity_type: string;

  flags_count: number;

  id: string;

  recommended_action: string;

  reviewed_by: string;

  severity: number;

  status: string;

  updated_at: Date;

  actions: ActionLogResponse[];

  bans: Ban[];

  flags: FlagResponse[];

  languages: string[];

  completed_at?: Date;

  config_key?: string;

  entity_creator_id?: string;

  reviewed_at?: Date;

  teams?: string[];

  activity?: EnrichedActivity;

  assigned_to?: UserResponse;

  call?: CallResponse;

  entity_creator?: EntityCreatorResponse;

  feeds_v2_activity?: EnrichedActivity;

  feeds_v2_reaction?: Reaction;

  message?: MessageResponse;

  moderation_payload?: ModerationPayload;

  reaction?: Reaction;
}

export interface ReviewQueueItemUpdatedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  flags?: FlagResponse[];

  action?: ActionLogResponse;

  review_queue_item?: ReviewQueueItemResponse;
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

export interface RuleBuilderAction {
  type: string;

  ban_options?: BanOptions;

  flag_content_options?: FlagContentOptions;

  flag_user_options?: FlagUserOptions;

  remove_content_options?: BlockContentOptions;
}

export interface RuleBuilderCondition {
  type: string;

  confidence?: number;

  content_count_rule_params?: ContentCountRuleParameters;

  image_content_params?: ImageContentParameters;

  image_rule_params?: ImageRuleParameters;

  text_content_params?: TextContentParameters;

  text_rule_params?: TextRuleParameters;

  user_created_within_params?: UserCreatedWithinParameters;

  user_rule_params?: UserRuleParameters;

  video_content_params?: VideoContentParameters;

  video_rule_params?: VideoRuleParameters;
}

export interface RuleBuilderConditionGroup {
  logic: string;

  conditions: RuleBuilderCondition[];
}

export interface RuleBuilderConfig {
  rules: RuleBuilderRule[];

  async?: boolean;
}

export interface RuleBuilderRule {
  enabled: boolean;

  id: string;

  name: string;

  rule_type: string;

  action: RuleBuilderAction;

  cooldown_period?: string;

  logic?: string;

  conditions?: RuleBuilderCondition[];

  groups?: RuleBuilderConditionGroup[];
}

export interface S3Request {
  s3_region: string;

  s3_api_key?: string;

  s3_custom_endpoint_url?: string;

  s3_secret?: string;
}

export interface SDKUsageReport {
  per_sdk_usage: Record<string, PerSDKUsageReport>;
}

export interface SDKUsageReportResponse {
  daily: DailyAggregateSDKUsageReportResponse[];
}

export interface SFUIDLastSeen {
  id: string;

  last_seen: Date;

  process_start_time: number;
}

export interface STTEgressConfig {
  closed_captions_enabled?: boolean;

  language?: string;

  storage_name?: string;

  translations_enabled?: boolean;

  upload_transcriptions?: boolean;

  whisper_server_base_url?: string;

  translation_languages?: string[];

  external_storage?: ExternalStorage;
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

export interface SearchPayload {
  filter_conditions: Record<string, any>;

  limit?: number;

  next?: string;

  offset?: number;

  query?: string;

  sort?: SortParamRequest[];

  message_filter_conditions?: Record<string, any>;

  message_options?: MessageOptions;
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

  latest_reactions: ReactionResponse[];

  mentioned_users: UserResponse[];

  own_reactions: ReactionResponse[];

  restricted_visibility: string[];

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

  channel?: ChannelResponse;

  draft?: DraftResponse;

  i18n?: Record<string, string>;

  image_labels?: Record<string, string[]>;

  moderation?: ModerationV2Response;

  pinned_by?: UserResponse;

  poll?: PollResponseData;

  quoted_message?: MessageResponse;

  reaction_groups?: Record<string, ReactionGroupResponse>;

  reminder?: ReminderResponseData;

  shared_location?: SharedLocationResponseData;
}

export interface SearchWarning {
  warning_code: number;

  warning_description: string;

  channel_search_count?: number;

  channel_search_cids?: string[];
}

export interface Segment {
  all_sender_channels: boolean;

  all_users: boolean;

  created_at: Date;

  id: string;

  name: string;

  size: number;

  type: string;

  updated_at: Date;

  deleted_at?: Date;

  description?: string;

  task_id?: string;

  filter?: Record<string, any>;
}

export interface SegmentResponse {
  all_sender_channels: boolean;

  all_users: boolean;

  created_at: Date;

  deleted_at: Date;

  description: string;

  id: string;

  name: string;

  size: number;

  type: string;

  updated_at: Date;

  filter: Record<string, any>;
}

export interface SegmentTargetResponse {
  app_pk: number;

  created_at: Date;

  segment_id: string;

  target_id: string;
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

export interface SessionSettings {
  inactivity_timeout_seconds: number;
}

export interface SessionSettingsRequest {
  inactivity_timeout_seconds: number;
}

export interface SessionSettingsResponse {
  inactivity_timeout_seconds: number;
}

export interface ShadowBlockActionRequest {}

export interface SharedLocation {
  channel_cid: string;

  created_at: Date;

  created_by_device_id: string;

  message_id: string;

  updated_at: Date;

  user_id: string;

  end_at?: Date;

  latitude?: number;

  longitude?: number;

  channel?: Channel;

  message?: Message;
}

export interface SharedLocationResponse {
  channel_cid: string;

  created_at: Date;

  created_by_device_id: string;

  duration: string;

  latitude: number;

  longitude: number;

  message_id: string;

  updated_at: Date;

  user_id: string;

  end_at?: Date;

  channel?: ChannelResponse;

  message?: MessageResponse;
}

export interface SharedLocationResponseData {
  channel_cid: string;

  created_at: Date;

  created_by_device_id: string;

  latitude: number;

  longitude: number;

  message_id: string;

  updated_at: Date;

  user_id: string;

  end_at?: Date;

  channel?: ChannelResponse;

  message?: MessageResponse;
}

export interface SharedLocationsResponse {
  duration: string;

  active_live_locations: SharedLocationResponseData[];
}

export interface ShowChannelRequest {
  user_id?: string;

  user?: UserRequest;
}

export interface ShowChannelResponse {
  duration: string;
}

export interface SingleFollowRequest {
  source: string;

  target: string;

  create_notification_activity?: boolean;

  push_preference?: 'all' | 'none';

  custom?: Record<string, any>;
}

export interface SingleFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface SortParam {
  direction?: number;

  field?: string;
}

export interface SortParamRequest {
  direction?: number;

  field?: string;
}

export interface StartCampaignRequest {
  scheduled_for?: Date;

  stop_at?: Date;
}

export interface StartCampaignResponse {
  duration: string;

  campaign?: CampaignResponse;

  users?: PagerResponse;
}

export interface StartClosedCaptionsRequest {
  enable_transcription?: boolean;

  external_storage?: string;

  language?:
    | 'auto'
    | 'en'
    | 'fr'
    | 'es'
    | 'de'
    | 'it'
    | 'nl'
    | 'pt'
    | 'pl'
    | 'ca'
    | 'cs'
    | 'da'
    | 'el'
    | 'fi'
    | 'id'
    | 'ja'
    | 'ru'
    | 'sv'
    | 'ta'
    | 'th'
    | 'tr'
    | 'hu'
    | 'ro'
    | 'zh'
    | 'ar'
    | 'tl'
    | 'he'
    | 'hi'
    | 'hr'
    | 'ko'
    | 'ms'
    | 'no'
    | 'uk'
    | 'bg'
    | 'et'
    | 'sl'
    | 'sk';
}

export interface StartClosedCaptionsResponse {
  duration: string;
}

export interface StartFrameRecordingRequest {
  recording_external_storage?: string;
}

export interface StartFrameRecordingResponse {
  duration: string;
}

export interface StartHLSBroadcastingRequest {}

export interface StartHLSBroadcastingResponse {
  duration: string;

  playlist_url: string;
}

export interface StartRTMPBroadcastsRequest {
  broadcasts: RTMPBroadcastRequest[];
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
  enable_closed_captions?: boolean;

  language?:
    | 'auto'
    | 'en'
    | 'fr'
    | 'es'
    | 'de'
    | 'it'
    | 'nl'
    | 'pt'
    | 'pl'
    | 'ca'
    | 'cs'
    | 'da'
    | 'el'
    | 'fi'
    | 'id'
    | 'ja'
    | 'ru'
    | 'sv'
    | 'ta'
    | 'th'
    | 'tr'
    | 'hu'
    | 'ro'
    | 'zh'
    | 'ar'
    | 'tl'
    | 'he'
    | 'hi'
    | 'hr'
    | 'ko'
    | 'ms'
    | 'no'
    | 'uk'
    | 'bg'
    | 'et'
    | 'sl'
    | 'sk';

  transcription_external_storage?: string;
}

export interface StartTranscriptionResponse {
  duration: string;
}

export interface StopAllRTMPBroadcastsRequest {}

export interface StopAllRTMPBroadcastsResponse {
  duration: string;
}

export interface StopCampaignRequest {}

export interface StopClosedCaptionsRequest {
  stop_transcription?: boolean;
}

export interface StopClosedCaptionsResponse {
  duration: string;
}

export interface StopFrameRecordingRequest {}

export interface StopFrameRecordingResponse {
  duration: string;
}

export interface StopHLSBroadcastingRequest {}

export interface StopHLSBroadcastingResponse {
  duration: string;
}

export interface StopLiveRequest {
  continue_closed_caption?: boolean;

  continue_hls?: boolean;

  continue_recording?: boolean;

  continue_rtmp_broadcasts?: boolean;

  continue_transcription?: boolean;
}

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

export interface StopTranscriptionRequest {
  stop_closed_captions?: boolean;
}

export interface StopTranscriptionResponse {
  duration: string;
}

export interface StoriesConfig {
  expiration_behaviour?: string;

  skip_watched?: boolean;
}

export interface SubmitActionRequest {
  action_type:
    | 'mark_reviewed'
    | 'delete_message'
    | 'delete_activity'
    | 'delete_reaction'
    | 'ban'
    | 'custom'
    | 'unban'
    | 'restore'
    | 'delete_user'
    | 'unblock'
    | 'shadow_block'
    | 'kick_user'
    | 'end_call';

  item_id: string;

  user_id?: string;

  ban?: BanActionRequest;

  custom?: CustomActionRequest;

  delete_activity?: DeleteActivityRequest;

  delete_message?: DeleteMessageRequest;

  delete_reaction?: DeleteReactionRequest;

  delete_user?: DeleteUserRequest;

  mark_reviewed?: MarkReviewedRequest;

  unban?: UnbanActionRequest;

  user?: UserRequest;
}

export interface SubmitActionResponse {
  duration: string;

  item?: ReviewQueueItemResponse;
}

export interface SubscriberAllMetrics {
  audio?: SubscriberAudioMetrics;

  rtt_ms?: ActiveCallsLatencyStats;

  video?: SubscriberVideoMetrics;
}

export interface SubscriberAudioMetrics {
  concealment_pct?: ActiveCallsLatencyStats;

  jitter_ms?: ActiveCallsLatencyStats;

  packets_lost_pct?: ActiveCallsLatencyStats;
}

export interface SubscriberStatsResponse {
  total: number;

  total_subscribed_duration_seconds: number;

  unique: number;
}

export interface SubscriberVideoMetrics {
  fps_30?: ActiveCallsFPSStats;

  jitter_ms?: ActiveCallsLatencyStats;

  packets_lost_pct?: ActiveCallsLatencyStats;
}

export interface SubscribersMetrics {
  all?: SubscriberAllMetrics;
}

export interface TargetResolution {
  bitrate: number;

  height: number;

  width: number;
}

export interface TextContentParameters {
  contains_url?: boolean;

  severity?: string;

  blocklist_match?: string[];

  harm_labels?: string[];
}

export interface TextRuleParameters {
  threshold: number;

  time_window: string;

  contains_url?: boolean;

  severity?: string;

  blocklist_match?: string[];

  harm_labels?: string[];
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

  user?: UserResponse;
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

  created_by?: UserResponse;

  parent_message?: MessageResponse;
}

export interface ThreadStateResponse {
  channel_cid: string;

  created_at: Date;

  created_by_user_id: string;

  parent_message_id: string;

  title: string;

  updated_at: Date;

  latest_replies: MessageResponse[];

  custom: Record<string, any>;

  active_participant_count?: number;

  deleted_at?: Date;

  last_message_at?: Date;

  participant_count?: number;

  reply_count?: number;

  read?: ReadStateResponse[];

  thread_participants?: ThreadParticipant[];

  channel?: ChannelResponse;

  created_by?: UserResponse;

  draft?: DraftResponse;

  parent_message?: MessageResponse;
}

export interface ThreadUpdatedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  thread?: ThreadResponse;

  user?: User;
}

export interface ThreadedCommentResponse {
  confidence_score: number;

  created_at: Date;

  downvote_count: number;

  id: string;

  object_id: string;

  object_type: string;

  reaction_count: number;

  reply_count: number;

  score: number;

  status: string;

  updated_at: Date;

  upvote_count: number;

  mentioned_users: UserResponse[];

  own_reactions: FeedsReactionResponse[];

  user: UserResponse;

  controversy_score?: number;

  deleted_at?: Date;

  parent_id?: string;

  text?: string;

  attachments?: Attachment[];

  latest_reactions?: FeedsReactionResponse[];

  replies?: ThreadedCommentResponse[];

  custom?: Record<string, any>;

  meta?: RepliesMeta;

  moderation?: ModerationV2Response;

  reaction_groups?: Record<string, ReactionGroupResponse>;
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

export interface TrackStatsResponse {
  duration_seconds: number;

  track_type: string;
}

export interface TranscriptionSettings {
  closed_caption_mode: 'available' | 'disabled' | 'auto-on';

  language:
    | 'auto'
    | 'en'
    | 'fr'
    | 'es'
    | 'de'
    | 'it'
    | 'nl'
    | 'pt'
    | 'pl'
    | 'ca'
    | 'cs'
    | 'da'
    | 'el'
    | 'fi'
    | 'id'
    | 'ja'
    | 'ru'
    | 'sv'
    | 'ta'
    | 'th'
    | 'tr'
    | 'hu'
    | 'ro'
    | 'zh'
    | 'ar'
    | 'tl'
    | 'he'
    | 'hi'
    | 'hr'
    | 'ko'
    | 'ms'
    | 'no'
    | 'uk'
    | 'bg'
    | 'et'
    | 'sl'
    | 'sk';

  mode: 'available' | 'disabled' | 'auto-on';
}

export interface TranscriptionSettingsRequest {
  mode: 'available' | 'disabled' | 'auto-on';

  closed_caption_mode?: 'available' | 'disabled' | 'auto-on';

  language?:
    | 'auto'
    | 'en'
    | 'fr'
    | 'es'
    | 'de'
    | 'it'
    | 'nl'
    | 'pt'
    | 'pl'
    | 'ca'
    | 'cs'
    | 'da'
    | 'el'
    | 'fi'
    | 'id'
    | 'ja'
    | 'ru'
    | 'sv'
    | 'ta'
    | 'th'
    | 'tr'
    | 'hu'
    | 'ro'
    | 'zh'
    | 'ar'
    | 'tl'
    | 'he'
    | 'hi'
    | 'hr'
    | 'ko'
    | 'ms'
    | 'no'
    | 'uk'
    | 'bg'
    | 'et'
    | 'sl'
    | 'sk';
}

export interface TranscriptionSettingsResponse {
  closed_caption_mode: 'available' | 'disabled' | 'auto-on';

  language:
    | 'auto'
    | 'en'
    | 'fr'
    | 'es'
    | 'de'
    | 'it'
    | 'nl'
    | 'pt'
    | 'pl'
    | 'ca'
    | 'cs'
    | 'da'
    | 'el'
    | 'fi'
    | 'id'
    | 'ja'
    | 'ru'
    | 'sv'
    | 'ta'
    | 'th'
    | 'tr'
    | 'hu'
    | 'ro'
    | 'zh'
    | 'ar'
    | 'tl'
    | 'he'
    | 'hi'
    | 'hr'
    | 'ko'
    | 'ms'
    | 'no'
    | 'uk'
    | 'bg'
    | 'et'
    | 'sl'
    | 'sk';

  mode: 'available' | 'disabled' | 'auto-on';
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
    | 'vi'
    | 'lt'
    | 'ht';
}

export interface TruncateChannelRequest {
  hard_delete?: boolean;

  skip_push?: boolean;

  truncated_at?: Date;

  user_id?: string;

  member_ids?: string[];

  message?: MessageRequest;

  user?: UserRequest;
}

export interface TruncateChannelResponse {
  duration: string;

  channel?: ChannelResponse;

  message?: MessageResponse;
}

export interface TypingIndicators {
  enabled: boolean;
}

export interface TypingIndicatorsResponse {
  enabled?: boolean;
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

export interface UnblockedUserEvent {
  call_cid: string;

  created_at: Date;

  user: UserResponse;

  type: string;
}

export interface UnfollowBatchRequest {
  follows: FollowPair[];
}

export interface UnfollowBatchResponse {
  duration: string;
}

export interface UnfollowResponse {
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

export interface UnpinActivityResponse {
  duration: string;

  fid: string;

  user_id: string;

  activity: ActivityResponse;
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

  total_unread_count_by_team: Record<string, number>;
}

export interface UnreadCountsThread {
  last_read: Date;

  last_read_message_id: string;

  parent_message_id: string;

  unread_count: number;
}

export interface UpdateActivityPartialRequest {
  user_id?: string;

  unset?: string[];

  set?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdateActivityPartialResponse {
  duration: string;

  activity: ActivityResponse;
}

export interface UpdateActivityRequest {
  expires_at?: Date;

  poll_id?: string;

  text?: string;

  user_id?: string;

  visibility?: string;

  attachments?: Attachment[];

  filter_tags?: string[];

  interest_tags?: string[];

  custom?: Record<string, any>;

  location?: ActivityLocation;

  user?: UserRequest;
}

export interface UpdateActivityResponse {
  duration: string;

  activity: ActivityResponse;
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

  guest_user_creation_disabled?: boolean;

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

  webhook_url?: string;

  allowed_flag_reasons?: string[];

  event_hooks?: EventHook[];

  image_moderation_block_labels?: string[];

  image_moderation_labels?: string[];

  user_search_disallowed_roles?: string[];

  webhook_events?: string[];

  apn_config?: APNConfig;

  async_moderation_config?: AsyncModerationConfiguration;

  datadog_info?: DataDogInfo;

  file_upload_config?: FileUploadConfig;

  firebase_config?: FirebaseConfig;

  grants?: Record<string, string[]>;

  huawei_config?: HuaweiConfig;

  image_upload_config?: FileUploadConfig;

  moderation_dashboard_preferences?: ModerationDashboardPreferences;

  push_config?: PushConfig;

  xiaomi_config?: XiaomiConfig;
}

export interface UpdateBlockListRequest {
  team?: string;

  words?: string[];
}

export interface UpdateBlockListResponse {
  duration: string;

  blocklist?: BlockListResponse;
}

export interface UpdateBookmarkFolderRequest {
  name?: string;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdateBookmarkFolderResponse {
  duration: string;

  bookmark_folder: BookmarkFolderResponse;
}

export interface UpdateBookmarkRequest {
  folder_id?: string;

  new_folder_id?: string;

  user_id?: string;

  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;

  user?: UserRequest;
}

export interface UpdateBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
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

  message?: MessageResponse;
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

  shared_locations?: boolean;

  skip_last_msg_update_for_system_msgs?: boolean;

  typing_events?: boolean;

  uploads?: boolean;

  url_enrichment?: boolean;

  user_message_reminders?: boolean;

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

  shared_locations: boolean;

  skip_last_msg_update_for_system_msgs: boolean;

  typing_events: boolean;

  updated_at: Date;

  uploads: boolean;

  url_enrichment: boolean;

  user_message_reminders: boolean;

  commands: string[];

  permissions: PolicyRequest[];

  grants: Record<string, string[]>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

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

export interface UpdateCommentRequest {
  comment?: string;

  custom?: Record<string, any>;
}

export interface UpdateCommentResponse {
  duration: string;

  comment: CommentResponse;
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

export interface UpdateFeedGroupRequest {
  default_view_id?: string;

  custom?: Record<string, any>;

  notification?: NotificationConfig;
}

export interface UpdateFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface UpdateFeedMembersRequest {
  operation: 'upsert' | 'remove' | 'set';

  limit?: number;

  next?: string;

  prev?: string;

  members?: FeedMemberRequest[];
}

export interface UpdateFeedMembersResponse {
  duration: string;

  added: FeedMemberResponse[];

  removed_ids: string[];

  updated: FeedMemberResponse[];
}

export interface UpdateFeedRequest {
  created_by_id?: string;

  custom?: Record<string, any>;
}

export interface UpdateFeedResponse {
  duration: string;

  feed: FeedResponse;
}

export interface UpdateFeedViewRequest {
  activity_processors?: ActivityProcessorConfig[];

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface UpdateFeedViewResponse {
  duration: string;

  feed_view: FeedViewResponse;
}

export interface UpdateFollowRequest {
  source: string;

  target: string;

  create_notification_activity?: boolean;

  follower_role?: string;

  push_preference?: 'all' | 'none';

  custom?: Record<string, any>;
}

export interface UpdateFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface UpdateLiveLocationRequest {
  created_by_device_id: string;

  message_id: string;

  end_at?: Date;

  latitude?: number;

  longitude?: number;
}

export interface UpdateMemberPartialRequest {
  unset?: string[];

  set?: Record<string, any>;
}

export interface UpdateMemberPartialResponse {
  duration: string;

  channel_member?: ChannelMemberResponse;
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

  message?: MessageResponse;

  pending_message_metadata?: Record<string, string>;
}

export interface UpdateMessageRequest {
  message: MessageRequest;

  skip_enrich_url?: boolean;

  skip_push?: boolean;
}

export interface UpdateMessageResponse {
  duration: string;

  message: MessageResponse;

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

export interface UpdateReminderRequest {
  remind_at?: Date;

  user_id?: string;

  user?: UserRequest;
}

export interface UpdateReminderResponse {
  duration: string;

  reminder: ReminderResponseData;
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

export interface UpdatedCallPermissionsEvent {
  call_cid: string;

  created_at: Date;

  own_capabilities: OwnCapability[];

  user: UserResponse;

  type: string;
}

export interface UpsertActivitiesRequest {
  activities: ActivityRequest[];
}

export interface UpsertActivitiesResponse {
  duration: string;

  activities: ActivityResponse[];
}

export interface UpsertConfigRequest {
  key: string;

  async?: boolean;

  team?: string;

  user_id?: string;

  ai_image_config?: AIImageConfig;

  ai_text_config?: AITextConfig;

  ai_video_config?: AIVideoConfig;

  automod_platform_circumvention_config?: AutomodPlatformCircumventionConfig;

  automod_semantic_filters_config?: AutomodSemanticFiltersConfig;

  automod_toxicity_config?: AutomodToxicityConfig;

  aws_rekognition_config?: AIImageConfig;

  block_list_config?: BlockListConfig;

  bodyguard_config?: AITextConfig;

  google_vision_config?: GoogleVisionConfig;

  rule_builder_config?: RuleBuilderConfig;

  user?: UserRequest;

  velocity_filter_config?: VelocityFilterConfig;

  video_call_rule_config?: VideoCallRuleConfig;
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

export interface UpsertPushPreferencesRequest {
  preferences: PushPreferenceInput[];
}

export interface UpsertPushPreferencesResponse {
  duration: string;

  user_channel_preferences: Record<
    string,
    Record<string, ChannelPushPreferences>
  >;

  user_preferences: Record<string, PushPreferences>;
}

export interface UpsertPushProviderRequest {
  push_provider?: PushProvider;
}

export interface UpsertPushProviderResponse {
  duration: string;

  push_provider: PushProviderResponse;
}

export interface UpsertPushTemplateRequest {
  event_type:
    | 'message.new'
    | 'message.updated'
    | 'reaction.new'
    | 'notification.reminder_due';

  push_provider_type: 'firebase' | 'apn';

  enable_push?: boolean;

  push_provider_name?: string;

  template?: string;
}

export interface UpsertPushTemplateResponse {
  duration: string;

  template?: PushTemplate;
}

export interface User {
  banned: boolean;

  id: string;

  online: boolean;

  role: string;

  custom: Record<string, any>;

  teams_role: Record<string, string>;

  ban_expires?: Date;

  created_at?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  invisible?: boolean;

  language?: string;

  last_active?: Date;

  last_engaged_at?: Date;

  revoke_tokens_issued_before?: Date;

  updated_at?: Date;

  teams?: string[];

  privacy_settings?: PrivacySettings;
}

export interface UserBannedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  shadow: boolean;

  created_by: User;

  type: string;

  expiration?: Date;

  reason?: string;

  team?: string;

  user?: User;
}

export interface UserCreatedWithinParameters {
  max_age?: string;
}

export interface UserCustomEventRequest {
  type: string;

  custom?: Record<string, any>;
}

export interface UserDeactivatedEvent {
  created_at: Date;

  created_by: User;

  type: string;

  user?: User;
}

export interface UserDeletedEvent {
  created_at: Date;

  delete_conversation_channels: boolean;

  hard_delete: boolean;

  mark_messages_deleted: boolean;

  type: string;

  user?: User;
}

export interface UserFeedbackReport {
  unreported_count: number;

  count_by_rating: Record<string, number>;
}

export interface UserFeedbackReportResponse {
  daily: DailyAggregateUserFeedbackReportResponse[];
}

export interface UserFeedbackResponse {
  cid: string;

  rating: number;

  reason: string;

  sdk: string;

  sdk_version: string;

  session_id: string;

  user_id: string;

  platform: PlatformDataResponse;

  custom?: Record<string, any>;
}

export interface UserFlaggedEvent {
  created_at: Date;

  type: string;

  target_user?: string;

  target_users?: string[];

  user?: User;
}

export interface UserMute {
  created_at: Date;

  updated_at: Date;

  expires?: Date;

  target?: User;

  user?: User;
}

export interface UserMuteResponse {
  created_at: Date;

  updated_at: Date;

  expires?: Date;

  target?: UserResponse;

  user?: UserResponse;
}

export interface UserMutedEvent {
  created_at: Date;

  type: string;

  target_user?: string;

  target_users?: string[];

  user?: User;
}

export interface UserRatingReportResponse {
  average: number;

  count: number;
}

export interface UserReactivatedEvent {
  created_at: Date;

  type: string;

  user?: User;
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

  privacy_settings?: PrivacySettingsResponse;

  teams_role?: Record<string, string>;
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

  teams: string[];

  custom: Record<string, any>;

  ban_expires?: Date;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  devices?: DeviceResponse[];

  privacy_settings?: PrivacySettingsResponse;

  push_notifications?: PushNotificationSettingsResponse;

  teams_role?: Record<string, string>;
}

export interface UserResponseCommonFields {
  banned: boolean;

  created_at: Date;

  id: string;

  language: string;

  online: boolean;

  role: string;

  updated_at: Date;

  blocked_user_ids: string[];

  teams: string[];

  custom: Record<string, any>;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  teams_role?: Record<string, string>;
}

export interface UserResponsePrivacyFields {
  banned: boolean;

  created_at: Date;

  id: string;

  language: string;

  online: boolean;

  role: string;

  updated_at: Date;

  blocked_user_ids: string[];

  teams: string[];

  custom: Record<string, any>;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  invisible?: boolean;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  privacy_settings?: PrivacySettingsResponse;

  teams_role?: Record<string, string>;
}

export interface UserRuleParameters {
  max_age?: string;
}

export interface UserUnbannedEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  shadow: boolean;

  type: string;

  team?: string;

  user?: User;
}

export interface UserUnmutedEvent {
  created_at: Date;

  type: string;

  target_user?: string;

  target_users?: string[];

  user?: User;
}

export interface UserUnreadReminderEvent {
  created_at: Date;

  channels: Record<string, ChannelMessages>;

  type: string;

  user?: User;
}

export interface UserUpdatedEvent {
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponsePrivacyFields;

  type: string;

  received_at?: Date;
}

export interface VelocityFilterConfig {
  advanced_filters: boolean;

  cascading_actions: boolean;

  cids_per_user: number;

  enabled: boolean;

  first_message_only: boolean;

  rules: VelocityFilterConfigRule[];

  async?: boolean;
}

export interface VelocityFilterConfigRule {
  action: 'flag' | 'shadow' | 'remove' | 'ban';

  ban_duration: number;

  cascading_action: 'flag' | 'shadow' | 'remove' | 'ban';

  cascading_threshold: number;

  check_message_context: boolean;

  fast_spam_threshold: number;

  fast_spam_ttl: number;

  ip_ban: boolean;

  probation_period: number;

  shadow_ban: boolean;

  slow_spam_threshold: number;

  slow_spam_ttl: number;

  url_only: boolean;

  slow_spam_ban_duration?: number;
}

export interface VideoCallRuleConfig {
  rules: Record<string, HarmConfig>;
}

export interface VideoContentParameters {
  harm_labels?: string[];
}

export interface VideoEndCallRequest {}

export interface VideoKickUserRequest {}

export interface VideoOrientation {
  orientation?: number;
}

export interface VideoReactionOverTimeResponse {
  by_minute?: CountByMinuteResponse[];
}

export interface VideoReactionsResponse {
  reaction: string;

  count_over_time?: VideoReactionOverTimeResponse;
}

export interface VideoRuleParameters {
  threshold: number;

  time_window: string;

  harm_labels?: string[];
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
}

export interface WSEvent {
  created_at: Date;

  type: string;

  custom: Record<string, any>;

  automoderation?: boolean;

  channel_id?: string;

  channel_last_message_at?: Date;

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

  created_by?: UserResponse;

  me?: OwnUserResponse;

  member?: ChannelMember;

  message?: MessageResponse;

  message_update?: MessageUpdate;

  poll?: PollResponseData;

  poll_vote?: PollVoteResponseData;

  reaction?: ReactionResponse;

  thread?: ThreadResponse;

  user?: UserResponse;
}

export type WebhookEvent =
  | ({ type: '*' } & AnyEvent)
  | ({ type: 'activity.marked' } & ActivityMarkedEvent)
  | ({ type: 'call.accepted' } & CallAcceptedEvent)
  | ({ type: 'call.blocked_user' } & BlockedUserEvent)
  | ({ type: 'call.closed_caption' } & ClosedCaptionEvent)
  | ({ type: 'call.closed_captions_failed' } & CallClosedCaptionsFailedEvent)
  | ({ type: 'call.closed_captions_started' } & CallClosedCaptionsStartedEvent)
  | ({ type: 'call.closed_captions_stopped' } & CallClosedCaptionsStoppedEvent)
  | ({ type: 'call.created' } & CallCreatedEvent)
  | ({ type: 'call.deleted' } & CallDeletedEvent)
  | ({ type: 'call.ended' } & CallEndedEvent)
  | ({ type: 'call.frame_recording_failed' } & CallFrameRecordingFailedEvent)
  | ({ type: 'call.frame_recording_ready' } & CallFrameRecordingFrameReadyEvent)
  | ({ type: 'call.frame_recording_started' } & CallFrameRecordingStartedEvent)
  | ({ type: 'call.frame_recording_stopped' } & CallFrameRecordingStoppedEvent)
  | ({ type: 'call.hls_broadcasting_failed' } & CallHLSBroadcastingFailedEvent)
  | ({
      type: 'call.hls_broadcasting_started';
    } & CallHLSBroadcastingStartedEvent)
  | ({
      type: 'call.hls_broadcasting_stopped';
    } & CallHLSBroadcastingStoppedEvent)
  | ({ type: 'call.live_started' } & CallLiveStartedEvent)
  | ({ type: 'call.member_added' } & CallMemberAddedEvent)
  | ({ type: 'call.member_removed' } & CallMemberRemovedEvent)
  | ({ type: 'call.member_updated' } & CallMemberUpdatedEvent)
  | ({
      type: 'call.member_updated_permission';
    } & CallMemberUpdatedPermissionEvent)
  | ({ type: 'call.missed' } & CallMissedEvent)
  | ({ type: 'call.moderation_blur' } & CallModerationBlurEvent)
  | ({ type: 'call.moderation_warning' } & CallModerationWarningEvent)
  | ({ type: 'call.notification' } & CallNotificationEvent)
  | ({ type: 'call.permission_request' } & PermissionRequestEvent)
  | ({ type: 'call.permissions_updated' } & UpdatedCallPermissionsEvent)
  | ({ type: 'call.reaction_new' } & CallReactionEvent)
  | ({ type: 'call.recording_failed' } & CallRecordingFailedEvent)
  | ({ type: 'call.recording_ready' } & CallRecordingReadyEvent)
  | ({ type: 'call.recording_started' } & CallRecordingStartedEvent)
  | ({ type: 'call.recording_stopped' } & CallRecordingStoppedEvent)
  | ({ type: 'call.rejected' } & CallRejectedEvent)
  | ({ type: 'call.ring' } & CallRingEvent)
  | ({ type: 'call.rtmp_broadcast_failed' } & CallRtmpBroadcastFailedEvent)
  | ({ type: 'call.rtmp_broadcast_started' } & CallRtmpBroadcastStartedEvent)
  | ({ type: 'call.rtmp_broadcast_stopped' } & CallRtmpBroadcastStoppedEvent)
  | ({ type: 'call.session_ended' } & CallSessionEndedEvent)
  | ({
      type: 'call.session_participant_joined';
    } & CallSessionParticipantJoinedEvent)
  | ({
      type: 'call.session_participant_left';
    } & CallSessionParticipantLeftEvent)
  | ({ type: 'call.session_started' } & CallSessionStartedEvent)
  | ({ type: 'call.stats_report_ready' } & CallStatsReportReadyEvent)
  | ({ type: 'call.transcription_failed' } & CallTranscriptionFailedEvent)
  | ({ type: 'call.transcription_ready' } & CallTranscriptionReadyEvent)
  | ({ type: 'call.transcription_started' } & CallTranscriptionStartedEvent)
  | ({ type: 'call.transcription_stopped' } & CallTranscriptionStoppedEvent)
  | ({ type: 'call.unblocked_user' } & UnblockedUserEvent)
  | ({ type: 'call.updated' } & CallUpdatedEvent)
  | ({ type: 'call.user_feedback_submitted' } & CallUserFeedbackSubmittedEvent)
  | ({ type: 'call.user_muted' } & CallUserMutedEvent)
  | ({ type: 'campaign.completed' } & CampaignCompletedEvent)
  | ({ type: 'campaign.started' } & CampaignStartedEvent)
  | ({ type: 'channel.created' } & ChannelCreatedEvent)
  | ({ type: 'channel.deleted' } & ChannelDeletedEvent)
  | ({ type: 'channel.frozen' } & ChannelFrozenEvent)
  | ({ type: 'channel.hidden' } & ChannelHiddenEvent)
  | ({ type: 'channel.muted' } & ChannelMutedEvent)
  | ({ type: 'channel.truncated' } & ChannelTruncatedEvent)
  | ({ type: 'channel.unfrozen' } & ChannelUnFrozenEvent)
  | ({ type: 'channel.unmuted' } & ChannelUnmutedEvent)
  | ({ type: 'channel.updated' } & ChannelUpdatedEvent)
  | ({ type: 'channel.visible' } & ChannelVisibleEvent)
  | ({ type: 'custom' } & CustomVideoEvent)
  | ({ type: 'export.bulk_image_moderation.error' } & AsyncExportErrorEvent)
  | ({
      type: 'export.bulk_image_moderation.success';
    } & AsyncBulkImageModerationEvent)
  | ({ type: 'export.channels.error' } & AsyncExportErrorEvent)
  | ({ type: 'export.channels.success' } & AsyncExportChannelsEvent)
  | ({ type: 'export.moderation_logs.error' } & AsyncExportErrorEvent)
  | ({
      type: 'export.moderation_logs.success';
    } & AsyncExportModerationLogsEvent)
  | ({ type: 'export.users.error' } & AsyncExportErrorEvent)
  | ({ type: 'export.users.success' } & AsyncExportUsersEvent)
  | ({ type: 'feeds.activity.added' } & ActivityAddedEvent)
  | ({ type: 'feeds.activity.deleted' } & ActivityDeletedEvent)
  | ({ type: 'feeds.activity.marked' } & ActivityMarkEvent)
  | ({ type: 'feeds.activity.pinned' } & ActivityPinnedEvent)
  | ({ type: 'feeds.activity.reaction.added' } & ActivityReactionAddedEvent)
  | ({ type: 'feeds.activity.reaction.deleted' } & ActivityReactionDeletedEvent)
  | ({ type: 'feeds.activity.reaction.updated' } & ActivityReactionUpdatedEvent)
  | ({
      type: 'feeds.activity.removed_from_feed';
    } & ActivityRemovedFromFeedEvent)
  | ({ type: 'feeds.activity.unpinned' } & ActivityUnpinnedEvent)
  | ({ type: 'feeds.activity.updated' } & ActivityUpdatedEvent)
  | ({ type: 'feeds.bookmark.added' } & BookmarkAddedEvent)
  | ({ type: 'feeds.bookmark.deleted' } & BookmarkDeletedEvent)
  | ({ type: 'feeds.bookmark.updated' } & BookmarkUpdatedEvent)
  | ({ type: 'feeds.bookmark_folder.deleted' } & BookmarkFolderDeletedEvent)
  | ({ type: 'feeds.bookmark_folder.updated' } & BookmarkFolderUpdatedEvent)
  | ({ type: 'feeds.comment.added' } & CommentAddedEvent)
  | ({ type: 'feeds.comment.deleted' } & CommentDeletedEvent)
  | ({ type: 'feeds.comment.reaction.added' } & CommentReactionAddedEvent)
  | ({ type: 'feeds.comment.reaction.deleted' } & CommentReactionDeletedEvent)
  | ({ type: 'feeds.comment.reaction.updated' } & CommentReactionUpdatedEvent)
  | ({ type: 'feeds.comment.updated' } & CommentUpdatedEvent)
  | ({ type: 'feeds.feed.created' } & FeedCreatedEvent)
  | ({ type: 'feeds.feed.deleted' } & FeedDeletedEvent)
  | ({ type: 'feeds.feed.updated' } & FeedUpdatedEvent)
  | ({ type: 'feeds.feed_group.changed' } & FeedGroupChangedEvent)
  | ({ type: 'feeds.feed_group.deleted' } & FeedGroupDeletedEvent)
  | ({ type: 'feeds.feed_member.added' } & FeedMemberAddedEvent)
  | ({ type: 'feeds.feed_member.removed' } & FeedMemberRemovedEvent)
  | ({ type: 'feeds.feed_member.updated' } & FeedMemberUpdatedEvent)
  | ({ type: 'feeds.follow.created' } & FollowCreatedEvent)
  | ({ type: 'feeds.follow.deleted' } & FollowDeletedEvent)
  | ({ type: 'feeds.follow.updated' } & FollowUpdatedEvent)
  | ({ type: 'flag.updated' } & FlagUpdatedEvent)
  | ({ type: 'member.added' } & MemberAddedEvent)
  | ({ type: 'member.removed' } & MemberRemovedEvent)
  | ({ type: 'member.updated' } & MemberUpdatedEvent)
  | ({ type: 'message.deleted' } & MessageDeletedEvent)
  | ({ type: 'message.flagged' } & MessageFlaggedEvent)
  | ({ type: 'message.new' } & MessageNewEvent)
  | ({ type: 'message.pending' } & PendingMessageEvent)
  | ({ type: 'message.read' } & MessageReadEvent)
  | ({ type: 'message.unblocked' } & MessageUnblockedEvent)
  | ({ type: 'message.undeleted' } & MessageUndeletedEvent)
  | ({ type: 'message.updated' } & MessageUpdatedEvent)
  | ({ type: 'moderation.custom_action' } & ModerationCustomActionEvent)
  | ({ type: 'moderation.flagged' } & ModerationFlaggedEvent)
  | ({ type: 'moderation.mark_reviewed' } & ModerationMarkReviewedEvent)
  | ({ type: 'moderation_check.completed' } & ModerationCheckCompletedEvent)
  | ({ type: 'notification.mark_unread' } & NotificationMarkUnreadEvent)
  | ({ type: 'notification.thread_message_new' } & MessageNewEvent)
  | ({ type: 'reaction.deleted' } & ReactionDeletedEvent)
  | ({ type: 'reaction.new' } & ReactionNewEvent)
  | ({ type: 'reaction.updated' } & ReactionUpdatedEvent)
  | ({ type: 'review_queue_item.new' } & ReviewQueueItemNewEvent)
  | ({ type: 'review_queue_item.updated' } & ReviewQueueItemUpdatedEvent)
  | ({ type: 'thread.updated' } & ThreadUpdatedEvent)
  | ({ type: 'user.banned' } & UserBannedEvent)
  | ({ type: 'user.deactivated' } & UserDeactivatedEvent)
  | ({ type: 'user.deleted' } & UserDeletedEvent)
  | ({ type: 'user.flagged' } & UserFlaggedEvent)
  | ({ type: 'user.muted' } & UserMutedEvent)
  | ({ type: 'user.reactivated' } & UserReactivatedEvent)
  | ({ type: 'user.unbanned' } & UserUnbannedEvent)
  | ({ type: 'user.unmuted' } & UserUnmutedEvent)
  | ({ type: 'user.unread_message_reminder' } & UserUnreadReminderEvent)
  | ({ type: 'user.updated' } & UserUpdatedEvent);

export interface WrappedUnreadCountsResponse {
  duration: string;

  total_unread_count: number;

  total_unread_threads_count: number;

  channel_type: UnreadCountsChannelType[];

  channels: UnreadCountsChannel[];

  threads: UnreadCountsThread[];

  total_unread_count_by_team: Record<string, number>;
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
