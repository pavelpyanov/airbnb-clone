import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${req.nextUrl.origin}/not-found`);
  }

  try {
    const user = await prisma.user.updateMany({
      where: {
        hash: token,
      },
      data: {
        emailVerified: new Date(),
        hash: randomUUID(),
      },
    });

    if (!user.count) {
      return NextResponse.redirect(`${req.nextUrl.origin}/not-found`);
    }

    return NextResponse.redirect(`${req.nextUrl.origin}/email-activated`);
  } catch (error) {
    return NextResponse.redirect(`${req.nextUrl.origin}/not-found`);
  }
}
