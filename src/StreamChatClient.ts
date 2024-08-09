import { ChatApi } from './gen/chat/ChatApi';
import { StreamChannel } from './StreamChannel';

export class StreamChatClient extends ChatApi {
  channel = (type: string, id?: string) => {
    return new StreamChannel(this, type, id);
  };
}
