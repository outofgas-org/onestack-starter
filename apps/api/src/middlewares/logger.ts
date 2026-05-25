import { createMiddleware } from "hono/factory";
import { logger } from "../lib/logger";
import type { Env } from "../types";

export const loggerMiddleware = createMiddleware<Env>(async (c, next) => {
	const start = Date.now();

	const requestId = c.req.header("x-request-id") || crypto.randomUUID();

	const child = logger.child({ requestId });

	c.set("logger", child);
	c.set("requestId", requestId);

	await next();

	const duration = Date.now() - start;

	child.info({
		msg: "request",
		requestId,
		method: c.req.method,
		path: c.req.path,
		status: c.res.status,
		duration,
	});
});
