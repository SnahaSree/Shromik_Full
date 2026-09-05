import type { Response } from "express";

import type {
  ApiResponse,
  PaginationMeta,
} from "../types/api.js";

export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
  meta?: Record<string, unknown>,
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(meta !== undefined ? { meta } : {}),
  });
}

export function sendCreated<T>(
  res: Response,
  message: string,
  data: T,
): Response<ApiResponse<T>> {
  return sendSuccess(
    res,
    message,
    data,
    201,
  );
}

export function sendPaginated<T>(
  res: Response,
  message: string,
  data: T,
  pagination: PaginationMeta,
): Response<ApiResponse<T>> {
  return sendSuccess(
    res,
    message,
    data,
    200,
    {
      pagination,
    },
  );
}