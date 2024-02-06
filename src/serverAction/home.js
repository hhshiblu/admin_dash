"use server";
import connectToDB from "@/lib/connect";
import { uploadFileToS3 } from "@/lib/s3bucketUpload";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const createBanar = async (FormData) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("banars");

    const file = FormData.get("file");
    const url = FormData.get("urlbanarproduct");
    console.log();
    if (!file || !url) {
      return {
        error: "All fields are required",
      };
    }

    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const res = await uploadFileToS3(buffer, file.name);
      console.log(res);
      const banar = await collection.insertOne({
        image: res,
        ProductUrl: url,
      });
      console.log(banar);
      if (banar.acknowledged == true) {
        revalidatePath("/admin-dashboard/banars");
        return {
          success: true,
          message: "banar added successfully",
        };
      } else {
        return { status: "error", message: "Failed to add category." };
      }
    } catch (error) {
      return { error: error.message };
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const getBanars = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("banars");
    const banarsData = await collection.find().toArray();
    const banars = JSON.parse(JSON.stringify(banarsData));
    return banars ? banars : [];
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
