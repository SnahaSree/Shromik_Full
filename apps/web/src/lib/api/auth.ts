import {
  apiRequest,
} from "./client";

import type {
  ApiSuccessResponse,
  AuthResponse,
} from "@/types/auth";

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: "worker" | "contractor";
}

export interface ForgotPasswordPayload {
  identifier: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export async function login(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const response =
    await apiRequest<
      ApiSuccessResponse<AuthResponse>
    >("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

  return response.data;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response =
    await apiRequest<
      ApiSuccessResponse<AuthResponse>
    >("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

  return response.data;
}

export async function logout(
  accessToken: string,
): Promise<void> {
  await apiRequest(
    "/auth/logout",
    {
      method: "POST",
      accessToken,
    },
  );
}

export async function refreshAccessToken(): Promise<AuthResponse> {
  const response =
    await apiRequest<
      ApiSuccessResponse<AuthResponse>
    >("/auth/refresh", {
      method: "POST",
    });

  return response.data;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<void> {
  await apiRequest(
    "/auth/forgot-password",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<void> {
  await apiRequest(
    "/auth/reset-password",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}