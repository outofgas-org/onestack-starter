import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { loggerMiddleware } from "./middlewares/logger";
import { healthRouter } from "./modules/health/router";
import { userRouter } from "./modules/user/router";
import type { Env } from "./types";

const app = new OpenAPIHono<Env>();
const port = Number(process.env.PORT ?? 5201);

app.use("/", cors());
app.use("*", loggerMiddleware);

app.openAPIRegistry.registerComponent("securitySchemes", "BearerAuth", {
	type: "http",
	scheme: "bearer",
	bearerFormat: "JWT",
});

app.doc("/docs", {
	openapi: "3.0.0",
	info: {
		title: "Hono Starter API",
		version: "1.0.0",
		description: "Auto-generated OpenAPI spec for the Hono starter service.",
	},
});

app.get("/docs/ui", Scalar({ url: "/docs" }));

app.route("/health", healthRouter);
app.route("/user", userRouter);

Bun.serve({
	port,
	fetch: app.fetch,
});

console.info(`Started API server: http://localhost:${port}`);

export { app };
