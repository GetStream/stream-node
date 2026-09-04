import {
  RtcClosedError,
  RtcError,
  RtcIllegalStateError,
  toRtcError,
} from './errors';
import { parseRtcCallEvent, parseRtcCallState } from './contracts';
import type { NativeCall } from './native';
import { StreamCallState } from './state';
import { RemoteTrack } from './tracks';
import type {
  JoinCallOptions,
  RtcCallingState,
  RtcErrorEvent,
  RtcTrackUnpublishedEvent,
} from './types';

export interface RtcCallLifecycleOptions {
  state: StreamCallState;
  createNativeCall: () => NativeCall;
  prepareNativeCall: (native: NativeCall, options: JoinCallOptions) => void;
  configureJoinedCall: (native: NativeCall) => Promise<void>;
  emit: (event: string, payload: unknown) => void;
}

export class RtcCallLifecycle {
  private nativeCall?: NativeCall;
  private joinPromise?: Promise<void>;
  private leavePromise?: Promise<void>;
  private generation = 0;
  private readonly teardowns = new WeakMap<NativeCall, Promise<void>>();

  constructor(private readonly options: RtcCallLifecycleOptions) {}

  get currentNativeCall() {
    return this.nativeCall;
  }

  join = (options: JoinCallOptions): Promise<void> => {
    if (!options.userId) {
      return Promise.reject(
        new RtcIllegalStateError('join requires a non-empty userId'),
      );
    }
    if (this.joinPromise || this.leavePromise || this.nativeCall) {
      return Promise.reject(
        new RtcIllegalStateError(
          `Cannot join while the call is ${this.options.state.callingState}`,
        ),
      );
    }

    const generation = ++this.generation;
    const pending = this.runJoin(generation, options);
    const tracked = pending.finally(() => {
      if (this.joinPromise === tracked) this.joinPromise = undefined;
    });
    this.joinPromise = tracked;
    return tracked;
  };

  leave = (): Promise<void> => {
    this.generation += 1;
    if (this.leavePromise) return this.leavePromise;

    const native = this.nativeCall;
    const pendingJoin = this.joinPromise;
    this.nativeCall = undefined;

    const pending = this.runLeave(native, pendingJoin);
    const tracked = pending.finally(() => {
      if (this.leavePromise === tracked) this.leavePromise = undefined;
    });
    this.leavePromise = tracked;
    return tracked;
  };

  requireNativeCall = (operation: string) => {
    if (!this.nativeCall) {
      throw new RtcIllegalStateError(
        `${operation} requires an active or joining call`,
      );
    }
    return this.nativeCall;
  };

  private runJoin = async (generation: number, options: JoinCallOptions) => {
    let native: NativeCall | undefined;
    try {
      native = this.options.createNativeCall();
      this.nativeCall = native;
      this.options.prepareNativeCall(native, options);
      this.options.state.clearRemoteTracks();
      this.setCallingState('joining');
      this.assertCurrent(native, generation);

      this.startEventPump(native, generation);
      this.startRemoteTrackPump(native, generation);
      await native.join(JSON.stringify(options));
      this.assertCurrent(native, generation);

      if (!(await this.refreshState(native, generation))) {
        throw this.supersededJoinError();
      }
      await this.options.configureJoinedCall(native);
      this.assertCurrent(native, generation);
    } catch (error) {
      let cleanupError: unknown;
      if (native) {
        try {
          await this.teardown(native);
        } catch (caught) {
          cleanupError = caught;
        }
      }

      if (this.isCurrent(native, generation)) {
        this.nativeCall = undefined;
        this.options.state.clearRemoteTracks();
        this.setCallingState('idle');
      }

      const joinError = toRtcError(error);
      if (!cleanupError) throw joinError;

      const cleanup = toRtcError(cleanupError);
      throw new RtcError(
        `${joinError.message}; native cleanup failed: ${cleanup.message}`,
        joinError.code,
        {
          ...joinError.details,
          cleanupError: { code: cleanup.code, message: cleanup.message },
        },
        { cause: new AggregateError([joinError, cleanup]) },
      );
    }
  };

  private runLeave = async (
    native: NativeCall | undefined,
    pendingJoin: Promise<void> | undefined,
  ) => {
    let leaveError: unknown;
    if (native) {
      try {
        await this.teardown(native);
      } catch (error) {
        leaveError = error;
      }
    }
    if (!leaveError && pendingJoin) {
      await pendingJoin.catch(() => undefined);
    }

    this.options.state.clearRemoteTracks();
    this.setCallingState('left');
    if (leaveError) throw toRtcError(leaveError);
  };

  private teardown = (native: NativeCall) => {
    let teardown = this.teardowns.get(native);
    if (!teardown) {
      try {
        teardown = Promise.resolve(native.leave());
      } catch (error) {
        teardown = Promise.reject(toRtcError(error));
      }
      this.teardowns.set(native, teardown);
    }
    return teardown;
  };

  private startEventPump = (native: NativeCall, generation: number) => {
    void (async () => {
      while (this.isCurrent(native, generation)) {
        let json: string | undefined | null;
        try {
          json = await native.nextEvent();
        } catch (error) {
          if (this.isCurrent(native, generation)) this.emitError(error);
          return;
        }
        if (!json || !this.isCurrent(native, generation)) return;

        try {
          const event = parseRtcCallEvent(json);
          if (!(await this.refreshState(native, generation))) return;
          if (event.type === 'trackUnpublished') {
            const unpublished = event as RtcTrackUnpublishedEvent;
            this.options.state.removeRemoteTrack(
              unpublished.sessionId,
              unpublished.trackType,
            );
          }
          this.options.emit(event.type, event);
          if (
            event.type === 'callEnded' ||
            (event.type === 'callingStateChanged' &&
              event.callingState === 'left')
          ) {
            return;
          }
        } catch (error) {
          if (!this.isCurrent(native, generation)) return;
          this.emitError(error);
        }
      }
    })();
  };

  private startRemoteTrackPump = (native: NativeCall, generation: number) => {
    void (async () => {
      try {
        while (this.isCurrent(native, generation)) {
          const handle = await native.nextRemoteTrack();
          if (!handle || !this.isCurrent(native, generation)) return;
          const track = new RemoteTrack(handle);
          this.options.state.addRemoteTrack(track);
          this.options.emit('remoteTrack', track);
        }
      } catch (error) {
        if (this.isCurrent(native, generation)) this.emitError(error);
      }
    })();
  };

  private refreshState = async (native: NativeCall, generation: number) => {
    const json = await native.stateJson();
    if (!this.isCurrent(native, generation)) return false;
    const snapshot = parseRtcCallState(json);
    if (!this.isCurrent(native, generation)) return false;
    this.options.state.update(snapshot);
    return true;
  };

  private isCurrent = (native: NativeCall | undefined, generation: number) =>
    this.generation === generation && this.nativeCall === native;

  private assertCurrent = (native: NativeCall, generation: number) => {
    if (!this.isCurrent(native, generation)) {
      throw this.supersededJoinError();
    }
  };

  private supersededJoinError = () =>
    new RtcClosedError('Join was superseded by leave or a newer generation');

  private setCallingState = (callingState: RtcCallingState) => {
    if (this.options.state.callingState === callingState) return;
    this.options.state.setCallingState(callingState);
    this.options.emit('callingStateChanged', {
      type: 'callingStateChanged',
      callingState,
    });
  };

  private emitError = (error: unknown) => {
    const event: RtcErrorEvent = {
      type: 'error',
      error: toRtcError(error),
    };
    this.options.emit('error', event);
  };
}
