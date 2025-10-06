import type { Flags } from "../types";

import _build from "../../core/build";

const CONFIG_FILE_NAME = "userscript.config.ts";

interface BuildOptions {
  flags: Flags;
}

export async function build({ flags }: BuildOptions) {
  await _build();
}
