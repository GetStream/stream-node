import { RateLimit } from '../types';

export const getRateLimitFromResponseHeader = (responseHeaders: Headers) => {
  const rateLimit = responseHeaders.has('x-ratelimit-limit')
    ? +responseHeaders.get('x-ratelimit-limit')!
    : undefined;
  const rateLimitRemaining = responseHeaders.has('x-ratelimit-remaining')
    ? +responseHeaders.get('x-ratelimit-remaining')!
    : undefined;
  const rateLimitReset = responseHeaders.has('x-ratelimit-reset')
    ? new Date(+responseHeaders.get('x-ratelimit-reset')! * 1000)
    : undefined;

  const result: RateLimit = {
    rateLimit,
    rateLimitRemaining,
    rateLimitReset,
  };

  return result;
};
