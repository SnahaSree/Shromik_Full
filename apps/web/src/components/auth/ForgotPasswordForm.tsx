"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import {
  Loader2,
  MailCheck,
} from "lucide-react";
import {
  useForm,
} from "react-hook-form";
import { z } from "zod";

import {
  forgotPassword,
} from "@/lib/api/auth";

import {
  ApiClientError,
} from "@/lib/api/client";

const schema = z.object({
  identifier: z
    .string()
    .trim()
    .min(
      1,
      "Email or phone is required.",
    ),
});

type FormValues =
  z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] =
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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (
    values: FormValues,
  ) => {
    setServerError(null);

    try {
      await forgotPassword(values);
      setSubmitted(true);
    } catch (error: unknown) {
      if (error instanceof ApiClientError) {
        setServerError(error.message);
      } else {
        setServerError(
          "Unable to process your request.",
        );
      }
    }
  };

  if (submitted) {
    return (
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-900">
          <MailCheck size={26} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Check your email or phone
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            If an account matches the information
            provided, recovery instructions will be
            sent through the configured verification
            channel.
          </p>
        </div>

        <Link
          href="/login"
          className="block rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Return to sign in
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
          htmlFor="identifier"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Email or phone
        </label>

        <input
          id="identifier"
          type="text"
          {...register("identifier")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          placeholder="Enter your email or phone"
        />

        {errors.identifier && (
          <p className="mt-1 text-sm text-red-600">
            {errors.identifier.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {isSubmitting && (
          <Loader2
            size={18}
            className="animate-spin"
          />
        )}

        {isSubmitting
          ? "Processing..."
          : "Continue"}
      </button>

      <p className="text-center text-sm">
        <Link
          href="/login"
          className="font-semibold text-slate-900 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </form>
  );
}