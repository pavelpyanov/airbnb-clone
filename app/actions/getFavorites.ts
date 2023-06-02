import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

const getFavorites = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const listings = await prisma.listing.findMany({
    where: {
      id: {
        in: [...currentUser.favoriteIds],
      },
    },
  });

  const safeListings = listings.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return safeListings;
};

export default getFavorites;
