import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {},
  test: {
    coverage: {
      reporter: ["lcov"],
    },
  },
});
