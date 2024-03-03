import { type TFilterParams } from "@/entities/rating/types/filterParams";
import { type TSearchParams } from "../types/searchParams";

export const getFilterParamsFromSearchParams = (
  searchParams: TSearchParams,
): TFilterParams => {
  const query = searchParams.query != null ? searchParams.query : "";
  const currentPage = searchParams.page != null ? Number(searchParams.page) : 1;
  const tag = searchParams.tag;
  const type = searchParams.type;

  return {
    query,
    page: currentPage,
    tag,
    type,
  };
};
