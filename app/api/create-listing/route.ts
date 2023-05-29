import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

import { CreateListingData } from "@/app/components/modals/RentModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: File | null = formData.get("file") as unknown as File;
    const data = formData.get("data") as unknown as string;
    const parsedData: CreateListingData = JSON.parse(data);
    const currnetUser = await getCurrentUser();

    if (!file) {
      return NextResponse.json("Image not exist", { status: 401 });
    }

    if (!data) {
      return NextResponse.json("Incorrect form values", { status: 401 });
    }

    if (!currnetUser) {
      return NextResponse.json("Authorization required", { status: 401 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const shortPath = `/images/listings/${randomUUID()}-${file.name}`;
    const path = `${process.cwd()}/public${shortPath}`;
    await writeFile(path, buffer);

    await prisma.listing.create({
      data: {
        title: parsedData.title,
        category: parsedData.category,
        bathCount: Number(parsedData.bathroomCount),
        description: parsedData.description,
        guestCount: Number(parsedData.guestCount),
        imageSrc: shortPath,
        price: Number(parsedData.price),
        roomCount: Number(parsedData.roomCount),
        locationValue: parsedData.location?.value || "",
        userId: currnetUser.id,
      },
    });

    return NextResponse.json("Listing succesfully created");
  } catch (error) {
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
