import type {
  RequestHandler,
} from "express";

import {
  AppError,
} from "../errors/AppError.js";

import type {
  UserRole,
} from "../types/common.js";

export function authorize(
  ...allowedRoles: UserRole[]
): RequestHandler {
  return (
    req,
    _res,
    next,
  ) => {
    if (!req.user) {
      return next(
        new AppError(
          "Authentication required",
          401,
          "AUTHENTICATION_REQUIRED",
        ),
      );
    }

    if (
      !allowedRoles.includes(
        req.user.role,
      )
    ) {
      return next(
        new AppError(
          "You do not have permission to access this resource",
          403,
          "FORBIDDEN",
        ),
      );
    }

    next();
  };
}