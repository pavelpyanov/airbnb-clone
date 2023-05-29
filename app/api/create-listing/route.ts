import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

import { CreateListingData } from "@/app/components/modals/RentModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";
import cloudinary from "cloudinary";

// const uploadImage = async (imagePath) => {
//   // Use the uploaded file's name as the asset's public ID and
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//     secure: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.v2.uploader.fi(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }
// };

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

    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // const shortPath = `/images/listings/${randomUUID()}-${file.name}`;
    // const path = `${process.cwd()}/public${shortPath}`;
    // await writeFile(path, buffer);

    const imageFormData = new FormData();
    imageFormData.set("file", file);
    imageFormData.append(
      "api_key",
      process.env.CLOUDINARY_CLOUD_API_KEY as string
    );

    imageFormData.append("upload_preset", "likq3xc2");

    const res = await axios.request<{ url: string }>({
      url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: imageFormData,
    });

    await prisma.listing.create({
      data: {
        title: parsedData.title,
        category: parsedData.category,
        bathCount: Number(parsedData.bathroomCount),
        description: parsedData.description,
        guestCount: Number(parsedData.guestCount),
        imageSrc: res.data.url,
        price: Number(parsedData.price),
        roomCount: Number(parsedData.roomCount),
        locationValue: parsedData.location?.value || "",
        userId: currnetUser.id,
      },
    });

    return NextResponse.json("Listing succesfully created");
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
