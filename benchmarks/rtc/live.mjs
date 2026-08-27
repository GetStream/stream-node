import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";

import {
  ResourceMonitor,
  sleep,
  summarize,
  uniqueId,
  waitFor,
  withTimeout,
} from "./support.mjs";

const AUDIO_SAMPLE_RATE = 48_000;
const AUDIO_FRAME_SAMPLES = AUDIO_SAMPLE_RATE / 50;
const VIDEO_WIDTH = 1_280;
const VIDEO_HEIGHT = 720;
const VIDEO_FRAME_MS = 1_000 / 30;
const DEFAULT_VIDEO_BITRATE_BPS = 2_500_000;

const errorRecord = (error, context) => ({
  context,
  name: error instanceof Error ? error.name : "UnknownError",
  message: error instanceof Error ? error.message : String(error),
  code:
    error && typeof error === "object" && "code" in error
      ? String(error.code)
      : null,
  details:
    error && typeof error === "object" && "details" in error
      ? error.details
      : null,
});

const timed = async (operation) => {
  const started = performance.now();
  const value = await operation();
  return { value, durationMs: performance.now() - started };
};

const memorySnapshot = () => ({
  at: new Date().toISOString(),
  ...process.memoryUsage(),
});

const toneFrame = (frameIndex) => {
  const data = Buffer.allocUnsafe(AUDIO_FRAME_SAMPLES * 2);
  for (let index = 0; index < AUDIO_FRAME_SAMPLES; index += 1) {
    const sample =
      Math.sin(
        (2 * Math.PI * 440 * (frameIndex * AUDIO_FRAME_SAMPLES + index)) /
          AUDIO_SAMPLE_RATE,
      ) * 12_000;
    data.writeInt16LE(Math.round(sample), index * 2);
  }
  return data;
};

const i420Frame = () => {
  const lumaSize = VIDEO_WIDTH * VIDEO_HEIGHT;
  const data = Buffer.alloc(lumaSize * 1.5);
  for (let row = 0; row < VIDEO_HEIGHT; row += 1) {
    const start = row * VIDEO_WIDTH;
    data.fill(32 + (row % 192), start, start + VIDEO_WIDTH);
  }
  data.fill(128, lumaSize);
  return data;
};

const startPacedMedia = ({
  audio,
  video,
  tolerateErrors = false,
  maxDurationMs,
}) => {
  let running = true;
  const failures = [];
  const videoData = video ? i420Frame() : null;
  const done = (async () => {
    const started = performance.now();
    let audioIndex = 0;
    let videoIndex = 0;
    while (running && performance.now() - started < maxDurationMs) {
      if (audio) {
        try {
          await audio.writePcm(toneFrame(audioIndex), {
            sampleRate: AUDIO_SAMPLE_RATE,
            channels: 1,
          });
        } catch (error) {
          failures.push(errorRecord(error, "audio write"));
          if (!tolerateErrors) break;
        }
        audioIndex += 1;
      }
      if (video && performance.now() - started >= videoIndex * VIDEO_FRAME_MS) {
        try {
          await video.writeI420(videoData, {
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            durationMs: VIDEO_FRAME_MS,
          });
        } catch (error) {
          failures.push(errorRecord(error, "video write"));
          if (!tolerateErrors) break;
        }
        videoIndex += 1;
      }
      const nextAudioAt = audio ? audioIndex * 20 : Infinity;
      const nextVideoAt = video ? videoIndex * VIDEO_FRAME_MS : Infinity;
      await sleep(
        started + Math.min(nextAudioAt, nextVideoAt) - performance.now(),
      );
    }
    return { audioFrames: audioIndex, videoFrames: videoIndex, failures };
  })();
  return {
    stop: () => {
      running = false;
    },
    done,
  };
};

class LiveCallRegistry {
  constructor(timeoutMs, failureSink) {
    this.timeoutMs = timeoutMs;
    this.failureSink = failureSink;
    this.joined = [];
    this.created = [];
  }

  track(call, { created = false } = {}) {
    this.joined.push(call);
    if (created) this.created.push(call);
    return call;
  }

  markCreated(call) {
    this.created.push(call);
  }

