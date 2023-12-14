import { getOrders } from "@/serverAction/order/order";
import React from "react";

async function layout({ children }) {
  const order = await getOrders();
  return (
    <div>
      {order.map((i, index) => (
        <h2 key={index}>{i.id}</h2>
      ))}

      {children}
    </div>
  );
}

export default layout;
