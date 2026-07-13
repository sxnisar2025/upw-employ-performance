"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RoleGuard({
  children,
  adminOnly = false,
}) {
  const router = useRouter();
  const { employee, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (adminOnly && employee?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [employee, loading, adminOnly, router]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (adminOnly && employee?.role !== "admin") {
    return null;
  }

  return children;
}