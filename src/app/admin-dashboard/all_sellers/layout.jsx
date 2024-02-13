import React from "react";

function layout({ children }) {
  return (
    <div className=" w-full  min-h-[80vh]   h-[87vh] overflow-y-scroll overflow-hidden">
      <div className=" py-4 pl-8 text-[17px] font-semibold ">
        <h2>All Sellers</h2>
      </div>
      <hr className="px-6" />
      <hr className="px-6" />
      <div className="px-4 pt-2">{children}</div>
    </div>
  );
}

export default layout;
