import { randomUUID } from 'crypto';
import { ApiConfig, RequestMetadata, StreamError } from './types';
import { APIError } from './gen/models';
import { getRateLimitFromResponseHeader } from './utils/rate-limit';
import { isScalar, stringifyArrayParam } from './utils/query-params';

export class ApiClient {
  private readonly dispatcher?: RequestInit['dispatcher'];

  constructor(public readonly apiConfig: ApiConfig) {
    this.dispatcher = this.apiConfig.agent;
  }

  /**
   *
   * @internal
   */
  sendRequest = async <T>(
    method: string,
    url: string,
    pathParams?: Record<string, string | number>,
    queryParams?: Record<string, any>,
    body?: any,
    requestContentType?: string,
  ) => {
    queryParams = queryParams ?? {};
    queryParams.api_key = this.apiConfig.apiKey;
    const encodedParams = this.queryParamsStringify(queryParams);
    if (pathParams) {
      Object.keys(pathParams).forEach((paramName) => {
        const value: unknown = pathParams[paramName];
        const rawValue =
          typeof value === 'string' || typeof value === 'number'
            ? String(value)
            : '';
        if (rawValue === '' || rawValue === '.' || rawValue === '..') {
          throw new StreamError(
            `Invalid path parameter '${paramName}': must not be empty or a dot-segment`,
            {},
          );
        }
        url = url.replace(`{${paramName}}`, encodeURIComponent(rawValue));
      });
    }

    url += `?${encodedParams}`;
    const clientRequestId = randomUUID();
    const headers: Record<string, string> = {
      Authorization: this.apiConfig.token,
      'stream-auth-type': 'jwt',
      'X-Stream-Client': 'stream-node-' + process.env.PKG_VERSION,
      'Accept-Encoding': 'gzip',
      'x-client-request-id': clientRequestId,
    };

    const isMultipart = requestContentType === 'multipart/form-data';
    // https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
    if (!isMultipart) {
      headers['Content-Type'] = requestContentType ?? 'application/json';
    }

    // Uploads are bounded by the agent's timeouts, see `StreamClientOptions.timeout`.
    const signal = isMultipart
      ? undefined
      : AbortSignal.timeout(this.apiConfig.timeout);

    const encodedBody = isMultipart
      ? this.multipartBodyStringify(body as Record<string, any>)
      : JSON.stringify(body);

    // Set once headers arrive, so later errors keep the response status.
    let metadata: RequestMetadata | undefined;

    try {
      const response = await fetch(`${this.apiConfig.baseUrl}${url}`, {
        signal,
        method,
        body: encodedBody,
        headers,
        dispatcher: this.dispatcher,
      });

      const responseHeaders = response.headers;

      metadata = {
        clientRequestId,
        responseHeaders,
        responseCode: response.status,
        rateLimit: getRateLimitFromResponseHeader(responseHeaders),
      };

      if (response.status < 200 || response.status >= 300) {
        let error: APIError;
        try {
          error = (await response.json()) as APIError;
        } catch (bodyError: any) {
          // Report a timeout while reading the body as a timeout.
          if (isAbortError(bodyError)) throw bodyError;
          throw new StreamError(
            `Stream error: ${response.status} - ${response.statusText}`,
            metadata,
            response.status,
            { cause: bodyError },
          );
        }
        throw new StreamError(
          `Stream error code ${error!.code}: ${error!.message}`,
          metadata,
          error!.code,
          undefined,
          error!,
        );
      }

      const responseBody = (await response.json()) as T;

      return { ...responseBody, metadata };
    } catch (error: any) {
      if (error instanceof StreamError) {
        throw error;
      }
      const errorMetadata: Partial<RequestMetadata> = metadata ?? {
        clientRequestId,
        responseCode: error.status,
      };
      if (isAbortError(error)) {
        throw new StreamError(
          `The request was aborted due to to the ${this.apiConfig.timeout}ms timeout, you can set the timeout in the StreamClient constructor`,
          errorMetadata,
          undefined,
          { cause: error },
        );
      } else {
        throw new StreamError(
          `The request failed due to an unexpected error`,
          errorMetadata,
          undefined,
          { cause: error },
        );
      }
    }
  };

  protected multipartBodyStringify = (body: Record<string, any>): FormData => {
    const formData = new FormData();
    for (const key in body) {
      const value = body[key];
      if (value === null || value === undefined) continue;
      if (value instanceof Blob) {
        formData.append(key, value);
      } else if (isScalar(value)) {
        formData.append(key, String(value));
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }

    return formData;
  };

  protected queryParamsStringify = (params: Record<string, any>) => {
    const newParams = [];
    for (const k in params) {
      const param = params[k];
      if (param === null || param === undefined) continue;
      if (Array.isArray(param)) {
        newParams.push(
          `${k}=${encodeURIComponent(stringifyArrayParam(param))}`,
        );
      } else if (param instanceof Date) {
        newParams.push(`${k}=${encodeURIComponent(param.toISOString())}`);
      } else if (typeof param === 'object') {
        newParams.push(`${k}=${encodeURIComponent(JSON.stringify(param))}`);
      } else if (isScalar(param)) {
        newParams.push(`${k}=${encodeURIComponent(param)}`);
      }
    }

    return newParams.join('&');
  };
}

const isAbortError = (error: unknown) =>
  error instanceof Error &&
  (error.name === 'AbortError' || error.name === 'TimeoutError');
