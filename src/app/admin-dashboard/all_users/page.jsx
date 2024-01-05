import { UserTable } from "@/components/user/userTable";
import { getUsers } from "@/serverAction/user";
export const dynamic = "force-dynamic";
async function Page() {
  const users = await getUsers();
  return (
    <div>
      <UserTable data={users} />
    </div>
  );
}

export default Page;
