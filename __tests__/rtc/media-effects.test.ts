import { describe, expect, it } from 'vitest';

import {
  createNeonTimeSlice,
  createRobotVoice,
} from '../../examples/rtc-neon-effects.mjs';

const i420 = (width: number, height: number, y = 120) => {
  const data = Buffer.alloc((width * height * 3) / 2, 128);
  data.fill(y, 0, width * height);
  return { data, width, height, rtpTimestamp: 0 };
};

describe('RTC example media effects', () => {
  it('creates a stateful robot voice without mutating input PCM', () => {
    const input = Buffer.alloc(960 * 2);
    for (let index = 0; index < 960; index += 1) {
      input.writeInt16LE(12_000, index * 2);
    }
    const original = Buffer.from(input);
    const transform = createRobotVoice();

    const first = transform({
      data: input,
      sampleRate: 48_000,
      channels: 1,
      durationMs: 20,
    });
    const second = transform({
      data: input,
      sampleRate: 48_000,
      channels: 1,
      durationMs: 20,
    });

    expect(input).toEqual(original);
    expect(first.data).not.toEqual(input);
    expect(second.data).not.toEqual(first.data);
  });

  it('adds a persistent badge, border, scanline, and temporal chroma shift', () => {
    const input = i420(320, 240);
    const original = Buffer.from(input.data);
    const transform = createNeonTimeSlice({ trailFrames: 2 });
    const first = transform(input);
    const secondInput = i420(320, 240, 180);
    const second = transform(secondInput);

    expect(input.data).toEqual(original);
    expect(first.data).not.toEqual(input.data);
    expect(second.data).not.toEqual(secondInput.data);
    expect(second.data.subarray(320 * 240)).not.toEqual(
      secondInput.data.subarray(320 * 240),
    );
  });

  it('rejects malformed media and invalid effect options', () => {
    expect(() => createRobotVoice({ tremoloHz: 0 })).toThrow(RangeError);
    expect(() => createNeonTimeSlice({ trailFrames: 0 })).toThrow(RangeError);
    expect(() =>
      createNeonTimeSlice()({
        data: Buffer.alloc(10),
        width: 3,
        height: 2,
        rtpTimestamp: 0,
      }),
    ).toThrow(RangeError);
  });
});
