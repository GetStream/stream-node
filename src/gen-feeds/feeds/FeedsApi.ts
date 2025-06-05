import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  AcceptFeedMemberInviteRequest,
  AcceptFeedMemberInviteResponse,
  AcceptFollowRequest,
  AcceptFollowResponse,
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
  CreatePollOptionRequest,
  CreatePollRequest,
  DeleteActivitiesRequest,
  DeleteActivitiesResponse,
  DeleteActivityReactionResponse,
  DeleteActivityResponse,
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
  GetActivityResponse,
  GetCommentRepliesResponse,
  GetCommentResponse,
  GetCommentsResponse,
  GetFollowSuggestionsResponse,
  GetOrCreateFeedRequest,
  GetOrCreateFeedResponse,
  MarkActivityRequest,
  PinActivityRequest,
  PinActivityResponse,
  PollOptionResponse,
  PollResponse,
  PollVoteResponse,
  PollVotesResponse,
  QueryActivitiesRequest,
  QueryActivitiesResponse,
  QueryActivityReactionsRequest,
  QueryActivityReactionsResponse,
  QueryCommentReactionsRequest,
  QueryCommentReactionsResponse,
  QueryCommentsRequest,
  QueryCommentsResponse,
  QueryFeedMembersRequest,
  QueryFeedMembersResponse,
  QueryFeedsRequest,
  QueryFeedsResponse,
  QueryFollowsRequest,
  QueryFollowsResponse,
  QueryPollVotesRequest,
  QueryPollsRequest,
  QueryPollsResponse,
  RejectFeedMemberInviteRequest,
  RejectFeedMemberInviteResponse,
  RejectFollowRequest,
  RejectFollowResponse,
  Response,
  SingleFollowRequest,
  SingleFollowResponse,
  UnfollowBatchRequest,
  UnfollowBatchResponse,
  UnfollowResponse,
  UnpinActivityResponse,
  UpdateActivityPartialRequest,
  UpdateActivityPartialResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
  UpdateBookmarkRequest,
  UpdateBookmarkResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  UpdateFeedMembersRequest,
  UpdateFeedMembersResponse,
  UpdateFeedRequest,
  UpdateFeedResponse,
  UpdateFeedViewRequest,
  UpdateFeedViewResponse,
  UpdateFollowRequest,
  UpdateFollowResponse,
  UpdatePollOptionRequest,
  UpdatePollPartialRequest,
  UpdatePollRequest,
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
      fids: request?.fids,
      expires_at: request?.expires_at,
      id: request?.id,
      parent_id: request?.parent_id,
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
    >('POST', '/feeds/v3/activities', undefined, undefined, body);

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
    >('POST', '/feeds/v3/activities/batch', undefined, undefined, body);

    decoders.UpsertActivitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async removeActivities(
    request: DeleteActivitiesRequest,
  ): Promise<StreamResponse<DeleteActivitiesResponse>> {
    const body = {
      activity_ids: request?.activity_ids,
      hard_delete: request?.hard_delete,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteActivitiesResponse>
    >('POST', '/feeds/v3/activities/delete', undefined, undefined, body);

    decoders.DeleteActivitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryActivities(
    request?: QueryActivitiesRequest,
  ): Promise<StreamResponse<QueryActivitiesResponse>> {
    const body = {
      comment_limit: request?.comment_limit,
      comment_sort: request?.comment_sort,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryActivitiesResponse>
    >('POST', '/feeds/v3/activities/query', undefined, undefined, body);

    decoders.QueryActivitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteActivity(request: {
    activity_id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteActivityResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteActivityResponse>
    >('DELETE', '/feeds/v3/activities/{activity_id}', pathParams, queryParams);

    decoders.DeleteActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getActivity(request: {
    activity_id: string;
  }): Promise<StreamResponse<GetActivityResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetActivityResponse>
    >('GET', '/feeds/v3/activities/{activity_id}', pathParams, undefined);

    decoders.GetActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateActivityPartial(
    request: UpdateActivityPartialRequest & { activity_id: string },
  ): Promise<StreamResponse<UpdateActivityPartialResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
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
      '/feeds/v3/activities/{activity_id}',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateActivityPartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateActivity(
    request: UpdateActivityRequest & { activity_id: string },
  ): Promise<StreamResponse<UpdateActivityResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      expires_at: request?.expires_at,
      text: request?.text,
      user_id: request?.user_id,
      visibility: request?.visibility,
      attachments: request?.attachments,
      filter_tags: request?.filter_tags,
      interest_tags: request?.interest_tags,
      custom: request?.custom,
      location: request?.location,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateActivityResponse>
    >('PUT', '/feeds/v3/activities/{activity_id}', pathParams, undefined, body);

    decoders.UpdateActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteBookmark(request: {
    activity_id: string;
  }): Promise<StreamResponse<DeleteBookmarkResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteBookmarkResponse>
    >(
      'DELETE',
      '/feeds/v3/activities/{activity_id}/bookmarks',
      pathParams,
      undefined,
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
      feed_id: request?.feed_id,
      feed_type: request?.feed_type,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateBookmarkResponse>
    >(
      'PATCH',
      '/feeds/v3/activities/{activity_id}/bookmarks',
      pathParams,
      undefined,
      body,
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
      custom: request?.custom,
      new_folder: request?.new_folder,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddBookmarkResponse>
    >(
      'POST',
      '/feeds/v3/activities/{activity_id}/bookmarks',
      pathParams,
      undefined,
      body,
    );

    decoders.AddBookmarkResponse?.(response.body);

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
      '/feeds/v3/activities/{activity_id}/polls/{poll_id}/vote',
      pathParams,
      undefined,
      body,
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async removePollVote(request: {
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
      '/feeds/v3/activities/{activity_id}/polls/{poll_id}/vote/{vote_id}',
      pathParams,
      queryParams,
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async addReaction(
    request: AddReactionRequest & { activity_id: string },
  ): Promise<StreamResponse<AddReactionResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
    };
    const body = {
      type: request?.type,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddReactionResponse>
    >(
      'POST',
      '/feeds/v3/activities/{activity_id}/reactions',
      pathParams,
      undefined,
      body,
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
      '/feeds/v3/activities/{activity_id}/reactions/query',
      pathParams,
      undefined,
      body,
    );

    decoders.QueryActivityReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteActivityReaction(request: {
    activity_id: string;
    type: string;
  }): Promise<StreamResponse<DeleteActivityReactionResponse>> {
    const pathParams = {
      activity_id: request?.activity_id,
      type: request?.type,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteActivityReactionResponse>
    >(
      'DELETE',
      '/feeds/v3/activities/{activity_id}/reactions/{type}',
      pathParams,
      undefined,
    );

    decoders.DeleteActivityReactionResponse?.(response.body);

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
    >('GET', '/feeds/v3/comments', undefined, queryParams);

    decoders.GetCommentsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async addComment(
    request: AddCommentRequest,
  ): Promise<StreamResponse<AddCommentResponse>> {
    const body = {
      comment: request?.comment,
      object_id: request?.object_id,
      object_type: request?.object_type,
      parent_id: request?.parent_id,
      attachments: request?.attachments,
      mentioned_user_ids: request?.mentioned_user_ids,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddCommentResponse>
    >('POST', '/feeds/v3/comments', undefined, undefined, body);

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
    >('POST', '/feeds/v3/comments/batch', undefined, undefined, body);

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
    >('POST', '/feeds/v3/comments/query', undefined, undefined, body);

    decoders.QueryCommentsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteComment(request: {
    comment_id: string;
  }): Promise<StreamResponse<DeleteCommentResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteCommentResponse>
    >('DELETE', '/feeds/v3/comments/{comment_id}', pathParams, undefined);

    decoders.DeleteCommentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getComment(request: {
    comment_id: string;
  }): Promise<StreamResponse<GetCommentResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCommentResponse>
    >('GET', '/feeds/v3/comments/{comment_id}', pathParams, undefined);

    decoders.GetCommentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateComment(
    request: UpdateCommentRequest & { comment_id: string },
  ): Promise<StreamResponse<UpdateCommentResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
    };
    const body = {
      comment: request?.comment,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCommentResponse>
    >('PATCH', '/feeds/v3/comments/{comment_id}', pathParams, undefined, body);

    decoders.UpdateCommentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async addCommentReaction(
    request: AddCommentReactionRequest & { comment_id: string },
  ): Promise<StreamResponse<AddCommentReactionResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
    };
    const body = {
      type: request?.type,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddCommentReactionResponse>
    >(
      'POST',
      '/feeds/v3/comments/{comment_id}/reactions',
      pathParams,
      undefined,
      body,
    );

    decoders.AddCommentReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryCommentReactions(
    request: QueryCommentReactionsRequest & { comment_id: string },
  ): Promise<StreamResponse<QueryCommentReactionsResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
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
      '/feeds/v3/comments/{comment_id}/reactions/query',
      pathParams,
      undefined,
      body,
    );

    decoders.QueryCommentReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async removeCommentReaction(request: {
    comment_id: string;
    type: string;
  }): Promise<StreamResponse<DeleteCommentReactionResponse>> {
    const pathParams = {
      comment_id: request?.comment_id,
      type: request?.type,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteCommentReactionResponse>
    >(
      'DELETE',
      '/feeds/v3/comments/{comment_id}/reactions/{type}',
      pathParams,
      undefined,
    );

    decoders.DeleteCommentReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCommentReplies(request: {
    comment_id: string;
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
      comment_id: request?.comment_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCommentRepliesResponse>
    >(
      'GET',
      '/feeds/v3/comments/{comment_id}/replies',
      pathParams,
      queryParams,
    );

    decoders.GetCommentRepliesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createFeedGroup(
    request: CreateFeedGroupRequest,
  ): Promise<StreamResponse<CreateFeedGroupResponse>> {
    const body = {
      feed_group_id: request?.feed_group_id,
      activity_analysers: request?.activity_analysers,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      custom: request?.custom,
      notification: request?.notification,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateFeedGroupResponse>
    >('POST', '/feeds/v3/feed_groups', undefined, undefined, body);

    decoders.CreateFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteFeedGroup(request: {
    feed_group_id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteFeedGroupResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedGroupResponse>
    >(
      'DELETE',
      '/feeds/v3/feed_groups/{feed_group_id}',
      pathParams,
      queryParams,
    );

    decoders.DeleteFeedGroupResponse?.(response.body);

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
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}',
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
      comment_limit: request?.comment_limit,
      comment_sort: request?.comment_sort,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      view: request?.view,
      watch: request?.watch,
      data: request?.data,
      external_ranking: request?.external_ranking,
      filter: request?.filter,
      follower_pagination: request?.follower_pagination,
      following_pagination: request?.following_pagination,
      member_pagination: request?.member_pagination,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOrCreateFeedResponse>
    >(
      'POST',
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      undefined,
      body,
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
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}',
      pathParams,
      undefined,
      body,
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
      mark_watched: request?.mark_watched,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'POST',
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/mark/batch',
      pathParams,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unpinActivity(request: {
    feed_group_id: string;
    feed_id: string;
    activity_id: string;
  }): Promise<StreamResponse<UnpinActivityResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
      feed_id: request?.feed_id,
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnpinActivityResponse>
    >(
      'DELETE',
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/{activity_id}/pin',
      pathParams,
      undefined,
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
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}/activities/{activity_id}/pin',
      pathParams,
      undefined,
      body,
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
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}/members',
      pathParams,
      undefined,
      body,
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
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}/members/accept',
      pathParams,
      undefined,
      body,
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
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}/members/query',
      pathParams,
      undefined,
      body,
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
      '/feeds/v3/feed_groups/{feed_group_id}/feeds/{feed_id}/members/reject',
      pathParams,
      undefined,
      body,
    );

    decoders.RejectFeedMemberInviteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getFollowSuggestions(request: {
    feed_group_id: string;
    limit?: number;
  }): Promise<StreamResponse<GetFollowSuggestionsResponse>> {
    const queryParams = {
      limit: request?.limit,
    };
    const pathParams = {
      feed_group_id: request?.feed_group_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFollowSuggestionsResponse>
    >(
      'GET',
      '/feeds/v3/feed_groups/{feed_group_id}/follow_suggestions',
      pathParams,
      queryParams,
    );

    decoders.GetFollowSuggestionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createFeedView(
    request: CreateFeedViewRequest & { feed_group_id: string },
  ): Promise<StreamResponse<CreateFeedViewResponse>> {
    const pathParams = {
      feed_group_id: request?.feed_group_id,
    };
    const body = {
      view_id: request?.view_id,
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateFeedViewResponse>
    >(
      'POST',
      '/feeds/v3/feed_groups/{feed_group_id}/views',
      pathParams,
      undefined,
      body,
    );

    decoders.CreateFeedViewResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteFeedView(request: {
    view_id: string;
    feed_group_id: string;
  }): Promise<StreamResponse<DeleteFeedViewResponse>> {
    const pathParams = {
      view_id: request?.view_id,
      feed_group_id: request?.feed_group_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedViewResponse>
    >(
      'DELETE',
      '/feeds/v3/feed_groups/{feed_group_id}/views/{view_id}',
      pathParams,
      undefined,
    );

    decoders.DeleteFeedViewResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateFeedView(
    request: UpdateFeedViewRequest & { view_id: string; feed_group_id: string },
  ): Promise<StreamResponse<UpdateFeedViewResponse>> {
    const pathParams = {
      view_id: request?.view_id,
      feed_group_id: request?.feed_group_id,
    };
    const body = {
      activity_selectors: request?.activity_selectors,
      aggregation: request?.aggregation,
      ranking: request?.ranking,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedViewResponse>
    >(
      'PUT',
      '/feeds/v3/feed_groups/{feed_group_id}/views/{view_id}',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateFeedViewResponse?.(response.body);

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
    >('POST', '/feeds/v3/feeds/batch', undefined, undefined, body);

    decoders.CreateFeedsBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async feedsQueryFeeds(
    request?: QueryFeedsRequest,
  ): Promise<StreamResponse<QueryFeedsResponse>> {
    const body = {
      watch: request?.watch,
      sort: request?.sort,
      filter: request?.filter,
      pagination: request?.pagination,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryFeedsResponse>
    >('POST', '/feeds/v3/feeds/query', undefined, undefined, body);

    decoders.QueryFeedsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateFollow(
    request: UpdateFollowRequest,
  ): Promise<StreamResponse<UpdateFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      push_preference: request?.push_preference,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFollowResponse>
    >('PATCH', '/feeds/v3/follows', undefined, undefined, body);

    decoders.UpdateFollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async follow(
    request: SingleFollowRequest,
  ): Promise<StreamResponse<SingleFollowResponse>> {
    const body = {
      source: request?.source,
      target: request?.target,
      push_preference: request?.push_preference,
      custom: request?.custom,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SingleFollowResponse>
    >('POST', '/feeds/v3/follows', undefined, undefined, body);

    decoders.SingleFollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async acceptFollow(
    request: AcceptFollowRequest,
  ): Promise<StreamResponse<AcceptFollowResponse>> {
    const body = {
      source_fid: request?.source_fid,
      target_fid: request?.target_fid,
      follower_role: request?.follower_role,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AcceptFollowResponse>
    >('POST', '/feeds/v3/follows/accept', undefined, undefined, body);

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
    >('POST', '/feeds/v3/follows/batch', undefined, undefined, body);

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
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryFollowsResponse>
    >('POST', '/feeds/v3/follows/query', undefined, undefined, body);

    decoders.QueryFollowsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async rejectFollow(
    request: RejectFollowRequest,
  ): Promise<StreamResponse<RejectFollowResponse>> {
    const body = {
      source_fid: request?.source_fid,
      target_fid: request?.target_fid,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<RejectFollowResponse>
    >('POST', '/feeds/v3/follows/reject', undefined, undefined, body);

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
    >('DELETE', '/feeds/v3/follows/{source}/{target}', pathParams, undefined);

    decoders.UnfollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createPoll(
    request: CreatePollRequest,
  ): Promise<StreamResponse<PollResponse>> {
    const body = {
      name: request?.name,
      allow_answers: request?.allow_answers,
      allow_user_suggested_options: request?.allow_user_suggested_options,
      description: request?.description,
      enforce_unique_vote: request?.enforce_unique_vote,
      id: request?.id,
      is_closed: request?.is_closed,
      max_votes_allowed: request?.max_votes_allowed,
      user_id: request?.user_id,
      voting_visibility: request?.voting_visibility,
      options: request?.options,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >('POST', '/feeds/v3/polls', undefined, undefined, body);

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updatePoll(
    request: UpdatePollRequest,
  ): Promise<StreamResponse<PollResponse>> {
    const body = {
      id: request?.id,
      name: request?.name,
      allow_answers: request?.allow_answers,
      allow_user_suggested_options: request?.allow_user_suggested_options,
      description: request?.description,
      enforce_unique_vote: request?.enforce_unique_vote,
      is_closed: request?.is_closed,
      max_votes_allowed: request?.max_votes_allowed,
      user_id: request?.user_id,
      voting_visibility: request?.voting_visibility,
      options: request?.options,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >('PUT', '/feeds/v3/polls', undefined, undefined, body);

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryPolls(
    request?: QueryPollsRequest & { user_id?: string },
  ): Promise<StreamResponse<QueryPollsResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryPollsResponse>
    >('POST', '/feeds/v3/polls/query', undefined, queryParams, body);

    decoders.QueryPollsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deletePoll(request: {
    poll_id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/feeds/v3/polls/{poll_id}',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getPoll(request: {
    poll_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >('GET', '/feeds/v3/polls/{poll_id}', pathParams, queryParams);

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updatePollPartial(
    request: UpdatePollPartialRequest & { poll_id: string },
  ): Promise<StreamResponse<PollResponse>> {
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollResponse>
    >('PATCH', '/feeds/v3/polls/{poll_id}', pathParams, undefined, body);

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createPollOption(
    request: CreatePollOptionRequest & { poll_id: string },
  ): Promise<StreamResponse<PollOptionResponse>> {
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      text: request?.text,
      position: request?.position,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollOptionResponse>
    >('POST', '/feeds/v3/polls/{poll_id}/options', pathParams, undefined, body);

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updatePollOption(
    request: UpdatePollOptionRequest & { poll_id: string },
  ): Promise<StreamResponse<PollOptionResponse>> {
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      id: request?.id,
      text: request?.text,
      user_id: request?.user_id,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollOptionResponse>
    >('PUT', '/feeds/v3/polls/{poll_id}/options', pathParams, undefined, body);

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deletePollOption(request: {
    poll_id: string;
    option_id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
      option_id: request?.option_id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/feeds/v3/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getPollOption(request: {
    poll_id: string;
    option_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollOptionResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
      option_id: request?.option_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollOptionResponse>
    >(
      'GET',
      '/feeds/v3/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryPollVotes(
    request: QueryPollVotesRequest & { poll_id: string; user_id?: string },
  ): Promise<StreamResponse<PollVotesResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollVotesResponse>
    >('POST', '/feeds/v3/polls/{poll_id}/votes', pathParams, queryParams, body);

    decoders.PollVotesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unfollowBatch(
    request: UnfollowBatchRequest,
  ): Promise<StreamResponse<UnfollowBatchResponse>> {
    const body = {
      follows: request?.follows,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnfollowBatchResponse>
    >('POST', '/feeds/v3/unfollow/batch', undefined, undefined, body);

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
    >('DELETE', '/feeds/v3/users/{user_id}/delete', pathParams, undefined);

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
    >('POST', '/feeds/v3/users/{user_id}/export', pathParams, undefined);

    decoders.ExportFeedUserDataResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}
