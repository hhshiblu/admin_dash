import { getProducts } from "@/serverAction/product";
import React from "react";
import { DataProductTable } from "./cardproducts";

async function Products() {
  const products = await getProducts();

  return (
    <div>
      <DataProductTable data={products} />
    </div>
  );
}

export default Products;
