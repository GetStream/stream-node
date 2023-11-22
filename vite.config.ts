import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {},
  test: {
    coverage: {
      reporter: ["lcov"],
    },
    testTimeout: 15000,
    include: ["__tests__/**/*.test.ts"],
    includeSource: ["src/**/*.ts"],
    retry: 3,
  },
});
