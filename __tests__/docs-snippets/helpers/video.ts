import { createUserToken } from './clients';

const VIDEO_API = 'https://video.stream-io-api.com/api/v2/video';

/**
 * Sends a POST to the video API as `userId` (user token), for client-side endpoints
 * the server SDK can't call (join, feedback, ...). Throws on a non-2xx response.
 */
export const postAsVideoUser = async <T = unknown>(
  userId: string,
  path: string,
  body: object,
) => {
  const response = await fetch(
    `${VIDEO_API}${path}?api_key=${process.env.STREAM_API_KEY}`,
    {
      method: 'POST',
      headers: {
        Authorization: createUserToken(userId),
        'stream-auth-type': 'jwt',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const json = (await response.json()) as T;
  if (!response.ok) {
    throw new Error(`${path}: ${response.status} ${JSON.stringify(json)}`);
  }
  return json;
};

/**
 * Joins a call as `userId` over REST (no WebRTC). This starts a call session, so
 * egress that needs one works afterwards: recording, transcription, closed captions,
 * HLS, frame recording (start and stop, 2026-10-16). Returns the session id.
 */
export const joinCallAsUser = async (
  call: { type: string; id: string },
  userId: string,
) => {
  const { call: joined } = await postAsVideoUser<{
    call: { current_session_id: string };
  }>(userId, `/call/${call.type}/${call.id}/join`, { location: 'AMS' });
  return joined.current_session_id;
};
