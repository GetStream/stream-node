import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import {
  arch,
  cpus,
  hostname,
  loadavg,
  platform,
  release,
  type,
} from "node:os";
import { dirname, relative, resolve } from "node:path";
import { performance, monitorEventLoopDelay } from "node:perf_hooks";
import { spawn } from "node:child_process";

export const SCHEMA_VERSION = 1;
export const CANONICAL_PLATFORM = "linux";
export const CANONICAL_ARCH = "x64";
export const WARN_LOAD_PER_CPU = 0.25;
export const ABORT_LOAD_PER_CPU = 0.75;

const text = async (path) => (await readFile(path, "utf8")).trim();

const commandOutput = async (command, args, options = {}) => {
  const result = await runCommand(command, args, {
    ...options,
    timeoutMs: options.timeoutMs ?? 30_000,
  });
  return result.exitCode === 0 ? result.stdout.trim() : undefined;
};

const git = (repo, args) =>
  commandOutput("git", ["-C", repo, ...args], { timeoutMs: 30_000 });

const cpuModel = async () => {
  if (platform() === "linux") {
    const cpuinfo = await text("/proc/cpuinfo");
    const line = cpuinfo
      .split("\n")
      .find((entry) => entry.startsWith("model name"));
    if (line) return line.split(":").slice(1).join(":").trim();
  }
  return cpus()[0]?.model ?? `${type()} ${arch()}`;
};

const osDescription = async () => {
  if (platform() !== "linux") return `${type()} ${release()}`;
  const osRelease = await text("/etc/os-release");
  const prettyName = osRelease
    .split("\n")
    .find((entry) => entry.startsWith("PRETTY_NAME="))
    ?.slice("PRETTY_NAME=".length)
    .replace(/^"|"$/g, "");
  return prettyName ?? `${type()} ${release()}`;
};

const fileHash = async (path) => {
  const hash = createHash("sha256");
  hash.update(await readFile(path));
  return `sha256:${hash.digest("hex")}`;
};

const repoMetadata = async (path, expectedRef) => {
  const absolute = resolve(path);
  const [sha, branch, status, resolvedExpectedRef] = await Promise.all([
    git(absolute, ["rev-parse", "HEAD"]),
    git(absolute, ["branch", "--show-current"]),
    git(absolute, ["status", "--porcelain=v1", "--untracked-files=all"]),
    expectedRef
      ? git(absolute, ["rev-parse", `${expectedRef}^{commit}`])
      : Promise.resolve(undefined),
  ]);
  if (!sha) throw new Error(`not a readable Git repository: ${absolute}`);
  if (expectedRef && resolvedExpectedRef !== sha) {
    throw new Error(
      `${absolute} is at ${sha}, not requested ref ${expectedRef} (${resolvedExpectedRef ?? "unresolved"})`,
    );
  }
  return {
    path: absolute,
    sha,
    branch: branch || null,
    expectedRef: expectedRef ?? null,
    dirty: Boolean(status),
    changes: status ? status.split("\n") : [],
  };
};

const nativeAddonMetadata = async (path) => {
  if (!path) return null;
  const absolute = resolve(path);
  const details = await stat(absolute);
  if (!details.isFile())
    throw new Error(`native addon is not a file: ${absolute}`);
  return {
    path: absolute,
    bytes: details.size,
    hash: await fileHash(absolute),
  };
};

export const loadSnapshot = () => {
  const [load1, load5, load15] = loadavg();
  const cpuCount = cpus().length || 1;
  return {
    load1,
    load5,
    load15,
    cpuCount,
    loadPerCpu: load1 / cpuCount,
  };
};

export const assertCanonicalHost = ({ allowBusy = false } = {}) => {
  if (platform() !== CANONICAL_PLATFORM || arch() !== CANONICAL_ARCH) {
    throw new Error(
      `benchmark execution requires ${CANONICAL_PLATFORM}/${CANONICAL_ARCH}; this host is ${platform()}/${arch()}`,
    );
  }
  const load = loadSnapshot();
  if (!allowBusy && load.loadPerCpu >= ABORT_LOAD_PER_CPU) {
    throw new Error(
      `load ${load.load1.toFixed(2)} across ${load.cpuCount} CPUs (${load.loadPerCpu.toFixed(2)}/CPU) exceeds ${ABORT_LOAD_PER_CPU.toFixed(2)}/CPU`,
    );
  }
  return load;
};

