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

  parent?: BaseActivityResponse;

  poll?: PollResponseData;
}

export interface ActivitySelectorConfig {
  cutoff_time?: Date;

  min_popularity?: number;

  tag_filter_type?: string;

  type?: string;

  tags?: string[];
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

  poll?: PollResponseData;
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

export interface BookmarkFolderResponse {
  created_at: Date;

  id: string;

  name: string;

  updated_at: Date;

  custom?: Record<string, any>;
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

export interface CastPollVoteRequest {
  user_id?: string;

  user?: UserRequest;

  vote?: VoteData;
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

export interface CreateFeedsBatchRequest {
  feeds: FeedRequest[];
}

export interface CreateFeedsBatchResponse {
  duration: string;

  feeds: FeedResponse[];
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

export interface DeleteActivityResponse {
  duration: string;
}

export interface DeleteBookmarkResponse {
  duration: string;

  bookmark: BookmarkResponse;
}

export interface DeleteCommentReactionResponse {
  duration: string;

  comment: CommentResponse;

  reaction: FeedsReactionResponse;
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

  reactions: FeedsReactionResponse[];
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
  description?: string;

  name?: string;

  visibility?: 'public' | 'visible' | 'followers' | 'members' | 'private';

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

export interface ModerationV2Response {
  action: string;

  original_text: string;

  blocklist_matched?: string;

  platform_circumvented?: boolean;

  semantic_filter_matched?: string;

  image_harms?: string[];

  text_harms?: string[];
}

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
  created_at: Date;

  duration: string;

  fid: string;

  user_id: string;

  activity: ActivityResponse;
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

export interface PrivacySettingsResponse {
  read_receipts?: ReadReceiptsResponse;

  typing_indicators?: TypingIndicatorsResponse;
}

export interface PushNotificationSettingsResponse {
  disabled?: boolean;

  disabled_until?: Date;
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

  push_preference?: 'all' | 'none';

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

  mentioned_users: UserResponse[];

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
  duration: string;

  fid: string;

  user_id: string;

  activity: ActivityResponse;
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

export interface UpdateCommentRequest {
  comment?: string;

  custom?: Record<string, any>;
}

export interface UpdateCommentResponse {
  duration: string;

  comment: CommentResponse;
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

  push_preference?: 'all' | 'none';

  custom?: Record<string, any>;
}

export interface UpdateFollowResponse {
  duration: string;

  follow: FollowResponse;
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

export interface VoteData {
  answer_text?: string;

  option_id?: string;

  option?: PollOptionResponseData;
}

export type WebhookEvent =
  | ({ type: 'feeds.activity.added' } & ActivityAddedEvent)
  | ({ type: 'feeds.activity.deleted' } & ActivityDeletedEvent)
  | ({ type: 'feeds.activity.marked' } & ActivityMarkEvent)
  | ({ type: 'feeds.activity.pinned' } & ActivityPinnedEvent)
  | ({ type: 'feeds.activity.reaction.added' } & ActivityReactionAddedEvent)
  | ({ type: 'feeds.activity.reaction.deleted' } & ActivityReactionDeletedEvent)
  | ({
      type: 'feeds.activity.removed_from_feed';
    } & ActivityRemovedFromFeedEvent)
  | ({ type: 'feeds.activity.unpinned' } & ActivityUnpinnedEvent)
  | ({ type: 'feeds.activity.updated' } & ActivityUpdatedEvent)
  | ({ type: 'feeds.bookmark.added' } & BookmarkAddedEvent)
  | ({ type: 'feeds.bookmark.deleted' } & BookmarkDeletedEvent)
  | ({ type: 'feeds.bookmark.updated' } & BookmarkUpdatedEvent)
  | ({ type: 'feeds.comment.added' } & CommentAddedEvent)
  | ({ type: 'feeds.comment.deleted' } & CommentDeletedEvent)
  | ({ type: 'feeds.comment.reaction.added' } & CommentReactionAddedEvent)
  | ({ type: 'feeds.comment.reaction.deleted' } & CommentReactionDeletedEvent)
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
  | ({ type: 'feeds.follow.updated' } & FollowUpdatedEvent);
