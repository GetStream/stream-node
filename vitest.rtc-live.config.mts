import { existsSync } from "node:fs";
import { defineConfig } from "vitest/config";

const nativePath = process.env.STREAM_NODE_RTC_NATIVE_PATH;
const missing = [
  ["RUN_STREAM_RTC_LIVE=1", process.env.RUN_STREAM_RTC_LIVE === "1"],
  ["STREAM_API_KEY", Boolean(process.env.STREAM_API_KEY)],
  ["STREAM_SECRET", Boolean(process.env.STREAM_SECRET)],
  ["STREAM_NODE_RTC_NATIVE_PATH", Boolean(nativePath)],
  ["an existing native addon", Boolean(nativePath && existsSync(nativePath))],
]
  .filter(([, present]) => !present)
  .map(([name]) => name);

if (missing.length > 0) {
  throw new Error(`RTC live tests require ${missing.join(", ")}`);
}

export default defineConfig({
  test: {
    hookTimeout: 120000,
    include: [
      "__tests__/rtc/agent-scenario.test.ts",
      "__tests__/rtc/call-lifecycle.test.ts",
      "__tests__/rtc/media.test.ts",
      "__tests__/rtc/permissions.test.ts",
    ],
    retry: 0,
    testTimeout: 120000,
  },
});
