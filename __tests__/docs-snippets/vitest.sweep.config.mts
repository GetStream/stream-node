import { defineConfig } from "vitest/config";

// `yarn test:docs:sweep`: removes docs-test leftovers from the app (see maintenance/sweep.ts).
export default defineConfig({
  test: {
    root: import.meta.dirname,
    include: ["./maintenance/sweep.ts"],
    // Only loads the env: the per-file leak / drift checks would flag the sweep's own removals.
    setupFiles: ["./env.ts"],
    // Shows console output for passing tests too.
    reporters: ["verbose"],
    testTimeout: 600000,
    hookTimeout: 180000,
  },
});
