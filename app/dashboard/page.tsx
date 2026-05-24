"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import { getMockTests } from "@/actions/mockTest";
import { Search, Lock, Unlock, ExternalLink, SearchX, Filter } from "lucide-react";
import Link from "next/link";

interface MockTest {
  id: string;
  title: string;
  googleFormLink: string;
  category?: string;
  isActive: boolean;
  createdAt: string | Date;
}

export default function DashboardPage() {
  const { user } = useUser();
  const { error } = useToast();
  const { isLoading: authLoading, hasPremium } = useAuth();

  // States
  const [tests, setTests] = useState<MockTest[]>([]);
  const [testsLoading, setTestsLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | "TIMED" | "NON_TIMED"
  >("ALL");

  useEffect(() => {
    async function loadTests() {
      try {
        // Fetch tests
        const data = await getMockTests();
        // Filter only active tests for standard dashboard (Admin can see inactive ones in admin portal)
        const activeTests = data.filter((t: MockTest) => t.isActive);
        setTests(activeTests);
      } catch (err) {
        console.error("Failed to load mock tests:", err);
        error("Failed to load mock tests. Please refresh the page.");
      } finally {
        setTestsLoading(false);
      }
    }

    loadTests();
  }, []);

  const loading = authLoading || testsLoading;

  // Filtered tests
  const filteredTests = tests.filter((test) => {
    console.log("Filtering test:", test);
    const matchesSearch = test.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-zinc-900 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center gap-3">
              Welcome back, {user?.firstName || "Scholar"}!
            </h1>
            <p className="mt-2 text-zinc-400 text-sm md:text-base">
              Browse available entrance mock tests and practice under real exam
              formats.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasPremium ? (
              <div className="flex items-center gap-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5 shadow-xl backdrop-blur-md">
                <Unlock className="h-5 w-5 text-indigo-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                    Status tier
                  </span>
                  <span className="text-xs font-bold text-indigo-300">
                    Premium Lifetime Unlocked
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-6 rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 shadow-md">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-zinc-500" />
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                      Status tier
                    </span>
                    <span className="text-xs font-bold text-zinc-400">
                      Free Starter Tier
                    </span>
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-500 transition-colors"
                >
                  Get Premium
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search mock tests by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-zinc-100 rounded-xl py-3 pl-10 pr-4 transition-all duration-200 placeholder:text-zinc-600 text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-semibold">
              <Filter className="h-4 w-4" />
              Category:
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${selectedCategory === "ALL"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700"
                  }`}
              >
                All Tests
              </button>
              <button
                onClick={() => setSelectedCategory("NON_TIMED")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${selectedCategory === "NON_TIMED"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700"
                  }`}
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                Non Timed
              </button>
              <button
                onClick={() => setSelectedCategory("TIMED")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${selectedCategory === "TIMED"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700"
                  }`}
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                Timed
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 space-y-4 animate-pulse"
              >
                <div className="h-44 w-full bg-zinc-900 rounded-xl" />
                <div className="h-4 w-1/3 bg-zinc-900 rounded-lg" />
                <div className="h-6 w-3/4 bg-zinc-900 rounded-lg" />
                <div className="h-4 w-5/6 bg-zinc-900 rounded-lg" />
                <div className="pt-4 border-t border-zinc-900 flex justify-between">
                  <div className="h-4 w-20 bg-zinc-900 rounded" />
                  <div className="h-8 w-24 bg-zinc-900 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTests.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-zinc-900 bg-zinc-900/10 p-12 text-center max-w-xl mx-auto mt-10">
            <SearchX className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-200">
              No mock tests found
            </h3>
            <p className="text-xs text-zinc-500 mt-2 max-w-xs mx-auto leading-relaxed">
              We could not find any mock tests matching your search or filters.
              Try adjusting your query or resetting selectors.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
              }}
              className="mt-5 inline-flex h-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 px-4 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Reset Search
            </button>
          </div>
        ) : (
          /* Grid of Tests */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              return (
                <div
                  key={test.id}
                  className={`rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden relative group transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 flex flex-col h-full`}
                >
                  {/* Header with simple gradient */}
                  <div className="relative h-32 w-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 overflow-hidden">
                    {/* Glowing effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    {/* Lock visual for unpaid */}
                    {!hasPremium && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/40 backdrop-blur-[2px] z-10">
                        <div className="h-10 w-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 shadow-xl">
                          <Lock className="h-4.5 w-4.5 text-indigo-400" />
                        </div>
                        <span className="text-[10px] uppercase font-black text-indigo-400 tracking-wider mt-2.5 shadow-sm">
                          Premium Lock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-zinc-100 text-lg leading-snug group-hover:text-indigo-400 transition-colors">
                          {test.title}
                        </h3>
                        <span
                          className={`inline-flex rounded-lg px-2 py-1 text-[9px] font-bold whitespace-nowrap ${test.category === "TIMED"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            }`}
                        >
                          {test.category || "NON_TIMED"}
                        </span>
                      </div>

                      <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                        Click to access this mock test and practice your skills.
                      </p>
                    </div>

                    {/* Bottom Actions footer */}
                    <div className="pt-4 mt-5 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                        Created {new Date(test.createdAt).toLocaleDateString()}
                      </span>

                      {hasPremium ? (
                        <Link
                          href={`${test.googleFormLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8.5 items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white px-4 transition-colors"
                        >
                          Start Test
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : (
                        <Link
                          href="/pricing"
                          className="inline-flex h-8.5 items-center gap-1 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-xs font-bold text-zinc-300 px-4 border border-zinc-800 transition-colors"
                        >
                          Unlock Access
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
