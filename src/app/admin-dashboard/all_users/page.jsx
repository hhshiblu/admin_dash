import { UserTable } from "@/components/user/userTable";
import { getUsers } from "@/serverAction/user";

async function page() {
  const users = await getUsers();
  return (
    <div>
      <UserTable data={users} />
    </div>
  );
}

export default page;
