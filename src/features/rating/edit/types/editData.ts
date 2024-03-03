import { type z } from "zod";
import { schemaEditForm } from "./editForm";

export const schemaEditData = schemaEditForm.omit({
  id: true,
  resource_type: true,
  tag: true,
  shows: true,
  created_at: true,
  updated_at: true,
});

export type TEditData = z.infer<typeof schemaEditData>;
