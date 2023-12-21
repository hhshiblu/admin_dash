import CategoryList from "@/components/category/categoryList";
import connectToDB from "@/lib/connect";
import { createCategories } from "@/serverAction/category";

const getCategories = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("categories");

    const category = await collection.find({}).toArray();

    // const categoryList = createCategories(category);

    return category;
  } catch (err) {
    return err.message;
  }
};
async function page() {
  const category = await getCategories();
  console.log({ category });

  return <CategoryList data={category} />;
}

export default page;
