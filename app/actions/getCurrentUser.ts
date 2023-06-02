import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { SafeUser } from "../types";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) {
      return null;
    } else {
      const { hashedPassword, ...rest } = currentUser;

      return {
        ...rest,
        emailVerified: rest.emailVerified?.toISOString() || null,
        updatedAt: rest.updatedAt.toISOString(),
        createdAt: rest.createdAt.toISOString(),
      };
    }
  } catch (error: any) {
    return null;
  }
}
