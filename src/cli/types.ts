type CLICommand = "help" | "build";

type Flags = {} & Record<any, never>;

interface Args {
  values: Flags;
  positionals: string[];
}

export type { CLICommand, Flags, Args };
