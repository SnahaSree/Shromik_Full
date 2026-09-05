import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg text-center">
        <p className="text-7xl font-extrabold text-green-800">
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold text-slate-950">
          Page not found
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          The page you're looking for doesn't exist or may have
          been moved.
        </p>

        <div className="mt-8">
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}