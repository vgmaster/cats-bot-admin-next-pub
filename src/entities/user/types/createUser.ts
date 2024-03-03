import { z } from "zod";

export const schemaCreateUser = z.object({
  login: z.string().min(2, {
    message: "Логин должен быть не менее 2 символов.",
  }),
  password: z.string().min(8, {
    message: "Пароль должен быть не менее 8 символов.",
  }),
  isAdmin: z.boolean().optional(),
});

export type TCreateUser = z.infer<typeof schemaCreateUser>;
