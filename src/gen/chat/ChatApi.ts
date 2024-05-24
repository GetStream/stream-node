import { BaseApi } from '../../BaseApi';
import { ApiConfig } from '../../types';
import {
    // TODO: remove duplicates from import
    
    QueryChannelsResponse,QueryChannelsRequest,
    DeleteChannelsResponse,DeleteChannelsRequest,
    MarkReadResponse,MarkChannelsReadRequest,
    ChannelStateResponse,ChannelGetOrCreateRequest,
    DeleteChannelResponse,
    UpdateChannelPartialResponse,UpdateChannelPartialRequest,
    UpdateChannelResponse,UpdateChannelRequest,
    EventResponse,SendEventRequest,
    FileDeleteResponse,
    FileUploadResponse,FileUploadRequest,
    HideChannelResponse,HideChannelRequest,
    FileDeleteResponse,
    ImageUploadResponse,ImageUploadRequest,
    SendMessageResponse,SendMessageRequest,
    GetManyMessagesResponse,
    ChannelStateResponse,ChannelGetOrCreateRequest,
    MarkReadResponse,MarkReadRequest,
    ShowChannelResponse,ShowChannelRequest,
    TruncateChannelResponse,TruncateChannelRequest,
    Response,MarkUnreadRequest,
    ListChannelTypesResponse,
    CreateChannelTypeResponse,CreateChannelTypeRequest,
    Response,
    Response,
    UpdateChannelTypeResponse,UpdateChannelTypeRequest,
    ListCommandsResponse,
    CreateCommandResponse,CreateCommandRequest,
    DeleteCommandResponse,
    GetCommandResponse,
    UpdateCommandResponse,UpdateCommandRequest,
    ExportChannelsResponse,ExportChannelsRequest,
    GetExportChannelsStatusResponse,
    MembersResponse,
    QueryMessageHistoryResponse,QueryMessageHistoryRequest,
    DeleteMessageResponse,
    GetMessageResponse,
    UpdateMessageResponse,UpdateMessageRequest,
    UpdateMessagePartialResponse,UpdateMessagePartialRequest,
    MessageResponse,MessageActionRequest,
    MessageResponse,CommitMessageRequest,
    SendReactionResponse,SendReactionRequest,
    ReactionRemovalResponse,
    GetReactionsResponse,
    QueryReactionsResponse,QueryReactionsRequest,
    MessageResponse,TranslateMessageRequest,
    UpdateMessageResponse,UpdateMessageRequest,
    PollVoteResponse,CastPollVoteRequest,
    PollVoteResponse,
    GetRepliesResponse,
    QueryMessageFlagsResponse,
    MuteChannelResponse,MuteChannelRequest,
    UnmuteResponse,UnmuteChannelRequest,
    PollResponse,CreatePollRequest,
    PollResponse,UpdatePollRequest,
    QueryPollsResponse,QueryPollsRequest,
    Response,
    PollResponse,
    PollResponse,UpdatePollPartialRequest,
    PollOptionResponse,CreatePollOptionRequest,
    PollOptionResponse,UpdatePollOptionRequest,
    Response,
    PollOptionResponse,
    PollVotesResponse,QueryPollVotesRequest,
    QueryBannedUsersResponse,
    SearchResponse,
    QueryThreadsResponse,QueryThreadsRequest,
    GetThreadResponse,
    UpdateThreadPartialResponse,UpdateThreadPartialRequest,
    WrappedUnreadCountsResponse,
    UnreadCountsBatchResponse,UnreadCountsBatchRequest,
    Response,SendUserCustomEventRequest,} from '../models';

export class ChatApi extends BaseApi {

    constructor(apiConfig: ApiConfig) {
      super(apiConfig);
    }

    
    queryChannels(query_channels_request?: QueryChannelsRequest): Promise<QueryChannelsResponse> {
        const body = query_channels_request;
        

        return this.sendRequest<QueryChannelsResponse>('POST', '/api/v2/chat/channels',  undefined ,  undefined  , body);
}
    
