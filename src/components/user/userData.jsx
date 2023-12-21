import React from "react";
import { UserTable } from "./userTable";
import { getUsers } from "@/serverAction/user";
import { getSellers } from "@/serverAction/seller";

async function UserData() {
  const users = await getUsers();

  return <div></div>;
}

export default UserData;
