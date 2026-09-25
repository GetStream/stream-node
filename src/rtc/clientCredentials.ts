import type { StreamClient } from '../StreamClient';

export interface RtcClientCredentials {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
}

const credentials = new WeakMap<StreamClient, RtcClientCredentials>();

export const registerRtcClientCredentials = (
  client: StreamClient,
  value: RtcClientCredentials,
) => credentials.set(client, value);

export const rtcClientCredentials = (client: StreamClient) => {
  const value = credentials.get(client);
  if (!value) {
    throw new Error(
      'RTC credentials were not registered for this StreamClient',
    );
  }
  return value;
};