  async cleanup() {
    const failures = [];
    for (const call of this.joined.reverse()) {
      try {
        await withTimeout("call leave during cleanup", this.timeoutMs, () =>
          call.leave(),
        );
      } catch (error) {
        failures.push(errorRecord(error, `leave ${call.cid}`));
      }
    }
    for (const call of this.created.reverse()) {
      try {
        await withTimeout("call end during cleanup", this.timeoutMs, () =>
          call.end(),
        );
      } catch (error) {
        failures.push(errorRecord(error, `end ${call.cid}`));
      }
    }
    this.failureSink.push(...failures);
    return failures;
  }
}

const telemetryFor = (call) => {
  const telemetry = {
    queueOverflowEvents: 0,
    droppedEvents: 0,
    totalDroppedEvents: 0,
    emittedErrors: [],
  };
  const unsubscribeOverflow = call.on("queueOverflow", (event) => {
    telemetry.queueOverflowEvents += 1;
    telemetry.droppedEvents += event.dropped;
    telemetry.totalDroppedEvents = Math.max(
      telemetry.totalDroppedEvents,
      event.totalDropped,
    );
  });
  const unsubscribeError = call.on("error", (event) => {
    telemetry.emittedErrors.push({
      sourceEventType: event.sourceEventType ?? null,
      error: event.error
        ? {
            name: event.error.name,
            message: event.error.message,
            code: event.error.code,
            details: event.error.details,
          }
        : null,
    });
  });
  return {
    telemetry,
    unsubscribe: () => {
      unsubscribeOverflow();
      unsubscribeError();
    },
  };
};

const statsFor = async (calls, timeoutMs) => {
  const values = [];
  for (const call of calls) {
    const stats = await withTimeout(`stats ${call.cid}`, timeoutMs, () =>
      call.getStats(),
    );
    values.push({
      cid: call.cid,
      droppedRemoteTracks: stats?.droppedRemoteTracks ?? null,
      publisher: stats?.publisher ?? null,
      subscriber: stats?.subscriber ?? null,
    });
  }
  return values;
};

const firstTrack = (call, type, timeoutMs) =>
  withTimeout(`first remote ${type} track`, timeoutMs, () => {
    const current = call.state.remoteTracks.find(
      (track) => track.type === type,
    );
    if (current) return current;
    return new Promise((resolvePromise) => {
      const unsubscribe = call.on("remoteTrack", (track) => {
        if (track.type !== type) return;
        unsubscribe();
        resolvePromise(track);
      });
    });
  });

const join = (call, userId, config) =>
  withTimeout(`join ${call.cid}`, config.operationTimeoutMs, () =>
    call.join({
      userId,
      location: config.sfuLocation,
      maxJoinRetries: config.maxJoinRetries,
      joinResponseTimeoutMs: config.operationTimeoutMs,
      rpcRequestTimeoutMs: config.operationTimeoutMs,
    }),
  );

const createSingle = async (sdk, client, config, registry, prefix) => {
  const userId = uniqueId(`${prefix}-user`, config.runId);
  const callId = uniqueId(`${prefix}-call`, config.runId);
  await withTimeout("upsert benchmark user", config.operationTimeoutMs, () =>
    client.upsertUsers([{ id: userId, name: "RTC benchmark participant" }]),
  );
  const call = registry.track(client.video.call(config.callType, callId));
  await withTimeout("create benchmark call", config.operationTimeoutMs, () =>
    call.create({ data: { created_by_id: userId } }),
  );
  registry.markCreated(call);
  return { call, userId };
};

const createPair = async (sdk, client, config, registry, prefix) => {
  const senderId = uniqueId(`${prefix}-sender`, config.runId);
  const receiverId = uniqueId(`${prefix}-receiver`, config.runId);
  const callId = uniqueId(`${prefix}-call`, config.runId);
  await withTimeout("upsert benchmark users", config.operationTimeoutMs, () =>
    client.upsertUsers([
      { id: senderId, name: "RTC benchmark sender" },
      { id: receiverId, name: "RTC benchmark receiver" },
    ]),
  );
  const sender = registry.track(client.video.call(config.callType, callId));
  const receiver = registry.track(client.video.call(config.callType, callId));
  await withTimeout("create benchmark call", config.operationTimeoutMs, () =>
    sender.create({ data: { created_by_id: senderId } }),
  );
  registry.markCreated(sender);
  sender.updatePublishOptions({ preferredVideoCodec: config.videoCodec });
  receiver.updatePublishOptions({ preferredVideoCodec: config.videoCodec });
  return { sender, senderId, receiver, receiverId };
};

