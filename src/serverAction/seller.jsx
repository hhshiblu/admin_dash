"use server";

import { ObjectId } from "mongodb";
import connectToDB from "@/lib/connect";
import { revalidatePath } from "next/cache";
import { deleteFiles } from "@/lib/s3bucketUpload";

export const deleteSelleraction = async (seller) => {
  const db = await connectToDB();
  const collection = db.collection("sellers");
  try {
    if (seller?.images) {
      await deleteFiles(seller?.images?.objectkey);
    }
    const result = await collection.deleteOne({
      _id: new ObjectId(seller._id),
    });
    if (result.acknowledged == true) {
      revalidatePath("/admin-dashboard/all_sellers");
      return { message: "seller deleted successfully" };
    }
  } catch (error) {
    return { error: error.message };
  }
};
export const UpdateSellerStatus = async (id, status) => {
  const db = await connectToDB();
  const collection = db.collection("sellers");
  try {
    await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );
    revalidatePath("/admin-dashboard/all_sellers");
    return {
      success: true,
      message: "status updated successfully",
    };
  } catch (error) {
    return { error: error.message };
  }
};
