import Orders from "@/components/orders/orders";
import SellerData from "@/components/seller/sellerData";
import { SellerTable } from "@/components/seller/sellerTable";
import connectToDB from "@/lib/connect";
// import { getSellers } from "@/serverAction/seller";
import React, { Suspense } from "react";
const getSellers = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("shops");

    const seller = await collection.find({}).toArray();

    const sellers = JSON.parse(JSON.stringify(seller));
    return sellers;
  } catch (error) {
    return error.message;
  }
};
async function page() {
  const sellers = await getSellers();
  return <SellerTable data={sellers} />;
}

export default page;
