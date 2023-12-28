import { DataProductTable } from "@/components/products/productTable";

import { getProducts } from "@/serverAction/product";

async function page() {
  const products = await getProducts();
  return (
    <div>
      <div className="px-4 pt-2">
        <DataProductTable data={products} />
      </div>
    </div>
  );
}

export default page;
