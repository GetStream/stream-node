import path from "node:path";
import { defineConfig } from "vitest/config";

// Runs the docs snippet tests against a real Stream app (credentials in the repo root .env).
// Separate from the integration test config so `yarn test` never runs them.
export default defineConfig({
  resolve: {
    // Docs snippets import the package by name (`from '@stream-io/node-sdk'`): run them
    // against src, not this package's own (possibly stale) dist build. Keep in sync with
    // tsconfig `paths`.
    alias: [
      {
        find: /^@stream-io\/node-sdk$/,
        replacement: path.resolve(import.meta.dirname, "../../index.ts"),
      },
    ],
  },
  test: {
    root: import.meta.dirname,
    include: ["./pages/**/*.test.ts"],
    setupFiles: ["./setup.ts"],
    // Removes leftovers of test files that failed while loading (no hooks ran).
    globalSetup: ["./global-setup.ts"],
    // Shows console output (leak / drift warnings) for passing tests too.
    reporters: ["verbose"],
    // Generous because some app-level changes are eventually consistent: a new channel
    // type can take ~30s to become usable, and cleanup waits for background delete tasks.
    testTimeout: 90000,
    hookTimeout: 180000,
    // All files share one app: run them one at a time to stay clear of rate limits.
    fileParallelism: false,
  },
});
