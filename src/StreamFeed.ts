import { StreamFeedApi } from './gen/feeds/FeedApi';

export class StreamFeed extends StreamFeedApi {
  get fid() {
    return `${this.group}:${this.id}`;
  }
}
