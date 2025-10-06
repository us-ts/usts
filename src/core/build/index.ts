export * from "./build";

import fs from "node:fs";

import { fileURLToPath } from "node:url";

// import {
//   runHookBuildDone,
//   runHookBuildStart,
// } from "../../integrations/hooks.js";
// import type { AstroSettings, RoutesList } from "../../types/astro.js";
// import type { AstroInlineConfig } from "../../types/public/config.js";

// import { resolveConfig } from "../config/config.js";

// import { createSettings } from "../config/settings.js";

// import { AstroError, AstroErrorData } from "../errors/index.js";

// import { getServerIslandRouteData } from "../server-islands/endpoint.js";
// import { clearContentLayerCache } from "../sync/index.js";

// import { collectPagesData } from "./page-data.js";

/**
 * Builds your site for deployment. By default, this will generate static files and place them in a dist/ directory.
 * If SSR is enabled, this will generate the necessary server files to serve your site.
 *
 * @experimental The JavaScript API is experimental
 */
export default async function build(
  // inlineConfig: AstroInlineConfig
): Promise<void> {
  // const { astroConfig } = await resolveConfig(inlineConfig, "build");

  // const settings = await createSettings(
  //   astroConfig,
  //   fileURLToPath(astroConfig.root)
  // );

  // if (inlineConfig.force) {
  //   // isDev is always false, because it's interested in the build command, not the output type
  //   await clearContentLayerCache({ settings, fs, isDev: false });
  // }

  // const builder = new AstroBuilder(settings);
  // await builder.run();
}

// class AstroBuilder {
//   private settings: AstroSettings;
//   private routesList: RoutesList;

//   constructor(settings: AstroSettings) {
//     this.settings = settings;
//     this.routesList = { routes: [] };
//   }

//   /** Run the build logic. build() is marked private because usage should go through ".run()" */
//   private async build() {
//     await runHookBuildStart({
//       config: this.settings.config,
//     });
//     this.validateConfig();

//     const { assets, allPages } = collectPagesData({
//       settings: this.settings,
//       manifest: this.routesList,
//     });

//     /** The names of each pages */
//     const pageNames: string[] = [];

//     // Bundle the assets in your final build: This currently takes the HTML output
//     // of every page (stored in memory) and bundles the assets pointed to on those pages.

//     const hasServerIslands = this.settings.serverIslandNameMap.size > 0;
//     // Error if there are server islands but no adapter provided.
//     if (hasServerIslands && this.settings.buildOutput !== "server") {
//       throw new AstroError(AstroErrorData.NoAdapterInstalledServerIslands);
//     }

//     // Write any additionally generated assets to disk.
//     Object.keys(assets).map((k) => {
//       if (!assets[k]) return;
//       const filePath = new URL(`file://${k}`);
//       fs.mkdirSync(new URL("./", filePath), { recursive: true });
//       fs.writeFileSync(filePath, assets[k], "utf8");
//       delete assets[k]; //free up memory
//     });

//     // You're done! Time to clean up.
//     await runHookBuildDone({
//       settings: this.settings,
//       pages: pageNames,
//       routes: Object.values(allPages)
//         .flat()
//         .map((pageData) => pageData.route)
//         .concat(
//           hasServerIslands ? getServerIslandRouteData(this.settings.config) : []
//         ),
//     });
//   }

//   /** Build the given Astro project.  */
//   async run() {
//     try {
//       await this.build();
//     } catch (_err) {
//       throw _err;
//     } finally {
//     }
//   }

//   private validateConfig() {
//     const { config } = this.settings;

//     // outDir gets blown away so it can't be the root.
//     if (config.outDir.toString() === config.root.toString()) {
//       throw new Error(
//         `the outDir cannot be the root folder. Please build to a folder such as dist.`
//       );
//     }
//   }
// }
