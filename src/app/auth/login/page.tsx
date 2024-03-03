import { LoginForm } from "@/features/login/ui/LoginForm";

export default async function Login(): Promise<JSX.Element> {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Вход</h1>
      <LoginForm />
    </div>
  );
}
