import type { APIError } from './gen/models';

export type OmitTypeId<T> = Omit<T, 'type' | 'id' | 'connection_id'>;

export interface ApiConfig {
  apiKey: string;
  token: string;
  baseUrl: string;
  /** The timeout for requests in milliseconds. The default is 3000. */
  timeout: number;
  agent?: RequestInit['dispatcher'];
  secret?: string;
}

export interface RequestMetadata {
  responseHeaders: Headers;
  rateLimit: RateLimit;
  responseCode: number;
  clientRequestId: string;
}

export type StreamResponse<T> = T & {
  metadata: RequestMetadata;
};

export class StreamError extends Error {
  constructor(
    message: string,
    public metadata: Partial<RequestMetadata>,
    public code?: number,
    errorOptions?: ErrorOptions,
    /**
     * The error body the API returned (`exception_fields`, `details`,
     * `more_info`, `status_code`, ...). Undefined when the request failed
     * before a response arrived or the response body was not JSON.
     */
    public apiError?: APIError,
  ) {
    super(message, errorOptions);
  }
}

export interface RateLimit {
  rateLimit?: number;
  rateLimitRemaining?: number;
  rateLimitReset?: Date;
}

interface BaseTokenPayload {
  user_id: string;
  exp?: number;
  iat: number;
  call_cids?: string[];
}

export type UserTokenPayload = BaseTokenPayload;

export type CallTokenPayload = BaseTokenPayload & {
  call_cids: string[];
  role?: string;
};
