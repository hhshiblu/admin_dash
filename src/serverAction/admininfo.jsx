import connectToDB from "@/lib/connect";

export async function admininfo() {
  try {
    const db = await connectToDB();
    const productCollection = db.collection("products");
    const usersCollection = db.collection("users");
    const sellersCollection = db.collection("shops");
    const OrdersCollection = db.collection("adminorder");

    const products = await productCollection.find({}).toArray();
    const users = await usersCollection.find({}).toArray();
    const sellers = await sellersCollection.find({}).toArray();
    const orders = await OrdersCollection.find({}).toArray();
    const totalprice = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Define the status you want to filter
    const statuses = ["pending", "delivered"];

    const orderStatus_TotalPrice = await OrdersCollection.find({
      delivery_status: { $in: statuses },
    }).toArray();

    const totalOrder_ByStatus = orderStatus_TotalPrice.reduce((acc, order) => {
      const { delivery_status, totalPrice, orderArray } = order;

      if (!acc[delivery_status]) {
        acc[delivery_status] = {
          totalProducts: 0,
          totalPrice: 0,
        };
      }

      // Loop through each item in orderArray and accumulate total products
      orderArray.forEach((item) => {
        acc[delivery_status].totalProducts += item.products.length;
      });

      acc[delivery_status].totalPrice += totalPrice;

      return acc;
    }, {});

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalprice: totalprice,
      totalOrder_ByStatus: totalOrder_ByStatus,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
