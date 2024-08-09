import { BaseApi } from '../../BaseApi';
import { StreamResponse } from '../../types';
import {
  CastPollVoteRequest,
  ChannelGetOrCreateRequest,
  ChannelStateResponse,
  CommitMessageRequest,
  CreateChannelTypeRequest,
  CreateChannelTypeResponse,
  CreateCommandRequest,
  CreateCommandResponse,
  CreatePollOptionRequest,
  CreatePollRequest,
  DeleteChannelResponse,
  DeleteChannelsRequest,
  DeleteChannelsResponse,
  DeleteCommandResponse,
  DeleteMessageResponse,
  EventResponse,
  ExportChannelsRequest,
  ExportChannelsResponse,
  FileUploadRequest,
  FileUploadResponse,
  GetChannelTypeResponse,
  GetCommandResponse,
  GetExportChannelsStatusResponse,
  GetManyMessagesResponse,
  GetMessageResponse,
  GetReactionsResponse,
  GetRepliesResponse,
  GetThreadResponse,
  HideChannelRequest,
  HideChannelResponse,
  ImageUploadRequest,
  ImageUploadResponse,
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
  PollOptionResponse,
  PollResponse,
  PollVoteResponse,
  PollVotesResponse,
  QueryBannedUsersRequest,
  QueryBannedUsersResponse,
  QueryChannelsRequest,
  QueryChannelsResponse,
  QueryMembersRequest,
  QueryMessageFlagsRequest,
  QueryMessageFlagsResponse,
  QueryMessageHistoryRequest,
  QueryMessageHistoryResponse,
  QueryPollVotesRequest,
  QueryPollsRequest,
  QueryPollsResponse,
  QueryReactionsRequest,
  QueryReactionsResponse,
  QueryThreadsRequest,
  QueryThreadsResponse,
  ReactionRemovalResponse,
  Response,
  SearchRequest,
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
  UpdateMessagePartialRequest,
  UpdateMessagePartialResponse,
  UpdateMessageRequest,
  UpdateMessageResponse,
  UpdatePollOptionRequest,
  UpdatePollPartialRequest,
  UpdatePollRequest,
  UpdateThreadPartialRequest,
  UpdateThreadPartialResponse,
  WrappedUnreadCountsResponse,
} from '../models';
import { decoders } from '../model-decoders';

export class ChatApi extends BaseApi {
  queryChannels = async (
    request?: QueryChannelsRequest,
  ): Promise<StreamResponse<QueryChannelsResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<QueryChannelsResponse>
    >('POST', '/api/v2/chat/channels', undefined, undefined, body);

