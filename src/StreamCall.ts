import { VideoApi } from './gen-imports';
import {
  CallResponse,
  GetOrCreateCallRequest,
  QueryCallMembersRequest,
} from './gen/models';
import { CallApi } from './gen/video/CallApi';
import { StreamClient } from './StreamClient';
import { OmitTypeId } from './types';
import { toRtcError } from './rtc/errors';
import { RtcCallLifecycle } from './rtc/callLifecycle';
import { parseRtcStats } from './rtc/contracts';
import { RtcEventDispatcher } from './rtc/events';
import { nativeRtcCall, type NativeCall } from './rtc/native';
import { StreamCallState } from './rtc/state';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  nativeAudioTrack,
  nativeVideoTrack,
} from './rtc/tracks';
import type {
  JoinCallOptions,
  RtcCallEvent,
  RtcCallEventHandler,
  RtcCallEventName,
  RtcStats,
  RtcTrackType,
  RtcVideoCodec,
  SubscriptionConfig,
  SubscriptionTarget,
  VideoDimension,
} from './rtc/types';

/**
 * The SFU forwards no video unless the subscription carries a dimension hint,
 * so fill one in rather than leaving the caller with a silently black call.
 * Matches the Rust core's own audio+video convenience defaults.
 */
const DEFAULT_INCOMING_VIDEO_DIMENSION: VideoDimension = {
  width: 1280,
  height: 720,
};

const withVideoDimension = (config: SubscriptionConfig): SubscriptionConfig =>
  (config.video || config.screenShare) && !config.videoDimension
    ? { ...config, videoDimension: DEFAULT_INCOMING_VIDEO_DIMENSION }
    : { ...config };

export class StreamCall extends CallApi {
  data?: CallResponse;
  readonly state = new StreamCallState();

  private readonly rtcEvents = new RtcEventDispatcher();
  private readonly rtcLifecycle: RtcCallLifecycle;
  private disconnectionTimeoutSeconds?: number;
  private preferredVideoCodec?: RtcVideoCodec;
  private subscriptionConfig: SubscriptionConfig = { audio: true };

  constructor(
    videoApi: VideoApi,
    readonly type: string,
    readonly id: string,
    private readonly streamClient: StreamClient,
  ) {
    super(videoApi, type, id);
    this.rtcLifecycle = new RtcCallLifecycle({
      state: this.state,
      createNativeCall: () =>
        nativeRtcCall(this.streamClient, this.type, this.id),
      prepareNativeCall: (native, options) => {
        const codec = options.preferredVideoCodec ?? this.preferredVideoCodec;
        if (codec) native.updatePublishOptions(codec);
        if (this.disconnectionTimeoutSeconds !== undefined) {
          native.setDisconnectionTimeout(this.disconnectionTimeoutSeconds);
        }
      },
      configureJoinedCall: (native) =>
        native.updateSubscriptions(JSON.stringify(this.subscriptionConfig)),
      emit: (event, payload) => this.rtcEvents.dispatch(event, payload),
    });
  }

  get cid() {
    return `${this.type}:${this.id}`;
  }

  join = (options: JoinCallOptions): Promise<void> =>
    this.rtcLifecycle.join(options);

  leave = (): Promise<void> => this.rtcLifecycle.leave();

  on<E extends RtcCallEventName>(
    event: E,
    handler: RtcCallEventHandler<E>,
  ): () => void;
  on(event: string, handler: (event: RtcCallEvent) => void): () => void;
  on(event: string, handler: (event: never) => void) {
    return this.rtcEvents.on(event, handler as (event: unknown) => void);
  }

  off<E extends RtcCallEventName>(
    event: E,
    handler: RtcCallEventHandler<E>,
  ): void;
  off(event: string, handler: (event: RtcCallEvent) => void): void;
  off(event: string, handler: (event: never) => void) {
    this.rtcEvents.off(event, handler as (event: unknown) => void);
  }

  requestPermissions = async (data: { permissions: string[] }) => {
    try {
      return JSON.parse(
        await this.requireNativeCall('requestPermissions').requestPermissions(
          data.permissions,
        ),
      ) as unknown;
    } catch (error) {
      throw toRtcError(error);
    }
  };

  grantPermissions = (userId: string, permissions: string[]) =>
    this.updateUserPermissions({
      user_id: userId,
      grant_permissions: permissions,
      revoke_permissions: [],
    });

  revokePermissions = (userId: string, permissions: string[]) =>
    this.updateUserPermissions({
      user_id: userId,
      grant_permissions: [],
      revoke_permissions: permissions,
    });

