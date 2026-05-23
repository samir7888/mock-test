"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUser } from "@/actions/user";

interface DbUser {
  id: string;
  clerkId: string;
  name: string | null;
  email: string;
  imageUrl: string | null;
  isPaid: boolean;
  role: "USER" | "ADMIN";
  createdAt: Date;
}

interface AuthContextType {
  dbUser: DbUser | null;
  isLoading: boolean;
  hasPremium: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncUserData = async () => {
    if (!user) {
      setDbUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const synced = await syncUser();
      setDbUser(synced);
    } catch (error) {
      console.error("Failed to sync user:", error);
      setDbUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      syncUserData();
    }
  }, [user, isLoaded]);

  const refreshUser = async () => {
    setIsLoading(true);
    await syncUserData();
  };

  const hasPremium = dbUser?.isPaid === true || dbUser?.role === "ADMIN";

  const value: AuthContextType = {
    dbUser,
    isLoading,
    hasPremium,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
