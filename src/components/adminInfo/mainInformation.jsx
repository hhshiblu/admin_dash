import Link from "next/link";
import React from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";

function MainInformation() {
  return (
    <div>
      <div className="w-full flex flex-wrap mx-auto gap-4">
        <div className="w-[260px] mb-4 800px:w-[30%] min-h-[20vh] bg-[#1877F2] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`font-Roboto text-white !text-[18px] leading-5 !font-[400] `}
            >
              Account Balance
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-white text-[22px] font-[500]">
            9000
          </h5>
          <Link href="/seller_dashboard/withdraw-money">
            <h5 className="pt-4 pl-[2] text-white">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-[260px] text-white mb-4 800px:w-[30%] min-h-[20vh] bg-[#F0284A] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3 className={` font-Roboto  !text-[18px] leading-5 !font-[400] `}>
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {/* {orders && orders.length} */}
            80
          </h5>
          <Link href="/seller_DashBoard/all-orders">
            <h5 className="pt-4 pl-2 ">View Orders</h5>
          </Link>
        </div>

        <div className="w-[260px] text-white mb-4 800px:w-[30%] min-h-[20vh] bg-[#2ABBA7] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3 className={` font-Roboto  !text-[18px] leading-5 !font-[400] `}>
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">7</h5>
          <Link href="/seller_dashboard/all-Products">
            <h5 className="pt-4 pl-2 ">View Products</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainInformation;
