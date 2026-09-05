import type {
  ErrorRequestHandler,
} from "express";
import mongoose from "mongoose";

import { AppError } from "../errors/AppError.js";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: {
        code: error.code,
      },
    });
  }

  if (
    error instanceof mongoose.Error.ValidationError
  ) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: {
        code: "VALIDATION_ERROR",
        fields: Object.values(error.errors).map(
          (item) => ({
            field: item.path,
            message: item.message,
          }),
        ),
      },
    });
  }

  if (
    error instanceof mongoose.Error.CastError
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid resource identifier",
      error: {
        code: "INVALID_ID",
      },
    });
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    return res.status(409).json({
      success: false,
      message: "A record with this value already exists",
      error: {
        code: "DUPLICATE_RESOURCE",
      },
    });
  }

    if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Request validation failed",
      error: {
        code: "VALIDATION_ERROR",
        fields: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  console.error(
    "Unhandled application error:",
    error,
  );

  return res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
    error: {
      code: "INTERNAL_SERVER_ERROR",
    },
  });
};