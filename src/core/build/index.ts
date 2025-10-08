import { buildUserscript } from "./build.js";

import type { UserscriptConfig } from "~/schemas";

import { resolveConfig } from "../config";

/**
 * Builds your userscript.
 */
export default async function build(): Promise<void> {
  const { userscriptConfig, root } = await resolveConfig();

  const builder = new UserscriptBuilder({ userscriptConfig, root });
  await builder.run();
}

class UserscriptBuilder {
  userscriptConfig: UserscriptConfig;
  root: string;

  constructor({
    userscriptConfig,
    root,
  }: {
    userscriptConfig: UserscriptConfig;
    root: string;
  }) {
    this.userscriptConfig = userscriptConfig;
    this.root = root;
  }

  /** Run the build logic. build() is marked private because usage should go through ".run()" */
  private async build() {
    this.validateConfig();
    await buildUserscript(this.userscriptConfig);
  }

  /** Build the given Userscript. */
  async run() {
    try {
      await this.build();
    } catch (err) {
      throw err;
    }
  }

  private validateConfig() {
    const outDir = this.userscriptConfig.outDir.toString();
    const root = this.root.toString();

    // outDir gets blown away so it can't be the root.
    if (outDir === root) {
      throw new Error(
        "The outDir cannot be the root folder. Please build to a different folder."
      );
    }
  }
}
