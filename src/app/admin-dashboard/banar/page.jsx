import React from "react";
import BanarInfo from "./banarinfo";
import { getBanars } from "@/serverAction/home";

async function page() {
  const banars = await getBanars();

  return (
    <div>
      <BanarInfo banars={banars} />
    </div>
  );
}

export default page;
