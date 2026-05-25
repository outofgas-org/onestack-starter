import type { PrismaClient } from "@prisma/client/extension";
import type { User } from "@privy-io/server-auth";
import type { Logger } from "pino";
import "hono";

export type Env = {
	Variables: {
		prisma: PrismaClient;
		user: User;
		logger: Logger;
		requestId: string;
	};
};
