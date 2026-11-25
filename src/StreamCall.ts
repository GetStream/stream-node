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

  /**
   * Creates the SRT address an encoder (OBS, ffmpeg, ...) uses to publish into this call.
   *
   * The address embeds a user token that can only join this call and expires after
   * `validity_in_seconds` (24 hours by default). The token is checked again whenever the
   * stream reconnects, and at least every 6 hours during a stream, so it must stay valid until
   * the stream ends. Treat the address as a secret.
   *
   * @param userID the user the encoder publishes as
   * @param options.validity_in_seconds how long the address works, 24 hours by default
   */
  createSRTCredentials = (
    userID: string,
    options?: { validity_in_seconds?: number },
  ): SRTCredentials => {
    if (!this.data) {
      throw new Error(
        'Object is not initialized, call get() or getOrCreate() first',
      );
    }

    // Why: the backend treats a token without a user_id as a server request with the API
    // secret's authority, so an encoder must never get one.
    if (typeof userID !== 'string' || userID.trim() === '') {
      throw new Error('userID is required');
    }

    const validity =
      options?.validity_in_seconds ?? DEFAULT_SRT_TOKEN_VALIDITY_IN_SECONDS;
    if (!Number.isFinite(validity) || validity <= 0) {
      throw new Error('validity_in_seconds must be a positive number');
    }

    const iat = Math.floor((Date.now() - 1000) / 1000);
    const exp = iat + Math.ceil(validity);
    const token = this.streamClient.generateUserToken({
      user_id: userID,
      iat,
      exp,
      scoped_call_cid: this.cid,
    });
    const segments = token.split('.');
    if (segments.length !== 3) {
      throw new Error('Invalid token format');
    }

    const address = this.data.ingress.srt.address
      .replace('{passphrase}', segments[2])
      .replace('{token}', token);

    return { address, expires_at: new Date(exp * 1000) };
  };
}

/** Default lifetime of the token in an SRT address: 24 hours. */
const DEFAULT_SRT_TOKEN_VALIDITY_IN_SECONDS = 24 * 60 * 60;

export type SRTCredentials = {
  /** The SRT address for the encoder. It contains a user token, so keep it secret. */
  address: string;
  /** When the token in the address expires. */
  expires_at: Date;
};
