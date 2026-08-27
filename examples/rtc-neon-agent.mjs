/**
 * Backend media agent: receive PCM/I420, visibly and audibly transform it in
 * Node, then publish the processed tracks back into the same Stream call.
 */
import {
  LocalAudioTrack,
  LocalVideoTrack,
  StreamClient,
} from "@stream-io/node-sdk";
import { createNeonTimeSlice, createRobotVoice } from "./rtc-neon-effects.mjs";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}; see docs/server-side-rtc.md`);
  return value;
};

const apiKey = required("STREAM_API_KEY");
const apiSecret = required("STREAM_SECRET");
required("STREAM_NODE_RTC_NATIVE_PATH");

const userId = process.env.EXAMPLE_USER_ID ?? "neon-node-agent";
const callType = process.env.EXAMPLE_CALL_TYPE ?? "default";
const callId = process.env.EXAMPLE_CALL_ID ?? "support-room";
const client = new StreamClient(apiKey, apiSecret);

await client.upsertUsers([{ id: userId, name: "Neon Node Agent" }]);
const call = client.video.call(callType, callId);
await call.create({ data: { created_by_id: userId } });

const audioOutput = LocalAudioTrack.opus();
const videoOutput = LocalVideoTrack.vp9({
  targetBitrateBps: 1_200_000,
  layering: { mode: "single" },
});
const activeTypes = new Set();
const tasks = new Set();
let stopping = false;
let finish;
const finished = new Promise((resolve) => {
  finish = resolve;
});

const processTrack = async (track) => {
  if (activeTypes.has(track.type)) return;
  activeTypes.add(track.type);

  try {
    if (track.type === "audio") {
      const transform = createRobotVoice();
      console.log(`robot voice processing: ${track.userId}`);
      for (;;) {
        const frame = await track.nextPcm();
        if (!frame) break;
        const output = transform(frame);
        await audioOutput.writePcm(output.data, {
          sampleRate: output.sampleRate,
          channels: output.channels,
        });
      }
    } else if (track.type === "video") {
      const transform = createNeonTimeSlice();
      console.log(`neon time-slice processing: ${track.userId}`);
      for (;;) {
        const frame = await track.nextVideoFrame();
        if (!frame) break;
        const output = transform(frame);
        await videoOutput.writeI420(output.data, {
          width: output.width,
          height: output.height,
          durationMs: 33,
        });
      }
    }
  } catch (error) {
    if (!stopping) throw error;
  } finally {
    activeTypes.delete(track.type);
  }
};

const unsubscribe = call.on("remoteTrack", (track) => {
  if (track.type !== "audio" && track.type !== "video") return;
  const task = processTrack(track)
    .catch((error) => console.error(`processing ${track.type} failed`, error))
    .finally(() => tasks.delete(task));
  tasks.add(task);
});

call.on("callingStateChanged", ({ callingState }) => {
  console.log(`calling state: ${callingState}`);
});

const shutdown = async () => {
  if (stopping) return;
  stopping = true;
  console.log("\nleaving...");
  unsubscribe();
  await call.leave();
  await Promise.allSettled(tasks);
  finish();
};

process.once("SIGINT", () => void shutdown());
process.once("SIGTERM", () => void shutdown());

call.updatePublishOptions({ preferredVideoCodec: "vp9" });
await call.join({ userId });
await call.updateSubscriptions({ audio: true, video: true });
await call.publishAudio(audioOutput);
await call.publishVideo(videoOutput);

console.log(`joined ${callType}:${callId} as ${userId}`);
console.log(`session: ${call.state.sessionId}`);
console.log("publishing robot audio + Neon Time-Slice video — Ctrl+C to leave");

await finished;
