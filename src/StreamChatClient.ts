import { StreamClient } from "./StreamClient";

export class StreamChatClient {
  constructor(private streamClient: StreamClient) {
    const configuration = this.streamClient.getConfiguration({
      basePath:
        this.streamClient.basePath || "https://video.stream-io-api.com/video",
    });
  }
}
