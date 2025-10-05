#!/usr/bin/env node
"use strict";

// ISOMORPHIC FILE: NO TOP-LEVEL IMPORT/REQUIRE() ALLOWED
// This file has to run as both ESM and CJS on older Node.js versions

// Hardcode supported Node.js version so we don't have to read differently in CJS & ESM.

const supportedVersions = {
  node: ">=22.0.0",
  bun: ">=1.2.20",
};
// const engines = ">=22.0.0";
// const skipSemverCheckIfAbove = 22;

/** `usts *` */
async function main() {
  const versionNode = process.versions.node;
  const versionBun = process.versions.bun;
  console.log({ versionNode, versionBun });

  console.log(process.versions);
}

// /** `astro *` */
// async function main() {
//   const version = process.versions.node;

//   if ((parseInt(version) || 0) <= skipSemverCheckIfAbove) {
//     const semver = await import("semver");
//     try {
//       if (!semver.satisfies(version, engines)) {
//         await errorNodeUnsupported();
//         return;
//       }
//     } catch {
//       await errorNodeUnsupported();
//       return;
//     }
//   }

//   return import("../src/cli")
//     .then(({ cli }) => cli(process.argv))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
// }

// async function errorNodeUnsupported() {
//   console.error(`\
// Node.js v${process.versions.node} is not supported by Astro!
// Please upgrade Node.js to a supported version: "${engines}"\n`);

//   process.exit(1);
// }

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
