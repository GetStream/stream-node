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

  feed_member: FeedMemberResponse;
}

export interface AcceptFollowRequest {
  source_fid: string;

  target_fid: string;
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

export interface ActivityAddedEvent {
  created_at: Date;

  fid: string;

  activity: ActivityResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityAnalyserConfig {}

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

export interface ActivityPinResponse {
  activity_id: string;

  created_at: Date;

  feed: string;

  updated_at: Date;

  user: UserResponse;
}

export interface ActivityReactionAddedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  reaction: ActivityReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityReactionDeletedEvent {
  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  reaction: ActivityReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface ActivityReactionResponse {
  activity_id: string;

  created_at: Date;

  type: string;

  updated_at: Date;

  user: UserResponse;

  custom?: Record<string, any>;
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

  latest_reactions: ActivityReactionResponse[];

  mentioned_users: UserResponse[];

  own_bookmarks: BookmarkResponse[];

  own_reactions: ActivityReactionResponse[];

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

  parent?: BaseActivityResponse;
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

  custom?: Record<string, any>;

  new_folder?: AddFolderRequest;
}

export interface AddBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface AddCommentReactionRequest {
  type: string;

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface AddCommentReactionResponse {
  comment_id: string;

  duration: string;

  reaction: ActivityReactionResponse;
}

export interface AddCommentRequest {
  comment: string;

  object_id: string;

  object_type: string;

  parent_id?: string;

  attachments?: Attachment[];

  mentioned_user_ids?: string[];

  custom?: Record<string, any>;
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

  user_id?: string;

  custom?: Record<string, any>;

  user?: UserRequest;
}

export interface AddReactionResponse {
  duration: string;

  reaction: ActivityReactionResponse;
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

  latitude?: number;

  longitude?: number;

  og_scrape_url?: string;

  original_height?: number;

  original_width?: number;

  pretext?: string;

  stopped_sharing?: boolean;

  text?: string;

  thumb_url?: string;

  title?: string;

  title_link?: string;

  type?: string;

  actions?: Action[];

  fields?: Field[];

  giphy?: Images;
}

export interface BaseActivityResponse {
  bookmark_count: number;

  comment_count: number;

  created_at: Date;

  id: string;

  popularity: number;

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

  latest_reactions: ActivityReactionResponse[];

  mentioned_users: UserResponse[];

  own_bookmarks: BookmarkResponse[];

  own_reactions: ActivityReactionResponse[];

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

  moderation?: Moderation;
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

  bookmark: BookmarkResponse;

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

export interface BookmarkResponse {
  activity_id: string;

  created_at: Date;

  updated_at: Date;

  folder: BookmarkFolderResponse;

  user: UserResponse;

  custom?: Record<string, any>;
}

export interface BookmarkUpdatedEvent {
  created_at: Date;

  fid: string;

  bookmark: BookmarkResponse;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
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
  comment_id: string;

  created_at: Date;

  fid: string;

  custom: Record<string, any>;

  reaction: ActivityReactionResponse;

  type: string;

  received_at?: Date;

  user?: UserResponseCommonFields;
}

export interface CommentReactionRemovedEvent {
  comment_id: string;

  created_at: Date;

  fid: string;

  user_id: string;

  custom: Record<string, any>;

  type: string;

  received_at?: Date;
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

  user: UserResponse;

  controversy_score?: number;

  deleted_at?: Date;

  parent_id?: string;

  text?: string;

  attachments?: Attachment[];

  latest_reactions?: ActivityReactionResponse[];

  mentioned_user_ids?: string[];

  custom?: Record<string, any>;

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

export interface CreateFeedGroupRequest {
  feed_group_id: string;

  activity_analysers?: ActivityAnalyserConfig[];

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  custom?: Record<string, any>;

  notification?: NotificationConfig;

  ranking?: RankingConfig;
}

export interface CreateFeedGroupResponse {
  duration: string;

  feed_group: FeedGroupResponse;
}

export interface CreateFeedViewRequest {
  view_id: string;

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface CreateFeedViewResponse {
  duration: string;

  feed_view: FeedViewResponse;
}

export interface CreateManyFeedsRequest {
  feeds: FeedRequest[];
}

export interface CreateManyFeedsResponse {
  duration: string;

  feeds: FeedResponse[];
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

  bookmark: BookmarkResponse;
}

export interface DeleteCommentResponse {
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

  activities: ActivityResponse[];

  bookmarks: BookmarkResponse[];

  comments: CommentResponse[];

  reactions: ActivityReactionResponse[];
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
  aggregation_version: number;

  app_pk: number;

  created_at: Date;

  default_visibility: string;

  id: string;

  updated_at: Date;

  activity_analysers: ActivityAnalyserConfig[];

  activity_selectors: ActivitySelectorConfig[];

  custom: Record<string, any>;

  deleted_at?: Date;

  last_feed_get_at?: Date;

  aggregation?: AggregationConfig;

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

export interface FeedGroupResponse {
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

export interface FeedInput {
  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  members?: FeedMemberRequest[];

  custom?: Record<string, any>;
}

export interface FeedMemberRequest {
  user_id: string;

  request?: boolean;

  role?: string;

  custom?: Record<string, any>;
}

export interface FeedMemberResponse {
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

export interface FeedRequest {
  feed_group_id: string;

  feed_id: string;

  created_by_id?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

  members?: FeedMemberRequest[];

  custom?: Record<string, any>;
}

export interface FeedResponse {
  created_at: Date;

  fid: string;

  follower_count: number;

  following_count: number;

