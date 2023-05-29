import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const emailExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailExist) {
      return NextResponse.json("User already exist", { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    const { hashedPassword: pass, ...rest } = user;

    return NextResponse.json(rest);
  } catch (error) {
    return NextResponse.json("Internal error", { status: 500 });
  }
}
