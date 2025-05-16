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

export interface AcceptFeedMemberRequest {
  user_id: string;
}

export interface AcceptFeedMemberResponse {
  duration: string;

  feed_member: FeedMember;
}

export interface AcceptFollowRequest {
  source_fid: string;

  target_fid: string;
}

export interface AcceptFollowResponse {
  duration: string;

  follow: Follow;
}

export interface Activity {
  bookmark_count: number;

  comment_count: number;

  created_at: Date;

  id: string;

  text: string;

  type: string;

  updated_at: Date;

  visibility: string;

  feeds: string[];

  user: UserResponse;

  deleted_at?: Date;

  edited_at?: Date;

  expires_at?: Date;

  popularity?: number;

  score?: number;

  share_count?: number;

  attachments?: ActivityAttachment[];

  comments?: Comment[];

  filter_tags?: string[];

  interest_tags?: string[];

  latest_reactions?: ActivityReaction[];

  mentioned_users?: UserResponse[];

  own_bookmarks?: Bookmark[];

  own_reactions?: ActivityReaction[];

  current_feed?: Feed;

  custom?: Record<string, any>;

  location?: ActivityLocation;

  parent?: BaseActivity;

  reaction_groups?: Record<string, ReactionGroup>;

  search_data?: Record<string, any>;
}

export interface ActivityAddedEvent {
  created_at: Date;

  fid: string;

  activity: Activity;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityAnalyserConfig {}

export interface ActivityAttachment {
  type: string;

  url: string;

  asset_url?: string;

  image_url?: string;

  live_call_cid?: string;

  custom?: Record<string, any>;
}

export interface ActivityDeletedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityLocation {
  lat: number;

  lng: number;
}

export interface ActivityPin {
  activity_id: string;

  created_at: Date;

  feed: string;

  updated_at: Date;

  user: UserResponse;
}

export interface ActivityReaction {
  activity_id: string;

  created_at: Date;

  type: string;

  updated_at: Date;

  user: UserResponse;

  custom?: Record<string, any>;
}

export interface ActivityReactionAddedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  reaction: ActivityReaction;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityReactionDeletedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  reaction: ActivityReaction;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityRemovedFromFeedEvent {
  created_at: Date;

  fid: string;

  activity: Activity;

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

  text?: string;

  user_id?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'private' | 'restricted';

  attachments?: ActivityAttachment[];

  filter_tags?: string[];

  interest_tags?: string[];

  mentioned_user_ids?: string[];

  custom?: Record<string, any>;

  location?: ActivityLocation;

  search_data?: Record<string, any>;
}

export interface ActivitySelectorConfig {
  cutoff_time?: Date;

  min_popularity?: number;

  tag_filter_type?: string;

  type?: string;

  tags?: string[];
}

export interface ActivityUpdatedEvent {
  created_at: Date;

  fid: string;

  activity: Activity;

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

  text?: string;

  user_id?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'private' | 'restricted';

  attachments?: ActivityAttachment[];

  filter_tags?: string[];

  interest_tags?: string[];

  mentioned_user_ids?: string[];

  custom?: Record<string, any>;

  location?: ActivityLocation;

  search_data?: Record<string, any>;
}

export interface AddActivityResponse {
  duration: string;

  activity: Activity;
}

export interface AddBookmarkRequest {
  folder_id?: string;

  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;
}

export interface AddBookmarkResponse {
  duration: string;

  bookmark: Bookmark;
}

export interface AddCommentRequest {
  comment: string;

  parent_id?: string;

  custom?: Record<string, any>;
}

export interface AddCommentResponse {
  duration: string;

  comment: Comment;
}

export interface AddFolderRequest {
  name: string;

  custom?: Record<string, any>;
}

export interface AddReactionRequest {
  type: string;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface AddReactionResponse {
  duration: string;

  reaction: ActivityReaction;
}

export interface AggregatedActivity {
  activity_count: number;

  created_at: Date;

  group: string;

  score: number;

  updated_at: Date;

  user_count: number;

  activities: Activity[];
}

export interface AggregationConfig {
  format?: string;
}

export interface BaseActivity {
  bookmark_count: number;

  comment_count: number;

  created_at: Date;

  id: string;

  text: string;

  type: string;

  updated_at: Date;

  visibility: string;

  feeds: string[];

  user: UserResponse;

  deleted_at?: Date;

  edited_at?: Date;

  expires_at?: Date;

  popularity?: number;

  score?: number;

  share_count?: number;

  attachments?: ActivityAttachment[];

  comments?: Comment[];

  filter_tags?: string[];

  interest_tags?: string[];

  latest_reactions?: ActivityReaction[];

