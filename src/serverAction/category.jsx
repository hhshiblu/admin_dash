"use server";
import connectToDB from "@/lib/connect";
import { uploadFileToS3 } from "@/lib/s3bucketUpload";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import shortid from "shortid";
import slugify from "slugify";

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id.toString(),
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

export const getCategories = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("categories");

    const category = await collection.find({}).toArray();

    const categoryList = createCategories(category);
    return categoryList;
  } catch (err) {
    return err.message;
  }
};

export const deleteCate = async (ids) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("categories");

    const objectIdArray = ids.map((id) => ({ _id: new ObjectId(id._id) }));
    const res = await collection.deleteMany({
      $or: objectIdArray,
    });
    if (res.acknowledged == true) {
      revalidatePath("/admin-dashboard/category");
      return {
        message: "category deleted successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack,
      },
    };
  }
};

export const addCategory = async (FormData) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("categories");
    const file = FormData.get("file");
    const name = FormData.get("name");
    const parentId = FormData.get("parentId");

    if (!name) {
      return {
        error: "name field is required",
      };
    }
    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }
    const categoryObj = {
      name: name,
      slug: `${slugify(name)}-${shortid.generate()}`,
    };
    if (parentId !== "select category") {
      categoryObj.parentId = parentId;
    } else {
      categoryObj.parentId = null;
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const res = await uploadFileToS3(buffer, file.name);
    categoryObj.image = res;

    const cate = await collection.insertOne(categoryObj);
    if (cate.acknowledged == true) {
      revalidatePath("/admin-dashboard/category");
      return {
        success: true,
        message: "category added successfully",
      };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const Updatecate = async ({ _id, name }) => {
  const db = await connectToDB();
  const collection = db.collection("categories");
  try {
    await collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { name } }
    );
    revalidatePath("/admin-dashboard/categories");
    return {
      success: true,
      message: "Updated category successfully",
    };
  } catch (error) {
    return { error: error.message };
  }
};
