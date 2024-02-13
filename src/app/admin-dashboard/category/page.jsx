import CategoryList from "@/components/category/categoryList";
import { allCategories, getCategories } from "@/serverAction/category";

export const dynamic = "force-dynamic";

async function page() {
  const category = await getCategories();
  const Categories = await allCategories();
  return <CategoryList data={category} allCate={Categories} />;
}

export default page;
