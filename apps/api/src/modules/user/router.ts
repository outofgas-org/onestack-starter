import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { errorResponseSchema, versionSuccessSchema } from "../../lib/openapi";
import { success } from "../../lib/response";
import { privyAuthMiddleware } from "../../middlewares/privy-auth";
import { VERSION } from "../../version";

const userRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["User"],
	summary: "Get user module version",
	description: "Example authenticated endpoint protected by Privy.",
	security: [{ BearerAuth: [] }],
	responses: {
		200: {
			description: "Request succeeded.",
			content: {
				"application/json": {
					schema: versionSuccessSchema,
				},
			},
		},
		401: {
			description: "Missing or invalid token.",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
		403: {
			description: "Authenticated but forbidden.",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
		500: {
			description: "Privy is not configured.",
			content: {
				"application/json": {
					schema: errorResponseSchema,
				},
			},
		},
	},
});

export const userRouter = new OpenAPIHono();

userRouter.use(privyAuthMiddleware);

userRouter.openapi(userRoute, (c) => c.json(success("ok", VERSION), 200));
