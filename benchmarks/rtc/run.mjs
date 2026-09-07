#!/usr/bin/env node

import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ABORT_LOAD_PER_CPU,
  SCHEMA_VERSION,
  WARN_LOAD_PER_CPU,
  assertCanonicalHost,
  assertCleanRepositories,
  assertLiveInputs,
  collectCriterionEstimates,
  collectMetadata,
  loadSnapshot,
  runCommand,
  sleep,
  summarize,
  writeJson,
} from "./support.mjs";
import {
  DEFAULT_LIVE_SCENARIOS,
  LIVE_SCENARIOS,
  MEDIA_CONSTANTS,
  runLiveBenchmarks,
} from "./live.mjs";

const SCRIPT = fileURLToPath(import.meta.url);
const NODE_REPO = resolve(dirname(SCRIPT), "../..");
const RUST_REPO = resolve(NODE_REPO, "../stream-video-rust-release");
const COMMANDS = new Set([
  "help",
  "list",
  "metadata",
  "dry-run",
  "rust",
  "live",
  "live-worker",
]);
const OPTIONS = new Set([
  "--acknowledge-remote-host",
  "--call-type",
  "--config",
  "--cooldown-seconds",
  "--label",
  "--max-buffered-reads-after-leave",
  "--max-join-retries",
  "--media-timeout-ms",
  "--native-addon",
  "--network-profile",
  "--node-ref",
  "--node-repo",
  "--node-sdk",
  "--operation-timeout-ms",
  "--output",
  "--recovery-control-dir",
  "--recovery-repeats",
  "--recovery-scenario-timeout-ms",
  "--recovery-timeout-seconds",
  "--repeats",
  "--resource-sample-interval-ms",
  "--run-id",
  "--rust-ref",
  "--rust-repo",
  "--scenario-timeout-ms",
  "--scenarios",
  "--sfu-location",
  "--sfu-profile",
  "--soak-repeats",
  "--soak-seconds",
  "--video-bitrate-bps",
  "--video-codec",
  "--warmups",
]);

const HELP = `Server-side RTC benchmark harness

Usage:
  node benchmarks/rtc/run.mjs help
  node benchmarks/rtc/run.mjs list
  node benchmarks/rtc/run.mjs metadata [options]
  node benchmarks/rtc/run.mjs dry-run [options]
  node benchmarks/rtc/run.mjs rust --label LABEL --output FILE --acknowledge-remote-host [options]
  node benchmarks/rtc/run.mjs live --label LABEL --output FILE --acknowledge-remote-host [options]

Safe commands:
  metadata  Capture repository, addon, runtime, host, load, and SFU labels only.
  dry-run   Validate configuration and print the exact bounded execution plan.
  list      List Rust and live benchmark coverage. Makes no network calls.

Execution commands:
  rust      Run media_baseline Criterion and timer_drift on canonical Linux x86_64.
  live      Run selected real-SFU scenarios in isolated child processes.

Core options:
  --rust-repo PATH         Candidate stream-video-rust-release checkout.
  --node-repo PATH         Candidate stream-node checkout.
  --node-sdk PATH          Candidate dist/index.es.mjs.
  --native-addon PATH      Candidate release .node addon (or STREAM_NODE_RTC_NATIVE_PATH).
  --rust-ref REF           Require the Rust checkout to resolve exactly to REF.
  --node-ref REF           Require the Node checkout to resolve exactly to REF.
  --label LABEL            Stable label such as pre-hardening or post-hardening.
  --output FILE            Machine-readable JSON destination.
  --sfu-location VALUE     Join location sent to Stream and recorded in metadata.
  --sfu-profile VALUE      Human-readable SFU deployment/profile identifier.
  --network-profile VALUE  clean or an externally applied netem profile.
  --cooldown-seconds N     Idle delay between isolated components; default 15.
  --acknowledge-remote-host
                           Required for rust/live; execution still rejects non-Linux/x64.

Live options:
  --scenarios CSV          Default: ${DEFAULT_LIVE_SCENARIOS.join(",")}
  --warmups N              Default: 2.
  --repeats N              Default: 10.
  --soak-seconds N         Default: 60.
  --soak-repeats N         Default: 3; each repeat runs in a fresh process.
  --operation-timeout-ms N Default: 30000.
  --media-timeout-ms N     Default: 45000.
  --scenario-timeout-ms N  Default: 180000.
  --video-codec VALUE      vp8, vp9, or h264; default vp9.
  --video-bitrate-bps N    Default: ${MEDIA_CONSTANTS.defaultVideoBitrateBps}.
  --call-type VALUE        Default: default.
  --recovery-control-dir PATH
                           Required when selecting recovery; coordinate with netem.sh.
  --recovery-repeats N     Default: 5.

Credential gate:
  live requires STREAM_API_KEY, STREAM_SECRET, an absolute native addon path,
  and explicit --sfu-location/--sfu-profile. Safe commands never load the SDK,
  native addon, or contact Stream.
`;

