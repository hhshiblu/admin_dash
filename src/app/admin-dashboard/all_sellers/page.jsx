import Orders from "@/components/orders/orders";
import SellerData from "@/components/seller/sellerData";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="min-h-[80vh] ">
      <div className=" py-4 pl-8 text-[17px] font-semibold ">
        <h2>All sellers</h2>
      </div>
      <hr className="px-6" />
      <hr className="px-6" />
      <div className="px-4 pt-2">
        <Suspense fallback={<p>loading ..</p>}>
          <SellerData />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
