import CategoryList from "@/components/category/categoryList";
import { getCategories } from "@/serverAction/category";

export const dynamic = "force-dynamic";

async function page() {
  const category = await getCategories();
  return <CategoryList data={category} />;
}

export default page;
