import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const nodeConfig = {
  input: "index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.es.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.PKG_VERSION": JSON.stringify(pkg.version),
    }),
    typescript(),
  ],
};

export default nodeConfig;
