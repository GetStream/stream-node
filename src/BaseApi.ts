import { v4 as uuidv4 } from 'uuid';
import { ApiConfig, RequestMetadata, StreamError } from './types';
import { APIError } from './gen/models';
import { getRateLimitFromResponseHeader } from './utils/rate-limit';

export class BaseApi {
  constructor(private readonly apiConfig: ApiConfig) {}

  protected sendRequest = async <T>(
    method: string,
    url: string,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, any>,
    body?: any,
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
    const headers = {
      Authorization: this.apiConfig.token,
      'stream-auth-type': 'jwt',
      'Content-Type': 'application/json',
      'X-Stream-Client': 'stream-node-' + process.env.PKG_VERSION,
      'Accept-Encoding': 'gzip',
      'x-client-request-id': clientRequestId,
    };

    const signal = AbortSignal.timeout(this.apiConfig.timeout);

    try {
      const response = await fetch(`${this.apiConfig.baseUrl}${url}`, {
        signal,
        method,
        body: JSON.stringify(body),
        headers,
      });

      const responseHeaders = response.headers;

      const metadata: RequestMetadata = {
        clientRequestId,
        responseHeaders,
        responseCode: response.status,
        rateLimit: getRateLimitFromResponseHeader(responseHeaders),
      };

      if (response.status < 200 || response.status >= 300) {
        const error = (await response.json()) as APIError;
        throw new StreamError(
          `Stream error code ${error.code}: ${error.message}`,
          metadata,
          error.code,
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
