import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { sendVerificationMail } from "@/app/libs/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;
    const host = req.headers.get("Origin") || "";

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

    await sendVerificationMail({ host, id: user.hash, to: email });

    const { hashedPassword: pass, hash, ...rest } = user;

    return NextResponse.json(rest);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
