import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authConfig } from "@/shared/configs/auth";
import { getAllUsers } from "@/entities/user";
import { UsersTable } from "./UsersTable";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default async function Users(): Promise<JSX.Element> {
  const session = await getServerSession(authConfig);
  const isAdmin = Boolean(session?.user.isAdmin);

  if (!isAdmin) {
    notFound();
  }

  const allUsers = await getAllUsers();

  return (
    <div className="flex flex-col gap-6">
      <h1>Пользователи</h1>

      <div className="flex flex-col gap-6">
        <Link href="/protected/users/create">
          <Button>Добавить</Button>
        </Link>
        <UsersTable users={allUsers} />
      </div>
    </div>
  );
}
