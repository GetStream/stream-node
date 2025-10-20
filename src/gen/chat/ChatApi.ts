import { ApiClient, StreamResponse } from '../../gen-imports';
import {
  CampaignResponse,
  CastPollVoteRequest,
  ChannelGetOrCreateRequest,
  ChannelStateResponse,
  CommitMessageRequest,
  CreateChannelTypeRequest,
  CreateChannelTypeResponse,
  CreateCommandRequest,
  CreateCommandResponse,
  CreateReminderRequest,
  DeleteChannelResponse,
  DeleteChannelsRequest,
  DeleteChannelsResponse,
  DeleteCommandResponse,
  DeleteMessageResponse,
  DeleteReactionResponse,
  DeleteReminderResponse,
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
  GetReactionsResponse,
  GetRepliesResponse,
  GetSegmentResponse,
  GetThreadResponse,
  HideChannelRequest,
  HideChannelResponse,
  ListChannelTypesResponse,
  ListCommandsResponse,
  MarkChannelsReadRequest,
  MarkReadRequest,
  MarkReadResponse,
  MarkUnreadRequest,
  MembersResponse,
  MessageActionRequest,
  MessageResponse,
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
  QueryMembersPayload,
  QueryMessageFlagsPayload,
  QueryMessageFlagsResponse,
  QueryMessageHistoryRequest,
  QueryMessageHistoryResponse,
  QueryReactionsRequest,
  QueryReactionsResponse,
  QueryRemindersRequest,
  QueryRemindersResponse,
  QuerySegmentTargetsRequest,
  QuerySegmentTargetsResponse,
  QuerySegmentsRequest,
  QuerySegmentsResponse,
  QueryThreadsRequest,
  QueryThreadsResponse,
  ReminderResponseData,
  Response,
  SearchPayload,
  SearchResponse,
  SendEventRequest,
  SendMessageRequest,
  SendMessageResponse,
  SendReactionRequest,
  SendReactionResponse,
  SendUserCustomEventRequest,
  ShowChannelRequest,
  ShowChannelResponse,
  SortParamRequest,
  StartCampaignRequest,
  StartCampaignResponse,
  StopCampaignRequest,
  TranslateMessageRequest,
  TruncateChannelRequest,
  TruncateChannelResponse,
  UnmuteChannelRequest,
  UnmuteResponse,
  UnreadCountsBatchRequest,
  UnreadCountsBatchResponse,
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
  UpdateReminderRequest,
  UpdateReminderResponse,
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryCampaignsResponse>
    >(
      'POST',
      '/api/v2/chat/campaigns/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryCampaignsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCampaignResponse>
    >('GET', '/api/v2/chat/campaigns/{id}', pathParams, queryParams);

    decoders.GetCampaignResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<StartCampaignResponse>
    >(
      'POST',
      '/api/v2/chat/campaigns/{id}/start',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.StartCampaignResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async scheduleCampaign(
    request: StopCampaignRequest & { id: string },
  ): Promise<StreamResponse<CampaignResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {};

    const response = await this.apiClient.sendRequest<
      StreamResponse<CampaignResponse>
    >(
      'POST',
      '/api/v2/chat/campaigns/{id}/stop',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.CampaignResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryChannels(
    request?: QueryChannelsRequest,
  ): Promise<StreamResponse<QueryChannelsResponse>> {
    const body = {
      limit: request?.limit,
      member_limit: request?.member_limit,
      message_limit: request?.message_limit,
      offset: request?.offset,
      state: request?.state,
      user_id: request?.user_id,
      sort: request?.sort,
      filter_conditions: request?.filter_conditions,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryChannelsResponse>
    >(
      'POST',
      '/api/v2/chat/channels',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryChannelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteChannels(
    request: DeleteChannelsRequest,
  ): Promise<StreamResponse<DeleteChannelsResponse>> {
    const body = {
      cids: request?.cids,
      hard_delete: request?.hard_delete,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteChannelsResponse>
    >(
      'POST',
      '/api/v2/chat/channels/delete',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.DeleteChannelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async markChannelsRead(
    request?: MarkChannelsReadRequest,
  ): Promise<StreamResponse<MarkReadResponse>> {
    const body = {
      user_id: request?.user_id,
      read_by_channel: request?.read_by_channel,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<MarkReadResponse>
    >(
      'POST',
      '/api/v2/chat/channels/read',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.MarkReadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      data: request?.data,
      members: request?.members,
      messages: request?.messages,
      watchers: request?.watchers,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ChannelStateResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/query',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.ChannelStateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteChannel(request: {
    type: string;
    id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteChannelResponse>> {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteChannelResponse>
    >('DELETE', '/api/v2/chat/channels/{type}/{id}', pathParams, queryParams);

    decoders.DeleteChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateChannelPartialResponse>
    >(
      'PATCH',
      '/api/v2/chat/channels/{type}/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateChannelPartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      reject_invite: request?.reject_invite,
      skip_push: request?.skip_push,
      user_id: request?.user_id,
      add_members: request?.add_members,
      add_moderators: request?.add_moderators,
      assign_roles: request?.assign_roles,
      demote_moderators: request?.demote_moderators,
      invites: request?.invites,
      remove_members: request?.remove_members,
      data: request?.data,
      message: request?.message,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/draft',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetDraftResponse>
    >(
      'GET',
      '/api/v2/chat/channels/{type}/{id}/draft',
      pathParams,
      queryParams,
    );

    decoders.GetDraftResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<EventResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/event',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.EventResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/file',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UploadChannelFileResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/file',
      pathParams,
      undefined,
      body,
      'multipart/form-data',
    );

    decoders.UploadChannelFileResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<HideChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/hide',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.HideChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/image',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UploadChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/image',
      pathParams,
      undefined,
      body,
      'multipart/form-data',
    );

    decoders.UploadChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateMemberPartialResponse>
    >(
      'PATCH',
      '/api/v2/chat/channels/{type}/{id}/member',
      pathParams,
      queryParams,
      body,
      'application/json',
    );

    decoders.UpdateMemberPartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      keep_channel_hidden: request?.keep_channel_hidden,
      pending: request?.pending,
      skip_enrich_url: request?.skip_enrich_url,
      skip_push: request?.skip_push,
      pending_message_metadata: request?.pending_message_metadata,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SendMessageResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/message',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.SendMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getManyMessages(request: {
    type: string;
    id: string;
    ids: string[];
  }): Promise<StreamResponse<GetManyMessagesResponse>> {
    const queryParams = {
      ids: request?.ids,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetManyMessagesResponse>
    >(
      'GET',
      '/api/v2/chat/channels/{type}/{id}/messages',
      pathParams,
      queryParams,
    );

    decoders.GetManyMessagesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      data: request?.data,
      members: request?.members,
      messages: request?.messages,
      watchers: request?.watchers,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ChannelStateResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/query',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.ChannelStateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<MarkReadResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/read',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.MarkReadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<ShowChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/show',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.ShowChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<TruncateChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/truncate',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.TruncateChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      thread_id: request?.thread_id,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/unread',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listChannelTypes(): Promise<StreamResponse<ListChannelTypesResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListChannelTypesResponse>
    >('GET', '/api/v2/chat/channeltypes', undefined, undefined);

    decoders.ListChannelTypesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      grants: request?.grants,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateChannelTypeResponse>
    >(
      'POST',
      '/api/v2/chat/channeltypes',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateChannelTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteChannelType(request: {
    name: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/channeltypes/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getChannelType(request: {
    name: string;
  }): Promise<StreamResponse<GetChannelTypeResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetChannelTypeResponse>
    >('GET', '/api/v2/chat/channeltypes/{name}', pathParams, undefined);

    decoders.GetChannelTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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
      mutes: request?.mutes,
      partition_size: request?.partition_size,
      partition_ttl: request?.partition_ttl,
      polls: request?.polls,
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
      grants: request?.grants,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateChannelTypeResponse>
    >(
      'PUT',
      '/api/v2/chat/channeltypes/{name}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateChannelTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async listCommands(): Promise<StreamResponse<ListCommandsResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<ListCommandsResponse>
    >('GET', '/api/v2/chat/commands', undefined, undefined);

    decoders.ListCommandsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<CreateCommandResponse>
    >(
      'POST',
      '/api/v2/chat/commands',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.CreateCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteCommand(request: {
    name: string;
  }): Promise<StreamResponse<DeleteCommandResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteCommandResponse>
    >('DELETE', '/api/v2/chat/commands/{name}', pathParams, undefined);

    decoders.DeleteCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getCommand(request: {
    name: string;
  }): Promise<StreamResponse<GetCommandResponse>> {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetCommandResponse>
    >('GET', '/api/v2/chat/commands/{name}', pathParams, undefined);

    decoders.GetCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateCommandResponse>
    >(
      'PUT',
      '/api/v2/chat/commands/{name}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryDraftsResponse>
    >(
      'POST',
      '/api/v2/chat/drafts/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryDraftsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async exportChannels(
    request: ExportChannelsRequest,
  ): Promise<StreamResponse<ExportChannelsResponse>> {
    const body = {
      channels: request?.channels,
      clear_deleted_message_text: request?.clear_deleted_message_text,
      export_users: request?.export_users,
      include_soft_deleted_channels: request?.include_soft_deleted_channels,
      include_truncated_messages: request?.include_truncated_messages,
      version: request?.version,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ExportChannelsResponse>
    >(
      'POST',
      '/api/v2/chat/export_channels',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.ExportChannelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryMembers(request?: {
    payload?: QueryMembersPayload;
  }): Promise<StreamResponse<MembersResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<MembersResponse>
    >('GET', '/api/v2/chat/members', undefined, queryParams);

    decoders.MembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryMessageHistoryResponse>
    >(
      'POST',
      '/api/v2/chat/messages/history',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryMessageHistoryResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteMessageResponse>
    >('DELETE', '/api/v2/chat/messages/{id}', pathParams, queryParams);

    decoders.DeleteMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetMessageResponse>
    >('GET', '/api/v2/chat/messages/{id}', pathParams, queryParams);

    decoders.GetMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateMessageResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateMessagePartial(
    request: UpdateMessagePartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessagePartialResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      skip_enrich_url: request?.skip_enrich_url,
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateMessagePartialResponse>
    >(
      'PUT',
      '/api/v2/chat/messages/{id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateMessagePartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async runMessageAction(
    request: MessageActionRequest & { id: string },
  ): Promise<StreamResponse<MessageResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      form_data: request?.form_data,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<MessageResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/action',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.MessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async commitMessage(
    request: CommitMessageRequest & { id: string },
  ): Promise<StreamResponse<MessageResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {};

    const response = await this.apiClient.sendRequest<
      StreamResponse<MessageResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/commit',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.MessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async ephemeralMessageUpdate(
    request: UpdateMessagePartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessagePartialResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      skip_enrich_url: request?.skip_enrich_url,
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateMessagePartialResponse>
    >(
      'PATCH',
      '/api/v2/chat/messages/{id}/ephemeral',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateMessagePartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<SendReactionResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/reaction',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.SendReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteReactionResponse>
    >(
      'DELETE',
      '/api/v2/chat/messages/{id}/reaction/{type}',
      pathParams,
      queryParams,
    );

    decoders.DeleteReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetReactionsResponse>
    >('GET', '/api/v2/chat/messages/{id}/reactions', pathParams, queryParams);

    decoders.GetReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryReactionsResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/reactions',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async translateMessage(
    request: TranslateMessageRequest & { id: string },
  ): Promise<StreamResponse<MessageResponse>> {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      language: request?.language,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<MessageResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/translate',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.MessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async undeleteMessage(
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateMessageResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/undelete',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollVoteResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<PollVoteResponse>
    >(
      'DELETE',
      '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote/{vote_id}',
      pathParams,
      queryParams,
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<DeleteReminderResponse>
    >(
      'DELETE',
      '/api/v2/chat/messages/{message_id}/reminders',
      pathParams,
      queryParams,
    );

    decoders.DeleteReminderResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async updateReminder(
    request: UpdateReminderRequest & { message_id: string },
  ): Promise<StreamResponse<UpdateReminderResponse>> {
    const pathParams = {
      message_id: request?.message_id,
    };
    const body = {
      remind_at: request?.remind_at,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateReminderResponse>
    >(
      'PATCH',
      '/api/v2/chat/messages/{message_id}/reminders',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateReminderResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async createReminder(
    request: CreateReminderRequest & { message_id: string },
  ): Promise<StreamResponse<ReminderResponseData>> {
    const pathParams = {
      message_id: request?.message_id,
    };
    const body = {
      remind_at: request?.remind_at,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<ReminderResponseData>
    >(
      'POST',
      '/api/v2/chat/messages/{message_id}/reminders',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.ReminderResponseData?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getReplies(request: {
    parent_id: string;
    limit?: number;
    id_gte?: string;
    id_gt?: string;
    id_lte?: string;
    id_lt?: string;
    id_around?: string;
    sort?: SortParamRequest[];
  }): Promise<StreamResponse<GetRepliesResponse>> {
    const queryParams = {
      limit: request?.limit,
      id_gte: request?.id_gte,
      id_gt: request?.id_gt,
      id_lte: request?.id_lte,
      id_lt: request?.id_lt,
      id_around: request?.id_around,
      sort: request?.sort,
    };
    const pathParams = {
      parent_id: request?.parent_id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetRepliesResponse>
    >(
      'GET',
      '/api/v2/chat/messages/{parent_id}/replies',
      pathParams,
      queryParams,
    );

    decoders.GetRepliesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryMessageFlags(request?: {
    payload?: QueryMessageFlagsPayload;
  }): Promise<StreamResponse<QueryMessageFlagsResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryMessageFlagsResponse>
    >('GET', '/api/v2/chat/moderation/flags/message', undefined, queryParams);

    decoders.QueryMessageFlagsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<MuteChannelResponse>
    >(
      'POST',
      '/api/v2/chat/moderation/mute/channel',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.MuteChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnmuteResponse>
    >(
      'POST',
      '/api/v2/chat/moderation/unmute/channel',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UnmuteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async queryBannedUsers(request?: {
    payload?: QueryBannedUsersPayload;
  }): Promise<StreamResponse<QueryBannedUsersResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryBannedUsersResponse>
    >('GET', '/api/v2/chat/query_banned_users', undefined, queryParams);

    decoders.QueryBannedUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryRemindersResponse>
    >(
      'POST',
      '/api/v2/chat/reminders/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryRemindersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async search(request?: {
    payload?: SearchPayload;
  }): Promise<StreamResponse<SearchResponse>> {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<SearchResponse>
    >('GET', '/api/v2/chat/search', undefined, queryParams);

    decoders.SearchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QuerySegmentsResponse>
    >(
      'POST',
      '/api/v2/chat/segments/query',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QuerySegmentsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async deleteSegment(request: {
    id: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/segments/{id}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async getSegment(request: {
    id: string;
  }): Promise<StreamResponse<GetSegmentResponse>> {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetSegmentResponse>
    >('GET', '/api/v2/chat/segments/{id}', pathParams, undefined);

    decoders.GetSegmentResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/chat/segments/{id}/deletetargets',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async segmentTargetExists(request: {
    id: string;
    target_id: string;
  }): Promise<StreamResponse<Response>> {
    const pathParams = {
      id: request?.id,
      target_id: request?.target_id,
    };

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'GET',
      '/api/v2/chat/segments/{id}/target/{target_id}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QuerySegmentTargetsResponse>
    >(
      'POST',
      '/api/v2/chat/segments/{id}/targets/query',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.QuerySegmentTargetsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<QueryThreadsResponse>
    >(
      'POST',
      '/api/v2/chat/threads',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.QueryThreadsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<GetThreadResponse>
    >('GET', '/api/v2/chat/threads/{message_id}', pathParams, queryParams);

    decoders.GetThreadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<
      StreamResponse<UpdateThreadPartialResponse>
    >(
      'PATCH',
      '/api/v2/chat/threads/{message_id}',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.UpdateThreadPartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unreadCounts(): Promise<StreamResponse<WrappedUnreadCountsResponse>> {
    const response = await this.apiClient.sendRequest<
      StreamResponse<WrappedUnreadCountsResponse>
    >('GET', '/api/v2/chat/unread', undefined, undefined);

    decoders.WrappedUnreadCountsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }

  async unreadCountsBatch(
    request: UnreadCountsBatchRequest,
  ): Promise<StreamResponse<UnreadCountsBatchResponse>> {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.apiClient.sendRequest<
      StreamResponse<UnreadCountsBatchResponse>
    >(
      'POST',
      '/api/v2/chat/unread_batch',
      undefined,
      undefined,
      body,
      'application/json',
    );

    decoders.UnreadCountsBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
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

    const response = await this.apiClient.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/chat/users/{user_id}/event',
      pathParams,
      undefined,
      body,
      'application/json',
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  }
}
