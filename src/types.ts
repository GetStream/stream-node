export type OmitTypeId<T> = Omit<T, 'type' | 'id' | 'connection_id'>;
