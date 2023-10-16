import { StreamClient } from "./StreamClient";
import { CreateBlockListRequest, DeleteBlockListRequest, GetBlockListRequest, SettingsApi, UpdateBlockListRequest } from "./gen/chat";

export class StreamChatClient {
  private settingsApi: SettingsApi;

  constructor(private streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration();
    //@ts-expect-error typing problem
    this.settingsApi = new SettingsApi(configuration);
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
}