const lifecycleIteration = async (sdk, client, config, prefix) => {
  const registry = new LiveCallRegistry(
    config.operationTimeoutMs,
    config.cleanupFailures,
  );
  const details = {};
  try {
    const { call, userId } = await createSingle(
      sdk,
      client,
      config,
      registry,
      prefix,
    );
    const observed = telemetryFor(call);
    details.telemetry = observed.telemetry;
    details.join = await timed(() => join(call, userId, config));
    details.statsAfterJoin = await statsFor([call], config.operationTimeoutMs);
    details.leave = await timed(() =>
      withTimeout("leave", config.operationTimeoutMs, () => call.leave()),
    );
    details.rejoin = await timed(() => join(call, userId, config));
    details.statsAfterRejoin = await statsFor(
      [call],
      config.operationTimeoutMs,
    );
    details.finalLeave = await timed(() =>
      withTimeout("final leave", config.operationTimeoutMs, () => call.leave()),
    );
    observed.unsubscribe();
    return {
      metrics: {
        joinMs: details.join.durationMs,
        leaveMs: details.leave.durationMs,
        rejoinMs: details.rejoin.durationMs,
        finalLeaveMs: details.finalLeave.durationMs,
      },
      details,
    };
  } finally {
    details.cleanupFailures = await registry.cleanup();
  }
};

const decodedMediaIteration = async (
  sdk,
  client,
  config,
  prefix,
  mediaType,
) => {
  const registry = new LiveCallRegistry(
    config.operationTimeoutMs,
    config.cleanupFailures,
  );
  const details = {};
  let pump;
  try {
    const pair = await createPair(sdk, client, config, registry, prefix);
    const senderTelemetry = telemetryFor(pair.sender);
    const receiverTelemetry = telemetryFor(pair.receiver);
    details.telemetry = {
      sender: senderTelemetry.telemetry,
      receiver: receiverTelemetry.telemetry,
    };
    await join(pair.sender, pair.senderId, config);
    await join(pair.receiver, pair.receiverId, config);
    if (mediaType === "video") {
      await withTimeout("video subscription", config.operationTimeoutMs, () =>
        pair.receiver.updateSubscriptions({ audio: false, video: true }),
      );
    }

    const trackPromise = firstTrack(
      pair.receiver,
      mediaType,
      config.mediaTimeoutMs,
    );
    let localTrack;
    if (mediaType === "audio") {
      localTrack = sdk.LocalAudioTrack.opus();
      await withTimeout("publish audio", config.operationTimeoutMs, () =>
        pair.sender.publishAudio(localTrack),
      );
    } else {
      localTrack = sdk.LocalVideoTrack[config.videoCodec]({
        targetBitrateBps: config.videoBitrateBps,
      });
      await withTimeout("publish video", config.operationTimeoutMs, () =>
        pair.sender.publishVideo(localTrack),
      );
    }

    const started = performance.now();
    pump = startPacedMedia({
      audio: mediaType === "audio" ? localTrack : undefined,
      video: mediaType === "video" ? localTrack : undefined,
      maxDurationMs: config.mediaTimeoutMs,
    });
    const remote = await trackPromise;
    const first =
      mediaType === "audio"
        ? await withTimeout("first decoded PCM", config.mediaTimeoutMs, () =>
            remote.nextPcm(),
          )
        : await withTimeout("first decoded I420", config.mediaTimeoutMs, () =>
            remote.nextVideoFrame(),
          );
    if (!first?.data?.length)
      throw new Error(`empty decoded ${mediaType} frame`);
    const firstFrameMs = performance.now() - started;
    details.firstFrame = {
      bytes: first.data.length,
      width: first.width ?? null,
      height: first.height ?? null,
      sampleRate: first.sampleRate ?? null,
      channels: first.channels ?? null,
    };
    details.stats = await statsFor(
      [pair.sender, pair.receiver],
      config.operationTimeoutMs,
    );
    pump.stop();
    details.pump = await pump.done;
    senderTelemetry.unsubscribe();
    receiverTelemetry.unsubscribe();
    if (details.pump.failures.length) {
      throw new Error(`${mediaType} pump reported write failures`);
    }
    return {
      metrics: {
        firstFrameMs,
      },
      details,
    };
  } finally {
    pump?.stop();
    if (pump) details.pump ??= await pump.done;
    details.cleanupFailures = await registry.cleanup();
  }
};

