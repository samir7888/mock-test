"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ToastProvider";
import { useAuth } from "@/contexts/AuthContext";
import {
  adminGetUsers,
  adminTogglePaidStatus,
  adminToggleUserRole,
  adminGetAnalytics,
  adminGetPaymentRequests,
  adminApprovePaymentRequest,
  adminRejectPaymentRequest,
} from "@/actions/admin";
import {
  getMockTests,
  createMockTest,
  updateMockTest,
  deleteMockTest,
} from "@/actions/mockTest";
import {
  Users,
  CreditCard,
  Award,
  Check,
  X,
  Search,
  Plus,
  Edit2,
  Trash2,
  ShieldAlert,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { success, error, info } = useToast();
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "tests">(
    "analytics"
  );
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    paidUsers: 0,
    totalTests: 0,
    activeTests: 0,
    pendingPayments: 0,
  });

  // User Management States
  const [usersList, setUsersList] = useState<any[]>([]);
  const [usersSearch, setUsersSearch] = useState("");
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [usersLoading, setUsersLoading] = useState(false);

  // Payment Requests States
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  // Mock Test CRUD States
  const [testsList, setTestsList] = useState<any[]>([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formLink, setFormLink] = useState("");
  const [formCategory, setFormCategory] = useState<"TIMED" | "NON_TIMED">(
    "NON_TIMED"
  );
  const [formIsActive, setFormIsActive] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Load initial data only once
  useEffect(() => {
    loadAnalyticsAndPayments();
  }, []);

  // Handle Tab Switch - only load data when tab changes, not on every dependency change
  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    } else if (activeTab === "tests") {
      loadTests();
    }
  }, [activeTab]);

  // Handle users search and pagination separately to avoid multiple calls
  useEffect(() => {
    if (activeTab === "users") {
      const timeoutId = setTimeout(() => {
        loadUsers();
      }, 300); // Debounce search
      return () => clearTimeout(timeoutId);
    }
  }, [usersSearch, usersPage]);

  // Loaders
  async function loadAnalyticsAndPayments() {
    try {
      const stats = await adminGetAnalytics();
      setAnalytics(stats);

      setPaymentsLoading(true);
      const reqs = await adminGetPaymentRequests();
      setPaymentsList(reqs);
    } catch (err) {
      console.error(err);
    } finally {
      setPaymentsLoading(false);
    }
  }

  async function loadUsers() {
    if (activeTab !== "users") return; // Only load if on users tab
    setUsersLoading(true);
    try {
      const res = await adminGetUsers(usersSearch, usersPage, 8);
      setUsersList(res.users);
      setUsersTotalPages(res.totalPages);
    } catch (err: any) {
      error(err.message || "Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  }

  async function loadTests() {
    if (activeTab !== "tests") return; // Only load if on tests tab
    setTestsLoading(true);
    try {
      const res = await getMockTests();
      // Admin gets unfiltered items directly from database
      setTestsList(res);
    } catch (err: any) {
      error("Failed to load mock tests");
    } finally {
      setTestsLoading(false);
    }
  }

  // Actions: Users
  const handleTogglePaid = async (userId: string) => {
    try {
      const res = await adminTogglePaidStatus(userId);
      if (res.success) {
        success("User paid status updated!");
        loadUsers();
        // Update analytics counts too
        const stats = await adminGetAnalytics();
        setAnalytics(stats);
      } else {
        error(res.error || "Failed to update paid status");
      }
    } catch (err: any) {
      error(err.message || "Error occurred");
    }
  };

  const handleToggleRole = async (userId: string) => {
    try {
      const res = await adminToggleUserRole(userId);
      if (res.success) {
        success("User role updated successfully!");
        loadUsers();
      } else {
        error(res.error || "Failed to toggle user role");
      }
    } catch (err: any) {
      error(err.message || "Error occurred");
    }
  };

  // Actions: Payments approval
  const handleApprovePayment = async (requestId: string) => {
    if (
      !confirm(
        "Are you sure you want to approve this payment request? This will grant the user premium access."
      )
    ) {
      return;
    }

    try {
      const res = await adminApprovePaymentRequest(requestId);
      if (res.success) {
        success("Payment approved! User is now premium.");
        loadAnalyticsAndPayments();
      } else {
        error(res.error || "Failed to approve payment");
      }
    } catch (err: any) {
      error(err.message || "Error occurred");
    }
  };

  const handleRejectPayment = async (requestId: string) => {
    if (
      !confirm(
        "Are you sure you want to reject this payment request? Please provide a reason."
      )
    ) {
      return;
    }

    try {
      const res = await adminRejectPaymentRequest(requestId);
      if (res.success) {
        loadAnalyticsAndPayments();
      } else {
        error(res.error || "Failed to reject payment");
      }
    } catch (err: any) {
      error(err.message || "Error occurred");
    }
  };

  const handleBulkApprove = async () => {
    const pendingRequests = paymentsList.filter(
      (req) => req.status === "PENDING"
    );
    if (pendingRequests.length === 0) {
      info("No pending requests to approve.");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to approve all ${pendingRequests.length} pending payment requests?`
      )
    ) {
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const req of pendingRequests) {
      try {
        const res = await adminApprovePaymentRequest(req.id);
        if (res.success) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (err) {
        errorCount++;
      }
    }

    if (successCount > 0) {
      success(`Successfully approved ${successCount} payment requests.`);
    }
    if (errorCount > 0) {
      error(`Failed to approve ${errorCount} payment requests.`);
    }

    loadAnalyticsAndPayments();
  };

  // Actions: CRUD Mock Tests
  const openCreateModal = () => {
    setModalMode("create");
    setSelectedTestId(null);
    setFormTitle("");
    setFormLink("");
    setFormCategory("NON_TIMED");
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (test: any) => {
    setModalMode("edit");
    setSelectedTestId(test.id);
    setFormTitle(test.title);
    setFormLink(test.googleFormLink);
    setFormCategory(test.category || "NON_TIMED");
    setFormIsActive(test.isActive);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle || !formLink) {
      error("Title and Google Form Link are required!");
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        title: formTitle,
        googleFormLink: formLink,
        category: formCategory,
        isActive: formIsActive,
      };

      if (modalMode === "create") {
        const res = await createMockTest(payload);
        if (res.success) {
          success("New mock test created successfully!");
          setIsModalOpen(false);
          loadTests();
        } else {
          error(res.error || "Failed to create mock test");
        }
      } else if (modalMode === "edit" && selectedTestId) {
        const res = await updateMockTest(selectedTestId, payload);
        if (res.success) {
          success("Mock test updated successfully!");
          setIsModalOpen(false);
          loadTests();
        } else {
          error(res.error || "Failed to update mock test");
        }
      }
    } catch (err: any) {
      error(err.message || "An error occurred submitting mock test");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteTest = async (testId: string) => {
    if (
      confirm(
        "Are you sure you want to permanently delete this mock test? This cannot be undone."
      )
    ) {
      try {
        const res = await deleteMockTest(testId);
        if (res.success) {
          success("Mock test deleted permanently.");
          loadTests();
        } else {
          error(res.error || "Failed to delete mock test");
        }
      } catch (err: any) {
        error(err.message || "Error occurred");
      }
    }
  };

  const handleToggleTestActive = async (test: any) => {
    try {
      const res = await updateMockTest(test.id, { isActive: !test.isActive });
      if (res.success) {
        success(`Mock test ${test.isActive ? "deactivated" : "activated"}!`);
        loadTests();
      } else {
        error(res.error || "Failed to toggle test active state");
      }
    } catch (err: any) {
      error(err.message || "Error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-zinc-900 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
              <ShieldAlert className="h-8 w-8 text-rose-500" />
              Admin Portal
            </h1>
            <p className="mt-2 text-zinc-400 text-sm">
              Manage system mock tests, user permissions tiers, and verify eSewa
              payments screenshots.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-zinc-900/60 border border-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === "analytics"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Payments & Stats
            </button>
            <button
              onClick={() => {
                setActiveTab("users");
                setUsersPage(1);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === "users"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <Users className="h-4 w-4" />
              User Control
            </button>
            <button
              onClick={() => setActiveTab("tests")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === "tests"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              <Award className="h-4 w-4" />
              Mock Test CRUD
            </button>
          </div>
        </div>

        {/* Analytics stats row */}
        <div className="mb-10 grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
              Total Users
            </span>
            <span className="text-3xl font-black text-white mt-1 block">
              {analytics.totalUsers}
            </span>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
              Paid Users
            </span>
            <span className="text-3xl font-black text-emerald-400 mt-1 block">
              {analytics.paidUsers}
            </span>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
              Total Tests
            </span>
            <span className="text-3xl font-black text-white mt-1 block">
              {analytics.totalTests}
            </span>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
              Active Tests
            </span>
            <span className="text-3xl font-black text-indigo-400 mt-1 block">
              {analytics.activeTests}
            </span>
          </div>
          <div className="col-span-2 lg:col-span-1 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 backdrop-blur-md">
            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold block">
              Pending Verifications
            </span>
            <span className="text-3xl font-black text-amber-400 mt-1 block">
              {analytics.pendingPayments}
            </span>
          </div>
        </div>

        {/* Dynamic Workspace based on Active Tab */}

        {/* TAB 1: ANALYTICS & PAYMENTS VERIFICATION */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-6 md:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-indigo-400" />
                  eSewa Payment Verifications Queue
                </h2>

                {/* Bulk Actions */}
                {paymentsList.filter((req) => req.status === "PENDING").length >
                  0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleBulkApprove}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 px-3 text-xs font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                        title="Approve all pending requests"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Approve All (
                        {
                          paymentsList.filter((req) => req.status === "PENDING")
                            .length
                        }
                        )
                      </button>
                    </div>
                  )}
              </div>

              {paymentsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                </div>
              ) : paymentsList.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center text-zinc-500 text-xs">
                  No payment verification requests found in the system.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                        <th className="p-4 pl-6">Student</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Screenshot Reference</th>
                        <th className="p-4">Submitted Date</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/60 text-xs">
                      {paymentsList.map((req) => (
                        <tr
                          key={req.id}
                          className="hover:bg-zinc-900/20 text-zinc-300"
                        >
                          <td className="p-4 pl-6 font-bold text-zinc-200">
                            {req.user?.name || "User"}
                          </td>
                          <td className="p-4 font-mono text-zinc-400">
                            {req.user?.email}
                          </td>
                          <td className="p-4">
                            <a
                              href={req.paymentScreenshot}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold underline"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View Screenshot
                            </a>
                          </td>
                          <td className="p-4 text-zinc-500">
                            {new Date(req.createdAt).toLocaleString()}
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`inline-flex rounded-lg px-2.5 py-0.5 text-[9px] font-bold ${req.status === "PENDING"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : req.status === "APPROVED"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            {req.status === "PENDING" ? (
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => handleApprovePayment(req.id)}
                                  className="h-7 w-7 rounded-lg bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center"
                                  title="Approve & Grant Paid Access"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectPayment(req.id)}
                                  className="h-7 w-7 rounded-lg bg-rose-600/15 border border-rose-500/30 text-rose-400 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center"
                                  title="Reject Payment Request"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-zinc-600 font-semibold">
                                No Actions
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: USER CONTROL */}
        {activeTab === "users" && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-6 md:p-8 backdrop-blur-md space-y-6">
            {/* Search Input Bar */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={usersSearch}
                onChange={(e) => {
                  setUsersSearch(e.target.value);
                  setUsersPage(1);
                }}
                className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-zinc-100 rounded-xl py-2.5 pl-10 pr-4 transition-all duration-200 placeholder:text-zinc-600 text-xs"
              />
            </div>

            {usersLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              </div>
            ) : usersList.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center text-zinc-500 text-xs">
                No users found.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                        <th className="p-4 pl-6">Avatar</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role</th>
                        <th className="p-4 text-center">Paid Status</th>
                        <th className="p-4">Joined Date</th>
                        <th className="p-4 pr-6 text-right">Access Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/60 text-xs">
                      {usersList.map((u) => (
                        <tr
                          key={u.id}
                          className="hover:bg-zinc-900/20 text-zinc-300"
                        >
                          <td className="p-4 pl-6">
                            <img
                              src={
                                u.imageUrl ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
                              }
                              alt={u.name}
                              className="h-8 w-8 rounded-lg object-cover border border-zinc-800"
                            />
                          </td>
                          <td className="p-4 font-bold text-zinc-200">
                            {u.name || "N/A"}
                          </td>
                          <td className="p-4 font-mono text-zinc-400">
                            {u.email}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex rounded-lg px-2 py-0.5 text-[9px] font-bold ${u.role === "ADMIN"
                                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                  : "bg-zinc-800 text-zinc-400"
                                }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`inline-flex rounded-lg px-2.5 py-0.5 text-[9px] font-bold ${u.isPaid
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-zinc-800 text-zinc-500"
                                }`}
                            >
                              {u.isPaid ? "PAID" : "UNPAID"}
                            </span>
                          </td>
                          <td className="p-4 text-zinc-500">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleTogglePaid(u.id)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${u.isPaid
                                    ? "bg-zinc-850 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                    : "bg-emerald-600/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white"
                                  }`}
                              >
                                {u.isPaid ? "Revoke Access" : "Grant Access"}
                              </button>
                              <button
                                onClick={() => handleToggleRole(u.id)}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-bold border bg-zinc-850 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-rose-400 transition-colors"
                              >
                                Toggle Admin
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {usersTotalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-zinc-900 pt-6 text-xs text-zinc-500">
                    <span>
                      Page {usersPage} of {usersTotalPages}
                    </span>
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => setUsersPage((p) => Math.max(p - 1, 1))}
                        disabled={usersPage === 1}
                        className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          setUsersPage((p) => Math.min(p + 1, usersTotalPages))
                        }
                        disabled={usersPage === usersTotalPages}
                        className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB 3: MOCK TEST CRUD */}
        {activeTab === "tests" && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-6 md:p-8 backdrop-blur-md space-y-6">
            {/* CRUD Controls */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-zinc-100">
                Mock Tests Library
              </h2>
              <button
                onClick={openCreateModal}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-all active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Add Mock Test
              </button>
            </div>

            {testsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              </div>
            ) : testsList.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center text-zinc-500 text-xs">
                No mock tests created yet. Click "Add Mock Test" above to
                publish your first mock exam.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/40">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                      <th className="p-4 pl-6">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Google Form Link</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4">Created Date</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/60 text-xs">
                    {testsList.map((test) => (
                      <tr
                        key={test.id}
                        className="hover:bg-zinc-900/20 text-zinc-300"
                      >
                        <td className="p-4 pl-6 font-bold text-zinc-200">
                          {test.title}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex rounded-lg px-2.5 py-0.5 text-[9px] font-bold ${test.category === "TIMED"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}
                          >
                            {test.category || "NON_TIMED"}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-zinc-400 max-w-xs truncate">
                          <a
                            href={test.googleFormLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 underline"
                          >
                            {test.googleFormLink}
                          </a>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleTestActive(test)}
                            className={`inline-flex rounded-lg px-2.5 py-0.5 text-[9px] font-bold border transition-colors ${test.isActive
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-zinc-800"
                                : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:bg-zinc-800"
                              }`}
                          >
                            {test.isActive ? "ACTIVE" : "INACTIVE"}
                          </button>
                        </td>
                        <td className="p-4 text-zinc-500">
                          {new Date(test.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => openEditModal(test)}
                              className="h-7 w-7 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center"
                              title="Edit Mock Test"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTest(test.id)}
                              className="h-7 w-7 rounded-lg bg-rose-600/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center"
                              title="Delete Mock Test"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CRUD MODAL DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative max-w-xl w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-2xl overflow-hidden my-8">
            {/* Glowing Accent */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                {modalMode === "create"
                  ? "Publish Mock Test"
                  : "Modify Mock Test"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Row 1: Title */}
              <div>
                <label className="block text-zinc-400 font-bold mb-1.5 uppercase tracking-wider">
                  Test Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. IOE Physics Module A"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-zinc-100 rounded-xl py-2.5 px-3 transition-all duration-200 text-xs"
                  required
                />
              </div>

              {/* Row 2: Google Form Link */}
              <div>
                <label className="block text-zinc-400 font-bold mb-1.5 uppercase tracking-wider">
                  Google Form Link
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/forms/d/e/.../viewform"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-zinc-100 rounded-xl py-2.5 px-3 transition-all duration-200 text-xs"
                  required
                />
              </div>

              {/* Row 3: Category */}
              <div>
                <label className="block text-zinc-400 font-bold mb-1.5 uppercase tracking-wider">
                  Test Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) =>
                    setFormCategory(e.target.value as "TIMED" | "NON_TIMED")
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-zinc-100 rounded-xl py-2.5 px-3 transition-all duration-200 text-xs"
                >
                  <option value="NON_TIMED">Non Timed</option>
                  <option value="TIMED">Timed</option>
                </select>
              </div>

              {/* Row 4: Active State */}
              <div className="flex items-center gap-2 pl-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveCheckbox"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900 cursor-pointer"
                />
                <label
                  htmlFor="isActiveCheckbox"
                  className="text-zinc-300 font-medium cursor-pointer"
                >
                  Mock Test is Active & Visible
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 px-4 font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 font-bold text-white shadow-lg hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 active:scale-[0.98] transition-all"
                >
                  {formSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Save Mock Test
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
