import Link from "next/link";
import React from "react";
import { BsFillBagFill } from "react-icons/bs";

function layout({ children }) {
  return (
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
      {children}
    </div>
  );
}

export default layout;
