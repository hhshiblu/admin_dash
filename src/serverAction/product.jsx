"use server";
import connectToDB from "@/lib/connect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
export const getProducts = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");

    const products = await collection.find({}).toArray();
    const plainProducts = products.map((products) => {
      const {
        _id,
        name,
        originalPrice,
        discountPrice,
        sold_out,
        stock,
        createdAt,
      } = products;

      // date formated
      const dateObject = new Date(createdAt);
      const formattedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;
      // date object

      return {
        id: _id.toString(),
        name,
        originalPrice,
        discountPrice,
        sold_out,
        stock,
        createdAt: formattedDate,
      };
    });
    return plainProducts;
  } catch (error) {
    return error.message;
  }
};

export const getProduct = async (id) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");

    const product = await collection.findOne({ _id: ObjectId(id) });
    return product;
  } catch (error) {
    return error.message;
  }
};
export const deleteProductAction = async (id) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.acknowledged == true) {
      revalidatePath("/admin-dashboard/all-products");
      return (message = "User deleted successfully");
    }
  } catch (error) {
    return error.message;
  }
};
