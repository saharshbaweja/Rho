import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
  execFileSync("git", ["-C", target, "sparse-checkout", "init", "--cone"], { stdio: "inherit" });
  execFileSync("git", ["-C", target, "sparse-checkout", "set", "marketing"], { stdio: "inherit" });
  execFileSync("git", ["-C", target, "checkout", "--detach", DUST_SHA], { stdio: "inherit" });
}

// The pinned Dust commit adds SwarmiaLogo to marketing and to the monorepo's
// local Sparkle package in the same commit. The published @dust-tt/sparkle
// 0.7.7 package can lag that monorepo export, so keep the exact upstream SVG
// local to marketing when building the package standalone.
const iconsPath = `${target}/marketing/components/resources/resources_icons.tsx`;
let icons = readFileSync(iconsPath, "utf8");
if (icons.includes("  SwarmiaLogo,\n")) {
  icons = icons.replace("  SwarmiaLogo,\n", "");
  icons = icons.replace(
    'import type { ComponentProps, ComponentType } from "react";',
    'import type { ComponentProps, ComponentType, SVGProps } from "react";\n\nconst SwarmiaLogo = (props: SVGProps<SVGSVGElement>) => (\n  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 31" width="1em" height="1em" {...props}>\n    <path fill="#0E1829" d="M12.559 12.353C9.987 5.899 15.332-.837 22.29.085a9.4 9.4 0 0 1 3.573 1.238l-1.055 4.13c-.76-.749-1.762-1.223-2.893-1.4a5.09 5.09 0 0 0-5.548 3.15 4.93 4.93 0 0 0 .006 3.71l2.492 6.256a9.514 9.514 0 0 1-4.454 11.992c-5.645 2.951-12.868.045-14.21-6.352-1.219-5.808 3.235-11.21 9.244-11.21h.566l-1.009 3.95c-3.246 0-5.549 3.455-4.794 6.444.746 3.698 5.011 5.276 8.25 3.595a5.54 5.54 0 0 0 2.592-6.98z" />\n    <path fill="#00A388" d="M33.172 7.48h-1.948c-.406 0-.609 0-.778.07a.9.9 0 0 0-.375.29c-.11.146-.16.34-.26.73l-.87 3.405h-1.948c-.405 0-.608 0-.777.07a.9.9 0 0 0-.376.29c-.11.145-.16.34-.26.73l-.634 2.484H20.51l1.01-3.95h1.948c.405 0 .608 0 .777-.07a.9.9 0 0 0 .376-.29c.11-.146.16-.34.26-.73l.869-3.404h1.948c.406 0 .608 0 .777-.07a.9.9 0 0 0 .376-.29c.11-.146.16-.34.26-.73l1.198-4.692h4.436z" />\n  </svg>\n);'
  );
  writeFileSync(iconsPath, icons);
}

console.log(`Dust marketing baseline ready at ${DUST_SHA}`);
