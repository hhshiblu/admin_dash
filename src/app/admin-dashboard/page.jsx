import React, { Suspense } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";

import { MdBorderClear } from "react-icons/md";

import Link from "next/link";
import MainInformation from "@/components/adminInfo/mainInformation";
import Orders from "@/components/orders/orders";

const DashboardHero = () => {
  const availableBalance = 234;

  return (
    <div className="w-full p-8  h-[90vh] overflow-y-scroll overflow-hidden">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <Suspense fallback={true}>
        <MainInformation />
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