export const collectMetadata = async (config) => {
  const [rustRepo, nodeRepo, rustc, cargo, cpu, operatingSystem, addon] =
    await Promise.all([
      repoMetadata(config.rustRepo, config.rustRef),
      repoMetadata(config.nodeRepo, config.nodeRef),
      commandOutput("rustc", ["-Vv"]),
      commandOutput("cargo", ["-V"]),
      cpuModel(),
      osDescription(),
      nativeAddonMetadata(config.nativeAddon),
    ]);
  const load = loadSnapshot();
  const hostFingerprint = createHash("sha256")
    .update(
      JSON.stringify({
        hostname: hostname(),
        platform: platform(),
        arch: arch(),
        release: release(),
        cpu,
        cpuCount: load.cpuCount,
      }),
    )
    .digest("hex");
  return {
    capturedAt: new Date().toISOString(),
    runId: config.runId,
    label: config.label,
    host: {
      class:
        platform() === CANONICAL_PLATFORM && arch() === CANONICAL_ARCH
          ? "linux-x86_64"
          : "non-canonical",
      fingerprint: `sha256:${hostFingerprint}`,
      platform: platform(),
      arch: arch(),
      release: release(),
      operatingSystem,
      cpu,
      cpuCount: load.cpuCount,
      load,
    },
    repositories: {
      rust: rustRepo,
      node: nodeRepo,
    },
    nativeAddon: addon,
    tools: {
      node: process.version,
      v8: process.versions.v8,
      napi: process.versions.napi ?? null,
      rustc: rustc ?? null,
      cargo: cargo ?? null,
    },
    sfu: {
      location: config.sfuLocation,
      profile: config.sfuProfile,
    },
    networkProfile: config.networkProfile,
  };
};

export const assertCleanRepositories = (metadata) => {
  const dirty = Object.entries(metadata.repositories)
    .filter(([, repository]) => repository.dirty)
    .map(([name]) => name);
  if (dirty.length) {
    throw new Error(
      `benchmark refs must be clean; dirty repositories: ${dirty.join(", ")}`,
    );
  }
};

export const assertLiveInputs = async (config) => {
  const missing = ["STREAM_API_KEY", "STREAM_SECRET"].filter(
    (name) => !process.env[name],
  );
  if (missing.length) {
    throw new Error(`missing required live credentials: ${missing.join(", ")}`);
  }
  if (!config.nativeAddon) {
    throw new Error(
      "STREAM_NODE_RTC_NATIVE_PATH or --native-addon is required for live runs",
    );
  }
  if (!config.nodeSdk) {
    throw new Error("--node-sdk must point to the candidate dist/index.es.mjs");
  }
  if (!config.sfuLocation || !config.sfuProfile) {
    throw new Error(
      "--sfu-location and --sfu-profile are required for live runs",
    );
  }
  const [addon, sdk] = await Promise.all([
    stat(resolve(config.nativeAddon)),
    stat(resolve(config.nodeSdk)),
  ]);
  if (!addon.isFile()) throw new Error("native addon path is not a file");
  if (!sdk.isFile()) throw new Error("Node SDK module path is not a file");
};

export const writeJson = async (path, payload) => {
  const serialized = `${JSON.stringify(payload, null, 2)}\n`;
  if (!path) {
    process.stdout.write(serialized);
    return;
  }
  const absolute = resolve(path);
  await mkdir(dirname(absolute), { recursive: true });
  await writeFile(absolute, serialized);
  process.stderr.write(`wrote ${absolute}\n`);
};

export const withTimeout = async (label, timeoutMs, operation) => {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
          timeoutMs,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
};

export const sleep = (milliseconds) =>
  new Promise((resolvePromise) =>
    setTimeout(resolvePromise, Math.max(0, milliseconds)),
  );

export const waitFor = async (label, predicate, { timeoutMs, pollMs = 25 }) => {
  const deadline = performance.now() + timeoutMs;
  while (performance.now() < deadline) {
    if (await predicate()) return;
    await sleep(pollMs);
  }
  throw new Error(`${label} timed out after ${timeoutMs}ms`);
};

export const uniqueId = (prefix, runId) =>
  `${prefix}-${runId.slice(0, 8)}-${randomUUID().slice(0, 12)}`;

