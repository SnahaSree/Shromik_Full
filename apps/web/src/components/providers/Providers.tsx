"use client";

import type { ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/lib/auth/AuthProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <AuthProvider>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </AuthProvider>
  );
}