const rawRtpIteration = async (sdk, client, config, prefix) => {
  const registry = new LiveCallRegistry(
    config.operationTimeoutMs,
    config.cleanupFailures,
  );
  const details = {};
  let pump;
  let forwarding = true;
  let forwardDone;
  try {
    const pair = await createPair(sdk, client, config, registry, prefix);
    const senderTelemetry = telemetryFor(pair.sender);
    const receiverTelemetry = telemetryFor(pair.receiver);
    details.telemetry = {
      sender: senderTelemetry.telemetry,
      receiver: receiverTelemetry.telemetry,
    };
    await join(pair.sender, pair.senderId, config);
    await join(pair.receiver, pair.receiverId, config);

    const source = sdk.LocalAudioTrack.opus();
    const relay = sdk.LocalAudioTrack.opus();
    await withTimeout("publish source audio", config.operationTimeoutMs, () =>
      pair.sender.publishAudio(source),
    );
    await withTimeout("publish relay audio", config.operationTimeoutMs, () =>
      pair.receiver.publishAudio(relay),
    );

    const sourceInboundPromise = firstTrack(
      pair.receiver,
      "audio",
      config.mediaTimeoutMs,
    );
    const started = performance.now();
    pump = startPacedMedia({
      audio: source,
      maxDurationMs: config.mediaTimeoutMs,
    });
    const sourceInbound = await sourceInboundPromise;
    let forwardedPackets = 0;
    const forwardingFailures = [];
    forwardDone = (async () => {
      while (forwarding) {
        const packet = await sourceInbound.readRtp();
        if (!packet) break;
        try {
          await relay.writeRtp(packet);
          forwardedPackets += 1;
        } catch (error) {
          forwardingFailures.push(errorRecord(error, "raw RTP relay write"));
          break;
        }
      }
    })();

    const relayedInbound = await firstTrack(
      pair.sender,
      "audio",
      config.mediaTimeoutMs,
    );
    const decoded = await withTimeout(
      "first decoded relayed PCM",
      config.mediaTimeoutMs,
      () => relayedInbound.nextPcm(),
    );
    if (!decoded?.data?.length)
      throw new Error("empty decoded relayed PCM frame");
    const roundTripFirstFrameMs = performance.now() - started;
    await waitFor("raw RTP forwarding sample", () => forwardedPackets >= 50, {
      timeoutMs: config.mediaTimeoutMs,
    });
    details.forwardedPackets = forwardedPackets;
    details.forwardingFailures = forwardingFailures;
    details.stats = await statsFor(
      [pair.sender, pair.receiver],
      config.operationTimeoutMs,
    );
    pump.stop();
    details.pump = await pump.done;
    senderTelemetry.unsubscribe();
    receiverTelemetry.unsubscribe();
    if (forwardingFailures.length || details.pump.failures.length) {
      throw new Error("raw RTP path reported media failures");
    }
    return {
      metrics: {
        roundTripFirstFrameMs,
        forwardedPackets,
      },
      details,
    };
  } finally {
    forwarding = false;
    pump?.stop();
    if (pump) details.pump ??= await pump.done;
    details.cleanupFailures = await registry.cleanup();
    if (forwardDone) {
      await withTimeout(
        "raw forwarding shutdown",
        config.operationTimeoutMs,
        () => forwardDone,
      );
    }
  }
};

