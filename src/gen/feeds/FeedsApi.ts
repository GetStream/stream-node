import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  AcceptFeedMemberInviteRequest,
  AcceptFeedMemberInviteResponse,
  AcceptFollowRequest,
  AcceptFollowResponse,
  ActivityFeedbackRequest,
  ActivityFeedbackResponse,
  AddActivityRequest,
  AddActivityResponse,
  AddBookmarkRequest,
  AddBookmarkResponse,
  AddCommentBookmarkRequest,
  AddCommentBookmarkResponse,
  AddCommentReactionRequest,
  AddCommentReactionResponse,
  AddCommentRequest,
  AddCommentResponse,
  AddCommentsBatchRequest,
  AddCommentsBatchResponse,
  AddReactionRequest,
  AddReactionResponse,
  BatchQueryActivityReactionsRequest,
  BatchQueryActivityReactionsResponse,
  BatchQueryCommentReactionsRequest,
  BatchQueryCommentReactionsResponse,
  CastPollVoteRequest,
  ChangeFeedVisibilityRequest,
  ChangeFeedVisibilityResponse,
  CreateCollectionsRequest,
  CreateCollectionsResponse,
  CreateFeedGroupRequest,
  CreateFeedGroupResponse,
  CreateFeedViewRequest,
  CreateFeedViewResponse,
  CreateFeedsBatchRequest,
  CreateFeedsBatchResponse,
  CreateMembershipLevelRequest,
  CreateMembershipLevelResponse,
  DeleteActivitiesRequest,
  DeleteActivitiesResponse,
  DeleteActivityReactionResponse,
  DeleteActivityResponse,
  DeleteBookmarkFolderResponse,
  DeleteBookmarkResponse,
  DeleteCollectionsResponse,
  DeleteCommentBookmarkResponse,
  DeleteCommentReactionResponse,
  DeleteCommentResponse,
  DeleteFeedGroupResponse,
  DeleteFeedResponse,
  DeleteFeedUserDataRequest,
  DeleteFeedUserDataResponse,
  DeleteFeedViewResponse,
  DeleteFeedsBatchRequest,
  DeleteFeedsBatchResponse,
  DeleteFeedsRetentionPolicyRequest,
  DeleteFeedsRetentionPolicyResponse,
  DeleteUserInterestsResponse,
  ExportFeedUserDataResponse,
  FollowBatchRequest,
  FollowBatchResponse,
  FollowRequest,
  GetActivityResponse,
  GetCommentRepliesResponse,
  GetCommentResponse,
  GetCommentsResponse,
  GetFeedCountsResponse,
  GetFeedGroupResponse,
  GetFeedViewResponse,
  GetFeedVisibilityResponse,
  GetFeedsRateLimitsResponse,
  GetFeedsRetentionPolicyResponse,
  GetFeedsRetentionPolicyRunsRequest,
  GetFeedsRetentionPolicyRunsResponse,
  GetFollowSuggestionsResponse,
  GetOrCreateFeedGroupRequest,
  GetOrCreateFeedGroupResponse,
  GetOrCreateFeedRequest,
  GetOrCreateFeedResponse,
  GetOrCreateFeedViewRequest,
  GetOrCreateFeedViewResponse,
  GetOrCreateFollowResponse,
  GetOrCreateUnfollowRequest,
  GetOrCreateUnfollowResponse,
  GetUserInterestsResponse,
  ListFeedGroupsResponse,
  ListFeedViewsResponse,
  ListFeedVisibilitiesResponse,
  MarkActivityRequest,
  OwnBatchRequest,
  OwnBatchResponse,
  PinActivityRequest,
  PinActivityResponse,
  PollVoteResponse,
  QueryActivitiesRequest,
  QueryActivitiesResponse,
  QueryActivityReactionsRequest,
  QueryActivityReactionsResponse,
  QueryActivitySharesResponse,
  QueryBookmarkFoldersRequest,
  QueryBookmarkFoldersResponse,
  QueryBookmarksRequest,
  QueryBookmarksResponse,
  QueryCollectionsRequest,
  QueryCollectionsResponse,
  QueryCommentReactionsRequest,
  QueryCommentReactionsResponse,
  QueryCommentsRequest,
  QueryCommentsResponse,
  QueryFeedMembersRequest,
  QueryFeedMembersResponse,
  QueryFeedsRequest,
  QueryFeedsResponse,
  QueryFeedsUsageStatsRequest,
  QueryFeedsUsageStatsResponse,
  QueryFollowsRequest,
  QueryFollowsResponse,
  QueryMembershipLevelsRequest,
  QueryMembershipLevelsResponse,
  QueryPinnedActivitiesRequest,
  QueryPinnedActivitiesResponse,
  QueryRevisionHistoryRequest,
  QueryRevisionHistoryResponse,
  ReadCollectionsResponse,
  RejectFeedMemberInviteRequest,
  RejectFeedMemberInviteResponse,
  RejectFollowRequest,
  RejectFollowResponse,
  Response,
  RestoreActivityRequest,
  RestoreActivityResponse,
  RestoreCommentRequest,
  RestoreCommentResponse,
  RestoreFeedGroupResponse,
  SetFeedsRetentionPolicyRequest,
  SetFeedsRetentionPolicyResponse,
  SingleFollowResponse,
  TrackActivityMetricsRequest,
  TrackActivityMetricsResponse,
  TranslateActivityRequest,
  TranslateActivityResponse,
  TranslateCommentRequest,
  TranslateCommentResponse,
  UnfollowBatchRequest,
  UnfollowBatchResponse,
  UnfollowResponse,
  UnpinActivityResponse,
  UpdateActivitiesPartialBatchRequest,
  UpdateActivitiesPartialBatchResponse,
  UpdateActivityPartialRequest,
  UpdateActivityPartialResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
  UpdateBookmarkFolderRequest,
  UpdateBookmarkFolderResponse,
  UpdateBookmarkRequest,
  UpdateBookmarkResponse,
  UpdateCollectionsRequest,
  UpdateCollectionsResponse,
  UpdateCommentBookmarkRequest,
  UpdateCommentBookmarkResponse,
  UpdateCommentPartialRequest,
  UpdateCommentPartialResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  UpdateFeedGroupRequest,
  UpdateFeedGroupResponse,
  UpdateFeedMembersRequest,
  UpdateFeedMembersResponse,
  UpdateFeedRequest,
  UpdateFeedResponse,
  UpdateFeedViewRequest,
  UpdateFeedViewResponse,
  UpdateFeedVisibilityRequest,
  UpdateFeedVisibilityResponse,
  UpdateFollowRequest,
  UpdateFollowResponse,
  UpdateMembershipLevelRequest,
  UpdateMembershipLevelResponse,
  UpsertActivitiesRequest,
  UpsertActivitiesResponse,
  UpsertCollectionsRequest,
  UpsertCollectionsResponse,
  UpsertUserInterestsRequest,
  UpsertUserInterestsResponse,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class FeedsApi {
  constructor(public readonly apiClient: ApiClient) {}

  async addActivity(
    request: AddActivityRequest,
  ): Promise<StreamResponse<AddActivityResponse>> {
    const body = {
      type: request?.type,
      feeds: request?.feeds,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      create_notification_activity: request?.create_notification_activity,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
      expires_at: request?.expires_at,
      force_moderation: request?.force_moderation,
      id: request?.id,
      parent_id: request?.parent_id,
      poll_id: request?.poll_id,
      restrict_replies: request?.restrict_replies,
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      text: request?.text,
      user_id: request?.user_id,
      visibility: request?.visibility,
      visibility_tag: request?.visibility_tag,
      attachments: request?.attachments,
      collection_refs: request?.collection_refs,
      collections: request?.collections,
      filter_tags: request?.filter_tags,
      interest_tags: request?.interest_tags,
      mentioned_user_ids: request?.mentioned_user_ids,
      custom: request?.custom,
      location: request?.location,
      search_data: request?.search_data,
    };

    const response = await this.apiClient.sendRequest<AddActivityResponse>(
      'POST',
      '/api/v2/feeds/activities',
      undefined,
      undefined,
      body,
    );

    decoders['AddActivityResponse']?.(response);

    return response;
  }

  async upsertActivities(
    request: UpsertActivitiesRequest,
  ): Promise<StreamResponse<UpsertActivitiesResponse>> {
    const body = {
      activities: request?.activities,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
      force_moderation: request?.force_moderation,
    };

    const response = await this.apiClient.sendRequest<UpsertActivitiesResponse>(
      'POST',
      '/api/v2/feeds/activities/batch',
      undefined,
      undefined,
      body,
    );

    decoders['UpsertActivitiesResponse']?.(response);

    return response;
  }

  async updateActivitiesPartialBatch(
    request: UpdateActivitiesPartialBatchRequest,
  ): Promise<StreamResponse<UpdateActivitiesPartialBatchResponse>> {
    const body = {
      changes: request?.changes,
      force_moderation: request?.force_moderation,
    };

    const response =
      await this.apiClient.sendRequest<UpdateActivitiesPartialBatchResponse>(
        'PATCH',
        '/api/v2/feeds/activities/batch/partial',
        undefined,
        undefined,
        body,
      );

    decoders['UpdateActivitiesPartialBatchResponse']?.(response);

    return response;
  }

  async deleteActivities(
    request: DeleteActivitiesRequest,
  ): Promise<StreamResponse<DeleteActivitiesResponse>> {
    const body = {
      ids: request?.ids,
      delete_notification_activity: request?.delete_notification_activity,
      hard_delete: request?.hard_delete,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<DeleteActivitiesResponse>(
      'POST',
      '/api/v2/feeds/activities/delete',
      undefined,
      undefined,
      body,
    );

    decoders['DeleteActivitiesResponse']?.(response);

    return response;
  }

  async trackActivityMetrics(
    request: TrackActivityMetricsRequest,
  ): Promise<StreamResponse<TrackActivityMetricsResponse>> {
    const body = {
      events: request?.events,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<TrackActivityMetricsResponse>(
        'POST',
        '/api/v2/feeds/activities/metrics/track',
        undefined,
        undefined,
        body,
      );

    decoders['TrackActivityMetricsResponse']?.(response);

    return response;
  }

  async queryActivities(
    request?: QueryActivitiesRequest & {
      language?: string;
      translate_text?: boolean;
    },
  ): Promise<StreamResponse<QueryActivitiesResponse>> {
    const queryParams = {
      language: request?.language,
      translate_text: request?.translate_text,
    };
    const body = {
      enrich_own_fields: request?.enrich_own_fields,
      include_expired_activities: request?.include_expired_activities,
      include_moderated_activities: request?.include_moderated_activities,
      include_private_activities: request?.include_private_activities,
      include_soft_deleted_activities: request?.include_soft_deleted_activities,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryActivitiesResponse>(
      'POST',
      '/api/v2/feeds/activities/query',
      undefined,
      queryParams,
      body,
    );

    decoders['QueryActivitiesResponse']?.(response);

    return response;
  }

  async batchQueryActivityReactions(
    request: BatchQueryActivityReactionsRequest,
  ): Promise<StreamResponse<BatchQueryActivityReactionsResponse>> {
    const body = {
      activity_ids: request?.activity_ids,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<BatchQueryActivityReactionsResponse>(
        'POST',
        '/api/v2/feeds/activities/reactions/query',
        undefined,
        undefined,
        body,
      );

    decoders['BatchQueryActivityReactionsResponse']?.(response);

    return response;
  }

  async deleteBookmark(request: {
    activity_id: string;
    folder_id?: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteBookmarkResponse>> {
    const queryParams = {
      folder_id: request?.folder_id,
      user_id: request?.user_id,
    };
    const pathParams = {
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<DeleteBookmarkResponse>(
      'DELETE',
      '/api/v2/feeds/activities/{activity_id}/bookmarks',
      pathParams,
      queryParams,
    );

    decoders['DeleteBookmarkResponse']?.(response);

    return response;
  }

  async updateBookmark(
    request: UpdateBookmarkRequest & { activity_id: string },
  ): Promise<StreamResponse<UpdateBookmarkResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      folder_id: request?.folder_id,
      new_folder_id: request?.new_folder_id,
      user_id: request?.user_id,
      custom: request?.custom,
      new_folder: request?.new_folder,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UpdateBookmarkResponse>(
      'PATCH',
      '/api/v2/feeds/activities/{activity_id}/bookmarks',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateBookmarkResponse']?.(response);

    return response;
  }

  async addBookmark(
    request: AddBookmarkRequest & { activity_id: string },
  ): Promise<StreamResponse<AddBookmarkResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      folder_id: request?.folder_id,
      user_id: request?.user_id,
      custom: request?.custom,
      new_folder: request?.new_folder,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<AddBookmarkResponse>(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/bookmarks',
      pathParams,
      undefined,
      body,
    );

    decoders['AddBookmarkResponse']?.(response);

    return response;
  }

  async activityFeedback(
    request: ActivityFeedbackRequest & { activity_id: string },
  ): Promise<StreamResponse<ActivityFeedbackResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      hide: request?.hide,
      show_less: request?.show_less,
      show_more: request?.show_more,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<ActivityFeedbackResponse>(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/feedback',
      pathParams,
      undefined,
      body,
    );

    decoders['ActivityFeedbackResponse']?.(response);

    return response;
  }

  async castPollVote(
    request: CastPollVoteRequest & { activity_id: string; poll_id: string },
  ): Promise<StreamResponse<PollVoteResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
      poll_id: request?.poll_id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
      vote: request?.vote,
    };

    const response = await this.apiClient.sendRequest<PollVoteResponse>(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/polls/{poll_id}/vote',
      pathParams,
      undefined,
      body,
    );

    decoders['PollVoteResponse']?.(response);

    return response;
  }

  async deletePollVote(request: {
    activity_id: string;
    poll_id: string;
    vote_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollVoteResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      activity_id: request?.activity_id,
      poll_id: request?.poll_id,
      vote_id: request?.vote_id,
    };

    const response = await this.apiClient.sendRequest<PollVoteResponse>(
      'DELETE',
      '/api/v2/feeds/activities/{activity_id}/polls/{poll_id}/vote/{vote_id}',
      pathParams,
      queryParams,
    );

    decoders['PollVoteResponse']?.(response);

    return response;
  }

  async addActivityReaction(
    request: AddReactionRequest & { activity_id: string },
  ): Promise<StreamResponse<AddReactionResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      type: request?.type,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      create_notification_activity: request?.create_notification_activity,
      create_users: request?.create_users,
      enforce_unique: request?.enforce_unique,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      target_feeds: request?.target_feeds,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<AddReactionResponse>(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/reactions',
      pathParams,
      undefined,
      body,
    );

    decoders['AddReactionResponse']?.(response);

    return response;
  }

  async queryActivityReactions(
    request: QueryActivityReactionsRequest & { activity_id: string },
  ): Promise<StreamResponse<QueryActivityReactionsResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response =
      await this.apiClient.sendRequest<QueryActivityReactionsResponse>(
        'POST',
        '/api/v2/feeds/activities/{activity_id}/reactions/query',
        pathParams,
        undefined,
        body,
      );

    decoders['QueryActivityReactionsResponse']?.(response);

    return response;
  }

  async deleteActivityReaction(request: {
    activity_id: string;
    type: string;
    delete_notification_activity?: boolean;
    user_id?: string;
  }): Promise<StreamResponse<DeleteActivityReactionResponse>> {
    const queryParams = {
      delete_notification_activity: request?.delete_notification_activity,
      user_id: request?.user_id,
    };
    const pathParams = {
      activity_id: request?.activity_id,
      type: request?.type,
    };

    const response =
      await this.apiClient.sendRequest<DeleteActivityReactionResponse>(
        'DELETE',
        '/api/v2/feeds/activities/{activity_id}/reactions/{type}',
        pathParams,
        queryParams,
      );

    decoders['DeleteActivityReactionResponse']?.(response);

    return response;
  }

  async queryActivityShares(request: {
    activity_id: string;
    limit?: number;
    prev?: string;
    next?: string;
  }): Promise<StreamResponse<QueryActivitySharesResponse>> {
    const queryParams = {
      limit: request?.limit,
      prev: request?.prev,
      next: request?.next,
    };
    const pathParams = {
      activity_id: request?.activity_id,
    };

    const response =
      await this.apiClient.sendRequest<QueryActivitySharesResponse>(
        'GET',
        '/api/v2/feeds/activities/{activity_id}/shares',
        pathParams,
        queryParams,
      );

    decoders['QueryActivitySharesResponse']?.(response);

    return response;
  }

  async deleteActivity(request: {
    id: string;
    hard_delete?: boolean;
    delete_notification_activity?: boolean;
  }): Promise<StreamResponse<DeleteActivityResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
      delete_notification_activity: request?.delete_notification_activity,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteActivityResponse>(
      'DELETE',
      '/api/v2/feeds/activities/{id}',
      pathParams,
      queryParams,
    );

    decoders['DeleteActivityResponse']?.(response);

    return response;
  }

  async getActivity(request: {
    id: string;
    comment_sort?: string;
    comment_limit?: number;
    skip_own_followings?: boolean;
    user_id?: string;
    language?: string;
    translate_text?: boolean;
    include_top_level_comment_count?: boolean;
    include_soft_deleted_activities?: boolean;
    include_moderated_activities?: boolean;
  }): Promise<StreamResponse<GetActivityResponse>> {
    const queryParams = {
      comment_sort: request?.comment_sort,
      comment_limit: request?.comment_limit,
      skip_own_followings: request?.skip_own_followings,
      user_id: request?.user_id,
      language: request?.language,
      translate_text: request?.translate_text,
      include_top_level_comment_count: request?.include_top_level_comment_count,
      include_soft_deleted_activities: request?.include_soft_deleted_activities,
      include_moderated_activities: request?.include_moderated_activities,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetActivityResponse>(
      'GET',
      '/api/v2/feeds/activities/{id}',
      pathParams,
      queryParams,
    );

    decoders['GetActivityResponse']?.(response);

    return response;
  }

  async updateActivityPartial(
    request: UpdateActivityPartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateActivityPartialResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      copy_custom_to_notification: request?.copy_custom_to_notification,
      enrich_own_fields: request?.enrich_own_fields,
      force_moderation: request?.force_moderation,
      handle_mention_notifications: request?.handle_mention_notifications,
      run_activity_processors: request?.run_activity_processors,
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateActivityPartialResponse>(
        'PATCH',
        '/api/v2/feeds/activities/{id}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateActivityPartialResponse']?.(response);

    return response;
  }

  async updateActivity(
    request: UpdateActivityRequest & { id: string },
  ): Promise<StreamResponse<UpdateActivityResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      copy_custom_to_notification: request?.copy_custom_to_notification,
      enrich_own_fields: request?.enrich_own_fields,
      expires_at: request?.expires_at,
      force_moderation: request?.force_moderation,
      handle_mention_notifications: request?.handle_mention_notifications,
      poll_id: request?.poll_id,
      restrict_replies: request?.restrict_replies,
      run_activity_processors: request?.run_activity_processors,
      skip_enrich_url: request?.skip_enrich_url,
      text: request?.text,
      user_id: request?.user_id,
      visibility: request?.visibility,
      visibility_tag: request?.visibility_tag,
      attachments: request?.attachments,
      collection_refs: request?.collection_refs,
      feeds: request?.feeds,
      filter_tags: request?.filter_tags,
      interest_tags: request?.interest_tags,
      mentioned_user_ids: request?.mentioned_user_ids,
      custom: request?.custom,
      location: request?.location,
      search_data: request?.search_data,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UpdateActivityResponse>(
      'PUT',
      '/api/v2/feeds/activities/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateActivityResponse']?.(response);

    return response;
  }

  async restoreActivity(
    request: RestoreActivityRequest & {
      id: string;
      enrich_own_fields?: boolean;
    },
  ): Promise<StreamResponse<RestoreActivityResponse>> {
    const queryParams = {
      enrich_own_fields: request?.enrich_own_fields,
    };
    const pathParams = {
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<RestoreActivityResponse>(
      'POST',
      '/api/v2/feeds/activities/{id}/restore',
      pathParams,
      queryParams,
      body,
    );

    decoders['RestoreActivityResponse']?.(response);

    return response;
  }

  async translateActivity(
    request: TranslateActivityRequest & { id: string },
  ): Promise<StreamResponse<TranslateActivityResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      language: request?.language,
    };

    const response =
      await this.apiClient.sendRequest<TranslateActivityResponse>(
        'POST',
        '/api/v2/feeds/activities/{id}/translate',
        pathParams,
        undefined,
        body,
      );

    decoders['TranslateActivityResponse']?.(response);

    return response;
  }

  async queryBookmarkFolders(
    request?: QueryBookmarkFoldersRequest,
  ): Promise<StreamResponse<QueryBookmarkFoldersResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response =
      await this.apiClient.sendRequest<QueryBookmarkFoldersResponse>(
        'POST',
        '/api/v2/feeds/bookmark_folders/query',
        undefined,
        undefined,
        body,
      );

    decoders['QueryBookmarkFoldersResponse']?.(response);

    return response;
  }

  async deleteBookmarkFolder(request: {
    folder_id: string;
  }): Promise<StreamResponse<DeleteBookmarkFolderResponse>> {
    const pathParams = {
      folder_id: request?.folder_id,
    };

    const response =
      await this.apiClient.sendRequest<DeleteBookmarkFolderResponse>(
        'DELETE',
        '/api/v2/feeds/bookmark_folders/{folder_id}',
        pathParams,
        undefined,
      );

    decoders['DeleteBookmarkFolderResponse']?.(response);

    return response;
  }

  async updateBookmarkFolder(
    request: UpdateBookmarkFolderRequest & { folder_id: string },
  ): Promise<StreamResponse<UpdateBookmarkFolderResponse>> {
    const pathParams = {
      folder_id: request?.folder_id,
    };
    const body = {
      name: request?.name,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateBookmarkFolderResponse>(
        'PATCH',
        '/api/v2/feeds/bookmark_folders/{folder_id}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateBookmarkFolderResponse']?.(response);

    return response;
  }

  async queryBookmarks(
    request?: QueryBookmarksRequest & {
      language?: string;
      translate_text?: boolean;
    },
  ): Promise<StreamResponse<QueryBookmarksResponse>> {
    const queryParams = {
      language: request?.language,
      translate_text: request?.translate_text,
    };
    const body = {
      enrich_own_fields: request?.enrich_own_fields,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryBookmarksResponse>(
      'POST',
      '/api/v2/feeds/bookmarks/query',
      undefined,
      queryParams,
      body,
    );

    decoders['QueryBookmarksResponse']?.(response);

    return response;
  }

  async deleteCollections(request: {
    collection_refs: Array<string>;
  }): Promise<StreamResponse<DeleteCollectionsResponse>> {
    const queryParams = {
      collection_refs: request?.collection_refs,
    };

    const response =
      await this.apiClient.sendRequest<DeleteCollectionsResponse>(
        'DELETE',
        '/api/v2/feeds/collections',
        undefined,
        queryParams,
      );

    decoders['DeleteCollectionsResponse']?.(response);

    return response;
  }

  async readCollections(request?: {
    user_id?: string;
    collection_refs?: Array<string>;
  }): Promise<StreamResponse<ReadCollectionsResponse>> {
    const queryParams = {
      user_id: request?.user_id,
      collection_refs: request?.collection_refs,
    };

    const response = await this.apiClient.sendRequest<ReadCollectionsResponse>(
      'GET',
      '/api/v2/feeds/collections',
      undefined,
      queryParams,
    );

    decoders['ReadCollectionsResponse']?.(response);

    return response;
  }

  async updateCollections(
    request: UpdateCollectionsRequest,
  ): Promise<StreamResponse<UpdateCollectionsResponse>> {
    const body = {
      collections: request?.collections,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateCollectionsResponse>(
        'PATCH',
        '/api/v2/feeds/collections',
        undefined,
        undefined,
        body,
      );

    decoders['UpdateCollectionsResponse']?.(response);

    return response;
  }

  async createCollections(
    request: CreateCollectionsRequest,
  ): Promise<StreamResponse<CreateCollectionsResponse>> {
    const body = {
      collections: request?.collections,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<CreateCollectionsResponse>(
        'POST',
        '/api/v2/feeds/collections',
        undefined,
        undefined,
        body,
      );

    decoders['CreateCollectionsResponse']?.(response);

    return response;
  }

  async upsertCollections(
    request: UpsertCollectionsRequest,
  ): Promise<StreamResponse<UpsertCollectionsResponse>> {
    const body = {
      collections: request?.collections,
    };

    const response =
      await this.apiClient.sendRequest<UpsertCollectionsResponse>(
        'PUT',
        '/api/v2/feeds/collections',
        undefined,
        undefined,
        body,
      );

    decoders['UpsertCollectionsResponse']?.(response);

    return response;
  }

  async queryCollections(
    request?: QueryCollectionsRequest,
  ): Promise<StreamResponse<QueryCollectionsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryCollectionsResponse>(
      'POST',
      '/api/v2/feeds/collections/query',
      undefined,
      undefined,
      body,
    );

    decoders['QueryCollectionsResponse']?.(response);

    return response;
  }

  async getComments(request: {
    object_id: string;
    object_type: string;
    depth?: number;
    sort?: string;
    replies_limit?: number;
    id_around?: string;
    language?: string;
    translate_text?: boolean;
    user_id?: string;
    limit?: number;
    prev?: string;
    next?: string;
    include_top_level_comment_count?: boolean;
  }): Promise<StreamResponse<GetCommentsResponse>> {
    const queryParams = {
      object_id: request?.object_id,
      object_type: request?.object_type,
      depth: request?.depth,
      sort: request?.sort,
      replies_limit: request?.replies_limit,
      id_around: request?.id_around,
      language: request?.language,
      translate_text: request?.translate_text,
      user_id: request?.user_id,
      limit: request?.limit,
      prev: request?.prev,
      next: request?.next,
      include_top_level_comment_count: request?.include_top_level_comment_count,
    };

    const response = await this.apiClient.sendRequest<GetCommentsResponse>(
      'GET',
      '/api/v2/feeds/comments',
      undefined,
      queryParams,
    );

    decoders['GetCommentsResponse']?.(response);

    return response;
  }

  async addComment(
    request?: AddCommentRequest,
  ): Promise<StreamResponse<AddCommentResponse>> {
    const body = {
      comment: request?.comment,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      create_notification_activity: request?.create_notification_activity,
      force_moderation: request?.force_moderation,
      id: request?.id,
      object_id: request?.object_id,
      object_type: request?.object_type,
      parent_id: request?.parent_id,
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      attachments: request?.attachments,
      mentioned_user_ids: request?.mentioned_user_ids,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<AddCommentResponse>(
      'POST',
      '/api/v2/feeds/comments',
      undefined,
      undefined,
      body,
    );

    decoders['AddCommentResponse']?.(response);

    return response;
  }

  async addCommentsBatch(
    request: AddCommentsBatchRequest,
  ): Promise<StreamResponse<AddCommentsBatchResponse>> {
    const body = {
      comments: request?.comments,
    };

    const response = await this.apiClient.sendRequest<AddCommentsBatchResponse>(
      'POST',
      '/api/v2/feeds/comments/batch',
      undefined,
      undefined,
      body,
    );

    decoders['AddCommentsBatchResponse']?.(response);

    return response;
  }

  async queryComments(
    request: QueryCommentsRequest & {
      language?: string;
      translate_text?: boolean;
    },
  ): Promise<StreamResponse<QueryCommentsResponse>> {
    const queryParams = {
      language: request?.language,
      translate_text: request?.translate_text,
    };
    const body = {
      filter: request?.filter,
      id_around: request?.id_around,
      include_soft_deleted_comments: request?.include_soft_deleted_comments,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryCommentsResponse>(
      'POST',
      '/api/v2/feeds/comments/query',
      undefined,
      queryParams,
      body,
    );

    decoders['QueryCommentsResponse']?.(response);

    return response;
  }

  async batchQueryCommentReactions(
    request: BatchQueryCommentReactionsRequest,
  ): Promise<StreamResponse<BatchQueryCommentReactionsResponse>> {
    const body = {
      comment_ids: request?.comment_ids,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<BatchQueryCommentReactionsResponse>(
        'POST',
        '/api/v2/feeds/comments/reactions/query',
        undefined,
        undefined,
        body,
      );

    decoders['BatchQueryCommentReactionsResponse']?.(response);

    return response;
  }

  async deleteCommentBookmark(request: {
    comment_id: string;
    folder_id?: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteCommentBookmarkResponse>> {
    const queryParams = {
      folder_id: request?.folder_id,
      user_id: request?.user_id,
    };
    const pathParams = {
      comment_id: request?.comment_id,
    };

    const response =
      await this.apiClient.sendRequest<DeleteCommentBookmarkResponse>(
        'DELETE',
        '/api/v2/feeds/comments/{comment_id}/bookmarks',
        pathParams,
        queryParams,
      );

    decoders['DeleteCommentBookmarkResponse']?.(response);

    return response;
  }

  async updateCommentBookmark(
    request: UpdateCommentBookmarkRequest & { comment_id: string },
  ): Promise<StreamResponse<UpdateCommentBookmarkResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
    };
    const body = {
      folder_id: request?.folder_id,
      new_folder_id: request?.new_folder_id,
      user_id: request?.user_id,
      custom: request?.custom,
      new_folder: request?.new_folder,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateCommentBookmarkResponse>(
        'PATCH',
        '/api/v2/feeds/comments/{comment_id}/bookmarks',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateCommentBookmarkResponse']?.(response);

    return response;
  }

  async addCommentBookmark(
    request: AddCommentBookmarkRequest & { comment_id: string },
  ): Promise<StreamResponse<AddCommentBookmarkResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
    };
    const body = {
      folder_id: request?.folder_id,
      user_id: request?.user_id,
      custom: request?.custom,
      new_folder: request?.new_folder,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<AddCommentBookmarkResponse>(
        'POST',
        '/api/v2/feeds/comments/{comment_id}/bookmarks',
        pathParams,
        undefined,
        body,
      );

    decoders['AddCommentBookmarkResponse']?.(response);

    return response;
  }

  async deleteComment(request: {
    id: string;
    hard_delete?: boolean;
    delete_notification_activity?: boolean;
  }): Promise<StreamResponse<DeleteCommentResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
      delete_notification_activity: request?.delete_notification_activity,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteCommentResponse>(
      'DELETE',
      '/api/v2/feeds/comments/{id}',
      pathParams,
      queryParams,
    );

    decoders['DeleteCommentResponse']?.(response);

    return response;
  }

  async getComment(request: {
    id: string;
    user_id?: string;
    language?: string;
    translate_text?: boolean;
  }): Promise<StreamResponse<GetCommentResponse>> {
    const queryParams = {
      user_id: request?.user_id,
      language: request?.language,
      translate_text: request?.translate_text,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetCommentResponse>(
      'GET',
      '/api/v2/feeds/comments/{id}',
      pathParams,
      queryParams,
    );

    decoders['GetCommentResponse']?.(response);

    return response;
  }

  async updateComment(
    request: UpdateCommentRequest & { id: string },
  ): Promise<StreamResponse<UpdateCommentResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      comment: request?.comment,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      force_moderation: request?.force_moderation,
      handle_mention_notifications: request?.handle_mention_notifications,
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      attachments: request?.attachments,
      mentioned_user_ids: request?.mentioned_user_ids,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UpdateCommentResponse>(
      'PATCH',
      '/api/v2/feeds/comments/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateCommentResponse']?.(response);

    return response;
  }

  async updateCommentPartial(
    request: UpdateCommentPartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateCommentPartialResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      copy_custom_to_notification: request?.copy_custom_to_notification,
      force_moderation: request?.force_moderation,
      handle_mention_notifications: request?.handle_mention_notifications,
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateCommentPartialResponse>(
        'POST',
        '/api/v2/feeds/comments/{id}/partial',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateCommentPartialResponse']?.(response);

    return response;
  }

  async addCommentReaction(
    request: AddCommentReactionRequest & { id: string },
  ): Promise<StreamResponse<AddCommentReactionResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      type: request?.type,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      create_notification_activity: request?.create_notification_activity,
      enforce_unique: request?.enforce_unique,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      target_feeds: request?.target_feeds,
      custom: request?.custom,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<AddCommentReactionResponse>(
        'POST',
        '/api/v2/feeds/comments/{id}/reactions',
        pathParams,
        undefined,
        body,
      );

    decoders['AddCommentReactionResponse']?.(response);

    return response;
  }

  async queryCommentReactions(
    request: QueryCommentReactionsRequest & { id: string },
  ): Promise<StreamResponse<QueryCommentReactionsResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response =
      await this.apiClient.sendRequest<QueryCommentReactionsResponse>(
        'POST',
        '/api/v2/feeds/comments/{id}/reactions/query',
        pathParams,
        undefined,
        body,
      );

    decoders['QueryCommentReactionsResponse']?.(response);

    return response;
  }

  async deleteCommentReaction(request: {
    id: string;
    type: string;
    delete_notification_activity?: boolean;
    user_id?: string;
  }): Promise<StreamResponse<DeleteCommentReactionResponse>> {
    const queryParams = {
      delete_notification_activity: request?.delete_notification_activity,
      user_id: request?.user_id,
    };
    const pathParams = {
      id: request?.id,
      type: request?.type,
    };

    const response =
      await this.apiClient.sendRequest<DeleteCommentReactionResponse>(
        'DELETE',
        '/api/v2/feeds/comments/{id}/reactions/{type}',
        pathParams,
        queryParams,
      );

    decoders['DeleteCommentReactionResponse']?.(response);

    return response;
  }

  async getCommentReplies(request: {
    id: string;
    depth?: number;
    sort?: string;
    replies_limit?: number;
    id_around?: string;
    language?: string;
    translate_text?: boolean;
    user_id?: string;
    limit?: number;
    prev?: string;
    next?: string;
  }): Promise<StreamResponse<GetCommentRepliesResponse>> {
    const queryParams = {
      depth: request?.depth,
      sort: request?.sort,
      replies_limit: request?.replies_limit,
      id_around: request?.id_around,
      language: request?.language,
      translate_text: request?.translate_text,
      user_id: request?.user_id,
      limit: request?.limit,
      prev: request?.prev,
      next: request?.next,
    };
    const pathParams = {
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<GetCommentRepliesResponse>(
        'GET',
        '/api/v2/feeds/comments/{id}/replies',
        pathParams,
        queryParams,
      );

    decoders['GetCommentRepliesResponse']?.(response);

    return response;
  }

  async restoreComment(
    request: RestoreCommentRequest & { id: string },
  ): Promise<StreamResponse<RestoreCommentResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<RestoreCommentResponse>(
      'POST',
      '/api/v2/feeds/comments/{id}/restore',
      pathParams,
      undefined,
      body,
    );

    decoders['RestoreCommentResponse']?.(response);

    return response;
  }

  async translateComment(
    request: TranslateCommentRequest & { id: string },
  ): Promise<StreamResponse<TranslateCommentResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      language: request?.language,
    };

    const response = await this.apiClient.sendRequest<TranslateCommentResponse>(
      'POST',
      '/api/v2/feeds/comments/{id}/translate',
      pathParams,
      undefined,
      body,
    );

    decoders['TranslateCommentResponse']?.(response);

    return response;
  }

  async listFeedGroups(request?: {
    include_soft_deleted?: boolean;
  }): Promise<StreamResponse<ListFeedGroupsResponse>> {
    const queryParams = {
      include_soft_deleted: request?.include_soft_deleted,
    };

    const response = await this.apiClient.sendRequest<ListFeedGroupsResponse>(
      'GET',
      '/api/v2/feeds/feed_groups',
      undefined,
      queryParams,
    );

    decoders['ListFeedGroupsResponse']?.(response);

    return response;
  }

  async createFeedGroup(
    request: CreateFeedGroupRequest,
  ): Promise<StreamResponse<CreateFeedGroupResponse>> {
    const body = {
      id: request?.id,
      default_follower_role: request?.default_follower_role,
      default_visibility: request?.default_visibility,
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      activity_filter: request?.activity_filter,
      activity_marks: request?.activity_marks,
      activity_processing: request?.activity_processing,
      aggregation: request?.aggregation,
      custom: request?.custom,
      notification: request?.notification,
      push_notification: request?.push_notification,
      ranking: request?.ranking,
      stories: request?.stories,
    };

    const response = await this.apiClient.sendRequest<CreateFeedGroupResponse>(
      'POST',
      '/api/v2/feeds/feed_groups',
      undefined,
      undefined,
      body,
    );

    decoders['CreateFeedGroupResponse']?.(response);

    return response;
  }

  async deleteFeed(request: {
    feed_group_id: string;
    feed_id: string;
    hard_delete?: boolean;
    purge_user_activities?: boolean;
  }): Promise<StreamResponse<DeleteFeedResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
      purge_user_activities: request?.purge_user_activities,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };

    const response = await this.apiClient.sendRequest<DeleteFeedResponse>(
      'DELETE',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      queryParams,
    );

    decoders['DeleteFeedResponse']?.(response);

    return response;
  }

  async getOrCreateFeed(
    request: GetOrCreateFeedRequest & {
      feed_group_id: string;
      feed_id: string;
      language?: string;
      translate_text?: boolean;
    },
  ): Promise<StreamResponse<GetOrCreateFeedResponse>> {
    const queryParams = {
      language: request?.language,
      translate_text: request?.translate_text,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      id_around: request?.id_around,
      limit: request?.limit,
      next: request?.next,
      overwrite_interest_weights: request?.overwrite_interest_weights,
      prev: request?.prev,
      user_id: request?.user_id,
      view: request?.view,
      watch: request?.watch,
      data: request?.data,
      enrichment_options: request?.enrichment_options,
      external_ranking: request?.external_ranking,
      filter: request?.filter,
      followers_pagination: request?.followers_pagination,
      following_pagination: request?.following_pagination,
      friend_reactions_options: request?.friend_reactions_options,
      interest_weights: request?.interest_weights,
      member_pagination: request?.member_pagination,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<GetOrCreateFeedResponse>(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      queryParams,
      body,
    );

    decoders['GetOrCreateFeedResponse']?.(response);

    return response;
  }

  async updateFeed(
    request: UpdateFeedRequest & { feed_group_id: string; feed_id: string },
  ): Promise<StreamResponse<UpdateFeedResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      clear_location: request?.clear_location,
      created_by_id: request?.created_by_id,
      description: request?.description,
      enrich_own_fields: request?.enrich_own_fields,
      name: request?.name,
      filter_tags: request?.filter_tags,
      custom: request?.custom,
      location: request?.location,
    };

    const response = await this.apiClient.sendRequest<UpdateFeedResponse>(
      'PUT',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateFeedResponse']?.(response);

    return response;
  }

  async markActivity(
    request: MarkActivityRequest & { feed_group_id: string; feed_id: string },
  ): Promise<StreamResponse<Response>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      mark_all_read: request?.mark_all_read,
      mark_all_seen: request?.mark_all_seen,
      user_id: request?.user_id,
      mark_read: request?.mark_read,
      mark_seen: request?.mark_seen,
      mark_watched: request?.mark_watched,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/mark/batch',
      pathParams,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async unpinActivity(request: {
    feed_group_id: string;
    feed_id: string;
    activity_id: string;
    enrich_own_fields?: boolean;
    user_id?: string;
  }): Promise<StreamResponse<UnpinActivityResponse>> {
    const queryParams = {
      enrich_own_fields: request?.enrich_own_fields,
      user_id: request?.user_id,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<UnpinActivityResponse>(
      'DELETE',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/{activity_id}/pin',
      pathParams,
      queryParams,
    );

    decoders['UnpinActivityResponse']?.(response);

    return response;
  }

  async pinActivity(
    request: PinActivityRequest & {
      feed_group_id: string;
      feed_id: string;
      activity_id: string;
    },
  ): Promise<StreamResponse<PinActivityResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
      activity_id: request?.activity_id,
    };
    const body = {
      enrich_own_fields: request?.enrich_own_fields,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<PinActivityResponse>(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/{activity_id}/pin',
      pathParams,
      undefined,
      body,
    );

    decoders['PinActivityResponse']?.(response);

    return response;
  }

  async changeFeedVisibility(
    request: ChangeFeedVisibilityRequest & {
      feed_group_id: string;
      feed_id: string;
    },
  ): Promise<StreamResponse<ChangeFeedVisibilityResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      visibility: request?.visibility,
      pending_follows_action: request?.pending_follows_action,
    };

    const response =
      await this.apiClient.sendRequest<ChangeFeedVisibilityResponse>(
        'POST',
        '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/change_visibility',
        pathParams,
        undefined,
        body,
      );

    decoders['ChangeFeedVisibilityResponse']?.(response);

    return response;
  }

  async getFeedCounts(request: {
    feed_group_id: string;
    feed_id: string;
  }): Promise<StreamResponse<GetFeedCountsResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };

    const response = await this.apiClient.sendRequest<GetFeedCountsResponse>(
      'GET',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/counts',
      pathParams,
      undefined,
    );

    decoders['GetFeedCountsResponse']?.(response);

    return response;
  }

  async updateFeedMembers(
    request: UpdateFeedMembersRequest & {
      feed_group_id: string;
      feed_id: string;
    },
  ): Promise<StreamResponse<UpdateFeedMembersResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      operation: request?.operation,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      members: request?.members,
    };

    const response =
      await this.apiClient.sendRequest<UpdateFeedMembersResponse>(
        'PATCH',
        '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateFeedMembersResponse']?.(response);

    return response;
  }

  async acceptFeedMemberInvite(
    request: AcceptFeedMemberInviteRequest & {
      feed_id: string;
      feed_group_id: string;
    },
  ): Promise<StreamResponse<AcceptFeedMemberInviteResponse>> {
    const pathParams = {
      feed_id: request?.feed_id,
      feed_group_id: request?.feed_group_id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<AcceptFeedMemberInviteResponse>(
        'POST',
        '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members/accept',
        pathParams,
        undefined,
        body,
      );

    decoders['AcceptFeedMemberInviteResponse']?.(response);

    return response;
  }

  async queryFeedMembers(
    request: QueryFeedMembersRequest & {
      feed_group_id: string;
      feed_id: string;
    },
  ): Promise<StreamResponse<QueryFeedMembersResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<QueryFeedMembersResponse>(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members/query',
      pathParams,
      undefined,
      body,
    );

    decoders['QueryFeedMembersResponse']?.(response);

    return response;
  }

  async rejectFeedMemberInvite(
    request: RejectFeedMemberInviteRequest & {
      feed_group_id: string;
      feed_id: string;
    },
  ): Promise<StreamResponse<RejectFeedMemberInviteResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<RejectFeedMemberInviteResponse>(
        'POST',
        '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members/reject',
        pathParams,
        undefined,
        body,
      );

    decoders['RejectFeedMemberInviteResponse']?.(response);

    return response;
  }

  async queryPinnedActivities(
    request: QueryPinnedActivitiesRequest & {
      feed_group_id: string;
      feed_id: string;
      language?: string;
      translate_text?: boolean;
    },
  ): Promise<StreamResponse<QueryPinnedActivitiesResponse>> {
    const queryParams = {
      language: request?.language,
      translate_text: request?.translate_text,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      enrich_own_fields: request?.enrich_own_fields,
      include_expired_activities: request?.include_expired_activities,
      include_moderated_activities: request?.include_moderated_activities,
      include_soft_deleted_activities: request?.include_soft_deleted_activities,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<QueryPinnedActivitiesResponse>(
        'POST',
        '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/pinned_activities/query',
        pathParams,
        queryParams,
        body,
      );

    decoders['QueryPinnedActivitiesResponse']?.(response);

    return response;
  }

  async getFollowSuggestions(request: {
    feed_group_id: string;
    limit?: number;
    user_id?: string;
  }): Promise<StreamResponse<GetFollowSuggestionsResponse>> {
    const queryParams = {
      limit: request?.limit,
      user_id: request?.user_id,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
    };

    const response =
      await this.apiClient.sendRequest<GetFollowSuggestionsResponse>(
        'GET',
        '/api/v2/feeds/feed_groups/{feed_group_id}/follow_suggestions',
        pathParams,
        queryParams,
      );

    decoders['GetFollowSuggestionsResponse']?.(response);

    return response;
  }

  async restoreFeedGroup(request: {
    feed_group_id: string;
  }): Promise<StreamResponse<RestoreFeedGroupResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
    };

    const response = await this.apiClient.sendRequest<RestoreFeedGroupResponse>(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/restore',
      pathParams,
      undefined,
    );

    decoders['RestoreFeedGroupResponse']?.(response);

    return response;
  }

  async deleteFeedGroup(request: {
    id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteFeedGroupResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteFeedGroupResponse>(
      'DELETE',
      '/api/v2/feeds/feed_groups/{id}',
      pathParams,
      queryParams,
    );

    decoders['DeleteFeedGroupResponse']?.(response);

    return response;
  }

  async getFeedGroup(request: {
    id: string;
    include_soft_deleted?: boolean;
  }): Promise<StreamResponse<GetFeedGroupResponse>> {
    const queryParams = {
      include_soft_deleted: request?.include_soft_deleted,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetFeedGroupResponse>(
      'GET',
      '/api/v2/feeds/feed_groups/{id}',
      pathParams,
      queryParams,
    );

    decoders['GetFeedGroupResponse']?.(response);

    return response;
  }

  async getOrCreateFeedGroup(
    request: GetOrCreateFeedGroupRequest & { id: string },
  ): Promise<StreamResponse<GetOrCreateFeedGroupResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      default_follower_role: request?.default_follower_role,
      default_visibility: request?.default_visibility,
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      activity_filter: request?.activity_filter,
      activity_marks: request?.activity_marks,
      activity_processing: request?.activity_processing,
      aggregation: request?.aggregation,
      custom: request?.custom,
      notification: request?.notification,
      push_notification: request?.push_notification,
      ranking: request?.ranking,
      stories: request?.stories,
    };

    const response =
      await this.apiClient.sendRequest<GetOrCreateFeedGroupResponse>(
        'POST',
        '/api/v2/feeds/feed_groups/{id}',
        pathParams,
        undefined,
        body,
      );

    decoders['GetOrCreateFeedGroupResponse']?.(response);

    return response;
  }

  async updateFeedGroup(
    request: UpdateFeedGroupRequest & { id: string },
  ): Promise<StreamResponse<UpdateFeedGroupResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      default_follower_role: request?.default_follower_role,
      default_visibility: request?.default_visibility,
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      activity_filter: request?.activity_filter,
      activity_marks: request?.activity_marks,
      activity_processing: request?.activity_processing,
      aggregation: request?.aggregation,
      custom: request?.custom,
      notification: request?.notification,
      push_notification: request?.push_notification,
      ranking: request?.ranking,
      stories: request?.stories,
    };

    const response = await this.apiClient.sendRequest<UpdateFeedGroupResponse>(
      'PUT',
      '/api/v2/feeds/feed_groups/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateFeedGroupResponse']?.(response);

    return response;
  }

  async listFeedViews(): Promise<StreamResponse<ListFeedViewsResponse>> {
    const response = await this.apiClient.sendRequest<ListFeedViewsResponse>(
      'GET',
      '/api/v2/feeds/feed_views',
      undefined,
      undefined,
    );

    decoders['ListFeedViewsResponse']?.(response);

    return response;
  }

  async createFeedView(
    request: CreateFeedViewRequest,
  ): Promise<StreamResponse<CreateFeedViewResponse>> {
    const body = {
      id: request?.id,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<CreateFeedViewResponse>(
      'POST',
      '/api/v2/feeds/feed_views',
      undefined,
      undefined,
      body,
    );

    decoders['CreateFeedViewResponse']?.(response);

    return response;
  }

  async deleteFeedView(request: {
    id: string;
  }): Promise<StreamResponse<DeleteFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteFeedViewResponse>(
      'DELETE',
      '/api/v2/feeds/feed_views/{id}',
      pathParams,
      undefined,
    );

    decoders['DeleteFeedViewResponse']?.(response);

    return response;
  }

  async getFeedView(request: {
    id: string;
  }): Promise<StreamResponse<GetFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetFeedViewResponse>(
      'GET',
      '/api/v2/feeds/feed_views/{id}',
      pathParams,
      undefined,
    );

    decoders['GetFeedViewResponse']?.(response);

    return response;
  }

  async getOrCreateFeedView(
    request: GetOrCreateFeedViewRequest & { id: string },
  ): Promise<StreamResponse<GetOrCreateFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response =
      await this.apiClient.sendRequest<GetOrCreateFeedViewResponse>(
        'POST',
        '/api/v2/feeds/feed_views/{id}',
        pathParams,
        undefined,
        body,
      );

    decoders['GetOrCreateFeedViewResponse']?.(response);

    return response;
  }

  async updateFeedView(
    request: UpdateFeedViewRequest & { id: string },
  ): Promise<StreamResponse<UpdateFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<UpdateFeedViewResponse>(
      'PUT',
      '/api/v2/feeds/feed_views/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateFeedViewResponse']?.(response);

    return response;
  }

  async listFeedVisibilities(): Promise<
    StreamResponse<ListFeedVisibilitiesResponse>
  > {
    const response =
      await this.apiClient.sendRequest<ListFeedVisibilitiesResponse>(
        'GET',
        '/api/v2/feeds/feed_visibilities',
        undefined,
        undefined,
      );

    decoders['ListFeedVisibilitiesResponse']?.(response);

    return response;
  }

  async getFeedVisibility(request: {
    name: string;
  }): Promise<StreamResponse<GetFeedVisibilityResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response =
      await this.apiClient.sendRequest<GetFeedVisibilityResponse>(
        'GET',
        '/api/v2/feeds/feed_visibilities/{name}',
        pathParams,
        undefined,
      );

    decoders['GetFeedVisibilityResponse']?.(response);

    return response;
  }

  async updateFeedVisibility(
    request: UpdateFeedVisibilityRequest & { name: string },
  ): Promise<StreamResponse<UpdateFeedVisibilityResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      grants: request?.grants,
    };

    const response =
      await this.apiClient.sendRequest<UpdateFeedVisibilityResponse>(
        'PUT',
        '/api/v2/feeds/feed_visibilities/{name}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateFeedVisibilityResponse']?.(response);

    return response;
  }

  async createFeedsBatch(
    request: CreateFeedsBatchRequest,
  ): Promise<StreamResponse<CreateFeedsBatchResponse>> {
    const body = {
      feeds: request?.feeds,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
    };

    const response = await this.apiClient.sendRequest<CreateFeedsBatchResponse>(
      'POST',
      '/api/v2/feeds/feeds/batch',
      undefined,
      undefined,
      body,
    );

    decoders['CreateFeedsBatchResponse']?.(response);

    return response;
  }

  async deleteFeedsBatch(
    request: DeleteFeedsBatchRequest,
  ): Promise<StreamResponse<DeleteFeedsBatchResponse>> {
    const body = {
      feeds: request?.feeds,
      hard_delete: request?.hard_delete,
      purge_user_activities: request?.purge_user_activities,
    };

    const response = await this.apiClient.sendRequest<DeleteFeedsBatchResponse>(
      'POST',
      '/api/v2/feeds/feeds/delete',
      undefined,
      undefined,
      body,
    );

    decoders['DeleteFeedsBatchResponse']?.(response);

    return response;
  }

  async ownBatch(
    request: OwnBatchRequest,
  ): Promise<StreamResponse<OwnBatchResponse>> {
    const body = {
      feeds: request?.feeds,
      user_id: request?.user_id,
      fields: request?.fields,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<OwnBatchResponse>(
      'POST',
      '/api/v2/feeds/feeds/own/batch',
      undefined,
      undefined,
      body,
    );

    decoders['OwnBatchResponse']?.(response);

    return response;
  }

  protected async _queryFeeds(
    request?: QueryFeedsRequest,
  ): Promise<StreamResponse<QueryFeedsResponse>> {
    const body = {
      enrich_own_fields: request?.enrich_own_fields,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      watch: request?.watch,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<QueryFeedsResponse>(
      'POST',
      '/api/v2/feeds/feeds/query',
      undefined,
      undefined,
      body,
    );

    decoders['QueryFeedsResponse']?.(response);

    return response;
  }

  async getFeedsRateLimits(request?: {
    endpoints?: string;
    android?: boolean;
    ios?: boolean;
    web?: boolean;
    unity?: boolean;
    unity_desktop?: boolean;
    unity_console?: boolean;
    server_side?: boolean;
  }): Promise<StreamResponse<GetFeedsRateLimitsResponse>> {
    const queryParams = {
      endpoints: request?.endpoints,
      android: request?.android,
      ios: request?.ios,
      web: request?.web,
      unity: request?.unity,
      unity_desktop: request?.unity_desktop,
      unity_console: request?.unity_console,
      server_side: request?.server_side,
    };

    const response =
      await this.apiClient.sendRequest<GetFeedsRateLimitsResponse>(
        'GET',
        '/api/v2/feeds/feeds/rate_limits',
        undefined,
        queryParams,
      );

    decoders['GetFeedsRateLimitsResponse']?.(response);

    return response;
  }

  async updateFollow(
    request: UpdateFollowRequest,
  ): Promise<StreamResponse<UpdateFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      activity_copy_limit: request?.activity_copy_limit,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      create_notification_activity: request?.create_notification_activity,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
      follower_role: request?.follower_role,
      push_preference: request?.push_preference,
      skip_push: request?.skip_push,
      status: request?.status,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<UpdateFollowResponse>(
      'PATCH',
      '/api/v2/feeds/follows',
      undefined,
      undefined,
      body,
    );

    decoders['UpdateFollowResponse']?.(response);

    return response;
  }

  async follow(
    request: FollowRequest,
  ): Promise<StreamResponse<SingleFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      activity_copy_limit: request?.activity_copy_limit,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      create_notification_activity: request?.create_notification_activity,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
      push_preference: request?.push_preference,
      skip_push: request?.skip_push,
      status: request?.status,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<SingleFollowResponse>(
      'POST',
      '/api/v2/feeds/follows',
      undefined,
      undefined,
      body,
    );

    decoders['SingleFollowResponse']?.(response);

    return response;
  }

  async acceptFollow(
    request: AcceptFollowRequest,
  ): Promise<StreamResponse<AcceptFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      follower_role: request?.follower_role,
    };

    const response = await this.apiClient.sendRequest<AcceptFollowResponse>(
      'POST',
      '/api/v2/feeds/follows/accept',
      undefined,
      undefined,
      body,
    );

    decoders['AcceptFollowResponse']?.(response);

    return response;
  }

  async followBatch(
    request: FollowBatchRequest,
  ): Promise<StreamResponse<FollowBatchResponse>> {
    const body = {
      follows: request?.follows,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
    };

    const response = await this.apiClient.sendRequest<FollowBatchResponse>(
      'POST',
      '/api/v2/feeds/follows/batch',
      undefined,
      undefined,
      body,
    );

    decoders['FollowBatchResponse']?.(response);

    return response;
  }

  async getOrCreateFollows(
    request: FollowBatchRequest,
  ): Promise<StreamResponse<FollowBatchResponse>> {
    const body = {
      follows: request?.follows,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
    };

    const response = await this.apiClient.sendRequest<FollowBatchResponse>(
      'POST',
      '/api/v2/feeds/follows/batch/upsert',
      undefined,
      undefined,
      body,
    );

    decoders['FollowBatchResponse']?.(response);

    return response;
  }

  async queryFollows(
    request?: QueryFollowsRequest,
  ): Promise<StreamResponse<QueryFollowsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<QueryFollowsResponse>(
      'POST',
      '/api/v2/feeds/follows/query',
      undefined,
      undefined,
      body,
    );

    decoders['QueryFollowsResponse']?.(response);

    return response;
  }

  async rejectFollow(
    request: RejectFollowRequest,
  ): Promise<StreamResponse<RejectFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
    };

    const response = await this.apiClient.sendRequest<RejectFollowResponse>(
      'POST',
      '/api/v2/feeds/follows/reject',
      undefined,
      undefined,
      body,
    );

    decoders['RejectFollowResponse']?.(response);

    return response;
  }

  async getOrCreateFollow(
    request: FollowRequest,
  ): Promise<StreamResponse<GetOrCreateFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      activity_copy_limit: request?.activity_copy_limit,
      copy_custom_to_notification: request?.copy_custom_to_notification,
      create_notification_activity: request?.create_notification_activity,
      create_users: request?.create_users,
      enrich_own_fields: request?.enrich_own_fields,
      push_preference: request?.push_preference,
      skip_push: request?.skip_push,
      status: request?.status,
      custom: request?.custom,
    };

    const response =
      await this.apiClient.sendRequest<GetOrCreateFollowResponse>(
        'POST',
        '/api/v2/feeds/follows/upsert',
        undefined,
        undefined,
        body,
      );

    decoders['GetOrCreateFollowResponse']?.(response);

    return response;
  }

  async unfollow(request: {
    source: string;
    target: string;
    delete_notification_activity?: boolean;
    keep_history?: boolean;
    enrich_own_fields?: boolean;
  }): Promise<StreamResponse<UnfollowResponse>> {
    const queryParams = {
      delete_notification_activity: request?.delete_notification_activity,
      keep_history: request?.keep_history,
      enrich_own_fields: request?.enrich_own_fields,
    };
    const pathParams = {
      source: request?.source,
      target: request?.target,
    };

    const response = await this.apiClient.sendRequest<UnfollowResponse>(
      'DELETE',
      '/api/v2/feeds/follows/{source}/{target}',
      pathParams,
      queryParams,
    );

    decoders['UnfollowResponse']?.(response);

    return response;
  }

  async createMembershipLevel(
    request: CreateMembershipLevelRequest,
  ): Promise<StreamResponse<CreateMembershipLevelResponse>> {
    const body = {
      id: request?.id,
      name: request?.name,
      description: request?.description,
      priority: request?.priority,
      tags: request?.tags,
      custom: request?.custom,
    };

    const response =
      await this.apiClient.sendRequest<CreateMembershipLevelResponse>(
        'POST',
        '/api/v2/feeds/membership_levels',
        undefined,
        undefined,
        body,
      );

    decoders['CreateMembershipLevelResponse']?.(response);

    return response;
  }

  async queryMembershipLevels(
    request?: QueryMembershipLevelsRequest,
  ): Promise<StreamResponse<QueryMembershipLevelsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response =
      await this.apiClient.sendRequest<QueryMembershipLevelsResponse>(
        'POST',
        '/api/v2/feeds/membership_levels/query',
        undefined,
        undefined,
        body,
      );

    decoders['QueryMembershipLevelsResponse']?.(response);

    return response;
  }

  async deleteMembershipLevel(request: {
    id: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/feeds/membership_levels/{id}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async updateMembershipLevel(
    request: UpdateMembershipLevelRequest & { id: string },
  ): Promise<StreamResponse<UpdateMembershipLevelResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      description: request?.description,
      name: request?.name,
      priority: request?.priority,
      tags: request?.tags,
      custom: request?.custom,
    };

    const response =
      await this.apiClient.sendRequest<UpdateMembershipLevelResponse>(
        'PATCH',
        '/api/v2/feeds/membership_levels/{id}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateMembershipLevelResponse']?.(response);

    return response;
  }

  async feedsGetRetentionPolicy(): Promise<
    StreamResponse<GetFeedsRetentionPolicyResponse>
  > {
    const response =
      await this.apiClient.sendRequest<GetFeedsRetentionPolicyResponse>(
        'GET',
        '/api/v2/feeds/retention_policy',
        undefined,
        undefined,
      );

    decoders['GetFeedsRetentionPolicyResponse']?.(response);

    return response;
  }

  async feedsSetRetentionPolicy(
    request: SetFeedsRetentionPolicyRequest,
  ): Promise<StreamResponse<SetFeedsRetentionPolicyResponse>> {
    const body = {
      max_age_hours: request?.max_age_hours,
      policy: request?.policy,
      enabled: request?.enabled,
    };

    const response =
      await this.apiClient.sendRequest<SetFeedsRetentionPolicyResponse>(
        'POST',
        '/api/v2/feeds/retention_policy',
        undefined,
        undefined,
        body,
      );

    decoders['SetFeedsRetentionPolicyResponse']?.(response);

    return response;
  }

  async feedsDeleteRetentionPolicy(
    request: DeleteFeedsRetentionPolicyRequest,
  ): Promise<StreamResponse<DeleteFeedsRetentionPolicyResponse>> {
    const body = {
      policy: request?.policy,
    };

    const response =
      await this.apiClient.sendRequest<DeleteFeedsRetentionPolicyResponse>(
        'POST',
        '/api/v2/feeds/retention_policy/delete',
        undefined,
        undefined,
        body,
      );

    decoders['DeleteFeedsRetentionPolicyResponse']?.(response);

    return response;
  }

  async feedsGetRetentionPolicyRuns(
    request?: GetFeedsRetentionPolicyRunsRequest,
  ): Promise<StreamResponse<GetFeedsRetentionPolicyRunsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response =
      await this.apiClient.sendRequest<GetFeedsRetentionPolicyRunsResponse>(
        'POST',
        '/api/v2/feeds/retention_policy/runs',
        undefined,
        undefined,
        body,
      );

    decoders['GetFeedsRetentionPolicyRunsResponse']?.(response);

    return response;
  }

  async queryRevisionHistory(
    request: QueryRevisionHistoryRequest,
  ): Promise<StreamResponse<QueryRevisionHistoryResponse>> {
    const body = {
      filter: request?.filter,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
    };

    const response =
      await this.apiClient.sendRequest<QueryRevisionHistoryResponse>(
        'POST',
        '/api/v2/feeds/revisions/query',
        undefined,
        undefined,
        body,
      );

    decoders['QueryRevisionHistoryResponse']?.(response);

    return response;
  }

  async queryFeedsUsageStats(
    request?: QueryFeedsUsageStatsRequest,
  ): Promise<StreamResponse<QueryFeedsUsageStatsResponse>> {
    const body = {
      from: request?.from,
      to: request?.to,
    };

    const response =
      await this.apiClient.sendRequest<QueryFeedsUsageStatsResponse>(
        'POST',
        '/api/v2/feeds/stats/usage',
        undefined,
        undefined,
        body,
      );

    decoders['QueryFeedsUsageStatsResponse']?.(response);

    return response;
  }

  async unfollowBatch(
    request: UnfollowBatchRequest,
  ): Promise<StreamResponse<UnfollowBatchResponse>> {
    const body = {
      follows: request?.follows,
      delete_notification_activity: request?.delete_notification_activity,
      enrich_own_fields: request?.enrich_own_fields,
    };

    const response = await this.apiClient.sendRequest<UnfollowBatchResponse>(
      'POST',
      '/api/v2/feeds/unfollow/batch',
      undefined,
      undefined,
      body,
    );

    decoders['UnfollowBatchResponse']?.(response);

    return response;
  }

  async getOrCreateUnfollows(
    request: UnfollowBatchRequest,
  ): Promise<StreamResponse<UnfollowBatchResponse>> {
    const body = {
      follows: request?.follows,
      delete_notification_activity: request?.delete_notification_activity,
      enrich_own_fields: request?.enrich_own_fields,
    };

    const response = await this.apiClient.sendRequest<UnfollowBatchResponse>(
      'POST',
      '/api/v2/feeds/unfollow/batch/upsert',
      undefined,
      undefined,
      body,
    );

    decoders['UnfollowBatchResponse']?.(response);

    return response;
  }

  async getOrCreateUnfollow(
    request: GetOrCreateUnfollowRequest,
  ): Promise<StreamResponse<GetOrCreateUnfollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      delete_notification_activity: request?.delete_notification_activity,
      enrich_own_fields: request?.enrich_own_fields,
      keep_history: request?.keep_history,
    };

    const response =
      await this.apiClient.sendRequest<GetOrCreateUnfollowResponse>(
        'POST',
        '/api/v2/feeds/unfollow/upsert',
        undefined,
        undefined,
        body,
      );

    decoders['GetOrCreateUnfollowResponse']?.(response);

    return response;
  }

  async deleteFeedUserData(
    request: DeleteFeedUserDataRequest & { user_id: string },
  ): Promise<StreamResponse<DeleteFeedUserDataResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      hard_delete: request?.hard_delete,
    };

    const response =
      await this.apiClient.sendRequest<DeleteFeedUserDataResponse>(
        'POST',
        '/api/v2/feeds/users/{user_id}/delete',
        pathParams,
        undefined,
        body,
      );

    decoders['DeleteFeedUserDataResponse']?.(response);

    return response;
  }

  async exportFeedUserData(request: {
    user_id: string;
  }): Promise<StreamResponse<ExportFeedUserDataResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };

    const response =
      await this.apiClient.sendRequest<ExportFeedUserDataResponse>(
        'POST',
        '/api/v2/feeds/users/{user_id}/export',
        pathParams,
        undefined,
      );

    decoders['ExportFeedUserDataResponse']?.(response);

    return response;
  }

  async deleteUserInterests(request: {
    user_id: string;
    tags: Array<string>;
  }): Promise<StreamResponse<DeleteUserInterestsResponse>> {
    const queryParams = {
      tags: request?.tags,
    };
    const pathParams = {
      user_id: request?.user_id,
    };

    const response =
      await this.apiClient.sendRequest<DeleteUserInterestsResponse>(
        'DELETE',
        '/api/v2/feeds/users/{user_id}/interests',
        pathParams,
        queryParams,
      );

    decoders['DeleteUserInterestsResponse']?.(response);

    return response;
  }

  async getUserInterests(request: {
    user_id: string;
    limit?: number;
  }): Promise<StreamResponse<GetUserInterestsResponse>> {
    const queryParams = {
      limit: request?.limit,
    };
    const pathParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<GetUserInterestsResponse>(
      'GET',
      '/api/v2/feeds/users/{user_id}/interests',
      pathParams,
      queryParams,
    );

    decoders['GetUserInterestsResponse']?.(response);

    return response;
  }

  async upsertUserInterests(
    request: UpsertUserInterestsRequest & { user_id: string },
  ): Promise<StreamResponse<UpsertUserInterestsResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      interests: request?.interests,
    };

    const response =
      await this.apiClient.sendRequest<UpsertUserInterestsResponse>(
        'PUT',
        '/api/v2/feeds/users/{user_id}/interests',
        pathParams,
        undefined,
        body,
      );

    decoders['UpsertUserInterestsResponse']?.(response);

    return response;
  }
}
