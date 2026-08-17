import { builtinModules, createRequire } from "node:module";
import { defineConfig } from "vitest/config";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default defineConfig({
  define: {
    "process.env.PKG_VERSION": JSON.stringify(pkg.version),
  },
  build: {
    target: "es2022",
    // the published bundles have always been unminified
    minify: false,
    sourcemap: true,
    lib: {
      entry: "index.ts",
      formats: ["cjs", "es"],
      fileName: (format) =>
        format === "cjs" ? "index.cjs.js" : "index.es.mjs",
    },
    rollupOptions: {
      // Keep every bare import external. The previous rollup build had no
      // node-resolve plugin, so anything that was not a relative import was
      // left for the consumer to resolve.
      external: [
        /^node:/,
        ...builtinModules,
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
      output: {
        // emit require() rather than import() in the cjs bundle
        dynamicImportInCjs: false,
      },
    },
  },
  test: {
    coverage: {
      reporter: ["lcov"],
    },
    testTimeout: 60000,
    include: ["__tests__/**/*.test.ts"],
    includeSource: ["src/**/*.ts"],
    retry: 3,
  },
});
