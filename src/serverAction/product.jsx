"use server";

import connectToDB from "@/lib/connect";
import {
  deleteImagesFromCloudinary,
  savePhotoLocal,
  uploadImagesToCloudinary,
} from "@/lib/imageUpload";
import fs from "fs/promises";
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
        images,
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

      return {
        id: _id.toString(),
        name,
        images,
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
export const deleteProductAction = async (id, public_id) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");
    const s = await deleteImagesFromCloudinary(public_id);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(result, s);
    if (result.acknowledged == true) {
      revalidatePath("/admin-dashboard/all-products");
      return (message = "User deleted successfully");
    }
  } catch (error) {
    return error.message;
  }
};

export const CreateProducts = async (formData) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");
    const images = formData.getAll("images");
    const newFiles = await savePhotoLocal(images);
    const photos = await uploadImagesToCloudinary(newFiles);
    // newFiles.map((file) => fs.unlink(file.filepath));
    // const newPhotos = photos.map((photo) => {
    //   const newphoto = {
    //     public_id: photo.public_id,
    //     secure_url: photo.secure_url,
    //   };
    //   return newphoto;
    // });
    console.log(newFiles);
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const subCategory = formData.get("subCategory");
    const originalPrice = parseInt(formData.get("originalPrice"));
    const discountPrice = parseInt(formData.get("discountPrice"));
    const stock = parseInt(formData.get("stock"));
    const color = formData.getAll("color[]"); // Parse colors as an array
    const size = formData.getAll("size[]");
    const sellerId = formData.get("sellerId");

    const product = {
      name,
      description,
      images: photos,
      category,
      subCategory,
      tags,
      originalPrice,
      discountPrice,
      stock,
      color,
      size,
      sellerId,
      sold_out: 0,
      ratings: 0,
      reviews: [],
      createdAt: new Date(),
    };
    // const res = await collection.insertOne(product);
    console.log(product);
    // revalidatePath("/");
  } catch (error) {
    console.log(error);
    return { message: error.message };
  }
};
