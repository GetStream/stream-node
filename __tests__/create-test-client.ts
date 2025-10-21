import 'dotenv/config';
import { StreamClient } from '../src/StreamClient';

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

export const createTestClient = () => {
  return new StreamClient(apiKey, secret, { timeout: 30000 });
};
