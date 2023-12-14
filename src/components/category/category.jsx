import { getCategories } from "@/serverAction/category";
import React from "react";
import CategoryList from "./categoryList";

async function Category() {
  const category = await getCategories();
  return <div>{<CategoryList data={category} />}</div>;
}

export default Category;
