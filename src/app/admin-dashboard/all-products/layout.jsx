import React from "react";

function layout({ children }) {
  return (
    <>
      <div className=" w-full  scroll_y_hiiden overflow-y-auto  max-h-[89vh] l overflow-hidden">
        <div className=" py-4 pl-8 text-[17px] font-semibold ">
          <h2>All Products</h2>
        </div>
        <hr className="px-6" />
        <hr className="px-6" />
        {children}
      </div>
    </>
  );
}

export default layout;
