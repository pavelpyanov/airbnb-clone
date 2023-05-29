import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Params {
  listingId: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();
    const { listingId } = params;

    if (!currentUser) {
      return NextResponse.json("Not authorised", {
        status: 401,
      });
    }

    let favoriteIds = currentUser.favoriteIds || [];

    if (favoriteIds.includes(listingId)) {
      favoriteIds = favoriteIds.filter((item) => item !== listingId);
    } else {
      favoriteIds.push(listingId);
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json("ok");
  } catch (error) {
    return NextResponse.error();
  }
}