export const percentile = (samples, fraction) => {
  if (!samples.length) return null;
  const values = [...samples].sort((left, right) => left - right);
  const position = (values.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.min(lower + 1, values.length - 1);
  const weight = position - lower;
  return values[lower] + (values[upper] - values[lower]) * weight;
};

export const summarize = (samples, unit) => {
  const values = samples.filter(Number.isFinite);
  if (!values.length) {
    return {
      unit,
      n: 0,
      samples: [],
      min: null,
      p50: null,
      p90: null,
      p95: null,
      p99: null,
      max: null,
      mean: null,
    };
  }
  return {
    unit,
    n: values.length,
    samples: values,
    min: Math.min(...values),
    p50: percentile(values, 0.5),
    p90: percentile(values, 0.9),
    p95: percentile(values, 0.95),
    p99: percentile(values, 0.99),
    max: Math.max(...values),
    mean: values.reduce((total, value) => total + value, 0) / values.length,
  };
};

const readLinuxThreads = async () => {
  if (platform() !== "linux") return null;
  const status = await text("/proc/self/status");
  const line = status.split("\n").find((entry) => entry.startsWith("Threads:"));
  return line ? Number(line.split(/\s+/)[1]) : null;
};

const activeHandles = () => {
  const getter = process._getActiveHandles;
  if (typeof getter !== "function") return null;
  const counts = {};
  for (const handle of getter.call(process)) {
    const name = handle?.constructor?.name ?? "Unknown";
    counts[name] = (counts[name] ?? 0) + 1;
  }
  return {
    count: Object.values(counts).reduce((total, value) => total + value, 0),
    byType: counts,
  };
};

export class ResourceMonitor {
  constructor(intervalMs = 1_000) {
    this.intervalMs = intervalMs;
    this.samples = [];
    this.delay = monitorEventLoopDelay({ resolution: 20 });
  }

  async start() {
    this.startedAt = performance.now();
    this.startedCpu = process.cpuUsage();
    this.delay.enable();
    await this.capture();
    this.timer = setInterval(() => void this.capture(), this.intervalMs);
  }

  async capture() {
    const memory = process.memoryUsage();
    this.samples.push({
      elapsedMs: performance.now() - this.startedAt,
      cpu: process.cpuUsage(this.startedCpu),
      memory,
      threads: await readLinuxThreads(),
      activeHandles: activeHandles(),
    });
  }

  async stop() {
    clearInterval(this.timer);
    await this.capture();
    this.delay.disable();
    const wallMs = performance.now() - this.startedAt;
    const cpu = process.cpuUsage(this.startedCpu);
    const cpuMs = (cpu.user + cpu.system) / 1_000;
    const memoryKeys = [
      "rss",
      "heapTotal",
      "heapUsed",
      "external",
      "arrayBuffers",
    ];
    const memory = Object.fromEntries(
      memoryKeys.map((key) => [
        key,
        summarize(
          this.samples.map((sample) => sample.memory[key]),
          "bytes",
        ),
      ]),
    );
    return {
      wallMs,
      cpuMs,
      cpuPercentOfOneCore: wallMs > 0 ? (cpuMs / wallMs) * 100 : null,
      memory,
      threads: summarize(
        this.samples.map((sample) => sample.threads),
        "count",
      ),
      activeHandleCount: summarize(
        this.samples.map((sample) => sample.activeHandles?.count),
        "count",
      ),
      eventLoopDelayMs: {
        min: this.delay.min / 1e6,
        p50: this.delay.percentile(50) / 1e6,
        p95: this.delay.percentile(95) / 1e6,
        p99: this.delay.percentile(99) / 1e6,
        max: this.delay.max / 1e6,
        mean: this.delay.mean / 1e6,
      },
      samples: this.samples,
    };
  }
}

export const runCommand = (
  command,
  args,
  { cwd, env, timeoutMs = 15 * 60_000 } = {},
) =>
  new Promise((resolvePromise, reject) => {
    const started = performance.now();
    let timedOut = false;
    const child = spawn(command, args, {
      cwd,
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 5_000).unref();
    }, timeoutMs);
    child.once("error", reject);
    child.once("close", (exitCode, signal) => {
      clearTimeout(timer);
      resolvePromise({
        command: [command, ...args],
        cwd: cwd ?? process.cwd(),
        exitCode,
        signal,
        timedOut,
        durationMs: performance.now() - started,
        stdout,
        stderr,
      });
    });
  });

const findFiles = async (root, name) => {
  const results = [];
  const entries = await readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) results.push(...(await findFiles(path, name)));
    else if (entry.name === name) results.push(path);
  }
  return results;
};

export const collectCriterionEstimates = async (rustRepo, startedAt) => {
  const criterionRoot = resolve(rustRepo, "target/criterion");
  let files;
  try {
    files = await findFiles(criterionRoot, "estimates.json");
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
  const estimates = [];
  for (const path of files) {
    const details = await stat(path);
    if (details.mtimeMs + 2_000 < startedAt) continue;
    estimates.push({
      path: relative(rustRepo, path),
      estimates: JSON.parse(await readFile(path, "utf8")),
    });
  }
  return estimates.sort((left, right) => left.path.localeCompare(right.path));
};
