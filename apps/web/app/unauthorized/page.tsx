import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Access restricted
        </h1>

        <p className="mt-3 text-slate-600">
          You don't have permission to access this page.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}