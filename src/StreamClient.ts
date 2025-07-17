import { JWTServerToken, JWTUserToken } from './utils/create-token';
import { CommonApi } from './gen/common/CommonApi';
import { StreamVideoClient } from './StreamVideoClient';
import crypto from 'crypto';
import { StreamChatClient } from './StreamChatClient';
import { CallTokenPayload, UserTokenPayload } from './types';
import {
  FileUploadRequest,
  ImageUploadRequest,
  QueryBannedUsersPayload,
  UserRequest,
} from './gen/models';
import { StreamModerationClient } from './StreamModerationClient';
import { ApiClient } from './ApiClient';
import { StreamFeedsClient } from './StreamFeedsClient';
import { File } from 'buffer';

export interface StreamClientOptions {
  timeout?: number;
  basePath?: string;
  // We use unknown here because RequestInit['dispatcher'] is different between Node versions
  /** The [HTTP Agent](https://undici.nodejs.org/#/docs/api/Agent.md) to use. */
  agent?: unknown;
}

export class StreamClient extends CommonApi {
  public readonly video: StreamVideoClient;
  public readonly chat: StreamChatClient;
  public readonly moderation: StreamModerationClient;
  public readonly feeds: StreamFeedsClient;
  public readonly options: StreamClientOptions = {};

  private static readonly DEFAULT_TIMEOUT = 3000;

  /**
   *
   * @param apiKey
   * @param secret
   * @param config config object
   */
  constructor(
    readonly apiKey: string,
    private readonly secret: string,
    readonly config?: StreamClientOptions,
  ) {
    const token = JWTServerToken(secret);
    const timeout = config?.timeout ?? StreamClient.DEFAULT_TIMEOUT;
    const chatBaseUrl = config?.basePath ?? 'https://chat.stream-io-api.com';
    const videoBaseUrl = config?.basePath ?? 'https://video.stream-io-api.com';
    const feedsBaseUrl = config?.basePath ?? 'https://video.stream-io-api.com';
    const chatApiClient = new ApiClient({
      apiKey,
      token,
      baseUrl: chatBaseUrl,
      timeout,
      agent: config?.agent as RequestInit['dispatcher'],
    });

    const videoApiClient = new ApiClient({
      apiKey,
      token,
      baseUrl: videoBaseUrl,
      timeout,
      agent: config?.agent as RequestInit['dispatcher'],
    });

    const feedsApiClient = new ApiClient({
      apiKey,
      token,
      baseUrl: feedsBaseUrl,
      timeout,
      agent: config?.agent as RequestInit['dispatcher'],
    });

    super(chatApiClient);

    this.video = new StreamVideoClient({
      streamClient: this,
      apiClient: videoApiClient,
    });
    this.chat = new StreamChatClient(this.apiClient);
    this.moderation = new StreamModerationClient(chatApiClient);
    this.feeds = new StreamFeedsClient(feedsApiClient);
  }

  upsertUsers = (users: UserRequest[]) => {
    const payload: Record<string, UserRequest> = {};

    users.forEach((u) => {
      payload[u.id] = u;
    });

    return this.updateUsers({ users: payload });
  };

  queryBannedUsers = (request?: { payload?: QueryBannedUsersPayload }) => {
    return this.chat.queryBannedUsers(request);
  };

  // @ts-expect-error API spec says file should be a string
  uploadFile = (request: Omit<FileUploadRequest, 'file'> & { file: File }) => {
    return super.uploadFile({
      // @ts-expect-error API spec says file should be a string
      file: request.file,
      // @ts-expect-error form data will only work if this is a string
      user: JSON.stringify(request.user),
    });
  };

  // @ts-expect-error API spec says file should be a string
  uploadImage = (
    request: Omit<ImageUploadRequest, 'file'> & { file: File },
  ) => {
    return super.uploadImage({
      // @ts-expect-error API spec says file should be a string
      file: request.file,
      // @ts-expect-error form data will only work if this is a string
      user: JSON.stringify(request.user),
      // @ts-expect-error form data will only work if this is a string
      upload_sizes: JSON.stringify(request.upload_sizes),
    });
  };

  /**
   *
   * @param payload
   * - user_id - the id of the user the token is for
   * - validity_in_seconds - how many seconds is the token valid for (starting from issued at), by default it's 1 hour, dicarded if exp is provided
   * - exp - when the token expires, unix timestamp in seconds
   * - iat - issued at date of the token, unix timestamp in seconds, by default it's now
   */
  generateUserToken = (
    payload: {
      user_id: string;
      validity_in_seconds?: number;
      exp?: number;
      iat?: number;
    } & Record<string, unknown>,
  ) => {
    const defaultIat = Math.floor((Date.now() - 1000) / 1000);
    payload.iat = payload.iat ?? defaultIat;
    const validityInSeconds = payload.validity_in_seconds ?? 60 * 60;
    payload.exp = payload.exp ?? payload.iat + validityInSeconds;

    return JWTUserToken(this.secret, payload as UserTokenPayload);
  };

  /**
   *
   * @param payload
   * - user_id - the id of the user the token is for
   * - validity_in_seconds - how many seconds is the token valid for (starting from issued at), by default it's 1 hour, dicarded if exp is provided
   * - exp - when the token expires, unix timestamp in seconds
   * - iat - issued at date of the token, unix timestamp in seconds, by default it's now
   */
  generateCallToken = (
    payload: {
      user_id: string;
      role?: string;
      call_cids: string[];
      validity_in_seconds?: number;
      exp?: number;
      iat?: number;
    } & Record<string, unknown>,
  ) => {
    return this.generateUserToken(payload);
  };

  /**
   *
   * @param userID
   * @param exp
   * @param iat deprecated, the default date will be set internally
   * @returns
   *
   * @deprecated use generateUserToken instead
   */
  createToken = (
    userID: string,
    exp = Math.round(Date.now() / 1000) + 60 * 60,
    iat = Math.floor((Date.now() - 1000) / 1000),
  ) => {
    const payload: UserTokenPayload = {
      user_id: userID,
      exp,
      iat,
    };

    return JWTUserToken(this.secret, payload);
  };

  /**
   *
   * @param userID
   * @param call_cids
   * @param exp
   * @param iat this is deprecated, the current date will be set internally
   * @returns
   *
   * @deprecated use generateCallToken instead
   */
  createCallToken = (
    userIdOrObject: string | { user_id: string; role?: string },
    call_cids: string[],
    exp = Math.round(Date.now() / 1000) + 60 * 60,
    iat = Math.floor((Date.now() - 1000) / 1000),
  ) => {
    const payload: CallTokenPayload = {
      exp,
      iat,
      call_cids,
      user_id:
        typeof userIdOrObject === 'string'
          ? userIdOrObject
          : userIdOrObject.user_id,
    };

    if (typeof userIdOrObject === 'object' && userIdOrObject.role) {
      payload.role = userIdOrObject.role;
    }

    return JWTUserToken(this.secret, payload);
  };

  verifyWebhook = (requestBody: string | Buffer, xSignature: string) => {
    const key = Buffer.from(this.secret, 'utf8');
    const hash = crypto
      .createHmac('sha256', key)
      .update(requestBody)
      .digest('hex');

    try {
      return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(xSignature));
    } catch (err) {
      return false;
    }
  };
}
