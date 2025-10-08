import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    "index": "src/index.ts",
    "config": "src/config/index.ts",
    "bin/cli": "src/bin/cli.ts",
  },
  exports: true,
  unbundle: true,
  dts: true,
});
