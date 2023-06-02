import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Params {
  listingId: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { listingId } = params;

    if (!listingId) {
      return NextResponse.json("Bad request");
    }

    await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json("");
  } catch (error) {
    return NextResponse.error();
  }
}
