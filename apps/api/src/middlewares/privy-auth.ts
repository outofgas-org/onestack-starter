import { PrivyClient } from "@privy-io/server-auth";
import "dotenv/config";
import { createMiddleware } from "hono/factory";
import { error } from "../lib/response";
import type { Env } from "../types";

const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;

if (!PRIVY_APP_ID || !PRIVY_APP_SECRET) {
	console.error("PRIVY_APP_ID or PRIVY_APP_SECRET is not set");
}

const privy =
	PRIVY_APP_ID && PRIVY_APP_SECRET
		? new PrivyClient(PRIVY_APP_ID, PRIVY_APP_SECRET)
		: null;

export const privyAuthMiddleware = createMiddleware<Env>(async (c, next) => {
	if (!privy) return c.json(error(1000, "Privy is not configured"), 500);

	const authHeader = c.req.header("Authorization");
	let token: string | undefined;

	if (authHeader?.startsWith("Bearer ")) {
		const rawToken = authHeader.substring(7);
		if (
			rawToken !== "undefined" &&
			rawToken !== "null" &&
			rawToken.trim() !== ""
		) {
			token = rawToken;
		}
	}

	if (!token) return c.json(error(1001, "Unauthorized"), 401);

	try {
		const user = await privy.getUser({ idToken: token });
		if (!user) return c.json(error(1002, "Forbidden"), 403);
		c.set("user", user);
		await next();
	} catch {
		return c.json(error(1001, "Unauthorized"), 401);
	}
});
