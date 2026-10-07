import { ChatApi } from './gen/chat/ChatApi';
import { UploadChannelFileRequest, UploadChannelRequest } from './gen/models';
import { StreamChannel } from './StreamChannel';
import { File } from 'buffer';

export class StreamChatClient extends ChatApi {
  channel = (type: string, id?: string) => {
    // The upload overrides below narrow `file` to File, so this class is no
    // longer structurally a ChatApi, even though it is one at runtime
    return new StreamChannel(this as unknown as ChatApi, type, id);
  };

  // @ts-expect-error API spec says file should be a string
  uploadChannelFile = (
    request: Omit<UploadChannelFileRequest, 'file'> & {
      file: File;
      type: string;
      id: string;
    },
  ) => {
    // @ts-expect-error API spec says file should be a string
    return super.uploadChannelFile(request);
  };

  // @ts-expect-error API spec says file should be a string
  uploadChannelImage = (
    request: Omit<UploadChannelRequest, 'file'> & {
      file: File;
      type: string;
      id: string;
    },
  ) => {
    // @ts-expect-error API spec says file should be a string
    return super.uploadChannelImage(request);
  };
}
