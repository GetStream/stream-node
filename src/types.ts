export type OmitTypeId<T> = Omit<T, 'type' | 'id' | 'connection_id'>;

export type ApiConfig = {
  apiKey: string;
  token: string;
  baseUrl: string;
  timeout: number;
};
