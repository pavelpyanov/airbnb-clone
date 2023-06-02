import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Params {
  reservationId: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { reservationId } = params;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json("Not authorized", { status: 400 });
    }

    if (!reservationId) {
      return NextResponse.json("Reservation not found", { status: 404 });
    }

    await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser?.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json("");
  } catch (error) {
    return NextResponse.error();
  }
}
