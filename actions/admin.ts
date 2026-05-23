"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import { syncUser } from "./user";

// Helper to enforce admin permission
async function requireAdmin() {
  const dbUser = await syncUser();
  if (!dbUser || dbUser.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
  return dbUser;
}

// 1. Get all users for admin table
export async function adminGetUsers(searchQuery = "", page = 1, pageSize = 10) {
  try {
    await requireAdmin();

    const where: any = {};
    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { email: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const total = await prisma.user.count({ where });
    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      users,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error: any) {
    console.error("Error in adminGetUsers:", error);
    throw new Error(error.message || "Failed to fetch users");
  }
}

// 2. Toggle user's Paid Status
export async function adminTogglePaidStatus(userId: string) {
  try {
    await requireAdmin();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        isPaid: !user.isPaid,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return { success: true, user: updated };
  } catch (error: any) {
    console.error("Error in adminTogglePaidStatus:", error);
    return { success: false, error: error.message };
  }
}

// 3. Promote/Demote user role
export async function adminToggleUserRole(userId: string) {
  try {
    const admin = await requireAdmin();

    // Prevent self-demotion
    if (admin.id === userId) {
      throw new Error("You cannot change your own role");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin");
    return { success: true, user: updated };
  } catch (error: any) {
    console.error("Error in adminToggleUserRole:", error);
    return { success: false, error: error.message };
  }
}

// 4. Get Admin Analytics
export async function adminGetAnalytics() {
  try {
    await requireAdmin();

    const totalUsers = await prisma.user.count();
    const paidUsers = await prisma.user.count({ where: { isPaid: true } });
    const totalTests = await prisma.mockTest.count();
    const activeTests = await prisma.mockTest.count({ where: { isActive: true } });
    const pendingPayments = await prisma.paymentRequest.count({
      where: { status: "PENDING" },
    });

    return {
      totalUsers,
      paidUsers,
      totalTests,
      activeTests,
      pendingPayments,
    };
  } catch (error: any) {
    console.error("Error in adminGetAnalytics:", error);
    return {
      totalUsers: 0,
      paidUsers: 0,
      totalTests: 0,
      activeTests: 0,
      pendingPayments: 0,
    };
  }
}

// 5. Submit Payment Request (Client Action called by normal authenticated users)
export async function submitPaymentRequest(screenshotUrl: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      throw new Error("User not found in database");
    }

    // Check if there is already a pending request
    const existing = await prisma.paymentRequest.findFirst({
      where: {
        userId: userId,
        status: "PENDING",
      },
    });

    if (existing) {
      throw new Error("You already have a pending payment request. Please wait for admin approval.");
    }

    const newRequest = await prisma.paymentRequest.create({
      data: {
        userId: userId,
        paymentScreenshot: screenshotUrl,
        status: "PENDING",
      },
    });

    revalidatePath("/pricing");
    return { success: true, request: newRequest };
  } catch (error: any) {
    console.error("Error in submitPaymentRequest:", error);
    return { success: false, error: error.message };
  }
}

// 6. Get all payment requests (Admin only)
export async function adminGetPaymentRequests() {
  try {
    await requireAdmin();

    return await prisma.paymentRequest.findMany({
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error: any) {
    console.error("Error in adminGetPaymentRequests:", error);
    return [];
  }
}

// 7. Approve payment request (Admin only)
export async function adminApprovePaymentRequest(requestId: string) {
  try {
    await requireAdmin();

    const request = await prisma.paymentRequest.findUnique({
      where: { id: requestId },
      include: { user: true },
    });

    if (!request) {
      throw new Error("Payment request not found");
    }

    // Update payment request status to APPROVED
    await prisma.paymentRequest.update({
      where: { id: requestId },
      data: { status: "APPROVED" },
    });

    // Update the corresponding user to isPaid = true
    await prisma.user.update({
      where: { clerkId: request.userId },
      data: { isPaid: true },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/pricing");
    return { success: true };
  } catch (error: any) {
    console.error("Error in adminApprovePaymentRequest:", error);
    return { success: false, error: error.message };
  }
}

// 8. Reject payment request (Admin only)
export async function adminRejectPaymentRequest(requestId: string) {
  try {
    await requireAdmin();

    const request = await prisma.paymentRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new Error("Payment request not found");
    }

    // Update payment request status to REJECTED
    await prisma.paymentRequest.update({
      where: { id: requestId },
      data: { status: "REJECTED" },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error in adminRejectPaymentRequest:", error);
    return { success: false, error: error.message };
  }
}

// Check current user's payment request status
export async function getUserPaymentRequestStatus() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    return await prisma.paymentRequest.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error in getUserPaymentRequestStatus:", error);
    return null;
  }
}
