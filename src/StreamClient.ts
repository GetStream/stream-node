import { JWTServerToken, JWTUserToken } from './utils/create-token';
import { CommonApi } from './gen/common/CommonApi';
import { StreamVideoClient } from './StreamVideoClient';
import crypto from 'crypto';
import { StreamChatClient } from './StreamChatClient';
import { CallTokenPayload, UserTokenPayload } from './types';
import { QueryBannedUsersRequest, UserRequest } from './gen/models';
import { StreamModerationClient } from './StreamModerationClient';

export interface StreamClientOptions {
  timeout?: number;
  basePath?: string;
}

export class StreamClient extends CommonApi {
  public readonly video: StreamVideoClient;
  public readonly chat: StreamChatClient;
  public readonly moderation: StreamModerationClient;
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
    super({ apiKey, token, timeout, baseUrl: chatBaseUrl });

    this.video = new StreamVideoClient({
      apiKey,
      token,
      timeout,
      baseUrl: videoBaseUrl,
    });
    this.chat = new StreamChatClient({
      apiKey,
      token,
      timeout,
      baseUrl: chatBaseUrl,
    });
    this.moderation = new StreamModerationClient({
      apiKey,
      token,
      timeout,
      baseUrl: chatBaseUrl,
    });
  }

  upsertUsers = (users: UserRequest[]) => {
    const payload: Record<string, UserRequest> = {};

    users.forEach((u) => {
      payload[u.id] = u;
    });

    return this.updateUsers({ users: payload });
  };

  queryBannedUsers = (request?: { payload?: QueryBannedUsersRequest }) => {
    return this.chat.queryBannedUsers(request);
  };

  /**
   *
   * @param userID
   * @param exp
   * @param iat deprecated, the default date will be set internally
   * @returns
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
