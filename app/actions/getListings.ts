import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

export interface ListingParams {
  category?: string;
}

export default async function getListings(
  params: ListingParams
): Promise<SafeListing[]> {
  const { category } = params;
  const query: any = {};

  if (category) {
    query.category = category;
  }

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
