import type {
  Request,
  Response,
} from "express";

import {
  AuthService,
} from "../services/AuthService.js";

import {
  sendCreated,
  sendSuccess,
} from "../utils/apiResponse.js";

const authService =
  new AuthService();

const REFRESH_COOKIE =
  "shromik_refresh_token";

export async function register(
  req: Request,
  res: Response,
): Promise<void> {
  const result =
    await authService.register(
      req.body.email,
      req.body.password,
      req.body.role,
    );

  sendCreated(
    res,
    "Account created successfully",
    result,
  );
}

export async function login(
  req: Request,
  res: Response,
): Promise<void> {
  const result =
    await authService.login(
      req.body.email,
      req.body.password,
    );

  res.cookie(
    REFRESH_COOKIE,
    result.refreshToken,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
      path: "/api/v1/auth",
    },
  );

  sendSuccess(
    res,
    "Login successful",
    {
      user: result.user,
      accessToken:
        result.accessToken,
    },
  );
}

export async function logout(
  req: Request,
  res: Response,
): Promise<void> {
  if (req.user) {
    await authService.logout(
      req.user.userId,
    );
  }

  res.clearCookie(
    REFRESH_COOKIE,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/api/v1/auth",
    },
  );

  sendSuccess(
    res,
    "Logout successful",
  );
}