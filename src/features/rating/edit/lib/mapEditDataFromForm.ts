import { type TEditData } from "../types/editData";
import { type TEditForm } from "../types/editForm";

export const mapEditDataFromForm = (dto: TEditForm): TEditData => ({
  url: dto.url,
  likes: dto.likes,
  dislikes: dto.dislikes,
  is_visible: dto.is_visible,
  raw_tags: dto.raw_tags,
});
