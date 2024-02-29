import { StreamChannel } from './StreamChannel';
import { StreamClient } from './StreamClient';
import {
  ChannelTypesApi,
  ChannelsApi,
  CreateBlockListRequest,
  CreateChannelTypeRequest,
  CreateCommandRequest,
  CustomCommandsApi,
  DeleteBlockListRequest,
  DeleteChannelTypeRequest,
  DeleteCommandRequest,
  ExportChannelsRequest,
  GetBlockListRequest,
  GetChannelTypeRequest,
  GetCommandRequest,
  GetExportChannelsStatusRequest,
  QueryChannelsRequest,
  SearchRequest,
  SettingsApi,
  UpdateBlockListRequest,
  UpdateChannelTypeRequest,
  UpdateCommandRequest,
} from './gen/chat';

export class StreamChatClient {
  private readonly settingsApi: SettingsApi;
  private readonly channelTypesApi: ChannelTypesApi;
  private readonly channelsApi: ChannelsApi;
  private readonly commandsApi: CustomCommandsApi;

  constructor(private readonly streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration();
    /** @ts-expect-error */
    this.settingsApi = new SettingsApi(configuration);
    /** @ts-expect-error */
    this.channelTypesApi = new ChannelTypesApi(configuration);
    /** @ts-expect-error */
    this.channelsApi = new ChannelsApi(configuration);
    /** @ts-expect-error */
    this.commandsApi = new CustomCommandsApi(configuration);
  }

  channel = (type: string, id?: string) => {
    return new StreamChannel(this.streamClient, type, id);
  };

  createBlockList = (createBlockListRequest: CreateBlockListRequest) => {
    return this.settingsApi.createBlockList({ createBlockListRequest });
  };

  listBlockLists = () => {
    return this.settingsApi.listBlockLists();
  };

  getBlockList = (request: GetBlockListRequest) => {
    return this.settingsApi.getBlockList(request);
  };

  updateBlockList = (
    name: string,
    updateBlockListRequest: UpdateBlockListRequest,
  ) => {
    return this.settingsApi.updateBlockList({ name, updateBlockListRequest });
  };

  deleteBlockList = (request: DeleteBlockListRequest) => {
    return this.settingsApi.deleteBlockList(request);
  };

  createChannelType = (createChannelTypeRequest: CreateChannelTypeRequest) => {
    return this.channelTypesApi.createChannelType({ createChannelTypeRequest });
  };

  deleteChannelType = (request: DeleteChannelTypeRequest) => {
    return this.channelTypesApi.deleteChannelType(request);
  };

  getChannelType = (request: GetChannelTypeRequest) => {
    return this.channelTypesApi.getChannelType(request);
  };

  listChannelTypes = () => {
    return this.channelTypesApi.listChannelTypes();
  };

  updateChannelType = (
    name: string,
    updateChannelTypeRequest: UpdateChannelTypeRequest,
  ) => {
    return this.channelTypesApi.updateChannelType({
      name,
      updateChannelTypeRequest,
    });
  };

  queryChannels = (queryChannelsRequest?: QueryChannelsRequest) => {
    return this.channelsApi.queryChannels({
      queryChannelsRequest: queryChannelsRequest ?? null,
    });
  };

  searchMessages = (payload?: SearchRequest) => {
    return this.channelsApi.search({ payload });
  };

  exportChannels = (exportChannelsRequest?: ExportChannelsRequest) => {
    return this.channelsApi.exportChannels({
      exportChannelsRequest: exportChannelsRequest ?? null,
    });
  };

  getExportStatus = (request: GetExportChannelsStatusRequest) => {
    return this.channelsApi.getExportChannelsStatus(request);
  };

  listCommands = () => {
    return this.commandsApi.listCommands();
  };

  createCommand = (createCommandRequest: CreateCommandRequest) => {
    return this.commandsApi.createCommand({ createCommandRequest });
  };

  getCommand = (getCommandRequest: GetCommandRequest) => {
    return this.commandsApi.getCommand(getCommandRequest);
  };

  updateCommand = (
    name: string,
    updateCommandRequest: UpdateCommandRequest,
  ) => {
    return this.commandsApi.updateCommand({ name, updateCommandRequest });
  };

  deleteCommand = (request: DeleteCommandRequest) => {
    return this.commandsApi.deleteCommand(request);
  };
}
