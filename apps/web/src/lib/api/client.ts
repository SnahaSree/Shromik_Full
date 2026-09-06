const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api/v1";

interface ApiRequestOptions
  extends RequestInit {
  accessToken?: string;
}

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(
    message: string,
    status: number,
    code?: string,
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  const contentType =
    response.headers.get("content-type");

  const isJson =
    contentType?.includes("application/json") ??
    false;

  const body = isJson
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new ApiClientError(
      body?.message ??
        "Something went wrong. Please try again.",
      response.status,
      body?.code,
    );
  }

  return body as T;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    accessToken,
    headers,
    ...requestOptions
  } = options;

  const requestHeaders = new Headers(headers);

  requestHeaders.set(
    "Content-Type",
    "application/json",
  );

  if (accessToken) {
    requestHeaders.set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
  }

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...requestOptions,
      headers: requestHeaders,
      credentials: "include",
    },
  );

  return parseResponse<T>(response);
}