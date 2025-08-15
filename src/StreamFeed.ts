import { FeedApi } from './gen/feeds/FeedApi';

export class StreamFeed extends FeedApi {
  get feed() {
    return `${this.group}:${this.id}`;
  }
}
