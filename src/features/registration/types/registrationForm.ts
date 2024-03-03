import { z } from "zod";

export const schemaRegistrationForm = z.object({
  login: z.string().min(2, {
    message: "Логин должен быть не менее 2 символов.",
  }),
  password: z.string().min(8, {
    message: "Пароль должен быть не менее 8 символов.",
  }),
  passwordConfirm: z.string().min(8, {
    message: "Пароль повторно должен быть не менее 8 символов.",
  }),
});

export type TRegistrationForm = z.infer<typeof schemaRegistrationForm>;
