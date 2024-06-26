export type OmitTypeId<T> = Omit<T, 'type' | 'id' | 'connection_id'>;

interface BaseTokenPayload {
  user_id: string;
  exp: number;
  iat: number;
  call_cids?: string[];
}

export type UserTokenPayload = BaseTokenPayload;

export type CallTokenPayload = BaseTokenPayload & {
  call_cids: string[];
  role?: string;
};