    decoders.QueryChannelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteChannels = async (
    request: DeleteChannelsRequest,
  ): Promise<StreamResponse<DeleteChannelsResponse>> => {
    const body = {
      cids: request?.cids,
      hard_delete: request?.hard_delete,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteChannelsResponse>
    >('POST', '/api/v2/chat/channels/delete', undefined, undefined, body);

    decoders.DeleteChannelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  markChannelsRead = async (
    request?: MarkChannelsReadRequest,
  ): Promise<StreamResponse<MarkReadResponse>> => {
    const body = {
      user_id: request?.user_id,
      read_by_channel: request?.read_by_channel,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<MarkReadResponse>>(
      'POST',
      '/api/v2/chat/channels/read',
      undefined,
      undefined,
      body,
    );

    decoders.MarkReadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getOrCreateDistinctChannel = async (
    request: ChannelGetOrCreateRequest & { type: string },
  ): Promise<StreamResponse<ChannelStateResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<ChannelStateResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/query',
      pathParams,
      undefined,
      body,
    );

    decoders.ChannelStateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteChannel = async (request: {
    type: string;
    id: string;
    hard_delete?: boolean;
  }): Promise<StreamResponse<DeleteChannelResponse>> => {
    const queryParams = {
      hard_delete: request?.hard_delete,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteChannelResponse>
    >('DELETE', '/api/v2/chat/channels/{type}/{id}', pathParams, queryParams);

    decoders.DeleteChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateChannelPartial = async (
    request: UpdateChannelPartialRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateChannelPartialResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<UpdateChannelPartialResponse>
    >(
      'PATCH',
      '/api/v2/chat/channels/{type}/{id}',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateChannelPartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateChannel = async (
    request: UpdateChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<UpdateChannelResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<UpdateChannelResponse>
    >('POST', '/api/v2/chat/channels/{type}/{id}', pathParams, undefined, body);

    decoders.UpdateChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  sendEvent = async (
    request: SendEventRequest & { type: string; id: string },
  ): Promise<StreamResponse<EventResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      event: request?.event,
    };

    const response = await this.sendRequest<StreamResponse<EventResponse>>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/event',
      pathParams,
      undefined,
      body,
    );

    decoders.EventResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteFile = async (request: {
    type: string;
    id: string;
    url?: string;
  }): Promise<StreamResponse<Response>> => {
    const queryParams = {
      url: request?.url,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/file',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  uploadFile = async (
    request: FileUploadRequest & { type: string; id: string },
  ): Promise<StreamResponse<FileUploadResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      file: request?.file,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<FileUploadResponse>>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/file',
      pathParams,
      undefined,
      body,
    );

    decoders.FileUploadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  hideChannel = async (
    request: HideChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<HideChannelResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      clear_history: request?.clear_history,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<HideChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/hide',
      pathParams,
      undefined,
      body,
    );

    decoders.HideChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteImage = async (request: {
    type: string;
    id: string;
    url?: string;
  }): Promise<StreamResponse<Response>> => {
    const queryParams = {
      url: request?.url,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/channels/{type}/{id}/image',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  uploadImage = async (
    request: ImageUploadRequest & { type: string; id: string },
  ): Promise<StreamResponse<ImageUploadResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      file: request?.file,
      upload_sizes: request?.upload_sizes,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<ImageUploadResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/image',
      pathParams,
      undefined,
      body,
    );

    decoders.ImageUploadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  sendMessage = async (
    request: SendMessageRequest & { type: string; id: string },
  ): Promise<StreamResponse<SendMessageResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<SendMessageResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/message',
      pathParams,
      undefined,
      body,
    );

    decoders.SendMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getManyMessages = async (request: {
    type: string;
    id: string;
    ids: string[];
  }): Promise<StreamResponse<GetManyMessagesResponse>> => {
    const queryParams = {
      ids: request?.ids,
    };
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<GetManyMessagesResponse>
    >(
      'GET',
      '/api/v2/chat/channels/{type}/{id}/messages',
      pathParams,
      queryParams,
    );

    decoders.GetManyMessagesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getOrCreateChannel = async (
    request: ChannelGetOrCreateRequest & { type: string; id: string },
  ): Promise<StreamResponse<ChannelStateResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<ChannelStateResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/query',
      pathParams,
      undefined,
      body,
    );

    decoders.ChannelStateResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  markRead = async (
    request: MarkReadRequest & { type: string; id: string },
  ): Promise<StreamResponse<MarkReadResponse>> => {
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

    const response = await this.sendRequest<StreamResponse<MarkReadResponse>>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/read',
      pathParams,
      undefined,
      body,
    );

    decoders.MarkReadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  showChannel = async (
    request: ShowChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<ShowChannelResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<ShowChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/show',
      pathParams,
      undefined,
      body,
    );

    decoders.ShowChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  truncateChannel = async (
    request: TruncateChannelRequest & { type: string; id: string },
  ): Promise<StreamResponse<TruncateChannelResponse>> => {
    const pathParams = {
      type: request?.type,
      id: request?.id,
    };
    const body = {
      hard_delete: request?.hard_delete,
      skip_push: request?.skip_push,
      truncated_at: request?.truncated_at,
      user_id: request?.user_id,
      message: request?.message,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<TruncateChannelResponse>
    >(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/truncate',
      pathParams,
      undefined,
      body,
    );

    decoders.TruncateChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  markUnread = async (
    request: MarkUnreadRequest & { type: string; id: string },
  ): Promise<StreamResponse<Response>> => {
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

    const response = await this.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/chat/channels/{type}/{id}/unread',
      pathParams,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listChannelTypes = async (): Promise<
    StreamResponse<ListChannelTypesResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<ListChannelTypesResponse>
    >('GET', '/api/v2/chat/channeltypes', undefined, undefined);

    decoders.ListChannelTypesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createChannelType = async (
    request: CreateChannelTypeRequest,
  ): Promise<StreamResponse<CreateChannelTypeResponse>> => {
    const body = {
      automod: request?.automod,
      automod_behavior: request?.automod_behavior,
      max_message_length: request?.max_message_length,
      name: request?.name,
      blocklist: request?.blocklist,
      blocklist_behavior: request?.blocklist_behavior,
      connect_events: request?.connect_events,
      custom_events: request?.custom_events,
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
      typing_events: request?.typing_events,
      uploads: request?.uploads,
      url_enrichment: request?.url_enrichment,
      blocklists: request?.blocklists,
      commands: request?.commands,
      permissions: request?.permissions,
      grants: request?.grants,
    };

    const response = await this.sendRequest<
      StreamResponse<CreateChannelTypeResponse>
    >('POST', '/api/v2/chat/channeltypes', undefined, undefined, body);

    decoders.CreateChannelTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteChannelType = async (request: {
    name: string;
  }): Promise<StreamResponse<Response>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/channeltypes/{name}',
      pathParams,
      undefined,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getChannelType = async (request: {
    name: string;
  }): Promise<StreamResponse<GetChannelTypeResponse>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<
      StreamResponse<GetChannelTypeResponse>
    >('GET', '/api/v2/chat/channeltypes/{name}', pathParams, undefined);

    decoders.GetChannelTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateChannelType = async (
    request: UpdateChannelTypeRequest & { name: string },
  ): Promise<StreamResponse<UpdateChannelTypeResponse>> => {
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
      custom_events: request?.custom_events,
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
      typing_events: request?.typing_events,
      uploads: request?.uploads,
      url_enrichment: request?.url_enrichment,
      allowed_flag_reasons: request?.allowed_flag_reasons,
      blocklists: request?.blocklists,
      commands: request?.commands,
      permissions: request?.permissions,
      automod_thresholds: request?.automod_thresholds,
      grants: request?.grants,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateChannelTypeResponse>
    >('PUT', '/api/v2/chat/channeltypes/{name}', pathParams, undefined, body);

    decoders.UpdateChannelTypeResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  listCommands = async (): Promise<StreamResponse<ListCommandsResponse>> => {
    const response = await this.sendRequest<
      StreamResponse<ListCommandsResponse>
    >('GET', '/api/v2/chat/commands', undefined, undefined);

    decoders.ListCommandsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createCommand = async (
    request: CreateCommandRequest,
  ): Promise<StreamResponse<CreateCommandResponse>> => {
    const body = {
      description: request?.description,
      name: request?.name,
      args: request?.args,
      set: request?.set,
    };

    const response = await this.sendRequest<
      StreamResponse<CreateCommandResponse>
    >('POST', '/api/v2/chat/commands', undefined, undefined, body);

    decoders.CreateCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteCommand = async (request: {
    name: string;
  }): Promise<StreamResponse<DeleteCommandResponse>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteCommandResponse>
    >('DELETE', '/api/v2/chat/commands/{name}', pathParams, undefined);

    decoders.DeleteCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getCommand = async (request: {
    name: string;
  }): Promise<StreamResponse<GetCommandResponse>> => {
    const pathParams = {
      name: request?.name,
    };

    const response = await this.sendRequest<StreamResponse<GetCommandResponse>>(
      'GET',
      '/api/v2/chat/commands/{name}',
      pathParams,
      undefined,
    );

    decoders.GetCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateCommand = async (
    request: UpdateCommandRequest & { name: string },
  ): Promise<StreamResponse<UpdateCommandResponse>> => {
    const pathParams = {
      name: request?.name,
    };
    const body = {
      description: request?.description,
      args: request?.args,
      set: request?.set,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateCommandResponse>
    >('PUT', '/api/v2/chat/commands/{name}', pathParams, undefined, body);

    decoders.UpdateCommandResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  exportChannels = async (
    request: ExportChannelsRequest,
  ): Promise<StreamResponse<ExportChannelsResponse>> => {
    const body = {
      channels: request?.channels,
      clear_deleted_message_text: request?.clear_deleted_message_text,
      export_users: request?.export_users,
      include_soft_deleted_channels: request?.include_soft_deleted_channels,
      include_truncated_messages: request?.include_truncated_messages,
      version: request?.version,
    };

    const response = await this.sendRequest<
      StreamResponse<ExportChannelsResponse>
    >('POST', '/api/v2/chat/export_channels', undefined, undefined, body);

    decoders.ExportChannelsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getExportChannelsStatus = async (request: {
    id: string;
  }): Promise<StreamResponse<GetExportChannelsStatusResponse>> => {
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<GetExportChannelsStatusResponse>
    >('GET', '/api/v2/chat/export_channels/{id}', pathParams, undefined);

    decoders.GetExportChannelsStatusResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryMembers = async (request?: {
    payload?: QueryMembersRequest;
  }): Promise<StreamResponse<MembersResponse>> => {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.sendRequest<StreamResponse<MembersResponse>>(
      'GET',
      '/api/v2/chat/members',
      undefined,
      queryParams,
    );

    decoders.MembersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryMessageHistory = async (
    request: QueryMessageHistoryRequest,
  ): Promise<StreamResponse<QueryMessageHistoryResponse>> => {
    const body = {
      filter: request?.filter,
      limit: request?.limit,
      next: request?.next,
      prev: request?.prev,
      sort: request?.sort,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryMessageHistoryResponse>
    >('POST', '/api/v2/chat/messages/history', undefined, undefined, body);

    decoders.QueryMessageHistoryResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteMessage = async (request: {
    id: string;
    hard?: boolean;
    deleted_by?: string;
  }): Promise<StreamResponse<DeleteMessageResponse>> => {
    const queryParams = {
      hard: request?.hard,
      deleted_by: request?.deleted_by,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<DeleteMessageResponse>
    >('DELETE', '/api/v2/chat/messages/{id}', pathParams, queryParams);

    decoders.DeleteMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getMessage = async (request: {
    id: string;
    show_deleted_message?: boolean;
  }): Promise<StreamResponse<GetMessageResponse>> => {
    const queryParams = {
      show_deleted_message: request?.show_deleted_message,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<StreamResponse<GetMessageResponse>>(
      'GET',
      '/api/v2/chat/messages/{id}',
      pathParams,
      queryParams,
    );

    decoders.GetMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateMessage = async (
    request: UpdateMessageRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessageResponse>> => {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      message: request?.message,
      skip_enrich_url: request?.skip_enrich_url,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateMessageResponse>
    >('POST', '/api/v2/chat/messages/{id}', pathParams, undefined, body);

    decoders.UpdateMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateMessagePartial = async (
    request: UpdateMessagePartialRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessagePartialResponse>> => {
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

    const response = await this.sendRequest<
      StreamResponse<UpdateMessagePartialResponse>
    >('PUT', '/api/v2/chat/messages/{id}', pathParams, undefined, body);

    decoders.UpdateMessagePartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  runMessageAction = async (
    request: MessageActionRequest & { id: string },
  ): Promise<StreamResponse<MessageResponse>> => {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      form_data: request?.form_data,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<MessageResponse>>(
      'POST',
      '/api/v2/chat/messages/{id}/action',
      pathParams,
      undefined,
      body,
    );

    decoders.MessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  commitMessage = async (
    request: CommitMessageRequest & { id: string },
  ): Promise<StreamResponse<MessageResponse>> => {
    const pathParams = {
      id: request?.id,
    };
    const body = {};

    const response = await this.sendRequest<StreamResponse<MessageResponse>>(
      'POST',
      '/api/v2/chat/messages/{id}/commit',
      pathParams,
      undefined,
      body,
    );

    decoders.MessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  sendReaction = async (
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

    const response = await this.sendRequest<
      StreamResponse<SendReactionResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/reaction',
      pathParams,
      undefined,
      body,
    );

    decoders.SendReactionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deleteReaction = async (request: {
    id: string;
    type: string;
    user_id?: string;
  }): Promise<StreamResponse<ReactionRemovalResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      id: request?.id,
      type: request?.type,
    };

    const response = await this.sendRequest<
      StreamResponse<ReactionRemovalResponse>
    >(
      'DELETE',
      '/api/v2/chat/messages/{id}/reaction/{type}',
      pathParams,
      queryParams,
    );

    decoders.ReactionRemovalResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getReactions = async (request: {
    id: string;
    limit?: number;
    offset?: number;
  }): Promise<StreamResponse<GetReactionsResponse>> => {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
    };
    const pathParams = {
      id: request?.id,
    };

    const response = await this.sendRequest<
      StreamResponse<GetReactionsResponse>
    >('GET', '/api/v2/chat/messages/{id}/reactions', pathParams, queryParams);

    decoders.GetReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryReactions = async (
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

    const response = await this.sendRequest<
      StreamResponse<QueryReactionsResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/reactions',
      pathParams,
      undefined,
      body,
    );

    decoders.QueryReactionsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  translateMessage = async (
    request: TranslateMessageRequest & { id: string },
  ): Promise<StreamResponse<MessageResponse>> => {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      language: request?.language,
    };

    const response = await this.sendRequest<StreamResponse<MessageResponse>>(
      'POST',
      '/api/v2/chat/messages/{id}/translate',
      pathParams,
      undefined,
      body,
    );

    decoders.MessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  undeleteMessage = async (
    request: UpdateMessageRequest & { id: string },
  ): Promise<StreamResponse<UpdateMessageResponse>> => {
    const pathParams = {
      id: request?.id,
    };
    const body = {
      message: request?.message,
      skip_enrich_url: request?.skip_enrich_url,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateMessageResponse>
    >(
      'POST',
      '/api/v2/chat/messages/{id}/undelete',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateMessageResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  castPollVote = async (
    request: CastPollVoteRequest & { message_id: string; poll_id: string },
  ): Promise<StreamResponse<PollVoteResponse>> => {
    const pathParams = {
      message_id: request?.message_id,
      poll_id: request?.poll_id,
    };
    const body = {
      user_id: request?.user_id,
      user: request?.user,
      vote: request?.vote,
    };

    const response = await this.sendRequest<StreamResponse<PollVoteResponse>>(
      'POST',
      '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote',
      pathParams,
      undefined,
      body,
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  removePollVote = async (request: {
    message_id: string;
    poll_id: string;
    vote_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollVoteResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      message_id: request?.message_id,
      poll_id: request?.poll_id,
      vote_id: request?.vote_id,
    };

    const response = await this.sendRequest<StreamResponse<PollVoteResponse>>(
      'DELETE',
      '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote/{vote_id}',
      pathParams,
      queryParams,
    );

    decoders.PollVoteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getReplies = async (request: {
    parent_id: string;
    limit?: number;
    offset?: number;
    id_gte?: string;
    id_gt?: string;
    id_lte?: string;
    id_lt?: string;
    created_at_after_or_equal?: Date;
    created_at_after?: Date;
    created_at_before_or_equal?: Date;
    created_at_before?: Date;
    id_around?: string;
    created_at_around?: Date;
    sort?: SortParamRequest[];
  }): Promise<StreamResponse<GetRepliesResponse>> => {
    const queryParams = {
      limit: request?.limit,
      offset: request?.offset,
      id_gte: request?.id_gte,
      id_gt: request?.id_gt,
      id_lte: request?.id_lte,
      id_lt: request?.id_lt,
      created_at_after_or_equal: request?.created_at_after_or_equal,
      created_at_after: request?.created_at_after,
      created_at_before_or_equal: request?.created_at_before_or_equal,
      created_at_before: request?.created_at_before,
      id_around: request?.id_around,
      created_at_around: request?.created_at_around,
      sort: request?.sort,
    };
    const pathParams = {
      parent_id: request?.parent_id,
    };

    const response = await this.sendRequest<StreamResponse<GetRepliesResponse>>(
      'GET',
      '/api/v2/chat/messages/{parent_id}/replies',
      pathParams,
      queryParams,
    );

    decoders.GetRepliesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryMessageFlags = async (request?: {
    payload?: QueryMessageFlagsRequest;
  }): Promise<StreamResponse<QueryMessageFlagsResponse>> => {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryMessageFlagsResponse>
    >('GET', '/api/v2/chat/moderation/flags/message', undefined, queryParams);

    decoders.QueryMessageFlagsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  muteChannel = async (
    request?: MuteChannelRequest,
  ): Promise<StreamResponse<MuteChannelResponse>> => {
    const body = {
      expiration: request?.expiration,
      user_id: request?.user_id,
      channel_cids: request?.channel_cids,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<MuteChannelResponse>
    >(
      'POST',
      '/api/v2/chat/moderation/mute/channel',
      undefined,
      undefined,
      body,
    );

    decoders.MuteChannelResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unmuteChannel = async (
    request?: UnmuteChannelRequest,
  ): Promise<StreamResponse<UnmuteResponse>> => {
    const body = {
      expiration: request?.expiration,
      user_id: request?.user_id,
      channel_cids: request?.channel_cids,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<UnmuteResponse>>(
      'POST',
      '/api/v2/chat/moderation/unmute/channel',
      undefined,
      undefined,
      body,
    );

    decoders.UnmuteResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createPoll = async (
    request: CreatePollRequest,
  ): Promise<StreamResponse<PollResponse>> => {
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

    const response = await this.sendRequest<StreamResponse<PollResponse>>(
      'POST',
      '/api/v2/chat/polls',
      undefined,
      undefined,
      body,
    );

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updatePoll = async (
    request: UpdatePollRequest,
  ): Promise<StreamResponse<PollResponse>> => {
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

    const response = await this.sendRequest<StreamResponse<PollResponse>>(
      'PUT',
      '/api/v2/chat/polls',
      undefined,
      undefined,
      body,
    );

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryPolls = async (
    request?: QueryPollsRequest & { user_id?: string },
  ): Promise<StreamResponse<QueryPollsResponse>> => {
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

    const response = await this.sendRequest<StreamResponse<QueryPollsResponse>>(
      'POST',
      '/api/v2/chat/polls/query',
      undefined,
      queryParams,
      body,
    );

    decoders.QueryPollsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deletePoll = async (request: {
    poll_id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/polls/{poll_id}',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getPoll = async (request: {
    poll_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
    };

    const response = await this.sendRequest<StreamResponse<PollResponse>>(
      'GET',
      '/api/v2/chat/polls/{poll_id}',
      pathParams,
      queryParams,
    );

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updatePollPartial = async (
    request: UpdatePollPartialRequest & { poll_id: string },
  ): Promise<StreamResponse<PollResponse>> => {
    const pathParams = {
      poll_id: request?.poll_id,
    };
    const body = {
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response = await this.sendRequest<StreamResponse<PollResponse>>(
      'PATCH',
      '/api/v2/chat/polls/{poll_id}',
      pathParams,
      undefined,
      body,
    );

    decoders.PollResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  createPollOption = async (
    request: CreatePollOptionRequest & { poll_id: string },
  ): Promise<StreamResponse<PollOptionResponse>> => {
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

    const response = await this.sendRequest<StreamResponse<PollOptionResponse>>(
      'POST',
      '/api/v2/chat/polls/{poll_id}/options',
      pathParams,
      undefined,
      body,
    );

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updatePollOption = async (
    request: UpdatePollOptionRequest & { poll_id: string },
  ): Promise<StreamResponse<PollOptionResponse>> => {
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

    const response = await this.sendRequest<StreamResponse<PollOptionResponse>>(
      'PUT',
      '/api/v2/chat/polls/{poll_id}/options',
      pathParams,
      undefined,
      body,
    );

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  deletePollOption = async (request: {
    poll_id: string;
    option_id: string;
    user_id?: string;
  }): Promise<StreamResponse<Response>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
      option_id: request?.option_id,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'DELETE',
      '/api/v2/chat/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getPollOption = async (request: {
    poll_id: string;
    option_id: string;
    user_id?: string;
  }): Promise<StreamResponse<PollOptionResponse>> => {
    const queryParams = {
      user_id: request?.user_id,
    };
    const pathParams = {
      poll_id: request?.poll_id,
      option_id: request?.option_id,
    };

    const response = await this.sendRequest<StreamResponse<PollOptionResponse>>(
      'GET',
      '/api/v2/chat/polls/{poll_id}/options/{option_id}',
      pathParams,
      queryParams,
    );

    decoders.PollOptionResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryPollVotes = async (
    request: QueryPollVotesRequest & { poll_id: string; user_id?: string },
  ): Promise<StreamResponse<PollVotesResponse>> => {
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

    const response = await this.sendRequest<StreamResponse<PollVotesResponse>>(
      'POST',
      '/api/v2/chat/polls/{poll_id}/votes',
      pathParams,
      queryParams,
      body,
    );

    decoders.PollVotesResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryBannedUsers = async (request?: {
    payload?: QueryBannedUsersRequest;
  }): Promise<StreamResponse<QueryBannedUsersResponse>> => {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryBannedUsersResponse>
    >('GET', '/api/v2/chat/query_banned_users', undefined, queryParams);

    decoders.QueryBannedUsersResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  search = async (request?: {
    payload?: SearchRequest;
  }): Promise<StreamResponse<SearchResponse>> => {
    const queryParams = {
      payload: request?.payload,
    };

    const response = await this.sendRequest<StreamResponse<SearchResponse>>(
      'GET',
      '/api/v2/chat/search',
      undefined,
      queryParams,
    );

    decoders.SearchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  queryThreads = async (
    request?: QueryThreadsRequest,
  ): Promise<StreamResponse<QueryThreadsResponse>> => {
    const body = {
      limit: request?.limit,
      member_limit: request?.member_limit,
      next: request?.next,
      participant_limit: request?.participant_limit,
      prev: request?.prev,
      reply_limit: request?.reply_limit,
      user_id: request?.user_id,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<QueryThreadsResponse>
    >('POST', '/api/v2/chat/threads', undefined, undefined, body);

    decoders.QueryThreadsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  getThread = async (request: {
    message_id: string;
    connection_id?: string;
    reply_limit?: number;
    participant_limit?: number;
    member_limit?: number;
  }): Promise<StreamResponse<GetThreadResponse>> => {
    const queryParams = {
      connection_id: request?.connection_id,
      reply_limit: request?.reply_limit,
      participant_limit: request?.participant_limit,
      member_limit: request?.member_limit,
    };
    const pathParams = {
      message_id: request?.message_id,
    };

    const response = await this.sendRequest<StreamResponse<GetThreadResponse>>(
      'GET',
      '/api/v2/chat/threads/{message_id}',
      pathParams,
      queryParams,
    );

    decoders.GetThreadResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  updateThreadPartial = async (
    request: UpdateThreadPartialRequest & { message_id: string },
  ): Promise<StreamResponse<UpdateThreadPartialResponse>> => {
    const pathParams = {
      message_id: request?.message_id,
    };
    const body = {
      user_id: request?.user_id,
      unset: request?.unset,
      set: request?.set,
      user: request?.user,
    };

    const response = await this.sendRequest<
      StreamResponse<UpdateThreadPartialResponse>
    >(
      'PATCH',
      '/api/v2/chat/threads/{message_id}',
      pathParams,
      undefined,
      body,
    );

    decoders.UpdateThreadPartialResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unreadCounts = async (): Promise<
    StreamResponse<WrappedUnreadCountsResponse>
  > => {
    const response = await this.sendRequest<
      StreamResponse<WrappedUnreadCountsResponse>
    >('GET', '/api/v2/chat/unread', undefined, undefined);

    decoders.WrappedUnreadCountsResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  unreadCountsBatch = async (
    request: UnreadCountsBatchRequest,
  ): Promise<StreamResponse<UnreadCountsBatchResponse>> => {
    const body = {
      user_ids: request?.user_ids,
    };

    const response = await this.sendRequest<
      StreamResponse<UnreadCountsBatchResponse>
    >('POST', '/api/v2/chat/unread_batch', undefined, undefined, body);

    decoders.UnreadCountsBatchResponse?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };

  sendUserCustomEvent = async (
    request: SendUserCustomEventRequest & { user_id: string },
  ): Promise<StreamResponse<Response>> => {
    const pathParams = {
      user_id: request?.user_id,
    };
    const body = {
      event: request?.event,
    };

    const response = await this.sendRequest<StreamResponse<Response>>(
      'POST',
      '/api/v2/chat/users/{user_id}/event',
      pathParams,
      undefined,
      body,
    );

    decoders.Response?.(response.body);

    return { ...response.body, metadata: response.metadata };
  };
}
