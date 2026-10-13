import { existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const DUST_SHA = "4bcaae952bd22156dc8cabf04f2795964831cbcb";
const target = "dust";

if (!existsSync(`${target}/marketing/package.json`)) {
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
  }
  execFileSync(
    "git",
    ["clone", "--depth", "1", "--filter=blob:none", "--no-checkout", "https://github.com/dust-tt/dust.git", target],
    { stdio: "inherit" }
  );
  execFileSync("git", ["-C", target, "fetch", "--depth", "1", "origin", DUST_SHA], { stdio: "inherit" });
  execFileSync("git", ["-C", target, "checkout", "--detach", DUST_SHA], { stdio: "inherit" });
}

console.log(`Dust baseline ready at ${DUST_SHA}`);
