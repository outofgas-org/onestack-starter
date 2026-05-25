import { API_BASE_URL } from "@/config/api";

export type ErrorType<ErrorData = unknown> = Error & {
  info?: ErrorData;
  status?: number;
};

export type BodyType<BodyData> = BodyData;

function toAbsoluteUrl(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return new URL(url, API_BASE_URL).toString();
}

export async function apiFetch<TData>(
  url: string,
  options: RequestInit = {}
): Promise<TData> {
  const response = await fetch(toAbsoluteUrl(url), options);

  if (!response.ok) {
    const error = new Error(response.statusText) as ErrorType;

    try {
      error.info = await response.json();
    } catch {
      error.info = await response.text();
    }

    error.status = response.status;
    throw error;
  }

  if ([204, 205, 304].includes(response.status)) {
    return undefined as TData;
  }

  const text = await response.text();

  if (!text) {
    return undefined as TData;
  }

  try {
    return JSON.parse(text) as TData;
  } catch {
    return text as TData;
  }
}
