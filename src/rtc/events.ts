import { toRtcError } from './errors';
import type { RtcErrorEvent } from './types';

export type RtcEventListener = (event: unknown) => unknown;

export class RtcEventDispatcher {
  private readonly listeners = new Map<string, Set<RtcEventListener>>();

  on = (event: string, listener: RtcEventListener) => {
    let listeners = this.listeners.get(event);
    if (!listeners) {
      listeners = new Set();
      this.listeners.set(event, listeners);
    }
    listeners.add(listener);
    return () => this.off(event, listener);
  };

  off = (event: string, listener: RtcEventListener) => {
    const listeners = this.listeners.get(event);
    listeners?.delete(listener);
    if (listeners?.size === 0) this.listeners.delete(event);
  };

  dispatch = (event: string, payload: unknown) => {
    const failures = this.dispatchOnce(event, payload);
    if (event === 'error') return;

    for (const failure of failures) {
      this.dispatchListenerFailure(event, failure);
    }
  };

  private dispatchOnce = (event: string, payload: unknown) => {
    const failures: unknown[] = [];
    const notify = (listener: RtcEventListener) => {
      try {
        void Promise.resolve(listener(payload)).catch((error: unknown) => {
          if (event !== 'error') this.dispatchListenerFailure(event, error);
        });
      } catch (error) {
        failures.push(error);
      }
    };

    for (const listener of [...(this.listeners.get(event) ?? [])]) {
      notify(listener);
    }
    if (event !== 'all') {
      for (const listener of [...(this.listeners.get('all') ?? [])]) {
        notify(listener);
      }
    }
    return failures;
  };

  private dispatchListenerFailure = (
    sourceEventType: string,
    error: unknown,
  ) => {
    const errorEvent: RtcErrorEvent = {
      type: 'error',
      error: toRtcError(error),
      sourceEventType,
    };
    this.dispatchOnce('error', errorEvent);
  };
}
