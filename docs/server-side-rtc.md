# Server-side RTC (branch-local preview)

This document covers the `feat/rust-rtc-bindings` prototype: a Node backend that
joins a Stream call as a real participant, receives and manipulates remote
media, and publishes media back.

**Nothing here is published.** The native addon is built locally from the
`feat/python-rtc-bindings` branch of `stream-video-rust` and loaded through an
environment variable. There is no npm dependency, no release, and no change to
either repository's `main`.

## 1. Build the Rust addon

From your `stream-video-rust` checkout, on `feat/python-rtc-bindings`:

```bash
node bindings/node/scripts/build-local.mjs
```

The script prints the absolute path of the addon it produced. Pass `--debug` for
a faster, unoptimized build while iterating.

Verify the addon in isolation before wiring it up:

```bash
node bindings/node/scripts/smoke.mjs
```

The media stack is statically linked — no system `libvpx` is required.

## 2. Point the Node SDK at it

```bash
export STREAM_NODE_RTC_NATIVE_PATH=/absolute/path/to/stream-node-rtc.node
```

The path must be absolute. The addon is loaded lazily on first RTC use, so
importing the SDK and calling REST endpoints never touches it.

Three failures are reported distinctly, so you can tell them apart:

| Error                           | Meaning                                                                   |
| ------------------------------- | ------------------------------------------------------------------------- |
| `RtcNativeUnavailableError`     | The path is unset, relative, unresolvable, or the module is not a binding |
| `RtcNativeVersionMismatchError` | The addon was built against a different binding API version — rebuild it  |
| `RtcUnsupportedPlatformError`   | This preview supports macOS and Linux only                                |

## 3. Run the tests

```bash
yarn vitest run __tests__/rtc
```

The RTC path spans JavaScript, a native addon, and Stream's SFU. Too much of it
can fail in ways a mock cannot reproduce — codec negotiation, subscription
semantics, capability enforcement — so protocol behaviour is covered by
**integration tests against a real call**, not by a mocked addon.

| Suite                    | Kind        | Covers                                                              |
| ------------------------ | ----------- | ------------------------------------------------------------------- |
| `native-loader.test.ts`  | unit        | Addon contract, version/platform gating, lazy loading, copy handoff |
| `errors.test.ts`         | unit + real | Error decoding; real-addon input validation                         |
| `lifecycle.unit.test.ts` | unit        | Join/leave ownership, teardown, stale generations, pump safety      |
| `events.unit.test.ts`    | unit        | Typed events, JSON contracts, listener isolation                    |
| `tracks.unit.test.ts`    | unit        | Permanent read modes and terminal pending reads                     |
| `media-effects.test.ts`  | unit        | PCM and I420 transforms, validation, input immutability             |
| `call-lifecycle.test.ts` | live        | Join, leave, rejoin, state, participants, events                    |
| `media.test.ts`          | live        | PCM, I420, encoded audio, raw RTP, screen share, codecs             |
| `permissions.test.ts`    | live        | Capability enforcement, grant, revoke, request                      |
| `agent-scenario.test.ts` | live        | End-to-end agent: receive, transform, republish, verify             |

The lifecycle and event pumps are isolated as internal SDK logic so races and
negative assertions can be tested deterministically. There is deliberately no
public way to inject a substitute binding into the SDK. Codec negotiation,
permissions, subscriptions, and forwarding remain in the live suites.

The live suites skip unless `RUN_STREAM_RTC_LIVE=1`, `STREAM_API_KEY`,
`STREAM_SECRET`, and `STREAM_NODE_RTC_NATIVE_PATH` are all set; put them in a
local `.env`. Credentials alone do not opt a normal test run into network calls
or RTC resource creation. Each test uses a uniquely named call and ends it
afterwards, on success and failure alike. They take a few minutes because media
has to actually flow.

No AI provider is involved in any of them.

The Rust side has its own conversion and JSON-contract tests:

```bash
cargo test -p getstream-node-rtc
```

## Runnable examples

