"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { dbUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // If no user is logged in, redirect to sign-in
      if (!user) {
        redirect("/sign-in");
        return;
      }

      // If user is loaded but doesn't have admin role, redirect to dashboard
      if (dbUser && dbUser.role !== "ADMIN") {
        redirect("/dashboard");
        return;
      }
    }
  }, [user, dbUser, isLoading]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <span className="text-sm text-zinc-500 mt-2.5">
          Authorizing admin security permissions...
        </span>
      </div>
    );
  }

  // Only render children if user is admin
  if (dbUser?.role === "ADMIN") {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
