const FONT = {
  C: [0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110],
  D: [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
  E: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
  N: [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
  O: [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  R: [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
  T: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
  "/": [0b00001, 0b00010, 0b00010, 0b00100, 0b01000, 0b01000, 0b10000],
};

const clampInt16 = (value) => Math.max(-32_768, Math.min(32_767, value));

export const createRobotVoice = ({ tremoloHz = 18, bitDepth = 11 } = {}) => {
  if (tremoloHz <= 0 || bitDepth < 2 || bitDepth > 16) {
    throw new RangeError("Invalid robot voice options");
  }

  const quantum = 2 ** (16 - bitDepth);
  let sampleOffset = 0;

  return (frame) => {
    if (
      frame.data.length % 2 !== 0 ||
      frame.sampleRate <= 0 ||
      frame.channels <= 0
    ) {
      throw new RangeError(
        "PCM must contain complete int16 samples with a valid format",
      );
    }

    const data = Buffer.allocUnsafe(frame.data.length);
    const sampleCount = frame.data.length / 2;
    for (let index = 0; index < sampleCount; index += 1) {
      const time =
        (sampleOffset + Math.floor(index / frame.channels)) / frame.sampleRate;
      const tremolo = 0.6 + 0.4 * Math.sin(2 * Math.PI * tremoloHz * time);
      const sample = frame.data.readInt16LE(index * 2);
      const crushed = Math.round((sample * tremolo) / quantum) * quantum;
      data.writeInt16LE(clampInt16(crushed), index * 2);
    }
    sampleOffset += Math.floor(sampleCount / frame.channels);

    return { ...frame, data };
  };
};

const assertI420 = ({ data, width, height }) => {
  const expected = (width * height * 3) / 2;
  if (
    width <= 0 ||
    height <= 0 ||
    width % 2 ||
    height % 2 ||
    data.length !== expected
  ) {
    throw new RangeError(
      "I420 frames require even dimensions and width * height * 3 / 2 bytes",
    );
  }
};

const fillRect = (data, width, height, x, y, rectWidth, rectHeight, yuv) => {
  const x0 = Math.max(0, x);
  const y0 = Math.max(0, y);
  const x1 = Math.min(width, x + rectWidth);
  const y1 = Math.min(height, y + rectHeight);
  const lumaSize = width * height;
  const chromaWidth = width / 2;
  const uOffset = lumaSize;
  const vOffset = lumaSize + lumaSize / 4;

  for (let row = y0; row < y1; row += 1) {
    data.fill(yuv[0], row * width + x0, row * width + x1);
  }
  for (let row = Math.floor(y0 / 2); row < Math.ceil(y1 / 2); row += 1) {
    const start = row * chromaWidth + Math.floor(x0 / 2);
    const end = row * chromaWidth + Math.ceil(x1 / 2);
    data.fill(yuv[1], uOffset + start, uOffset + end);
    data.fill(yuv[2], vOffset + start, vOffset + end);
  }
};

const drawBadge = (data, width, height, scale) => {
  const text = "NODE//RTC";
  const badgeWidth = (text.length * 6 - 1) * scale + 8 * scale;
  const badgeHeight = 15 * scale;
  const left = Math.max(4 * scale, width - badgeWidth - 4 * scale);
  const top = Math.max(4 * scale, height - badgeHeight - 4 * scale);
  fillRect(
    data,
    width,
    height,
    left,
    top,
    badgeWidth,
    badgeHeight,
    [18, 128, 128],
  );

  for (let letter = 0; letter < text.length; letter += 1) {
    const glyph = FONT[text[letter]];
    for (let row = 0; row < glyph.length; row += 1) {
      for (let column = 0; column < 5; column += 1) {
        if (glyph[row] & (1 << (4 - column))) {
          fillRect(
            data,
            width,
            height,
            left + (4 + letter * 6 + column) * scale,
            top + (4 + row) * scale,
            scale,
            scale,
            [220, 170, 45],
          );
        }
      }
    }
  }
};

export const createNeonTimeSlice = ({ trailFrames = 5 } = {}) => {
  if (!Number.isInteger(trailFrames) || trailFrames < 1 || trailFrames > 12) {
    throw new RangeError("trailFrames must be an integer from 1 to 12");
  }

  let history = [];
  let dimensions = "";
  let frameIndex = 0;

  return (frame) => {
    assertI420(frame);
    const key = `${frame.width}x${frame.height}`;
    if (key !== dimensions) {
      dimensions = key;
      history = [];
    }

    const { width, height } = frame;
    const data = Buffer.from(frame.data);
    const past = history[0];
    const lumaSize = width * height;
    const chromaWidth = width / 2;
    const chromaHeight = height / 2;
    const uOffset = lumaSize;
    const vOffset = lumaSize + lumaSize / 4;

    if (past) {
      for (let index = 0; index < lumaSize; index += 1) {
        data[index] = (frame.data[index] * 3 + past[index]) >> 2;
      }

      const shift = Math.max(1, Math.floor(width / 80));
      for (let row = 0; row < chromaHeight; row += 1) {
        const rowStart = row * chromaWidth;
        const uStart = uOffset + rowStart;
        const vStart = vOffset + rowStart;
        data.fill(past[uStart], uStart, uStart + shift);
        past.copy(data, uStart + shift, uStart, uStart + chromaWidth - shift);
        past.copy(data, vStart, vStart + shift, vStart + chromaWidth);
        data.fill(
          past[vStart + chromaWidth - 1],
          vStart + chromaWidth - shift,
          vStart + chromaWidth,
        );
      }

      const sliceTop = (frameIndex * 17) % height;
      const sliceHeight = Math.max(4, Math.floor(height / 18));
      const offset = Math.min(width - 1, Math.max(4, Math.floor(width / 32)));
      for (
        let row = sliceTop;
        row < Math.min(height, sliceTop + sliceHeight);
        row += 1
      ) {
        const start = row * width;
        past.copy(data, start, start + offset, start + width);
        past.copy(data, start + width - offset, start, start + offset);
      }
    }

    const border = Math.max(2, Math.floor(Math.min(width, height) / 80));
    const cyan = [210, 170, 35];
    const magenta = [135, 205, 225];
    fillRect(data, width, height, 0, 0, width, border, cyan);
    fillRect(data, width, height, 0, height - border, width, border, magenta);
    fillRect(data, width, height, 0, 0, border, height, magenta);
    fillRect(data, width, height, width - border, 0, border, height, cyan);

    const scanline =
      (frameIndex * Math.max(2, Math.floor(height / 60))) % height;
    fillRect(data, width, height, 0, scanline, width, border, cyan);
    drawBadge(data, width, height, Math.max(1, Math.floor(width / 640)));

    history.push(Buffer.from(frame.data));
    if (history.length > trailFrames) history.shift();
    frameIndex += 1;

    return { ...frame, data };
  };
};
