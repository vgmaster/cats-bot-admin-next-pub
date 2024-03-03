import { authConfig } from "@/shared/configs/auth";
import { getServerSession } from "next-auth";

export default async function About(): Promise<JSX.Element> {
  const session = await getServerSession(authConfig);
  
  return (
    <div className="flex flex-col gap-6">
      <h1>Общая информация</h1>
      {session != null ? (
        <div>
          <div className="flex gap-4">
            <div>Login:</div>
            <div>{session.user?.login}</div>
            {Boolean(session.user?.isAdmin) && <div>Админ</div>}
          </div>
        </div>
      ) : (
        <div>Анонимный пользователь</div>
      )}
    </div>
  );
}