    deleteChannels(delete_channels_request: DeleteChannelsRequest): Promise<DeleteChannelsResponse> {
        const body = delete_channels_request;
        

        return this.sendRequest<DeleteChannelsResponse>('POST', '/api/v2/chat/channels/delete',  undefined ,  undefined  , body);
}
    
    markChannelsRead(mark_channels_read_request?: MarkChannelsReadRequest): Promise<MarkReadResponse> {
        const body = mark_channels_read_request;
        

        return this.sendRequest<MarkReadResponse>('POST', '/api/v2/chat/channels/read',  undefined ,  undefined  , body);
}
    
    getOrCreateDistinctChannel(type: string, channel_get_or_create_request?: ChannelGetOrCreateRequest): Promise<ChannelStateResponse> {
        const pathParams = {
          type: type,
        };
        const body = channel_get_or_create_request;
        

        return this.sendRequest<ChannelStateResponse>('POST', '/api/v2/chat/channels/{type}/query', pathParams ,  undefined  , body);
}
    
    deleteChannel(type: string, id: string, hard_delete?: boolean): Promise<DeleteChannelResponse> {
        const queryParams = {
          hard_delete: hard_delete,
        };
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<DeleteChannelResponse>('DELETE', '/api/v2/chat/channels/{type}/{id}', pathParams , queryParams  );
}
    
    updateChannelPartial(type: string, id: string, update_channel_partial_request?: UpdateChannelPartialRequest): Promise<UpdateChannelPartialResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = update_channel_partial_request;
        

