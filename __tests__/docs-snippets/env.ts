import { config } from 'dotenv';
import path from 'node:path';

// The node SDK's test app, shared with the integration tests (repo root .env).
config({ path: path.join(__dirname, '../../.env'), quiet: true });

if (!process.env.STREAM_API_KEY || !process.env.STREAM_SECRET) {
  throw new Error(
    'Missing STREAM_API_KEY / STREAM_SECRET. Copy .env-example to .env in the repo root and fill it in.',
  );
}
