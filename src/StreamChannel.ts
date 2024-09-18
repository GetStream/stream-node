import { ChannelApi } from './gen/chat/ChannelApi';
import { ChannelGetOrCreateRequest, QueryMembersPayload } from './gen/models';
import { OmitTypeId } from './types';

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
}
