import UserData from "@/components/user/userData";
import { UserTable } from "@/components/user/userTable";
import { getUsers } from "@/serverAction/user";
import React, { Suspense } from "react";

async function page() {
  const users = await getUsers();
  return (
    <div>
      <UserTable data={users} />
    </div>
  );
}

export default page;
