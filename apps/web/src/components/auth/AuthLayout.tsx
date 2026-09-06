import Link from "next/link";
import type { ReactNode } from "react";
import { HardHat } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] bg-slate-50 px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="hidden lg:block">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
              <HardHat size={26} />
            </div>

            <span className="text-2xl font-bold tracking-tight text-slate-900">
              SHROMIK
            </span>
          </div>

          <h2 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900">
            Build opportunities.
            <br />
            Build a stronger workforce.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            A professional platform designed to connect
            construction workers and contractors through
            trusted profiles, skills, jobs and training.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900">
                {title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>

            {children}

            <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
              <Link
                href="/"
                className="font-medium text-slate-900 hover:underline"
              >
                Return to SHROMIK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}