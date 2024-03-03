import { type z } from 'zod';
import { schemaLoginForm } from "./loginForm";

/**
 * на случай, если нужен будет сложный маппинг данных из формы
 * в данные для запроса
 */

export const schemaLoginData = schemaLoginForm;

export type TLoginData = z.infer<typeof schemaLoginData>;
