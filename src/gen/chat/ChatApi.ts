import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  AddSegmentTargetsRequest,
  CampaignResponse,
  CastPollVoteRequest,
  ChannelBatchUpdateRequest,
  ChannelBatchUpdateResponse,
  ChannelGetOrCreateRequest,
  ChannelStateResponse,
  CommitMessageRequest,
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateChannelTypeRequest,
  CreateChannelTypeResponse,
  CreateCommandRequest,
  CreateCommandResponse,
  CreatePredefinedFilterRequest,
  CreatePredefinedFilterResponse,
  CreateReminderRequest,
  CreateReminderResponse,
  CreateSegmentRequest,
  CreateSegmentResponse,
  DeleteCampaignResponse,
  DeleteChannelResponse,
  DeleteChannelsRequest,
  DeleteChannelsResponse,
  DeleteCommandResponse,
  DeleteMessageResponse,
  DeleteReactionResponse,
  DeleteReminderResponse,
  DeleteRetentionPolicyRequest,
  DeleteRetentionPolicyResponse,
  DeleteSegmentTargetsRequest,
  EventResponse,
  ExportChannelsRequest,
  ExportChannelsResponse,
  GetCampaignResponse,
  GetChannelTypeResponse,
  GetCommandResponse,
  GetDraftResponse,
  GetManyMessagesResponse,
  GetMessageResponse,
  GetPinnedMessagesResponse,
  GetPredefinedFilterResponse,
  GetReactionsResponse,
  GetRepliesResponse,
  GetRetentionPolicyResponse,
  GetRetentionPolicyRunsRequest,
  GetRetentionPolicyRunsResponse,
  GetSegmentResponse,
  GetThreadResponse,
  GroupedQueryChannelsRequest,
  GroupedQueryChannelsResponse,
  HideChannelRequest,
  HideChannelResponse,
  ListChannelTypesResponse,
  ListCommandsResponse,
  MarkChannelsReadRequest,
  MarkDeliveredRequest,
  MarkDeliveredResponse,
  MarkReadRequest,
  MarkReadResponse,
  MarkUnreadRequest,
  MembersResponse,
  MessageActionRequest,
  MessageActionResponse,
  MuteChannelRequest,
  MuteChannelResponse,
  PollVoteResponse,
  QueryBannedUsersPayload,
  QueryBannedUsersResponse,
  QueryCampaignsRequest,
  QueryCampaignsResponse,
  QueryChannelsRequest,
  QueryChannelsResponse,
  QueryDraftsRequest,
  QueryDraftsResponse,
  QueryFutureChannelBansPayload,
  QueryFutureChannelBansResponse,
  QueryMembersPayload,
  QueryMessageFlagsPayload,
  QueryMessageFlagsResponse,
  QueryMessageHistoryRequest,
  QueryMessageHistoryResponse,
  QueryPredefinedFiltersResponse,
  QueryReactionsRequest,
  QueryReactionsResponse,
  QueryRemindersRequest,
  QueryRemindersResponse,
  QuerySegmentTargetsRequest,
  QuerySegmentTargetsResponse,
  QuerySegmentsRequest,
  QuerySegmentsResponse,
  QueryTeamUsageStatsRequest,
  QueryTeamUsageStatsResponse,
  QueryThreadsRequest,
  QueryThreadsResponse,
  Response,
  SearchPayload,
  SearchResponse,
  SendEventRequest,
  SendMessageRequest,
  SendMessageResponse,
  SendReactionRequest,
  SendReactionResponse,
  SendUserCustomEventRequest,
  SetRetentionPolicyRequest,
  SetRetentionPolicyResponse,
  ShowChannelRequest,
  ShowChannelResponse,
  SortParamRequest,
  StartCampaignRequest,
  StartCampaignResponse,
  StopCampaignRequest,
  TranslateMessageRequest,
  TranslateMessageResponse,
  TruncateChannelRequest,
  TruncateChannelResponse,
  UndeleteMessageRequest,
  UndeleteMessageResponse,
  UnmuteChannelRequest,
  UnmuteResponse,
  UnreadCountsBatchRequest,
  UnreadCountsBatchResponse,
  UpdateCampaignRequest,
  UpdateChannelPartialRequest,
  UpdateChannelPartialResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelTypeRequest,
  UpdateChannelTypeResponse,
  UpdateCommandRequest,
  UpdateCommandResponse,
  UpdateMemberPartialRequest,
  UpdateMemberPartialResponse,
  UpdateMessagePartialRequest,
  UpdateMessagePartialResponse,
  UpdateMessageRequest,
  UpdateMessageResponse,
  UpdatePredefinedFilterRequest,
  UpdatePredefinedFilterResponse,
  UpdateReminderRequest,
  UpdateReminderResponse,
  UpdateSegmentRequest,
  UpdateSegmentResponse,
  UpdateThreadPartialRequest,
  UpdateThreadPartialResponse,
  UploadChannelFileRequest,
  UploadChannelFileResponse,
  UploadChannelRequest,
  UploadChannelResponse,
  WrappedUnreadCountsResponse,
} from '../models';
import { decoders } from '../model-decoders/decoders';

export class ChatApi {
  constructor(public readonly apiClient: ApiClient) {}

  async createCampaign(
    request: CreateCampaignRequest,
  ): Promise<StreamResponse<CreateCampaignResponse>> {
    const body = {
      sender_id: request?.sender_id,
      message_template: request?.message_template,
      create_channels: request?.create_channels,
      description: request?.description,
      id: request?.id,
      name: request?.name,
      sender_mode: request?.sender_mode,
      sender_visibility: request?.sender_visibility,
      show_channels: request?.show_channels,
      skip_push: request?.skip_push,
      skip_webhook: request?.skip_webhook,
      segment_ids: request?.segment_ids,
      user_ids: request?.user_ids,
      channel_template: request?.channel_template,
    };

    const response = await this.apiClient.sendRequest<CreateCampaignResponse>(
      'POST',
      '/api/v2/chat/campaigns',
      undefined,
      undefined,
      body,
    );

    decoders['CreateCampaignResponse']?.(response);

    return response;
  }

  async queryCampaigns(
    request?: QueryCampaignsRequest,
  ): Promise<StreamResponse<QueryCampaignsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_limit: request?.user_limit,
      sort: request?.sort,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<QueryCampaignsResponse>(
      'POST',
      '/api/v2/chat/campaigns/query',
      undefined,
      undefined,
      body,
    );

    decoders['QueryCampaignsResponse']?.(response);

