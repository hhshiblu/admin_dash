import React from "react";

function layout({ children }) {
  return (
    <div className="w-full max-h-[87vh] scroll_y_hiiden overflow-y-auto">
      {children}
    </div>
  );
}

export default layout;
