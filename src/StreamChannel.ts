import { StreamClient } from "./StreamClient";

export class StreamChannel {
  private readonly baseRequest: { type: string; id: string };

  constructor(
    private streamClient: StreamClient,
    private type: string,
    private id: string
  ) {
    this.baseRequest = { id: this.id, type: this.type };
    const configuration = this.streamClient.getConfiguration({
      basePath:
        this.streamClient.basePath || "https://video.stream-io-api.com/video",
    });
  }
}
