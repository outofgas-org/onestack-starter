export const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export const OPENAPI_SPEC_URL = `${API_BASE_URL}/docs`;