  setDisconnectionTimeout = (timeoutSeconds: number) => {
    if (!Number.isFinite(timeoutSeconds) || timeoutSeconds < 0) {
      throw new RangeError(
        'timeoutSeconds must be a finite, non-negative number',
      );
    }
    this.disconnectionTimeoutSeconds = timeoutSeconds;
    try {
      this.rtcLifecycle.currentNativeCall?.setDisconnectionTimeout(
        timeoutSeconds,
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  updatePublishOptions = (options: { preferredVideoCodec?: RtcVideoCodec }) => {
    this.preferredVideoCodec = options.preferredVideoCodec;
    try {
      this.rtcLifecycle.currentNativeCall?.updatePublishOptions(
        options.preferredVideoCodec,
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  updateSubscriptions = async (config: SubscriptionConfig) => {
    this.subscriptionConfig = withVideoDimension(config);
    try {
      await this.requireNativeCall('updateSubscriptions').updateSubscriptions(
        JSON.stringify(this.subscriptionConfig),
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  updateSubscriptionTargets = async (targets: SubscriptionTarget[]) => {
    try {
      await this.requireNativeCall(
        'updateSubscriptionTargets',
      ).updateSubscriptionTargets(JSON.stringify(targets));
    } catch (error) {
      throw toRtcError(error);
    }
  };

  setIncomingVideoEnabled = async (enabled: boolean) => {
    this.subscriptionConfig = withVideoDimension({
      ...this.subscriptionConfig,
      video: enabled,
      videoDimension: enabled
        ? this.subscriptionConfig.videoDimension
        : undefined,
    });
    const native = this.requireNativeCall('setIncomingVideoEnabled');
    try {
      // Flips the video flag and drops any per-participant targets.
      await native.setIncomingVideoEnabled(enabled);
      if (enabled) {
        // That toggle deliberately clears the dimension hint, and the SFU
        // forwards no video without one, so restate the policy.
        await native.updateSubscriptions(
          JSON.stringify(this.subscriptionConfig),
        );
      }
    } catch (error) {
      throw toRtcError(error);
    }
  };

  setPreferredIncomingVideoResolution = async (
    resolution?: VideoDimension,
    sessionIds?: string[],
  ) => {
    if (sessionIds?.length) {
      await this.updateSubscriptionTargets(
        sessionIds.map((sessionId) => ({
          sessionId,
          trackType: 'video',
          dimension: resolution,
        })),
      );
      return;
    }

    await this.updateSubscriptions({
      ...this.subscriptionConfig,
      video: resolution ? true : this.subscriptionConfig.video,
      videoDimension: resolution,
    });
  };

  publishAudio = async (track: LocalAudioTrack) => {
    try {
      await this.requireNativeCall('publishAudio').publishAudio(
        nativeAudioTrack(track),
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  publishVideo = async (track: LocalVideoTrack) => {
    try {
      await this.requireNativeCall('publishVideo').publishVideo(
        nativeVideoTrack(track),
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  publishScreenShare = async (track: LocalVideoTrack) => {
    try {
      await this.requireNativeCall('publishScreenShare').publishScreenShare(
        nativeVideoTrack(track),
      );
    } catch (error) {
      throw toRtcError(error);
    }
  };

  publishScreenShareAudio = async (track: LocalAudioTrack) => {
    try {
      await this.requireNativeCall(
        'publishScreenShareAudio',
      ).publishScreenShareAudio(nativeAudioTrack(track));
    } catch (error) {
      throw toRtcError(error);
    }
  };

  stopPublish = async (
    track: LocalAudioTrack | LocalVideoTrack,
    trackType: RtcTrackType = track instanceof LocalAudioTrack
      ? 'audio'
      : 'video',
  ) => {
    try {
      const native = this.requireNativeCall('stopPublish');
      if (track instanceof LocalAudioTrack) {
        await native.stopPublishAudio(nativeAudioTrack(track), trackType);
      } else {
        await native.stopPublishVideo(nativeVideoTrack(track), trackType);
      }
    } catch (error) {
      throw toRtcError(error);
    }
  };

  muteTrack = (trackType: RtcTrackType) =>
    this.runNative('muteTrack', (native) => native.muteTrack(trackType));

  unmuteTrack = (trackType: RtcTrackType) =>
    this.runNative('unmuteTrack', (native) => native.unmuteTrack(trackType));

  startNoiseCancellation = () =>
    this.runNative('startNoiseCancellation', (native) =>
      native.startNoiseCancellation(),
    );

  stopNoiseCancellation = () =>
    this.runNative('stopNoiseCancellation', (native) =>
      native.stopNoiseCancellation(),
    );

  getStats = async (): Promise<RtcStats | undefined> => {
    try {
      const json = await this.requireNativeCall('getStats').statsJson();
      return json ? parseRtcStats(json) : undefined;
    } catch (error) {
      throw toRtcError(error);
    }
  };

  create = (request?: GetOrCreateCallRequest) => this.getOrCreate(request);

  queryMembers = (request?: OmitTypeId<QueryCallMembersRequest>) => {
    return this.videoApi.queryCallMembers({
      id: this.id,
      type: this.type,
      ...(request ?? {}),
    });
  };

  getOrCreate = async (request?: GetOrCreateCallRequest) => {
    const response = await super.getOrCreate(request);
    this.data = response.call;
    return response;
  };

  get = async () => {
    const response = await super.get();
    this.data = response.call;
    return response;
  };

  createSRTCredentials = (
    userID: string,
  ): {
    address: string;
  } => {
    if (!this.data) {
      throw new Error(
        'Object is not initialized, call get() or getOrCreate() first',
      );
    }

    const token = this.streamClient.generatePermanentUserToken({
      user_id: userID,
    });
    const segments = token.split('.');
    if (segments.length !== 3) {
      throw new Error('Invalid token format');
    }

    return {
      address: this.data.ingress.srt.address
        .replace('{passphrase}', segments[2])
        .replace('{token}', token),
    };
  };

  private requireNativeCall = (operation: string) => {
    return this.rtcLifecycle.requireNativeCall(operation);
  };

  private runNative = async (
    operation: string,
    run: (native: NativeCall) => Promise<void>,
  ) => {
    try {
      await run(this.requireNativeCall(operation));
    } catch (error) {
      throw toRtcError(error);
    }
  };
}
