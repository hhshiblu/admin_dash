import CategoryList from "@/components/category/categoryList";
import connectToDB from "@/lib/connect";
import { createCategories } from "@/serverAction/category";
import { Suspense } from "react";

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
async function page() {
  const category = await getCategories();
  return <CategoryList data={category} />;
}

export default page;
