# Server-side RTC performance verification

This harness compares two Rust/Node ref pairs on one idle Linux x86_64 host. It
does not define acceptable numbers and does not publish or interpret results.
Run the harness from the post-hardening `stream-node` checkout while pointing it
at separately built before/after worktrees.

Safe local validation is limited to `help`, `list`, `metadata`, and `dry-run`.
The `rust` and `live` commands require both a Linux x86_64 host and
`--acknowledge-remote-host`.

## Coverage

- Rust `media_baseline`: resampling, Opus, RTP packetization, VP8/VP9/H264
  encode/decode, 720p codec paths, and bounded multitrack load.
- Rust `timer_drift`: 500 paced 20 ms ticks under Opus encode load.
- Node/NAPI lifecycle: join, leave, same-handle rejoin, and repeated final
  teardown.
- Real-SFU media: PCM audio, 1280x720 I420 at 30 fps, decoded reads, and raw RTP
  forwarding followed by decode.
- Teardown: a pending media read, bounded buffered drain, terminal read, and
  repeated cleanup.
- Resource soaks: CPU, RSS, Node heap, external/array-buffer memory, event-loop
  delay, Linux thread count, active-handle counts, queue-overflow events,
  dropped-remote-track counters, and WebRTC stats snapshots.
- Recovery: an opt-in, externally controlled 100% packet-loss interval followed
  by restoration. It records disconnect detection, joined-state recovery, and
  resumed-media latency.

Every result includes raw samples and p50/p90/p95/p99 summaries, both repository
SHAs and dirty state, the native-addon SHA-256, Node/V8/N-API/Rust/Cargo
versions, OS/CPU/load, host fingerprint, SFU location/profile, network profile,
run configuration, subprocess outcomes, and structured failures.

## Canonical server prerequisites

Use a dedicated or otherwise idle Linux x86_64 host in the same placement for
both ref pairs. Do not compare laptop, macOS, containerized Docker Desktop, or
different-host results.

Recommended baseline:

- Ubuntu 24.04 x86_64 or an equivalent glibc Linux distribution.
- At least 8 physical/logical CPUs, 16 GiB RAM, and 20 GiB free local SSD.
- CPU frequency governor fixed consistently for both sides; no other builds,
  agents, backups, or load generators running.
- Stable wired networking. Record the exact Stream SFU location and deployment
  profile supplied for the run.
- Node 22.12 or newer, Corepack/Yarn 4, npm, Rust 1.88 plus stable, and Git.
- `build-essential`, `clang`, `cmake`, `libvpx-dev`, and `pkg-config`.
- `iproute2` only for the optional netem profiles.

Install native prerequisites:

```bash
sudo apt-get update
sudo apt-get install --yes --no-install-recommends \
  build-essential clang cmake git iproute2 libvpx-dev pkg-config
rustup toolchain install 1.88.0 --profile minimal
rustup toolchain install stable --profile minimal \
  --component clippy --component rustfmt
corepack enable
```

Before each run, verify that one-minute load divided by CPU count is below
`0.25`. The harness aborts at `0.75` and records the complete load snapshot.
Runs between those values are explicitly warned and should be discarded for a
canonical comparison.

## Create immutable before/after worktrees

Use full commit SHAs. The four refs are independent because a Node ref must use
the addon built from its matching Rust ref.

```bash
export BENCH_ROOT="$HOME/stream-rtc-benchmark"
export RUST_BEFORE="<full pre-hardening Rust SHA>"
export RUST_AFTER="<full post-hardening Rust SHA>"
export NODE_BEFORE="<full pre-hardening Node SHA>"
export NODE_AFTER="<full post-hardening Node SHA>"

mkdir -p "$BENCH_ROOT"
git clone https://github.com/GetStream/stream-video-rust.git \
  "$BENCH_ROOT/stream-video-rust-source"
git clone https://github.com/GetStream/stream-node.git \
  "$BENCH_ROOT/stream-node-source"

git -C "$BENCH_ROOT/stream-video-rust-source" worktree add \
  --detach "$BENCH_ROOT/rust-before" "$RUST_BEFORE"
git -C "$BENCH_ROOT/stream-video-rust-source" worktree add \
  --detach "$BENCH_ROOT/rust-after" "$RUST_AFTER"
git -C "$BENCH_ROOT/stream-node-source" worktree add \
  --detach "$BENCH_ROOT/node-before" "$NODE_BEFORE"
git -C "$BENCH_ROOT/stream-node-source" worktree add \
  --detach "$BENCH_ROOT/node-after" "$NODE_AFTER"

export HARNESS="$BENCH_ROOT/node-after/benchmarks/rtc"
```