    return response;
  }

  async deleteCampaign(request: {
    id: string;
  }): Promise<StreamResponse<DeleteCampaignResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteCampaignResponse>(
      'DELETE',
      '/api/v2/chat/campaigns/{id}',
      pathParams,
      undefined,
    );

    decoders['DeleteCampaignResponse']?.(response);

    return response;
  }

  async getCampaign(request: {
    id: string;
    prev?: string;
    next?: string;
    limit?: number;
  }): Promise<StreamResponse<GetCampaignResponse>> {
    const queryParams = {
      prev: request?.prev,
      next: request?.next,
      limit: request?.limit,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetCampaignResponse>(
      'GET',
      '/api/v2/chat/campaigns/{id}',
      pathParams,
      queryParams,
    );

    decoders['GetCampaignResponse']?.(response);

    return response;
  }

  async updateCampaign(
    request: UpdateCampaignRequest & { id: string },
  ): Promise<StreamResponse<CampaignResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      sender_id: request?.sender_id,
      message_template: request?.message_template,
      create_channels: request?.create_channels,
      description: request?.description,
      id: request?.id,
      name: request?.name,
      sender_mode: request?.sender_mode,
      sender_visibility: request?.sender_visibility,
      show_channels: request?.show_channels,
      skip_push: request?.skip_push,
      skip_webhook: request?.skip_webhook,
      segment_ids: request?.segment_ids,
      user_ids: request?.user_ids,
      channel_template: request?.channel_template,
    };

    const response = await this.apiClient.sendRequest<CampaignResponse>(
      'PUT',
      '/api/v2/chat/campaigns/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['CampaignResponse']?.(response);

    return response;
  }

  async startCampaign(
    request: StartCampaignRequest & { id: string },
  ): Promise<StreamResponse<StartCampaignResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      scheduled_for: request?.scheduled_for,
      stop_at: request?.stop_at,
    };

    const response = await this.apiClient.sendRequest<StartCampaignResponse>(
      'POST',
      '/api/v2/chat/campaigns/{id}/start',
      pathParams,
      undefined,
      body,
    );

    decoders['StartCampaignResponse']?.(response);

    return response;
  }

  async stopCampaign(
    request: StopCampaignRequest & { id: string },
  ): Promise<StreamResponse<CampaignResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {};

    const response = await this.apiClient.sendRequest<CampaignResponse>(
      'POST',
      '/api/v2/chat/campaigns/{id}/stop',
      pathParams,
      undefined,
      body,
    );

    decoders['CampaignResponse']?.(response);

    return response;
  }

  async queryChannels(
    request?: QueryChannelsRequest,
  ): Promise<StreamResponse<QueryChannelsResponse>> {
    const body = {
      limit: request?.limit,
      member_limit: request?.member_limit,
      message_limit: request?.message_limit,
      offset: request?.offset,
      predefined_filter: request?.predefined_filter,
      state: request?.state,
      user_id: request?.user_id,
      member_custom_include: request?.member_custom_include,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
      filter_values: request?.filter_values,
      sort_values: request?.sort_values,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryChannelsResponse>(
      'POST',
      '/api/v2/chat/channels',
      undefined,
      undefined,
      body,
    );

    decoders['QueryChannelsResponse']?.(response);

    return response;
  }

  async channelBatchUpdate(
    request: ChannelBatchUpdateRequest,
  ): Promise<StreamResponse<ChannelBatchUpdateResponse>> {
    const body = {
      operation: request?.operation,
      filter: request?.filter,
      hide_history_before: request?.hide_history_before,
      synchronous: request?.synchronous,
      custom_unset: request?.custom_unset,
      members: request?.members,
      custom_set: request?.custom_set,
      data: request?.data,
    };

    const response =
      await this.apiClient.sendRequest<ChannelBatchUpdateResponse>(
        'PUT',
        '/api/v2/chat/channels/batch',
        undefined,
        undefined,
        body,
      );

    decoders['ChannelBatchUpdateResponse']?.(response);

    return response;
  }

  async deleteChannels(
    request: DeleteChannelsRequest,
  ): Promise<StreamResponse<DeleteChannelsResponse>> {
    const body = {
      cids: request?.cids,
      hard_delete: request?.hard_delete,
      skip_truncate: request?.skip_truncate,
    };

    const response = await this.apiClient.sendRequest<DeleteChannelsResponse>(
      'POST',
      '/api/v2/chat/channels/delete',
      undefined,
      undefined,
      body,
    );

    decoders['DeleteChannelsResponse']?.(response);

    return response;
  }

  async markDelivered(
    request?: MarkDeliveredRequest & { user_id?: string },
  ): Promise<StreamResponse<MarkDeliveredResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const body = {
      latest_delivered_messages: request?.latest_delivered_messages,
    };

    const response = await this.apiClient.sendRequest<MarkDeliveredResponse>(
      'POST',
      '/api/v2/chat/channels/delivered',
      undefined,
      queryParams,
      body,
    );

    decoders['MarkDeliveredResponse']?.(response);

    return response;
  }

  async groupedQueryChannels(
    request?: GroupedQueryChannelsRequest,
  ): Promise<StreamResponse<GroupedQueryChannelsResponse>> {
    const body = {
      limit: request?.limit,
      user_id: request?.user_id,
      groups: request?.groups,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<GroupedQueryChannelsResponse>(
        'POST',
        '/api/v2/chat/channels/grouped',
        undefined,
        undefined,
        body,
      );

    decoders['GroupedQueryChannelsResponse']?.(response);

    return response;
  }

  async markChannelsRead(
    request?: MarkChannelsReadRequest,
  ): Promise<StreamResponse<MarkReadResponse>> {
    const body = {
      user_id: request?.user_id,
      read_by_channel: request?.read_by_channel,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<MarkReadResponse>(
      'POST',
      '/api/v2/chat/channels/read',
      undefined,
      undefined,
      body,
    );

    decoders['MarkReadResponse']?.(response);

    return response;
  }

  async getOrCreateDistinctChannel(
    request: ChannelGetOrCreateRequest & { type: string },
  ): Promise<StreamResponse<ChannelStateResponse>> {
    const pathParams = {
      type: request?.type,
    };
    const body = {
      hide_for_creator: request?.hide_for_creator,
      state: request?.state,
      thread_unread_counts: request?.thread_unread_counts,
      member_custom_include: request?.member_custom_include,
      data: request?.data,
      members: request?.members,
      messages: request?.messages,
      watchers: request?.watchers,
    };

    const response = await this.apiClient.sendRequest<ChannelStateResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/query',
      pathParams,
      undefined,
      body,
    );

    decoders['ChannelStateResponse']?.(response);

    return response;
  }

  async deleteChannel(request: {
    type: string;
    id: string;
    hard_delete?: boolean;
    skip_truncate?: boolean;
  }): Promise<StreamResponse<DeleteChannelResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
      skip_truncate: request?.skip_truncate,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteChannelResponse>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}',
      pathParams,
      queryParams,
    );

    decoders['DeleteChannelResponse']?.(response);

    return response;
  }

  async getChannel(request: {
    type: string;
    id: string;
    state?: boolean;
    messages_limit?: number;
    members_limit?: number;
    watchers_limit?: number;
    messages_id_lt?: string;
    messages_id_lte?: string;
    messages_id_gt?: string;
    messages_id_gte?: string;
    messages_id_around?: string;
    user_id?: string;
  }): Promise<StreamResponse<ChannelStateResponse>> {
    const queryParams = {
      state: request?.state,
      messages_limit: request?.messages_limit,
      members_limit: request?.members_limit,
      watchers_limit: request?.watchers_limit,
      messages_id_lt: request?.messages_id_lt,
      messages_id_lte: request?.messages_id_lte,
      messages_id_gt: request?.messages_id_gt,
      messages_id_gte: request?.messages_id_gte,
      messages_id_around: request?.messages_id_around,
      user_id: request?.user_id,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<ChannelStateResponse>(
      'GET',
      '/api/v2/chat/channels/{type}/{id}',
      pathParams,
      queryParams,
    );

    decoders['ChannelStateResponse']?.(response);

    return response;
  }

  async updateChannelPartial(
    request: UpdateChannelPartialRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateChannelPartialResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateChannelPartialResponse>(
        'PATCH',
        '/api/v2/chat/channels/{type}/{id}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateChannelPartialResponse']?.(response);

    return response;
  }

  async updateChannel(
    request: UpdateChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateChannelResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      accept_invite: request?.accept_invite,
      cooldown: request?.cooldown,
      hide_history: request?.hide_history,
      hide_history_before: request?.hide_history_before,
      reject_invite: request?.reject_invite,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      add_filter_tags: request?.add_filter_tags,
      add_members: request?.add_members,
      add_moderators: request?.add_moderators,
      assign_roles: request?.assign_roles,
      demote_moderators: request?.demote_moderators,
      invites: request?.invites,
      remove_filter_tags: request?.remove_filter_tags,
      remove_members: request?.remove_members,
      data: request?.data,
      message: request?.message,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UpdateChannelResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateChannelResponse']?.(response);

    return response;
  }

  async deleteDraft(request: {
    type: string;
    id: string;
    parent_id?: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      parent_id: request?.parent_id,
      user_id: request?.user_id,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/draft',
      pathParams,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getDraft(request: {
    type: string;
    id: string;
    parent_id?: string;
    user_id?: string;
  }): Promise<StreamResponse<GetDraftResponse>> {
    const queryParams = {
      parent_id: request?.parent_id,
      user_id: request?.user_id,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetDraftResponse>(
      'GET',
      '/api/v2/chat/channels/{type}/{id}/draft',
      pathParams,
      queryParams,
    );

    decoders['GetDraftResponse']?.(response);

    return response;
  }

  async sendEvent(
    request: SendEventRequest & { type: string; id: string },
  ): Promise<StreamResponse<EventResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      event: request?.event,
    };

    const response = await this.apiClient.sendRequest<EventResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/event',
      pathParams,
      undefined,
      body,
    );

    decoders['EventResponse']?.(response);

    return response;
  }

  async deleteChannelFile(request: {
    type: string;
    id: string;
    url?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      url: request?.url,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/file',
      pathParams,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
  }

  async uploadChannelFile(
    request: UploadChannelFileRequest & { type: string; id: string },
  ): Promise<StreamResponse<UploadChannelFileResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      file: request?.file,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UploadChannelFileResponse>(
        'POST',
        '/api/v2/chat/channels/{type}/{id}/file',
        pathParams,
        undefined,
        body,
        'multipart/form-data',
      );

    decoders['UploadChannelFileResponse']?.(response);

    return response;
  }

  async hideChannel(
    request: HideChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<HideChannelResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      clear_history: request?.clear_history,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<HideChannelResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/hide',
      pathParams,
      undefined,
      body,
    );

    decoders['HideChannelResponse']?.(response);

    return response;
  }

  async deleteChannelImage(request: {
    type: string;
    id: string;
    url?: string;
  }): Promise<StreamResponse<Response>> {
    const queryParams = {
      url: request?.url,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/image',
      pathParams,
      queryParams,
    );

    decoders['Response']?.(response);

    return response;
  }

  async uploadChannelImage(
    request: UploadChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<UploadChannelResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      file: request?.file,
      upload_sizes: request?.upload_sizes,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UploadChannelResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/image',
      pathParams,
      undefined,
      body,
      'multipart/form-data',
    );

    decoders['UploadChannelResponse']?.(response);

    return response;
  }

  async updateMemberPartial(
    request: UpdateMemberPartialRequest & {
      type: string;
      id: string;
      user_id?: string;
    },
  ): Promise<StreamResponse<UpdateMemberPartialResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      unset: request?.unset,
      set: request?.set,
    };

    const response =
      await this.apiClient.sendRequest<UpdateMemberPartialResponse>(
        'PATCH',
        '/api/v2/chat/channels/{type}/{id}/member',
        pathParams,
        queryParams,
        body,
      );

    decoders['UpdateMemberPartialResponse']?.(response);

    return response;
  }

  async sendMessage(
    request: SendMessageRequest & { type: string; id: string },
  ): Promise<StreamResponse<SendMessageResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      message: request?.message,
      force_moderation: request?.force_moderation,
      include_channel_context: request?.include_channel_context,
      include_mentioned_members: request?.include_mentioned_members,
      keep_channel_hidden: request?.keep_channel_hidden,
      pending: request?.pending,
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      pending_message_metadata: request?.pending_message_metadata,
    };

    const response = await this.apiClient.sendRequest<SendMessageResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/message',
      pathParams,
      undefined,
      body,
    );

    decoders['SendMessageResponse']?.(response);

    return response;
  }

  async getManyMessages(request: {
    type: string;
    id: string;
    ids: Array<string>;
    member_custom_include?: Array<string>;
  }): Promise<StreamResponse<GetManyMessagesResponse>> {
    const queryParams = {
      ids: request?.ids,
      member_custom_include: request?.member_custom_include,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetManyMessagesResponse>(
      'GET',
      '/api/v2/chat/channels/{type}/{id}/messages',
      pathParams,
      queryParams,
    );

    decoders['GetManyMessagesResponse']?.(response);

    return response;
  }

  async getPinnedMessages(request: {
    type: string;
    id: string;
    limit?: number;
    offset?: number;
    id_gte?: string;
    id_gt?: string;
    id_lte?: string;
    id_lt?: string;
    pinned_at_after_or_equal?: Date;
    pinned_at_after?: Date;
    pinned_at_before_or_equal?: Date;
    pinned_at_before?: Date;
    id_around?: string;
    pinned_at_around?: Date;
    user_id?: string;
    sort?: Array<SortParamRequest>;
    member_custom_include?: Array<string>;
  }): Promise<StreamResponse<GetPinnedMessagesResponse>> {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
      id_gte: request?.id_gte,
      id_gt: request?.id_gt,
      id_lte: request?.id_lte,
      id_lt: request?.id_lt,
      pinned_at_after_or_equal: request?.pinned_at_after_or_equal,
      pinned_at_after: request?.pinned_at_after,
      pinned_at_before_or_equal: request?.pinned_at_before_or_equal,
      pinned_at_before: request?.pinned_at_before,
      id_around: request?.id_around,
      pinned_at_around: request?.pinned_at_around,
      user_id: request?.user_id,
      sort: request?.sort,
      member_custom_include: request?.member_custom_include,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response =
      await this.apiClient.sendRequest<GetPinnedMessagesResponse>(
        'GET',
        '/api/v2/chat/channels/{type}/{id}/pinned_messages',
        pathParams,
        queryParams,
      );

    decoders['GetPinnedMessagesResponse']?.(response);

    return response;
  }

  async getOrCreateChannel(
    request: ChannelGetOrCreateRequest & { type: string; id: string },
  ): Promise<StreamResponse<ChannelStateResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      hide_for_creator: request?.hide_for_creator,
      state: request?.state,
      thread_unread_counts: request?.thread_unread_counts,
      member_custom_include: request?.member_custom_include,
      data: request?.data,
      members: request?.members,
      messages: request?.messages,
      watchers: request?.watchers,
    };

    const response = await this.apiClient.sendRequest<ChannelStateResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/query',
      pathParams,
      undefined,
      body,
    );

    decoders['ChannelStateResponse']?.(response);

    return response;
  }

  async markRead(
    request: MarkReadRequest & { type: string; id: string },
  ): Promise<StreamResponse<MarkReadResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      message_id: request?.message_id,
      thread_id: request?.thread_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<MarkReadResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/read',
      pathParams,
      undefined,
      body,
    );

    decoders['MarkReadResponse']?.(response);

    return response;
  }

  async showChannel(
    request: ShowChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<ShowChannelResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<ShowChannelResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/show',
      pathParams,
      undefined,
      body,
    );

    decoders['ShowChannelResponse']?.(response);

    return response;
  }

  async truncateChannel(
    request: TruncateChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<TruncateChannelResponse>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      hard_delete: request?.hard_delete,
      skip_push: request?.skip_push,
      truncated_at: request?.truncated_at,
      user_id: request?.user_id,
      member_ids: request?.member_ids,
      message: request?.message,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<TruncateChannelResponse>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/truncate',
      pathParams,
      undefined,
      body,
    );

    decoders['TruncateChannelResponse']?.(response);

    return response;
  }

  async markUnread(
    request: MarkUnreadRequest & { type: string; id: string },
  ): Promise<StreamResponse<Response>> {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      message_id: request?.message_id,
      message_timestamp: request?.message_timestamp,
      thread_id: request?.thread_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/unread',
      pathParams,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async listChannelTypes(): Promise<StreamResponse<ListChannelTypesResponse>> {
    const response = await this.apiClient.sendRequest<ListChannelTypesResponse>(
      'GET',
      '/api/v2/chat/channeltypes',
      undefined,
      undefined,
    );

    decoders['ListChannelTypesResponse']?.(response);

    return response;
  }

  async createChannelType(
    request: CreateChannelTypeRequest,
  ): Promise<StreamResponse<CreateChannelTypeResponse>> {
    const body = {
      automod: request?.automod,
      automod_behavior: request?.automod_behavior,
      max_message_length: request?.max_message_length,
      name: request?.name,
      blocklist: request?.blocklist,
      blocklist_behavior: request?.blocklist_behavior,
      connect_events: request?.connect_events,
      count_messages: request?.count_messages,
      custom_events: request?.custom_events,
      delivery_events: request?.delivery_events,
      mark_messages_pending: request?.mark_messages_pending,
      message_retention: request?.message_retention,
      mutes: request?.mutes,
      partition_size: request?.partition_size,
      partition_ttl: request?.partition_ttl,
      polls: request?.polls,
      push_level: request?.push_level,
      push_notifications: request?.push_notifications,
      reactions: request?.reactions,
      read_events: request?.read_events,
      replies: request?.replies,
      search: request?.search,
      shared_locations: request?.shared_locations,
      skip_last_msg_update_for_system_msgs:
        request?.skip_last_msg_update_for_system_msgs,
      typing_events: request?.typing_events,
      uploads: request?.uploads,
      url_enrichment: request?.url_enrichment,
      user_message_reminders: request?.user_message_reminders,
      blocklists: request?.blocklists,
      commands: request?.commands,
      permissions: request?.permissions,
      chat_preferences: request?.chat_preferences,
      grants: request?.grants,
    };

    const response =
      await this.apiClient.sendRequest<CreateChannelTypeResponse>(
        'POST',
        '/api/v2/chat/channeltypes',
        undefined,
        undefined,
        body,
      );

    decoders['CreateChannelTypeResponse']?.(response);

    return response;
  }

  async deleteChannelType(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/chat/channeltypes/{name}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getChannelType(request: {
    name: string;
  }): Promise<StreamResponse<GetChannelTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<GetChannelTypeResponse>(
      'GET',
      '/api/v2/chat/channeltypes/{name}',
      pathParams,
      undefined,
    );

    decoders['GetChannelTypeResponse']?.(response);

    return response;
  }

  async updateChannelType(
    request: UpdateChannelTypeRequest & { name: string },
  ): Promise<StreamResponse<UpdateChannelTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      automod: request?.automod,
      automod_behavior: request?.automod_behavior,
      max_message_length: request?.max_message_length,
      blocklist: request?.blocklist,
      blocklist_behavior: request?.blocklist_behavior,
      connect_events: request?.connect_events,
      count_messages: request?.count_messages,
      custom_events: request?.custom_events,
      delivery_events: request?.delivery_events,
      mark_messages_pending: request?.mark_messages_pending,
      message_retention: request?.message_retention,
      mutes: request?.mutes,
      partition_size: request?.partition_size,
      partition_ttl: request?.partition_ttl,
      polls: request?.polls,
      push_level: request?.push_level,
      push_notifications: request?.push_notifications,
      quotes: request?.quotes,
      reactions: request?.reactions,
      read_events: request?.read_events,
      reminders: request?.reminders,
      replies: request?.replies,
      search: request?.search,
      shared_locations: request?.shared_locations,
      skip_last_msg_update_for_system_msgs:
        request?.skip_last_msg_update_for_system_msgs,
      typing_events: request?.typing_events,
      uploads: request?.uploads,
      url_enrichment: request?.url_enrichment,
      user_message_reminders: request?.user_message_reminders,
      allowed_flag_reasons: request?.allowed_flag_reasons,
      blocklists: request?.blocklists,
      commands: request?.commands,
      permissions: request?.permissions,
      automod_thresholds: request?.automod_thresholds,
      chat_preferences: request?.chat_preferences,
      grants: request?.grants,
    };

    const response =
      await this.apiClient.sendRequest<UpdateChannelTypeResponse>(
        'PUT',
        '/api/v2/chat/channeltypes/{name}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateChannelTypeResponse']?.(response);

    return response;
  }

  async listCommands(): Promise<StreamResponse<ListCommandsResponse>> {
    const response = await this.apiClient.sendRequest<ListCommandsResponse>(
      'GET',
      '/api/v2/chat/commands',
      undefined,
      undefined,
    );

    decoders['ListCommandsResponse']?.(response);

    return response;
  }

  async createCommand(
    request: CreateCommandRequest,
  ): Promise<StreamResponse<CreateCommandResponse>> {
    const body = {
      description: request?.description,
      name: request?.name,
      args: request?.args,
      set: request?.set,
    };

    const response = await this.apiClient.sendRequest<CreateCommandResponse>(
      'POST',
      '/api/v2/chat/commands',
      undefined,
      undefined,
      body,
    );

    decoders['CreateCommandResponse']?.(response);

    return response;
  }

  async deleteCommand(request: {
    name: string;
  }): Promise<StreamResponse<DeleteCommandResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<DeleteCommandResponse>(
      'DELETE',
      '/api/v2/chat/commands/{name}',
      pathParams,
      undefined,
    );

    decoders['DeleteCommandResponse']?.(response);

    return response;
  }

  async getCommand(request: {
    name: string;
  }): Promise<StreamResponse<GetCommandResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<GetCommandResponse>(
      'GET',
      '/api/v2/chat/commands/{name}',
      pathParams,
      undefined,
    );

    decoders['GetCommandResponse']?.(response);

    return response;
  }

  async updateCommand(
    request: UpdateCommandRequest & { name: string },
  ): Promise<StreamResponse<UpdateCommandResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      description: request?.description,
      args: request?.args,
      set: request?.set,
    };

    const response = await this.apiClient.sendRequest<UpdateCommandResponse>(
      'PUT',
      '/api/v2/chat/commands/{name}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateCommandResponse']?.(response);

    return response;
  }

  async queryDrafts(
    request?: QueryDraftsRequest,
  ): Promise<StreamResponse<QueryDraftsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryDraftsResponse>(
      'POST',
      '/api/v2/chat/drafts/query',
      undefined,
      undefined,
      body,
    );

    decoders['QueryDraftsResponse']?.(response);

    return response;
  }

  async exportChannels(
    request: ExportChannelsRequest,
  ): Promise<StreamResponse<ExportChannelsResponse>> {
    const body = {
      channels: request?.channels,
      clear_deleted_message_text: request?.clear_deleted_message_text,
      export_users: request?.export_users,
      format: request?.format,
      include_soft_deleted_channels: request?.include_soft_deleted_channels,
      include_truncated_messages: request?.include_truncated_messages,
      version: request?.version,
      include_fields: request?.include_fields,
    };

    const response = await this.apiClient.sendRequest<ExportChannelsResponse>(
      'POST',
      '/api/v2/chat/export_channels',
      undefined,
      undefined,
      body,
    );

    decoders['ExportChannelsResponse']?.(response);

    return response;
  }

  async queryMembers(request?: {
    payload?: QueryMembersPayload;
  }): Promise<StreamResponse<MembersResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<MembersResponse>(
      'GET',
      '/api/v2/chat/members',
      undefined,
      queryParams,
    );

    decoders['MembersResponse']?.(response);

    return response;
  }

  async queryMessageHistory(
    request: QueryMessageHistoryRequest,
  ): Promise<StreamResponse<QueryMessageHistoryResponse>> {
    const body = {
      filter: request?.filter,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
    };

    const response =
      await this.apiClient.sendRequest<QueryMessageHistoryResponse>(
        'POST',
        '/api/v2/chat/messages/history',
        undefined,
        undefined,
        body,
      );

    decoders['QueryMessageHistoryResponse']?.(response);

    return response;
  }

  async deleteMessage(request: {
    id: string;
    hard?: boolean;
    deleted_by?: string;
    delete_for_me?: boolean;
  }): Promise<StreamResponse<DeleteMessageResponse>> {
    const queryParams = {
      hard: request?.hard,
      deleted_by: request?.deleted_by,
      delete_for_me: request?.delete_for_me,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<DeleteMessageResponse>(
      'DELETE',
      '/api/v2/chat/messages/{id}',
      pathParams,
      queryParams,
    );

    decoders['DeleteMessageResponse']?.(response);

    return response;
  }

  async getMessage(request: {
    id: string;
    show_deleted_message?: boolean;
  }): Promise<StreamResponse<GetMessageResponse>> {
    const queryParams = {
      show_deleted_message: request?.show_deleted_message,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetMessageResponse>(
      'GET',
      '/api/v2/chat/messages/{id}',
      pathParams,
      queryParams,
    );

    decoders['GetMessageResponse']?.(response);

    return response;
  }

  async updateMessage(
    request: UpdateMessageRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessageResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      message: request?.message,
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
    };

    const response = await this.apiClient.sendRequest<UpdateMessageResponse>(
      'POST',
      '/api/v2/chat/messages/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateMessageResponse']?.(response);

    return response;
  }

  async updateMessagePartial(
    request: UpdateMessagePartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessagePartialResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateMessagePartialResponse>(
        'PUT',
        '/api/v2/chat/messages/{id}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateMessagePartialResponse']?.(response);

    return response;
  }

  async runMessageAction(
    request: MessageActionRequest & { id: string },
  ): Promise<StreamResponse<MessageActionResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      form_data: request?.form_data,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<MessageActionResponse>(
      'POST',
      '/api/v2/chat/messages/{id}/action',
      pathParams,
      undefined,
      body,
    );

    decoders['MessageActionResponse']?.(response);

    return response;
  }

  async commitMessage(
    request: CommitMessageRequest & { id: string },
  ): Promise<StreamResponse<MessageActionResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {};

    const response = await this.apiClient.sendRequest<MessageActionResponse>(
      'POST',
      '/api/v2/chat/messages/{id}/commit',
      pathParams,
      undefined,
      body,
    );

    decoders['MessageActionResponse']?.(response);

    return response;
  }

  async ephemeralMessageUpdate(
    request: UpdateMessagePartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessagePartialResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateMessagePartialResponse>(
        'PATCH',
        '/api/v2/chat/messages/{id}/ephemeral',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateMessagePartialResponse']?.(response);

    return response;
  }

  async sendReaction(
    request: SendReactionRequest & { id: string },
  ): Promise<StreamResponse<SendReactionResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      reaction: request?.reaction,
      enforce_unique: request?.enforce_unique,
      skip_push: request?.skip_push,
    };

    const response = await this.apiClient.sendRequest<SendReactionResponse>(
      'POST',
      '/api/v2/chat/messages/{id}/reaction',
      pathParams,
      undefined,
      body,
    );

    decoders['SendReactionResponse']?.(response);

    return response;
  }

  async deleteReaction(request: {
    id: string;
    type: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteReactionResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      id: request?.id,
      type: request?.type,
    };

    const response = await this.apiClient.sendRequest<DeleteReactionResponse>(
      'DELETE',
      '/api/v2/chat/messages/{id}/reaction/{type}',
      pathParams,
      queryParams,
    );

    decoders['DeleteReactionResponse']?.(response);

    return response;
  }

  async getReactions(request: {
    id: string;
    limit?: number;
    offset?: number;
  }): Promise<StreamResponse<GetReactionsResponse>> {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetReactionsResponse>(
      'GET',
      '/api/v2/chat/messages/{id}/reactions',
      pathParams,
      queryParams,
    );

    decoders['GetReactionsResponse']?.(response);

    return response;
  }

  async queryReactions(
    request: QueryReactionsRequest & { id: string },
  ): Promise<StreamResponse<QueryReactionsResponse>> {
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

    const response = await this.apiClient.sendRequest<QueryReactionsResponse>(
      'POST',
      '/api/v2/chat/messages/{id}/reactions',
      pathParams,
      undefined,
      body,
    );

    decoders['QueryReactionsResponse']?.(response);

    return response;
  }

  async translateMessage(
    request: TranslateMessageRequest & { id: string },
  ): Promise<StreamResponse<TranslateMessageResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      language: request?.language,
    };

    const response = await this.apiClient.sendRequest<TranslateMessageResponse>(
      'POST',
      '/api/v2/chat/messages/{id}/translate',
      pathParams,
      undefined,
      body,
    );

    decoders['TranslateMessageResponse']?.(response);

    return response;
  }

  async undeleteMessage(
    request: UndeleteMessageRequest & { id: string },
  ): Promise<StreamResponse<UndeleteMessageResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      undeleted_by: request?.undeleted_by,
    };

    const response = await this.apiClient.sendRequest<UndeleteMessageResponse>(
      'POST',
      '/api/v2/chat/messages/{id}/undelete',
      pathParams,
      undefined,
      body,
    );

    decoders['UndeleteMessageResponse']?.(response);

    return response;
  }

  async castPollVote(
    request: CastPollVoteRequest & { message_id: string; poll_id: string },
  ): Promise<StreamResponse<PollVoteResponse>> {
    const pathParams = {
      message_id: request?.message_id,
      poll_id: request?.poll_id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
      vote: request?.vote,
    };

    const response = await this.apiClient.sendRequest<PollVoteResponse>(
      'POST',
      '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote',
      pathParams,
      undefined,
      body,
    );

    decoders['PollVoteResponse']?.(response);

    return response;
  }

  async deletePollVote(request: {
    message_id: string;
    poll_id: string;
    vote_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollVoteResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      message_id: request?.message_id,
      poll_id: request?.poll_id,
      vote_id: request?.vote_id,
    };

    const response = await this.apiClient.sendRequest<PollVoteResponse>(
      'DELETE',
      '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote/{vote_id}',
      pathParams,
      queryParams,
    );

    decoders['PollVoteResponse']?.(response);

    return response;
  }

  async deleteReminder(request: {
    message_id: string;
    user_id?: string;
  }): Promise<StreamResponse<DeleteReminderResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      message_id: request?.message_id,
    };

    const response = await this.apiClient.sendRequest<DeleteReminderResponse>(
      'DELETE',
      '/api/v2/chat/messages/{message_id}/reminders',
      pathParams,
      queryParams,
    );

    decoders['DeleteReminderResponse']?.(response);

    return response;
  }

  async updateReminder(
    request: UpdateReminderRequest & { message_id: string },
  ): Promise<StreamResponse<UpdateReminderResponse>> {
    const pathParams = {
      message_id: request?.message_id,
    };
    const body = {
      expires_at: request?.expires_at,
      remind_at: request?.remind_at,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UpdateReminderResponse>(
      'PATCH',
      '/api/v2/chat/messages/{message_id}/reminders',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateReminderResponse']?.(response);

    return response;
  }

  async createReminder(
    request: CreateReminderRequest & { message_id: string },
  ): Promise<StreamResponse<CreateReminderResponse>> {
    const pathParams = {
      message_id: request?.message_id,
    };
    const body = {
      expires_at: request?.expires_at,
      remind_at: request?.remind_at,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<CreateReminderResponse>(
      'POST',
      '/api/v2/chat/messages/{message_id}/reminders',
      pathParams,
      undefined,
      body,
    );

    decoders['CreateReminderResponse']?.(response);

    return response;
  }

  async getReplies(request: {
    parent_id: string;
    limit?: number;
    id_gte?: string;
    id_gt?: string;
    id_lte?: string;
    id_lt?: string;
    id_around?: string;
    sort?: Array<SortParamRequest>;
    member_custom_include?: Array<string>;
  }): Promise<StreamResponse<GetRepliesResponse>> {
    const queryParams = {
      limit: request?.limit,
      id_gte: request?.id_gte,
      id_gt: request?.id_gt,
      id_lte: request?.id_lte,
      id_lt: request?.id_lt,
      id_around: request?.id_around,
      sort: request?.sort,
      member_custom_include: request?.member_custom_include,
    };
    const pathParams = {
      parent_id: request?.parent_id,
    };

    const response = await this.apiClient.sendRequest<GetRepliesResponse>(
      'GET',
      '/api/v2/chat/messages/{parent_id}/replies',
      pathParams,
      queryParams,
    );

    decoders['GetRepliesResponse']?.(response);

    return response;
  }

  async queryMessageFlags(request?: {
    payload?: QueryMessageFlagsPayload;
  }): Promise<StreamResponse<QueryMessageFlagsResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response =
      await this.apiClient.sendRequest<QueryMessageFlagsResponse>(
        'GET',
        '/api/v2/chat/moderation/flags/message',
        undefined,
        queryParams,
      );

    decoders['QueryMessageFlagsResponse']?.(response);

    return response;
  }

  async muteChannel(
    request?: MuteChannelRequest,
  ): Promise<StreamResponse<MuteChannelResponse>> {
    const body = {
      expiration: request?.expiration,
      user_id: request?.user_id,
      channel_cids: request?.channel_cids,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<MuteChannelResponse>(
      'POST',
      '/api/v2/chat/moderation/mute/channel',
      undefined,
      undefined,
      body,
    );

    decoders['MuteChannelResponse']?.(response);

    return response;
  }

  async unmuteChannel(
    request?: UnmuteChannelRequest,
  ): Promise<StreamResponse<UnmuteResponse>> {
    const body = {
      expiration: request?.expiration,
      user_id: request?.user_id,
      channel_cids: request?.channel_cids,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<UnmuteResponse>(
      'POST',
      '/api/v2/chat/moderation/unmute/channel',
      undefined,
      undefined,
      body,
    );

    decoders['UnmuteResponse']?.(response);

    return response;
  }

  async getPredefinedFilters(request?: {
    include_stats?: boolean;
    sort?: Array<SortParamRequest>;
  }): Promise<StreamResponse<QueryPredefinedFiltersResponse>> {
    const queryParams = {
      include_stats: request?.include_stats,
      sort: request?.sort,
    };

    const response =
      await this.apiClient.sendRequest<QueryPredefinedFiltersResponse>(
        'GET',
        '/api/v2/chat/predefined_filters',
        undefined,
        queryParams,
      );

    decoders['QueryPredefinedFiltersResponse']?.(response);

    return response;
  }

  async createPredefinedFilter(
    request: CreatePredefinedFilterRequest,
  ): Promise<StreamResponse<CreatePredefinedFilterResponse>> {
    const body = {
      name: request?.name,
      operation: request?.operation,
      filter: request?.filter,
      description: request?.description,
      sort: request?.sort,
    };

    const response =
      await this.apiClient.sendRequest<CreatePredefinedFilterResponse>(
        'POST',
        '/api/v2/chat/predefined_filters',
        undefined,
        undefined,
        body,
      );

    decoders['CreatePredefinedFilterResponse']?.(response);

    return response;
  }

  async deletePredefinedFilter(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/chat/predefined_filters/{name}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getPredefinedFilter(request: {
    name: string;
  }): Promise<StreamResponse<GetPredefinedFilterResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response =
      await this.apiClient.sendRequest<GetPredefinedFilterResponse>(
        'GET',
        '/api/v2/chat/predefined_filters/{name}',
        pathParams,
        undefined,
      );

    decoders['GetPredefinedFilterResponse']?.(response);

    return response;
  }

  async updatePredefinedFilter(
    request: UpdatePredefinedFilterRequest & { name: string },
  ): Promise<StreamResponse<UpdatePredefinedFilterResponse>> {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      operation: request?.operation,
      filter: request?.filter,
      description: request?.description,
      sort: request?.sort,
    };

    const response =
      await this.apiClient.sendRequest<UpdatePredefinedFilterResponse>(
        'PUT',
        '/api/v2/chat/predefined_filters/{name}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdatePredefinedFilterResponse']?.(response);

    return response;
  }

  async queryBannedUsers(request?: {
    payload?: QueryBannedUsersPayload;
  }): Promise<StreamResponse<QueryBannedUsersResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<QueryBannedUsersResponse>(
      'GET',
      '/api/v2/chat/query_banned_users',
      undefined,
      queryParams,
    );

    decoders['QueryBannedUsersResponse']?.(response);

    return response;
  }

  async queryFutureChannelBans(request?: {
    payload?: QueryFutureChannelBansPayload;
  }): Promise<StreamResponse<QueryFutureChannelBansResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response =
      await this.apiClient.sendRequest<QueryFutureChannelBansResponse>(
        'GET',
        '/api/v2/chat/query_future_channel_bans',
        undefined,
        queryParams,
      );

    decoders['QueryFutureChannelBansResponse']?.(response);

    return response;
  }

  async queryReminders(
    request?: QueryRemindersRequest,
  ): Promise<StreamResponse<QueryRemindersResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryRemindersResponse>(
      'POST',
      '/api/v2/chat/reminders/query',
      undefined,
      undefined,
      body,
    );

    decoders['QueryRemindersResponse']?.(response);

    return response;
  }

  async getRetentionPolicy(): Promise<
    StreamResponse<GetRetentionPolicyResponse>
  > {
    const response =
      await this.apiClient.sendRequest<GetRetentionPolicyResponse>(
        'GET',
        '/api/v2/chat/retention_policy',
        undefined,
        undefined,
      );

    decoders['GetRetentionPolicyResponse']?.(response);

    return response;
  }

  async setRetentionPolicy(
    request: SetRetentionPolicyRequest,
  ): Promise<StreamResponse<SetRetentionPolicyResponse>> {
    const body = {
      max_age_hours: request?.max_age_hours,
      policy: request?.policy,
    };

    const response =
      await this.apiClient.sendRequest<SetRetentionPolicyResponse>(
        'POST',
        '/api/v2/chat/retention_policy',
        undefined,
        undefined,
        body,
      );

    decoders['SetRetentionPolicyResponse']?.(response);

    return response;
  }

  async deleteRetentionPolicy(
    request: DeleteRetentionPolicyRequest,
  ): Promise<StreamResponse<DeleteRetentionPolicyResponse>> {
    const body = {
      policy: request?.policy,
    };

    const response =
      await this.apiClient.sendRequest<DeleteRetentionPolicyResponse>(
        'POST',
        '/api/v2/chat/retention_policy/delete',
        undefined,
        undefined,
        body,
      );

    decoders['DeleteRetentionPolicyResponse']?.(response);

    return response;
  }

  async getRetentionPolicyRuns(
    request?: GetRetentionPolicyRunsRequest,
  ): Promise<StreamResponse<GetRetentionPolicyRunsResponse>> {
    const body = {
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
    };

    const response =
      await this.apiClient.sendRequest<GetRetentionPolicyRunsResponse>(
        'POST',
        '/api/v2/chat/retention_policy/runs',
        undefined,
        undefined,
        body,
      );

    decoders['GetRetentionPolicyRunsResponse']?.(response);

    return response;
  }

  async search(request?: {
    payload?: SearchPayload;
  }): Promise<StreamResponse<SearchResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<SearchResponse>(
      'GET',
      '/api/v2/chat/search',
      undefined,
      queryParams,
    );

    decoders['SearchResponse']?.(response);

    return response;
  }

  async createSegment(
    request: CreateSegmentRequest,
  ): Promise<StreamResponse<CreateSegmentResponse>> {
    const body = {
      type: request?.type,
      all_sender_channels: request?.all_sender_channels,
      all_users: request?.all_users,
      description: request?.description,
      id: request?.id,
      name: request?.name,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<CreateSegmentResponse>(
      'POST',
      '/api/v2/chat/segments',
      undefined,
      undefined,
      body,
    );

    decoders['CreateSegmentResponse']?.(response);

    return response;
  }

  async querySegments(
    request: QuerySegmentsRequest,
  ): Promise<StreamResponse<QuerySegmentsResponse>> {
    const body = {
      filter: request?.filter,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
    };

    const response = await this.apiClient.sendRequest<QuerySegmentsResponse>(
      'POST',
      '/api/v2/chat/segments/query',
      undefined,
      undefined,
      body,
    );

    decoders['QuerySegmentsResponse']?.(response);

    return response;
  }

  async deleteSegment(request: {
    id: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'DELETE',
      '/api/v2/chat/segments/{id}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async getSegment(request: {
    id: string;
  }): Promise<StreamResponse<GetSegmentResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<GetSegmentResponse>(
      'GET',
      '/api/v2/chat/segments/{id}',
      pathParams,
      undefined,
    );

    decoders['GetSegmentResponse']?.(response);

    return response;
  }

  async updateSegment(
    request: UpdateSegmentRequest & { id: string },
  ): Promise<StreamResponse<UpdateSegmentResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      description: request?.description,
      name: request?.name,
      filter: request?.filter,
    };

    const response = await this.apiClient.sendRequest<UpdateSegmentResponse>(
      'PUT',
      '/api/v2/chat/segments/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders['UpdateSegmentResponse']?.(response);

    return response;
  }

  async addSegmentTargets(
    request: AddSegmentTargetsRequest & { id: string },
  ): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      target_ids: request?.target_ids,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/chat/segments/{id}/addtargets',
      pathParams,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async deleteSegmentTargets(
    request: DeleteSegmentTargetsRequest & { id: string },
  ): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      target_ids: request?.target_ids,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/chat/segments/{id}/deletetargets',
      pathParams,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }

  async segmentTargetExists(request: {
    id: string;
    target_id: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
      target_id: request?.target_id,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'GET',
      '/api/v2/chat/segments/{id}/target/{target_id}',
      pathParams,
      undefined,
    );

    decoders['Response']?.(response);

    return response;
  }

  async querySegmentTargets(
    request: QuerySegmentTargetsRequest & { id: string },
  ): Promise<StreamResponse<QuerySegmentTargetsResponse>> {
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
      await this.apiClient.sendRequest<QuerySegmentTargetsResponse>(
        'POST',
        '/api/v2/chat/segments/{id}/targets/query',
        pathParams,
        undefined,
        body,
      );

    decoders['QuerySegmentTargetsResponse']?.(response);

    return response;
  }

  async queryTeamUsageStats(
    request?: QueryTeamUsageStatsRequest,
  ): Promise<StreamResponse<QueryTeamUsageStatsResponse>> {
    const body = {
      end_date: request?.end_date,
      limit: request?.limit,
      month: request?.month,
      next: request?.next,
      start_date: request?.start_date,
      team: request?.team,
    };

    const response =
      await this.apiClient.sendRequest<QueryTeamUsageStatsResponse>(
        'POST',
        '/api/v2/chat/stats/team_usage',
        undefined,
        undefined,
        body,
      );

    decoders['QueryTeamUsageStatsResponse']?.(response);

    return response;
  }

  async queryThreads(
    request?: QueryThreadsRequest,
  ): Promise<StreamResponse<QueryThreadsResponse>> {
    const body = {
      limit: request?.limit,
      member_limit: request?.member_limit,
      next: request?.next,
      participant_limit: request?.participant_limit,
      prev: request?.prev,
      reply_limit: request?.reply_limit,
      user_id: request?.user_id,
      sort: request?.sort,
      filter: request?.filter,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<QueryThreadsResponse>(
      'POST',
      '/api/v2/chat/threads',
      undefined,
      undefined,
      body,
    );

    decoders['QueryThreadsResponse']?.(response);

    return response;
  }

  async getThread(request: {
    message_id: string;
    reply_limit?: number;
    participant_limit?: number;
    member_limit?: number;
  }): Promise<StreamResponse<GetThreadResponse>> {
    const queryParams = {
      reply_limit: request?.reply_limit,
      participant_limit: request?.participant_limit,
      member_limit: request?.member_limit,
    };
    const pathParams = {
      message_id: request?.message_id,
    };

    const response = await this.apiClient.sendRequest<GetThreadResponse>(
      'GET',
      '/api/v2/chat/threads/{message_id}',
      pathParams,
      queryParams,
    );

    decoders['GetThreadResponse']?.(response);

    return response;
  }

  async updateThreadPartial(
    request: UpdateThreadPartialRequest & { message_id: string },
  ): Promise<StreamResponse<UpdateThreadPartialResponse>> {
    const pathParams = {
      message_id: request?.message_id,
    };
    const body = {
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response =
      await this.apiClient.sendRequest<UpdateThreadPartialResponse>(
        'PATCH',
        '/api/v2/chat/threads/{message_id}',
        pathParams,
        undefined,
        body,
      );

    decoders['UpdateThreadPartialResponse']?.(response);

    return response;
  }

  async unreadCounts(request?: {
    user_id?: string;
  }): Promise<StreamResponse<WrappedUnreadCountsResponse>> {
    const queryParams = {
      user_id: request?.user_id,
    };

    const response =
      await this.apiClient.sendRequest<WrappedUnreadCountsResponse>(
        'GET',
        '/api/v2/chat/unread',
        undefined,
        queryParams,
      );

    decoders['WrappedUnreadCountsResponse']?.(response);

    return response;
  }

  async unreadCountsBatch(
    request: UnreadCountsBatchRequest,
  ): Promise<StreamResponse<UnreadCountsBatchResponse>> {
    const body = {
      user_ids: request?.user_ids,
    };

    const response =
      await this.apiClient.sendRequest<UnreadCountsBatchResponse>(
        'POST',
        '/api/v2/chat/unread_batch',
        undefined,
        undefined,
        body,
      );

    decoders['UnreadCountsBatchResponse']?.(response);

    return response;
  }

  async sendUserCustomEvent(
    request: SendUserCustomEventRequest & { user_id: string },
  ): Promise<StreamResponse<Response>> {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      event: request?.event,
    };

    const response = await this.apiClient.sendRequest<Response>(
      'POST',
      '/api/v2/chat/users/{user_id}/event',
      pathParams,
      undefined,
      body,
    );

    decoders['Response']?.(response);

    return response;
  }
}