  mentioned_users?: UserResponse[];

  own_bookmarks?: Bookmark[];

  own_reactions?: ActivityReaction[];

  current_feed?: Feed;

  custom?: Record<string, any>;

  location?: ActivityLocation;

  moderation?: Moderation;

  reaction_groups?: Record<string, ReactionGroup>;

  search_data?: Record<string, any>;
}

export interface Bookmark {
  activity_id: string;

  created_at: Date;

  updated_at: Date;

  folder: BookmarkFolder;

  user: UserResponse;

  custom?: Record<string, any>;
}

export interface BookmarkAddedEvent {
  activity_id: string;

  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkDeletedEvent {
  created_at: Date;

  fid: string;

  bookmark: Bookmark;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface BookmarkFolder {
  created_at: Date;

  id: string;

  name: string;

  updated_at: Date;

  custom?: Record<string, any>;
}

export interface BookmarkUpdatedEvent {
  created_at: Date;

  fid: string;

  bookmark: Bookmark;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface Comment {
  activity_id: string;

  created_at: Date;

  id: string;

  reaction_count: number;

  reply_count: number;

  updated_at: Date;

  user: UserResponse;

  deleted_at?: Date;

  parent_id?: string;

  text?: string;

  latest_reactions?: ActivityReaction[];

  custom?: Record<string, any>;

  reaction_groups?: Record<string, ReactionGroup>;
}

export interface CommentAddedEvent {
  created_at: Date;

  fid: string;

  comment: Comment;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentRemovedEvent {
  created_at: Date;

  fid: string;

  comment: Comment;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentUpdatedEvent {
  created_at: Date;

  fid: string;

  comment: Comment;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CreateActivitiesBatchRequest {
  activities: ActivityRequest[];
}

export interface CreateActivitiesBatchResponse {
  duration: string;

  activities: Activity[];
}

export interface CreateFeedViewRequest {
  view_id: string;

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface CreateFeedViewResponse {
  duration: string;

  feed_view: CustomFeedView;
}

export interface CreateManyFeedsRequest {
  feeds: FeedPayload[];
}

export interface CreateManyFeedsResponse {
  duration: string;

  feeds: Feed[];
}

export interface CustomFeedView {
  feed_group: string;

  id: string;

  last_used_at?: Date;

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface DecayFunctionConfig {
  base?: string;

  decay?: string;

  direction?: string;

  offset?: string;

  origin?: string;

  scale?: string;
}

export interface DeleteActivityReactionResponse {
  activity_id: string;

  duration: string;

  type: string;

  user_id: string;
}

export interface DeleteActivityResponse {
  duration: string;
}

export interface DeleteBookmarkResponse {
  duration: string;

  bookmark: Bookmark;
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

export interface ExportFeedUserDataRequest {}

export interface ExportFeedUserDataResponse {
  duration: string;

  activities: Activity[];

  bookmarks: Bookmark[];

  comments: Comment[];

  reactions: ActivityReaction[];
}

export interface Feed {
  created_at: Date;

  fid: string;

  follower_count: number;

  following_count: number;

  group_id: string;

  id: string;

  member_count: number;

  pin_count: number;

  updated_at: Date;

  owner: UserResponse;

  deleted_at?: Date;

  visibility?: string;

  custom?: Record<string, any>;
}

export interface FeedCreatedEvent {
  created_at: Date;

  fid: string;

  members: FeedMember[];

  custom: Record<string, any>;

  feed: Feed;

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
  created_at: Date;

  group_id: string;

  id: string;

  updated_at: Date;

  default_visibility?: string;

  activity_analysers?: ActivityAnalyserConfig[];

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  custom?: Record<string, any>;

  notification?: NotificationConfig;

  ranking?: RankingConfig;

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

export interface FeedInput {
  visibility?: 'public' | 'visible' | 'followers' | 'private' | 'restricted';

  members?: FeedMemberPayload[];

  custom?: Record<string, any>;
}

export interface FeedMember {
  created_at: Date;

  role: string;

  status: string;

  updated_at: Date;

  user: UserResponse;

  request?: boolean;

  request_accepted_at?: Date;

  request_rejected_at?: Date;

  custom?: Record<string, any>;
}

export interface FeedMemberPayload {
  user_id: string;

  request?: boolean;

  role?: string;

  custom?: Record<string, any>;
}

export interface FeedPayload {
  feed_group_id: string;

  feed_id: string;

  owner_id?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'private' | 'restricted';

  members?: FeedMemberPayload[];

  custom?: Record<string, any>;
}

export interface FeedUpdatedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  feed: Feed;

  user: UserResponseCommonFields;

  type: string;

  received_at?: Date;
}

export interface Follow {
  created_at: Date;

  push_preference: string;

  request: boolean;

  source_fid: string;

  status: string;

  target_fid: string;

  updated_at: Date;

  source_feed: Feed;

  target_feed: Feed;

  request_accepted_at?: Date;

  request_rejected_at?: Date;

  role?: string;

  custom?: Record<string, any>;
}

export interface FollowAddedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: Follow;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FollowManyRequest {
  follows: FollowPayload[];
}

export interface FollowManyResponse {
  duration: string;

  follows: Follow[];
}

export interface FollowPayload {
  source: string;

  target: string;

  push_preference?: string;

  request?: boolean;

  custom?: Record<string, any>;
}

export interface FollowRemovedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: Follow;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface FollowRequest {
  source: string;

  target: string;

  push_preference?: string;

  request?: boolean;

  custom?: Record<string, any>;
}

export interface FollowResponse {
  duration: string;

  follow: Follow;
}

export interface FollowSuggestionsResponse {
  duration: string;

  suggestions: Feed[];

  next?: string;

  prev?: string;
}

export interface FollowUpdatedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  follow: Follow;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface GetActivityResponse {
  duration: string;

  activity: Activity;
}

export interface GetOrCreateFeedRequest {
  comment_limit?: number;

  comment_sort?: 'first' | 'last' | 'popular';

  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  view?: string;

  watch?: boolean;

  data?: FeedInput;

  external_ranking?: Record<string, any>;

  filter?: Record<string, any>;

  follower_pagination?: PagerRequest;

  following_pagination?: PagerRequest;

  member_pagination?: PagerRequest;

  user?: UserRequest;
}

export interface GetOrCreateFeedResponse {
  duration: string;

  activities: Activity[];

  aggregated_activities: AggregatedActivity[];

  followers: Follow[];

  following: Follow[];

  members: FeedMember[];

  pinned_activities: ActivityPin[];

  feed: Feed;

  next?: string;

  prev?: string;

  followers_pagination?: PagerResponse;

  following_pagination?: PagerResponse;

  member_pagination?: PagerResponse;

  notification_status?: NotificationStatus;

  own_feed_follow?: Follow;

  own_feed_membership?: FeedMember;
}

export interface MarkActivityRequest {
  mark_all_read?: boolean;

  mark_all_seen?: boolean;

  user_id?: string;

  mark_read?: string[];

  mark_watched?: string[];

  user?: UserRequest;
}

export interface Moderation {}

export interface NotificationConfig {
  track_read?: boolean;

  track_seen?: boolean;
}

export interface NotificationStatus {
  unread: number;

  unseen: number;

  last_seen_at?: Date;

  read_activities?: string[];
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

export interface PinActivityRequest {
  user_id?: string;

  user?: UserRequest;
}

export interface PinActivityResponse {
  activity_id: string;

  created_at: Date;

  duration: string;

  fid: string;

  user_id: string;
}

export interface PrivacySettingsResponse {
  read_receipts?: ReadReceiptsResponse;

  typing_indicators?: TypingIndicatorsResponse;
}

export interface PushNotificationSettingsResponse {
  disabled?: boolean;

  disabled_until?: Date;
}

export interface QueryActivitiesRequest {
  comment_limit?: number;

  comment_sort?: 'first' | 'last' | 'popular';

  limit?: number;

  next?: string;

  prev?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;
}

export interface QueryActivitiesResponse {
  duration: string;

  activities: Activity[];

  next?: string;

  prev?: string;
}

export interface QueryCommentsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  sort?: 'first' | 'last' | 'reaction_count';

  user_id?: string;

  activity_ids?: string[];

  parent_ids?: string[];
}

export interface QueryCommentsResponse {
  duration: string;

  comments: Comment[];

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

  members: FeedMember[];

  pagination: PagerResponse;
}

export interface QueryFeedsResponse {
  duration: string;

  feeds: Feed[];

  pager: PagerResponse;
}

export interface QueryFollowsRequest {
  limit?: number;

  next?: string;

  prev?: string;

  user_id?: string;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  user?: UserRequest;
}

export interface QueryFollowsResponse {
  duration: string;

  follows: Follow[];

  next?: string;

  prev?: string;
}

export interface RankingConfig {
  decay_factor?: number;

  recency_weight?: number;

  score?: string;

  type?: string;

  defaults?: Record<string, any>;

  functions?: Record<string, DecayFunctionConfig>;
}

export interface ReactionGroup {
  count: number;

  first_reaction_at: Date;

  last_reaction_at: Date;
}

export interface ReadReceiptsResponse {
  enabled: boolean;
}

export interface RejectFeedMemberRequest {
  user_id: string;
}

export interface RejectFeedMemberResponse {
  duration: string;

  feed_member: FeedMember;
}

export interface RejectFollowRequest {
  source_fid: string;

  target_fid: string;
}

export interface RejectFollowResponse {
  duration: string;

  follow: Follow;
}

export interface RemoveActivitiesRequest {
  activity_ids: string[];

  hard_delete?: boolean;

  user_id?: string;

  user?: UserRequest;
}

export interface RemoveActivitiesResponse {
  duration: string;

  removed_activity_ids: string[];
}

export interface RemoveCommentResponse {
  duration: string;

  comment: Comment;
}

export interface Response {
  duration: string;
}

export interface SortParamRequest {
  direction?: number;

  field?: string;
}

export interface StoriesConfig {
  expiration_behaviour?: string;

  skip_watched?: boolean;
}

export interface TypingIndicatorsResponse {
  enabled: boolean;
}

export interface UnfollowManyRequest {
  follows: UnfollowPayload[];

  user_id?: string;

  user?: UserRequest;
}

export interface UnfollowManyResponse {
  duration: string;
}

export interface UnfollowPayload {
  source_fid: string;

  target_fid: string;
}

export interface UnfollowResponse {
  duration: string;
}

export interface UnpinActivityResponse {
  activity_id: string;

  duration: string;

  fid: string;

  user_id: string;
}

export interface UpdateActivityPartialRequest {
  user_id?: string;

  unset?: string[];

  set?: Record<string, any>;

  user?: UserRequest;
}

export interface UpdateActivityPartialResponse {
  duration: string;

  activity: Activity;
}

export interface UpdateBookmarkRequest {
  feed_id: string;

  feed_type: string;

  custom?: Record<string, any>;
}

export interface UpdateBookmarkResponse {
  duration: string;

  bookmark: Bookmark;
}

export interface UpdateCommentRequest {
  comment?: string;

  custom?: Record<string, any>;
}

export interface UpdateCommentResponse {
  duration: string;

  comment: Comment;
}

export interface UpdateFeedMembersRequest {
  operation: 'add' | 'remove' | 'set';

  limit?: number;

  next?: string;

  prev?: string;

  members?: FeedMemberPayload[];
}

export interface UpdateFeedRequest {
  custom?: Record<string, any>;
}

export interface UpdateFeedResponse {
  duration: string;

  feed: Feed;
}

export interface UpdateFeedViewRequest {
  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface UpdateFeedViewResponse {
  duration: string;

  feed_view: CustomFeedView;
}

export interface UpdateFollowRequest {
  push_preference?: string;

  custom?: Record<string, any>;
}

export interface UpdateFollowResponse {
  duration: string;

  follow: Follow;
}

export interface UpsertFeedGroupRequest {
  feed_group_id: string;

  activity_analysers?: ActivityAnalyserConfig[];

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  custom?: Record<string, any>;

  notification?: NotificationConfig;

  ranking?: RankingConfig;
}

export interface UpsertFeedGroupResponse {
  duration: string;

  feed_group: FeedGroup;
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

export type WebhookEvent =
  | ({ type: 'activity.added' } & ActivityAddedEvent)
  | ({ type: 'activity.deleted' } & ActivityDeletedEvent)
  | ({ type: 'activity.reaction.added' } & ActivityReactionAddedEvent)
  | ({ type: 'activity.reaction.deleted' } & ActivityReactionDeletedEvent)
  | ({ type: 'activity.removed_from_feed' } & ActivityRemovedFromFeedEvent)
  | ({ type: 'activity.updated' } & ActivityUpdatedEvent)
  | ({ type: 'bookmark.added' } & BookmarkAddedEvent)
  | ({ type: 'bookmark.deleted' } & BookmarkDeletedEvent)
  | ({ type: 'bookmark.updated' } & BookmarkUpdatedEvent)
  | ({ type: 'comment.added' } & CommentAddedEvent)
  | ({ type: 'comment.removed' } & CommentRemovedEvent)
  | ({ type: 'comment.updated' } & CommentUpdatedEvent)
  | ({ type: 'feed.created' } & FeedCreatedEvent)
  | ({ type: 'feed.deleted' } & FeedDeletedEvent)
  | ({ type: 'feed.updated' } & FeedUpdatedEvent)
  | ({ type: 'feed_group.changed' } & FeedGroupChangedEvent)
  | ({ type: 'feed_group.deleted' } & FeedGroupDeletedEvent)
  | ({ type: 'follow.added' } & FollowAddedEvent)
  | ({ type: 'follow.removed' } & FollowRemovedEvent)
  | ({ type: 'follow.updated' } & FollowUpdatedEvent);