Build every ref independently. `build:local` performs a release NAPI build and
fails if the addon has a dynamic `libvpx` dependency.

```bash
(cd "$BENCH_ROOT/rust-before/bindings/node" && \
  npm ci --ignore-scripts && npm run build:local && npm run smoke)
(cd "$BENCH_ROOT/rust-after/bindings/node" && \
  npm ci --ignore-scripts && npm run build:local && npm run smoke)

(cd "$BENCH_ROOT/node-before" && \
  corepack yarn install --immutable && corepack yarn build)
(cd "$BENCH_ROOT/node-after" && \
  corepack yarn install --immutable && corepack yarn build)
```

Confirm all four worktrees remain clean after generated build output is ignored:

```bash
git -C "$BENCH_ROOT/rust-before" status --short
git -C "$BENCH_ROOT/rust-after" status --short
git -C "$BENCH_ROOT/node-before" status --short
git -C "$BENCH_ROOT/node-after" status --short
```

## Safe preflight

These commands make no API or SFU calls and run no benchmarks:

```bash
node "$HARNESS/run.mjs" list
node "$HARNESS/run.mjs" dry-run \
  --label pre-hardening \
  --rust-repo "$BENCH_ROOT/rust-before" --rust-ref "$RUST_BEFORE" \
  --node-repo "$BENCH_ROOT/node-before" --node-ref "$NODE_BEFORE" \
  --node-sdk "$BENCH_ROOT/node-before/dist/index.es.mjs" \
  --native-addon \
    "$BENCH_ROOT/rust-before/bindings/node/stream-node-rtc.node" \
  --sfu-location "<exact SFU location>" \
  --sfu-profile "<exact SFU deployment/profile>" \
  --network-profile clean
```

## Before and after commands

Export credentials only in the benchmark shell. The harness checks presence but
never serializes their values.

```bash
export STREAM_API_KEY="<benchmark app key>"
export STREAM_SECRET="<benchmark app secret>"
export SFU_LOCATION="<exact SFU location>"
export SFU_PROFILE="<exact SFU deployment/profile>"
mkdir -p "$BENCH_ROOT/results"
```

Run Rust baselines:

```bash
node "$HARNESS/run.mjs" rust --acknowledge-remote-host \
  --label pre-hardening \
  --rust-repo "$BENCH_ROOT/rust-before" --rust-ref "$RUST_BEFORE" \
  --node-repo "$BENCH_ROOT/node-before" --node-ref "$NODE_BEFORE" \
  --native-addon \
    "$BENCH_ROOT/rust-before/bindings/node/stream-node-rtc.node" \
  --sfu-location "$SFU_LOCATION" --sfu-profile "$SFU_PROFILE" \
  --network-profile clean \
  --output "$BENCH_ROOT/results/rust-before.json"

node "$HARNESS/run.mjs" rust --acknowledge-remote-host \
  --label post-hardening \
  --rust-repo "$BENCH_ROOT/rust-after" --rust-ref "$RUST_AFTER" \
  --node-repo "$BENCH_ROOT/node-after" --node-ref "$NODE_AFTER" \
  --native-addon \
    "$BENCH_ROOT/rust-after/bindings/node/stream-node-rtc.node" \
  --sfu-location "$SFU_LOCATION" --sfu-profile "$SFU_PROFILE" \
  --network-profile clean \
  --output "$BENCH_ROOT/results/rust-after.json"
```

Run the clean-network real-SFU Node suite:

```bash
node "$HARNESS/run.mjs" live --acknowledge-remote-host \
  --label pre-hardening \
  --rust-repo "$BENCH_ROOT/rust-before" --rust-ref "$RUST_BEFORE" \
  --node-repo "$BENCH_ROOT/node-before" --node-ref "$NODE_BEFORE" \
  --node-sdk "$BENCH_ROOT/node-before/dist/index.es.mjs" \
  --native-addon \
    "$BENCH_ROOT/rust-before/bindings/node/stream-node-rtc.node" \
  --sfu-location "$SFU_LOCATION" --sfu-profile "$SFU_PROFILE" \
  --network-profile clean --warmups 2 --repeats 10 \
  --soak-seconds 60 --soak-repeats 3 \
  --output "$BENCH_ROOT/results/node-before.json"

node "$HARNESS/run.mjs" live --acknowledge-remote-host \
  --label post-hardening \
  --rust-repo "$BENCH_ROOT/rust-after" --rust-ref "$RUST_AFTER" \
  --node-repo "$BENCH_ROOT/node-after" --node-ref "$NODE_AFTER" \
  --node-sdk "$BENCH_ROOT/node-after/dist/index.es.mjs" \
  --native-addon \
    "$BENCH_ROOT/rust-after/bindings/node/stream-node-rtc.node" \
  --sfu-location "$SFU_LOCATION" --sfu-profile "$SFU_PROFILE" \
  --network-profile clean --warmups 2 --repeats 10 \
  --soak-seconds 60 --soak-repeats 3 \
  --output "$BENCH_ROOT/results/node-after.json"
```

