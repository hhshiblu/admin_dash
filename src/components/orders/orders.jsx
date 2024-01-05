import { createOrder, getOrders } from "@/serverAction/order/order";
import { DataTableDemo } from "../demo";

async function Orders() {
  const orders = await getOrders();

  // await createOrder(data);

  return (
    <div>
      <DataTableDemo data={orders} />
    </div>
  );
}

export default Orders;
