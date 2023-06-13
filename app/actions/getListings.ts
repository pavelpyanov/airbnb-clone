import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

export interface ListingParams {
  category?: string;
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}

export default async function getListings(
  params: ListingParams
): Promise<SafeListing[]> {
  const {
    category,
    userId,
    bathroomCount,
    guestCount,
    locationValue,
    roomCount,
    startDate,
    endDate,
  } = params;
  const query: any = {};

  if (category) {
    query.category = category;
  }
  if (roomCount) {
    query.roomCount = {
      gte: +roomCount,
    };
  }
  if (bathroomCount) {
    query.bathCount = {
      gte: +bathroomCount,
    };
  }
  if (guestCount) {
    query.guestCount = {
      gte: +guestCount,
    };
  }
  if (locationValue) {
    query.locationValue = locationValue;
  }
  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            { endDate: { gte: startDate }, startDate: { lte: startDate } },
            { startDate: { lte: endDate }, endDate: { gte: endDate } },
          ],
        },
      },
    };
  }
  if (userId) {
    query.userId = userId;
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
