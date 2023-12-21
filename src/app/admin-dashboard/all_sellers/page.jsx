import Orders from "@/components/orders/orders";
import SellerData from "@/components/seller/sellerData";
import { SellerTable } from "@/components/seller/sellerTable";
import { getSellers } from "@/serverAction/seller";
import React, { Suspense } from "react";

async function page() {
  const sellers = await getSellers();
  return <SellerTable data={sellers} />;
}

export default page;
