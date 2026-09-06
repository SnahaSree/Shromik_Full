import Link from "next/link";

export default function WorkerDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-800">
          Worker Dashboard
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to your SHROMIK dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Manage your profile, discover construction jobs,
          track applications, and access training.
        </p>

        <div className="mt-6">
          <Link
            href="/jobs"
            className="inline-flex rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white hover:bg-green-900"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </main>
  );
}