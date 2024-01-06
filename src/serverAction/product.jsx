"use server";

import connectToDB from "@/lib/connect";
import { savePhotoLocal } from "@/lib/imageUpload";
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
    // const s = await deleteImagesFromCloudinary(public_id);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

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
    console.log(images);
    const newFiles = await savePhotoLocal(images);
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
      images: newFiles,
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
    const res = await collection.insertOne(product);
    console.log(res);
    revalidatePath("/");
    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    if (newFiles && newFiles.length > 0) {
      await deleteUploadedImages(newFiles);
    }

    return { message: error.message };
  }
};

const deleteUploadedImages = async (files) => {
  const promises = files.map(async (file) => {
    const filePath = path.join(
      process.cwd(),
      "public",
      "upload",
      file.filename
    );
    await fs.unlink(filePath);
  });

  await Promise.all(promises);
};

const dfsv = async (files) => {
  const promises = files.map(async (file) => {
    const filePath = path.join(
      process.cwd(),
      "public",
      "upload",
      file.filename
    );
    await fs.unlink(filePath);
  });

  await Promise.all(promises);
};
