import Cookies from "js-cookie";

/**
 * Base URL comes from an env var so it's easy to switch between
 * local / staging / production without touching the code.
 * Add NEXT_PUBLIC_API_URL=https://bookstore.eraasoft.pro/api to your .env.local
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://bookstore.eraasoft.pro/api";

/** Shape every endpoint in this API returns */
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  errors: string[];
}

export class ApiError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/** Token helpers built on top of js-cookie */
export const tokenStorage = {
  get: (): string | undefined => Cookies.get("token"),
  set: (token: string): void => {
    Cookies.set("token", token, {
      expires: 30, // days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // only send the cookie over HTTPS in production
    });
  },
  remove: (): void => {
    Cookies.remove("token");
  },
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  /** Any plain object (interface, type, etc.) -> sent as multipart/form-data */
  body?: object | FormData;
  /** Set to false for public endpoints (login, register, forget-password...) */
  auth?: boolean;
}

function buildFormData(body: object): FormData {
  const formData = new FormData();
  Object.entries(body as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, value as string | Blob);
  });
  return formData;
}

/**
 * Generic request function used by every feature's api.ts file.
 *
 * Example:
 *   const response = await apiRequest<LoginResponse>("/login", {method: "POST",auth: false,body: {email, password}});
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body, auth = true } = options;

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (auth) {
    const token = tokenStorage.get();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let requestBody: BodyInit | undefined;
  if (method !== "GET" && body) {
    requestBody = body instanceof FormData ? body : buildFormData(body);
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: requestBody,
    });
  } catch {
    throw new ApiError("Network error, please check your connection", 0);
  }

  let json: ApiResponse<T>;
  try {
    json = await res.json();
  } catch {
    throw new ApiError("Unexpected server response", res.status);
  }

  if (!res.ok || json.statusCode >= 400) {
    throw new ApiError(
      json.message || "Something went wrong",
      json.statusCode ?? res.status,
      json.errors ?? [],
    );
  }

  return json;
}
