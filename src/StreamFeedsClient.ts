import { FeedsApi } from './gen/feeds/FeedsApi';
import { AddReactionRequest, QueryFeedsRequest } from './gen/models';
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
  addReaction = (request: AddReactionRequest & { activity_id: string }) => {
    return super.addActivityReaction(request);
  };
}
