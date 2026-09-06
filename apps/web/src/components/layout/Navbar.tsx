"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/lib/auth/AuthProvider";

const navigation = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Workers", href: "/for-workers" },
  { label: "For Contractors", href: "/for-contractors" },
  { label: "Jobs", href: "/jobs" },
  { label: "Training", href: "/trainings" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    setOpen(false);

    await logout();

    router.push("/login");
  };

  const dashboardHref =
    user?.role === "worker"
      ? "/worker/dashboard"
      : user?.role === "contractor"
        ? "/contractor/dashboard"
        : "/admin/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-green-800"
          aria-label="SHROMIK home"
          onClick={() => setOpen(false)}
        >
          SHROMIK
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-green-800"
            >
              {item.label}
            </Link>
          ))}

          {/* Authentication */}
          {!isLoading && !isAuthenticated && (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-900"
              >
                Get Started
              </Link>
            </>
          )}

          {!isLoading && isAuthenticated && user && (
            <>
              <Link
                href={dashboardHref}
                className="text-sm font-semibold text-green-800 hover:text-green-900"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => void handleLogout()}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Sign out
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg border border-slate-300 p-2 lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-green-800"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Authentication */}
            {!isLoading && !isAuthenticated && (
              <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
                <Link
                  href="/login"
                  className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-800"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-green-800 px-4 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}

            {!isLoading && isAuthenticated && user && (
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-4">

                <Link
                  href={dashboardHref}
                  className="rounded-lg bg-green-50 px-3 py-3 text-sm font-semibold text-green-800"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="rounded-lg border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sign out
                </button>

              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}