const parseArguments = (argv) => {
  const command = argv[0] ?? "help";
  if (!COMMANDS.has(command)) throw new Error(`unknown command: ${command}`);
  const values = {};
  const booleans = new Set(["--acknowledge-remote-host"]);
  for (let index = 1; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!OPTIONS.has(argument)) {
      throw new Error(`unknown argument: ${argument}`);
    }
    if (booleans.has(argument)) {
      values[argument.slice(2)] = true;
      continue;
    }
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new Error(`${argument} requires a value`);
    }
    values[argument.slice(2)] = value;
    index += 1;
  }
  return { command, values };
};

const integer = (values, name, defaultValue, minimum = 0) => {
  const raw = values[name];
  if (raw === undefined) return defaultValue;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < minimum) {
    throw new Error(`--${name} must be an integer >= ${minimum}`);
  }
  return value;
};

const number = (values, name, defaultValue, minimum = 0) => {
  const raw = values[name];
  if (raw === undefined) return defaultValue;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < minimum) {
    throw new Error(`--${name} must be a finite number >= ${minimum}`);
  }
  return value;
};

const configFrom = (values) => {
  const scenarios = (values.scenarios ?? DEFAULT_LIVE_SCENARIOS.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const unknownScenarios = scenarios.filter(
    (scenario) => !LIVE_SCENARIOS.includes(scenario),
  );
  if (unknownScenarios.length) {
    throw new Error(`unknown scenarios: ${unknownScenarios.join(", ")}`);
  }
  const videoCodec = values["video-codec"] ?? "vp9";
  if (!["vp8", "vp9", "h264"].includes(videoCodec)) {
    throw new Error("--video-codec must be vp8, vp9, or h264");
  }
  return {
    runId: values["run-id"] ?? randomUUID(),
    label: values.label ?? null,
    output: values.output ? resolve(values.output) : null,
    rustRepo: resolve(values["rust-repo"] ?? RUST_REPO),
    nodeRepo: resolve(values["node-repo"] ?? NODE_REPO),
    nodeSdk: resolve(
      values["node-sdk"] ??
        resolve(values["node-repo"] ?? NODE_REPO, "dist/index.es.mjs"),
    ),
    nativeAddon:
      values["native-addon"] ?? process.env.STREAM_NODE_RTC_NATIVE_PATH ?? null,
    rustRef: values["rust-ref"] ?? null,
    nodeRef: values["node-ref"] ?? null,
    sfuLocation: values["sfu-location"] ?? null,
    sfuProfile: values["sfu-profile"] ?? null,
    networkProfile: values["network-profile"] ?? "clean",
    cooldownSeconds: number(values, "cooldown-seconds", 15),
    acknowledgedRemoteHost: Boolean(values["acknowledge-remote-host"]),
    scenarios,
    warmups: integer(values, "warmups", 2),
    repeats: integer(values, "repeats", 10, 1),
    soakSeconds: number(values, "soak-seconds", 60, 1),
    soakRepeats: integer(values, "soak-repeats", 3, 1),
    operationTimeoutMs: integer(values, "operation-timeout-ms", 30_000, 1),
    mediaTimeoutMs: integer(values, "media-timeout-ms", 45_000, 1),
    scenarioTimeoutMs: integer(values, "scenario-timeout-ms", 180_000, 1),
    resourceSampleIntervalMs: integer(
      values,
      "resource-sample-interval-ms",
      1_000,
      100,
    ),
    videoCodec,
    videoBitrateBps: integer(
      values,
      "video-bitrate-bps",
      MEDIA_CONSTANTS.defaultVideoBitrateBps,
      1,
    ),
    callType: values["call-type"] ?? "default",
    maxJoinRetries: integer(values, "max-join-retries", 3),
    maxBufferedReadsAfterLeave: integer(
      values,
      "max-buffered-reads-after-leave",
      500,
      1,
    ),
    recoveryControlDir: values["recovery-control-dir"]
      ? resolve(values["recovery-control-dir"])
      : null,
    recoveryRepeats: integer(values, "recovery-repeats", 5, 1),
    recoveryTimeoutSeconds: integer(values, "recovery-timeout-seconds", 30, 1),
    recoveryScenarioTimeoutMs: integer(
      values,
      "recovery-scenario-timeout-ms",
      120_000,
      1,
    ),
  };
};

const publicConfig = (config) => ({
  runId: config.runId,
  label: config.label,
  output: config.output,
  rustRepo: config.rustRepo,
  nodeRepo: config.nodeRepo,
  nodeSdk: config.nodeSdk,
  nativeAddon: config.nativeAddon,
  rustRef: config.rustRef,
  nodeRef: config.nodeRef,
  sfuLocation: config.sfuLocation,
  sfuProfile: config.sfuProfile,
  networkProfile: config.networkProfile,
  cooldownSeconds: config.cooldownSeconds,
  scenarios: config.scenarios,
  warmups: config.warmups,
  repeats: config.repeats,
  soakSeconds: config.soakSeconds,
  soakRepeats: config.soakRepeats,
  operationTimeoutMs: config.operationTimeoutMs,
  mediaTimeoutMs: config.mediaTimeoutMs,
  scenarioTimeoutMs: config.scenarioTimeoutMs,
  resourceSampleIntervalMs: config.resourceSampleIntervalMs,
  videoCodec: config.videoCodec,
  videoBitrateBps: config.videoBitrateBps,
  callType: config.callType,
  maxJoinRetries: config.maxJoinRetries,
  maxBufferedReadsAfterLeave: config.maxBufferedReadsAfterLeave,
  recoveryControlDir: config.recoveryControlDir,
  recoveryRepeats: config.recoveryRepeats,
  recoveryTimeoutSeconds: config.recoveryTimeoutSeconds,
  recoveryScenarioTimeoutMs: config.recoveryScenarioTimeoutMs,
  media: MEDIA_CONSTANTS,
});

const filePathStatus = async (path) => {
  if (!path) return { path: null, exists: false, file: false };
  try {
    const details = await stat(path);
    return { path, exists: true, file: details.isFile() };
  } catch (error) {
    if (error?.code === "ENOENT") return { path, exists: false, file: false };
    throw error;
  }
};

const executionGuard = (config, metadata) => {
  if (!config.acknowledgedRemoteHost) {
    throw new Error(
      "benchmark execution requires --acknowledge-remote-host after provisioning the canonical server",
    );
  }
  const load = assertCanonicalHost();
  assertCleanRepositories(metadata);
  if (!config.label)
    throw new Error("--label is required for benchmark execution");
  if (!config.output)
    throw new Error("--output is required for benchmark execution");
  if (!config.nativeAddon) {
    throw new Error(
      "--native-addon is required to hash the matching release addon",
    );
  }
  if (!config.sfuLocation || !config.sfuProfile) {
    throw new Error(
      "--sfu-location and --sfu-profile are required for the canonical run envelope",
    );
  }
  return {
    hostAccepted: true,
    idle: load.loadPerCpu < WARN_LOAD_PER_CPU,
    warning:
      load.loadPerCpu >= WARN_LOAD_PER_CPU
        ? `load per CPU is ${load.loadPerCpu.toFixed(3)}; canonical runs should remain below ${WARN_LOAD_PER_CPU}`
        : null,
    abortThreshold: ABORT_LOAD_PER_CPU,
  };
};

const runRust = async (config) => {
  const startedAt = Date.now();
  const beforeMedia = loadSnapshot();
  const env = {
    ...process.env,
    CARGO_TERM_COLOR: "never",
    RUN_STREAM_RTC_LIVE: "",
    STREAM_API_KEY: "",
    STREAM_API_SECRET: "",
    STREAM_SECRET: "",
    VPX_STATIC: "1",
  };
  const media = await runCommand(
    "cargo",
    ["bench", "--locked", "--bench", "media_baseline", "--", "--noplot"],
    {
      cwd: config.rustRepo,
      env,
      timeoutMs: 30 * 60_000,
    },
  );
  await sleep(config.cooldownSeconds * 1_000);
  const beforeTimer = loadSnapshot();
  const timer = await runCommand(
    "cargo",
    ["bench", "--locked", "--bench", "timer_drift"],
    {
      cwd: config.rustRepo,
      env,
      timeoutMs: 5 * 60_000,
    },
  );
  const timerOutput = `${timer.stdout}\n${timer.stderr}`;
  const drift = timerOutput.match(
    /p50=(\d+)us p90=(\d+)us p99=(\d+)us max=(\d+)us/,
  );
  return {
    load: {
      beforeMedia,
      beforeTimer,
    },
    commands: { media, timer },
    criterion: await collectCriterionEstimates(config.rustRepo, startedAt),
    timerDrift: drift
      ? {
          unit: "us",
          ticks: 500,
          periodMs: 20,
          p50: Number(drift[1]),
          p90: Number(drift[2]),
          p99: Number(drift[3]),
          max: Number(drift[4]),
        }
      : null,
    failures: [
      ...(media.exitCode === 0
        ? []
        : [{ component: "media_baseline", exitCode: media.exitCode }]),
      ...(timer.exitCode === 0
        ? []
        : [{ component: "timer_drift", exitCode: timer.exitCode }]),
      ...(timer.exitCode === 0 && !drift
        ? [{ component: "timer_drift", reason: "summary was not parseable" }]
        : []),
    ],
  };
};

const mergeScenarioRuns = (runs) => {
  const first = runs[0];
  const metricSamples = {};
  const iterations = [];
  const failures = [];
  const cleanupFailures = [];
  for (const run of runs) {
    failures.push(...run.failures);
    cleanupFailures.push(...(run.cleanupFailures ?? []));
    const scenario = run.scenarios[0];
    iterations.push(...scenario.iterations);
    for (const [name, summary] of Object.entries(scenario.metrics)) {
      (metricSamples[name] ??= []).push(...summary.samples);
    }
  }
  return {
    scenarios: [
      {
        ...first.scenarios[0],
        repeats: runs.length,
        iterations,
        metrics: Object.fromEntries(
          Object.entries(metricSamples).map(([name, samples]) => [
            name,
            summarize(
              samples,
              runs
                .flatMap((run) => run.scenarios)
                .map((scenario) => scenario.metrics[name]?.unit)
                .find(Boolean) ?? "count",
            ),
          ]),
        ),
      },
    ],
    failures,
    cleanupFailures,
  };
};

const runLiveWorker = async (config, scenario, output) => {
  const loadBefore = assertCanonicalHost();
  const workerConfig = {
    ...config,
    scenarios: [scenario],
    output: null,
    soakRepeats: 1,
  };
  const directory = await mkdtemp(resolve(tmpdir(), "stream-rtc-bench-"));
  const configPath = resolve(directory, "config.json");
  const outputPath = resolve(directory, "result.json");
  await writeJson(configPath, publicConfig(workerConfig));
  const result = await runCommand(
    process.execPath,
    [SCRIPT, "live-worker", "--config", configPath, "--output", outputPath],
    {
      cwd: config.nodeRepo,
      env: { ...process.env, STREAM_RTC_BENCH_WORKER: "1" },
      timeoutMs: scenario.startsWith("resource-")
        ? config.soakSeconds * 1_000 + config.mediaTimeoutMs * 3
        : scenario === "recovery"
          ? config.recoveryScenarioTimeoutMs * config.recoveryRepeats * 2
          : config.scenarioTimeoutMs * (config.warmups + config.repeats),
    },
  );
  let payload;
  try {
    payload = JSON.parse(await readFile(outputPath, "utf8"));
  } catch (error) {
    payload = {
      scenarios: [
        {
          name: scenario,
          warmups: 0,
          repeats: 0,
          metrics: {},
          iterations: [],
        },
      ],
      failures: [
        {
          scenario,
          context: "isolated worker",
          message: `worker did not produce readable JSON: ${error.message}`,
          exitCode: result.exitCode,
          stdout: result.stdout,
          stderr: result.stderr,
        },
      ],
    };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
  if (result.exitCode !== 0 || result.timedOut) {
    payload.failures.push({
      scenario,
      context: "isolated worker process",
      message: result.timedOut
        ? "worker exceeded its hard timeout"
        : `worker exited with ${result.exitCode ?? result.signal}`,
      exitCode: result.exitCode,
      signal: result.signal,
    });
  }
  output.push({
    scenario,
    loadBefore,
    exitCode: result.exitCode,
    signal: result.signal,
    timedOut: result.timedOut,
    durationMs: result.durationMs,
  });
  return payload;
};

const runLiveIsolated = async (config) => {
  const workerRuns = [];
  const scenarios = [];
  const failures = [];
  const cleanupFailures = [];
  let workerIndex = 0;
  for (const scenario of config.scenarios) {
    const count = scenario.startsWith("resource-") ? config.soakRepeats : 1;
    const runs = [];
    for (let repeat = 0; repeat < count; repeat += 1) {
      if (workerIndex > 0) {
        await sleep(config.cooldownSeconds * 1_000);
      }
      runs.push(await runLiveWorker(config, scenario, workerRuns));
      workerIndex += 1;
    }
    const merged = count === 1 ? runs[0] : mergeScenarioRuns(runs);
    scenarios.push(...merged.scenarios);
    failures.push(...merged.failures);
    cleanupFailures.push(...(merged.cleanupFailures ?? []));
  }
  return { scenarios, failures, cleanupFailures, workers: workerRuns };
};

const liveQualityIssues = (live) => {
  const issues = [
    ...live.failures.map((failure) => ({
      type: "iteration-failure",
      ...failure,
    })),
    ...live.cleanupFailures.map((failure) => ({
      type: "cleanup-failure",
      ...failure,
    })),
  ];
  for (const worker of live.workers) {
    if (worker.loadBefore.loadPerCpu >= WARN_LOAD_PER_CPU) {
      issues.push({
        type: "busy-host-before-scenario",
        scenario: worker.scenario,
        load: worker.loadBefore,
      });
    }
  }
  const inspectTelemetry = (telemetry, scenario, iteration) => {
    if (!telemetry || typeof telemetry !== "object") return;
    if ("queueOverflowEvents" in telemetry) {
      if (telemetry.queueOverflowEvents > 0) {
        issues.push({
          type: "queue-overflow",
          scenario,
          iteration,
          queueOverflowEvents: telemetry.queueOverflowEvents,
          droppedEvents: telemetry.droppedEvents,
          totalDroppedEvents: telemetry.totalDroppedEvents,
        });
      }
      for (const error of telemetry.emittedErrors ?? []) {
        issues.push({
          type: "emitted-rtc-error",
          scenario,
          iteration,
          error,
        });
      }
      return;
    }
    for (const value of Object.values(telemetry)) {
      inspectTelemetry(value, scenario, iteration);
    }
  };
  for (const scenario of live.scenarios) {
    scenario.iterations.forEach((result, index) => {
      const details = result.details;
      inspectTelemetry(details.telemetry, scenario.name, index + 1);
      const statsGroups = [
        details.stats,
        details.statsAfterJoin,
        details.statsAfterRejoin,
        details.statsBeforeLeave,
      ];
      for (const stats of statsGroups.flatMap((value) => value ?? [])) {
        if ((stats.droppedRemoteTracks ?? 0) > 0) {
          issues.push({
            type: "dropped-remote-tracks",
            scenario: scenario.name,
            iteration: index + 1,
            cid: stats.cid,
            count: stats.droppedRemoteTracks,
          });
        }
      }
      for (const [type, failures] of [
        ["media-pump-failure", details.pump?.failures],
        ["forwarding-failure", details.forwardingFailures],
        ["media-drain-failure", details.drainFailures],
      ]) {
        for (const failure of failures ?? []) {
          issues.push({
            type,
            scenario: scenario.name,
            iteration: index + 1,
            failure,
          });
        }
      }
    });
  }
  return issues;
};

const listPayload = {
  rust: {
    media_baseline:
      "Criterion resample, Opus encode/decode, RTP packetization, VP8/VP9/H264 encode/decode, and bounded multitrack load",
    timer_drift: "500 paced 20ms ticks under Opus encode load",
  },
  live: {
    scenarios: LIVE_SCENARIOS,
    defaults: DEFAULT_LIVE_SCENARIOS,
    recovery:
      "Opt-in controlled outage; requires benchmarks/rtc/netem.sh in a second terminal",
  },
  media: MEDIA_CONSTANTS,
};

const worker = async (values) => {
  if (process.env.STREAM_RTC_BENCH_WORKER !== "1") {
    throw new Error("live-worker is internal and may only be started by live");
  }
  const configPath = values.config;
  if (!configPath || !values.output) {
    throw new Error("live-worker requires --config and --output");
  }
  const config = JSON.parse(await readFile(resolve(configPath), "utf8"));
  await writeJson(resolve(values.output), await runLiveBenchmarks(config));
};

const main = async () => {
  const { command, values } = parseArguments(process.argv.slice(2));
  if (command === "help") {
    process.stdout.write(HELP);
    return 0;
  }
  if (command === "list") {
    await writeJson(null, listPayload);
    return 0;
  }
  if (command === "live-worker") {
    await worker(values);
    return 0;
  }

  const config = configFrom(values);
  const metadata = await collectMetadata(config);
  const base = {
    schemaVersion: SCHEMA_VERSION,
    kind: "stream-node-rtc-benchmark",
    command,
    metadata,
    configuration: publicConfig(config),
  };
  if (command === "metadata") {
    await writeJson(config.output, base);
    return 0;
  }
  if (command === "dry-run") {
    const [nodeSdk, nativeAddon] = await Promise.all([
      filePathStatus(config.nodeSdk),
      filePathStatus(config.nativeAddon),
    ]);
    await writeJson(config.output, {
      ...base,
      executionPlan: {
        rustCommands: [
          "cargo bench --locked --bench media_baseline -- --noplot",
          "cargo bench --locked --bench timer_drift",
        ],
        liveScenarios: config.scenarios,
        isolatedResourceSoaks: true,
        liveCredentialPresence: {
          apiKey: Boolean(process.env.STREAM_API_KEY),
          secret: Boolean(process.env.STREAM_SECRET),
          nativeAddon: Boolean(config.nativeAddon),
        },
        paths: { nodeSdk, nativeAddon },
        performsNetworkCalls: false,
        runsBenchmarks: false,
      },
    });
    return 0;
  }

  const eligibility = executionGuard(config, metadata);
  if (command === "rust") {
    const rust = await runRust(config);
    await writeJson(config.output, {
      ...base,
      eligibility,
      quality: {
        valid: rust.failures.length === 0,
        issues: rust.failures,
      },
      rust,
    });
    return rust.failures.length ? 1 : 0;
  }
  if (config.scenarios.includes("recovery") && !config.recoveryControlDir) {
    throw new Error(
      "--recovery-control-dir is required when selecting the recovery scenario",
    );
  }
  await assertLiveInputs(config);
  const live = await runLiveIsolated(config);
  const qualityIssues = liveQualityIssues(live);
  await writeJson(config.output, {
    ...base,
    eligibility,
    quality: {
      valid: qualityIssues.length === 0,
      issues: qualityIssues,
    },
    live,
  });
  return qualityIssues.length ? 1 : 0;
};

try {
  process.exitCode = await main();
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
  );
  process.exitCode = 1;
}
