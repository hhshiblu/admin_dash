import Orders from "@/components/orders/orders";
import React, { Suspense } from "react";
export const dynamic = "force-dynamic";
function page() {
  return (
    <div className=" w-full  max-h-[80vh]   scroll_y_hiiden overflow-y-auto">
      <div className=" py-4 pl-8 text-[17px] font-semibold ">
        <h2>All Orders</h2>
      </div>
      <hr className="px-6" />
      <hr className="px-6" />
      <div className="px-4 pt-2">
        <Suspense fallback={<p>loading ..</p>}>
          <Orders />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
