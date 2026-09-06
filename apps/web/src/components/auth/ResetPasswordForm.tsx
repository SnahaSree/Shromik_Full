"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { resetPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

const schema = z
  .object({
    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters.",
      )
      .max(128),

    confirmPassword: z.string(),
  })
  .refine(
    (values) =>
      values.password === values.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

type FormValues = z.infer<typeof schema>;

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [completed, setCompleted] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (
    values: FormValues,
  ) => {
    if (!token) {
      setServerError(
        "This password reset link is invalid or incomplete.",
      );
      return;
    }

    setServerError(null);

    try {
      await resetPassword({
        token,
        password: values.password,
      });

      setCompleted(true);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: unknown) {
      if (error instanceof ApiClientError) {
        setServerError(error.message);
      } else {
        setServerError(
          "Unable to reset your password.",
        );
      }
    }
  };

  if (completed) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Password updated
        </h2>

        <p className="text-sm text-slate-600">
          Your password has been changed. Redirecting
          you to sign in...
        </p>

        <Link
          href="/login"
          className="font-semibold text-slate-900 hover:underline"
        >
          Sign in now
        </Link>
      </div>
    );
  }

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
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          New password
        </label>

        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          placeholder="Create a new password"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Confirm new password
        </label>

        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          placeholder="Repeat your new password"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !token}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <Loader2
            size={18}
            className="animate-spin"
          />
        )}

        {isSubmitting
          ? "Updating..."
          : "Update password"}
      </button>
    </form>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense
      fallback={
        <div className="py-8 text-center text-sm text-slate-500">
          Loading reset form...
        </div>
      }
    >
      <ResetPasswordFormContent />
    </Suspense>
  );
}