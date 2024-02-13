"use server";
import connectToDB from "@/lib/connect";
import { uploadFileToS3 } from "@/lib/s3bucketUpload";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { Fragment } from "react";

export const createBanar = async (FormData) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("banars");
    const type = FormData.get("type");
    const file = FormData.get("file");
    const url = FormData.get("urlbanarproduct");
    if (!file || !url || !type) {
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
      const banar = await collection.insertOne({
        image: res,
        ProductUrl: url,
        type: type,
        role: 0,
        createdAt: new Date(),
      });

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
export const deleteBanners = async (bannerId) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("banars");

    const result = await collection.deleteOne({ _id: new ObjectId(bannerId) });
    if (result.acknowledged === true) {
      revalidatePath("/admin-dashboard/banar");
      return { success: true, message: "Banner deleted successfully" };
    }
  } catch (error) {
    return { error: error.message };
  }
};
export const updateBannerRoles = async (bannerId) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("banars");

    const banner = await collection.findOne({ _id: new ObjectId(bannerId) });

    if (!banner) {
      return { status: "error", message: "Banner not found" };
    }

    const newRole = banner.role === 1 ? 0 : 1;

    const res = await collection.updateOne(
      { _id: new ObjectId(bannerId) },
      { $set: { role: newRole } }
    );
    if (res.acknowledged === true) {
      revalidatePath("/admin-dashboard/banar");
      return { success: true, message: "Banner role updated successfully" };
    }
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
