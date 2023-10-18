import { StreamClient } from "./StreamClient";
import { ChannelGetOrCreateRequest, ChannelsApi, DeleteChannelRequest, HideChannelRequest, MarkReadRequest, MarkUnreadRequest, MuteChannelRequest, QueryMembersRequest, ShowChannelRequest, TruncateChannelRequest, UnmuteChannelRequest, UpdateChannelPartialRequest, UpdateChannelRequest } from "./gen/chat";
import { OmitTypeId } from "./types";

export class StreamChannel {
  private readonly channelsApi: ChannelsApi;

  constructor(
    private streamClient: StreamClient,
    public readonly type: string,
    public id?: string
  ) {
    const configuration = this.streamClient.getConfiguration();
    //@ts-expect-error typing problem
    this.channelsApi = new ChannelsApi(configuration);
  }

  get cid() {
    return `${this.baseRequest.type}:${this.baseRequest.id}`
  }

  delete = (request?: OmitTypeId<DeleteChannelRequest>) => {
    return this.channelsApi.deleteChannel({...this.baseRequest, ...(request || {})});
  }

  update = (updateChannelRequest: OmitTypeId<UpdateChannelRequest>) => {
    return this.channelsApi.updateChannel({...this.baseRequest, updateChannelRequest});
  }

  updatePartial = (updateChannelPartialRequest: OmitTypeId<UpdateChannelPartialRequest>) => {
    return this.channelsApi.updateChannelPartial({...this.baseRequest, updateChannelPartialRequest});
  }

  getOrCreate = async (channelGetOrCreateRequest?: ChannelGetOrCreateRequest) => {
    if (this.id) {
      return this.channelsApi.getOrCreateChannelTypeId0({...this.baseRequest, channelGetOrCreateRequest: channelGetOrCreateRequest || null});
    } else {
      if (!channelGetOrCreateRequest?.data?.members) {
        throw new Error('You need to provide members to create a channel without ID');
      }
      const response = await this.channelsApi.getOrCreateChannelType1({type: this.type, channelGetOrCreateRequest});
      this.id = response.channel?.id;
      return response;
    }
  }

  markRead = (markReadRequest: MarkReadRequest) => {
    return this.channelsApi.markRead({...this.baseRequest, markReadRequest});
  }

  markUnread = (markUnreadRequest: MarkUnreadRequest) => {
    return this.channelsApi.markUnread({...this.baseRequest, markUnreadRequest});
  }

  show = (showChannelRequest: ShowChannelRequest) => {
    return this.channelsApi.showChannel({...this.baseRequest, showChannelRequest});
  }

  hide = (hideChannelRequest: HideChannelRequest) => {
    return this.channelsApi.hideChannel({...this.baseRequest, hideChannelRequest});
  }

  truncate = (truncateChannelRequest: TruncateChannelRequest ) => {
    return this.channelsApi.truncateChannel({...this.baseRequest, truncateChannelRequest});
  }

  queryMembers = (request: OmitTypeId<QueryMembersRequest>) => {
    return this.channelsApi.queryMembers({payload: {...this.baseRequest, ...request}});
  }

  mute = (muteChannelRequest: Omit<MuteChannelRequest, 'channel_cids'>) => {
    return this.channelsApi.muteChannel({muteChannelRequest: {...muteChannelRequest, channel_cids: [this.cid]}});
  }

  unmute = (unmuteChannelRequest: Omit<UnmuteChannelRequest, 'channel_cids' | 'channel_cid'>) => {
    return this.channelsApi.unmuteChannel({unmuteChannelRequest: {...unmuteChannelRequest, channel_cid: this.cid, channel_cids: []}});
  }

  private get baseRequest() {
    if (!this.id) {
      throw new Error('You need to initialize the channel with `getOrCreate`');
    }

    return {
      id: this.id,
      type: this.type
    }
  }
}
