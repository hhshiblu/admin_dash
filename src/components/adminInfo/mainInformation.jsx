"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";

function MainInformation({ info }) {
  const [detailsOrder, setDetailsOrder] = useState(false);
  return (
    <div>
      <div className="w-full flex flex-wrap mx-auto gap-4">
        <div className="sm:w-[260px] w-full mb-4 800px:w-[30%] min-h-[20vh] bg-[#1877F2] shadow rounded px-2 py-5">
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
            {info?.totalOrder_ByStatus.delivered?.totalPrice}
          </h5>
          <Link href="/seller_dashboard/withdraw-money">
            <h5 className="pt-4 pl-[2] text-white">Withdraw Money</h5>
          </Link>
        </div>

        <div className="sm:w-[260px] w-full text-white mb-4 800px:w-[30%] min-h-[20vh] bg-[#F0284A] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" color="white" />
            <h3 className={` font-Roboto  !text-[18px] leading-2 !font-[400] `}>
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {info?.totalOrders}
          </h5>
          <div className="flex items-center justify-between px-3">
            <Link href="/seller_DashBoard/all-orders">
              <h5 className="pt-4 pl-2 ">View All</h5>
            </Link>

            <h5
              className="pt-4 pl-2 cursor-pointer "
              onClick={() => setDetailsOrder(!detailsOrder)}
            >
              Details
            </h5>
          </div>
        </div>

        <div className="sm:w-[260px] w-full text-white mb-4 800px:w-[30%] min-h-[20vh] bg-[#2ABBA7] shadow rounded px-2 py-5">
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
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {info?.totalProducts}
          </h5>
          <Link href="/seller_dashboard/all-Products">
            <h5 className="pt-4 pl-2 ">View Products</h5>
          </Link>
        </div>

        <div className="sm:w-[260px] w-full text-white mb-4 800px:w-[30%] min-h-[20vh] bg-[#1877F2] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3 className={` font-Roboto  !text-[18px] leading-5 !font-[400] `}>
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {info?.totalOrders}
          </h5>
          <Link href="/seller_DashBoard/all-orders">
            <h5 className="pt-4 pl-2 ">View Orders</h5>
          </Link>
        </div>
      </div>
      <div
        className="h-[0px] overflow-hidden  duration-700"
        style={{ minHeight: detailsOrder ? "20vh" : "0px" }}
      >
        <div className="w-full text-white mb-4  bg-gradient-to-r from-[#F0284A] to-[#1877F2] shadow rounded px-2 py-5  flex gap-10 flex-col justify-around md:flex-row items-center">
          <div className=" ">
            <div className="flex gap-2 items-center">
              <MdBorderClear size={30} className="mr-2" color="white" />
              <h3 className="font-Roboto !text-[16px] leading-2 !font-[400]">
                Pending Orders
              </h3>
            </div>

            <h5 className="py-3 text-[15px] font-[500]">
              Total products :{" "}
              {info?.totalOrder_ByStatus.pending?.totalProducts}
            </h5>
            <h2>
              {" "}
              Total Price : {info?.totalOrder_ByStatus.pending?.totalPrice}
            </h2>
          </div>
          <div className=" ">
            <div className="flex gap-2 items-center">
              <MdBorderClear size={30} className="mr-2" color="white" />
              <h3 className="font-Roboto !text-[16px] leading-2 !font-[400]">
                Pending Orders
              </h3>
            </div>

            <h5 className="py-3 text-[15px] font-[500]">
              Total products :{" "}
              {info?.totalOrder_ByStatus.pending?.totalProducts}
            </h5>
            <h2>
              {" "}
              Total Price : {info?.totalOrder_ByStatus.pending?.totalPrice}
            </h2>
          </div>
          <div className=" ">
            <div className="flex gap-2 items-center">
              <MdBorderClear size={30} className="mr-2" color="white" />
              <h3 className="font-Roboto !text-[16px] leading-2 !font-[400]">
                Pending Orders
              </h3>
            </div>

            <h5 className="py-3 text-[15px] font-[500]">
              Total products :{" "}
              {info?.totalOrder_ByStatus.pending?.totalProducts}
            </h5>
            <h2>
              {" "}
              Total Price : {info?.totalOrder_ByStatus.pending?.totalPrice}
            </h2>
          </div>
          <div className=" ">
            <div className="flex gap-2 items-center">
              <MdBorderClear size={30} className="mr-2" color="white" />
              <h3 className="font-Roboto !text-[16px] leading-2 !font-[400]">
                Delivered Orders
              </h3>
            </div>

            <h5 className="py-4 text-[15px] font-[500]">
              Total products :{" "}
              {info.totalOrder_ByStatus.delivered?.totalProducts}
            </h5>
            <h2>
              {" "}
              Total Price : {info.totalOrder_ByStatus.delivered?.totalPrice}
            </h2>
          </div>
        </div>
      </div>
      <div
        className="h-[0px] overflow-hidden  duration-700"
        style={{ minHeight: detailsOrder ? "20vh" : "0px" }}
      >
        <div className="w-full text-white mb-4  bg-gradient-to-r from-[#F0284A] to-[#1877F2] shadow rounded px-2 py-5  flex gap-10 flex-col justify-around md:flex-row items-center">
          <div className=" ">
            <div className="flex gap-2 items-center">
              <MdBorderClear size={30} className="mr-2" color="white" />
              <h3 className="font-Roboto !text-[16px] leading-2 !font-[400]">
                Pending Orders
              </h3>
            </div>

            <h5 className="py-3 text-[15px] font-[500]">
              Total products : {info.totalOrder_ByStatus.pending?.totalProducts}
            </h5>
            <h2>
              {" "}
              Total Price : {info.totalOrder_ByStatus.pending?.totalPrice}
            </h2>
          </div>
          <div className=" ">
            <div className="flex gap-2 items-center">
              <MdBorderClear size={30} className="mr-2" color="white" />
              <h3 className="font-Roboto !text-[16px] leading-2 !font-[400]">
                Delivered Orders
              </h3>
            </div>

            <h5 className="py-4 text-[15px] font-[500]">
              Total products :{" "}
              {info.totalOrder_ByStatus.delivered?.totalProducts}
            </h5>
            <h2>
              {" "}
              Total Price : {info.totalOrder_ByStatus.delivered?.totalPrice}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainInformation;
