import { ImageListType } from "react-images-uploading";
import fs from "fs/promises";
import path from "path";

const saveImage = async (images: ImageListType, name: string) => {
  const filePath = path.join(process.cwd(), "public", name);

  try {
    await fs.writeFile(filePath, images[0].data_url);
    return filePath;
  } catch (error) {
    throw error;
  }
};

export default saveImage;
