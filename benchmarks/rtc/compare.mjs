#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { SCHEMA_VERSION, writeJson } from "./support.mjs";

const HELP = `Validate and compare two RTC benchmark result files

Usage:
  node benchmarks/rtc/compare.mjs --before FILE --after FILE --output FILE
  node benchmarks/rtc/compare.mjs --before FILE --after FILE --validate-only

The command rejects mixed hosts, SFU profiles, network profiles, commands, media
settings, and run configurations. It emits numeric deltas only; it does not
classify, interpret, or publish results.
`;

const parseArguments = (argv) => {
  if (argv.includes("--help") || argv.includes("-h")) return { help: true };
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--validate-only") {
      values.validateOnly = true;
      continue;
    }
    if (!["--before", "--after", "--output"].includes(argument)) {
      throw new Error(`unknown argument: ${argument}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`${argument} requires a value`);
    }
    values[argument.slice(2)] = value;
    index += 1;
  }
  if (!values.before || !values.after) {
    throw new Error("--before and --after are required");
  }
  if (!values.validateOnly && !values.output) {
    throw new Error("--output is required unless --validate-only is used");
  }
  return values;
};

const loadResult = async (path) => {
  const absolute = resolve(path);
  const value = JSON.parse(await readFile(absolute, "utf8"));
  if (
    value.schemaVersion !== SCHEMA_VERSION ||
    value.kind !== "stream-node-rtc-benchmark"
  ) {
    throw new Error(
      `${absolute} is not RTC benchmark schema ${SCHEMA_VERSION}`,
    );
  }
  return { path: absolute, value };
};

const stable = (value) => JSON.stringify(value);

const compatibilityChecks = (before, after) => {
  if (before.quality?.valid !== true || after.quality?.valid !== true) {
    throw new Error("results with benchmark quality issues are not comparable");
  }
  if (before.eligibility?.idle !== true || after.eligibility?.idle !== true) {
    throw new Error("results from a non-idle host are not comparable");
  }
  const comparableConfiguration = (result) => {
    const configuration = { ...result.configuration };
    for (const key of [
      "label",
      "nativeAddon",
      "nodeRef",
      "nodeRepo",
      "nodeSdk",
      "output",
      "recoveryControlDir",
      "runId",
      "rustRef",
      "rustRepo",
    ]) {
      delete configuration[key];
    }
    return configuration;
  };
  const checks = {
    command: [before.command, after.command],
    hostFingerprint: [
      before.metadata.host.fingerprint,
      after.metadata.host.fingerprint,
    ],
    hostClass: [before.metadata.host.class, after.metadata.host.class],
    tools: [before.metadata.tools, after.metadata.tools],
    sfu: [before.metadata.sfu, after.metadata.sfu],
    networkProfile: [
      before.metadata.networkProfile,
      after.metadata.networkProfile,
    ],
    runConfiguration: [
      comparableConfiguration(before),
      comparableConfiguration(after),
    ],
  };
  const incompatible = Object.entries(checks)
    .filter(([, pair]) => stable(pair[0]) !== stable(pair[1]))
    .map(([name, pair]) => ({ name, before: pair[0], after: pair[1] }));
  if (incompatible.length) {
    throw new Error(
      `results are not comparable: ${incompatible
        .map((entry) => entry.name)
        .join(", ")}`,
    );
  }
  if (
    before.metadata.repositories.rust.dirty ||
    before.metadata.repositories.node.dirty ||
    after.metadata.repositories.rust.dirty ||
    after.metadata.repositories.node.dirty
  ) {
    throw new Error("results from dirty repositories are not comparable");
  }
  return checks;
};

const addNumericComparison = (target, name, unit, before, after) => {
  if (!Number.isFinite(before) || !Number.isFinite(after)) return;
  target[name] = {
    unit,
    before,
    after,
    difference: after - before,
    ratio: before === 0 ? null : after / before,
    percentChange: before === 0 ? null : ((after - before) / before) * 100,
  };
};

const liveMetrics = (result) => {
  const metrics = {};
  for (const scenario of result.live?.scenarios ?? []) {
    for (const [name, summary] of Object.entries(scenario.metrics)) {
      for (const statistic of [
        "mean",
        "p50",
        "p90",
        "p95",
        "p99",
        "min",
        "max",
      ]) {
        metrics[`${scenario.name}.${name}.${statistic}`] = {
          unit: summary.unit,
          value: summary[statistic],
        };
      }
    }
  }
  return metrics;
};

const rustMetrics = (result) => {
  const metrics = {};
  for (const entry of result.rust?.criterion ?? []) {
    for (const [estimate, value] of Object.entries(entry.estimates)) {
      if (!Number.isFinite(value?.point_estimate)) continue;
      metrics[`criterion.${entry.path}.${estimate}`] = {
        unit: "criterion-native",
        value: value.point_estimate,
      };
    }
  }
  for (const statistic of ["p50", "p90", "p99", "max"]) {
    const value = result.rust?.timerDrift?.[statistic];
    if (Number.isFinite(value)) {
      metrics[`timer-drift.${statistic}`] = { unit: "us", value };
    }
  }
  return metrics;
};

const compareMetrics = (before, after) => {
  const left =
    before.command === "rust" ? rustMetrics(before) : liveMetrics(before);
  const right =
    after.command === "rust" ? rustMetrics(after) : liveMetrics(after);
  const comparisons = {};
  for (const [name, leftMetric] of Object.entries(left)) {
    const rightMetric = right[name];
    if (!rightMetric || rightMetric.unit !== leftMetric.unit) continue;
    addNumericComparison(
      comparisons,
      name,
      leftMetric.unit,
      leftMetric.value,
      rightMetric.value,
    );
  }
  return comparisons;
};

const main = async () => {
  const args = parseArguments(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(HELP);
    return;
  }
  const [before, after] = await Promise.all([
    loadResult(args.before),
    loadResult(args.after),
  ]);
  const checks = compatibilityChecks(before.value, after.value);
  const validation = {
    schemaVersion: SCHEMA_VERSION,
    kind: "stream-node-rtc-benchmark-comparison",
    validatedAt: new Date().toISOString(),
    before: {
      path: before.path,
      label: before.value.metadata.label,
      rustSha: before.value.metadata.repositories.rust.sha,
      nodeSha: before.value.metadata.repositories.node.sha,
      addonHash: before.value.metadata.nativeAddon?.hash ?? null,
    },
    after: {
      path: after.path,
      label: after.value.metadata.label,
      rustSha: after.value.metadata.repositories.rust.sha,
      nodeSha: after.value.metadata.repositories.node.sha,
      addonHash: after.value.metadata.nativeAddon?.hash ?? null,
    },
    compatibility: {
      valid: true,
      checkedFields: Object.keys(checks),
    },
  };
  await writeJson(
    args.validateOnly ? null : resolve(args.output),
    args.validateOnly
      ? validation
      : {
          ...validation,
          measurements: compareMetrics(before.value, after.value),
          interpretation: null,
        },
  );
};

try {
  await main();
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
  );
  process.exitCode = 1;
}
