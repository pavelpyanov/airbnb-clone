import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;
    const host = req.headers.get("Origin");

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      from: "no-reply@no-reply.com",
    });

    await transporter.sendMail({
      from: "no-reply@no-reply.com",
      to: email,
      subject: "Email confirmation from Airbnb clone",
      html: `<pre>
      Dear Applicant,

Your account has been successfully created with the credentials entered by you. Please note your application details will be saved for 15 calendar days in case no activity is observed.

Please click on below link to activate your account.This link will be valid only for 2 days from the date of registration.

<a href="${host}/api/verify-email?token=${user.id}">ActivateAccount<a>

If the link is not working, copy below link into your web browser and activate the account.
${host}/api/verify-email?token=${user.id}


Thank you.

Regards,
      </pre>`,
    });

    const { hashedPassword: pass, ...rest } = user;

    return NextResponse.json(rest);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
