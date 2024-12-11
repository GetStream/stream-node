import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  AddActivityRequest,
  AddActivityResponse,
  DeleteFeedGroupResponse,
  DeleteFeedResponse,
  FollowRequest,
  FollowResponse,
  GetFeedGroupsResponse,
  GetFeedResponse,
  GetFollowedFeedsResponse,
  GetFollowingFeedsResponse,
  GetOrCreateFeedRequest,
  GetOrCreateFeedResponse,
  QueryActivitiesRequest,
  QueryActivitiesResponse,
  QueryFeedsRequest,
  QueryFeedsResponse,
  QueryReactionsRequest,
  QueryReactionsResponse,
  ReadFlatFeedResponse,
  ReadNotificationFeedResponse,
  RemoveActivityFromFeedResponse,
  SendReactionRequest,
  SendReactionResponse,
  UnfollowRequest,
  UnfollowResponse,
  UpdateFeedMembersRequest,
  UpdateFeedMembersResponse,
  UpdateFeedRequest,
  UpdateFeedResponse,
  UpsertFeedGroupRequest,
  UpsertFeedGroupResponse,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class FeedsApi {
  constructor(public readonly apiClient: ApiClient) {}

  queryActivities = async (
    request?: QueryActivitiesRequest,
  ): Promise<StreamResponse<QueryActivitiesResponse>> => {
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
      StreamResponse<QueryActivitiesResponse>
    >('POST', '/api/v2/feeds/activities/query', undefined, undefined, body);

    decoders.QueryActivitiesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  feedsSendReaction = async (
    request: SendReactionRequest & { id: string },
  ): Promise<StreamResponse<SendReactionResponse>> => {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      reaction: request?.reaction,
      enforce_unique: request?.enforce_unique,
      skip_push: request?.skip_push,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SendReactionResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/{id}/reactions',
      pathParams,
      undefined,
      body,
    );

    decoders.SendReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  feedsQueryReactions = async (
    request: QueryReactionsRequest & { id: string },
  ): Promise<StreamResponse<QueryReactionsResponse>> => {
    const pathParams = {
      id: request?.id,
    };
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
      StreamResponse<QueryReactionsResponse>
    >(
      'POST',
      '/api/v2/feeds/activities/{id}/reactions/query',
      pathParams,
      undefined,
      body,
    );

    decoders.QueryReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getFeedGroups = async (): Promise<StreamResponse<GetFeedGroupsResponse>> => {
    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFeedGroupsResponse>
    >('GET', '/api/v2/feeds/feedgroups', undefined, undefined);

    decoders.GetFeedGroupsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteFeedGroup = async (request?: {
    user_id?: string;
  }): Promise<StreamResponse<DeleteFeedGroupResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedGroupResponse>
    >('DELETE', '/api/v2/feeds/feedgroups/{group}', undefined, queryParams);

    decoders.DeleteFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  upsertFeedGroup = async (
    request: UpsertFeedGroupRequest & { user_id?: string },
  ): Promise<StreamResponse<UpsertFeedGroupResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const body = {
      feed_group: request?.feed_group,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpsertFeedGroupResponse>
    >('POST', '/api/v2/feeds/feedgroups/{group}', undefined, queryParams, body);

    decoders.UpsertFeedGroupResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryFeeds = async (
    request?: QueryFeedsRequest,
  ): Promise<StreamResponse<QueryFeedsResponse>> => {
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
      StreamResponse<QueryFeedsResponse>
    >('POST', '/api/v2/feeds/feeds/query', undefined, undefined, body);

    decoders.QueryFeedsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteFeed = async (request: {
    group: string;
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteFeedResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteFeedResponse>
    >('DELETE', '/api/v2/feeds/feeds/{group}/{id}', pathParams, queryParams);

    decoders.DeleteFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getFeed = async (request: {
    group: string;
    id: string;
    user_id?: string;
  }): Promise<StreamResponse<GetFeedResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFeedResponse>
    >('GET', '/api/v2/feeds/feeds/{group}/{id}', pathParams, queryParams);

    decoders.GetFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateFeed = async (
    request: UpdateFeedRequest & { group: string; id: string },
  ): Promise<StreamResponse<UpdateFeedResponse>> => {
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };
    const body = {
      accept_invite: request?.accept_invite,
      reject_invite: request?.reject_invite,
      user_id: request?.user_id,
      add_members: request?.add_members,
      assign_roles: request?.assign_roles,
      invites: request?.invites,
      remove_members: request?.remove_members,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedResponse>
    >('PATCH', '/api/v2/feeds/feeds/{group}/{id}', pathParams, undefined, body);

    decoders.UpdateFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getOrCreateFeed = async (
    request: GetOrCreateFeedRequest & { group: string; id: string },
  ): Promise<StreamResponse<GetOrCreateFeedResponse>> => {
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      visibility_level: request?.visibility_level,
      invites: request?.invites,
      members: request?.members,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetOrCreateFeedResponse>
    >('POST', '/api/v2/feeds/feeds/{group}/{id}', pathParams, undefined, body);

    decoders.GetOrCreateFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  addActivity = async (
    request: AddActivityRequest & { group: string; id: string },
  ): Promise<StreamResponse<AddActivityResponse>> => {
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };
    const body = {
      object: request?.object,
      verb: request?.verb,
      public: request?.public,
      user_id: request?.user_id,
      to_targets: request?.to_targets,
      custom: request?.custom,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<AddActivityResponse>
    >(
      'POST',
      '/api/v2/feeds/feeds/{group}/{id}/add_activity',
      pathParams,
      undefined,
      body,
    );

    decoders.AddActivityResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  readFlatFeed = async (request: {
    group: string;
    id: string;
    limit: number;
    offset: number;
  }): Promise<StreamResponse<ReadFlatFeedResponse>> => {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
    };
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ReadFlatFeedResponse>
    >('GET', '/api/v2/feeds/feeds/{group}/{id}/flat', pathParams, queryParams);

    decoders.ReadFlatFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  follow = async (
    request: FollowRequest & { group: string; id: string },
  ): Promise<StreamResponse<FollowResponse>> => {
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };
    const body = {
      target_group: request?.target_group,
      target_id: request?.target_id,
      activity_copy_limit: request?.activity_copy_limit,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<FollowResponse>
    >(
      'POST',
      '/api/v2/feeds/feeds/{group}/{id}/follow',
      pathParams,
      undefined,
      body,
    );

    decoders.FollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getFollowingFeeds = async (request: {
    group: string;
    id: string;
    limit: number;
    offset: number;
    user_id?: string;
  }): Promise<StreamResponse<GetFollowingFeedsResponse>> => {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
      user_id: request?.user_id,
    };
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFollowingFeedsResponse>
    >(
      'GET',
      '/api/v2/feeds/feeds/{group}/{id}/followers',
      pathParams,
      queryParams,
    );

    decoders.GetFollowingFeedsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getFollowedFeeds = async (request: {
    group: string;
    id: string;
    limit: number;
    offset: number;
    user_id?: string;
    filter?: string[];
  }): Promise<StreamResponse<GetFollowedFeedsResponse>> => {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
      user_id: request?.user_id,
      filter: request?.filter,
    };
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetFollowedFeedsResponse>
    >(
      'GET',
      '/api/v2/feeds/feeds/{group}/{id}/following',
      pathParams,
      queryParams,
    );

    decoders.GetFollowedFeedsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateFeedMembers = async (
    request: UpdateFeedMembersRequest & { group: string; id: string },
  ): Promise<StreamResponse<UpdateFeedMembersResponse>> => {
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      remove_members: request?.remove_members,
      update_members: request?.update_members,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateFeedMembersResponse>
    >(
      'POST',
      '/api/v2/feeds/feeds/{group}/{id}/members',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateFeedMembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  readNotificationFeed = async (request: {
    group: string;
    id: string;
    limit: number;
    offset: number;
    mark_seen?: string;
    mark_read?: string;
  }): Promise<StreamResponse<ReadNotificationFeedResponse>> => {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
      mark_seen: request?.mark_seen,
      mark_read: request?.mark_read,
    };
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ReadNotificationFeedResponse>
    >(
      'GET',
      '/api/v2/feeds/feeds/{group}/{id}/notification',
      pathParams,
      queryParams,
    );

    decoders.ReadNotificationFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unfollow = async (
    request: UnfollowRequest & { group: string; id: string },
  ): Promise<StreamResponse<UnfollowResponse>> => {
    const pathParams = {
      group: request?.group,
      id: request?.id,
    };
    const body = {
      target_group: request?.target_group,
      target_id: request?.target_id,
      keep_history: request?.keep_history,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnfollowResponse>
    >(
      'POST',
      '/api/v2/feeds/feeds/{group}/{id}/unfollow',
      pathParams,
      undefined,
      body,
    );

    decoders.UnfollowResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  removeActivityFromFeed = async (request: {
    group: string;
    id: string;
    activity_id: string;
    user_id?: string;
  }): Promise<StreamResponse<RemoveActivityFromFeedResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      group: request?.group,
      id: request?.id,
      activity_id: request?.activity_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<RemoveActivityFromFeedResponse>
    >(
      'DELETE',
      '/api/v2/feeds/feeds/{group}/{id}/{activity_id}',
      pathParams,
      queryParams,
    );

    decoders.RemoveActivityFromFeedResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };
}
