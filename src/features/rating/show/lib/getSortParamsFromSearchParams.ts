import { type TSortParams } from "@/entities/rating/types/orderParams";
import { type TSearchParams } from "../types/searchParams";

export const getSortParamsFromSearchParams = (
  searchParams: TSearchParams,
): TSortParams => {
  const sort = searchParams.sort;
  const order = searchParams.order;

  return {
    sort,
    order,
  };
};
