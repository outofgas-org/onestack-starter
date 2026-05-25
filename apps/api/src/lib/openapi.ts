import { z } from "@hono/zod-openapi";

export const versionSchema = z
	.object({
		commit: z.string().openapi({ example: "d948d9e" }),
		branch: z.string().openapi({ example: "main" }),
		buildTime: z.string().openapi({ example: "2026-03-18T16:03:33Z" }),
	})
	.openapi("Version");

export const versionSuccessSchema = z
	.object({
		code: z.number().openapi({ example: 0 }),
		message: z.string().openapi({ example: "ok" }),
		data: versionSchema,
	})
	.openapi("VersionSuccessResponse");

export const errorResponseSchema = z
	.object({
		code: z.number().openapi({ example: 1001 }),
		message: z.string().openapi({ example: "Unauthorized" }),
		data: z.null(),
	})
	.openapi("ErrorResponse");
