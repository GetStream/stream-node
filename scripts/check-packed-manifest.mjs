// Fails if the packed tarball's package.json declares install-time lifecycle
// scripts, which would run on every consumer's `npm install`.
// Usage: node scripts/check-packed-manifest.mjs <package.tgz>
import { execFileSync } from "node:child_process";

const [tarball] = process.argv.slice(2);
if (!tarball) {
  console.error("usage: node scripts/check-packed-manifest.mjs <package.tgz>");
  process.exit(1);
}

const manifest = JSON.parse(
  execFileSync("tar", ["-xOzf", tarball, "package/package.json"], {
    encoding: "utf8",
  }),
);
const forbidden = ["preinstall", "install", "postinstall", "prepare"];
const found = forbidden.filter((s) => manifest.scripts?.[s] !== undefined);
if (found.length > 0) {
  console.error(
    `Packed package.json declares install scripts: ${found.join(", ")}`,
  );
  process.exit(1);
}
console.log("Packed package.json declares no install scripts.");
