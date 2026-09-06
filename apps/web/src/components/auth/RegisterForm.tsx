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

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name is too long."),

    email: z
      .string()
      .trim()
      .email("Enter a valid email.")
      .optional()
      .or(z.literal("")),

    phone: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    role: z.enum([
      "worker",
      "contractor",
    ]),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters.",
      )
      .max(
        128,
        "Password is too long.",
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (values) =>
      values.password ===
      values.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

type RegisterFormValues =
  z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } =
    useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "worker",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (
    values: RegisterFormValues,
  ) => {
    setServerError(null);

    try {
      const user =
        await registerUser({
          name: values.name,
          email:
            values.email || undefined,
          phone:
            values.phone || undefined,
          password: values.password,
          role: values.role,
        });

      if (user.role === "worker") {
        router.push("/worker/dashboard");
        return;
      }

      router.push("/contractor/dashboard");
    } catch (error: unknown) {
      if (error instanceof ApiClientError) {
        setServerError(error.message);
      } else {
        setServerError(
          "Unable to create your account.",
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

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-slate-800">
          I am registering as
        </legend>

        <div className="grid grid-cols-2 gap-3">
          <label
            className={`cursor-pointer rounded-lg border p-4 transition ${
              selectedRole === "worker"
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200"
            }`}
          >
            <input
              type="radio"
              value="worker"
              {...register("role")}
              className="sr-only"
            />

            <span className="block font-semibold text-slate-900">
              Worker
            </span>

            <span className="mt-1 block text-xs text-slate-500">
              Find opportunities
            </span>
          </label>

          <label
            className={`cursor-pointer rounded-lg border p-4 transition ${
              selectedRole === "contractor"
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200"
            }`}
          >
            <input
              type="radio"
              value="contractor"
              {...register("role")}
              className="sr-only"
            />

            <span className="block font-semibold text-slate-900">
              Contractor
            </span>

            <span className="mt-1 block text-xs text-slate-500">
              Hire workers
            </span>
          </label>
        </div>

        {errors.role && (
          <p className="mt-1 text-sm text-red-600">
            {errors.role.message}
          </p>
        )}
      </fieldset>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Full name
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          placeholder="Enter your full name"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Email
          <span className="ml-1 text-xs text-slate-400">
            optional
          </span>
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          placeholder="you@example.com"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Phone
          <span className="ml-1 text-xs text-slate-400">
            optional
          </span>
        </label>

        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register("phone")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          placeholder="01XXXXXXXXX"
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            {...register("password")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            placeholder="Create a strong password"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (current) => !current,
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500"
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

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-slate-800"
        >
          Confirm password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            placeholder="Re-enter your password"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (current) => !current,
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500"
            aria-label={
              showConfirmPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <Loader2
            size={18}
            className="animate-spin"
          />
        )}

        {isSubmitting
          ? "Creating account..."
          : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-slate-900 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}