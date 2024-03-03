export type TRating = {
  id: number;
  url: string;
  resource_type: string;
  tag: string;
  shows: number;
  likes: number;
  dislikes: number;
  is_visible: boolean;
  raw_tags: string;
  created_at: Date | null;
  updated_at: Date | null;
};
