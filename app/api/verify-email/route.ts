import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${req.nextUrl.origin}/not-found`);
  }

  try {
    await prisma.user.update({
      where: {
        id: token,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return NextResponse.redirect(`${req.nextUrl.origin}/email-activated`);
  } catch (error) {
    return NextResponse.redirect(`${req.nextUrl.origin}/not-found`);
  }
}
