import { z } from "zod";

import type { UserscriptConfig, UserscriptHeaderConfig } from "../types";

export const UserscriptHeaderConfigSchema = z.object({
  name: z.string(),
  namespace: z.string(),

  author: z.optional(z.string()),
  version: z.string(),
  description: z.string(),
  license: z.optional(z.string()),

  match: z.union([z.string(), z.array(z.string())]),

  icon: z.optional(z.string()),

  require: z.optional(z.union([z.string(), z.array(z.string())])),
  resource: z.optional(z.union([z.string(), z.array(z.string())])),

  grant: z.optional(z.array(z.string())),

  downloadURL: z.optional(z.string()),
  updateURL: z.optional(z.string()),

  supportURL: z.optional(z.string()),
  homepageURL: z.optional(z.string()),
}) satisfies z.ZodType<UserscriptHeaderConfig>;

export const UserscriptConfigSchema = z.object({
  header: UserscriptHeaderConfigSchema,
}) satisfies z.ZodType<UserscriptConfig>;
