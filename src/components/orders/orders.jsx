import { createOrder, getOrders } from "@/serverAction/order/order";
import { DataTableDemo } from "../demo";
import { getSellers } from "@/serverAction/seller";
const data = {
  cart: [
    {
      productId: "6463ea49bfbbd8eaaac1bed7",
      size: 42,
      quntity: 2,
    },
    {
      productId: "646633b77ea85907e6b80572",
      size: 42,
      quntity: 2,
    },
    {
      productId: "6478f6fccd183384594fe615",
      size: 42,
      quntity: 2,
    },
    {
      productId: "6463ea49bfbbd8eaaac1bed7",
      size: 42,
      quntity: 2,
    },
    {
      productId: "653970d6de41bb020cb6c2d9",
      size: 42,
      quntity: 2,
    },
  ],

  shippingAddress: {
    add: "successfully added",
  },
};
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
