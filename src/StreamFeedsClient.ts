import { FeedsApi } from './gen/feeds/FeedsApi';
import { StreamFeed } from './StreamFeed';

export class StreamFeedsClient extends FeedsApi {
  feed = (group: string, id: string) => {
    return new StreamFeed(this, group, id);
  };
}
