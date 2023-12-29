import { getCategories } from "@/serverAction/category";
import ProductForm from "./productForm";

async function CreateProduct() {
  const categories = await getCategories();
  return (
    <div className="w-full md:w-[calc(100%-300px)] ml-auto  bg-white   shadow h-[91vh] rounded-[4px] p-4 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center py-2">
        Create Product
      </h5>
      <ProductForm categories={categories} />
    </div>
  );
}

export default CreateProduct;
