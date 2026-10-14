import { ChannelApi } from './gen/chat/ChannelApi';
import {
  ChannelGetOrCreateRequest,
  QueryMembersPayload,
  UploadChannelFileRequest,
  UploadChannelRequest,
} from './gen/models';
import { OmitTypeId } from './types';
import { File } from 'buffer';

export class StreamChannel extends ChannelApi {
  get cid() {
    return `${this.type}:${this.id}`;
  }

  getOrCreate = (channel_get_or_create_request?: ChannelGetOrCreateRequest) => {
    if (!this.id) {
      return this.chatApi
        .getOrCreateDistinctChannel({
          type: this.type,
          ...channel_get_or_create_request,
        })
        .then((response) => {
          this.id = response.channel?.id;
          return response;
        });
    } else {
      return this.chatApi.getOrCreateChannel({
        id: this.id,
        type: this.type,
        ...channel_get_or_create_request,
      });
    }
  };

  queryMembers(request?: { payload?: OmitTypeId<QueryMembersPayload> }) {
    return this.chatApi.queryMembers({
      payload: {
        id: this.id,
        type: this.type,
        ...(request?.payload ?? { filter_conditions: {} }),
      },
    });
  }

  // @ts-expect-error API spec says file should be a string
  uploadChannelFile = (
    request: Omit<UploadChannelFileRequest, 'file'> & { file: File },
  ) => {
    // @ts-expect-error API spec says file should be a string
    return super.uploadChannelFile(request);
  };

  // @ts-expect-error API spec says file should be a string
  uploadChannelImage = (
    request: Omit<UploadChannelRequest, 'file'> & { file: File },
  ) => {
    // @ts-expect-error API spec says file should be a string
    return super.uploadChannelImage(request);
  };
}
