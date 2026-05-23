"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) {
      console.error("Clerk user has no email address:", clerkUser.id);
      return null;
    }

    // Check if the user already exists in the database
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || clerkUser.username || "User";
    const imageUrl = clerkUser.imageUrl;

    if (!dbUser) {
      // First-time sync: Create the user in PostgreSQL
      // Check if there are any users in the system. If this is the first user, make them ADMIN!
      // This is a great DX (developer experience) feature, allowing the first user to automatically become an admin to test things out.
      const userCount = await prisma.user.count();
      const role = userCount === 0 ? "ADMIN" : "USER";

      dbUser = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          name,
          email,
          imageUrl,
          role,
          isPaid: false,
        },
      });
      console.log(`Created new user in db: ${email} with role: ${role}`);
    } else {
      // Update details if they changed in Clerk
      if (dbUser.name !== name || dbUser.imageUrl !== imageUrl || dbUser.email !== email) {
        dbUser = await prisma.user.update({
          where: { clerkId: clerkUser.id },
          data: {
            name,
            email,
            imageUrl,
          },
        });
        console.log(`Updated user details in db: ${email}`);
      }
    }

    return dbUser;
  } catch (error) {
    console.error("Error in syncUser server action:", error);
    return null;
  }
}

export async function getDbUser(clerkId: string) {
  try {
    return await prisma.user.findUnique({
      where: { clerkId },
    });
  } catch (error) {
    console.error("Error getting database user:", error);
    return null;
  }
}
