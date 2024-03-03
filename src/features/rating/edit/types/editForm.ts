import { z } from "zod";

export const schemaEditForm = z.object({
  id: z.number(),
  url: z.string(),
  resource_type: z.string(),
  tag: z.string(),
  shows: z.coerce.number().min(0),
  likes: z.coerce.number().min(0),
  dislikes: z.coerce.number().min(0),
  is_visible: z.boolean(),
  raw_tags: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type TEditForm = z.infer<typeof schemaEditForm>;
