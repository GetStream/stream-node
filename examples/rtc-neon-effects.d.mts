export interface PcmEffectFrame {
  data: Buffer;
  sampleRate: number;
  channels: number;
  durationMs: number;
}

export interface I420EffectFrame {
  data: Buffer;
  width: number;
  height: number;
  rtpTimestamp: number;
}

export function createRobotVoice(options?: {
  tremoloHz?: number;
  bitDepth?: number;
}): <T extends PcmEffectFrame>(frame: T) => T;

export function createNeonTimeSlice(options?: {
  trailFrames?: number;
}): <T extends I420EffectFrame>(frame: T) => T;
