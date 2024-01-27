"use server";

import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

// import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

export async function savePhotoLocal(formData) {
  const uploadPromises = formData.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];
      const tempdir = os.tmpdir();

      const uploadDir = path.join(tempdir, `/${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir, filename: file.name };
    })
  );

  return await Promise.all(uploadPromises);
}

// export async function uploadImagesToCloudinary(newFiles) {
//   const multiplePhotos = newFiles.map((file) =>
//     cloudinary.v2.uploader.upload(file.filepath, { folder: "raj" })
//   );
//   return await Promise.all(multiplePhotos);
// }

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

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
});

export const uploadImagesToCloudinary = async (images) => {
  const uploadPromises = images.map(async (image) => {
    const buffer = await image.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "img",
        },
        (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(bytes);
    });
  });

  return Promise.all(uploadPromises);
};
