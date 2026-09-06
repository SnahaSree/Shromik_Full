"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import {
  useForm,
} from "react-hook-form";
import { z } from "zod";

import {
  ApiClientError,
} from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthProvider";

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or phone is required."),
  password: z
    .string()
    .min(1, "Password is required."),
});

type LoginFormValues =
  z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    values: LoginFormValues,
  ) => {
    setServerError(null);

    try {
      const user = await login(values);

      if (user.role === "worker") {
        router.push("/worker/dashboard");
        return;
      }

      if (user.role === "contractor") {
        router.push("/contractor/dashboard");
        return;
      }

      router.push("/admin/dashboard");
    } catch (error: unknown) {
      if (error instanceof ApiClientError) {
        setServerError(error.message);
      } else {
        setServerError(
          "Unable to sign in. Please try again.",
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </div>
      )}

      <div>
        <label
          htmlFor="identifier"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Email or phone
        </label>

        <input
          id="identifier"
          type="text"
          autoComplete="username"
          {...register("identifier")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          placeholder="Enter your email or phone"
        />

        {errors.identifier && (
          <p className="mt-1 text-sm text-red-600">
            {errors.identifier.message}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-800"
          >
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-slate-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="current-password"
            {...register("password")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            placeholder="Enter your password"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (current) => !current,
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <Loader2
            size={18}
            className="animate-spin"
          />
        )}

        {isSubmitting
          ? "Signing in..."
          : "Sign in"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-slate-900 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}