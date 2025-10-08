import type { Flags } from "../types";

import _build from "~/core/build";

interface BuildOptions {
  flags: Flags;
}

export async function build({ flags }: BuildOptions) {
  flags;
  await _build();
}
