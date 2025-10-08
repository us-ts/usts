import type { UserscriptMetaHeaderConfig } from "~/schemas";

const headerStart = "// ==UserScript==" as const;
const headerEnd = "// ==/UserScript==" as const;

type HeaderKey = `${string}`;
type HeaderVal = `${string}`;
type HeaderLine = `// @${HeaderKey}` | `// @${HeaderKey} ${HeaderVal}`;

function getHeaderLine(key: string, val: string | boolean): HeaderLine {
  if (typeof val === "boolean") return `// @${key}`;
  const paddedKey = key.padEnd(16);
  return `// @${paddedKey} ${val}`;
}

function getHeaderLines(
  key: string,
  val: unknown | undefined | string | string[] | boolean
): HeaderLine[] {
  if (val === undefined) return [];
  if (Array.isArray(val)) return val.map((v) => getHeaderLine(key, v));
  if (typeof val === "string") return [getHeaderLine(key, val)];
  if (typeof val === "boolean") return [getHeaderLine(key, val)];
  throw new Error(`Unknown header value type: ${typeof val}`);
}

export function serializeMetaHeader(headerConfig: UserscriptMetaHeaderConfig): {
  serializedHeader: string;
} {
  const headerConfigEntries = Object.entries(headerConfig);
  const extraHeaderLines = headerConfigEntries.flatMap(([key, val]) =>
    getHeaderLines(key, val)
  );
  const headerLines = [headerStart, ...extraHeaderLines, headerEnd] as const;
  const serializedHeader = headerLines.join("\n");
  return { serializedHeader };
}
