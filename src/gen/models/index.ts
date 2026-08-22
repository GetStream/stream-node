export interface AIAudioConfigRequest {
  profile?: string;

  rules?: Array<BodyguardRule>;
}

export interface AIAudioConfigResponse {
  enabled: boolean;

  profile: string;

  rules: Array<BodyguardRule>;
}

export interface AIImageConfig {
  async?: boolean;

  enabled?: boolean;

  ocr_rules?: Array<OCRRule>;

  rules?: Array<AWSRekognitionRule>;
}

export interface AIImageLabelDefinition {
  description: string;

  group: string;

  key: string;

  label: string;
}

export interface AITextConfig {
  async?: boolean;

  enabled?: boolean;

  profile?: string;

  rules?: Array<BodyguardRule>;

  severity_rules?: Array<BodyguardSeverityRule>;
}

export interface AIVideoConfig {
  async?: boolean;

  enabled?: boolean;

  rules?: Array<AWSRekognitionRule>;
}

export interface APIError {
  /**
   * API error code
   */
  code: number;

  /**
   * Request duration
   */
  duration: string;

  /**
   * Message describing an error
   */
  message: string;

  /**
   * URL with additional information
   */
  more_info: string;

  /**
   * Response HTTP status code
   */
  status_code: number;

  /**
   * Additional error-specific information
   */
  details: Array<number>;

  /**
   * Flag that indicates if the error is unrecoverable, requests that return unrecoverable errors should not be retried, this error only applies to the request that caused it
   */
  unrecoverable?: boolean;

  /**
   * Additional error info
   */
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

export interface APNSPayload {
  body?: string;

  content_available?: number;

  mutable_content?: number;

  sound?: string;

  title?: string;

  data?: Record<string, any>;
}

export interface AWSRekognitionRule {
  action:
    'flag' | 'shadow' | 'remove' | 'bounce' | 'bounce_flag' | 'bounce_remove';

  label: string;

  min_confidence: number;

  subclassifications?: Record<string, any>;
}

export interface AbsentMetric {
  metric: string;

  reason: string;
}

export interface AcceptFeedMemberInviteRequest {
  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AcceptFeedMemberInviteResponse {
  duration: string;

  member: FeedMemberResponse;
}

export interface AcceptFollowRequest {
  /**
   * Fully qualified ID of the source feed
   */
  source: string;

  /**
   * Fully qualified ID of the target feed
   */
  target: string;

  /**
   * Optional role for the follower in the follow relationship
   */
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

export interface ActionLogResponse {
  /**
   * Timestamp when the action was taken
   */
  created_at: Date;

  /**
   * Unique identifier of the action log
   */
  id: string;

  /**
   * Reason for the moderation action
   */
  reason: string;

  /**
   * Classification of who triggered the action (e.g. user, moderator, automod, api_integration)
   */
  reporter_type: string;

  /**
   * ID of the user who was the target of the action
   */
  target_user_id: string;

  /**
   * Type of moderation action
   */
  type: string;

  /**
   * ID of the user who performed the action
   */
  user_id: string;

  ai_providers: Array<string>;

  /**
   * Additional metadata about the action
   */
  custom: Record<string, any>;

  review_queue_item?: ReviewQueueItemResponse;

  /**
   * User response object
   */
  target_user?: UserResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ActionSequence {
  action?: string;

  blur?: boolean;

  cooldown_period?: number;

  threshold?: number;

  time_window?: number;

  warning?: boolean;

  warning_text?: string;
}

export interface ActiveCallsBitrateStats {
  p10: number;

  p50: number;
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

export interface ActiveCallsResolutionStats {
  p10: number;

  p50: number;
}

export interface ActiveCallsSummary {
  active_calls: number;

  active_publishers: number;

  active_subscribers: number;

  participants: number;
}

export interface ActivityAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.activity.added" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.activity.deleted" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityFeedbackEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  activity_feedback: ActivityFeedbackEventPayload;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.activity.feedback" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityFeedbackEventPayload {
  /**
   * The type of feedback action. One of: hide, show_more, show_less
   */

  action: 'hide' | 'show_more' | 'show_less';

  /**
   * The activity that received feedback
   */
  activity_id: string;

  /**
   * When the feedback was created
   */
  created_at: Date;

  /**
   * When the feedback was last updated
   */
  updated_at: Date;

  /**
   * The feedback value (true/false)
   */
  value: string;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface ActivityFeedbackRequest {
  /**
   * Whether to hide this activity
   */
  hide?: boolean;

  /**
   * Whether to show less content like this
   */
  show_less?: boolean;

  /**
   * Whether to show more content like this
   */
  show_more?: boolean;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface ActivityFeedbackResponse {
  /**
   * The ID of the activity that received feedback
   */
  activity_id: string;

  duration: string;
}

export interface ActivityFilterConfig {
  /**
   * When true, activities authored by the feed owner are excluded from feed reads
   */
  exclude_owner_activities?: boolean;
}

export interface ActivityMarkEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.activity.marked" in this case
   */
  type: string;

  feed_visibility?: string;

  /**
   * Whether all activities were marked as read
   */
  mark_all_read?: boolean;

  /**
   * Whether all activities were marked as seen
   */
  mark_all_seen?: boolean;

  received_at?: Date;

  /**
   * The IDs of activities marked as read
   */
  mark_read?: Array<string>;

  /**
   * The IDs of activities marked as seen
   */
  mark_seen?: Array<string>;

  /**
   * The IDs of activities marked as watched
   */
  mark_watched?: Array<string>;

  user?: UserResponseCommonFields;
}

export interface ActivityPinResponse {
  /**
   * When the pin was created
   */
  created_at: Date;

  /**
   * ID of the feed where activity is pinned
   */
  feed: string;

  /**
   * When the pin was last updated
   */
  updated_at: Date;

  activity: ActivityResponse;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface ActivityPinnedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the feed
   */
  fid: string;

  custom: Record<string, any>;

  pinned_activity: PinActivityResponse;

  /**
   * The type of event: "feeds.activity.pinned" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityProcessorConfig {
  /**
   * Type of activity processor (required)
   */
  type: string;

  /**
   * Minimum number of characters the activity text must have before this processor runs. 0 (the default) disables the check. Only applies to text_interest_tags.
   */
  min_text_length?: number;

  /**
   * Minimum number of words the activity text must have before this processor runs. 0 (the default) disables the check. Only applies to text_interest_tags.
   */
  min_word_count?: number;
}

export interface ActivityReactionAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  /**
   * The type of event: "feeds.activity.reaction.added" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityReactionDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  /**
   * The type of the reaction that was removed
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityReactionUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  /**
   * The type of event: "feeds.activity.reaction.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityRemovedFromFeedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.activity.removed_from_feed" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityRequest {
  /**
   * Type of activity
   */
  type: string;

  /**
   * List of feeds to add the activity to with a default max limit of 25 feeds
   */
  feeds: Array<string>;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when create_notification_activity is true) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * Whether to create notification activities for mentioned users
   */
  create_notification_activity?: boolean;

  /**
   * Expiration time for the activity
   */
  expires_at?: string;

  /**
   * Optional ID for the activity
   */
  id?: string;

  /**
   * ID of parent activity for replies/comments
   */
  parent_id?: string;

  /**
   * ID of a poll to attach to activity
   */
  poll_id?: string;

  /**
   * Controls who can add comments/replies to this activity. One of: everyone, people_i_follow, nobody
   */

  restrict_replies?: 'everyone' | 'people_i_follow' | 'nobody';

  /**
   * Whether to skip URL enrichment for the activity
   */
  skip_enrich_url?: boolean;

  /**
   * Whether to skip push notifications
   */
  skip_push?: boolean;

  /**
   * Text content of the activity
   */
  text?: string;

  /**
   * ID of the user creating the activity
   */
  user_id?: string;

  /**
   * Visibility setting for the activity. One of: public, private, tag
   */

  visibility?: 'public' | 'private' | 'tag';

  /**
   * If visibility is 'tag', this is the tag name and is required
   */
  visibility_tag?: string;

  /**
   * List of attachments for the activity
   */
  attachments?: Array<Attachment>;

  /**
   * Collections that this activity references
   */
  collection_refs?: Array<string>;

  /**
   * Collections to create or update as part of this request, so an activity and the collections it references can be written in one call. Their refs (name:id) are added to collection_refs automatically; you do not need to restate them, and they count toward the same per-activity collection-reference limit, which is the effective cap here. A collection that already exists has its custom data updated. Use collection_refs instead when the collection already exists and you are only referencing it, which requires no collection permissions.
   */
  collections?: Array<CollectionRequest>;

  /**
   * Tags for filtering activities
   */
  filter_tags?: Array<string>;

  /**
   * Tags for indicating user interests
   */
  interest_tags?: Array<string>;

  /**
   * List of users mentioned in the activity
   */
  mentioned_user_ids?: Array<string>;

  /**
   * Custom data for the activity
   */
  custom?: Record<string, any>;

  location?: Location;

  /**
   * Additional data for search indexing
   */
  search_data?: Record<string, any>;
}

export interface ActivityResponse {
  /**
   * Number of bookmarks on the activity
   */
  bookmark_count: number;

  /**
   * Number of comments on the activity
   */
  comment_count: number;

  /**
   * When the activity was created
   */
  created_at: Date;

  /**
   * If this activity is hidden by this user (using activity feedback)
   */
  hidden: boolean;

  /**
   * Unique identifier for the activity
   */
  id: string;

  /**
   * Popularity score of the activity
   */
  popularity: number;

  /**
   * If this activity is obfuscated for this user. For premium content where you want to show a preview
   */
  preview: boolean;

  /**
   * Number of reactions to the activity
   */
  reaction_count: number;

  /**
   * Controls who can add comments/replies to this activity. One of: everyone, people_i_follow, nobody
   */

  restrict_replies: 'everyone' | 'people_i_follow' | 'nobody';

  /**
   * Ranking score for this activity
   */
  score: number;

  /**
   * Number of times the activity was shared
   */
  share_count: number;

  /**
   * Type of activity
   */
  type: string;

  /**
   * When the activity was last updated
   */
  updated_at: Date;

  /**
   * Visibility setting for the activity. One of: public, private, tag
   */

  visibility: 'public' | 'private' | 'tag';

  /**
   * Media attachments for the activity
   */
  attachments: Array<Attachment>;

  /**
   * Latest 5 comments of this activity (comment replies excluded)
   */
  comments: Array<CommentResponse>;

  /**
   * List of feed IDs containing this activity
   */
  feeds: Array<string>;

  /**
   * Tags for filtering
   */
  filter_tags: Array<string>;

  /**
   * Tags for user interests
   */
  interest_tags: Array<string>;

  /**
   * Recent reactions to the activity
   */
  latest_reactions: Array<FeedsReactionResponse>;

  /**
   * Users mentioned in the activity
   */
  mentioned_users: Array<UserResponse>;

  /**
   * Current user's bookmarks for this activity
   */
  own_bookmarks: Array<BookmarkResponse>;

  /**
   * Current user's reactions to this activity
   */
  own_reactions: Array<FeedsReactionResponse>;

  /**
   * Enriched collection data referenced by this activity
   */
  collections: Record<string, EnrichedCollectionResponse>;

  /**
   * Custom data for the activity
   */
  custom: Record<string, any>;

  /**
   * Grouped reactions by type
   */
  reaction_groups: Record<string, FeedsReactionGroupResponse>;

  /**
   * Data for search indexing
   */
  search_data: Record<string, any>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * When the activity was deleted
   */
  deleted_at?: Date;

  /**
   * When the activity was last edited
   */
  edited_at?: Date;

  /**
   * When the activity will expire
   */
  expires_at?: Date;

  /**
   * Total count of reactions from friends on this activity
   */
  friend_reaction_count?: number;

  /**
   * Whether this activity has been read. Only set for feed groups with notification config (track_seen/track_read enabled).
   */
  is_read?: boolean;

  /**
   * Whether this activity has been seen. Only set for feed groups with notification config (track_seen/track_read enabled).
   */
  is_seen?: boolean;

  is_watched?: boolean;

  moderation_action?: string;

  /**
   * Which activity selector provided this activity (e.g., 'following', 'popular', 'interest'). Only set when using multiple activity selectors with ranking.
   */
  selector_source?: string;

  /**
   * Text content of the activity
   */
  text?: string;

  /**
   * If visibility is 'tag', this is the tag name
   */
  visibility_tag?: string;

  /**
   * Reactions from users the current user follows or has mutual follows with
   */
  friend_reactions?: Array<FeedsReactionResponse>;

  /**
   * Recent shares of the activity, one entry per share (org-gated)
   */
  latest_shares?: Array<ShareResponse>;

  current_feed?: FeedResponse;

  i18n?: Record<string, string>;

  location?: Location;

  metrics?: Record<string, number>;

  moderation?: ModerationV2Response;

  notification_context?: NotificationContext;

  parent?: ActivityResponse;

  poll?: PollResponseData;

  /**
   * Variable values used at ranking time. Only included when include_score_vars is enabled in enrichment options.
   */
  score_vars?: Record<string, any>;
}

export interface ActivityRestoredEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  /**
   * The type of the event
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivitySelectorConfig {
  /**
   * Type of selector. One of: popular, proximity, following, current_feed, query, interest, follow_suggestion
   */

  type:
    | 'popular'
    | 'proximity'
    | 'following'
    | 'current_feed'
    | 'query'
    | 'interest'
    | 'follow_suggestion';

  /**
   * Time threshold for activity selection (string). Expected RFC3339 format (e.g., 2006-01-02T15:04:05Z07:00). Cannot be used together with cutoff_window
   */
  cutoff_time?: string;

  /**
   * Flexible relative time window for activity selection (e.g., '1h', '3d', '1y'). Activities older than this duration will be filtered out. Cannot be used together with cutoff_time
   */
  cutoff_window?: string;

  /**
   * Minimum popularity threshold. For the 'popular' selector, omit to use the default (5); values below 1 are rejected
   */
  min_popularity?: number;

  /**
   * Sort parameters for activity selection
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter for activity selection
   */
  filter?: Record<string, any>;

  params?: Record<string, any>;
}

export interface ActivitySelectorConfigResponse {
  /**
   * Type of selector
   */

  type:
    | 'popular'
    | 'proximity'
    | 'following'
    | 'current_feed'
    | 'query'
    | 'interest'
    | 'follow_suggestion';

  /**
   * Time threshold for activity selection (timestamp)
   */
  cutoff_time?: Date;

  /**
   * Flexible relative time window for activity selection (e.g., '1h', '3d', '1y')
   */
  cutoff_window?: string;

  /**
   * Minimum popularity threshold. For the 'popular' selector, values below 1 are normalized to the default (5) at read time.
   */
  min_popularity?: number;

  /**
   * Sort parameters for activity selection
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter for activity selection
   */
  filter?: Record<string, any>;

  /**
   * Generic params for selector-specific configuration
   */
  params?: Record<string, any>;
}

export interface ActivityUnpinnedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the feed
   */
  fid: string;

  custom: Record<string, any>;

  pinned_activity: PinActivityResponse;

  /**
   * The type of event: "feeds.activity.unpinned" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  /**
   * The type of the event
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface AddActivityRequest {
  /**
   * Type of activity
   */
  type: string;

  /**
   * List of feeds to add the activity to with a default max limit of 25 feeds
   */
  feeds: Array<string>;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when create_notification_activity is true) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * Whether to create notification activities for mentioned users
   */
  create_notification_activity?: boolean;

  create_users?: boolean;

  enrich_own_fields?: boolean;

  /**
   * Expiration time for the activity
   */
  expires_at?: string;

  force_moderation?: boolean;

  /**
   * Optional ID for the activity
   */
  id?: string;

  /**
   * ID of parent activity for replies/comments
   */
  parent_id?: string;

  /**
   * ID of a poll to attach to activity
   */
  poll_id?: string;

  /**
   * Controls who can add comments/replies to this activity. One of: everyone, people_i_follow, nobody
   */

  restrict_replies?: 'everyone' | 'people_i_follow' | 'nobody';

  /**
   * Whether to skip URL enrichment for the activity
   */
  skip_enrich_url?: boolean;

  /**
   * Whether to skip push notifications
   */
  skip_push?: boolean;

  /**
   * Text content of the activity
   */
  text?: string;

  /**
   * ID of the user creating the activity
   */
  user_id?: string;

  /**
   * Visibility setting for the activity. One of: public, private, tag
   */

  visibility?: 'public' | 'private' | 'tag';

  /**
   * If visibility is 'tag', this is the tag name and is required
   */
  visibility_tag?: string;

  /**
   * List of attachments for the activity
   */
  attachments?: Array<Attachment>;

  /**
   * Collections that this activity references
   */
  collection_refs?: Array<string>;

  /**
   * Collections to create or update as part of this request, so an activity and the collections it references can be written in one call. Their refs (name:id) are added to collection_refs automatically; you do not need to restate them, and they count toward the same per-activity collection-reference limit, which is the effective cap here. A collection that already exists has its custom data updated. Use collection_refs instead when the collection already exists and you are only referencing it, which requires no collection permissions.
   */
  collections?: Array<CollectionRequest>;

  /**
   * Tags for filtering activities
   */
  filter_tags?: Array<string>;

  /**
   * Tags for indicating user interests
   */
  interest_tags?: Array<string>;

  /**
   * List of users mentioned in the activity
   */
  mentioned_user_ids?: Array<string>;

  /**
   * Custom data for the activity
   */
  custom?: Record<string, any>;

  location?: Location;

  /**
   * Additional data for search indexing
   */
  search_data?: Record<string, any>;
}

export interface AddActivityResponse {
  duration: string;

  activity: ActivityResponse;

  /**
   * Number of mention notification activities created for mentioned users
   */
  mention_notifications_created?: number;
}

export interface AddBookmarkRequest {
  /**
   * ID of the folder to add the bookmark to
   */
  folder_id?: string;

  user_id?: string;

  /**
   * Custom data for the bookmark
   */
  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AddBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface AddCommentBookmarkRequest {
  /**
   * ID of the folder to add the bookmark to
   */
  folder_id?: string;

  user_id?: string;

  /**
   * Custom data for the bookmark
   */
  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AddCommentBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface AddCommentReactionRequest {
  /**
   * The type of reaction, eg upvote, like, ...
   */
  type: string;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when create_notification_activity is true) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * Whether to create a notification activity for this reaction
   */
  create_notification_activity?: boolean;

  /**
   * Whether to enforce unique reactions per user (remove other reaction types from the user when adding this one)
   */
  enforce_unique?: boolean;

  skip_push?: boolean;

  user_id?: string;

  /**
   * Optional list of feeds to create a reference (share) activity of the commented-on activity in. The reference activity's type mirrors the reaction type.
   */
  target_feeds?: Array<string>;

  /**
   * Optional custom data to add to the reaction
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AddCommentReactionResponse {
  /**
   * Duration of the request
   */
  duration: string;

  comment: CommentResponse;

  reaction: FeedsReactionResponse;

  /**
   * Whether notification creation was accepted for asynchronous processing
   */
  notification_accepted?: boolean;

  /**
   * @deprecated
   * Deprecated. Mirrors notification_accepted; use notification_accepted for async enqueue status Deprecated: use notification_accepted
   */
  notification_created?: boolean;

  /**
   * ID of the async notification-creation task; poll GET /tasks/{id} for its status
   */
  notification_task_id?: string;

  reference_activity?: ActivityResponse;
}

export interface AddCommentRequest {
  /**
   * Text content of the comment
   */
  comment?: string;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when create_notification_activity is true) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * Whether to create a notification activity for this comment
   */
  create_notification_activity?: boolean;

  /**
   * If true, forces moderation to run for server-side requests. By default, server-side requests skip moderation. Client-side requests always run moderation regardless of this field.
   */
  force_moderation?: boolean;

  /**
   * Optional custom ID for the comment (max 255 characters). If not provided, a UUID will be generated.
   */
  id?: string;

  /**
   * ID of the object to comment on. Required for root comments
   */
  object_id?: string;

  /**
   * Type of the object to comment on. Required for root comments
   */
  object_type?: string;

  /**
   * ID of parent comment for replies. When provided, object_id and object_type are automatically inherited from the parent comment.
   */
  parent_id?: string;

  /**
   * Whether to skip URL enrichment for this comment
   */
  skip_enrich_url?: boolean;

  skip_push?: boolean;

  user_id?: string;

  /**
   * Media attachments for the reply
   */
  attachments?: Array<Attachment>;

  /**
   * List of users mentioned in the reply
   */
  mentioned_user_ids?: Array<string>;

  /**
   * Custom data for the comment
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AddCommentResponse {
  duration: string;

  comment: CommentResponse;

  /**
   * Number of mention notification activities created for mentioned users
   */
  mention_notifications_created?: number;

  /**
   * Whether a notification activity was successfully created
   */
  notification_created?: boolean;
}

export interface AddCommentsBatchRequest {
  /**
   * List of comments to add
   */
  comments: Array<AddCommentRequest>;
}

export interface AddCommentsBatchResponse {
  duration: string;

  /**
   * List of comments added
   */
  comments: Array<CommentResponse>;
}

export interface AddFolderRequest {
  /**
   * Name of the folder
   */
  name: string;

  /**
   * Custom data for the folder
   */
  custom?: Record<string, any>;
}

export interface AddReactionRequest {
  /**
   * Type of reaction
   */
  type: string;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when create_notification_activity is true) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * Whether to create a notification activity for this reaction
   */
  create_notification_activity?: boolean;

  /**
   * Server-side only. If true, auto-creates the reacting user identified by user_id when they don't already exist. Default: false.
   */
  create_users?: boolean;

  /**
   * Whether to enforce unique reactions per user (remove other reaction types from the user when adding this one)
   */
  enforce_unique?: boolean;

  skip_push?: boolean;

  user_id?: string;

  /**
   * Optional list of feeds to create a reference (share) activity of the original activity in. The reference activity's type mirrors the reaction type.
   */
  target_feeds?: Array<string>;

  /**
   * Custom data for the reaction
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AddReactionResponse {
  duration: string;

  activity: ActivityResponse;

  reaction: FeedsReactionResponse;

  /**
   * Whether notification creation was accepted for asynchronous processing
   */
  notification_accepted?: boolean;

  /**
   * @deprecated
   * Deprecated. Mirrors notification_accepted; use notification_accepted for async enqueue status Deprecated: use notification_accepted
   */
  notification_created?: boolean;

  /**
   * ID of the async notification-creation task; poll GET /tasks/{id} for its status
   */
  notification_task_id?: string;

  reference_activity?: ActivityResponse;
}

export interface AddSegmentTargetsRequest {
  /**
   * Target IDs
   */
  target_ids: Array<string>;
}

export interface AddUserGroupMembersRequest {
  /**
   * List of user IDs to add as members
   */
  member_ids: Array<string>;

  /**
   * Whether to add the members as group admins. Defaults to false
   */
  as_admin?: boolean;

  team_id?: string;
}

export interface AddUserGroupMembersResponse {
  duration: string;

  user_group?: UserGroupResponse;
}

export interface AggregatedActivityResponse {
  /**
   * Number of activities in this aggregation
   */
  activity_count: number;

  /**
   * When the aggregation was created
   */
  created_at: Date;

  /**
   * Grouping identifier
   */
  group: string;

  /**
   * Ranking score for this aggregation
   */
  score: number;

  /**
   * When the aggregation was last updated
   */
  updated_at: Date;

  /**
   * Number of unique users in this aggregation
   */
  user_count: number;

  /**
   * Whether this activity group has been truncated due to exceeding the group size limit
   */
  user_count_truncated: boolean;

  /**
   * List of activities in this aggregation
   */
  activities: Array<ActivityResponse>;

  /**
   * Whether this aggregated group has been read. Only set for feed groups with notification config (track_seen/track_read enabled).
   */
  is_read?: boolean;

  /**
   * Whether this aggregated group has been seen. Only set for feed groups with notification config (track_seen/track_read enabled).
   */
  is_seen?: boolean;

  is_watched?: boolean;
}

export interface AggregationConfig {
  /**
   * Order of member activities inside each aggregated group for non-stories feeds: created_at_desc (newest first, default) or created_at_asc (oldest first). Stories feeds ignore this and always use oldest first.
   */

  activities_sort?: 'created_at_asc' | 'created_at_desc';

  /**
   * Format for activity aggregation
   */
  format?: string;

  /**
   * Strategy for computing aggregated group scores from member activity scores when ranking is enabled. Valid values: sum, max, avg
   */

  score_strategy?: 'sum' | 'max' | 'avg';
}

export interface AnalyzeImageField {
  /**
   * Per-image action: keep | flag | remove.
   */
  action?: string;

  /**
   * Highest confidence (0–1) across detected classifications + sub-classifications. Convenience aggregate over the nested values in `classifications`.
   */
  confidence?: number;

  /**
   * Set when moderation couldn't be determined for this image — action is absent.
   */
  error?: string;

  /**
   * Echo of `content_ids[label]` when supplied on the request; omitted otherwise.
   */
  id?: string;

  /**
   * Hierarchical list of L1 (parent) classifications. Each entry: `name`, `confidence` (0–1), and nested `subclassifications` (L2 leaves with their own confidence). Resolved against the app's effective taxonomy (custom taxonomy when configured, otherwise the standard Bodyguard catalogue).
   */
  classifications?: Array<Classification>;

  /**
   * Flat list of Bodyguard OCR text-moderation labels on the image's extracted text (e.g. VULGARITY, PII). Each entry: `name` + `severity`. Populated when BG's OCR pipeline returned non-empty results for this image.
   */
  ocr_classifications?: Array<Classification>;
}

export interface AnalyzeRequest {
  /**
   * When true, the response carries no verdicts (status `pending`) and per-modality results arrive via `moderation.text_analysis.complete` and `moderation.image_analysis.complete` webhooks. Image moderation runs on a background worker; text moderation runs synchronously and is then delivered via webhook.
   */
  async_response?: boolean;

  /**
   * Moderation policy key. Optional in stateful mode, required in stateless mode.
   */
  config_key?: string;

  /**
   * Original timestamp when the content was produced. Used as the `published_at` timestamp on per-content log entries that surface in `matched_contents` on aggregation-rule webhooks.
   */
  content_published_at?: Date;

  /**
   * ID of the user who created the content. Required with entity_type + entity_id; omit all three for stateless mode.
   */
  entity_creator_id?: string;

  /**
   * Caller-supplied content identifier. Required with entity_type + entity_creator_id; omit all three for stateless mode.
   */
  entity_id?: string;

  /**
   * Caller-defined entity type. Required with entity_id + entity_creator_id; omit all three for stateless mode.
   */
  entity_type?: string;

  user_id?: string;

  /**
   * Optional map from a content label (either a `texts` key or an `image:<key>` multipart label) to a caller-supplied per-instance identifier. Echoed on per-field verdicts and surfaced in `matched_contents` when an aggregation rule fires.
   */
  content_ids?: Record<string, string>;

  /**
   * Arbitrary metadata surfaced in the dashboard.
   */
  custom?: Record<string, any>;

  /**
   * Named text fields to moderate, keyed by caller label (e.g. title, description).
   */
  texts?: Record<string, string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AnalyzeResponse {
  duration: string;

  /**
   * Always `complete` — /analyze is sync-only and the full verdict is in the response.
   */
  status: string;

  /**
   * Per-image moderation verdicts keyed by caller label.
   */
  images?: Record<string, AnalyzeImageField>;

  /**
   * Per-text-field moderation verdicts keyed by caller label.
   */
  texts?: Record<string, AnalyzeTextField>;
}

export interface AnalyzeTextField {
  /**
   * Per-field action: keep | flag | remove.
   */
  action?: string;

  /**
   * Set when moderation couldn't be determined for this field — action is absent.
   */
  error?: string;

  /**
   * Echo of `content_ids[label]` when supplied on the request; omitted otherwise.
   */
  id?: string;

  /**
   * Detected language code.
   */
  language?: string;

  /**
   * Aggregate severity across the field: LOW | MEDIUM | HIGH | CRITICAL.
   */
  severity?: string;

  /**
   * Flat list of detected Bodyguard text labels (e.g. INSULT, VULGARITY). Each entry carries `name` and `severity`.
   */
  classifications?: Array<Classification>;
}

export interface AppResponseFields {
  allow_multi_user_devices: boolean;

  async_url_enrich_enabled: boolean;

  auto_translation_enabled: boolean;

  campaign_enabled: boolean;

  cdn_expiration_seconds: number;

  custom_action_handler_url: string;

  disable_auth_checks: boolean;

  disable_permissions_checks: boolean;

  enforce_unique_usernames: string;

  feed_audit_logs_enabled: boolean;

  guest_user_creation_disabled: boolean;

  id: number;

  image_moderation_enabled: boolean;

  max_aggregated_activities_length: number;

  member_custom_on_messages_enabled: boolean;

  moderation_audio_call_moderation_enabled: boolean;

  moderation_enabled: boolean;

  moderation_llm_configurability_enabled: boolean;

  moderation_multitenant_blocklist_enabled: boolean;

  moderation_video_call_moderation_enabled: boolean;

  moderation_webhook_url: string;

  multi_tenant_enabled: boolean;

  name: string;

  organization: string;

  permission_version: string;

  placement: string;

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

  user_response_time_enabled: boolean;

  webhook_url: string;

  event_hooks: Array<EventHook>;

  user_search_disallowed_roles: Array<string>;

  webhook_events: Array<string>;

  call_types: Record<string, CallType>;

  channel_configs: Record<string, ChannelConfig>;

  file_upload_config: FileUploadConfig;

  grants: Record<string, Array<string>>;

  image_upload_config: FileUploadConfig;

  policies: Record<string, Array<Policy>>;

  push_notifications: PushNotificationFields;

  before_message_send_hook_attempt_timeout_ms?: number;

  before_message_send_hook_url?: string;

  chat_primary_use_case?: string;

  moderation_onboarding_complete?: boolean;

  moderation_s3_image_access_role_arn?: string;

  revoke_tokens_issued_before?: Date;

  video_primary_use_case?: string;

  allowed_flag_reasons?: Array<string>;

  geofences?: Array<GeofenceResponse>;

  image_moderation_labels?: Array<string>;

  activity_metrics_config?: Record<string, number>;

  datadog_info?: DataDogInfo;

  moderation_dashboard_preferences?: ModerationDashboardPreferences;
}

export interface AppealAcceptedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  appeal?: AppealItemResponse;
}

export interface AppealCreatedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  appeal?: AppealItemResponse;
}

export interface AppealItemResponse {
  /**
   * Reason Text of the Appeal Item
   */
  appeal_reason: string;

  /**
   * When the flag was created
   */
  created_at: Date;

  /**
   * ID of the entity
   */
  entity_id: string;

  /**
   * Type of entity
   */
  entity_type: string;

  id: string;

  /**
   * Status of the Appeal Item
   */
  status: string;

  /**
   * When the flag was last updated
   */
  updated_at: Date;

  /**
   * Text severity level assigned by the AI provider
   */
  ai_text_severity?: string;

  /**
   * CID of the channel the entity belongs to, if applicable
   */
  channel_cid?: string;

  /**
   * Moderation policy key that was applied
   */
  config_key?: string;

  /**
   * Decision Reason of the Appeal Item
   */
  decision_reason?: string;

  /**
   * Action recommended by the automated moderation system (e.g. flag, remove, shadow)
   */
  recommended_action?: string;

  /**
   * ID of the review queue item linked to this appeal, if the appeal was submitted with one
   */
  review_queue_item_id?: string;

  /**
   * Overall content severity score (1–100)
   */
  severity?: number;

  /**
   * Full chronological history of all moderation actions on the review queue item
   */
  actions?: Array<ActionLogResponse>;

  /**
   * Attachments(e.g. Images) of the Appeal Item
   */
  attachments?: Array<string>;

  /**
   * Classification labels from automated and manual review
   */
  flag_labels?: Array<string>;

  /**
   * Types of flags applied to the entity (e.g. user_report, bodyguard)
   */
  flag_types?: Array<string>;

  /**
   * Per-provider flag records explaining why the action was taken
   */
  flags?: Array<ModerationFlagResponse>;

  entity_content?: ModerationPayload;

  moderation_action?: ActionLogResponse;

  original_moderation_action?: ActionLogResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface AppealRejectedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  appeal?: AppealItemResponse;
}

export interface AppealRequest {
  /**
   * Explanation for why the content is being appealed
   */
  appeal_reason: string;

  /**
   * Unique identifier of the entity being appealed
   */
  entity_id: string;

  /**
   * Type of entity being appealed (e.g., message, user)
   */
  entity_type: string;

  /**
   * ID of the review queue item (flagged message) that triggered the ban. Applicable only for user ban appeals.
   */
  review_queue_item_id?: string;

  user_id?: string;

  /**
   * Array of Attachment URLs(e.g., images)
   */
  attachments?: Array<string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface AppealResponse {
  /**
   * Unique identifier of the created Appeal item
   */
  appeal_id: string;

  duration: string;
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

export interface AsyncExportReviewQueueEvent {
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

  /**
   * Attachment type (e.g. image, video, url)
   */
  type?: string;

  actions?: Array<Action>;

  fields?: Array<Field>;

  giphy?: Images;
}

export interface Audience {
  avg_concurrent_viewers: number;

  hours_watched: number;

  peak_concurrent_viewers: number;

  unique_viewers: number;

  viewer_connections: number;

  concurrency_by_minute: Array<ConcurrencyMinute>;

  peak_at?: string;

  ramp_up_min_to_90pct_peak?: number;

  retention_at_90pct_mark?: number;

  retention_at_midpoint?: number;

  shape?: string;
}

export interface AudioSettings {
  access_request_enabled: boolean;

  default_device: 'speaker' | 'earpiece';

  hifi_audio_enabled: boolean;

  mic_default_on: boolean;

  opus_dtx_enabled: boolean;

  redundant_coding_enabled: boolean;

  speaker_default_on: boolean;

  noise_cancellation?: NoiseCancellationSettings;
}

export interface AudioSettingsRequest {
  default_device: 'speaker' | 'earpiece';

  access_request_enabled?: boolean;

  hifi_audio_enabled?: boolean;

  mic_default_on?: boolean;

  opus_dtx_enabled?: boolean;

  redundant_coding_enabled?: boolean;

  speaker_default_on?: boolean;

  noise_cancellation?: NoiseCancellationSettings;
}

export interface AudioSettingsResponse {
  access_request_enabled: boolean;

  default_device: 'speaker' | 'earpiece';

  hifi_audio_enabled: boolean;

  mic_default_on: boolean;

  opus_dtx_enabled: boolean;

  redundant_coding_enabled: boolean;

  speaker_default_on: boolean;

  noise_cancellation?: NoiseCancellationSettings;
}

export interface AutomodDetailsResponse {
  action?: string;

  original_message_type?: string;

  image_labels?: Array<string>;

  message_details?: FlagMessageDetailsResponse;

  /**
   * Result of the message moderation
   */
  result?: MessageModerationResult;
}

export interface AutomodPlatformCircumventionConfig {
  async?: boolean;

  enabled?: boolean;

  rules?: Array<AutomodRule>;
}

export interface AutomodRule {
  action:
    'flag' | 'shadow' | 'remove' | 'bounce' | 'bounce_flag' | 'bounce_remove';

  label: string;

  threshold: number;
}

export interface AutomodSemanticFiltersConfig {
  async?: boolean;

  enabled?: boolean;

  rules?: Array<AutomodSemanticFiltersRule>;
}

export interface AutomodSemanticFiltersRule {
  action:
    'flag' | 'shadow' | 'remove' | 'bounce' | 'bounce_flag' | 'bounce_remove';

  name: string;

  threshold: number;
}

export interface AutomodToxicityConfig {
  async?: boolean;

  enabled?: boolean;

  rules?: Array<AutomodRule>;
}

export interface AzureRequest {
  /**
   * The account name
   */
  abs_account_name: string;

  /**
   * The client id
   */
  abs_client_id: string;

  /**
   * The client secret
   */
  abs_client_secret: string;

  /**
   * The tenant id
   */
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

export interface BanActionRequestPayload {
  /**
   * Also ban user from all channels this moderator creates in the future
   */
  ban_from_future_channels?: boolean;

  /**
   * Ban only from specific channel
   */
  channel_ban_only?: boolean;

  channel_cid?: string;

  /**
   * Message deletion mode: soft, pruning, or hard
   */

  delete_messages?: 'soft' | 'pruning' | 'hard';

  /**
   * Whether to ban by IP address
   */
  ip_ban?: boolean;

  /**
   * Reason for the ban
   */
  reason?: string;

  /**
   * Whether this is a shadow ban
   */
  shadow?: boolean;

  /**
   * Optional: ban user directly without review item
   */
  target_user_id?: string;

  /**
   * Duration of ban in minutes
   */
  timeout?: number;
}

export interface BanInfoResponse {
  /**
   * When the ban was created
   */
  created_at: Date;

  /**
   * The channel this ban applies to. Empty if this is an app-wide (global) ban rather than a per-channel ban.
   */
  channel_cid?: string;

  /**
   * When the ban expires
   */
  expires?: Date;

  /**
   * Reason for the ban
   */
  reason?: string;

  /**
   * Whether this is a shadow ban
   */
  shadow?: boolean;

  channel?: ChannelMetadata;

  /**
   * User response object
   */
  created_by?: UserResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface BanOptions {
  delete_messages?: 'soft' | 'pruning' | 'hard';

  duration?: number;

  ip_ban?: boolean;

  reason?: string;

  shadow_ban?: boolean;
}

export interface BanRequest {
  /**
   * ID of the user to ban
   */
  target_user_id: string;

  /**
   * ID of the user performing the ban
   */
  banned_by_id?: string;

  /**
   * Channel where the ban applies
   */
  channel_cid?: string;

  delete_messages?: 'soft' | 'pruning' | 'hard';

  /**
   * Whether to ban the user's IP address
   */
  ip_ban?: boolean;

  /**
   * Optional explanation for the ban
   */
  reason?: string;

  /**
   * Whether this is a shadow ban
   */
  shadow?: boolean;

  /**
   * Duration of the ban in minutes
   */
  timeout?: number;

  /**
   * User request object
   */
  banned_by?: UserRequest;
}

export interface BanResponse {
  created_at: Date;

  expires?: Date;

  reason?: string;

  shadow?: boolean;

  /**
   * User response object
   */
  banned_by?: UserResponse;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface BatchQueryActivityReactionsRequest {
  /**
   * Activity IDs to fetch the user's reactions for (max 100)
   */
  activity_ids: Array<string>;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Server-side only. The user whose reactions to fetch; defaults to the authenticated user for client-side requests
   */
  user_id?: string;

  sort?: Array<SortParamRequest>;

  /**
   * Optional filter on reaction_type or created_at
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface BatchQueryActivityReactionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  reactions: Array<FeedsReactionResponse>;

  next?: string;

  prev?: string;
}

export interface BatchQueryCommentReactionsRequest {
  /**
   * Comment IDs to fetch the user's reactions for (max 100)
   */
  comment_ids: Array<string>;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Server-side only. The user whose reactions to fetch; defaults to the authenticated user for client-side requests
   */
  user_id?: string;

  sort?: Array<SortParamRequest>;

  /**
   * Optional filter on reaction_type or created_at
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface BatchQueryCommentReactionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  reactions: Array<FeedsReactionResponse>;

  next?: string;

  prev?: string;
}

export interface BlockActionRequestPayload {
  /**
   * Reason for blocking
   */
  reason?: string;
}

export interface BlockListConfig {
  async?: boolean;

  enabled?: boolean;

  match_substring?: boolean;

  rules?: Array<BlockListRule>;
}

export interface BlockListOptions {
  /**
   * Blocklist behavior. One of: flag, block, shadow_block
   */

  behavior: 'flag' | 'block' | 'shadow_block';

  /**
   * Blocklist name
   */
  blocklist: string;
}

export interface BlockListResponse {
  is_confusable_folding_enabled: boolean;

  is_leet_check_enabled: boolean;

  is_plural_check_enabled: boolean;

  is_substring_matching_enabled: boolean;

  /**
   * Block list name
   */
  name: string;

  /**
   * Block list type. One of: regex, domain, domain_allowlist, email, email_allowlist, word
   */
  type: string;

  /**
   * List of words to block
   */
  words: Array<string>;

  /**
   * Date/time of creation
   */
  created_at?: Date;

  id?: string;

  owner_user_id?: string;

  team?: string;

  /**
   * Date/time of the last update
   */
  updated_at?: Date;
}

export interface BlockListRule {
  action:
    | 'flag'
    | 'mask'
    | 'mask_flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  name?: string;

  team?: string;
}

export interface BlockUserRequest {
  /**
   * the user to block
   */
  user_id: string;
}

export interface BlockUserResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface BlockUsersRequest {
  /**
   * User id to block
   */
  blocked_user_id: string;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface BlockUsersResponse {
  /**
   * User id who blocked another user
   */
  blocked_by_user_id: string;

  /**
   * User id who got blocked
   */
  blocked_user_id: string;

  /**
   * Timestamp when the user was blocked
   */
  created_at: Date;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface BlockedUserEvent {
  call_cid: string;

  created_at: Date;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.blocked_user" in this case
   */
  type: string;

  /**
   * User response object
   */
  blocked_by_user?: UserResponse;
}

export interface BlockedUserResponse {
  /**
   * ID of the user who got blocked
   */
  blocked_user_id: string;

  created_at: Date;

  /**
   * ID of the user who blocked another user
   */
  user_id: string;

  /**
   * User response object
   */
  blocked_user: UserResponse;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface BodyguardImageAnalysisConfig {
  rules?: Array<BodyguardRule>;
}

export interface BodyguardProfileSummary {
  name: string;

  display_name?: string;

  text_type?: string;
}

export interface BodyguardRule {
  label: string;

  action?:
    | 'keep'
    | 'flag'
    | 'mask'
    | 'mask_flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  severity_rules?: Array<BodyguardSeverityRule>;
}

export interface BodyguardSeverityRule {
  action:
    | 'keep'
    | 'flag'
    | 'mask'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove';

  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface BookmarkAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  bookmark: BookmarkResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.bookmark.added" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  bookmark: BookmarkResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.bookmark.deleted" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkFolderDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  bookmark_folder: BookmarkFolderResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.bookmark_folder.deleted" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkFolderResponse {
  /**
   * When the folder was created
   */
  created_at: Date;

  /**
   * Unique identifier for the folder
   */
  id: string;

  /**
   * Name of the folder
   */
  name: string;

  /**
   * When the folder was last updated
   */
  updated_at: Date;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * Custom data for the folder
   */
  custom?: Record<string, any>;
}

export interface BookmarkFolderUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  bookmark_folder: BookmarkFolderResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.bookmark_folder.updated" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkResponse {
  /**
   * When the bookmark was created
   */
  created_at: Date;

  /**
   * ID of the bookmarked object
   */
  object_id: string;

  /**
   * Type of the bookmarked object (activity or comment)
   */
  object_type: string;

  /**
   * When the bookmark was last updated
   */
  updated_at: Date;

  activity: ActivityResponse;

  /**
   * User response object
   */
  user: UserResponse;

  activity_id?: string;

  comment?: CommentResponse;

  /**
   * Custom data for the bookmark
   */
  custom?: Record<string, any>;

  folder?: BookmarkFolderResponse;
}

export interface BookmarkUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  bookmark: BookmarkResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.bookmark.updated" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface Bound {
  inclusive: boolean;

  value: number;
}

export interface BroadcastDailyRollup {
  broadcasts: number;

  day: string;

  dead_air_s: number;

  hours_watched: number;

  incident_windows: number;

  max_peak_concurrent_viewers: number;

  note: string;

  schema_version: string;

  source_drops: number;

  unique_viewers_sum: number;

  top_broadcasts: Array<TopBroadcast>;

  poor_viewers_by_cause: PoorByCause;
}

export interface BroadcastDigest {
  schema_version: string;

  audience: Audience;

  broadcast: BroadcastInfo;

  coverage: Coverage;

  joins: Joins;

  poor_tail: PoorTail;

  quality: Quality;

  segments: Segments;

  source: SourceHealth;

  viewers: ViewerBehavior;
}

export interface BroadcastInfo {
  app_id: number;

  call_cid: string;

  call_session_id: string;

  call_type: string;

  duration_min: number;

  ended_at: string;

  started_at: string;

  creators: Array<string>;

  source_mode?: string;
}

export interface BroadcastSegment {
  key: string;

  sessions: number;

  avg_quality_score?: number;

  p5_quality_score?: number;

  poor_pct?: number;

  share_pct?: number;

  watch_share_pct?: number;
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

  /**
   * HLSSettings is the payload for HLS settings
   */
  hls: HLSSettingsResponse;

  /**
   * RTMPSettingsResponse is the payload for RTMP settings
   */
  rtmp: RTMPSettingsResponse;
}

export interface BrowserDataResponse {
  name?: string;

  version?: string;
}

export interface BulkActionAppealsRequest {
  /**
   * Action to apply: unban, restore, unblock, mark_reviewed, or reject_appeal
   */

  action_type:
    'unban' | 'restore' | 'unblock' | 'mark_reviewed' | 'reject_appeal';

  /**
   * List of appeal UUIDs to process
   */
  appeal_ids: Array<string>;

  user_id?: string;

  /**
   * Configuration for mark reviewed action
   */
  mark_reviewed?: MarkReviewedRequestPayload;

  /**
   * Configuration for rejecting an appeal
   */
  reject_appeal?: RejectAppealRequestPayload;

  /**
   * Configuration for restore action. State-aware: reverses whichever of a delete, a block, or a shadow block currently applies to the content (including both a delete and a block/shadow block at once).
   */
  restore?: RestoreActionRequestPayload;

  /**
   * Configuration for unban moderation action
   */
  unban?: UnbanActionRequestPayload;

  /**
   * Deprecated: use restore instead — it now also reverses a block or shadow block. Configuration for unblock action.
   */
  unblock?: UnblockActionRequestPayload;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface BulkActionAppealsResponse {
  duration: string;

  /**
   * Appeals that could not be processed, with per-item error messages
   */
  errors: Array<BulkAppealError>;

  /**
   * Successfully processed appeals
   */
  results: Array<BulkAppealResult>;
}

export interface BulkAppealError {
  appeal_id: string;

  error: string;
}

export interface BulkAppealResult {
  appeal_id: string;

  appeal_item?: AppealItemResponse;
}

export interface BulkDeleteActionConfigRequest {
  /**
   * UUIDs of the action configs to delete
   */
  ids: Array<string>;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface BulkDeleteActionConfigResponse {
  /**
   * Number of action configs deleted
   */
  deleted: number;

  duration: string;
}

export interface BulkImageModerationRequest {
  /**
   * URL to CSV file containing image URLs to moderate
   */
  csv_file: string;
}

export interface BulkImageModerationResponse {
  duration: string;

  /**
   * ID of the task for processing the bulk image moderation
   */
  task_id: string;
}

export interface BulkUpsertActionConfigRequest {
  /**
   * List of action configs to create or update
   */
  action_configs: Array<UpsertActionConfigItem>;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface BulkUpsertActionConfigResponse {
  duration: string;

  /**
   * The created or updated action configs in the same order as the request
   */
  action_configs: Array<ModerationActionConfigResponse>;
}

export interface BypassActionRequest {
  enabled?: boolean;
}

export interface BypassRequest {
  /**
   * Whether to enable moderation bypass for this user
   */
  enabled: boolean;

  /**
   * ID of the user to update
   */
  target_user_id: string;
}

export interface BypassResponse {
  duration: string;
}

export interface CallAcceptedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.accepted" in this case
   */
  type: string;
}

export interface CallActionOptions {
  duration?: number;

  flag_reason?: string;

  kick_reason?: string;

  mute_audio?: boolean;

  mute_video?: boolean;

  reason?: string;

  warning_text?: string;
}

export interface CallClosedCaption {
  end_time: Date;

  id: string;

  language: string;

  speaker_id: string;

  start_time: Date;

  text: string;

  translated: boolean;

  /**
   * User response object
   */
  user: UserResponse;

  service?: string;
}

export interface CallClosedCaptionsFailedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The type of event: "call.closed_captions_failed" in this case
   */
  type: string;
}

export interface CallClosedCaptionsStartedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The type of event: "call.closed_captions_started" in this case
   */
  type: string;
}

export interface CallClosedCaptionsStoppedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The type of event: "call.transcription_stopped" in this case
   */
  type: string;
}

export interface CallCreatedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * the members added to this call
   */
  members: Array<MemberResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.created" in this case
   */
  type: string;
}

export interface CallCustomPropertyParameters {
  operator?: string;

  property_key?: string;
}

export interface CallDTMFEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The DTMF digit (0-9, *, #, A-D)
   */
  digit: string;

  /**
   * Duration of the digit press in milliseconds
   */
  duration_ms: number;

  /**
   * Monotonically increasing sequence number for ordering DTMF events within a session
   */
  seq_number: number;

  /**
   * When the digit press ended and was detected
   */
  timestamp: Date;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.dtmf" in this case
   */
  type: string;
}

export interface CallDeletedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.deleted" in this case
   */
  type: string;
}

export interface CallDurationReport {
  histogram: Array<ReportByHistogramBucket>;
}

export interface CallDurationReportResponse {
  daily: Array<DailyAggregateCallDurationReportResponse>;
}

export interface CallEndedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.ended" in this case
   */
  type: string;

  /**
   * The reason why the call ended, if available
   */
  reason?: string;

  /**
   * The list of members in the call
   */
  members?: Array<MemberResponse>;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface CallFrameRecordingFailedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.frame_recording_failed" in this case
   */
  type: string;
}

export interface CallFrameRecordingFrameReadyEvent {
  call_cid: string;

  /**
   * The time the frame was captured
   */
  captured_at: Date;

  created_at: Date;

  egress_id: string;

  /**
   * Call session ID
   */
  session_id: string;

  /**
   * The type of the track frame was captured from (TRACK_TYPE_VIDEO|TRACK_TYPE_SCREEN_SHARE)
   */
  track_type: string;

  /**
   * The URL of the frame
   */
  url: string;

  /**
   * The users in the frame
   */
  users: Record<string, UserResponse>;

  /**
   * The type of event: "call.frame_recording_ready" in this case
   */
  type: string;
}

export interface CallFrameRecordingStartedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.frame_recording_started" in this case
   */
  type: string;
}

export interface CallFrameRecordingStoppedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.frame_recording_stopped" in this case
   */
  type: string;
}

export interface CallHLSBroadcastingFailedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The type of event: "call.hls_broadcasting_failed" in this case
   */
  type: string;
}

export interface CallHLSBroadcastingStartedEvent {
  call_cid: string;

  created_at: Date;

  hls_playlist_url: string;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.hls_broadcasting_started" in this case
   */
  type: string;
}

export interface CallHLSBroadcastingStoppedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The type of event: "call.hls_broadcasting_stopped" in this case
   */
  type: string;
}

export interface CallIngressResponse {
  /**
   * RTMP input settings
   */
  rtmp: RTMPIngress;

  srt: SRTIngress;

  whip: WHIPIngress;
}

export interface CallLevelEventPayload {
  event_type: string;

  timestamp: number;

  user_id: string;

  payload?: Record<string, any>;
}

export interface CallLiveStartedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.live_started" in this case
   */
  type: string;
}

export interface CallMemberAddedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * the members added to this call
   */
  members: Array<MemberResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.member_added" in this case
   */
  type: string;
}

export interface CallMemberRemovedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * the list of member IDs removed from the call
   */
  members: Array<string>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.member_removed" in this case
   */
  type: string;
}

export interface CallMemberUpdatedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The list of members that were updated
   */
  members: Array<MemberResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.member_updated" in this case
   */
  type: string;
}

export interface CallMemberUpdatedPermissionEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The list of members that were updated
   */
  members: Array<MemberResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The capabilities by role for this call
   */
  capabilities_by_role: Record<string, Array<string>>;

  /**
   * The type of event: "call.member_added" in this case
   */
  type: string;
}

export interface CallMissedEvent {
  call_cid: string;

  created_at: Date;

  notify_user: boolean;

  /**
   * Call session ID
   */
  session_id: string;

  /**
   * List of members who missed the call
   */
  members: Array<MemberResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.notification" in this case
   */
  type: string;
}

export interface CallModerationBlurEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The user ID whose video stream is being blurred
   */
  user_id: string;

  /**
   * Custom data associated with the moderation action
   */
  custom: Record<string, any>;

  /**
   * The type of event: "call.moderation_blur" in this case
   */
  type: string;
}

export interface CallModerationWarningEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The warning message
   */
  message: string;

  /**
   * The user ID who is receiving the warning
   */
  user_id: string;

  /**
   * Custom data associated with the moderation action
   */
  custom: Record<string, any>;

  /**
   * The type of event: "call.moderation_warning" in this case
   */
  type: string;
}

export interface CallNotificationEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Call session ID
   */
  session_id: string;

  /**
   * Call members
   */
  members: Array<MemberResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.notification" in this case
   */
  type: string;
}

export interface CallParticipantCountReport {
  histogram: Array<ReportByHistogramBucket>;
}

export interface CallParticipantCountReportResponse {
  daily: Array<DailyAggregateCallParticipantCountReportResponse>;
}

export interface CallParticipantResponse {
  joined_at: Date;

  role: string;

  user_session_id: string;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface CallParticipantTimeline {
  severity: string;

  timestamp: Date;

  type: string;

  data: Record<string, any>;
}

export interface CallReactionEvent {
  call_cid: string;

  created_at: Date;

  reaction: VideoReactionResponse;

  /**
   * The type of event: "call.reaction_new" in this case
   */
  type: string;
}

export interface CallRecording {
  end_time: Date;

  filename: string;

  recording_type: string;

  session_id: string;

  start_time: Date;

  url: string;
}

export interface CallRecordingFailedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * The type of recording
   */

  recording_type: 'composite' | 'individual' | 'raw';

  /**
   * The type of event: "call.recording_failed" in this case
   */
  type: string;
}

export interface CallRecordingReadyEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * The type of recording
   */

  recording_type: 'composite' | 'individual' | 'raw';

  /**
   * CallRecording represents a recording of a call.
   */
  call_recording: CallRecording;

  /**
   * The type of event: "call.recording_ready" in this case
   */
  type: string;
}

export interface CallRecordingStartedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * The type of recording
   */

  recording_type: 'composite' | 'individual' | 'raw';

  /**
   * The type of event: "call.recording_started" in this case
   */
  type: string;
}

export interface CallRecordingStoppedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * The type of recording
   */

  recording_type: 'composite' | 'individual' | 'raw';

  /**
   * The type of event: "call.recording_stopped" in this case
   */
  type: string;
}

export interface CallRejectedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.rejected" in this case
   */
  type: string;

  /**
   * Provides information about why the call was rejected. You can provide any value, but the Stream API and SDKs use these default values: rejected, cancel, timeout and busy
   */
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

  members?: Array<MemberRequest>;

  /**
   * User request object
   */
  created_by?: UserRequest;

  custom?: Record<string, any>;

  settings_override?: CallSettingsRequest;
}

export interface CallResponse {
  backstage: boolean;

  captioning: boolean;

  /**
   * The unique identifier for a call (<type>:<id>)
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  current_session_id: string;

  /**
   * Call ID
   */
  id: string;

  recording: boolean;

  transcribing: boolean;

  translating: boolean;

  /**
   * The type of call
   */
  type: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  blocked_user_ids: Array<string>;

  /**
   * User response object
   */
  created_by: UserResponse;

  /**
   * Custom data for this object
   */
  custom: Record<string, any>;

  egress: EgressResponse;

  /**
   * CallIngressResponse is the payload for ingress settings
   */
  ingress: CallIngressResponse;

  settings: CallSettingsResponse;

  channel_cid?: string;

  /**
   * Date/time when the call ended
   */
  ended_at?: Date;

  join_ahead_time_seconds?: number;

  /**
   * 10-digit routing number for SIP routing
   */
  routing_number?: string;

  /**
   * Date/time when the call will start
   */
  starts_at?: Date;

  team?: string;

  session?: CallSessionResponse;

  thumbnails?: ThumbnailResponse;
}

export interface CallRingEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Call session ID
   */
  session_id: string;

  video: boolean;

  /**
   * Call members
   */
  members: Array<MemberResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.notification" in this case
   */
  type: string;
}

export interface CallRtmpBroadcastFailedEvent {
  /**
   * The unique identifier for a call (<type>:<id>)
   */
  call_cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Name of the given RTMP broadcast
   */
  name: string;

  /**
   * The type of event: "call.rtmp_broadcast_failed" in this case
   */
  type: string;
}

export interface CallRtmpBroadcastStartedEvent {
  /**
   * The unique identifier for a call (<type>:<id>)
   */
  call_cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Name of the given RTMP broadcast
   */
  name: string;

  /**
   * The type of event: "call.rtmp_broadcast_started" in this case
   */
  type: string;
}

export interface CallRtmpBroadcastStoppedEvent {
  /**
   * The unique identifier for a call (<type>:<id>)
   */
  call_cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Name of the given RTMP broadcast
   */
  name: string;

  /**
   * The type of event: "call.rtmp_broadcast_stopped" in this case
   */
  type: string;
}

export interface CallRuleActionSequence {
  violation_number?: number;

  actions?: Array<string>;

  call_options?: CallActionOptions;
}

export interface CallSessionEndedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Call session ID
   */
  session_id: string;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.session_ended" in this case
   */
  type: string;
}

export interface CallSessionParticipantCountsUpdatedEvent {
  anonymous_participant_count: number;

  call_cid: string;

  created_at: Date;

  /**
   * Call session ID
   */
  session_id: string;

  participants_count_by_role: Record<string, number>;

  /**
   * The type of event: "call.session_participant_count_updated" in this case
   */
  type: string;
}

export interface CallSessionParticipantJoinedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Call session ID
   */
  session_id: string;

  participant: CallParticipantResponse;

  /**
   * The type of event: "call.session_participant_joined" in this case
   */
  type: string;
}

export interface CallSessionParticipantLeftEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The duration participant was in the session in seconds
   */
  duration_seconds: number;

  /**
   * Call session ID
   */
  session_id: string;

  participant: CallParticipantResponse;

  /**
   * The type of event: "call.session_participant_left" in this case
   */
  type: string;

  /**
   * The reason why the participant left the session
   */
  reason?: string;
}

export interface CallSessionResponse {
  anonymous_participant_count: number;

  id: string;

  participants: Array<CallParticipantResponse>;

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

  /**
   * Call session ID
   */
  session_id: string;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The type of event: "call.session_started" in this case
   */
  type: string;
}

export interface CallSettings {
  audio?: AudioSettings;

  backstage?: BackstageSettings;

  broadcasting?: BroadcastSettings;

  frame_recording?: FrameRecordSettings;

  geofencing?: GeofenceSettings;

  individual_recording?: IndividualRecordSettings;

  ingress?: IngressSettings;

  limits?: LimitsSettings;

  raw_recording?: RawRecordSettings;

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

  encryption?: EncryptionSettingsRequest;

  frame_recording?: FrameRecordingSettingsRequest;

  geofencing?: GeofenceSettingsRequest;

  individual_recording?: IndividualRecordingSettingsRequest;

  ingress?: IngressSettingsRequest;

  limits?: LimitsSettingsRequest;

  raw_recording?: RawRecordingSettingsRequest;

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

  /**
   * BroadcastSettingsResponse is the payload for broadcasting settings
   */
  broadcasting: BroadcastSettingsResponse;

  /**
   * EncryptionSettings is the payload for end-to-end encryption settings
   */
  encryption: EncryptionSettingsResponse;

  frame_recording: FrameRecordingSettingsResponse;

  geofencing: GeofenceSettingsResponse;

  individual_recording: IndividualRecordingSettingsResponse;

  limits: LimitsSettingsResponse;

  raw_recording: RawRecordingSettingsResponse;

  /**
   * RecordSettings is the payload for recording settings
   */
  recording: RecordSettingsResponse;

  ring: RingSettingsResponse;

  screensharing: ScreensharingSettingsResponse;

  session: SessionSettingsResponse;

  thumbnails: ThumbnailsSettingsResponse;

  transcription: TranscriptionSettingsResponse;

  video: VideoSettingsResponse;

  ingress?: IngressSettingsResponse;
}

export interface CallStateResponseFields {
  /**
   * List of call members
   */
  members: Array<MemberResponse>;

  own_capabilities: Array<OwnCapability>;

  /**
   * Represents a call
   */
  call: CallResponse;
}

export interface CallStatsLocation {
  accuracy_radius_meters?: number;

  city?: string;

  continent?: string;

  country?: string;

  country_iso_code?: string;

  latitude?: number;

  longitude?: number;

  subdivision?: string;
}

export interface CallStatsMapLocation {
  count: number;

  live_count: number;

  location?: CallStatsLocation;
}

export interface CallStatsMapPublisher {
  is_live: boolean;

  user_id: string;

  user_session_id: string;

  published_tracks: PublishedTrackFlags;

  name?: string;

  publisher_type?: string;

  location?: CallStatsLocation;
}

export interface CallStatsMapPublishers {
  publishers: Array<CallStatsMapPublisher>;
}

export interface CallStatsMapSFUs {
  locations: Array<SFULocationResponse>;
}

export interface CallStatsMapSubscriber {
  is_live: boolean;

  user_id: string;

  user_session_id: string;

  name?: string;

  location?: CallStatsLocation;
}

export interface CallStatsMapSubscribers {
  locations: Array<CallStatsMapLocation>;

  participants?: Array<CallStatsMapSubscriber>;
}

export interface CallStatsParticipant {
  user_id: string;

  sessions: Array<CallStatsParticipantSession>;

  latest_activity_at?: Date;

  name?: string;

  roles?: Array<string>;
}

export interface CallStatsParticipantCounts {
  live_sessions: number;

  participants: number;

  peak_concurrent_sessions: number;

  peak_concurrent_users: number;

  publishers: number;

  sessions: number;

  sfus_used: number;

  average_jitter_ms?: number;

  average_latency_ms?: number;

  avg_user_rating?: number;

  call_event_count?: number;

  cq_score?: number;

  max_freezes_duration_ms?: number;

  min_user_rating?: number;

  total_participant_duration?: number;
}

export interface CallStatsParticipantSession {
  is_live: boolean;

  user_session_id: string;

  published_tracks: PublishedTrackFlags;

  browser?: string;

  browser_version?: string;

  cq_score?: number;

  current_ip?: string;

  current_sfu?: string;

  distance_to_sfu_kilometers?: number;

  ended_at?: Date;

  freezes_duration_ms?: number;

  ingress?: string;

  jitter_ms?: number;

  latency_ms?: number;

  os?: string;

  publisher_type?: string;

  sdk?: string;

  sdk_version?: string;

  started_at?: Date;

  unified_session_id?: string;

  webrtc_version?: string;

  location?: CallStatsLocation;
}

export interface CallStatsReportReadyEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Call session ID
   */
  session_id: string;

  counts: CallStatsParticipantCounts;

  /**
   * The type of event, "call.report_ready" in this case
   */
  type: string;

  /**
   * Whether participants_overview is truncated by the server-side limit
   */
  is_trimmed?: boolean;

  /**
   * Top participant sessions overview
   */
  participants_overview?: Array<CallStatsParticipant>;
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

export interface CallStatsSessionResponse {
  call_id: string;

  call_session_id: string;

  call_type: string;

  generated_at: Date;

  counts: CallStatsParticipantCounts;

  call_ended_at?: Date;

  call_started_at?: Date;
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

  /**
   * The type of event: "call.transcription_failed" in this case
   */
  type: string;

  /**
   * The error message detailing why transcription failed.
   */
  error?: string;
}

export interface CallTranscriptionReadyEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * CallTranscription represents a transcription of a call.
   */
  call_transcription: CallTranscription;

  /**
   * The type of event: "call.transcription_ready" in this case
   */
  type: string;
}

export interface CallTranscriptionStartedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * The type of event: "call.transcription_started" in this case
   */
  type: string;
}

export interface CallTranscriptionStoppedEvent {
  call_cid: string;

  created_at: Date;

  egress_id: string;

  /**
   * The type of event: "call.transcription_stopped" in this case
   */
  type: string;
}

export interface CallType {
  app: number;

  created_at: Date;

  id: number;

  name: string;

  recording_external_storage: string;

  updated_at: Date;

  notification_settings?: NotificationSettings;

  settings?: CallSettings;
}

export interface CallTypeResponse {
  /**
   * the time the call type was created
   */
  created_at: Date;

  /**
   * the name of the call type
   */
  name: string;

  /**
   * the time the call type was last updated
   */
  updated_at: Date;

  /**
   * the permissions granted to each role
   */
  grants: Record<string, Array<string>>;

  notification_settings: NotificationSettingsResponse;

  settings: CallSettingsResponse;

  /**
   * the external storage for the call type
   */
  external_storage?: string;
}

export interface CallTypeRuleParameters {
  call_type?: string;
}

export interface CallUpdatedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Represents a call
   */
  call: CallResponse;

  /**
   * The capabilities by role for this call
   */
  capabilities_by_role: Record<string, Array<string>>;

  /**
   * The type of event: "call.updated" in this case
   */
  type: string;
}

export interface CallUserFeedbackSubmittedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The rating given by the user (1-5)
   */
  rating: number;

  /**
   * Call session ID
   */
  session_id: string;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event, "call.user_feedback" in this case
   */
  type: string;

  /**
   * The reason provided by the user for the rating
   */
  reason?: string;

  sdk?: string;

  sdk_version?: string;

  /**
   * Custom data provided by the user
   */
  custom?: Record<string, any>;
}

export interface CallUserMutedEvent {
  call_cid: string;

  created_at: Date;

  from_user_id: string;

  reason: string;

  muted_user_ids: Array<string>;

  /**
   * The type of event: "call.user_muted" in this case
   */
  type: string;
}

export interface CallViolationCountParameters {
  threshold?: number;

  time_window?: string;
}

export interface CallsPerDayReport {
  count: number;
}

export interface CallsPerDayReportResponse {
  daily: Array<DailyAggregateCallsPerDayReportResponse>;
}

export interface CampaignChannelMember {
  user_id: string;

  channel_role?: string;

  custom?: Record<string, any>;
}

export interface CampaignChannelTemplate {
  type: string;

  id?: string;

  team?: string;

  members?: Array<string>;

  members_template?: Array<CampaignChannelMember>;

  custom?: Record<string, any>;
}

export interface CampaignCompletedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  campaign?: CampaignResponse;
}

export interface CampaignMessageTemplate {
  text: string;

  poll_id?: string;

  searchable?: boolean;

  attachments?: Array<Attachment>;

  custom?: Record<string, any>;
}

export interface CampaignResponse {
  create_channels: boolean;

  created_at: Date;

  description: string;

  id: string;

  name: string;

  sender_id: string;

  sender_mode: string;

  sender_visibility: string;

  show_channels: boolean;

  skip_push: boolean;

  skip_webhook: boolean;

  status: string;

  updated_at: Date;

  segment_ids: Array<string>;

  segments: Array<Segment>;

  user_ids: Array<string>;

  users: Array<UserResponse>;

  stats: CampaignStatsResponse;

  scheduled_for?: Date;

  stop_at?: Date;

  channel_template?: CampaignChannelTemplate;

  message_template?: CampaignMessageTemplate;

  /**
   * User response object
   */
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

export interface CancelImportV2TaskRequest {}

export interface CancelImportV2TaskResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface CastPollVoteRequest {
  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;

  vote?: VoteData;
}

export interface ChangeFeedVisibilityRequest {
  /**
   * Feed visibility level: public, visible, followers, members, or private
   */

  visibility: 'public' | 'visible' | 'followers' | 'members' | 'private';

  /**
   * What to do with existing pending follows when loosening visibility from 'followers': auto_approve (default) or reject
   */

  pending_follows_action?: 'auto_approve' | 'reject';
}

export interface ChangeFeedVisibilityResponse {
  duration: string;

  feed: FeedResponse;
}

export interface ChannelBatchCompletedEvent {
  batch_created_at: Date;

  created_at: Date;

  finished_at: Date;

  operation: string;

  status: string;

  success_channels_count: number;

  task_id: string;

  failed_channels: Array<FailedChannelUpdates>;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface ChannelBatchMemberRequest {
  user_id: string;

  channel_role?: string;
}

export interface ChannelBatchStartedEvent {
  batch_created_at: Date;

  created_at: Date;

  finished_at: Date;

  operation: string;

  status: string;

  success_channels_count: number;

  task_id: string;

  failed_channels: Array<FailedChannelUpdates>;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface ChannelBatchUpdateRequest {
  operation:
    | 'addMembers'
    | 'removeMembers'
    | 'inviteMembers'
    | 'invites'
    | 'assignRoles'
    | 'addModerators'
    | 'demoteModerators'
    | 'hide'
    | 'show'
    | 'archive'
    | 'unarchive'
    | 'updateData';

  /**
   * Filter to apply to the query
   */
  filter: Record<string, any>;

  members?: Array<ChannelBatchMemberRequest>;

  data?: ChannelDataUpdate;
}

export interface ChannelBatchUpdateResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  task_id?: string;
}

export interface ChannelConfig {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  connect_events: boolean;

  count_messages: boolean;

  created_at: Date;

  custom_events: boolean;

  delivery_events: boolean;

  mark_messages_pending: boolean;

  max_message_length: number;

  message_retention: string;

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

  /**
   * List of commands that channel supports
   */
  commands: Array<string>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  allowed_flag_reasons?: Array<string>;

  blocklists?: Array<BlockListOptions>;

  /**
   * Sets thresholds for AI moderation
   */
  automod_thresholds?: Thresholds;

  chat_preferences?: ChatPreferences;
}

export interface ChannelConfigOverrides {
  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block';

  /**
   * Enable/disable message counting
   */
  count_messages?: boolean;

  /**
   * Overrides max message length
   */
  max_message_length?: number;

  /**
   * Overrides the push notification level for this channel
   */

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  /**
   * Enables message quotes
   */
  quotes?: boolean;

  /**
   * Enables or disables reactions
   */
  reactions?: boolean;

  /**
   * Enables message replies (threads)
   */
  replies?: boolean;

  /**
   * Enable/disable shared locations
   */
  shared_locations?: boolean;

  /**
   * Enables or disables typing events
   */
  typing_events?: boolean;

  /**
   * Enables or disables file uploads
   */
  uploads?: boolean;

  /**
   * Enables or disables URL enrichment
   */
  url_enrichment?: boolean;

  /**
   * Enable/disable user message reminders
   */
  user_message_reminders?: boolean;

  /**
   * List of commands that channel supports
   */
  commands?: Array<string>;

  chat_preferences?: ChatPreferences;

  grants?: Record<string, Array<string>>;
}

export interface ChannelConfigWithInfo {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  connect_events: boolean;

  count_messages: boolean;

  created_at: Date;

  custom_events: boolean;

  delivery_events: boolean;

  mark_messages_pending: boolean;

  max_message_length: number;

  message_retention: string;

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

  commands: Array<Command>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  allowed_flag_reasons?: Array<string>;

  blocklists?: Array<BlockListOptions>;

  /**
   * Sets thresholds for AI moderation
   */
  automod_thresholds?: Thresholds;

  chat_preferences?: ChatPreferences;

  grants?: Record<string, Array<string>>;
}

export interface ChannelContextResponse {
  /**
   * Channel CID (<type>:<id>)
   */
  cid: string;

  /**
   * Channel ID
   */
  id: string;

  /**
   * Channel type
   */
  type: string;

  /**
   * User response object
   */
  created_by?: UserResponse;
}

export interface ChannelCreatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.created" in this case
   */
  type: string;

  /**
   * The ID of the channel which was created
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel which was created
   */
  channel_type?: string;

  /**
   * The CID of the channel which was created
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
}

export interface ChannelDataUpdate {
  auto_translation_enabled?: boolean;

  auto_translation_language?: string;

  disabled?: boolean;

  frozen?: boolean;

  team?: string;

  /**
   * Channel configuration overrides
   */
  config_overrides?: ChannelConfigOverrides;

  custom?: Record<string, any>;
}

export interface ChannelDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.deleted" in this case
   */
  type: string;

  /**
   * The ID of the channel which was deleted
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel which was deleted
   */
  channel_type?: string;

  /**
   * The CID of the channel which was deleted
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
}

export interface ChannelExport {
  cid?: string;

  /**
   * Channel ID
   */
  id?: string;

  /**
   * Date to export messages since
   */
  messages_since?: Date;

  /**
   * Date to export messages until
   */
  messages_until?: Date;

  /**
   * Channel type
   */
  type?: string;
}

export interface ChannelFrozenEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.frozen" in this case
   */
  type: string;

  /**
   * The ID of the channel which was frozen
   */
  channel_id?: string;

  /**
   * The type of the channel which was frozen
   */
  channel_type?: string;

  /**
   * The CID of the channel which was frozen
   */
  cid?: string;

  received_at?: Date;
}

export interface ChannelGetOrCreateRequest {
  /**
   * Whether this channel will be hidden for the user who created the channel or not
   */
  hide_for_creator?: boolean;

  /**
   * Refresh channel state
   */
  state?: boolean;

  thread_unread_counts?: boolean;

  /**
   * Top-level keys of the message sender's channel-member custom data to include under member.custom (max 8 keys, 64 chars each)
   */
  member_custom_include?: Array<string>;

  data?: ChannelInput;

  members?: PaginationParams;

  messages?: MessagePaginationParams;

  watchers?: PaginationParams;
}

export interface ChannelHiddenEvent {
  /**
   * Whether the history was cleared
   */
  clear_history: boolean;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.hidden" in this case
   */
  type: string;

  /**
   * The ID of the channel which was hidden
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel which was hidden
   */
  channel_type?: string;

  /**
   * The CID of the channel which was hidden
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
}

export interface ChannelInput {
  /**
   * Enable or disable auto translation
   */
  auto_translation_enabled?: boolean;

  /**
   * Language (or comma-separated list of languages) to translate to when auto translation is active
   */
  auto_translation_language?: string;

  created_by_id?: string;

  disabled?: boolean;

  /**
   * Freeze or unfreeze the channel
   */
  frozen?: boolean;

  /**
   * Team the channel belongs to (if multi-tenant mode is enabled)
   */
  team?: string;

  truncated_by_id?: string;

  filter_tags?: Array<string>;

  invites?: Array<ChannelMemberRequest>;

  members?: Array<ChannelMemberRequest>;

  /**
   * Channel configuration overrides
   */
  config_overrides?: ChannelConfigOverrides;

  /**
   * User request object
   */
  created_by?: UserRequest;

  custom?: Record<string, any>;
}

export interface ChannelInputRequest {
  auto_translation_enabled?: boolean;

  auto_translation_language?: string;

  disabled?: boolean;

  frozen?: boolean;

  team?: string;

  invites?: Array<ChannelMemberRequest>;

  members?: Array<ChannelMemberRequest>;

  /**
   * Channel configuration overrides
   */
  config_overrides?: ConfigOverridesRequest;

  /**
   * User request object
   */
  created_by?: UserRequest;

  custom?: Record<string, any>;
}

export interface ChannelMemberPartialResponse {
  /**
   * Role of the member in the channel
   */
  channel_role: string;

  /**
   * Whether the user muted notifications for this channel
   */
  notifications_muted: boolean;

  /**
   * Channel-member custom fields projected via `member_custom_include`
   */
  custom?: Record<string, any>;
}

export interface ChannelMemberRequest {
  user_id: string;

  /**
   * Role of the member in the channel
   */
  channel_role?: string;

  custom?: Record<string, any>;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ChannelMemberResponse {
  /**
   * Whether member is banned this channel or not
   */
  banned: boolean;

  /**
   * Role of the member in the channel
   */
  channel_role: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  notifications_muted: boolean;

  /**
   * Whether member is shadow banned in this channel or not
   */
  shadow_banned: boolean;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  custom: Record<string, any>;

  archived_at?: Date;

  /**
   * Expiration date of the ban
   */
  ban_expires?: Date;

  /**
   * Whether the member's ban also applies to channels the channel's creator will create in the future (an active future channel ban by the creator targets this member)
   */
  ban_from_future_channels?: boolean;

  deleted_at?: Date;

  /**
   * Expiration date of the future channel ban; absent when the future channel ban is permanent
   */
  future_channel_ban_expires?: Date;

  /**
   * Date when invite was accepted
   */
  invite_accepted_at?: Date;

  /**
   * Date when invite was rejected
   */
  invite_rejected_at?: Date;

  /**
   * Whether member was invited or not
   */
  invited?: boolean;

  /**
   * Whether member is channel moderator or not
   */
  is_moderator?: boolean;

  pinned_at?: Date;

  /**
   * Permission level of the member in the channel (DEPRECATED: use channel_role instead). One of: member, moderator, admin, owner
   */
  role?: string;

  status?: string;

  user_id?: string;

  deleted_messages?: Array<string>;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ChannelMessageCountRuleParameters {
  operator?: string;

  threshold?: number;
}

export interface ChannelMessagesResponse {
  /**
   * List of messages
   */
  messages: Array<MessageResponse>;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;
}

export interface ChannelMetadata {
  cid: string;

  id: string;

  type: string;

  custom: Record<string, any>;

  last_message_at?: Date;

  member_count?: number;

  message_count?: number;

  push_level?: string;

  team?: string;
}

export interface ChannelMute {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * Date/time of mute expiration
   */
  expires?: Date;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ChannelMutedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.muted" in this case
   */
  type: string;

  received_at?: Date;

  /**
   * The mute objects
   */
  mutes?: Array<ChannelMute>;

  mute?: ChannelMute;

  user?: UserResponseCommonFields;
}

export const ChannelOwnCapability = {
  BAN_CHANNEL_MEMBERS: 'ban-channel-members',
  CAST_POLL_VOTE: 'cast-poll-vote',
  CONNECT_EVENTS: 'connect-events',
  CREATE_ATTACHMENT: 'create-attachment',
  CREATE_MENTION: 'create-mention',
  DELETE_ANY_MESSAGE: 'delete-any-message',
  DELETE_CHANNEL: 'delete-channel',
  DELETE_OWN_MESSAGE: 'delete-own-message',
  DELIVERY_EVENTS: 'delivery-events',
  FLAG_MESSAGE: 'flag-message',
  FREEZE_CHANNEL: 'freeze-channel',
  JOIN_CHANNEL: 'join-channel',
  LEAVE_CHANNEL: 'leave-channel',
  MUTE_CHANNEL: 'mute-channel',
  NOTIFY_CHANNEL: 'notify-channel',
  NOTIFY_GROUP: 'notify-group',
  NOTIFY_HERE: 'notify-here',
  NOTIFY_ROLE: 'notify-role',
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

export type ChannelOwnCapability =
  (typeof ChannelOwnCapability)[keyof typeof ChannelOwnCapability];

export interface ChannelPushPreferencesResponse {
  chat_level?: string;

  disabled_until?: Date;

  chat_preferences?: ChatPreferencesResponse;
}

export interface ChannelResponse {
  /**
   * Channel CID (<type>:<id>)
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  disabled: boolean;

  /**
   * Whether channel is frozen or not
   */
  frozen: boolean;

  /**
   * Channel unique ID
   */
  id: string;

  /**
   * Type of the channel
   */
  type: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * Custom data for this object
   */
  custom: Record<string, any>;

  /**
   * Whether auto translation is enabled or not
   */
  auto_translation_enabled?: boolean;

  /**
   * Language (or comma-separated list of languages) to translate to when auto translation is active
   */
  auto_translation_language?: string;

  /**
   * Whether this channel is blocked by current user or not
   */
  blocked?: boolean;

  /**
   * Cooldown period after sending each message
   */
  cooldown?: number;

  /**
   * Date/time of deletion
   */
  deleted_at?: Date;

  /**
   * Whether this channel is hidden by current user or not
   */
  hidden?: boolean;

  /**
   * Date since when the message history is accessible
   */
  hide_messages_before?: Date;

  /**
   * Date of the last message sent
   */
  last_message_at?: Date;

  /**
   * Number of members in the channel
   */
  member_count?: number;

  /**
   * Number of messages in the channel
   */
  message_count?: number;

  /**
   * Date of mute expiration
   */
  mute_expires_at?: Date;

  /**
   * Whether this channel is muted or not
   */
  muted?: boolean;

  /**
   * Team the channel belongs to (multi-tenant only)
   */
  team?: string;

  /**
   * Date of the latest truncation of the channel
   */
  truncated_at?: Date;

  /**
   * List of filter tags associated with the channel
   */
  filter_tags?: Array<string>;

  /**
   * List of channel members (max 100)
   */
  members?: Array<ChannelMemberResponse>;

  /**
   * List of channel capabilities of authenticated user
   */
  own_capabilities?: Array<ChannelOwnCapability>;

  config?: ChannelConfigWithInfo;

  /**
   * User response object
   */
  created_by?: UserResponse;

  /**
   * User response object
   */
  truncated_by?: UserResponse;
}

export interface ChannelStateResponse {
  duration: string;

  members: Array<ChannelMemberResponse>;

  messages: Array<MessageResponse>;

  pinned_messages: Array<MessageResponse>;

  threads: Array<ThreadStateResponse>;

  hidden?: boolean;

  hide_messages_before?: Date;

  watcher_count?: number;

  active_live_locations?: Array<SharedLocationResponseData>;

  pending_messages?: Array<PendingMessageResponse>;

  read?: Array<ReadStateResponse>;

  watchers?: Array<UserResponse>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  draft?: DraftResponse;

  membership?: ChannelMemberResponse;

  push_preferences?: ChannelPushPreferencesResponse;
}

export interface ChannelStateResponseFields {
  /**
   * List of channel members
   */
  members: Array<ChannelMemberResponse>;

  /**
   * List of channel messages
   */
  messages: Array<MessageResponse>;

  /**
   * List of pinned messages in the channel
   */
  pinned_messages: Array<MessageResponse>;

  threads: Array<ThreadStateResponse>;

  /**
   * Whether this channel is hidden or not
   */
  hidden?: boolean;

  /**
   * Messages before this date are hidden from the user
   */
  hide_messages_before?: Date;

  /**
   * Number of channel watchers
   */
  watcher_count?: number;

  /**
   * Active live locations in the channel
   */
  active_live_locations?: Array<SharedLocationResponseData>;

  /**
   * Pending messages that this user has sent
   */
  pending_messages?: Array<PendingMessageResponse>;

  /**
   * List of read states
   */
  read?: Array<ReadStateResponse>;

  /**
   * List of user who is watching the channel
   */
  watchers?: Array<UserResponse>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  draft?: DraftResponse;

  membership?: ChannelMemberResponse;

  push_preferences?: ChannelPushPreferencesResponse;
}

export interface ChannelTruncatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.truncated" in this case
   */
  type: string;

  /**
   * The ID of the channel which was truncated
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel which was truncated
   */
  channel_type?: string;

  /**
   * The CID of the channel which was truncated
   */
  cid?: string;

  message_id?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  user?: UserResponseCommonFields;
}

export interface ChannelTypeConfig {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  connect_events: boolean;

  count_messages: boolean;

  created_at: Date;

  custom_events: boolean;

  delivery_events: boolean;

  mark_messages_pending: boolean;

  max_message_length: number;

  message_retention: string;

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

  commands: Array<Command>;

  permissions: Array<PolicyRequest>;

  grants: Record<string, Array<string>>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  allowed_flag_reasons?: Array<string>;

  blocklists?: Array<BlockListOptions>;

  /**
   * Sets thresholds for AI moderation
   */
  automod_thresholds?: Thresholds;

  chat_preferences?: ChatPreferences;
}

export interface ChannelUnFrozenEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.unfrozen" in this case
   */
  type: string;

  /**
   * The ID of the channel which was unfrozen
   */
  channel_id?: string;

  /**
   * The type of the channel which was unfrozen
   */
  channel_type?: string;

  /**
   * The CID of the channel which was unfrozen
   */
  cid?: string;

  received_at?: Date;
}

export interface ChannelUnmutedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.unmuted" in this case
   */
  type: string;

  received_at?: Date;

  /**
   * The mute objects
   */
  mutes?: Array<ChannelMute>;

  mute?: ChannelMute;

  user?: UserResponseCommonFields;
}

export interface ChannelUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.updated" in this case
   */
  type: string;

  /**
   * The ID of the channel which was updated
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel which was updated
   */
  channel_type?: string;

  /**
   * The CID of the channel which was updated
   */
  cid?: string;

  message_id?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  user?: UserResponseCommonFields;
}

export interface ChannelVisibleEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "channel.visible" in this case
   */
  type: string;

  /**
   * The ID of the channel which was shown
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel which was shown
   */
  channel_type?: string;

  /**
   * The CID of the channel which was shown
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
}

export interface ChatActivityStatsResponse {
  messages?: MessageStatsResponse;
}

export interface ChatDraftPayloadResponse {
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

  attachments?: Array<Attachment>;

  mentioned_users?: Array<UserResponse>;
}

export interface ChatDraftResponse {
  channel_cid: string;

  created_at: Date;

  message: ChatDraftPayloadResponse;

  parent_id?: string;

  parent_message?: ChatMessageResponse;

  quoted_message?: ChatMessageResponse;
}

export interface ChatMessageResponse {
  cid: string;

  created_at: Date;

  deleted_reply_count: number;

  html: string;

  id: string;

  mentioned_channel: boolean;

  mentioned_here: boolean;

  pinned: boolean;

  reply_count: number;

  shadowed: boolean;

  silent: boolean;

  text: string;

  type: string;

  updated_at: Date;

  attachments: Array<Attachment>;

  latest_reactions: Array<ChatReactionResponse>;

  mentioned_users: Array<UserResponse>;

  own_reactions: Array<ChatReactionResponse>;

  restricted_visibility: Array<string>;

  custom: Record<string, any>;

  reaction_counts: Record<string, number>;

  reaction_scores: Record<string, number>;

  /**
   * User response object
   */
  user: UserResponse;

  command?: string;

  deleted_at?: Date;

  deleted_for_me?: boolean;

  message_text_updated_at?: Date;

  mml?: string;

  parent_id?: string;

  pin_expires?: Date;

  pinned_at?: Date;

  poll_id?: string;

  quoted_message_id?: string;

  show_in_channel?: boolean;

  mentioned_group_ids?: Array<string>;

  mentioned_groups?: Array<UserGroupResponse>;

  mentioned_roles?: Array<string>;

  thread_participants?: Array<UserResponse>;

  draft?: ChatDraftResponse;

  i18n?: Record<string, string>;

  image_labels?: Record<string, Array<string>>;

  member?: ChannelMemberPartialResponse;

  moderation?: ChatModerationV2Response;

  /**
   * User response object
   */
  pinned_by?: UserResponse;

  poll?: PollResponseData;

  quoted_message?: ChatMessageResponse;

  reaction_groups?: Record<string, ChatReactionGroupResponse>;

  reminder?: ChatReminderResponseData;

  shared_location?: ChatSharedLocationResponseData;
}

export interface ChatModerationV2Response {
  action: string;

  original_text: string;

  blocklist_matched?: string;

  platform_circumvented?: boolean;

  semantic_filter_matched?: string;

  blocklists_matched?: Array<string>;

  image_harms?: Array<string>;

  text_harms?: Array<string>;
}

export interface ChatPreferences {
  channel_mentions?: string;

  default_preference?: string;

  direct_mentions?: string;

  distinct_channel_messages?: string;

  group_mentions?: string;

  here_mentions?: string;

  role_mentions?: string;

  thread_replies?: string;
}

export interface ChatPreferencesInput {
  channel_mentions?: 'all' | 'none';

  default_preference?: 'all' | 'none';

  direct_mentions?: 'all' | 'none';

  group_mentions?: 'all' | 'none';

  here_mentions?: 'all' | 'none';

  role_mentions?: 'all' | 'none';

  thread_replies?: 'all' | 'none';
}

export interface ChatPreferencesResponse {
  channel_mentions?: string;

  default_preference?: string;

  direct_mentions?: string;

  group_mentions?: string;

  here_mentions?: string;

  role_mentions?: string;

  thread_replies?: string;
}

export interface ChatReactionGroupResponse {
  count: number;

  first_reaction_at: Date;

  last_reaction_at: Date;

  sum_scores: number;

  latest_reactions_by: Array<ChatReactionGroupUserResponse>;
}

export interface ChatReactionGroupUserResponse {
  created_at: Date;

  user_id: string;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ChatReactionResponse {
  created_at: Date;

  message_id: string;

  score: number;

  type: string;

  updated_at: Date;

  user_id: string;

  custom: Record<string, any>;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface ChatReminderResponseData {
  channel_cid: string;

  created_at: Date;

  message_id: string;

  updated_at: Date;

  user_id: string;

  remind_at?: Date;

  message?: ChatMessageResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ChatSharedLocationResponseData {
  channel_cid: string;

  created_at: Date;

  created_by_device_id: string;

  latitude: number;

  longitude: number;

  message_id: string;

  updated_at: Date;

  user_id: string;

  end_at?: Date;

  message?: ChatMessageResponse;
}

export interface CheckExternalStorageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  file_url: string;
}

export interface CheckPushRequest {
  /**
   * Push message template for APN
   */
  apn_template?: string;

  /**
   * Type of event for push templates (default: message.new). One of: message.new, message.updated, reaction.new, reaction.updated, notification.reminder_due
   */

  event_type?:
    | 'message.new'
    | 'message.updated'
    | 'reaction.new'
    | 'reaction.updated'
    | 'notification.reminder_due';

  /**
   * Push message data template for Firebase
   */
  firebase_data_template?: string;

  /**
   * Push message template for Firebase
   */
  firebase_template?: string;

  /**
   * Message ID to send push notification for
   */
  message_id?: string;

  /**
   * Name of push provider
   */
  push_provider_name?: string;

  /**
   * Push provider type. One of: firebase, apn, huawei, xiaomi
   */
  push_provider_type?: string;

  /**
   * Don't require existing devices to render templates
   */
  skip_devices?: boolean;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CheckPushResponse {
  duration: string;

  /**
   * The event type that was tested
   */
  event_type?: string;

  rendered_apn_template?: string;

  rendered_firebase_template?: string;

  /**
   * Don't require existing devices to render templates
   */
  skip_devices?: boolean;

  /**
   * List of general errors
   */
  general_errors?: Array<string>;

  /**
   * Object with device errors
   */
  device_errors?: Record<string, DeviceErrorInfo>;

  rendered_message?: Record<string, string>;
}

export interface CheckRequest {
  /**
   * ID of the user who created the entity
   */
  entity_creator_id: string;

  /**
   * Unique identifier of the entity to moderate
   */
  entity_id: string;

  /**
   * Type of entity to moderate
   */
  entity_type: string;

  /**
   * Key of the moderation configuration to use
   */
  config_key?: string;

  /**
   * Team associated with the configuration
   */
  config_team?: string;

  /**
   * Original timestamp when the content was produced (for correlating flagged content with source video timeline)
   */
  content_published_at?: Date;

  /**
   * Whether to run moderation in test mode
   */
  test_mode?: boolean;

  user_id?: string;

  config?: ModerationConfig;

  moderation_payload?: ModerationPayload;

  /**
   * Additional moderation configuration options
   */
  options?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CheckResponse {
  duration: string;

  /**
   * Suggested action based on moderation results
   */
  recommended_action: string;

  /**
   * Status of the moderation check (completed or pending)
   */
  status: string;

  /**
   * ID of the running moderation task
   */
  task_id?: string;

  /**
   * All moderation rules triggered by this check (content, user, and call rules), with their resolved actions
   */
  triggered_rules?: Array<TriggeredRuleResponse>;

  item?: ReviewQueueItemResponse;

  triggered_rule?: TriggeredRuleResponse;
}

export interface CheckS3AccessRequest {
  /**
   * Optional stream+s3:// reference to test access against
   */
  s3_url?: string;
}

export interface CheckS3AccessResponse {
  duration: string;

  /**
   * Whether the S3 access check succeeded
   */
  success: boolean;

  /**
   * Descriptive message about the check result
   */
  message?: string;
}

export interface CheckSNSRequest {
  /**
   * AWS SNS access key
   */
  sns_key?: string;

  /**
   * AWS SNS key secret
   */
  sns_secret?: string;

  /**
   * AWS SNS topic ARN
   */
  sns_topic_arn?: string;
}

export interface CheckSNSResponse {
  duration: string;

  /**
   * Validation result. One of: ok, error
   */
  status: string;

  /**
   * Error text
   */
  error?: string;

  /**
   * Error data
   */
  data?: Record<string, any>;
}

export interface CheckSQSRequest {
  /**
   * AWS SQS access key
   */
  sqs_key?: string;

  /**
   * AWS SQS key secret
   */
  sqs_secret?: string;

  /**
   * AWS SQS endpoint URL
   */
  sqs_url?: string;
}

export interface CheckSQSResponse {
  duration: string;

  /**
   * Validation result. One of: ok, error
   */
  status: string;

  /**
   * Error text
   */
  error?: string;

  /**
   * Error data
   */
  data?: Record<string, any>;
}

export interface Classification {
  name: string;

  confidence?: number;

  severity?: string;

  matched_contributors?: Array<string>;

  subclassifications?: Array<Classification>;
}

export interface ClientEvent {
  /**
   * Call session ID associated with the attempt. Required on every event except CoordinatorJoin initiation and CoordinatorJoin failure (where the call session is not yet established); optional on MediaDevicePermission.
   */
  call_session_id?: string;

  /**
   * Camera permission status: INITIATED, FAILED, GRANTED, or NOT_INITIATED. Required on every MediaDevicePermission event.
   */
  camera_permission_status?: string;

  /**
   * UUID generated by the client and shared across every event of the same coordinator connection. Required on every event except JoinInitiated, which is reported before a coordinator connection exists.
   */
  coordinator_connect_id?: string;

  /**
   * Milliseconds elapsed between the stage attempt's initiation and this event.
   */
  elapsed_time?: number;

  /**
   * Whether the event marks the start (initiated) or resolution (completed) of a stage attempt, or another event-specific value
   */
  event_type?: string;

  /**
   * Terminal state of the peer connection. Required on PeerConnectionConnect failure.
   */
  ice_state?: string;

  /**
   * Call ID associated with the event. Required on every stage except CoordinatorWS, where it is optional.
   */
  id?: string;

  /**
   * UUID generated by the client and shared across JoinInitiated and the join-lifecycle events (CoordinatorJoin, WSJoin, PeerConnectionConnect) of the same overall join attempt. Required on every join event except CoordinatorWS, which is reported before a join attempt is established.
   */
  join_attempt_id?: string;

  /**
   * Reason the client initiated the join. Optional on CoordinatorJoin events; empty when not provided.
   */
  join_reason?: string;

  /**
   * Microphone permission status: INITIATED, FAILED, GRANTED, or NOT_INITIATED. Required on every MediaDevicePermission event.
   */
  microphone_permission_status?: string;

  /**
   * Resolution of a completed event: success or failure. Required on completed join events; forbidden on initiated join events.
   */
  outcome?: string;

  /**
   * Which peer connection a PeerConnectionConnect event reports on: publish or subscribe. Required on every PeerConnectionConnect event.
   */
  peer_connection?: string;

  /**
   * UTC timestamp at which the ICE connection was established earlier in the session, when applicable
   */
  previously_connected_timestamp?: Date;

  /**
   * Total in-stage retries the client made before resolving (0–1000). Required on completed join events.
   */
  retry_count_attempt?: number;

  /**
   * Failure code string. Required on CoordinatorJoin, CoordinatorWS, WSJoin, and PeerConnectionConnect failure.
   */
  retry_failure_code?: string;

  /**
   * Failure reason string. Required on CoordinatorJoin, CoordinatorWS, WSJoin, and PeerConnectionConnect failure.
   */
  retry_failure_reason?: string;

  /**
   * Screen-share permission status: INITIATED, FAILED, GRANTED, or NOT_INITIATED. Optional on MediaDevicePermission events.
   */
  screen_share_status?: string;

  /**
   * Version of the client SDK
   */
  sdk_version?: string;

  /**
   * Identifier of the SFU the client was attempting to connect to. Required on WSJoin and PeerConnectionConnect failure, and on FirstAudioFrame and FirstVideoFrame.
   */
  sfu_id?: string;

  /**
   * Discriminator identifying the event kind. JoinInitiated marks the start of a join attempt; join-lifecycle events use CoordinatorJoin, CoordinatorWS, WSJoin, or PeerConnectionConnect; media-readiness events use FirstAudioFrame or FirstVideoFrame; MediaDevicePermission reports device permission results; other values denote generic client events.
   */
  stage?: string;

  /**
   * UUID generated by the client at initiation. Identical on the matching completion event. Absent on JoinInitiated.
   */
  stage_id?: string;

  /**
   * UTC timestamp at which the event was recorded
   */
  timestamp?: Date;

  /**
   * Identifier of the media track the frame belongs to. Required on FirstVideoFrame; optional on FirstAudioFrame.
   */
  track_id?: string;

  /**
   * Call type associated with the event. Required on every stage except CoordinatorWS, where it is optional.
   */
  type?: string;

  /**
   * User agent string of the client SDK
   */
  user_agent?: string;

  /**
   * ID of the user the event was recorded for
   */
  user_id?: string;

  /**
   * Whether the ICE connection had been established earlier in the same session. Required on every PeerConnectionConnect event so reconnects can be distinguished from fresh connects.
   */
  was_previously_connected?: boolean;
}

export interface ClientOSDataResponse {
  architecture?: string;

  name?: string;

  version?: string;
}

export interface ClosedCaptionEvent {
  call_cid: string;

  created_at: Date;

  /**
   * CallClosedCaption represents a closed caption of a call.
   */
  closed_caption: CallClosedCaption;

  /**
   * The type of event: "call.closed_caption" in this case
   */
  type: string;
}

export interface ClosedCaptionRuleParameters {
  severity?: string;

  threshold?: number;

  time_window?: string;

  harm_labels?: Array<string>;

  llm_harm_labels?: Record<string, string>;
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
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface CollectionRequest {
  /**
   * Name/type of the collection
   */
  name: string;

  /**
   * Custom data for the collection (required, must contain at least one key)
   */
  custom: Record<string, any>;

  /**
   * Unique identifier for the collection within its name (optional, will be auto-generated if not provided)
   */
  id?: string;

  /**
   * ID of the user who owns this collection
   */
  user_id?: string;
}

export interface CollectionResponse {
  /**
   * Unique identifier for the collection within its name
   */
  id: string;

  /**
   * Name/type of the collection
   */
  name: string;

  /**
   * When the collection was created
   */
  created_at?: Date;

  /**
   * When the collection was last updated
   */
  updated_at?: Date;

  /**
   * ID of the user who owns this collection
   */
  user_id?: string;

  /**
   * Custom data for the collection
   */
  custom?: Record<string, any>;
}

export interface Command {
  /**
   * Arguments help text, shown in commands auto-completion
   */
  args: string;

  /**
   * Description, shown in commands auto-completion
   */
  description: string;

  /**
   * Unique command name
   */
  name: string;

  /**
   * Set name used for grouping commands
   */
  set: string;

  /**
   * Date/time of creation
   */
  created_at?: Date;

  /**
   * Date/time of the last update
   */
  updated_at?: Date;
}

export interface CommentAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  comment: CommentResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.comment.added" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.comment.deleted" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentReactionAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  comment: CommentResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  /**
   * The type of event: "feeds.comment.reaction.added" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentReactionDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  /**
   * The type of reaction that was removed
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;
}

export interface CommentReactionUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  comment: CommentResponse;

  custom: Record<string, any>;

  reaction: FeedsReactionResponse;

  /**
   * The type of event: "feeds.comment.reaction.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentResponse {
  bookmark_count: number;

  /**
   * Confidence score of the comment
   */
  confidence_score: number;

  /**
   * When the comment was created
   */
  created_at: Date;

  /**
   * Number of downvotes for this comment
   */
  downvote_count: number;

  /**
   * Unique identifier for the comment
   */
  id: string;

  /**
   * ID of the object this comment is associated with
   */
  object_id: string;

  /**
   * Type of the object this comment is associated with
   */
  object_type: string;

  /**
   * Number of reactions to this comment
   */
  reaction_count: number;

  /**
   * Number of replies to this comment
   */
  reply_count: number;

  /**
   * Score of the comment based on reactions
   */
  score: number;

  /**
   * Status of the comment. One of: active, deleted, removed, hidden
   */

  status: 'active' | 'deleted' | 'removed' | 'hidden' | 'shadow_blocked';

  /**
   * When the comment was last updated
   */
  updated_at: Date;

  /**
   * Number of upvotes for this comment
   */
  upvote_count: number;

  /**
   * Users mentioned in the comment
   */
  mentioned_users: Array<UserResponse>;

  /**
   * Current user's reactions to this activity
   */
  own_reactions: Array<FeedsReactionResponse>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * Controversy score of the comment
   */
  controversy_score?: number;

  /**
   * When the comment was deleted
   */
  deleted_at?: Date;

  /**
   * When the comment was last edited
   */
  edited_at?: Date;

  /**
   * ID of parent comment for nested replies
   */
  parent_id?: string;

  /**
   * Text content of the comment
   */
  text?: string;

  /**
   * Attachments associated with the comment
   */
  attachments?: Array<Attachment>;

  /**
   * Recent reactions to the comment
   */
  latest_reactions?: Array<FeedsReactionResponse>;

  /**
   * Custom data for the comment
   */
  custom?: Record<string, any>;

  i18n?: Record<string, string>;

  moderation?: ModerationV2Response;

  /**
   * Grouped reactions by type
   */
  reaction_groups?: Record<string, FeedsReactionGroupResponse>;
}

export interface CommentRestoredEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.comment.restored" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  comment: CommentResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.comment.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommitMessageRequest {}

export interface CompositeRecordingResponse {
  status: string;
}

export interface ConcurrencyMinute {
  joins: number;

  leaves: number;

  max: number;

  min: number;

  minute: string;
}

export interface ConfigOverridesRequest {
  /**
   * Blocklist name
   */
  blocklist?: string;

  /**
   * Blocklist behavior. One of: flag, block
   */

  blocklist_behavior?: 'flag' | 'block';

  /**
   * Enable/disable message counting
   */
  count_messages?: boolean;

  /**
   * Maximum message length
   */
  max_message_length?: number;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  /**
   * Enable/disable quotes
   */
  quotes?: boolean;

  /**
   * Enable/disable reactions
   */
  reactions?: boolean;

  /**
   * Enable/disable replies
   */
  replies?: boolean;

  /**
   * Enable/disable shared locations
   */
  shared_locations?: boolean;

  /**
   * Enable/disable typing events
   */
  typing_events?: boolean;

  /**
   * Enable/disable uploads
   */
  uploads?: boolean;

  /**
   * Enable/disable URL enrichment
   */
  url_enrichment?: boolean;

  /**
   * Enable/disable user message reminders
   */
  user_message_reminders?: boolean;

  /**
   * List of available commands
   */
  commands?: Array<string>;

  chat_preferences?: ChatPreferences;

  /**
   * Permission grants modifiers
   */
  grants?: Record<string, Array<string>>;
}

export interface ConfigResponse {
  /**
   * Whether moderation should be performed asynchronously
   */
  async: boolean;

  /**
   * When the configuration was created
   */
  created_at: Date;

  /**
   * Unique identifier for the moderation configuration
   */
  key: string;

  /**
   * Team associated with the configuration
   */
  team: string;

  /**
   * When the configuration was last updated
   */
  updated_at: Date;

  supported_video_call_harm_types: Array<string>;

  /**
   * Configurable image moderation label definitions for dashboard rendering
   */
  ai_image_label_definitions?: Array<AIImageLabelDefinition>;

  /**
   * Names of Bodyguard credential profiles registered on this app. The dashboard uses this list to render the profile picker on the AI Text section.
   */
  available_bodyguard_profiles?: Array<BodyguardProfileSummary>;

  ai_audio_config?: AIAudioConfigResponse;

  ai_image_config?: AIImageConfig;

  /**
   * Available L2 subclassifications per L1 image moderation label, based on the active provider
   */
  ai_image_subclassifications?: Record<string, Array<string>>;

  ai_text_config?: AITextConfig;

  ai_video_config?: AIVideoConfig;

  automod_platform_circumvention_config?: AutomodPlatformCircumventionConfig;

  automod_semantic_filters_config?: AutomodSemanticFiltersConfig;

  automod_toxicity_config?: AutomodToxicityConfig;

  block_list_config?: BlockListConfig;

  flood_config?: FloodConfig;

  llm_config?: LLMConfig;

  velocity_filter_config?: VelocityFilterConfig;

  video_call_rule_config?: VideoCallRuleConfig;
}

export interface ContentCountRuleParameters {
  threshold?: number;

  time_window?: string;
}

export interface ContentCustomPropertyCountParameters {
  operator?: string;

  property_key?: string;

  threshold?: number;

  time_window?: string;
}

export interface ContentCustomPropertyParameters {
  operator?: string;

  property_key?: string;
}

export interface CoordinatesResponse {
  /**
   * Latitude coordinate
   */
  latitude: number;

  /**
   * Longitude coordinate
   */
  longitude: number;
}

export interface CountByMinuteResponse {
  count: number;

  start_ts: Date;
}

export interface Coverage {
  publisher_encoding_profiles: number;

  absent: Array<AbsentMetric>;

  metrics_pct: MetricsPct;
}

export interface CreateBlockListRequest {
  /**
   * Block list name
   */
  name: string;

  /**
   * List of words to block
   */
  words: Array<string>;

  is_confusable_folding_enabled?: boolean;

  is_leet_check_enabled?: boolean;

  is_plural_check_enabled?: boolean;

  is_substring_matching_enabled?: boolean;

  team?: string;

  /**
   * Block list type. One of: regex, domain, domain_allowlist, email, email_allowlist, word
   */

  type?:
    | 'regex'
    | 'domain'
    | 'domain_allowlist'
    | 'email'
    | 'email_allowlist'
    | 'word';

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreateBlockListResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Block list contains restricted words
   */
  blocklist?: BlockListResponse;
}

export interface CreateCallTypeRequest {
  name: string;

  /**
   * the external storage for the call type
   */
  external_storage?: string;

  /**
   * the permissions granted to each role
   */
  grants?: Record<string, Array<string>>;

  notification_settings?: NotificationSettingsRequest;

  settings?: CallSettingsRequest;
}

export interface CreateCallTypeResponse {
  /**
   * the time the call type was created
   */
  created_at: Date;

  duration: string;

  /**
   * the name of the call type
   */
  name: string;

  /**
   * the time the call type was last updated
   */
  updated_at: Date;

  /**
   * the permissions granted to each role
   */
  grants: Record<string, Array<string>>;

  notification_settings: NotificationSettingsResponse;

  settings: CallSettingsResponse;

  /**
   * the external storage for the call type
   */
  external_storage?: string;
}

export interface CreateCampaignRequest {
  /**
   * The user ID of the sender
   */
  sender_id: string;

  message_template: CampaignMessageTemplate;

  /**
   * Whether to create channels for the campaign, if they don't exist
   */
  create_channels?: boolean;

  /**
   * The description of the campaign
   */
  description?: string;

  id?: string;

  /**
   * The name of the campaign
   */
  name?: string;

  /**
   * The sender mode of the campaign
   */

  sender_mode?: 'exclude' | 'include';

  /**
   * The visibility of the created channels for the sender
   */

  sender_visibility?: 'hidden' | 'archived';

  /**
   * Whether the campaign should show channels, if they are hidden
   */
  show_channels?: boolean;

  /**
   * Whether to skip push notifications
   */
  skip_push?: boolean;

  /**
   * Whether to skip webhooks
   */
  skip_webhook?: boolean;

  /**
   * The IDs of the segments to send the campaign to. Duplicate user IDs are removed. Use either user_ids or segment_ids, not both
   */
  segment_ids?: Array<string>;

  /**
   * The userIDs to send the campaign to. Use either segment ids or user ids not both
   */
  user_ids?: Array<string>;

  channel_template?: CampaignChannelTemplate;
}

export interface CreateCampaignResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  campaign?: CampaignResponse;

  users?: PagerResponse;
}

export interface CreateChannelTypeRequest {
  /**
   * Automod. One of: disabled, simple, AI
   */

  automod: 'disabled' | 'simple' | 'AI';

  /**
   * Automod behavior. One of: flag, block
   */

  automod_behavior: 'flag' | 'block';

  /**
   * Max message length
   */
  max_message_length: number;

  /**
   * Channel type name
   */
  name: string;

  /**
   * Blocklist
   */
  blocklist?: string;

  /**
   * Blocklist behavior. One of: flag, block, shadow_block
   */

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  /**
   * Connect events
   */
  connect_events?: boolean;

  /**
   * Count messages in channel.
   */
  count_messages?: boolean;

  /**
   * Custom events
   */
  custom_events?: boolean;

  delivery_events?: boolean;

  /**
   * Mark messages pending
   */
  mark_messages_pending?: boolean;

  /**
   * Message retention. One of: infinite, numeric
   */
  message_retention?: string;

  /**
   * Mutes
   */
  mutes?: boolean;

  /**
   * Partition size
   */
  partition_size?: number;

  /**
   * Partition TTL
   */
  partition_ttl?: string;

  /**
   * Polls
   */
  polls?: boolean;

  /**
   * Default push notification level for the channel type. One of: all, all_mentions, mentions, direct_mentions, none
   */

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  /**
   * Push notifications
   */
  push_notifications?: boolean;

  /**
   * Reactions
   */
  reactions?: boolean;

  /**
   * Read events
   */
  read_events?: boolean;

  /**
   * Replies
   */
  replies?: boolean;

  /**
   * Search
   */
  search?: boolean;

  /**
   * Enables shared location messages
   */
  shared_locations?: boolean;

  skip_last_msg_update_for_system_msgs?: boolean;

  /**
   * Typing events
   */
  typing_events?: boolean;

  /**
   * Uploads
   */
  uploads?: boolean;

  /**
   * URL enrichment
   */
  url_enrichment?: boolean;

  user_message_reminders?: boolean;

  /**
   * Blocklists
   */
  blocklists?: Array<BlockListOptions>;

  /**
   * List of commands that channel supports
   */
  commands?: Array<string>;

  /**
   * List of permissions for the channel type
   */
  permissions?: Array<PolicyRequest>;

  chat_preferences?: ChatPreferences;

  /**
   * List of grants for the channel type
   */
  grants?: Record<string, Array<string>>;
}

export interface CreateChannelTypeResponse {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  connect_events: boolean;

  count_messages: boolean;

  created_at: Date;

  custom_events: boolean;

  delivery_events: boolean;

  duration: string;

  mark_messages_pending: boolean;

  max_message_length: number;

  message_retention: string;

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

  commands: Array<string>;

  permissions: Array<PolicyRequest>;

  grants: Record<string, Array<string>>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  allowed_flag_reasons?: Array<string>;

  blocklists?: Array<BlockListOptions>;

  /**
   * Sets thresholds for AI moderation
   */
  automod_thresholds?: Thresholds;

  chat_preferences?: ChatPreferences;
}

export interface CreateCollectionsRequest {
  /**
   * List of collections to create
   */
  collections: Array<CollectionRequest>;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreateCollectionsResponse {
  duration: string;

  /**
   * List of created collections
   */
  collections: Array<CollectionResponse>;
}

export interface CreateCommandRequest {
  /**
   * Description, shown in commands auto-completion
   */
  description: string;

  /**
   * Unique command name
   */
  name: string;

  /**
   * Arguments help text, shown in commands auto-completion
   */
  args?: string;

  /**
   * Set name used for grouping commands
   */
  set?: string;
}

export interface CreateCommandResponse {
  duration: string;

  /**
   * Represents custom chat command
   */
  command?: Command;
}

export interface CreateDeviceRequest {
  /**
   * Device ID
   */
  id: string;

  /**
   * Push provider
   */

  push_provider: 'firebase' | 'apn' | 'huawei' | 'xiaomi';

  /**
   * Stable physical device identifier used to deduplicate pushes across push providers (e.g. APNs VoIP and Firebase on the same iOS device). Distinct from 'id', which is the push token.
   */
  hardware_id?: string;

  /**
   * Push provider name
   */
  push_provider_name?: string;

  /**
   * **Server-side only**. User ID which server acts upon
   */
  user_id?: string;

  /**
   * When true the token is for Apple VoIP push notifications
   */
  voip_token?: boolean;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreateExternalStorageRequest {
  /**
   * The name of the bucket on the service provider
   */
  bucket: string;

  /**
   * The name of the provider, this must be unique
   */
  name: string;

  /**
   * The type of storage to use
   */

  storage_type: 's3' | 'gcs' | 'abs';

  gcs_credentials?: string;

  /**
   * The path prefix to use for storing files
   */
  path?: string;

  /**
   * Config for creating Amazon S3 storage.
   */
  aws_s3?: S3Request;

  /**
   * Config for creating Azure Blob Storage storage
   */
  azure_blob?: AzureRequest;
}

export interface CreateExternalStorageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface CreateFeedGroupRequest {
  /**
   * Unique identifier for the feed group
   */
  id: string;

  /**
   * Default visibility for the feed group, can be 'public', 'visible', 'followers', 'members', or 'private'. Defaults to 'visible' if not provided.
   */

  default_visibility?:
    'public' | 'visible' | 'followers' | 'members' | 'private';

  /**
   * Configuration for activity processors
   */
  activity_processors?: Array<ActivityProcessorConfig>;

  /**
   * Configuration for activity selectors
   */
  activity_selectors?: Array<ActivitySelectorConfig>;

  activity_filter?: ActivityFilterConfig;

  aggregation?: AggregationConfig;

  /**
   * Custom data for the feed group
   */
  custom?: Record<string, any>;

  notification?: NotificationConfig;

  push_notification?: PushNotificationConfig;

  ranking?: RankingConfig;

  stories?: StoriesConfig;
}

export interface CreateFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface CreateFeedViewRequest {
  /**
   * Unique identifier for the feed view
   */
  id: string;

  /**
   * Configuration for selecting activities
   */
  activity_selectors?: Array<ActivitySelectorConfig>;

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface CreateFeedViewResponse {
  duration: string;

  feed_view: FeedViewResponse;
}

export interface CreateFeedsBatchRequest {
  /**
   * List of feeds to create
   */
  feeds: Array<FeedRequest>;

  /**
   * If true, enriches the created feeds with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;
}

export interface CreateFeedsBatchResponse {
  duration: string;

  /**
   * List of created feeds
   */
  feeds: Array<FeedResponse>;
}

export interface CreateGuestRequest {
  /**
   * User request object
   */
  user: UserRequest;
}

export interface CreateGuestResponse {
  /**
   * the access token to authenticate the user
   */
  access_token: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface CreateImportRequest {
  mode: 'insert' | 'upsert';

  path: string;

  merge_custom?: boolean;
}

export interface CreateImportResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  import_task?: ImportTask;
}

export interface CreateImportURLRequest {
  filename?: string;
}

export interface CreateImportURLResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  path: string;

  upload_url: string;
}

export interface CreateImportV2TaskRequest {
  product: 'chat' | 'feeds';

  settings: ImportV2TaskSettings;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreateImportV2TaskResponse {
  app_pk: number;

  created_at: Date;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  id: string;

  product: string;

  state: number;

  updated_at: Date;

  settings: ImportV2TaskSettings;
}

export interface CreateMembershipLevelRequest {
  /**
   * Unique identifier for the membership level
   */
  id: string;

  /**
   * Display name for the membership level
   */
  name: string;

  /**
   * Optional description of the membership level
   */
  description?: string;

  /**
   * Priority level (higher numbers = higher priority)
   */
  priority?: number;

  /**
   * Activity tags this membership level gives access to
   */
  tags?: Array<string>;

  /**
   * Custom data for the membership level
   */
  custom?: Record<string, any>;
}

export interface CreateMembershipLevelResponse {
  duration: string;

  membership_level: MembershipLevelResponse;
}

export interface CreatePermissionRequest {
  /**
   * Action name this permission is for (e.g. SendMessage)
   */
  action: string;

  /**
   * Unique permission ID
   */
  id: string;

  /**
   * Name of the permission
   */
  name: string;

  /**
   * MongoDB style condition which decides whether or not the permission is granted
   */
  condition: Record<string, any>;

  /**
   * Description of the permission
   */
  description?: string;

  /**
   * Whether this permission applies to resource owner or not
   */
  owner?: boolean;

  /**
   * Whether this permission applies to teammates (multi-tenancy mode only)
   */
  same_team?: boolean;
}

export interface CreatePolicyTestSetRequest {
  /**
   * Display name; unique within an app
   */
  name: string;

  /**
   * Moderation config key (default: app default)
   */
  config_key?: string;

  /**
   * Execution target: 'check' or 'labels'. Optional — defaults to 'labels' when the org has the labels API enabled, 'check' otherwise
   */
  mode?: string;

  /**
   * Team scope for the config (optional)
   */
  team?: string;

  /**
   * Messages to test; capped at 1000. Mutually exclusive with seed
   */
  rows?: Array<PolicyTestRow>;

  seed?: PolicyTestSeedSpec;
}

export interface CreatePollOptionRequest {
  /**
   * Option text
   */
  text: string;

  user_id?: string;

  /**
   * Custom data for this object
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreatePollRequest {
  /**
   * The name of the poll
   */
  name: string;

  /**
   * Indicates whether users can suggest user defined answers
   */
  allow_answers?: boolean;

  allow_user_suggested_options?: boolean;

  /**
   * A description of the poll
   */
  description?: string;

  /**
   * Indicates whether users can cast multiple votes
   */
  enforce_unique_vote?: boolean;

  id?: string;

  /**
   * Indicates whether the poll is open for voting
   */
  is_closed?: boolean;

  /**
   * Indicates the maximum amount of votes a user can cast
   */
  max_votes_allowed?: number;

  user_id?: string;

  voting_visibility?: 'anonymous' | 'public';

  options?: Array<PollOptionInput>;

  /**
   * Custom data for this object
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreatePredefinedFilterRequest {
  /**
   * The unique name of the predefined filter (alphanumeric, _, - only)
   */
  name: string;

  /**
   * The operation this filter is for (e.g., QueryChannels)
   */

  operation: 'QueryChannels';

  /**
   * Filter to apply to the query
   */
  filter: Record<string, any>;

  /**
   * The description of the predefined filter
   */
  description?: string;

  sort?: Array<Record<string, any>>;
}

export interface CreatePredefinedFilterResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  predefined_filter?: PredefinedFilterResponse;
}

export interface CreateQueueRequest {
  name: string;

  type: 'personal_view' | 'operational_queue';

  description?: string;

  user_id?: string;

  sort?: Array<Record<string, any>>;

  filters?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreateReminderRequest {
  remind_at?: Date;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CreateRoleRequest {
  /**
   * Role name
   */
  name: string;
}

export interface CreateRoleResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  role: Role;
}

export interface CreateSIPTrunkRequest {
  /**
   * Name of the SIP trunk
   */
  name: string;

  /**
   * Phone numbers associated with this SIP trunk
   */
  numbers: Array<string>;

  /**
   * Optional password for SIP trunk authentication
   */
  password?: string;

  /**
   * Optional list of allowed IPv4/IPv6 addresses or CIDR blocks
   */
  allowed_ips?: Array<string>;
}

export interface CreateSIPTrunkResponse {
  duration: string;

  /**
   * SIP trunk information
   */
  sip_trunk?: SIPTrunkResponse;
}

export interface CreateSegmentRequest {
  /**
   * The type of the segment
   */

  type: 'user' | 'channel';

  /**
   * If true, all sender channels are included in the segment
   */
  all_sender_channels?: boolean;

  /**
   * If true, all users are included in the segment
   */
  all_users?: boolean;

  /**
   * The description of the segment (max 256 characters)
   */
  description?: string;

  /**
   * The ID of the segment
   */
  id?: string;

  /**
   * The name of the segment (max 128 characters)
   */
  name?: string;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;
}

export interface CreateSegmentResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  segment?: SegmentResponse;
}

export interface CreateUserGroupRequest {
  /**
   * The user friendly name of the user group
   */
  name: string;

  /**
   * An optional description for the group
   */
  description?: string;

  /**
   * Optional user group ID. If not provided, a UUID v7 will be generated
   */
  id?: string;

  /**
   * Optional team ID to scope the group to a team
   */
  team_id?: string;

  /**
   * Optional initial list of user IDs to add as members
   */
  member_ids?: Array<string>;
}

export interface CreateUserGroupResponse {
  duration: string;

  user_group?: UserGroupResponse;
}

export interface CustomActionRequestPayload {
  /**
   * Custom action identifier
   */
  id?: string;

  /**
   * Custom action options
   */
  options?: Record<string, any>;
}

export interface CustomCheckFlag {
  /**
   * Type of check (custom_check_text, custom_check_image, custom_check_video)
   */
  type: string;

  /**
   * Optional explanation for the flag
   */
  reason?: string;

  /**
   * Labels from various moderation sources
   */
  labels?: Array<string>;

  /**
   * Additional metadata for the flag
   */
  custom?: Record<string, any>;
}

export interface CustomCheckRequest {
  /**
   * Unique identifier of the entity
   */
  entity_id: string;

  /**
   * Type of entity to perform custom check on
   */
  entity_type: string;

  /**
   * List of custom check flags (1-10 flags required)
   */
  flags: Array<CustomCheckFlag>;

  /**
   * ID of the user who created the entity (required for non-message entities)
   */
  entity_creator_id?: string;

  user_id?: string;

  /**
   * Content payload for moderation
   */
  moderation_payload?: ModerationPayloadRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface CustomCheckResponse {
  duration: string;

  /**
   * Unique identifier of the custom check
   */
  id: string;

  /**
   * Status of the custom check
   */
  status: string;

  item?: ReviewQueueItemResponse;
}

export interface CustomEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface CustomVideoEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Custom data for this object
   */
  custom: Record<string, any>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event, "custom" in this case
   */
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

export interface DailyDigestCallSessionSummary {
  call_cid: string;

  call_session_id: string;

  has_digest: boolean;

  counts: CallStatsParticipantCounts;

  digest_error?: string;

  session_ended_at?: string;

  session_started_at?: string;
}

export interface DailyMetricResponse {
  /**
   * Date in YYYY-MM-DD format
   */
  date: string;

  /**
   * Metric value for this date
   */
  value: number;
}

export interface DailyMetricStatsResponse {
  /**
   * Total value across all days in the date range
   */
  total: number;

  /**
   * Array of daily metric values
   */
  daily: Array<DailyMetricResponse>;
}

export interface DailyValue {
  /**
   * Date in YYYY-MM-DD format
   */
  date: string;

  /**
   * Metric value for this date
   */
  value: number;
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
  /**
   * ID of the user who deactivated the user
   */
  created_by_id?: string;

  /**
   * Makes messages appear to be deleted
   */
  mark_messages_deleted?: boolean;
}

export interface DeactivateUserResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface DeactivateUsersRequest {
  /**
   * User IDs to deactivate
   */
  user_ids: Array<string>;

  /**
   * ID of the user who deactivated the users
   */
  created_by_id?: string;

  mark_channels_deleted?: boolean;

  /**
   * Makes messages appear to be deleted
   */
  mark_messages_deleted?: boolean;
}

export interface DeactivateUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  task_id: string;
}

export interface DecayFunctionConfig {
  /**
   * Base value for decay function
   */
  base?: string;

  /**
   * Decay rate
   */
  decay?: string;

  /**
   * Direction of decay
   */
  direction?: string;

  /**
   * Offset value for decay function
   */
  offset?: string;

  /**
   * Origin value for decay function
   */
  origin?: string;

  /**
   * Scale factor for decay function
   */
  scale?: string;
}

export interface DeleteActionConfigResponse {
  /**
   * Number of action configs deleted (0 or 1)
   */
  deleted: number;

  duration: string;
}

export interface DeleteActivitiesRequest {
  /**
   * List of activity IDs to delete
   */
  ids: Array<string>;

  /**
   * Whether to also delete any notification activities created from mentions in these activities
   */
  delete_notification_activity?: boolean;

  /**
   * Whether to permanently delete the activities
   */
  hard_delete?: boolean;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface DeleteActivitiesResponse {
  duration: string;

  /**
   * List of activity IDs that were successfully deleted
   */
  deleted_ids: Array<string>;
}

export interface DeleteActivityReactionResponse {
  duration: string;

  activity: ActivityResponse;

  reaction: FeedsReactionResponse;
}

export interface DeleteActivityRequestPayload {
  /**
   * ID of the activity to delete (alternative to item_id)
   */
  entity_id?: string;

  /**
   * Type of the entity (required for delete_activity to distinguish v2 vs v3)
   */
  entity_type?: string;

  /**
   * Whether to permanently delete the activity
   */
  hard_delete?: boolean;

  /**
   * Reason for deletion
   */
  reason?: string;
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
  /**
   * if true the call will be hard deleted along with all related data
   */
  hard?: boolean;
}

export interface DeleteCallResponse {
  duration: string;

  /**
   * Represents a call
   */
  call: CallResponse;

  task_id?: string;
}

export interface DeleteCampaignResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteChannelResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;
}

export interface DeleteChannelsRequest {
  /**
   * All channels that should be deleted
   */
  cids: Array<string>;

  /**
   * Specify if channels and all ressources should be hard deleted
   */
  hard_delete?: boolean;
}

export interface DeleteChannelsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  task_id?: string;

  /**
   * Map of channel IDs and their deletion results
   */
  result?: Record<string, DeleteChannelsResultResponse>;
}

export interface DeleteChannelsResultResponse {
  status: string;

  error?: string;
}

export interface DeleteCollectionsResponse {
  duration: string;
}

export interface DeleteCommandResponse {
  duration: string;

  /**
   * Command name
   */
  name: string;
}

export interface DeleteCommentBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface DeleteCommentReactionResponse {
  duration: string;

  comment: CommentResponse;

  reaction: FeedsReactionResponse;
}

export interface DeleteCommentRequestPayload {
  /**
   * ID of the comment to delete (alternative to item_id)
   */
  entity_id?: string;

  /**
   * Type of the entity
   */
  entity_type?: string;

  /**
   * Whether to permanently delete the comment
   */
  hard_delete?: boolean;

  /**
   * Reason for deletion
   */
  reason?: string;
}

export interface DeleteCommentResponse {
  duration: string;

  activity: ActivityResponse;

  comment: CommentResponse;
}

export interface DeleteExternalStorageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteFeedGroupResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteFeedResponse {
  duration: string;

  /**
   * The ID of the async task that will handle feed cleanup and hard deletion
   */
  task_id: string;
}

export interface DeleteFeedUserDataRequest {
  /**
   * Whether to perform a hard delete instead of a soft delete
   */
  hard_delete?: boolean;
}

export interface DeleteFeedUserDataResponse {
  duration: string;

  /**
   * The task ID for the deletion task
   */
  task_id: string;
}

export interface DeleteFeedViewResponse {
  duration: string;
}

export interface DeleteFeedsBatchRequest {
  /**
   * List of fully qualified feed IDs (format: group_id:feed_id) to delete
   */
  feeds: Array<string>;

  /**
   * Whether to permanently delete the feeds instead of soft delete
   */
  hard_delete?: boolean;

  /**
   * When hard-deleting, also fully delete activities authored by each feed's owner from every other feed those activities were fanned out to. Default false preserves existing fan-out. Requires 'hard_delete' to be true; the request is rejected otherwise. Feeds with no recorded owner (created_by_id is empty) are silently skipped for the purge step — owner-matching against an empty string is a safety guard, not a wildcard.
   */
  purge_user_activities?: boolean;
}

export interface DeleteFeedsBatchResponse {
  duration: string;

  /**
   * The ID of the async task that will handle feed cleanup and hard deletion
   */
  task_id: string;
}

export interface DeleteImportV2TaskResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteMessageRequestPayload {
  /**
   * ID of the message to delete (alternative to item_id)
   */
  entity_id?: string;

  /**
   * Type of the entity
   */
  entity_type?: string;

  /**
   * Whether to permanently delete the message
   */
  hard_delete?: boolean;

  /**
   * Reason for deletion
   */
  reason?: string;
}

export interface DeleteMessageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message: MessageResponse;
}

export interface DeleteModerationConfigResponse {
  duration: string;
}

export interface DeleteModerationRuleResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteModerationTemplateResponse {
  duration: string;
}

export interface DeleteQueueRequest {
  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface DeleteReactionRequestPayload {
  /**
   * ID of the reaction to delete (alternative to item_id)
   */
  entity_id?: string;

  /**
   * Type of the entity
   */
  entity_type?: string;

  /**
   * Whether to permanently delete the reaction
   */
  hard_delete?: boolean;

  /**
   * Reason for deletion
   */
  reason?: string;
}

export interface DeleteReactionResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  reaction: ReactionResponse;
}

export interface DeleteRecordingResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteReminderResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteRetentionPolicyRequest {
  policy: 'old-messages' | 'inactive-channels';
}

export interface DeleteRetentionPolicyResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteSIPInboundRoutingRuleResponse {
  duration: string;
}

export interface DeleteSIPTrunkResponse {
  duration: string;
}

export interface DeleteSegmentTargetsRequest {
  /**
   * Target IDs
   */
  target_ids: Array<string>;
}

export interface DeleteTranscriptionResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface DeleteUserMessagesRequestPayload {
  /**
   * Message deletion mode: soft, pruning, or hard
   */

  delete_messages: 'soft' | 'pruning' | 'hard';

  /**
   * Optional: scope deletion to a single channel (alternative to app-wide deletion)
   */
  channel_cid?: string;

  /**
   * Whether to also delete the user's reactions on other users' messages
   */
  delete_reactions?: boolean;

  /**
   * ID of the user whose messages should be deleted (alternative to item_id)
   */
  entity_id?: string;

  /**
   * Type of the entity
   */
  entity_type?: string;

  /**
   * Reason for the deletion
   */
  reason?: string;
}

export interface DeleteUserRequestPayload {
  /**
   * Also delete all user conversations
   */
  delete_conversation_channels?: boolean;

  /**
   * Delete flagged feeds content
   */
  delete_feeds_content?: boolean;

  /**
   * ID of the user to delete (alternative to item_id)
   */
  entity_id?: string;

  /**
   * Type of the entity
   */
  entity_type?: string;

  /**
   * Whether to permanently delete the user
   */
  hard_delete?: boolean;

  /**
   * Also delete all user messages
   */
  mark_messages_deleted?: boolean;

  /**
   * Reason for deletion
   */
  reason?: string;
}

export interface DeleteUsersRequest {
  /**
   * IDs of users to delete
   */
  user_ids: Array<string>;

  /**
   * Calls delete mode.
   * Affected calls are those that include exactly two members, one of whom is the user being deleted.
   * * null or empty string - doesn't delete any calls
   * * soft - marks user's calls and their related data as deleted (soft-delete)
   * * hard - deletes user's calls and their data completely (hard-delete)
   */

  calls?: 'soft' | 'hard';

  /**
   * Conversation channels delete mode.
   * Conversation channel is any channel which only has two members one of which is the user being deleted.
   * * null or empty string - doesn't delete any conversation channels
   * * soft - marks all conversation channels as deleted (same effect as Delete Channels with 'hard' option disabled)
   * * hard - deletes channel and all its data completely including messages (same effect as Delete Channels with 'hard' option enabled)
   */

  conversations?: 'soft' | 'hard';

  /**
   * Delete user files.
   * * false or empty string - doesn't delete any files
   * * true - deletes all files uploaded by the user, including images and attachments.
   */
  files?: boolean;

  /**
   * Message delete mode.
   * * null or empty string - doesn't delete user messages
   * * soft - marks all user messages as deleted without removing any related message data
   * * pruning - marks all user messages as deleted, nullifies message information and removes some message data such as reactions and flags
   * * hard - deletes messages completely with all related information
   */

  messages?: 'soft' | 'pruning' | 'hard';

  new_call_owner_id?: string;

  new_channel_owner_id?: string;

  /**
   * User delete mode.
   * * soft - marks user as deleted and retains all user data
   * * pruning - marks user as deleted and nullifies user information
   * * hard - deletes user completely. Requires 'hard' option for messages and conversations as well
   */

  user?: 'soft' | 'pruning' | 'hard';
}

export interface DeleteUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * ID of the task to delete users
   */
  task_id: string;
}

export interface DeliveredMessagePayload {
  cid?: string;

  id?: string;
}

export interface DeliveryReceiptsResponse {
  enabled: boolean;
}

export interface DeliveryZoneSegment {
  key: string;

  outlier: boolean;

  sessions: number;

  avg_quality_score?: number;

  p5_quality_score?: number;

  poor_pct?: number;

  share_pct?: number;

  watch_share_pct?: number;
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
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Device ID
   */
  id: string;

  /**
   * Push provider
   */
  push_provider: string;

  /**
   * User ID
   */
  user_id: string;

  /**
   * Whether device is disabled or not
   */
  disabled?: boolean;

  /**
   * Reason explaining why device had been disabled
   */
  disabled_reason?: string;

  /**
   * Stable physical device identifier used to deduplicate pushes across push providers
   */
  hardware_id?: string;

  /**
   * Push provider name
   */
  push_provider_name?: string;

  /**
   * When true the token is for Apple VoIP push notifications
   */
  voip?: boolean;
}

export interface DraftPayloadResponse {
  /**
   * Message ID is unique string identifier of the message
   */
  id: string;

  /**
   * Text of the message
   */
  text: string;

  custom: Record<string, any>;

  /**
   * Contains HTML markup of the message
   */
  html?: string;

  /**
   * MML content of the message
   */
  mml?: string;

  /**
   * ID of parent message (thread)
   */
  parent_id?: string;

  /**
   * Identifier of the poll to include in the message
   */
  poll_id?: string;

  quoted_message_id?: string;

  /**
   * Whether thread reply should be shown in the channel as well
   */
  show_in_channel?: boolean;

  /**
   * Whether message is silent or not
   */
  silent?: boolean;

  /**
   * Contains type of the message. One of: regular, system
   */
  type?: string;

  /**
   * Array of message attachments
   */
  attachments?: Array<Attachment>;

  /**
   * List of mentioned users
   */
  mentioned_users?: Array<UserResponse>;
}

export interface DraftResponse {
  channel_cid: string;

  created_at: Date;

  /**
   * Contains the draft message content
   */
  message: DraftPayloadResponse;

  parent_id?: string;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
  parent_message?: MessageResponse;

  /**
   * Represents any chat message
   */
  quoted_message?: MessageResponse;
}

export interface EMAUStatsResponse {
  /**
   * Per-day unique engaged user counts
   */
  daily: Array<DailyMetricResponse>;

  /**
   * Rolling 30-day engaged user count snapshots
   */
  last_30_days: Array<DailyMetricResponse>;

  /**
   * Calendar month-to-date engaged user count snapshots
   */
  month_to_date: Array<DailyMetricResponse>;
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

  rtmps: Array<EgressRTMPResponse>;

  composite_recording?: CompositeRecordingResponse;

  frame_recording?: FrameRecordingResponse;

  hls?: EgressHLSResponse;

  individual_recording?: IndividualRecordingResponse;

  raw_recording?: RawRecordingResponse;
}

export interface EncodingProfile {
  getstats_snapshots: number;

  source_file: string;

  svc_modes: Array<string>;

  quality_limitation_durations_s: Record<string, number>;

  quality_limitation_samples: Record<string, number>;

  avg_send_kbps?: number;

  codec?: string;

  encoder_impl?: string;

  fps_p10?: number;

  fps_p50?: number;

  hardware_encode?: boolean;

  ladder_type?: string;

  power_efficient?: boolean;

  resolution?: string;

  simulcast_layers?: number;
}

export interface EncryptionSettingsRequest {
  /**
   * Encryption mode. One of: available, disabled, auto-on
   */

  mode?: 'available' | 'disabled' | 'auto-on';
}

export interface EncryptionSettingsResponse {
  /**
   * the resolved encryption mode for the call
   */

  mode: 'available' | 'disabled' | 'auto-on';
}

export interface EndCallRequest {}

export interface EndCallResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface EnrichedActivity {
  foreign_id?: string;

  id?: string;

  score?: number;

  verb?: string;

  to?: Array<string>;

  actor?: Data;

  latest_reactions?: Record<string, Array<EnrichedReaction>>;

  object?: Data;

  origin?: Data;

  own_reactions?: Record<string, Array<EnrichedReaction>>;

  reaction_counts?: Record<string, number>;

  target?: Data;
}

export interface EnrichedCollectionResponse {
  /**
   * Unique identifier for the collection within its name
   */
  id: string;

  /**
   * Name/type of the collection
   */
  name: string;

  /**
   * Enrichment status of the collection. One of: ok, notfound
   */

  status: 'ok' | 'notfound';

  /**
   * When the collection was created
   */
  created_at?: Date;

  /**
   * When the collection was last updated
   */
  updated_at?: Date;

  /**
   * ID of the user who owns this collection
   */
  user_id?: string;

  /**
   * Custom data for the collection
   */
  custom?: Record<string, any>;
}

export interface EnrichedReaction {
  activity_id: string;

  kind: string;

  user_id: string;

  id?: string;

  parent?: string;

  target_feeds?: Array<string>;

  children_counts?: Record<string, number>;

  created_at?: Time;

  data?: Record<string, any>;

  latest_children?: Record<string, Array<EnrichedReaction>>;

  own_children?: Record<string, Array<EnrichedReaction>>;

  updated_at?: Time;

  user?: Data;
}

export interface EnrichmentOptions {
  /**
   * Default: false. When true, includes fetching and enriching own_followings (follows where activity author's feeds follow current user's feeds).
   */
  enrich_own_followings?: boolean;

  /**
   * Controls the top-level flat 'activities' array for aggregated feeds. For new apps, defaults to false (excluded); set to true to include. For older apps, defaults to true (included) for backward compatibility; set to false to exclude.
   */
  include_flat_activities?: boolean;

  /**
   * Default: false. When true, includes score_vars in activity responses containing variable values used at ranking time.
   */
  include_score_vars?: boolean;

  /**
   * Default: false. When true, skips all activity enrichments.
   */
  skip_activity?: boolean;

  /**
   * Default: false. When true, skips enriching collections on activities.
   */
  skip_activity_collections?: boolean;

  /**
   * Default: false. When true, skips enriching comments on activities.
   */
  skip_activity_comments?: boolean;

  /**
   * Default: false. When true, skips enriching current_feed on activities. Note: CurrentFeed is still computed for permission checks, but enrichment is skipped.
   */
  skip_activity_current_feed?: boolean;

  /**
   * Default: false. When true, skips enriching mentioned users on activities.
   */
  skip_activity_mentioned_users?: boolean;

  /**
   * Default: false. When true, skips enriching own bookmarks on activities.
   */
  skip_activity_own_bookmarks?: boolean;

  /**
   * Default: false. When true, skips enriching parent activities.
   */
  skip_activity_parents?: boolean;

  /**
   * Default: false. When true, skips enriching poll data on activities.
   */
  skip_activity_poll?: boolean;

  /**
   * Default: false. When true, skips fetching and enriching latest and own reactions on activities. Note: If reactions are already denormalized in the database, they will still be included.
   */
  skip_activity_reactions?: boolean;

  /**
   * Default: false. When true, skips refreshing image URLs on activities.
   */
  skip_activity_refresh_image_urls?: boolean;

  /**
   * Default: false. When true, skips all enrichments.
   */
  skip_all?: boolean;

  /**
   * Default: false. When true, skips enriching user data on feed members.
   */
  skip_feed_member_user?: boolean;

  /**
   * Default: false. When true, skips fetching and enriching followers. Note: If followers_pagination is explicitly provided, followers will be fetched regardless of this setting.
   */
  skip_followers?: boolean;

  /**
   * Default: false. When true, skips fetching and enriching following. Note: If following_pagination is explicitly provided, following will be fetched regardless of this setting.
   */
  skip_following?: boolean;

  /**
   * Default: false. When true, skips computing and including capabilities for feeds.
   */
  skip_own_capabilities?: boolean;

  /**
   * Default: false. When true, skips fetching and enriching own_follows (follows where user's feeds follow target feeds).
   */
  skip_own_follows?: boolean;

  /**
   * Default: false. When true, skips enriching pinned activities.
   */
  skip_pins?: boolean;
}

export interface EntityCreatorResponse {
  /**
   * Number of minor actions performed on the user
   */
  ban_count: number;

  banned: boolean;

  created_at: Date;

  /**
   * Number of major actions performed on the user
   */
  deleted_content_count: number;

  /**
   * Number of flag actions performed on the user
   */
  flagged_count: number;

  id: string;

  invisible: boolean;

  language: string;

  online: boolean;

  role: string;

  shadow_banned: boolean;

  updated_at: Date;

  blocked_user_ids: Array<string>;

  teams: Array<string>;

  custom: Record<string, any>;

  avg_response_time?: number;

  ban_expires?: Date;

  bypass_moderation?: boolean;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  devices?: Array<DeviceResponse>;

  privacy_settings?: PrivacySettingsResponse;

  push_notifications?: PushNotificationSettingsResponse;

  teams_role?: Record<string, string>;
}

export interface ErrorResult {
  description: string;

  type: string;

  stacktrace?: string;

  version?: string;
}

export interface EscalatePayload {
  /**
   * Additional context for the reviewer
   */
  notes?: string;

  /**
   * Priority of the escalation (low, medium, high)
   */
  priority?: string;

  /**
   * Reason for the escalation (from configured escalation_reasons)
   */
  reason?: string;
}

export interface EscalationMetadata {
  notes?: string;

  priority?: string;

  reason?: string;
}

export interface EventHook {
  created_at?: Date;

  enabled?: boolean;

  hook_type?: string;

  id?: string;

  product?: string;

  should_send_custom_events?: boolean;

  sns_auth_type?: string;

  sns_event_based_message_group_id_enabled?: boolean;

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

  event_types?: Array<string>;

  callback?: AsyncModerationCallbackConfig;

  failover_config?: WebhookFailoverConfig;
}

export interface EventNotificationSettings {
  enabled: boolean;

  apns: APNS;

  fcm: FCM;
}

export interface EventNotificationSettingsRequest {
  enabled?: boolean;

  apns?: APNSPayload;

  fcm?: FCMPayload;
}

export interface EventNotificationSettingsResponse {
  enabled: boolean;

  apns: APNSPayload;

  fcm: FCMPayload;
}

export interface EventRequest {
  type: string;

  parent_id?: string;

  user_id?: string;

  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface EventResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents an BaseEvent that happened in Stream Chat
   */
  event: WSEvent;
}

export interface ExportChannelsRequest {
  /**
   * Export options for channels
   */
  channels: Array<ChannelExport>;

  /**
   * Set if deleted message text should be cleared
   */
  clear_deleted_message_text?: boolean;

  export_users?: boolean;

  /**
   * Output format: 'json' (default) or 'csv'. csv requires version=v2 and is incompatible with export_users
   */

  format?: 'json' | 'csv';

  /**
   * Set if you want to include deleted channels
   */
  include_soft_deleted_channels?: boolean;

  /**
   * Set if you want to include truncated messages
   */
  include_truncated_messages?: boolean;

  /**
   * Export version
   */
  version?: string;

  /**
   * For csv format: subset of message columns to include (defaults to a standard set)
   */
  include_fields?: Array<string>;
}

export interface ExportChannelsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * ID of the task to export channels
   */
  task_id: string;
}

export interface ExportFeedUserDataRequest {}

export interface ExportFeedUserDataResponse {
  duration: string;

  /**
   * The task ID for the export task
   */
  task_id: string;
}

export interface ExportUserResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of exported messages
   */
  messages?: Array<MessageResponse>;

  /**
   * List of exported reactions
   */
  reactions?: Array<ReactionResponse>;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ExportUsersRequest {
  user_ids: Array<string>;
}

export interface ExportUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  task_id: string;
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

export interface FCMPayload {
  data?: Record<string, any>;
}

export interface FailedChannelUpdates {
  reason: string;

  cids: Array<string>;
}

export interface FeedCreatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  members: Array<FeedMemberResponse>;

  custom: Record<string, any>;

  feed: FeedResponse;

  user: UserResponseCommonFields;

  /**
   * The type of event: "feeds.feed.created" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;
}

export interface FeedDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.feed.deleted" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedGroup {
  aggregation_version: number;

  app_pk: number;

  created_at: Date;

  default_visibility: string;

  group_id: string;

  updated_at: Date;

  activity_processors: Array<ActivityProcessorConfig>;

  activity_selectors: Array<ActivitySelectorConfig>;

  custom: Record<string, any>;

  deleted_at?: Date;

  last_feed_get_at?: Date;

  activity_filter?: ActivityFilterConfig;

  aggregation?: AggregationConfig;

  notification?: NotificationConfig;

  push_notification?: PushNotificationConfig;

  ranking?: RankingConfig;

  stories?: StoriesConfig;
}

export interface FeedGroupChangedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.feed_group.changed" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  feed_group?: FeedGroup;

  user?: UserResponseCommonFields;
}

export interface FeedGroupDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  /**
   * The ID of the feed group that was deleted
   */
  group_id: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.feed_group.deleted" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;
}

export interface FeedGroupResponse {
  /**
   * When the feed group was created
   */
  created_at: Date;

  /**
   * Identifier within the group
   */
  id: string;

  /**
   * When the feed group was last updated
   */
  updated_at: Date;

  /**
   * Default visibility for activities. One of: public, visible, followers, members, private
   */

  default_visibility?:
    'public' | 'visible' | 'followers' | 'members' | 'private';

  deleted_at?: Date;

  /**
   * Configuration for activity processors
   */
  activity_processors?: Array<ActivityProcessorConfig>;

  /**
   * Configuration for activity selectors
   */
  activity_selectors?: Array<ActivitySelectorConfigResponse>;

  activity_filter?: ActivityFilterConfig;

  aggregation?: AggregationConfig;

  /**
   * Custom data for the feed group
   */
  custom?: Record<string, any>;

  notification?: NotificationConfig;

  push_notification?: PushNotificationConfig;

  ranking?: RankingConfig;

  stories?: StoriesConfig;
}

export interface FeedGroupRestoredEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  /**
   * The ID of the feed group that was restored
   */
  group_id: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.feed_group.restored" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;
}

export interface FeedInput {
  description?: string;

  name?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  filter_tags?: Array<string>;

  members?: Array<FeedMemberRequest>;

  custom?: Record<string, any>;

  location?: Location;
}

export interface FeedMemberAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  member: FeedMemberResponse;

  /**
   * The type of event: "feeds.feed_member.added" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedMemberRemovedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  member_id: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.feed_member.removed" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedMemberRequest {
  /**
   * ID of the user to add as a member
   */
  user_id: string;

  /**
   * Whether this is an invite to become a member
   */
  invite?: boolean;

  /**
   * ID of the membership level to assign to the member
   */
  membership_level?: string;

  /**
   * Role of the member in the feed
   */
  role?: string;

  /**
   * Custom data for the member
   */
  custom?: Record<string, any>;
}

export interface FeedMemberResponse {
  /**
   * When the membership was created
   */
  created_at: Date;

  /**
   * Role of the member in the feed
   */
  role: string;

  /**
   * Status of the membership. One of: member, pending, rejected
   */

  status: 'member' | 'pending' | 'rejected';

  /**
   * When the membership was last updated
   */
  updated_at: Date;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * When the invite was accepted
   */
  invite_accepted_at?: Date;

  /**
   * When the invite was rejected
   */
  invite_rejected_at?: Date;

  /**
   * Custom data for the membership
   */
  custom?: Record<string, any>;

  membership_level?: MembershipLevelResponse;
}

export interface FeedMemberUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  member: FeedMemberResponse;

  /**
   * The type of event: "feeds.feed_member.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export const FeedOwnCapability = {
  ADD_ACTIVITY: 'add-activity',
  ADD_ACTIVITY_BOOKMARK: 'add-activity-bookmark',
  ADD_ACTIVITY_REACTION: 'add-activity-reaction',
  ADD_COMMENT: 'add-comment',
  ADD_COMMENT_REACTION: 'add-comment-reaction',
  CREATE_FEED: 'create-feed',
  DELETE_ANY_ACTIVITY: 'delete-any-activity',
  DELETE_ANY_COMMENT: 'delete-any-comment',
  DELETE_FEED: 'delete-feed',
  DELETE_OWN_ACTIVITY: 'delete-own-activity',
  DELETE_OWN_ACTIVITY_BOOKMARK: 'delete-own-activity-bookmark',
  DELETE_OWN_ACTIVITY_REACTION: 'delete-own-activity-reaction',
  DELETE_OWN_COMMENT: 'delete-own-comment',
  DELETE_OWN_COMMENT_REACTION: 'delete-own-comment-reaction',
  FOLLOW: 'follow',
  PIN_ACTIVITY: 'pin-activity',
  QUERY_FEED_MEMBERS: 'query-feed-members',
  QUERY_FOLLOWS: 'query-follows',
  READ_ACTIVITIES: 'read-activities',
  READ_FEED: 'read-feed',
  UNFOLLOW: 'unfollow',
  UPDATE_ANY_ACTIVITY: 'update-any-activity',
  UPDATE_ANY_COMMENT: 'update-any-comment',
  UPDATE_FEED: 'update-feed',
  UPDATE_FEED_FOLLOWERS: 'update-feed-followers',
  UPDATE_FEED_MEMBERS: 'update-feed-members',
  UPDATE_OWN_ACTIVITY: 'update-own-activity',
  UPDATE_OWN_ACTIVITY_BOOKMARK: 'update-own-activity-bookmark',
  UPDATE_OWN_COMMENT: 'update-own-comment',
} as const;

export type FeedOwnCapability =
  (typeof FeedOwnCapability)[keyof typeof FeedOwnCapability];

export interface FeedOwnData {
  /**
   * Capabilities the current user has for this feed
   */
  own_capabilities?: Array<FeedOwnCapability>;

  /**
   * Follow relationships where the feed owner's feeds are following the current user's feeds (up to 5 total)
   */
  own_followings?: Array<FollowResponse>;

  /**
   * Follow relationships where the current user's feeds are following this feed
   */
  own_follows?: Array<FollowResponse>;

  own_membership?: FeedMemberResponse;
}

export interface FeedRequest {
  /**
   * ID of the feed group
   */
  feed_group_id: string;

  /**
   * ID of the feed
   */
  feed_id: string;

  /**
   * ID of the feed creator
   */
  created_by_id?: string;

  /**
   * Description of the feed
   */
  description?: string;

  /**
   * Name of the feed
   */
  name?: string;

  /**
   * Visibility setting for the feed. One of: public, visible, followers, members, private
   */

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  /**
   * Tags used for filtering feeds
   */
  filter_tags?: Array<string>;

  /**
   * Initial members for the feed
   */
  members?: Array<FeedMemberRequest>;

  /**
   * Custom data for the feed
   */
  custom?: Record<string, any>;

  location?: Location;
}

export interface FeedResponse {
  activity_count: number;

  /**
   * When the feed was created
   */
  created_at: Date;

  /**
   * Description of the feed
   */
  description: string;

  /**
   * Fully qualified feed ID (group_id:id)
   */
  feed: string;

  /**
   * Number of followers of this feed
   */
  follower_count: number;

  /**
   * Number of feeds this feed follows
   */
  following_count: number;

  /**
   * Group this feed belongs to
   */
  group_id: string;

  /**
   * Unique identifier for the feed
   */
  id: string;

  /**
   * Number of members in this feed
   */
  member_count: number;

  /**
   * Name of the feed
   */
  name: string;

  /**
   * Number of pinned activities in this feed
   */
  pin_count: number;

  /**
   * When the feed was last updated
   */
  updated_at: Date;

  /**
   * User response object
   */
  created_by: UserResponse;

  /**
   * When the feed was deleted
   */
  deleted_at?: Date;

  /**
   * Visibility setting for the feed
   */

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  /**
   * Tags used for filtering feeds
   */
  filter_tags?: Array<string>;

  /**
   * Capabilities the current user has for this feed
   */
  own_capabilities?: Array<FeedOwnCapability>;

  /**
   * Follow relationships where the feed owner’s feeds are following the current user's feeds
   */
  own_followings?: Array<FollowResponse>;

  /**
   * Follow relationships where the current user's feeds are following this feed
   */
  own_follows?: Array<FollowResponse>;

  /**
   * Custom data for the feed
   */
  custom?: Record<string, any>;

  location?: Location;

  own_membership?: FeedMemberResponse;
}

export interface FeedSuggestionResponse {
  activity_count: number;

  /**
   * When the feed was created
   */
  created_at: Date;

  /**
   * Description of the feed
   */
  description: string;

  /**
   * Fully qualified feed ID (group_id:id)
   */
  feed: string;

  /**
   * Number of followers of this feed
   */
  follower_count: number;

  /**
   * Number of feeds this feed follows
   */
  following_count: number;

  /**
   * Group this feed belongs to
   */
  group_id: string;

  /**
   * Unique identifier for the feed
   */
  id: string;

  /**
   * Number of members in this feed
   */
  member_count: number;

  /**
   * Name of the feed
   */
  name: string;

  /**
   * Number of pinned activities in this feed
   */
  pin_count: number;

  /**
   * When the feed was last updated
   */
  updated_at: Date;

  /**
   * User response object
   */
  created_by: UserResponse;

  /**
   * When the feed was deleted
   */
  deleted_at?: Date;

  reason?: string;

  recommendation_score?: number;

  /**
   * Visibility setting for the feed
   */

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  /**
   * Tags used for filtering feeds
   */
  filter_tags?: Array<string>;

  /**
   * Capabilities the current user has for this feed
   */
  own_capabilities?: Array<FeedOwnCapability>;

  /**
   * Follow relationships where the feed owner’s feeds are following the current user's feeds
   */
  own_followings?: Array<FollowResponse>;

  /**
   * Follow relationships where the current user's feeds are following this feed
   */
  own_follows?: Array<FollowResponse>;

  algorithm_scores?: Record<string, number>;

  /**
   * Custom data for the feed
   */
  custom?: Record<string, any>;

  location?: Location;

  own_membership?: FeedMemberResponse;
}

export interface FeedUpdatedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  feed: FeedResponse;

  /**
   * The type of event: "feeds.feed.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FeedViewResponse {
  /**
   * Unique identifier for the custom feed view
   */
  id: string;

  /**
   * When the feed view was last used
   */
  last_used_at?: Date;

  /**
   * Configured activity selectors
   */
  activity_selectors?: Array<ActivitySelectorConfigResponse>;

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface FeedVisibilityResponse {
  /**
   * Name of the feed visibility level
   */
  name: string;

  /**
   * List of permission policies
   */
  permissions: Array<Permission>;

  /**
   * Permission grants for each role
   */
  grants: Record<string, Array<string>>;
}

export interface FeedsActivityLocation {
  lat: number;

  lng: number;
}

export interface FeedsBookmarkResponse {
  created_at: Date;

  object_id: string;

  object_type: string;

  updated_at: Date;

  /**
   * User response object
   */
  user: UserResponse;

  activity_id?: string;

  custom?: Record<string, any>;
}

export interface FeedsEnrichedCollectionResponse {
  created_at: Date;

  id: string;

  name: string;

  status: string;

  updated_at: Date;

  user_id: string;

  custom: Record<string, any>;
}

export interface FeedsFeedResponse {
  activity_count: number;

  created_at: Date;

  description: string;

  feed: string;

  follower_count: number;

  following_count: number;

  group_id: string;

  id: string;

  member_count: number;

  name: string;

  pin_count: number;

  updated_at: Date;

  /**
   * User response object
   */
  created_by: UserResponse;

  deleted_at?: Date;

  visibility?: string;

  filter_tags?: Array<string>;

  custom?: Record<string, any>;

  location?: FeedsActivityLocation;
}

export interface FeedsModerationTemplateConfigPayload {
  /**
   * Map of data type names to their content types
   */
  data_types: Record<string, string>;

  /**
   * Key of the moderation configuration to use
   */
  config_key?: string;
}

export interface FeedsNotificationComment {
  comment: string;

  id: string;

  user_id: string;

  attachments?: Array<Attachment>;
}

export interface FeedsNotificationContext {
  target?: FeedsNotificationTarget;

  trigger?: FeedsNotificationTrigger;
}

export interface FeedsNotificationParentActivity {
  id: string;

  text?: string;

  type?: string;

  user_id?: string;

  attachments?: Array<Attachment>;
}

export interface FeedsNotificationTarget {
  id: string;

  name?: string;

  text?: string;

  type?: string;

  user_id?: string;

  attachments?: Array<Attachment>;

  comment?: FeedsNotificationComment;

  custom?: Record<string, any>;

  parent_activity?: FeedsNotificationParentActivity;
}

export interface FeedsNotificationTrigger {
  text: string;

  type: string;

  comment?: FeedsNotificationComment;

  custom?: Record<string, any>;
}

export interface FeedsPreferences {
  /**
   * Push notification preference for comments on user's activities. One of: all, none
   */

  comment?: 'all' | 'none';

  /**
   * Push notification preference for mentions in comments. One of: all, none
   */

  comment_mention?: 'all' | 'none';

  /**
   * Push notification preference for reactions on comments. One of: all, none
   */

  comment_reaction?: 'all' | 'none';

  /**
   * Push notification preference for replies to comments. One of: all, none
   */

  comment_reply?: 'all' | 'none';

  /**
   * Push notification preference for new followers. One of: all, none
   */

  follow?: 'all' | 'none';

  /**
   * Push notification preference for mentions in activities. One of: all, none
   */

  mention?: 'all' | 'none';

  /**
   * Push notification preference for reactions on user's activities or comments. One of: all, none
   */

  reaction?: 'all' | 'none';

  /**
   * Push notification preferences for custom activity types. Map of activity type to preference (all or none)
   */
  custom_activity_types?: Record<string, string>;
}

export interface FeedsPreferencesResponse {
  comment?: string;

  comment_mention?: string;

  comment_reaction?: string;

  comment_reply?: string;

  follow?: string;

  mention?: string;

  reaction?: string;

  custom_activity_types?: Record<string, string>;
}

export interface FeedsReactionGroupResponse {
  count: number;

  first_reaction_at: Date;

  last_reaction_at: Date;
}

export interface FeedsReactionResponse {
  activity_id: string;

  created_at: Date;

  type: string;

  updated_at: Date;

  /**
   * User response object
   */
  user: UserResponse;

  comment_id?: string;

  custom?: Record<string, any>;
}

export interface FeedsShareResponse {
  activity_id: string;

  created_at: Date;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface FeedsV3ActivityResponse {
  bookmark_count: number;

  comment_count: number;

  created_at: Date;

  hidden: boolean;

  id: string;

  popularity: number;

  preview: boolean;

  reaction_count: number;

  restrict_replies: string;

  score: number;

  share_count: number;

  type: string;

  updated_at: Date;

  visibility: string;

  attachments: Array<Attachment>;

  comments: Array<FeedsV3CommentResponse>;

  feeds: Array<string>;

  filter_tags: Array<string>;

  interest_tags: Array<string>;

  latest_reactions: Array<FeedsReactionResponse>;

  mentioned_users: Array<UserResponse>;

  own_bookmarks: Array<FeedsBookmarkResponse>;

  own_reactions: Array<FeedsReactionResponse>;

  collections: Record<string, FeedsEnrichedCollectionResponse>;

  custom: Record<string, any>;

  reaction_groups: Record<string, FeedsReactionGroupResponse>;

  search_data: Record<string, any>;

  /**
   * User response object
   */
  user: UserResponse;

  deleted_at?: Date;

  edited_at?: Date;

  expires_at?: Date;

  friend_reaction_count?: number;

  is_read?: boolean;

  is_seen?: boolean;

  is_watched?: boolean;

  moderation_action?: string;

  selector_source?: string;

  text?: string;

  visibility_tag?: string;

  friend_reactions?: Array<FeedsReactionResponse>;

  latest_shares?: Array<FeedsShareResponse>;

  current_feed?: FeedsFeedResponse;

  i18n?: Record<string, string>;

  location?: FeedsActivityLocation;

  metrics?: Record<string, number>;

  moderation?: ModerationV2Response;

  notification_context?: FeedsNotificationContext;

  parent?: FeedsV3ActivityResponse;

  poll?: PollResponseData;

  score_vars?: Record<string, any>;
}

export interface FeedsV3CommentResponse {
  bookmark_count: number;

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

  mentioned_users: Array<UserResponse>;

  own_reactions: Array<FeedsReactionResponse>;

  /**
   * User response object
   */
  user: UserResponse;

  controversy_score?: number;

  deleted_at?: Date;

  edited_at?: Date;

  parent_id?: string;

  text?: string;

  attachments?: Array<Attachment>;

  latest_reactions?: Array<FeedsReactionResponse>;

  custom?: Record<string, any>;

  i18n?: Record<string, string>;

  moderation?: ModerationV2Response;

  reaction_groups?: Record<string, FeedsReactionGroupResponse>;
}

export interface Field {
  short: boolean;

  title: string;

  value: string;
}

export interface FileUploadConfig {
  size_limit: number;

  allowed_file_extensions?: Array<string>;

  allowed_mime_types?: Array<string>;

  blocked_file_extensions?: Array<string>;

  blocked_mime_types?: Array<string>;
}

export interface FileUploadRequest {
  /**
   * file field
   */
  file?: string;

  user?: OnlyUserID;
}

export interface FileUploadResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * URL to the uploaded asset. Should be used to put to `asset_url` attachment field
   */
  file?: string;

  /**
   * URL of the file thumbnail for supported file formats. Should be put to `thumb_url` attachment field
   */
  thumb_url?: string;
}

export interface FilterConfigResponse {
  /**
   * LLM moderation labels available as filter values
   */
  llm_labels: Array<string>;

  /**
   * AI image moderation labels available as filter values. Reflects the app's effective image taxonomy: custom Bodyguard taxonomy when enabled, otherwise the standard L1 label set.
   */
  ai_image_labels?: Array<string>;

  /**
   * AI text moderation labels available as filter values
   */
  ai_text_labels?: Array<string>;

  /**
   * Moderation config keys present in the queue, available as filter values
   */
  config_keys?: Array<string>;

  /**
   * The moderation_payload.custom keys the app has configured as review-queue filter chips (via moderation_dashboard_preferences.filterable_custom_keys). Discovery hint for the dashboard only — the filter accepts any custom key regardless of this list.
   */
  filterable_custom_keys?: Array<string>;

  /**
   * AI image moderation labels available as filter values, as a map of L1 label to its L2 sub-labels. Reflects the app's effective image taxonomy: custom Bodyguard taxonomy when enabled, otherwise the standard catalogue of the org's enabled image providers.
   */
  ai_image_taxonomy?: Record<string, Array<string>>;
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

export interface FlagCountRuleParameters {
  threshold?: number;
}

export interface FlagDetails {
  original_text: string;

  automod?: AutomodDetailsResponse;
}

export interface FlagDetailsResponse {
  original_text: string;

  automod?: AutomodDetailsResponse;

  extra?: Record<string, any>;
}

export interface FlagFeedbackResponse {
  created_at: Date;

  message_id: string;

  labels: Array<LabelResponse>;
}

export interface FlagItemResponse {
  duration: string;

  /**
   * Unique identifier of the created moderation item
   */
  item_id: string;
}

export interface FlagMessageDetailsResponse {
  pin_changed?: boolean;

  should_enrich?: boolean;

  skip_push?: boolean;

  updated_by_id?: string;
}

export interface FlagRequest {
  /**
   * Unique identifier of the entity being flagged
   */
  entity_id: string;

  /**
   * Type of entity being flagged (e.g., message, user)
   */
  entity_type: string;

  /**
   * ID of the user who created the flagged entity
   */
  entity_creator_id?: string;

  /**
   * Optional explanation for why the content is being flagged
   */
  reason?: string;

  user_id?: string;

  /**
   * Additional metadata about the flag
   */
  custom?: Record<string, any>;

  moderation_payload?: ModerationPayload;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface FlagResponse {
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

  /**
   * Represents any chat message
   */
  target_message?: MessageResponse;

  /**
   * User response object
   */
  target_user?: UserResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface FlagUpdatedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  /**
   * User response object
   */
  created_by?: UserResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface FlagUserOptions {
  reason?: string;
}

export interface FloodConfig {
  allowlist?: Array<string>;

  identical?: FloodIdenticalConfig;

  similar?: FloodSimilarConfig;
}

export interface FloodIdenticalConfig {
  action?: string;

  enabled?: boolean;

  threshold?: number;

  time_window?: string;
}

export interface FloodIdenticalRuleParameters {
  threshold?: number;

  time_window?: string;

  allowlist?: Array<string>;
}

export interface FloodSimilarConfig {
  action?: string;

  enabled?: boolean;

  similarity_distance?: number;

  threshold?: number;

  time_window?: string;
}

export interface FloodSimilarRuleParameters {
  similarity_distance?: number;

  threshold?: number;

  time_window?: string;

  allowlist?: Array<string>;
}

export interface FollowBatchRequest {
  /**
   * List of follow relationships to create
   */
  follows: Array<FollowRequest>;

  /**
   * If true, auto-creates users referenced by source/target FIDs in the batch when they don't already exist. Server-side only. Defaults to false. This top-level field is the only supported batch/upsert create_users control.
   */
  create_users?: boolean;

  /**
   * If true, enriches the follow's source_feed and target_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;
}

export interface FollowBatchResponse {
  duration: string;

  /**
   * List of newly created follow relationships
   */
  created: Array<FollowResponse>;

  /**
   * List of current follow relationships
   */
  follows: Array<FollowResponse>;
}

export interface FollowCreatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: FollowResponse;

  /**
   * The type of event: "feeds.follow.created" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;
}

export interface FollowDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: FollowResponse;

  /**
   * The type of event: "feeds.follow.deleted" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;
}

export interface FollowRequest {
  /**
   * Fully qualified ID of the source feed
   */
  source: string;

  /**
   * Fully qualified ID of the target feed
   */
  target: string;

  /**
   * Maximum number of historical activities to copy from the target feed when the follow is first materialized. Not set = unlimited (default). 0 = copy nothing. Range: 0-1000.
   */
  activity_copy_limit?: number;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when create_notification_activity is true) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * Whether to create a notification activity for this follow
   */
  create_notification_activity?: boolean;

  /**
   * If true, auto-creates users referenced by the source and target FIDs when they don't already exist. Server-side only. Defaults to false. Use directly on single follow endpoints (Follow, GetOrCreateFollow). On batch endpoints (FollowBatch, GetOrCreateFollows), use the top-level create_users field; per-item follows[i].create_users is rejected.
   */
  create_users?: boolean;

  /**
   * If true, enriches the follow's source_feed and target_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  /**
   * Push preference for the follow relationship
   */

  push_preference?: 'all' | 'none';

  /**
   * Whether to skip push for this follow
   */
  skip_push?: boolean;

  /**
   * Status of the follow relationship. One of: accepted, pending, rejected
   */

  status?: 'accepted' | 'pending' | 'rejected';

  /**
   * Custom data for the follow relationship
   */
  custom?: Record<string, any>;
}

export interface FollowResponse {
  /**
   * When the follow relationship was created
   */
  created_at: Date;

  /**
   * Role of the follower (source user) in the follow relationship
   */
  follower_role: string;

  /**
   * Push preference for notifications. One of: all, none
   */

  push_preference: 'all' | 'none';

  /**
   * Status of the follow relationship. One of: accepted, pending, rejected
   */

  status: 'accepted' | 'pending' | 'rejected';

  /**
   * When the follow relationship was last updated
   */
  updated_at: Date;

  source_feed: FeedResponse;

  target_feed: FeedResponse;

  /**
   * When the follow request was accepted
   */
  request_accepted_at?: Date;

  /**
   * When the follow request was rejected
   */
  request_rejected_at?: Date;

  /**
   * Custom data for the follow relationship
   */
  custom?: Record<string, any>;
}

export interface FollowUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: FollowResponse;

  /**
   * The type of event: "feeds.follow.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;
}

export interface FrameRecordSettings {
  capture_interval_in_seconds: number;

  mode: 'available' | 'disabled' | 'auto-on';

  quality?: string;
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

export interface FriendReactionsOptions {
  /**
   * Default: false. When true, fetches friend reactions for activities.
   */
  enabled?: boolean;

  /**
   * Default: 3, Max: 10. The maximum number of friend reactions to return per activity.
   */
  limit?: number;

  /**
   * Default: 'following'. The type of friend relationship to use. 'following' = users you follow, 'mutual' = users with mutual follows. One of: following, mutual
   */

  type?: 'following' | 'mutual';
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

  blocked_user_ids: Array<string>;

  channel_mutes: Array<ChannelMute>;

  devices: Array<DeviceResponse>;

  mutes: Array<UserMuteResponse>;

  teams: Array<string>;

  custom: Record<string, any>;

  avg_response_time?: number;

  ban_expires?: Date;

  bypass_moderation?: boolean;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  latest_hidden_channels?: Array<string>;

  privacy_settings?: PrivacySettingsResponse;

  teams_role?: Record<string, string>;
}

export interface FutureChannelBanResponse {
  created_at: Date;

  expires?: Date;

  reason?: string;

  shadow?: boolean;

  /**
   * User response object
   */
  banned_by?: UserResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface GeofenceResponse {
  name: string;

  description?: string;

  type?: string;

  country_codes?: Array<string>;
}

export interface GeofenceSettings {
  names: Array<string>;
}

export interface GeofenceSettingsRequest {
  names?: Array<string>;
}

export interface GeofenceSettingsResponse {
  names: Array<string>;
}

export interface GetActionConfigResponse {
  duration: string;

  /**
   * Moderation action configs grouped by entity type, sorted by order ascending
   */
  action_config: Record<string, Array<ModerationActionConfigResponse>>;
}

export interface GetActiveCallsStatusResponse {
  duration: string;

  /**
   * End time of the status period
   */
  end_time: Date;

  /**
   * Start time of the status period
   */
  start_time: Date;

  metrics?: ActiveCallsMetrics;

  summary?: ActiveCallsSummary;
}

export interface GetActivityResponse {
  duration: string;

  activity: ActivityResponse;
}

export interface GetAppealResponse {
  duration: string;

  item?: AppealItemResponse;
}

export interface GetApplicationResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  app: AppResponseFields;
}

export interface GetBlockListResponse {
  duration: string;

  /**
   * Block list contains restricted words
   */
  blocklist?: BlockListResponse;
}

export interface GetBlockedUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Array of blocked user object
   */
  blocks: Array<BlockedUserResponse>;
}

export interface GetCallParticipantSessionMetricsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  is_publisher?: boolean;

  is_subscriber?: boolean;

  joined_at?: Date;

  publisher_type?: string;

  user_id?: string;

  user_session_id?: string;

  published_tracks?: Array<PublishedTrackMetrics>;

  client?: SessionClient;
}

export interface GetCallReportResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  session_id: string;

  report: ReportResponse;

  video_reactions?: Array<VideoReactionsResponse>;

  chat_activity?: ChatActivityStatsResponse;

  digest?: BroadcastDigest;

  session?: CallSessionResponse;
}

export interface GetCallResponse {
  duration: string;

  members: Array<MemberResponse>;

  own_capabilities: Array<OwnCapability>;

  /**
   * Represents a call
   */
  call: CallResponse;
}

export interface GetCallSessionParticipantStatsDetailsResponse {
  call_id: string;

  call_session_id: string;

  call_type: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  user_id: string;

  user_session_id: string;

  publisher?: ParticipantSeriesPublisherStats;

  subscriber?: ParticipantSeriesSubscriberStats;

  timeframe?: ParticipantSeriesTimeframe;

  user?: ParticipantSeriesUserStats;
}

export interface GetCallTypeResponse {
  created_at: Date;

  duration: string;

  name: string;

  updated_at: Date;

  grants: Record<string, Array<string>>;

  notification_settings: NotificationSettingsResponse;

  settings: CallSettingsResponse;

  external_storage?: string;
}

export interface GetCampaignResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  campaign?: CampaignResponse;

  users?: PagerResponse;
}

export interface GetChannelTypeResponse {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  connect_events: boolean;

  count_messages: boolean;

  created_at: Date;

  custom_events: boolean;

  delivery_events: boolean;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  mark_messages_pending: boolean;

  max_message_length: number;

  message_retention: string;

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

  commands: Array<Command>;

  permissions: Array<PolicyRequest>;

  grants: Record<string, Array<string>>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  allowed_flag_reasons?: Array<string>;

  blocklists?: Array<BlockListOptions>;

  /**
   * Sets thresholds for AI moderation
   */
  automod_thresholds?: Thresholds;

  chat_preferences?: ChatPreferences;
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

  /**
   * Sort order used for the replies (first, last, top, best, controversial)
   */
  sort: string;

  /**
   * Threaded listing of replies to the comment
   */
  comments: Array<ThreadedCommentResponse>;

  next?: string;

  prev?: string;
}

export interface GetCommentResponse {
  duration: string;

  comment: CommentResponse;
}

export interface GetCommentsResponse {
  duration: string;

  /**
   * Sort order used for the comments (first, last, top, best, controversial)
   */
  sort: string;

  /**
   * Threaded listing for the activity
   */
  comments: Array<ThreadedCommentResponse>;

  next?: string;

  prev?: string;
}

export interface GetConfigResponse {
  duration: string;

  config?: ConfigResponse;
}

export interface GetCustomPermissionResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  permission: Permission;
}

export interface GetDailyDigestResponse {
  date: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  status: string;

  generated_at?: string;

  retry_after?: number;

  revision?: number;

  schema_version?: string;

  broadcasts?: Array<BroadcastDigest>;

  call_sessions?: Array<DailyDigestCallSessionSummary>;

  digest_kinds?: Array<string>;

  broadcast_rollup?: BroadcastDailyRollup;
}

export interface GetDraftResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  draft: DraftResponse;
}

export interface GetEdgesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  edges: Array<EdgeResponse>;
}

export interface GetExternalStorageAWSS3Response {
  bucket: string;

  region: string;

  role_arn: string;

  path_prefix?: string;
}

export interface GetExternalStorageGCSResponse {
  bucket: string;

  credentials_set: boolean;

  path_prefix?: string;
}

export interface GetExternalStorageResponse {
  created_at: Date;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  type: string;

  updated_at: Date;

  aws_s3?: GetExternalStorageAWSS3Response;

  gcs?: GetExternalStorageGCSResponse;
}

export interface GetFeedCountsResponse {
  /**
   * Number of activities in the feed
   */
  activity_count: number;

  /**
   * Total number of comments on those activities, including nested replies
   */
  comment_count: number;

  duration: string;

  /**
   * Sum of activity_count and comment_count
   */
  total_count: number;
}

export interface GetFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface GetFeedViewResponse {
  duration: string;

  feed_view: FeedViewResponse;
}

export interface GetFeedVisibilityResponse {
  duration: string;

  feed_visibility: FeedVisibilityResponse;
}

export interface GetFeedsRateLimitsResponse {
  duration: string;

  /**
   * Rate limits for Android platform (endpoint name -> limit info)
   */
  android?: Record<string, LimitInfoResponse>;

  /**
   * Rate limits for iOS platform (endpoint name -> limit info)
   */
  ios?: Record<string, LimitInfoResponse>;

  /**
   * Rate limits for server-side platform (endpoint name -> limit info)
   */
  server_side?: Record<string, LimitInfoResponse>;

  /**
   * Rate limits for Unity platform (endpoint name -> limit info)
   */
  unity?: Record<string, LimitInfoResponse>;

  /**
   * Rate limits for Web platform (endpoint name -> limit info)
   */
  web?: Record<string, LimitInfoResponse>;
}

export interface GetFlagCountRequest {
  /**
   * ID of the user whose content was flagged
   */
  entity_creator_id: string;

  /**
   * Optional entity type filter (e.g., stream:chat:v1:message, stream:user)
   */
  entity_type?: string;
}

export interface GetFlagCountResponse {
  /**
   * Total number of flags against the specified user's content
   */
  count: number;

  duration: string;
}

export interface GetFollowSuggestionsResponse {
  duration: string;

  /**
   * List of suggested feeds to follow
   */
  suggestions: Array<FeedSuggestionResponse>;

  algorithm_used?: string;
}

export interface GetImportResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  import_task?: ImportTask;
}

export interface GetImportV2TaskResponse {
  app_pk: number;

  created_at: Date;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  id: string;

  product: string;

  state: number;

  updated_at: Date;

  settings: ImportV2TaskSettings;

  result?: Record<string, any>;
}

export interface GetManyMessagesResponse {
  duration: string;

  /**
   * List of messages
   */
  messages: Array<MessageResponse>;
}

export interface GetMessageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message: MessageWithChannelResponse;

  pending_message_metadata?: Record<string, string>;
}

export interface GetModerationRuleResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  rule?: ModerationRuleV2Response;
}

export interface GetOGResponse {
  duration: string;

  custom: Record<string, any>;

  /**
   * URL of detected video or audio
   */
  asset_url?: string;

  author_icon?: string;

  /**
   * og:site
   */
  author_link?: string;

  /**
   * og:site_name
   */
  author_name?: string;

  color?: string;

  fallback?: string;

  footer?: string;

  footer_icon?: string;

  /**
   * URL of detected image
   */
  image_url?: string;

  /**
   * extracted url from the text
   */
  og_scrape_url?: string;

  original_height?: number;

  original_width?: number;

  pretext?: string;

  /**
   * og:description
   */
  text?: string;

  /**
   * URL of detected thumb image
   */
  thumb_url?: string;

  /**
   * og:title
   */
  title?: string;

  /**
   * og:url
   */
  title_link?: string;

  /**
   * Attachment type, could be empty, image, audio or video
   */
  type?: string;

  actions?: Array<Action>;

  fields?: Array<Field>;

  giphy?: Images;
}

export interface GetOrCreateCallRequest {
  members_limit?: number;

  /**
   * if provided it sends a notification event to the members for this call
   */
  notify?: boolean;

  /**
   * if provided it sends a ring event to the members for this call
   */
  ring?: boolean;

  video?: boolean;

  /**
   * CallRequest is the payload for creating a call.
   */
  data?: CallRequest;
}

export interface GetOrCreateCallResponse {
  created: boolean;

  duration: string;

  members: Array<MemberResponse>;

  own_capabilities: Array<OwnCapability>;

  /**
   * Represents a call
   */
  call: CallResponse;
}

export interface GetOrCreateFeedGroupRequest {
  /**
   * Default visibility for the feed group, can be 'public', 'visible', 'followers', 'members', or 'private'. Defaults to 'visible' if not provided.
   */

  default_visibility?:
    'public' | 'visible' | 'followers' | 'members' | 'private';

  /**
   * Configuration for activity processors
   */
  activity_processors?: Array<ActivityProcessorConfig>;

  /**
   * Configuration for activity selectors
   */
  activity_selectors?: Array<ActivitySelectorConfig>;

  activity_filter?: ActivityFilterConfig;

  aggregation?: AggregationConfig;

  /**
   * Custom data for the feed group
   */
  custom?: Record<string, any>;

  notification?: NotificationConfig;

  push_notification?: PushNotificationConfig;

  ranking?: RankingConfig;

  stories?: StoriesConfig;
}

export interface GetOrCreateFeedGroupResponse {
  duration: string;

  /**
   * Indicates whether the feed group was created (true) or already existed (false)
   */
  was_created: boolean;

  feed_group: FeedGroupResponse;
}

export interface GetOrCreateFeedRequest {
  id_around?: string;

  limit?: number;

  next?: string;

  overwrite_interest_weights?: boolean;

  prev?: string;

  user_id?: string;

  view?: string;

  watch?: boolean;

  data?: FeedInput;

  /**
   * Options to skip specific enrichments to improve performance. Default is false (enrichments are included). Setting a field to true skips that enrichment.
   */
  enrichment_options?: EnrichmentOptions;

  external_ranking?: Record<string, any>;

  filter?: Record<string, any>;

  followers_pagination?: PagerRequest;

  following_pagination?: PagerRequest;

  /**
   * Options to control fetching reactions from friends (users you follow or have mutual follows with).
   */
  friend_reactions_options?: FriendReactionsOptions;

  interest_weights?: Record<string, number>;

  member_pagination?: PagerRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface GetOrCreateFeedResponse {
  created: boolean;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  activities: Array<ActivityResponse>;

  aggregated_activities: Array<AggregatedActivityResponse>;

  followers: Array<FollowResponse>;

  following: Array<FollowResponse>;

  members: Array<FeedMemberResponse>;

  pinned_activities: Array<ActivityPinResponse>;

  feed: FeedResponse;

  next?: string;

  prev?: string;

  followers_pagination?: PagerResponse;

  following_pagination?: PagerResponse;

  member_pagination?: PagerResponse;

  notification_status?: NotificationStatusResponse;
}

export interface GetOrCreateFeedViewRequest {
  /**
   * Configuration for selecting activities
   */
  activity_selectors?: Array<ActivitySelectorConfig>;

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface GetOrCreateFeedViewResponse {
  duration: string;

  /**
   * Indicates whether the feed view was newly created (true) or already existed (false)
   */
  was_created: boolean;

  feed_view: FeedViewResponse;
}

export interface GetOrCreateFollowResponse {
  /**
   * True if the follow was newly created by this request; false if it already existed
   */
  created: boolean;

  duration: string;

  follow: FollowResponse;

  /**
   * Whether a notification activity was successfully created (only set when the follow was newly created)
   */
  notification_created?: boolean;
}

export interface GetOrCreateUnfollowRequest {
  /**
   * Fully qualified ID of the source feed
   */
  source: string;

  /**
   * Fully qualified ID of the target feed
   */
  target: string;

  /**
   * Whether to delete the corresponding notification activity (default: false)
   */
  delete_notification_activity?: boolean;

  /**
   * If true, enriches the follow's source_feed and target_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  /**
   * When true, activities from the unfollowed feed will remain in the source feed's timeline (default: false)
   */
  keep_history?: boolean;
}

export interface GetOrCreateUnfollowResponse {
  /**
   * True if a follow was found and removed by this request; false if no follow existed
   */
  deleted: boolean;

  duration: string;

  follow?: FollowResponse;
}

export interface GetPinnedMessagesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Messages
   */
  messages: Array<MessageResponse>;
}

export interface GetPredefinedFilterResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  predefined_filter?: PredefinedFilterResponse;
}

export interface GetPushTemplatesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  templates: Array<PushTemplateResponse>;
}

export interface GetRateLimitsResponse {
  duration: string;

  /**
   * Map of endpoint rate limits for the Android platform
   */
  android?: Record<string, LimitInfoResponse>;

  /**
   * Map of endpoint rate limits for the iOS platform
   */
  ios?: Record<string, LimitInfoResponse>;

  /**
   * Map of endpoint rate limits for the server-side platform
   */
  server_side?: Record<string, LimitInfoResponse>;

  /**
   * Map of endpoint rate limits for the Unity platform
   */
  unity?: Record<string, LimitInfoResponse>;

  /**
   * Map of endpoint rate limits for the web platform
   */
  web?: Record<string, LimitInfoResponse>;
}

export interface GetReactionsResponse {
  duration: string;

  /**
   * List of reactions
   */
  reactions: Array<ReactionResponse>;
}

export interface GetRepliesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  messages: Array<MessageResponse>;
}

export interface GetRetentionPolicyResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  policies: Array<RetentionPolicy>;
}

export interface GetRetentionPolicyRunsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;
}

export interface GetRetentionPolicyRunsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  runs: Array<RetentionRunResponse>;

  next?: string;

  prev?: string;
}

export interface GetReviewQueueItemResponse {
  duration: string;

  item?: ReviewQueueItemResponse;
}

export interface GetSegmentResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  segment?: SegmentResponse;
}

export interface GetSetupSessionResponse {
  duration: string;

  setup_session?: SetupSession;
}

export interface GetTaskResponse {
  created_at: Date;

  duration: string;

  /**
   * Current status of task
   */
  status: string;

  /**
   * ID of task
   */
  task_id: string;

  updated_at: Date;

  error?: ErrorResult;

  /**
   * Result produced by task after completion
   */
  result?: Record<string, any>;
}

export interface GetThreadResponse {
  duration: string;

  thread: ThreadStateResponse;
}

export interface GetUserGroupResponse {
  duration: string;

  user_group?: UserGroupResponse;
}

export interface GetUserInterestsResponse {
  duration: string;

  /**
   * Top-N interest tags sorted by descending count, then alphabetically by tag
   */
  interests: Array<InterestTagResponse>;
}

export interface GoLiveRequest {
  recording_storage_name?: string;

  start_closed_caption?: boolean;

  start_composite_recording?: boolean;

  start_hls?: boolean;

  start_individual_recording?: boolean;

  start_raw_recording?: boolean;

  start_recording?: boolean;

  start_transcription?: boolean;

  transcription_storage_name?: string;
}

export interface GoLiveResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents a call
   */
  call: CallResponse;
}

export interface GoogleVisionConfig {
  enabled?: boolean;
}

export interface GroupedChannelsBucket {
  /**
   * Channels returned for this bucket
   */
  channels: Array<ChannelStateResponseFields>;

  /**
   * Cursor for the next page of this group
   */
  next?: string;

  /**
   * Cursor for the previous page of this group
   */
  prev?: string;

  /**
   * Unread channels currently classified into this bucket
   */
  unread_channels?: number;
}

export interface GroupedChannelsGroupRequest {
  limit?: number;

  next?: string;

  prev?: string;
}

export interface GroupedQueryChannelsRequest {
  /**
   * Default max channels per group (default 10)
   */
  limit?: number;

  user_id?: string;

  /**
   * Groups to return, keyed by group name. Each group can define limit, next, or prev. 'next' and 'prev' cursors are only allowed when the request contains exactly one group; multi-group pagination is rejected.
   */
  groups?: Record<string, GroupedChannelsGroupRequest>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface GroupedQueryChannelsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Predefined channel groups keyed by group name
   */
  groups: Record<string, GroupedChannelsBucket>;
}

export interface GroupedStatsResponse {
  name: string;

  unique: number;
}

export interface HLSSettings {
  auto_on: boolean;

  enabled: boolean;

  quality_tracks: Array<string>;

  layout?: LayoutSettings;
}

export interface HLSSettingsRequest {
  /**
   * Quality tracks for HLS. One of: 360p, 480p, 720p, 1080p, 1440p, portrait-360x640, portrait-480x854, portrait-720x1280, portrait-1080x1920, portrait-1440x2560
   */
  quality_tracks: Array<string>;

  /**
   * Whether HLS broadcasting should start automatically
   */
  auto_on?: boolean;

  /**
   * Whether HLS broadcasting is enabled
   */
  enabled?: boolean;

  layout?: LayoutSettingsRequest;
}

export interface HLSSettingsResponse {
  auto_on: boolean;

  enabled: boolean;

  quality_tracks: Array<string>;

  layout: LayoutSettingsResponse;
}

export interface HarmConfig {
  cooldown_period?: number;

  severity?: number;

  threshold?: number;

  action_sequences?: Array<ActionSequence>;

  harm_types?: Array<string>;
}

export interface HideChannelRequest {
  /**
   * Whether to clear message history of the channel or not
   */
  clear_history?: boolean;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface HideChannelResponse {
  /**
   * Duration of the request in milliseconds
   */
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

export interface IPContentCountRuleParameters {
  threshold?: number;

  time_window?: string;
}

export interface IPFlagCountRuleParameters {
  severity?: string;

  threshold?: number;

  time_window?: string;

  harm_labels?: Array<string>;
}

export interface ImageContentParameters {
  label_operator?: string;

  min_confidence?: number;

  harm_labels?: Array<string>;
}

export interface ImageData {
  frames: string;

  height: string;

  size: string;

  url: string;

  width: string;
}

export interface ImageRuleParameters {
  min_confidence?: number;

  threshold?: number;

  time_window?: string;

  harm_labels?: Array<string>;
}

export interface ImageSize {
  /**
   * Crop mode. One of: top, bottom, left, right, center
   */
  crop?: string;

  /**
   * Target image height
   */
  height?: number;

  /**
   * Resize method. One of: clip, crop, scale, fill
   */
  resize?: string;

  /**
   * Target image width
   */
  width?: number;
}

export interface ImageUploadRequest {
  file?: string;

  /**
   * field with JSON-encoded array of image size configurations
   */
  upload_sizes?: Array<ImageSize>;

  user?: OnlyUserID;
}

export interface ImageUploadResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  file?: string;

  thumb_url?: string;

  /**
   * Array of image size configurations
   */
  upload_sizes?: Array<ImageSize>;
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

export interface ImportBlockListRequest {
  items: Array<string>;

  chunk_size?: number;
}

export interface ImportBlockListResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  task_id: string;
}

export interface ImportTask {
  created_at: Date;

  id: string;

  mode: string;

  path: string;

  state: string;

  updated_at: Date;

  history: Array<ImportTaskHistory>;

  size?: number;
}

export interface ImportTaskHistory {
  created_at: Date;

  next_state: string;

  prev_state: string;
}

export interface ImportV2TaskItem {
  app_pk: number;

  created_at: Date;

  id: string;

  product: string;

  state: number;

  updated_at: Date;

  settings: ImportV2TaskSettings;

  result?: Record<string, any>;
}

export interface ImportV2TaskSettings {
  merge_custom?: boolean;

  mode?: string;

  path?: string;

  skip_references_check?: boolean;

  use_import_time_as_op_time?: boolean;

  s3?: ImportV2TaskSettingsS3;
}

export interface ImportV2TaskSettingsS3 {
  bucket?: string;

  dir?: string;

  region?: string;
}

export interface Incident {
  from: string;

  peak_concurrency: number;

  to: string;

  viewers_interrupted: number;
}

export interface IndividualRecordSettings {
  mode: 'available' | 'disabled' | 'auto-on';

  output_types?: Array<string>;
}

export interface IndividualRecordingResponse {
  status: string;
}

export interface IndividualRecordingSettingsRequest {
  /**
   * Recording mode. One of: available, disabled, auto-on
   */

  mode: 'available' | 'disabled' | 'auto-on';

  /**
   * Output types to include: audio_only, video_only, audio_video, screenshare_audio_only, screenshare_video_only, screenshare_audio_video
   */
  output_types?: Array<string>;
}

export interface IndividualRecordingSettingsResponse {
  mode: 'available' | 'disabled' | 'auto-on';

  output_types?: Array<string>;
}

export interface IngressAudioEncodingOptions {
  bitrate: number;

  channels: '1' | '2';

  enable_dtx: boolean;
}

export interface IngressAudioEncodingOptionsRequest {
  bitrate: number;

  channels: '1' | '2';

  enable_dtx?: boolean;
}

export interface IngressAudioEncodingResponse {
  bitrate: number;

  channels: number;

  enable_dtx: boolean;
}

export interface IngressErrorEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Human-readable error message
   */
  error: string;

  /**
   * Unique identifier for the stream
   */
  ingress_stream_id: string;

  /**
   * User who was streaming
   */
  user_id: string;

  /**
   * The type of event: "ingress.error" in this case
   */
  type: string;

  /**
   * Error code
   */
  code?: string;
}

export interface IngressSettings {
  enabled: boolean;

  audio_encoding_options?: IngressAudioEncodingOptions;

  video_encoding_options?: Record<string, IngressVideoEncodingOptions>;
}

export interface IngressSettingsRequest {
  enabled?: boolean;

  audio_encoding_options?: IngressAudioEncodingOptionsRequest;

  video_encoding_options?: Record<string, IngressVideoEncodingOptionsRequest>;
}

export interface IngressSettingsResponse {
  enabled: boolean;

  audio_encoding_options?: IngressAudioEncodingResponse;

  video_encoding_options?: Record<string, IngressVideoEncodingResponse>;
}

export interface IngressSource {
  fps: number;

  height: number;

  width: number;
}

export interface IngressSourceRequest {
  fps: '30' | '60';

  height: number;

  width: number;
}

export interface IngressSourceResponse {
  fps: number;

  height: number;

  width: number;
}

export interface IngressStartedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Unique identifier for this stream
   */
  ingress_stream_id: string;

  /**
   * Streaming protocol (e.g., 'rtmps', 'srt', 'rtmp', 'rtsp')
   */
  publisher_type: string;

  /**
   * User who started the stream
   */
  user_id: string;

  /**
   * The type of event: "ingress.started" in this case
   */
  type: string;

  /**
   * Client IP address
   */
  client_ip?: string;

  /**
   * Streaming client software name (e.g., 'OBS Studio')
   */
  client_name?: string;

  /**
   * Client software version
   */
  version?: string;
}

export interface IngressStoppedEvent {
  call_cid: string;

  created_at: Date;

  /**
   * Unique identifier for the stream
   */
  ingress_stream_id: string;

  /**
   * User who was streaming
   */
  user_id: string;

  /**
   * The type of event: "ingress.stopped" in this case
   */
  type: string;
}

export interface IngressVideoEncodingOptions {
  layers: Array<IngressVideoLayer>;

  source?: IngressSource;
}

export interface IngressVideoEncodingOptionsRequest {
  layers: Array<IngressVideoLayerRequest>;

  source: IngressSourceRequest;
}

export interface IngressVideoEncodingResponse {
  layers: Array<IngressVideoLayerResponse>;

  source: IngressSourceResponse;
}

export interface IngressVideoLayer {
  bitrate: number;

  codec: 'h264' | 'vp8';

  frame_rate: number;

  max_dimension: number;

  min_dimension: number;
}

export interface IngressVideoLayerRequest {
  bitrate: number;

  codec: 'h264' | 'vp8';

  frame_rate_limit: number;

  max_dimension: number;

  min_dimension: number;
}

export interface IngressVideoLayerResponse {
  bitrate: number;

  codec: string;

  frame_rate_limit: number;

  max_dimension: number;

  min_dimension: number;
}

export interface InsertActionLogRequest {
  /**
   * Type of moderation action taken
   */
  action_type: string;

  /**
   * ID of the user who created the entity
   */
  entity_creator_id: string;

  /**
   * ID of the entity the action was taken on
   */
  entity_id: string;

  /**
   * Type of entity the action was taken on
   */
  entity_type: string;

  /**
   * Reason for the action
   */
  reason?: string;

  /**
   * Type of reporter; 'api_integration' when the action was triggered by an API integration call with no authenticated user
   */
  reporter_type?: string;

  /**
   * ID of the user who triggered the action; empty for automated actions
   */
  reporter_user_id?: string;

  /**
   * Custom metadata for the action log
   */
  custom?: Record<string, any>;
}

export interface InsertActionLogResponse {
  duration: string;
}

export interface InterestTagResponse {
  /**
   * Number of distinct reacted-to activities tagged with this value
   */
  count: number;

  /**
   * The interest tag value
   */
  tag: string;
}

export interface JoinCallAPIMetrics {
  failures: number;

  total: number;

  latency?: ActiveCallsLatencyStats;
}

export interface Joins {
  reason: string;

  disconnect_reasons: Record<string, number>;

  failure_stages: Record<string, number>;

  join_attempts?: number;

  join_success_rate?: number;
}

export interface KeyframeOCRRuleParameters {
  threshold?: number;

  time_window?: string;

  harm_labels?: Array<string>;
}

export interface KeyframeRuleParameters {
  min_confidence?: number;

  threshold?: number;

  time_window?: string;

  harm_labels?: Array<string>;
}

export interface KickUserRequest {
  /**
   * The user to kick
   */
  user_id: string;

  /**
   * If true, also block the user from rejoining the call
   */
  block?: boolean;

  /**
   * Server-side: ID of the user performing the action
   */
  kicked_by_id?: string;

  /**
   * User request object
   */
  kicked_by?: UserRequest;
}

export interface KickUserResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface KickedUserEvent {
  call_cid: string;

  created_at: Date;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.kicked_user" in this case
   */
  type: string;

  /**
   * User response object
   */
  kicked_by_user?: UserResponse;
}

export interface LLMConfig {
  app_context?: string;

  async?: boolean;

  enabled?: boolean;

  rules?: Array<LLMRule>;

  severity_descriptions?: Record<string, string>;
}

export interface LLMRule {
  label: string;

  action?:
    | 'flag'
    | 'shadow'
    | 'remove'
    | 'bounce'
    | 'bounce_flag'
    | 'bounce_remove'
    | 'keep';

  description?: string;

  severity_rules?: Array<BodyguardSeverityRule>;
}

export interface LabelResponse {
  name: string;

  harm_labels?: Array<string>;

  phrase_list_ids?: Array<number>;
}

export interface LabelResultResponse {
  /**
   * Category
   */
  category: string;

  /**
   * The moderated content
   */
  content: string;

  content_type: string;

  /**
   * Timestamp
   */
  created_at: Date;

  /**
   * High-level harm category
   */
  harm_type: string;

  /**
   * Unique identifier
   */
  id: string;

  /**
   * Detected language
   */
  language: string;

  /**
   * Provider recommended action
   */
  recommended_action: string;

  /**
   * Severity level
   */
  severity: string;

  /**
   * Moderation labels
   */
  labels: Array<string>;

  /**
   * Customer-supplied identifier for the moderated content
   */
  content_id?: string;

  /**
   * Who the content is directed at (USER, GROUP, EVERYONE, NONE, etc.)
   */
  directed_at?: string;

  /**
   * The stored content with every non-whitespace character masked. Present only when recommended_action is not 'keep'. Derived at runtime and never stored.
   */
  fully_masked_content?: string;

  /**
   * Content with blocklisted tokens masked (when a blocklist rule with action=mask rewrote the original)
   */
  masked_content?: string;

  policy?: string;

  /**
   * Customer-supplied user identifier for the content author
   */
  user_id?: string;
}

export interface LabelThresholds {
  /**
   * Threshold for automatic message block
   */
  block?: number;

  /**
   * Threshold for automatic message flag
   */
  flag?: number;
}

export interface LabelsRequest {
  /**
   * Content to moderate
   */
  content: string;

  /**
   * Optional category for filtering (max 128 chars)
   */
  category?: string;

  /**
   * Customer-supplied identifier for the moderated content, for tracing
   */
  content_id?: string;

  /**
   * Type of content: 'text' (default), 'message', or 'username'. Stored as-sent; only 'username' routes to the username moderation API.
   */

  content_type?: 'text' | 'message' | 'username';

  /**
   * When true, run moderation and return labels without persisting the result. Useful for one-off checks (e.g. UI testers) that should not be recorded in the stored history.
   */
  dry_run?: boolean;

  /**
   * Optional moderation policy key (max 128 chars). For username moderation, set this to a policy whose key starts with 'username:' (e.g. 'username:default') to opt into the low-latency fast-path: blocklists (customer + Stream-managed defaults) short-circuit the LLM, and the LLM fallback uses gpt-4.1-nano with a 24h Valkey verdict cache. Without a 'username:' prefix the request falls through to the standard Bodyguard Analyze v1 username path.
   */
  policy?: string;

  /**
   * Optional customer-supplied user identifier for the content author (max 256 chars). Enables filtering stored results by user_id.
   */
  user_id?: string;
}

export interface LabelsResponse {
  duration: string;

  /**
   * Provider recommended action
   */
  recommended_action: string;

  /**
   * Customer-supplied identifier for the moderated content, for tracing
   */
  content_id?: string;

  /**
   * Who the content is directed at (USER, GROUP, EVERYONE, NONE, etc.), when the provider exposes it
   */
  directed_at?: string;

  /**
   * The original content with every non-whitespace character masked. Present only when recommended_action is not 'keep'. Derived at runtime and never stored.
   */
  fully_masked_content?: string;

  /**
   * High-level harm category
   */
  harm_type?: string;

  /**
   * Detected language
   */
  language?: string;

  /**
   * Content with blocklisted tokens masked or substituted. Present only when a blocklist rewrote the original content.
   */
  masked_content?: string;

  /**
   * Severity level
   */
  severity?: string;

  /**
   * Moderation labels detected
   */
  labels?: Array<string>;
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

export interface LimitInfoResponse {
  /**
   * The maximum number of API calls allowed per time window
   */
  limit: number;

  /**
   * The number of remaining calls in the current window
   */
  remaining: number;

  /**
   * The Unix timestamp when the rate limit resets
   */
  reset: number;
}

export interface LimitsSettings {
  max_participants_exclude_roles: Array<string>;

  max_duration_seconds?: number;

  max_participants?: number;

  max_participants_exclude_owner?: boolean;
}

export interface LimitsSettingsRequest {
  max_duration_seconds?: number;

  max_participants?: number;

  max_participants_exclude_owner?: boolean;

  max_participants_exclude_roles?: Array<string>;
}

export interface LimitsSettingsResponse {
  max_participants_exclude_roles: Array<string>;

  max_duration_seconds?: number;

  max_participants?: number;

  max_participants_exclude_owner?: boolean;
}

export interface ListBlockListResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  blocklists: Array<BlockListResponse>;

  next_cursor?: string;
}

export interface ListCallTypeResponse {
  duration: string;

  call_types: Record<string, CallTypeResponse>;
}

export interface ListChannelTypesResponse {
  duration: string;

  /**
   * Object with all channel types
   */
  channel_types: Record<string, ChannelTypeConfig>;
}

export interface ListCommandsResponse {
  duration: string;

  /**
   * List of commands
   */
  commands: Array<Command>;
}

export interface ListDevicesResponse {
  duration: string;

  /**
   * List of devices
   */
  devices: Array<DeviceResponse>;
}

export interface ListExternalStorageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  external_storages: Record<string, ExternalStorageResponse>;
}

export interface ListFeedGroupsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  groups: Record<string, FeedGroupResponse>;
}

export interface ListFeedViewsResponse {
  duration: string;

  /**
   * Map of feed view ID to feed view
   */
  views: Record<string, FeedViewResponse>;
}

export interface ListFeedVisibilitiesResponse {
  duration: string;

  /**
   * Map of feed visibility configurations by name
   */
  feed_visibilities: Record<string, FeedVisibilityResponse>;
}

export interface ListImportV2TasksResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  import_tasks: Array<ImportV2TaskItem>;

  next?: string;

  prev?: string;
}

export interface ListImportsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  import_tasks: Array<ImportTask>;
}

export interface ListPermissionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  permissions: Array<Permission>;
}

export interface ListPushProvidersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  push_providers: Array<PushProviderResponse>;
}

export interface ListQueuesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  queues: Array<ModerationQueueResponse>;
}

export interface ListRecordingsResponse {
  duration: string;

  recordings: Array<CallRecording>;
}

export interface ListRolesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  roles: Array<Role>;
}

export interface ListSIPInboundRoutingRuleResponse {
  duration: string;

  /**
   * List of SIP Inbound Routing Rules for the application
   */
  sip_inbound_routing_rules: Array<SIPInboundRoutingRuleResponse>;
}

export interface ListSIPTrunksResponse {
  duration: string;

  /**
   * List of SIP trunks for the application
   */
  sip_trunks: Array<SIPTrunkResponse>;
}

export interface ListTranscriptionsResponse {
  duration: string;

  /**
   * List of transcriptions for the call
   */
  transcriptions: Array<CallTranscription>;
}

export interface ListUserGroupsResponse {
  duration: string;

  /**
   * List of user groups
   */
  user_groups: Array<UserGroupResponse>;
}

export interface Location {
  /**
   * Latitude coordinate
   */
  lat: number;

  /**
   * Longitude coordinate
   */
  lng: number;
}

export interface LocationResponse {
  /**
   * Continent code
   */
  continent_code: string;

  /**
   * Country ISO code
   */
  country_iso_code: string;

  /**
   * Subdivision ISO code
   */
  subdivision_iso_code: string;
}

export interface MarkActivityRequest {
  /**
   * Whether to mark all activities as read
   */
  mark_all_read?: boolean;

  /**
   * Whether to mark all activities as seen
   */
  mark_all_seen?: boolean;

  user_id?: string;

  /**
   * List of activity IDs to mark as read
   */
  mark_read?: Array<string>;

  /**
   * List of activity IDs to mark as seen
   */
  mark_seen?: Array<string>;

  /**
   * List of activity IDs to mark as watched (for stories)
   */
  mark_watched?: Array<string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MarkChannelsReadRequest {
  user_id?: string;

  /**
   * Map of channel ID to last read message ID
   */
  read_by_channel?: Record<string, string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MarkDeliveredRequest {
  latest_delivered_messages?: Array<DeliveredMessagePayload>;
}

export interface MarkDeliveredResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface MarkReadRequest {
  /**
   * ID of the message that is considered last read by client
   */
  message_id?: string;

  /**
   * Optional Thread ID to specifically mark a given thread as read
   */
  thread_id?: string;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MarkReadResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  event?: MarkReadResponseEvent;
}

export interface MarkReadResponseEvent {
  channel_id: string;

  channel_type: string;

  cid: string;

  created_at: Date;

  type: string;

  channel_last_message_at?: Date;

  last_read_message_id?: string;

  team?: string;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  thread?: ThreadResponse;

  user?: UserResponseCommonFields;
}

export interface MarkReviewedRequestPayload {
  /**
   * Maximum content items to mark as reviewed
   */
  content_to_mark_as_reviewed_limit?: number;

  /**
   * Reason for the appeal decision
   */
  decision_reason?: string;

  /**
   * Skip marking content as reviewed
   */
  disable_marking_content_as_reviewed?: boolean;
}

export interface MarkUnreadRequest {
  /**
   * ID of the message from where the channel is marked unread
   */
  message_id?: string;

  /**
   * Timestamp of the message from where the channel is marked unread
   */
  message_timestamp?: Date;

  /**
   * Mark a thread unread, specify one of the thread, message timestamp, or message id
   */
  thread_id?: string;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MatchedContent {
  /**
   * The `content_ids[label]` value supplied on the `/analyze` request that contributed this entry.
   */
  id: string;

  /**
   * `content_published_at` from the contributing `/analyze` request, or server receive time when that field was omitted.
   */
  published_at: Date;

  /**
   * Content type that contributed this entry: `image` or `text`.
   */
  type: string;

  /**
   * Image-classification entries only. Aggregate (max) confidence score across the entry's classifications + sub-classifications. Absent on text and OCR entries.
   */
  confidence?: number;

  /**
   * Text and OCR entries. Aggregate (max) Bodyguard severity level (`LOW` / `MEDIUM` / `HIGH` / `CRITICAL`). Absent on image-classification entries.
   */
  severity?: string;

  text?: string;

  /**
   * Image-classification entries (keyframe rule, Type=image) carry nested L1 → L2 classifications. Text entries (closed_caption rule, Type=text) carry flat label + severity. Resolved against the app's effective taxonomy on the image side.
   */
  classifications?: Array<Classification>;

  /**
   * OCR entries only (keyframe_ocr rule, Type=image). Bodyguard labels that fired against the keyframe's OCR-extracted text (e.g. `INSULT`, `HATE_SPEECH`). Distinct from `classifications` so consumers can route OCR matches separately from image-classification matches.
   */
  ocr_classifications?: Array<Classification>;
}

export interface MaxStreakChangedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface MemberAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  member: ChannelMemberResponse;

  /**
   * The type of event: "member.added" in this case
   */
  type: string;

  /**
   * The ID of the channel to which the member was added
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel to which the member was added
   */
  channel_type?: string;

  /**
   * The CID of the channel to which the member was added
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
}

export interface MemberRemovedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  member: ChannelMemberResponse;

  /**
   * The type of event: "member.removed" in this case
   */
  type: string;

  /**
   * The ID of the channel from which the member was removed
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel from which the member was removed
   */
  channel_type?: string;

  /**
   * The CID of the channel from which the member was removed
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
}

export interface MemberRequest {
  user_id: string;

  role?: string;

  /**
   * Custom data for this object
   */
  custom?: Record<string, any>;
}

export interface MemberResponse {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  user_id: string;

  /**
   * Custom member response data
   */
  custom: Record<string, any>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * Date/time of deletion
   */
  deleted_at?: Date;

  role?: string;
}

export interface MemberUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  member: ChannelMemberResponse;

  /**
   * The type of event: "member.updated" in this case
   */
  type: string;

  /**
   * The ID of the channel in which the member was updated
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel in which the member was updated
   */
  channel_type?: string;

  /**
   * The CID of the channel in which the member was updated
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
}

export interface MembersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of found members
   */
  members: Array<ChannelMemberResponse>;
}

export interface MembershipLevelResponse {
  /**
   * When the membership level was created
   */
  created_at: Date;

  /**
   * Unique identifier for the membership level
   */
  id: string;

  /**
   * Display name for the membership level
   */
  name: string;

  /**
   * Priority level
   */
  priority: number;

  /**
   * When the membership level was last updated
   */
  updated_at: Date;

  /**
   * Activity tags this membership level gives access to
   */
  tags: Array<string>;

  /**
   * Description of the membership level
   */
  description?: string;

  /**
   * Custom data for the membership level
   */
  custom?: Record<string, any>;
}

export interface MessageActionRequest {
  /**
   * ReadOnlyData to execute command with
   */
  form_data: Record<string, string>;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MessageActionResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;
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
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Whether the message was hard deleted
   */
  hard_delete: boolean;

  message_id: string;

  custom: Record<string, any>;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "message.deleted" in this case
   */
  type: string;

  /**
   * The ID of the channel where the message was sent
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel where the message was sent
   */
  channel_type?: string;

  /**
   * The CID of the channel where the message was sent
   */
  cid?: string;

  /**
   * Whether the message was deleted only for the current user
   */
  deleted_for_me?: boolean;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  user?: UserResponseCommonFields;
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

  details?: FlagDetailsResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  moderation_feedback?: FlagFeedbackResponse;

  /**
   * Result of the message moderation
   */
  moderation_result?: MessageModerationResult;

  /**
   * User response object
   */
  reviewed_by?: UserResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface MessageFlaggedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  message_id: string;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "message.flagged" in this case
   */
  type: string;

  /**
   * The ID of the channel where the message was sent
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel where the message was sent
   */
  channel_type?: string;

  /**
   * The CID of the channel where the message was sent
   */
  cid?: string;

  /**
   * The reason for the flag
   */
  reason?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  /**
   * The total number of flags for the user
   */
  total_flags?: number;

  channel_custom?: Record<string, any>;

  /**
   * Custom data
   */
  custom?: Record<string, any>;

  /**
   * Result of the message moderation
   */
  details?: MessageModerationResult;

  flag?: FlagResponse;

  user?: UserResponseCommonFields;
}

export interface MessageHistoryEntryResponse {
  is_deleted: boolean;

  message_id: string;

  message_updated_at: Date;

  message_updated_by_id: string;

  text: string;

  attachments: Array<Attachment>;

  custom: Record<string, any>;
}

export interface MessageModerationResult {
  /**
   * Action taken by automod
   */
  action: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * ID of the message
   */
  message_id: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * Whether user has bad karma
   */
  user_bad_karma: boolean;

  /**
   * Karma of the user
   */
  user_karma: number;

  /**
   * Word that was blocked
   */
  blocked_word?: string;

  /**
   * Name of the blocklist
   */
  blocklist_name?: string;

  /**
   * User who moderated the message
   */
  moderated_by?: string;

  ai_moderation_response?: ModerationResponse;

  /**
   * Sets thresholds for AI moderation
   */
  moderation_thresholds?: Thresholds;
}

export interface MessageNewEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  message_id: string;

  /**
   * The number of watchers
   */
  watcher_count: number;

  custom: Record<string, any>;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "message.new" in this case
   */
  type: string;

  /**
   * The ID of the channel where the message was sent
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel where the message was sent
   */
  channel_type?: string;

  /**
   * The CID of the channel where the message was sent
   */
  cid?: string;

  /**
   * The author of the parent message
   */
  parent_author?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  total_unread_count?: number;

  unread_channels?: number;

  /**
   * The number of unread messages
   */
  unread_count?: number;

  /**
   * The participants of the thread
   */
  thread_participants?: Array<UserResponseCommonFields>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  channel_custom?: Record<string, any>;

  grouped_unread_channels?: Record<string, number>;

  user?: UserResponseCommonFields;
}

export interface MessageOptions {
  include_thread_participants?: boolean;

  member_custom_include?: Array<string>;
}

export interface MessagePaginationParams {
  /**
   * The timestamp to get messages with a created_at timestamp greater than
   */
  created_at_after?: Date;

  /**
   * The timestamp to get messages with a created_at timestamp greater than or equal to
   */
  created_at_after_or_equal?: Date;

  /**
   * The result will be a set of messages, that are both older and newer than the created_at timestamp provided, distributed evenly around the timestamp
   */
  created_at_around?: Date;

  /**
   * The timestamp to get messages with a created_at timestamp smaller than
   */
  created_at_before?: Date;

  /**
   * The timestamp to get messages with a created_at timestamp smaller than or equal to
   */
  created_at_before_or_equal?: Date;

  /**
   * The result will be a set of messages, that are both older and newer than the message with the provided ID, and the message with the ID provided will be in the middle of the set
   */
  id_around?: string;

  /**
   * The ID of the message to get messages with a timestamp greater than
   */
  id_gt?: string;

  /**
   * The ID of the message to get messages with a timestamp greater than or equal to
   */
  id_gte?: string;

  /**
   * The ID of the message to get messages with a timestamp smaller than
   */
  id_lt?: string;

  /**
   * The ID of the message to get messages with a timestamp smaller than or equal to
   */
  id_lte?: string;

  /**
   * The maximum number of messages to return (max limit
   */
  limit?: number;
}

export interface MessageReadEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "message.read" in this case
   */
  type: string;

  /**
   * The ID of the channel where the message was read
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel where the message was read
   */
  channel_type?: string;

  /**
   * The CID of the channel where the message was read
   */
  cid?: string;

  /**
   * The ID of the last read message
   */
  last_read_message_id?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  channel_custom?: Record<string, any>;

  thread?: ThreadResponse;

  user?: UserResponseCommonFields;
}

export interface MessageRequest {
  /**
   * Contains HTML markup of the message. Can only be set when using server-side API
   */
  html?: string;

  /**
   * Message ID is unique string identifier of the message
   */
  id?: string;

  mentioned_channel?: boolean;

  mentioned_here?: boolean;

  /**
   * Should be empty if `text` is provided. Can only be set when using server-side API
   */
  mml?: string;

  /**
   * ID of parent message (thread)
   */
  parent_id?: string;

  /**
   * Date when pinned message expires
   */
  pin_expires?: Date;

  /**
   * Whether message is pinned or not
   */
  pinned?: boolean;

  /**
   * Date when message got pinned
   */
  pinned_at?: Date;

  /**
   * Identifier of the poll to include in the message
   */
  poll_id?: string;

  quoted_message_id?: string;

  /**
   * Whether thread reply should be shown in the channel as well
   */
  show_in_channel?: boolean;

  /**
   * Whether message is silent or not
   */
  silent?: boolean;

  /**
   * Text of the message. Should be empty if `mml` is provided
   */
  text?: string;

  /**
   * Contains type of the message. One of: regular, system
   */

  type?: 'regular' | 'system';

  user_id?: string;

  /**
   * Array of message attachments
   */
  attachments?: Array<Attachment>;

  /**
   * List of user group IDs to mention. Group members who are also channel members will receive push notifications. Max 10 groups
   */
  mentioned_group_ids?: Array<string>;

  mentioned_roles?: Array<string>;

  /**
   * Array of user IDs to mention
   */
  mentioned_users?: Array<string>;

  /**
   * A list of user ids that have restricted visibility to the message
   */
  restricted_visibility?: Array<string>;

  custom?: Record<string, any>;

  shared_location?: SharedLocation;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MessageResponse {
  /**
   * Channel unique identifier in <type>:<id> format
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  deleted_reply_count: number;

  /**
   * Contains HTML markup of the message. Can only be set when using server-side API
   */
  html: string;

  /**
   * Message ID is unique string identifier of the message
   */
  id: string;

  /**
   * Whether the message mentioned the channel tag
   */
  mentioned_channel: boolean;

  /**
   * Whether the message mentioned online users with @here tag
   */
  mentioned_here: boolean;

  /**
   * Whether message is pinned or not
   */
  pinned: boolean;

  /**
   * Number of replies to this message
   */
  reply_count: number;

  /**
   * Whether the message was shadowed or not
   */
  shadowed: boolean;

  /**
   * Whether message is silent or not
   */
  silent: boolean;

  /**
   * Text of the message. Should be empty if `mml` is provided
   */
  text: string;

  /**
   * Contains type of the message. One of: regular, ephemeral, error, reply, system, deleted
   */
  type: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * Array of message attachments
   */
  attachments: Array<Attachment>;

  /**
   * List of 10 latest reactions to this message
   */
  latest_reactions: Array<ReactionResponse>;

  /**
   * List of mentioned users
   */
  mentioned_users: Array<UserResponse>;

  /**
   * List of 10 latest reactions of authenticated user to this message
   */
  own_reactions: Array<ReactionResponse>;

  /**
   * A list of user ids that have restricted visibility to the message, if the list is not empty, the message is only visible to the users in the list
   */
  restricted_visibility: Array<string>;

  custom: Record<string, any>;

  /**
   * An object containing number of reactions of each type. Key: reaction type (string), value: number of reactions (int)
   */
  reaction_counts: Record<string, number>;

  /**
   * An object containing scores of reactions of each type. Key: reaction type (string), value: total score of reactions (int)
   */
  reaction_scores: Record<string, number>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * Contains provided slash command
   */
  command?: string;

  /**
   * Date/time of deletion
   */
  deleted_at?: Date;

  deleted_for_me?: boolean;

  message_text_updated_at?: Date;

  /**
   * Should be empty if `text` is provided. Can only be set when using server-side API
   */
  mml?: string;

  /**
   * ID of parent message (thread)
   */
  parent_id?: string;

  /**
   * Date when pinned message expires
   */
  pin_expires?: Date;

  /**
   * Date when message got pinned
   */
  pinned_at?: Date;

  /**
   * Identifier of the poll to include in the message
   */
  poll_id?: string;

  quoted_message_id?: string;

  /**
   * Whether thread reply should be shown in the channel as well
   */
  show_in_channel?: boolean;

  /**
   * List of user group IDs mentioned in the message. Group members who are also channel members will receive push notifications based on their push preferences. Max 10 groups
   */
  mentioned_group_ids?: Array<string>;

  /**
   * List of mentioned user group objects.
   */
  mentioned_groups?: Array<UserGroupResponse>;

  /**
   * List of roles mentioned in the message (e.g. admin, channel_moderator, custom roles). Members with matching roles will receive push notifications based on their push preferences. Max 10 roles
   */
  mentioned_roles?: Array<string>;

  /**
   * List of users who participate in thread
   */
  thread_participants?: Array<UserResponse>;

  draft?: DraftResponse;

  /**
   * Object with translations. Key `language` contains the original language key. Other keys contain translations
   */
  i18n?: Record<string, string>;

  /**
   * Contains image moderation information
   */
  image_labels?: Record<string, Array<string>>;

  member?: ChannelMemberPartialResponse;

  moderation?: ModerationV2Response;

  /**
   * User response object
   */
  pinned_by?: UserResponse;

  poll?: PollResponseData;

  /**
   * Represents any chat message
   */
  quoted_message?: MessageResponse;

  reaction_groups?: Record<string, ReactionGroupResponse>;

  reminder?: ReminderResponseData;

  shared_location?: SharedLocationResponseData;
}

export interface MessageStatsResponse {
  count_over_time?: Array<CountByMinuteResponse>;
}

export interface MessageUnblockedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  message_id: string;

  custom: Record<string, any>;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "message.unblocked" in this case
   */
  type: string;

  /**
   * The CID of the channel where the message was unblocked
   */
  cid?: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface MessageUndeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  message_id: string;

  custom: Record<string, any>;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "message.undeleted" in this case
   */
  type: string;

  /**
   * The ID of the channel where the message was sent
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel where the message was sent
   */
  channel_type?: string;

  /**
   * The CID of the channel where the message was sent
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;
}

export interface MessageUpdate {
  old_text?: string;

  change_set?: MessageChangeSet;
}

export interface MessageUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  message_id: string;

  custom: Record<string, any>;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "message.updated" in this case
   */
  type: string;

  /**
   * The ID of the channel where the message was sent
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel where the message was sent
   */
  channel_type?: string;

  /**
   * The CID of the channel where the message was sent
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  message_update?: MessageUpdate;

  user?: UserResponseCommonFields;
}

export interface MessageWithChannelResponse {
  /**
   * Channel unique identifier in <type>:<id> format
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  deleted_reply_count: number;

  /**
   * Contains HTML markup of the message. Can only be set when using server-side API
   */
  html: string;

  /**
   * Message ID is unique string identifier of the message
   */
  id: string;

  /**
   * Whether the message mentioned the channel tag
   */
  mentioned_channel: boolean;

  /**
   * Whether the message mentioned online users with @here tag
   */
  mentioned_here: boolean;

  /**
   * Whether message is pinned or not
   */
  pinned: boolean;

  /**
   * Number of replies to this message
   */
  reply_count: number;

  /**
   * Whether the message was shadowed or not
   */
  shadowed: boolean;

  /**
   * Whether message is silent or not
   */
  silent: boolean;

  /**
   * Text of the message. Should be empty if `mml` is provided
   */
  text: string;

  /**
   * Contains type of the message. One of: regular, ephemeral, error, reply, system, deleted
   */
  type: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * Array of message attachments
   */
  attachments: Array<Attachment>;

  /**
   * List of 10 latest reactions to this message
   */
  latest_reactions: Array<ReactionResponse>;

  /**
   * List of mentioned users
   */
  mentioned_users: Array<UserResponse>;

  /**
   * List of 10 latest reactions of authenticated user to this message
   */
  own_reactions: Array<ReactionResponse>;

  /**
   * A list of user ids that have restricted visibility to the message, if the list is not empty, the message is only visible to the users in the list
   */
  restricted_visibility: Array<string>;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * An object containing number of reactions of each type. Key: reaction type (string), value: number of reactions (int)
   */
  reaction_counts: Record<string, number>;

  /**
   * An object containing scores of reactions of each type. Key: reaction type (string), value: total score of reactions (int)
   */
  reaction_scores: Record<string, number>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * Contains provided slash command
   */
  command?: string;

  /**
   * Date/time of deletion
   */
  deleted_at?: Date;

  deleted_for_me?: boolean;

  message_text_updated_at?: Date;

  /**
   * Should be empty if `text` is provided. Can only be set when using server-side API
   */
  mml?: string;

  /**
   * ID of parent message (thread)
   */
  parent_id?: string;

  /**
   * Date when pinned message expires
   */
  pin_expires?: Date;

  /**
   * Date when message got pinned
   */
  pinned_at?: Date;

  /**
   * Identifier of the poll to include in the message
   */
  poll_id?: string;

  quoted_message_id?: string;

  /**
   * Whether thread reply should be shown in the channel as well
   */
  show_in_channel?: boolean;

  /**
   * List of user group IDs mentioned in the message. Group members who are also channel members will receive push notifications based on their push preferences. Max 10 groups
   */
  mentioned_group_ids?: Array<string>;

  /**
   * List of mentioned user group objects.
   */
  mentioned_groups?: Array<UserGroupResponse>;

  /**
   * List of roles mentioned in the message (e.g. admin, channel_moderator, custom roles). Members with matching roles will receive push notifications based on their push preferences. Max 10 roles
   */
  mentioned_roles?: Array<string>;

  /**
   * List of users who participate in thread
   */
  thread_participants?: Array<UserResponse>;

  draft?: DraftResponse;

  /**
   * Object with translations. Key `language` contains the original language key. Other keys contain translations
   */
  i18n?: Record<string, string>;

  /**
   * Contains image moderation information
   */
  image_labels?: Record<string, Array<string>>;

  member?: ChannelMemberPartialResponse;

  moderation?: ModerationV2Response;

  /**
   * User response object
   */
  pinned_by?: UserResponse;

  poll?: PollResponseData;

  /**
   * Represents any chat message
   */
  quoted_message?: MessageResponse;

  reaction_groups?: Record<string, ReactionGroupResponse>;

  reminder?: ReminderResponseData;

  shared_location?: SharedLocationResponseData;
}

export interface MetricDescriptor {
  label: string;

  description?: string;

  unit?: string;
}

export interface MetricStats {
  /**
   * Aggregated total value
   */
  total: number;

  /**
   * Per-day values (only present in daily mode)
   */
  daily?: Array<DailyValue>;
}

export interface MetricThreshold {
  level: string;

  operator: string;

  value: number;

  value_unit?: string;

  window_seconds?: number;
}

export interface MetricTimeSeries {
  data_points?: Array<Array<number>>;
}

export interface MetricsPct {
  freezes?: number;

  geo?: number;

  jitter?: number;

  latency?: number;

  quality_score?: number;
}

export interface ModerationActionConfigResponse {
  /**
   * The action to take
   */
  action: string;

  /**
   * Description of what this action does
   */
  description: string;

  /**
   * Type of entity this action applies to
   */
  entity_type: string;

  /**
   * Icon for the dashboard
   */
  icon: string;

  /**
   * Display order (lower numbers shown first)
   */
  order: number;

  id?: string;

  /**
   * Queue type this action config belongs to
   */
  queue_type?: string;

  /**
   * Custom data for the action
   */
  custom?: Record<string, any>;
}

export interface ModerationAnalysisFailedEvent {
  created_at: Date;

  type: string;

  /**
   * The moderation policy key the request targeted.
   */
  config_key?: string;

  /**
   * Echo of the `entity_creator_id` on the /analyze request.
   */
  entity_creator_id?: string;

  /**
   * Echo of the `entity_id` on the /analyze request.
   */
  entity_id?: string;

  /**
   * Echo of the `entity_type` on the /analyze request.
   */
  entity_type?: string;

  received_at?: Date;

  /**
   * Echo of the request's `content_ids`, keyed by text/image label. On keyframe and caption streams every request repeats the same entity_type/entity_id/entity_creator_id, so this is what identifies the specific submission that went unscreened.
   */
  content_ids?: Record<string, string>;

  /**
   * Echo of the `custom` metadata on the /analyze request.
   */
  custom?: Record<string, any>;
}

export interface ModerationBanResponse {
  duration: string;
}

export interface ModerationCallResponse {
  backstage: boolean;

  captioning: boolean;

  cid: string;

  created_at: Date;

  current_session_id: string;

  id: string;

  recording: boolean;

  transcribing: boolean;

  translating: boolean;

  type: string;

  updated_at: Date;

  blocked_user_ids: Array<string>;

  custom: Record<string, any>;

  channel_cid?: string;

  ended_at?: Date;

  join_ahead_time_seconds?: number;

  routing_number?: string;

  starts_at?: Date;

  team?: string;

  /**
   * User response object
   */
  created_by?: UserResponse;
}

export interface ModerationCheckCompletedEvent {
  created_at: Date;

  /**
   * The ID of entity which was moderated
   */
  entity_id: string;

  /**
   * The type of the entity which was moderated
   */
  entity_type: string;

  /**
   * The recommended action
   */
  recommended_action: string;

  /**
   * The review queue item ID
   */
  review_queue_item_id: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface ModerationConfig {
  async?: boolean;

  created_at?: Date;

  key?: string;

  team?: string;

  updated_at?: Date;

  supported_video_call_harm_types?: Array<string>;

  ai_image_config?: AIImageConfig;

  ai_image_lite_config?: BodyguardImageAnalysisConfig;

  ai_text_config?: AITextConfig;

  ai_video_config?: AIVideoConfig;

  automod_platform_circumvention_config?: AutomodPlatformCircumventionConfig;

  automod_semantic_filters_config?: AutomodSemanticFiltersConfig;

  automod_toxicity_config?: AutomodToxicityConfig;

  block_list_config?: BlockListConfig;

  flood_config?: FloodConfig;

  google_vision_config?: GoogleVisionConfig;

  llm_config?: LLMConfig;

  velocity_filter_config?: VelocityFilterConfig;

  video_call_rule_config?: VideoCallRuleConfig;
}

export interface ModerationCustomActionEvent {
  /**
   * The ID of the custom action that was executed
   */
  action_id: string;

  created_at: Date;

  custom: Record<string, any>;

  review_queue_item: ReviewQueueItemResponse;

  type: string;

  received_at?: Date;

  /**
   * Additional options passed to the custom action
   */
  action_options?: Record<string, any>;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;
}

export interface ModerationDashboardPreferences {
  async_review_queue_upsert?: boolean;

  block_foreign_cdn_attachments?: boolean;

  custom_views_enabled?: boolean;

  disable_audit_logs?: boolean;

  disable_flagging_reviewed_entity?: boolean;

  escalation_queue_enabled?: boolean;

  flag_user_on_flagged_content?: boolean;

  include_attachment_payload?: boolean;

  media_queue_blur_enabled?: boolean;

  allowed_moderation_action_reasons?: Array<string>;

  escalation_reasons?: Array<string>;

  filterable_custom_keys?: Array<string>;

  keyframe_classifications_map?: Record<string, Record<string, boolean>>;

  overview_dashboard?: OverviewDashboardConfig;
}

export interface ModerationFlagResponse {
  created_at: Date;

  entity_id: string;

  entity_type: string;

  type: string;

  updated_at: Date;

  user_id: string;

  result: Array<Record<string, any>>;

  entity_creator_id?: string;

  reason?: string;

  review_queue_item_id?: string;

  labels?: Array<string>;

  custom?: Record<string, any>;

  /**
   * Content payload for moderation
   */
  moderation_payload?: ModerationPayloadResponse;

  review_queue_item?: ReviewQueueItemResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ModerationFlaggedEvent {
  /**
   * The type of content that was flagged
   */
  content_type: string;

  created_at: Date;

  /**
   * The ID of the flagged content
   */
  object_id: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
}

export interface ModerationImageAnalysisCompleteEvent {
  created_at: Date;

  type: string;

  /**
   * The moderation policy key that was applied.
   */
  config_key?: string;

  /**
   * Echo of the `entity_creator_id` on the /analyze request.
   */
  entity_creator_id?: string;

  /**
   * Echo of the `entity_id` on the /analyze request.
   */
  entity_id?: string;

  /**
   * Echo of the `entity_type` on the /analyze request.
   */
  entity_type?: string;

  received_at?: Date;

  /**
   * Review queue row ID for deep-linking into the dashboard.
   */
  review_queue_item_id?: string;

  /**
   * Echo of the `custom` metadata on the /analyze request.
   */
  custom?: Record<string, any>;

  /**
   * Per-image verdicts, same shape as the /analyze HTTP response. Each entry carries `id` when the request supplied `content_ids`.
   */
  images?: Record<string, AnalyzeImageField>;

  /**
   * Per-text-field verdicts, same shape as the /analyze HTTP response. Each entry carries `id` when the request supplied `content_ids`.
   */
  texts?: Record<string, AnalyzeTextField>;
}

export interface ModerationMarkReviewedEvent {
  created_at: Date;

  custom: Record<string, any>;

  item: ReviewQueueItemResponse;

  type: string;

  received_at?: Date;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;
}

export interface ModerationPayload {
  audios?: Array<string>;

  image_ordered_keys?: Array<string>;

  images?: Array<string>;

  other_media?: Array<string>;

  text_ordered_keys?: Array<string>;

  texts?: Array<string>;

  videos?: Array<string>;

  custom?: Record<string, any>;

  image_ids?: Record<string, string>;

  text_ids?: Record<string, string>;
}

export interface ModerationPayloadRequest {
  /**
   * Audio URLs to moderate
   */
  audios?: Array<string>;

  /**
   * Image URLs to moderate (max 30)
   */
  images?: Array<string>;

  /**
   * Text content to moderate
   */
  texts?: Array<string>;

  /**
   * Video URLs to moderate
   */
  videos?: Array<string>;

  /**
   * Custom data for moderation
   */
  custom?: Record<string, any>;
}

export interface ModerationPayloadResponse {
  /**
   * Audio URLs to moderate
   */
  audios?: Array<string>;

  /**
   * Caller-supplied keys for images, index-aligned with images[]
   */
  image_ordered_keys?: Array<string>;

  /**
   * Image URLs to moderate
   */
  images?: Array<string>;

  /**
   * Media URLs from attachments outside the typed image/video/audio lists (custom attachment types such as GIF pickers)
   */
  other_media?: Array<string>;

  /**
   * Caller-supplied keys for texts (e.g. "title", "description"), index-aligned with texts[]
   */
  text_ordered_keys?: Array<string>;

  /**
   * Text content to moderate
   */
  texts?: Array<string>;

  /**
   * Video URLs to moderate
   */
  videos?: Array<string>;

  /**
   * Custom data for moderation
   */
  custom?: Record<string, any>;

  /**
   * Caller-supplied content IDs per image key (from content_ids on /analyze)
   */
  image_ids?: Record<string, string>;

  /**
   * Caller-supplied content IDs per text key (from content_ids on /analyze)
   */
  text_ids?: Record<string, string>;
}

export interface ModerationQueueResponse {
  created_at: Date;

  created_by: string;

  description: string;

  id: string;

  item_count: number;

  name: string;

  type: string;

  updated_at: Date;

  sort: Array<Record<string, any>>;

  filters: Record<string, any>;
}

export interface ModerationResponse {
  action: string;

  explicit: number;

  spam: number;

  toxic: number;
}

export interface ModerationRuleInfo {
  description: string;

  id: string;

  name: string;

  type: string;
}

export interface ModerationRuleV2Response {
  created_at: Date;

  description: string;

  enabled: boolean;

  id: string;

  name: string;

  rule_type: string;

  team: string;

  updated_at: Date;

  config_keys: Array<string>;

  cooldown_period?: string;

  logic?: string;

  action_sequences?: Array<CallRuleActionSequence>;

  conditions?: Array<RuleBuilderCondition>;

  groups?: Array<RuleBuilderConditionGroup>;

  action?: RuleBuilderAction;
}

export interface ModerationRulesTriggeredEvent {
  created_at: Date;

  /**
   * The ID of the entity that triggered the rule
   */
  entity_id: string;

  /**
   * The type of the entity (call, user, message, etc.)
   */
  entity_type: string;

  /**
   * The ID of the user who triggered the rule
   */
  user_id: string;

  /**
   * Array of action types that were triggered
   */
  triggered_actions: Array<string>;

  custom: Record<string, any>;

  rule: ModerationRuleInfo;

  type: string;

  received_at?: Date;

  /**
   * The review queue item ID if applicable
   */
  review_queue_item_id?: string;

  /**
   * The violation number for call rules (optional)
   */
  violation_number?: number;

  /**
   * Ordered list of contents whose verdicts contributed to an aggregation rule's threshold. Populated only for aggregation rules when callers supplied `content_ids`.
   */
  matched_contents?: Array<MatchedContent>;
}

export interface ModerationTextAnalysisCompleteEvent {
  created_at: Date;

  type: string;

  /**
   * The moderation policy key that was applied.
   */
  config_key?: string;

  /**
   * Echo of the `entity_creator_id` on the /analyze request.
   */
  entity_creator_id?: string;

  /**
   * Echo of the `entity_id` on the /analyze request.
   */
  entity_id?: string;

  /**
   * Echo of the `entity_type` on the /analyze request.
   */
  entity_type?: string;

  received_at?: Date;

  /**
   * Review queue row ID for deep-linking into the dashboard.
   */
  review_queue_item_id?: string;

  /**
   * Echo of the `custom` metadata on the /analyze request.
   */
  custom?: Record<string, any>;

  /**
   * Per-text-field verdicts, same shape as the /analyze HTTP response. Each entry carries `id` when the request supplied `content_ids`.
   */
  texts?: Record<string, AnalyzeTextField>;
}

export interface ModerationV2Response {
  action: string;

  original_text: string;

  blocklist_matched?: string;

  platform_circumvented?: boolean;

  semantic_filter_matched?: string;

  blocklists_matched?: Array<string>;

  image_harms?: Array<string>;

  text_harms?: Array<string>;
}

export interface MuteChannelRequest {
  /**
   * Duration of mute in milliseconds
   */
  expiration?: number;

  user_id?: string;

  /**
   * Channel CIDs to mute (if multiple channels)
   */
  channel_cids?: Array<string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MuteChannelResponse {
  duration: string;

  /**
   * Object with mutes (if multiple channels were muted)
   */
  channel_mutes?: Array<ChannelMute>;

  channel_mute?: ChannelMute;

  own_user?: OwnUserResponse;
}

export interface MuteRequest {
  /**
   * User IDs to mute (if multiple users)
   */
  target_ids: Array<string>;

  /**
   * Duration of mute in minutes
   */
  timeout?: number;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface MuteResponse {
  duration: string;

  /**
   * Object with mutes (if multiple users were muted)
   */
  mutes?: Array<UserMuteResponse>;

  /**
   * A list of users that can't be found. Common cause for this is deleted users
   */
  non_existing_users?: Array<string>;

  own_user?: OwnUserResponse;
}

export interface MuteUsersRequest {
  audio?: boolean;

  mute_all_users?: boolean;

  muted_by_id?: string;

  screenshare?: boolean;

  screenshare_audio?: boolean;

  video?: boolean;

  user_ids?: Array<string>;

  /**
   * User request object
   */
  muted_by?: UserRequest;
}

export interface MuteUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
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

export interface NotificationComment {
  comment: string;

  id: string;

  user_id: string;

  attachments?: Array<Attachment>;
}

export interface NotificationConfig {
  /**
   * Time window for deduplicating notification activities (reactions and follows). Empty or '0' = always deduplicate (default). Examples: '1h', '24h', '7d', '1w'
   */
  deduplication_window?: string;

  /**
   * Whether to track read status
   */
  track_read?: boolean;

  /**
   * Whether to track seen status
   */
  track_seen?: boolean;
}

export interface NotificationContext {
  target?: NotificationTarget;

  trigger?: NotificationTrigger;
}

export interface NotificationFeedUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the feed
   */
  fid: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.notification_feed.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  /**
   * Aggregated activities for notification feeds
   */
  aggregated_activities?: Array<AggregatedActivityResponse>;

  notification_status?: NotificationStatusResponse;

  user?: UserResponseCommonFields;
}

export interface NotificationMarkUnreadEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "notification.mark_unread" in this case
   */
  type: string;

  /**
   * The ID of the channel which was marked as unread
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel which was marked as unread
   */
  channel_type?: string;

  /**
   * The CID of the channel which was marked as unread
   */
  cid?: string;

  /**
   * The ID of the first unread message
   */
  first_unread_message_id?: string;

  /**
   * The time when the channel/thread was marked as unread
   */
  last_read_at?: Date;

  /**
   * The ID of the last read message
   */
  last_read_message_id?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  /**
   * The ID of the thread which was marked as unread
   */
  thread_id?: string;

  /**
   * The total number of unread messages
   */
  total_unread_count?: number;

  /**
   * The number of channels with unread messages
   */
  unread_channels?: number;

  /**
   * The total number of unread messages
   */
  unread_count?: number;

  /**
   * The number of unread messages in the channel/thread after first_unread_message_id
   */
  unread_messages?: number;

  /**
   * The total number of unread messages in the threads
   */
  unread_thread_messages?: number;

  /**
   * The number of unread threads
   */
  unread_threads?: number;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  channel_custom?: Record<string, any>;

  grouped_unread_channels?: Record<string, number>;

  user?: UserResponseCommonFields;
}

export interface NotificationParentActivity {
  id: string;

  text?: string;

  type?: string;

  user_id?: string;

  attachments?: Array<Attachment>;
}

export interface NotificationSettings {
  enabled: boolean;

  call_live_started: EventNotificationSettings;

  call_missed: EventNotificationSettings;

  call_notification: EventNotificationSettings;

  call_ring: EventNotificationSettings;

  session_started: EventNotificationSettings;
}

export interface NotificationSettingsRequest {
  enabled?: boolean;

  call_live_started?: EventNotificationSettingsRequest;

  call_missed?: EventNotificationSettingsRequest;

  call_notification?: EventNotificationSettingsRequest;

  call_ring?: EventNotificationSettingsRequest;

  session_started?: EventNotificationSettingsRequest;
}

export interface NotificationSettingsResponse {
  enabled: boolean;

  call_live_started: EventNotificationSettingsResponse;

  call_missed: EventNotificationSettingsResponse;

  call_notification: EventNotificationSettingsResponse;

  call_ring: EventNotificationSettingsResponse;

  session_started: EventNotificationSettingsResponse;
}

export interface NotificationStatusResponse {
  /**
   * Number of unread notifications
   */
  unread: number;

  /**
   * Number of unseen notifications
   */
  unseen: number;

  /**
   * When notifications were last read
   */
  last_read_at?: Date;

  /**
   * When notifications were last seen
   */
  last_seen_at?: Date;

  /**
   * Deprecated: use is_read on each activity/group instead. IDs of activities that have been read. Capped at ~101 entries for aggregated feeds.
   */
  read_activities?: Array<string>;

  /**
   * Deprecated: use is_seen on each activity/group instead. IDs of activities that have been seen. Capped at ~101 entries for aggregated feeds.
   */
  seen_activities?: Array<string>;
}

export interface NotificationTarget {
  /**
   * The ID of the target (activity ID or user ID)
   */
  id: string;

  /**
   * The name of the target user (for user targets like follows)
   */
  name?: string;

  /**
   * The text content of the target activity (for activity targets)
   */
  text?: string;

  /**
   * The type of the target activity (for activity targets)
   */
  type?: string;

  /**
   * The ID of the user who created the target activity (for activity targets)
   */
  user_id?: string;

  /**
   * Attachments on the target activity (for activity targets)
   */
  attachments?: Array<Attachment>;

  comment?: NotificationComment;

  /**
   * Custom data from the target activity
   */
  custom?: Record<string, any>;

  parent_activity?: NotificationParentActivity;
}

export interface NotificationThreadMessageNewEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  message_id: string;

  /**
   * The ID of the thread
   */
  thread_id: string;

  /**
   * The number of watchers
   */
  watcher_count: number;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "notification.message_new" in this case
   */
  type: string;

  /**
   * The ID of the channel where the message was sent
   */
  channel_id?: string;

  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel where the message was sent
   */
  channel_type?: string;

  /**
   * The CID of the channel where the message was sent
   */
  cid?: string;

  parent_author?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  unread_thread_messages?: number;

  unread_threads?: number;

  /**
   * The participants of the thread
   */
  thread_participants?: Array<UserResponseCommonFields>;

  channel_custom?: Record<string, any>;
}

export interface NotificationTrigger {
  /**
   * Human-readable text describing the notification
   */
  text: string;

  /**
   * The type of notification (mention, reaction, comment, follow, etc.)
   */
  type: string;

  comment?: NotificationComment;

  /**
   * Custom data from the trigger object (comment, reaction, etc.)
   */
  custom?: Record<string, any>;
}

export interface OCRContentParameters {
  label_operator?: string;

  severity?: string;

  harm_labels?: Array<string>;
}

export interface OCRRule {
  action:
    'flag' | 'shadow' | 'remove' | 'bounce' | 'bounce_flag' | 'bounce_remove';

  label: string;
}

export interface OnlyUserID {
  id: string;
}

export interface OverviewDashboardConfig {
  default_date_range_days?: number;

  visible_charts?: Array<string>;
}

export interface OwnBatchRequest {
  /**
   * List of feed IDs to get own fields for
   */
  feeds: Array<string>;

  user_id?: string;

  /**
   * Optional list of specific fields to return. If not specified, all fields (own_follows, own_followings, own_capabilities, own_membership) are returned
   */
  fields?: Array<string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface OwnBatchResponse {
  duration: string;

  /**
   * Map of feed ID to own fields data
   */
  data: Record<string, FeedOwnData>;
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
  KICK_USER: 'kick-user',
  MUTE_USERS: 'mute-users',
  PIN_FOR_EVERYONE: 'pin-for-everyone',
  READ_CALL: 'read-call',
  REMOVE_CALL_MEMBER: 'remove-call-member',
  SCREENSHARE: 'screenshare',
  SEND_AUDIO: 'send-audio',
  SEND_CLOSED_CAPTIONS_CALL: 'send-closed-captions-call',
  SEND_VIDEO: 'send-video',
  START_BROADCAST_CALL: 'start-broadcast-call',
  START_CLOSED_CAPTIONS_CALL: 'start-closed-captions-call',
  START_FRAME_RECORD_CALL: 'start-frame-record-call',
  START_INDIVIDUAL_RECORD_CALL: 'start-individual-record-call',
  START_RAW_RECORD_CALL: 'start-raw-record-call',
  START_RECORD_CALL: 'start-record-call',
  START_TRANSCRIPTION_CALL: 'start-transcription-call',
  STOP_BROADCAST_CALL: 'stop-broadcast-call',
  STOP_CLOSED_CAPTIONS_CALL: 'stop-closed-captions-call',
  STOP_FRAME_RECORD_CALL: 'stop-frame-record-call',
  STOP_INDIVIDUAL_RECORD_CALL: 'stop-individual-record-call',
  STOP_RAW_RECORD_CALL: 'stop-raw-record-call',
  STOP_RECORD_CALL: 'stop-record-call',
  STOP_TRANSCRIPTION_CALL: 'stop-transcription-call',
  UPDATE_CALL: 'update-call',
  UPDATE_CALL_MEMBER: 'update-call-member',
  UPDATE_CALL_PERMISSIONS: 'update-call-permissions',
  UPDATE_CALL_SETTINGS: 'update-call-settings',
} as const;

export type OwnCapability = (typeof OwnCapability)[keyof typeof OwnCapability];

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

  channel_mutes: Array<ChannelMute>;

  devices: Array<DeviceResponse>;

  mutes: Array<UserMuteResponse>;

  teams: Array<string>;

  custom: Record<string, any>;

  avg_response_time?: number;

  deactivated_at?: Date;

  deleted_at?: Date;

  image?: string;

  last_active?: Date;

  name?: string;

  revoke_tokens_issued_before?: Date;

  blocked_user_ids?: Array<string>;

  latest_hidden_channels?: Array<string>;

  privacy_settings?: PrivacySettingsResponse;

  push_preferences?: PushPreferencesResponse;

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

export interface ParsedPredefinedFilterResponse {
  name: string;

  filter: Record<string, any>;

  sort?: Array<SortParamRequest>;
}

export interface ParticipantCountByMinuteResponse {
  first: number;

  last: number;

  max: number;

  min: number;

  start_ts: Date;
}

export interface ParticipantCountOverTimeResponse {
  by_minute?: Array<ParticipantCountByMinuteResponse>;
}

export interface ParticipantReportResponse {
  sum: number;

  unique: number;

  max_concurrent?: number;

  by_browser?: Array<GroupedStatsResponse>;

  by_country?: Array<GroupedStatsResponse>;

  by_device?: Array<GroupedStatsResponse>;

  by_operating_system?: Array<GroupedStatsResponse>;

  count_over_time?: ParticipantCountOverTimeResponse;

  publishers?: PublisherStatsResponse;

  subscribers?: SubscriberStatsResponse;
}

export interface ParticipantSeriesPublisherStats {
  global_metrics_order?: Array<string>;

  global?: Record<string, Array<Array<number>>>;

  global_meta?: Record<string, MetricDescriptor>;

  global_thresholds?: Record<string, Array<MetricThreshold>>;

  tracks?: Record<string, Array<ParticipantSeriesTrackMetrics>>;
}

export interface ParticipantSeriesSubscriberStats {
  global_metrics_order?: Array<string>;

  subscriptions?: Array<ParticipantSeriesSubscriptionTrackMetrics>;

  global?: Record<string, Array<Array<number>>>;

  global_meta?: Record<string, MetricDescriptor>;

  global_thresholds?: Record<string, Array<MetricThreshold>>;
}

export interface ParticipantSeriesSubscriptionTrackMetrics {
  publisher_user_id: string;

  publisher_name?: string;

  publisher_user_session_id?: string;

  tracks?: Record<string, Array<ParticipantSeriesTrackMetrics>>;
}

export interface ParticipantSeriesTimeframe {
  max_points: number;

  since: Date;

  step_seconds: number;

  until: Date;
}

export interface ParticipantSeriesTrackMetrics {
  track_id: string;

  codec?: string;

  label?: string;

  rid?: string;

  track_type?: string;

  metrics_order?: Array<string>;

  metrics?: Record<string, Array<Array<number>>>;

  metrics_meta?: Record<string, MetricDescriptor>;

  thresholds?: Record<string, Array<MetricThreshold>>;
}

export interface ParticipantSeriesUserStats {
  metrics_order?: Array<string>;

  metrics?: Record<string, Array<Array<number>>>;

  metrics_meta?: Record<string, MetricDescriptor>;

  thresholds?: Record<string, Array<MetricThreshold>>;
}

export interface ParticipantSessionDetails {
  publisher_type: string;

  user_id: string;

  user_session_id: string;

  roles: Array<string>;

  duration_in_seconds?: number;

  joined_at?: Date;

  left_at?: Date;
}

export interface PendingMessageEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The method used for the pending message
   */
  method: string;

  custom: Record<string, any>;

  /**
   * The type of event: "message.pending" in this case
   */
  type: string;

  received_at?: Date;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  /**
   * Metadata attached to the pending message
   */
  metadata?: Record<string, string>;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface PendingMessageResponse {
  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  metadata?: Record<string, string>;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface PerSDKUsageReport {
  total: number;

  by_version: Record<string, number>;
}

export interface Percentiles {
  p50?: number;

  p95?: number;
}

export interface PerformanceAnalysisResponse {
  analysis_type: string;

  score: string;

  indexed_fields: Array<string>;

  recommendations: Array<string>;

  unindexed_fields: Array<string>;

  unindexed_sort_fields: Array<string>;

  warnings: Array<string>;

  last_analyzed?: Date;

  scan_type?: string;
}

export interface Permission {
  /**
   * Action name this permission is for (e.g. SendMessage)
   */
  action: string;

  /**
   * Whether this is a custom permission or built-in
   */
  custom: boolean;

  /**
   * Description of the permission
   */
  description: string;

  /**
   * Unique permission ID
   */
  id: string;

  /**
   * Level at which permission could be applied (app or channel). One of: app, channel
   */
  level: string;

  /**
   * Name of the permission
   */
  name: string;

  /**
   * Whether this permission applies to resource owner or not
   */
  owner: boolean;

  /**
   * Resource type that defines ownership for this permission's action (e.g. 'Channel' for CreateMessage, 'Message' for UpdateMessage). Identical across all variants of an action; primarily meaningful for owner grants.
   */
  owner_resource: string;

  /**
   * Whether this permission applies to teammates (multi-tenancy mode only)
   */
  same_team: boolean;

  /**
   * List of tags of the permission
   */
  tags: Array<string>;

  /**
   * MongoDB style condition which decides whether or not the permission is granted
   */
  condition?: Record<string, any>;
}

export interface PermissionRequest {
  /**
   * Action name this permission is for (e.g. SendMessage)
   */
  action: string;

  /**
   * Name of the permission
   */
  name: string;

  /**
   * MongoDB style condition which decides whether or not the permission is granted
   */
  condition: Record<string, any>;

  /**
   * Description of the permission
   */
  description?: string;

  /**
   * Whether this permission applies to resource owner or not
   */
  owner?: boolean;

  /**
   * Whether this permission applies to teammates (multi-tenancy mode only)
   */
  same_team?: boolean;
}

export interface PermissionRequestEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The list of permissions requested by the user
   */
  permissions: Array<string>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.permission_request" in this case
   */
  type: string;
}

export interface PinActivityRequest {
  /**
   * If true, enriches the activity's current_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface PinActivityResponse {
  /**
   * When the activity was pinned
   */
  created_at: Date;

  duration: string;

  /**
   * Fully qualified ID of the feed the activity was pinned to
   */
  feed: string;

  /**
   * ID of the user who pinned the activity
   */
  user_id: string;

  activity: ActivityResponse;
}

export interface PinRequest {
  /**
   * the session ID of the user who pinned the message
   */
  session_id: string;

  /**
   * the user ID of the user who pinned the message
   */
  user_id: string;
}

export interface PinResponse {
  /**
   * Duration of the request in milliseconds
   */
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

  resources: Array<string>;

  roles: Array<string>;
}

export interface PolicyConfig {
  max_age_hours: number;
}

export interface PolicyRequest {
  action: 'Deny' | 'Allow';

  /**
   * User-friendly policy name
   */
  name: string;

  /**
   * Whether policy applies to resource owner or not
   */
  owner: boolean;

  /**
   * Policy priority
   */
  priority: number;

  /**
   * List of resources to apply policy to
   */
  resources: Array<string>;

  /**
   * List of roles to apply policy to
   */
  roles: Array<string>;
}

export interface PolicyTestLabelDrift {
  changed: number;

  same: number;
}

export interface PolicyTestResult {
  created_at: Date;

  id: number;

  message_text: string;

  row_index: number;

  run_id: string;

  scored: boolean;

  actual_action?: string;

  expected_action?: string;

  failure_reason?: string;

  passed?: boolean;

  severity?: string;

  actual_labels?: Array<string>;

  expected_labels?: Array<string>;

  raw_response?: Record<string, any>;
}

export interface PolicyTestRow {
  content_type?: string;

  policy?: string;

  recommended_action?: string;

  text?: string;

  labels?: Array<string>;
}

export interface PolicyTestRun {
  config_key: string;

  created_at: Date;

  id: string;

  rows_completed: number;

  rows_total: number;

  set_id: string;

  status: string;

  task_id: string;

  triggered_by: string;

  completed_at?: Date;

  config_updated_at?: Date;

  error_message?: string;

  started_at?: Date;

  metrics?: PolicyTestRunMetrics;
}

export interface PolicyTestRunMetrics {
  mode: string;

  totals: PolicyTestTotals;

  by_label?: Record<string, PolicyTestLabelDrift>;
}

export interface PolicyTestRunResponse {
  duration: string;

  /**
   * Per-row results (only present once the run has finished)
   */
  results?: Array<PolicyTestResult>;

  run?: PolicyTestRun;
}

export interface PolicyTestSeedSpec {
  /**
   * How many rows to sample, newest first; capped at 1000
   */
  limit: number;

  /**
   * Sample only records carrying any of these labels; empty samples everything
   */
  labels?: Array<string>;
}

export interface PolicyTestSet {
  config_key: string;

  created_at: Date;

  created_by: string;

  id: string;

  mode: string;

  name: string;

  row_count: number;

  updated_at: Date;

  team?: string;

  rows?: Array<PolicyTestRow>;

  last_run?: PolicyTestRun;
}

export interface PolicyTestSetListResponse {
  duration: string;

  /**
   * List of policy test sets for the app
   */
  sets: Array<PolicyTestSet>;
}

export interface PolicyTestSetResponse {
  duration: string;

  /**
   * The set's baseline run (earliest completed run); later runs are scored against it. Absent until the first run completes
   */
  baseline_run_id?: string;

  /**
   * Retained run history for this set, newest first
   */
  recent_runs?: Array<PolicyTestRun>;

  set?: PolicyTestSet;
}

export interface PolicyTestTotals {
  failed: number;

  passed: number;

  rows: number;

  scored: number;

  unscored: number;
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
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  poll_option: PollOptionResponseData;
}

export interface PollOptionResponseData {
  id: string;

  text: string;

  custom: Record<string, any>;
}

export interface PollResponse {
  /**
   * Duration of the request in milliseconds
   */
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

  latest_answers: Array<PollVoteResponseData>;

  options: Array<PollOptionResponseData>;

  own_votes: Array<PollVoteResponseData>;

  custom: Record<string, any>;

  latest_votes_by_option: Record<string, Array<PollVoteResponseData>>;

  vote_counts_by_option: Record<string, number>;

  is_closed?: boolean;

  max_votes_allowed?: number;

  /**
   * User response object
   */
  created_by?: UserResponse;
}

export interface PollVoteResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  poll?: PollResponseData;

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

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface PollVotesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Poll votes
   */
  votes: Array<PollVoteResponseData>;

  next?: string;

  prev?: string;
}

export interface PoorByCause {
  delivery: number;

  edge: number;

  isolated_local: number;

  source: number;

  unattributed: number;
}

export interface PoorTail {
  healthy_viewers: number;

  note: string;

  poor_total: number;

  poor_by_cause: PoorByCause;

  supporting: Supporting;

  healthy_pct?: number;
}

export interface PredefinedFilterResponse {
  created_at: Date;

  name: string;

  operation: string;

  updated_at: Date;

  filter: Record<string, any>;

  description?: string;

  query_id?: number;

  sort?: Array<SortParam>;

  performance?: PerformanceAnalysisResponse;

  stats?: PredefinedFilterStatsResponse;
}

export interface PredefinedFilterStatsResponse {
  calls: number;

  max_latency_ms: number;

  last_seen?: Date;
}

export interface PrivacySettingsResponse {
  delivery_receipts?: DeliveryReceiptsResponse;

  read_receipts?: ReadReceiptsResponse;

  typing_indicators?: TypingIndicatorsResponse;
}

export interface PublishedTrackFlags {
  audio: boolean;

  screenshare: boolean;

  screenshare_audio: boolean;

  video: boolean;
}

export interface PublishedTrackMetrics {
  codec?: string;

  track_id?: string;

  track_type?: string;

  warnings?: Array<SessionWarningResponse>;

  bitrate?: MetricTimeSeries;

  framerate?: MetricTimeSeries;

  resolution?: ResolutionMetricsTimeSeries;
}

export interface PublisherAllMetrics {
  audio?: PublisherAudioMetrics;

  rtt_ms?: ActiveCallsLatencyStats;

  video?: PublisherVideoMetrics;
}

export interface PublisherAudioMetrics {
  jitter_ms?: ActiveCallsLatencyStats;
}

export interface PublisherSession {
  duration_min: number;

  started_offset_min: number;

  user_id: string;

  user_session_id: string;

  avg_jitter_ms?: number;

  browser?: string;

  delivery_zone?: string;

  ingest?: string;

  os?: string;

  send_quality_score?: number;

  tool?: string;

  encoding?: EncodingProfile;
}

export interface PublisherStatsResponse {
  total: number;

  unique: number;

  by_track?: Array<TrackStatsResponse>;
}

export interface PublisherVideoMetrics {
  bitrate?: ActiveCallsBitrateStats;

  fps_30?: ActiveCallsFPSStats;

  frame_encoding_time_ms?: ActiveCallsLatencyStats;

  jitter_ms?: ActiveCallsLatencyStats;

  resolution?: ActiveCallsResolutionStats;
}

export interface PublishersMetrics {
  all?: PublisherAllMetrics;
}

export interface PushConfig {
  version: 'v1' | 'v2' | 'v3';

  offline_only?: boolean;
}

export interface PushNotificationConfig {
  /**
   * Whether push notifications are enabled for this feed group
   */
  enable_push?: boolean;

  /**
   * Allowlist of notification types that may trigger push (e.g. follow, comment, reaction, comment_reaction, mention, or any custom activity.type). Empty or omitted means no types. Built-in notifications match notification_context.trigger.type; manually added notification activities match activity.type.
   */
  push_types?: Array<string>;
}

export interface PushNotificationFields {
  offline_only: boolean;

  version: string;

  apn: APNConfigFields;

  firebase: FirebaseConfigFields;

  huawei: HuaweiConfigFields;

  xiaomi: XiaomiConfigFields;

  providers?: Array<PushProvider>;
}

export interface PushNotificationSettingsResponse {
  disabled?: boolean;

  disabled_until?: Date;
}

export interface PushPreferenceInput {
  /**
   * Set the level of call push notifications for the user. One of: all, none, default
   */

  call_level?: 'all' | 'none' | 'default';

  /**
   * Set the push preferences for a specific channel. If empty it sets the default for the user
   */
  channel_cid?: string;

  /**
   * Set the level of chat push notifications for the user. Note: "mentions" is deprecated in favor of "direct_mentions". One of: all, mentions, direct_mentions, all_mentions, none, default
   */

  chat_level?:
    | 'all'
    | 'mentions'
    | 'direct_mentions'
    | 'all_mentions'
    | 'none'
    | 'default';

  /**
   * Disable push notifications till a certain time
   */
  disabled_until?: Date;

  /**
   * Set the level of feeds push notifications for the user. One of: all, none, default
   */

  feeds_level?: 'all' | 'none' | 'default';

  /**
   * Remove the disabled until time. (IE stop snoozing notifications)
   */
  remove_disable?: boolean;

  /**
   * The user id for which to set the push preferences. Required when using server side auths, defaults to current user with client side auth.
   */
  user_id?: string;

  chat_preferences?: ChatPreferencesInput;

  feeds_preferences?: FeedsPreferences;
}

export interface PushPreferencesResponse {
  call_level?: string;

  chat_level?: string;

  disabled_until?: Date;

  feeds_level?: string;

  chat_preferences?: ChatPreferencesResponse;

  feeds_preferences?: FeedsPreferencesResponse;
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

  huawei_host?: string;

  xiaomi_app_secret?: string;

  xiaomi_package_name?: string;

  push_templates?: Array<PushTemplate>;
}

export interface PushProviderRequest {
  name: string;

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

  type?: string;

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

export interface PushTemplate {
  created_at: Date;

  enable_push: boolean;

  event_type:
    | 'message.new'
    | 'message.updated'
    | 'reaction.new'
    | 'notification.reminder_due'
    | 'feeds.activity.added'
    | 'feeds.comment.added'
    | 'feeds.activity.reaction.added'
    | 'feeds.comment.reaction.added'
    | 'feeds.follow.created'
    | 'feeds.notification_feed.updated';

  updated_at: Date;

  template?: string;
}

export interface PushTemplateResponse {
  /**
   * Time when the template was created
   */
  created_at: Date;

  /**
   * Whether push notification is enabled for this event
   */
  enable_push: boolean;

  /**
   * Type of event this template applies to
   */
  event_type: string;

  /**
   * Internal ID of the push provider
   */
  push_provider_internal_id: string;

  /**
   * Time when the template was last updated
   */
  updated_at: Date;

  /**
   * The push notification template
   */
  template?: string;
}

export interface Quality {
  viewer_interruption_note: string;

  interruption_incidents: Array<Incident>;

  connection_avg_jitter_ms: Percentiles;

  connection_avg_latency_ms: Percentiles;

  score_bands_by_connection_pct: ScoreBands;

  score_bands_by_watch_time_pct: ScoreBands;

  p50_quality_score?: number;

  p5_quality_score?: number;

  viewer_interruption_rate_pct?: number;
}

export interface QualityScoreReport {
  histogram: Array<ReportByHistogramBucket>;
}

export interface QualityScoreReportResponse {
  daily: Array<DailyAggregateQualityScoreReportResponse>;
}

export interface QueryActivitiesRequest {
  enrich_own_fields?: boolean;

  /**
   * When true, include both expired and non-expired activities in the result.
   */
  include_expired_activities?: boolean;

  include_private_activities?: boolean;

  /**
   * When true, include soft-deleted activities in the result.
   */
  include_soft_deleted_activities?: boolean;

  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query. Supports location-based queries with 'near' and 'within_bounds' operators.
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryActivitiesResponse {
  duration: string;

  /**
   * List of activities matching the query
   */
  activities: Array<ActivityResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryActivityReactionsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryActivityReactionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  reactions: Array<FeedsReactionResponse>;

  next?: string;

  prev?: string;
}

export interface QueryActivitySharesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  shares: Array<ShareResponse>;

  next?: string;

  prev?: string;
}

export interface QueryAggregateCallStatsRequest {
  from?: string;

  to?: string;

  report_types?: Array<string>;
}

export interface QueryAggregateCallStatsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  call_duration_report?: CallDurationReportResponse;

  call_participant_count_report?: CallParticipantCountReportResponse;

  calls_per_day_report?: CallsPerDayReportResponse;

  network_metrics_report?: NetworkMetricsReportResponse;

  quality_score_report?: QualityScoreReportResponse;

  sdk_usage_report?: SDKUsageReportResponse;

  user_feedback_report?: UserFeedbackReportResponse;
}

export interface QueryAppealsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters for appeals
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions for appeals
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryAppealsResponse {
  duration: string;

  /**
   * List of Appeal Items
   */
  items: Array<AppealItemResponse>;

  next?: string;

  prev?: string;
}

export interface QueryBannedUsersPayload {
  /**
   * Filter conditions to apply to the query
   */
  filter_conditions: Record<string, any>;

  /**
   * Whether to exclude expired bans or not
   */
  exclude_expired_bans?: boolean;

  /**
   * Number of records to return
   */
  limit?: number;

  /**
   * Number of records to offset
   */
  offset?: number;

  user_id?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryBannedUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of found bans
   */
  bans: Array<BanResponse>;
}

export interface QueryBookmarkFoldersRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryBookmarkFoldersResponse {
  duration: string;

  /**
   * List of bookmark folders matching the query
   */
  bookmark_folders: Array<BookmarkFolderResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryBookmarksRequest {
  enrich_own_fields?: boolean;

  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryBookmarksResponse {
  duration: string;

  /**
   * List of bookmarks matching the query
   */
  bookmarks: Array<BookmarkResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryCallMembersRequest {
  id: string;

  type: string;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;
}

export interface QueryCallMembersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  members: Array<MemberResponse>;

  next?: string;

  prev?: string;
}

export interface QueryCallParticipantSessionsResponse {
  call_id: string;

  call_session_id: string;

  call_type: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: number;

  total_participant_duration: number;

  total_participant_sessions: number;

  participants_sessions: Array<ParticipantSessionDetails>;

  next?: string;

  prev?: string;

  session?: CallSessionResponse;
}

export interface QueryCallParticipantsRequest {
  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;
}

export interface QueryCallParticipantsResponse {
  duration: string;

  total_participants: number;

  members: Array<MemberResponse>;

  own_capabilities: Array<OwnCapability>;

  /**
   * List of call participants
   */
  participants: Array<CallParticipantResponse>;

  /**
   * Represents a call
   */
  call: CallResponse;
}

export interface QueryCallSessionParticipantStatsResponse {
  call_id: string;

  call_session_id: string;

  call_type: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  participants: Array<CallStatsParticipant>;

  counts: CallStatsParticipantCounts;

  call_ended_at?: Date;

  call_started_at?: Date;

  next?: string;

  prev?: string;

  tmp_data_source?: string;

  call_events?: Array<CallLevelEventPayload>;
}

export interface QueryCallSessionParticipantStatsTimelineResponse {
  call_id: string;

  call_session_id: string;

  call_type: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  user_id: string;

  user_session_id: string;

  events: Array<CallParticipantTimeline>;
}

export interface QueryCallSessionStatsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;
}

export interface QueryCallSessionStatsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  call_stats: Array<CallStatsSessionResponse>;

  next?: string;

  prev?: string;
}

export interface QueryCallStatsMapResponse {
  call_id: string;

  call_session_id: string;

  call_type: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  counts: CallStatsParticipantCounts;

  call_ended_at?: Date;

  call_started_at?: Date;

  data_source?: string;

  end_time?: Date;

  generated_at?: Date;

  start_time?: Date;

  publishers?: CallStatsMapPublishers;

  sfus?: CallStatsMapSFUs;

  subscribers?: CallStatsMapSubscribers;
}

export interface QueryCallStatsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;
}

export interface QueryCallStatsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  reports: Array<CallStatsReportSummaryResponse>;

  next?: string;

  prev?: string;
}

export interface QueryCallsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;
}

export interface QueryCallsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  calls: Array<CallStateResponseFields>;

  next?: string;

  prev?: string;
}

export interface QueryCampaignsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_limit?: number;

  sort?: Array<SortParamRequest>;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryCampaignsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  campaigns: Array<CampaignResponse>;

  next?: string;

  prev?: string;
}

export interface QueryChannelsRequest {
  /**
   * Number of channels to limit
   */
  limit?: number;

  /**
   * Number of members to limit
   */
  member_limit?: number;

  /**
   * Number of messages to limit
   */
  message_limit?: number;

  /**
   * Channel pagination offset
   */
  offset?: number;

  /**
   * ID of a predefined filter to use instead of filter_conditions
   */
  predefined_filter?: string;

  /**
   * Whether to update channel state or not
   */
  state?: boolean;

  user_id?: string;

  /**
   * Top-level keys of the message sender's channel-member custom data to include under member.custom (max 8 keys, 64 chars each)
   */
  member_custom_include?: Array<string>;

  /**
   * List of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;

  /**
   * Values to interpolate into the predefined filter template
   */
  filter_values?: Record<string, any>;

  sort_values?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryChannelsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of channels
   */
  channels: Array<ChannelStateResponseFields>;

  predefined_filter?: ParsedPredefinedFilterResponse;
}

export interface QueryCollectionsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryCollectionsResponse {
  duration: string;

  /**
   * List of collections matching the query
   */
  collections: Array<CollectionResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryCommentReactionsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryCommentReactionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  reactions: Array<FeedsReactionResponse>;

  next?: string;

  prev?: string;
}

export interface QueryCommentsRequest {
  /**
   * Filter to apply to the query
   */
  filter: Record<string, any>;

  /**
   * Returns the comment with the specified ID along with surrounding comments for context
   */
  id_around?: string;

  /**
   * Maximum number of comments to return
   */
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */

  sort?: 'first' | 'last' | 'top' | 'best' | 'controversial';

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryCommentsResponse {
  duration: string;

  /**
   * List of comments matching the query
   */
  comments: Array<CommentResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryDraftsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryDraftsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Drafts
   */
  drafts: Array<DraftResponse>;

  next?: string;

  prev?: string;
}

export interface QueryFeedMembersRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Sort parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter parameters for the query
   */
  filter?: Record<string, any>;
}

export interface QueryFeedMembersResponse {
  duration: string;

  /**
   * List of feed members
   */
  members: Array<FeedMemberResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryFeedModerationTemplate {
  /**
   * When the template was created
   */
  created_at: Date;

  /**
   * Name of the moderation template
   */
  name: string;

  /**
   * When the template was last updated
   */
  updated_at: Date;

  /**
   * Configuration for a feeds moderation template
   */
  config?: FeedsModerationTemplateConfigPayload;
}

export interface QueryFeedModerationTemplatesResponse {
  duration: string;

  /**
   * List of moderation templates
   */
  templates: Array<QueryFeedModerationTemplate>;
}

export interface QueryFeedsRequest {
  enrich_own_fields?: boolean;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Whether to subscribe to realtime updates
   */
  watch?: boolean;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryFeedsResponse {
  duration: string;

  /**
   * List of feeds matching the query
   */
  feeds: Array<FeedResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryFeedsUsageStatsRequest {
  /**
   * Start date in YYYY-MM-DD format (optional, defaults to 30 days ago)
   */
  from?: string;

  /**
   * End date in YYYY-MM-DD format (optional, defaults to today)
   */
  to?: string;
}

export interface QueryFeedsUsageStatsResponse {
  duration: string;

  activities: DailyMetricStatsResponse;

  api_requests: DailyMetricStatsResponse;

  follows: DailyMetricStatsResponse;

  openai_requests: DailyMetricStatsResponse;

  emau?: EMAUStatsResponse;
}

export interface QueryFollowsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryFollowsResponse {
  duration: string;

  /**
   * List of follow relationships matching the query
   */
  follows: Array<FollowResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryFutureChannelBansPayload {
  /**
   * Whether to exclude expired bans or not
   */
  exclude_expired_bans?: boolean;

  /**
   * When true, the response includes the total number of bans matching the query filter (independent of limit and offset, capped at 100000)
   */
  include_total?: boolean;

  /**
   * Number of records to return
   */
  limit?: number;

  /**
   * Number of records to offset
   */
  offset?: number;

  /**
   * Filter by the target user ID. Server-side: returns all bans against this user. Client-side: narrows the authenticated user's own bans to this target.
   */
  target_user_id?: string;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryFutureChannelBansResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of found future channel bans
   */
  bans: Array<FutureChannelBanResponse>;

  /**
   * Total number of bans matching the query filter, computed at query time and capped at 100000. Only present when include_total is set on the request; omitted when computing the total timed out
   */
  total?: number;
}

export interface QueryLabelResultsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryLabelResultsResponse {
  duration: string;

  /**
   * List of moderation label results
   */
  label_results: Array<LabelResultResponse>;

  next?: string;

  prev?: string;
}

export interface QueryMembersPayload {
  type: string;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions: Record<string, any>;

  id?: string;

  limit?: number;

  offset?: number;

  user_id?: string;

  members?: Array<ChannelMemberRequest>;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryMembershipLevelsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryMembershipLevelsResponse {
  duration: string;

  membership_levels: Array<MembershipLevelResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryMessageFlagsPayload {
  limit?: number;

  offset?: number;

  /**
   * Whether to include deleted messages in the results
   */
  show_deleted_messages?: boolean;

  user_id?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryMessageFlagsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * The flags that match the query
   */
  flags: Array<MessageFlagResponse>;
}

export interface QueryMessageHistoryRequest {
  /**
   * Filter to apply to the query
   */
  filter: Record<string, any>;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;
}

export interface QueryMessageHistoryResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Message history entries
   */
  message_history: Array<MessageHistoryEntryResponse>;

  next?: string;

  prev?: string;
}

export interface QueryModerationConfigsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters for the results
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions for moderation configs
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryModerationConfigsResponse {
  duration: string;

  /**
   * List of moderation configurations
   */
  configs: Array<ConfigResponse>;

  next?: string;

  prev?: string;
}

export interface QueryModerationFlagsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions for moderation flags
   */
  filter?: Record<string, any>;
}

export interface QueryModerationFlagsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  flags: Array<ModerationFlagResponse>;

  next?: string;

  prev?: string;
}

export interface QueryModerationLogsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters for the results
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions for moderation logs
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryModerationLogsResponse {
  duration: string;

  /**
   * List of moderation action logs
   */
  logs: Array<ActionLogResponse>;

  next?: string;

  prev?: string;
}

export interface QueryModerationRulesRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Sorting parameters for the results
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions for moderation rules
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryModerationRulesResponse {
  duration: string;

  /**
   * AI image label definitions with metadata for dashboard rendering
   */
  ai_image_label_definitions: Array<AIImageLabelDefinition>;

  /**
   * Available harm labels for closed caption rules
   */
  closed_caption_labels: Array<string>;

  /**
   * Deprecated: use keyframe_label_classifications instead. Available L1 harm labels for keyframe rules
   */
  keyframe_labels: Array<string>;

  /**
   * Available harm labels for OCR-based rule conditions (keyframe_ocr_rule and ocr_content). Mirrors `closed_caption_labels` today but kept as a separate field so the pickers can diverge later.
   */
  ocr_labels: Array<string>;

  /**
   * List of moderation rules
   */
  rules: Array<ModerationRuleV2Response>;

  /**
   * Stream L1 to leaf-level label name mapping for AI image rules
   */
  ai_image_subclassifications: Record<string, Array<string>>;

  /**
   * Default LLM label descriptions
   */
  default_llm_labels: Record<string, string>;

  /**
   * Recommended LLM label descriptions for username-scoped policies (key starts with 'username:'). Used by /moderation/v2/labels fast-path.
   */
  default_username_llm_labels: Record<string, string>;

  /**
   * L1 to L2 mapping of keyframe harm label classifications
   */
  keyframe_label_classifications: Record<string, Array<string>>;

  next?: string;

  prev?: string;
}

export interface QueryPinnedActivitiesRequest {
  enrich_own_fields?: boolean;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Sorting parameters for the query
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filters to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryPinnedActivitiesResponse {
  duration: string;

  /**
   * List of pinned activities matching the query
   */
  pinned_activities: Array<ActivityPinResponse>;

  /**
   * Cursor for next page
   */
  next?: string;

  /**
   * Cursor for previous page
   */
  prev?: string;
}

export interface QueryPollVotesRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryPollsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;
}

export interface QueryPollsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Polls data returned by the query
   */
  polls: Array<PollResponseData>;

  next?: string;

  prev?: string;
}

export interface QueryPredefinedFiltersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Predefined filters
   */
  predefined_filters: Array<PredefinedFilterResponse>;

  next?: string;

  prev?: string;
}

export interface QueryReactionsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryReactionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  reactions: Array<ReactionResponse>;

  next?: string;

  prev?: string;
}

export interface QueryRemindersRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryRemindersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * MessageReminders data returned by the query
   */
  reminders: Array<ReminderResponseData>;

  next?: string;

  prev?: string;
}

export interface QueryReviewQueueRequest {
  exclude_default_action_config?: boolean;

  limit?: number;

  /**
   * Number of items to lock (1-25)
   */
  lock_count?: number;

  /**
   * Duration for which items should be locked
   */
  lock_duration?: number;

  /**
   * Whether to lock items for review (true), unlock items (false), or just fetch (nil)
   */
  lock_items?: boolean;

  next?: string;

  prev?: string;

  /**
   * Whether to return only statistics
   */
  stats_only?: boolean;

  user_id?: string;

  /**
   * Sorting parameters for the results
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions for review queue items. Accepts built-in fields (e.g. status, channel_cid, severity, recommended_action) and customer-supplied moderation_payload.custom keys: any key that is not a built-in field is matched against the item's custom moderation data (e.g. {"location_id": "loc-42"}). Use filter_config.filterable_custom_keys to discover which custom keys the app exposes as chips.
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryReviewQueueResponse {
  duration: string;

  /**
   * List of review queue items
   */
  items: Array<ReviewQueueItemResponse>;

  /**
   * Configuration for moderation actions
   */
  action_config: Record<string, Array<ModerationActionConfigResponse>>;

  /**
   * Statistics about the review queue
   */
  stats: Record<string, any>;

  next?: string;

  prev?: string;

  default_action_config?: Record<string, Array<ModerationActionConfigResponse>>;

  filter_config?: FilterConfigResponse;
}

export interface QueryRevisionHistoryRequest {
  /**
   * Filter to apply to the query
   */
  filter: Record<string, any>;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;
}

export interface QueryRevisionHistoryResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Revision history entries
   */
  revisions: Array<RevisionHistoryResponse>;

  next?: string;

  prev?: string;
}

export interface QuerySegmentTargetsRequest {
  /**
   * Limit
   */
  limit?: number;

  /**
   * Next
   */
  next?: string;

  /**
   * Prev
   */
  prev?: string;

  sort?: Array<SortParamRequest>;

  filter?: Record<string, any>;
}

export interface QuerySegmentTargetsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Targets
   */
  targets: Array<SegmentTargetResponse>;

  next?: string;

  prev?: string;
}

export interface QuerySegmentsRequest {
  /**
   * Filter to apply to the query
   */
  filter: Record<string, any>;

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;
}

export interface QuerySegmentsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Segments
   */
  segments: Array<SegmentResponse>;

  next?: string;

  prev?: string;
}

export interface QueryTeamUsageStatsRequest {
  /**
   * End date in YYYY-MM-DD format. Used with start_date for custom date range. Returns daily breakdown.
   */
  end_date?: string;

  /**
   * Maximum number of teams to return per page (default: 30, max: 30)
   */
  limit?: number;

  /**
   * Month in YYYY-MM format (e.g., '2026-01'). Mutually exclusive with start_date/end_date. Returns aggregated monthly values.
   */
  month?: string;

  /**
   * Cursor for pagination to fetch next page of teams
   */
  next?: string;

  /**
   * Start date in YYYY-MM-DD format. Used with end_date for custom date range. Returns daily breakdown.
   */
  start_date?: string;

  /**
   * Filter results to a single team ID. Empty string selects users not assigned to any team. Mutually exclusive with 'next'.
   */
  team?: string;
}

export interface QueryTeamUsageStatsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Array of team usage statistics
   */
  teams: Array<TeamUsageStats>;

  /**
   * Cursor for pagination to fetch next page
   */
  next?: string;
}

export interface QueryThreadsRequest {
  limit?: number;

  member_limit?: number;

  next?: string;

  /**
   * Limit the number of participants returned per each thread
   */
  participant_limit?: number;

  prev?: string;

  /**
   * Limit the number of replies returned per each thread
   */
  reply_limit?: number;

  user_id?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryThreadsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of enriched thread states
   */
  threads: Array<ThreadStateResponse>;

  next?: string;

  prev?: string;
}

export interface QueryUserFeedbackRequest {
  limit?: number;

  next?: string;

  prev?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * Filter conditions to apply to the query
   */
  filter_conditions?: Record<string, any>;
}

export interface QueryUserFeedbackResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  user_feedback: Array<UserFeedbackResponse>;

  next?: string;

  prev?: string;
}

export interface QueryUsersPayload {
  /**
   * Filter conditions to apply to the query
   */
  filter_conditions: Record<string, any>;

  include_deactivated_users?: boolean;

  limit?: number;

  offset?: number;

  presence?: boolean;

  user_id?: string;

  /**
   * Array of sort parameters
   */
  sort?: Array<SortParamRequest>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface QueryUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Array of users as result of filters applied.
   */
  users: Array<FullUserResponse>;
}

export interface QueueResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  queue?: ModerationQueueResponse;
}

export interface RTMPBroadcastRequest {
  /**
   * Name identifier for RTMP broadcast, must be unique in call
   */
  name: string;

  /**
   * URL for the RTMP server to send the call to
   */
  stream_url: string;

  /**
   * If provided, will override the call's RTMP settings quality. One of: 360p, 480p, 720p, 1080p, 1440p, portrait-360x640, portrait-480x854, portrait-720x1280, portrait-1080x1920, portrait-1440x2560
   */

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

  /**
   * If provided, will be appended at the end of stream_url
   */
  stream_key?: string;

  layout?: LayoutSettingsRequest;
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
  /**
   * Whether RTMP broadcasting is enabled
   */
  enabled?: boolean;

  /**
   * Resolution to set for the RTMP stream. One of: 360p, 480p, 720p, 1080p, 1440p, portrait-360x640, portrait-480x854, portrait-720x1280, portrait-1080x1920, portrait-1440x2560
   */

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
  /**
   * Type of ranking algorithm. Required. One of: expression, interest
   */

  type: 'expression' | 'interest';

  /**
   * Scoring formula. Required when type is 'expression' or 'interest'
   */
  score?: string;

  /**
   * Default values for ranking
   */
  defaults?: Record<string, any>;

  /**
   * Decay functions configuration
   */
  functions?: Record<string, DecayFunctionConfig>;
}

export interface RawRecordSettings {
  mode: 'available' | 'disabled' | 'auto-on';

  audio_only?: boolean;
}

export interface RawRecordingResponse {
  status: string;
}

export interface RawRecordingSettingsRequest {
  /**
   * Recording mode. One of: available, disabled, auto-on
   */

  mode: 'available' | 'disabled' | 'auto-on';

  /**
   * If true, only audio tracks will be recorded
   */
  audio_only?: boolean;
}

export interface RawRecordingSettingsResponse {
  mode: 'available' | 'disabled' | 'auto-on';

  audio_only?: boolean;
}

export interface Reaction {
  activity_id: string;

  created_at: Date;

  kind: string;

  updated_at: Date;

  user_id: string;

  deleted_at?: Date;

  id?: string;

  parent?: string;

  score?: number;

  target_feeds?: Array<string>;

  children_counts?: Record<string, any>;

  data?: Record<string, any>;

  latest_children?: Record<string, Array<Reaction>>;

  moderation?: Record<string, any>;

  own_children?: Record<string, Array<Reaction>>;

  target_feeds_extra_data?: Record<string, any>;

  user?: User;
}

export interface ReactionDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "reaction.deleted" in this case
   */
  type: string;

  /**
   * The ID of the channel containing the message
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel containing the message
   */
  channel_type?: string;

  /**
   * The CID of the channel containing the message
   */
  cid?: string;

  message_id?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  /**
   * The participants of the thread
   */
  thread_participants?: Array<UserResponseCommonFields>;

  channel_custom?: Record<string, any>;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  reaction?: ReactionResponse;

  user?: UserResponseCommonFields;
}

export interface ReactionGroupResponse {
  /**
   * Count is the number of reactions of this type.
   */
  count: number;

  /**
   * FirstReactionAt is the time of the first reaction of this type. This is the same also if all reaction of this type are deleted, because if someone will react again with the same type, will be preserved the sorting.
   */
  first_reaction_at: Date;

  /**
   * LastReactionAt is the time of the last reaction of this type.
   */
  last_reaction_at: Date;

  /**
   * SumScores is the sum of all scores of reactions of this type. Medium allows you to clap articles more than once and shows the sum of all claps from all users. For example, you can send `clap` x5 using `score: 5`.
   */
  sum_scores: number;

  /**
   * The most recent users who reacted with this type, ordered by most recent first.
   */
  latest_reactions_by: Array<ReactionGroupUserResponse>;
}

export interface ReactionGroupUserResponse {
  /**
   * The time when the user reacted.
   */
  created_at: Date;

  /**
   * The ID of the user who reacted.
   */
  user_id: string;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ReactionNewEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * The type of event: "reaction.new" in this case
   */
  type: string;

  /**
   * The ID of the channel containing the message
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel containing the message
   */
  channel_type?: string;

  /**
   * The CID of the channel containing the message
   */
  cid?: string;

  message_id?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  /**
   * The participants of the thread
   */
  thread_participants?: Array<UserResponseCommonFields>;

  channel_custom?: Record<string, any>;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  reaction?: ReactionResponse;

  user?: UserResponseCommonFields;
}

export interface ReactionRequest {
  /**
   * The type of reaction (e.g. 'like', 'laugh', 'wow')
   */
  type: string;

  /**
   * Date/time of creation
   */
  created_at?: Date;

  /**
   * Reaction score. If not specified reaction has score of 1
   */
  score?: number;

  /**
   * Date/time of the last update
   */
  updated_at?: Date;

  user_id?: string;

  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface ReactionResponse {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Message ID
   */
  message_id: string;

  /**
   * Score of the reaction
   */
  score: number;

  /**
   * Type of reaction
   */
  type: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * User ID
   */
  user_id: string;

  /**
   * Custom data for this object
   */
  custom: Record<string, any>;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface ReactionUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  message_id: string;

  /**
   * Represents channel in chat
   */
  channel: ChannelResponse;

  custom: Record<string, any>;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * The type of event: "reaction.updated" in this case
   */
  type: string;

  /**
   * The ID of the channel containing the message
   */
  channel_id?: string;

  /**
   * The number of members in the channel
   */
  channel_member_count?: number;

  /**
   * The number of messages in the channel
   */
  channel_message_count?: number;

  /**
   * The type of the channel containing the message
   */
  channel_type?: string;

  /**
   * The CID of the channel containing the message
   */
  cid?: string;

  received_at?: Date;

  /**
   * The team ID
   */
  team?: string;

  channel_custom?: Record<string, any>;

  reaction?: ReactionResponse;

  user?: UserResponseCommonFields;
}

export interface ReactivateUserRequest {
  /**
   * ID of the user who's reactivating the user
   */
  created_by_id?: string;

  /**
   * Set this field to put new name for the user
   */
  name?: string;

  /**
   * Restore previously deleted messages
   */
  restore_messages?: boolean;
}

export interface ReactivateUserResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ReactivateUsersRequest {
  /**
   * User IDs to reactivate
   */
  user_ids: Array<string>;

  /**
   * ID of the user who's reactivating the users
   */
  created_by_id?: string;

  restore_channels?: boolean;

  /**
   * Restore previously deleted messages
   */
  restore_messages?: boolean;
}

export interface ReactivateUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  task_id: string;
}

export interface ReadCollectionsResponse {
  duration: string;

  /**
   * List of collections matching the references
   */
  collections: Array<CollectionResponse>;
}

export interface ReadReceiptsResponse {
  enabled: boolean;
}

export interface ReadStateResponse {
  last_read: Date;

  unread_messages: number;

  /**
   * User response object
   */
  user: UserResponse;

  last_delivered_at?: Date;

  last_delivered_message_id?: string;

  last_read_message_id?: string;
}

export interface RecordSettings {
  mode: string;

  audio_only?: boolean;

  quality?: string;

  layout?: LayoutSettings;
}

export interface RecordSettingsRequest {
  /**
   * Recording mode. One of: available, disabled, auto-on
   */

  mode: 'available' | 'disabled' | 'auto-on';

  /**
   * Whether to record audio only
   */
  audio_only?: boolean;

  /**
   * Recording quality. One of: 360p, 480p, 720p, 1080p, 1440p, portrait-360x640, portrait-480x854, portrait-720x1280, portrait-1080x1920, portrait-1440x2560
   */

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

export interface RejectAppealRequestPayload {
  /**
   * Reason for rejecting the appeal
   */
  decision_reason: string;
}

export interface RejectFeedMemberInviteRequest {
  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface RejectFeedMemberInviteResponse {
  duration: string;

  member: FeedMemberResponse;
}

export interface RejectFollowRequest {
  /**
   * Fully qualified ID of the source feed
   */
  source: string;

  /**
   * Fully qualified ID of the target feed
   */
  target: string;
}

export interface RejectFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface ReminderCreatedEvent {
  /**
   * The CID of the Channel for which the reminder was created
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the message for which the reminder was created
   */
  message_id: string;

  /**
   * The ID of the user for whom the reminder was created
   */
  user_id: string;

  custom: Record<string, any>;

  /**
   * The type of event: "reminder.created" in this case
   */
  type: string;

  /**
   * The ID of the parent message, if the reminder is for a thread message
   */
  parent_id?: string;

  received_at?: Date;

  reminder?: ReminderResponseData;
}

export interface ReminderDeletedEvent {
  /**
   * The CID of the Channel for which the reminder was created
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the message for which the reminder was created
   */
  message_id: string;

  /**
   * The ID of the user for whom the reminder was created
   */
  user_id: string;

  custom: Record<string, any>;

  /**
   * The type of event: "reminder.deleted" in this case
   */
  type: string;

  /**
   * The ID of the parent message, if the reminder is for a thread message
   */
  parent_id?: string;

  received_at?: Date;

  reminder?: ReminderResponseData;
}

export interface ReminderNotificationEvent {
  /**
   * The CID of the Channel for which the reminder was created
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the message for which the reminder was created
   */
  message_id: string;

  /**
   * The ID of the user for whom the reminder was created
   */
  user_id: string;

  custom: Record<string, any>;

  /**
   * The type of event: "notification.reminder_due" in this case
   */
  type: string;

  parent_id?: string;

  received_at?: Date;

  reminder?: ReminderResponseData;
}

export interface ReminderResponseData {
  channel_cid: string;

  created_at: Date;

  message_id: string;

  updated_at: Date;

  user_id: string;

  remind_at?: Date;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ReminderUpdatedEvent {
  /**
   * The CID of the Channel for which the reminder was created
   */
  cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the message for which the reminder was created
   */
  message_id: string;

  /**
   * The ID of the user for whom the reminder was created
   */
  user_id: string;

  custom: Record<string, any>;

  /**
   * The type of event: "reminder.updated" in this case
   */
  type: string;

  /**
   * The ID of the parent message, if the reminder is for a thread message
   */
  parent_id?: string;

  received_at?: Date;

  reminder?: ReminderResponseData;
}

export interface RemoveUserGroupMembersRequest {
  /**
   * List of user IDs to remove
   */
  member_ids: Array<string>;

  team_id?: string;
}

export interface RemoveUserGroupMembersResponse {
  duration: string;

  user_group?: UserGroupResponse;
}

export interface RepliesMeta {
  /**
   * True if the subtree was cut because the requested depth was reached.
   */
  depth_truncated: boolean;

  /**
   * True if more siblings exist in the database.
   */
  has_more: boolean;

  /**
   * Number of unread siblings that match current filters.
   */
  remaining: number;

  /**
   * Opaque cursor to request the next page of siblings.
   */
  next_cursor?: string;
}

export interface ReportByHistogramBucket {
  category: string;

  count: number;

  sum: number;

  lower_bound?: Bound;

  upper_bound?: Bound;
}

export interface ReportClientEventRequest {
  /**
   * Client-side events to report (1-100 per request)
   */
  events: Array<ClientEvent>;
}

export interface ReportClientEventResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface ReportResponse {
  call: CallReportResponse;

  participants: ParticipantReportResponse;

  user_ratings: UserRatingReportResponse;
}

export interface ResolutionMetricsTimeSeries {
  height?: MetricTimeSeries;

  width?: MetricTimeSeries;
}

export interface ResolveSipAuthRequest {
  /**
   * SIP caller number
   */
  sip_caller_number: string;

  /**
   * SIP trunk number to look up
   */
  sip_trunk_number: string;

  /**
   * Host from the SIP From header
   */
  from_host?: string;

  /**
   * Transport-layer source IP address of the SIP request
   */
  source_ip?: string;
}

export interface ResolveSipAuthResponse {
  /**
   * Authentication result: password, accept, or no_trunk_found
   */
  auth_result: string;

  duration: string;

  /**
   * Password for digest authentication (when auth_result is password)
   */
  password?: string;

  /**
   * ID of the matched SIP trunk
   */
  trunk_id?: string;

  /**
   * Username for digest authentication (when auth_result is password)
   */
  username?: string;
}

export interface ResolveSipInboundRequest {
  /**
   * SIP caller number
   */
  sip_caller_number: string;

  /**
   * SIP trunk number to resolve
   */
  sip_trunk_number: string;

  /**
   * Optional routing number for routing number-based call routing (10 digits)
   */
  routing_number?: string;

  /**
   * Optional pre-authenticated trunk ID (from PreAuth no-auth flow)
   */
  trunk_id?: string;

  /**
   * SIP digest challenge authentication data
   */
  challenge?: SIPChallengeRequest;

  /**
   * Optional SIP headers as key-value pairs
   */
  sip_headers?: Record<string, string>;
}

export interface ResolveSipInboundResponse {
  duration: string;

  /**
   * Credentials for SIP inbound call authentication
   */
  credentials: SipInboundCredentials;

  /**
   * SIP Inbound Routing Rule response
   */
  sip_routing_rule?: SIPInboundRoutingRuleResponse;

  /**
   * SIP trunk information
   */
  sip_trunk?: SIPTrunkResponse;
}

export interface Response {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface RestoreActionRequestPayload {
  /**
   * Reason for the appeal decision
   */
  decision_reason?: string;
}

export interface RestoreActivityRequest {
  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface RestoreActivityResponse {
  duration: string;

  activity: ActivityResponse;
}

export interface RestoreCommentRequest {
  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface RestoreCommentResponse {
  duration: string;

  activity: ActivityResponse;

  comment: CommentResponse;
}

export interface RestoreFeedGroupRequest {}

export interface RestoreFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface RestoreUsersRequest {
  user_ids: Array<string>;
}

export interface RetentionPolicy {
  app_pk: number;

  enabled_at: Date;

  policy: string;

  config: PolicyConfig;
}

export interface RetentionRunResponse {
  app_pk: number;

  date: string;

  policy: string;

  stats: RunStats;
}

export interface ReviewQueueItemNewEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  /**
   * The flags associated with this review queue item
   */
  flags?: Array<ModerationFlagResponse>;

  action?: ActionLogResponse;

  review_queue_item?: ReviewQueueItemResponse;
}

export interface ReviewQueueItemResponse {
  /**
   * AI-determined text severity
   */
  ai_text_severity: string;

  /**
   * When the item was created
   */
  created_at: Date;

  /**
   * ID of the entity being reviewed
   */
  entity_id: string;

  /**
   * Type of entity being reviewed
   */
  entity_type: string;

  /**
   * Whether the item has been escalated
   */
  escalated: boolean;

  flags_count: number;

  /**
   * Unique identifier of the review queue item
   */
  id: string;

  latest_moderator_action: string;

  /**
   * Suggested moderation action
   */
  recommended_action: string;

  /**
   * ID of the moderator who reviewed the item
   */
  reviewed_by: string;

  /**
   * Severity level of the content
   */
  severity: number;

  /**
   * Current status of the review
   */
  status: string;

  /**
   * When the item was last updated
   */
  updated_at: Date;

  /**
   * Moderation actions taken
   */
  actions: Array<ActionLogResponse>;

  /**
   * Associated ban records
   */
  bans: Array<BanInfoResponse>;

  /**
   * Associated flag records
   */
  flags: Array<ModerationFlagResponse>;

  /**
   * Detected languages in the content
   */
  languages: Array<string>;

  /**
   * When the review was completed
   */
  completed_at?: Date;

  config_key?: string;

  /**
   * ID of who created the entity
   */
  entity_creator_id?: string;

  /**
   * When the item was escalated
   */
  escalated_at?: Date;

  /**
   * ID of the moderator who escalated the item
   */
  escalated_by?: string;

  /**
   * When the item was reviewed
   */
  reviewed_at?: Date;

  /**
   * Teams associated with this item
   */
  teams?: Array<string>;

  activity?: EnrichedActivity;

  appeal?: AppealItemResponse;

  /**
   * User response object
   */
  assigned_to?: UserResponse;

  call?: ModerationCallResponse;

  entity_creator?: EntityCreatorResponse;

  escalation_metadata?: EscalationMetadata;

  feeds_v2_activity?: EnrichedActivity;

  feeds_v2_reaction?: Reaction;

  feeds_v3_activity?: FeedsV3ActivityResponse;

  feeds_v3_comment?: FeedsV3CommentResponse;

  message?: ChatMessageResponse;

  /**
   * Content payload for moderation
   */
  moderation_payload?: ModerationPayloadResponse;

  reaction?: Reaction;
}

export interface ReviewQueueItemUpdatedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  /**
   * The flags associated with this review queue item
   */
  flags?: Array<ModerationFlagResponse>;

  action?: ActionLogResponse;

  review_queue_item?: ReviewQueueItemResponse;
}

export interface RevisionHistoryResponse {
  action_type: string;

  actor_type: string;

  created_at: Date;

  object_id: string;

  object_type: string;

  user_id: string;

  changed_fields?: Array<string>;

  previous_obj_serialized?: Record<string, any>;
}

export interface RingCallRequest {
  /**
   * Indicate if call should be video
   */
  video?: boolean;

  /**
   * Members that should receive the ring. If no ids are provided, all call members who are not already in the call will receive ring notifications.
   */
  members_ids?: Array<string>;
}

export interface RingCallResponse {
  duration: string;

  /**
   * List of members ringing notification was sent to
   */
  members_ids: Array<string>;
}

export interface RingSettings {
  auto_cancel_timeout_ms: number;

  incoming_call_timeout_ms: number;

  missed_call_timeout_ms: number;
}

export interface RingSettingsRequest {
  /**
   * When none of the callees accept a ring call in this time a rejection will be sent by the caller with reason 'timeout' by the SDKs
   */
  auto_cancel_timeout_ms: number;

  /**
   * When a callee is online but doesn't answer a ring call in this time a rejection will be sent with reason 'timeout' by the SDKs
   */
  incoming_call_timeout_ms: number;

  /**
   * When a callee doesn't accept or reject a ring call in this time a missed call event will be sent
   */
  missed_call_timeout_ms?: number;
}

export interface RingSettingsResponse {
  auto_cancel_timeout_ms: number;

  incoming_call_timeout_ms: number;

  missed_call_timeout_ms: number;
}

export interface Role {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Whether this is a custom role or built-in
   */
  custom: boolean;

  /**
   * Unique role name
   */
  name: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * List of scopes where this role is currently present. `.app` means that role is present in app-level grants
   */
  scopes: Array<string>;
}

export interface RuleBuilderAction {
  reason?: string;

  skip_inbox?: boolean;

  type?:
    | 'ban_user'
    | 'flag_user'
    | 'flag_content'
    | 'block_content'
    | 'shadow_content'
    | 'bounce_flag_content'
    | 'bounce_content'
    | 'bounce_remove_content'
    | 'mute_video'
    | 'mute_audio'
    | 'blur'
    | 'call_blur'
    | 'end_call'
    | 'kick_user'
    | 'warning'
    | 'call_warning'
    | 'webhook_only';

  ban_options?: BanOptions;

  call_options?: CallActionOptions;

  flag_user_options?: FlagUserOptions;
}

export interface RuleBuilderCondition {
  confidence?: number;

  type?: string;

  call_custom_property_params?: CallCustomPropertyParameters;

  call_type_rule_params?: CallTypeRuleParameters;

  call_violation_count_params?: CallViolationCountParameters;

  channel_message_count_rule_params?: ChannelMessageCountRuleParameters;

  closed_caption_rule_params?: ClosedCaptionRuleParameters;

  content_count_rule_params?: ContentCountRuleParameters;

  content_custom_property_count_params?: ContentCustomPropertyCountParameters;

  content_custom_property_params?: ContentCustomPropertyParameters;

  content_flag_count_rule_params?: FlagCountRuleParameters;

  flood_identical_params?: FloodIdenticalRuleParameters;

  flood_similar_params?: FloodSimilarRuleParameters;

  image_content_params?: ImageContentParameters;

  image_rule_params?: ImageRuleParameters;

  ip_content_count_rule_params?: IPContentCountRuleParameters;

  ip_flag_count_rule_params?: IPFlagCountRuleParameters;

  keyframe_ocr_rule_params?: KeyframeOCRRuleParameters;

  keyframe_rule_params?: KeyframeRuleParameters;

  ocr_content_params?: OCRContentParameters;

  text_content_params?: TextContentParameters;

  text_rule_params?: TextRuleParameters;

  user_created_within_params?: UserCreatedWithinParameters;

  user_custom_property_params?: UserCustomPropertyParameters;

  user_flag_count_rule_params?: FlagCountRuleParameters;

  user_identical_content_count_params?: UserIdenticalContentCountParameters;

  user_role_params?: UserRoleParameters;

  user_rule_params?: UserRuleParameters;

  video_content_params?: VideoContentParameters;

  video_rule_params?: VideoRuleParameters;
}

export interface RuleBuilderConditionGroup {
  logic?: string;

  conditions?: Array<RuleBuilderCondition>;
}

export interface RuleBuilderConfig {
  async?: boolean;

  rules?: Array<RuleBuilderRule>;
}

export interface RuleBuilderRule {
  rule_type: string;

  cooldown_period?: string;

  id?: string;

  logic?: string;

  action_sequences?: Array<CallRuleActionSequence>;

  conditions?: Array<RuleBuilderCondition>;

  groups?: Array<RuleBuilderConditionGroup>;

  action?: RuleBuilderAction;
}

export interface RunStats {
  channels_deleted?: number;

  messages_deleted?: number;
}

export interface S3Request {
  /**
   * The AWS region where the bucket is hosted
   */
  s3_region: string;

  /**
   * The AWS API key. To use Amazon S3 as your storage provider, you have two authentication options: IAM role or API key. If you do not specify the `s3_api_key` parameter, Stream will use IAM role authentication. In that case make sure to have the correct IAM role configured for your application.
   */
  s3_api_key?: string;

  /**
   * The custom endpoint for S3. If you want to use a custom endpoint, you must also provide the `s3_api_key` and `s3_secret` parameters.
   */
  s3_custom_endpoint_url?: string;

  /**
   * The AWS API Secret
   */
  s3_secret?: string;
}

export interface SDKUsageReport {
  per_sdk_usage: Record<string, PerSDKUsageReport>;
}

export interface SDKUsageReportResponse {
  daily: Array<DailyAggregateSDKUsageReportResponse>;
}

export interface SFULocationResponse {
  datacenter: string;

  id: string;

  /**
   * Geographic coordinates
   */
  coordinates: CoordinatesResponse;

  /**
   * Geographic location metadata
   */
  location: LocationResponse;

  count?: number;
}

export interface SIPCallConfigsRequest {
  /**
   * Custom data associated with the call
   */
  custom_data?: Record<string, any>;
}

export interface SIPCallConfigsResponse {
  /**
   * Custom data associated with the call
   */
  custom_data: Record<string, any>;
}

export interface SIPCallerConfigsRequest {
  /**
   * Unique identifier for the caller (handlebars template)
   */
  id: string;

  /**
   * Custom data associated with the caller (values are handlebars templates)
   */
  custom_data?: Record<string, any>;
}

export interface SIPCallerConfigsResponse {
  /**
   * Unique identifier for the caller
   */
  id: string;

  /**
   * Custom data associated with the caller
   */
  custom_data: Record<string, any>;
}

export interface SIPChallengeRequest {
  /**
   * Deprecated: A1 hash for backward compatibility
   */
  a1?: string;

  /**
   * Hash algorithm (e.g., MD5, SHA-256)
   */
  algorithm?: string;

  /**
   * Character set
   */
  charset?: string;

  /**
   * Client nonce for qop=auth
   */
  cnonce?: string;

  /**
   * SIP method (e.g., INVITE)
   */
  method?: string;

  /**
   * Nonce count for qop=auth
   */
  nc?: string;

  /**
   * Server nonce
   */
  nonce?: string;

  /**
   * Opaque value
   */
  opaque?: string;

  /**
   * Authentication realm
   */
  realm?: string;

  /**
   * Digest response hash from client
   */
  response?: string;

  /**
   * Whether the nonce is stale
   */
  stale?: boolean;

  /**
   * Request URI
   */
  uri?: string;

  /**
   * Whether to hash the username
   */
  userhash?: boolean;

  /**
   * Username for authentication
   */
  username?: string;

  /**
   * Domain list
   */
  domain?: Array<string>;

  /**
   * Quality of protection options
   */
  qop?: Array<string>;
}

export interface SIPDirectRoutingRuleCallConfigsRequest {
  /**
   * ID of the call (handlebars template)
   */
  call_id: string;

  /**
   * Type of the call
   */
  call_type: string;
}

export interface SIPDirectRoutingRuleCallConfigsResponse {
  /**
   * ID of the call
   */
  call_id: string;

  /**
   * Type of the call
   */
  call_type: string;
}

export interface SIPInboundRoutingRulePinConfigsRequest {
  /**
   * Optional webhook URL for custom PIN handling
   */
  custom_webhook_url?: string;

  /**
   * Prompt message for failed PIN attempts
   */
  pin_failed_attempt_prompt?: string;

  /**
   * Prompt message for hangup after PIN input
   */
  pin_hangup_prompt?: string;

  /**
   * Prompt message for PIN input
   */
  pin_prompt?: string;

  /**
   * Prompt message for successful PIN input
   */
  pin_success_prompt?: string;
}

export interface SIPInboundRoutingRulePinConfigsResponse {
  /**
   * Optional webhook URL for custom PIN handling
   */
  custom_webhook_url?: string;

  /**
   * Prompt message for failed PIN attempts
   */
  pin_failed_attempt_prompt?: string;

  /**
   * Prompt message for hangup after PIN input
   */
  pin_hangup_prompt?: string;

  /**
   * Prompt message for PIN input
   */
  pin_prompt?: string;

  /**
   * Prompt message for successful PIN input
   */
  pin_success_prompt?: string;
}

export interface SIPInboundRoutingRuleRequest {
  /**
   * Name of the SIP Inbound Routing Rule
   */
  name: string;

  /**
   * List of SIP trunk IDs
   */
  trunk_ids: Array<string>;

  /**
   * Configuration for SIP caller settings
   */
  caller_configs: SIPCallerConfigsRequest;

  /**
   * List of called numbers
   */
  called_numbers?: Array<string>;

  /**
   * List of caller numbers (optional)
   */
  caller_numbers?: Array<string>;

  /**
   * Configuration for SIP call settings
   */
  call_configs?: SIPCallConfigsRequest;

  /**
   * Configuration for direct routing rule calls
   */
  direct_routing_configs?: SIPDirectRoutingRuleCallConfigsRequest;

  /**
   * Configuration for PIN protection settings
   */
  pin_protection_configs?: SIPPinProtectionConfigsRequest;

  /**
   * Configuration for PIN routing rule calls
   */
  pin_routing_configs?: SIPInboundRoutingRulePinConfigsRequest;
}

export interface SIPInboundRoutingRuleResponse {
  /**
   * Creation timestamp
   */
  created_at: Date;

  duration: string;

  /**
   * Unique identifier of the SIP Inbound Routing Rule
   */
  id: string;

  /**
   * Name of the SIP Inbound Routing Rule
   */
  name: string;

  /**
   * Last update timestamp
   */
  updated_at: Date;

  /**
   * List of called numbers
   */
  called_numbers: Array<string>;

  /**
   * List of SIP trunk IDs
   */
  trunk_ids: Array<string>;

  /**
   * List of caller numbers
   */
  caller_numbers?: Array<string>;

  /**
   * SIP call configuration response
   */
  call_configs?: SIPCallConfigsResponse;

  /**
   * SIP caller configuration response
   */
  caller_configs?: SIPCallerConfigsResponse;

  /**
   * Direct routing rule call configuration response
   */
  direct_routing_configs?: SIPDirectRoutingRuleCallConfigsResponse;

  /**
   * PIN protection configuration response
   */
  pin_protection_configs?: SIPPinProtectionConfigsResponse;

  /**
   * PIN routing rule call configuration response
   */
  pin_routing_configs?: SIPInboundRoutingRulePinConfigsResponse;
}

export interface SIPPinProtectionConfigsRequest {
  /**
   * Default PIN to use if there is no PIN set on the call object
   */
  default_pin?: string;

  /**
   * Whether PIN protection is enabled
   */
  enabled?: boolean;

  /**
   * Maximum number of PIN attempts allowed
   */
  max_attempts?: number;

  /**
   * Number of digits required for the PIN
   */
  required_pin_digits?: number;
}

export interface SIPPinProtectionConfigsResponse {
  /**
   * Whether PIN protection is enabled
   */
  enabled: boolean;

  /**
   * Default PIN to use if there is no PIN set on the call object
   */
  default_pin?: string;

  /**
   * Maximum number of PIN attempts allowed
   */
  max_attempts?: number;

  /**
   * Number of digits required for the PIN
   */
  required_pin_digits?: number;
}

export interface SIPTrunkResponse {
  /**
   * Creation timestamp
   */
  created_at: Date;

  /**
   * Unique identifier for the SIP trunk
   */
  id: string;

  /**
   * Name of the SIP trunk
   */
  name: string;

  /**
   * Password for SIP trunk authentication
   */
  password: string;

  /**
   * Last update timestamp
   */
  updated_at: Date;

  /**
   * The URI for the SIP trunk
   */
  uri: string;

  /**
   * Username for SIP trunk authentication
   */
  username: string;

  /**
   * Allowed IPv4/IPv6 addresses or CIDR blocks
   */
  allowed_ips: Array<string>;

  /**
   * Phone numbers associated with this SIP trunk
   */
  numbers: Array<string>;
}

export interface SRTIngress {
  address: string;
}

export interface ScoreBands {
  good?: number;

  ok?: number;

  poor?: number;
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
  /**
   * Channel filter conditions
   */
  filter_conditions: Record<string, any>;

  force_default_search?: boolean;

  force_sql_v2_backend?: boolean;

  /**
   * Number of messages to return
   */
  limit?: number;

  /**
   * Pagination parameter. Cannot be used with non-zero offset.
   */
  next?: string;

  /**
   * Pagination offset. Cannot be used with sort or next.
   */
  offset?: number;

  /**
   * Search phrase
   */
  query?: string;

  /**
   * Sort parameters. Cannot be used with non-zero offset
   */
  sort?: Array<SortParamRequest>;

  /**
   * Message filter conditions
   */
  message_filter_conditions?: Record<string, any>;

  message_options?: MessageOptions;
}

export interface SearchResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Search results
   */
  results: Array<SearchResult>;

  /**
   * Value to pass to the next search query in order to paginate
   */
  next?: string;

  /**
   * Value that points to the previous page. Pass as the next value in a search query to paginate backwards
   */
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

  mentioned_channel: boolean;

  mentioned_here: boolean;

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

  restricted_visibility: Array<string>;

  custom: Record<string, any>;

  reaction_counts: Record<string, number>;

  reaction_scores: Record<string, number>;

  /**
   * User response object
   */
  user: UserResponse;

  command?: string;

  deleted_at?: Date;

  deleted_for_me?: boolean;

  message_text_updated_at?: Date;

  mml?: string;

  parent_id?: string;

  pin_expires?: Date;

  pinned_at?: Date;

  poll_id?: string;

  quoted_message_id?: string;

  show_in_channel?: boolean;

  mentioned_group_ids?: Array<string>;

  mentioned_groups?: Array<UserGroupResponse>;

  mentioned_roles?: Array<string>;

  thread_participants?: Array<UserResponse>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  draft?: DraftResponse;

  i18n?: Record<string, string>;

  image_labels?: Record<string, Array<string>>;

  member?: ChannelMemberPartialResponse;

  moderation?: ModerationV2Response;

  /**
   * User response object
   */
  pinned_by?: UserResponse;

  poll?: PollResponseData;

  /**
   * Represents any chat message
   */
  quoted_message?: MessageResponse;

  reaction_groups?: Record<string, ReactionGroupResponse>;

  reminder?: ReminderResponseData;

  shared_location?: SharedLocationResponseData;
}

export interface SearchRolesResponse {
  duration: string;

  /**
   * Matching roles, sorted ascending by name
   */
  roles: Array<Role>;
}

export interface SearchUserGroupsResponse {
  duration: string;

  /**
   * List of matching user groups
   */
  user_groups: Array<UserGroupResponse>;
}

export interface SearchWarning {
  /**
   * Code corresponding to the warning
   */
  warning_code: number;

  /**
   * Description of the warning
   */
  warning_description: string;

  /**
   * Number of channels searched
   */
  channel_search_count?: number;

  /**
   * Channel CIDs for the searched channels
   */
  channel_search_cids?: Array<string>;
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

export interface Segments {
  by_country_reason: string;

  by_browser: Array<BroadcastSegment>;

  by_country: Array<BroadcastSegment>;

  by_delivery_zone: Array<DeliveryZoneSegment>;

  by_os: Array<BroadcastSegment>;

  by_sdk: Array<BroadcastSegment>;
}

export interface SendCallEventRequest {
  user_id?: string;

  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface SendCallEventResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface SendClosedCaptionRequest {
  speaker_id: string;

  text: string;

  end_time?: Date;

  language?: string;

  service?: string;

  start_time?: Date;

  translated?: boolean;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface SendClosedCaptionResponse {
  duration: string;
}

export interface SendEventRequest {
  event: EventRequest;
}

export interface SendMessageRequest {
  /**
   * Message data for creating or updating a message
   */
  message: MessageRequest;

  force_moderation?: boolean;

  /**
   * When true, the response includes channel_context: a slim channel object with cid, type, id and created_by
   */
  include_channel_context?: boolean;

  /**
   * When true, the response includes mentioned_members: for each mentioned user, whether that user is currently a channel member. Requires the ReadChannelMembers permission
   */
  include_mentioned_members?: boolean;

  keep_channel_hidden?: boolean;

  pending?: boolean;

  skip_enrich_url?: boolean;

  skip_push?: boolean;

  pending_message_metadata?: Record<string, string>;
}

export interface SendMessageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  /**
   * Slim channel object: identity plus creator
   */
  channel_context?: ChannelContextResponse;

  /**
   * Map of mentioned user ID to whether that user is currently an active channel member. Only set when include_mentioned_members was requested; omitted when the message has no mentions or the membership lookup failed
   */
  mentioned_members?: Record<string, boolean>;

  /**
   * Pending message metadata
   */
  pending_message_metadata?: Record<string, string>;
}

export interface SendReactionRequest {
  /**
   * Represents user reaction to a message
   */
  reaction: ReactionRequest;

  /**
   * Whether to replace all existing user reactions
   */
  enforce_unique?: boolean;

  /**
   * Skips any mobile push notifications
   */
  skip_push?: boolean;
}

export interface SendReactionResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  reaction: ReactionResponse;
}

export interface SendUserCustomEventRequest {
  event: UserCustomEventRequest;
}

export interface SessionClient {
  ip?: string;

  name?: string;

  network_type?: string;

  version?: string;

  location?: CallStatsLocation;
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

export interface SessionWarningResponse {
  code: string;

  warning: string;

  time?: Date;
}

export interface SetRetentionPolicyRequest {
  max_age_hours: number;

  policy: 'old-messages' | 'inactive-channels';
}

export interface SetRetentionPolicyResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  policy: RetentionPolicy;
}

export interface SetupSession {
  created_at: Date;

  current_step: string;

  status: string;

  updated_at: Date;

  setup_data: Record<string, any>;

  completed_at?: Date;
}

export interface ShadowBlockActionRequestPayload {
  /**
   * Reason for shadow blocking
   */
  reason?: string;
}

export interface ShareResponse {
  /**
   * ID of the sharing (child) activity
   */
  activity_id: string;

  /**
   * When the share occurred
   */
  created_at: Date;

  /**
   * User response object
   */
  user: UserResponse;
}

export interface SharedLocation {
  latitude: number;

  longitude: number;

  created_by_device_id?: string;

  end_at?: Date;
}

export interface SharedLocationResponse {
  /**
   * Channel CID
   */
  channel_cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Device ID that created the live location
   */
  created_by_device_id: string;

  duration: string;

  /**
   * Latitude coordinate
   */
  latitude: number;

  /**
   * Longitude coordinate
   */
  longitude: number;

  /**
   * Message ID
   */
  message_id: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * User ID
   */
  user_id: string;

  /**
   * Time when the live location expires
   */
  end_at?: Date;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
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

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;
}

export interface SharedLocationsResponse {
  duration: string;

  active_live_locations: Array<SharedLocationResponseData>;
}

export interface ShowChannelRequest {
  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface ShowChannelResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface SingleFollowResponse {
  duration: string;

  follow: FollowResponse;

  /**
   * Whether a notification activity was successfully created
   */
  notification_created?: boolean;
}

export interface SipInboundCredentials {
  /**
   * API key for the application
   */
  api_key: string;

  /**
   * ID of the call
   */
  call_id: string;

  /**
   * Type of the call
   */
  call_type: string;

  /**
   * Authentication token for the call
   */
  token: string;

  /**
   * User ID for the call
   */
  user_id: string;

  /**
   * Custom data associated with the call
   */
  call_custom_data: Record<string, any>;

  /**
   * Custom data associated with the user
   */
  user_custom_data: Record<string, any>;
}

export interface SortParam {
  direction: number;

  field: string;

  type: string;
}

export interface SortParamRequest {
  /**
   * Direction of sorting, 1 for Ascending, -1 for Descending, default is 1. One of: -1, 1
   */
  direction?: number;

  /**
   * Name of field to sort by
   */
  field?: string;

  /**
   * Type of field to sort by. Empty string or omitted means string type (default). One of: number, boolean
   */
  type?: string;
}

export interface SourceHealth {
  co_host_peak: number;

  dead_air_s: number;

  interruptions: Array<SourceInterruption>;

  publisher_sessions: Array<PublisherSession>;
}

export interface SourceInterruption {
  at_offset_min: number;

  dead_air_s: number;

  kind: string;

  seamless?: boolean;
}

export interface SpeechSegmentConfig {
  max_speech_caption_ms?: number;

  silence_duration_ms?: number;
}

export interface StartCampaignRequest {
  scheduled_for?: Date;

  stop_at?: Date;
}

export interface StartCampaignResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  campaign?: CampaignResponse;

  users?: PagerResponse;
}

export interface StartClosedCaptionsRequest {
  /**
   * Enable transcriptions along with closed captions
   */
  enable_transcription?: boolean;

  /**
   * Which external storage to use for transcriptions (only applicable if enable_transcription is true)
   */
  external_storage?: string;

  /**
   * The spoken language in the call, if not provided the language defined in the transcription settings will be used. One of: auto, ar, bg, ca, cs, da, de, el, en, es, et, fi, fr, he, hi, hr, hu, id, it, ja, ko, ms, nl, no, pl, pt, ro, ru, sk, sl, sv, ta, th, tl, tr, uk, zh
   */

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

  speech_segment_config?: SpeechSegmentConfig;
}

export interface StartClosedCaptionsResponse {
  duration: string;
}

export interface StartFrameRecordingRequest {
  recording_external_storage?: string;
}

export interface StartFrameRecordingResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StartHLSBroadcastingRequest {}

export interface StartHLSBroadcastingResponse {
  duration: string;

  /**
   * the URL of the HLS playlist
   */
  playlist_url: string;
}

export interface StartPolicyTestRunRequest {}

export interface StartRTMPBroadcastsRequest {
  /**
   * List of broadcasts to start
   */
  broadcasts: Array<RTMPBroadcastRequest>;
}

export interface StartRTMPBroadcastsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StartRecordingRequest {
  recording_external_storage?: string;
}

export interface StartRecordingResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StartTranscriptionRequest {
  /**
   * Enable closed captions along with transcriptions
   */
  enable_closed_captions?: boolean;

  /**
   * The spoken language in the call, if not provided the language defined in the transcription settings will be used. One of: auto, ar, bg, ca, cs, da, de, el, en, es, et, fi, fr, he, hi, hr, hu, id, it, ja, ko, ms, nl, no, pl, pt, ro, ru, sk, sl, sv, ta, th, tl, tr, uk, zh
   */

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

  /**
   * Store transcriptions in this external storage
   */
  transcription_external_storage?: string;
}

export interface StartTranscriptionResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StopAllRTMPBroadcastsRequest {}

export interface StopAllRTMPBroadcastsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StopCampaignRequest {}

export interface StopClosedCaptionsRequest {
  stop_transcription?: boolean;
}

export interface StopClosedCaptionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StopFrameRecordingRequest {}

export interface StopFrameRecordingResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StopHLSBroadcastingRequest {}

export interface StopHLSBroadcastingResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StopLiveRequest {
  continue_closed_caption?: boolean;

  continue_composite_recording?: boolean;

  continue_hls?: boolean;

  continue_individual_recording?: boolean;

  continue_raw_recording?: boolean;

  continue_recording?: boolean;

  continue_rtmp_broadcasts?: boolean;

  continue_transcription?: boolean;
}

export interface StopLiveResponse {
  duration: string;

  /**
   * Represents a call
   */
  call: CallResponse;
}

export interface StopRTMPBroadcastsRequest {}

export interface StopRTMPBroadcastsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StopRecordingRequest {}

export interface StopRecordingResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StopTranscriptionRequest {
  stop_closed_captions?: boolean;
}

export interface StopTranscriptionResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface StoriesConfig {
  /**
   * Whether to skip already watched stories
   */
  skip_watched?: boolean;

  /**
   * Whether to track watched status for stories
   */
  track_watched?: boolean;
}

export interface StoriesFeedUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The ID of the feed
   */
  fid: string;

  custom: Record<string, any>;

  /**
   * The type of event: "feeds.stories_feed.updated" in this case
   */
  type: string;

  feed_visibility?: string;

  received_at?: Date;

  /**
   * Individual activities for stories feeds
   */
  activities?: Array<ActivityResponse>;

  /**
   * Aggregated activities for stories feeds
   */
  aggregated_activities?: Array<AggregatedActivityResponse>;

  user?: UserResponseCommonFields;
}

export interface SubmitActionRequest {
  /**
   * Type of moderation action to perform. One of: mark_reviewed, delete_message, delete_activity, delete_comment, delete_reaction, ban, custom, unban, restore, delete_user, delete_user_messages, unblock, block, shadow_block, unmask, kick_user, end_call, escalate, de_escalate
   */

  action_type:
    | 'flag'
    | 'mark_reviewed'
    | 'delete_message'
    | 'delete_activity'
    | 'delete_comment'
    | 'delete_reaction'
    | 'ban'
    | 'custom'
    | 'unban'
    | 'restore'
    | 'delete_user'
    | 'delete_user_messages'
    | 'unblock'
    | 'block'
    | 'shadow_block'
    | 'unmask'
    | 'kick_user'
    | 'end_call'
    | 'reject_appeal'
    | 'escalate'
    | 'de_escalate'
    | 'bypass';

  /**
   * UUID of the appeal to act on (required for reject_appeal, optional for other actions)
   */
  appeal_id?: string;

  /**
   * UUID of the review queue item to act on
   */
  item_id?: string;

  user_id?: string;

  /**
   * Configuration for ban moderation action
   */
  ban?: BanActionRequestPayload;

  /**
   * Configuration for block action
   */
  block?: BlockActionRequestPayload;

  bypass?: BypassActionRequest;

  /**
   * Configuration for custom moderation action
   */
  custom?: CustomActionRequestPayload;

  /**
   * Configuration for activity deletion action
   */
  delete_activity?: DeleteActivityRequestPayload;

  /**
   * Configuration for comment deletion action
   */
  delete_comment?: DeleteCommentRequestPayload;

  /**
   * Configuration for message deletion action
   */
  delete_message?: DeleteMessageRequestPayload;

  /**
   * Configuration for reaction deletion action
   */
  delete_reaction?: DeleteReactionRequestPayload;

  /**
   * Configuration for user deletion action
   */
  delete_user?: DeleteUserRequestPayload;

  /**
   * Configuration for deleting all of a user's chat messages without banning them or deleting their account
   */
  delete_user_messages?: DeleteUserMessagesRequestPayload;

  /**
   * Configuration for escalation action
   */
  escalate?: EscalatePayload;

  flag?: FlagRequest;

  /**
   * Configuration for mark reviewed action
   */
  mark_reviewed?: MarkReviewedRequestPayload;

  /**
   * Configuration for rejecting an appeal
   */
  reject_appeal?: RejectAppealRequestPayload;

  /**
   * Configuration for restore action. State-aware: reverses whichever of a delete, a block, or a shadow block currently applies to the content (including both a delete and a block/shadow block at once).
   */
  restore?: RestoreActionRequestPayload;

  /**
   * Configuration for shadow block action
   */
  shadow_block?: ShadowBlockActionRequestPayload;

  /**
   * Configuration for unban moderation action
   */
  unban?: UnbanActionRequestPayload;

  /**
   * Deprecated: use restore instead — it now also reverses a block or shadow block. Configuration for unblock action.
   */
  unblock?: UnblockActionRequestPayload;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface SubmitActionResponse {
  duration: string;

  /**
   * Present when the appeal was accepted but the entity could not be restored automatically. The moderator should restore it manually.
   */
  auto_restore_warning?: string;

  appeal_item?: AppealItemResponse;

  item?: ReviewQueueItemResponse;
}

export interface SubmitModerationFeedbackRequest {
  /**
   * The moderated content the moderator is providing feedback on
   */
  message: string;

  /**
   * Original publication time of the moderated content (RFC3339)
   */
  published_at: string;

  /**
   * Provider-side reference identifying the moderated content
   */
  reference: string;

  /**
   * Optional moderation channel UUID for context
   */
  channel_id?: string;

  /**
   * Action originally produced by the moderation system
   */
  current_recommended_action?: string;

  /**
   * Optional free-form note explaining why the classification was wrong
   */
  description?: string;

  /**
   * Optional moderator-supplied action
   */
  expected_recommended_action?: string;

  /**
   * Classifications originally produced by the moderation system
   */
  current_labels?: Array<string>;

  /**
   * Optional moderator-supplied classifications (up to 16 entries)
   */
  expected_labels?: Array<string>;
}

export interface SubmitModerationFeedbackResponse {
  duration: string;
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

export interface Supporting {
  delivery_incident_windows: Array<Incident>;

  edge_outlier_zones: Array<string>;

  source_drop_windows: Array<TimeWindow>;
}

export interface TargetResolution {
  height: number;

  width: number;

  bitrate?: number;
}

export interface TeamUsageStats {
  /**
   * Team identifier (empty string for users not assigned to any team)
   */
  team: string;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  concurrent_connections: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  concurrent_users: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  image_moderations_daily: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  messages_daily: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  messages_last_24_hours: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  messages_last_30_days: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  messages_month_to_date: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  messages_total: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  translations_daily: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  users_daily: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  users_engaged_last_30_days: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  users_engaged_month_to_date: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  users_last_24_hours: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  users_last_30_days: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  users_month_to_date: MetricStats;

  /**
   * Statistics for a single metric with optional daily breakdown
   */
  users_total: MetricStats;
}

export interface TextContentParameters {
  contains_url?: boolean;

  label_operator?: string;

  severity?: string;

  text_length?: number;

  text_length_operator?: string;

  blocklist_match?: Array<string>;

  harm_labels?: Array<string>;

  llm_harm_labels?: Record<string, string>;
}

export interface TextRuleParameters {
  contains_url?: boolean;

  semantic_filter_min_threshold?: number;

  severity?: string;

  threshold?: number;

  time_window?: string;

  blocklist_match?: Array<string>;

  harm_labels?: Array<string>;

  semantic_filter_names?: Array<string>;

  llm_harm_labels?: Record<string, string>;
}

export interface ThreadParticipant {
  channel_cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  last_read_at: Date;

  custom: Record<string, any>;

  last_thread_message_at?: Date;

  /**
   * Left Thread At is the time when the user left the thread
   */
  left_thread_at?: Date;

  /**
   * Thead ID is unique string identifier of the thread
   */
  thread_id?: string;

  /**
   * User ID is unique string identifier of the user
   */
  user_id?: string;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface ThreadResponse {
  /**
   * Active Participant Count
   */
  active_participant_count: number;

  /**
   * Channel CID
   */
  channel_cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Created By User ID
   */
  created_by_user_id: string;

  /**
   * Parent Message ID
   */
  parent_message_id: string;

  /**
   * Participant Count
   */
  participant_count: number;

  /**
   * Reply Count
   */
  reply_count: number;

  /**
   * Title
   */
  title: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  /**
   * Custom data for this object
   */
  custom: Record<string, any>;

  /**
   * Deleted At
   */
  deleted_at?: Date;

  /**
   * Last Message At
   */
  last_message_at?: Date;

  /**
   * Thread Participants
   */
  thread_participants?: Array<ThreadParticipant>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * User response object
   */
  created_by?: UserResponse;

  /**
   * Represents any chat message
   */
  parent_message?: MessageResponse;
}

export interface ThreadStateResponse {
  /**
   * Active Participant Count
   */
  active_participant_count: number;

  /**
   * Channel CID
   */
  channel_cid: string;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Created By User ID
   */
  created_by_user_id: string;

  /**
   * Parent Message ID
   */
  parent_message_id: string;

  /**
   * Participant Count
   */
  participant_count: number;

  /**
   * Reply Count
   */
  reply_count: number;

  /**
   * Title
   */
  title: string;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  latest_replies: Array<MessageResponse>;

  /**
   * Custom data for this object
   */
  custom: Record<string, any>;

  /**
   * Deleted At
   */
  deleted_at?: Date;

  /**
   * Last Message At
   */
  last_message_at?: Date;

  read?: Array<ReadStateResponse>;

  /**
   * Thread Participants
   */
  thread_participants?: Array<ThreadParticipant>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * User response object
   */
  created_by?: UserResponse;

  draft?: DraftResponse;

  /**
   * Represents any chat message
   */
  parent_message?: MessageResponse;
}

export interface ThreadUpdatedEvent {
  created_at: Date;

  custom: Record<string, any>;

  type: string;

  channel_id?: string;

  channel_type?: string;

  cid?: string;

  received_at?: Date;

  thread?: ThreadResponse;
}

export interface ThreadedCommentResponse {
  bookmark_count: number;

  confidence_score: number;

  created_at: Date;

  downvote_count: number;

  id: string;

  object_id: string;

  object_type: string;

  reaction_count: number;

  reply_count: number;

  score: number;

  /**
   * Status of the comment. One of: active, deleted, removed, hidden
   */

  status: 'active' | 'deleted' | 'removed' | 'hidden' | 'shadow_blocked';

  updated_at: Date;

  upvote_count: number;

  mentioned_users: Array<UserResponse>;

  own_reactions: Array<FeedsReactionResponse>;

  /**
   * User response object
   */
  user: UserResponse;

  controversy_score?: number;

  deleted_at?: Date;

  edited_at?: Date;

  parent_id?: string;

  text?: string;

  attachments?: Array<Attachment>;

  latest_reactions?: Array<FeedsReactionResponse>;

  /**
   * Slice of nested comments (may be empty).
   */
  replies?: Array<ThreadedCommentResponse>;

  custom?: Record<string, any>;

  i18n?: Record<string, string>;

  /**
   * Cursor & depth information for a comment's direct replies. Mirrors Reddit's 'load more replies' semantics.
   */
  meta?: RepliesMeta;

  moderation?: ModerationV2Response;

  reaction_groups?: Record<string, FeedsReactionGroupResponse>;
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

export interface TimeWindow {
  from: string;

  to: string;
}

export interface TopBroadcast {
  call_cid: string;

  hours_watched: number;

  peak_concurrent_viewers: number;

  poor_pct?: number;
}

export interface TrackActivityMetricsEvent {
  /**
   * The ID of the activity to track the metric for
   */
  activity_id: string;

  /**
   * The metric name (e.g. views, clicks, impressions). Alphanumeric and underscores only.
   */
  metric: string;

  /**
   * The amount to increment (positive) or decrement (negative). Defaults to 1. The absolute value counts against rate limits.
   */
  delta?: number;
}

export interface TrackActivityMetricsEventResult {
  /**
   * The activity ID from the request
   */
  activity_id: string;

  /**
   * Whether the metric was counted (false if rate-limited)
   */
  allowed: boolean;

  /**
   * The metric name from the request
   */
  metric: string;

  /**
   * Error message if processing failed
   */
  error?: string;
}

export interface TrackActivityMetricsRequest {
  /**
   * List of metric events to track (max 100 per request)
   */
  events: Array<TrackActivityMetricsEvent>;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface TrackActivityMetricsResponse {
  duration: string;

  /**
   * Results for each event in the request, in the same order
   */
  results: Array<TrackActivityMetricsEventResult>;
}

export interface TrackStatsResponse {
  duration_seconds: number;

  track_type: string;
}

export interface TranscriptionSettings {
  /**
   * One of: available, disabled, auto-on
   */

  closed_caption_mode: 'available' | 'disabled' | 'auto-on';

  /**
   * The language used in this call as a two letter code
   */

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

  speech_segment_config?: SpeechSegmentConfig;

  translation?: TranslationSettings;
}

export interface TranscriptionSettingsRequest {
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

  mode?: 'available' | 'disabled' | 'auto-on';

  speech_segment_config?: SpeechSegmentConfig;

  translation?: TranslationSettings;
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

  speech_segment_config?: SpeechSegmentConfig;

  translation?: TranslationSettings;
}

export interface TranslateActivityRequest {
  /**
   * ISO 639-1 language code to translate to
   */
  language: string;
}

export interface TranslateActivityResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  activity: ActivityResponse;
}

export interface TranslateCommentRequest {
  /**
   * ISO 639-1 language code to translate to
   */
  language: string;
}

export interface TranslateCommentResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  comment: CommentResponse;
}

export interface TranslateMessageRequest {
  /**
   * Language to translate message to
   */

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

export interface TranslationSettings {
  enabled?: boolean;

  languages?: Array<string>;
}

export interface TriggeredRuleResponse {
  /**
   * ID of the moderation rule that triggered
   */
  rule_id: string;

  /**
   * Action types resolved from the rule's action sequence
   */
  actions: Array<string>;

  /**
   * Name of the moderation rule that triggered
   */
  rule_name?: string;

  /**
   * Type of the moderation rule that triggered (content, user, or call)
   */
  type?: string;

  /**
   * Violation count for action sequence rules (1-based)
   */
  violation_number?: number;

  call_options?: CallActionOptions;
}

export interface TruncateChannelRequest {
  /**
   * Permanently delete channel data (messages, reactions, etc.)
   */
  hard_delete?: boolean;

  /**
   * When `message` is set disables all push notifications for it
   */
  skip_push?: boolean;

  /**
   * Truncate channel data up to `truncated_at`. The system message (if provided) creation time is always greater than `truncated_at`
   */
  truncated_at?: Date;

  user_id?: string;

  /**
   * List of member IDs to hide message history for. If empty, truncates the channel for all members
   */
  member_ids?: Array<string>;

  /**
   * Message data for creating or updating a message
   */
  message?: MessageRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface TruncateChannelResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;
}

export interface TypingIndicatorsResponse {
  enabled: boolean;
}

export interface UnbanActionRequestPayload {
  /**
   * Channel CID for channel-specific unban
   */
  channel_cid?: string;

  /**
   * Reason for the appeal decision
   */
  decision_reason?: string;

  /**
   * Also remove the future channels ban for this user
   */
  remove_future_channels_ban?: boolean;

  /**
   * Optional: unban user directly without review item
   */
  target_user_id?: string;
}

export interface UnbanRequest {
  /**
   * ID of the user performing the unban
   */
  unbanned_by_id?: string;

  /**
   * User request object
   */
  unbanned_by?: UserRequest;
}

export interface UnbanResponse {
  duration: string;
}

export interface UnblockActionRequestPayload {
  /**
   * Reason for the appeal decision
   */
  decision_reason?: string;
}

export interface UnblockUserRequest {
  /**
   * the user to unblock
   */
  user_id: string;
}

export interface UnblockUserResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface UnblockUsersRequest {
  blocked_user_id: string;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UnblockUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface UnblockedUserEvent {
  call_cid: string;

  created_at: Date;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.unblocked_user" in this case
   */
  type: string;
}

export interface UndeleteMessageRequest {
  /**
   * ID of the user who is undeleting the message
   */
  undeleted_by: string;
}

export interface UndeleteMessageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message: MessageResponse;
}

export interface UnfollowBatchRequest {
  /**
   * List of follow relationships to remove, each with optional keep_history
   */
  follows: Array<UnfollowPair>;

  /**
   * Whether to delete the corresponding notification activity (default: false)
   */
  delete_notification_activity?: boolean;

  /**
   * If true, enriches the follow's source_feed and target_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;
}

export interface UnfollowBatchResponse {
  duration: string;

  /**
   * List of follow relationships that were removed
   */
  follows: Array<FollowResponse>;
}

export interface UnfollowPair {
  /**
   * Fully qualified ID of the source feed
   */
  source: string;

  /**
   * Fully qualified ID of the target feed
   */
  target: string;

  /**
   * When true, activities from the unfollowed feed will remain in the source feed's timeline (default: false)
   */
  keep_history?: boolean;
}

export interface UnfollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface UnmuteChannelRequest {
  /**
   * Duration of mute in milliseconds
   */
  expiration?: number;

  user_id?: string;

  /**
   * Channel CIDs to mute (if multiple channels)
   */
  channel_cids?: Array<string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UnmuteRequest {
  /**
   * User IDs to unmute
   */
  target_ids: Array<string>;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UnmuteResponse {
  duration: string;

  /**
   * A list of users that can't be found. Common cause for this is deleted users
   */
  non_existing_users?: Array<string>;
}

export interface UnpinActivityResponse {
  duration: string;

  /**
   * Fully qualified ID of the feed the activity was unpinned from
   */
  feed: string;

  /**
   * ID of the user who unpinned the activity
   */
  user_id: string;

  activity: ActivityResponse;
}

export interface UnpinRequest {
  /**
   * the session ID of the user who pinned the message
   */
  session_id: string;

  /**
   * the user ID of the user who pinned the message
   */
  user_id: string;
}

export interface UnpinResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface UnreadCountsBatchRequest {
  user_ids: Array<string>;
}

export interface UnreadCountsBatchResponse {
  /**
   * Duration of the request in milliseconds
   */
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

  channel_type: Array<UnreadCountsChannelType>;

  channels: Array<UnreadCountsChannel>;

  threads: Array<UnreadCountsThread>;

  total_unread_count_by_team?: Record<string, number>;
}

export interface UnreadCountsThread {
  last_read: Date;

  last_read_message_id: string;

  parent_message_id: string;

  unread_count: number;
}

export interface UpdateActivitiesPartialBatchRequest {
  /**
   * List of activity changes to apply. Each change specifies an activity ID and the fields to set/unset
   */
  changes: Array<UpdateActivityPartialChangeRequest>;

  /**
   * If true, forces moderation to run for server-side requests. By default, server-side requests skip moderation. Client-side requests always run moderation regardless of this field.
   */
  force_moderation?: boolean;
}

export interface UpdateActivitiesPartialBatchResponse {
  duration: string;

  /**
   * List of successfully updated activities
   */
  activities: Array<ActivityResponse>;
}

export interface UpdateActivityPartialChangeRequest {
  /**
   * ID of the activity to update
   */
  activity_id: string;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when handle_mention_notifications creates notifications) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * When true and 'mentioned_user_ids' is updated, automatically creates or deletes mention notifications for added/removed users. Only applicable for client-side requests (ignored for server-side requests)
   */
  handle_mention_notifications?: boolean;

  /**
   * List of field names to remove. Supported fields: 'custom', 'location', 'expires_at', 'filter_tags', 'interest_tags', 'attachments', 'poll_id', 'mentioned_user_ids'. Use dot-notation for nested custom fields (e.g., 'custom.field_name')
   */
  unset?: Array<string>;

  /**
   * Map of field names to new values. Supported fields: 'text', 'attachments', 'custom', 'visibility', 'visibility_tag', 'restrict_replies' (values: 'everyone', 'people_i_follow', 'nobody'), 'location', 'expires_at', 'filter_tags', 'interest_tags', 'poll_id', 'feeds', 'mentioned_user_ids'. For custom fields, use dot-notation (e.g., 'custom.field_name')
   */
  set?: Record<string, any>;
}

export interface UpdateActivityPartialRequest {
  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when handle_mention_notifications creates notifications) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * If true, enriches the activity's current_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  /**
   * If true, forces moderation to run for server-side requests. By default, server-side requests skip moderation. Client-side requests always run moderation regardless of this field.
   */
  force_moderation?: boolean;

  /**
   * If true, creates notification activities for newly mentioned users and deletes notifications for users no longer mentioned
   */
  handle_mention_notifications?: boolean;

  /**
   * If true, runs activity processors on the updated activity. Processors will only run if the activity text and/or attachments are changed. Defaults to false.
   */
  run_activity_processors?: boolean;

  user_id?: string;

  /**
   * List of field names to remove. Supported fields: 'custom', 'visibility_tag', 'location', 'expires_at', 'filter_tags', 'interest_tags', 'attachments', 'poll_id', 'mentioned_user_ids', 'search_data'. Use dot-notation for nested custom fields (e.g., 'custom.field_name')
   */
  unset?: Array<string>;

  /**
   * Map of field names to new values. Supported fields: 'text', 'attachments', 'custom', 'visibility', 'visibility_tag', 'restrict_replies' (values: 'everyone', 'people_i_follow', 'nobody'), 'location', 'expires_at', 'filter_tags', 'interest_tags', 'poll_id', 'feeds', 'mentioned_user_ids', 'search_data'. For custom fields, use dot-notation (e.g., 'custom.field_name')
   */
  set?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateActivityPartialResponse {
  duration: string;

  activity: ActivityResponse;
}

export interface UpdateActivityRequest {
  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when handle_mention_notifications creates notifications) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * If true, enriches the activity's current_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  /**
   * Time when the activity will expire
   */
  expires_at?: Date;

  /**
   * If true, forces moderation to run for server-side requests. By default, server-side requests skip moderation. Client-side requests always run moderation regardless of this field.
   */
  force_moderation?: boolean;

  /**
   * If true, creates notification activities for newly mentioned users and deletes notifications for users no longer mentioned
   */
  handle_mention_notifications?: boolean;

  /**
   * Poll ID
   */
  poll_id?: string;

  /**
   * Controls who can add comments/replies to this activity. One of: everyone, people_i_follow, nobody
   */

  restrict_replies?: 'everyone' | 'people_i_follow' | 'nobody';

  /**
   * If true, runs activity processors on the updated activity. Processors will only run if the activity text and/or attachments are changed. Defaults to false.
   */
  run_activity_processors?: boolean;

  /**
   * Whether to skip URL enrichment for the activity
   */
  skip_enrich_url?: boolean;

  /**
   * The text content of the activity
   */
  text?: string;

  user_id?: string;

  /**
   * Visibility setting for the activity
   */

  visibility?: 'public' | 'private' | 'tag';

  /**
   * If visibility is 'tag', this is the tag name and is required
   */
  visibility_tag?: string;

  /**
   * List of attachments for the activity
   */
  attachments?: Array<Attachment>;

  /**
   * Collections that this activity references
   */
  collection_refs?: Array<string>;

  /**
   * List of feeds the activity is present in
   */
  feeds?: Array<string>;

  /**
   * Tags used for filtering the activity
   */
  filter_tags?: Array<string>;

  /**
   * Tags indicating interest categories
   */
  interest_tags?: Array<string>;

  /**
   * List of user IDs mentioned in the activity
   */
  mentioned_user_ids?: Array<string>;

  /**
   * Custom data for the activity
   */
  custom?: Record<string, any>;

  location?: Location;

  /**
   * Additional data for search indexing
   */
  search_data?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateActivityResponse {
  duration: string;

  activity: ActivityResponse;
}

export interface UpdateAppRequest {
  async_url_enrich_enabled?: boolean;

  auto_translation_enabled?: boolean;

  before_message_send_hook_attempt_timeout_ms?: number;

  before_message_send_hook_url?: string;

  cdn_expiration_seconds?: number;

  channel_hide_members_only?: boolean;

  chat_primary_use_case?:
    | 'messaging'
    | 'customer-support'
    | 'community'
    | 'marketplace'
    | 'gaming'
    | 'telehealth'
    | 'on-demand'
    | 'workforce-management'
    | 'dating'
    | 'education'
    | 'financial'
    | 'sports'
    | 'real-money-gaming';

  custom_action_handler_url?: string;

  disable_auth_checks?: boolean;

  disable_permissions_checks?: boolean;

  enable_hook_payload_compression?: boolean;

  enforce_unique_usernames?: 'no' | 'app' | 'team';

  feed_audit_logs_enabled?: boolean;

  feeds_moderation_enabled?: boolean;

  feeds_v2_region?: string;

  guest_user_creation_disabled?: boolean;

  image_moderation_enabled?: boolean;

  max_aggregated_activities_length?: number;

  member_custom_on_messages_enabled?: boolean;

  migrate_permissions_to_v2?: boolean;

  moderation_analytics_enabled?: boolean;

  moderation_enabled?: boolean;

  moderation_onboarding_complete?: boolean;

  moderation_s3_image_access_role_arn?: string;

  moderation_webhook_url?: string;

  multi_tenant_enabled?: boolean;

  permission_version?: 'v1' | 'v2';

  reminders_interval?: number;

  reminders_max_members?: number;

  reminders_max_per_user?: number;

  revoke_tokens_issued_before?: Date;

  sns_key?: string;

  sns_secret?: string;

  sns_topic_arn?: string;

  sqs_key?: string;

  sqs_secret?: string;

  sqs_url?: string;

  user_response_time_enabled?: boolean;

  video_primary_use_case?:
    | 'video-calling'
    | 'voice-calling'
    | 'livestreaming'
    | 'audio-rooms'
    | 'ai-agents'
    | 'live-shopping'
    | 'other';

  webhook_url?: string;

  allowed_flag_reasons?: Array<string>;

  event_hooks?: Array<EventHook>;

  image_moderation_block_labels?: Array<string>;

  image_moderation_labels?: Array<string>;

  user_search_disallowed_roles?: Array<string>;

  webhook_events?: Array<string>;

  activity_metrics_config?: Record<string, number>;

  apn_config?: APNConfig;

  async_moderation_config?: AsyncModerationConfiguration;

  datadog_info?: DataDogInfo;

  file_upload_config?: FileUploadConfig;

  firebase_config?: FirebaseConfig;

  grants?: Record<string, Array<string>>;

  huawei_config?: HuaweiConfig;

  image_upload_config?: FileUploadConfig;

  moderation_dashboard_preferences?: ModerationDashboardPreferences;

  push_config?: PushConfig;

  xiaomi_config?: XiaomiConfig;
}

export interface UpdateBlockListRequest {
  is_confusable_folding_enabled?: boolean;

  is_leet_check_enabled?: boolean;

  is_plural_check_enabled?: boolean;

  is_substring_matching_enabled?: boolean;

  team?: string;

  user_id?: string;

  /**
   * List of words to block
   */
  words?: Array<string>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateBlockListResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Block list contains restricted words
   */
  blocklist?: BlockListResponse;
}

export interface UpdateBookmarkFolderRequest {
  /**
   * Name of the folder
   */
  name?: string;

  user_id?: string;

  /**
   * Custom data for the folder
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateBookmarkFolderResponse {
  duration: string;

  bookmark_folder: BookmarkFolderResponse;
}

export interface UpdateBookmarkRequest {
  /**
   * ID of the folder containing the bookmark
   */
  folder_id?: string;

  /**
   * Move the bookmark to this folder (empty string removes the folder)
   */
  new_folder_id?: string;

  user_id?: string;

  /**
   * Custom data for the bookmark
   */
  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface UpdateCallMembersRequest {
  /**
   * List of userID to remove
   */
  remove_members?: Array<string>;

  /**
   * List of members to update or insert
   */
  update_members?: Array<MemberRequest>;
}

export interface UpdateCallMembersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  members: Array<MemberResponse>;
}

export interface UpdateCallRequest {
  /**
   * the time the call is scheduled to start
   */
  starts_at?: Date;

  /**
   * Custom data for this object
   */
  custom?: Record<string, any>;

  settings_override?: CallSettingsRequest;
}

export interface UpdateCallResponse {
  duration: string;

  members: Array<MemberResponse>;

  own_capabilities: Array<OwnCapability>;

  /**
   * Represents a call
   */
  call: CallResponse;
}

export interface UpdateCallTypeRequest {
  external_storage?: string;

  grants?: Record<string, Array<string>>;

  notification_settings?: NotificationSettingsRequest;

  settings?: CallSettingsRequest;
}

export interface UpdateCallTypeResponse {
  /**
   * the time the call type was created
   */
  created_at: Date;

  duration: string;

  /**
   * the name of the call type
   */
  name: string;

  /**
   * the time the call type was last updated
   */
  updated_at: Date;

  /**
   * the permissions granted to each role
   */
  grants: Record<string, Array<string>>;

  notification_settings: NotificationSettingsResponse;

  settings: CallSettingsResponse;

  /**
   * the external storage for the call type
   */
  external_storage?: string;
}

export interface UpdateCampaignRequest {
  sender_id: string;

  message_template: CampaignMessageTemplate;

  create_channels?: boolean;

  description?: string;

  id?: string;

  name?: string;

  sender_mode?: 'exclude' | 'include';

  sender_visibility?: 'hidden' | 'archived';

  show_channels?: boolean;

  skip_push?: boolean;

  skip_webhook?: boolean;

  segment_ids?: Array<string>;

  user_ids?: Array<string>;

  channel_template?: CampaignChannelTemplate;
}

export interface UpdateChannelPartialRequest {
  user_id?: string;

  unset?: Array<string>;

  set?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateChannelPartialResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of updated members
   */
  members: Array<ChannelMemberResponse>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;
}

export interface UpdateChannelRequest {
  /**
   * Set to `true` to accept the invite
   */
  accept_invite?: boolean;

  /**
   * Sets cool down period for the channel in seconds
   */
  cooldown?: number;

  /**
   * Set to `true` to hide channel's history when adding new members
   */
  hide_history?: boolean;

  /**
   * If set, hides channel's history before this time when adding new members. Takes precedence over `hide_history` when both are provided. Must be in RFC3339 format (e.g., "2024-01-01T10:00:00Z") and in the past.
   */
  hide_history_before?: Date;

  /**
   * Set to `true` to reject the invite
   */
  reject_invite?: boolean;

  /**
   * When `message` is set disables all push notifications for it
   */
  skip_push?: boolean;

  user_id?: string;

  /**
   * List of filter tags to add to the channel
   */
  add_filter_tags?: Array<string>;

  /**
   * List of user IDs to add to the channel
   */
  add_members?: Array<ChannelMemberRequest>;

  /**
   * List of user IDs to make channel moderators
   */
  add_moderators?: Array<string>;

  /**
   * List of channel member role assignments. If any specified user is not part of the channel, the request will fail
   */
  assign_roles?: Array<ChannelMemberRequest>;

  /**
   * List of user IDs to take away moderators status from
   */
  demote_moderators?: Array<string>;

  /**
   * List of user IDs to invite to the channel
   */
  invites?: Array<ChannelMemberRequest>;

  /**
   * List of filter tags to remove from the channel
   */
  remove_filter_tags?: Array<string>;

  /**
   * List of user IDs to remove from the channel
   */
  remove_members?: Array<string>;

  data?: ChannelInputRequest;

  /**
   * Message data for creating or updating a message
   */
  message?: MessageRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateChannelResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * List of channel members
   */
  members: Array<ChannelMemberResponse>;

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;
}

export interface UpdateChannelTypeRequest {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  max_message_length: number;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  connect_events?: boolean;

  count_messages?: boolean;

  custom_events?: boolean;

  delivery_events?: boolean;

  mark_messages_pending?: boolean;

  message_retention?: string;

  mutes?: boolean;

  partition_size?: number;

  partition_ttl?: string;

  polls?: boolean;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

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

  allowed_flag_reasons?: Array<string>;

  blocklists?: Array<BlockListOptions>;

  /**
   * List of commands that channel supports
   */
  commands?: Array<string>;

  permissions?: Array<PolicyRequest>;

  /**
   * Sets thresholds for AI moderation
   */
  automod_thresholds?: Thresholds;

  chat_preferences?: ChatPreferences;

  grants?: Record<string, Array<string>>;
}

export interface UpdateChannelTypeResponse {
  automod: 'disabled' | 'simple' | 'AI';

  automod_behavior: 'flag' | 'block' | 'shadow_block';

  connect_events: boolean;

  count_messages: boolean;

  created_at: Date;

  custom_events: boolean;

  delivery_events: boolean;

  duration: string;

  mark_messages_pending: boolean;

  max_message_length: number;

  message_retention: string;

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

  commands: Array<string>;

  permissions: Array<PolicyRequest>;

  grants: Record<string, Array<string>>;

  blocklist?: string;

  blocklist_behavior?: 'flag' | 'block' | 'shadow_block';

  partition_size?: number;

  partition_ttl?: string;

  push_level?: 'all' | 'all_mentions' | 'mentions' | 'direct_mentions' | 'none';

  allowed_flag_reasons?: Array<string>;

  blocklists?: Array<BlockListOptions>;

  /**
   * Sets thresholds for AI moderation
   */
  automod_thresholds?: Thresholds;

  chat_preferences?: ChatPreferences;
}

export interface UpdateCollectionRequest {
  /**
   * Unique identifier for the collection within its name
   */
  id: string;

  /**
   * Name/type of the collection
   */
  name: string;

  /**
   * Custom data for the collection (required, must contain at least one key)
   */
  custom: Record<string, any>;
}

export interface UpdateCollectionsRequest {
  /**
   * List of collections to update (only custom data is updatable)
   */
  collections: Array<UpdateCollectionRequest>;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateCollectionsResponse {
  duration: string;

  /**
   * List of updated collections
   */
  collections: Array<CollectionResponse>;
}

export interface UpdateCommandRequest {
  /**
   * Description, shown in commands auto-completion
   */
  description: string;

  /**
   * Arguments help text, shown in commands auto-completion
   */
  args?: string;

  /**
   * Set name used for grouping commands
   */
  set?: string;
}

export interface UpdateCommandResponse {
  duration: string;

  /**
   * Represents custom chat command
   */
  command?: Command;
}

export interface UpdateCommentBookmarkRequest {
  /**
   * ID of the folder containing the bookmark
   */
  folder_id?: string;

  /**
   * Move the bookmark to this folder (empty string removes the folder)
   */
  new_folder_id?: string;

  user_id?: string;

  /**
   * Custom data for the bookmark
   */
  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateCommentBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface UpdateCommentPartialRequest {
  /**
   * @deprecated
   * Whether to copy custom data to notification activities Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * If true, forces moderation to run for server-side requests. By default, server-side requests skip moderation. Client-side requests always run moderation regardless of this field.
   */
  force_moderation?: boolean;

  /**
   * Whether to handle mention notification changes
   */
  handle_mention_notifications?: boolean;

  /**
   * Whether to skip URL enrichment
   */
  skip_enrich_url?: boolean;

  /**
   * Whether to skip push notifications
   */
  skip_push?: boolean;

  user_id?: string;

  /**
   * List of field names to remove. Supported fields: 'custom', 'attachments', 'mentioned_user_ids', 'status'. Use dot-notation for nested custom fields (e.g., 'custom.field_name')
   */
  unset?: Array<string>;

  /**
   * Map of field names to new values. Supported fields: 'text', 'attachments', 'custom', 'mentioned_user_ids', 'status'. Use dot-notation for nested custom fields (e.g., 'custom.field_name')
   */
  set?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateCommentPartialResponse {
  duration: string;

  comment: CommentResponse;
}

export interface UpdateCommentRequest {
  /**
   * Updated text content of the comment
   */
  comment?: string;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when handle_mention_notifications creates notifications) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * If true, forces moderation to run for server-side requests. By default, server-side requests skip moderation. Client-side requests always run moderation regardless of this field.
   */
  force_moderation?: boolean;

  /**
   * If true, creates notification activities for newly mentioned users and deletes notifications for users no longer mentioned
   */
  handle_mention_notifications?: boolean;

  /**
   * Whether to skip URL enrichment for this comment
   */
  skip_enrich_url?: boolean;

  skip_push?: boolean;

  user_id?: string;

  /**
   * Updated media attachments for the comment. Providing this field will replace all existing attachments.
   */
  attachments?: Array<Attachment>;

  /**
   * List of user IDs mentioned in the comment
   */
  mentioned_user_ids?: Array<string>;

  /**
   * Updated custom data for the comment
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateCommentResponse {
  duration: string;

  comment: CommentResponse;
}

export interface UpdateExternalStorageRequest {
  /**
   * The name of the bucket on the service provider
   */
  bucket: string;

  /**
   * The type of storage to use
   */

  storage_type: 's3' | 'gcs' | 'abs';

  gcs_credentials?: string;

  /**
   * The path prefix to use for storing files
   */
  path?: string;

  /**
   * Config for creating Amazon S3 storage.
   */
  aws_s3?: S3Request;

  /**
   * Config for creating Azure Blob Storage storage
   */
  azure_blob?: AzureRequest;
}

export interface UpdateExternalStorageResponse {
  bucket: string;

  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  name: string;

  path: string;

  type: 's3' | 'gcs' | 'abs';
}

export interface UpdateFeedGroupRequest {
  default_visibility?:
    'public' | 'visible' | 'followers' | 'members' | 'private';

  /**
   * Configuration for activity processors
   */
  activity_processors?: Array<ActivityProcessorConfig>;

  /**
   * Configuration for activity selectors
   */
  activity_selectors?: Array<ActivitySelectorConfig>;

  activity_filter?: ActivityFilterConfig;

  aggregation?: AggregationConfig;

  /**
   * Custom data for the feed group
   */
  custom?: Record<string, any>;

  notification?: NotificationConfig;

  push_notification?: PushNotificationConfig;

  ranking?: RankingConfig;

  stories?: StoriesConfig;
}

export interface UpdateFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface UpdateFeedMembersRequest {
  /**
   * Type of update operation to perform. One of: upsert, remove, set
   */

  operation: 'upsert' | 'remove' | 'set';

  limit?: number;

  next?: string;

  prev?: string;

  /**
   * List of members to upsert, remove, or set
   */
  members?: Array<FeedMemberRequest>;
}

export interface UpdateFeedMembersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  added: Array<FeedMemberResponse>;

  removed_ids: Array<string>;

  updated: Array<FeedMemberResponse>;
}

export interface UpdateFeedRequest {
  /**
   * If true, removes the geographic location from the feed
   */
  clear_location?: boolean;

  /**
   * ID of the new feed creator (owner)
   */
  created_by_id?: string;

  /**
   * Description of the feed
   */
  description?: string;

  /**
   * If true, enriches the feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  /**
   * Name of the feed
   */
  name?: string;

  /**
   * Tags used for filtering feeds
   */
  filter_tags?: Array<string>;

  /**
   * Custom data for the feed
   */
  custom?: Record<string, any>;

  location?: Location;
}

export interface UpdateFeedResponse {
  duration: string;

  feed: FeedResponse;
}

export interface UpdateFeedViewRequest {
  /**
   * Updated configuration for selecting activities
   */
  activity_selectors?: Array<ActivitySelectorConfig>;

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface UpdateFeedViewResponse {
  duration: string;

  feed_view: FeedViewResponse;
}

export interface UpdateFeedVisibilityRequest {
  /**
   * Updated permission grants for each role
   */
  grants?: Record<string, Array<string>>;
}

export interface UpdateFeedVisibilityResponse {
  duration: string;

  feed_visibility: FeedVisibilityResponse;
}

export interface UpdateFollowRequest {
  /**
   * Fully qualified ID of the source feed
   */
  source: string;

  /**
   * Fully qualified ID of the target feed
   */
  target: string;

  /**
   * Maximum number of historical activities to copy from the target feed when the follow is first materialized. Not set = unlimited (default). 0 = copy nothing. Range: 0-1000.
   */
  activity_copy_limit?: number;

  /**
   * @deprecated
   * Whether to copy custom data to the notification activity (only applies when create_notification_activity is true) Deprecated: use notification_context.trigger.custom and notification_context.target.custom instead
   */
  copy_custom_to_notification?: boolean;

  /**
   * Whether to create a notification activity for this follow
   */
  create_notification_activity?: boolean;

  /**
   * If true, auto-creates users referenced by the source and target FIDs when they don't already exist. Server-side only. Defaults to false. Use directly on single follow endpoints (Follow, GetOrCreateFollow). On batch endpoints (FollowBatch, GetOrCreateFollows), use the top-level create_users field; per-item follows[i].create_users is rejected.
   */
  create_users?: boolean;

  /**
   * If true, enriches the follow's source_feed and target_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  follower_role?: string;

  /**
   * Push preference for the follow relationship
   */

  push_preference?: 'all' | 'none';

  /**
   * Whether to skip push for this follow
   */
  skip_push?: boolean;

  /**
   * Status of the follow relationship. One of: accepted, pending, rejected
   */

  status?: 'accepted' | 'pending' | 'rejected';

  /**
   * Custom data for the follow relationship
   */
  custom?: Record<string, any>;
}

export interface UpdateFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface UpdateLiveLocationRequest {
  /**
   * Live location ID
   */
  message_id: string;

  /**
   * Time when the live location expires
   */
  end_at?: Date;

  /**
   * Latitude coordinate
   */
  latitude?: number;

  /**
   * Longitude coordinate
   */
  longitude?: number;
}

export interface UpdateMemberPartialRequest {
  unset?: Array<string>;

  set?: Record<string, any>;
}

export interface UpdateMemberPartialResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  channel_member?: ChannelMemberResponse;
}

export interface UpdateMembershipLevelRequest {
  /**
   * Optional description of the membership level
   */
  description?: string;

  /**
   * Display name for the membership level
   */
  name?: string;

  /**
   * Priority level (higher numbers = higher priority)
   */
  priority?: number;

  /**
   * Activity tags this membership level gives access to
   */
  tags?: Array<string>;

  /**
   * Custom data for the membership level
   */
  custom?: Record<string, any>;
}

export interface UpdateMembershipLevelResponse {
  duration: string;

  membership_level: MembershipLevelResponse;
}

export interface UpdateMessagePartialRequest {
  /**
   * Skip enriching the URL in the message
   */
  skip_enrich_url?: boolean;

  skip_push?: boolean;

  user_id?: string;

  /**
   * Array of field names to unset
   */
  unset?: Array<string>;

  /**
   * Sets new field values
   */
  set?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateMessagePartialResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  /**
   * Pending message metadata
   */
  pending_message_metadata?: Record<string, string>;
}

export interface UpdateMessageRequest {
  /**
   * Message data for creating or updating a message
   */
  message: MessageRequest;

  /**
   * Skip enrich URL
   */
  skip_enrich_url?: boolean;

  skip_push?: boolean;
}

export interface UpdateMessageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * Represents any chat message
   */
  message: MessageResponse;

  pending_message_metadata?: Record<string, string>;
}

export interface UpdatePollOptionRequest {
  /**
   * Option ID
   */
  id: string;

  /**
   * Option text
   */
  text: string;

  user_id?: string;

  /**
   * Custom data for this object
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdatePollPartialRequest {
  user_id?: string;

  /**
   * Array of field names to unset
   */
  unset?: Array<string>;

  /**
   * Sets new field values
   */
  set?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdatePollRequest {
  /**
   * Poll ID
   */
  id: string;

  /**
   * Poll name
   */
  name: string;

  /**
   * Allow answers
   */
  allow_answers?: boolean;

  /**
   * Allow user suggested options
   */
  allow_user_suggested_options?: boolean;

  /**
   * Poll description
   */
  description?: string;

  /**
   * Enforce unique vote
   */
  enforce_unique_vote?: boolean;

  /**
   * Is closed
   */
  is_closed?: boolean;

  /**
   * Max votes allowed
   */
  max_votes_allowed?: number;

  user_id?: string;

  /**
   * Voting visibility
   */

  voting_visibility?: 'anonymous' | 'public';

  /**
   * Poll options
   */
  options?: Array<PollOptionRequest>;

  /**
   * Custom data for this object
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdatePredefinedFilterRequest {
  /**
   * The operation this filter is for (e.g., QueryChannels)
   */

  operation: 'QueryChannels';

  /**
   * Filter to apply to the query
   */
  filter: Record<string, any>;

  /**
   * The description of the predefined filter
   */
  description?: string;

  sort?: Array<Record<string, any>>;
}

export interface UpdatePredefinedFilterResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  predefined_filter?: PredefinedFilterResponse;
}

export interface UpdateQueueRequest {
  description?: string;

  name?: string;

  user_id?: string;

  sort?: Array<Record<string, any>>;

  filters?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateReminderRequest {
  remind_at?: Date;

  user_id?: string;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateReminderResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  reminder: ReminderResponseData;
}

export interface UpdateSIPInboundRoutingRuleRequest {
  /**
   * Name of the SIP Inbound Routing Rule
   */
  name: string;

  /**
   * List of SIP trunk IDs
   */
  trunk_ids: Array<string>;

  /**
   * Configuration for SIP caller settings
   */
  caller_configs: SIPCallerConfigsRequest;

  /**
   * List of called numbers
   */
  called_numbers?: Array<string>;

  /**
   * List of caller numbers (optional)
   */
  caller_numbers?: Array<string>;

  /**
   * Configuration for SIP call settings
   */
  call_configs?: SIPCallConfigsRequest;

  /**
   * Configuration for direct routing rule calls
   */
  direct_routing_configs?: SIPDirectRoutingRuleCallConfigsRequest;

  /**
   * Configuration for PIN protection settings
   */
  pin_protection_configs?: SIPPinProtectionConfigsRequest;

  /**
   * Configuration for PIN routing rule calls
   */
  pin_routing_configs?: SIPInboundRoutingRulePinConfigsRequest;
}

export interface UpdateSIPInboundRoutingRuleResponse {
  duration: string;

  /**
   * SIP Inbound Routing Rule response
   */
  sip_inbound_routing_rule?: SIPInboundRoutingRuleResponse;
}

export interface UpdateSIPTrunkRequest {
  /**
   * Name of the SIP trunk
   */
  name: string;

  /**
   * Phone numbers associated with this SIP trunk
   */
  numbers: Array<string>;

  /**
   * Optional password for SIP trunk authentication
   */
  password?: string;

  /**
   * Optional list of allowed IPv4/IPv6 addresses or CIDR blocks
   */
  allowed_ips?: Array<string>;
}

export interface UpdateSIPTrunkResponse {
  duration: string;

  /**
   * SIP trunk information
   */
  sip_trunk?: SIPTrunkResponse;
}

export interface UpdateSegmentRequest {
  /**
   * The description of the segment (max 256 characters)
   */
  description?: string;

  /**
   * The name of the segment (max 128 characters)
   */
  name?: string;

  /**
   * Filter to apply to the query
   */
  filter?: Record<string, any>;
}

export interface UpdateSegmentResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  segment: SegmentResponse;
}

export interface UpdateThreadPartialRequest {
  user_id?: string;

  /**
   * Array of field names to unset
   */
  unset?: Array<string>;

  /**
   * Sets new field values
   */
  set?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpdateThreadPartialResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  thread: ThreadResponse;
}

export interface UpdateUserGroupRequest {
  /**
   * The new description for the group
   */
  description?: string;

  /**
   * The new name of the user group
   */
  name?: string;

  team_id?: string;
}

export interface UpdateUserGroupResponse {
  duration: string;

  user_group?: UserGroupResponse;
}

export interface UpdateUserPartialRequest {
  /**
   * User ID to update
   */
  id: string;

  unset?: Array<string>;

  set?: Record<string, any>;
}

export interface UpdateUserPermissionsRequest {
  user_id: string;

  grant_permissions?: Array<string>;

  revoke_permissions?: Array<string>;
}

export interface UpdateUserPermissionsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface UpdateUsersPartialRequest {
  users: Array<UpdateUserPartialRequest>;
}

export interface UpdateUsersRequest {
  /**
   * Object containing users
   */
  users: Record<string, UserRequest>;
}

export interface UpdateUsersResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  membership_deletion_task_id: string;

  /**
   * Object containing users
   */
  users: Record<string, FullUserResponse>;
}

export interface UpdatedCallPermissionsEvent {
  call_cid: string;

  created_at: Date;

  /**
   * The capabilities of the current user
   */
  own_capabilities: Array<OwnCapability>;

  /**
   * User response object
   */
  user: UserResponse;

  /**
   * The type of event: "call.permissions_updated" in this case
   */
  type: string;
}

export interface UploadChannelFileRequest {
  /**
   * file field
   */
  file?: string;

  user?: OnlyUserID;
}

export interface UploadChannelFileResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * URL to the uploaded asset. Should be used to put to `asset_url` attachment field
   */
  file?: string;

  moderation_action?: string;

  /**
   * URL of the file thumbnail for supported file formats. Should be put to `thumb_url` attachment field
   */
  thumb_url?: string;
}

export interface UploadChannelRequest {
  file?: string;

  /**
   * field with JSON-encoded array of image size configurations
   */
  upload_sizes?: Array<ImageSize>;

  user?: OnlyUserID;
}

export interface UploadChannelResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  file?: string;

  moderation_action?: string;

  thumb_url?: string;

  /**
   * Array of image size configurations
   */
  upload_sizes?: Array<ImageSize>;
}

export interface UpsertActionConfigItem {
  action: string;

  entity_type: string;

  order: number;

  description?: string;

  icon?: string;

  id?: string;

  queue_type?: string;

  custom?: Record<string, any>;
}

export interface UpsertActionConfigRequest {
  /**
   * The action to perform (e.g. ban, delete_message, custom)
   */
  action: string;

  /**
   * Type of entity this action applies to (e.g. stream:chat:v1:message)
   */
  entity_type: string;

  /**
   * Display order in the dashboard (0–100, lower numbers shown first)
   */
  order: number;

  /**
   * Human-readable label for the dashboard button
   */
  description?: string;

  /**
   * Icon identifier for the dashboard button
   */
  icon?: string;

  /**
   * UUID of an existing action config to update; omit to create a new record
   */
  id?: string;

  /**
   * Queue this config belongs to; null means the default queue
   */
  queue_type?: string;

  /**
   * Optional user ID to associate with the audit log entry
   */
  user_id?: string;

  /**
   * Action-specific parameters passed to the action handler
   */
  custom?: Record<string, any>;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpsertActionConfigResponse {
  duration: string;

  /**
   * Configuration for a moderation action
   */
  action_config?: ModerationActionConfigResponse;
}

export interface UpsertActivitiesRequest {
  /**
   * List of activities to create or update
   */
  activities: Array<ActivityRequest>;

  /**
   * Server-side only. If true, auto-creates users referenced by activity user_id values that don't already exist. Default: false.
   */
  create_users?: boolean;

  /**
   * If true, enriches the activities' current_feed with own_* fields (own_follows, own_followings, own_capabilities, own_membership). Defaults to false for performance.
   */
  enrich_own_fields?: boolean;

  /**
   * If true, forces moderation to run for server-side requests. By default, server-side requests skip moderation. Client-side requests always run moderation regardless of this field.
   */
  force_moderation?: boolean;
}

export interface UpsertActivitiesResponse {
  duration: string;

  /**
   * List of created or updated activities
   */
  activities: Array<ActivityResponse>;

  /**
   * Total number of mention notification activities created for mentioned users across all activities
   */
  mention_notifications_created?: number;
}

export interface UpsertCollectionsRequest {
  /**
   * List of collections to upsert (insert if new, update if existing)
   */
  collections: Array<CollectionRequest>;
}

export interface UpsertCollectionsResponse {
  duration: string;

  /**
   * List of upserted collections
   */
  collections: Array<CollectionResponse>;
}

export interface UpsertConfigRequest {
  /**
   * Unique identifier for the moderation configuration
   */
  key: string;

  /**
   * Whether moderation should be performed asynchronously
   */
  async?: boolean;

  /**
   * Team associated with the configuration
   */
  team?: string;

  /**
   * Optional user ID to associate with the audit log entry
   */
  user_id?: string;

  ai_audio_config?: AIAudioConfigRequest;

  ai_image_config?: AIImageConfig;

  ai_text_config?: AITextConfig;

  ai_video_config?: AIVideoConfig;

  automod_platform_circumvention_config?: AutomodPlatformCircumventionConfig;

  automod_semantic_filters_config?: AutomodSemanticFiltersConfig;

  automod_toxicity_config?: AutomodToxicityConfig;

  aws_rekognition_config?: AIImageConfig;

  block_list_config?: BlockListConfig;

  bodyguard_config?: AITextConfig;

  flood_config?: FloodConfig;

  google_vision_config?: GoogleVisionConfig;

  llm_config?: LLMConfig;

  rule_builder_config?: RuleBuilderConfig;

  /**
   * User request object
   */
  user?: UserRequest;

  velocity_filter_config?: VelocityFilterConfig;

  video_call_rule_config?: VideoCallRuleConfig;
}

export interface UpsertConfigResponse {
  duration: string;

  config?: ConfigResponse;
}

export interface UpsertExternalStorageAWSS3Request {
  bucket: string;

  region: string;

  role_arn: string;

  path_prefix?: string;
}

export interface UpsertExternalStorageGCSRequest {
  bucket: string;

  credentials: string;

  path_prefix?: string;
}

export interface UpsertExternalStorageRequest {
  type: 'aws_s3' | 'gcs';

  aws_s3?: UpsertExternalStorageAWSS3Request;

  gcs?: UpsertExternalStorageGCSRequest;
}

export interface UpsertExternalStorageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface UpsertModerationRuleRequest {
  /**
   * Unique rule name
   */
  name: string;

  /**
   * Type of rule: user, content, call, or flood
   */
  rule_type: string;

  /**
   * Duration before rule can trigger again (e.g. 24h, 7d)
   */
  cooldown_period?: string;

  /**
   * Optional description of the rule
   */
  description?: string;

  /**
   * Whether the rule is active
   */
  enabled?: boolean;

  /**
   * Logical operator between conditions/groups: AND or OR
   */
  logic?: string;

  /**
   * Team scope for the rule
   */
  team?: string;

  /**
   * Optional user ID to associate with the audit log entry
   */
  user_id?: string;

  /**
   * Escalation sequences for call rules
   */
  action_sequences?: Array<CallRuleActionSequence>;

  /**
   * Flat list of conditions (legacy)
   */
  conditions?: Array<RuleBuilderCondition>;

  /**
   * List of config keys this rule applies to
   */
  config_keys?: Array<string>;

  /**
   * Nested condition groups
   */
  groups?: Array<RuleBuilderConditionGroup>;

  action?: RuleBuilderAction;

  /**
   * User request object
   */
  user?: UserRequest;
}

export interface UpsertModerationRuleResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  rule?: ModerationRuleV2Response;
}

export interface UpsertModerationTemplateRequest {
  /**
   * Name of the moderation template
   */
  name: string;

  /**
   * Configuration for a feeds moderation template
   */
  config: FeedsModerationTemplateConfigPayload;
}

export interface UpsertModerationTemplateResponse {
  /**
   * When the template was created
   */
  created_at: Date;

  duration: string;

  /**
   * Name of the moderation template
   */
  name: string;

  /**
   * When the template was last updated
   */
  updated_at: Date;

  /**
   * Configuration for a feeds moderation template
   */
  config?: FeedsModerationTemplateConfigPayload;
}

export interface UpsertPushPreferencesRequest {
  /**
   * A list of push preferences for channels, calls, or the user.
   */
  preferences: Array<PushPreferenceInput>;
}

export interface UpsertPushPreferencesResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  /**
   * The channel specific push notification preferences, only returned for channels you've edited.
   */
  user_channel_preferences: Record<
    string,
    Record<string, ChannelPushPreferencesResponse>
  >;

  /**
   * The user preferences, always returned regardless if you edited it
   */
  user_preferences: Record<string, PushPreferencesResponse>;
}

export interface UpsertPushProviderRequest {
  push_provider?: PushProviderRequest;
}

export interface UpsertPushProviderResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  push_provider: PushProviderResponse;
}

export interface UpsertPushTemplateRequest {
  /**
   * Event type. One of: message.new, message.updated, reaction.new, notification.reminder_due, feeds.activity.added, feeds.comment.added, feeds.activity.reaction.added, feeds.comment.reaction.added, feeds.follow.created, feeds.notification_feed.updated
   */

  event_type:
    | 'message.new'
    | 'message.updated'
    | 'reaction.new'
    | 'notification.reminder_due'
    | 'feeds.activity.added'
    | 'feeds.comment.added'
    | 'feeds.activity.reaction.added'
    | 'feeds.comment.reaction.added'
    | 'feeds.follow.created'
    | 'feeds.notification_feed.updated';

  /**
   * Push provider type. One of: firebase, apn, huawei, xiaomi
   */

  push_provider_type: 'firebase' | 'apn' | 'huawei' | 'xiaomi';

  /**
   * Whether to send push notification for this event
   */
  enable_push?: boolean;

  /**
   * Push provider name
   */
  push_provider_name?: string;

  /**
   * Push template
   */
  template?: string;
}

export interface UpsertPushTemplateResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  template?: PushTemplateResponse;
}

export interface UpsertSetupSessionRequest {
  /**
   * The current step of the setup wizard. One of: welcome, input, configure, live
   */

  current_step: 'welcome' | 'input' | 'configure' | 'live';

  /**
   * The status of the setup session. One of: in_progress, completed
   */

  status: 'in_progress' | 'completed';

  /**
   * Per-step data keyed by step name (welcome, input, configure, live)
   */
  setup_data?: Record<string, any>;
}

export interface UpsertSetupSessionResponse {
  duration: string;

  setup_session?: SetupSession;
}

export interface User {
  id: string;

  data?: Record<string, any>;
}

export interface UserBannedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.banned" in this case
   */
  type: string;

  /**
   * The ID of the channel where the target user was banned
   */
  channel_id?: string;

  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel where the target user was banned
   */
  channel_type?: string;

  /**
   * The CID of the channel where the target user was banned
   */
  cid?: string;

  /**
   * The expiration date of the ban
   */
  expiration?: Date;

  /**
   * The reason for the ban
   */
  reason?: string;

  received_at?: Date;

  /**
   * ID of the review queue item (flagged message) that triggered the ban, if the ban was applied from the moderation review queue
   */
  review_queue_item_id?: string;

  /**
   * Whether the user was shadow banned
   */
  shadow?: boolean;

  /**
   * The team of the channel where the target user was banned
   */
  team?: string;

  total_bans?: number;

  channel_custom?: Record<string, any>;

  created_by?: UserResponseCommonFields;
}

export interface UserCreatedWithinParameters {
  max_age?: string;
}

export interface UserCustomEventRequest {
  type: string;

  custom?: Record<string, any>;
}

export interface UserCustomPropertyParameters {
  operator?: string;

  property_key?: string;
}

export interface UserDeactivatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.deactivated" in this case
   */
  type: string;

  received_at?: Date;

  created_by?: UserResponseCommonFields;
}

export interface UserDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The type of deletion that was used for the user's conversations. One of: hard, soft, pruning, (empty string)
   */
  delete_conversation: string;

  /**
   * Whether the user's conversation channels were deleted
   */
  delete_conversation_channels: boolean;

  /**
   * The type of deletion that was used for the user's messages. One of: hard, soft, pruning, (empty string)
   */
  delete_messages: string;

  /**
   * The type of deletion that was used for the user. One of: hard, soft, pruning, (empty string)
   */
  delete_user: string;

  /**
   * Whether the user was hard deleted
   */
  hard_delete: boolean;

  /**
   * Whether the user's messages were marked as deleted
   */
  mark_messages_deleted: boolean;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.deleted" in this case
   */
  type: string;

  received_at?: Date;
}

export interface UserFeedbackReport {
  unreported_count: number;

  count_by_rating: Record<string, number>;
}

export interface UserFeedbackReportResponse {
  daily: Array<DailyAggregateUserFeedbackReportResponse>;
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
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The reason for the flag
   */
  reason: string;

  /**
   * The total number of flags for the user
   */
  total_flags: number;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.flagged" in this case
   */
  type: string;

  received_at?: Date;

  /**
   * Custom data
   */
  custom?: Record<string, any>;

  target_user?: UserResponseCommonFields;
}

export interface UserGroup {
  app_pk: number;

  created_at: Date;

  id: string;

  name: string;

  updated_at: Date;

  created_by?: string;

  description?: string;

  team_id?: string;

  members?: Array<UserGroupMember>;
}

export interface UserGroupCreatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "user_group.created" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;

  user_group?: UserGroup;
}

export interface UserGroupDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "user_group.deleted" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;

  user_group?: UserGroup;
}

export interface UserGroupMember {
  app_pk: number;

  created_at: Date;

  group_id: string;

  is_admin: boolean;

  user_id: string;
}

export interface UserGroupMemberAddedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The user IDs that were added
   */
  members: Array<string>;

  custom: Record<string, any>;

  /**
   * The type of event: "user_group.member_added" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;

  user_group?: UserGroup;
}

export interface UserGroupMemberRemovedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The user IDs that were removed
   */
  members: Array<string>;

  custom: Record<string, any>;

  /**
   * The type of event: "user_group.member_removed" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;

  user_group?: UserGroup;
}

export interface UserGroupResponse {
  created_at: Date;

  id: string;

  name: string;

  updated_at: Date;

  created_by?: string;

  description?: string;

  team_id?: string;

  members?: Array<UserGroupMember>;
}

export interface UserGroupUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  /**
   * The type of event: "user_group.updated" in this case
   */
  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;

  user_group?: UserGroup;
}

export interface UserIdenticalContentCountParameters {
  threshold?: number;

  time_window?: string;
}

export interface UserMessagesDeletedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.messages.deleted" in this case
   */
  type: string;

  /**
   * The ID of the channel where the target user's messages were deleted
   */
  channel_id?: string;

  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel where the target user's messages were deleted
   */
  channel_type?: string;

  /**
   * The CID of the channel where the target user's messages were deleted
   */
  cid?: string;

  /**
   * Whether Messages were hard deleted
   */
  hard_delete?: boolean;

  received_at?: Date;

  /**
   * The team of the channel where the target user's messages were deleted
   */
  team?: string;

  channel_custom?: Record<string, any>;
}

export interface UserMuteResponse {
  created_at: Date;

  updated_at: Date;

  expires?: Date;

  /**
   * User response object
   */
  target?: UserResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface UserMutedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.muted" in this case
   */
  type: string;

  received_at?: Date;

  /**
   * The target users that were muted
   */
  target_users?: Array<UserResponseCommonFields>;

  target_user?: UserResponseCommonFields;
}

export interface UserRatingReportResponse {
  average: number;

  count: number;
}

export interface UserReactivatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.reactivated" in this case
   */
  type: string;

  received_at?: Date;

  created_by?: UserResponseCommonFields;
}

export interface UserRequest {
  /**
   * User ID
   */
  id: string;

  /**
   * User's profile image URL
   */
  image?: string;

  invisible?: boolean;

  language?: string;

  /**
   * Optional name of user
   */
  name?: string;

  /**
   * User's global role
   */
  role?: string;

  /**
   * List of teams the user belongs to
   */
  teams?: Array<string>;

  /**
   * Custom user data
   */
  custom?: Record<string, any>;

  privacy_settings?: PrivacySettingsResponse;

  /**
   * Map of team-specific roles for the user
   */
  teams_role?: Record<string, string>;
}

export interface UserResponse {
  /**
   * Whether a user is banned or not
   */
  banned: boolean;

  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * Unique user identifier
   */
  id: string;

  invisible: boolean;

  /**
   * Preferred language of a user
   */
  language: string;

  /**
   * Whether a user online or not
   */
  online: boolean;

  /**
   * Determines the set of user permissions
   */
  role: string;

  /**
   * Whether a user is shadow banned
   */
  shadow_banned: boolean;

  /**
   * Date/time of the last update
   */
  updated_at: Date;

  blocked_user_ids: Array<string>;

  /**
   * List of teams user is a part of
   */
  teams: Array<string>;

  /**
   * Custom data for this object
   */
  custom: Record<string, any>;

  avg_response_time?: number;

  /**
   * Date when ban expires
   */
  ban_expires?: Date;

  bypass_moderation?: boolean;

  /**
   * Date of deactivation
   */
  deactivated_at?: Date;

  /**
   * Date/time of deletion
   */
  deleted_at?: Date;

  image?: string;

  /**
   * Date of last activity
   */
  last_active?: Date;

  /**
   * Optional name of user
   */
  name?: string;

  /**
   * Revocation date for tokens
   */
  revoke_tokens_issued_before?: Date;

  /**
   * List of devices user is using
   */
  devices?: Array<DeviceResponse>;

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

  blocked_user_ids: Array<string>;

  teams: Array<string>;

  custom: Record<string, any>;

  avg_response_time?: number;

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

  blocked_user_ids: Array<string>;

  teams: Array<string>;

  custom: Record<string, any>;

  avg_response_time?: number;

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

export interface UserRoleParameters {
  operator?: string;

  role?: string;
}

export interface UserRuleParameters {
  max_age?: string;
}

export interface UserUnbannedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.unbanned" in this case
   */
  type: string;

  /**
   * The ID of the channel where the target user was unbanned
   */
  channel_id?: string;

  channel_member_count?: number;

  channel_message_count?: number;

  /**
   * The type of the channel where the target user was unbanned
   */
  channel_type?: string;

  /**
   * The CID of the channel where the target user was unbanned
   */
  cid?: string;

  received_at?: Date;

  /**
   * Whether the target user was shadow unbanned
   */
  shadow?: boolean;

  /**
   * The team of the channel where the target user was unbanned
   */
  team?: string;

  channel_custom?: Record<string, any>;

  created_by?: UserResponseCommonFields;
}

export interface UserUnmutedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.unmuted" in this case
   */
  type: string;

  received_at?: Date;

  /**
   * The target users that were unmuted
   */
  target_users?: Array<UserResponseCommonFields>;

  target_user?: UserResponseCommonFields;
}

export interface UserUnreadReminderEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  /**
   * The channels with unread messages
   */
  channels: Record<string, ChannelMessagesResponse>;

  custom: Record<string, any>;

  user: UserResponseCommonFields;

  /**
   * The type of event: "user.unread_message_reminder" in this case
   */
  type: string;

  received_at?: Date;
}

export interface UserUpdatedEvent {
  /**
   * Date/time of creation
   */
  created_at: Date;

  custom: Record<string, any>;

  user: UserResponsePrivacyFields;

  /**
   * The type of event: "user.updated" in this case
   */
  type: string;

  received_at?: Date;
}

export interface ValidateExternalStorageResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;
}

export interface VelocityFilterConfig {
  advanced_filters?: boolean;

  async?: boolean;

  cascading_actions?: boolean;

  cids_per_user?: number;

  enabled?: boolean;

  first_message_only?: boolean;

  rules?: Array<VelocityFilterConfigRule>;
}

export interface VelocityFilterConfigRule {
  action: 'flag' | 'shadow' | 'remove' | 'ban';

  ban_duration?: number;

  cascading_action?: 'flag' | 'shadow' | 'remove' | 'ban';

  cascading_threshold?: number;

  check_message_context?: boolean;

  fast_spam_threshold?: number;

  fast_spam_ttl?: number;

  ip_ban?: boolean;

  probation_period?: number;

  shadow_ban?: boolean;

  slow_spam_ban_duration?: number;

  slow_spam_threshold?: number;

  slow_spam_ttl?: number;

  url_only?: boolean;
}

export interface VideoCallRuleConfig {
  flag_all_labels?: boolean;

  flagged_labels?: Array<string>;

  rules?: Array<HarmConfig>;
}

export interface VideoContentParameters {
  label_operator?: string;

  harm_labels?: Array<string>;
}

export interface VideoEndCallRequestPayload {}

export interface VideoKickUserRequestPayload {}

export interface VideoReactionOverTimeResponse {
  by_minute?: Array<CountByMinuteResponse>;
}

export interface VideoReactionResponse {
  type: string;

  /**
   * User response object
   */
  user: UserResponse;

  emoji_code?: string;

  custom?: Record<string, any>;
}

export interface VideoReactionsResponse {
  reaction: string;

  count_over_time?: VideoReactionOverTimeResponse;
}

export interface VideoRuleParameters {
  threshold?: number;

  time_window?: string;

  harm_labels?: Array<string>;
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

export interface ViewerBehavior {
  connection_duration_p50_s: number;

  connections_per_viewer_mean: number;

  median_watch_min: number;

  note: string;

  p90_watch_min: number;

  bounce_rate_pct?: number;

  connections_under_30s_pct?: number;

  return_visit_rate_pct?: number;
}

export interface VoteData {
  answer_text?: string;

  option_id?: string;
}

export type WHEvent =
  | ({ type: '*' } & CustomEvent)
  | ({ type: 'appeal.accepted' } & AppealAcceptedEvent)
  | ({ type: 'appeal.created' } & AppealCreatedEvent)
  | ({ type: 'appeal.rejected' } & AppealRejectedEvent)
  | ({ type: 'call.accepted' } & CallAcceptedEvent)
  | ({ type: 'call.blocked_user' } & BlockedUserEvent)
  | ({ type: 'call.closed_caption' } & ClosedCaptionEvent)
  | ({ type: 'call.closed_captions_failed' } & CallClosedCaptionsFailedEvent)
  | ({ type: 'call.closed_captions_started' } & CallClosedCaptionsStartedEvent)
  | ({ type: 'call.closed_captions_stopped' } & CallClosedCaptionsStoppedEvent)
  | ({ type: 'call.created' } & CallCreatedEvent)
  | ({ type: 'call.deleted' } & CallDeletedEvent)
  | ({ type: 'call.dtmf' } & CallDTMFEvent)
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
  | ({ type: 'call.kicked_user' } & KickedUserEvent)
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
      type: 'call.session_participant_count_updated';
    } & CallSessionParticipantCountsUpdatedEvent)
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
  | ({ type: 'channel.max_streak_changed' } & MaxStreakChangedEvent)
  | ({ type: 'channel.muted' } & ChannelMutedEvent)
  | ({ type: 'channel.truncated' } & ChannelTruncatedEvent)
  | ({ type: 'channel.unfrozen' } & ChannelUnFrozenEvent)
  | ({ type: 'channel.unmuted' } & ChannelUnmutedEvent)
  | ({ type: 'channel.updated' } & ChannelUpdatedEvent)
  | ({ type: 'channel.visible' } & ChannelVisibleEvent)
  | ({ type: 'channel_batch_update.completed' } & ChannelBatchCompletedEvent)
  | ({ type: 'channel_batch_update.started' } & ChannelBatchStartedEvent)
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
  | ({ type: 'export.review_queue.error' } & AsyncExportErrorEvent)
  | ({ type: 'export.review_queue.success' } & AsyncExportReviewQueueEvent)
  | ({ type: 'export.users.error' } & AsyncExportErrorEvent)
  | ({ type: 'export.users.success' } & AsyncExportUsersEvent)
  | ({ type: 'feeds.activity.added' } & ActivityAddedEvent)
  | ({ type: 'feeds.activity.deleted' } & ActivityDeletedEvent)
  | ({ type: 'feeds.activity.feedback' } & ActivityFeedbackEvent)
  | ({ type: 'feeds.activity.marked' } & ActivityMarkEvent)
  | ({ type: 'feeds.activity.pinned' } & ActivityPinnedEvent)
  | ({ type: 'feeds.activity.reaction.added' } & ActivityReactionAddedEvent)
  | ({ type: 'feeds.activity.reaction.deleted' } & ActivityReactionDeletedEvent)
  | ({ type: 'feeds.activity.reaction.updated' } & ActivityReactionUpdatedEvent)
  | ({
      type: 'feeds.activity.removed_from_feed';
    } & ActivityRemovedFromFeedEvent)
  | ({ type: 'feeds.activity.restored' } & ActivityRestoredEvent)
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
  | ({ type: 'feeds.comment.restored' } & CommentRestoredEvent)
  | ({ type: 'feeds.comment.updated' } & CommentUpdatedEvent)
  | ({ type: 'feeds.feed.created' } & FeedCreatedEvent)
  | ({ type: 'feeds.feed.deleted' } & FeedDeletedEvent)
  | ({ type: 'feeds.feed.updated' } & FeedUpdatedEvent)
  | ({ type: 'feeds.feed_group.changed' } & FeedGroupChangedEvent)
  | ({ type: 'feeds.feed_group.deleted' } & FeedGroupDeletedEvent)
  | ({ type: 'feeds.feed_group.restored' } & FeedGroupRestoredEvent)
  | ({ type: 'feeds.feed_member.added' } & FeedMemberAddedEvent)
  | ({ type: 'feeds.feed_member.removed' } & FeedMemberRemovedEvent)
  | ({ type: 'feeds.feed_member.updated' } & FeedMemberUpdatedEvent)
  | ({ type: 'feeds.follow.created' } & FollowCreatedEvent)
  | ({ type: 'feeds.follow.deleted' } & FollowDeletedEvent)
  | ({ type: 'feeds.follow.updated' } & FollowUpdatedEvent)
  | ({ type: 'feeds.notification_feed.updated' } & NotificationFeedUpdatedEvent)
  | ({ type: 'feeds.stories_feed.updated' } & StoriesFeedUpdatedEvent)
  | ({ type: 'flag.updated' } & FlagUpdatedEvent)
  | ({ type: 'ingress.error' } & IngressErrorEvent)
  | ({ type: 'ingress.started' } & IngressStartedEvent)
  | ({ type: 'ingress.stopped' } & IngressStoppedEvent)
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
  | ({ type: 'moderation.analysis.failed' } & ModerationAnalysisFailedEvent)
  | ({ type: 'moderation.custom_action' } & ModerationCustomActionEvent)
  | ({ type: 'moderation.flagged' } & ModerationFlaggedEvent)
  | ({
      type: 'moderation.image_analysis.complete';
    } & ModerationImageAnalysisCompleteEvent)
  | ({ type: 'moderation.mark_reviewed' } & ModerationMarkReviewedEvent)
  | ({
      type: 'moderation.text_analysis.complete';
    } & ModerationTextAnalysisCompleteEvent)
  | ({ type: 'moderation_check.completed' } & ModerationCheckCompletedEvent)
  | ({ type: 'moderation_rule.triggered' } & ModerationRulesTriggeredEvent)
  | ({ type: 'notification.mark_unread' } & NotificationMarkUnreadEvent)
  | ({ type: 'notification.reminder_due' } & ReminderNotificationEvent)
  | ({
      type: 'notification.thread_message_new';
    } & NotificationThreadMessageNewEvent)
  | ({ type: 'reaction.deleted' } & ReactionDeletedEvent)
  | ({ type: 'reaction.new' } & ReactionNewEvent)
  | ({ type: 'reaction.updated' } & ReactionUpdatedEvent)
  | ({ type: 'reminder.created' } & ReminderCreatedEvent)
  | ({ type: 'reminder.deleted' } & ReminderDeletedEvent)
  | ({ type: 'reminder.updated' } & ReminderUpdatedEvent)
  | ({ type: 'review_queue_item.new' } & ReviewQueueItemNewEvent)
  | ({ type: 'review_queue_item.updated' } & ReviewQueueItemUpdatedEvent)
  | ({ type: 'thread.updated' } & ThreadUpdatedEvent)
  | ({ type: 'user.banned' } & UserBannedEvent)
  | ({ type: 'user.deactivated' } & UserDeactivatedEvent)
  | ({ type: 'user.deleted' } & UserDeletedEvent)
  | ({ type: 'user.flagged' } & UserFlaggedEvent)
  | ({ type: 'user.messages.deleted' } & UserMessagesDeletedEvent)
  | ({ type: 'user.muted' } & UserMutedEvent)
  | ({ type: 'user.reactivated' } & UserReactivatedEvent)
  | ({ type: 'user.unbanned' } & UserUnbannedEvent)
  | ({ type: 'user.unmuted' } & UserUnmutedEvent)
  | ({ type: 'user.unread_message_reminder' } & UserUnreadReminderEvent)
  | ({ type: 'user.updated' } & UserUpdatedEvent)
  | ({ type: 'user_group.created' } & UserGroupCreatedEvent)
  | ({ type: 'user_group.deleted' } & UserGroupDeletedEvent)
  | ({ type: 'user_group.member_added' } & UserGroupMemberAddedEvent)
  | ({ type: 'user_group.member_removed' } & UserGroupMemberRemovedEvent)
  | ({ type: 'user_group.updated' } & UserGroupUpdatedEvent);

export interface WHIPIngress {
  /**
   * URL for a new whip input, every time a new link is created
   */
  address: string;
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

  /**
   * Represents channel in chat
   */
  channel?: ChannelResponse;

  /**
   * User response object
   */
  created_by?: UserResponse;

  me?: OwnUserResponse;

  member?: ChannelMemberResponse;

  /**
   * Represents any chat message
   */
  message?: MessageResponse;

  message_update?: MessageUpdate;

  poll?: PollResponseData;

  poll_vote?: PollVoteResponseData;

  reaction?: ReactionResponse;

  thread?: ThreadResponse;

  /**
   * User response object
   */
  user?: UserResponse;
}

export interface WebhookFailoverConfig {
  gcs_bucket?: string;

  gcs_credentials?: string;

  gcs_path?: string;

  type?: string;
}

export interface WrappedUnreadCountsResponse {
  /**
   * Duration of the request in milliseconds
   */
  duration: string;

  total_unread_count: number;

  total_unread_threads_count: number;

  channel_type: Array<UnreadCountsChannelType>;

  channels: Array<UnreadCountsChannel>;

  threads: Array<UnreadCountsThread>;

  total_unread_count_by_team?: Record<string, number>;
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
