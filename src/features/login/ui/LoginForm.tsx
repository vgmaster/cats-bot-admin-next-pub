"use client";

import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { schemaLoginForm, type TLoginForm } from "../types/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TLoginData } from "../types/loginData";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { signIn } from 'next-auth/react';

export const LoginForm = (): JSX.Element => {
  const router = useRouter();

  const form = useForm<TLoginForm>({
    mode: "onBlur",
    resolver: zodResolver(schemaLoginForm),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TLoginForm> = async (data: TLoginData) => {
    try {
      const response = await signIn("credentials", {
        login: data.login,
        password: data.password,
        redirect: false,
      });

      if (response != null && response.error == null) {
        router.push("/ratings");
      } else {
        toast('Неверный логин или пароль');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input placeholder="Login" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Войти</Button>
      </form>
    </Form>
  );
};
