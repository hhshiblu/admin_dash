import React, { Suspense } from "react";

import Link from "next/link";
import MainInformation from "@/components/adminInfo/mainInformation";
import Orders from "@/components/orders/orders";
import { admininfo } from "@/serverAction/admininfo";
import { getOrders } from "@/serverAction/order/order";

const DashboardHero = async () => {
  const orderInfo = await admininfo();

  return (
    <div className="w-full  ml-auto   h-[87vh] overflow-y-scroll overflow-hidden">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <Suspense fallback={true}>
        <MainInformation info={orderInfo} />
      </Suspense>
      <br />
      <Link href="/admin-dashboard/product-details/659929426fe01f0db116910c">
        allah borosha
      </Link>
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[49vh] bg-white rounded px-2">
        <Suspense fallback={<p>Loading...</p>}>
          <Orders />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardHero;
