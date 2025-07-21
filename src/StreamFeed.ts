import { FeedApi } from './gen/feeds/FeedApi';

export class StreamFeed extends FeedApi {
  get fid() {
    return `${this.group}:${this.id}`;
  }
}
