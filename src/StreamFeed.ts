import { FeedApi } from './gen-feeds/feeds/FeedApi';

export class StreamFeed extends FeedApi {
  get fid() {
    return `${this.group}:${this.id}`;
  }
}
