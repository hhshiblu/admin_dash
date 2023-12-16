import { getOrder } from "@/serverAction/order/order";
import React from "react";
import OrderDetals from "./orderDetals";

async function SingleOrder({ id }) {
  const order = await getOrder(id);
  // await
  // const data = JSON.parse(JSON.stringify(order));

  return (
    <div>
      <OrderDetals data={order} />
    </div>
  );
}

export default SingleOrder;
