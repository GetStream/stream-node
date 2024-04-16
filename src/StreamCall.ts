import { QueryCallMembersRequest } from './gen/models';
import { CallApi } from './gen/video/CallApi';
import { OmitTypeId } from './types';

export class StreamCall extends CallApi {
  get cid() {
    return `${this.type}:${this.id}`;
  }

  create = this.getOrCreate;

  queryMembers = (request?: OmitTypeId<QueryCallMembersRequest>) => {
    return this.videoApi.queryCallMembers({
      id: this.id,
      type: this.type,
      ...(request ?? {}),
    });
  };
}
