import { FeedsApi } from './gen/feeds/FeedsApi';
import { QueryFeedsRequest } from './gen/models';
import { StreamFeed } from './StreamFeed';

export class StreamFeedsClient extends FeedsApi {
  feed = (group: string, id: string) => {
    return new StreamFeed(this, group, id);
  };

  queryFeeds = (request: QueryFeedsRequest) => {
    return super._queryFeeds(request);
  };

  /**
   * @deprecated Use addActivityReaction instead
   */
  addReaction = this.addActivityReaction;
}
