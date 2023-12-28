import React from "react";

function layout({ children }) {
  return (
    <div>
      <div className="flex justify-between w-full px-6 py-3 ">
        <h3 className="text-[21px]  font-semibold text-slate-600">Category</h3>
      </div>

      <hr />
      <hr />
      <div>{children}</div>
    </div>
  );
}

export default layout;
