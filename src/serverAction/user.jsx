"use server";

import { ObjectId } from "mongodb";
import connectToDB from "@/lib/connect";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("users");

    const user = await collection.find({}).toArray();
    const users = JSON.parse(JSON.stringify(user));
    return users;
  } catch (error) {
    return error.message;
  }
};

export const deleteUseraction = async (id) => {
  const db = await connectToDB();
  const collection = db.collection("users");
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.acknowledged == true) {
      revalidatePath("/admin-dashboard/all_users");
      return { message: "User deleted successfully" };
    }
  } catch (error) {
    return { error: error.message };
  }
};
