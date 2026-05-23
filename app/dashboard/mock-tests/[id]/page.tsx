"use client";

import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getMockTestById } from "@/actions/mockTest";
import { useAuth } from "@/contexts/AuthContext";
import {
  Award,
  Clock,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Lock,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  FileText,
  Loader2,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MockTestDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { dbUser, isLoading: authLoading } = useAuth();
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testId, setTestId] = useState<string>("");

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setTestId(resolvedParams.id);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    async function loadTest() {
      if (!testId) return;

      try {
        const testData = await getMockTestById(testId);
        if (!testData) {
          router.push("/dashboard");
          return;
        }
        setTest(testData);
      } catch (error) {
        console.error("Failed to load test:", error);
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading && testId) {
      if (!dbUser) {
        router.push("/sign-in");
        return;
      }
      loadTest();
    }
  }, [dbUser, authLoading, testId, router]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <span className="text-sm text-zinc-500 mt-2.5">
          Loading mock test...
        </span>
      </div>
    );
  }

  if (!test) {
    return null;
  }

  const hasAccess = dbUser?.role === "ADMIN" || dbUser?.isPaid === true;

  // 3. Render Access Denied Gate if unpaid
  if (!hasAccess) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full overflow-hidden rounded-3xl border border-rose-500/20 bg-zinc-900/30 p-8 shadow-2xl backdrop-blur-xl text-center">
            {/* Ambient Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-rose-500/10 blur-2xl -z-10" />

            <div className="h-14 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-6">
              <Lock className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Access Denied
            </h1>
            <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
              This premium mock test is only accessible to students with an
              active Paid tier. Gain lifetime access to all mock test links in
              minutes.
            </p>

            {/* Price tag marker */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mt-6 text-left flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                  PrepEd Lifetime Tier
                </span>
                <span className="text-zinc-200 text-sm font-bold mt-0.5 block">
                  Access all Premium Mock Tests
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white">Rs. 499</span>
                <span className="text-[9px] text-zinc-500 block">
                  one-time payment
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/pricing"
                className="w-full flex h-11 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 text-sm"
              >
                Unlock Premium Now
              </Link>
              <Link
                href="/dashboard"
                className="w-full flex h-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors text-sm"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 4. Render Mock Test Panel for Paid Users
  const difficultyColors: any = {
    Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all Mock Tests
        </Link>

        {/* Layout Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cover & Details */}
          <div className="md:col-span-8 space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/5 rounded-full blur-2xl" />

              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span
                  className={`rounded-lg border px-2.5 py-0.5 text-[10px] font-bold ${
                    difficultyColors[test.difficulty]
                  }`}
                >
                  {test.difficulty}
                </span>
                <span className="rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                  {test.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3.5xl font-black text-white leading-tight">
                {test.title}
              </h1>

              <p className="text-zinc-400 text-sm mt-4 leading-relaxed whitespace-pre-wrap">
                {test.description}
              </p>

              {/* Guidelines panel */}
              <div className="mt-8 border-t border-zinc-800/80 pt-6">
                <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 mb-4">
                  <FileText className="h-4.5 w-4.5 text-indigo-400" />
                  Exam Guidelines & Instructions
                </h3>

                <ul className="space-y-3">
                  {guidelines.map((g, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed"
                    >
                      <CheckCircle className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Launch Action */}
          <div className="md:col-span-4 space-y-6">
            <div className="rounded-3xl border border-indigo-500/20 bg-zinc-900/20 p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-xl text-center">
              <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/10 rounded-full blur-xl" />

              <div className="h-12 w-12 rounded-xl bg-indigo-600/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mx-auto mb-5">
                <Award className="h-6 w-6" />
              </div>

              <h2 className="text-lg font-bold text-zinc-100">
                Ready to Begin?
              </h2>
              <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                This mock test is connected to our official dynamic Google Form
                container. Ensure a stable internet connection.
              </p>

              {/* Start Test Trigger */}
              <a
                href={test.googleFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition-all duration-200 text-sm"
              >
                Launch Mock Exam
                <ExternalLink className="h-4 w-4" />
              </a>

              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-zinc-950/80 border border-zinc-800 p-3 text-left">
                <Clock className="h-5 w-5 text-zinc-500 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase font-black block">
                    Standard Duration
                  </span>
                  <span className="text-zinc-300 text-xs font-bold block">
                    120 Minutes Session
                  </span>
                </div>
              </div>

              <p className="mt-4 text-[9px] text-zinc-600">
                *The exam will open in a new browser tab. Do not close the
                dashboard tab until submission is verified.
              </p>
            </div>

            {/* Help Callout */}
            <div className="rounded-3xl border border-zinc-850 bg-zinc-900/10 p-6 flex gap-3.5">
              <AlertCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-zinc-200 text-xs">
                  Issues Loading?
                </h4>
                <p className="text-zinc-500 text-[10px] mt-1 leading-relaxed">
                  If the form URL errors or blocks your connection, please
                  verify your email has access to standard forms. Reach out to
                  administrators on live helper channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const guidelines = [
  "Double check your internet connection before hitting the launch button. Stable signals ensure accurate results submittal.",
  "Manage your time appropriately. Mock tests follow official constraints (normally 120 minutes total). Have a clock nearby.",
  "Read each multiple-choice question clearly before making selections. Marking incorrect inputs cannot be undone on forms.",
  "Ensure you complete and hit 'SUBMIT' inside the official Google Form container to capture your score grades correctly.",
  "Do not attempt to refresh or close the Google Form exam browser tab during the active session as it resets inputs.",
];
