import { v4 as uuidv4 } from 'uuid';
import { ApiConfig } from './types';

export class BaseApi {
  constructor(private apiConfig: ApiConfig) {}

  protected async sendRequest<T>(
    method: string,
    url: string,
    pathParams?: { [key: string]: string },
    queryParams?: { [key: string]: any },
    body?: any,
  ) {
    queryParams = queryParams ?? {};
    queryParams.api_key = this.apiConfig.apiKey;
    const encodedParams = this.queryParamsStringify(queryParams);
    if (pathParams) {
      Object.keys(pathParams).forEach((paramName) => {
        url.replace('{paramName}', pathParams[paramName]);
      });
    }
    url += `?${encodedParams}`;
    const headers = {
      Authorization: this.apiConfig.token,
      'stream-auth-type': 'jwt',
      'Content-Type': 'application/json',
      'X-Stream-Client': 'stream-node-' + process.env.PKG_VERSION,
      'Accept-Encoding': 'gzip',
      'x-client-request-id': uuidv4(),
    };
    const response = await fetch(`${this.apiConfig.baseUrl}/${url}`, {
      method,
      body: JSON.stringify(body),
      headers,
    });

    // TODO: parse response
    // TODO: handle errors

    const responseData = (await response.json()) as T;

    return responseData;
  }

  protected queryParamsStringify(params: { [key: string]: any }) {
    const newParams = [];
    for (const k in params) {
      const param = params[k];
      if (Array.isArray(param)) {
        newParams.push(`${k}=${encodeURIComponent(param.join(','))}`);
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
  }
}