const teardownIteration = async (sdk, client, config, prefix) => {
  const registry = new LiveCallRegistry(
    config.operationTimeoutMs,
    config.cleanupFailures,
  );
  const details = {};
  let pump;
  let unsubscribeTelemetry = () => {};
  try {
    const pair = await createPair(sdk, client, config, registry, prefix);
    const senderTelemetry = telemetryFor(pair.sender);
    const receiverTelemetry = telemetryFor(pair.receiver);
    unsubscribeTelemetry = () => {
      senderTelemetry.unsubscribe();
      receiverTelemetry.unsubscribe();
    };
    details.telemetry = {
      sender: senderTelemetry.telemetry,
      receiver: receiverTelemetry.telemetry,
    };
    await join(pair.sender, pair.senderId, config);
    await join(pair.receiver, pair.receiverId, config);
    const audio = sdk.LocalAudioTrack.opus();
    await pair.sender.publishAudio(audio);
    const inboundPromise = firstTrack(
      pair.receiver,
      "audio",
      config.mediaTimeoutMs,
    );
    pump = startPacedMedia({
      audio,
      maxDurationMs: config.mediaTimeoutMs,
    });
    const inbound = await inboundPromise;
    await withTimeout("initial decoded PCM", config.mediaTimeoutMs, () =>
      inbound.nextPcm(),
    );
    details.statsBeforeLeave = await statsFor(
      [pair.sender, pair.receiver],
      config.operationTimeoutMs,
    );
    pump.stop();
    details.pump = await pump.done;
    const pending = inbound.nextPcm();
    const leave = await timed(() =>
      withTimeout("receiver teardown", config.operationTimeoutMs, () =>
        pair.receiver.leave(),
      ),
    );
    await withTimeout(
      "pending read completion",
      config.operationTimeoutMs,
      () => pending,
    );
    const drainStarted = performance.now();
    let bufferedReads = 0;
    await withTimeout(
      "terminal read drain",
      config.operationTimeoutMs,
      async () => {
        for (;;) {
          const frame = await inbound.nextPcm();
          if (!frame) break;
          bufferedReads += 1;
          if (bufferedReads > config.maxBufferedReadsAfterLeave) {
            throw new Error("remote track did not reach terminal read state");
          }
        }
      },
    );
    details.bufferedReadsAfterLeave = bufferedReads;
    return {
      metrics: {
        leaveMs: leave.durationMs,
        terminalReadMs: performance.now() - drainStarted,
        bufferedReadsAfterLeave: bufferedReads,
      },
      details,
    };
  } finally {
    unsubscribeTelemetry();
    pump?.stop();
    if (pump) details.pump ??= await pump.done;
    details.cleanupFailures = await registry.cleanup();
  }
};

