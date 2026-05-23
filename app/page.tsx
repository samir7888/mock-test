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
  ClipboardList
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans text-zinc-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Colorful Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[100px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/40 border border-indigo-900/30 px-3 py-1.5 text-xs font-semibold text-indigo-400 mb-6 hover:bg-indigo-950/60 transition-colors">
            <SparklesIcon className="h-3.5 w-3.5" />
            Empowering Next-Gen Students
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl mx-auto leading-[1.1] bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Master Your Exams with Our <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">Premium Mock Tests</span>
          </h1>

          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Boost your confidence and scores. Gain secure access to expertly curated, admin-verified exam simulations tailored to give you the ultimate edge.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-6 font-bold text-white shadow-lg shadow-indigo-600/35 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
            >
              Start Free Practice
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 font-bold text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto backdrop-blur-md"
            >
              Unlock Premium Access
            </Link>
          </div>

          {/* SaaS Mockup Dashboard preview */}
          <div className="mt-16 md:mt-24 relative mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/20 p-2 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-transparent to-violet-500/10 blur-xl" />
            <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950">
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="rounded-lg bg-zinc-900/50 px-8 py-1 text-xs text-zinc-500 font-medium">
                  dashboard.preped.com/mock-tests
                </div>
                <div className="w-12" />
              </div>
              
              {/* Mockup Body Grid */}
              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 text-left">
                {/* Mock Card 1 */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 relative overflow-hidden group">
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    Active
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-lg">IOE Entrance Mock Test</h3>
                  <p className="text-zinc-400 text-sm mt-1.5 line-clamp-2">Complete model questions for IOE Engineering prep with real time counters.</p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/60">
                    <span className="text-xs font-semibold text-zinc-500">Difficulty: Hard</span>
                    <span className="text-xs font-semibold text-indigo-400">Start Test</span>
                  </div>
                </div>

                {/* Mock Card 2 */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 relative overflow-hidden group">
                  <div className="absolute top-3 right-3 rounded-full bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                    Premium Required
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-lg">CSIT Premium Model</h3>
                  <p className="text-zinc-400 text-sm mt-1.5 line-clamp-2">Exclusive questions curated by top rankers for B.Sc. CSIT entrance.</p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/60 blur-[1.5px]">
                    <span className="text-xs font-semibold text-zinc-500">Difficulty: Medium</span>
                    <span className="text-xs font-semibold text-indigo-400">Locked</span>
                  </div>
                </div>

                {/* Mock Card 3 */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 relative overflow-hidden group">
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    Active
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-lg">Medical Entrance Prep</h3>
                  <p className="text-zinc-400 text-sm mt-1.5 line-clamp-2">Biology, Physics, & Chemistry comprehensive mock exam matching new rules.</p>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/60">
                    <span className="text-xs font-semibold text-zinc-500">Difficulty: Hard</span>
                    <span className="text-xs font-semibold text-indigo-400">Start Test</span>
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
              Built to Help You Succeed
            </h2>
            <p className="mt-4 text-zinc-400">
              Everything you need to simulate actual exam stress, test your limits, and score higher.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Premium Mock Tests</h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Expertly structured questionnaires, dynamic forms, and comprehensive modules updated weekly by top field experts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Instant Access</h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                No latency or manual links email. Once paid, premium mock tests unlock directly in your account dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Admin Verified Security</h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Highly secure backend. Payment confirmation via screenshot verification managed by real admins to keep checkout clean.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Fully Mobile Responsive</h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Take tests on the go. Perfectly designed responsive layout for both standard Google Form exams and custom dashboard.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Direct Contact Help</h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Got questions? Fast direct communication via manual eSewa verification and customer support integration on page.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 backdrop-blur-md">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Analytics Tracking</h3>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                Admins monitor analytics real-time. Students can view exam difficulty levels and plan schedules to target weak areas.
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
              Simple 3-Step Process
            </h2>
            <p className="mt-4 text-zinc-400">
              Get active, premium test permissions inside 5 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-extrabold text-xl text-indigo-400 shadow-xl mb-6 relative">
                1
                <div className="absolute inset-0 bg-indigo-500/5 blur-md rounded-2xl -z-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Create an Account</h3>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xs">
                Register easily using custom Clerk Authentication with Google or Email inside seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-extrabold text-xl text-indigo-400 shadow-xl mb-6 relative">
                2
                <div className="absolute inset-0 bg-indigo-500/5 blur-md rounded-2xl -z-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Scan & Upload Screenshot</h3>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xs">
                Scan the official eSewa QR code, send the premium activation fee, and upload the transaction screenshot in one click.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-extrabold text-xl text-indigo-400 shadow-xl mb-6 relative">
                3
                <div className="absolute inset-0 bg-indigo-500/5 blur-md rounded-2xl -z-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Start Mock Exams</h3>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xs">
                Admins approve your payment and your dashboard immediately unlocks all mock tests and dynamic links.
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
                Why PrepEd is Your Best Study Companion
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Unlike random pdfs and buggy platforms, PrepEd mock test questions map directly to real curriculum. You experience the stress, format, and timer of actual entrance exams.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Realistic Experience:</strong> Actual Google Form structures replicate real online test scenarios.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Time Management:</strong> Integrated guidance markers teach speed and efficiency.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Curated Syllabus:</strong> Fully structured covering all key modules of target entrance exams.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">
                    <strong>Lifetime Upgrades:</strong> Pay once, access all new tests added in your category dynamic lists.
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />
              <h3 className="font-bold text-xl text-zinc-100">Proven Results</h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Hear what some of our successful students say about their score jumps after using PrepEd mock test platforms:
              </p>

              {/* Mini testimonial cards */}
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                  <p className="text-zinc-300 text-xs italic">
                    "The mock tests were extremely close to the actual IOE exams. The difficulty levels prep me perfectly and I got ranked inside top 100!"
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-6 w-6 rounded-full bg-indigo-600/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">
                      AN
                    </div>
                    <span className="text-zinc-400 text-xs font-semibold">Anish Neupane (IOE topper)</span>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                  <p className="text-zinc-300 text-xs italic">
                    "I used to get nervous with timers. Taking 10+ paid tests here made actual exam day feel like just another standard mock practice. Truly recommended."
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-6 w-6 rounded-full bg-violet-600/20 text-violet-400 text-[10px] flex items-center justify-center font-bold">
                      SS
                    </div>
                    <span className="text-zinc-400 text-xs font-semibold">Shruti Sharma (B.Sc. CSIT)</span>
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
              One Clean Pricing
            </h2>
            <p className="mt-4 text-zinc-400">
              Affordable full access to all mock tests without recurring payments.
            </p>
          </div>

          <div className="mx-auto max-w-md rounded-3xl border border-indigo-500/30 bg-zinc-900/30 p-8 md:p-10 shadow-2xl relative backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-500/10 rounded-full blur-xl" />
            <div className="absolute -left-12 -bottom-12 h-32 w-32 bg-emerald-500/5 rounded-full blur-xl" />

            <div className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-4">
              Best Deal
            </div>
            
            <h3 className="text-2xl font-bold text-zinc-100">Premium Lifetime Access</h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              Unlock access to every active and upcoming entrance exam mock test instantly.
            </p>

            <div className="mt-6 flex items-baseline justify-center gap-1">
              <span className="text-lg font-bold text-zinc-400">Rs.</span>
              <span className="text-5xl font-black text-white tracking-tight">499</span>
              <span className="text-zinc-500 text-sm font-semibold">/ lifetime</span>
            </div>

            <ul className="mt-8 space-y-4 text-left border-t border-zinc-800/80 pt-6">
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
                Unlimited attempts on all Mock Tests
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
                Curated high-yield entrance questions
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
                Mobile, tablet and desktop responsive
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
                Manual admin verification within minutes
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
                Direct link connection to official forms
              </li>
            </ul>

            <Link
              href="/pricing"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200"
            >
              Get Premium Access Now
            </Link>
            
            <p className="mt-4 text-[10px] text-zinc-500">
              Payments are manually verified by our support administrators. Keep screenshot safe!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-zinc-900 bg-zinc-900/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-zinc-400">
              Clear, simple answers to everything you need to know.
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                How do I get premium access to the mock tests?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                Simply register for an account, head over to our Pricing page, scan the official eSewa QR code, and upload a screenshot of your successful transaction. Our admins will verify and activate your dashboard access within minutes!
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                Can unpaid users see the mock test questions?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                Unpaid users can browse the list of mock tests on the dashboard. However, the cards will display a locked blur effect, the detailed description is summarized, and the Google Form entrance link is kept fully secure on the server side and never exposed.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                How long does the payment verification take?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                Admin manual verification usually takes anywhere from 5 to 30 minutes depending on the time of day. We work around the clock to ensure you can start practicing as fast as possible.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
              <h3 className="flex items-center gap-2.5 font-bold text-zinc-100 text-lg">
                <HelpCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                Are these tests actual official exam forms?
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed pl-7">
                These are highly structured simulation mock tests created by experts and toppers mapping the exact syllabus, weights, difficulty curves, and timing of official entrance exams to prep you under real-world conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
        
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 md:p-12 text-center backdrop-blur-xl relative">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
              Ready to Accelerate Your Prep?
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              Join hundreds of high-scoring students practicing on PrepEd mock tests today. Stop waiting, start excelling.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
              >
                Sign Up Now
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 px-6 font-bold text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-200 w-full sm:w-auto"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md">
                  <Award className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  Prep<span className="text-indigo-400">Ed</span>
                </span>
              </Link>
              <p className="mt-4 text-zinc-500 text-sm max-w-sm leading-relaxed">
                Elevating entrance exam prep through high-yield online mock test simulations. Learn efficiently, manage time properly, and score your maximum potential.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-200 text-sm uppercase tracking-wider">Platform</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                <li><Link href="/sign-in" className="hover:text-indigo-400 transition-colors">Log In</Link></li>
                <li><Link href="/sign-up" className="hover:text-indigo-400 transition-colors">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-200 text-sm uppercase tracking-wider">Security & Terms</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
                <li><span className="cursor-pointer hover:text-indigo-400 transition-colors">Privacy Policy</span></li>
                <li><span className="cursor-pointer hover:text-indigo-400 transition-colors">Terms of Service</span></li>
                <li><span className="cursor-pointer hover:text-indigo-400 transition-colors">Refund Policy</span></li>
                <li><span className="cursor-pointer hover:text-indigo-400 transition-colors">Contact Support</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-900/60 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-xs">
            <p>© {new Date().getFullYear()} PrepEd Inc. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Design made with absolute visual excellence in Nepal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sparkles decorative SVG
function SparklesIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
    </svg>
  );
}
