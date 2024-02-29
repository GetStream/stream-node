import { StreamClient } from './StreamClient';
import {
  ChannelGetOrCreateRequest,
  ChannelsApi,
  DeleteChannelRequest,
  DeleteMessageRequest,
  DeleteReactionRequest,
  EventRequest,
  EventsApi,
  GetManyMessagesRequest,
  GetMessageRequest,
  GetOGRequest,
  GetReactionsRequest,
  GetRepliesRequest,
  HideChannelRequest,
  MarkReadRequest,
  MarkUnreadRequest,
  MessagesApi,
  MuteChannelRequest,
  QueryMembersRequest,
  SendMessageRequest,
  SendReactionRequest,
  ShowChannelRequest,
  TranslateMessageRequest,
  TruncateChannelRequest,
  UnmuteChannelRequest,
  UpdateChannelPartialRequest,
  UpdateChannelRequest,
  UpdateMessagePartialRequest,
  UpdateMessageRequest,
} from './gen/chat';
import { OmitTypeId } from './types';

export class StreamChannel {
  private readonly channelsApi: ChannelsApi;
  private readonly messagesApi: MessagesApi;
  private readonly eventsApi: EventsApi;

  constructor(
    private readonly streamClient: StreamClient,
    public readonly type: string,
    public id?: string,
  ) {
    const configuration = this.streamClient.getConfiguration();
    /** @ts-expect-error */
    this.channelsApi = new ChannelsApi(configuration);
    /** @ts-expect-error */
    this.messagesApi = new MessagesApi(configuration);
    /** @ts-expect-error */
    this.eventsApi = new EventsApi(configuration);
  }

  get cid() {
    return `${this.baseRequest.type}:${this.baseRequest.id}`;
  }

  delete = (request?: OmitTypeId<DeleteChannelRequest>) => {
    return this.channelsApi.deleteChannel({
      ...this.baseRequest,
      ...(request ?? {}),
    });
  };

  update = (updateChannelRequest: OmitTypeId<UpdateChannelRequest>) => {
    return this.channelsApi.updateChannel({
      ...this.baseRequest,
      updateChannelRequest,
    });
  };

  updatePartial = (
    updateChannelPartialRequest: OmitTypeId<UpdateChannelPartialRequest>,
  ) => {
    return this.channelsApi.updateChannelPartial({
      ...this.baseRequest,
      updateChannelPartialRequest,
    });
  };

  getOrCreate = async (
    channelGetOrCreateRequest?: ChannelGetOrCreateRequest,
  ) => {
    if (this.id) {
      return await this.channelsApi.getOrCreateChannel({
        ...this.baseRequest,
        channelGetOrCreateRequest: channelGetOrCreateRequest ?? {},
      });
    } else {
      throw new Error(`This operation isn't yet implemented`);
      // if (!channelGetOrCreateRequest?.data?.members) {
      //   throw new Error('You need to provide members to create a channel without ID');
      // }
      // const response = await this.channelsApi.getOrCreateChannelType1({type: this.type, channelGetOrCreateRequest});
      // this.id = response.channel?.id;
      // return response;
    }
  };

  markRead = (markReadRequest: MarkReadRequest) => {
    return this.channelsApi.markRead({ ...this.baseRequest, markReadRequest });
  };

  markUnread = (markUnreadRequest: MarkUnreadRequest) => {
    return this.channelsApi.markUnread({
      ...this.baseRequest,
      markUnreadRequest,
    });
  };

  show = (showChannelRequest: ShowChannelRequest) => {
    return this.channelsApi.showChannel({
      ...this.baseRequest,
      showChannelRequest,
    });
  };

  hide = (hideChannelRequest: HideChannelRequest) => {
    return this.channelsApi.hideChannel({
      ...this.baseRequest,
      hideChannelRequest,
    });
  };

  truncate = (truncateChannelRequest: TruncateChannelRequest) => {
    return this.channelsApi.truncateChannel({
      ...this.baseRequest,
      truncateChannelRequest,
    });
  };

