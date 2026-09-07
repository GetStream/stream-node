import type { RemoteTrack } from './tracks';
import type {
  RtcCallingState,
  RtcCallStateSnapshot,
  RtcParticipant,
} from './types';

const initialSnapshot = (): RtcCallStateSnapshot => ({
  callingState: 'idle',
  participants: [],
  participantCount: 0,
  anonymousParticipantCount: 0,
  pins: [],
  e2eeEnabled: false,
  ownCapabilities: [],
});

export class StreamCallState {
  private snapshot = initialSnapshot();
  private tracks = new Map<string, RemoteTrack>();

  get callingState(): RtcCallingState {
    return this.snapshot.callingState;
  }

  get sessionId() {
    return this.snapshot.sessionId;
  }

  get participants(): readonly RtcParticipant[] {
    return this.snapshot.participants;
  }

  get localParticipant() {
    return this.snapshot.participants.find(
      (participant) => participant.sessionId === this.snapshot.sessionId,
    );
  }

  get remoteParticipants() {
    return this.snapshot.participants.filter(
      (participant) => participant.sessionId !== this.snapshot.sessionId,
    );
  }

  get participantCount() {
    return this.snapshot.participantCount;
  }

  get anonymousParticipantCount() {
    return this.snapshot.anonymousParticipantCount;
  }

  get ownCapabilities(): readonly string[] {
    return this.snapshot.ownCapabilities;
  }

  get currentGrants() {
    return this.snapshot.currentGrants;
  }

  get pins(): readonly unknown[] {
    return this.snapshot.pins;
  }

  get startedAt() {
    return this.snapshot.startedAt;
  }

  get e2eeEnabled() {
    return this.snapshot.e2eeEnabled;
  }

  get remoteTracks(): readonly RemoteTrack[] {
    return [...this.tracks.values()];
  }

  /** @internal */
  update = (snapshot: RtcCallStateSnapshot) => {
    this.snapshot = {
      ...snapshot,
      participants: [...snapshot.participants],
      pins: [...snapshot.pins],
      ownCapabilities: [...snapshot.ownCapabilities],
    };
  };

  /** @internal */
  setCallingState = (callingState: RtcCallingState) => {
    this.snapshot = { ...this.snapshot, callingState };
  };

  /** @internal */
  addRemoteTrack = (track: RemoteTrack) => {
    this.tracks.set(trackKey(track), track);
  };

  /** @internal */
  removeRemoteTrack = (sessionId: string, type: string) => {
    this.tracks.delete(`${sessionId}:${type}`);
  };

  /** @internal */
  clearRemoteTracks = () => this.tracks.clear();
}

const trackKey = (track: RemoteTrack) => `${track.sessionId}:${track.type}`;
