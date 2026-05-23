import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/ToastProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepEd | Premium Mock Test Platform",
  description:
    "Elevate your exam preparation with our high-quality premium mock tests. Authenticated, verified, and custom-tailored for maximum scoring potential.",
  keywords: [
    "mock test",
    "exam prep",
    "online tests",
    "eSewa",
    "nepal mock tests",
    "license prep",
    "premium exam platform",
  ],
  authors: [{ name: "PrepEd Team" }],
  openGraph: {
    title: "PrepEd | Premium Mock Test Platform",
    description:
      "Elevate your exam preparation with our high-quality premium mock tests.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#4f46e5", // indigo-600
          colorBackground: "#09090b", // zinc-950
          colorInputBackground: "#18181b", // zinc-900
          colorInputText: "#f4f4f5", // zinc-100
          colorText: "#f4f4f5", // zinc-100
          colorTextSecondary: "#a1a1aa", // zinc-400
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
        style={{ colorScheme: "dark" }}
      >
        <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
