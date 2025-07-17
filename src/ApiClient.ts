import { v4 as uuidv4 } from 'uuid';
import { ApiConfig, RequestMetadata, StreamError } from './types';
import { APIError } from './gen/models';
import { getRateLimitFromResponseHeader } from './utils/rate-limit';

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
    pathParams?: Record<string, string>,
    queryParams?: Record<string, any>,
    body?: any,
    requestContentType?: string,
  ) => {
    queryParams = queryParams ?? {};
    queryParams.api_key = this.apiConfig.apiKey;
    const encodedParams = this.queryParamsStringify(queryParams);
    if (pathParams) {
      Object.keys(pathParams).forEach((paramName) => {
        url = url.replace(`{${paramName}}`, pathParams[paramName]);
      });
    }

    url += `?${encodedParams}`;
    const clientRequestId = uuidv4();
    const headers: Record<string, string> = {
      Authorization: this.apiConfig.token,
      'stream-auth-type': 'jwt',
      'X-Stream-Client': 'stream-node-' + process.env.PKG_VERSION,
      'Accept-Encoding': 'gzip',
      'x-client-request-id': clientRequestId,
    };

    // https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
    if (requestContentType !== 'multipart/form-data') {
      headers['Content-Type'] = requestContentType ?? 'application/json';
    }

    const signal = AbortSignal.timeout(this.apiConfig.timeout);

    const encodedBody =
      requestContentType === 'multipart/form-data'
        ? new FormData()
        : JSON.stringify(body);
    if (requestContentType === 'multipart/form-data') {
      Object.keys(body).forEach((key) => {
        (encodedBody as FormData).append(key, body[key]);
      });
    }

    try {
      const response = await fetch(`${this.apiConfig.baseUrl}${url}`, {
        signal,
        method,
        body: encodedBody,
        headers,
        dispatcher: this.dispatcher,
      });

      const responseHeaders = response.headers;

      const metadata: RequestMetadata = {
        clientRequestId,
        responseHeaders,
        responseCode: response.status,
        rateLimit: getRateLimitFromResponseHeader(responseHeaders),
      };

      if (response.status < 200 || response.status >= 300) {
        let error: APIError;
        try {
          error = (await response.json()) as APIError;
        } catch (_) {
          throw new StreamError(
            `Stream error: ${response.status} - ${response.statusText}`,
            metadata,
            response.status,
          );
        }
        throw new StreamError(
          `Stream error code ${error!.code}: ${error!.message}`,
          metadata,
          error!.code,
          undefined,
        );
      }

      const responseBody = (await response.json()) as T;

      return { body: responseBody, metadata };
    } catch (error: any) {
      if (error instanceof StreamError) {
        throw error;
      }
      const metadata: Partial<RequestMetadata> = {
        clientRequestId,
        responseCode: error.status,
      };
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        throw new StreamError(
          `The request was aborted due to to the ${this.apiConfig.timeout}ms timeout, you can set the timeout in the StreamClient constructor`,
          metadata,
          undefined,
          error,
        );
      } else {
        throw new StreamError(
          `The request failed due to an unexpected error`,
          metadata,
          error,
        );
      }
    }
  };

  protected queryParamsStringify = (params: Record<string, any>) => {
    const newParams = [];
    for (const k in params) {
      const param = params[k];
      if (Array.isArray(param)) {
        newParams.push(`${k}=${encodeURIComponent(param.join(','))}`);
      } else if (param instanceof Date) {
        newParams.push(param.toISOString());
      } else if (typeof param === 'object') {
        newParams.push(`${k}=${encodeURIComponent(JSON.stringify(param))}`);
      } else {
        if (
          typeof param === 'string' ||
          typeof param === 'number' ||
          typeof param === 'boolean'
        ) {
          newParams.push(`${k}=${encodeURIComponent(param)}`);
        }
      }
    }

    return newParams.join('&');
  };
}
