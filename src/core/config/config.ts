import fs from "node:fs";
import path from "node:path";

import { pathToFileURL } from "node:url";

import { ZodError } from "zod";

import type { UserscriptConfig } from "~/schemas";

import { validateConfig } from "./validate";

export function resolveRoot(): string {
  return process.cwd();
}

// Config paths to search for.
const configPaths = Object.freeze([
  "userscript.config.ts",
  "userscript.config.js",
  "userscript.config.mts",
  "userscript.config.mjs",
  "userscript.config.cts",
  "userscript.config.cjs",
]);

async function search(root: string) {
  const paths = configPaths.map((p) => path.join(root, p));

  for (const file of paths) {
    if (fs.existsSync(file)) {
      return file;
    }
  }
}

interface ResolveConfigPathOptions {
  root: string;
}

/**
 * Resolve the file URL of the user's `userscript.config.js|cjs|mjs|ts` file
 */
export async function resolveConfigPath(
  options: ResolveConfigPathOptions
): Promise<string | undefined> {
  let userConfigPath: string | undefined;
  userConfigPath = await search(options.root);

  return userConfigPath;
}

async function loadConfig(root: string): Promise<Record<string, any>> {
  const configPath = await resolveConfigPath({ root });
  if (!configPath) return {};

  try {
    const config = await import(
      pathToFileURL(configPath).toString() + "?t=" + Date.now()
    );
    return (config.default as unknown) ?? {};
  } catch (e) {
    console.error(`Unable to load your Userscript config\n`);
    throw e;
  }
}

interface ResolveConfigResult {
  userscriptConfig: UserscriptConfig;
  root: string;
}

/**
 * Resolves the Userscript config.
 */
export async function resolveConfig(): Promise<ResolveConfigResult> {
  const root = resolveRoot();
  const userConfig = await loadConfig(root);
  let userscriptConfig: UserscriptConfig;
  try {
    userscriptConfig = validateConfig(userConfig, root);
  } catch (e) {
    if (e instanceof ZodError) {
      console.error(e);
    }
    throw e;
  }

  return { userscriptConfig, root };
}
