import React from "react";
import { SellerTable } from "./sellerTable";
import { getSellers } from "@/serverAction/seller";

async function SellerData() {
  const sellers = await getSellers();

  return <div></div>;
}

export default SellerData;
