"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { syncUser } from "./user";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// Internal schema for validation (not exported)
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  googleFormLink: z.string().url("Must be a valid Google Form URL"),
  category: z.enum(["TIMED", "NON_TIMED"]).default("NON_TIMED"),
  isActive: z.boolean().default(true),
});

type MockTestInput = z.infer<typeof formSchema>;

// Helper to check if current user is admin
async function requireAdmin() {
  const dbUser = await syncUser();
  if (!dbUser || dbUser.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
  return dbUser;
}

// Fetch all mock tests, filtering Google Form links based on user status
export async function getMockTests() {
  try {
    const { userId } = await auth();

    // Fetch tests
    const tests = await prisma.mockTest.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!userId) {
      // Unauthenticated users see tests with stripped links
      return tests.map((test) => ({
        ...test,
        googleFormLink: "", // Protected
      }));
    }

    // Authenticated: check if they are admin or paid
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    const hasAccess = dbUser?.role === "ADMIN" || dbUser?.isPaid === true;

    return tests.map((test) => ({
      ...test,
      googleFormLink: hasAccess ? test.googleFormLink : "", // Protected if not paid/admin
    }));
  } catch (error) {
    console.error("Error in getMockTests action:", error);
    return [];
  }
}

// Fetch a single mock test by ID
export async function getMockTestById(id: string) {
  try {
    const { userId } = await auth();

    const test = await prisma.mockTest.findUnique({
      where: { id },
    });

    if (!test) return null;

    if (!userId) {
      return { ...test, googleFormLink: "" };
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    const hasAccess = dbUser?.role === "ADMIN" || dbUser?.isPaid === true;

    return {
      ...test,
      googleFormLink: hasAccess ? test.googleFormLink : "", // Protected if not paid/admin
    };
  } catch (error) {
    console.error("Error in getMockTestById action:", error);
    return null;
  }
}

// Create a new mock test (Admin only)
export async function createMockTest(input: MockTestInput) {
  try {
    await requireAdmin();

    const validated = formSchema.parse(input);

    const newTest = await prisma.mockTest.create({
      data: validated,
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: true, test: newTest };
  } catch (error: any) {
    console.error("Error in createMockTest action:", error);
    return {
      success: false,
      error: error.message || "Failed to create mock test",
    };
  }
}

// Update an existing mock test (Admin only)
export async function updateMockTest(
  id: string,
  input: Partial<MockTestInput>,
) {
  try {
    await requireAdmin();

    const updateSchema = formSchema.partial();
    const validated = updateSchema.parse(input);

    const updatedTest = await prisma.mockTest.update({
      where: { id },
      data: validated,
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");
    revalidatePath(`/dashboard/mock-tests/${id}`);
    return { success: true, test: updatedTest };
  } catch (error: any) {
    console.error("Error in updateMockTest action:", error);
    return {
      success: false,
      error: error.message || "Failed to update mock test",
    };
  }
}

// Delete a mock test (Admin only)
export async function deleteMockTest(id: string) {
  try {
    await requireAdmin();

    await prisma.mockTest.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteMockTest action:", error);
    return {
      success: false,
      error: error.message || "Failed to delete mock test",
    };
  }
}
