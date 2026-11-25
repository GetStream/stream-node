// Keeps the `postinstall` lifecycle script out of the published package.
//
// `postinstall` installs the husky git hooks for contributors (Yarn 4 does not
// run `prepare` on `yarn install`, so `postinstall` is the only hook we get).
// It must not ship to npm, though: it would run on every consumer install.
//
// `prepack` calls this with `disable` (renames it to `_postinstall`) and
// `postpack` calls it with `enable` (renames it back). Yarn re-reads
// package.json after `prepack`, so the packed manifest has no `postinstall`.
import { readFileSync, writeFileSync } from "node:fs";

const [mode] = process.argv.slice(2);
const [from, to] =
  mode === "disable"
    ? ["postinstall", "_postinstall"]
    : mode === "enable"
      ? ["_postinstall", "postinstall"]
      : [];
if (!from) {
  console.error("usage: node scripts/toggle-postinstall.mjs <disable|enable>");
  process.exit(1);
}

const file = new URL("../package.json", import.meta.url);
const raw = readFileSync(file, "utf8");
const pkg = JSON.parse(raw);
if (pkg.scripts?.[from] === undefined) process.exit(0);

// Rebuild the object so the renamed key keeps its position.
pkg.scripts = Object.fromEntries(
  Object.entries(pkg.scripts).map(([k, v]) => [k === from ? to : k, v]),
);
writeFileSync(
  file,
  JSON.stringify(pkg, null, 2) + (raw.endsWith("\n") ? "\n" : ""),
);
