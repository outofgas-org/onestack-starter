export function success<T>(message = "ok", data: T) {
	return {
		code: 0,
		message,
		data,
	};
}

export function error<T = null>(
	code = -1,
	message = "error",
	data: T | null = null,
) {
	return {
		code,
		message,
		data,
	};
}
