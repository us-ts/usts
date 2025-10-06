import { parseArgs } from "node:util";
import type { Args, CLICommand, Flags } from "./types";

async function printHelp() {
  console.log("Run `usts build` to build a userscript");
}

/** Determine which command the user requested */
function resolveCommand(parsedArgs: Args): CLICommand {
  const cmd = parsedArgs.positionals[2];
  if (!cmd) {
    return "help";
  }

  const supportedCommands = new Set(["build"]);
  if (supportedCommands.has(cmd)) {
    return cmd as CLICommand;
  }

  return "help";
}

/**
 * Run the given command with the given flags.
 * NOTE: This function provides no error handling, so be sure
 * to present user-friendly error output where the fn is called.
 **/
async function runCommand(cmd: CLICommand, flags: Flags) {
  // These commands can run directly without parsing the user config.
  switch (cmd) {
    case "help": {
      await printHelp();
      return;
    }
    case "build": {
      console.log("Building userscript");
      const { build } = await import("./build");
      await build({ flags });
      return;
    }
  }

  // No command handler matched! This is unexpected.
  throw new Error(`Error running ${cmd} -- no command found.`);
}

/** The primary CLI action */
export async function cli(argv: string[]) {
  const parsedArgs = parseArgs({ args: argv, allowPositionals: true });
  const cmd = resolveCommand(parsedArgs);
  try {
    await runCommand(cmd, parsedArgs);
  } catch (err) {
    throw err;
    // const { throwAndExit } = await import("./throw-and-exit.js");
    // await throwAndExit(cmd, err);
  }
}
