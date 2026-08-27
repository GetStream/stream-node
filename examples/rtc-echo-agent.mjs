/**
 * Minimal backend RTC agent: join a call, listen to every remote audio track,
 * transform the PCM, and publish the result back into the call.
 *
 *   node examples/rtc-echo-agent.mjs
 *
 * Requires a locally built native addon (see docs/server-side-rtc.md):
 *
 *   STREAM_API_KEY=YOUR_STREAM_KEY \
 *   STREAM_SECRET=YOUR_STREAM_SECRET \
 *   STREAM_NODE_RTC_NATIVE_PATH=/abs/path/to/stream-node-rtc.node \
 *     node examples/rtc-echo-agent.mjs
 *
 * Optional overrides: EXAMPLE_USER_ID, EXAMPLE_CALL_TYPE, EXAMPLE_CALL_ID.
 * Join the same call from any Stream client to hear the agent respond.
 */
import { LocalAudioTrack, StreamClient } from "@stream-io/node-sdk";

/** Fail closed: never fall back to a placeholder credential at runtime. */
const required = (name) => {
  const value = process.env[name];
  if (!value) {
    console.error(
      `Missing ${name}. See docs/server-side-rtc.md for the full setup.`,
    );
    process.exit(1);
  }
  return value;
};

const apiKey = required("STREAM_API_KEY");
const apiSecret = required("STREAM_SECRET");
required("STREAM_NODE_RTC_NATIVE_PATH");

const userId = process.env.EXAMPLE_USER_ID ?? "support-agent";
const callType = process.env.EXAMPLE_CALL_TYPE ?? "default";
const callId = process.env.EXAMPLE_CALL_ID ?? "support-room";

/**
 * The transform. This one halves the amplitude so the effect is audible
 * without a model in the loop; swap in your own processing here.
 */
const transformPcm = (frame) => {
  const data = Buffer.alloc(frame.data.length);
  for (let i = 0; i < frame.data.length / 2; i += 1) {
    data.writeInt16LE(Math.round(frame.data.readInt16LE(i * 2) / 2), i * 2);
  }
  return { data, sampleRate: frame.sampleRate, channels: frame.channels };
};

const client = new StreamClient(apiKey, apiSecret);

await client.upsertUsers([{ id: userId, name: "Support Agent" }]);

const call = client.video.call(callType, callId);
await call.create({ data: { created_by_id: userId } });

const output = LocalAudioTrack.opus();

const unsubscribe = call.on("remoteTrack", async (track) => {
  if (track.type !== "audio") return;
  console.log(`hearing ${track.userId}`);

  // Each track gets its own read loop. nextPcm resolves with undefined when
  // the track ends or the call is left, which ends the loop.
  for (;;) {
    const frame = await track.nextPcm();
    if (!frame) break;

    const processed = transformPcm(frame);
    await output.writePcm(processed.data, {
      sampleRate: processed.sampleRate,
      channels: processed.channels,
    });
  }
  console.log(`${track.userId} stopped publishing`);
});

call.on("callingStateChanged", (event) => {
  console.log(`calling state: ${event.callingState}`);
});

const shutdown = async () => {
  console.log("\nleaving...");
  unsubscribe();
  await call.leave();
  process.exit(0);
};
process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());

await call.join({ userId });
await call.publishAudio(output);

console.log(`joined ${callType}:${callId} as ${userId}`);
console.log(`session: ${call.state.sessionId}`);
console.log("waiting for participants — Ctrl+C to leave");

// Forwarding media is what keeps this process alive; nothing else to do.
await new Promise(() => {});
