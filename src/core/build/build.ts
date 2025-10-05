/// <reference types="node" />

import { rolldown } from "rolldown";

import * as path from "node:path";
import * as fs from "node:fs/promises";

import { serializeHeader } from "./header";
import type { UserscriptConfig } from "../../types";

const USERSCRIPT_OUTPUT_FILE_NAME = "index.user.js";

const log = console.log;

async function buildUserscript(config: UserscriptConfig): Promise<void> {
  const outDir = config.outDir;

  const header = serializeHeader(config.header).serializedHeader;

  const bundle = await rolldown({ input: config.entryPoint });
  const result = await bundle.generate({
    format: "esm",
    sourcemap: false,
    minify: "dce-only",
  });

  if (result.output.length !== 1) {
    throw new Error(`❌ Unexpected userscript build output`);
  }

  const bundledCode = result.output[0].code;
  const fullCode = `${header}\n${bundledCode}`;

  // -- Clean output directory --
  log("\n🧹 Cleaning output directory...");
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, USERSCRIPT_OUTPUT_FILE_NAME);
  await fs.writeFile(outFile, fullCode, "utf-8");

  console.log(`✅ Built userscript: ${outFile}`);
  log("\n🎉 Build process complete!");
}

export { buildUserscript, buildUserscript as build };
export default buildUserscript;