  queryMembers = (request: OmitTypeId<QueryMembersRequest>) => {
    return this.channelsApi.queryMembers({
      payload: { ...this.baseRequest, ...request },
    });
  };

  mute = (muteChannelRequest: Omit<MuteChannelRequest, 'channel_cids'>) => {
    return this.channelsApi.muteChannel({
      muteChannelRequest: { ...muteChannelRequest, channel_cids: [this.cid] },
    });
  };

  unmute = (
    unmuteChannelRequest: Omit<
      UnmuteChannelRequest,
      'channel_cids' | 'channel_cid'
    >,
  ) => {
    return this.channelsApi.unmuteChannel({
      unmuteChannelRequest: {
        ...unmuteChannelRequest,
        channel_cid: this.cid,
        channel_cids: [],
      },
    });
  };

  // TODO: there is probably an issue with the generated code here
  // uploadFile = (options: Omit<OmitTypeId<UploadFileRequest>, 'file'>, file: Buffer) => {
  //   return this.messagesApi.uploadFile({...options, ...this.baseRequest, file: file as any as string});
  // }

  // deleteFile = (request: OmitTypeId<DeleteFileRequest>) => {
  //   return this.messagesApi.deleteFile({...request, ...this.baseRequest});
  // }

  // uploadImage = (request: OmitTypeId<UploadImageRequest>) => {
  //   return this.messagesApi.uploadImage({...request, ...this.baseRequest});
  // }

  // deleteImage = (request: OmitTypeId<DeleteImageRequest>) => {
  //   return this.messagesApi.deleteImage({...request, ...this.baseRequest});
  // }

  sendMessage = (sendMessageRequest: SendMessageRequest) => {
    return this.messagesApi.sendMessage({
      ...this.baseRequest,
      sendMessageRequest,
    });
  };

  deleteMessage = (request: DeleteMessageRequest) => {
    return this.messagesApi.deleteMessage(request);
  };

  updateMessage = (id: string, updateMessageRequest: UpdateMessageRequest) => {
    return this.messagesApi.updateMessage({ id, updateMessageRequest });
  };

  updateMessagePartial = (
    id: string,
    updateMessagePartialRequest: UpdateMessagePartialRequest,
  ) => {
    return this.messagesApi.updateMessagePartial({
      id,
      updateMessagePartialRequest,
    });
  };

  getMessage = (request: GetMessageRequest) => {
    return this.messagesApi.getMessage(request);
  };

  getManyMessages = (request: OmitTypeId<GetManyMessagesRequest>) => {
    return this.messagesApi.getManyMessages({
      ...request,
      ...this.baseRequest,
    });
  };

  translateMessage = (
    id: string,
    translateMessageRequest: TranslateMessageRequest,
  ) => {
    return this.messagesApi.translateMessage({ id, translateMessageRequest });
  };

  getMessagesAround = (request: GetRepliesRequest) => {
    return this.messagesApi.getReplies(request);
  };

  getOpenGraphData = (request: GetOGRequest) => {
    return this.messagesApi.getOG(request);
  };

  sendMessageReaction = (
    messageId: string,
    sendReactionRequest: SendReactionRequest,
  ) => {
    return this.messagesApi.sendReaction({
      id: messageId,
      sendReactionRequest,
    });
  };

  deleteMessageReaction = (
    messageId: string,
    request: Omit<DeleteReactionRequest, 'id'>,
  ) => {
    return this.messagesApi.deleteReaction({ ...request, id: messageId });
  };

  getMessageReactions = (
    messageId: string,
    request?: Omit<GetReactionsRequest, 'id'>,
  ) => {
    return this.messagesApi.getReactions({ ...(request ?? {}), id: messageId });
  };

  sendCustomEvent = (event: EventRequest) => {
    return this.eventsApi.sendEvent({
      ...this.baseRequest,
      sendEventRequest: { event },
    });
  };

  private get baseRequest() {
    if (!this.id) {
      throw new Error('You need to initialize the channel with `getOrCreate`');
    }

    return {
      id: this.id,
      type: this.type,
    };
  }
}
