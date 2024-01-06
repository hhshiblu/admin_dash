import React, { Suspense } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";

import { MdBorderClear } from "react-icons/md";

import Link from "next/link";
import MainInformation from "@/components/adminInfo/mainInformation";
import Orders from "@/components/orders/orders";
import { admininfo } from "@/serverAction/admininfo";
import { getOrders } from "@/serverAction/order/order";

const DashboardHero = async () => {
  const orderInfo = await admininfo();
  const orders = await getOrders();

  return (
    <div className="w-full md:w-[calc(100%-300px)] ml-auto p-8  h-[90vh] overflow-y-scroll overflow-hidden">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <Suspense fallback={true}>
        <MainInformation info={orderInfo} />
      </Suspense>
      <br />
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
