"use server";

import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

export async function savePhotoLocal(formData) {
  const uploadPromises = formData.map(async (file) => {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const originalFilename = file.name;
    const ext = path.extname(originalFilename).toLowerCase();
    const uniqueFilename = `${uuidv4()}_${new Date().getTime()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", uniqueFilename);

    try {
      await fs.writeFile(uploadDir, buffer);
      console.log("File saved successfully:", uniqueFilename);
    } catch (error) {
      console.error("Error saving file:", error);
      throw error; // Rethrow the error to handle it at a higher level if needed
    }

    return { filename: uniqueFilename };
  });

  return Promise.all(uploadPromises);
}
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function uploadImagesToCloudinary(newFiles) {
  const multiplePhotos = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filepath, { folder: "rajdhola" })
  );
  return await Promise.all(multiplePhotos);
}

// export async function deleteImagesFromCloudinary() {}

export const deleteProduct = async (id) => {
  try {
    const res = await cloudinary.uploader.destroy(id);
    revalidatePath("/admin-dashboard/create-product");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const droduct = async (id) => {
  try {
    const res = await cloudinary.uploader.destroy(id);
    revalidatePath("/admin-dashboard/create-product");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
