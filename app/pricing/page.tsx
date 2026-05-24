"use client";

import React, { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import ImageUpload from "@/components/ImageUpload";
import {
  submitPaymentRequest,
  getUserPaymentRequestStatus,
} from "@/actions/admin";
import {
  Copy,
  Check,
  Upload,
  HelpCircle,
  AlertCircle,
  Loader2,
  CheckCircle,
  Timer,
} from "lucide-react";
import Image from "next/image";

export default function PricingPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { success, error, info } = useToast();
  const { dbUser, isLoading: authLoading } = useAuth();

  // States
  const [copied, setCopied] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const esewaNumber = "9812999599";
  const accountName = "Sameer Basnet";

  // Fetch payment status using AuthContext
  useEffect(() => {
    async function fetchPaymentStatus() {
      if (user && !authLoading) {
        setCheckingStatus(true);
        try {
          const status = await getUserPaymentRequestStatus();
          setPaymentRequest(status);
        } catch (err) {
          console.error("Error fetching payment data:", err);
        } finally {
          setCheckingStatus(false);
        }
      } else if (!authLoading) {
        setCheckingStatus(false);
      }
    }

    if (isLoaded) {
      fetchPaymentStatus();
    }
  }, [user, isLoaded, authLoading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(esewaNumber);
    setCopied(true);
    success("eSewa Number copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUploadSuccess = (url: string) => {
    setScreenshotUrl(url);
    success("Screenshot uploaded successfully!");
  };

  const handleUploadError = (errorMessage: string) => {
    error(errorMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshotUrl.trim()) {
      error("Please upload your payment screenshot first");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitPaymentRequest(screenshotUrl);
      if (res.success) {
        success("Payment verification request submitted successfully!");
        setScreenshotUrl("");
        // Reload status
        const status = await getUserPaymentRequestStatus();
        setPaymentRequest(status);
      } else {
        error(res.error || "Failed to submit request");
      }
    } catch (err: any) {
      error(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
            Unlock Premium Prep Access
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Get instant, lifetime permission to all current and future entrance
            mock test forms.
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Pricing Card */}
          <div className="lg:col-span-5 rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 shadow-xl backdrop-blur-md relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-500/10 rounded-full blur-xl" />

            <span className="inline-flex rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-400 mb-6">
              Lifetime Pass
            </span>

            <h2 className="text-2xl font-bold text-zinc-100">
              PrepEd Premium Access
            </h2>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              No monthly plans. Scan once, and gain continuous access to mock
              forms covering multiple categories.
            </p>

            <div className="mt-8 flex items-baseline gap-1">
              <span className="text-lg font-bold text-zinc-400">Rs.</span>
              <span className="text-6xl font-black text-white tracking-tight">
                499
              </span>
              <span className="text-zinc-500 text-sm font-semibold">
                / lifetime
              </span>
            </div>

            <div className="mt-8 border-t border-zinc-800/80 pt-6">
              <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-4">
                What's Included:
              </h3>
              <ul className="space-y-3.5">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <Check className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: eSewa Details */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 md:p-8 shadow-xl backdrop-blur-md">
              <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-bold">
                  1
                </span>
                Scan QR or Send Directly
              </h2>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* QR Code Visual */}
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-zinc-800 bg-zinc-950 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-12 w-12 bg-emerald-500/5 rounded-full blur-xl" />

                  {/* QR container */}
                  <div className="relative h-44 w-44 rounded-xl border-4 border-emerald-500 bg-white p-3 shadow-inner flex items-center justify-center">
                    <Image
                      src="/qr.jpg"
                      alt="eSewa QR Code for Payment"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs text-zinc-500 mt-4 text-center">
                    Scan to Pay Rs. 499
                  </span>
                </div>

                {/* Text eSewa credentials */}
                <div className="space-y-4">
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                      Merchant eSewa ID
                    </span>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-mono text-lg font-bold text-white tracking-wider">
                        {esewaNumber}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800"
                      >
                        {copied ? (
                          <Check className="h-4.5 w-4.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-4.5 w-4.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                      Account Name
                    </span>
                    <span className="text-zinc-200 text-sm font-semibold mt-1 block">
                      {accountName}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed italic pl-1 border-l-2 border-indigo-500/30">
                    *Ensure you pay the exact amount of Rs. 499. Keep the
                    transaction reference number and screenshot safe.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Upload screenshot & submit */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 md:p-8 shadow-xl backdrop-blur-md">
              <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-bold">
                  2
                </span>
                Submit Payment Verification
              </h2>

              {isLoaded && !isSignedIn && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center">
                  <AlertCircle className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
                  <h3 className="font-bold text-zinc-200">
                    Authentication Required
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-relaxed">
                    Please log in to submit your transaction screenshot so our
                    admin team can verify your payment.
                  </p>
                  <div className="mt-4">
                    <SignInButton mode="modal">
                      <button className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white hover:bg-indigo-500 transition-colors">
                        Log In to Submit
                      </button>
                    </SignInButton>
                  </div>
                </div>
              )}

              {isLoaded && isSignedIn && (
                <>
                  {checkingStatus ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                      <span className="text-xs text-zinc-500 mt-2">
                        Checking activation status...
                      </span>
                    </div>
                  ) : dbUser?.isPaid ? (
                    /* Account already active */
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6 text-center">
                      <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                      <h3 className="font-bold text-emerald-400 text-lg">
                        Premium Active!
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-relaxed">
                        Your account already has unlimited premium access
                        active. You can start all mock tests immediately from
                        your dashboard.
                      </p>
                      <div className="mt-5">
                        <a
                          href="/dashboard"
                          className="inline-flex h-9 items-center justify-center rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                        >
                          Go to Dashboard
                        </a>
                      </div>
                    </div>
                  ) : paymentRequest ? (
                    /* User has a payment request */
                    <div
                      className={`rounded-2xl border p-6 text-center ${
                        paymentRequest.status === "PENDING"
                          ? "border-amber-500/20 bg-amber-950/10"
                          : paymentRequest.status === "APPROVED"
                          ? "border-emerald-500/20 bg-emerald-950/10"
                          : "border-rose-500/20 bg-rose-950/10"
                      }`}
                    >
                      {paymentRequest.status === "PENDING" && (
                        <>
                          <Timer className="h-10 w-10 text-amber-400 mx-auto mb-3 animate-pulse" />
                          <h3 className="font-bold text-amber-400 text-lg">
                            Verification In Progress
                          </h3>
                          <p className="text-xs text-zinc-300 max-w-sm mx-auto mt-1 leading-relaxed">
                            Your transaction is being manually verified by our
                            admins. Verification usually takes 5-30 minutes.
                          </p>
                          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3 mt-4 text-left max-w-xs mx-auto overflow-hidden">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                              Screenshot URL Submitted:
                            </span>
                            <span className="text-zinc-300 font-mono text-xs mt-1 truncate block">
                              {paymentRequest.paymentScreenshot}
                            </span>
                          </div>
                        </>
                      )}

                      {paymentRequest.status === "REJECTED" && (
                        <>
                          <AlertCircle className="h-10 w-10 text-rose-400 mx-auto mb-3" />
                          <h3 className="font-bold text-rose-400 text-lg">
                            Payment Rejected
                          </h3>
                          <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-relaxed">
                            Your payment request was rejected. This usually
                            happens if the screenshot was unclear or the
                            transaction details didn't match. Please submit a
                            new payment screenshot below.
                          </p>
                          <button
                            onClick={() => setPaymentRequest(null)}
                            className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
                          >
                            Submit New Request
                          </button>
                        </>
                      )}

                      {paymentRequest.status === "APPROVED" && (
                        <>
                          <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                          <h3 className="font-bold text-emerald-400 text-lg">
                            Payment Approved!
                          </h3>
                          <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 leading-relaxed">
                            Your payment has been approved! Your account should
                            be activated shortly.
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Form to submit */
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                          Upload Payment Screenshot
                        </label>

                        <ImageUpload
                          onUploadSuccess={handleUploadSuccess}
                          onUploadError={handleUploadError}
                          disabled={submitting}
                        />

                        {screenshotUrl && (
                          <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                              Uploaded Screenshot URL:
                            </span>
                            <span className="text-zinc-300 font-mono text-xs break-all">
                              {screenshotUrl}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting || !screenshotUrl}
                        className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:shadow-none active:scale-[0.98] transition-all duration-200 text-sm"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4.5 w-4.5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4.5 w-4.5" />
                            Submit for Admin Approval
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Info / Message Banner */}
        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <HelpCircle className="h-8 w-8 text-indigo-400 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-zinc-200 text-sm">
              Need manual assistance?
            </h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              If your activation takes longer than 1 hour or you run into issues
              uploading your transaction receipt, please email us directly at{" "}
              <span className="text-indigo-400 font-mono">
                support@preped.com
              </span>{" "}
              or WhatsApp us with your transaction details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const features = [
  "Complete access to IOE model entrance mock exams",
  "Curated B.Sc. CSIT high-yield mock test questionnaires",
  "Real-time countdown constraints mimicking real tests",
  "Mobile friendly Google Form connection secure loading",
  "Instant dashboard access immediately on verification",
  "Active updates with new examination modules weekly",
  "Full direct support with system administrators",
];