Resource scenarios run in a fresh Node process for every soak repeat. Other
scenarios use one isolated process per scenario so warmups and measurements do
not contaminate unrelated resource baselines.

Validate compatibility before computing deltas:

```bash
node "$HARNESS/compare.mjs" \
  --before "$BENCH_ROOT/results/rust-before.json" \
  --after "$BENCH_ROOT/results/rust-after.json" --validate-only
node "$HARNESS/compare.mjs" \
  --before "$BENCH_ROOT/results/node-before.json" \
  --after "$BENCH_ROOT/results/node-after.json" --validate-only
```

Only after both validations succeed, produce machine-readable numeric deltas:

```bash
node "$HARNESS/compare.mjs" \
  --before "$BENCH_ROOT/results/rust-before.json" \
  --after "$BENCH_ROOT/results/rust-after.json" \
  --output "$BENCH_ROOT/results/rust-comparison.json"
node "$HARNESS/compare.mjs" \
  --before "$BENCH_ROOT/results/node-before.json" \
  --after "$BENCH_ROOT/results/node-after.json" \
  --output "$BENCH_ROOT/results/node-comparison.json"
```

The comparison output deliberately contains no regression threshold or
interpretation.

## Controlled recovery

Recovery is separate from the clean suite because it changes the host qdisc.
Use a dedicated interface with no pre-existing custom root qdisc. Run the Node
command in terminal A:

```bash
export CONTROL_DIR="$BENCH_ROOT/control/recovery-before"
mkdir -p "$CONTROL_DIR"
node "$HARNESS/run.mjs" live --acknowledge-remote-host \
  --label pre-hardening-recovery \
  --rust-repo "$BENCH_ROOT/rust-before" --rust-ref "$RUST_BEFORE" \
  --node-repo "$BENCH_ROOT/node-before" --node-ref "$NODE_BEFORE" \
  --node-sdk "$BENCH_ROOT/node-before/dist/index.es.mjs" \
  --native-addon \
    "$BENCH_ROOT/rust-before/bindings/node/stream-node-rtc.node" \
  --sfu-location "$SFU_LOCATION" --sfu-profile "$SFU_PROFILE" \
  --network-profile controlled-outage --scenarios recovery \
  --recovery-control-dir "$CONTROL_DIR" --recovery-repeats 5 \
  --output "$BENCH_ROOT/results/recovery-before.json"
```

Immediately run the controller in terminal B:

```bash
sudo "$HARNESS/netem.sh" recovery "$CONTROL_DIR" 5
```

Repeat with the post-hardening paths and a new
`$BENCH_ROOT/control/recovery-after` directory. The controller applies 100%
egress loss, waits until the SDK reports a recovery state, clears the qdisc,
signals the exact restoration point, waits for resumed media, and clears the
qdisc again on normal exit, error, `INT`, or `TERM`.

Always verify restoration:

```bash
sudo "$HARNESS/netem.sh" clear
sudo "$HARNESS/netem.sh" show
```

## Optional steady netem profiles

These are diagnostic matrices, not part of the clean canonical pair. Apply the
same profile to before and after, pass the matching label to
`--network-profile`, and restore immediately:

```bash
sudo "$HARNESS/netem.sh" apply loss-1pct
trap 'sudo "$HARNESS/netem.sh" clear' EXIT INT TERM

# Run the before and after live commands with: --network-profile loss-1pct

sudo "$HARNESS/netem.sh" clear
trap - EXIT INT TERM
```

Available profiles are `loss-1pct`, `loss-5pct`, `cap-1mbps`, and
`rtt-200ms`. Never run netem on a shared host, over the only administrative
network path, or on macOS/Docker Desktop.

## Result hygiene

`benchmarks/rtc/results/` and `benchmarks/rtc/control/` are ignored. Keep raw
JSON private until both sides pass compatibility validation and maintainers
explicitly approve interpretation/publication. A failed iteration, cleanup
failure, queue overflow, unexpected emitted RTC error, dirty ref, addon mismatch,
busy host, or profile mismatch invalidates that pair; do not silently drop it.