const resourceIteration = async (sdk, client, config, prefix, mediaType) => {
  const registry = new LiveCallRegistry(
    config.operationTimeoutMs,
    config.cleanupFailures,
  );
  const details = { phaseMemory: { initial: memorySnapshot() } };
  let pump;
  let draining = true;
  let drainDone;
  let monitorRunning = false;
  let unsubscribeTelemetry = () => {};
  const monitor = new ResourceMonitor(config.resourceSampleIntervalMs);
  try {
    const pair = await createPair(sdk, client, config, registry, prefix);
    const senderTelemetry = telemetryFor(pair.sender);
    const receiverTelemetry = telemetryFor(pair.receiver);
    unsubscribeTelemetry = () => {
      senderTelemetry.unsubscribe();
      receiverTelemetry.unsubscribe();
    };
    details.telemetry = {
      sender: senderTelemetry.telemetry,
      receiver: receiverTelemetry.telemetry,
    };
    details.phaseMemory.beforeJoin = memorySnapshot();
    await join(pair.sender, pair.senderId, config);
    await join(pair.receiver, pair.receiverId, config);
    details.phaseMemory.afterJoin = memorySnapshot();
    if (mediaType === "video") {
      await pair.receiver.updateSubscriptions({ audio: false, video: true });
    }
    const local =
      mediaType === "audio"
        ? sdk.LocalAudioTrack.opus()
        : sdk.LocalVideoTrack[config.videoCodec]({
            targetBitrateBps: config.videoBitrateBps,
          });
    const inboundPromise = firstTrack(
      pair.receiver,
      mediaType,
      config.mediaTimeoutMs,
    );
    if (mediaType === "audio") await pair.sender.publishAudio(local);
    else await pair.sender.publishVideo(local);
    pump = startPacedMedia({
      audio: mediaType === "audio" ? local : undefined,
      video: mediaType === "video" ? local : undefined,
      maxDurationMs: config.soakSeconds * 1_000 + config.mediaTimeoutMs,
    });
    const inbound = await inboundPromise;
    const first =
      mediaType === "audio"
        ? await inbound.nextPcm()
        : await inbound.nextVideoFrame();
    if (!first) throw new Error(`no ${mediaType} frame before resource sample`);
    let decodedFrames = 1;
    drainDone = (async () => {
      while (draining) {
        const frame =
          mediaType === "audio"
            ? await inbound.nextPcm()
            : await inbound.nextVideoFrame();
        if (!frame) break;
        decodedFrames += 1;
      }
    })();
    await monitor.start();
    monitorRunning = true;
    await sleep(config.soakSeconds * 1_000);
    details.resources = await monitor.stop();
    monitorRunning = false;
    details.decodedFrames = decodedFrames;
    details.stats = await statsFor(
      [pair.sender, pair.receiver],
      config.operationTimeoutMs,
    );
    pump.stop();
    details.pump = await pump.done;
    if (details.pump.failures.length) {
      throw new Error(`${mediaType} resource pump reported write failures`);
    }
    return {
      metrics: {
        cpuPercentOfOneCore: details.resources.cpuPercentOfOneCore,
        rssPeakBytes: details.resources.memory.rss.max,
        heapUsedPeakBytes: details.resources.memory.heapUsed.max,
        externalPeakBytes: details.resources.memory.external.max,
        eventLoopDelayP99Ms: details.resources.eventLoopDelayMs.p99,
        threadPeak: details.resources.threads.max,
        activeHandlePeak: details.resources.activeHandleCount.max,
        decodedFrames,
      },
      details,
    };
  } finally {
    draining = false;
    unsubscribeTelemetry();
    if (monitorRunning) {
      details.resources ??= await monitor.stop();
    }
    pump?.stop();
    if (pump) details.pump ??= await pump.done;
    details.cleanupFailures = await registry.cleanup();
    if (drainDone) {
      await withTimeout(
        "decoded drain shutdown",
        config.operationTimeoutMs,
        () => drainDone,
      );
    }
  }
};

const nextSignal = (signal) =>
  new Promise((resolvePromise) => {
    process.once(signal, () => resolvePromise(performance.now()));
  });