[`examples/rtc-neon-agent.mjs`](../examples/rtc-neon-agent.mjs) is the complete
audio/video demonstration. It receives decoded PCM and I420 in Node, applies a
robot voice and a Neon Time-Slice effect, and republishes both tracks. The video
keeps a short temporal trail, separates its chroma, sweeps a neon scanline, and
burns `NODE//RTC` into every frame. The small reusable transforms live in
[`examples/rtc-neon-effects.mjs`](../examples/rtc-neon-effects.mjs).

```bash
STREAM_API_KEY=YOUR_STREAM_KEY \
STREAM_SECRET=YOUR_STREAM_SECRET \
STREAM_NODE_RTC_NATIVE_PATH=/abs/path/to/stream-node-rtc.node \
  node examples/rtc-neon-agent.mjs
```

Join the same call from any Stream client and publish camera and microphone.
The agent appears as a second participant carrying the processed tracks.
`EXAMPLE_USER_ID`, `EXAMPLE_CALL_TYPE`, and `EXAMPLE_CALL_ID` override the
defaults.

[`examples/rtc-echo-agent.mjs`](../examples/rtc-echo-agent.mjs) remains the
smallest audio-only example when visual processing is not needed.

## The happy path

```ts
import { LocalAudioTrack, StreamClient } from "@stream-io/node-sdk";

const client = new StreamClient(apiKey, apiSecret);
const agentUserId = "support-agent";

await client.upsertUsers([{ id: agentUserId, name: "Support Agent" }]);

const call = client.video.call("default", "support-room");
await call.create({ data: { created_by_id: agentUserId } });

const output = LocalAudioTrack.opus();

const unsubscribe = call.on("remoteTrack", async (track) => {
  if (track.type !== "audio") return;

  while (true) {
    const frame = await track.nextPcm();
    if (!frame) break; // the track ended, or we left the call

    const processed = transformPcm(frame);
    await output.writePcm(processed.data, {
      sampleRate: processed.sampleRate,
      channels: processed.channels,
    });
  }
});

try {
  await call.join({ userId: agentUserId });
  await call.publishAudio(output);
  await waitUntilShutdown();
} finally {
  unsubscribe();
  await call.leave();
}
```

`call.state` is a synchronous snapshot throughout: `callingState`, `sessionId`,
`participants`, `localParticipant`, `remoteParticipants`, `ownCapabilities`,
`remoteTracks`, and the participant counts. It is refreshed from the addon
_before_ each event handler runs, so state and events never disagree.

One caveat on counts: `participants` updates as soon as someone joins or
leaves, but `participantCount` and `anonymousParticipantCount` are the SFU's
own periodic totals and can trail the roster by a few seconds. Use
`participants.length` when you need an immediate answer, and the counts when
you want the SFU's view including anonymous participants.

## Media formats

| Method                         | Format                                                               |
| ------------------------------ | -------------------------------------------------------------------- |
| `writePcm` / `nextPcm`         | Interleaved little-endian `int16`, any sample rate and channel count |
| `writeI420` / `nextVideoFrame` | I420 planar (Y, then U, then V)                                      |
| `writeEncoded`                 | Codec-ready frames — Opus packets, or VP8/VP9/H264 frames            |
| `writeRtp` / `readRtp`         | Complete RTP packets with camel-case headers and `Buffer` payloads   |

Video tracks come from `LocalVideoTrack.vp8()`, `.vp9()`, or `.h264()`, each
accepting `targetBitrateBps` and a `layering` mode of `single` or
`server-managed`.

The addon copies input buffers synchronously before returning its Promise. The
TypeScript layer does not make a second copy, and callers may reuse or mutate an
input buffer as soon as a write method returns.

## Decoded vs raw reads

A remote track permanently selects one mode on its first read:

- **Decoded** — `nextPcm()` / `nextVideoFrame()` for transforming media.
- **Raw** — `readRtp()` / `drainRtp()` for forwarding without transcoding.

After the first decoded or raw read, every read in the other mode throws
`RtcIllegalStateError`, even when no read is currently pending.

