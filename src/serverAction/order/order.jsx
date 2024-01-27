"use server";

import { ObjectId } from "mongodb";
import connectToDB from "@/lib/connect";
import { revalidatePath } from "next/cache";
export const getOrders = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("adminorder");

    const orders = await collection.find({}).toArray();
    const plainOrders = orders.map((order) => {
      const { _id, orderId, totalPrice, createAt, delivery_status } = order;

      const dateObject = new Date(createAt);
      const formattedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;
      return {
        id: _id.toString(),
        orderId: orderId.toString(),
        totalPrice,
        status: delivery_status,
        createdAt: formattedDate,
      };
    });

    return plainOrders;
  } catch (error) {
    return error.message;
  }
};

export const getOrder = async (id) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("adminorder");

    const singleOrder = await collection.findOne({ orderId: new ObjectId(id) });
    const order = JSON.parse(JSON.stringify(singleOrder));
    return order;
  } catch (error) {
    return error.message;
  }
};

export const createOrder = async (data) => {
  const db = await connectToDB();
  const productCollection = db.collection("products");
  const orderCollection = db.collection("orders");
  const SellerOrder = db.collection("sellerOrder");
  const adminOrder = db.collection("adminorder");
  const { cart, shippingAddress } = data;
  const userId = "555556565";

  const productInfo = await Promise.all(
    cart.map(async (item) => {
      const { productId, quntity } = item;

      const ProductInfo = await productCollection.findOne({
        _id: new ObjectId(productId),
      });

      return {
        ProductInfo,
        quntity,
        sellerId: ProductInfo.sellerId, // Assuming your product model has a "seller" field
        color: item.color,
        size: item.size,
      };
    })
  );
  const totalPrice = productInfo.reduce((acc, item) => {
    const { ProductInfo, quntity } = item;
    const shippingfee = 50;
    const productPrice = ProductInfo.discountPrice * quntity + shippingfee;
    return acc + productPrice;
  }, 0);

  // const shippingfee = 50;
  const order = {
    products: productInfo,
    userId: userId,
    totalPrice,
    delivery_status: "pending",
    paymentInfo: "cash on ",
    createAt: new Date(),
  };

  const result = await orderCollection.insertOne(order);

  if (result.acknowledged) {
    for (const { ProductInfo, quntity } of order.products) {
      // Calculate the new quantity after the purchase

      const stock = Math.max(0, ProductInfo.stock - quntity);

      // Update the product quantity in the products collection
      await productCollection.updateOne(
        { _id: ProductInfo._id },
        { $set: { stock: stock } }
      );
    }
  }

  let unique = [...new Set(productInfo.map((p) => p.sellerId.toString()))];
  const orderArray = [];

  for (let i = 0; i < unique.length; i++) {
    let price = 0;
    const productsForSeller = [];

    for (let j = 0; j < productInfo.length; j++) {
      const { ProductInfo, quntity, sellerId } = productInfo[j];

      if (unique[i] == sellerId.toString()) {
        price += ProductInfo.discountPrice * quntity;

        productsForSeller.push({
          quantity: quntity,
          productInfo: ProductInfo,
        });
      }
    }

    if (productsForSeller.length > 0) {
      orderArray.push({
        orderId: result.insertedId,
        sellerId: unique[i],
        price,
        delivery_status: "pending",
        shippingAddress: "pubadhala",
        paymentInfo: "cash on ",
        products: productsForSeller,
        createdAt: new Date(),
      });
    }
  }
  await adminOrder.insertOne({
    orderId: result.insertedId,
    orderArray: orderArray,
    totalPrice,
    delivery_status: "pending",
    shippingInfo: shippingAddress,
    createdAt: new Date(),
  });
  await SellerOrder.insertMany(orderArray);
};

export const upDate = async (id) => {
  const db = await connectToDB();
  const collection = db.collection("adminorder");
  await collection.findOneAndDelete({ orderId: new ObjectId(id) });
  revalidatePath("/order-details");
};