        return this.sendRequest<UpdateChannelPartialResponse>('PATCH', '/api/v2/chat/channels/{type}/{id}', pathParams ,  undefined  , body);
}
    
    updateChannel(type: string, id: string, update_channel_request?: UpdateChannelRequest): Promise<UpdateChannelResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = update_channel_request;
        

        return this.sendRequest<UpdateChannelResponse>('POST', '/api/v2/chat/channels/{type}/{id}', pathParams ,  undefined  , body);
}
    
    sendEvent(type: string, id: string, send_event_request: SendEventRequest): Promise<EventResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = send_event_request;
        

        return this.sendRequest<EventResponse>('POST', '/api/v2/chat/channels/{type}/{id}/event', pathParams ,  undefined  , body);
}
    
    deleteFile(type: string, id: string, url?: string): Promise<FileDeleteResponse> {
        const queryParams = {
          url: url,
        };
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<FileDeleteResponse>('DELETE', '/api/v2/chat/channels/{type}/{id}/file', pathParams , queryParams  );
}
    
    uploadFile(type: string, id: string, file_upload_request?: FileUploadRequest): Promise<FileUploadResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = file_upload_request;
        

        return this.sendRequest<FileUploadResponse>('POST', '/api/v2/chat/channels/{type}/{id}/file', pathParams ,  undefined  , body);
}
    
    hideChannel(type: string, id: string, hide_channel_request?: HideChannelRequest): Promise<HideChannelResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = hide_channel_request;
        

        return this.sendRequest<HideChannelResponse>('POST', '/api/v2/chat/channels/{type}/{id}/hide', pathParams ,  undefined  , body);
}
    
    deleteImage(type: string, id: string, url?: string): Promise<FileDeleteResponse> {
        const queryParams = {
          url: url,
        };
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<FileDeleteResponse>('DELETE', '/api/v2/chat/channels/{type}/{id}/image', pathParams , queryParams  );
}
    
    uploadImage(type: string, id: string, image_upload_request?: ImageUploadRequest): Promise<ImageUploadResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = image_upload_request;
        

        return this.sendRequest<ImageUploadResponse>('POST', '/api/v2/chat/channels/{type}/{id}/image', pathParams ,  undefined  , body);
}
    
    sendMessage(type: string, id: string, send_message_request: SendMessageRequest): Promise<SendMessageResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = send_message_request;
        

        return this.sendRequest<SendMessageResponse>('POST', '/api/v2/chat/channels/{type}/{id}/message', pathParams ,  undefined  , body);
}
    
    getManyMessages(type: string, id: string, ids: Array<string>): Promise<GetManyMessagesResponse> {
        const queryParams = {
          ids: ids,
        };
        const pathParams = {
          type: type, id: id,
        };
        

        return this.sendRequest<GetManyMessagesResponse>('GET', '/api/v2/chat/channels/{type}/{id}/messages', pathParams , queryParams  );
}
    
    getOrCreateChannel(type: string, id: string, channel_get_or_create_request?: ChannelGetOrCreateRequest): Promise<ChannelStateResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = channel_get_or_create_request;
        

        return this.sendRequest<ChannelStateResponse>('POST', '/api/v2/chat/channels/{type}/{id}/query', pathParams ,  undefined  , body);
}
    
    markRead(type: string, id: string, mark_read_request?: MarkReadRequest): Promise<MarkReadResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = mark_read_request;
        

        return this.sendRequest<MarkReadResponse>('POST', '/api/v2/chat/channels/{type}/{id}/read', pathParams ,  undefined  , body);
}
    
    showChannel(type: string, id: string, show_channel_request?: ShowChannelRequest): Promise<ShowChannelResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = show_channel_request;
        

        return this.sendRequest<ShowChannelResponse>('POST', '/api/v2/chat/channels/{type}/{id}/show', pathParams ,  undefined  , body);
}
    
    truncateChannel(type: string, id: string, truncate_channel_request?: TruncateChannelRequest): Promise<TruncateChannelResponse> {
        const pathParams = {
          type: type, id: id,
        };
        const body = truncate_channel_request;
        

        return this.sendRequest<TruncateChannelResponse>('POST', '/api/v2/chat/channels/{type}/{id}/truncate', pathParams ,  undefined  , body);
}
    
    markUnread(type: string, id: string, mark_unread_request?: MarkUnreadRequest): Promise<Response> {
        const pathParams = {
          type: type, id: id,
        };
        const body = mark_unread_request;
        

        return this.sendRequest<Response>('POST', '/api/v2/chat/channels/{type}/{id}/unread', pathParams ,  undefined  , body);
}
    
    listChannelTypes(): Promise<ListChannelTypesResponse> {
        

        return this.sendRequest<ListChannelTypesResponse>('GET', '/api/v2/chat/channeltypes',  undefined ,  undefined  );
}
    
    createChannelType(create_channel_type_request: CreateChannelTypeRequest): Promise<CreateChannelTypeResponse> {
        const body = create_channel_type_request;
        

        return this.sendRequest<CreateChannelTypeResponse>('POST', '/api/v2/chat/channeltypes',  undefined ,  undefined  , body);
}
    
    deleteChannelType(name: string): Promise<Response> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/chat/channeltypes/{name}', pathParams ,  undefined  );
}
    
    getChannelType(name: string): Promise<Response> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<Response>('GET', '/api/v2/chat/channeltypes/{name}', pathParams ,  undefined  );
}
    
    updateChannelType(name: string, update_channel_type_request: UpdateChannelTypeRequest): Promise<UpdateChannelTypeResponse> {
        const pathParams = {
          name: name,
        };
        const body = update_channel_type_request;
        

        return this.sendRequest<UpdateChannelTypeResponse>('PUT', '/api/v2/chat/channeltypes/{name}', pathParams ,  undefined  , body);
}
    
    listCommands(): Promise<ListCommandsResponse> {
        

        return this.sendRequest<ListCommandsResponse>('GET', '/api/v2/chat/commands',  undefined ,  undefined  );
}
    
    createCommand(create_command_request: CreateCommandRequest): Promise<CreateCommandResponse> {
        const body = create_command_request;
        

        return this.sendRequest<CreateCommandResponse>('POST', '/api/v2/chat/commands',  undefined ,  undefined  , body);
}
    
    deleteCommand(name: string): Promise<DeleteCommandResponse> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<DeleteCommandResponse>('DELETE', '/api/v2/chat/commands/{name}', pathParams ,  undefined  );
}
    
    getCommand(name: string): Promise<GetCommandResponse> {
        const pathParams = {
          name: name,
        };
        

        return this.sendRequest<GetCommandResponse>('GET', '/api/v2/chat/commands/{name}', pathParams ,  undefined  );
}
    
    updateCommand(name: string, update_command_request: UpdateCommandRequest): Promise<UpdateCommandResponse> {
        const pathParams = {
          name: name,
        };
        const body = update_command_request;
        

        return this.sendRequest<UpdateCommandResponse>('PUT', '/api/v2/chat/commands/{name}', pathParams ,  undefined  , body);
}
    
    exportChannels(export_channels_request: ExportChannelsRequest): Promise<ExportChannelsResponse> {
        const body = export_channels_request;
        

        return this.sendRequest<ExportChannelsResponse>('POST', '/api/v2/chat/export_channels',  undefined ,  undefined  , body);
}
    
    getExportChannelsStatus(id: string): Promise<GetExportChannelsStatusResponse> {
        const pathParams = {
          id: id,
        };
        

        return this.sendRequest<GetExportChannelsStatusResponse>('GET', '/api/v2/chat/export_channels/{id}', pathParams ,  undefined  );
}
    
    queryMembers(payload?: QueryMembersRequest): Promise<MembersResponse> {
        const queryParams = {
          payload: payload,
        };
        

        return this.sendRequest<MembersResponse>('GET', '/api/v2/chat/members',  undefined , queryParams  );
}
    
    queryMessageHistory(query_message_history_request: QueryMessageHistoryRequest): Promise<QueryMessageHistoryResponse> {
        const body = query_message_history_request;
        

        return this.sendRequest<QueryMessageHistoryResponse>('POST', '/api/v2/chat/messages/history',  undefined ,  undefined  , body);
}
    
    deleteMessage(id: string, hard?: boolean, deleted_by?: string): Promise<DeleteMessageResponse> {
        const queryParams = {
          hard: hard, deleted_by: deleted_by,
        };
        const pathParams = {
          id: id,
        };
        

        return this.sendRequest<DeleteMessageResponse>('DELETE', '/api/v2/chat/messages/{id}', pathParams , queryParams  );
}
    
    getMessage(id: string, show_deleted_message?: boolean): Promise<GetMessageResponse> {
        const queryParams = {
          show_deleted_message: show_deleted_message,
        };
        const pathParams = {
          id: id,
        };
        

        return this.sendRequest<GetMessageResponse>('GET', '/api/v2/chat/messages/{id}', pathParams , queryParams  );
}
    
    updateMessage(id: string, update_message_request: UpdateMessageRequest): Promise<UpdateMessageResponse> {
        const pathParams = {
          id: id,
        };
        const body = update_message_request;
        

        return this.sendRequest<UpdateMessageResponse>('POST', '/api/v2/chat/messages/{id}', pathParams ,  undefined  , body);
}
    
    updateMessagePartial(id: string, update_message_partial_request?: UpdateMessagePartialRequest): Promise<UpdateMessagePartialResponse> {
        const pathParams = {
          id: id,
        };
        const body = update_message_partial_request;
        

        return this.sendRequest<UpdateMessagePartialResponse>('PUT', '/api/v2/chat/messages/{id}', pathParams ,  undefined  , body);
}
    
    runMessageAction(id: string, message_action_request: MessageActionRequest): Promise<MessageResponse> {
        const pathParams = {
          id: id,
        };
        const body = message_action_request;
        

        return this.sendRequest<MessageResponse>('POST', '/api/v2/chat/messages/{id}/action', pathParams ,  undefined  , body);
}
    
    commitMessage(id: string, commit_message_request?: CommitMessageRequest): Promise<MessageResponse> {
        const pathParams = {
          id: id,
        };
        const body = commit_message_request;
        

        return this.sendRequest<MessageResponse>('POST', '/api/v2/chat/messages/{id}/commit', pathParams ,  undefined  , body);
}
    
    sendReaction(id: string, send_reaction_request: SendReactionRequest): Promise<SendReactionResponse> {
        const pathParams = {
          id: id,
        };
        const body = send_reaction_request;
        

        return this.sendRequest<SendReactionResponse>('POST', '/api/v2/chat/messages/{id}/reaction', pathParams ,  undefined  , body);
}
    
    deleteReaction(id: string, type: string, user_id?: string): Promise<ReactionRemovalResponse> {
        const queryParams = {
          user_id: user_id,
        };
        const pathParams = {
          id: id, type: type,
        };
        

        return this.sendRequest<ReactionRemovalResponse>('DELETE', '/api/v2/chat/messages/{id}/reaction/{type}', pathParams , queryParams  );
}
    
    getReactions(id: string, limit?: number, offset?: number): Promise<GetReactionsResponse> {
        const queryParams = {
          limit: limit, offset: offset,
        };
        const pathParams = {
          id: id,
        };
        

        return this.sendRequest<GetReactionsResponse>('GET', '/api/v2/chat/messages/{id}/reactions', pathParams , queryParams  );
}
    
    queryReactions(id: string, query_reactions_request?: QueryReactionsRequest): Promise<QueryReactionsResponse> {
        const pathParams = {
          id: id,
        };
        const body = query_reactions_request;
        

        return this.sendRequest<QueryReactionsResponse>('POST', '/api/v2/chat/messages/{id}/reactions', pathParams ,  undefined  , body);
}
    
    translateMessage(id: string, translate_message_request: TranslateMessageRequest): Promise<MessageResponse> {
        const pathParams = {
          id: id,
        };
        const body = translate_message_request;
        

        return this.sendRequest<MessageResponse>('POST', '/api/v2/chat/messages/{id}/translate', pathParams ,  undefined  , body);
}
    
    undeleteMessage(id: string, update_message_request: UpdateMessageRequest): Promise<UpdateMessageResponse> {
        const pathParams = {
          id: id,
        };
        const body = update_message_request;
        

        return this.sendRequest<UpdateMessageResponse>('POST', '/api/v2/chat/messages/{id}/undelete', pathParams ,  undefined  , body);
}
    
    castPollVote(message_id: string, poll_id: string, cast_poll_vote_request?: CastPollVoteRequest): Promise<PollVoteResponse> {
        const pathParams = {
          message_id: message_id, poll_id: poll_id,
        };
        const body = cast_poll_vote_request;
        

        return this.sendRequest<PollVoteResponse>('POST', '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote', pathParams ,  undefined  , body);
}
    
    removePollVote(message_id: string, poll_id: string, vote_id: string, user_id?: string): Promise<PollVoteResponse> {
        const queryParams = {
          user_id: user_id,
        };
        const pathParams = {
          message_id: message_id, poll_id: poll_id, vote_id: vote_id,
        };
        

        return this.sendRequest<PollVoteResponse>('DELETE', '/api/v2/chat/messages/{message_id}/polls/{poll_id}/vote/{vote_id}', pathParams , queryParams  );
}
    
    getReplies(parent_id: string, limit?: number, offset?: number, id_gte?: string, id_gt?: string, id_lte?: string, id_lt?: string, created_at_after_or_equal?: Date, created_at_after?: Date, created_at_before_or_equal?: Date, created_at_before?: Date, id_around?: string, created_at_around?: Date, sort?: Array<SortParam>): Promise<GetRepliesResponse> {
        const queryParams = {
          limit: limit, offset: offset, id_gte: id_gte, id_gt: id_gt, id_lte: id_lte, id_lt: id_lt, created_at_after_or_equal: created_at_after_or_equal, created_at_after: created_at_after, created_at_before_or_equal: created_at_before_or_equal, created_at_before: created_at_before, id_around: id_around, created_at_around: created_at_around, sort: sort,
        };
        const pathParams = {
          parent_id: parent_id,
        };
        

        return this.sendRequest<GetRepliesResponse>('GET', '/api/v2/chat/messages/{parent_id}/replies', pathParams , queryParams  );
}
    
    queryMessageFlags(payload?: QueryMessageFlagsRequest): Promise<QueryMessageFlagsResponse> {
        const queryParams = {
          payload: payload,
        };
        

        return this.sendRequest<QueryMessageFlagsResponse>('GET', '/api/v2/chat/moderation/flags/message',  undefined , queryParams  );
}
    
    muteChannel(mute_channel_request?: MuteChannelRequest): Promise<MuteChannelResponse> {
        const body = mute_channel_request;
        

        return this.sendRequest<MuteChannelResponse>('POST', '/api/v2/chat/moderation/mute/channel',  undefined ,  undefined  , body);
}
    
    unmuteChannel(unmute_channel_request?: UnmuteChannelRequest): Promise<UnmuteResponse> {
        const body = unmute_channel_request;
        

        return this.sendRequest<UnmuteResponse>('POST', '/api/v2/chat/moderation/unmute/channel',  undefined ,  undefined  , body);
}
    
    createPoll(create_poll_request: CreatePollRequest): Promise<PollResponse> {
        const body = create_poll_request;
        

        return this.sendRequest<PollResponse>('POST', '/api/v2/chat/polls',  undefined ,  undefined  , body);
}
    
    updatePoll(update_poll_request: UpdatePollRequest): Promise<PollResponse> {
        const body = update_poll_request;
        

        return this.sendRequest<PollResponse>('PUT', '/api/v2/chat/polls',  undefined ,  undefined  , body);
}
    
    queryPolls(user_id?: string, query_polls_request?: QueryPollsRequest): Promise<QueryPollsResponse> {
        const queryParams = {
          user_id: user_id,
        };
        const body = query_polls_request;
        

        return this.sendRequest<QueryPollsResponse>('POST', '/api/v2/chat/polls/query',  undefined , queryParams  , body);
}
    
    deletePoll(poll_id: string, user_id?: string): Promise<Response> {
        const queryParams = {
          user_id: user_id,
        };
        const pathParams = {
          poll_id: poll_id,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/chat/polls/{poll_id}', pathParams , queryParams  );
}
    
    getPoll(poll_id: string, user_id?: string): Promise<PollResponse> {
        const queryParams = {
          user_id: user_id,
        };
        const pathParams = {
          poll_id: poll_id,
        };
        

        return this.sendRequest<PollResponse>('GET', '/api/v2/chat/polls/{poll_id}', pathParams , queryParams  );
}
    
    updatePollPartial(poll_id: string, update_poll_partial_request?: UpdatePollPartialRequest): Promise<PollResponse> {
        const pathParams = {
          poll_id: poll_id,
        };
        const body = update_poll_partial_request;
        

        return this.sendRequest<PollResponse>('PATCH', '/api/v2/chat/polls/{poll_id}', pathParams ,  undefined  , body);
}
    
    createPollOption(poll_id: string, create_poll_option_request: CreatePollOptionRequest): Promise<PollOptionResponse> {
        const pathParams = {
          poll_id: poll_id,
        };
        const body = create_poll_option_request;
        

        return this.sendRequest<PollOptionResponse>('POST', '/api/v2/chat/polls/{poll_id}/options', pathParams ,  undefined  , body);
}
    
    updatePollOption(poll_id: string, update_poll_option_request: UpdatePollOptionRequest): Promise<PollOptionResponse> {
        const pathParams = {
          poll_id: poll_id,
        };
        const body = update_poll_option_request;
        

        return this.sendRequest<PollOptionResponse>('PUT', '/api/v2/chat/polls/{poll_id}/options', pathParams ,  undefined  , body);
}
    
    deletePollOption(poll_id: string, option_id: string, user_id?: string): Promise<Response> {
        const queryParams = {
          user_id: user_id,
        };
        const pathParams = {
          poll_id: poll_id, option_id: option_id,
        };
        

        return this.sendRequest<Response>('DELETE', '/api/v2/chat/polls/{poll_id}/options/{option_id}', pathParams , queryParams  );
}
    
    getPollOption(poll_id: string, option_id: string, user_id?: string): Promise<PollOptionResponse> {
        const queryParams = {
          user_id: user_id,
        };
        const pathParams = {
          poll_id: poll_id, option_id: option_id,
        };
        

        return this.sendRequest<PollOptionResponse>('GET', '/api/v2/chat/polls/{poll_id}/options/{option_id}', pathParams , queryParams  );
}
    
    queryPollVotes(poll_id: string, user_id?: string, query_poll_votes_request?: QueryPollVotesRequest): Promise<PollVotesResponse> {
        const queryParams = {
          user_id: user_id,
        };
        const pathParams = {
          poll_id: poll_id,
        };
        const body = query_poll_votes_request;
        

        return this.sendRequest<PollVotesResponse>('POST', '/api/v2/chat/polls/{poll_id}/votes', pathParams , queryParams  , body);
}
    
    queryBannedUsers(payload?: QueryBannedUsersRequest): Promise<QueryBannedUsersResponse> {
        const queryParams = {
          payload: payload,
        };
        

        return this.sendRequest<QueryBannedUsersResponse>('GET', '/api/v2/chat/query_banned_users',  undefined , queryParams  );
}
    
    search(payload?: SearchRequest): Promise<SearchResponse> {
        const queryParams = {
          payload: payload,
        };
        

        return this.sendRequest<SearchResponse>('GET', '/api/v2/chat/search',  undefined , queryParams  );
}
    
    queryThreads(query_threads_request?: QueryThreadsRequest): Promise<QueryThreadsResponse> {
        const body = query_threads_request;
        

        return this.sendRequest<QueryThreadsResponse>('POST', '/api/v2/chat/threads',  undefined ,  undefined  , body);
}
    
    getThread(message_id: string, connection_id?: string, reply_limit?: number, participant_limit?: number, member_limit?: number): Promise<GetThreadResponse> {
        const queryParams = {
          connection_id: connection_id, reply_limit: reply_limit, participant_limit: participant_limit, member_limit: member_limit,
        };
        const pathParams = {
          message_id: message_id,
        };
        

        return this.sendRequest<GetThreadResponse>('GET', '/api/v2/chat/threads/{message_id}', pathParams , queryParams  );
}
    
    updateThreadPartial(message_id: string, update_thread_partial_request?: UpdateThreadPartialRequest): Promise<UpdateThreadPartialResponse> {
        const pathParams = {
          message_id: message_id,
        };
        const body = update_thread_partial_request;
        

        return this.sendRequest<UpdateThreadPartialResponse>('PATCH', '/api/v2/chat/threads/{message_id}', pathParams ,  undefined  , body);
}
    
    unreadCounts(): Promise<WrappedUnreadCountsResponse> {
        

        return this.sendRequest<WrappedUnreadCountsResponse>('GET', '/api/v2/chat/unread',  undefined ,  undefined  );
}
    
    unreadCountsBatch(unread_counts_batch_request: UnreadCountsBatchRequest): Promise<UnreadCountsBatchResponse> {
        const body = unread_counts_batch_request;
        

        return this.sendRequest<UnreadCountsBatchResponse>('POST', '/api/v2/chat/unread_batch',  undefined ,  undefined  , body);
}
    
    sendUserCustomEvent(user_id: string, send_user_custom_event_request: SendUserCustomEventRequest): Promise<Response> {
        const pathParams = {
          user_id: user_id,
        };
        const body = send_user_custom_event_request;
        

        return this.sendRequest<Response>('POST', '/api/v2/chat/users/{user_id}/event', pathParams ,  undefined  , body);
}
    }