import { ApiClient } from './ApiClient';
import { VideoApi } from './gen/video/VideoApi';
import { StreamCall } from './StreamCall';
import type { StreamClient } from './StreamClient';
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
/** @ts-ignore Optional dependency */
import type {
  createRealtimeClient,
  RealtimeAPIModel,
  RealtimeClient,
} from '@stream-io/openai-realtime-api';

export class StreamVideoClient extends VideoApi {
  private readonly streamClient: StreamClient;

  constructor({
    streamClient,
    apiClient,
  }: {
    streamClient: StreamClient;
    apiClient: ApiClient;
  }) {
    super(apiClient);
    this.streamClient = streamClient;
  }

  call = (type: string, id: string) => {
    return new StreamCall(this, type, id, this.streamClient);
  };

  connectOpenAi = async (options: {
    call: StreamCall;
    agentUserId: string;
    openAiApiKey: string;
    model?: RealtimeAPIModel;
    validityInSeconds?: number;
  }): Promise<RealtimeClient> => {
    let doCreateRealtimeClient: typeof createRealtimeClient;

    try {
      doCreateRealtimeClient = (await import('@stream-io/openai-realtime-api'))
        .createRealtimeClient;
    } catch {
      throw new Error(
        'Cannot create Realtime API client. Is @stream-io/openai-realtime-api installed?',
      );
    }

    if (!options.agentUserId) {
      throw new Error('"agentUserId" must by specified in options');
    }

    const token = this.streamClient.generateCallToken({
      user_id: options.agentUserId,
      call_cids: [options.call.cid],
      validity_in_seconds: options.validityInSeconds,
    });

    const realtimeClient = doCreateRealtimeClient({
      baseUrl: this.streamClient.apiClient.apiConfig.baseUrl,
      call: options.call,
      streamApiKey: this.streamClient.apiClient.apiConfig.apiKey,
      streamUserToken: token,
      openAiApiKey: options.openAiApiKey,
      model: options.model,
    });

    await realtimeClient.connect();
    return realtimeClient;
  };
}
