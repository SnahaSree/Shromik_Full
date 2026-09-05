import type {
  RequestHandler,
} from "express";

import {
  AppError,
} from "../errors/AppError.js";

import {
  User,
} from "../models/User.js";

import {
  verifyAccessToken,
} from "../utils/tokens.js";

export const authenticate: RequestHandler =
  async (
    req,
    _res,
    next,
  ) => {
    try {
      const header =
        req.headers.authorization;

      if (
        !header ||
        !header.startsWith(
          "Bearer ",
        )
      ) {
        throw new AppError(
          "Authentication required",
          401,
          "AUTHENTICATION_REQUIRED",
        );
      }

      const token =
        header.substring(7);

      const payload =
        verifyAccessToken(token);

      const user =
        await User.findById(
          payload.sub,
        ).exec();

      if (!user) {
        throw new AppError(
          "User account not found",
          401,
          "USER_NOT_FOUND",
        );
      }

      if (
        user.accountStatus ===
        "suspended"
      ) {
        throw new AppError(
          "Account is suspended",
          403,
          "ACCOUNT_SUSPENDED",
        );
      }

      if (
        user.accountStatus ===
        "deactivated"
      ) {
        throw new AppError(
          "Account is deactivated",
          403,
          "ACCOUNT_DEACTIVATED",
        );
      }

      req.user = {
        userId:
          user._id.toString(),
        role: user.role,
        accountStatus:
          user.accountStatus,
      };

      next();
    } catch (error: unknown) {
      if (
        error instanceof AppError
      ) {
        next(error);
        return;
      }

      next(
        new AppError(
          "Invalid or expired access token",
          401,
          "INVALID_ACCESS_TOKEN",
        ),
      );
    }
  };