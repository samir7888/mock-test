"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  BookOpen,
  ShieldAlert,
  Award,
  CreditCard,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();
  const { dbUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
    { name: "Pricing & Access", href: "/pricing", icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/70 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
            <Award className="h-5 w-5 text-white" />
            <div className="absolute inset-0 -z-10 rounded-xl bg-indigo-500/30 blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
            Prep<span className="text-indigo-400">Ed</span>
          </span>
        </Link>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            // Skip protected links if not logged in
            if (link.protected && !user) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                  }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-zinc-900/60 -z-10 border border-zinc-800" />
                )}
                {link.name}
              </Link>
            );
          })}

          {/* Admin link */}
          {dbUser?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${pathname.startsWith("/admin")
                ? "text-rose-400 bg-rose-950/20 border border-rose-900/30"
                : "text-zinc-400 hover:text-rose-400 hover:bg-rose-950/10"
                }`}
            >
              <ShieldAlert className="h-4 w-4" />
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Auth Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Auth Section */}
          <div className="hidden sm:flex items-center gap-4">
            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-3">
                {dbUser?.isPaid && (
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 shadow-inner">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Premium Access
                  </span>
                )}
                {!dbUser?.isPaid && dbUser?.role !== "ADMIN" && (
                  <Link
                    href="/pricing"
                    className="hidden sm:inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-400 border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    Get Premium
                  </Link>
                )}
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "h-9 w-9 rounded-xl border border-zinc-800",
                      userButtonTrigger:
                        "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-xl",
                    },
                  }}
                />
              </div>
            )}

            {isLoaded && !isSignedIn && (
              <div className="flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>



          {/* User Button for Mobile */}
          {isLoaded && isSignedIn && (
            <div className="sm:hidden">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "h-8 w-8 rounded-lg border border-zinc-800",
                    userButtonTrigger:
                      "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-lg",
                  },
                }}
              />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              // Skip protected links if not logged in
              if (link.protected && !user) return null;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? "text-white bg-zinc-900/60 border border-zinc-800"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Admin Link for Mobile */}
            {dbUser?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${pathname.startsWith("/admin")
                  ? "text-rose-400 bg-rose-950/20 border border-rose-900/30"
                  : "text-zinc-400 hover:text-rose-400 hover:bg-rose-950/10"
                  }`}
              >
                <ShieldAlert className="h-4 w-4" />
                Admin Portal
              </Link>
            )}

            {/* Mobile Auth Section */}
            {isLoaded && !isSignedIn && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/30 rounded-lg transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg bg-indigo-600 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Signed In Links */}
            {isLoaded && isSignedIn && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                {!dbUser?.isPaid && dbUser?.role !== "ADMIN" && (
                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg bg-zinc-900 text-xs font-semibold text-zinc-400 border border-zinc-800 hover:border-zinc-700 text-center transition-all"
                  >
                    Get Premium
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
