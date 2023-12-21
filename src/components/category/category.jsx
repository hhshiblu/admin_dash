import { createCategories } from "@/serverAction/category";
import React from "react";
import CategoryList from "./categoryList";
import connectToDB from "@/lib/connect";

const getCategories = async () => {
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

async function Category() {
  const category = await getCategories();
  return (
    <div>
      <CategoryList data={category} />
    </div>
  );
}

export default Category;
