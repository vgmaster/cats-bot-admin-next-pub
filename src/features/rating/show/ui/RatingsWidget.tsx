import {
  getFilteredRatings,
  getFilteredRatingsTotalPages,
  getTags,
} from "@/entities/rating";
import { getFilterParamsFromSearchParams } from "../lib/getFilterParamsFromSearchParams";
import { type TSearchParams } from "../types/searchParams";
import { TagSelector } from "./TagSelector";
import Search from "./Search";
import { RatingsTable } from "./RatingsTable";
import { Pagination } from "@/shared/components/Pagination";
import { getTypes } from "@/entities/rating/services/services";
import { TypeSelector } from "./TypeSelector";
import { getSortParamsFromSearchParams } from "../lib/getSortParamsFromSearchParams";
import { getServerSession } from "next-auth";
import { authConfig } from "@/shared/configs/auth";

type TProps = {
  searchParams: TSearchParams;
};

export const RatingsWidget = async (props: TProps): Promise<JSX.Element> => {
  const { searchParams } = props;
  const session = await getServerSession(authConfig);
  const isAdmin = Boolean(session?.user.isAdmin);

  const tags = await getTags();
  const types = await getTypes();
  const filters = getFilterParamsFromSearchParams(searchParams);
  const sort = getSortParamsFromSearchParams(searchParams);

  const totalPages = await getFilteredRatingsTotalPages(filters);
  const cats = await getFilteredRatings(filters, sort);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <TypeSelector types={types} />
        <TagSelector tags={tags} />
        <Search placeholder="Введите запрос" />
      </div>
      <RatingsTable data={cats} page={filters.page} isAdmin={isAdmin} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};
