import { StreamChannel } from "./StreamChannel";
import { StreamClient } from "./StreamClient";
import { ChannelTypesApi, ChannelsApi, CreateBlockListRequest, CreateChannelTypeRequest, DeleteBlockListRequest, DeleteChannelTypeRequest, ExportChannelsRequest, GetBlockListRequest, GetChannelTypeRequest, GetExportChannelsStatusRequest, QueryChannelsRequest, SearchRequest, SettingsApi, UpdateBlockListRequest, UpdateChannelTypeRequest } from "./gen/chat";

export class StreamChatClient {
  private settingsApi: SettingsApi;
  private channelTypesApi: ChannelTypesApi;
  private channelsApi: ChannelsApi;

  constructor(private streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration();
    //@ts-expect-error typing problem
    this.settingsApi = new SettingsApi(configuration);
    //@ts-expect-error typing problem
    this.channelTypesApi = new ChannelTypesApi(configuration);
    //@ts-expect-error typing problem
    this.channelsApi = new ChannelsApi(configuration);
  }

  channel = (type: string, id?: string) => {
    return new StreamChannel(this.streamClient, type, id);
  }

  createBlockList = (createBlockListRequest: CreateBlockListRequest) => {
    return this.settingsApi.createBlockList({createBlockListRequest});
  } 

  listBlockLists = () => {
    return this.settingsApi.listBlockLists();
  }

  getBlockList = (request: GetBlockListRequest) => {
    return this.settingsApi.getBlockList(request);
  }

  updateBlockList = (name: string, updateBlockListRequest: UpdateBlockListRequest) => {
    return this.settingsApi.updateBlockList({name, updateBlockListRequest});
  }

  deleteBlockList = (request: DeleteBlockListRequest) => {
    return this.settingsApi.deleteBlockList(request);
  }

  createChannelType = (createChannelTypeRequest: CreateChannelTypeRequest) => {
    return this.channelTypesApi.createChannelType({createChannelTypeRequest});
  }

  deleteChannelType = (request: DeleteChannelTypeRequest) => {
    return this.channelTypesApi.deleteChannelType(request);
  }

  getChannelType = (request: GetChannelTypeRequest) => {
    return this.channelTypesApi.getChannelType(request);
  }

  listChannelTypes = () => {
    return this.channelTypesApi.listChannelTypes();
  }

  updateChannelType = (name: string, updateChannelTypeRequest: UpdateChannelTypeRequest) => {
    return this.channelTypesApi.updateChannelType({name, updateChannelTypeRequest});
  }

  queryChannels = (queryChannelsRequest?: QueryChannelsRequest) => {
    return this.channelsApi.queryChannels({queryChannelsRequest: queryChannelsRequest || null});
  }

  searchMessages = (payload?: SearchRequest) => {
    return this.channelsApi.search({payload: payload});
  }

  exportChannels = (exportChannelsRequest?: ExportChannelsRequest) => {
    return this.channelsApi.exportChannels({exportChannelsRequest: exportChannelsRequest || null});
  }

  getExportStatus = (request: GetExportChannelsStatusRequest) => {
    return this.channelsApi.getExportChannelsStatus(request);
  }
}
