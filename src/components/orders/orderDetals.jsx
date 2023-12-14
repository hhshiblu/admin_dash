"use client";
import React, { useState } from "react";

import { BsFillBagFill } from "react-icons/bs";

import Image from "next/image";
import Link from "next/link";

const OrderDetals = ({ data }) => {
  const [status, setStatus] = useState("");

  // order  create date
  const createdAt = new Date(data.createdAt);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;

  //order delivery date
  const deliveredAt = new Date(data.deliveredAt);
  const deliveryDate = `${deliveredAt.getDate()}/${
    deliveredAt.getMonth() + 1
  }/${deliveredAt.getFullYear()}`;

  // order paid date
  const paidAt = new Date(data.paidAt);
  const PaidDate = `${paidAt.getDate()}/${
    paidAt.getMonth() + 1
  }/${paidAt.getFullYear()}`;

  return (
    <div>
      {/* {isLoading ? (
        < p>loading</p>
      ) : ( */}
      <div className={`p-5 min-h-screen w-11/12 mx-auto bg-white`}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-2 text-[25px]">Order Details</h1>
          </div>
          <Link href="/admin-dashboard/all-orders">
            <div
              className={`w-[150px]  my-3 flex items-center justify-center  cursor-pointer !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
            >
              Order List
            </div>
          </Link>
        </div>
        <br />
        <hr />

        <div className="w-full flex items-center justify-between pt-6">
          <h5 className="text-[#00000084]">
            {/* Order ID: <span>#{data?._id?.slice(0, 8)}</span> */}
          </h5>
          <h5 className="text-[#00000084]">
            Placed on: <span>{formattedDate}</span>
          </h5>
        </div>

        {/* order items */}
        <br />
        <br />
        {/* {data &&
          data?.cart.map((item, index) => (
            <div className="w-full flex items-start mb-5" key={index}>
              <Image
                src={``}
                alt=""
                width={50}
                height={50}
                className="w-[50x] h-[50px]"
              />
              <div className="w-full">
                <h5 className="pl-3 text-sm  text-[#0C134F] md:text-lg">
                  {item.name}
                </h5>
                <h5 className="pl-3 text-[20px] text-[#00000091] text-sm">
                  bdt {item.discountPrice} x {item.qty}
                </h5>
              </div>
            </div>
          ))} */}

        {/* <div className="border-t w-full text-right">
          <h5 className="pt-3 text-sm md:text-md">
            Total Price:{" "}
            <strong>
              <span className="text-sm font-semibold pr-4">ট</span>{" "}
              {data?.totalPrice}
            </strong>
          </h5>
        </div>
        <br />
        <br />
        <div className="w-full   flex flex-col md:flex-row mx-auto items-center">
          <div className="w-full 800px:w-[60%]">
            <h4 className=" text-sm md:text-md font-[600]">
              Shipping Address:
            </h4>

            <h4 className="pt-3 text-sm md:text-md py-1 font-[500] text-[#00000084]">
              {data?.shippingAddress.address1}
            </h4>
            <div className="flex  ">
              <h4 className=" text-sm md:text-md pr-2 font-[500] text-[#00000084]">
                {data?.shippingAddress.district}
              </h4>
              {
                <h4 className=" text-sm  md:text-md font-[500] text-[#00000084]">
                  , {data?.shippingAddress.division}
                </h4>
              }
            </div>

            <h4 className="font-[500] py-1 text-sm md:text-md text-[#00000084] ">
              Number : {data?.user?.phoneNumber}
            </h4>
            <h4 className="font-[500] text-sm md:text-md text-[#00000084] ">
              email : {data?.user?.email}
            </h4>
          </div>
          <div className="w-full 800px:w-[40%]">
            <h4 className="pt-3 text-[20px]">Payment Info:</h4>
            <h3 className=" text-sm">
              Type :{" "}
              <span className="font-semibold">{data.paymentInfo.type}</span>
            </h3>
            <h4 className="text-sm ">
              Status:{" "}
              <span className="font-semibold">
                {data?.paymentInfo?.status
                  ? data?.paymentInfo?.status
                  : "Not Paid"}
              </span>
            </h4>
          </div>
          <div className="w-full 800px:w-[40%]">
            <h4 className="pt-3 text-[20px]">Order Status :</h4>
            <h3 className=" text-sm">
              status : <span className="font-semibold">{data.status}</span>
            </h3>

            <h5 className="text-[#00000084] text-sm py-2">
              Paid on: <span>{PaidDate}</span>
            </h5>
            <h5 className="text-[#00000084] text-sm">
              Delivery date: <span>{deliveryDate}</span>
            </h5>
          </div>
        </div>
        <br />
        <br />
        <h4 className="pt-3 text-[16px] font-[600]">
          Order Status: <span className="text-md">{data.status}</span>
        </h4> */}

        {/* {data?.status !== "Processing refund" &&
          data?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null} */}
        {data.orderArray.map((i, index) => {
          return (
            <div key={index}>
              {i.orderId}
              {i.products.map((product, index) => {
                return (
                  <div key={index}>
                    <p>{product.productInfo.name}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
        <button
          className={`$w-[150px]  my-3 flex items-center justify-center  cursor-pointer mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
          // onClick={
          //   data?.status !== "Processing refund"
          //     ? orderUpdateHandler
          //     : refundOrderUpdateHandler
          // }
        >
          Update Status
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default OrderDetals;
