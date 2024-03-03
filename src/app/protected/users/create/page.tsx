import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authConfig } from "@/shared/configs/auth";
import { RegistrationForm } from "@/features/registration";

export default async function CreateUser(): Promise<JSX.Element> {
  const session = await getServerSession(authConfig);
  const isAdmin = Boolean(session?.user.isAdmin);

  if (!isAdmin) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Регистрация</h1>
      <RegistrationForm buttonLabel="Создать" />
    </div>
  );
}
