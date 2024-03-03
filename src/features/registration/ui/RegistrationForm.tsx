"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registration } from "../services/services";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  type TRegistrationForm,
  schemaRegistrationForm,
} from "../types/registrationForm";
import { type TRegistationData } from "../types/registrationData";

type TProps = {
  buttonLabel: string;
};

export const RegistrationForm = (props: TProps): JSX.Element => {
  const { buttonLabel } = props;

  const form = useForm<TRegistrationForm>({
    mode: "onBlur",
    resolver: zodResolver(schemaRegistrationForm),
    defaultValues: {
      login: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<TRegistrationForm> = async (
    data: TRegistationData,
  ) => {
    try {
      const response = await registration(data);
      if (response?.message != null) {
        toast(response.message);
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль повторно</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Пароль повторно"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{buttonLabel}</Button>
      </form>
    </Form>
  );
};
