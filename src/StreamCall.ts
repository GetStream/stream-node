import { VideoApi } from './gen-imports';
import {
  CallResponse,
  GetOrCreateCallRequest,
  QueryCallMembersRequest,
} from './gen/models';
import { CallApi } from './gen/video/CallApi';
import { StreamClient } from './StreamClient';
import { OmitTypeId } from './types';

export class StreamCall extends CallApi {
  data?: CallResponse;

  constructor(
    videoApi: VideoApi,
    readonly type: string,
    readonly id: string,
    private readonly streamClient: StreamClient,
  ) {
    super(videoApi, type, id);
  }

  get cid() {
    return `${this.type}:${this.id}`;
  }

  create = (request?: GetOrCreateCallRequest) => this.getOrCreate(request);

  queryMembers = (request?: OmitTypeId<QueryCallMembersRequest>) => {
    return this.videoApi.queryCallMembers({
      id: this.id,
      type: this.type,
      ...(request ?? {}),
    });
  };

  getOrCreate = async (request?: GetOrCreateCallRequest) => {
    const response = await super.getOrCreate(request);
    this.data = response.call;
    return response;
  };

  get = async () => {
    const response = await super.get();
    this.data = response.call;
    return response;
  };

  createSRTCredentials = (
    userID: string,
  ): {
    address: string;
  } => {
    if (!this.data) {
      throw new Error(
        'Object is not initialized, call get() or getOrCreate() first',
      );
    }

    const token = this.streamClient.generatePermanentUserToken({
      user_id: userID,
    });
    const segments = token.split('.');
    if (segments.length !== 3) {
      throw new Error('Invalid token format');
    }

    return {
      address: this.data.ingress.srt.address
        .replace('{passphrase}', segments[2])
        .replace('{token}', token),
    };
  };
}
