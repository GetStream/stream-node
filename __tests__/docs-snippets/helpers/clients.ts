import { StreamClient } from '../../../index';

const apiKey = () => process.env.STREAM_API_KEY as string;
const apiSecret = () => process.env.STREAM_SECRET as string;

/**
 * Server-side client (API key + secret), the `client` of the docs snippets. Also used for
 * setup, cleanup and assertions. The default 3s timeout is too short for some endpoints.
 */
export const getServerClient = () =>
  new StreamClient(apiKey(), apiSecret(), { timeout: 30000 });

/** User token for `userId`, signed with the API secret. */
export const createUserToken = (userId: string) =>
  getServerClient().generateUserToken({ user_id: userId });
