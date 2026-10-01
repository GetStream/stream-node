export type RtcErrorCode =
  | 'RTC_NATIVE_UNAVAILABLE'
  | 'RTC_NATIVE_VERSION_MISMATCH'
  | 'RTC_UNSUPPORTED_PLATFORM'
  | 'RTC_ILLEGAL_STATE'
  | 'RTC_PERMISSION_DENIED'
  | 'RTC_JOIN'
  | 'RTC_TIMEOUT'
  | 'RTC_CONNECTION'
  | 'RTC_NEGOTIATION'
  | 'RTC_MEDIA'
  | 'RTC_UNSUPPORTED_LAYERING'
  | 'RTC_QUEUE_OVERFLOW'
  | 'RTC_SIZE_LIMIT'
  | 'RTC_CLOSED'
  | 'RTC_UNKNOWN';

export interface RtcErrorDetails {
  [key: string]: unknown;
}

export class RtcError extends Error {
  constructor(
    message: string,
    readonly code: RtcErrorCode,
    readonly details: RtcErrorDetails = {},
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'RtcError';
  }
}

export class RtcNativeUnavailableError extends RtcError {
  constructor(
    message: string,
    details: RtcErrorDetails = {},
    options?: ErrorOptions,
  ) {
    super(message, 'RTC_NATIVE_UNAVAILABLE', details, options);
    this.name = 'RtcNativeUnavailableError';
  }
}

export class RtcNativeVersionMismatchError extends RtcError {
  constructor(
    message: string,
    details: RtcErrorDetails = {},
    options?: ErrorOptions,
  ) {
    super(message, 'RTC_NATIVE_VERSION_MISMATCH', details, options);
    this.name = 'RtcNativeVersionMismatchError';
  }
}

export class RtcUnsupportedPlatformError extends RtcError {
  constructor(
    message: string,
    details: RtcErrorDetails = {},
    options?: ErrorOptions,
  ) {
    super(message, 'RTC_UNSUPPORTED_PLATFORM', details, options);
    this.name = 'RtcUnsupportedPlatformError';
  }
}

export class RtcIllegalStateError extends RtcError {
  constructor(
    message: string,
    details: RtcErrorDetails = {},
    options?: ErrorOptions,
  ) {
    super(message, 'RTC_ILLEGAL_STATE', details, options);
    this.name = 'RtcIllegalStateError';
  }
}

const defineRtcError = <TCode extends RtcErrorCode>(
  name: string,
  code: TCode,
) =>
  class extends RtcError {
    constructor(
      message: string,
      details: RtcErrorDetails = {},
      options?: ErrorOptions,
    ) {
      super(message, code, details, options);
      this.name = name;
    }
  };

export class RtcPermissionDeniedError extends defineRtcError(
  'RtcPermissionDeniedError',
  'RTC_PERMISSION_DENIED',
) {}
export class RtcJoinError extends defineRtcError('RtcJoinError', 'RTC_JOIN') {}
export class RtcTimeoutError extends defineRtcError(
  'RtcTimeoutError',
  'RTC_TIMEOUT',
) {}
export class RtcConnectionError extends defineRtcError(
  'RtcConnectionError',
  'RTC_CONNECTION',
) {}
export class RtcNegotiationError extends defineRtcError(
  'RtcNegotiationError',
  'RTC_NEGOTIATION',
) {}
export class RtcMediaError extends defineRtcError(
  'RtcMediaError',
  'RTC_MEDIA',
) {}
export class RtcUnsupportedLayeringError extends defineRtcError(
  'RtcUnsupportedLayeringError',
  'RTC_UNSUPPORTED_LAYERING',
) {}
export class RtcQueueOverflowError extends defineRtcError(
  'RtcQueueOverflowError',
  'RTC_QUEUE_OVERFLOW',
) {}
export class RtcSizeLimitError extends defineRtcError(
  'RtcSizeLimitError',
  'RTC_SIZE_LIMIT',
) {}
export class RtcClosedError extends defineRtcError(
  'RtcClosedError',
  'RTC_CLOSED',
) {}

type NativeError = Error & {
  code?: unknown;
  details?: unknown;
};

const rtcCodes = new Set<RtcErrorCode>([
  'RTC_NATIVE_UNAVAILABLE',
  'RTC_NATIVE_VERSION_MISMATCH',
  'RTC_UNSUPPORTED_PLATFORM',
  'RTC_ILLEGAL_STATE',
  'RTC_PERMISSION_DENIED',
  'RTC_JOIN',
  'RTC_TIMEOUT',
  'RTC_CONNECTION',
  'RTC_NEGOTIATION',
  'RTC_MEDIA',
  'RTC_UNSUPPORTED_LAYERING',
  'RTC_QUEUE_OVERFLOW',
  'RTC_SIZE_LIMIT',
  'RTC_CLOSED',
  'RTC_UNKNOWN',
]);

export const toRtcError = (error: unknown): RtcError => {
  if (error instanceof RtcError) return error;

  const native = error instanceof Error ? (error as NativeError) : undefined;
  let encoded: { code?: unknown; message?: unknown; details?: unknown } = {};
  if (native?.message.trimStart().startsWith('{')) {
    try {
      encoded = JSON.parse(native.message) as typeof encoded;
    } catch {
      // Keep the original native message when it is not an encoded RTC error.
    }
  }
  const code =
    typeof (encoded.code ?? native?.code) === 'string' &&
    rtcCodes.has((encoded.code ?? native?.code) as RtcErrorCode)
      ? ((encoded.code ?? native?.code) as RtcErrorCode)
      : 'RTC_UNKNOWN';
  const details =
    (encoded.details ?? native?.details) &&
    typeof (encoded.details ?? native?.details) === 'object' &&
    !Array.isArray(encoded.details ?? native?.details)
      ? ((encoded.details ?? native?.details) as RtcErrorDetails)
      : {};
  const message =
    typeof encoded.message === 'string'
      ? encoded.message
      : (native?.message ?? String(error));

  const options = { cause: error };
  switch (code) {
    case 'RTC_NATIVE_UNAVAILABLE':
      return new RtcNativeUnavailableError(message, details, options);
    case 'RTC_NATIVE_VERSION_MISMATCH':
      return new RtcNativeVersionMismatchError(message, details, options);
    case 'RTC_UNSUPPORTED_PLATFORM':
      return new RtcUnsupportedPlatformError(message, details, options);
    case 'RTC_ILLEGAL_STATE':
      return new RtcIllegalStateError(message, details, options);
    case 'RTC_PERMISSION_DENIED':
      return new RtcPermissionDeniedError(message, details, options);
    case 'RTC_JOIN':
      return new RtcJoinError(message, details, options);
    case 'RTC_TIMEOUT':
      return new RtcTimeoutError(message, details, options);
    case 'RTC_CONNECTION':
      return new RtcConnectionError(message, details, options);
    case 'RTC_NEGOTIATION':
      return new RtcNegotiationError(message, details, options);
    case 'RTC_MEDIA':
      return new RtcMediaError(message, details, options);
    case 'RTC_UNSUPPORTED_LAYERING':
      return new RtcUnsupportedLayeringError(message, details, options);
    case 'RTC_QUEUE_OVERFLOW':
      return new RtcQueueOverflowError(message, details, options);
    case 'RTC_SIZE_LIMIT':
      return new RtcSizeLimitError(message, details, options);
    case 'RTC_CLOSED':
      return new RtcClosedError(message, details, options);
    default:
      return new RtcError(message, code, details, options);
  }
};
