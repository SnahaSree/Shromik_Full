import { z } from "zod";

const passwordSchema =
  z
    .string()
    .min(
      8,
      "Password must contain at least 8 characters",
    )
    .max(
      128,
      "Password is too long",
    );

export const registerSchema =
  z.object({
    body: z.object({
      email: z
        .email()
        .transform((value) =>
          value.toLowerCase(),
        ),

      password:
        passwordSchema,

      role: z.enum([
        "worker",
        "contractor",
      ]),
    }),

    query: z.object({}),

    params: z.object({}),
  });

export const loginSchema =
  z.object({
    body: z.object({
      email: z
        .email()
        .transform((value) =>
          value.toLowerCase(),
        ),

      password:
        z.string().min(1),
    }),

    query: z.object({}),

    params: z.object({}),
  });

export const refreshSchema =
  z.object({
    body: z.object({}),

    query: z.object({}),

    params: z.object({}),
  });