const recoveryIteration = async (sdk, client, config, prefix, cycle) => {
  const registry = new LiveCallRegistry(
    config.operationTimeoutMs,
    config.cleanupFailures,
  );
  const details = {};
  let pump;
  let draining = true;
  const drainTasks = [];
  const consumedTracks = new Set();
  let unsubscribeRemote = () => {};
  let unsubscribeState = () => {};
  let unsubscribeTelemetry = () => {};
  const cycleDir = resolve(config.recoveryControlDir, `cycle-${cycle}`);
  await mkdir(cycleDir, { recursive: true });
  try {
    const pair = await createPair(sdk, client, config, registry, prefix);
    const senderTelemetry = telemetryFor(pair.sender);
    const receiverTelemetry = telemetryFor(pair.receiver);
    unsubscribeTelemetry = () => {
      senderTelemetry.unsubscribe();
      receiverTelemetry.unsubscribe();
    };
    details.telemetry = {
      sender: senderTelemetry.telemetry,
      receiver: receiverTelemetry.telemetry,
    };
    pair.sender.setDisconnectionTimeout(config.recoveryTimeoutSeconds);
    pair.receiver.setDisconnectionTimeout(config.recoveryTimeoutSeconds);
    await join(pair.sender, pair.senderId, config);
    await join(pair.receiver, pair.receiverId, config);
    const audio = sdk.LocalAudioTrack.opus();
    await pair.sender.publishAudio(audio);
    let decodedFrames = 0;
    details.drainFailures = [];
    const consume = (track) => {
      if (track.type !== "audio" || consumedTracks.has(track)) return;
      consumedTracks.add(track);
      drainTasks.push(
        (async () => {
          try {
            while (draining) {
              const frame = await track.nextPcm();
              if (!frame) break;
              decodedFrames += 1;
            }
          } catch (error) {
            details.drainFailures.push(
              errorRecord(error, "recovery decoded audio drain"),
            );
          }
        })(),
      );
    };
    unsubscribeRemote = pair.receiver.on("remoteTrack", consume);
    const inboundPromise = firstTrack(
      pair.receiver,
      "audio",
      config.mediaTimeoutMs,
    );
    pump = startPacedMedia({
      audio,
      tolerateErrors: true,
      maxDurationMs: config.recoveryScenarioTimeoutMs,
    });
    const inbound = await inboundPromise;
    consume(inbound);
    await waitFor("pre-outage media", () => decodedFrames >= 20, {
      timeoutMs: config.mediaTimeoutMs,
    });

    let reconnectingAt;
    unsubscribeState = pair.receiver.on("callingStateChanged", (event) => {
      if (
        reconnectingAt === undefined &&
        ["reconnecting", "offline", "migrating"].includes(event.callingState)
      ) {
        reconnectingAt = performance.now();
        void writeFile(
          resolve(cycleDir, "reconnecting"),
          `${event.callingState}\n`,
        );
      }
    });
    const outageApplied = nextSignal("SIGUSR1");
    const restored = nextSignal("SIGUSR2");
    await writeFile(resolve(cycleDir, "ready.pid"), `${process.pid}\n`);
    const outageAt = await withTimeout(
      "netem outage signal",
      config.recoveryScenarioTimeoutMs,
      () => outageApplied,
    );
    await waitFor("reconnecting state", () => reconnectingAt !== undefined, {
      timeoutMs: config.recoveryScenarioTimeoutMs,
    });
    const restoredAt = await withTimeout(
      "netem restoration signal",
      config.recoveryScenarioTimeoutMs,
      () => restored,
    );
    const framesAtRestore = decodedFrames;
    await waitFor(
      "joined state after restore",
      () => pair.receiver.state.callingState === "joined",
      { timeoutMs: config.recoveryScenarioTimeoutMs },
    );
    const rejoinedAt = performance.now();
    await waitFor(
      "media after restore",
      () => decodedFrames > framesAtRestore,
      {
        timeoutMs: config.recoveryScenarioTimeoutMs,
      },
    );
    const mediaAt = performance.now();
    await writeFile(resolve(cycleDir, "complete"), "ok\n");
    if (details.drainFailures.length) {
      throw new Error("recovery media drain reported failures");
    }
    details.timeline = {
      outageObservedMs: outageAt,
      reconnectingObservedMs: reconnectingAt,
      restoredObservedMs: restoredAt,
      rejoinedObservedMs: rejoinedAt,
      mediaObservedMs: mediaAt,
      signalDetectionResolutionMs: 1,
    };
    details.stats = await statsFor(
      [pair.sender, pair.receiver],
      config.operationTimeoutMs,
    );
    return {
      metrics: {
        disconnectDetectionMs: reconnectingAt - outageAt,
        stateRecoveryMs: rejoinedAt - restoredAt,
        mediaRecoveryMs: mediaAt - restoredAt,
      },
      details,
    };
  } finally {
    draining = false;
    unsubscribeRemote();
    unsubscribeState();
    unsubscribeTelemetry();
    pump?.stop();
    if (pump) details.pump = await pump.done;
    details.cleanupFailures = await registry.cleanup();
    await withTimeout(
      "recovery drain shutdown",
      config.operationTimeoutMs,
      () => Promise.all(drainTasks),
    );
  }
};

const metricUnit = (name) => {
  if (name.endsWith("Ms")) return "ms";
  if (name.endsWith("Bytes")) return "bytes";
  if (name.toLowerCase().includes("percent")) return "percent";
  return "count";
};

