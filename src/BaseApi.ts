import { v4 as uuidv4 } from 'uuid';
import { ApiConfig, RequestMetadata, StreamError } from './types';
import { APIError } from './gen/models';
import { getRateLimitFromResponseHeader } from './utils/rate-limit';
import diagnosticsChannel from 'diagnostics_channel';

// Define types for the diagnostics channel messages
interface ConnectParams {
  host: string;
  hostname: string;
  protocol: string;
  port: number;
  servername?: string;
  version?: string;
}

interface BeforeConnectMessage {
  connectParams: ConnectParams;
  connector: Function;
}

interface ConnectedMessage {
  socket: any; // Using any as socket type can be complex
  connectParams: ConnectParams;
  connector: Function;
}

interface ConnectErrorMessage {
  error: Error & { code?: string };
  socket?: any;
  connectParams: ConnectParams;
  connector: Function;
}

export class BaseApi {
  private readonly dispatcher?: RequestInit['dispatcher'];

  constructor(protected readonly apiConfig: ApiConfig) {
    this.dispatcher = this.apiConfig.agent;

    // Setup diagnostics channel listeners
    this.setupDiagnosticsChannels();
  }

  private setupDiagnosticsChannels() {
    // Monitor connection before it starts (DNS resolution happens during this phase)
    diagnosticsChannel
      .channel('undici:client:beforeConnect')
      .subscribe((message: unknown) => {
        const { connectParams } = message as BeforeConnectMessage;
        console.log(
          `Attempting connection to ${connectParams.hostname}:${connectParams.port}`,
        );
      });

    // Monitor successful connections (TCP connection successful)
    diagnosticsChannel
      .channel('undici:client:connected')
      .subscribe((message: unknown) => {
        const { socket, connectParams } = message as ConnectedMessage;
        console.log(
          `Successfully connected to ${connectParams.hostname}:${connectParams.port}`,
        );
        // For TLS connections, the socket will have TLS-specific properties when handshake is successful
        if (
          connectParams.protocol === 'https:' &&
          'encrypted' in socket &&
          socket.encrypted
        ) {
          console.log('TLS handshake successful');
        }
      });

    // Monitor connection errors (failed DNS, TCP connection or TLS handshake)
    diagnosticsChannel
      .channel('undici:client:connectError')
      .subscribe((message: unknown) => {
        const { error, connectParams } = message as ConnectErrorMessage;
        console.log(
          `Connection failed to ${connectParams.hostname}:${connectParams.port}: ${error.message}`,
        );
        if (error.code === 'ENOTFOUND') {
          console.log('DNS resolution failed');
        } else if (error.code === 'ECONNREFUSED') {
          console.log('TCP connection failed');
        } else if (
          error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' ||
          error.message.includes('certificate') ||
          error.message.includes('TLS')
        ) {
          console.log('TLS handshake failed');
        }
      });
  }

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
