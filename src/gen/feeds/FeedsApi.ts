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
  AddCommentReactionRequest,
  AddCommentReactionResponse,
  AddCommentRequest,
  AddCommentResponse,
  AddCommentsBatchRequest,
  AddCommentsBatchResponse,
  AddReactionRequest,
  AddReactionResponse,
  CastPollVoteRequest,
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
  DeleteCommentReactionResponse,
  DeleteCommentResponse,
  DeleteFeedGroupResponse,
  DeleteFeedResponse,
  DeleteFeedUserDataResponse,
  DeleteFeedViewResponse,
  ExportFeedUserDataResponse,
  FollowBatchRequest,
  FollowBatchResponse,
  FollowRequest,
  GetActivityResponse,
  GetCommentRepliesResponse,
  GetCommentResponse,
  GetCommentsResponse,
  GetFeedGroupResponse,
  GetFeedViewResponse,
  GetFeedVisibilityResponse,
  GetFeedsRateLimitsResponse,
  GetFollowSuggestionsResponse,
  GetOrCreateFeedGroupRequest,
  GetOrCreateFeedGroupResponse,
  GetOrCreateFeedRequest,
  GetOrCreateFeedResponse,
  GetOrCreateFeedViewRequest,
  GetOrCreateFeedViewResponse,
  ListFeedGroupsResponse,
  ListFeedViewsResponse,
  ListFeedVisibilitiesResponse,
  MarkActivityRequest,
  OwnCapabilitiesBatchRequest,
  OwnCapabilitiesBatchResponse,
  PinActivityRequest,
  PinActivityResponse,
  PollVoteResponse,
  QueryActivitiesRequest,
  QueryActivitiesResponse,
  QueryActivityReactionsRequest,
  QueryActivityReactionsResponse,
  QueryBookmarkFoldersRequest,
  QueryBookmarkFoldersResponse,
  QueryBookmarksRequest,
  QueryBookmarksResponse,
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
  RejectFeedMemberInviteRequest,
  RejectFeedMemberInviteResponse,
  RejectFollowRequest,
  RejectFollowResponse,
  Response,
  SingleFollowResponse,
  UnfollowBatchRequest,
  UnfollowBatchResponse,
  UnfollowResponse,
  UnpinActivityResponse,
  UpdateActivityPartialRequest,
  UpdateActivityPartialResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
  UpdateBookmarkFolderRequest,
  UpdateBookmarkFolderResponse,
  UpdateBookmarkRequest,
  UpdateBookmarkResponse,
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
      expires_at: request?.expires_at,
      id: request?.id,
      parent_id: request?.parent_id,
      poll_id: request?.poll_id,
      restrict_replies: request?.restrict_replies,
      text: request?.text,
      user_id: request?.user_id,
      visibility: request?.visibility,
      visibility_tag: request?.visibility_tag,
      attachments: request?.attachments,
      filter_tags: request?.filter_tags,
      interest_tags: request?.interest_tags,
      mentioned_user_ids: request?.mentioned_user_ids,
      custom: request?.custom,
      location: request?.location,
      search_data: request?.search_data,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddActivityResponse>
    >(
      'POST',
      '/api/v2/feeds/activities',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.AddActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async upsertActivities(
    request: UpsertActivitiesRequest,
  ): Promise<StreamResponse<UpsertActivitiesResponse>> {
    const body = {
      activities: request?.activities,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertActivitiesResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/batch',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UpsertActivitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteActivities(
    request: DeleteActivitiesRequest,
  ): Promise<StreamResponse<DeleteActivitiesResponse>> {
    const body = {
      ids: request?.ids,
      hard_delete: request?.hard_delete,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteActivitiesResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/delete',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.DeleteActivitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryActivities(
    request?: QueryActivitiesRequest,
  ): Promise<StreamResponse<QueryActivitiesResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryActivitiesResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryActivitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteBookmarkResponse>
    >(
      'DELETE',
      '/api/v2/feeds/activities/{activity_id}/bookmarks',
      pathParams,
      queryParams,
    );

    decoders.DeleteBookmarkResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateBookmarkResponse>
    >(
      'PATCH',
      '/api/v2/feeds/activities/{activity_id}/bookmarks',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateBookmarkResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddBookmarkResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/bookmarks',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.AddBookmarkResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<ActivityFeedbackResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/feedback',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.ActivityFeedbackResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollVoteResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/polls/{poll_id}/vote',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollVoteResponse>
    >(
      'DELETE',
      '/api/v2/feeds/activities/{activity_id}/polls/{poll_id}/vote/{vote_id}',
      pathParams,
      queryParams,
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async addActivityReaction(
    request: AddReactionRequest & { activity_id: string },
  ): Promise<StreamResponse<AddReactionResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      type: request?.type,
      create_notification_activity: request?.create_notification_activity,
      enforce_unique: request?.enforce_unique,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddReactionResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/reactions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.AddReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryActivityReactionsResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/{activity_id}/reactions/query',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryActivityReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteActivityReaction(request: {
    activity_id: string;
    type: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteActivityReactionResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      activity_id: request?.activity_id,
      type: request?.type,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteActivityReactionResponse>
    >(
      'DELETE',
      '/api/v2/feeds/activities/{activity_id}/reactions/{type}',
      pathParams,
      queryParams,
    );

    decoders.DeleteActivityReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteActivity(request: {
    id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteActivityResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteActivityResponse>
    >('DELETE', '/api/v2/feeds/activities/{id}', pathParams, queryParams);

    decoders.DeleteActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getActivity(request: {
    id: string;
  }): Promise<StreamResponse<GetActivityResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetActivityResponse>
    >('GET', '/api/v2/feeds/activities/{id}', pathParams, undefined);

    decoders.GetActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateActivityPartial(
    request: UpdateActivityPartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateActivityPartialResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateActivityPartialResponse>
    >(
      'PATCH',
      '/api/v2/feeds/activities/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateActivityPartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateActivity(
    request: UpdateActivityRequest & { id: string },
  ): Promise<StreamResponse<UpdateActivityResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      expires_at: request?.expires_at,
      poll_id: request?.poll_id,
      restrict_replies: request?.restrict_replies,
      text: request?.text,
      user_id: request?.user_id,
      visibility: request?.visibility,
      attachments: request?.attachments,
      feeds: request?.feeds,
      filter_tags: request?.filter_tags,
      interest_tags: request?.interest_tags,
      custom: request?.custom,
      location: request?.location,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateActivityResponse>
    >(
      'PUT',
      '/api/v2/feeds/activities/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryBookmarkFoldersResponse>
    >(
      'POST',
      '/api/v2/feeds/bookmark_folders/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryBookmarkFoldersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteBookmarkFolder(request: {
    folder_id: string;
  }): Promise<StreamResponse<DeleteBookmarkFolderResponse>> {
    const pathParams = {
      folder_id: request?.folder_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteBookmarkFolderResponse>
    >(
      'DELETE',
      '/api/v2/feeds/bookmark_folders/{folder_id}',
      pathParams,
      undefined,
    );

    decoders.DeleteBookmarkFolderResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateBookmarkFolderResponse>
    >(
      'PATCH',
      '/api/v2/feeds/bookmark_folders/{folder_id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateBookmarkFolderResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryBookmarks(
    request?: QueryBookmarksRequest,
  ): Promise<StreamResponse<QueryBookmarksResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryBookmarksResponse>
    >(
      'POST',
      '/api/v2/feeds/bookmarks/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryBookmarksResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getComments(request: {
    object_id: string;
    object_type: string;
    depth?: number;
    sort?: string;
    replies_limit?: number;
    limit?: number;
    prev?: string;
    next?: string;
  }): Promise<StreamResponse<GetCommentsResponse>> {
    const queryParams = {
      object_id: request?.object_id,
      object_type: request?.object_type,
      depth: request?.depth,
      sort: request?.sort,
      replies_limit: request?.replies_limit,
      limit: request?.limit,
      prev: request?.prev,
      next: request?.next,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCommentsResponse>
    >('GET', '/api/v2/feeds/comments', undefined, queryParams);

    decoders.GetCommentsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async addComment(
    request: AddCommentRequest,
  ): Promise<StreamResponse<AddCommentResponse>> {
    const body = {
      object_id: request?.object_id,
      object_type: request?.object_type,
      comment: request?.comment,
      create_notification_activity: request?.create_notification_activity,
      parent_id: request?.parent_id,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      attachments: request?.attachments,
      mentioned_user_ids: request?.mentioned_user_ids,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddCommentResponse>
    >(
      'POST',
      '/api/v2/feeds/comments',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.AddCommentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async addCommentsBatch(
    request: AddCommentsBatchRequest,
  ): Promise<StreamResponse<AddCommentsBatchResponse>> {
    const body = {
      comments: request?.comments,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddCommentsBatchResponse>
    >(
      'POST',
      '/api/v2/feeds/comments/batch',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.AddCommentsBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryComments(
    request: QueryCommentsRequest,
  ): Promise<StreamResponse<QueryCommentsResponse>> {
    const body = {
      filter: request?.filter,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCommentsResponse>
    >(
      'POST',
      '/api/v2/feeds/comments/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryCommentsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteComment(request: {
    id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteCommentResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteCommentResponse>
    >('DELETE', '/api/v2/feeds/comments/{id}', pathParams, queryParams);

    decoders.DeleteCommentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getComment(request: {
    id: string;
  }): Promise<StreamResponse<GetCommentResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCommentResponse>
    >('GET', '/api/v2/feeds/comments/{id}', pathParams, undefined);

    decoders.GetCommentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateComment(
    request: UpdateCommentRequest & { id: string },
  ): Promise<StreamResponse<UpdateCommentResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      comment: request?.comment,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCommentResponse>
    >(
      'PATCH',
      '/api/v2/feeds/comments/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateCommentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async addCommentReaction(
    request: AddCommentReactionRequest & { id: string },
  ): Promise<StreamResponse<AddCommentReactionResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      type: request?.type,
      create_notification_activity: request?.create_notification_activity,
      enforce_unique: request?.enforce_unique,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddCommentReactionResponse>
    >(
      'POST',
      '/api/v2/feeds/comments/{id}/reactions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.AddCommentReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCommentReactionsResponse>
    >(
      'POST',
      '/api/v2/feeds/comments/{id}/reactions/query',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryCommentReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteCommentReaction(request: {
    id: string;
    type: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteCommentReactionResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      id: request?.id,
      type: request?.type,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteCommentReactionResponse>
    >(
      'DELETE',
      '/api/v2/feeds/comments/{id}/reactions/{type}',
      pathParams,
      queryParams,
    );

    decoders.DeleteCommentReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCommentReplies(request: {
    id: string;
    depth?: number;
    sort?: string;
    replies_limit?: number;
    limit?: number;
    prev?: string;
    next?: string;
  }): Promise<StreamResponse<GetCommentRepliesResponse>> {
    const queryParams = {
      depth: request?.depth,
      sort: request?.sort,
      replies_limit: request?.replies_limit,
      limit: request?.limit,
      prev: request?.prev,
      next: request?.next,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCommentRepliesResponse>
    >('GET', '/api/v2/feeds/comments/{id}/replies', pathParams, queryParams);

    decoders.GetCommentRepliesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listFeedGroups(request?: {
    include_soft_deleted?: boolean;
  }): Promise<StreamResponse<ListFeedGroupsResponse>> {
    const queryParams = {
      include_soft_deleted: request?.include_soft_deleted,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ListFeedGroupsResponse>
    >('GET', '/api/v2/feeds/feed_groups', undefined, queryParams);

    decoders.ListFeedGroupsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createFeedGroup(
    request: CreateFeedGroupRequest,
  ): Promise<StreamResponse<CreateFeedGroupResponse>> {
    const body = {
      id: request?.id,
      default_visibility: request?.default_visibility,
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      custom: request?.custom,
      notification: request?.notification,
      push_notification: request?.push_notification,
      ranking: request?.ranking,
      stories: request?.stories,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateFeedGroupResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_groups',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteFeed(request: {
    feed_group_id: string;
    feed_id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteFeedResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedResponse>
    >(
      'DELETE',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      queryParams,
    );

    decoders.DeleteFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getOrCreateFeed(
    request: GetOrCreateFeedRequest & {
      feed_group_id: string;
      feed_id: string;
    },
  ): Promise<StreamResponse<GetOrCreateFeedResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      view: request?.view,
      watch: request?.watch,
      activity_selector_options: request?.activity_selector_options,
      data: request?.data,
      external_ranking: request?.external_ranking,
      filter: request?.filter,
      followers_pagination: request?.followers_pagination,
      following_pagination: request?.following_pagination,
      interest_weights: request?.interest_weights,
      member_pagination: request?.member_pagination,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOrCreateFeedResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.GetOrCreateFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateFeed(
    request: UpdateFeedRequest & { feed_group_id: string; feed_id: string },
  ): Promise<StreamResponse<UpdateFeedResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
    };
    const body = {
      created_by_id: request?.created_by_id,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedResponse>
    >(
      'PUT',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/mark/batch',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unpinActivity(request: {
    feed_group_id: string;
    feed_id: string;
    activity_id: string;
    user_id?: string;
  }): Promise<StreamResponse<UnpinActivityResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnpinActivityResponse>
    >(
      'DELETE',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/{activity_id}/pin',
      pathParams,
      queryParams,
    );

    decoders.UnpinActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PinActivityResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/{activity_id}/pin',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.PinActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedMembersResponse>
    >(
      'PATCH',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateFeedMembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<AcceptFeedMemberInviteResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members/accept',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.AcceptFeedMemberInviteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryFeedMembersResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members/query',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryFeedMembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<RejectFeedMemberInviteResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_groups/{feed_group_id}/feeds/{feed_id}/members/reject',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.RejectFeedMemberInviteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFollowSuggestionsResponse>
    >(
      'GET',
      '/api/v2/feeds/feed_groups/{feed_group_id}/follow_suggestions',
      pathParams,
      queryParams,
    );

    decoders.GetFollowSuggestionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedGroupResponse>
    >('DELETE', '/api/v2/feeds/feed_groups/{id}', pathParams, queryParams);

    decoders.DeleteFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFeedGroupResponse>
    >('GET', '/api/v2/feeds/feed_groups/{id}', pathParams, queryParams);

    decoders.GetFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getOrCreateFeedGroup(
    request: GetOrCreateFeedGroupRequest & { id: string },
  ): Promise<StreamResponse<GetOrCreateFeedGroupResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      default_visibility: request?.default_visibility,
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      custom: request?.custom,
      notification: request?.notification,
      push_notification: request?.push_notification,
      ranking: request?.ranking,
      stories: request?.stories,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOrCreateFeedGroupResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_groups/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.GetOrCreateFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateFeedGroup(
    request: UpdateFeedGroupRequest & { id: string },
  ): Promise<StreamResponse<UpdateFeedGroupResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      default_visibility: request?.default_visibility,
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      custom: request?.custom,
      notification: request?.notification,
      push_notification: request?.push_notification,
      ranking: request?.ranking,
      stories: request?.stories,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedGroupResponse>
    >(
      'PUT',
      '/api/v2/feeds/feed_groups/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listFeedViews(): Promise<StreamResponse<ListFeedViewsResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListFeedViewsResponse>
    >('GET', '/api/v2/feeds/feed_views', undefined, undefined);

    decoders.ListFeedViewsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createFeedView(
    request: CreateFeedViewRequest,
  ): Promise<StreamResponse<CreateFeedViewResponse>> {
    const body = {
      id: request?.id,
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateFeedViewResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_views',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateFeedViewResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteFeedView(request: {
    id: string;
  }): Promise<StreamResponse<DeleteFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedViewResponse>
    >('DELETE', '/api/v2/feeds/feed_views/{id}', pathParams, undefined);

    decoders.DeleteFeedViewResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getFeedView(request: {
    id: string;
  }): Promise<StreamResponse<GetFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFeedViewResponse>
    >('GET', '/api/v2/feeds/feed_views/{id}', pathParams, undefined);

    decoders.GetFeedViewResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getOrCreateFeedView(
    request: GetOrCreateFeedViewRequest & { id: string },
  ): Promise<StreamResponse<GetOrCreateFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOrCreateFeedViewResponse>
    >(
      'POST',
      '/api/v2/feeds/feed_views/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.GetOrCreateFeedViewResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateFeedView(
    request: UpdateFeedViewRequest & { id: string },
  ): Promise<StreamResponse<UpdateFeedViewResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      activity_processors: request?.activity_processors,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedViewResponse>
    >(
      'PUT',
      '/api/v2/feeds/feed_views/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateFeedViewResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listFeedVisibilities(): Promise<
    StreamResponse<ListFeedVisibilitiesResponse>
  > {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListFeedVisibilitiesResponse>
    >('GET', '/api/v2/feeds/feed_visibilities', undefined, undefined);

    decoders.ListFeedVisibilitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getFeedVisibility(request: {
    name: string;
  }): Promise<StreamResponse<GetFeedVisibilityResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFeedVisibilityResponse>
    >('GET', '/api/v2/feeds/feed_visibilities/{name}', pathParams, undefined);

    decoders.GetFeedVisibilityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedVisibilityResponse>
    >(
      'PUT',
      '/api/v2/feeds/feed_visibilities/{name}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateFeedVisibilityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createFeedsBatch(
    request: CreateFeedsBatchRequest,
  ): Promise<StreamResponse<CreateFeedsBatchResponse>> {
    const body = {
      feeds: request?.feeds,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateFeedsBatchResponse>
    >(
      'POST',
      '/api/v2/feeds/feeds/batch',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateFeedsBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async ownCapabilitiesBatch(
    request: OwnCapabilitiesBatchRequest,
  ): Promise<StreamResponse<OwnCapabilitiesBatchResponse>> {
    const body = {
      feeds: request?.feeds,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<OwnCapabilitiesBatchResponse>
    >(
      'POST',
      '/api/v2/feeds/feeds/own_capabilities/batch',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.OwnCapabilitiesBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  protected async _queryFeeds(
    request?: QueryFeedsRequest,
  ): Promise<StreamResponse<QueryFeedsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      watch: request?.watch,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryFeedsResponse>
    >(
      'POST',
      '/api/v2/feeds/feeds/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryFeedsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getFeedsRateLimits(request?: {
    endpoints?: string;
    android?: boolean;
    ios?: boolean;
    web?: boolean;
    server_side?: boolean;
  }): Promise<StreamResponse<GetFeedsRateLimitsResponse>> {
    const queryParams = {
      endpoints: request?.endpoints,
      android: request?.android,
      ios: request?.ios,
      web: request?.web,
      server_side: request?.server_side,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFeedsRateLimitsResponse>
    >('GET', '/api/v2/feeds/feeds/rate_limits', undefined, queryParams);

    decoders.GetFeedsRateLimitsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateFollow(
    request: UpdateFollowRequest,
  ): Promise<StreamResponse<UpdateFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      create_notification_activity: request?.create_notification_activity,
      follower_role: request?.follower_role,
      push_preference: request?.push_preference,
      skip_push: request?.skip_push,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFollowResponse>
    >(
      'PATCH',
      '/api/v2/feeds/follows',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateFollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async follow(
    request: FollowRequest,
  ): Promise<StreamResponse<SingleFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      create_notification_activity: request?.create_notification_activity,
      push_preference: request?.push_preference,
      skip_push: request?.skip_push,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SingleFollowResponse>
    >(
      'POST',
      '/api/v2/feeds/follows',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.SingleFollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async acceptFollow(
    request: AcceptFollowRequest,
  ): Promise<StreamResponse<AcceptFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      follower_role: request?.follower_role,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AcceptFollowResponse>
    >(
      'POST',
      '/api/v2/feeds/follows/accept',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.AcceptFollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async followBatch(
    request: FollowBatchRequest,
  ): Promise<StreamResponse<FollowBatchResponse>> {
    const body = {
      follows: request?.follows,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<FollowBatchResponse>
    >(
      'POST',
      '/api/v2/feeds/follows/batch',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.FollowBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryFollowsResponse>
    >(
      'POST',
      '/api/v2/feeds/follows/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryFollowsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async rejectFollow(
    request: RejectFollowRequest,
  ): Promise<StreamResponse<RejectFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<RejectFollowResponse>
    >(
      'POST',
      '/api/v2/feeds/follows/reject',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.RejectFollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unfollow(request: {
    source: string;
    target: string;
  }): Promise<StreamResponse<UnfollowResponse>> {
    const pathParams = {
      source: request?.source,
      target: request?.target,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnfollowResponse>
    >(
      'DELETE',
      '/api/v2/feeds/follows/{source}/{target}',
      pathParams,
      undefined,
    );

    decoders.UnfollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateMembershipLevelResponse>
    >(
      'POST',
      '/api/v2/feeds/membership_levels',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateMembershipLevelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryMembershipLevelsResponse>
    >(
      'POST',
      '/api/v2/feeds/membership_levels/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryMembershipLevelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteMembershipLevel(request: {
    id: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/feeds/membership_levels/{id}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateMembershipLevelResponse>
    >(
      'PATCH',
      '/api/v2/feeds/membership_levels/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateMembershipLevelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryFeedsUsageStats(
    request?: QueryFeedsUsageStatsRequest,
  ): Promise<StreamResponse<QueryFeedsUsageStatsResponse>> {
    const body = {
      from: request?.from,
      to: request?.to,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryFeedsUsageStatsResponse>
    >(
      'POST',
      '/api/v2/feeds/stats/usage',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryFeedsUsageStatsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unfollowBatch(
    request: UnfollowBatchRequest,
  ): Promise<StreamResponse<UnfollowBatchResponse>> {
    const body = {
      follows: request?.follows,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnfollowBatchResponse>
    >(
      'POST',
      '/api/v2/feeds/unfollow/batch',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UnfollowBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteFeedUserData(request: {
    user_id: string;
  }): Promise<StreamResponse<DeleteFeedUserDataResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedUserDataResponse>
    >('DELETE', '/api/v2/feeds/users/{user_id}/delete', pathParams, undefined);

    decoders.DeleteFeedUserDataResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async exportFeedUserData(request: {
    user_id: string;
  }): Promise<StreamResponse<ExportFeedUserDataResponse>> {
    const pathParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ExportFeedUserDataResponse>
    >('POST', '/api/v2/feeds/users/{user_id}/export', pathParams, undefined);

    decoders.ExportFeedUserDataResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}
