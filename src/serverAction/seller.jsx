"use server";

import { ObjectId } from "mongodb";
import connectToDB from "@/lib/connect";
import { revalidatePath } from "next/cache";

export const getSellers = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("shops");

    const seller = await collection.find({}).toArray();

    const sellers = JSON.parse(JSON.stringify(seller));
    return sellers;
  } catch (error) {
    return error.message;
  }
};

export const deleteSelleraction = async (id) => {
  const db = await connectToDB();
  const collection = db.collection("shops");
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.acknowledged == true) {
      revalidatePath("/admin-dashboard/all_sellers");
      return (message = "User deleted successfully");
    }
  } catch (error) {
    return error.message;
  }
};
export const UpdateSellerStatus = async (id, status) => {
  const db = await connectToDB();
  const collection = db.collection("shops");
  try {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result) {
      revalidatePath("/admin-dashboard/all_sellers");
      return (message = "User deleted successfully");
    }
  } catch (error) {
    return error.message;
  }
};
