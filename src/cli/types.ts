type CLICommand = "help" | "build";

type Flags = {} & Record<any, any>;

interface Args {
  values: Flags;
  positionals: string[];
}

export type { CLICommand, Flags, Args };
