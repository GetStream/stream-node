import { StreamClient } from "./StreamClient";
import { ChannelTypesApi, CreateBlockListRequest, CreateChannelTypeRequest, DeleteBlockListRequest, DeleteChannelTypeRequest, GetBlockListRequest, GetChannelTypeRequest, SettingsApi, UpdateBlockListRequest, UpdateChannelTypeRequest } from "./gen/chat";

export class StreamChatClient {
  private settingsApi: SettingsApi;
  private channelTypesApi: ChannelTypesApi;

  constructor(private streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration();
    //@ts-expect-error typing problem
    this.settingsApi = new SettingsApi(configuration);
    //@ts-expect-error typing problem
    this.channelTypesApi = new ChannelTypesApi(configuration);
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
}
