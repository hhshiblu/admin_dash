import Products from "@/components/products/products";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="max-h-[89vh] overflow-y-scroll overflow-hidden">
      <div className=" py-4 pl-8 text-[17px] font-semibold ">
        <h2>All Products</h2>
      </div>
      <hr className="px-6" />
      <hr className="px-6" />
      <div className="px-4 pt-2">
        <Suspense fallback={<p>loading ..</p>}>
          <Products />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
