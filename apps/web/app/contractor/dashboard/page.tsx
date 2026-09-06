"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/lib/auth/AuthProvider";

export default function ContractorDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard
      allowedRoles={["contractor"]}
    >
      <section className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <p className="text-sm font-medium text-slate-500">
              Contractor dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Welcome to SHROMIK
            </h1>

            <p className="mt-3 text-slate-600">
              Signed in as{" "}
              {user?.email ??
                user?.phone ??
                "SHROMIK contractor"}
            </p>

            <button
              type="button"
              onClick={() => void logout()}
              className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}