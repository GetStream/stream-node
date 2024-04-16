import { StreamChannel } from './StreamChannel';
import { StreamClient } from './StreamClient';
import {
  CreateBlockListRequest,
  CreateChannelTypeRequest,
  CreateCommandRequest,
  DeleteBlockListRequest,
  DeleteChannelTypeRequest,
  DeleteCommandRequest,
  ExportChannelsRequest,
  GetBlockListRequest,
  GetChannelTypeRequest,
  GetCommandRequest,
  GetExportChannelsStatusRequest,
  GetOGRequest,
  ProductchatApi,
  ProductcommonApi,
  QueryChannelsRequest,
  SearchRequest,
  UpdateBlockListRequest,
  UpdateChannelTypeRequest,
  UpdateCommandRequest,
} from './gen';

export class StreamChatClient {
  private readonly chatApi: ProductchatApi;
  private readonly commonApi: ProductcommonApi;

  constructor(private readonly streamClient: StreamClient) {
    this.chatApi = this.streamClient.chatApi;
    this.commonApi = this.streamClient.commonApi;
  }

  channel = (type: string, id?: string) => {
    return new StreamChannel(this.streamClient, type, id);
  };

  createBlockList = (createBlockListRequest: CreateBlockListRequest) => {
    return this.commonApi.createBlockList({ createBlockListRequest });
  };

  listBlockLists = () => {
    return this.commonApi.listBlockLists();
  };

  getBlockList = (request: GetBlockListRequest) => {
    return this.commonApi.getBlockList(request);
  };

  updateBlockList = (
    name: string,
    updateBlockListRequest: UpdateBlockListRequest,
  ) => {
    return this.commonApi.updateBlockList({ name, updateBlockListRequest });
  };

  deleteBlockList = (request: DeleteBlockListRequest) => {
    return this.commonApi.deleteBlockList(request);
  };

  createChannelType = (createChannelTypeRequest: CreateChannelTypeRequest) => {
    return this.chatApi.createChannelType({ createChannelTypeRequest });
  };

  deleteChannelType = (request: DeleteChannelTypeRequest) => {
    return this.chatApi.deleteChannelType(request);
  };

  getChannelType = (request: GetChannelTypeRequest) => {
    return this.chatApi.getChannelType(request);
  };

  listChannelTypes = () => {
    return this.chatApi.listChannelTypes();
  };

  getOpenGraphData = (request: GetOGRequest) => {
    return this.commonApi.getOG(request);
  };

  updateChannelType = (
    name: string,
    updateChannelTypeRequest: UpdateChannelTypeRequest,
  ) => {
    return this.chatApi.updateChannelType({
      name,
      updateChannelTypeRequest,
    });
  };

  queryChannels = (queryChannelsRequest?: QueryChannelsRequest) => {
    return this.chatApi.queryChannels({
      queryChannelsRequest: queryChannelsRequest ?? null,
    });
  };

  searchMessages = (payload?: SearchRequest) => {
    return this.chatApi.search({ payload });
  };

  exportChannels = (exportChannelsRequest?: ExportChannelsRequest) => {
    return this.chatApi.exportChannels({
      exportChannelsRequest: exportChannelsRequest ?? null,
    });
  };

  getExportStatus = (request: GetExportChannelsStatusRequest) => {
    return this.chatApi.getExportChannelsStatus(request);
  };

  listCommands = () => {
    return this.chatApi.listCommands();
  };

  createCommand = (createCommandRequest: CreateCommandRequest) => {
    return this.chatApi.createCommand({ createCommandRequest });
  };

  getCommand = (getCommandRequest: GetCommandRequest) => {
    return this.chatApi.getCommand(getCommandRequest);
  };

  updateCommand = (
    name: string,
    updateCommandRequest: UpdateCommandRequest,
  ) => {
    return this.chatApi.updateCommand({ name, updateCommandRequest });
  };

  deleteCommand = (request: DeleteCommandRequest) => {
    return this.chatApi.deleteCommand(request);
  };
}
