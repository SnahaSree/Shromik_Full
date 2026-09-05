import type {
  RequestHandler,
} from "express";

import type {
  ZodType,
} from "zod";

interface ValidationInput {
  body: unknown;
  query: unknown;
  params: unknown;
}

interface ValidationOutput {
  body: unknown;
  query: unknown;
  params: unknown;
}

export function validate(
  schema: ZodType<
    ValidationOutput,
    ValidationInput
  >,
): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data.body;

    req.query =
      result.data.query as typeof req.query;

    req.params =
      result.data.params as typeof req.params;

    next();
  };
}