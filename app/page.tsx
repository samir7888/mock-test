import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Award,
  Zap,
  ShieldCheck,
  Smartphone,
  Users,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  FileCheck,
  ClipboardList,
  BookOpen,
  Clock,
  Target,
  Star,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-100 overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Japanese-inspired gradient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-orange-600/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-950/40 border border-red-900/30 px-3 py-1.5 text-xs font-semibold text-red-400 mb-6 hover:bg-red-950/60 transition-colors">
            <BookOpen className="h-3.5 w-3.5" />
            日本語能力試験対策 (JFT Preparation)
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl mx-auto leading-[1.1] bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Master{" "}
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Japanese Language
            </span>{" "}
            with Authentic JFT Mock Tests
          </h1>

          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Prepare for JFT N5 to N1 with comprehensive mock tests. Practice
            reading, listening, vocabulary, and grammar with real exam
            conditions and detailed feedback.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-red-600 px-6 font-bold text-white shadow-lg shadow-red-600/35 hover:bg-red-500 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
            >
              Start Free Practice
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 font-bold text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto backdrop-blur-md"
            >
              Get Premium Access
            </Link>
          </div>

          {/* Japanese Mock Test Dashboard Preview */}
          <div className="mt-16 md:mt-24 relative mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/20 p-2 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-red-500/10 via-transparent to-orange-500/10 blur-xl" />
            <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950">
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="rounded-lg bg-zinc-900/50 px-8 py-1 text-xs text-zinc-500 font-medium">
                  JFT-prep.com/mock-tests
                </div>
                <div className="w-12" />
              </div>

              {/* Mockup Body Grid */}
              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 text-left">
                {/* JFT N5 Mock Card */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 relative overflow-hidden group">
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    Free
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-green-600/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-lg">
                    JFT N5 Mock Test
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1.5 line-clamp-2">
                    Basic hiragana, katakana, and essential vocabulary. Perfect
                    for beginners starting their Japanese journey.
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/60">
                    <span className="text-xs font-semibold text-zinc-500">
                      Level: Beginner
                    </span>
                    <span className="text-xs font-semibold text-green-400">
                      Start Test
                    </span>
                  </div>
                </div>

                {/* JFT N3 Mock Card */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 relative overflow-hidden group">
                  <div className="absolute top-3 right-3 rounded-full bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                    Premium
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-lg">
                    JFT N3 Mock Test
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1.5 line-clamp-2">
                    Intermediate kanji, grammar patterns, and reading
                    comprehension for everyday conversations.
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/60 blur-[1.5px]">
                    <span className="text-xs font-semibold text-zinc-500">
                      Level: Intermediate
                    </span>
                    <span className="text-xs font-semibold text-orange-400">
                      Locked
                    </span> 
                  </div>
                </div>

                {/* JFT N1 Mock Card */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 relative overflow-hidden group">
                  <div className="absolute top-3 right-3 rounded-full bg-red-500/10 border border-red-500/25 px-2 py-0.5 text-[10px] font-bold text-red-400">
                    Premium
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-lg">
                    JFT N1 Mock Test
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1.5 line-clamp-2">
                    Advanced Japanese proficiency with complex texts, nuanced
                    grammar, and business-level communication.
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/60 blur-[1.5px]">
                    <span className="text-xs font-semibold text-zinc-500">
                      Level: Advanced
                    </span>
                    <span className="text-xs font-semibold text-red-400">
                      Locked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Grid */}
      <section className="py-20 bg-zinc-900/20 border-y border-zinc-900 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
              Everything You Need for JFT Success
            </h2>
            <p className="mt-4 text-zinc-400">
              Comprehensive Japanese language preparation with authentic exam
              experience and expert guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Authentic JFT Mock Tests
              </h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Practice with real JFT format questions covering vocabulary,
                grammar, reading, and listening for all levels N5-N1.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Timed Practice Sessions
              </h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Experience real exam conditions with accurate timing for each
                section to build confidence and time management skills.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Detailed Score Analysis
              </h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Get comprehensive feedback on your performance with detailed
                explanations and improvement recommendations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                All JFT Levels
              </h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                From beginner N5 to advanced N1, practice at your level and
                progressively advance your Japanese proficiency.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Mobile Friendly
              </h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Study anywhere, anytime with our responsive design that works
                perfectly on phones, tablets, and computers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Secure & Reliable
              </h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Your progress is safely stored with secure authentication and
                reliable access to all your practice materials.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works / Steps */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
              Start Your JFT Journey in 3 Steps
            </h2>
            <p className="mt-4 text-zinc-400">
              Begin practicing with authentic Japanese mock tests in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-extrabold text-xl text-red-400 shadow-xl mb-6 relative">
                1
                <div className="absolute inset-0 bg-red-500/5 blur-md rounded-2xl -z-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Create Your Account
              </h3>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xs">
                Sign up quickly with Google or email. Access free N5 practice
                tests immediately after registration.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-extrabold text-xl text-red-400 shadow-xl mb-6 relative">
                2
                <div className="absolute inset-0 bg-red-500/5 blur-md rounded-2xl -z-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Choose Your Level
              </h3>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xs">
                Select from N5 (beginner) to N1 (advanced). Upgrade to premium
                for access to all levels and unlimited practice.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-extrabold text-xl text-red-400 shadow-xl mb-6 relative">
                3
                <div className="absolute inset-0 bg-red-500/5 blur-md rounded-2xl -z-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Start Practicing
              </h3>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xs">
                Take authentic JFT mock tests with real timing, get detailed
                feedback, and track your progress.
              </p>
            </div>

            {/* Connector Line for Desktop */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent -z-1" />
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-20 bg-zinc-900/10 border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                Why Choose Our JFT Preparation Platform
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Unlike generic language apps, our platform focuses exclusively
                on JFT preparation with authentic exam formats, real timing,
                and comprehensive feedback to maximize your success.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Authentic Format:</strong> Practice with real JFT
                    question types and exam structure for all levels.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Expert Content:</strong> Questions created by
                    Japanese language experts and JFT veterans.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Progress Tracking:</strong> Monitor your improvement
                    across all skill areas with detailed analytics.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Unlimited Practice:</strong> Take tests as many
                    times as you want to build confidence and skills.
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-48 w-48 rounded-full bg-red-500/10 blur-2xl" />
              <h3 className="font-bold text-xl text-zinc-100">
                Success Stories
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Join thousands of students who have successfully passed their
                JFT exams with our preparation platform:
              </p>

              {/* Mini testimonial cards */}
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                  <p className="text-zinc-300 text-xs italic">
                    "The mock tests were incredibly similar to the actual JFT
                    N2 exam. The timing practice helped me manage my time
                    perfectly on test day!"
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-6 w-6 rounded-full bg-red-600/20 text-red-400 text-[10px] flex items-center justify-center font-bold">
                      YT
                    </div>
                    <span className="text-zinc-400 text-xs font-semibold">
                      Yuki Tanaka (JFT N2 Pass)
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                  <p className="text-zinc-300 text-xs italic">
                    "Started from N5 and worked my way up to N1. The progressive
                    difficulty and detailed explanations made all the difference
                    in my learning journey."
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-6 w-6 rounded-full bg-orange-600/20 text-orange-400 text-[10px] flex items-center justify-center font-bold">
                      MS
                    </div>
                    <span className="text-zinc-400 text-xs font-semibold">
                      Maria Santos (JFT N1 Pass)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Preview */}
      <section className="py-20 relative bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
              Simple, Affordable Pricing
            </h2>
            <p className="mt-4 text-zinc-400">
              Get unlimited access to all JFT levels with one-time payment. No
              subscriptions, no hidden fees.
            </p>
          </div>

          <div className="mx-auto max-w-md rounded-3xl border border-red-500/30 bg-zinc-900/30 p-8 md:p-10 shadow-2xl relative backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-red-500/10 rounded-full blur-xl" />
            <div className="absolute -left-12 -bottom-12 h-32 w-32 bg-orange-500/5 rounded-full blur-xl" />

            <div className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/20 mb-4">
              Best Value
            </div>

            <h3 className="text-2xl font-bold text-zinc-100">
              Premium JFT Access
            </h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              Unlock all JFT levels (N5-N1) with unlimited mock tests and
              detailed feedback.
            </p>

            <div className="mt-6 flex items-baseline justify-center gap-1">
              <span className="text-lg font-bold text-zinc-400">Rs.</span>
              <span className="text-5xl font-black text-white tracking-tight">
                499
              </span>
              <span className="text-zinc-500 text-sm font-semibold">
                / lifetime
              </span>
            </div>

            <ul className="mt-8 space-y-4 text-left border-t border-zinc-800/80 pt-6">
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-red-400 flex-shrink-0" />
                All JFT levels (N5, N4, N3, N2, N1)
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-red-400 flex-shrink-0" />
                Unlimited mock test attempts
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-red-400 flex-shrink-0" />
                Detailed score analysis & feedback
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-red-400 flex-shrink-0" />
                Mobile & desktop access
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-red-400 flex-shrink-0" />
                Progress tracking & analytics
              </li>
            </ul>

            <Link
              href="/pricing"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-red-600 font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 active:scale-[0.98] transition-all duration-200"
            >
              Get Premium Access Now
            </Link>

            <p className="mt-4 text-[10px] text-zinc-500">
              Secure payment processing. Start practicing immediately after
              verification.
            </p>
          </div>
        </div>
      </section>{" "}
      {/* FAQ Section */}
      <section className="py-20 border-t border-zinc-900 bg-zinc-900/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-zinc-400">
              Everything you need to know about our JFT preparation platform.
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                What JFT levels are available?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                We offer comprehensive mock tests for all JFT levels from N5
                (beginner) to N1 (advanced). Each level includes vocabulary,
                grammar, reading, and listening practice sections that mirror
                the actual exam format.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                How accurate are the mock tests compared to real JFT?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                Our mock tests are created by Japanese language experts and
                follow the exact format, timing, and difficulty level of
                official JFT exams. Many students report that our tests closely
                match their actual exam experience.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                Can I practice listening sections?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                Yes! Our premium tests include authentic listening practice with
                native Japanese audio for all levels. You'll practice with the
                same types of conversations, announcements, and presentations
                found in real JFT exams.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                How do I track my progress?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                Your dashboard shows detailed analytics including scores by
                section, improvement over time, weak areas to focus on, and
                estimated readiness for each JFT level. You can retake tests
                unlimited times to track improvement.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                Is there a free trial available?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                Yes! You can access N5 level practice tests for free after
                creating an account. This gives you a taste of our platform
                quality before upgrading to premium for access to all levels.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA section */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px]" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 md:p-12 text-center backdrop-blur-xl relative">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
              Ready to Pass Your JFT Exam?
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              Join thousands of successful students who have achieved their
              Japanese language goals with our comprehensive JFT preparation
              platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-red-600 px-6 font-bold text-white shadow-lg shadow-red-600/25 hover:bg-red-500 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
              >
                Start Free Practice
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 px-6 font-bold text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-200 w-full sm:w-auto"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
