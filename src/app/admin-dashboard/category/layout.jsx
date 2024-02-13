import React from "react";

function layout({ children }) {
  return (
    <div className="w-full max-h-[87vh] scroll_y_hiiden overflow-y-auto ">
      <div className="  flex justify-between  px-6 py-3 ">
        <h3 className="text-[21px]  font-semibold text-slate-600">Category</h3>
      </div>

      <hr />
      <hr />
      <div>{children}</div>
    </div>
  );
}

export default layout;
