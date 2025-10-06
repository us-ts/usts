#!/usr/bin/env bun
"use strict";

const minSupportedNodeVersion = 24;

const supportedVersions = {
  node: ">=24.0.0",
  bun: ">=1.2.20",
};

/** `usts *` */
async function main() {
  const bunVersion = process.versions.bun;

  if (bunVersion) {
    try {
      const { semver } = await import("bun");
      if (!semver.satisfies(bunVersion, supportedVersions.bun)) {
        await errorUnsupportedBunVersion();
        return;
      }
    } catch {
      await errorUnsupportedBunVersion();
      return;
    }
  } else {
    const version = parseInt(process.versions.node) || 0;
    if (version < minSupportedNodeVersion) {
      await errorUnsupportedNodeVersion();
      return;
    }
  }

  return import("../cli")
    .then(({ cli }) => cli(process.argv))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

async function errorUnsupportedBunVersion() {
  console.error(`Unsupported Bun version. Please upgrade Bun.\n`);
  process.exit(1);
}
async function errorUnsupportedNodeVersion() {
  console.error(`Unsupported Node version. Please upgrade Node or use Bun.\n`);
  process.exit(1);
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
