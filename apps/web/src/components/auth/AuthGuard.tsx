"use client";

import {
  useEffect,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/lib/auth/AuthProvider";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: Array<
    "worker" | "contractor" | "admin"
  >;
}

export default function AuthGuard({
  children,
  allowedRoles,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace(
        `/login?next=${encodeURIComponent(pathname)}`,
      );

      return;
    }

    if (
      allowedRoles &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/unauthorized");
    }
  }, [
    allowedRoles,
    isAuthenticated,
    isLoading,
    pathname,
    router,
    user,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return <>{children}</>;
}