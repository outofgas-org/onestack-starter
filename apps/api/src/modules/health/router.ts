import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { versionSuccessSchema } from "../../lib/openapi";
import { success } from "../../lib/response";
import type { Env } from "../../types";
import { VERSION } from "../../version";

const healthRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["Health"],
	summary: "Health check",
	description: "Returns service status and current version.",
	responses: {
		200: {
			description: "Service is healthy.",
			content: {
				"application/json": {
					schema: versionSuccessSchema,
				},
			},
		},
	},
});

export const healthRouter = new OpenAPIHono<Env>();

healthRouter.openapi(healthRoute, (c) => {
	const logger = c.get("logger");
	logger.info("Start health check");
	return c.json(success("ok", VERSION), 200);
});