const scenarioRunner = (name) => {
  if (name === "lifecycle") return lifecycleIteration;
  if (name === "decoded-audio") {
    return (sdk, client, config, prefix) =>
      decodedMediaIteration(sdk, client, config, prefix, "audio");
  }
  if (name === "decoded-video-720p30") {
    return (sdk, client, config, prefix) =>
      decodedMediaIteration(sdk, client, config, prefix, "video");
  }
  if (name === "raw-rtp-audio") return rawRtpIteration;
  if (name === "teardown") return teardownIteration;
  if (name === "resource-audio") {
    return (sdk, client, config, prefix) =>
      resourceIteration(sdk, client, config, prefix, "audio");
  }
  if (name === "resource-video-720p30") {
    return (sdk, client, config, prefix) =>
      resourceIteration(sdk, client, config, prefix, "video");
  }
  if (name === "recovery") return recoveryIteration;
  throw new Error(`unknown live scenario: ${name}`);
};

export const runLiveBenchmarks = async (config) => {
  const cleanupFailures = [];
  config.cleanupFailures = cleanupFailures;
  process.env.STREAM_NODE_RTC_NATIVE_PATH = resolve(config.nativeAddon);
  const sdk = await import(pathToFileURL(resolve(config.nodeSdk)).href);
  const client = new sdk.StreamClient(
    process.env.STREAM_API_KEY,
    process.env.STREAM_SECRET,
    { timeout: config.operationTimeoutMs },
  );
  const scenarios = [];
  const failures = [];
  let recoveryCycle = 0;

  for (const name of config.scenarios) {
    const runner = scenarioRunner(name);
    const isResource = name.startsWith("resource-");
    const isRecovery = name === "recovery";
    const warmups = isResource || isRecovery ? 0 : config.warmups;
    const repeats = isResource
      ? config.soakRepeats
      : isRecovery
        ? config.recoveryRepeats
        : config.repeats;
    const iterations = [];
    const metricSamples = {};

    for (let index = -warmups; index < repeats; index += 1) {
      const warmup = index < 0;
      const iterationPrefix = `${name}-${warmup ? `warmup-${-index}` : `run-${index + 1}`}`;
      try {
        const result = await withTimeout(
          `${name} ${iterationPrefix}`,
          isResource
            ? config.soakSeconds * 1_000 + config.mediaTimeoutMs * 2
            : isRecovery
              ? config.recoveryScenarioTimeoutMs * 2
              : config.scenarioTimeoutMs,
          () =>
            runner(
              sdk,
              client,
              config,
              iterationPrefix,
              isRecovery ? recoveryCycle++ : undefined,
            ),
        );
        const cleanupFailures = result.details.cleanupFailures ?? [];
        if (cleanupFailures.length) {
          throw new Error(
            `${name} cleanup failed: ${cleanupFailures
              .map((failure) => failure.message)
              .join("; ")}`,
          );
        }
        if (!warmup) {
          iterations.push(result);
          for (const [metric, value] of Object.entries(result.metrics)) {
            (metricSamples[metric] ??= []).push(value);
          }
        }
      } catch (error) {
        failures.push({
          scenario: name,
          iteration: warmup ? `warmup-${-index}` : index + 1,
          warmup,
          ...errorRecord(error, `${name} ${iterationPrefix}`),
        });
      }
    }

    scenarios.push({
      name,
      warmups,
      repeats,
      metrics: Object.fromEntries(
        Object.entries(metricSamples).map(([metric, samples]) => [
          metric,
          summarize(samples, metricUnit(metric)),
        ]),
      ),
      iterations,
    });
  }

  return { scenarios, failures, cleanupFailures };
};

export const LIVE_SCENARIOS = [
  "lifecycle",
  "decoded-audio",
  "decoded-video-720p30",
  "raw-rtp-audio",
  "teardown",
  "resource-audio",
  "resource-video-720p30",
  "recovery",
];

export const DEFAULT_LIVE_SCENARIOS = LIVE_SCENARIOS.filter(
  (name) => name !== "recovery",
);

export const MEDIA_CONSTANTS = {
  audioSampleRate: AUDIO_SAMPLE_RATE,
  audioFrameDurationMs: 20,
  videoWidth: VIDEO_WIDTH,
  videoHeight: VIDEO_HEIGHT,
  videoFramesPerSecond: 30,
  defaultVideoBitrateBps: DEFAULT_VIDEO_BITRATE_BPS,
};
