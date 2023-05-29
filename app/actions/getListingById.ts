import prisma from "@/app/libs/prismadb";
import { SafeListing, SafeUser } from "../types";

export default async function getListingById(
  id: string
): Promise<(SafeListing & { user: SafeUser }) | null> {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    const { hashedPassword, ...userRest } = listing.user;

    const safeListing: SafeListing & { user: SafeUser } = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...userRest,
        createdAt: userRest.createdAt.toISOString(),
        updatedAt: userRest.updatedAt.toISOString(),
        emailVerified: userRest.emailVerified?.toISOString() || null,
      },
    };

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
