import pino = require("pino");

export const logger = pino({
	transport:
		process.env.NODE_ENV !== "production"
			? {
					target: "pino-pretty",
					options: {
						colorize: true,
						singleLine: true,
					},
				}
			: undefined,
});