Raw forwarding through `readRtp()` and `writeRtp()` preserves the encoded media
without transcoding. The live suite verifies that forwarded Opus reaches a
subscriber and decodes as non-silent PCM.

## Permissions

Publishing is gated on **`state.currentGrants`** — the SFU's own view, updated
by `callGrantsUpdated`. Attempting to publish without the grant fails with
`RtcPermissionDeniedError` (`code: 'RTC_PERMISSION_DENIED'`).

`state.ownCapabilities` comes from the coordinator and is _not_ a reliable gate:
after a revoke it can still list the capability. Check `currentGrants` when you
need to know whether publishing will be allowed:

```ts
if (call.state.currentGrants?.canPublishAudio) {
  await call.publishAudio(track);
}
```

- `requestPermissions({ permissions })` asks the call owner; other participants
  observe the request.
- `grantPermissions(userId, permissions)` / `revokePermissions(userId, permissions)`
  act on another user. A grant takes effect without rejoining; a revoke stops an
  active publication.

## Subscriptions and backpressure

The SFU forwards nothing until you subscribe. The default is audio-only.

- `updateSubscriptions({ audio, video, screenShare, videoDimension })` sets the
  policy for every participant. The SFU forwards no video unless the
  subscription carries a dimension hint, so the SDK fills in 1280x720 when you
  enable video or screen share without naming one.
- `updateSubscriptionTargets([...])` names exact participant/track pairs.
- `setIncomingVideoEnabled(false)` stops incoming video globally.
- `setPreferredIncomingVideoResolution(resolution, sessionIds?)` sets a
  resolution hint globally or per participant.

Native queues are bounded. When a media producer outruns a write queue you get
`RtcQueueOverflowError` (`code: 'RTC_QUEUE_OVERFLOW'`). Event-reader lag is
reported as a typed `queueOverflow` event with `queue: 'events'`, `dropped`, and
`totalDropped`. Inbound remote-track queue drops do not synthesize an event;
their cumulative count is available as `getStats().droppedRemoteTracks`.
Consume events and tracks in loops that do not block on unrelated work.

## Codecs

The SFU decides which video codecs it advertises for a call. Publishing a codec
it did not advertise fails with `RTC_MEDIA` and an error naming the codecs that
are available. Call `updatePublishOptions({ preferredVideoCodec })` _before_
`join()` to pin the negotiation, and construct the matching local track:

```ts
call.updatePublishOptions({ preferredVideoCodec: "vp9" });
await call.join({ userId: agentUserId });
await call.publishVideo(LocalVideoTrack.vp9({ targetBitrateBps: 600_000 }));
```

## Pacing your writes

`writePcm` and `writeI420` return as soon as the frame is queued, not when it is
sent. A loop that writes without waiting will outrun the bounded queue and throw
`RtcQueueOverflowError`. Pace the producer to wall-clock time:

```ts
const started = Date.now();
let index = 0;
while (running) {
  await track.writePcm(nextFrame(), { sampleRate: 48_000, channels: 1 });
  index += 1;
  const wait = started + index * 20 - Date.now(); // 20ms frames
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
}
```

Media you are forwarding from a remote track is already paced by its source, so
a read-transform-write loop needs no extra delay.

## Shutting down cleanly

`leave()` succeeds from any state, including mid-join and mid-reconnect. It
invalidates the JavaScript generation immediately, cancels native work, and
waits for teardown exactly once across concurrent callers. A pending track read
may receive media that was already buffered; subsequent reads end with
`undefined`, so a `while (await track.nextPcm())` loop exits on its own. Always
unsubscribe handlers and `await call.leave()` in a `finally` block.

Rejoining the same `StreamCall` is supported. Each join is tagged with a
generation, so events from a previous join can never mutate the rejoined call.

## Known limits of this preview

- macOS and Linux only; no Windows, and no Bun for the RTC path.
- The addon is loaded from `STREAM_NODE_RTC_NATIVE_PATH`; there is no published
  `@stream-io/node-rtc` package.
- Promotion to published packages requires a separate plan and approval.
