import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

import pkg from "./package.json" assert { type: "json" };

const nodeConfig = {
  input: "index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.es.js",
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