  group_id: string;

  id: string;

  member_count: number;

  pin_count: number;

  updated_at: Date;

  created_by: UserResponse;

  deleted_at?: Date;

  visibility?: string;

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
  feed_group_id: string;

  view_id: string;

  last_used_at?: Date;

  activity_selectors?: ActivitySelectorConfig[];

  aggregation?: AggregationConfig;

  ranking?: RankingConfig;
}

export interface Field {
  short: boolean;

  title: string;

  value: string;
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

  push_preference?: string;

  custom?: Record<string, any>;
}

export interface FollowResponse {
  created_at: Date;

  push_preference: string;

  status: string;

  updated_at: Date;

  source_feed: FeedResponse;

  target_feed: FeedResponse;

  request_accepted_at?: Date;

  request_rejected_at?: Date;

  role?: string;

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

export interface GetActivityResponse {
  duration: string;

  activity: ActivityResponse;
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

export interface GetFollowSuggestionsResponse {
  duration: string;

  suggestions: FeedResponse[];
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

  activities: ActivityResponse[];

  aggregated_activities: AggregatedActivityResponse[];

  followers: FollowResponse[];

  following: FollowResponse[];

  members: FeedMemberResponse[];

  pinned_activities: ActivityPinResponse[];

  feed: FeedResponse;

  next?: string;

  prev?: string;

  capabilities?: string[];

  own_follows?: FollowResponse[];

  followers_pagination?: PagerResponse;

  following_pagination?: PagerResponse;

  member_pagination?: PagerResponse;

  notification_status?: NotificationStatusResponse;

  own_membership?: FeedMemberResponse;
}

export interface ImageData {
  frames: string;

  height: string;

  size: string;

  url: string;

  width: string;
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

export interface NotificationStatusResponse {
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

  activities: ActivityResponse[];

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

  pagination: PagerResponse;
}

export interface QueryFeedsRequest {
  watch?: boolean;

  sort?: SortParamRequest[];

  filter?: Record<string, any>;

  pagination?: PagerRequest;
}

export interface QueryFeedsResponse {
  duration: string;

  feeds: FeedResponse[];

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

  follows: FollowResponse[];

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

export interface ReactionGroupResponse {
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

  feed_member: FeedMemberResponse;
}

export interface RejectFollowRequest {
  source_fid: string;

  target_fid: string;
}

export interface RejectFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface RemoveCommentReactionResponse {
  duration: string;
}

export interface RepliesMeta {
  depth_truncated: boolean;

  has_more: boolean;

  remaining: number;

  next_cursor?: string;
}

export interface Response {
  duration: string;
}

export interface SingleFollowRequest {
  source: string;

  target: string;

  push_preference?: string;

  custom?: Record<string, any>;
}

export interface SingleFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface SortParamRequest {
  direction?: number;

  field?: string;
}

export interface StoriesConfig {
  expiration_behaviour?: string;

  skip_watched?: boolean;
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

  user: UserResponse;

  controversy_score?: number;

  deleted_at?: Date;

  parent_id?: string;

  text?: string;

  attachments?: Attachment[];

  latest_reactions?: ActivityReactionResponse[];

  mentioned_user_ids?: string[];

  replies?: ThreadedCommentResponse[];

  custom?: Record<string, any>;

  meta?: RepliesMeta;

  reaction_groups?: Record<string, ReactionGroupResponse>;
}

export interface TypingIndicatorsResponse {
  enabled: boolean;
}

export interface UnfollowBatchRequest {
  follows: FollowPair[];

  user_id?: string;

  user?: UserRequest;
}

export interface UnfollowBatchResponse {
  duration: string;
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

  activity: ActivityResponse;
}

export interface UpdateActivityRequest {
  expires_at?: Date;

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

export interface UpdateBookmarkRequest {
  feed_id: string;

  feed_type: string;

  custom?: Record<string, any>;
}

export interface UpdateBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface UpdateCommentRequest {
  comment?: string;

  custom?: Record<string, any>;
}

export interface UpdateCommentResponse {
  duration: string;

  comment: CommentResponse;
}

export interface UpdateFeedMembersRequest {
  operation: 'add' | 'remove' | 'set';

  limit?: number;

  next?: string;

  prev?: string;

  members?: FeedMemberRequest[];
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

  push_preference?: string;

  custom?: Record<string, any>;
}

export interface UpdateFollowResponse {
  duration: string;

  follow: FollowResponse;
}

export interface UpsertActivitiesRequest {
  activities: ActivityRequest[];
}

export interface UpsertActivitiesResponse {
  duration: string;

  activities: ActivityResponse[];
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
  | ({ type: 'comment.deleted' } & CommentDeletedEvent)
  | ({ type: 'comment.reaction.added' } & CommentReactionAddedEvent)
  | ({ type: 'comment.reaction.removed' } & CommentReactionRemovedEvent)
  | ({ type: 'comment.updated' } & CommentUpdatedEvent)
  | ({ type: 'feed.created' } & FeedCreatedEvent)
  | ({ type: 'feed.deleted' } & FeedDeletedEvent)
  | ({ type: 'feed.updated' } & FeedUpdatedEvent)
  | ({ type: 'feed_group.changed' } & FeedGroupChangedEvent)
  | ({ type: 'feed_group.deleted' } & FeedGroupDeletedEvent)
  | ({ type: 'follow.created' } & FollowCreatedEvent)
  | ({ type: 'follow.deleted' } & FollowDeletedEvent)
  | ({ type: 'follow.updated' } & FollowUpdatedEvent);
