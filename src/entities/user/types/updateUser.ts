import { z } from "zod";

export const schemaUpdateUser = z.object({
  login: z
    .string()
    .min(2, {
      message: "Логин должен быть не менее 2 символов.",
    })
    .optional(),
  is_admin: z.boolean().optional(),
});

export type TUpdateUser = z.infer<typeof schemaUpdateUser>;
